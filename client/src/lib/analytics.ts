// Define the gtag function globally
declare global {
  interface Window {
    dataLayer: any[];
    gtag: (...args: any[]) => void;
  }
}

// Personalization parameters that must not be forwarded to third-party analytics
const PRIVATE_PARAMS = ['company', 'focus', 'vertical'];

// Returns a sanitized full URL with personalization query parameters removed
const sanitizeUrl = (url: string): string => {
  try {
    const parsed = new URL(url, window.location.origin);
    PRIVATE_PARAMS.forEach((param) => parsed.searchParams.delete(param));
    return parsed.toString();
  } catch {
    return url;
  }
};

// Returns just the path+search+hash with personalization parameters removed
const sanitizePath = (url: string): string => {
  try {
    const parsed = new URL(url, window.location.origin);
    PRIVATE_PARAMS.forEach((param) => parsed.searchParams.delete(param));
    return parsed.pathname + parsed.search + parsed.hash;
  } catch {
    return url;
  }
};

// Initialize Google Analytics
export const initGA = () => {
  const measurementId = import.meta.env.VITE_GA_MEASUREMENT_ID;

  if (!measurementId) {
    console.warn('Missing required Google Analytics key: VITE_GA_MEASUREMENT_ID');
    return;
  }

  // Add Google Analytics script to the head
  const script1 = document.createElement('script');
  script1.async = true;
  script1.src = `https://www.googletagmanager.com/gtag/js?id=${measurementId}`;
  document.head.appendChild(script1);

  const sanitizedLocation = sanitizeUrl(window.location.href);
  const sanitizedPath = sanitizePath(window.location.href);

  // Initialize gtag — disable automatic page view so we can send a sanitized one
  // that strips personalization query parameters from page_location and page_path
  const script2 = document.createElement('script');
  script2.textContent = `
    window.dataLayer = window.dataLayer || [];
    function gtag(){dataLayer.push(arguments);}
    gtag('js', new Date());
    gtag('config', '${measurementId}', {
      cookie_flags: 'SameSite=None;Secure',
      send_page_view: false
    });
    gtag('event', 'page_view', {
      page_location: ${JSON.stringify(sanitizedLocation)},
      page_path: ${JSON.stringify(sanitizedPath)}
    });
  `;
  document.head.appendChild(script2);
};

// Track page views - useful for single-page applications
export const trackPageView = (url: string) => {
  if (typeof window === 'undefined' || !window.gtag) return;

  const measurementId = import.meta.env.VITE_GA_MEASUREMENT_ID;
  if (!measurementId) return;

  const sanitizedLocation = sanitizeUrl(url);
  const sanitizedPath = sanitizePath(url);

  window.gtag('event', 'page_view', {
    page_location: sanitizedLocation,
    page_path: sanitizedPath
  });
};

// Track events
export const trackEvent = (
  action: string,
  category?: string,
  label?: string,
  value?: number
) => {
  if (typeof window === 'undefined' || !window.gtag) return;

  window.gtag('event', action, {
    event_category: category,
    event_label: label,
    value: value,
  });
};

// Synthesizer-specific event tracking
export const trackSynthesizerEvent = (eventType: 'key_press' | 'effect_toggle' | 'preset_change' | 'audio_start' | 'audio_stop', details?: Record<string, any>) => {
  trackEvent(eventType, 'synthesizer', JSON.stringify(details));
};

// Portfolio navigation tracking
export const trackPortfolioClick = (destination: string) => {
  trackEvent('portfolio_click', 'navigation', destination);
};

// User engagement tracking
export const trackUserEngagement = (action: 'session_start' | 'session_end' | 'interaction', duration?: number) => {
  trackEvent(action, 'engagement', undefined, duration);
};

// Device and performance tracking
export const trackDeviceInfo = () => {
  const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
  trackEvent('device_type', 'technical', isMobile ? 'mobile' : 'desktop');

  // Track screen size for responsive design insights
  trackEvent('screen_size', 'technical', `${window.screen.width}x${window.screen.height}`);
};
