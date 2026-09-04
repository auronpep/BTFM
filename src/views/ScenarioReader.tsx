import React, { useState } from 'react';
import { useRouter } from '../components/Router';
import { Layout } from '../components/Layout';
import { scenarios } from '../data/scenarios';
import { articles } from '../data/articles';
import { LegalEscalationCard } from '../components/BoardroomCards';
import { AudioNarrator } from '../components/AudioNarrator';
import { ArrowLeft, Landmark, AlertTriangle, CheckCircle2, ChevronRight, PlayCircle, CheckSquare, Square, AlertCircle, Sparkles } from 'lucide-react';
import { parseTextWithStatutesAndGlossary } from '../components/StatuteTooltip';

// React-safe glossary parser (Enhancement 6)
const parseTextWithGlossary = (text: string): React.ReactNode => {
  return parseTextWithStatutesAndGlossary(text);
};

interface SimOption {
  text: string;
  grade: 'A' | 'C' | 'F';
  riskLevel: number; // 0 to 100
  color: string;
  meterColor: string;
  commentary: string;
}

const simulationData: Record<string, SimOption[]> = {
  "founder-salary-conflict": [
    {
      text: "Option A: Approve the $95,000 salary immediately as requested to support the founder's survival.",
      grade: 'F',
      riskLevel: 100,
      color: "border-burgundy/40 bg-burgundy/5 text-burgundy",
      meterColor: "bg-burgundy",
      commentary: "CRITICAL BREACH. Approving the salary with the founder, her spouse, and sister-in-law voting, and without written compensation comparable surveys, is an automatic Excess Benefit Transaction under IRC § 4958. Both the founder and voting board members face immediate, personal IRS excise tax penalties."
    },
    {
      text: "Option B: Hold a quick vote with the founder stepped out, but approve without formal northern/southern California salary surveys.",
      grade: 'C',
      riskLevel: 50,
      color: "border-brass/40 bg-brass/5 text-ink/80",
      meterColor: "bg-brass",
      commentary: "SUB-OPTIMAL & RISK-PRONE. While having the founder step out helps, approving without establishing a Rebuttable Presumption via documented market comparability studies still leaves the board wide open. If audited, the IRS will place the burden of proof on you to justify the salary."
    },
    {
      text: "Option C: Recuse the founder and family, compile independent market comparability surveys, hold a disinterested vote, and record meticulous minutes.",
      grade: 'A',
      riskLevel: 5,
      color: "border-emerald-500/40 bg-emerald-50/50 text-emerald-800",
      meterColor: "bg-emerald-500",
      commentary: "FULL LEGAL PROTECTION. This meets the IRC § 4958 Rebuttable Presumption standard. The conflict is neutralized, and the board is legally shielded by relying on written market surveys of similar literacy programs."
    }
  ],
  "director-micromanaging-staff": [
    {
      text: "Option A: Allow Jenkins to continue directing staff to maximize his retired executive volunteer help.",
      grade: 'F',
      riskLevel: 90,
      color: "border-burgundy/40 bg-burgundy/5 text-burgundy",
      meterColor: "bg-burgundy",
      commentary: "OPERATIONAL HAVOC. An individual director has zero executive authority. Allowing direct instruction to staff destroys the ED's authority, causes severe scheduling and labor issues, and exposes the board to labor disputes and lawsuits."
    },
    {
      text: "Option B: Talk to Jenkins casually and ask him to be a bit more subtle when talking to staff.",
      grade: 'C',
      riskLevel: 45,
      color: "border-brass/40 bg-brass/5 text-ink/80",
      meterColor: "bg-brass",
      commentary: "INEFFECTIVE boundary setting. Casual conversations do not change systemic behavior or formalize corporate authority. A clear, written delegation policy is required to bind individual board members."
    },
    {
      text: "Option C: The Board President meets with Jenkins to state the statutory chain of command, updates the Board Policy Manual, and holds a full board re-orientation.",
      grade: 'A',
      riskLevel: 5,
      color: "border-emerald-500/40 bg-emerald-50/50 text-emerald-800",
      meterColor: "bg-emerald-500",
      commentary: "EXCELLENT GOVERNANCE. This formally separates collective board oversight (setting policies) from individual staff management. It shields the board and staff from operational conflicts and labor risks."
    }
  ],
  "treasurer-vague-financials": [
    {
      text: "Option A: Accept the single-page cash report because the board trusts the Treasurer's fifteen years of experience.",
      grade: 'F',
      riskLevel: 95,
      color: "border-burgundy/40 bg-burgundy/5 text-burgundy",
      meterColor: "bg-burgundy",
      commentary: "GROSS NEGLIGENCE. Relying on trust alone is a direct breach of the Duty of Care. If funds are embezzled or a cash crisis strikes, individual directors can be held personally liable for failing to perform basic oversight and reasonable inquiry."
    },
    {
      text: "Option B: Ask the Treasurer to print a few more pages of details next quarter if it's not too much trouble.",
      grade: 'C',
      riskLevel: 50,
      color: "border-brass/40 bg-brass/5 text-ink/80",
      meterColor: "bg-brass",
      commentary: "WEAK INQUIRY. Asking politely without passing a formal resolution leaves the board without systemic safety. Full statements (P&L, Balance Sheet, Budget-to-Actuals) are legal duties, not optional favors."
    },
    {
      text: "Option C: Pass a board resolution establishing a standalone Audit Committee, mandate monthly detailed Board Books, and implement the 10-Largest-Deviations rule.",
      grade: 'A',
      riskLevel: 5,
      color: "border-emerald-500/40 bg-emerald-50/50 text-emerald-800",
      meterColor: "bg-emerald-500",
      commentary: "PRISTINE STEWARDSHIP. Establishing a separate Audit Committee complies with federal best practices and state laws (e.g., required in California at $2M+ gross revenues). Requiring timely detailed financials and deviation reports shields the board under the Business Judgment Rule."
    }
  ],
  "missing-receipts-variance": [
    {
      text: "Option A: Take the ED's word that the $18,000 credit card expenses were for donor outreach and approve them.",
      grade: 'F',
      riskLevel: 100,
      color: "border-burgundy/40 bg-burgundy/5 text-burgundy",
      meterColor: "bg-burgundy",
      commentary: "SEVERE AG EXPOSURE. Approving unsubstantiated charges is a breach of trust and a potential criminal violation. The IRS can classify these as automatic taxable income to the ED, and the AG may investigate the board for failure to protect assets."
    },
    {
      text: "Option B: Ask the ED to look for the receipts again and tell him to be more careful in the future.",
      grade: 'C',
      riskLevel: 60,
      color: "border-brass/40 bg-brass/5 text-ink/80",
      meterColor: "bg-brass",
      commentary: "DEFICIENT INQUIRY. Failing to suspend the card or demand immediate reimbursement is passive oversight. If the ED continues this behavior, the board is complicit in the eyes of regulators."
    },
    {
      text: "Option C: Engage independent legal counsel, suspend the credit card, issue a 14-day formal demand, and reclassify unproven charges as taxable income.",
      grade: 'A',
      riskLevel: 2,
      color: "border-emerald-500/40 bg-emerald-50/50 text-emerald-800",
      meterColor: "bg-emerald-500",
      commentary: "IMPECCABLE DEFENSIVE ACTION. Engaging legal counsel protects the board's fiduciary status. Forcing reimbursement or W-2 reclassification of unproven charges immunizes the board from AG and IRS compliance violations."
    }
  ],
  "donor-restricted-gift-crisis": [
    {
      text: "Option A: Pretend the land restriction was always in place and scramble to cover general expenses from other funds.",
      grade: 'F',
      riskLevel: 95,
      color: "border-burgundy/40 bg-burgundy/5 text-burgundy",
      meterColor: "bg-burgundy",
      commentary: "ILLEGAL MIXING. Changing records retroactively or misallocating operating capital violates donor intent. Spending restricted donor capital on unauthorized expenses is a breach of charitable trust under UPMIFA, leading to AG audits."
    },
    {
      text: "Option B: Politely ask the donor to overlook the spent funds and hope they don't demand an escrow statement.",
      grade: 'C',
      riskLevel: 55,
      color: "border-brass/40 bg-brass/5 text-ink/80",
      meterColor: "bg-brass",
      commentary: "RISK-PRONE COMPROMISE. Hope is not a compliance strategy. If the donor is dissatisfied and reports the board to the AG, an investigation is virtually guaranteed, even if the original intent was unrestricted."
    },
    {
      text: "Option C: Verify original unconditional letter, consult counsel, transparently brief the donor, and implement a formal Gift Acceptance Policy.",
      grade: 'A',
      riskLevel: 5,
      color: "border-emerald-500/40 bg-emerald-50/50 text-emerald-800",
      meterColor: "bg-emerald-500",
      commentary: "SECURE & ETHICAL. Reviewing original documentation determines the legal reality. Communicating transparently and establishing clear Gift Acceptance agreements prevents donor disputes and shields the board under state and federal law."
    }
  ],
  "youth-safety-compliance-failure": [
    {
      text: "Option A: Keep programs running as-is and ask the coordinator to catch up on screenings over the next month.",
      grade: 'F',
      riskLevel: 100,
      color: "border-burgundy/40 bg-burgundy/5 text-burgundy",
      meterColor: "bg-burgundy",
      commentary: "GROSS NEGLIGENCE. Allowing unscreened volunteers to work with youth is a catastrophic risk. If an abuse event occurs, directors face devastating personal, civil, and criminal liability for neglecting safety guidelines."
    },
    {
      text: "Option B: Tell the mentor who drove the youth alone to not do it again, but don't pause any program.",
      grade: 'C',
      riskLevel: 50,
      color: "border-brass/40 bg-brass/5 text-ink/80",
      meterColor: "bg-brass",
      commentary: "INSUFFICIENT OVERSIGHT. Ignoring the volunteer screening backlog because 'it's an administrative hassle' does not mitigate liability. One warning to a single mentor does not fix a systemic screening failure."
    },
    {
      text: "Option C: Suspend the mentor, halt operations for any unscreened volunteer, run an emergency 72-hour Live Scan blitz, and establish a Board Safety Committee.",
      grade: 'A',
      riskLevel: 1,
      color: "border-emerald-500/40 bg-emerald-50/50 text-emerald-800",
      meterColor: "bg-emerald-500",
      commentary: "OUTSTANDING FIDUCIARY DEFENSE. Halting unscreened programs immediately and executing an emergency safety blitz preserves youth protection. Creating a standing board oversight committee satisfies strict fiduciary Duty of Care standards."
    }
  ]
};

