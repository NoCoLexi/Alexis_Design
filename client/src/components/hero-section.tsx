import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { ArrowDown, Award, Sparkles, Mail, Calendar } from "lucide-react";
import { SiLinkedin } from "react-icons/si";
import NavMusicPlayer from "./nav-music-player";

export default function HeroSection() {
  const [isPlaying, setIsPlaying] = useState(false);

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

  const scrollToAbout = () => {
    const element = document.getElementById('about');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="home" className="min-h-screen flex items-center relative overflow-hidden">
      <div className="absolute inset-0 gradient-bg-secondary opacity-30"></div>
      <div className="absolute inset-0 opacity-20">
        <div className="w-full h-full bg-gradient-to-br from-primary/20 via-transparent to-chart-1/20"></div>
      </div>
      
      <div className="relative z-10 max-w-7xl mx-auto px-6 py-32 text-center">
        <div className="max-w-4xl mx-auto">
          
          {/* Hire Alexis Main Heading - Much larger and more prominent */}
          <h1 className="text-8xl md:text-[10rem] font-black leading-none mb-12">
            <span className={`gradient-text disco-text ${isPlaying ? 'dancing' : ''}`}>
              Hire Alexis
            </span>
          </h1>
          
          {/* Hire Me Song Button - Positioned closer to title */}
          <div className={`mb-16 flex justify-center disco-button ${isPlaying ? 'playing' : ''}`}>
            <NavMusicPlayer 
              onPlayingChange={setIsPlaying}
              renderAs="button"
              buttonText="▶ Play my Hire Me song"
            />
          </div>
          
          {/* Tagline - Better spacing and sizing */}
          <div className="text-white text-2xl md:text-3xl font-normal leading-relaxed mb-12">
            <div className="mb-2">Hey hiring team, say hello to your next</div>
            <div className="font-black text-3xl md:text-4xl">Product Designer</div>
          </div>
          
          {/* Contact Icons */}
          <div className="flex justify-center space-x-6 mb-16">
            <a 
              href="mailto:alexisb.product@gmail.com" 
              className="w-12 h-12 bg-primary rounded-full flex items-center justify-center hover:opacity-80 transition-all duration-300 hover:scale-110"
              data-testid="contact-email-icon"
            >
              <Mail className="w-6 h-6 text-white" />
            </a>
            
            <a 
              href="https://linkedin.com/in/alexisbrochu" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="w-12 h-12 bg-[#0077B5] rounded-full flex items-center justify-center hover:opacity-80 transition-all duration-300 hover:scale-110"
              data-testid="contact-linkedin-icon"
            >
              <SiLinkedin className="w-6 h-6 text-white" />
            </a>
            
            <a 
              href="https://calendly.com/alexis-brochu/15min" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="w-12 h-12 bg-chart-2 rounded-full flex items-center justify-center hover:opacity-80 transition-all duration-300 hover:scale-110"
              data-testid="contact-calendar-icon"
            >
              <Calendar className="w-6 h-6 text-white" />
            </a>
          </div>
          
          {/* Key Metrics */}
          <div className="grid grid-cols-3 gap-8 max-w-3xl mx-auto">
            <div className="text-center">
              <div className="text-4xl md:text-5xl font-bold text-white mb-2">545.5%</div>
              <div className="text-sm text-white/70">User Growth</div>
            </div>
            <div className="text-center">
              <div className="text-4xl md:text-5xl font-bold text-white mb-2">$244M</div>
              <div className="text-sm text-white/70">Projects Closed</div>
            </div>
            <div className="text-center">
              <div className="text-4xl md:text-5xl font-bold text-white mb-2">75%</div>
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
    </section>
  );
}
