import { useMemo, useRef } from "react";
import { Gamepad2 } from "lucide-react";
import AdminPanel from "./admin-panel";
import { useAdminPanel } from "@/hooks/use-admin-panel";

function useDragScroll() {
  const ref = useRef<HTMLDivElement>(null);
  const isDown = useRef(false);
  const startX = useRef(0);
  const scrollLeft = useRef(0);

  const onMouseDown = (e: React.MouseEvent) => {
    if (!ref.current) return;
    isDown.current = true;
    ref.current.classList.add("active");
    startX.current = e.pageX - ref.current.offsetLeft;
    scrollLeft.current = ref.current.scrollLeft;
  };
  const onMouseLeave = () => {
    isDown.current = false;
    ref.current?.classList.remove("active");
  };
  const onMouseUp = () => {
    isDown.current = false;
    ref.current?.classList.remove("active");
  };
  const onMouseMove = (e: React.MouseEvent) => {
    if (!isDown.current || !ref.current) return;
    e.preventDefault();
    const x = e.pageX - ref.current.offsetLeft;
    const walk = (x - startX.current) * 1.5;
    ref.current.scrollLeft = scrollLeft.current - walk;
  };

  return { ref, onMouseDown, onMouseLeave, onMouseUp, onMouseMove };
}

const TICKER_ITEMS = [
  "Built with React + TypeScript",
  "◆",
  "Designed in Replit with Claude",
  "◆",
  "Tailwind + shadcn/ui",
  "◆",
  "Vite · pnpm · Express",
  "◆",
  "Every pixel written with AI pair-programming",
  "◆",
  "Open-source stack, closed-loop workflow",
  "◆",
  "Built with React + TypeScript",
  "◆",
  "Designed in Replit with Claude",
  "◆",
  "Tailwind + shadcn/ui",
  "◆",
  "Vite · pnpm · Express",
  "◆",
  "Every pixel written with AI pair-programming",
  "◆",
  "Open-source stack, closed-loop workflow",
  "◆",
];

interface HeroSectionProps {
  onOpenAwardModal?: () => void;
}

export default function HeroSection({ onOpenAwardModal }: HeroSectionProps) {
  const { isVisible, settings, applySettings, closePanel } = useAdminPanel();
  const dragScroll = useDragScroll();

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
        .hero-ticker-wrap {
          cursor: grab;
          overflow-x: auto;
          scrollbar-width: none;
          -ms-overflow-style: none;
          transition: background 0.3s ease, box-shadow 0.3s ease;
        }
        .hero-ticker-wrap::-webkit-scrollbar { display: none; }
        .hero-ticker-wrap:hover {
          background: rgba(95,197,248,0.08);
          box-shadow: inset 0 0 24px rgba(95,197,248,0.12);
        }
        .hero-ticker-wrap:active {
          cursor: grabbing;
        }
        .hero-ticker-track {
          display: flex;
          width: max-content;
          user-select: none;
        }
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
          .hero-award-credit { margin-left: 0 !important; }
        }
      `}</style>

      {/* Subtle bottom vignette */}
      <div style={{
        position: "absolute", inset: 0, pointerEvents: "none", zIndex: 0,
        background: "radial-gradient(ellipse 120% 100% at 50% 100%, rgba(5,6,8,0.55) 0%, transparent 55%)",
      }} />

      {/* ── Ticker tape belt ── */}
      <div
        ref={dragScroll.ref}
        className="hero-ticker-wrap"
        onMouseDown={dragScroll.onMouseDown}
        onMouseLeave={dragScroll.onMouseLeave}
        onMouseUp={dragScroll.onMouseUp}
        onMouseMove={dragScroll.onMouseMove}
        style={{
          position: "relative", zIndex: 10, flexShrink: 0,
          borderTop: "1px solid rgba(95,197,248,0.08)",
          borderBottom: "1px solid rgba(95,197,248,0.08)",
          background: "rgba(95,197,248,0.03)",
          padding: "10px 0",
          maskImage: "linear-gradient(90deg, transparent 0%, black 6%, black 94%, transparent 100%)",
          WebkitMaskImage: "linear-gradient(90deg, transparent 0%, black 6%, black 94%, transparent 100%)",
        }}
      >
        <div className="hero-ticker-track">
          {TICKER_ITEMS.map((item, i) => (
            <span key={i} style={{
              display: "inline-block",
              padding: "0 28px",
              fontSize: item === "◆" ? "0.45rem" : "0.58rem",
              letterSpacing: item === "◆" ? "0" : "0.18em",
              textTransform: "uppercase",
              color: item === "◆" ? "rgba(95,197,248,0.55)" : "rgba(255,255,255,0.55)",
              whiteSpace: "nowrap",
              lineHeight: 1,
            }}>
              {item}
            </span>
          ))}
        </div>
      </div>

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

        {/* Subhead */}
        <p style={{
          fontSize: "0.95rem", fontWeight: 300, letterSpacing: "0.02em",
          color: "rgba(255,255,255,0.6)", margin: "0 0 36px",
          lineHeight: 1.6, maxWidth: "480px",
        }}>
          We help product teams ship things people actually adopt.
        </p>

        {/* CTA row */}
        <div style={{ display: "flex", alignItems: "center", gap: "36px", marginBottom: "40px", flexWrap: "wrap" }}>
          <a
            href="mailto:alexis@upstart-labs.com"
            data-testid="link-send-email"
            style={{
              fontSize: "0.7rem", letterSpacing: "0.22em", textTransform: "uppercase",
              color: "rgba(255,255,255,0.7)", textDecoration: "none", fontWeight: 600,
              borderBottom: "1px solid rgba(255,255,255,0.25)", paddingBottom: "3px",
            }}
          >
            Message us →
          </a>
          <a
            href="/stakeholder-invaders/"
            data-testid="button-play-game-hero"
            style={{
              display: "inline-flex", alignItems: "center", gap: "8px",
              fontFamily: "'Press Start 2P', monospace", fontSize: "0.6rem",
              letterSpacing: "0.04em", color: "rgba(95,197,248,0.85)", textDecoration: "none",
              textShadow: "0 0 16px rgba(95,197,248,0.6)",
            }}
          >
            <Gamepad2 style={{ width: "14px", height: "14px" }} />
            ▸ Play Stakeholders Invaders
          </a>
        </div>
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
        <div
          className="hero-award-credit"
          onClick={onOpenAwardModal}
          data-testid="button-hero-tech-award"
          style={{
            marginLeft: "auto", fontSize: "0.55rem", color: "rgba(255,255,255,0.35)",
            letterSpacing: "0.1em", textTransform: "uppercase", cursor: "pointer",
          }}
        >
          2023 GovTech Award Winner
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
