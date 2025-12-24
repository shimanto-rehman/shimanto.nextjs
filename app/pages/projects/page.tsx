'use client';

import { useState, useMemo } from 'react';
import styles from './Project.module.css';
import { projectData, Project, Category } from './projectData';
import Navbar, { navItems } from '@/app/components/Navbar';

const CATEGORIES: Category[] = ['All', 'AI & Research', 'Enterprise Systems', 'Creative & Web'];

export default function ProjectsPage() {
  const [activeCategory, setActiveCategory] = useState<Category>('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  // Dynamic Filtering Logic
  const filteredProjects = useMemo(() => {
    return projectData.filter(project => {
      const matchesCategory = activeCategory === 'All' || project.category === activeCategory;
      const matchesSearch = project.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                           project.description.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [activeCategory, searchQuery]);

  const openPopup = (p: Project) => {
    setSelectedProject(p);
    document.body.style.overflow = 'hidden';
  };

  const closePopup = () => {
    setSelectedProject(null);
    document.body.style.overflow = 'auto';
  };

  return (
    <main className="home-main">
      <Navbar items={navItems} logo="/images/shimanto.png" />

      <section className={styles.projectSection}>
        <div className={styles.container}>
          
          <div className={styles.sectionTitle}>
            <span className={styles.projectCaption}>Project Archives</span>
          </div>

          {/* Search and Filters */}
          <div className={styles.controls}>
            <div className={styles.searchBox}>
              <input 
                type="text" 
                placeholder="Search by tech or title..." 
                className={styles.searchInput}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            
            <div className={styles.filterBar}>
              {CATEGORIES.map(cat => (
                <button 
                  key={cat}
                  className={`${styles.filterBtn} ${activeCategory === cat ? styles.active : ''}`}
                  onClick={() => setActiveCategory(cat)}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          {/* Grid */}
          <div className={styles.projectItems}>
            {filteredProjects.map((project) => (
              <div key={project.id} className={styles.projectItemInner} onClick={() => openPopup(project)}>
                <div className={styles.projectItemImg}>
                  <div className={styles.statusBadge}>
                    <span className={styles.statusIcon}></span>
                    {project.status}
                  </div>
                  <img src={project.image} alt={project.title} />
                  <span className={styles.viewProject}>Access Data</span>
                </div>
                <p className={styles.projectItemTitle}>{project.title}</p>
                <div className={styles.ppTechStack} style={{ justifyContent: 'center', marginTop: '10px' }}>
                  {project.techStack.slice(0, 2).map(t => <span key={t} className={styles.techTag}>{t}</span>)}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Popup - Exactly matching your Certificate layout */}
      <div className={`${styles.projectPopup} ${selectedProject ? styles.open : ''}`}>
        <div className={styles.ppOverlay} onClick={closePopup}></div>
        {selectedProject && (
          <div className={styles.ppContent}>
            <div className={styles.ppContentInner}>
              <div className={styles.ppHeader}>
                <button className={styles.ppCloseBtn} onClick={closePopup}>&times;</button>
              </div>
              <div className={styles.ppBody}>
                <div className={styles.ppImgContainer}>
                  <img src={selectedProject.image} alt={selectedProject.title} height="350px" />
                </div>
                <div className={styles.ppDetails}>
                  <h3 className={styles.ppTitle}>{selectedProject.title}</h3>
                  <div className={styles.ppTechStack}>
                    {selectedProject.techStack.map(t => <span key={t} className={styles.techTag}>{t}</span>)}
                  </div>
                  <p className={styles.ppDesc}>{selectedProject.description}</p>
                  <p style={{ color: '#aaa', fontSize: '0.8rem', marginBottom: '20px' }}>
                    Category: <span style={{ color: '#ffa751' }}>{selectedProject.category}</span> | 
                    Status: <span style={{ color: '#ffa751' }}>{selectedProject.status}</span>
                  </p>
                  <a href={selectedProject.repoUrl} target="_blank" className={styles.ppLinkBtn}>View Github Repo</a>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </main>
  );
}