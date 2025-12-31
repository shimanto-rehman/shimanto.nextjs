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
import StructuredData from './components/StructuredData';
import SEOHead from './components/SEOHead';
import { defaultMetadata, siteConfig } from '@/app/lib/metadata';

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
        <title>{defaultMetadata.title.default}</title>
        {/* Primary SEO Meta Tags */}
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="description" content={defaultMetadata.description} />
        <meta name="keywords" content={defaultMetadata.keywords.join(', ')} />
        <meta name="author" content={siteConfig.author.name} />
        <meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1" />
        <meta name="language" content="English" />
        <meta name="revisit-after" content="7 days" />
        <meta name="theme-color" content="#000000" />
        
        {/* Open Graph / Facebook */}
        <meta property="og:type" content={defaultMetadata.openGraph.type} />
        <meta property="og:url" content={siteConfig.url} />
        <meta property="og:title" content={defaultMetadata.title.default} />
        <meta property="og:description" content={defaultMetadata.description} />
        <meta property="og:image" content={`${siteConfig.url}${defaultMetadata.openGraph.images[0].url}`} />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta property="og:site_name" content={defaultMetadata.openGraph.siteName} />
        <meta property="og:locale" content="en_US" />

        {/* Twitter */}
        <meta name="twitter:card" content={defaultMetadata.twitter.card} />
        <meta name="twitter:title" content={defaultMetadata.title.default} />
        <meta name="twitter:description" content={defaultMetadata.description} />
        <meta name="twitter:image" content={`${siteConfig.url}${defaultMetadata.openGraph.images[0].url}`} />
        <meta name="twitter:creator" content={defaultMetadata.twitter.creator} />
        <meta name="twitter:site" content={defaultMetadata.twitter.site} />

        {/* Canonical URL */}
        <link rel="canonical" href={siteConfig.url} />

        {/* Font Awesome */}
        <link
          rel="stylesheet"
          href="/fonts/fontawesome/css/all.min.css"
        />

        {/* Favicon */}
        <link rel="icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" href="/favicon.webp" />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
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
      </body>
    </html>
  );
}
