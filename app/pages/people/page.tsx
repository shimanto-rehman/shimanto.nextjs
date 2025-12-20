'use client';

import { useState, useEffect, useRef } from 'react';
import styles from './People.module.css';
import { testimonials } from './peopleData';
import Navbar, { navItems } from '@/app/components/Navbar';
import { usePageDataLoaded } from '@/app/hooks/usePageDataLoaded';

// Declare GSAP global
declare global {
  interface Window {
    gsap?: any;
  }
}

export default function PeoplePage() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const crowdInitialized = useRef(false);
  const autoRotateIntervalRef = useRef<NodeJS.Timeout | null>(null);
  usePageDataLoaded();


  // Initialize crowd simulation
  useEffect(() => {
    if (typeof window === 'undefined' || crowdInitialized.current) return;
    
    const loadGSAP = (): Promise<void> => {
      return new Promise((resolve) => {
        if (window.gsap) {
          resolve();
          return;
        }

        if (document.querySelector('script[src*="gsap"]')) {
          // Wait for GSAP to load
          const checkGSAP = setInterval(() => {
            if (window.gsap) {
              clearInterval(checkGSAP);
              resolve();
            }
          }, 100);
          return;
        }

        const gsapScript = document.createElement('script');
        gsapScript.src = '/js/gsap.min.js';
        gsapScript.async = true;
        gsapScript.onload = () => resolve();
        gsapScript.onerror = () => resolve(); // Continue even if GSAP fails
        document.body.appendChild(gsapScript);
      });
    };

    const initCrowdSimulation = () => {
      if (!canvasRef.current || crowdInitialized.current) return;
      if (!canvasRef.current || !window.gsap) return;

      const canvas = canvasRef.current;
      const ctx = canvas.getContext('2d');
      if (!ctx) return;

      const config = {
        src: 'https://res.cloudinary.com/shimanto-rehman/image/upload/v1712485869/img/peeps-sheet.webp',
        rows: 15,
        cols: 7
      };

      // Utils
      const randomRange = (min: number, max: number) => min + Math.random() * (max - min);
      const randomIndex = (array: any[]) => Math.floor(randomRange(0, array.length));
      const removeFromArray = (array: any[], i: number) => array.splice(i, 1)[0];
      const removeItemFromArray = (array: any[], item: any) => removeFromArray(array, array.indexOf(item));
      const removeRandomFromArray = (array: any[]) => removeFromArray(array, randomIndex(array));
      const getRandomFromArray = (array: any[]) => array[randomIndex(array)];

      const stage = {
        width: window.innerWidth,
        height: window.innerHeight,
      };

      class Peep {
        image: HTMLImageElement;
        rect: number[];
        width: number;
        height: number;
        sx: number;
        sy: number;
        sWidth: number;
        sHeight: number;
        x: number;
        y: number;
        anchorY: number;
        scaleX: number;
        walk: any;

        constructor({ image, rect }: { image: HTMLImageElement; rect: number[] }) {
          this.image = image;
          this.rect = rect;
          this.width = rect[2];
          this.height = rect[3];
          this.sx = rect[0];
          this.sy = rect[1];
          this.sWidth = rect[2];
          this.sHeight = rect[3];
          this.x = 0;
          this.y = 0;
          this.anchorY = 0;
          this.scaleX = 1;
          this.walk = null;
        }

        render(ctx: CanvasRenderingContext2D) {
          ctx.save();
          ctx.translate(this.x, this.y);
          ctx.scale(this.scaleX, 1);
          ctx.drawImage(
            this.image,
            this.sx,
            this.sy,
            this.sWidth,
            this.sHeight,
            0,
            0,
            this.width,
            this.height
          );
          ctx.restore();
        }
      }

      const allPeeps: Peep[] = [];
      const availablePeeps: Peep[] = [];
      const crowd: Peep[] = [];

      const resetPeep = ({ stage, peep }: { stage: any; peep: Peep }) => {
        const direction = Math.random() > 0.5 ? 1 : -1;
        const offsetY = 100 - 250 * (window.gsap?.parseEase('power2.in') || ((t: number) => t * t))(Math.random());
        const startY = window.innerHeight - peep.height + offsetY;
        let startX: number, endX: number;

        if (direction === 1) {
          startX = -peep.height;
          endX = window.innerHeight + 800;
          peep.scaleX = 1;
        } else {
          startX = window.innerHeight + peep.width + 800;
          endX = 0;
          peep.scaleX = -1;
        }

        peep.x = startX;
        peep.y = startY;
        peep.anchorY = startY;

        return { startX, startY, endX };
      };

      const normalWalk = ({ peep, props }: { peep: Peep; props: any }) => {
        const { startX, startY, endX } = props;
        const xDuration = 10;
        const yDuration = 0.25;

        const tl = window.gsap.timeline();
        tl.timeScale(randomRange(0.5, 1.5));
        tl.to(peep, {
          duration: xDuration,
          x: endX,
          ease: 'none'
        }, 0);
        tl.to(peep, {
          duration: yDuration,
          repeat: xDuration / yDuration,
          yoyo: true,
          y: startY - 10
        }, 0);

        return tl;
      };

      const walks = [normalWalk];

      const createPeeps = (img: HTMLImageElement) => {
        const { rows, cols } = config;
        const { naturalWidth: width, naturalHeight: height } = img;
        const total = rows * cols;
        const rectWidth = width / rows;
        const rectHeight = height / cols;

        for (let i = 0; i < total; i++) {
          allPeeps.push(new Peep({
            image: img,
            rect: [
              (i % rows) * rectWidth,
              Math.floor(i / rows) * rectHeight,
              rectWidth,
              rectHeight,
            ]
          }));
        }
      };

      const addPeepToCrowd = () => {
        const peep = removeRandomFromArray(availablePeeps);
        const walk = getRandomFromArray(walks)({
          peep,
          props: resetPeep({ peep, stage })
        });
        
        if (walk) {
          walk.eventCallback('onComplete', () => {
            removePeepFromCrowd(peep);
            addPeepToCrowd();
          });
        }

        peep.walk = walk;
        crowd.push(peep);
        crowd.sort((a, b) => a.anchorY - b.anchorY);
        return peep;
      };

      const removePeepFromCrowd = (peep: Peep) => {
        removeItemFromArray(crowd, peep);
        availablePeeps.push(peep);
      };

      const initCrowd = () => {
        while (availablePeeps.length) {
          const walk = addPeepToCrowd().walk;
          if (walk) {
            walk.progress(Math.random());
          }
        }
      };

      const render = () => {
        if (!canvas || !ctx) return;
        canvas.width = canvas.width; // Clear canvas
        ctx.save();
        ctx.scale(window.devicePixelRatio || 1, window.devicePixelRatio || 1);

        crowd.forEach((peep) => {
          peep.render(ctx);
        });

        ctx.restore();
      };

      const resize = () => {
        if (!canvas) return;
        stage.width = canvas.clientWidth;
        stage.height = canvas.clientHeight;
        canvas.width = window.innerWidth * (window.devicePixelRatio || 1);
        canvas.height = window.innerHeight * (window.devicePixelRatio || 1);

        crowd.forEach((peep) => {
          if (peep.walk) peep.walk.kill();
        });

        crowd.length = 0;
        availablePeeps.length = 0;
        availablePeeps.push(...allPeeps);

        initCrowd();
      };

      const img = new Image();
      
      const init = () => {
        createPeeps(img);
        resize();
        window.gsap?.ticker?.add(render);
        window.addEventListener('resize', resize);
      };

      img.onload = init;
      img.src = config.src;

      crowdInitialized.current = true;
    };

    // Wait for canvas to be available, then initialize
    const initializeWhenReady = () => {
      if (!canvasRef.current) {
        setTimeout(initializeWhenReady, 100);
        return;
      }
      
      loadGSAP().then(() => {
        initCrowdSimulation();
      });
    };

    initializeWhenReady();

    return () => {
      // Cleanup on unmount
      if (canvasRef.current) {
        window.removeEventListener('resize', () => {});
      }
    };
  }, []);

  // Auto-rotate testimonials with pause on hover
  useEffect(() => {
    const rotate = () => setCurrentIndex(prev => (prev + 1) % testimonials.length);
    autoRotateIntervalRef.current = setInterval(rotate, 10000);
    return () => { if (autoRotateIntervalRef.current) clearInterval(autoRotateIntervalRef.current); };
  }, []);

  const handleHover = (pause: boolean) => {
    if (pause && autoRotateIntervalRef.current) {
      clearInterval(autoRotateIntervalRef.current);
      autoRotateIntervalRef.current = null;
    } else if (!pause && !autoRotateIntervalRef.current) {
      autoRotateIntervalRef.current = setInterval(() => setCurrentIndex(prev => (prev + 1) % testimonials.length), 10000);
    }
  };

  const goToPrevious = () => {
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  const goToNext = () => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
  };

  return (
    <main className="home-main">
      <Navbar items={navItems} logo="/images/shimanto.png" />
      
      <section className="home-section">
        <div className={styles.testimonialSection}>
          <canvas 
            ref={canvasRef}
            id="crowd-simulator"
            className={styles.crowdCanvas}
          ></canvas>
          
          <div className={styles.peopleContainer}>
            <div className={styles.sectionTitle}>
              <h2 data-heading="testimonial">Client Speak</h2>
            </div>

            <div 
              className={styles.testiBox}
              onMouseEnter={() => handleHover(true)}
              onMouseLeave={() => handleHover(false)}
            >
              <div className={styles.testiSlider}>
                <div className={styles.testiSliderContainer}>
                  {testimonials.map((testimonial, index) => (
                    <div
                      key={index}
                      className={`${styles.testiItem} ${index === currentIndex ? styles.active : ''}`}
                    >
                      <i className={`fas fa-quote-left ${styles.quoteLeft}`}></i>
                      <i className={`fas fa-quote-right ${styles.quoteRight}`}></i>
                      <p>{testimonial.quote}</p>
                      <div className={styles.testiProfile}>
                        <img
                          src={testimonial.image}
                          alt={testimonial.alt || testimonial.name}
                        />
                        <span>{testimonial.name}</span>
                        <h5>{testimonial.designation}</h5>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className={styles.testiSliderNav}>
                <span className="prev" onClick={goToPrevious}>
                  <i className="fas fa-angle-left"></i>
                </span>
                <span className="next" onClick={goToNext}>
                  <i className="fas fa-angle-right"></i>
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
