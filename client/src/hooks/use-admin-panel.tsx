import { useState, useEffect } from 'react';

interface AdminSettings {
  companyName: string;
  jobType: 'PM' | 'Design' | 'Auto';
  jobUrl: string;
}

export const useAdminPanel = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [settings, setSettings] = useState<AdminSettings>({
    companyName: '',
    jobType: 'Auto',
    jobUrl: ''
  });

  // Load settings from localStorage on mount
  useEffect(() => {
    const saved = localStorage.getItem('alexis-portfolio-admin');
    if (saved) {
      try {
        const parsedSettings: AdminSettings = JSON.parse(saved);
        setSettings(parsedSettings);
      } catch (error) {
        console.warn('Could not parse admin settings:', error);
      }
    }
  }, []);

  // Keyboard shortcut listener
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      // Ctrl+Shift+Z to toggle admin panel
      if (event.ctrlKey && event.shiftKey && event.key === 'Z') {
        event.preventDefault();
        setIsVisible(prev => !prev);
      }
      
      // Escape to close admin panel
      if (event.key === 'Escape' && isVisible) {
        setIsVisible(false);
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [isVisible]);

  const applySettings = (newSettings: AdminSettings) => {
    setSettings(newSettings);
    localStorage.setItem('alexis-portfolio-admin', JSON.stringify(newSettings));
  };

  const closePanel = () => {
    setIsVisible(false);
  };

  // Get personalized greeting
  const getGreeting = () => {
    if (settings.companyName.trim()) {
      return `Hi ${settings.companyName}, I'm Alexis`;
    }
    return "Hi, I'm Alexis";
  };

  // Get case study focus based on job type
  const getCaseStudyFocus = (): 'PM' | 'Design' => {
    if (settings.jobType === 'Design') {
      return 'Design';
    }
    // Default to PM for both 'PM' and 'Auto'
    return 'PM';
  };

  return {
    isVisible,
    settings,
    getGreeting,
    getCaseStudyFocus,
    applySettings,
    closePanel
  };
};