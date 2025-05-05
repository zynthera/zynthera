import React, { useEffect, useRef } from 'react';
import barba from '@barba/core';
import anime from 'animejs';
import { NavBar } from '@/components/NavBar';
import { HeroSection } from '@/components/HeroSection';
import { TimelineSection } from '@/components/TimelineSection';
import { SkillsSection } from '@/components/SkillsSection';
import { FooterSection } from '@/components/FooterSection';
import { AudioPlayer } from '@/components/AudioPlayer';

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
    const loadLensEffect = () => {
      // Check if lens object exists in window
      if (typeof window.lens === 'undefined') {
        // Define a simple fallback lens effect if the library fails to load
        window.lens = {
          init: (el, options) => {
            if (el instanceof HTMLElement) {
              el.addEventListener('mouseenter', () => {
                el.style.transform = 'scale(1.05)';
              });
              el.addEventListener('mouseleave', () => {
                el.style.transform = 'scale(1)';
              });
            }
          }
        };
      }
      
      // Apply lens effect to elements
      const lensElements = document.querySelectorAll('.lens-effect');
      lensElements.forEach(el => {
        if (el instanceof HTMLElement) {
          window.lens.init(el, {
            radius: 80,
            intensity: 0.25,
            speedIn: 0.8,
            speedOut: 0.8
          });
        }
      });
    };
    
    // Load lens.js script with error handling
    const script = document.createElement('script');
    script.src = 'https://cdn.jsdelivr.net/npm/lens.js@1.0.0/dist/lens.min.js';
    script.async = true;
    script.onload = () => {
      setTimeout(loadLensEffect, 300);
    };
    script.onerror = () => {
      console.warn('Lens.js failed to load, using fallback effect');
      loadLensEffect(); // Use fallback if script fails to load
    };
    document.body.appendChild(script);

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
        console.error("Error initializing Barba.js:", error);
      }
    }
  }, []);

  return (
    <div ref={pageRef}>
      <NavBar />
      <HeroSection />
      <TimelineSection />
      <SkillsSection />
      <FooterSection />
      <AudioPlayer />
    </div>
  );
};

export default Index;
