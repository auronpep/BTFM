import React, { useState } from 'react';
import { useRouter } from '../components/Router';
import { Layout } from '../components/Layout';
import { californiaRules } from '../data/californiaRules';
import type { CaliforniaRule } from '../data/californiaRules';
import { CaliforniaNoteBadge, LegalEscalationCard } from '../components/BoardroomCards';
import { CheckSquare, Square, Landmark, ChevronRight, ShieldCheck, AlertTriangle, Terminal, Search, Loader2, Copy, Check, ShieldAlert, FileText } from 'lucide-react';
import { parseTextWithStatutesAndGlossary } from '../components/StatuteTooltip';

export const CaliforniaRules: React.FC = () => {
  const { navigate } = useRouter();

  // State for Registry Finder Widget (Enhancement 4)
  const [registryQuery, setRegistryQuery] = useState(() => {
    try {
      const saved = localStorage.getItem('cdx_registry_scanner_cache');
      return saved ? JSON.parse(saved).query : '';
    } catch {
      return '';
    }
  });

  const [scanResult, setScanResult] = useState<'active' | 'delinquent' | 'suspended' | null>(() => {
    try {
      const saved = localStorage.getItem('cdx_registry_scanner_cache');
      return saved ? JSON.parse(saved).status : null;
    } catch {
      return null;
    }
  });

  const [isScanning, setIsScanning] = useState(false);
  const [scanLogs, setScanLogs] = useState<string[]>([]);
  const [activeTab, setActiveTab] = useState<'active' | 'delinquent' | 'suspended'>('delinquent'); // Default to delinquent

  const runRegistryScan = (e: React.FormEvent) => {
    e.preventDefault();
    if (!registryQuery.trim()) return;

    setIsScanning(true);
    setScanLogs([]);
    setScanResult(null);

    const logs = [
      "Initializing secure state database handshake...",
      "Searching California Secretary of State (SOS) BizFile Database...",
      "Cross-referencing Franchise Tax Board (FTB) tax-exempt status...",
      "Querying Attorney General Registry of Charitable Trusts (CT)...",
      "Scanning annual Form RRF-1 & CT-TR-1 filing history...",
      "Scan complete. Status resolved."
    ];

    let currentLogIndex = 0;
    
    const interval = setInterval(() => {
      if (currentLogIndex < logs.length) {
        setScanLogs(prev => [...prev, `[${new Date().toLocaleTimeString()}] ${logs[currentLogIndex]}`]);
        currentLogIndex++;
      } else {
        clearInterval(interval);
        setIsScanning(false);
        setScanResult(activeTab);
        localStorage.setItem('cdx_registry_scanner_cache', JSON.stringify({
          query: registryQuery,
          status: activeTab
        }));
      }
    }, 250);
  };

  // State for Bylaws Health Analyzer (Enhancement 5)
  const [bylawChecks, setBylawChecks] = useState<boolean[]>(() => {
    try {
      const stored = localStorage.getItem('cdx_bylaws_audit_checked');
      return stored ? JSON.parse(stored) : Array(10).fill(false);
    } catch {
      return Array(10).fill(false);
    }
  });

  const handleToggleBylawCheck = (idx: number) => {
    const next = [...bylawChecks];
    next[idx] = !next[idx];
    setBylawChecks(next);
    localStorage.setItem('cdx_bylaws_audit_checked', JSON.stringify(next));
  };

  const bylawScore = Math.round((bylawChecks.filter(Boolean).length / 10) * 100);

  const [copiedScript, setCopiedScript] = useState<number | null>(null);

  const handleCopyScript = (text: string, id: number) => {
    navigator.clipboard.writeText(text);
    setCopiedScript(id);
    setTimeout(() => setCopiedScript(null), 2000);
  };

  const BYLAW_ITEMS = [
    {
      id: 1,
      clause: "Electronic Voting Default Authorization",
      rule: "Votes via email require unanimous written consent unless the bylaws explicitly authorize structured electronic transmission under strict board definitions.",
      code: "CA Corp Code § 20 & § 5079"
    },
    {
      id: 2,
      clause: "Executive Committee Delegation Limits",
      rule: "Executive committees are strictly prohibited from filling vacancies, amending bylaws, or approving transactions involving conflicts of interest.",
      code: "CA Corp Code § 5212"
    },
    {
      id: 3,
      clause: "Strict Statutory Ban on Proxy Voting",
      rule: "Directors cannot vote by proxy in public benefit corporations. Any bylaw clause or action permitting a proxy is legally void.",
      code: "CA Corp Code § 5211(c)"
    },
    {
      id: 4,
      clause: "Director Term Limits",
      rule: "Terms cannot exceed 3 years if there are voting members. If no voting members, terms cannot exceed 6 years.",
      code: "CA Corp Code § 5220"
    },
    {
      id: 5,
      clause: "Officer Role Separation (President vs. CFO & Secretary)",
      rule: "The same person cannot serve concurrently as President/CEO and Secretary, or President/CEO and Treasurer/CFO.",
      code: "CA Corp Code § 5213(a)"
    },
    {
      id: 6,
      clause: "Interested Director 49% Limit",
      rule: "No more than 49% of the directors serving may be 'interested persons' (defined as employees, contractors, or their relatives).",
      code: "CA Corp Code § 5227"
    },
    {
      id: 7,
      clause: "Special Meeting Statutory Notice Requirements",
      rule: "Special meetings require at least 48 hours notice if delivered personally or electronically, or 4 days if by first-class mail.",
      code: "CA Corp Code § 5211(a)(2)"
    },
    {
      id: 8,
      clause: "Quorum Floor Protection",
      rule: "Quorum cannot be set lower than one-fifth of the directors, or two directors, whichever is larger.",
      code: "CA Corp Code § 5211(a)(7)"
    },
    {
      id: 9,
      clause: "Explicit Indemnification Clauses",
      rule: "The bylaws must explicitly authorize the corporation to purchase D&O insurance and indemnify directors for legal expenses incurred in non-fiduciary cases.",
      code: "CA Corp Code § 5238"
    },
    {
      id: 10,
      clause: "Compensation Review Committee Mandate",
      rule: "If paying officers, the board or an independent committee must explicitly review and authorize CEO/CFO compensation for reasonableness.",
      code: "CA Corp Code § 12586(g)"
    }
  ];

  // State for D&O estimator (Enhancement 2)
  const [budget, setBudget] = useState(() => {
    try {
      const saved = localStorage.getItem('cdx_do_liability_estimator');
      return saved ? JSON.parse(saved).budget : 500000;
    } catch {
      return 500000;
    }
  });

  const [headcount, setHeadcount] = useState(() => {
    try {
      const saved = localStorage.getItem('cdx_do_liability_estimator');
      return saved ? JSON.parse(saved).headcount : 8;
    } catch {
      return 8;
    }
  });

  const saveEstimator = (b: number, h: number) => {
    localStorage.setItem('cdx_do_liability_estimator', JSON.stringify({ budget: b, headcount: h }));
  };

  const handleBudgetChange = (val: number) => {
    setBudget(val);
    saveEstimator(val, headcount);
  };

  const handleHeadcountChange = (val: number) => {
    setHeadcount(val);
    saveEstimator(budget, val);
  };
  
  // State to track checked compliance actions across the 5 rules
  // key format: "ruleId-actionIndex"
  const [checkedActions, setCheckedActions] = useState<Record<string, boolean>>(() => {
    try {
      const stored = localStorage.getItem('cdx_cal_rules_checked_ids');
      return stored ? JSON.parse(stored) : {};
    } catch (e) {
      console.error(e);
      return {};
    }
  });

  const handleToggleAction = (ruleId: string, actionIndex: number) => {
    const key = `${ruleId}-${actionIndex}`;
    setCheckedActions(prev => {
      const next = {
        ...prev,
        [key]: !prev[key]
      };
      localStorage.setItem('cdx_cal_rules_checked_ids', JSON.stringify(next));
      return next;
    });
  };

  const isRuleFullyCompliant = (rule: CaliforniaRule) => {
    return rule.complianceActionList.every((_, idx) => checkedActions[`${rule.id}-${idx}`] === true);
  };

  const countCompletedActions = (rule: CaliforniaRule) => {
    return rule.complianceActionList.filter((_, idx) => checkedActions[`${rule.id}-${idx}`] === true).length;
  };

  const compliantRulesCount = californiaRules.filter(isRuleFullyCompliant).length;

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

          {/* Top-Level Compliance Dashboard (Enhancement 4) */}
          <div className="bg-gradient-to-br from-slate-brand to-ink text-white rounded-xl shadow-md p-6 text-left border border-brass/20 space-y-4">
            <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-4">
              <div className="space-y-1">
                <span className="text-[10px] font-extrabold text-brass uppercase tracking-widest bg-brass/10 px-2 py-0.5 rounded border border-brass/20 inline-block">
                  Fiduciary Security Dashboard
                </span>
                <h3 className="font-serif text-xl sm:text-2xl font-bold tracking-wide">
                  California Compliance Stance
                </h3>
                <p className="text-xs text-paper/70 font-sans max-w-lg leading-relaxed">
                  The California Attorney General requires rigorous corporate governance. Complete all checklist items on each state mandate to secure a fully compliant legal posture.
                </p>
              </div>

              {/* Progress Circle or Count */}
              <div className="flex items-center gap-3 shrink-0">
                <div className="relative flex items-center justify-center">
                  <svg className="w-20 h-28 transform -rotate-95">
                    <circle cx="40" cy="56" r="32" stroke="currentColor" strokeWidth="6" fill="transparent" className="text-white/10" />
                    <circle 
                      cx="40" 
                      cy="56" 
                      r="32" 
                      stroke="#C5A880" 
                      strokeWidth="6" 
                      fill="transparent" 
                      strokeDasharray={2 * Math.PI * 32}
                      strokeDashoffset={2 * Math.PI * 32 * (1 - compliantRulesCount / californiaRules.length)}
                      className="transition-premium"
                    />
                  </svg>
                  <div className="absolute flex flex-col items-center">
                    <span className="font-sans font-black text-xl text-white">{compliantRulesCount}</span>
                    <span className="text-[8px] uppercase tracking-wider text-brass font-bold">of {californiaRules.length} rules</span>
                  </div>
                </div>
                <div className="text-left font-sans">
                  <p className="text-[10px] uppercase tracking-wider text-brass font-bold">Stance Level</p>
                  <p className="font-serif font-bold text-sm text-paper">
                    {compliantRulesCount === californiaRules.length 
                      ? "Fully Secured" 
                      : compliantRulesCount >= 3 
                        ? "Active Guard" 
                        : compliantRulesCount >= 1 
                          ? "Fiduciary At-Risk" 
                          : "Critical Exposure"
                    }
                  </p>
                </div>
              </div>
            </div>

            {/* Overall status comment */}
            <div className="pt-4 border-t border-white/10 flex flex-col sm:flex-row justify-between sm:items-center gap-3">
              <p className="text-xs text-paper/60 font-sans leading-relaxed">
                {compliantRulesCount === californiaRules.length
                  ? "✓ Excellent. Your board satisfies all 5 major California regulatory thresholds. Keep all records updated."
                  : "⚠ Fiduciary vulnerabilities detected. Check the red boxes below and complete outstanding action items."
                }
              </p>
              {compliantRulesCount < californiaRules.length && (
                <a
                  href="https://NPOlawyers.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs font-bold uppercase tracking-wider text-brass hover:text-white transition-premium shrink-0 inline-flex items-center gap-1"
                >
                  <span>Request Governance Counsel</span>
                  <ChevronRight className="w-3.5 h-3.5 text-brass" />
                </a>
              )}
            </div>
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
                          {parseTextWithStatutesAndGlossary(rule.threshold)}
                        </p>
                      </div>
                      <div className="space-y-2">
                        <h4 className="font-sans font-extrabold text-xs uppercase tracking-widest text-burgundy">Regulatory Consequence of Failure:</h4>
                        <p className="font-sans text-xs sm:text-sm text-ink/80 leading-relaxed bg-burgundy/5 p-3 rounded border border-burgundy/15">
                          {parseTextWithStatutesAndGlossary(rule.consequenceOfFailure)}
                        </p>
                      </div>
                    </div>

                    {/* Detailed Legal Explanation */}
                    <div className="space-y-2">
                      <h4 className="font-sans font-extrabold text-xs uppercase tracking-widest text-ink/50">Detailed Legal Commentary:</h4>
                      <p className="font-sans text-xs sm:text-sm text-ink/85 leading-relaxed">
                        {parseTextWithStatutesAndGlossary(rule.fullExplanation)}
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
                                {parseTextWithStatutesAndGlossary(action)}
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
                        explanation="Failing to address California's organization statutory limits exposes the entity to immediate revocation by the Attorney General. Seek Counsel from NPO Lawyers to correct regulatory delinquent statuses."
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

          {/* Enhancement 4: State Registry Status Finder Widget */}
          <div className="bg-white rounded-xl shadow-md border border-fog overflow-hidden text-left p-6 space-y-6">
            <div className="space-y-1">
              <span className="text-[10px] font-extrabold text-brass uppercase tracking-widest bg-brass/10 px-2 py-0.5 rounded border border-brass/20 inline-block">
                Regulatory Registry Console
              </span>
              <h3 className="font-serif text-xl sm:text-2xl font-bold text-ink tracking-wide">
                Charitable Trust Registry Verification Console
              </h3>
              <p className="text-xs text-ink/70 font-sans max-w-2xl leading-relaxed">
                Simulate an official Attorney General Registry and Secretary of State lookup. Choose a test outcome tab, input an organization name or Corporate ID, and run the scan to see the exact state-mandated playbooks.
              </p>
            </div>

            {/* Outcome Simulator Tabs */}
            <div className="flex border-b border-fog text-xs font-bold uppercase tracking-wider overflow-x-auto">
              <button
                type="button"
                onClick={() => {
                  setActiveTab('active');
                  if (scanResult) setScanResult('active');
                }}
                className={`py-2 px-4 border-b-2 transition-premium -mb-[2px] whitespace-nowrap ${
                  activeTab === 'active'
                    ? 'border-teal-brand text-teal-brand bg-teal-brand/5'
                    : 'border-transparent text-ink/40 hover:text-ink/80'
                }`}
              >
                Simulate Active Stance
              </button>
              <button
                type="button"
                onClick={() => {
                  setActiveTab('delinquent');
                  if (scanResult) setScanResult('delinquent');
                }}
                className={`py-2 px-4 border-b-2 transition-premium -mb-[2px] whitespace-nowrap ${
                  activeTab === 'delinquent'
                    ? 'border-brass text-brass bg-brass/5'
                    : 'border-transparent text-ink/40 hover:text-ink/80'
                }`}
              >
                Simulate Delinquent Stance (Missing RRF-1)
              </button>
              <button
                type="button"
                onClick={() => {
                  setActiveTab('suspended');
                  if (scanResult) setScanResult('suspended');
                }}
                className={`py-2 px-4 border-b-2 transition-premium -mb-[2px] whitespace-nowrap ${
                  activeTab === 'suspended'
                    ? 'border-burgundy text-burgundy bg-burgundy/5'
                    : 'border-transparent text-ink/40 hover:text-ink/80'
                }`}
              >
                Simulate Suspended Stance (FTB/SOS)
              </button>
            </div>

            <form onSubmit={runRegistryScan} className="space-y-4">
              <div className="flex flex-col sm:flex-row gap-2">
                <div className="relative flex-grow">
                  <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none text-ink/40">
                    <Search className="w-4 h-4" />
                  </div>
                  <input
                    type="text"
                    placeholder="Enter Organization Name or 7-Digit California Entity Number..."
                    value={registryQuery}
                    onChange={(e) => setRegistryQuery(e.target.value)}
                    disabled={isScanning}
                    className="w-full pl-9 pr-4 py-2.5 text-xs border border-fog rounded-lg bg-paper/10 text-ink focus:outline-none focus:border-brass/50 disabled:opacity-50"
                  />
                </div>
                <button
                  type="submit"
                  disabled={isScanning || !registryQuery.trim()}
                  className="px-4 py-2.5 bg-slate-brand hover:bg-ink text-white text-xs font-bold uppercase tracking-wider rounded-lg transition-premium disabled:opacity-50 flex items-center justify-center gap-1.5 whitespace-nowrap cursor-pointer"
                >
                  {isScanning ? (
                    <>
                      <Loader2 className="w-3.5 h-3.5 animate-spin text-brass" />
                      <span>Scanning...</span>
                    </>
                  ) : (
                    <>
                      <Terminal className="w-3.5 h-3.5 text-brass" />
                      <span>Run Registry Scan</span>
                    </>
                  )}
                </button>
              </div>
            </form>

            {/* Console Log Screen */}
            {(isScanning || scanLogs.length > 0) && (
              <div className="bg-[#0C101B] rounded-lg p-4 font-mono text-[10px] sm:text-xs text-emerald-400 border border-teal-500/20 shadow-inner h-44 overflow-y-auto space-y-1.5 text-left select-none">
                {scanLogs.map((log, idx) => (
                  <div key={idx} className="leading-relaxed whitespace-pre-wrap animate-fadeIn">
                    {log}
                  </div>
                ))}
                {isScanning && (
                  <div className="flex items-center gap-1.5 text-brass animate-pulse">
                    <span>&gt; Querying Registry Server...</span>
                    <span className="w-1.5 h-3.5 bg-brass inline-block animate-blink" />
                  </div>
                )}
              </div>
            )}

            {/* Diagnostic Playbook Output */}
            {scanResult && !isScanning && (
              <div className="animate-fadeIn border border-fog rounded-lg p-5 bg-paper/10 space-y-4">
                {scanResult === 'active' && (
                  <div className="space-y-3">
                    <div className="flex items-start gap-3">
                      <div className="p-2 bg-teal-500/10 text-teal-600 rounded-full shrink-0 mt-0.5">
                        <ShieldCheck className="w-6 h-6" />
                      </div>
                      <div className="space-y-1 text-left">
                        <span className="text-[10px] font-extrabold text-teal-600 uppercase tracking-wider block">Registry Stance: CURRENT & SECURE</span>
                        <h4 className="font-serif font-black text-lg text-ink">Compliance Verification Succeeded</h4>
                        <p className="text-xs text-ink/75 leading-relaxed">
                          The mock query confirms that <strong>"{registryQuery}"</strong> is fully <strong>ACTIVE</strong> with the California Registry of Charitable Trusts (CT) and <strong>CURRENT</strong> with the Secretary of State (SOS). No late penalties or administrative blocks exist.
                        </p>
                      </div>
                    </div>
                    <div className="bg-teal-500/5 border border-teal-500/20 rounded p-3 text-xs leading-relaxed text-teal-800 space-y-1.5 text-left">
                      <p className="font-bold">✓ Standard Maintenance Protocol:</p>
                      <ul className="list-disc pl-4 space-y-1 text-teal-900/90">
                        <li>File Form RRF-1 within 4 months and 15 days after the close of your fiscal year.</li>
                        <li>Ensure Form CT-TR-1 is compiled if annual gross revenue is under $50,000 (if over, full Form 990 serves).</li>
                        <li>File the Statement of Information (SI-100) biennially with the SOS.</li>
                      </ul>
                    </div>
                  </div>
                )}

                {scanResult === 'delinquent' && (
                  <div className="space-y-3">
                    <div className="flex items-start gap-3">
                      <div className="p-2 bg-brass/15 text-brass rounded-full shrink-0 mt-0.5">
                        <AlertTriangle className="w-6 h-6" />
                      </div>
                      <div className="space-y-1 text-left">
                        <span className="text-[10px] font-extrabold text-brass uppercase tracking-wider block">Registry Stance: DELINQUENT</span>
                        <h4 className="font-serif font-black text-lg text-ink">Administrative Non-Compliance Detected</h4>
                        <p className="text-xs text-ink/75 leading-relaxed font-semibold">
                          The mock query resolves <strong>"{registryQuery}"</strong> with status <strong>DELINQUENT</strong>. The Attorney General CT Registry shows missing annual Form RRF-1 or failure to report financial records. Late fees are accumulating.
                        </p>
                      </div>
                    </div>
                    <div className="bg-brass/10 border border-brass/30 rounded p-4 text-xs leading-relaxed text-amber-900 space-y-2 text-left">
                      <p className="font-bold flex items-center gap-1 text-burgundy">
                        <span>⚠️ Delinquency Fiduciary Fallout:</span>
                      </p>
                      <ul className="list-disc pl-4 space-y-1.5 font-medium text-ink/90">
                        <li><strong>Loss of Exemption:</strong> The Franchise Tax Board (FTB) automatically revokes tax exemption if delinquency is unresolved.</li>
                        <li><strong>Solicitation Ban:</strong> Directors are personally prohibited from soliciting charitable donations or spending restricted assets during delinquency.</li>
                        <li><strong>Late Fees:</strong> Accumulated state penalties cannot be paid from charitable funds; directors can be held personally liable for them.</li>
                      </ul>
                      <div className="pt-2 border-t border-brass/30 flex flex-wrap gap-2">
                        <a
                          href="https://oag.ca.gov/charities/forms"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="px-3 py-1.5 bg-brass/20 text-ink text-[10px] font-bold uppercase tracking-wider rounded border border-brass/30 hover:bg-brass/30 transition-premium"
                        >
                          Download CA Form RRF-1
                        </a>
                        <a
                          href="https://NPOlawyers.com"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="px-3 py-1.5 bg-burgundy text-white text-[10px] font-bold uppercase tracking-wider rounded hover:bg-ink transition-premium text-center"
                        >
                          Request Delinquency Cure Counsel
                        </a>
                      </div>
                    </div>
                  </div>
                )}

                {scanResult === 'suspended' && (
                  <div className="space-y-3">
                    <div className="flex items-start gap-3">
                      <div className="p-2 bg-burgundy/10 text-burgundy rounded-full shrink-0 mt-0.5">
                        <AlertTriangle className="w-6 h-6 animate-pulse" />
                      </div>
                      <div className="space-y-1 text-left">
                        <span className="text-[10px] font-extrabold text-burgundy uppercase tracking-wider block">Registry Stance: SUSPENDED / REVOKED</span>
                        <h4 className="font-serif font-black text-lg text-burgundy">Critical Statutory Breach</h4>
                        <p className="text-xs text-ink/75 leading-relaxed font-semibold">
                          The mock query resolves <strong>"{registryQuery}"</strong> as <strong>SUSPENDED</strong>. The Secretary of State and Franchise Tax Board have revoked corporate privileges.
                        </p>
                      </div>
                    </div>
                    <div className="bg-burgundy/5 border border-burgundy/25 rounded p-4 text-xs leading-relaxed text-burgundy space-y-2.5 text-left">
                      <p className="font-bold text-burgundy flex items-center gap-1.5">
                        <span>🚨 IMMEDIATE FIDUCIARY CRISIS:</span>
                      </p>
                      <p className="text-ink/90 font-medium">
                        A suspended corporation <strong>cannot legally contract</strong>, prosecute or defend any lawsuit, or protect its corporate name. Directors signing agreements or operating programs during suspension face <strong>personal joint-and-several liability</strong>.
                      </p>
                      <div className="bg-white/60 p-2.5 rounded border border-burgundy/10 space-y-1 text-ink/80">
                        <p className="font-bold text-[10px] uppercase tracking-wider">Required Revivor Protocol:</p>
                        <ol className="list-decimal pl-4 space-y-1 text-[11px] leading-relaxed">
                          <li>Submit all back-filings and RRF-1 forms to the Attorney General.</li>
                          <li>Secure a "Franchise Tax Board Revivor Letter."</li>
                          <li>File a petition for revivor with the Secretary of State.</li>
                        </ol>
                      </div>
                      <div className="pt-2 border-t border-burgundy/20 flex justify-end">
                        <a
                          href="https://NPOlawyers.com"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1.5 px-4 py-2 bg-burgundy text-white text-xs font-bold uppercase tracking-wider rounded hover:bg-ink transition-premium shadow"
                        >
                          <span>Request Priority Corporate Revivor Petition</span>
                          <ChevronRight className="w-3.5 h-3.5 text-brass" />
                        </a>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Enhancement 5: Bylaws Clause-by-Clause Health Analyzer */}
          <div className="bg-white rounded-xl shadow-md border border-fog overflow-hidden text-left p-6 space-y-6">
            <div className="space-y-1">
              <span className="text-[10px] font-extrabold text-brass uppercase tracking-widest bg-brass/10 px-2 py-0.5 rounded border border-brass/20 inline-block">
                Bylaws Integrity Laboratory
              </span>
              <h3 className="font-serif text-xl sm:text-2xl font-bold text-ink tracking-wide">
                Bylaws Clause-by-Clause Health Analyzer
              </h3>
              <p className="text-xs text-ink/77 font-sans max-w-2xl leading-relaxed">
                Check off each statutory requirement that is currently defined and satisfied in your organization's formal bylaws to calculate your live <strong>Bylaws Integrity Score</strong>.
              </p>
            </div>

            {/* Scoreboard Bar */}
            <div className="bg-paper/30 p-5 rounded-lg border border-fog/80 flex flex-col md:flex-row justify-between md:items-center gap-4">
              <div className="space-y-1.5 flex-grow">
                <span className="text-[10px] uppercase tracking-wider font-extrabold text-ink/40">Integrity Score</span>
                <div className="flex items-center gap-3">
                  <span className={`font-serif font-black text-3xl ${
                    bylawScore < 80 ? 'text-burgundy' : (bylawScore < 100 ? 'text-brass' : 'text-teal-brand')
                  }`}>
                    {bylawScore}%
                  </span>
                  <div className="w-full bg-fog h-3 rounded-full overflow-hidden">
                    <div className={`h-full transition-premium ${
                      bylawScore < 80 ? 'bg-burgundy' : (bylawScore < 100 ? 'bg-brass' : 'bg-teal-brand')
                    }`} style={{ width: `${bylawScore}%` }} />
                  </div>
                </div>
              </div>
              <div className="shrink-0 text-left md:text-right font-sans">
                <span className="text-[10px] font-bold text-ink/40 uppercase tracking-widest block">Audit Status</span>
                <span className={`font-serif font-black text-sm block mt-0.5 ${
                  bylawScore < 80 ? 'text-burgundy' : (bylawScore < 100 ? 'text-brass' : 'text-teal-brand')
                }`}>
                  {bylawScore < 80 
                    ? "Severe Exposure" 
                    : bylawScore < 100 
                      ? "Statutory Warnings" 
                      : "Statutory Masterclass"
                  }
                </span>
              </div>
            </div>

            {/* Dynamic Status Callout Alert Box */}
            <div className="animate-fadeIn">
              {bylawScore < 80 ? (
                <div className="p-4 bg-burgundy/5 border border-burgundy/20 rounded-lg text-xs leading-relaxed text-burgundy space-y-1">
                  <p className="font-bold flex items-center gap-1.5">
                    <ShieldAlert className="w-4 h-4 animate-bounce" />
                    <span>🚨 CRITICAL FIDUCIARY EXPOSURE DETECTED</span>
                  </p>
                  <p className="font-medium text-ink/90 font-semibold">
                    A bylaws score under 80% indicates major structural gaps under California charity law. Outdated clauses or missing bans (e.g. allowing proxies or omitting electronic definitions) can <strong>void board votes</strong> and trigger <strong>personal joint-and-several liability</strong> under California Corporations Code § 5239.
                  </p>
                </div>
              ) : bylawScore < 100 ? (
                <div className="p-4 bg-brass/10 border border-brass/30 rounded-lg text-xs leading-relaxed text-amber-900 space-y-1">
                  <p className="font-bold flex items-center gap-1.5">
                    <AlertTriangle className="w-4 h-4 text-brass" />
                    <span>⚠️ MODERATE STATUTORY RISK</span>
                  </p>
                  <p className="font-medium text-ink/90 font-semibold">
                    Your bylaws satisfy major statutory parameters, but the remaining unchecked clauses represent active compliance gaps. During leadership friction or state audits, these omissions can challenge board authorizations.
                  </p>
                </div>
              ) : (
                <div className="p-4 bg-teal-brand/10 border border-teal-brand/30 rounded-lg text-xs leading-relaxed text-teal-850 space-y-1">
                  <p className="font-bold flex items-center gap-1.5">
                    <ShieldCheck className="w-4 h-4 text-teal-brand animate-pulse" />
                    <span>💎 STATUTORY MASTERCLASS COMPLIANCE</span>
                  </p>
                  <p className="font-medium text-teal-950 font-semibold">
                    Excellent. Your bylaws explicitly incorporate all 10 critical California Corporations Code governance constraints. Keep a physical signed copy in your minute book and run an attorney review every 3 years.
                  </p>
                </div>
              )}
            </div>

            {/* 10-Point Checklist */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {BYLAW_ITEMS.map((item, idx) => {
                const isChecked = bylawChecks[idx];
                return (
                  <div
                    key={item.id}
                    onClick={() => handleToggleBylawCheck(idx)}
                    className={`cursor-pointer p-4 rounded-lg border transition-premium flex items-start gap-3 select-none text-left h-full ${
                      isChecked
                        ? 'border-teal-brand/30 bg-teal-brand/5 shadow-inner'
                        : 'border-fog bg-white hover:border-brass/30'
                    }`}
                  >
                    <div className={`mt-0.5 shrink-0 transition-premium ${isChecked ? 'text-teal-brand' : 'text-ink/20'}`}>
                      {isChecked ? <CheckSquare className="w-5 h-5" /> : <Square className="w-5 h-5" />}
                    </div>
                    <div className="space-y-1 flex-grow">
                      <div className="flex justify-between items-start flex-wrap gap-x-2">
                        <span className={`font-serif text-sm font-bold ${isChecked ? 'text-teal-brand' : 'text-ink'}`}>
                          {item.clause}
                        </span>
                        <span className="text-[8px] font-extrabold text-brass bg-brass/10 px-1.5 py-0.5 rounded whitespace-nowrap mt-0.5">
                          {item.code}
                        </span>
                      </div>
                      <p className={`font-sans text-xs leading-relaxed ${isChecked ? 'text-teal-900/80' : 'text-ink/65'}`}>
                        {item.rule}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Deliberation Verbal Boardroom Scripts */}
            <div className="bg-paper/30 p-5 rounded-lg border border-fog space-y-4">
              <div className="space-y-1">
                <h4 className="font-serif font-bold text-sm text-ink flex items-center gap-1.5">
                  <FileText className="w-4 h-4 text-brass" />
                  <span>Verbal Boardroom Action Scripts</span>
                </h4>
                <p className="text-[10px] text-ink/40 uppercase tracking-widest font-semibold">
                  Copy and read these scripts in your next board meeting to legally authorize bylaws corrections:
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="p-3.5 bg-white rounded border border-fog/80 flex flex-col justify-between h-full space-y-3">
                  <p className="font-sans text-xs italic text-ink/80 leading-relaxed text-left">
                    "Fellow Board Members, our bylaws audit shows we have potential statutory compliance gaps under the California Corporations Code. To protect the board from personal liability, I move that we authorize a special committee or counsel to review our current bylaws and draft compliant amendments before our next annual meeting."
                  </p>
                  <button
                    type="button"
                    onClick={() => handleCopyScript(
                      "Fellow Board Members, our bylaws audit shows we have potential statutory compliance gaps under the California Corporations Code. To protect the board from personal liability, I move that we authorize a special committee or counsel to review our current bylaws and draft compliant amendments before our next annual meeting.",
                      1
                    )}
                    className="w-full py-1.5 bg-brass/10 hover:bg-brass/20 text-brass text-[10px] font-bold uppercase tracking-wider rounded border border-brass/20 transition-premium flex items-center justify-center gap-1.5 cursor-pointer"
                  >
                    {copiedScript === 1 ? (
                      <>
                        <Check className="w-3.5 h-3.5 text-teal-brand" />
                        <span className="text-teal-brand">Copied to Clipboard!</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3.5 h-3.5 text-brass" />
                        <span>Copy Resolution Script</span>
                      </>
                    )}
                  </button>
                </div>

                <div className="p-3.5 bg-white rounded border border-fog/80 flex flex-col justify-between h-full space-y-3">
                  <p className="font-sans text-xs italic text-ink/80 leading-relaxed text-left">
                    "Under California Corporations Code Section 5213, our current officer split is legally non-compliant. I propose we amend our leadership roles to separate the President/CEO from the Treasurer and Secretary positions immediately, and update our corporate records with the Secretary of State."
                  </p>
                  <button
                    type="button"
                    onClick={() => handleCopyScript(
                      "Under California Corporations Code Section 5213, our current officer split is legally non-compliant. I propose we amend our leadership roles to separate the President/CEO from the Treasurer and Secretary positions immediately, and update our corporate records with the Secretary of State.",
                      2
                    )}
                    className="w-full py-1.5 bg-brass/10 hover:bg-brass/20 text-brass text-[10px] font-bold uppercase tracking-wider rounded border border-brass/20 transition-premium flex items-center justify-center gap-1.5 cursor-pointer"
                  >
                    {copiedScript === 2 ? (
                      <>
                        <Check className="w-3.5 h-3.5 text-teal-brand" />
                        <span className="text-teal-brand">Copied to Clipboard!</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3.5 h-3.5 text-brass" />
                        <span>Copy Officer Separation Script</span>
                      </>
                    )}
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Interactive D&O Liability Slider & Coverage Estimator (Enhancement 2) */}
          <div className="bg-white rounded-xl shadow-md border-2 border-brass/50 overflow-hidden text-left p-6 space-y-6">
            <div className="space-y-1">
              <span className="text-[10px] font-extrabold text-brass uppercase tracking-widest bg-brass/10 px-2 py-0.5 rounded border border-brass/20 inline-block">
                Interactive Diagnostic Lab
              </span>
              <h3 className="font-serif text-xl sm:text-2xl font-bold text-ink tracking-wide">
                D&O Liability & Fiduciary Coverage Estimator
              </h3>
              <p className="text-xs text-ink/70 font-sans max-w-2xl leading-relaxed">
                Adjust the sliders representing your organization's annual operating budget and employee headcount to calculate your statutory risk exposure and suggested insurance parameters in California.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
              {/* Sliders Area */}
              <div className="space-y-5 bg-paper/20 p-4 rounded-lg border border-fog">
                {/* Operating Budget Slider */}
                <div className="space-y-2">
                  <div className="flex justify-between items-center text-xs">
                    <label htmlFor="budget-slider" className="font-bold text-ink/80 uppercase tracking-wider">Annual Operating Budget</label>
                    <span className="font-mono font-bold text-brass text-sm bg-white border border-brass/20 px-2 py-0.5 rounded shadow-sm">
                      {new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(budget)}
                    </span>
                  </div>
                  <input
                    id="budget-slider"
                    type="range"
                    min="50000"
                    max="5000000"
                    step="50000"
                    value={budget}
                    onChange={(e) => handleBudgetChange(parseInt(e.target.value))}
                    className="w-full h-2 bg-fog rounded-lg appearance-none cursor-pointer accent-brass focus:outline-none"
                  />
                  <div className="flex justify-between text-[9px] text-ink/40 font-semibold">
                    <span>$50,000</span>
                    <span>$1,000,000</span>
                    <span>$2,500,000</span>
                    <span>$5,000,000+</span>
                  </div>
                </div>

                {/* Staff Headcount Slider */}
                <div className="space-y-2">
                  <div className="flex justify-between items-center text-xs">
                    <label htmlFor="headcount-slider" className="font-bold text-ink/80 uppercase tracking-wider">Active Staff Headcount</label>
                    <span className="font-mono font-bold text-brass text-sm bg-white border border-brass/20 px-2.5 py-0.5 rounded shadow-sm">
                      {headcount} {headcount === 1 ? 'Employee' : 'Employees'}
                    </span>
                  </div>
                  <input
                    id="headcount-slider"
                    type="range"
                    min="0"
                    max="100"
                    step="1"
                    value={headcount}
                    onChange={(e) => handleHeadcountChange(parseInt(e.target.value))}
                    className="w-full h-2 bg-fog rounded-lg appearance-none cursor-pointer accent-brass focus:outline-none"
                  />
                  <div className="flex justify-between text-[9px] text-ink/40 font-semibold">
                    <span>0 (All Volunteer)</span>
                    <span>10 Staff</span>
                    <span>50 Staff</span>
                    <span>100+ Staff</span>
                  </div>
                </div>
              </div>

              {/* Dynamic Analysis Area */}
              <div className="space-y-4 flex flex-col justify-between">
                {/* Stance Indicator Cards */}
                <div className="grid grid-cols-2 gap-3">
                  <div className="bg-paper p-3 rounded-lg border border-fog text-left shadow-sm">
                    <span className="text-[9px] font-bold text-ink/40 uppercase tracking-wider block">Risk Exposure</span>
                    <span className={`font-serif font-black text-sm block mt-1 ${
                      budget >= 2000000 || headcount >= 30 
                        ? 'text-burgundy' 
                        : (budget >= 1000000 || headcount >= 15 ? 'text-amber-600' : 'text-teal-700')
                    }`}>
                      {(() => {
                        if (budget < 250000 && headcount < 5) return "Low Risk";
                        if (budget < 1000000 && headcount < 15) return "Moderate Risk";
                        if (budget >= 3000000 || headcount >= 45) return "Severe / Fiduciary Red";
                        return "High Exposure";
                      })()}
                    </span>
                  </div>

                  <div className="bg-paper p-3 rounded-lg border border-fog text-left shadow-sm">
                    <span className="text-[9px] font-bold text-ink/40 uppercase tracking-wider block">Suggested D&O Limit</span>
                    <span className="font-serif font-black text-sm text-brass block mt-1">
                      {(() => {
                        if (budget < 250000) return "$1,000,000";
                        if (budget < 1000000) return "$1,000,000 – $2,000,000";
                        if (budget < 3000000) return "$2,000,000 – $3,000,000";
                        return "$3,000,000 – $5,000,000";
                      })()}
                    </span>
                  </div>
                </div>

                {/* Multi-Trigger Statutory Alerts */}
                <div className="space-y-2 flex-grow flex flex-col justify-center">
                  {/* CA Corp Audit Trigger */}
                  <div className={`p-3 rounded border text-xs leading-relaxed transition-premium flex items-start gap-2 ${
                    budget >= 2000000
                      ? 'bg-burgundy/5 border-burgundy/30 text-burgundy font-semibold'
                      : 'bg-teal-500/5 border-teal-500/20 text-teal-800'
                  }`}>
                    <span className="text-sm shrink-0">{budget >= 2000000 ? '🔴' : '✓'}</span>
                    <p>
                      {budget >= 2000000 ? (
                        <span><strong>MANDATORY CPA AUDIT (CA Corp Code § 12586):</strong> Your budget meets or exceeds $2M. You are legally required to form an independent audit committee and retain a licensed CPA for an annual financial audit.</span>
                      ) : (
                        <span><strong>CPA Audit Optional (Statutory threshold):</strong> Budgets under $2M do not trigger mandatory CPA audits under CA law. Volunteer-level oversight is legally sufficient.</span>
                      )}
                    </p>
                  </div>

                  {/* EPLI Trigger */}
                  <div className={`p-3 rounded border text-xs leading-relaxed transition-premium flex items-start gap-2 ${
                    headcount >= 5
                      ? 'bg-amber-500/5 border-amber-500/20 text-amber-900 font-semibold'
                      : 'bg-teal-500/5 border-teal-500/20 text-teal-800'
                  }`}>
                    <span className="text-sm shrink-0">{headcount >= 5 ? '⚠' : '✓'}</span>
                    <p>
                      {headcount >= 5 ? (
                        <span><strong>HIGHLY RECOMMENDED EPLI:</strong> With {headcount} employees, employment disputes (harassment, wrongful termination) are your highest risk. You must secure a dedicated EPLI policy/rider immediately.</span>
                      ) : (
                        <span><strong>EPLI Safe Zone:</strong> With low staff headcount, standard D&O with small employment endorsements is generally sufficient, though HR policies should be monitored.</span>
                      )}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* D&O Coverage Spotlight Matrix (Enhancement 5) */}
          <div className="bg-white rounded-xl shadow-md border border-fog overflow-hidden text-left">
            <div className="p-6 bg-burgundy text-paper border-b border-brass/20 space-y-1">
              <div className="inline-flex items-center gap-1.5 px-2 py-0.5 bg-white/10 border border-white/20 text-brass rounded text-[10px] font-bold uppercase tracking-wider">
                <ShieldCheck className="w-3 h-3 text-brass" />
                <span>Executive Asset Cushion</span>
              </div>
              <h3 className="font-serif text-lg sm:text-xl font-bold text-white tracking-wide">
                Board Liability Protection Spotlight: D&O vs. EPLI Matrix
              </h3>
              <p className="text-xs text-paper/70 font-sans max-w-2xl leading-relaxed">
                Many California directors mistakenly believe standard General Liability policies shield their personal savings. In reality, board-level lawsuits (which are 90% employment-related) require targeted riders.
              </p>
            </div>

            <div className="p-6 overflow-x-auto">
              <table className="w-full text-xs text-ink/80 font-sans border-collapse">
                <thead>
                  <tr className="border-b border-fog/80 text-[10px] uppercase tracking-wider text-ink/50 font-bold bg-paper/10">
                    <th className="py-3 px-4 text-left font-sans">Coverage Type</th>
                    <th className="py-3 px-4 text-left font-sans">Primary Risk Guarded</th>
                    <th className="py-3 px-4 text-center font-sans">Protects Personal Assets?</th>
                    <th className="py-3 px-4 text-left font-sans">Typical Limits</th>
                    <th className="py-3 px-4 text-left font-sans">Critical CA Exclusions</th>
                    <th className="py-3 px-4 text-left font-sans">Prudent Board Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-fog/60">
                  <tr>
                    <td className="py-4 px-4 font-bold text-slate-brand font-serif text-sm">General Liability (GL)</td>
                    <td className="py-4 px-4">Physical slip-and-falls, property damage, bodily injury during public programs.</td>
                    <td className="py-4 px-4 text-center font-bold text-burgundy">NO</td>
                    <td className="py-4 px-4">$1M / $2M occurrence limit.</td>
                    <td className="py-4 px-4">Excludes fiduciary breaches, conflicts of interest, wrongful termination.</td>
                    <td className="py-4 px-4 italic">Standard policy; required for facility lease and public events.</td>
                  </tr>
                  <tr className="bg-paper/10">
                    <td className="py-4 px-4 font-bold text-brass font-serif text-sm">Directors & Officers (D&O)</td>
                    <td className="py-4 px-4">Breaches of fiduciary duties (Care, Loyalty, Obedience), IRS audits, mismanagement, regulatory delinquencies.</td>
                    <td className="py-4 px-4 text-center font-bold text-teal-brand">YES (Absolute)</td>
                    <td className="py-4 px-4 font-mono font-semibold">$1M to $5M depending on asset base.</td>
                    <td className="py-4 px-4">Fraud, criminal acts, intentional illegal transactions.</td>
                    <td className="py-4 px-4 font-semibold text-brass">MANDATORY. Procure immediately upon incorporating. Do not serve without it.</td>
                  </tr>
                  <tr>
                    <td className="py-4 px-4 font-bold text-burgundy font-serif text-sm">EPLI (Employment Practices)</td>
                    <td className="py-4 px-4">Wrongful termination, sexual harassment, discrimination, hostile work environment (90% of organization claims).</td>
                    <td className="py-4 px-4 text-center font-bold text-teal-brand">YES</td>
                    <td className="py-4 px-4 font-mono">Often bundled with D&O or as separate $1M rider.</td>
                    <td className="py-4 px-4">Wage & hour claims (unpaid overtime, missed meal breaks in California).</td>
                    <td className="py-4 px-4 italic font-semibold text-brass">Verify this rider is active; ensure your HR policy manual complies with CA wage-and-hour.</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div className="bg-brass/5 p-4 sm:p-5 border-t border-fog flex flex-col sm:flex-row justify-between items-center gap-4">
              <div className="text-left space-y-1">
                <h5 className="font-serif font-bold text-sm text-burgundy flex items-center gap-1.5">
                  <AlertTriangle className="w-4 h-4" />
                  <span>Wage & Hour Exclusion Risk Alert</span>
                </h5>
                <p className="text-xs text-ink/75 font-sans leading-relaxed max-w-2xl font-semibold">
                  California's wage-and-hour laws are exceptionally strict. Because standard EPLI excludes missed breaks and overtime disputes, board members must conduct regular HR audits. NPO Lawyers provides privileged audits.
                </p>
              </div>
              <a
                href="https://NPOlawyers.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-1.5 px-4.5 py-2.5 bg-burgundy hover:bg-ink text-white text-xs font-bold uppercase tracking-wider rounded shadow transition-premium whitespace-nowrap"
              >
                <span>Request Policy Audit</span>
                <ChevronRight className="w-3.5 h-3.5 text-brass" />
              </a>
            </div>
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
