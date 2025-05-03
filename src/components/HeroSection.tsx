
import React, { useEffect, useRef } from 'react';
import { GlitchText } from './GlitchText';
import { TerminalText } from './TerminalText';
import anime from 'animejs';

export function HeroSection() {
  const heroRef = useRef<HTMLDivElement>(null);
  const identityPoints = [
    '→ 𝑯𝒂𝒄𝒌𝒆𝒓 | 𝑬𝒏𝒕𝒓𝒆𝒑𝒓𝒆𝒏𝒆𝒖𝒓 | 𝑻𝒓𝒂𝒅𝒆𝒓',
    '→ 𝑴𝒊𝒏𝒅𝒔𝒆𝒕: 𝑵𝒐 𝒍𝒊𝒎𝒊𝒕𝒔.',
    '→ 𝑽𝒊𝒔𝒊𝒐𝒏: 𝑩𝒊𝒍𝒍𝒊𝒐𝒏𝒂𝒊𝒓𝒆 𝒎𝒊𝒔𝒔𝒊𝒐𝒏.',
    '→ 𝑷𝒖𝒓𝒑𝒐𝒔𝒆: 𝑪𝒓𝒆𝒂𝒕𝒆. 𝑳𝒆𝒂𝒅. 𝑰𝒎𝒑𝒂𝒄𝒕.',
    '→ 𝑭𝒐𝒄𝒖𝒔: 𝑷𝒓𝒐𝒇𝒊𝒕, 𝑷𝒐𝒘𝒆𝒓, 𝑷𝒆𝒓𝒔𝒊𝒔𝒕𝒆𝒏𝒄𝒆.',
    '→ 𝑺𝒑𝒊𝒓𝒊𝒕: 𝑼𝒏𝒔𝒕𝒐𝒑𝒑𝒂𝒃𝒍𝒆.',
  ];

  useEffect(() => {
    if (heroRef.current) {
      anime({
        targets: heroRef.current,
        opacity: [0, 1],
        duration: 800,
        easing: 'easeInOutQuad'
      });
      
      // Add matrix digital rain effect to the background
      const canvas = document.createElement('canvas');
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      canvas.className = 'absolute inset-0 z-[-1] opacity-10';
      
      heroRef.current.appendChild(canvas);
      
      const ctx = canvas.getContext('2d');
      const characters = 'アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヲン0123456789';
      const columns = Math.floor(canvas.width / 20);
      const drops: number[] = [];
      
      // Initialize drops
      for (let i = 0; i < columns; i++) {
        drops[i] = 1;
      }
      
      function draw() {
        if (!ctx) return;
        
        // Semi-transparent black to leave trails
        ctx.fillStyle = 'rgba(0, 0, 0, 0.05)';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        
        ctx.fillStyle = '#00FF00';
        ctx.font = '15px monospace';
        
        // Loop through drops
        for (let i = 0; i < drops.length; i++) {
          // Random character
          const text = characters[Math.floor(Math.random() * characters.length)];
          
          // Draw the character
          ctx.fillText(text, i * 20, drops[i] * 20);
          
          // Send it to the top when it reaches the bottom
          // or random reset for some columns
          if (drops[i] * 20 > canvas.height || Math.random() > 0.975) {
            drops[i] = 0;
          }
          
          // Increment y coordinate
          drops[i]++;
        }
      }
      
      const matrixInterval = setInterval(draw, 35);
      
      return () => {
        clearInterval(matrixInterval);
        anime.remove(heroRef.current);
      };
    }
  }, []);

  return (
    <section id="hero" className="min-h-screen flex flex-col items-center justify-center relative px-4 py-16">
      <div className="scanline"></div>
      <div ref={heroRef} className="max-w-3xl mx-auto text-center opacity-0 relative z-10">
        <h1 className="text-4xl md:text-6xl font-gothic mb-8 text-hacker-green glitch-random">
          <GlitchText text="𝑰'𝒎 𝒏𝒐𝒕 𝒔𝒑𝒆𝒄𝒊𝒂𝒍. 𝑰'𝒎 𝒍𝒊𝒎𝒊𝒕𝒆𝒅 𝒆𝒅𝒊𝒕𝒊𝒐𝒏." />
        </h1>
        
        <div className="mt-12 space-y-4 text-left">
          {identityPoints.map((point, index) => (
            <div key={index} className="opacity-0 animate-fade-in" style={{ animationDelay: `${index * 300 + 800}ms` }}>
              <TerminalText 
                text={point} 
                delay={index * 300 + 800} 
                speed={20} 
                className="text-lg md:text-xl"
              />
            </div>
          ))}
        </div>
        
        <div className="mt-16 opacity-0 animate-fade-in lens-effect" style={{ animationDelay: '3000ms' }}>
          <span className="inline-block px-4 py-2 border border-hacker-red text-hacker-red hover:bg-hacker-red hover:text-hacker-black transition-colors duration-300 cursor-pointer relative overflow-hidden group">
            <span className="relative z-10">[ACCESS_PROFILE]</span>
            <span className="absolute inset-0 bg-hacker-red origin-left transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300"></span>
          </span>
        </div>
      </div>
    </section>
  );
}
