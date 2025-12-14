// app/repositories/RepositoriesClient.tsx
'use client';

import { useState, useMemo } from 'react';
import Navbar, { navItems } from "../../components/Navbar";
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

interface GitHubStats {
  totalStars: number;
  totalCommits: number;
  totalPRs: number;
  totalIssues: number;
  contributedTo: number;
  grade: string;
  gradePercentage: number;
}

interface RepositoriesClientProps {
  initialUser: GitHubUser;
  initialRepos: GitHubRepo[];
  initialStats: GitHubStats | null;
}

// This component runs on CLIENT side (browser)
export default function RepositoriesClient({ initialUser, initialRepos, initialStats }: RepositoriesClientProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const reposPerPage = 9;

  // Filter repositories based on search
  const filteredRepos = useMemo(() => {
    if (!searchQuery.trim()) return initialRepos;
    const query = searchQuery.toLowerCase();
    return initialRepos.filter(repo => 
      repo.name.toLowerCase().includes(query) ||
      (repo.description && repo.description.toLowerCase().includes(query)) ||
      repo.language?.toLowerCase().includes(query) ||
      repo.topics.some(topic => topic.toLowerCase().includes(query))
    );
  }, [initialRepos, searchQuery]);

  // Paginate filtered results
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

  return (
    <main className="home-main">
      <Navbar items={navItems} logo="/images/shimanto.png" />
      <section className="repositories-section">
        <div className="repositories-container">
          {/* Profile Section */}
          <div className="repositories-profile">
            <div className="profile-card">
              <div className="profile-avatar">
                <img 
                  src={initialUser.avatar_url} 
                  alt={initialUser.name || initialUser.login}
                  loading="eager"
                  decoding="async"
                />
              </div>
              <div className="profile-info">
                <div className="profile-header">
                  <div>
                    <h1 className="profile-name">{initialUser.name || initialUser.login}</h1>
                    <p className="profile-username">@{initialUser.login}</p>
                  </div>
                  <a 
                    href={initialUser.html_url} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="profile-github-btn"
                  >
                    <i className="fab fa-github"></i>
                    GitHub
                  </a>
                </div>
                {initialUser.bio && <p className="profile-bio">{initialUser.bio}</p>}
                <div className="profile-stats">
                  <div className="profile-stat">
                    <i className="fas fa-code-branch"></i>
                    <span className="stat-number">{initialUser.public_repos}</span>
                    <span className="stat-label">Repos</span>
                  </div>
                  <div className="profile-stat">
                    <i className="fas fa-users"></i>
                    <span className="stat-number">{initialUser.followers}</span>
                    <span className="stat-label">Followers</span>
                  </div>
                  <div className="profile-stat">
                    <i className="fas fa-user-plus"></i>
                    <span className="stat-number">{initialUser.following}</span>
                    <span className="stat-label">Following</span>
                  </div>
                </div>
                <div className="profile-meta">
                  {initialUser.location && (
                    <div className="profile-meta-item">
                      <i className="fas fa-map-marker-alt"></i>
                      <span>{initialUser.location}</span>
                    </div>
                  )}
                  {initialUser.company && (
                    <div className="profile-meta-item">
                      <i className="fas fa-building"></i>
                      <span>{initialUser.company}</span>
                    </div>
                  )}
                  {initialUser.blog && (
                    <div className="profile-meta-item">
                      <i className="fas fa-link"></i>
                      <a href={initialUser.blog} target="_blank" rel="noopener noreferrer">
                        {initialUser.blog}
                      </a>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* GitHub Stats Section */}
          {initialStats && (
            <div className="github-stats-card">
              <h2 className="github-stats-title">{initialUser.name || initialUser.login}'s GitHub Stats</h2>
              <div className="github-stats-grid">
                <div className="github-stats-list">
                  <div className="github-stat"><i className="far fa-star"></i><span>Total Stars Earned:</span><strong>{initialStats.totalStars >= 1000 ? (initialStats.totalStars / 1000).toFixed(1) + 'k' : initialStats.totalStars.toLocaleString()}</strong></div>
                  <div className="github-stat"><i className="fas fa-code-branch"></i><span>Total Commits (last year):</span><strong>{initialStats.totalCommits >= 1000 ? (initialStats.totalCommits / 1000).toFixed(1) + 'k' : initialStats.totalCommits.toLocaleString()}</strong></div>
                  <div className="github-stat"><i className="fas fa-code-pull-request"></i><span>Total PRs:</span><strong>{initialStats.totalPRs}</strong></div>
                  <div className="github-stat"><i className="far fa-circle-dot"></i><span>Total Issues:</span><strong>{initialStats.totalIssues}</strong></div>
                  <div className="github-stat"><i className="far fa-bookmark"></i><span>Contributed to (last year):</span><strong>{initialStats.contributedTo}</strong></div>
                </div>
                <div className="github-grade-circle">
                  <svg viewBox="0 0 120 120">
                    <circle cx="60" cy="60" r="54" fill="none" stroke="rgba(255,255,255,0.1)" strokeWidth="8"/>
                    <circle cx="60" cy="60" r="54" fill="none" stroke="rgba(200,170,50,0.8)" strokeWidth="8" strokeLinecap="round" strokeDasharray={`${339}`} strokeDashoffset={`${339 * (1 - initialStats.gradePercentage / 100)}`} transform="rotate(-90 60 60)"/>
                  </svg>
                  <div className="github-grade-letter">{initialStats.grade}</div>
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
              Showing {filteredRepos.length} of {initialRepos.length} repositories
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
                        <div className="repo-meta-item">
                          <i className="fas fa-star"></i>
                          <span>{repo.stargazers_count}</span>
                        </div>
                        <div className="repo-meta-item">
                          <i className="fas fa-code-branch"></i>
                          <span>{repo.forks_count}</span>
                        </div>
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