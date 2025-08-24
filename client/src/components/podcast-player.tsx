
import { useState, useRef, useEffect } from "react";
import { Mic, MicOff } from "lucide-react";
import podcastFile from "@assets/Alexis_Brochu__Podcast_The_Empathetic_Commander_1756078103831.m4a";

export default function PodcastPlayer() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [autoplayAttempted, setAutoplayAttempted] = useState(true); // Disable autoplay by default
  const audioRef = useRef<HTMLAudioElement>(null);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    // Set moderate volume
    audio.volume = 0.6;

    // Handle audio end
    const handleEnded = () => {
      setIsPlaying(false);
    };

    const handleError = (e: Event) => {
      console.error('Podcast audio error:', e);
      const target = e.target as HTMLAudioElement;
      if (target.error) {
        console.error('Podcast audio error code:', target.error.code);
        console.error('Podcast audio error message:', target.error.message);
      }
    };

    audio.addEventListener('ended', handleEnded);
    audio.addEventListener('error', handleError);

    return () => {
      audio.removeEventListener('ended', handleEnded);
      audio.removeEventListener('error', handleError);
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
        console.error('Error playing podcast:', error);
      }
    }
  };

  return (
    <>
      <audio ref={audioRef} src={podcastFile} preload="auto" />
      
      <div className="disco-button flex items-center justify-center rounded-2xl">
        <button
          onClick={togglePlayPause}
          className="px-4 py-4 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 rounded-xl font-inter-medium text-base transition-all duration-300 text-white flex items-center gap-2 w-full justify-center relative z-10"
          style={{ fontFamily: 'Inter, sans-serif', fontWeight: 500 }}
        >
          {isPlaying ? (
            <>
              <MicOff className="h-5 w-5 flex-shrink-0" />
              <span className="text-center">Pause my podcast</span>
            </>
          ) : (
            <>
              <Mic className="h-5 w-5 flex-shrink-0" />
              <span className="text-center">Listen to my podcast</span>
            </>
          )}
        </button>
      </div>
    </>
  );
}
