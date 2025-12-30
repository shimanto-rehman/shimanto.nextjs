'use client';

import { useState } from 'react';
import Navbar, { navItems } from '@/app/components/Navbar';
import styles from './Contact.module.css';

export default function ContactPage() {
  const [isRightPanelActive, setIsRightPanelActive] = useState(false);
  const [loading, setLoading] = useState(false);
  const [emailForm, setEmailForm] = useState({ name: '', email: '', subject: '', message: '' });
  const [toast, setToast] = useState<{ show: boolean; type: 'success' | 'error'; message: string }>({
    show: false,
    type: 'success',
    message: ''
  });

  // Handle Email Sending
  const handleEmailSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
  
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(emailForm),
      });
  
      if (res.ok) {
        setToast({ show: true, type: 'success', message: 'Your message has been sent successfully!' });
        setEmailForm({ name: '', email: '', subject: '', message: '' });
        setTimeout(() => setToast({ show: false, type: 'success', message: '' }), 3500);
      } else {
        setToast({ show: true, type: 'error', message: 'Something went wrong. Please try again.' });
        setTimeout(() => setToast({ show: false, type: 'error', message: '' }), 3500);
      }
    } catch (error) {
      setToast({ show: true, type: 'error', message: 'Network error. Check your connection.' });
      setTimeout(() => setToast({ show: false, type: 'error', message: '' }), 3500);
    }
    setLoading(false);
  };

  // Direct WhatsApp Logic
  const openWhatsApp = () => {
    // Falls back to generic number if env not set
    const number = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || '8801782412446';
    const text = encodeURIComponent("Hi Shimanto, I visited your portfolio and would like to connect.");
    window.open(`https://wa.me/${number}?text=${text}`, '_blank');
  };

  return (
    <main className={styles.contactWrapper}>
      <Navbar items={navItems} logo="/images/shimanto.png" />

      <div className={`${styles.container} ${isRightPanelActive ? styles.rightPanelActive : ''}`}>
        
        {/* --- PANEL 1: EMAIL FORM (Left Side) --- */}
        <div className={`${styles.formContainer} ${styles.emailContainer}`}>
          <form className={styles.form} onSubmit={handleEmailSubmit}>
            <h1 className={styles.title}>Drop a Message</h1>
            <p className={styles.subtitle}>
              I usually respond within 24 hours.
            </p>
            
            <div className={styles.inputGroup}>
              <input 
                type="text" 
                placeholder="Your Name" 
                className={styles.input}
                value={emailForm.name}
                onChange={(e) => setEmailForm({...emailForm, name: e.target.value})}
                required
              />
            </div>
            <div className={styles.inputGroup}>
              <input 
                type="email" 
                placeholder="Email Address" 
                className={styles.input}
                value={emailForm.email}
                onChange={(e) => setEmailForm({...emailForm, email: e.target.value})}
                required
              />
            </div>
            <div className={styles.inputGroup}>
              <input 
                type="text" 
                placeholder="Subject" 
                className={styles.input}
                value={emailForm.subject}
                onChange={(e) => setEmailForm({...emailForm, subject: e.target.value})}
                required
              />
            </div>
            <div className={styles.inputGroup}>
              <textarea 
                placeholder="Write your message here..." 
                className={styles.textarea}
                value={emailForm.message}
                onChange={(e) => setEmailForm({...emailForm, message: e.target.value})}
                required
              />
            </div>
            <button className={styles.btn} disabled={loading}>
              {loading ? 'Sending...' : 'Send Message'}
            </button>
          </form>
        </div>

        {/* --- PANEL 2: WHATSAPP / QUICK CONNECT (Right Side) --- */}
        <div className={`${styles.formContainer} ${styles.whatsappContainer}`}>
          <div className={styles.form}>
            <h1 className={styles.title}>Quick Connect</h1>
            <p className={styles.subtitle}>Skip the email. Let's chat instantly.</p>
            
            <div className={styles.whatsappCard} onClick={openWhatsApp}>
              <i className={`fab fa-whatsapp ${styles.waIcon}`}></i>
              <div className={styles.waText}>Chat on WhatsApp</div>
              <div className={styles.waSub}>Usually replies in minutes</div>
            </div>

            <p style={{ marginTop: '30px', fontSize: '0.8rem', color: 'rgb(183, 183, 183)' }}>
              Tap the card above to open WhatsApp directly.
            </p>
          </div>
        </div>

        {/* --- OVERLAY SLIDER --- */}
        <div className={styles.overlayContainer}>
          <div className={styles.overlay}>
            
            {/* Overlay Left (Visible when Email is Active) */}
            <div className={`${styles.overlayPanel} ${styles.overlayLeft}`}>
              <h1 className={styles.title}>Welcome Back!</h1>
              <p className={styles.subtitle}>
                Prefer sending a formal email instead? <br/>
                No problem, just slide back.
              </p>
              <button 
                className={`${styles.btn} ${styles.btnGhost}`} 
                onClick={() => setIsRightPanelActive(false)}
              >
                Go to Email
              </button>
            </div>

            {/* Overlay Right (Visible when WhatsApp is Active) */}
            <div className={`${styles.overlayPanel} ${styles.overlayRight}`}>
              <h1 className={styles.title}>Need Faster Reply?</h1>
              <p className={styles.subtitle}>
                Connect with me on WhatsApp for immediate response.
              </p>
              <button 
                className={`${styles.btn} ${styles.btnGhost}`} 
                onClick={() => setIsRightPanelActive(true)}
              >
                Switch to WhatsApp
              </button>
            </div>

          </div>
        </div>

      </div>
      {toast.show && (
        <>
          <div className={styles.toastOverlay} onClick={() => setToast({ ...toast, show: false })} />
          <div className={`${styles.toastModal} ${styles[toast.type]}`}>
            <div className={styles.toastGlow}></div>
            <div className={styles.toastIconWrapper}>
              {toast.type === 'success' ? (
                <div className={styles.successCheckmark}>
                  <svg className={styles.checkmarkCircle} viewBox="0 0 52 52">
                    <circle className={styles.checkmarkCircleBg} cx="26" cy="26" r="25" fill="none"/>
                  </svg>
                  <svg className={styles.checkmarkCheck} viewBox="0 0 52 52">
                    <path className={styles.checkmarkCheckPath} fill="none" d="M14.1 27.2l7.1 7.2 16.7-16.8"/>
                  </svg>
                </div>
              ) : (
                <div className={styles.errorCross}>
                  <svg className={styles.crossCircle} viewBox="0 0 52 52">
                    <circle className={styles.crossCircleBg} cx="26" cy="26" r="25" fill="none"/>
                  </svg>
                  <svg className={styles.crossMark} viewBox="0 0 52 52">
                    <line className={styles.crossLine1} x1="16" y1="16" x2="36" y2="36"/>
                    <line className={styles.crossLine2} x1="36" y1="16" x2="16" y2="36"/>
                  </svg>
                </div>
              )}
            </div>
            <h2 className={styles.toastTitle}>
              {toast.type === 'success' ? 'Message Sent!' : 'Failed!'}
            </h2>
            <p className={styles.toastMessage}>{toast.message}</p>
            <button 
              className={styles.toastButton}
              onClick={() => setToast({ ...toast, show: false })}
            >
              {toast.type === 'success' ? 'Awesome!' : 'Got it'}
            </button>
          </div>
        </>
      )}
    </main>
  );
}