import { Mail } from "lucide-react";
import { SiLinkedin } from "react-icons/si";

// Calendly logo component
const CalendlyIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm0 22C6.486 22 2 17.514 2 12S6.486 2 12 2s10 4.486 10 10-4.486 10-10 10z"/>
    <path d="M12 4C7.589 4 4 7.589 4 12s3.589 8 8 8 8-3.589 8-8-3.589-8-8-8zm4.8 12.8c-.2.2-.5.2-.7 0L12 12.7 7.9 16.8c-.2.2-.5.2-.7 0-.2-.2-.2-.5 0-.7L11.3 12 7.2 7.9c-.2-.2-.2-.5 0-.7.2-.2.5-.2.7 0L12 11.3l4.1-4.1c.2-.2.5-.2.7 0 .2.2.2.5 0 .7L12.7 12l4.1 4.1c.2.2.2.5 0 .7z"/>
    <circle cx="12" cy="12" r="2.5" fill="#00A2FF"/>
    <path d="M9.5 12c0-.8.2-1.5.6-2.1L12 12l-1.9 2.1c-.4-.6-.6-1.3-.6-2.1z" fill="#00D4AA"/>
  </svg>
);


export default function ContactSection() {
  return (
    <section id="contact" className="py-20 relative">
      <div className="absolute inset-0 bg-gradient-to-b from-background to-secondary/50"></div>
      
      <div className="relative z-10 max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            <span className="gradient-text">Let's Create Something Amazing</span>
            <span className="block text-2xl md:text-3xl text-muted-foreground mt-4 font-normal">
              Message me for my resume
            </span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Seeking a Product Management role where I can leverage my expertise in user research, strategic planning, and cross-functional leadership to deliver exceptional products that users love.
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
                  <div className="w-12 h-12 bg-[#0077B5] rounded-xl flex items-center justify-center">
                    <SiLinkedin className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <div className="font-medium text-foreground">LinkedIn</div>
                    <div className="text-muted-foreground">linkedin.com/in/alexisbrochu</div>
                  </div>
                </a>
                
                <a href="https://calendly.com/alexis-brochu/15min" target="_blank" rel="noopener noreferrer" className="flex items-center space-x-4 hover:opacity-80 transition-opacity">
                  <div className="w-12 h-12 bg-[#00A2FF] rounded-xl flex items-center justify-center">
                    <CalendlyIcon className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <div className="font-medium text-foreground">Schedule a Meeting</div>
                    <div className="text-muted-foreground">calendly.com/alexis-brochu/15min</div>
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