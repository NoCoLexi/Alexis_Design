import HeroSection from "@/components/hero-section";
import FeaturedWork from "@/components/featured-work";
import AboutSection from "@/components/about-section";
import CreativeGallery from "@/components/creative-gallery";
import ContactSection from "@/components/contact-section";
import CaseStudyModal from "@/components/case-study-modal";
import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import { audioManager } from "@/utils/audioUtils";
import ABCLogo from "@/components/abc-logo";

export default function Home() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');

  useEffect(() => {
    // Initialize audio on first user interaction
    const enableAudio = () => {
      audioManager.enable();
      // Remove listeners after first interaction
      document.removeEventListener('click', enableAudio);
      document.removeEventListener('keydown', enableAudio);
      document.removeEventListener('touchstart', enableAudio);
    };

    document.addEventListener('click', enableAudio);
    document.addEventListener('keydown', enableAudio);
    document.addEventListener('touchstart', enableAudio);

    return () => {
      document.removeEventListener('click', enableAudio);
      document.removeEventListener('keydown', enableAudio);
      document.removeEventListener('touchstart', enableAudio);
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
            <ABCLogo size="sm" />
            <div className="hidden md:flex space-x-8">
              {[
                { id: 'home', label: 'Home' },
                { id: 'work', label: 'Work' },
                { id: 'about', label: 'About Alexis' },
                { id: 'gallery', label: 'Gallery' },
                { id: 'contact', label: 'Contact' }
              ].map(item => (
                <button
                  key={item.id}
                  onClick={() => scrollToSection(item.id)}
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
                { id: 'about', label: 'About Alexis' },
                { id: 'gallery', label: 'Gallery' },
                { id: 'contact', label: 'Contact' }
              ].map(item => (
                <button
                  key={item.id}
                  onClick={() => scrollToSection(item.id)}
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
