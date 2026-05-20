import React, { useState } from 'react';
import { Layout } from '../components/Layout';
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
  AlertCircle
} from 'lucide-react';

export const Boards101: React.FC = () => {
  // Form States
  const [orgName, setOrgName] = useState('');
  const [contactName, setContactName] = useState('');
  const [contactEmail, setContactEmail] = useState('');
  const [boardSize, setBoardSize] = useState('');
  const [preferredDate, setPreferredDate] = useState('');
  const [customConcerns, setCustomConcerns] = useState('');
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [formError, setFormError] = useState('');

  const handleBookingSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!orgName || !contactName || !contactEmail || !boardSize || !preferredDate) {
      setFormError('Please complete all required fields.');
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
              A strong board can save an organization enormous amounts of time, confusion, and unnecessary expense. A poorly trained board can do the opposite. Boards 101 is a 60-minute training session designed specifically for California nonprofit organizations, led by Myron Steeves, J.D., or his senior legal team.
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
                  Two Fiduciary Responsibilities
                </h3>
                <p className="text-xs sm:text-sm text-ink/80 leading-relaxed">
                  Every director's actions are bound by California statutory law under two primary fiduciary standard vectors:
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                  <div className="bg-paper/50 p-4 rounded-lg border border-brass/15 space-y-1.5">
                    <h4 className="font-serif font-bold text-sm text-slate-brand">1. The Duty of Loyalty</h4>
                    <p className="text-xs text-ink/70 leading-relaxed">
                      Caring about the nonprofit organization more than yourself when conflicts or business opportunities arise. Personal interests must never infect board votes.
                    </p>
                  </div>
                  <div className="bg-paper/50 p-4 rounded-lg border border-brass/15 space-y-1.5">
                    <h4 className="font-serif font-bold text-sm text-slate-brand">2. The Duty of Care</h4>
                    <p className="text-xs text-ink/70 leading-relaxed">
                      Making decisions based on reasonable diligence, regular meeting attendance, and robust inquiry. Fiduciaries must actively investigate what they do not understand.
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
                        You trust your CEO, but your fiduciary duty requires proof. We teach boards to review the CFO's reports by scrutinizing the **10 biggest budget deviations** to understand the strategic narrative, and verifying that the entity strictly abides by California's statutory guidelines.
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
                  An efficient board meeting demands high-quality materials. We teach directors how to implement the **40-40-20 Rule**:
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
                    <label className="text-xs font-bold uppercase tracking-wider text-ink/55 block">Organization Name <span className="text-burgundy">*</span></label>
                    <div className="relative">
                      <Building className="absolute left-3 top-3 w-4 h-4 text-ink/30" />
                      <input
                        type="text"
                        required
                        value={orgName}
                        onChange={(e) => setOrgName(e.target.value)}
                        placeholder="Nonprofit or Foundation"
                        className="w-full bg-paper/20 border border-fog/80 focus:border-brass rounded-lg p-2.5 pl-9 text-sm focus:outline-none focus:ring-1 focus:ring-brass transition-premium"
                      />
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-bold uppercase tracking-wider text-ink/55 block">Board Size <span className="text-burgundy">*</span></label>
                    <select
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
                    <label className="text-xs font-bold uppercase tracking-wider text-ink/55 block">Contact Person Name <span className="text-burgundy">*</span></label>
                    <div className="relative">
                      <User className="absolute left-3 top-3 w-4 h-4 text-ink/30" />
                      <input
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
                    <label className="text-xs font-bold uppercase tracking-wider text-ink/55 block">Contact Email Address <span className="text-burgundy">*</span></label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-3 w-4 h-4 text-ink/30" />
                      <input
                        type="email"
                        required
                        value={contactEmail}
                        onChange={(e) => setContactEmail(e.target.value)}
                        placeholder="president@yournonprofit.org"
                        className="w-full bg-paper/20 border border-fog/80 focus:border-brass rounded-lg p-2.5 pl-9 text-sm focus:outline-none focus:ring-1 focus:ring-brass transition-premium"
                      />
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-bold uppercase tracking-wider text-ink/55 block">Preferred Training Date <span className="text-burgundy">*</span></label>
                    <div className="relative">
                      <Calendar className="absolute left-3 top-3 w-4 h-4 text-ink/30" />
                      <input
                        type="date"
                        required
                        value={preferredDate}
                        onChange={(e) => setPreferredDate(e.target.value)}
                        className="w-full bg-paper/20 border border-fog/80 focus:border-brass rounded-lg p-2.5 pl-9 text-sm focus:outline-none focus:ring-1 focus:ring-brass transition-premium"
                      />
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-bold uppercase tracking-wider text-ink/55 block">Bylaws Concerns or Specific Focus Areas:</label>
                    <textarea
                      value={customConcerns}
                      onChange={(e) => setCustomConcerns(e.target.value)}
                      placeholder="e.g. Audit threshold, executive salary safe harbor, minutes reviews..."
                      rows={3}
                      className="w-full bg-paper/20 border border-fog/80 focus:border-brass rounded-lg p-2.5 text-sm focus:outline-none focus:ring-1 focus:ring-brass transition-premium"
                    />
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
                      A coordinator from the **California Center for Nonprofit Law** will reach out to you at <strong className="text-ink font-semibold">{contactEmail}</strong> to review your bylaws structure and confirm scheduling details.
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

          {/* Core Support / Disclaimers Row */}
          <div className="bg-ink rounded-xl border border-brass/30 p-8 text-paper text-left grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
            <div className="md:col-span-8 space-y-2">
              <h3 className="font-serif text-lg sm:text-xl text-white font-bold">Fiduciary Certification & D&O Coverage</h3>
              <p className="text-xs sm:text-sm text-paper/85 leading-relaxed font-sans">
                Many Directors and Officers (D&O) liability insurance carriers look favorably upon boards that engage in regular, documented professional governance training. Upon completion of our **Boards 101** 60-minute session, your board of directors will receive an official **Certificate of Fiduciary Competency**, establishing formal evidence of due diligence for your corporate records.
              </p>
            </div>
            <div className="md:col-span-4 flex justify-start md:justify-end">
              <a 
                href="https://npolawyers.com" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="inline-flex items-center gap-1.5 px-5 py-3 bg-brass hover:bg-white hover:text-ink text-ink font-bold uppercase tracking-wider text-xs rounded transition-premium cursor-pointer"
              >
                <span>NPO Lawyers Support</span>
                <ChevronRight className="w-4 h-4" />
              </a>
            </div>
          </div>

        </div>
      </div>
    </Layout>
  );
};

export default Boards101;
