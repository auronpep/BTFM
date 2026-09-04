import { statuteDict, getStatuteKey, type StatuteInfo } from '../data/statutes';
import React from 'react';

interface StatuteHoverCardProps {
  statuteText: string;
  statuteInfo: StatuteInfo;
}

export const StatuteHoverCard: React.FC<StatuteHoverCardProps> = ({ statuteText, statuteInfo }) => {
  return (
    <span className="group relative border-b border-dotted border-burgundy text-ink hover:text-burgundy font-semibold inline cursor-help duration-150 transition-colors focus-within:outline-none focus-within:ring-2 focus-within:ring-burgundy/20 rounded">
      {statuteText}
      
      {/* Tooltip Hover Card */}
      <span className="invisible group-hover:visible group-focus-within:visible opacity-0 group-hover:opacity-100 transition-all duration-200 absolute bottom-full left-1/2 -translate-x-1/2 mb-2.5 w-72 p-3 bg-ink text-paper text-[11px] rounded-lg shadow-xl border border-brass/40 z-50 font-sans font-medium text-left leading-relaxed">
        <span className="block text-[9px] font-extrabold uppercase tracking-widest text-brass mb-1 border-b border-paper/10 pb-1">
          {statuteInfo.standard}
        </span>
        <span className="block text-white">
          {statuteInfo.desc}
        </span>
        <span className="block text-[9px] text-brass/75 font-semibold mt-1.5 italic text-right font-sans">
          Click or focus for detail
        </span>
        {/* Arrow tooltip */}
        <span className="absolute top-full left-1/2 -translate-x-1/2 -mt-1 border-4 border-transparent border-t-ink" />
      </span>
    </span>
  );
};

// Robust text parser compiling matching statutory citations and glossary terms
export const parseTextWithStatutesAndGlossary = (text: string): React.ReactNode[] => {
  if (!text) return [];

  // Match: Glossary Terms or Statute Citations (including full or short names)
  const regex = /(self-dealing|rebuttable presumption|donor intent|duty of care|duty of loyalty|\bquorum\b|interested director|interested person|ultra vires|CA Corp Code § \d+(?:\.\d+)?(?:\([a-z0-9]+\))*(?:\(\d\))*|CA Gov Code § \d+[\w\d().]*|CA UI Code § \d+|\bIRC § \d+\b|UPMIFA|California Corporations Code § \d+[\w\d().]*|California Government Code § \d+[\w\d().]*|California Unemployment Insurance Code § \d+[\w\d().]*|California Labor Code § \d+[\w\d().]*)/gi;
  
  const parts = text.split(regex);
  
  return parts.map((part, i) => {
    if (!part) return '';
    const lower = part.toLowerCase();
    
    // Check if matching a statutory citation
    const statuteKey = getStatuteKey(part);
    if (statuteDict[statuteKey]) {
      return (
        <StatuteHoverCard 
          key={`stat-${i}`} 
          statuteText={part} 
          statuteInfo={statuteDict[statuteKey]} 
        />
      );
    }

    // Check if matching a glossary term
    let termId = '';
    if (lower === 'self-dealing') termId = 'self-dealing';
    else if (lower === 'rebuttable presumption') termId = 'rebuttable-presumption';
    else if (lower === 'donor intent') termId = 'donor-intent';
    else if (lower === 'duty of care') termId = 'duty-of-care';
    else if (lower === 'duty of loyalty') termId = 'duty-of-loyalty';
    else if (lower === 'quorum') termId = 'quorum';
    else if (lower === 'interested director' || lower === 'interested person') termId = 'interested-director';
    else if (lower === 'ultra vires') termId = 'ultra-vires';

    if (termId) {
      return (
        <span 
          key={`gloss-${i}`} 
          className="glossary-term cursor-help border-b border-dotted border-brass/80 text-ink hover:text-brass transition-all font-semibold inline duration-150"
          data-term={termId}
          title="Click to open Fiduciary Glossary definition"
        >
          {part}
        </span>
      );
    }

    return part;
  });
};
