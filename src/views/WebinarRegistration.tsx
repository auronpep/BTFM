import React, { useState, useEffect } from 'react';
import { Layout } from '../components/Layout';
import { useRouter } from '../components/Router';
import { 
  Calendar, User, Mail, ShieldCheck, ChevronRight, 
  Award, GraduationCap, Sparkles, Check, ArrowLeft, Clock, BookOpen, Building 
} from 'lucide-react';

export const WebinarRegistration: React.FC = () => {
  const { queryParams, navigate } = useRouter();

  // 1. Synchronized Webinar Schedule List
  const webinarsList = [
    { 
      id: 'webinar-fiduciary-update', 
      title: 'California Board Fiduciary Compliance Update', 
      date: 'June 17, 2026', 
      time: '10:00 AM - 11:30 AM PST',
      desc: 'Critical governance requirements, conflict recusal structures, and state filing deadlines for California directors.'
    },
    { 
      id: 'webinar-comp', 
      title: 'Fiduciary Duty & Executive Compensation Safe Harbor (IRC § 4958)', 
      date: 'June 18, 2026', 
      time: '10:00 AM - 11:30 AM PST',
      desc: 'How to establish the Rebuttable Presumption of Reasonableness to protect directors from IRS excess benefit excise taxes.'
    },
    { 
      id: 'webinar-audit', 
      title: 'California $2M Independent Audit & Audit Committee Mandate', 
      date: 'July 15, 2026', 
      time: '1:00 PM - 2:00 PM PST',
      desc: 'Navigating CA Gov Code § 12586 requirements, selecting independent CPAs, and structuring defensive audits.'
    },
    { 
      id: 'webinar-minutes', 
      title: 'Drafting Defensive Meeting Minutes & Corporate Records', 
      date: 'August 11, 2026', 
      time: '11:00 AM - 12:00 PM PST',
      desc: 'Legal standards for documentation, recusal wording, dissent recording, and shielding the board in discovery.'
    }
  ];

  // 2. Form States
  const [webinarName, setWebinarName] = useState('');
  const [webinarEmail, setWebinarEmail] = useState('');
  const [selectedWebinar, setSelectedWebinar] = useState('');
  const [webinarConsent, setWebinarConsent] = useState(false);
  const [webinarSubmitted, setWebinarSubmitted] = useState<string | null>(null);
  const [webinarError, setWebinarError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  // 3. Parse and auto-select webinar from URL query parameter
  useEffect(() => {
    const queryWebinar = queryParams.webinar || queryParams.id;
    if (queryWebinar) {
      const match = webinarsList.find(w => w.id === queryWebinar);
      if (match) {
        setSelectedWebinar(match.id);
      }
    }
  }, [queryParams]);

  const activeWebinarDetails = webinarsList.find(w => w.id === selectedWebinar);

  // 4. Form Submission Handler
  const handleWebinarSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!webinarName.trim() || !webinarEmail.trim() || !selectedWebinar) {
      setWebinarError('Please complete all fields.');
      return;
    }
    if (!webinarConsent) {
      setWebinarError('You must acknowledge the educational disclaimer to proceed.');
      return;
    }
    setWebinarError('');
    setIsSubmitting(true);

    // Simulate database network delay
    setTimeout(() => {
      const reg = { 
        name: webinarName.trim(), 
        email: webinarEmail.trim(), 
        webinarId: selectedWebinar, 
        date: new Date().toISOString() 
      };
      
      // Push to simulated local database
      const list = JSON.parse(localStorage.getItem('webinar_registrations') || '[]');
      list.push(reg);
      localStorage.setItem('webinar_registrations', JSON.stringify(list));

      const confirmed = webinarsList.find(w => w.id === selectedWebinar);
      setWebinarSubmitted(confirmed ? confirmed.title : 'Selected Webinar');
      setIsSubmitting(false);
    }, 600);
  };

  // 5. High-Fidelity .ics Calendar Generation
  const handleDownloadICS = (webinarId: string) => {
    const webinar = webinarsList.find(w => w.id === webinarId);
    if (!webinar) return;

    let start = '';
    let end = '';
    if (webinar.id === 'webinar-fiduciary-update') {
      start = '20260617T170000Z';
      end = '20260617T183000Z';
    } else if (webinar.id === 'webinar-comp') {
      start = '20260618T170000Z';
      end = '20260618T183000Z';
    } else if (webinar.id === 'webinar-audit') {
      start = '20260715T200000Z';
      end = '20260715T210000Z';
    } else if (webinar.id === 'webinar-minutes') {
      start = '20260811T180000Z';
      end = '20260811T190000Z';
    } else {
      start = '20260617T170000Z';
      end = '20260617T183000Z';
    }

    const icsContent = [
      'BEGIN:VCALENDAR',
      'VERSION:2.0',
      'PRODID:-//CDX Boardroom//Webinar Calendar//EN',
      'CALSCALE:GREGORIAN',
      'METHOD:PUBLISH',
      'BEGIN:VEVENT',
      `UID:${webinar.id}-2026@cdxboardroom.org`,
      `DTSTAMP:${new Date().toISOString().replace(/[-:]/g, '').split('.')[0]}Z`,
      `DTSTART:${start}`,
      `DTEND:${end}`,
      `SUMMARY:${webinar.title}`,
      `DESCRIPTION:Thank you for registering for the CDX Boardroom Webinar: ${webinar.title}. Zoom Link and login credentials will be emailed to you prior to the event. Web: https://NPOlawyers.com`,
      'LOCATION:Online Zoom Webinar',
      'STATUS:CONFIRMED',
      'SEQUENCE:0',
      'BEGIN:VALARM',
      'TRIGGER:-PT15M',
      'ACTION:DISPLAY',
      'DESCRIPTION:Reminder for CDX Boardroom Webinar',
      'END:VALARM',
      'END:VEVENT',
      'END:VCALENDAR'
    ].join('\r\n');

    const blob = new Blob([icsContent], { type: 'text/calendar;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', `${webinar.id}-invite.ics`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  return (
    <Layout>
      <div className="py-12 bg-paper/30 min-h-screen px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto space-y-8">
          
          {/* Back Navigation Bar */}
          <div className="flex justify-start">
            <button
              onClick={() => navigate('home')}
              className="inline-flex items-center gap-2 px-4 py-2 text-xs font-bold uppercase tracking-wider text-ink/70 hover:text-brass transition-premium bg-white rounded-lg border border-fog hover:border-brass shadow-sm cursor-pointer select-none"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Back to Home</span>
            </button>
          </div>

          {/* Heading Banner */}
          <div className="text-center space-y-3">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-brass/10 border border-brass/30 text-brass rounded-full text-xs font-semibold uppercase tracking-wider">
              <GraduationCap className="w-4 h-4" />
              <span>Interactive Classroom Desk</span>
            </div>
            <h1 className="font-serif text-3xl sm:text-4xl text-ink font-bold tracking-wide">
              Webinar Enrollment Suite
            </h1>
            <p className="max-w-2xl mx-auto text-sm sm:text-base text-ink/70 leading-relaxed font-sans">
              Secure your place in our professional governance masterclass series. Each session provides practical scripts, defensive templates, and active California statutory checklists.
            </p>
          </div>

          {/* Symmetrical Dual-Column Layout */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start pt-4">
            
            {/* Left Column: Educational Syllabus (6 cols) */}
            <div className="lg:col-span-6 space-y-6 text-left">
              
              {/* Featured Facilitator Profile */}
              <div className="bg-white p-6 rounded-xl border border-fog shadow-sm space-y-4">
                <div className="flex items-start gap-4">
                  <div className="p-3 bg-brass/15 border border-brass/30 text-brass rounded-lg shrink-0">
                    <Building className="w-6 h-6" />
                  </div>
                  <div className="space-y-1">
                    <span className="text-[9px] font-extrabold text-brass uppercase tracking-widest block">Lead Speaker & Instructor</span>
                    <h3 className="font-serif font-bold text-lg text-ink">Myron Steeves, J.D.</h3>
                    <p className="text-xs text-ink/65 leading-relaxed font-sans font-medium">
                      Dean Emeritus of Trinity Law School & Founder of California Center for Nonprofit Law. Over 30 years representing California charitable corporations.
                    </p>
                  </div>
                </div>
              </div>

              {/* Webinar Curriculum / What You Will Master */}
              <div className="bg-white p-6 sm:p-8 rounded-xl border border-fog shadow-sm space-y-5">
                <h4 className="font-serif font-bold text-lg text-slate-brand border-b border-fog/60 pb-3 flex items-center gap-2">
                  <BookOpen className="w-5 h-5 text-brass" />
                  Educational Syllabus Outcomes
                </h4>
                
                <div className="space-y-4 text-xs font-sans text-ink/80">
                  <div className="flex items-start gap-3">
                    <div className="p-1 bg-emerald-500/10 border border-emerald-500/20 text-emerald-600 rounded mt-0.5 shrink-0">
                      <Check className="w-3.5 h-3.5" />
                    </div>
                    <div>
                      <strong className="text-ink block font-semibold text-[13px] mb-0.5">California Compliance Thresholds</strong>
                      <p className="text-ink/70 leading-relaxed font-medium">
                        Master the statutory triggers for independent audits (gross revenue above $2M under Gov Code § 12586) and registry compliance.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <div className="p-1 bg-emerald-500/10 border border-emerald-500/20 text-emerald-600 rounded mt-0.5 shrink-0">
                      <Check className="w-3.5 h-3.5" />
                    </div>
                    <div>
                      <strong className="text-ink block font-semibold text-[13px] mb-0.5">IRC § 4958 Safe Harbor Structures</strong>
                      <p className="text-ink/70 leading-relaxed font-medium">
                        Learn how to draft comparative compensation studies and capture the three-pronged Rebuttable Presumption of Reasonableness.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <div className="p-1 bg-emerald-500/10 border border-emerald-500/20 text-emerald-600 rounded mt-0.5 shrink-0">
                      <Check className="w-3.5 h-3.5" />
                    </div>
                    <div>
                      <strong className="text-ink block font-semibold text-[13px] mb-0.5">Defensive Records Drafting</strong>
                      <p className="text-ink/70 leading-relaxed font-medium">
                        Secure exact wording for conflicted director recusals, recorded dissents, and statutory committee delegations in meeting minutes.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="p-4 bg-paper/50 border border-brass/20 rounded-lg flex gap-3 items-start">
                  <Award className="w-5 h-5 text-brass shrink-0 mt-0.5" />
                  <div className="space-y-1">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-brass block">Fiduciary Competency Certificate</span>
                    <p className="text-[11px] text-ink/70 leading-relaxed font-medium">
                      Attendance at any live webinar contributes towards your board's annual governance competency audit portfolio certificate.
                    </p>
                  </div>
                </div>
              </div>

              {/* Strict Professional Disclaimers */}
              <div className="p-4 bg-burgundy/5 border border-burgundy/20 rounded-lg text-ink/65 space-y-1.5">
                <span className="text-[10px] font-bold text-burgundy uppercase tracking-wider block">Official Firm Educational Disclaimer</span>
                <p className="text-[11px] leading-relaxed font-sans font-medium">
                  Webinar sessions are published as non-confidential, general educational training only. No attorney-client relationship is established through attendance, registration, or checkbox acknowledgment. For specialized bylaws audits or specific executive contracts, please consult qualified legal counsel directly.
                </p>
              </div>

            </div>

            {/* Right Column: High-Converting Form (6 cols) */}
            <div className="lg:col-span-6">
              <div className="bg-white rounded-xl shadow-md border border-fog overflow-hidden text-left">
                
                {/* Form Header */}
                <div className="bg-slate-brand text-paper p-6 border-b border-brass/20 space-y-1.5">
                  <div className="flex items-center gap-1 text-[10px] font-bold uppercase tracking-widest text-brass">
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>Secure Your Digital Seat</span>
                  </div>
                  <h2 className="font-serif text-xl font-bold text-white tracking-wide">Webinar Enrollment Suite</h2>
                  <p className="text-xs text-paper/70 font-sans leading-relaxed">
                    Enter details below to receive access credentials, syllabus outlines, and calendar alerts.
                  </p>
                </div>

                {!webinarSubmitted ? (
                  /* Enrollment Form */
                  <form onSubmit={handleWebinarSubmit} className="p-6 sm:p-8 space-y-5">
                    {webinarError && (
                      <div className="p-3 bg-burgundy/5 text-burgundy text-xs font-semibold rounded border border-burgundy/15">
                        {webinarError}
                      </div>
                    )}

                    {/* Name Input */}
                    <div className="space-y-1.5">
                      <label className="text-xs font-bold uppercase tracking-wider text-ink/55 block">Director Full Name:</label>
                      <div className="relative">
                        <User className="absolute left-3.5 top-3 w-4.5 h-4.5 text-ink/30" />
                        <input
                          type="text"
                          required
                          value={webinarName}
                          onChange={(e) => setWebinarName(e.target.value)}
                          placeholder="Myron Steeves"
                          className="w-full bg-paper/20 border border-fog/80 focus:border-brass rounded-lg p-2.5 pl-10 text-sm focus:outline-none focus:ring-1 focus:ring-brass transition-premium font-sans"
                        />
                      </div>
                    </div>

                    {/* Email Input */}
                    <div className="space-y-1.5">
                      <label className="text-xs font-bold uppercase tracking-wider text-ink/55 block">Official Email Address:</label>
                      <div className="relative">
                        <Mail className="absolute left-3.5 top-3 w-4.5 h-4.5 text-ink/30" />
                        <input
                          type="email"
                          required
                          value={webinarEmail}
                          onChange={(e) => setWebinarEmail(e.target.value)}
                          placeholder="director@yourorganization.org"
                          className="w-full bg-paper/20 border border-fog/80 focus:border-brass rounded-lg p-2.5 pl-10 text-sm focus:outline-none focus:ring-1 focus:ring-brass transition-premium font-sans"
                        />
                      </div>
                    </div>

                    {/* Webinar Dropdown Selector */}
                    <div className="space-y-1.5">
                      <label className="text-xs font-bold uppercase tracking-wider text-ink/55 block">Select Webinar Masterclass:</label>
                      <div className="relative">
                        <select
                          required
                          value={selectedWebinar}
                          onChange={(e) => setSelectedWebinar(e.target.value)}
                          className="w-full bg-paper/20 border border-fog/80 focus:border-brass rounded-lg p-3 text-sm focus:outline-none focus:ring-1 focus:ring-brass transition-premium font-sans font-medium cursor-pointer"
                        >
                          <option value="">-- Choose An Upcoming Session --</option>
                          {webinarsList.map(w => (
                            <option key={w.id} value={w.id}>{w.date} - {w.title}</option>
                          ))}
                        </select>
                      </div>
                    </div>

                    {/* Active Webinar Details Box (Dynamic UI Helper) */}
                    {activeWebinarDetails && (
                      <div className="p-4 bg-paper/40 border border-fog/60 rounded-lg space-y-2 animate-fade-in text-xs font-sans">
                        <div className="flex items-center gap-1.5 text-brass font-bold uppercase tracking-wide">
                          <Clock className="w-4 h-4 shrink-0" />
                          <span>Session Time: {activeWebinarDetails.time}</span>
                        </div>
                        <p className="text-ink/85 font-medium leading-relaxed">
                          {activeWebinarDetails.desc}
                        </p>
                      </div>
                    )}

                    {/* Legal Disclaimer Consent Checkbox */}
                    <div className="flex items-start gap-2.5 pt-1">
                      <input
                        id="webinar-consent"
                        type="checkbox"
                        required
                        checked={webinarConsent}
                        onChange={(e) => setWebinarConsent(e.target.checked)}
                        className="mt-0.5 w-4 h-4 rounded text-slate-brand focus:ring-brass border-fog/80 cursor-pointer shrink-0"
                      />
                      <label htmlFor="webinar-consent" className="text-[11px] text-ink/70 leading-relaxed font-sans font-medium cursor-pointer select-none">
                        I acknowledge this webinar is an educational service only and does not establish a formal attorney-client relationship with CCNL or NPO Lawyers.
                      </label>
                    </div>

                    {/* Submit Button */}
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full inline-flex justify-center items-center gap-2 py-3 bg-slate-brand hover:bg-ink text-white hover:text-brass text-xs font-bold uppercase tracking-wider rounded shadow-md transition-premium cursor-pointer disabled:opacity-50"
                    >
                      {isSubmitting ? (
                        <span>Securing Seat...</span>
                      ) : (
                        <>
                          <span>Reserve My Webinar Seat</span>
                          <ChevronRight className="w-4 h-4 animate-pulse" />
                        </>
                      )}
                    </button>

                  </form>
                ) : (
                  /* Registration Confirmation Screen */
                  <div className="p-8 text-center space-y-6 animate-fade-in">
                    <div className="w-16 h-16 bg-teal-brand/10 text-teal-brand rounded-full flex items-center justify-center mx-auto border border-teal-brand/20">
                      <ShieldCheck className="w-8 h-8" />
                    </div>
                    
                    <div className="space-y-2">
                      <span className="text-[10px] font-extrabold text-teal-brand uppercase tracking-widest block">Classroom Reservation Locked</span>
                      <h3 className="font-serif font-bold text-xl text-ink">Registration Confirmed</h3>
                      <p className="text-xs text-brass font-bold uppercase tracking-wider max-w-sm mx-auto leading-normal">
                        Topic: {webinarSubmitted}
                      </p>
                      <p className="text-xs sm:text-sm text-ink/80 leading-relaxed max-w-sm mx-auto font-sans font-medium">
                        Thank you, <strong className="text-ink font-bold">{webinarName}</strong>. A calendar invitation and Zoom webinar link have been dispatched to <strong className="text-ink font-bold">{webinarEmail}</strong>.
                      </p>
                    </div>

                    {/* Dual-Channel Fallback Calendar Download */}
                    <div className="p-4 bg-paper/50 rounded-xl border border-fog/80 space-y-3 max-w-sm mx-auto">
                      <p className="text-[11px] text-ink/60 font-sans font-semibold leading-normal">
                        Add the event directly to your local corporate calendar client to ensure you don't miss the session:
                      </p>
                      <button
                        onClick={() => handleDownloadICS(selectedWebinar)}
                        className="w-full inline-flex items-center justify-center gap-2 px-5 py-2.5 bg-brass hover:bg-ink hover:text-white text-ink text-xs font-bold uppercase tracking-wider rounded shadow transition-premium cursor-pointer"
                      >
                        <Calendar className="w-4 h-4 shrink-0" />
                        <span>Add to Calendar (.ics)</span>
                      </button>
                    </div>

                    {/* Reset State Action */}
                    <div className="pt-4 border-t border-fog/50">
                      <button
                        type="button"
                        onClick={() => {
                          setWebinarName('');
                          setWebinarEmail('');
                          setSelectedWebinar('');
                          setWebinarConsent(false);
                          setWebinarSubmitted(null);
                        }}
                        className="text-xs font-extrabold uppercase tracking-wider text-slate-brand hover:text-brass transition-premium cursor-pointer"
                      >
                        Enroll Another Director
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

export default WebinarRegistration;
