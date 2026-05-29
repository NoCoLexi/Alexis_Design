import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Award, ArrowDown, Play, Pause } from "lucide-react";
import professionalPhoto from "@assets/Brochu, Alexis 2023 Ireland_1754523029765.png";
import profileVideo from "@assets/20181006_190845_1754603621565.mp4";
import headshot from "@assets/headshot_bw_1774321770406.png";
import { useState, useRef, useEffect } from "react";

const skills = [
  { name: 'Product Management', color: 'text-primary' },
  { name: 'UX Design', color: 'text-chart-4' },
  { name: 'User Research', color: 'text-chart-1' },
  { name: 'Change Management', color: 'text-chart-2' }
];

interface AboutSectionProps {
  onOpenAwardModal?: () => void;
}

export default function AboutSection({ onOpenAwardModal }: AboutSectionProps) {
  const [activeTab, setActiveTab] = useState<'education' | 'publications' | 'community' | 'funfact'>('publications');
  const [inlineTab, setInlineTab] = useState<'community' | 'funfact'>('community');
  const [isDragging, setIsDragging] = useState(false);
  const [startY, setStartY] = useState(0);
  const [scrollTop, setScrollTop] = useState(0);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isVideoPlaying, setIsVideoPlaying] = useState(true);

  const toggleVideoPlayback = () => {
    const video = videoRef.current;
    if (!video) return;
    if (video.paused || video.ended) {
      if (video.ended) {
        video.currentTime = 0;
      }
      void video.play();
    } else {
      video.pause();
    }
  };

  const handleVideoEnded = () => {
    const video = videoRef.current;
    if (!video) return;
    video.pause();
    video.currentTime = 0;
    setIsVideoPlaying(false);
  };

  const handleMouseDown = (e: React.MouseEvent) => {
    if (!scrollContainerRef.current) return;
    setIsDragging(true);
    setStartY(e.pageY - scrollContainerRef.current.offsetTop);
    setScrollTop(scrollContainerRef.current.scrollTop);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging || !scrollContainerRef.current) return;
    e.preventDefault();
    const y = e.pageY - scrollContainerRef.current.offsetTop;
    const walk = (y - startY) * 2;
    scrollContainerRef.current.scrollTop = scrollTop - walk;
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const handleMouseLeave = () => {
    setIsDragging(false);
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    if (!scrollContainerRef.current) return;
    setIsDragging(true);
    setStartY(e.touches[0].pageY - scrollContainerRef.current.offsetTop);
    setScrollTop(scrollContainerRef.current.scrollTop);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!isDragging || !scrollContainerRef.current) return;
    const y = e.touches[0].pageY - scrollContainerRef.current.offsetTop;
    const walk = (y - startY) * 2;
    scrollContainerRef.current.scrollTop = scrollTop - walk;
  };

  const handleTouchEnd = () => {
    setIsDragging(false);
  };

  const scrollToPersonalTraining = () => {
    const personalTrainingElement = document.getElementById('personal-training');
    if (personalTrainingElement) {
      personalTrainingElement.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
    }
  };
  return (
    <section id="about" className="py-20 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-secondary/50 to-accent/50"></div>
      <div className="relative z-10 max-w-7xl mx-auto px-6">
        <h2 className="text-4xl md:text-5xl font-bold mb-8 text-center">
          <span className="gradient-text">About the Founder</span>
        </h2>

        <div className="space-y-16">
          {/* Two-column: portrait + intro quote */}
          <div className="flex flex-col md:flex-row gap-12 md:gap-16 items-start justify-between">
            {/* Portrait - left */}
            <div className="flex-shrink-0 self-stretch flex flex-col">
              <img
                src={headshot}
                alt="Upstart-Labs Founder"
                className="rounded-2xl shadow-lg rounded-tl-[12px] rounded-tr-[12px] rounded-br-[12px] rounded-bl-[12px]"
                style={{ maxWidth: '320px', width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'top' }}
              />
            </div>

            {/* Introduction - right */}
            <div className="flex-1">
              <p className="md:text-2xl text-muted-foreground text-[18px]">
                <strong className="text-foreground">Alexis has spent her career inside the gap between what teams build and what people actually adopt.</strong> <br />
                The code is solid. The UX is clean. But adoption still stalls because no one designed for the office misunderstandings, the training gap, or the stakeholders who never bought in. <br />She built Upstart-Labs around a single belief: <strong className="text-foreground">that the human side of change is just as engineerable as the product itself.</strong>
              </p>
            </div>
          </div>

          {/* Inline 2-tab panel */}
          <div>
                <div className="mb-4">
                  <div className="glass rounded-xl p-2 inline-flex">
                    <Button
                      variant={inlineTab === 'community' ? 'default' : 'ghost'}
                      onClick={() => setInlineTab('community')}
                      className={inlineTab === 'community' ? 'gradient-bg-primary' : ''}
                    >
                      Community/Leadership
                    </Button>
                    <Button
                      variant={inlineTab === 'funfact' ? 'default' : 'ghost'}
                      onClick={() => setInlineTab('funfact')}
                      className={inlineTab === 'funfact' ? 'gradient-bg-primary' : ''}
                    >
                      Fun Fact
                    </Button>
                  </div>
                </div>

                {inlineTab === 'community' && (
                  <div>
                    <div
                      className={`glass rounded-xl p-6 relative overflow-hidden ${isDragging ? 'dragging cursor-grabbing' : 'cursor-grab'}`}
                      onMouseDown={handleMouseDown}
                      onMouseMove={handleMouseMove}
                      onMouseUp={handleMouseUp}
                      onMouseLeave={handleMouseLeave}
                      onTouchStart={handleTouchStart}
                      onTouchMove={handleTouchMove}
                      onTouchEnd={handleTouchEnd}
                    >
                      <div className="h-64 relative overflow-y-auto scrollbar-hide" ref={scrollContainerRef}>
                        <div className="absolute w-full education-scroll">
                          <div className="education-item">
                            <div className="w-3 h-3 bg-chart-3 rounded-full mr-4 flex-shrink-0"></div>
                            <div className="text-left">
                              <div className="text-xs font-semibold text-chart-3 uppercase tracking-wide mb-1">Keynote Speaker</div>
                              <div className="text-foreground font-medium">AIxUX Summit | Keynote Speaker</div>
                            </div>
                          </div>
                          <div className="education-item">
                            <div className="w-3 h-3 bg-chart-3 rounded-full mr-4 flex-shrink-0"></div>
                            <div className="text-left">
                              <div className="text-xs font-semibold text-chart-3 uppercase tracking-wide mb-1">Keynote Speaker</div>
                              <div className="text-foreground font-medium">Fortune 500 Fintech | Keynote Speaker</div>
                            </div>
                          </div>
                          <div className="education-item">
                            <div className="w-3 h-3 bg-chart-3 rounded-full mr-4 flex-shrink-0"></div>
                            <div className="text-left">
                              <div className="text-xs font-semibold text-chart-3 uppercase tracking-wide mb-1">Keynote Speaker</div>
                              <div className="text-foreground font-medium">American Red Cross | Keynote Speaker, Spring 2026</div>
                            </div>
                          </div>
                          <div className="education-item">
                            <div className="w-3 h-3 bg-chart-1 rounded-full mr-4 flex-shrink-0"></div>
                            <div className="text-left">
                              <div className="text-xs font-semibold text-chart-1 uppercase tracking-wide mb-1">Professional Group</div>
                              <div className="text-foreground font-medium">PMI NH Chapter | Member</div>
                            </div>
                          </div>
                          <div className="education-item">
                            <div className="w-3 h-3 bg-chart-3 rounded-full mr-4 flex-shrink-0"></div>
                            <div className="text-left">
                              <div className="text-xs font-semibold text-chart-3 uppercase tracking-wide mb-1">Leadership</div>
                              <div className="text-foreground font-medium">New Hampshire AI Task Force | AI Adoption Specialist</div>
                            </div>
                          </div>
                          <div className="education-item">
                            <div className="w-3 h-3 bg-chart-1 rounded-full mr-4 flex-shrink-0"></div>
                            <div className="text-left">
                              <div className="text-xs font-semibold text-chart-1 uppercase tracking-wide mb-1">Professional Group</div>
                              <div className="text-foreground font-medium">AI in New Hampshire | Chapter Member</div>
                            </div>
                          </div>
                          <div className="education-item">
                            <div className="w-3 h-3 bg-chart-1 rounded-full mr-4 flex-shrink-0"></div>
                            <div className="text-left">
                              <div className="text-xs font-semibold text-chart-1 uppercase tracking-wide mb-1">Professional Group</div>
                              <div className="text-foreground font-medium">AI Tinkerers NH | Chapter Member</div>
                            </div>
                          </div>
                          <div className="education-item">
                            <div className="w-3 h-3 bg-chart-1 rounded-full mr-4 flex-shrink-0"></div>
                            <div className="text-left">
                              <div className="text-xs font-semibold text-chart-1 uppercase tracking-wide mb-1">Professional Group</div>
                              <div className="text-foreground font-medium">Salesforce User Group – NH division | Salesforce Member</div>
                            </div>
                          </div>
                          <div className="education-item">
                            <div className="w-3 h-3 bg-chart-2 rounded-full mr-4 flex-shrink-0"></div>
                            <div className="text-left">
                              <div className="text-xs font-semibold text-chart-2 uppercase tracking-wide mb-1">Content Creation</div>
                              <div className="text-foreground font-medium">UX Collective (uxdesign.cc) | Contributing Author</div>
                            </div>
                          </div>
                          <div className="education-item">
                            <div className="w-3 h-3 bg-chart-3 rounded-full mr-4 flex-shrink-0"></div>
                            <div className="text-left">
                              <div className="text-xs font-semibold text-chart-3 uppercase tracking-wide mb-1">Leadership</div>
                              <div className="text-foreground font-medium">AI UX/UI at UXSG | Co-host & Founding Contributor</div>
                            </div>
                          </div>
                          <div className="education-item">
                            <div className="w-3 h-3 bg-chart-1 rounded-full mr-4 flex-shrink-0"></div>
                            <div className="text-left">
                              <div className="text-xs font-semibold text-chart-1 uppercase tracking-wide mb-1">Beta Testing</div>
                              <div className="text-foreground font-medium">AI Copilot Enterprise | Sikich Beta Team Contributor</div>
                            </div>
                          </div>
                          <div className="education-item">
                            <div className="w-3 h-3 bg-chart-3 rounded-full mr-4 flex-shrink-0"></div>
                            <div className="text-left">
                              <div className="text-xs font-semibold text-chart-3 uppercase tracking-wide mb-1">Leadership</div>
                              <div className="text-foreground font-medium">Job Search Council (JSC) | Council Moderator</div>
                            </div>
                          </div>
                          <div className="education-item">
                            <div className="w-3 h-3 bg-chart-2 rounded-full mr-4 flex-shrink-0"></div>
                            <div className="text-left">
                              <div className="text-xs font-semibold text-chart-2 uppercase tracking-wide mb-1">Education</div>
                              <div className="text-foreground font-medium">Mt. Washington Valley STEM Expos | Science Fair Judge</div>
                            </div>
                          </div>
                          <div className="education-item">
                            <div className="w-3 h-3 bg-chart-3 rounded-full mr-4 flex-shrink-0"></div>
                            <div className="text-left">
                              <div className="text-xs font-semibold text-chart-3 uppercase tracking-wide mb-1">Leadership</div>
                              <div className="text-foreground font-medium">Mt. Washington Valley Community Band | Section Leader - Percussion</div>
                            </div>
                          </div>
                          <div className="education-item">
                            <div className="w-3 h-3 bg-chart-2 rounded-full mr-4 flex-shrink-0"></div>
                            <div className="text-left">
                              <div className="text-xs font-semibold text-chart-2 uppercase tracking-wide mb-1">Community Service</div>
                              <div className="text-foreground font-medium">Habitat for Humanity – MWV Chapter | Volunteer & Videographer</div>
                            </div>
                          </div>
                          <div className="education-item">
                            <div className="w-3 h-3 bg-chart-3 rounded-full mr-4 flex-shrink-0"></div>
                            <div className="text-left">
                              <div className="text-xs font-semibold text-chart-3 uppercase tracking-wide mb-1">Board Leadership</div>
                              <div className="text-foreground font-medium">Mt. Washington Valley Children's Museum | Vice President Board of Directors</div>
                            </div>
                          </div>
                          <div className="education-item">
                            <div className="w-3 h-3 bg-chart-2 rounded-full mr-4 flex-shrink-0"></div>
                            <div className="text-left">
                              <div className="text-xs font-semibold text-chart-2 uppercase tracking-wide mb-1">Community Service</div>
                              <div className="text-foreground font-medium">Conway Cares Revolving Closet | Volunteer & Donor</div>
                            </div>
                          </div>
                          <div className="education-item">
                            <div className="w-3 h-3 bg-chart-1 rounded-full mr-4 flex-shrink-0"></div>
                            <div className="text-left">
                              <div className="text-xs font-semibold text-chart-1 uppercase tracking-wide mb-1">International</div>
                              <div className="text-foreground font-medium">Diverbo Pueblo Ingles | Salamanca, SPAIN | English Instructor</div>
                            </div>
                          </div>
                          <div className="education-item">
                            <div className="w-3 h-3 bg-chart-2 rounded-full mr-4 flex-shrink-0"></div>
                            <div className="text-left">
                              <div className="text-xs font-semibold text-chart-2 uppercase tracking-wide mb-1">Education</div>
                              <div className="text-foreground font-medium">SAU9 (ESSC) Eastern Slope Skier Community | Ski Instructor</div>
                            </div>
                          </div>
                          <div className="education-item">
                            <div className="w-3 h-3 bg-chart-1 rounded-full mr-4 flex-shrink-0"></div>
                            <div className="text-left">
                              <div className="text-xs font-semibold text-chart-1 uppercase tracking-wide mb-1">Training & Safety</div>
                              <div className="text-foreground font-medium">American Red Cross (ARC) – RI, NH Chapters | CPR & First Aid Instructor</div>
                            </div>
                          </div>
                          <div className="education-item">
                            <div className="w-3 h-3 bg-chart-3 rounded-full mr-4 flex-shrink-0"></div>
                            <div className="text-left">
                              <div className="text-xs font-semibold text-chart-3 uppercase tracking-wide mb-1">Leadership</div>
                              <div className="text-foreground font-medium">Mt. Washington Valley Div Cal Ripken Baseball | Head Coach</div>
                            </div>
                          </div>
                          <div className="education-item">
                            <div className="w-3 h-3 bg-chart-2 rounded-full mr-4 flex-shrink-0"></div>
                            <div className="text-left">
                              <div className="text-xs font-semibold text-chart-2 uppercase tracking-wide mb-1">Arts & Culture</div>
                              <div className="text-foreground font-medium">Arts in Motion Theater | Actor and Volunteer</div>
                            </div>
                          </div>
                          <div className="education-item">
                            <div className="w-3 h-3 bg-chart-1 rounded-full mr-4 flex-shrink-0"></div>
                            <div className="text-left">
                              <div className="text-xs font-semibold text-chart-1 uppercase tracking-wide mb-1">Fitness & Wellness</div>
                              <div className="text-foreground font-medium">Cranmore Mountain Fitness Center | Personal Trainer & Group Fitness Instructor</div>
                            </div>
                          </div>
                          <div className="education-item">
                            <div className="w-3 h-3 bg-chart-3 rounded-full mr-4 flex-shrink-0"></div>
                            <div className="text-left">
                              <div className="text-xs font-semibold text-chart-3 uppercase tracking-wide mb-1">Founding Member</div>
                              <div className="text-foreground font-medium">Delta Gamma Fraternity – Alpha Epsilon | Founding Sister</div>
                            </div>
                          </div>
                        </div>
                        <div className="absolute top-0 left-0 right-0 h-12 bg-gradient-to-b from-background to-transparent pointer-events-none z-10"></div>
                        <div className="absolute bottom-0 left-0 right-0 h-12 bg-gradient-to-t from-background to-transparent pointer-events-none z-10"></div>
                      </div>
                    </div>
                    <p className="text-muted-foreground text-sm mt-4 italic text-center">
                      Drag to scroll or let it auto-scroll
                    </p>
                  </div>
                )}

                {inlineTab === 'funfact' && (
                  <div className="text-center">
                    <h3 className="font-semibold mb-6 text-xl" style={{ color: '#F3E8B9' }}>Also a certified personal trainer</h3>
                    <div className="flex justify-center">
                      <div className="relative aspect-video max-w-sm rounded-xl overflow-hidden animate-float glass">
                        <video
                          ref={videoRef}
                          src={profileVideo}
                          muted
                          playsInline
                          onPlay={() => setIsVideoPlaying(true)}
                          onPause={() => setIsVideoPlaying(false)}
                          onEnded={handleVideoEnded}
                          className="w-full h-full object-cover"
                          data-testid="video-profile"
                        />
                        <button
                          type="button"
                          onClick={toggleVideoPlayback}
                          aria-label={isVideoPlaying ? 'Pause video' : 'Play video'}
                          data-testid="button-video-toggle"
                          className="absolute bottom-3 right-3 flex items-center justify-center w-10 h-10 rounded-full glass text-white/90 hover:text-white hover:scale-105 transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-white/70 focus-visible:ring-offset-2 focus-visible:ring-offset-black/30"
                        >
                          {isVideoPlaying ? (
                            <Pause className="w-4 h-4" fill="currentColor" />
                          ) : (
                            <Play className="w-4 h-4 ml-0.5" fill="currentColor" />
                          )}
                        </button>
                      </div>
                    </div>
                  </div>
                )}
              </div>

          {/* Education Tabs - preserved, hidden until ready */}
          {false && (
          <div className="flex justify-center">
            <div className="max-w-3xl w-full">
              {/* Tab Navigation */}
              <div className="flex justify-center mb-8">
                <div className="glass rounded-xl p-2">
                  <Button
                    variant={activeTab === 'education' ? 'default' : 'ghost'}
                    onClick={() => setActiveTab('education')}
                    className={activeTab === 'education' ? 'gradient-bg-primary' : ''}
                    data-testid="tab-education"
                  >
                    Education/Certs
                  </Button>
                  <Button
                    variant={activeTab === 'publications' ? 'default' : 'ghost'}
                    onClick={() => setActiveTab('publications')}
                    className={activeTab === 'publications' ? 'gradient-bg-primary' : ''}
                    data-testid="tab-publications-awards"
                  >
                    Publications/Awards
                  </Button>
                  <Button
                    variant={activeTab === 'community' ? 'default' : 'ghost'}
                    onClick={() => setActiveTab('community')}
                    className={activeTab === 'community' ? 'gradient-bg-primary' : ''}
                    data-testid="tab-community-leadership"
                  >
                    Community/Leadership
                  </Button>
                  <Button
                    variant={activeTab === 'funfact' ? 'default' : 'ghost'}
                    onClick={() => setActiveTab('funfact')}
                    className={activeTab === 'funfact' ? 'gradient-bg-primary' : ''}
                    data-testid="tab-fun-fact"
                  >
                    Fun Fact
                  </Button>
                </div>
              </div>

              {/* Tab Content */}
              {activeTab === 'education' && (
                <div>
                  {/* Scrolling Education List */}
                  <div 
                    className={`glass rounded-xl p-6 relative overflow-hidden ${isDragging ? 'dragging cursor-grabbing' : 'cursor-grab'}`}
                    onMouseDown={handleMouseDown}
                    onMouseMove={handleMouseMove}
                    onMouseUp={handleMouseUp}
                    onMouseLeave={handleMouseLeave}
                    onTouchStart={handleTouchStart}
                    onTouchMove={handleTouchMove}
                    onTouchEnd={handleTouchEnd}
                  >
                    <div className="h-64 relative overflow-y-auto scrollbar-hide" ref={scrollContainerRef}>
                      <div className="absolute w-full education-scroll">
                        {/* First set */}
                        <div className="education-item">
                          <div className="w-3 h-3 bg-chart-3 rounded-full mr-4 flex-shrink-0"></div>
                          <div>
                            <div className="text-xs font-semibold text-chart-3 uppercase tracking-wide mb-1">Core Education</div>
                            <div className="text-foreground font-medium">Washington University in St. Louis - Visual Communications (BFA)</div>
                          </div>
                        </div>
                        <div className="education-item">
                          <div className="w-3 h-3 bg-chart-3 rounded-full mr-4 flex-shrink-0"></div>
                          <div>
                            <div className="text-xs font-semibold text-chart-3 uppercase tracking-wide mb-1">Core Education</div>
                            <div className="text-foreground font-medium">University of New Hampshire - UI/UX Design Certification</div>
                          </div>
                        </div>
                        <div className="education-item">
                          <div className="w-3 h-3 bg-chart-1 rounded-full mr-4 flex-shrink-0"></div>
                          <div>
                            <div className="text-xs font-semibold text-chart-1 uppercase tracking-wide mb-1">Product Management</div>
                            <div className="text-foreground font-medium">PROSCI - Change Management Practitioner (CMP)</div>
                          </div>
                        </div>
                        <div className="education-item">
                          <div className="w-3 h-3 bg-chart-1 rounded-full mr-4 flex-shrink-0"></div>
                          <div>
                            <div className="text-xs font-semibold text-chart-1 uppercase tracking-wide mb-1">Product Management</div>
                            <div className="text-foreground font-medium">University of New Hampshire - Project Manager-Scrum Master (PM-SM)</div>
                          </div>
                        </div>
                        <div className="education-item">
                          <div className="w-3 h-3 bg-chart-1 rounded-full mr-4 flex-shrink-0"></div>
                          <div>
                            <div className="text-xs font-semibold text-chart-1 uppercase tracking-wide mb-1">Product Management</div>
                            <div className="text-foreground font-medium">University of New Hampshire - Business Analytics Science</div>
                          </div>
                        </div>
                        <div className="education-item">
                          <div className="w-3 h-3 bg-chart-1 rounded-full mr-4 flex-shrink-0"></div>
                          <div>
                            <div className="text-xs font-semibold text-chart-1 uppercase tracking-wide mb-1">Product Management</div>
                            <div className="text-foreground font-medium">Project Management Institute (PMP)</div>
                          </div>
                        </div>
                        <div className="education-item">
                          <div className="w-3 h-3 bg-chart-1 rounded-full mr-4 flex-shrink-0"></div>
                          <div>
                            <div className="text-xs font-semibold text-chart-1 uppercase tracking-wide mb-1">Product Management</div>
                            <div className="text-foreground font-medium">Pendo - Product-Led Design | AI for Product Management</div>
                          </div>
                        </div>
                        <div className="education-item">
                          <div className="w-3 h-3 bg-chart-1 rounded-full mr-4 flex-shrink-0"></div>
                          <div>
                            <div className="text-xs font-semibold text-chart-1 uppercase tracking-wide mb-1">Product Management</div>
                            <div className="text-foreground font-medium">Superhuman - AI Workplace Proficiency</div>
                          </div>
                        </div>
                        <div className="education-item">
                          <div className="w-3 h-3 bg-chart-1 rounded-full mr-4 flex-shrink-0"></div>
                          <div>
                            <div className="text-xs font-semibold text-chart-1 uppercase tracking-wide mb-1">Product Management</div>
                            <div className="text-foreground font-medium">Salesforce - Administration | AI Specialist | AgentForce (Candidate)</div>
                          </div>
                        </div>
                        <div className="education-item">
                          <div className="w-3 h-3 bg-chart-2 rounded-full mr-4 flex-shrink-0"></div>
                          <div>
                            <div className="text-xs font-semibold text-chart-2 uppercase tracking-wide mb-1">Specialized Training</div>
                            <div className="text-foreground font-medium">Rhode Island School of Design - Visual Art Intensive</div>
                          </div>
                        </div>
                        <div className="education-item">
                          <div className="w-3 h-3 bg-chart-2 rounded-full mr-4 flex-shrink-0"></div>
                          <div>
                            <div className="text-xs font-semibold text-chart-2 uppercase tracking-wide mb-1">Specialized Training</div>
                            <div className="text-foreground font-medium">Parsons School of Design, France - Paleolithic Art Intensive</div>
                          </div>
                        </div>
                        <div className="education-item">
                          <div className="w-3 h-3 bg-chart-2 rounded-full mr-4 flex-shrink-0"></div>
                          <div>
                            <div className="text-xs font-semibold text-chart-2 uppercase tracking-wide mb-1">Specialized Training</div>
                            <div className="text-foreground font-medium">UC Berkeley - Art History Intensive</div>
                          </div>
                        </div>
                        <div className="education-item">
                          <div className="w-3 h-3 bg-chart-2 rounded-full mr-4 flex-shrink-0"></div>
                          <div>
                            <div className="text-xs font-semibold text-chart-2 uppercase tracking-wide mb-1">Specialized Training</div>
                            <div className="text-foreground font-medium">Interlochen Center for the Arts - Violoncello Major, Dance Minor</div>
                          </div>
                        </div>
                        <div className="education-item">
                          <div className="w-3 h-3 bg-chart-2 rounded-full mr-4 flex-shrink-0"></div>
                          <div>
                            <div className="text-xs font-semibold text-chart-2 uppercase tracking-wide mb-1">Specialized Training</div>
                            <div className="text-foreground font-medium">NASM - Certified Personal Trainer (CPT), Fitness Instructor, Nutrition Coach (CNC)</div>
                          </div>
                        </div>

                        {/* Duplicate set for seamless loop */}
                        <div className="education-item">
                          <div className="w-3 h-3 bg-chart-3 rounded-full mr-4 flex-shrink-0"></div>
                          <div>
                            <div className="text-xs font-semibold text-chart-3 uppercase tracking-wide mb-1">Core Education</div>
                            <div className="text-foreground font-medium">Washington University in St. Louis - Visual Communications (BFA)</div>
                          </div>
                        </div>
                        <div className="education-item">
                          <div className="w-3 h-3 bg-chart-3 rounded-full mr-4 flex-shrink-0"></div>
                          <div>
                            <div className="text-xs font-semibold text-chart-3 uppercase tracking-wide mb-1">Core Education</div>
                            <div className="text-foreground font-medium">University of New Hampshire - UI/UX Design Certification</div>
                          </div>
                        </div>
                        <div className="education-item">
                          <div className="w-3 h-3 bg-chart-1 rounded-full mr-4 flex-shrink-0"></div>
                          <div>
                            <div className="text-xs font-semibold text-chart-1 uppercase tracking-wide mb-1">Product Management</div>
                            <div className="text-foreground font-medium">PROSCI - Change Management Practitioner (CMP)</div>
                          </div>
                        </div>
                        <div className="education-item">
                          <div className="w-3 h-3 bg-chart-1 rounded-full mr-4 flex-shrink-0"></div>
                          <div>
                            <div className="text-xs font-semibold text-chart-1 uppercase tracking-wide mb-1">Product Management</div>
                            <div className="text-foreground font-medium">University of New Hampshire - Project Manager-Scrum Master (PM-SM)</div>
                          </div>
                        </div>
                        <div className="education-item">
                          <div className="w-3 h-3 bg-chart-1 rounded-full mr-4 flex-shrink-0"></div>
                          <div>
                            <div className="text-xs font-semibold text-chart-1 uppercase tracking-wide mb-1">Product Management</div>
                            <div className="text-foreground font-medium">University of New Hampshire - Business Analytics Science</div>
                          </div>
                        </div>
                        <div className="education-item">
                          <div className="w-3 h-3 bg-chart-1 rounded-full mr-4 flex-shrink-0"></div>
                          <div>
                            <div className="text-xs font-semibold text-chart-1 uppercase tracking-wide mb-1">Product Management</div>
                            <div className="text-foreground font-medium">Project Management Institute (PMP)</div>
                          </div>
                        </div>
                        <div className="education-item">
                          <div className="w-3 h-3 bg-chart-1 rounded-full mr-4 flex-shrink-0"></div>
                          <div>
                            <div className="text-xs font-semibold text-chart-1 uppercase tracking-wide mb-1">Product Management</div>
                            <div className="text-foreground font-medium">Pendo - Product-Led Design | AI for Product Management</div>
                          </div>
                        </div>
                        <div className="education-item">
                          <div className="w-3 h-3 bg-chart-1 rounded-full mr-4 flex-shrink-0"></div>
                          <div>
                            <div className="text-xs font-semibold text-chart-1 uppercase tracking-wide mb-1">Product Management</div>
                            <div className="text-foreground font-medium">Superhuman - AI Workplace Proficiency</div>
                          </div>
                        </div>
                        <div className="education-item">
                          <div className="w-3 h-3 bg-chart-1 rounded-full mr-4 flex-shrink-0"></div>
                          <div>
                            <div className="text-xs font-semibold text-chart-1 uppercase tracking-wide mb-1">Product Management</div>
                            <div className="text-foreground font-medium">Salesforce - Administration | AI Specialist | AgentForce (Candidate)</div>
                          </div>
                        </div>
                        <div className="education-item">
                          <div className="w-3 h-3 bg-chart-2 rounded-full mr-4 flex-shrink-0"></div>
                          <div>
                            <div className="text-xs font-semibold text-chart-2 uppercase tracking-wide mb-1">Specialized Training</div>
                            <div className="text-foreground font-medium">Rhode Island School of Design - Visual Art Intensive</div>
                          </div>
                        </div>
                        <div className="education-item">
                          <div className="w-3 h-3 bg-chart-2 rounded-full mr-4 flex-shrink-0"></div>
                          <div>
                            <div className="text-xs font-semibold text-chart-2 uppercase tracking-wide mb-1">Specialized Training</div>
                            <div className="text-foreground font-medium">Parsons School of Design, France - Paleolithic Art Intensive</div>
                          </div>
                        </div>
                        <div className="education-item">
                          <div className="w-3 h-3 bg-chart-2 rounded-full mr-4 flex-shrink-0"></div>
                          <div>
                            <div className="text-xs font-semibold text-chart-2 uppercase tracking-wide mb-1">Specialized Training</div>
                            <div className="text-foreground font-medium">UC Berkeley - Art History Intensive</div>
                          </div>
                        </div>
                        <div className="education-item">
                          <div className="w-3 h-3 bg-chart-2 rounded-full mr-4 flex-shrink-0"></div>
                          <div>
                            <div className="text-xs font-semibold text-chart-2 uppercase tracking-wide mb-1">Specialized Training</div>
                            <div className="text-foreground font-medium">Interlochen Center for the Arts - Violoncello Major, Dance Minor</div>
                          </div>
                        </div>
                        <div className="education-item">
                          <div className="w-3 h-3 bg-chart-2 rounded-full mr-4 flex-shrink-0"></div>
                          <div>
                            <div className="text-xs font-semibold text-chart-2 uppercase tracking-wide mb-1">Specialized Training</div>
                            <div className="text-foreground font-medium">NASM - Certified Personal Trainer (CPT), Fitness Instructor, Nutrition Coach (CNC)</div>
                          </div>
                        </div>
                      </div>

                      {/* Fade gradients */}
                      <div className="absolute top-0 left-0 right-0 h-12 bg-gradient-to-b from-background to-transparent pointer-events-none z-10"></div>
                      <div className="absolute bottom-0 left-0 right-0 h-12 bg-gradient-to-t from-background to-transparent pointer-events-none z-10"></div>
                    </div>
                  </div>

                  <p className="text-muted-foreground text-sm mt-4 italic text-center">
                    Drag to scroll or let it auto-scroll
                  </p>
                </div>
              )}

              {activeTab === 'publications' && (
                <div>
                  {/* Scrolling Publications & Awards List */}
                  <div 
                    className={`glass rounded-xl p-6 relative overflow-hidden ${isDragging ? 'dragging cursor-grabbing' : 'cursor-grab'}`}
                    onMouseDown={handleMouseDown}
                    onMouseMove={handleMouseMove}
                    onMouseUp={handleMouseUp}
                    onMouseLeave={handleMouseLeave}
                    onTouchStart={handleTouchStart}
                    onTouchMove={handleTouchMove}
                    onTouchEnd={handleTouchEnd}
                  >
                    <div className="h-64 relative overflow-y-auto scrollbar-hide" ref={scrollContainerRef}>
                      <div className="absolute w-full education-scroll">
                        {/* First set */}
                        <div className="education-item">
                          <div className="w-3 h-3 bg-chart-3 rounded-full mr-4 flex-shrink-0"></div>
                          <div className="text-left">
                            <div className="text-xs font-semibold text-chart-3 uppercase tracking-wide mb-1">Major Award</div>
                            <div className="text-foreground font-medium">California 2023 Technology Innovation Award - "Best Application Serving the Public" | Sacramento, CA</div>
                          </div>
                        </div>
                        <div className="education-item">
                          <div className="w-3 h-3 bg-chart-1 rounded-full mr-4 flex-shrink-0"></div>
                          <div className="text-left">
                            <div className="text-xs font-semibold text-chart-1 uppercase tracking-wide mb-1">Publication</div>
                            <div className="text-foreground font-medium">UX Collective (uxdesign.cc) - "13 ways AI assistants can accelerate your job search" (Founder's article)</div>
                          </div>
                        </div>
                        <div className="education-item">
                          <div className="w-3 h-3 bg-chart-3 rounded-full mr-4 flex-shrink-0"></div>
                          <div className="text-left">
                            <div className="text-xs font-semibold text-chart-3 uppercase tracking-wide mb-1">Industry Award</div>
                            <div className="text-foreground font-medium">ProMax Silver Award - "Best Consumer/Trade Promotion" ABC6 Playhouse | MA</div>
                          </div>
                        </div>
                        <div className="education-item">
                          <div className="w-3 h-3 bg-chart-2 rounded-full mr-4 flex-shrink-0"></div>
                          <div className="text-left">
                            <div className="text-xs font-semibold text-chart-2 uppercase tracking-wide mb-1">Media Feature</div>
                            <div className="text-foreground font-medium">Vibe Magazine - "Ski Conditioning with Alexis and Carl" 6-page spread</div>
                          </div>
                        </div>
                        <div className="education-item">
                          <div className="w-3 h-3 bg-chart-1 rounded-full mr-4 flex-shrink-0"></div>
                          <div className="text-left">
                            <div className="text-xs font-semibold text-chart-1 uppercase tracking-wide mb-1">Scholarship</div>
                            <div className="text-foreground font-medium">Women in Technology Scholar - University of New Hampshire | NH</div>
                          </div>
                        </div>
                        <div className="education-item">
                          <div className="w-3 h-3 bg-chart-3 rounded-full mr-4 flex-shrink-0"></div>
                          <div className="text-left">
                            <div className="text-xs font-semibold text-chart-3 uppercase tracking-wide mb-1">Industry Award</div>
                            <div className="text-foreground font-medium">BDA International Silver Award - "Advertising Campaign" WLNE-TV ABC6 "Hate the Rain" | RI</div>
                          </div>
                        </div>
                        <div className="education-item">
                          <div className="w-3 h-3 bg-chart-1 rounded-full mr-4 flex-shrink-0"></div>
                          <div className="text-left">
                            <div className="text-xs font-semibold text-chart-1 uppercase tracking-wide mb-1">Publication</div>
                            <div className="text-foreground font-medium">UX Collective (uxdesign.cc) - "What a health crisis taught us about product design" (Founder's article)</div>
                          </div>
                        </div>
                        <div className="education-item">
                          <div className="w-3 h-3 bg-chart-2 rounded-full mr-4 flex-shrink-0"></div>
                          <div className="text-left">
                            <div className="text-xs font-semibold text-chart-2 uppercase tracking-wide mb-1">Recognition</div>
                            <div className="text-foreground font-medium">Conway Daily Sun Readers Choice Award - "Best Personal Trainer" | NH</div>
                          </div>
                        </div>
                        <div className="education-item">
                          <div className="w-3 h-3 bg-chart-3 rounded-full mr-4 flex-shrink-0"></div>
                          <div className="text-left">
                            <div className="text-xs font-semibold text-chart-3 uppercase tracking-wide mb-1">Industry Award</div>
                            <div className="text-foreground font-medium">Publicity Club of New England - 27th Annual Bell Ringer Awards | RI</div>
                          </div>
                        </div>
                        <div className="education-item">
                          <div className="w-3 h-3 bg-chart-1 rounded-full mr-4 flex-shrink-0"></div>
                          <div className="text-left">
                            <div className="text-xs font-semibold text-chart-1 uppercase tracking-wide mb-1">Publication</div>
                            <div className="text-foreground font-medium">Graphic Design on a Limited Budget - Multiple featured projects | RI</div>
                          </div>
                        </div>
                        <div className="education-item">
                          <div className="w-3 h-3 bg-chart-2 rounded-full mr-4 flex-shrink-0"></div>
                          <div className="text-left">
                            <div className="text-xs font-semibold text-chart-2 uppercase tracking-wide mb-1">Media Feature</div>
                            <div className="text-foreground font-medium">Providence Journal feature - WLNE-TV "ABC6 Playhouse" | Emerald Square Mall, MA</div>
                          </div>
                        </div>
                        <div className="education-item">
                          <div className="w-3 h-3 bg-chart-1 rounded-full mr-4 flex-shrink-0"></div>
                          <div className="text-left">
                            <div className="text-xs font-semibold text-chart-1 uppercase tracking-wide mb-1">Scholarship</div>
                            <div className="text-foreground font-medium">Kathy Anderson Award - NHEC Foundation "Women furthering Education over 25" | NH</div>
                          </div>
                        </div>
                        <div className="education-item">
                          <div className="w-3 h-3 bg-chart-2 rounded-full mr-4 flex-shrink-0"></div>
                          <div className="text-left">
                            <div className="text-xs font-semibold text-chart-2 uppercase tracking-wide mb-1">Recognition</div>
                            <div className="text-foreground font-medium">WLNE-TV ABC6 Readers Choice Award - "Best RI Design Firm" Alexis Design | RI</div>
                          </div>
                        </div>

                        {/* Duplicate set for seamless loop */}
                        <div className="education-item">
                          <div className="w-3 h-3 bg-chart-3 rounded-full mr-4 flex-shrink-0"></div>
                          <div className="text-left">
                            <div className="text-xs font-semibold text-chart-3 uppercase tracking-wide mb-1">Major Award</div>
                            <div className="text-foreground font-medium">California 2023 Technology Innovation Award - "Best Application Serving the Public" | Sacramento, CA</div>
                          </div>
                        </div>
                        <div className="education-item">
                          <div className="w-3 h-3 bg-chart-1 rounded-full mr-4 flex-shrink-0"></div>
                          <div className="text-left">
                            <div className="text-xs font-semibold text-chart-1 uppercase tracking-wide mb-1">Publication</div>
                            <div className="text-foreground font-medium">UX Collective (uxdesign.cc) - "13 ways AI assistants can accelerate your job search" (Founder's article)</div>
                          </div>
                        </div>
                        <div className="education-item">
                          <div className="w-3 h-3 bg-chart-3 rounded-full mr-4 flex-shrink-0"></div>
                          <div className="text-left">
                            <div className="text-xs font-semibold text-chart-3 uppercase tracking-wide mb-1">Industry Award</div>
                            <div className="text-foreground font-medium">ProMax Silver Award - "Best Consumer/Trade Promotion" ABC6 Playhouse | MA</div>
                          </div>
                        </div>
                        <div className="education-item">
                          <div className="w-3 h-3 bg-chart-2 rounded-full mr-4 flex-shrink-0"></div>
                          <div className="text-left">
                            <div className="text-xs font-semibold text-chart-2 uppercase tracking-wide mb-1">Media Feature</div>
                            <div className="text-foreground font-medium">Vibe Magazine - "Ski Conditioning with Alexis and Carl" 6-page spread</div>
                          </div>
                        </div>
                        <div className="education-item">
                          <div className="w-3 h-3 bg-chart-1 rounded-full mr-4 flex-shrink-0"></div>
                          <div className="text-left">
                            <div className="text-xs font-semibold text-chart-1 uppercase tracking-wide mb-1">Scholarship</div>
                            <div className="text-foreground font-medium">Women in Technology Scholar - University of New Hampshire | NH</div>
                          </div>
                        </div>
                        <div className="education-item">
                          <div className="w-3 h-3 bg-chart-3 rounded-full mr-4 flex-shrink-0"></div>
                          <div className="text-left">
                            <div className="text-xs font-semibold text-chart-3 uppercase tracking-wide mb-1">Industry Award</div>
                            <div className="text-foreground font-medium">BDA International Silver Award - "Advertising Campaign" WLNE-TV ABC6 "Hate the Rain" | RI</div>
                          </div>
                        </div>
                        <div className="education-item">
                          <div className="w-3 h-3 bg-chart-1 rounded-full mr-4 flex-shrink-0"></div>
                          <div className="text-left">
                            <div className="text-xs font-semibold text-chart-1 uppercase tracking-wide mb-1">Publication</div>
                            <div className="text-foreground font-medium">UX Collective (uxdesign.cc) - "What a health crisis taught us about product design" (Founder's article)</div>
                          </div>
                        </div>
                        <div className="education-item">
                          <div className="w-3 h-3 bg-chart-2 rounded-full mr-4 flex-shrink-0"></div>
                          <div className="text-left">
                            <div className="text-xs font-semibold text-chart-2 uppercase tracking-wide mb-1">Recognition</div>
                            <div className="text-foreground font-medium">Conway Daily Sun Readers Choice Award - "Best Personal Trainer" | NH</div>
                          </div>
                        </div>
                        <div className="education-item">
                          <div className="w-3 h-3 bg-chart-3 rounded-full mr-4 flex-shrink-0"></div>
                          <div className="text-left">
                            <div className="text-xs font-semibold text-chart-3 uppercase tracking-wide mb-1">Industry Award</div>
                            <div className="text-foreground font-medium">Publicity Club of New England - 27th Annual Bell Ringer Awards | RI</div>
                          </div>
                        </div>
                        <div className="education-item">
                          <div className="w-3 h-3 bg-chart-1 rounded-full mr-4 flex-shrink-0"></div>
                          <div className="text-left">
                            <div className="text-xs font-semibold text-chart-1 uppercase tracking-wide mb-1">Publication</div>
                            <div className="text-foreground font-medium">Graphic Design on a Limited Budget - Multiple featured projects | RI</div>
                          </div>
                        </div>
                        <div className="education-item">
                          <div className="w-3 h-3 bg-chart-2 rounded-full mr-4 flex-shrink-0"></div>
                          <div className="text-left">
                            <div className="text-xs font-semibold text-chart-2 uppercase tracking-wide mb-1">Media Feature</div>
                            <div className="text-foreground font-medium">Providence Journal feature - WLNE-TV "ABC6 Playhouse" | Emerald Square Mall, MA</div>
                          </div>
                        </div>
                        <div className="education-item">
                          <div className="w-3 h-3 bg-chart-1 rounded-full mr-4 flex-shrink-0"></div>
                          <div className="text-left">
                            <div className="text-xs font-semibold text-chart-1 uppercase tracking-wide mb-1">Scholarship</div>
                            <div className="text-foreground font-medium">Kathy Anderson Award - NHEC Foundation "Women furthering Education over 25" | NH</div>
                          </div>
                        </div>
                        <div className="education-item">
                          <div className="w-3 h-3 bg-chart-2 rounded-full mr-4 flex-shrink-0"></div>
                          <div className="text-left">
                            <div className="text-xs font-semibold text-chart-2 uppercase tracking-wide mb-1">Recognition</div>
                            <div className="text-foreground font-medium">WLNE-TV ABC6 Readers Choice Award - "Best RI Design Firm" Alexis Design | RI</div>
                          </div>
                        </div>
                      </div>

                      {/* Fade gradients */}
                      <div className="absolute top-0 left-0 right-0 h-12 bg-gradient-to-b from-background to-transparent pointer-events-none z-10"></div>
                      <div className="absolute bottom-0 left-0 right-0 h-12 bg-gradient-to-t from-background to-transparent pointer-events-none z-10"></div>
                    </div>
                  </div>

                  <p className="text-muted-foreground text-sm mt-4 italic text-center">
                    Drag to scroll or let it auto-scroll
                  </p>
                </div>
              )}

              {activeTab === 'community' && (
                <div>
                  {/* Scrolling Community & Leadership List */}
                  <div 
                    className={`glass rounded-xl p-6 relative overflow-hidden ${isDragging ? 'dragging cursor-grabbing' : 'cursor-grab'}`}
                    onMouseDown={handleMouseDown}
                    onMouseMove={handleMouseMove}
                    onMouseUp={handleMouseUp}
                    onMouseLeave={handleMouseLeave}
                    onTouchStart={handleTouchStart}
                    onTouchMove={handleTouchMove}
                    onTouchEnd={handleTouchEnd}
                  >
                    <div className="h-64 relative overflow-y-auto scrollbar-hide" ref={scrollContainerRef}>
                      <div className="absolute w-full education-scroll">
                        {/* First set */}
                        <div className="education-item">
                          <div className="w-3 h-3 bg-chart-3 rounded-full mr-4 flex-shrink-0"></div>
                          <div className="text-left">
                            <div className="text-xs font-semibold text-chart-3 uppercase tracking-wide mb-1">Keynote Speaker</div>
                            <div className="text-foreground font-medium">AIxUX Summit | Keynote Speaker</div>
                          </div>
                        </div>
                        <div className="education-item">
                          <div className="w-3 h-3 bg-chart-3 rounded-full mr-4 flex-shrink-0"></div>
                          <div className="text-left">
                            <div className="text-xs font-semibold text-chart-3 uppercase tracking-wide mb-1">Keynote Speaker</div>
                            <div className="text-foreground font-medium">Fortune 500 Fintech | Keynote Speaker</div>
                          </div>
                        </div>
                        <div className="education-item">
                          <div className="w-3 h-3 bg-chart-3 rounded-full mr-4 flex-shrink-0"></div>
                          <div className="text-left">
                            <div className="text-xs font-semibold text-chart-3 uppercase tracking-wide mb-1">Keynote Speaker</div>
                            <div className="text-foreground font-medium">American Red Cross | Keynote Speaker, Spring 2026</div>
                          </div>
                        </div>
                        <div className="education-item">
                          <div className="w-3 h-3 bg-chart-1 rounded-full mr-4 flex-shrink-0"></div>
                          <div className="text-left">
                            <div className="text-xs font-semibold text-chart-1 uppercase tracking-wide mb-1">Professional Group</div>
                            <div className="text-foreground font-medium">PMI NH Chapter | Member</div>
                          </div>
                        </div>
                        <div className="education-item">
                          <div className="w-3 h-3 bg-chart-3 rounded-full mr-4 flex-shrink-0"></div>
                          <div className="text-left">
                            <div className="text-xs font-semibold text-chart-3 uppercase tracking-wide mb-1">Leadership</div>
                            <div className="text-foreground font-medium">New Hampshire AI Task Force | AI Adoption Specialist</div>
                          </div>
                        </div>
                        <div className="education-item">
                          <div className="w-3 h-3 bg-chart-1 rounded-full mr-4 flex-shrink-0"></div>
                          <div className="text-left">
                            <div className="text-xs font-semibold text-chart-1 uppercase tracking-wide mb-1">Professional Group</div>
                            <div className="text-foreground font-medium">AI in New Hampshire | Chapter Member</div>
                          </div>
                        </div>
                        <div className="education-item">
                          <div className="w-3 h-3 bg-chart-1 rounded-full mr-4 flex-shrink-0"></div>
                          <div className="text-left">
                            <div className="text-xs font-semibold text-chart-1 uppercase tracking-wide mb-1">Professional Group</div>
                            <div className="text-foreground font-medium">AI Tinkerers NH | Chapter Member</div>
                          </div>
                        </div>
                        <div className="education-item">
                          <div className="w-3 h-3 bg-chart-1 rounded-full mr-4 flex-shrink-0"></div>
                          <div className="text-left">
                            <div className="text-xs font-semibold text-chart-1 uppercase tracking-wide mb-1">Professional Group</div>
                            <div className="text-foreground font-medium">Salesforce User Group – NH division | Salesforce Member</div>
                          </div>
                        </div>
                        <div className="education-item">
                          <div className="w-3 h-3 bg-chart-2 rounded-full mr-4 flex-shrink-0"></div>
                          <div className="text-left">
                            <div className="text-xs font-semibold text-chart-2 uppercase tracking-wide mb-1">Content Creation</div>
                            <div className="text-foreground font-medium">UX Collective (uxdesign.cc) | Contributing Author</div>
                          </div>
                        </div>
                        <div className="education-item">
                          <div className="w-3 h-3 bg-chart-3 rounded-full mr-4 flex-shrink-0"></div>
                          <div className="text-left">
                            <div className="text-xs font-semibold text-chart-3 uppercase tracking-wide mb-1">Leadership</div>
                            <div className="text-foreground font-medium">AI UX/UI at UXSG | Co-host & Founding Contributor</div>
                          </div>
                        </div>
                        <div className="education-item">
                          <div className="w-3 h-3 bg-chart-1 rounded-full mr-4 flex-shrink-0"></div>
                          <div className="text-left">
                            <div className="text-xs font-semibold text-chart-1 uppercase tracking-wide mb-1">Beta Testing</div>
                            <div className="text-foreground font-medium">AI Copilot Enterprise | Sikich Beta Team Contributor</div>
                          </div>
                        </div>
                        <div className="education-item">
                          <div className="w-3 h-3 bg-chart-3 rounded-full mr-4 flex-shrink-0"></div>
                          <div className="text-left">
                            <div className="text-xs font-semibold text-chart-3 uppercase tracking-wide mb-1">Leadership</div>
                            <div className="text-foreground font-medium">Job Search Council (JSC) | Council Moderator</div>
                          </div>
                        </div>
                        <div className="education-item">
                          <div className="w-3 h-3 bg-chart-2 rounded-full mr-4 flex-shrink-0"></div>
                          <div className="text-left">
                            <div className="text-xs font-semibold text-chart-2 uppercase tracking-wide mb-1">Education</div>
                            <div className="text-foreground font-medium">Mt. Washington Valley STEM Expos | Science Fair Judge</div>
                          </div>
                        </div>
                        <div className="education-item">
                          <div className="w-3 h-3 bg-chart-3 rounded-full mr-4 flex-shrink-0"></div>
                          <div className="text-left">
                            <div className="text-xs font-semibold text-chart-3 uppercase tracking-wide mb-1">Leadership</div>
                            <div className="text-foreground font-medium">Mt. Washington Valley Community Band | Section Leader - Percussion</div>
                          </div>
                        </div>
                        <div className="education-item">
                          <div className="w-3 h-3 bg-chart-2 rounded-full mr-4 flex-shrink-0"></div>
                          <div className="text-left">
                            <div className="text-xs font-semibold text-chart-2 uppercase tracking-wide mb-1">Community Service</div>
                            <div className="text-foreground font-medium">Habitat for Humanity – MWV Chapter | Volunteer & Videographer</div>
                          </div>
                        </div>
                        <div className="education-item">
                          <div className="w-3 h-3 bg-chart-3 rounded-full mr-4 flex-shrink-0"></div>
                          <div className="text-left">
                            <div className="text-xs font-semibold text-chart-3 uppercase tracking-wide mb-1">Board Leadership</div>
                            <div className="text-foreground font-medium">Mt. Washington Valley Children's Museum | Vice President Board of Directors</div>
                          </div>
                        </div>
                        <div className="education-item">
                          <div className="w-3 h-3 bg-chart-2 rounded-full mr-4 flex-shrink-0"></div>
                          <div className="text-left">
                            <div className="text-xs font-semibold text-chart-2 uppercase tracking-wide mb-1">Community Service</div>
                            <div className="text-foreground font-medium">Conway Cares Revolving Closet | Volunteer & Donor</div>
                          </div>
                        </div>
                        <div className="education-item">
                          <div className="w-3 h-3 bg-chart-1 rounded-full mr-4 flex-shrink-0"></div>
                          <div className="text-left">
                            <div className="text-xs font-semibold text-chart-1 uppercase tracking-wide mb-1">International</div>
                            <div className="text-foreground font-medium">Diverbo Pueblo Ingles | Salamanca, SPAIN | English Instructor</div>
                          </div>
                        </div>
                        <div className="education-item">
                          <div className="w-3 h-3 bg-chart-2 rounded-full mr-4 flex-shrink-0"></div>
                          <div className="text-left">
                            <div className="text-xs font-semibold text-chart-2 uppercase tracking-wide mb-1">Education</div>
                            <div className="text-foreground font-medium">SAU9 (ESSC) Eastern Slope Skier Community | Ski Instructor</div>
                          </div>
                        </div>
                        <div className="education-item">
                          <div className="w-3 h-3 bg-chart-1 rounded-full mr-4 flex-shrink-0"></div>
                          <div className="text-left">
                            <div className="text-xs font-semibold text-chart-1 uppercase tracking-wide mb-1">Training & Safety</div>
                            <div className="text-foreground font-medium">American Red Cross (ARC) – RI, NH Chapters | CPR & First Aid Instructor</div>
                          </div>
                        </div>
                        <div className="education-item">
                          <div className="w-3 h-3 bg-chart-3 rounded-full mr-4 flex-shrink-0"></div>
                          <div className="text-left">
                            <div className="text-xs font-semibold text-chart-3 uppercase tracking-wide mb-1">Leadership</div>
                            <div className="text-foreground font-medium">Mt. Washington Valley Div Cal Ripken Baseball | Head Coach</div>
                          </div>
                        </div>
                        <div className="education-item">
                          <div className="w-3 h-3 bg-chart-2 rounded-full mr-4 flex-shrink-0"></div>
                          <div className="text-left">
                            <div className="text-xs font-semibold text-chart-2 uppercase tracking-wide mb-1">Arts & Culture</div>
                            <div className="text-foreground font-medium">Arts in Motion Theater | Actor and Volunteer</div>
                          </div>
                        </div>
                        <div className="education-item">
                          <div className="w-3 h-3 bg-chart-1 rounded-full mr-4 flex-shrink-0"></div>
                          <div className="text-left">
                            <div className="text-xs font-semibold text-chart-1 uppercase tracking-wide mb-1">Fitness & Wellness</div>
                            <div className="text-foreground font-medium">Cranmore Mountain Fitness Center | Personal Trainer & Group Fitness Instructor</div>
                          </div>
                        </div>
                        <div className="education-item">
                          <div className="w-3 h-3 bg-chart-3 rounded-full mr-4 flex-shrink-0"></div>
                          <div className="text-left">
                            <div className="text-xs font-semibold text-chart-3 uppercase tracking-wide mb-1">Founding Member</div>
                            <div className="text-foreground font-medium">Delta Gamma Fraternity – Alpha Epsilon | Founding Sister</div>
                          </div>
                        </div>

                        {/* Duplicate set for seamless loop */}
                        <div className="education-item">
                          <div className="w-3 h-3 bg-chart-3 rounded-full mr-4 flex-shrink-0"></div>
                          <div className="text-left">
                            <div className="text-xs font-semibold text-chart-3 uppercase tracking-wide mb-1">Keynote Speaker</div>
                            <div className="text-foreground font-medium">AIxUX Summit | Keynote Speaker</div>
                          </div>
                        </div>
                        <div className="education-item">
                          <div className="w-3 h-3 bg-chart-3 rounded-full mr-4 flex-shrink-0"></div>
                          <div className="text-left">
                            <div className="text-xs font-semibold text-chart-3 uppercase tracking-wide mb-1">Keynote Speaker</div>
                            <div className="text-foreground font-medium">Fortune 500 Fintech | Keynote Speaker</div>
                          </div>
                        </div>
                        <div className="education-item">
                          <div className="w-3 h-3 bg-chart-3 rounded-full mr-4 flex-shrink-0"></div>
                          <div className="text-left">
                            <div className="text-xs font-semibold text-chart-3 uppercase tracking-wide mb-1">Keynote Speaker</div>
                            <div className="text-foreground font-medium">American Red Cross | Keynote Speaker, Spring 2026</div>
                          </div>
                        </div>
                        <div className="education-item">
                          <div className="w-3 h-3 bg-chart-1 rounded-full mr-4 flex-shrink-0"></div>
                          <div className="text-left">
                            <div className="text-xs font-semibold text-chart-1 uppercase tracking-wide mb-1">Professional Group</div>
                            <div className="text-foreground font-medium">PMI NH Chapter | Member</div>
                          </div>
                        </div>
                        <div className="education-item">
                          <div className="w-3 h-3 bg-chart-3 rounded-full mr-4 flex-shrink-0"></div>
                          <div className="text-left">
                            <div className="text-xs font-semibold text-chart-3 uppercase tracking-wide mb-1">Leadership</div>
                            <div className="text-foreground font-medium">New Hampshire AI Task Force | AI Adoption Specialist</div>
                          </div>
                        </div>
                        <div className="education-item">
                          <div className="w-3 h-3 bg-chart-1 rounded-full mr-4 flex-shrink-0"></div>
                          <div className="text-left">
                            <div className="text-xs font-semibold text-chart-1 uppercase tracking-wide mb-1">Professional Group</div>
                            <div className="text-foreground font-medium">AI in New Hampshire | Chapter Member</div>
                          </div>
                        </div>
                        <div className="education-item">
                          <div className="w-3 h-3 bg-chart-1 rounded-full mr-4 flex-shrink-0"></div>
                          <div className="text-left">
                            <div className="text-xs font-semibold text-chart-1 uppercase tracking-wide mb-1">Professional Group</div>
                            <div className="text-foreground font-medium">AI Tinkerers NH | Chapter Member</div>
                          </div>
                        </div>
                        <div className="education-item">
                          <div className="w-3 h-3 bg-chart-1 rounded-full mr-4 flex-shrink-0"></div>
                          <div className="text-left">
                            <div className="text-xs font-semibold text-chart-1 uppercase tracking-wide mb-1">Professional Group</div>
                            <div className="text-foreground font-medium">Salesforce User Group – NH division | Salesforce Member</div>
                          </div>
                        </div>
                        <div className="education-item">
                          <div className="w-3 h-3 bg-chart-2 rounded-full mr-4 flex-shrink-0"></div>
                          <div className="text-left">
                            <div className="text-xs font-semibold text-chart-2 uppercase tracking-wide mb-1">Content Creation</div>
                            <div className="text-foreground font-medium">UX Collective (uxdesign.cc) | Contributing Author</div>
                          </div>
                        </div>
                        <div className="education-item">
                          <div className="w-3 h-3 bg-chart-3 rounded-full mr-4 flex-shrink-0"></div>
                          <div className="text-left">
                            <div className="text-xs font-semibold text-chart-3 uppercase tracking-wide mb-1">Leadership</div>
                            <div className="text-foreground font-medium">AI UX/UI at UXSG | Co-host & Founding Contributor</div>
                          </div>
                        </div>
                        <div className="education-item">
                          <div className="w-3 h-3 bg-chart-1 rounded-full mr-4 flex-shrink-0"></div>
                          <div className="text-left">
                            <div className="text-xs font-semibold text-chart-1 uppercase tracking-wide mb-1">Beta Testing</div>
                            <div className="text-foreground font-medium">AI Copilot Enterprise | Sikich Beta Team Contributor</div>
                          </div>
                        </div>
                        <div className="education-item">
                          <div className="w-3 h-3 bg-chart-3 rounded-full mr-4 flex-shrink-0"></div>
                          <div className="text-left">
                            <div className="text-xs font-semibold text-chart-3 uppercase tracking-wide mb-1">Leadership</div>
                            <div className="text-foreground font-medium">Job Search Council (JSC) | Council Moderator</div>
                          </div>
                        </div>
                        <div className="education-item">
                          <div className="w-3 h-3 bg-chart-2 rounded-full mr-4 flex-shrink-0"></div>
                          <div className="text-left">
                            <div className="text-xs font-semibold text-chart-2 uppercase tracking-wide mb-1">Education</div>
                            <div className="text-foreground font-medium">Mt. Washington Valley STEM Expos | Science Fair Judge</div>
                          </div>
                        </div>
                        <div className="education-item">
                          <div className="w-3 h-3 bg-chart-3 rounded-full mr-4 flex-shrink-0"></div>
                          <div className="text-left">
                            <div className="text-xs font-semibold text-chart-3 uppercase tracking-wide mb-1">Leadership</div>
                            <div className="text-foreground font-medium">Mt. Washington Valley Community Band | Section Leader - Percussion</div>
                          </div>
                        </div>
                        <div className="education-item">
                          <div className="w-3 h-3 bg-chart-2 rounded-full mr-4 flex-shrink-0"></div>
                          <div className="text-left">
                            <div className="text-xs font-semibold text-chart-2 uppercase tracking-wide mb-1">Community Service</div>
                            <div className="text-foreground font-medium">Habitat for Humanity – MWV Chapter | Volunteer & Videographer</div>
                          </div>
                        </div>
                        <div className="education-item">
                          <div className="w-3 h-3 bg-chart-3 rounded-full mr-4 flex-shrink-0"></div>
                          <div className="text-left">
                            <div className="text-xs font-semibold text-chart-3 uppercase tracking-wide mb-1">Board Leadership</div>
                            <div className="text-foreground font-medium">Mt. Washington Valley Children's Museum | Vice President Board of Directors</div>
                          </div>
                        </div>
                        <div className="education-item">
                          <div className="w-3 h-3 bg-chart-2 rounded-full mr-4 flex-shrink-0"></div>
                          <div className="text-left">
                            <div className="text-xs font-semibold text-chart-2 uppercase tracking-wide mb-1">Community Service</div>
                            <div className="text-foreground font-medium">Conway Cares Revolving Closet | Volunteer & Donor</div>
                          </div>
                        </div>
                        <div className="education-item">
                          <div className="w-3 h-3 bg-chart-1 rounded-full mr-4 flex-shrink-0"></div>
                          <div className="text-left">
                            <div className="text-xs font-semibold text-chart-1 uppercase tracking-wide mb-1">International</div>
                            <div className="text-foreground font-medium">Diverbo Pueblo Ingles | Salamanca, SPAIN | English Instructor</div>
                          </div>
                        </div>
                        <div className="education-item">
                          <div className="w-3 h-3 bg-chart-2 rounded-full mr-4 flex-shrink-0"></div>
                          <div className="text-left">
                            <div className="text-xs font-semibold text-chart-2 uppercase tracking-wide mb-1">Education</div>
                            <div className="text-foreground font-medium">SAU9 (ESSC) Eastern Slope Skier Community | Ski Instructor</div>
                          </div>
                        </div>
                        <div className="education-item">
                          <div className="w-3 h-3 bg-chart-1 rounded-full mr-4 flex-shrink-0"></div>
                          <div className="text-left">
                            <div className="text-xs font-semibold text-chart-1 uppercase tracking-wide mb-1">Training & Safety</div>
                            <div className="text-foreground font-medium">American Red Cross (ARC) – RI, NH Chapters | CPR & First Aid Instructor</div>
                          </div>
                        </div>
                        <div className="education-item">
                          <div className="w-3 h-3 bg-chart-3 rounded-full mr-4 flex-shrink-0"></div>
                          <div className="text-left">
                            <div className="text-xs font-semibold text-chart-3 uppercase tracking-wide mb-1">Leadership</div>
                            <div className="text-foreground font-medium">Mt. Washington Valley Div Cal Ripken Baseball | Head Coach</div>
                          </div>
                        </div>
                        <div className="education-item">
                          <div className="w-3 h-3 bg-chart-2 rounded-full mr-4 flex-shrink-0"></div>
                          <div className="text-left">
                            <div className="text-xs font-semibold text-chart-2 uppercase tracking-wide mb-1">Arts & Culture</div>
                            <div className="text-foreground font-medium">Arts in Motion Theater | Actor and Volunteer</div>
                          </div>
                        </div>
                        <div className="education-item">
                          <div className="w-3 h-3 bg-chart-1 rounded-full mr-4 flex-shrink-0"></div>
                          <div className="text-left">
                            <div className="text-xs font-semibold text-chart-1 uppercase tracking-wide mb-1">Fitness & Wellness</div>
                            <div className="text-foreground font-medium">Cranmore Mountain Fitness Center | Personal Trainer & Group Fitness Instructor</div>
                          </div>
                        </div>
                        <div className="education-item">
                          <div className="w-3 h-3 bg-chart-3 rounded-full mr-4 flex-shrink-0"></div>
                          <div className="text-left">
                            <div className="text-xs font-semibold text-chart-3 uppercase tracking-wide mb-1">Founding Member</div>
                            <div className="text-foreground font-medium">Delta Gamma Fraternity – Alpha Epsilon | Founding Sister</div>
                          </div>
                        </div>
                      </div>

                      {/* Fade gradients */}
                      <div className="absolute top-0 left-0 right-0 h-12 bg-gradient-to-b from-background to-transparent pointer-events-none z-10"></div>
                      <div className="absolute bottom-0 left-0 right-0 h-12 bg-gradient-to-t from-background to-transparent pointer-events-none z-10"></div>
                    </div>
                  </div>

                  <p className="text-muted-foreground text-sm mt-4 italic text-center">
                    Drag to scroll or let it auto-scroll
                  </p>
                </div>
              )}

              {activeTab === 'funfact' && (
                <div className="text-center">
                  <h3 className="font-semibold mb-6 text-xl" style={{ color: '#F3E8B9' }}>Also a certified personal trainer</h3>
                  <div className="flex justify-center">
                    <div className="relative aspect-video max-w-sm rounded-xl overflow-hidden animate-float glass">
                      <video
                        ref={videoRef}
                        src={profileVideo}
                        muted
                        playsInline
                        onPlay={() => setIsVideoPlaying(true)}
                        onPause={() => setIsVideoPlaying(false)}
                        onEnded={handleVideoEnded}
                        className="w-full h-full object-cover"
                        data-testid="video-profile"
                      />
                      <button
                        type="button"
                        onClick={toggleVideoPlayback}
                        aria-label={isVideoPlaying ? 'Pause video' : 'Play video'}
                        data-testid="button-video-toggle"
                        className="absolute bottom-3 right-3 flex items-center justify-center w-10 h-10 rounded-full glass text-white/90 hover:text-white hover:scale-105 transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-white/70 focus-visible:ring-offset-2 focus-visible:ring-offset-black/30"
                      >
                        {isVideoPlaying ? (
                          <Pause className="w-4 h-4" fill="currentColor" />
                        ) : (
                          <Play className="w-4 h-4 ml-0.5" fill="currentColor" />
                        )}
                      </button>
                    </div>
                  </div>
                </div>
              )}


        </div>
      </div>
    </section>
  );
}