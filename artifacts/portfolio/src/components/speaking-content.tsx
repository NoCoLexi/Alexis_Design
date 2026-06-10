import { useState, useEffect } from "react";
import { Link } from "wouter";
import { Mail, Mic, Mic2, Users, Brain, Cpu, Palette, CheckCircle, Sparkles, ExternalLink, X, Info } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import aixuxSummit2026Image from "@assets/image_1780102727229.png";
import aixuxSummit2025Image from "@assets/image_1780102819737.png";
import uxsgImage from "@assets/image_1780103054934.png";
import aiWithAlexisImage from "@assets/ai-with-alexis-podcast.png";
import corporateKeynotesImage from "@assets/corporate-keynotes-cover.png";

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

interface EngagementCard {
  org: string;
  year: string;
  topic: string;
  upcoming: boolean;
  tag: string | null;
  image?: string;
  link?: string;
  infoModal?: boolean;
  description: string;
  tags: string[];
}

const engagementCards: EngagementCard[] = [
  {
    org: 'AIxUX Summit 2026',
    year: '2026',
    topic: 'Agentic workflow',
    upcoming: true,
    tag: 'upcoming',
    image: aixuxSummit2026Image,
    link: 'https://uxsupportgroup.com/summit',
    description: 'Keynote on agentic AI workflows and how design teams can lead multi-agent orchestration.',
    tags: ['Keynote', 'Agentic AI', 'Conference']
  },
  {
    org: 'AIxUX Summit 2025',
    year: '2025',
    topic: 'AI & Product Design',
    upcoming: false,
    tag: null,
    image: aixuxSummit2025Image,
    link: 'https://uxsupportgroup.com/summit-2025',
    description: 'Presented on the intersection of AI and product design for UX practitioners.',
    tags: ['Talk', 'AI & Design', 'Conference']
  },
  {
    org: 'Upstart-Labs: AI Learn & Share',
    year: '2025-2026',
    topic: 'AI Learn and Share',
    upcoming: false,
    tag: null,
    image: uxsgImage,
    link: 'https://www.meetup.com/upstart-labs/',
    description: 'Recurring AI learning and knowledge-sharing sessions for an international community of product leaders, designers, developers, and entrepreneurs, based out of New York City.',
    tags: ['Workshop', 'AI Literacy', 'Meetup']
  },
  {
    org: 'AI with Upstart-Labs',
    year: '2026',
    topic: 'Weekly',
    upcoming: true,
    tag: 'Coming Soon',
    image: aiWithAlexisImage,
    description: 'Weekly podcast exploring practical AI applications for product teams and individuals.',
    tags: ['Podcast', 'AI Tools', 'Weekly']
  },
  {
    org: 'Corporate Keynotes',
    year: '2025-2026',
    topic: 'Enterprise AI',
    upcoming: false,
    tag: null,
    image: corporateKeynotesImage,
    infoModal: true,
    description: 'Private AI strategy workshops, keynotes, and briefings for enterprise and nonprofit organizations. Topics include agentic workflows, AI adoption, and product strategy.',
    tags: ['Keynote', 'Workshop', 'Enterprise', 'NDA']
  },
];

