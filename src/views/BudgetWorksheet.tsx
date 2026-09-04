import React, { useState } from 'react';
import { Layout } from '../components/Layout';
import { useRouter } from '../components/Router';
import { 
  Table, ArrowRight, Activity, CheckCircle, Scale, ShieldAlert, AlertCircle
} from 'lucide-react';
import { DoNotDoThisCard, AskThisCard, CaliforniaNoteBadge, LegalEscalationCard } from '../components/BoardroomCards';
import { safeStorage } from '../lib/safeStorage';

interface BudgetLine {
  id: string;
  category: string;
  budgeted: number;
  actual: number;
  variance: number;
  pct: number;
  status: 'safe' | 'medium' | 'extreme';
  statusLabel: string;
  title: string;
  flagTitle: string;
  redFlags: string[];
  consequence: string;
  statute: string;
  statuteText: string;
  scriptQuestion: string;
  scriptRationale: string;
  scriptTarget: string;
  cfoInquiry: string[];
  invoicesRequest: string[];
  minutesShow: string;
  advisoryText?: string;
}

export const BudgetWorksheet: React.FC = () => {
  const { navigate } = useRouter();
  const [selectedLineId, setSelectedLineId] = useState<string | null>(null);
  const [showVulnerabilities, setShowVulnerabilities] = useState(false);
  const [auditedLines, setAuditedLines] = useState<string[]>(() => {
    const saved = safeStorage.getItem('cdx_budget_audited_lines');
    return saved ? JSON.parse(saved) : [];
  });
  const [varianceRiskTolerance, setVarianceRiskTolerance] = useState<number>(() => {
    const saved = safeStorage.getItem('cdx_variance_risk_tolerance');
    return saved ? Number(saved) : 25; // default is 25%
  });

  const handleToleranceChange = (value: number) => {
    setVarianceRiskTolerance(value);
    safeStorage.setItem('cdx_variance_risk_tolerance', String(value));
  };

  const resetScan = () => {
    setAuditedLines([]);
    setSelectedLineId(null);
    setShowVulnerabilities(false);
    setVarianceRiskTolerance(25);
    safeStorage.removeItem('cdx_budget_audited_lines');
    safeStorage.removeItem('cdx_variance_risk_tolerance');
  };

  // Budget database
  const budgetLines: Record<string, BudgetLine> = {
    'ed-comp': {
      id: 'ed-comp',
      category: 'Executive Director Compensation',
      budgeted: 110000,
      actual: 145000,
      variance: 35000,
      pct: 31.8,
      status: 'medium',
      statusLabel: 'Compensation Alert',
      title: 'Executive Compensation Variance',
      flagTitle: 'Bypassing Executive Sanctions Standards',
      redFlags: [
        'An unbudgeted $35,000 compensation increase was granted mid-year.',
        'No local independent salary comparability studies are included in board files.',
        'The Executive Director is a voting participant in general budget meetings.'
      ],
      consequence: 'Under IRC § 4958, the IRS can impose "Intermediate Sanctions" for paying compensation in excess of fair market value. This consists of a 25% personal tax on the executive and a 10% personal tax on individual directors who approved the salary without relying on comparable data.',
      statute: 'IRC § 4958',
      statuteText: 'IRS Excess Benefit Transactions and board safe harbors.',
      scriptQuestion: 'Did the board vote to authorize this $35,000 increase using formal regional or California compensation comparability studies of peer organizations, and are we recording that the executive was completely recused?',
      scriptRationale: 'Relying on three comparable salary studies and recusing the employee grants the board "rebuttable presumption of reasonableness," shielding directors from personal audit assessments.',
      scriptTarget: 'Board President & Treasurer',
      cfoInquiry: [
        'Are we currently filing or preparing IRS Form 990 Schedule J for this position?',
        'Can the Finance Department produce the exact three regional comparability reports or IRS guidelines used to establish the compensation range?',
        'Is there a formal signed conflict of interest recusal form for the Executive Director for the meeting during which this increase was discussed and voted upon?'
      ],
      invoicesRequest: [
        'Compensation survey data or salary reports from 3 similar budget-sized organizations.',
        'Board meeting minutes containing the formal approval of compensation, detailing the comparability data and recusal.',
        'Signed employment agreement amendment or offer letter signed by the Board President.'
      ],
      minutesShow: 'RESOLVED, that the Board of Directors, having reviewed compensation comparability data for similar-sized organizations and confirming the complete recusal and absence of the Executive Director, hereby approves an amendment to the Executive Director\'s employment agreement to set annual compensation at $145,000, which is determined to be reasonable and not an excess benefit under IRC Section 4958.',
      advisoryText: 'COMPENSATION OVERRUN TRIGGERED: A 31.8% salary increase without peer salary comparability data violates state charitable guidelines, initiating immediate IRC § 4958 intermediate sanctions risk.'
    },
    'self-dealing': {
      id: 'self-dealing',
      category: 'Marketing Web Dev (ED Spousal Entity)',
      budgeted: 0,
      actual: 15000,
      variance: 15000,
      pct: 100,
      status: 'extreme',
      statusLabel: 'Self-Dealing Warning',
      title: 'Spousal Vendor Transaction',
      flagTitle: 'Conflict of Interest & Bypassed Procurement',
      redFlags: [
        'A $15,000 marketing and database contract was awarded directly to the Executive Director\'s spouse.',
        'The contract was authorized by the executive directly, bypassing competitive board bidding rules.'
      ],
      consequence: 'Under California Corporations Code § 5233, any transaction where an officer or director has a material financial interest represents self-dealing. The board must formally approve the transaction prior to execution, prove no better alternative was available, and file details. Bypassing this exposes directors to personal restitution demands by the CA AG.',
      statute: 'CA Corp Code § 5233',
      statuteText: 'California self-dealing standards and board approval steps.',
      scriptQuestion: 'Since this marketing vendor is owned by your spouse, this represents a conflict of interest. Did the board formally vote to approve this contract prior to signing, and were competing contractor bids reviewed?',
      scriptRationale: 'Conflicts must be disclosed, competed, and authorized solely by disinterested directors to remain valid under standard corporate law (including California guidelines).',
      scriptTarget: 'Executive Director (CEO) & Board Secretary',
      cfoInquiry: [
        'When was this contract signed, and did the Executive Director sign it on behalf of the organization without board knowledge?',
        'Were at least two other competitive proposals obtained from unrelated web development firms?',
        'Did the Executive Director completely leave the room during the board discussion and vote?'
      ],
      invoicesRequest: [
        'The written marketing vendor agreement detailing deliverables, hourly rates, and the spousal relationship.',
        'At least 2 comparable independent bids/proposals from unrelated marketing firms.',
        'Bylaws or procurement policies showing conflict of interest guidelines.'
      ],
      minutesShow: 'RESOLVED, that the disinterested members of the Board, having reviewed two competitive bids and finding the agreement with [Spousal Entity] to be of fair market value, highly advantageous, and in the best interest of the corporation, hereby approves the $15,000 agreement. The Executive Director was recused, did not participate in discussion, and abstained from voting in compliance with CA Corp Code § 5233.',
      advisoryText: 'SELF-DEALING CONTRACT EXCEEDED: Awarding a 100% spousal contract without pre-approval, competitive bids, or recusal violates CA Corp Code § 5233. This exposes voting directors to direct state AG personal enforcement actions.'
    },
    'payroll-tax': {
      id: 'payroll-tax',
      category: 'Payroll Withholding Taxes (US Treasury)',
      budgeted: 18000,
      actual: 0,
      variance: -18000,
      pct: -100,
      status: 'extreme',
      statusLabel: 'Extreme Personal Risk',
      title: 'Deferred Payroll Tax Deposits',
      flagTitle: 'Trust Fund Recovery Penalty Exposure',
      redFlags: [
        'The organization failed to pay employee federal/state payroll withholding taxes to conserve cash.',
        'The board has not been provided direct tax deposit verification receipts.'
      ],
      consequence: 'Under IRC § 6672, unpaid employee payroll withholdings (trust fund taxes) create direct, personal, joint-and-several liability for directors. The IRS can assess a 100% personal tax penalty directly against individual directors, bypassing the corporate shield completely.',
      statute: 'IRC § 6672',
      statuteText: 'The 100% Trust Fund Recovery Penalty.',
      scriptQuestion: 'Are employee payroll withholding taxes currently being deposited on schedule, and can the Treasurer provide the board with direct, independent verification of tax receipts?',
      scriptRationale: 'Directors have an active duty to verify tax compliance. Trusting the executive\'s verbal assurance is legally insufficient when personal joint-and-several financial penalties are active under federal tax law.',
      scriptTarget: 'Treasurer & Executive Director',
      cfoInquiry: [
        'What is the exact amount of unpaid federal tax Form 941 deposits and state payroll tax deposits (such as DE-9)?',
        'Has the IRS or state tax authorities (such as California EDD) issued any notice of intent to levy or unpaid balance letters?',
        'Are we currently prioritizing paying any vendors, landlords, or employee net wages over payroll taxes?'
      ],
      invoicesRequest: [
        'Most recent IRS Form 941 and state payroll tax filings, such as California EDD DE-9 filings.',
        'EFTPS (Electronic Federal Tax Payment System) receipt confirmations for the last 3 pay periods.',
        'All recent IRS and state tax agency billing notices or outstanding balance notices.'
      ],
      minutesShow: 'RESOLVED, that the Board of Directors directs the Treasurer and Executive Director to immediately pay all outstanding federal and state employee tax withholdings. The Board hereby mandates that no other operating expense or vendor payment be authorized if employee payroll tax withholdings remain unpaid, to preserve compliance and eliminate direct director personal liability under IRC § 6672.',
      advisoryText: 'TRUST FUND EXPOSURE EXCEEDED: Failing to deposit payroll withholdings triggers immediate 100% personal liability for directors under IRC § 6672. The IRS and state tax agencies can seize personal assets to recover these trust fund taxes.'
    },
    'restricted-funds': {
      id: 'restricted-funds',
      category: 'Scholarship Grant (Donor-Restricted)',
      budgeted: 85000,
      actual: 20000,
      variance: -65000,
      pct: -76.5,
      status: 'extreme',
      statusLabel: 'Breach of Trust Warning',
      title: 'Restricted Scholarship Diversion',
      flagTitle: 'Diversion of Charitable Restricted Assets',
      redFlags: [
        'Donor-restricted scholarship funds were diverted to pay general operating overhead and administrative payroll.',
        'The transfer occurred without written donor consent or a California court order.'
      ],
      consequence: 'Under standard Charitable Trust Doctrines (including California\'s), donor-restricted funds represent a strict trust. Diverting restricted assets to cover general administrative expenses—even during a cash crunch—is a breach of trust. State Attorneys General actively prosecute boards for restricted fund diversion and demand personal restitution from individual directors.',
      statute: 'CA Gov Code § 12580',
      statuteText: 'Supervision of Trustees and Charitable Trusts Act.',
      scriptQuestion: 'These funds were donor-restricted for student scholarships. Did the organization secure written consent from the original donors before diverting this $65,000 to cover general operating expenses?',
      scriptRationale: 'Without written donor consent or court permission under UPMIFA standards, restricted assets must remain separated. Financial hardship does not excuse a breach of charitable trust.',
      scriptTarget: 'Treasurer & Finance Director',
      cfoInquiry: [
        'What donor agreements or grant letters cover the diverted $65,000 scholarship funds?',
        'Did we receive written consent from the donor(s) authorizing the temporary or permanent diversion of these funds?',
        'How is the scholarship fund currently tracked in our general ledger, and is it segregated or comingled?'
      ],
      invoicesRequest: [
        'The original donor restriction agreement or grant agreement for the scholarship funds.',
        'General Ledger reports showing the transfer from the scholarship account to the general operating account.',
        'Bank statements for restricted accounts and copies of any written correspondence with the donor.'
      ],
      minutesShow: 'RESOLVED, that the Board of Directors directs the immediate transfer of $65,000 from the general operating cash account back into the donor-restricted scholarship account. The Board further mandates that no restricted funds are to be used for general operations, and that a formal written donor consent protocol must be initiated before any restricted asset is reallocated in the future.',
      advisoryText: 'BREACH OF CHARITABLE TRUST TRIGGERED: Diverting 76.5% of scholarship funds to cover administrative payroll violates standard Charitable Trust Doctrines. This triggers direct state AG personal enforcement actions.'
    },
    'luxury-travel': {
      id: 'luxury-travel',
      category: 'Executive Discretionary Travel & Retreats',
      budgeted: 10000,
      actual: 45000,
      variance: 35000,
      pct: 350,
      status: 'medium',
      statusLabel: 'Oversight Alert',
      title: 'Unbudgeted Discretionary Overruns',
      flagTitle: 'Waste of Charitable Assets & Oversight Failure',
      redFlags: [
        'A 350% unapproved expenditure overrun on executive travel and high-end retreats.',
        'No detailed receipts, attendee lists, or commercial-business rationales were provided.'
      ],
      consequence: 'Failing to supervise executive spending and allowing massive unbudgeted luxury expenditures represents a failure of the Duty of Care. It invites IRS audit scrutiny regarding private inurement and could lead to loss of tax exemption or donor class-action lawsuits.',
      statute: 'CA Corp Code § 5231',
      statuteText: 'Duty of Care and standard of care requirements for board directors.',
      scriptQuestion: 'What specific business travel or executive retreats accounted for this $35,000 budget overrun, and why was this variance not flagged and pre-authorized by the Treasurer or the Finance Committee?',
      scriptRationale: 'Fiduciary care requires active budget tracking. Allowing large, unapproved discretionary travel budgets suggests a lack of active internal financial oversight and controls.',
      scriptTarget: 'Treasurer & Executive Director',
      cfoInquiry: [
        'Does the organization possess detailed itemized receipts (not just credit card summaries) for this $45,000 travel expense?',
        'Was a clear, written business purpose or attendee list documented for every retreat or meal?',
        'Is there an active travel reimbursement or accountable plan policy in place?'
      ],
      invoicesRequest: [
        'Complete itemized receipts and lodging invoices for the $45,000 travel expenses.',
        'Written business expense reports showing the business purpose, dates, and names of all participants.',
        'The board-approved Travel and Expense Reimbursement Policy.'
      ],
      minutesShow: 'RESOLVED, that the Board of Directors establishes a strict $5,000 ceiling on any single travel event and mandates that all executive travel expenses over $1,000 be pre-approved by the Treasurer. The Board hereby directs that reimbursement be denied for any travel or entertainment lacking itemized receipts and a detailed commercial business rationale in compliance with the CA Corp Code § 5231 Duty of Care.',
      advisoryText: 'DUTY OF CARE OVERRUN EXCEEDED: A 350% travel overrun suggests complete failure of internal financial controls under CA Corp Code § 5231. Fiduciaries can be held personally liable for waste of charitable assets.'
    },
    'lapsed-do': {
      id: 'lapsed-do',
      category: 'Director Liability Insurance (D&O Policy)',
      budgeted: 35000,
      actual: 0,
      variance: -35000,
      pct: -100,
      status: 'extreme',
      statusLabel: 'Lapsed Protection Alert',
      title: 'Lapsed D&O Liability Insurance',
      flagTitle: 'Direct Unshielded Director Exposure',
      redFlags: [
        'The D&O insurance policy was allowed to lapse to conserve operating cash.',
        'Directors have no personal liability shield in the event of third-party or regulatory lawsuits.'
      ],
      consequence: 'Standard state volunteer immunity statutes (such as California Corporations Code § 5047.5) *only* apply if the corporation maintains active liability insurance. Allowing the D&O policy to lapse strips the board of personal protection, exposing individual directors\' personal savings and homes to active corporate lawsuits.',
      statute: 'CA Corp Code § 5047.5',
      statuteText: 'Mandatory insurance thresholds for volunteer director immunity protection.',
      scriptQuestion: 'Has our D&O liability policy actively lapsed, and can we immediately reinstate the policy to preserve statutory personal immunity under applicable state laws?',
      scriptRationale: 'Maintaining active D&O insurance represents the absolute baseline of personal asset protection for volunteer board directors.',
      scriptTarget: 'Board President & Treasurer',
      cfoInquiry: [
        'Why did the D&O policy lapse, and was it due to an administrative oversight or lack of cash?',
        'Has our insurance broker provided a reinstatement quote or an application for a new D&O policy?',
        'Are there any pending, threatened, or active claims or lawsuits against any director or officer?'
      ],
      invoicesRequest: [
        'The most recent lapsed D&O insurance policy declaration page.',
        'Reinstatement invoice or new premium quotes from our insurance broker.',
        'Most recent written notification of policy expiration or non-renewal.'
      ],
      minutesShow: 'RESOLVED, that the Board of Directors finds the lapse of the Director and Officer (D&O) liability insurance policy to represent an unacceptable exposure of the personal assets of the directors. The Treasurer is hereby authorized and directed to immediately fund the premium payment of $35,000 and reinstate the policy to preserve volunteer director immunity under CA Corp Code § 5047.5.',
      advisoryText: 'IMMUNITY SHIELD NULLIFIED: A lapsed D&O policy strips volunteer directors of standard state volunteer immunity protections (such as California Corporations Code § 5047.5). Directors are 100% personally exposed to lawsuit defense costs.'
    }
  };

  const handleLineClick = (lineId: string) => {
    setSelectedLineId(lineId);
    if (!auditedLines.includes(lineId)) {
      const updated = [...auditedLines, lineId];
      setAuditedLines(updated);
      safeStorage.setItem('cdx_budget_audited_lines', JSON.stringify(updated));
    }
  };

  const currentLine = selectedLineId ? budgetLines[selectedLineId] : null;

  return (
    <Layout>
      <div className="py-12 bg-paper/30 min-h-screen px-4 sm:px-6 lg:px-8 text-left">
        <div className="max-w-7xl mx-auto space-y-8">
          
          {/* Header */}
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b border-fog pb-6">
            <div>
              <button 
                onClick={() => navigate('tools')}
                className="text-xs font-bold text-slate-brand hover:text-brass uppercase tracking-wider transition-premium flex items-center gap-1"
              >
                ← Back to Tools & Labs
              </button>
              <h1 className="font-serif text-3xl font-bold text-ink tracking-wide mt-2">
                Budget Deviation Worksheet
              </h1>
              <p className="text-sm text-ink/70">
                Fiduciary scanning lab: Audit a mock operating ledger, clicking on line-item variances to uncover critical compliance vulnerabilities.
              </p>
            </div>
            
            <div className="flex items-center gap-3 shrink-0">
              <button
                onClick={resetScan}
                className="px-4 py-2 text-xs font-bold uppercase tracking-wider rounded border border-rose-200 text-rose-700 bg-rose-50/50 hover:bg-rose-50 hover:border-rose-300 transition-premium"
              >
                Reset Scan
              </button>
              <button
                onClick={() => setShowVulnerabilities(!showVulnerabilities)}
                className={`px-4 py-2 text-xs font-bold uppercase tracking-wider rounded border transition-premium ${
                  showVulnerabilities 
                    ? 'bg-brass text-ink border-brass shadow' 
                    : 'bg-white text-ink/80 border-fog hover:border-brass hover:text-brass'
                }`}
              >
                {showVulnerabilities ? 'Hide Vulnerability Glows' : 'Highlight Critical Rows'}
              </button>
              <button
                onClick={() => navigate('contact-us?topic=budget&message=We%20would%20like%20to%20schedule%20a%20professional%20financial%20and%20budget%20variance%20audit.')}
                className="px-4 py-2 bg-slate-brand hover:bg-ink text-white text-xs font-bold uppercase tracking-wider rounded shadow transition-premium flex items-center gap-1.5 border-0 cursor-pointer"
              >
                <span>Audit Financials</span>
                <ShieldAlert className="w-3.5 h-3.5 text-brass" />
              </button>
            </div>
          </div>

          {/* Interactive Lab Workspace */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            
            {/* Left Hand: Interactive Ledger Table (7 Cols) */}
            <div className="lg:col-span-7 bg-white rounded-2xl border border-fog shadow-md overflow-hidden flex flex-col min-h-[500px]">
              <div className="p-6 bg-fog/30 border-b border-fog/80 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Activity className="w-4 h-4 text-slate-brand" />
                  <span className="font-sans font-bold text-xs uppercase tracking-wider text-ink/60">
                    Operating Ledger - FY 2026 Q2 Interim Report
                  </span>
                </div>
                <CaliforniaNoteBadge statute="Standard Fiduciary Code" text="Fiduciary Asset Control" className="scale-90 origin-right py-0.5" />
              </div>

              {/* Audit Progress Scanner Banner */}
              <div className="bg-paper/10 border-b border-fog/85 px-6 py-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  {/* Small Circular Progress Wheel */}
                  <div className="relative flex items-center justify-center shrink-0">
                    <svg className="w-10 h-10 transform -rotate-90">
                      <circle cx="20" cy="20" r="16" stroke="currentColor" strokeWidth="3" fill="transparent" className="text-fog" />
                      <circle 
                        cx="20" 
                        cy="20" 
                        r="16" 
                        stroke="currentColor" 
                        strokeWidth="3" 
                        fill="transparent" 
                        strokeDasharray={2 * Math.PI * 16}
                        strokeDashoffset={2 * Math.PI * 16 * (1 - auditedLines.length / 6)}
                        className="text-emerald-600 transition-all duration-500"
                      />
                    </svg>
                    <span className="absolute text-[10px] font-mono font-bold text-ink">
                      {auditedLines.length}/6
                    </span>
                  </div>
                  <div>
                    <h4 className="font-serif font-bold text-sm text-ink">
                      Active Ledger Scanner
                    </h4>
                    <p className="text-[11px] text-ink/65 font-sans leading-tight">
                      Scan the table below. Click each row to analyze potential vulnerabilities.
                    </p>
                  </div>
                </div>

                {/* Variance Risk Tolerance Slider */}
                <div className="flex flex-col gap-1.5 w-full sm:w-auto min-w-[220px] bg-white p-3 rounded-xl border border-fog/80 shadow-sm font-sans">
                  <div className="flex justify-between items-center text-[10px] font-bold text-ink/70">
                    <span className="uppercase tracking-wider flex items-center gap-1">
                      <Scale className="w-3.5 h-3.5 text-brass" />
                      Risk Tolerance Limit
                    </span>
                    <span className="font-mono text-rose-700 font-extrabold">{varianceRiskTolerance}%</span>
                  </div>
                  <input
                    type="range"
                    aria-label="Variance risk tolerance limit (percent)"
                    min="10"
                    max="50"
                    step="5"
                    value={varianceRiskTolerance}
                    onChange={(e) => handleToleranceChange(Number(e.target.value))}
                    className="w-full accent-brass cursor-pointer h-1.5 bg-fog rounded-lg appearance-none"
                  />
                  <div className="flex justify-between text-[9px] text-ink/40 font-bold uppercase tracking-widest font-mono">
                    <span>10% Strict</span>
                    <span>50% Loose</span>
                  </div>
                </div>
                
                {/* Complete Badge / Scanning Status */}
                <div className="shrink-0 flex items-center">
                  {auditedLines.length === 6 ? (
                    <span className="inline-flex items-center gap-1 px-3 py-1 bg-emerald-100 border border-emerald-200 text-emerald-800 rounded-full text-[10px] font-bold uppercase tracking-wider animate-bounce shadow-sm">
                      <CheckCircle className="w-3 h-3 text-emerald-600" />
                      <span>✓ Audit Complete</span>
                    </span>
                  ) : (
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-brass/10 border border-brass/20 text-brass rounded-full text-[10px] font-bold uppercase tracking-wider">
                      <span className="w-1.5 h-1.5 rounded-full bg-brass animate-pulse" />
                      <span>Scanner Engaged</span>
                    </span>
                  )}
                </div>
              </div>

              {/* Table Ledger wrapper */}
              <div className="overflow-x-auto flex-grow">
                <table className="w-full text-left border-collapse text-xs">
                  <thead>
                    <tr className="bg-paper/40 border-b border-fog text-ink/50 uppercase font-bold text-[9px] tracking-widest">
                      <th className="py-3 px-5">Expense Category / Row</th>
                      <th className="py-3 px-3 text-right">Budgeted</th>
                      <th className="py-3 px-3 text-right">Actual</th>
                      <th className="py-3 px-3 text-right">Variance</th>
                      <th className="py-3 px-5 text-right">Pct.</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-fog/60">
                    {/* Interactive rows */}
                    {Object.values(budgetLines).map((line) => {
                      const isSelected = selectedLineId === line.id;
                      const hasAlert = line.status !== 'safe';
                      const absPct = Math.abs(line.pct);
                      const exceedsThreshold = absPct >= varianceRiskTolerance;
                      return (
                        <React.Fragment key={line.id}>
                          <tr
                            onClick={() => handleLineClick(line.id)}
                            className={`cursor-pointer transition-premium group ${
                              isSelected 
                                ? 'bg-brass/15 hover:bg-brass/20 text-ink border-l-4 border-l-brass font-medium' 
                                : exceedsThreshold
                                  ? 'bg-rose-50/70 hover:bg-rose-100/70 border-l-4 border-l-rose-600 animate-pulse font-medium'
                                  : showVulnerabilities && hasAlert
                                    ? 'bg-amber-100/50 hover:bg-amber-100/70 border-l-4 border-l-copper animate-pulse font-medium'
                                    : 'hover:bg-paper/30 font-medium'
                            }`}
                          >
                            <td className="py-4 px-5">
                              <div className="flex items-center gap-2 flex-wrap">
                                {hasAlert && (
                                  <AlertCircle className={`w-4 h-4 shrink-0 ${line.status === 'extreme' ? 'text-rose-700' : 'text-brass'}`} />
                                )}
                                <span className="font-serif font-bold text-ink text-sm sm:text-xs leading-tight">{line.category}</span>
                                {exceedsThreshold && (
                                  <span className="inline-flex items-center gap-1 px-1.5 py-0.5 bg-rose-600 text-white text-[9px] font-sans font-extrabold uppercase tracking-widest rounded shadow-sm">
                                    <ShieldAlert className="w-2.5 h-2.5 shrink-0 text-brass animate-bounce" />
                                    <span>Overrun Triggered</span>
                                  </span>
                                )}
                                {auditedLines.includes(line.id) ? (
                                  <span className="inline-flex items-center gap-0.5 px-1.5 py-0.5 bg-emerald-50 border border-emerald-100 text-[9px] font-sans font-bold text-emerald-700 rounded uppercase tracking-wider">
                                    <CheckCircle className="w-2.5 h-2.5 text-emerald-600 shrink-0" />
                                    <span>Audited</span>
                                  </span>
                                ) : (
                                  <span className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 inline-flex items-center gap-0.5 px-1.5 py-0.5 bg-brass/10 border border-brass/20 text-[9px] font-sans font-bold text-brass rounded uppercase tracking-wider">
                                    <span>Scan Row →</span>
                                  </span>
                                )}
                              </div>
                            </td>
                            <td className="py-4 px-3 text-right font-mono">${line.budgeted.toLocaleString()}</td>
                            <td className="py-4 px-3 text-right font-mono font-bold">${line.actual.toLocaleString()}</td>
                            <td className={`py-4 px-3 text-right font-mono font-bold ${line.variance > 0 ? 'text-rose-700' : 'text-emerald-700'}`}>
                              {line.variance > 0 ? '+' : ''}${line.variance.toLocaleString()}
                            </td>
                            <td className="py-4 px-5 text-right font-mono">
                              <span className={`px-2 py-0.5 rounded font-bold ${
                                line.pct > 50 || line.pct < -50
                                  ? 'bg-rose-50 text-rose-700' 
                                  : 'bg-emerald-50 text-emerald-700'
                              }`}>
                                {line.pct > 0 ? '+' : ''}{line.pct}%
                              </span>
                            </td>
                          </tr>

                          {/* COLLAPSIBLE ROW FOR ATTORNEY ANALYSIS DESK */}
                          {isSelected && (
                            <tr className="bg-paper/10 border-l-4 border-l-brass border-r border-b border-fog/80 animate-fade-in font-medium">
                              <td colSpan={5} className="p-6">
                                <div className="space-y-6">
                                  {/* Custom Sliding Attorney Advisory Card (if threshold exceeded) */}
                                  {exceedsThreshold && (
                                    <div className="bg-rose-50 border border-rose-200 rounded-xl p-4 flex gap-3 items-start animate-fade-in shadow-sm">
                                      <div className="bg-rose-100 text-rose-700 p-2 rounded-lg shrink-0">
                                        <ShieldAlert className="w-5 h-5 animate-bounce" />
                                      </div>
                                      <div className="space-y-1">
                                        <h4 className="font-sans font-bold text-xs uppercase tracking-wider text-rose-800 flex items-center gap-1.5">
                                          <span>Attorney Compliance Advisory Alert</span>
                                          <span className="text-[9px] bg-rose-200 text-rose-800 px-1.5 py-0.5 rounded-full font-mono font-extrabold tracking-widest uppercase">Variance Limit Exceeded</span>
                                        </h4>
                                        <p className="text-xs text-rose-700 font-semibold leading-relaxed">
                                          {line.advisoryText || "This expense exceeds your configured variance risk tolerance, triggering potential regulatory scrutiny under standard charitable oversight rules."}
                                        </p>
                                        <div className="pt-2 flex items-center gap-4">
                                          <button
                                            onClick={() => {
                                              const messageText = `We are reviewing the budget sheet: "${line.category}" line showing budgeted $${line.budgeted.toLocaleString()} vs actual $${line.actual.toLocaleString()} (${line.pct}% variance). This variance alert advises an immediate review because: ${line.advisoryText || 'of state statutory limits'}.`;
                                              navigate(`contact-us?topic=budget&message=${encodeURIComponent(messageText)}`);
                                            }}
                                            className="text-[10px] font-extrabold uppercase tracking-wider text-rose-800 hover:text-rose-950 flex items-center gap-1 bg-transparent border-0 cursor-pointer p-0"
                                          >
                                            <span>Immediate Legal Review Required</span>
                                            <ArrowRight className="w-3.5 h-3.5 text-brass" />
                                          </button>
                                        </div>
                                      </div>
                                    </div>
                                  )}

                                  {/* Section Header */}
                                  <div className="flex items-center gap-2 border-b border-fog/80 pb-3">
                                    <Scale className="w-4 h-4 text-brass" />
                                    <span className="font-serif font-bold text-sm text-ink uppercase tracking-wide">
                                      Inline Attorney Analysis Desk
                                    </span>
                                  </div>
                                  
                                  {/* Grid of the 3 columns */}
                                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-left">
                                    {/* Column 1: CFO Inquiry Protocol */}
                                    <div className="space-y-3 bg-white p-4 rounded-xl border border-fog/60">
                                      <h4 className="font-sans font-bold text-xs uppercase tracking-wider text-slate-brand flex items-center gap-1.5">
                                        <span className="w-1.5 h-1.5 rounded-full bg-brass" />
                                        CFO Inquiry Protocol
                                      </h4>
                                      <ul className="space-y-2 list-none">
                                        {line.cfoInquiry?.map((inq, iIdx) => (
                                          <li key={iIdx} className="text-[11px] text-ink/80 leading-relaxed pl-3 border-l-2 border-slate-brand/40 font-semibold">
                                            {inq}
                                          </li>
                                        ))}
                                      </ul>
                                    </div>

                                    {/* Column 2: Required Documentary Evidence */}
                                    <div className="space-y-3 bg-white p-4 rounded-xl border border-fog/60">
                                      <h4 className="font-sans font-bold text-xs uppercase tracking-wider text-teal-brand flex items-center gap-1.5">
                                        <span className="w-1.5 h-1.5 rounded-full bg-brass" />
                                        Required Evidence
                                      </h4>
                                      <ul className="space-y-2 list-none">
                                        {line.invoicesRequest?.map((doc, dIdx) => (
                                          <li key={dIdx} className="text-[11px] text-ink/80 leading-relaxed pl-3 border-l-2 border-teal-brand/40 font-semibold">
                                            {doc}
                                          </li>
                                        ))}
                                      </ul>
                                    </div>

                                    {/* Column 3: Defensive Meeting Minutes Record */}
                                    <div className="space-y-3 bg-white p-4 rounded-xl border border-fog/60 flex flex-col justify-between">
                                      <div>
                                        <h4 className="font-sans font-bold text-xs uppercase tracking-wider text-burgundy flex items-center gap-1.5 mb-3">
                                          <span className="w-1.5 h-1.5 rounded-full bg-brass" />
                                          Minutes Resolution
                                        </h4>
                                        <div className="bg-paper/40 p-3 rounded-lg border border-fog text-[10px] font-mono text-ink/90 leading-normal max-h-[160px] overflow-y-auto whitespace-pre-wrap">
                                          {line.minutesShow}
                                        </div>
                                      </div>
                                      <div className="pt-3 border-t border-fog/40 text-[9px] text-ink/50 italic font-sans flex items-center gap-1">
                                        <span>Draft Board Minutes Standard</span>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </td>
                            </tr>
                          )}
                        </React.Fragment>
                      );
                    })}

                    {/* Compliant Static rows for standard mapping */}
                    <tr className="cursor-default select-none opacity-85 bg-transparent">
                      <td className="py-4 px-5 font-semibold text-ink/60 flex items-center gap-2">
                        <CheckCircle className="w-4 h-4 text-emerald-600 shrink-0" />
                        <span>Office Lease & General Administration</span>
                      </td>
                      <td className="py-4 px-3 text-right font-mono text-ink/50">$24,000</td>
                      <td className="py-4 px-3 text-right font-mono font-bold text-ink/70">$23,800</td>
                      <td className="py-4 px-3 text-right font-mono text-emerald-700/80 font-bold">-$200</td>
                      <td className="py-4 px-5 text-right font-mono"><span className="px-2 py-0.5 rounded bg-emerald-50/70 text-emerald-700/80">-0.8%</span></td>
                    </tr>

                    <tr className="cursor-default select-none opacity-85 bg-transparent">
                      <td className="py-4 px-5 font-semibold text-ink/60 flex items-center gap-2">
                        <CheckCircle className="w-4 h-4 text-emerald-600 shrink-0" />
                        <span>Program Supplies & Field Materials</span>
                      </td>
                      <td className="py-4 px-3 text-right font-mono text-ink/50">$45,000</td>
                      <td className="py-4 px-3 text-right font-mono font-bold text-ink/70">$43,500</td>
                      <td className="py-4 px-3 text-right font-mono text-emerald-700/80 font-bold">-$1,500</td>
                      <td className="py-4 px-5 text-right font-mono"><span className="px-2 py-0.5 rounded bg-emerald-50/70 text-emerald-700/80">-3.3%</span></td>
                    </tr>
                  </tbody>
                </table>
              </div>

              {/* Ledger Summary Status */}
              <div className="bg-paper/20 py-2.5 px-6 border-t border-fog flex justify-between items-center text-xs font-semibold text-ink/50">
                <span className="flex items-center gap-1.5 font-sans">
                  <Table className="w-4 h-4 text-brass" />
                  <span>Click on any ledger row to scan for unapproved transactions.</span>
                </span>
                <span className="font-serif italic font-bold">CDX Fiduciary Audit Desk</span>
              </div>
            </div>

            {/* Right Hand: The Audit Panel (5 Cols) */}
            <div className="lg:col-span-5 space-y-6">
              
              {!currentLine ? (
                /* Unselected State Placeholder */
                <div className="bg-white rounded-2xl border border-fog p-8 text-center min-h-[450px] flex flex-col justify-center items-center space-y-4">
                  <div className="bg-paper text-brass p-4 rounded-full border border-brass/30 animate-pulse">
                    <Scale className="w-8 h-8" />
                  </div>
                  <h3 className="font-serif font-bold text-lg text-ink">
                    Scan Operating Ledger
                  </h3>
                  <p className="text-xs sm:text-sm text-ink/70 max-w-sm leading-relaxed">
                    This operating budget contains unapproved transactions, self-dealing arrangements, unwithheld payroll taxes, and lapsed protections. Select any highlighted row to start scanning.
                  </p>
                  {showVulnerabilities ? null : (
                    <button
                      onClick={() => setShowVulnerabilities(true)}
                      className="mt-2 text-xs font-bold text-slate-brand hover:text-brass uppercase tracking-wider underline transition-premium"
                    >
                      Or, highlight all critical vulnerabilities
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
                        Audit Report Row Scan
                      </span>
                      <CaliforniaNoteBadge 
                        statute={currentLine.statute} 
                        text={currentLine.statuteText} 
                        className="scale-90 origin-right"
                      />
                    </div>
                    <h3 className="font-serif font-bold text-xl text-ink leading-tight">
                      {currentLine.title}
                    </h3>
                  </div>

                  {/* Fiduciary Red Flags (DoNotDoThisCard) */}
                  <DoNotDoThisCard 
                    title={currentLine.flagTitle} 
                    items={currentLine.redFlags}
                    consequence={currentLine.consequence}
                  />

                  {/* Director Question Script (AskThisCard) */}
                  <AskThisCard 
                    question={currentLine.scriptQuestion} 
                    rationale={currentLine.scriptRationale} 
                    targetRole={currentLine.scriptTarget}
                  />

                  {/* Legal Escalation Referrals (LegalEscalationCard) */}
                  {currentLine.status === 'extreme' ? (
                    <LegalEscalationCard 
                      trigger="State Fiduciary Risk Alert" 
                      explanation={`This finding represents a direct violation of regulatory law. Proceeding without certified legal restructuring can trigger severe state penalties, personal director audit assessments, or loss of tax exemption. We recommend obtaining a bylaws or procedures audit from independent legal counsel.`} 
                      actionText="Consult Charity Attorneys"
                      relatedTopic={currentLine.statute}
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
                        onClick={() => {
                          const messageText = `We are reviewing the ${currentLine.category} budget line and would like to consult on establishing appropriate board governance and expense review policies.`;
                          navigate(`contact-us?topic=budget&message=${encodeURIComponent(messageText)}`);
                        }}
                        className="inline-flex items-center gap-1 text-xs font-bold text-brass hover:text-ink transition-premium uppercase tracking-wider bg-transparent border-0 cursor-pointer p-0"
                      >
                        <span>Request Governance Consultation</span>
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
            These scenarios are modeled after common corporate and financial errors inspected by state and federal regulators. They are designed for educational training purposes only. Always consult a licensed attorney to audit your specific board packets and operational policies.
          </div>

        </div>
      </div>
    </Layout>
  );
};
export default BudgetWorksheet;
