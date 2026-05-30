import { Mail, Calendar, Award, Linkedin } from "lucide-react";
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
          <h2 className="text-3xl md:text-4xl section-glow mb-6">
            Let's Create Something Amazing
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">Our rare blend of product strategy, product design, and change management delivers products users embrace (not just tolerate).</p>
          
          
        </div>

        <div className="max-w-4xl mx-auto">
          {/* Contact Info */}
          <div className="space-y-8">
            <div className="glass rounded-2xl p-8">
              <div className="flex flex-col md:flex-row md:justify-center md:space-x-8 space-y-4 md:space-y-0">
                <a
                  href="mailto:alexis@upstart-labs.com"
                  className="inline-flex items-center text-white/70 hover:text-white transition-colors gap-[8px] pb-[3px]"
                  style={{
                    fontSize: "0.7rem", letterSpacing: "0.22em", textTransform: "uppercase",
                    fontWeight: 600, textDecoration: "none",
                    borderBottom: "1px solid rgba(255,255,255,0.25)", paddingBottom: "3px",
                  }}
                  onClick={() => trackPortfolioClick('email')}
                  data-testid="contact-email"
                >
                  <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                    <Mail className="w-4 h-4" />
                  </div>
                  <div className="font-medium text-foreground text-sm">Email Upstart-Labs</div>
                </a>
                
                <a
                  href="https://www.linkedin.com/company/upstart-labs-co/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center text-white/70 hover:text-white transition-colors gap-[8px] pb-[3px]"
                  style={{
                    fontSize: "0.7rem", letterSpacing: "0.22em", textTransform: "uppercase",
                    fontWeight: 600, textDecoration: "none",
                    borderBottom: "1px solid rgba(255,255,255,0.25)", paddingBottom: "3px",
                  }}
                  onClick={() => trackPortfolioClick('linkedin')}
                  data-testid="contact-linkedin"
                >
                  <div className="w-8 h-8 bg-[#0077B5] rounded-lg flex items-center justify-center">
                    <Linkedin className="w-4 h-4 text-white" />
                  </div>
                  <div className="font-medium text-foreground text-sm">Find us on LinkedIn!</div>
                </a>
                
                <a
                  href="https://calendly.com/alexis-brochu/15min"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center text-white/70 hover:text-white transition-colors gap-[8px] pb-[3px]"
                  style={{
                    fontSize: "0.7rem", letterSpacing: "0.22em", textTransform: "uppercase",
                    fontWeight: 600, textDecoration: "none",
                    borderBottom: "1px solid rgba(255,255,255,0.25)", paddingBottom: "3px",
                  }}
                  onClick={() => trackPortfolioClick('calendly')}
                  data-testid="contact-calendly"
                >
                  <div className="w-8 h-8 bg-chart-2 rounded-lg flex items-center justify-center">
                    <Calendar className="w-4 h-4" />
                  </div>
                  <div className="font-medium text-foreground text-sm">Schedule a quick meeting</div>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}