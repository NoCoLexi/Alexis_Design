import React, { useEffect, useRef, useState } from 'react';
import { X, Play } from 'lucide-react';
import expertiseVideo from "@assets/Alexis_Deconstructing_a_Modern_Product_Leader.mp4";
import expertisePoster from "@assets/Product Leader Video Still.png";

interface VideoModalProps {
  isOpen: boolean;
  onClose: () => void;
  videoSrc?: string; // Make optional since we're using fixed paths
  title: string;
  posterImage?: string; // Make optional since we're using fixed paths
}

export default function VideoModal({ isOpen, onClose, title }: VideoModalProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [hasStartedPlaying, setHasStartedPlaying] = useState(false);
  const [showPoster, setShowPoster] = useState(true);

  // Always use the imported video and poster assets
  const videoSrc = expertiseVideo;
  const posterSrc = expertisePoster;

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      setHasStartedPlaying(false);
      setShowPoster(true);
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
      return () => document.removeEventListener('keydown', handleEscape);
    }
  }, [isOpen, onClose]);

  const handlePlayClick = () => {
    const video = videoRef.current;
    if (!video) return;

    setShowPoster(false);
    setHasStartedPlaying(true);
    
    // Reset to beginning and play
    video.currentTime = 0;
    video.play().catch(error => {
      console.error('Error playing video:', error);
    });
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="relative w-full max-w-4xl bg-black rounded-xl overflow-hidden">
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 text-white/70 hover:text-white transition-colors bg-black/50 hover:bg-white/10 rounded-full p-2"
        >
          <X className="w-6 h-6" />
        </button>

        {/* Video Container */}
        <div className="relative">
          {/* Poster Image */}
          {showPoster && (
            <div className="relative w-full" style={{ maxHeight: '80vh' }}>
              <img
                src={posterSrc}
                alt="Video thumbnail"
                className="w-full h-auto"
                style={{ maxHeight: '80vh' }}
              />
              <div className="absolute inset-0 flex items-center justify-center">
                <button
                  onClick={handlePlayClick}
                  className="bg-white/20 hover:bg-white/30 rounded-full p-4 transition-all duration-300 hover:scale-110 backdrop-blur-sm"
                >
                  <Play className="w-12 h-12 text-white fill-white" />
                </button>
              </div>
            </div>
          )}

          {/* Video Element */}
          {!showPoster && (
            <video
              ref={videoRef}
              src={videoSrc}
              controls
              className="w-full h-auto"
              style={{ maxHeight: '80vh' }}
              preload="metadata"
              playsInline
              autoPlay
            >
              Your browser does not support the video tag.
            </video>
          )}
        </div>

        {/* Title */}
        <div className="p-4 bg-gradient-to-r from-purple-600/10 to-blue-600/10 border-t border-purple-400/20">
          <h3 className="text-white text-lg font-semibold">{title}</h3>
        </div>
      </div>
    </div>
  );
}