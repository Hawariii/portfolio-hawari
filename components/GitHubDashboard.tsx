import GitHubDashboardView from "@/components/GitHubDashboardView";
import { getGitHubDashboardData } from "@/lib/github";

const username = "Hawariii";

export default async function GitHubDashboard() {
  const data = await getGitHubDashboardData(username);

  return <GitHubDashboardView username={username} data={data} />;
}
