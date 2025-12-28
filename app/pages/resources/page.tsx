'use client';
import { useState, useEffect, useMemo } from 'react';
import Navbar, { navItems } from "../../components/Navbar";
import styles from './Resources.module.css';
import { resourcesData, Resource } from './resourcesData';

export default function ResourcesPage() {
  const [selectedPdf, setSelectedPdf] = useState<Resource | null>(null);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setIsLoaded(true);
    return () => { document.body.style.overflow = 'auto'; };
  }, []);

  // Pre-defined "Scatter" coordinates to ensure looks good on all screens
  // This prevents images from being "too random" and looking ugly.
  const scatterPositions = [
    { top: '10%', left: '5%', rot: -8, scale: 1.1 },
    { top: '15%', left: '65%', rot: 10, scale: 0.9 },
    { top: '50%', left: '10%', rot: 5, scale: 1.0 },
    { top: '55%', left: '70%', rot: -12, scale: 1.2 },
    { top: '30%', left: '40%', rot: -3, scale: 0.85 },
    { top: '70%', left: '35%', rot: 7, scale: 1.05 },
  ];

  const closePdf = () => {
    setSelectedPdf(null);
    document.body.style.overflow = 'auto';
  };

  return (
    <main className="home-main">
      <Navbar items={navItems} logo="/images/shimanto.png" />

      <section className={styles.resourceSection}>
        <div className={styles.canvas}>
          
          {/* Central Typography - Fixed Layer */}
          <div className={`${styles.centerText} ${isLoaded ? styles.textFadeIn : ''}`}>
            <h1 className={styles.titleGradient}>KNOWLEDGE</h1>
            <h1 className={styles.titleOutline}>ARCHIVE</h1>
            <p className={styles.description}>Handpicked resources for deep learning.</p>
          </div>

          {/* Flying Collage Items */}
          <div className={styles.collageContainer}>
            {resourcesData.map((res, i) => {
              const pos = scatterPositions[i % scatterPositions.length];
              return (
                <div 
                  key={res.id}
                  className={`${styles.scatterItem} ${isLoaded ? styles.flyIn : ''}`}
                  onClick={() => {
                    setSelectedPdf(res);
                    document.body.style.overflow = 'hidden';
                  }}
                  style={{
                    top: pos.top,
                    left: pos.left,
                    '--rotation': `${pos.rot}deg`,
                    '--scale': pos.scale,
                    '--delay': `${i * 0.15}s`
                  } as any}
                >
                  <div className={styles.glassCard}>
                    <div className={styles.imgBox}>
                      <img src={res.thumbnail} alt={res.title} />
                    </div>
                    <div className={styles.cardInfo}>
                      <span>{res.title}</span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* PDF Modal with Transparency Theme */}
      {selectedPdf && (
        <div className={styles.modalOverlay} onClick={closePdf}>
          <div className={styles.modalContent} onClick={e => e.stopPropagation()}>
            <div className={styles.modalHeader}>
              <div>
                <h3>{selectedPdf.title}</h3>
                <p>{selectedPdf.description}</p>
              </div>
              <button onClick={closePdf} className={styles.closeBtn}>&times;</button>
            </div>
            <div className={styles.pdfFrameWrapper}>
              <iframe src={`${selectedPdf.pdfUrl}#toolbar=0`} />
            </div>
          </div>
        </div>
      )}
    </main>
  );
}