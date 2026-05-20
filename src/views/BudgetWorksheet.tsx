import React, { useState } from 'react';
import { Layout } from '../components/Layout';
import { useRouter } from '../components/Router';
import { 
  Table, ArrowRight, Activity, CheckCircle, Scale, ShieldAlert, AlertCircle
} from 'lucide-react';
import { DoNotDoThisCard, AskThisCard, CaliforniaNoteBadge, LegalEscalationCard } from '../components/BoardroomCards';

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
}

export const BudgetWorksheet: React.FC = () => {
  const { navigate } = useRouter();
  const [selectedLineId, setSelectedLineId] = useState<string | null>(null);
  const [showVulnerabilities, setShowVulnerabilities] = useState(false);

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
      scriptQuestion: 'Did the board vote to authorize this $35,000 increase using formal local compensation comparability studies of peer California nonprofits, and are we recording that the executive was completely recused?',
      scriptRationale: 'Relying on three comparable salary studies and recusing the employee grants the board "rebuttable presumption of reasonableness," shielding directors from personal audit assessments.',
      scriptTarget: 'Board President & Treasurer'
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
      scriptRationale: 'Conflicts must be disclosed, competed, and authorized solely by disinterested directors to remain valid under California corporations law.',
      scriptTarget: 'Executive Director (CEO) & Board Secretary'
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
      scriptTarget: 'Treasurer & Executive Director'
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
      consequence: 'Under the California Charitable Trust Doctrine, donor-restricted funds represent a strict trust. Diverting restricted assets to cover general administrative expenses—even during a cash crunch—is a breach of trust. The California Attorney General actively prosecutes boards for restricted fund diversion and demands personal restitution from individual directors.',
      statute: 'CA Gov Code § 12580',
      statuteText: 'Supervision of Trustees and Charitable Trusts Act.',
      scriptQuestion: 'These funds were donor-restricted for student scholarships. Did the organization secure written consent from the original donors before diverting this $65,000 to cover general operating expenses?',
      scriptRationale: 'Without written donor consent or court permission under UPMIFA standards, restricted assets must remain separated. Financial hardship does not excuse a breach of charitable trust.',
      scriptTarget: 'Treasurer & Finance Director'
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
      statuteText: 'Duty of Care and standard of care requirements for nonprofit directors.',
      scriptQuestion: 'What specific business travel or executive retreats accounted for this $35,000 budget overrun, and why was this variance not flagged and pre-authorized by the Treasurer or the Finance Committee?',
      scriptRationale: 'Fiduciary care requires active budget tracking. Allowing large, unapproved discretionary travel budgets suggests a lack of active internal financial oversight and controls.',
      scriptTarget: 'Treasurer & Executive Director'
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
      consequence: 'In California, statutory volunteer immunity protections (CA Corp Code § 5047.5) *only* apply if the corporation maintains active liability insurance. Allowing the D&O policy to lapse strips the board of personal protection, exposing individual directors\' personal savings and homes to active corporate lawsuits.',
      statute: 'CA Corp Code § 5047.5',
      statuteText: 'Mandatory insurance thresholds for volunteer director immunity protection.',
      scriptQuestion: 'Has our D&O liability policy actively lapsed, and can we immediately reinstate the policy to preserve statutory personal immunity under California law?',
      scriptRationale: 'Maintaining active D&O insurance represents the absolute baseline of personal asset protection for volunteer nonprofit directors.',
      scriptTarget: 'Board President & Treasurer'
    }
  };

  const handleLineClick = (lineId: string) => {
    setSelectedLineId(lineId);
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
                onClick={() => setShowVulnerabilities(!showVulnerabilities)}
                className={`px-4 py-2 text-xs font-bold uppercase tracking-wider rounded border transition-premium ${
                  showVulnerabilities 
                    ? 'bg-brass text-ink border-brass shadow' 
                    : 'bg-white text-ink/80 border-fog hover:border-brass hover:text-brass'
                }`}
              >
                {showVulnerabilities ? 'Hide Vulnerability Glows' : 'Highlight Critical Rows'}
              </button>
              <a
                href="https://NPOlawyers.com"
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-2 bg-slate-brand hover:bg-ink text-white text-xs font-bold uppercase tracking-wider rounded shadow transition-premium flex items-center gap-1.5"
              >
                <span>Audit Financials</span>
                <ShieldAlert className="w-3.5 h-3.5 text-brass" />
              </a>
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
                <CaliforniaNoteBadge statute="CA AG Standard" text="Fiduciary Asset Control" className="scale-90 origin-right py-0.5" />
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
                      return (
                        <tr
                          key={line.id}
                          onClick={() => handleLineClick(line.id)}
                          className={`cursor-pointer transition-premium ${
                            isSelected 
                              ? 'bg-brass/15 hover:bg-brass/20 text-ink border-l-4 border-l-brass' 
                              : showVulnerabilities && hasAlert
                                ? 'bg-amber-100/50 hover:bg-amber-100/70 border-l-4 border-l-copper animate-pulse'
                                : 'hover:bg-paper/30'
                          }`}
                        >
                          <td className="py-4 px-5 font-semibold flex items-center gap-2">
                            {hasAlert && (
                              <AlertCircle className={`w-4 h-4 shrink-0 ${line.status === 'extreme' ? 'text-rose-700' : 'text-brass'}`} />
                            )}
                            <span>{line.category}</span>
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
                      );
                    })}

                    {/* Compliant Static rows for standard mapping */}
                    <tr className="hover:bg-paper/20">
                      <td className="py-4 px-5 font-semibold text-ink/70 flex items-center gap-2">
                        <CheckCircle className="w-4 h-4 text-emerald-600 shrink-0" />
                        <span>Office Lease & General Administration</span>
                      </td>
                      <td className="py-4 px-3 text-right font-mono text-ink/60">$24,000</td>
                      <td className="py-4 px-3 text-right font-mono font-bold text-ink/80">$23,800</td>
                      <td className="py-4 px-3 text-right font-mono text-emerald-700 font-bold">-$200</td>
                      <td className="py-4 px-5 text-right font-mono"><span className="px-2 py-0.5 rounded bg-emerald-50 text-emerald-700">-0.8%</span></td>
                    </tr>

                    <tr className="hover:bg-paper/20">
                      <td className="py-4 px-5 font-semibold text-ink/70 flex items-center gap-2">
                        <CheckCircle className="w-4 h-4 text-emerald-600 shrink-0" />
                        <span>Program Supplies & Field Materials</span>
                      </td>
                      <td className="py-4 px-3 text-right font-mono text-ink/60">$45,000</td>
                      <td className="py-4 px-3 text-right font-mono font-bold text-ink/80">$43,500</td>
                      <td className="py-4 px-3 text-right font-mono text-emerald-700 font-bold">-$1,500</td>
                      <td className="py-4 px-5 text-right font-mono"><span className="px-2 py-0.5 rounded bg-emerald-50 text-emerald-700">-3.3%</span></td>
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
                      trigger="California Fiduciary Risk Alert" 
                      explanation={`This finding represents a direct violation of regulatory law. Proceeding without certified legal restructuring can trigger severe state penalties, personal director audit assessments, or loss of tax exemption. We recommend obtaining a bylaws or procedures audit from independent legal counsel.`} 
                      actionText="Consult Nonprofit Attorneys"
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
export default BudgetWorksheet;
