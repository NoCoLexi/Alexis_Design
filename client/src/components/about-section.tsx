import { Badge } from "@/components/ui/badge";
import professionalPhoto from "@assets/Brochu, Alexis 2023 Ireland_1754523029765.png";
import newsPhoto from "@assets/20181006_071644_1754577780322.jpg";

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
              <span className="gradient-text">Solution Factory</span>
            </h2>
            
            <div className="space-y-6 text-lg text-muted-foreground">
              <p className="leading-relaxed">
                <strong className="text-foreground">"My colleagues nickname me: 'Idea Factory' but I prefer 'Solution Factory'"</strong> because every idea I come up with stems from a problem. Without problems, there are no solutions. Without solutions, there are no (relevant) ideas.
              </p>
              
              <div className="glass rounded-xl p-6">
                <h3 className="font-semibold text-primary mb-3">The Sarah Story</h3>
                <p className="text-muted-foreground">
                  Sarah was a legally blind college student who wanted to take my fitness class but was afraid. My solution was to learn to teach better. After a few months, not only did Sarah take a cab to my class every day, but years later Sarah ended up becoming an instructor herself.
                </p>
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
            
            {/* Skills Grid */}
            <div className="grid grid-cols-2 gap-4">
              {skills.map((skill) => (
                <div key={skill.name} className="glass rounded-xl p-4 text-center hover:glow-purple transition-all duration-300">
                  <div className={`text-lg font-bold ${skill.color}`}>{skill.name}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
        
        {/* In the News Section */}
        <div className="mt-16 pt-16 border-t border-abc-green/20">
          <div className="max-w-4xl mx-auto text-center">
            <h3 className="text-3xl font-bold text-abc-green mb-8">In the News</h3>
            <div className="glass rounded-2xl p-8 hover:shadow-lg transition-all duration-300">
              <div className="aspect-video rounded-xl overflow-hidden mb-6">
                <img 
                  src={newsPhoto}
                  alt="Alexis Brochu featured in fitness magazine article about low-impact conditioning" 
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="space-y-4">
                <h4 className="text-xl font-semibold text-foreground">
                  "Focusing on Low-Impact Conditioning"
                </h4>
                <p className="text-muted-foreground leading-relaxed">
                  Featured fitness expert discussing innovative conditioning techniques and proper ski alignment training methods for injury prevention and peak performance.
                </p>
                <div className="flex items-center justify-center gap-2 text-sm text-abc-green">
                  <span>•</span>
                  <span>Fitness Magazine Feature</span>
                  <span>•</span>
                  <span>Expert Interview</span>
                  <span>•</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
