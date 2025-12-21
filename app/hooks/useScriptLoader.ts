import { useEffect, useState, useCallback, useRef } from 'react';

interface ScriptLoaderOptions {
  async?: boolean;
  defer?: boolean;
  onLoad?: () => void;
  onError?: () => void;
}

/**
 * Hook to load external scripts dynamically
 * @param src - Script source URL
 * @param options - Loading options
 * @returns Object with loading state and error
 */
export function useScriptLoader(
  src: string,
  options: ScriptLoaderOptions = {},
  enabled: boolean = true
) {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);
  const optionsRef = useRef(options);

  // Keep options ref updated
  useEffect(() => {
    optionsRef.current = options;
  }, [options]);

  const handleLoad = useCallback(() => {
    setLoading(false);
    optionsRef.current.onLoad?.();
  }, []);

  const handleError = useCallback(() => {
    const err = new Error(`Failed to load script: ${src}`);
    setError(err);
    setLoading(false);
    optionsRef.current.onError?.();
  }, [src]);

  useEffect(() => {
    if (!enabled || typeof window === 'undefined') {
      setLoading(false);
      return;
    }

    // Check if script already exists
    const existingScript = document.querySelector(`script[src="${src}"]`);
    if (existingScript) {
      setLoading(false);
      handleLoad();
      return;
    }

    // Check if script is already loading
    const loadingScript = document.querySelector(`script[data-src="${src}"]`);
    if (loadingScript) {
      loadingScript.addEventListener('load', handleLoad);
      loadingScript.addEventListener('error', handleError);
      return () => {
        loadingScript.removeEventListener('load', handleLoad);
        loadingScript.removeEventListener('error', handleError);
      };
    }

    const script = document.createElement('script');
    script.src = src;
    script.async = options.async ?? true;
    script.defer = options.defer ?? false;
    script.setAttribute('data-src', src);

    script.onload = handleLoad;
    script.onerror = handleError;

    document.body.appendChild(script);

    return () => {
      script.removeEventListener('load', handleLoad);
      script.removeEventListener('error', handleError);
      // Cleanup: remove script if component unmounts
      if (script.parentNode) {
        script.parentNode.removeChild(script);
      }
    };
  }, [src, handleLoad, handleError, options.async, options.defer, enabled]);

  return { loading, error };
}

