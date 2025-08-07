import { Button } from "@/components/ui/button";
import { ArrowDown } from "lucide-react";

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
        <div className="max-w-4xl">
          <h1 className="text-5xl md:text-7xl font-black mb-6 leading-tight">
            <span className="gradient-text">
              Creative Visionary
            </span>
            <br />
            <span className="text-foreground">& Solution Factory</span>
          </h1>
          
          <p className="text-xl md:text-2xl text-muted-foreground mb-8 leading-relaxed">
            Transforming complex problems into intuitive solutions through product management, UX design, and creative innovation. From government tech modernization to startup product development.
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
            <div className="glass rounded-xl p-4 hover:glow-purple transition-all duration-300">
              <div className="text-3xl font-bold text-primary">545.5%</div>
              <div className="text-sm text-muted-foreground">User Base Increase</div>
            </div>
            <div className="glass rounded-xl p-4 hover:glow-blue transition-all duration-300">
              <div className="text-3xl font-bold text-chart-1">$244M</div>
              <div className="text-sm text-muted-foreground">Projects Closed</div>
            </div>
            <div className="glass rounded-xl p-4 hover:glow-purple transition-all duration-300">
              <div className="text-3xl font-bold text-chart-2">75%</div>
              <div className="text-sm text-muted-foreground">Support Tickets Reduced</div>
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
