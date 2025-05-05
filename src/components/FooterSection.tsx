import React from 'react';
import { GlitchText } from './GlitchText';
import { Github, Instagram, Youtube } from 'lucide-react';

const TelegramIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="currentColor"
    width="24"
    height="24"
  >
    <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm5.09 8.783l-1.25 5.881c-.094.422-.338.53-.684.33l-1.887-1.406-1.024.984c-.113.111-.211.211-.43.211l.154-2.184 3.968-3.586c.172-.154-.037-.241-.265-.087l-4.9 3.085-2.105-.657c-.457-.142-.467-.457.096-.677l8.204-3.165c.338-.13.63.082.524.53z" />
  </svg>
);

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
            <a 
              href="https://t.me/xploitninjaofficial" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-hacker-green hover:text-hacker-red transition-colors duration-300"
              aria-label="Telegram"
            >
              <TelegramIcon />
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
