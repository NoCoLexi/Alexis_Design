import './_group.css';
import { Award, Play, Mail } from 'lucide-react';

export function AccessibilityFirst() {
  return (
    <div className="min-h-screen flex items-stretch" style={{ background: '#08080A', fontFamily: 'Inter, sans-serif' }}>
      {/* Left: Photo */}
      <div style={{ width: '38%', position: 'relative', overflow: 'hidden', flexShrink: 0 }}>
        <img
          src="/__mockup/images/headshot.png"
          alt="Alexis Brochu — AI Product Manager"
          style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'top' }}
        />
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to right, transparent, rgba(8,8,10,0.5))', pointerEvents: 'none' }} />
      </div>

      {/* Right: Content — maximized contrast, generous spacing, clear readable labels */}
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center', padding: '48px 56px', gap: 20 }}>

        {/* Award — high contrast badge */}
        <div>
          <div style={{
            display: 'inline-flex', alignItems: 'center', gap: 8,
            background: 'rgba(255,255,255,0.12)', border: '1.5px solid rgba(255,255,255,0.3)',
            borderRadius: 99, padding: '8px 18px',
            fontSize: 13, fontWeight: 600, color: '#ffffff',
          }}>
            <Award size={14} color="#F3E8B9" />
            2023 California GovTech Award Winner
          </div>
        </div>

        {/* Headline — biggest possible, max contrast white-on-black */}
        <div>
          <h1 style={{
            fontFamily: 'Montserrat, sans-serif', fontWeight: 900,
            fontSize: 62, lineHeight: 1.08, margin: 0,
            color: '#FFFFFF', wordSpacing: '0.06em'
          }}>
            Hi, I'm Alexis
          </h1>
          {/* Role as part of headline, not buried below */}
          <p style={{
            fontSize: 22, fontWeight: 600, color: '#F3E8B9',
            margin: '8px 0 0', letterSpacing: '0.02em'
          }}>
            AI Product Manager
          </p>
        </div>

        {/* Subhead — larger body copy (18px min), near-white for readability */}
        <p style={{
          fontSize: 18, fontWeight: 400, color: 'rgba(255,255,255,0.88)',
          lineHeight: 1.6, margin: 0, maxWidth: 500
        }}>
          I design products that get used, not just shipped.
        </p>

        {/* Metrics — high contrast numbers, large descriptive labels (not tiny captions) */}
        <div style={{
          display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)',
          gap: 0,
          borderTop: '1px solid rgba(255,255,255,0.18)',
          borderBottom: '1px solid rgba(255,255,255,0.18)',
          padding: '18px 0'
        }}>
          {[
            { value: '545.5%', label: 'User Base Increase' },
            { value: '$2.1B', label: 'Disaster Relief Platform' },
            { value: '75%', label: 'Ticket Reduction' },
          ].map((m, i) => (
            <div key={i} style={{
              paddingLeft: i > 0 ? 24 : 0,
              borderLeft: i > 0 ? '1px solid rgba(255,255,255,0.12)' : 'none'
            }}>
              {/* Metric value: pure white, very large */}
              <div style={{ fontSize: 32, fontWeight: 900, color: '#FFFFFF', lineHeight: 1 }}>{m.value}</div>
              {/* Label: 13px minimum, 80% opacity — readable, not invisible */}
              <div style={{ fontSize: 13, color: 'rgba(255,255,255,0.75)', marginTop: 6, lineHeight: 1.3, fontWeight: 500 }}>{m.label}</div>
            </div>
          ))}
        </div>

        {/* Buttons — large tap targets (min 52px), high contrast, explicit labels */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 14, alignItems: 'flex-start' }}>
          {/* Primary: white bg for max contrast ratio */}
          <button style={{
            display: 'flex', alignItems: 'center', gap: 12,
            padding: '0 28px', height: 56, borderRadius: 12,
            background: '#FFFFFF', border: 'none',
            color: '#08080A', fontSize: 16, fontWeight: 800, cursor: 'pointer',
            boxShadow: '0 4px 16px rgba(255,255,255,0.25)'
          }}>
            <Play size={18} color="#08080A" fill="#08080A" />
            How I Drive Product Adoption
          </button>

          {/* Secondary: clearly labelled email, legible contrast */}
          <a href="mailto:alexis.brochu@gmail.com" style={{
            display: 'inline-flex', alignItems: 'center', gap: 10,
            padding: '0 28px', height: 56, borderRadius: 12,
            background: 'rgba(255,255,255,0.1)',
            border: '2px solid rgba(255,255,255,0.7)',
            color: '#FFFFFF', fontSize: 16, fontWeight: 700,
            textDecoration: 'none'
          }}>
            <Mail size={18} />
            Message Me — alexis.brochu@gmail.com
          </a>
        </div>

      </div>
    </div>
  );
}
