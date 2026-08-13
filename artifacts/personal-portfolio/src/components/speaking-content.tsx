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
    org: 'UXSG: AI Learn & Share',
    year: '2025-2026',
    topic: 'AI Learn and Share',
    upcoming: false,
    tag: null,
    image: uxsgImage,
    link: 'https://www.meetup.com/ux-support-group/',
    description: 'Recurring AI learning and knowledge-sharing sessions for an international community of product leaders, designers, developers, and entrepreneurs, based out of New York City.',
    tags: ['Workshop', 'AI Literacy', 'Meetup']
  },
  {
    org: 'AI with Alexis',
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
    if (isOpen) document.body.style.overflow = 'hidden';
    else document.body.style.overflow = 'unset';
    return () => { document.body.style.overflow = 'unset'; };
  }, [isOpen]);

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose(); };
    if (isOpen) document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center p-4"
      onClick={onClose}
    >
      <div
        className="bg-white border border-[#E5E5E5] max-w-3xl w-full max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="sticky top-0 bg-white border-b border-[#E5E5E5] px-8 py-5 flex items-center justify-between">
          <h2
            style={{
              fontFamily: '"Cormorant Garamond", Georgia, serif',
              fontWeight: 400,
              fontSize: '1.5rem',
              color: '#000000',
              letterSpacing: '-0.01em',
            }}
          >
            Speaking Topics
          </h2>
          <button
            onClick={onClose}
            className="text-[#777169] hover:text-black transition-colors p-1"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="px-8 py-8 space-y-10">
          {/* Topic Accordion */}
          <div>
            <p
              style={{
                fontFamily: '"Geist Mono", ui-monospace, monospace',
                fontSize: '0.5625rem',
                color: '#A59F97',
                letterSpacing: '0.12em',
                textTransform: 'uppercase',
                marginBottom: '1rem',
              }}
            >
              Topics by audience
            </p>
            <Accordion type="single" collapsible className="w-full divide-y divide-[#E5E5E5]">
              {topicBuckets.map((bucket, bi) => (
                <AccordionItem key={bi} value={`bucket-${bi}`} className="border-none py-1">
                  <AccordionTrigger className="text-left hover:no-underline py-4">
                    <div className="flex flex-col items-start gap-0.5">
                      <span
                        style={{
                          fontFamily: 'Inter, sans-serif',
                          fontSize: '0.9375rem',
                          fontWeight: 600,
                          color: '#000000',
                        }}
                      >
                        {bucket.bucketTitle}
                      </span>
                      <span
                        style={{
                          fontFamily: 'Inter, sans-serif',
                          fontSize: '0.8125rem',
                          color: '#777169',
                        }}
                      >
                        {bucket.tagline}
                      </span>
                    </div>
                  </AccordionTrigger>
                  <AccordionContent className="pb-4">
                    <p
                      style={{
                        fontFamily: 'Inter, sans-serif',
                        fontSize: '0.8125rem',
                        color: '#777169',
                        marginBottom: '1rem',
                        lineHeight: 1.6,
                      }}
                    >
                      {bucket.whyStatement}
                    </p>
                    <div className="space-y-2">
                      {bucket.topics.map((topic, ti) => {
                        const Icon = topic.icon;
                        return (
                          <div key={ti} className="border border-[#E5E5E5] p-4">
                            <div className="flex items-start gap-3">
                              <Icon className="w-4 h-4 text-[#A59F97] flex-shrink-0 mt-0.5" />
                              <div>
                                <h4
                                  style={{
                                    fontFamily: 'Inter, sans-serif',
                                    fontSize: '0.875rem',
                                    fontWeight: 600,
                                    color: '#000000',
                                    marginBottom: '0.25rem',
                                  }}
                                >
                                  {topic.title}
                                </h4>
                                <p
                                  style={{
                                    fontFamily: 'Inter, sans-serif',
                                    fontSize: '0.8125rem',
                                    color: '#777169',
                                    lineHeight: 1.6,
                                  }}
                                >
                                  {topic.details}
                                </p>
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

          <div className="border-t border-[#E5E5E5] pt-8">
            <p
              style={{
                fontFamily: '"Geist Mono", ui-monospace, monospace',
                fontSize: '0.5625rem',
                color: '#A59F97',
                letterSpacing: '0.12em',
                textTransform: 'uppercase',
                marginBottom: '0.75rem',
              }}
            >
              Popular formats
            </p>
            <ul className="space-y-2">
              {[
                "Keynote Presentations (45-60 min)",
                "Interactive Workshops (Half or Full Day)",
                "Panel Discussions and Fireside Chats",
                "Executive Briefings",
                "Virtual and In-Person Events",
              ].map((format) => (
                <li
                  key={format}
                  className="flex items-center gap-3"
                  style={{
                    fontFamily: 'Inter, sans-serif',
                    fontSize: '0.875rem',
                    color: '#3F3B36',
                  }}
                >
                  <CheckCircle className="w-3.5 h-3.5 text-[#FF4704] flex-shrink-0" />
                  {format}
                </li>
              ))}
            </ul>
          </div>

          <div className="border-t border-[#E5E5E5] pt-8">
            <a
              href="mailto:alexis@upstart-labs.com?subject=Speaking%20Inquiry"
              className="inline-flex items-center gap-2 text-[#3F3B36] hover:text-black transition-colors"
              style={{
                fontFamily: '"Geist Mono", ui-monospace, monospace',
                fontSize: '0.6rem',
                letterSpacing: '0.12em',
                textTransform: 'uppercase',
                fontWeight: 400,
              }}
            >
              <Mail className="w-3.5 h-3.5" />
              Contact for booking →
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function SpeakingContent() {
  const [isInfoModalOpen, setIsInfoModalOpen] = useState(false);

  return (
    <div className="pt-8">
      {/* Engagement cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-px bg-[#E5E5E5] mb-12">
        {engagementCards.map((item, i) => (
          <div
            key={i}
            className="group bg-white overflow-hidden cursor-default"
            onClick={item.infoModal ? () => setIsInfoModalOpen(true) : undefined}
            style={{ cursor: item.infoModal ? 'pointer' : 'default' }}
          >
            {/* Image */}
            <div className="aspect-video relative overflow-hidden bg-[#F5F3F1]">
              {item.image ? (
                <img
                  src={item.image}
                  alt={item.org}
                  className="w-full h-full object-cover object-center group-hover:scale-[1.025] transition-transform duration-500"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center bg-[#F5F3F1]">
                  <Mic2 className="w-10 h-10 text-[#E5E5E5]" />
                </div>
              )}
              {item.tag && (
                <div className="absolute top-3 left-3">
                  <span
                    style={{
                      fontFamily: '"Geist Mono", ui-monospace, monospace',
                      fontSize: '0.5rem',
                      color: '#FF4704',
                      letterSpacing: '0.1em',
                      textTransform: 'uppercase',
                      background: '#FFFFFF',
                      border: '1px solid #E5E5E5',
                      padding: '2px 7px',
                    }}
                  >
                    {item.tag}
                  </span>
                </div>
              )}
            </div>

            {/* Content */}
            <div className="p-6">
              <p
                style={{
                  fontFamily: '"Geist Mono", ui-monospace, monospace',
                  fontSize: '0.5rem',
                  color: '#A59F97',
                  letterSpacing: '0.1em',
                  textTransform: 'uppercase',
                  marginBottom: '0.4rem',
                }}
              >
                {item.year}
              </p>
              <h3
                style={{
                  fontFamily: '"Cormorant Garamond", Georgia, serif',
                  fontWeight: 400,
                  fontSize: '1.25rem',
                  color: '#000000',
                  lineHeight: 1.2,
                  marginBottom: '0.5rem',
                }}
                className="group-hover:opacity-70 transition-opacity"
              >
                {item.org}
              </h3>
              <p
                style={{
                  fontFamily: 'Inter, sans-serif',
                  fontSize: '0.8125rem',
                  color: '#777169',
                  lineHeight: 1.65,
                  marginBottom: '1rem',
                }}
              >
                {item.description}
              </p>
              <div className="flex flex-wrap gap-1.5 mb-4">
                {item.tags.map((tag, ti) => (
                  <span
                    key={ti}
                    style={{
                      fontFamily: '"Geist Mono", ui-monospace, monospace',
                      fontSize: '0.5rem',
                      color: '#A59F97',
                      letterSpacing: '0.06em',
                      textTransform: 'uppercase',
                      border: '1px solid #E5E5E5',
                      padding: '2px 7px',
                    }}
                  >
                    {tag}
                  </span>
                ))}
              </div>
              {item.link && (
                <a
                  href={item.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={(e) => e.stopPropagation()}
                  className="inline-flex items-center gap-1.5 text-[#3F3B36] hover:text-black transition-colors"
                  style={{
                    fontFamily: '"Geist Mono", ui-monospace, monospace',
                    fontSize: '0.5625rem',
                    letterSpacing: '0.1em',
                    textTransform: 'uppercase',
                  }}
                >
                  <ExternalLink className="w-3 h-3" />
                  View Event
                </a>
              )}
              {item.infoModal && (
                <button
                  className="inline-flex items-center gap-1.5 text-[#3F3B36] hover:text-black transition-colors"
                  style={{
                    fontFamily: '"Geist Mono", ui-monospace, monospace',
                    fontSize: '0.5625rem',
                    letterSpacing: '0.1em',
                    textTransform: 'uppercase',
                    background: 'none',
                    cursor: 'pointer',
                  }}
                >
                  <Info className="w-3 h-3" />
                  View Topics
                </button>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* CTA row */}
      <div className="border-t border-[#E5E5E5] pt-8 flex flex-col sm:flex-row items-start sm:items-center gap-6">
        <a
          href="mailto:alexis@upstart-labs.com?subject=Speaking%20Inquiry"
          className="inline-flex items-center gap-2 text-[#3F3B36] hover:text-black transition-colors"
          style={{
            fontFamily: '"Geist Mono", ui-monospace, monospace',
            fontSize: '0.625rem',
            letterSpacing: '0.12em',
            textTransform: 'uppercase',
          }}
        >
          <Mail className="w-3.5 h-3.5" />
          Book a session →
        </a>
        <button
          onClick={() => setIsInfoModalOpen(true)}
          className="inline-flex items-center gap-2 text-[#777169] hover:text-black transition-colors"
          style={{
            fontFamily: '"Geist Mono", ui-monospace, monospace',
            fontSize: '0.625rem',
            letterSpacing: '0.12em',
            textTransform: 'uppercase',
            background: 'none',
            cursor: 'pointer',
          }}
        >
          <Info className="w-3.5 h-3.5" />
          View all topics
        </button>
      </div>

      <CorporateInfoModal isOpen={isInfoModalOpen} onClose={() => setIsInfoModalOpen(false)} />
    </div>
  );
}
