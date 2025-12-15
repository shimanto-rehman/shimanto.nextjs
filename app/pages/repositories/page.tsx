import { notFound } from 'next/navigation';
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

async function getGitHubData(): Promise<{ user: GitHubUser | null; repos: GitHubRepo[]; error: string | null }> {
  try {
    const [userResponse, reposResponse] = await Promise.all([
      fetch('https://api.github.com/users/shimanto-rehman', {
        headers: { 'Accept': 'application/vnd.github.v3+json' },
        next: { revalidate: 3600 } // ISR: revalidate every hour
      }),
      fetch('https://api.github.com/users/shimanto-rehman/repos?sort=updated&per_page=100', {
        headers: { 'Accept': 'application/vnd.github.v3+json' },
        next: { revalidate: 3600 } // ISR: revalidate every hour
      })
    ]);

    if (!userResponse.ok || !reposResponse.ok) {
      const errorText = !userResponse.ok 
        ? `User API error: ${userResponse.status} ${userResponse.statusText}`
        : `Repos API error: ${reposResponse.status} ${reposResponse.statusText}`;
      console.error(errorText);
      return { user: null, repos: [], error: 'Failed to fetch GitHub data' };
    }

    const [userData, reposData]: [GitHubUser, GitHubRepo[]] = await Promise.all([
      userResponse.json(),
      reposResponse.json()
    ]);

    return { user: userData, repos: reposData, error: null };
  } catch (error) {
    console.error('GitHub API fetch error:', error);
    return { 
      user: null, 
      repos: [], 
      error: error instanceof Error ? error.message : 'An error occurred while fetching GitHub data' 
    };
  }
}

export default async function RepositoriesPage() {
  const { user, repos, error } = await getGitHubData();

  return <RepositoriesClient user={user} repos={repos} error={error} />;
}
