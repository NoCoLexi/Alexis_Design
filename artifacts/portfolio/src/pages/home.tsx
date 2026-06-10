import HeroSection from "@/components/hero-section";
import FeaturedWork from "@/components/featured-work";
import AboutSection from "@/components/about-section";
import ContactSection from "@/components/contact-section";
import logoMarkImg from "@assets/logo-mark-inverse-512_1780019104514.png";
import CaseStudyModal from "@/components/case-study-modal";
import AwardModal from "@/components/award-modal";
import SiteModal from "@/components/site-modal";
import NavMusicPlayer from "@/components/nav-music-player";
import AdminPanel from "@/components/admin-panel";
import { useState, useEffect } from "react";
import { Link } from "wouter";
import { Menu, X, Award, Code, ExternalLink, Home as HomeIcon, Settings, Gamepad2 } from "lucide-react";

export default function Home() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const [isMusicPlaying, setIsMusicPlaying] = useState(false);
  const [isAwardModalOpen, setIsAwardModalOpen] = useState(false);
  const [isSiteModalOpen, setIsSiteModalOpen] = useState(false);
  const [isAdminPanelOpen, setIsAdminPanelOpen] = useState(false);
  const [showNavLogo, setShowNavLogo] = useState(false);

  // Check for admin URL parameter
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    if (params.get('admin') === 'true' || window.location.pathname === '/admin') {
      setIsAdminPanelOpen(true);
    }
  }, []);

  // Hide nav logo while hero is visible; fade it in once hero scrolls away
  useEffect(() => {
    const hero = document.getElementById('home');
    if (!hero) return;
    const observer = new IntersectionObserver(
      ([entry]) => setShowNavLogo(!entry.isIntersecting),
      { threshold: 0.20 }
    );
    observer.observe(hero);
    return () => observer.disconnect();
  }, []);





  useEffect(() => {
    const handleScroll = () => {
      const sections = ['home', 'work', 'about', 'contact'];
      const currentSection = sections.find(section => {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          return rect.top <= 100 && rect.bottom >= 100;
        }
        return false;
      });
      if (currentSection) {
        setActiveSection(currentSection);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setIsMobileMenuOpen(false);
  };

  return (
    <div className="min-h-screen bg-background text-foreground" style={{backgroundColor: '#08080A'}}>
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 w-full z-50 backdrop-blur-lg border-b border-primary/30 shadow-lg" style={{ backgroundColor: 'rgba(5,5,8,0.92)' }}>
        {/* AIxUX Summit announcement ticker — visible through June 10, 2026 (summit day); hides June 11 onward */}
        {new Date() < new Date('2026-06-11T00:00:00') && (
          <div
            className="w-full overflow-hidden cursor-pointer group border-b"
            style={{
              background: 'linear-gradient(90deg, rgba(95,197,248,0.06) 0%, rgba(95,197,248,0.10) 50%, rgba(95,197,248,0.06) 100%)',
              borderColor: 'rgba(95,197,248,0.35)'
            }}
            onClick={() => {
              const event = new CustomEvent('openCaseStudy', { detail: { projectId: 'aixux-summit-keynote' } });
              window.dispatchEvent(event);
            }}
            data-testid="ticker-aixux-summit"
            aria-label="Open AIxUX Summit case study"
          >
            <div className="flex whitespace-nowrap py-1.5 group-hover:[animation-play-state:paused]" style={{ animation: 'ticker-scroll 30s linear infinite' }}>
              {[0, 1].map((dup) => (
                <div key={dup} className="flex items-center shrink-0" aria-hidden={dup === 1 ? 'true' : undefined}>
                  {Array.from({ length: 4 }).map((_, i) => (
                    <span key={i} className="inline-flex items-center text-xs md:text-sm font-light tracking-wide" style={{ color: '#5fc5f8' }}>
                      <span className="mx-3">🎙 SPEAKING AT AIxUX SUMMIT</span>
                      <span className="opacity-70">·</span>
                      <span className="mx-3">JUNE 10, 2026</span>
                      <span className="opacity-70">·</span>
                      <span className="mx-3 font-light">DESIGN YOUR AI NETWORKING AGENT</span>
                      <span className="opacity-70">·</span>
                      <span className="mx-3 font-light underline underline-offset-2">VIEW CASE STUDY →</span>
                      <span className="opacity-40 mx-2">●</span>
                    </span>
                  ))}
                </div>
              ))}
            </div>
          </div>
        )}
        <div className="max-w-7xl mx-auto px-6 py-2">
          <div className="flex justify-between items-center">
            <div 
              className={`logo-style flex items-center cursor-pointer transition-all duration-500 ${showNavLogo ? 'opacity-100 hover:opacity-80' : 'opacity-0 pointer-events-none'}`}
              onClick={() => {
                const homeElement = document.getElementById('home');
                if (homeElement) {
                  homeElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
                }
              }}
            >
              <img src={logoMarkImg} alt="Upstart-Labs" className="w-7 h-7 mr-2" style={{ objectFit: 'contain' }} />
              <span className="name-first font-bold text-xl text-[color:var(--color-lemon-yellow)]">UPSTART</span>
              <span className="name-last text-purple-400 font-bold text-xl">-Labs</span>
            </div>
            <div className="hidden md:flex space-x-2 items-center">
              <button
                onClick={() => scrollToSection('about')}
                className="nav-link inline-flex items-center px-4 py-2 rounded-full transition-all duration-300 cursor-pointer"
                data-testid="button-my-expertise"
              >
                <span className="text-sm font-medium text-white">About Us</span>
              </button>
              <a
                href="mailto:alexis@upstart-labs.com"
                className="nav-link inline-flex items-center px-4 py-2 rounded-full transition-all duration-300 cursor-pointer"
                data-testid="link-nav-send-email"
              >
                <span className="text-sm font-medium text-white">Message Us</span>
              </a>
              <button
                onClick={() => scrollToSection('work')}
                className="nav-link-primary inline-flex items-center px-4 py-2 rounded-full transition-all duration-300 cursor-pointer"
                data-testid="button-check-out-work"
              >
                <span className="text-sm font-medium text-white">Check out our work!</span>
              </button>
            </div>
            <button
              className="md:hidden text-white hover:text-purple-400 p-2 rounded-md hover:bg-white/5 transition-colors"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

          {/* Mobile Menu */}
          {isMobileMenuOpen && (
            <div className="md:hidden mt-4 pb-4 space-y-1 bg-black/60 rounded-lg p-3 border border-white/10">
              <button
                onClick={() => {
                  scrollToSection('about');
                  setIsMobileMenuOpen(false);
                }}
                className="nav-link inline-flex items-center justify-center w-full px-4 py-3 rounded-full transition-all duration-300 cursor-pointer"
                data-testid="button-my-expertise-mobile"
              >
                <span className="text-sm font-medium text-white">
                  About Us
                </span>
              </button>
              <a
                href="mailto:alexis@upstart-labs.com"
                className="nav-link inline-flex items-center justify-center w-full px-4 py-3 rounded-full transition-all duration-300 cursor-pointer"
                data-testid="link-nav-send-email-mobile"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                <span className="text-sm font-medium text-white">Message Us</span>
              </a>
              <button
                onClick={() => {
                  scrollToSection('work');
                  setIsMobileMenuOpen(false);
                }}
                className="nav-link-primary inline-flex items-center justify-center w-full px-4 py-3 rounded-full transition-all duration-300 cursor-pointer"
                data-testid="button-check-out-work-mobile"
              >
                <span className="text-sm font-medium text-white">
                  Check out our work
                </span>
              </button>
            </div>
          )}
        </div>
      </nav>
      {/* Page Sections */}
      <HeroSection
        onOpenAwardModal={() => setIsAwardModalOpen(true)}
        onOpenSiteModal={() => setIsSiteModalOpen(true)}
      />
      <FeaturedWork />
      <AboutSection onOpenAwardModal={() => setIsAwardModalOpen(true)} />
      <ContactSection onOpenAwardModal={() => setIsAwardModalOpen(true)} />
      <CaseStudyModal />
      <AwardModal 
        isOpen={isAwardModalOpen} 
        onClose={() => setIsAwardModalOpen(false)} 
      />
      <SiteModal 
        isOpen={isSiteModalOpen} 
        onClose={() => setIsSiteModalOpen(false)} 
      />
      <AdminPanel 
        isVisible={isAdminPanelOpen}
        onClose={() => setIsAdminPanelOpen(false)}
        onApply={(settings) => {
          console.log('Applied settings:', settings);
          setIsAdminPanelOpen(false);
        }}
      />
      {/* Footer */}
      <footer className="py-12 border-t border-primary/20">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col items-center gap-6">
            <a
              href="/stakeholder-invaders/"
              className="group inline-flex items-center gap-3 rounded-full border border-purple-400/30 bg-gradient-to-r from-purple-600/40 to-purple-500/50 px-5 py-3 hover:from-purple-500/60 hover:to-purple-400/70 transition-all duration-300 transform hover:scale-105 hover:brightness-110"
              data-testid="link-play-game-footer"
            >
              <Gamepad2 className="w-5 h-5" style={{ color: '#F3E8B9' }} />
              <span className="text-sm font-medium tracking-wide" style={{ color: '#F3E8B9' }}>
                Insert Coin · Play Stakeholder Invaders
              </span>
            </a>
            <div className="text-muted-foreground">
              © {new Date().getFullYear()} Upstart-Labs
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}