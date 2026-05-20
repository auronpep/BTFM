import React, { useState } from 'react';
import { Layout } from '../components/Layout';
import { useRouter } from '../components/Router';
import { 
  CheckSquare, Square, AlertTriangle, Copy, Check,
  FileText, FileCheck, ExternalLink
} from 'lucide-react';
import { CaliforniaNoteBadge } from '../components/BoardroomCards';

interface ScoringCriterion {
  id: string;
  category: 'procedural' | 'substantive' | 'defensive';
  label: string;
  description: string;
  whyMatters: string;
  statute: string;
  checked: boolean;
}

export const MinutesScorecard: React.FC = () => {
  const { navigate } = useRouter();
  const [copied, setCopied] = useState(false);
  const [showBadMinutes, setShowBadMinutes] = useState(false);

  // Criteria database
  const [criteria, setCriteria] = useState<ScoringCriterion[]>([
    {
      id: 'presence',
      category: 'procedural',
      label: 'Accurate Attendance & Quorum Verified',
      description: 'Record meeting date, time, location, names of directors present and absent, and verify that a legal quorum was established.',
      whyMatters: 'If a regulatory audit challenges a board decision, the minutes must prove a quorum existed. Without a quorum, any board votes are legally void.',
      statute: 'CA Corp Code § 5211',
      checked: false
    },
    {
      id: 'no-transcripts',
      category: 'defensive',
      label: 'Deliberations Recorded as "Actions & Decisions" (No Verbatim Transcripts)',
      description: 'Completely exclude verbatim statements, word-for-word quotes, personal slurs, or detailed logs of disagreements. Document *decisions* and general topics of deliberation.',
      whyMatters: 'Recording "who said what" creates immediate division and exposes individual directors to heavy subpoenas and discovery during litigation. Minutes are legal evidence, not a newsletter.',
      statute: 'CA AG Best Practices',
      checked: false
    },
    {
      id: 'conflict-recusal',
      category: 'substantive',
      label: 'Conflict Disclosures & Executive Recusals Documented',
      description: 'State any director conflicts, record that the interested party made disclosures, and explicitly note that they *exited the room* during discussion and the vote.',
      whyMatters: 'To protect self-dealing contracts from being voided under California Section 5233, the minutes must prove the conflicted director was recused and absent for the vote.',
      statute: 'CA Corp Code § 5233',
      checked: false
    },
    {
      id: 'comp-comparables',
      category: 'substantive',
      label: 'Executive Compensation Comparables Cited',
      description: 'When approving salaries, document the specific independent comparability studies reviewed, the disinterested members present, and the board\'s final approved salary.',
      whyMatters: 'The IRS requires this exact documentation in the minutes to grant the board "Rebuttable Presumption of Reasonableness," shielding directors from personal excise tax penalties.',
      statute: 'IRC § 4958 / Safe Harbor',
      checked: false
    },
    {
      id: 'recuse-employee',
      category: 'defensive',
      label: 'Paid Employees Absent for Vote & Deliberations',
      description: 'Ensure the Executive Director or other compensated staff are completely recused and absent during discussions regarding their own performance and pay.',
      whyMatters: 'Failing to recuse paid executives invalidates IRS safe harbor structures and compromises the independent governance expected by the California Attorney General.',
      statute: 'IRS Safe Harbor Guidelines',
      checked: false
    },
    {
      id: 'general-deliberation',
      category: 'defensive',
      label: 'Key Board Deliberations Summarized Generally',
      description: 'Summarize discussions briefly, showing the board considered alternative risk options (e.g. "Directors discussed budget variances, evaluated the risk of expansion, and...").',
      whyMatters: 'General summaries demonstrate that the board acted with due diligence (Duty of Care), fulfilling the Business Judgment Rule without detailing sensitive inner disputes.',
      statute: 'CA Corp Code § 5231',
      checked: false
    },
    {
      id: 'tax-review',
      category: 'substantive',
      label: 'Annual IRS Form 990 Review Documented',
      description: 'Formally record that the full Board of Directors received, reviewed, and approved the annual IRS Form 990 prior to filing.',
      whyMatters: 'The IRS Form 990 asks directly if the board was provided a copy. Answering "Yes" and documenting the review process in minutes represents a major governance trust indicator.',
      statute: 'IRS Form 990 Governance Check',
      checked: false
    },
    {
      id: 'official-signatures',
      category: 'procedural',
      label: 'Signed off by Board Secretary & Centralized Record keeping',
      description: 'Bylaw mandates that final minutes must be formally typed, signed by the Board Secretary, and bound in a central corporate record book.',
      whyMatters: 'Minutes are not official corporate documents until they are voted approved at the subsequent meeting and hand-signed by the Secretary.',
      statute: 'CA Corp Code § 5215',
      checked: false
    }
  ]);

  const toggleCriterion = (id: string) => {
    setCriteria(criteria.map(c => c.id === id ? { ...c, checked: !c.checked } : c));
  };

  const checkAll = () => {
    setCriteria(criteria.map(c => ({ ...c, checked: true })));
  };

  const resetAll = () => {
    setCriteria(criteria.map(c => ({ ...c, checked: false })));
  };

  const score = criteria.filter(c => c.checked).length;
  const maxScore = criteria.length;
  const percentage = Math.round((score / maxScore) * 100);

  // Grade Boundaries
  let grade = 'F';
  let gradeColor = 'text-burgundy bg-burgundy/10 border-burgundy';
  let gradeLabel = 'Severe Personal Liability Exposure';
  let gradeDesc = 'Your minutes are currently failing to protect the board. They expose directors to audit penalties, tax liabilities, and high risk during litigation discovery. Immediate restructuring is required.';

  if (score === 8) {
    grade = 'A';
    gradeColor = 'text-teal-brand bg-teal-brand/10 border-teal-brand';
    gradeLabel = 'Courtroom-Ready Defensive Minutes';
    gradeDesc = 'Excellent. Your minutes conform to high-stakes legal guidelines. They provide a robust shield under the Business Judgment Rule and satisfy strict IRS and California Attorney General audit expectations.';
  } else if (score >= 6) {
    grade = 'B';
    gradeColor = 'text-emerald-700 bg-emerald-50 border-emerald-300';
    gradeLabel = 'Strong Protective Records';
    gradeDesc = 'Solid. Your records are reasonably defensive, but they contain minor vulnerabilities that could be exploited under intense regulatory audit or legal discovery. Secure the remaining checkboxes.';
  } else if (score >= 4) {
    grade = 'C';
    gradeColor = 'text-brass bg-brass/10 border-brass';
    gradeLabel = 'Vulnerable Corporate Records';
    gradeDesc = 'Caution. Your board records are highly vulnerable. They fail to document core statutory safe harbors like compensation comparisons and conflict recusal, posing real regulatory compliance risks.';
  } else if (score >= 2) {
    grade = 'D';
    gradeColor = 'text-copper bg-copper/10 border-copper';
    gradeLabel = 'Actionable Negligence Risk';
    gradeDesc = 'Dangerous. Your corporate minutes lack essential protections. Under audit, individual directors could be held personally liable for board actions due to insufficient record-keeping diligence.';
  }

  // Horrific board minutes sample
  const horrificMinutesMock = `MINUTES OF THE BOARD MEETING - CDX CHARITY
May 15, 2026

Meeting was called to order late around 6:25 PM by President John. We met in the back room of John's downtown diner.
Present: John, Mary, Sarah, and Bob. John asked Bob if he was still drinking, and Mary joked about the budget. 

Bob argued for two hours that the budget was too tight. Mary yelled at Bob, calling him "a blind accountant who doesn't understand marketing." Mary stated that she wanted to hire her sister's web firm for $15,000, and Bob called John a "corrupt dictator" for supporting Mary. Mary said Bob's accusations were defamatory and John threatened to sue Bob personally if he kept arguing.

John proposed we double Mary's salary as CEO to $145,000 to reward her hard work. Bob voted No, saying it was double market rate and we had no money. John called Bob a "defeatist" and held a voice vote. John, Mary, and Sarah voted YES. Bob voted NO. Mary was happy and thanked the board. Bob slammed his folder and walked out of the meeting, calling the whole board a fraud.

We then approved Mary's husband's catering contract. John said Mary's husband makes the best tacos in Orange County so we didn't need other bids. Mary voted YES.

Meeting closed around 9:00 PM. John bought everyone beers.
Minutes written by Mary.`;

  // Courtroom safe minutes template
  const defensiveMinutesTemplate = `MINUTES OF A REGULAR MEETING OF THE BOARD OF DIRECTORS
OF [ORGANIZATION NAME], A CALIFORNIA NONPROFIT BENEFIT CORPORATION

A regular meeting of the Board of Directors of the Corporation was held on [Date], at [Time] PST, at [Location / Videoconference link]. 

DIRECTORS PRESENT:
1. [Director Name], Board President
2. [Director Name], Treasurer
3. [Director Name], Secretary
4. [Director Name]

DIRECTORS ABSENT:
1. [Director Name]

OTHERS PRESENT:
1. [Executive Director Name], Executive Director (Recused during salary discussions)
2. [CPA Name], Guest Legal Counsel / CPA

I. CALL TO ORDER & WELCOME
The meeting was called to order at [Time] PST by [President Name]. The Board Secretary verified that a quorum of independent, disinterested directors was present, and the meeting proceeded to official business.

II. APPROVAL OF PAST MINUTES
Upon motion duly made, seconded, and unanimously carried, the Board approved the minutes of the regular meeting held on [Previous Date], as presented.

III. CONFLICT OF INTEREST DISCLOSURE & RECUSAL (CONTRACT APPROVAL)
The Board President raised the matter of the proposed software contract with [Vendor Entity Name]. Board member [Director Name] disclosed a material financial conflict of interest due to [Nature of Conflict]. 

[Conflicted Director Name] recused themselves from the deliberations and formally exited the room. A quorum of disinterested directors remained. Following general deliberations, review of competitive vendor bids, and upon a motion duly made and seconded, the disinterested directors voted [Unanimously / or specify vote count] to approve the contract, noting that the transaction was fair, reasonable, and in the best interests of the Corporation. [Conflicted Director Name] returned to the room following the vote.

IV. EXECUTIVE COMPENSATION REVIEW & SAFETY COMPLIANCE (IRS SAFE HARBOR)
The Board reviewed the compensation package for the Executive Director for FY 2026-2027. Prior to deliberations, Executive Director [Name] recused themselves and exited the room.

The Treasurer presented independent salary comparability studies gathered from three peer California nonprofit organizations of similar budget size and scope. Following discussion, and on motion duly made and seconded, the independent, disinterested directors voted [Unanimously / or specify vote count] to establish the Executive Director's annual salary at [Salary Amount], effective [Date]. The Board concluded that this compensation is fair, reasonable, and based on objective market comparables. The Executive Director was not present for, and did not participate in, the debate or vote.

V. IRS FORM 990 REVIEW
The Treasurer presented the draft of the annual IRS Form 990 for review. Following a comprehensive review of the filing disclosures and upon motion duly made, seconded, and unanimously carried, the Board approved the Form 990 as presented and authorized the Treasurer to file the return.

VI. ADJOURNMENT
There being no further business, the meeting was adjourned at [Time] PST.

Respectfully submitted,

____________________________________
[Secretary Name], Board Secretary
Date Approved: ____________________`;

  const copyToClipboard = () => {
    navigator.clipboard.writeText(defensiveMinutesTemplate);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <Layout>
      <div className="py-12 bg-paper/30 min-h-screen px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto space-y-8">
          
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
                Minutes Quality Scorecard
              </h1>
              <p className="text-sm text-ink/70">
                Are your board minutes a legal shield, or are they a litigation roadmap? Grade your records against California AG standards.
              </p>
            </div>

            <div className="flex items-center gap-3 shrink-0">
              <button
                onClick={checkAll}
                className="px-3.5 py-2 bg-white text-xs font-bold uppercase tracking-wider text-ink border border-fog hover:border-brass rounded transition-premium"
              >
                Check All
              </button>
              <button
                onClick={resetAll}
                className="px-3.5 py-2 bg-white text-xs font-bold uppercase tracking-wider text-ink/60 border border-fog/50 hover:border-copper rounded transition-premium"
              >
                Reset Score
              </button>
            </div>
          </div>

          {/* Score & Grading Dashboard */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
            
            {/* Left Column: Grade Report & Templates (5 Cols) */}
            <div className="md:col-span-5 space-y-6">
              
              {/* Grade Banner */}
              <div className={`rounded-2xl border p-6 text-left space-y-4 shadow-sm ${gradeColor} transition-premium`}>
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-extrabold uppercase tracking-widest text-ink/50">
                    Diligence Certificate
                  </span>
                  <div className="stamp-premium text-sm border-2 rotate-[-5deg] px-2 py-0.5 border-current font-black">
                    Grade {grade}
                  </div>
                </div>

                <div className="space-y-1">
                  <h3 className="font-serif font-black text-2xl leading-none">
                    {score} of {maxScore} Criteria Passed
                  </h3>
                  <p className="font-sans font-extrabold text-xs uppercase tracking-wider opacity-80 mt-1">
                    {gradeLabel}
                  </p>
                </div>

                <div className="w-full bg-black/10 rounded-full h-2.5">
                  <div 
                    className="h-2.5 rounded-full transition-all duration-500" 
                    style={{ 
                      width: `${percentage}%`,
                      backgroundColor: grade === 'A' ? 'var(--color-teal-brand)' : grade === 'B' ? 'var(--color-slate-brand)' : 'var(--color-copper)' 
                    }} 
                  />
                </div>

                <p className="text-xs text-ink/80 leading-relaxed font-medium pt-1">
                  {gradeDesc}
                </p>

                {grade !== 'A' && (
                  <div className="pt-2">
                    <button
                      onClick={checkAll}
                      className="inline-flex items-center gap-1.5 px-4 py-2 bg-ink hover:bg-slate-brand text-white text-xs font-bold uppercase tracking-wider rounded transition-premium"
                    >
                      <span>Simulate Grade A Standard</span>
                      <FileCheck className="w-4 h-4 text-brass" />
                    </button>
                  </div>
                )}
              </div>

              {/* Horrific Mock Minutes Demo Trigger */}
              <div className="bg-white rounded-xl border border-fog p-5 text-left space-y-3 shadow-sm">
                <div className="flex items-center justify-between">
                  <h4 className="font-sans font-bold text-xs uppercase tracking-wider text-copper flex items-center gap-1.5">
                    <AlertTriangle className="w-4 h-4" />
                    <span>Analyzing Litigious Minutes</span>
                  </h4>
                  <button
                    onClick={() => setShowBadMinutes(!showBadMinutes)}
                    className="text-[10px] font-bold uppercase tracking-widest text-slate-brand hover:text-brass"
                  >
                    {showBadMinutes ? '[ Hide Sample ]' : '[ Load Sample ]'}
                  </button>
                </div>
                <p className="text-xs text-ink/70 leading-relaxed">
                  Click below to view a mock draft of poorly written minutes. Compare it with the checkboxes on the right to see why it constitutes a litigation risk.
                </p>
                {showBadMinutes && (
                  <div className="space-y-3 mt-3 border-t border-fog pt-3 animate-fade-in">
                    <pre className="font-mono text-[10px] bg-copper/5 border border-copper/20 p-3 rounded text-ink/90 overflow-x-auto whitespace-pre-wrap leading-relaxed h-48 max-h-48 overflow-y-auto">
                      {horrificMinutesMock}
                    </pre>
                    <div className="bg-copper/5 border border-copper/15 p-3 rounded text-[11px] text-copper leading-relaxed font-medium">
                      <strong>Audit Assessment:</strong> This draft represents a Grade F. It documents internal insults, voting on unvetted bylaws, direct self-dealing (husband's contract), and lack of comparability data—all typed by the interested CEO herself. A prosecutor's dream in discovery.
                    </div>
                  </div>
                )}
              </div>

              {/* Direct Legal referral */}
              <div className="bg-ink text-paper rounded-xl p-5 text-left space-y-3 border border-brass/25">
                <h4 className="font-serif font-bold text-lg text-white">
                  Require a Professional Records Audit?
                </h4>
                <p className="text-xs text-paper/80 leading-relaxed font-sans">
                  The California Center for Nonprofit Law conducts detailed bylaws, policy, and minutes audits. Ensure your board is fully shielded under corporate safe harbors before a dispute arises.
                </p>
                <div className="pt-1.5">
                  <a
                    href="https://NPOlawyers.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 px-4 py-2.5 bg-brass hover:bg-white hover:text-ink text-ink text-xs font-bold uppercase tracking-wider rounded shadow transition-premium"
                  >
                    <span>Schedule Board Records Audit</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                </div>
              </div>

            </div>

            {/* Right Column: Scoring Checkboxes (7 Cols) */}
            <div className="md:col-span-7 space-y-4 text-left">
              
              <div className="bg-white rounded-xl border border-fog p-4 flex items-center justify-between shadow-sm">
                <span className="text-[10px] font-extrabold uppercase tracking-wider text-ink/40">
                  Diligence Checklist - Select items that apply to your board
                </span>
                <span className="text-xs text-slate-brand font-bold">
                  Progress: {percentage}%
                </span>
              </div>

              <div className="space-y-3">
                {criteria.map((item) => (
                  <div
                    key={item.id}
                    onClick={() => toggleCriterion(item.id)}
                    className={`bg-white rounded-xl border p-5 cursor-pointer transition-premium flex items-start gap-4 hover:shadow-sm hover:border-fog-strong ${
                      item.checked 
                        ? 'border-teal-brand/30 shadow-sm bg-teal-brand/5' 
                        : 'border-fog'
                    }`}
                  >
                    <div className="shrink-0 mt-0.5">
                      {item.checked ? (
                        <CheckSquare className="w-5 h-5 text-teal-brand" />
                      ) : (
                        <Square className="w-5 h-5 text-ink/30 hover:text-brass" />
                      )}
                    </div>

                    <div className="space-y-2 flex-grow">
                      <div className="flex items-center justify-between flex-wrap gap-2">
                        <h4 className={`font-sans font-bold text-sm leading-snug ${item.checked ? 'text-teal-brand' : 'text-ink'}`}>
                          {item.label}
                        </h4>
                        <CaliforniaNoteBadge statute={item.statute} text="California Standard" className="scale-90 origin-right py-0.5 bg-brass/5" />
                      </div>
                      
                      <p className="text-xs text-ink/70 leading-relaxed font-sans">
                        {item.description}
                      </p>

                      {item.checked && (
                        <div className="text-[11px] text-teal-brand font-medium border-t border-teal-brand/10 pt-2 animate-fade-in">
                          <strong className="uppercase tracking-widest text-[9px] block mb-0.5">Fiduciary Value:</strong>
                          {item.whyMatters}
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>

            </div>

          </div>

          {/* Section 2: Courtroom Safe Defensive Template */}
          <div className="bg-white rounded-2xl border border-fog p-6 sm:p-8 space-y-6 text-left shadow-sm">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b border-fog pb-4">
              <div className="space-y-1">
                <h3 className="font-serif text-xl font-bold text-ink flex items-center gap-2">
                  <FileText className="w-5 h-5 text-brass" />
                  <span>The Courtroom-Safe Minutes Template</span>
                </h3>
                <p className="text-xs text-ink/60">
                  A premium, structured, defense-compliant corporate minutes layout ready for local customization.
                </p>
              </div>

              <button
                onClick={copyToClipboard}
                className="inline-flex items-center gap-2 px-4 py-2 bg-slate-brand hover:bg-ink text-white text-xs font-bold uppercase tracking-wider rounded shadow transition-premium cursor-pointer"
              >
                {copied ? (
                  <>
                    <Check className="w-4 h-4 text-emerald-400" />
                    <span>Copied to Clipboard!</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-4 h-4 text-brass" />
                    <span>Copy Template Text</span>
                  </>
                )}
              </button>
            </div>

            <div className="relative">
              <pre className="font-mono text-[11px] text-ink bg-paper/20 p-5 rounded-xl border border-fog/80 max-h-96 overflow-y-auto leading-relaxed shadow-inner whitespace-pre-wrap select-all">
                {defensiveMinutesTemplate}
              </pre>
              <div className="absolute bottom-4 right-4 bg-white/95 px-3 py-1.5 rounded-lg text-[10px] text-ink/50 border border-fog/50 font-sans shadow pointer-events-none uppercase tracking-wider font-semibold">
                Scroll to view template
              </div>
            </div>
          </div>

        </div>
      </div>
    </Layout>
  );
};
export default MinutesScorecard;
