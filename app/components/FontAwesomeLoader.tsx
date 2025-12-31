'use client';

import { useEffect } from 'react';

export default function FontAwesomeLoader() {
  useEffect(() => {
    // Check if Font Awesome is already loaded
    const existingLink = document.querySelector('link[href="/fonts/fontawesome/css/all.min.css"]');
    if (existingLink) {
      return;
    }

    // Create and append Font Awesome stylesheet
    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = '/fonts/fontawesome/css/all.min.css';
    link.crossOrigin = 'anonymous';
    document.head.appendChild(link);

    // No cleanup needed - we want Font Awesome to persist
  }, []);

  return null;
}

