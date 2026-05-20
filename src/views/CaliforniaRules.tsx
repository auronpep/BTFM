import React, { useState } from 'react';
import { useRouter } from '../components/Router';
import { Layout } from '../components/Layout';
import { californiaRules } from '../data/californiaRules';
import type { CaliforniaRule } from '../data/californiaRules';
import { CaliforniaNoteBadge, LegalEscalationCard } from '../components/BoardroomCards';
import { CheckSquare, Square, Landmark, ChevronRight, ShieldCheck, AlertTriangle } from 'lucide-react';

export const CaliforniaRules: React.FC = () => {
  const { navigate } = useRouter();
  
  // State to track checked compliance actions across the 5 rules
  // key format: "ruleId-actionIndex"
  const [checkedActions, setCheckedActions] = useState<Record<string, boolean>>({});

  const handleToggleAction = (ruleId: string, actionIndex: number) => {
    const key = `${ruleId}-${actionIndex}`;
    setCheckedActions(prev => ({
      ...prev,
      [key]: !prev[key]
    }));
  };

  const isRuleFullyCompliant = (rule: CaliforniaRule) => {
    return rule.complianceActionList.every((_, idx) => checkedActions[`${rule.id}-${idx}`] === true);
  };

  const countCompletedActions = (rule: CaliforniaRule) => {
    return rule.complianceActionList.filter((_, idx) => checkedActions[`${rule.id}-${idx}`] === true).length;
  };

  return (
    <Layout>
      <div className="py-12 bg-paper/30 min-h-screen px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto space-y-12">
          
          {/* Header */}
          <div className="text-center space-y-3">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-brass/10 border border-brass/30 text-brass rounded-full text-xs font-semibold uppercase tracking-wider">
              <Landmark className="w-3.5 h-3.5" />
              <span>Fiduciary Regulatory Registry</span>
            </div>
            <h1 className="font-serif text-3xl sm:text-4xl text-ink font-bold tracking-wide">
              California Board Rules Index
            </h1>
            <p className="max-w-2xl mx-auto text-sm sm:text-base text-ink/70">
              A comprehensive reference of verified state legal thresholds, strict filing timelines, and Registry mandates under the California Corporations Code. Complete the active checklists to verify your board's compliance.
            </p>
          </div>

          {/* Quick Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white p-5 rounded-lg border border-fog shadow-sm flex items-center gap-4">
              <div className="p-3 bg-brass/10 text-brass rounded-lg">
                <Landmark className="w-6 h-6" />
              </div>
              <div className="text-left">
                <p className="text-[10px] uppercase tracking-wider text-ink/40 font-bold">Registry Status</p>
                <p className="font-serif font-bold text-lg text-ink">CT-Registry Active</p>
              </div>
            </div>
            
            <div className="bg-white p-5 rounded-lg border border-fog shadow-sm flex items-center gap-4">
              <div className="p-3 bg-teal-brand/10 text-teal-brand rounded-lg">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <div className="text-left">
                <p className="text-[10px] uppercase tracking-wider text-ink/40 font-bold">Filing Frequency</p>
                <p className="font-serif font-bold text-lg text-ink">Annual & Biennial</p>
              </div>
            </div>

            <div className="bg-white p-5 rounded-lg border border-fog shadow-sm flex items-center gap-4">
              <div className="p-3 bg-burgundy/10 text-burgundy rounded-lg">
                <AlertTriangle className="w-6 h-6" />
              </div>
              <div className="text-left">
                <p className="text-[10px] uppercase tracking-wider text-ink/40 font-bold">Failure Penalties</p>
                <p className="font-serif font-bold text-lg text-burgundy">Suspension & Fines</p>
              </div>
            </div>
          </div>

          {/* Rules Loop */}
          <div className="space-y-12">
            {californiaRules.map((rule) => {
              const fullyCompliant = isRuleFullyCompliant(rule);
              const completedCount = countCompletedActions(rule);
              const totalCount = rule.complianceActionList.length;
              const pct = Math.round((completedCount / totalCount) * 100);

              return (
                <div 
                  key={rule.id} 
                  id={rule.id}
                  className={`bg-white rounded-xl shadow-md border overflow-hidden transition-premium text-left ${
                    fullyCompliant 
                      ? 'border-teal-brand shadow-teal-brand/5 border-t-8 border-t-teal-brand' 
                      : completedCount > 0 
                        ? 'border-brass border-t-8 border-t-brass' 
                        : 'border-fog'
                  }`}
                >
                  {/* Rule Header Bar */}
                  <div className="p-6 bg-paper/10 border-b border-fog flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div className="space-y-1.5 flex-grow">
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className="text-[10px] font-extrabold text-brass uppercase bg-brass/10 px-2.5 py-0.5 rounded border border-brass/20">
                          {rule.statute}
                        </span>
                        <CaliforniaNoteBadge statute="Statute" text="State Mandated" className="!py-0.5" />
                      </div>
                      <h2 className="font-serif text-xl sm:text-2xl text-ink font-bold tracking-wide">
                        {rule.title}
                      </h2>
                    </div>

                    {/* Compliant Badge or Progress */}
                    <div className="shrink-0 flex items-center gap-2">
                      {fullyCompliant ? (
                        <div className="bg-teal-brand text-white px-3.5 py-1.5 rounded-lg text-xs font-bold uppercase tracking-wider flex items-center gap-1.5 shadow-sm">
                          <ShieldCheck className="w-4 h-4 animate-pulse" />
                          <span>Verified Compliant</span>
                        </div>
                      ) : (
                        <div className="flex flex-col items-end gap-1 font-sans">
                          <span className="text-[10px] font-extrabold text-ink/40 uppercase tracking-widest">Compliance Progress</span>
                          <span className="text-xs font-bold text-brass">{completedCount} of {totalCount} verified ({pct}%)</span>
                          <div className="w-32 bg-fog h-1.5 rounded-full overflow-hidden mt-1">
                            <div className="bg-brass h-full transition-premium" style={{ width: `${pct}%` }} />
                          </div>
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="p-6 sm:p-8 space-y-6">
                    {/* Grid Section for Threshold and Failure */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pb-6 border-b border-fog/65">
                      <div className="space-y-2">
                        <h4 className="font-sans font-extrabold text-xs uppercase tracking-widest text-ink/50">Fiduciary Threshold Trigger:</h4>
                        <p className="font-serif italic text-sm text-ink leading-relaxed border-l-2 border-brass/40 pl-3">
                          {rule.threshold}
                        </p>
                      </div>
                      <div className="space-y-2">
                        <h4 className="font-sans font-extrabold text-xs uppercase tracking-widest text-burgundy">Regulatory Consequence of Failure:</h4>
                        <p className="font-sans text-xs sm:text-sm text-ink/80 leading-relaxed bg-burgundy/5 p-3 rounded border border-burgundy/15">
                          {rule.consequenceOfFailure}
                        </p>
                      </div>
                    </div>

                    {/* Detailed Legal Explanation */}
                    <div className="space-y-2">
                      <h4 className="font-sans font-extrabold text-xs uppercase tracking-widest text-ink/50">Detailed Legal Commentary:</h4>
                      <p className="font-sans text-xs sm:text-sm text-ink/85 leading-relaxed">
                        {rule.fullExplanation}
                      </p>
                    </div>

                    {/* Interactive Verification Checklist */}
                    <div className="bg-paper/20 rounded-xl p-5 sm:p-6 border border-fog/80 space-y-4">
                      <div className="space-y-1">
                        <h4 className="font-sans font-extrabold text-xs uppercase tracking-widest text-ink/50">Fiduciary Verification Checklist:</h4>
                        <p className="text-[10px] text-ink/40 uppercase tracking-wider font-semibold">Check each item to audit your current board's stance:</p>
                      </div>
                      
                      <div className="space-y-3">
                        {rule.complianceActionList.map((action, idx) => {
                          const isChecked = checkedActions[`${rule.id}-${idx}`] === true;
                          return (
                            <div 
                              key={idx}
                              onClick={() => handleToggleAction(rule.id, idx)}
                              className={`cursor-pointer p-3.5 rounded-lg border transition-premium flex items-start gap-3.5 select-none ${
                                isChecked 
                                  ? 'border-teal-brand/40 bg-teal-brand/5 shadow-inner' 
                                  : 'border-fog bg-white hover:border-brass/40'
                              }`}
                            >
                              <div className={`mt-0.5 shrink-0 transition-premium ${isChecked ? 'text-teal-brand' : 'text-ink/20'}`}>
                                {isChecked ? <CheckSquare className="w-5 h-5" /> : <Square className="w-5 h-5" />}
                              </div>
                              <span className={`font-sans text-xs sm:text-sm leading-relaxed ${isChecked ? 'text-teal-brand font-medium' : 'text-ink/80'}`}>
                                {action}
                              </span>
                            </div>
                          );
                        })}
                      </div>
                    </div>

                    {/* Legal Escalation Warning Rail */}
                    <div className="pt-2">
                      <LegalEscalationCard 
                        trigger={rule.legalEscalationTrigger} 
                        explanation="Failing to address California's nonprofit statutory limits exposes the entity to immediate revocation by the Attorney General. Seek Counsel from NPO Lawyers to correct regulatory delinquent statuses."
                        actionText="Schedule Regulatory Audit"
                        relatedTopic={rule.title}
                      />
                    </div>

                    {/* Related Masterclass Article CTA */}
                    {rule.relatedArticleSlug && (
                      <div className="pt-4 border-t border-fog flex justify-end">
                        <button 
                          onClick={() => navigate(`article/${rule.relatedArticleSlug}`)}
                          className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-slate-brand hover:text-brass transition-premium"
                        >
                          <span>Read Accompanying Masterclass Article</span>
                          <ChevronRight className="w-4 h-4" />
                        </button>
                      </div>
                    )}

                  </div>
                </div>
              );
            })}
          </div>

          {/* Quick navigation reference */}
          <div className="text-center pt-4">
            <button
              onClick={() => navigate('tools')}
              className="inline-flex items-center gap-1 text-xs font-extrabold uppercase tracking-widest text-slate-brand hover:text-brass transition-premium"
            >
              <span>View All Interactive Governance Laboratories</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>

        </div>
      </div>
    </Layout>
  );
};
export default CaliforniaRules;
