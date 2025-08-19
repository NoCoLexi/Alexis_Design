import HeroSection from "@/components/hero-section";
import FeaturedWork from "@/components/featured-work";
import AboutSection from "@/components/about-section";
import ContactSection from "@/components/contact-section";
import logoImage from "@assets/image_1754581825249.png";
import CaseStudyModal from "@/components/case-study-modal";
import AwardModal from "@/components/award-modal";
import CareerChatbot from "@/components/CareerChatbot";
import NavMusicPlayer from "@/components/nav-music-player";
import { useState, useEffect } from "react";
import { Menu, X, Award } from "lucide-react";

export default function Home() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const [isMusicPlaying, setIsMusicPlaying] = useState(false);
  const [isAwardModalOpen, setIsAwardModalOpen] = useState(false);
  




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
      <nav 
        className="fixed top-0 left-0 right-0 w-full z-[9999]" 
        style={{
          backgroundColor: 'rgba(0, 0, 0, 0.95)', 
          minHeight: '80px',
          borderBottom: '2px solid purple'
        }}
      >
        <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', height: '80px', maxWidth: '1280px', margin: '0 auto', padding: '0 24px'}}>
          <div style={{display: 'flex', alignItems: 'center'}}>
            <span style={{color: 'white', fontSize: '20px', fontWeight: 'bold'}}>Alexis</span>
            <span style={{color: '#a855f7', fontSize: '20px', fontWeight: 'bold', marginLeft: '8px'}}>Brochu</span>
          </div>
          <div style={{display: 'flex', alignItems: 'center', gap: '20px'}}>
            <button style={{color: 'white', padding: '8px 16px', backgroundColor: 'transparent', border: 'none', cursor: 'pointer'}} onClick={() => scrollToSection('home')}>Home</button>
            <button style={{color: 'white', padding: '8px 16px', backgroundColor: 'transparent', border: 'none', cursor: 'pointer'}} onClick={() => scrollToSection('work')}>Portfolio</button>
            <button style={{color: 'white', padding: '8px 16px', backgroundColor: 'transparent', border: 'none', cursor: 'pointer'}} onClick={() => scrollToSection('about')}>About</button>
            <button style={{color: 'white', padding: '8px 16px', backgroundColor: 'transparent', border: 'none', cursor: 'pointer'}} onClick={() => scrollToSection('contact')}>Contact</button>
          </div>
        </div>
      </nav>

      {/* Page Sections */}
      <HeroSection />
      <FeaturedWork />
      <AboutSection onOpenAwardModal={() => setIsAwardModalOpen(true)} />
      <ContactSection />
      <CaseStudyModal />
      <AwardModal 
        isOpen={isAwardModalOpen} 
        onClose={() => setIsAwardModalOpen(false)} 
      />
      {/* <CareerChatbot /> */}

      {/* Footer */}
      <footer className="py-12 border-t border-primary/20">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center">
            <div className="text-muted-foreground">
              © 2025 Alexis Design. Fueled by imagination, code, and AI genius: Replit, Claude, ChatGPT, and Suno working in harmony with Adobe Creative Cloud and Figma.
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
