import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
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
      
      <Button
        onClick={togglePlayPause}
        variant="ghost"
        size="sm"
        className="h-10 px-6 rounded-full border border-primary/30 hover:bg-primary/10 hover:border-primary transition-all duration-300 flex items-center justify-center gap-2 glass"
        title={isPlaying ? 'Pause music' : 'Play Me'}
      >
        {isPlaying ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
        <span className="text-sm font-medium">
          {isPlaying ? 'Playing' : 'Play Me'}
        </span>
      </Button>
    </div>
  );
}