import { Badge } from "@/components/ui/badge";
import professionalPhoto from "@assets/Brochu, Alexis 2023 Ireland_1754523029765.png";
import profileVideo from "@assets/20181006_190845_1754603621565.mp4";
import awardImage from "@assets/CA Gov Tech Awards 2023_1754604147417.jpg";

const skills = [
  { name: 'Product Management', color: 'text-primary' },
  { name: 'UX Design', color: 'text-chart-4' },
  { name: 'User Research', color: 'text-chart-1' },
  { name: 'Change Management', color: 'text-chart-2' }
];

export default function AboutSection() {
  return (
    <section id="about" className="py-20 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-secondary/50 to-accent/50"></div>
      
      <div className="relative z-10 max-w-7xl mx-auto px-6">
        <h2 className="text-4xl md:text-5xl font-bold mb-12 text-center">
          <span className="gradient-text">My Expertise</span>
        </h2>
        
        <div className="space-y-16">
          {/* Introduction Quote */}
          <div className="text-center max-w-4xl mx-auto">
            <p className="text-xl md:text-2xl leading-relaxed text-muted-foreground">
              <strong className="text-foreground">"My colleagues nickname me: 'Idea Factory' but I prefer 'Solution Factory'"</strong> because every idea I come up with stems from a problem. Without problems, there are no solutions. Without solutions, there are no (relevant) ideas.
            </p>
          </div>

          {/* Two Column Layout */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-stretch">
            {/* Left: Expertise Cards */}
            <div className="space-y-6">
              <div className="glass rounded-xl p-6">
                <h3 className="font-semibold text-primary mb-3">Product Management</h3>
                <p className="text-muted-foreground text-sm">
                  Strategic product vision, roadmap development, and cross-functional team leadership to deliver user-centered solutions.
                </p>
              </div>
              <div className="glass rounded-xl p-6">
                <h3 className="font-semibold text-primary mb-3">AI-Enhanced Design Process</h3>
                <p className="text-muted-foreground text-sm">
                  Leveraging AI tools and human-centered design methodologies to create intuitive, data-driven experiences that solve real user problems.
                </p>
              </div>
              <div className="glass rounded-xl p-6">
                <h3 className="font-semibold text-primary mb-3">User Research & Insights</h3>
                <p className="text-muted-foreground text-sm">
                  Comprehensive user research, data analysis, and behavioral insights to inform product decisions.
                </p>
              </div>
              <div className="glass rounded-xl p-6">
                <h3 className="font-semibold text-primary mb-3">Change Management</h3>
                <p className="text-muted-foreground text-sm">
                  Organizational transformation, stakeholder alignment, and adoption strategies for successful product launches.
                </p>
              </div>
            </div>

            {/* Right: Profile Images and Award - Flex aligned */}
            <div className="flex flex-col justify-between h-full">
              {/* Personal Trainer Section Header */}
              <div className="mb-4">
                <h3 className="font-semibold text-primary text-center">Fun fact: I'm also a certified personal trainer</h3>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div className="aspect-square rounded-2xl overflow-hidden animate-float glass">
                  <img 
                    src={professionalPhoto}
                    alt="Alexis Brochu Professional Photo"
                    className="w-full h-full object-cover"
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
                  />
                </div>
              </div>
              
              {/* Award Section - Fixed height to match content */}
              <div className="glass rounded-xl p-6 group relative overflow-hidden perspective-1000 h-[220px]">
                <div className="flip-card w-full h-full">
                  {/* Front side - Text content */}
                  <div className="flip-card-front absolute inset-0 pt-3 pb-5 px-4 backface-hidden transition-transform duration-700 group-hover:rotate-y-180 flex flex-col justify-center">
                    <h3 className="font-semibold text-chart-4 mb-3">California Tech Award for Innovation</h3>
                    <p className="text-muted-foreground text-sm mb-2">
                      When I joined Cal OES, government workers were drowning in confusing legacy applications that frustrated users and blocked critical disaster response.
                    </p>
                    <p className="text-chart-4 text-sm">
                      My solution was to become fluent in both their technical constraints and human needs. After months of 350+ user interviews and strategic redesign, we increased the user base by 545%, and the team won four regional awards including California's Government Innovation Award - Best Application Serving the Public.
                    </p>
                  </div>
                  
                  {/* Back side - Award image */}
                  <div className="flip-card-back absolute inset-0 backface-hidden transition-transform duration-700 rotate-y-180 group-hover:rotate-y-0">
                    <img 
                      src={awardImage}
                      alt="California Government Technology Innovation Summit 2023 Awards"
                      className="w-full h-full object-cover rounded-lg"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}