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
      
      <div className="relative z-10 max-w-7xl mx-auto px-6 py-20">
        <div className="max-w-4xl">
          {/* Simplified Badge */}
          <div className="mb-6">
            <div 
              className="inline-flex items-center gap-3 glass rounded-full px-6 py-3 hover:glow-purple transition-all duration-300 cursor-pointer"
              onClick={scrollToAbout}
            >
              <Award className="w-5 h-5 text-chart-3" />
              <span className="text-sm font-medium text-foreground">
                2023 CA Gov Tech Innovation Award Winner
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
          
          <p className="text-xl md:text-2xl text-muted-foreground mb-12 leading-relaxed max-w-3xl">
            I'm the human on your IT team. Working together with AI-enhanced insights, diving into the problems, finding solutions that actually make sense, and creating products users adore.
          </p>
          
          <div className="flex flex-col lg:flex-row gap-6 items-start lg:items-center mb-16">
            <div className="flex flex-col sm:flex-row gap-4">
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
            <div className="flex-shrink-0">
              <MusicPlayer />
            </div>
          </div>
          
          {/* Key Metrics - More Compact */}
          <div className="grid grid-cols-3 gap-4 max-w-2xl">
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
