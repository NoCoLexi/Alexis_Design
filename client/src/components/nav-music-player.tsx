import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Play, Pause } from "lucide-react";
import hireMeSong from "@assets/Hire Me (Design and Groove)_1754579236907.mp3";

export default function NavMusicPlayer() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [autoplayAttempted, setAutoplayAttempted] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    // Set lower volume for background music
    audio.volume = 0.25;

    // Handle audio end
    audio.addEventListener('ended', () => {
      setIsPlaying(false);
    });

    // Attempt autoplay when metadata is loaded
    const tryAutoplay = async () => {
      if (!autoplayAttempted && audio.readyState >= 2) {
        setAutoplayAttempted(true);
        try {
          await audio.play();
          setIsPlaying(true);
          console.log('Autoplay successful');
        } catch (error) {
          console.log('Autoplay blocked by browser - user interaction required');
          // Fallback: try to play on first user interaction
          const enableAutoplayOnInteraction = async () => {
            try {
              await audio.play();
              setIsPlaying(true);
              document.removeEventListener('click', enableAutoplayOnInteraction);
              document.removeEventListener('keydown', enableAutoplayOnInteraction);
            } catch (e) {
              console.log('Audio play failed:', e);
            }
          };
          
          document.addEventListener('click', enableAutoplayOnInteraction, { once: true });
          document.addEventListener('keydown', enableAutoplayOnInteraction, { once: true });
        }
      }
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
    } else {
      try {
        await audio.play();
        setIsPlaying(true);
      } catch (error) {
        console.error('Error playing audio:', error);
      }
    }
  };

  return (
    <div className="flex items-center">
      <audio ref={audioRef} src={hireMeSong} preload="auto" />
      
      <Button
        onClick={togglePlayPause}
        variant="ghost"
        size="sm"
        className="h-8 px-3 rounded-full border border-primary/30 hover:bg-primary/10 hover:border-primary transition-all duration-300 flex items-center gap-2"
        title={isPlaying ? 'Pause Hire Alexis song' : 'Play Hire Alexis song'}
      >
        {isPlaying ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
        <span className="text-xs hidden sm:inline">
          {isPlaying ? 'Playing' : 'Play Song'}
        </span>
      </Button>
    </div>
  );
}