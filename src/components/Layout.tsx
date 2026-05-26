import React, { useState, useEffect } from 'react';
import { useRouter } from './Router';
import { Menu, X, Landmark, ExternalLink, ShieldCheck, ChevronRight, GraduationCap, Search, Scale, BookOpen, AlertCircle } from 'lucide-react';
import { articles } from '../data/articles';
import { scenarios } from '../data/scenarios';

interface LayoutProps {
  children: React.ReactNode;
}

export const Layout: React.FC<LayoutProps> = ({ children }) => {
  const { path, navigate } = useRouter();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isToolsHovered, setIsToolsHovered] = useState(false);
  
  // Search state
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  // Fiduciary Glossary states (Enhancement 6)
  const [isGlossaryOpen, setIsGlossaryOpen] = useState(false);
  const [activeTermId, setActiveTermId] = useState<string | null>(null);



  // Derive toolsState and labStates synchronously on render (removes useEffect and state variables)
  let toolsState: 'none' | 'in-progress' | 'completed' = 'none';
  let labStates = {
    self: { started: false, completed: false, text: 'Not Started' },
    packet: { started: false, completed: false, count: 0, text: 'Not Started' },
    minutes: { started: false, completed: false, text: 'Not Started' },
    budget: { started: false, completed: false, count: 0, text: 'Not Started' },
    authority: { started: false, completed: false, text: 'Not Started' }
  };

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
      toolsState = 'completed';
    } else if (anyCompleted || anyIncompleteAndStarted) {
      toolsState = 'in-progress';
    } else {
      toolsState = 'none';
    }

    labStates = {
      self: { started: completedSelf, completed: completedSelf, text: completedSelf ? 'Completed ✓' : 'Not Started' },
      packet: { started: packetCount > 0, completed: completedPacket, count: packetCount, text: completedPacket ? 'Completed ✓' : (packetCount > 0 ? `In Progress (${packetCount}/9)` : 'Not Started') },
      minutes: { started: completedMinutes, completed: completedMinutes, text: completedMinutes ? 'Completed ✓' : 'Not Started' },
      budget: { started: budgetCount > 0, completed: completedBudget, count: budgetCount, text: completedBudget ? 'Completed ✓' : (budgetCount > 0 ? `In Progress (${budgetCount}/6)` : 'Not Started') },
      authority: { started: authCount > 0 || completedAuth, completed: completedAuth, text: completedAuth ? 'Completed ✓' : (authCount > 0 ? 'In Progress' : 'Not Started') }
    };
  } catch {
    // ignore
  }

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

  // Global glossary click handler (Enhancement 6)
  useEffect(() => {
    const handleGlossaryClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const glossaryEl = target.closest('.glossary-term') as HTMLElement;
      if (glossaryEl) {
        e.preventDefault();
        const termId = glossaryEl.getAttribute('data-term');
        if (termId) {
          setActiveTermId(termId);
          setIsGlossaryOpen(true);
        }
      }
    };

    document.addEventListener('click', handleGlossaryClick);
    return () => document.removeEventListener('click', handleGlossaryClick);
  }, []);



  // Navigation click handler with custom scroll action for ribbon banner
  const handleRibbonClick = () => {
    navigate('training');
    setTimeout(() => {
      const el = document.getElementById('webinar-card');
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
      }
    }, 150);
  };

  // Situational/Topic Navigation configuration
  const navItems = [
    { label: 'Next Meeting', target: 'next-meeting', bg: 'hover:border-slate-brand' },
    { label: 'Money & Audit', target: 'money-audit', bg: 'hover:border-teal-brand' },
    { label: 'Executive Oversight', target: 'executive-oversight', bg: 'hover:border-slate-brand' },
    { label: 'Minutes & Records', target: 'minutes-records', bg: 'hover:border-slate-brand' },
    { label: 'California Rules', target: 'california-board-rules', bg: 'hover:border-brass' },
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
      {/* Webinar Seat Tracker Countdown Ribbon Banner (Enhancement 10) */}
      <div 
        onClick={handleRibbonClick}
        className="bg-gradient-to-r from-burgundy via-ink to-burgundy text-white text-center py-2 px-4 text-xs font-semibold relative cursor-pointer hover:opacity-95 transition-all select-none border-b border-brass/30 z-[60] group flex flex-wrap items-center justify-center gap-x-4 gap-y-1.5"
        title="Click to reserve your webinar seat"
      >
        <span className="relative flex h-2 w-2 shrink-0">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-brass opacity-75"></span>
          <span className="relative inline-flex rounded-full h-2 w-2 bg-brass"></span>
        </span>
        <span className="font-sans tracking-wide">
          ⚡ <strong className="text-brass font-bold uppercase tracking-wider">Upcoming Webinar:</strong> California Board Fiduciary Compliance Update
        </span>
        <span className="hidden md:inline-block text-paper/40 font-light">|</span>
        <span className="font-sans font-medium text-brass bg-brass/10 px-2 py-0.5 rounded border border-brass/30 flex items-center gap-1 shrink-0">
          <span className="text-[10px]">📅</span> June 17th at 10:00 AM PST
        </span>
        <span className="ml-1 px-3 py-1 bg-brass hover:bg-white text-ink font-sans font-bold text-[11px] uppercase tracking-wider rounded transition-all duration-300 shadow-sm flex items-center gap-1 group-hover:scale-[1.03] shrink-0">
          <span>Secure Your Seat</span>
          <ChevronRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
        </span>
      </div>

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
        <div className="max-w-[1360px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-4">
          <div className="flex items-center justify-between h-20">
            {/* Logo Brand Area (Editorial Corinthian Column Aesthetics) */}
            <div 
              onClick={() => handleNavClick('home')} 
              className="flex items-center gap-1.5 xl:gap-3 cursor-pointer group py-2"
            >
              <div className="bg-ink hover:bg-slate-brand text-brass p-1.5 xl:p-2.5 rounded-lg border border-brass/30 transition-premium shadow-md shrink-0">
                <Landmark className="w-4 h-4 sm:w-5 h-5 xl:w-6 h-6" />
              </div>
              <div className="flex flex-col select-none">
                <span className="font-serif italic text-xs sm:text-sm xl:text-base text-slate-brand font-semibold leading-tight tracking-wide group-hover:text-ink transition-premium">
                  The Principles of
                </span>
                <span className="font-sans font-extrabold text-[10px] sm:text-xs xl:text-sm text-brass tracking-[0.12em] xl:tracking-[0.18em] uppercase leading-none mt-0.5 whitespace-nowrap">
                  BOARD TRAINING
                </span>
              </div>
            </div>

            {/* Desktop Full Navigation */}
            <nav className="hidden lg:flex items-center gap-0.5 xl:gap-1.5">
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
                        className={`px-1.5 xl:px-2.5 py-1.5 text-[10.5px] xl:text-[11px] font-bold uppercase tracking-wider rounded border-b-2 border-transparent transition-premium focus-visible:outline-2 focus-visible:outline-brass flex items-center gap-0.5 relative ${
                          active 
                            ? 'border-brass text-brass bg-paper/50 font-bold' 
                            : 'text-ink/75 hover:text-ink hover:bg-fog/30'
                        }`}
                      >
                        <span>{item.label}</span>
                        {toolsState === 'in-progress' && (
                          <span className="w-1 h-1 bg-amber-500 rounded-full animate-pulse inline-block" title="Laboratory in progress" />
                        )}
                        {toolsState === 'completed' && (
                          <span className="text-[9px] text-teal-brand font-bold inline-block" title="All Laboratories Completed">✓</span>
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
                    className={`px-1.5 xl:px-2.5 py-1.5 text-[10.5px] xl:text-[11px] font-bold uppercase tracking-wider rounded border-b-2 border-transparent transition-premium focus-visible:outline-2 focus-visible:outline-brass flex items-center gap-1 relative ${
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
                className="p-1 xl:p-2 text-ink/75 hover:text-brass transition-premium rounded flex items-center gap-0.5 cursor-pointer"
                title="Search (Ctrl+K or /)"
              >
                <Search className="w-3.5 h-3.5 text-ink/70 hover:text-brass" />
                <span className="hidden xl:inline-block text-[9px] font-sans font-bold text-ink/30 bg-fog px-1 py-0.5 rounded border border-fog-dark/10">⌘K</span>
              </button>
              
              <div className="h-6 w-[1px] bg-fog/80 mx-1 xl:mx-1.5" />
              
              <a
                href="https://NPOlawyers.com"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 px-2.5 xl:px-4 py-2 bg-slate-brand hover:bg-ink text-white text-[10px] xl:text-xs font-bold uppercase tracking-wider rounded shadow transition-premium cursor-pointer"
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

      {/* Global Fiduciary Glossary Drawer (Enhancement 6) */}
      {isGlossaryOpen && (
        <div className="fixed inset-0 z-[100] overflow-hidden animate-fade-in">
          {/* Backdrop overlay */}
          <div 
            className="absolute inset-0 bg-ink/50 backdrop-blur-sm transition-opacity duration-300"
            onClick={() => setIsGlossaryOpen(false)}
          />

          {/* Slideout panel */}
          <div className="absolute inset-y-0 right-0 max-w-full flex pl-10">
            <div className="w-screen max-w-md sm:max-w-lg bg-paper border-l-2 border-brass flex flex-col h-full shadow-2xl relative animate-slide-in">
              {/* Header */}
              <div className="bg-ink text-paper p-6 border-b border-brass/20 flex items-center justify-between">
                <div>
                  <span className="text-[10px] font-extrabold uppercase tracking-widest text-brass block mb-1">
                    California Boardroom Glossary
                  </span>
                  <h3 className="font-serif italic font-bold text-xl sm:text-2xl text-white">
                    Fiduciary Definitions
                  </h3>
                </div>
                <button 
                  onClick={() => setIsGlossaryOpen(false)}
                  className="p-2 text-paper/70 hover:text-white hover:bg-white/10 rounded-full transition-premium cursor-pointer"
                  aria-label="Close glossary"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>

              {/* Body Content */}
              <div className="flex-1 overflow-y-auto p-6 space-y-6">
                {activeTermId && glossaryData[activeTermId] ? (() => {
                  const term = glossaryData[activeTermId];
                  return (
                    <div className="space-y-6 text-left">
                      <div className="pb-4 border-b-4 border-double border-brass/25">
                        <h4 className="font-serif font-bold text-2xl text-slate-brand">
                          {term.term}
                        </h4>
                      </div>

                      {/* Statutory Authority */}
                      <div className="bg-white border border-brass/25 rounded-xl p-5 space-y-3 shadow-sm relative overflow-hidden">
                        <div className="absolute top-0 right-0 bg-brass/15 text-brass px-3 py-1 rounded-bl-lg font-sans font-bold text-[9px] uppercase tracking-wider">
                          Statute Check
                        </div>
                        <div className="flex items-center gap-1.5 text-brass">
                          <Scale className="w-4 h-4 shrink-0" />
                          <span className="text-[10px] font-extrabold uppercase tracking-widest">
                            Statutory Authority
                          </span>
                        </div>
                        <p className="text-xs font-bold text-ink bg-paper/50 px-2 py-1 rounded border border-fog inline-block font-mono">
                          {term.statute}
                        </p>
                        <p className="text-xs sm:text-sm text-ink/80 leading-relaxed font-sans font-medium">
                          {term.definition}
                        </p>
                      </div>

                      {/* Fiduciary Liability & Risk */}
                      <div className="bg-rose-50/50 border border-rose-300/40 rounded-xl p-5 space-y-2.5 shadow-sm">
                        <div className="flex items-center gap-1.5 text-rose-700">
                          <AlertCircle className="w-4 h-4 shrink-0" />
                          <span className="text-[10px] font-extrabold uppercase tracking-widest">
                            Fiduciary Liability & Risk
                          </span>
                        </div>
                        <p className="text-xs sm:text-sm text-rose-900 leading-relaxed font-sans font-semibold">
                          {term.consequences}
                        </p>
                      </div>

                      {/* Practice Lab Link */}
                      {term.laboratoryLink && (
                        <div className="bg-teal-500/5 border border-teal-500/20 rounded-xl p-5 space-y-3 shadow-sm">
                          <div className="flex items-center gap-1.5 text-teal-700">
                            <BookOpen className="w-4 h-4 shrink-0 animate-pulse" />
                            <span className="text-[10px] font-extrabold uppercase tracking-widest">
                              Practice in Laboratory
                            </span>
                          </div>
                          <p className="text-xs text-ink/75 leading-relaxed font-sans font-medium">
                            Apply this concept interactively in the <strong className="text-teal-700 font-bold">{term.laboratoryName}</strong> to practice compliance scanning under California law.
                          </p>
                          <button
                            onClick={() => {
                              handleNavClick(term.laboratoryLink!);
                              setIsGlossaryOpen(false);
                            }}
                            className="w-full inline-flex justify-center items-center gap-1.5 py-2.5 px-4 bg-teal-brand hover:bg-ink text-white text-xs font-bold uppercase tracking-wider rounded shadow hover:shadow-md transition-premium cursor-pointer font-sans"
                          >
                            <span>Open Interactive Lab ➜</span>
                          </button>
                        </div>
                      )}

                      {/* Professional Counsel Referral */}
                      <div className="bg-burgundy/5 border-l-4 border-burgundy p-5 rounded-r-xl space-y-3 shadow-sm text-left">
                        <div className="flex items-center gap-1.5 text-burgundy">
                          <ShieldCheck className="w-4.5 h-4.5 shrink-0 text-brass text-brass" />
                          <span className="text-[9px] font-extrabold uppercase tracking-widest">
                            Privileged Boardroom Protection
                          </span>
                        </div>
                        <p className="text-xs text-ink/75 leading-relaxed font-sans font-medium">
                          Fiduciary guidelines under California law are strict. If your board has an active conflict of interest, spousal contracts, or registry issues, protect your directors under direct attorney-client privilege.
                        </p>
                        <a
                          href="https://NPOlawyers.com"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="w-full inline-flex justify-center items-center gap-1.5 py-2.5 bg-burgundy hover:bg-ink text-white text-xs font-bold uppercase tracking-wider rounded shadow transition-premium cursor-pointer font-sans text-center"
                        >
                          <span>Consult Myron Steeves (NPOlawyers) ➜</span>
                        </a>
                      </div>
                    </div>
                  );
                })() : (
                  <div className="text-center py-20">
                    <p className="text-sm font-medium text-ink/50">Select a glossary term to inspect statutory guidelines.</p>
                  </div>
                )}
              </div>

              {/* Footer */}
              <div className="bg-paper border-t border-fog p-4 text-center text-[10px] text-ink/40">
                <span>The Principles of Board Training • California Center for Nonprofit Law</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

interface GlossaryItem {
  id: string;
  term: string;
  definition: string;
  statute: string;
  consequences: string;
  laboratoryLink: string | null;
  laboratoryName: string | null;
}

const glossaryData: Record<string, GlossaryItem> = {
  'self-dealing': {
    id: 'self-dealing',
    term: 'Self-Dealing Transactions',
    definition: 'Under California law, any transaction where a director or officer has a material financial interest is defined as a self-dealing transaction. Bypassing strict board approvals or spousal competitive bidding rules is a direct statutory violation.',
    statute: 'California Corporations Code § 5233',
    consequences: 'The contract can be completely voided. The interested director is subject to direct corporate restitution demands and must return all profits or unauthorized payments to the charity with interest.',
    laboratoryLink: 'tools/board-packet-lab',
    laboratoryName: 'Board Packet Discovery Lab'
  },
  'rebuttable-presumption': {
    id: 'rebuttable-presumption',
    term: 'Rebuttable Presumption of Reasonableness',
    definition: 'A safe harbor mechanism established by the IRS that shifts the burden of proof to the IRS regarding executive compensation. To qualify, boards must: (1) use disinterested, independent directors, (2) review external market comparability data, and (3) record contemporaneously written board minutes within 60 days.',
    statute: 'Internal Revenue Code (IRC) § 4958',
    consequences: 'If the presumption is not established, the IRS can levy catastrophic "Intermediate Sanctions" excise tax penalties: 25% to 200% on the executive, and 10% on the approving board members individually.',
    laboratoryLink: 'tools/minutes-scorecard',
    laboratoryName: 'Minutes Quality Scorecard'
  },
  'donor-intent': {
    id: 'donor-intent',
    term: 'Donor Intent & Restricted Assets',
    definition: 'Governs the management and spending of charitable endowments and restricted donations. Boards must strictly adhere to the specific written purposes designated by the donor in the gift agreement.',
    statute: 'Uniform Prudent Management of Institutional Funds Act (UPMIFA) - CA Probate Code §§ 18501-18510',
    consequences: 'Diverting restricted donor capital to cover general operations represents an illegal mixing of assets and a breach of public trust. The California Attorney General holds supervisory power to freeze assets, demand restitution, and remove directors.',
    laboratoryLink: 'tools/budget-worksheet',
    laboratoryName: 'Operating Budget Audit Worksheet'
  },
  'duty-of-care': {
    id: 'duty-of-care',
    term: 'Duty of Care',
    definition: 'Requires directors to perform their duties in good faith, in a manner they believe to be in the best interest of the corporation, and with the care that an ordinarily prudent person in a like position would use under similar circumstances.',
    statute: 'California Corporations Code § 5231',
    consequences: 'Passive directors who "rubber-stamp" executives, skip meetings, or fail to read board packets and financial reports lose their statutory business judgment shield. This exposes them to direct personal civil liability for corporate losses or financial failure.',
    laboratoryLink: 'tools/self-assessment',
    laboratoryName: 'Mature Board Self-Assessment'
  },
  'duty-of-loyalty': {
    id: 'duty-of-loyalty',
    term: 'Duty of Loyalty',
    definition: 'Requires directors to act in undivided good faith and prioritize the nonprofit\'s charitable mission above any personal, professional, or third-party financial gain. Directors are strictly prohibited from usurping corporate opportunities for themselves.',
    statute: 'California Corporations Code § 5231',
    consequences: 'Breaching the Duty of Loyalty voids volunteer director civil immunities. A director can be sued in civil court by other directors or the Attorney General to restore any ill-gotten corporate benefits.',
    laboratoryLink: 'tools/authority-map',
    laboratoryName: 'Board Authority Delegation Map'
  },
  'quorum': {
    id: 'quorum',
    term: 'Board Quorum Requirements',
    definition: 'The statutory minimum number of directors who must be present in person or via video conference to legally transact corporate business. Under California law, a quorum is generally a majority of authorized directors unless bylaws state otherwise.',
    statute: 'California Corporations Code § 5211(a)(7)',
    consequences: 'Any vote or resolution passed without an active legal quorum present is completely invalid and legally non-binding. This can void contracts, lines of credit, or officer elections, exposing the board to major litigation.',
    laboratoryLink: 'next-meeting',
    laboratoryName: 'Meeting Advance Timeline Planner'
  },
  'interested-director': {
    id: 'interested-director',
    term: 'Interested Director Rule (49% Cap)',
    definition: 'A unique California statute dictating that not more than 49% of the board of directors can be "interested persons"—meaning anyone compensated by the charity for services (such as the CEO or staff) or their relatives.',
    statute: 'California Corporations Code § 5227',
    consequences: 'Operating a board with an interested majority (e.g. founder, husband, and daughter on a 4-person board) is a major structural violation. All board actions can be declared void, and the corporation risks immediate dissolution by the CA Secretary of State.',
    laboratoryLink: 'california-board-rules',
    laboratoryName: 'California Board Rules Center'
  },
  'ultra-vires': {
    id: 'ultra-vires',
    term: 'Ultra Vires (Exceeding Powers)',
    definition: 'Corporate actions or expenditures that fall outside the legal purposes, powers, or delegation boundaries defined in the nonprofit\'s Articles of Incorporation, Bylaws, or Board Authority policies.',
    statute: 'California Corporations Code § 5141',
    consequences: 'While ultra vires acts are generally binding on third parties, the Attorney General or directors can sue to enjoin the unauthorized activities, and individual directors can be held personally liable for spending charity assets on non-exempt activities.',
    laboratoryLink: 'tools/authority-map',
    laboratoryName: 'Board Authority Delegation Map'
  }
};
