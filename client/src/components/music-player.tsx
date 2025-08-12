import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Play, Pause, Volume2 } from "lucide-react";
import hireMeSong from "@assets/Hire Me (Design and Groove)_1754579236907.mp3";

export default function MusicPlayer() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [duration, setDuration] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [autoplayAttempted, setAutoplayAttempted] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    // Set lower volume for background music
    audio.volume = 0.25;

    const setAudioData = () => {
      setDuration(audio.duration);
      setCurrentTime(audio.currentTime);
    };

    const setAudioTime = () => setCurrentTime(audio.currentTime);

    audio.addEventListener('loadeddata', setAudioData);
    audio.addEventListener('timeupdate', setAudioTime);

    // Handle audio end
    audio.addEventListener('ended', () => {
      setIsPlaying(false);
      setCurrentTime(0);
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
      audio.removeEventListener('loadeddata', setAudioData);
      audio.removeEventListener('timeupdate', setAudioTime);
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

  const formatTime = (time: number) => {
    if (isNaN(time)) return "0:00";
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };

  return (
    <div className="flex items-center gap-4 glass rounded-xl p-4 hover:glow-purple transition-all duration-300">
      <audio ref={audioRef} src={hireMeSong} preload="auto" />
      
      <Button
        onClick={togglePlayPause}
        variant="outline"
        size="icon"
        className={`h-12 w-12 rounded-full border-2 border-primary hover:bg-primary hover:text-primary-foreground disco-button ${isPlaying ? 'playing' : ''}`}
      >
        {isPlaying ? <Pause className="h-5 w-5 relative z-10" /> : <Play className="h-5 w-5 relative z-10" />}
      </Button>

      <div className="flex-1 min-w-0">
        <div className="text-sm font-medium text-foreground mb-1">
          {isPlaying ? 'Hire Alexis song (playing)' : 'Hire Alexis song (click to play)'}
        </div>
        <div className="flex items-center gap-2 text-xs text-muted-foreground">
          <Volume2 className="h-3 w-3" />
          <span>{formatTime(currentTime)}</span>
          <div className="flex-1 bg-muted rounded-full h-1">
            <div 
              className="bg-primary h-1 rounded-full transition-all duration-200"
              style={{ width: duration > 0 ? `${(currentTime / duration) * 100}%` : '0%' }}
            />
          </div>
          <span>{formatTime(duration)}</span>
        </div>
      </div>
    </div>
  );
}