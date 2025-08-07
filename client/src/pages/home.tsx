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
              <svg width="140" height="40" viewBox="0 0 140 40" className="h-10 w-auto">
                <defs>
                  <linearGradient id="logoGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#14b8a6" />
                    <stop offset="100%" stopColor="#0891b2" />
                  </linearGradient>
                </defs>
                
                {/* Alexis text */}
                <text x="0" y="16" fontSize="14" fontWeight="700" fill="url(#logoGradient)" fontFamily="system-ui, -apple-system, sans-serif">
                  Alexis
                </text>
                
                {/* Brochu text */}
                <text x="0" y="32" fontSize="14" fontWeight="700" fill="url(#logoGradient)" fontFamily="system-ui, -apple-system, sans-serif">
                  Brochu
                </text>
                
                {/* Abstract molecular/network design elements */}
                <g transform="translate(75, 8)">
                  {/* Main circles */}
                  <circle cx="8" cy="8" r="3" fill="#14b8a6" opacity="0.9" />
                  <circle cx="20" cy="6" r="2.5" fill="#0891b2" opacity="0.8" />
                  <circle cx="16" cy="18" r="2" fill="#06b6d4" opacity="0.7" />
                  <circle cx="4" cy="20" r="1.5" fill="#14b8a6" opacity="0.6" />
                  
                  {/* Connecting lines */}
                  <line x1="8" y1="8" x2="20" y2="6" stroke="#14b8a6" strokeWidth="1.5" opacity="0.5" />
                  <line x1="8" y1="8" x2="16" y2="18" stroke="#0891b2" strokeWidth="1.5" opacity="0.5" />
                  <line x1="8" y1="8" x2="4" y2="20" stroke="#06b6d4" strokeWidth="1.5" opacity="0.4" />
                  <line x1="20" y1="6" x2="16" y2="18" stroke="#14b8a6" strokeWidth="1" opacity="0.4" />
                  
                  {/* Smaller accent dots */}
                  <circle cx="12" cy="2" r="1" fill="#0891b2" opacity="0.6" />
                  <circle cx="24" cy="12" r="1" fill="#14b8a6" opacity="0.5" />
                  <circle cx="2" cy="14" r="1" fill="#06b6d4" opacity="0.5" />
                </g>
                
                {/* Subtle glow effect */}
                <defs>
                  <filter id="glow">
                    <feGaussianBlur stdDeviation="2" result="coloredBlur"/>
                    <feMerge> 
                      <feMergeNode in="coloredBlur"/>
                      <feMergeNode in="SourceGraphic"/>
                    </feMerge>
                  </filter>
                </defs>
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
