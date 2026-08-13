import HeroSection from "@/components/hero-section";
import FeaturedWork from "@/components/featured-work";
import AboutSection from "@/components/about-section";
import ContactSection from "@/components/contact-section";
import CaseStudyModal from "@/components/case-study-modal";
import AwardModal from "@/components/award-modal";
import SiteModal from "@/components/site-modal";
import AdminPanel from "@/components/admin-panel";
import { useState, useEffect } from "react";
import { Menu, X, Gamepad2 } from "lucide-react";

export default function Home() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isAwardModalOpen, setIsAwardModalOpen] = useState(false);
  const [isSiteModalOpen, setIsSiteModalOpen] = useState(false);
  const [isAdminPanelOpen, setIsAdminPanelOpen] = useState(false);
  const [showNavLogo, setShowNavLogo] = useState(false);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    if (params.get('admin') === 'true' || window.location.pathname === '/admin') {
      setIsAdminPanelOpen(true);
    }
  }, []);

  // Fade in nav wordmark once hero scrolls away
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

  const scrollToSection = (sectionId: string) => {
    const el = document.getElementById(sectionId);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
    setIsMobileMenuOpen(false);
  };

  return (
    <div className="min-h-screen bg-white text-black">

      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white border-b border-[#E5E5E5]">
        <div className="max-w-7xl mx-auto px-6 py-3 flex items-center justify-between">

          {/* Wordmark — fades in after hero scrolls away */}
          <button
            className={`flex items-center gap-1.5 transition-all duration-500 ${showNavLogo ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
            onClick={() => scrollToSection('home')}
          >
            <span
              aria-hidden="true"
              style={{ color: '#FF4704', fontFamily: 'Inter, sans-serif', fontSize: '1rem', lineHeight: 1, fontWeight: 600 }}
            >
              ·
            </span>
            <span
              style={{
                fontFamily: '"Cormorant Garamond", Georgia, serif',
                fontWeight: 300,
                fontSize: '1.1875rem',
                color: '#000000',
                letterSpacing: '-0.01em',
              }}
            >
              Alexis Brochu
            </span>
          </button>

          {/* Desktop links */}
          <div className="hidden md:flex items-center gap-7">
            <button
              onClick={() => scrollToSection('work')}
              className="text-sm font-medium text-[#3F3B36] hover:text-black transition-colors"
              data-testid="button-nav-work"
            >
              Work
            </button>
            <button
              onClick={() => scrollToSection('about')}
              className="text-sm font-medium text-[#3F3B36] hover:text-black transition-colors"
              data-testid="button-nav-about"
            >
              About
            </button>
            <button
              onClick={() => scrollToSection('contact')}
              className="text-sm font-medium text-[#3F3B36] hover:text-black transition-colors"
              data-testid="button-nav-contact"
            >
              Contact
            </button>
            <a
              href="mailto:alexisb.product@gmail.com"
              className="text-sm font-medium text-[#3F3B36] hover:text-black transition-colors"
              data-testid="link-nav-email"
            >
              alexisb.product@gmail.com →
            </a>
          </div>

          {/* Mobile toggle */}
          <button
            className="md:hidden text-[#3F3B36] hover:text-black p-1"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label={isMobileMenuOpen ? 'Close menu' : 'Open menu'}
          >
            {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>

        {/* Mobile menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden border-t border-[#E5E5E5] bg-white px-6 py-5 space-y-4">
            <button
              onClick={() => scrollToSection('work')}
              className="block w-full text-left text-sm font-medium text-[#3F3B36] hover:text-black"
              data-testid="button-nav-work-mobile"
            >
              Work
            </button>
            <button
              onClick={() => scrollToSection('about')}
              className="block w-full text-left text-sm font-medium text-[#3F3B36] hover:text-black"
              data-testid="button-nav-about-mobile"
            >
              About
            </button>
            <button
              onClick={() => scrollToSection('contact')}
              className="block w-full text-left text-sm font-medium text-[#3F3B36] hover:text-black"
              data-testid="button-nav-contact-mobile"
            >
              Contact
            </button>
            <a
              href="mailto:alexisb.product@gmail.com"
              className="block text-sm font-medium text-[#3F3B36] hover:text-black"
              data-testid="link-nav-email-mobile"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              alexisb.product@gmail.com →
            </a>
          </div>
        )}
      </nav>

      {/* Page sections */}
      <HeroSection
        onOpenAwardModal={() => setIsAwardModalOpen(true)}
        onOpenSiteModal={() => setIsSiteModalOpen(true)}
      />
      <FeaturedWork />
      <AboutSection onOpenAwardModal={() => setIsAwardModalOpen(true)} />
      <ContactSection onOpenAwardModal={() => setIsAwardModalOpen(true)} />

      {/* Modals */}
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
      <footer className="border-t border-[#E5E5E5] py-10">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <a
            href="/stakeholder-invaders/"
            className="inline-flex items-center gap-2 text-[#777169] hover:text-black transition-colors"
            data-testid="link-play-game-footer"
          >
            <Gamepad2 className="w-4 h-4" />
            <span
              style={{ fontFamily: '"Geist Mono", monospace', fontSize: '0.625rem', letterSpacing: '0.1em', textTransform: 'uppercase' }}
            >
              Play Stakeholder Invaders →
            </span>
          </a>
          <p
            style={{ fontFamily: '"Geist Mono", monospace', fontSize: '0.625rem', letterSpacing: '0.08em', color: '#A59F97', textTransform: 'uppercase' }}
          >
            © {new Date().getFullYear()} Alexis Brochu · North Conway, NH
          </p>
        </div>
      </footer>
    </div>
  );
}
