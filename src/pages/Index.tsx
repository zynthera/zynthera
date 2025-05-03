
import React, { useEffect } from 'react';
import barba from '@barba/core';
import anime from 'animejs';
import { NavBar } from '@/components/NavBar';
import { HeroSection } from '@/components/HeroSection';
import { TimelineSection } from '@/components/TimelineSection';
import { SkillsSection } from '@/components/SkillsSection';
import { FooterSection } from '@/components/FooterSection';

const Index = () => {
  useEffect(() => {
    // Barba.js initialization
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

    // Initialize glitch effects on scroll
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

    // Cleanup
    return () => {
      observer.disconnect();
    };
  }, []);

  return (
    <div className="bg-hacker-black min-h-screen">
      {/* Scanline effect overlay */}
      <div className="fixed inset-0 z-[1] pointer-events-none">
        <div className="absolute inset-0 bg-[url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAACCAYAAACZgbYnAAAAEklEQVQImWNgYGD4z8Dc3MwAARgAJ04V65YAAAAASUVORK5CYII=')] opacity-[0.03]"></div>
        <div className="scanline"></div>
      </div>
      
      <NavBar />
      
      <main className="relative z-[5]">
        <HeroSection />
        <TimelineSection />
        <SkillsSection />
      </main>
      
      <FooterSection />
    </div>
  );
};

export default Index;
