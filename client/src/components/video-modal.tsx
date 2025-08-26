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
  const [isVideoReady, setIsVideoReady] = useState(false);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      setHasStartedPlaying(false);
      setIsVideoReady(false);
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

  useEffect(() => {
    const video = videoRef.current;
    if (!video || !isOpen) return;

    const handleLoadedData = () => {
      // Keep video at start (0 seconds) for proper poster display
      video.currentTime = 0;
      video.pause();
      setIsVideoReady(true);
    };

    video.addEventListener('loadeddata', handleLoadedData);

    return () => {
      video.removeEventListener('loadeddata', handleLoadedData);
    };
  }, [isOpen]);

  const handlePlayClick = () => {
    const video = videoRef.current;
    if (!video) return;

    // Reset to beginning and start playing
    video.currentTime = 0;
    setHasStartedPlaying(true);
    video.play();
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
          <video
            ref={videoRef}
            src={videoSrc}
            controls={hasStartedPlaying}
            className="w-full h-auto"
            style={{ maxHeight: '80vh' }}
            preload="metadata"
            poster="/@fs/home/runner/workspace/attached_assets/Product Leader Video Still.png"
          >
            Your browser does not support the video tag.
          </video>

          {/* Custom Play Button Overlay */}
          {!hasStartedPlaying && isVideoReady && (
            <div className="absolute inset-0 flex items-center justify-center">
              <button
                onClick={handlePlayClick}
                className="bg-white/20 hover:bg-white/30 rounded-full p-4 transition-all duration-300 hover:scale-110 backdrop-blur-sm"
              >
                <Play className="w-12 h-12 text-white fill-white" />
              </button>
            </div>
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