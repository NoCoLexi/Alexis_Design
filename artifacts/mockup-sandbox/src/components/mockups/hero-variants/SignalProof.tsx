import { ArrowRight, Award } from "lucide-react";

const cases = [
  {
    metric: "545.5%",
    metricLabel: "User base increase",
    name: "CALOES — Emergency Management",
    desc: "Redesigned a state emergency management system from the ground up, driving adoption across 58 California counties.",
    tags: ["Discovery", "Zero-to-one", "Gov Tech"],
    accent: "#5fc5f8",
    bg: "linear-gradient(135deg, #060E18 0%, #091522 100%)",
  },
  {
    metric: "$2.1B",
    metricLabel: "Disaster relief disbursed",
    name: "PA Portal — FEMA Disaster Relief",
    desc: "Led product for a federal disaster relief platform that processed $2.1B across 40+ disaster declarations.",
    tags: ["Platform", "Scale", "Federal"],
    accent: "#4dd4ac",
    bg: "linear-gradient(135deg, #060F10 0%, #081814 100%)",
  },
  {
    metric: "75%",
    metricLabel: "Support ticket reduction",
    name: "PA Portal — Support Operations",
    desc: "Embedded PM work within operations to identify and resolve systemic friction, cutting support load by three-quarters.",
    tags: ["Ops", "Metrics", "Efficiency"],
    accent: "#a78bfa",
    bg: "linear-gradient(135deg, #0A0810 0%, #0E0A1A 100%)",
  },
];

export function SignalProof() {
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
          padding: "18px 48px",
          borderBottom: "1px solid rgba(95,197,248,0.1)",
          flexShrink: 0,
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
          <div style={{ width: "8px", height: "8px", background: "#5fc5f8", borderRadius: "2px" }} />
          <span style={{ fontWeight: 800, fontSize: "0.9rem", letterSpacing: "0.08em", color: "#fff", textTransform: "uppercase" }}>UPSTART-Labs</span>
        </div>
        <div style={{ display: "flex", gap: "28px", alignItems: "center" }}>
          {["Work", "Expertise", "Speaking", "Process"].map(item => (
            <span key={item} style={{ fontSize: "0.72rem", fontWeight: 600, color: "rgba(255,255,255,0.35)", cursor: "pointer" }}>{item}</span>
          ))}
        </div>
      </nav>

      {/* Case cards — dominant visual */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr 1fr",
          gap: "1px",
          background: "rgba(95,197,248,0.06)",
          flex: 1,
        }}
      >
        {cases.map((c) => (
          <div
            key={c.name}
            style={{
              background: c.bg,
              padding: "40px 36px",
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
              cursor: "pointer",
              position: "relative",
              overflow: "hidden",
            }}
          >
            {/* Accent glow */}
            <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: "3px", background: c.accent, opacity: 0.6 }} />

            {/* Metric — dominant */}
            <div>
              <div style={{ fontSize: "clamp(44px, 5.5vw, 64px)", fontWeight: 800, color: "#fff", letterSpacing: "-0.04em", lineHeight: 1, marginBottom: "6px" }}>
                {c.metric}
              </div>
              <div style={{ fontSize: "0.7rem", letterSpacing: "0.1em", textTransform: "uppercase", color: c.accent, fontWeight: 700, opacity: 0.8 }}>
                {c.metricLabel}
              </div>
            </div>

            {/* Project info */}
            <div>
              <div style={{ fontWeight: 700, fontSize: "0.9rem", color: "rgba(255,255,255,0.85)", marginBottom: "10px", lineHeight: 1.3 }}>{c.name}</div>
              <p style={{ fontSize: "0.78rem", color: "rgba(255,255,255,0.4)", lineHeight: 1.6, margin: "0 0 20px" }}>{c.desc}</p>
              <div style={{ display: "flex", gap: "6px", flexWrap: "wrap", marginBottom: "20px" }}>
                {c.tags.map(t => (
                  <span key={t} style={{ fontSize: "0.58rem", padding: "3px 8px", border: `1px solid ${c.accent}40`, borderRadius: "3px", color: c.accent, letterSpacing: "0.08em", textTransform: "uppercase", fontWeight: 700 }}>{t}</span>
                ))}
              </div>
              <span style={{ fontSize: "0.72rem", color: c.accent, display: "flex", alignItems: "center", gap: "6px", fontWeight: 600 }}>
                View case study <ArrowRight style={{ width: "12px", height: "12px" }} />
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* Footer strip — pitch lives here, proof was above */}
      <div
        style={{
          background: "#030405",
          borderTop: "1px solid rgba(95,197,248,0.1)",
          padding: "24px 48px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          flexShrink: 0,
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
          <div style={{ display: "inline-flex", alignItems: "center", gap: "6px", padding: "4px 10px", background: "rgba(95,197,248,0.08)", border: "1px solid rgba(95,197,248,0.25)", borderRadius: "3px" }}>
            <Award style={{ width: "10px", height: "10px", color: "#5fc5f8" }} />
            <span style={{ fontSize: "0.58rem", letterSpacing: "0.12em", textTransform: "uppercase", color: "#5fc5f8", fontWeight: 700 }}>GovTech Award 2023</span>
          </div>
          <span style={{ fontSize: "0.82rem", fontWeight: 500, color: "rgba(255,255,255,0.4)" }}>
            We help product teams ship things people actually adopt.
          </span>
        </div>
        <a href="#" style={{ display: "inline-flex", alignItems: "center", gap: "8px", padding: "10px 20px", background: "#5fc5f8", color: "#050608", fontWeight: 800, fontSize: "0.75rem", letterSpacing: "0.06em", textTransform: "uppercase", borderRadius: "4px", textDecoration: "none" }}>
          Message Us <ArrowRight style={{ width: "12px", height: "12px" }} />
        </a>
      </div>
    </div>
  );
}
