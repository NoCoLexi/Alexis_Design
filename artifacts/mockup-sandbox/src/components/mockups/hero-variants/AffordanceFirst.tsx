import './_group.css';
import { Award, Play, ArrowRight } from 'lucide-react';

export function AffordanceFirst() {
  return (
    <div className="min-h-screen flex items-stretch" style={{ background: '#08080A', fontFamily: 'Inter, sans-serif' }}>
      {/* Left: Photo */}
      <div style={{ width: '38%', position: 'relative', overflow: 'hidden', flexShrink: 0 }}>
        <img
          src="/__mockup/images/headshot.png"
          alt="Alexis Brochu"
          style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'top' }}
        />
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to right, transparent, rgba(8,8,10,0.55))', pointerEvents: 'none' }} />
      </div>

      {/* Right: Content — every interactive element has unmistakable affordance */}
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center', padding: '48px 56px', gap: 24 }}>

        {/* Award — styled as a pressable chip with clear border + icon combo */}
        <div>
          <div style={{
            display: 'inline-flex', alignItems: 'center', gap: 8,
            background: 'rgba(0,129,188,0.12)', border: '1.5px solid rgba(0,129,188,0.5)',
            borderRadius: 99, padding: '8px 18px',
            fontSize: 12.5, fontWeight: 600, color: '#5fc5f8',
            cursor: 'pointer'
          }}>
            <Award size={14} color="#5fc5f8" />
            2023 California GovTech Award Winner
            <ArrowRight size={12} style={{ opacity: 0.6 }} />
          </div>
        </div>

        {/* Headline */}
        <h1 style={{
          fontFamily: 'Montserrat, sans-serif', fontWeight: 900,
          fontSize: 60, lineHeight: 1.05, margin: 0,
          color: '#F3E8B9', wordSpacing: '0.08em'
        }}>
          Hi, I'm Alexis
        </h1>

        {/* Subhead */}
        <p style={{
          fontSize: 20, fontWeight: 400, color: 'rgba(255,255,255,0.72)',
          lineHeight: 1.5, margin: 0, maxWidth: 480
        }}>
          I design products that get used, not just shipped.
        </p>

        {/* PRIMARY CTA — unmistakably the most important button.
            Full-color fill, icon + label + arrow all signal "click me" */}
        <div style={{ display: 'flex', gap: 12, alignItems: 'stretch', flexWrap: 'wrap' }}>
          <button style={{
            display: 'flex', alignItems: 'center', gap: 10,
            padding: '0 28px', height: 56, borderRadius: 14,
            background: 'linear-gradient(135deg, #6D5592, #0081BC)',
            border: '2px solid rgba(255,255,255,0.85)',
            color: '#ffffff', fontSize: 16, fontWeight: 800, cursor: 'pointer',
            boxShadow: '0 6px 20px rgba(109,85,146,0.5)',
            letterSpacing: '0.01em'
          }}>
            <Play size={18} fill="white" />
            How I Drive Product Adoption
            <ArrowRight size={16} />
          </button>
        </div>

        {/* Metrics — each card clearly clickable: has border, hover-style ring, and "View case study" label */}
        <div style={{
          display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 12,
          paddingTop: 8
        }}>
          {[
            { value: '545.5%', label: 'User Base Increase', sub: 'View case study →' },
            { value: '$2.1B', label: 'Disaster Relief Platform', sub: 'View case study →' },
            { value: '75%', label: 'Ticket Reduction', sub: 'View case study →' },
          ].map((m, i) => (
            <div key={i} style={{
              background: 'rgba(255,255,255,0.05)',
              border: '1.5px solid rgba(255,255,255,0.12)',
              borderRadius: 12, padding: '16px 18px',
              cursor: 'pointer',
              transition: 'border-color 0.2s'
            }}>
              <div style={{ fontSize: 28, fontWeight: 800, color: '#F3E8B9' }}>{m.value}</div>
              <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.5)', marginTop: 4 }}>{m.label}</div>
              <div style={{ fontSize: 11, color: '#5fc5f8', marginTop: 8, fontWeight: 600 }}>{m.sub}</div>
            </div>
          ))}
        </div>

        {/* SECONDARY CTA — visually distinct from primary (no fill), but still clearly a button */}
        <div>
          <a href="mailto:alexis.brochu@gmail.com" style={{
            display: 'inline-flex', alignItems: 'center', gap: 10,
            padding: '0 24px', height: 50, borderRadius: 12,
            background: 'transparent',
            border: '2px solid rgba(255,255,255,0.35)',
            color: 'rgba(255,255,255,0.85)', fontSize: 15, fontWeight: 700,
            textDecoration: 'none'
          }}>
            MESSAGE ME
            <span style={{ fontSize: 20, lineHeight: 1 }}>→</span>
          </a>
        </div>

      </div>
    </div>
  );
}
