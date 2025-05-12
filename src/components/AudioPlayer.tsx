
import React, { useState, useEffect, useRef } from 'react';
import { Play, Pause } from 'lucide-react';
import { Button } from '@/components/ui/button';

export const AudioPlayer = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(true);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    // Create audio element
    const audio = new Audio('/audio/backgrounds.mp3');
    const audio = new Audio('/audio/background.mp3');
    audio.loop = true;
    audio.muted = isMuted;
    audioRef.current = audio;

    // Setup autoplay (muted by default)
    const playPromise = audio.play().catch(error => {
      console.error('Audio playback failed:', error);
    });

    return () => {
      // Cleanup function
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }
    };
  }, []);

  const togglePlayback = () => {
    if (!audioRef.current) return;

    if (isPlaying) {
      audioRef.current.pause();
    } else {
      // Unmute when user explicitly presses play
      if (isMuted) {
        audioRef.current.muted = false;
        setIsMuted(false);
      }
      audioRef.current.play().catch(error => {
        console.error('Audio playback failed:', error);
      });
    }
    
    setIsPlaying(!isPlaying);
  };

  return (
    <div className="fixed bottom-4 right-4 z-50">
      <Button 
        onClick={togglePlayback} 
        variant="outline" 
        size="icon"
        className="bg-hacker-black border-hacker-green text-hacker-green hover:bg-hacker-black/30 hover:text-hacker-red hover:border-hacker-red transition-colors"
      >
        {isPlaying ? <Pause size={20} /> : <Play size={20} />}
      </Button>
    </div>
  );
};
