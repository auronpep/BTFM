import React, { useState, useEffect } from 'react';
import { useRouter } from '../components/Router';
import { Layout } from '../components/Layout';
import { 
  Award, FileText, ShieldCheck, Scale, Landmark, ChevronRight, Activity, 
  ArrowRight, RefreshCw, X, Copy, Check, Printer, Sparkles, AlertTriangle, FileQuestion, CheckSquare, Download
} from 'lucide-react';
import { parseTextWithStatutesAndGlossary } from '../components/StatuteTooltip';
import { safeStorage } from '../lib/safeStorage';

interface ScriptTemplate {
  id: string;
  title: string;
  problem: string;
  statute: string;
  statuteTitle: string;
  target: string;
  questions: {
    question: string;
    rationale: string;
    targetResponse: string;
    counterStrike: string;
  }[];
}

const form990Questions = [
  {
    id: 'independent_majority',
    line: 'Line 1b',
    question: "Is a majority of your voting board members independent (not paid, not related to staff)?",
    optimal: 'yes',
    guidance: "The IRS requires disclosure of independent votes. A non-independent majority raises severe self-dealing and intermediate sanction risks.",
  },
  {
    id: 'family_relationships',
    line: 'Line 2',
    question: "Did any directors or officers share family or business relationships with other directors or officers?",
    optimal: 'no',
    guidance: "Family/business pairings are disclosable and can erode independent quorum compliance. Best practice is to avoid dual family seats.",
  },
  {
    id: 'delegation_management',
    line: 'Line 3',
    question: "Did you delegate management control over corporate duties to an external management company?",
    optimal: 'no',
    guidance: "External management agreements require rigorous disinterested review and signed contracts to prevent unconstitutional delegation of powers.",
  },
  {
    id: 'bylaws_changes',
    line: 'Line 4',
    question: "Were any significant amendments made to your Bylaws or Articles of Incorporation this tax year?",
    optimal: 'no',
    guidance: "Significant amendments must be reported to the IRS on Form 990. Verify that changes were certified by Secretary resolution.",
  },
  {
    id: 'asset_diversion',
    line: 'Line 5',
    question: "Was there any significant diversion of assets (theft, fraud, unauthorized loans, or embezzlement)?",
    optimal: 'no',
    guidance: "A 'Yes' requires public disclosure on Form 990. Immediate legal escalation to specialized counsel is required to protect exempt status.",
  },
  {
    id: 'minutes_recorded',
    line: 'Line 8a & 8b',
    question: "Did your board contemporaneously document all meetings and committee votes with written minutes?",
    optimal: 'yes',
    guidance: "Contemporaneous means before the next meeting or within 60 days. Failing to record minutes invalidates actions and violates corporate requirements in many states (including California Corporations Code § 5215).",
  },
  {
    id: 'pre_filing_review',
    line: 'Line 11a',
    question: "Was a complete copy of the Form 990 provided to all board directors prior to filing with the IRS?",
    optimal: 'yes',
    guidance: "A director-reviewed Form 990 demonstrates compliance with the Duty of Care. An unreviewed filing increases audit liability.",
  },
  {
    id: 'written_coi',
    line: 'Line 12a',
    question: "Does your organization maintain a written Conflict of Interest (COI) policy?",
    optimal: 'yes',
    guidance: "A written COI policy is critical to establish a Safe Harbor. Charity evaluators penalize organizations lacking a written policy.",
  },
  {
    id: 'annual_disclosure',
    line: 'Line 12b',
    question: "Are all directors and officers required to sign a COI disclosure statement annually?",
    optimal: 'yes',
    guidance: "Annual signed disclosures verify active monitoring of potential transactional conflicts or self-dealing arrangements.",
  },
  {
    id: 'coi_enforcement',
    line: 'Line 12c',
    question: "Does the organization actively monitor and enforce compliance with its Conflict of Interest policy?",
    optimal: 'yes',
    guidance: "Review must include recusing interested parties. Failure to enforce voids statutory self-dealing protections (such as in California).",
  },
  {
    id: 'whistleblower_policy',
    line: 'Line 13',
    question: "Do you have an active, written Whistleblower Protection policy?",
    optimal: 'yes',
    guidance: "Under Sarbanes-Oxley, document destruction and whistleblower retaliation are criminal offenses. Federal law mandates protection, alongside strict state codes (such as California Labor Code § 1102.5).",
  },
  {
    id: 'retention_policy',
    line: 'Line 14',
    question: "Do you have an active, written Document Retention & Destruction policy?",
    optimal: 'yes',
    guidance: "Prevents early destruction of financial documents. Standardizes document shredding protocols, proving non-obstruction of audits.",
  }
];

// The print/export views below are assembled as raw HTML strings and handed to
// `printWindow.document.write`. Any value the user typed must be escaped on the
// way in, or the generated document is at the mercy of its own content.
const escapeHtml = (value: string): string =>
  String(value)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');

