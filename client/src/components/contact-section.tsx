import { Mail, Award } from "lucide-react";
import { SiLinkedin } from "react-icons/si";

export default function ContactSection() {
  const achievements = [
    "2023 California Government Technology Innovation Award for Public Service",
    "545.5% increase in user base for Cal OES Engage Portal",
    "$244 million in projects successfully closed out"
  ];

  return (
    <section id="contact" className="py-20 relative">
      <div className="absolute inset-0 bg-gradient-to-b from-background to-secondary/50"></div>
      
      <div className="relative z-10 max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            <span className="gradient-text">Let's Create Something Amazing</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Seeking a Product Management role where I can leverage my expertise in user research, strategic planning, and cross-functional leadership to deliver exceptional products that users love.
          </p>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto mt-4">
            Interested in my background? Send me an email or LinkedIn message and I'll be happy to share my resume.
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          {/* Contact Info */}
          <div className="space-y-8">
            <div className="glass rounded-2xl p-8">
              <h3 className="text-2xl font-bold mb-6 text-chart-4">Get in Touch</h3>
              <div className="space-y-4">
                <a href="mailto:alexisb.product@gmail.com" className="flex items-center space-x-4 hover:opacity-80 transition-opacity">
                  <div className="w-12 h-12 bg-primary rounded-xl flex items-center justify-center">
                    <Mail className="w-6 h-6" />
                  </div>
                  <div>
                    <div className="font-medium text-foreground">Email</div>
                    <div className="text-muted-foreground">alexisb.product@gmail.com</div>
                  </div>
                </a>
                
                <a href="https://linkedin.com/in/alexisbrochu" target="_blank" rel="noopener noreferrer" className="flex items-center space-x-4 hover:opacity-80 transition-opacity">
                  <div className="w-12 h-12 bg-chart-4 rounded-xl flex items-center justify-center">
                    <SiLinkedin className="w-6 h-6" />
                  </div>
                  <div>
                    <div className="font-medium text-foreground">LinkedIn</div>
                    <div className="text-muted-foreground">linkedin.com/in/alexisbrochu</div>
                  </div>
                </a>
              </div>
            </div>

            {/* Achievements */}
            <div className="glass rounded-2xl p-8">
              <h3 className="text-2xl font-bold mb-6 text-chart-2">Recent Achievements</h3>
              <div className="space-y-4">
                {achievements.map((achievement, index) => (
                  <div key={index} className="flex items-start space-x-3">
                    <Award className="w-5 h-5 text-chart-3 mt-0.5 flex-shrink-0" />
                    <div className="text-muted-foreground text-sm">{achievement}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}