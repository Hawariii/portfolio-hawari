const GITHUB_API = "https://api.github.com";

export type GitHubProfile = {
  login: string;
  name: string | null;
  avatar_url: string;
  bio: string | null;
  followers: number;
  following: number;
  public_repos: number;
  html_url: string;
};

export type GitHubRepo = {
  id: number;
  name: string;
  html_url: string;
  stargazers_count: number;
  fork: boolean;
  archived: boolean;
  updated_at: string;
};

export type ContributionDay = {
  date: string;
  count: number;
};

export type YearlyContribution = {
  year: number;
  total: number;
};

export type GitHubDashboardData = {
  profile: GitHubProfile | null;
  yearlyCommits: number;
  recent7Days: ContributionDay[];
  yearlyContributions: YearlyContribution[];
  totalStars: number;
  activeRepos: number;
  topRepos: GitHubRepo[];
  lastUpdated: string;
};

const jsonHeaders = {
  Accept: "application/vnd.github+json",
};

async function fetchProfile(username: string): Promise<GitHubProfile | null> {
  try {
    const response = await fetch(`${GITHUB_API}/users/${username}`, {
      headers: jsonHeaders,
      next: { revalidate: 3600 },
    });

    if (!response.ok) return null;

    return (await response.json()) as GitHubProfile;
  } catch {
    return null;
  }
}

async function fetchRepos(username: string): Promise<GitHubRepo[]> {
  try {
    const response = await fetch(
      `${GITHUB_API}/users/${username}/repos?sort=updated&per_page=100`,
      {
        headers: jsonHeaders,
        next: { revalidate: 3600 },
      },
    );

    if (!response.ok) return [];

    return (await response.json()) as GitHubRepo[];
  } catch {
    return [];
  }
}

function parseContributionSvg(svg: string): ContributionDay[] {
  const rows: ContributionDay[] = [];
  const regex = /data-date="(\d{4}-\d{2}-\d{2})"[^>]*data-count="(\d+)"/g;

  let match = regex.exec(svg);

  while (match) {
    rows.push({
      date: match[1],
      count: Number(match[2]),
    });

    match = regex.exec(svg);
  }

  return rows;
}

async function fetchContributionMap(
  username: string,
  year: number,
): Promise<ContributionDay[]> {
  const from = `${year}-01-01`;
  const to = `${year}-12-31`;

  try {
    const response = await fetch(
      `https://github.com/users/${username}/contributions?from=${from}&to=${to}`,
      {
        next: { revalidate: 3600 },
      },
    );

    if (!response.ok) return [];

    const svg = await response.text();
    return parseContributionSvg(svg);
  } catch {
    return [];
  }
}

function toLocalIsoDate(date: Date): string {
  const year = date.getFullYear();
  const month = `${date.getMonth() + 1}`.padStart(2, "0");
  const day = `${date.getDate()}`.padStart(2, "0");
  return `${year}-${month}-${day}`;
}

function buildRecentNDays(days: ContributionDay[], n: number): ContributionDay[] {
  if (n <= 0) return [];

  const lookup = new Map(days.map((day) => [day.date, day.count]));
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const range: ContributionDay[] = [];
  for (let i = n - 1; i >= 0; i -= 1) {
    const cursor = new Date(today);
    cursor.setDate(today.getDate() - i);
    const isoDate = toLocalIsoDate(cursor);

    range.push({
      date: isoDate,
      count: lookup.get(isoDate) ?? 0,
    });
  }

  return range;
}

export async function getGitHubDashboardData(
  username: string,
): Promise<GitHubDashboardData> {
  const currentYear = new Date().getFullYear();
  const years = Array.from({ length: 5 }, (_, index) => currentYear - 4 + index);

  const [profile, repos, yearlyMaps] = await Promise.all([
    fetchProfile(username),
    fetchRepos(username),
    Promise.all(years.map((year) => fetchContributionMap(username, year))),
  ]);

  const yearlyContributions = years.map((year, index) => {
    const total = yearlyMaps[index].reduce((sum, day) => sum + day.count, 0);
    return { year, total };
  });

  const allContributionDays = yearlyMaps.flat();
  const recent7Days = buildRecentNDays(allContributionDays, 7);

  const nonForkRepos = repos.filter((repo) => !repo.fork && !repo.archived);
  const topRepos = [...nonForkRepos]
    .sort((a, b) => b.stargazers_count - a.stargazers_count)
    .slice(0, 4);

  const totalStars = nonForkRepos.reduce(
    (sum, repo) => sum + repo.stargazers_count,
    0,
  );

  const thisYear = yearlyContributions.find(
    (item) => item.year === currentYear,
  )?.total;

  return {
    profile,
    yearlyCommits: thisYear ?? 0,
    recent7Days,
    yearlyContributions,
    totalStars,
    activeRepos: nonForkRepos.length,
    topRepos,
    lastUpdated: new Date().toISOString(),
  };
}
