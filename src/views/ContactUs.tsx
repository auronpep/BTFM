import React, { useState, useEffect, useRef } from 'react';
import { Layout } from '../components/Layout';
import { useRouter } from '../components/Router';
import { scrollBehavior } from '../lib/motion';
import { 
  Mail, 
  Phone, 
  MapPin, 
  Landmark, 
  Clock, 
  Check, 
  RefreshCw, 
  Send, 
  ExternalLink, 
  CheckCircle2, 
  User, 
  Building, 
  Copy, 
  Printer, 
  AlertCircle,
  Shield,
  HelpCircle,
  FileText,
  ChevronRight,
  GraduationCap
} from 'lucide-react';

interface TopicOption {
  id: string;
  title: string;
  description: string;
  icon: React.ReactNode;
}

export const ContactUs: React.FC = () => {
  const { queryParams } = useRouter();

  // Form Input States
  const [orgName, setOrgName] = useState('');
  const [contactName, setContactName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [boardSize, setBoardSize] = useState('8-15');
  const [selectedTopics, setSelectedTopics] = useState<string[]>(['fiduciary']);
  const [message, setMessage] = useState('');
  const [consentInformal, setConsentInformal] = useState(false);
  const [formError, setFormError] = useState('');

  // Submission Progress State
  // 'input' | 'sending' | 'success'
  const [submissionStatus, setSubmissionStatus] = useState<'input' | 'sending' | 'success'>('input');
  const [sendingProgressText, setSendingProgressText] = useState('Preparing inquiry parameters...');
  const [isCopied, setIsCopied] = useState(false);
  
  const statusTopRef = useRef<HTMLDivElement>(null);

  // Available interactive topics
  const topicsList: TopicOption[] = [
    {
      id: 'fiduciary',
      title: 'Fiduciary Roles & Duties',
      description: 'Understanding care, loyalty, and obedience boundaries.',
      icon: <GraduationCap className="w-4 h-4 text-brass" />
    },
    {
      id: 'minutes',
      title: 'Minutes & Board Records',
      description: 'Reviewing resolutions, script templates, and correction techniques.',
      icon: <FileText className="w-4 h-4 text-brass" />
    },
    {
      id: 'budget',
      title: 'Financial Reviews & Budgets',
      description: 'Scanning quarterly variances and spot-checking risk sliders.',
      icon: <Landmark className="w-4 h-4 text-brass" />
    },
    {
      id: 'bylaws',
      title: 'Bylaws & California Rules',
      description: 'Aligning with state audit triggers and registry requirements.',
      icon: <Shield className="w-4 h-4 text-brass" />
    },
    {
      id: 'retreats',
      title: 'On-Site Board Retreats',
      description: 'Booking customized group workshops led by attorney faculty.',
      icon: <ChevronRight className="w-4 h-4 text-brass" />
    },
    {
      id: 'general',
      title: 'General Curriculum Info',
      description: 'Accessing books, audio modules, and offline checklist guides.',
      icon: <HelpCircle className="w-4 h-4 text-brass" />
    }
  ];

  // Toggle selection of topics
  const handleToggleTopic = (id: string) => {
    if (selectedTopics.includes(id)) {
      if (selectedTopics.length > 1) {
        setSelectedTopics(selectedTopics.filter(t => t !== id));
      }
    } else {
      setSelectedTopics([...selectedTopics, id]);
    }
  };

  // Scroll to status panel as it activates
  useEffect(() => {
    if (submissionStatus !== 'input' && statusTopRef.current) {
      statusTopRef.current.scrollIntoView({ behavior: scrollBehavior() });
    }
  }, [submissionStatus]);

  // Prefill fields from query parameters or localStorage
  useEffect(() => {
    // 1. Organization Name prefill (override localStorage with queryParam if present)
    const localOrg = safeStorage.getItem('cdx_user_org_name') || '';
    if (queryParams.org) {
      setOrgName(queryParams.org);
    } else if (localOrg) {
      setOrgName(localOrg);
    }

    // 2. Contact Name prefill
    if (queryParams.name) {
      setContactName(queryParams.name);
    }

    // 3. Email prefill
    if (queryParams.email) {
      setEmail(queryParams.email);
    }

    // 4. Message prefill
    if (queryParams.message) {
      try {
        setMessage(decodeURIComponent(queryParams.message));
      } catch (err) {
        setMessage(queryParams.message);
      }
    }

    // 5. Selected Topics prefill
    if (queryParams.topic) {
      const topicParam = queryParams.topic.toLowerCase();
      let matchedTopic = '';

      if (topicParam.includes('fiduciary') || topicParam.includes('care') || topicParam.includes('loyalty') || topicParam.includes('duty')) {
        matchedTopic = 'fiduciary';
      } else if (topicParam.includes('minute') || topicParam.includes('record') || topicParam.includes('resolution') || topicParam.includes('scorecard') || topicParam.includes('sandbox')) {
        matchedTopic = 'minutes';
      } else if (topicParam.includes('budget') || topicParam.includes('financial') || topicParam.includes('finance') || topicParam.includes('deviation')) {
        matchedTopic = 'budget';
      } else if (topicParam.includes('bylaws') || topicParam.includes('rule') || topicParam.includes('audit') || topicParam.includes('compliance') || topicParam.includes('incorporation')) {
        matchedTopic = 'bylaws';
      } else if (topicParam.includes('retreat') || topicParam.includes('workshop') || topicParam.includes('onsite') || topicParam.includes('curriculum')) {
        matchedTopic = 'retreats';
      } else if (topicParam.includes('general') || topicParam.includes('info')) {
        matchedTopic = 'general';
      }

      if (matchedTopic) {
        setSelectedTopics([matchedTopic]);
      }
    }
  }, [queryParams]);

  // Handle mock submission with friendly progress phases
  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!orgName.trim() || !contactName.trim() || !email.trim() || !message.trim()) {
      setFormError('Please fill out all required fields to send your training inquiry.');
      return;
    }

    if (!consentInformal) {
      setFormError('Please acknowledge the informational disclaimer regarding educational training.');
      return;
    }

    setFormError('');
    setSubmissionStatus('sending');
    setSendingProgressText('Structuring your training request...');

    // Phase 1: Structure parameters
    setTimeout(() => {
      setSendingProgressText('Selecting customized curriculum topics...');
    }, 600);

    // Phase 2: Route optimization
    setTimeout(() => {
      setSendingProgressText('Connecting secure direct route to jwood@npolawyers.com...');
    }, 1200);

    // Phase 3: Send
    setTimeout(() => {
      setSendingProgressText('Transmitting inquiry packet...');
    }, 1800);

    // Phase 4: Complete
    setTimeout(() => {
      setSubmissionStatus('success');
      
      // Save record in localStorage to persist submission history
      try {
        const savedIntakes = JSON.parse(safeStorage.getItem('cdx_contact_intakes') || '[]');
        savedIntakes.push({
          orgName,
          contactName,
          email,
          phone,
          boardSize,
          selectedTopics,
          message,
          timestamp: new Date().toISOString()
        });
        safeStorage.setItem('cdx_contact_intakes', JSON.stringify(savedIntakes));
      } catch (err) {
        console.error('LocalStorage write failed:', err);
      }
    }, 2400);
  };

  // Generate clean training manifest text
  const generateManifestText = () => {
    const dateStr = new Date().toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric', 
      hour: '2-digit', 
      minute: '2-digit' 
    });
    
    const sizeMap: Record<string, string> = {
      'under-3': 'Small Group (Under 3 board members)',
      '3-7': 'Standard Small Board (3 to 7 active trustees)',
      '8-15': 'Medium Governing Board (8 to 15 active trustees)',
      '15-plus': 'Large Comprehensive Board (Over 15 active trustees)'
    };

    const topicsMap: Record<string, string> = {
      'fiduciary': 'Fiduciary Roles & Duties (Care, Loyalty, Obedience)',
      'minutes': 'Minutes & Records (Resolutions, Correction Worksheets)',
      'budget': 'Financial Reviews & Budgets (Variance & Risk Assessment)',
      'bylaws': 'Bylaws & California Rules (Audit Triggers, State Registry)',
      'retreats': 'On-Site Board Retreats & Workshops',
      'general': 'General Curriculum Info & Classroom Resource Desk'
    };

    const formattedTopics = selectedTopics.map(id => `* ${topicsMap[id] || id}`).join('\n');

    return `BOARDROOM FIELD MANUAL - TRAINING INQUIRY MANIFEST
======================================================================
SPONSORED BY THE CALIFORNIA CENTER FOR NONPROFIT LAW
INQUIRY DIRECT TO: JWOOD@NPOLAWYERS.COM
======================================================================

DATE GENERATED:   ${dateStr}
INQUIRY TYPE:     Board Stewardship Education & Training Information

1. REPRESENTATIVE & ORGANIZATION COORDINATES
----------------------------------------------------------------------
* Organization Name:      ${orgName}
* Primary Representative: ${contactName}
* Email Address:          ${email}
* Contact Phone:          ${phone || 'Not Provided'}
* Current Board Size:     ${sizeMap[boardSize] || boardSize}

2. REQUESTED TRAINING SUBJECTS
----------------------------------------------------------------------
${formattedTopics}

3. SITUATIONAL CHALLENGES & OBJECTIVES
----------------------------------------------------------------------
${message}

----------------------------------------------------------------------
This document was formulated on client.boardroomtraining.org to prepare
educational objectives and request custom governance curriculum. 
Submitting this form does not establish an attorney-client relationship.
`;
  };

  const handleCopyManifest = () => {
    const text = generateManifestText();
    navigator.clipboard.writeText(text).then(() => {
      setIsCopied(true);
      setTimeout(() => setIsCopied(false), 2000);
    });
  };

  const handlePrintManifest = () => {
    window.print();
  };

  const handleResetForm = () => {
    setOrgName('');
    setContactName('');
    setEmail('');
    setPhone('');
    setMessage('');
    setConsentInformal(false);
    setSubmissionStatus('input');
  };

  // Pre-formatted mailto URL to launch local client
  const getMailtoLink = () => {
    const subject = encodeURIComponent(`Training Inquiry: ${orgName} - Boardroom Field Manual`);
    const body = encodeURIComponent(generateManifestText());
    return `mailto:jwood@npolawyers.com?subject=${subject}&body=${body}`;
  };

  return (
    <Layout>
      <div className="py-16 bg-paper/30 min-h-screen px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto space-y-12">
          
          {/* Section Hero Header */}
          <div className="text-center space-y-3 max-w-3xl mx-auto">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-teal-50 border border-teal-200/50 text-teal-800 rounded-full text-xs font-semibold uppercase tracking-wider font-sans">
              <GraduationCap className="w-4 h-4 text-brass" />
              <span>Boardroom Stewardship Support</span>
            </div>
            <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl text-ink font-bold tracking-tight">
              Request Training Information
            </h1>
            <p className="text-sm sm:text-base text-ink/75 font-sans leading-relaxed">
              Have questions about our training curriculum, interactive worksheets, or booking Myron Steeves for an on-site boardroom retreat? Tell us about your organization below, and we will help you establish a premium fiduciary education plan.
            </p>
          </div>

          {/* Two Column Layout Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            
            {/* LEFT COLUMN: Firm Info & Educational Advisory Coordinates */}
            <div className="lg:col-span-5 space-y-6">
              
              {/* Educational Stewardship Trust Center */}
              <div className="bg-ink text-paper rounded-xl p-6 border-b-4 border-brass shadow-lg space-y-4 text-left">
                <div className="flex items-center gap-2 text-brass">
                  <Shield className="w-6 h-6 shrink-0" />
                  <span className="text-[11px] font-extrabold uppercase tracking-widest">
                    Educational Stewardship Desk
                  </span>
                </div>
                <h3 className="font-serif italic font-bold text-lg text-white">
                  Stewardship & Governance Excellence
                </h3>
                <p className="text-xs text-paper/80 leading-relaxed font-sans font-medium">
                  We believe that clear board education is the single most effective shield against compliance exposure. This platform is developed in collaboration with the <strong>California Center for Nonprofit Law</strong> to provide public, accessible classrooms and tools that help trustees govern with complete clarity.
                </p>
                <div className="bg-white/5 border border-white/10 rounded p-3 text-[11px] font-mono text-brass/90 flex gap-2 items-start">
                  <Clock className="w-4 h-4 shrink-0 text-brass mt-0.5" />
                  <span>Our advisors review incoming training requests weekly to tailor curriculum guides, handouts, and meeting prep packages.</span>
                </div>
              </div>

              {/* Bio & Contact Cards */}
              <div className="bg-white rounded-xl border border-fog p-6 space-y-6 text-left shadow-sm">
                <h4 className="font-serif font-bold text-lg text-slate-brand border-b border-fog pb-2 flex items-center gap-2">
                  <User className="w-5 h-5 text-brass" />
                  Training Faculty Coordinates
                </h4>

                <div className="space-y-4">
                  {/* J. Wood Card */}
                  <div className="flex gap-4 items-start">
                    <div className="w-10 h-10 rounded-lg bg-brass/10 border border-brass/30 text-brass flex items-center justify-center font-serif italic font-extrabold shrink-0 mt-1">
                      JW
                    </div>
                    <div className="space-y-1">
                      <p className="text-sm font-bold text-ink">J. Wood</p>
                      <p className="text-[10px] text-brass uppercase font-bold tracking-wider">Client Intake & Training Coordinator</p>
                      <a href="mailto:jwood@npolawyers.com" className="text-xs text-slate-brand hover:underline font-mono font-semibold flex items-center gap-1">
                        <Mail className="w-3 h-3" />
                        <span>jwood@npolawyers.com</span>
                      </a>
                    </div>
                  </div>

                  {/* Myron Steeves Card */}
                  <div className="flex gap-4 items-start">
                    <div className="w-10 h-10 rounded-lg bg-ink text-brass flex items-center justify-center font-serif italic font-extrabold shrink-0 mt-1 border border-brass/20">
                      MS
                    </div>
                    <div className="space-y-1">
                      <p className="text-sm font-bold text-ink">Myron Steeves, J.D.</p>
                      <p className="text-[10px] text-brass uppercase font-bold tracking-wider">Founder & Principal Educator</p>
                      <p className="text-xs text-ink/70">Georgetown University Law Center alumnus. Former law school Dean. Authority on California charity governance, fiduciary duties, and bylaws structures.</p>
                    </div>
                  </div>
                </div>

                <hr className="border-fog" />

                {/* Office Details */}
                <div className="space-y-3 font-sans text-xs">
                  <div className="flex gap-2.5 items-start">
                    <MapPin className="w-4 h-4 text-brass shrink-0 mt-0.5" />
                    <div>
                      <p className="font-bold text-ink">Orange County Office (Headquarters)</p>
                      <p className="text-ink/75 mt-0.5">California Center for Nonprofit Law</p>
                      <p className="text-ink/65">450 Newport Center Drive, Suite 500<br />Newport Beach, CA 92660</p>
                    </div>
                  </div>
                  
                  <div className="flex gap-2.5 items-start">
                    <Phone className="w-4 h-4 text-brass shrink-0 mt-0.5" />
                    <div>
                      <p className="font-bold text-ink">Office Telephones</p>
                      <p className="text-ink/75 mt-0.5">Telephone: <span className="font-semibold text-ink">(714) 744-1200</span></p>
                      <p className="text-ink/65">Facsimile: (714) 744-1201</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Informational Disclaimer Notice */}
              <div className="bg-amber-50/60 border border-amber-300/30 rounded-xl p-5 space-y-3 text-left">
                <div className="flex items-center gap-1.5 text-amber-800">
                  <AlertCircle className="w-4.5 h-4.5 shrink-0" />
                  <span className="text-[10px] font-extrabold uppercase tracking-widest">
                    Educational Outreach Notice
                  </span>
                </div>
                <p className="text-[11.5px] text-amber-950 leading-relaxed font-sans font-medium">
                  This contact page handles training and general educational inquiries, routing details directly to <strong>jwood@npolawyers.com</strong>. Exploring these resources or submitting an inquiry does not constitute or establish an attorney-client contract of representation.
                </p>
                <p className="text-[11.5px] text-amber-950 leading-relaxed font-sans font-medium">
                  If your organization has high-stakes conflicts, attorney general audits, or requires formal legal advocacy, please request a legal consultation directly from Myron Steeves, J.D. at <a href="https://NPOlawyers.com" target="_blank" rel="noopener noreferrer" className="underline font-bold text-ink hover:text-brass transition-premium">NPOlawyers.com</a>.
                </p>
              </div>

            </div>

            {/* RIGHT COLUMN: The Interactive Form / Softer Submission Cards */}
            <div className="lg:col-span-7" ref={statusTopRef}>
              <div className="bg-white rounded-xl shadow-lg border border-fog overflow-hidden">
                
                {/* Form Top Title */}
                <div className="bg-paper border-b border-fog px-6 py-4 flex items-center justify-between">
                  <h3 className="font-serif font-bold text-lg text-ink">
                    Training Inquiry & Resource Request
                  </h3>
                  <span className="text-[10px] font-sans font-bold uppercase tracking-wider bg-brass/10 text-brass px-2 py-0.5 rounded border border-brass/25">
                    Direct To: jwood@npolawyers.com
                  </span>
                </div>

                {/* VIEW 1: Input Form */}
                {submissionStatus === 'input' && (
                  <form onSubmit={handleFormSubmit} className="p-6 sm:p-8 space-y-6 text-left">
                    
                    {formError && (
                      <div className="bg-rose-50 border-l-4 border-rose-600 p-4 rounded text-xs text-rose-900 font-sans font-semibold flex items-center gap-2">
                        <AlertCircle className="w-4 h-4 text-rose-600 shrink-0" />
                        <span>{formError}</span>
                      </div>
                    )}

                    {/* Personal Coordinates */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {/* Contact Representative */}
                      <div className="space-y-1.5">
                        <label htmlFor="contact-name" className="text-[11px] font-bold uppercase tracking-wider text-ink/75 block">
                          Contact Name <span className="text-burgundy">*</span>
                        </label>
                        <div className="relative">
                          <User className="absolute left-3 top-3 w-4 h-4 text-ink/35" />
                          <input 
                            id="contact-name"
                            type="text"
                            required
                            placeholder="e.g. Eleanor Vance"
                            value={contactName}
                            onChange={(e) => setContactName(e.target.value)}
                            className="w-full bg-paper/30 border border-fog hover:border-brass focus:border-brass rounded-lg pl-9 pr-4 py-2.5 text-xs text-ink focus:outline-none transition-premium font-medium"
                          />
                        </div>
                      </div>

                      {/* Organization Name */}
                      <div className="space-y-1.5">
                        <label htmlFor="contact-organization" className="text-[11px] font-bold uppercase tracking-wider text-ink/75 block">
                          Organization Name <span className="text-burgundy">*</span>
                        </label>
                        <div className="relative">
                          <Building className="absolute left-3 top-3 w-4 h-4 text-ink/35" />
                          <input 
                            id="contact-organization"
                            type="text"
                            required
                            placeholder="e.g. Community Health Coalition"
                            value={orgName}
                            onChange={(e) => setOrgName(e.target.value)}
                            className="w-full bg-paper/30 border border-fog hover:border-brass focus:border-brass rounded-lg pl-9 pr-4 py-2.5 text-xs text-ink focus:outline-none transition-premium font-medium"
                          />
                        </div>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {/* Email Address */}
                      <div className="space-y-1.5">
                        <label htmlFor="contact-email" className="text-[11px] font-bold uppercase tracking-wider text-ink/75 block">
                          Email Address <span className="text-burgundy">*</span>
                        </label>
                        <div className="relative">
                          <Mail className="absolute left-3 top-3 w-4 h-4 text-ink/35" />
                          <input 
                            id="contact-email"
                            type="email"
                            required
                            placeholder="e.g. e.vance@yourorganization.org"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="w-full bg-paper/30 border border-fog hover:border-brass focus:border-brass rounded-lg pl-9 pr-4 py-2.5 text-xs text-ink focus:outline-none transition-premium font-medium"
                          />
                        </div>
                      </div>

                      {/* Direct Phone (Optional) */}
                      <div className="space-y-1.5">
                        <label htmlFor="contact-phone" className="text-[11px] font-bold uppercase tracking-wider text-ink/75 block">
                          Telephone Number <span className="text-ink/40 font-normal">(Optional)</span>
                        </label>
                        <div className="relative">
                          <Phone className="absolute left-3 top-3 w-4 h-4 text-ink/35" />
                          <input 
                            id="contact-phone"
                            type="tel"
                            placeholder="e.g. (555) 019-2834"
                            value={phone}
                            onChange={(e) => setPhone(e.target.value)}
                            className="w-full bg-paper/30 border border-fog hover:border-brass focus:border-brass rounded-lg pl-9 pr-4 py-2.5 text-xs text-ink focus:outline-none transition-premium font-medium"
                          />
                        </div>
                      </div>
                    </div>

                    {/* Board Size scale */}
                    <div className="space-y-1.5">
                      <label htmlFor="contact-board-size" className="text-[11px] font-bold uppercase tracking-wider text-ink/75 block">
                        Approximate Board Size / Scale
                      </label>
                      <select 
                        id="contact-board-size"
                        value={boardSize}
                        onChange={(e) => setBoardSize(e.target.value)}
                        className="w-full bg-paper/30 border border-fog hover:border-brass focus:border-brass rounded-lg px-3 py-2.5 text-xs text-ink focus:outline-none transition-premium font-medium cursor-pointer"
                      >
                        <option value="under-3">Small Group (Under 3 board members)</option>
                        <option value="3-7">Standard Small Board (3 to 7 active trustees)</option>
                        <option value="8-15">Medium Governing Board (8 to 15 active trustees)</option>
                        <option value="15-plus">Large Comprehensive Board (Over 15 active trustees)</option>
                      </select>
                    </div>

                    {/* Interactive Topics Selection Chips */}
                    <div className="space-y-2.5">
                      <span id="contact-topics-label" className="text-[11px] font-bold uppercase tracking-wider text-ink/75 block">
                        Core Subjects of Interest <span className="text-ink/40 font-normal">(Select all that apply)</span>
                      </span>
                      
                      <div role="group" aria-labelledby="contact-topics-label" className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        {topicsList.map((topic) => {
                          const isSelected = selectedTopics.includes(topic.id);
                          return (
                            <button
                              aria-pressed={isSelected}
                              key={topic.id}
                              type="button"
                              onClick={() => handleToggleTopic(topic.id)}
                              className={`flex items-start gap-3 p-3 rounded-lg border text-left transition-premium cursor-pointer ${
                                isSelected 
                                  ? 'bg-teal-50/50 border-teal-600/70 shadow-sm ring-1 ring-teal-600/30' 
                                  : 'bg-paper/10 border-fog hover:border-brass/40 hover:bg-paper/30'
                              }`}
                            >
                              <div className={`p-1.5 rounded ${isSelected ? 'bg-teal-100 text-teal-800' : 'bg-paper text-ink/60'}`}>
                                {topic.icon}
                              </div>
                              <div className="space-y-0.5">
                                <p className="text-xs font-bold text-ink flex items-center gap-1.5">
                                  {topic.title}
                                  {isSelected && <span className="text-teal-700 text-[10px]">✓</span>}
                                </p>
                                <p className="text-[10px] text-ink/65 leading-tight font-medium">
                                  {topic.description}
                                </p>
                              </div>
                            </button>
                          );
                        })}
                      </div>
                    </div>

                    {/* Explanatory Message */}
                    <div className="space-y-1.5">
                      <label htmlFor="contact-message" className="text-[11px] font-bold uppercase tracking-wider text-ink/75 block">
                        Tell us about your board's goals or questions <span className="text-burgundy">*</span>
                      </label>
                      <textarea 
                        id="contact-message"
                        required
                        rows={5}
                        placeholder="What specific topics or questions are your trustees hoping to address? Are you looking for customized study materials, guides, or on-site workshops?"
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        className="w-full bg-paper/30 border border-fog hover:border-brass focus:border-brass rounded-lg p-3 text-xs text-ink focus:outline-none transition-premium font-medium"
                      />
                    </div>

                    {/* Friendly Checkbox */}
                    <div className="bg-paper/40 rounded-lg p-4 border border-fog flex items-start gap-3">
                      <input 
                        type="checkbox"
                        id="consent-informal"
                        checked={consentInformal}
                        onChange={(e) => setConsentInformal(e.target.checked)}
                        className="w-4 h-4 border border-fog hover:border-brass focus:ring-brass rounded text-brass cursor-pointer mt-0.5 shrink-0"
                      />
                      <label htmlFor="consent-informal" className="text-[11px] text-ink/75 select-none leading-relaxed cursor-pointer font-medium">
                        I understand this is a request for training information and educational materials. I agree that submitting this form does not form a binding legal contract or establish an attorney-client relationship. <span className="text-burgundy font-bold">*</span>
                      </label>
                    </div>

                    {/* Submit Button */}
                    <button
                      type="submit"
                      className="w-full inline-flex justify-center items-center gap-2 py-3 bg-burgundy hover:bg-ink text-white hover:text-brass text-xs font-bold uppercase tracking-wider rounded-lg shadow-md hover:shadow-lg transition-premium cursor-pointer"
                    >
                      <Send className="w-3.5 h-3.5" />
                      <span>Send Training Inquiry</span>
                    </button>

                  </form>
                )}

                {/* VIEW 2: Softer animated status spinner */}
                {submissionStatus === 'sending' && (
                  <div className="p-16 text-center space-y-6">
                    
                    {/* Modern Animated Compass Spinner */}
                    <div className="flex justify-center">
                      <div className="relative">
                        <div className="w-16 h-16 border-4 border-paper border-t-brass rounded-full animate-spin" />
                        <div className="absolute inset-0 flex items-center justify-center">
                          <GraduationCap className="w-6 h-6 text-brass animate-pulse" />
                        </div>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <h4 className="font-serif italic font-bold text-lg text-ink animate-pulse">
                        Sending Inquiry
                      </h4>
                      <p className="text-xs text-ink/65 font-mono font-medium max-w-sm mx-auto">
                        {sendingProgressText}
                      </p>
                    </div>

                    <div className="w-48 bg-paper/40 rounded-full h-1.5 mx-auto overflow-hidden">
                      <div className="bg-brass h-full rounded-full animate-pulse w-2/3" />
                    </div>

                  </div>
                )}

                {/* VIEW 3: Golden Wax Seal Confirmation Screen */}
                {submissionStatus === 'success' && (
                  <div className="p-8 sm:p-10 space-y-8 text-center animate-fade-in">
                    
                    {/* The Golden Wax Seal Emblem (Educational) */}
                    <div className="flex justify-center">
                      <div className="relative group select-none">
                        <div className="absolute inset-0 bg-brass/25 rounded-full scale-110 animate-ping opacity-50" />
                        
                        {/* Double concentric golden boundary seals */}
                        <div className="w-24 h-24 bg-gradient-to-br from-brass via-white/80 to-brass/95 p-1 rounded-full shadow-2xl flex items-center justify-center border-4 border-brass">
                          <div className="w-full h-full bg-gradient-to-tr from-teal-800 via-teal-900 to-emerald-950 rounded-full border-2 border-brass flex flex-col items-center justify-center text-white relative">
                            {/* Corinthian Column Emblem in Center */}
                            <Landmark className="w-8 h-8 text-brass stroke-[1.5] mb-0.5" />
                            <span className="font-serif text-[7.5px] tracking-widest text-brass font-bold leading-none uppercase scale-90">
                              CCNL
                            </span>
                            <span className="font-sans text-[5.5px] text-paper/60 uppercase tracking-widest mt-0.5 font-semibold">
                              BOARD EDUCATION
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Transmitted Heading */}
                    <div className="space-y-2 max-w-lg mx-auto">
                      <h3 className="font-serif italic font-bold text-2xl text-ink">
                        Inquiry Received
                      </h3>
                      <p className="text-xs text-teal-700 font-bold uppercase tracking-wider flex items-center justify-center gap-1 font-sans">
                        <CheckCircle2 className="w-4 h-4" />
                        <span>Training summary sent to jwood@npolawyers.com</span>
                      </p>
                      <p className="text-xs text-ink/70 leading-relaxed font-sans font-medium">
                        Thank you for sharing your board's educational objectives. We have routed your details to J. Wood, our Client Intake & Training Coordinator, who will be in touch with you shortly.
                      </p>
                    </div>

                    {/* Dynamic Action Controls (Dual-Channel Fallback & Mailto) */}
                    <div className="bg-paper/45 rounded-xl border border-fog p-5 max-w-xl mx-auto text-left space-y-4 shadow-sm">
                      
                      <div className="flex items-center gap-1.5 text-brass border-b border-fog pb-2">
                        <CheckCircle2 className="w-5 h-5 shrink-0" />
                        <span className="text-[10px] font-extrabold uppercase tracking-widest">
                          Direct Communication Fallback
                        </span>
                      </div>

                      <p className="text-[11.5px] text-ink/75 leading-relaxed font-sans font-medium">
                        If your organization has strict spam filters or blocklists that might interfere with web form notifications, we suggest clicking <strong>"Open Direct Mail"</strong>. This launches your default mail application pre-loaded with your training request summary.
                      </p>

                      <div className="flex flex-col sm:flex-row gap-3 pt-1">
                        
                        {/* Launch Mail client fallback */}
                        <a 
                          href={getMailtoLink()}
                          className="flex-1 inline-flex justify-center items-center gap-1.5 py-2.5 px-4 bg-brass hover:bg-ink hover:text-brass text-ink font-bold uppercase tracking-wider text-[11px] rounded-lg shadow-sm hover:shadow transition-premium cursor-pointer text-center"
                        >
                          <ExternalLink className="w-4 h-4 shrink-0" />
                          <span>Open Direct Mail</span>
                        </a>

                        {/* Copy manifest to Clipboard */}
                        <button 
                          onClick={handleCopyManifest}
                          className="flex-1 inline-flex justify-center items-center gap-1.5 py-2.5 px-4 border border-fog bg-white hover:bg-paper text-ink font-bold uppercase tracking-wider text-[11px] rounded-lg transition-premium cursor-pointer"
                        >
                          {isCopied ? <Check className="w-4 h-4 text-teal-600 shrink-0" /> : <Copy className="w-4 h-4 text-brass shrink-0" />}
                          <span>{isCopied ? 'Summary Copied ✓' : 'Copy Inquiry Summary'}</span>
                        </button>
                      </div>

                    </div>

                    {/* Print, Resume Controls */}
                    <div className="flex justify-center items-center gap-4 max-w-xs mx-auto">
                      <button 
                        onClick={handlePrintManifest}
                        className="inline-flex items-center gap-1.5 text-[11px] font-sans font-bold uppercase tracking-wider text-ink/65 hover:text-brass transition-premium cursor-pointer"
                      >
                        <Printer className="w-4 h-4" />
                        <span>Print Request</span>
                      </button>
                      
                      <div className="w-1.5 h-1.5 bg-fog rounded-full" />

                      <button 
                        onClick={handleResetForm}
                        className="inline-flex items-center gap-1.5 text-[11px] font-sans font-bold uppercase tracking-wider text-slate-brand hover:text-brass transition-premium cursor-pointer"
                      >
                        <RefreshCw className="w-3.5 h-3.5" />
                        <span>Submit New Inquiry</span>
                      </button>
                    </div>

                    {/* Pre-formatted Manifest Inspection Area */}
                    <div className="max-w-xl mx-auto text-left space-y-2 border border-fog rounded-lg p-4 bg-paper/20">
                      <div className="flex justify-between items-center border-b border-fog pb-1.5">
                        <p className="text-[9px] font-bold text-ink/40 uppercase tracking-widest font-sans">
                          Inspecting Generated Training Manifest
                        </p>
                        <span className="text-[8px] font-mono text-ink/35 uppercase">
                          FORMAT: TEXT/PLAIN
                        </span>
                      </div>
                      <pre className="font-mono text-[9px] text-ink/65 whitespace-pre-wrap select-all max-h-40 overflow-y-auto leading-relaxed font-medium">
                        {generateManifestText()}
                      </pre>
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

export default ContactUs;
