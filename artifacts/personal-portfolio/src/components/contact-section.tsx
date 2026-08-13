import { Mail, Calendar, Linkedin } from "lucide-react";
import { trackPortfolioClick } from "@/lib/analytics";

interface ContactSectionProps {
  onOpenAwardModal?: () => void;
}

// Bot-safe: build mailto href on click, never expose email as static DOM text
function handleEmailClick(e: React.MouseEvent) {
  e.preventDefault();
  const parts = ['alexisb', '.product', '@', 'gmail', '.com'];
  window.location.href = 'mailto:' + parts.join('');
  trackPortfolioClick('email');
}

export default function ContactSection({ onOpenAwardModal: _onOpenAwardModal }: ContactSectionProps) {
  return (
    <section id="contact" className="border-t border-[#E5E5E5] py-20 bg-[#F5F3F1]">
      <div className="max-w-7xl mx-auto px-6">

        {/* Section label */}
        <p
          style={{
            fontFamily: '"Geist Mono", ui-monospace, monospace',
            fontSize: '0.625rem',
            fontWeight: 400,
            color: '#A59F97',
            letterSpacing: '0.12em',
            textTransform: 'uppercase',
            marginBottom: '1.5rem',
          }}
        >
          Contact
        </p>

        {/* Heading */}
        <h2
          style={{
            fontFamily: '"Cormorant Garamond", Georgia, serif',
            fontWeight: 300,
            fontSize: 'clamp(2rem, 5vw, 3.25rem)',
            color: '#000000',
            lineHeight: 1.1,
            letterSpacing: '-0.01em',
            marginBottom: '1rem',
          }}
        >
          Let&rsquo;s work together.
        </h2>

        <p
          style={{
            fontFamily: 'Inter, sans-serif',
            fontSize: '0.9375rem',
            fontWeight: 400,
            color: '#3F3B36',
            lineHeight: 1.65,
            maxWidth: '480px',
            marginBottom: '2.5rem',
          }}
        >
          Product strategy, UX design, and change management that gets your
          team from build to adoption.
        </p>

        {/* Contact links — no raw email in DOM */}
        <div className="flex flex-col sm:flex-row flex-wrap gap-5">
          <a
            href="#"
            onClick={handleEmailClick}
            className="inline-flex items-center gap-3 text-[#3F3B36] hover:text-black transition-colors group"
            data-testid="contact-email"
          >
            <span className="w-9 h-9 border border-[#E5E5E5] bg-white flex items-center justify-center group-hover:border-black transition-colors">
              <Mail className="w-4 h-4" />
            </span>
            <span
              style={{
                fontFamily: 'Inter, sans-serif',
                fontSize: '0.875rem',
                fontWeight: 500,
              }}
            >
              Email Alexis &rarr;
            </span>
          </a>

          <a
            href="https://www.linkedin.com/in/alexisbrochu/"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-3 text-[#3F3B36] hover:text-black transition-colors group"
            onClick={() => trackPortfolioClick('linkedin')}
            data-testid="contact-linkedin"
          >
            <span className="w-9 h-9 border border-[#E5E5E5] bg-white flex items-center justify-center group-hover:border-black transition-colors">
              <Linkedin className="w-4 h-4" />
            </span>
            <span
              style={{
                fontFamily: 'Inter, sans-serif',
                fontSize: '0.875rem',
                fontWeight: 500,
              }}
            >
              LinkedIn &rarr;
            </span>
          </a>

          <a
            href="https://calendly.com/alexis-brochu/15min"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-3 text-[#3F3B36] hover:text-black transition-colors group"
            onClick={() => trackPortfolioClick('calendly')}
            data-testid="contact-calendly"
          >
            <span className="w-9 h-9 border border-[#E5E5E5] bg-white flex items-center justify-center group-hover:border-black transition-colors">
              <Calendar className="w-4 h-4" />
            </span>
            <span
              style={{
                fontFamily: 'Inter, sans-serif',
                fontSize: '0.875rem',
                fontWeight: 500,
              }}
            >
              Schedule 15 min &rarr;
            </span>
          </a>
        </div>
      </div>
    </section>
  );
}
