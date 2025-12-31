'use client';

import { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';
import Script from 'next/script';
import Preloader from './Preloader';
import ColorBends from './ColorBends';
import Prism from './Prism';
import { ErrorBoundary } from './ErrorBoundary';
import StructuredData from './StructuredData';
import SEOHead from './SEOHead';
import FontAwesomeLoader from './FontAwesomeLoader';

export default function ClientLayoutWrapper({ children }: { children: React.ReactNode }) {
  const [loading, setLoading] = useState(true);
  const pathname = usePathname();

  const handleLoadComplete = () => {
    setLoading(false);
    // The Preloader component will dispatch the event after fade-out completes
  };

  // Reset loading state when route changes (for client-side navigation)
  useEffect(() => {
    setLoading(true);
  }, [pathname]);

  // Show preloader as soon as a navigation starts (before route change completes)
  useEffect(() => {
    if (typeof window === 'undefined') return;

    const handleNavigationStart = () => {
      setLoading(true);
    };

    window.addEventListener('navigationStart', handleNavigationStart);
    return () => {
      window.removeEventListener('navigationStart', handleNavigationStart);
    };
  }, []);

  return (
    <>
      {/* Load Font Awesome CSS */}
      <FontAwesomeLoader />
      
      {/* Structured Data for SEO */}
      <StructuredData />
      
      {/* Dynamic SEO Head Updates */}
      <SEOHead />

      <Script
        src="/js/confetti.js"
        strategy="lazyOnload"
      />
      {loading && <Preloader onLoadComplete={handleLoadComplete} />}
      {/* Fixed ColorBends Background - Available on all pages */}
      <ErrorBoundary>
        <div className="home-background-fixed">
          <ColorBends />
        </div>
      </ErrorBoundary>
      <ErrorBoundary>
        <div className="home-prism-container">
          <Prism animationType="rotate" timeScale={0.5} height={3.5} baseWidth={5.5} scale={3.6} hueShift={0} colorFrequency={1} noise={0.05} glow={1}/>
        </div>
      </ErrorBoundary>
      <ErrorBoundary>
        {children}
      </ErrorBoundary>
    </>
  );
}

