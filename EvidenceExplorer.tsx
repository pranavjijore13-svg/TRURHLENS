'use client';

import React, { useState } from 'react';
import { EvidenceItem } from '@/lib/types';
import { ExternalLink, ArrowRight } from 'lucide-react';

interface EvidenceExplorerProps {
  evidence: EvidenceItem[];
  onOpenGraph?: () => void;
}

export default function EvidenceExplorer({ evidence, onOpenGraph }: EvidenceExplorerProps) {
  const [activeFilter, setActiveFilter] = useState<string>('ALL');

  const supportsCount = evidence.filter(e => e.relationship === 'SUPPORTS CLAIM').length;
  const contradictsCount = evidence.filter(e => e.relationship === 'CONTRADICTS CLAIM').length;
  const contextCount = evidence.filter(e => e.relationship === 'CONTEXT').length;

  const filteredEvidence = evidence.filter(item => {
    if (activeFilter === 'SUPPORTS') return item.relationship === 'SUPPORTS CLAIM';
    if (activeFilter === 'CONTRADICTS') return item.relationship === 'CONTRADICTS CLAIM';
    if (activeFilter === 'CONTEXT') return item.relationship === 'CONTEXT';
    return true;
  });

  const getRelationshipBadge = (rel: EvidenceItem['relationship']) => {
    switch (rel) {
      case 'SUPPORTS CLAIM':
        return <span className="badge badge-supported">SUPPORTS CLAIM</span>;
      case 'CONTRADICTS CLAIM':
        return <span className="badge badge-contradicted">CONTRADICTS CLAIM</span>;
      default:
        return <span className="badge badge-insufficient">CONTEXT</span>;
    }
  };

  const getCredibilityBadge = (cred: EvidenceItem['credibility']) => {
    switch (cred) {
      case 'HIGH':
        return <span style={{ fontSize: '11px', fontWeight: 700, color: 'var(--supported)', backgroundColor: 'var(--supported-bg)', padding: '3px 8px', borderRadius: '4px' }}>CREDIBILITY: HIGH</span>;
      case 'MEDIUM':
        return <span style={{ fontSize: '11px', fontWeight: 700, color: 'var(--needs-review)', backgroundColor: 'var(--needs-review-bg)', padding: '3px 8px', borderRadius: '4px' }}>CREDIBILITY: MEDIUM</span>;
      case 'LOW':
        return <span style={{ fontSize: '11px', fontWeight: 700, color: 'var(--contradicted)', backgroundColor: 'var(--contradicted-bg)', padding: '3px 8px', borderRadius: '4px' }}>CREDIBILITY: LOW</span>;
      default:
        return <span style={{ fontSize: '11px', fontWeight: 700, color: 'var(--insufficient)', backgroundColor: 'var(--insufficient-bg)', padding: '3px 8px', borderRadius: '4px' }}>CREDIBILITY: UNKNOWN</span>;
    }
  };

  return (
    <section style={{ marginTop: '48px' }}>
      {/* Explorer Header */}
      <div style={{
        display: 'flex',
        alignItems: 'flex-start',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
        gap: '20px',
        marginBottom: '28px'
      }}>
        <div>
          <h2 style={{ fontSize: '32px', fontWeight: 800, letterSpacing: '-0.02em', color: 'var(--ink)' }}>
            Evidence Explorer
          </h2>
          <p style={{ fontSize: '15px', color: 'var(--text-secondary)', marginTop: '4px' }}>
            {evidence.length} pieces of evidence grouped by how they relate to the claim.
          </p>
        </div>

        {/* Filter Pills */}
        <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
          <button
            onClick={() => setActiveFilter('ALL')}
            style={{
              backgroundColor: activeFilter === 'ALL' ? 'var(--ink)' : 'var(--surface)',
              color: activeFilter === 'ALL' ? '#FFFFFF' : 'var(--text-secondary)',
              border: '1px solid var(--border)',
              borderRadius: 'var(--radius-full)',
              padding: '6px 14px',
              fontSize: '12px',
              fontWeight: 700,
              cursor: 'pointer'
            }}
          >
            ALL {evidence.length}
          </button>

          <button
            onClick={() => setActiveFilter('SUPPORTS')}
            style={{
              backgroundColor: activeFilter === 'SUPPORTS' ? 'var(--supported)' : 'var(--surface)',
              color: activeFilter === 'SUPPORTS' ? '#FFFFFF' : 'var(--supported)',
              border: '1px solid var(--border)',
              borderRadius: 'var(--radius-full)',
              padding: '6px 14px',
              fontSize: '12px',
              fontWeight: 700,
              cursor: 'pointer'
            }}
          >
            SUPPORTS {supportsCount}
          </button>

          <button
            onClick={() => setActiveFilter('CONTRADICTS')}
            style={{
              backgroundColor: activeFilter === 'CONTRADICTS' ? 'var(--contradicted)' : 'var(--surface)',
              color: activeFilter === 'CONTRADICTS' ? '#FFFFFF' : 'var(--contradicted)',
              border: '1px solid var(--border)',
              borderRadius: 'var(--radius-full)',
              padding: '6px 14px',
              fontSize: '12px',
              fontWeight: 700,
              cursor: 'pointer'
            }}
          >
            CONTRADICTS {contradictsCount}
          </button>

          <button
            onClick={() => setActiveFilter('CONTEXT')}
            style={{
              backgroundColor: activeFilter === 'CONTEXT' ? 'var(--insufficient)' : 'var(--surface)',
              color: activeFilter === 'CONTEXT' ? '#FFFFFF' : 'var(--text-secondary)',
              border: '1px solid var(--border)',
              borderRadius: 'var(--radius-full)',
              padding: '6px 14px',
              fontSize: '12px',
              fontWeight: 700,
              cursor: 'pointer'
            }}
          >
            CONTEXT {contextCount}
          </button>
        </div>
      </div>

      {/* Grid of Evidence Cards */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))',
        gap: '24px'
      }}>
        {filteredEvidence.map((item) => (
          <div
            key={item.id}
            className="card card-hover"
            style={{
              padding: '24px',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between'
            }}
          >
            <div>
              <div style={{ marginBottom: '14px' }}>
                {getRelationshipBadge(item.relationship)}
              </div>

              <h3 style={{ fontSize: '18px', fontWeight: 800, color: 'var(--ink)', marginBottom: '4px' }}>
                {item.sourceName}
              </h3>

              <div style={{ fontSize: '13px', color: 'var(--text-muted)', marginBottom: '14px' }}>
                {item.domain} · {item.publishDate}
              </div>

              <p style={{
                fontSize: '14px',
                color: 'var(--text-primary)',
                lineHeight: 1.6,
                fontStyle: 'italic',
                marginBottom: '20px'
              }}>
                {item.excerpt}
              </p>
            </div>

            <div style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              paddingTop: '16px',
              borderTop: '1px solid var(--border)'
            }}>
              <div>{getCredibilityBadge(item.credibility)}</div>

              <a
                href={item.url || '#'}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '6px',
                  color: 'var(--accent)',
                  fontSize: '13px',
                  fontWeight: 700
                }}
              >
                <span>Open Source</span>
                <ExternalLink size={14} />
              </a>
            </div>
          </div>
        ))}

        {/* Dark Evidence Balance Summary Card (page-6.png) */}
        <div
          style={{
            backgroundColor: 'var(--ink)',
            color: '#FFFFFF',
            borderRadius: 'var(--radius-xl)',
            padding: '28px',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            border: '1px solid rgba(255, 255, 255, 0.08)'
          }}
        >
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
              EVIDENCE BALANCE
            </span>

            <h3 style={{ fontSize: '24px', fontWeight: 800, marginBottom: '16px' }}>
              {supportsCount} support · {contradictsCount} conflict
            </h3>

            {/* Proportion Bar */}
            <div style={{
              width: '100%',
              height: '8px',
              borderRadius: '4px',
              backgroundColor: 'rgba(255, 255, 255, 0.1)',
              display: 'flex',
              overflow: 'hidden',
              marginBottom: '16px'
            }}>
              <div style={{
                width: `${(supportsCount / Math.max(1, supportsCount + contradictsCount + contextCount)) * 100}%`,
                height: '100%',
                backgroundColor: 'var(--supported)'
              }} />
              <div style={{
                width: `${(contradictsCount / Math.max(1, supportsCount + contradictsCount + contextCount)) * 100}%`,
                height: '100%',
                backgroundColor: 'var(--contradicted)'
              }} />
            </div>

            <p style={{ fontSize: '13px', color: '#94A3B8', lineHeight: 1.6, marginBottom: '24px' }}>
              Weighting favours support, but conflicting points are preserved and examined transparently rather than hidden.
            </p>
          </div>

          {onOpenGraph && (
            <button
              onClick={onOpenGraph}
              style={{
                backgroundColor: '#FFFFFF',
                color: 'var(--ink)',
                border: 'none',
                borderRadius: 'var(--radius-lg)',
                padding: '12px 20px',
                fontSize: '13px',
                fontWeight: 700,
                cursor: 'pointer',
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '8px'
              }}
            >
              <span>Open Source Graph</span>
              <ArrowRight size={14} />
            </button>
          )}
        </div>
      </div>
    </section>
  );
}
