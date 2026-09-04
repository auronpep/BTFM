import React, { useState } from 'react';
import { Layout } from '../components/Layout';
import { useRouter } from '../components/Router';
import { 
  Clock, 
  Scale, 
  ShieldCheck, 
  Activity, 
  AlertTriangle, 
  ChevronRight, 
  User, 
  Mail, 
  Building, 
  Calendar, 
  Award, 
  AlertCircle,
  Play,
  Pause,
  Volume2,
  RotateCw
} from 'lucide-react';

import { parseTextWithStatutesAndGlossary } from '../components/StatuteTooltip';

// React-safe glossary parser (Enhancement 6)
const parseTextWithGlossary = (text: string): React.ReactNode => {
  return parseTextWithStatutesAndGlossary(text);
};

export const Boards101: React.FC = () => {
  const { navigate } = useRouter();
  // Form States
  const [orgName, setOrgName] = useState('');
  const [contactName, setContactName] = useState('');
  const [contactEmail, setContactEmail] = useState('');
  const [boardSize, setBoardSize] = useState('');
  const [preferredDate, setPreferredDate] = useState('');
  const [customConcerns, setCustomConcerns] = useState('');
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [formError, setFormError] = useState('');
  const [consentChecked, setConsentChecked] = useState(false);

  // Audio Lecture Desk States (Enhancement 6)
  const [playingLecture, setPlayingLecture] = useState<string | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);

  // 3-Minute Bylaws Quiz States (Enhancement 4)
  const [quizAnswers, setQuizAnswers] = useState<Record<number, string>>({});
  const [quizSubmitted, setQuizSubmitted] = useState(() => {
    try {
      return localStorage.getItem('cdx_bylaws_quick_check') !== null;
    } catch (e) {
      return false;
    }
  });
  const [quizScore, setQuizScore] = useState(() => {
    try {
      const saved = localStorage.getItem('cdx_bylaws_quick_check');
      return saved ? parseInt(saved) : 0;
    } catch (e) {
      return 0;
    }
  });

  const handleLectureToggle = (id: string) => {
    if (playingLecture === id) {
      setIsPlaying(!isPlaying);
    } else {
      setPlayingLecture(id);
      setIsPlaying(true);
    }
  };

  const handleQuizAnswer = (qIdx: number, val: string) => {
    if (quizSubmitted) return;
    setQuizAnswers(prev => ({
      ...prev,
      [qIdx]: val
    }));
  };

  const handleQuizSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (Object.keys(quizAnswers).length < 3) return;

    let score = 0;
    if (quizAnswers[1] === 'B') score++;
    if (quizAnswers[2] === 'C') score++;
    if (quizAnswers[3] === 'B') score++;

    try {
      localStorage.setItem('cdx_bylaws_quick_check', score.toString());
    } catch (e) {}

    setQuizScore(score);
    setQuizSubmitted(true);
  };

  const handleResetQuiz = () => {
    try {
      localStorage.removeItem('cdx_bylaws_quick_check');
    } catch (e) {}
    setQuizAnswers({});
    setQuizScore(0);
    setQuizSubmitted(false);
  };

  const lectures = [
    {
      id: 'lecture-1',
      title: '1. The Safe Harbor of Care: Proving Reasonableness',
      duration: '12 min',
      instructor: 'Myron Steeves, J.D.',
      description: 'How to establish reasonable inquiry, review independent reports, and document deliberations to gain safe harbor protection.'
    },
    {
      id: 'lecture-2',
      title: '2. Disinterested Quorums: Avoiding Penalties',
      duration: '15 min',
      instructor: 'Myron Steeves, J.D.',
      description: 'A training session on board independence rules (e.g., CA Corp Code § 5227) and protecting volunteer directors from self-dealing contracts.'
    },
    {
      id: 'lecture-3',
      title: '3. The Legal Minutes Shield: What to Show and What to Hide',
      duration: '10 min',
      instructor: 'Myron Steeves, J.D.',
      description: 'Best practices for recording dissent, board executive sessions, and formatting legal minutes for potential litigation discovery.'
    }
  ];

  const handleBookingSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!orgName || !contactName || !contactEmail || !boardSize || !preferredDate) {
      setFormError('Please complete all required fields.');
      return;
    }
    if (!consentChecked) {
      setFormError('Please acknowledge the informational disclaimer.');
      return;
    }
    setFormError('');

    const booking = {
      orgName,
      contactName,
      contactEmail,
      boardSize,
      preferredDate,
      customConcerns,
      submittedAt: new Date().toISOString()
    };

    // Save to localStorage to persist for demonstration
    const list = JSON.parse(localStorage.getItem('boards101_bookings') || '[]');
    list.push(booking);
    localStorage.setItem('boards101_bookings', JSON.stringify(list));

    setFormSubmitted(true);
  };

  return (
    <Layout>
      <div className="py-16 bg-paper/30 min-h-screen px-4 sm:px-6 lg:px-8 font-sans">
        <div className="max-w-6xl mx-auto space-y-12">
          
          {/* Hero Section */}
          <div className="text-center space-y-4">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-brass/10 border border-brass/30 text-brass rounded-full text-xs font-semibold uppercase tracking-wider">
              <Clock className="w-4 h-4" />
              <span>60-Minute Executive Session</span>
            </div>
            <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl text-ink font-bold tracking-wide">
              Boards 101: Core Governance Training
            </h1>
            <p className="max-w-3xl mx-auto text-sm sm:text-base text-ink/75 leading-relaxed">
              A strong board can save an organization enormous amounts of time, confusion, and unnecessary expense. A poorly trained board can do the opposite. Boards 101 is a 60-minute training session designed for nonprofit organizations nationwide, led by Myron Steeves, J.D., or his senior legal team.
            </p>
          </div>

          {/* Curriculum Highlights (Sourced from Real Documents) */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            
            {/* Detailed Course Content Columns (lg:col-span-7) */}
            <div className="lg:col-span-7 space-y-8 text-left">
              
              {/* Box: The Core Fiduciary Standard */}
              <div className="bg-white rounded-xl border border-fog p-6 sm:p-8 shadow-sm space-y-4 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-24 h-24 bg-brass/5 rounded-bl-full pointer-events-none" />
                <h3 className="font-serif text-xl sm:text-2xl text-ink font-bold tracking-tight border-b border-fog/60 pb-3 flex items-center gap-2">
                  <Scale className="w-5 h-5 text-brass" />
                  Three Fiduciary Duties of Nonprofit Directors
                </h3>
                <p className="text-xs sm:text-sm text-ink/80 leading-relaxed">
                  Every director's actions are bound by statutory law under three primary fiduciary standards:
                </p>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2">
                  <div className="bg-paper/50 p-4 rounded-lg border border-brass/15 space-y-1.5 flex flex-col h-full">
                    <h4 className="font-serif font-bold text-xs text-slate-brand uppercase tracking-wider">1. The Duty of Care</h4>
                    <p className="text-xs text-ink/70 leading-relaxed flex-grow">
                      {parseTextWithGlossary("Making decisions based on reasonable diligence, active attendance, and robust inquiry. Fiduciaries must actively investigate what they do not understand.")}
                    </p>
                  </div>
                  <div className="bg-paper/50 p-4 rounded-lg border border-brass/15 space-y-1.5 flex flex-col h-full">
                    <h4 className="font-serif font-bold text-xs text-slate-brand uppercase tracking-wider">2. The Duty of Loyalty</h4>
                    <p className="text-xs text-ink/70 leading-relaxed flex-grow">
                      {parseTextWithGlossary("Putting the organization's interests above personal financial or private concerns. Personal interests must never conflict with or infect board votes.")}
                    </p>
                  </div>
                  <div className="bg-paper/50 p-4 rounded-lg border border-brass/15 space-y-1.5 flex flex-col h-full">
                    <h4 className="font-serif font-bold text-xs text-slate-brand uppercase tracking-wider">3. The Duty of Obedience</h4>
                    <p className="text-xs text-ink/70 leading-relaxed flex-grow">
                      {parseTextWithGlossary("Remaining faithful to the organization's public charitable purpose, complying with bylaws and state/federal laws, and executing donor intent.")}
                    </p>
                  </div>
                </div>
              </div>

              {/* The Tripartite Standard Grid */}
              <div className="space-y-4">
                <h3 className="font-serif text-xl text-ink font-bold tracking-wide pl-2 border-l-4 border-brass">
                  The Tripartite Standard of Stewardship
                </h3>
                <p className="text-xs text-ink/65 leading-relaxed pl-2 font-medium">
                  A mature board redirects its efforts away from administrative meddling and organizes itself around three key jobs:
                </p>

                <div className="space-y-4">
                  {/* Job 1: Strategy */}
                  <div className="bg-white p-5 rounded-lg border border-fog shadow-xs flex gap-4 items-start">
                    <div className="bg-slate-brand/10 text-slate-brand p-2 rounded-lg border border-slate-brand/20 shrink-0">
                      <Activity className="w-5 h-5" />
                    </div>
                    <div className="space-y-1">
                      <h4 className="font-serif font-bold text-base text-ink">Strategy: 10-Year Long-Term Horizons</h4>
                      <p className="text-xs sm:text-sm text-ink/75 leading-relaxed">
                        Rather than rewriting charter purposes immediately, boards should envision the organization's landscape 10 years out—assessing revenue feasibility, measures of success, and capacity boundaries. This is condensed into a 3-year operational plan, which then informs the annual budget.
                      </p>
                      <p className="text-[11px] text-brass font-bold uppercase tracking-wider pt-1">
                        ★ Rule: Discuss budget generalities with the CEO and CFO 2 meetings before the fiscal year ends.
                      </p>
                    </div>
                  </div>

                  {/* Job 2: Safety */}
                  <div className="bg-white p-5 rounded-lg border border-fog shadow-xs flex gap-4 items-start">
                    <div className="bg-copper/10 text-copper p-2 rounded-lg border border-copper/20 shrink-0">
                      <ShieldCheck className="w-5 h-5" />
                    </div>
                    <div className="space-y-1">
                      <h4 className="font-serif font-bold text-base text-ink">Safety: Financial, Physical, & Legal Security</h4>
                      <p className="text-xs sm:text-sm text-ink/75 leading-relaxed">
                        Managing risk. Procuring comprehensive Directors & Officers (D&O) liability insurance. Implementing Live Scan screening, abuse-prevention policies, and worker safety. Ensuring strict IRS compliance regarding independent contractor vs. employee classification (e.g. musicians).
                      </p>
                      <p className="text-[11px] text-copper font-bold uppercase tracking-wider pt-1 flex items-center gap-1">
                        <AlertTriangle className="w-3.5 h-3.5" />
                        <span>CA Caution: Directors face personal liability if the corporation fails to register or withhold taxes!</span>
                      </p>
                    </div>
                  </div>

                  {/* Job 3: Audit */}
                  <div className="bg-white p-5 rounded-lg border border-fog shadow-xs flex gap-4 items-start">
                    <div className="bg-teal-brand/10 text-teal-brand p-2 rounded-lg border border-teal-brand/20 shrink-0">
                      <Scale className="w-5 h-5" />
                    </div>
                    <div className="space-y-1">
                      <h4 className="font-serif font-bold text-base text-ink">Audit: "Trust, But Verify" Standards</h4>
                      <p className="text-xs sm:text-sm text-ink/75 leading-relaxed">
                        You trust your CEO, but your fiduciary duty requires proof. We teach boards to review the CFO's reports by scrutinizing the <strong>10 biggest budget deviations</strong> to understand the strategic narrative, and verifying that the entity strictly abides by statutory guidelines.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* The 40-40-20 Rule & Chain of Command */}
              <div className="bg-white rounded-xl border border-fog p-6 sm:p-8 shadow-sm space-y-4">
                <h3 className="font-serif text-xl text-ink font-bold tracking-tight flex items-center gap-2">
                  <Award className="w-5 h-5 text-brass" />
                  Meeting Dynamics: The 40-40-20 Rule
                </h3>
                <p className="text-xs sm:text-sm text-ink/75 leading-relaxed">
                  An efficient board meeting demands high-quality materials. We teach directors how to implement the <strong>40-40-20 Rule</strong>:
                </p>
                <ul className="list-disc pl-5 text-xs text-ink/70 space-y-1.5 font-sans">
                  <li><strong>40% Pre-Meeting Preparation:</strong> Reviewing board packets, writing down questions, and identifying information gaps before arriving in the boardroom.</li>
                  <li><strong>40% Active Engagement:</strong> Spending the majority of the session questioning reporters, engaging with CEOs/CFOs, and debating key policies rather than listening to lectures.</li>
                  <li><strong>20% Future Vision:</strong> Dedicating the final portion of meetings to long-term strategic visioning and checking milestones.</li>
                </ul>
                <div className="bg-paper p-4 rounded border-l-4 border-brass/50 text-xs font-serif italic text-ink/85 mt-2">
                  "Individual directors do not hold independent authority. The chain of command dictates that authority resides only in the Board of Directors collectively, and only when actively in session."
                </div>
              </div>

              {/* Dean's Audio Lecture Desk (Enhancement 6) */}
              <div className="bg-white rounded-xl border border-fog p-6 sm:p-8 shadow-sm space-y-5 text-left relative overflow-hidden">
                <style>{`
                  @keyframes wave-bounce {
                    0%, 100% { height: 4px; }
                    50% { height: 28px; }
                  }
                  .wave-bar-1 { animation: wave-bounce 0.8s ease-in-out infinite; }
                  .wave-bar-2 { animation: wave-bounce 1.1s ease-in-out infinite; animation-delay: 0.15s; }
                  .wave-bar-3 { animation: wave-bounce 0.9s ease-in-out infinite; animation-delay: 0.3s; }
                  .wave-bar-4 { animation: wave-bounce 1.3s ease-in-out infinite; animation-delay: 0.05s; }
                  .wave-bar-5 { animation: wave-bounce 1.0s ease-in-out infinite; animation-delay: 0.25s; }
                  .wave-bar-6 { animation: wave-bounce 1.2s ease-in-out infinite; animation-delay: 0.1s; }
                `}</style>
                
                <div className="absolute top-0 right-0 w-24 h-24 bg-brass/5 rounded-bl-full pointer-events-none" />
                
                <div className="flex items-center justify-between border-b border-fog/60 pb-3">
                  <h3 className="font-serif text-xl text-ink font-bold tracking-tight flex items-center gap-2">
                    <Volume2 className="w-5 h-5 text-brass" />
                    Dean's Audio Lecture Desk
                  </h3>
                  <span className="text-[9px] font-extrabold text-brass uppercase tracking-widest bg-brass/10 px-2 py-0.5 rounded border border-brass/20">
                    Myron Steeves Audio Training Series
                  </span>
                </div>

                <p className="text-xs text-ink/70 leading-relaxed font-sans font-medium">
                  {parseTextWithGlossary("Listen to exclusive legal training sessions detailing statutory Duty of Care and Duty of Loyalty compliance strategies.")}
                </p>

                {/* Simulated Audio Player Box */}
                {playingLecture && (
                  <div className="bg-ink text-paper rounded-xl p-4 flex items-center justify-between gap-4 border border-brass/30 shadow-inner animate-fade-in">
                    <div className="space-y-1.5 text-left min-w-0">
                      <span className="text-[8px] font-bold uppercase tracking-widest text-brass block">
                        {isPlaying ? '▶ NOW STREAMING FIduciary LESSON' : '❚❚ AUDIO PAUSED'}
                      </span>
                      <h4 className="font-serif font-bold text-xs text-white truncate">
                        {lectures.find(l => l.id === playingLecture)?.title.substring(3)}
                      </h4>
                      <p className="text-[9px] text-paper/60 font-sans font-medium">
                        Instructor: Myron Steeves, J.D. • {lectures.find(l => l.id === playingLecture)?.duration} Lecture
                      </p>
                    </div>

                    <div className="flex items-center gap-4 shrink-0">
                      {/* Audio Pulse Bars */}
                      <div className="flex items-end gap-0.5 h-8 w-12 justify-center">
                        <div className={`w-1 bg-brass rounded-t ${isPlaying ? 'wave-bar-1' : 'h-1'}`} />
                        <div className={`w-1 bg-brass rounded-t ${isPlaying ? 'wave-bar-2' : 'h-1'}`} />
                        <div className={`w-1 bg-brass rounded-t ${isPlaying ? 'wave-bar-3' : 'h-1'}`} />
                        <div className={`w-1 bg-brass rounded-t ${isPlaying ? 'wave-bar-4' : 'h-1'}`} />
                        <div className={`w-1 bg-brass rounded-t ${isPlaying ? 'wave-bar-5' : 'h-1'}`} />
                        <div className={`w-1 bg-brass rounded-t ${isPlaying ? 'wave-bar-6' : 'h-1'}`} />
                      </div>

                      <button
                        onClick={() => setIsPlaying(!isPlaying)}
                        className="w-9 h-9 rounded-full bg-brass hover:bg-white text-ink flex items-center justify-center shadow-md transition-premium cursor-pointer"
                      >
                        {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4 pl-0.5" />}
                      </button>
                    </div>
                  </div>
                )}

                {/* Lectures List */}
                <div className="space-y-3 pt-2">
                  {lectures.map((lec) => {
                    const isCurrent = playingLecture === lec.id;
                    return (
                      <div 
                        key={lec.id}
                        className={`p-3.5 rounded-lg border transition-premium text-left flex items-start justify-between gap-4 ${
                          isCurrent 
                            ? 'border-brass bg-brass/5 shadow-sm' 
                            : 'border-fog hover:border-brass/30 bg-paper/10 hover:bg-paper/30'
                        }`}
                      >
                        <div className="space-y-1">
                          <div className="flex items-center gap-2">
                            <span className="font-serif font-black text-xs text-ink">{lec.title}</span>
                            <span className="text-[8px] font-bold uppercase tracking-wider text-ink/40 bg-fog px-1.5 py-0.5 rounded">
                              {lec.duration}
                            </span>
                          </div>
                          <p className="text-[10px] text-ink/65 leading-relaxed font-sans font-medium">
                            {lec.description}
                          </p>
                        </div>

                        <button
                          onClick={() => handleLectureToggle(lec.id)}
                          className={`p-1.5 rounded-md border shrink-0 transition-premium cursor-pointer ${
                            isCurrent && isPlaying
                              ? 'bg-burgundy border-burgundy text-white hover:bg-ink hover:border-ink'
                              : 'bg-white border-fog/80 hover:border-brass/65 text-brass hover:text-ink'
                          }`}
                        >
                          {isCurrent && isPlaying ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5 pl-0.5" />}
                        </button>
                      </div>
                    );
                  })}
                </div>
              </div>

            </div>

            {/* Interactive Booking Sidebar Form (lg:col-span-5) */}
            <div className="lg:col-span-5 bg-white rounded-xl shadow-md border border-fog overflow-hidden sticky top-24">
              <div className="bg-ink text-paper p-5 border-b border-brass/20 text-left space-y-1">
                <span className="text-[10px] font-bold uppercase tracking-widest text-brass block">Custom Curriculum Facilitation</span>
                <h4 className="font-serif text-lg font-bold text-white tracking-wide">Book Boards 101 Training</h4>
              </div>

              {!formSubmitted ? (
                <form onSubmit={handleBookingSubmit} className="p-6 text-left space-y-4 font-sans">
                  {formError && (
                    <div className="p-3 bg-burgundy/5 text-burgundy text-xs font-semibold rounded border border-burgundy/15 flex items-center gap-1.5">
                      <AlertCircle className="w-4 h-4 shrink-0" />
                      <span>{formError}</span>
                    </div>
                  )}

                  <div className="space-y-1.5">
                    <label htmlFor="booking-org" className="text-xs font-bold uppercase tracking-wider text-ink/55 block">Organization Name <span className="text-burgundy">*</span></label>
                    <div className="relative">
                      <Building className="absolute left-3 top-3 w-4 h-4 text-ink/30" />
                      <input
                        id="booking-org"
                        type="text"
                        required
                        value={orgName}
                        onChange={(e) => setOrgName(e.target.value)}
                        placeholder="Organization or Foundation"
                        className="w-full bg-paper/20 border border-fog/80 focus:border-brass rounded-lg p-2.5 pl-9 text-sm focus:outline-none focus:ring-1 focus:ring-brass transition-premium"
                      />
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <label htmlFor="booking-board-size" className="text-xs font-bold uppercase tracking-wider text-ink/55 block">Board Size <span className="text-burgundy">*</span></label>
                    <select
                      id="booking-board-size"
                      required
                      value={boardSize}
                      onChange={(e) => setBoardSize(e.target.value)}
                      className="w-full bg-paper/20 border border-fog/80 focus:border-brass rounded-lg p-2.5 text-sm focus:outline-none focus:ring-1 focus:ring-brass transition-premium"
                    >
                      <option value="">-- Choose Board Size --</option>
                      <option value="3-5">Small Board (3 to 5 Directors)</option>
                      <option value="6-9">Medium Board (6 to 9 Directors)</option>
                      <option value="10-15">Established Board (10 to 15 Directors)</option>
                      <option value="15+">Large Institutional Board (15+ Directors)</option>
                    </select>
                  </div>

                  <div className="space-y-1.5">
                    <label htmlFor="booking-contact" className="text-xs font-bold uppercase tracking-wider text-ink/55 block">Contact Person Name <span className="text-burgundy">*</span></label>
                    <div className="relative">
                      <User className="absolute left-3 top-3 w-4 h-4 text-ink/30" />
                      <input
                        id="booking-contact"
                        type="text"
                        required
                        value={contactName}
                        onChange={(e) => setContactName(e.target.value)}
                        placeholder="President or Chair Name"
                        className="w-full bg-paper/20 border border-fog/80 focus:border-brass rounded-lg p-2.5 pl-9 text-sm focus:outline-none focus:ring-1 focus:ring-brass transition-premium"
                      />
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <label htmlFor="booking-email" className="text-xs font-bold uppercase tracking-wider text-ink/55 block">Contact Email Address <span className="text-burgundy">*</span></label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-3 w-4 h-4 text-ink/30" />
                      <input
                        id="booking-email"
                        type="email"
                        required
                        value={contactEmail}
                        onChange={(e) => setContactEmail(e.target.value)}
                        placeholder="president@yourorganization.org"
                        className="w-full bg-paper/20 border border-fog/80 focus:border-brass rounded-lg p-2.5 pl-9 text-sm focus:outline-none focus:ring-1 focus:ring-brass transition-premium"
                      />
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <label htmlFor="booking-date" className="text-xs font-bold uppercase tracking-wider text-ink/55 block">Preferred Training Date <span className="text-burgundy">*</span></label>
                    <div className="relative">
                      <Calendar className="absolute left-3 top-3 w-4 h-4 text-ink/30" />
                      <input
                        id="booking-date"
                        type="date"
                        required
                        value={preferredDate}
                        onChange={(e) => setPreferredDate(e.target.value)}
                        className="w-full bg-paper/20 border border-fog/80 focus:border-brass rounded-lg p-2.5 pl-9 text-sm focus:outline-none focus:ring-1 focus:ring-brass transition-premium"
                      />
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <label htmlFor="booking-focus" className="text-xs font-bold uppercase tracking-wider text-ink/55 block">Bylaws Concerns or Specific Focus Areas:</label>
                    <div className="p-3 bg-copper/5 border-l-2 border-copper rounded text-[11px] text-copper leading-relaxed font-sans font-medium mb-1.5">
                      <strong>⚠️ Privacy Notice:</strong> To protect your organization, please do not submit highly confidential details regarding active disputes or pending litigation here. This form is for booking inquiries only and does not establish an attorney-client relationship.
                    </div>
                    <textarea
                      id="booking-focus"
                      value={customConcerns}
                      onChange={(e) => setCustomConcerns(e.target.value)}
                      placeholder="e.g. Audit threshold, executive salary safe harbor, minutes reviews..."
                      rows={3}
                      className="w-full bg-paper/20 border border-fog/80 focus:border-brass rounded-lg p-2.5 text-sm focus:outline-none focus:ring-1 focus:ring-brass transition-premium"
                    />
                  </div>

                  <div className="flex items-start gap-2.5 bg-paper/30 p-4 rounded-lg border border-fog/50">
                    <input
                      type="checkbox"
                      id="booking-consent"
                      required
                      checked={consentChecked}
                      onChange={(e) => setConsentChecked(e.target.checked)}
                      className="mt-0.5 w-4 h-4 rounded border-fog text-brass focus:ring-brass cursor-pointer"
                    />
                    <label htmlFor="booking-consent" className="text-[11px] text-ink/75 leading-relaxed font-sans font-medium cursor-pointer select-none">
                      I understand this is a request for training information and educational materials. I agree that submitting this form does not form a binding legal contract or establish an attorney-client relationship.
                    </label>
                  </div>

                  <button
                    type="submit"
                    className="w-full inline-flex justify-center items-center gap-2 py-3 bg-brass hover:bg-ink text-ink hover:text-white text-xs font-bold uppercase tracking-wider rounded shadow cursor-pointer transition-premium"
                  >
                    <span>Request Faculty Booking</span>
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </form>
              ) : (
                /* Succesful Mock Booking State */
                <div className="p-8 text-center space-y-5 animate-fade-in font-sans">
                  <div className="w-12 h-12 bg-teal-brand/15 text-teal-brand rounded-full flex items-center justify-center mx-auto border border-teal-brand/30">
                    <ShieldCheck className="w-6 h-6" />
                  </div>
                  
                  <div className="space-y-2">
                    <h5 className="font-serif font-bold text-lg text-ink">Booking Inquiry Logged</h5>
                    <p className="text-[10px] text-brass uppercase font-bold tracking-widest">{orgName} • Board of {boardSize}</p>
                    <p className="text-xs sm:text-sm text-ink/75 leading-relaxed max-w-sm mx-auto">
                      Congratulations, <strong className="text-ink font-semibold">{contactName}</strong>! Your Boards 101 training session inquiry for <strong className="text-ink font-semibold">{preferredDate}</strong> has been logged locally in `localStorage`.
                    </p>
                    <p className="text-xs text-ink/60 leading-relaxed max-w-sm mx-auto pt-1">
                      A coordinator from <strong>NPO Lawyers</strong> will reach out to you at <strong className="text-ink font-semibold">{contactEmail}</strong> to review your bylaws structure and confirm scheduling details.
                    </p>
                  </div>

                  <div className="pt-4 border-t border-fog/50">
                    <button
                      onClick={() => {
                        setFormSubmitted(false);
                        setOrgName('');
                        setCustomConcerns('');
                      }}
                      className="text-xs font-bold uppercase tracking-wider text-slate-brand hover:text-brass transition-premium"
                    >
                      Book For Another Entity
                    </button>
                  </div>
                </div>
              )}
            </div>

          </div>

          {/* 3-Minute Bylaws Health-Check Quick Quiz (Enhancement 4) */}
          <div className="bg-white rounded-xl border border-fog p-6 sm:p-8 shadow-sm text-left space-y-6">
            <div className="flex justify-between items-start gap-4 border-b border-fog/60 pb-4">
              <div className="space-y-1">
                <div className="inline-flex items-center gap-1.5 text-xs text-brass font-bold uppercase tracking-wider">
                  <Activity className="w-4 h-4 animate-pulse" />
                  <span>Interactive Fiduciary Checkup</span>
                </div>
                <h3 className="font-serif text-xl sm:text-2xl text-ink font-bold tracking-tight">
                  3-Minute Bylaws Health-Check
                </h3>
                <p className="text-xs text-ink/70 leading-relaxed font-sans font-medium max-w-xl">
                  Are your corporate bylaws protecting your board, or exposing directors to personal statutory liability? Complete this quick 3-question diagnostic to audit your governance hygiene.
                </p>
              </div>

              {quizSubmitted && (
                <button
                  onClick={handleResetQuiz}
                  className="inline-flex items-center gap-1 text-[10px] font-bold uppercase tracking-wider text-burgundy border border-burgundy/25 rounded bg-burgundy/5 px-2.5 py-1.5 hover:bg-burgundy hover:text-white transition-premium cursor-pointer"
                >
                  <RotateCw className="w-3 h-3" />
                  <span>Retake Audit</span>
                </button>
              )}
            </div>

            {!quizSubmitted ? (
              <form onSubmit={handleQuizSubmit} className="space-y-6 font-sans">
                {/* Q1 */}
                <div className="space-y-3 text-left">
                  <h4 className="font-serif font-bold text-sm sm:text-base text-ink flex gap-2">
                    <span className="text-brass">Q1:</span>
                    <span>What percentage of your nonprofit board can be "interested" (i.e. paid employees, the CEO, or their direct relatives on payroll) under typical state independence rules?</span>
                  </h4>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    {[
                      { key: 'A', text: 'Up to 100% can be paid employees.' },
                      { key: 'B', text: 'Strictly less than 49% (meaning at least 51% must be independent and unrelated).' },
                      { key: 'C', text: 'No more than 80% can be on the payroll.' }
                    ].map(opt => (
                      <button
                        key={opt.key}
                        type="button"
                        onClick={() => handleQuizAnswer(1, opt.key)}
                        className={`p-3.5 text-xs text-left rounded-lg border flex gap-3 transition-premium cursor-pointer ${
                          quizAnswers[1] === opt.key
                            ? 'border-brass bg-brass/5 font-bold shadow-sm'
                            : 'border-fog/70 hover:border-brass/35 bg-paper/5 hover:bg-paper/20'
                        }`}
                      >
                        <span className={`w-5 h-5 rounded-full border flex items-center justify-center shrink-0 ${
                          quizAnswers[1] === opt.key ? 'bg-brass text-ink border-brass font-bold' : 'border-fog text-ink/40'
                        }`}>
                          {opt.key}
                        </span>
                        <span className="text-ink/80 leading-normal">{opt.text}</span>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Q2 */}
                <div className="space-y-3 text-left border-t border-fog/40 pt-4">
                  <h4 className="font-serif font-bold text-sm sm:text-base text-ink flex gap-2">
                    <span className="text-brass">Q2:</span>
                    <span>When reviewing or voting on executive compensation under IRC § 4958 comparable standards, does the CEO participate?</span>
                  </h4>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    {[
                      { key: 'A', text: 'Yes, the CEO runs the meeting and votes.' },
                      { key: 'B', text: 'Yes, the CEO participates in discussion but recuses from voting.' },
                      { key: 'C', text: 'No, the CEO and all payroll-interested directors must physically leave the room during both debate and voting.' }
                    ].map(opt => (
                      <button
                        key={opt.key}
                        type="button"
                        onClick={() => handleQuizAnswer(2, opt.key)}
                        className={`p-3.5 text-xs text-left rounded-lg border flex gap-3 transition-premium cursor-pointer ${
                          quizAnswers[2] === opt.key
                            ? 'border-brass bg-brass/5 font-bold shadow-sm'
                            : 'border-fog/70 hover:border-brass/35 bg-paper/5 hover:bg-paper/20'
                        }`}
                      >
                        <span className={`w-5 h-5 rounded-full border flex items-center justify-center shrink-0 ${
                          quizAnswers[2] === opt.key ? 'bg-brass text-ink border-brass font-bold' : 'border-fog text-ink/40'
                        }`}>
                          {opt.key}
                        </span>
                        <span className="text-ink/80 leading-normal">{opt.text}</span>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Q3 */}
                <div className="space-y-3 text-left border-t border-fog/40 pt-4">
                  <h4 className="font-serif font-bold text-sm sm:text-base text-ink flex gap-2">
                    <span className="text-brass">Q3:</span>
                    <span>How often are nonprofit directors required to sign a written Conflict of Interest disclosure questionnaire?</span>
                  </h4>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    {[
                      { key: 'A', text: 'Once, when they initially join the board.' },
                      { key: 'B', text: 'Formally every year (typically at the annual meeting).' },
                      { key: 'C', text: 'Only if an active, direct conflict arises.' }
                    ].map(opt => (
                      <button
                        key={opt.key}
                        type="button"
                        onClick={() => handleQuizAnswer(3, opt.key)}
                        className={`p-3.5 text-xs text-left rounded-lg border flex gap-3 transition-premium cursor-pointer ${
                          quizAnswers[3] === opt.key
                            ? 'border-brass bg-brass/5 font-bold shadow-sm'
                            : 'border-fog/70 hover:border-brass/35 bg-paper/5 hover:bg-paper/20'
                        }`}
                      >
                        <span className={`w-5 h-5 rounded-full border flex items-center justify-center shrink-0 ${
                          quizAnswers[3] === opt.key ? 'bg-brass text-ink border-brass font-bold' : 'border-fog text-ink/40'
                        }`}>
                          {opt.key}
                        </span>
                        <span className="text-ink/80 leading-normal">{opt.text}</span>
                      </button>
                    ))}
                  </div>
                </div>

                <div className="pt-4 border-t border-fog/50 flex justify-end">
                  <button
                    type="submit"
                    disabled={Object.keys(quizAnswers).length < 3}
                    className="px-6 py-3 bg-brass hover:bg-ink text-ink hover:text-white disabled:bg-fog disabled:text-ink/30 disabled:border-transparent text-xs font-bold uppercase tracking-wider rounded shadow transition-premium cursor-pointer disabled:cursor-not-allowed"
                  >
                    Calculate Compliance score
                  </button>
                </div>
              </form>
            ) : (
              /* Graded Outcome State */
              <div className="space-y-6 animate-fade-in font-sans">
                {/* Result Banners */}
                {quizScore === 3 ? (
                  <div className="border border-emerald-500 bg-emerald-50/50 p-6 rounded-xl space-y-3">
                    <div className="flex items-center gap-2 text-emerald-800 font-extrabold uppercase text-xs tracking-wider">
                      <ShieldCheck className="w-5 h-5" />
                      <span>Grade A — Fully Safe Harbor Aligned</span>
                    </div>
                    <p className="text-xs sm:text-sm text-emerald-900 leading-relaxed font-sans font-medium">
                      Congratulations! Your understanding of board requirements is flawless. You answered <strong>3 out of 3</strong> questions correctly. Your board is positioned with a strong regulatory shield, satisfying quorums and executive compensation rules.
                    </p>
                    <p className="text-xs text-emerald-800 leading-relaxed max-w-2xl font-medium pt-1">
                      To maintain this level of fiduciary hygiene, we recommend downloading our <strong>Defensive Minutes Template</strong> and <strong>Annual Compliance Calendar</strong> from our library.
                    </p>
                  </div>
                ) : quizScore === 2 ? (
                  <div className="border border-brass bg-brass/5 p-6 rounded-xl space-y-4">
                    <div className="flex items-center gap-2 text-brass font-extrabold uppercase text-xs tracking-wider">
                      <AlertTriangle className="w-5 h-5 text-brass" />
                      <span>Grade C — Compliance Gaps Identified</span>
                    </div>
                    <p className="text-xs sm:text-sm text-ink/80 leading-relaxed font-sans font-medium">
                      You answered <strong>2 out of 3</strong> questions correctly. While you understand some core fiduciary parameters, critical compliance gaps exist. Obsolete quorum provisions (allowing paid employees to control votes) or bad recusal procedures are the leading causes of state Attorney General corporate registry suspensions.
                    </p>
                    
                    {/* Legal Consultation Escalation */}
                    <div className="bg-burgundy/5 border-l-4 border-burgundy p-4 rounded-r-lg space-y-2">
                      <h4 className="font-serif font-bold text-xs text-ink">Bylaws Deficiencies Create Volunteer Liability Exposure</h4>
                      <p className="text-xs text-ink/75 leading-relaxed">
                        Volunteer directors lose their personal civil immunity if bylaws do not strictly isolate voting and officer self-dealing thresholds. We recommend a professional <strong>Bylaws and Board Governance Audit</strong> with legal counsel.
                      </p>
                      <div className="pt-1">
                        <button
                          onClick={() => navigate('contact-us?topic=bylaws&message=We%20would%20like%20to%20request%20a%20privileged%20bylaws%20and%20governance%20audit.')}
                          className="inline-flex items-center gap-1 bg-burgundy hover:bg-ink text-white text-[10px] font-bold uppercase tracking-wider py-1.5 px-3 rounded shadow transition-premium cursor-pointer border-0"
                        >
                          <span>Request Privileged Bylaws Audit ➜</span>
                        </button>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="border border-burgundy/30 bg-burgundy/5 p-6 rounded-xl space-y-4">
                    <div className="flex items-center gap-2 text-burgundy font-extrabold uppercase text-xs tracking-wider">
                      <AlertCircle className="w-5 h-5" />
                      <span>Grade F — Severe Regulatory Exposure</span>
                    </div>
                    <p className="text-xs sm:text-sm text-burgundy leading-relaxed font-sans font-medium">
                      Critical Risk Warning! You answered <strong>{quizScore} out of 3</strong> questions correctly. Your board is likely operating under dangerous procedural deficiencies regarding CA Corp Code § 5227 or IRS excess benefit penalties. Unvoted self-dealing contract approvals or staff voting control can void corporate actions and trigger immediate IRS excise penalties up to 200%.
                    </p>

                    {/* Legal Consultation Escalation */}
                    <div className="bg-burgundy border-l-4 border-brass p-4 rounded-r-lg space-y-2.5 text-paper">
                      <h4 className="font-serif font-bold text-xs text-white">Privileged Board Governance Intervention Required</h4>
                      <p className="text-xs text-paper/85 leading-relaxed font-medium">
                        Operating under outdated, un-audited bylaws strips directors of legal shields and subjects officers to personal liability. Secure a direct legal evaluation with Myron Steeves, J.D. and CCNL under professional attorney-client privilege.
                      </p>
                      <div className="pt-1">
                        <button
                          onClick={() => navigate('contact-us?topic=general&message=We%20would%20like%20to%20consult%20with%20counsel%20concerning%20critical%20boardroom%20quiz%20exposures.')}
                          className="inline-flex items-center gap-1 bg-brass text-ink font-sans font-black text-[10px] uppercase tracking-wider py-2 px-4.5 rounded shadow hover:bg-white hover:text-ink transition-premium cursor-pointer border-0"
                        >
                          <span>Consult Attorney Privately ➜</span>
                        </button>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Core Support / Disclaimers Row */}
          <div className="bg-ink rounded-xl border border-brass/30 p-8 text-paper text-left grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
            <div className="md:col-span-8 space-y-2">
              <h3 className="font-serif text-lg sm:text-xl text-white font-bold">Fiduciary Certification & D&O Coverage</h3>
              <p className="text-xs sm:text-sm text-paper/85 leading-relaxed font-sans">
                Many Directors and Officers (D&O) liability insurance carriers look favorably upon boards that engage in regular, documented professional governance training. Upon completion of our <strong>Boards 101</strong> 60-minute session, your board of directors will receive an official <strong>Certificate of Fiduciary Competency</strong>, establishing formal evidence of due diligence for your corporate records.
              </p>
            </div>
            <div className="md:col-span-4 flex justify-start md:justify-end">
              <button 
                onClick={() => navigate('contact-us?topic=fiduciary&message=We%20would%20like%20to%20request%20information%20on%20obtaining%20the%20Certificate%20of%20Fiduciary%20Competency%20for%20our%20board%20of%20directors%20through%20your%20training%20programs.')}
                className="inline-flex items-center gap-1.5 px-5 py-3 bg-brass hover:bg-white hover:text-ink text-ink font-bold uppercase tracking-wider text-xs rounded transition-premium cursor-pointer border-0"
              >
                <span>Request Fiduciary Training</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>

        </div>
      </div>
    </Layout>
  );
};

export default Boards101;
