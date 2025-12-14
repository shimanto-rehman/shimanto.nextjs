'use client';

import { useEffect, useRef, useCallback } from 'react';
import './Preloader.css';

export default function Preloader({ onLoadComplete }: { onLoadComplete?: () => void }) {
  const animationRef = useRef<NodeJS.Timeout | null>(null);
  const checkIntervalRef = useRef<NodeJS.Timeout | null>(null);
  const isPausedRef = useRef(false);
  const hasCompletedRef = useRef(false);

  const beamColors = [
    "#ff1500", "#ffff00", "#ff00ff", "#00ff9f", "#ff5500", "#ffaa00",
    "#00a9ff", "#bf00ff", "#ffdd00", "#00ffff", "#ff153b", "#ff00cc"
  ];

  const generateStripData = useCallback(() => {
    const numStrips = 20;
    const data = [];
    const stripWidth = 100 / numStrips;
    for (let i = 0; i < numStrips; i++) {
      const fillPercentage = 10 + Math.random() * 40;
      const fadePoint = 60 + Math.random() * 40;
      const color = beamColors[Math.floor(Math.random() * beamColors.length)];
      data.push({
        left: `${i * stripWidth}%`,
        width: `${stripWidth + 0.5}%`,
        bg: `linear-gradient(to bottom, ${color} 0%, ${color} ${fillPercentage}%, rgba(0, 0, 0, 0) ${fadePoint}%, rgba(0, 0, 0, 0) 100%)`,
      });
    }
    return data;
  }, [beamColors]);

  const generateBeamData = useCallback(() => {
    const data = [];
    for (let i = 0; i < 28; i++) {
      const color = beamColors[Math.floor(Math.random() * beamColors.length)];
      data.push({
        left: `${(i / 28) * 100 + (Math.random() * 1.5 - 0.75)}%`,
        width: `${0.5 + Math.random() * 2.5}%`,
        color,
        delay: `${Math.random() * 2}s`,
        brightness: 1 + Math.random() * 0.8,
        isLeft: i % 2 === 0
      });
    }
    return data.sort((a, b) => parseFloat(a.left) - parseFloat(b.left));
  }, [beamColors]);

  const createElements = useCallback((stripData: any[], beamData: any[]) => {
    const gradEffect = document.getElementById("grad-effect-1");
    const beamsContainer = document.getElementById("beams-1");
    
    if (!gradEffect || !beamsContainer) return;

    // Clear existing content
    gradEffect.innerHTML = "";
    beamsContainer.innerHTML = "";

    // Create strips fragment
    const stripFragment = document.createDocumentFragment();
    stripData.forEach((strip, index) => {
      const el = document.createElement("span");
      el.className = `strip-${index + 1}`;
      el.style.cssText = `left:${strip.left};width:${strip.width};background:${strip.bg};z-index:${index}`;
      stripFragment.appendChild(el);
    });
    gradEffect.appendChild(stripFragment);

    // Create beams fragment
    const beamFragment = document.createDocumentFragment();
    beamData.forEach((beam, index) => {
      const el = document.createElement("span");
      el.className = `beam beam-${index + 1} ${beam.isLeft ? "left-moving-beam" : "right-moving-beam"}`;
      el.style.cssText = `left:${beam.left};width:${beam.width};animation-delay:${beam.delay};filter:brightness(${beam.brightness})`;
      el.style.setProperty("--color", beam.color);
      beamFragment.appendChild(el);
    });
    beamsContainer.appendChild(beamFragment);
  }, []);

  const resetAnimation = useCallback(() => {
    if (isPausedRef.current) return;

    const stripData = generateStripData();
    const beamData = generateBeamData();
    createElements(stripData, beamData);

    // Schedule next reset
    animationRef.current = setTimeout(resetAnimation, 5500);
  }, [generateStripData, generateBeamData, createElements]);

  const proceedWithFadeOut = useCallback(() => {
    if (hasCompletedRef.current) return;
    hasCompletedRef.current = true;

    // Clear intervals
    if (checkIntervalRef.current) clearInterval(checkIntervalRef.current);
    if (animationRef.current) clearTimeout(animationRef.current);

    // Small delay before fade out for smooth transition
    setTimeout(() => {
      const container = document.querySelector('.container');
      if (container) {
        container.classList.add('fade-out');
        setTimeout(() => {
          isPausedRef.current = true;
          window.dispatchEvent(new CustomEvent('preloaderComplete'));
          onLoadComplete?.();
        }, 800);
      } else {
        isPausedRef.current = true;
        window.dispatchEvent(new CustomEvent('preloaderComplete'));
        onLoadComplete?.();
      }
    }, 1500);
  }, [onLoadComplete]);

  useEffect(() => {
    // Initialize animation
    const stripData = generateStripData();
    const beamData = generateBeamData();
    createElements(stripData, beamData);
    animationRef.current = setTimeout(resetAnimation, 5500);

    // Loading detection system
    let pageDataLoaded = false;
    let imagesLoaded = false;
    let fontsLoaded = false;

    const checkAllReady = (): boolean => {
      // Check if page needs explicit API signal
      const needsApiSignal = document.querySelector('[data-wait-for-api]');
      if (needsApiSignal && !pageDataLoaded) return false;

      // Check images
      if (!imagesLoaded) {
        const images = Array.from(document.images);
        if (images.length > 0 && !images.every(img => img.complete)) return false;
        imagesLoaded = true;
      }

      // Check fonts
      if (!fontsLoaded && document.fonts) {
        if (document.fonts.status !== 'loaded') return false;
        fontsLoaded = true;
      }

      // DOM ready
      return document.readyState === 'complete';
    };

    // Listen for page data loaded event
    const handlePageDataLoaded = () => {
      pageDataLoaded = true;
    };
    window.addEventListener('pageDataLoaded', handlePageDataLoaded);

    // Check fonts separately to avoid blocking
    if (document.fonts) {
      document.fonts.ready.then(() => {
        fontsLoaded = true;
      }).catch(() => {
        fontsLoaded = true; // Continue even if fonts fail
      });
    }

    // Optimized checking system
    const startChecking = () => {
      const startTime = Date.now();
      const MAX_WAIT = 12000; // 12 seconds max
      const CHECK_INTERVAL = 150; // Check every 150ms
      const MIN_DISPLAY_TIME = 1000; // Minimum preloader display time

      checkIntervalRef.current = setInterval(() => {
        const elapsed = Date.now() - startTime;

        // Ensure minimum display time
        if (elapsed < MIN_DISPLAY_TIME) return;

        // Check if ready
        if (checkAllReady()) {
          proceedWithFadeOut();
          return;
        }

        // Safety timeout
        if (elapsed > MAX_WAIT) {
          console.warn('Preloader: Maximum wait time reached, proceeding anyway');
          proceedWithFadeOut();
        }
      }, CHECK_INTERVAL);
    };

    // Start checking when DOM is ready
    if (document.readyState === 'complete') {
      setTimeout(startChecking, 100);
    } else {
      const handleLoad = () => {
        setTimeout(startChecking, 100);
      };
      window.addEventListener('load', handleLoad, { once: true });
      
      return () => {
        window.removeEventListener('load', handleLoad);
      };
    }

    return () => {
      isPausedRef.current = true;
      if (animationRef.current) clearTimeout(animationRef.current);
      if (checkIntervalRef.current) clearInterval(checkIntervalRef.current);
      window.removeEventListener('pageDataLoaded', handlePageDataLoaded);
    };
  }, [generateStripData, generateBeamData, createElements, resetAnimation, proceedWithFadeOut]);

  return (
    <div className="container">
      <div className="splash-animation">
        <div className="segment segment-1">
          <div className="gradient-effect" id="grad-effect-1"></div>
          <div className="color-beams" id="beams-1"></div>
        </div>
      </div>
    </div>
  );
}