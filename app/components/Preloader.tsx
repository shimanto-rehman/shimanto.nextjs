'use client';

import { useEffect } from 'react';
import './Preloader.css';

export default function Preloader({ onLoadComplete }: { onLoadComplete?: () => void }) {
  useEffect(() => {
    const numStrips = 20;
    const beamColors = [
      "#ff1500", "#ffff00", "#ff00ff", "#00ff9f", "#ff5500", "#ffaa00",
      "#00a9ff", "#bf00ff", "#ffdd00", "#00ffff", "#ff153b", "#ff00cc"
    ];

    let splashAnimation = document.querySelector(".splash-animation");
    let isAnimationPaused = false;
    let animationTimeout: NodeJS.Timeout;

    const generateStripData = () => {
      const data = [];
      const stripWidth = 100 / numStrips;
      for (let i = 0; i < numStrips; i++) {
        const left = i * stripWidth;
        const width = stripWidth + 0.5;
        const fillPercentage = 10 + Math.random() * 40;
        const fadePoint = 60 + Math.random() * 40;
        const color = beamColors[Math.floor(Math.random() * beamColors.length)];
        const bg = `linear-gradient(to bottom, ${color} 0%, ${color} ${fillPercentage}%, rgba(0, 0, 0, 0) ${fadePoint}%, rgba(0, 0, 0, 0) 100%)`;
        data.push({ left: left + "%", width: width + "%", bg, color });
      }
      return data;
    };

    const generateBeamData = () => {
      const data = [];
      for (let i = 0; i < 28; i++) {
        const color = beamColors[Math.floor(Math.random() * beamColors.length)];
        const width = (0.5 + Math.random() * 2.5).toFixed(1);
        const left = ((i / 28) * 100 + (Math.random() * 1.5 - 0.75)).toFixed(1);
        data.push({ left: left + "%", width: width + "%", color });
      }
      return data.sort((a, b) => parseFloat(a.left) - parseFloat(b.left));
    };

    const createStrips = (containerId: string, stripData: any[]) => {
      const container = document.getElementById(containerId);
      if (!container) return;
      const fragment = document.createDocumentFragment();
      stripData.forEach((strip, index) => {
        const el = document.createElement("span");
        el.className = `strip-${index + 1}`;
        Object.assign(el.style, { left: strip.left, width: strip.width, background: strip.bg, zIndex: index.toString() });
        fragment.appendChild(el);
      });
      container.appendChild(fragment);
    };

    const createBeams = (containerId: string, beamData: any[]) => {
      const container = document.getElementById(containerId);
      if (!container) return;
      const fragment = document.createDocumentFragment();
      beamData.forEach((beam, index) => {
        const el = document.createElement("span");
        el.className = `beam beam-${index + 1} ${index % 2 === 0 ? "left-moving-beam" : "right-moving-beam"}`;
        Object.assign(el.style, { 
          left: beam.left, 
          width: beam.width, 
          animationDelay: `${(Math.random() * 2).toFixed(2)}s`,
          filter: `brightness(${1 + Math.random() * 0.8})`
        });
        el.style.setProperty("--color", beam.color);
        fragment.appendChild(el);
      });
      container.appendChild(fragment);
    };

    const resetAnimation = () => {
      const gradEffect = document.getElementById("grad-effect-1");
      const beamsContainer = document.getElementById("beams-1");
      if (gradEffect) gradEffect.innerHTML = "";
      if (beamsContainer) beamsContainer.innerHTML = "";
      
      const oldSplash = splashAnimation;
      const newSplash = oldSplash?.cloneNode(true) as HTMLElement;
      oldSplash?.parentNode?.replaceChild(newSplash, oldSplash);
      splashAnimation = document.querySelector(".splash-animation");
      
      setTimeout(() => {
        createStrips("grad-effect-1", generateStripData());
        createBeams("beams-1", generateBeamData());
        monitorAnimationProgress();
      }, 0);
    };

    const monitorAnimationProgress = () => {
      animationTimeout = setTimeout(() => {
        if (!isAnimationPaused) resetAnimation();
      }, 5500);
    };

    createStrips("grad-effect-1", generateStripData());
    createBeams("beams-1", generateBeamData());
    monitorAnimationProgress();

    // Simplified and optimized preloader logic
    let pageDataLoaded = false;
    let checkInterval: NodeJS.Timeout;
    const STABILITY_DELAY = 300; // Reduced from 500ms for faster response
    const MAX_WAIT_TIME = 10000; // Reduced from 15s to 10s
    const CHECK_INTERVAL = 200; // Check every 200ms instead of 100ms (less CPU)

    // Listen for explicit page data loaded event (for pages like repositories)
    const handlePageDataLoaded = () => {
      pageDataLoaded = true;
    };
    window.addEventListener('pageDataLoaded', handlePageDataLoaded);

    const proceedWithFadeOut = () => {
      if (checkInterval) clearInterval(checkInterval);
      
      setTimeout(() => {
        const container = document.querySelector('.container');
        if (container) {
          container.classList.add('fade-out');
          setTimeout(() => {
            isAnimationPaused = true;
            window.dispatchEvent(new CustomEvent('preloaderComplete'));
            onLoadComplete?.();
          }, 800);
        } else {
          isAnimationPaused = true;
          window.dispatchEvent(new CustomEvent('preloaderComplete'));
          onLoadComplete?.();
        }
      }, 1500);
    };

    const checkAllReady = (): boolean => {
      // For pages that explicitly signal (like repositories), wait for that signal
      // Check if page explicitly signaled data is loaded
      const needsExplicitSignal = pageDataLoaded === false && document.querySelector('[data-wait-for-api]');
      
      if (needsExplicitSignal) {
        return false; // Wait for explicit signal
      }

      // Check images (only if they exist)
      const images = document.images;
      if (images.length > 0) {
        for (let i = 0; i < images.length; i++) {
          if (!images[i].complete) return false;
        }
      }
      
      // Check fonts (quick check)
      if (document.fonts && document.fonts.status !== 'loaded') {
        return false;
      }
      
      // DOM ready
      return document.readyState === 'complete';
    };

    const startChecking = () => {
      const startTime = Date.now();
      let lastCheckTime = Date.now();
      
      checkInterval = setInterval(() => {
        const now = Date.now();
        
        // Only check if enough time has passed (stability check)
        if (now - lastCheckTime >= STABILITY_DELAY) {
          if (checkAllReady()) {
            proceedWithFadeOut();
            return;
          }
          lastCheckTime = now;
        }
        
        // Safety timeout
        if (now - startTime > MAX_WAIT_TIME) {
          proceedWithFadeOut();
        }
      }, CHECK_INTERVAL);
    };

    // Start checking after DOM is ready
    if (document.readyState === 'complete') {
      setTimeout(startChecking, 100);
    } else {
      window.addEventListener('load', () => setTimeout(startChecking, 100), { once: true });
    }

    return () => { 
      isAnimationPaused = true;
      if (animationTimeout) clearTimeout(animationTimeout);
      if (checkInterval) clearInterval(checkInterval);
      window.removeEventListener('pageDataLoaded', handlePageDataLoaded);
    };
  }, [onLoadComplete]);

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