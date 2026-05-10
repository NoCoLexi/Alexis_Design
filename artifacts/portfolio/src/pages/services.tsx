import { useState, useEffect } from "react";
import { Link } from "wouter";
import { ArrowLeft, Mail, Mic, Mic2, Users, Brain, Cpu, Palette, CheckCircle, Sparkles, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";

const topicBuckets = [
  {
    bucketTitle: "For Individuals",
    tagline: "Sharpen your professional edge",
    whyStatement: "Stand out, communicate with impact, and work smarter in a noisy world.",
    topics: [
      {
        title: "Presentation Techniques",
        summary: "Compelling presentations that captivate and drive action",
        details: "Structure your message, design visuals that support your point, and deliver with confidence. A repeatable framework for any room.",
        icon: Mic
      },
      {
        title: "Getting Buy-In for Your Work",
        summary: "Build consensus and secure stakeholder support",
        details: "Understand what motivates different stakeholders, frame ideas in their terms, and know when to push and when to listen.",
        icon: Users
      },
      {
        title: "Organizing Your Ideas with AI",
        summary: "Use AI to capture, structure, and resurface your best thinking",
        details: "Practical ways to use AI as a second brain: capturing ideas, connecting notes, and building a personal system that grows with you.",
        icon: Brain
      }
    ]
  },
  {
    bucketTitle: "For Leaders",
    tagline: "Guide your team through change",
    whyStatement: "Your people are looking to you for direction. These topics help you lead the AI transition with clarity and confidence.",
    topics: [
      {
        title: "Leading Through AI Anxiety",
        summary: "Help your team see AI as an amplifier, not a threat",
        details: "Address unspoken fears about job security. Reframe the conversation, model healthy AI use, and create space for safe experimentation.",
        icon: Brain
      },
      {
        title: "Implementing AI for Executives",
        summary: "AI adoption strategy, governance, and org transformation",
        details: "Cut through the hype. Understand what adoption actually requires, from selecting use cases to building governance frameworks. No technical background needed.",
        icon: Cpu
      },
      {
        title: "Utilizing AI for Teams",
        summary: "Integrate AI tools into team workflows that actually stick",
        details: "Move beyond individual use to team-wide integration. Identify high-impact workflows, establish shared practices, and measure results.",
        icon: Sparkles
      }
    ]
  },
  {
    bucketTitle: "Foundational Principles",
    tagline: "The why behind the practices",
    whyStatement: "Tools change. Principles endure. Build the mental models that hold up as technology evolves.",
    topics: [
      {
        title: "Experience Design for Everything",
        summary: "Apply user-centered design beyond digital products",
        details: "Design thinking works beyond apps. Apply user-centered principles to meetings, processes, and communications.",
        icon: Palette
      },
      {
        title: "The Importance of Human QA",
        summary: "Why human review stays critical in an automated world",
        details: "Automation scales output, but humans catch what machines miss. Learn where human review adds the most value and how to design effective QA checkpoints.",
        icon: CheckCircle
      },
      {
        title: "The Ethics of AI at Work",
        summary: "Navigating responsibility and fairness when deploying AI",
        details: "Who's accountable when AI makes a mistake? Explore the ethical questions without easy answers and practical frameworks for working through them.",
        icon: Brain
      }
    ]
  }
];

export default function Services() {
  const [expandedBuckets, setExpandedBuckets] = useState<number[]>([]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const toggleBucket = (index: number) => {
    setExpandedBuckets(prev => 
      prev.includes(index) ? prev.filter(i => i !== index) : [...prev, index]
    );
  };

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
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-3 mb-2">
              <Sparkles className="w-6 h-6 text-purple-400" />
              <h2 className="text-4xl md:text-5xl font-bold" style={{ fontFamily: 'Montserrat, sans-serif' }}>
                <span className="gradient-text">Speaking Topics</span>
              </h2>
              <Sparkles className="w-6 h-6 text-blue-400" />
            </div>
          </div>
          
          {/* Category Cards - 3 Across with Expandable Topics */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-start">
            {topicBuckets.map((bucket, bucketIndex) => (
              <div key={bucketIndex} className="flex flex-col">
                {/* Category Header - Clickable Card */}
                <button
                  onClick={() => toggleBucket(bucketIndex)}
                  className="text-left p-6 rounded-2xl border-2 border-purple-500/30 bg-gradient-to-b from-purple-900/20 to-transparent backdrop-blur-sm hover:border-purple-400/50 hover:from-purple-900/30 transition-all duration-300 flex-1"
                  data-testid={`button-expand-bucket-${bucketIndex}`}
                >
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1">
                      <h3 className="text-2xl font-bold mb-2" style={{ fontFamily: 'Montserrat, sans-serif', color: '#F3E8B9' }}>
                        {bucket.bucketTitle}
                      </h3>
                      <p className="text-purple-300 text-base italic mb-2">
                        {bucket.tagline}
                      </p>
                      <p className="text-muted-foreground text-sm">
                        {bucket.whyStatement}
                      </p>
                    </div>
                    <ChevronDown 
                      className={`w-6 h-6 text-purple-400 flex-shrink-0 transition-transform duration-300 ${expandedBuckets.includes(bucketIndex) ? 'transform rotate-180' : ''}`}
                    />
                  </div>
                </button>

                {/* Topics - Shown when expanded */}
                {expandedBuckets.includes(bucketIndex) && (
                  <div className="mt-4 space-y-3">
                    {bucket.topics.map((topic, topicIndex) => (
                      <div 
                        key={topicIndex}
                        className="group p-4 rounded-xl border border-border bg-background/50 backdrop-blur-sm hover:border-purple-500/50 hover:bg-purple-500/5 transition-all duration-300"
                        data-testid={`card-topic-${bucketIndex}-${topicIndex}`}
                      >
                        <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-purple-600/20 to-blue-600/20 flex items-center justify-center mb-2 group-hover:from-purple-600/30 group-hover:to-blue-600/30 transition-all">
                          <topic.icon className="w-5 h-5 text-purple-400" />
                        </div>
                        <h4 className="text-base font-semibold mb-1 text-white group-hover:text-purple-300 transition-colors">
                          {topic.title}
                        </h4>
                        <p className="text-muted-foreground text-xs leading-relaxed mb-2">
                          {topic.summary}
                        </p>
                        <details className="text-muted-foreground/80 text-xs leading-relaxed">
                          <summary className="cursor-pointer text-purple-400 hover:text-purple-300 font-medium">
                            Learn more
                          </summary>
                          <p className="mt-2 pl-2 border-l-2 border-purple-500/30">
                            {topic.details}
                          </p>
                        </details>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Where I've Spoken */}
      <section className="py-16 px-6 border-t border-white/10">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-10">
            <div className="inline-flex items-center gap-3 mb-2">
              <Mic2 className="w-6 h-6 text-purple-400" />
              <h2 className="text-4xl md:text-5xl font-bold" style={{ fontFamily: 'Montserrat, sans-serif' }}>
                <span className="gradient-text">Where I've Spoken</span>
              </h2>
            </div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { org: 'AIxUX Summit', year: '2025', topic: 'AI & Product Design', upcoming: false, tag: null },
              { org: 'AIxUX Summit 2026', year: '2026', topic: 'Agentic workflow', upcoming: true, tag: 'upcoming' },
              { org: 'UXSG', year: '2025-2026', topic: 'AI Learn and Share', upcoming: false, tag: null },
              { org: 'Enterprise FinTech', year: '2026', topic: 'AI Strategy (NDA)', upcoming: false, tag: null },
              { org: 'American Red Cross', year: '2026', topic: 'NotebookLM', upcoming: false, tag: null },
              { org: 'PMI', year: '2026', topic: 'TBA', upcoming: true, tag: 'upcoming' },
            ].map((item, i) => (
              <div
                key={i}
                className="relative rounded-2xl border border-purple-500/20 bg-gradient-to-b from-purple-900/20 to-transparent backdrop-blur-sm p-6 flex flex-col gap-2"
              >
                {item.tag && (
                  <span className="absolute top-4 right-4 text-xs font-semibold px-2 py-0.5 rounded-full bg-purple-500/20 text-purple-300 border border-purple-500/30">
                    {item.tag}
                  </span>
                )}
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-purple-600/30 to-blue-600/30 flex items-center justify-center">
                  <Mic2 className="w-5 h-5 text-purple-400" />
                </div>
                <div className="font-bold text-white text-base leading-snug">{item.org}</div>
                <div className="text-xs text-white/40">{item.year}</div>
                <div className="text-sm text-purple-300 font-medium">Keynote: {item.topic}</div>
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
                Looking for a speaker for your next event? I'd love to discuss how I can bring value to your audience.
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
