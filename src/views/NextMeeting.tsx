import React, { useState } from 'react';
import { useRouter } from '../components/Router';
import { Layout } from '../components/Layout';
import { 
  AskThisCard, 
  DoNotDoThisCard, 
  MinutesShouldShowCard, 
  CaliforniaNoteBadge 
} from '../components/BoardroomCards';
import { Calendar, FileText, ChevronDown, ChevronUp, Printer, CheckSquare, ShieldCheck, ChevronRight, Activity, RefreshCw, AlertCircle, Square, Download, Clock, Sparkles } from 'lucide-react';

interface AgendaItem {
  id: string;
  title: string;
  category: string;
  requiredFiles: string[];
  statuteBadge?: { statute: string; text: string };
  askScript: { question: string; rationale: string; targetRole?: string };
  warning: { title: string; items: string[]; consequence?: string };
  minutesMock: { agendaItem: string; mockMinutes: string; whyItMatters: string };
}

export const NextMeeting: React.FC = () => {
  const { navigate } = useRouter();
  const [expandedTopic, setExpandedTopic] = useState<string | null>('budget-approval');

  // Meeting date state loaded from/saved to local storage
  const [meetingDate, setMeetingDate] = useState(() => {
    return localStorage.getItem('cdx_meeting_reminder_date') || '';
  });

  const handleMeetingDateChange = (dateVal: string) => {
    setMeetingDate(dateVal);
    localStorage.setItem('cdx_meeting_reminder_date', dateVal);
  };

  const getCalculatedDeadlines = (dateStr: string) => {
    if (!dateStr) return null;
    // Force user's local timeline by appending T00:00:00
    const meetDate = new Date(dateStr + 'T00:00:00');
    
    // 10 days notice
    const noticeDate = new Date(meetDate);
    noticeDate.setDate(meetDate.getDate() - 10);
    
    // 5 days board packet delivery
    const packetDate = new Date(meetDate);
    packetDate.setDate(meetDate.getDate() - 5);
    
    // 3 days financial final audit
    const financialDate = new Date(meetDate);
    financialDate.setDate(meetDate.getDate() - 3);

    return {
      meeting: meetDate,
      notice: noticeDate,
      packet: packetDate,
      financial: financialDate
    };
  };

  const deadlines = getCalculatedDeadlines(meetingDate);

  const formatDateFriendly = (d: Date) => {
    return d.toLocaleDateString('en-US', {
      weekday: 'short',
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };

  const handleDownloadTimelineICS = () => {
    const dls = getCalculatedDeadlines(meetingDate);
    if (!dls) return;

    const formatDateICS = (d: Date) => {
      const year = d.getFullYear();
      const month = String(d.getMonth() + 1).padStart(2, '0');
      const day = String(d.getDate()).padStart(2, '0');
      return `${year}${month}${day}T090000`; // 9:00 AM local
    };

    const formatEndICS = (d: Date) => {
      const year = d.getFullYear();
      const month = String(d.getMonth() + 1).padStart(2, '0');
      const day = String(d.getDate()).padStart(2, '0');
      return `${year}${month}${day}T100000`; // 10:00 AM local
    };

    const createEvent = (start: Date, end: Date, summary: string, description: string) => {
      return [
        'BEGIN:VEVENT',
        `UID:${Date.now()}-${Math.random().toString(36).substr(2, 9)}@cdxboardroom.org`,
        `DTSTAMP:${formatDateICS(new Date())}Z`,
        `DTSTART;TZID=America/Los_Angeles:${formatDateICS(start)}`,
        `DTEND;TZID=America/Los_Angeles:${formatEndICS(end)}`,
        `SUMMARY:CDX: ${summary}`,
        `DESCRIPTION:${description.replace(/\n/g, '\\n')}`,
        'BEGIN:VALARM',
        'TRIGGER:-PT12H', // 12-hour reminder
        'ACTION:DISPLAY',
        `DESCRIPTION:Reminder: ${summary}`,
        'END:VALARM',
        'END:VEVENT'
      ].join('\r\n');
    };

    const calHeader = [
      'BEGIN:VCALENDAR',
      'VERSION:2.0',
      'PRODID:-//CDX Boardroom//Timeline Planner//EN',
      'CALSCALE:GREGORIAN',
      'METHOD:PUBLISH'
    ].join('\r\n');

    const calFooter = 'END:VCALENDAR';

    const events = [
      createEvent(
        dls.notice, 
        dls.notice, 
        'Statutory 10-Day Board Meeting Notice Deadline', 
        'Formal board meeting notice must typically be transmitted at least 10 days in advance under most state corporate codes (including California Corporations Code § 5015). Ensure you have sent the agenda and notice of physical/digital location via email or letter.'
      ),
      createEvent(
        dls.packet, 
        dls.packet, 
        '5-Day Board Packet Delivery Target (Duty of Care)', 
        'To fulfill standard fiduciary Duty of Care requirements (such as California Corporations Code § 5231), a complete board packet (prior minutes, executive summaries, draft budget, and financial comparisons) should be in the hands of directors at least 5 days in advance, allowing for reasonable pre-meeting study.'
      ),
      createEvent(
        dls.financial, 
        dls.financial, 
        '3-Day Financial & Deviation Report Final Audit', 
        'Target deadline for the Treasurer/CFO to finalize the budget deviation spreadsheets, ensuring all material expenditure changes have written narrative explanations before the board votes.'
      ),
      createEvent(
        dls.meeting, 
        dls.meeting, 
        'Official CDX Board Meeting & Resolutions Vote', 
        'Formal Board Meeting. Review budget approvals, executive compensation reasonableness, and conflict disclosures. Ensure all independent recusals are meticulously recorded in the final minutes.'
      )
    ].join('\r\n');

    const icsContent = `${calHeader}\r\n${events}\r\n${calFooter}`;
    const blob = new Blob([icsContent], { type: 'text/calendar;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', `cdx_board_meeting_timeline_${meetingDate}.ics`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Agenda Sliders State (40-40-20 Rule)
  const [sliders, setSliders] = useState(() => {
    try {
      const saved = localStorage.getItem('cdx_agenda_sliders_allocation');
      return saved ? JSON.parse(saved) : { routine: 40, strategy: 40, risk: 20 };
    } catch {
      return { routine: 40, strategy: 40, risk: 20 };
    }
  });

  // Checklist State for Required Files
  const [checkedFiles, setCheckedFiles] = useState<Record<string, boolean>>(() => {
    try {
      const saved = localStorage.getItem('cdx_next_meeting_checked_files');
      return saved ? JSON.parse(saved) : {};
    } catch {
      return {};
    }
  });

  const handleSliderChange = (key: 'routine' | 'strategy' | 'risk', newVal: number) => {
    setSliders((prev: { routine: number; strategy: number; risk: number }) => {
      const currentVal = prev[key];
      if (newVal === currentVal) return prev;

      // Ensure boundary [0, 100]
      const val = Math.max(0, Math.min(100, newVal));

      const otherKeys = (['routine', 'strategy', 'risk'] as const).filter(k => k !== key);
      const k1 = otherKeys[0];
      const k2 = otherKeys[1];

      const v1 = prev[k1];
      const v2 = prev[k2];

      const remaining = 100 - val;
      let newV1 = 0;
      let newV2 = 0;

      if (v1 + v2 > 0) {
        newV1 = Math.round((v1 / (v1 + v2)) * remaining);
        newV2 = remaining - newV1;
      } else {
        newV1 = Math.round(remaining / 2);
        newV2 = remaining - newV1;
      }

      const next = {
        [key]: val,
        [k1]: newV1,
        [k2]: newV2
      } as typeof prev;

      localStorage.setItem('cdx_agenda_sliders_allocation', JSON.stringify(next));
      return next;
    });
  };

  const handleToggleFile = (topicId: string, file: string) => {
    setCheckedFiles(prev => {
      const key = `${topicId}-${file}`;
      const next = {
        ...prev,
        [key]: !prev[key]
      };
      localStorage.setItem('cdx_next_meeting_checked_files', JSON.stringify(next));
      return next;
    });
  };

  const handleResetTopicChecklist = (topicId: string, files: string[]) => {
    setCheckedFiles(prev => {
      const next = { ...prev };
      files.forEach(file => {
        delete next[`${topicId}-${file}`];
      });
      localStorage.setItem('cdx_next_meeting_checked_files', JSON.stringify(next));
      return next;
    });
  };

  // Compute grading
  const getAgendaGrade = () => {
    const { routine, strategy, risk } = sliders;
    if (strategy >= 35 && risk >= 15 && routine <= 45) {
      return {
        grade: 'A',
        color: 'border-emerald-500 bg-emerald-50/50 text-emerald-800',
        badge: 'bg-emerald-600 text-white',
        text: 'EXCELLENT BALANCE. Your board is allocating prime brainpower to strategic and risk management oversight, satisfying California\'s Duty of Care standards and safe harbor expectations.'
      };
    } else if (routine > 55) {
      return {
        grade: 'F',
        color: 'border-burgundy/40 bg-burgundy/5 text-burgundy',
        badge: 'bg-burgundy text-white',
        text: 'WARNING: REPORT OVERLOAD. More than 55% of the meeting is wasted on retrospective officer reports. This leaves your board unshielded from hidden regulatory violations and breaches of Duty of Care.'
      };
    } else {
      return {
        grade: 'C',
        color: 'border-brass bg-brass/5 text-ink/80',
        badge: 'bg-brass text-ink font-bold',
        text: 'SUB-OPTIMAL BALANCE. Too much focus is placed on routine reports rather than forward-looking strategy or compliance audits. Try shifting at least 40% to strategy and 20% to risk.'
      };
    }
  };

  const grading = getAgendaGrade();

  // Database of 9 high-stakes agenda topics
  const agendaTopics: AgendaItem[] = [
    {
      id: "budget-approval",
      title: "1. Annual Program Budget Review and Approval",
      category: "Finance",
      requiredFiles: [
        "Complete FY2027 Line-Item Draft Budget (excel & pdf)",
        "Written Narrative Explaining the Ten Largest Deviations from previous year",
        "3-Year Projected Program Enrollment & Cash Projections"
      ],
      statuteBadge: { statute: "CA Corp Code § 5239", text: "Duty of Care / Budget Limitation standards apply." },
      askScript: {
        question: "What are the ten biggest cost and revenue deviations from our current year's actual expenditures, and what is the narrative behind those variances?",
        rationale: "Ensures the board understands where spending increases are occurring and why, validating the Duty of Care.",
        targetRole: "the Chief Financial Officer"
      },
      warning: {
        title: "The Retrospective Budget Approval",
        items: [
          "Do not allow the fiscal year to begin without an approved board budget.",
          "Do not let the CEO adjust staff salaries beyond the total limits set in the budget.",
          "Do not approve a vague cash-summary budget without detailed line-items."
        ],
        consequence: "Operating without an approved board budget means the officers are spending corporate funds without board authorization, which is a breach of corporate governance."
      },
      minutesMock: {
        agendaItem: "Fiscal Year 2027 Budget Review and Adoption",
        mockMinutes: "The CFO presented the complete line-item draft budget for FY2027. The Board reviewed the 10 largest budget deviations from the prior year, specifically the 12% increase in health benefit costs. Upon motion duly made and seconded, the FY2027 budget was adopted as presented, setting a legal operational expenditure limit of $3.2M.",
        whyItMatters: "Proves that the board actively debated the budget line items and set a binding legal limit on spending."
      }
    },
    {
      id: "executive-compensation",
      title: "2. CEO/ED Salary & Compensation Review",
      category: "Legal & Fiduciary",
      requiredFiles: [
        "Executive Salary Survey Report for Regional and California Organizations",
        "Current CEO Employment Contract & Performance Reviews",
        "Disinterested Director Recusal Resolution Form"
      ],
      statuteBadge: { statute: "IRC § 4958", text: "Satisfy Rebuttable Presumption of Reasonableness." },
      askScript: {
        question: "Does our proposed executive salary package stay within the 50th to 75th percentile of comparable market compensation data (such as peer regional or California surveys), and does the Executive Director agree to step out during discussion?",
        rationale: "Establishes compliance with the IRS safe harbor compensation standard, protecting board members from personal excise tax fines.",
        targetRole: "the Board Chair"
      },
      warning: {
        title: "Interested Voting on Payroll",
        items: [
          "Do not vote on the ED's salary with the ED or their relatives in the room.",
          "Do not approve an executive bonus or salary raise without compiling written comparable market data.",
          "Do not treat compensation as a casual discussion without a formal, voted resolution."
        ],
        consequence: "Failing to document comparable data results in immediate IRS reclassification of compensation as an 'Excess Benefit Transaction,' carrying personal excise fines up to 200%."
      },
      minutesMock: {
        agendaItem: "Executive Compensation Approval",
        mockMinutes: "The President (CEO) and her sister-in-law (Director) recused themselves from the meeting and physically left the room. The remaining three disinterested directors (constituting a quorum) reviewed comparable regional and California nonprofit organization salary surveys for literacy programs. Based on this data, the board voted unanimously to approve a base salary of $72,000 for the CEO, effective immediately.",
        whyItMatters: "Meticulously documents recusal and reliance on written comparable surveys, achieving full IRS safe harbor."
      }
    },
    {
      id: "conflict-of-interest",
      title: "3. Annual Conflict Disclosure & Transactions Approval",
      category: "Legal",
      requiredFiles: [
        "Written Conflict of Interest Policy (Signed by all Directors)",
        "Annual Disclosure Statement Questionnaire",
        "Bids for Contested Contractor Service Contracts"
      ],
      statuteBadge: { statute: "CA Corp Code § 5227", text: "Duty of Loyalty / 51% Independent Board rule." },
      askScript: {
        question: "Is there any business or personal relationship between our newly appointed software contractor and any director or officer on this board?",
        rationale: "Identifies hidden self-dealing transactions, protecting directors from breaches of the Duty of Loyalty.",
        targetRole: "the President"
      },
      warning: {
        title: "Unvoted Self-Dealing Contracts",
        items: [
          "Do not approve a contract with a director's private business without a competitive bid process.",
          "Do not allow the interested director to vote on or run the discussion of their contract.",
          "Do not make loans of corporate funds to any director, officer, or key employee."
        ],
        consequence: "In most jurisdictions (including California under Corporations Code § 5236), loans to officers are strictly illegal, and unvoted conflict contracts are voidable by the Attorney General, creating personal director liability."
      },
      minutesMock: {
        agendaItem: "Approval of Software Contract Conflict Transaction",
        mockMinutes: "Director Harris disclosed that his firm bids on the website development project. Harris recused himself and left the room during discussion. The board compared three independent bids and resolved that Harris's firm provided the best value at $12,000. The motion carried with Harris recused.",
        whyItMatters: "Proves that the board compared competitive bids, negotiated in good faith, and voted disinterestedly."
      }
    },
    {
      id: "youth-screening",
      title: "4. Physical Safety & Live Scan Screening Audits",
      category: "Safety",
      requiredFiles: [
        "Live Scan Background Check Registry Report",
        "Harassment and Abuse Prevention Policy Manual",
        "Employee and Volunteer Onboarding Safety Log"
      ],
      statuteBadge: { statute: "CA Gov Code § 12580", text: "Physical Safety and Youth Protection requirements." },
      askScript: {
        question: "Are we 100% caught up on our background Live Scan checks for every staff member and volunteer, and are there any unscreened mentors working in programs?",
        rationale: "Fulfills the Safety job of the board by demanding operational safety verification.",
        targetRole: "the Executive Director"
      },
      warning: {
        title: "Allowing Unscreened Volunteers",
        items: [
          "Do not let any staff or volunteer mentor work with youth before background checks clear.",
          "Do not treat safety screening as a secondary administrative task that can backlog.",
          "Do not allow youth mentors to drive program participants home alone in private vehicles."
        ],
        consequence: "Failing to enforce background checks results in personal corporate and civil exposure for directors under gross negligence if an abuse incident occurs."
      },
      minutesMock: {
        agendaItem: "Quarterly Safety and Screening Compliance Report",
        mockMinutes: "The Program Director presented the Live Scan screening log. The Board verified that all 18 volunteer mentors have successfully cleared background screening prior to participating in mentoring sessions. The Board accepted the report and directed that a safety audit occur quarterly.",
        whyItMatters: "Formally records active board monitoring of youth safety compliance, defending against claims of negligent oversight."
      }
    },
    {
      id: "audit-committee",
      title: "5. Standalone Audit Committee Establishment",
      category: "Audit & Finance",
      requiredFiles: [
        "Independent Auditor Bid Proposals",
        "Audit Committee Charter draft",
        "Board Resolution establishing Standalone Audit Committee"
      ],
      statuteBadge: { statute: "CA Gov Code § 12586(e)", text: "Required standalone committee for $2M+ revenues." },
      askScript: {
        question: "Does our proposed Audit Committee contain zero staff members, zero officers, and no Treasurer, in accordance with state statutory thresholds (such as the California Nonprofit Integrity Act)?",
        rationale: "Ensures the committee is structured with complete independent, disinterested oversight.",
        targetRole: "the Board President"
      },
      warning: {
        title: "Shared Finance and Audit Chairs",
        items: [
          "Do not allow the Treasurer to serve as the Audit Committee Chair.",
          "Do not let the Executive Director or staff members serve as voting members on the Audit Committee.",
          "Do not allow the Finance Committee to make up 50% or more of the Audit Committee seats."
        ],
        consequence: "Failing to isolate the Audit Committee from the Finance Committee violates standard corporate independence rules (and is a statutory violation in states like California under Gov. Code § 12586), leading to loss of corporate standing."
      },
      minutesMock: {
        agendaItem: "Resolution of Standalone Audit Committee Establishment",
        mockMinutes: "Pursuant to CA Government Code § 12586(e), the Board resolved to establish a standalone Audit Committee consisting of Director Martinez (Chair) and Director Smith. The board confirmed that neither member is an employee, officer, or member of the Finance Committee, and neither serves as Treasurer.",
        whyItMatters: "Proves compliance with California's strict independent audit committee membership rules."
      }
    },
    {
      id: "si-100-renewal",
      title: "6. Biennial Statement of Information (SI-100)",
      category: "Legal & Registry",
      requiredFiles: [
        "Form SI-100 Statement of Information copy",
        "Secretary of State filing receipt",
        "Agent for Service of Process Verification"
      ],
      statuteBadge: { statute: "CA Corp Code § 6210", text: "Mandatory filing every two years." },
      askScript: {
        question: "Have we filed our Statement of Information with the Secretary of State this year, and is our Agent for Service of Process physical address current?",
        rationale: "Ensures the corporation maintains active legal existence, avoiding default fines and suspensions.",
        targetRole: "the Board Secretary"
      },
      warning: {
        title: "Neglecting Biennial Filings",
        items: [
          "Do not let officers change (such as electing a new President) without updating Form SI-100 within 30 days.",
          "Do not miss the biennial filing window (anniversary month of incorporation).",
          "Do not use an unverified or outdated physical address for your Agent for Service of Process."
        ],
        consequence: "Failing to file results in an automatic, non-negotiable $250 penalty and immediate corporate suspension, rendering contracts unenforceable."
      },
      minutesMock: {
        agendaItem: "Statement of Information Filing Review",
        mockMinutes: "The Secretary presented the completed copy of standard periodic state filings (such as Form SI-100 filed with the California Secretary of State) on April 12, 2026, listing current corporate officers and Agent for Service of Process. The filing was approved for the corporate records binder.",
        whyItMatters: "Establishes that the board actively tracked and verified its biennial Secretary of State filings."
      }
    },
    {
      id: "general-operations",
      title: "7. General Executive Operations Review",
      category: "Strategy & Oversight",
      requiredFiles: [
        "CEO Quarterly Narrative Progress Report",
        "Key Performance Indicators (KPIs) Scorecard",
        "Employee Grievance & Turnover Report Log"
      ],
      statuteBadge: { statute: "CA Corp Code § 5210", text: "Corporate affairs overseen by board." },
      askScript: {
        question: "Does the current operational progress report align with our approved strategic objectives, and do we have any pending personnel disputes?",
        rationale: "Allows the board to review operations comprehensively without meddling in daily staff affairs.",
        targetRole: "the President"
      },
      warning: {
        title: "Meddling in Operational Management",
        items: [
          "Do not instruct program managers or staff directly between meetings.",
          "Do not require the CEO to get board approval for minor expenditures under $5,000.",
          "Do not ignore executive director burnout or heavy staff turnover logs."
        ],
        consequence: "Board meddling destroys employee morale and disrupts the chain of command, opening the corporation to labor and contract disputes."
      },
      minutesMock: {
        agendaItem: "President's Quarterly Narrative Review",
        mockMinutes: "The CEO presented the quarterly narrative report, highlighting progress on the shelter enrollment program. The Board discussed program metrics and verified alignment with strategic goals. Upon motion, the operational report was accepted as presented.",
        whyItMatters: "Proves that the board was active in reviewing and accepting executive performance metrics."
      }
    },
    {
      id: "lease-review",
      title: "8. Corporate Contract and Lease Commitments",
      category: "Finance",
      requiredFiles: [
        "Main Office Lease Agreement Contract draft",
        "Legal Counsel Contract Review Memo",
        "Bylaws Signatory Authority Resolution"
      ],
      statuteBadge: { statute: "CA Corp Code § 5231", text: "Fiduciary care standard applies to major debt." },
      askScript: {
        question: "Has our legal counsel reviewed the indemnification and exit clauses in this lease, and do we have the cash reserves to cover the 3-year term?",
        rationale: "Fulfills reasonable inquiry under the Duty of Care before signing long-term debt commitments.",
        targetRole: "the Treasurer"
      },
      warning: {
        title: "Signing Contracts Without Voted Authority",
        items: [
          "Do not let the CEO sign a lease or major contract without a specific board vote.",
          "Do not agree to personal guarantees for corporate lease liabilities.",
          "Do not skip reviewing the exit or termination clauses in multi-year agreements."
        ],
        consequence: "Directors face personal liability exposure if they sign leases on behalf of suspended corporations, or agree to personal debt guarantees."
      },
      minutesMock: {
        agendaItem: "Office Lease Contract Authorization",
        mockMinutes: "The Board Chair introduced the proposed 3-year lease contract for the main program office at $3,500/month. Relying on the written review of counsel, and confirming budget availability, the Board resolved to authorize the President to execute the lease.",
        whyItMatters: "Sets a precise, voted boundary authorizing the President to act, proving active oversight of contracts."
      }
    },
    {
      id: "bylaws-update",
      title: "9. Bylaws Audit and Board Policy Updates",
      category: "Registry & Legal",
      requiredFiles: [
        "Current Corporate Bylaws Copy",
        "Board Policy Manual (BPM) draft",
        "Bylaws amendment resolution document"
      ],
      statuteBadge: { statute: "CA Gov Code § 12586", text: "Attorney General oversight of public benefit trusts." },
      askScript: {
        question: "When was the last time our bylaws were formally audited by a charity attorney, and do they align with recent federal and state registry changes?",
        rationale: "Ensures the board operates with valid, enforceable legal regulations, protecting directors from internal disputes.",
        targetRole: "the Board Chair"
      },
      warning: {
        title: "Operating Under Obsolete Regulations",
        items: [
          "Do not operate under bylaws that are over 10 years old.",
          "Do not allow the board to update bylaws without consulting qualified charity counsel.",
          "Do not ignore the requirement to file bylaws updates with the AG Registry."
        ],
        consequence: "Outdated bylaws often contain invalid quorum or voting structures, leading to corporate actions being declared void in court."
      },
      minutesMock: {
        agendaItem: "Resolution of Corporate Bylaws Update",
        mockMinutes: "The Nominating Committee presented the updated bylaws audited by qualified nonprofit counsel. After review of the updated quorum structures, the Board voted unanimously to adopt the revised bylaws as presented, directing the Secretary to file them with the Registry.",
        whyItMatters: "Proves that the board proactively audits and keeps its legal bylaws in sync with state and federal legal standards."
      }
    }
  ];

  const handleToggleTopic = (id: string) => {
    setExpandedTopic(expandedTopic === id ? null : id);
  };

  return (
    <Layout>
      <div className="py-12 bg-paper/30 min-h-screen px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto space-y-10">
          
          {/* Header */}
          <div className="text-center space-y-3">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-brass/10 border border-brass/30 text-brass rounded-full text-xs font-semibold uppercase tracking-wider">
              <Calendar className="w-4 h-4" />
              <span>Fiduciary Agenda Coordinator</span>
            </div>
            <h1 className="font-serif text-3xl sm:text-4xl text-ink font-bold tracking-wide">
              Prepare for Your Next Meeting
            </h1>
            <p className="max-w-2xl mx-auto text-sm sm:text-base text-ink/70">
              Never enter a boardroom unprepared. Select from the 9 core high-stakes agenda topics below to access required study files, risk alerts, directors scripts, and mockup minutes.
            </p>
          </div>

          {/* Meeting Advance-Timeline Planner & ICS Generator (Enhancement 2) */}
          <div className="bg-white rounded-xl border border-brass/30 p-6 sm:p-8 shadow-sm space-y-6 text-left relative overflow-hidden">
            <div className="absolute top-0 right-0 w-24 h-24 bg-brass/5 rounded-full -mr-8 -mt-8 pointer-events-none"></div>
            
            <div className="space-y-1.5">
              <div className="inline-flex items-center gap-1.5 text-xs text-brass font-bold uppercase tracking-wider">
                <Clock className="w-4 h-4 text-brass" />
                <span>Regulatory Meeting Timeline Planner</span>
              </div>
              <h2 className="font-serif text-xl sm:text-2xl text-ink font-bold tracking-tight">
                Calculate & Export Statutory Notice Milestones
              </h2>
              <p className="text-xs text-ink/75 leading-relaxed font-sans font-medium">
                State corporate codes (including the California Corporations Code) and fiduciary Duty of Care standards require key items (notices, board packets, financial statements) to be compiled and delivered strictly in advance. Input your upcoming meeting date below to establish your boardroom deadline compliance roadmap.
              </p>
            </div>

            {/* Date Input Selector */}
            <div className="flex flex-col sm:flex-row items-center gap-4 bg-paper/20 p-4 rounded-lg border border-fog/50">
              <div className="w-full sm:w-auto flex-1 space-y-1">
                <label htmlFor="meeting-date-input" className="block text-[10px] font-extrabold uppercase tracking-widest text-ink/60">
                  Select Scheduled Meeting Date
                </label>
                <input
                  id="meeting-date-input"
                  type="date"
                  value={meetingDate}
                  onChange={(e) => handleMeetingDateChange(e.target.value)}
                  className="w-full px-3 py-2 bg-white border border-fog hover:border-brass focus:border-brass focus:outline-none rounded text-sm text-ink font-bold transition-premium"
                />
              </div>
              
              {deadlines && (
                <button
                  onClick={handleDownloadTimelineICS}
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-1.5 px-5 py-3 bg-ink hover:bg-brass text-white hover:text-ink text-xs font-bold uppercase tracking-wider rounded transition-premium shadow cursor-pointer self-end"
                >
                  <Download className="w-4 h-4" />
                  <span>Download Compliance Calendar (.ics)</span>
                </button>
              )}
            </div>

            {/* Dynamic Timeline Render */}
            {deadlines ? (
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4 relative">
                  {/* Timeline Bar (desktop only) */}
                  <div className="hidden md:block absolute top-[18px] left-8 right-8 h-[2px] bg-fog/60 z-0"></div>
                  
                  {/* Node 1: Notice (10 Days) */}
                  <div className="relative z-10 flex flex-col items-center md:items-start text-center md:text-left space-y-2">
                    <div className="w-9 h-9 rounded-full bg-burgundy/10 border-2 border-burgundy flex items-center justify-center text-burgundy font-black text-xs shadow-sm">
                      -10
                    </div>
                    <div>
                      <span className="block text-[9px] font-black text-burgundy uppercase tracking-wider">Statutory Notice</span>
                      <strong className="block text-xs font-bold text-ink font-sans mt-0.5">
                        {formatDateFriendly(deadlines.notice)}
                      </strong>
                      <p className="text-[10px] text-ink/65 leading-relaxed mt-1 font-medium font-sans">
                        CA Corp Code § 5015 minimum. Formal written notice & agenda must reach all directors.
                      </p>
                    </div>
                  </div>

                  {/* Node 2: Packet Delivery (5 Days) */}
                  <div className="relative z-10 flex flex-col items-center md:items-start text-center md:text-left space-y-2">
                    <div className="w-9 h-9 rounded-full bg-teal-brand/10 border-2 border-teal-brand flex items-center justify-center text-teal-brand font-black text-xs shadow-sm">
                      -5
                    </div>
                    <div>
                      <span className="block text-[9px] font-black text-teal-brand uppercase tracking-wider">Packet Delivery</span>
                      <strong className="block text-xs font-bold text-ink font-sans mt-0.5">
                        {formatDateFriendly(deadlines.packet)}
                      </strong>
                      <p className="text-[10px] text-ink/65 leading-relaxed mt-1 font-medium font-sans">
                        Duty of Care standard. Distribute the complete package to allow meaningful review.
                      </p>
                    </div>
                  </div>

                  {/* Node 3: Financial Final (3 Days) */}
                  <div className="relative z-10 flex flex-col items-center md:items-start text-center md:text-left space-y-2">
                    <div className="w-9 h-9 rounded-full bg-slate-brand/10 border-2 border-slate-brand flex items-center justify-center text-slate-brand font-black text-xs shadow-sm">
                      -3
                    </div>
                    <div>
                      <span className="block text-[9px] font-black text-slate-brand uppercase tracking-wider">Audit Cutoff</span>
                      <strong className="block text-xs font-bold text-ink font-sans mt-0.5">
                        {formatDateFriendly(deadlines.financial)}
                      </strong>
                      <p className="text-[10px] text-ink/65 leading-relaxed mt-1 font-medium font-sans">
                        Freeze budget spreadsheets. CFO prepares written notes on the top 10 deviations.
                      </p>
                    </div>
                  </div>

                  {/* Node 4: Target Meeting Date */}
                  <div className="relative z-10 flex flex-col items-center md:items-start text-center md:text-left space-y-2">
                    <div className="w-9 h-9 rounded-full bg-brass/10 border-2 border-brass flex items-center justify-center text-brass font-black text-xs shadow-sm">
                      0
                    </div>
                    <div>
                      <span className="block text-[9px] font-black text-brass uppercase tracking-wider">Meeting Day</span>
                      <strong className="block text-xs font-bold text-ink font-sans mt-0.5">
                        {formatDateFriendly(deadlines.meeting)}
                      </strong>
                      <p className="text-[10px] text-ink/65 leading-relaxed mt-1 font-medium font-sans">
                        Conduct resolutions voting, document recusals, and establish safe harbors.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="bg-emerald-50 border border-emerald-100 p-4 rounded-lg flex gap-3 text-xs leading-relaxed font-sans font-medium text-emerald-800">
                  <Sparkles className="w-5 h-5 shrink-0 text-emerald-600 mt-0.5" />
                  <div className="space-y-1">
                    <span className="font-extrabold uppercase tracking-wide text-[9px] text-emerald-700 block">Fiduciary Timeline Initialized:</span>
                    <p>Exporting this schedule to your calendar will lock in automatic notification reminders 12 hours before each statutory milestone, ensuring absolute administrative compliance.</p>
                  </div>
                </div>
              </div>
            ) : (
              <div className="p-8 border border-dashed border-fog rounded-lg text-center bg-paper/10">
                <Clock className="w-8 h-8 text-ink/30 mx-auto mb-2" />
                <p className="text-xs text-ink/60 font-sans font-semibold">
                  No date selected. Choose your next meeting date above to compute CA statutory thresholds.
                </p>
              </div>
            )}
          </div>

          {/* Agenda Balancer Component (Enhancement 2) */}
          <div className="bg-white rounded-xl border border-fog p-6 sm:p-8 shadow-sm space-y-6 text-left">
            <div className="flex flex-col md:flex-row gap-6 items-start md:items-center justify-between border-b border-fog/60 pb-5">
              <div className="space-y-1.5 max-w-xl">
                <div className="inline-flex items-center gap-1.5 text-xs text-brass font-bold uppercase tracking-wider">
                  <Activity className="w-4 h-4" />
                  <span>The 40-40-20 Rule Agenda Balancer</span>
                </div>
                <h2 className="font-serif text-xl sm:text-2xl text-ink font-bold tracking-tight">
                  Optimize Your Boardroom Time Allocation
                </h2>
                <p className="text-xs text-ink/75 leading-relaxed font-sans font-medium">
                  Expert charity attorneys recommend spending no more than **40% of meetings on routine reports**, allocating at least **40% to forward-looking strategy**, and dedicating at least **20% to active regulatory and compliance risk audits**. Drag the sliders to grade your scheduled agenda.
                </p>
              </div>

              {/* Dynamic Grade Stamp */}
              <div className={`shrink-0 border-2 rounded-xl p-4 flex flex-col items-center justify-center w-36 h-36 ${grading.color} shadow-sm animate-fade-in`}>
                <span className="text-[10px] font-black uppercase tracking-widest text-ink/50 font-sans">Agenda Grade</span>
                <span className={`w-12 h-12 rounded-full flex items-center justify-center text-xl font-black shadow-sm ${grading.badge} mt-1.5`}>
                  {grading.grade}
                </span>
                <span className="text-[9px] font-bold text-center mt-2 font-sans">
                  {sliders.routine}% / {sliders.strategy}% / {sliders.risk}%
                </span>
              </div>
            </div>

            {/* Sliders Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-2">
              {/* Routine Reports */}
              <div className="space-y-2 bg-paper/20 p-4 rounded-lg border border-fog/40">
                <div className="flex justify-between items-center text-xs">
                  <span className="font-bold text-ink/70 uppercase tracking-wider font-sans">1. Routine Reports</span>
                  <span className="font-serif font-black text-slate-brand text-sm">{sliders.routine}%</span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={sliders.routine}
                  onChange={(e) => handleSliderChange('routine', parseInt(e.target.value))}
                  className="w-full h-1.5 bg-fog rounded-lg appearance-none cursor-pointer accent-slate-brand"
                />
                <p className="text-[10px] text-ink/50 leading-normal font-medium font-sans">
                  CEO progress, treasurer ledger summaries, previous minutes. Limit to prevent brain fatigue.
                </p>
              </div>

              {/* Strategy & Planning */}
              <div className="space-y-2 bg-paper/20 p-4 rounded-lg border border-fog/40">
                <div className="flex justify-between items-center text-xs">
                  <span className="font-bold text-ink/70 uppercase tracking-wider font-sans">2. Strategic Planning</span>
                  <span className="font-serif font-black text-teal-brand text-sm">{sliders.strategy}%</span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={sliders.strategy}
                  onChange={(e) => handleSliderChange('strategy', parseInt(e.target.value))}
                  className="w-full h-1.5 bg-fog rounded-lg appearance-none cursor-pointer accent-teal-brand"
                />
                <p className="text-[10px] text-ink/50 leading-normal font-medium font-sans">
                  Forward goals, business metrics, spousal bidding reviews, community outcomes. Target 40%+.
                </p>
              </div>

              {/* Risk & Compliance Audit */}
              <div className="space-y-2 bg-paper/20 p-4 rounded-lg border border-fog/40">
                <div className="flex justify-between items-center text-xs">
                  <span className="font-bold text-ink/70 uppercase tracking-wider font-sans">3. Risk & Compliance</span>
                  <span className="font-serif font-black text-burgundy text-sm">{sliders.risk}%</span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={sliders.risk}
                  onChange={(e) => handleSliderChange('risk', parseInt(e.target.value))}
                  className="w-full h-1.5 bg-fog rounded-lg appearance-none cursor-pointer accent-burgundy"
                />
                <p className="text-[10px] text-ink/50 leading-normal font-medium font-sans">
                  IRS compensation safe harbors, Live Scan youth audits, Statement of Information. Target 20%+.
                </p>
              </div>
            </div>

            {/* Balancer Legal Counseling Callout */}
            <div className={`p-4 rounded-lg border flex gap-3 text-xs leading-relaxed font-sans font-medium ${grading.color}`}>
              <AlertCircle className="w-5 h-5 shrink-0 mt-0.5 text-ink/65" />
              <div className="space-y-1">
                <span className="font-bold text-ink uppercase tracking-wide text-[10px] block">Attorney Advisory:</span>
                <p className="text-xs leading-relaxed text-ink/80">{grading.text}</p>
              </div>
            </div>
          </div>

          {/* Agenda Topic Desk */}
          <div className="space-y-6">
            {agendaTopics.map((topic) => {
              const isOpen = expandedTopic === topic.id;
              return (
                <div 
                  key={topic.id}
                  className={`bg-white rounded-xl shadow-sm border transition-premium overflow-hidden text-left ${
                    isOpen ? 'border-brass shadow-md' : 'border-fog/85 hover:border-brass/40'
                  }`}
                >
                  {/* Topic Title Bar (Interactive toggle trigger) */}
                  <div 
                    onClick={() => handleToggleTopic(topic.id)}
                    className="p-5 flex items-center justify-between cursor-pointer select-none bg-paper/10 border-b border-fog/60 hover:bg-paper/30 transition-premium"
                  >
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <span className="text-[9px] font-extrabold text-slate-brand uppercase tracking-widest bg-white px-2 py-0.5 rounded shadow-sm border border-fog/50">
                          {topic.category}
                        </span>
                        {/* Topic Progress Badge */}
                        {(() => {
                          const files = topic.requiredFiles;
                          const checkedCount = files.filter(f => !!checkedFiles[`${topic.id}-${f}`]).length;
                          if (checkedCount === files.length) {
                            return (
                              <span className="text-[8px] font-bold bg-emerald-50 text-emerald-700 border border-emerald-200 px-1.5 py-0.5 rounded shadow-sm">
                                READY FOR MEETING
                              </span>
                            );
                          } else if (checkedCount > 0) {
                            return (
                              <span className="text-[8px] font-bold bg-amber-50 text-amber-700 border border-amber-200 px-1.5 py-0.5 rounded shadow-sm">
                                PREP {checkedCount}/{files.length}
                              </span>
                            );
                          }
                          return null;
                        })()}
                      </div>
                      <h3 className="font-serif font-bold text-base sm:text-lg text-ink">
                        {topic.title}
                      </h3>
                    </div>
                    
                    <div className="text-brass shrink-0 pl-4 flex items-center gap-3">
                      {isOpen ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
                    </div>
                  </div>

                  {/* Expanded Content Workspace */}
                  {isOpen && (
                    <div className="p-6 sm:p-8 space-y-8 animate-fade-in bg-white border-t border-fog/25">
                      
                      {/* 1. Required Files Panel */}
                      <div className="space-y-3 text-left">
                        <div className="flex items-center justify-between border-b border-fog/40 pb-2">
                          <h4 className="font-sans font-extrabold text-xs uppercase tracking-widest text-ink/55 flex items-center gap-1.5">
                            <FileText className="w-4 h-4 text-brass" />
                            <span>Required Study Materials (Distribute 5 days prior)</span>
                          </h4>
                          
                          {/* Reset Checklist for this topic */}
                          {topic.requiredFiles.some(f => !!checkedFiles[`${topic.id}-${f}`]) && (
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                handleResetTopicChecklist(topic.id, topic.requiredFiles);
                              }}
                              className="text-[10px] font-extrabold text-burgundy hover:underline flex items-center gap-1 cursor-pointer"
                            >
                              <RefreshCw className="w-2.5 h-2.5" />
                              <span>RESET PREP</span>
                            </button>
                          )}
                        </div>
                        
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-1">
                          {topic.requiredFiles.map((file, fIdx) => {
                            const isChecked = !!checkedFiles[`${topic.id}-${file}`];
                            return (
                              <button
                                key={fIdx}
                                onClick={() => handleToggleFile(topic.id, file)}
                                className={`p-3.5 rounded-lg border flex items-start gap-2.5 text-left transition-premium cursor-pointer ${
                                  isChecked 
                                    ? 'bg-fog/10 border-fog/45 opacity-65' 
                                    : 'bg-paper/25 border-fog/50 hover:border-brass/40 hover:bg-paper/45 shadow-sm'
                                }`}
                              >
                                <div className="shrink-0 mt-0.5">
                                  {isChecked ? (
                                    <CheckSquare className="w-4 h-4 text-emerald-600" />
                                  ) : (
                                    <Square className="w-4 h-4 text-brass/70" />
                                  )}
                                </div>
                                <span className={`text-xs leading-relaxed font-sans font-medium ${
                                  isChecked ? 'line-through text-ink/40 font-normal' : 'text-ink/85'
                                }`}>
                                  {file}
                                </span>
                              </button>
                            );
                          })}
                        </div>
                      </div>

                      {/* California Code Badge */}
                      {topic.statuteBadge && (
                        <div className="text-left pt-2 border-t border-fog/30">
                          <CaliforniaNoteBadge statute={topic.statuteBadge.statute} text={topic.statuteBadge.text} />
                        </div>
                      )}

                      {/* 2. Rule & Script Questions (Left: Script, Right: Warning) */}
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-start pt-4 border-t border-fog/40">
                        <div className="space-y-2">
                          <span className="text-[10px] font-extrabold text-teal-brand uppercase tracking-widest block mb-1">Boardroom Script Question:</span>
                          <AskThisCard 
                            question={topic.askScript.question} 
                            rationale={topic.askScript.rationale} 
                            targetRole={topic.askScript.targetRole} 
                          />
                        </div>

                        <div className="space-y-2">
                          <span className="text-[10px] font-extrabold text-copper uppercase tracking-widest block mb-1">Boardroom Risk Alert:</span>
                          <DoNotDoThisCard 
                            title={topic.warning.title} 
                            items={topic.warning.items} 
                            consequence={topic.warning.consequence} 
                          />
                        </div>
                      </div>

                      {/* 3. Defensive Minutes Mockup */}
                      <div className="pt-4 border-t border-fog/40">
                        <span className="text-[10px] font-extrabold text-slate-brand uppercase tracking-widest block mb-2">Clean Boardroom Record Mockup:</span>
                        <MinutesShouldShowCard 
                          agendaItem={topic.minutesMock.agendaItem} 
                          mockMinutes={topic.minutesMock.mockMinutes} 
                          whyItMatters={topic.minutesMock.whyItMatters} 
                        />
                      </div>

                      {/* Printable Actions and Notes Footer */}
                      <div className="pt-6 border-t border-fog/60 flex flex-col sm:flex-row gap-3 justify-end items-center">
                        <button
                          onClick={() => window.print()}
                          className="w-full sm:w-auto inline-flex items-center justify-center gap-1 px-4 py-2.5 bg-paper hover:bg-fog text-ink text-xs font-bold uppercase tracking-wider rounded border border-fog transition-premium cursor-pointer"
                        >
                          <Printer className="w-4 h-4" />
                          <span>Print Topic Study Pack</span>
                        </button>
                        
                        <button
                          onClick={() => navigate('tools')}
                          className="w-full sm:w-auto inline-flex items-center justify-center gap-1 px-5 py-2.5 bg-slate-brand hover:bg-ink text-white text-xs font-bold uppercase tracking-wider rounded transition-premium shadow cursor-pointer"
                        >
                          <ShieldCheck className="w-4 h-4 text-brass" />
                          <span>Open Governance Laboratories</span>
                        </button>
                      </div>

                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {/* Consultation Reference */}
          <div className="bg-brass/5 border border-brass/20 rounded-xl p-6 text-left flex flex-col md:flex-row justify-between items-center gap-6">
            <div className="space-y-1">
              <h4 className="font-serif font-bold text-base text-ink">Bylaws, conflicts, or delinquency issues pending on your agenda?</h4>
              <p className="text-xs text-ink/70 leading-relaxed font-sans max-w-2xl">
                Preparing for a high-stakes board meeting often requires direct attorney-client review to safeguard your officers from D&O liabilities. Get counsel from NPO Lawyers.
              </p>
            </div>
            <button
              onClick={() => navigate('contact-us?topic=general&message=We%20are%20preparing%20for%20our%20next%20board%20meeting%20and%20have%20some%20bylaws%2C%20conflicts%2C%20or%20administrative%20notice%20questions%20we%20would%20like%20to%20address.')}
              className="inline-flex items-center justify-center gap-1.5 px-5 py-3 bg-brass hover:bg-ink hover:text-white text-ink text-xs font-bold uppercase tracking-wider rounded shadow transition-premium whitespace-nowrap border-0 cursor-pointer"
            >
              <span>Consult NPO Lawyers</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>

        </div>
      </div>
    </Layout>
  );
};
export default NextMeeting;
