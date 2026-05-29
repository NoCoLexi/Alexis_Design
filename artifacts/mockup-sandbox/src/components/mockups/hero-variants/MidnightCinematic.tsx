import { Gamepad2, Mail, Linkedin, Calendar, ArrowUpRight } from "lucide-react";
import { useMemo } from "react";

/**
 * C2 — Midnight Cinematic  (full page build-out)
 *
 * Hero → Work → Expertise → Contact
 * Consistent language throughout:
 *   - Pure black / near-black backgrounds
 *   - Editorial typographic rows (no card chrome)
 *   - Thin 1px rules as grammar
 *   - Cyan #5fc5f8 as the only accent
 *   - Cream #F3E8B9 for warm highlights
 *   - All copy from the real portfolio
 */

const TICKER_ITEMS = [
  "Built with React + TypeScript", "◆",
  "Designed in Replit with Claude", "◆",
  "Tailwind + shadcn/ui", "◆",
  "Vite · pnpm · Express", "◆",
  "Every pixel written with AI pair-programming", "◆",
  "Open-source stack, closed-loop workflow", "◆",
  "Built with React + TypeScript", "◆",
  "Designed in Replit with Claude", "◆",
  "Tailwind + shadcn/ui", "◆",
  "Vite · pnpm · Express", "◆",
  "Every pixel written with AI pair-programming", "◆",
  "Open-source stack, closed-loop workflow", "◆",
];

const PROJECTS = [
  {
    num: "01",
    id: "caloes",
    title: "Cal OES Engage Community Portal",
    desc: "Modernized legacy emergency-services CRM, connecting residents to state grant funding. Grew the user base from zero to 30 k+ subrecipients.",
    stat: "545.5%",
    statLabel: "User Base Increase",
    tags: ["Product Management", "Gov Tech", "Salesforce CRM"],
    color: "#5fc5f8",
  },
  {
    num: "02",
    id: "pa-portal",
    title: "Public Assistance Closeouts App",
    desc: "100+ hours of research and stakeholder alignment unblocked a stalled $2.1B federal grant application. $243M in projects closed out to date.",
    stat: "$2.1B",
    statLabel: "Disaster Relief Platform",
    tags: ["UX Research", "Stakeholder Alignment", "Process Design"],
    color: "#F3E8B9",
  },
  {
    num: "03",
    id: "ocm",
    title: "Office of Change Management",
    desc: "State-wide initiative unifying 23 legacy applications into a single cohesive digital experience serving 39 million Californians.",
    stat: "86.3%",
    statLabel: "User Adoption",
    tags: ["Change Management", "Product Strategy", "Gov Innovation"],
    color: "#5fc5f8",
  },
  {
    num: "04",
    id: "stakeholder-invaders",
    title: "Stakeholder Invaders",
    desc: "A change-management arcade game built in one evening — convert skeptical stakeholders into advocates using five real OCM tactics.",
    stat: "1 Evening",
    statLabel: "Solo Build",
    tags: ["Game Design", "AI-Built", "Replit"],
    color: "#F3E8B9",
  },
  {
    num: "05",
    id: "handshakr",
    title: "HandShakr",
    desc: "AI networking companion that captures who you meet, syncs contacts to Notion, and auto-blocks follow-up time — so no great handshake goes cold.",
    stat: "10 Hours",
    statLabel: "Solo Build — Replit Agent 4",
    tags: ["AI Agent", "Networking", "Build-a-thon"],
    color: "#5fc5f8",
  },
  {
    num: "06",
    id: "eag",
    title: "Enterprise Architecture Group",
    desc: "Platform consolidation and Centers of Excellence for Cal OES — unified development standards across 23 org-wide applications.",
    stat: "39M",
    statLabel: "Californians Served",
    tags: ["Platform Engineering", "Tech Strategy", "Governance"],
    color: "#F3E8B9",
  },
];

