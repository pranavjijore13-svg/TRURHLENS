'use client';

import React from 'react';
import { Check, AlertTriangle } from 'lucide-react';

export default function RadarHeroLens() {
  return (
    <div style={{
      position: 'relative',
      width: '100%',
      maxWidth: '540px',
      height: '460px',
      margin: '0 auto',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    }}>
      {/* Background Soft Glow */}
      <div style={{
        position: 'absolute',
        width: '320px',
        height: '320px',
        borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(52, 70, 224, 0.12) 0%, rgba(52, 70, 224, 0) 70%)',
        zIndex: 0
      }} />

      {/* SVG Connecting Lines */}
      <svg style={{
        position: 'absolute',
        inset: 0,
        width: '100%',
        height: '100%',
        zIndex: 1,
        pointerEvents: 'none'
      }}>
        {/* Top-left line */}
        <line x1="160" y1="110" x2="230" y2="180" stroke="rgba(52, 70, 224, 0.25)" strokeWidth="1.5" strokeDasharray="4 4" />
        {/* Top-right line */}
        <line x1="390" y1="95" x2="310" y2="175" stroke="rgba(18, 128, 92, 0.3)" strokeWidth="1.5" strokeDasharray="4 4" />
        {/* Bottom-left line (orange conflict) */}
        <line x1="170" y1="330" x2="235" y2="280" stroke="rgba(217, 102, 61, 0.4)" strokeWidth="2" />
        {/* Bottom-right line */}
        <line x1="380" y1="335" x2="310" y2="280" stroke="rgba(18, 128, 92, 0.3)" strokeWidth="1.5" strokeDasharray="4 4" />
      </svg>

      {/* Outer subtle concentric radar rings */}
      <div style={{
        position: 'absolute',
        width: '340px',
        height: '340px',
        borderRadius: '50%',
        border: '1px dashed rgba(52, 70, 224, 0.18)',
        zIndex: 1
      }} />
      <div style={{
        position: 'absolute',
        width: '270px',
        height: '270px',
        borderRadius: '50%',
        border: '1px solid rgba(52, 70, 224, 0.12)',
        zIndex: 1
      }} />

      {/* Center Main Lens */}
      <div style={{
        position: 'relative',
        width: '170px',
        height: '170px',
        borderRadius: '50%',
        backgroundColor: '#FFFFFF',
        border: '4px solid var(--accent)',
        boxShadow: '0 12px 36px rgba(52, 70, 224, 0.2)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 5
      }}>
        {/* Lens Inner Reflection / Shimmer */}
        <div style={{
          position: 'absolute',
          inset: '8px',
          borderRadius: '50%',
          border: '2px solid rgba(52, 70, 224, 0.15)',
          background: 'linear-gradient(135deg, rgba(52, 70, 224, 0.04) 0%, rgba(255, 255, 255, 0.8) 100%)'
        }} />

        {/* Big Checkmark */}
        <svg width="68" height="68" viewBox="0 0 24 24" fill="none" stroke="var(--accent)" strokeWidth="2.8" strokeLinecap="round" strokeLinejoin="round" style={{ zIndex: 6 }}>
          <polyline points="20 6 9 17 4 12" />
        </svg>

        {/* Lens Handle */}
        <div style={{
          position: 'absolute',
          bottom: '-18px',
          right: '-18px',
          width: '40px',
          height: '10px',
          backgroundColor: 'var(--signal)',
          transform: 'rotate(45deg)',
          borderRadius: '5px',
          boxShadow: '0 4px 10px rgba(217, 102, 61, 0.3)',
          zIndex: 7
        }} />
      </div>

      {/* Floating Card 1: Supporting Evidence (Top Left) */}
      <div style={{
        position: 'absolute',
        top: '65px',
        left: '20px',
        backgroundColor: '#FFFFFF',
        borderRadius: 'var(--radius-md)',
        padding: '10px 16px',
        boxShadow: 'var(--shadow-card)',
        border: '1px solid var(--border)',
        display: 'flex',
        alignItems: 'center',
        gap: '10px',
        zIndex: 10,
        transition: 'transform 0.3s ease'
      }}>
        <div style={{
          width: '24px',
          height: '24px',
          borderRadius: '50%',
          backgroundColor: 'var(--supported-bg)',
          color: 'var(--supported)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center'
        }}>
          <Check size={14} strokeWidth={3} />
        </div>
        <div>
          <div style={{ fontSize: '13px', fontWeight: 700, color: 'var(--ink)' }}>Supporting Evidence</div>
          <div style={{ fontSize: '11px', color: 'var(--text-secondary)' }}>3 independent sources</div>
        </div>
      </div>

      {/* Floating Card 2: Reliable Source (Top Right) */}
      <div style={{
        position: 'absolute',
        top: '55px',
        right: '25px',
        backgroundColor: '#FFFFFF',
        borderRadius: 'var(--radius-md)',
        padding: '10px 16px',
        boxShadow: 'var(--shadow-card)',
        border: '1px solid var(--border)',
        display: 'flex',
        alignItems: 'center',
        gap: '10px',
        zIndex: 10
      }}>
        <div style={{
          width: '24px',
          height: '24px',
          borderRadius: '50%',
          backgroundColor: 'var(--supported-bg)',
          color: 'var(--supported)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center'
        }}>
          <Check size={14} strokeWidth={3} />
        </div>
        <div>
          <div style={{ fontSize: '13px', fontWeight: 700, color: 'var(--ink)' }}>Reliable Source</div>
          <div style={{ fontSize: '11px', color: 'var(--text-secondary)' }}>Credibility: High</div>
        </div>
      </div>

      {/* Floating Card 3: Conflicting Information (Bottom Left) */}
      <div style={{
        position: 'absolute',
        bottom: '80px',
        left: '25px',
        backgroundColor: '#FFFFFF',
        borderRadius: 'var(--radius-md)',
        padding: '10px 16px',
        boxShadow: 'var(--shadow-card)',
        border: '1px solid rgba(217, 102, 61, 0.25)',
        display: 'flex',
        alignItems: 'center',
        gap: '10px',
        zIndex: 10
      }}>
        <div style={{
          width: '24px',
          height: '24px',
          borderRadius: '50%',
          backgroundColor: '#FFF1EC',
          color: 'var(--signal)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center'
        }}>
          <AlertTriangle size={14} strokeWidth={2.5} />
        </div>
        <div>
          <div style={{ fontSize: '13px', fontWeight: 700, color: 'var(--ink)' }}>Conflicting Information</div>
          <div style={{ fontSize: '11px', color: 'var(--signal)' }}>1 source disagrees</div>
        </div>
      </div>

      {/* Floating Card 4: Recent Report (Bottom Right) */}
      <div style={{
        position: 'absolute',
        bottom: '80px',
        right: '25px',
        backgroundColor: '#FFFFFF',
        borderRadius: 'var(--radius-md)',
        padding: '10px 16px',
        boxShadow: 'var(--shadow-card)',
        border: '1px solid var(--border)',
        display: 'flex',
        alignItems: 'center',
        gap: '10px',
        zIndex: 10
      }}>
        <div style={{
          width: '24px',
          height: '24px',
          borderRadius: '50%',
          backgroundColor: 'var(--supported-bg)',
          color: 'var(--supported)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center'
        }}>
          <Check size={14} strokeWidth={3} />
        </div>
        <div>
          <div style={{ fontSize: '13px', fontWeight: 700, color: 'var(--ink)' }}>Recent Report</div>
          <div style={{ fontSize: '11px', color: 'var(--text-secondary)' }}>Published 2 days ago</div>
        </div>
      </div>
    </div>
  );
}
