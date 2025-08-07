import { Button } from "@/components/ui/button";
import { ArrowDown } from "lucide-react";
import ABCLogo from "@/components/abc-logo";

export default function HeroSection() {
  const scrollToWork = () => {
    const element = document.getElementById('work');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
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
        <div className="flex items-center gap-8 mb-8">
          <ABCLogo size="lg" />
        </div>
        <div className="max-w-4xl">
          <h1 className="text-5xl md:text-7xl font-black mb-6 leading-tight">
            <span className="text-abc-green font-bold">
              BROADCAST DESIGN
            </span>
            <br />
            <span className="text-foreground">& PRODUCT INNOVATION</span>
          </h1>
          
          <p className="text-xl md:text-2xl text-muted-foreground mb-8 leading-relaxed">
            Professional broadcast design and creative direction for television networks, combining traditional media excellence with modern digital innovation. Specializing in brand identity systems and visual storytelling.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 mb-12">
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
          
          {/* Key Metrics */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="glass rounded-xl p-4 hover:shadow-lg transition-all duration-300 border border-abc-green/20">
              <div className="text-3xl font-bold text-abc-green">15+</div>
              <div className="text-sm text-muted-foreground">BROADCAST CAMPAIGNS</div>
            </div>
            <div className="glass rounded-xl p-4 hover:shadow-lg transition-all duration-300 border border-abc-green/20">
              <div className="text-3xl font-bold text-abc-green">7</div>
              <div className="text-sm text-muted-foreground">NETWORK PARTNERS</div>
            </div>
            <div className="glass rounded-xl p-4 hover:shadow-lg transition-all duration-300 border border-abc-green/20">
              <div className="text-3xl font-bold text-abc-green">100%</div>
              <div className="text-sm text-muted-foreground">ON-AIR SUCCESS RATE</div>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <ArrowDown className="w-6 h-6 text-muted-foreground" />
      </div>
    </section>
  );
}