const DISCIPLINES = [
  { label: "Product Management", detail: "Discovery · Roadmapping · OKRs · Scrum · Stakeholder Alignment" },
  { label: "UX Design", detail: "Research · Wireframes · Prototyping · Usability Testing · Design Systems" },
  { label: "Change Management", detail: "PROSCI · ADKAR · OCM Strategy · Training · Comms Plans" },
  { label: "Brand Development", detail: "Identity · Messaging · Packaging · Marketing Collateral" },
];

// ─── helpers ──────────────────────────────────────────────────────────────────

const Rule = ({ margin = "0 60px" }: { margin?: string }) => (
  <div style={{ height: "1px", background: "rgba(255,255,255,0.06)", margin, flexShrink: 0 }} />
);

const SectionLabel = ({ n, title }: { n: string; title: string }) => (
  <div style={{ display: "flex", alignItems: "baseline", gap: "14px", marginBottom: "48px" }}>
    <span style={{ fontSize: "0.55rem", color: "rgba(255,255,255,0.2)", letterSpacing: "0.18em", textTransform: "uppercase" }}>{n}</span>
    <div style={{ flex: 1, height: "1px", background: "rgba(255,255,255,0.06)" }} />
    <span style={{ fontSize: "0.55rem", color: "rgba(255,255,255,0.2)", letterSpacing: "0.28em", textTransform: "uppercase" }}>{title}</span>
    <div style={{ flex: 1, height: "1px", background: "rgba(255,255,255,0.06)" }} />
  </div>
);

// ─── main component ───────────────────────────────────────────────────────────

