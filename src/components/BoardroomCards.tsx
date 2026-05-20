import React from 'react';
import { HelpCircle, AlertTriangle, FileText, ShieldAlert, Award, ExternalLink } from 'lucide-react';

// ==========================================
// 1. BOARDROOM RULE CARD
// ==========================================
interface BoardroomRuleCardProps {
  ruleNumber?: number | string;
  title: string;
  children: React.ReactNode;
}

export const BoardroomRuleCard: React.FC<BoardroomRuleCardProps> = ({ ruleNumber, title, children }) => {
  return (
    <div className="bg-white border-l-4 border-brass p-6 rounded-r-lg shadow-sm hover:shadow-md transition-premium border border-fog/80 relative overflow-hidden group">
      <div className="absolute top-0 right-0 w-16 h-16 bg-brass/5 rounded-bl-full -mr-2 -mt-2 group-hover:bg-brass/10 transition-premium" />
      <div className="flex items-start gap-4">
        {ruleNumber && (
          <div className="bg-brass text-ink font-sans font-extrabold text-xs px-2.5 py-1 rounded tracking-wider uppercase shrink-0 mt-0.5 shadow-sm">
            Rule {ruleNumber}
          </div>
        )}
        <div className="space-y-2">
          <h4 className="font-serif font-bold text-lg text-ink leading-tight tracking-wide">
            {title}
          </h4>
          <div className="font-sans text-sm text-ink/75 leading-relaxed prose prose-sm prose-slate">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
};

// ==========================================
// 2. ASK THIS CARD (Director Script)
// ==========================================
interface AskThisCardProps {
  question: string;
  rationale: string;
  targetRole?: string; // e.g. "CEO", "Treasurer", "Auditor"
}

export const AskThisCard: React.FC<AskThisCardProps> = ({ question, rationale, targetRole = "the CEO" }) => {
  return (
    <div className="bg-teal-brand/5 border border-teal-brand/30 p-5 rounded-lg shadow-sm hover:border-teal-brand/60 hover:shadow-md transition-premium flex flex-col md:flex-row items-start gap-4">
      <div className="bg-teal-brand text-white p-2.5 rounded-lg shrink-0 shadow-inner">
        <HelpCircle className="w-5 h-5" />
      </div>
      <div className="space-y-3 flex-grow">
        <div className="flex items-center justify-between flex-wrap gap-2">
          <span className="text-[10px] font-bold tracking-widest text-teal-brand uppercase bg-teal-brand/10 px-2 py-0.5 rounded">
            Director's Question Script
          </span>
          <span className="text-[11px] font-semibold text-teal-brand italic">
            Target: {targetRole}
          </span>
        </div>
        
        {/* The Actual Script */}
        <p className="font-serif italic text-base font-medium text-ink leading-snug border-l-2 border-teal-brand/40 pl-3">
          "{question}"
        </p>
        
        {/* Rationale Explainer */}
        <div className="pt-2 border-t border-teal-brand/15 text-xs text-ink/70 leading-relaxed">
          <strong className="text-teal-brand font-semibold block uppercase tracking-wider text-[9px] mb-1">Governance Purpose:</strong>
          {rationale}
        </div>
      </div>
    </div>
  );
};

// ==========================================
// 3. DO NOT DO THIS CARD (Warning Checklists)
// ==========================================
interface DoNotDoThisCardProps {
  title: string;
  items: string[];
  consequence?: string;
}

export const DoNotDoThisCard: React.FC<DoNotDoThisCardProps> = ({ title, items, consequence }) => {
  return (
    <div className="bg-white border border-copper/30 border-t-4 border-t-copper p-5 rounded-b-lg rounded-t-sm shadow-sm hover:shadow-md hover:border-copper/50 transition-premium">
      <div className="flex items-start gap-3.5">
        <div className="bg-copper/10 text-copper p-2 rounded-lg shrink-0">
          <AlertTriangle className="w-5 h-5" />
        </div>
        <div className="space-y-3 w-full">
          <h4 className="font-sans font-extrabold text-sm uppercase tracking-wider text-copper leading-tight">
            DO NOT DO THIS: {title}
          </h4>
          
          <ul className="space-y-2">
            {items.map((item, index) => (
              <li key={index} className="flex items-start gap-2.5 text-xs text-ink/80 leading-relaxed">
                <span className="text-copper font-bold shrink-0 mt-0.5 text-base leading-none">×</span>
                <span>{item}</span>
              </li>
            ))}
          </ul>

          {consequence && (
            <div className="mt-3 pt-2 border-t border-copper/15 bg-copper/5 -mx-5 -mb-5 p-4 rounded-b-lg text-[11px] text-copper font-medium">
              <strong className="uppercase tracking-wider text-[9px] block mb-0.5">D&O Liability Warning / Real Consequence:</strong>
              {consequence}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

// ==========================================
// 4. MINUTES SHOULD SHOW CARD
// ==========================================
interface MinutesShouldShowCardProps {
  agendaItem: string;
  mockMinutes: string;
  whyItMatters: string;
}

export const MinutesShouldShowCard: React.FC<MinutesShouldShowCardProps> = ({ agendaItem, mockMinutes, whyItMatters }) => {
  return (
    <div className="bg-slate-brand/5 border border-slate-brand/25 rounded-lg overflow-hidden shadow-sm hover:shadow-md hover:border-slate-brand/40 transition-premium">
      {/* Header Bar */}
      <div className="bg-slate-brand/10 border-b border-slate-brand/20 px-4 py-2 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <FileText className="w-4 h-4 text-slate-brand" />
          <span className="font-sans font-bold text-xs uppercase tracking-wider text-slate-brand">
            Minutes Mockup Draft
          </span>
        </div>
        <span className="text-[10px] font-semibold text-slate-brand bg-white px-2 py-0.5 rounded shadow-sm">
          Agenda: {agendaItem}
        </span>
      </div>

      <div className="p-5 space-y-4">
        {/* Mock Minutes Content */}
        <pre className="font-mono text-[11px] text-ink bg-white/70 p-4 border border-fog rounded overflow-x-auto whitespace-pre-wrap leading-relaxed shadow-inner">
          {mockMinutes}
        </pre>

        {/* Why it Matters */}
        <div className="text-xs text-ink/75 leading-relaxed bg-white/50 p-3 rounded border border-fog/50">
          <strong className="text-slate-brand font-semibold block uppercase tracking-wider text-[9px] mb-1">
            Why this Specific Draft Protects the Board:
          </strong>
          {whyItMatters}
        </div>
      </div>
    </div>
  );
};

// ==========================================
// 5. LEGAL ESCALATION CARD
// ==========================================
interface LegalEscalationCardProps {
  trigger: string;
  explanation: string;
  actionText?: string;
  relatedTopic?: string;
}

export const LegalEscalationCard: React.FC<LegalEscalationCardProps> = ({ 
  trigger, 
  explanation, 
  actionText = "Schedule Legal Consultation",
  relatedTopic = "General Compliance"
}) => {
  return (
    <div className="bg-burgundy/5 border border-burgundy/30 border-l-4 border-l-burgundy p-6 rounded-r-lg shadow-sm hover:shadow-md transition-premium relative overflow-hidden group">
      <div className="absolute top-0 right-0 w-24 h-24 bg-burgundy/5 rounded-bl-full -mr-4 -mt-4 group-hover:bg-burgundy/10 transition-premium" />
      <div className="flex items-start gap-4">
        <div className="bg-burgundy text-white p-2.5 rounded-lg shrink-0 shadow-md">
          <ShieldAlert className="w-5 h-5" />
        </div>
        <div className="space-y-4 flex-grow relative z-10">
          <div className="flex items-center gap-2 flex-wrap">
            <span className="text-[10px] font-bold tracking-widest text-burgundy uppercase bg-burgundy/10 px-2.5 py-0.5 rounded">
              Legal Escalation Required
            </span>
            <span className="text-[10px] text-ink/40 font-semibold uppercase tracking-wider">
              {relatedTopic}
            </span>
          </div>
          
          <div className="space-y-2">
            <h4 className="font-serif font-bold text-lg text-burgundy leading-tight">
              {trigger}
            </h4>
            <p className="font-sans text-xs sm:text-sm text-ink/80 leading-relaxed">
              {explanation}
            </p>
          </div>

          <div className="pt-2">
            <a
              href="https://NPOlawyers.com"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2 bg-burgundy hover:bg-ink text-white text-xs font-bold uppercase tracking-wider rounded shadow transition-premium"
            >
              <span>{actionText}</span>
              <ExternalLink className="w-3 h-3 text-brass" />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

// ==========================================
// 6. CALIFORNIA NOTE BADGE
// ==========================================
interface CaliforniaNoteBadgeProps {
  statute?: string;
  text: string;
  className?: string;
}

export const CaliforniaNoteBadge: React.FC<CaliforniaNoteBadgeProps> = ({ statute, text, className = "" }) => {
  return (
    <div className={`inline-flex items-start md:items-center gap-2 px-3 py-1.5 bg-brass/10 border border-brass/30 text-brass rounded-lg shadow-sm text-xs font-semibold ${className}`}>
      <Award className="w-3.5 h-3.5 shrink-0 mt-0.5 md:mt-0 text-brass" />
      <span className="leading-relaxed">
        {statute ? <strong className="uppercase font-bold mr-1 tracking-wider text-[10px]">{statute}:</strong> : null}
        {text}
      </span>
    </div>
  );
};
