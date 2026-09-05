'use client';

import React from 'react';

export interface ToastMessage {
  id: string;
  type: 'success' | 'warning';
  text: string;
}

interface ToastProps {
  toasts: ToastMessage[];
  onDismiss: (id: string) => void;
}

export default function Toast({ toasts, onDismiss }: ToastProps) {
  if (toasts.length === 0) return null;

  return (
    <div className="toast-container">
      {toasts.map((t) => (
        <div
          key={t.id}
          className={`toast ${t.type === 'success' ? 'toast-dark' : 'toast-warning'}`}
          onClick={() => onDismiss(t.id)}
          style={{ cursor: 'pointer' }}
        >
          <div style={{
            width: '8px',
            height: '8px',
            borderRadius: '50%',
            backgroundColor: t.type === 'success' ? 'var(--supported)' : 'var(--needs-review)',
            flexShrink: 0
          }} />
          <span>{t.text}</span>
        </div>
      ))}
    </div>
  );
}
