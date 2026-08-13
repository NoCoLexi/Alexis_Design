import { useMemo } from "react";
import { Code, Trophy } from "lucide-react";
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

      {/* Title block — anchored to lower portion */}
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
          <p
            style={{
              fontFamily: '"Geist Mono", ui-monospace, monospace',
              fontSize: '0.625rem',
              fontWeight: 400,
              color: '#FF4704',
              letterSpacing: '0.1em',
              textTransform: 'uppercase',
              marginBottom: '1.25rem',
            }}
          >
            Product Design · North Conway, NH · Remote
          </p>
        )}

        {/* Name masthead */}
        <h1
          style={{
            fontFamily: '"Cormorant Garamond", Georgia, serif',
            fontWeight: 300,
            fontSize: 'clamp(60px, 10vw, 120px)',
            lineHeight: 0.93,
            color: '#000000',
            margin: '0 0 1.75rem -3px',
            letterSpacing: '-0.02em',
          }}
        >
          Alexis Brochu
        </h1>

        {/* Tagline */}
        <p
          style={{
            fontFamily: 'Inter, sans-serif',
            fontSize: '1rem',
            fontWeight: 400,
            color: '#3F3B36',
            lineHeight: 1.65,
            maxWidth: '460px',
            marginBottom: '2.25rem',
          }}
        >
          I help teams ship products people actually adopt. The human side of
          change is just as engineerable as the product itself.
        </p>

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
            How I built this site →
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
            GovTech Award Winner →
          </button>
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
