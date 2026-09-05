'use client';

import React from 'react';
import Link from 'next/link';
import { ArrowRight, Sparkles, Search, Shield, Lightbulb } from 'lucide-react';
import RadarHeroLens from '@/components/RadarHeroLens';
import QuickVerifyCard from '@/components/QuickVerifyCard';
import ScoreGauge from '@/components/ScoreGauge';

export default function HomePage() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '80px', paddingBottom: '80px' }}>
      {/* 1. HERO SECTION (page-1.png) */}
      <section style={{ paddingTop: '56px', position: 'relative' }}>
        <div className="container hero-grid" style={{
          display: 'grid',
          gridTemplateColumns: 'minmax(320px, 1.1fr) minmax(320px, 1fr)',
          gap: '48px',
          alignItems: 'center'
        }}>
          {/* Hero Left Content */}
          <div>
            <div style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
              backgroundColor: 'rgba(52, 70, 224, 0.06)',
              border: '1px solid rgba(52, 70, 224, 0.15)',
              borderRadius: 'var(--radius-full)',
              padding: '6px 16px',
              fontSize: '12px',
              fontWeight: 700,
              color: 'var(--accent)',
              marginBottom: '24px'
            }}>
              Evidence-first AI verification
            </div>

            <h1 style={{
              fontSize: '56px',
              fontWeight: 800,
              letterSpacing: '-0.035em',
              lineHeight: 1.1,
              color: 'var(--ink)',
              marginBottom: '20px'
            }}>
              Don't Just Believe It.<br />Check It.
            </h1>

            <p style={{
              fontSize: '18px',
              color: 'var(--text-secondary)',
              lineHeight: 1.6,
              maxWidth: '480px',
              marginBottom: '36px'
            }}>
              TRUTHLENS uses AI, evidence and source analysis to help you understand what information you can trust.
            </p>

            <div style={{ display: 'flex', alignItems: 'center', gap: '16px', flexWrap: 'wrap', marginBottom: '32px' }}>
              <Link href="/verify" className="btn-primary" style={{ padding: '14px 28px', fontSize: '15px' }}>
                <span>Verify Something</span>
                <ArrowRight size={16} />
              </Link>
              <Link href="/how-it-works" className="btn-tertiary" style={{ padding: '14px 24px', fontSize: '15px' }}>
                <span>How It Works</span>
              </Link>
            </div>

            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '24px',
              fontSize: '11px',
              fontWeight: 800,
              letterSpacing: '0.08em',
              color: 'var(--text-muted)',
              textTransform: 'uppercase',
              flexWrap: 'wrap'
            }}>
              <span>NO ACCOUNT NEEDED</span>
              <span>·</span>
              <span>SOURCES ALWAYS SHOWN</span>
              <span>·</span>
              <span>EXPLAINABLE RESULTS</span>
            </div>
          </div>

          {/* Hero Right Visual: Radar Lens */}
          <div>
            <RadarHeroLens />
          </div>
        </div>
      </section>

      {/* 2. QUICK VERIFICATION CARD (page-1.png) */}
      <section className="container">
        <QuickVerifyCard />
      </section>

      {/* 3. THE TRUTHLENS METHOD (page-1.png) */}
      <section className="container">
        <div style={{ marginBottom: '32px' }}>
          <span style={{
            fontSize: '11px',
            fontWeight: 800,
            letterSpacing: '0.08em',
            color: 'var(--signal)',
            textTransform: 'uppercase',
            display: 'block',
            marginBottom: '6px'
          }}>
            THE TRUTHLENS METHOD
          </span>
          <h2 style={{ fontSize: '36px', fontWeight: 800, letterSpacing: '-0.02em', color: 'var(--ink)' }}>
            Evidence you can actually see.
          </h2>
        </div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
          gap: '20px'
        }}>
          {/* Card 1: AI Analysis */}
          <div className="card card-hover" style={{ padding: '32px 28px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
            <div>
              <div style={{
                width: '40px',
                height: '40px',
                borderRadius: '12px',
                backgroundColor: 'rgba(52, 70, 224, 0.08)',
                color: 'var(--accent)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                marginBottom: '20px'
              }}>
                <Sparkles size={20} />
              </div>
              <h3 style={{ fontSize: '18px', fontWeight: 800, color: 'var(--ink)', marginBottom: '10px' }}>
                AI Analysis
              </h3>
              <p style={{ fontSize: '14px', color: 'var(--text-secondary)', lineHeight: 1.6, marginBottom: '24px' }}>
                Understand the submitted information — context, intent and the claims inside it.
              </p>
            </div>
            <span style={{ fontSize: '11px', fontWeight: 800, letterSpacing: '0.08em', color: 'var(--accent)', textTransform: 'uppercase' }}>
              STEP 01
            </span>
          </div>

          {/* Card 2: Live Evidence */}
          <div className="card card-hover" style={{ padding: '32px 28px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
            <div>
              <div style={{
                width: '40px',
                height: '40px',
                borderRadius: '12px',
                backgroundColor: 'rgba(52, 70, 224, 0.08)',
                color: 'var(--accent)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                marginBottom: '20px'
              }}>
                <Search size={20} />
              </div>
              <h3 style={{ fontSize: '18px', fontWeight: 800, color: 'var(--ink)', marginBottom: '10px' }}>
                Live Evidence
              </h3>
              <p style={{ fontSize: '14px', color: 'var(--text-secondary)', lineHeight: 1.6, marginBottom: '24px' }}>
                Find relevant evidence from current reporting, records and primary sources.
              </p>
            </div>
            <span style={{ fontSize: '11px', fontWeight: 800, letterSpacing: '0.08em', color: 'var(--accent)', textTransform: 'uppercase' }}>
              STEP 02
            </span>
          </div>

          {/* Card 3: Source Analysis */}
          <div className="card card-hover" style={{ padding: '32px 28px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
            <div>
              <div style={{
                width: '40px',
                height: '40px',
                borderRadius: '12px',
                backgroundColor: 'rgba(52, 70, 224, 0.08)',
                color: 'var(--accent)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                marginBottom: '20px'
              }}>
                <Shield size={20} />
              </div>
              <h3 style={{ fontSize: '18px', fontWeight: 800, color: 'var(--ink)', marginBottom: '10px' }}>
                Source Analysis
              </h3>
              <p style={{ fontSize: '14px', color: 'var(--text-secondary)', lineHeight: 1.6, marginBottom: '24px' }}>
                Understand where information comes from and how far it can be trusted.
              </p>
            </div>
            <span style={{ fontSize: '11px', fontWeight: 800, letterSpacing: '0.08em', color: 'var(--accent)', textTransform: 'uppercase' }}>
              STEP 03
            </span>
          </div>

          {/* Card 4: Explainable Results (Dark Card page-1.png) */}
          <div style={{
            backgroundColor: 'var(--ink)',
            color: '#FFFFFF',
            borderRadius: 'var(--radius-xl)',
            padding: '32px 28px',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            border: '1px solid rgba(255, 255, 255, 0.08)',
            boxShadow: 'var(--shadow-card)'
          }}>
            <div>
              <div style={{
                width: '40px',
                height: '40px',
                borderRadius: '12px',
                backgroundColor: 'rgba(255, 255, 255, 0.1)',
                color: 'var(--signal)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                marginBottom: '20px'
              }}>
                <Lightbulb size={20} />
              </div>
              <h3 style={{ fontSize: '18px', fontWeight: 800, color: '#FFFFFF', marginBottom: '10px' }}>
                Explainable Results
              </h3>
              <p style={{ fontSize: '14px', color: '#94A3B8', lineHeight: 1.6, marginBottom: '24px' }}>
                See exactly why the result was reached — never just a number.
              </p>
            </div>
            <span style={{ fontSize: '11px', fontWeight: 800, letterSpacing: '0.08em', color: '#94A3B8', textTransform: 'uppercase' }}>
              STEP 04
            </span>
          </div>
        </div>
      </section>

      {/* 4. THE SIGNATURE MOMENT: TRUST SCORE TEASER (page-1.png) */}
      <section className="container">
        <div className="card signature-grid" style={{
          padding: '48px',
          display: 'grid',
          gridTemplateColumns: 'minmax(300px, 1.2fr) minmax(300px, 1fr)',
          gap: '40px',
          alignItems: 'center',
          boxShadow: '0 20px 50px -10px rgba(14, 23, 38, 0.08)'
        }}>
          {/* Left Text */}
          <div>
            <span style={{
              fontSize: '11px',
              fontWeight: 800,
              letterSpacing: '0.08em',
              color: 'var(--signal)',
              textTransform: 'uppercase',
              display: 'block',
              marginBottom: '8px'
            }}>
              THE SIGNATURE MOMENT
            </span>

            <h2 style={{ fontSize: '38px', fontWeight: 800, letterSpacing: '-0.02em', color: 'var(--ink)', marginBottom: '16px' }}>
              A Trust Score that explains itself.
            </h2>

            <p style={{ fontSize: '16px', color: 'var(--text-secondary)', lineHeight: 1.6, marginBottom: '28px' }}>
              Every verification ends with a clear score, a plain-language assessment, and the reasoning behind it — supported claims, conflicts and all.
            </p>

            <Link
              href="/result/v-launch-xyz-2026"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                color: 'var(--accent)',
                fontSize: '15px',
                fontWeight: 700
              }}
            >
              <span>See a full result</span>
              <ArrowRight size={16} />
            </Link>
          </div>

          {/* Right Card Preview */}
          <div style={{
            backgroundColor: 'var(--canvas)',
            borderRadius: 'var(--radius-xl)',
            padding: '32px',
            border: '1px solid var(--border)',
            display: 'flex',
            flexDirection: 'column',
            gap: '24px'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '28px', flexWrap: 'wrap' }}>
              <ScoreGauge score={82} status="GENERALLY SUPPORTED" size={130} />
              <div style={{ flex: 1, minWidth: '180px' }}>
                <span className="badge badge-supported" style={{ marginBottom: '10px' }}>
                  GENERALLY SUPPORTED
                </span>
                <div style={{ fontSize: '12px', fontWeight: 800, letterSpacing: '0.06em', color: 'var(--text-muted)', marginBottom: '4px' }}>
                  TRUTHLENS ASSESSMENT
                </div>
                <p style={{ fontSize: '13px', color: 'var(--text-primary)', lineHeight: 1.5 }}>
                  Available evidence generally supports the main claim, but some information requires additional review.
                </p>
              </div>
            </div>

            <div style={{
              display: 'flex',
              gap: '20px',
              paddingTop: '16px',
              borderTop: '1px solid var(--border)'
            }}>
              <div>
                <span style={{ fontSize: '20px', fontWeight: 800, color: 'var(--ink)' }}>14</span>
                <span style={{ fontSize: '11px', color: 'var(--text-muted)', display: 'block', fontWeight: 700 }}>SOURCES CHECKED</span>
              </div>
              <div style={{ borderLeft: '1px solid var(--border)', paddingLeft: '20px' }}>
                <span style={{ fontSize: '20px', fontWeight: 800, color: 'var(--ink)' }}>6</span>
                <span style={{ fontSize: '11px', color: 'var(--text-muted)', display: 'block', fontWeight: 700 }}>CLAIMS ANALYZED</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 5. SIX STEPS TIMELINE (page-1.png) */}
      <section className="container">
        <div style={{ marginBottom: '40px' }}>
          <span style={{
            fontSize: '11px',
            fontWeight: 800,
            letterSpacing: '0.08em',
            color: 'var(--signal)',
            textTransform: 'uppercase',
            display: 'block',
            marginBottom: '6px'
          }}>
            SIX STEPS
          </span>
          <h2 style={{ fontSize: '36px', fontWeight: 800, letterSpacing: '-0.02em', color: 'var(--ink)' }}>
            How TRUTHLENS finds the truth.
          </h2>
        </div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(170px, 1fr))',
          gap: '24px',
          position: 'relative'
        }}>
          {[
            { num: '01', title: 'UNDERSTAND', desc: 'Understand submitted content.' },
            { num: '02', title: 'EXTRACT', desc: 'Identify important claims.' },
            { num: '03', title: 'SEARCH', desc: 'Find relevant evidence.' },
            { num: '04', title: 'COMPARE', desc: 'Weigh support against conflict.' },
            { num: '05', title: 'EXPLAIN', desc: 'Explain why this result.' },
            { num: '06', title: 'RECOMMEND', desc: 'Give an actionable next step.' }
          ].map((s, idx) => (
            <div key={s.num} style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <div style={{
                  width: '12px',
                  height: '12px',
                  borderRadius: '50%',
                  backgroundColor: idx < 3 ? 'var(--accent)' : 'var(--signal)'
                }} />
                <span style={{ fontSize: '13px', fontWeight: 800, color: 'var(--ink)' }}>
                  {s.num} — {s.title}
                </span>
              </div>
              <p style={{ fontSize: '13px', color: 'var(--text-secondary)', lineHeight: 1.5 }}>
                {s.desc}
              </p>
            </div>
          ))}
        </div>
      </section>

      <style jsx global>{`
        @media (max-width: 900px) {
          .hero-grid, .signature-grid {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </div>
  );
}
