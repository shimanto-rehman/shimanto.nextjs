'use client';

import { useState, useEffect, useCallback } from 'react';
import { usePathname } from 'next/navigation';
import Script from 'next/script';
import Preloader from './Preloader';
import ColorBends from './ColorBends';
import Prism from './Prism';
import { ErrorBoundary } from './ErrorBoundary';
import StructuredData from './StructuredData';
import SEOHead from './SEOHead';
import FontAwesomeLoader from './FontAwesomeLoader';
import ThemeToggle from './ThemeToggle';

export default function ClientLayoutWrapper({ children }: { children: React.ReactNode }) {
  const [loading, setLoading] = useState(true);
  // Use default values that match server-side render to avoid hydration mismatch
  const [isLightMode, setIsLightMode] = useState(false);
  const [colorBendsVisible, setColorBendsVisible] = useState(true);
  const [prismVisible, setPrismVisible] = useState(true);
  const pathname = usePathname();

  // Load preferences from localStorage after mount to avoid hydration mismatch
  // Defaults: dark mode (false), ColorBends visible (true), Prism visible (true)
  useEffect(() => {
    if (typeof window === 'undefined') return;
    
    // Only load from localStorage if values exist, otherwise use defaults
    const savedTheme = localStorage.getItem('theme');
    const savedColorBends = localStorage.getItem('colorBends');
    const savedPrism = localStorage.getItem('prism');
    
    // Apply saved preferences or keep defaults
    if (savedTheme !== null) {
      setIsLightMode(savedTheme === 'light');
    }
    if (savedColorBends !== null) {
      setColorBendsVisible(savedColorBends !== 'false');
    }
    if (savedPrism !== null) {
      setPrismVisible(savedPrism !== 'false');
    }
  }, []);

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

  // Apply theme to html element
  useEffect(() => {
    if (typeof document === 'undefined') return;
    const html = document.documentElement;
    if (isLightMode) {
      html.setAttribute('data-theme', 'light');
    } else {
      html.removeAttribute('data-theme');
    }
  }, [isLightMode]);

  // Memoize callbacks to prevent useEffect dependency issues
  const handleThemeChange = useCallback((isLight: boolean) => {
    setIsLightMode(isLight);
  }, []);

  const handleColorBendsChange = useCallback((visible: boolean) => {
    setColorBendsVisible(visible);
  }, []);

  const handlePrismChange = useCallback((visible: boolean) => {
    setPrismVisible(visible);
  }, []);

  return (
    <>
      {/* Load Font Awesome CSS */}
      <FontAwesomeLoader />
      
      {/* Structured Data for SEO */}
      <StructuredData />
      
      {/* Dynamic SEO Head Updates */}
      <SEOHead />

      {/* Theme Toggle */}
      <ThemeToggle
        onThemeChange={handleThemeChange}
        onColorBendsChange={handleColorBendsChange}
        onPrismChange={handlePrismChange}
      />

      <Script
        src="/js/confetti.js"
        strategy="lazyOnload"
      />
      {loading && <Preloader onLoadComplete={handleLoadComplete} />}
      {/* Fixed ColorBends Background - Available on all pages */}
      <ErrorBoundary>
        <div 
          className={`home-background-fixed ${!colorBendsVisible ? 'hidden' : ''}`}
          suppressHydrationWarning
        >
          <ColorBends />
        </div>
      </ErrorBoundary>
      <ErrorBoundary>
        <div 
          className={`home-prism-container ${!prismVisible ? 'hidden' : ''}`}
          suppressHydrationWarning
        >
          <Prism animationType="rotate" timeScale={0.5} height={3.5} baseWidth={5.5} scale={3.6} hueShift={0} colorFrequency={1} noise={0.05} glow={1}/>
        </div>
      </ErrorBoundary>
      <ErrorBoundary>
        {children}
      </ErrorBoundary>
    </>
  );
}