export function MidnightCinematic() {
  const companyName = useMemo(() => {
    const params = new URLSearchParams(window.location.search);
    return params.get("company") || "";
  }, []);

  const preTitle = companyName ? `Hi ${companyName}, we're` : "Hi, we're";

  return (
    <div style={{
      background: "#000",
      fontFamily: "'Montserrat', sans-serif",
      color: "#fff",
      overflowX: "hidden",
    }}>
      <style>{`
        @keyframes hero-ticker {
          0%   { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .hero-ticker-track {
          display: flex;
          width: max-content;
          animation: hero-ticker 28s linear infinite;
        }
        .hero-ticker-track:hover { animation-play-state: paused; }

        .mc-project-row {
          display: grid;
          grid-template-columns: 56px 1fr auto;
          gap: 0 32px;
          padding: 32px 60px;
          align-items: start;
          border-bottom: 1px solid rgba(255,255,255,0.05);
          cursor: default;
          transition: background 0.2s;
        }
        .mc-project-row:hover { background: rgba(255,255,255,0.02); }
        .mc-project-row:first-child { border-top: 1px solid rgba(255,255,255,0.05); }

        .mc-discipline-row {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 0;
          padding: 24px 0;
          border-bottom: 1px solid rgba(255,255,255,0.05);
        }
        .mc-discipline-row:first-child { border-top: 1px solid rgba(255,255,255,0.05); }

        .mc-contact-link {
          display: flex;
          align-items: center;
          gap: 14px;
          padding: 28px 0;
          border-bottom: 1px solid rgba(255,255,255,0.05);
          text-decoration: none;
          color: inherit;
          transition: opacity 0.2s;
        }
        .mc-contact-link:hover { opacity: 0.7; }
        .mc-contact-link:first-child { border-top: 1px solid rgba(255,255,255,0.05); }
      `}</style>

      {/* ════════════════════════════════════════════
          HERO
      ════════════════════════════════════════════ */}
      <section id="home" style={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        overflow: "hidden",
        position: "relative",
      }}>
        {/* Vignette */}
        <div style={{
          position: "absolute", inset: 0, pointerEvents: "none",
          background: "radial-gradient(ellipse 120% 100% at 50% 100%, rgba(5,6,8,0.6) 0%, transparent 60%)",
        }} />

        {/* Nav */}
        <nav style={{
          display: "flex", alignItems: "center", justifyContent: "space-between",
          padding: "30px 60px", position: "relative", zIndex: 10, flexShrink: 0,
        }}>
          <span style={{
            fontWeight: 300, fontSize: "0.72rem", letterSpacing: "0.28em",
            color: "rgba(255,255,255,0.6)", textTransform: "uppercase",
          }}>UPSTART-LABS</span>
          <div style={{ display: "flex", gap: "36px" }}>
            {["Work", "Expertise", "Contact"].map(item => (
              <a key={item} href={`#${item.toLowerCase()}`} style={{
                fontSize: "0.62rem", letterSpacing: "0.2em", textTransform: "uppercase",
                color: "rgba(255,255,255,0.4)", textDecoration: "none", cursor: "pointer",
              }}>{item}</a>
            ))}
          </div>
        </nav>

        {/* Ticker tape */}
        <div style={{
          position: "relative", zIndex: 10, flexShrink: 0, overflow: "hidden",
          borderTop: "1px solid rgba(95,197,248,0.08)",
          borderBottom: "1px solid rgba(95,197,248,0.08)",
          background: "rgba(95,197,248,0.03)",
          padding: "10px 0", margin: "18px 0",
          maskImage: "linear-gradient(90deg, transparent 0%, black 6%, black 94%, transparent 100%)",
          WebkitMaskImage: "linear-gradient(90deg, transparent 0%, black 6%, black 94%, transparent 100%)",
        }}>
          <div className="hero-ticker-track">
            {TICKER_ITEMS.map((item, i) => (
              <span key={i} style={{
                display: "inline-block", padding: "0 28px",
                fontSize: item === "◆" ? "0.45rem" : "0.58rem",
                letterSpacing: item === "◆" ? "0" : "0.18em",
                textTransform: "uppercase",
                color: item === "◆" ? "rgba(95,197,248,0.55)" : "rgba(255,255,255,0.55)",
                whiteSpace: "nowrap", lineHeight: 1,
              }}>{item}</span>
            ))}
          </div>
        </div>

        {/* Title card */}
        <div style={{
          flex: 1, display: "flex", flexDirection: "column", justifyContent: "flex-end",
          padding: "0 58px 20px", position: "relative", zIndex: 10,
        }}>
          <div style={{
            fontSize: "18px", fontWeight: 200, color: "rgba(255,255,255,0.55)",
            letterSpacing: "0.04em", marginBottom: "8px",
          }}>{preTitle}</div>

          <h1 style={{
            fontWeight: 800, fontSize: "clamp(64px, 11vw, 120px)",
            lineHeight: 0.95, letterSpacing: "-0.05em",
            margin: "0 0 28px -4px", color: "#5fc5f8",
            textShadow: [
              "0 0 15px rgba(95,197,248,0.9)",
              "0 0 40px rgba(95,197,248,0.5)",
              "0 0 90px rgba(95,197,248,0.25)",
              "0 0 180px rgba(95,197,248,0.1)",
            ].join(", "),
          }}>UPSTART-Labs</h1>

          <p style={{
            fontSize: "0.82rem", fontWeight: 300, letterSpacing: "0.02em",
            color: "rgba(255,255,255,0.6)", margin: "0 0 36px",
            lineHeight: 1.6, maxWidth: "440px",
          }}>We help product teams ship things people actually adopt.</p>

          <div style={{ display: "flex", alignItems: "center", gap: "36px", marginBottom: "40px" }}>
            <a href="mailto:alexis@upstart-labs.com" style={{
              fontSize: "0.65rem", letterSpacing: "0.22em", textTransform: "uppercase",
              color: "rgba(255,255,255,0.6)", textDecoration: "none", fontWeight: 600,
              borderBottom: "1px solid rgba(255,255,255,0.2)", paddingBottom: "3px",
            }}>Message us →</a>
            <a href="#" style={{
              display: "inline-flex", alignItems: "center", gap: "6px",
              fontFamily: "'Press Start 2P', monospace", fontSize: "0.6rem",
              letterSpacing: "0.04em", color: "rgba(95,197,248,0.85)", textDecoration: "none",
              textShadow: "0 0 16px rgba(95,197,248,0.6)",
            }}>
              <Gamepad2 style={{ width: "14px", height: "14px" }} />
              ▸ Play Stakeholders Invaders
            </a>
          </div>
        </div>

        <Rule />

        {/* Metrics footnote bar */}
        <div style={{
          display: "flex", alignItems: "center",
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
              <span style={{ fontSize: "1.05rem", fontWeight: 700, color: "rgba(255,255,255,0.7)", letterSpacing: "-0.02em", lineHeight: 1 }}>{m.value}</span>
              <span style={{ fontSize: "0.58rem", color: "rgba(255,255,255,0.45)", letterSpacing: "0.1em", textTransform: "uppercase" }}>{m.label}</span>
            </div>
          ))}
          <div style={{ marginLeft: "auto", fontSize: "0.55rem", color: "rgba(255,255,255,0.3)", letterSpacing: "0.1em", textTransform: "uppercase" }}>
            2023 GovTech Award Winner
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════
          WORK
      ════════════════════════════════════════════ */}
      <section id="work" style={{ background: "#060608", padding: "80px 0 0" }}>
        <div style={{ padding: "0 60px" }}>
          <SectionLabel n="01" title="Work" />
        </div>

        {/* Project rows */}
        <div>
          {PROJECTS.map((p) => (
            <div key={p.id} className="mc-project-row">
              {/* Number */}
              <div style={{
                fontSize: "3rem", fontWeight: 800, lineHeight: 1,
                color: "rgba(255,255,255,0.07)", letterSpacing: "-0.04em",
                paddingTop: "4px",
              }}>{p.num}</div>

              {/* Body */}
              <div>
                <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "10px" }}>
                  <h3 style={{
                    fontSize: "1.05rem", fontWeight: 600, color: "rgba(255,255,255,0.88)",
                    letterSpacing: "-0.01em", margin: 0,
                  }}>{p.title}</h3>
                  <ArrowUpRight style={{ width: "14px", height: "14px", color: "rgba(255,255,255,0.2)", flexShrink: 0 }} />
                </div>
                <p style={{
                  fontSize: "0.72rem", color: "rgba(255,255,255,0.45)", lineHeight: 1.65,
                  maxWidth: "520px", margin: "0 0 14px",
                }}>{p.desc}</p>
                <div style={{ display: "flex", gap: "8px", flexWrap: "wrap" }}>
                  {p.tags.map(t => (
                    <span key={t} style={{
                      fontSize: "0.5rem", letterSpacing: "0.14em", textTransform: "uppercase",
                      color: "rgba(255,255,255,0.3)",
                      border: "1px solid rgba(255,255,255,0.1)",
                      padding: "3px 8px", borderRadius: "2px",
                    }}>{t}</span>
                  ))}
                </div>
              </div>

              {/* Stat */}
              <div style={{ textAlign: "right", paddingTop: "4px", minWidth: "100px" }}>
                <div style={{
                  fontSize: "1.6rem", fontWeight: 800, lineHeight: 1,
                  color: p.color, letterSpacing: "-0.04em",
                  textShadow: p.color === "#5fc5f8"
                    ? "0 0 20px rgba(95,197,248,0.5)"
                    : "0 0 20px rgba(243,232,185,0.4)",
                }}>{p.stat}</div>
                <div style={{
                  fontSize: "0.5rem", color: "rgba(255,255,255,0.3)", letterSpacing: "0.1em",
                  textTransform: "uppercase", marginTop: "6px", lineHeight: 1.4,
                }}>{p.statLabel}</div>
              </div>
            </div>
          ))}
        </div>

        <div style={{ padding: "48px 60px 80px" }}>
          <a href="mailto:alexis@upstart-labs.com" style={{
            display: "inline-flex", alignItems: "center", gap: "10px",
            fontSize: "0.62rem", letterSpacing: "0.2em", textTransform: "uppercase",
            color: "rgba(255,255,255,0.4)", textDecoration: "none", fontWeight: 600,
            borderBottom: "1px solid rgba(255,255,255,0.12)", paddingBottom: "3px",
          }}>
            Start a project →
          </a>
        </div>
      </section>

      {/* ════════════════════════════════════════════
          EXPERTISE / ABOUT
      ════════════════════════════════════════════ */}
      <section id="expertise" style={{ background: "#040406", padding: "80px 0" }}>
        <div style={{ padding: "0 60px" }}>
          <SectionLabel n="02" title="Expertise" />

          {/* Pull quote */}
          <div style={{ maxWidth: "720px", marginBottom: "72px" }}>
            <p style={{
              fontSize: "clamp(1.1rem, 2.2vw, 1.55rem)", fontWeight: 300, lineHeight: 1.55,
              color: "rgba(255,255,255,0.72)", letterSpacing: "-0.01em",
            }}>
              Most products fail post-launch because they{" "}
              <em style={{ fontStyle: "normal", color: "#fff", fontWeight: 600 }}>
                weren't designed for humans to use them.
              </em>{" "}
              The code is good. The design looks clean. But users don't know what to do, teams can't agree on what matters, and change gets resisted.{" "}
              <span style={{ color: "#5fc5f8" }}>We fix that.</span>
            </p>
          </div>

          {/* Discipline rows */}
          <div style={{ marginBottom: "72px" }}>
            {DISCIPLINES.map((d, i) => (
              <div key={d.label} className="mc-discipline-row">
                <div style={{
                  fontSize: "0.75rem", fontWeight: 600, color: "rgba(255,255,255,0.75)",
                  letterSpacing: "0.04em", paddingRight: "40px", lineHeight: 1.2,
                  display: "flex", alignItems: "center",
                }}>
                  <span style={{
                    fontSize: "0.48rem", color: "rgba(255,255,255,0.2)",
                    letterSpacing: "0.12em", marginRight: "16px", flexShrink: 0,
                  }}>0{i + 1}</span>
                  {d.label}
                </div>
                <div style={{
                  fontSize: "0.65rem", color: "rgba(255,255,255,0.35)",
                  letterSpacing: "0.04em", lineHeight: 1.7,
                  display: "flex", alignItems: "center",
                }}>{d.detail}</div>
              </div>
            ))}
          </div>

          {/* Key credentials strip */}
          <div style={{
            display: "grid", gridTemplateColumns: "repeat(4, 1fr)",
            gap: "1px", background: "rgba(255,255,255,0.05)",
            marginBottom: "0",
          }}>
            {[
              { val: "20+", lbl: "Years Experience" },
              { val: "PMP", lbl: "Project Management" },
              { val: "CMP", lbl: "PROSCI Change Mgmt" },
              { val: "BFA", lbl: "Visual Communications" },
            ].map(c => (
              <div key={c.val} style={{
                background: "#040406", padding: "32px 28px",
              }}>
                <div style={{
                  fontSize: "1.6rem", fontWeight: 800, color: "rgba(255,255,255,0.65)",
                  letterSpacing: "-0.04em", lineHeight: 1, marginBottom: "8px",
                }}>{c.val}</div>
                <div style={{
                  fontSize: "0.52rem", color: "rgba(255,255,255,0.3)",
                  letterSpacing: "0.12em", textTransform: "uppercase",
                }}>{c.lbl}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════
          CONTACT
      ════════════════════════════════════════════ */}
      <section id="contact" style={{ background: "#000", padding: "80px 0 0" }}>
        <div style={{ padding: "0 60px" }}>
          <SectionLabel n="03" title="Contact" />

          {/* CTA headline */}
          <div style={{ marginBottom: "56px" }}>
            <h2 style={{
              fontSize: "clamp(2rem, 5vw, 4rem)", fontWeight: 800,
              letterSpacing: "-0.05em", lineHeight: 0.95,
              color: "rgba(255,255,255,0.85)", margin: "0 0 16px -3px",
            }}>Let's build something<br />
              <span style={{
                color: "#5fc5f8",
                textShadow: "0 0 40px rgba(95,197,248,0.4)",
              }}>people actually use.</span>
            </h2>
            <p style={{
              fontSize: "0.72rem", color: "rgba(255,255,255,0.4)",
              letterSpacing: "0.04em", lineHeight: 1.7, maxWidth: "420px",
            }}>
              Our rare blend of product strategy, UX design, and change management delivers products users embrace — not just tolerate.
            </p>
          </div>

          {/* Contact rows */}
          <div style={{ maxWidth: "520px" }}>
            <a href="mailto:alexis@upstart-labs.com" className="mc-contact-link">
              <div style={{
                width: "36px", height: "36px", borderRadius: "4px",
                background: "rgba(95,197,248,0.12)", border: "1px solid rgba(95,197,248,0.2)",
                display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0,
              }}>
                <Mail style={{ width: "16px", height: "16px", color: "#5fc5f8" }} />
              </div>
              <div>
                <div style={{ fontSize: "0.6rem", letterSpacing: "0.14em", textTransform: "uppercase", color: "rgba(255,255,255,0.3)", marginBottom: "4px" }}>Email</div>
                <div style={{ fontSize: "0.85rem", color: "rgba(255,255,255,0.75)", fontWeight: 500 }}>alexis@upstart-labs.com</div>
              </div>
              <ArrowUpRight style={{ width: "14px", height: "14px", color: "rgba(255,255,255,0.2)", marginLeft: "auto" }} />
            </a>

            <a href="https://linkedin.com/in/alexisbrochu" target="_blank" rel="noreferrer" className="mc-contact-link">
              <div style={{
                width: "36px", height: "36px", borderRadius: "4px",
                background: "rgba(0,119,181,0.15)", border: "1px solid rgba(0,119,181,0.25)",
                display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0,
              }}>
                <Linkedin style={{ width: "16px", height: "16px", color: "#0a84ff" }} />
              </div>
              <div>
                <div style={{ fontSize: "0.6rem", letterSpacing: "0.14em", textTransform: "uppercase", color: "rgba(255,255,255,0.3)", marginBottom: "4px" }}>LinkedIn</div>
                <div style={{ fontSize: "0.85rem", color: "rgba(255,255,255,0.75)", fontWeight: 500 }}>linkedin.com/in/alexisbrochu</div>
              </div>
              <ArrowUpRight style={{ width: "14px", height: "14px", color: "rgba(255,255,255,0.2)", marginLeft: "auto" }} />
            </a>

            <a href="https://calendly.com/alexis-brochu/15min" target="_blank" rel="noreferrer" className="mc-contact-link">
              <div style={{
                width: "36px", height: "36px", borderRadius: "4px",
                background: "rgba(243,232,185,0.08)", border: "1px solid rgba(243,232,185,0.15)",
                display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0,
              }}>
                <Calendar style={{ width: "16px", height: "16px", color: "#F3E8B9" }} />
              </div>
              <div>
                <div style={{ fontSize: "0.6rem", letterSpacing: "0.14em", textTransform: "uppercase", color: "rgba(255,255,255,0.3)", marginBottom: "4px" }}>Schedule a Meeting</div>
                <div style={{ fontSize: "0.85rem", color: "rgba(255,255,255,0.75)", fontWeight: 500 }}>calendly.com/alexis-brochu/15min</div>
              </div>
              <ArrowUpRight style={{ width: "14px", height: "14px", color: "rgba(255,255,255,0.2)", marginLeft: "auto" }} />
            </a>
          </div>
        </div>

        {/* Footer */}
        <div style={{ marginTop: "80px" }}>
          <Rule margin="0 60px" />
          <div style={{
            display: "flex", alignItems: "center", justifyContent: "space-between",
            padding: "24px 60px",
          }}>
            <span style={{
              fontSize: "0.6rem", letterSpacing: "0.24em", textTransform: "uppercase",
              color: "rgba(255,255,255,0.2)", fontWeight: 300,
            }}>UPSTART-LABS</span>
            <a href="/stakeholder-invaders/" style={{
              display: "inline-flex", alignItems: "center", gap: "6px",
              fontFamily: "'Press Start 2P', monospace", fontSize: "0.5rem",
              color: "rgba(95,197,248,0.5)", textDecoration: "none",
            }}>
              <Gamepad2 style={{ width: "12px", height: "12px" }} />
              INSERT COIN
            </a>
            <span style={{
              fontSize: "0.52rem", color: "rgba(255,255,255,0.15)", letterSpacing: "0.1em",
            }}>© {new Date().getFullYear()} Upstart-Labs</span>
          </div>
        </div>
      </section>
    </div>
  );
}
