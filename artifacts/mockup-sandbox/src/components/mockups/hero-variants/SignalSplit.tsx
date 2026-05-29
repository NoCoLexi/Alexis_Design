import { ArrowRight, Gamepad2, Award } from "lucide-react";

export function SignalSplit() {
  const metrics = [
    { value: "545", suffix: ".5%", label: "User Base Increase", sub: "CALOES — Gov Tech" },
    { value: "$2.1", suffix: "B", label: "Disaster Relief Platform", sub: "PA Portal — FEMA" },
    { value: "75", suffix: "%", label: "Ticket Reduction", sub: "PA Portal — Support" },
  ];

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
          padding: "20px 48px",
          zIndex: 10,
          borderBottom: "1px solid rgba(95,197,248,0.1)",
          background: "rgba(5,6,8,0.95)",
          flexShrink: 0,
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
          <div style={{ width: "8px", height: "8px", background: "#5fc5f8", borderRadius: "2px" }} />
          <span style={{ fontWeight: 800, fontSize: "0.9rem", letterSpacing: "0.08em", color: "#fff", textTransform: "uppercase" }}>
            UPSTART-Labs
          </span>
        </div>
        <div style={{ display: "flex", gap: "32px" }}>
          {["Work", "Expertise", "Speaking", "Process"].map(item => (
            <span key={item} style={{ fontSize: "0.72rem", fontWeight: 600, letterSpacing: "0.06em", color: "rgba(255,255,255,0.4)", cursor: "pointer" }}>{item}</span>
          ))}
        </div>
      </nav>

      {/* Split body */}
      <div style={{ display: "flex", flex: 1 }}>

        {/* LEFT — Statement */}
        <div
          style={{
            flex: "0 0 46%",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            padding: "56px 56px 56px 56px",
            borderRight: "1px solid rgba(95,197,248,0.12)",
            position: "relative",
            overflow: "hidden",
          }}
        >
          {/* Subtle dot grid */}
          <div style={{ position: "absolute", inset: 0, backgroundImage: "radial-gradient(circle, rgba(95,197,248,0.06) 1px, transparent 1px)", backgroundSize: "28px 28px", pointerEvents: "none" }} />

          {/* Award */}
          <div style={{ display: "inline-flex", alignItems: "center", gap: "7px", padding: "6px 14px", background: "rgba(95,197,248,0.1)", border: "1px solid rgba(95,197,248,0.3)", borderRadius: "4px", marginBottom: "36px", alignSelf: "flex-start", position: "relative" }}>
            <Award style={{ width: "12px", height: "12px", color: "#5fc5f8" }} />
            <span style={{ fontSize: "0.65rem", letterSpacing: "0.1em", textTransform: "uppercase", color: "#5fc5f8", fontWeight: 700 }}>
              2023 GovTech Award Winner
            </span>
          </div>

          {/* Headline */}
          <h1 style={{ fontWeight: 800, fontSize: "clamp(36px, 4vw, 52px)", lineHeight: 1.05, letterSpacing: "-0.03em", color: "#fff", margin: "0 0 20px", position: "relative" }}>
            Hi, we're<br />
            <span style={{ color: "#5fc5f8" }}>UPSTART-Labs</span>
          </h1>

          {/* Subhead */}
          <p style={{ fontSize: "1rem", fontWeight: 400, lineHeight: 1.7, color: "rgba(255,255,255,0.5)", margin: "0 0 40px", position: "relative" }}>
            We help product teams ship things people actually adopt.
          </p>

          {/* CTAs */}
          <div style={{ display: "flex", flexDirection: "column", gap: "12px", position: "relative" }}>
            <a href="#" style={{ display: "inline-flex", alignItems: "center", gap: "8px", padding: "13px 22px", background: "#5fc5f8", color: "#050608", fontWeight: 800, fontSize: "0.78rem", letterSpacing: "0.06em", textTransform: "uppercase", borderRadius: "4px", textDecoration: "none", alignSelf: "flex-start" }}>
              Message Us <ArrowRight style={{ width: "14px", height: "14px" }} />
            </a>
            <a href="#" style={{ display: "inline-flex", alignItems: "center", gap: "8px", fontFamily: "'Press Start 2P', monospace", fontSize: "0.55rem", letterSpacing: "0.05em", color: "#5fc5f8", padding: "11px 16px", border: "1px solid rgba(95,197,248,0.35)", borderRadius: "4px", background: "transparent", textDecoration: "none", alignSelf: "flex-start" }}>
              <Gamepad2 style={{ width: "12px", height: "12px" }} />▸ PLAY STAKEHOLDERS INVADERS
            </a>
          </div>
        </div>

        {/* RIGHT — Evidence: oversized metrics */}
        <div
          style={{
            flex: 1,
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            padding: "48px 56px",
            background: "linear-gradient(135deg, #050608 0%, #081018 100%)",
            gap: "0",
          }}
        >
          <div style={{ fontSize: "0.6rem", letterSpacing: "0.2em", textTransform: "uppercase", color: "rgba(95,197,248,0.45)", marginBottom: "32px", fontWeight: 700 }}>
            ◆ &nbsp;Outcomes — verified
          </div>
          {metrics.map((m, i) => (
            <div
              key={m.value}
              style={{
                display: "flex",
                alignItems: "baseline",
                gap: "0",
                paddingTop: i === 0 ? 0 : "24px",
                paddingBottom: "24px",
                borderBottom: i < metrics.length - 1 ? "1px solid rgba(95,197,248,0.08)" : "none",
              }}
            >
              <div style={{ minWidth: "200px" }}>
                <span style={{ fontSize: "clamp(48px, 6vw, 72px)", fontWeight: 800, color: "#fff", letterSpacing: "-0.04em", lineHeight: 1 }}>{m.value}</span>
                <span style={{ fontSize: "clamp(28px, 3.5vw, 44px)", fontWeight: 800, color: "#5fc5f8", letterSpacing: "-0.02em" }}>{m.suffix}</span>
              </div>
              <div style={{ paddingLeft: "24px", borderLeft: "2px solid rgba(95,197,248,0.2)", marginLeft: "8px" }}>
                <div style={{ fontSize: "0.85rem", fontWeight: 600, color: "rgba(255,255,255,0.8)", marginBottom: "4px" }}>{m.label}</div>
                <div style={{ fontSize: "0.65rem", letterSpacing: "0.1em", textTransform: "uppercase", color: "rgba(95,197,248,0.5)", fontWeight: 700 }}>{m.sub}</div>
              </div>
            </div>
          ))}
          <div style={{ marginTop: "24px", fontSize: "0.65rem", color: "rgba(255,255,255,0.2)", letterSpacing: "0.08em" }}>
            Click any metric to view the full case study →
          </div>
        </div>
      </div>
    </div>
  );
}
