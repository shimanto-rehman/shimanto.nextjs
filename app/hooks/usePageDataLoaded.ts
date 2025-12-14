/**
 * Hook to signal that page data is loaded
 * Use this in pages that don't fetch data - it will dispatch immediately
 * For pages that fetch data, dispatch the event manually when data is ready
 */
import { useEffect } from 'react';

export function usePageDataLoaded(immediate = true) {
  useEffect(() => {
    if (immediate) {
      // Small delay to ensure DOM is ready
      const timer = setTimeout(() => {
        if (typeof window !== 'undefined') {
          window.dispatchEvent(new CustomEvent('pageDataLoaded'));
        }
      }, 100);
      
      return () => clearTimeout(timer);
    }
  }, [immediate]);
}

/**
 * Manual function to dispatch the pageDataLoaded event
 * Use this when you need to signal data is loaded after async operations
 */
export function signalPageDataLoaded() {
  if (typeof window !== 'undefined') {
    window.dispatchEvent(new CustomEvent('pageDataLoaded'));
  }
}

