import React, { useState, useEffect } from 'react';
import { Layout } from '../components/Layout';
import { useRouter } from '../components/Router';
import { 
  CheckCircle, Landmark, Shield, User, 
  X, Award, HelpCircle, ChevronRight
} from 'lucide-react';
import { CaliforniaNoteBadge } from '../components/BoardroomCards';
import { safeStorage } from '../lib/safeStorage';

interface ActionItem {
  id: string;
  action: string;
  correctGroup: 'board' | 'committee' | 'ceo';
  explanation: string;
  statute: string;
  rationale: string;
}

export const AuthorityMap: React.FC = () => {
  const { navigate } = useRouter();
  const [selectedItemId, setSelectedItemId] = useState<string | null>(null);
  const [assignments, setAssignments] = useState<Record<string, 'board' | 'committee' | 'ceo'>>(() => {
    const saved = safeStorage.getItem('cdx_authority_map_assignments');
    return saved ? JSON.parse(saved) : {};
  });
  const [showResults, setShowResults] = useState<boolean>(() => {
    return safeStorage.getItem('cdx_authority_map_show_results') === 'true';
  });
  const [isHelpDrawerOpen, setIsHelpDrawerOpen] = useState<boolean>(false);

  const items: ActionItem[] = [
    {
      id: 'amend-bylaws',
      action: 'Amending the Corporate Bylaws',
      correctGroup: 'board',
      explanation: 'Standard corporate law, including California law (Corp Code § 5212(a)(1)), strictly prohibits committees or executives from amending corporate bylaws. This is a non-delegable duty reserved solely for the full Board.',
      statute: 'CA Corp Code § 5212(a)(1)',
      rationale: 'Bylaws dictate corporate rules. Delegating amendment authority to a subset of directors invites coups, deadlock, or minoritarian rule.'
    },
    {
      id: 'appoint-ceo',
      action: 'Appointing or Terminating the CEO',
      correctGroup: 'board',
      explanation: 'Appointing, evaluating, compensating, and terminating the Executive Director or chief officers is an exclusive, non-delegable responsibility under standard corporate rules (such as California Corporations Code § 5212(a)(2)).',
      statute: 'CA Corp Code § 5212(a)(2)',
      rationale: 'The Board is the sole employer of the executive. Allowing a committee or the CEO themselves to appoint officers voids independent oversight.'
    },
    {
      id: 'approve-budget',
      action: 'Approving the Annual Operating Budget',
      correctGroup: 'board',
      explanation: 'Adopting the corporate budget and establishing the financial boundaries for the organization requires a vote of the full Board of Directors.',
      statute: 'CA Corp Code § 5210',
      rationale: 'Establishing the general financial roadmap represents the core oversight role of the board. Individual officers cannot self-approve budgets.'
    },
    {
      id: 'settle-lawsuit',
      action: 'Settling a Major Third-Party Lawsuit',
      correctGroup: 'board',
      explanation: 'Entering into settlements, taking out corporate loans, or filing bankruptcies are core corporate actions that can only be authorized by the full Board.',
      statute: 'CA Corp Code § 5210 / Fiduciary Care',
      rationale: 'Settling litigation involves material financial liabilities and legal covenants that bind the entire corporation, requiring full board consensus.'
    },
    {
      id: 'emergency-spend',
      action: 'Approving an Mid-Quarter $15,000 Emergency Budget Amendment',
      correctGroup: 'committee',
      explanation: 'Board Executive Committees are designed to handle interim, time-sensitive operational updates between scheduled quarterly board meetings, provided bylaws and state laws permit committee spending delegations.',
      statute: 'CA Corp Code § 5212',
      rationale: 'The Executive Committee represents a rapid-response unit that can exercise board-like powers on interim, un-restricted cash decisions within bylaw limits.'
    },
    {
      id: 'recommend-bylaws',
      action: 'Reviewing and Recommending Bylaw Overhauls to Board',
      correctGroup: 'committee',
      explanation: 'While committees cannot *adopt* bylaws, they are fully authorized to research, debate, redline, and make recommendations to the full board for a vote.',
      statute: 'CA Corp Code § 5212',
      rationale: 'Working committees execute the preliminary research and drafting labor, streamlining boardroom debate during scheduled assemblies.'
    },
    {
      id: 'draft-budget',
      action: 'Drafting the Initial Budget for Board Presentation',
      correctGroup: 'committee',
      explanation: 'The Finance Committee or Executive Committee typically collaborates with staff to draft the annual budget, which is then submitted to the full board.',
      statute: 'CA Corp Code § 5212',
      rationale: 'Committees compile and refine complex financial ledger drafts, preparing them for formal board scrutiny and approval.'
    },
    {
      id: 'settle-disputed-bill',
      action: 'Settling an Interim $5,000 Disputed Vendor Invoicing (Mid-Quarter)',
      correctGroup: 'committee',
      explanation: 'An Executive Committee can vote to resolve small mid-quarter commercial vendor disputes to protect operations without waiting for full board sessions.',
      statute: 'CA Corp Code § 5212',
      rationale: 'Interim disputes representing minor administrative impacts fall within the standard operating mandate of a properly authorized board committee.'
    },
    {
      id: 'approve-vendor-spend',
      action: 'Signing a $3,500 Vendor Contract within Approved Budget Limits',
      correctGroup: 'ceo',
      explanation: 'Day-to-day administrative spending that fits within the pre-approved board operating budget is delegated to the CEO to keep operations moving.',
      statute: 'Board Delegated Authority Policy',
      rationale: 'Boards set boundaries (budgets). The CEO has operational authority to spend *within* those boundaries without requesting micro-approvals.'
    },
    {
      id: 'hire-supplies',
      action: 'Hiring and Terminating Entry-Level Employees',
      correctGroup: 'ceo',
      explanation: 'The CEO manages staff operations. Hiring, firing, and supervising general personnel are operational executive actions, not board roles.',
      statute: 'Board Delegated Authority Policy',
      rationale: 'Directors govern; staff manage. Direct board interference in general hiring and firing creates administrative chaos and undermines executive authority.'
    },
    {
      id: 'change-address',
      action: 'Changing the Corporate Mailing Address (Statement of Information)',
      correctGroup: 'ceo',
      explanation: 'Filing routine corporate compliance updates, changing mailing locations, and filing standard administrative reports are standard CEO operations.',
      statute: 'Standard Corporate Operations',
      rationale: 'Routine regulatory filings (excluding Form 990 or state corporate articles) are administrative tasks executed by staff under general operational delegation.'
    },
    {
      id: 'emergency-repair',
      action: 'Authorizing an Emergency $2,500 Building Repair using General Reserve',
      correctGroup: 'ceo',
      explanation: 'Expending small emergency maintenance or repairs within the CEO\'s delegated spending cap is authorized to preserve physical corporate assets.',
      statute: 'Board Delegated Spending Limits',
      rationale: 'Forcing the CEO to wait for a board vote to repair a leaking roof or broken heater represents a failure of active asset preservation.'
    }
  ];

  const handleAssign = (itemId: string, group: 'board' | 'committee' | 'ceo') => {
    setAssignments(prev => ({ ...prev, [itemId]: group }));
    setSelectedItemId(null);
  };

  const getUnassignedItems = () => {
    return items.filter(item => !assignments[item.id]);
  };

  const getGroupItems = (group: 'board' | 'committee' | 'ceo') => {
    return items.filter(item => assignments[item.id] === group);
  };

  const calculateScore = () => {
    let correct = 0;
    items.forEach(item => {
      if (assignments[item.id] === item.correctGroup) {
        correct += 1;
      }
    });
    return correct;
  };

  const resetLab = () => {
    setAssignments({});
    setSelectedItemId(null);
    setShowResults(false);
    safeStorage.removeItem('cdx_authority_map_assignments');
    safeStorage.removeItem('cdx_authority_map_show_results');
    safeStorage.removeItem('cdx_authority_map_score');
    safeStorage.removeItem('cdx_authority_map_total');
  };

  const solveAll = () => {
    const solved: Record<string, 'board' | 'committee' | 'ceo'> = {};
    items.forEach(item => {
      solved[item.id] = item.correctGroup;
    });
    setAssignments(solved);
    setShowResults(true);
    safeStorage.setItem('cdx_authority_map_assignments', JSON.stringify(solved));
    safeStorage.setItem('cdx_authority_map_show_results', 'true');
  };

  const correctCount = calculateScore();
  const allAssigned = Object.keys(assignments).length === items.length;

  useEffect(() => {
    if (Object.keys(assignments).length > 0) {
      safeStorage.setItem('cdx_authority_map_assignments', JSON.stringify(assignments));
    } else {
      safeStorage.removeItem('cdx_authority_map_assignments');
    }
  }, [assignments]);

  useEffect(() => {
    safeStorage.setItem('cdx_authority_map_show_results', showResults.toString());
    if (showResults) {
      safeStorage.setItem('cdx_authority_map_score', correctCount.toString());
      safeStorage.setItem('cdx_authority_map_total', items.length.toString());
    } else {
      safeStorage.removeItem('cdx_authority_map_score');
      safeStorage.removeItem('cdx_authority_map_total');
    }
  }, [showResults, correctCount]);

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
                Board Authority Delegation Map
              </h1>
              <p className="text-sm text-ink/70">
                Fiduciary governance laboratory: Assign critical corporate powers to the correct column to build a balanced corporate delegation matrix.
              </p>
            </div>

            <div className="flex items-center gap-3 shrink-0 flex-wrap">
              <button
                onClick={() => setIsHelpDrawerOpen(true)}
                className="px-3.5 py-2 bg-brass/10 hover:bg-brass/20 text-xs font-bold uppercase tracking-wider text-brass-dark border border-brass/30 hover:border-brass rounded transition-premium flex items-center gap-1.5"
              >
                <HelpCircle className="w-4 h-4 text-brass" />
                <span>Delegation Guide</span>
              </button>
              <button
                onClick={solveAll}
                className="px-3.5 py-2 bg-white text-xs font-bold uppercase tracking-wider text-ink border border-fog hover:border-brass rounded transition-premium"
              >
                Solve All
              </button>
              <button
                onClick={resetLab}
                className="px-3.5 py-2 bg-white text-xs font-bold uppercase tracking-wider text-ink/60 border border-fog/50 hover:border-copper rounded transition-premium"
              >
                Reset Lab
              </button>
            </div>
          </div>

          {/* Top Instruction Bar */}
          <div className="bg-white rounded-xl border border-fog p-5 flex flex-col md:flex-row md:items-center justify-between gap-4 shadow-sm">
            <div className="space-y-1">
              <h4 className="font-sans font-bold text-xs uppercase tracking-wider text-slate-brand">
                How to play this exercise
              </h4>
              <p className="text-xs text-ink/70 leading-relaxed max-w-2xl">
                Select any corporate action card from the unsorted deck below, then click one of the three category column buttons to assign it. Submit or show results to verify your placements.
              </p>
            </div>
            {!allAssigned ? (
              <button
                disabled
                className="px-5 py-2.5 text-xs font-bold uppercase tracking-wider rounded transition-premium shrink-0 bg-fog/80 text-ink/40 border border-fog/50 cursor-not-allowed select-none"
              >
                Audit Locked: Sort cards ({Object.keys(assignments).length}/12)
              </button>
            ) : (
              <button
                onClick={() => setShowResults(!showResults)}
                className={`px-5 py-2.5 text-xs font-bold uppercase tracking-wider rounded transition-premium shrink-0 shadow-md ${
                  showResults 
                    ? 'bg-brass text-ink border border-brass/40 hover:bg-brass-light' 
                    : 'bg-teal-brand hover:bg-ink text-white animate-pulse hover:animate-none'
                }`}
              >
                {showResults ? 'Hide Delegations Audit' : 'Verify Assignments & Explanations'}
              </button>
            )}
          </div>

          {/* Unsorted Deck Area */}
          {getUnassignedItems().length > 0 && (
            <div className="bg-white rounded-2xl border border-fog p-6 space-y-4 shadow-sm text-center">
              <div className="flex items-center justify-between border-b border-fog pb-3">
                <span className="text-[10px] font-extrabold uppercase tracking-widest text-ink/40">
                  Unsorted Corporate Deck ({getUnassignedItems().length} items remaining)
                </span>
                <span className="text-xs text-brass font-bold italic">
                  Click a card below to assign its slot
                </span>
              </div>

              {/* Unsorted Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {getUnassignedItems().map((item) => {
                  const isSelected = selectedItemId === item.id;
                  return (
                    <div
                      key={item.id}
                      onClick={() => setSelectedItemId(isSelected ? null : item.id)}
                      className={`p-4 rounded-xl border cursor-pointer text-left transition-premium flex flex-col justify-between h-36 ${
                        isSelected 
                          ? 'border-brass bg-brass/10 ring-1 ring-brass/30 shadow-md scale-[1.02]' 
                          : 'border-fog hover:border-brass hover:shadow'
                      }`}
                    >
                      <p className="font-serif font-bold text-sm text-ink leading-snug">
                        {item.action}
                      </p>

                      {isSelected ? (
                        <div className="grid grid-cols-3 gap-1.5 pt-3 border-t border-brass/20">
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              handleAssign(item.id, 'board');
                            }}
                            className="py-1.5 bg-slate-brand hover:bg-ink text-white rounded text-[10px] font-bold uppercase tracking-wider text-center"
                          >
                            Board
                          </button>
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              handleAssign(item.id, 'committee');
                            }}
                            className="py-1.5 bg-teal-brand hover:bg-ink text-white rounded text-[10px] font-bold uppercase tracking-wider text-center"
                          >
                            Exec Comm
                          </button>
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              handleAssign(item.id, 'ceo');
                            }}
                            className="py-1.5 bg-copper hover:bg-ink text-white rounded text-[10px] font-bold uppercase tracking-wider text-center"
                          >
                            CEO
                          </button>
                        </div>
                      ) : (
                        <div className="flex items-center justify-between text-[10px] text-ink/40 font-bold uppercase tracking-wider pt-2 border-t border-fog/50">
                          <span>Unassigned Action</span>
                          <span className="text-brass group-hover:text-ink">Assign Slot →</span>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* Column Sort Board (Three Columns) */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
            
            {/* Column 1: Board Collectively (Sole Authority) */}
            <div className="bg-white rounded-2xl border border-fog/80 overflow-hidden shadow-sm flex flex-col min-h-[350px]">
              <div className="bg-slate-brand text-white p-4 flex items-center justify-between border-b border-slate-brand/20">
                <div className="flex items-center gap-2">
                  <Landmark className="w-5 h-5 text-brass" />
                  <span className="font-sans font-bold text-xs uppercase tracking-wider">
                    1. Board Collectively
                  </span>
                </div>
                <span className="text-[10px] font-bold bg-white/10 px-2 py-0.5 rounded uppercase tracking-wider">
                  Sole Authority
                </span>
              </div>
              <p className="p-3 bg-slate-brand/5 text-[10px] text-slate-brand font-semibold uppercase tracking-wider text-center border-b border-fog/60">
                Non-delegable statutory corporate powers
              </p>

              <div className="p-4 space-y-3 flex-grow bg-paper/5">
                {getGroupItems('board').length === 0 ? (
                  <div className="border-2 border-dashed border-fog rounded-xl p-6 bg-paper/10 text-center space-y-2 py-10 my-1 animate-fade-in">
                    <Landmark className="text-brass/30 mx-auto w-10 h-10 stroke-[1.5]" />
                    <p className="text-xs font-bold text-slate-brand uppercase tracking-wider">Receptive Board Slot</p>
                    <p className="text-[11px] text-ink/60 leading-relaxed">
                      Select an action from the deck above and assign it here.
                    </p>
                  </div>
                ) : (
                  getGroupItems('board').map((item) => {
                    const isCorrect = item.correctGroup === 'board';
                    return (
                      <div
                        key={item.id}
                        className={`p-3.5 rounded-xl border text-xs text-left transition-premium ${
                          showResults 
                            ? isCorrect 
                              ? 'border-emerald-300 bg-emerald-50/50' 
                              : 'border-rose-300 bg-rose-50/50'
                            : 'border-fog bg-white'
                        }`}
                      >
                        <div className="flex items-start justify-between gap-2">
                          <p className="font-serif font-bold text-ink leading-tight">
                            {item.action}
                          </p>
                          {showResults && (
                            isCorrect ? (
                              <CheckCircle className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                            ) : (
                              <X className="w-4 h-4 text-rose-600 shrink-0 mt-0.5" />
                            )
                          )}
                        </div>

                        {showResults && (
                          <div className="mt-2.5 pt-2 border-t border-fog/80 space-y-1 text-[11px] leading-relaxed animate-fade-in">
                            <CaliforniaNoteBadge statute={item.statute} text={item.explanation} className="py-0.5 mb-1 text-[10px]" />
                            <p className="text-ink/75 font-serif italic">{item.rationale}</p>
                          </div>
                        )}

                        {!showResults && (
                          <button
                            onClick={() => {
                              const updated = { ...assignments };
                              delete updated[item.id];
                              setAssignments(updated);
                            }}
                            className="mt-2 text-[9px] font-bold text-rose-700 hover:underline uppercase tracking-wider"
                          >
                            Remove Card
                          </button>
                        )}
                      </div>
                    );
                  })
                )}
              </div>
            </div>

            {/* Column 2: Board Executive Committee (Interim Governance) */}
            <div className="bg-white rounded-2xl border border-fog/80 overflow-hidden shadow-sm flex flex-col min-h-[350px]">
              <div className="bg-teal-brand text-white p-4 flex items-center justify-between border-b border-teal-brand/20">
                <div className="flex items-center gap-2">
                  <Shield className="w-5 h-5 text-brass" />
                  <span className="font-sans font-bold text-xs uppercase tracking-wider">
                    2. Executive Committee
                  </span>
                </div>
                <span className="text-[10px] font-bold bg-white/10 px-2 py-0.5 rounded uppercase tracking-wider">
                  Interim Governance
                </span>
              </div>
              <p className="p-3 bg-teal-brand/5 text-[10px] text-teal-brand font-semibold uppercase tracking-wider text-center border-b border-fog/60">
                Subject to strict bylaw limits
              </p>

              <div className="p-4 space-y-3 flex-grow bg-paper/5">
                {getGroupItems('committee').length === 0 ? (
                  <div className="border-2 border-dashed border-fog rounded-xl p-6 bg-paper/10 text-center space-y-2 py-10 my-1 animate-fade-in">
                    <Shield className="text-brass/30 mx-auto w-10 h-10 stroke-[1.5]" />
                    <p className="text-xs font-bold text-teal-brand uppercase tracking-wider">Receptive Committee Slot</p>
                    <p className="text-[11px] text-ink/60 leading-relaxed">
                      Select an action from the deck above and assign it here.
                    </p>
                  </div>
                ) : (
                  getGroupItems('committee').map((item) => {
                    const isCorrect = item.correctGroup === 'committee';
                    return (
                      <div
                        key={item.id}
                        className={`p-3.5 rounded-xl border text-xs text-left transition-premium ${
                          showResults 
                            ? isCorrect 
                              ? 'border-emerald-300 bg-emerald-50/50' 
                              : 'border-rose-300 bg-rose-50/50'
                            : 'border-fog bg-white'
                        }`}
                      >
                        <div className="flex items-start justify-between gap-2">
                          <p className="font-serif font-bold text-ink leading-tight">
                            {item.action}
                          </p>
                          {showResults && (
                            isCorrect ? (
                              <CheckCircle className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                            ) : (
                              <X className="w-4 h-4 text-rose-600 shrink-0 mt-0.5" />
                            )
                          )}
                        </div>

                        {showResults && (
                          <div className="mt-2.5 pt-2 border-t border-fog/80 space-y-1 text-[11px] leading-relaxed animate-fade-in">
                            <CaliforniaNoteBadge statute={item.statute} text={item.explanation} className="py-0.5 mb-1 text-[10px]" />
                            <p className="text-ink/75 font-serif italic">{item.rationale}</p>
                          </div>
                        )}

                        {!showResults && (
                          <button
                            onClick={() => {
                              const updated = { ...assignments };
                              delete updated[item.id];
                              setAssignments(updated);
                            }}
                            className="mt-2 text-[9px] font-bold text-rose-700 hover:underline uppercase tracking-wider"
                          >
                            Remove Card
                          </button>
                        )}
                      </div>
                    );
                  })
                )}
              </div>
            </div>

            {/* Column 3: CEO / Executive Director Individually (Day-to-day Operations) */}
            <div className="bg-white rounded-2xl border border-fog/80 overflow-hidden shadow-sm flex flex-col min-h-[350px]">
              <div className="bg-copper text-white p-4 flex items-center justify-between border-b border-copper/20">
                <div className="flex items-center gap-2">
                  <User className="w-5 h-5 text-brass" />
                  <span className="font-sans font-bold text-xs uppercase tracking-wider">
                    3. CEO / Executive Director
                  </span>
                </div>
                <span className="text-[10px] font-bold bg-white/10 px-2 py-0.5 rounded uppercase tracking-wider">
                  Day-to-Day Ops
                </span>
              </div>
              <p className="p-3 bg-copper/5 text-[10px] text-copper font-semibold uppercase tracking-wider text-center border-b border-fog/60">
                Delegated authority within approved budgets
              </p>

              <div className="p-4 space-y-3 flex-grow bg-paper/5">
                {getGroupItems('ceo').length === 0 ? (
                  <div className="border-2 border-dashed border-fog rounded-xl p-6 bg-paper/10 text-center space-y-2 py-10 my-1 animate-fade-in">
                    <User className="text-brass/30 mx-auto w-10 h-10 stroke-[1.5]" />
                    <p className="text-xs font-bold text-copper uppercase tracking-wider">Receptive CEO Slot</p>
                    <p className="text-[11px] text-ink/60 leading-relaxed">
                      Select an action from the deck above and assign it here.
                    </p>
                  </div>
                ) : (
                  getGroupItems('ceo').map((item) => {
                    const isCorrect = item.correctGroup === 'ceo';
                    return (
                      <div
                        key={item.id}
                        className={`p-3.5 rounded-xl border text-xs text-left transition-premium ${
                          showResults 
                            ? isCorrect 
                              ? 'border-emerald-300 bg-emerald-50/50' 
                              : 'border-rose-300 bg-rose-50/50'
                            : 'border-fog bg-white'
                        }`}
                      >
                        <div className="flex items-start justify-between gap-2">
                          <p className="font-serif font-bold text-ink leading-tight">
                            {item.action}
                          </p>
                          {showResults && (
                            isCorrect ? (
                              <CheckCircle className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                            ) : (
                              <X className="w-4 h-4 text-rose-600 shrink-0 mt-0.5" />
                            )
                          )}
                        </div>

                        {showResults && (
                          <div className="mt-2.5 pt-2 border-t border-fog/80 space-y-1 text-[11px] leading-relaxed animate-fade-in">
                            <CaliforniaNoteBadge statute={item.statute} text={item.explanation} className="py-0.5 mb-1 text-[10px]" />
                            <p className="text-ink/75 font-serif italic">{item.rationale}</p>
                          </div>
                        )}

                        {!showResults && (
                          <button
                            onClick={() => {
                              const updated = { ...assignments };
                              delete updated[item.id];
                              setAssignments(updated);
                            }}
                            className="mt-2 text-[9px] font-bold text-rose-700 hover:underline uppercase tracking-wider"
                          >
                            Remove Card
                          </button>
                        )}
                      </div>
                    );
                  })
                )}
              </div>
            </div>

          </div>

          {/* Results Scoreboard Certificate Card */}
          {showResults && (
            <div className="bg-white rounded-2xl border border-fog p-6 sm:p-8 text-center space-y-4 max-w-2xl mx-auto shadow-md animate-fade-in">
              <div className="bg-teal-brand/10 border border-teal-brand/30 p-4 rounded-xl flex items-center justify-center gap-3 max-w-md mx-auto">
                <Award className="w-8 h-8 text-brass shrink-0 animate-bounce" />
                <div className="text-left">
                  <h4 className="font-sans font-extrabold text-sm uppercase tracking-wider text-teal-brand leading-none">
                    Diligence Score: {correctCount} of 12 Correct
                  </h4>
                  <p className="text-xs text-ink/70 mt-1">
                    {correctCount === 12 
                      ? 'Perfect Fiduciary Score. Fiduciary delegation is 100% compliant.' 
                      : 'Review the flagged items above. Ensure you understand delegable limits.'}
                  </p>
                </div>
              </div>

              <div className="space-y-2 text-xs text-ink/75 max-w-md mx-auto leading-relaxed font-sans">
                <p>
                  <strong>Why Section 5212 Matters:</strong> Under standard corporate law (and California law specifically), a board can delegate powers to committees, but certain fundamental actions can *never* be outsourced. Ensuring bylaws and policies match these statutory boundaries protects the corporation from operational invalidations and regulatory sanctions.
                </p>
              </div>

              <div className="pt-3 border-t border-fog/50 flex flex-col sm:flex-row justify-center items-center gap-4">
                <button
                  onClick={() => navigate('contact-us?topic=bylaws&message=We%20would%20like%20to%20request%20information%20or%20an%20audit%20on%20our%20board%20bylaws%20and%20delegation%20policies.')}
                  className="w-full sm:w-auto inline-flex justify-center items-center gap-1.5 px-6 py-3 bg-slate-brand hover:bg-ink text-white text-xs font-bold uppercase tracking-wider rounded shadow transition-premium cursor-pointer border-0"
                >
                  <span>Audit Board Bylaws & Delegation Policies</span>
                  <ChevronRight className="w-4 h-4 text-brass" />
                </button>
                <button
                  onClick={resetLab}
                  className="w-full sm:w-auto px-6 py-3 border border-fog hover:border-brass text-ink hover:text-brass text-xs font-bold uppercase tracking-wider rounded transition-premium"
                >
                  Try Exercise Again
                </button>
              </div>
            </div>
          )}
          {/* Help Drawer Overlay */}
          {isHelpDrawerOpen && (
            <div 
              className="fixed inset-0 bg-ink/40 backdrop-blur-xs z-50 transition-opacity flex justify-end"
              onClick={() => setIsHelpDrawerOpen(false)}
            >
              <div 
                className="h-full w-full max-w-md bg-white border-l border-fog shadow-2xl p-6 overflow-y-auto z-50 text-left flex flex-col justify-between"
                onClick={(e) => e.stopPropagation()}
              >
                <div>
                  <div className="flex items-center justify-between border-b border-fog pb-4 mb-5">
                    <div className="flex items-center gap-2">
                      <Shield className="w-5 h-5 text-brass" />
                      <h2 className="font-serif text-lg font-bold text-ink">Delegation & Bylaws Guide</h2>
                    </div>
                    <button 
                      onClick={() => setIsHelpDrawerOpen(false)}
                      className="p-1 rounded-full hover:bg-fog text-ink/60 hover:text-ink transition-colors"
                    >
                      <X className="w-5 h-5" />
                    </button>
                  </div>

                  <div className="space-y-6 text-xs text-ink/80 leading-relaxed font-sans">
                    <div>
                      <h3 className="font-bold text-slate-brand uppercase tracking-wider mb-2">Non-Delegable Duties (Board Only)</h3>
                      <p className="mb-2">Under <strong>standard corporate codes (and California Corporations Code § 5212(a) specifically)</strong>, certain corporate powers can never be outsourced to any committee, officer, or individual:</p>
                      <ul className="list-disc pl-4 space-y-1.5">
                        <li><strong>Bylaw Amendments:</strong> Amending or repealing bylaws is strictly reserved for the full Board.</li>
                        <li><strong>Officer Selection:</strong> Appointing or removing chief officers or the CEO/ED must be decided by the Board.</li>
                        <li><strong>Budget Approval:</strong> Final adoption of the annual operating budget is an exclusive Board authority.</li>
                        <li><strong>Covenants & Settlements:</strong> Settling lawsuits or taking out material commercial loans binds the entire entity.</li>
                      </ul>
                    </div>

                    <div>
                      <h3 className="font-bold text-teal-brand uppercase tracking-wider mb-2">Interim Governance (Board Committees)</h3>
                      <p className="mb-2">Board committees (like the Executive Committee) are authorized under <strong>CA Corp Code § 5212</strong> to manage timely operational updates between full board assemblies:</p>
                      <ul className="list-disc pl-4 space-y-1.5">
                        <li><strong>Interim Spending:</strong> Approving emergency unbudgeted expenses within pre-defined limits.</li>
                        <li><strong>Research & Drafting:</strong> Redlining bylaws or drafting initial budget matrices before submitting to the full board.</li>
                        <li><strong>Contract/Dispute Resolution:</strong> Settling minor, routine commercial vendor disputes.</li>
                      </ul>
                    </div>

                    <div>
                      <h3 className="font-bold text-copper uppercase tracking-wider mb-2">Day-to-Day Delegation (CEO/ED)</h3>
                      <p className="mb-2">To prevent administrative deadlock, boards delegate day-to-day administrative operations to the executive leader:</p>
                      <ul className="list-disc pl-4 space-y-1.5">
                        <li><strong>Budget Spending:</strong> Executing approved budget line-items (e.g., standard office rent, utility bills).</li>
                        <li><strong>Staff Management:</strong> Hiring, supervising, and terminating entry-to-mid-level employees.</li>
                        <li><strong>Routine Filings:</strong> Submitting standard compliance notices (such as changing the mailing address on standard state filings like the California Statement of Information).</li>
                        <li><strong>Asset Protection:</strong> Executing immediate minor building repairs to prevent facility damage.</li>
                      </ul>
                    </div>
                  </div>
                </div>

                <div className="pt-6 border-t border-fog mt-6 text-center">
                  <p className="text-[11px] text-ink/60 mb-3">Struggling to solve the map? Auto-assign cards with one click:</p>
                  <button
                    onClick={() => {
                      solveAll();
                      setIsHelpDrawerOpen(false);
                    }}
                    className="w-full py-2.5 bg-teal-brand hover:bg-ink text-white font-bold uppercase tracking-wider rounded transition-premium text-xs"
                  >
                    Auto-Assign All Cards
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
export default AuthorityMap;
