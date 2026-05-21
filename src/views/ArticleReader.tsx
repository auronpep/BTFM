import React, { useState } from 'react';
import { useRouter } from '../components/Router';
import { Layout } from '../components/Layout';
import { articles } from '../data/articles';
import { 
  BoardroomRuleCard, 
  AskThisCard, 
  DoNotDoThisCard, 
  MinutesShouldShowCard, 
  LegalEscalationCard, 
  CaliforniaNoteBadge 
} from '../components/BoardroomCards';
import { AudioNarrator } from '../components/AudioNarrator';
import { ArrowLeft, Clock, Award, CheckSquare, Square, AlertCircle } from 'lucide-react';

// Simple Markdown to HTML parser for articles
const renderMarkdown = (text: string) => {
  return text.split('\n\n').map((paragraph, idx) => {
    let cleaned = paragraph.trim();
    if (!cleaned) return null;

    // Headings
    if (cleaned.startsWith('### ')) {
      return (
        <h3 key={idx} className="font-serif text-xl sm:text-2xl text-slate-brand font-bold mt-6 mb-3 leading-snug">
          {cleaned.substring(4)}
        </h3>
      );
    }
    if (cleaned.startsWith('## ')) {
      return (
        <h2 key={idx} className="font-serif text-2xl sm:text-3xl text-ink font-bold mt-8 mb-4 leading-tight">
          {cleaned.substring(3)}
        </h2>
      );
    }

    // Bullet Lists
    if (cleaned.startsWith('* ')) {
      const items = cleaned.split('\n* ');
      return (
        <ul key={idx} className="list-disc pl-5 my-4 space-y-2 text-xs sm:text-sm text-ink/80 leading-relaxed font-sans font-medium">
          {items.map((item, iIdx) => {
            let itemText = item.startsWith('* ') ? item.substring(2) : item;
            // Parse inline bold
            const boldRegex = /\*\*(.*?)\*\*/g;
            const parts = [];
            let lastIndex = 0;
            let match;
            while ((match = boldRegex.exec(itemText)) !== null) {
              parts.push(itemText.substring(lastIndex, match.index));
              parts.push(<strong key={match.index} className="font-bold text-ink">{match[1]}</strong>);
              lastIndex = boldRegex.lastIndex;
            }
            parts.push(itemText.substring(lastIndex));
            return <li key={iIdx}>{parts.length > 0 ? parts : itemText}</li>;
          })}
        </ul>
      );
    }

    // Numbered Lists
    if (cleaned.match(/^\d+\.\s/)) {
      const items = cleaned.split(/\n\d+\.\s/);
      return (
        <ol key={idx} className="list-decimal pl-5 my-4 space-y-2 text-xs sm:text-sm text-ink/80 leading-relaxed font-sans font-medium">
          {items.map((item, iIdx) => {
            let itemText = item.replace(/^\d+\.\s/, '');
            // Parse inline bold
            const boldRegex = /\*\*(.*?)\*\*/g;
            const parts = [];
            let lastIndex = 0;
            let match;
            while ((match = boldRegex.exec(itemText)) !== null) {
              parts.push(itemText.substring(lastIndex, match.index));
              parts.push(<strong key={match.index} className="font-bold text-ink">{match[1]}</strong>);
              lastIndex = boldRegex.lastIndex;
            }
            parts.push(itemText.substring(lastIndex));
            return <li key={iIdx}>{parts.length > 0 ? parts : itemText}</li>;
          })}
        </ol>
      );
    }

    // Parse inline bold within paragraphs
    const boldRegex = /\*\*(.*?)\*\*/g;
    const parts = [];
    let lastIndex = 0;
    let match;
    while ((match = boldRegex.exec(cleaned)) !== null) {
      parts.push(cleaned.substring(lastIndex, match.index));
      parts.push(<strong key={match.index} className="font-bold text-ink">{match[1]}</strong>);
      lastIndex = boldRegex.lastIndex;
    }
    parts.push(cleaned.substring(lastIndex));

    return (
      <p key={idx} className="font-sans text-xs sm:text-sm text-ink/85 leading-relaxed font-normal mb-4">
        {parts.length > 0 ? parts : cleaned}
      </p>
    );
  });
};

