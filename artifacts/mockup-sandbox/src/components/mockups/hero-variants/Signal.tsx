import { Award, ArrowRight, Gamepad2, ChevronRight } from "lucide-react";

export function Signal() {
  const metrics = [
    { value: "545.5%", label: "User Base Increase", tag: "CALOES" },
    { value: "$2.1B", label: "Disaster Relief Platform", tag: "PA PORTAL" },
    { value: "75%", label: "Ticket Reduction", tag: "PA PORTAL" },
  ];

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#050608",
        fontFamily: "'Montserrat', sans-serif",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Dot grid texture */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          backgroundImage:
            "radial-gradient(circle, rgba(95,197,248,0.08) 1px, transparent 1px)",
          backgroundSize: "32px 32px",
          pointerEvents: "none",
        }}
      />
      {/* Cyan wash top-right */}
      <div
        style={{
          position: "absolute",
          top: 0,
          right: 0,
          width: "600px",
          height: "400px",
          background:
            "radial-gradient(ellipse at top right, rgba(95,197,248,0.08) 0%, transparent 70%)",
          pointerEvents: "none",
        }}
      />

      {/* Nav */}
      <nav
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "20px 48px",
          position: "relative",
          zIndex: 10,
          background: "rgba(5,6,8,0.9)",
          backdropFilter: "blur(12px)",
          borderBottom: "1px solid rgba(95,197,248,0.12)",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
          <div
            style={{
              width: "8px",
              height: "8px",
              background: "#5fc5f8",
              borderRadius: "2px",
            }}
          />
          <span
            style={{
              fontWeight: 800,
              fontSize: "0.95rem",
              letterSpacing: "0.08em",
              color: "#ffffff",
              textTransform: "uppercase",
            }}
          >
            UPSTART-Labs
          </span>
        </div>
        <div style={{ display: "flex", gap: "4px", alignItems: "center" }}>
          {["Check out our work", "Our expertise", "Speaking", "How we built this"].map(
            (item) => (
              <span
                key={item}
                style={{
                  fontSize: "0.75rem",
                  fontWeight: 600,
                  letterSpacing: "0.04em",
                  color: "rgba(255,255,255,0.5)",
                  cursor: "pointer",
                  padding: "6px 12px",
                  borderRadius: "4px",
                }}
              >
                {item}
              </span>
            )
          )}
        </div>
      </nav>

      {/* Hero content */}
      <div
        style={{
          maxWidth: "960px",
          margin: "0 auto",
          padding: "64px 48px 48px",
          position: "relative",
          zIndex: 10,
        }}
      >
        {/* Award badge — filled */}
        <div
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: "8px",
            marginBottom: "40px",
            padding: "7px 16px",
            background: "rgba(95,197,248,0.12)",
            border: "1px solid rgba(95,197,248,0.35)",
            borderRadius: "4px",
          }}
        >
          <Award style={{ width: "13px", height: "13px", color: "#5fc5f8" }} />
          <span
            style={{
              fontSize: "0.72rem",
              letterSpacing: "0.1em",
              textTransform: "uppercase",
              color: "#5fc5f8",
              fontWeight: 700,
            }}
          >
            2023 California GovTech Award Winner
          </span>
          <ChevronRight style={{ width: "12px", height: "12px", color: "rgba(95,197,248,0.5)" }} />
        </div>

        {/* Headline — heavy, compressed */}
        <h1
          style={{
            fontWeight: 800,
            fontSize: "clamp(48px, 6.5vw, 68px)",
            lineHeight: 1.0,
            letterSpacing: "-0.03em",
            color: "#ffffff",
            margin: "0 0 20px",
            textTransform: "uppercase",
          }}
        >
          Hi, we're{" "}
          <span
            style={{
              color: "#5fc5f8",
              display: "inline-block",
            }}
          >
            UPSTART-Labs
          </span>
        </h1>

        {/* Subhead */}
        <p
          style={{
            fontSize: "1.05rem",
            fontWeight: 500,
            lineHeight: 1.6,
            color: "rgba(255,255,255,0.55)",
            margin: "0 0 40px",
            maxWidth: "520px",
          }}
        >
          We help product teams ship things people actually adopt.
        </p>

        {/* CTAs */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "16px",
            marginBottom: "56px",
          }}
        >
          {/* Primary — solid filled cyan */}
          <a
            href="#"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "8px",
              padding: "13px 24px",
              background: "#5fc5f8",
              color: "#050608",
              fontWeight: 800,
              fontSize: "0.8rem",
              letterSpacing: "0.06em",
              textTransform: "uppercase",
              borderRadius: "4px",
              textDecoration: "none",
              border: "none",
            }}
          >
            Message Us
            <ArrowRight style={{ width: "14px", height: "14px" }} />
          </a>

          {/* Game CTA */}
          <a
            href="#"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "8px",
              fontFamily: "'Press Start 2P', monospace",
              fontSize: "0.6rem",
              letterSpacing: "0.06em",
              color: "#5fc5f8",
              padding: "13px 20px",
              border: "1px solid rgba(95,197,248,0.4)",
              borderRadius: "4px",
              background: "transparent",
              textDecoration: "none",
            }}
          >
            <Gamepad2 style={{ width: "13px", height: "13px" }} />
            ▸ PLAY STAKEHOLDERS INVADERS
          </a>
        </div>

        {/* Metrics — data table feel */}
        <div
          style={{
            border: "1px solid rgba(95,197,248,0.15)",
            borderRadius: "6px",
            overflow: "hidden",
          }}
        >
          {/* Table header */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr 1fr",
              background: "rgba(95,197,248,0.05)",
              borderBottom: "1px solid rgba(95,197,248,0.15)",
            }}
          >
            {["RESULT", "SCOPE", "PROJECT"].map((h) => (
              <div
                key={h}
                style={{
                  padding: "10px 20px",
                  fontSize: "0.6rem",
                  letterSpacing: "0.14em",
                  color: "rgba(95,197,248,0.5)",
                  fontWeight: 700,
                  borderRight: "1px solid rgba(95,197,248,0.1)",
                }}
              >
                {h}
              </div>
            ))}
          </div>
          {/* Table rows */}
          {metrics.map((m, i) => (
            <div
              key={m.value}
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr 1fr",
                borderBottom:
                  i < metrics.length - 1 ? "1px solid rgba(95,197,248,0.08)" : "none",
                cursor: "pointer",
              }}
            >
              <div
                style={{
                  padding: "16px 20px",
                  borderRight: "1px solid rgba(95,197,248,0.08)",
                }}
              >
                <span
                  style={{
                    fontSize: "1.6rem",
                    fontWeight: 800,
                    color: "#ffffff",
                    letterSpacing: "-0.02em",
                  }}
                >
                  {m.value}
                </span>
              </div>
              <div
                style={{
                  padding: "16px 20px",
                  display: "flex",
                  alignItems: "center",
                  borderRight: "1px solid rgba(95,197,248,0.08)",
                  fontSize: "0.82rem",
                  color: "rgba(255,255,255,0.5)",
                  fontWeight: 500,
                }}
              >
                {m.label}
              </div>
              <div
                style={{
                  padding: "16px 20px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                }}
              >
                <span
                  style={{
                    fontSize: "0.62rem",
                    letterSpacing: "0.1em",
                    color: "#5fc5f8",
                    fontWeight: 700,
                  }}
                >
                  {m.tag}
                </span>
                <span style={{ fontSize: "0.72rem", color: "rgba(95,197,248,0.5)" }}>
                  View →
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
