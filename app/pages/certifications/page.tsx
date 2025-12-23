// app/pages/certificates/page.tsx
'use client';

import { useState, useEffect } from 'react';
import styles from './Certificate.module.css';
import { certificates, Certificate } from './certificateData';
import Navbar, { navItems } from '@/app/components/Navbar';

export default function CertificatePage() {
  const [selectedCert, setSelectedCert] = useState<Certificate | null>(null);
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [showDetails, setShowDetails] = useState(false);

  // Open Popup
  const handleItemClick = (cert: Certificate) => {
    setSelectedCert(cert);
    setIsPopupOpen(true);
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

  const toggleDetails = () => setShowDetails(!showDetails);

  return (
    <main className="home-main">
      <Navbar items={navItems} logo="/images/shimanto.png" />

      <section className="home-section" id="certifications">
        <div className={styles.container}>
          <div className={styles.sectionTitle}>
            <span className={styles.projectCaption}>Certifications</span>
            <div className={styles.certificateLogo}>
              <img
                src="https://res.cloudinary.com/shimanto-rehman/image/upload/v1712786054/img/certificate-logo.webp"
                alt="Logo"
              />
            </div>
          </div>

          <div className={styles.certificateItems}>
            {certificates.map((cert) => (
              <div key={cert.id} className={styles.certificateItem}>
                <div
                  className={`${styles.certificateItemInner} ${styles.outerShadow}`}
                  onClick={() => handleItemClick(cert)}
                >
                  <div className={styles.certificateItemImg}>
                    <img src={cert.thumb} alt={cert.title} loading="lazy" />
                    <span className={styles.viewCertificate}>View Certificate</span>
                  </div>
                  <p className={styles.certificateItemTitle}>{cert.title}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Modern Glassmorphism Popup */}
      <div className={`${styles.certificatePopup} ${isPopupOpen ? styles.open : ''}`}>
        <div className={styles.ppOverlay} onClick={closePopup}></div>
        
        <div className={styles.ppContent}>
          <div className={`${styles.ppContentInner}`}>
            {/* Action Buttons */}
            <div className={styles.ppHeader}>
              <button className={styles.ppBtn} onClick={toggleDetails}>
                {showDetails ? 'Hide Details' : 'View Details'}
              </button>
              <button className={styles.ppCloseBtn} onClick={closePopup}>&times;</button>
            </div>

            <div className={styles.ppBody}>
              {/* Image Section */}
              <div className={styles.ppImgContainer}>
                <img 
                  src={selectedCert?.screenshots[0] || undefined} 
                  alt={selectedCert?.title} 
                  className={styles.ppImg} 
                />
              </div>

              {/* Details Section (Conditional Slide) */}
              <div className={`${styles.ppDetails} ${showDetails ? styles.active : ''}`}>
                <div className={styles.ppSeparator}></div>
                <div className={styles.ppDetailsGrid}>
                  <div className={styles.ppDescription}>
                    <h3>About this Certificate</h3>
                    <p>{selectedCert?.brief}</p>
                  </div>
                  <div className={styles.ppInfo}>
                    <h3>Information</h3>
                    <ul>
                      <li><strong>Issued:</strong> {selectedCert?.date}</li>
                      <li><strong>Authority:</strong> {selectedCert?.authority}</li>
                      <li><strong>Tools:</strong> {selectedCert?.tools}</li>
                    </ul>
                    <a href={selectedCert?.detailsUrl} target="_blank" className={styles.ppVerifyBtn}>
                      Verify Credentials
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}