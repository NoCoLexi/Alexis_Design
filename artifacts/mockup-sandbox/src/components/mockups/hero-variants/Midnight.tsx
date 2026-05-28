import { Gamepad2 } from "lucide-react";

export function Midnight() {
  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#000000",
        fontFamily: "'Montserrat', sans-serif",
        position: "relative",
        overflow: "hidden",
        display: "flex",
        flexDirection: "column",
      }}
    >
      {/* Subtle horizontal scan line */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          height: "1px",
          background:
            "linear-gradient(90deg, transparent 0%, rgba(95,197,248,0.4) 30%, rgba(95,197,248,0.4) 70%, transparent 100%)",
          pointerEvents: "none",
          zIndex: 5,
        }}
      />

      {/* Nav — just a logo */}
      <nav
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "32px 56px",
          position: "relative",
          zIndex: 10,
        }}
      >
        <span
          style={{
            fontWeight: 700,
            fontSize: "0.9rem",
            letterSpacing: "0.2em",
            color: "rgba(255,255,255,0.9)",
            textTransform: "uppercase",
          }}
        >
          UPSTART-<span style={{ color: "#5fc5f8" }}>Labs</span>
        </span>
        <div style={{ display: "flex", gap: "32px" }}>
          {["Work", "Expertise", "Contact"].map((item) => (
            <span
              key={item}
              style={{
                fontSize: "0.72rem",
                letterSpacing: "0.16em",
                textTransform: "uppercase",
                color: "rgba(255,255,255,0.2)",
                cursor: "pointer",
              }}
            >
              {item}
            </span>
          ))}
        </div>
      </nav>

      {/* Hero — max negative space, massive headline */}
      <div
        style={{
          flex: 1,
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: "40px 56px 60px",
          position: "relative",
          zIndex: 10,
        }}
      >
        {/* Superscript label */}
        <div
          style={{
            fontSize: "0.62rem",
            letterSpacing: "0.24em",
            textTransform: "uppercase",
            color: "#5fc5f8",
            marginBottom: "24px",
            opacity: 0.7,
          }}
        >
          ◆ &nbsp;Product Strategy &amp; Design
        </div>

        {/* Massive headline with neon glow */}
        <h1
          style={{
            fontWeight: 200,
            fontSize: "clamp(56px, 9vw, 96px)",
            lineHeight: 1.0,
            letterSpacing: "-0.04em",
            color: "#ffffff",
            margin: "0 0 0",
            textShadow: "0 0 60px rgba(95,197,248,0.15), 0 0 120px rgba(95,197,248,0.07)",
          }}
        >
          Hi, we're
        </h1>
        <h1
          style={{
            fontWeight: 700,
            fontSize: "clamp(56px, 9vw, 96px)",
            lineHeight: 1.0,
            letterSpacing: "-0.04em",
            margin: "0 0 48px",
            color: "#5fc5f8",
            textShadow:
              "0 0 30px rgba(95,197,248,0.6), 0 0 80px rgba(95,197,248,0.3), 0 0 160px rgba(95,197,248,0.15)",
          }}
        >
          UPSTART-Labs
        </h1>

        {/* Subhead — quiet */}
        <p
          style={{
            fontSize: "1rem",
            fontWeight: 300,
            lineHeight: 1.6,
            color: "rgba(255,255,255,0.3)",
            margin: "0 0 56px",
            maxWidth: "460px",
            letterSpacing: "0.01em",
          }}
        >
          We help product teams ship things people actually adopt.
        </p>

        {/* CTAs — text only, minimal */}
        <div style={{ display: "flex", alignItems: "center", gap: "48px", marginBottom: "80px" }}>
          <a
            href="#"
            style={{
              fontSize: "0.8rem",
              letterSpacing: "0.16em",
              textTransform: "uppercase",
              color: "rgba(255,255,255,0.7)",
              textDecoration: "none",
              display: "flex",
              alignItems: "center",
              gap: "10px",
              borderBottom: "1px solid rgba(255,255,255,0.15)",
              paddingBottom: "4px",
            }}
          >
            Message us &nbsp;→
          </a>

          <a
            href="#"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "8px",
              fontFamily: "'Press Start 2P', monospace",
              fontSize: "0.55rem",
              letterSpacing: "0.04em",
              color: "rgba(95,197,248,0.6)",
              textDecoration: "none",
              textShadow: "0 0 12px rgba(95,197,248,0.4)",
            }}
          >
            <Gamepad2 style={{ width: "12px", height: "12px" }} />
            ▸ PLAY STAKEHOLDERS INVADERS
          </a>
        </div>

        {/* Metrics — inline footnote strip */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "0",
            borderTop: "1px solid rgba(255,255,255,0.06)",
            paddingTop: "28px",
          }}
        >
          {[
            { value: "545.5%", label: "User Base Increase" },
            { value: "$2.1B", label: "Disaster Relief Platform" },
            { value: "75%", label: "Ticket Reduction" },
          ].map((m, i) => (
            <div
              key={m.value}
              style={{
                display: "flex",
                alignItems: "baseline",
                gap: "10px",
                paddingRight: "40px",
                marginRight: "40px",
                borderRight:
                  i < 2 ? "1px solid rgba(255,255,255,0.06)" : "none",
              }}
            >
              <span
                style={{
                  fontSize: "1.5rem",
                  fontWeight: 700,
                  color: "rgba(255,255,255,0.85)",
                  letterSpacing: "-0.02em",
                  lineHeight: 1,
                  textShadow: "0 0 20px rgba(95,197,248,0.2)",
                }}
              >
                {m.value}
              </span>
              <span
                style={{
                  fontSize: "0.65rem",
                  color: "rgba(255,255,255,0.2)",
                  letterSpacing: "0.08em",
                  textTransform: "uppercase",
                }}
              >
                {m.label}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
