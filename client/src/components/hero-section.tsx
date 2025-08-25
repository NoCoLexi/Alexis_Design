import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { ArrowDown, Award, Sparkles, Mail, Calendar } from "lucide-react";
import { SiLinkedin } from "react-icons/si";
import NavMusicPlayer from "./nav-music-player";
import AdminPanel from "./admin-panel";
import VideoModal from "./video-modal";
import { useAdminPanel } from "@/hooks/use-admin-panel";
import profileImage from "@assets/Brochu, Alexis 2023 Ireland_1754523029765.png";
import expertiseVideo from "@assets/Alexis_Deconstructing_a_Modern_Product_Leader_1755784261269.mp4";
import goldenTrophyIcon from "@assets/golden-star-trophy.png";

interface HeroSectionProps {
  onOpenAwardModal?: () => void;
}

export default function HeroSection({ onOpenAwardModal }: HeroSectionProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentRoleIndex, setCurrentRoleIndex] = useState(0);
  const [isExiting, setIsExiting] = useState(false);
  const [isVideoModalOpen, setIsVideoModalOpen] = useState(false);

  // Admin panel integration
  const { isVisible, settings, getGreeting, getCaseStudyFocus, applySettings, closePanel } = useAdminPanel();

  // Get greeting from URL parameters or admin panel
  const getCustomGreeting = () => {
    const urlParams = new URLSearchParams(window.location.search);
    const companyFromUrl = urlParams.get('company');

    if (companyFromUrl) {
      return `Hey ${companyFromUrl} hiring team`;
    }
    return getGreeting() || "Hey, [company] hiring team";
  };

  const roles = [
    "Innovation Strategist",
    "Cross-Functional Product Lead",
    "AI Product Strategist",
    "Strategic Solutions Lead",
    "Product & Experience Lead",
    "Digital Product Lead",
    "Product Development Lead",
    "Product Strategy Architect",
    "Customer Success Specialist",
    "Digital Experience Architect",
    "Innovation Design Specialist",
    "Product Innovation Lead",
    "Design Strategy Lead",
    "Product Lead",
    "Innovation Lead",
    "Digital Strategy Lead",
    "Product Strategy Lead",
    "Experience Strategy Lead"
  ];

  useEffect(() => {
    // Listen for music playing state changes
    const handleMusicStateChange = (event: CustomEvent) => {
      setIsPlaying(event.detail.isPlaying);
    };

    window.addEventListener('musicStateChange', handleMusicStateChange as EventListener);

    return () => {
      window.removeEventListener('musicStateChange', handleMusicStateChange as EventListener);
    };
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setIsExiting(true);

      setTimeout(() => {
        setCurrentRoleIndex((prevIndex) => (prevIndex + 1) % roles.length);
        setIsExiting(false);
      }, 250);
    }, 2000);

    return () => clearInterval(interval);
  }, [roles.length]);

  const scrollToWork = () => {
    console.log('Down arrow clicked - attempting to scroll to work section');
    const element = document.getElementById('work');
    console.log('Found work element:', element);
    if (element) {
      console.log('Scrolling to work section...');
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    } else {
      console.log('Work element not found!');
    }
  };

  const scrollToContact = () => {
    const element = document.getElementById('contact');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const openVideoModal = () => {
    setIsVideoModalOpen(true);
  };

  return (
    <section id="home" className="min-h-screen flex items-center relative overflow-hidden" style={{paddingTop: '100px'}}>
      <div className="absolute inset-0 gradient-bg-secondary opacity-30"></div>
      <div className="absolute inset-0 opacity-20">
        <div className="w-full h-full bg-gradient-to-br from-primary/20 via-transparent to-chart-1/20"></div>
      </div>



      <div className="flex items-center px-6 py-20 relative space-x-8 text-center w-full z-10">
        <div style={{ flexGrow: 1 }}>
          <img 
            src={profileImage} 
            alt="Alexis Brochu professional photo" 
            data-testid="img-professional-photo"
            className="w-full mx-auto rounded-lg"
          />

          {/* Watch Video Link */}
          <div className="mt-4 pb-4 flex justify-center">
            <button
              onClick={openVideoModal}
              className="text-base transition-all duration-300 transform hover:scale-105 hover:brightness-110"
              data-testid="button-watch-video-about-me"
              style={{ fontFamily: 'Inter, sans-serif', fontWeight: 300, color: '#F3E8B9' }}
            >
              Watch this video about what it's like to work with me
            </button>
          </div>
        </div>

        <div className="max-w-4xl mx-auto" style={{
          flexGrow: 1
        }}>
          {/* Award Button - positioned above the heading */}
          <div className="mb-6 pb-4 flex justify-center">
            <div 
              className="inline-flex items-center gap-2 rounded-full px-6 py-3 hover:glow-yellow transition-all duration-300 cursor-pointer transform hover:scale-105 shadow-lg border border-chart-3/20"
              style={{ background: 'rgba(255, 255, 255, 0.15)', backdropFilter: 'blur(20px)' }}
              onClick={onOpenAwardModal}
              data-testid="button-hero-tech-award"
            >
              <Award className="w-5 h-5" style={{ color: '#0081BC' }} />
              <span className="text-base font-medium" style={{ color: '#F3E8B9' }}>
                2023 California GovTech Award Winner
              </span>
            </div>
          </div>

          <h1 className="text-5xl md:text-7xl font-inter-black" style={{ fontFamily: 'Montserrat, sans-serif', fontWeight: 900, lineHeight: '1.4', paddingBottom: '0.25rem' }}>
            <span className={`gradient-text disco-text ${isPlaying ? 'dancing' : ''}`}>
              {getCustomGreeting()}
            </span>
          </h1>

          <p 
            className="text-2xl md:text-3xl font-inter-medium text-muted-foreground mb-2 leading-relaxed max-w-3xl mx-auto text-center"
            style={{ fontFamily: 'Inter, sans-serif', fontWeight: 500 }}
          >
            I'm Alexis and I want to be your next
          </p>
          
          <p 
            className={`text-2xl md:text-3xl font-inter-black text-foreground mb-8 cycling-role text-center ${isExiting ? 'exit' : ''}`}
            style={{ fontFamily: 'Montserrat, sans-serif', fontWeight: 300 }}
          >
            {roles[currentRoleIndex]}
          </p>

          {/* Hire Me Song Button */}
          <div className="mb-6 pt-4 pb-8 flex justify-center max-w-xs mx-auto">
            <div className={`disco-button ${isPlaying ? 'playing' : ''} w-full`}>
              <NavMusicPlayer 
                onPlayingChange={setIsPlaying}
                renderAs="button"
                buttonText='Play my "Hire Me" song'
              />
            </div>
          </div>

          {/* Key Metrics */}
          <div className="grid grid-cols-3 gap-4 max-w-2xl mx-auto pt-6">
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-bold" style={{ color: '#F3E8B9' }}>545.5%</div>
              <div className="text-sm text-white/70">User Growth</div>
            </div>
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-bold" style={{ color: '#F3E8B9' }}>$244M</div>
              <div className="text-sm text-white/70">Projects Closed</div>
            </div>
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-bold" style={{ color: '#F3E8B9' }}>75%</div>
              <div className="text-sm text-white/70">Tickets Reduced</div>
            </div>
          </div>
        </div>


      </div>

      {/* Scroll indicator */}
      <div 
        className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce cursor-pointer hover:text-primary transition-colors z-20 flex items-center justify-center"
        onClick={scrollToWork}
        role="button"
        tabIndex={0}
        onKeyDown={(e) => e.key === 'Enter' && scrollToWork()}
      >
        <ArrowDown className="w-8 h-8 text-muted-foreground hover:text-primary transition-colors" />
      </div>

      {/* Hidden Admin Panel */}
      <AdminPanel
        isVisible={isVisible}
        onClose={closePanel}
        onApply={applySettings}
      />

      {/* Video Modal */}
      <VideoModal
        isOpen={isVideoModalOpen}
        onClose={() => setIsVideoModalOpen(false)}
        videoSrc={expertiseVideo}
        title="Check out this video about what it would be like to work with me."
      />
    </section>
  );
}