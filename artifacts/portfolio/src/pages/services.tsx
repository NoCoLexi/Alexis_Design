import { useEffect } from "react";
import { Link } from "wouter";
import { ArrowLeft } from "lucide-react";
import SpeakingContent from "@/components/speaking-content";

export default function Services() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-background text-foreground" style={{ backgroundColor: '#08080A' }}>
      {/* Navigation Bar */}
      <nav className="fixed top-0 left-0 right-0 w-full z-50 bg-gradient-to-r from-background/95 via-primary/20 to-background/95 backdrop-blur-lg border-b border-primary/30 shadow-lg">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex justify-between items-center">
            <Link href="/#work" className="flex items-center gap-2 text-white hover:text-purple-400 transition-colors">
              <ArrowLeft className="w-5 h-5" />
              <span className="font-medium">Back to Portfolio</span>
            </Link>
            <div className="logo-style flex items-center">
              <span className="name-first text-white font-bold text-xl">UPSTART</span>
              <span className="name-last text-purple-400 font-bold text-xl">-Labs</span>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-32 pb-16 px-6 relative">
        <div className="absolute inset-0 gradient-bg-secondary opacity-30"></div>
        <div className="absolute inset-0 opacity-20">
          <div className="w-full h-full bg-gradient-to-br from-primary/20 via-transparent to-chart-1/20"></div>
        </div>
        <div className="max-w-4xl mx-auto text-center relative z-10">
          <h1 className="text-4xl md:text-6xl font-bold mb-6" style={{ fontFamily: 'Montserrat, sans-serif', color: '#F3E8B9' }}>
            Equip Your Team to Thrive<br />in the AI Era
          </h1>
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            Practical, engaging sessions that turn uncertainty into confidence for conferences, and team workshops.
          </p>
        </div>
      </section>

      {/* Shared Speaking Content */}
      <div className="px-6 pb-16">
        <div className="max-w-6xl mx-auto">
          <SpeakingContent />
        </div>
      </div>

      {/* Footer */}
      <footer className="py-8 px-6 border-t border-border">
        <div className="max-w-4xl mx-auto text-center text-muted-foreground text-sm">
          <p>&copy; {new Date().getFullYear()} Upstart-Labs. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
