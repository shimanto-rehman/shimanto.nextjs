// app/pages/certificates/page.tsx
'use client';

import { useState } from 'react';
import styles from './Certificate.module.css';
import { certificates, Certificate } from './certificateData';
import Navbar, { navItems } from '@/app/components/Navbar';

export default function CertificatePage() {
  const [selectedCert, setSelectedCert] = useState<Certificate | null>(null);
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [showDetails, setShowDetails] = useState(false);
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);

  // Open Popup
  const handleItemClick = (cert: Certificate) => {
    setSelectedCert(cert);
    setCurrentSlideIndex(0); // Reset to first screenshot
    setIsPopupOpen(true);
    // Prevent background scrolling
    if (typeof document !== 'undefined') {
      document.body.style.overflow = 'hidden';
    }
  };

  // Close Popup
  const closePopup = () => {
    setIsPopupOpen(false);
    setShowDetails(false);
    setSelectedCert(null);
    if (typeof document !== 'undefined') {
      document.body.style.overflow = 'auto';
    }
  };

  // Toggle Details
  const toggleDetails = () => {
    setShowDetails((prev) => !prev);
  };

  // Next Slide (Next Certificate)
  const nextSlide = () => {
    if (!selectedCert) return;
    const currentIndex = certificates.findIndex((c) => c.id === selectedCert.id);
    if (currentIndex < certificates.length - 1) {
      setSelectedCert(certificates[currentIndex + 1]);
      setCurrentSlideIndex(0);
    } else {
      // Loop back to start
      setSelectedCert(certificates[0]);
      setCurrentSlideIndex(0);
    }
  };

  // Prev Slide (Previous Certificate)
  const prevSlide = () => {
    if (!selectedCert) return;
    const currentIndex = certificates.findIndex((c) => c.id === selectedCert.id);
    if (currentIndex > 0) {
      setSelectedCert(certificates[currentIndex - 1]);
      setCurrentSlideIndex(0);
    } else {
      // Loop to end
      setSelectedCert(certificates[certificates.length - 1]);
      setCurrentSlideIndex(0);
    }
  };

  // Helper: Get Current Screenshot
  const getCurrentScreenshot = () => {
    if (selectedCert && selectedCert.screenshots.length > 0) {
      return selectedCert.screenshots[currentSlideIndex];
    }
    // FIX: Return undefined instead of '' to prevent console error
    return undefined; 
  };

  return (
    <main className="home-main">
      <Navbar items={navItems} logo="/images/shimanto.png" />

      {/* Certificate Section Starts */}
      <section className={`${styles.certificateSection} section fx-section`} id="certifications">
        <div className={styles.container}>
          <div className={styles.row}>
            <div className={styles.sectionTitle}>
              <div className="project-head">
                <span className={styles.projectCaption}>Certifications</span>
              </div>
              <div className={styles.certificateLogo}>
                <img
                  src="https://res.cloudinary.com/shimanto-rehman/image/upload/v1712786054/img/certificate-logo.webp"
                  loading="lazy"
                  alt="Shimanto Rehman Certificate Logo"
                />
              </div>
            </div>
          </div>

          {/* Certificate Items Grid */}
          <div className={styles.certificateItems}>
            {certificates.map((cert) => (
              <div key={cert.id} className={styles.certificateItem}>
                <div
                  className={`${styles.certificateItemInner} ${styles.outerShadow}`}
                  onClick={() => handleItemClick(cert)}
                >
                  <div className={styles.certificateItemImg}>
                    <img src={cert.thumb} loading="lazy" alt={cert.title} />
                    <span className={styles.viewCertificate}>view certificate</span>
                  </div>
                  <p className={styles.certificateItemTitle}>{cert.title}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
      {/* Certificate Section Ends */}

      {/* Certificate Popup Starts */}
      <div className={`${styles.certificatePopup} ${isPopupOpen ? styles.open : ''}`}>
        
        {/* Main Popup Content (Image & Controls) */}
        <div className={styles.ppMain}>
          <div className={styles.ppMainInner}>
            {/* Close Button */}
            <div 
              className={`${styles.ppClose} ${styles.outerShadow} ${styles.hoverInShadow}`} 
              onClick={closePopup}
            >
              &times;
            </div>
            
            {/* Details Toggle Button */}
            <div 
              className={`${styles.ppCertificateDetailsBtn} ${styles.outerShadow} ${styles.hoverInShadow}`}
              onClick={toggleDetails}
            >
              {showDetails ? 'Hide Details' : 'Certificate Details'} <i className={`fas ${showDetails ? 'fa-minus' : 'fa-plus'}`}></i>
            </div>

            {/* Main Image */}
            <img 
              src={getCurrentScreenshot() || undefined} 
              alt={selectedCert?.title || 'Certificate'} 
              className={`${styles.ppImg} ${styles.outerShadow}`} 
            />

            {/* Counter (Optional) */}
            <div className="pp-counter"></div> 

            {/* View Certificate Link Button */}
            <div className="certificate-btn" style={{ marginTop: '20px', textAlign: 'center' }}>
                {selectedCert && (
                  <a 
                    href={selectedCert.detailsUrl} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="link-item btn-1 outer-shadow hover-in-shadow"
                    style={{ 
                        padding: '10px 25px', 
                        borderRadius: '30px', 
                        color: 'var(--skin-color)', 
                        fontWeight: 500, 
                        textDecoration: 'none' 
                    }}
                  >
                    View Certificate Source
                  </a>
                )}
            </div>
          </div>

          {/* Navigation Arrows */}
          <div className={styles.ppPrev} onClick={prevSlide}>
            <i className="fas fa-play"></i>
          </div>
          <div className={styles.ppNext} onClick={nextSlide}>
            <i className="fas fa-play"></i>
          </div>
        </div>

        {/* Certificate Details Section (Slides Down) */}
        {selectedCert && (
            <div 
                className={`${styles.ppDetails} ${showDetails ? styles.active : ''}`}
                style={{ maxHeight: showDetails ? '500px' : '0px' }} // animate height
            >
            <div className={styles.ppDetailsInner}>
                <div className={styles.ppTitle}>
                    <h2>{selectedCert.title}</h2>
                    <p>Category - <span>{selectedCert.category}</span></p>
                </div>
                <div className={styles.ppCertificateDetails}>
                    <div className={styles.row}>
                        <div className={styles.description}>
                            <h3>Certificate Brief:</h3>
                            <p>{selectedCert.brief}</p>
                        </div>
                        <div className={styles.info}>
                            <h3>Certificate Info</h3>
                            <ul>
                                <li>Date - <span>{selectedCert.date}</span></li>
                                <li>Issuing Authority - <span>{selectedCert.authority}</span></li>
                                <li>Tools - <span>{selectedCert.tools}</span></li>
                                <li>Details - <span><a href={selectedCert.detailsUrl} target="_blank" rel="noreferrer">View Details</a></span></li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
          </div>
        )}
        
        {/* Separator Line */}
        <div className={`${styles.separator} ${showDetails ? styles.active : ''}`}></div>
      </div>
      {/* Certificate Popup Ends */}
    </main>
  );
}