
import React, { useEffect, useRef } from 'react';
import barba from '@barba/core';
import anime from 'animejs';
import { NavBar } from '@/components/NavBar';
import { HeroSection } from '@/components/HeroSection';
import { TimelineSection } from '@/components/TimelineSection';
import { SkillsSection } from '@/components/SkillsSection';
import { FooterSection } from '@/components/FooterSection';

const Index = () => {
  const pageRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    // Initialize anime.js animations and scroll effects
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          anime({
            targets: entry.target,
            opacity: [0, 1],
            translateY: [20, 0],
            easing: 'easeOutExpo',
            duration: 800,
            delay: anime.stagger(100)
          });
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1 });

    // Observe all sections with animation
    document.querySelectorAll('section').forEach(section => {
      observer.observe(section);
    });

    // Apply lens distortion effect to images and cards
    const initLensEffect = () => {
      if (typeof window.lens !== 'undefined') {
        const lensElements = document.querySelectorAll('.lens-effect');
        lensElements.forEach(el => {
          if (el instanceof HTMLElement) {
            window.lens?.init(el, {
              radius: 80,
              intensity: 0.25,
              speedIn: 0.8,
              speedOut: 0.8
            });
          }
        });
      }
    };

    // Load lens.js dynamically
    const loadLensScript = () => {
      const script = document.createElement('script');
      script.src = 'https://unpkg.com/lens.js@latest/dist/lens.umd.js';
      script.async = true;
      script.onload = () => {
        // Wait a bit for the script to initialize
        setTimeout(initLensEffect, 300);
      };
      script.onerror = (error) => {
        console.error("Failed to load lens.js:", error);
      };
      document.body.appendChild(script);
    };

    // Check if lens.js is already loaded
    if (typeof window.lens !== 'undefined') {
      initLensEffect();
    } else {
      loadLensScript();
    }

    // We'll initialize barba.js only if we have the required wrapper
    // This prevents errors if the barba data-attribute isn't present
    const barbaWrapper = document.querySelector('[data-barba="wrapper"]');
    if (barbaWrapper) {
      try {
        barba.init({
          transitions: [{
            name: 'opacity-transition',
            leave(data) {
              return anime({
                targets: data.current.container,
                opacity: 0,
                duration: 300,
                easing: 'easeInQuad'
              }).finished;
            },
            enter(data) {
              return anime({
                targets: data.next.container,
                opacity: [0, 1],
                duration: 300,
                easing: 'easeOutQuad'
              }).finished;
            }
          }]
        });
      } catch (error) {
        console.error("Barba.js initialization error:", error);
      }
    }

    // Random glitch effect on elements with glitch-random class
    const glitchRandomElements = document.querySelectorAll('.glitch-random');
    
    const triggerRandomGlitch = () => {
      const randomEl = glitchRandomElements[Math.floor(Math.random() * glitchRandomElements.length)];
      if (randomEl) {
        randomEl.classList.add('glitching');
        setTimeout(() => {
          randomEl.classList.remove('glitching');
        }, 200 + Math.random() * 400);
      }
      
      setTimeout(triggerRandomGlitch, 2000 + Math.random() * 4000);
    };
    
    if (glitchRandomElements.length > 0) {
      triggerRandomGlitch();
    }

    // Add data corruption visual effect
    if (pageRef.current) {
      const corruptionEffect = () => {
        const corruptionOverlay = document.createElement('div');
        corruptionOverlay.className = 'corruption-overlay';
        pageRef.current?.appendChild(corruptionOverlay);
        
        setTimeout(() => {
          corruptionOverlay.remove();
        }, 150);
        
        setTimeout(corruptionEffect, 7000 + Math.random() * 10000);
      };
      
      setTimeout(corruptionEffect, 5000);
    }

    // Cleanup
    return () => {
      observer.disconnect();
    };
  }, []);

  return (
    <div ref={pageRef} className="bg-hacker-black min-h-screen overflow-hidden" data-barba="wrapper">
      {/* Scanline effect overlay */}
      <div className="fixed inset-0 z-[1] pointer-events-none">
        <div className="absolute inset-0 bg-[url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAACCAYAAACZgbYnAAAAEklEQVQImWNgYGD4z8Dc3MwAARgAJ04V65YAAAAASUVORK5CYII=')] opacity-[0.03]"></div>
        <div className="scanline"></div>
        <div className="noise"></div>
      </div>
      
      <div data-barba="container" data-barba-namespace="home">
        <NavBar />
        
        <main className="relative z-[5]">
          <HeroSection />
          <TimelineSection />
          <SkillsSection />
        </main>
        
        <FooterSection />
      </div>
    </div>
  );
};

export default Index;
