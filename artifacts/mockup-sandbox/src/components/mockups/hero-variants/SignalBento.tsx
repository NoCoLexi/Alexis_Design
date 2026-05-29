import { Award, ArrowRight, Gamepad2, Zap, Users, BarChart3 } from "lucide-react";

export function SignalBento() {
  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#050608",
        fontFamily: "'Montserrat', sans-serif",
        display: "flex",
        flexDirection: "column",
      }}
    >
      {/* Nav */}
      <nav
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "18px 40px",
          borderBottom: "1px solid rgba(95,197,248,0.1)",
          flexShrink: 0,
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
          <div style={{ width: "8px", height: "8px", background: "#5fc5f8", borderRadius: "2px" }} />
          <span style={{ fontWeight: 800, fontSize: "0.9rem", letterSpacing: "0.08em", color: "#fff", textTransform: "uppercase" }}>UPSTART-Labs</span>
        </div>
        <div style={{ display: "flex", gap: "28px" }}>
          {["Work", "Expertise", "Speaking", "Process"].map(item => (
            <span key={item} style={{ fontSize: "0.72rem", fontWeight: 600, color: "rgba(255,255,255,0.35)", cursor: "pointer", letterSpacing: "0.04em" }}>{item}</span>
          ))}
        </div>
      </nav>

      {/* Bento grid */}
      <div
        style={{
          flex: 1,
          display: "grid",
          gridTemplateColumns: "2fr 1fr 1fr",
          gridTemplateRows: "1fr 1fr",
          gap: "1px",
          background: "rgba(95,197,248,0.08)",
          overflow: "hidden",
        }}
      >
        {/* TILE A — Hero headline (spans 2 rows) */}
        <div
          style={{
            gridRow: "1 / 3",
            background: "#050608",
            padding: "48px 44px",
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            position: "relative",
            overflow: "hidden",
          }}
        >
          {/* Dot grid */}
          <div style={{ position: "absolute", inset: 0, backgroundImage: "radial-gradient(circle, rgba(95,197,248,0.07) 1px, transparent 1px)", backgroundSize: "28px 28px", pointerEvents: "none" }} />
          {/* Cyan corner glow */}
          <div style={{ position: "absolute", bottom: 0, right: 0, width: "300px", height: "300px", background: "radial-gradient(ellipse at bottom right, rgba(95,197,248,0.1) 0%, transparent 70%)", pointerEvents: "none" }} />

          <div style={{ position: "relative" }}>
            {/* Award */}
            <div style={{ display: "inline-flex", alignItems: "center", gap: "7px", padding: "5px 12px", background: "rgba(95,197,248,0.1)", border: "1px solid rgba(95,197,248,0.3)", borderRadius: "3px", marginBottom: "32px" }}>
              <Award style={{ width: "11px", height: "11px", color: "#5fc5f8" }} />
              <span style={{ fontSize: "0.6rem", letterSpacing: "0.12em", textTransform: "uppercase", color: "#5fc5f8", fontWeight: 700 }}>2023 GovTech Award</span>
            </div>
            <h1 style={{ fontWeight: 800, fontSize: "clamp(32px, 3.8vw, 52px)", lineHeight: 1.05, letterSpacing: "-0.03em", color: "#fff", margin: "0 0 16px" }}>
              Hi, we're<br />
              <span style={{ color: "#5fc5f8" }}>UPSTART-Labs</span>
            </h1>
            <p style={{ fontSize: "0.95rem", fontWeight: 400, lineHeight: 1.65, color: "rgba(255,255,255,0.45)", margin: 0, maxWidth: "400px" }}>
              We help product teams ship things people actually adopt.
            </p>
          </div>

          {/* Bottom CTA */}
          <a href="#" style={{ display: "inline-flex", alignItems: "center", gap: "8px", padding: "12px 20px", background: "#5fc5f8", color: "#050608", fontWeight: 800, fontSize: "0.75rem", letterSpacing: "0.06em", textTransform: "uppercase", borderRadius: "4px", textDecoration: "none", alignSelf: "flex-start", position: "relative" }}>
            Message Us <ArrowRight style={{ width: "13px", height: "13px" }} />
          </a>
        </div>

        {/* TILE B — Metric 1: 545.5% */}
        <div
          style={{
            background: "#080C10",
            padding: "32px 28px",
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
          }}
        >
          <Users style={{ width: "20px", height: "20px", color: "rgba(95,197,248,0.4)" }} />
          <div>
            <div style={{ fontSize: "clamp(36px, 4vw, 52px)", fontWeight: 800, color: "#fff", letterSpacing: "-0.04em", lineHeight: 1 }}>545.5<span style={{ color: "#5fc5f8", fontSize: "0.6em" }}>%</span></div>
            <div style={{ fontSize: "0.72rem", color: "rgba(255,255,255,0.45)", marginTop: "8px", lineHeight: 1.4 }}>User Base Increase</div>
            <div style={{ fontSize: "0.6rem", letterSpacing: "0.1em", textTransform: "uppercase", color: "rgba(95,197,248,0.5)", marginTop: "6px", fontWeight: 700 }}>CALOES</div>
          </div>
          <span style={{ fontSize: "0.65rem", color: "rgba(95,197,248,0.45)", cursor: "pointer" }}>View case study →</span>
        </div>

        {/* TILE C — Award / Game CTA */}
        <div
          style={{
            background: "#0B0A0E",
            padding: "32px 28px",
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            borderLeft: "none",
          }}
        >
          <Gamepad2 style={{ width: "20px", height: "20px", color: "rgba(95,197,248,0.4)" }} />
          <div>
            <div style={{ fontFamily: "'Press Start 2P', monospace", fontSize: "0.52rem", letterSpacing: "0.06em", color: "#5fc5f8", lineHeight: 1.6, marginBottom: "16px" }}>▸ PLAY STAKEHOLDERS INVADERS</div>
            <p style={{ fontSize: "0.7rem", color: "rgba(255,255,255,0.3)", lineHeight: 1.5, margin: 0 }}>
              A game we built to explain what PMs actually do.
            </p>
          </div>
          <a href="#" style={{ display: "inline-flex", alignItems: "center", gap: "6px", fontFamily: "'Press Start 2P', monospace", fontSize: "0.48rem", color: "#5fc5f8", textDecoration: "none", border: "1px solid rgba(95,197,248,0.3)", padding: "8px 12px", borderRadius: "3px", alignSelf: "flex-start" }}>Play now →</a>
        </div>

        {/* TILE D — Metric 2: $2.1B */}
        <div
          style={{
            background: "#060A0F",
            padding: "32px 28px",
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
          }}
        >
          <Zap style={{ width: "20px", height: "20px", color: "rgba(95,197,248,0.4)" }} />
          <div>
            <div style={{ fontSize: "clamp(36px, 4vw, 52px)", fontWeight: 800, color: "#fff", letterSpacing: "-0.04em", lineHeight: 1 }}><span style={{ color: "#5fc5f8", fontSize: "0.7em" }}>$</span>2.1<span style={{ color: "#5fc5f8", fontSize: "0.6em" }}>B</span></div>
            <div style={{ fontSize: "0.72rem", color: "rgba(255,255,255,0.45)", marginTop: "8px", lineHeight: 1.4 }}>Disaster Relief Platform</div>
            <div style={{ fontSize: "0.6rem", letterSpacing: "0.1em", textTransform: "uppercase", color: "rgba(95,197,248,0.5)", marginTop: "6px", fontWeight: 700 }}>PA PORTAL</div>
          </div>
          <span style={{ fontSize: "0.65rem", color: "rgba(95,197,248,0.45)", cursor: "pointer" }}>View case study →</span>
        </div>

        {/* TILE E — Metric 3: 75% */}
        <div
          style={{
            background: "#07090D",
            padding: "32px 28px",
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
          }}
        >
          <BarChart3 style={{ width: "20px", height: "20px", color: "rgba(95,197,248,0.4)" }} />
          <div>
            <div style={{ fontSize: "clamp(36px, 4vw, 52px)", fontWeight: 800, color: "#fff", letterSpacing: "-0.04em", lineHeight: 1 }}>75<span style={{ color: "#5fc5f8", fontSize: "0.6em" }}>%</span></div>
            <div style={{ fontSize: "0.72rem", color: "rgba(255,255,255,0.45)", marginTop: "8px", lineHeight: 1.4 }}>Ticket Reduction</div>
            <div style={{ fontSize: "0.6rem", letterSpacing: "0.1em", textTransform: "uppercase", color: "rgba(95,197,248,0.5)", marginTop: "6px", fontWeight: 700 }}>SUPPORT OPS</div>
          </div>
          <span style={{ fontSize: "0.65rem", color: "rgba(95,197,248,0.45)", cursor: "pointer" }}>View case study →</span>
        </div>
      </div>
    </div>
  );
}
