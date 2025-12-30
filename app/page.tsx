"use client";
import React, { useEffect } from "react";
import { usePathname } from "next/navigation";
import RotatingDesignation from "./components/RotatingDesignation";
import TagList from "./components/TagList";
import SocialLinks from "./components/SocialLinks";
import Navbar, { navItems } from "./components/Navbar";

// Type declaration for confetti
declare global {
  interface Window {
    confetti?: (options?: {
      particleCount?: number;
      angle?: number;
      spread?: number;
      startVelocity?: number;
      origin?: { x: number; y: number };
    }) => Promise<void> & { reset?: () => void };
  }
}

export default function HomePage() {
  const pathname = usePathname();
  const isHomePage = pathname === '/';
  
  useEffect(() => {
    // Only trigger confetti on the home page, using the script loaded via layout.tsx
    if (!isHomePage) return;

    const handlePreloaderComplete = () => {
      // Wait a bit to ensure preloader has fully faded out
      setTimeout(() => {
        if (typeof window !== 'undefined' && typeof window.confetti !== 'undefined') {
          // Left side burst - shoots across entire screen to the right
          window.confetti({
            particleCount: 300,
            angle: 60,
            spread: 100,
            startVelocity: 90,
            origin: { 
              x: -0.1,
              y: 1.1
            }
          });
          
          // Right side burst - shoots across entire screen to the left
          window.confetti({
            particleCount: 300,
            angle: 120,
            spread: 100,
            startVelocity: 90,
            origin: { 
              x: 1.1,
              y: 1.1
            }
          });
        }
      }, 200);
    };

    // Listen for the preloader completion event once
    if (typeof window !== 'undefined') {
      window.addEventListener('preloaderComplete', handlePreloaderComplete, { once: true });
    }

    return () => {
      if (typeof window !== 'undefined') {
        window.removeEventListener('preloaderComplete', handlePreloaderComplete);
      }
    };
  }, [isHomePage]);

  return (
    <main className="home-main">
      <Navbar items={navItems} logo="/images/nav-menu.webp" />
      <section className="home-section">
          <div className="home-content-wrapper">
          {/* Container for image and overlays */}
          <div style={{
            position: "relative",
            width: "100%",
            height: "100%",
            borderRadius: "24px",
            overflow: "visible",
            boxShadow: "0 20px 60px rgba(0, 0, 0, 0.5), 0 0 0 1px rgba(255, 255, 255, 0.1)",
            background: "transparent",
            backdropFilter: "blur(0.1px)",
            WebkitBackdropFilter: "blur(0.1px)"
          }}>
            <div style={{
              position: "absolute",
              inset: 0,
              borderRadius: "24px",
              overflow: "hidden",
              zIndex: 1
          }}>
            {/* Single Image */}
            <img 
              src="/images/profile.png" 
              alt="Shimanto Rehman" 
                className="home-image"
            />
            
            {/* Left Overlay Div - B&W Filter */}
            <div style={{
              position: "absolute",
              left: 0,
              top: 0,
              width: "50%",
              height: "100%",
              backdropFilter: "grayscale(100%)",
              WebkitBackdropFilter: "grayscale(100%)",
              zIndex: 2,
              pointerEvents: "none",
              transition: "all 0.3s ease"
            }} />
            
            {/* Right Overlay Div - Color (transparent, no filter) */}
            <div style={{
              position: "absolute",
              right: 0,
              top: 0,
              width: "50%",
              height: "100%",
              zIndex: 2,
              pointerEvents: "none"
            }} />
            
            {/* Vertical Line with Glow */}
              <div className="home-divider-vertical" />
            </div>
            
            {/* Left Text with Modern Styling */}
            <div className="home-text-left">
              Shimanto
            </div>
            
            {/* Right Text with Modern Styling */}
            <div className="home-text-right">
              Rehman
            </div>
            {/* Intro Text Section */}
            <div className="home-intro-section">
              <div className="home-intro-content">
              <RotatingDesignation 
                titles={[
                  "Full-stack Software Developer",
                  "Programmer",
                  "Database administrator",
                  "Data Science Enthusiast"
                ]}
              />
                <p className="home-intro-description">
                  I'm S.M. Obaydur Rahman aka Shimanto Rehman, From structured data to intelligent systems, I transform complex problems into elegant solutions. 
                  Loving backend, but I'm also dreaming in machine learning.
                </p>
                <TagList 
                  tags={[
                    "Software Development",
                    "Database Design",
                    "Data Science",
                    "Full-Stack"
                  ]}
                />
              </div>
            </div>
            {/* Decorative Corner Elements */}
            <div className="home-corner home-corner-top-left" />
            <div className="home-corner home-corner-top-right" />
            <div className="home-corner home-corner-bottom-left" />
            <div className="home-corner home-corner-bottom-right" />
            
          </div>
        </div>

          {/* Social Media Links - Middle Bottom */}
          <SocialLinks 
              links={[
                { 
                  platform: "facebook", 
                  url: "https://www.facebook.com/s.m.shimanto.rehman/", 
                  icon: "facebook", 
                  label: "Shimanto Rehman Facebook" 
                },
                { 
                  platform: "spotify", 
                  url: "https://open.spotify.com/user/349lvs5diwiulbqihpt61x1vg", 
                  icon: "spotify", 
                  label: "Shimanto Rehman Spotify" 
                },
                { 
                  platform: "instagram", 
                  url: "https://www.instagram.com/shimanto_rehman/", 
                  icon: "instagram", 
                  label: "Shimanto Rehman Instagram" 
                },
                { 
                  platform: "twitter", 
                  url: "https://twitter.com/shimanto_rehman", 
                  icon: "twitter", 
                  label: "Shimanto Rehman Twitter" 
                },
                { 
                  platform: "github", 
                  url: "https://github.com/shimanto-rehman", 
                  icon: "github", 
                  label: "Shimanto Rehman Github" 
                },
                { 
                  platform: "linkedin", 
                  url: "https://www.linkedin.com/in/shimanto-rehman/", 
                  icon: "linkedin", 
                  label: "Shimanto Rehman Linkedin" 
                }
              ]}
          />
      </section>
    </main>
  );
}