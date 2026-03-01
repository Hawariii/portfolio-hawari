import { NextResponse } from "next/server";

type ContributionDay = {
  date: string;
  count: number;
};

const USERNAME = "Hawariii";
const YEARS = [2025, 2026] as const;

const monthFormatter = new Intl.DateTimeFormat("en-US", { month: "short" });

function toIsoDate(date: Date): string {
  const year = date.getFullYear();
  const month = `${date.getMonth() + 1}`.padStart(2, "0");
  const day = `${date.getDate()}`.padStart(2, "0");
  return `${year}-${month}-${day}`;
}

function parseContributionSvg(svg: string): ContributionDay[] {
  const rows: ContributionDay[] = [];
  const regex = /data-date="(\d{4}-\d{2}-\d{2})"[^>]*data-count="(\d+)"/g;

  let match = regex.exec(svg);
  while (match) {
    rows.push({ date: match[1], count: Number(match[2]) });
    match = regex.exec(svg);
  }

  return rows;
}

function toLevel(count: number): number {
  if (count <= 0) return 0;
  if (count <= 2) return 1;
  if (count <= 5) return 2;
  if (count <= 9) return 3;
  return 4;
}

async function fetchJson<T>(url: string, token?: string): Promise<T> {
  const headers: Record<string, string> = {
    Accept: "application/vnd.github+json",
  };

  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }

  const response = await fetch(url, {
    headers,
    next: { revalidate: 1800 },
  });

  if (!response.ok) {
    throw new Error(`GitHub API error: ${response.status}`);
  }

  return (await response.json()) as T;
}

async function fetchContributionsYear(
  username: string,
  year: number,
): Promise<ContributionDay[]> {
  const from = `${year}-01-01`;
  const to = `${year}-12-31`;

  const response = await fetch(
    `https://github.com/users/${username}/contributions?from=${from}&to=${to}`,
    {
      next: { revalidate: 1800 },
    },
  );

  if (!response.ok) {
    throw new Error(`Contribution fetch failed: ${response.status}`);
  }

  return parseContributionSvg(await response.text());
}

export async function GET() {
  try {
    const token = process.env.GITHUB_TOKEN;

    const [user, repos, contributions2025, contributions2026] = await Promise.all([
      fetchJson<{
        name: string | null;
        login: string;
        public_repos: number;
        followers: number;
      }>(`https://api.github.com/users/${USERNAME}`, token),
      fetchJson<
        Array<{
          id: number;
          name: string;
          html_url: string;
          stargazers_count: number;
          language: string | null;
          fork: boolean;
          archived: boolean;
        }>
      >(`https://api.github.com/users/${USERNAME}/repos?per_page=100&sort=updated`, token),
      fetchContributionsYear(USERNAME, YEARS[0]),
      fetchContributionsYear(USERNAME, YEARS[1]),
    ]);

    const nonForkRepos = repos.filter((repo) => !repo.fork && !repo.archived);

    const totalStars = nonForkRepos.reduce(
      (sum, repo) => sum + repo.stargazers_count,
      0,
    );

    const yearlyMap = new Map<number, ContributionDay[]>();
    yearlyMap.set(2025, contributions2025);
    yearlyMap.set(2026, contributions2026);

    const yearTotals = new Map<number, number>();
    for (const year of YEARS) {
      const total = (yearlyMap.get(year) ?? []).reduce((sum, day) => sum + day.count, 0);
      yearTotals.set(year, total);
    }

    const currentYearDays = yearlyMap.get(2026) ?? [];
    const monthlyCommits = Array.from({ length: 12 }, (_, month) => {
      const monthIndex = month + 1;
      const prefix = `2026-${`${monthIndex}`.padStart(2, "0")}-`;
      const count = currentYearDays
        .filter((day) => day.date.startsWith(prefix))
        .reduce((sum, day) => sum + day.count, 0);

      return {
        month: monthFormatter.format(new Date(2026, month, 1)),
        count,
      };
    });

    const mergedContribs = [...contributions2025, ...contributions2026].sort((a, b) =>
      a.date < b.date ? -1 : a.date > b.date ? 1 : 0,
    );

    const lookup = new Map(mergedContribs.map((d) => [d.date, d.count]));
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const contributions = Array.from({ length: 364 }, (_, idx) => {
      const cursor = new Date(today);
      cursor.setDate(today.getDate() - (363 - idx));
      const date = toIsoDate(cursor);
      const count = lookup.get(date) ?? 0;

      return {
        date,
        count,
        level: toLevel(count),
      };
    });

    const weeklyDist = [0, 0, 0, 0, 0, 0, 0];
    for (const day of contributions) {
      const weekday = new Date(day.date).getDay();
      weeklyDist[weekday] += day.count;
    }

    const languageMap = new Map<string, number>();
    for (const repo of nonForkRepos) {
      const lang = repo.language ?? "Other";
      languageMap.set(lang, (languageMap.get(lang) ?? 0) + 1);
    }

    const languages = [...languageMap.entries()]
      .map(([lang, count]) => ({ lang, count }))
      .sort((a, b) => b.count - a.count)
      .slice(0, 6);

    const topRepos = [...nonForkRepos]
      .sort((a, b) => b.stargazers_count - a.stargazers_count)
      .slice(0, 6)
      .map((repo) => ({
        name: repo.name,
        stars: repo.stargazers_count,
        language: repo.language ?? "Other",
        url: repo.html_url,
      }));

    return NextResponse.json({
      user: {
        name: user.name ?? user.login,
        login: user.login,
        publicRepos: user.public_repos,
      },
      stats: {
        totalStars,
        totalCommits2025: yearTotals.get(2025) ?? 0,
        totalCommits2026: yearTotals.get(2026) ?? 0,
        publicRepos: nonForkRepos.length,
      },
      weeklyDist,
      monthlyCommits,
      languages,
      topRepos,
      contributions,
      years: [2025, 2026],
      usesToken: Boolean(token),
    });
  } catch {
    return NextResponse.json(
      { error: "failed_to_load_github_data" },
      { status: 500 },
    );
  }
}
