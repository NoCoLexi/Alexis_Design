import HeroSection from "@/components/hero-section";
import FeaturedWork from "@/components/featured-work";
import AboutSection from "@/components/about-section";
import CreativeGallery from "@/components/creative-gallery";
import ContactSection from "@/components/contact-section";
import logoImage from "@assets/image_1754581825249.png";
import CaseStudyModal from "@/components/case-study-modal";
import ChatbotOverlay from "@/components/chatbot-overlay";
import NavMusicPlayer from "@/components/nav-music-player";
import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import { audioManager } from "@/utils/audioUtils";

export default function Home() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const [isMusicPlaying, setIsMusicPlaying] = useState(false);

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
      <nav className={`fixed top-0 w-full z-50 bg-background/80 backdrop-blur-md border-b border-primary/20 disco-header ${isMusicPlaying ? 'dancing' : ''}`}>
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex justify-between items-center">
            <div className="logo-style flex items-center">
              <span className="name-first">Alexis</span>
              <span className="name-last">Brochu</span>
            </div>
            <div className="hidden md:flex space-x-8 items-center">
              {[
                { id: 'home', label: 'Home' },
                { id: 'work', label: 'Work' },
                { id: 'about', label: 'About Alexis' },
                { id: 'gallery', label: 'Other' },
                { id: 'contact', label: 'Contact' }
              ].map(item => (
                <button
                  key={item.id}
                  onClick={() => scrollToSection(item.id)}
                  onMouseEnter={() => {
                    console.log('Nav button hover detected');
                    audioManager.playClickSound();
                  }}
                  className={`transition-colors ${
                    activeSection === item.id ? 'text-[#63538F]' : 'text-[#F3E8B9] hover:text-[#63538F]'
                  }`}
                >
                  {item.label}
                </button>
              ))}
              <div className="ml-4">
                <NavMusicPlayer onPlayingChange={setIsMusicPlaying} />
              </div>
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
                { id: 'about', label: 'About Alexis' },
                { id: 'gallery', label: 'Other' },
                { id: 'contact', label: 'Contact' }
              ].map(item => (
                <button
                  key={item.id}
                  onClick={() => scrollToSection(item.id)}
                  onMouseEnter={() => {
                    console.log('Mobile nav button hover detected');
                    audioManager.playClickSound();
                  }}
                  className="block w-full text-left py-2 text-[#F3E8B9] hover:text-[#63538F] transition-colors"
                >
                  {item.label}
                </button>
              ))}
              <div className="pt-2 border-t border-primary/20">
                <NavMusicPlayer onPlayingChange={setIsMusicPlaying} />
              </div>
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
      {/* <ChatbotOverlay /> */}

      {/* Footer */}
      <footer className="py-12 border-t border-primary/20">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center">
            <div className="text-muted-foreground">
              © {new Date().getFullYear()} Alexis Design. Portfolio built using Replit, Vibe Coding & AI prompting.
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
