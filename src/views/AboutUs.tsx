import React, { useState } from 'react';
import { Layout } from '../components/Layout';
import { useRouter } from '../components/Router';
import { Award, Landmark, ExternalLink, Users, Scale, ChevronRight, ChevronLeft, FileText, Clipboard, Check, Printer, RotateCcw, AlertCircle, Sparkles } from 'lucide-react';
import { safeStorage } from '../lib/safeStorage';

/** Shape persisted under cdx_about_legal_intake. */
interface LegalIntake {
  orgName: string;
  budget: string;
  boardSize: string;
  frequency: string;
  stateStatus: string;
  worries: string[];
  customConcerns: string;
  isCompiled: boolean;
}

export const AboutUs: React.FC = () => {
  const { navigate } = useRouter();
  // State for Intake Brief Generator
  const [step, setStep] = useState(1);
  const [orgName, setOrganizationName] = useState(() => {
    try {
      const saved = safeStorage.getItem('cdx_about_legal_intake');
      if (saved) {
        return JSON.parse(saved).orgName || '';
      }
    } catch {
      // Storage unavailable or holding malformed JSON - fall through to the default below.
    }
    return '';
  });
  const [budget, setBudget] = useState(() => {
    try {
      const saved = safeStorage.getItem('cdx_about_legal_intake');
      if (saved) {
        return JSON.parse(saved).budget || 'under-250k';
      }
    } catch {
      // Storage unavailable or holding malformed JSON - fall through to the default below.
    }
    return 'under-250k';
  });
  const [boardSize, setBoardSize] = useState(() => {
    try {
      const saved = safeStorage.getItem('cdx_about_legal_intake');
      if (saved) {
        return JSON.parse(saved).boardSize || '3-5';
      }
    } catch {
      // Storage unavailable or holding malformed JSON - fall through to the default below.
    }
    return '3-5';
  });
  const [frequency, setFrequency] = useState(() => {
    try {
      const saved = safeStorage.getItem('cdx_about_legal_intake');
      if (saved) {
        return JSON.parse(saved).frequency || 'quarterly';
      }
    } catch {
      // Storage unavailable or holding malformed JSON - fall through to the default below.
    }
    return 'quarterly';
  });
  const [stateStatus, setStateStatus] = useState(() => {
    try {
      const saved = safeStorage.getItem('cdx_about_legal_intake');
      if (saved) {
        return JSON.parse(saved).stateStatus || 'current';
      }
    } catch {
      // Storage unavailable or holding malformed JSON - fall through to the default below.
    }
    return 'current';
  });
  const [worries, setWorries] = useState<string[]>(() => {
    try {
      const saved = safeStorage.getItem('cdx_about_legal_intake');
      if (saved) {
        return JSON.parse(saved).worries || [];
      }
    } catch {
      // Storage unavailable or holding malformed JSON - fall through to the default below.
    }
    return [];
  });
  const [customConcerns, setCustomConcerns] = useState(() => {
    try {
      const saved = safeStorage.getItem('cdx_about_legal_intake');
      if (saved) {
        return JSON.parse(saved).customConcerns || '';
      }
    } catch {
      // Storage unavailable or holding malformed JSON - fall through to the default below.
    }
    return '';
  });
  const [isCompiled, setIsCompiled] = useState(() => {
    try {
      const saved = safeStorage.getItem('cdx_about_legal_intake');
      if (saved) {
        return JSON.parse(saved).isCompiled || false;
      }
    } catch {
      // Storage unavailable or holding malformed JSON - fall through to the default below.
    }
    return false;
  });
  const [isCopied, setIsCopied] = useState(false);

  const saveIntakeToLocalStorage = (updated: Partial<LegalIntake>) => {
    try {
      const saved = safeStorage.getItem('cdx_about_legal_intake');
      const current = saved ? JSON.parse(saved) : {};
      safeStorage.setItem('cdx_about_legal_intake', JSON.stringify({
        orgName, budget, boardSize, frequency, stateStatus, worries, customConcerns, isCompiled,
        ...current, ...updated
      }));
    } catch (e) {
      console.error(e);
    }
  };

  const handleToggleWorry = (id: string) => {
    const updated = worries.includes(id) 
      ? worries.filter(w => w !== id) 
      : [...worries, id];
    setWorries(updated);
    saveIntakeToLocalStorage({ worries: updated });
  };

  const handleReset = () => {
    setOrganizationName('');
    setBudget('under-250k');
    setBoardSize('3-5');
    setFrequency('quarterly');
    setStateStatus('current');
    setWorries([]);
    setCustomConcerns('');
    setIsCompiled(false);
    setStep(1);
    try {
      safeStorage.removeItem('cdx_about_legal_intake');
    } catch(e) {}
  };

  const handleCompile = () => {
    if (!orgName.trim()) {
      alert("Please enter your Organization Name in Step 1 to compile the brief.");
      setStep(1);
      return;
    }
    setIsCompiled(true);
    saveIntakeToLocalStorage({ isCompiled: true });
  };

  const handleCopyClipboard = () => {
    const memoText = generateMemoText();
    navigator.clipboard.writeText(memoText).then(() => {
      setIsCopied(true);
      setTimeout(() => setIsCopied(false), 2000);
    });
  };

  const handlePrint = () => {
    window.print();
  };

  const generateMemoText = () => {
    const dateStr = new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
    const budgetMap: Record<string, string> = {
      'under-250k': 'Under $250,000 / year',
      '250k-1m': '$250,000 - $1,000,000 / year',
      '1m-2m': '$1,000,000 - $2,000,000 / year (Audit Threshold Boundary)',
      'over-2m': 'Over $2,000,000 / year (Mandatory CA Audit Committee Requirement)'
    };
    const freqMap: Record<string, string> = {
      'monthly': 'Monthly Meetings',
      'bi-monthly': 'Bi-Monthly Meetings',
      'quarterly': 'Quarterly Meetings',
      'annually': 'Annual Meetings Only'
    };
    const statusMap: Record<string, string> = {
      'current': 'Active / Current (Compliant)',
      'delinquent': 'Delinquent (Missing RRF-1/CT-TR-1 filings)',
      'suspended': 'Suspended by FTB or AG (Emergency Revivor Required)'
    };

    let worriesText = worries.map(w => {
      if (w === 'conflicts') return '- Unvoted or unrecorded interested director transactions (CA Corp Code § 5233)';
      if (w === 'compensation') return '- Executive Compensation approval reasonableness procedures (IRC § 4958 / Intermediate Sanctions)';
      if (w === 'bylaws') return '- Outdated Bylaws clauses (risk of invalid quorum, improper voting methods)';
      if (w === 'funds') return '- Restricting general/donor funds (UPMIFA compliance and asset diversification)';
      if (w === 'liability') return '- Director and Officer personal liability exposures and D&O coverage reviews';
      return '';
    }).filter(Boolean).join('\n');

    if (!worriesText) worriesText = '- General board governance checkup and review';

    return `CONFIDENTIAL EDUCATIONAL STUDY AID — NOT FORMAL LEGAL COUNSEL
CONFIDENTIAL ATTORNEY-CLIENT PRIVILEGED INTAKE BRIEF
--------------------------------------------------
TO: Myron Steeves, J.D. • California Center for Nonprofit Law
FROM: Board Representative • ${orgName}
DATE: ${dateStr}
RE: Fiduciary Compliance and Board Governance Briefing Memo

1. ORGANIZATION SCALE & SCALE METRICS
- Organization Name: ${orgName}
- Operating Budget: ${budgetMap[budget] || budget}
- Board Size: ${boardSize} active members
- Meeting Frequency: ${freqMap[frequency] || frequency}

2. COMPLIANCE STATUS & REGISTRY STANDING
- State Registry Status: ${statusMap[stateStatus] || stateStatus}
${stateStatus === 'delinquent' ? '  *ALERT: Registry delinquency triggers severe financial fines and loss of charity solicitation rights.' : ''}
${stateStatus === 'suspended' ? '  *CRITICAL WARNING: Corporate powers are currently suspended. Immediate revivor petition required.' : ''}

3. PRIMARY FIDUCIARY CONCERNS IDENTIFIED
${worriesText}

4. SITUATIONAL DETAIL NOTES
${customConcerns ? customConcerns : 'No additional custom details provided. Prepared for general boardroom governance audit review.'}

--------------------------------------------------
CONFIDENTIALITY NOTE: This intake memorandum compiles organizational concerns specifically to prepare for formal legal consultation with NPO Lawyers. Keep in corporate records to support due diligence and Care.`;
  };

  return (
    <Layout>
      <div className="py-16 bg-paper/30 min-h-screen px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto space-y-12">
          
          {/* Header Block */}
          <div className="text-center space-y-3">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-brass/10 border border-brass/30 text-brass rounded-full text-xs font-semibold uppercase tracking-wider">
              <Award className="w-4 h-4" />
              <span>Leadership & Faculty</span>
            </div>
            <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl text-ink font-bold tracking-wide">
              About the Faculty
            </h1>
            <p className="max-w-2xl mx-auto text-sm sm:text-base text-ink/70 font-sans">
              Meet our founder, Myron Steeves, J.D., and the legal support teams providing educational resources and custom workshops for board directors nationwide.
            </p>
          </div>

          {/* Premium Biographical Box */}
          <div className="bg-white rounded-xl shadow-lg border border-fog p-6 sm:p-10 space-y-8 relative overflow-hidden">
            <div className="absolute top-0 left-0 w-2 h-full bg-brass" />
            
            <div className="flex flex-col md:flex-row gap-8 items-start">
              {/* Profile Icon/Initial Badge */}
              <div className="bg-ink hover:bg-slate-brand text-brass w-20 h-20 sm:w-24 sm:h-24 rounded-2xl border border-brass/30 flex items-center justify-center shadow-lg shrink-0 transition-premium">
                <span className="font-serif text-3xl sm:text-4xl font-extrabold italic">MS</span>
              </div>

              {/* Bio Content */}
              <div className="space-y-4 text-left">
                <div className="space-y-1">
                  <h2 className="font-serif text-2xl sm:text-3xl text-ink font-bold tracking-tight">
                    Myron Steeves, J.D.
                  </h2>
                  <p className="text-xs sm:text-sm text-brass font-bold uppercase tracking-widest">
                    Dean Emeritus & Founder • Attorney at Law
                  </p>
                </div>

                <p className="text-sm sm:text-base text-ink/80 leading-relaxed font-sans">
                  Myron Steeves, J.D., has extensive experience serving organizations. A graduate of <strong className="text-ink font-semibold">Georgetown University Law Center</strong> and <strong className="text-ink font-semibold">Biola University</strong>, Myron brings a rare combination of rigorous legal training, hands-on organization experience, and faith-informed counsel to his work with mission-driven organizations. He is Dean Emeritus of Trinity Law School, a Christian law school devoted to championing a biblical view of human law and government.
                </p>
                
                <p className="text-sm sm:text-base text-ink/80 leading-relaxed font-sans">
                  Throughout his distinguished career, Myron has advised thousands of organization leaders on formation, governance, compliance, bylaws audits, tax exemption, board responsibilities, and the heavy legal duties that come with organizational leadership. He frequently speaks on issues involving charity law and public policy, and remains highly active in bar association initiatives and regional governance coalitions.
                </p>
              </div>
            </div>

            <hr className="border-fog" />

            {/* National Capability & Legal Team Section */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-left">
              <div className="space-y-3">
                <h3 className="font-serif font-bold text-lg text-slate-brand flex items-center gap-2">
                  <Users className="w-5 h-5 text-brass" />
                  Organization Support Team
                </h3>
                <p className="text-xs sm:text-sm text-ink/75 leading-relaxed font-sans">
                  Myron is joined by a seasoned legal support team with substantial experience in organization administration, corporate formations, tax-exempt applications (IRS Form 1023), bylaws reviews, corporate dissolution proceedings, and contract negotiations. Together, they deliver both legal judgment and practical operational experience to the daily hurdles governing boards face.
                </p>
              </div>

              <div className="space-y-3">
                <h3 className="font-serif font-bold text-lg text-teal-brand flex items-center gap-2">
                  <Scale className="w-5 h-5 text-brass" />
                  National Governance Training
                </h3>
                <p className="text-xs sm:text-sm text-ink/75 leading-relaxed font-sans">
                  While Myron is based in Southern California and serves as a key authority on California statutory board rules, he conducts customized **Board Training and governance workshops nationwide** to help boards build defensive, compliant cultures regardless of their home state.
                </p>
              </div>
            </div>

            <hr className="border-fog" />

            {/* Founders Law Practices Trust Box */}
            <div className="bg-paper rounded-xl p-6 border border-brass/20 space-y-4 text-left">
              <div className="flex items-center gap-2">
                <Landmark className="w-5 h-5 text-brass" />
                <h4 className="font-serif text-base font-bold text-ink">Founding Attorney of Premium Practices</h4>
              </div>
              <p className="text-xs sm:text-sm text-ink/70 leading-relaxed font-sans">
                Myron is the founder of two leading legal practices in California, assisting organizations with their specific corporate and religious legal needs:
              </p>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                {/* CCNL */}
                <a 
                  href="https://npolawyers.com" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="bg-white hover:bg-ink hover:text-paper p-4 rounded-lg border border-fog shadow-sm transition-premium flex items-center justify-between group cursor-pointer"
                >
                  <div className="space-y-1">
                    <span className="text-[10px] text-brass uppercase font-bold tracking-wider">Charities & Foundations</span>
                    <h5 className="font-serif font-bold text-sm text-ink group-hover:text-white">California Center for Nonprofit Law</h5>
                  </div>
                  <ExternalLink className="w-4 h-4 text-brass" />
                </a>

                {/* Church Law Center */}
                <a 
                  href="https://www.churchlawcenter.com" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="bg-white hover:bg-ink hover:text-paper p-4 rounded-lg border border-fog shadow-sm transition-premium flex items-center justify-between group cursor-pointer"
                >
                  <div className="space-y-1">
                    <span className="text-[10px] text-brass uppercase font-bold tracking-wider">Churches & Ministries</span>
                    <h5 className="font-serif font-bold text-sm text-ink group-hover:text-white">The Church Law Center of California</h5>
                  </div>
                  <ExternalLink className="w-4 h-4 text-brass" />
                </a>
              </div>
            </div>
          </div>

          {/* Interactive Pre-Consultation Legal Intake Brief Generator */}
          <div className="bg-white rounded-xl shadow-lg border border-fog p-6 sm:p-10 space-y-8 relative overflow-hidden text-left">
            <div className="absolute top-0 left-0 w-2 h-full bg-brass" />
            
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-brass">
                <FileText className="w-5 h-5" />
                <span className="text-xs font-extrabold uppercase tracking-widest">Interactive Fiduciary Utility</span>
              </div>
              <h3 className="font-serif text-2xl text-ink font-bold tracking-tight">
                Pre-Consultation Legal Intake Brief Generator
              </h3>
              <p className="text-xs sm:text-sm text-ink/70 font-sans max-w-2xl leading-relaxed">
                Before consulting with Myron Steeves or NPO Lawyers, outline your board's size, budget metrics, registry status, and core worries to instantly generate a beautifully formatted, copyable <strong className="text-ink font-semibold">Privileged Legal Intake Brief</strong>.
              </p>
            </div>

            {!isCompiled ? (
              <div className="space-y-6">
                {/* Wizard Steps indicator */}
                <div className="flex items-center justify-between border-b border-fog pb-4">
                  <div className="flex items-center gap-2">
                    {[1, 2, 3, 4].map((s) => (
                      <div key={s} className="flex items-center">
                        <div className={`w-7 h-7 rounded-full flex items-center justify-center font-sans font-bold text-xs select-none ${
                          step === s 
                            ? 'bg-brass text-ink ring-4 ring-brass/10' 
                            : step > s 
                              ? 'bg-ink text-paper' 
                              : 'bg-paper text-ink/40 border border-fog'
                        }`}>
                          {s}
                        </div>
                        {s < 4 && <div className={`w-6 sm:w-12 h-0.5 ${step > s ? 'bg-ink' : 'bg-fog'}`} />}
                      </div>
                    ))}
                  </div>
                  <span className="text-[10px] font-extrabold uppercase tracking-widest text-brass">
                    Step {step} of 4: {
                      step === 1 ? 'Organization Scale' :
                      step === 2 ? 'Board Framework' :
                      step === 3 ? 'Compliance worries' : 'Situational Details'
                    }
                  </span>
                </div>

                {/* Step Content */}
                <div className="min-h-[160px] flex flex-col justify-center">
                  {step === 1 && (
                    <div className="space-y-4 animate-fade-in">
                      <div className="space-y-1.5">
                        <label htmlFor="intake-org" className="block text-xs font-bold uppercase tracking-wider text-ink/75">
                          Organization Name <span className="text-rose-500">*</span>
                        </label>
                        <input 
                          id="intake-org"
                          type="text" 
                          placeholder="e.g. Hope Community Services of California" 
                          value={orgName}
                          onChange={(e) => {
                            setOrganizationName(e.target.value);
                            saveIntakeToLocalStorage({ orgName: e.target.value });
                          }}
                          className="w-full p-3 bg-paper/30 border border-fog/80 rounded-lg text-sm text-ink focus:border-brass focus:ring-1 focus:ring-brass focus:outline-none"
                        />
                      </div>
                      <div className="space-y-1.5">
                        <label htmlFor="intake-budget" className="block text-xs font-bold uppercase tracking-wider text-ink/75">
                          Annual Operating Budget
                        </label>
                        <select 
                          id="intake-budget"
                          value={budget}
                          onChange={(e) => {
                            setBudget(e.target.value);
                            saveIntakeToLocalStorage({ budget: e.target.value });
                          }}
                          className="w-full p-3 bg-white border border-fog/80 rounded-lg text-sm text-ink focus:border-brass focus:ring-1 focus:ring-brass focus:outline-none cursor-pointer"
                        >
                          <option value="under-250k">Under $250,000 / year</option>
                          <option value="250k-1m">$250,000 - $1,000,000 / year</option>
                          <option value="1m-2m">$1,000,000 - $2,000,000 / year (Audit Threshold Boundary)</option>
                          <option value="over-2m">Over $2,000,000 / year (Mandatory Audit Committee Rule)</option>
                        </select>
                      </div>
                    </div>
                  )}

                  {step === 2 && (
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 animate-fade-in">
                      <div className="space-y-1.5">
                        <label htmlFor="intake-board-size" className="block text-xs font-bold uppercase tracking-wider text-ink/75">
                          Active Board Members
                        </label>
                        <select 
                          id="intake-board-size"
                          value={boardSize}
                          onChange={(e) => {
                            setBoardSize(e.target.value);
                            saveIntakeToLocalStorage({ boardSize: e.target.value });
                          }}
                          className="w-full p-3 bg-white border border-fog/80 rounded-lg text-sm text-ink focus:border-brass focus:outline-none cursor-pointer"
                        >
                          <option value="3-5">3 to 5 directors (Statutory Minimum is 3)</option>
                          <option value="6-10">6 to 10 directors (Healthy Oversight Size)</option>
                          <option value="11-15">11 to 15 directors (Structured Committee Base)</option>
                          <option value="16+">16+ directors (Risk of Fractured Quorums)</option>
                        </select>
                      </div>
                      <div className="space-y-1.5">
                        <label htmlFor="intake-frequency" className="block text-xs font-bold uppercase tracking-wider text-ink/75">
                          Meeting Frequency
                        </label>
                        <select 
                          id="intake-frequency"
                          value={frequency}
                          onChange={(e) => {
                            setFrequency(e.target.value);
                            saveIntakeToLocalStorage({ frequency: e.target.value });
                          }}
                          className="w-full p-3 bg-white border border-fog/80 rounded-lg text-sm text-ink focus:border-brass focus:outline-none cursor-pointer"
                        >
                          <option value="monthly">Monthly (Highly Proactive)</option>
                          <option value="bi-monthly">Bi-Monthly (Standard Oversight)</option>
                          <option value="quarterly">Quarterly (Minimum for Care)</option>
                          <option value="annually">Annually Only (Severe Liability Risk)</option>
                        </select>
                      </div>
                    </div>
                  )}

                  {step === 3 && (
                    <div className="space-y-4 animate-fade-in">
                      <div className="space-y-1.5">
                        <label htmlFor="intake-registry" className="block text-xs font-bold uppercase tracking-wider text-ink/75">
                          State Registry Standing
                        </label>
                        <select 
                          id="intake-registry"
                          value={stateStatus}
                          onChange={(e) => {
                            setStateStatus(e.target.value);
                            saveIntakeToLocalStorage({ stateStatus: e.target.value });
                          }}
                          className="w-full p-3 bg-white border border-fog/80 rounded-lg text-sm text-ink focus:border-brass focus:outline-none cursor-pointer"
                        >
                          <option value="current">Current & Compliant with State Registry (e.g., CA Attorney General)</option>
                          <option value="delinquent">Delinquent (Late RRF-1/CT-TR-1 filings, fines threatened)</option>
                          <option value="suspended">Suspended (FTB, Secretary of State, or Registry Suspended)</option>
                        </select>
                      </div>
                      
                      <div className="space-y-2">
                        <span id="intake-worries-label" className="block text-xs font-bold uppercase tracking-wider text-ink/75">
                          What primary worries keep your board up? (Select all that apply)
                        </span>
                        <div role="group" aria-labelledby="intake-worries-label" className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                          {[
                            { id: 'conflicts', label: 'Interested Director / Self-Dealing Contracts' },
                            { id: 'compensation', label: 'Executive Salaries & Benefit Audits' },
                            { id: 'bylaws', label: 'Bylaws Outdated or Inconsistent' },
                            { id: 'funds', label: 'Restricted Funds & Endowment stewardship' },
                            { id: 'liability', label: 'D&O Personal Liability exposure' }
                          ].map((item) => (
                            <label key={item.id} className="flex items-center gap-2 p-2.5 rounded border border-fog/45 hover:bg-paper/40 cursor-pointer select-none">
                              <input 
                                type="checkbox" 
                                checked={worries.includes(item.id)}
                                onChange={() => handleToggleWorry(item.id)}
                                className="accent-brass w-3.5 h-3.5"
                              />
                              <span className="text-ink/80 font-medium">{item.label}</span>
                            </label>
                          ))}
                        </div>
                      </div>
                    </div>
                  )}

                  {step === 4 && (
                    <div className="space-y-2 animate-fade-in">
                      <label htmlFor="intake-narrative" className="block text-xs font-bold uppercase tracking-wider text-ink/75">
                        Situational Narrative & Custom Governance Concerns (Optional)
                      </label>
                      <textarea 
                        id="intake-narrative"
                        rows={4}
                        placeholder="Provide details about your current conflict of interest contract, bylaws issue, or audit delinquency to customize the memo."
                        value={customConcerns}
                        onChange={(e) => {
                          setCustomConcerns(e.target.value);
                          saveIntakeToLocalStorage({ customConcerns: e.target.value });
                        }}
                        className="w-full p-3 bg-paper/30 border border-fog/80 rounded-lg text-sm text-ink focus:border-brass focus:ring-1 focus:ring-brass focus:outline-none placeholder:text-ink/35"
                      />
                    </div>
                  )}
                </div>

                {/* Navigation actions */}
                <div className="flex items-center justify-between pt-4 border-t border-fog">
                  <button
                    onClick={handleReset}
                    className="inline-flex items-center gap-1 text-xs font-bold uppercase tracking-wider text-ink/40 hover:text-burgundy transition-premium cursor-pointer"
                  >
                    <RotateCcw className="w-3.5 h-3.5" />
                    <span>Reset Form</span>
                  </button>
                  
                  <div className="flex items-center gap-3">
                    {step > 1 && (
                      <button
                        onClick={() => setStep(step - 1)}
                        className="inline-flex items-center gap-1 px-4 py-2 border border-fog hover:border-brass text-ink/70 hover:text-brass text-xs font-bold uppercase tracking-wider rounded transition-premium cursor-pointer"
                      >
                        <ChevronLeft className="w-4 h-4" />
                        <span>Back</span>
                      </button>
                    )}
                    
                    {step < 4 ? (
                      <button
                        onClick={() => {
                          if (step === 1 && !orgName.trim()) {
                            alert("Please enter your Organization Name to proceed.");
                            return;
                          }
                          setStep(step + 1);
                        }}
                        className="inline-flex items-center gap-1 px-5 py-2 bg-ink hover:bg-brass text-white hover:text-ink text-xs font-bold uppercase tracking-wider rounded transition-premium cursor-pointer shadow"
                      >
                        <span>Next</span>
                        <ChevronRight className="w-4 h-4" />
                      </button>
                    ) : (
                      <button
                        onClick={handleCompile}
                        className="inline-flex items-center gap-1.5 px-6 py-2.5 bg-brass text-ink font-bold uppercase tracking-widest text-xs rounded transition-premium cursor-pointer shadow hover:bg-ink hover:text-paper"
                      >
                        <Sparkles className="w-4 h-4 text-ink" />
                        <span>Compile Legal Memo</span>
                      </button>
                    )}
                  </div>
                </div>
              </div>
            ) : (
              <div className="space-y-6 animate-fade-in">
                {/* Generated parchment memo brief */}
                <div className="bg-paper/35 border-l-4 border-brass rounded-r-xl border-y border-r border-fog/85 p-6 sm:p-8 space-y-6 text-left relative overflow-hidden font-serif max-w-full">
                  <div className="absolute top-2 right-2 text-[9px] font-sans font-extrabold uppercase tracking-widest text-rose-700 bg-rose-50 border border-rose-200 px-2 py-0.5 rounded shadow-sm select-none">
                    Attorney-Client Privileged Work Product
                  </div>

                  <div className="space-y-4 border-b border-fog pb-6 font-serif">
                    <div className="text-center pb-4 text-ink/65 border-b border-fog/55">
                      <div className="text-[10px] font-bold text-copper uppercase tracking-widest mb-1.5 font-sans">
                        CONFIDENTIAL EDUCATIONAL STUDY AID — NOT FORMAL LEGAL COUNSEL
                      </div>
                      <div className="font-extrabold uppercase text-xs tracking-widest">Pre-Consultation Briefing Dossier</div>
                      <div className="font-serif italic text-xs mt-1">California Center for Nonprofit Law</div>
                    </div>

                    <div className="grid grid-cols-[80px_1fr] gap-x-2 gap-y-1.5 text-xs text-ink/85 leading-normal">
                      <strong className="font-sans font-extrabold uppercase text-[10px] tracking-wider text-ink/40 mt-0.5">TO:</strong>
                      <span className="font-semibold">Myron Steeves, J.D. • California Center for Nonprofit Law</span>

                      <strong className="font-sans font-extrabold uppercase text-[10px] tracking-wider text-ink/40 mt-0.5">FROM:</strong>
                      <span className="font-bold">{orgName} Governing Board Representative</span>

                      <strong className="font-sans font-extrabold uppercase text-[10px] tracking-wider text-ink/40 mt-0.5">DATE:</strong>
                      <span>{new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</span>

                      <strong className="font-sans font-extrabold uppercase text-[10px] tracking-wider text-ink/40 mt-0.5">RE:</strong>
                      <span className="font-bold text-slate-brand">Fiduciary Audit & Governance Intake Briefing Memo</span>
                    </div>
                  </div>

                  {/* Memo Section 1 */}
                  <div className="space-y-2 text-xs text-ink/80 font-sans">
                    <h4 className="font-sans font-extrabold text-[10px] uppercase tracking-wider text-brass">1. CORPORATE METADATA & OPERATIONS</h4>
                    <p className="leading-relaxed pl-4 border-l border-fog">
                      The entity is operating under the legal name of <strong className="text-ink font-semibold">{orgName}</strong>, managing an active board size of <strong className="text-ink font-semibold">{boardSize} directors</strong> on a <strong className="text-ink font-semibold">{
                        frequency === 'monthly' ? 'Monthly' :
                        frequency === 'bi-monthly' ? 'Bi-Monthly' :
                        frequency === 'quarterly' ? 'Quarterly' : 'Annual'
                      }</strong> meeting frequency. The organization scale is defined by an annual budget representing: <strong className="text-ink font-semibold">{
                        budget === 'under-250k' ? 'Under $250,000' :
                        budget === '250k-1m' ? '$250,000 - $1,000,000' :
                        budget === '1m-2m' ? '$1,000,000 - $2,000,000' : 'Over $2,000,000'
                      } / year</strong>. 
                      {budget === 'over-2m' && (
                        <span className="block mt-1 text-[11px] text-burgundy font-bold">
                          ⚠️ Statutory Compliance Directive: Having a budget exceeding $2M mandates the establishment of an independent Board Audit Committee under the CA Nonprofit Integrity Act.
                        </span>
                      )}
                    </p>
                  </div>

                  {/* Memo Section 2 */}
                  <div className="space-y-2 text-xs text-ink/80 font-sans">
                    <h4 className="font-sans font-extrabold text-[10px] uppercase tracking-wider text-brass">2. ATTORNEY GENERAL REGISTRY STANDING</h4>
                    <p className="leading-relaxed pl-4 border-l border-fog">
                      Our state reporting registry compliance is currently classified as: <strong className="text-ink font-semibold">{
                        stateStatus === 'current' ? 'Active / Current' :
                        stateStatus === 'delinquent' ? 'Delinquent' : 'Suspended'
                      }</strong>. 
                      {stateStatus === 'delinquent' && (
                        <span className="block mt-1.5 p-3 bg-amber-50 border border-amber-200 text-amber-900 rounded font-sans text-xs">
                          <strong>⚠️ REGISTRY WARNING:</strong> Delinquency status (e.g., in California) results in immediate accumulation of daily fiscal penalties and the loss of your right to solicit charitable contributions. State filings must be completed immediately.
                        </span>
                      )}
                      {stateStatus === 'suspended' && (
                        <span className="block mt-1.5 p-3 bg-rose-50 border border-rose-200 text-rose-900 rounded font-sans text-xs">
                          <strong>🚨 EMERGENCY STATUS REPORT:</strong> A suspended registry standing means all corporate legal powers and tax exemptions are currently null and void. The board must file an emergency petition for revivor with the California FTB/AG.
                        </span>
                      )}
                      {stateStatus === 'current' && (
                        <span className="block mt-1 text-emerald-700 font-semibold">
                          ✓ State registry filing reports are reported as active. Maintaining quarterly/annual reviews protects this clean stand.
                        </span>
                      )}
                    </p>
                  </div>

                  {/* Memo Section 3 */}
                  <div className="space-y-2 text-xs text-ink/80 font-sans">
                    <h4 className="font-sans font-extrabold text-[10px] uppercase tracking-wider text-brass">3. ASSESSED COMPLIANCE EXPOSURES</h4>
                    <div className="space-y-2 pl-4 border-l border-fog">
                      {worries.length === 0 ? (
                        <p className="italic text-ink/55">No specific major compliance worries selected. The board has requested a general governance audit of internal corporate records.</p>
                      ) : (
                        worries.map(w => {
                          if (w === 'conflicts') return (
                            <div key={w} className="space-y-0.5">
                              <strong className="text-ink font-bold block">⚠️ Interested Director Self-Dealing (CA Corp Code § 5233)</strong>
                              <span className="text-ink/70">Potential transaction involving an active board member or spousal entity without prior formal board disclosure, recusal, comparable market validation, and majority independent director vote. Significant risk of joint-and-several restitution fines.</span>
                            </div>
                          );
                          if (w === 'compensation') return (
                            <div key={w} className="space-y-0.5">
                              <strong className="text-ink font-bold block">⚠️ Executive Compensation Reasonableness (IRC § 4958)</strong>
                              <span className="text-ink/70">Exposure to IRS intermediate sanction excise taxes due to lacking a documented process for establishing comparable market compensation data. The board needs a formal Compensation Committee review and comparability study.</span>
                            </div>
                          );
                          if (w === 'bylaws') return (
                            <div key={w} className="space-y-0.5">
                              <strong className="text-ink font-bold block">⚠️ Outdated Corporate Bylaws</strong>
                              <span className="text-ink/70">Existing bylaws lack explicit electronic voting consent mechanisms, proper quorum clauses, or officer separation mandates. Corporate votes held under unaligned bylaws can be legally contested or declared void.</span>
                            </div>
                          );
                          if (w === 'funds') return (
                            <div key={w} className="space-y-0.5">
                              <strong className="text-ink font-bold block">⚠️ Endowment & Restricted Asset stewardship (UPMIFA compliance)</strong>
                              <span className="text-ink/70">Donor-restricted capital or endowments are being merged with general operating accounts, risking donor lawsuits, AG investigations, and breaches of charitable trust standards.</span>
                            </div>
                          );
                          if (w === 'liability') return (
                            <div key={w} className="space-y-0.5">
                              <strong className="text-ink font-bold block">⚠️ Director & Officer Personal Liability exposure</strong>
                              <span className="text-ink/70">Lack of protective indemnification clauses, inadequate D&O insurance, or failing to establish a "rebuttable presumption" of business judgment, exposing individual board members' personal assets.</span>
                            </div>
                          );
                          return null;
                        })
                      )}
                    </div>
                  </div>

                  {/* Memo Section 4 */}
                  <div className="space-y-2 text-xs text-ink/80 font-sans border-b border-fog pb-6">
                    <h4 className="font-sans font-extrabold text-[10px] uppercase tracking-wider text-brass">4. SITUATIONAL DETAIL NOTES</h4>
                    <p className="leading-relaxed pl-4 border-l border-fog italic bg-paper/25 p-3 rounded text-ink/75">
                      {customConcerns ? `"${customConcerns}"` : 'No additional custom details provided. Dossier prepared for direct attorney-client review.'}
                    </p>
                  </div>

                  <div className="text-[10px] text-ink/50 leading-relaxed font-sans pt-2">
                    <strong className="text-ink/70 block mb-0.5 uppercase tracking-wide">Privilege Disclaimer Note:</strong> This memorandum collects organizational facts specifically to facilitate preparatory due diligence for a formal legal consultation with NPO Lawyers. Access is restricted under work-product privilege.
                  </div>
                </div>

                {/* Memo Action bar */}
                <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-4 border-t border-fog text-xs">
                  <button
                    onClick={() => {
                      setIsCompiled(false);
                      saveIntakeToLocalStorage({ isCompiled: false });
                    }}
                    className="inline-flex items-center gap-1.5 text-ink/60 hover:text-ink font-bold uppercase tracking-wider cursor-pointer"
                  >
                    <RotateCcw className="w-4 h-4" />
                    <span>Edit Selections</span>
                  </button>

                  <div className="flex items-center gap-3 w-full sm:w-auto">
                    <button
                      onClick={handlePrint}
                      className="w-full sm:w-auto inline-flex items-center justify-center gap-1.5 px-4 py-2.5 border border-fog hover:border-brass text-ink/85 hover:text-brass font-bold uppercase tracking-wider rounded transition-premium cursor-pointer"
                    >
                      <Printer className="w-4 h-4" />
                      <span>Print Brief</span>
                    </button>
                    
                    <button
                      onClick={handleCopyClipboard}
                      className="w-full sm:w-auto inline-flex items-center justify-center gap-1.5 px-4 py-2.5 bg-ink text-white font-bold uppercase tracking-wider rounded transition-premium cursor-pointer shadow hover:bg-brass hover:text-ink"
                    >
                      {isCopied ? (
                        <>
                          <Check className="w-4 h-4 text-emerald-400" />
                          <span className="text-emerald-400">Brief Copied!</span>
                        </>
                      ) : (
                        <>
                          <Clipboard className="w-4 h-4" />
                          <span>Copy Memo</span>
                        </>
                      )}
                    </button>
                  </div>
                </div>

                {/* Direct Consult Referral Banner */}
                <div className="bg-burgundy/5 border-l-4 border-burgundy p-5 rounded-r-xl space-y-3">
                  <div className="flex items-center gap-1.5 text-burgundy">
                    <AlertCircle className="w-4 h-4 shrink-0" />
                    <span className="text-[10px] font-extrabold uppercase tracking-widest font-sans">Board Governance Consultation — Direct Case Evaluation</span>
                  </div>
                  <h4 className="font-serif font-bold text-base text-ink text-left">
                    Secure Professional Attorney-Client Protection
                  </h4>
                  <p className="text-xs text-ink/75 leading-relaxed font-sans font-medium text-left">
                    Your generated brief outlines critical legal parameters that expose individual board members or the organization's corporate charter. Submit your dossier to qualified charity counsel to immediately structure recusal procedures, bylaws audits, and Delaware/California AG compliance playbooks.
                  </p>
                  <div className="pt-2 text-left">
                    <button
                      onClick={() => {
                        const defaultMessage = `We would like to submit our board governance brief for an evaluation. Here are our organization details:\n\n* Organization: ${orgName}\n* Board Size: ${boardSize}\n* Annual Budget: ${budget}\n* Primary Governance Concern: ${customConcerns || 'General Compliance'}`;
                        navigate(`contact-us?topic=general&org=${encodeURIComponent(orgName)}&message=${encodeURIComponent(defaultMessage)}`);
                      }}
                      className="inline-flex items-center gap-1.5 px-5 py-2.5 bg-burgundy hover:bg-ink text-white text-xs font-bold uppercase tracking-wider rounded shadow transition-premium cursor-pointer font-sans border-0"
                    >
                      <span>Submit Intake Brief to Board Training Office ➜</span>
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Bottom Call to Action */}
          <div className="bg-ink rounded-xl border border-brass/30 p-8 text-paper text-center space-y-4">
            <h3 className="font-serif text-xl sm:text-2xl text-white font-bold tracking-wide">
              Bring Myron to Your Boardroom
            </h3>
            <p className="max-w-xl mx-auto text-xs sm:text-sm text-paper/80 font-sans leading-relaxed">
              Equip your board of directors with the exact tools, script guidelines, and liability boundaries they need to govern defensively. Schedule a 60-minute in-person session tailored to your bylaws.
            </p>
            <div className="pt-2 flex flex-col sm:flex-row justify-center items-center gap-4">
              <button 
                onClick={() => window.location.hash = '#/boards-101'}
                className="w-full sm:w-auto px-6 py-3 bg-brass hover:bg-white hover:text-ink text-ink text-xs font-bold uppercase tracking-wider rounded shadow transition-premium"
              >
                Learn About Boards 101 Training
              </button>
              <button 
                onClick={() => window.location.hash = '#/training'}
                className="w-full sm:w-auto px-6 py-3 border border-paper/30 hover:border-brass text-paper hover:text-brass text-xs font-bold uppercase tracking-wider rounded transition-premium"
              >
                Submit Consultation Request
              </button>
            </div>
          </div>

        </div>
      </div>
    </Layout>
  );
};

export default AboutUs;
