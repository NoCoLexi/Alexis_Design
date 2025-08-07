import { Button } from "@/components/ui/button";
import { ArrowDown, Award, Sparkles } from "lucide-react";
import MusicPlayer from "@/components/music-player";

export default function HeroSection() {
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

  return (
    <section id="home" className="min-h-screen flex items-center relative overflow-hidden">
      <div className="absolute inset-0 gradient-bg-secondary opacity-30"></div>
      <div className="absolute inset-0 opacity-20">
        <div className="w-full h-full bg-gradient-to-br from-primary/20 via-transparent to-chart-1/20"></div>
      </div>
      
      <div className="relative z-10 max-w-7xl mx-auto px-6 py-20">
        <div className="max-w-4xl">
          {/* Badges */}
          <div className="flex flex-wrap gap-3 mb-8">
            <div className="inline-flex items-center gap-3 glass rounded-full px-6 py-3 hover:glow-purple transition-all duration-300">
              <Award className="w-5 h-5 text-chart-3" />
              <span className="text-sm font-medium text-foreground">
                2023 California Government Technology Innovation Award Winner
              </span>
            </div>
            <div className="inline-flex items-center gap-2 glass rounded-full px-4 py-2 hover:glow-blue transition-all duration-300">
              <Sparkles className="w-4 h-4 text-chart-1" />
              <span className="text-xs font-medium text-muted-foreground">
                AI-Enhanced Portfolio
              </span>
            </div>
          </div>
          
          <h1 className="text-5xl md:text-7xl font-black mb-6 leading-tight">
            <span className="gradient-text">
              Product Visionary
            </span>
            <br />
            <span className="text-foreground">& UX Strategist</span>
          </h1>
          
          <p className="text-xl md:text-2xl text-muted-foreground mb-8 leading-relaxed">
            I'm the human on your IT team. Working together, diving into the problems, finding solutions that actually make sense, and creating products users adore.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 mb-8">
            <Button 
              onClick={scrollToWork}
              className="px-8 py-4 gradient-bg-primary hover:opacity-90 rounded-xl font-semibold text-lg transition-all duration-300 glow-purple"
            >
              View My Work
            </Button>
            <Button 
              variant="outline"
              onClick={scrollToContact}
              className="px-8 py-4 border-2 border-primary hover:bg-primary hover:text-primary-foreground rounded-xl font-semibold text-lg transition-all duration-300"
            >
              Let's Connect
            </Button>
          </div>

          {/* Music Player */}
          <div className="mb-12">
            <MusicPlayer />
          </div>
          
          {/* Key Metrics */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-card/60 backdrop-blur-md border border-primary/20 rounded-xl p-4 hover:glow-purple transition-all duration-300">
              <div className="text-3xl font-bold" style={{ color: '#F3E8B9' }}>545.5%</div>
              <div className="text-sm text-white/80">User Base Increase</div>
            </div>
            <div className="bg-card/60 backdrop-blur-md border border-accent/20 rounded-xl p-4 hover:glow-blue transition-all duration-300">
              <div className="text-3xl font-bold" style={{ color: '#F3E8B9' }}>$244M</div>
              <div className="text-sm text-white/80">Projects Closed</div>
            </div>
            <div className="bg-card/60 backdrop-blur-md border border-primary/20 rounded-xl p-4 hover:glow-purple transition-all duration-300">
              <div className="text-3xl font-bold" style={{ color: '#F3E8B9' }}>75%</div>
              <div className="text-sm text-white/80">Support Tickets Reduced</div>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div 
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce cursor-pointer hover:text-primary transition-colors z-20 p-2"
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
