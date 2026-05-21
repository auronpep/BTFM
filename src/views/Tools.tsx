import React, { useState, useEffect } from 'react';
import { useRouter } from '../components/Router';
import { Layout } from '../components/Layout';
import { 
  Award, FileText, ShieldCheck, Scale, Landmark, ChevronRight, Activity, 
  ArrowRight, RefreshCw, X, Copy, Check, Printer, Sparkles, AlertTriangle, FileQuestion
} from 'lucide-react';

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

export const Tools: React.FC = () => {
  const { navigate } = useRouter();
  const [isResetModalOpen, setIsResetModalOpen] = useState(false);
  const [isScriptSandboxOpen, setIsScriptSandboxOpen] = useState(false);
  const [isCertificateOpen, setIsCertificateOpen] = useState(false);
  const [userOrgName, setUserOrganizationName] = useState('Our Charitable Board');
  const [copySuccess, setCopySuccess] = useState(false);

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
          rationale: 'Required by California self-dealing safe harbors and IRS conflicts of interest standards.',
          targetResponse: '"The Executive was in the room to answer questions but did not cast a vote."',
          counterStrike: 'Presence during the debate destroys the recusal safe harbor. California law requires complete absence during deliberations to prevent undue influence. The minutes must show they left the room prior to any executive payroll discussion.'
        }
      ]
    },
    'self-dealing': {
      id: 'self-dealing',
      title: 'Spousal Vendor Conflict',
      problem: 'A $15,000 web contract awarded to the Executive Director\'s spouse without bids.',
      statute: 'CA Corp Code § 5233 / Bylaws § 7',
      statuteTitle: 'California Statutory Self-Dealing Prohibition',
      target: 'Executive Director & Board Secretary',
      questions: [
        {
          question: 'Since this marketing contract was awarded to your spouse\'s LLC, did the board obtain and evaluate at least two other competitive independent bids before signing?',
          rationale: 'Fulfills the duty to prove the organization could not secure a more advantageous arrangement with reasonable effort.',
          targetResponse: '"They gave us a spousal discount, so they were obviously the cheapest and best option."',
          counterStrike: 'An untested spousal discount is not a legal substitute for independent bids. Under CA Corp Code § 5233, any transaction with a spousal entity is a "self-dealing transaction" and is voidable by the Attorney General unless disinterested directors prove they vetted other market options beforehand.'
        },
        {
          question: 'Was this transaction formally disclosed, debated, and approved by a vote of the disinterested directors *prior* to executing the contract?',
          rationale: 'Ensures the contract was approved in good faith by disinterested members.',
          targetResponse: '"The Executive Director signed it under their general operational spending authority, and the board reviewed it later."',
          counterStrike: 'A conflicted contract cannot be authorized retroactively by the executive alone. Self-dealing safe harbor rules require explicit advance board approval by disinterested directors. If signed without advance board action, individual directors may face personal restitution demands from the CA AG.'
        }
      ]
    },
    'payroll-taxes': {
      id: 'payroll-taxes',
      title: 'Deferred Payroll Tax Exposures',
      problem: 'Withholding taxes unpaid to conserve cash, creating direct joint-and-several director liability.',
      statute: 'IRC § 6672 / CA UI Code § 1735',
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
      statuteTitle: 'California Charitable Trust Doctrine',
      target: 'Executive Director & Treasurer',
      questions: [
        {
          question: 'Did we secure explicit written donor consent or a California court order before utilizing these restricted scholarship funds to cover administrative payroll?',
          rationale: 'Donor restrictions are legally binding trusts under the California Charitable Trust Doctrine.',
          targetResponse: '"It was a temporary loan to cover payroll during a cash gap; we will reimburse the account once funding arrives."',
          counterStrike: 'Hardship does not authorize a loan from restricted trust funds. Diverting restricted assets for general overhead is a breach of trust under CA Gov Code § 12580. The California Attorney General actively prosecutes board members for restricted fund diversion, demanding personal restitution of the diverted funds.'
        }
      ]
    }
  };

  const loadLabStates = () => {
    // 1. Self assessment
    const selfScore = localStorage.getItem('cdx_self_assessment_score');
    const selfLevel = localStorage.getItem('cdx_self_assessment_level');

    // 2. Board packet
    let packetCount = 0;
    try {
      const packetSaved = localStorage.getItem('cdx_board_packet_uncovered_flags');
      if (packetSaved) {
        packetCount = JSON.parse(packetSaved).length || 0;
      }
    } catch (e) {}

    // 3. Minutes scorecard
    const minutesGrade = localStorage.getItem('cdx_minutes_scorecard_grade');
    const minutesScore = localStorage.getItem('cdx_minutes_scorecard_score');

    // 4. Budget worksheet
    let budgetCount = 0;
    try {
      const budgetSaved = localStorage.getItem('cdx_budget_audited_lines');
      if (budgetSaved) {
        budgetCount = JSON.parse(budgetSaved).length || 0;
      }
    } catch (e) {}

    // 5. Authority map
    const authScore = localStorage.getItem('cdx_authority_map_score');
    const authTotal = localStorage.getItem('cdx_authority_map_total');
    let authCount = 0;
    try {
      const authSaved = localStorage.getItem('cdx_authority_map_assignments');
      if (authSaved) {
        authCount = Object.keys(JSON.parse(authSaved)).length || 0;
      }
    } catch (e) {}

    // 6. Script Builder
    const scriptCompleted = localStorage.getItem('cdx_script_builder_completed') === 'true';

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
      'cdx_script_builder_completed'
    ];
    keysToRemove.forEach(k => localStorage.removeItem(k));
    
    for (let i = localStorage.length - 1; i >= 0; i--) {
      const key = localStorage.key(i);
      if (key && key.startsWith('cdx_feedback_status_')) {
        localStorage.removeItem(key);
      }
    }

    setLabStates({
      selfAssessment: { score: null, level: null },
      boardPacket: { count: 0 },
      minutesScorecard: { grade: null, score: null },
      budgetWorksheet: { count: 0 },
      authorityMap: { score: null, total: null, count: 0 },
      scriptBuilder: { completed: false }
    });
    
    setIsResetModalOpen(false);
  };

  // Completed Labs count out of 6
  const getCompletedLabsCount = () => {
    let completed = 0;
    if (labStates.selfAssessment.score) completed++;
    if (labStates.boardPacket.count === 9) completed++;
    if (labStates.minutesScorecard.grade) completed++;
    if (labStates.budgetWorksheet.count === 6) completed++;
    if (labStates.authorityMap.score) completed++;
    if (labStates.scriptBuilder.completed) completed++;
    return completed;
  };

  const completedCount = getCompletedLabsCount();
  const isMasteryUnlocked = completedCount >= 3;

  const handleCompleteScriptSandbox = () => {
    localStorage.setItem('cdx_script_builder_completed', 'true');
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

  const handlePrintScript = () => {
    const printWindow = window.open('', '_blank');
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
    const printWindow = window.open('', '_blank');
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
            <div class="header">California Boardroom Initiative</div>
            <div class="title">Certificate of Fiduciary Mastery</div>
            <div class="subtitle">Awarded for Educational Excellence in Nonprofit Law</div>
            
            <div class="recipient">${userOrgName}</div>
            
            <div class="prose">
              This certificate verifies that the governing directors have successfully undertaken and completed the clinical boardroom audit laboratories of the California Board Training Initiative, confirming their competency in independent oversight quorums, executive compensation reviews, conflict of interest mitigation, and restricted asset stewardship under California legal standards.
            </div>
            
            <div class="footer-grid">
              <div class="signature-block">
                <div class="sig-name" style="font-size: 14px; margin-bottom: 4px;">Myron Steeves, J.D.</div>
                <div class="line"></div>
                <div>Dean, California Boardroom Initiative</div>
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
      description: "A 10-question dynamic diagnostic evaluating your board size, independent quorums, meeting prep, and insurance posture against California AG standards.",
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
    }
  ];

  return (
    <Layout>
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

          {/* Tools Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {toolItems.map((tool) => (
              <div
                key={tool.id}
                onClick={() => {
                  if (tool.id === 'script-builder') {
                    setIsScriptSandboxOpen(true);
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

                <div className="px-6 py-4 bg-paper/10 border-t border-fog/60 flex items-center justify-between text-xs font-bold text-slate-brand uppercase tracking-wider">
                  <span>Client-Side Lab</span>
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
                  <label className="text-[10px] font-extrabold text-ink/50 uppercase tracking-widest">
                    Governance Dispute Track
                  </label>
                  <select 
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
                  <p className="text-ink/75 leading-relaxed font-sans">{scriptTemplates[selectedScriptId].problem}</p>
                  <div className="pt-2 border-t border-fog/30">
                    <span className="font-bold text-ink uppercase tracking-wide text-[9px] block">Statutory Standard:</span>
                    <span className="text-burgundy font-bold text-[11px] block mt-0.5">{scriptTemplates[selectedScriptId].statute}</span>
                    <span className="text-[10px] text-ink/65 leading-normal block">{scriptTemplates[selectedScriptId].statuteTitle}</span>
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
                        "{q.question}"
                      </p>
                      <p className="text-xs text-ink/50 leading-relaxed italic">
                        <strong>Legal Rationale:</strong> {q.rationale}
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
                          {q.counterStrike}
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
              <label className="text-[9px] font-extrabold text-ink/40 uppercase tracking-widest block text-left">
                Nonprofit Organization / Board Name
              </label>
              <input 
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
                California Boardroom Initiative
              </span>
              <h4 className="text-lg font-bold text-ink">
                Certificate of Fiduciary Mastery
              </h4>
              <p className="text-base font-bold text-ink/95 border-b border-brass/30 inline-block px-4 pb-0.5">
                {userOrgName}
              </p>
              <p className="text-[10px] text-ink/75 leading-relaxed max-w-sm mx-auto font-sans">
                Acknowledged for educational excellence in California nonprofit governance audit, quorums, and restricted asset stewardship.
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
