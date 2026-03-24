import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { ArrowDown, Award, Sparkles, Mail, Calendar, Play } from "lucide-react";
import { SiLinkedin } from "react-icons/si";
import AdminPanel from "./admin-panel";

import { useAdminPanel } from "@/hooks/use-admin-panel";
import headshot from "@assets/headshot_pollack_1774311837148.png";

import goldenTrophyIcon from "@assets/golden-star-trophy.png";

interface HeroSectionProps {
  onOpenAwardModal?: () => void;
}

export default function HeroSection({ onOpenAwardModal }: HeroSectionProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentRoleIndex, setCurrentRoleIndex] = useState(0);
  const [isExiting, setIsExiting] = useState(false);

  // Admin panel integration
  const { isVisible, settings, getGreeting, getCaseStudyFocus, applySettings, closePanel } = useAdminPanel();

  // Get greeting from URL parameters or admin panel
  const getCustomGreeting = () => {
    const urlParams = new URLSearchParams(window.location.search);
    const companyFromUrl = urlParams.get('company');

    if (companyFromUrl) {
      return `Hi ${companyFromUrl}, I'm Alexis`;
    }
    return getGreeting();
  };

  const roles = [
    "AI  Product  Manager"
  ];

  useEffect(() => {
    // Listen for music playing state changes
    const handleMusicStateChange = (event: CustomEvent) => {
      setIsPlaying(event.detail.isPlaying);
    };

    window.addEventListener('musicStateChange', handleMusicStateChange as EventListener);

    return () => {
      window.removeEventListener('musicStateChange', handleMusicStateChange as EventListener);
    };
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setIsExiting(true);

      setTimeout(() => {
        setCurrentRoleIndex((prevIndex) => (prevIndex + 1) % roles.length);
        setIsExiting(false);
      }, 250);
    }, 2000);

    return () => clearInterval(interval);
  }, [roles.length]);

  const scrollToWork = () => {
    console.log('Down arrow clicked - attempting to scroll to work section');
    const element = document.getElementById('work');
    console.log('Found work element:', element);
    if (element) {
      console.log('Scrolling to work section...');
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    } else {
      console.log('Work element not found!');
    }
  };

  const scrollToContact = () => {
    const element = document.getElementById('contact');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const scrollToExpertise = () => {
    const videoElement = document.querySelector('[data-testid="video-expertise-product-leader"]');
    if (videoElement) {
      const y = videoElement.getBoundingClientRect().top + window.pageYOffset - 100;
      window.scrollTo({ top: y, behavior: 'smooth' });
    }
  };

  return (
    <section id="home" className="min-h-screen flex items-center relative overflow-hidden">
      <div className="absolute inset-0 gradient-bg-secondary opacity-30"></div>
      <div className="absolute inset-0 opacity-20">
        <div className="w-full h-full bg-gradient-to-br from-primary/20 via-transparent to-chart-1/20"></div>
      </div>
      {/* Desktop Layout — two-column: photo left, content right */}
      <div className="hidden md:grid grid-cols-[38%_1fr] items-stretch w-full relative z-10" style={{ minHeight: '100vh' }}>

        {/* Left column: photo fills full height */}
        <div className="relative overflow-hidden">
          <img
            src={headshot}
            alt="Alexis Brochu"
            className="w-full h-full object-cover object-top"
            data-testid="video-professional-photo"
          />
          {/* Subtle gradient fade on right edge to blend into content */}
          <div className="absolute inset-y-0 right-0 w-16 bg-gradient-to-r from-transparent to-background/60 pointer-events-none" />
        </div>

        {/* Right column: all content, left-aligned, vertically centered */}
        <div className="flex flex-col justify-center px-12 py-8 gap-4">

          {/* Award badge */}
          <div>
            <div
              className="inline-flex items-center gap-2 rounded-full px-5 py-2 hover:glow-yellow transition-all duration-300 cursor-pointer transform hover:scale-105 shadow-lg border border-chart-3/20"
              style={{ background: 'rgba(255, 255, 255, 0.15)', backdropFilter: 'blur(20px)' }}
              onClick={onOpenAwardModal}
              data-testid="button-hero-tech-award"
            >
              <Award className="w-4 h-4" style={{ color: '#0081BC' }} />
              <span className="text-sm font-medium" style={{ color: '#F3E8B9' }}>
                2023 California GovTech Award Winner
              </span>
            </div>
          </div>

          {/* Headline */}
          <h1 className="text-5xl lg:text-6xl font-inter-black leading-tight" style={{ fontFamily: 'Montserrat, sans-serif', fontWeight: 900, lineHeight: '1.08' }}>
            <span className={`disco-text ${isPlaying ? 'dancing' : ''}`} style={{ color: '#F3E8B9' }}>
              {getCustomGreeting()}
            </span>
          </h1>

          {/* Subhead */}
          <p
            className="text-xl lg:text-2xl font-inter-medium text-muted-foreground leading-relaxed"
            style={{ fontFamily: 'Inter, sans-serif', fontWeight: 500 }}
          >I design products that get used, not just shipped</p>

          {/* CTA button */}
          <div className="mt-3">
            <button
              onClick={scrollToExpertise}
              className="w-full px-6 bg-transparent hover:bg-white/10 rounded-xl font-inter-bold transition-all duration-300 transform hover:scale-105 flex items-center justify-center gap-2 border-2 border-white"
              data-testid="button-watch-video-about-me"
              style={{
                fontFamily: 'Inter, sans-serif',
                fontWeight: 700,
                fontSize: '1.05rem',
                boxShadow: '0 4px 12px rgba(255, 255, 255, 0.3)',
                height: '52px'
              }}
            >
              <Play className="h-4 w-4 flex-shrink-0" />
              <span>How I Drive Product Adoption</span>
            </button>
          </div>

          {/* Key Metrics */}
          <div className="grid grid-cols-3 gap-6 py-2 border-t border-b border-white/10">
            <div
              className="cursor-pointer transition-all duration-300 transform hover:scale-105"
              onClick={() => {
                const event = new CustomEvent('openCaseStudy', { detail: { projectId: 'caloes' } });
                window.dispatchEvent(event);
              }}
            >
              <div className="text-3xl font-bold" style={{ color: '#F3E8B9' }}>545.5%</div>
              <div className="text-xs text-white/60 mt-1">User Base Increase</div>
            </div>
            <div
              className="cursor-pointer transition-all duration-300 transform hover:scale-105"
              onClick={() => {
                const event = new CustomEvent('openCaseStudy', { detail: { projectId: 'pa-portal' } });
                window.dispatchEvent(event);
              }}
            >
              <div className="text-3xl font-bold" style={{ color: '#F3E8B9' }}>$2.1B</div>
              <div className="text-xs text-white/60 mt-1">Disaster Relief Platform</div>
            </div>
            <div
              className="cursor-pointer transition-all duration-300 transform hover:scale-105"
              onClick={() => {
                const event = new CustomEvent('openCaseStudy', { detail: { projectId: 'pa-portal' } });
                window.dispatchEvent(event);
              }}
            >
              <div className="text-3xl font-bold" style={{ color: '#F3E8B9' }}>75%</div>
              <div className="text-xs text-white/60 mt-1">Support Ticket Reduction</div>
            </div>
          </div>

          {/* Message Me */}
          <div className="mt-8">
            <a
              href="mailto:alexis.brochu@gmail.com"
              className="w-full px-8 py-4 bg-gradient-to-r from-purple-600/80 to-blue-600/80 hover:from-purple-500/90 hover:to-blue-500/90 rounded-xl font-bold text-lg transition-all duration-300 transform hover:scale-105 flex items-center justify-center gap-3 border-2 border-white shadow-lg"
              style={{ fontFamily: 'Inter, sans-serif', color: '#F3E8B9' }}
              data-testid="link-send-email"
            >
              MESSAGE ME
              <span className="text-2xl">→</span>
            </a>
          </div>

        </div>
      </div>
      {/* Mobile Layout (1 column) */}
      <div className="md:hidden flex flex-col items-center px-6 py-20 relative w-full z-10 text-center space-y-6">
        {/* 1. Award Winner button */}
        <div className="flex justify-center">
          <div
            className="inline-flex items-center gap-2 rounded-full px-4 py-2 hover:glow-yellow transition-all duration-300 cursor-pointer transform hover:scale-105 shadow-lg border border-chart-3/20"
            style={{ background: 'rgba(255, 255, 255, 0.15)', backdropFilter: 'blur(20px)' }}
            onClick={onOpenAwardModal}
            data-testid="button-hero-tech-award"
          >
            <Award className="w-4 h-4" style={{ color: '#0081BC' }} />
            <span className="text-xs font-medium" style={{ color: '#F3E8B9' }}>
              2023 California GovTech Award Winner
            </span>
          </div>
        </div>

        {/* 2. Headline */}
        <h1 className="text-2xl font-inter-black" style={{ fontFamily: 'Montserrat, sans-serif', fontWeight: 900, lineHeight: '1.1' }}>
          <span className={`disco-text ${isPlaying ? 'dancing' : ''}`} style={{ color: '#F3E8B9' }}>
            {getCustomGreeting()}
          </span>
        </h1>

        {/* 3. Subhead */}
        <p
          className="text-base font-inter-medium text-muted-foreground leading-relaxed mt-0"
          style={{ fontFamily: 'Inter, sans-serif', fontWeight: 500 }}
        >
          I design products that get used, not just shipped
        </p>


        {/* CTA */}
        <div className="w-full max-w-sm mx-auto">
          <button
            onClick={scrollToExpertise}
            className="w-full px-4 py-3 bg-transparent hover:bg-white/10 rounded-xl font-bold transition-all duration-300 transform hover:scale-105 flex items-center justify-center gap-2 border-2 border-white text-sm"
            data-testid="button-watch-video-about-me"
            style={{
              fontFamily: 'Inter, sans-serif',
              fontWeight: 700,
              height: '56px',
              boxShadow: '0 4px 12px rgba(255, 255, 255, 0.3)'
            }}
          >
            <Play className="h-5 w-5 flex-shrink-0" />
            <span>How I Drive Product Adoption</span>
          </button>
        </div>

        {/* 6. Portrait */}
        <div className="w-full max-w-xs mx-auto">
          <img
            src={headshot}
            alt="Alexis Brochu"
            className="mx-auto rounded-lg"
            style={{ width: '60%', objectFit: 'cover', objectPosition: 'top' }}
            data-testid="video-professional-photo"
          />
        </div>

        {/* 8. Metrics */}
        <div className="grid grid-cols-3 gap-4 max-w-2xl mx-auto pt-4 relative">
          <div 
            className="text-center cursor-pointer transition-all duration-300 transform hover:scale-105"
            onClick={() => {
              const event = new CustomEvent('openCaseStudy', { detail: { projectId: 'caloes' } });
              window.dispatchEvent(event);
            }}
          >
            <div className="text-2xl font-bold" style={{ color: '#F3E8B9' }}>545.5%</div>
            <div className="text-xs text-white/70">User Base Increase</div>
          </div>
          <div 
            className="text-center cursor-pointer transition-all duration-300 transform hover:scale-105"
            onClick={() => {
              const event = new CustomEvent('openCaseStudy', { detail: { projectId: 'pa-portal' } });
              window.dispatchEvent(event);
            }}
          >
            <div className="text-2xl font-bold" style={{ color: '#F3E8B9' }}>$2.1B</div>
            <div className="text-xs text-white/70">Disaster Relief Platform</div>
          </div>
          <div 
            className="text-center cursor-pointer transition-all duration-300 transform hover:scale-105"
            onClick={() => {
              const event = new CustomEvent('openCaseStudy', { detail: { projectId: 'pa-portal' } });
              window.dispatchEvent(event);
            }}
          >
            <div className="text-2xl font-bold" style={{ color: '#F3E8B9' }}>75%</div>
            <div className="text-xs text-white/70">Support Ticket Reduction</div>
          </div>
        </div>

        {/* Message Me Button */}
        <div className="flex justify-center mt-6 w-full max-w-sm mx-auto">
          <a
            href="mailto:alexis.brochu@gmail.com"
            className="w-full px-6 py-3 bg-gradient-to-r from-purple-600/80 to-blue-600/80 hover:from-purple-500/90 hover:to-blue-500/90 rounded-xl font-bold transition-all duration-300 transform hover:scale-105 flex items-center justify-center gap-2 border-2 border-white shadow-lg"
            style={{ fontFamily: 'Inter, sans-serif', color: '#F3E8B9' }}
            data-testid="link-send-email-mobile"
          >
            MESSAGE ME
            <span className="text-xl">→</span>
          </a>
        </div>
      </div>
      {/* Hidden Admin Panel */}
      <AdminPanel
        isVisible={isVisible}
        onClose={closePanel}
        onApply={applySettings}
      />
    </section>
  );
}