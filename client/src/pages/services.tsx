import { Link } from "wouter";
import { ArrowLeft, Mail, Mic, Users, Brain, Cpu, Palette, CheckCircle, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";

const topicBuckets = [
  {
    bucketTitle: "For Individuals",
    tagline: "Sharpening your professional edge",
    whyStatement: "These skills help you stand out, communicate with impact, and work smarter — whether you're pitching an idea, rallying support, or just trying to stay organized in a noisy world.",
    topics: [
      {
        title: "Presentation Techniques",
        summary: "Master the art of compelling presentations that captivate audiences and drive action",
        details: "Learn how to structure your message, design visuals that support (not distract), and deliver with confidence. Walk away with a repeatable framework for any presentation — from team updates to executive pitches.",
        icon: Mic
      },
      {
        title: "Getting Buy-In for Your Work",
        summary: "Strategic approaches to building consensus and securing stakeholder support for your initiatives",
        details: "Understand what motivates different stakeholders, how to frame your ideas in terms of their priorities, and when to push versus when to listen. Turn \"no\" and \"maybe\" into momentum.",
        icon: Users
      },
      {
        title: "Organizing Your Ideas with AI",
        summary: "Using AI to capture, structure, and resurface your notes and thoughts",
        details: "Discover practical ways to use AI as a second brain — capturing fleeting ideas, connecting scattered notes, and resurfacing relevant thoughts when you need them. Build a personal system that grows with you.",
        icon: Brain
      }
    ]
  },
  {
    bucketTitle: "For Leaders",
    tagline: "Guiding your team through change",
    whyStatement: "AI is reshaping how teams work, and your people are looking to you for direction. These topics help you lead the transition with clarity, reduce fear, and unlock your team's potential.",
    topics: [
      {
        title: "Leading Through AI Anxiety",
        summary: "Helping your team embrace AI as an amplifier, not a replacement",
        details: "Address the unspoken fears your team has about AI and job security. Learn how to reframe the conversation, model healthy AI use, and create an environment where experimentation feels safe.",
        icon: Brain
      },
      {
        title: "Implementing AI for Executives",
        summary: "Executive-level guidance on AI adoption strategies, governance, and organizational transformation",
        details: "Cut through the hype and understand what AI adoption actually requires — from selecting the right use cases to building governance frameworks. Make informed decisions without needing a technical background.",
        icon: Cpu
      },
      {
        title: "Utilizing AI for Teams",
        summary: "Practical frameworks for integrating AI tools into team workflows and boosting productivity",
        details: "Move beyond individual AI use to team-wide integration. Learn how to identify high-impact workflows, establish shared practices, and measure what's actually working.",
        icon: Sparkles
      }
    ]
  },
  {
    bucketTitle: "Foundational Principles",
    tagline: "The \"why\" behind the practices",
    whyStatement: "Tools and tactics change, but principles endure. These topics give you the mental models to make better decisions — even when the technology evolves.",
    topics: [
      {
        title: "Experience Design for Everything",
        summary: "Applying user-centered design principles beyond digital products to transform any experience",
        details: "Design thinking isn't just for apps and websites. Learn how to apply user-centered principles to meetings, processes, communications, and any experience you're responsible for shaping.",
        icon: Palette
      },
      {
        title: "The Importance of Human QA",
        summary: "Why human quality assurance remains critical in an increasingly automated world",
        details: "Automation can scale output, but humans catch what machines miss. Understand where human review adds the most value, how to design effective QA checkpoints, and why \"good enough\" from AI often isn't.",
        icon: CheckCircle
      },
      {
        title: "The Ethics of AI at Work",
        summary: "Navigating responsibility, transparency, and fairness when deploying AI tools",
        details: "Who's accountable when AI makes a mistake? What do you owe your customers and colleagues in terms of transparency? Explore the ethical questions that don't have easy answers — and frameworks for thinking through them.",
        icon: Brain
      }
    ]
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
            <Link href="/#work" className="flex items-center gap-2 text-white hover:text-purple-400 transition-colors">
              <ArrowLeft className="w-5 h-5" />
              <span className="font-medium">Back to Portfolio</span>
            </Link>
            <div className="logo-style flex items-center">
              <span className="name-first text-white font-bold text-xl">Alexis</span>
              <span className="name-last text-purple-400 font-bold text-xl">Brochu</span>
              <span className="text-purple-400 font-light text-xl ml-1">PMP, CMP</span>
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
            Equip Your Team to Thrive in the AI Era
          </h1>
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            Practical, engaging sessions that turn uncertainty into confidence — for conferences, corporate events, and team workshops.
          </p>
          <a 
            href="mailto:alexis.brochu@gmail.com?subject=Speaking%20Inquiry"
            className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-500 hover:to-blue-500 text-white px-8 py-6 text-lg rounded-xl inline-flex items-center justify-center font-semibold transition-all duration-300 transform hover:scale-105"
            data-testid="button-contact-hero"
          >
            <Mail className="w-5 h-5 mr-2" />
            Book a Speaking Engagement
          </a>
        </div>
      </section>

      {/* Speaking Topics Grid */}
      <section className="py-16 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-3 mb-2">
              <Sparkles className="w-6 h-6 text-purple-400" />
              <h2 className="text-4xl md:text-5xl font-bold" style={{ fontFamily: 'Montserrat, sans-serif' }}>
                <span className="gradient-text">Speaking Topics</span>
              </h2>
              <Sparkles className="w-6 h-6 text-blue-400" />
            </div>
            <p className="text-muted-foreground text-lg">Transformative presentations on AI, change management, and experience design for conferences and team workshops.</p>
          </div>
          
          {/* Bucket Headers - Horizontal Layout */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            {topicBuckets.map((bucket, bucketIndex) => (
              <div 
                key={bucketIndex} 
                className="text-center p-6 rounded-2xl border-2 border-purple-500/30 bg-gradient-to-b from-purple-900/20 to-transparent backdrop-blur-sm"
              >
                <h3 className="text-2xl font-bold mb-2" style={{ fontFamily: 'Montserrat, sans-serif', color: '#F3E8B9' }}>
                  {bucket.bucketTitle}
                </h3>
                <p className="text-purple-300 text-base italic mb-3">
                  {bucket.tagline}
                </p>
                <p className="text-muted-foreground text-sm">
                  {bucket.whyStatement}
                </p>
              </div>
            ))}
          </div>

          {/* Topic Cards - Grid with Visual Separators */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {topicBuckets.map((bucket, bucketIndex) => (
              <div 
                key={bucketIndex} 
                className="space-y-4 relative"
              >
                {/* Vertical separator line */}
                {bucketIndex < topicBuckets.length - 1 && (
                  <div className="hidden md:block absolute top-0 -right-4 bottom-0 w-px bg-gradient-to-b from-transparent via-purple-500/30 to-transparent"></div>
                )}
                
                {/* Topic Cards */}
                {bucket.topics.map((topic, topicIndex) => (
                  <div 
                    key={topicIndex}
                    className="group p-5 rounded-xl border border-border bg-background/50 backdrop-blur-sm hover:border-purple-500/50 hover:bg-purple-500/5 transition-all duration-300"
                    data-testid={`card-topic-${bucketIndex}-${topicIndex}`}
                  >
                    <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-purple-600/20 to-blue-600/20 flex items-center justify-center mb-3 group-hover:from-purple-600/30 group-hover:to-blue-600/30 transition-all">
                      <topic.icon className="w-5 h-5 text-purple-400" />
                    </div>
                    <h4 className="text-lg font-semibold mb-2 text-white group-hover:text-purple-300 transition-colors">
                      {topic.title}
                    </h4>
                    <p className="text-muted-foreground text-xs leading-relaxed mb-2">
                      {topic.summary}
                    </p>
                    <details className="text-muted-foreground/80 text-xs leading-relaxed">
                      <summary className="cursor-pointer text-purple-400 hover:text-purple-300 font-medium mb-2">
                        Learn more
                      </summary>
                      <p className="mt-2 pl-2 border-l-2 border-purple-500/30">
                        {topic.details}
                      </p>
                    </details>
                  </div>
                ))}
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
