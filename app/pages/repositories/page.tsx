// app/repositories/page.tsx
import Navbar, { navItems } from '../../components/Navbar';
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
      // Log error details for debugging
      const token = process.env.GITHUB_TOKEN;
      console.error('GitHub API error:', {
        userStatus: userResponse.status,
        reposStatus: reposResponse.status,
        hasToken: !!token,
        tokenLength: token?.length || 0,
        tokenPrefix: token ? token.substring(0, 7) + '...' : 'none',
        userStatusText: userResponse.statusText,
        reposStatusText: reposResponse.statusText,
        environment: process.env.NODE_ENV,
        isVercel: !!process.env.VERCEL,
      });
      return null;
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
    // By returning null here, Next.js will serve an error message page instead of crashing
    // Only log in development, not during production builds
    if (process.env.NODE_ENV === 'development') {
      console.error('GitHub fetch failed:', error);
    }
    return null;
  }
}

// Server Component (runs at build time with ISR)
export default async function RepositoriesPage() {
  const data = await getGitHubData(); 
  if (!data) {
    return (
      <main className="home-main">
        <Navbar items={navItems} logo="/images/shimanto.png" />
        <section className="home-section">
          <div className="repositories-error" style={{ padding: '2rem', textAlign: 'center' }}>
            <i className="fas fa-exclamation-triangle" style={{ fontSize: '3rem', color: '#ff6b6b', marginBottom: '1rem' }}></i>
            <h2>Unable to Load GitHub Data</h2>
            <p>GitHub API request failed. This may be due to:</p>
            <ul style={{ textAlign: 'left', display: 'inline-block', marginTop: '1rem' }}>
              <li>Rate limit exceeded (GitHub allows 60 requests/hour without a token)</li>
              <li>Missing or invalid <code>GITHUB_TOKEN</code> environment variable</li>
            </ul>
            <p style={{ marginTop: '1rem', color: '#666' }}>
              To fix: Add <code>GITHUB_TOKEN</code> to your Vercel environment variables.
              <br />
              The page will work without it, but you may hit rate limits during builds.
            </p>
          </div>
        </section>
      </main>
    );
  }
  const { user, repos, stats } = data;
  return <RepositoriesClient initialUser={user} initialRepos={repos} initialStats={stats} />;
}

// Optional: Generate metadata dynamically
export async function generateMetadata() {
  const data = await getGitHubData();

  if (!data) {
    return {
      title: 'Repositories - GitHub Portfolio',
      description: 'Exploring code, one commit at a time',
    };
  }

  const { user } = data;
}