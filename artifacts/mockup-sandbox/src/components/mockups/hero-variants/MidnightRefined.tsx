import { Gamepad2, ArrowRight } from "lucide-react";

/**
 * C1 — Midnight Refined
 *
 * Fixes over the original:
 * - Logo stays on a single line (no word-break)
 * - Vertical distribution improved — content feels more centred
 * - Subhead opacity lifted (0.3 → 0.48) so it actually reads
 * - Neon glow layered for a more ethereal, less flat effect
 * - "MESSAGE US" CTA is more legible and better-weighted
 * - Game link is tighter and less orphaned from the primary CTA
 * - Metrics strip has cleaner value + label separation
 * - Subtle ambient radial behind the headline
 */
export function MidnightRefined() {
  const metrics = [
    { value: "545.5%", label: "User Base Increase" },
    { value: "$2.1B", label: "Disaster Relief Platform" },
    { value: "75%", label: "Ticket Reduction" },
  ];

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#000000",
        fontFamily: "'Montserrat', sans-serif",
        display: "flex",
        flexDirection: "column",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Top edge line */}
      <div style={{
        position: "absolute", top: 0, left: 0, right: 0, height: "1px",
        background: "linear-gradient(90deg, transparent 0%, rgba(95,197,248,0.35) 25%, rgba(95,197,248,0.35) 75%, transparent 100%)",
        pointerEvents: "none", zIndex: 5,
      }} />

      {/* Ambient radial behind headline */}
      <div style={{
        position: "absolute", top: "28%", left: "-5%", width: "65%", height: "55%",
        background: "radial-gradient(ellipse at 35% 50%, rgba(95,197,248,0.07) 0%, rgba(95,197,248,0.025) 40%, transparent 70%)",
        pointerEvents: "none",
      }} />

      {/* Nav */}
      <nav style={{
        display: "flex", alignItems: "center", justifyContent: "space-between",
        padding: "28px 56px", position: "relative", zIndex: 10, flexShrink: 0,
      }}>
        {/* Single-line logo — no wrap */}
        <span style={{
          fontWeight: 700, fontSize: "0.88rem", letterSpacing: "0.18em",
          color: "rgba(255,255,255,0.88)", textTransform: "uppercase",
          whiteSpace: "nowrap",
        }}>
          UPSTART-<span style={{ color: "#5fc5f8" }}>Labs</span>
        </span>
        <div style={{ display: "flex", gap: "36px" }}>
          {["Work", "Expertise", "Contact"].map(item => (
            <span key={item} style={{
              fontSize: "0.68rem", letterSpacing: "0.18em", textTransform: "uppercase",
              color: "rgba(255,255,255,0.2)", cursor: "pointer",
            }}>{item}</span>
          ))}
        </div>
      </nav>

      {/* Hero body — centred with deliberate top offset */}
      <div style={{
        flex: 1, display: "flex", flexDirection: "column", justifyContent: "center",
        padding: "0 56px 72px", position: "relative", zIndex: 10,
      }}>

        {/* Discipline label */}
        <div style={{
          fontSize: "0.6rem", letterSpacing: "0.26em", textTransform: "uppercase",
          color: "#5fc5f8", marginBottom: "28px", opacity: 0.65, display: "flex", alignItems: "center", gap: "8px",
        }}>
          <span style={{ display: "inline-block", width: "5px", height: "5px", background: "#5fc5f8", borderRadius: "50%", opacity: 0.7 }} />
          Product Strategy &amp; Design
        </div>

        {/* Headline — two-line split */}
        <h1 style={{
          fontWeight: 200, fontSize: "clamp(54px, 8vw, 88px)", lineHeight: 1.0,
          letterSpacing: "-0.04em", color: "#ffffff", margin: "0",
        }}>
          Hi, we're
        </h1>
        <h1 style={{
          fontWeight: 700, fontSize: "clamp(54px, 8vw, 88px)", lineHeight: 1.0,
          letterSpacing: "-0.04em", margin: "0 0 36px",
          color: "#5fc5f8",
          textShadow: [
            "0 0 20px rgba(95,197,248,0.8)",
            "0 0 50px rgba(95,197,248,0.45)",
            "0 0 100px rgba(95,197,248,0.2)",
            "0 0 200px rgba(95,197,248,0.08)",
          ].join(", "),
        }}>
          UPSTART-Labs
        </h1>

        {/* Subhead — lifted opacity */}
        <p style={{
          fontSize: "1.05rem", fontWeight: 300, lineHeight: 1.65,
          color: "rgba(255,255,255,0.48)", margin: "0 0 52px",
          maxWidth: "460px", letterSpacing: "0.01em",
        }}>
          We help product teams ship things people actually adopt.
        </p>

        {/* CTAs — tighter pair with clear hierarchy */}
        <div style={{ display: "flex", alignItems: "center", gap: "0", marginBottom: "72px" }}>
          {/* Primary */}
          <a href="#" style={{
            display: "inline-flex", alignItems: "center", gap: "10px",
            fontSize: "0.72rem", letterSpacing: "0.18em", textTransform: "uppercase",
            color: "rgba(255,255,255,0.78)", textDecoration: "none",
            borderBottom: "1px solid rgba(255,255,255,0.25)", paddingBottom: "4px",
            fontWeight: 600, marginRight: "40px",
          }}>
            Message us <ArrowRight style={{ width: "13px", height: "13px" }} />
          </a>

          {/* Divider */}
          <span style={{ width: "1px", height: "18px", background: "rgba(255,255,255,0.1)", marginRight: "40px", display: "inline-block" }} />

          {/* Game link */}
          <a href="#" style={{
            display: "inline-flex", alignItems: "center", gap: "7px",
            fontFamily: "'Press Start 2P', monospace", fontSize: "0.5rem",
            letterSpacing: "0.05em", color: "rgba(95,197,248,0.55)", textDecoration: "none",
            textShadow: "0 0 10px rgba(95,197,248,0.35)",
          }}>
            <Gamepad2 style={{ width: "11px", height: "11px" }} />
            ▸ Play Stakeholders Invaders
          </a>
        </div>

        {/* Metrics strip */}
        <div style={{
          display: "flex", gap: "0",
          borderTop: "1px solid rgba(255,255,255,0.06)", paddingTop: "28px",
        }}>
          {metrics.map((m, i) => (
            <div key={m.value} style={{
              flex: 1,
              paddingRight: "32px", marginRight: "32px",
              borderRight: i < metrics.length - 1 ? "1px solid rgba(255,255,255,0.06)" : "none",
            }}>
              <div style={{
                fontSize: "1.75rem", fontWeight: 700, color: "rgba(255,255,255,0.88)",
                letterSpacing: "-0.025em", lineHeight: 1, marginBottom: "7px",
                textShadow: "0 0 16px rgba(95,197,248,0.22)",
              }}>
                {m.value}
              </div>
              <div style={{
                fontSize: "0.62rem", color: "rgba(255,255,255,0.22)",
                letterSpacing: "0.1em", textTransform: "uppercase",
              }}>
                {m.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
