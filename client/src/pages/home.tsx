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
    <div className="min-h-screen bg-background text-foreground">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 w-full z-50 bg-background/90 backdrop-blur-lg border-b border-primary/30 shadow-lg" style={{display: 'block !important', visibility: 'visible !important'}}>
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex justify-between items-center">
            <div className="logo-style flex items-center">
              <span className="name-first">Alexis</span>
              <span className="name-last">Brochu</span>
            </div>
            <div className="hidden md:flex space-x-8 items-center">
              {[
                { id: 'home', label: 'Home' },
                { id: 'work', label: 'Product Portfolio' },
                { id: 'about', label: 'About Alexis' },
                { id: 'contact', label: 'Contact Me' }
              ].map(item => (
                <button
                  key={item.id}
                  onClick={() => scrollToSection(item.id)}

                  className={`transition-colors ${
                    activeSection === item.id ? 'text-[#63538F]' : 'text-[#F3E8B9] hover:text-[#63538F]'
                  }`}
                >
                  {item.label}
                </button>
              ))}
              <div className="ml-4">
                <div 
                  className="inline-flex items-center gap-2 glass rounded-full px-4 py-2 hover:glow-purple transition-all duration-300 cursor-pointer"
                  onClick={() => setIsAwardModalOpen(true)}
                  data-testid="button-2023-tech-award"
                >
                  <Award className="w-4 h-4 text-chart-3" />
                  <span className="text-xs font-medium text-foreground hidden lg:inline">
                    2023 CA Gov Tech Award
                  </span>
                </div>
              </div>
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
                { id: 'work', label: 'Product Portfolio' },
                { id: 'about', label: 'About Alexis' },
                { id: 'contact', label: 'Contact Me' }
              ].map(item => (
                <button
                  key={item.id}
                  onClick={() => scrollToSection(item.id)}

                  className="block w-full text-left py-2 text-[#F3E8B9] hover:text-[#63538F] transition-colors"
                >
                  {item.label}
                </button>
              ))}
              <div className="pt-2 border-t border-primary/20">
                <div 
                  className="inline-flex items-center gap-2 glass rounded-full px-4 py-2 hover:glow-purple transition-all duration-300 cursor-pointer w-full justify-center"
                  onClick={() => {
                    setIsAwardModalOpen(true);
                    setIsMobileMenuOpen(false);
                  }}
                  data-testid="button-2023-tech-award-mobile"
                >
                  <Award className="w-4 h-4 text-chart-3" />
                  <span className="text-sm font-medium text-foreground">
                    2023 CA Gov Tech Award
                  </span>
                </div>
              </div>
            </div>
          )}
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
