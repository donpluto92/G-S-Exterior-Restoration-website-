import React from 'react';
import { useLanguage } from '@/contexts/LanguageContext';

export const LanguageToggle: React.FC = () => {
  const { language, setLanguage } = useLanguage();

  return (
    <div className="flex items-center gap-2 px-3 py-2 rounded-lg border" style={{ borderColor: 'oklch(0.88 0.025 80)' }}>
      <button
        onClick={() => setLanguage('en')}
        className="px-3 py-1 rounded text-sm font-semibold transition-all duration-200"
        style={{
          backgroundColor: language === 'en' ? 'oklch(0.72 0.12 75)' : 'transparent',
          color: language === 'en' ? 'oklch(0.20 0.06 155)' : 'oklch(0.45 0.04 155)',
          fontFamily: "'Barlow Condensed', sans-serif",
        }}
      >
        EN
      </button>
      <div style={{ width: '1px', height: '16px', backgroundColor: 'oklch(0.88 0.025 80)' }} />
      <button
        onClick={() => setLanguage('es')}
        className="px-3 py-1 rounded text-sm font-semibold transition-all duration-200"
        style={{
          backgroundColor: language === 'es' ? 'oklch(0.72 0.12 75)' : 'transparent',
          color: language === 'es' ? 'oklch(0.20 0.06 155)' : 'oklch(0.45 0.04 155)',
          fontFamily: "'Barlow Condensed', sans-serif",
        }}
      >
        ES
      </button>
    </div>
  );
};
