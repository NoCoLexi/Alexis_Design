import { useEffect } from "react";
import { ArrowLeft } from "lucide-react";
import SpeakingContent from "@/components/speaking-content";
import { useLocation } from "wouter";

export default function Services() {
  const [, navigate] = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-white text-black">

      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white border-b border-[#E5E5E5]">
        <div className="max-w-7xl mx-auto px-6 py-3 flex items-center justify-between">
          <button
            onClick={() => navigate("/")}
            className="inline-flex items-center gap-2 text-[#3F3B36] hover:text-black transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span
              style={{
                fontFamily: 'Inter, sans-serif',
                fontSize: '0.875rem',
                fontWeight: 500,
              }}
            >
              Back to portfolio
            </span>
          </button>

          <span
            style={{
              fontFamily: '"Cormorant Garamond", Georgia, serif',
              fontWeight: 300,
              fontSize: '1.125rem',
              color: '#000000',
              letterSpacing: '-0.01em',
            }}
          >
            Alexis Brochu
          </span>
        </div>
      </nav>

      {/* Hero */}
      <section className="pt-28 pb-14 px-6 border-b border-[#E5E5E5]">
        <div className="max-w-7xl mx-auto">
          <p
            style={{
              fontFamily: '"Geist Mono", ui-monospace, monospace',
              fontSize: '0.625rem',
              color: '#A59F97',
              letterSpacing: '0.12em',
              textTransform: 'uppercase',
              marginBottom: '1.25rem',
            }}
          >
            Speaking and workshops
          </p>
          <h1
            style={{
              fontFamily: '"Cormorant Garamond", Georgia, serif',
              fontWeight: 300,
              fontSize: 'clamp(2rem, 5vw, 3.5rem)',
              color: '#000000',
              lineHeight: 1.1,
              letterSpacing: '-0.02em',
              marginBottom: '1rem',
              maxWidth: '720px',
            }}
          >
            Equip your team to thrive in the AI era.
          </h1>
          <p
            style={{
              fontFamily: 'Inter, sans-serif',
              fontSize: '1rem',
              color: '#777169',
              lineHeight: 1.65,
              maxWidth: '520px',
            }}
          >
            Practical, engaging sessions that turn uncertainty into confidence.
            For conferences, executive briefings, and team workshops.
          </p>
        </div>
      </section>

      {/* Speaking Content */}
      <div className="pb-20">
        <div className="max-w-7xl mx-auto px-6">
          <SpeakingContent />
        </div>
      </div>

      {/* Footer */}
      <footer className="border-t border-[#E5E5E5] py-10">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <p
            style={{
              fontFamily: '"Geist Mono", ui-monospace, monospace',
              fontSize: '0.625rem',
              letterSpacing: '0.08em',
              color: '#A59F97',
              textTransform: 'uppercase',
            }}
          >
            © {new Date().getFullYear()} Alexis Brochu
          </p>
          <a
            href="mailto:alexis@upstart-labs.com"
            style={{
              fontFamily: 'Inter, sans-serif',
              fontSize: '0.875rem',
              color: '#3F3B36',
            }}
            className="hover:text-black transition-colors"
          >
            alexis@upstart-labs.com →
          </a>
        </div>
      </footer>
    </div>
  );
}
