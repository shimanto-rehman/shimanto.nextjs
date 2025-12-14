'use client';

import React, { useState, useMemo, useCallback } from 'react';
import Navbar, { navItems } from "../../components/Navbar";
import BlogPostModal from "./BlogPostModal";
import { allBlogPosts, BlogPost } from "./BlogPost";
import './Blog.css';

const allTags = Array.from(new Set(allBlogPosts.flatMap(post => post.tags)));
const allCategories = Array.from(new Set(allBlogPosts.map(post => post.category).filter((cat): cat is string => Boolean(cat))));

export default function BlogPage() {
  const [selectedTag, setSelectedTag] = useState<string | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedPost, setSelectedPost] = useState<BlogPost | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const postsPerPage = 10;

  const filteredPosts = useMemo(() => {
    let filtered = allBlogPosts.filter(post => {
      const matchesTag = !selectedTag || post.tags.includes(selectedTag);
      const matchesCategory = !selectedCategory || post.category === selectedCategory;
      const matchesSearch = !searchQuery.trim() || 
        post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        post.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        post.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase())) ||
        (post.category && post.category.toLowerCase().includes(searchQuery.toLowerCase()));
      return matchesTag && matchesCategory && matchesSearch;
    });
    return filtered.sort((a, b) => {
      if (a.pinned && !b.pinned) return -1;
      if (!a.pinned && b.pinned) return 1;
      return new Date(b.date).getTime() - new Date(a.date).getTime();
    });
  }, [selectedTag, selectedCategory, searchQuery]);

  const pinnedPosts = useMemo(() => filteredPosts.filter(post => post.pinned), [filteredPosts]);
  const regularPosts = useMemo(() => filteredPosts.filter(post => !post.pinned), [filteredPosts]);
  
  const paginatedPosts = useMemo(() => {
    const start = (currentPage - 1) * postsPerPage;
    return regularPosts.slice(start, start + postsPerPage);
  }, [regularPosts, currentPage]);

  const totalPages = Math.ceil(regularPosts.length / postsPerPage);

  const handleFilter = useCallback((type: 'tag' | 'category', value: string | null) => {
    if (type === 'tag') {
      setSelectedTag(prev => prev === value ? null : value);
      setSelectedCategory(null);
    } else {
      setSelectedCategory(prev => prev === value ? null : value);
      setSelectedTag(null);
    }
    setCurrentPage(1);
  }, []);

  const handleSearchChange = useCallback((query: string) => {
    setSearchQuery(query);
    setCurrentPage(1);
  }, []);

  const handlePostClick = useCallback((post: BlogPost) => {
    setSelectedPost(post);
    setIsModalOpen(true);
  }, []);

  return (
    <main className="home-main">
      <Navbar items={navItems} logo="/images/shimanto.png" />
      <section className="home-section">
        <div className="blog-container">
          <div className="blog-header-bar">
            <h1 className="blog-main-title">{'<blog />'}</h1>
            <h2 className="blog-subtitle"><code>{'<thinkingInPublic />'}</code> Exploring the Intersection of Technology and Thought</h2>
          </div>

          {/* Search Bar */}
          <div className="blog-search-container">
            <div className="blog-search">
              <i className="fas fa-search"></i>
              <input
                type="text"
                placeholder="Search posts by title, description, tags, or category..."
                value={searchQuery}
                onChange={(e) => handleSearchChange(e.target.value)}
                className="blog-search-input"
              />
              {searchQuery && (
                <button 
                  className="blog-search-clear"
                  onClick={() => handleSearchChange('')}
                  aria-label="Clear search"
                >
                  <i className="fas fa-times"></i>
                </button>
              )}
            </div>
            {searchQuery && (
              <div className="blog-search-count">
                Found {filteredPosts.length} post{filteredPosts.length !== 1 ? 's' : ''}
              </div>
            )}
          </div>

          <div className="blog-tag-category-list">
            <ul className="blog-tag-list">
              {allTags.map((tag, i) => (
                <li key={tag} style={{ display: 'flex', alignItems: 'center' }}>
                  {i > 0 && <span className="blog-tag-separator">•</span>}
                  <button
                    className={`blog-tag-button ${selectedTag === tag ? 'active' : ''}`}
                    onClick={() => handleFilter('tag', tag)}
                  >
                    <i className="fas fa-hashtag fa-sm"></i> {tag}
                  </button>
                </li>
              ))}
              {allCategories.map((category) => (
                <li key={category} style={{ display: 'flex', alignItems: 'center' }}>
                  <span className="blog-tag-separator">•</span>
                  <button
                    className={`blog-category-button ${selectedCategory === category ? 'active' : ''}`}
                    onClick={() => handleFilter('category', category)}
                  >
                    <i className="fas fa-tag fa-sm"></i> {category}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          <br />

          {pinnedPosts.length > 0 && (
            <div className="blog-featured-posts">
              <div className="blog-featured-row">
                {pinnedPosts.map((post) => (
                  <div key={post.id} className="blog-featured-col">
                    <div className="blog-card blog-card-hoverable" onClick={() => handlePostClick(post)}>
                      <div className="blog-card-pin"><i className="fas fa-thumbtack fa-xs"></i></div>
                      <div className="blog-card-body">
                        <h3 className="blog-card-title">{post.title}</h3>
                        <p className="blog-card-text">{post.description}</p>
                        <p className="blog-post-meta">
                          {post.readTime} min read &nbsp; · &nbsp; <i className="fas fa-calendar fa-sm"></i> {post.date}
                        </p>
                        {post.tags.length > 0 && (
                          <div className="blog-card-tags">
                            {post.tags.map((tag) => (
                              <span key={tag} className="blog-card-tag">
                                <i className="fas fa-hashtag fa-xs"></i> {tag}
                              </span>
                            ))}
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {pinnedPosts.length > 0 && regularPosts.length > 0 && <hr className="blog-divider" />}

          <ul className="blog-post-list">
            {paginatedPosts.map((post) => (
              <li key={post.id} className="blog-post-item">
                <div className="blog-post-card" onClick={() => handlePostClick(post)}>
                  <h3 className="blog-post-title">{post.title}</h3>
                  <p className="blog-post-description">{post.description}</p>
                  <p className="blog-post-meta">{post.readTime} min read &nbsp; · &nbsp; {post.date}</p>
                  {post.tags.length > 0 && (
                    <p className="blog-post-tags">
                      {post.tags.map((tag, idx) => (
                        <span key={tag}>
                          {idx > 0 && ' · '}
                          <button className="blog-tag-link" onClick={(e) => { e.stopPropagation(); handleFilter('tag', tag); }}>
                            <i className="fas fa-hashtag fa-sm"></i> {tag}
                          </button>
                        </span>
                      ))}
                      {post.category && (
                        <>
                          {' · '}
                          <button className="blog-category-link" onClick={(e) => { e.stopPropagation(); handleFilter('category', post.category!); }}>
                            <i className="fas fa-tag fa-sm"></i> {post.category}
                          </button>
                        </>
                      )}
                    </p>
                  )}
                </div>
              </li>
            ))}
          </ul>

          {totalPages > 1 && (
            <nav className="blog-pagination">
              <ul className="blog-pagination-list">
                <li className={`blog-page-item ${currentPage === 1 ? 'disabled' : ''}`}>
                  <button className="blog-page-link" onClick={() => setCurrentPage(p => Math.max(1, p - 1))} disabled={currentPage === 1}>&lt;</button>
                </li>
                {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => {
                  if (page === 1 || page === totalPages || (page >= currentPage - 1 && page <= currentPage + 1)) {
                    return (
                      <li key={page} className={`blog-page-item ${currentPage === page ? 'active' : ''}`}>
                        <button className="blog-page-link" onClick={() => setCurrentPage(page)}>{page}</button>
                      </li>
                    );
                  } else if (page === currentPage - 2 || page === currentPage + 2) {
                    return <li key={page} className="blog-page-item disabled"><span className="blog-page-link">...</span></li>;
                  }
                  return null;
                })}
                <li className={`blog-page-item ${currentPage === totalPages ? 'disabled' : ''}`}>
                  <button className="blog-page-link" onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))} disabled={currentPage === totalPages}>&gt;</button>
                </li>
              </ul>
            </nav>
          )}
        </div>
      </section>
      <BlogPostModal post={selectedPost} isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </main>
  );
}
