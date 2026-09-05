'use client';

import React from 'react';
import { SourceCredibility as SourceCredibilityType, MisinformationSignal } from '@/lib/types';
import { Check, AlertTriangle, ShieldCheck, HelpCircle } from 'lucide-react';

interface SourceCredibilityProps {
  sources: SourceCredibilityType[];
  warningSignals: MisinformationSignal[];
}

export default function SourceCredibility({ sources, warningSignals }: SourceCredibilityProps) {
  const topSource = sources[0];
  const otherSources = sources.slice(1);

  return (
    <section style={{ marginTop: '56px' }}>
      <div className="credibility-grid" style={{
        display: 'grid',
        gridTemplateColumns: 'minmax(320px, 1fr) minmax(320px, 1fr)',
        gap: '40px',
        alignItems: 'start'
      }}>

        {/* Left Column: Source Credibility */}
        <div>
          <div style={{ marginBottom: '24px' }}>
            <h2 style={{ fontSize: '32px', fontWeight: 800, letterSpacing: '-0.02em', color: 'var(--ink)' }}>
              Source Credibility
            </h2>
            <p style={{ fontSize: '15px', color: 'var(--text-secondary)', marginTop: '4px' }}>
              How far each source can be relied on, and why.
            </p>
          </div>

          {/* Primary Featured Source Card */}
          {topSource && (
            <div className="card" style={{ padding: '28px', marginBottom: '24px' }}>
              <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: '12px', marginBottom: '16px' }}>
                <div>
                  <h3 style={{ fontSize: '18px', fontWeight: 800, color: 'var(--ink)' }}>
                    {topSource.name}
                  </h3>
                  <div style={{ fontSize: '13px', color: 'var(--text-muted)', marginTop: '2px' }}>
                    {topSource.domain} · {topSource.publisherType}
                  </div>
                </div>

                <span className="badge badge-supported" style={{ fontSize: '11px' }}>
                  {topSource.credibilityLevel} CREDIBILITY
                </span>
              </div>

              {/* Score Progress Bar */}
              <div style={{ marginBottom: '20px' }}>
                <div style={{
                  width: '100%',
                  height: '8px',
                  borderRadius: '4px',
                  backgroundColor: 'rgba(14, 23, 38, 0.08)',
                  overflow: 'hidden',
                  marginBottom: '8px'
                }}>
                  <div style={{
                    width: `${topSource.score}%`,
                    height: '100%',
                    backgroundColor: topSource.score >= 70 ? 'var(--supported)' : topSource.score >= 40 ? 'var(--needs-review)' : 'var(--contradicted)',
                    borderRadius: '4px'
                  }} />
                </div>
                <div style={{ fontSize: '13px', fontWeight: 700, color: 'var(--ink)' }}>
                  {topSource.score} / 100
                </div>
              </div>

              {/* Criteria Checkmarks */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                {topSource.reasons.map((reason, idx) => (
                  <div key={idx} style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <div style={{
                      width: '20px',
                      height: '20px',
                      borderRadius: '50%',
                      backgroundColor: reason.passed ? 'var(--supported-bg)' : 'rgba(14, 23, 38, 0.05)',
                      color: reason.passed ? 'var(--supported)' : 'var(--text-muted)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center'
                    }}>
                      <Check size={12} strokeWidth={3} />
                    </div>
                    <span style={{ fontSize: '14px', color: reason.passed ? 'var(--ink)' : 'var(--text-muted)', fontWeight: 500 }}>
                      {reason.text}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Other Sources in This Analysis */}
          {otherSources.length > 0 && (
            <div>
              <div style={{
                fontSize: '11px',
                fontWeight: 800,
                letterSpacing: '0.08em',
                color: 'var(--text-muted)',
                textTransform: 'uppercase',
                marginBottom: '12px'
              }}>
                OTHER SOURCES IN THIS ANALYSIS
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                {otherSources.map((src) => (
                  <div
                    key={src.id}
                    className="card"
                    style={{
                      padding: '16px 20px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between'
                    }}
                  >
                    <div>
                      <div style={{ fontSize: '15px', fontWeight: 700, color: 'var(--ink)' }}>{src.name}</div>
                      <div style={{ fontSize: '12px', color: 'var(--text-muted)' }}>{src.domain}</div>
                    </div>

                    <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
                      <div style={{
                        width: '80px',
                        height: '6px',
                        borderRadius: '3px',
                        backgroundColor: 'rgba(14, 23, 38, 0.06)',
                        overflow: 'hidden'
                      }}>
                        <div style={{
                          width: `${src.score}%`,
                          height: '100%',
                          backgroundColor: src.score >= 70 ? 'var(--supported)' : src.score >= 40 ? 'var(--needs-review)' : 'var(--insufficient)'
                        }} />
                      </div>

                      <span style={{
                        fontSize: '12px',
                        fontWeight: 700,
                        color: src.credibilityLevel === 'HIGH' ? 'var(--supported)' : src.credibilityLevel === 'MEDIUM' ? 'var(--needs-review)' : 'var(--insufficient)'
                      }}>
                        {src.credibilityLevel} · {src.score}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Right Column: Potential Warning Signals */}
        <div>
          <div style={{ marginBottom: '24px' }}>
            <h2 style={{ fontSize: '32px', fontWeight: 800, letterSpacing: '-0.02em', color: 'var(--ink)' }}>
              Potential Warning Signals
            </h2>
            <p style={{ fontSize: '15px', color: 'var(--text-secondary)', marginTop: '4px' }}>
              Signals worth checking — not proof that something is false.
            </p>
          </div>

          {/* Grid of Warning Signal Cards */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
            gap: '16px',
            marginBottom: '24px'
          }}>
            {warningSignals.map((signal) => {
              const isCaution = signal.type === 'CAUTION';
              return (
                <div
                  key={signal.id}
                  style={{
                    backgroundColor: isCaution ? 'var(--needs-review-bg)' : 'var(--supported-bg)',
                    border: `1px solid ${isCaution ? 'var(--needs-review-border)' : 'var(--supported-border)'}`,
                    borderRadius: 'var(--radius-xl)',
                    padding: '22px',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '8px'
                  }}
                >
                  <span style={{
                    fontSize: '11px',
                    fontWeight: 800,
                    letterSpacing: '0.08em',
                    color: isCaution ? 'var(--needs-review)' : 'var(--supported)',
                    textTransform: 'uppercase'
                  }}>
                    {isCaution ? 'CAUTION' : 'CLEAR'}
                  </span>

                  <h3 style={{ fontSize: '16px', fontWeight: 800, color: 'var(--ink)' }}>
                    {signal.title}
                  </h3>

                  <p style={{ fontSize: '13px', color: 'var(--text-secondary)', lineHeight: 1.5 }}>
                    {signal.description}
                  </p>
                </div>
              );
            })}
          </div>

          {/* How to Read This Educational Callout (page-7.png) */}
          <div style={{
            backgroundColor: 'var(--surface-alt)',
            border: '1px solid var(--border)',
            borderRadius: 'var(--radius-xl)',
            padding: '24px'
          }}>
            <div style={{
              fontSize: '11px',
              fontWeight: 800,
              letterSpacing: '0.08em',
              color: 'var(--text-muted)',
              textTransform: 'uppercase',
              marginBottom: '8px'
            }}>
              HOW TO READ THIS
            </div>
            <p style={{ fontSize: '14px', color: 'var(--text-secondary)', lineHeight: 1.6 }}>
              Warning signals describe qualities of the content and its sources — not a verdict. A signal means "look closer", never "this is fake". TRUTHLENS always shows the evidence behind every signal so you can judge for yourself.
            </p>
          </div>
        </div>
      </div>

      <style jsx global>{`
        @media (max-width: 840px) {
          .credibility-grid {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </section>
  );
}
