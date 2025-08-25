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
import { Menu, X, Award, Code, ExternalLink } from "lucide-react";
import { cn } from "@/lib/utils"; // Assuming cn is imported from a utility file

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
          // Adjust the condition to check if the section is in view, considering the sidebar
          return rect.top <= 100 && rect.bottom >= 100;
        }
        return false;
      });
      if (currentSection) {
        setActiveSection(currentSection);
      }
    };

    window.addEventListener('scroll', handleScroll);
    // Clean up the event listener on component unmount
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      // Adjust scroll behavior if needed to account for fixed sidebar
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setIsMobileMenuOpen(false);
  };

  return (
    <div className="min-h-screen bg-background text-foreground" style={{backgroundColor: '#08080A'}}>
      {/* Desktop Left Sidebar Navigation */}
        <nav className={cn(
          "hidden md:flex fixed top-0 left-0 h-screen z-50 w-64 p-6 transition-all duration-300 flex-col",
          "backdrop-blur-elegant border-r border-white/10 bg-black/40"
        )}>
          <div className="flex flex-col h-full">
            {/* Logo Section */}
            <div className="flex items-center space-x-2 mb-8">
              <img 
                src={logoImage} 
                alt="Alexis Brochu" 
                className="h-10 w-auto rounded-full" 
              />
              <div className="logo-style">
                <span className="name-first">Alexis</span>{' '}
                <span className="name-last">Brochu</span>
              </div>
            </div>

            {/* Navigation Links */}
            <div className="flex flex-col space-y-4 mb-8">
              <a 
                href="#home" 
                className={cn("text-white hover:text-blue-400 transition-colors text-lg py-2 px-4 rounded-lg", 
                  activeSection === 'home' ? 'text-blue-400 bg-blue-400/10' : 'hover:bg-white/5')}
              >
                Home
              </a>
              <a 
                href="#work" 
                className={cn("text-white hover:text-blue-400 transition-colors text-lg py-2 px-4 rounded-lg",
                  activeSection === 'work' ? 'text-blue-400 bg-blue-400/10' : 'hover:bg-white/5')}
              >
                Work
              </a>
              <a 
                href="#about" 
                className={cn("text-white hover:text-blue-400 transition-colors text-lg py-2 px-4 rounded-lg",
                  activeSection === 'about' ? 'text-blue-400 bg-blue-400/10' : 'hover:bg-white/5')}
              >
                About
              </a>
              <a 
                href="#contact" 
                className={cn("text-white hover:text-blue-400 transition-colors text-lg py-2 px-4 rounded-lg",
                  activeSection === 'contact' ? 'text-blue-400 bg-blue-400/10' : 'hover:bg-white/5')}
              >
                Contact
              </a>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col space-y-4 mt-auto">
              <div className="flex justify-center">
                <NavMusicPlayer 
                  isPlaying={isMusicPlaying}
                  onToggle={() => setIsMusicPlaying(!isMusicPlaying)}
                />
              </div>

              <button
                onClick={() => setIsAwardModalOpen(true)}
                className="flex items-center space-x-2 text-white hover:text-yellow-400 transition-colors py-2 px-4 rounded-lg hover:bg-white/5"
                title="Awards & Recognition"
              >
                <Award className="h-5 w-5" />
                <span>Awards</span>
              </button>

              <button
                onClick={() => setIsSiteModalOpen(true)}
                className="flex items-center space-x-2 text-white hover:text-blue-400 transition-colors py-2 px-4 rounded-lg hover:bg-white/5"
                title="How I built this site"
              >
                <Code className="h-5 w-5" />
                <span>How I built this</span>
              </button>
            </div>
          </div>
        </nav>

      {/* Mobile Navigation */}
      <nav className="fixed top-0 left-0 right-0 w-full z-50 bg-gradient-to-r from-background/95 via-primary/20 to-background/95 backdrop-blur-lg border-b border-primary/30 shadow-lg md:hidden">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex justify-between items-center">
            <div className="logo-style flex items-center">
              <span className="name-first text-white font-bold text-xl">Alexis</span>
              <span className="name-last text-purple-400 font-bold text-xl">Brochu</span>
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
                  className="inline-flex items-center gap-2 bg-purple-600/20 rounded-full px-4 py-2 hover:bg-purple-600/30 transition-all duration-300 cursor-pointer w-full justify-center transform hover:scale-105 hover:brightness-110"
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
      {/* Add ml-64 to ensure content respects the sidebar's width */}
      <main className="relative z-10 md:ml-64"> 
        <section id="home">
          <HeroSection onOpenAwardModal={() => setIsAwardModalOpen(true)} />
        </section>
        <section id="work" className="min-h-screen">
          <FeaturedWork />
        </section>
        <section id="about" className="min-h-screen">
          <AboutSection onOpenAwardModal={() => setIsAwardModalOpen(true)} />
        </section>
        <section id="contact" className="min-h-screen">
          <ContactSection onOpenAwardModal={() => setIsAwardModalOpen(true)} />
        </section>
      </main>

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
      <footer className="py-12 border-t border-primary/20 md:ml-64"> {/* Added margin-left for footer as well */}
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center">
            <div className="text-muted-foreground">
              © 2025 Alexis Design.
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}