import { Link } from "wouter";
import { Mail, Mic, Mic2, Users, Brain, Cpu, Palette, CheckCircle, Sparkles, ExternalLink, ChevronDown } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from "@/components/ui/accordion";
import aixuxSummitCoverImage from "@assets/aixux-3d-agent-cover.png";

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
    image: aixuxSummitCoverImage,
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
    link: 'https://uxsupportgroup.com/summit-2025',
    description: 'Presented on the intersection of AI and product design for UX practitioners.',
    tags: ['Talk', 'AI & Design', 'Conference']
  },
  {
    org: 'UXSG: AI Learn & Share series',
    year: '2025-2026',
    topic: 'AI Learn and Share',
    upcoming: false,
    tag: null,
    description: 'Recurring AI learning and knowledge-sharing sessions for an international community of product leaders, designers, developers, and entrepreneurs, based out of New York City.',
    tags: ['Workshop', 'AI Literacy', 'Meetup']
  },
  {
    org: 'AI with Alexis',
    year: '2026',
    topic: 'Weekly',
    upcoming: false,
    tag: null,
    description: 'Weekly podcast exploring practical AI applications for product teams and individuals.',
    tags: ['Podcast', 'AI Tools', 'Weekly']
  },
  {
    org: 'Enterprise FinTech',
    year: '2026',
    topic: 'AI Strategy (NDA)',
    upcoming: false,
    tag: null,
    description: 'Confidential AI strategy engagement with an enterprise FinTech organization.',
    tags: ['Workshop', 'AI Strategy', 'Enterprise']
  },
  {
    org: 'American Red Cross',
    year: '2026',
    topic: 'NotebookLM',
    upcoming: false,
    tag: null,
    description: 'Introduced NotebookLM to Red Cross teams as a knowledge management and synthesis tool.',
    tags: ['Workshop', 'AI Tools', 'Nonprofit']
  },
  {
    org: 'PMI',
    year: '2026',
    topic: 'TBA',
    upcoming: true,
    tag: 'upcoming',
    description: 'Upcoming session for Project Management Institute members. Topic to be announced.',
    tags: ['Talk', 'AI & PM', 'Upcoming']
  },
];

export default function SpeakingContent() {
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
                      className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-500"
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
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Speaking Topics */}
      <div className="mb-16 max-w-4xl mx-auto">
        <h3 className="text-2xl font-bold mb-2 text-center section-glow">Speaking Topics</h3>
        <p className="text-center text-muted-foreground mb-6 text-sm">
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

      {/* Contact CTA */}
      <div className="py-12 relative">
        <div className="max-w-4xl mx-auto relative z-10">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="text-center md:text-left">
              <h2 className="text-3xl font-bold mb-4 section-glow">
                Have Questions?
              </h2>
              <p className="text-muted-foreground mb-6">
                Looking for a speaker for your next event? We would love to discuss how we can bring value to your audience.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <a
                  href="mailto:alexis@upstart-labs.com?subject=Speaking%20Inquiry"
                  className="inline-flex items-center text-white/70 hover:text-white transition-colors gap-[8px] pb-[3px]"
                  style={{
                    fontSize: "0.7rem", letterSpacing: "0.22em", textTransform: "uppercase",
                    fontWeight: 600, textDecoration: "none",
                    borderBottom: "1px solid rgba(255,255,255,0.25)", paddingBottom: "3px",
                  }}
                >
                  <Mail className="w-4 h-4" />
                  Contact Us
                </a>
                <Link
                  href="/"
                  className="inline-flex items-center text-white/70 hover:text-white transition-colors gap-[8px] pb-[3px]"
                  style={{
                    fontSize: "0.7rem", letterSpacing: "0.22em", textTransform: "uppercase",
                    fontWeight: 600, textDecoration: "none",
                    borderBottom: "1px solid rgba(255,255,255,0.25)", paddingBottom: "3px",
                  }}
                >
                  View Our Portfolio
                </Link>
              </div>
            </div>

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
                  <span>Panel Discussions and Fireside Chats</span>
                </li>
                <li className="flex items-center gap-3 text-muted-foreground">
                  <CheckCircle className="w-5 h-5 text-green-400 flex-shrink-0" />
                  <span>Executive Briefings</span>
                </li>
                <li className="flex items-center gap-3 text-muted-foreground">
                  <CheckCircle className="w-5 h-5 text-green-400 flex-shrink-0" />
                  <span>Virtual and In-Person Events</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
