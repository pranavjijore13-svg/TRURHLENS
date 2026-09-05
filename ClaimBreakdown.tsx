'use client';

import React, { useState } from 'react';
import { Claim } from '@/lib/types';
import { ExternalLink, ChevronUp, ChevronDown } from 'lucide-react';

interface ClaimBreakdownProps {
  claims: Claim[];
}

export default function ClaimBreakdown({ claims }: ClaimBreakdownProps) {
  const [activeFilter, setActiveFilter] = useState<string>('ALL');
  // Expand first or second claim by default if available
  const [expandedClaimIds, setExpandedClaimIds] = useState<Record<string, boolean>>({
    [claims[1]?.id || claims[0]?.id || '']: true
  });

  const toggleClaim = (id: string) => {
    setExpandedClaimIds((prev) => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  const supportedCount = claims.filter(c => c.status === 'SUPPORTED' || c.status === 'PARTIALLY SUPPORTED').length;
  const reviewCount = claims.filter(c => c.status === 'NEEDS REVIEW').length;
  const contradictedCount = claims.filter(c => c.status === 'CONTRADICTED').length;
  const insufficientCount = claims.filter(c => c.status === 'INSUFFICIENT EVIDENCE').length;

  const filteredClaims = claims.filter((claim) => {
    if (activeFilter === 'SUPPORTED') return claim.status === 'SUPPORTED' || claim.status === 'PARTIALLY SUPPORTED';
    if (activeFilter === 'NEEDS REVIEW') return claim.status === 'NEEDS REVIEW';
    if (activeFilter === 'CONTRADICTED') return claim.status === 'CONTRADICTED';
    if (activeFilter === 'INSUFFICIENT') return claim.status === 'INSUFFICIENT EVIDENCE';
    return true;
  });

  const getStatusBadge = (status: Claim['status']) => {
    switch (status) {
      case 'SUPPORTED':
      case 'PARTIALLY SUPPORTED':
        return <span className="badge badge-supported">{status}</span>;
      case 'NEEDS REVIEW':
        return <span className="badge badge-needs-review">{status}</span>;
      case 'CONTRADICTED':
        return <span className="badge badge-contradicted">{status}</span>;
      default:
        return <span className="badge badge-insufficient">{status}</span>;
    }
  };

  return (
    <section style={{ marginTop: '48px' }}>
      {/* Header and Filter Row */}
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
            Claim-by-Claim Analysis
          </h2>
          <p style={{ fontSize: '15px', color: 'var(--text-secondary)', marginTop: '4px' }}>
            {claims.length} claims were extracted from the submitted content. {reviewCount > 0 ? `${reviewCount} need review.` : 'All claims cross-referenced.'}
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
            ALL {claims.length}
          </button>

          {supportedCount > 0 && (
            <button
              onClick={() => setActiveFilter('SUPPORTED')}
              style={{
                backgroundColor: activeFilter === 'SUPPORTED' ? 'var(--supported)' : 'var(--supported-bg)',
                color: activeFilter === 'SUPPORTED' ? '#FFFFFF' : 'var(--supported)',
                border: 'none',
                borderRadius: 'var(--radius-full)',
                padding: '6px 14px',
                fontSize: '12px',
                fontWeight: 700,
                cursor: 'pointer'
              }}
            >
              SUPPORTED {supportedCount}
            </button>
          )}

          {reviewCount > 0 && (
            <button
              onClick={() => setActiveFilter('NEEDS REVIEW')}
              style={{
                backgroundColor: activeFilter === 'NEEDS REVIEW' ? 'var(--needs-review)' : 'var(--needs-review-bg)',
                color: activeFilter === 'NEEDS REVIEW' ? '#FFFFFF' : 'var(--needs-review)',
                border: 'none',
                borderRadius: 'var(--radius-full)',
                padding: '6px 14px',
                fontSize: '12px',
                fontWeight: 700,
                cursor: 'pointer'
              }}
            >
              NEEDS REVIEW {reviewCount}
            </button>
          )}

          {contradictedCount > 0 && (
            <button
              onClick={() => setActiveFilter('CONTRADICTED')}
              style={{
                backgroundColor: activeFilter === 'CONTRADICTED' ? 'var(--contradicted)' : 'var(--contradicted-bg)',
                color: activeFilter === 'CONTRADICTED' ? '#FFFFFF' : 'var(--contradicted)',
                border: 'none',
                borderRadius: 'var(--radius-full)',
                padding: '6px 14px',
                fontSize: '12px',
                fontWeight: 700,
                cursor: 'pointer'
              }}
            >
              CONTRADICTED {contradictedCount}
            </button>
          )}
        </div>
      </div>

      {/* Claim Cards List */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
        {filteredClaims.map((claim, index) => {
          const isExpanded = !!expandedClaimIds[claim.id];

          return (
            <div
              key={claim.id}
              className="card"
              style={{
                padding: isExpanded ? '28px 32px' : '20px 28px',
                transition: 'all 0.2s ease',
              }}
            >
              {/* Claim Top Header */}
              <div style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                flexWrap: 'wrap',
                gap: '16px'
              }}>
                <div style={{ flex: 1, minWidth: '260px' }}>
                  <span style={{
                    fontSize: '11px',
                    fontWeight: 800,
                    letterSpacing: '0.08em',
                    color: 'var(--text-muted)',
                    textTransform: 'uppercase',
                    display: 'block',
                    marginBottom: '4px'
                  }}>
                    CLAIM {String(claim.claimNumber || index + 1).padStart(2, '0')}
                  </span>
                  <h3 style={{
                    fontSize: '18px',
                    fontWeight: 700,
                    color: 'var(--ink)',
                    lineHeight: 1.4
                  }}>
                    "{claim.text}"
                  </h3>
                </div>

                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '16px',
                  flexShrink: 0
                }}>
                  {getStatusBadge(claim.status)}

                  <span style={{ fontSize: '13px', color: 'var(--text-secondary)' }}>
                    {claim.supportingCount} supporting · {claim.conflictingCount} conflicting
                  </span>

                  <button
                    onClick={() => toggleClaim(claim.id)}
                    style={{
                      background: 'none',
                      border: 'none',
                      color: 'var(--accent)',
                      fontSize: '13px',
                      fontWeight: 700,
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '4px',
                      padding: '4px'
                    }}
                  >
                    <span>{isExpanded ? 'Collapse' : 'View Evidence'}</span>
                    {isExpanded ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                  </button>
                </div>
              </div>

              {/* Expanded Detail View */}
              {isExpanded && (
                <div style={{
                  marginTop: '24px',
                  paddingTop: '20px',
                  borderTop: '1px solid var(--border)'
                }}>
                  {/* Explanation paragraph */}
                  <div style={{ marginBottom: '20px' }}>
                    <div style={{
                      fontSize: '11px',
                      fontWeight: 800,
                      letterSpacing: '0.08em',
                      color: 'var(--text-muted)',
                      textTransform: 'uppercase',
                      marginBottom: '6px'
                    }}>
                      EXPLANATION
                    </div>
                    <p style={{ fontSize: '15px', color: 'var(--ink)', lineHeight: 1.6 }}>
                      {claim.explanation}
                    </p>
                  </div>

                  {/* Sources tag list */}
                  {claim.sources && claim.sources.length > 0 && (
                    <div style={{ marginBottom: '24px' }}>
                      <div style={{
                        fontSize: '11px',
                        fontWeight: 800,
                        letterSpacing: '0.08em',
                        color: 'var(--text-muted)',
                        textTransform: 'uppercase',
                        marginBottom: '8px'
                      }}>
                        SOURCES
                      </div>
                      <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                        {claim.sources.map((src) => (
                          <span
                            key={src}
                            style={{
                              backgroundColor: 'var(--surface-alt)',
                              border: '1px solid var(--border)',
                              borderRadius: 'var(--radius-md)',
                              padding: '6px 14px',
                              fontSize: '13px',
                              fontWeight: 600,
                              color: 'var(--text-secondary)'
                            }}
                          >
                            {src}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Side-by-Side Evidence Comparison Cards */}
                  {(claim.supportingEvidence || claim.contradictoryEvidence) && (
                    <div style={{
                      display: 'grid',
                      gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
                      gap: '16px',
                      marginTop: '16px'
                    }}>
                      {/* Supporting Evidence Card */}
                      {claim.supportingEvidence && (
                        <div style={{
                          backgroundColor: 'var(--supported-bg)',
                          border: '1px solid var(--supported-border)',
                          borderRadius: 'var(--radius-lg)',
                          padding: '20px',
                          display: 'flex',
                          flexDirection: 'column',
                          justifyContent: 'space-between'
                        }}>
                          <div>
                            <span style={{
                              fontSize: '11px',
                              fontWeight: 800,
                              letterSpacing: '0.08em',
                              color: 'var(--supported)',
                              textTransform: 'uppercase',
                              display: 'block',
                              marginBottom: '8px'
                            }}>
                              SUPPORTING EVIDENCE
                            </span>
                            <h4 style={{ fontSize: '15px', fontWeight: 700, color: 'var(--ink)', marginBottom: '10px' }}>
                              {claim.supportingEvidence.title}
                            </h4>
                            <p style={{ fontSize: '14px', color: 'var(--text-secondary)', lineHeight: 1.5, marginBottom: '16px' }}>
                              {claim.supportingEvidence.excerpt}
                            </p>
                          </div>

                          <a
                            href={claim.supportingEvidence.url || '#'}
                            target="_blank"
                            rel="noopener noreferrer"
                            style={{
                              display: 'inline-flex',
                              alignItems: 'center',
                              gap: '6px',
                              color: 'var(--supported)',
                              fontSize: '13px',
                              fontWeight: 700
                            }}
                          >
                            <span>Open Source</span>
                            <ExternalLink size={14} />
                          </a>
                        </div>
                      )}

                      {/* Contradictory Evidence Card */}
                      {claim.contradictoryEvidence && (
                        <div style={{
                          backgroundColor: 'var(--contradicted-bg)',
                          border: '1px solid var(--contradicted-border)',
                          borderRadius: 'var(--radius-lg)',
                          padding: '20px',
                          display: 'flex',
                          flexDirection: 'column',
                          justifyContent: 'space-between'
                        }}>
                          <div>
                            <span style={{
                              fontSize: '11px',
                              fontWeight: 800,
                              letterSpacing: '0.08em',
                              color: 'var(--contradicted)',
                              textTransform: 'uppercase',
                              display: 'block',
                              marginBottom: '8px'
                            }}>
                              CONTRADICTORY EVIDENCE
                            </span>
                            <h4 style={{ fontSize: '15px', fontWeight: 700, color: 'var(--ink)', marginBottom: '10px' }}>
                              {claim.contradictoryEvidence.title}
                            </h4>
                            <p style={{ fontSize: '14px', color: 'var(--text-secondary)', lineHeight: 1.5, marginBottom: '16px' }}>
                              {claim.contradictoryEvidence.excerpt}
                            </p>
                          </div>

                          <a
                            href={claim.contradictoryEvidence.url || '#'}
                            target="_blank"
                            rel="noopener noreferrer"
                            style={{
                              display: 'inline-flex',
                              alignItems: 'center',
                              gap: '6px',
                              color: 'var(--contradicted)',
                              fontSize: '13px',
                              fontWeight: 700
                            }}
                          >
                            <span>Open Source</span>
                            <ExternalLink size={14} />
                          </a>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </section>
  );
}
