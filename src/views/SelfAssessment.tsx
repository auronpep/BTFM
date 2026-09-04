import React, { useState } from 'react';
import { useRouter } from '../components/Router';
import { Layout } from '../components/Layout';
import { Award, CheckCircle, RefreshCw, ChevronRight, ChevronLeft, ShieldCheck, Printer } from 'lucide-react';

interface Question {
  id: number;
  text: string;
  options: {
    text: string;
    points: number;
    description: string;
  }[];
}

const questions: Question[] = [
  {
    id: 1,
    text: "Board Size and Independence",
    options: [
      { text: "Fewer than 5 directors, or mostly family members and business partners.", points: 1, description: "Highly vulnerable to IRS scrutiny; lacks independent oversight." },
      { text: "5 or more directors, but some are related or have business relationships.", points: 3, description: "Partial independence but contains critical conflict-of-interest risks." },
      { text: "5 or more completely unrelated, independent directors with diverse skills.", points: 5, description: "Meets independent governance gold standards. Active oversight." }
    ]
  },
  {
    id: 2,
    text: "Pre-Meeting Packet Preparation",
    options: [
      { text: "Packets are handed out at the meeting, or we don't have packets.", points: 1, description: "Directors cannot exercise Duty of Care without advance reading time." },
      { text: "Packets are emailed 1 to 2 days prior to the meeting.", points: 3, description: "Rushed review; directors frequently skip materials due to late delivery." },
      { text: "Packets are distributed 5 to 7 days prior with written reports.", points: 5, description: "Enables thorough study and written preparation. Best-practice care." }
    ]
  },
  {
    id: 3,
    text: "Meeting Time Allocation (40-40-20 Rule)",
    options: [
      { text: "The CEO or staff reads slides aloud; we listen passively for 90% of the meeting.", points: 1, description: "Ornamental board behavior. Zero active governance happening." },
      { text: "We spend half the time listening to reports and half voting on motions.", points: 3, description: "Average oversight, but lacks focus on strategy and audit." },
      { text: "80% of our meeting is spent on active inquiry and forward-looking strategy.", points: 5, description: "Fully operational 40-40-20 rule. Highly effective deliberation." }
    ]
  },
  {
    id: 4,
    text: "Financial Statement Review",
    options: [
      { text: "We review a single-page cash summary, or we don't look at financials.", points: 1, description: "Severe risk of undetected deficits, fraud, or tax non-withholding." },
      { text: "We receive balance sheets and income statements, but rarely discuss variances.", points: 3, description: "Basic compliance, but fails to check operational deviations." },
      { text: "We audit Balance Sheets, Statement of Activities, and the 10 biggest budget deviations.", points: 5, description: "Robust audit and verification. Strong financial safety." }
    ]
  },
  {
    id: 5,
    text: "Executive Compensation Approval",
    options: [
      { text: "The CEO/ED sets their own salary, or the board votes with the ED in the room.", points: 1, description: "Automatic excess benefit risk. Fines up to 200% under IRC Section 4958." },
      { text: "The board votes on the salary but doesn't review independent comparability data.", points: 3, description: "Lacks IRS safe harbor protection. Vulnerable to audits." },
      { text: "Approved by disinterested directors relying on written comparability surveys.", points: 5, description: "Satisfies the IRS Rebuttable Presumption. Safe harbor achieved." }
    ]
  },
  {
    id: 6,
    text: "Boardroom Minutes and Records",
    options: [
      { text: "We don't keep minutes, or they are written like long personal transcripts.", points: 1, description: "High risk. Verbatim arguments are discoverable in lawsuits." },
      { text: "Minutes are kept but are often vague or unapproved for several meetings.", points: 3, description: "Unreliable corporate record. Fails to document active diligence." },
      { text: "Minutes record resolutions, general deliberation, and recused conflicts neutrally.", points: 5, description: "Clean, defensive records proving compliance and duty of care." }
    ]
  },
  {
    id: 7,
    text: "Youth & Constituent Safety Screening",
    options: [
      { text: "We run programs for youth/volunteers but don't require Live Scan checks.", points: 1, description: "Catastrophic risk. Personal liability exposure for gross negligence." },
      { text: "We require background checks but have a backlog of unscreened volunteers.", points: 3, description: "Policy exists but is un-enforced, creating severe liability loops." },
      { text: "100% of staff and volunteers undergo background checks prior to service.", points: 5, description: "Fulfills physical safety mandate. Zero safety backlogs." }
    ]
  },
  {
    id: 8,
    text: "Directors & Officers (D&O) Insurance",
    options: [
      { text: "We do not have D&O insurance, or we are not sure if we have it.", points: 1, description: "Direct personal asset exposure for every director on the board." },
      { text: "We have general liability, but aren't sure of our D&O/EPLI exclusions.", points: 3, description: "Vulnerable to employment practice disputes (90% of board claims)." },
      { text: "We maintain robust D&O insurance with custom employment practices riders.", points: 5, description: "Complete governance safety cushion. Directors fully protected." }
    ]
  },
  {
    id: 9,
    text: "Conflict-of-Interest Handling",
    options: [
      { text: "We do transactions with directors' private businesses without formal votes.", points: 1, description: "Direct violation of the Duty of Loyalty. Suspect transactions." },
      { text: "Conflicts are disclosed, but the interested directors remain in the room and vote.", points: 3, description: "Violates standard state corporate codes (including California Corp Code § 5233). Transactions voidable." },
      { text: "Conflicts disclosed; interested director recuses, leaves room, and disinterested vote occurs.", points: 5, description: "Fulfills Duty of Loyalty. Bulletproof record of disinterested voting." }
    ]
  },
  {
    id: 10,
    text: "Bylaws and Policy Review",
    options: [
      { text: "Our bylaws are over 10 years old, or we have no Board Policy Manual.", points: 1, description: "Bylaws are obsolete. Operating without a legal guide book." },
      { text: "We have bylaws and policies, but haven't reviewed them in over 3 years.", points: 3, description: "Out of sync with modern state and federal regulatory changes." },
      { text: "Bylaws and policy manuals are formally audited and updated every 2 years.", points: 5, description: "Maximum compliance readiness. Aligned with current statutory rules." }
    ]
  }
];

