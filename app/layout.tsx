'use client';
import { useState, useEffect } from 'react';
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import "./responsive.css";  
import "./components/navbar.css";
import Preloader from './components/Preloader';

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [loading, setLoading] = useState(true);

  const handleLoadComplete = () => {
    setLoading(false);
    // The Preloader component will dispatch the event after fade-out completes
  };

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
        {children}
      </body>
    </html>
  );
}
