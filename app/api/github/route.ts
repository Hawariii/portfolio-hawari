import { NextResponse } from "next/server";
export const dynamic = "force-dynamic";
export const revalidate = 0;

type ContributionDay = {
  date: string;
  count: number;
};

type GraphQLContributionResponse = {
  data?: {
    user?: {
      contributionsCollection?: {
        contributionCalendar?: {
          weeks?: Array<{
            contributionDays?: Array<{
              date: string;
              contributionCount: number;
            }>;
          }>;
        };
      };
    };
  };
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
    cache: "no-store",
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
      cache: "no-store",
    },
  );

  if (!response.ok) {
    throw new Error(`Contribution fetch failed: ${response.status}`);
  }

  return parseContributionSvg(await response.text());
}

async function fetchContributionsYearGraphQL(
  username: string,
  year: number,
  token: string,
): Promise<ContributionDay[]> {
  const from = `${year}-01-01T00:00:00Z`;
  const to = `${year}-12-31T23:59:59Z`;

  const query = `
    query ContributionsByYear($login: String!, $from: DateTime!, $to: DateTime!) {
      user(login: $login) {
        contributionsCollection(from: $from, to: $to) {
          contributionCalendar {
            weeks {
              contributionDays {
                date
                contributionCount
              }
            }
          }
        }
      }
    }
  `;

  const response = await fetch("https://api.github.com/graphql", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      Accept: "application/vnd.github+json",
      "Content-Type": "application/json",
    },
    cache: "no-store",
    body: JSON.stringify({
      query,
      variables: {
        login: username,
        from,
        to,
      },
    }),
  });

  if (!response.ok) {
    throw new Error(`GraphQL fetch failed: ${response.status}`);
  }

  const result = (await response.json()) as GraphQLContributionResponse;

  const weeks =
    result.data?.user?.contributionsCollection?.contributionCalendar?.weeks ?? [];

  return weeks.flatMap((week) =>
    (week.contributionDays ?? []).map((day) => ({
      date: day.date,
      count: day.contributionCount,
    })),
  );
}

export async function GET() {
  try {
    const token = process.env.GITHUB_TOKEN;

    const [user, repos] = await Promise.all([
      fetchJson<{
        name: string | null;
        login: string;
        avatar_url: string;
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
    ]);

    const contributionFetcher = async (year: number): Promise<ContributionDay[]> => {
      if (!token) {
        return fetchContributionsYear(USERNAME, year);
      }

      try {
        const graphQLDays = await fetchContributionsYearGraphQL(
          USERNAME,
          year,
          token,
        );

        if (graphQLDays.length > 0) {
          return graphQLDays;
        }
      } catch {
        // Fall back to public contributions endpoint.
      }

      return fetchContributionsYear(USERNAME, year);
    };

    const [contributions2025, contributions2026] = await Promise.all([
      contributionFetcher(YEARS[0]),
      contributionFetcher(YEARS[1]),
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
        avatarUrl: user.avatar_url,
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
      contributionSource: token ? "graphql_or_public_fallback" : "public_only",
    });
  } catch {
    return NextResponse.json(
      { error: "failed_to_load_github_data" },
      { status: 500 },
    );
  }
}
