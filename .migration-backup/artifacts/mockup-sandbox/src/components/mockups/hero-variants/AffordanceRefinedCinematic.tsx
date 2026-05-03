import './_group.css';
import { Award, Play, ArrowRight, Home as HomeIcon } from 'lucide-react';
import React from 'react';

export function AffordanceRefinedCinematic() {
  return (
    <div style={{ 
      background: '#08080A', 
      fontFamily: 'Inter, sans-serif', 
      minHeight: '100vh', 
      display: 'flex', 
      flexDirection: 'column',
      position: 'relative',
      overflow: 'hidden'
    }}>
      <style>{`
        @keyframes shimmer {
          0% { background-position: -200% center; }
          100% { background-position: 200% center; }
        }
        @keyframes float {
          0% { transform: translateY(0px); }
          50% { transform: translateY(-10px); }
          100% { transform: translateY(0px); }
        }
        @keyframes pulseGlow {
          0% { opacity: 0.4; }
          50% { opacity: 0.7; }
          100% { opacity: 0.4; }
        }
        .cta-shimmer {
          background: linear-gradient(135deg, #0081BC 0%, #6D5592 50%, #0081BC 100%);
          background-size: 200% auto;
          transition: all 0.3s ease;
        }
        .cta-shimmer:hover {
          background-position: right center;
          box-shadow: 0 8px 30px rgba(109,85,146,0.6);
          transform: translateY(-2px);
        }
        .glass-card {
          background: linear-gradient(145deg, rgba(255,255,255,0.08) 0%, rgba(255,255,255,0.02) 100%);
          backdrop-filter: blur(20px);
          -webkit-backdrop-filter: blur(20px);
          border: 1px solid rgba(255,255,255,0.1);
          box-shadow: 0 4px 30px rgba(0,0,0,0.1), inset 0 1px 0 rgba(255,255,255,0.1);
          transition: transform 0.3s ease, border-color 0.3s ease;
        }
        .glass-card:hover {
          transform: translateY(-4px);
          border-color: rgba(95, 197, 248, 0.4);
        }
        .glass-card.hero-card {
          background: linear-gradient(145deg, rgba(0, 129, 188, 0.15) 0%, rgba(109, 85, 146, 0.05) 100%);
          border: 1px solid rgba(95, 197, 248, 0.3);
          box-shadow: 0 8px 40px rgba(0, 129, 188, 0.15), inset 0 1px 0 rgba(255,255,255,0.2);
        }
        .msg-link {
          position: relative;
          color: rgba(255,255,255,0.7);
          text-decoration: none;
          transition: color 0.3s ease;
        }
        .msg-link::after {
          content: '';
          position: absolute;
          width: 100%;
          transform: scaleX(0);
          height: 1px;
          bottom: -4px;
          left: 0;
          background-color: #5fc5f8;
          transform-origin: bottom right;
          transition: transform 0.3s cubic-bezier(0.86, 0, 0.07, 1);
        }
        .msg-link:hover {
          color: #ffffff;
        }
        .msg-link:hover::after {
          transform: scaleX(1);
          transform-origin: bottom left;
        }
      `}</style>

      {/* Ambient background glows */}
      <div style={{
        position: 'absolute',
        top: '20%',
        right: '10%',
        width: '60vw',
        height: '60vw',
        background: 'radial-gradient(circle, rgba(109,85,146,0.15) 0%, rgba(8,8,10,0) 70%)',
        filter: 'blur(60px)',
        zIndex: 0,
        pointerEvents: 'none',
        animation: 'pulseGlow 8s infinite alternate'
      }} />
      <div style={{
        position: 'absolute',
        top: '40%',
        right: '-10%',
        width: '40vw',
        height: '40vw',
        background: 'radial-gradient(circle, rgba(0,129,188,0.1) 0%, rgba(8,8,10,0) 70%)',
        filter: 'blur(50px)',
        zIndex: 0,
        pointerEvents: 'none'
      }} />

      {/* Nav bar — matches main app exactly */}
      <nav style={{
        position: 'sticky', top: 0, zIndex: 50,
        background: 'linear-gradient(to right, rgba(8,8,10,0.85), rgba(8,8,10,0.95))',
        backdropFilter: 'blur(20px)',
        borderBottom: '1px solid rgba(255,255,255,0.05)',
        boxShadow: '0 4px 30px rgba(0,0,0,0.5)'
      }}>
        <div style={{ maxWidth: 1280, margin: '0 auto', padding: '0 24px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', height: 56 }}>
            {/* Logo */}
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, cursor: 'pointer' }}>
              <HomeIcon size={16} color="#F3E8B9" />
              <span style={{ color: '#ffffff', fontWeight: 700, fontSize: 18, letterSpacing: '-0.02em' }}>Alexis</span>
              <span style={{ color: '#a78bfa', fontWeight: 700, fontSize: 18, letterSpacing: '-0.02em' }}>Brochu</span>
            </div>

            {/* Nav links */}
            <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
              {['How I built this site', 'My Expertise', 'Speaking Engagements'].map((label) => (
                <button key={label} style={{
                  background: 'transparent', border: 'none', cursor: 'pointer',
                  color: 'rgba(255,255,255,0.7)', fontSize: 13, fontWeight: 500,
                  padding: '8px 16px', borderRadius: 8, transition: 'all 0.2s',
                  letterSpacing: '0.01em'
                }}
                onMouseOver={(e) => e.currentTarget.style.color = '#fff'}
                onMouseOut={(e) => e.currentTarget.style.color = 'rgba(255,255,255,0.7)'}
                >
                  {label}
                </button>
              ))}
              <div style={{
                display: 'inline-flex', alignItems: 'center',
                background: 'linear-gradient(135deg, rgba(109,85,146,0.8), rgba(0,129,188,0.8))',
                borderRadius: 99, padding: '8px 20px', marginLeft: 12,
                border: '1px solid rgba(255,255,255,0.2)', cursor: 'pointer',
                boxShadow: '0 2px 10px rgba(109,85,146,0.3)',
                transition: 'all 0.3s ease'
              }}
              onMouseOver={(e) => e.currentTarget.style.transform = 'translateY(-1px)'}
              onMouseOut={(e) => e.currentTarget.style.transform = 'none'}
              >
                <span style={{ fontSize: 13, fontWeight: 600, color: '#ffffff', letterSpacing: '0.02em' }}>Check out my work</span>
              </div>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero — two-column */}
      <div style={{ flex: 1, display: 'flex', alignItems: 'stretch', zIndex: 10 }}>
        {/* Left: Photo with cinematic blend */}
        <div style={{ width: '38%', position: 'relative', overflow: 'hidden', flexShrink: 0 }}>
          <img
            src="/__mockup/images/headshot.png"
            alt="Alexis Brochu"
            style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center 20%', filter: 'contrast(1.05) brightness(0.95)' }}
          />
          {/* Diagonal mask / Vignette effect */}
          <div style={{ 
            position: 'absolute', 
            inset: 0, 
            background: 'linear-gradient(105deg, rgba(8,8,10,0) 0%, rgba(8,8,10,0.2) 50%, rgba(8,8,10,1) 95%)',
            pointerEvents: 'none' 
          }} />
          <div style={{ 
            position: 'absolute', 
            inset: 0, 
            background: 'linear-gradient(to top, rgba(8,8,10,1) 0%, rgba(8,8,10,0) 25%)',
            pointerEvents: 'none' 
          }} />
          <div style={{ 
            position: 'absolute', 
            inset: 0, 
            background: 'linear-gradient(to right, rgba(8,8,10,0.5) 0%, rgba(8,8,10,0) 30%)',
            pointerEvents: 'none' 
          }} />
        </div>

        {/* Right: Content */}
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center', padding: '0 80px', gap: 32 }}>

          {/* Award (Subdued to let headline shine) */}
          <div>
            <div style={{
              display: 'inline-flex', alignItems: 'center', gap: 10,
              background: 'rgba(0,129,188,0.08)', border: '1px solid rgba(0,129,188,0.3)',
              borderRadius: 99, padding: '8px 20px',
              fontSize: 12, fontWeight: 600, color: '#5fc5f8', cursor: 'pointer',
              letterSpacing: '0.04em', textTransform: 'uppercase',
              backdropFilter: 'blur(10px)',
              boxShadow: '0 4px 20px rgba(0,0,0,0.2)',
              transition: 'all 0.3s'
            }}
            onMouseOver={(e) => {
              e.currentTarget.style.background = 'rgba(0,129,188,0.15)';
              e.currentTarget.style.borderColor = 'rgba(0,129,188,0.5)';
            }}
            onMouseOut={(e) => {
              e.currentTarget.style.background = 'rgba(0,129,188,0.08)';
              e.currentTarget.style.borderColor = 'rgba(0,129,188,0.3)';
            }}
            >
              <Award size={14} color="#5fc5f8" />
              2023 California GovTech Award Winner
            </div>
          </div>

          {/* Headline & Subhead Group */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 16, position: 'relative' }}>
            <h1 style={{
              fontFamily: 'Montserrat, sans-serif', fontWeight: 900,
              fontSize: 72, lineHeight: 1.05, margin: 0,
              color: '#F3E8B9', letterSpacing: '-0.02em',
              textShadow: '0 10px 30px rgba(0,0,0,0.5), 0 0 40px rgba(243,232,185,0.1)'
            }}>
              Hi, I'm Alexis
            </h1>
            
            <p style={{
              fontSize: 26, fontWeight: 300, color: 'rgba(255,255,255,0.9)',
              lineHeight: 1.4, margin: 0, maxWidth: 540,
              letterSpacing: '-0.01em',
              textShadow: '0 2px 10px rgba(0,0,0,0.5)'
            }}>
              I design products that get used, <span style={{ fontWeight: 500, color: '#fff' }}>not just shipped.</span>
            </p>
          </div>

          {/* Primary CTA */}
          <div style={{ marginTop: 8 }}>
            <button className="cta-shimmer" style={{
              display: 'inline-flex', alignItems: 'center', gap: 12,
              padding: '0 36px', height: 60, borderRadius: 12,
              border: '1px solid rgba(255,255,255,0.2)',
              color: '#ffffff', fontSize: 16, fontWeight: 700, cursor: 'pointer',
              boxShadow: '0 4px 20px rgba(0,0,0,0.3)', letterSpacing: '0.02em'
            }}>
              <Play size={18} fill="white" />
              How I Drive Product Adoption
              <ArrowRight size={18} style={{ opacity: 0.8 }} />
            </button>
          </div>

          {/* Metrics - Refined Hierarchy */}
          <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 1fr 1fr', gap: 16, marginTop: 16 }}>
            {/* Hero Card */}
            <div className="glass-card hero-card" style={{
              borderRadius: 16, padding: '24px', cursor: 'pointer',
              display: 'flex', flexDirection: 'column', justifyContent: 'center'
            }}>
              <div style={{ fontSize: 40, fontWeight: 900, color: '#F3E8B9', fontFamily: 'Montserrat, sans-serif', letterSpacing: '-0.02em', lineHeight: 1 }}>545.5%</div>
              <div style={{ fontSize: 13, color: 'rgba(255,255,255,0.8)', marginTop: 8, fontWeight: 500 }}>User Base Increase</div>
              <div style={{ fontSize: 12, color: '#5fc5f8', marginTop: 12, fontWeight: 600, display: 'flex', alignItems: 'center', gap: 4 }}>
                View case study <ArrowRight size={12} />
              </div>
            </div>

            {/* Standard Cards */}
            {[
              { value: '$2.1B', label: 'Disaster Relief Platform' },
              { value: '75%', label: 'Ticket Reduction' },
            ].map((m, i) => (
              <div key={i} className="glass-card" style={{
                borderRadius: 16, padding: '20px', cursor: 'pointer',
                display: 'flex', flexDirection: 'column', justifyContent: 'center'
              }}>
                <div style={{ fontSize: 32, fontWeight: 800, color: '#ffffff', fontFamily: 'Montserrat, sans-serif', letterSpacing: '-0.02em', lineHeight: 1 }}>{m.value}</div>
                <div style={{ fontSize: 12, color: 'rgba(255,255,255,0.6)', marginTop: 8 }}>{m.label}</div>
                <div style={{ fontSize: 11, color: 'rgba(95,197,248,0.8)', marginTop: 12, fontWeight: 600 }}>View case study →</div>
              </div>
            ))}
          </div>

          {/* Secondary CTA */}
          <div style={{ marginTop: 16, display: 'flex', alignItems: 'center' }}>
            <a href="mailto:alexis.brochu@gmail.com" className="msg-link" style={{
              display: 'inline-flex', alignItems: 'center', gap: 8,
              fontSize: 13, fontWeight: 700, letterSpacing: '0.1em',
              textTransform: 'uppercase', padding: '8px 0'
            }}>
              <div style={{ width: 6, height: 6, borderRadius: '50%', background: '#5fc5f8', marginRight: 4, boxShadow: '0 0 10px #5fc5f8' }} />
              MESSAGE ME
            </a>
          </div>

        </div>
      </div>
    </div>
  );
}
