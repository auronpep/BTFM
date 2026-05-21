import React, { useState } from 'react';
import { useRouter } from '../components/Router';
import { Layout } from '../components/Layout';
import { 
  Landmark, ArrowRight, ShieldCheck, Scale, FileText, CheckCircle2, 
  ChevronRight, Activity, Zap, Calendar, Award, Check, Sparkles
} from 'lucide-react';
import { articles } from '../data/articles';
import { scenarios } from '../data/scenarios';

export const Home: React.FC = () => {
  const { navigate } = useRouter();
  const [heroTab, setHeroTab] = useState<'ledger' | 'schedule'>('ledger');
  const [activeCategory, setActiveCategory] = useState<'conflicts' | 'oversight' | 'audits' | 'california'>('conflicts');
  
  // Storing resolved problems locally
  const [resolvedProblems, setResolvedProblems] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem('cdx_resolved_problems');
      return saved ? JSON.parse(saved) : [];
    } catch (e) {
      return [];
    }
  });

  // Sourced from real scenarios and rules with unique IDs
  const boardroomProblems = {
    conflicts: [
      {
        id: 'founder-salary',
        title: "The Founder Demands the Board Approve Her Salary",
        subtitle: "Executive Compensation Safe Harbor (IRS § 4958)",
        desc: "The founder demands a major salary increase without comparable data. Learn the IRS rebuttable presumption of reasonableness standard.",
        target: "scenario/founder-salary-conflict"
      },
      {
        id: 'spousal-dev',
        title: "Awarding Spousal Web Dev Contracts",
        subtitle: "Self-Dealing & Procurement Violations",
        desc: "The Board awards a $15,000 contract directly to the ED's spouse. Identify California self-dealing warning signs and approvals.",
        target: "tools/budget-worksheet"
      }
    ],
    oversight: [
      {
        id: 'director-micromanage',
        title: "A Director Micromanages Staff Between Meetings",
        subtitle: "Chain of Command Boundaries",
        desc: "A board member bypasses the CEO to direct employees. Establish boundaries of governance vs. management using manual templates.",
        target: "scenario/director-micromanaging-staff"
      },
      {
        id: 'packet-advance',
        title: "Is Your Board Receiving Packets 5 Days in Advance?",
        subtitle: "Duty of Care & Operational Preparation",
        desc: "Packets handed out at meetings leave directors legally unshielded. Learn to audit your prep timelines.",
        target: "tools/board-packet-lab"
      }
    ],
    audits: [
      {
        id: 'vague-financials',
        title: "The Treasurer Presents Vague Financial Reports",
        subtitle: "Active Financial Verification",
        desc: "A single-page cash report is presented to the board. Review standard Balance Sheets and Statements of Activities.",
        target: "scenario/treasurer-vague-financials"
      },
      {
        id: 'missing-receipts',
        title: "The Board Discovers Missing Receipts & Variances",
        subtitle: "Internal Financial Controls",
        desc: "Scan operating ledger overruns, check payroll tax withholdings, and discover critical vulnerabilities.",
        target: "tools/budget-worksheet"
      }
    ],
    california: [
      {
        id: 'independent-audit',
        title: "The California $2M Independent Audit Mandate",
        subtitle: "CA Government Code § 12586",
        desc: "Check if your organization requires a CPA-audited financial statement and a separate, independent Audit Committee.",
        target: "california-board-rules"
      },
      {
        id: 'biennial-audit',
        title: "Bylaws Biennial Audit Schedule",
        subtitle: "California Registry Compliance",
        desc: "Obsolete bylaws put volunteer directors at risk. Verify compliance with California Registry of Charitable Trusts rules.",
        target: "california-board-rules"
      }
    ]
  };

  const handleToggleProblem = (id: string, e: React.MouseEvent) => {
    e.stopPropagation(); // Avoid triggering card navigation
    setResolvedProblems(prev => {
      const next = prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id];
      localStorage.setItem('cdx_resolved_problems', JSON.stringify(next));
      return next;
    });
  };

  const securityScore = Math.round((resolvedProblems.length / 8) * 100);

  return (
    <Layout>
      {/* 2. Hero Section: Premium Courtroom/Editorial Aesthetics */}
      <section className="relative overflow-hidden bg-ink text-paper py-16 sm:py-20 px-4 sm:px-6 lg:px-8 border-b border-brass/30">
        <div className="absolute inset-0 opacity-[0.03] pointer-events-none bg-[radial-gradient(#C29A4A_1px,transparent_1px)] [background-size:16px_16px]" />
        
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-center relative z-10">
          <div className="lg:col-span-7 space-y-6 text-left">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-brass/15 text-brass rounded-full text-xs font-semibold uppercase tracking-wider border border-brass/25">
              <Landmark className="w-3.5 h-3.5" />
              <span>The Boardroom Field Manual</span>
            </div>
            
            <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl text-white font-extrabold tracking-tight leading-tight">
              Fiduciary <span className="text-brass italic">Standards</span> & <br />
              Boardroom Training
            </h1>
            
            <p className="text-paper/80 font-sans text-sm sm:text-base lg:text-lg leading-relaxed max-w-2xl">
              Practical, legally-informed guidelines and interactive laboratories for working board members of $3M+ established California nonprofits. Learn to lead defensively, protect your directors, and fulfill your duties of Care, Loyalty, and Obedience.
            </p>
            
            <div className="pt-4 flex flex-col sm:flex-row gap-4">
              <button
                onClick={() => navigate('tools/self-assessment')}
                className="inline-flex justify-center items-center gap-2 px-6 py-3.5 bg-brass hover:bg-white hover:text-ink text-ink font-bold uppercase tracking-wider text-xs rounded shadow-lg transition-premium cursor-pointer"
              >
                <span>Assess Board Maturity</span>
                <ArrowRight className="w-4 h-4" />
              </button>
              <button
                onClick={() => navigate('next-meeting')}
                className="inline-flex justify-center items-center gap-2 px-6 py-3.5 border border-paper/40 hover:border-brass text-paper hover:text-brass font-bold uppercase tracking-wider text-xs rounded transition-premium"
              >
                <span>Prepare For Next Meeting</span>
              </button>
            </div>
          </div>
          
          {/* Dual-Tabbed Calendar & Ledger Hero Companion */}
          <div className="lg:col-span-5 bg-white/5 rounded-xl border border-brass/20 p-5 sm:p-6 shadow-2xl relative overflow-hidden backdrop-blur-sm">
            <div className="flex items-center justify-between border-b border-paper/10 pb-3 mb-4">
              <div className="flex gap-2">
                <button 
                  onClick={() => setHeroTab('ledger')}
                  className={`px-3 py-1.5 rounded text-[10px] font-bold uppercase tracking-widest transition-premium cursor-pointer focus:outline-none select-none ${
                    heroTab === 'ledger' ? 'bg-brass text-ink font-extrabold shadow' : 'text-paper/60 hover:text-white'
                  }`}
                >
                  Operating Ledger
                </button>
                <button 
                  onClick={() => setHeroTab('schedule')}
                  className={`px-3 py-1.5 rounded text-[10px] font-bold uppercase tracking-widest transition-premium cursor-pointer focus:outline-none select-none ${
                    heroTab === 'schedule' ? 'bg-brass text-ink font-extrabold shadow' : 'text-paper/60 hover:text-white'
                  }`}
                >
                  Webinar Desk
                </button>
              </div>
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            </div>

            {heroTab === 'ledger' ? (
              <div className="space-y-4 animate-fade-in text-left">
                <div className="space-y-1">
                  <span className="text-[9px] font-extrabold text-brass uppercase tracking-widest">Active Ledger Alerts</span>
                  <h3 className="font-serif text-lg font-bold text-white leading-tight">Financial Red Flags Detected</h3>
                </div>
                <div className="space-y-2 text-xs">
                  <div className="p-3 bg-white/5 border border-paper/10 rounded flex items-center justify-between gap-3 hover:bg-white/10 transition-premium">
                    <div className="space-y-0.5">
                      <span className="font-semibold text-white block">Executive Compensation Variance</span>
                      <span className="text-paper/60 font-sans block">+$35,000 Overrun. Bypassing IRC § 4958.</span>
                    </div>
                    <span className="font-serif font-extrabold text-brass shrink-0 font-medium">31.8% Deviation</span>
                  </div>
                  <div className="p-3 bg-white/5 border border-paper/10 rounded flex items-center justify-between gap-3 hover:bg-white/10 transition-premium">
                    <div className="space-y-0.5">
                      <span className="font-semibold text-white block">Unpaid Payroll Taxes (US Treasury)</span>
                      <span className="text-paper/60 font-sans block">Deferred deposits. Personal joint-and-several risk.</span>
                    </div>
                    <span className="font-bold text-rose-400 shrink-0 font-medium bg-rose-500/10 border border-rose-500/25 px-1.5 py-0.5 rounded">Extreme Risk</span>
                  </div>
                </div>
                <button 
                  onClick={() => navigate('tools/budget-worksheet')}
                  className="w-full inline-flex justify-center items-center gap-1.5 py-2.5 bg-paper hover:bg-brass text-ink hover:text-ink text-xs font-bold uppercase tracking-wider rounded transition-premium cursor-pointer font-semibold shadow"
                >
                  <span>Open Budget Worksheet Lab</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            ) : (
              <div className="space-y-4 animate-fade-in text-left">
                <div className="space-y-1">
                  <span className="text-[9px] font-extrabold text-brass uppercase tracking-widest">Enrollment Panel</span>
                  <h3 className="font-serif text-lg font-bold text-white leading-tight">Join Masterclass Training</h3>
                </div>
                <div className="space-y-2 text-xs">
                  <div className="p-3.5 bg-white/5 border border-paper/10 rounded flex items-start gap-3 hover:bg-white/10 transition-premium">
                    <Calendar className="w-5 h-5 text-brass mt-0.5 shrink-0" />
                    <div className="space-y-0.5">
                      <span className="font-semibold text-white block">California Rules Checklist Masterclass</span>
                      <span className="text-paper/65 font-sans block">Online Webinar &bull; July 15, 2026</span>
                    </div>
                  </div>
                  <div className="p-3.5 bg-white/5 border border-paper/10 rounded flex items-start gap-3 hover:bg-white/10 transition-premium">
                    <Award className="w-5 h-5 text-brass mt-0.5 shrink-0" />
                    <div className="space-y-0.5">
                      <span className="font-semibold text-white block">Fiduciary Duties Assessment Course</span>
                      <span className="text-paper/65 font-sans block">Interactive Q&A Session &bull; On Demand</span>
                    </div>
                  </div>
                </div>
                <button
                  onClick={() => navigate('training')}
                  className="w-full inline-flex justify-center items-center py-2 border border-paper/30 hover:border-brass text-paper hover:text-brass text-[10px] font-bold uppercase tracking-wider rounded transition-premium cursor-pointer text-center"
                >
                  Request Workshop
                </button>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* 3. Category-Tabbed Diagnostic Problem Picker Hub */}
      <section className="py-16 bg-white border-b border-fog/80 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto space-y-8">
          
          {/* Header */}
          <div className="text-center space-y-2">
            <div className="inline-flex items-center gap-1 bg-brass/10 border border-brass/20 px-2.5 py-1 rounded-full text-[10px] font-extrabold uppercase tracking-widest text-brass">
              <Zap className="w-3.5 h-3.5" />
              <span>TACTILE DIAGNOSTIC PICKER</span>
            </div>
            <h2 className="font-serif text-3xl font-extrabold text-ink tracking-wide">
              The Boardroom Problem Picker
            </h2>
            <p className="text-xs sm:text-sm text-ink/65 max-w-xl mx-auto leading-relaxed">
              Identify high-stakes operational symptoms your directors are currently facing. Select a category tab below to scan standard rules and actions.
            </p>
          </div>

          {/* Fiduciary Security Scorebar */}
          <div className="max-w-4xl mx-auto bg-paper/20 rounded-xl p-5 border border-fog shadow-sm text-left flex flex-col sm:flex-row gap-5 items-center justify-between">
            <div className="space-y-1.5 w-full">
              <div className="flex justify-between items-end text-[10px] font-extrabold uppercase tracking-wider text-ink/70">
                <span className="flex items-center gap-1 text-burgundy">
                  <ShieldCheck className="w-4 h-4 text-brass" />
                  <span>Fiduciary Security Score</span>
                </span>
                <span className="font-serif text-sm font-extrabold text-ink">{securityScore}% Resolved</span>
              </div>
              {/* Dynamic Bar */}
              <div className="w-full bg-fog rounded-full h-2.5 overflow-hidden">
                <div 
                  className="bg-gradient-to-r from-brass to-emerald-600 h-full rounded-full transition-all duration-700" 
                  style={{ width: `${securityScore}%` }}
                />
              </div>
              <div className="flex justify-between text-[10px] text-ink/50 pt-1 leading-normal font-sans font-medium">
                <span>0% Vulnerable Board</span>
                <span>{8 - resolvedProblems.length} Unresolved Vulnerability Warnings</span>
                <span>100% Fully Secure Board</span>
              </div>
            </div>
            
            {/* Action Callout */}
            {securityScore === 100 ? (
              <div className="shrink-0 bg-emerald-50 text-emerald-700 border border-emerald-200 rounded-lg p-3 text-xs flex items-center gap-2 font-sans font-bold shadow-sm">
                <Sparkles className="w-4 h-4 fill-emerald-600 animate-pulse text-emerald-600" />
                <span>All Fiduciary Threats Mitigated!</span>
              </div>
            ) : securityScore >= 50 ? (
              <div className="shrink-0 bg-amber-50 text-amber-700 border border-amber-200 rounded-lg p-3 text-xs flex items-center gap-2 font-sans font-bold">
                <span>Fiduciary Defense Maturing!</span>
              </div>
            ) : (
              <div className="shrink-0 bg-rose-50 text-rose-800 border border-rose-150 rounded-lg p-3 text-xs flex items-center gap-2 font-sans font-medium leading-relaxed">
                <span>Board Exposure High. Check solutions.</span>
              </div>
            )}
          </div>

          {/* Diagnostic Desktop Tabs */}
          <div className="flex flex-col md:flex-row justify-center items-stretch gap-2 bg-paper/30 p-1.5 rounded-xl border border-fog/80 max-w-4xl mx-auto">
            <button
              onClick={() => setActiveCategory('conflicts')}
              className={`flex-1 py-3 px-4 text-xs font-bold uppercase tracking-wider rounded-lg transition-premium select-none cursor-pointer flex items-center justify-center gap-2 border ${
                activeCategory === 'conflicts'
                  ? 'bg-burgundy text-white border-burgundy shadow-md font-extrabold'
                  : 'bg-white border-fog/40 text-ink/70 hover:text-ink hover:bg-fog/10'
              }`}
            >
              <span className={`w-2 h-2 rounded-full ${activeCategory === 'conflicts' ? 'bg-brass' : 'bg-burgundy'}`} />
              <span>Conflicts & Salaries</span>
            </button>

            <button
              onClick={() => setActiveCategory('oversight')}
              className={`flex-1 py-3 px-4 text-xs font-bold uppercase tracking-wider rounded-lg transition-premium select-none cursor-pointer flex items-center justify-center gap-2 border ${
                activeCategory === 'oversight'
                  ? 'bg-slate-brand text-white border-slate-brand shadow-md font-extrabold'
                  : 'bg-white border-fog/40 text-ink/70 hover:text-ink hover:bg-fog/10'
              }`}
            >
              <span className={`w-2 h-2 rounded-full ${activeCategory === 'oversight' ? 'bg-brass' : 'bg-slate-brand'}`} />
              <span>Executive Oversight</span>
            </button>

            <button
              onClick={() => setActiveCategory('audits')}
              className={`flex-1 py-3 px-4 text-xs font-bold uppercase tracking-wider rounded-lg transition-premium select-none cursor-pointer flex items-center justify-center gap-2 border ${
                activeCategory === 'audits'
                  ? 'bg-teal-brand text-white border-teal-brand shadow-md font-extrabold'
                  : 'bg-white border-fog/40 text-ink/70 hover:text-ink hover:bg-fog/10'
              }`}
            >
              <span className={`w-2 h-2 rounded-full ${activeCategory === 'audits' ? 'bg-brass' : 'bg-teal-brand'}`} />
              <span>Financial Audits</span>
            </button>

            <button
              onClick={() => setActiveCategory('california')}
              className={`flex-1 py-3 px-4 text-xs font-bold uppercase tracking-wider rounded-lg transition-premium select-none cursor-pointer flex items-center justify-center gap-2 border ${
                activeCategory === 'california'
                  ? 'bg-brass text-ink border-brass shadow-md font-extrabold'
                  : 'bg-white border-fog/40 text-ink/70 hover:text-ink hover:bg-fog/10'
              }`}
            >
              <span className={`w-2 h-2 rounded-full ${activeCategory === 'california' ? 'bg-ink' : 'bg-brass'}`} />
              <span>California Rules</span>
            </button>
          </div>

          {/* Cards Display Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl mx-auto pt-4 text-left">
            {boardroomProblems[activeCategory].map((prob, idx) => {
              const isResolved = resolvedProblems.includes(prob.id);
              return (
                <div
                  key={idx}
                  onClick={() => navigate(prob.target)}
                  className={`bg-white rounded-xl shadow-sm border p-6 flex flex-col justify-between cursor-pointer hover:shadow-md hover:-translate-y-0.5 transition-premium group relative overflow-hidden ${
                    isResolved ? 'border-emerald-250 bg-emerald-500/[0.02]' : 'border-fog/80'
                  }`}
                >
                  <div className={`absolute top-0 left-0 w-1.5 h-full transition-premium ${isResolved ? 'bg-emerald-600' : 'bg-brass'}`} />
                  
                  <div className="space-y-3 pl-2">
                    <div className="flex justify-between items-start gap-4">
                      <span className="text-[9px] font-extrabold uppercase tracking-widest text-brass block">
                        {prob.subtitle}
                      </span>
                      {/* Interactive checkoff checkbox button */}
                      <button
                        onClick={(e) => handleToggleProblem(prob.id, e)}
                        className={`p-1 rounded border shrink-0 transition-premium flex items-center justify-center cursor-pointer ${
                          isResolved 
                            ? 'bg-emerald-600 border-emerald-600 text-white hover:bg-emerald-700 hover:border-emerald-700' 
                            : 'border-fog/80 hover:border-brass text-transparent hover:text-brass/20'
                        }`}
                        title={isResolved ? "Mark Vulnerability Unresolved" : "Mark Vulnerability Mitigated"}
                      >
                        <Check className="w-3.5 h-3.5" />
                      </button>
                    </div>
                    <h4 className={`font-serif font-bold text-lg text-ink group-hover:text-brass transition-premium leading-snug ${
                      isResolved ? 'line-through text-ink/40 decoration-brass/35 font-semibold' : ''
                    }`}>
                      {prob.title}
                    </h4>
                    <p className={`font-sans text-xs leading-relaxed font-medium ${isResolved ? 'text-ink/40 font-normal' : 'text-ink/75'}`}>
                      {prob.desc}
                    </p>
                  </div>

                  <div className="pt-4 border-t border-fog/50 mt-5 pl-2 flex items-center justify-between">
                    <span className="text-[10px] text-ink/40 font-bold uppercase tracking-widest">
                      {isResolved ? '✓ Mitigated & Secure' : 'Diagnostic Solution'}
                    </span>
                    <span className="inline-flex items-center gap-1 text-[11px] font-extrabold uppercase tracking-wider text-slate-brand group-hover:text-brass group-hover:translate-x-1 transition-premium">
                      <span>{isResolved ? 'Review Standard' : 'Inspect Standard'}</span>
                      <ChevronRight className="w-4 h-4" />
                    </span>
                  </div>
                </div>
              );
            })}
          </div>

        </div>
      </section>

      {/* Editorial Clarity Block (Integrated from Hostinger) */}
      <section className="py-16 bg-white border-b border-fog/80 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center space-y-6">
          <h2 className="font-serif text-2xl sm:text-3xl lg:text-4xl text-ink font-bold tracking-tight">
            Many boards are active. <span className="text-brass italic">Few are effective.</span>
          </h2>
          <p className="font-sans text-xs sm:text-sm md:text-base text-ink/75 leading-relaxed max-w-3xl mx-auto">
            The difference is usually not intelligence or goodwill, but <strong className="text-ink font-semibold">clarity</strong>. Board members need to know what belongs to governance, what belongs to management, and what should be left mercifully alone. Strong organizations need strong boards: not meddlesome boards, not ornamental boards, but thoughtful governing bodies that understand their duties. This site is a practical reference guide for board members, chairmen, and presidents who want to serve wisely and lead responsibly.
          </p>
          
          <div className="pt-4 flex flex-wrap justify-center gap-4">
            <button 
              onClick={() => navigate('articles')}
              className="px-5 py-3 border border-brass hover:bg-brass text-ink hover:text-white font-serif italic text-sm font-semibold rounded cursor-pointer transition-premium"
            >
              for members &gt;
            </button>
            <button 
              onClick={() => navigate('next-meeting')}
              className="px-5 py-3 border border-brass hover:bg-brass text-ink hover:text-white font-serif italic text-sm font-semibold rounded cursor-pointer transition-premium"
            >
              for chairmen &gt;
            </button>
            <button 
              onClick={() => navigate('tools')}
              className="px-5 py-3 border border-brass hover:bg-brass text-ink hover:text-white font-serif italic text-sm font-semibold rounded cursor-pointer transition-premium"
            >
              for presidents &gt;
            </button>
          </div>
        </div>
      </section>

      {/* 4. The Three Jobs of the Board Grid */}
      <section className="py-20 bg-paper/40 px-4 sm:px-6 lg:px-8 border-b border-fog/85">
        <div className="max-w-7xl mx-auto space-y-12 text-center">
          <div className="space-y-3">
            <h2 className="font-serif text-3xl sm:text-4xl text-ink font-bold tracking-wide">
              The Three Jobs of a Mature Board
            </h2>
            <p className="max-w-2xl mx-auto text-sm sm:text-base text-ink/70">
              Under California statutory law, directors must operate under a tripartite standard of stewardship. Move away from ornamenting and into active governance.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Strategy */}
            <div className="bg-white border border-fog p-8 rounded-xl shadow-sm hover:shadow-md transition-premium hover:border-slate-brand/40 text-left space-y-4">
              <div className="w-12 h-12 bg-slate-brand/10 text-slate-brand rounded-lg flex items-center justify-center border border-slate-brand/20">
                <Activity className="w-6 h-6" />
              </div>
              <h3 className="font-serif font-bold text-xl text-ink">1. Strategy</h3>
              <p className="text-xs sm:text-sm text-ink/75 leading-relaxed">
                Looking ten years out. Establishing the organization's strategic contours, verifying that programs remain strictly aligned with your tax-exempt charter, and setting the initial budget boundaries.
              </p>
              <ul className="space-y-1 text-xs text-slate-brand font-semibold pt-2">
                <li className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-brass" />
                  <span>3-Year Planning Templates</span>
                </li>
                <li className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-brass" />
                  <span>40-40-20 Meeting Rules</span>
                </li>
              </ul>
            </div>

            {/* Safety */}
            <div className="bg-white border border-fog p-8 rounded-xl shadow-sm hover:shadow-md transition-premium hover:border-copper/40 text-left space-y-4">
              <div className="w-12 h-12 bg-copper/10 text-copper rounded-lg flex items-center justify-center border border-copper/20">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <h3 className="font-serif font-bold text-xl text-ink">2. Safety</h3>
              <p className="text-xs sm:text-sm text-ink/75 leading-relaxed">
                Risk mitigation. Conducting background Live Scan audits for youth mentoring staff, procuring robust D&O insurance with employment practice riders, and implementing strict corporate controls.
              </p>
              <ul className="space-y-1 text-xs text-copper font-semibold pt-2">
                <li className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-brass" />
                  <span>Background Verification Screens</span>
                </li>
                <li className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-brass" />
                  <span>D&O Coverage Checklist</span>
                </li>
              </ul>
            </div>

            {/* Audit */}
            <div className="bg-white border border-fog p-8 rounded-xl shadow-sm hover:shadow-md transition-premium hover:border-teal-brand/40 text-left space-y-4">
              <div className="w-12 h-12 bg-teal-brand/10 text-teal-brand rounded-lg flex items-center justify-center border border-teal-brand/20">
                <Scale className="w-6 h-6" />
              </div>
              <h3 className="font-serif font-bold text-xl text-ink">3. Audit</h3>
              <p className="text-xs sm:text-sm text-ink/75 leading-relaxed">
                Active verification. Scrutinizing ledger balances, reviewing the 10 largest budget deviations, auditing the CEO's credit card statements, and drafting defensive corporate minutes.
              </p>
              <ul className="space-y-1 text-xs text-teal-brand font-semibold pt-2">
                <li className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-brass" />
                  <span>Budget Deviation worksheet</span>
                </li>
                <li className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-brass" />
                  <span>Stand-alone Audit Committee setup</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* 5. Featured Classroom Scenarios & Masterclasses */}
      <section className="py-20 bg-white px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Left Column: Featured Scenario Case Study */}
          <div className="lg:col-span-6 space-y-6 text-left">
            <div className="space-y-2">
              <h3 className="font-serif font-extrabold text-2xl sm:text-3xl text-ink tracking-wide">
                High-Stakes Scenario
              </h3>
              <p className="text-xs sm:text-sm text-ink/60">
                Study classroom cases of board failures to protect your directors from liability.
              </p>
            </div>

            {scenarios.slice(0, 1).map((sc, idx) => (
              <div key={idx} className="bg-paper border border-brass/30 p-6 rounded-xl space-y-4 shadow-sm hover:shadow-md transition-premium">
                <div className="flex items-center gap-2 justify-between flex-wrap">
                  <span className="text-[10px] font-extrabold text-brass uppercase bg-brass/10 px-2.5 py-0.5 rounded border border-brass/20">
                    {sc.issueType}
                  </span>
                  <span className="text-xs text-ink/50 font-bold">{sc.boardStage} Level</span>
                </div>
                
                <h4 className="font-serif font-bold text-xl text-ink leading-tight hover:text-brass cursor-pointer" onClick={() => navigate(`scenario/${sc.slug}`)}>
                  {sc.title}
                </h4>
                
                <p className="text-xs sm:text-sm text-ink/85 leading-relaxed line-clamp-3">
                  {sc.facts}
                </p>
                
                <div className="pt-3 border-t border-brass/15 flex items-center justify-between">
                  <span className="text-[11px] text-brass italic font-medium">Rebuttable Presumption Focus</span>
                  <button 
                    onClick={() => navigate(`scenario/${sc.slug}`)}
                    className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-slate-brand hover:text-brass transition-premium"
                  >
                    <span>Inspect Case Study</span>
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Right Column: Key Masterclass Articles */}
          <div className="lg:col-span-6 space-y-6 text-left">
            <div className="space-y-2">
              <h3 className="font-serif font-extrabold text-2xl sm:text-3xl text-ink tracking-wide">
                Governance Masterclasses
              </h3>
              <p className="text-xs sm:text-sm text-ink/60">
                Thorough fiduciaries desk articles mapped directly to California Nonprofit guidelines.
              </p>
            </div>

            <div className="space-y-4">
              {articles.slice(0, 3).map((art, idx) => (
                <div 
                  key={idx}
                  onClick={() => navigate(`article/${art.slug}`)}
                  className="group cursor-pointer p-4 rounded-lg border border-fog hover:border-brass hover:bg-paper/10 transition-premium flex items-center justify-between gap-4"
                >
                  <div className="space-y-1">
                    <span className="text-[9px] font-extrabold uppercase tracking-widest text-slate-brand">{art.category}</span>
                    <h4 className="font-serif font-bold text-base text-ink group-hover:text-brass transition-premium leading-tight">
                      {art.title}
                    </h4>
                    <p className="text-xs text-ink/60 line-clamp-1">{art.description}</p>
                  </div>
                  <div className="text-ink/30 group-hover:text-brass group-hover:translate-x-1 transition-premium shrink-0">
                    <ChevronRight className="w-5 h-5" />
                  </div>
                </div>
              ))}
            </div>
            
            <div className="pt-2 text-right">
              <button 
                onClick={() => navigate('articles')}
                className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-slate-brand hover:text-brass transition-premium"
              >
                <span>View Full Library (12 Masterclasses)</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* 6. The Active Labs CTA Row */}
      <section className="py-16 bg-ink text-paper border-t border-brass/20 text-center px-4 sm:px-6 lg:px-8">
        <div className="max-w-5xl mx-auto space-y-10">
          <div className="space-y-3">
            <h2 className="font-serif text-2xl sm:text-3xl lg:text-4xl text-white font-bold tracking-wide">
              The Interactive Governance Laboratories
            </h2>
            <p className="max-w-3xl mx-auto text-xs sm:text-sm text-paper/85 leading-relaxed">
              We do not merely serve static reading material. Our custom-built, client-side labs let you audit board binders, grade minutes drafts, scan ledgers, and check delegations of power.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Board Packet Lab */}
            <div 
              onClick={() => navigate('tools/board-packet-lab')}
              className="bg-white/5 border border-paper/10 hover:border-brass/40 p-5 rounded-xl cursor-pointer hover:bg-white/10 transition-premium text-left space-y-3 shadow-inner"
            >
              <div className="w-9 h-9 bg-brass/10 text-brass border border-brass/20 rounded flex items-center justify-center shrink-0">
                <FileText className="w-5 h-5" />
              </div>
              <h4 className="font-serif font-bold text-base text-white">Board Packet Lab</h4>
              <p className="text-xs text-paper/60 leading-relaxed">Audit a mock board binder (Financials, reports, checklists) for red flags.</p>
            </div>

            {/* Minutes Scorecard */}
            <div 
              onClick={() => navigate('tools/minutes-scorecard')}
              className="bg-white/5 border border-paper/10 hover:border-brass/40 p-5 rounded-xl cursor-pointer hover:bg-white/10 transition-premium text-left space-y-3 shadow-inner"
            >
              <div className="w-9 h-9 bg-brass/10 text-brass border border-brass/20 rounded flex items-center justify-center shrink-0">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <h4 className="font-serif font-bold text-base text-white">Minutes Scorecard</h4>
              <p className="text-xs text-paper/60 leading-relaxed">Input and test board minutes drafts to receive a defensive grade.</p>
            </div>

            {/* Budget Deviation Worksheet */}
            <div 
              onClick={() => navigate('tools/budget-worksheet')}
              className="bg-white/5 border border-paper/10 hover:border-brass/40 p-5 rounded-xl cursor-pointer hover:bg-white/10 transition-premium text-left space-y-3 shadow-inner"
            >
              <div className="w-9 h-9 bg-brass/10 text-brass border border-brass/20 rounded flex items-center justify-center shrink-0">
                <Scale className="w-5 h-5" />
              </div>
              <h4 className="font-serif font-bold text-base text-white">Budget Worksheet</h4>
              <p className="text-xs text-paper/60 leading-relaxed">Scan financial ledger variances and read auditor risk commentaries.</p>
            </div>

            {/* Authority Delegation Map */}
            <div 
              onClick={() => navigate('tools/authority-map')}
              className="bg-white/5 border border-paper/10 hover:border-brass/40 p-5 rounded-xl cursor-pointer hover:bg-white/10 transition-premium text-left space-y-3 shadow-inner"
            >
              <div className="w-9 h-9 bg-brass/10 text-brass border border-brass/20 rounded flex items-center justify-center shrink-0">
                <Landmark className="w-5 h-5" />
              </div>
              <h4 className="font-serif font-bold text-base text-white">Authority Map</h4>
              <p className="text-xs text-paper/60 leading-relaxed">Test delegation of power boundaries (Board collectively vs CEO).</p>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Home;
