import React, { useState } from 'react';
import { Layout } from '../components/Layout';
import { Calendar, User, Mail, ShieldCheck, CheckCircle2, ChevronRight, Award, GraduationCap, Building } from 'lucide-react';

export const Training: React.FC = () => {

  // 1. Webinar Form States
  const [webinarName, setWebinarName] = useState('');
  const [webinarEmail, setWebinarEmail] = useState('');
  const [selectedWebinar, setSelectedWebinar] = useState('');
  const [webinarSubmitted, setWebinarId] = useState<string | null>(null);
  const [webinarError, setWebinarError] = useState('');

  // 2. In-Person Inquiry Form States
  const [orgName, setOrgName] = useState('');
  const [contactName, setContactName] = useState('');
  const [contactEmail, setContactEmail] = useState('');
  const [boardSize, setBoardSize] = useState('');
  const [trainingTopic, setTrainingTopic] = useState('');
  const [notes, setNotes] = useState('');
  const [inpersonSubmitted, setInpersonSubmitted] = useState(false);
  const [inpersonError, setInpersonError] = useState('');

  const webinarsList = [
    { id: 'webinar-comp', title: 'Fiduciary Duty & Executive Compensation Safe Harbor (IRS § 4958)', date: 'June 18, 2026', time: '10:00 AM - 11:30 AM PST' },
    { id: 'webinar-audit', title: 'California $2M Independent Audit & Audit Committee Mandate', date: 'July 15, 2026', time: '1:00 PM - 2:00 PM PST' },
    { id: 'webinar-minutes', title: 'Drafting Defensive Meeting Minutes & Corporate Records', date: 'August 11, 2026', time: '11:00 AM - 12:00 PM PST' }
  ];

  const handleWebinarSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!webinarName || !webinarEmail || !selectedWebinar) {
      setWebinarError('Please complete all form fields.');
      return;
    }
    setWebinarError('');
    
    // Save to localStorage for demo persistence
    const reg = { name: webinarName, email: webinarEmail, webinarId: selectedWebinar, date: new Date().toISOString() };
    const list = JSON.parse(localStorage.getItem('webinar_registrations') || '[]');
    list.push(reg);
    localStorage.setItem('webinar_registrations', JSON.stringify(list));

    const confirmed = webinarsList.find(w => w.id === selectedWebinar);
    setWebinarId(confirmed ? confirmed.title : 'Selected Webinar');
  };

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
        <div className="max-w-5xl mx-auto space-y-12">
          
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
                Our webinars are short, intensive, and designed directly for California nonprofit board members. Each session focuses on a specific, high-risk fiduciary compliance topic, providing practical checklists and ask-this question scripts.
              </p>
              <ul className="space-y-2 text-xs font-medium text-ink/80 pt-2">
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-brass mt-0.5 shrink-0" />
                  <span>Interactive Q&A session with California nonprofit attorneys.</span>
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
                  <span>Facilitated by California Center for Nonprofit Law legal counsels.</span>
                </li>
              </ul>
            </div>
          </div>

          {/* Interactive Forms Section */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            
            {/* Left: Webinar Registration (lg:col-span-5) */}
            <div className="lg:col-span-5 bg-white rounded-xl shadow-md border border-fog overflow-hidden">
              <div className="bg-slate-brand text-paper p-5 border-b border-brass/20 text-left space-y-1">
                <span className="text-[10px] font-bold uppercase tracking-widest text-brass block">Immediate Enrollment</span>
                <h4 className="font-serif text-lg font-bold text-white tracking-wide">Webinar Registration</h4>
              </div>

              {!webinarSubmitted ? (
                <form onSubmit={handleWebinarSubmit} className="p-6 text-left space-y-4">
                  {webinarError && (
                    <div className="p-3 bg-burgundy/5 text-burgundy text-xs font-semibold rounded border border-burgundy/15">
                      {webinarError}
                    </div>
                  )}

                  <div className="space-y-1.5">
                    <label className="text-xs font-bold uppercase tracking-wider text-ink/55 block">Full Name:</label>
                    <div className="relative">
                      <User className="absolute left-3 top-3 w-4 h-4 text-ink/30" />
                      <input
                        type="text"
                        required
                        value={webinarName}
                        onChange={(e) => setWebinarName(e.target.value)}
                        placeholder="Director Name"
                        className="w-full bg-paper/20 border border-fog/80 focus:border-brass rounded-lg p-2.5 pl-9 text-sm focus:outline-none focus:ring-1 focus:ring-brass transition-premium font-sans"
                      />
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-bold uppercase tracking-wider text-ink/55 block">Email Address:</label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-3 w-4 h-4 text-ink/30" />
                      <input
                        type="email"
                        required
                        value={webinarEmail}
                        onChange={(e) => setWebinarEmail(e.target.value)}
                        placeholder="director@yournonprofit.org"
                        className="w-full bg-paper/20 border border-fog/80 focus:border-brass rounded-lg p-2.5 pl-9 text-sm focus:outline-none focus:ring-1 focus:ring-brass transition-premium font-sans"
                      />
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-bold uppercase tracking-wider text-ink/55 block">Select Webinar Topic:</label>
                    <select
                      required
                      value={selectedWebinar}
                      onChange={(e) => setSelectedWebinar(e.target.value)}
                      className="w-full bg-paper/20 border border-fog/80 focus:border-brass rounded-lg p-2.5 text-sm focus:outline-none focus:ring-1 focus:ring-brass transition-premium font-sans font-medium"
                    >
                      <option value="">-- Select Upcoming Session --</option>
                      {webinarsList.map(w => (
                        <option key={w.id} value={w.id}>{w.date} - {w.title}</option>
                      ))}
                    </select>
                  </div>

                  <button
                    type="submit"
                    className="w-full inline-flex justify-center items-center gap-2 py-3 bg-slate-brand hover:bg-ink text-white text-xs font-bold uppercase tracking-wider rounded shadow transition-premium cursor-pointer"
                  >
                    <span>Reserve My Webinar Seat</span>
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </form>
              ) : (
                /* Webinar Confirmation Screen */
                <div className="p-8 text-center space-y-5 animate-fade-in">
                  <div className="w-12 h-12 bg-teal-brand/15 text-teal-brand rounded-full flex items-center justify-center mx-auto border border-teal-brand/30">
                    <ShieldCheck className="w-6 h-6" />
                  </div>
                  
                  <div className="space-y-2">
                    <h5 className="font-serif font-bold text-lg text-ink">Registration Confirmed</h5>
                    <p className="text-xs text-ink/60 font-semibold uppercase tracking-wider">Topic: {webinarSubmitted}</p>
                    <p className="text-xs sm:text-sm text-ink/80 leading-relaxed max-w-sm mx-auto">
                      Thank you, <strong className="text-ink font-bold">{webinarName}</strong>. A calendar invitation and Zoom webinar link have been sent to <strong className="text-ink font-bold">{webinarEmail}</strong>.
                    </p>
                  </div>

                  <div className="pt-4 border-t border-fog/50">
                    <button
                      onClick={() => setWebinarId(null)}
                      className="text-xs font-extrabold uppercase tracking-wider text-slate-brand hover:text-brass transition-premium"
                    >
                      Enroll Another Director
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* Right: In-Person Workshop Request (lg:col-span-7) */}
            <div className="lg:col-span-7 bg-white rounded-xl shadow-md border border-fog overflow-hidden">
              <div className="bg-teal-brand text-paper p-5 border-b border-brass/20 text-left space-y-1">
                <span className="text-[10px] font-bold uppercase tracking-widest text-brass block">Organization Consultation</span>
                <h4 className="font-serif text-lg font-bold text-white tracking-wide">Request Custom On-Site Training</h4>
              </div>

              {!inpersonSubmitted ? (
                <form onSubmit={handleInpersonSubmit} className="p-6 text-left space-y-4">
                  {inpersonError && (
                    <div className="p-3 bg-burgundy/5 text-burgundy text-xs font-semibold rounded border border-burgundy/15">
                      {inpersonError}
                    </div>
                  )}

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <label className="text-xs font-bold uppercase tracking-wider text-ink/55 block">Organization Name:</label>
                      <input
                        type="text"
                        required
                        value={orgName}
                        onChange={(e) => setOrgName(e.target.value)}
                        placeholder="Nonprofit Corporation"
                        className="w-full bg-paper/20 border border-fog/80 focus:border-brass rounded-lg p-2.5 text-sm focus:outline-none focus:ring-1 focus:ring-brass transition-premium font-sans"
                      />
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-xs font-bold uppercase tracking-wider text-ink/55 block">Approximate Board Size:</label>
                      <select
                        required
                        value={boardSize}
                        onChange={(e) => setBoardSize(e.target.value)}
                        className="w-full bg-paper/20 border border-fog/80 focus:border-brass rounded-lg p-2.5 text-sm focus:outline-none focus:ring-1 focus:ring-brass transition-premium font-sans"
                      >
                        <option value="">-- Choose Size --</option>
                        <option value="3-5">3 to 5 Directors</option>
                        <option value="6-9">6 to 9 Directors</option>
                        <option value="10-15">10 to 15 Directors</option>
                        <option value="15+">15+ Directors</option>
                      </select>
                    </div>
                  </div>

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
                        placeholder="chair@yournonprofit.org"
                        className="w-full bg-paper/20 border border-fog/80 focus:border-brass rounded-lg p-2.5 text-sm focus:outline-none focus:ring-1 focus:ring-brass transition-premium font-sans"
                      />
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-bold uppercase tracking-wider text-ink/55 block">Select Main Training Topic:</label>
                    <select
                      required
                      value={trainingTopic}
                      onChange={(e) => setTrainingTopic(e.target.value)}
                      className="w-full bg-paper/20 border border-fog/80 focus:border-brass rounded-lg p-2.5 text-sm focus:outline-none focus:ring-1 focus:ring-brass transition-premium font-sans font-medium"
                    >
                      <option value="">-- Select Target Curriculum Area --</option>
                      <option value="onboarding">Board Onboarding & Fiduciary Duties (Care, Loyalty, Obedience)</option>
                      <option value="audit">Bylaws Auditing & California Registry Requirements</option>
                      <option value="compensation">Executive Compensation surveys & Safe Harbors (Form 990)</option>
                      <option value="boundaries">Strategic Deliberation & Governance vs. Management (40-40-20 Rule)</option>
                    </select>
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-bold uppercase tracking-wider text-ink/55 block">Optional Notes or Specific Concerns:</label>
                    <textarea
                      value={notes}
                      onChange={(e) => setNotes(e.target.value)}
                      placeholder="List any specific bylaws delinquency or IRS concerns..."
                      rows={3}
                      className="w-full bg-paper/20 border border-fog/80 focus:border-brass rounded-lg p-2.5 text-sm focus:outline-none focus:ring-1 focus:ring-brass transition-premium font-sans"
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
                <div className="p-8 text-center space-y-5 animate-fade-in">
                  <div className="w-12 h-12 bg-teal-brand/15 text-teal-brand rounded-full flex items-center justify-center mx-auto border border-teal-brand/30">
                    <Award className="w-6 h-6 animate-spin-slow" />
                  </div>
                  
                  <div className="space-y-2">
                    <h5 className="font-serif font-bold text-lg text-ink font-semibold">Training Inquiry Received</h5>
                    <p className="text-xs text-ink/65 font-bold uppercase tracking-widest">{orgName} - {trainingTopic}</p>
                    <p className="text-xs sm:text-sm text-ink/85 leading-relaxed max-w-md mx-auto">
                      Thank you, <strong className="text-ink font-bold">{contactName}</strong>. Your workshop request has been successfully recorded. An attorney from the <strong className="text-ink font-bold">California Center for Nonprofit Law</strong> will contact you at <strong className="text-ink font-bold">{contactEmail}</strong> within 2 business days to schedule a custom curriculum planning session.
                    </p>
                  </div>

                  <div className="pt-4 border-t border-fog/50">
                    <button
                      onClick={() => setInpersonSubmitted(false)}
                      className="text-xs font-extrabold uppercase tracking-wider text-teal-brand hover:text-brass transition-premium"
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
    </Layout>
  );
};
export default Training;
