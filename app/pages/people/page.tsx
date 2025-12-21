'use client';

import { useState, useEffect, useRef } from 'react';
import styles from './People.module.css';
import { testimonials } from './peopleData';
import Navbar, { navItems } from '@/app/components/Navbar';
import { usePageDataLoaded } from '@/app/hooks/usePageDataLoaded';
import { useCrowdSimulation } from '@/app/hooks/useCrowdSimulation';

export default function PeoplePage() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const autoRotateIntervalRef = useRef<NodeJS.Timeout | null>(null);
  usePageDataLoaded();
  useCrowdSimulation(canvasRef);

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
