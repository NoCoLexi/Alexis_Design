import { useEffect, useRef } from 'react';
import { useLocation } from 'wouter';
import { trackPageView, trackUserEngagement, trackDeviceInfo } from '../lib/analytics';

export const useAnalytics = () => {
  const [location] = useLocation();
  const prevLocationRef = useRef<string>(location);
  const sessionStartRef = useRef<number>(Date.now());
  
  useEffect(() => {
    // Track initial page load and device info
    trackDeviceInfo();
    trackUserEngagement('session_start');
    
    // Track page views when routes change
    if (location !== prevLocationRef.current) {
      trackPageView(location);
      prevLocationRef.current = location;
    }

    // Track session end on page unload
    const handleBeforeUnload = () => {
      const sessionDuration = Math.floor((Date.now() - sessionStartRef.current) / 1000);
      trackUserEngagement('session_end', sessionDuration);
    };

    window.addEventListener('beforeunload', handleBeforeUnload);
    
    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
    };
  }, [location]);

  // Track user interactions
  useEffect(() => {
    const handleInteraction = () => {
      trackUserEngagement('interaction');
    };

    // Track clicks, keyboard presses, and touch events
    document.addEventListener('click', handleInteraction, { passive: true });
    document.addEventListener('keydown', handleInteraction, { passive: true });
    document.addEventListener('touchstart', handleInteraction, { passive: true });

    return () => {
      document.removeEventListener('click', handleInteraction);
      document.removeEventListener('keydown', handleInteraction);
      document.removeEventListener('touchstart', handleInteraction);
    };
  }, []);
};