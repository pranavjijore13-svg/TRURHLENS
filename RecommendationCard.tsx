'use client';

import React, { useState } from 'react';
import { RecommendationInfo } from '@/lib/types';
import { Bookmark, Check, Share2 } from 'lucide-react';

interface RecommendationCardProps {
  recommendation: RecommendationInfo;
  onViewEvidence?: () => void;
  isSaved?: boolean;
  onToggleSave?: () => void;
}

export default function RecommendationCard({
  recommendation,
  onViewEvidence,
  isSaved = false,
  onToggleSave
}: RecommendationCardProps) {
  const [saved, setSaved] = useState(isSaved);

  const handleSaveClick = () => {
    setSaved(!saved);
    if (onToggleSave) onToggleSave();
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
      <div>
        <span style={{
          fontSize: '11px',
          fontWeight: 800,
          letterSpacing: '0.08em',
          color: 'var(--signal)',
          textTransform: 'uppercase',
          display: 'block',
          marginBottom: '6px'
        }}>
          RECOMMENDATION
        </span>
        <h2 style={{ fontSize: '28px', fontWeight: 800, letterSpacing: '-0.02em', color: 'var(--ink)' }}>
          What should you do?
        </h2>
      </div>

      {/* Dark Action Card */}
      <div style={{
        backgroundColor: 'var(--ink)',
        color: '#FFFFFF',
        borderRadius: 'var(--radius-xl)',
        padding: '32px 28px',
        border: '1px solid rgba(255, 255, 255, 0.08)',
        boxShadow: '0 16px 36px rgba(14, 23, 38, 0.15)',
        position: 'relative',
        overflow: 'hidden'
      }}>
        {/* Subtle orange accent glow top-right */}
        <div style={{
          position: 'absolute',
          top: '-60px',
          right: '-60px',
          width: '180px',
          height: '180px',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(217, 102, 61, 0.25) 0%, transparent 70%)',
          pointerEvents: 'none'
        }} />

        <div style={{
          display: 'inline-block',
          backgroundColor: 'rgba(217, 102, 61, 0.2)',
          color: 'var(--signal)',
          padding: '4px 12px',
          borderRadius: 'var(--radius-full)',
          fontSize: '11px',
          fontWeight: 800,
          letterSpacing: '0.06em',
          marginBottom: '16px'
        }}>
          ACTION SUGGESTED
        </div>

        <h3 style={{
          fontSize: '22px',
          fontWeight: 800,
          letterSpacing: '-0.02em',
          marginBottom: '12px',
          color: '#FFFFFF'
        }}>
          {recommendation.headline}
        </h3>

        <p style={{
          fontSize: '14px',
          color: '#94A3B8',
          lineHeight: 1.6,
          marginBottom: '28px'
        }}>
          {recommendation.description}
        </p>

        {/* Buttons */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
          {onViewEvidence && (
            <button
              onClick={onViewEvidence}
              style={{
                backgroundColor: '#FFFFFF',
                color: 'var(--ink)',
                border: 'none',
                borderRadius: 'var(--radius-lg)',
                padding: '12px',
                fontSize: '14px',
                fontWeight: 700,
                cursor: 'pointer',
                textAlign: 'center',
                transition: 'all 0.2s ease'
              }}
            >
              View Evidence
            </button>
          )}

          <button
            onClick={handleSaveClick}
            style={{
              backgroundColor: 'rgba(255, 255, 255, 0.08)',
              color: '#FFFFFF',
              border: '1px solid rgba(255, 255, 255, 0.15)',
              borderRadius: 'var(--radius-lg)',
              padding: '12px',
              fontSize: '14px',
              fontWeight: 700,
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '8px',
              transition: 'all 0.2s ease'
            }}
          >
            {saved ? <Check size={16} color="#34D399" /> : <Bookmark size={16} />}
            <span>{saved ? 'Saved in History' : 'Save Result'}</span>
          </button>
        </div>
      </div>

      {/* Next Steps Checklist Card */}
      <div className="card" style={{ padding: '24px 28px' }}>
        <div style={{
          fontSize: '11px',
          fontWeight: 800,
          letterSpacing: '0.08em',
          color: 'var(--text-muted)',
          textTransform: 'uppercase',
          marginBottom: '16px'
        }}>
          NEXT STEPS
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
          {recommendation.nextSteps.map((step, idx) => (
            <div key={idx} style={{ display: 'flex', alignItems: 'flex-start', gap: '10px' }}>
              <span style={{
                fontSize: '13px',
                fontWeight: 800,
                color: 'var(--text-secondary)',
                lineHeight: 1.5
              }}>
                {idx + 1}.
              </span>
              <p style={{ fontSize: '14px', color: 'var(--ink)', lineHeight: 1.5 }}>
                {step}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
