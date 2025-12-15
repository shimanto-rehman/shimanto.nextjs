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

    // Wait for all resources to fully load, then fade out immediately
    const checkPageLoad = () => {
      const allResourcesLoaded = (): Promise<void> => {
        // Check if all images are loaded
        const images = Array.from(document.images);
        const allImagesLoaded = images.every(img => img.complete);
        
        // Check if fonts are loaded
        const fontsLoaded = document.fonts ? document.fonts.ready : Promise.resolve();
        
        const imagesPromise = allImagesLoaded 
          ? Promise.resolve() 
          : Promise.all(images.map(img => 
              new Promise<void>(resolve => {
                if (img.complete) resolve();
                else img.onload = img.onerror = () => resolve();
              })
            ));
        
        return Promise.all([imagesPromise, fontsLoaded]).then(() => {});
      };

      const handleComplete = () => {
    // Wait for all resources to fully load, then fade out and call onLoadComplete
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

      if (document.readyState === 'complete') {
        allResourcesLoaded().then(handleComplete);
      } else {
        window.addEventListener('load', () => {
          allResourcesLoaded().then(handleComplete);
        }, { once: true });
      }
    };

    checkPageLoad();

    return () => { 
      isAnimationPaused = true;
      if (animationTimeout) clearTimeout(animationTimeout);
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