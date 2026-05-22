import React, { useState } from 'react';
import { useRouter } from '../components/Router';
import { Layout } from '../components/Layout';
import { 
  Landmark, ArrowRight, ShieldCheck, Scale, FileText, CheckCircle2, 
  ChevronRight, Activity, Zap, Calendar, Award, Check, Sparkles, Users,
  ExternalLink
} from 'lucide-react';
import { articles } from '../data/articles';

export const Home: React.FC = () => {
  const { navigate } = useRouter();
  const [heroTab, setHeroTab] = useState<'ledger' | 'schedule'>('ledger');
  const [activeCategory, setActiveCategory] = useState<'conflicts' | 'oversight' | 'audits' | 'california'>('conflicts');
  const [activeOption5Tab, setActiveOption5Tab] = useState<'symptom' | 'solution'>('symptom');
  const [activeThreeJobsRing, setActiveThreeJobsRing] = useState<'strategy' | 'safety' | 'audit'>('strategy');
  const [activeThreeJobsTab, setActiveThreeJobsTab] = useState<'strategy' | 'safety' | 'audit'>('strategy');
  
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
        subtitle: "Executive Compensation Safe Harbor (IRC § 4958)",
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

      {/* --- START OF BRAINSTORMING CLOCKS & BLOCKS --- */}
      
      {/* OPTION 1: WSJ Editorial Split-Screen */}
      <section className="py-16 bg-white border-b border-fog/80 px-4 sm:px-6 lg:px-8 relative">
        <div className="absolute top-2 left-4 text-[9px] font-black tracking-widest text-brass uppercase select-none bg-brass/10 px-2 py-0.5 rounded">Option 1: WSJ Editorial Split-Screen</div>
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8 items-center pt-4">
          <div className="lg:col-span-5 text-left border-l-4 border-brass pl-6 py-4 space-y-3">
            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl text-ink font-extrabold tracking-tight leading-tight">
              Many boards <br />
              are active. <br />
              <span className="text-brass italic">Few are effective.</span>
            </h2>
            <div className="w-16 h-0.5 bg-brass/30" />
          </div>
          
          <div className="lg:col-span-7 text-left space-y-6">
            <p className="font-sans text-sm sm:text-base text-ink/75 leading-relaxed">
              The difference is usually not intelligence or goodwill, but <strong className="text-ink font-semibold">clarity</strong>. Board members need to know what belongs to governance, what belongs to management, and what should be left mercifully alone. Strong organizations need strong boards: not meddlesome boards, not ornamental boards, but thoughtful governing bodies that understand their duties. This site is a practical reference guide for board members, chairmen, and presidents who want to serve wisely and lead responsibly.
            </p>
            
            <div className="flex flex-wrap gap-4 pt-2">
              <button 
                onClick={() => navigate('articles')}
                className="px-6 py-3 border border-ink hover:border-brass hover:bg-brass/5 text-ink hover:text-brass text-xs font-bold uppercase tracking-wider rounded transition-premium cursor-pointer font-semibold"
              >
                For Members &rarr;
              </button>
              <button 
                onClick={() => navigate('next-meeting')}
                className="px-6 py-3 border border-ink hover:border-brass hover:bg-brass/5 text-ink hover:text-brass text-xs font-bold uppercase tracking-wider rounded transition-premium cursor-pointer font-semibold"
              >
                For Chairmen &rarr;
              </button>
              <button 
                onClick={() => navigate('tools')}
                className="px-6 py-3 border border-ink hover:border-brass hover:bg-brass/5 text-ink hover:text-brass text-xs font-bold uppercase tracking-wider rounded transition-premium cursor-pointer font-semibold"
              >
                For Presidents &rarr;
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* OPTION 2: Role-Based Triptych Cards */}
      <section className="py-20 bg-paper/35 border-b border-fog/80 px-4 sm:px-6 lg:px-8 relative">
        <div className="absolute top-2 left-4 text-[9px] font-black tracking-widest text-brass uppercase select-none bg-brass/10 px-2 py-0.5 rounded">Option 2: Role-Based Triptych Cards</div>
        
        <div className="max-w-7xl mx-auto space-y-12 text-center pt-4">
          <div className="space-y-3">
            <h2 className="font-serif text-3xl sm:text-4xl text-ink font-bold tracking-tight">
              Many boards are active. <span className="text-brass italic">Few are effective.</span>
            </h2>
            <p className="max-w-2xl mx-auto text-xs sm:text-sm text-ink/70 leading-relaxed">
              Effective governance depends on individual clarity. Select your leadership role below to access customized checklists, directories, and compliance guidelines.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {/* Card 1: Members */}
            <div 
              onClick={() => navigate('articles')}
              className="bg-white border border-fog/80 rounded-xl p-6 shadow-sm hover:shadow-lg hover:-translate-y-1 transition-premium text-left cursor-pointer group flex flex-col justify-between h-[220px]"
            >
              <div className="space-y-3">
                <div className="inline-flex items-center gap-1 bg-brass/10 text-brass px-2 py-0.5 rounded text-[10px] font-extrabold uppercase tracking-wider">
                  Governance Library
                </div>
                <h3 className="font-serif font-bold text-lg text-ink group-hover:text-brass transition-premium">For Board Members</h3>
                <p className="text-xs text-ink/65 leading-relaxed font-medium">Read the 12 masterclasses on Duty of Care, Duty of Loyalty, executive contracts, and personal liability.</p>
              </div>
              <span className="text-[10px] font-black uppercase tracking-wider text-slate-brand group-hover:text-brass transition-premium inline-flex items-center gap-1 pt-4 self-start">
                <span>Browse Masterclasses</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </span>
            </div>

            {/* Card 2: Chairmen */}
            <div 
              onClick={() => navigate('next-meeting')}
              className="bg-white border border-fog/80 rounded-xl p-6 shadow-sm hover:shadow-lg hover:-translate-y-1 transition-premium text-left cursor-pointer group flex flex-col justify-between h-[220px]"
            >
              <div className="space-y-3">
                <div className="inline-flex items-center gap-1 bg-brass/10 text-brass px-2 py-0.5 rounded text-[10px] font-extrabold uppercase tracking-wider">
                  Meeting Prep Desk
                </div>
                <h3 className="font-serif font-bold text-lg text-ink group-hover:text-brass transition-premium">For Board Chairmen</h3>
                <p className="text-xs text-ink/65 leading-relaxed font-medium">Coordinate upcoming meetings, calculate statutory notice timelines, and adjust agenda allocations.</p>
              </div>
              <span className="text-[10px] font-black uppercase tracking-wider text-slate-brand group-hover:text-brass transition-premium inline-flex items-center gap-1 pt-4 self-start">
                <span>Access Meeting Prep Desk</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </span>
            </div>

            {/* Card 3: Presidents */}
            <div 
              onClick={() => navigate('tools')}
              className="bg-white border border-fog/80 rounded-xl p-6 shadow-sm hover:shadow-lg hover:-translate-y-1 transition-premium text-left cursor-pointer group flex flex-col justify-between h-[220px]"
            >
              <div className="space-y-3">
                <div className="inline-flex items-center gap-1 bg-brass/10 text-brass px-2 py-0.5 rounded text-[10px] font-extrabold uppercase tracking-wider">
                  Diagnostic Labs
                </div>
                <h3 className="font-serif font-bold text-lg text-ink group-hover:text-brass transition-premium">For CEOs & Presidents</h3>
                <p className="text-xs text-ink/65 leading-relaxed font-medium">Launch interactive worksheets to audit binders, test financial variances, and map executive delegations.</p>
              </div>
              <span className="text-[10px] font-black uppercase tracking-wider text-slate-brand group-hover:text-brass transition-premium inline-flex items-center gap-1 pt-4 self-start">
                <span>Launch Laboratories</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* OPTION 3: Dark Executive Boardroom Panel */}
      <section className="py-20 bg-ink text-paper border-b border-brass/20 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
        <div className="absolute inset-0 opacity-[0.02] pointer-events-none bg-[radial-gradient(#C29A4A_1px,transparent_1px)] [background-size:16px_16px]" />
        <div className="absolute top-2 left-4 text-[9px] font-black tracking-widest text-brass uppercase select-none bg-brass/15 px-2 py-0.5 rounded border border-brass/25 z-20">Option 3: Dark Executive Boardroom Panel</div>
        
        <div className="max-w-5xl mx-auto text-center space-y-8 relative z-10 pt-4">
          <div className="space-y-2">
            <span className="text-[10px] font-extrabold text-brass uppercase tracking-widest block">Executive Core Principle</span>
            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl text-white font-extrabold tracking-tight">
              Many boards are active. <span className="text-brass italic">Few are effective.</span>
            </h2>
          </div>
          
          <p className="font-sans text-sm sm:text-base text-paper/75 leading-relaxed max-w-3xl mx-auto">
            The difference is usually not intelligence or goodwill, but <strong className="text-white font-semibold">clarity</strong>. Board members need to know what belongs to governance, what belongs to management, and what should be left mercifully alone. Strong organizations need strong boards: not meddlesome boards, not ornamental boards, but thoughtful governing bodies that understand their duties. This site is a practical reference guide for board members, chairmen, and presidents who want to serve wisely and lead responsibly.
          </p>
          
          <div className="pt-4 flex flex-col sm:flex-row justify-center gap-4 max-w-md sm:max-w-xl mx-auto">
            <button 
              onClick={() => navigate('articles')}
              className="flex-1 py-3 bg-brass hover:bg-white text-ink font-bold uppercase tracking-wider text-xs rounded transition-premium cursor-pointer font-semibold shadow"
            >
              For Members &rarr;
            </button>
            <button 
              onClick={() => navigate('next-meeting')}
              className="flex-1 py-3 border border-paper/35 hover:border-brass text-paper hover:text-brass font-bold uppercase tracking-wider text-xs rounded transition-premium cursor-pointer font-semibold"
            >
              For Chairmen &rarr;
            </button>
            <button 
              onClick={() => navigate('tools')}
              className="flex-1 py-3 border border-paper/35 hover:border-brass text-paper hover:text-brass font-bold uppercase tracking-wider text-xs rounded transition-premium cursor-pointer font-semibold"
            >
              For Presidents &rarr;
            </button>
          </div>
        </div>
      </section>

      {/* OPTION 4: Minimalist Parchment Desk Scroll */}
      <section className="py-20 bg-paper/15 border-b border-fog/80 px-4 sm:px-6 lg:px-8 relative">
        <div className="absolute top-2 left-4 text-[9px] font-black tracking-widest text-brass uppercase select-none bg-brass/10 px-2 py-0.5 rounded">Option 4: Minimalist Parchment Desk Scroll</div>
        
        <div className="max-w-4xl mx-auto pt-4">
          <div className="bg-white border-2 border-double border-brass/35 rounded p-8 sm:p-12 shadow-sm text-center space-y-6 relative">
            <div className="absolute top-4 left-4 text-brass/25 select-none font-serif text-6xl leading-none">&ldquo;</div>
            <div className="absolute bottom-4 right-4 text-brass/25 select-none font-serif text-6xl leading-none">&rdquo;</div>
            
            <h2 className="font-serif text-2xl sm:text-3xl lg:text-4xl text-ink font-extrabold tracking-tight relative z-10 leading-tight">
              Many boards are active. <br />
              <span className="text-brass italic">Few are effective.</span>
            </h2>
            
            <p className="font-serif italic text-sm sm:text-base text-ink/85 leading-relaxed max-w-2xl mx-auto relative z-10">
              "The difference is usually not intelligence or goodwill, but clarity. Board members need to know what belongs to governance, what belongs to management, and what should be left mercifully alone. Strong organizations need strong boards."
            </p>
            
            <p className="font-sans text-xs text-ink/65 leading-relaxed max-w-3xl mx-auto pt-1 relative z-10 font-medium">
              This site is published by the California Center for Nonprofit Law as a practical reference guide for board members, chairmen, and presidents who want to serve wisely and lead responsibly.
            </p>
            
            <div className="pt-6 flex justify-center flex-wrap gap-x-8 gap-y-3 font-sans text-xs font-extrabold uppercase tracking-widest relative z-10">
              <button 
                onClick={() => navigate('articles')}
                className="text-slate-brand hover:text-brass transition-premium underline decoration-brass/30 underline-offset-4 hover:decoration-brass cursor-pointer"
              >
                For Members &rarr;
              </button>
              <button 
                onClick={() => navigate('next-meeting')}
                className="text-slate-brand hover:text-brass transition-premium underline decoration-brass/30 underline-offset-4 hover:decoration-brass cursor-pointer"
              >
                For Chairmen &rarr;
              </button>
              <button 
                onClick={() => navigate('tools')}
                className="text-slate-brand hover:text-brass transition-premium underline decoration-brass/30 underline-offset-4 hover:decoration-brass cursor-pointer"
              >
                For Presidents &rarr;
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* OPTION 5: Interactive Comparative Dial (Active vs. Effective) */}
      <section className="py-20 bg-white border-b border-fog/80 px-4 sm:px-6 lg:px-8 relative">
        <div className="absolute top-2 left-4 text-[9px] font-black tracking-widest text-brass uppercase select-none bg-brass/10 px-2 py-0.5 rounded">Option 5: Interactive Comparative Dial</div>
        
        <div className="max-w-5xl mx-auto pt-4 space-y-10">
          <div className="text-center space-y-3">
            <h2 className="font-serif text-3xl sm:text-4xl text-ink font-bold tracking-tight">
              Many boards are active. <span className="text-brass italic">Few are effective.</span>
            </h2>
            <p className="max-w-2xl mx-auto text-xs sm:text-sm text-ink/70 leading-relaxed font-sans">
              Where does your boardroom sit on the spectrum? Toggle the dial below to contrast standard active behaviors with high-stewardship effective solutions.
            </p>
          </div>

          {/* Interactive Dial Switch */}
          <div className="max-w-md mx-auto bg-paper border border-fog/85 rounded-full p-1.5 flex items-center justify-between shadow-sm relative z-10">
            <button
              onClick={() => setActiveOption5Tab('symptom')}
              className={`flex-1 py-2.5 px-4 rounded-full text-xs font-bold uppercase tracking-wider transition-all duration-300 cursor-pointer ${
                activeOption5Tab === 'symptom'
                  ? 'bg-burgundy text-white shadow-md'
                  : 'text-ink/60 hover:text-ink'
              }`}
            >
              The Active Board (Symptom)
            </button>
            <button
              onClick={() => setActiveOption5Tab('solution')}
              className={`flex-1 py-2.5 px-4 rounded-full text-xs font-bold uppercase tracking-wider transition-all duration-300 cursor-pointer ${
                activeOption5Tab === 'solution'
                  ? 'bg-teal-brand text-white shadow-md'
                  : 'text-ink/60 hover:text-ink'
              }`}
            >
              The Effective Board (Solution)
            </button>
          </div>

          {/* Content Comparative Desk */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto relative z-10 text-left">
            {activeOption5Tab === 'symptom' ? (
              <>
                <div className="bg-burgundy/5 border border-burgundy/15 rounded-xl p-6 space-y-3 transition-premium hover:bg-burgundy/[0.08]">
                  <span className="text-[10px] font-extrabold uppercase tracking-widest text-burgundy block">Behavior 1</span>
                  <h4 className="font-serif font-bold text-base text-ink">Exhaustive Packet Handouts</h4>
                  <p className="text-xs text-ink/70 leading-relaxed">
                    Directors receive dense, hundreds-of-pages board packets on the morning of the meeting, rendering thorough fiduciary study impossible.
                  </p>
                </div>
                <div className="bg-burgundy/5 border border-burgundy/15 rounded-xl p-6 space-y-3 transition-premium hover:bg-burgundy/[0.08]">
                  <span className="text-[10px] font-extrabold uppercase tracking-widest text-burgundy block">Behavior 2</span>
                  <h4 className="font-serif font-bold text-base text-ink">Tactical Micromanagement</h4>
                  <p className="text-xs text-ink/70 leading-relaxed">
                    Individual directors bypass the CEO and directly instruct staff between meetings, fracturing operations and creating legal liabilities.
                  </p>
                </div>
                <div className="bg-burgundy/5 border border-burgundy/15 rounded-xl p-6 space-y-3 transition-premium hover:bg-burgundy/[0.08]">
                  <span className="text-[10px] font-extrabold uppercase tracking-widest text-burgundy block">Behavior 3</span>
                  <h4 className="font-serif font-bold text-base text-ink">Passive Budget Review</h4>
                  <p className="text-xs text-ink/70 leading-relaxed">
                    Finances are reviewed passively without questioning variances, leaving the organization exposed to statutory self-dealing and audit fines.
                  </p>
                </div>
              </>
            ) : (
              <>
                <div className="bg-teal-brand/5 border border-teal-brand/15 rounded-xl p-6 space-y-3 transition-premium hover:bg-teal-brand/[0.08]">
                  <span className="text-[10px] font-extrabold uppercase tracking-widest text-teal-brand block">Solution 1</span>
                  <h4 className="font-serif font-bold text-base text-ink">5-Day Advance Lead Times</h4>
                  <p className="text-xs text-ink/70 leading-relaxed">
                    Materials and agendas are finalized and securely distributed at least five days prior, guaranteeing directors fulfill their statutory Duty of Care.
                  </p>
                </div>
                <div className="bg-teal-brand/5 border border-teal-brand/15 rounded-xl p-6 space-y-3 transition-premium hover:bg-teal-brand/[0.08]">
                  <span className="text-[10px] font-extrabold uppercase tracking-widest text-teal-brand block">Solution 2</span>
                  <h4 className="font-serif font-bold text-base text-ink">Strict Symmetrical Delegation</h4>
                  <p className="text-xs text-ink/70 leading-relaxed">
                    A formal board authority map dictates precise delegation boundaries, separating operational execution from oversight duties.
                  </p>
                </div>
                <div className="bg-teal-brand/5 border border-teal-brand/15 rounded-xl p-6 space-y-3 transition-premium hover:bg-teal-brand/[0.08]">
                  <span className="text-[10px] font-extrabold uppercase tracking-widest text-teal-brand block">Solution 3</span>
                  <h4 className="font-serif font-bold text-base text-ink">Interactive Financial Audits</h4>
                  <p className="text-xs text-ink/70 leading-relaxed">
                    Directors deploy targeted, structured CFO inquiry scripts to trace financial discrepancies and isolate potential self-dealing conflicts.
                  </p>
                </div>
              </>
            )}
          </div>

          {/* Action CTAs */}
          <div className="text-center space-y-4 pt-4">
            <span className="text-[10px] font-extrabold uppercase tracking-widest text-brass block">Activate Your Core Leadership Role</span>
            <div className="flex flex-wrap justify-center gap-4">
              <button 
                onClick={() => navigate('articles')}
                className="px-6 py-2.5 bg-ink text-white hover:bg-brass text-xs font-bold uppercase tracking-wider rounded transition-premium cursor-pointer font-semibold shadow"
              >
                For Members &rarr;
              </button>
              <button 
                onClick={() => navigate('next-meeting')}
                className="px-6 py-2.5 border border-ink/20 hover:border-brass text-ink hover:text-brass text-xs font-bold uppercase tracking-wider rounded transition-premium cursor-pointer font-semibold"
              >
                For Chairmen &rarr;
              </button>
              <button 
                onClick={() => navigate('tools')}
                className="px-6 py-2.5 border border-ink/20 hover:border-brass text-ink hover:text-brass text-xs font-bold uppercase tracking-wider rounded transition-premium cursor-pointer font-semibold"
              >
                For Presidents &rarr;
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* OPTION 6: Judicial Signature Scroll with Legal Seal */}
      <section className="py-20 bg-paper/35 border-b border-fog/80 px-4 sm:px-6 lg:px-8 relative">
        <div className="absolute top-2 left-4 text-[9px] font-black tracking-widest text-brass uppercase select-none bg-brass/10 px-2 py-0.5 rounded">Option 6: Legal Memo with Statutory Seal</div>
        
        <div className="max-w-4xl mx-auto pt-4">
          <div className="bg-white border border-brass/25 rounded p-8 sm:p-12 shadow-md relative overflow-hidden">
            {/* Elegant Circular Legal Emblem / Seal */}
            <div className="absolute -top-12 -right-12 sm:-top-8 sm:-right-8 w-44 h-44 border-4 border-double border-brass/15 rounded-full flex items-center justify-center rotate-12 pointer-events-none select-none">
              <div className="border border-dashed border-brass/20 w-36 h-36 rounded-full flex flex-col items-center justify-center p-2 text-center text-[7px] font-black text-brass/20 uppercase tracking-widest">
                <span>California Center</span>
                <span className="my-1 text-brass/25"><Scale className="w-5 h-5" /></span>
                <span>Nonprofit Law</span>
              </div>
            </div>

            <div className="space-y-6 relative z-10 text-left">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-brass/10 rounded-full flex items-center justify-center text-brass">
                  <Scale className="w-5 h-5" />
                </div>
                <div className="space-y-0.5">
                  <span className="text-[9px] font-black text-brass uppercase tracking-widest block">Official Juridical Proclamation</span>
                  <h3 className="font-serif font-bold text-lg text-ink">Stewardship Decree</h3>
                </div>
              </div>

              <div className="w-full h-px bg-gradient-to-r from-brass/30 via-brass/10 to-transparent" />

              <h2 className="font-serif text-2xl sm:text-3xl text-ink font-bold tracking-tight leading-tight max-w-xl">
                "Many boards are active. <br />
                <span className="text-brass italic">But few are effective."</span>
              </h2>

              <p className="font-sans text-xs sm:text-sm text-ink/75 leading-relaxed max-w-2xl">
                The defining difference is not intelligence or devotion, but <strong className="text-ink font-bold">clarity</strong>. Effective boards understand the sharp dividing line between policy governance and administrative execution. They do not meddle, they do not ornament—they steward.
              </p>

              {/* Signature Line Styled Buttons */}
              <div className="pt-8 grid grid-cols-1 sm:grid-cols-3 gap-8">
                {/* Member Sign line */}
                <div 
                  onClick={() => navigate('articles')}
                  className="group cursor-pointer space-y-2 text-left"
                >
                  <div className="text-[10px] font-sans font-extrabold uppercase text-brass tracking-wider">Executed By:</div>
                  <div className="font-serif italic text-base text-ink group-hover:text-brass transition-premium h-8 flex items-end">
                    Board Trustee
                  </div>
                  <div className="h-0.5 w-full bg-ink/20 group-hover:bg-brass transition-premium relative overflow-hidden">
                    <div className="absolute top-0 left-0 w-full h-full bg-brass -translate-x-full group-hover:translate-x-0 transition-all duration-500 ease-out" />
                  </div>
                  <div className="text-[9px] font-sans text-ink/50 group-hover:text-brass/70 transition-premium uppercase font-black tracking-widest flex justify-between">
                    <span>Articles Desk</span>
                    <span>Sign Here &rarr;</span>
                  </div>
                </div>

                {/* Chairman Sign line */}
                <div 
                  onClick={() => navigate('next-meeting')}
                  className="group cursor-pointer space-y-2 text-left"
                >
                  <div className="text-[10px] font-sans font-extrabold uppercase text-brass tracking-wider">Approved By:</div>
                  <div className="font-serif italic text-base text-ink group-hover:text-brass transition-premium h-8 flex items-end">
                    Board President & Chair
                  </div>
                  <div className="h-0.5 w-full bg-ink/20 group-hover:bg-brass transition-premium relative overflow-hidden">
                    <div className="absolute top-0 left-0 w-full h-full bg-brass -translate-x-full group-hover:translate-x-0 transition-all duration-500 ease-out" />
                  </div>
                  <div className="text-[9px] font-sans text-ink/50 group-hover:text-brass/70 transition-premium uppercase font-black tracking-widest flex justify-between">
                    <span>Meeting Desk</span>
                    <span>Sign Here &rarr;</span>
                  </div>
                </div>

                {/* President Sign line */}
                <div 
                  onClick={() => navigate('tools')}
                  className="group cursor-pointer space-y-2 text-left"
                >
                  <div className="text-[10px] font-sans font-extrabold uppercase text-brass tracking-wider">Certified By:</div>
                  <div className="font-serif italic text-base text-ink group-hover:text-brass transition-premium h-8 flex items-end">
                    CEO / Executive Director
                  </div>
                  <div className="h-0.5 w-full bg-ink/20 group-hover:bg-brass transition-premium relative overflow-hidden">
                    <div className="absolute top-0 left-0 w-full h-full bg-brass -translate-x-full group-hover:translate-x-0 transition-all duration-500 ease-out" />
                  </div>
                  <div className="text-[9px] font-sans text-ink/50 group-hover:text-brass/70 transition-premium uppercase font-black tracking-widest flex justify-between">
                    <span>Diagnostics Lab</span>
                    <span>Sign Here &rarr;</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* OPTION 7: Modern Corporate Magazine Overlap Grid */}
      <section className="py-20 bg-ink border-b border-brass/25 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-ink via-ink to-slate-brand/10 opacity-40 pointer-events-none" />
        <div className="absolute top-2 left-4 text-[9px] font-black tracking-widest text-brass uppercase select-none bg-brass/15 px-2 py-0.5 rounded border border-brass/25 z-20">Option 7: Modern Magazine Overlap Grid</div>
        
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-center pt-8 relative z-10">
          {/* Column A (Left: 01-02-03 Numbered Metrics) */}
          <div className="lg:col-span-3 space-y-8 text-left hidden lg:block">
            <div className="flex items-start gap-4">
              <span className="font-sans font-extrabold text-2xl text-brass/40 tracking-wider">01</span>
              <div>
                <h5 className="font-sans font-black uppercase text-[10px] tracking-widest text-white">Diligence</h5>
                <p className="font-sans text-[11px] text-paper/60 leading-normal">5-Day advance review cycle.</p>
              </div>
            </div>
            <div className="w-12 h-px bg-brass/20" />
            <div className="flex items-start gap-4">
              <span className="font-sans font-extrabold text-2xl text-brass/40 tracking-wider">02</span>
              <div>
                <h5 className="font-sans font-black uppercase text-[10px] tracking-widest text-white">Discipline</h5>
                <p className="font-sans text-[11px] text-paper/60 leading-normal">Operational chain boundaries.</p>
              </div>
            </div>
            <div className="w-12 h-px bg-brass/20" />
            <div className="flex items-start gap-4">
              <span className="font-sans font-extrabold text-2xl text-brass/40 tracking-wider">03</span>
              <div>
                <h5 className="font-sans font-black uppercase text-[10px] tracking-widest text-white">Direction</h5>
                <p className="font-sans text-[11px] text-paper/60 leading-normal">Tripartite standard alignment.</p>
              </div>
            </div>
          </div>

          {/* Column B (Center: Headline block) */}
          <div className="lg:col-span-5 text-left space-y-6">
            <span className="text-[10px] font-extrabold text-brass uppercase tracking-widest block">The Executive Contrast</span>
            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl text-white font-extrabold tracking-tight leading-tight">
              Many boards are active. <br />
              <span className="text-brass italic">Few are effective.</span>
            </h2>
            <p className="font-sans text-xs sm:text-sm text-paper/75 leading-relaxed">
              True board stewardship is defined by precision, not hours spent in committees. Select your specific leadership desk to run interactive diagnostic assessments and verify compliance with state and federal laws.
            </p>
          </div>

          {/* Column C (Right: Modern Floating Overlap Cards) */}
          <div className="lg:col-span-4 space-y-4">
            {/* Card 1 */}
            <div 
              onClick={() => navigate('articles')}
              className="bg-white/5 border border-white/10 rounded-xl p-5 hover:bg-white/10 hover:border-brass/50 transition-premium cursor-pointer group flex items-center justify-between text-left"
            >
              <div className="space-y-1">
                <span className="text-[9px] font-sans font-black text-brass uppercase tracking-widest">Masterclasses</span>
                <h4 className="font-serif font-bold text-sm text-white group-hover:text-brass transition-premium">For Board Members</h4>
              </div>
              <div className="w-8 h-8 rounded-full bg-white/5 group-hover:bg-brass group-hover:text-ink transition-premium flex items-center justify-center text-white text-xs">
                &rarr;
              </div>
            </div>

            {/* Card 2 */}
            <div 
              onClick={() => navigate('next-meeting')}
              className="bg-white/5 border border-white/10 rounded-xl p-5 hover:bg-white/10 hover:border-brass/50 transition-premium cursor-pointer group flex items-center justify-between text-left translate-x-0 lg:translate-x-4"
            >
              <div className="space-y-1">
                <span className="text-[9px] font-sans font-black text-brass uppercase tracking-widest">Meeting Prep</span>
                <h4 className="font-serif font-bold text-sm text-white group-hover:text-brass transition-premium">For Board Chairmen</h4>
              </div>
              <div className="w-8 h-8 rounded-full bg-white/5 group-hover:bg-brass group-hover:text-ink transition-premium flex items-center justify-center text-white text-xs">
                &rarr;
              </div>
            </div>

            {/* Card 3 */}
            <div 
              onClick={() => navigate('tools')}
              className="bg-white/5 border border-white/10 rounded-xl p-5 hover:bg-white/10 hover:border-brass/50 transition-premium cursor-pointer group flex items-center justify-between text-left"
            >
              <div className="space-y-1">
                <span className="text-[9px] font-sans font-black text-brass uppercase tracking-widest">Diagnostic Worksheets</span>
                <h4 className="font-serif font-bold text-sm text-white group-hover:text-brass transition-premium">For CEOs & Presidents</h4>
              </div>
              <div className="w-8 h-8 rounded-full bg-white/5 group-hover:bg-brass group-hover:text-ink transition-premium flex items-center justify-center text-white text-xs">
                &rarr;
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* --- END OF BRAINSTORMING BLOCKS --- */}

      {/* THREE JOBS OPTION 1: Symmetrical Triptych Grid */}
      <section className="py-20 bg-paper/40 px-4 sm:px-6 lg:px-8 border-b border-fog/85 relative">
        <div className="absolute top-2 left-4 text-[9px] font-black tracking-widest text-brass uppercase select-none bg-brass/10 px-2 py-0.5 rounded">Option 1: Symmetrical Triptych Grid</div>
        
        <div className="max-w-7xl mx-auto space-y-12 text-center pt-4">
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

      {/* THREE JOBS OPTION 2: Alternating Vertical Timeline Scroll */}
      <section className="py-24 bg-white border-b border-fog/80 px-4 sm:px-6 lg:px-8 relative">
        <div className="absolute top-2 left-4 text-[9px] font-black tracking-widest text-brass uppercase select-none bg-brass/10 px-2 py-0.5 rounded">Option 2: Alternating Vertical Timeline Scroll</div>
        
        <div className="max-w-5xl mx-auto pt-4 space-y-16 relative">
          <div className="text-center space-y-3">
            <span className="text-[10px] font-extrabold text-brass uppercase tracking-widest block">The Symmetrical Timeline</span>
            <h2 className="font-serif text-3xl sm:text-4xl text-ink font-bold tracking-tight">
              The Three Jobs of a Mature Board
            </h2>
            <p className="max-w-2xl mx-auto text-xs sm:text-sm text-ink/70">
              True governance flows chronologically from forward strategy, down to immediate operational safety protections, and finally back to rigorous audit checks.
            </p>
          </div>

          {/* Centered Timeline Axis (Desktop Only) */}
          <div className="relative lg:before:absolute lg:before:left-1/2 lg:before:top-4 lg:before:bottom-4 lg:before:w-0.5 lg:before:border-l-2 lg:before:border-dashed lg:before:border-brass/35 space-y-12 lg:space-y-4">
            
            {/* Item 1: Strategy (Left Side) */}
            <div className="grid grid-cols-1 lg:grid-cols-12 items-center relative">
              <div className="lg:col-span-5 text-left space-y-3 bg-paper/35 p-6 rounded-xl border border-fog/80 shadow-sm relative z-10">
                <span className="text-[10px] font-extrabold uppercase tracking-widest text-slate-brand">Job 1 &bull; 10-Year Outlook</span>
                <h4 className="font-serif font-bold text-lg text-ink">Strategy & Boundary Controls</h4>
                <p className="text-xs text-ink/70 leading-relaxed">
                  Establishing the organization's strategic contours, verifying programs strictly support your tax-exempt charter, and drafting forward-looking policies.
                </p>
                <div className="flex items-center gap-1.5 text-[10px] font-black text-slate-brand uppercase tracking-wider pt-1">
                  <Activity className="w-3.5 h-3.5 text-brass" />
                  <span>3-Year Planning & 40-40-20 Rule</span>
                </div>
              </div>
              {/* Center Timeline Node Indicator */}
              <div className="absolute left-1/2 -translate-x-1/2 w-8 h-8 rounded-full bg-brass/10 border border-brass text-brass items-center justify-center font-serif text-xs font-black z-20 hidden lg:flex">
                01
              </div>
              <div className="lg:col-span-7" />
            </div>

            {/* Item 2: Safety (Right Side) */}
            <div className="grid grid-cols-1 lg:grid-cols-12 items-center relative">
              <div className="lg:col-span-7" />
              {/* Center Timeline Node Indicator */}
              <div className="absolute left-1/2 -translate-x-1/2 w-8 h-8 rounded-full bg-copper/10 border border-copper text-copper items-center justify-center font-serif text-xs font-black z-20 hidden lg:flex">
                02
              </div>
              <div className="lg:col-span-5 text-left space-y-3 bg-paper/35 p-6 rounded-xl border border-fog/80 shadow-sm relative z-10 lg:text-left">
                <span className="text-[10px] font-extrabold uppercase tracking-widest text-copper block">Job 2 &bull; Risk Mitigation</span>
                <h4 className="font-serif font-bold text-lg text-ink">Operational Safety & Indemnity</h4>
                <p className="text-xs text-ink/70 leading-relaxed">
                  Protecting assets and volunteers. Conducting rigorous background Live Scan checks for staff and procuring tailored D&O liability protection with payroll safeguards.
                </p>
                <div className="flex items-center gap-1.5 text-[10px] font-black text-copper uppercase tracking-wider pt-1">
                  <ShieldCheck className="w-3.5 h-3.5 text-brass" />
                  <span>Background Verification Screens</span>
                </div>
              </div>
            </div>

            {/* Item 3: Audit (Left Side) */}
            <div className="grid grid-cols-1 lg:grid-cols-12 items-center relative">
              <div className="lg:col-span-5 text-left space-y-3 bg-paper/35 p-6 rounded-xl border border-fog/80 shadow-sm relative z-10">
                <span className="text-[10px] font-extrabold uppercase tracking-widest text-teal-brand">Job 3 &bull; Active Verification</span>
                <h4 className="font-serif font-bold text-lg text-ink">Financial Audit & Corporate Records</h4>
                <p className="text-xs text-ink/70 leading-relaxed">
                  Independent assessment. Scanning transactions for variances, auditing executive credit card ledger lines, and drafting defensive boardroom minutes.
                </p>
                <div className="flex items-center gap-1.5 text-[10px] font-black text-teal-brand uppercase tracking-wider pt-1">
                  <Scale className="w-3.5 h-3.5 text-brass" />
                  <span>Budget Deviation Worksheet Labs</span>
                </div>
              </div>
              {/* Center Timeline Node Indicator */}
              <div className="absolute left-1/2 -translate-x-1/2 w-8 h-8 rounded-full bg-teal-brand/10 border border-teal-brand text-teal-brand items-center justify-center font-serif text-xs font-black z-20 hidden lg:flex">
                03
              </div>
              <div className="lg:col-span-7" />
            </div>

          </div>
        </div>
      </section>

      {/* THREE JOBS OPTION 3: Large Numbered Editorial Columns */}
      <section className="py-20 bg-paper/30 border-b border-fog/85 px-4 sm:px-6 lg:px-8 relative">
        <div className="absolute top-2 left-4 text-[9px] font-black tracking-widest text-brass uppercase select-none bg-brass/10 px-2 py-0.5 rounded">Option 3: Large Numbered Editorial Columns</div>
        
        <div className="max-w-7xl mx-auto pt-4 space-y-14">
          <div className="text-left max-w-2xl space-y-3">
            <span className="text-[10px] font-extrabold text-brass uppercase tracking-widest block">Brochure Design Grid</span>
            <h2 className="font-serif text-3xl sm:text-4xl text-ink font-bold tracking-tight">
              The Three Jobs of a Mature Board
            </h2>
            <p className="font-sans text-xs sm:text-sm text-ink/75 leading-relaxed">
              Under California statutory parameters, trustees operate under a legal tripartite mandate. Move your boardroom away from passive rubber-stamping and into active stewardship.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 text-left">
            {/* Column 1 */}
            <div className="space-y-4">
              <span className="font-serif text-7xl lg:text-8xl font-light text-brass/25 select-none block leading-none">01</span>
              <div className="w-full h-px bg-brass/25" />
              <h3 className="font-serif font-bold text-xl text-ink pt-2">Strategy & Charter Protection</h3>
              <p className="text-xs text-ink/70 leading-relaxed font-medium">
                Looking ten years out. Establishing the organization's strategic contours, verifying that programs remain strictly aligned with your tax-exempt charter, and setting the initial budget boundaries.
              </p>
              <div className="space-y-1.5 text-[10.5px] font-black text-slate-brand uppercase tracking-wider pt-2">
                <div className="flex items-center gap-1.5">&rarr; 3-Year Planning Templates</div>
                <div className="flex items-center gap-1.5">&rarr; 40-40-20 Meeting Rules</div>
              </div>
            </div>

            {/* Column 2 */}
            <div className="space-y-4">
              <span className="font-serif text-7xl lg:text-8xl font-light text-brass/25 select-none block leading-none">02</span>
              <div className="w-full h-px bg-brass/25" />
              <h3 className="font-serif font-bold text-xl text-ink pt-2">Safety, Risk & Indemnity</h3>
              <p className="text-xs text-ink/70 leading-relaxed font-medium">
                Risk mitigation. Conducting background Live Scan audits for youth mentoring staff, procuring robust D&O insurance with employment practice riders, and implementing strict corporate controls.
              </p>
              <div className="space-y-1.5 text-[10.5px] font-black text-copper uppercase tracking-wider pt-2">
                <div className="flex items-center gap-1.5">&rarr; Background Verification Screens</div>
                <div className="flex items-center gap-1.5">&rarr; D&O Coverage Checklist</div>
              </div>
            </div>

            {/* Column 3 */}
            <div className="space-y-4">
              <span className="font-serif text-7xl lg:text-8xl font-light text-brass/25 select-none block leading-none">03</span>
              <div className="w-full h-px bg-brass/25" />
              <h3 className="font-serif font-bold text-xl text-ink pt-2">Audit, Inquiry & Verifications</h3>
              <p className="text-xs text-ink/70 leading-relaxed font-medium">
                Active verification. Scrutinizing ledger balances, reviewing the 10 largest budget deviations, auditing the CEO's credit card statements, and drafting defensive corporate minutes.
              </p>
              <div className="space-y-1.5 text-[10.5px] font-black text-teal-brand uppercase tracking-wider pt-2">
                <div className="flex items-center gap-1.5">&rarr; Budget Deviation Worksheet</div>
                <div className="flex items-center gap-1.5">&rarr; Audit Committee Setup Guides</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* THREE JOBS OPTION 4: Concentric Stewardship Shield (Interactive Ring) */}
      <section className="py-20 bg-white border-b border-fog/80 px-4 sm:px-6 lg:px-8 relative">
        <div className="absolute top-2 left-4 text-[9px] font-black tracking-widest text-brass uppercase select-none bg-brass/10 px-2 py-0.5 rounded">Option 4: Concentric Stewardship Shield</div>
        
        <div className="max-w-6xl mx-auto pt-4 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Column: Concentric Dial Diagram */}
          <div className="lg:col-span-5 flex flex-col items-center space-y-6">
            <span className="text-[10px] font-extrabold text-brass uppercase tracking-widest block text-center">Interactive Shield Rings</span>
            
            {/* Geometric Overlapping Circle Rings */}
            <div className="relative w-72 h-72 rounded-full flex items-center justify-center border-2 border-double border-brass/15 bg-paper/20">
              
              {/* Outer Strategy Ring */}
              <div 
                onMouseEnter={() => setActiveThreeJobsRing('strategy')}
                onClick={() => setActiveThreeJobsRing('strategy')}
                className={`absolute w-64 h-64 rounded-full border-2 transition-all duration-500 flex items-center justify-center cursor-pointer ${
                  activeThreeJobsRing === 'strategy'
                    ? 'border-brass scale-105 bg-brass/5 shadow-md ring-4 ring-brass/10'
                    : 'border-brass/20 bg-transparent hover:border-brass/45'
                }`}
              >
                <span className="absolute top-3 font-sans font-black text-[9px] tracking-widest text-brass uppercase select-none">I. Strategy Outer Ring</span>
              </div>

              {/* Middle Safety Ring */}
              <div 
                onMouseEnter={() => setActiveThreeJobsRing('safety')}
                onClick={() => setActiveThreeJobsRing('safety')}
                className={`absolute w-48 h-44 rounded-full border-2 transition-all duration-500 flex items-center justify-center cursor-pointer z-10 ${
                  activeThreeJobsRing === 'safety'
                    ? 'border-copper scale-105 bg-copper/5 shadow-md ring-4 ring-copper/10'
                    : 'border-copper/20 bg-transparent hover:border-copper/45'
                }`}
              >
                <span className="absolute top-3 font-sans font-black text-[9px] tracking-widest text-copper uppercase select-none">II. Safety Middle Ring</span>
              </div>

              {/* Inner Audit Ring */}
              <div 
                onMouseEnter={() => setActiveThreeJobsRing('audit')}
                onClick={() => setActiveThreeJobsRing('audit')}
                className={`absolute w-28 h-28 rounded-full border-2 transition-all duration-500 flex flex-col items-center justify-center cursor-pointer z-20 ${
                  activeThreeJobsRing === 'audit'
                    ? 'border-teal-brand scale-105 bg-teal-brand/5 shadow-md ring-4 ring-teal-brand/10'
                    : 'border-teal-brand/20 bg-transparent hover:border-teal-brand/45'
                }`}
              >
                <Scale className={`w-6 h-6 transition-premium ${activeThreeJobsRing === 'audit' ? 'text-teal-brand' : 'text-teal-brand/35'}`} />
                <span className="absolute bottom-2 font-sans font-black text-[8px] tracking-widest text-teal-brand uppercase select-none">III. Audit Core</span>
              </div>

            </div>
            
            <p className="text-[10px] font-bold text-ink/50 uppercase tracking-widest italic">Hover or click a ring segment to inspect</p>
          </div>

          {/* Right Column: Dynamic Description Panel */}
          <div className="lg:col-span-7 text-left space-y-6">
            <span className="text-[10px] font-black text-brass uppercase tracking-widest block">Interactive Diagnostic View</span>
            
            {activeThreeJobsRing === 'strategy' && (
              <div className="space-y-4 animate-fadeIn">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-slate-brand/10 text-slate-brand rounded-full flex items-center justify-center">
                    <Activity className="w-5 h-5" />
                  </div>
                  <h3 className="font-serif font-bold text-2xl text-ink">Ring I: Strategy & Charter Controls</h3>
                </div>
                <p className="font-sans text-xs sm:text-sm text-ink/75 leading-relaxed">
                  Looking ten years out. Governance operates first and foremost in defining the strategic direction of the nonprofit corporation. Board members must establish parameters, protect tax-exempt purposes, and analyze forward-looking objectives.
                </p>
                <div className="bg-paper border border-fog p-4 rounded-xl space-y-2">
                  <h5 className="font-serif font-bold text-xs text-ink">Strategy Core Deliverables:</h5>
                  <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs font-semibold text-ink/75">
                    <li className="flex items-center gap-1.5"><Check className="w-3.5 h-3.5 text-brass" /> 3-Year Strategic Outlines</li>
                    <li className="flex items-center gap-1.5"><Check className="w-3.5 h-3.5 text-brass" /> 40-40-20 Agenda Balancer</li>
                    <li className="flex items-center gap-1.5"><Check className="w-3.5 h-3.5 text-brass" /> Conflict of Interest Disclosures</li>
                    <li className="flex items-center gap-1.5"><Check className="w-3.5 h-3.5 text-brass" /> Executive Director Succession</li>
                  </ul>
                </div>
              </div>
            )}

            {activeThreeJobsRing === 'safety' && (
              <div className="space-y-4 animate-fadeIn">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-copper/10 text-copper rounded-full flex items-center justify-center">
                    <ShieldCheck className="w-5 h-5" />
                  </div>
                  <h3 className="font-serif font-bold text-2xl text-ink">Ring II: Safety, Risk & Indemnity</h3>
                </div>
                <p className="font-sans text-xs sm:text-sm text-ink/75 leading-relaxed">
                  Risk mitigation. Active oversight protecting directors and volunteers. Running regular regulatory Live Scan background reviews for employees, reviewing liability limits, and setting strict operational safeguards.
                </p>
                <div className="bg-paper border border-fog p-4 rounded-xl space-y-2">
                  <h5 className="font-serif font-bold text-xs text-ink">Safety Core Deliverables:</h5>
                  <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs font-semibold text-ink/75">
                    <li className="flex items-center gap-1.5"><Check className="w-3.5 h-3.5 text-copper" /> Live Scan Background Reviews</li>
                    <li className="flex items-center gap-1.5"><Check className="w-3.5 h-3.5 text-copper" /> D&O Liability Audit Checks</li>
                    <li className="flex items-center gap-1.5"><Check className="w-3.5 h-3.5 text-copper" /> Employee vs Independent Audits</li>
                    <li className="flex items-center gap-1.5"><Check className="w-3.5 h-3.5 text-copper" /> Payroll Tax Escrow Protections</li>
                  </ul>
                </div>
              </div>
            )}

            {activeThreeJobsRing === 'audit' && (
              <div className="space-y-4 animate-fadeIn">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-teal-brand/10 text-teal-brand rounded-full flex items-center justify-center">
                    <Scale className="w-5 h-5" />
                  </div>
                  <h3 className="font-serif font-bold text-2xl text-ink">Ring III: Financial Audit & Records Core</h3>
                </div>
                <p className="font-sans text-xs sm:text-sm text-ink/75 leading-relaxed">
                  Active verification. Fiduciaries are required to maintain deep inspection rights. Reviewing ledger balance changes, verifying credit card expenses, monitoring budget variances, and drafting bulletproof legal minutes.
                </p>
                <div className="bg-paper border border-fog p-4 rounded-xl space-y-2">
                  <h5 className="font-serif font-bold text-xs text-ink">Audit Core Deliverables:</h5>
                  <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs font-semibold text-ink/75">
                    <li className="flex items-center gap-1.5"><Check className="w-3.5 h-3.5 text-teal-brand" /> Ledger Deviation Worksheet Labs</li>
                    <li className="flex items-center gap-1.5"><Check className="w-3.5 h-3.5 text-teal-brand" /> Stand-alone Audit Committees</li>
                    <li className="flex items-center gap-1.5"><Check className="w-3.5 h-3.5 text-teal-brand" /> Executive Expense Oversight</li>
                    <li className="flex items-center gap-1.5"><Check className="w-3.5 h-3.5 text-teal-brand" /> Minutes Correction Sandboxes</li>
                  </ul>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* THREE JOBS OPTION 5: Dark Boardroom Executive Ledger */}
      <section className="py-24 bg-ink text-paper border-b border-brass/25 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
        <div className="absolute inset-0 opacity-[0.02] pointer-events-none bg-[radial-gradient(#C29A4A_1px,transparent_1px)] [background-size:16px_16px]" />
        <div className="absolute top-2 left-4 text-[9px] font-black tracking-widest text-brass uppercase select-none bg-brass/15 px-2 py-0.5 rounded border border-brass/25 z-20">Option 5: Dark Boardroom Executive Ledger</div>
        
        <div className="max-w-5xl mx-auto pt-4 space-y-12 relative z-10">
          <div className="space-y-3 text-left">
            <span className="text-[10px] font-extrabold text-brass uppercase tracking-widest block">Executive Ledger Format</span>
            <h2 className="font-serif text-3xl sm:text-4xl text-white font-bold tracking-tight">
              The Three Jobs of a Mature Board
            </h2>
            <p className="font-sans text-xs sm:text-sm text-paper/70 max-w-3xl leading-relaxed">
              stewardship is codified into law. Review our official executive ledger records detailing the precise corporate parameters, actions, and audit systems.
            </p>
          </div>

          {/* Ledger Table Row Blocks */}
          <div className="border border-brass/20 rounded-xl bg-black/10 divide-y divide-brass/15 text-left overflow-hidden">
            
            {/* Row 1: Strategy */}
            <div className="grid grid-cols-1 md:grid-cols-12 p-6 sm:p-8 gap-6 hover:bg-white/[0.02] transition-premium">
              <div className="md:col-span-3 space-y-2">
                <span className="font-sans font-black text-xs text-brass uppercase tracking-wider block">01 / Stewardship</span>
                <h4 className="font-serif font-bold text-xl text-white">Strategy & Direction</h4>
              </div>
              <div className="md:col-span-6 text-xs sm:text-sm text-paper/70 leading-relaxed font-sans">
                Reviewing ten-year corporate contours, aligning long-term growth outlines, verifying ongoing compliance with the articles of incorporation, and establishing clear operational boundaries.
              </div>
              <div className="md:col-span-3 flex flex-col justify-center space-y-1.5 text-[10px] font-extrabold uppercase tracking-widest text-brass md:text-right">
                <span>&bull; Strategic Outlines</span>
                <span>&bull; 40-40-20 Agenda Balancer</span>
              </div>
            </div>

            {/* Row 2: Safety */}
            <div className="grid grid-cols-1 md:grid-cols-12 p-6 sm:p-8 gap-6 hover:bg-white/[0.02] transition-premium">
              <div className="md:col-span-3 space-y-2">
                <span className="font-sans font-black text-xs text-brass uppercase tracking-wider block">02 / Stewardship</span>
                <h4 className="font-serif font-bold text-xl text-white">Safety & Risk Control</h4>
              </div>
              <div className="md:col-span-6 text-xs sm:text-sm text-paper/70 leading-relaxed font-sans">
                Implementing rigorous background checks for youth mentoring employees, reviewing comprehensive D&O indemnity liability coverage, and checking statutory payroll tax escrow accounts.
              </div>
              <div className="md:col-span-3 flex flex-col justify-center space-y-1.5 text-[10px] font-extrabold uppercase tracking-widest text-brass md:text-right">
                <span>&bull; Live Scan Background Checks</span>
                <span>&bull; D&O Liability Audits</span>
              </div>
            </div>

            {/* Row 3: Audit */}
            <div className="grid grid-cols-1 md:grid-cols-12 p-6 sm:p-8 gap-6 hover:bg-white/[0.02] transition-premium">
              <div className="md:col-span-3 space-y-2">
                <span className="font-sans font-black text-xs text-brass uppercase tracking-wider block">03 / Stewardship</span>
                <h4 className="font-serif font-bold text-xl text-white">Audit & Record Inquiry</h4>
              </div>
              <div className="md:col-span-6 text-xs sm:text-sm text-paper/70 leading-relaxed font-sans">
                Deploying interactive worksheets to audit transaction deviations, reviewing credit card lines, tracking self-dealing disclosures, and writing defensive corporate minutes.
              </div>
              <div className="md:col-span-3 flex flex-col justify-center space-y-1.5 text-[10px] font-extrabold uppercase tracking-widest text-brass md:text-right">
                <span>&bull; Deviation Ledger Worksheet</span>
                <span>&bull; Stand-alone Audit Committees</span>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* THREE JOBS OPTION 6: Tabbed Tactical Playbook Console */}
      <section className="py-20 bg-paper/30 border-b border-fog/80 px-4 sm:px-6 lg:px-8 relative">
        <div className="absolute top-2 left-4 text-[9px] font-black tracking-widest text-brass uppercase select-none bg-brass/10 px-2 py-0.5 rounded">Option 6: Tabbed Tactical Playbook Console</div>
        
        <div className="max-w-4xl mx-auto pt-4 space-y-8">
          <div className="text-center space-y-3">
            <span className="text-[10px] font-extrabold text-brass uppercase tracking-widest block">Interactive Playbook Hub</span>
            <h2 className="font-serif text-3xl sm:text-4xl text-ink font-bold tracking-tight">
              The Three Jobs of a Mature Board
            </h2>
            <p className="max-w-2xl mx-auto text-xs sm:text-sm text-ink/70">
              Click between our three tactical playbooks below to inspect required actions, statutory regulations, and red flag warnings.
            </p>
          </div>

          {/* Tab Selection */}
          <div className="bg-white border border-fog/80 p-1 rounded-xl flex max-w-lg mx-auto shadow-sm relative z-10">
            <button
              onClick={() => setActiveThreeJobsTab('strategy')}
              className={`flex-1 py-2 px-3 rounded-lg text-xs font-bold uppercase tracking-wider transition-premium cursor-pointer ${
                activeThreeJobsTab === 'strategy'
                  ? 'bg-slate-brand text-white shadow-sm'
                  : 'text-ink/60 hover:text-ink'
              }`}
            >
              1. Strategy
            </button>
            <button
              onClick={() => setActiveThreeJobsTab('safety')}
              className={`flex-1 py-2 px-3 rounded-lg text-xs font-bold uppercase tracking-wider transition-premium cursor-pointer ${
                activeThreeJobsTab === 'safety'
                  ? 'bg-copper text-white shadow-sm'
                  : 'text-ink/60 hover:text-ink'
              }`}
            >
              2. Safety
            </button>
            <button
              onClick={() => setActiveThreeJobsTab('audit')}
              className={`flex-1 py-2 px-3 rounded-lg text-xs font-bold uppercase tracking-wider transition-premium cursor-pointer ${
                activeThreeJobsTab === 'audit'
                  ? 'bg-teal-brand text-white shadow-sm'
                  : 'text-ink/60 hover:text-ink'
              }`}
            >
              3. Audit
            </button>
          </div>

          {/* Active Playbook Content Card */}
          <div className="bg-white border border-brass/20 rounded-xl p-8 shadow-md text-left space-y-6 relative z-10 animate-fadeIn">
            
            {activeThreeJobsTab === 'strategy' && (
              <>
                <div className="flex items-center gap-3 border-b border-fog/80 pb-4">
                  <div className="w-10 h-10 rounded-full bg-slate-brand/10 text-slate-brand flex items-center justify-center">
                    <Activity className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-[9px] font-black text-slate-brand uppercase tracking-widest block">Governance Core Playbook</span>
                    <h3 className="font-serif font-bold text-xl text-ink">Strategy Playbook</h3>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="space-y-1">
                    <h5 className="text-[10px] font-extrabold uppercase text-brass tracking-wider">The 10-Second Principle:</h5>
                    <p className="font-serif italic text-sm text-ink/80">
                      "Stewardship operates ten years out. The board's job is not running the organization's programs, but protecting its primary charter parameters and tax-exempt purpose."
                    </p>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-2">
                    <div className="space-y-2">
                      <h6 className="text-[10px] font-black uppercase text-slate-brand tracking-widest">Required Board Actions:</h6>
                      <ul className="space-y-1 text-xs text-ink/75 font-semibold">
                        <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-brass" /> Draft 3-Year Strategic Outlines</li>
                        <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-brass" /> Enforce 40-40-20 Agenda Balancer</li>
                        <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-brass" /> Secure Conflict Disclosures</li>
                      </ul>
                    </div>
                    <div className="space-y-2 p-3 bg-burgundy/5 border border-burgundy/10 rounded-lg">
                      <h6 className="text-[10px] font-black uppercase text-burgundy tracking-widest">Red Flag Indicators:</h6>
                      <ul className="space-y-1 text-[11px] text-ink/75 font-medium leading-normal">
                        <li>&bull; Directors handcrafting newsletters or program details</li>
                        <li>&bull; Bypassing the CEO's operational chain-of-command</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </>
            )}

            {activeThreeJobsTab === 'safety' && (
              <>
                <div className="flex items-center gap-3 border-b border-fog/80 pb-4">
                  <div className="w-10 h-10 rounded-full bg-copper/10 text-copper flex items-center justify-center">
                    <ShieldCheck className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-[9px] font-black text-copper uppercase tracking-widest block">Governance Core Playbook</span>
                    <h3 className="font-serif font-bold text-xl text-ink">Safety & Risk Playbook</h3>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="space-y-1">
                    <h5 className="text-[10px] font-extrabold uppercase text-brass tracking-wider">The 10-Second Principle:</h5>
                    <p className="font-serif italic text-sm text-ink/80">
                      "Stewardship means proactive protection. The board must shield its trustees, employees, assets, and vulnerable clients with robust background checks and deep D&O coverage."
                    </p>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-2">
                    <div className="space-y-2">
                      <h6 className="text-[10px] font-black uppercase text-copper tracking-widest">Required Board Actions:</h6>
                      <ul className="space-y-1 text-xs text-ink/75 font-semibold">
                        <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-brass" /> Run Live Scan background checks</li>
                        <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-brass" /> Audit D&O liability policy coverage</li>
                        <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-brass" /> Verify independent contractor classifications</li>
                      </ul>
                    </div>
                    <div className="space-y-2 p-3 bg-burgundy/5 border border-burgundy/10 rounded-lg">
                      <h6 className="text-[10px] font-black uppercase text-burgundy tracking-widest">Red Flag Indicators:</h6>
                      <ul className="space-y-1 text-[11px] text-ink/75 font-medium leading-normal">
                        <li>&bull; Handing kids' ministries over to unvetted staff</li>
                        <li>&bull; Lacking D&O insurance with employment riders</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </>
            )}

            {activeThreeJobsTab === 'audit' && (
              <>
                <div className="flex items-center gap-3 border-b border-fog/80 pb-4">
                  <div className="w-10 h-10 rounded-full bg-teal-brand/10 text-teal-brand flex items-center justify-center">
                    <Scale className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-[9px] font-black text-teal-brand uppercase tracking-widest block">Governance Core Playbook</span>
                    <h3 className="font-serif font-bold text-xl text-ink">Audit & Inquiry Playbook</h3>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="space-y-1">
                    <h5 className="text-[10px] font-extrabold uppercase text-brass tracking-wider">The 10-Second Principle:</h5>
                    <p className="font-serif italic text-sm text-ink/80">
                      "Stewardship is active verbiage and verifications. Under CA Nonprofit rules, boards must scrutinize ledgers, check credit card receipts, and document defensive boardroom minutes."
                    </p>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-2">
                    <div className="space-y-2">
                      <h6 className="text-[10px] font-black uppercase text-teal-brand tracking-widest">Required Board Actions:</h6>
                      <ul className="space-y-1 text-xs text-ink/75 font-semibold">
                        <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-brass" /> Run ledger deviation worksheets</li>
                        <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-brass" /> Build stand-alone Audit committees</li>
                        <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-brass" /> Write precise, certified resolution minutes</li>
                      </ul>
                    </div>
                    <div className="space-y-2 p-3 bg-burgundy/5 border border-burgundy/10 rounded-lg">
                      <h6 className="text-[10px] font-black uppercase text-burgundy tracking-widest">Red Flag Indicators:</h6>
                      <ul className="space-y-1 text-[11px] text-ink/75 font-medium leading-normal">
                        <li>&bull; Approving budgets with blind head nods</li>
                        <li>&bull; Recording resolutions with blank template files</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </>
            )}

          </div>
        </div>
      </section>

      {/* THREE JOBS OPTION 7: Symmetrical Geometric Hover Deck */}
      <section className="py-20 bg-white border-b border-fog/85 px-4 sm:px-6 lg:px-8 relative">
        <div className="absolute top-2 left-4 text-[9px] font-black tracking-widest text-brass uppercase select-none bg-brass/10 px-2 py-0.5 rounded">Option 7: Symmetrical Geometric Hover Deck</div>
        
        <div className="max-w-7xl mx-auto space-y-12 text-center pt-4">
          <div className="space-y-3">
            <span className="text-[10px] font-extrabold text-brass uppercase tracking-widest block">Asymmetrical Card Deck</span>
            <h2 className="font-serif text-3xl sm:text-4xl text-ink font-bold tracking-tight">
              The Three Jobs of a Mature Board
            </h2>
            <p className="max-w-2xl mx-auto text-xs sm:text-sm text-ink/70">
              Hover over each asymmetrical card below to watch its underlying geometric alignment border scale and rotate to absolute zero.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto text-left">
            {/* Card 1 */}
            <div className="relative group cursor-pointer p-8 rounded-xl bg-paper/20 border border-fog/80 shadow-sm h-72 flex flex-col justify-between overflow-hidden">
              {/* Slanted underlying frame border */}
              <div className="absolute inset-0 border-2 border-slate-brand/20 rounded-xl rotate-1 scale-95 group-hover:rotate-0 group-hover:scale-100 group-hover:border-slate-brand transition-all duration-300 pointer-events-none" />
              
              <div className="space-y-3 relative z-10">
                <span className="text-[9px] font-black text-slate-brand uppercase tracking-widest block">01 / Oversight Direction</span>
                <h4 className="font-serif font-bold text-xl text-ink">Strategy</h4>
                <p className="text-xs text-ink/70 leading-relaxed font-medium">
                  Reviewing strategic contours, protecting core legal charter purposes, setting budget outlines, and tracking structural goals.
                </p>
              </div>

              <span className="text-[10px] font-black text-slate-brand uppercase tracking-widest relative z-10 inline-flex items-center gap-1 group-hover:text-brass transition-premium">
                <span>Strategy Desk</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </span>
            </div>

            {/* Card 2 */}
            <div className="relative group cursor-pointer p-8 rounded-xl bg-paper/20 border border-fog/80 shadow-sm h-72 flex flex-col justify-between overflow-hidden">
              {/* Slanted underlying frame border */}
              <div className="absolute inset-0 border-2 border-copper/20 rounded-xl -rotate-1 scale-95 group-hover:rotate-0 group-hover:scale-100 group-hover:border-copper transition-all duration-300 pointer-events-none" />
              
              <div className="space-y-3 relative z-10">
                <span className="text-[9px] font-black text-copper uppercase tracking-widest block">02 / Asset Protections</span>
                <h4 className="font-serif font-bold text-xl text-ink">Safety</h4>
                <p className="text-xs text-ink/70 leading-relaxed font-medium">
                  Auditing background checks, securing tailored D&O liability insurance policies, and reviewing payroll escrow protections.
                </p>
              </div>

              <span className="text-[10px] font-black text-copper uppercase tracking-widest relative z-10 inline-flex items-center gap-1 group-hover:text-brass transition-premium">
                <span>Safety Desk</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </span>
            </div>

            {/* Card 3 */}
            <div className="relative group cursor-pointer p-8 rounded-xl bg-paper/20 border border-fog/80 shadow-sm h-72 flex flex-col justify-between overflow-hidden">
              {/* Slanted underlying frame border */}
              <div className="absolute inset-0 border-2 border-teal-brand/20 rounded-xl rotate-1 scale-95 group-hover:rotate-0 group-hover:scale-100 group-hover:border-teal-brand transition-all duration-300 pointer-events-none" />
              
              <div className="space-y-3 relative z-10">
                <span className="text-[9px] font-black text-teal-brand uppercase tracking-widest block">03 / Active Inquiry</span>
                <h4 className="font-serif font-bold text-xl text-ink">Audit</h4>
                <p className="text-xs text-ink/70 leading-relaxed font-medium">
                  Tracing transaction deviations with worksheet scanners, setting Audit Committees, and compiling defensive boardroom minutes.
                </p>
              </div>

              <span className="text-[10px] font-black text-teal-brand uppercase tracking-widest relative z-10 inline-flex items-center gap-1 group-hover:text-brass transition-premium">
                <span>Audit Desk</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Custom Boardroom Retreats & Corporate Facilitation */}
      <section className="py-20 bg-paper/60 border-b border-fog/85 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="bg-white rounded-2xl shadow-xl border border-brass/30 p-8 sm:p-12 relative overflow-hidden max-w-6xl mx-auto hover:shadow-2xl hover:border-brass transition-premium">
            <div className="absolute top-0 right-0 w-32 h-32 bg-brass/5 rounded-bl-full pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-24 h-24 bg-brass/5 rounded-tr-full pointer-events-none" />
            
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center relative z-10">
              {/* Left Column: Premium Pitch Checklist */}
              <div className="lg:col-span-7 space-y-6 text-left">
                <div className="inline-flex items-center gap-2 px-3 py-1 bg-brass/10 text-brass rounded-full text-xs font-semibold uppercase tracking-wider border border-brass/20">
                  <Users className="w-4 h-4" />
                  <span>Corporate Workshops & Facilitation</span>
                </div>
                
                <h2 className="font-serif text-3xl sm:text-4xl text-ink font-bold tracking-tight leading-tight">
                  Facilitated Board Retreats & <br />
                  <span className="text-brass italic">Custom Governance</span> Workshops
                </h2>
                
                <p className="font-sans text-sm sm:text-base text-ink/80 leading-relaxed">
                  Move beyond static checklists. NPO Lawyers design and deliver custom, on-site board training retreats and facilitated alignment sessions tailored for established charity and 501(c) organizations. Ensure your trustees operate in full compliance with state and federal fiduciary regulations.
                </p>
                
                {/* Responsive Checklist of Modular Deliverables */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                  <div className="flex items-start gap-3">
                    <div className="bg-brass/10 text-brass p-1 rounded mt-0.5 shrink-0 border border-brass/25">
                      <Check className="w-3.5 h-3.5" />
                    </div>
                    <div>
                      <h4 className="font-serif font-bold text-sm text-ink">Bylaws & Charter Audits</h4>
                      <p className="text-xs text-ink/65 font-medium leading-normal">Resolve obsolete corporate terms and align with recent CA Attorney General guidelines.</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-3">
                    <div className="bg-brass/10 text-brass p-1 rounded mt-0.5 shrink-0 border border-brass/25">
                      <Check className="w-3.5 h-3.5" />
                    </div>
                    <div>
                      <h4 className="font-serif font-bold text-sm text-ink">Compensation Safe Harbors</h4>
                      <p className="text-xs text-ink/65 font-medium leading-normal">Establish rebuttable presumption procedures and document salary comparability data under IRC § 4958.</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-3">
                    <div className="bg-brass/10 text-brass p-1 rounded mt-0.5 shrink-0 border border-brass/25">
                      <Check className="w-3.5 h-3.5" />
                    </div>
                    <div>
                      <h4 className="font-serif font-bold text-sm text-ink">Conflict of Interest Shields</h4>
                      <p className="text-xs text-ink/65 font-medium leading-normal">Structure safe-harbor board approvals for founder, director, and officer business transactions.</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-3">
                    <div className="bg-brass/10 text-brass p-1 rounded mt-0.5 shrink-0 border border-brass/25">
                      <Check className="w-3.5 h-3.5" />
                    </div>
                    <div>
                      <h4 className="font-serif font-bold text-sm text-ink">Governance Boundary Mapping</h4>
                      <p className="text-xs text-ink/65 font-medium leading-normal">Clarify executive team roles to prevent director micromanagement and build trust.</p>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Right Column: High-Converting Booking Desk */}
              <div className="lg:col-span-5 bg-paper/35 rounded-xl border border-brass/20 p-6 sm:p-8 shadow-inner text-left space-y-5">
                <div className="space-y-1">
                  <span className="text-[10px] font-extrabold text-brass uppercase tracking-widest block">Direct Board Engagement</span>
                  <h3 className="font-serif text-xl font-bold text-ink leading-tight">Request a Custom Workshop</h3>
                  <p className="text-xs text-ink/70 leading-relaxed font-sans font-medium">
                    Schedule a tailored 60-minute workshop, half-day alignment retreat, or confidential bylaws risk assessment facilitated by Myron Steeves, J.D.
                  </p>
                </div>
                
                <div className="space-y-3 pt-1">
                  <button
                    onClick={() => navigate('training')}
                    className="w-full inline-flex justify-center items-center gap-2 py-3 bg-brass hover:bg-ink hover:text-white text-ink font-bold uppercase tracking-wider text-xs rounded shadow transition-premium cursor-pointer"
                  >
                    <span>Request Custom Board Training</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                  
                  <a
                    href="https://NPOlawyers.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full inline-flex justify-center items-center gap-2 py-3 border border-brass hover:bg-brass/10 text-brass font-bold uppercase tracking-wider text-xs rounded transition-premium"
                  >
                    <span>Schedule Law Firm Consultation</span>
                    <ExternalLink className="w-4 h-4" />
                  </a>
                </div>
                
                <div className="pt-2 border-t border-brass/20">
                  <p className="text-[10px] text-ink/50 italic leading-normal font-sans font-medium text-center">
                    Educational training is provided for general informational purposes and does not constitute formal legal representation or establish attorney-client privilege.
                  </p>
                </div>
              </div>
            </div>
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

      {/* 5. Featured Classroom Scenarios & Masterclasses */}
      <section className="py-20 bg-white px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Left Column: The 40-40-20 Rule Highlighting */}
          <div className="lg:col-span-6 space-y-6 text-left">
            <div className="space-y-2">
              <h3 className="font-serif font-extrabold text-2xl sm:text-3xl text-ink tracking-wide">
                The 40-40-20 Rule Standard
              </h3>
              <p className="text-xs sm:text-sm text-ink/60">
                A battle-tested agenda paradigm designed by nonprofit attorneys to optimize boardroom time.
              </p>
            </div>

            <div className="bg-paper border border-brass/30 p-6 sm:p-8 rounded-xl space-y-6 shadow-sm hover:shadow-md transition-premium relative overflow-hidden flex flex-col justify-between h-[360px]">
              <div className="absolute top-0 right-0 w-24 h-24 bg-brass/5 rounded-bl-full pointer-events-none" />
              
              <div className="space-y-4">
                <div className="flex items-center gap-2 justify-between flex-wrap">
                  <span className="text-[10px] font-extrabold text-brass uppercase bg-brass/10 px-2.5 py-0.5 rounded border border-brass/20">
                    Fiduciary Time Standard
                  </span>
                  <span className="text-xs text-slate-brand font-bold">Duty of Care</span>
                </div>

                <div className="space-y-1.5">
                  <h4 className="font-serif font-bold text-xl text-ink leading-tight">
                    Stop Reading Slides. <br />
                    <span className="text-brass italic">Start Governing.</span>
                  </h4>
                  <p className="text-xs text-ink/75 leading-relaxed font-sans font-medium">
                    Many boards waste 80% of meetings listening to dry executive slide read-outs. The 40-40-20 standard structuralizes meetings to focus on active forward strategy and strict compliance risk auditing.
                  </p>
                </div>

                {/* Graphical Segmented Bar */}
                <div className="space-y-2">
                  <div className="w-full bg-fog rounded-lg h-4 overflow-hidden flex font-sans text-[9px] font-black text-white text-center tracking-wider uppercase shadow-inner select-none">
                    <div className="bg-slate-brand h-full flex items-center justify-center transition-all duration-500" style={{ width: '40%' }} title="40% Pre-Meeting Prep">
                      40% Prep
                    </div>
                    <div className="bg-teal-brand h-full flex items-center justify-center transition-all duration-500" style={{ width: '40%' }} title="40% Active Q&A">
                      40% Q&A
                    </div>
                    <div className="bg-burgundy h-full flex items-center justify-center transition-all duration-500" style={{ width: '20%' }} title="20% Strategy/Audit">
                      20% Risk
                    </div>
                  </div>
                  
                  {/* Rule Segment Explanations */}
                  <div className="grid grid-cols-3 gap-3 text-left font-sans">
                    <div className="space-y-0.5">
                      <span className="block text-[9px] font-extrabold text-slate-brand uppercase tracking-wider">40% Pre-Meeting</span>
                      <p className="text-[9px] text-ink/65 font-semibold leading-snug">Packets delivered 5 days prior. Directors study papers.</p>
                    </div>
                    <div className="space-y-0.5">
                      <span className="block text-[9px] font-extrabold text-teal-brand uppercase tracking-wider">40% Active Q&A</span>
                      <p className="text-[9px] text-ink/65 font-semibold leading-snug">Zero slides. Direct dialog testing report variables.</p>
                    </div>
                    <div className="space-y-0.5">
                      <span className="block text-[9px] font-extrabold text-burgundy uppercase tracking-wider">20% Future Risk</span>
                      <p className="text-[9px] text-ink/65 font-semibold leading-snug">Strategic goals, charter checks, and compliance audits.</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="pt-3 border-t border-brass/15 flex items-center justify-between">
                <span className="text-[11px] text-brass italic font-medium">Balancer Tool Included</span>
                <button 
                  onClick={() => navigate('next-meeting')}
                  className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-slate-brand hover:text-brass transition-premium"
                >
                  <span>Use Agenda Balancer</span>
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>
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