export const ArticleReader: React.FC = () => {
  const { queryParams, navigate } = useRouter();
  const slug = queryParams.id;

  // Find article
  const article = articles.find((art) => art.slug === slug);

  const [feedback, setFeedback] = useState<'yes' | 'no' | null>(() => {
    try {
      const saved = localStorage.getItem(`cdx_feedback_status_${slug}`);
      return saved as 'yes' | 'no' | null;
    } catch (e) {
      return null;
    }
  });

  const handleFeedback = (val: 'yes' | 'no') => {
    try {
      localStorage.setItem(`cdx_feedback_status_${slug}`, val);
      setFeedback(val);
    } catch (e) {
      console.error(e);
    }
  };

  // Local storage mastery tracking state
  const [isStudied, setIsStudied] = useState(() => {
    try {
      const stored = localStorage.getItem('board_mastery_progress');
      if (stored) {
        const parsed = JSON.parse(stored);
        return Array.isArray(parsed) && parsed.includes(slug);
      }
    } catch (e) {
      console.error(e);
    }
    return false;
  });

  const toggleStudied = () => {
    try {
      const stored = localStorage.getItem('board_mastery_progress');
      let parsed = stored ? JSON.parse(stored) : [];
      if (!Array.isArray(parsed)) parsed = [];

      if (isStudied) {
        parsed = parsed.filter((id: string) => id !== slug);
      } else {
        if (!parsed.includes(slug)) {
          parsed.push(slug);
        }
      }
      localStorage.setItem('board_mastery_progress', JSON.stringify(parsed));
      setIsStudied(!isStudied);
    } catch (e) {
      console.error(e);
    }
  };

  if (!article) {
    return (
      <Layout>
        <div className="py-20 text-center space-y-4">
          <p className="font-serif text-2xl font-bold text-burgundy">Masterclass Not Found</p>
          <button 
            onClick={() => navigate('articles')}
            className="inline-flex items-center gap-1.5 px-4 py-2 bg-brass text-ink font-bold uppercase text-xs rounded shadow"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Library</span>
          </button>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="bg-paper/30 min-h-screen py-10 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto space-y-8">
          
          {/* Back button link row */}
          <div className="text-left">
            <button
              onClick={() => navigate('articles')}
              className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-widest text-slate-brand hover:text-brass transition-premium"
            >
              <ArrowLeft className="w-4.5 h-4.5" />
              <span>Back to Masterclass Library</span>
            </button>
          </div>

          {/* Three-Column Desktop Layout / Single-Column Mobile */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            
            {/* Left Rail (Editorial Meta Panel) - lg:col-span-3 */}
            <aside className="lg:col-span-3 bg-white p-6 rounded-xl border border-fog/80 shadow-sm text-left space-y-5 lg:sticky lg:top-24">
              <div className="space-y-1">
                <span className="text-[10px] font-extrabold uppercase tracking-widest text-brass bg-brass/10 border border-brass/20 px-2.5 py-0.5 rounded">
                  {article.category}
                </span>
                <h4 className="font-sans font-bold text-xs uppercase text-ink/40 tracking-widest pt-2">Reading Desk</h4>
              </div>

              <div className="space-y-4 pt-2 border-t border-fog/50">
                <div className="flex items-center gap-2.5 text-xs text-ink/75 font-semibold">
                  <Clock className="w-4 h-4 text-brass" />
                  <span>{article.readingTime} Minute Standard Read</span>
                </div>
                
                <div className="flex items-center gap-2.5 text-xs text-ink/75 font-semibold">
                  <Award className="w-4 h-4 text-brass" />
                  <span>{article.difficulty} Governance Level</span>
                </div>
              </div>

              {/* STUDY TRACKER CHECKBOX */}
              <div className="pt-4 border-t border-fog/50 space-y-2">
                <span className="text-[10px] font-extrabold text-brass uppercase tracking-widest block">Study Verification:</span>
                <button
                  onClick={toggleStudied}
                  className="w-full flex items-center gap-3 p-3 rounded-lg border text-left transition-premium cursor-pointer text-xs font-bold uppercase tracking-wider select-none bg-paper/20 hover:bg-white border-fog"
                >
                  {isStudied ? (
                    <>
                      <CheckSquare className="w-5 h-5 text-brass shrink-0" />
                      <span className="text-brass">Marked as Studied</span>
                    </>
                  ) : (
                    <>
                      <Square className="w-5 h-5 text-ink/20 shrink-0" />
                      <span className="text-ink/60">Mark as Studied</span>
                    </>
                  )}
                </button>
              </div>

              {/* In-article checklist callout */}
              {article.californiaThreshold && (
                <div className="pt-4 border-t border-fog/50 space-y-2">
                  <span className="text-[10px] font-extrabold text-brass uppercase tracking-widest block">California Statutory Key:</span>
                  <CaliforniaNoteBadge statute="CA Code" text={article.californiaThreshold.text} className="w-full text-left" />
                </div>
              )}

              {/* Direct Attorney Review Invitation */}
              <div className="pt-4 border-t border-fog/50 bg-burgundy/5 -mx-6 -mb-6 p-6 rounded-b-xl text-left space-y-2">
                <span className="text-[9px] font-extrabold uppercase tracking-wider text-burgundy block">Direct Action Funnel</span>
                <p className="text-[11px] text-ink/75 leading-relaxed font-sans font-medium">
                  Operating a board in California carries serious regulatory checkups. Review these guidelines under direct attorney counsel.
                </p>
                <a
                  href="https://NPOlawyers.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full inline-flex justify-center items-center gap-1.5 py-2 bg-burgundy hover:bg-ink text-white text-[10px] font-bold uppercase tracking-wider rounded shadow transition-premium"
                >
                  <span>Consult NPO Lawyers</span>
                </a>
              </div>
            </aside>

            {/* Center Area (Deep Editorial Content Desk) - lg:col-span-5 */}
            <article className="lg:col-span-5 bg-white p-6 sm:p-8 rounded-xl border border-fog shadow-sm text-left space-y-6">
              <div className="space-y-3 pb-6 border-b border-fog/60">
                <h1 className="font-serif text-2xl sm:text-3xl lg:text-4xl text-ink font-extrabold tracking-tight leading-tight">
                  {article.title}
                </h1>
                <p className="font-sans italic text-sm sm:text-base text-ink/65 leading-relaxed">
                  {article.description}
                </p>
              </div>

              {/* PREMIUM AUDIO NARRATOR */}
              <div className="py-2">
                <AudioNarrator title={`Masterclass Tutorial: ${article.title}`} durationSeconds={article.readingTime * 45} />
              </div>

              {/* Problem/Challenge Box */}
              <div className="p-4 bg-copper/5 border-l-4 border-copper rounded-r-lg space-y-1">
                <span className="text-[9px] font-extrabold uppercase tracking-widest text-copper">The Boardroom Challenge:</span>
                <p className="font-serif text-xs sm:text-sm italic text-ink font-medium leading-relaxed">
                  "{article.problem}"
                </p>
              </div>

              {/* Long-form rendered markdown text */}
              <div className="prose prose-sm sm:prose prose-slate max-w-none">
                {renderMarkdown(article.content)}
              </div>

              {/* Feedback Survey */}
              <div className="mt-8 pt-6 border-t border-fog/60 space-y-4">
                {feedback === null ? (
                  <div className="flex flex-col sm:flex-row items-center justify-between gap-4 bg-paper/10 p-4 rounded-lg border border-fog/55 text-left">
                    <span className="text-xs font-bold text-ink/70 tracking-wide font-sans">Was this masterclass guide helpful for your board?</span>
                    <div className="flex items-center gap-3 shrink-0">
                      <button
                        onClick={() => handleFeedback('yes')}
                        className="px-4 py-1.5 bg-emerald-50 border border-emerald-300 text-emerald-700 text-xs font-bold uppercase tracking-wider rounded shadow-sm hover:bg-emerald-100 transition-premium cursor-pointer font-sans"
                      >
                        👍 Yes
                      </button>
                      <button
                        onClick={() => handleFeedback('no')}
                        className="px-4 py-1.5 bg-rose-50 border border-rose-300 text-rose-700 text-xs font-bold uppercase tracking-wider rounded shadow-sm hover:bg-rose-100 transition-premium cursor-pointer font-sans"
                      >
                        👎 No
                      </button>
                    </div>
                  </div>
                ) : feedback === 'yes' ? (
                  <div className="bg-emerald-50/45 border border-emerald-200 p-4 rounded-lg text-xs font-semibold text-emerald-800 flex items-center justify-between gap-3 animate-fade-in text-left">
                    <span>✓ Thank you for your feedback! Your mark of study excellence has been registered.</span>
                    <button
                      onClick={() => {
                        localStorage.removeItem(`cdx_feedback_status_${slug}`);
                        setFeedback(null);
                      }}
                      className="text-[10px] text-emerald-600 hover:underline font-bold uppercase cursor-pointer"
                    >
                      Undo
                    </button>
                  </div>
                ) : (
                  <div className="space-y-4 animate-fade-in text-left">
                    <div className="bg-paper p-4 rounded-lg border border-fog text-xs font-semibold text-ink/75 flex items-center justify-between gap-3">
                      <span>Thank you for your feedback. We regret that this general outline did not meet your board's specific complexity.</span>
                      <button
                        onClick={() => {
                          localStorage.removeItem(`cdx_feedback_status_${slug}`);
                          setFeedback(null);
                        }}
                        className="text-[10px] text-burgundy hover:underline font-bold uppercase shrink-0 cursor-pointer"
                      >
                        Change
                      </button>
                    </div>
                    
                    {/* Legal Counselling Escalation Memo Card */}
                    <div className="bg-burgundy/5 border-l-4 border-burgundy p-5 rounded-r-xl space-y-3 text-left">
                      <div className="flex items-center gap-1.5 text-burgundy">
                        <AlertCircle className="w-4 h-4 shrink-0" />
                        <span className="text-[10px] font-extrabold uppercase tracking-widest">Fiduciary Action Plan — Privileged Board Audit Required</span>
                      </div>
                      <h4 className="font-serif font-bold text-base text-ink">
                        Need specialized counsel or a custom bylaws checkup?
                      </h4>
                      <p className="text-xs text-ink/70 leading-relaxed font-sans font-medium">
                        Since this masterclass template does not address your unique board posture, we recommend securing a formal **Bylaws and Board Governance Audit** with California Center for Nonprofit Law. Avoid volunteer director liability and secure your safe harbor compliance.
                      </p>
                      <div className="pt-2">
                        <a
                          href="https://NPOlawyers.com"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1.5 px-4 py-2 bg-burgundy hover:bg-ink text-white text-xs font-bold uppercase tracking-wider rounded shadow transition-premium cursor-pointer font-sans font-bold"
                        >
                          <span>Request Privileged Audit ➜</span>
                        </a>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </article>

            {/* Right Rail (Interactive Meeting Prep Box) - lg:col-span-4 */}
            <aside className="lg:col-span-4 space-y-6 lg:sticky lg:top-24">
              
              {/* Header block for prep box */}
              <div className="bg-slate-brand text-paper p-4 rounded-t-xl border-b border-brass/25 text-left space-y-1">
                <span className="text-[10px] font-bold uppercase tracking-widest text-brass block">Actionable Prep Desk</span>
                <h3 className="font-serif text-lg font-bold text-white tracking-wide">
                  Meeting Prep Deck
                </h3>
                <p className="text-[11px] text-paper/75 leading-relaxed font-sans">
                  The relevant boardroom rules, risk warnings, script questions, and minutes drafts for this topic.
                </p>
              </div>

              {/* Rules, Scripts, Warnings, and Records Suite (Rendered dynamically) */}
              <div className="space-y-6">
                
                {/* 1. Rule Card */}
                <BoardroomRuleCard ruleNumber={article.category} title={article.ruleTitle}>
                  {article.ruleContent}
                </BoardroomRuleCard>

                {/* 2. Warning Card */}
                <DoNotDoThisCard 
                  title={article.doNots.title} 
                  items={article.doNots.items} 
                  consequence={article.doNots.consequence}
                />

                {/* 3. Ask scripts questions */}
                {article.askQuestions.map((q, idx) => (
                  <AskThisCard 
                    key={idx} 
                    question={q.question} 
                    rationale={q.rationale} 
                    targetRole={q.targetRole} 
                  />
                ))}

                {/* 4. Minutes Template */}
                {article.minutesTemplate && (
                  <MinutesShouldShowCard 
                    agendaItem={article.minutesTemplate.agendaItem} 
                    mockMinutes={article.minutesTemplate.mockMinutes} 
                    whyItMatters={article.minutesTemplate.whyItMatters} 
                  />
                )}

                {/* 5. Legal Escalation Card */}
                {article.legalEscalation ? (
                  <LegalEscalationCard 
                    trigger={article.legalEscalation.trigger} 
                    explanation={article.legalEscalation.explanation} 
                    actionText={article.legalEscalation.actionText}
                    relatedTopic={article.title}
                  />
                ) : (
                  <LegalEscalationCard 
                    trigger="Delinquency or statutory concerns on this topic?" 
                    explanation="Under California Corporations Code, failing to audit files or resolve conflicts voids Business Judgment safe harbors."
                    actionText="Contact Corporate Counsel"
                    relatedTopic={article.title}
                  />
                )}

              </div>
            </aside>

          </div>
        </div>
      </div>
    </Layout>
  );
};
export default ArticleReader;
