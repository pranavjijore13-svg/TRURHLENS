import React from 'react';
import Link from 'next/link';

export default function Footer() {
  return (
    <footer style={{
      backgroundColor: 'var(--canvas)',
      borderTop: '1px solid var(--border)',
      padding: '48px 0 36px 0',
      marginTop: 'auto'
    }}>
      <div className="container" style={{
        display: 'flex',
        flexWrap: 'wrap',
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: '24px'
      }}>
        {/* Brand info */}
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
            <span style={{ fontSize: '18px', fontWeight: 800, letterSpacing: '-0.02em', color: 'var(--ink)' }}>
              TRUTHLENS
            </span>
          </div>
          <p style={{ fontSize: '14px', color: 'var(--text-secondary)' }}>
            See the Evidence. Understand the Truth.
          </p>
        </div>

        {/* Links */}
        <nav style={{ display: 'flex', alignItems: 'center', gap: '28px', flexWrap: 'wrap' }}>
          <Link href="/verify" style={{ fontSize: '14px', color: 'var(--text-secondary)', fontWeight: 500 }}>
            Verify
          </Link>
          <Link href="/how-it-works" style={{ fontSize: '14px', color: 'var(--text-secondary)', fontWeight: 500 }}>
            How It Works
          </Link>
          <Link href="/history" style={{ fontSize: '14px', color: 'var(--text-secondary)', fontWeight: 500 }}>
            History
          </Link>
          <Link href="/about" style={{ fontSize: '14px', color: 'var(--text-secondary)', fontWeight: 500 }}>
            About
          </Link>
        </nav>
      </div>

      <div className="container" style={{
        marginTop: '32px',
        paddingTop: '20px',
        borderTop: '1px solid rgba(14, 23, 38, 0.05)',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        flexWrap: 'wrap',
        gap: '12px',
        fontSize: '13px',
        color: 'var(--text-muted)'
      }}>
        <span>© {new Date().getFullYear()} TRUTHLENS Intelligence. Evidence-first verification platform.</span>
        <span>Informational assessments based on public evidence.</span>
      </div>
    </footer>
  );
}
