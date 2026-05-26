import React, { useState } from 'react';
import { Layout } from '../components/Layout';
import { useRouter } from '../components/Router';
import { 
  ShieldAlert, AlertCircle, HelpCircle, ArrowRight, BookOpen, CheckCircle, X, ShieldCheck 
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
      scriptQuestion: 'Has this board obtained independent comparability data of salaries from similar-sized California organizations in our geographic region, and will the Executive Director recuse themselves from both our deliberations and the vote?',
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
      scriptQuestion: 'Have these proposed bylaw amendments been vetted and certified by an independent California charity attorney, and can we postpone this vote to allow directors at least seven days to read the full redline draft?',
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
      statuteText: 'Duty of Care and standard of care requirements for board directors.',
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

  const [selectedItemId, setSelectedItemId] = useState<string | null>(null);
  const [showSolutions, setShowSolutions] = useState(false);
  const [isScannerDrawerOpen, setIsScannerDrawerOpen] = useState(false);
  const [showSuccessSeal, setShowSuccessSeal] = useState(() => {
    try {
      const saved = localStorage.getItem('cdx_packet_audited_seal');
      return saved === 'true';
    } catch {
      return false;
    }
  });
  const [uncoveredFlags, setUncoveredFlags] = useState<string[]>(() => {
    const saved = localStorage.getItem('cdx_board_packet_uncovered_flags');
    return saved ? JSON.parse(saved) : [];
  });
  const [auditedCompliant, setAuditedCompliant] = useState<string[]>(() => {
    const saved = localStorage.getItem('cdx_board_packet_audited_compliant');
    return saved ? JSON.parse(saved) : [];
  });

  const resetSimulation = () => {
    setUncoveredFlags([]);
    setAuditedCompliant([]);
    setSelectedItemId(null);
    setShowSolutions(false);
    setShowSuccessSeal(false);
    localStorage.removeItem('cdx_board_packet_uncovered_flags');
    localStorage.removeItem('cdx_board_packet_audited_compliant');
    localStorage.removeItem('cdx_packet_audited_seal');
  };

  const tabFlags: Record<string, string[]> = {
    agenda: ['agenda-comp', 'agenda-bylaws'],
    ceo: ['ceo-bridge', 'ceo-spouse'],
    financials: ['fin-restricted', 'fin-payroll'],
    budget: ['budget-travel', 'budget-consult'],
    audit: ['audit-controls']
  };

  const compliantDb: Record<string, { id: string; title: string; description: string; complianceNote: string; }> = {
    'agenda-call': {
      id: 'agenda-call',
      title: 'I. Call to Order & Welcome',
      description: 'Recording attendance, verifying a quorum, and formally approving previous minutes are standard practices.',
      complianceNote: 'A timely Call to Order, verifying quorum under California Corporations Code § 5211, and approving past minutes establishes a legal, transparent record of the board\'s meeting.'
    },
    'agenda-reports': {
      id: 'agenda-reports',
      title: 'III. Program Impact Reports',
      description: 'Reviewing program performance satisfies the Fiduciary Duty of Care.',
      complianceNote: 'Regular review of impact statistics against corporate missions represents active, healthy oversight, proving that charitable assets are directly applied to public benefit.'
    },
    'agenda-welfare': {
      id: 'agenda-welfare',
      title: 'V. General Good & Welfare & Adjournment',
      description: 'Formal adjournment sets clear legal boundaries for corporate actions.',
      complianceNote: 'Adjourning the meeting formally and recording the time ensures that any post-meeting remarks are outside of formal corporate proceedings and do not bind the entity.'
    },
    'ceo-outreach': {
      id: 'ceo-outreach',
      title: 'CEO Outreach Operations Briefing',
      description: 'Receiving executive updates is a crucial element of the board\'s Duty of Care.',
      complianceNote: 'Active listening to operational metrics allows the board to maintain reasonable oversight of executive functions, satisfying their supervisory mandate.'
    },
    'fin-donations': {
      id: 'fin-donations',
      title: 'Revenue Audit: Individual Donations',
      description: 'Broad public support prevents reclassification as a private foundation.',
      complianceNote: 'Fostering public donations helps maintain a positive outcome under the IRS Public Support Test, ensuring the organization preserves its public charity status.'
    },
    'fin-restricted-grant': {
      id: 'fin-restricted-grant',
      title: 'Revenue Audit: Restricted Grants',
      description: 'Standard receipt of dedicated program funds.',
      complianceNote: 'Scholarship or program-restricted grant receipts are standard, provided the accounting system maintains segmented ledger columns to enforce donor intent.'
    },
    'fin-payables': {
      id: 'fin-payables',
      title: 'Accounts Payable Ledger',
      description: 'Normal vendor payables management.',
      complianceNote: 'Deferred trade payables are standard cash management tools. As long as payroll withholdings are not co-mingled or delayed, AP is standard.'
    },
    'budget-program': {
      id: 'budget-program',
      title: 'Program Delivery Costs',
      description: 'Aligning operating budgets directly with programs satisfies efficiency rules.',
      complianceNote: 'Allocating the majority of funds (above 65%) directly to program services is highly praised by the CA Attorney General and major charity oversight bureaus.'
    },
    'budget-lease': {
      id: 'budget-lease',
      title: 'Office Lease & Utilities Overhead',
      description: 'Standard administrative overhead cost tracking.',
      complianceNote: 'Overhead lease obligations are fully compliant support costs, assuming agreements are executed at arm\'s length and authorized in the annual budget.'
    },
    'budget-insurance': {
      id: 'budget-insurance',
      title: 'Commercial Liability Insurance Policies',
      description: 'Fiduciary Duty of Care requires adequate asset shielding.',
      complianceNote: 'Maintaining robust general liability coverage is the foundational block of risk management, shielding corporate assets from physical and operational claims.'
    },
    'audit-reconciliation': {
      id: 'audit-reconciliation',
      title: 'Internal Audit: Weekly Reconciliations',
      description: 'Robust internal bookkeeping controls.',
      complianceNote: 'Weekly cross-system reconciliation between donor CRM ledgers and bank accounting logs represents an excellent internal control that prevents leaks.'
    }
  };

  const handleItemClick = (itemId: string) => {
    setSelectedItemId(itemId);
    // If it's a red flag, track it in uncoveredFlags
    if (itemId in redFlagsDb && !uncoveredFlags.includes(itemId)) {
      const updated = [...uncoveredFlags, itemId];
      setUncoveredFlags(updated);
      localStorage.setItem('cdx_board_packet_uncovered_flags', JSON.stringify(updated));
      if (updated.length === 9) {
        setShowSuccessSeal(true);
        localStorage.setItem('cdx_packet_audited_seal', 'true');
      }
    }
    // If it's a compliant item, track it in auditedCompliant
    if (itemId in compliantDb && !auditedCompliant.includes(itemId)) {
      const updated = [...auditedCompliant, itemId];
      setAuditedCompliant(updated);
      localStorage.setItem('cdx_board_packet_audited_compliant', JSON.stringify(updated));
    }
  };

  const isRedFlag = selectedItemId ? (selectedItemId in redFlagsDb) : false;
  const isCompliant = selectedItemId ? (selectedItemId in compliantDb) : false;
  const currentFlag = isRedFlag ? redFlagsDb[selectedItemId!] : null;
  const currentCompliant = isCompliant ? compliantDb[selectedItemId!] : null;


  const renderAuditPin = (itemId: string, isRed: boolean) => {
    const isSelected = selectedItemId === itemId;
    const isUncovered = isRed ? uncoveredFlags.includes(itemId) : auditedCompliant.includes(itemId);
    return (
      <div 
        onClick={(e) => {
          e.stopPropagation();
          handleItemClick(itemId);
        }}
        className={`absolute -left-11 top-1/2 -translate-y-1/2 w-6.5 h-6.5 rounded-full border flex items-center justify-center cursor-pointer transition-premium z-20 ${
          isSelected
            ? isRed
              ? 'bg-rose-500 border-rose-600 text-white shadow shadow-rose-200 ring-2 ring-rose-500/20'
              : 'bg-emerald-500 border-emerald-600 text-white shadow shadow-emerald-200 ring-2 ring-emerald-500/20'
            : isRed && (isUncovered || showSolutions)
              ? 'bg-amber-100 border-amber-300 text-amber-700 hover:bg-amber-200'
              : !isRed && isUncovered
                ? 'bg-emerald-50 border-emerald-300 text-emerald-700 hover:bg-emerald-100'
                : 'bg-white border-brass/50 text-brass animate-pulse ring-4 ring-brass/10 hover:border-brass hover:bg-brass/5'
        }`}
        title={isRed ? "Audit Target: Analyze for regulatory risks" : "Audit Target: Analyze for compliance"}
      >
        {isSelected ? (
          isRed ? (
            <AlertCircle className="w-3.5 h-3.5" />
          ) : (
            <CheckCircle className="w-3.5 h-3.5" />
          )
        ) : isRed && (isUncovered || showSolutions) ? (
          <AlertCircle className="w-3.5 h-3.5" />
        ) : !isRed && isUncovered ? (
          <CheckCircle className="w-3.5 h-3.5" />
        ) : (
          <span className="text-[10px] font-sans font-extrabold text-brass">?</span>
        )}
      </div>
    );
  };

  const renderPageTracker = (tab: 'agenda' | 'ceo' | 'financials' | 'budget' | 'audit') => {
    const flags = tabFlags[tab];
    const uncovered = flags.filter(f => uncoveredFlags.includes(f)).length;
    const total = flags.length;
    const isComplete = uncovered === total;

    return (
      <div className="my-4 bg-paper/50 border border-fog/85 rounded-xl p-3 flex items-center justify-between text-xs font-semibold text-ink">
        <div className="flex items-center gap-2.5">
          <div className="relative flex items-center justify-center shrink-0">
            <svg className="w-8 h-8 transform -rotate-90">
              <circle cx="16" cy="16" r="13" stroke="currentColor" strokeWidth="2" fill="transparent" className="text-slate-100" />
              <circle 
                cx="16" 
                cy="16" 
                r="13" 
                stroke="currentColor" 
                strokeWidth="2.5" 
                fill="transparent" 
                strokeDasharray={2 * Math.PI * 13}
                strokeDashoffset={2 * Math.PI * 13 * (1 - (total > 0 ? uncovered / total : 1))}
                className={`${isComplete ? 'text-emerald-600' : 'text-brass'} transition-premium`}
              />
            </svg>
            <span className="absolute text-[9px] font-sans font-black">
              {uncovered}/{total}
            </span>
          </div>
          <div>
            <p className="font-sans font-bold text-ink leading-tight">
              {isComplete ? 'Fiduciary Audit Complete!' : 'Scan page for governance risks'}
            </p>
            <p className="text-[10px] text-ink/50 font-normal leading-tight">
              {isComplete ? 'All critical regulatory vulnerabilities identified.' : `${total - uncovered} remaining risk to uncover.`}
            </p>
          </div>
        </div>
        
        <div>
          {isComplete ? (
            <span className="inline-flex items-center gap-1 px-2 py-0.5 bg-emerald-50 text-emerald-700 border border-emerald-200 rounded-full text-[9px] font-bold uppercase tracking-wider">
              <CheckCircle className="w-3 h-3 animate-bounce" />
              <span>Page Audited</span>
            </span>
          ) : (
            <span className="inline-flex items-center gap-1 px-2 py-0.5 bg-brass/15 text-brass border border-brass/35 rounded-full text-[9px] font-bold uppercase tracking-wider animate-pulse">
              <ShieldAlert className="w-3 h-3" />
              <span>Scanning...</span>
            </span>
          )}
        </div>
      </div>
    );
  };

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
            
            <div className="flex flex-col sm:flex-row items-end sm:items-center gap-3 shrink-0">
              {/* Overall progress meter */}
              <div className="flex items-center gap-2 bg-white px-4 py-2 border border-fog rounded-lg shadow-sm">
                <div className="text-right">
                  <span className="text-[9px] font-bold text-ink/40 uppercase tracking-wider block">Lab Progress</span>
                  <span className="text-xs font-extrabold text-brass">{uncoveredFlags.length} of 9 Uncovered</span>
                </div>
                <div className="w-16 bg-slate-100 h-1.5 rounded-full overflow-hidden border border-slate-200">
                  <div 
                    className="bg-brass h-full transition-premium" 
                    style={{ width: `${(uncoveredFlags.length / 9) * 100}%` }}
                  />
                </div>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => setIsScannerDrawerOpen(true)}
                  className="px-4 py-2.5 bg-teal-brand/10 hover:bg-teal-brand/20 text-teal-brand border border-teal-brand/30 rounded text-xs font-bold uppercase tracking-wider flex items-center gap-1.5 transition-premium cursor-pointer"
                >
                  <BookOpen className="w-3.5 h-3.5" />
                  <span>Audit Wizard Drawer</span>
                </button>
                <button
                  onClick={resetSimulation}
                  className="px-4 py-2.5 text-xs font-bold uppercase tracking-wider rounded border border-rose-200 text-rose-700 bg-rose-50/50 hover:bg-rose-50 hover:border-rose-300 transition-premium"
                >
                  Reset Simulation
                </button>
                <button
                  onClick={() => setShowSolutions(!showSolutions)}
                  className={`px-4 py-2.5 text-xs font-bold uppercase tracking-wider rounded border transition-premium ${
                    showSolutions 
                      ? 'bg-brass text-ink border-brass shadow' 
                      : 'bg-white text-ink/80 border-fog hover:border-brass hover:text-brass'
                  }`}
                >
                  {showSolutions ? 'Hide Answer Highlights' : 'Reveal Red-Flag Answers'}
                </button>
                <button
                  onClick={() => navigate('contact-us?topic=general&message=We%20would%20like%20to%20request%20information%20on%20boardroom%20compliance%20or%20consult%20regarding%20boardroom%20red%20flags.')}
                  className="px-4 py-2.5 bg-slate-brand hover:bg-ink text-white text-xs font-bold uppercase tracking-wider rounded shadow transition-premium flex items-center gap-1.5 border-0 cursor-pointer text-left"
                >
                  <span>Consult Counsel</span>
                  <ShieldAlert className="w-3.5 h-3.5 text-brass" />
                </button>
              </div>
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
                {(['agenda', 'ceo', 'financials', 'budget', 'audit'] as const).map((tab) => {
                  const flags = tabFlags[tab];
                  const uncovered = flags.filter(f => uncoveredFlags.includes(f)).length;
                  const total = flags.length;
                  const isComplete = uncovered === total;
                  return (
                    <button
                      key={tab}
                      onClick={() => {
                        setActiveTab(tab);
                        setSelectedItemId(null);
                      }}
                      className={`px-4 py-2.5 text-xs font-bold uppercase tracking-wider rounded-t-lg border-t-2 transition-premium flex items-center gap-1.5 ${
                        activeTab === tab
                          ? 'bg-white border-brass text-brass shadow-sm font-extrabold'
                          : 'text-ink/60 border-transparent hover:text-ink hover:bg-white/40'
                      }`}
                    >
                      {tab === 'agenda' && `1. Agenda (${uncovered}/${total})`}
                      {tab === 'ceo' && `2. CEO Report (${uncovered}/${total})`}
                      {tab === 'financials' && `3. Financials (${uncovered}/${total})`}
                      {tab === 'budget' && `4. Budget (${uncovered}/${total})`}
                      {tab === 'audit' && `5. Audit Finding (${uncovered}/${total})`}
                      {isComplete && <span className="text-emerald-600 font-extrabold animate-pulse">✓</span>}
                    </button>
                  );
                })}
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

                    {renderPageTracker('agenda')}

                    <div className="space-y-4">
                      <p className="font-bold text-xs uppercase tracking-widest text-ink/40 border-b border-fog/50 pb-1">Order of Business</p>
                      
                      {/* Compliant Section I */}
                      <div 
                        onClick={() => handleItemClick('agenda-call')}
                        className={`relative flex gap-4 items-start p-3 rounded-lg border cursor-pointer transition-premium ${
                          selectedItemId === 'agenda-call'
                            ? 'bg-emerald-50/70 border-emerald-200 shadow-sm ring-1 ring-emerald-200'
                            : 'border-fog bg-white/40 border-l-4 border-l-slate-300 hover:border-l-brass hover:border-brass/40 hover:bg-brass/5 hover:shadow-sm'
                        }`}
                      >
                        {renderAuditPin('agenda-call', false)}
                        <span className="font-serif font-bold text-sm text-ink/40">6:00 PM</span>
                        <div>
                          <h4 className="font-bold text-sm text-ink">I. Call to Order & Welcome</h4>
                          <p className="text-xs text-ink/60">Roll call, verification of quorum, and approval of past meeting minutes.</p>
                        </div>
                      </div>

                      {/* Clickable Area 1: Comp package */}
                      <div 
                        onClick={() => handleItemClick('agenda-comp')}
                        className={`relative flex gap-4 items-start p-3 rounded-lg border cursor-pointer transition-premium ${
                          selectedItemId === 'agenda-comp'
                            ? 'bg-brass/10 border-brass shadow-sm ring-1 ring-brass/30'
                            : showSolutions 
                              ? 'bg-amber-100/80 border-amber-300 animate-pulse'
                              : 'border-fog bg-white/40 border-l-4 border-l-slate-300 hover:border-l-brass hover:border-brass/40 hover:bg-brass/5 hover:shadow-sm'
                        }`}
                      >
                        {renderAuditPin('agenda-comp', true)}
                        <span className="font-serif font-bold text-sm text-ink/40">6:15 PM</span>
                        <div className="flex-grow">
                          <h4 className={`font-bold text-sm leading-tight flex items-center gap-1.5 ${showSolutions || selectedItemId === 'agenda-comp' ? 'text-brass font-extrabold' : 'text-ink'}`}>
                            II. Executive Compensation Review & Approval
                            {(showSolutions || selectedItemId === 'agenda-comp') && <AlertCircle className="w-4 h-4 shrink-0 text-brass" />}
                          </h4>
                          <p className="text-xs text-ink/60 mt-0.5">
                            Review and approve the Executive Director's compensation package for FY 2026-2027. (Presentation by the Executive Director).
                          </p>
                        </div>
                      </div>

                      {/* Compliant Section III */}
                      <div 
                        onClick={() => handleItemClick('agenda-reports')}
                        className={`relative flex gap-4 items-start p-3 rounded-lg border cursor-pointer transition-premium ${
                          selectedItemId === 'agenda-reports'
                            ? 'bg-emerald-50/70 border-emerald-200 shadow-sm ring-1 ring-emerald-200'
                            : 'border-fog bg-white/40 border-l-4 border-l-slate-300 hover:border-l-brass hover:border-brass/40 hover:bg-brass/5 hover:shadow-sm'
                        }`}
                      >
                        {renderAuditPin('agenda-reports', false)}
                        <span className="font-serif font-bold text-sm text-ink/40">6:45 PM</span>
                        <div>
                          <h4 className="font-bold text-sm text-ink">III. Program Impact Reports</h4>
                          <p className="text-xs text-ink/60">Review of the regional training initiatives and scholarship allocations.</p>
                        </div>
                      </div>

                      {/* Clickable Area 2: Bylaw updates */}
                      <div 
                        onClick={() => handleItemClick('agenda-bylaws')}
                        className={`relative flex gap-4 items-start p-3 rounded-lg border cursor-pointer transition-premium ${
                          selectedItemId === 'agenda-bylaws'
                            ? 'bg-brass/10 border-brass shadow-sm ring-1 ring-brass/30'
                            : showSolutions 
                              ? 'bg-amber-100/80 border-amber-300 animate-pulse'
                              : 'border-fog bg-white/40 border-l-4 border-l-slate-300 hover:border-l-brass hover:border-brass/40 hover:bg-brass/5 hover:shadow-sm'
                        }`}
                      >
                        {renderAuditPin('agenda-bylaws', true)}
                        <span className="font-serif font-bold text-sm text-ink/40">7:15 PM</span>
                        <div className="flex-grow">
                          <h4 className={`font-bold text-sm leading-tight flex items-center gap-1.5 ${showSolutions || selectedItemId === 'agenda-bylaws' ? 'text-brass font-extrabold' : 'text-ink'}`}>
                            IV. Bylaw Amendment Approvals (Voice vote scheduled)
                            {(showSolutions || selectedItemId === 'agenda-bylaws') && <AlertCircle className="w-4 h-4 shrink-0 text-brass" />}
                          </h4>
                          <p className="text-xs text-ink/60 mt-0.5">
                            Vote to adopt the fully updated 2026 Organizational Bylaws. Copies of the final text will be distributed by hand at the meeting.
                          </p>
                        </div>
                      </div>

                      {/* Compliant Section V */}
                      <div 
                        onClick={() => handleItemClick('agenda-welfare')}
                        className={`relative flex gap-4 items-start p-3 rounded-lg border cursor-pointer transition-premium ${
                          selectedItemId === 'agenda-welfare'
                            ? 'bg-emerald-50/70 border-emerald-200 shadow-sm ring-1 ring-emerald-200'
                            : 'border-fog bg-white/40 border-l-4 border-l-slate-300 hover:border-l-brass hover:border-brass/40 hover:bg-brass/5 hover:shadow-sm'
                        }`}
                      >
                        {renderAuditPin('agenda-welfare', false)}
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

                    {renderPageTracker('ceo')}

                    <div className="space-y-4">
                      {/* Compliant CEO Report Intro */}
                      <div 
                        onClick={() => handleItemClick('ceo-outreach')}
                        className={`relative p-3 rounded-lg border cursor-pointer transition-premium ${
                          selectedItemId === 'ceo-outreach'
                            ? 'bg-emerald-50/70 border-emerald-200 shadow-sm ring-1 ring-emerald-200'
                            : 'border-fog bg-white/40 border-l-4 border-l-slate-300 hover:border-l-brass hover:border-brass/40 hover:bg-brass/5 hover:shadow-sm'
                        }`}
                      >
                        {renderAuditPin('ceo-outreach', false)}
                        <span className="font-bold text-xs block text-emerald-800 uppercase tracking-wider mb-1 font-sans">Executive Narrative Summary</span>
                        <p className="font-serif italic text-sm text-ink/80 leading-relaxed">
                          "Esteemed members of the Board, I am proud to report that Q2 has seen unprecedented growth in our direct outreach programs. Donor engagement metrics are trending upward, and our staff has worked tirelessly to execute our strategic benchmarks."
                        </p>
                      </div>

                      <p className="font-sans font-bold text-xs uppercase tracking-widest text-ink/40 border-b border-fog/50 pb-1 not-italic mt-6">Financial & Contract Operations</p>

                      {/* Clickable Area 3: Personal credit card bridge loan */}
                      <div 
                        onClick={() => handleItemClick('ceo-bridge')}
                        className={`relative p-3 rounded-lg border cursor-pointer font-sans not-italic transition-premium ${
                          selectedItemId === 'ceo-bridge'
                            ? 'bg-brass/10 border-brass shadow-sm ring-1 ring-brass/30'
                            : showSolutions 
                              ? 'bg-amber-100/80 border-amber-300 animate-pulse'
                              : 'border-fog bg-white/40 border-l-4 border-l-slate-300 hover:border-l-brass hover:border-brass/40 hover:bg-brass/5 hover:shadow-sm'
                        }`}
                      >
                        {renderAuditPin('ceo-bridge', true)}
                        <div className="flex items-start gap-2.5">
                          {(showSolutions || selectedItemId === 'ceo-bridge') && <AlertCircle className="w-4 h-4 shrink-0 text-brass mt-0.5" />}
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
                        onClick={() => handleItemClick('ceo-spouse')}
                        className={`relative p-3 rounded-lg border cursor-pointer font-sans not-italic transition-premium ${
                          selectedItemId === 'ceo-spouse'
                            ? 'bg-brass/10 border-brass shadow-sm ring-1 ring-brass/30'
                            : showSolutions 
                              ? 'bg-amber-100/80 border-amber-300 animate-pulse'
                              : 'border-fog bg-white/40 border-l-4 border-l-slate-300 hover:border-l-brass hover:border-brass/40 hover:bg-brass/5 hover:shadow-sm'
                        }`}
                      >
                        {renderAuditPin('ceo-spouse', true)}
                        <div className="flex items-start gap-2.5">
                          {(showSolutions || selectedItemId === 'ceo-spouse') && <AlertCircle className="w-4 h-4 shrink-0 text-brass mt-0.5" />}
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

                    {renderPageTracker('financials')}

                    <div className="space-y-4 font-mono text-[11px] leading-relaxed">
                      <div className="grid grid-cols-6 border-b border-fog pb-1 text-ink/60 font-sans uppercase font-bold text-[9px] tracking-wider">
                        <span className="col-span-3">Revenue & Transfers</span>
                        <span className="col-span-1 text-right">Unrestricted</span>
                        <span className="col-span-1 text-right">Restricted</span>
                        <span className="col-span-1 text-right">Total</span>
                      </div>

                      {/* Compliant Row: Individual Donations */}
                      <div 
                        onClick={() => handleItemClick('fin-donations')}
                        className={`relative grid grid-cols-6 p-2 rounded cursor-pointer transition-premium -mx-2 border ${
                          selectedItemId === 'fin-donations'
                            ? 'bg-emerald-50/70 border-emerald-200 text-emerald-905 shadow-sm ring-1 ring-emerald-200'
                            : 'border-fog bg-white/40 border-l-4 border-l-slate-300 hover:border-l-brass hover:border-brass/40 hover:bg-brass/5 hover:shadow-sm'
                        }`}
                      >
                        {renderAuditPin('fin-donations', false)}
                        <span className="col-span-3 font-sans font-medium">Individual Donations</span>
                        <span className="col-span-1 text-right">$45,000</span>
                        <span className="col-span-1 text-right">$0</span>
                        <span className="col-span-1 text-right">$45,000</span>
                      </div>

                      {/* Compliant Row: Restricted Scholarship Grant */}
                      <div 
                        onClick={() => handleItemClick('fin-restricted-grant')}
                        className={`relative grid grid-cols-6 p-2 rounded cursor-pointer transition-premium -mx-2 border ${
                          selectedItemId === 'fin-restricted-grant'
                            ? 'bg-emerald-50/70 border-emerald-200 text-emerald-905 shadow-sm ring-1 ring-emerald-200'
                            : 'border-fog bg-white/40 border-l-4 border-l-slate-300 hover:border-l-brass hover:border-brass/40 hover:bg-brass/5 hover:shadow-sm'
                        }`}
                      >
                        {renderAuditPin('fin-restricted-grant', false)}
                        <span className="col-span-3 font-sans font-medium">Restricted Scholarship Grant</span>
                        <span className="col-span-1 text-right">$0</span>
                        <span className="col-span-1 text-right">$85,000</span>
                        <span className="col-span-1 text-right">$85,000</span>
                      </div>

                      {/* Clickable Area 5: Restricted Assets Reallocated */}
                      <div 
                        onClick={() => handleItemClick('fin-restricted')}
                        className={`relative grid grid-cols-6 p-2 rounded cursor-pointer transition-premium -mx-2 border ${
                          selectedItemId === 'fin-restricted'
                            ? 'bg-brass/10 border-brass shadow-sm ring-1 ring-brass/30 text-brass'
                            : showSolutions 
                              ? 'bg-amber-100 border-amber-300 text-ink'
                              : 'border-fog bg-white/40 border-l-4 border-l-slate-300 hover:border-l-brass hover:border-brass/40 hover:bg-brass/5 hover:shadow-sm'
                        }`}
                      >
                        {renderAuditPin('fin-restricted', true)}
                        <span className="col-span-3 font-sans font-bold flex items-center gap-1 text-left">
                          ↳ Net Restricted Assets Redeployed to Core Ops
                          {(showSolutions || selectedItemId === 'fin-restricted') && <AlertCircle className="w-3.5 h-3.5 text-brass" />}
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

                      {/* Compliant AP Row */}
                      <div 
                        onClick={() => handleItemClick('fin-payables')}
                        className={`relative grid grid-cols-6 p-2 rounded cursor-pointer transition-premium -mx-2 border ${
                          selectedItemId === 'fin-payables'
                            ? 'bg-emerald-50/70 border-emerald-200 text-emerald-905 shadow-sm ring-1 ring-emerald-200'
                            : 'border-fog bg-white/40 border-l-4 border-l-slate-300 hover:border-l-brass hover:border-brass/40 hover:bg-brass/5 hover:shadow-sm'
                        }`}
                      >
                        {renderAuditPin('fin-payables', false)}
                        <span className="col-span-3 font-sans font-medium">Accounts Payable (Vendors)</span>
                        <span className="col-span-1 text-right">$12,400</span>
                        <span className="col-span-1 text-right">$4,500</span>
                        <span className="col-span-1 text-right">$16,900</span>
                      </div>

                      {/* Clickable Area 6: Payroll Tax Withholdings */}
                      <div 
                        onClick={() => handleItemClick('fin-payroll')}
                        className={`relative grid grid-cols-6 p-2 rounded cursor-pointer transition-premium -mx-2 border ${
                          selectedItemId === 'fin-payroll'
                            ? 'bg-brass/10 border-brass shadow-sm ring-1 ring-brass/30 text-brass'
                            : showSolutions 
                              ? 'bg-amber-100 border-amber-300 text-ink'
                              : 'border-fog bg-white/40 border-l-4 border-l-slate-300 hover:border-l-brass hover:border-brass/40 hover:bg-brass/5 hover:shadow-sm'
                        }`}
                      >
                        {renderAuditPin('fin-payroll', true)}
                        <span className="col-span-3 font-sans font-bold flex items-center gap-1 text-left">
                          Employee Payroll Withholding Liabilities (Quarterly)
                          {(showSolutions || selectedItemId === 'fin-payroll') && <AlertCircle className="w-3.5 h-3.5 text-brass" />}
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

                    {renderPageTracker('budget')}

                    <div className="space-y-4 font-mono text-[11px] leading-relaxed">
                      <div className="grid grid-cols-6 border-b border-fog pb-1 text-ink/60 font-sans uppercase font-bold text-[9px] tracking-wider">
                        <span className="col-span-3">Expenditure Ledger Line</span>
                        <span className="col-span-1 text-right">Budgeted</span>
                        <span className="col-span-1 text-right">Actual</span>
                        <span className="col-span-1 text-right">Variance</span>
                      </div>

                      {/* Compliant Row: Program Delivery */}
                      <div 
                        onClick={() => handleItemClick('budget-program')}
                        className={`relative grid grid-cols-6 p-2 rounded cursor-pointer transition-premium -mx-2 border ${
                          selectedItemId === 'budget-program'
                            ? 'bg-emerald-50/70 border-emerald-200 text-emerald-905 shadow-sm ring-1 ring-emerald-200'
                            : 'border-fog bg-white/40 border-l-4 border-l-slate-300 hover:border-l-brass hover:border-brass/40 hover:bg-brass/5 hover:shadow-sm'
                        }`}
                      >
                        {renderAuditPin('budget-program', false)}
                        <span className="col-span-3 font-sans font-medium">Program Delivery Direct Costs</span>
                        <span className="col-span-1 text-right">$120,000</span>
                        <span className="col-span-1 text-right">$115,000</span>
                        <span className="col-span-1 text-right text-emerald-700">-$5,000</span>
                      </div>

                      {/* Clickable Area 7: Travel overrun */}
                      <div 
                        onClick={() => handleItemClick('budget-travel')}
                        className={`relative grid grid-cols-6 p-2 rounded cursor-pointer transition-premium -mx-2 border ${
                          selectedItemId === 'budget-travel'
                            ? 'bg-brass/10 border-brass shadow-sm ring-1 ring-brass/30 text-brass'
                            : showSolutions 
                              ? 'bg-amber-100 border-amber-300 text-ink'
                              : 'border-fog bg-white/40 border-l-4 border-l-slate-300 hover:border-l-brass hover:border-brass/40 hover:bg-brass/5 hover:shadow-sm'
                        }`}
                      >
                        {renderAuditPin('budget-travel', true)}
                        <span className="col-span-3 font-sans font-bold flex items-center gap-1 text-left">
                          Executive Director Discretionary Travel & Retreats
                          {(showSolutions || selectedItemId === 'budget-travel') && <AlertCircle className="w-3.5 h-3.5 text-brass" />}
                        </span>
                        <span className="col-span-1 text-right font-medium">$10,000</span>
                        <span className="col-span-1 text-right font-bold">$45,000</span>
                        <span className="col-span-1 text-right font-bold text-rose-700">+$35,000</span>
                      </div>

                      {/* Compliant Row: Office Lease */}
                      <div 
                        onClick={() => handleItemClick('budget-lease')}
                        className={`relative grid grid-cols-6 p-2 rounded cursor-pointer transition-premium -mx-2 border ${
                          selectedItemId === 'budget-lease'
                            ? 'bg-emerald-50/70 border-emerald-200 text-emerald-905 shadow-sm ring-1 ring-emerald-200'
                            : 'border-fog bg-white/40 border-l-4 border-l-slate-300 hover:border-l-brass hover:border-brass/40 hover:bg-brass/5 hover:shadow-sm'
                        }`}
                      >
                        {renderAuditPin('budget-lease', false)}
                        <span className="col-span-3 font-sans font-medium">Office Lease & Utilities</span>
                        <span className="col-span-1 text-right">$24,000</span>
                        <span className="col-span-1 text-right">$23,800</span>
                        <span className="col-span-1 text-right text-emerald-700">-$200</span>
                      </div>

                      {/* Clickable Area 8: Consultant board member */}
                      <div 
                        onClick={() => handleItemClick('budget-consult')}
                        className={`relative grid grid-cols-6 p-2 rounded cursor-pointer transition-premium -mx-2 border ${
                          selectedItemId === 'budget-consult'
                            ? 'bg-brass/10 border-brass shadow-sm ring-1 ring-brass/30 text-brass'
                            : showSolutions 
                              ? 'bg-amber-100 border-amber-300 text-ink'
                              : 'border-fog bg-white/40 border-l-4 border-l-slate-300 hover:border-l-brass hover:border-brass/40 hover:bg-brass/5 hover:shadow-sm'
                        }`}
                      >
                        {renderAuditPin('budget-consult', true)}
                        <span className="col-span-3 font-sans font-bold flex items-center gap-1 text-left">
                          Professional Consulting Fees (Board Member John Doe)
                          {(showSolutions || selectedItemId === 'budget-consult') && <AlertCircle className="w-3.5 h-3.5 text-brass" />}
                        </span>
                        <span className="col-span-1 text-right font-medium">$5,000</span>
                        <span className="col-span-1 text-right font-bold">$28,000</span>
                        <span className="col-span-1 text-right font-bold text-rose-700">+$23,000</span>
                      </div>

                      {/* Compliant Row: Insurance */}
                      <div 
                        onClick={() => handleItemClick('budget-insurance')}
                        className={`relative grid grid-cols-6 p-2 rounded cursor-pointer transition-premium -mx-2 border ${
                          selectedItemId === 'budget-insurance'
                            ? 'bg-emerald-50/70 border-emerald-200 text-emerald-905 shadow-sm ring-1 ring-emerald-200'
                            : 'border-fog bg-white/40 border-l-4 border-l-slate-300 hover:border-l-brass hover:border-brass/40 hover:bg-brass/5 hover:shadow-sm'
                        }`}
                      >
                        {renderAuditPin('budget-insurance', false)}
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

                    {renderPageTracker('audit')}

                    <div className="space-y-4">
                      <p className="font-bold text-xs uppercase tracking-widest text-ink/40 border-b border-fog/50 pb-1">Operational Observations</p>
                      
                      <div className="space-y-3 font-serif italic text-ink/80 text-sm">
                        <p>
                          "We evaluated the accounting frameworks and segregation of duties. Standard bookkeeping practices are executed efficiently, but serious vulnerabilities exist in cash disbursement authorization levels."
                        </p>
                      </div>

                      {/* Clickable Area 9: Check signature controls */}
                      <div 
                        onClick={() => handleItemClick('audit-controls')}
                        className={`relative p-4 rounded-lg border cursor-pointer font-sans transition-premium ${
                          selectedItemId === 'audit-controls'
                            ? 'bg-brass/10 border-brass shadow-sm ring-1 ring-brass/30'
                            : showSolutions 
                              ? 'bg-amber-100/80 border-amber-300 animate-pulse'
                              : 'border-fog bg-white/40 border-l-4 border-l-slate-300 hover:border-l-brass hover:border-brass/40 hover:bg-brass/5 hover:shadow-sm'
                        }`}
                      >
                        {renderAuditPin('audit-controls', true)}
                        <div className="flex gap-3 items-start">
                          {(showSolutions || selectedItemId === 'audit-controls') && <AlertCircle className="w-5 h-5 text-brass shrink-0 mt-0.5" />}
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

                      {/* Compliant Row: Database reconciliation */}
                      <div 
                        onClick={() => handleItemClick('audit-reconciliation')}
                        className={`relative bg-emerald-50 text-emerald-800 p-4 rounded-lg border cursor-pointer transition-premium ${
                          selectedItemId === 'audit-reconciliation'
                            ? 'border-emerald-500 bg-emerald-100/60 ring-1 ring-emerald-500/20'
                            : 'border-emerald-200/50 hover:bg-emerald-100/30'
                        }`}
                      >
                        {renderAuditPin('audit-reconciliation', false)}
                        <div className="space-y-1">
                          <span className="font-bold text-xs uppercase tracking-wider block text-emerald-850">Internal Audit Finding #2 (Satisfactory)</span>
                          <p className="font-sans font-bold text-sm leading-snug text-emerald-900">Donor Database Reconciliation</p>
                          <p className="text-xs text-emerald-800/80 font-serif italic">
                            "Individual donor receipts are successfully reconciled on a weekly schedule. The donor software ledger directly maps into general bookkeeping ledgers with proper audits."
                          </p>
                        </div>
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

              {/* Wax Seal Overlay (Enhancement 8) */}
              {showSuccessSeal && uncoveredFlags.length === 9 && (
                <div className="absolute inset-0 bg-white/75 backdrop-blur-[2px] flex flex-col justify-center items-center z-30 p-6 sm:p-8 animate-fade-in text-center">
                  <div className="relative cursor-pointer transition-transform duration-500 hover:scale-105 mb-4" onClick={() => setShowSuccessSeal(false)}>
                    {/* Glowing golden circle background */}
                    <div className="absolute inset-0 bg-brass/20 rounded-full blur-2xl animate-pulse" />
                    
                    {/* SVG Wax Seal */}
                    <svg className="w-52 h-56 drop-shadow-2xl relative z-10" style={{ transformOrigin: 'center', animation: 'spin 40s linear infinite' }} viewBox="0 0 200 200">
                      <defs>
                        <path id="sealTextPath" d="M 100, 100 m -65, 0 a 65,65 0 1,1 130,0 a 65,65 0 1,1 -130,0" />
                        <filter id="wax3d">
                          <feGaussianBlur in="SourceAlpha" stdDeviation="4" result="blur" />
                          <feSpecularLighting in="blur" surfaceScale="5" specularConstant="1" specularExponent="20" lightingColor="#ffffff" result="light">
                            <fePointLight x="-100" y="-100" z="150" />
                          </feSpecularLighting>
                          <feComposite in="light" in2="SourceAlpha" operator="in" result="specOut" />
                          <feComposite in="SourceGraphic" in2="specOut" operator="arithmetic" k1="0" k2="1" k3="1" k4="0" />
                        </filter>
                      </defs>
                      
                      {/* Wax Base circle (organic slightly bumpy edge) */}
                      <path 
                        d="M100 15 C150 12 185 50 185 100 C185 150 148 188 100 185 C52 182 15 148 15 100 C15 52 50 18 100 15 Z" 
                        fill="#1b4d4c" 
                        filter="url(#wax3d)" 
                      />
                      
                      {/* Inner gold concentric accent */}
                      <circle cx="100" cy="100" r="72" fill="none" stroke="#cca43b" strokeWidth="2" strokeDasharray="6 3" />
                      <circle cx="100" cy="100" r="58" fill="none" stroke="#cca43b" strokeWidth="1" />

                      {/* Rotational Text */}
                      <text className="fill-brass text-[10.5px] tracking-[4px] uppercase font-serif font-bold">
                        <textPath href="#sealTextPath" startOffset="0%">
                          * CDX CORPORATE BOARDROOM AUDIT COMPLETED *
                        </textPath>
                      </text>

                      {/* Seal Inner Logo/Insignia */}
                      <g transform="translate(68, 68) scale(0.65)">
                        {/* Corinthian Column In Seal */}
                        <path 
                          d="M40,75 L60,75 L60,15 L40,15 Z M25,15 L75,15 L75,8 L25,8 Z M30,75 L70,75 L75,90 L25,90 Z M50,15 L50,75 M35,15 L35,75 M65,15 L65,75" 
                          stroke="#cca43b" 
                          strokeWidth="4" 
                          fill="none" 
                          strokeLinecap="round"
                        />
                      </g>
                    </svg>
                  </div>

                  <div className="max-w-md space-y-4 z-20">
                    <span className="text-[9px] font-extrabold text-brass uppercase tracking-[0.3em] bg-brass/10 px-3 py-1.5 rounded-full border border-brass/20 inline-block">
                      Oversight Safeguards Certified
                    </span>
                    <h3 className="font-serif text-xl sm:text-2xl font-bold text-ink leading-tight">
                      Audit Discovery Defenses Verified!
                    </h3>
                    <p className="text-xs text-ink/75 leading-relaxed">
                      You have identified all <strong>9 corporate risks</strong>, compliance vulnerabilities, and missing board policies hidden in this packet. Your boardroom vigilance is verified to standard.
                    </p>
                    <div className="bg-paper p-4 rounded-xl border border-fog/80 text-left space-y-2 shadow-inner">
                      <p className="text-[11px] font-bold text-ink flex items-center gap-1.5">
                        <span className="w-1.5 h-1.5 rounded-full bg-teal-brand" />
                        Next Professional Action Recommended:
                      </p>
                      <p className="text-[11px] text-ink/65 leading-relaxed">
                        To cement these protections for your California entity, request a formal attorney review of your current Bylaws and Corporate Book. Our firm specializing in charity law will evaluate your complete record suite.
                      </p>
                    </div>

                    <div className="flex flex-col sm:flex-row justify-center gap-2.5 pt-2">
                      <button 
                        onClick={() => navigate('contact-us?topic=bylaws&message=We%20would%20like%20to%20request%20information%20or%20an%20audit%20concerning%20our%20completed%20fiduciary%20record%20suite.')}
                        className="px-5 py-2.5 bg-teal-brand hover:bg-ink text-white text-xs font-bold uppercase tracking-wider rounded-lg shadow-md transition-premium text-center border-0 cursor-pointer"
                      >
                        Request Board Audit Information
                      </button>
                      <button
                        onClick={() => setShowSuccessSeal(false)}
                        className="px-4 py-2.5 bg-paper hover:bg-fog text-ink text-xs font-bold uppercase tracking-wider rounded-lg border border-fog transition-premium cursor-pointer"
                      >
                        Dismiss Overlay
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Right Hand: The Audit Panel (5 Cols) */}
            <div className="lg:col-span-5 space-y-6">
              
              {!selectedItemId ? (
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
                  <p className="text-[11px] text-brass font-bold uppercase tracking-wider">
                    Or click the target pins [ ? ] in the margins!
                  </p>
                  {showSolutions ? null : (
                    <button
                      onClick={() => setShowSolutions(true)}
                      className="mt-2 text-xs font-bold text-slate-brand hover:text-brass uppercase tracking-wider underline transition-premium"
                    >
                      Or, reveal all answers across the packet
                    </button>
                  )}
                </div>
              ) : isCompliant ? (
                /* Compliant Section Audit Drawer */
                <div className="space-y-6 animate-fade-in text-left">
                  <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-6 space-y-4 shadow-sm">
                    <div className="flex justify-between items-center">
                      <span className="text-[10px] font-bold tracking-widest text-emerald-800 bg-emerald-100 px-2 py-0.5 rounded uppercase">
                        Fiduciary: Compliant
                      </span>
                      <span className="text-[9px] font-bold text-emerald-700/60 uppercase">
                        Section Healthy
                      </span>
                    </div>
                    <h3 className="font-serif font-bold text-xl text-emerald-900 leading-tight">
                      {currentCompliant?.title}
                    </h3>
                    <p className="text-xs sm:text-sm text-emerald-850 font-sans font-medium leading-relaxed">
                      {currentCompliant?.description}
                    </p>
                    <div className="bg-white/80 p-4 rounded-lg border border-emerald-100 text-xs text-ink/80 leading-relaxed space-y-1">
                      <strong className="text-emerald-800 uppercase tracking-wider text-[9px] block">Attorney Auditor Commentary</strong>
                      <p className="font-sans font-normal">{currentCompliant?.complianceNote}</p>
                    </div>
                  </div>
                  
                  {/* General educational encouragement */}
                  <div className="bg-white border border-fog rounded-xl p-5 space-y-3">
                    <h4 className="font-sans font-bold text-xs uppercase tracking-wider text-slate-brand">
                      Continuous Fiduciary Practice
                    </h4>
                    <p className="text-xs text-ink/80 leading-relaxed">
                      Healthy board habits are the ultimate defense against legal liabilities. Use this standard as a blueprint across all future boardroom documentation.
                    </p>
                    <button
                      onClick={() => navigate('contact-us?topic=general')}
                      className="inline-flex items-center gap-1 text-xs font-bold text-brass hover:text-ink transition-premium uppercase tracking-wider border-0 bg-transparent p-0 cursor-pointer text-left"
                    >
                      <span>Request Training Consultation</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              ) : (
                /* Active Audit State for Red Flags */
                <div className="space-y-6 animate-fade-in text-left">
                  
                  {/* Summary Header */}
                  <div className="bg-white rounded-xl border border-fog p-6 space-y-3 shadow-sm">
                    <div className="flex justify-between items-center">
                      <span className="text-[10px] font-bold tracking-widest text-ink/40 uppercase">
                        Lab Audit Detail
                      </span>
                      {currentFlag && (
                        <CaliforniaNoteBadge 
                          statute={currentFlag.statute} 
                          text={currentFlag.statuteText} 
                          className="scale-90 origin-right"
                        />
                      )}
                    </div>
                    <h3 className="font-serif font-bold text-xl text-ink leading-tight">
                      {currentFlag?.title}
                    </h3>
                  </div>

                  {/* Fiduciary Red Flags (DoNotDoThisCard) */}
                  {currentFlag && (
                    <DoNotDoThisCard 
                      title={currentFlag.flagTitle} 
                      items={currentFlag.redFlags}
                      consequence={currentFlag.consequence}
                    />
                  )}

                  {/* Director Question Script (AskThisCard) */}
                  {currentFlag && (
                    <AskThisCard 
                      question={currentFlag.scriptQuestion} 
                      rationale={currentFlag.scriptRationale} 
                      targetRole={currentFlag.scriptTarget}
                    />
                  )}

                  {/* Legal Escalation Referrals (LegalEscalationCard) */}
                  {currentFlag?.isSevere ? (
                    <LegalEscalationCard 
                      trigger="California Fiduciary Risk Alert" 
                      explanation={`This finding represents a direct violation of regulatory law. Proceeding without certified legal restructuring can trigger severe state penalties, personal director audit assessments, or loss of tax exemption. We recommend obtaining a bylaws or procedures audit from independent legal counsel.`} 
                      actionText="Consult Charity Attorneys"
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
                      <button
                        onClick={() => navigate('contact-us?topic=general&message=We%20would%20like%20to%20request%20information%20concerning%20corrective%20boardroom%20resolutions%20and%20procedures.')}
                        className="inline-flex items-center gap-1 text-xs font-bold text-brass hover:text-ink transition-premium uppercase tracking-wider border-0 bg-transparent p-0 cursor-pointer text-left"
                      >
                        <span>Request Regulatory Verification</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </button>
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

          {/* Scanner Audit Assistant Drawer */}
          {isScannerDrawerOpen && (
            <div 
              className="fixed inset-0 bg-ink/40 backdrop-blur-xs z-50 transition-opacity flex justify-end"
              onClick={() => setIsScannerDrawerOpen(false)}
            >
              <div 
                className="h-full w-full max-w-lg bg-white border-l border-fog shadow-2xl p-6 overflow-y-auto z-50 text-left flex flex-col justify-between"
                onClick={(e) => e.stopPropagation()}
              >
                <div>
                  <div className="flex items-center justify-between border-b border-fog pb-4 mb-5">
                    <div className="flex items-center gap-2">
                      <ShieldCheck className="w-5 h-5 text-teal-brand" />
                      <h2 className="font-serif text-lg font-bold text-ink">Scanner Audit Wizard</h2>
                    </div>
                    <button 
                      onClick={() => setIsScannerDrawerOpen(false)}
                      className="p-1 rounded-full hover:bg-fog text-ink/60 hover:text-ink transition-colors"
                    >
                      <X className="w-5 h-5" />
                    </button>
                  </div>

                  <div className="space-y-6 text-xs text-ink/80 leading-relaxed font-sans">
                    {/* Progress Checklist */}
                    <div className="bg-teal-brand/5 border border-teal-brand/10 rounded-xl p-4 space-y-3">
                      <h3 className="font-sans font-extrabold text-teal-brand uppercase tracking-wider text-[11px] leading-none">
                        Document Scan Integrity Checklist
                      </h3>
                      <p className="text-[11px] text-ink/60">
                        Tracks whether at least one finding has been scanned in each corporate segment.
                      </p>
                      
                      <div className="space-y-2 pt-1">
                        {[
                          { name: "Board Meeting Agenda", key: "agenda", flags: ['agenda-comp', 'agenda-bylaws'] },
                          { name: "Executive Director Report", key: "ceo", flags: ['ceo-bridge', 'ceo-spouse'] },
                          { name: "Quarterly Financial Statements", key: "financials", flags: ['fin-restricted', 'fin-payroll'] },
                          { name: "Annual Operating Budget", key: "budget", flags: ['budget-travel', 'budget-consult'] },
                          { name: "Audit Committee Minutes", key: "audit", flags: ['audit-controls'] }
                        ].map((sec, sIdx) => {
                          const isScanned = sec.flags.some(fl => uncoveredFlags.includes(fl));
                          return (
                            <div key={sIdx} className="flex items-center justify-between py-1 border-b border-fog/40 last:border-0">
                              <span className="font-medium text-ink/80">{sec.name}</span>
                              <span className={`px-2 py-0.5 rounded text-[9px] font-bold uppercase tracking-wider shrink-0 ${
                                isScanned 
                                  ? "bg-emerald-100 text-emerald-800" 
                                  : "bg-slate-100 text-slate-500"
                              }`}>
                                {isScanned ? "Scanned ✓" : "Pending Scan"}
                              </span>
                            </div>
                          );
                        })}
                      </div>
                    </div>

                    {/* Missing Policies */}
                    <div className="space-y-3">
                      <h3 className="font-sans font-extrabold text-brass uppercase tracking-wider text-[11px] leading-none">
                        Critical Corporate Policy Deficits
                      </h3>
                      <p className="text-[11px] text-ink/60">
                        Most board packets are missing these mandatory internal oversight documents. Pair them with these defensive scripts to request action:
                      </p>

                      <div className="space-y-3 pt-1">
                        {[
                          {
                            title: "Whistleblower Protection Policy (CA Labor Code § 1102.5)",
                            desc: "Mandatory for organizations with employees. Ensures staff can report financial or governance variances without retaliation.",
                            script: "Do we have an active Whistleblower Protection policy matching California Labor Code standards? I request we formalize and review this at our next meeting to protect the board from employer liability."
                          },
                          {
                            title: "Document Retention & Destruction Policy (Sarbanes-Oxley / IRS Form 990)",
                            desc: "Required to document compliance. Sets rules on file destruction schedules and prohibits shredding in case of audit.",
                            script: "Our IRS Form 990 asks if we have a written Document Retention policy. To ensure clean filing compliance, can the Governance Committee draft a formal policy for next quarter's approval?"
                          },
                          {
                            title: "Gift Acceptance & Vetting Policy (Donor Restriction Protection)",
                            desc: "Standardizes terms for accepting non-cash assets, restricted trusts, or real estate liabilities before receiving them.",
                            script: "Before we accept any further complex donor-restricted gifts or physical assets, do we have an active Gift Acceptance policy to vet our liabilities? Let's adopt a standard draft."
                          }
                        ].map((pol, pIdx) => (
                          <div key={pIdx} className="p-3 bg-paper/20 border border-fog rounded-xl space-y-2">
                            <p className="font-bold text-ink leading-tight">{pol.title}</p>
                            <p className="text-[11px] text-ink/70">{pol.desc}</p>
                            <div className="p-2 bg-white rounded border border-brass/20 text-[10px] leading-relaxed italic text-ink/80 relative pl-6">
                              <span className="absolute left-2 text-brass font-bold">“</span>
                              {pol.script}
                              <span className="absolute right-2 text-brass font-bold">”</span>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Defensive Deliberation Tips */}
                    <div className="space-y-2 pt-2 border-t border-fog">
                      <h3 className="font-sans font-extrabold text-ink uppercase tracking-wider text-[11px] leading-none">
                        Active Deliberation Rules of Thumb
                      </h3>
                      <ul className="list-disc pl-4 space-y-1 text-[11px] text-ink/75">
                        <li><strong>Recusal Discipline:</strong> Interested directors must leave the chamber prior to a conflict-of-interest vote.</li>
                        <li><strong>The Paper Trail:</strong> Never vote on oral-only financial reports. Insist on a written balance sheet and deviation logs.</li>
                        <li><strong>Safe Harbors:</strong> Executive pay must be backed by a written comparability survey to protect the board from IRS sanctions.</li>
                      </ul>
                    </div>

                  </div>
                </div>

                <div className="pt-6 border-t border-fog mt-6 text-center">
                  <button
                    onClick={() => navigate('contact-us?topic=general&message=We%20would%20like%20to%20request%20professional%20board%20policy%20templates%20and%20materials.')}
                    className="w-full inline-flex items-center justify-center gap-1.5 py-2.5 bg-slate-brand hover:bg-ink text-white font-bold uppercase tracking-wider rounded transition-premium text-xs border-0 cursor-pointer"
                  >
                    <span>Request Professional Policy Templates</span>
                    <ArrowRight className="w-3.5 h-3.5 text-brass" />
                  </button>
                </div>
              </div>
            </div>
          )}

        </div>
      </div>
    </Layout>
  );
};

export default BoardPacketLab;
