import { useState, type ReactNode } from 'react';

/**
 * SHA-256 hash of the access password.
 * Default password: portfolio2026
 * To change: run this in your browser console:
 *   const hash = await crypto.subtle.digest('SHA-256', new TextEncoder().encode('yourNewPassword'));
 *   console.log([...new Uint8Array(hash)].map(b => b.toString(16).padStart(2,'0')).join(''));
 */
const PASSWORD_HASH = '9881928f60e14fcbd7a28d2166ee4e8ba456daa9df696159dcae35050762895b';
const SESSION_KEY = 'ab-portfolio-auth';

async function hashPassword(password: string): Promise<string> {
  const buffer = await crypto.subtle.digest('SHA-256', new TextEncoder().encode(password));
  return [...new Uint8Array(buffer)].map(b => b.toString(16).padStart(2, '0')).join('');
}

// Bot-safe email builder — never a static string in the DOM
function openRequestEmail() {
  const parts = ['alexisb', '.product', '@', 'gmail', '.com'];
  window.location.href = 'mailto:' + parts.join('') + '?subject=Portfolio%20Access%20Request';
}

interface PasswordGateProps {
  children: ReactNode;
}

const MONO: React.CSSProperties = { fontFamily: '"Geist Mono", ui-monospace, monospace' };
const SERIF: React.CSSProperties = { fontFamily: '"Cormorant Garamond", Georgia, serif' };
const SANS: React.CSSProperties = { fontFamily: 'Inter, ui-sans-serif, system-ui, sans-serif' };

export function PasswordGate({ children }: PasswordGateProps) {
  const [authenticated, setAuthenticated] = useState(() => {
    // Auto-authenticate in development so the preview is visible
    if (import.meta.env.DEV) return true;
    return localStorage.getItem(SESSION_KEY) === 'true';
  });
  const [password, setPassword] = useState('');
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError(false);
    try {
      const hash = await hashPassword(password);
      if (hash === PASSWORD_HASH) {
        localStorage.setItem(SESSION_KEY, 'true');
        setAuthenticated(true);
      } else {
        setError(true);
        setPassword('');
      }
    } finally {
      setLoading(false);
    }
  }

  if (authenticated) {
    return <>{children}</>;
  }

  return (
    <div
      style={{
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        background: '#FFFFFF',
        padding: '1.5rem',
      }}
    >
      <div style={{ width: '100%', maxWidth: '360px' }}>

        {/* Wordmark */}
        <div style={{ marginBottom: '3rem', textAlign: 'center' }}>
          <p
            style={{
              ...MONO,
              fontSize: '0.5625rem',
              letterSpacing: '0.14em',
              textTransform: 'uppercase',
              color: '#FF4704',
              marginBottom: '0.75rem',
              fontWeight: 400,
            }}
          >
            Private Portfolio
          </p>
          <h1
            style={{
              ...SERIF,
              fontSize: '2.25rem',
              fontWeight: 300,
              color: '#000000',
              letterSpacing: '-0.02em',
              lineHeight: 1,
              margin: 0,
            }}
          >
            Alexis Brochu
          </h1>
        </div>

        {/* Access form */}
        <form onSubmit={handleSubmit}>
          <p
            style={{
              ...SANS,
              fontSize: '0.875rem',
              color: '#777169',
              marginBottom: '1.5rem',
              lineHeight: 1.65,
            }}
          >
            This portfolio is private. Enter the access code to continue, or request
            access below.
          </p>

          <div style={{ marginBottom: '1.25rem' }}>
            <label
              htmlFor="password"
              style={{
                ...MONO,
                display: 'block',
                fontSize: '0.5625rem',
                fontWeight: 400,
                color: '#A59F97',
                letterSpacing: '0.12em',
                textTransform: 'uppercase',
                marginBottom: '0.5rem',
              }}
            >
              Access Code
            </label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={e => { setPassword(e.target.value); setError(false); }}
              autoFocus
              style={{
                ...SANS,
                display: 'block',
                width: '100%',
                padding: '0.625rem 0.75rem',
                fontSize: '0.875rem',
                color: '#000000',
                background: '#FFFFFF',
                border: error ? '1px solid #000000' : '1px solid #E5E5E5',
                borderRadius: 0,
                outline: 'none',
                boxSizing: 'border-box',
              }}
              onFocus={e => { e.target.style.borderColor = '#FF4704'; }}
              onBlur={e => { e.target.style.borderColor = error ? '#000000' : '#E5E5E5'; }}
            />
            {error && (
              <p
                style={{
                  ...MONO,
                  color: '#000000',
                  fontSize: '0.5625rem',
                  letterSpacing: '0.08em',
                  textTransform: 'uppercase',
                  marginTop: '0.5rem',
                }}
              >
                Incorrect access code.
              </p>
            )}
          </div>

          <button
            type="submit"
            disabled={loading || !password}
            style={{
              ...SANS,
              width: '100%',
              padding: '0.75rem',
              background: loading || !password ? '#E5E5E5' : '#000000',
              color: loading || !password ? '#A59F97' : '#FFFFFF',
              border: 'none',
              borderRadius: 0,
              fontSize: '0.8125rem',
              fontWeight: 600,
              cursor: loading || !password ? 'not-allowed' : 'pointer',
              letterSpacing: '0.04em',
              transition: 'background 0.15s',
            }}
          >
            {loading ? 'Verifying...' : 'Enter'}
          </button>
        </form>

        {/* Divider */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', margin: '1.5rem 0' }}>
          <div style={{ flex: 1, height: '1px', background: '#E5E5E5' }} />
          <span style={{ ...MONO, fontSize: '0.5rem', color: '#A59F97', letterSpacing: '0.1em', textTransform: 'uppercase' }}>
            or
          </span>
          <div style={{ flex: 1, height: '1px', background: '#E5E5E5' }} />
        </div>

        {/* Request access */}
        <button
          type="button"
          onClick={openRequestEmail}
          style={{
            ...SANS,
            display: 'block',
            width: '100%',
            padding: '0.75rem',
            background: 'transparent',
            color: '#3F3B36',
            border: '1px solid #E5E5E5',
            borderRadius: 0,
            fontSize: '0.8125rem',
            fontWeight: 500,
            cursor: 'pointer',
            letterSpacing: '0.02em',
            transition: 'border-color 0.15s, color 0.15s',
            textAlign: 'center',
          }}
          onMouseEnter={e => {
            (e.target as HTMLButtonElement).style.borderColor = '#000000';
            (e.target as HTMLButtonElement).style.color = '#000000';
          }}
          onMouseLeave={e => {
            (e.target as HTMLButtonElement).style.borderColor = '#E5E5E5';
            (e.target as HTMLButtonElement).style.color = '#3F3B36';
          }}
        >
          Request access
        </button>

        <p
          style={{
            ...MONO,
            textAlign: 'center',
            marginTop: '2rem',
            fontSize: '0.5rem',
            color: '#E5E5E5',
            letterSpacing: '0.1em',
            textTransform: 'uppercase',
          }}
        >
          Access by invitation only.
        </p>
      </div>
    </div>
  );
}
