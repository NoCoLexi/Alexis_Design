import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { ArrowDown, Award, Sparkles, Mail, Calendar, Play } from "lucide-react";
import { SiLinkedin } from "react-icons/si";
import NavMusicPlayer from "./nav-music-player";
import AdminPanel from "./admin-panel";

import { useAdminPanel } from "@/hooks/use-admin-panel";
import profileImage from "@assets/Alexis_Profile_3_Crop_1759970309304.png";
import profileVideo from "@/../../attached_assets/Alexis and the Brain (online-video-cutter.com)_1764024995337.mp4";

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
      return `Hey ${companyFromUrl} hiring team`;
    }
    return getGreeting() || "Hey, [company] hiring team";
  };

  const roles = [
    "AI Product Manager"
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
      const yOffset = -100; // Account for fixed nav menu height
      const y = videoElement.getBoundingClientRect().top + window.pageYOffset + yOffset;
      window.scrollTo({ top: y, behavior: 'smooth' });
    }
  };

  return (
    <section id="home" className="min-h-screen flex items-center relative overflow-hidden">
      <div className="absolute inset-0 gradient-bg-secondary opacity-30"></div>
      <div className="absolute inset-0 opacity-20">
        <div className="w-full h-full bg-gradient-to-br from-primary/20 via-transparent to-chart-1/20"></div>
      </div>



      {/* Desktop Layout (2 columns) */}
      <div className="hidden md:flex items-center px-6 py-20 relative space-x-8 text-center w-full z-10">
        <div style={{ flexGrow: 1 }}>
          <video
            src={profileVideo}
            className="mx-auto rounded-lg"
            style={{ width: '72%' }}
            autoPlay
            muted
            playsInline
            data-testid="video-professional-photo"
            onEnded={(e) => {
              const video = e.currentTarget;
              video.currentTime = 0;
              video.pause();
            }}
          />
        </div>

        <div className="max-w-4xl mx-auto relative" style={{
          flexGrow: 1
        }}>
          {/* Award Button - positioned above the heading */}
          <div className="mb-6 pb-4 flex justify-center">
            <div
              className="inline-flex items-center gap-2 rounded-full px-6 py-3 hover:glow-yellow transition-all duration-300 cursor-pointer transform hover:scale-105 shadow-lg border border-chart-3/20"
              style={{ background: 'rgba(255, 255, 255, 0.15)', backdropFilter: 'blur(20px)' }}
              onClick={onOpenAwardModal}
              data-testid="button-hero-tech-award"
            >
              <Award className="w-5 h-5" style={{ color: '#0081BC' }} />
              <span className="text-base font-medium" style={{ color: '#F3E8B9' }}>
                2023 California GovTech Award Winner
              </span>
            </div>
          </div>

          <h1 className="text-5xl md:text-7xl font-inter-black" style={{ fontFamily: 'Montserrat, sans-serif', fontWeight: 900, lineHeight: '1.1', paddingBottom: '0.25rem' }}>
            <span className={`disco-text ${isPlaying ? 'dancing' : ''}`} style={{ color: '#F3E8B9' }}>
              Hey hiring team
            </span>
          </h1>

          <p
            className="text-2xl md:text-3xl font-inter-medium text-muted-foreground mb-2 leading-relaxed max-w-3xl mx-auto text-center"
            style={{ fontFamily: 'Inter, sans-serif', fontWeight: 500 }}
          >
            I'm Alexis, your next
          </p>

          <p
            className={`text-2xl md:text-3xl font-inter-black text-foreground mb-2 cycling-role text-center ${isExiting ? 'exit' : ''}`}
            style={{ fontFamily: 'Montserrat, sans-serif', fontWeight: 300 }}
          >
            {roles[currentRoleIndex]}
          </p>

          <p
            className="text-xl md:text-2xl font-inter-medium text-muted-foreground mb-8 leading-relaxed max-w-3xl mx-auto text-center"
            style={{ fontFamily: 'Inter, sans-serif', fontWeight: 400 }}
          >
            Where Product + Design + Change Management meet
          </p>

          {/* Buttons Side by Side */}
          <div className="mb-6 pt-4 pb-8 flex justify-center gap-4 max-w-3xl mx-auto">
            <div className={`disco-button ${isPlaying ? 'playing' : ''} flex-1 max-w-sm transition-all duration-300 transform hover:scale-105`} style={{ boxShadow: '0 4px 12px rgba(255, 255, 255, 0.3)' }}>
              <NavMusicPlayer
                onPlayingChange={setIsPlaying}
                renderAs="button"
                buttonText='Play my "Hire Me" song'
              />
            </div>
            <button
              onClick={scrollToExpertise}
              className="flex-1 max-w-sm px-6 py-3 bg-transparent hover:bg-white/10 rounded-xl font-inter-bold transition-all duration-300 transform hover:scale-105 flex items-center justify-center gap-2 border-2 border-white"
              data-testid="button-watch-video-about-me"
              style={{ 
                fontFamily: 'Inter, sans-serif', 
                fontWeight: 700, 
                fontSize: '1.25rem',
                height: '56px',
                boxShadow: '0 4px 12px rgba(255, 255, 255, 0.3)'
              }}
            >
              <Play className="h-5 w-5 flex-shrink-0" />
              <span>How I drive product adoption</span>
            </button>
          </div>

          {/* Key Metrics */}
          <div className="grid grid-cols-3 gap-4 max-w-2xl mx-auto pt-6 relative">
            {/* Scroll indicator - desktop - positioned absolutely at metrics level */}
            <div
              className="hidden md:block absolute left-1/2 -translate-x-1/2 cursor-pointer hover:text-primary transition-colors"
              style={{ top: '0' }}
              onClick={scrollToWork}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => e.key === 'Enter' && scrollToWork()}
            >
              <ArrowDown className="w-6 h-6 text-muted-foreground hover:text-primary transition-colors animate-bounce" />
            </div>
            <div 
              className="text-center cursor-pointer transition-all duration-300 transform hover:scale-105"
              onClick={() => {
                const event = new CustomEvent('openCaseStudy', { detail: { projectId: 'caloes' } });
                window.dispatchEvent(event);
              }}
            >
              <div className="text-3xl md:text-4xl font-bold" style={{ color: '#F3E8B9' }}>545.5%</div>
              <div className="text-sm text-white/70">User Growth</div>
            </div>
            <div 
              className="text-center cursor-pointer transition-all duration-300 transform hover:scale-105"
              onClick={() => {
                const event = new CustomEvent('openCaseStudy', { detail: { projectId: 'pa-portal' } });
                window.dispatchEvent(event);
              }}
            >
              <div className="text-3xl md:text-4xl font-bold" style={{ color: '#F3E8B9' }}>$243M</div>
              <div className="text-sm text-white/70">Platform Value</div>
            </div>
            <div 
              className="text-center cursor-pointer transition-all duration-300 transform hover:scale-105"
              onClick={() => {
                const event = new CustomEvent('openCaseStudy', { detail: { projectId: 'pa-portal' } });
                window.dispatchEvent(event);
              }}
            >
              <div className="text-3xl md:text-4xl font-bold" style={{ color: '#F3E8B9' }}>75%</div>
              <div className="text-sm text-white/70">Ticket Reduction</div>
            </div>
          </div>

          {/* Message Me Button */}
          <div className="flex justify-center mt-8 max-w-3xl mx-auto">
            <button
              onClick={scrollToContact}
              className="w-full px-8 py-4 bg-gradient-to-r from-purple-600/80 to-blue-600/80 hover:from-purple-500/90 hover:to-blue-500/90 rounded-xl font-bold text-lg transition-all duration-300 transform hover:scale-105 flex items-center justify-center gap-3 border-2 border-white shadow-lg"
              style={{ fontFamily: 'Inter, sans-serif', color: '#F3E8B9' }}
            >
              MESSAGE ME
              <span className="text-2xl">→</span>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Layout (1 column) */}
      <div className="md:hidden flex flex-col items-center px-6 py-20 relative w-full z-10 text-center space-y-6">
        {/* 1. Award Winner button */}
        <div className="flex justify-center">
          <div
            className="inline-flex items-center gap-2 rounded-full px-6 py-3 hover:glow-yellow transition-all duration-300 cursor-pointer transform hover:scale-105 shadow-lg border border-chart-3/20"
            style={{ background: 'rgba(255, 255, 255, 0.15)', backdropFilter: 'blur(20px)' }}
            onClick={onOpenAwardModal}
            data-testid="button-hero-tech-award"
          >
            <Award className="w-5 h-5" style={{ color: '#0081BC' }} />
            <span className="text-sm font-medium" style={{ color: '#F3E8B9' }}>
              2023 California GovTech Award Winner
            </span>
          </div>
        </div>

        {/* 2. Headline */}
        <h1 className="text-4xl font-inter-black" style={{ fontFamily: 'Montserrat, sans-serif', fontWeight: 900, lineHeight: '1.1' }}>
          <span className={`disco-text ${isPlaying ? 'dancing' : ''}`} style={{ color: '#F3E8B9' }}>
            Hey hiring team
          </span>
        </h1>

        {/* 3. Subhead */}
        <p
          className="text-xl font-inter-medium text-muted-foreground leading-relaxed mt-0"
          style={{ fontFamily: 'Inter, sans-serif', fontWeight: 500 }}
        >
          I'm Alexis, your next
        </p>

        {/* 4. Roles */}
        <p
          className={`text-xl font-inter-black text-foreground cycling-role mt-0 pt-0 ${isExiting ? 'exit' : ''}`}
          style={{ fontFamily: 'Montserrat, sans-serif', fontWeight: 300 }}
        >
          {roles[currentRoleIndex]}
        </p>

        <p
          className="text-lg font-inter-medium text-muted-foreground leading-relaxed"
          style={{ fontFamily: 'Inter, sans-serif', fontWeight: 400 }}
        >
          Where Product + Design + Change Management meet
        </p>

        {/* 5. Buttons Side by Side */}
        <div className="flex flex-col gap-3 w-full max-w-sm mx-auto">
          <div className={`disco-button ${isPlaying ? 'playing' : ''} w-full transition-all duration-300 transform hover:scale-105`} style={{ boxShadow: '0 4px 12px rgba(255, 255, 255, 0.3)' }}>
            <NavMusicPlayer
              onPlayingChange={setIsPlaying}
              renderAs="button"
              buttonText='Play my "Hire Me" song'
            />
          </div>
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
            <span>How I drive product adoption</span>
          </button>
        </div>

        {/* 6. Portrait */}
        <div className="w-full max-w-sm mx-auto">
          <video
            src={profileVideo}
            className="mx-auto rounded-lg"
            style={{ width: '72%' }}
            autoPlay
            muted
            playsInline
            data-testid="video-professional-photo"
            onEnded={(e) => {
              const video = e.currentTarget;
              video.currentTime = 0;
              video.pause();
            }}
          />
        </div>

        {/* 8. Metrics */}
        <div className="grid grid-cols-3 gap-4 max-w-2xl mx-auto pt-4 relative">
          {/* Scroll indicator - mobile - positioned absolutely at metrics level */}
          <div
            className="md:hidden absolute left-1/2 -translate-x-1/2 animate-bounce cursor-pointer hover:text-primary transition-colors"
            style={{ top: '0' }}
            onClick={scrollToWork}
            role="button"
            tabIndex={0}
            onKeyDown={(e) => e.key === 'Enter' && scrollToWork()}
          >
            <ArrowDown className="w-8 h-8 text-muted-foreground hover:text-primary transition-colors" />
          </div>
          
          <div 
            className="text-center cursor-pointer transition-all duration-300 transform hover:scale-105"
            onClick={() => {
              const event = new CustomEvent('openCaseStudy', { detail: { projectId: 'caloes' } });
              window.dispatchEvent(event);
            }}
          >
            <div className="text-2xl font-bold" style={{ color: '#F3E8B9' }}>545.5%</div>
            <div className="text-xs text-white/70">User Growth</div>
          </div>
          <div 
            className="text-center cursor-pointer transition-all duration-300 transform hover:scale-105"
            onClick={() => {
              const event = new CustomEvent('openCaseStudy', { detail: { projectId: 'pa-portal' } });
              window.dispatchEvent(event);
            }}
          >
            <div className="text-2xl font-bold" style={{ color: '#F3E8B9' }}>$243M</div>
            <div className="text-xs text-white/70">Platform Value</div>
          </div>
          <div 
            className="text-center cursor-pointer transition-all duration-300 transform hover:scale-105"
            onClick={() => {
              const event = new CustomEvent('openCaseStudy', { detail: { projectId: 'pa-portal' } });
              window.dispatchEvent(event);
            }}
          >
            <div className="text-2xl font-bold" style={{ color: '#F3E8B9' }}>75%</div>
            <div className="text-xs text-white/70">Ticket Reduction</div>
          </div>
        </div>

        {/* Message Me Button */}
        <div className="flex justify-center mt-6 w-full max-w-sm mx-auto">
          <button
            onClick={scrollToContact}
            className="w-full px-6 py-3 bg-gradient-to-r from-purple-600/80 to-blue-600/80 hover:from-purple-500/90 hover:to-blue-500/90 rounded-xl font-bold transition-all duration-300 transform hover:scale-105 flex items-center justify-center gap-2 border-2 border-white shadow-lg"
            style={{ fontFamily: 'Inter, sans-serif', color: '#F3E8B9' }}
          >
            MESSAGE ME
            <span className="text-xl">→</span>
          </button>
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