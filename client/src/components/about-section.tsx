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
            
            <div className="flex justify-center">
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
          </div>
        </div>
      </div>
    </section>
  );
}