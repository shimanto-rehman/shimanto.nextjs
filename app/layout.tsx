'use client';
import { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import "./responsive.css";
import Preloader from './components/Preloader';
import ColorBends from './components/ColorBends';
import Prism from './components/Prism';

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

  useEffect(() => {
    // Load confetti script early so it's ready when preloader finishes
    if (typeof window !== 'undefined' && !document.querySelector('script[src="/js/confetti.js"]')) {
      const script = document.createElement('script');
      script.src = '/js/confetti.js';
      script.async = true;
      document.body.appendChild(script);
    }
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
        {loading && <Preloader onLoadComplete={handleLoadComplete} />}
        {/* Fixed ColorBends Background - Available on all pages */}
        <div className="home-background-fixed">
          <ColorBends />
        </div>
        <div className="home-prism-container">
          <Prism animationType="rotate" timeScale={0.5} height={3.5} baseWidth={5.5} scale={3.6} hueShift={0} colorFrequency={1} noise={0.05} glow={1}/>
        </div>
        {children}
      </body>
    </html>
  );
}
