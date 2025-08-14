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

    console.log('Setting up audio element:', audio);
    console.log('Audio src set to:', hireMeSong);

    // Set moderate volume
    audio.volume = 0.4;

    // Handle audio end
    const handleEnded = () => {
      console.log('Audio ended');
      setIsPlaying(false);
      onPlayingChange?.(false);
      // Dispatch custom event for other components
      window.dispatchEvent(new CustomEvent('musicStateChange', { 
        detail: { isPlaying: false } 
      }));
    };

    const handleLoadStart = () => {
      console.log('Audio load started');
    };

    const handleCanPlay = () => {
      console.log('Audio can play');
    };

    const handleError = (e: Event) => {
      console.error('Audio error:', e);
      const target = e.target as HTMLAudioElement;
      if (target.error) {
        console.error('Audio error code:', target.error.code);
        console.error('Audio error message:', target.error.message);
      }
    };

    audio.addEventListener('ended', handleEnded);
    audio.addEventListener('loadstart', handleLoadStart);
    audio.addEventListener('canplay', handleCanPlay);
    audio.addEventListener('error', handleError);

    return () => {
      audio.removeEventListener('ended', handleEnded);
      audio.removeEventListener('loadstart', handleLoadStart);
      audio.removeEventListener('canplay', handleCanPlay);
      audio.removeEventListener('error', handleError);
    };
  }, [onPlayingChange]);

  const togglePlayPause = async () => {
    console.log('🎵 Toggle play/pause clicked, current isPlaying:', isPlaying);
    const audio = audioRef.current;
    if (!audio) {
      console.error('❌ Audio element not found');
      return;
    }

    console.log('✅ Audio element found:', audio);
    console.log('🔗 Audio src:', audio.src);
    console.log('📊 Audio readyState:', audio.readyState);
    console.log('⏱️ Audio current time:', audio.currentTime);
    console.log('⏱️ Audio duration:', audio.duration);

    if (isPlaying) {
      console.log('⏸️ Pausing audio');
      audio.pause();
      setIsPlaying(false);
      onPlayingChange?.(false);
      // Dispatch custom event for other components
      window.dispatchEvent(new CustomEvent('musicStateChange', { 
        detail: { isPlaying: false } 
      }));
    } else {
      try {
        console.log('▶️ Attempting to play audio...');
        
        // Force load the audio if needed
        if (audio.readyState < 2) {
          console.log('🔄 Loading audio...');
          audio.load();
          await new Promise((resolve) => {
            audio.addEventListener('canplay', resolve, { once: true });
          });
        }
        
        const playPromise = audio.play();
        await playPromise;
        console.log('🎶 Audio started playing successfully!');
        setIsPlaying(true);
        onPlayingChange?.(true);
        // Dispatch custom event for other components
        window.dispatchEvent(new CustomEvent('musicStateChange', { 
          detail: { isPlaying: true } 
        }));
      } catch (error) {
        console.error('❌ Error playing audio:', error);
        console.error('📝 Error details:', error instanceof Error ? error.message : String(error));
        
        // Try to reset and reload the audio
        console.log('🔄 Trying to reset audio...');
        audio.currentTime = 0;
        audio.load();
      }
    }
  };

  return (
    <div className="flex items-center justify-center">
      <audio ref={audioRef} src={hireMeSong} preload="auto" />
      
      {renderAs === 'button' ? (
        <button
          onClick={(e) => {
            console.log('🖱️ Button clicked!', e);
            togglePlayPause();
          }}
          className="px-8 py-4 gradient-bg-primary hover:opacity-90 rounded-xl font-semibold text-lg transition-all duration-300 glow-purple flex items-center gap-3"
          data-testid="music-player-button"
          style={{ pointerEvents: 'auto' }}
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