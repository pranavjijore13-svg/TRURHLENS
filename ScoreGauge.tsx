'use client';

import React from 'react';
import { VerificationStatus } from '@/lib/types';

interface ScoreGaugeProps {
  score: number | null;
  status: VerificationStatus;
  size?: number;
  strokeWidth?: number;
  showBadge?: boolean;
}

export default function ScoreGauge({
  score,
  status,
  size = 180,
  strokeWidth = 14,
  showBadge = false
}: ScoreGaugeProps) {
  const isInsufficient = status === 'INSUFFICIENT EVIDENCE' || score === null;
  const validScore = isInsufficient ? 0 : Math.max(0, Math.min(100, score || 0));

  // Determine stroke color
  let strokeColor = 'var(--insufficient)';
  let badgeClass = 'badge-insufficient';

  if (!isInsufficient) {
    if (validScore >= 61) {
      strokeColor = 'var(--supported)';
      badgeClass = 'badge-supported';
    } else if (validScore >= 41) {
      strokeColor = 'var(--needs-review)';
      badgeClass = 'badge-needs-review';
    } else {
      strokeColor = 'var(--contradicted)';
      badgeClass = 'badge-contradicted';
    }
  }

  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  // Let the circle start from bottom or standard top. Page 4 and 12 show an open or complete ring with green stroke
  const strokeDashoffset = circumference - (validScore / 100) * circumference;

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '16px' }}>
      <div style={{ position: 'relative', width: size, height: size }}>
        <svg width={size} height={size} style={{ transform: 'rotate(-90deg)' }}>
          {/* Track ring */}
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            stroke="rgba(14, 23, 38, 0.08)"
            strokeWidth={strokeWidth}
            fill="none"
          />
          {/* Active progress arc */}
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            stroke={strokeColor}
            strokeWidth={strokeWidth}
            strokeDasharray={circumference}
            strokeDashoffset={isInsufficient ? circumference : strokeDashoffset}
            strokeLinecap="round"
            fill="none"
            style={{
              transition: 'stroke-dashoffset 1.2s cubic-bezier(0.16, 1, 0.3, 1)',
            }}
          />
        </svg>

        {/* Center label */}
        <div style={{
          position: 'absolute',
          inset: 0,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          textAlign: 'center',
          pointerEvents: 'none'
        }}>
          <span style={{
            fontSize: size > 120 ? '42px' : '26px',
            fontWeight: 800,
            lineHeight: 1,
            color: 'var(--ink)'
          }}>
            {isInsufficient ? '—' : validScore}
          </span>
          <span style={{
            fontSize: size > 120 ? '14px' : '11px',
            fontWeight: 600,
            color: 'var(--text-muted)',
            marginTop: '4px'
          }}>
            {isInsufficient ? 'NO SCORE' : '/ 100'}
          </span>
        </div>
      </div>

      {showBadge && (
        <span className={`badge ${badgeClass}`} style={{ fontSize: '13px', padding: '6px 16px' }}>
          {status}
        </span>
      )}
    </div>
  );
}
