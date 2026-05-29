import { useState } from "react";

const PROMPTS = [
  { id: "a", label: "A new product from scratch", reply: "→ Scrolling to: End-to-end product launches" },
  { id: "b", label: "A feature teams can't stop deprioritizing", reply: "→ Scrolling to: Stakeholder alignment work" },
  { id: "c", label: "A platform that gets ignored after launch", reply: "→ Scrolling to: Adoption & change management" },
  { id: "d", label: "Something nobody agrees on", reply: "→ Scrolling to: Discovery & alignment sprints" },
];

export function SignalTerminal() {
  const [selected, setSelected] = useState<string | null>(null);

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#030405",
        fontFamily: "'Montserrat', sans-serif",
        display: "flex",
        flexDirection: "column",
        color: "#fff",
      }}
    >
      {/* Scanline texture */}
      <div style={{ position: "fixed", inset: 0, backgroundImage: "repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,0,0,0.08) 2px, rgba(0,0,0,0.08) 4px)", pointerEvents: "none", zIndex: 0 }} />

      {/* Nav — terminal style */}
      <nav
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "16px 48px",
          borderBottom: "1px solid rgba(95,197,248,0.15)",
          background: "rgba(3,4,5,0.97)",
          zIndex: 10,
          flexShrink: 0,
          position: "relative",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
          <span style={{ fontFamily: "'Press Start 2P', monospace", fontSize: "0.6rem", color: "#5fc5f8", letterSpacing: "0.08em" }}>UPSTART-LABS</span>
          <span style={{ fontSize: "0.6rem", color: "rgba(95,197,248,0.3)", letterSpacing: "0.1em" }}>v2.5.0 — product OS</span>
        </div>
        <div style={{ display: "flex", gap: "28px" }}>
          {["work", "expertise", "speaking", "process"].map(item => (
            <span key={item} style={{ fontFamily: "'Press Start 2P', monospace", fontSize: "0.45rem", color: "rgba(95,197,248,0.35)", cursor: "pointer", letterSpacing: "0.06em" }}>{item}</span>
          ))}
        </div>
      </nav>

      {/* Terminal body */}
      <div
        style={{
          flex: 1,
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: "48px 64px",
          position: "relative",
          zIndex: 1,
          maxWidth: "860px",
          margin: "0 auto",
          width: "100%",
        }}
      >
        {/* System boot lines */}
        <div style={{ marginBottom: "32px" }}>
          {[
            "UPSTART-LABS OS v2.5.0 — initializing",
            "Award: 2023 California GovTech ✓",
            "Portfolio: 545.5% user growth, $2.1B platform, 75% ticket reduction ✓",
            "Status: available for new engagements ✓",
          ].map((line, i) => (
            <div key={i} style={{ fontFamily: "monospace", fontSize: "0.7rem", color: "rgba(95,197,248,0.35)", marginBottom: "4px", letterSpacing: "0.04em" }}>
              <span style={{ color: "rgba(95,197,248,0.2)" }}>[{String(i + 1).padStart(2, "0")}]</span> {line}
            </div>
          ))}
        </div>

        {/* Divider */}
        <div style={{ borderTop: "1px solid rgba(95,197,248,0.15)", marginBottom: "36px" }} />

        {/* Main question */}
        <div style={{ marginBottom: "8px" }}>
          <span style={{ fontFamily: "monospace", fontSize: "0.75rem", color: "rgba(95,197,248,0.5)", marginRight: "8px" }}>upstart@labs:~$</span>
          <span style={{ fontFamily: "monospace", fontSize: "0.75rem", color: "rgba(255,255,255,0.6)" }}>ask_visitor --prompt</span>
        </div>

        <div
          style={{
            background: "rgba(95,197,248,0.04)",
            border: "1px solid rgba(95,197,248,0.2)",
            borderRadius: "6px",
            padding: "28px 32px",
            marginBottom: "28px",
          }}
        >
          <p
            style={{
              fontWeight: 700,
              fontSize: "clamp(18px, 2.5vw, 26px)",
              lineHeight: 1.3,
              color: "#ffffff",
              margin: "0 0 8px",
              letterSpacing: "-0.01em",
            }}
          >
            What are you trying to ship?
          </p>
          <p style={{ fontSize: "0.8rem", color: "rgba(255,255,255,0.3)", margin: 0 }}>
            Select one to navigate to relevant case studies.
          </p>
        </div>

        {/* Answer options */}
        <div style={{ display: "flex", flexDirection: "column", gap: "10px", marginBottom: "36px" }}>
          {PROMPTS.map((p) => (
            <div
              key={p.id}
              onClick={() => setSelected(p.id)}
              style={{
                display: "flex",
                alignItems: "center",
                gap: "14px",
                padding: "14px 20px",
                border: selected === p.id ? "1px solid #5fc5f8" : "1px solid rgba(95,197,248,0.15)",
                borderRadius: "4px",
                background: selected === p.id ? "rgba(95,197,248,0.08)" : "transparent",
                cursor: "pointer",
                transition: "all 0.15s ease",
              }}
            >
              <span
                style={{
                  fontFamily: "'Press Start 2P', monospace",
                  fontSize: "0.55rem",
                  color: selected === p.id ? "#5fc5f8" : "rgba(95,197,248,0.4)",
                  minWidth: "20px",
                }}
              >
                [{p.id.toUpperCase()}]
              </span>
              <span style={{ fontSize: "0.88rem", fontWeight: selected === p.id ? 600 : 400, color: selected === p.id ? "#ffffff" : "rgba(255,255,255,0.55)" }}>
                {p.label}
              </span>
            </div>
          ))}
        </div>

        {/* Response line */}
        {selected ? (
          <div style={{ fontFamily: "monospace", fontSize: "0.75rem", color: "#5fc5f8", marginBottom: "16px", letterSpacing: "0.02em" }}>
            {PROMPTS.find(p => p.id === selected)?.reply}
            <span style={{ animation: "none", marginLeft: "4px", opacity: 0.7 }}>█</span>
          </div>
        ) : (
          <div style={{ fontFamily: "monospace", fontSize: "0.75rem", color: "rgba(95,197,248,0.25)", marginBottom: "16px" }}>
            awaiting input<span style={{ marginLeft: "2px" }}>█</span>
          </div>
        )}

        {/* Bottom metadata */}
        <div style={{ borderTop: "1px solid rgba(95,197,248,0.08)", paddingTop: "20px", display: "flex", gap: "32px" }}>
          {[
            { k: "approach", v: "Product strategy + design" },
            { k: "contact", v: "alexis@upstart-labs.com" },
            { k: "availability", v: "Q3 2026 →" },
          ].map(({ k, v }) => (
            <div key={k}>
              <div style={{ fontFamily: "monospace", fontSize: "0.58rem", color: "rgba(95,197,248,0.35)", marginBottom: "3px", textTransform: "uppercase", letterSpacing: "0.1em" }}>{k}</div>
              <div style={{ fontFamily: "monospace", fontSize: "0.7rem", color: "rgba(255,255,255,0.55)" }}>{v}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
