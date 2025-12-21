// app/repositories/page.tsx
import RepositoriesClient from './RepositoriesClient';

interface GitHubUser {
  login: string;
  name: string;
  bio: string;
  avatar_url: string;
  html_url: string;
  public_repos: number;
  followers: number;
  following: number;
  location?: string;
  blog?: string;
  company?: string;
  created_at: string;
}

interface GitHubRepo {
  id: number;
  name: string;
  description: string;
  html_url: string;
  language: string;
  stargazers_count: number;
  forks_count: number;
  updated_at: string;
  created_at: string;
  topics: string[];
  private: boolean;
  fork: boolean;
}

// Fetch data at build time and revalidate (ISR)
async function getGitHubData() {
  try {
    const [userResponse, reposResponse] = await Promise.all([
      fetch('https://api.github.com/users/shimanto-rehman', {
        headers: {
          'Accept': 'application/vnd.github.v3+json',
          'User-Agent': 'NextJS-Portfolio',
          ...(process.env.GITHUB_TOKEN && {
            'Authorization': `Bearer ${process.env.GITHUB_TOKEN}`
          })
        },
        next: {
          // Revalidate every 6 hours (6 * 60 * 60 = 21600 seconds)
          revalidate: 21600
        },
      }),
      fetch('https://api.github.com/users/shimanto-rehman/repos?sort=updated&per_page=100', {
        headers: {
          'Accept': 'application/vnd.github.v3+json',
          'User-Agent': 'NextJS-Portfolio',
          ...(process.env.GITHUB_TOKEN && {
            'Authorization': `Bearer ${process.env.GITHUB_TOKEN}`
          })
        },
        next: {
          // Same 6‑hour revalidation window for repos
          revalidate: 21600
        },
      })
    ]);

    if (!userResponse.ok || !reposResponse.ok) {
      throw new Error('Failed to fetch GitHub data');
    }

    const [user, repos]: [GitHubUser, GitHubRepo[]] = await Promise.all([
      userResponse.json(),
      reposResponse.json()
    ]);

    // Calculate GitHub stats from repos
    const totalStars = repos.reduce((sum, repo) => sum + repo.stargazers_count, 0);
    const oneYearAgo = new Date();
    oneYearAgo.setFullYear(oneYearAgo.getFullYear() - 1);
    
    // Calculate commits, PRs, issues, and contributions (approximations from repos)
    const recentRepos = repos.filter(repo => new Date(repo.updated_at) > oneYearAgo);
    const totalCommits = Math.floor(recentRepos.length * 12); // Approximation
    const totalPRs = Math.floor(recentRepos.length * 2); // Approximation
    const totalIssues = Math.floor(recentRepos.length * 0.5); // Approximation
    const contributedTo = repos.filter(repo => repo.fork).length;

    // Calculate grade based on activity
    const activityScore = totalStars * 0.3 + totalCommits * 0.3 + totalPRs * 0.2 + recentRepos.length * 0.2;
    let grade = 'F';
    if (activityScore > 1000) grade = 'A+';
    else if (activityScore > 500) grade = 'A';
    else if (activityScore > 300) grade = 'B+';
    else if (activityScore > 200) grade = 'B';
    else if (activityScore > 100) grade = 'C+';
    else if (activityScore > 50) grade = 'C';
    else if (activityScore > 20) grade = 'D';
    
    const gradePercentage = Math.min(100, (activityScore / 1000) * 100);

    const stats = {
      totalStars,
      totalCommits,
      totalPRs,
      totalIssues,
      contributedTo,
      grade,
      gradePercentage
    };

    return { user, repos, stats };
  } catch (error) {
    // In ISR: if revalidation fails, keep serving the last successful static data.
    // By rethrowing here, Next.js will NOT cache this error result,
    // and the previous good page stays active.
    if (process.env.NODE_ENV === 'development') {
      console.error('Error fetching GitHub data:', error);
    }
    throw error;
  }
}

// Server Component (runs at build time with ISR)
export default async function RepositoriesPage() {
  const { user, repos, stats } = await getGitHubData();

  if (!user) {
    return (
      <main className="home-main">
        <div className="repositories-error">
          <i className="fas fa-exclamation-triangle"></i>
          <p>Failed to load GitHub data. Please try again later.</p>
        </div>
      </main>
    );
  }

  return <RepositoriesClient initialUser={user} initialRepos={repos} initialStats={stats} />;
}

// Optional: Generate metadata dynamically
export async function generateMetadata() {
  const { user } = await getGitHubData();
  
  return {
    title: `${user?.name || 'Repositories'} - GitHub Portfolio`,
    description: user?.bio || 'Exploring code, one commit at a time',
  };
}