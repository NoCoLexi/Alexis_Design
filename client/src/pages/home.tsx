import HeroSection from "@/components/hero-section";
import FeaturedWork from "@/components/featured-work";
import AboutSection from "@/components/about-section";
import ContactSection from "@/components/contact-section";
import logoImage from "@assets/image_1754581825249.png";
import CaseStudyModal from "@/components/case-study-modal";
import AwardModal from "@/components/award-modal";
import SiteModal from "@/components/site-modal";
import NavMusicPlayer from "@/components/nav-music-player";
import AdminPanel from "@/components/admin-panel";
import { useState, useEffect } from "react";
import { Link } from "wouter";
import { Menu, X, Award, Code, ExternalLink, Home as HomeIcon, Settings, Mic } from "lucide-react";

export default function Home() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const [isMusicPlaying, setIsMusicPlaying] = useState(false);
  const [isAwardModalOpen, setIsAwardModalOpen] = useState(false);
  const [isSiteModalOpen, setIsSiteModalOpen] = useState(false);
  const [isAdminPanelOpen, setIsAdminPanelOpen] = useState(false);

  // Check for admin URL parameter
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    if (params.get('admin') === 'true' || window.location.pathname === '/admin') {
      setIsAdminPanelOpen(true);
    }
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
      <nav className="fixed top-0 left-0 right-0 w-full z-50 bg-gradient-to-r from-background/95 via-primary/20 to-background/95 backdrop-blur-lg border-b border-primary/30 shadow-lg">
        <div className="max-w-7xl mx-auto px-6 py-2">
          <div className="flex justify-between items-center">
            <div 
              className="logo-style flex items-center cursor-pointer hover:opacity-80 transition-opacity duration-200"
              onClick={() => {
                const homeElement = document.getElementById('home');
                if (homeElement) {
                  homeElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
                }
              }}
            >
              <HomeIcon className="w-4 h-4 mr-2" style={{ color: '#F3E8B9' }} />
              <span className="name-first text-white font-bold text-xl">Alexis</span>
              <span className="name-last text-purple-400 font-bold text-xl">Brochu</span>
            </div>
            <div className="hidden md:flex space-x-8 items-center">
              <button
                onClick={() => setIsSiteModalOpen(true)}
                className={`transition-colors font-medium px-3 py-2 rounded-md text-white hover:text-purple-400 hover:bg-white/5`}
                style={{fontSize: '14px', fontWeight: '500'}}
                data-testid="button-about-site"
              >
                How I built this site
              </button>
              <button
                onClick={() => scrollToSection('about')}
                className={`transition-colors font-medium px-3 py-2 rounded-md ${
                  activeSection === 'about' 
                    ? 'text-purple-400 bg-purple-400/10' 
                    : 'text-white hover:text-purple-400 hover:bg-white/5'
                }`}
                style={{fontSize: '14px', fontWeight: '500'}}
              >
                My Expertise
              </button>
              <Link
                href="/services"
                className="transition-colors font-medium px-3 py-2 rounded-md text-white hover:text-purple-400 hover:bg-white/5"
                style={{fontSize: '14px', fontWeight: '500'}}
                data-testid="link-services"
              >
                Speaking Engagements
              </Link>
              <div className="ml-4 flex items-center gap-3">
                <div 
                  className="inline-flex items-center gap-2 bg-gradient-to-r from-purple-600/60 to-purple-500/70 rounded-full px-4 py-2 hover:from-purple-500/70 hover:to-purple-400/80 transition-all duration-300 cursor-pointer border border-purple-400/30 transform hover:scale-105 hover:brightness-110"
                  onClick={() => scrollToSection('work')}
                  data-testid="button-check-out-work"
                >
                  <span className="text-sm font-medium" style={{ color: '#F3E8B9' }}>
                    Check out my work
                  </span>
                </div>
              </div>
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
            <div className="md:hidden mt-4 pb-4 space-y-2 bg-black/50 rounded-lg p-4 border border-purple-400/20">
              <button
                onClick={() => {
                  setIsSiteModalOpen(true);
                  setIsMobileMenuOpen(false);
                }}
                className="block w-full text-left py-3 px-4 text-white hover:text-purple-400 hover:bg-white/5 transition-colors rounded-md font-medium"
                data-testid="button-about-site-mobile"
              >
                How I built this site
              </button>
              <button
                onClick={() => scrollToSection('about')}
                className="block w-full text-left py-3 px-4 text-white hover:text-purple-400 hover:bg-white/5 transition-colors rounded-md font-medium"
              >
                My Expertise
              </button>
              <Link
                href="/services"
                className="block w-full py-3 px-4 text-white hover:text-purple-400 hover:bg-white/5 transition-colors rounded-md font-medium"
                onClick={() => setIsMobileMenuOpen(false)}
                data-testid="link-services-mobile"
              >
                Speaking Engagements
              </Link>
              <div className="pt-2 border-t border-purple-400/20 space-y-2">
                <div 
                  className="inline-flex items-center gap-2 bg-gradient-to-r from-purple-600/60 to-purple-500/70 rounded-full px-4 py-2 hover:from-purple-500/70 hover:to-purple-400/80 transition-all duration-300 cursor-pointer w-full justify-center transform hover:scale-105 hover:brightness-110"
                  onClick={() => {
                    scrollToSection('work');
                    setIsMobileMenuOpen(false);
                  }}
                  data-testid="button-check-out-work-mobile"
                >
                  <span className="text-sm font-medium" style={{ color: '#F3E8B9' }}>
                    Check out my work
                  </span>
                </div>
              </div>
            </div>
          )}
        </div>
      </nav>
      {/* Page Sections */}
      <HeroSection onOpenAwardModal={() => setIsAwardModalOpen(true)} />
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
          <div className="text-center">
            <div className="text-muted-foreground">
              © 2025 Alexis Design
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}