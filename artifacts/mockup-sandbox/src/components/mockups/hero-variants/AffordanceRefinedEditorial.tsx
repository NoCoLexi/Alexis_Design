import './_group.css';
import { Award, Play, ArrowRight, Home as HomeIcon } from 'lucide-react';

export function AffordanceRefinedEditorial() {
  return (
    <div style={{ background: '#08080A', fontFamily: 'Inter, sans-serif', minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      
      {/* Nav bar */}
      <nav style={{
        position: 'sticky', top: 0, zIndex: 50,
        background: '#08080A',
        borderBottom: '1px solid rgba(255,255,255,0.08)',
      }}>
        <div style={{ maxWidth: 1280, margin: '0 auto', padding: '0 32px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', height: 60 }}>
            
            {/* Logo */}
            <div style={{ display: 'flex', alignItems: 'center', gap: 12, cursor: 'pointer' }}>
              <HomeIcon size={16} color="#F3E8B9" />
              <div style={{ display: 'flex', alignItems: 'baseline', gap: 6 }}>
                <span style={{ color: '#ffffff', fontWeight: 600, fontSize: 16, letterSpacing: '0.05em', textTransform: 'uppercase' }}>ALEXIS</span>
                <span style={{ color: 'rgba(255,255,255,0.5)', fontWeight: 400, fontSize: 16, letterSpacing: '0.05em', textTransform: 'uppercase' }}>BROCHU</span>
              </div>
            </div>

            {/* Nav links */}
            <div style={{ display: 'flex', alignItems: 'center', gap: 32 }}>
              {['How I built this site', 'My Expertise', 'Speaking Engagements'].map((label) => (
                <button key={label} style={{
                  background: 'transparent', border: 'none', cursor: 'pointer',
                  color: 'rgba(255,255,255,0.7)', fontSize: 13, fontWeight: 500,
                  padding: 0, transition: 'color 0.2s', letterSpacing: '0.02em'
                }}>
                  {label}
                </button>
              ))}
              <div style={{
                display: 'inline-flex', alignItems: 'center',
                background: 'transparent',
                borderRadius: 0, padding: '10px 20px', marginLeft: 16,
                border: '1px solid rgba(255,255,255,0.2)', cursor: 'pointer'
              }}>
                <span style={{ fontSize: 12, fontWeight: 600, color: '#ffffff', letterSpacing: '0.05em', textTransform: 'uppercase' }}>Check out my work</span>
              </div>
            </div>

          </div>
        </div>
      </nav>

      {/* Hero */}
      <div style={{ flex: 1, display: 'flex', alignItems: 'stretch' }}>
        {/* Left: Photo */}
        <div style={{ width: '38%', position: 'relative', overflow: 'hidden', flexShrink: 0, borderRight: '1px solid rgba(255,255,255,0.1)' }}>
          <img
            src="/__mockup/images/headshot.png"
            alt="Alexis Brochu"
            style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'top', filter: 'grayscale(100%) contrast(1.1)' }}
          />
        </div>

        {/* Right: Content */}
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center', padding: '0 80px', maxWidth: 900 }}>
          
          <div style={{ display: 'flex', flexDirection: 'column', gap: 32 }}>
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
              {/* Award */}
              <div>
                <div style={{
                  display: 'inline-flex', alignItems: 'center', gap: 8,
                  fontSize: 11, fontWeight: 500, color: 'rgba(255,255,255,0.5)', textTransform: 'uppercase', letterSpacing: '0.1em'
                }}>
                  <Award size={14} color="#5fc5f8" />
                  2023 California GovTech Award Winner
                </div>
              </div>

              {/* Headline */}
              <h1 style={{
                fontFamily: 'Montserrat, sans-serif', fontWeight: 900,
                fontSize: 72, lineHeight: 1.0, margin: 0,
                color: '#F3E8B9', letterSpacing: '-0.02em'
              }}>
                Hi, I'm Alexis
              </h1>

              {/* Subhead */}
              <p style={{
                fontSize: 26, fontWeight: 300, color: '#ffffff',
                lineHeight: 1.4, margin: 0, maxWidth: 540,
                fontStyle: 'italic', letterSpacing: '0.01em'
              }}>
                I design products that get used, not just shipped.
              </p>
            </div>

            <div style={{ height: '1px', background: 'rgba(255,255,255,0.15)', width: '60px' }} />

            <div style={{ display: 'flex', flexDirection: 'column', gap: 40 }}>
              {/* Primary CTA */}
              <div>
                <button style={{
                  display: 'inline-flex', alignItems: 'center', gap: 16,
                  padding: '0 32px', height: 64, borderRadius: 0,
                  background: '#0081BC',
                  border: 'none',
                  color: '#ffffff', fontSize: 15, fontWeight: 600, cursor: 'pointer',
                  letterSpacing: '0.05em', textTransform: 'uppercase'
                }}>
                  How I Drive Product Adoption
                  <ArrowRight size={18} />
                </button>
              </div>

              {/* Metrics */}
              <div style={{ display: 'flex', gap: 48, alignItems: 'flex-start' }}>
                {/* Lead Metric */}
                <div style={{ flex: '1 1 auto', display: 'flex', flexDirection: 'column', gap: 12 }}>
                  <div style={{ fontSize: 56, fontWeight: 300, color: '#F3E8B9', lineHeight: 1, letterSpacing: '-0.02em' }}>545.5%</div>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                    <div style={{ fontSize: 13, fontWeight: 600, color: 'rgba(255,255,255,0.8)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>User Base Increase</div>
                    <div style={{ fontSize: 13, color: '#5fc5f8', fontWeight: 500, display: 'flex', alignItems: 'center', gap: 4, cursor: 'pointer' }}>View case study <ArrowRight size={12}/></div>
                  </div>
                </div>
                
                <div style={{ width: '1px', background: 'rgba(255,255,255,0.1)', alignSelf: 'stretch' }} />

                {/* Secondary Metrics */}
                <div style={{ flex: '2 1 auto', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 32 }}>
                  {[
                    { value: '$2.1B', label: 'Disaster Relief Platform' },
                    { value: '75%', label: 'Ticket Reduction' },
                  ].map((m, i) => (
                    <div key={i} style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                      <div style={{ fontSize: 32, fontWeight: 400, color: '#ffffff', lineHeight: 1 }}>{m.value}</div>
                      <div style={{ display: 'flex', flexDirection: 'column', gap: 8, marginTop: 4 }}>
                        <div style={{ fontSize: 12, fontWeight: 500, color: 'rgba(255,255,255,0.6)', textTransform: 'uppercase', letterSpacing: '0.05em', lineHeight: 1.4 }}>{m.label}</div>
                        <div style={{ fontSize: 12, color: '#5fc5f8', fontWeight: 500, display: 'flex', alignItems: 'center', gap: 4, cursor: 'pointer' }}>View case study <ArrowRight size={12}/></div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Secondary CTA */}
              <div style={{ paddingTop: 16 }}>
                <a href="mailto:alexis.brochu@gmail.com" style={{
                  display: 'inline-flex', alignItems: 'center', gap: 12,
                  padding: '0', height: 'auto',
                  background: 'transparent', border: 'none',
                  color: 'rgba(255,255,255,0.6)', fontSize: 12, fontWeight: 600,
                  textDecoration: 'none', textTransform: 'uppercase', letterSpacing: '0.1em',
                  borderBottom: '1px solid rgba(255,255,255,0.3)', paddingBottom: 4
                }}>
                  MESSAGE ME
                  <ArrowRight size={14} />
                </a>
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}
