import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Award, ArrowRight, Gamepad2 } from "lucide-react";
import AdminPanel from "./admin-panel";
import FloatingBackground from "./floating-background";

import { useAdminPanel } from "@/hooks/use-admin-panel";
import headshot from "@assets/headshot_bw_1774321770406.png";

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

  return (
    <section id="home" className="min-h-screen flex items-center relative overflow-hidden">
      <div className="absolute inset-0 gradient-bg-secondary opacity-30"></div>
      <div className="absolute inset-0 opacity-20">
        <div className="w-full h-full bg-gradient-to-br from-primary/20 via-transparent to-chart-1/20"></div>
      </div>
      <FloatingBackground />
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
              className="inline-flex items-center gap-2 rounded-full px-5 py-2 transition-all duration-300 cursor-pointer transform hover:scale-105"
              style={{ background: 'rgba(0,129,188,0.12)', border: '1.5px solid rgba(0,129,188,0.5)' }}
              onClick={onOpenAwardModal}
              data-testid="button-hero-tech-award"
            >
              <Award className="w-4 h-4" style={{ color: '#5fc5f8' }} />
              <span className="text-sm font-semibold" style={{ color: '#5fc5f8' }}>
                2023 California GovTech Award Winner
              </span>
              <ArrowRight className="w-3 h-3" style={{ color: '#5fc5f8', opacity: 0.6 }} />
            </div>
          </div>

          {/* Headline */}
          <h1 className="text-5xl lg:text-6xl font-inter-black leading-tight" style={{ fontFamily: 'Montserrat, sans-serif', fontWeight: 900, lineHeight: '1.08', wordSpacing: '0.08em' }}>
            <span className={`disco-text ${isPlaying ? 'dancing' : ''}`} style={{ color: '#F3E8B9' }}>
              {getCustomGreeting()}
            </span>
          </h1>

          {/* Subhead */}
          <p
            className="text-xl lg:text-2xl font-inter-medium text-muted-foreground leading-relaxed"
            style={{ fontFamily: 'Inter, sans-serif', fontWeight: 500 }}
          >I build products that get used, not just shipped.</p>

          {/* Primary CTA — Play the Game */}
          <div className="mt-3 md:mt-8">
            <a
              href="/stakeholder-invaders/"
              className="px-7 rounded-xl font-inter-bold transition-all duration-300 transform hover:scale-105 inline-flex items-center justify-center gap-3 border-2 border-white/85"
              data-testid="button-play-game-hero"
              style={{
                fontFamily: 'Inter, sans-serif',
                fontWeight: 800,
                fontSize: '1.05rem',
                height: '56px',
                background: 'linear-gradient(135deg, #6D5592, #0081BC)',
                color: '#ffffff',
                boxShadow: '0 6px 20px rgba(109,85,146,0.5)',
                letterSpacing: '0.01em'
              }}
            >
              <Gamepad2 className="h-5 w-5 flex-shrink-0" />
              <span>Play the Game</span>
              <ArrowRight className="h-4 w-4 flex-shrink-0" />
            </a>
          </div>

          {/* Key Metrics — each card has clear borders and a "View case study" affordance */}
          <div className="grid grid-cols-3 gap-3 py-2">
            {[
              { value: '545.5%', label: 'User Base Increase', projectId: 'caloes' },
              { value: '$2.1B', label: 'Disaster Relief Platform', projectId: 'pa-portal' },
              { value: '75%', label: 'Ticket Reduction', projectId: 'pa-portal' },
            ].map((m) => (
              <div
                key={m.value}
                className="cursor-pointer transition-all duration-300 transform hover:scale-105 rounded-xl px-4 py-3"
                style={{ background: 'rgba(255,255,255,0.05)', border: '1.5px solid rgba(255,255,255,0.12)' }}
                onClick={() => {
                  const event = new CustomEvent('openCaseStudy', { detail: { projectId: m.projectId } });
                  window.dispatchEvent(event);
                }}
              >
                <div className="text-3xl font-bold" style={{ color: '#F3E8B9' }}>{m.value}</div>
                <div className="text-xs text-white/50 mt-1">{m.label}</div>
                <div className="text-xs font-semibold mt-2" style={{ color: '#5fc5f8' }}>View case study →</div>
              </div>
            ))}
          </div>

          {/* Message Me — secondary action, ghost/outline style */}
          <div className="mt-4">
            <a
              href="mailto:alexis.brochu@gmail.com"
              className="rounded-xl font-bold transition-all duration-300 transform hover:scale-105 inline-flex items-center justify-center gap-2 border-2"
              style={{
                fontFamily: 'Inter, sans-serif',
                fontWeight: 700,
                fontSize: '1.05rem',
                color: 'rgba(255,255,255,0.85)',
                height: '50px',
                padding: '0 24px',
                background: 'transparent',
                borderColor: 'rgba(255,255,255,0.35)'
              }}
              data-testid="link-send-email"
            >
              MESSAGE ME
              <span className="text-xl" style={{ lineHeight: 1 }}>→</span>
            </a>
          </div>

        </div>
      </div>
      {/* Mobile Layout (1 column) */}
      <div className="md:hidden flex flex-col items-center px-6 py-20 relative w-full z-10 text-center space-y-6">
        {/* 1. Award Winner button */}
        <div className="flex justify-center">
          <div
            className="inline-flex items-center gap-2 rounded-full px-4 py-2 transition-all duration-300 cursor-pointer transform hover:scale-105"
            style={{ background: 'rgba(0,129,188,0.12)', border: '1.5px solid rgba(0,129,188,0.5)' }}
            onClick={onOpenAwardModal}
            data-testid="button-hero-tech-award"
          >
            <Award className="w-4 h-4" style={{ color: '#5fc5f8' }} />
            <span className="text-xs font-semibold" style={{ color: '#5fc5f8' }}>
              2023 California GovTech Award Winner
            </span>
            <ArrowRight className="w-3 h-3" style={{ color: '#5fc5f8', opacity: 0.6 }} />
          </div>
        </div>

        {/* 2. Headline */}
        <h1 className="text-2xl font-inter-black" style={{ fontFamily: 'Montserrat, sans-serif', fontWeight: 900, lineHeight: '1.1', wordSpacing: '0.08em' }}>
          <span className={`disco-text ${isPlaying ? 'dancing' : ''}`} style={{ color: '#F3E8B9' }}>
            {getCustomGreeting()}
          </span>
        </h1>

        {/* 3. Subhead */}
        <p
          className="text-base font-inter-medium text-muted-foreground leading-relaxed mt-0"
          style={{ fontFamily: 'Inter, sans-serif', fontWeight: 500 }}
        >
          I build products that get used, not just shipped.
        </p>


        {/* CTA — Play the Game */}
        <div className="w-full max-w-sm mx-auto">
          <a
            href="/stakeholder-invaders/"
            className="w-full px-4 rounded-xl font-bold transition-all duration-300 transform hover:scale-105 flex items-center justify-center gap-2 border-2 border-white/85 text-sm"
            data-testid="button-play-game-hero-mobile"
            style={{
              fontFamily: 'Inter, sans-serif',
              fontWeight: 800,
              height: '56px',
              background: 'linear-gradient(135deg, #6D5592, #0081BC)',
              color: '#ffffff',
              boxShadow: '0 6px 20px rgba(109,85,146,0.5)'
            }}
          >
            <Gamepad2 className="h-5 w-5 flex-shrink-0" />
            <span>Play the Game</span>
            <ArrowRight className="h-4 w-4 flex-shrink-0" />
          </a>
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
        <div className="grid grid-cols-3 gap-2 w-full max-w-2xl mx-auto">
          {[
            { value: '545.5%', label: 'User Base Increase', projectId: 'caloes' },
            { value: '$2.1B', label: 'Disaster Relief Platform', projectId: 'pa-portal' },
            { value: '75%', label: 'Ticket Reduction', projectId: 'pa-portal' },
          ].map((m) => (
            <div
              key={m.value}
              className="text-center cursor-pointer transition-all duration-300 transform hover:scale-105 rounded-xl px-2 py-3"
              style={{ background: 'rgba(255,255,255,0.05)', border: '1.5px solid rgba(255,255,255,0.12)' }}
              onClick={() => {
                const event = new CustomEvent('openCaseStudy', { detail: { projectId: m.projectId } });
                window.dispatchEvent(event);
              }}
            >
              <div className="text-xl font-bold" style={{ color: '#F3E8B9' }}>{m.value}</div>
              <div className="text-xs text-white/50 mt-1" style={{ fontSize: '10px' }}>{m.label}</div>
              <div className="font-semibold mt-2" style={{ color: '#5fc5f8', fontSize: '10px' }}>View →</div>
            </div>
          ))}
        </div>

        {/* Message Me Button */}
        <div className="flex justify-center w-full max-w-sm mx-auto">
          <a
            href="mailto:alexis.brochu@gmail.com"
            className="w-full px-6 rounded-xl font-bold transition-all duration-300 transform hover:scale-105 flex items-center justify-center gap-2 border-2"
            style={{
              fontFamily: 'Inter, sans-serif',
              color: 'rgba(255,255,255,0.85)',
              height: '50px',
              background: 'transparent',
              borderColor: 'rgba(255,255,255,0.35)'
            }}
            data-testid="link-send-email-mobile"
          >
            MESSAGE ME
            <span className="text-xl" style={{ lineHeight: 1 }}>→</span>
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