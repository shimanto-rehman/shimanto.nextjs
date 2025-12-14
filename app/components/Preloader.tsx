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

    // Store original functions for cleanup
    const originalFetch = window.fetch;
    const originalXHROpen = XMLHttpRequest.prototype.open;
    const originalXHRSend = XMLHttpRequest.prototype.send;
    
    let activeRequests = 0;
    let lastRequestTime = Date.now();
    let checkInterval: NodeJS.Timeout;
    let stabilityTimeout: NodeJS.Timeout;
    const STABILITY_DELAY = 500; // Wait 500ms of no new requests
    const MAX_WAIT_TIME = 15000; // Maximum 15 seconds wait

    // Track fetch requests
    window.fetch = function(...args) {
      activeRequests++;
      lastRequestTime = Date.now();
      const fetchPromise = originalFetch.apply(this, args);
      fetchPromise.finally(() => {
        activeRequests--;
        lastRequestTime = Date.now();
      });
      return fetchPromise;
    };

    // Track XMLHttpRequest
    XMLHttpRequest.prototype.open = function(...args) {
      this._preloaderTracked = true;
      return originalXHROpen.apply(this, args);
    };
    
    XMLHttpRequest.prototype.send = function(...args) {
      if (this._preloaderTracked) {
        activeRequests++;
        lastRequestTime = Date.now();
        const originalOnReadyStateChange = this.onreadystatechange;
        this.onreadystatechange = function(...eventArgs) {
          if (this.readyState === 4) {
            activeRequests--;
            lastRequestTime = Date.now();
          }
          if (originalOnReadyStateChange) {
            originalOnReadyStateChange.apply(this, eventArgs);
          }
        };
      }
      return originalXHRSend.apply(this, args);
    };

    // Generalized page load detection - works for ALL pages automatically
    const checkPageLoad = () => {
      const startTime = Date.now();

      const checkAllReady = (): boolean => {
        // Check if all images are loaded
        const images = Array.from(document.images);
        const allImagesLoaded = images.length === 0 || images.every(img => img.complete);
        
        // Check if fonts are loaded
        const fontsReady = !document.fonts || document.fonts.status === 'loaded';
        
        // Check if there are no active requests
        const noActiveRequests = activeRequests === 0;
        
        // Check if enough time has passed since last request (stability check)
        const timeSinceLastRequest = Date.now() - lastRequestTime;
        const isStable = timeSinceLastRequest >= STABILITY_DELAY;
        
        // Check if DOM is ready
        const domReady = document.readyState === 'complete' || document.readyState === 'interactive';
        
        return allImagesLoaded && fontsReady && noActiveRequests && isStable && domReady;
      };

      const proceedWithFadeOut = () => {
        if (checkInterval) clearInterval(checkInterval);
        if (stabilityTimeout) clearTimeout(stabilityTimeout);
        
        // Wait for animation to complete (around 4.5s based on CSS), then fade out
        setTimeout(() => {
          const container = document.querySelector('.container');
          if (container) {
            container.classList.add('fade-out');
            // After fade out animation completes, call onLoadComplete
            // Wait for full fade-out transition (0.8s) before dispatching event
            setTimeout(() => {
              isAnimationPaused = true;
              // Dispatch event after preloader is completely gone
              if (typeof window !== 'undefined') {
                window.dispatchEvent(new CustomEvent('preloaderComplete'));
              }
              onLoadComplete?.();
            }, 800); // Match the fade-out transition duration
          } else {
            isAnimationPaused = true;
            if (typeof window !== 'undefined') {
              window.dispatchEvent(new CustomEvent('preloaderComplete'));
            }
            onLoadComplete?.();
          }
        }, 1500);
      };

      // Wait for initial resources (images, fonts)
      const waitForInitialResources = (): Promise<void> => {
        const images = Array.from(document.images);
        const imagesPromise = images.length === 0 
          ? Promise.resolve()
          : Promise.all(images.map(img => 
              new Promise<void>(resolve => {
                if (img.complete) resolve();
                else {
                  img.onload = img.onerror = () => resolve();
                  // Timeout for broken images
                  setTimeout(() => resolve(), 5000);
                }
              })
            ));
        
        const fontsPromise = document.fonts ? document.fonts.ready : Promise.resolve();
        
        return Promise.all([imagesPromise, fontsPromise]).then(() => {});
      };

      // Start checking periodically
      const startChecking = () => {
        // Check every 100ms
        checkInterval = setInterval(() => {
          if (checkAllReady()) {
            proceedWithFadeOut();
          }
          
          // Safety: Maximum wait time
          if (Date.now() - startTime > MAX_WAIT_TIME) {
            console.warn('Preloader: Maximum wait time reached, proceeding anyway');
            proceedWithFadeOut();
          }
        }, 100);
      };

      // Wait for initial resources, then start checking
      if (document.readyState === 'complete') {
        waitForInitialResources().then(() => {
          // Small delay to allow any initial requests to start
          setTimeout(startChecking, 200);
        });
      } else {
        window.addEventListener('load', () => {
          waitForInitialResources().then(() => {
            // Small delay to allow any initial requests to start
            setTimeout(startChecking, 200);
          });
        }, { once: true });
      }
    };

    checkPageLoad();

    return () => { 
      isAnimationPaused = true;
      if (animationTimeout) clearTimeout(animationTimeout);
      if (checkInterval) clearInterval(checkInterval);
      if (stabilityTimeout) clearTimeout(stabilityTimeout);
      
      // Restore original functions
      window.fetch = originalFetch;
      XMLHttpRequest.prototype.open = originalXHROpen;
      XMLHttpRequest.prototype.send = originalXHRSend;
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