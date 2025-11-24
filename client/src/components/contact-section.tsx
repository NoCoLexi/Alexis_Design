import { Mail, Calendar, Award } from "lucide-react";
import { SiLinkedin } from "react-icons/si";
import { trackPortfolioClick } from "@/lib/analytics";

interface ContactSectionProps {
  onOpenAwardModal?: () => void;
}

export default function ContactSection({ onOpenAwardModal }: ContactSectionProps) {
  return (
    <section id="contact" className="py-20 relative">
      <div className="absolute inset-0 bg-gradient-to-b from-background to-secondary/50"></div>
      
      <div className="relative z-10 max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            <span className="gradient-text">Let's Create Something Amazing</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Seeking a Product Design/Management role where I can leverage my expertise in <br />
            user research, strategic planning, and cross-functional communication. <br />
            I'll help you deliver exceptionally designed products that users adore.
          </p>
          
          
        </div>

        <div className="max-w-4xl mx-auto">
          {/* Contact Info */}
          <div className="space-y-8">
            <div className="glass rounded-2xl p-8">
              <h3 className="text-2xl font-bold mb-6 text-chart-4">Message me and I'll send you my resume!</h3>
              <div className="flex flex-col md:flex-row md:justify-center md:space-x-8 space-y-4 md:space-y-0">
                <a 
                  href="mailto:alexis@alexisdesign.com" 
                  className="flex items-center space-x-3 hover:opacity-80 transition-opacity"
                  onClick={() => trackPortfolioClick('email')}
                  data-testid="contact-email"
                >
                  <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                    <Mail className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="font-medium text-foreground text-sm">Email</div>
                    <div className="text-muted-foreground text-sm">alexis@alexisdesign.com</div>
                  </div>
                </a>
                
                <a 
                  href="https://linkedin.com/in/alexisbrochu" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="flex items-center space-x-3 hover:opacity-80 transition-opacity"
                  onClick={() => trackPortfolioClick('linkedin')}
                  data-testid="contact-linkedin"
                >
                  <div className="w-8 h-8 bg-[#0077B5] rounded-lg flex items-center justify-center">
                    <SiLinkedin className="w-4 h-4 text-white" />
                  </div>
                  <div>
                    <div className="font-medium text-foreground text-sm">LinkedIn</div>
                    <div className="text-muted-foreground text-sm">linkedin.com/in/alexisbrochu</div>
                  </div>
                </a>
                
                <a 
                  href="https://calendly.com/alexis-brochu/15min" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="flex items-center space-x-3 hover:opacity-80 transition-opacity"
                  onClick={() => trackPortfolioClick('calendly')}
                  data-testid="contact-calendly"
                >
                  <div className="w-8 h-8 bg-chart-2 rounded-lg flex items-center justify-center">
                    <Calendar className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="font-medium text-foreground text-sm">Schedule a Meeting</div>
                    <div className="text-muted-foreground text-sm">calendly.com/alexis-brochu/15min</div>
                  </div>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}