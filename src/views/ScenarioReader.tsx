import React from 'react';
import { useRouter } from '../components/Router';
import { Layout } from '../components/Layout';
import { scenarios } from '../data/scenarios';
import { articles } from '../data/articles';
import { LegalEscalationCard } from '../components/BoardroomCards';
import { ArrowLeft, Landmark, AlertTriangle, CheckCircle2, ChevronRight, PlayCircle } from 'lucide-react';

export const ScenarioReader: React.FC = () => {
  const { queryParams, navigate } = useRouter();
  const slug = queryParams.id;

  // Find scenario
  const scenario = scenarios.find((sc) => sc.slug === slug);

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
              {/* FACTS PANEL (Premium Editorial Layout) */}
              <div className="space-y-3">
                <h3 className="font-sans font-extrabold text-xs uppercase tracking-widest text-ink/50 flex items-center gap-1.5">
                  <Landmark className="w-4 h-4 text-brass" />
                  <span>The Classroom Facts</span>
                </h3>
                <p className="font-sans text-xs sm:text-sm text-ink/85 leading-relaxed bg-paper/20 p-5 rounded-lg border border-fog/50">
                  {scenario.facts}
                </p>
              </div>

              {/* HIGH-STAKES RISKS (Copper Alert Block) */}
              <div className="bg-copper/5 border border-copper/20 p-5 sm:p-6 rounded-lg space-y-3">
                <h3 className="font-sans font-extrabold text-xs uppercase tracking-widest text-copper flex items-center gap-1.5">
                  <AlertTriangle className="w-4 h-4 text-copper" />
                  <span>D&O Liability and Regulatory Risks</span>
                </h3>
                <p className="font-sans text-xs sm:text-sm text-ink/80 leading-relaxed">
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
                        <span className="font-sans text-xs sm:text-sm text-ink/85 leading-relaxed font-medium">
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
                  className="w-full sm:w-auto inline-flex justify-center items-center px-4 py-2.5 bg-slate-brand hover:bg-ink text-white text-xs font-bold uppercase tracking-wider rounded shadow transition-premium cursor-pointer"
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
