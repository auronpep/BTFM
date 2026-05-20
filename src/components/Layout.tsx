import React, { useState } from 'react';
import { useRouter } from './Router';
import { Menu, X, Landmark, ExternalLink, ShieldCheck, ChevronRight, GraduationCap } from 'lucide-react';

interface LayoutProps {
  children: React.ReactNode;
}

export const Layout: React.FC<LayoutProps> = ({ children }) => {
  const { path, navigate } = useRouter();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

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
                return (
                  <button
                    key={item.target}
                    onClick={() => handleNavClick(item.target)}
                    className={`px-3 py-2 text-xs font-semibold uppercase tracking-wider rounded border-b-2 border-transparent transition-premium focus-visible:outline-2 focus-visible:outline-brass ${
                      active 
                        ? 'border-brass text-brass bg-paper/50' 
                        : 'text-ink/75 hover:text-ink hover:bg-fog/30'
                    }`}
                  >
                    {item.label}
                  </button>
                );
              })}
              
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
                    <span>{item.label}</span>
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
    </div>
  );
};
