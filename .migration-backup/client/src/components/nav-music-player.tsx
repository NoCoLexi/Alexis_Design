import { useState, useRef, useEffect } from "react";
import { createPortal } from "react-dom";
import { Play, Pause } from "lucide-react";
import hireMeSong from "@assets/Hire Me (Design and Groove)_1754579236907.mp3";
import { trackSynthesizerEvent, trackPortfolioClick } from "@/lib/analytics";

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

      // Track audio stop event
      trackSynthesizerEvent('audio_stop', {
        currentTime: audio.currentTime,
        duration: audio.duration,
        userAgent: navigator.userAgent
      });

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

        // Track audio start event
        trackSynthesizerEvent('audio_start', {
          readyState: audio.readyState,
          volume: audio.volume,
          userAgent: navigator.userAgent
        });

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
    <>
      <audio ref={audioRef} src={hireMeSong} preload="auto" />

      {/* Full-screen disco overlay - rendered to document root */}
      {isPlaying && createPortal(
        <div className="disco-overlay"></div>,
        document.body
      )}

      {renderAs === 'button' ? (
        <button
          onClick={(e) => {
            console.log('🖱️ Button clicked!', e);
            togglePlayPause();
          }}
          className="px-6 bg-transparent hover:bg-white/10 rounded-xl font-inter-bold flex items-center gap-2 w-full justify-center relative z-10 border-2 border-white transition-all duration-300 transform hover:scale-105 text-sm md:text-lg"
          style={{ 
            pointerEvents: 'auto', 
            fontFamily: 'Inter, sans-serif', 
            fontWeight: 700,
            height: '56px',
            boxShadow: '0 4px 12px rgba(255, 255, 255, 0.3)'
          }}
          data-testid="button-play-hire-me-song"
        >
          {isPlaying ? (
            <>
              <Pause className="h-4 w-4 flex-shrink-0" />
              <span className="text-center font-bold">Pause my Hire Me song</span>
            </>
          ) : (
            <>
              <Play className="h-4 w-4 flex-shrink-0" />
              <span className="text-center font-bold">{buttonText}</span>
            </>
          )}
        </button>
      ) : (
        <button
          onClick={togglePlayPause}
          className="px-4 bg-transparent hover:bg-white/10 rounded-xl font-inter-bold transition-all duration-300 flex items-center justify-center gap-2 border-2 border-white w-full h-full"
          title={isPlaying ? 'Pause music' : 'Play Me'}
          data-testid="button-disco-music-player"
          style={{ 
            fontFamily: 'Inter, sans-serif', 
            fontWeight: 700, 
            fontSize: '1.1rem'
          }}
        >
          {isPlaying ? <Pause className="h-5 w-5 relative z-10" /> : <Play className="h-5 w-5 relative z-10" />}
        </button>
      )}
    </>
  );
}