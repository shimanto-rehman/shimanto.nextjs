'use client';

import { useState, useEffect } from 'react';
import Navbar, { navItems } from "../../components/Navbar";
import styles from './Resources.module.css';
import { resourcesData, Resource } from './resourcesData';

export default function ResourcesPage() {
  const [selectedPdf, setSelectedPdf] = useState<Resource | null>(null);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  useEffect(() => {
    document.body.style.overflow = selectedPdf ? 'hidden' : 'auto';
  }, [selectedPdf]);

  const openPdf = (res: Resource) => setSelectedPdf(res);
  const closePdf = () => setSelectedPdf(null);

  return (
    <main className={styles.mainWrapper}>
      <Navbar items={navItems} logo="/images/shimanto.png" />

      <section className={styles.floatingSection}>
        {/* Center Text */}
        <div className={styles.headerSection}>
          <h1 className={`${styles.title} ${isLoaded ? styles.fadeIn : ''}`}>
            KNOWLEDGE <span className={styles.hollow}>ARCHIVE</span>
          </h1>
        </div>

        {/* Floating Images */}
        {resourcesData.map((res, index) => (
          <div
            key={res.id}
            className={`${styles.floatingCard} ${isLoaded ? styles.cardEaseIn : ''}`}
            // Stagger delay slightly for entrance
            style={{ '--delay': `${0.5 + (index * 0.1)}s` } as React.CSSProperties}
            onClick={() => openPdf(res)}
          >
            <div className={styles.cardInner}>
              <img 
                src={res.thumbnail} 
                alt={res.title}
                loading="lazy"
                className={styles.cardImage}
              />
              <div className={styles.cardOverlay}>
                <i className="fas fa-expand-alt"></i>
              </div>
            </div>
          </div>
        ))}
      </section>

      {/* PDF Popup */}
      {selectedPdf && (
        <div className={styles.popupOverlay} onClick={closePdf}>
          <div className={styles.popupContent} onClick={(e) => e.stopPropagation()}>
            <div className={styles.popupHeader}>
              <div className={styles.popupTitle}>
                <h3>{selectedPdf.title}</h3>
                <span className={styles.popupCategory}>PDF Resource</span>
              </div>
              <button className={styles.closeBtn} onClick={closePdf}>&times;</button>
            </div>
            <div className={styles.popupBody}>
              <iframe 
                src={`${selectedPdf.pdfUrl}#toolbar=0&view=FitH`} 
                title={selectedPdf.title}
                className={styles.pdfFrame}
                loading="lazy"
              />
            </div>
          </div>
        </div>
      )}
    </main>
  );
}