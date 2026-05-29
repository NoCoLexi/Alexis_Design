import { useMemo } from "react";
import { Code, Trophy } from "lucide-react";
import AdminPanel from "./admin-panel";
import { useAdminPanel } from "@/hooks/use-admin-panel";

interface HeroSectionProps {
  onOpenAwardModal?: () => void;
  onOpenSiteModal?: () => void;
}

export default function HeroSection({ onOpenAwardModal, onOpenSiteModal }: HeroSectionProps) {
  const { isVisible, settings, applySettings, closePanel } = useAdminPanel();

  const companyName = useMemo(() => {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get("company") || settings.companyName.trim();
  }, [settings.companyName]);

  const preTitle = companyName ? `Hi ${companyName}, we're` : "Hi, we're";

  const openCaseStudy = (projectId: string) => {
    window.dispatchEvent(new CustomEvent("openCaseStudy", { detail: { projectId } }));
  };

  return (
    <section
      id="home"
      style={{
        minHeight: "100vh",
        background: "#000",
        display: "flex",
        flexDirection: "column",
        overflow: "hidden",
        paddingTop: "80px",
        position: "relative",
        fontFamily: "'Montserrat', sans-serif",
      }}
    >
      <style>{`
        .hero-title-card {
          padding: 0 60px 24px;
          position: relative;
          z-index: 10;
          flex-shrink: 0;
        }
        .hero-metrics-bar {
          display: flex;
          align-items: center;
          padding: 18px 60px;
          flex-shrink: 0;
          position: relative;
          z-index: 10;
        }
        .hero-metric-item {
          display: flex;
          align-items: baseline;
          gap: 8px;
          cursor: pointer;
        }
        @media (max-width: 768px) {
          .hero-title-card { padding: 0 24px 20px; }
          .hero-metrics-bar { padding: 14px 24px; flex-wrap: wrap; gap: 10px; }
          .hero-metric-item {
            padding-right: 0 !important;
            margin-right: 0 !important;
            border-right: none !important;
          }
        }
      `}</style>
      {/* Subtle bottom vignette */}
      <div style={{
        position: "absolute", inset: 0, pointerEvents: "none", zIndex: 0,
        background: "radial-gradient(ellipse 120% 100% at 50% 100%, rgba(5,6,8,0.55) 0%, transparent 55%)",
      }} />
      {/* Breathing space */}
      <div style={{ flex: 1, position: "relative", zIndex: 10 }} />
      {/* Title card — anchored to lower portion */}
      <div className="hero-title-card">
        {/* Pre-title */}
        <div style={{
          fontSize: "18px", fontWeight: 200, color: "rgba(255,255,255,0.55)",
          letterSpacing: "0.04em", marginBottom: "8px",
        }}>
          {preTitle}
        </div>

        {/* Hero name */}
        <h1 style={{
          fontWeight: 800,
          fontSize: "clamp(52px, 10vw, 110px)",
          lineHeight: 0.95,
          letterSpacing: "-0.05em",
          margin: "0 0 28px -4px",
          color: "#5fc5f8",
          textShadow: [
            "0 0 15px rgba(95,197,248,0.9)",
            "0 0 40px rgba(95,197,248,0.5)",
            "0 0 90px rgba(95,197,248,0.25)",
            "0 0 180px rgba(95,197,248,0.1)",
          ].join(", "),
        }}>
          UPSTART-Labs
        </h1>

        {/* Tagline */}
        <p
          style={{
            fontSize: "clamp(1rem, 2vw, 1.25rem)", fontWeight: 300,
            letterSpacing: "0.06em", textTransform: "uppercase",
            color: "#F3E8B9", margin: "0 0 16px",
            lineHeight: 1.3,
          }}
          className="mb-[1px]">
          It begins with humans.
        </p>

        {/* Subhead */}
        <p style={{
          fontSize: "0.95rem", fontWeight: 300, letterSpacing: "0.02em",
          color: "rgba(255,255,255,0.6)", margin: "0 0 36px",
          lineHeight: 1.6, maxWidth: "480px",
        }}>
          We help teams ship products people actually adopt.
        </p>

        {/* CTA row */}
        <div
          style={{ display: "flex", alignItems: "center", gap: "36px", marginBottom: "40px", flexWrap: "wrap" }}
          className="mb-[10px]">
          <button
            onClick={onOpenSiteModal}
            data-testid="button-hero-site"
            className="inline-flex items-center text-white/70 hover:text-white transition-colors gap-[8px] pb-[3px]"
            style={{
              fontSize: "0.7rem", letterSpacing: "0.22em", textTransform: "uppercase",
              fontWeight: 600, textDecoration: "none",
              borderBottom: "1px solid rgba(255,255,255,0.25)", paddingBottom: "3px",
              background: "none", cursor: "pointer",
            }}
          >
            <Code style={{ width: "14px", height: "14px" }} />
            How we built this site →
          </button>
        </div>

        {/* GovTech Award credit */}
        <button
          onClick={onOpenAwardModal}
          data-testid="button-hero-tech-award"
          className="inline-flex items-center text-white/70 hover:text-white transition-colors gap-[8px] pb-[3px]"
          style={{
            fontSize: "0.7rem", letterSpacing: "0.22em", textTransform: "uppercase",
            fontWeight: 600, textDecoration: "none",
            borderBottom: "1px solid rgba(255,255,255,0.25)", paddingBottom: "3px",
            background: "none", cursor: "pointer", marginBottom: "40px",
          }}
        >
          <Trophy style={{ width: "14px", height: "14px" }} />
          GovTech Award Winner →
        </button>
      </div>
      {/* Bottom rule */}
      <div style={{
        height: "1px", background: "rgba(255,255,255,0.05)",
        margin: "0 60px", flexShrink: 0, position: "relative", zIndex: 10,
      }} />
      {/* Metrics footnote bar */}
      <div className="hero-metrics-bar">
        {[
          { value: "545.5%", label: "User Base Increase", projectId: "caloes" },
          { value: "$2.1B", label: "Disaster Relief Platform", projectId: "pa-portal" },
          { value: "75%", label: "Ticket Reduction", projectId: "pa-portal" },
        ].map((m, i) => (
          <div
            key={m.value}
            className="hero-metric-item"
            onClick={() => openCaseStudy(m.projectId)}
            style={{
              paddingRight: "36px",
              marginRight: "36px",
              borderRight: i < 2 ? "1px solid rgba(255,255,255,0.05)" : "none",
            }}
          >
            <span style={{
              fontSize: "1.05rem", fontWeight: 700, color: "rgba(255,255,255,0.7)",
              letterSpacing: "-0.02em", lineHeight: 1,
            }}>{m.value}</span>
            <span style={{
              fontSize: "0.58rem", color: "rgba(255,255,255,0.45)",
              letterSpacing: "0.1em", textTransform: "uppercase",
            }}>{m.label}</span>
          </div>
        ))}
      </div>
      <AdminPanel
        isVisible={isVisible}
        onClose={closePanel}
        onApply={applySettings}
      />
    </section>
  );
}