export const ScenarioReader: React.FC = () => {
  const { queryParams, navigate } = useRouter();
  const slug = queryParams.id || '';

  // Find scenario
  const scenario = scenarios.find((sc) => sc.slug === slug);

  // Simulation Option State
  const [selectedOption, setSelectedOption] = useState<number | null>(() => {
    try {
      const saved = localStorage.getItem('cdx_scenario_sim_decisions');
      if (saved) {
        const parsed = JSON.parse(saved);
        if (parsed && typeof parsed === 'object' && typeof parsed[slug] === 'number') {
          return parsed[slug];
        }
      }
    } catch (e) {
      console.error(e);
    }
    return null;
  });

  const handleSelectOption = (idx: number) => {
    setSelectedOption(idx);
    try {
      const saved = localStorage.getItem('cdx_scenario_sim_decisions');
      const parsed = saved ? JSON.parse(saved) : {};
      parsed[slug] = idx;
      localStorage.setItem('cdx_scenario_sim_decisions', JSON.stringify(parsed));
    } catch (e) {
      console.error(e);
    }
  };

  const [feedback, setFeedback] = useState<'yes' | 'no' | null>(() => {
    try {
      const saved = localStorage.getItem(`cdx_feedback_status_${slug}`);
      return saved as 'yes' | 'no' | null;
    } catch {
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
                  {parseTextWithGlossary(scenario.facts)}
                </p>
              </div>

              {/* HIGH-STAKES RISKS (Copper Alert Block) */}
              <div className="bg-copper/5 border border-copper/20 p-5 sm:p-6 rounded-lg space-y-3">
                <h3 className="font-sans font-extrabold text-xs uppercase tracking-widest text-copper flex items-center gap-1.5">
                  <AlertTriangle className="w-4 h-4 text-copper" />
                  <span>D&O Liability and Regulatory Risks</span>
                </h3>
                <p className="font-sans text-xs sm:text-sm text-ink/80 leading-relaxed font-medium">
                  {parseTextWithGlossary(scenario.risk)}
                </p>
              </div>

              {/* FIDUCIARY QUESTION (Elegant Quote Block) */}
              <div className="space-y-3 text-center py-4 border-t border-b border-fog/60">
                <h4 className="font-sans font-extrabold text-[10px] uppercase tracking-widest text-ink/40">Fiduciary Question Under Discussion</h4>
                <p className="font-serif italic text-base sm:text-lg lg:text-xl text-slate-brand font-medium leading-relaxed max-w-2xl mx-auto">
                  "{scenario.boardQuestion}"
                </p>
              </div>

              {/* Interactive Scenario Decision Simulator (Enhancement 3) */}
              {simulationData[slug] && (
                <div className="bg-white rounded-xl border border-brass/30 p-6 sm:p-8 shadow-sm space-y-6 text-left relative overflow-hidden">
                  <div className="space-y-1.5">
                    <div className="inline-flex items-center gap-1.5 text-xs text-brass font-bold uppercase tracking-wider">
                      <Sparkles className="w-4 h-4 text-brass" />
                      <span>Fiduciary Classroom Simulator</span>
                    </div>
                    <h2 className="font-serif text-xl sm:text-2xl text-ink font-bold tracking-tight">
                      Test Your Fiduciary Judgment
                    </h2>
                    <p className="text-xs text-ink/75 leading-relaxed font-sans font-medium">
                      Board directors face serious, personal joint-and-several liabilities if they make hasty decisions on conflicts of interest, finances, or compliance. Select an action path below to see how it impacts your **Director Liability Meter**.
                    </p>
                  </div>

                  {/* Options List */}
                  <div className="space-y-3">
                    {simulationData[slug].map((option, idx) => {
                      const isSelected = selectedOption === idx;
                      return (
                        <button
                          key={idx}
                          onClick={() => handleSelectOption(idx)}
                          className={`w-full text-left p-4 rounded-lg border-2 transition-all cursor-pointer flex items-start gap-3 ${
                            isSelected
                              ? 'border-brass bg-brass/5 ring-1 ring-brass/30 shadow-md'
                              : 'border-fog bg-white hover:border-brass/40 hover:bg-paper/5'
                          }`}
                        >
                          <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center shrink-0 mt-0.5 ${
                            isSelected ? 'border-brass text-brass bg-brass/10' : 'border-ink/20'
                          }`}>
                            {isSelected && <div className="w-2.5 h-2.5 rounded-full bg-brass"></div>}
                          </div>
                          <span className={`text-xs sm:text-sm font-sans font-semibold leading-relaxed ${
                            isSelected ? 'text-ink font-bold' : 'text-ink/80'
                          }`}>
                            {option.text}
                          </span>
                        </button>
                      );
                    })}
                  </div>

                  {/* Director Liability Meter Gauge */}
                  {selectedOption !== null ? (
                    <div className="space-y-4 pt-4 border-t border-fog/50 animate-fade-in">
                      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                        <div className="space-y-1">
                          <span className="text-[10px] font-black text-ink/50 uppercase tracking-widest block font-sans">
                            Director Personal Liability Gauge
                          </span>
                          <span className="text-xs font-bold font-sans text-ink">
                            Current Choice: <span className="font-serif font-black italic">{simulationData[slug][selectedOption].grade === 'A' ? 'Safe Compliance (Grade A)' : simulationData[slug][selectedOption].grade === 'C' ? 'Vulnerable / Alert (Grade C)' : 'Extreme Exposure (Grade F)'}</span>
                          </span>
                        </div>

                        {/* Visual Gauge */}
                        <div className="w-full sm:w-48 space-y-1.5">
                          <div className="flex justify-between text-[9px] font-extrabold text-ink/40 uppercase tracking-wider font-sans">
                            <span>Safe</span>
                            <span>Critical Risk</span>
                          </div>
                          <div className="h-3 bg-fog rounded-full overflow-hidden relative border border-fog/40 shadow-inner">
                            <div
                              className={`h-full transition-all duration-700 ease-out-back ${simulationData[slug][selectedOption].meterColor}`}
                              style={{ width: `${simulationData[slug][selectedOption].riskLevel}%` }}
                            ></div>
                          </div>
                          <div className="text-right text-[10px] font-black text-ink/65 font-sans">
                            {simulationData[slug][selectedOption].riskLevel}% Personal Exposure
                          </div>
                        </div>
                      </div>

                      {/* Advisory Commentary */}
                      <div className={`p-4 rounded-lg border flex gap-3 text-xs leading-relaxed font-sans font-medium ${simulationData[slug][selectedOption].color}`}>
                        <AlertCircle className="w-5 h-5 shrink-0 mt-0.5" />
                        <div className="space-y-1">
                          <span className="font-black uppercase tracking-wide text-[10px] block">Attorney Case Evaluation:</span>
                          <p className="leading-relaxed font-medium">{parseTextWithGlossary(simulationData[slug][selectedOption].commentary)}</p>
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div className="p-5 border border-dashed border-fog rounded-lg text-center bg-paper/5">
                      <AlertTriangle className="w-6 h-6 text-ink/20 mx-auto mb-1" />
                      <p className="text-xs text-ink/50 font-sans font-semibold">
                        Select one of the three action options above to activate the Director Liability Gauge.
                      </p>
                    </div>
                  )}
                </div>
              )}

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

                <div className="p-4 bg-paper/50 border border-fog/60 rounded text-[11px] text-ink/60 leading-relaxed font-sans italic">
                  <strong>Educational Case Disclaimer:</strong> These resources are educational and focus on nonprofit board governance, federal tax-exempt organization issues, and practical oversight. They are not legal, tax, accounting, or employment advice and do not create an attorney-client relationship. State nonprofit corporation law, charitable registration rules, employment law, mandatory reporting law, governing documents, grant terms, and organization-specific facts may change the analysis.
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
                  onClick={() => {
                    let webinarId = 'webinar-fiduciary-update';
                    if (scenario.slug === 'founder-salary-conflict') {
                      webinarId = 'webinar-comp';
                    } else if (scenario.slug === 'treasurer-vague-financials' || scenario.slug === 'missing-receipts-variance') {
                      webinarId = 'webinar-audit';
                    }
                    navigate(`webinar-registration?webinar=${webinarId}`);
                  }}
                  className="w-full sm:w-auto inline-flex justify-center items-center px-4 py-2.5 bg-slate-brand hover:bg-ink text-white text-xs font-bold uppercase tracking-wider rounded shadow transition-premium cursor-pointer text-center"
                >
                  Register For Webinar
                </button>
              </div>

              {/* RELATED ARTICLES */}
              {matchedArticles.length > 0 && (
                <div className="pt-6 border-t border-fog/60 space-y-3">
                  <h4 className="font-sans font-extrabold text-xs uppercase tracking-widest text-ink/50">Related Fiduciary Training Series:</h4>
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
                        <button
                          onClick={() => {
                            const t = scenario.issueType.toLowerCase();
                            const topicSlug = t.includes('minutes') ? 'minutes' :
                                              t.includes('budget') ? 'budget' :
                                              t.includes('bylaws') ? 'bylaws' :
                                              t.includes('fiduciary') ? 'fiduciary' : 'general';
                            const messageText = `We are reviewing the case study: "${scenario.title}" and would like to request professional board governance and safety guidance.`;
                            navigate(`contact-us?topic=${topicSlug}&message=${encodeURIComponent(messageText)}`);
                          }}
                          className="inline-flex items-center gap-1.5 px-4 py-2 bg-burgundy hover:bg-ink text-white text-xs font-bold uppercase tracking-wider rounded shadow transition-premium cursor-pointer font-sans font-bold border-0"
                        >
                          <span>Consult Attorney Now ➜</span>
                        </button>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* LEGAL REFERRAL ROW */}
              <div className="pt-2">
                <LegalEscalationCard 
                  trigger="Navigating a delicate conflict or board compliance crisis?"
                  explanation="The attorneys at NPO Lawyers advise boards on recusal procedures, comparable salary documentation audits, and corporate restructurings in accordance with state and federal standards."
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
