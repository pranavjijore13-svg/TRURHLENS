'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu, X, ArrowRight } from 'lucide-react';

export default function Navbar() {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { name: 'Home', href: '/' },
    { name: 'Verify', href: '/verify' },
    { name: 'How It Works', href: '/how-it-works' },
    { name: 'History', href: '/history' },
    { name: 'About', href: '/about' },
  ];

  return (
    <header style={{
      backgroundColor: 'var(--canvas)',
      borderBottom: '1px solid var(--border)',
      position: 'sticky',
      top: 0,
      zIndex: 1000,
      backdropFilter: 'blur(8px)',
    }}>
      <div className="container" style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        height: '76px',
      }}>
        {/* Brand Logo */}
        <Link href="/" style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <div style={{
            width: '36px',
            height: '36px',
            borderRadius: '50%',
            backgroundColor: '#FFFFFF',
            border: '2px solid var(--accent)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: '0 2px 6px rgba(52, 70, 224, 0.25)',
            position: 'relative'
          }}>
            {/* Checkmark inside circle */}
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="var(--accent)" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="20 6 9 17 4 12" />
            </svg>
            {/* Lens handle icon */}
            <div style={{
              position: 'absolute',
              bottom: '-3px',
              right: '-3px',
              width: '10px',
              height: '3px',
              backgroundColor: 'var(--signal)',
              transform: 'rotate(45deg)',
              borderRadius: '2px'
            }} />
          </div>
          <span style={{
            fontSize: '20px',
            fontWeight: 800,
            letterSpacing: '-0.02em',
            color: 'var(--ink)'
          }}>
            TRUTHLENS
          </span>
        </Link>

        {/* Desktop Navigation Links */}
        <nav className="desktop-nav" style={{ display: 'flex', alignItems: 'center', gap: '32px' }}>
          {navLinks.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.name}
                href={link.href}
                style={{
                  fontSize: '15px',
                  fontWeight: isActive ? 700 : 500,
                  color: isActive ? 'var(--ink)' : 'var(--text-secondary)',
                  transition: 'color 0.2s ease',
                  position: 'relative'
                }}
              >
                {link.name}
                {isActive && (
                  <span style={{
                    position: 'absolute',
                    bottom: '-6px',
                    left: '50%',
                    transform: 'translateX(-50%)',
                    width: '4px',
                    height: '4px',
                    borderRadius: '50%',
                    backgroundColor: 'var(--accent)'
                  }} />
                )}
              </Link>
            );
          })}
        </nav>

        {/* Right Action */}
        <div className="desktop-cta" style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
          {pathname === '/verify' ? (
            <div
              title="Signed in as AR"
              style={{
                width: '38px',
                height: '38px',
                borderRadius: '50%',
                backgroundColor: 'rgba(52, 70, 224, 0.1)',
                border: '1.5px solid rgba(52, 70, 224, 0.2)',
                color: 'var(--accent)',
                fontWeight: 800,
                fontSize: '13px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                letterSpacing: '0.04em'
              }}
            >
              AR
            </div>
          ) : pathname.startsWith('/result') ? (
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <Link
                href="/verify"
                style={{
                  fontSize: '14px',
                  fontWeight: 600,
                  color: 'var(--text-secondary)',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px'
                }}
              >
                <span>Back to workspace</span>
              </Link>
              <Link href="/verify" className="btn-secondary" style={{ padding: '8px 18px', fontSize: '13px', borderRadius: 'var(--radius-md)' }}>
                <span>New Check</span>
                <ArrowRight size={14} />
              </Link>
            </div>
          ) : pathname === '/history' ? (
            <Link href="/verify" className="btn-primary" style={{ padding: '9px 18px', fontSize: '13px', borderRadius: 'var(--radius-md)' }}>
              <span>Verify Something</span>
              <ArrowRight size={14} />
            </Link>
          ) : (
            <Link href="/verify" className="btn-secondary" style={{ padding: '10px 20px', fontSize: '14px', borderRadius: 'var(--radius-md)' }}>
              <span>Start Verification</span>
              <ArrowRight size={16} />
            </Link>
          )}
        </div>

        {/* Mobile Hamburger Toggle */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label="Toggle navigation menu"
          style={{
            display: 'none',
            background: 'none',
            border: 'none',
            cursor: 'pointer',
            padding: '8px',
            color: 'var(--ink)'
          }}
          className="mobile-toggle"
        >
          {mobileMenuOpen ? <X size={26} /> : <Menu size={26} />}
        </button>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div style={{
          backgroundColor: 'var(--surface)',
          borderBottom: '1px solid var(--border)',
          padding: '20px 24px',
          display: 'flex',
          flexDirection: 'column',
          gap: '16px',
          boxShadow: 'var(--shadow-elevated)'
        }}>
          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              onClick={() => setMobileMenuOpen(false)}
              style={{
                fontSize: '16px',
                fontWeight: pathname === link.href ? 700 : 500,
                color: pathname === link.href ? 'var(--accent)' : 'var(--ink)',
                padding: '8px 0'
              }}
            >
              {link.name}
            </Link>
          ))}
          <div style={{ paddingTop: '8px' }}>
            <Link
              href="/verify"
              onClick={() => setMobileMenuOpen(false)}
              className="btn-primary"
              style={{ width: '100%', padding: '12px' }}
            >
              <span>Start Verification</span>
              <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      )}

      <style jsx global>{`
        @media (max-width: 768px) {
          .desktop-nav, .desktop-cta {
            display: none !important;
          }
          .mobile-toggle {
            display: block !important;
          }
        }
      `}</style>
    </header>
  );
}
