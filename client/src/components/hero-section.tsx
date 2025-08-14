import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { ArrowDown, Award, Sparkles } from "lucide-react";
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
      
      <div className="relative z-10 max-w-7xl mx-auto px-6 py-20 text-center">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-5xl md:text-7xl font-black mb-6 leading-tight">
            <span className={`gradient-text disco-text ${isPlaying ? 'dancing' : ''}`}>
              Product Designer
            </span>
            <br />
            <span className={`text-foreground disco-text ${isPlaying ? 'dancing' : ''}`}>& UX Strategist</span>
          </h1>
          
          <p className="text-xl md:text-2xl text-muted-foreground mb-8 leading-relaxed max-w-3xl">
            I solve impossible problems.<br />
            (The AI just makes it look easy.)<br />
            Ready to see what I can help your team build?
          </p>


          
          {/* Hire Me Song Button */}
          <div className={`mb-12 flex justify-center disco-button ${isPlaying ? 'playing' : ''}`}>
            <NavMusicPlayer 
              onPlayingChange={setIsPlaying}
              renderAs="button"
              buttonText="Play my Hire Me song"
            />
          </div>
          
          {/* Key Metrics */}
          <div className="grid grid-cols-3 gap-4 max-w-2xl mx-auto">
            <div className="text-center">
              <div className="text-2xl md:text-3xl font-bold" style={{ color: '#F3E8B9' }}>545.5%</div>
              <div className="text-xs text-white/70">User Growth</div>
            </div>
            <div className="text-center">
              <div className="text-2xl md:text-3xl font-bold" style={{ color: '#F3E8B9' }}>$244M</div>
              <div className="text-xs text-white/70">Projects Closed</div>
            </div>
            <div className="text-center">
              <div className="text-2xl md:text-3xl font-bold" style={{ color: '#F3E8B9' }}>75%</div>
              <div className="text-xs text-white/70">Tickets Reduced</div>
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
