
import React, { useEffect, useRef } from 'react';
import anime from 'animejs';
import { cn } from '@/lib/utils';

interface GlitchTextProps {
  text: string;
  className?: string;
  delay?: number;
}

export function GlitchText({ text, className, delay = 0 }: GlitchTextProps) {
  const textRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (textRef.current) {
      anime({
        targets: textRef.current,
        opacity: [0, 1],
        translateY: [10, 0],
        easing: 'easeOutExpo',
        duration: 1000,
        delay: delay,
      });
    }
  }, [delay]);

  return (
    <div 
      ref={textRef} 
      className={cn('glitch-effect opacity-0', className)} 
      data-text={text}
    >
      {text}
    </div>
  );
}