function CorporateInfoModal({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => { document.body.style.overflow = 'unset'; };
  }, [isOpen]);

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose(); };
    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
    }
    return () => document.removeEventListener('keydown', handleEscape);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4"
      onClick={onClose}
    >
      <div
        className="bg-gradient-to-br from-gray-900 to-black border border-purple-400/20 rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="sticky top-0 bg-gradient-to-r from-purple-600/10 to-blue-600/10 backdrop-blur border-b border-purple-400/20 p-6">
          <div className="flex justify-between items-center">
            <h2 className="text-2xl font-bold section-glow">Speaking Topics & Contact</h2>
            <Button
              variant="ghost"
              size="sm"
              onClick={onClose}
              className="text-white/70 hover:text-white hover:bg-white/10 transition-colors"
            >
              <X className="w-5 h-5" />
            </Button>
          </div>
        </div>

        {/* Content */}
        <div className="p-6 space-y-10">
          {/* Speaking Topics */}
          <div>
            <h3 className="text-xl font-bold mb-1 text-white">Speaking Topics</h3>
            <p className="text-muted-foreground mb-6 text-sm">
              Topics grouped by audience. Expand each to explore what we cover.
            </p>
            <Accordion type="single" collapsible className="w-full">
              {topicBuckets.map((bucket, bi) => (
                <AccordionItem key={bi} value={`bucket-${bi}`} className="border-border/50">
                  <AccordionTrigger className="text-left hover:no-underline">
                    <div className="flex flex-col items-start">
                      <span className="text-base font-semibold text-white">{bucket.bucketTitle}</span>
                      <span className="text-xs text-muted-foreground">{bucket.tagline}</span>
                    </div>
                  </AccordionTrigger>
                  <AccordionContent>
                    <p className="text-sm text-muted-foreground mb-4">{bucket.whyStatement}</p>
                    <div className="space-y-3">
                      {bucket.topics.map((topic, ti) => {
                        const Icon = topic.icon;
                        return (
                          <div key={ti} className="glass rounded-lg p-4">
                            <div className="flex items-start gap-3">
                              <div className="p-2 rounded-lg bg-purple-500/10 flex-shrink-0">
                                <Icon className="w-4 h-4 text-purple-400" />
                              </div>
                              <div>
                                <h4 className="text-sm font-semibold text-white mb-1">{topic.title}</h4>
                                <p className="text-xs text-muted-foreground mb-1">{topic.summary}</p>
                                <p className="text-xs text-gray-400 leading-relaxed">{topic.details}</p>
                              </div>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>

          {/* Divider */}
          <div className="border-t border-border/40" />

          {/* Contact CTA */}
          <div className="grid md:grid-cols-2 gap-10 items-start">
            <div>
              <h2 className="text-2xl font-bold mb-4 section-glow">Have Questions?</h2>
              <p className="text-muted-foreground mb-6 text-sm">
                Looking for a speaker for your next event? We would love to discuss how we can bring value to your audience.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <a
                  href="mailto:hello@upstart-labs.com?subject=Speaking%20Inquiry"
                  className="inline-flex items-center text-white/70 hover:text-white transition-colors gap-[8px]"
                  style={{
                    fontSize: "0.7rem", letterSpacing: "0.22em", textTransform: "uppercase",
                    fontWeight: 600, textDecoration: "none",
                  }}
                >
                  <Mail className="w-4 h-4" />
                  Contact Us
                </a>
                <Link
                  href="/"
                  className="inline-flex items-center text-white/70 hover:text-white transition-colors gap-[8px]"
                  style={{
                    fontSize: "0.7rem", letterSpacing: "0.22em", textTransform: "uppercase",
                    fontWeight: 600, textDecoration: "none",
                  }}
                >
                  View Our Portfolio
                </Link>
              </div>
            </div>

            <div className="bg-background/50 backdrop-blur-sm border border-border rounded-2xl p-6">
              <h3 className="text-lg font-semibold mb-4 text-purple-300">Popular Formats</h3>
              <ul className="space-y-3">
                {[
                  "Keynote Presentations (45-60 min)",
                  "Interactive Workshops (Half or Full Day)",
                  "Panel Discussions and Fireside Chats",
                  "Executive Briefings",
                  "Virtual and In-Person Events",
                ].map((format) => (
                  <li key={format} className="flex items-center gap-3 text-muted-foreground">
                    <CheckCircle className="w-5 h-5 text-green-400 flex-shrink-0" />
                    <span className="text-sm">{format}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function SpeakingContent() {
  const [isInfoModalOpen, setIsInfoModalOpen] = useState(false);

  return (
    <div>
      {/* Speaking Engagements Grid */}
      <div className="mb-16 pt-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {engagementCards.map((item, i) => (
            <div
              key={i}
              className="glass rounded-2xl overflow-hidden hover:glow-purple group transition-all duration-700"
              style={{
                backgroundColor: '#303032',
                transition: 'all 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94)'
              }}
            >
              {/* Image area */}
              <div className="aspect-video relative overflow-hidden">
                {item.image ? (
                  <>
                    <img
                      src={item.image}
                      alt={item.org}
                      className="w-[120%] h-[120%] max-w-none max-h-none object-cover object-center group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent pointer-events-none" />
                  </>
                ) : (
                  <div className="w-full h-full bg-gradient-to-br from-purple-900/60 to-blue-900/60 flex items-center justify-center">
                    <Mic2 className="w-12 h-12 text-purple-400/60" />
                    <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent pointer-events-none" />
                  </div>
                )}
                {item.tag && (
                  <div className="absolute top-4 left-4">
                    <Badge variant="secondary" className="bg-purple-500/80 text-white border-purple-400/50 text-xs font-semibold">
                      {item.tag}
                    </Badge>
                  </div>
                )}
              </div>

              {/* Content area */}
              <div className="p-6">
                <div className="flex flex-wrap gap-2 mb-3">
                  {item.tags.map((tag, ti) => (
                    <Badge key={ti} variant="outline" className="text-xs">
                      {tag}
                    </Badge>
                  ))}
                </div>

                <h3 className="text-xl font-bold mb-1 group-hover:text-primary transition-colors">
                  {item.org}
                </h3>
                <p className="text-xs text-white/40 mb-3">{item.year}</p>
                <p className="text-sm text-muted-foreground mb-4 leading-relaxed">
                  {item.description}
                </p>

                {item.link && (
                  <a
                    href={item.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={(e) => e.stopPropagation()}
                    className="inline-flex items-center gap-2 text-sm font-semibold text-primary hover:text-primary/80 transition-colors"
                  >
                    <ExternalLink className="w-4 h-4" />
                    View Event
                  </a>
                )}

                {item.infoModal && (
                  <button
                    onClick={() => setIsInfoModalOpen(true)}
                    className="inline-flex items-center gap-2 text-sm font-semibold text-primary hover:text-primary/80 transition-colors"
                  >
                    <Info className="w-4 h-4" />
                    More Information
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      <CorporateInfoModal isOpen={isInfoModalOpen} onClose={() => setIsInfoModalOpen(false)} />
    </div>
  );
}
