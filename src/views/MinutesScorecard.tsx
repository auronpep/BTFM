import React, { useState, useEffect } from 'react';
import { Layout } from '../components/Layout';
import { useRouter } from '../components/Router';
import { 
  CheckSquare, Square, AlertTriangle, Copy, Check,
  FileText, FileCheck, Sparkles, Terminal, ChevronRight, Download
} from 'lucide-react';
import { CaliforniaNoteBadge } from '../components/BoardroomCards';
import { safeStorage } from '../lib/safeStorage';

interface ScoringCriterion {
  id: string;
  category: 'procedural' | 'substantive' | 'defensive';
  label: string;
  description: string;
  whyMatters: string;
  statute: string;
  checked: boolean;
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
OF [ORGANIZATION NAME], A [STATE] PUBLIC BENEFIT CORPORATION

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

The Treasurer presented independent salary comparability studies gathered from three peer organizations of similar budget size and scope. Following discussion, and on motion duly made and seconded, the independent, disinterested directors voted [Unanimously / or specify vote count] to establish the Executive Director's annual salary at [Salary Amount], effective [Date]. The Board concluded that this compensation is fair, reasonable, and based on objective market comparables. The Executive Director was not present for, and did not participate in, the debate or vote.

V. IRS FORM 990 REVIEW
The Treasurer presented the draft of the annual IRS Form 990 for review. Following a comprehensive review of the filing disclosures and upon motion duly made, seconded, and unanimously carried, the Board approved the Form 990 as presented and authorized the Treasurer to file the return.

VI. ADJOURNMENT
There being no further business, the meeting was adjourned at [Time] PST.

Respectfully submitted,

____________________________________
[Secretary Name], Board Secretary
Date Approved: ____________________`;

export const MinutesScorecard: React.FC = () => {
  const { navigate } = useRouter();
  const [copied, setCopied] = useState(false);
  const [showBadMinutes, setShowBadMinutes] = useState(false);
  const [copiedSandbox, setCopiedSandbox] = useState(false);

  // State for Minutes Sandbox Correction (Enhancement 7)
  const [sandboxText, setSandboxText] = useState(() => {
    try {
      const saved = safeStorage.getItem('cdx_minutes_correction_draft');
      return saved || horrificMinutesMock;
    } catch {
      return horrificMinutesMock;
    }
  });

  const [sandboxCopied, setSandboxCopied] = useState(false);

  const handleSandboxChange = (text: string) => {
    setSandboxText(text);
    safeStorage.setItem('cdx_minutes_correction_draft', text);
  };

  const handleResetSandbox = () => {
    if (window.confirm("Reset sandbox text back to the non-compliant Grade F draft?")) {
      setSandboxText(horrificMinutesMock);
      safeStorage.setItem('cdx_minutes_correction_draft', horrificMinutesMock);
    }
  };

  const handleLoadPerfectSandbox = () => {
    const perfectSample = `MINUTES OF A MEETING OF THE BOARD OF DIRECTORS OF CDX CHARITY INITIATIVES
Date: May 15, 2026
Location: Office Conference Room

The board meeting convened at 6:00 PM with a legal quorum present. John Doe presided, and Secretary Sarah Jenkins recorded minutes.

I. EXECUTIVE COMPENSATION REASONABLENESS RESOLUTION (IRC § 4958)
The board reviewed proposed compensation for the Executive Director. The interested director was fully recused and exited the meeting room prior to deliberations.

The board reviewed independent salary comparability survey data of peer regional or California organizations. Based on this market data, the independent and disinterested directors voted to approve a reasonable salary resolution of $120,000, determining the amount is fair and justified.

II. INTERESTED PARTY TRANSACTION DISCLOSURE (CA CORP CODE § 5233)
The Board reviewed a proposal to contract with Beacon Tech Solutions. Director Mary Smith disclosed their material financial interest and was fully recused from discussions and the vote.

The disinterested board reviewed competitive bids and determined a more advantageous arrangement was not reasonably obtainable. The contract was approved by resolution as fair and reasonable.

Respectfully submitted,
Sarah Jenkins, Board Secretary`;
    setSandboxText(perfectSample);
    safeStorage.setItem('cdx_minutes_correction_draft', perfectSample);
  };

  const handleCopySandbox = () => {
    navigator.clipboard.writeText(sandboxText);
    setSandboxCopied(true);
    setTimeout(() => setSandboxCopied(false), 2000);
  };

  const sandboxChecks = [
    {
      id: 'quorum',
      label: 'Quorum & Attendance Verified',
      pattern: /quorum|present|attendance/i,
      desc: 'Verify a legal quorum is present and attendance is documented.'
    },
    {
      id: 'recusal',
      label: 'Conflicted Party Recusal / Exit',
      pattern: /recus|abstain|exited|exit/i,
      desc: 'Verify that conflicted directors or paid staff exited the room during the vote.'
    },
    {
      id: 'comparables',
      pattern: /comparable|survey|peer|stud/i,
      label: 'Independent Comparables Reviewed',
      desc: 'Reference peer group studies or salary survey data for executive pay.'
    },
    {
      id: 'disinterested',
      pattern: /disinterested|independent|unanimous/i,
      label: 'Disinterested Board Majority',
      desc: 'Confirm the decision is made solely by independent, disinterested directors.'
    },
    {
      id: 'reasonableness',
      pattern: /reasonable|fair|justified|basis/i,
      label: 'Reasonableness / Fairness Basis',
      desc: 'Explicitly state the board found the price or compensation to be fair and reasonable.'
    },
    {
      id: 'resolution',
      pattern: /resolution|resolved|voted|approve/i,
      label: 'Formal Approved Resolution',
      desc: 'Record decisions as formal approved board actions or resolutions.'
    },
    {
      id: 'secretary',
      pattern: /submitted|certified|secretary|sign/i,
      label: 'Official Sign-off Certification',
      desc: 'Include formal Secretary sign-off or certification language.'
    }
  ];

  const matchedSandboxCount = sandboxChecks.filter(check => check.pattern.test(sandboxText)).length;
  const sandboxPct = Math.round((matchedSandboxCount / sandboxChecks.length) * 100);

  let sandboxGrade = 'F';
  let sandboxGradeColor = 'text-burgundy bg-burgundy/5 border-burgundy/30';
  let sandboxGradeTitle = 'Grade F: High Risk Exposure';
  if (matchedSandboxCount === sandboxChecks.length) {
    sandboxGrade = 'A';
    sandboxGradeColor = 'text-teal-brand bg-teal-brand/5 border-teal-brand/30';
    sandboxGradeTitle = 'Grade A: Courtroom Defensive Standard';
  } else if (matchedSandboxCount >= 5) {
    sandboxGrade = 'B';
    sandboxGradeColor = 'text-emerald-700 bg-emerald-50 border-emerald-200';
    sandboxGradeTitle = 'Grade B: Protected Records';
  } else if (matchedSandboxCount >= 3) {
    sandboxGrade = 'C';
    sandboxGradeColor = 'text-brass bg-brass/5 border-brass/30';
    sandboxGradeTitle = 'Grade C: Vulnerable Records';
  } else if (matchedSandboxCount >= 1) {
    sandboxGrade = 'D';
    sandboxGradeColor = 'text-copper bg-copper/5 border-copper/30';
    sandboxGradeTitle = 'Grade D: Administrative Negligence';
  }

  const [resolutionState, setResolutionState] = useState(() => {
    const saved = safeStorage.getItem('cdx_minutes_resolution_builder');
    return saved ? JSON.parse(saved) : {
      organizationName: 'CDX Charity Initiatives',
      secretaryName: 'Sarah Jenkins',
      presidentName: 'John Doe',
      meetingDate: '2026-05-15',
      resolutionType: 'compensation',
      salaryAmount: '120,000',
      comparableRegion: 'Southern California',
      vendorName: 'Beacon Tech Solutions',
      conflictDirector: 'Mary Smith',
      conflictNature: 'Owner of 35% equity in Beacon Tech Solutions',
      contractAmount: '18,500',
      donorName: 'The Annenberg Trust',
      restrictedAmount: '50,000',
      restrictionPurpose: 'Bylaws Compliance Training Initiative'
    };
  });

  useEffect(() => {
    safeStorage.setItem('cdx_minutes_resolution_builder', JSON.stringify(resolutionState));
  }, [resolutionState]);

  const compileResolutionText = () => {
    const {
      organizationName, secretaryName, presidentName, meetingDate, resolutionType,
      salaryAmount, comparableRegion, vendorName, conflictDirector, conflictNature,
      contractAmount, donorName, restrictedAmount, restrictionPurpose
    } = resolutionState;

    if (resolutionType === 'compensation') {
      return `BOARD RESOLUTION OF ${organizationName.toUpperCase()}
CONCERNING EXECUTIVE COMPENSATION REASONABILITY (IRC § 4958 SAFE HARBOR)

WHEREAS, the Board of Directors of ${organizationName} (the "Corporation") has reviewed the performance and proposed annual compensation package for the Executive Director; and

WHEREAS, the Board desires to establish the Executive Director's annual salary for the upcoming fiscal year in a manner that complies with the "Rebuttable Presumption of Reasonableness" safe harbor guidelines set forth under Internal Revenue Code Section 4958 and Treasury Regulation Section 53.4958-6;

NOW, THEREFORE, BE IT RESOLVED:

1. RECUSAL: It is hereby recorded that the Executive Director was fully recused from all board discussions, deliberations, and votes regarding their proposed compensation, and formally exited the meeting room prior to any debate or vote.

2. INDEPENDENT COMPARABLES: The Board Treasurer presented and the Board reviewed independent salary comparability data from a comprehensive salary study of peer organizations of similar budget size ($500,000 to $2,500,000) and geographic scope (the ${comparableRegion} region). This data demonstrated that the median annual compensation for executive directors of comparable organizations ranges from $95,000 to $135,000.

3. APPROVAL AND BASIS: Based on its review of the independent comparability data, the disinterested directors of the Board hereby approve an annual salary of $${salaryAmount} for the Executive Director, finding this amount to be fair, reasonable, and in the best interests of the Corporation.

4. WRITTEN RECORD: This resolution and the accompanying minutes shall serve as the contemporaneous written record of the Board's determination in accordance with IRS Safe Harbor requirements.

Dated: ${meetingDate}
Certified by:

___________________________
${secretaryName}, Board Secretary`;
    }

    if (resolutionType === 'self_dealing') {
      return `BOARD RESOLUTION OF ${organizationName.toUpperCase()}
APPROVING TRANSACTION INVOLVING CONFLICTED DIRECTOR (CA CORP CODE § 5233)

WHEREAS, the Corporation proposes to enter into a contract with ${vendorName} for certain services, with a total financial commitment of $${contractAmount}; and

WHEREAS, Board member ${conflictDirector} has disclosed a material financial conflict of interest in connection with this transaction due to being ${conflictNature}; and

WHEREAS, under applicable state self-dealing rules (such as California Corporations Code Section 5233), the Board must review and approve self-dealing contracts in good faith, with disinterested directors verifying that the transaction is fair and reasonable and that a more advantageous arrangement could not have been obtained with reasonable effort;

NOW, THEREFORE, BE IT RESOLVED:

1. FULL DISCLOSURE: The Board notes that ${conflictDirector} made full disclosure of their interest to the Board, and such disclosure has been recorded in the corporate files.

2. RECUSAL: ${conflictDirector} recused themselves from all deliberations and votes regarding this matter, and exited the room prior to any discussion or vote. A quorum of disinterested directors remained.

3. FAIRNESS AND ALTERNATIVES: The disinterested directors have reviewed comparable bids and proposals from other vendors and have determined that the Corporation could not, with reasonable effort, obtain a more advantageous arrangement under the circumstances. The transaction with ${vendorName} is fair, reasonable, and in the best interests of the Corporation.

4. APPROVAL: The disinterested directors of the Board hereby approve the contract with ${vendorName} for $${contractAmount} and authorize the Board President ${presidentName} to execute the agreement on behalf of the Corporation.

Dated: ${meetingDate}
Certified by:

___________________________
${secretaryName}, Board Secretary`;
    }

    return `BOARD RESOLUTION OF ${organizationName.toUpperCase()}
ESTABLISHING TEMPORARY RESTRICTION OF FUNDS (DONOR INTENT PRESERVATION)

WHEREAS, the Corporation received a generous contribution in the amount of $${restrictedAmount} from ${donorName}; and

WHEREAS, the donor has expressed the specific intent and restriction that these funds be utilized solely for the purpose of ${restrictionPurpose}; and

WHEREAS, the Board of Directors of ${organizationName} is committed to upholding its fiduciary duty to protect and preserve donor-restricted assets in compliance with the Uniform Prudent Management of Institutional Funds Act (UPMIFA), active in most states including California;

NOW, THEREFORE, BE IT RESOLVED:

1. RESTRICTION ESTABLISHED: The Board hereby directs the Treasurer and executive staff to segregate the $${restrictedAmount} contribution from general operating accounts and establish a dedicated, temporarily restricted ledger account for ${donorName} restricted funds.

2. EXPENDITURE CONTROLS: The Board declares that these funds shall be expended solely for ${restrictionPurpose} in accordance with the donor's expressed intent, and no portion of these restricted funds shall be redirected to satisfy general corporate liabilities or general operating overhead.

3. REPORTING: The Treasurer shall present a quarterly restricted-fund variance report to the Board detailing all disbursements made from this account until the restriction is fully satisfied.

Dated: ${meetingDate}
Certified by:

___________________________
${secretaryName}, Board Secretary`;
  };

  const copySandboxToClipboard = () => {
    navigator.clipboard.writeText(compileResolutionText());
    setCopiedSandbox(true);
    setTimeout(() => setCopiedSandbox(false), 2000);
  };

  const downloadTemplateAsText = () => {
    const blob = new Blob([defensiveMinutesTemplate], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `defensive_board_minutes_template.txt`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  const downloadResolutionAsText = () => {
    const text = compileResolutionText();
    const blob = new Blob([text], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `board_resolution_${resolutionState.resolutionType}.txt`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  // Criteria database
  const [criteria, setCriteria] = useState<ScoringCriterion[]>(() => {
    const savedIds = safeStorage.getItem('cdx_minutes_scorecard_checked_ids');
    const checkedIds: string[] = savedIds ? JSON.parse(savedIds) : [];
    
    const initialCriteria: Omit<ScoringCriterion, 'checked'>[] = [
      {
        id: 'presence',
        category: 'procedural',
        label: 'Accurate Attendance & Quorum Verified',
        description: 'Record meeting date, time, location, names of directors present and absent, and verify that a legal quorum was established.',
        whyMatters: 'If a regulatory audit challenges a board decision, the minutes must prove a quorum existed. Without a quorum, any board votes are legally void.',
        statute: 'CA Corp Code § 5211 / State Code'
      },
      {
        id: 'no-transcripts',
        category: 'defensive',
        label: 'Deliberations Recorded as "Actions & Decisions" (No Verbatim Transcripts)',
        description: 'Completely exclude verbatim statements, word-for-word quotes, personal slurs, or detailed logs of disagreements. Document *decisions* and general topics of deliberation.',
        whyMatters: 'Recording "who said what" creates immediate division and exposes individual directors to heavy subpoenas and discovery during litigation. Minutes are legal evidence, not a newsletter.',
        statute: 'State AG & IRS Guidelines'
      },
      {
        id: 'conflict-recusal',
        category: 'substantive',
        label: 'Conflict Disclosures & Executive Recusals Documented',
        description: 'State any director conflicts, record that the interested party made disclosures, and explicitly note that they *exited the room* during discussion and the vote.',
        whyMatters: 'To protect self-dealing contracts from being voided under applicable state self-dealing codes (such as California Section 5233), the minutes must prove the conflicted director was recused and absent for the vote.',
        statute: 'applicable state self-dealing codes (such as California Section 5233)'
      },
      {
        id: 'comp-comparables',
        category: 'substantive',
        label: 'Executive Compensation Comparables Cited',
        description: 'When approving salaries, document the specific independent comparability studies reviewed, the disinterested members present, and the board\'s final approved salary.',
        whyMatters: 'The IRS requires this exact documentation in the minutes to grant the board "Rebuttable Presumption of Reasonableness," shielding directors from personal excise tax penalties.',
        statute: 'IRC § 4958 / Safe Harbor'
      },
      {
        id: 'recuse-employee',
        category: 'defensive',
        label: 'Paid Employees Absent for Vote & Deliberations',
        description: 'Ensure the Executive Director or other compensated staff are completely recused and absent during discussions regarding their own performance and pay.',
        whyMatters: 'Failing to recuse paid executives invalidates IRS safe harbor structures and compromises the independent governance expected by state regulators and Attorneys General.',
        statute: 'IRS Safe Harbor Guidelines'
      },
      {
        id: 'general-deliberation',
        category: 'defensive',
        label: 'Key Board Deliberations Summarized Generally',
        description: 'Summarize discussions briefly, showing the board considered alternative risk options (e.g. "Directors discussed budget variances, evaluated the risk of expansion, and...").',
        whyMatters: 'General summaries demonstrate that the board acted with due diligence (Duty of Care), fulfilling the Business Judgment Rule without detailing sensitive inner disputes.',
        statute: 'CA Corp Code § 5231 / Fiduciary Standards'
      },
      {
        id: 'tax-review',
        category: 'substantive',
        label: 'Annual IRS Form 990 Review Documented',
        description: 'Formally record that the full Board of Directors received, reviewed, and approved the annual IRS Form 990 prior to filing.',
        whyMatters: 'The IRS Form 990 asks directly if the board was provided a copy. Answering "Yes" and documenting the review process in minutes represents a major governance trust indicator.',
        statute: 'IRS Form 990 Governance Check'
      },
      {
        id: 'official-signatures',
        category: 'procedural',
        label: 'Signed off by Board Secretary & Centralized Record keeping',
        description: 'Bylaw mandates that final minutes must be formally typed, signed by the Board Secretary, and bound in a central corporate record book.',
        whyMatters: 'Minutes are not official corporate documents until they are voted approved at the subsequent meeting and hand-signed by the Secretary.',
        statute: 'CA Corp Code § 5215 / Secretary Mandates'
      }
    ];

    return initialCriteria.map(c => ({
      ...c,
      checked: checkedIds.includes(c.id)
    })) as ScoringCriterion[];
  });

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
    gradeDesc = 'Excellent. Your minutes conform to high-stakes legal guidelines. They provide a robust shield under the Business Judgment Rule and satisfy strict IRS and state regulatory audit expectations.';
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

  useEffect(() => {
    safeStorage.setItem('cdx_minutes_scorecard_score', score.toString());
    safeStorage.setItem('cdx_minutes_scorecard_grade', grade);
    const checkedIds = criteria.filter(c => c.checked).map(c => c.id);
    safeStorage.setItem('cdx_minutes_scorecard_checked_ids', JSON.stringify(checkedIds));
  }, [score, grade, criteria]);

  // Static mock declarations moved to top of file to prevent early access errors

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
                Are your board minutes a legal shield, or are they a litigation roadmap? Grade your records against strict state regulatory and IRS guidelines (with specialized California snapshots).
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
                    <AlertTriangle className="w-4 h-4 text-copper animate-bounce" />
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
                
                <div className="pt-1">
                  <button
                    onClick={() => {
                      setShowBadMinutes(true);
                      resetAll();
                    }}
                    className="w-full inline-flex justify-center items-center gap-1.5 px-4 py-2.5 bg-burgundy/10 hover:bg-burgundy text-burgundy hover:text-white border border-burgundy/30 text-xs font-bold uppercase tracking-wider rounded transition-premium"
                  >
                    <span>Load & Score Bad Sample (Grade F)</span>
                    <AlertTriangle className="w-4 h-4" />
                  </button>
                </div>

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
                  Specialized nonprofit counsel (such as the California Center for Nonprofit Law / NPO Lawyers) conducts detailed bylaws, policy, and minutes audits. Ensure your board is fully shielded under corporate safe harbors before a dispute arises.
                </p>
                <div className="pt-1.5">
                  <button
                    onClick={() => navigate('contact-us?topic=minutes&message=We%20would%20like%20to%20request%20information%20on%20scheduling%20a%20professional%20records%20and%20minutes%20quality%20audit%20for%20our%20board\'s%20corporate%20book.')}
                    className="inline-flex items-center gap-1.5 px-4 py-2.5 bg-brass hover:bg-white hover:text-ink text-ink text-xs font-bold uppercase tracking-wider rounded shadow transition-premium border-0 cursor-pointer"
                  >
                    <span>Schedule Board Records Audit</span>
                    <ChevronRight className="w-3.5 h-3.5" />
                  </button>
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
                        <CaliforniaNoteBadge statute={item.statute} text="Statutory Benchmark" className="scale-90 origin-right py-0.5 bg-brass/5" />
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

              <div className="flex flex-wrap items-center gap-2">
                <button
                  onClick={() => {
                    checkAll();
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className="inline-flex items-center gap-1.5 px-4 py-2 bg-teal-brand hover:bg-ink text-white text-xs font-bold uppercase tracking-wider rounded shadow transition-premium cursor-pointer"
                >
                  <span>Load & Score Safe Template (Grade A)</span>
                  <FileCheck className="w-4 h-4 text-brass" />
                </button>

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

                <button
                  onClick={downloadTemplateAsText}
                  className="inline-flex items-center gap-2 px-4 py-2 bg-white hover:bg-fog text-ink text-xs font-bold uppercase tracking-wider rounded border border-fog shadow transition-premium cursor-pointer"
                >
                  <Download className="w-4 h-4 text-brass" />
                  <span>Download .txt Template</span>
                </button>
              </div>
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

          {/* Minutes Resolution Draft Sandbox */}
          <div id="resolution-sandbox" className="bg-amber-50/25 rounded-2xl border border-amber-900/15 p-6 sm:p-8 space-y-6 text-left shadow-sm">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b border-amber-900/10 pb-4">
              <div className="space-y-1">
                <h3 className="font-serif text-xl font-bold text-ink flex items-center gap-2">
                  <Sparkles className="w-5 h-5 text-brass" />
                  <span>Minutes Resolution Draft Assistant</span>
                </h3>
                <p className="text-xs text-ink/60">
                  Input meeting details to dynamically compile a robust, legally protective board resolution for corporate records.
                </p>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={copySandboxToClipboard}
                  className="inline-flex items-center gap-2 px-4 py-2 bg-brass hover:bg-ink text-ink hover:text-white text-xs font-bold uppercase tracking-wider rounded shadow transition-premium cursor-pointer"
                >
                  {copiedSandbox ? (
                    <>
                      <Check className="w-4 h-4 text-emerald-800" />
                      <span>Resolution Copied!</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-4 h-4" />
                      <span>Copy Draft Resolution</span>
                    </>
                  )}
                </button>

                <button
                  onClick={downloadResolutionAsText}
                  className="inline-flex items-center gap-2 px-4 py-2 bg-white hover:bg-fog text-ink text-xs font-bold uppercase tracking-wider rounded border border-fog shadow transition-premium cursor-pointer"
                >
                  <Download className="w-4 h-4 text-brass" />
                  <span>Download .txt Resolution</span>
                </button>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
              {/* Form parameters */}
              <div className="lg:col-span-5 space-y-4">
                <div className="space-y-1.5">
                  <label className="text-[10px] font-extrabold uppercase tracking-wider text-ink/50 block">Resolution Type</label>
                  <select
                    value={resolutionState.resolutionType}
                    onChange={(e) => setResolutionState({ ...resolutionState, resolutionType: e.target.value })}
                    className="w-full bg-white border border-fog hover:border-brass focus:border-brass rounded px-3 py-2 text-xs font-medium text-ink focus:outline-none transition-premium cursor-pointer"
                  >
                    <option value="compensation">Executive Salary Reasonableness (IRC § 4958)</option>
                    <option value="self_dealing">Self-Dealing Contract Approval (CA Corp § 5233)</option>
                    <option value="donor_restriction">General Fund Temporary Restriction</option>
                  </select>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-[10px] font-extrabold uppercase tracking-wider text-ink/50 block">Organization Name</label>
                    <input
                      type="text"
                      value={resolutionState.organizationName}
                      onChange={(e) => setResolutionState({ ...resolutionState, organizationName: e.target.value })}
                      className="w-full bg-white border border-fog rounded px-3 py-1.5 text-xs text-ink focus:outline-none focus:border-brass transition-premium"
                    />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-[10px] font-extrabold uppercase tracking-wider text-ink/50 block">Meeting Date</label>
                    <input
                      type="date"
                      value={resolutionState.meetingDate}
                      onChange={(e) => setResolutionState({ ...resolutionState, meetingDate: e.target.value })}
                      className="w-full bg-white border border-fog rounded px-3 py-1.5 text-xs text-ink focus:outline-none focus:border-brass transition-premium"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-[10px] font-extrabold uppercase tracking-wider text-ink/50 block">Secretary Name</label>
                    <input
                      type="text"
                      value={resolutionState.secretaryName}
                      onChange={(e) => setResolutionState({ ...resolutionState, secretaryName: e.target.value })}
                      className="w-full bg-white border border-fog rounded px-3 py-1.5 text-xs text-ink focus:outline-none focus:border-brass transition-premium"
                    />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-[10px] font-extrabold uppercase tracking-wider text-ink/50 block">Board President Name</label>
                    <input
                      type="text"
                      value={resolutionState.presidentName}
                      onChange={(e) => setResolutionState({ ...resolutionState, presidentName: e.target.value })}
                      className="w-full bg-white border border-fog rounded px-3 py-1.5 text-xs text-ink focus:outline-none focus:border-brass transition-premium"
                    />
                  </div>
                </div>

                {resolutionState.resolutionType === 'compensation' && (
                  <div className="grid grid-cols-2 gap-4 border-t border-fog pt-3 mt-2 animate-fade-in">
                    <div className="space-y-1.5">
                      <label className="text-[10px] font-extrabold uppercase tracking-wider text-ink/50 block">Annual Salary ($)</label>
                      <input
                        type="text"
                        value={resolutionState.salaryAmount}
                        onChange={(e) => setResolutionState({ ...resolutionState, salaryAmount: e.target.value })}
                        className="w-full bg-white border border-fog rounded px-3 py-1.5 text-xs text-ink focus:outline-none focus:border-brass transition-premium"
                      />
                    </div>
                    <div className="space-y-1.5">
                      <label className="text-[10px] font-extrabold uppercase tracking-wider text-ink/50 block">Comparable Region</label>
                      <input
                        type="text"
                        value={resolutionState.comparableRegion}
                        onChange={(e) => setResolutionState({ ...resolutionState, comparableRegion: e.target.value })}
                        className="w-full bg-white border border-fog rounded px-3 py-1.5 text-xs text-ink focus:outline-none focus:border-brass transition-premium"
                      />
                    </div>
                  </div>
                )}

                {resolutionState.resolutionType === 'self_dealing' && (
                  <div className="border-t border-fog pt-3 mt-2 space-y-3 animate-fade-in">
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-1.5">
                        <label className="text-[10px] font-extrabold uppercase tracking-wider text-ink/50 block">Conflicted Director</label>
                        <input
                          type="text"
                          value={resolutionState.conflictDirector}
                          onChange={(e) => setResolutionState({ ...resolutionState, conflictDirector: e.target.value })}
                          className="w-full bg-white border border-fog rounded px-3 py-1.5 text-xs text-ink focus:outline-none focus:border-brass transition-premium"
                        />
                      </div>
                      <div className="space-y-1.5">
                        <label className="text-[10px] font-extrabold uppercase tracking-wider text-ink/50 block">Vendor Name</label>
                        <input
                          type="text"
                          value={resolutionState.vendorName}
                          onChange={(e) => setResolutionState({ ...resolutionState, vendorName: e.target.value })}
                          className="w-full bg-white border border-fog rounded px-3 py-1.5 text-xs text-ink focus:outline-none focus:border-brass transition-premium"
                        />
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-1.5">
                        <label className="text-[10px] font-extrabold uppercase tracking-wider text-ink/50 block">Contract Value ($)</label>
                        <input
                          type="text"
                          value={resolutionState.contractAmount}
                          onChange={(e) => setResolutionState({ ...resolutionState, contractAmount: e.target.value })}
                          className="w-full bg-white border border-fog rounded px-3 py-1.5 text-xs text-ink focus:outline-none focus:border-brass transition-premium"
                        />
                      </div>
                      <div className="space-y-1.5">
                        <label className="text-[10px] font-extrabold uppercase tracking-wider text-ink/50 block">Nature of Conflict</label>
                        <input
                          type="text"
                          value={resolutionState.conflictNature}
                          onChange={(e) => setResolutionState({ ...resolutionState, conflictNature: e.target.value })}
                          className="w-full bg-white border border-fog rounded px-3 py-1.5 text-xs text-ink focus:outline-none focus:border-brass transition-premium"
                          placeholder="e.g. Spouse is owner"
                        />
                      </div>
                    </div>
                  </div>
                )}

                {resolutionState.resolutionType === 'donor_restriction' && (
                  <div className="border-t border-fog pt-3 mt-2 space-y-3 animate-fade-in">
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-1.5">
                        <label className="text-[10px] font-extrabold uppercase tracking-wider text-ink/50 block">Donor Name</label>
                        <input
                          type="text"
                          value={resolutionState.donorName}
                          onChange={(e) => setResolutionState({ ...resolutionState, donorName: e.target.value })}
                          className="w-full bg-white border border-fog rounded px-3 py-1.5 text-xs text-ink focus:outline-none focus:border-brass transition-premium"
                        />
                      </div>
                      <div className="space-y-1.5">
                        <label className="text-[10px] font-extrabold uppercase tracking-wider text-ink/50 block">Restricted Amount ($)</label>
                        <input
                          type="text"
                          value={resolutionState.restrictedAmount}
                          onChange={(e) => setResolutionState({ ...resolutionState, restrictedAmount: e.target.value })}
                          className="w-full bg-white border border-fog rounded px-3 py-1.5 text-xs text-ink focus:outline-none focus:border-brass transition-premium"
                        />
                      </div>
                    </div>
                    <div className="space-y-1.5">
                      <label className="text-[10px] font-extrabold uppercase tracking-wider text-ink/50 block">Restricted Purpose</label>
                      <input
                        type="text"
                        value={resolutionState.restrictionPurpose}
                        onChange={(e) => setResolutionState({ ...resolutionState, restrictionPurpose: e.target.value })}
                        className="w-full bg-white border border-fog rounded px-3 py-1.5 text-xs text-ink focus:outline-none focus:border-brass transition-premium"
                      />
                    </div>
                  </div>
                )}

                <div className="bg-brass/5 border border-brass/10 p-3.5 rounded-lg text-[11px] text-ink/80 leading-relaxed font-sans mt-4">
                  <strong>Corporate Law Note:</strong> Once compiled, copy and paste this resolution directly into your meeting minutes. Standard corporate codes (including California Corp Code § 5215) confirm that certified copies of minutes are prima facie evidence of meeting proceedings.
                </div>
              </div>

              {/* Dynamic code blocks */}
              <div className="lg:col-span-7 flex flex-col">
                <div className="relative flex-grow flex flex-col min-h-[350px]">
                  <pre className="flex-grow font-mono text-[10.5px] bg-white border border-fog p-5 rounded-xl text-ink overflow-y-auto leading-relaxed shadow-inner whitespace-pre-wrap select-all max-h-[460px]">
                    {compileResolutionText()}
                  </pre>
                  <div className="absolute top-3 right-3 bg-paper px-2 py-0.5 border border-fog text-[9px] font-extrabold text-brass uppercase tracking-widest rounded shadow-sm">
                    Live Draft Preview
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Minutes Correction Sandbox (Enhancement 7) */}
          <div className="bg-white rounded-2xl border border-fog p-6 sm:p-8 space-y-6 text-left shadow-sm mt-8 relative overflow-hidden">
            {/* Elegant watermarked background logo or gradient */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-bl from-brass/5 to-transparent rounded-full -mr-20 -mt-20 pointer-events-none" />

            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b border-fog pb-4 relative z-10">
              <div className="space-y-1">
                <h3 className="font-serif text-xl font-bold text-ink flex items-center gap-2">
                  <Terminal className="w-5 h-5 text-brass" />
                  <span>Minutes Correction Sandbox & Audit Simulator</span>
                </h3>
                <p className="text-xs text-ink/60">
                  Edit the live board minutes draft below. The compliance engine will analyze your edits in real time to assign a grade.
                </p>
              </div>

              <div className="flex flex-wrap items-center gap-2">
                <button
                  onClick={handleLoadPerfectSandbox}
                  className="px-3 py-1.5 bg-teal-brand/10 hover:bg-teal-brand/20 text-teal-brand text-[11px] font-bold uppercase tracking-wider rounded transition-premium cursor-pointer"
                >
                  Load Perfect Sample (Grade A)
                </button>
                <button
                  onClick={handleResetSandbox}
                  className="px-3 py-1.5 bg-burgundy/10 hover:bg-burgundy/20 text-burgundy text-[11px] font-bold uppercase tracking-wider rounded transition-premium cursor-pointer"
                >
                  Load Non-Compliant Draft (Grade F)
                </button>
                <button
                  onClick={handleCopySandbox}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-brass hover:bg-ink text-ink hover:text-white text-[11px] font-bold uppercase tracking-wider rounded shadow transition-premium cursor-pointer"
                >
                  {sandboxCopied ? (
                    <>
                      <Check className="w-3.5 h-3.5" />
                      <span>Copied!</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5" />
                      <span>Copy Draft</span>
                    </>
                  )}
                </button>
              </div>
            </div>

            {/* Main Interactive Work Area */}
            <div className="grid lg:grid-cols-12 gap-8 relative z-10">
              {/* Textarea Area */}
              <div className="lg:col-span-7 flex flex-col space-y-3">
                <div className="relative flex-grow">
                  <textarea
                    value={sandboxText}
                    onChange={(e) => handleSandboxChange(e.target.value)}
                    rows={16}
                    className="w-full font-mono text-xs bg-paper border border-fog/80 focus:border-brass rounded-xl p-5 text-ink leading-relaxed shadow-inner outline-none transition-premium resize-none"
                    placeholder="Type or paste your minutes draft here..."
                  />

                  {/* Certified Seal Badge when Grade A */}
                  {sandboxGrade === 'A' && (
                    <div className="absolute bottom-4 right-4 animate-bounce flex items-center gap-2 bg-gradient-to-r from-brass to-amber-600 text-white px-3 py-1.5 rounded-full shadow-lg border border-white/20">
                      <FileCheck className="w-4 h-4" />
                      <span className="text-[10px] font-bold uppercase tracking-widest">Certified Courtroom Grade</span>
                    </div>
                  )}
                </div>

                <div className="flex justify-between items-center text-[10px] text-ink/50 uppercase tracking-widest font-extrabold px-1">
                  <span>Character Count: {sandboxText.length}</span>
                  <span>Interactive Compliance Feedback Engine</span>
                </div>
              </div>

              {/* Live Real-Time Compliance Scorecard Area */}
              <div className="lg:col-span-5 flex flex-col space-y-5 bg-paper/30 border border-fog/50 rounded-xl p-5 sm:p-6 shadow-sm">
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-xs font-extrabold uppercase tracking-widest text-ink/50 block">Audit Score</span>
                    <span className="text-xs font-mono font-bold text-ink/75">{matchedSandboxCount} of {sandboxChecks.length} Criteria Passed</span>
                  </div>

                  {/* Dynamic Progress Bar */}
                  <div className="h-2 w-full bg-fog/40 rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-gradient-to-r from-brass to-teal-brand transition-all duration-500 ease-out"
                      style={{ width: `${sandboxPct}%` }}
                    />
                  </div>

                  {/* Large Grade Badge Display */}
                  <div className={`p-4 rounded-xl border text-center transition-premium ${sandboxGradeColor}`}>
                    <div className="text-[10px] font-extrabold uppercase tracking-widest opacity-60">Calculated Security Level</div>
                    <div className="text-4xl font-serif font-black my-1.5">{sandboxGrade}</div>
                    <div className="text-xs font-bold">{sandboxGradeTitle}</div>
                  </div>
                </div>

                {/* Checklist List */}
                <div className="space-y-3 flex-grow">
                  <span className="text-[10px] font-extrabold uppercase tracking-widest text-ink/50 block border-b border-fog pb-1">Required Legal Elements</span>
                  
                  <div className="space-y-2.5 max-h-[220px] overflow-y-auto pr-1">
                    {sandboxChecks.map((check) => {
                      const isMatched = check.pattern.test(sandboxText);
                      return (
                        <div 
                          key={check.id}
                          className={`flex items-start gap-2.5 p-2 rounded-lg text-left transition-premium border ${
                            isMatched 
                              ? 'bg-emerald-500/5 border-emerald-500/10 text-ink' 
                              : 'bg-burgundy/5 border-burgundy/10 text-ink/80'
                          }`}
                        >
                          <div className="mt-0.5">
                            {isMatched ? (
                              <Check className="w-4 h-4 text-emerald-600" />
                            ) : (
                              <AlertTriangle className="w-4 h-4 text-burgundy" />
                            )}
                          </div>
                          <div className="space-y-0.5">
                            <div className="text-xs font-bold flex items-center gap-1.5">
                              <span>{check.label}</span>
                              {isMatched ? (
                                <span className="text-[8px] bg-emerald-500/10 text-emerald-700 px-1 py-0.2 rounded font-extrabold uppercase tracking-wider">Passed</span>
                              ) : (
                                <span className="text-[8px] bg-burgundy/10 text-burgundy px-1 py-0.2 rounded font-extrabold uppercase tracking-wider">Missing</span>
                              )}
                            </div>
                            <p className="text-[10px] text-ink/50 leading-normal">
                              {check.desc}
                            </p>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Conversion Trigger Banner */}
                {sandboxGrade !== 'A' ? (
                  <div className="p-3 bg-brass/5 border border-brass/10 rounded-lg text-left">
                    <p className="text-[10px] text-ink/70 leading-normal mb-1.5">
                      <strong>Audit Advisory:</strong> Your minutes record is missing key procedural shields. Under CA Corp Code, inaccurate minutes expose directors to self-dealing and personal tax penalties.
                    </p>
                    <button
                      onClick={() => navigate('contact-us?topic=minutes&message=We%20are%20using%20the%20Board%20Minutes%20Correction%20Sandbox%20and%20would%20like%20to%20request%20professional%20bylaws%20vetting%20for%20our%20organization.')}
                      className="inline-flex items-center gap-1 text-[9px] font-extrabold text-brass hover:text-ink uppercase tracking-wider bg-transparent border-0 cursor-pointer p-0"
                    >
                      <span>Obtain Professional Bylaws Vetting</span>
                      <ChevronRight className="w-3 h-3 text-brass" />
                    </button>
                  </div>
                ) : (
                  <div className="p-3 bg-teal-brand/5 border border-teal-brand/10 rounded-lg text-left">
                    <p className="text-[10px] text-ink/70 leading-normal mb-1.5">
                      <strong>Defense Complete:</strong> You have implemented a top-tier corporate defensive shield. Congratulations on protecting your board! Keep this template secure or have our firm audit your full corporate book.
                    </p>
                    <button
                      onClick={() => navigate('contact-us?topic=minutes&message=We%20have%20completed%20the%20Board%20Minutes%20Correction%20Sandbox%20and%20scored%20an%20A.%20We%20would%20like%20to%20schedule%20a%20professional%20corporate%20book%20audit%20to%20ensure%20all%20of%20our%20records%20are%20fully%20compliant.')}
                      className="inline-flex items-center gap-1 text-[9px] font-extrabold text-teal-brand hover:text-ink uppercase tracking-wider bg-transparent border-0 cursor-pointer p-0"
                    >
                      <span>Request Corporate Book Audit</span>
                      <ChevronRight className="w-3 h-3 text-teal-brand" />
                    </button>
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
export default MinutesScorecard;