export const SelfAssessment: React.FC = () => {
  const { navigate } = useRouter();
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedOptions, setSelectedOptions] = useState<Record<number, number>>({});
  const [quizComplete, setQuizComplete] = useState(false);
  const [expandedCategory, setExpandedCategory] = useState<number | null>(null);

  const calculateCategoryScores = () => {
    const categories = [
      {
        name: "Legal & Compliance Duty",
        qIds: [1, 3, 5], // Board Independence, Meeting Time Allocation, Exec Compensation
        maxPoints: 15,
        color: "bg-burgundy",
        textColor: "text-burgundy",
        guidance: "Duty of Loyalty & CA Corp Code. Low scores risk excess benefit penalties."
      },
      {
        name: "Financial & Audit Control",
        qIds: [2, 4, 7], // Packet Prep, Financial Review, Constituent Safety
        maxPoints: 15,
        color: "bg-teal-brand",
        textColor: "text-teal-brand",
        guidance: "Financial oversight and physical/legal protection screens."
      },
      {
        name: "Operational & Meeting Prep",
        qIds: [6, 8], // Minutes, D&O Insurance
        maxPoints: 10,
        color: "bg-slate-brand",
        textColor: "text-slate-brand",
        guidance: "Duty of Care, D&O liability shields, and defensive minutes."
      },
      {
        name: "Board Leadership & Administration",
        qIds: [9, 10], // Conflict of Interest, Bylaws Review
        maxPoints: 10,
        color: "bg-copper",
        textColor: "text-copper",
        guidance: "Corporate bylaws structure and conflict recusal discipline."
      }
    ];

    return categories.map(cat => {
      let score = 0;
      cat.qIds.forEach(id => {
        const qIdx = id - 1; // 0-indexed question index
        const optIdx = selectedOptions[qIdx];
        if (optIdx !== undefined) {
          score += questions[qIdx].options[optIdx].points;
        }
      });

      const percent = Math.round((score / cat.maxPoints) * 100);
      
      // Rating
      let rating: string;
      let ratingColor: string;
      const ratio = score / cat.maxPoints;
      if (ratio <= 0.45) {
        rating = "Critical Exposure";
        ratingColor = "bg-burgundy/10 text-burgundy border-burgundy/30";
      } else if (ratio <= 0.85) {
        rating = "Basic Compliance";
        ratingColor = "bg-copper/10 text-copper border-copper/30";
      } else {
        rating = "Gold Standard";
        ratingColor = "bg-teal-brand/10 text-teal-brand border-teal-brand/30";
      }

      return {
        ...cat,
        score,
        percent,
        rating,
        ratingColor
      };
    });
  };

  const handleOptionSelect = (optionIndex: number) => {
    setSelectedOptions({
      ...selectedOptions,
      [currentQuestionIndex]: optionIndex
    });
  };

  const handleNext = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      setQuizComplete(true);
      localStorage.setItem('cdx_self_assessment_score', score.toString());
      localStorage.setItem('cdx_self_assessment_level', assessment.level.split(':')[0].trim());
    }
  };

  const handlePrev = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
    }
  };

  const handleReset = () => {
    setCurrentQuestionIndex(0);
    setSelectedOptions({});
    setQuizComplete(false);
  };

  const calculateTotalScore = () => {
    return Object.entries(selectedOptions).reduce((sum, [qIdx, optIdx]) => {
      return sum + questions[Number(qIdx)].options[optIdx].points;
    }, 0);
  };

  const getMaturityLevel = (score: number) => {
    if (score <= 15) {
      return {
        level: "Level 1: Attending & Trusting (Rubber Stamp Board)",
        color: "text-burgundy border-burgundy bg-burgundy/5",
        textBg: "bg-burgundy text-white",
        desc: "Your board operates primarily on passive trust, rubber-stamping executive proposals with minimal inquiry or independent verification. This is an extremely high-risk legal posture. Directors face direct personal liability exposure for gross negligence, and the organization is highly vulnerable to IRS audits, embezzlement, or employment practices claims.",
        priority: "IMMEDIATE EMERGENCY AUDIT",
        recs: [
          "Establish at least 5 independent, unrelated directors.",
          "Procure standard Directors & Officers (D&O) insurance immediately.",
          "Distribute detailed board packets at least 5 business days prior to meetings.",
          "Mandate that interested directors recuse themselves from salary votes."
        ],
        referralReason: "Your Level 1 score indicates significant legal exposures. We recommend requesting a comprehensive Bylaws and Governance Review (with specialized state-level counsel or the California Center for Nonprofit Law / NPO Lawyers for West Coast entities) to establish basic fiduciary compliance before a regulatory problem arises."
      };
    } else if (score <= 30) {
      return {
        level: "Level 2: Report-Receiving (Passive Compliance)",
        color: "text-copper border-copper bg-copper/5",
        textBg: "bg-copper text-white",
        desc: "Your board is doing basic compliance work—you receive written packets, maintain general liability, and have some unrelated board members. However, you still function primarily as a report-receiving audience rather than an active governing body. You lack standing audit structures, independent compensation safeguards, and rigorous physical/financial verification systems.",
        priority: "SYSTEM UPGRADE REQUIRED",
        recs: [
          "Transition meeting time away from slides and into active 40-40-20 deliberation.",
          "Adopt the '10-largest deviations' rule for financial reviews rather than general summaries.",
          "Create a formal Board Policy Manual to prevent directors from micromanaging staff.",
          "Audit the screening background status of all youth-facing staff/volunteers."
        ],
        referralReason: "Your board is outgrowing its startup foundations but lacks the defensive structures of an established organization. Speak with qualified nonprofit counsel (or the legal team at California Center for Nonprofit Law / NPO Lawyers) regarding drafting a customized Board Policy Manual and setting up disinterested executive salary safe harbors."
      };
    } else if (score <= 42) {
      return {
        level: "Level 3: Active Oversight (The Governed Board)",
        color: "text-slate-brand border-slate-brand bg-slate-brand/5",
        textBg: "bg-slate-brand text-white",
        desc: "Your board is highly effective and operates with serious governance discipline. You practice pre-meeting preparation, active financial oversight, and maintain excellent compliance screens. You are protecting the organization and shielding directors from major liabilities.",
        priority: "POLISH & SOLIDIFY",
        recs: [
          "Formalize your Audit Committee by board resolution if revenues approach $2M.",
          "Benchmark your executive salary using professional regional or California CPA comparability surveys.",
          "Conduct biennial reviews of your bylaws to ensure alignment with recent state corporate law developments.",
          "Establish an annual board self-assessment rhythm."
        ],
        referralReason: "Your board is highly functional. To maintain this excellence and ensure compliance with strict state audit thresholds (such as California's $2M rule) or executive compensation standards, consider a routine annual review of your minutes and filings by specialized counsel, such as the team at NPO Lawyers."
      };
    } else {
      return {
        level: "Level 4: Institutional Stewardship (The Exemplar Board)",
        color: "text-teal-brand border-teal-brand bg-teal-brand/5",
        textBg: "bg-teal-brand text-white",
        desc: "Congratulations. Your board operates at the absolute gold standard of institutional governance. You have a highly diverse, independent board, complete pre-meeting discipline, separate audit committees, robust comparability salary records, and clean defensive minutes. You serve as an exemplar of organization stewardship.",
        priority: "PRESERVE EXCELLENCE",
        recs: [
          "Mentor other local and regional boards on governance best-practices.",
          "Incorporate a standing annual board calendar into your policy manuals.",
          "Conduct a peer-review or external legal check on your bylaws every 3 years."
        ],
        referralReason: "Your board is exceptional. Ensure your high-level governance is integrated into your donor solicitation materials and grant proposals. For continuing regulatory counsel or California-specific operations, the team at NPO Lawyers can assist as you navigate strategic growth, endowment building, or real estate acquisitions."
      };
    }
  };

  const isCurrentAnswered = selectedOptions[currentQuestionIndex] !== undefined;
  const currentQuestion = questions[currentQuestionIndex];
  const score = calculateTotalScore();
  const assessment = getMaturityLevel(score);

  return (
    <Layout>
      <div className="py-12 bg-paper/30 min-h-screen px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto space-y-8">
          {/* Header */}
          <div className="text-center space-y-3">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-brass/10 border border-brass/30 text-brass rounded-full text-xs font-semibold uppercase tracking-wider">
              <Award className="w-3.5 h-3.5" />
              <span>Interactive Governance Laboratory</span>
            </div>
            <h1 className="font-serif text-3xl sm:text-4xl text-ink font-bold tracking-wide">
              Mature Board Self-Assessment
            </h1>
            <p className="max-w-2xl mx-auto text-sm sm:text-base text-ink/70">
              Evaluate your board against standard state fiduciary laws (with California statutory snapshots) and IRS 501(c)(3) guidelines. Complete this 10-question diagnostic to discover your maturity tier.
            </p>
          </div>

          {/* QUIZ WORKSPACE */}
          {!quizComplete ? (
            <div className="bg-white rounded-xl shadow-md border border-fog p-6 sm:p-8 space-y-6">
              {/* Progress and Question Count */}
              <div className="flex items-center justify-between text-xs font-bold uppercase tracking-widest text-ink/40 pb-4 border-b border-fog/60">
                <span>Governance Area {currentQuestion.id} of {questions.length}</span>
                <div className="flex items-center gap-4">
                  {Object.keys(selectedOptions).length > 0 && (
                    <button
                      onClick={handleReset}
                      className="text-brass hover:text-burgundy flex items-center gap-1.5 transition-premium normal-case text-xs font-semibold cursor-pointer"
                      title="Reset Assessment"
                    >
                      <RefreshCw className="w-3.5 h-3.5 animate-spin-hover" />
                      <span>Reset Quiz</span>
                    </button>
                  )}
                  <span className="text-brass">Progress: {Math.round((currentQuestion.id / questions.length) * 100)}%</span>
                </div>
              </div>

              {/* Progress Bar */}
              <div className="w-full bg-fog h-2 rounded-full overflow-hidden">
                <div 
                  className="bg-brass h-full transition-premium" 
                  style={{ width: `${(currentQuestion.id / questions.length) * 100}%` }}
                />
              </div>

              {/* Question Statement */}
              <div className="space-y-2">
                <h3 className="font-serif text-xl sm:text-2xl text-slate-brand font-semibold leading-tight">
                  {currentQuestion.text}
                </h3>
                <p className="text-xs text-ink/50 uppercase tracking-wider font-semibold">Select the statement that most closely describes your current board operations:</p>
              </div>

              {/* Options Grid */}
              <div className="space-y-4">
                {currentQuestion.options.map((opt, oIdx) => {
                  const isSelected = selectedOptions[currentQuestionIndex] === oIdx;
                  return (
                    <div
                      key={oIdx}
                      onClick={() => handleOptionSelect(oIdx)}
                      className={`cursor-pointer p-4 rounded-lg border text-left transition-premium flex items-start gap-4 ${
                        isSelected
                          ? 'border-brass bg-brass/5 shadow-inner'
                          : 'border-fog bg-paper/20 hover:border-slate-brand/40 hover:bg-white'
                      }`}
                    >
                      <div className={`mt-1 w-5 h-5 rounded-full border-2 flex items-center justify-center shrink-0 ${
                        isSelected ? 'border-brass text-brass' : 'border-ink/20'
                      }`}>
                        {isSelected && <div className="w-2.5 h-2.5 bg-brass rounded-full" />}
                      </div>
                      <div className="space-y-1">
                        <p className={`font-sans text-sm sm:text-base font-semibold leading-snug ${isSelected ? 'text-brass' : 'text-ink'}`}>
                          {opt.text}
                        </p>
                        <p className="text-xs text-ink/60 leading-relaxed font-normal">
                          {opt.description}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Nav Buttons */}
              <div className="pt-6 border-t border-fog/60 flex justify-between items-center">
                <button
                  onClick={handlePrev}
                  disabled={currentQuestionIndex === 0}
                  className={`inline-flex items-center gap-1 px-4 py-2.5 text-xs font-bold uppercase tracking-wider rounded border transition-premium ${
                    currentQuestionIndex === 0
                      ? 'border-fog text-ink/20 cursor-not-allowed'
                      : 'border-fog text-ink/75 hover:bg-paper/30'
                  }`}
                >
                  <ChevronLeft className="w-4 h-4" />
                  <span>Back</span>
                </button>

                <button
                  onClick={handleNext}
                  disabled={!isCurrentAnswered}
                  className={`inline-flex items-center gap-1 px-6 py-2.5 text-xs font-bold uppercase tracking-wider rounded transition-premium shadow cursor-pointer ${
                    isCurrentAnswered
                      ? 'bg-slate-brand text-white hover:bg-ink'
                      : 'bg-fog text-ink/40 cursor-not-allowed'
                  }`}
                >
                  <span>{currentQuestionIndex === questions.length - 1 ? "Get Diagnostic Results" : "Next Standard"}</span>
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          ) : (
            /* RESULTS PANEL */
            <div className="space-y-8 animate-fade-in">
              <div className="bg-white rounded-xl shadow-lg border border-fog overflow-hidden">
                {/* Score Banner */}
                <div className={`p-8 text-center border-b border-fog/60 space-y-4 ${assessment.color} border-t-8`}>
                  <p className="text-xs font-bold tracking-widest uppercase">Diagnostic Maturity Tier</p>
                  <h2 className="font-serif text-2xl sm:text-3xl font-extrabold tracking-wide leading-tight">
                    {assessment.level}
                  </h2>
                  
                  {/* Dynamic Circular Progress Representation */}
                  <div className="flex justify-center py-4">
                    <div className="relative flex items-center justify-center">
                      <svg className="w-28 h-28 transform -rotate-90">
                        <circle cx="56" cy="56" r="48" stroke="currentColor" strokeWidth="8" fill="transparent" className="opacity-10" />
                        <circle 
                          cx="56" 
                          cy="56" 
                          r="48" 
                          stroke="currentColor" 
                          strokeWidth="8" 
                          fill="transparent" 
                          strokeDasharray={2 * Math.PI * 48}
                          strokeDashoffset={2 * Math.PI * 48 * (1 - score / 50)}
                          className="transition-premium"
                        />
                      </svg>
                      <div className="absolute flex flex-col items-center">
                        <span className="font-sans font-black text-2xl text-ink">{score}</span>
                        <span className="text-[9px] uppercase tracking-wider text-ink/40 font-bold">of 50 pts</span>
                      </div>
                    </div>
                  </div>

                  <div className={`inline-block px-3 py-1 rounded text-xs font-bold tracking-wider uppercase ${assessment.textBg}`}>
                    Priority Action: {assessment.priority}
                  </div>
                </div>

                <div className="p-6 sm:p-8 space-y-6">
                  {/* Summary Text */}
                  <div className="space-y-2">
                    <h3 className="font-serif font-bold text-lg text-ink">Maturity Diagnostic</h3>
                    <p className="font-sans text-sm sm:text-base text-ink/85 leading-relaxed">
                      {assessment.desc}
                    </p>
                  </div>

                  {/* Fiduciary Competency Scorecard (Upgrade A) */}
                  <div className="pt-6 border-t border-fog/60 space-y-4">
                    <h3 className="font-sans font-extrabold text-xs uppercase tracking-widest text-ink/50 flex items-center gap-1.5">
                      <Award className="w-4 h-4 text-brass" />
                      <span>Fiduciary Competency Scorecard</span>
                    </h3>
                    
                    <div className="space-y-4 text-left">
                      {calculateCategoryScores().map((cat, idx) => {
                        const isExpanded = expandedCategory === idx;
                        const ratio = cat.score / cat.maxPoints;
                        
                        let advice: string;
                        let adviceTitle: string;
                        let adviceBorder: string;
                        let adviceBg: string;
                        
                        if (idx === 0) { // Legal & Compliance
                          if (ratio <= 0.6) {
                            adviceTitle = "🚨 Critical Compliance Risk (State Code or IRS Violation)";
                            advice = "CRITICAL COMPLIANCE RISK: Your board is operating with high exposure. Executive salary setting violates Rebuttable Presumption rules (IRC § 4958), or board size fails state statutory guidelines. Direct personal excise taxes may apply.";
                            adviceBorder = "border-rose-300";
                            adviceBg = "bg-rose-50/50";
                          } else if (ratio <= 0.85) {
                            adviceTitle = "⚠️ Compliance Advisory (Comparability Studies Needed)";
                            advice = "MODERATE ADVISORY: Basic meeting discipline is present, but lacks formal recusal documentation or independent salary benchmarks. Obtain written regional or California comparability studies.";
                            adviceBorder = "border-amber-300";
                            adviceBg = "bg-amber-50/40";
                          } else {
                            adviceTitle = "🛡️ Gold Shield Compliance Approved";
                            advice = "GOLD SHIELD: Meets strict Duty of Loyalty standards. Keep recording disinterested votes and independent compensation comparability reports in meeting minutes.";
                            adviceBorder = "border-emerald-300";
                            adviceBg = "bg-emerald-50/30";
                          }
                        } else if (idx === 1) { // Financial & Audit
                          if (ratio <= 0.6) {
                            adviceTitle = "🚨 Critical Financial Exposure (Breach of Fiduciary Care)";
                            advice = "CRITICAL FINANCIAL EXPOSURE: Absence of robust packet delivery, detailed balance sheet reviews, or constituent background screenings creates severe liability leaks. Directors risk personal liability for breach of oversight.";
                            adviceBorder = "border-rose-300";
                            adviceBg = "bg-rose-50/50";
                          } else if (ratio <= 0.85) {
                            adviceTitle = "⚠️ Financial Review Advisory";
                            advice = "COMPLIANCE REVIEW: Standard financial reports are presented, but variance tolerance limit scanning is absent. Require a formal monthly variance report for deviations over 10%.";
                            adviceBorder = "border-amber-300";
                            adviceBg = "bg-amber-50/40";
                          } else {
                            adviceTitle = "🛡️ Gold Shield Financial Stewardship";
                            advice = "GOLD SHIELD: Outstanding oversight protocols. Background check screening covers 100% of staff and active financials audit protects corporate assets.";
                            adviceBorder = "border-emerald-300";
                            adviceBg = "bg-emerald-50/30";
                          }
                        } else if (idx === 2) { // Operational & Meeting Prep
                          if (ratio <= 0.6) {
                            adviceTitle = "🚨 Personal Asset Exposure Warn (D&O / Minutes Gap)";
                            advice = "CRITICAL PERSONAL ASSET RISKS: Operating without documented meeting minutes or lacking dedicated D&O insurance exposes individual directors' homes and bank accounts to direct creditor and employee litigation.";
                            adviceBorder = "border-rose-300";
                            adviceBg = "bg-rose-50/50";
                          } else if (ratio <= 0.85) {
                            adviceTitle = "⚠️ Record Keeping & Insurance Advisory";
                            advice = "OPERATIONAL GAP: Standard liability shields are present, but minute-taking practices are vague or lack systematic approval. Ensure minutes strictly record neutral resolution boundaries.";
                            adviceBorder = "border-amber-300";
                            adviceBg = "bg-amber-50/40";
                          } else {
                            adviceTitle = "🛡️ Gold Shield Liability Cushion";
                            advice = "GOLD SHIELD: Safe and secure. Robust D&O policy limits and professional defensive minutes protect all active directors.";
                            adviceBorder = "border-emerald-300";
                            adviceBg = "bg-emerald-50/30";
                          }
                        } else { // Board Leadership
                          if (ratio <= 0.6) {
                            adviceTitle = "🚨 Outdated Bylaws (Decisions Legally Voidable)";
                            advice = "CRITICAL GOVERNING DEFICIT: Bylaws are obsolete (exceeding 10 years old) or conflict-of-interest voting procedures directly violate standard state corporate codes (such as California Corporations Code § 5233). Decisions may be legally voided.";
                            adviceBorder = "border-rose-300";
                            adviceBg = "bg-rose-50/50";
                          } else if (ratio <= 0.85) {
                            adviceTitle = "⚠️ Governance Code Advisory";
                            advice = "GOVERNANCE REVIEW: Basic policies are available but updated infrequently. Plan a formal bylaws review session in the next 12 months to align with recent state statutory shifts.";
                            adviceBorder = "border-amber-300";
                            adviceBg = "bg-amber-50/40";
                          } else {
                            adviceTitle = "🛡️ Gold Shield Administration";
                            advice = "GOLD SHIELD: Stellar governance rhythm. Biennial audits keep corporate guidelines in perfect alignment with statutory changes.";
                            adviceBorder = "border-emerald-300";
                            adviceBg = "bg-emerald-50/30";
                          }
                        }

                        return (
                          <div 
                            key={idx} 
                            className="p-4 bg-paper/10 border border-fog/50 rounded-xl space-y-2 hover:border-brass/30 transition-premium cursor-pointer"
                            onClick={() => setExpandedCategory(isExpanded ? null : idx)}
                          >
                            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 text-xs font-semibold">
                              <span className="font-serif font-bold text-ink text-sm leading-none">{cat.name}</span>
                              <div className="flex items-center gap-2 font-sans">
                                <span className={`px-2 py-0.5 rounded text-[9px] font-bold border uppercase tracking-wider ${cat.ratingColor}`}>
                                  {cat.rating}
                                </span>
                                <span className="font-mono font-bold text-ink/70 shrink-0 w-16 text-right">
                                  {cat.score} / {cat.maxPoints} pts
                                </span>
                              </div>
                            </div>
                            
                            <div className="w-full bg-fog h-2.5 rounded-full overflow-hidden border border-fog/40">
                              <div 
                                className={`h-full rounded-full transition-all duration-500 ${cat.color}`}
                                style={{ width: `${cat.percent}%` }}
                              />
                            </div>
                            
                            <div className="flex items-center justify-between text-[11px] text-ink/50 pt-1 font-sans">
                              <span>{cat.guidance}</span>
                              <span className="text-brass font-bold hover:underline shrink-0 pl-2">
                                {isExpanded ? "Hide Counsel Advice ▲" : "Show Counsel Advice ▼"}
                              </span>
                            </div>

                            {isExpanded && (
                              <div className={`mt-3 p-3 rounded-lg border text-xs leading-relaxed font-sans ${adviceBorder} ${adviceBg} animate-fade-in`}>
                                <p className="font-bold text-ink mb-1">{adviceTitle}</p>
                                <p className="text-ink/80">{advice}</p>
                              </div>
                            )}
                          </div>
                        );
                      })}
                    </div>
                  </div>

                  {/* Recommendations */}
                  <div className="pt-6 border-t border-fog/60 space-y-4">
                    <h3 className="font-sans font-extrabold text-xs uppercase tracking-widest text-ink/50 flex items-center gap-1.5">
                      <ShieldCheck className="w-4 h-4 text-brass" />
                      <span>Targeted Governance Action Plan</span>
                    </h3>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {assessment.recs.map((rec, rIdx) => (
                        <div key={rIdx} className="flex items-start gap-3 bg-paper/20 p-4 rounded border border-fog/40">
                          <CheckCircle className="w-4 h-4 text-brass mt-0.5 shrink-0" />
                          <span className="text-xs sm:text-sm text-ink leading-relaxed font-medium">{rec}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Customized Referral Funnel */}
                  <div className="pt-6 border-t border-fog/60">
                    <div className="bg-burgundy/5 border border-burgundy/20 rounded-lg p-5 flex flex-col md:flex-row items-center justify-between gap-6">
                      <div className="space-y-2 text-left">
                        <h4 className="font-serif font-bold text-base text-burgundy">Legal Risk Evaluation Memo</h4>
                        <p className="font-sans text-xs text-ink/80 leading-relaxed max-w-xl">
                          {assessment.referralReason}
                        </p>
                      </div>
                      <button
                        onClick={() => {
                          const messageText = `We have completed the Mature Board Self-Assessment and scored ${score}/50 (Level: ${assessment.level}). We would like to schedule a customized board counsel audit to address our identified governance priority action: ${assessment.priority}.`;
                          navigate(`contact-us?topic=fiduciary&message=${encodeURIComponent(messageText)}`);
                        }}
                        className="w-full md:w-auto inline-flex items-center justify-center gap-1.5 px-5 py-3 bg-burgundy hover:bg-ink text-white text-xs font-bold uppercase tracking-wider rounded shadow transition-premium whitespace-nowrap shrink-0 border-0 cursor-pointer"
                      >
                        <span>Schedule Board Counsel Audit</span>
                        <ChevronRight className="w-3.5 h-3.5 text-brass" />
                      </button>
                    </div>
                  </div>

                  {/* Diagnostic Reset Button */}
                  <div className="pt-6 border-t border-fog/60 flex flex-col sm:flex-row gap-3 justify-end">
                    <button
                      onClick={() => window.print()}
                      className="inline-flex items-center justify-center gap-1 px-4 py-2.5 bg-paper hover:bg-fog text-ink text-xs font-bold uppercase tracking-wider rounded border border-fog transition-premium cursor-pointer"
                    >
                      <Printer className="w-4 h-4" />
                      <span>Print Summary</span>
                    </button>
                    <button
                      onClick={handleReset}
                      className="inline-flex items-center justify-center gap-1 px-6 py-2.5 bg-slate-brand hover:bg-ink text-white text-xs font-bold uppercase tracking-wider rounded transition-premium shadow cursor-pointer"
                    >
                      <RefreshCw className="w-4 h-4" />
                      <span>Retake Assessment</span>
                    </button>
                  </div>
                </div>
              </div>

              {/* Back to tools CTA */}
              <div className="text-center">
                <button
                  onClick={() => navigate('tools')}
                  className="text-xs font-bold uppercase tracking-widest text-slate-brand hover:text-brass transition-premium inline-flex items-center gap-1"
                >
                  <span>Explore Other Governance Tools & Worksheets</span>
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
};
