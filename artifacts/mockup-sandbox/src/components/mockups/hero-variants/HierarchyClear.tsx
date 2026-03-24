import './_group.css';
import { Award, Play, Mail } from 'lucide-react';

export function HierarchyClear() {
  return (
    <div className="min-h-screen flex items-stretch" style={{ background: '#08080A', fontFamily: 'Inter, sans-serif' }}>
      {/* Left: Photo — 38% width, fills height */}
      <div style={{ width: '38%', position: 'relative', overflow: 'hidden', flexShrink: 0 }}>
        <img
          src="/__mockup/images/headshot.png"
          alt="Alexis Brochu"
          style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'top' }}
        />
        <div style={{ position: 'absolute', inset: '0', background: 'linear-gradient(to right, transparent, rgba(8,8,10,0.5))', pointerEvents: 'none' }} />
      </div>

      {/* Right: Content — clear typographic scale, strict level hierarchy */}
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center', padding: '48px 56px', gap: 0 }}>

        {/* Level 0: Context badge — smallest, least prominent */}
        <div style={{ marginBottom: 16 }}>
          <span style={{
            display: 'inline-flex', alignItems: 'center', gap: 8,
            background: 'rgba(255,255,255,0.08)', border: '1px solid rgba(255,255,255,0.12)',
            borderRadius: 99, padding: '6px 16px',
            fontSize: 12, fontWeight: 500, color: '#cccccc',
            letterSpacing: '0.04em', textTransform: 'uppercase'
          }}>
            <Award size={12} color="#0081BC" />
            2023 California GovTech Award Winner
          </span>
        </div>

        {/* Level 1: Primary identity — largest, most prominent */}
        <h1 style={{
          fontFamily: 'Montserrat, sans-serif', fontWeight: 900,
          fontSize: 64, lineHeight: 1.05, margin: 0,
          color: '#F3E8B9', wordSpacing: '0.08em', marginBottom: 4
        }}>
          Hi, I'm Alexis
        </h1>

        {/* Level 2: Role — secondary label, muted */}
        <p style={{
          fontSize: 16, fontWeight: 600, letterSpacing: '0.12em',
          textTransform: 'uppercase', color: '#0081BC',
          margin: 0, marginBottom: 16
        }}>
          AI Product Manager
        </p>

        {/* Level 3: Value proposition — the "why hire me" sentence */}
        <p style={{
          fontSize: 20, fontWeight: 400, color: 'rgba(255,255,255,0.75)',
          lineHeight: 1.5, margin: 0, marginBottom: 32,
          maxWidth: 480
        }}>
          I design products that get used, not just shipped.
        </p>

        {/* Level 4: Proof — metrics in a clear row, each self-contained */}
        <div style={{
          display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)',
          gap: 0, borderTop: '1px solid rgba(255,255,255,0.1)',
          borderBottom: '1px solid rgba(255,255,255,0.1)',
          padding: '20px 0', marginBottom: 32
        }}>
          {[
            { value: '545.5%', label: 'User Base Increase' },
            { value: '$2.1B', label: 'Disaster Relief Platform' },
            { value: '75%', label: 'Support Ticket Reduction' },
          ].map((m, i) => (
            <div key={i} style={{ paddingLeft: i > 0 ? 24 : 0, borderLeft: i > 0 ? '1px solid rgba(255,255,255,0.08)' : 'none' }}>
              <div style={{ fontSize: 30, fontWeight: 800, color: '#F3E8B9', lineHeight: 1 }}>{m.value}</div>
              <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.45)', marginTop: 6, lineHeight: 1.3 }}>{m.label}</div>
            </div>
          ))}
        </div>

        {/* Level 5: Actions — secondary to all above, clearly subordinate */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12, alignItems: 'flex-start' }}>
          <button style={{
            display: 'flex', alignItems: 'center', gap: 10,
            padding: '0 24px', height: 52, borderRadius: 12,
            background: 'transparent', border: '2px solid rgba(255,255,255,0.6)',
            color: '#ffffff', fontSize: 15, fontWeight: 700, cursor: 'pointer',
            boxShadow: '0 4px 12px rgba(255,255,255,0.15)'
          }}>
            <Play size={16} />
            How I Drive Product Adoption
          </button>

          <a href="mailto:alexis.brochu@gmail.com" style={{
            display: 'inline-flex', alignItems: 'center', gap: 10,
            padding: '0 24px', height: 52, borderRadius: 12,
            background: 'linear-gradient(135deg, rgba(109,85,146,0.7), rgba(0,129,188,0.7))',
            border: '2px solid rgba(255,255,255,0.9)',
            color: '#F3E8B9', fontSize: 15, fontWeight: 700,
            textDecoration: 'none',
            boxShadow: '0 4px 16px rgba(109,85,146,0.4)'
          }}>
            <Mail size={16} />
            Message Me
          </a>
        </div>
      </div>
    </div>
  );
}
