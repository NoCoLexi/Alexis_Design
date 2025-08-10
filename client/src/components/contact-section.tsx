import { Mail, Calendar } from "lucide-react";
import { SiLinkedin } from "react-icons/si";



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
                  <div className="w-12 h-12 bg-chart-4 rounded-xl flex items-center justify-center">
                    <SiLinkedin className="w-6 h-6" />
                  </div>
                  <div>
                    <div className="font-medium text-foreground">LinkedIn</div>
                    <div className="text-muted-foreground">linkedin.com/in/alexisbrochu</div>
                  </div>
                </a>
                
                <a href="https://calendly.com/alexis-brochu/15min" target="_blank" rel="noopener noreferrer" className="flex items-center space-x-4 hover:opacity-80 transition-opacity">
                  <div className="w-12 h-12 bg-chart-2 rounded-xl flex items-center justify-center">
                    <Calendar className="w-6 h-6" />
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