'use client';

import React, { useState } from 'react';
import { VerificationResult } from '@/lib/types';

interface EvidenceGraphProps {
  graph: VerificationResult['graph'];
  onNodeClick?: (sourceDomain?: string) => void;
}

export default function EvidenceGraph({ graph, onNodeClick }: EvidenceGraphProps) {
  const [selectedNodeId, setSelectedNodeId] = useState<string | null>(null);

  const sources = graph.nodes.filter(n => n.type === 'source');
  const claimNode = graph.nodes.find(n => n.type === 'claim') || { id: 'claim-center', label: 'CLAIM', type: 'claim' };

  // Arrange sources around the claim node
  // In page-8.png:
  // Source A: Top Left
  // Source B: Top Right
  // Source C: Bottom Left
  // Source D: Bottom Right
  const positions: Record<number, { x: number; y: number; labelX: number; labelY: number; line: string }> = {
    0: { x: 120, y: 70, labelX: 190, labelY: 130, line: 'M 190 95 C 220 95, 230 180, 260 200' }, // Source A
    1: { x: 380, y: 70, labelX: 350, labelY: 130, line: 'M 380 95 C 340 95, 330 180, 300 200' }, // Source B
    2: { x: 120, y: 310, labelX: 190, labelY: 250, line: 'M 190 330 C 220 330, 230 220, 260 200' }, // Source C
    3: { x: 380, y: 310, labelX: 350, labelY: 250, line: 'M 380 330 C 340 330, 330 220, 300 200' }, // Source D
  };

  return (
    <div className="card" style={{ padding: '32px', position: 'relative', overflow: 'hidden' }}>
      <div style={{ marginBottom: '20px' }}>
        <h3 style={{ fontSize: '20px', fontWeight: 800, color: 'var(--ink)' }}>
          Evidence Relationship Graph
        </h3>
        <p style={{ fontSize: '14px', color: 'var(--text-secondary)' }}>
          How each source relates to the central claim.
        </p>
      </div>

      {/* SVG Canvas */}
      <div style={{ position: 'relative', width: '100%', height: '420px' }}>
        <svg viewBox="0 0 560 420" style={{ width: '100%', height: '100%' }}>
          {/* Render connecting paths */}
          {sources.slice(0, 4).map((source, idx) => {
            const edge = graph.edges.find(e => e.from === source.id);
            const rel = edge?.relationship || source.relationship || 'CONTEXT';
            const isContradict = rel === 'CONTRADICTS';
            const isSupport = rel === 'SUPPORTS';
            const strokeColor = isSupport ? '#12805C' : isContradict ? '#C0392B' : '#6B7280';
            const pos = positions[idx] || positions[0];

            return (
              <g key={`edge-${source.id}`}>
                <path
                  d={pos.line}
                  fill="none"
                  stroke={strokeColor}
                  strokeWidth="2.5"
                  strokeDasharray={isContradict ? '6 4' : undefined}
                  style={{ transition: 'stroke-width 0.2s ease' }}
                />
                <text
                  x={pos.labelX}
                  y={pos.labelY}
                  fill={strokeColor}
                  fontSize="10"
                  fontWeight="800"
                  letterSpacing="0.06em"
                  textAnchor="middle"
                >
                  {rel}
                </text>
              </g>
            );
          })}

          {/* Central CLAIM node */}
          <g>
            <circle
              cx="280"
              cy="200"
              r="62"
              fill="#0E1726"
              stroke="#FFFFFF"
              strokeWidth="4"
              style={{ filter: 'drop-shadow(0 8px 24px rgba(14,23,38,0.25))' }}
            />
            <text
              x="280"
              y="205"
              fill="#FFFFFF"
              fontSize="14"
              fontWeight="800"
              letterSpacing="0.08em"
              textAnchor="middle"
            >
              CLAIM
            </text>
          </g>

          {/* Source Nodes */}
          {sources.slice(0, 4).map((source, idx) => {
            const pos = positions[idx] || positions[0];
            const isSelected = selectedNodeId === source.id;
            const isSupport = source.relationship === 'SUPPORTS';
            const isContradict = source.relationship === 'CONTRADICTS';
            const bgColor = isSupport ? '#EAF6F0' : isContradict ? '#FDEDEC' : '#F3F4F6';
            const borderColor = isSupport ? '#12805C' : isContradict ? '#C0392B' : '#9CA3AF';

            return (
              <g
                key={source.id}
                onClick={() => {
                  setSelectedNodeId(source.id);
                  if (onNodeClick) onNodeClick(source.domain);
                }}
                style={{ cursor: 'pointer' }}
              >
                {/* Node Box */}
                <rect
                  x={pos.x - 70}
                  y={pos.y - 28}
                  width="140"
                  height="56"
                  rx="14"
                  fill={bgColor}
                  stroke={isSelected ? 'var(--accent)' : borderColor}
                  strokeWidth={isSelected ? '2.5' : '1.5'}
                  style={{ filter: 'drop-shadow(0 2px 8px rgba(14,23,38,0.06))' }}
                />
                <text
                  x={pos.x}
                  y={pos.y - 4}
                  fill="#0E1726"
                  fontSize="12"
                  fontWeight="800"
                  textAnchor="middle"
                >
                  {source.label}
                </text>
                <text
                  x={pos.x}
                  y={pos.y + 14}
                  fill="#5F6B7D"
                  fontSize="10"
                  fontWeight="500"
                  textAnchor="middle"
                >
                  {source.domain?.split('·')[0]?.trim() || 'Verified Source'}
                </text>
              </g>
            );
          })}
        </svg>
      </div>

      {/* Legend at bottom (page-8.png) */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '28px',
        flexWrap: 'wrap',
        paddingTop: '16px',
        borderTop: '1px solid var(--border)',
        fontSize: '13px',
        fontWeight: 700
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--supported)' }}>
          <span style={{ width: '16px', height: '3px', backgroundColor: 'var(--supported)', display: 'inline-block' }} />
          <span>SUPPORTS ({graph.balance.supports})</span>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--contradicted)' }}>
          <span style={{ width: '16px', height: '0px', borderTop: '3px dashed var(--contradicted)', display: 'inline-block' }} />
          <span>CONTRADICTS ({graph.balance.contradicts})</span>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--insufficient)' }}>
          <span style={{ width: '16px', height: '3px', backgroundColor: 'var(--insufficient)', display: 'inline-block' }} />
          <span>CONTEXT ({graph.balance.context})</span>
        </div>
      </div>
    </div>
  );
}
