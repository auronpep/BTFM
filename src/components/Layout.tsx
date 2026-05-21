import React, { useState, useEffect } from 'react';
import { useRouter } from './Router';
import { Menu, X, Landmark, ExternalLink, ShieldCheck, ChevronRight, GraduationCap, Search } from 'lucide-react';
import { articles } from '../data/articles';
import { scenarios } from '../data/scenarios';

interface LayoutProps {
  children: React.ReactNode;
}

export const Layout: React.FC<LayoutProps> = ({ children }) => {
  const { path, navigate } = useRouter();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [toolsState, setToolsState] = useState<'none' | 'in-progress' | 'completed'>('none');
  const [isToolsHovered, setIsToolsHovered] = useState(false);
  
  // Search state
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const [labStates, setLabStates] = useState({
    self: { started: false, completed: false, text: 'Not Started' },
    packet: { started: false, completed: false, count: 0, text: 'Not Started' },
    minutes: { started: false, completed: false, text: 'Not Started' },
    budget: { started: false, completed: false, count: 0, text: 'Not Started' },
    authority: { started: false, completed: false, text: 'Not Started' }
  });

  useEffect(() => {
    try {
      const selfAssessment = localStorage.getItem('cdx_self_assessment_score') !== null;
      
      let packetCount = 0;
      const packetSaved = localStorage.getItem('cdx_board_packet_uncovered_flags');
      if (packetSaved) {
        packetCount = JSON.parse(packetSaved).length || 0;
      }
      
      const minutesGrade = localStorage.getItem('cdx_minutes_scorecard_grade') !== null;
      
      let budgetCount = 0;
      const budgetSaved = localStorage.getItem('cdx_budget_audited_lines');
      if (budgetSaved) {
        budgetCount = JSON.parse(budgetSaved).length || 0;
      }
      
      let authCount = 0;
      const authSaved = localStorage.getItem('cdx_authority_map_assignments');
      if (authSaved) {
        authCount = Object.keys(JSON.parse(authSaved)).length || 0;
      }
      
      const completedSelf = selfAssessment;
      const completedPacket = packetCount === 9;
      const completedMinutes = minutesGrade;
      const completedBudget = budgetCount === 6;
      const completedAuth = localStorage.getItem('cdx_authority_map_score') !== null;

      const anyIncompleteAndStarted = 
        (packetCount > 0 && packetCount < 9) || 
        (budgetCount > 0 && budgetCount < 6) || 
        (authCount > 0 && !completedAuth);
        
      const anyCompleted = completedSelf || completedPacket || completedMinutes || completedBudget || completedAuth;
      const allCompleted = completedSelf && completedPacket && completedMinutes && completedBudget && completedAuth;

      if (allCompleted) {
        setToolsState('completed');
      } else if (anyCompleted || anyIncompleteAndStarted) {
        setToolsState('in-progress');
      } else {
        setToolsState('none');
      }

      setLabStates({
        self: { started: completedSelf, completed: completedSelf, text: completedSelf ? 'Completed ✓' : 'Not Started' },
        packet: { started: packetCount > 0, completed: completedPacket, count: packetCount, text: completedPacket ? 'Completed ✓' : (packetCount > 0 ? `In Progress (${packetCount}/9)` : 'Not Started') },
        minutes: { started: completedMinutes, completed: completedMinutes, text: completedMinutes ? 'Completed ✓' : 'Not Started' },
        budget: { started: budgetCount > 0, completed: completedBudget, count: budgetCount, text: completedBudget ? 'Completed ✓' : (budgetCount > 0 ? `In Progress (${budgetCount}/6)` : 'Not Started') },
        authority: { started: authCount > 0 || completedAuth, completed: completedAuth, text: completedAuth ? 'Completed ✓' : (authCount > 0 ? 'In Progress' : 'Not Started') }
      });
    } catch (e) {
      console.error(e);
    }
  }, [path]);

  // Global search keyboard trigger
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      const activeElement = document.activeElement;
      const isInput = activeElement && (
        activeElement.tagName === 'INPUT' || 
        activeElement.tagName === 'TEXTAREA' || 
        (activeElement as HTMLElement).isContentEditable
      );
      
      if ((e.key === 'k' && (e.ctrlKey || e.metaKey)) || (e.key === '/' && !isInput)) {
        e.preventDefault();
        setIsSearchOpen(true);
      }
      
      if (e.key === 'Escape') {
        setIsSearchOpen(false);
      }
    };
    
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Situational/Topic Navigation configuration
  const navItems = [
    { label: 'Next Meeting', target: 'next-meeting', bg: 'hover:border-slate-brand' },
    { label: 'Money & Audit', target: 'money-audit', bg: 'hover:border-teal-brand' },
    { label: 'Executive Oversight', target: 'executive-oversight', bg: 'hover:border-slate-brand' },
    { label: 'Risk & Safety', target: 'risk-safety', bg: 'hover:border-copper' },
    { label: 'Minutes & Records', target: 'minutes-records', bg: 'hover:border-slate-brand' },
    { label: 'California Board Rules', target: 'california-board-rules', bg: 'hover:border-brass' },
    { label: 'Tools', target: 'tools', bg: 'hover:border-teal-brand' },
    { label: 'Training', target: 'training', bg: 'hover:border-brass' },
    { label: 'Boards 101', target: 'boards-101', bg: 'hover:border-brass' },
    { label: 'About Us', target: 'about-us', bg: 'hover:border-slate-brand' },
  ];

  const handleNavClick = (target: string) => {
    navigate(target);
    setMobileMenuOpen(false);
  };

  const isActive = (target: string) => {
    if (target === 'tools' && path.startsWith('tools/')) return true;
    return path === target;
  };

  return (
    <div className="min-h-screen flex flex-col bg-paper text-ink selection:bg-brass selection:text-ink font-sans transition-premium antialiased">
      {/* Upper Micro-Trust Header Banner */}
      <div className="bg-ink text-paper py-1.5 px-4 text-xs tracking-wider border-b border-brass/20">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row justify-between items-center gap-1">
          <div className="flex items-center gap-1.5 font-medium text-paper/85">
            <ShieldCheck className="w-3.5 h-3.5 text-brass" />
            <span>Fiduciary Reference & Boardroom Training Manual</span>
          </div>
          <a
            href="https://NPOlawyers.com"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1 text-brass hover:text-paper hover:underline transition-premium font-semibold uppercase text-[10px] tracking-widest"
          >
            <span>Published by California Center for Nonprofit Law (NPOlawyers.com)</span>
            <ExternalLink className="w-2.5 h-2.5" />
          </a>
        </div>
      </div>

      {/* Main Sticky Header */}
      <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-md shadow-sm border-b border-fog/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            {/* Logo Brand Area (Editorial Corinthian Column Aesthetics) */}
            <div 
              onClick={() => handleNavClick('home')} 
              className="flex items-center gap-3 cursor-pointer group py-2"
            >
              <div className="bg-ink hover:bg-slate-brand text-brass p-2.5 rounded-lg border border-brass/30 transition-premium shadow-md">
                <Landmark className="w-6 h-6" />
              </div>
              <div className="flex flex-col select-none">
                <span className="font-serif italic text-base sm:text-lg text-slate-brand font-semibold leading-tight tracking-wide group-hover:text-ink transition-premium">
                  The Principles of
                </span>
                <span className="font-sans font-extrabold text-sm sm:text-base text-brass tracking-[0.18em] uppercase leading-none mt-0.5">
                  BOARD TRAINING
                </span>
              </div>
            </div>

            {/* Desktop Full Navigation */}
            <nav className="hidden lg:flex items-center gap-1.5">
              {navItems.map((item) => {
                const active = isActive(item.target);
                const isTools = item.target === 'tools';
                
                if (isTools) {
                  return (
                    <div 
                      key={item.target}
                      className="relative"
                      onMouseEnter={() => setIsToolsHovered(true)}
                      onMouseLeave={() => setIsToolsHovered(false)}
                    >
                      <button
                        onClick={() => handleNavClick(item.target)}
                        className={`px-3 py-2 text-xs font-semibold uppercase tracking-wider rounded border-b-2 border-transparent transition-premium focus-visible:outline-2 focus-visible:outline-brass flex items-center gap-1 relative ${
                          active 
                            ? 'border-brass text-brass bg-paper/50 font-bold' 
                            : 'text-ink/75 hover:text-ink hover:bg-fog/30'
                        }`}
                      >
                        <span>{item.label}</span>
                        {toolsState === 'in-progress' && (
                          <span className="w-1.5 h-1.5 bg-amber-500 rounded-full animate-pulse inline-block" title="Laboratory in progress" />
                        )}
                        {toolsState === 'completed' && (
                          <span className="text-[10px] text-teal-brand font-bold inline-block" title="All Laboratories Completed">✓</span>
                        )}
                      </button>
                      
                      {isToolsHovered && (
                        <div className="absolute top-full left-1/2 -translate-x-1/2 pt-2 z-50 w-72">
                          <div className="bg-white border-2 border-brass rounded-lg shadow-xl p-4 text-left">
                            <h4 className="font-serif italic text-sm text-ink border-b border-fog pb-2 mb-2 flex items-center justify-between">
                              <span>Lab Progress</span>
                              <span className="text-[10px] font-sans font-bold uppercase tracking-wider bg-brass/10 text-brass px-1.5 py-0.5 rounded">
                                {[labStates.self, labStates.packet, labStates.minutes, labStates.budget, labStates.authority].filter(l => l.completed).length} / 5 Done
                              </span>
                            </h4>
                            
                            <div className="space-y-1.5">
                              {[
                                { name: "Board Self-Assessment", state: labStates.self, path: "tools/self-assessment" },
                                { name: "Board Packet Audit Lab", state: labStates.packet, path: "tools/board-packet-lab" },
                                { name: "Minutes Quality Scorecard", state: labStates.minutes, path: "tools/minutes-scorecard" },
                                { name: "Budget Worksheet", state: labStates.budget, path: "tools/budget-worksheet" },
                                { name: "Board Authority Map", state: labStates.authority, path: "tools/authority-map" }
                              ].map((lab) => (
                                <button
                                  key={lab.path}
                                  onClick={() => handleNavClick(lab.path)}
                                  className="w-full text-left p-1.5 rounded hover:bg-paper transition-premium flex items-center justify-between group/item"
                                >
                                  <span className="text-[11px] font-medium text-ink/80 group-hover/item:text-brass transition-premium truncate">
                                    {lab.name}
                                  </span>
                                  <span className={`text-[9px] font-bold shrink-0 px-1.5 py-0.5 rounded ${
                                    lab.state.completed 
                                      ? 'bg-teal-500/10 text-teal-700' 
                                      : (lab.state.started ? 'bg-amber-500/10 text-amber-700' : 'bg-gray-100 text-ink/40')
                                  }`}>
                                    {lab.state.completed ? '✓ Done' : (lab.state.started ? 'Started' : 'Not Started')}
                                  </span>
                                </button>
                              ))}
                            </div>
                            
                            <div className="mt-3 pt-2 border-t border-fog">
                              <div className="w-full bg-fog rounded-full h-1.5 overflow-hidden">
                                <div 
                                  className="bg-brass h-1.5 transition-all duration-500"
                                  style={{ width: `${([labStates.self, labStates.packet, labStates.minutes, labStates.budget, labStates.authority].filter(l => l.completed).length / 5) * 100}%` }}
                                />
                              </div>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  );
                }

                return (
                  <button
                    key={item.target}
                    onClick={() => handleNavClick(item.target)}
                    className={`px-3 py-2 text-xs font-semibold uppercase tracking-wider rounded border-b-2 border-transparent transition-premium focus-visible:outline-2 focus-visible:outline-brass flex items-center gap-1 relative ${
                      active 
                        ? 'border-brass text-brass bg-paper/50 font-bold' 
                        : 'text-ink/75 hover:text-ink hover:bg-fog/30'
                    }`}
                  >
                    <span>{item.label}</span>
                  </button>
                );
              })}
              
              <button
                onClick={() => setIsSearchOpen(true)}
                className="p-2 text-ink/75 hover:text-brass transition-premium rounded flex items-center gap-1 cursor-pointer"
                title="Search (Ctrl+K or /)"
              >
                <Search className="w-4 h-4 text-ink/70 hover:text-brass" />
                <span className="text-[9px] font-sans font-bold text-ink/30 bg-fog px-1 py-0.5 rounded border border-fog-dark/10">⌘K</span>
              </button>
              
              <div className="h-6 w-[1px] bg-fog/80 mx-2" />
              
              <a
                href="https://NPOlawyers.com"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-4 py-2.5 bg-slate-brand hover:bg-ink text-white text-xs font-bold uppercase tracking-wider rounded shadow transition-premium cursor-pointer"
              >
                <span>NPO Lawyers</span>
                <ExternalLink className="w-3 h-3 text-brass" />
              </a>
            </nav>

            {/* Mobile Menu Toggle Button */}
            <div className="flex lg:hidden items-center gap-2">
              <a
                href="https://NPOlawyers.com"
                target="_blank"
                rel="noopener noreferrer"
                className="px-3 py-2 bg-slate-brand text-white text-[10px] font-bold uppercase tracking-wider rounded"
              >
                CCNL
              </a>
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="p-2 text-ink hover:text-brass transition-premium rounded"
                aria-label="Toggle menu"
              >
                {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Navigation Drawer */}
        {mobileMenuOpen && (
          <div className="lg:hidden bg-white border-b border-fog/80 animate-fade-in">
            <div className="px-4 pt-2 pb-6 space-y-1">
              <div className="text-[10px] font-bold text-ink/40 uppercase tracking-widest pb-1 border-b border-fog/40 mb-2">
                Governance Areas
              </div>
              {navItems.map((item) => {
                const active = isActive(item.target);
                const isTools = item.target === 'tools';
                return (
                  <button
                    key={item.target}
                    onClick={() => handleNavClick(item.target)}
                    className={`w-full text-left px-4 py-3 text-sm font-medium rounded transition-premium flex justify-between items-center ${
                      active
                        ? 'bg-paper text-brass border-l-4 border-brass font-bold'
                        : 'text-ink hover:bg-paper/50'
                    }`}
                  >
                    <span className="flex items-center gap-1.5">
                      <span>{item.label}</span>
                      {isTools && toolsState === 'in-progress' && (
                        <span className="w-1.5 h-1.5 bg-amber-500 rounded-full animate-pulse inline-block" />
                      )}
                      {isTools && toolsState === 'completed' && (
                        <span className="text-[10px] text-teal-brand font-bold inline-block">✓</span>
                      )}
                    </span>
                    <ChevronRight className={`w-4 h-4 ${active ? 'text-brass' : 'text-ink/20'}`} />
                  </button>
                );
              })}
              
              <div className="pt-4 border-t border-fog/50 mt-4">
                <a
                  href="https://NPOlawyers.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full flex items-center justify-between px-4 py-3 bg-ink hover:bg-slate-brand text-brass text-sm font-bold uppercase tracking-wider rounded shadow transition-premium"
                >
                  <span>Visit NPOlawyers.com</span>
                  <ExternalLink className="w-4 h-4" />
                </a>
              </div>
            </div>
          </div>
        )}
      </header>

      {/* Main Content Area */}
      <main className="flex-grow">
        {children}
      </main>

      {/* Corporate Referral Pitch Box */}
      <section className="bg-ink border-t border-brass/20 py-12 px-4 sm:px-6 lg:px-8 text-paper text-center">
        <div className="max-w-3xl mx-auto space-y-5">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-brass/15 text-brass rounded-full text-xs font-semibold uppercase tracking-wider border border-brass/20">
            <GraduationCap className="w-4 h-4" />
            <span>California Center for Nonprofit Law</span>
          </div>
          <h2 className="font-serif text-2xl sm:text-3xl text-white tracking-wide leading-tight">
            Need Direct Counsel for Your Board of Directors?
          </h2>
          <p className="text-paper/80 font-sans text-sm sm:text-base leading-relaxed">
            While this training website is an excellent reference manual, it is not a substitute for counsel. The attorneys at NPO Lawyers assist California nonprofits with bylaws audits, executive compensation reviews, conflict-of-interest structures, corporate restructurings, and regulatory compliance.
          </p>
          <div className="pt-3 flex flex-col sm:flex-row justify-center items-center gap-4">
            <a
              href="https://NPOlawyers.com"
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto inline-flex justify-center items-center gap-2 px-6 py-3 bg-brass hover:bg-white hover:text-ink text-ink font-bold uppercase tracking-wider text-xs rounded shadow transition-premium cursor-pointer"
            >
              <span>Schedule Board Counsel Audit</span>
              <ExternalLink className="w-4 h-4" />
            </a>
            <button
              onClick={() => navigate('training')}
              className="w-full sm:w-auto px-6 py-3 border border-paper/40 hover:border-brass text-paper hover:text-brass text-xs font-bold uppercase tracking-wider rounded transition-premium"
            >
              Request Custom Board Training
            </button>
          </div>
        </div>
      </section>

      {/* Professional Editorial Footer & Official Legal Disclaimer */}
      <footer className="bg-ink border-t border-brass/10 py-10 px-4 sm:px-6 lg:px-8 text-xs text-paper/60 font-sans">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6 pb-8 border-b border-paper/10">
          <div className="flex items-center gap-3">
            <div className="bg-paper/5 text-brass p-2 rounded border border-brass/20">
              <Landmark className="w-5 h-5" />
            </div>
            <div className="flex flex-col">
              <span className="font-serif italic font-semibold text-paper/90 text-sm">The Principles of Board Training</span>
              <span className="text-[9px] uppercase tracking-widest text-brass font-bold mt-0.5">California Nonprofit Governance</span>
            </div>
          </div>
          
          <div className="flex flex-wrap justify-center gap-x-6 gap-y-2 font-medium">
            <button onClick={() => handleNavClick('home')} className="hover:text-brass hover:underline transition-premium text-[11px] uppercase tracking-wider">Home</button>
            <button onClick={() => handleNavClick('next-meeting')} className="hover:text-brass hover:underline transition-premium text-[11px] uppercase tracking-wider">Next Meeting</button>
            <button onClick={() => handleNavClick('california-board-rules')} className="hover:text-brass hover:underline transition-premium text-[11px] uppercase tracking-wider">California Rules</button>
            <button onClick={() => handleNavClick('tools')} className="hover:text-brass hover:underline transition-premium text-[11px] uppercase tracking-wider">Tools & Labs</button>
            <button onClick={() => handleNavClick('training')} className="hover:text-brass hover:underline transition-premium text-[11px] uppercase tracking-wider">Training</button>
          </div>
        </div>

        <div className="max-w-7xl mx-auto pt-8 flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6">
          {/* CRITICAL LEGAL DISCLAIMER - MUST MATCH EXACT MANDATED TEXT */}
          <div className="max-w-4xl text-left space-y-2">
            <p className="font-bold text-[10px] text-brass uppercase tracking-wider">OFFICIAL EDUCATIONAL DISCLAIMER</p>
            <p className="leading-relaxed text-[11px] text-paper/70 font-medium">
              This site provides general educational information for nonprofit boards. It is not legal advice and does not create an attorney-client relationship. For legal advice about a specific organization or situation, contact qualified counsel.
            </p>
          </div>

          <div className="text-left lg:text-right shrink-0">
            <p className="text-paper/95 font-semibold text-[11px]">© 2026 The Principles of Board Training.</p>
            <p className="mt-1">
              Published by the{' '}
              <a
                href="https://NPOlawyers.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-brass hover:underline font-semibold"
              >
                California Center for Nonprofit Law
              </a>
              . All rights reserved.
            </p>
          </div>
        </div>
      </footer>

      {/* Global Search Spotlight Overlay Modal (Enhancement 7) */}
      {isSearchOpen && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-ink/75 backdrop-blur-md flex items-start justify-center pt-20 px-4 animate-fade-in">
          <div 
            className="fixed inset-0" 
            onClick={() => setIsSearchOpen(false)} 
          />
          
          <div className="bg-white border-2 border-brass max-w-2xl w-full rounded-xl shadow-2xl overflow-hidden relative z-10 transition-premium transform scale-100 max-h-[80vh] flex flex-col">
            {/* Search Input Bar */}
            <div className="flex items-center border-b border-fog px-4 py-4 gap-3 bg-paper">
              <Search className="w-5 h-5 text-ink/40" />
              <input
                type="text"
                autoFocus
                placeholder="Search articles, scenarios, and tools... (e.g. Compensation, Audit, Bylaws)"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-transparent text-ink placeholder-ink/35 text-base focus:outline-none"
              />
              <button 
                onClick={() => setIsSearchOpen(false)}
                className="text-[10px] font-sans font-bold text-ink/40 hover:text-brass bg-fog px-2 py-1 rounded border border-fog-dark/10 shadow-sm"
              >
                ESC
              </button>
            </div>

            {/* Results or Suggestions Box */}
            <div className="overflow-y-auto p-4 flex-grow">
              {searchQuery.trim() === '' ? (
                <div className="space-y-4">
                  <p className="text-[11px] font-bold text-ink/40 uppercase tracking-widest">Suggested Search Paths</p>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {[
                      { title: "Mature Board Self-Assessment", path: "tools/self-assessment", desc: "Evaluate your board's fiduciary competency" },
                      { title: "Form 990 & Compensation Studies", path: "article/form-990-and-executive-compensation-governance", desc: "IRS executive compensation safe harbors" },
                      { title: "California Board Rules Index", path: "california-board-rules", desc: "CPA audits and Registry of Charitable Trusts" },
                      { title: "Conflict of Interest Recusals", path: "scenario/founder-salary-conflict", desc: "How to handle interested director votes" }
                    ].map((s) => (
                      <button
                        key={s.path}
                        onClick={() => {
                          handleNavClick(s.path);
                          setIsSearchOpen(false);
                          setSearchQuery('');
                        }}
                        className="w-full text-left p-3 rounded-lg border border-fog hover:border-brass hover:bg-paper transition-premium group"
                      >
                        <p className="text-xs font-bold text-slate-brand group-hover:text-brass transition-premium">{s.title}</p>
                        <p className="text-[10px] text-ink/65 mt-0.5">{s.desc}</p>
                      </button>
                    ))}
                  </div>
                </div>
              ) : (
                <div className="space-y-3">
                  {(() => {
                    const query = searchQuery.toLowerCase();
                    const matchedArticles = articles.filter(a => 
                      a.title.toLowerCase().includes(query) || 
                      a.description.toLowerCase().includes(query) ||
                      a.category.toLowerCase().includes(query)
                    ).map(a => ({
                      title: a.title,
                      subtitle: a.description,
                      badge: "Article",
                      badgeColor: "bg-teal-500/10 text-teal-700 border-teal-500/20",
                      path: `article/${a.slug}`
                    }));

                    const matchedScenarios = scenarios.filter(s => 
                      s.title.toLowerCase().includes(query) || 
                      s.facts.toLowerCase().includes(query) ||
                      s.issueType.toLowerCase().includes(query)
                    ).map(s => ({
                      title: s.title,
                      subtitle: s.facts,
                      badge: `Scenario • ${s.issueType}`,
                      badgeColor: "bg-amber-500/10 text-amber-700 border-amber-500/20",
                      path: `scenario/${s.slug}`
                    }));

                    const pages = [
                      { title: "Prepare for Your Next Meeting", subtitle: "Structured prep agenda checklist & balanced meeting planning", path: "next-meeting" },
                      { title: "California Board Rules Index", subtitle: "CPA audits, Form 990, SOI, and CT registry requirements", path: "california-board-rules" },
                      { title: "Training Syllabus Planner", subtitle: "Diagnostic workbook and board capacity planner", path: "training" },
                      { title: "Boards 101 Reference Manual", subtitle: "Governance rules, quick quiz and video resources", path: "boards-101" },
                      { title: "Mature Board Self-Assessment Lab", subtitle: "10-question compliance rating & fiduciary analytics scorecard", path: "tools/self-assessment" },
                      { title: "Board Packet Scan Lab", subtitle: "Interactive vetting checklist & board packet simulator", path: "tools/board-packet-lab" },
                      { title: "Minutes Quality Scorecard Lab", subtitle: "Audits & grades resolution minutes and records", path: "tools/minutes-scorecard" },
                      { title: "Budget Deviation Worksheet Lab", subtitle: "Variance auditing and risk scanning calculator", path: "tools/budget-worksheet" },
                      { title: "Board Authority Map Lab", subtitle: "Interactively map corporate delegation bounds", path: "tools/authority-map" },
                      { title: "About Us & CCNL", subtitle: "Nonprofit Center Law Firm information", path: "about-us" }
                    ];

                    const matchedPages = pages.filter(p => 
                      p.title.toLowerCase().includes(query) || 
                      p.subtitle.toLowerCase().includes(query)
                    ).map(p => ({
                      title: p.title,
                      subtitle: p.subtitle,
                      badge: "Tools & Resources",
                      badgeColor: "bg-brass/10 text-brass border-brass/20",
                      path: p.path
                    }));

                    const results = [...matchedPages, ...matchedArticles, ...matchedScenarios].slice(0, 7);

                    if (results.length === 0) {
                      return (
                        <div className="text-center py-8">
                          <p className="text-sm font-medium text-ink/50">No files or resources matched your query.</p>
                          <p className="text-[11px] text-ink/40 mt-1">Try typing "Bylaws", "Audit", or "Safe Harbor".</p>
                        </div>
                      );
                    }

                    return (
                      <div className="space-y-2">
                        <p className="text-[10px] font-bold text-ink/40 uppercase tracking-widest">Search Results ({results.length})</p>
                        {results.map((res, index) => (
                          <button
                            key={index}
                            onClick={() => {
                              handleNavClick(res.path);
                              setIsSearchOpen(false);
                              setSearchQuery('');
                            }}
                            className="w-full text-left p-3 rounded-lg hover:bg-paper border border-transparent hover:border-fog transition-premium flex flex-col sm:flex-row sm:items-center justify-between gap-2 group"
                          >
                            <div className="space-y-0.5 truncate max-w-lg">
                              <p className="text-xs font-bold text-slate-brand group-hover:text-brass transition-premium truncate">{res.title}</p>
                              <p className="text-[10px] text-ink/60 truncate">{res.subtitle}</p>
                            </div>
                            <span className={`text-[9px] font-bold uppercase tracking-wider px-2 py-0.5 rounded border self-start sm:self-center ${res.badgeColor}`}>
                              {res.badge}
                            </span>
                          </button>
                        ))}
                      </div>
                    );
                  })()}
                </div>
              )}
            </div>

            {/* Modal Footer */}
            <div className="bg-paper border-t border-fog p-3 text-center text-[10px] text-ink/45 flex justify-center items-center gap-4">
              <span>Use <span className="font-bold">↑↓</span> to navigate</span>
              <span><span className="font-bold">↵</span> to select</span>
              <span>Press <span className="font-bold">ESC</span> to exit</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
