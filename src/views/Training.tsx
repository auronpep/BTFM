import React, { useState, useEffect } from 'react';
import { Layout } from '../components/Layout';
import { useRouter } from '../components/Router';
import { Calendar, CheckCircle2, ChevronRight, Award, GraduationCap, Building, Sparkles, Check, RefreshCw } from 'lucide-react';

export const Training: React.FC = () => {
  const { navigate } = useRouter();

  // 3. Syllabus Diagnostic Wizard States
  const [diagnostic, setDiagnostic] = useState(() => {
    const saved = localStorage.getItem('cdx_training_diagnostic');
    return saved ? JSON.parse(saved) : {
      step: 1, // 1, 2, 3, or 'completed'
      budget: '$250k - $1M',
      anxiety: 'Conflict of Interest',
      boardFrequency: 'Bi-monthly (6x/year)'
    };
  });

  useEffect(() => {
    localStorage.setItem('cdx_training_diagnostic', JSON.stringify(diagnostic));
  }, [diagnostic]);

  const handleNextStep = () => {
    setDiagnostic((prev: any) => ({ ...prev, step: typeof prev.step === 'number' ? prev.step + 1 : prev.step }));
  };

  const handlePrevStep = () => {
    setDiagnostic((prev: any) => ({ ...prev, step: typeof prev.step === 'number' ? Math.max(1, prev.step - 1) : 1 }));
  };

  const handleResetDiagnostic = () => {
    setDiagnostic({
      step: 1,
      budget: '$250k - $1M',
      anxiety: 'Conflict of Interest',
      boardFrequency: 'Bi-monthly (6x/year)'
    });
  };

  const handleAutoSelectWebinar = () => {
    let target: string;
    if (diagnostic.anxiety === 'Financials & Overruns') {
      target = 'webinar-audit';
    } else if (diagnostic.anxiety === 'Conflict of Interest') {
      target = 'webinar-comp';
    } else {
      target = 'webinar-minutes';
    }
    navigate(`webinar-registration?webinar=${target}`);
  };

  const getRecommendation = () => {
    const { budget, anxiety } = diagnostic;
    let title: string;
    let desc: string;
    let tools: string[];
    let rationale: string;

    if (anxiety === 'Financials & Overruns') {
      title = "Financial Control & Audit Protocol";
      desc = `Your primary concern is managing budgets and overruns. With your selected budget of ${budget}, establishing robust independent variance review is a top legal duty.`;
      tools = ["Budget Worksheet Audit Lab", "Federal Board Rules Center"];
      rationale = budget === "Over $5M" || budget === "$1M - $5M"
        ? "Many states mandate a fully independent CPA Audit Committee for organizations exceeding $2M in gross revenues. Your budget size puts you in high statutory exposure."
        : "While a formal CPA audit isn't mandated for budgets under $2M, state Attorney Generals recommend a 3-director Audit Task Force to oversee financial ledgers and prevent internal embezzlement.";
    } else if (anxiety === 'Conflict of Interest') {
      title = "Conflict Recusal & Compliance Protocol";
      desc = "Managing self-dealing transactions is critical. Interested director contracts must be handled via strict statutory safe harbors.";
      tools = ["Minutes Quality Scorecard", "Board Authority Map"];
      rationale = "Under state corporate codes, any contract involving a conflicted director must be approved by fully disinterested, independent board members. Conflicted parties must exit the room and be recused from voting.";
    } else if (anxiety === 'IRS Filings & Delinquency') {
      title = "State Board Status & Registry Protocol";
      desc = "Failure to file required state forms will cause immediate, automatic registry suspension and status loss.";
      tools = ["Federal Board Rules Center", "Self-Assessment Diagnostic"];
      rationale = "State Attorney Generals require annual charity registrations and Statements of Information to be filed on time. Any delay can trigger automatic suspension, making the board personally liable for corporate actions.";
    } else {
      title = "Defensive Governance Minutes Protocol";
      desc = "Protect individual directors from litigation discovery and IRS personal excise tax penalties.";
      tools = ["Minutes Quality Scorecard", "Boards 101 Fundamental Manual"];
      rationale = "IRC Section 4958 requires the board to document compensation studies in contemporaneous minutes to secure the 'Rebuttable Presumption of Reasonableness.' Minutes are legal evidence, not transcripts of disagreements.";
    }

    return { title, desc, tools, rationale };
  };

  // 1. In-Person Inquiry Form States
  const [orgName, setOrgName] = useState('');
  const [contactName, setContactName] = useState('');
  const [contactEmail, setContactEmail] = useState('');
  const [boardSize, setBoardSize] = useState('');
  const [trainingTopic, setTrainingTopic] = useState('');
  const [notes, setNotes] = useState('');
  const [inpersonSubmitted, setInpersonSubmitted] = useState(false);
  const [inpersonError, setInpersonError] = useState('');

  const handleInpersonSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!orgName || !contactName || !contactEmail || !boardSize || !trainingTopic) {
      setInpersonError('Please complete all mandatory form fields.');
      return;
    }
    setInpersonError('');

    const inquiry = {
      orgName,
      contactName,
      contactEmail,
      boardSize,
      trainingTopic,
      notes,
      date: new Date().toISOString()
    };
    const list = JSON.parse(localStorage.getItem('inperson_inquiries') || '[]');
    list.push(inquiry);
    localStorage.setItem('inperson_inquiries', JSON.stringify(list));

    setInpersonSubmitted(true);
  };

  return (
    <Layout>
      <div className="py-12 bg-paper/30 min-h-screen px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto space-y-12">
          
          {/* Header */}
          <div className="text-center space-y-3">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-brass/10 border border-brass/30 text-brass rounded-full text-xs font-semibold uppercase tracking-wider">
              <GraduationCap className="w-4 h-4" />
              <span>Educational Division</span>
            </div>
            <h1 className="font-serif text-3xl sm:text-4xl text-ink font-bold tracking-wide">
              The Boardroom Training Center
            </h1>
            <p className="max-w-2xl mx-auto text-sm sm:text-base text-ink/70">
              Increase your board's governing capacity. Register for our upcoming legal compliance webinars or request a customized in-person training program for your directors.
            </p>
          </div>

          {/* Training Overview Row */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-left">
            <div className="bg-white p-6 sm:p-8 rounded-xl border border-fog shadow-sm space-y-4">
              <h3 className="font-serif font-bold text-xl text-slate-brand border-b border-fog/60 pb-3 flex items-center gap-2">
                <Calendar className="w-5 h-5 text-brass" />
                Live Educational Webinars
              </h3>
              <p className="font-sans text-xs sm:text-sm text-ink/75 leading-relaxed">
                Our webinars are short, intensive, and designed directly for governing board members. Each session focuses on a specific, high-risk fiduciary compliance topic, providing practical checklists and ask-this question scripts.
              </p>
              <ul className="space-y-2 text-xs font-medium text-ink/80 pt-2">
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-brass mt-0.5 shrink-0" />
                  <span>Interactive Q&A session with charity attorneys.</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-brass mt-0.5 shrink-0" />
                  <span>D&O compliance certificates provided upon successful completion.</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-brass mt-0.5 shrink-0" />
                  <span>Complimentary download of meeting script decks.</span>
                </li>
              </ul>
            </div>

            <div className="bg-white p-6 sm:p-8 rounded-xl border border-fog shadow-sm space-y-4">
              <h3 className="font-serif font-bold text-xl text-teal-brand border-b border-fog/60 pb-3 flex items-center gap-2">
                <Building className="w-5 h-5 text-brass" />
                Custom In-Person Workshops
              </h3>
              <p className="font-sans text-xs sm:text-sm text-ink/75 leading-relaxed">
                Prepare your board for strategic growth. We facilitate customized, 1-hour or half-day workshops on-site at your headquarters or during your board retreats. Topics include board onboarding, bylaws audits, and managing the governance vs. management boundary.
              </p>
              <ul className="space-y-2 text-xs font-medium text-ink/80 pt-2">
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-brass mt-0.5 shrink-0" />
                  <span>Custom curriculum designed specifically for your organization's budget and stage.</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-brass mt-0.5 shrink-0" />
                  <span>Live mock meeting simulations to train active director inquiry.</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-brass mt-0.5 shrink-0" />
                  <span>Facilitated by NPO Lawyers legal counsels.</span>
                </li>
              </ul>
            </div>
          </div>

          {/* Interactive Training & Diagnostic Section */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            
            {/* Left Column: Syllabus Diagnostic Wizard & Webinar Registration (lg:col-span-5) */}
            <div className="lg:col-span-5 flex flex-col gap-8">
              
              {/* Syllabus Diagnostic Wizard */}
              <div className="bg-amber-50/20 rounded-2xl border border-amber-900/10 p-5 space-y-5 text-left shadow-sm">
              <div className="border-b border-amber-900/10 pb-3">
                <div className="flex items-center gap-1.5 text-brass">
                  <Sparkles className="w-4 h-4 fill-brass/20 animate-pulse" />
                  <span className="text-[9px] font-extrabold uppercase tracking-widest">Syllabus Planner</span>
                </div>
                <h4 className="font-serif text-lg font-bold text-ink">Curriculum Diagnostic</h4>
                <p className="text-xs text-ink/50 mt-0.5 leading-relaxed">
                  Analyze your organization's specific legal vulnerabilities to compile a customized board training syllabus.
                </p>
              </div>

              {diagnostic.step === 1 && (
                <div className="space-y-4 animate-fade-in">
                  <div className="space-y-1">
                    <span className="text-[10px] font-extrabold uppercase tracking-widest text-brass/80">Step 1 of 3</span>
                    <h5 className="text-sm font-bold text-ink font-serif">What is your annual operating budget?</h5>
                  </div>
                  <div className="space-y-2">
                    {[
                      'Under $250k',
                      '$250k - $1M',
                      '$1M - $5M',
                      'Over $5M'
                    ].map((b) => (
                      <button
                        key={b}
                        type="button"
                        onClick={() => setDiagnostic({ ...diagnostic, budget: b })}
                        className={`w-full text-left px-3.5 py-2.5 rounded-lg border text-xs font-semibold flex items-center justify-between transition-premium cursor-pointer ${
                          diagnostic.budget === b
                            ? 'border-brass bg-brass/5 text-ink'
                            : 'border-fog bg-white text-ink/75 hover:border-brass/50'
                        }`}
                      >
                        <span>{b}</span>
                        {diagnostic.budget === b && <Check className="w-4 h-4 text-brass" />}
                      </button>
                    ))}
                  </div>
                  <button
                    type="button"
                    onClick={handleNextStep}
                    className="w-full inline-flex justify-center items-center gap-1 py-2.5 bg-slate-brand hover:bg-ink text-white text-xs font-bold uppercase tracking-wider rounded shadow transition-premium cursor-pointer"
                  >
                    <span>Next: Compliance Anxiety</span>
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              )}

              {diagnostic.step === 2 && (
                <div className="space-y-4 animate-fade-in">
                  <div className="space-y-1">
                    <span className="text-[10px] font-extrabold uppercase tracking-widest text-brass/80">Step 2 of 3</span>
                    <h5 className="text-sm font-bold text-ink font-serif">What is your board's primary anxiety?</h5>
                  </div>
                  <div className="space-y-2">
                    {[
                      { key: 'Financials & Overruns', label: 'Financials & Overruns' },
                      { key: 'Conflict of Interest', label: 'Conflict of Interest' },
                      { key: 'IRS Filings & Delinquency', label: 'IRS Filings & Delinquency' },
                      { key: 'Deliberation boundaries', label: 'Minutes & Liability' }
                    ].map((opt) => (
                      <button
                        key={opt.key}
                        type="button"
                        onClick={() => setDiagnostic({ ...diagnostic, anxiety: opt.key })}
                        className={`w-full text-left px-3.5 py-2.5 rounded-lg border text-xs font-semibold flex items-center justify-between transition-premium cursor-pointer ${
                          diagnostic.anxiety === opt.key
                            ? 'border-brass bg-brass/5 text-ink'
                            : 'border-fog bg-white text-ink/75 hover:border-brass/50'
                        }`}
                      >
                        <span>{opt.label}</span>
                        {diagnostic.anxiety === opt.key && <Check className="w-4 h-4 text-brass" />}
                      </button>
                    ))}
                  </div>
                  <div className="grid grid-cols-2 gap-3 pt-1">
                    <button
                      type="button"
                      onClick={handlePrevStep}
                      className="py-2 border border-fog hover:border-brass rounded text-xs font-bold uppercase tracking-wider text-ink/65 hover:text-ink transition-premium cursor-pointer text-center"
                    >
                      Back
                    </button>
                    <button
                      type="button"
                      onClick={handleNextStep}
                      className="py-2 bg-slate-brand hover:bg-ink text-white rounded text-xs font-bold uppercase tracking-wider transition-premium cursor-pointer"
                    >
                      Next Step
                    </button>
                  </div>
                </div>
              )}

              {diagnostic.step === 3 && (
                <div className="space-y-4 animate-fade-in">
                  <div className="space-y-1">
                    <span className="text-[10px] font-extrabold uppercase tracking-widest text-brass/80">Step 3 of 3</span>
                    <h5 className="text-sm font-bold text-ink font-serif">How frequently does your board meet?</h5>
                  </div>
                  <div className="space-y-2">
                    {[
                      'Monthly (10-12x/year)',
                      'Bi-monthly (6x/year)',
                      'Quarterly (4x/year)'
                    ].map((f) => (
                      <button
                        key={f}
                        type="button"
                        onClick={() => setDiagnostic({ ...diagnostic, boardFrequency: f })}
                        className={`w-full text-left px-3.5 py-2.5 rounded-lg border text-xs font-semibold flex items-center justify-between transition-premium cursor-pointer ${
                          diagnostic.boardFrequency === f
                            ? 'border-brass bg-brass/5 text-ink'
                            : 'border-fog bg-white text-ink/75 hover:border-brass/50'
                        }`}
                      >
                        <span>{f}</span>
                        {diagnostic.boardFrequency === f && <Check className="w-4 h-4 text-brass" />}
                      </button>
                    ))}
                  </div>
                  <div className="grid grid-cols-2 gap-3 pt-1">
                    <button
                      type="button"
                      onClick={handlePrevStep}
                      className="py-2 border border-fog hover:border-brass rounded text-xs font-bold uppercase tracking-wider text-ink/65 hover:text-ink transition-premium cursor-pointer text-center"
                    >
                      Back
                    </button>
                    <button
                      type="button"
                      onClick={() => setDiagnostic((prev: any) => ({ ...prev, step: 'completed' }))}
                      className="py-2 bg-teal-brand hover:bg-ink text-white rounded text-xs font-bold uppercase tracking-wider transition-premium cursor-pointer"
                    >
                      Generate Plan
                    </button>
                  </div>
                </div>
              )}

              {diagnostic.step === 'completed' && (
                <div className="space-y-4 animate-fade-in text-xs">
                  <div className="bg-white rounded-xl border border-brass/20 p-4 space-y-3.5 relative">
                    <div className="absolute -top-2.5 -right-2 bg-brass text-ink font-extrabold uppercase tracking-widest text-[8px] px-2 py-0.5 rounded shadow-sm border border-amber-950/15">
                      Personalized
                    </div>
                    
                    <div className="space-y-1">
                      <p className="text-[9px] text-brass uppercase tracking-widest font-black">Recommended Track</p>
                      <h5 className="font-serif text-sm font-bold text-ink leading-tight">{getRecommendation().title}</h5>
                    </div>

                    <p className="text-[11px] text-ink/70 leading-relaxed font-sans">
                      {getRecommendation().desc}
                    </p>

                    <div className="bg-paper/40 p-2.5 rounded-lg border border-fog/50 space-y-1.5 text-left">
                      <strong className="text-[9px] uppercase tracking-wider text-ink/40 block">Statutory Audit Rationale:</strong>
                      <p className="text-[10px] text-ink/80 leading-relaxed font-medium">
                        {getRecommendation().rationale}
                      </p>
                    </div>

                    <div className="space-y-1.5 text-left">
                      <strong className="text-[9px] uppercase tracking-wider text-ink/40 block">Key Workspace Labs to Review:</strong>
                      <div className="flex flex-col gap-1 text-[11px] font-bold text-slate-brand">
                        {getRecommendation().tools.map((t, idx) => (
                          <div key={idx} className="flex items-center gap-1.5">
                            <CheckCircle2 className="w-3.5 h-3.5 text-brass" />
                            <span>{t}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <button
                      type="button"
                      onClick={handleAutoSelectWebinar}
                      className="w-full inline-flex justify-center items-center gap-1 py-2.5 bg-slate-brand hover:bg-ink text-white text-xs font-bold uppercase tracking-wider rounded shadow transition-premium cursor-pointer"
                    >
                      <span>Select Suggested Webinar</span>
                      <ChevronRight className="w-4 h-4 text-brass" />
                    </button>
                    <button
                      type="button"
                      onClick={handleResetDiagnostic}
                      className="w-full inline-flex justify-center items-center gap-1.5 py-1.5 border border-fog hover:border-brass text-ink/65 hover:text-ink text-[10px] font-bold uppercase tracking-wider rounded transition-premium cursor-pointer"
                    >
                      <RefreshCw className="w-3.5 h-3.5" />
                      <span>Retake Diagnostic</span>
                    </button>
                  </div>
                </div>
              )}
            </div>

              
              {/* Webinar Registration CTA Card */}
              <div id="webinar-card" className="bg-white rounded-xl shadow-md border border-fog overflow-hidden text-left">
                <div className="bg-slate-brand text-paper p-5 border-b border-brass/20 space-y-1">
                  <span className="text-[10px] font-bold uppercase tracking-widest text-brass block">Live Governance Training Series</span>
                  <h4 className="font-serif text-lg font-bold text-white tracking-wide">Webinar Training Series</h4>
                </div>
                <p className="text-xs text-ink/70 leading-relaxed font-sans font-medium mt-1 mb-4">
                  Intensive, legal-focused training sessions for directors. Learn to protect your board from high-risk compliance liabilities.
                </p>

                <div className="p-5 space-y-4">
                  {/* Webinar Schedule List */}
                  <div className="space-y-3">
                    {[
                      { 
                        id: 'webinar-fiduciary-update', 
                        title: 'Board Fiduciary Update', 
                        date: 'June 17, 2026', 
                        time: '10:00 AM PST',
                        badge: 'Fiduciary Duty'
                      },
                      { 
                        id: 'webinar-comp', 
                        title: 'Executive Compensation Safe Harbor', 
                        date: 'June 18, 2026', 
                        time: '10:00 AM PST',
                        badge: 'IRC § 4958'
                      },
                      { 
                        id: 'webinar-audit', 
                        title: 'CA $2M Independent Audit Mandate', 
                        date: 'July 15, 2026', 
                        time: '1:00 PM PST',
                        badge: 'CA Gov Code § 12586'
                      },
                      { 
                        id: 'webinar-minutes', 
                        title: 'Drafting Defensive Meeting Minutes', 
                        date: 'August 11, 2026', 
                        time: '11:00 AM PST',
                        badge: 'Corporate Records'
                      }
                    ].map((webinar) => (
                      <button
                        key={webinar.id}
                        type="button"
                        onClick={() => navigate(`webinar-registration?webinar=${webinar.id}`)}
                        className="w-full text-left p-3 rounded-lg border border-fog bg-paper/10 hover:bg-brass/5 hover:border-brass/50 transition-premium group flex flex-col gap-1.5 cursor-pointer"
                      >
                        <div className="flex justify-between items-start w-full">
                          <span className="text-[10px] font-extrabold text-brass uppercase tracking-wider">{webinar.date} at {webinar.time}</span>
                          <span className="text-[9px] px-1.5 py-0.5 bg-slate-brand/5 text-slate-brand border border-slate-brand/10 rounded font-bold">{webinar.badge}</span>
                        </div>
                        <h5 className="text-xs font-bold text-ink group-hover:text-brass transition-colors leading-snug">
                          {webinar.title}
                        </h5>
                        <div className="flex items-center gap-1 text-[10px] text-slate-brand font-bold uppercase tracking-wider mt-0.5 self-end opacity-0 group-hover:opacity-100 transition-opacity">
                          <span>Register Session</span>
                          <ChevronRight className="w-3 h-3" />
                        </div>
                      </button>
                    ))}
                  </div>

                  <div className="pt-3 border-t border-fog/50 flex flex-col gap-2">
                    <button
                      type="button"
                      onClick={() => navigate('webinar-registration')}
                      className="w-full inline-flex justify-center items-center gap-2 py-3 bg-slate-brand hover:bg-ink text-white text-xs font-bold uppercase tracking-wider rounded shadow transition-premium cursor-pointer"
                    >
                      <span>Open Registration Suite</span>
                      <ChevronRight className="w-4 h-4 text-brass" />
                    </button>
                    
                    <p className="text-[10px] text-ink/50 text-center leading-normal italic font-sans font-medium">
                      All webinars include verified iCalendar invites & Fiduciary Competency tracking.
                    </p>
                  </div>
                </div>
              </div>

            </div>

            {/* Right Column: Request Custom On-Site Training (lg:col-span-7) */}
            <div className="lg:col-span-7">
              <div className="bg-white rounded-xl shadow-md border border-fog overflow-hidden text-left">
                <div className="bg-teal-brand text-paper p-5 border-b border-brass/20 space-y-1">
                  <span className="text-[10px] font-bold uppercase tracking-widest text-brass block">Organization Consultation</span>
                  <h4 className="font-serif text-lg font-bold text-white tracking-wide">Request Custom On-Site Training</h4>
                </div>

                {!inpersonSubmitted ? (
                  <form onSubmit={handleInpersonSubmit} className="p-6 space-y-4">
                    {inpersonError && (
                      <div className="p-3 bg-burgundy/5 text-burgundy text-xs font-semibold rounded border border-burgundy/15">
                        {inpersonError}
                      </div>
                    )}

                    <div className="space-y-4">
                      {/* Row 1: Organization Name & Approximate Board Size */}
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div className="space-y-1.5">
                          <label className="text-xs font-bold uppercase tracking-wider text-ink/55 block">Organization Name:</label>
                          <input
                            type="text"
                            required
                            value={orgName}
                            onChange={(e) => setOrgName(e.target.value)}
                            placeholder="Organization Corporation"
                            className="w-full bg-paper/20 border border-fog/80 focus:border-brass rounded-lg p-2.5 text-sm focus:outline-none focus:ring-1 focus:ring-brass transition-premium font-sans"
                          />
                        </div>

                        <div className="space-y-1.5">
                          <label className="text-xs font-bold uppercase tracking-wider text-ink/55 block">Approximate Board Size:</label>
                          <select
                            required
                            value={boardSize}
                            onChange={(e) => setBoardSize(e.target.value)}
                            className="w-full bg-paper/20 border border-fog/80 focus:border-brass rounded-lg p-2.5 text-sm focus:outline-none focus:ring-1 focus:ring-brass transition-premium font-sans cursor-pointer"
                          >
                            <option value="">-- Choose Size --</option>
                            <option value="3-5">3 to 5 Directors</option>
                            <option value="6-9">6 to 9 Directors</option>
                            <option value="10-15">10 to 15 Directors</option>
                            <option value="15+">15+ Directors</option>
                          </select>
                        </div>
                      </div>

                      {/* Row 2: Contact Person & Contact Email */}
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div className="space-y-1.5">
                          <label className="text-xs font-bold uppercase tracking-wider text-ink/55 block">Contact Person:</label>
                          <input
                            type="text"
                            required
                            value={contactName}
                            onChange={(e) => setContactName(e.target.value)}
                            placeholder="Board Chair or President"
                            className="w-full bg-paper/20 border border-fog/80 focus:border-brass rounded-lg p-2.5 text-sm focus:outline-none focus:ring-1 focus:ring-brass transition-premium font-sans"
                          />
                        </div>

                        <div className="space-y-1.5">
                          <label className="text-xs font-bold uppercase tracking-wider text-ink/55 block">Contact Email:</label>
                          <input
                            type="email"
                            required
                            value={contactEmail}
                            onChange={(e) => setContactEmail(e.target.value)}
                            placeholder="chair@yourorganization.org"
                            className="w-full bg-paper/20 border border-fog/80 focus:border-brass rounded-lg p-2.5 text-sm focus:outline-none focus:ring-1 focus:ring-brass transition-premium font-sans"
                          />
                        </div>
                      </div>
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-xs font-bold uppercase tracking-wider text-ink/55 block">Select Main Training Topic:</label>
                      <select
                        required
                        value={trainingTopic}
                        onChange={(e) => setTrainingTopic(e.target.value)}
                        className="w-full bg-paper/20 border border-fog/80 focus:border-brass rounded-lg p-2.5 text-sm focus:outline-none focus:ring-1 focus:ring-brass transition-premium font-sans font-medium cursor-pointer"
                      >
                        <option value="">-- Select Target Curriculum Area --</option>
                        <option value="onboarding">Board Onboarding & Fiduciary Duties (Care, Loyalty, Obedience)</option>
                        <option value="audit">Bylaws Auditing & State Registry Requirements</option>
                        <option value="compensation">Executive Compensation surveys & Safe Harbors (Form 990)</option>
                        <option value="boundaries">Strategic Deliberation & Governance vs. Management (40-40-20 Rule)</option>
                      </select>
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-xs font-bold uppercase tracking-wider text-ink/55 block">Optional Notes or Specific Concerns:</label>
                      <div className="p-3 bg-copper/5 border-l-2 border-copper rounded text-[11px] text-copper leading-relaxed font-sans font-medium">
                        <strong>⚠️ Privacy Notice:</strong> To protect your organization, please do not submit highly confidential details regarding active internal disputes, active board audits, or pending litigation here. This form is for general training inquiries only and does not establish attorney-client privilege.
                      </div>
                      <textarea
                        value={notes}
                        onChange={(e) => setNotes(e.target.value)}
                        placeholder="List any specific bylaws delinquency or IRS concerns..."
                        rows={3}
                        className="w-full bg-paper/20 border border-fog/80 focus:border-brass rounded-lg p-2.5 text-sm focus:outline-none focus:ring-1 focus:ring-brass transition-premium font-sans font-medium"
                      />
                    </div>

                    <button
                      type="submit"
                      className="w-full inline-flex justify-center items-center gap-2 py-3 bg-teal-brand hover:bg-ink text-white text-xs font-bold uppercase tracking-wider rounded shadow transition-premium cursor-pointer"
                    >
                      <span>Submit Training Request</span>
                      <ChevronRight className="w-4 h-4" />
                    </button>
                  </form>
                ) : (
                  /* In-Person Confirmation Screen */
                  <div className="p-8 text-center space-y-5 animate-fade-in font-medium">
                    <div className="w-12 h-12 bg-teal-brand/15 text-teal-brand rounded-full flex items-center justify-center mx-auto border border-teal-brand/30">
                      <Award className="w-6 h-6 animate-spin-slow" />
                    </div>
                    
                    <div className="space-y-2">
                      <h5 className="font-serif font-bold text-lg text-ink">Training Inquiry Received</h5>
                      <p className="text-xs text-ink/65 font-bold uppercase tracking-widest">{orgName} - {trainingTopic}</p>
                      <p className="text-xs sm:text-sm text-ink/85 leading-relaxed max-w-md mx-auto">
                        Thank you, <strong className="text-ink font-bold">{contactName}</strong>. Your workshop request has been successfully recorded. An attorney from <strong>NPO Lawyers</strong> will contact you at <strong className="text-ink font-bold">{contactEmail}</strong> within 2 business days to schedule a custom curriculum planning session.
                      </p>
                    </div>

                    <div className="pt-4 border-t border-fog/50">
                      <button
                        type="button"
                        onClick={() => {
                          setOrgName('');
                          setContactName('');
                          setContactEmail('');
                          setBoardSize('');
                          setTrainingTopic('');
                          setNotes('');
                          setInpersonSubmitted(false);
                        }}
                        className="text-xs font-extrabold uppercase tracking-wider text-teal-brand hover:text-brass transition-premium cursor-pointer"
                      >
                        Submit Another Workshop Inquiry
                      </button>
                    </div>
                  </div>
                )}
              </div>

            </div>

          </div>
        </div>
      </div>
    </Layout>
  );
};
export default Training;
