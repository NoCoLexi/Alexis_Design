import { Gamepad2 } from "lucide-react";

/**
 * C2 — Midnight Cinematic
 *
 * Takes the Midnight concept to its logical extreme:
 * - Content anchors to the bottom third (film title-card staging)
 * - Top half is intentional silence — breathing space
 * - Headline scales even larger; the name fills nearly the full width
 * - Thin horizontal rules used as deliberate grammar (not decoration)
 * - Subhead is whisper-small, a caption beneath the title
 * - Metrics are a single tight bottom bar — footnote weight, not feature
 * - The overall feel: "before the credits roll"
 */
export function MidnightCinematic() {
  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#000",
        fontFamily: "'Montserrat', sans-serif",
        display: "flex",
        flexDirection: "column",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Very faint vignette */}
      <div style={{
        position: "absolute", inset: 0, pointerEvents: "none",
        background: "radial-gradient(ellipse 120% 100% at 50% 100%, rgba(5,6,8,0.6) 0%, transparent 60%)",
      }} />

      {/* Nav — ultra-minimal */}
      <nav style={{
        display: "flex", alignItems: "center", justifyContent: "space-between",
        padding: "30px 60px", position: "relative", zIndex: 10, flexShrink: 0,
      }}>
        <span style={{
          fontWeight: 300, fontSize: "0.72rem", letterSpacing: "0.28em",
          color: "rgba(255,255,255,0.35)", textTransform: "uppercase", whiteSpace: "nowrap",
        }}>
          UPSTART-LABS
        </span>
        <div style={{ display: "flex", gap: "36px" }}>
          {["Work", "Expertise", "Contact"].map(item => (
            <span key={item} style={{
              fontSize: "0.62rem", letterSpacing: "0.2em", textTransform: "uppercase",
              color: "rgba(255,255,255,0.15)", cursor: "pointer",
            }}>{item}</span>
          ))}
        </div>
      </nav>

      {/* Upper breathing space — discipline label floats here */}
      <div style={{ flex: "0 0 12%", display: "flex", alignItems: "flex-end", padding: "0 60px 0", position: "relative", zIndex: 10 }}>
        <div style={{
          fontSize: "0.56rem", letterSpacing: "0.3em", textTransform: "uppercase",
          color: "rgba(95,197,248,0.4)", display: "flex", alignItems: "center", gap: "10px",
        }}>
          <span style={{ display: "inline-block", width: "18px", height: "1px", background: "rgba(95,197,248,0.4)" }} />
          Product Strategy &amp; Design — Est. 2019
        </div>
      </div>

      {/* Thin rule */}
      <div style={{ height: "1px", background: "rgba(255,255,255,0.04)", margin: "0 60px", flexShrink: 0, position: "relative", zIndex: 10 }} />

      {/* Title card — anchored to lower 50% */}
      <div style={{
        flex: 1, display: "flex", flexDirection: "column", justifyContent: "flex-end",
        padding: "0 58px 20px", position: "relative", zIndex: 10,
      }}>
        {/* Pre-title */}
        <div style={{
          fontSize: "0.9rem", fontWeight: 200, color: "rgba(255,255,255,0.28)",
          letterSpacing: "0.04em", marginBottom: "8px",
        }}>
          Hi, we're
        </div>

        {/* Hero name — fills the stage */}
        <h1 style={{
          fontWeight: 800,
          fontSize: "clamp(64px, 11vw, 120px)",
          lineHeight: 0.95,
          letterSpacing: "-0.05em",
          margin: "0 0 28px -4px",   /* optical left-align correction */
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

        {/* Caption / subhead */}
        <p style={{
          fontSize: "0.82rem", fontWeight: 300, letterSpacing: "0.02em",
          color: "rgba(255,255,255,0.35)", margin: "0 0 36px",
          lineHeight: 1.6, maxWidth: "440px",
        }}>
          We help product teams ship things people actually adopt.
        </p>

        {/* CTA pair */}
        <div style={{ display: "flex", alignItems: "center", gap: "36px", marginBottom: "40px" }}>
          <a href="#" style={{
            fontSize: "0.65rem", letterSpacing: "0.22em", textTransform: "uppercase",
            color: "rgba(255,255,255,0.6)", textDecoration: "none", fontWeight: 600,
            borderBottom: "1px solid rgba(255,255,255,0.2)", paddingBottom: "3px",
          }}>
            Message us →
          </a>
          <a href="#" style={{
            display: "inline-flex", alignItems: "center", gap: "6px",
            fontFamily: "'Press Start 2P', monospace", fontSize: "0.45rem",
            letterSpacing: "0.04em", color: "rgba(95,197,248,0.45)", textDecoration: "none",
            textShadow: "0 0 12px rgba(95,197,248,0.3)",
          }}>
            <Gamepad2 style={{ width: "10px", height: "10px" }} />
            ▸ Play Stakeholders Invaders
          </a>
        </div>
      </div>

      {/* Bottom rule */}
      <div style={{ height: "1px", background: "rgba(255,255,255,0.05)", margin: "0 60px", flexShrink: 0, position: "relative", zIndex: 10 }} />

      {/* Metrics as a footnote bar */}
      <div style={{
        display: "flex", alignItems: "center", gap: "0",
        padding: "18px 60px", flexShrink: 0, position: "relative", zIndex: 10,
      }}>
        {[
          { value: "545.5%", label: "User Base Increase" },
          { value: "$2.1B", label: "Disaster Relief Platform" },
          { value: "75%", label: "Ticket Reduction" },
        ].map((m, i) => (
          <div key={m.value} style={{
            display: "flex", alignItems: "baseline", gap: "8px",
            paddingRight: "36px", marginRight: "36px",
            borderRight: i < 2 ? "1px solid rgba(255,255,255,0.05)" : "none",
          }}>
            <span style={{
              fontSize: "1.05rem", fontWeight: 700, color: "rgba(255,255,255,0.7)",
              letterSpacing: "-0.02em", lineHeight: 1,
            }}>{m.value}</span>
            <span style={{
              fontSize: "0.58rem", color: "rgba(255,255,255,0.18)",
              letterSpacing: "0.1em", textTransform: "uppercase",
            }}>{m.label}</span>
          </div>
        ))}
        <div style={{ marginLeft: "auto", fontSize: "0.55rem", color: "rgba(255,255,255,0.12)", letterSpacing: "0.1em", textTransform: "uppercase" }}>
          2023 GovTech Award Winner
        </div>
      </div>
    </div>
  );
}
