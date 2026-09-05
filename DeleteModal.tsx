'use client';

import React from 'react';

interface DeleteModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title?: string;
  description?: string;
}

export default function DeleteModal({
  isOpen,
  onClose,
  onConfirm,
  title = 'Delete this verification?',
  description = 'The result and its saved evidence will be removed from your history.'
}: DeleteModalProps) {
  if (!isOpen) return null;

  return (
    <div style={{
      position: 'fixed',
      inset: 0,
      backgroundColor: 'rgba(14, 23, 38, 0.6)',
      backdropFilter: 'blur(4px)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      zIndex: 9999,
      padding: '24px'
    }}>
      <div style={{
        backgroundColor: '#FFFFFF',
        borderRadius: 'var(--radius-xl)',
        padding: '32px',
        maxWidth: '440px',
        width: '100%',
        boxShadow: 'var(--shadow-elevated)',
        animation: 'modalIn 0.2s ease-out'
      }}>
        <h3 style={{ fontSize: '20px', fontWeight: 800, color: 'var(--ink)', marginBottom: '8px' }}>
          {title}
        </h3>
        <p style={{ fontSize: '14px', color: 'var(--text-secondary)', lineHeight: 1.5, marginBottom: '28px' }}>
          {description}
        </p>

        <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '12px' }}>
          <button
            onClick={onClose}
            className="btn-tertiary"
            style={{ padding: '10px 20px', fontSize: '14px' }}
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            style={{
              backgroundColor: 'var(--contradicted)',
              color: '#FFFFFF',
              border: 'none',
              borderRadius: 'var(--radius-lg)',
              padding: '10px 24px',
              fontSize: '14px',
              fontWeight: 700,
              cursor: 'pointer',
              transition: 'background 0.2s ease'
            }}
            onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.backgroundColor = '#a32f22'; }}
            onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.backgroundColor = 'var(--contradicted)'; }}
          >
            Delete
          </button>
        </div>
      </div>

      <style jsx>{`
        @keyframes modalIn {
          from { opacity: 0; transform: scale(0.95); }
          to { opacity: 1; transform: scale(1); }
        }
      `}</style>
    </div>
  );
}
