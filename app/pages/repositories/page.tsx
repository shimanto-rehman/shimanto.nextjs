'use client';

import { useState, useEffect, useMemo } from 'react';
import Navbar, { navItems } from "../../components/Navbar";
import { signalPageDataLoaded } from "../../hooks/usePageDataLoaded";
import './Repositories.css';

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

export default function RepositoriesPage() {
  const [user, setUser] = useState<GitHubUser | null>(null);
  const [repos, setRepos] = useState<GitHubRepo[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const reposPerPage = 9;

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        setError(null);

        // Fetch user profile
        const userResponse = await fetch('https://api.github.com/users/shimanto-rehman');
        if (!userResponse.ok) throw new Error('Failed to fetch user profile');
        const userData: GitHubUser = await userResponse.json();
        setUser(userData);

        // Fetch repositories
        const reposResponse = await fetch('https://api.github.com/users/shimanto-rehman/repos?sort=updated&per_page=100');
        if (!reposResponse.ok) throw new Error('Failed to fetch repositories');
        const reposData: GitHubRepo[] = await reposResponse.json();
        setRepos(reposData);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred');
      } finally {
        setLoading(false);
        // Dispatch event to signal that API data has been loaded
        // This allows the preloader to wait for data before completing
        signalPageDataLoaded();
      }
    };

    fetchData();
  }, []);

  // Filter and paginate repositories
  const filteredRepos = useMemo(() => {
    if (!searchQuery.trim()) return repos;
    const query = searchQuery.toLowerCase();
    return repos.filter(repo => 
      repo.name.toLowerCase().includes(query) ||
      (repo.description && repo.description.toLowerCase().includes(query)) ||
      repo.language?.toLowerCase().includes(query) ||
      repo.topics.some(topic => topic.toLowerCase().includes(query))
    );
  }, [repos, searchQuery]);

  const paginatedRepos = useMemo(() => {
    const startIndex = (currentPage - 1) * reposPerPage;
    return filteredRepos.slice(startIndex, startIndex + reposPerPage);
  }, [filteredRepos, currentPage]);

  const totalPages = Math.ceil(filteredRepos.length / reposPerPage);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
  };

  const getLanguageColor = (language: string) => {
    const colors: { [key: string]: string } = {
      'JavaScript': '#f1e05a',
      'TypeScript': '#3178c6',
      'Python': '#3572A5',
      'Java': '#b07219',
      'C++': '#f34b7d',
      'C': '#555555',
      'CSS': '#563d7c',
      'HTML': '#e34c26',
      'Ruby': '#701516',
      'PHP': '#4F5D95',
      'Go': '#00ADD8',
      'Rust': '#dea584',
      'Swift': '#fa7343',
      'Kotlin': '#F18E33',
      'Dart': '#00B4AB',
      'Shell': '#89e051',
      'Vue': '#4fc08d',
      'React': '#61dafb',
    };
    return colors[language] || '#64c8ff';
  };

  if (loading) {
    return (
      <main className="home-main">
        <Navbar items={navItems} logo="/images/shimanto.png" />
        <section className="repositories-section">
          <div className="repositories-container">
            <div className="repositories-loading">
              <div className="loading-spinner"></div>
              <p>Loading repositories...</p>
            </div>
          </div>
        </section>
      </main>
    );
  }

  if (error) {
    return (
      <main className="home-main">
        <Navbar items={navItems} logo="/images/shimanto.png" />
        <section className="repositories-section">
          <div className="repositories-container">
            <div className="repositories-error">
              <i className="fas fa-exclamation-triangle"></i>
              <p>Error: {error}</p>
            </div>
          </div>
        </section>
      </main>
    );
  }

  return (
    <main className="home-main">
      <Navbar items={navItems} logo="/images/shimanto.png" />
      <section className="repositories-section">
        <div className="repositories-container">
          {/* Profile Section - Compact Modern Design */}
          {user && (
            <div className="repositories-profile">
              <div className="profile-card">
                <div className="profile-avatar">
                  <img src={user.avatar_url} alt={user.name || user.login} />
                </div>
                <div className="profile-info">
                  <div className="profile-header">
                    <div>
                      <h1 className="profile-name">{user.name || user.login}</h1>
                      <p className="profile-username">@{user.login}</p>
                    </div>
                    <a 
                      href={user.html_url} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="profile-github-btn"
                    >
                      <i className="fab fa-github"></i>
                      GitHub
                    </a>
                  </div>
                  {user.bio && <p className="profile-bio">{user.bio}</p>}
                  <div className="profile-stats">
                    <div className="profile-stat">
                      <i className="fas fa-code-branch"></i>
                      <span className="stat-number">{user.public_repos}</span>
                      <span className="stat-label">Repos</span>
                    </div>
                    <div className="profile-stat">
                      <i className="fas fa-users"></i>
                      <span className="stat-number">{user.followers}</span>
                      <span className="stat-label">Followers</span>
                    </div>
                    <div className="profile-stat">
                      <i className="fas fa-user-plus"></i>
                      <span className="stat-number">{user.following}</span>
                      <span className="stat-label">Following</span>
                    </div>
                  </div>
                  <div className="profile-meta">
                    {user.location && (
                      <div className="profile-meta-item">
                        <i className="fas fa-map-marker-alt"></i>
                        <span>{user.location}</span>
                      </div>
                    )}
                    {user.company && (
                      <div className="profile-meta-item">
                        <i className="fas fa-building"></i>
                        <span>{user.company}</span>
                      </div>
                    )}
                    {user.blog && (
                      <div className="profile-meta-item">
                        <i className="fas fa-link"></i>
                        <a href={user.blog} target="_blank" rel="noopener noreferrer">{user.blog}</a>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Search and Filters */}
          <div className="repositories-header">
            <p className="repositories-subtitle">Exploring code, one commit at a time</p>
            <div className="repositories-search">
              <i className="fas fa-search"></i>
              <input
                type="text"
                placeholder="Search repositories by name, description, language, or topic..."
                value={searchQuery}
                onChange={(e) => {
                  setSearchQuery(e.target.value);
                  setCurrentPage(1);
                }}
                className="search-input"
              />
              {searchQuery && (
                <button 
                  className="search-clear"
                  onClick={() => {
                    setSearchQuery('');
                    setCurrentPage(1);
                  }}
                  aria-label="Clear search"
                >
                  <i className="fas fa-times"></i>
                </button>
              )}
            </div>
            <div className="repositories-count">
              Showing {filteredRepos.length} of {repos.length} repositories
            </div>
          </div>

          {/* Repositories Grid */}
          {paginatedRepos.length > 0 ? (
            <>
              <div className="repositories-grid">
                {paginatedRepos.map((repo) => (
                  <div key={repo.id} className="repo-card">
                    <div className="repo-card-header">
                      <div className="repo-card-title-row">
                        <h3 className="repo-card-title">
                          <a 
                            href={repo.html_url} 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="repo-link"
                          >
                            <i className="fas fa-code-branch"></i>
                            {repo.name}
                          </a>
                        </h3>
                        {repo.private && (
                          <span className="repo-badge repo-badge-private">
                            <i className="fas fa-lock"></i> Private
                          </span>
                        )}
                        {repo.fork && (
                          <span className="repo-badge repo-badge-fork">
                            <i className="fas fa-code-branch"></i> Fork
                          </span>
                        )}
                      </div>
                    </div>
                    {repo.description && (
                      <p className="repo-card-description">{repo.description}</p>
                    )}
                    <div className="repo-card-footer">
                      <div className="repo-card-meta">
                        {repo.language && (
                          <div className="repo-meta-item">
                            <span 
                              className="repo-language-dot" 
                              style={{ backgroundColor: getLanguageColor(repo.language) }}
                            ></span>
                            <span className="repo-language">{repo.language}</span>
                          </div>
                        )}
                        {repo.stargazers_count > 0 && (
                          <div className="repo-meta-item">
                            <i className="fas fa-star"></i>
                            <span>{repo.stargazers_count}</span>
                          </div>
                        )}
                        {repo.forks_count > 0 && (
                          <div className="repo-meta-item">
                            <i className="fas fa-code-branch"></i>
                            <span>{repo.forks_count}</span>
                          </div>
                        )}
                        <div className="repo-meta-item">
                          <i className="fas fa-clock"></i>
                          <span>Updated {formatDate(repo.updated_at)}</span>
                        </div>
                      </div>
                      {repo.topics.length > 0 && (
                        <div className="repo-card-topics">
                          {repo.topics.slice(0, 3).map((topic) => (
                            <span key={topic} className="repo-topic">{topic}</span>
                          ))}
                          {repo.topics.length > 3 && (
                            <span className="repo-topic-more">+{repo.topics.length - 3}</span>
                          )}
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>

              {/* Pagination */}
              {totalPages > 1 && (
                <div className="repositories-pagination">
                  <button
                    className="pagination-btn"
                    onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
                    disabled={currentPage === 1}
                  >
                    <i className="fas fa-chevron-left"></i>
                    Previous
                  </button>
                  <div className="pagination-info">
                    Page {currentPage} of {totalPages}
                  </div>
                  <button
                    className="pagination-btn"
                    onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
                    disabled={currentPage === totalPages}
                  >
                    Next
                    <i className="fas fa-chevron-right"></i>
                  </button>
                </div>
              )}
            </>
          ) : (
            <div className="repositories-empty">
              <i className="fas fa-search"></i>
              <p>No repositories found matching your search.</p>
            </div>
          )}
        </div>
      </section>
    </main>
  );
}
