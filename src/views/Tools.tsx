import React, { useState, useEffect } from 'react';
import { useRouter } from '../components/Router';
import { Layout } from '../components/Layout';
import { Award, FileText, ShieldCheck, Scale, Landmark, ChevronRight, Activity, ArrowRight, RefreshCw } from 'lucide-react';

export const Tools: React.FC = () => {
  const { navigate } = useRouter();
  const [isResetModalOpen, setIsResetModalOpen] = useState(false);

  const [labStates, setLabStates] = useState({
    selfAssessment: { score: null as string | null, level: null as string | null },
    boardPacket: { count: 0 },
    minutesScorecard: { grade: null as string | null, score: null as string | null },
    budgetWorksheet: { count: 0 },
    authorityMap: { score: null as string | null, total: null as string | null, count: 0 }
  });

  useEffect(() => {
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

    setLabStates({
      selfAssessment: { score: selfScore, level: selfLevel },
      boardPacket: { count: packetCount },
      minutesScorecard: { grade: minutesGrade, score: minutesScore },
      budgetWorksheet: { count: budgetCount },
      authorityMap: { score: authScore, total: authTotal, count: authCount }
    });
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
      'inperson_inquiries'
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
      authorityMap: { score: null, total: null, count: 0 }
    });
    
    setIsResetModalOpen(false);
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
            <div className="pt-2 flex justify-center">
              <button
                onClick={() => setIsResetModalOpen(true)}
                className="inline-flex items-center gap-1.5 text-xs text-ink/50 hover:text-burgundy font-semibold tracking-wide transition-premium cursor-pointer py-1.5 px-3 rounded-md hover:bg-burgundy/5 border border-transparent hover:border-burgundy/15"
              >
                <RefreshCw className="w-3.5 h-3.5" />
                <span>Reset All Platform Lab Data</span>
              </button>
            </div>
          </div>

          {/* Tools Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {toolItems.map((tool) => (
              <div
                key={tool.id}
                onClick={() => navigate(tool.path)}
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
