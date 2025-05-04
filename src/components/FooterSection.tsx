
import React from 'react';
import { GlitchText } from './GlitchText';
import { Github, Instagram, Youtube } from 'lucide-react';

export function FooterSection() {
  return (
    <footer className="py-12 px-4 border-t border-hacker-green border-opacity-20">
      <div className="max-w-5xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-6 md:mb-0">
            <GlitchText text="Zynthera" className="text-2xl font-gothic" />
          </div>
          
          <div className="flex space-x-6">
            <a 
              href="https://github.com/zynthera" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-hacker-green hover:text-hacker-red transition-colors duration-300"
              aria-label="GitHub"
            >
              <Github size={24} />
            </a>
            <a 
              href="https://instagram.com/xploit.ninja" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-hacker-green hover:text-hacker-red transition-colors duration-300"
              aria-label="Instagram"
            >
              <Instagram size={24} />
            </a>
            <a 
              href="https://www.youtube.com/@XploitNinja" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-hacker-green hover:text-hacker-red transition-colors duration-300"
              aria-label="YouTube"
            >
              <Youtube size={24} />
            </a>
          </div>
        </div>
        
        <div className="mt-8 pt-6 border-t border-hacker-green border-opacity-20 text-center">
          <p className="text-xs text-hacker-green opacity-50 font-mono">
            {'// SYSTEM ACCESS: RESTRICTED // CLEARANCE LEVEL: OMEGA Legend//'}
          </p>
        </div>
      </div>
    </footer>
  );
}
