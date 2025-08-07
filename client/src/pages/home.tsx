import HeroSection from "@/components/hero-section";
import FeaturedWork from "@/components/featured-work";
import AboutSection from "@/components/about-section";
import CreativeGallery from "@/components/creative-gallery";
import ContactSection from "@/components/contact-section";
import CaseStudyModal from "@/components/case-study-modal";
import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import { audioManager } from "@/utils/audioUtils";
import alexisLogo from "@assets/Alexis Brochu logo_1754579560310.png";

export default function Home() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');

  useEffect(() => {
    // Initialize audio on first user interaction
    const enableAudio = async () => {
      try {
        await audioManager.enable();
        console.log('Audio enabled on user interaction');
        // Remove listeners after first interaction
        document.removeEventListener('click', enableAudio);
        document.removeEventListener('keydown', enableAudio);
        document.removeEventListener('touchstart', enableAudio);
        document.removeEventListener('mousedown', enableAudio);
      } catch (error) {
        console.warn('Failed to enable audio:', error);
      }
    };

    document.addEventListener('click', enableAudio);
    document.addEventListener('keydown', enableAudio);
    document.addEventListener('touchstart', enableAudio);
    document.addEventListener('mousedown', enableAudio);

    return () => {
      document.removeEventListener('click', enableAudio);
      document.removeEventListener('keydown', enableAudio);
      document.removeEventListener('touchstart', enableAudio);
      document.removeEventListener('mousedown', enableAudio);
    };
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const sections = ['home', 'work', 'about', 'gallery', 'contact'];
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
    <div className="min-h-screen bg-background text-foreground">
      {/* Navigation */}
      <nav className="fixed top-0 w-full z-50 bg-background/80 backdrop-blur-md border-b border-primary/20">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center">
              <svg width="180" height="50" viewBox="0 0 180 50" className="h-12 w-auto">
                <defs>
                  <linearGradient id="logoGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#14b8a6" />
                    <stop offset="100%" stopColor="#0891b2" />
                  </linearGradient>
                </defs>
                
                {/* Alexis text */}
                <text x="0" y="20" fontSize="18" fontWeight="700" fill="url(#logoGradient)" fontFamily="system-ui, -apple-system, sans-serif">
                  Alexis
                </text>
                
                {/* Brochu text with molecular design inside the O */}
                <g>
                  {/* B */}
                  <text x="0" y="40" fontSize="18" fontWeight="700" fill="url(#logoGradient)" fontFamily="system-ui, -apple-system, sans-serif">
                    Br
                  </text>
                  
                  {/* O with molecular design inside */}
                  <g>
                    {/* O outline */}
                    <circle cx="36" cy="35" r="9" fill="none" stroke="url(#logoGradient)" strokeWidth="2.5" />
                    
                    {/* Molecular structure inside O */}
                    <g transform="translate(36, 35)">
                      {/* Central node */}
                      <circle cx="0" cy="0" r="1.5" fill="#14b8a6" opacity="0.9" />
                      
                      {/* Connected nodes */}
                      <circle cx="-4" cy="-3" r="1.2" fill="#0891b2" opacity="0.8" />
                      <circle cx="4" cy="-3" r="1.2" fill="#06b6d4" opacity="0.8" />
                      <circle cx="3" cy="4" r="1.2" fill="#14b8a6" opacity="0.7" />
                      <circle cx="-3" cy="4" r="1.2" fill="#0891b2" opacity="0.7" />
                      
                      {/* Connecting lines */}
                      <line x1="0" y1="0" x2="-4" y2="-3" stroke="#14b8a6" strokeWidth="1" opacity="0.6" />
                      <line x1="0" y1="0" x2="4" y2="-3" stroke="#0891b2" strokeWidth="1" opacity="0.6" />
                      <line x1="0" y1="0" x2="3" y2="4" stroke="#06b6d4" strokeWidth="1" opacity="0.6" />
                      <line x1="0" y1="0" x2="-3" y2="4" stroke="#14b8a6" strokeWidth="1" opacity="0.5" />
                      
                      {/* Cross connections */}
                      <line x1="-4" y1="-3" x2="4" y2="-3" stroke="#0891b2" strokeWidth="0.8" opacity="0.4" />
                      <line x1="-3" y1="4" x2="3" y2="4" stroke="#06b6d4" strokeWidth="0.8" opacity="0.4" />
                    </g>
                  </g>
                  
                  {/* chu */}
                  <text x="54" y="40" fontSize="18" fontWeight="700" fill="url(#logoGradient)" fontFamily="system-ui, -apple-system, sans-serif">
                    chu
                  </text>
                </g>
              </svg>
            </div>
            <div className="hidden md:flex space-x-8">
              {[
                { id: 'home', label: 'Home' },
                { id: 'work', label: 'Work' },
                { id: 'about', label: 'About' },
                { id: 'gallery', label: 'Gallery' },
                { id: 'contact', label: 'Contact' }
              ].map(item => (
                <button
                  key={item.id}
                  onClick={() => scrollToSection(item.id)}
                  onMouseEnter={() => {
                    console.log('Nav button hover detected');
                    audioManager.playClickSound();
                  }}
                  className={`hover:text-primary transition-colors ${
                    activeSection === item.id ? 'text-primary' : 'text-muted-foreground'
                  }`}
                >
                  {item.label}
                </button>
              ))}
            </div>
            <button
              className="md:hidden text-foreground"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              onMouseEnter={() => {
                console.log('Mobile menu toggle hover detected');
                audioManager.playClickSound();
              }}
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
          
          {/* Mobile Menu */}
          {isMobileMenuOpen && (
            <div className="md:hidden mt-4 pb-4 space-y-2">
              {[
                { id: 'home', label: 'Home' },
                { id: 'work', label: 'Work' },
                { id: 'about', label: 'About' },
                { id: 'gallery', label: 'Gallery' },
                { id: 'contact', label: 'Contact' }
              ].map(item => (
                <button
                  key={item.id}
                  onClick={() => scrollToSection(item.id)}
                  onMouseEnter={() => {
                    console.log('Mobile nav button hover detected');
                    audioManager.playClickSound();
                  }}
                  className="block w-full text-left py-2 hover:text-primary transition-colors"
                >
                  {item.label}
                </button>
              ))}
            </div>
          )}
        </div>
      </nav>

      {/* Page Sections */}
      <HeroSection />
      <FeaturedWork />
      <AboutSection />
      <CreativeGallery />
      <ContactSection />
      <CaseStudyModal />

      {/* Footer */}
      <footer className="py-12 border-t border-primary/20">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="text-xl font-bold gradient-text mb-4 md:mb-0">
              Alexis Brochu
            </div>
            <div className="text-muted-foreground">
              © {new Date().getFullYear()} Creative Visionary & Solution Factory. All rights reserved.
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
