import { Link } from "wouter";
import { ArrowLeft, Mail, Mic, Users, Brain, Cpu, Palette, CheckCircle, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";

const speakingTopics = [
  {
    title: "Presentation Techniques",
    description: "Master the art of compelling presentations that captivate audiences and drive action.",
    icon: Mic
  },
  {
    title: "Getting Buy-In for Your Work",
    description: "Strategic approaches to building consensus and securing stakeholder support for your initiatives.",
    icon: Users
  },
  {
    title: "The Importance of Human QA",
    description: "Why human quality assurance remains critical in an increasingly automated world.",
    icon: CheckCircle
  },
  {
    title: "Importance of Human in the Loop",
    description: "Balancing AI capabilities with human oversight for optimal outcomes and safety.",
    icon: Brain
  },
  {
    title: "Implementing AI for Executives",
    description: "Executive-level guidance on AI adoption strategies, governance, and organizational transformation.",
    icon: Cpu
  },
  {
    title: "Utilizing AI for Teams",
    description: "Practical frameworks for integrating AI tools into team workflows and boosting productivity.",
    icon: Sparkles
  },
  {
    title: "Experience Design for Everything",
    description: "Applying user-centered design principles beyond digital products to transform any experience.",
    icon: Palette
  }
];

export default function Services() {
  const scrollToContact = () => {
    const contactSection = document.getElementById('services-contact');
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-background text-foreground" style={{ backgroundColor: '#08080A' }}>
      {/* Navigation Bar */}
      <nav className="fixed top-0 left-0 right-0 w-full z-50 bg-gradient-to-r from-background/95 via-primary/20 to-background/95 backdrop-blur-lg border-b border-primary/30 shadow-lg">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex justify-between items-center">
            <Link href="/" className="flex items-center gap-2 text-white hover:text-purple-400 transition-colors">
              <ArrowLeft className="w-5 h-5" />
              <span className="font-medium">Back to Portfolio</span>
            </Link>
            <div className="flex items-center gap-4">
              <span className="name-first text-white font-bold text-xl">Alexis</span>
              <span className="name-last text-purple-400 font-bold text-xl">Brochu</span>
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
            Speaking & Workshops
          </h1>
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            Engaging presentations on AI, product leadership, and experience design for conferences, corporate events, and team workshops.
          </p>
          <button 
            onClick={scrollToContact}
            className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-500 hover:to-blue-500 text-white px-8 py-6 text-lg rounded-xl inline-flex items-center justify-center font-semibold transition-all duration-300 transform hover:scale-105"
            data-testid="button-contact-hero"
          >
            <Mail className="w-5 h-5 mr-2" />
            Book a Speaking Engagement
          </button>
        </div>
      </section>

      {/* Speaking Topics Grid */}
      <section className="py-16 px-6">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold mb-12 text-center">
            <span className="gradient-text">Speaking Topics</span>
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {speakingTopics.map((topic, index) => (
              <div 
                key={index}
                className="group p-6 rounded-2xl border border-border bg-background/50 backdrop-blur-sm hover:border-purple-500/50 hover:bg-purple-500/5 transition-all duration-300"
                data-testid={`card-topic-${index}`}
              >
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-purple-600/20 to-blue-600/20 flex items-center justify-center mb-4 group-hover:from-purple-600/30 group-hover:to-blue-600/30 transition-all">
                  <topic.icon className="w-6 h-6 text-purple-400" />
                </div>
                <h3 className="text-xl font-semibold mb-2 text-white group-hover:text-purple-300 transition-colors">
                  {topic.title}
                </h3>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  {topic.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact CTA Section */}
      <section id="services-contact" className="py-20 px-6 relative">
        <div className="absolute inset-0 bg-gradient-to-t from-purple-900/20 to-transparent"></div>
        
        <div className="max-w-4xl mx-auto relative z-10">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            {/* Left side - CTA */}
            <div className="text-center md:text-left">
              <h2 className="text-3xl font-bold mb-4" style={{ color: '#F3E8B9' }}>
                Have Questions?
              </h2>
              <p className="text-muted-foreground mb-6">
                Looking for a speaker for your next event? I'd love to discuss how I can bring value to your audience with engaging, actionable insights.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <a 
                  href="mailto:alexis.brochu@gmail.com?subject=Speaking%20Inquiry"
                  className="inline-flex items-center justify-center gap-2 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-500 hover:to-blue-500 text-white px-6 py-4 rounded-xl font-semibold transition-all duration-300 transform hover:scale-105"
                  data-testid="button-contact-email"
                >
                  <Mail className="w-5 h-5" />
                  Contact Me
                </a>
                <Link 
                  href="/"
                  className="inline-flex items-center justify-center gap-2 border-2 border-white/30 hover:border-purple-400 text-white px-6 py-4 rounded-xl font-semibold transition-all duration-300 hover:bg-white/5"
                  data-testid="link-view-portfolio"
                >
                  View My Portfolio
                </Link>
              </div>
            </div>
            
            {/* Right side - Quick list */}
            <div className="bg-background/50 backdrop-blur-sm border border-border rounded-2xl p-6">
              <h3 className="text-lg font-semibold mb-4 text-purple-300">Popular Formats</h3>
              <ul className="space-y-3">
                <li className="flex items-center gap-3 text-muted-foreground">
                  <CheckCircle className="w-5 h-5 text-green-400 flex-shrink-0" />
                  <span>Keynote Presentations (45-60 min)</span>
                </li>
                <li className="flex items-center gap-3 text-muted-foreground">
                  <CheckCircle className="w-5 h-5 text-green-400 flex-shrink-0" />
                  <span>Interactive Workshops (Half or Full Day)</span>
                </li>
                <li className="flex items-center gap-3 text-muted-foreground">
                  <CheckCircle className="w-5 h-5 text-green-400 flex-shrink-0" />
                  <span>Panel Discussions & Fireside Chats</span>
                </li>
                <li className="flex items-center gap-3 text-muted-foreground">
                  <CheckCircle className="w-5 h-5 text-green-400 flex-shrink-0" />
                  <span>Executive Briefings</span>
                </li>
                <li className="flex items-center gap-3 text-muted-foreground">
                  <CheckCircle className="w-5 h-5 text-green-400 flex-shrink-0" />
                  <span>Virtual & In-Person Events</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 px-6 border-t border-border">
        <div className="max-w-4xl mx-auto text-center text-muted-foreground text-sm">
          <p>&copy; {new Date().getFullYear()} Alexis Brochu. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
