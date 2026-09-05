'use client';

import React, { useEffect, useState } from 'react';
import { Check } from 'lucide-react';

interface InvestigationScreenProps {
  onCancel?: () => void;
  progressPercent?: number;
}

const STEPS = [
  'Understanding content',
  'Extracting claims',
  'Searching for evidence',
  'Comparing sources',
  'Evaluating credibility',
  'Building explanation'
];

export default function InvestigationScreen({
  onCancel,
  progressPercent
}: InvestigationScreenProps) {
  const [percent, setPercent] = useState(progressPercent ?? 12);
  const [activeStepIndex, setActiveStepIndex] = useState(0);

  useEffect(() => {
    if (progressPercent !== undefined) {
      setPercent(progressPercent);
      const stepIdx = Math.min(STEPS.length - 1, Math.floor((progressPercent / 100) * STEPS.length));
      setActiveStepIndex(stepIdx);
      return;
    }

    // Auto-increment simulated realistic progress during fetch
    const interval = setInterval(() => {
      setPercent((prev) => {
        if (prev >= 94) return prev;
        const next = prev + Math.floor(Math.random() * 4) + 1;
        const stepIdx = Math.min(STEPS.length - 1, Math.floor((next / 100) * STEPS.length));
        setActiveStepIndex(stepIdx);
        return next;
      });
    }, 450);

    return () => clearInterval(interval);
  }, [progressPercent]);

  return (
    <div style={{
      minHeight: '100vh',
      backgroundColor: '#0B101B',
      color: '#FFFFFF',
      display: 'flex',
      flexDirection: 'column',
      position: 'relative',
      overflow: 'hidden'
    }}>
      {/* Top Navbar */}
      <header style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '24px 36px',
        borderBottom: '1px solid rgba(255, 255, 255, 0.06)'
      }}>
        {/* Brand */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <div style={{
            width: '32px',
            height: '32px',
            borderRadius: '50%',
            backgroundColor: '#162032',
            border: '2px solid var(--accent)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            position: 'relative'
          }}>
            <Check size={16} color="var(--accent)" strokeWidth={3} />
            <div style={{
              position: 'absolute',
              bottom: '-3px',
              right: '-3px',
              width: '8px',
              height: '3px',
              backgroundColor: 'var(--signal)',
              transform: 'rotate(45deg)',
              borderRadius: '2px'
            }} />
          </div>
          <span style={{ fontSize: '18px', fontWeight: 800, letterSpacing: '-0.02em', color: '#FFFFFF' }}>
            TRUTHLENS
          </span>
        </div>

        {/* Cancel Button */}
        {onCancel && (
          <button
            onClick={onCancel}
            style={{
              background: 'transparent',
              border: 'none',
              color: '#94A3B8',
              fontSize: '14px',
              fontWeight: 500,
              cursor: 'pointer',
              transition: 'color 0.2s ease'
            }}
            onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.color = '#FFFFFF'; }}
            onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.color = '#94A3B8'; }}
          >
            Cancel investigation
          </button>
        )}
      </header>

      {/* Main Investigation Centerpiece */}
      <main className="container" style={{
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '60px 24px',
        maxWidth: '900px'
      }}>
        {/* Subtitle */}
        <div style={{
          fontSize: '12px',
          fontWeight: 800,
          letterSpacing: '0.12em',
          color: '#60A5FA',
          textTransform: 'uppercase',
          marginBottom: '12px'
        }}>
          ANALYSIS IN PROGRESS
        </div>

        {/* Title */}
        <h1 style={{
          fontSize: '38px',
          fontWeight: 800,
          letterSpacing: '-0.03em',
          marginBottom: '10px',
          textAlign: 'center'
        }}>
          TRUTHLENS IS INVESTIGATING
        </h1>

        <p style={{
          fontSize: '16px',
          color: '#94A3B8',
          marginBottom: '48px',
          textAlign: 'center'
        }}>
          Reading the content, collecting evidence and comparing sources.
        </p>

        {/* Interactive Center: Radar & Checklist Grid */}
        <div className="investigation-grid" style={{
          display: 'grid',
          gridTemplateColumns: 'minmax(240px, 320px) minmax(260px, 380px)',
          gap: '48px',
          alignItems: 'center',
          marginBottom: '40px',
          width: '100%',
          justifyContent: 'center'
        }}>

          {/* Left: Radar Lens with percentage */}
          <div style={{
            position: 'relative',
            width: '260px',
            height: '260px',
            margin: '0 auto',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}>
            {/* Ambient lens aura */}
            <div style={{
              position: 'absolute',
              inset: '-20px',
              borderRadius: '50%',
              background: 'radial-gradient(circle, rgba(52, 70, 224, 0.25) 0%, rgba(52, 70, 224, 0) 70%)',
            }} />

            {/* Outermost grid circle */}
            <div style={{
              position: 'absolute',
              inset: 0,
              borderRadius: '50%',
              border: '1px solid rgba(255, 255, 255, 0.08)'
            }} />

            {/* Middle circle with rotating arm */}
            <div style={{
              position: 'absolute',
              inset: '25px',
              borderRadius: '50%',
              border: '2px solid rgba(96, 165, 250, 0.25)'
            }} />

            {/* Rotating radar line */}
            <div
              className="radar-spinner"
              style={{
                position: 'absolute',
                width: '100%',
                height: '100%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                pointerEvents: 'none'
              }}
            >
              <div style={{
                position: 'absolute',
                top: '50%',
                left: '50%',
                width: '105px',
                height: '3px',
                background: 'linear-gradient(90deg, #60A5FA, transparent)',
                transformOrigin: '0% 0%',
                borderRadius: '2px'
              }} />
            </div>

            {/* Center percentage and lens handle */}
            <div style={{
              width: '150px',
              height: '150px',
              borderRadius: '50%',
              border: '3px solid #60A5FA',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              backgroundColor: '#0F172A',
              boxShadow: '0 0 25px rgba(96, 165, 250, 0.25)',
              position: 'relative'
            }}>
              <span style={{ fontSize: '32px', fontWeight: 800, color: '#FFFFFF' }}>
                {percent}%
              </span>

              {/* Lens handle */}
              <div style={{
                position: 'absolute',
                bottom: '-12px',
                right: '-12px',
                width: '28px',
                height: '8px',
                backgroundColor: 'var(--signal)',
                transform: 'rotate(45deg)',
                borderRadius: '4px'
              }} />
            </div>
          </div>

          {/* Right: Step-by-Step Checklist */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            {STEPS.map((step, idx) => {
              const isCompleted = idx < activeStepIndex;
              const isCurrent = idx === activeStepIndex;

              return (
                <div
                  key={step}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '14px',
                    color: isCompleted ? '#34D399' : isCurrent ? '#FFFFFF' : '#64748B',
                    fontWeight: isCurrent ? 700 : 500,
                    fontSize: '15px'
                  }}
                >
                  {/* Step status icon */}
                  {isCompleted ? (
                    <div style={{
                      width: '22px',
                      height: '22px',
                      borderRadius: '50%',
                      backgroundColor: 'rgba(52, 211, 153, 0.15)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center'
                    }}>
                      <Check size={14} color="#34D399" strokeWidth={3} />
                    </div>
                  ) : isCurrent ? (
                    <div style={{
                      width: '22px',
                      height: '22px',
                      borderRadius: '50%',
                      backgroundColor: 'var(--accent)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      boxShadow: '0 0 12px rgba(52, 70, 224, 0.8)'
                    }}>
                      <div style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: '#FFFFFF' }} />
                    </div>
                  ) : (
                    <div style={{
                      width: '22px',
                      height: '22px',
                      borderRadius: '50%',
                      border: '1.5px solid #475569'
                    }} />
                  )}

                  <span>{step}</span>
                </div>
              );
            })}

            {/* Bottom Progress Bar */}
            <div style={{ marginTop: '16px' }}>
              <div style={{
                width: '100%',
                height: '6px',
                borderRadius: '3px',
                backgroundColor: 'rgba(255, 255, 255, 0.08)',
                overflow: 'hidden'
              }}>
                <div style={{
                  width: `${percent}%`,
                  height: '100%',
                  backgroundColor: 'var(--accent)',
                  transition: 'width 0.3s ease'
                }} />
              </div>
              <span style={{ fontSize: '12px', color: '#64748B', marginTop: '8px', display: 'block' }}>
                Typically completes in under 30 seconds
              </span>
            </div>
          </div>
        </div>

        {/* Evidence Streaming Feed */}
        <div style={{ width: '100%', marginTop: '32px' }}>
          <div style={{
            fontSize: '11px',
            fontWeight: 700,
            letterSpacing: '0.08em',
            color: '#64748B',
            textTransform: 'uppercase',
            marginBottom: '14px'
          }}>
            EVIDENCE STREAMING IN
          </div>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
            gap: '16px'
          }}>
            {[1, 2, 3].map((i) => (
              <div
                key={i}
                style={{
                  backgroundColor: 'rgba(255, 255, 255, 0.03)',
                  border: '1px solid rgba(255, 255, 255, 0.06)',
                  borderRadius: 'var(--radius-lg)',
                  padding: '20px',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '10px'
                }}
              >
                <div style={{
                  width: `${60 + (i * 12)}%`,
                  height: '12px',
                  borderRadius: '4px',
                  backgroundColor: 'rgba(255, 255, 255, 0.1)',
                  animation: 'pulse 1.8s ease-in-out infinite'
                }} />
                <div style={{
                  width: '85%',
                  height: '10px',
                  borderRadius: '4px',
                  backgroundColor: 'rgba(255, 255, 255, 0.05)',
                  animation: 'pulse 1.8s ease-in-out infinite'
                }} />
              </div>
            ))}
          </div>
        </div>
      </main>

      <style jsx global>{`
        @keyframes pulse {
          0%, 100% { opacity: 0.4; }
          50% { opacity: 0.8; }
        }
        @media (max-width: 768px) {
          .investigation-grid {
            grid-template-columns: 1fr !important;
            gap: 32px !important;
          }
        }
      `}</style>
    </div>
  );
}
