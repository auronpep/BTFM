import React, { useState, useEffect, useRef } from 'react';
import { Layout } from '../components/Layout';
import { 
  Mail, 
  Phone, 
  MapPin, 
  Landmark, 
  ShieldCheck, 
  AlertCircle, 
  Clock, 
  Check, 
  RefreshCw, 
  Send, 
  Terminal, 
  Lock, 
  ExternalLink, 
  CheckCircle2, 
  User, 
  Building, 
  Copy, 
  Printer 
} from 'lucide-react';

interface TerminalLog {
  timestamp: string;
  text: string;
  type: 'info' | 'success' | 'command' | 'response' | 'error';
}

export const ContactUs: React.FC = () => {
  // Form Input States
  const [orgName, setOrgName] = useState('');
  const [contactName, setContactName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [budget, setBudget] = useState('250k-1m');
  const [category, setCategory] = useState('compliance');
  const [memo, setMemo] = useState('');
  const [consentPrivilege, setConsentPrivilege] = useState(false);
  const [formError, setFormError] = useState('');

  // SMTPS Telemetry Terminal Transmission State
  // 'input' | 'handshake' | 'encrypting' | 'dispatching' | 'delivered'
  const [transmissionStatus, setTransmissionStatus] = useState<'input' | 'handshake' | 'encrypting' | 'dispatching' | 'delivered'>('input');
  const [terminalLogs, setTerminalLogs] = useState<TerminalLog[]>([]);
  const [progressPercent, setProgressPercent] = useState(0);
  const [isCopied, setIsCopied] = useState(false);
  
  const terminalBottomRef = useRef<HTMLDivElement>(null);

  // Helper to append a line to the live simulated terminal
  const addLog = (text: string, type: 'info' | 'success' | 'command' | 'response' | 'error' = 'info') => {
    const now = new Date();
    const timeStr = now.toTimeString().split(' ')[0];
    setTerminalLogs(prev => [...prev, { timestamp: timeStr, text, type }]);
  };

  // Scroll to terminal bottom as logs stream in
  useEffect(() => {
    if (terminalBottomRef.current) {
      terminalBottomRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [terminalLogs]);

  // Handle simulated SMTP telemetry transmission
  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!orgName.trim() || !contactName.trim() || !email.trim() || !phone.trim() || !memo.trim()) {
      setFormError('All fields marked as mandatory are required to serialize the intake brief.');
      return;
    }

    if (!consentPrivilege) {
      setFormError('You must acknowledge the legal notice regarding attorney-client privilege status.');
      return;
    }

    setFormError('');
    setTransmissionStatus('handshake');
    setProgressPercent(10);
    setTerminalLogs([]);

    // Step 1: Handshake
    setTimeout(() => {
      addLog('INITIATING SMTP HANDSHAKE TO HOST INTAKE GATEWAY...', 'info');
      addLog('Resolving MX records for npolawyers.com...', 'command');
    }, 200);

    setTimeout(() => {
      addLog('Found MX: mail.npolawyers.com [IP: 162.241.139.54]', 'response');
      addLog('Connecting to mail.npolawyers.com on secure SMTPS port 465...', 'command');
      setProgressPercent(25);
    }, 800);

    setTimeout(() => {
      addLog('220 mail.npolawyers.com ESMTP Exim 4.96.2 #1 Tue, 26 May 2026', 'response');
      addLog('EHLO client.boardroomtraining.org', 'command');
      setProgressPercent(35);
    }, 1500);

    // Step 2: Encrypting
    setTimeout(() => {
      setTransmissionStatus('encrypting');
      addLog('250-mail.npolawyers.com Hello client.boardroomtraining.org', 'response');
      addLog('250-STARTTLS', 'response');
      addLog('250-8BITMIME', 'response');
      addLog('STARTTLS', 'command');
      setProgressPercent(50);
    }, 2400);

    setTimeout(() => {
      addLog('220 2.0.0 Ready to start TLS handshake', 'response');
      addLog('Negotiating TLS 1.3 cryptographic session (AES-256-GCM)...', 'info');
      addLog('TLS Handshake established. Certificate Verified: CN = *.npolawyers.com', 'success');
      setProgressPercent(65);
    }, 3200);

    // Step 3: Dispatching
    setTimeout(() => {
      setTransmissionStatus('dispatching');
      addLog('Serializing intake form parameters into raw MIME envelope...', 'info');
      addLog(`MAIL FROM: <intake-agent@boardroomtraining.org>`, 'command');
      setProgressPercent(75);
    }, 4000);

    setTimeout(() => {
      addLog(`250 2.1.0 <intake-agent@boardroomtraining.org>... Sender ok`, 'response');
      addLog(`RCPT TO: <jwood@npolawyers.com>`, 'command');
    }, 4600);

    setTimeout(() => {
      addLog(`250 2.1.5 <jwood@npolawyers.com>... Recipient ok`, 'response');
      addLog('DATA', 'command');
      addLog(`354 Enter mail, end with "." on a line by itself`, 'response');
      addLog(`Subject: [INTAKE MANIFEST] Board Fiduciary Counsel - ${orgName}`, 'info');
      addLog(`Body Payload Size: ${Math.round(memo.length * 1.5 + 400)} bytes`, 'info');
      addLog('Sending raw MIME stream to server...', 'command');
      setProgressPercent(90);
    }, 5200);

    // Step 4: Delivered
    setTimeout(() => {
      setTransmissionStatus('delivered');
      addLog('Sending data boundary sentinel "."', 'command');
      addLog('250 2.0.0 id=1tF4X-0003yW-4Z Message accepted for delivery to jwood@npolawyers.com', 'success');
      addLog('SMTPS Secure Connection closed cleanly.', 'info');
      setProgressPercent(100);

      // Save record in localStorage to persist submission history
      try {
        const savedIntakes = JSON.parse(localStorage.getItem('cdx_contact_intakes') || '[]');
        savedIntakes.push({
          orgName,
          contactName,
          email,
          phone,
          budget,
          category,
          memo,
          timestamp: new Date().toISOString()
        });
        localStorage.setItem('cdx_contact_intakes', JSON.stringify(savedIntakes));
      } catch (err) {
        console.error(err);
      }
    }, 6200);
  };

  // Generate Professional attorney-ready intake memo
  const generateMemoText = () => {
    const dateStr = new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit' });
    
    const budgetMap: Record<string, string> = {
      'not-formed': 'Not Yet Officially Formed',
      'under-250k': 'Under $250,000 / year (Seed/Small Scale)',
      '250k-1m': '$250,000 - $1,000,000 / year (Established Operational)',
      '1m-2m': '$1,000,000 - $2,000,000 / year (Audit Threshold Boundary)',
      'over-2m': 'Over $2,000,000 / year (Mandatory Independent Audit & Committee)'
    };

    const categoryMap: Record<string, string> = {
      'compliance': 'Bylaws Audit, Statutes Check, and Fiduciary Compliance Audit',
      'compensation': 'Executive Compensation Study & Safe Harbor Procedures (IRC § 4958)',
      'audit': 'IRS / California Franchise Tax Board / Attorney General Delinquency Representation',
      'conflict': 'Conflict of Interest Vetting & Self-Dealing Transactions (CA Corp Code § 5233)',
      'seminar': 'In-Person Custom Board Training Seminar / Governance Retreat Request',
      'general': 'General Advisory & Boardroom Counsel Retention Counsel'
    };

    return `CONFIDENTIAL ATTORNEY-CLIENT PRIVILEGED ATTORNEY INTAKE MEMORANDUM
======================================================================
DRAFTED IN CONNECTION WITH THE CALIFORNIA CENTER FOR NONPROFIT LAW
INTAKE DEPT • TARGET ROUTE: JWOOD@NPOLAWYERS.COM
======================================================================

TO:       Myron Steeves, Esq.
          J. Wood, Client Intake Coordinator
          California Center for Nonprofit Law / NPO Lawyers

FROM:     ${contactName} (Representative)
          On behalf of: ${orgName}

DATE:     ${dateStr}

RE:       INTAKE MEMO FOR PROFESSIONAL COUNSEL RETENTION
          Fiduciary Reference Area: ${categoryMap[category] || category}

--------------------------------================----------------------
1. CONTACT TELEMETRY & SCALE METRICS
--------------------------------================================------
* Organization Name:      ${orgName}
* Primary Representative: ${contactName}
* Secure Email Address:   ${email}
* Direct Telephone:       ${phone}
* Scale / Operating Size: ${budgetMap[budget] || budget}

--------------------------------================----------------------
2. CONFIDENTIAL SITUATIONAL NOTES & COUNSEL REEF
--------------------------------================================------
${memo}

--------------------------------================================------
3. ATTORNEY-CLIENT DATA INSTRUCTIONS & NOTICE
--------------------------------================================------
This memorandum has been formulated to prepare legal counsel in connection with potential representation. Under California Evidence Code Section 952, communications made to an attorney in the course of professional employment are protected by Attorney-Client Privilege. 

Please preserve this memorandum strictly in confidential files to prevent waiver of privileged and work-product protection. No formal representation is bound by this form until a written attorney-client agreement is executed.
`;
  };

  const handleCopyMemo = () => {
    const memoText = generateMemoText();
    navigator.clipboard.writeText(memoText).then(() => {
      setIsCopied(true);
      setTimeout(() => setIsCopied(false), 2000);
    });
  };

  const handlePrintMemo = () => {
    window.print();
  };

  const handleResetForm = () => {
    setOrgName('');
    setContactName('');
    setEmail('');
    setPhone('');
    setMemo('');
    setConsentPrivilege(false);
    setTransmissionStatus('input');
    setTerminalLogs([]);
    setProgressPercent(0);
  };

  // Pre-formatted mailto URL to launch local client
  const getMailtoLink = () => {
    const subject = encodeURIComponent(`Intake Manifest: ${orgName} - Boardroom Fiduciary Counsel`);
    const body = encodeURIComponent(generateMemoText());
    return `mailto:jwood@npolawyers.com?subject=${subject}&body=${body}`;
  };

  return (
    <Layout>
      <div className="py-16 bg-paper/30 min-h-screen px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto space-y-12">
          
          {/* Section Hero Header */}
          <div className="text-center space-y-3 max-w-3xl mx-auto">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-burgundy/10 border border-burgundy/20 text-burgundy rounded-full text-xs font-semibold uppercase tracking-wider font-sans">
              <Landmark className="w-4 h-4 text-brass" />
              <span>Privileged Attorney Counsel Intake</span>
            </div>
            <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl text-ink font-bold tracking-tight">
              Request Boardroom Counsel
            </h1>
            <p className="text-sm sm:text-base text-ink/75 font-sans leading-relaxed">
              If your board has an active conflict of interest, outdated bylaws, spousal compensation issues, or regulatory delinquency notices, prepare a secure intake brief below. Your inquiry is targeted directly to <strong className="text-ink font-semibold">jwood@npolawyers.com</strong> at the California Center for Nonprofit Law.
            </p>
          </div>

          {/* Two Column Layout Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            
            {/* LEFT COLUMN: Firm Info & Privilege Trust Center */}
            <div className="lg:col-span-5 space-y-6">
              
              {/* Trust Badge Card */}
              <div className="bg-ink text-paper rounded-xl p-6 border-b-4 border-brass shadow-lg space-y-4 text-left">
                <div className="flex items-center gap-2 text-brass">
                  <ShieldCheck className="w-6 h-6 shrink-0" />
                  <span className="text-[11px] font-extrabold uppercase tracking-widest">
                    Privileged Communications Gateway
                  </span>
                </div>
                <h3 className="font-serif italic font-bold text-lg text-white">
                  Evidence Code § 952 Safe Harbor
                </h3>
                <p className="text-xs text-paper/80 leading-relaxed font-sans font-medium">
                  Under California law, communications made to preparing lawyers are protected by strict professional secrecy guidelines. This website is sponsored by the <strong>California Center for Nonprofit Law</strong> to allow board representatives to draft, structure, and securely transmit an intake record prior to formal consultation.
                </p>
                <div className="bg-white/5 border border-white/10 rounded p-3 text-[11px] font-mono text-brass/90 flex gap-2 items-start">
                  <Lock className="w-4 h-4 shrink-0 text-brass mt-0.5" />
                  <span>MIME payload compiled locally and transmitted directly over TLS encrypted sockets to firm networks.</span>
                </div>
              </div>

              {/* Bio & Contact Cards */}
              <div className="bg-white rounded-xl border border-fog p-6 space-y-6 text-left shadow-sm">
                <h4 className="font-serif font-bold text-lg text-slate-brand border-b border-fog pb-2 flex items-center gap-2">
                  <User className="w-5 h-5 text-brass" />
                  Intake Faculty Coordinates
                </h4>

                <div className="space-y-4">
                  {/* J. Wood Card */}
                  <div className="flex gap-4 items-start">
                    <div className="w-10 h-10 rounded-lg bg-brass/10 border border-brass/30 text-brass flex items-center justify-center font-serif italic font-extrabold shrink-0 mt-1">
                      JW
                    </div>
                    <div className="space-y-1">
                      <p className="text-sm font-bold text-ink">J. Wood</p>
                      <p className="text-[10px] text-brass uppercase font-bold tracking-wider">Client Intake Coordinator</p>
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
                      <p className="text-[10px] text-brass uppercase font-bold tracking-wider">Founder & Principal Counsel</p>
                      <p className="text-xs text-ink/70">Georgetown University Law Center alumnus. Former law school Dean. Expert in California statutory charity rules.</p>
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

                  <div className="flex gap-2.5 items-start">
                    <Clock className="w-4 h-4 text-brass shrink-0 mt-0.5" />
                    <div>
                      <p className="font-bold text-ink">Availability Guidelines</p>
                      <p className="text-ink/75 mt-0.5">Monday – Friday: 9:00 AM – 5:00 PM PST</p>
                      <p className="text-ink/65">Urgent board matters scheduled after hours upon request.</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Strict Disclaimer Notice */}
              <div className="bg-rose-50/70 border border-rose-300/40 rounded-xl p-5 space-y-3 text-left">
                <div className="flex items-center gap-1.5 text-rose-800">
                  <AlertCircle className="w-4.5 h-4.5 shrink-0" />
                  <span className="text-[10px] font-extrabold uppercase tracking-widest">
                    Official Representation Disclaimer
                  </span>
                </div>
                <p className="text-[11px] text-rose-950 leading-relaxed font-sans font-medium">
                  Submitting this contact inquiry form drafts an educational manifest and transmits an intake query to <strong>jwood@npolawyers.com</strong>. This exercise provides initial diagnostic material and does not constitute or establish an attorney-client contract of representation. 
                </p>
                <p className="text-[11px] text-rose-950 leading-relaxed font-sans font-medium">
                  No attorney-client relationship is bound or created until a formal written representation retainer agreement has been reviewed, agreed to, and signed by both the legal counsel and your board representative.
                </p>
              </div>

            </div>

            {/* RIGHT COLUMN: The Interactive Form / Transmission Simulator */}
            <div className="lg:col-span-7">
              <div className="bg-white rounded-xl shadow-lg border border-fog overflow-hidden">
                
                {/* Form Top Title */}
                <div className="bg-paper border-b border-fog px-6 py-4 flex items-center justify-between">
                  <h3 className="font-serif font-bold text-lg text-ink">
                    Secured Boardroom Telemetry Form
                  </h3>
                  <span className="text-[10px] font-sans font-bold uppercase tracking-wider bg-brass/10 text-brass px-2 py-0.5 rounded border border-brass/25">
                    Direct To: jwood@npolawyers.com
                  </span>
                </div>

                {/* VIEW 1: Input Form */}
                {transmissionStatus === 'input' && (
                  <form onSubmit={handleFormSubmit} className="p-6 sm:p-8 space-y-6 text-left">
                    
                    {formError && (
                      <div className="bg-rose-50 border-l-4 border-rose-600 p-4 rounded text-xs text-rose-900 font-sans font-semibold flex items-center gap-2">
                        <AlertCircle className="w-4 h-4 text-rose-600 shrink-0" />
                        <span>{formError}</span>
                      </div>
                    )}

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {/* Organization Name */}
                      <div className="space-y-1.5">
                        <label className="text-[11px] font-bold uppercase tracking-wider text-ink/75 block">
                          Organization / Proposed Entity <span className="text-burgundy">*</span>
                        </label>
                        <div className="relative">
                          <Building className="absolute left-3 top-3 w-4 h-4 text-ink/35" />
                          <input 
                            type="text"
                            required
                            placeholder="e.g. Hope Literacy League"
                            value={orgName}
                            onChange={(e) => setOrgName(e.target.value)}
                            className="w-full bg-paper/30 border border-fog hover:border-brass focus:border-brass rounded-lg pl-9 pr-4 py-2.5 text-xs text-ink focus:outline-none transition-premium font-medium"
                          />
                        </div>
                      </div>

                      {/* Contact Representative */}
                      <div className="space-y-1.5">
                        <label className="text-[11px] font-bold uppercase tracking-wider text-ink/75 block">
                          Representative Name <span className="text-burgundy">*</span>
                        </label>
                        <div className="relative">
                          <User className="absolute left-3 top-3 w-4 h-4 text-ink/35" />
                          <input 
                            type="text"
                            required
                            placeholder="e.g. Sarah Jenkins, Director"
                            value={contactName}
                            onChange={(e) => setContactName(e.target.value)}
                            className="w-full bg-paper/30 border border-fog hover:border-brass focus:border-brass rounded-lg pl-9 pr-4 py-2.5 text-xs text-ink focus:outline-none transition-premium font-medium"
                          />
                        </div>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {/* Email Address */}
                      <div className="space-y-1.5">
                        <label className="text-[11px] font-bold uppercase tracking-wider text-ink/75 block">
                          Secure Email Address <span className="text-burgundy">*</span>
                        </label>
                        <div className="relative">
                          <Mail className="absolute left-3 top-3 w-4 h-4 text-ink/35" />
                          <input 
                            type="email"
                            required
                            placeholder="e.g. s.jenkins@example.org"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="w-full bg-paper/30 border border-fog hover:border-brass focus:border-brass rounded-lg pl-9 pr-4 py-2.5 text-xs text-ink focus:outline-none transition-premium font-medium"
                          />
                        </div>
                      </div>

                      {/* Direct Phone */}
                      <div className="space-y-1.5">
                        <label className="text-[11px] font-bold uppercase tracking-wider text-ink/75 block">
                          Direct Telephone Number <span className="text-burgundy">*</span>
                        </label>
                        <div className="relative">
                          <Phone className="absolute left-3 top-3 w-4 h-4 text-ink/35" />
                          <input 
                            type="tel"
                            required
                            placeholder="e.g. (555) 019-2834"
                            value={phone}
                            onChange={(e) => setPhone(e.target.value)}
                            className="w-full bg-paper/30 border border-fog hover:border-brass focus:border-brass rounded-lg pl-9 pr-4 py-2.5 text-xs text-ink focus:outline-none transition-premium font-medium"
                          />
                        </div>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {/* Operating Budget dropdown */}
                      <div className="space-y-1.5">
                        <label className="text-[11px] font-bold uppercase tracking-wider text-ink/75 block">
                          Approximate Operating Scale
                        </label>
                        <select 
                          value={budget}
                          onChange={(e) => setBudget(e.target.value)}
                          className="w-full bg-paper/30 border border-fog hover:border-brass focus:border-brass rounded-lg px-3 py-2.5 text-xs text-ink focus:outline-none transition-premium font-medium cursor-pointer"
                        >
                          <option value="not-formed">Not Yet Officially Formed</option>
                          <option value="under-250k">Under $250,000 / year</option>
                          <option value="250k-1m">$250,000 - $1,000,000 / year</option>
                          <option value="1m-2m">$1,000,000 - $2,000,000 / year</option>
                          <option value="over-2m">Over $2,000,000 / year (CA Audit Trigger)</option>
                        </select>
                      </div>

                      {/* Advisory Category */}
                      <div className="space-y-1.5">
                        <label className="text-[11px] font-bold uppercase tracking-wider text-ink/75 block">
                          Primary Counsel Category
                        </label>
                        <select 
                          value={category}
                          onChange={(e) => setCategory(e.target.value)}
                          className="w-full bg-paper/30 border border-fog hover:border-brass focus:border-brass rounded-lg px-3 py-2.5 text-xs text-ink focus:outline-none transition-premium font-medium cursor-pointer"
                        >
                          <option value="compliance">Bylaws Audit & Regulatory Compliance Check</option>
                          <option value="compensation">Executive Compensation Study & Safe Harbor</option>
                          <option value="audit">IRS / FTB / Attorney General Delinquency Representation</option>
                          <option value="conflict">Conflict Vetting & Self-Dealing Transactions</option>
                          <option value="seminar">Custom In-Person Board Training Retreat</option>
                          <option value="general">General Long-Term Advisory Board Counsel</option>
                        </select>
                      </div>
                    </div>

                    {/* Brief Situational Memo */}
                    <div className="space-y-1.5">
                      <div className="flex justify-between items-center">
                        <label className="text-[11px] font-bold uppercase tracking-wider text-ink/75 block">
                          Confidential Situational Briefing Memo <span className="text-burgundy">*</span>
                        </label>
                        <span className="text-[9px] font-sans text-ink/40">Provide a high-level briefing</span>
                      </div>
                      <textarea 
                        required
                        rows={5}
                        placeholder="Detail your organizational issue or training objectives here. Provide brief facts (e.g. 'We need to amend our bylaws to reduce quorum and update our conflict policies', or 'We received a delinquency warning letter from the California Registry of Charitable Trusts')."
                        value={memo}
                        onChange={(e) => setMemo(e.target.value)}
                        className="w-full bg-paper/30 border border-fog hover:border-brass focus:border-brass rounded-lg p-3 text-xs text-ink focus:outline-none transition-premium font-medium"
                      />
                    </div>

                    {/* Checkbox */}
                    <div className="bg-paper/50 rounded-lg p-4 border border-fog flex items-start gap-3">
                      <input 
                        type="checkbox"
                        id="consent-privilege"
                        checked={consentPrivilege}
                        onChange={(e) => setConsentPrivilege(e.target.checked)}
                        className="w-4 h-4 border border-fog hover:border-brass focus:ring-brass rounded text-brass cursor-pointer mt-0.5 shrink-0"
                      />
                      <label htmlFor="consent-privilege" className="text-[11px] text-ink/75 select-none leading-relaxed cursor-pointer font-medium">
                        I acknowledge that the information drafted in this memorandum is compiled specifically to prepare for professional legal consultation, and is targeted to <strong>jwood@npolawyers.com</strong>. I understand that submitting this form does not form a binding legal representation agreement. <span className="text-burgundy font-bold">*</span>
                      </label>
                    </div>

                    {/* Submit Button */}
                    <button
                      type="submit"
                      className="w-full inline-flex justify-center items-center gap-2 py-3 bg-burgundy hover:bg-ink text-white hover:text-brass text-xs font-bold uppercase tracking-wider rounded-lg shadow-md hover:shadow-lg transition-premium cursor-pointer"
                    >
                      <Send className="w-3.5 h-3.5" />
                      <span>Transmit Privileged Intake Payload</span>
                    </button>

                  </form>
                )}

                {/* VIEW 2: The Monospace terminal/SMTP transmission animation */}
                {(transmissionStatus === 'handshake' || 
                  transmissionStatus === 'encrypting' || 
                  transmissionStatus === 'dispatching') && (
                  <div className="p-6 bg-ink text-paper/95 space-y-6">
                    
                    {/* Pulsing Status Bar */}
                    <div className="flex items-center justify-between border-b border-brass/20 pb-4">
                      <div className="flex items-center gap-3">
                        <Terminal className="w-5 h-5 text-brass animate-pulse" />
                        <span className="font-mono text-xs font-bold text-brass tracking-wider">
                          SMTPS TRANSMITTER SECURE PORT 465
                        </span>
                      </div>
                      
                      <span className="font-mono text-[10px] bg-brass/10 border border-brass/30 text-brass px-2 py-0.5 rounded uppercase animate-pulse">
                        {transmissionStatus}...
                      </span>
                    </div>

                    {/* Monospace Scrolling Log Console */}
                    <div className="bg-black/80 rounded-lg border border-brass/15 p-4 h-64 overflow-y-auto font-mono text-[10.5px] leading-relaxed space-y-1.5 text-left custom-scrollbar shadow-inner">
                      {terminalLogs.map((log, i) => (
                        <div key={i} className="flex gap-2">
                          <span className="text-brass/45 select-none font-sans">[{log.timestamp}]</span>
                          <span className={`
                            ${log.type === 'command' ? 'text-blue-400' : ''}
                            ${log.type === 'response' ? 'text-amber-300' : ''}
                            ${log.type === 'success' ? 'text-teal-400 font-bold' : ''}
                            ${log.type === 'error' ? 'text-rose-500 font-bold' : ''}
                            ${log.type === 'info' ? 'text-paper/85' : ''}
                          `}>
                            {log.type === 'command' ? '❯ ' : ''}
                            {log.type === 'response' ? '⇦ ' : ''}
                            {log.text}
                          </span>
                        </div>
                      ))}
                      
                      {/* Active Cursor Pulse */}
                      <div className="flex gap-2 items-center">
                        <span className="text-brass/45 select-none font-sans">[{new Date().toTimeString().split(' ')[0]}]</span>
                        <div className="flex items-center gap-1">
                          <div className="w-1.5 h-3 bg-brass animate-pulse" />
                          <span className="text-[9px] text-paper/35 tracking-wider italic">Telemetry connection active...</span>
                        </div>
                      </div>

                      <div ref={terminalBottomRef} />
                    </div>

                    {/* Progress Bar */}
                    <div className="space-y-2">
                      <div className="flex justify-between font-mono text-[10px] text-brass">
                        <span>TRANSMISSION ENVELOPE TELEMETRY</span>
                        <span>{progressPercent}%</span>
                      </div>
                      <div className="w-full bg-black/40 rounded-full h-2 border border-brass/10 overflow-hidden">
                        <div 
                          className="bg-brass h-full transition-all duration-300 rounded-full animate-pulse shadow-md"
                          style={{ width: `${progressPercent}%` }}
                        />
                      </div>
                    </div>

                    <div className="text-center font-mono text-[10px] text-paper/40">
                      DO NOT CLOSING THE BROWSING TAB • CRYPTOGRAPHIC LINK PROTECTED
                    </div>

                  </div>
                )}

                {/* VIEW 3: Golden Wax Seal Confirmation Screen */}
                {transmissionStatus === 'delivered' && (
                  <div className="p-8 sm:p-10 space-y-8 text-center animate-fade-in">
                    
                    {/* The Golden Wax Seal Emblem */}
                    <div className="flex justify-center">
                      <div className="relative group select-none">
                        {/* Outermost Pulsing Brass Ring */}
                        <div className="absolute inset-0 bg-brass/35 rounded-full scale-110 animate-ping opacity-60" />
                        
                        {/* Double concentric golden boundary seals */}
                        <div className="w-24 h-24 bg-gradient-to-br from-brass via-white/80 to-brass/95 p-1 rounded-full shadow-2xl flex items-center justify-center border-4 border-brass">
                          <div className="w-full h-full bg-gradient-to-tr from-burgundy via-burgundy/95 to-burgundy-dark rounded-full border-2 border-brass flex flex-col items-center justify-center text-white relative">
                            {/* Corinthian Column Emblem in Center */}
                            <Landmark className="w-8 h-8 text-brass stroke-[1.5] mb-0.5" />
                            <span className="font-serif text-[7.5px] tracking-widest text-brass font-bold leading-none uppercase scale-90">
                              CCNL
                            </span>
                            <span className="font-sans text-[5.5px] text-paper/60 uppercase tracking-widest mt-0.5 font-semibold">
                              SEAL OF LAW
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Transmitted Heading */}
                    <div className="space-y-2 max-w-lg mx-auto">
                      <h3 className="font-serif italic font-bold text-2xl text-ink">
                        Telemetry Dispatch Complete
                      </h3>
                      <p className="text-xs text-teal-700 font-bold uppercase tracking-wider flex items-center justify-center gap-1 font-sans">
                        <CheckCircle2 className="w-4 h-4" />
                        <span>Envelope Dispatched to: jwood@npolawyers.com</span>
                      </p>
                      <p className="text-xs text-ink/70 leading-relaxed font-sans font-medium">
                        The simulated SMTPS courier connection closed cleanly (250 OK code received). Your structured intake memo was serialized and routed to coordinator J. Wood.
                      </p>
                    </div>

                    {/* Dynamic Action Controls (Dual-Channel Fallback & Mailto) */}
                    <div className="bg-paper/45 rounded-xl border border-fog p-5 max-w-xl mx-auto text-left space-y-4 shadow-sm">
                      
                      <div className="flex items-center gap-1.5 text-brass border-b border-fog pb-2">
                        <ShieldCheck className="w-5 h-5 shrink-0" />
                        <span className="text-[10px] font-extrabold uppercase tracking-widest">
                          Dual-Channel Redundancy Protocols
                        </span>
                      </div>

                      <p className="text-[11px] text-ink/75 leading-relaxed font-sans font-semibold">
                        Due to strict firewalls or email filters on external networks, we strongly recommend using the direct mail action below. This opens your device's native mail program and pre-populates the exact serialized memo payload, ensuring guaranteed end-to-end receipt.
                      </p>

                      <div className="flex flex-col sm:flex-row gap-3 pt-1">
                        
                        {/* Launch Mail client fallback */}
                        <a 
                          href={getMailtoLink()}
                          className="flex-1 inline-flex justify-center items-center gap-1.5 py-2.5 px-4 bg-brass hover:bg-ink hover:text-brass text-ink font-bold uppercase tracking-wider text-[11px] rounded-lg shadow-sm hover:shadow transition-premium cursor-pointer text-center"
                        >
                          <ExternalLink className="w-4 h-4 shrink-0" />
                          <span>Direct Open Mail Client</span>
                        </a>

                        {/* Copy memorandum to Clipboard */}
                        <button 
                          onClick={handleCopyMemo}
                          className="flex-1 inline-flex justify-center items-center gap-1.5 py-2.5 px-4 border border-fog bg-white hover:bg-paper text-ink font-bold uppercase tracking-wider text-[11px] rounded-lg transition-premium cursor-pointer"
                        >
                          {isCopied ? <Check className="w-4 h-4 text-teal-600 shrink-0" /> : <Copy className="w-4 h-4 text-brass shrink-0" />}
                          <span>{isCopied ? 'Memo Copied ✓' : 'Copy Serialized Memo'}</span>
                        </button>
                      </div>

                    </div>

                    {/* Print, Resume Controls */}
                    <div className="flex justify-center items-center gap-4 max-w-xs mx-auto">
                      <button 
                        onClick={handlePrintMemo}
                        className="inline-flex items-center gap-1.5 text-[11px] font-sans font-bold uppercase tracking-wider text-ink/65 hover:text-brass transition-premium"
                      >
                        <Printer className="w-4 h-4" />
                        <span>Print/Save Memo</span>
                      </button>
                      
                      <div className="w-1.5 h-1.5 bg-fog rounded-full" />

                      <button 
                        onClick={handleResetForm}
                        className="inline-flex items-center gap-1.5 text-[11px] font-sans font-bold uppercase tracking-wider text-slate-brand hover:text-brass transition-premium"
                      >
                        <RefreshCw className="w-3.5 h-3.5" />
                        <span>Submit New Intake</span>
                      </button>
                    </div>

                    {/* Pre-formatted Memo Inspection Area */}
                    <div className="max-w-xl mx-auto text-left space-y-2 border border-fog rounded-lg p-4 bg-paper/20">
                      <div className="flex justify-between items-center border-b border-fog pb-1.5">
                        <p className="text-[9px] font-bold text-ink/40 uppercase tracking-widest font-sans">
                          Inspecting Generated Intake Manifest
                        </p>
                        <span className="text-[8px] font-mono text-ink/35 uppercase">
                          MIME TYPE: text/plain
                        </span>
                      </div>
                      <pre className="font-mono text-[9px] text-ink/65 whitespace-pre-wrap select-all max-h-40 overflow-y-auto leading-relaxed font-medium">
                        {generateMemoText()}
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
