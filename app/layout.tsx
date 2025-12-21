'use client';
import { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';
import Script from 'next/script';
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import "./responsive.css";
import Preloader from './components/Preloader';
import ColorBends from './components/ColorBends';
import Prism from './components/Prism';
import { ErrorBoundary } from './components/ErrorBoundary';

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  preload: false,
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  preload: false,
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
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
    <html lang="en" suppressHydrationWarning>
      <head>
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css"
          crossOrigin="anonymous"
        />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
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
      </body>
    </html>
  );
}
