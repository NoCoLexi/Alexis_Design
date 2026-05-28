import { Award, ArrowRight, Gamepad2 } from "lucide-react";

export function Editorial() {
  const metrics = [
    { value: "545.5%", label: "User Base Increase" },
    { value: "$2.1B", label: "Disaster Relief Platform" },
    { value: "75%", label: "Ticket Reduction" },
  ];

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#090812",
        fontFamily: "'Montserrat', sans-serif",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Warm vignette */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background:
            "radial-gradient(ellipse 80% 60% at 30% 40%, rgba(243,232,185,0.04) 0%, transparent 70%)",
          pointerEvents: "none",
        }}
      />

      {/* Nav */}
      <nav
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "28px 56px",
          position: "relative",
          zIndex: 10,
          borderBottom: "1px solid rgba(243,232,185,0.08)",
        }}
      >
        <span
          style={{
            fontWeight: 300,
            fontSize: "1.05rem",
            letterSpacing: "0.18em",
            color: "#F3E8B9",
            textTransform: "uppercase",
          }}
        >
          UPSTART<span style={{ fontWeight: 700 }}>–</span>Labs
        </span>
        <div
          style={{
            display: "flex",
            gap: "40px",
            alignItems: "center",
          }}
        >
          {["Work", "Expertise", "Speaking", "Process"].map((item) => (
            <span
              key={item}
              style={{
                fontSize: "0.78rem",
                letterSpacing: "0.12em",
                textTransform: "uppercase",
                color: "rgba(243,232,185,0.45)",
                cursor: "pointer",
              }}
            >
              {item}
            </span>
          ))}
        </div>
      </nav>

      {/* Hero content */}
      <div
        style={{
          maxWidth: "900px",
          margin: "0 auto",
          padding: "80px 56px 60px",
          position: "relative",
          zIndex: 10,
        }}
      >
        {/* Award badge — restrained */}
        <div
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: "8px",
            marginBottom: "52px",
            padding: "6px 14px",
            border: "1px solid rgba(95,197,248,0.3)",
            borderRadius: "3px",
          }}
        >
          <Award style={{ width: "12px", height: "12px", color: "#5fc5f8" }} />
          <span
            style={{
              fontSize: "0.68rem",
              letterSpacing: "0.14em",
              textTransform: "uppercase",
              color: "#5fc5f8",
              fontWeight: 600,
            }}
          >
            2023 California GovTech Award Winner
          </span>
        </div>

        {/* Headline — editorial, generous, light */}
        <h1
          style={{
            fontWeight: 300,
            fontSize: "clamp(52px, 7vw, 76px)",
            lineHeight: 1.05,
            letterSpacing: "-0.02em",
            color: "#F3E8B9",
            margin: "0 0 28px",
          }}
        >
          Hi, we're{" "}
          <span style={{ fontStyle: "italic", fontWeight: 300 }}>
            UPSTART-Labs
          </span>
        </h1>

        {/* Thin rule */}
        <div
          style={{
            width: "48px",
            height: "1px",
            background: "rgba(95,197,248,0.5)",
            marginBottom: "28px",
          }}
        />

        {/* Subhead */}
        <p
          style={{
            fontSize: "1.2rem",
            fontWeight: 300,
            lineHeight: 1.7,
            color: "rgba(243,232,185,0.6)",
            margin: "0 0 64px",
            maxWidth: "540px",
          }}
        >
          We help product teams ship things people actually adopt.
        </p>

        {/* CTAs — editorial link style */}
        <div
          style={{ display: "flex", alignItems: "center", gap: "40px", marginBottom: "72px" }}
        >
          <a
            href="#"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "10px",
              fontFamily: "'Press Start 2P', monospace",
              fontSize: "0.65rem",
              letterSpacing: "0.06em",
              color: "#F3E8B9",
              textDecoration: "none",
              padding: "14px 22px",
              border: "1px solid rgba(95,197,248,0.5)",
              borderRadius: "2px",
              background: "rgba(95,197,248,0.04)",
            }}
          >
            <Gamepad2 style={{ width: "14px", height: "14px", color: "#5fc5f8" }} />
            ▸ PLAY STAKEHOLDERS INVADERS
          </a>

          <a
            href="#"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "8px",
              fontSize: "0.78rem",
              letterSpacing: "0.14em",
              textTransform: "uppercase",
              color: "rgba(243,232,185,0.55)",
              textDecoration: "none",
              borderBottom: "1px solid rgba(243,232,185,0.2)",
              paddingBottom: "3px",
            }}
          >
            Message us
            <ArrowRight style={{ width: "14px", height: "14px" }} />
          </a>
        </div>

        {/* Metrics — horizontal row with hairline separators */}
        <div
          style={{
            display: "flex",
            gap: "0",
            borderTop: "1px solid rgba(243,232,185,0.1)",
            paddingTop: "36px",
          }}
        >
          {metrics.map((m, i) => (
            <div
              key={m.value}
              style={{
                flex: 1,
                padding: "0 32px 0 0",
                marginRight: "32px",
                borderRight:
                  i < metrics.length - 1
                    ? "1px solid rgba(243,232,185,0.1)"
                    : "none",
              }}
            >
              <div
                style={{
                  fontSize: "2.4rem",
                  fontWeight: 200,
                  color: "#F3E8B9",
                  letterSpacing: "-0.02em",
                  lineHeight: 1,
                  marginBottom: "8px",
                }}
              >
                {m.value}
              </div>
              <div
                style={{
                  fontSize: "0.7rem",
                  letterSpacing: "0.1em",
                  textTransform: "uppercase",
                  color: "rgba(243,232,185,0.35)",
                }}
              >
                {m.label}
              </div>
              <div
                style={{
                  fontSize: "0.68rem",
                  color: "#5fc5f8",
                  marginTop: "10px",
                  letterSpacing: "0.08em",
                }}
              >
                View case study →
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
