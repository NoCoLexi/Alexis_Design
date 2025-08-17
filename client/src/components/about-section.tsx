import { Badge } from "@/components/ui/badge";
import { Award } from "lucide-react";
import professionalPhoto from "@assets/Brochu, Alexis 2023 Ireland_1754523029765.png";
import profileVideo from "@assets/20181006_190845_1754603621565.mp4";

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
  return (
    <section id="about" className="py-20 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-secondary/50 to-accent/50"></div>
      
      <div className="relative z-10 max-w-7xl mx-auto px-6">
        <h2 className="text-4xl md:text-5xl font-bold mb-8 text-center">
          <span className="gradient-text">My Expertise</span>
        </h2>
        
        {/* Award Button */}
        <div className="flex justify-center mb-12">
          <div 
            className="inline-flex items-center gap-3 glass rounded-full px-8 py-4 hover:glow-purple transition-all duration-300 cursor-pointer transform hover:scale-105"
            onClick={onOpenAwardModal}
            data-testid="button-expertise-tech-award"
          >
            <Award className="w-6 h-6 text-chart-3" />
            <span className="text-lg font-medium text-foreground">
              2023 CA Gov Tech Award Winner
            </span>
          </div>
        </div>
        
        <div className="space-y-16">
          {/* Introduction Quote */}
          <div className="text-center max-w-4xl mx-auto">
            <p className="text-xl md:text-2xl leading-relaxed text-muted-foreground">
              <strong className="text-foreground">"My colleagues nickname me: 'Idea Factory' but I prefer 'Solution Factory'"</strong> because every idea I come up with stems from a problem. Without problems, there are no solutions. Without solutions, there are no (relevant) ideas.
            </p>
          </div>

          {/* Four Skills Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl mx-auto">
            <div className="glass rounded-xl p-6">
              <h3 className="font-semibold text-primary mb-3">Human Centered Design</h3>
              <p className="text-muted-foreground text-sm">
                Leveraging AI tools and human-centered design methodologies to create
                intuitive, data-driven experiences that solve real user problems.
              </p>
            </div>
            <div className="glass rounded-xl p-6">
              <h3 className="font-semibold text-primary mb-3">UX Research & Testing</h3>
              <p className="text-muted-foreground text-sm">
                Comprehensive user research, data analysis, and behavioral insights to inform
                product decisions through rigorous testing methodologies.
              </p>
            </div>
            <div className="glass rounded-xl p-6">
              <h3 className="font-semibold text-primary mb-3">AI Product Management</h3>
              <p className="text-muted-foreground text-sm">
                Strategic product vision leveraging AI tools and machine learning insights for
                cross-functional team leadership to deliver intelligent user-centered solutions.
              </p>
            </div>
            <div className="glass rounded-xl p-6">
              <h3 className="font-semibold text-primary mb-3">Change Management</h3>
              <p className="text-muted-foreground text-sm">
                PROSCI certified organizational transformation, stakeholder alignment, and
                adoption strategies for successful product launches.
              </p>
            </div>
          </div>

          {/* Personal Trainer Section */}
          <div className="text-center">
            <h3 className="font-semibold text-primary mb-8 text-xl">Fun fact: I'm also a certified personal trainer</h3>
            
            <div className="flex justify-center mb-12">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-md">
                <div className="aspect-square rounded-2xl overflow-hidden animate-float glass">
                  <img 
                    src={professionalPhoto}
                    alt="Alexis Brochu Professional Photo"
                    className="w-full h-full object-cover"
                    data-testid="img-professional-photo"
                  />
                </div>
                <div className="aspect-square rounded-2xl overflow-hidden animate-float" style={{ animationDelay: '1s' }}>
                  <video
                    src={profileVideo}
                    autoPlay
                    loop
                    muted
                    playsInline
                    className="w-full h-full object-cover"
                    data-testid="video-profile"
                  />
                </div>
              </div>
            </div>

            {/* Education Section */}
            <div className="max-w-4xl mx-auto">
              <h3 className="font-semibold text-primary mb-8 text-xl">Some of my education and certs include</h3>
              
              {/* Scrolling Education List */}
              <div className="glass rounded-xl p-6 relative overflow-hidden">
                <div className="h-64 relative">
                  <div className="absolute w-full education-scroll">
                    {/* First set */}
                    <div className="education-item">
                      <div className="w-3 h-3 bg-chart-3 rounded-full mr-4 flex-shrink-0"></div>
                      <div>
                        <div className="text-xs font-semibold text-chart-3 uppercase tracking-wide mb-1">Core Education</div>
                        <div className="text-foreground font-medium">Washington University in St. Louis - BFA Visual Communications</div>
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
                        <div className="text-foreground font-medium">Project Management Institute - PMP (in progress)</div>
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
                        <div className="text-foreground font-medium">Salesforce - Administration | AI Specialist | AgentForce (in progress)</div>
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
                        <div className="text-foreground font-medium">NASM - Certified Personal Trainer, Fitness Instructor, Nutrition Coach</div>
                      </div>
                    </div>
                    
                    {/* Duplicate set for seamless loop */}
                    <div className="education-item">
                      <div className="w-3 h-3 bg-chart-3 rounded-full mr-4 flex-shrink-0"></div>
                      <div>
                        <div className="text-xs font-semibold text-chart-3 uppercase tracking-wide mb-1">Core Education</div>
                        <div className="text-foreground font-medium">Washington University in St. Louis - BFA Visual Communications</div>
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
                        <div className="text-foreground font-medium">Project Management Institute - PMP (in progress)</div>
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
                        <div className="text-foreground font-medium">Salesforce - Administration | AI Specialist | AgentForce (in progress)</div>
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
                        <div className="text-foreground font-medium">NASM - Certified Personal Trainer, Fitness Instructor, Nutrition Coach</div>
                      </div>
                    </div>
                  </div>
                  
                  {/* Fade gradients */}
                  <div className="absolute top-0 left-0 right-0 h-12 bg-gradient-to-b from-background to-transparent pointer-events-none z-10"></div>
                  <div className="absolute bottom-0 left-0 right-0 h-12 bg-gradient-to-t from-background to-transparent pointer-events-none z-10"></div>
                </div>
              </div>
              
              <p className="text-muted-foreground text-sm mt-4 italic">
                Continuous learning across multiple domains • Hover to pause scrolling
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}