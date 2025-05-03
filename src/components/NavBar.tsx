
import React, { useState, useEffect } from 'react';
import { TerminalText } from './TerminalText';

export function NavBar() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <header 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled 
          ? 'bg-hacker-black bg-opacity-80 backdrop-blur-md py-3 shadow-lg shadow-hacker-green/10' 
          : 'bg-transparent py-5'
      }`}
    >
      <div className="max-w-6xl mx-auto px-4 flex justify-between items-center">
        <div className="text-hacker-green text-xl font-gothic">
          <TerminalText text="{ZYNTHERA}" speed={80} />
        </div>
        
        <nav>
          <ul className="flex space-x-6">
            {['About', 'Skills', 'Connect'].map((item, index) => (
              <li key={item}>
                <a
                  href={`#${item.toLowerCase()}`}
                  className="text-hacker-green hover:text-hacker-red transition-colors duration-200 text-sm font-mono relative overflow-hidden group"
                >
                  <span className="relative z-10">{`[${item.toUpperCase()}]`}</span>
                  <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-hacker-red transition-all duration-300 group-hover:w-full"></span>
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </header>
  );
}
