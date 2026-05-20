import React, { useState } from 'react';
import { useRouter } from '../components/Router';
import { Layout } from '../components/Layout';
import { Landmark, ArrowRight, ShieldCheck, Scale, FileText, CheckCircle2, ChevronRight, Activity, Zap } from 'lucide-react';
import { articles } from '../data/articles';
import { scenarios } from '../data/scenarios';

export const Home: React.FC = () => {
  const { navigate } = useRouter();
  const [selectedProblem, setSelectedProblem] = useState('');

  // Sourced from real scenarios and rules
  const boardroomProblems = [
    { label: "The Founder Demands the Board Approve Her Salary", target: "scenario/founder-salary-conflict" },
    { label: "A Director Starts Micromanaging Staff Between Meetings", target: "scenario/director-micromanaging-staff" },
    { label: "The Treasurer Presents Vague Financial Reports", target: "scenario/treasurer-vague-financials" },
    { label: "The Board Discovers Missing Receipts and Cash Variances", target: "scenario/missing-receipts-variance" },
    { label: "A Donor Restricts a Major Gift After the Money is Spent", target: "scenario/donor-restricted-gift-crisis" },
    { label: "A Youth Program Fails to Implement Abuse-Prevention Policies", target: "scenario/youth-safety-compliance-failure" },
    { label: "We need to check if we require an independent audit ($2M threshold)", target: "california-board-rules" },
    { label: "We need to check our Board's overall governance maturity", target: "tools/self-assessment" },
  ];

  const handleProblemSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (selectedProblem) {
      navigate(selectedProblem);
    }
  };

  return (
    <Layout>
      {/* 1. Hero Section: Premium Courtroom/Editorial Aesthetics */}
      <section className="relative overflow-hidden bg-ink text-paper py-20 px-4 sm:px-6 lg:px-8 border-b border-brass/30">
        {/* Background Subtle Corinthian Overlay */}
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
          
          {/* Hero Visual Block (Premium Embossed Boardroom Ledger Concept) */}
          <div className="lg:col-span-5 flex justify-center">
            <div className="bg-white/5 border border-brass/20 rounded-2xl p-8 max-w-sm w-full shadow-2xl relative overflow-hidden group">
              <div className="absolute top-0 right-0 w-32 h-32 bg-brass/5 rounded-bl-full -mr-8 -mt-8 group-hover:bg-brass/10 transition-premium" />
              <div className="space-y-6 text-left">
                <div className="w-12 h-12 bg-brass/15 rounded-lg border border-brass/30 flex items-center justify-center text-brass shadow-md">
                  <Landmark className="w-6 h-6" />
                </div>
                <div className="space-y-2">
                  <h3 className="font-serif font-bold text-xl text-white tracking-wide">The Boardroom Ledger</h3>
                  <p className="text-xs text-paper/60 leading-relaxed font-sans">
                    A collection of 12 Masterclasses and 6 real-world boardroom scenarios, fully mapped to California Attorney General guidelines and IRS Section 501(c)(3) safe harbor requirements.
                  </p>
                </div>
                <div className="pt-4 border-t border-paper/10 flex items-center justify-between text-xs font-bold text-brass uppercase tracking-wider">
                  <span>100% Static-Compatible</span>
                  <span>v4.0.0</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. Boardroom Problem Picker Section */}
      <section className="py-12 bg-white border-b border-fog/80 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <div className="bg-paper border border-brass/30 rounded-xl p-6 sm:p-8 shadow-md">
            <form onSubmit={handleProblemSubmit} className="space-y-4 text-left">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div className="space-y-1">
                  <h3 className="font-serif font-extrabold text-lg sm:text-xl text-ink tracking-wide flex items-center gap-2">
                    <Zap className="w-5 h-5 text-brass" />
                    Boardroom Problem Picker
                  </h3>
                  <p className="text-xs text-ink/65 font-sans">
                    Select a high-stakes challenge your board is currently facing to jump directly to a verified guideline.
                  </p>
                </div>
                <div className="flex-grow max-w-md w-full">
                  <select
                    value={selectedProblem}
                    onChange={(e) => setSelectedProblem(e.target.value)}
                    className="w-full bg-white text-ink text-sm font-semibold p-3.5 rounded border border-brass/40 shadow-sm focus:outline-none focus:ring-2 focus:ring-brass focus:border-transparent transition-premium"
                  >
                    <option value="">-- Choose a Classroom Scenario or Rule --</option>
                    {boardroomProblems.map((prob, idx) => (
                      <option key={idx} value={prob.target}>{prob.label}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <button
                    type="submit"
                    disabled={!selectedProblem}
                    className={`w-full md:w-auto inline-flex justify-center items-center gap-2 px-6 py-3.5 text-xs font-bold uppercase tracking-wider rounded shadow transition-premium ${
                      selectedProblem 
                        ? 'bg-brass text-ink hover:bg-ink hover:text-white cursor-pointer' 
                        : 'bg-fog text-ink/30 cursor-not-allowed'
                    }`}
                  >
                    <span>Resolve Now</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </form>
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

      {/* 3. The Three Jobs of the Board Grid */}
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

      {/* 4. Featured Classroom Scenarios & Masterclasses */}
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

            {/* Pull the first scenario details */}
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

      {/* 5. The Active Labs CTA Row */}
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
