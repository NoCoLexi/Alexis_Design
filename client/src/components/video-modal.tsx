import React, { useEffect, useRef, useState } from 'react';
import { X, Play } from 'lucide-react';

interface VideoModalProps {
  isOpen: boolean;
  onClose: () => void;
  videoSrc: string;
  title: string;
  posterImage?: string;
}

export default function VideoModal({ isOpen, onClose, videoSrc, title, posterImage }: VideoModalProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [hasStartedPlaying, setHasStartedPlaying] = useState(false);
  const [showPoster, setShowPoster] = useState(true);

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

  const handlePlayClick = async () => {
    const video = videoRef.current;
    if (!video) return;

    try {
      // Load the video first
      video.load();
      
      // Wait for the video to be ready
      await new Promise((resolve) => {
        video.addEventListener('loadeddata', resolve, { once: true });
      });

      setShowPoster(false);
      setHasStartedPlaying(true);
      video.currentTime = 0;
      
      await video.play();
      console.log('Video started playing successfully');
    } catch (error) {
      console.error('Error playing video:', error);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="relative w-full max-w-4xl bg-black rounded-xl overflow-hidden">
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 text-white hover:text-gray-300 transition-colors bg-black/50 rounded-full p-2"
        >
          <X className="w-6 h-6" />
        </button>

        {/* Video Container */}
        <div className="relative">
          {/* Poster Image */}
          {showPoster && (
            <div className="relative w-full" style={{ maxHeight: '80vh' }}>
              <img
                src="/@fs/home/runner/workspace/attached_assets/Product Leader Video Still.png"
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
              src="/@fs/home/runner/workspace/attached_assets/Alexis_Deconstructing_a_Modern_Product_Leader.mp4"
              controls={hasStartedPlaying}
              className="w-full h-auto"
              style={{ maxHeight: '80vh' }}
              preload="auto"
              playsInline
              muted={false}
              onLoadStart={() => console.log('Video load started')}
              onCanPlay={() => console.log('Video can play')}
              onError={(e) => console.error('Video error:', e)}
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