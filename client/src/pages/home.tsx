import HeroSection from "@/components/hero-section";
import FeaturedWork from "@/components/featured-work";
import AboutSection from "@/components/about-section";
import ContactSection from "@/components/contact-section";
import logoImage from "@assets/image_1754581825249.png";
import CaseStudyModal from "@/components/case-study-modal";
import AwardModal from "@/components/award-modal";
import SiteModal from "@/components/site-modal";
import CareerChatbot from "@/components/CareerChatbot";
import NavMusicPlayer from "@/components/nav-music-player";
import { useState, useEffect } from "react";
import { Menu, X, Award, Code, ExternalLink, Home } from "lucide-react";

export default function Home() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const [isMusicPlaying, setIsMusicPlaying] = useState(false);
  const [isAwardModalOpen, setIsAwardModalOpen] = useState(false);
  const [isSiteModalOpen, setIsSiteModalOpen] = useState(false);





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
              <Home className="w-6 h-6 text-purple-400 mr-2" />
              <span className="name-first text-white font-bold text-xl">Alexis</span>
              <span className="name-last text-purple-400 font-bold text-xl">Brochu</span>
            </div>
            <div className="hidden md:flex space-x-8 items-center">
              {[
                { id: 'work', label: 'Check out my work' },
                { id: 'about', label: 'My Expertise' },
                { id: 'contact', label: 'Message Me' }
              ].map(item => (
                <button
                  key={item.id}
                  onClick={() => scrollToSection(item.id)}
                  className={`transition-colors font-medium px-3 py-2 rounded-md ${
                    activeSection === item.id 
                      ? 'text-purple-400 bg-purple-400/10' 
                      : 'text-white hover:text-purple-400 hover:bg-white/5'
                  }`}
                  style={{fontSize: '14px', fontWeight: '500'}}
                >
                  {item.label}
                </button>
              ))}
              <div className="ml-4 flex items-center gap-3">
                <div 
                  className="inline-flex items-center gap-2 bg-gradient-to-r from-gray-600/60 to-gray-500/70 rounded-full px-4 py-2 hover:from-gray-500/70 hover:to-gray-400/80 transition-all duration-300 cursor-pointer border border-gray-400/30 transform hover:scale-105 hover:brightness-110"
                  onClick={() => setIsSiteModalOpen(true)}
                  data-testid="button-about-site"
                >
                  <Code className="w-4 h-4 text-blue-400" />
                  <span className="text-sm font-medium hidden lg:inline" style={{ color: '#F3E8B9' }}>
                    How I built this site
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
              {[
                { id: 'work', label: 'Check out my work' },
                { id: 'about', label: 'My Expertise' },
                { id: 'contact', label: 'Message Me' }
              ].map(item => (
                <button
                  key={item.id}
                  onClick={() => scrollToSection(item.id)}
                  className="block w-full text-left py-3 px-4 text-white hover:text-purple-400 hover:bg-white/5 transition-colors rounded-md font-medium"
                >
                  {item.label}
                </button>
              ))}
              <div className="pt-2 border-t border-purple-400/20 space-y-2">
                <div 
                  className="inline-flex items-center gap-2 bg-gradient-to-r from-gray-600/60 to-gray-500/70 rounded-full px-4 py-2 hover:from-gray-500/70 hover:to-gray-400/80 transition-all duration-300 cursor-pointer w-full justify-center transform hover:scale-105 hover:brightness-110"
                  onClick={() => {
                    setIsSiteModalOpen(true);
                    setIsMobileMenuOpen(false);
                  }}
                  data-testid="button-about-site-mobile"
                >
                  <Code className="w-4 h-4 text-blue-400" />
                  <span className="text-sm font-medium" style={{ color: '#F3E8B9' }}>
                    How I built this site
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
      {/* <CareerChatbot /> */}

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