export const Tools: React.FC = () => {
  const { navigate } = useRouter();
  const [isResetModalOpen, setIsResetModalOpen] = useState(false);
  const [isScriptSandboxOpen, setIsScriptSandboxOpen] = useState(false);
  const [isCertificateOpen, setIsCertificateOpen] = useState(false);
  const [isPortfolioOpen, setIsPortfolioOpen] = useState(false);
  const [userOrgName, setUserOrganizationName] = useState(() => {
    return safeStorage.getItem('cdx_user_org_name') || 'Our Charitable Board';
  });
  const [isPrintBlocked, setIsPrintBlocked] = useState(false);

  // Every print/export path opens a new window. Browsers block that by default
  // in plenty of managed and mobile setups, and window.open then returns null.
  // Returning quietly meant the button appeared to do nothing at all, with no
  // way for the user to know the browser had intervened.
  const openPrintWindow = (): Window | null => {
    const printWindow = window.open('', '_blank');
    setIsPrintBlocked(!printWindow);
    return printWindow;
  };

  useEffect(() => {
    safeStorage.setItem('cdx_user_org_name', userOrgName);
  }, [userOrgName]);

  const [copySuccess, setCopySuccess] = useState(false);

  // State for Form 990 Review Wizard (Enhancement 9)
  const [isForm990WizardOpen, setIsForm990WizardOpen] = useState(false);
  const [form990ActiveIndex, setForm990ActiveIndex] = useState(0);
  const [form990Answers, setForm990Answers] = useState<Record<string, 'yes' | 'no' | null>>(() => {
    try {
      const saved = safeStorage.getItem('cdx_form_990_answers');
      return saved ? JSON.parse(saved) : {};
    } catch {
      return {};
    }
  });

  const handleAnswerForm990 = (qId: string, value: 'yes' | 'no') => {
    const updated = { ...form990Answers, [qId]: value };
    setForm990Answers(updated);
    safeStorage.setItem('cdx_form_990_answers', JSON.stringify(updated));
  };

  const handleResetForm990 = () => {
    if (window.confirm("Reset all Form 990 answers?")) {
      setForm990Answers({});
      setForm990ActiveIndex(0);
      safeStorage.removeItem('cdx_form_990_answers');
    }
  };

  // Script Sandbox states
  const [selectedScriptId, setSelectedScriptId] = useState('ed-comp');
  
  const [labStates, setLabStates] = useState({
    selfAssessment: { score: null as string | null, level: null as string | null },
    boardPacket: { count: 0 },
    minutesScorecard: { grade: null as string | null, score: null as string | null },
    budgetWorksheet: { count: 0 },
    authorityMap: { score: null as string | null, total: null as string | null, count: 0 },
    scriptBuilder: { completed: false }
  });

  const scriptTemplates: Record<string, ScriptTemplate> = {
    'ed-comp': {
      id: 'ed-comp',
      title: 'Executive Compensation Inquiry',
      problem: 'Mid-year salary bump granted without formal salary study or executive recusal.',
      statute: 'IRC § 4958 / CA Corp Code § 5239',
      statuteTitle: 'IRS Excess Benefit Intermediate Sanctions',
      target: 'Board President & Treasurer',
      questions: [
        {
          question: 'What specific third-party compensation salary surveys or peer studies did the board rely upon before voting to authorize this $35,000 salary increase?',
          rationale: 'Establishes whether the board is eligible for the IRS "Rebuttable Presumption of Reasonableness" safe harbor.',
          targetResponse: '"The Executive Director has done an excellent job, and we know local salaries are rising."',
          counterStrike: 'While performance is appreciated, a verbal belief is legally insufficient. Under IRC § 4958, without documented third-party peer comparisons, the IRS can levy personal 10% tax penalties on individual directors who approved the salary, and 25% on the executive.'
        },
        {
          question: 'Did the Executive Director physically leave the room and completely recuse themselves from both the discussion and the vote to approve this salary adjustment?',
          rationale: 'Required by standard self-dealing safe harbors and IRS conflicts of interest standards.',
          targetResponse: '"The Executive was in the room to answer questions but did not cast a vote."',
          counterStrike: 'Presence during the debate destroys the recusal safe harbor. Standard fiduciary practice, and California law (Corp Code § 5213), requires complete absence during deliberations to prevent undue influence. The minutes must show they left the room prior to any executive payroll discussion.'
        }
      ]
    },
    'self-dealing': {
      id: 'self-dealing',
      title: 'Spousal Vendor Conflict',
      problem: 'A $15,000 web contract awarded to the Executive Director\'s spouse without bids.',
      statute: 'CA Corp Code § 5233 / Bylaws § 7',
      statuteTitle: 'Statutory Self-Dealing Prohibition (California Corp Code § 5233)',
      target: 'Executive Director & Board Secretary',
      questions: [
        {
          question: 'Since this marketing contract was awarded to your spouse\'s LLC, did the board obtain and evaluate at least two other competitive independent bids before signing?',
          rationale: 'Fulfills the duty to prove the organization could not secure a more advantageous arrangement with reasonable effort.',
          targetResponse: '"They gave us a spousal discount, so they were obviously the cheapest and best option."',
          counterStrike: 'An untested spousal discount is not a legal substitute for independent bids. Under standard self-dealing rules (including CA Corp Code § 5233), any transaction with a spousal entity is a "self-dealing transaction" and is voidable by the Attorney General unless disinterested directors prove they vetted other market options beforehand.'
        },
        {
          question: 'Was this transaction formally disclosed, debated, and approved by a vote of the disinterested directors *prior* to executing the contract?',
          rationale: 'Ensures the contract was approved in good faith by disinterested members.',
          targetResponse: '"The Executive Director signed it under their general operational spending authority, and the board reviewed it later."',
          counterStrike: 'A conflicted contract cannot be authorized retroactively by the executive alone. Self-dealing safe harbor rules require explicit advance board approval by disinterested directors. If signed without advance board action, individual directors may face personal restitution demands from state AG regulators.'
        }
      ]
    },
    'payroll-taxes': {
      id: 'payroll-taxes',
      title: 'Deferred Payroll Tax Exposures',
      problem: 'Withholding taxes unpaid to conserve cash, creating direct joint-and-several director liability.',
      statute: 'IRC § 6672 / State UI Code',
      statuteTitle: '100% Trust Fund Recovery Penalty',
      target: 'CFO, Treasurer, or Executive Director',
      questions: [
        {
          question: 'Can the Finance Department provide the board with direct, electronic EFTPS receipts verifying that employee federal and state withholding taxes have been deposited on schedule?',
          rationale: 'Active verification is a non-delegable duty when personal joint-and-several financial penalties are active.',
          targetResponse: '"We are managing cash flow carefully, and payroll is being processed normally."',
          counterStrike: 'Processing net wages while deferring withholding tax deposits is a federal crime. Under IRC § 6672, the corporate veil is completely dissolved. The IRS can assess a 100% personal penalty directly against individual board members, even if they are volunteer directors, for "willful failure" to deposit trust fund taxes.'
        },
        {
          question: 'Have we prioritized payments to landlords, utility companies, or general trade vendors while our payroll tax deposits are delayed?',
          rationale: 'Demonstrates legal "willfulness" under federal tax audits.',
          targetResponse: '"We had to pay the rent and utilities to keep our office doors open and continue our mission."',
          counterStrike: 'Prioritizing any vendor over the US Treasury establishes "willful failure" under tax law. Volunteer directors can be held personally and jointly liable for the entire outstanding balance if they knowingly permit any other operating cost to be paid while payroll taxes remain unpaid.'
        }
      ]
    },
    'restricted-funds': {
      id: 'restricted-funds',
      title: 'Donor-Restricted Fund Diversion',
      problem: '$65,000 in donor-restricted scholarship funds spent on administrative overhead.',
      statute: 'CA Gov Code § 12580 / UPMIFA',
      statuteTitle: 'Charitable Trust Doctrine',
      target: 'Executive Director & Treasurer',
      questions: [
        {
          question: 'Did we secure explicit written donor consent or a state court order before utilizing these restricted scholarship funds to cover administrative payroll?',
          rationale: 'Donor restrictions are legally binding trusts under standard Charitable Trust Doctrines (including California\'s).',
          targetResponse: '"It was a temporary loan to cover payroll during a cash gap; we will reimburse the account once funding arrives."',
          counterStrike: 'Hardship does not authorize a loan from restricted trust funds. Diverting restricted assets for general overhead is a breach of trust under standard Charitable Trust Doctrines. State Attorneys General actively prosecute board members for restricted fund diversion, demanding personal restitution of the diverted funds.'
        }
      ]
    }
  };

  const loadLabStates = () => {
    // 1. Self assessment
    const selfScore = safeStorage.getItem('cdx_self_assessment_score');
    const selfLevel = safeStorage.getItem('cdx_self_assessment_level');

    // 2. Board packet
    let packetCount = 0;
    try {
      const packetSaved = safeStorage.getItem('cdx_board_packet_uncovered_flags');
      if (packetSaved) {
        packetCount = JSON.parse(packetSaved).length || 0;
      }
    } catch {
      // Storage unavailable or malformed; keep the existing value.
    }

    // 3. Minutes scorecard
    const minutesGrade = safeStorage.getItem('cdx_minutes_scorecard_grade');
    const minutesScore = safeStorage.getItem('cdx_minutes_scorecard_score');

    // 4. Budget worksheet
    let budgetCount = 0;
    try {
      const budgetSaved = safeStorage.getItem('cdx_budget_audited_lines');
      if (budgetSaved) {
        budgetCount = JSON.parse(budgetSaved).length || 0;
      }
    } catch {
      // Storage unavailable or malformed; keep the existing value.
    }

    // 5. Authority map
    const authScore = safeStorage.getItem('cdx_authority_map_score');
    const authTotal = safeStorage.getItem('cdx_authority_map_total');
    let authCount = 0;
    try {
      const authSaved = safeStorage.getItem('cdx_authority_map_assignments');
      if (authSaved) {
        authCount = Object.keys(JSON.parse(authSaved)).length || 0;
      }
    } catch {
      // Storage unavailable or malformed; keep the existing value.
    }

    // 6. Script Builder
    const scriptCompleted = safeStorage.getItem('cdx_script_builder_completed') === 'true';

    setLabStates({
      selfAssessment: { score: selfScore, level: selfLevel },
      boardPacket: { count: packetCount },
      minutesScorecard: { grade: minutesGrade, score: minutesScore },
      budgetWorksheet: { count: budgetCount },
      authorityMap: { score: authScore, total: authTotal, count: authCount },
      scriptBuilder: { completed: scriptCompleted }
    });
  };

  useEffect(() => {
    loadLabStates();
  }, []);

  const handleResetAll = () => {
    const keysToRemove = [
      'cdx_self_assessment_score',
      'cdx_self_assessment_level',
      'cdx_board_packet_uncovered_flags',
      'cdx_minutes_scorecard_grade',
      'cdx_minutes_scorecard_score',
      'cdx_budget_audited_lines',
      'cdx_authority_map_assignments',
      'cdx_authority_map_score',
      'cdx_authority_map_total',
      'cdx_cal_rules_checked_ids',
      'cdx_next_meeting_checked_files',
      'board_mastery_progress',
      'webinar_registrations',
      'inperson_inquiries',
      'cdx_script_builder_completed',
      'cdx_form_990_answers'
    ];
    keysToRemove.forEach(k => safeStorage.removeItem(k));
    
    safeStorage
      .keys()
      .filter((key) => key.startsWith('cdx_feedback_status_'))
      .forEach((key) => safeStorage.removeItem(key));

    setLabStates({
      selfAssessment: { score: null, level: null },
      boardPacket: { count: 0 },
      minutesScorecard: { grade: null, score: null },
      budgetWorksheet: { count: 0 },
      authorityMap: { score: null, total: null, count: 0 },
      scriptBuilder: { completed: false }
    });
    setForm990Answers({});
    setForm990ActiveIndex(0);
    
    setIsResetModalOpen(false);
  };

  // Completed Labs count out of 7
  const getCompletedLabsCount = () => {
    let completed = 0;
    if (labStates.selfAssessment.score) completed++;
    if (labStates.boardPacket.count === 9) completed++;
    if (labStates.minutesScorecard.grade) completed++;
    if (labStates.budgetWorksheet.count === 6) completed++;
    if (labStates.authorityMap.score && labStates.authorityMap.score === labStates.authorityMap.total) completed++;
    if (labStates.scriptBuilder.completed) completed++;
    const form990AnsweredCount = Object.keys(form990Answers).filter(k => form990Answers[k] !== undefined && form990Answers[k] !== null).length;
    if (form990AnsweredCount === 12) completed++;
    return completed;
  };

  const completedCount = getCompletedLabsCount();
  const isMasteryUnlocked = completedCount >= 3;

  const handleCompleteScriptSandbox = () => {
    safeStorage.setItem('cdx_script_builder_completed', 'true');
    loadLabStates();
    setIsScriptSandboxOpen(false);
  };

  const handleCopyScript = () => {
    const script = scriptTemplates[selectedScriptId];
    if (!script) return;

    let text = `FIDUCIARY BOARDROOM SCRIPT: ${script.title.toUpperCase()}\n`;
    text += `GOVERNANCE CHALLENGE: ${script.problem}\n`;
    text += `RELEVANT LAW: ${script.statute} (${script.statuteTitle})\n`;
    text += `TARGET FOR INQUIRY: ${script.target}\n\n`;
    
    script.questions.forEach((q, idx) => {
      text += `QUESTION ${idx + 1}: "${q.question}"\n`;
      text += `RATIONALE: ${q.rationale}\n`;
      text += `EXPECTED EVASIVE ANSWER: ${q.targetResponse}\n`;
      text += `ATTORNEY ACTION PLAN: ${q.counterStrike}\n\n`;
    });

    text += `CONFIDENTIAL LEGAL NOTE: Drafted in connection with California Center for Nonprofit Law (NPOlawyers.com). Privileged for internal board review only.`;

    navigator.clipboard.writeText(text);
    setCopySuccess(true);
    setTimeout(() => setCopySuccess(false), 2000);
  };

  const handleDownloadScript = () => {
    const script = scriptTemplates[selectedScriptId];
    if (!script) return;

    let text = `FIDUCIARY BOARDROOM SCRIPT: ${script.title.toUpperCase()}\n`;
    text += `GOVERNANCE CHALLENGE: ${script.problem}\n`;
    text += `RELEVANT LAW: ${script.statute} (${script.statuteTitle})\n`;
    text += `TARGET FOR INQUIRY: ${script.target}\n\n`;
    
    script.questions.forEach((q, idx) => {
      text += `QUESTION ${idx + 1}: "${q.question}"\n`;
      text += `RATIONALE: ${q.rationale}\n`;
      text += `EXPECTED EVASIVE ANSWER: ${q.targetResponse}\n`;
      text += `ATTORNEY ACTION PLAN: ${q.counterStrike}\n\n`;
    });

    text += `CONFIDENTIAL LEGAL NOTE: Drafted in connection with California Center for Nonprofit Law (NPOlawyers.com). Privileged for internal board review only.`;

    const blob = new Blob([text], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `board_inquiry_script_${selectedScriptId}.txt`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  const handlePrintScript = () => {
    const printWindow = openPrintWindow();
    if (!printWindow) return;
    const script = scriptTemplates[selectedScriptId];

    let html = `
      <html>
        <head>
          <title>${script.title}</title>
          <style>
            body { font-family: 'Times New Roman', serif; padding: 40px; color: #1a1a1a; line-height: 1.5; }
            h1 { font-size: 24px; text-transform: uppercase; border-bottom: 2px solid #800020; padding-bottom: 5px; }
            .meta { font-size: 14px; margin-bottom: 30px; font-style: italic; }
            .q-block { margin-bottom: 25px; border-left: 3px solid #800020; padding-left: 15px; }
            .q-title { font-weight: bold; font-size: 16px; margin-bottom: 5px; }
            .q-desc { font-size: 13px; color: #444; margin-bottom: 10px; }
            .expected { font-weight: bold; font-size: 13px; color: #555; margin-bottom: 5px; }
            .counter { font-size: 14px; margin-bottom: 10px; }
            .footer { font-size: 12px; color: #777; margin-top: 50px; border-t: 1px solid #ccc; padding-top: 10px; text-align: center; }
          </style>
        </head>
        <body>
          <h1>Boardroom Cross-Examination Guide: ${script.title}</h1>
          <div class="meta">
            <strong>Target Officer:</strong> ${script.target}<br/>
            <strong>Governance Concern:</strong> ${script.problem}<br/>
            <strong>Statutory Reference:</strong> ${script.statute} (${script.statuteTitle})
          </div>
    `;

    script.questions.forEach((q, idx) => {
      html += `
        <div class="q-block">
          <div class="q-title">QUESTION ${idx + 1}: ${q.question}</div>
          <div class="q-desc"><strong>LEGAL PURPOSE:</strong> ${q.rationale}</div>
          <div class="expected">EXPECTED EVASIVE ANSWER: ${q.targetResponse}</div>
          <div class="counter"><strong>ATTORNEY RECOMMENDATION:</strong> ${q.counterStrike}</div>
        </div>
      `;
    });

    html += `
          <div class="footer">
            CONFIDENTIAL BOARD REVIEW STUDY GUIDE &bull; CALIFORNIA CENTER FOR NONPROFIT LAW &bull; NPOLAWYERS.COM
          </div>
        </body>
      </html>
    `;

    printWindow.document.write(html);
    printWindow.document.close();
    printWindow.print();
  };

  const handlePrintCertificate = () => {
    const printWindow = openPrintWindow();
    if (!printWindow) return;

    const html = `
      <html>
        <head>
          <title>Fiduciary Governance Certificate</title>
          <style>
            @media print {
              body { -webkit-print-color-adjust: exact; print-color-adjust: exact; }
            }
            body { 
              font-family: 'Georgia', serif; 
              padding: 50px; 
              background-color: #fcfbf7; 
              display: flex; 
              justify-content: center; 
              align-items: center; 
              height: 100vh;
              box-sizing: border-box;
            }
            .border-double { 
              border: 15px double #8b6c4c; 
              padding: 40px; 
              max-width: 800px; 
              width: 100%; 
              text-align: center; 
              position: relative; 
              background: #fff;
              box-shadow: 0 0 20px rgba(0,0,0,0.05);
            }
            .header { font-size: 16px; font-weight: bold; color: #a47e3c; letter-spacing: 4px; text-transform: uppercase; margin-bottom: 20px; }
            .title { font-size: 38px; font-family: 'Times New Roman', serif; font-weight: bold; color: #1e293b; margin-bottom: 10px; }
            .subtitle { font-size: 14px; font-style: italic; color: #64748b; margin-bottom: 40px; }
            .recipient { font-size: 28px; font-weight: bold; border-bottom: 2px solid #8b6c4c; display: inline-block; padding: 5px 30px; margin-bottom: 30px; color: #0f172a; }
            .prose { font-size: 15px; color: #475569; max-width: 600px; margin: 0 auto 50px; line-height: 1.8; }
            .footer-grid { display: flex; justify-content: space-between; align-items: flex-end; padding: 0 40px; }
            .signature-block { width: 220px; text-align: center; font-size: 12px; color: #64748b; }
            .line { border-top: 1px solid #8b6c4c; margin-bottom: 5px; }
            .sig-name { font-weight: bold; color: #1f2937; font-family: 'Georgia', serif; font-style: italic; }
            .seal { 
              width: 100px; 
              height: 100px; 
              border-radius: 50%; 
              background: radial-gradient(#d4af37, #aa7c11); 
              border: 4px double #ffffff; 
              box-shadow: 0 4px 10px rgba(0,0,0,0.15); 
              display: flex; 
              align-items: center; 
              justify-content: center;
              font-size: 10px; 
              font-weight: bold; 
              color: #ffffff; 
              text-shadow: 0 1px 2px rgba(0,0,0,0.5); 
              text-align: center;
              line-height: 1.2;
              transform: rotate(-10deg);
            }
          </style>
        </head>
        <body>
          <div class="border-double">
            <div class="header">National Boardroom Initiative</div>
            <div class="title">Certificate of Fiduciary Mastery</div>
            <div class="subtitle">Awarded for Educational Excellence in Charity Law</div>
            
            <div class="recipient">${escapeHtml(userOrgName)}</div>
            
            <div class="prose">
              This certificate verifies that the governing directors have successfully undertaken and completed the clinical boardroom audit laboratories of the National Board Training Initiative, confirming their competency in independent oversight quorums, executive compensation reviews, conflict of interest mitigation, and restricted asset stewardship under applicable state and federal legal standards.
            </div>
            
            <div class="footer-grid">
              <div class="signature-block">
                <div class="sig-name" style="font-size: 14px; margin-bottom: 4px;">Myron Steeves, J.D.</div>
                <div class="line"></div>
                <div>Dean, National Boardroom Initiative (California Chapter)</div>
                <div style="font-size: 10px;">California Center for Nonprofit Law</div>
              </div>
              
              <div class="seal">
                FIDUCIARY<br/>COMPLIANT<br/>2026
              </div>
            </div>
          </div>
        </body>
      </html>
    `;

    printWindow.document.write(html);
    printWindow.document.close();
    printWindow.print();
  };

  const handlePrintPortfolio = () => {
    const printWindow = openPrintWindow();
    if (!printWindow) return;

    const todayStr = new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });

    // Determine state for each lab
    const selfAssessmentCompleted = !!labStates.selfAssessment.score;
    const selfAssessmentText = selfAssessmentCompleted
      ? `Score: ${labStates.selfAssessment.score}/50 (${labStates.selfAssessment.level || ''})`
      : "Complete the diagnostic to verify board quorums and structural quorums.";

    const boardPacketCompleted = labStates.boardPacket.count === 9;
    const boardPacketText = boardPacketCompleted
      ? "9 of 9 hidden red-flag vulnerabilities successfully scanned."
      : labStates.boardPacket.count > 0 
        ? `${labStates.boardPacket.count} of 9 red-flag vulnerabilities scanned (Partially Completed).`
        : "Scan packet documents for hidden compliance vulnerabilities.";

    const minutesCompleted = !!labStates.minutesScorecard.grade;
    const minutesText = minutesCompleted
      ? `Grade: ${labStates.minutesScorecard.grade} (${labStates.minutesScorecard.score})`
      : "Score draft meeting minutes to verify legal discoverability.";

    const budgetCompleted = labStates.budgetWorksheet.count === 6;
    const budgetText = budgetCompleted
      ? "6 of 6 budget ledger variances scanned."
      : labStates.budgetWorksheet.count > 0
        ? `${labStates.budgetWorksheet.count} of 6 budget ledger variances scanned (Partially Completed).`
        : "Scrutinize ledger variances for tax and self-dealing exposures.";

    const authorityCompleted = !!(labStates.authorityMap.score && labStates.authorityMap.score === labStates.authorityMap.total);
    const authorityText = authorityCompleted
      ? "12 of 12 corporate actions correctly mapped."
      : labStates.authorityMap.score 
        ? `Map score: ${labStates.authorityMap.score} of ${labStates.authorityMap.total} correctly mapped (Partially Completed).`
        : "Assign corporate actions to proper statutory approval slots.";

    const scriptCompleted = labStates.scriptBuilder.completed;
    const scriptText = scriptCompleted
      ? "Custom courtroom-grade inquiry guide compiled in sandbox."
      : "Compile and test a courtroom-grade inquiry script.";

    const form990AnsweredCount = Object.keys(form990Answers).filter(k => form990Answers[k] !== undefined && form990Answers[k] !== null).length;
    const form990Completed = form990AnsweredCount === 12;
    const form990Text = form990Completed
      ? `12 of 12 responses completed. Optimal alignment: ${Object.keys(form990Answers).filter(k => form990Answers[k] === 'yes').length} of 12.`
      : "Complete the 12-question Part VI checklist.";

    const html = `
      <html>
        <head>
          <title>Fiduciary Diligence Portfolio - ${escapeHtml(userOrgName)}</title>
          <style>
            @media print {
              body { -webkit-print-color-adjust: exact; print-color-adjust: exact; background-color: #ffffff; }
              .no-print { display: none; }
            }
            body { 
              font-family: 'Georgia', serif; 
              padding: 40px; 
              background-color: #fcfbf7; 
              color: #1e293b;
              box-sizing: border-box;
              line-height: 1.6;
            }
            .border-double { 
              border: 8px double #800020; 
              padding: 40px; 
              max-width: 900px; 
              margin: 0 auto;
              background: #fff;
              box-shadow: 0 0 20px rgba(0,0,0,0.05);
            }
            .header { text-align: center; margin-bottom: 30px; border-bottom: 2px solid #8b6c4c; padding-bottom: 20px; }
            .header-initiative { font-size: 14px; font-weight: bold; color: #a47e3c; letter-spacing: 3px; text-transform: uppercase; margin-bottom: 8px; font-family: sans-serif; }
            .header-title { font-size: 30px; font-family: 'Times New Roman', serif; font-weight: bold; color: #800020; margin-bottom: 10px; text-transform: uppercase; }
            .header-subtitle { font-size: 13px; font-style: italic; color: #64748b; }
            
            .metadata-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 20px; margin-bottom: 30px; font-size: 13px; font-family: sans-serif; background: #fafaf9; padding: 15px; border: 1px solid #e7e5e4; }
            .metadata-item strong { color: #1e293b; }
            
            .dossier-intro { font-size: 14px; margin-bottom: 30px; line-height: 1.7; text-align: justify; }
            
            table { width: 100%; border-collapse: collapse; margin-bottom: 30px; font-size: 13px; font-family: sans-serif; }
            th, td { padding: 12px 15px; text-align: left; border-bottom: 1px solid #e7e5e4; }
            th { background-color: #f8fafc; color: #1e293b; font-weight: bold; border-bottom: 2px solid #cbd5e1; text-transform: uppercase; font-size: 11px; letter-spacing: 1px; }
            
            .badge { display: inline-block; padding: 4px 8px; border-radius: 4px; font-size: 10px; font-weight: bold; text-transform: uppercase; letter-spacing: 0.5px; }
            .badge-success { background-color: #ecfdf5; color: #065f46; border: 1px solid #a7f3d0; }
            .badge-pending { background-color: #fef3c7; color: #78350f; border: 1px solid #fde68a; }
            
            .disclaimer-box { background-color: #f8fafc; border-left: 4px solid #64748b; padding: 15px; margin-bottom: 30px; font-size: 12px; font-style: italic; color: #475569; }
            
            .firm-outreach-box { border: 2px solid #8b6c4c; background-color: #fafaf9; padding: 20px; margin-bottom: 35px; border-radius: 4px; text-align: center; }
            .firm-title { font-family: 'Times New Roman', serif; font-size: 20px; font-weight: bold; color: #800020; margin-bottom: 5px; }
            .firm-subtitle { font-size: 12px; color: #a47e3c; font-weight: bold; text-transform: uppercase; letter-spacing: 1.5px; margin-bottom: 10px; font-family: sans-serif; }
            .firm-text { font-size: 12px; color: #475569; line-height: 1.6; margin-bottom: 15px; }
            .firm-link { font-family: sans-serif; font-size: 12px; font-weight: bold; color: #800020; text-decoration: none; border-bottom: 1px solid #800020; }
            
            .footer-grid { display: flex; justify-content: space-between; align-items: flex-end; margin-top: 40px; }
            .signature-block { width: 250px; text-align: center; font-size: 11px; color: #64748b; font-family: sans-serif; }
            .line { border-top: 1px solid #8b6c4c; margin-bottom: 6px; }
            .sig-name { font-weight: bold; color: #1e293b; font-family: 'Georgia', serif; font-style: italic; font-size: 13px; height: 18px; }
          </style>
        </head>
        <body>
          <div class="border-double">
            <div class="header">
              <div class="header-initiative">National Boardroom Initiative</div>
              <div class="header-title">Fiduciary Diligence Portfolio</div>
              <div class="header-subtitle">Consolidated Board Self-Audit Compliance Dossier</div>
            </div>
            
            <div class="metadata-grid">
              <div class="metadata-item">
                <strong>Organization Entity:</strong> ${escapeHtml(userOrgName)}<br/>
                <strong>Compilation Date:</strong> ${todayStr}
              </div>
              <div class="metadata-item">
                <strong>Registry Jurisdiction:</strong> State & Federal<br/>
                <strong>Audit Standard:</strong> Applicable State Code & IRS Guidelines
              </div>
            </div>
            
            <div class="dossier-intro">
              This dossier compiles the diagnostic metrics and verification states from the National Boardroom Initiative laboratories. 
              The governance checklists contained herein are designed to align boardroom oversight with fiduciary statutory duties, ensuring proper diligence is exercised regarding conflicts of interest, executive payroll, asset restrictions, and minute keeping.
            </div>
            
            <table>
              <thead>
                <tr>
                  <th style="width: 35%;">Governance Laboratory</th>
                  <th style="width: 25%;">Statutory Standard</th>
                  <th style="width: 15%;">Audit Status</th>
                  <th style="width: 25%;">Audit Details / Score</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td><strong>1. Mature Board Self-Assessment</strong></td>
                  <td>CA Corp Code § 5231</td>
                  <td>
                    <span class="badge ${selfAssessmentCompleted ? 'badge-success' : 'badge-pending'}">
                      ${selfAssessmentCompleted ? '✓ CERTIFIED' : '⏳ PENDING'}
                    </span>
                  </td>
                  <td>${selfAssessmentText}</td>
                </tr>
                <tr>
                  <td><strong>2. Board Packet Audit Lab</strong></td>
                  <td>CA Corp Code § 5227 / IRC § 4958</td>
                  <td>
                    <span class="badge ${boardPacketCompleted ? 'badge-success' : 'badge-pending'}">
                      ${boardPacketCompleted ? '✓ CERTIFIED' : '⏳ PENDING'}
                    </span>
                  </td>
                  <td>${boardPacketText}</td>
                </tr>
                <tr>
                  <td><strong>3. Minutes Quality Scorecard</strong></td>
                  <td>CA Corp Code § 5215</td>
                  <td>
                    <span class="badge ${minutesCompleted ? 'badge-success' : 'badge-pending'}">
                      ${minutesCompleted ? '✓ CERTIFIED' : '⏳ PENDING'}
                    </span>
                  </td>
                  <td>${minutesText}</td>
                </tr>
                <tr>
                  <td><strong>4. Budget Deviation Worksheet</strong></td>
                  <td>CA Corp Code § 5231 / IRC § 6672</td>
                  <td>
                    <span class="badge ${budgetCompleted ? 'badge-success' : 'badge-pending'}">
                      ${budgetCompleted ? '✓ CERTIFIED' : '⏳ PENDING'}
                    </span>
                  </td>
                  <td>${budgetText}</td>
                </tr>
                <tr>
                  <td><strong>5. Board Authority Delegation Map</strong></td>
                  <td>CA Corp Code § 5212 / § 5210</td>
                  <td>
                    <span class="badge ${authorityCompleted ? 'badge-success' : 'badge-pending'}">
                      ${authorityCompleted ? '✓ CERTIFIED' : '⏳ PENDING'}
                    </span>
                  </td>
                  <td>${authorityText}</td>
                </tr>
                <tr>
                  <td><strong>6. Boardroom Script Constructor</strong></td>
                  <td>IRC § 4958 / CA Corp Code § 5233</td>
                  <td>
                    <span class="badge ${scriptCompleted ? 'badge-success' : 'badge-pending'}">
                      ${scriptCompleted ? '✓ CERTIFIED' : '⏳ PENDING'}
                    </span>
                  </td>
                  <td>${scriptText}</td>
                </tr>
                <tr>
                  <td><strong>7. IRS Form 990 Review Wizard</strong></td>
                  <td>IRS Form 990 Part VI</td>
                  <td>
                    <span class="badge ${form990Completed ? 'badge-success' : 'badge-pending'}">
                      ${form990Completed ? '✓ CERTIFIED' : '⏳ PENDING'}
                    </span>
                  </td>
                  <td>${form990Text}</td>
                </tr>
              </tbody>
            </table>
            
            <div class="disclaimer-box">
              <strong>EDUCATIONAL INFORMATION DISCLAIMER:</strong> This portfolio is compiled based on diagnostic labs completed by board representatives. 
              The information is structured for general educational and training purposes only. It does not constitute formal legal advice, does not establish 
              an attorney-client relationship, and should not be relied upon as a substitute for professional legal review of specific governance disputes.
            </div>
            
            <div class="firm-outreach-box">
              <div class="firm-title">California Center for Nonprofit Law</div>
              <div class="firm-subtitle">Independent Governance & Bylaws Audits</div>
              <div class="firm-text">
                For formal corporate bylaws reviews, executive compensation safe harbor reviews, conflict of interest evaluations, or statutory dispute resolution under California law, please contact Myron Steeves, J.D., founder of the California Center for Nonprofit Law / NPO Lawyers.
              </div>
              <a href="https://NPOlawyers.com" target="_blank" rel="noopener noreferrer" class="firm-link">Visit NPOlawyers.com &rarr;</a>
            </div>
            
            <div class="footer-grid">
              <div class="signature-block">
                <div class="sig-name"></div>
                <div class="line"></div>
                <div>Board President Signature</div>
                <div style="font-size: 9px; color: #94a3b8; margin-top: 2px;">${escapeHtml(userOrgName)}</div>
              </div>
              
              <div class="signature-block">
                <div class="sig-name"></div>
                <div class="line"></div>
                <div>Board Secretary Signature</div>
                <div style="font-size: 9px; color: #94a3b8; margin-top: 2px;">${escapeHtml(userOrgName)}</div>
              </div>
              
              <div class="signature-block">
                <div class="sig-name" style="font-style: normal; font-family: sans-serif; font-size: 12px; padding-top: 4px;">${todayStr}</div>
                <div class="line"></div>
                <div>Compilation Date</div>
              </div>
            </div>
          </div>
        </body>
      </html>
    `;

    printWindow.document.write(html);
    printWindow.document.close();
    printWindow.print();
  };

  const renderBadge = (id: string) => {
    switch (id) {
      case 'self-assessment': {
        const { score, level } = labStates.selfAssessment;
        if (score) {
          return (
            <span className="inline-flex items-center gap-1 px-2.5 py-0.5 bg-brass/10 border border-brass/30 text-brass rounded-full text-[10px] font-bold uppercase tracking-wider">
              Score: {score}/50 ({level})
            </span>
          );
        }
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 bg-slate-100 border border-slate-300 text-slate-500 rounded-full text-[10px] font-bold uppercase tracking-wider">
            Not Assessed
          </span>
        );
      }
      case 'board-packet-lab': {
        const { count } = labStates.boardPacket;
        if (count === 9) {
          return (
            <span className="inline-flex items-center gap-1 px-2.5 py-0.5 bg-emerald-50 border border-emerald-300 text-emerald-700 rounded-full text-[10px] font-bold uppercase tracking-wider">
              ✓ Completed
            </span>
          );
        } else if (count > 0) {
          return (
            <span className="inline-flex items-center gap-1 px-2.5 py-0.5 bg-amber-50 border border-amber-300 text-amber-700 rounded-full text-[10px] font-bold uppercase tracking-wider">
              Progress: {count}/9 Red Flags
            </span>
          );
        }
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 bg-slate-100 border border-slate-300 text-slate-500 rounded-full text-[10px] font-bold uppercase tracking-wider">
            Not Started
          </span>
        );
      }
      case 'minutes-scorecard': {
        const { grade, score } = labStates.minutesScorecard;
        if (grade) {
          let badgeColor = "bg-rose-50 border-rose-300 text-rose-700";
          if (grade === 'A') badgeColor = "bg-teal-brand/10 border-teal-brand/30 text-teal-brand";
          else if (grade === 'B') badgeColor = "bg-emerald-50 border-emerald-300 text-emerald-700";
          else if (grade === 'C') badgeColor = "bg-brass/10 border-brass/30 text-brass";
          else if (grade === 'D') badgeColor = "bg-copper/10 border-copper/30 text-copper";
          
          return (
            <span className={`inline-flex items-center gap-1 px-2.5 py-0.5 border rounded-full text-[10px] font-bold uppercase tracking-wider ${badgeColor}`}>
              Grade: {grade} ({score}/8 Checks)
            </span>
          );
        }
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 bg-slate-100 border border-slate-300 text-slate-500 rounded-full text-[10px] font-bold uppercase tracking-wider">
            Ungraded
          </span>
        );
      }
      case 'budget-worksheet': {
        const { count } = labStates.budgetWorksheet;
        if (count === 6) {
          return (
            <span className="inline-flex items-center gap-1 px-2.5 py-0.5 bg-emerald-50 border border-emerald-300 text-emerald-700 rounded-full text-[10px] font-bold uppercase tracking-wider">
              ✓ Audit Complete
            </span>
          );
        } else if (count > 0) {
          return (
            <span className="inline-flex items-center gap-1 px-2.5 py-0.5 bg-amber-50 border border-amber-300 text-amber-700 rounded-full text-[10px] font-bold uppercase tracking-wider">
              Progress: {count}/6 Checked
            </span>
          );
        }
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 bg-slate-100 border border-slate-300 text-slate-500 rounded-full text-[10px] font-bold uppercase tracking-wider">
            Not Scanned
          </span>
        );
      }
      case 'authority-map': {
        const { score, total, count } = labStates.authorityMap;
        if (score) {
          const scoreNum = parseInt(score);
          const badgeColor = scoreNum >= 10 
            ? "bg-teal-brand/10 border-teal-brand/30 text-teal-brand"
            : scoreNum >= 7 
              ? "bg-emerald-50 border-emerald-300 text-emerald-700"
              : "bg-amber-50 border-amber-300 text-amber-700";
          return (
            <span className={`inline-flex items-center gap-1 px-2.5 py-0.5 border rounded-full text-[10px] font-bold uppercase tracking-wider ${badgeColor}`}>
              Score: {score}/{total} Correct
            </span>
          );
        } else if (count > 0) {
          return (
            <span className="inline-flex items-center gap-1 px-2.5 py-0.5 bg-blue-50 border border-blue-200 text-blue-700 rounded-full text-[10px] font-bold uppercase tracking-wider">
              Progress: {count}/12 Sorted
            </span>
          );
        }
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 bg-slate-100 border border-slate-300 text-slate-500 rounded-full text-[10px] font-bold uppercase tracking-wider">
            Not Sorted
          </span>
        );
      }
      case 'script-builder': {
        if (labStates.scriptBuilder.completed) {
          return (
            <span className="inline-flex items-center gap-1 px-2.5 py-0.5 bg-emerald-50 border border-emerald-300 text-emerald-700 rounded-full text-[10px] font-bold uppercase tracking-wider">
              ✓ Compliant Script Built
            </span>
          );
        }
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 bg-slate-100 border border-slate-300 text-slate-500 rounded-full text-[10px] font-bold uppercase tracking-wider">
            Not Sandbox-Tested
          </span>
        );
      }
      case 'form-990-wizard': {
        const answeredCount = Object.keys(form990Answers).filter(k => form990Answers[k] !== undefined && form990Answers[k] !== null).length;
        if (answeredCount === 12) {
          return (
            <span className="inline-flex items-center gap-1 px-2.5 py-0.5 bg-emerald-50 border border-emerald-300 text-emerald-700 rounded-full text-[10px] font-bold uppercase tracking-wider">
              ✓ Wizard Complete
            </span>
          );
        } else if (answeredCount > 0) {
          return (
            <span className="inline-flex items-center gap-1 px-2.5 py-0.5 bg-amber-50 border border-amber-300 text-amber-700 rounded-full text-[10px] font-bold uppercase tracking-wider">
              Answers: {answeredCount}/12
            </span>
          );
        }
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 bg-slate-100 border border-slate-300 text-slate-500 rounded-full text-[10px] font-bold uppercase tracking-wider">
            Not Started
          </span>
        );
      }
      default:
        return null;
    }
  };

  const toolItems = [
    {
      id: 'self-assessment',
      title: "Mature Board Self-Assessment",
      path: 'tools/self-assessment',
      icon: <Award className="w-6 h-6" />,
      themeColor: 'border-t-brass hover:border-brass text-brass bg-brass/10',
      description: "A 10-question dynamic diagnostic evaluating your board size, independent quorums, meeting prep, and insurance posture against state AG standards.",
      cta: "Start Assessment"
    },
    {
      id: 'board-packet-lab',
      title: "The Board Packet Audit Lab",
      path: 'tools/board-packet-lab',
      icon: <FileText className="w-6 h-6" />,
      themeColor: 'border-t-slate-brand hover:border-slate-brand text-slate-brand bg-slate-brand/10',
      description: "Inspect an interactive 5-page board packet (Agenda, CEO Report, Statement of Activities, Ledger, Audit report) to scan for hidden governance red flags.",
      cta: "Open Packet Lab"
    },
    {
      id: 'minutes-scorecard',
      title: "Minutes Quality Scorecard",
      path: 'tools/minutes-scorecard',
      icon: <ShieldCheck className="w-6 h-6" />,
      themeColor: 'border-t-teal-brand hover:border-teal-brand text-teal-brand bg-teal-brand/10',
      description: "Input meeting drafts or use our default corporate mock minutes to receive a formal Grade (A-F) based on legal discoverability standards.",
      cta: "Run Scorecard"
    },
    {
      id: 'budget-worksheet',
      title: "Budget Deviation Worksheet",
      path: 'tools/budget-worksheet',
      icon: <Scale className="w-6 h-6" />,
      themeColor: 'border-t-copper hover:border-copper text-copper bg-copper/10',
      description: "Analyze a mock operating budget ledger, clicking on ledger line deviations to uncover auditor commentaries regarding non-withholding tax or self-dealing.",
      cta: "Scan Budget"
    },
    {
      id: 'authority-map',
      title: "Board Authority Delegation Map",
      path: 'tools/authority-map',
      icon: <Landmark className="w-6 h-6" />,
      themeColor: 'border-t-burgundy hover:border-burgundy text-burgundy bg-burgundy/10',
      description: "An organizational delegation laboratory. Sort corporate actions (e.g. signing a $35k lease, firing an employee, changing bylaws) into proper approval slots.",
      cta: "Sort Authority"
    },
    {
      id: 'script-builder',
      title: "Boardroom Script Constructor",
      path: 'script-builder',
      icon: <FileQuestion className="w-6 h-6" />,
      themeColor: 'border-t-burgundy hover:border-burgundy text-burgundy bg-burgundy/10',
      description: "Interactive cross-examination script compiler. Choose a governance failure and an officer target to build compliant, legally rigorous scripts for board inquiries.",
      cta: "Build Script"
    },
    {
      id: 'form-990-wizard',
      title: "IRS Form 990 Review Wizard",
      path: '', // Handled via modal trigger
      icon: <CheckSquare className="w-6 h-6" />,
      themeColor: 'border-t-teal-brand hover:border-teal-brand text-teal-brand bg-teal-brand/10',
      description: "A 12-question interactive diagnostic covering Part VI of the IRS Form 990. Ensures your board answers YES to critical conflict and whistleblower questions.",
      cta: "Launch Wizard"
    }
  ];

  const selfAssessmentCompleted = !!labStates.selfAssessment.score;
  const boardPacketCompleted = labStates.boardPacket.count === 9;
  const minutesCompleted = !!labStates.minutesScorecard.grade;
  const budgetCompleted = labStates.budgetWorksheet.count === 6;
  const authorityCompleted = !!(labStates.authorityMap.score && labStates.authorityMap.score === labStates.authorityMap.total);
  const scriptCompleted = labStates.scriptBuilder.completed;
  const form990AnsweredCount = Object.keys(form990Answers).filter(k => form990Answers[k] !== undefined && form990Answers[k] !== null).length;
  const form990Completed = form990AnsweredCount === 12;

  const labsStatusList = [
    { label: 'Diagnostic', completed: selfAssessmentCompleted },
    { label: 'Packet Audit', completed: boardPacketCompleted },
    { label: 'Minutes', completed: minutesCompleted },
    { label: 'Ledger Audit', completed: budgetCompleted },
    { label: 'Authority Map', completed: authorityCompleted },
    { label: 'Sandbox Script', completed: scriptCompleted },
    { label: 'IRS Form 990', completed: form990Completed },
  ];

  return (
    <Layout>
      {isPrintBlocked && (
        <div
          role="alert"
          className="fixed top-4 left-1/2 -translate-x-1/2 z-[100] max-w-md w-[calc(100%-2rem)] bg-burgundy text-paper rounded-lg shadow-2xl border border-brass/40 px-4 py-3 flex items-start gap-3 font-sans"
        >
          <AlertTriangle className="w-4 h-4 mt-0.5 shrink-0 text-brass" />
          <div className="text-xs leading-relaxed">
            <p className="font-bold">Your browser blocked the print window.</p>
            <p className="text-paper/80">
              Allow pop-ups for this site, then use the print or download button again.
            </p>
          </div>
          <button
            type="button"
            onClick={() => setIsPrintBlocked(false)}
            aria-label="Dismiss"
            className="ml-auto text-paper/60 hover:text-paper font-bold leading-none"
          >
            &times;
          </button>
        </div>
      )}
      <div className="py-12 bg-paper/30 min-h-screen px-4 sm:px-6 lg:px-8">
        <div className="max-w-5xl mx-auto space-y-10">
          
          {/* Header */}
          <div className="text-center space-y-3">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-brass/10 border border-brass/30 text-brass rounded-full text-xs font-semibold uppercase tracking-wider">
              <Activity className="w-3.5 h-3.5" />
              <span>Interactive Governance Laboratories</span>
            </div>
            <h1 className="font-serif text-3xl sm:text-4xl text-ink font-bold tracking-wide">
              The Tools & Workshops Center
            </h1>
            <p className="max-w-2xl mx-auto text-sm sm:text-base text-ink/70">
              Interactive clinical exercises built for working directors. Engage with active ledgers, check minutes safety, sort delegations of power, and test board competency.
            </p>
            <div className="pt-2 flex justify-center gap-4">
              <button
                onClick={() => setIsResetModalOpen(true)}
                className="inline-flex items-center gap-1.5 text-xs text-ink/50 hover:text-burgundy font-semibold tracking-wide transition-premium cursor-pointer py-1.5 px-3 rounded-md hover:bg-burgundy/5 border border-transparent hover:border-burgundy/15"
              >
                <RefreshCw className="w-3.5 h-3.5" />
                <span>Reset All Platform Lab Data</span>
              </button>
            </div>
          </div>

          {/* Milestone Mastery Achievement Banner */}
          {isMasteryUnlocked && (
            <div className="bg-gradient-to-r from-brass/5 via-white to-brass/10 p-6 rounded-xl border-2 border-brass/35 shadow-sm text-left flex flex-col md:flex-row justify-between items-center gap-5 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-24 h-24 bg-brass/5 rounded-full blur-xl translate-x-8 -translate-y-8 pointer-events-none" />
              <div className="space-y-2 relative z-10">
                <div className="flex items-center gap-1.5 text-brass">
                  <Sparkles className="w-4 h-4 fill-brass" />
                  <span className="text-[10px] font-extrabold uppercase tracking-widest font-sans">
                    Master Fiduciary Diploma Eligible
                  </span>
                </div>
                <h3 className="font-serif text-xl text-ink font-bold leading-tight">
                  Uncovered {completedCount} Compliance Landmarks!
                </h3>
                <p className="text-xs text-ink/75 leading-relaxed font-sans max-w-xl">
                  Your board has successfully verified compliance in 3 or more laboratories. You have officially unlocked the <strong>Certificate of Fiduciary Governance Mastery</strong> issued by Dean Myron Steeves, J.D.
                </p>
              </div>
              <button
                onClick={() => setIsCertificateOpen(true)}
                className="shrink-0 inline-flex items-center gap-2 px-4.5 py-3 bg-brass text-ink hover:bg-ink hover:text-white text-xs font-bold uppercase tracking-wider rounded transition-premium shadow-md cursor-pointer z-10"
              >
                <Award className="w-4 h-4" />
                <span>Claim Certified Parchment</span>
              </button>
            </div>
          )}

          {/* Fiduciary Diligence Portfolio Progress Desk */}
          <div className="bg-white rounded-xl shadow-md border border-fog/80 p-6 space-y-6 text-left relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-burgundy/5 rounded-full blur-2xl pointer-events-none" />
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 border-b border-fog pb-4.5">
              <div className="space-y-1">
                <div className="flex items-center gap-1.5 text-burgundy">
                  <Award className="w-4 h-4 text-brass" />
                  <span className="text-[10px] font-extrabold uppercase tracking-widest font-sans">
                    National Boardroom compliance portal
                  </span>
                </div>
                <h3 className="font-serif text-xl sm:text-2xl text-ink font-bold">
                  Fiduciary Diligence Portfolio Desk
                </h3>
                <p className="text-xs sm:text-sm text-ink/75 leading-relaxed font-sans max-w-2xl">
                  Assemble, review, and print your permanent board self-audit records under state and federal law. Track, optimize, and lock clearances across all 7 interactive laboratories.
                </p>
              </div>
              <div className="shrink-0 font-sans text-right">
                <div className="text-sm font-black text-burgundy">{completedCount} of 7</div>
                <div className="text-[9px] font-extrabold text-ink/40 uppercase tracking-widest">Labs Verified</div>
              </div>
            </div>

            {/* Labs Progress Bar */}
            <div className="space-y-2">
              <div className="flex justify-between items-center text-[10px] font-extrabold uppercase tracking-wider text-ink/55 font-sans">
                <span>Dossier Completion Progress</span>
                <span className="text-burgundy">{Math.round((completedCount / 7) * 100)}%</span>
              </div>
              <div className="h-2.5 w-full bg-fog rounded-full overflow-hidden border border-fog/40 shadow-inner">
                <div 
                  className="h-full bg-gradient-to-r from-brass via-burgundy to-burgundy transition-all duration-700 ease-out"
                  style={{ width: `${(completedCount / 7) * 100}%` }}
                />
              </div>
            </div>

            {/* Labs Pills Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-3">
              {labsStatusList.map((lab, idx) => (
                <div 
                  key={idx}
                  className={`p-2.5 rounded-lg border text-center space-y-1 transition-premium ${
                    lab.completed 
                      ? 'bg-emerald-500/5 border-emerald-500/20 text-emerald-800' 
                      : 'bg-slate-50/50 border-fog/60 text-ink/40'
                  }`}
                >
                  <div className="text-[9px] font-black uppercase tracking-wider leading-none">Lab {idx + 1}</div>
                  <div className="flex items-center justify-center gap-1.5 text-[10.5px] font-bold truncate">
                    {lab.completed ? (
                      <Check className="w-3.5 h-3.5 shrink-0 text-emerald-600 font-extrabold" />
                    ) : (
                      <span className="w-1.5 h-1.5 rounded-full bg-slate-300 shrink-0 animate-pulse" />
                    )}
                    <span>{lab.label}</span>
                  </div>
                </div>
              ))}
            </div>

            {/* Persistence & Synchronization Actions */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-end gap-4 border-t border-fog/60 pt-5">
              <div className="w-full sm:w-[40%] space-y-1.5 text-left">
                <label htmlFor="tools-org-name" className="text-[9.5px] font-extrabold text-ink/50 uppercase tracking-widest block">
                  Organization Entity / Board Name (Synced)
                </label>
                <input 
                  id="tools-org-name"
                  type="text"
                  value={userOrgName}
                  onChange={(e) => setUserOrganizationName(e.target.value)}
                  placeholder="e.g. Hope Foundation Board of Directors"
                  className="w-full text-xs font-bold border border-fog/70 py-3 px-3.5 rounded bg-paper/5 focus:ring-1 focus:ring-brass focus:border-brass focus:outline-none text-ink"
                />
              </div>
              <div className="w-full sm:w-[60%] flex flex-col sm:flex-row gap-3">
                <button
                  onClick={() => setIsPortfolioOpen(true)}
                  className="w-full py-3 bg-burgundy hover:bg-ink text-white text-xs font-bold uppercase tracking-wider rounded transition-premium cursor-pointer shadow-md inline-flex justify-center items-center gap-2"
                >
                  <Award className="w-4 h-4 text-brass" />
                  <span>Compile Diligence Portfolio</span>
                </button>
                <a
                  href="https://NPOlawyers.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-3 border border-fog/80 hover:bg-fog/40 text-ink text-xs font-bold uppercase tracking-wider rounded transition-premium text-center inline-flex justify-center items-center gap-1"
                >
                  <span>NPOlawyers.com &rarr;</span>
                </a>
              </div>
            </div>
          </div>

          {/* Tools Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {toolItems.map((tool) => (
              <div
                key={tool.id}
                onClick={() => {
                  if (tool.id === 'script-builder') {
                    setIsScriptSandboxOpen(true);
                  } else if (tool.id === 'form-990-wizard') {
                    setIsForm990WizardOpen(true);
                  } else {
                    navigate(tool.path);
                  }
                }}
                className={`bg-white rounded-xl shadow-sm border border-fog overflow-hidden cursor-pointer hover:shadow-md hover:-translate-y-0.5 transition-premium border-t-4 ${tool.themeColor} flex flex-col justify-between text-left`}
              >
                <div className="p-6 space-y-4">
                  <div className="flex items-start justify-between gap-3">
                    {/* Tool icon */}
                    <div className={`w-12 h-12 rounded-lg flex items-center justify-center border border-fog/50 ${tool.themeColor.split(' ')[2]}`}>
                      {tool.icon}
                    </div>
                    {/* Progress Badge */}
                    <div className="pt-1 shrink-0">
                      {renderBadge(tool.id)}
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <h3 className="font-serif font-bold text-lg text-ink leading-snug">
                      {tool.title}
                    </h3>
                    <p className="font-sans text-xs sm:text-sm text-ink/70 leading-relaxed">
                      {tool.description}
                    </p>
                  </div>
                </div>

                <div className="px-6 py-4 bg-paper/10 border-t border-fog/60 flex items-center justify-end text-xs font-bold text-slate-brand uppercase tracking-wider">
                  <div className="inline-flex items-center gap-1.5 hover:text-brass transition-premium">
                    <span>{tool.cta}</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Regulatory Audit Banner */}
          <div className="bg-ink text-paper rounded-xl p-6 sm:p-8 text-left grid grid-cols-1 lg:grid-cols-12 gap-6 items-center border border-brass/25">
            <div className="lg:col-span-8 space-y-2">
              <h3 className="font-serif text-xl sm:text-2xl text-white font-bold tracking-wide">
                Require direct training or legal audit services?
              </h3>
              <p className="text-xs sm:text-sm text-paper/85 leading-relaxed font-sans">
                The California Center for Nonprofit Law facilitates in-person bylaws updates, strategic risk assessments, and dedicated executive compensation audits. Fulfill the IRS safe harbor criteria under expert counsel.
              </p>
            </div>
            
            <div className="lg:col-span-4 flex flex-col sm:flex-row lg:flex-col gap-3 w-full lg:w-auto shrink-0 justify-end">
              <a
                href="https://NPOlawyers.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full text-center inline-flex justify-center items-center gap-1.5 px-5 py-3 bg-brass hover:bg-white hover:text-ink text-ink text-xs font-bold uppercase tracking-wider rounded shadow transition-premium"
              >
                <span>Audit Board Bylaws</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </a>
              <button
                onClick={() => navigate('training')}
                className="w-full text-center px-5 py-3 border border-paper/40 hover:border-brass text-paper hover:text-brass text-xs font-bold uppercase tracking-wider rounded transition-premium"
              >
                Request Custom Training
              </button>
            </div>
          </div>

        </div>
      </div>

      {/* Script Builder Sandbox Overlay */}
      {isScriptSandboxOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-ink/50 backdrop-blur-sm" onClick={() => setIsScriptSandboxOpen(false)} />
          
          <div className="relative bg-white rounded-xl shadow-2xl max-w-4xl w-full border border-fog p-6 sm:p-8 text-left space-y-6 flex flex-col max-h-[90vh] overflow-y-auto font-sans">
            <div className="flex justify-between items-start border-b border-fog/40 pb-4">
              <div>
                <div className="flex items-center gap-1.5 text-burgundy mb-1">
                  <Scale className="w-4 h-4" />
                  <span className="text-[10px] font-extrabold uppercase tracking-wider font-sans">
                    Governance Lab #6 — Inquiry Sandbox
                  </span>
                </div>
                <h3 className="font-serif font-bold text-2xl text-ink">
                  Fiduciary Script Constructor
                </h3>
              </div>
              <button onClick={() => setIsScriptSandboxOpen(false)} className="text-ink/40 hover:text-ink cursor-pointer">
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Selector Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="space-y-4">
                <div className="space-y-1">
                  <label htmlFor="script-track" className="text-[10px] font-extrabold text-ink/50 uppercase tracking-widest">
                    Governance Dispute Track
                  </label>
                  <select 
                    id="script-track"
                    value={selectedScriptId} 
                    onChange={(e) => setSelectedScriptId(e.target.value)}
                    className="w-full text-xs font-medium border border-fog/60 p-2.5 rounded bg-paper/5 focus:border-brass focus:outline-none"
                  >
                    {Object.values(scriptTemplates).map(t => (
                      <option key={t.id} value={t.id}>{t.title}</option>
                    ))}
                  </select>
                </div>

                <div className="p-4 bg-paper/20 rounded-lg border border-fog/40 text-xs space-y-2">
                  <span className="font-bold text-ink uppercase tracking-wide text-[9px] block">Dispute Assessment:</span>
                  <p className="text-ink/75 leading-relaxed font-sans">{parseTextWithStatutesAndGlossary(scriptTemplates[selectedScriptId].problem)}</p>
                  <div className="pt-2 border-t border-fog/30">
                    <span className="font-bold text-ink uppercase tracking-wide text-[9px] block">Statutory Standard:</span>
                    <span className="text-burgundy font-bold text-[11px] block mt-0.5">{parseTextWithStatutesAndGlossary(scriptTemplates[selectedScriptId].statute)}</span>
                    <span className="text-[10px] text-ink/65 leading-normal block">{parseTextWithStatutesAndGlossary(scriptTemplates[selectedScriptId].statuteTitle)}</span>
                  </div>
                </div>

                <div className="space-y-2 pt-2">
                  <button 
                    onClick={handleCopyScript}
                    className="w-full inline-flex justify-center items-center gap-2 px-3 py-2 bg-paper/20 hover:bg-fog text-ink text-xs font-bold uppercase tracking-wider rounded border border-fog/50 transition-premium cursor-pointer"
                  >
                    {copySuccess ? <Check className="w-4 h-4 text-emerald-600" /> : <Copy className="w-4 h-4" />}
                    <span>{copySuccess ? 'Copied Script!' : 'Copy Script Text'}</span>
                  </button>
                  <button 
                    onClick={handleDownloadScript}
                    className="w-full inline-flex justify-center items-center gap-2 px-3 py-2 bg-paper/20 hover:bg-fog text-ink text-xs font-bold uppercase tracking-wider rounded border border-fog/50 transition-premium cursor-pointer"
                  >
                    <Download className="w-4 h-4 text-brass" />
                    <span>Download .txt Script</span>
                  </button>
                  <button 
                    onClick={handlePrintScript}
                    className="w-full inline-flex justify-center items-center gap-2 px-3 py-2 bg-paper/20 hover:bg-fog text-ink text-xs font-bold uppercase tracking-wider rounded border border-fog/50 transition-premium cursor-pointer"
                  >
                    <Printer className="w-4 h-4" />
                    <span>Print Script Guide</span>
                  </button>
                  <button 
                    onClick={handleCompleteScriptSandbox}
                    className="w-full inline-flex justify-center items-center gap-2 px-3 py-2 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold uppercase tracking-wider rounded transition-premium cursor-pointer shadow-sm"
                  >
                    <Check className="w-4 h-4" />
                    <span>Complete Laboratory #6</span>
                  </button>
                </div>
              </div>

              {/* Compilation Desk */}
              <div className="md:col-span-2 bg-paper/10 border border-fog/50 p-6 rounded-lg space-y-6 overflow-y-auto max-h-[50vh]">
                <div className="border-b border-fog pb-2 flex items-center justify-between">
                  <span className="text-xs font-extrabold text-ink/40 uppercase tracking-widest">
                    Target Boardroom Cross-Examination
                  </span>
                  <span className="text-[10px] font-bold bg-burgundy/10 text-burgundy border border-burgundy/25 px-2 py-0.5 rounded">
                    Target: {scriptTemplates[selectedScriptId].target}
                  </span>
                </div>

                {scriptTemplates[selectedScriptId].questions.map((q, idx) => (
                  <div key={idx} className="space-y-3.5 text-left border-l-2 border-brass pl-4">
                    <div className="space-y-1">
                      <span className="text-[9px] font-extrabold text-brass uppercase tracking-widest block">Question {idx + 1}</span>
                      <p className="font-serif text-sm sm:text-base font-bold text-ink italic leading-relaxed">
                        "{parseTextWithStatutesAndGlossary(q.question)}"
                      </p>
                      <p className="text-xs text-ink/50 leading-relaxed italic">
                        <strong>Legal Rationale:</strong> {parseTextWithStatutesAndGlossary(q.rationale)}
                      </p>
                    </div>

                    <div className="bg-white/80 p-3.5 rounded border border-fog/40 text-xs space-y-2">
                      <div className="text-[10px] font-extrabold text-rose-800 uppercase tracking-wider flex items-center gap-1.5">
                        <AlertTriangle className="w-3.5 h-3.5 text-rose-800" />
                        <span>Expected Evasive Answer:</span>
                      </div>
                      <p className="text-ink/80 italic font-medium">
                        {q.targetResponse}
                      </p>
                      <div className="pt-2 border-t border-fog/20 space-y-1">
                        <span className="font-extrabold text-emerald-800 text-[10px] uppercase tracking-wider block">Attorney Counter-Inquiry Response Strategy:</span>
                        <p className="text-ink/85 leading-relaxed font-sans">
                          {parseTextWithStatutesAndGlossary(q.counterStrike)}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Certificate Claim Modal */}
      {isCertificateOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-ink/60 backdrop-blur-sm" onClick={() => setIsCertificateOpen(false)} />
          
          <div className="relative bg-white rounded-xl shadow-2xl max-w-2xl w-full border border-fog p-6 text-center space-y-6">
            <button onClick={() => setIsCertificateOpen(false)} className="absolute top-4 right-4 text-ink/40 hover:text-ink cursor-pointer">
              <X className="w-5 h-5" />
            </button>

            <div className="space-y-1.5 pt-4">
              <Award className="w-12 h-12 text-brass mx-auto" />
              <h3 className="font-serif font-bold text-2xl text-ink">
                Fiduciary Mastery Diplomatic Seal
              </h3>
              <p className="text-xs text-ink/60 max-w-sm mx-auto">
                Customize your organization name below to generate and print your formal educational boardroom certificate.
              </p>
            </div>

            {/* Input Form */}
            <div className="max-w-md mx-auto space-y-1">
              <label htmlFor="portfolio-org" className="text-[9px] font-extrabold text-ink/40 uppercase tracking-widest block text-left">
                Organization / Board Name
              </label>
              <input 
                id="portfolio-org"
                type="text"
                value={userOrgName}
                onChange={(e) => setUserOrganizationName(e.target.value)}
                placeholder="e.g. Hope Foundation Board of Directors"
                className="w-full text-xs font-bold border border-fog/60 p-2.5 rounded focus:border-brass focus:outline-none bg-paper/5 text-ink"
              />
            </div>

            {/* Mini Certificate Render */}
            <div className="border-8 double border-brass/35 p-6 bg-paper/5 text-center space-y-4 max-w-lg mx-auto rounded font-serif">
              <span className="text-[10px] font-extrabold uppercase tracking-widest text-brass/75 block font-sans">
                National Boardroom Initiative
              </span>
              <h4 className="text-lg font-bold text-ink">
                Certificate of Fiduciary Mastery
              </h4>
              <p className="text-base font-bold text-ink/95 border-b border-brass/30 inline-block px-4 pb-0.5">
                {userOrgName}
              </p>
              <p className="text-[10px] text-ink/75 leading-relaxed max-w-sm mx-auto font-sans">
                Acknowledged for educational excellence in organization governance audit, quorums, and restricted asset stewardship.
              </p>
              <div className="flex justify-between items-center text-[8px] font-sans font-extrabold uppercase tracking-wider text-ink/40 pt-2 px-4">
                <span>Myron Steeves, J.D. &bull; Dean</span>
                <span className="text-brass font-bold">Fiduciary Certified</span>
              </div>
            </div>

            <div className="flex gap-3 justify-center max-w-sm mx-auto">
              <button
                onClick={() => setIsCertificateOpen(false)}
                className="w-full py-2.5 bg-paper/20 hover:bg-fog text-ink text-xs font-bold uppercase tracking-wider rounded transition-premium cursor-pointer"
              >
                Close Desk
              </button>
              <button
                onClick={handlePrintCertificate}
                className="w-full py-2.5 bg-brass hover:bg-ink hover:text-white text-ink text-xs font-bold uppercase tracking-wider rounded transition-premium cursor-pointer shadow-md inline-flex justify-center items-center gap-1.5"
              >
                <Printer className="w-4 h-4" />
                <span>Print Certificate</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Fiduciary Diligence Portfolio Modal */}
      {isPortfolioOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-ink/60 backdrop-blur-sm" onClick={() => setIsPortfolioOpen(false)} />
          
          <div className="relative bg-white rounded-xl shadow-2xl max-w-4xl w-full border border-fog p-6 flex flex-col max-h-[90vh]">
            <button onClick={() => setIsPortfolioOpen(false)} className="absolute top-4 right-4 text-ink/40 hover:text-ink cursor-pointer z-10">
              <X className="w-5 h-5" />
            </button>

            <div className="space-y-1.5 pt-2 pb-4 text-center border-b border-fog/50">
              <Award className="w-12 h-12 text-burgundy mx-auto" />
              <h3 className="font-serif font-bold text-2xl text-ink">
                Fiduciary Diligence Dossier Preview
              </h3>
              <p className="text-xs text-ink/60 max-w-lg mx-auto">
                Review your consolidated board compliance self-audit records. Click "Print Fiduciary Portfolio" to export your official dossier.
              </p>
            </div>

            {/* Scrollable Document Area */}
            <div className="flex-1 overflow-y-auto p-4 sm:p-6 bg-slate-50 border-b border-fog/50">
              <div className="border-8 double border-burgundy p-6 sm:p-10 bg-[#fcfbf7] text-left space-y-6 max-w-3xl mx-auto rounded shadow-inner font-serif text-ink relative">
                <div className="text-center space-y-1.5 border-b border-brass/25 pb-4">
                  <span className="text-[10px] font-extrabold uppercase tracking-widest text-brass block font-sans">
                    National Boardroom Initiative
                  </span>
                  <h4 className="text-xl sm:text-2xl font-bold text-burgundy tracking-wide uppercase">
                    Fiduciary Diligence Portfolio
                  </h4>
                  <p className="text-[11px] text-ink/60 font-sans italic">
                    Consolidated Board Self-Audit Compliance Records
                  </p>
                </div>

                {/* Metadata details */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs font-sans bg-paper/10 p-4 border border-fog/45 rounded-lg">
                  <div className="space-y-1">
                    <label htmlFor="certificate-org" className="text-[9px] font-extrabold text-ink/50 uppercase tracking-widest block">Organization Entity / Board Name</label>
                    <input 
                      id="certificate-org"
                      type="text"
                      value={userOrgName}
                      onChange={(e) => setUserOrganizationName(e.target.value)}
                      className="w-full font-bold border border-fog/40 p-2 rounded focus:ring-1 focus:ring-brass focus:outline-none bg-white text-ink"
                    />
                  </div>
                  <div className="space-y-1">
                    <label htmlFor="certificate-date" className="text-[9px] font-extrabold text-ink/50 uppercase tracking-widest block">Compilation Date</label>
                    <input 
                      id="certificate-date"
                      type="text"
                      value={new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
                      className="w-full font-bold border border-fog/40 p-2 rounded bg-paper/5 focus:outline-none text-ink cursor-default"
                      readOnly
                    />
                  </div>
                </div>

                <p className="text-xs text-ink/75 leading-relaxed font-sans text-justify">
                  This portfolio compiles the complete self-audit clearance status for all 7 interactive laboratories. Completed labs represent certified clearance states aligned with state statutory codes and IRS best practices. Pending labs highlight areas where structural governance and risk diagnostics remain unchecked.
                </p>

                {/* Scorecard Table */}
                <div className="border border-fog/60 rounded-lg overflow-hidden font-sans">
                  <table className="w-full text-xs text-left">
                    <thead className="bg-slate-100 text-ink/70 uppercase text-[10px] tracking-wider font-extrabold border-b border-fog">
                      <tr>
                        <th className="p-3">Oversight Laboratory</th>
                        <th className="p-3">Statutory Standard</th>
                        <th className="p-3 text-center">Status</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-fog">
                      {/* Self-Assessment */}
                      <tr className="hover:bg-paper/5">
                        <td className="p-3">
                          <div className="font-bold text-ink">1. Mature Board Self-Assessment</div>
                          <div className="text-[10px] text-ink/60 mt-0.5">
                            {selfAssessmentCompleted 
                              ? `Score: ${labStates.selfAssessment.score}/50 (${labStates.selfAssessment.level || 'Institutional'})` 
                              : 'Pending board diagnostic completion.'}
                          </div>
                        </td>
                        <td className="p-3 text-[10px] font-bold text-ink/70">CA Corp Code § 5231</td>
                        <td className="p-3 text-center">
                          <span className={`inline-flex items-center gap-1 px-2 py-1 rounded text-[9px] font-bold uppercase tracking-wider ${
                            selfAssessmentCompleted ? 'bg-emerald-100 text-emerald-800' : 'bg-amber-100 text-amber-800'
                          }`}>
                            {selfAssessmentCompleted ? '✓ Certified' : '⏳ Pending'}
                          </span>
                        </td>
                      </tr>
                      {/* Board Packet */}
                      <tr className="hover:bg-paper/5">
                        <td className="p-3">
                          <div className="font-bold text-ink">2. Board Packet Audit Lab</div>
                          <div className="text-[10px] text-ink/60 mt-0.5">
                            {boardPacketCompleted 
                              ? '9 of 9 red-flag vulnerabilities successfully scanned.' 
                              : labStates.boardPacket.count > 0 
                                ? `${labStates.boardPacket.count} of 9 red-flag vulnerabilities scanned (Partially Completed).` 
                                : 'Scan documents for compliance vulnerabilities.'}
                          </div>
                        </td>
                        <td className="p-3 text-[10px] font-bold text-ink/70">CA Corp Code § 5227</td>
                        <td className="p-3 text-center">
                          <span className={`inline-flex items-center gap-1 px-2 py-1 rounded text-[9px] font-bold uppercase tracking-wider ${
                            boardPacketCompleted ? 'bg-emerald-100 text-emerald-800' : 'bg-amber-100 text-amber-800'
                          }`}>
                            {boardPacketCompleted ? '✓ Certified' : '⏳ Pending'}
                          </span>
                        </td>
                      </tr>
                      {/* Minutes */}
                      <tr className="hover:bg-paper/5">
                        <td className="p-3">
                          <div className="font-bold text-ink">3. Minutes Quality Scorecard</div>
                          <div className="text-[10px] text-ink/60 mt-0.5">
                            {minutesCompleted 
                              ? `Grade: ${labStates.minutesScorecard.grade} (${labStates.minutesScorecard.score})` 
                              : 'Score draft minutes to verify legal discoverability.'}
                          </div>
                        </td>
                        <td className="p-3 text-[10px] font-bold text-ink/70">CA Corp Code § 5215</td>
                        <td className="p-3 text-center">
                          <span className={`inline-flex items-center gap-1 px-2 py-1 rounded text-[9px] font-bold uppercase tracking-wider ${
                            minutesCompleted ? 'bg-emerald-100 text-emerald-800' : 'bg-amber-100 text-amber-800'
                          }`}>
                            {minutesCompleted ? '✓ Certified' : '⏳ Pending'}
                          </span>
                        </td>
                      </tr>
                      {/* Budget */}
                      <tr className="hover:bg-paper/5">
                        <td className="p-3">
                          <div className="font-bold text-ink">4. Budget Deviation Worksheet</div>
                          <div className="text-[10px] text-ink/60 mt-0.5">
                            {budgetCompleted 
                              ? '6 of 6 budget ledger variances scanned.' 
                              : labStates.budgetWorksheet.count > 0 
                                ? `${labStates.budgetWorksheet.count} of 6 budget ledger variances scanned (Partially Completed).` 
                                : 'Scrutinize ledger variances.'}
                          </div>
                        </td>
                        <td className="p-3 text-[10px] font-bold text-ink/70">IRC § 6672</td>
                        <td className="p-3 text-center">
                          <span className={`inline-flex items-center gap-1 px-2 py-1 rounded text-[9px] font-bold uppercase tracking-wider ${
                            budgetCompleted ? 'bg-emerald-100 text-emerald-800' : 'bg-amber-100 text-amber-800'
                          }`}>
                            {budgetCompleted ? '✓ Certified' : '⏳ Pending'}
                          </span>
                        </td>
                      </tr>
                      {/* Authority Map */}
                      <tr className="hover:bg-paper/5">
                        <td className="p-3">
                          <div className="font-bold text-ink">5. Board Authority Delegation Map</div>
                          <div className="text-[10px] text-ink/60 mt-0.5">
                            {authorityCompleted 
                              ? '12 of 12 corporate actions correctly mapped.' 
                              : labStates.authorityMap.score 
                                ? `Map score: ${labStates.authorityMap.score} of ${labStates.authorityMap.total} correctly mapped.` 
                                : 'Map corporate actions to statutory slots.'}
                          </div>
                        </td>
                        <td className="p-3 text-[10px] font-bold text-ink/70">CA Corp Code § 5212</td>
                        <td className="p-3 text-center">
                          <span className={`inline-flex items-center gap-1 px-2 py-1 rounded text-[9px] font-bold uppercase tracking-wider ${
                            authorityCompleted ? 'bg-emerald-100 text-emerald-800' : 'bg-amber-100 text-amber-800'
                          }`}>
                            {authorityCompleted ? '✓ Certified' : '⏳ Pending'}
                          </span>
                        </td>
                      </tr>
                      {/* Script Sandbox */}
                      <tr className="hover:bg-paper/5">
                        <td className="p-3">
                          <div className="font-bold text-ink">6. Boardroom Script Constructor</div>
                          <div className="text-[10px] text-ink/60 mt-0.5">
                            {scriptCompleted 
                              ? 'Custom courtroom-grade inquiry guide compiled in sandbox.' 
                              : 'Compile and test an inquiry script.'}
                          </div>
                        </td>
                        <td className="p-3 text-[10px] font-bold text-ink/70">CA Corp Code § 5233</td>
                        <td className="p-3 text-center">
                          <span className={`inline-flex items-center gap-1 px-2 py-1 rounded text-[9px] font-bold uppercase tracking-wider ${
                            scriptCompleted ? 'bg-emerald-100 text-emerald-800' : 'bg-amber-100 text-amber-800'
                          }`}>
                            {scriptCompleted ? '✓ Certified' : '⏳ Pending'}
                          </span>
                        </td>
                      </tr>
                      {/* Form 990 */}
                      <tr className="hover:bg-paper/5">
                        <td className="p-3">
                          <div className="font-bold text-ink">7. IRS Form 990 Review Wizard</div>
                          <div className="text-[10px] text-ink/60 mt-0.5">
                            {form990Completed 
                              ? `12 of 12 responses completed.` 
                              : 'Complete the 12-question Part VI checklist.'}
                          </div>
                        </td>
                        <td className="p-3 text-[10px] font-bold text-ink/70">Form 990 Part VI</td>
                        <td className="p-3 text-center">
                          <span className={`inline-flex items-center gap-1 px-2 py-1 rounded text-[9px] font-bold uppercase tracking-wider ${
                            form990Completed ? 'bg-emerald-100 text-emerald-800' : 'bg-amber-100 text-amber-800'
                          }`}>
                            {form990Completed ? '✓ Certified' : '⏳ Pending'}
                          </span>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>

                {/* Disclaimer */}
                <div className="p-4 bg-slate-100 border-l-4 border-slate-400 rounded-r text-[11px] font-sans text-ink/70 italic leading-relaxed text-justify">
                  <strong>Educational-Information Disclaimer:</strong> This portfolio is compiled from board diagnostic self-audits. 
                  The contents are structured for training and self-evaluative review only. This dossier does not represent formal legal 
                  advice, nor does it establish an attorney-client relationship under California law. 
                </div>

                {/* Premium Firm Callout block */}
                <div className="border border-brass/40 bg-brass/5 p-4 rounded-lg text-center font-sans space-y-2">
                  <div className="font-serif text-base font-bold text-burgundy">California Center for Nonprofit Law</div>
                  <div className="text-[10px] text-brass font-extrabold uppercase tracking-widest">Independent Fiduciary Audits</div>
                  <p className="text-xs text-ink/75 max-w-lg mx-auto">
                    For customized bylaws revision, independent director compensation reviews, and formal regulatory risk evaluations under California law, please consult attorney Myron Steeves, J.D. at NPO Lawyers.
                  </p>
                  <a href="https://NPOlawyers.com" target="_blank" rel="noopener noreferrer" className="inline-block text-xs font-bold text-burgundy hover:text-ink underline">
                    Visit NPOlawyers.com &rarr;
                  </a>
                </div>

                {/* Signature Block */}
                <div className="flex flex-col sm:flex-row justify-between items-end gap-6 pt-6 font-sans text-[10px] text-ink/60 border-t border-brass/25">
                  <div className="w-full sm:w-1/3 text-center space-y-1">
                    <div className="h-6 border-b border-brass/35" />
                    <div>Board President Signature</div>
                    <div className="text-[8px] text-ink/40">{userOrgName}</div>
                  </div>
                  <div className="w-full sm:w-1/3 text-center space-y-1">
                    <div className="h-6 border-b border-brass/35" />
                    <div>Board Secretary Signature</div>
                    <div className="text-[8px] text-ink/40">{userOrgName}</div>
                  </div>
                  <div className="w-full sm:w-1/3 text-center space-y-1">
                    <div className="font-serif text-xs text-ink font-bold">{new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</div>
                    <div className="border-t border-brass/35 pt-1">Compilation Date</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="p-4 flex gap-3 justify-end bg-white">
              <button
                onClick={() => setIsPortfolioOpen(false)}
                className="px-5 py-2.5 bg-paper/20 hover:bg-fog text-ink text-xs font-bold uppercase tracking-wider rounded transition-premium cursor-pointer"
              >
                Close Preview
              </button>
              <button
                onClick={handlePrintPortfolio}
                className="px-5 py-2.5 bg-burgundy text-white hover:bg-ink text-xs font-bold uppercase tracking-wider rounded transition-premium cursor-pointer shadow-md inline-flex items-center gap-1.5"
              >
                <Printer className="w-4 h-4 text-brass" />
                <span>Print Fiduciary Portfolio</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* IRS Form 990 Review Wizard Modal (Enhancement 9) */}
      {isForm990WizardOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-ink/50 backdrop-blur-sm" onClick={() => setIsForm990WizardOpen(false)} />
          
          <div className="relative bg-white rounded-xl shadow-2xl max-w-4xl w-full border border-fog p-6 sm:p-8 text-left space-y-6 flex flex-col max-h-[90vh] overflow-y-auto font-sans">
            {/* Modal Header */}
            <div className="flex justify-between items-start border-b border-fog/40 pb-4 shrink-0">
              <div>
                <div className="flex items-center gap-1.5 text-teal-brand mb-1">
                  <CheckSquare className="w-4 h-4 text-teal-brand" />
                  <span className="text-[10px] font-extrabold uppercase tracking-wider font-sans">
                    Governance Lab #7 — IRS Part VI Wizard
                  </span>
                </div>
                <h3 className="font-serif font-bold text-2xl text-ink">
                  IRS Form 990 Board Review Wizard
                </h3>
              </div>
              <button onClick={() => setIsForm990WizardOpen(false)} className="text-ink/40 hover:text-ink cursor-pointer">
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Questions Progress Grid */}
            <div className="flex flex-wrap gap-2 justify-center border-b border-fog/20 pb-4 shrink-0">
              {form990Questions.map((q, idx) => {
                const answer = form990Answers[q.id];
                const isActive = form990ActiveIndex === idx;
                let btnClass = "bg-slate-100 hover:bg-slate-200 border-slate-300 text-slate-500";
                if (answer) {
                  btnClass = answer === q.optimal 
                    ? "bg-emerald-50 border-emerald-300 text-emerald-700 font-bold"
                    : "bg-rose-50 border-rose-300 text-rose-700 font-bold";
                }
                if (isActive) {
                  btnClass += " ring-2 ring-brass ring-offset-1";
                }
                return (
                  <button
                    key={q.id}
                    onClick={() => setForm990ActiveIndex(idx)}
                    className={`w-8 h-8 rounded-full border text-xs font-bold transition-all flex items-center justify-center cursor-pointer ${btnClass}`}
                    title={`${q.line}: ${q.question}`}
                  >
                    {idx + 1}
                  </button>
                );
              })}
            </div>

            {/* Split Content Pane */}
            {Object.keys(form990Answers).filter(k => form990Answers[k] !== undefined && form990Answers[k] !== null).length === 12 ? (
              <div className="space-y-6">
                {/* Completed Memo Display */}
                <div className="bg-emerald-50/50 border border-emerald-200 p-4 rounded-lg flex items-start gap-3">
                  <Sparkles className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                  <div className="space-y-1">
                    <h4 className="font-serif font-bold text-ink">IRS Form 990 Review Completed!</h4>
                    <p className="text-xs text-ink/70 font-sans">
                      All 12 critical corporate governance questions under Part VI have been assessed. Below, you can review the generated Due Diligence Memorandum, customize your board details, and print a hard copy for your corporate binder.
                    </p>
                  </div>
                </div>

                {/* Parchment Styled Report Memo */}
                <div className="border-8 double border-brass/35 p-6 sm:p-8 bg-white text-ink rounded shadow-lg font-serif space-y-6 max-w-2xl mx-auto relative">
                  {/* Watermark/Seal style logo */}
                  <div className="absolute top-4 right-4 text-[10px] font-sans font-bold text-brass border border-brass/40 px-2 py-1 rounded select-none opacity-45 uppercase tracking-wider">
                    Fiduciary Approved
                  </div>

                  <div className="text-center space-y-2 border-b border-brass/30 pb-4">
                    <span className="font-sans text-[11px] font-extrabold uppercase tracking-widest text-brass block">
                      National Boardroom Initiative (California Snapshot)
                    </span>
                    <h4 className="text-2xl font-bold tracking-wide text-ink">
                      BOARD GOVERNANCE COMPLIANCE MEMORANDUM
                    </h4>
                    <p className="text-xs font-sans italic text-ink/55">
                      Executed in Connection with Standard Corporate Codes & IRS Part VI Standards
                    </p>
                  </div>

                  {/* Fields for custom details */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs font-sans border-b border-brass/25 pb-4">
                    <div className="space-y-1">
                      <label htmlFor="form990-board-name" className="text-[9px] font-extrabold text-ink/50 uppercase tracking-widest">Governing Board Name</label>
                      <input 
                        id="form990-board-name"
                        type="text"
                        value={userOrgName}
                        onChange={(e) => setUserOrganizationName(e.target.value)}
                        className="w-full font-bold border border-fog/40 p-2 rounded focus:ring-1 focus:ring-brass focus:outline-none bg-paper/5 text-ink"
                      />
                    </div>
                    <div className="space-y-1">
                      <label htmlFor="form990-audit-date" className="text-[9px] font-extrabold text-ink/50 uppercase tracking-widest">Audit Conducted On</label>
                      <input 
                        id="form990-audit-date"
                        type="text"
                        defaultValue={new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
                        className="w-full font-bold border border-fog/40 p-2 rounded bg-paper/5 focus:outline-none text-ink cursor-default"
                        readOnly
                      />
                    </div>
                  </div>

                  {/* Summary Scores */}
                  <div className="space-y-3 font-sans">
                    <div className="flex justify-between items-center bg-paper/10 p-3 rounded border border-fog/50">
                      <span className="text-xs font-bold text-ink uppercase tracking-wide">Fiduciary Compliance Score:</span>
                      <span className="text-sm font-extrabold text-teal-brand">
                        {form990Questions.filter(q => form990Answers[q.id] === q.optimal).length} / 12 Compliant Responses
                      </span>
                    </div>

                    {/* Show Red Flag Summary if any answers are non-optimal */}
                    {form990Questions.some(q => form990Answers[q.id] !== q.optimal) ? (
                      <div className="p-4 bg-rose-50 border border-rose-200 rounded text-left space-y-2">
                        <span className="text-rose-800 text-[10px] font-extrabold uppercase tracking-widest block font-sans">
                          ⚠ ACTIVE GOVERNANCE DISCLOSURE ALERTS:
                        </span>
                        <ul className="list-disc pl-5 text-xs text-ink/80 space-y-1 font-sans">
                          {form990Questions.filter(q => form990Answers[q.id] !== q.optimal).map(q => (
                            <li key={q.id}>
                              <strong>{q.line} ({q.question.replace(/\?$/, '')}):</strong> Answering {form990Answers[q.id]?.toUpperCase()} deviates from IRS best-practices. {q.guidance}
                            </li>
                          ))}
                        </ul>
                        <div className="pt-2 border-t border-rose-200/50 text-[11px] font-medium text-ink/75 leading-relaxed font-sans">
                          These non-compliant configurations will be visible on your public IRS Form 990, inviting regulatory audits and potential D&O policy escalations. We recommend immediate engagement with the California Center for Nonprofit Law (<a href="https://NPOlawyers.com" target="_blank" rel="noopener noreferrer" className="text-burgundy font-bold underline">NPOlawyers.com</a>) to update your board policies prior to filing.
                        </div>
                      </div>
                    ) : (
                      <div className="p-4 bg-emerald-50 border border-emerald-200 rounded text-left flex items-start gap-2.5">
                        <ShieldCheck className="w-5 h-5 text-emerald-600 shrink-0" />
                        <div className="space-y-1">
                          <span className="text-emerald-800 text-[10px] font-extrabold uppercase tracking-widest block font-sans">
                            100% GOVERNANCE COMPLIANT:
                          </span>
                          <p className="text-xs text-ink/75 leading-relaxed font-sans">
                            Your policies and structures are perfectly configured to meet IRS Form 990 Part VI due-diligence standards. This ensures high marks from public charity navigators and satisfies D&O underwriter standards.
                          </p>
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Memorandum Resolution Text */}
                  <div className="space-y-2 text-ink/80 text-xs leading-relaxed italic text-left border-l-2 border-brass pl-4 font-serif">
                    <p>
                      <strong>WHEREAS</strong>, Section B, Part VI of the Internal Revenue Service (IRS) Form 990 actively audits organization policies and structural quorums to ensure directors protect public charity assets; and
                    </p>
                    <p>
                      <strong>WHEREAS</strong>, the Board of Directors of <strong>{userOrgName || '[Organization Name]'}</strong> has completed a thorough, clinical self-audit of its quorums, disclosures, relationships, conflict management processes, whistleblower safety, and document archiving policies;
                    </p>
                    <p>
                      <strong>NOW, THEREFORE, BE IT RESOLVED</strong>, that this Board hereby endorses this Governance Memorandum, commits to resolving any flagged non-compliances, and directs the Secretary to append this document to the permanent corporate record.
                    </p>
                  </div>

                  {/* Signatures */}
                  <div className="pt-10 flex flex-col sm:flex-row justify-between gap-8 text-xs font-sans">
                    <div className="space-y-1 text-center sm:text-left">
                      <div className="h-8 border-b border-brass/50 w-48 mx-auto sm:mx-0" />
                      <p className="font-bold text-ink">Board President</p>
                      <p className="text-[10px] text-ink/50">For {userOrgName}</p>
                    </div>
                    <div className="space-y-1 text-center sm:text-left">
                      <div className="h-8 border-b border-brass/50 w-48 mx-auto sm:mx-0" />
                      <p className="font-bold text-ink">Board Secretary</p>
                      <p className="text-[10px] text-ink/50">Contemporaneously Recorded</p>
                    </div>
                  </div>
                </div>

                {/* Print and Reset Buttons */}
                <div className="flex gap-3 justify-center max-w-sm mx-auto font-sans pb-4">
                  <button
                    onClick={handleResetForm990}
                    className="w-full py-2.5 bg-paper/20 hover:bg-fog text-ink text-xs font-bold uppercase tracking-wider rounded border border-fog/50 transition-premium cursor-pointer"
                  >
                    Reset & Retake
                  </button>
                  <button
                    onClick={() => {
                      const printWindow = openPrintWindow();
                      if (!printWindow) return;
                      const reportHtml = `
                        <html>
                          <head>
                            <title>Form 990 Board Review Memorandum</title>
                            <style>
                              body { font-family: 'Times New Roman', serif; padding: 50px; color: #1a1a1a; line-height: 1.6; }
                              .double-border { border: 15px double #a47e3c; padding: 40px; background: #fff; max-width: 800px; margin: 0 auto; }
                              h2 { text-align: center; font-size: 24px; text-transform: uppercase; margin-bottom: 5px; }
                              .subtitle { text-align: center; font-size: 13px; font-style: italic; color: #555; margin-bottom: 30px; }
                              .meta { display: flex; justify-content: space-between; font-size: 14px; margin-bottom: 30px; border-bottom: 1px solid #ccc; padding-bottom: 15px; font-family: sans-serif; }
                              .resolutions { margin-bottom: 40px; font-style: italic; }
                              .resolutions p { margin-bottom: 15px; text-align: justify; }
                              .signatures { display: flex; justify-content: space-between; margin-top: 50px; font-family: sans-serif; }
                              .sig-line { width: 250px; border-top: 1px solid #1a1a1a; text-align: center; padding-top: 5px; margin-top: 40px; }
                              .compliance-summary { background: #f9f9f6; border: 1px solid #ddd; padding: 15px; margin-bottom: 30px; font-family: sans-serif; font-size: 13px; }
                              .compliance-summary h4 { margin-top: 0; text-transform: uppercase; font-size: 12px; color: #c0392b; }
                              .compliance-summary ul { padding-left: 20px; margin-bottom: 0; }
                            </style>
                          </head>
                          <body>
                            <div class="double-border">
                              <div style="text-align: center; font-size: 12px; font-weight: bold; letter-spacing: 2px; color: #a47e3c; font-family: sans-serif; text-transform: uppercase;">National Boardroom Initiative (California Snapshot)</div>
                              <h2>Governance Memorandum</h2>
                              <div class="subtitle">Execution Record under Standard Corporate Codes & IRS Part VI Standards</div>
                              
                              <div class="meta">
                                <div><strong>Organization Entity:</strong> ${escapeHtml(userOrgName)}</div>
                                <div><strong>Review Date:</strong> ${new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</div>
                              </div>

                              <div class="compliance-summary">
                                <strong>Fiduciary Compliance Score:</strong> ${form990Questions.filter(q => form990Answers[q.id] === q.optimal).length} of 12 Compliant Answers<br/>
                                ${form990Questions.some(q => form990Answers[q.id] !== q.optimal) ? `
                                  <h4 style="margin-top:10px;">Flagged Governance Disclosures:</h4>
                                  <ul>
                                    ${form990Questions.filter(q => form990Answers[q.id] !== q.optimal).map(q => `
                                      <li><strong>${q.line}:</strong> Answering ${form990Answers[q.id]?.toUpperCase()} is non-optimal. ${q.guidance}</li>
                                    `).join('')}
                                  </ul>
                                ` : '<p style="color:green; font-weight:bold; margin-top:10px;">100% governance compliant configuration.</p>'}
                              </div>

                              <div class="resolutions">
                                <p><strong>WHEREAS</strong>, Section B, Part VI of the Internal Revenue Service (IRS) Form 990 actively audits organization policies and structural quorums to ensure directors protect public charity assets; and</p>
                                <p><strong>WHEREAS</strong>, the Board of Directors of <strong>${escapeHtml(userOrgName)}</strong> has completed a thorough, clinical self-audit of its quorums, disclosures, relationships, conflict management processes, whistleblower safety, and document archiving policies;</p>
                                <p><strong>NOW, THEREFORE, BE IT RESOLVED</strong>, that this Board hereby endorses this Governance Memorandum, commits to resolving any flagged non-compliances, and directs the Secretary to append this document to the permanent corporate record.</p>
                              </div>

                              <div class="signatures">
                                <div class="sig-line">
                                  <strong>Board President</strong><br/>
                                  For the Corporation
                                </div>
                                <div class="sig-line">
                                  <strong>Board Secretary</strong><br/>
                                  Contemporaneously Attested
                                </div>
                              </div>
                            </div>
                          </body>
                        </html>
                      `;
                      printWindow.document.write(reportHtml);
                      printWindow.document.close();
                      printWindow.print();
                    }}
                    className="w-full py-2.5 bg-brass hover:bg-ink hover:text-white text-ink text-xs font-bold uppercase tracking-wider rounded transition-premium cursor-pointer shadow-md inline-flex justify-center items-center gap-1.5"
                  >
                    <Printer className="w-4 h-4" />
                    <span>Print Record</span>
                  </button>
                </div>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* Left: Question Box */}
                <div className="md:col-span-2 space-y-6">
                  <div className="bg-paper/10 border border-fog/50 p-6 rounded-lg space-y-6 flex flex-col justify-between min-h-[300px]">
                    <div className="space-y-4">
                      {/* Q Ref */}
                      <div className="flex justify-between items-center border-b border-fog/30 pb-2">
                        <span className="text-[10px] font-extrabold text-brass uppercase tracking-widest font-sans">
                          Question {form990ActiveIndex + 1} of 12
                        </span>
                        <span className="text-[10px] font-bold bg-slate-100 text-slate-600 px-2 py-0.5 rounded font-sans">
                          IRS Reference: {form990Questions[form990ActiveIndex].line}
                        </span>
                      </div>

                      {/* Question Text */}
                      <p className="font-serif text-lg sm:text-xl font-bold text-ink italic leading-relaxed">
                        "{parseTextWithStatutesAndGlossary(form990Questions[form990ActiveIndex].question)}"
                      </p>
                    </div>

                    {/* YES/NO buttons */}
                    <div className="space-y-3 shrink-0 pt-4">
                      <div className="flex gap-4">
                        <button
                          onClick={() => handleAnswerForm990(form990Questions[form990ActiveIndex].id, 'yes')}
                          className={`w-full py-3.5 rounded-lg border font-bold text-xs uppercase tracking-wider transition-all flex items-center justify-center gap-2 cursor-pointer ${
                            form990Answers[form990Questions[form990ActiveIndex].id] === 'yes'
                              ? 'bg-emerald-50 border-emerald-500 text-emerald-700 ring-2 ring-emerald-500/20'
                              : 'bg-white border-fog hover:bg-slate-50 text-slate-700'
                          }`}
                        >
                          <Check className="w-4 h-4" />
                          <span>YES</span>
                        </button>
                        <button
                          onClick={() => handleAnswerForm990(form990Questions[form990ActiveIndex].id, 'no')}
                          className={`w-full py-3.5 rounded-lg border font-bold text-xs uppercase tracking-wider transition-all flex items-center justify-center gap-2 cursor-pointer ${
                            form990Answers[form990Questions[form990ActiveIndex].id] === 'no'
                              ? 'bg-rose-50 border-rose-500 text-rose-700 ring-2 ring-rose-500/20'
                              : 'bg-white border-fog hover:bg-slate-50 text-slate-700'
                          }`}
                        >
                          <X className="w-4 h-4" />
                          <span>NO</span>
                        </button>
                      </div>

                      {/* Prev/Next buttons */}
                      <div className="flex justify-between pt-2">
                        <button
                          disabled={form990ActiveIndex === 0}
                          onClick={() => setForm990ActiveIndex(prev => prev - 1)}
                          className="px-4 py-2 border border-fog/60 hover:border-ink rounded text-xs font-bold text-slate-brand disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer uppercase tracking-wider"
                        >
                          Prev
                        </button>
                        <button
                          disabled={form990ActiveIndex === 11}
                          onClick={() => setForm990ActiveIndex(prev => prev + 1)}
                          className="px-4 py-2 border border-fog/60 hover:border-ink rounded text-xs font-bold text-slate-brand disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer uppercase tracking-wider"
                        >
                          Next
                        </button>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Right: Lawyer Guidance */}
                <div className="bg-paper/20 border border-fog/40 p-6 rounded-lg space-y-4 text-left">
                  <div className="flex items-center gap-1.5 text-ink/40 border-b border-fog/30 pb-2">
                    <Scale className="w-4 h-4 text-ink/40" />
                    <span className="text-[10px] font-extrabold uppercase tracking-widest font-sans">
                      Attorney Guidance
                    </span>
                  </div>

                  <p className="text-xs text-ink/75 leading-relaxed font-sans font-medium">
                    {parseTextWithStatutesAndGlossary(form990Questions[form990ActiveIndex].guidance)}
                  </p>

                  <div className="pt-4 border-t border-fog/30 space-y-2 font-sans">
                    <span className="text-[9px] font-extrabold text-ink/50 uppercase tracking-widest block">
                      Target IRS Configuration:
                    </span>
                    <span className={`inline-flex items-center gap-1 px-2 py-0.5 border text-[10px] font-extrabold uppercase tracking-wider rounded ${
                      form990Questions[form990ActiveIndex].optimal === 'yes'
                        ? 'bg-emerald-50 border-emerald-300 text-emerald-700'
                        : 'bg-rose-50 border-rose-300 text-rose-700'
                    }`}>
                      Optimal Response: {form990Questions[form990ActiveIndex].optimal.toUpperCase()}
                    </span>

                    {/* Active Question Compliance state message */}
                    <div className="pt-2">
                      <span className="text-[9px] font-extrabold text-ink/50 uppercase tracking-widest block mb-1">
                        Your Compliance State:
                      </span>
                      {form990Answers[form990Questions[form990ActiveIndex].id] ? (
                        form990Answers[form990Questions[form990ActiveIndex].id] === form990Questions[form990ActiveIndex].optimal ? (
                          <div className="text-xs text-emerald-800 font-bold bg-emerald-50 border border-emerald-200/50 p-2.5 rounded">
                            ✓ Safe Harbor Compliant
                          </div>
                        ) : (
                          <div className="text-xs text-rose-800 font-bold bg-rose-50 border border-rose-200/50 p-2.5 rounded space-y-1">
                            <div>⚠ High Audit Exposure!</div>
                            <p className="text-[10px] font-normal text-ink/80 leading-relaxed font-sans">
                              Answering non-optimally raises flags on IRS schedules. Consider consulting specialized legal counsel to adopt standard safe harbors.
                            </p>
                          </div>
                        )
                      ) : (
                        <div className="text-xs text-ink/50 italic bg-slate-50 border border-slate-200/30 p-2.5 rounded">
                          Unanswered... select YES or NO to evaluate.
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Reset Confirmation Modal */}
      {isResetModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          {/* Backdrop */}
          <div 
            className="absolute inset-0 bg-ink/40 backdrop-blur-sm transition-opacity"
            onClick={() => setIsResetModalOpen(false)}
          />
          
          {/* Modal Card */}
          <div className="relative bg-white rounded-xl shadow-xl max-w-md w-full border border-fog p-6 text-left space-y-5">
            <div className="flex items-center gap-3 text-burgundy">
              <div className="w-10 h-10 rounded-full bg-burgundy/10 flex items-center justify-center shrink-0">
                <RefreshCw className="w-5 h-5 animate-spin-hover" />
              </div>
              <h3 className="font-serif font-bold text-lg text-ink">
                Reset All Platform Data?
              </h3>
            </div>
            
            <p className="text-sm text-ink/70 leading-relaxed font-sans">
              This action will permanently erase your local progress, completed quiz scores, flagged budget lines, sorted delegation maps, and article reading marks across the entire CDX Boardroom platform. This cannot be undone.
            </p>
            
            <div className="flex items-center justify-end gap-3 pt-2">
              <button
                onClick={() => setIsResetModalOpen(false)}
                className="px-4 py-2 bg-paper/20 hover:bg-fog text-ink text-xs font-bold uppercase tracking-wider rounded transition-premium cursor-pointer"
              >
                Cancel
              </button>
              <button
                onClick={handleResetAll}
                className="px-4 py-2 bg-burgundy hover:bg-ink text-white text-xs font-bold uppercase tracking-wider rounded transition-premium cursor-pointer shadow-sm font-semibold"
              >
                Reset Everything
              </button>
            </div>
          </div>
        </div>
      )}
    </Layout>
  );
};

export default Tools;
