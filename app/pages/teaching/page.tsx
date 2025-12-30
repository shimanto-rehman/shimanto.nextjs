'use client';

import { useState, useEffect } from 'react';
import Navbar, { navItems } from "../../components/Navbar";
import styles from './Teaching.module.css';
import { teachingData } from './teachingData';

export default function TeachingPage() {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    // Trigger animations after mount
    setIsLoaded(true);
  }, []);

  const hasData = teachingData && teachingData.length > 0;

  return (
    <main className={styles.mainWrapper}>
      <Navbar items={navItems} logo="/images/shimanto.png" />

      {/* Header */}
      <div className={styles.headerContainer}>
        <h1 className={styles.title}>
          TEACHING <span className={styles.hollow}>JOURNEY</span>
        </h1>
        <p className={styles.subtitle}>
          Sharing knowledge and mentoring the next generation.
        </p>
      </div>

      {/* Content Area */}
      <div className={styles.gridContainer}>
        
        {hasData ? (
          // RENDER DATA IF EXISTS
          teachingData.map((item, index) => (
            <div 
              key={item.id} 
              className={`${styles.card} ${isLoaded ? styles.animateCard : ''}`}
              style={{ '--delay': `${index * 0.15}s` } as React.CSSProperties}
            >
              <div className={styles.cardHeader}>
                <div>
                  <h2 className={styles.role}>{item.role}</h2>
                  <h3 className={styles.institution}>{item.institution}</h3>
                </div>
                <span className={styles.period}>{item.period}</span>
              </div>

              <p className={styles.description}>{item.description}</p>

              {item.courses.length > 0 && (
                <div className={styles.coursesList}>
                  {item.courses.map((course, idx) => (
                    <span key={idx} className={styles.courseTag}>
                      {course}
                    </span>
                  ))}
                </div>
              )}
            </div>
          ))
        ) : (
          // RENDER EMPTY STATE IF NO DATA
          <div className={styles.emptyState}>
            <div className={styles.emptyIcon}>
              <i className="fas fa-chalkboard-teacher"></i>
            </div>
            <h2 className={styles.emptyText}>No Teaching Experience Yet</h2>
            <p className={styles.emptySub}>
              I am currently focusing on development and research. <br />
              Updates will appear here as I begin my teaching journey.
            </p>
          </div>
        )}

      </div>
    </main>
  );
}