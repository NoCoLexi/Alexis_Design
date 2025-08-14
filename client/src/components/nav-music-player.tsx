import { useState, useRef, useEffect } from "react";
import { Play, Pause } from "lucide-react";
import hireMeSong from "@assets/Hire Me (Design and Groove)_1754579236907.mp3";

interface NavMusicPlayerProps {
  onPlayingChange?: (isPlaying: boolean) => void;
  renderAs?: 'circle' | 'button';
  buttonText?: string;
}

export default function NavMusicPlayer({ onPlayingChange, renderAs = 'circle', buttonText = 'Play my Hire Me song' }: NavMusicPlayerProps) {
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
    console.log('Toggle play/pause clicked, current isPlaying:', isPlaying);
    const audio = audioRef.current;
    if (!audio) {
      console.error('Audio element not found');
      return;
    }

    console.log('Audio element found:', audio);
    console.log('Audio src:', audio.src);
    console.log('Audio readyState:', audio.readyState);

    if (isPlaying) {
      console.log('Pausing audio');
      audio.pause();
      setIsPlaying(false);
      onPlayingChange?.(false);
      // Dispatch custom event for other components
      window.dispatchEvent(new CustomEvent('musicStateChange', { 
        detail: { isPlaying: false } 
      }));
    } else {
      try {
        console.log('Attempting to play audio');
        await audio.play();
        console.log('Audio started playing successfully');
        setIsPlaying(true);
        onPlayingChange?.(true);
        // Dispatch custom event for other components
        window.dispatchEvent(new CustomEvent('musicStateChange', { 
          detail: { isPlaying: true } 
        }));
      } catch (error) {
        console.error('Error playing audio:', error);
        console.error('Error details:', error.message);
      }
    }
  };

  return (
    <div className="flex items-center justify-center">
      <audio ref={audioRef} src={hireMeSong} preload="auto" />
      
      {renderAs === 'button' ? (
        <button
          onClick={togglePlayPause}
          className="px-8 py-4 gradient-bg-primary hover:opacity-90 rounded-xl font-semibold text-lg transition-all duration-300 glow-purple flex items-center gap-3"
          data-testid="music-player-button"
        >
          {isPlaying ? (
            <>
              <Pause className="h-5 w-5" />
              Pause song
            </>
          ) : (
            <>
              <Play className="h-5 w-5" />
              {buttonText}
            </>
          )}
        </button>
      ) : (
        <button
          onClick={togglePlayPause}
          className={`disco-ball flex items-center justify-center ${isPlaying ? 'spinning' : ''}`}
          title={isPlaying ? 'Pause music' : 'Play Me'}
          data-testid="music-player-button"
        >
          {isPlaying ? <Pause className="h-5 w-5 relative z-10" /> : <Play className="h-5 w-5 relative z-10" />}
        </button>
      )}
    </div>
  );
}