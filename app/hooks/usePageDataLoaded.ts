// hooks/usePageDataLoaded.ts

/**
 * Signals to the preloader that page data has been loaded
 * Call this after API data and images are ready
 */
export const signalPageDataLoaded = () => {
  if (typeof window !== 'undefined') {
    // Dispatch the custom event
    window.dispatchEvent(new CustomEvent('pageDataLoaded'));
  }
};

/**
 * Hook to listen for page data loaded event (optional - not used in current implementation)
 * The preloader listens directly to the window event
 */
export const usePageDataLoaded = (callback?: () => void) => {
  if (typeof window !== 'undefined' && callback) {
    const handlePageDataLoaded = () => {
      callback();
    };
    
    window.addEventListener('pageDataLoaded', handlePageDataLoaded);
    
    return () => {
      window.removeEventListener('pageDataLoaded', handlePageDataLoaded);
    };
  }
  
  return () => {}; // Return empty cleanup function if not used
};