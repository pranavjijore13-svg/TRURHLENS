'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Search, ArrowRight } from 'lucide-react';
import { InputType } from '@/lib/types';

export default function QuickVerifyCard() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<InputType>('TEXT');
  const [query, setQuery] = useState('');

  const tabs: InputType[] = ['TEXT', 'URL', 'IMAGE', 'SCREENSHOT', 'VIDEO', 'AUDIO'];

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!query.trim()) {
      router.push(`/verify?tab=${activeTab}`);
      return;
    }
    const encoded = encodeURIComponent(query.trim());
    router.push(`/verify?tab=${activeTab}&input=${encoded}`);
  };

  const getPlaceholder = () => {
    switch (activeTab) {
      case 'URL':
        return 'Paste article or webpage URL (e.g. https://bbc.com/news/...)...';
      case 'IMAGE':
      case 'SCREENSHOT':
        return 'Paste image claim or click to upload screenshot in verify workspace...';
      case 'VIDEO':
      case 'AUDIO':
        return 'Enter claim from broadcast or media file to cross-reference...';
      default:
        return "Paste a claim, message, article URL or information you're unsure about...";
    }
  };

  return (
    <div style={{
      backgroundColor: 'var(--ink)',
      borderRadius: 'var(--radius-2xl)',
      padding: '40px 36px',
      color: '#FFFFFF',
      boxShadow: '0 20px 50px rgba(14, 23, 38, 0.25)',
      position: 'relative',
      overflow: 'hidden',
      border: '1px solid rgba(255, 255, 255, 0.08)'
    }}>
      {/* Subtle blue accent aura top-right */}
      <div style={{
        position: 'absolute',
        top: '-100px',
        right: '-100px',
        width: '320px',
        height: '320px',
        borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(52, 70, 224, 0.25) 0%, rgba(52, 70, 224, 0) 70%)',
        pointerEvents: 'none'
      }} />

      <h2 style={{
        fontSize: '28px',
        fontWeight: 800,
        letterSpacing: '-0.02em',
        marginBottom: '8px'
      }}>
        What do you want to check?
      </h2>
      <p style={{
        fontSize: '15px',
        color: '#94A3B8',
        marginBottom: '28px'
      }}>
        Paste anything suspicious. TRUTHLENS finds the evidence behind it.
      </p>

      {/* Main input bar */}
      <form onSubmit={handleSearch} style={{
        display: 'flex',
        alignItems: 'center',
        backgroundColor: '#FFFFFF',
        borderRadius: 'var(--radius-xl)',
        padding: '6px 8px 6px 16px',
        gap: '12px',
        marginBottom: '20px',
        boxShadow: '0 8px 24px rgba(0,0,0,0.2)'
      }}>
        <Search size={20} color="#64748B" style={{ flexShrink: 0 }} />
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder={getPlaceholder()}
          style={{
            flex: 1,
            border: 'none',
            outline: 'none',
            fontSize: '15px',
            color: 'var(--ink)',
            backgroundColor: 'transparent',
            padding: '10px 0'
          }}
        />
        <button
          type="submit"
          style={{
            backgroundColor: 'var(--ink)',
            color: '#FFFFFF',
            border: 'none',
            borderRadius: 'var(--radius-lg)',
            padding: '12px 22px',
            fontSize: '13px',
            fontWeight: 700,
            letterSpacing: '0.03em',
            display: 'inline-flex',
            alignItems: 'center',
            gap: '8px',
            cursor: 'pointer',
            flexShrink: 0,
            transition: 'all 0.2s ease'
          }}
          onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.backgroundColor = '#1E293B'; }}
          onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.backgroundColor = 'var(--ink)'; }}
        >
          <span>CHECK WITH TRUTHLENS</span>
          <ArrowRight size={14} />
        </button>
      </form>

      {/* Segmented control tabs */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        gap: '8px',
        flexWrap: 'wrap'
      }}>
        {tabs.map((tab) => {
          const isSelected = activeTab === tab;
          return (
            <button
              key={tab}
              type="button"
              onClick={() => setActiveTab(tab)}
              style={{
                backgroundColor: isSelected ? 'var(--accent)' : 'rgba(255, 255, 255, 0.08)',
                color: isSelected ? '#FFFFFF' : '#94A3B8',
                border: 'none',
                borderRadius: 'var(--radius-full)',
                padding: '6px 16px',
                fontSize: '12px',
                fontWeight: 700,
                letterSpacing: '0.04em',
                cursor: 'pointer',
                transition: 'all 0.2s ease'
              }}
            >
              {tab}
            </button>
          );
        })}
      </div>
    </div>
  );
}
