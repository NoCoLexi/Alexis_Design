import { useState } from 'react';
import { Mail, ArrowDown, Calendar } from 'lucide-react';
import { SiLinkedin } from 'react-icons/si';
import { NavMusicPlayer } from './nav-music-player';

export function HeroSection() {
  const [isPlaying, setIsPlaying] = useState(false);

  const scrollToWork = () => {
    const workSection = document.getElementById('work-section');
    if (workSection) {
      workSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-background via-primary/5 to-chart-1/10">
      {/* Animated disco background */}
      <div className={`absolute inset-0 transition-all duration-1000 ${isPlaying ? 'opacity-100' : 'opacity-0'}`}>
        <div className="disco-bg"></div>
      </div>
      
      {/* Static background gradient */}
      <div className="absolute inset-0 opacity-20">
        <div className="w-full h-full bg-gradient-to-br from-primary/20 via-transparent to-chart-1/20"></div>
      </div>
      
      {/* Main content - centered and following your exact sketch layout */}
      <div className="relative z-10 text-center px-6 max-w-4xl mx-auto">
        
        {/* Hire Alexis - Large gradient title */}
        <h1 className="text-6xl md:text-7xl lg:text-8xl font-black leading-none mb-8">
          <span className={`gradient-text disco-text ${isPlaying ? 'dancing' : ''}`}>
            Hire Alexis
          </span>
        </h1>
        
        {/* Play button - positioned close under title */}
        <div className={`mb-16 disco-button ${isPlaying ? 'playing' : ''}`}>
          <NavMusicPlayer 
            onPlayingChange={setIsPlaying}
            renderAs="button"
            buttonText="▶ Play my Hire Me song"
          />
        </div>
        
        {/* Tagline with proper line breaks */}
        <div className="text-white text-xl md:text-2xl lg:text-3xl leading-relaxed mb-16">
          <div className="mb-2">Hey hiring team, say hello to your next</div>
          <div className="font-bold text-2xl md:text-3xl lg:text-4xl">Product Designer</div>
        </div>
        
        {/* Contact icons - three circular buttons */}
        <div className="flex justify-center items-center space-x-6 mb-20">
          <a 
            href="mailto:alexisb.product@gmail.com" 
            className="w-14 h-14 bg-primary rounded-full flex items-center justify-center hover:opacity-80 transition-all duration-300 hover:scale-110"
            data-testid="contact-email-icon"
          >
            <Mail className="w-6 h-6 text-white" />
          </a>
          
          <a 
            href="https://linkedin.com/in/alexisbrochu" 
            target="_blank" 
            rel="noopener noreferrer" 
            className="w-14 h-14 bg-[#0077B5] rounded-full flex items-center justify-center hover:opacity-80 transition-all duration-300 hover:scale-110"
            data-testid="contact-linkedin-icon"
          >
            <SiLinkedin className="w-6 h-6 text-white" />
          </a>
          
          <a 
            href="https://calendly.com/alexis-brochu/15min" 
            target="_blank" 
            rel="noopener noreferrer" 
            className="w-14 h-14 bg-chart-2 rounded-full flex items-center justify-center hover:opacity-80 transition-all duration-300 hover:scale-110"
            data-testid="contact-calendar-icon"
          >
            <Calendar className="w-6 h-6 text-white" />
          </a>
        </div>
        
        {/* Key metrics - three columns at bottom */}
        <div className="grid grid-cols-3 gap-8 max-w-2xl mx-auto">
          <div className="text-center">
            <div className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-2">545.5%</div>
            <div className="text-sm text-white/70">User Growth</div>
          </div>
          <div className="text-center">
            <div className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-2">$244M</div>
            <div className="text-sm text-white/70">Projects Closed</div>
          </div>
          <div className="text-center">
            <div className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-2">75%</div>
            <div className="text-sm text-white/70">Tickets Reduced</div>
          </div>
        </div>
        
      </div>

      {/* Scroll indicator at bottom */}
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