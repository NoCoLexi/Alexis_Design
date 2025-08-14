import { useState, useRef, useEffect } from "react";
import { Play, Pause } from "lucide-react";
import hireMeSong from "@assets/Hire Me (Design and Groove)_1754579236907.mp3";

interface NavMusicPlayerProps {
  onPlayingChange?: (isPlaying: boolean) => void;
}

export default function NavMusicPlayer({ onPlayingChange }: NavMusicPlayerProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [autoplayAttempted, setAutoplayAttempted] = useState(true); // Disable autoplay by default
  const audioRef = useRef<HTMLAudioElement>(null);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    // Set moderate volume and remove echo effects
    audio.volume = 0.4;

    // Handle audio end
    audio.addEventListener('ended', () => {
      setIsPlaying(false);
      onPlayingChange?.(false);
      // Dispatch custom event for other components
      window.dispatchEvent(new CustomEvent('musicStateChange', { 
        detail: { isPlaying: false } 
      }));
    });

    // No autoplay - user must click to start
    const tryAutoplay = async () => {
      // Autoplay disabled by default
    };

    audio.addEventListener('loadedmetadata', tryAutoplay);
    audio.addEventListener('canplaythrough', tryAutoplay);

    return () => {
      audio.removeEventListener('ended', () => setIsPlaying(false));
      audio.removeEventListener('loadedmetadata', tryAutoplay);
      audio.removeEventListener('canplaythrough', tryAutoplay);
    };
  }, [autoplayAttempted]);

  const togglePlayPause = async () => {
    const audio = audioRef.current;
    if (!audio) return;

    if (isPlaying) {
      audio.pause();
      setIsPlaying(false);
      onPlayingChange?.(false);
      // Dispatch custom event for other components
      window.dispatchEvent(new CustomEvent('musicStateChange', { 
        detail: { isPlaying: false } 
      }));
    } else {
      try {
        await audio.play();
        setIsPlaying(true);
        onPlayingChange?.(true);
        // Dispatch custom event for other components
        window.dispatchEvent(new CustomEvent('musicStateChange', { 
          detail: { isPlaying: true } 
        }));
      } catch (error) {
        console.error('Error playing audio:', error);
      }
    }
  };

  return (
    <div className="flex items-center justify-center">
      <audio ref={audioRef} src={hireMeSong} preload="auto" />
      
      <button
        onClick={togglePlayPause}
        className="relative group cursor-pointer transform transition-transform duration-300 hover:scale-105"
        title={isPlaying ? 'Pause music' : 'Play Me'}
        style={{ background: 'none', border: 'none', padding: 0 }}
      >
        <svg
          width="64"
          height="64"
          viewBox="0 0 64 64"
          className={`${isPlaying ? 'animate-pulse' : ''}`}
        >
          {/* Main disco ball circle */}
          <defs>
            <radialGradient id="discoBallGradient" cx="30%" cy="30%">
              <stop offset="0%" stopColor="rgba(220, 220, 255, 0.95)" />
              <stop offset="25%" stopColor="rgba(180, 180, 220, 0.8)" />
              <stop offset="50%" stopColor="rgba(140, 140, 180, 0.6)" />
              <stop offset="75%" stopColor="rgba(100, 100, 140, 0.4)" />
              <stop offset="100%" stopColor="rgba(60, 60, 100, 0.2)" />
            </radialGradient>
            <radialGradient id="lightsGradient" cx="50%" cy="50%">
              <stop offset="0%" stopColor="rgba(255, 107, 107, 0.4)" />
              <stop offset="33%" stopColor="rgba(78, 205, 196, 0.4)" />
              <stop offset="66%" stopColor="rgba(69, 183, 209, 0.4)" />
              <stop offset="100%" stopColor="transparent" />
            </radialGradient>
            <filter id="glow">
              <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
              <feMerge> 
                <feMergeNode in="coloredBlur"/>
                <feMergeNode in="SourceGraphic"/>
              </feMerge>
            </filter>
          </defs>
          
          {/* Outer glow */}
          <circle
            cx="32"
            cy="32"
            r="32"
            fill="url(#discoBallGradient)"
            filter="url(#glow)"
            style={{
              dropShadow: '0 0 25px rgba(255, 255, 255, 0.4)'
            }}
          />
          
          {/* Disco lights overlay when playing */}
          {isPlaying && (
            <circle
              cx="32"
              cy="32"
              r="30"
              fill="url(#lightsGradient)"
              opacity="0.6"
              className="animate-pulse"
            />
          )}
          
          {/* Highlight spot */}
          <circle
            cx="24"
            cy="24"
            r="8"
            fill="rgba(255, 255, 255, 0.7)"
            opacity="0.8"
          />
        </svg>
        
        {/* Play/Pause icon overlay */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          {isPlaying ? 
            <Pause className="h-5 w-5 text-white/90 drop-shadow-lg" /> : 
            <Play className="h-5 w-5 text-white/90 drop-shadow-lg" />
          }
        </div>
      </button>
    </div>
  );
}