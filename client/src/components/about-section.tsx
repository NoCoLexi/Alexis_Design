import { Badge } from "@/components/ui/badge";
import professionalPhoto from "@assets/Brochu, Alexis 2023 Ireland_1754523029765.png";

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
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div>
            <h2 className="text-4xl md:text-5xl font-bold mb-8">
              <span className="gradient-text">My Expertise</span>
            </h2>
            
            <div className="space-y-6 text-lg text-muted-foreground">
              <p className="leading-relaxed">
                <strong className="text-foreground">"My colleagues nickname me: 'Idea Factory' but I prefer 'Solution Factory'"</strong> because every idea I come up with stems from a problem. Without problems, there are no solutions. Without solutions, there are no (relevant) ideas.
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
                <div className="glass rounded-xl p-6">
                  <h3 className="font-semibold text-primary mb-3">Product Management</h3>
                  <p className="text-muted-foreground text-sm">
                    Strategic product vision, roadmap development, and cross-functional team leadership to deliver user-centered solutions.
                  </p>
                </div>
                <div className="glass rounded-xl p-6">
                  <h3 className="font-semibold text-primary mb-3">Human-Centered Design</h3>
                  <p className="text-muted-foreground text-sm">
                    Design thinking methodologies focused on creating intuitive, accessible experiences that solve real user problems.
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
              
              <div className="glass rounded-xl p-6">
                <h3 className="font-semibold text-chart-4 mb-3">Born to Inspire</h3>
                <p className="text-muted-foreground">
                  I decided to ride my bike across Alaska to raise money for the AIDS vaccine. What I found was that I love working with and helping people - clients, co-workers, and anybody else who crosses my path.
                </p>
              </div>
            </div>
          </div>
          
          <div className="space-y-8">
            <div className="aspect-square rounded-2xl overflow-hidden animate-float">
              <img 
                src={professionalPhoto}
                alt="Alexis Brochu - Professional portrait from Ireland" 
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
