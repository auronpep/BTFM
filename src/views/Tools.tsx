import React from 'react';
import { useRouter } from '../components/Router';
import { Layout } from '../components/Layout';
import { Award, FileText, ShieldCheck, Scale, Landmark, ChevronRight, Activity, ArrowRight } from 'lucide-react';

export const Tools: React.FC = () => {
  const { navigate } = useRouter();

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
                  {/* Tool icon */}
                  <div className={`w-12 h-12 rounded-lg flex items-center justify-center border border-fog/50 ${tool.themeColor.split(' ')[2]}`}>
                    {tool.icon}
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
    </Layout>
  );
};
export default Tools;
