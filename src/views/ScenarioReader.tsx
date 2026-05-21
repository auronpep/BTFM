import React, { useState } from 'react';
import { useRouter } from '../components/Router';
import { Layout } from '../components/Layout';
import { scenarios } from '../data/scenarios';
import { articles } from '../data/articles';
import { LegalEscalationCard } from '../components/BoardroomCards';
import { AudioNarrator } from '../components/AudioNarrator';
import { ArrowLeft, Landmark, AlertTriangle, CheckCircle2, ChevronRight, PlayCircle, CheckSquare, Square, AlertCircle } from 'lucide-react';

export const ScenarioReader: React.FC = () => {
  const { queryParams, navigate } = useRouter();
  const slug = queryParams.id;

  // Find scenario
  const scenario = scenarios.find((sc) => sc.slug === slug);

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

  if (!scenario) {
    return (
      <Layout>
        <div className="py-20 text-center space-y-4">
          <p className="font-serif text-2xl font-bold text-burgundy">Case Study Not Found</p>
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

  // Find related articles
  const matchedArticles = articles.filter(art => scenario.relatedArticles.includes(art.slug));

  return (
    <Layout>
      <div className="bg-paper/30 min-h-screen py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto space-y-8">
          
          {/* Back button */}
          <div className="text-left">
            <button
              onClick={() => navigate('articles')}
              className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-widest text-slate-brand hover:text-brass transition-premium"
            >
              <ArrowLeft className="w-4.5 h-4.5" />
              <span>Back to Scenario Classroom</span>
            </button>
          </div>

          {/* Core Case Workbook Card */}
          <div className="bg-white rounded-xl shadow-lg border border-fog overflow-hidden text-left">
            
            {/* Header Block */}
            <div className="p-6 sm:p-8 bg-ink text-paper border-b border-brass/25 space-y-3">
              <div className="flex items-center justify-between flex-wrap gap-2 text-[10px] font-extrabold uppercase tracking-wider text-brass">
                <span className="bg-brass/10 border border-brass/30 px-2.5 py-0.5 rounded">
                  {scenario.issueType}
                </span>
                <span>{scenario.boardStage} Level Focus</span>
              </div>
              <h1 className="font-serif text-2xl sm:text-3xl font-extrabold tracking-wide leading-tight text-white">
                {scenario.title}
              </h1>
            </div>

            <div className="p-6 sm:p-8 space-y-8">
              
              {/* Audio Narrator & Study Tracker Grid */}
              <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-stretch">
                <div className="md:col-span-8">
                  <AudioNarrator title={`Classroom Case Review: ${scenario.title}`} durationSeconds={120} />
                </div>
                <div className="md:col-span-4 flex">
                  <button
                    onClick={toggleStudied}
                    className="w-full flex items-center justify-center gap-3 p-4 rounded-xl border text-center transition-premium cursor-pointer text-xs font-bold uppercase tracking-wider select-none bg-paper/20 hover:bg-white border-brass/30"
                  >
                    {isStudied ? (
                      <div className="flex flex-col items-center gap-1 justify-center">
                        <CheckSquare className="w-6 h-6 text-brass" />
                        <span className="text-brass font-bold">Marked as Reviewed</span>
                      </div>
                    ) : (
                      <div className="flex flex-col items-center gap-1 justify-center">
                        <Square className="w-6 h-6 text-ink/20" />
                        <span className="text-ink/65 font-bold">Mark as Reviewed</span>
                      </div>
                    )}
                  </button>
                </div>
              </div>

              {/* FACTS PANEL (Premium Editorial Layout) */}
              <div className="space-y-3">
                <h3 className="font-sans font-extrabold text-xs uppercase tracking-widest text-ink/50 flex items-center gap-1.5 font-medium">
                  <Landmark className="w-4 h-4 text-brass" />
                  <span>The Classroom Facts</span>
                </h3>
                <p className="font-sans text-xs sm:text-sm text-ink/85 leading-relaxed bg-paper/20 p-5 rounded-lg border border-fog/50 font-medium">
                  {scenario.facts}
                </p>
              </div>

              {/* HIGH-STAKES RISKS (Copper Alert Block) */}
              <div className="bg-copper/5 border border-copper/20 p-5 sm:p-6 rounded-lg space-y-3">
                <h3 className="font-sans font-extrabold text-xs uppercase tracking-widest text-copper flex items-center gap-1.5">
                  <AlertTriangle className="w-4 h-4 text-copper" />
                  <span>D&O Liability and Regulatory Risks</span>
                </h3>
                <p className="font-sans text-xs sm:text-sm text-ink/80 leading-relaxed font-medium">
                  {scenario.risk}
                </p>
              </div>

              {/* FIDUCIARY QUESTION (Elegant Quote Block) */}
              <div className="space-y-3 text-center py-4 border-t border-b border-fog/60">
                <h4 className="font-sans font-extrabold text-[10px] uppercase tracking-widest text-ink/40">Fiduciary Question Under Discussion</h4>
                <p className="font-serif italic text-base sm:text-lg lg:text-xl text-slate-brand font-medium leading-relaxed max-w-2xl mx-auto">
                  "{scenario.boardQuestion}"
                </p>
              </div>

              {/* RECOMMENDED BOARD ACTIONS (Checklist Steps) */}
              <div className="space-y-4">
                <h3 className="font-sans font-extrabold text-xs uppercase tracking-widest text-teal-brand flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-teal-brand" />
                  <span>Recommended Fiduciary Actions</span>
                </h3>
                
                <div className="space-y-3.5">
                  {scenario.recommendedAction.split('\n').map((step, idx) => {
                    const cleanStep = step.trim();
                    if (!cleanStep) return null;
                    return (
                      <div key={idx} className="flex items-start gap-3 bg-paper/20 p-4 rounded-lg border border-fog/40">
                        <div className="bg-brass text-ink font-sans font-extrabold text-[10px] w-5 h-5 rounded flex items-center justify-center shrink-0 mt-0.5 shadow-sm">
                          {idx + 1}
                        </div>
                        <span className="font-sans text-xs sm:text-sm text-ink/85 leading-relaxed font-semibold">
                          {cleanStep.substring(cleanedActionHeading(cleanStep))}
                        </span>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* WEBINAR TIE-IN */}
              <div className="bg-slate-brand/5 border border-slate-brand/25 p-5 rounded-lg flex flex-col sm:flex-row items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <PlayCircle className="w-8 h-8 text-slate-brand shrink-0" />
                  <div className="text-left">
                    <p className="text-[10px] font-extrabold uppercase tracking-wider text-slate-brand">Accompanying Classroom Lab</p>
                    <p className="font-serif text-sm font-bold text-ink">{scenario.trainingTieIn}</p>
                  </div>
                </div>
                <button
                  onClick={() => navigate('training')}
                  className="w-full sm:w-auto inline-flex justify-center items-center px-4 py-2.5 bg-slate-brand hover:bg-ink text-white text-xs font-bold uppercase tracking-wider rounded shadow transition-premium cursor-pointer text-center"
                >
                  Register For Webinar
                </button>
              </div>

              {/* RELATED ARTICLES */}
              {matchedArticles.length > 0 && (
                <div className="pt-6 border-t border-fog/60 space-y-3">
                  <h4 className="font-sans font-extrabold text-xs uppercase tracking-widest text-ink/50">Related Fiduciary Masterclasses:</h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {matchedArticles.map((art) => (
                      <div 
                        key={art.slug}
                        onClick={() => navigate(`article/${art.slug}`)}
                        className="group cursor-pointer p-3 rounded-lg border border-fog/85 bg-paper/10 hover:border-brass hover:bg-white transition-premium flex items-center justify-between"
                      >
                        <div className="text-left space-y-0.5">
                          <span className="text-[9px] font-extrabold text-slate-brand uppercase">{art.category}</span>
                          <p className="font-serif font-bold text-sm text-ink group-hover:text-brass transition-premium leading-snug">{art.title}</p>
                        </div>
                        <ChevronRight className="w-4 h-4 text-ink/20 group-hover:text-brass transition-premium shrink-0" />
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Feedback Survey */}
              <div className="mt-6 pt-6 border-t border-fog/60 space-y-4">
                {feedback === null ? (
                  <div className="flex flex-col sm:flex-row items-center justify-between gap-4 bg-paper/10 p-4 rounded-lg border border-fog/55 text-left">
                    <span className="text-xs font-bold text-ink/70 tracking-wide font-sans">Was this scenario case study helpful for your board?</span>
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
                    <span>✓ Thank you! Your review has been added to our board alignment records.</span>
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
                      <span>Thank you. We understand this general scenario might not match the specific legal complexities your board is facing.</span>
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
                        Involved in a complex conflict or board dispute?
                      </h4>
                      <p className="text-xs text-ink/70 leading-relaxed font-sans font-medium">
                        If your board is navigating delicate governance matters, unvoted contracts, or potential self-dealing triggers, general educational reading is not a substitute for counsel. Secure a direct **Board Governance & Safety Audit** under professional attorney-client privilege with Myron Steeves and NPO Lawyers.
                      </p>
                      <div className="pt-2">
                        <a
                          href="https://NPOlawyers.com"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1.5 px-4 py-2 bg-burgundy hover:bg-ink text-white text-xs font-bold uppercase tracking-wider rounded shadow transition-premium cursor-pointer font-sans font-bold"
                        >
                          <span>Consult Attorney Now ➜</span>
                        </a>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* LEGAL REFERRAL ROW */}
              <div className="pt-2">
                <LegalEscalationCard 
                  trigger="Navigating a delicate conflict or board compliance crisis?"
                  explanation="The attorneys at NPO Lawyers advise boards on recusal procedures, comparable salary documentation audits, and corporate restructurings in accordance with California AG standards."
                  actionText="Schedule Direct Counsel"
                  relatedTopic={scenario.issueType}
                />
              </div>

            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

// Helper to calculate offset of numbered heading (e.g. "1. RECUSAL: " -> strip out the prefix)
const cleanedActionHeading = (text: string) => {
  const match = text.match(/^\d+\.\s*(?:[A-Z\s_&]+:\s*)?/);
  return match ? match[0].length : 0;
};

export default ScenarioReader;
