'use client';

import { useState, useMemo } from 'react';
import Navbar, { navItems } from "../../components/Navbar";
import { usePageDataLoaded } from "../../hooks/usePageDataLoaded";
import type { ScholarProfile, OrcidProfile, Publication } from "./page";
import './Publications.css';

interface PublicationsClientProps {
  initialScholar: ScholarProfile;
  initialOrcid: OrcidProfile;
  initialPublications: Publication[];
}

export default function PublicationsClient({
  initialScholar,
  initialOrcid,
  initialPublications,
}: PublicationsClientProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [avatarLoaded, setAvatarLoaded] = useState(false);
  const perPage = 10;

  const filteredPublications = useMemo(() => {
    if (!searchQuery.trim()) return initialPublications;
    const q = searchQuery.toLowerCase();
    return initialPublications.filter((pub) =>
      pub.title.toLowerCase().includes(q) ||
      pub.authors.toLowerCase().includes(q) ||
      pub.venue.toLowerCase().includes(q) ||
      String(pub.year).includes(q) ||
      pub.tags?.some((t) => t.toLowerCase().includes(q))
    );
  }, [initialPublications, searchQuery]);

  const totalPages = Math.ceil(filteredPublications.length / perPage) || 1;
  const paginatedPublications = useMemo(() => {
    const start = (currentPage - 1) * perPage;
    return filteredPublications.slice(start, start + perPage);
  }, [filteredPublications, currentPage]);

  // Signal that this page's data is ready (all data is static/SSR here)
  usePageDataLoaded();

  return (
    <main className="home-main">
      <Navbar items={navItems} logo="/images/shimanto.png" />
      <section className="home-section">
        <div className="publications-container">
          {/* Scholar profile header */}
          <section className="pub-profile-card pub-profile-scholar">
            <div className="pub-profile-avatar">
              {!avatarLoaded && <div className="avatar-loader"></div>}
              <img
                src={initialScholar.avatarUrl || '/images/shimanto.webp'}
                alt={initialScholar.name}
                loading="eager"
                decoding="async"
                onLoad={() => setAvatarLoaded(true)}
                style={{ opacity: avatarLoaded ? 1 : 0 }}
              />
            </div>
            <div className="pub-profile-main">
              <div className="pub-profile-header-row">
                <div>
                  <h1 className="pub-profile-name">
                    {initialScholar.name}
                    <span className="pub-profile-badge" aria-label="verified researcher">
                      ○
                    </span>
                  </h1>
                  {initialScholar.affiliation && (
                    <p className="pub-profile-subtitle">{initialScholar.affiliation}</p>
                  )}
                  {initialScholar.email && (
                    <p className="pub-profile-email">{initialScholar.email}</p>
                  )}
                  {initialScholar.country && (
                    <p className="pub-profile-location">{initialScholar.country}</p>
                  )}
                </div>
                <a
                  href={initialScholar.profileUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="pub-profile-cta"
                >
                  <i className="fas fa-graduation-cap" /> Scholar profile
                </a>
              </div>
              {initialScholar.interests && initialScholar.interests.length > 0 && (
                <div className="pub-profile-interests">
                  {initialScholar.interests.slice(0, 6).map((interest) => (
                    <span key={interest.name} className="pub-interest-chip">
                      {interest.name}
                    </span>
                  ))}
                </div>
              )}
              <div className="pub-profile-metrics">
                <div className="pub-metric">
                  <span className="pub-metric-label">Citations</span>
                  <span className="pub-metric-value">
                    {initialScholar.citations}
                  </span>
                </div>
                <div className="pub-metric">
                  <span className="pub-metric-label">h‑index</span>
                  <span className="pub-metric-value">{initialScholar.hIndex}</span>
                </div>
                <div className="pub-metric">
                  <span className="pub-metric-label">i10‑index</span>
                  <span className="pub-metric-value">{initialScholar.i10Index}</span>
                </div>
              </div>
            </div>
          </section>

          {/* ORCID profile */}
          <section className="pub-profile-card pub-profile-orcid">
            <div className="pub-orcid-main">
              <div className="pub-orcid-header-row">
                <div>
                  <p className="pub-orcid-label">ORCID iD</p>
                  <h2 className="pub-orcid-name">
                    {initialOrcid.name}{' '}
                    <span className="pub-orcid-id">{initialOrcid.orcid}</span>
                  </h2>
                  <p className="pub-orcid-affil">
                    {initialOrcid.affiliation} · {initialOrcid.country}
                  </p>
                </div>
                <a
                  href={initialOrcid.profileUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="pub-profile-cta pub-orcid-cta"
                >
                  <i className="fab fa-orcid" /> ORCID profile
                </a>
              </div>
              <div className="pub-orcid-metrics">
                <div className="pub-metric">
                  <span className="pub-metric-label">Works</span>
                  <span className="pub-metric-value">{initialOrcid.totalWorks}</span>
                </div>
                {initialOrcid.lastActiveYear && (
                  <div className="pub-metric">
                    <span className="pub-metric-label">Last active</span>
                    <span className="pub-metric-value">
                      {initialOrcid.lastActiveYear}
                    </span>
                  </div>
                )}
              </div>
              {initialOrcid.biography && (
                <p className="pub-orcid-bio">{initialOrcid.biography}</p>
              )}
              {initialOrcid.keywords && initialOrcid.keywords.length > 0 && (
                <div className="pub-orcid-keywords">
                  {initialOrcid.keywords.map((keyword, idx) => (
                    <span key={idx} className="pub-keyword-chip">
                      {keyword}
                    </span>
                  ))}
                </div>
              )}
            </div>
          </section>

          {/* Search */}
          <section className="pub-search-section">
            <div className="pub-search-bar">
              <i className="fas fa-search" />
              <input
                type="text"
                placeholder="Search publications by title, venue, year, or co‑author…"
                value={searchQuery}
                onChange={(e) => {
                  setSearchQuery(e.target.value);
                  setCurrentPage(1);
                }}
              />
              {searchQuery && (
                <button
                  className="pub-search-clear"
                  onClick={() => {
                    setSearchQuery('');
                    setCurrentPage(1);
                  }}
                  aria-label="Clear search"
                >
                  <i className="fas fa-times" />
                </button>
              )}
            </div>
            {searchQuery && (
              <p className="pub-search-count">
                Found {filteredPublications.length} publication
                {filteredPublications.length !== 1 ? 's' : ''}
              </p>
            )}
          </section>

          {/* Publications list */}
          <section className="pub-list-section">
            {paginatedPublications.map((pub) => (
              <article key={pub.id} className="pub-card">
                <div className="pub-card-left">
                  <div className="pub-venue-tag">
                    {pub.venue || 'Publication'}
                  </div>
                  <div className="pub-year">{pub.year}</div>
                </div>
                <div className="pub-card-main">
                  <h3 className="pub-title">
                    <a href={pub.url} target="_blank" rel="noopener noreferrer">
                      {pub.title}
                    </a>
                  </h3>
                  <p className="pub-authors">{pub.authors}</p>
                  <p className="pub-meta">
                    <span className="pub-meta-venue">{pub.venue}</span>
                    {pub.volume && <> · Vol. {pub.volume}</>}
                    {pub.issue && <> · Issue {pub.issue}</>}
                    {pub.pages && <> · pp. {pub.pages}</>}
                    {pub.doi && (
                      <>
                        {' · '}
                        <span className="pub-meta-doi">DOI: {pub.doi}</span>
                      </>
                    )}
                  </p>
                  {pub.abstract && (
                    <p className="pub-abstract">
                      {pub.abstract}
                    </p>
                  )}
                  <div className="pub-links-row">
                    <a href={pub.url} target="_blank" rel="noopener noreferrer" className="pub-link-btn">
                      HTML
                    </a>
                    {pub.doi && (
                      <a
                        href={`https://doi.org/${pub.doi}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="pub-link-btn"
                      >
                        DOI
                      </a>
                    )}
                    <a
                      href={pub.url + '#citeas'}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="pub-link-btn"
                    >
                      Citations
                    </a>
                  </div>
                  <div className="pub-metrics-row">
                    {typeof pub.citations === 'number' && (
                      <span className="pub-metric-chip">
                        <i className="fas fa-quote-right" /> {pub.citations} citations
                      </span>
                    )}
                    {typeof pub.altmetricScore === 'number' && (
                      <span className="pub-metric-chip">
                        <i className="fas fa-signal" /> Altmetric {pub.altmetricScore}
                      </span>
                    )}
                    {pub.tags && pub.tags.length > 0 && (
                      <span className="pub-metric-chip">
                        <i className="fas fa-tag" /> {pub.tags.join(' · ')}
                      </span>
                    )}
                  </div>
                </div>
              </article>
            ))}

            {/* Pagination */}
            <nav className="pub-pagination" aria-label="Publications pagination">
              <button
                className="pub-page-btn"
                onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                disabled={currentPage === 1}
              >
                <i className="fas fa-chevron-left" /> Prev
              </button>
              <span className="pub-page-info">
                Page {currentPage} of {totalPages}
              </span>
              <button
                className="pub-page-btn"
                onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
                disabled={currentPage === totalPages}
              >
                Next <i className="fas fa-chevron-right" />
              </button>
            </nav>
          </section>
        </div>
      </section>
    </main>
  );
}


