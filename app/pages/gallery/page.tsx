'use client';

import { useState, useEffect, useCallback } from 'react';
import { CldImage } from 'next-cloudinary';
import { motion, AnimatePresence } from 'framer-motion';
import Navbar, { navItems } from '@/app/components/Navbar';
import { usePageDataLoaded } from '@/app/hooks/usePageDataLoaded';
import styles from './Gallery.module.css';
import { galleryData } from './galleryData';

export default function GalleryPage() {
  const [selectedIndex, setSelectedIndex] = useState<{eIdx: number, iIdx: number} | null>(null);
  const [imgLoaded, setImgLoaded] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  
  usePageDataLoaded();

  // Instant load on mount
  useEffect(() => {
    setIsMounted(true);
  }, []);

  const currentImage = selectedIndex 
    ? galleryData[selectedIndex.eIdx].images[selectedIndex.iIdx] 
    : null;

  const navigate = useCallback((direction: number) => {
    if (!selectedIndex) return;
    setImgLoaded(false); 

    const { eIdx, iIdx } = selectedIndex;
    const currentEvent = galleryData[eIdx];
    let newIdx = iIdx + direction;

    if (newIdx < 0) newIdx = currentEvent.images.length - 1;
    if (newIdx >= currentEvent.images.length) newIdx = 0;

    setSelectedIndex({ eIdx, iIdx: newIdx });
  }, [selectedIndex]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!selectedIndex) return;
      if (e.key === 'Escape') setSelectedIndex(null);
      if (e.key === 'ArrowRight') navigate(1);
      if (e.key === 'ArrowLeft') navigate(-1);
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selectedIndex, navigate]);

  return (
    <main className="home-main">
      <Navbar items={navItems} logo="/images/shimanto.png" />

      <header className={styles.header}>
        <h1 className={styles.title}>VISUAL <span className={styles.hollow}>DIARY</span></h1>
        <p className={styles.subtitle}>Curated moments in time and light.</p>
      </header>

      <div className={styles.contentContainer}>
        {galleryData.map((event, eIdx) => (
          <section key={event.id} className={styles.section}>
            <div className={styles.sectionHeader}>
              <h2 className={styles.sectionTitle}>{event.title}</h2>
              <span className={styles.sectionDate}>{event.date}</span>
            </div>
            
            <div className={`${styles.galleryGrid} ${isMounted ? styles.gridVisible : ''}`}>
              {event.images.map((img, iIdx) => (
                <div
                  key={img.id}
                  className={styles.gridItem}
                  onClick={() => {
                    setImgLoaded(false);
                    setSelectedIndex({ eIdx, iIdx });
                  }}
                  // Flex-grow only affects Desktop. Mobile ignores this due to 'display: grid'
                  style={{ 
                    flexGrow: img.width / img.height, 
                    flexBasis: `${(img.width / img.height) * 250}px` 
                  } as any}
                >
                  <div className={styles.imageInner} style={{ aspectRatio: `${img.width}/${img.height}` }}>
                    <CldImage
                      src={img.publicId}
                      width={500} 
                      height={500}
                      alt={img.description}
                      className={styles.thumbImage}
                      crop="fill"
                      format="auto"    
                      quality="auto"
                      loading={eIdx === 0 && iIdx === 0 ? "eager" : "lazy"}
                      sizes="(max-width: 768px) 33vw, (max-width: 1200px) 50vw, 33vw"
                    />
                    <div className={styles.hoverOverlay}>
                      <i className="fas fa-expand"></i>
                    </div>
                  </div>
                </div>
              ))}
              {/* Spacer keeps last row aligned on Desktop */}
              <div className={styles.spacer}></div>
            </div>
          </section>
        ))}
      </div>

      {/* FULLSCREEN POPUP */}
      <AnimatePresence>
        {selectedIndex && currentImage && (
          <motion.div 
            className={styles.modalOverlay}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={() => setSelectedIndex(null)}
          >
            <button className={`${styles.navBtn} ${styles.prevBtn}`} onClick={(e) => { e.stopPropagation(); navigate(-1); }}>
              <i className="fas fa-chevron-left"></i>
            </button>
            <button className={`${styles.navBtn} ${styles.nextBtn}`} onClick={(e) => { e.stopPropagation(); navigate(1); }}>
              <i className="fas fa-chevron-right"></i>
            </button>
            <button className={styles.closeBtn} onClick={() => setSelectedIndex(null)}>
              &times;
            </button>

            <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
              {!imgLoaded && (
                <div className={styles.loader}>
                  <div className={styles.spinner}></div>
                </div>
              )}

              <div className={styles.fullImageWrapper}>
                <CldImage
                  src={currentImage.publicId}
                  width={1920}
                  height={1080}
                  alt={currentImage.description}
                  className={`${styles.fullImage} ${imgLoaded ? styles.loaded : ''}`}
                  onLoad={() => setImgLoaded(true)}
                  format="auto"
                  quality="auto" // FIXED: Changed from "q_auto" to "auto"
                  priority
                />
              </div>

              <div className={styles.descriptionOverlay}>
                <div className={styles.textContainer}>
                  <p>{currentImage.description}</p>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  );
}