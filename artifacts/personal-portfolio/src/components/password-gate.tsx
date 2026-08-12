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

interface PasswordGateProps {
  children: ReactNode;
}

export function PasswordGate({ children }: PasswordGateProps) {
  const [authenticated, setAuthenticated] = useState(() => {
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
        alignItems: 'center',
        justifyContent: 'center',
        background: '#08080A',
        fontFamily: "'Inter', -apple-system, sans-serif",
        padding: '1.5rem',
      }}
    >
      <div style={{ width: '100%', maxWidth: '360px' }}>
        {/* Wordmark */}
        <div style={{ marginBottom: '2.5rem', textAlign: 'center' }}>
          <p
            style={{
              fontSize: '0.75rem',
              letterSpacing: '0.2em',
              textTransform: 'uppercase',
              color: '#6D5592',
              marginBottom: '0.5rem',
              fontWeight: 500,
            }}
          >
            Private Portfolio
          </p>
          <h1
            style={{
              fontSize: '1.75rem',
              fontWeight: 700,
              color: '#E1E6E8',
              letterSpacing: '-0.02em',
              margin: 0,
            }}
          >
            Alexis Brochu
          </h1>
        </div>

        {/* Card */}
        <form
          onSubmit={handleSubmit}
          style={{
            background: '#0B0A0E',
            border: '1px solid rgba(255,255,255,0.07)',
            borderRadius: '12px',
            padding: '2rem',
          }}
        >
          <p
            style={{
              fontSize: '0.875rem',
              color: 'rgba(255,255,255,0.5)',
              marginBottom: '1.5rem',
              lineHeight: 1.6,
            }}
          >
            This portfolio is private. Enter the access code to continue.
          </p>

          <div style={{ marginBottom: '1.25rem' }}>
            <label
              htmlFor="password"
              style={{
                display: 'block',
                fontSize: '0.75rem',
                fontWeight: 500,
                color: 'rgba(255,255,255,0.4)',
                letterSpacing: '0.1em',
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
              onChange={e => {
                setPassword(e.target.value);
                setError(false);
              }}
              autoFocus
              autoComplete="current-password"
              placeholder="••••••••••••"
              style={{
                width: '100%',
                padding: '0.75rem 1rem',
                background: 'rgba(255,255,255,0.04)',
                border: error
                  ? '1px solid rgba(239,68,68,0.6)'
                  : '1px solid rgba(255,255,255,0.1)',
                borderRadius: '8px',
                color: '#E1E6E8',
                fontSize: '1rem',
                outline: 'none',
                boxSizing: 'border-box',
                transition: 'border-color 0.2s',
              }}
            />
            {error && (
              <p
                style={{
                  color: 'rgba(239,68,68,0.8)',
                  fontSize: '0.8rem',
                  marginTop: '0.5rem',
                }}
              >
                Incorrect access code. Try again.
              </p>
            )}
          </div>

          <button
            type="submit"
            disabled={loading || !password}
            style={{
              width: '100%',
              padding: '0.75rem',
              background: loading || !password ? 'rgba(0,129,188,0.4)' : '#0081BC',
              color: '#fff',
              border: 'none',
              borderRadius: '8px',
              fontSize: '0.9rem',
              fontWeight: 600,
              cursor: loading || !password ? 'not-allowed' : 'pointer',
              transition: 'background 0.2s',
              letterSpacing: '0.02em',
            }}
          >
            {loading ? 'Verifying...' : 'Enter'}
          </button>
        </form>

        <p
          style={{
            textAlign: 'center',
            marginTop: '1.5rem',
            fontSize: '0.75rem',
            color: 'rgba(255,255,255,0.2)',
          }}
        >
          Access by invitation only.
        </p>
      </div>
    </div>
  );
}
