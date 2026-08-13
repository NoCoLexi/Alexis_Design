import { useMemo } from "react";
import { Code, Trophy, Gamepad2 } from "lucide-react";
import AdminPanel from "./admin-panel";
import { useAdminPanel } from "@/hooks/use-admin-panel";

interface HeroSectionProps {
  onOpenAwardModal?: () => void;
  onOpenSiteModal?: () => void;
}

const METRICS = [
  { value: "545.5%", label: "User Base Increase", projectId: "caloes" },
  { value: "$2.1B",  label: "Disaster Relief Platform", projectId: "pa-portal" },
  { value: "75%",    label: "Ticket Reduction", projectId: "pa-portal" },
] as const;

const EYEBROW_LINES = [
  { text: "Principal Product Strategist", accent: true },
  { text: "Enterprise AI Adoption",       accent: false },
  { text: "Speaker and Facilitator",      accent: false },
];

export default function HeroSection({ onOpenAwardModal, onOpenSiteModal }: HeroSectionProps) {
  const { isVisible, settings, applySettings, closePanel } = useAdminPanel();

  const companyName = useMemo(() => {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get("company") || settings.companyName.trim();
  }, [settings.companyName]);

  const openCaseStudy = (projectId: string) => {
    window.dispatchEvent(new CustomEvent("openCaseStudy", { detail: { projectId } }));
  };

  return (
    <section
      id="home"
      className="min-h-screen bg-white flex flex-col"
      style={{ paddingTop: '56px' }}
    >
      {/* Breathing space */}
      <div className="flex-1" />

      {/* Title block anchored to lower portion */}
      <div className="max-w-7xl mx-auto px-6 pb-10 w-full">

        {/* Eyebrow */}
        {companyName ? (
          <p
            style={{
              fontFamily: '"Geist Mono", ui-monospace, monospace',
              fontSize: '0.625rem',
              fontWeight: 400,
              color: '#777169',
              letterSpacing: '0.12em',
              textTransform: 'uppercase',
              marginBottom: '1.25rem',
            }}
          >
            Hi {companyName}, I&rsquo;m
          </p>
        ) : (
          <div style={{ marginBottom: '1.25rem', display: 'flex', flexDirection: 'column', gap: '0.2rem' }}>
            {EYEBROW_LINES.map(({ text, accent }) => (
              <p
                key={text}
                style={{
                  fontFamily: '"Geist Mono", ui-monospace, monospace',
                  fontSize: '0.625rem',
                  fontWeight: 400,
                  color: accent ? '#FF4704' : '#A59F97',
                  letterSpacing: '0.1em',
                  textTransform: 'uppercase',
                  margin: 0,
                }}
              >
                {text}
              </p>
            ))}
          </div>
        )}

        {/* Name masthead with orange dot centered on cap-height */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.18em',
            margin: '0 0 1.75rem -3px',
          }}
        >
          <span
            aria-hidden="true"
            style={{
              color: '#FF4704',
              fontSize: 'clamp(16px, 2.4vw, 28px)',
              lineHeight: 1,
              flexShrink: 0,
              // Fine-tune vertical: Cormorant Garamond cap-height ~70% of em,
              // so shift dot slightly up from center to align with cap-height midpoint
              marginBottom: 'clamp(4px, 0.6vw, 8px)',
            }}
          >
            &#x25CF;
          </span>
          <h1
            style={{
              fontFamily: '"Cormorant Garamond", Georgia, serif',
              fontWeight: 300,
              fontSize: 'clamp(60px, 10vw, 120px)',
              lineHeight: 0.93,
              color: '#000000',
              margin: 0,
              letterSpacing: '-0.02em',
            }}
          >
            Alexis Brochu
          </h1>
        </div>

        {/* Tagline — two paragraphs */}
        <div style={{ maxWidth: '560px', marginBottom: '2.25rem', display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
          <p
            style={{
              fontFamily: 'Inter, sans-serif',
              fontSize: '1rem',
              fontWeight: 500,
              color: '#000000',
              lineHeight: 1.55,
              margin: 0,
            }}
          >
            I design products that get adopted, not just shipped.
          </p>
          <p
            style={{
              fontFamily: 'Inter, sans-serif',
              fontSize: '0.9375rem',
              fontWeight: 400,
              color: '#3F3B36',
              lineHeight: 1.7,
              margin: 0,
            }}
          >
            My differentiator is how I work: alongside engineering and business partners,
            not downstream from them. I help teams make better decisions, move through
            complexity, and stay focused on outcomes. When I&rsquo;m embedded with a team,
            the work gets finished, and the result is a product people want to use.
          </p>
        </div>

        {/* CTA links */}
        <div className="flex flex-col gap-2.5 mb-10">
          <button
            onClick={onOpenSiteModal}
            data-testid="button-hero-site"
            className="inline-flex items-center gap-2 text-[#A59F97] hover:text-[#3F3B36] transition-colors w-fit"
            style={{
              fontFamily: 'Inter, sans-serif',
              fontSize: '0.6875rem',
              fontWeight: 600,
              letterSpacing: '0.18em',
              textTransform: 'uppercase',
            }}
          >
            <Code className="w-3 h-3" />
            How I built this site &rarr;
          </button>
          <button
            onClick={onOpenAwardModal}
            data-testid="button-hero-tech-award"
            className="inline-flex items-center gap-2 text-[#A59F97] hover:text-[#3F3B36] transition-colors w-fit"
            style={{
              fontFamily: 'Inter, sans-serif',
              fontSize: '0.6875rem',
              fontWeight: 600,
              letterSpacing: '0.18em',
              textTransform: 'uppercase',
            }}
          >
            <Trophy className="w-3 h-3" />
            GovTech Award Winner &rarr;
          </button>

          {/* Stakeholder Invaders — same hover pattern, distinct by context */}
          <a
            href="/stakeholder-invaders/"
            target="_blank"
            rel="noopener noreferrer"
            data-testid="button-hero-stakeholder-invaders"
            className="inline-flex items-center gap-2 text-[#A59F97] hover:text-[#3F3B36] transition-colors w-fit"
            style={{
              fontFamily: 'Inter, sans-serif',
              fontSize: '0.6875rem',
              fontWeight: 600,
              letterSpacing: '0.18em',
              textTransform: 'uppercase',
              textDecoration: 'none',
            }}
          >
            <Gamepad2 className="w-3 h-3" />
            Play Stakeholder Invaders &rarr;
          </a>
        </div>
      </div>

      {/* Metrics footnote bar */}
      <div className="border-t border-[#E5E5E5]">
        <div className="max-w-7xl mx-auto px-6 py-4 flex flex-wrap items-center gap-y-3">
          {METRICS.map((m, i) => (
            <button
              key={m.value}
              onClick={() => openCaseStudy(m.projectId)}
              className="group text-left flex items-baseline gap-2 hover:opacity-70 transition-opacity"
              style={{
                paddingRight: i < METRICS.length - 1 ? '2.5rem' : 0,
                marginRight: i < METRICS.length - 1 ? '2.5rem' : 0,
                borderRight: i < METRICS.length - 1 ? '1px solid #E5E5E5' : 'none',
              }}
            >
              <span
                style={{
                  fontFamily: 'Inter, sans-serif',
                  fontSize: '1.0625rem',
                  fontWeight: 700,
                  color: '#000000',
                  letterSpacing: '-0.02em',
                  lineHeight: 1,
                }}
              >
                {m.value}
              </span>
              <span
                style={{
                  fontFamily: '"Geist Mono", ui-monospace, monospace',
                  fontSize: '0.5625rem',
                  color: '#777169',
                  letterSpacing: '0.08em',
                  textTransform: 'uppercase',
                  lineHeight: 1,
                }}
              >
                {m.label}
              </span>
            </button>
          ))}
        </div>
      </div>

      <AdminPanel
        isVisible={isVisible}
        onClose={closePanel}
        onApply={applySettings}
      />
    </section>
  );
}
