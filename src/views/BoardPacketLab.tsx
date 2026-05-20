import React, { useState } from 'react';
import { Layout } from '../components/Layout';
import { useRouter } from '../components/Router';
import { 
  ShieldAlert, AlertCircle, HelpCircle, ArrowRight, BookOpen 
} from 'lucide-react';
import { 
  DoNotDoThisCard, AskThisCard, LegalEscalationCard, CaliforniaNoteBadge 
} from '../components/BoardroomCards';

interface RedFlagItem {
  id: string;
  selectorText: string;
  title: string;
  flagTitle: string;
  redFlags: string[];
  consequence: string;
  statute: string;
  statuteText: string;
  scriptQuestion: string;
  scriptRationale: string;
  scriptTarget: string;
  isSevere: boolean;
}

export const BoardPacketLab: React.FC = () => {
  const { navigate } = useRouter();
  const [activeTab, setActiveTab] = useState<'agenda' | 'ceo' | 'financials' | 'budget' | 'audit'>('agenda');
  const [selectedFlagId, setSelectedFlagId] = useState<string | null>(null);
  const [showSolutions, setShowShowSolutions] = useState(false);

  // Database of all clickable elements and their regulatory alerts
  const redFlagsDb: Record<string, RedFlagItem> = {
    // 1. AGENDA FLAGS
    'agenda-comp': {
      id: 'agenda-comp',
      selectorText: 'Approval of Executive Director Compensation Package for FY 2026-2027',
      title: 'ED Compensation Review Process',
      flagTitle: 'Bypassing Rebuttable Presumption Standards',
      redFlags: [
        'No independent comparability data or local salary surveys are included in the board packet.',
        'The Executive Director remains present in the room during compensation deliberations.',
        'No formal written conflict of interest disclosure or disinterested board vote is documented.'
      ],
      consequence: 'Under IRC Section 4958 (Intermediate Sanctions), paying an executive in excess of fair market value can trigger a 25% excise tax on the executive and a 10% personal tax on individual directors who approved the package without standard comparable data.',
      statute: 'IRC § 4958',
      statuteText: 'IRS Intermediate Sanctions & Rebuttable Presumption Safe Harbor.',
      scriptQuestion: 'Has this board obtained independent comparability data of salaries from similar-sized California nonprofits in our geographic region, and will the Executive Director recuse themselves from both our deliberations and the vote?',
      scriptRationale: 'Securing three comparable salary data points and ensuring the executive is absent during debate grants the board safe harbor protection under IRS guidelines, preventing personal director penalties.',
      scriptTarget: 'Board President & Treasurer',
      isSevere: true
    },
    'agenda-bylaws': {
      id: 'agenda-bylaws',
      selectorText: 'Bylaw Amendment Approvals (Voice vote scheduled)',
      title: 'Bylaws Amendment Vote',
      flagTitle: 'Bypassing Counsel & Deliberative Duties',
      redFlags: [
        'A comprehensive 30-page bylaw revision is scheduled for an immediate vote without a legal redline draft provided in advance.',
        'No review or sign-off by a California-admitted attorney specializing in tax-exempt organizations is cited.'
      ],
      consequence: 'Amending bylaws without legal counsel frequently introduces clauses that violate California Corporations Code, create governance deadlocks, or fail to conform with active IRS definitions, risking the corporate tax-exempt status.',
      statute: 'CA Corp Code § 5150',
      statuteText: 'California Corporations Code regulating amendment of bylaws.',
      scriptQuestion: 'Have these proposed bylaw amendments been vetted and certified by an independent California nonprofit attorney, and can we postpone this vote to allow directors at least seven days to read the full redline draft?',
      scriptRationale: 'Fiduciary Duty of Care requires directors to make informed decisions. Voting on complex governing documents without reading them or having counsel review them is a prime indicator of negligence.',
      scriptTarget: 'Governance Committee Chair',
      isSevere: false
    },

    // 2. CEO REPORT FLAGS
    'ceo-bridge': {
      id: 'ceo-bridge',
      selectorText: 'Secured temporary bridge financing of $35,000 using my personal credit card, charging the organization 10% interest...',
      title: 'CEO Bridge Loan & Personal Debt',
      flagTitle: 'Unapproved Self-Dealing & Personal Mixing',
      redFlags: [
        'Executive director took out personal debt and extended it to the charity without board authorization.',
        'Charity is paying 10% interest directly to the executive without self-dealing reviews or alternative bid disclosures.'
      ],
      consequence: 'Under California Corporations Code Section 5233, any transaction where an officer or director has a material financial interest is legally defined as self-dealing. Bypassing statutory approval and filing requirements renders directors personally liable for restoring any unauthorized payments with interest.',
      statute: 'CA Corp Code § 5233',
      statuteText: 'Strict statutory rules and approval steps for Self-Dealing Transactions.',
      scriptQuestion: 'Before the organization pays any interest or accepts this loan, did the disinterested board formalize a Section 5233 self-dealing review, verify that the charity could not obtain standard bank terms, and document this in the minutes?',
      scriptRationale: 'Section 5233 transactions are highly scrutinized by the CA Attorney General. The board must formally prove the transaction was fair, in the charity\'s best interest, and that a more advantageous arrangement was not obtainable.',
      scriptTarget: 'Executive Director (CEO) & Board President',
      isSevere: true
    },
    'ceo-spouse': {
      id: 'ceo-spouse',
      selectorText: 'Authorized a $15,000 marketing contract with Elite Web Designs, owned by my spouse, to bypass slow board approvals...',
      title: 'Spousal Vendor Contract',
      flagTitle: 'Conflict of Interest & Bypassed Internal Controls',
      redFlags: [
        'The Executive Director bypassed board review to award a contract to their spouse\'s business.',
        'No competitive bidding or comparable market quotes were gathered or documented.'
      ],
      consequence: 'Awarding contracts to immediate family members without disinterested board approval violates the Duty of Loyalty. This can trigger IRS intermediate sanctions for private benefit and violates standard organizational conflict policies, exposing directors to personal liability.',
      statute: 'CA Corp Code § 5230',
      statuteText: 'Duty of Loyalty and standard Conflict of Interest regulations.',
      scriptQuestion: 'Since the marketing vendor is owned by your spouse, this represents a conflict of interest under our bylaws. Was this conflict formally disclosed, did we solicit at least two other competitive bids, and will the board vote to approve or reject this contract in your absence?',
      scriptRationale: 'Conflicts are not inherently illegal, but they MUST be disclosed, competed, and voted on solely by disinterested, independent directors to remain compliant with California law and protect the board.',
      scriptTarget: 'Executive Director (CEO)',
      isSevere: true
    },

    // 3. FINANCIALS FLAGS
    'fin-restricted': {
      id: 'fin-restricted',
      selectorText: 'Net Restricted Assets Redeployed to Core Ops: $65,000',
      title: 'Restricted Asset Reallocation',
      flagTitle: 'Diversion of Charitable Restricted Trusts',
      redFlags: [
        'Donor-restricted scholarship funds were diverted to pay general operating overhead and administrative payroll.',
        'The transfer occurred without written donor consent or a California court order.'
      ],
      consequence: 'Under the California Charitable Trust Doctrine, donor-restricted funds represent a strict trust. Diverting restricted assets to cover general administrative expenses—even during a cash crunch—is a breach of trust. The California Attorney General actively prosecutes boards for restricted fund diversion and demands personal restitution from individual directors.',
      statute: 'CA Gov Code § 12580',
      statuteText: 'Supervision of Trustees and Charitable Trusts Act.',
      scriptQuestion: 'These funds were donor-restricted for student scholarships. Did the organization secure written consent from the original donors before diverting this $65,000 to cover general operating expenses?',
      scriptRationale: 'Without written donor consent or court permission under UPMIFA standards, restricted assets must remain separated. Financial hardship does not excuse a breach of charitable trust.',
      scriptTarget: 'Treasurer & Finance Director',
      isSevere: true
    },
    'fin-payroll': {
      id: 'fin-payroll',
      selectorText: 'Payroll Withholding Liabilities (Quarterly): $0 (Deferred to next quarter...)',
      title: 'Deferred Payroll Tax Deposits',
      flagTitle: 'Trust Fund Recovery Penalty Risk',
      redFlags: [
        'The organization failed to deposit federal/state payroll withholding taxes to conserve cash.',
        'The board has not been notified of federal tax delinquencies.'
      ],
      consequence: 'Under IRC Section 6672, unpaid employee payroll withholdings (trust fund taxes) create direct, personal, joint-and-several liability for directors. The IRS can assess a 100% Trust Fund Recovery Penalty directly against the personal bank accounts and assets of individual directors. The corporate veil offers ZERO protection.',
      statute: 'IRC § 6672',
      statuteText: 'The 100% Trust Fund Recovery Penalty for unpaid payroll withholding taxes.',
      scriptQuestion: 'Are employee payroll withholding taxes currently being deposited to the IRS on schedule, and can the Treasurer provide the board with direct, independent verification of our federal tax filing receipts?',
      scriptRationale: 'Directors must verify tax compliance directly. Trusting the executive\'s verbal assurance is insufficient when personal joint-and-several financial penalties are active under federal tax law.',
      scriptTarget: 'Treasurer & Executive Director',
      isSevere: true
    },

    // 4. BUDGET FLAGS
    'budget-travel': {
      id: 'budget-travel',
      selectorText: 'ED Discretionary Travel & Retreats: $45,000 (Budgeted: $10,000)',
      title: 'Travel Expense Overrun',
      flagTitle: 'Waste of Charitable Assets & Oversight Failure',
      redFlags: [
        'A 450% unapproved expenditure overrun on executive travel and high-end retreats.',
        'No detailed receipts, attendee lists, or commercial-business rationales were provided.'
      ],
      consequence: 'Failing to supervise executive spending and allowing massive unbudgeted luxury expenditures represents a failure of the Duty of Care. It invites IRS audit scrutiny regarding private inurement and could lead to loss of tax exemption or donor class-action lawsuits.',
      statute: 'CA Corp Code § 5231',
      statuteText: 'Duty of Care and standard of care requirements for nonprofit directors.',
      scriptQuestion: 'What specific business travel or executive retreats accounted for this $35,000 budget overrun, and why was this variance not flagged and pre-authorized by the Treasurer or the Finance Committee?',
      scriptRationale: 'Fiduciary care requires active budget tracking. Allowing large, unapproved discretionary travel budgets suggests a lack of active internal financial oversight and controls.',
      scriptTarget: 'Treasurer & Executive Director',
      isSevere: false
    },
    'budget-consult': {
      id: 'budget-consult',
      selectorText: 'Professional Consulting Fees: $28,000 (Paid to Board President John Doe...)',
      title: 'Consulting Fees Paid to Board President',
      flagTitle: 'Interested Director 51% Rule Violation',
      redFlags: [
        'A sitting director was hired as an emergency consultant, receiving $28,000 in personal compensation.',
        'This contract threatens the statutory 51% disinterested board ratio.'
      ],
      consequence: 'California Corporations Code Section 5227 mandates that no more than 49% of the board may be "interested persons" (individuals compensated by the organization for services, or their relatives). Violating the 51% disinterested board rule invalidates board actions and is a primary trigger for Attorney General enforcement actions.',
      statute: 'CA Corp Code § 5227',
      statuteText: 'The mandatory 51% Disinterested Board Independence Rule.',
      scriptQuestion: 'Does compensating John Doe for consulting services push our board above the 49% "interested person" limit, and did the disinterested board review comparable contractor bids before hiring a sitting director?',
      scriptRationale: 'Under Section 5227, the board must ensure that the vast majority of directors are completely independent and uncompensated to maintain legal integrity and regulatory compliance in California.',
      scriptTarget: 'Governance Committee Chair',
      isSevere: true
    },

    // 5. AUDIT FLAGS
    'audit-controls': {
      id: 'audit-controls',
      selectorText: 'Single signature authority on all checks and electronic wire transfers up to $50,000, including direct reimbursements to the ED',
      title: 'Single-Signature Transaction Authority',
      flagTitle: 'Weak Internal Financial Controls & Fraud Risk',
      redFlags: [
        'A single individual can authorize transactions up to $50,000 without a second signature.',
        'The Executive Director is permitted to sign and authorize their own reimbursement checks.'
      ],
      consequence: 'Weak internal controls invite embezzlement and fraud. In a lawsuit or theft event, insurance carriers frequently deny D&O coverage if the board failed to enforce basic industry-standard dual signature controls, leaving individual directors exposed.',
      statute: 'SOX Act / CA AG Best Practices',
      statuteText: 'Internal controls standards and Asset Protection Guidelines.',
      scriptQuestion: 'Will the board immediate pass a resolution mandating a dual-signature policy for all bank and electronic transfers over $5,000, and require that any executive reimbursement be reviewed and signed off by the Treasurer?',
      scriptRationale: 'Segregation of duties is the absolute baseline of fiduciary asset protection. Allowing an executive to sign checks to themselves represents a complete breakdown of internal controls.',
      scriptTarget: 'Audit Committee Chair & Treasurer',
      isSevere: true
    }
  };

  const handleFlagClick = (flagId: string) => {
    setSelectedFlagId(flagId);
  };

  const currentFlag = selectedFlagId ? redFlagsDb[selectedFlagId] : null;

  return (
    <Layout>
      <div className="py-12 bg-paper/30 min-h-screen px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto space-y-8">
          
          {/* Breadcrumb & Navigation */}
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b border-fog pb-6">
            <div>
              <button 
                onClick={() => navigate('tools')}
                className="text-xs font-bold text-slate-brand hover:text-brass uppercase tracking-wider transition-premium flex items-center gap-1"
              >
                ← Back to Tools & Labs
              </button>
              <h1 className="font-serif text-3xl font-bold text-ink tracking-wide mt-2">
                The Board Packet Audit Lab
              </h1>
              <p className="text-sm text-ink/70">
                Fiduciary simulation: Scan the pages of a standard boardroom packet to identify critical governance red flags.
              </p>
            </div>
            
            <div className="flex items-center gap-3 shrink-0">
              <button
                onClick={() => setShowShowSolutions(!showSolutions)}
                className={`px-4 py-2 text-xs font-bold uppercase tracking-wider rounded border transition-premium ${
                  showSolutions 
                    ? 'bg-brass text-ink border-brass shadow' 
                    : 'bg-white text-ink/80 border-fog hover:border-brass hover:text-brass'
                }`}
              >
                {showSolutions ? 'Hide Answer Highlights' : 'Reveal Red-Flag Answers'}
              </button>
              <a
                href="https://NPOlawyers.com"
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-2 bg-slate-brand hover:bg-ink text-white text-xs font-bold uppercase tracking-wider rounded shadow transition-premium flex items-center gap-1.5"
              >
                <span>Consult Counsel</span>
                <ShieldAlert className="w-3.5 h-3.5 text-brass" />
              </a>
            </div>
          </div>

          {/* Interactive Lab Workspace */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            
            {/* Left Hand: The Binder Document Viewer (7 Cols) */}
            <div className="lg:col-span-7 bg-white rounded-2xl border border-fog shadow-md overflow-hidden flex flex-col min-h-[600px] relative">
              {/* Binder Gold Ring Visual Elements */}
              <div className="absolute top-0 left-4 bottom-0 w-1 flex flex-col justify-around py-12 pointer-events-none z-10">
                {[...Array(6)].map((_, i) => (
                  <div key={i} className="w-4 h-4 rounded-full bg-slate-200 border-2 border-slate-300 -ml-1.5 shadow-inner" />
                ))}
              </div>

              {/* Document Header Tab Row */}
              <div className="bg-fog/60 border-b border-fog/80 flex flex-wrap gap-1 px-8 pt-4">
                {(['agenda', 'ceo', 'financials', 'budget', 'audit'] as const).map((tab) => (
                  <button
                    key={tab}
                    onClick={() => {
                      setActiveTab(tab);
                      setSelectedFlagId(null);
                    }}
                    className={`px-4 py-2.5 text-xs font-bold uppercase tracking-wider rounded-t-lg border-t-2 transition-premium ${
                      activeTab === tab
                        ? 'bg-white border-brass text-brass shadow-sm font-extrabold'
                        : 'text-ink/60 border-transparent hover:text-ink hover:bg-white/40'
                    }`}
                  >
                    {tab === 'agenda' && '1. Meeting Agenda'}
                    {tab === 'ceo' && '2. CEO Report'}
                    {tab === 'financials' && '3. Financial Statement'}
                    {tab === 'budget' && '4. Operating Budget'}
                    {tab === 'audit' && '5. Audit Finding'}
                  </button>
                ))}
              </div>

              {/* Document Body Sheet */}
              <div className="p-10 pl-16 flex-grow font-sans text-sm text-ink leading-relaxed space-y-6 select-none bg-paper/5">
                
                {/* 1. MEETING AGENDA SHEET */}
                {activeTab === 'agenda' && (
                  <div className="space-y-6">
                    <div className="border-b border-fog pb-4 text-center">
                      <p className="font-serif italic text-xs text-brass font-semibold tracking-wider">BOARDROOM CORPORATE DOCUMENT</p>
                      <h2 className="font-serif text-xl font-bold tracking-wide mt-1">Regular Meeting of the Board of Directors</h2>
                      <p className="text-xs text-ink/50 mt-1">Date: May 25, 2026 | Time: 6:00 PM PST</p>
                    </div>

                    <div className="space-y-4">
                      <p className="font-bold text-xs uppercase tracking-widest text-ink/40 border-b border-fog/50 pb-1">Order of Business</p>
                      
                      <div className="flex gap-4 items-start py-2">
                        <span className="font-serif font-bold text-sm text-ink/40">6:00 PM</span>
                        <div>
                          <h4 className="font-bold text-sm text-ink">I. Call to Order & Welcome</h4>
                          <p className="text-xs text-ink/60">Roll call, verification of quorum, and approval of past meeting minutes.</p>
                        </div>
                      </div>

                      {/* Clickable Area 1: Comp package */}
                      <div 
                        onClick={() => handleFlagClick('agenda-comp')}
                        className={`flex gap-4 items-start p-3 rounded-lg border cursor-pointer transition-premium ${
                          selectedFlagId === 'agenda-comp'
                            ? 'bg-brass/10 border-brass shadow-sm ring-1 ring-brass/30'
                            : showSolutions 
                              ? 'bg-amber-100/80 border-amber-300 animate-pulse'
                              : 'hover:bg-paper border-transparent'
                        }`}
                      >
                        <span className="font-serif font-bold text-sm text-ink/40">6:15 PM</span>
                        <div className="flex-grow">
                          <h4 className={`font-bold text-sm leading-tight flex items-center gap-1.5 ${showSolutions || selectedFlagId === 'agenda-comp' ? 'text-brass font-extrabold' : 'text-ink'}`}>
                            II. Executive Compensation Review & Approval
                            {(showSolutions || selectedFlagId === 'agenda-comp') && <AlertCircle className="w-4 h-4 shrink-0 text-brass" />}
                          </h4>
                          <p className="text-xs text-ink/60 mt-0.5">
                            Review and approve the Executive Director's compensation package for FY 2026-2027. (Presentation by the Executive Director).
                          </p>
                        </div>
                      </div>

                      <div className="flex gap-4 items-start py-2">
                        <span className="font-serif font-bold text-sm text-ink/40">6:45 PM</span>
                        <div>
                          <h4 className="font-bold text-sm text-ink">III. Program Impact Reports</h4>
                          <p className="text-xs text-ink/60">Review of the regional training initiatives and scholarship allocations.</p>
                        </div>
                      </div>

                      {/* Clickable Area 2: Bylaw updates */}
                      <div 
                        onClick={() => handleFlagClick('agenda-bylaws')}
                        className={`flex gap-4 items-start p-3 rounded-lg border cursor-pointer transition-premium ${
                          selectedFlagId === 'agenda-bylaws'
                            ? 'bg-brass/10 border-brass shadow-sm ring-1 ring-brass/30'
                            : showSolutions 
                              ? 'bg-amber-100/80 border-amber-300 animate-pulse'
                              : 'hover:bg-paper border-transparent'
                        }`}
                      >
                        <span className="font-serif font-bold text-sm text-ink/40">7:15 PM</span>
                        <div className="flex-grow">
                          <h4 className={`font-bold text-sm leading-tight flex items-center gap-1.5 ${showSolutions || selectedFlagId === 'agenda-bylaws' ? 'text-brass font-extrabold' : 'text-ink'}`}>
                            IV. Bylaw Amendment Approvals (Voice vote scheduled)
                            {(showSolutions || selectedFlagId === 'agenda-bylaws') && <AlertCircle className="w-4 h-4 shrink-0 text-brass" />}
                          </h4>
                          <p className="text-xs text-ink/60 mt-0.5">
                            Vote to adopt the fully updated 2026 Organizational Bylaws. Copies of the final text will be distributed by hand at the meeting.
                          </p>
                        </div>
                      </div>

                      <div className="flex gap-4 items-start py-2">
                        <span className="font-serif font-bold text-sm text-ink/40">7:45 PM</span>
                        <div>
                          <h4 className="font-bold text-sm text-ink">V. General Good & Welfare & Adjournment</h4>
                          <p className="text-xs text-ink/60">Open director remarks and scheduler for next quarter meeting.</p>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* 2. CEO REPORT SHEET */}
                {activeTab === 'ceo' && (
                  <div className="space-y-6">
                    <div className="border-b border-fog pb-4 text-center">
                      <p className="font-serif italic text-xs text-brass font-semibold tracking-wider">BOARDROOM CORPORATE DOCUMENT</p>
                      <h2 className="font-serif text-xl font-bold tracking-wide mt-1">Executive Director Operations Briefing</h2>
                      <p className="text-xs text-ink/50 mt-1">Submitted by: Executive Director | Q2 2026</p>
                    </div>

                    <div className="space-y-4 font-serif text-sm text-ink/80 italic leading-relaxed">
                      <p>
                        "Esteemed members of the Board, I am proud to report that Q2 has seen unprecedented growth in our direct outreach programs. Donor engagement metrics are trending upward, and our staff has worked tirelessly to execute our strategic benchmarks."
                      </p>

                      <p className="font-sans font-bold text-xs uppercase tracking-widest text-ink/40 border-b border-fog/50 pb-1 not-italic mt-6">Financial & Contract Operations</p>

                      {/* Clickable Area 3: Personal credit card bridge loan */}
                      <div 
                        onClick={() => handleFlagClick('ceo-bridge')}
                        className={`p-3 rounded-lg border cursor-pointer font-sans not-italic transition-premium ${
                          selectedFlagId === 'ceo-bridge'
                            ? 'bg-brass/10 border-brass shadow-sm ring-1 ring-brass/30'
                            : showSolutions 
                              ? 'bg-amber-100/80 border-amber-300 animate-pulse'
                              : 'hover:bg-paper border-transparent'
                        }`}
                      >
                        <div className="flex items-start gap-2.5">
                          {(showSolutions || selectedFlagId === 'ceo-bridge') && <AlertCircle className="w-4 h-4 shrink-0 text-brass mt-0.5" />}
                          <div>
                            <span className="font-bold text-xs block text-brass uppercase tracking-wider mb-1">Treasury Action Note</span>
                            <p className="text-xs text-ink/80 leading-relaxed font-serif italic">
                              "To address temporary commercial banking cash-flow delays in April, <strong className="bg-amber-100 border-b-2 border-brass/50 font-sans not-italic font-bold px-1 text-ink">I secured temporary bridge financing of $35,000 using my personal credit card, charging the organization a nominal 10% interest rate</strong> to keep programs afloat."
                            </p>
                          </div>
                        </div>
                      </div>

                      {/* Clickable Area 4: Contract with spouse */}
                      <div 
                        onClick={() => handleFlagClick('ceo-spouse')}
                        className={`p-3 rounded-lg border cursor-pointer font-sans not-italic transition-premium ${
                          selectedFlagId === 'ceo-spouse'
                            ? 'bg-brass/10 border-brass shadow-sm ring-1 ring-brass/30'
                            : showSolutions 
                              ? 'bg-amber-100/80 border-amber-300 animate-pulse'
                              : 'hover:bg-paper border-transparent'
                        }`}
                      >
                        <div className="flex items-start gap-2.5">
                          {(showSolutions || selectedFlagId === 'ceo-spouse') && <AlertCircle className="w-4 h-4 shrink-0 text-brass mt-0.5" />}
                          <div>
                            <span className="font-bold text-xs block text-brass uppercase tracking-wider mb-1">Vendor Action Note</span>
                            <p className="text-xs text-ink/80 leading-relaxed font-serif italic">
                              "To accelerate the launch of our digital database, <strong className="bg-amber-100 border-b-2 border-brass/50 font-sans not-italic font-bold px-1 text-ink">I authorized a $15,000 marketing contract with Elite Web Designs, owned by my spouse, to bypass slow board approvals</strong> and capture a 15% family discount."
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* 3. FINANCIALS SHEET */}
                {activeTab === 'financials' && (
                  <div className="space-y-6">
                    <div className="border-b border-fog pb-4 text-center">
                      <p className="font-serif italic text-xs text-brass font-semibold tracking-wider">BOARDROOM CORPORATE DOCUMENT</p>
                      <h2 className="font-serif text-xl font-bold tracking-wide mt-1">Interim Statement of Activities (Financials)</h2>
                      <p className="text-xs text-ink/50 mt-1">For Six Months Ending April 30, 2026</p>
                    </div>

                    <div className="space-y-4 font-mono text-[11px] leading-relaxed">
                      <div className="grid grid-cols-6 border-b border-fog pb-1 text-ink/60 font-sans uppercase font-bold text-[9px] tracking-wider">
                        <span className="col-span-3">Revenue & Transfers</span>
                        <span className="col-span-1 text-right">Unrestricted</span>
                        <span className="col-span-1 text-right">Restricted</span>
                        <span className="col-span-1 text-right">Total</span>
                      </div>

                      <div className="grid grid-cols-6">
                        <span className="col-span-3 font-sans font-medium">Individual Donations</span>
                        <span className="col-span-1 text-right">$45,000</span>
                        <span className="col-span-1 text-right">$0</span>
                        <span className="col-span-1 text-right">$45,000</span>
                      </div>

                      <div className="grid grid-cols-6">
                        <span className="col-span-3 font-sans font-medium">Restricted Scholarship Grant</span>
                        <span className="col-span-1 text-right">$0</span>
                        <span className="col-span-1 text-right">$85,000</span>
                        <span className="col-span-1 text-right">$85,000</span>
                      </div>

                      {/* Clickable Area 5: Restricted Assets Reallocated */}
                      <div 
                        onClick={() => handleFlagClick('fin-restricted')}
                        className={`grid grid-cols-6 p-2 rounded cursor-pointer transition-premium -mx-2 border ${
                          selectedFlagId === 'fin-restricted'
                            ? 'bg-brass/10 border-brass shadow-sm ring-1 ring-brass/30 text-brass'
                            : showSolutions 
                              ? 'bg-amber-100 border-amber-300 text-ink'
                              : 'hover:bg-paper border-transparent'
                        }`}
                      >
                        <span className="col-span-3 font-sans font-bold flex items-center gap-1">
                          ↳ Net Restricted Assets Redeployed to Core Ops
                          {(showSolutions || selectedFlagId === 'fin-restricted') && <AlertCircle className="w-3.5 h-3.5 text-brass" />}
                        </span>
                        <span className="col-span-1 text-right text-emerald-700 font-bold">+$65,000</span>
                        <span className="col-span-1 text-right text-rose-700 font-bold">-$65,000</span>
                        <span className="col-span-1 text-right">$0</span>
                      </div>

                      <div className="grid grid-cols-6 border-t border-fog/40 pt-2 text-ink/60 font-sans uppercase font-bold text-[9px] tracking-wider mt-4">
                        <span className="col-span-3">Liability Ledger</span>
                        <span className="col-span-1 text-right">Current</span>
                        <span className="col-span-1 text-right">Deferred</span>
                        <span className="col-span-1 text-right">Balance</span>
                      </div>

                      <div className="grid grid-cols-6">
                        <span className="col-span-3 font-sans font-medium">Accounts Payable (Vendors)</span>
                        <span className="col-span-1 text-right">$12,400</span>
                        <span className="col-span-1 text-right">$4,500</span>
                        <span className="col-span-1 text-right">$16,900</span>
                      </div>

                      {/* Clickable Area 6: Payroll Tax Withholdings */}
                      <div 
                        onClick={() => handleFlagClick('fin-payroll')}
                        className={`grid grid-cols-6 p-2 rounded cursor-pointer transition-premium -mx-2 border ${
                          selectedFlagId === 'fin-payroll'
                            ? 'bg-brass/10 border-brass shadow-sm ring-1 ring-brass/30 text-brass'
                            : showSolutions 
                              ? 'bg-amber-100 border-amber-300 text-ink'
                              : 'hover:bg-paper border-transparent'
                        }`}
                      >
                        <span className="col-span-3 font-sans font-bold flex items-center gap-1">
                          Employee Payroll Withholding Liabilities (Quarterly)
                          {(showSolutions || selectedFlagId === 'fin-payroll') && <AlertCircle className="w-3.5 h-3.5 text-brass" />}
                        </span>
                        <span className="col-span-1 text-right font-bold text-emerald-700">$0</span>
                        <span className="col-span-1 text-right text-rose-700 font-bold">+$18,000</span>
                        <span className="col-span-1 text-right font-bold text-rose-700">$18,000</span>
                      </div>
                      
                      <div className="text-[10px] font-sans italic text-ink/50 mt-2">
                        *Note: Quarterly withholding balances deferred to next payroll cycle to maximize general operations cash.
                      </div>
                    </div>
                  </div>
                )}

                {/* 4. BUDGET SHEET */}
                {activeTab === 'budget' && (
                  <div className="space-y-6">
                    <div className="border-b border-fog pb-4 text-center">
                      <p className="font-serif italic text-xs text-brass font-semibold tracking-wider">BOARDROOM CORPORATE DOCUMENT</p>
                      <h2 className="font-serif text-xl font-bold tracking-wide mt-1">Statement of Budget vs. Actual Expenditures</h2>
                      <p className="text-xs text-ink/50 mt-1">For Fiscal Year Period Ending April 30, 2026</p>
                    </div>

                    <div className="space-y-4 font-mono text-[11px] leading-relaxed">
                      <div className="grid grid-cols-6 border-b border-fog pb-1 text-ink/60 font-sans uppercase font-bold text-[9px] tracking-wider">
                        <span className="col-span-3">Expenditure Ledger Line</span>
                        <span className="col-span-1 text-right">Budgeted</span>
                        <span className="col-span-1 text-right">Actual</span>
                        <span className="col-span-1 text-right">Variance</span>
                      </div>

                      <div className="grid grid-cols-6">
                        <span className="col-span-3 font-sans font-medium">Program Delivery Direct Costs</span>
                        <span className="col-span-1 text-right">$120,000</span>
                        <span className="col-span-1 text-right">$115,000</span>
                        <span className="col-span-1 text-right text-emerald-700">-$5,000</span>
                      </div>

                      {/* Clickable Area 7: Travel overrun */}
                      <div 
                        onClick={() => handleFlagClick('budget-travel')}
                        className={`grid grid-cols-6 p-2 rounded cursor-pointer transition-premium -mx-2 border ${
                          selectedFlagId === 'budget-travel'
                            ? 'bg-brass/10 border-brass shadow-sm ring-1 ring-brass/30 text-brass'
                            : showSolutions 
                              ? 'bg-amber-100 border-amber-300 text-ink'
                              : 'hover:bg-paper border-transparent'
                        }`}
                      >
                        <span className="col-span-3 font-sans font-bold flex items-center gap-1 text-left">
                          Executive Director Discretionary Travel & Retreats
                          {(showSolutions || selectedFlagId === 'budget-travel') && <AlertCircle className="w-3.5 h-3.5 text-brass" />}
                        </span>
                        <span className="col-span-1 text-right font-medium">$10,000</span>
                        <span className="col-span-1 text-right font-bold">$45,000</span>
                        <span className="col-span-1 text-right font-bold text-rose-700">+$35,000</span>
                      </div>

                      <div className="grid grid-cols-6">
                        <span className="col-span-3 font-sans font-medium">Office Lease & Utilities</span>
                        <span className="col-span-1 text-right">$24,000</span>
                        <span className="col-span-1 text-right">$23,800</span>
                        <span className="col-span-1 text-right text-emerald-700">-$200</span>
                      </div>

                      {/* Clickable Area 8: Consultant board member */}
                      <div 
                        onClick={() => handleFlagClick('budget-consult')}
                        className={`grid grid-cols-6 p-2 rounded cursor-pointer transition-premium -mx-2 border ${
                          selectedFlagId === 'budget-consult'
                            ? 'bg-brass/10 border-brass shadow-sm ring-1 ring-brass/30 text-brass'
                            : showSolutions 
                              ? 'bg-amber-100 border-amber-300 text-ink'
                              : 'hover:bg-paper border-transparent'
                        }`}
                      >
                        <span className="col-span-3 font-sans font-bold flex items-center gap-1 text-left">
                          Professional Consulting Fees (Board Member John Doe)
                          {(showSolutions || selectedFlagId === 'budget-consult') && <AlertCircle className="w-3.5 h-3.5 text-brass" />}
                        </span>
                        <span className="col-span-1 text-right font-medium">$5,000</span>
                        <span className="col-span-1 text-right font-bold">$28,000</span>
                        <span className="col-span-1 text-right font-bold text-rose-700">+$23,000</span>
                      </div>

                      <div className="grid grid-cols-6">
                        <span className="col-span-3 font-sans font-medium">Liability Insurance Policies</span>
                        <span className="col-span-1 text-right">$4,500</span>
                        <span className="col-span-1 text-right">$4,500</span>
                        <span className="col-span-1 text-right text-emerald-700">$0</span>
                      </div>
                    </div>
                  </div>
                )}

                {/* 5. AUDIT SHEET */}
                {activeTab === 'audit' && (
                  <div className="space-y-6">
                    <div className="border-b border-fog pb-4 text-center">
                      <p className="font-serif italic text-xs text-brass font-semibold tracking-wider">BOARDROOM CORPORATE DOCUMENT</p>
                      <h2 className="font-serif text-xl font-bold tracking-wide mt-1">Internal Control Audit Assessment Findings</h2>
                      <p className="text-xs text-ink/50 mt-1">Prepared by: Independent CPA Advisor | Q1 Audit Notes</p>
                    </div>

                    <div className="space-y-4">
                      <p className="font-bold text-xs uppercase tracking-widest text-ink/40 border-b border-fog/50 pb-1">Operational Observations</p>
                      
                      <div className="space-y-3 font-serif italic text-ink/80 text-sm">
                        <p>
                          "We evaluated the accounting frameworks and segregation of duties. Standard bookkeeping practices are executed efficiently, but serious vulnerabilities exist in cash disbursement authorization levels."
                        </p>
                      </div>

                      {/* Clickable Area 9: Check signature controls */}
                      <div 
                        onClick={() => handleFlagClick('audit-controls')}
                        className={`p-4 rounded-lg border cursor-pointer font-sans transition-premium ${
                          selectedFlagId === 'audit-controls'
                            ? 'bg-brass/10 border-brass shadow-sm ring-1 ring-brass/30'
                            : showSolutions 
                              ? 'bg-amber-100/80 border-amber-300 animate-pulse'
                              : 'hover:bg-paper border-transparent'
                        }`}
                      >
                        <div className="flex gap-3 items-start">
                          {(showSolutions || selectedFlagId === 'audit-controls') && <AlertCircle className="w-5 h-5 text-brass shrink-0 mt-0.5" />}
                          <div>
                            <span className="font-bold text-xs uppercase tracking-wider text-rose-800 block mb-1">Internal Audit Finding #1</span>
                            <p className="font-sans font-bold text-sm text-ink leading-snug">
                              Single-Signature Transaction Limits & Executive Reimbursement
                            </p>
                            <p className="text-xs text-ink/70 mt-1 font-serif italic">
                              "The accounting system authorizes <strong className="bg-amber-100 border-b-2 border-brass/50 font-sans not-italic font-bold px-1 text-ink">single-signature authority on all checks and electronic wire transfers up to $50,000, including direct reimbursements to the Executive Director</strong> without secondary board countersignatures."
                            </p>
                          </div>
                        </div>
                      </div>

                      <div className="bg-emerald-50 text-emerald-800 p-4 rounded-lg border border-emerald-200/50 space-y-1">
                        <span className="font-bold text-xs uppercase tracking-wider block text-emerald-800">Internal Audit Finding #2 (Satisfactory)</span>
                        <p className="font-sans font-bold text-sm leading-snug">Donor Database Reconciliation</p>
                        <p className="text-xs text-emerald-800/80 font-serif italic">
                          "Individual donor receipts are successfully reconciled on a weekly schedule. The donor software ledger directly maps into general bookkeeping ledgers with proper audits."
                        </p>
                      </div>
                    </div>
                  </div>
                )}
                
              </div>

              {/* Guide Overlay indicator */}
              <div className="bg-paper/20 py-2.5 px-6 border-t border-fog flex justify-between items-center text-xs font-semibold text-ink/50">
                <span className="flex items-center gap-1.5 font-sans">
                  <BookOpen className="w-4 h-4 text-brass" />
                  <span>Click highlighted sections of the document to inspect.</span>
                </span>
                <span className="font-serif italic font-bold">The Principles of Board Training</span>
              </div>
            </div>

            {/* Right Hand: The Audit Panel (5 Cols) */}
            <div className="lg:col-span-5 space-y-6">
              
              {!currentFlag ? (
                /* Unselected State Placeholder */
                <div className="bg-white rounded-2xl border border-fog p-8 text-center min-h-[450px] flex flex-col justify-center items-center space-y-4">
                  <div className="bg-paper text-brass p-4 rounded-full border border-brass/30 animate-pulse">
                    <HelpCircle className="w-8 h-8" />
                  </div>
                  <h3 className="font-serif font-bold text-lg text-ink">
                    Inspect the Board Packet
                  </h3>
                  <p className="text-xs sm:text-sm text-ink/70 max-w-sm leading-relaxed">
                    Choose one of the document tabs on the left, then click on any highlighted financial, procedural, or operations section to run an instant fiduciary compliance check.
                  </p>
                  {showSolutions ? null : (
                    <button
                      onClick={() => setShowShowSolutions(true)}
                      className="mt-2 text-xs font-bold text-slate-brand hover:text-brass uppercase tracking-wider underline transition-premium"
                    >
                      Or, reveal all answers across the packet
                    </button>
                  )}
                </div>
              ) : (
                /* Active Audit State */
                <div className="space-y-6 animate-fade-in text-left">
                  
                  {/* Summary Header */}
                  <div className="bg-white rounded-xl border border-fog p-6 space-y-3 shadow-sm">
                    <div className="flex justify-between items-center">
                      <span className="text-[10px] font-bold tracking-widest text-ink/40 uppercase">
                        Lab Audit Detail
                      </span>
                      <CaliforniaNoteBadge 
                        statute={currentFlag.statute} 
                        text={currentFlag.statuteText} 
                        className="scale-90 origin-right"
                      />
                    </div>
                    <h3 className="font-serif font-bold text-xl text-ink leading-tight">
                      {currentFlag.title}
                    </h3>
                  </div>

                  {/* Fiduciary Red Flags (DoNotDoThisCard) */}
                  <DoNotDoThisCard 
                    title={currentFlag.flagTitle} 
                    items={currentFlag.redFlags}
                    consequence={currentFlag.consequence}
                  />

                  {/* Director Question Script (AskThisCard) */}
                  <AskThisCard 
                    question={currentFlag.scriptQuestion} 
                    rationale={currentFlag.scriptRationale} 
                    targetRole={currentFlag.scriptTarget}
                  />

                  {/* Legal Escalation Referrals (LegalEscalationCard) */}
                  {currentFlag.isSevere ? (
                    <LegalEscalationCard 
                      trigger="California Fiduciary Risk Alert" 
                      explanation={`This finding represents a direct violation of regulatory law. Proceeding without certified legal restructuring can trigger severe state penalties, personal director audit assessments, or loss of tax exemption. We recommend obtaining a bylaws or procedures audit from independent legal counsel.`} 
                      actionText="Consult Nonprofit Attorneys"
                      relatedTopic={currentFlag.statute}
                    />
                  ) : (
                    <div className="bg-paper border border-fog rounded-xl p-5 space-y-3">
                      <h4 className="font-sans font-bold text-xs uppercase tracking-wider text-slate-brand">
                        Governance Recommendation
                      </h4>
                      <p className="text-xs text-ink/80 leading-relaxed">
                        To correct this process variance, draft a detailed board resolution establishing active policies, mandate that the executive follow the correct timeline, and consult NPO Lawyers for quick regulatory verification.
                      </p>
                      <a
                        href="https://NPOlawyers.com"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1 text-xs font-bold text-brass hover:text-ink transition-premium uppercase tracking-wider"
                      >
                        <span>Visit NPOlawyers.com</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </a>
                    </div>
                  )}

                </div>
              )}

            </div>

          </div>

          {/* Quick Disclaimer */}
          <div className="bg-white/50 border border-fog/80 rounded-xl p-5 text-center text-xs text-ink/60 font-sans max-w-4xl mx-auto">
            <strong className="text-brass uppercase tracking-wider text-[10px] block mb-1">Educational Fiduciary Laboratory</strong>
            These scenarios are modeled after common corporate and financial errors inspected by California regulators. They are designed for educational training purposes only. Always consult a licensed attorney to audit your specific board packets and operational policies.
          </div>

        </div>
      </div>
    </Layout>
  );
};
export default BoardPacketLab;
