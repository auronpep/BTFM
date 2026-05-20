import React, { useState } from 'react';
import { useRouter } from '../components/Router';
import { Layout } from '../components/Layout';
import { articles } from '../data/articles';
import { scenarios } from '../data/scenarios';
import { Search, ChevronRight, BookOpen, AlertTriangle, Filter } from 'lucide-react';

export const Library: React.FC = () => {
  const { navigate, path } = useRouter();
  const [activeTab, setActiveTab] = useState<'articles' | 'scenarios'>('articles');
  const [searchQuery, setSearchQuery] = useState('');
  
  // Map specific paths to initial categories
  const getInitialCategory = () => {
    if (path === 'money-audit') return 'Finance';
    if (path === 'executive-oversight') return 'Strategy';
    if (path === 'risk-safety') return 'Safety';
    if (path === 'minutes-records') return 'Legal';
    return 'All';
  };
  
  const [selectedCategory, setSelectedCategory] = useState<string>(getInitialCategory());

  React.useEffect(() => {
    if (path === 'money-audit') {
      setSelectedCategory('Finance');
      setActiveTab('articles');
    } else if (path === 'executive-oversight') {
      setSelectedCategory('Strategy');
      setActiveTab('articles');
    } else if (path === 'risk-safety') {
      setSelectedCategory('Safety');
      setActiveTab('articles');
    } else if (path === 'minutes-records') {
      setSelectedCategory('Legal');
      setActiveTab('articles');
    }
  }, [path]);

  const categories = ['All', 'Strategy', 'Finance', 'Safety', 'Legal', 'Startup'];

  const filteredArticles = articles.filter(art => {
    const matchesSearch = art.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          art.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          art.content.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || art.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const filteredScenarios = scenarios.filter(sc => {
    const matchesSearch = sc.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          sc.facts.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          sc.recommendedAction.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || 
                            (selectedCategory === 'Finance' && sc.issueType === 'Financial Oversight') ||
                            (selectedCategory === 'Safety' && sc.issueType === 'Risk Management') ||
                            (selectedCategory === 'Legal' && sc.issueType === 'Regulatory Compliance') ||
                            (selectedCategory === 'Legal' && sc.issueType === 'Conflict of Interest') ||
                            (selectedCategory === 'Strategy' && sc.issueType === 'Chain of Command') ||
                            (selectedCategory === 'Strategy' && sc.issueType === 'Board Operations') ||
                            (selectedCategory === 'Startup' && sc.boardStage === 'Startup');
    return matchesSearch && matchesCategory;
  });

  return (
    <Layout>
      <div className="py-12 bg-paper/30 min-h-screen px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto space-y-8">
          
          {/* Header */}
          <div className="text-center space-y-3">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-brass/10 border border-brass/30 text-brass rounded-full text-xs font-semibold uppercase tracking-wider">
              <BookOpen className="w-3.5 h-3.5" />
              <span>Governance Research Desk</span>
            </div>
            <h1 className="font-serif text-3xl sm:text-4xl text-ink font-bold tracking-wide">
              The Desk Reference Library
            </h1>
            <p className="max-w-2xl mx-auto text-sm sm:text-base text-ink/70">
              A comprehensive archive of fiduciaries masterclasses, regulatory guidelines, and classroom-style scenarios. Grounded directly in California state code and IRS safe harbors.
            </p>
          </div>

          {/* Search & Filter Control Board */}
          <div className="bg-white rounded-xl shadow-md border border-fog p-5 sm:p-6 space-y-4">
            <div className="flex flex-col md:flex-row gap-4">
              {/* Search input */}
              <div className="relative flex-grow">
                <Search className="absolute left-3.5 top-3.5 w-4 h-4 text-ink/40" />
                <input
                  type="text"
                  placeholder="Search articles, legal rules, guidelines, facts, or actions..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full bg-paper/25 border border-fog/80 focus:border-brass rounded-lg p-3 pl-10 text-sm font-sans focus:outline-none focus:ring-1 focus:ring-brass transition-premium"
                />
              </div>
              
              {/* Categories filters (horizontal scrollable on mobile) */}
              <div className="flex items-center gap-1.5 overflow-x-auto pb-1 md:pb-0 shrink-0">
                <Filter className="w-4 h-4 text-ink/40 mr-1 hidden sm:block" />
                {categories.map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setSelectedCategory(cat)}
                    className={`px-3 py-1.5 text-xs font-bold uppercase tracking-wider rounded transition-premium whitespace-nowrap ${
                      selectedCategory === cat
                        ? 'bg-brass text-ink border border-brass'
                        : 'bg-paper/35 text-ink/70 border border-fog/60 hover:text-ink hover:bg-fog/30'
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>

            {/* Toggle tabs for Masterclasses vs Scenarios */}
            <div className="flex border-b border-fog/60">
              <button
                onClick={() => setActiveTab('articles')}
                className={`py-3 px-6 text-xs sm:text-sm font-bold uppercase tracking-wider border-b-2 transition-premium flex items-center gap-2 ${
                  activeTab === 'articles'
                    ? 'border-brass text-brass'
                    : 'border-transparent text-ink/50 hover:text-ink'
                }`}
              >
                <BookOpen className="w-4 h-4" />
                <span>Cornerstone Masterclasses ({filteredArticles.length})</span>
              </button>
              
              <button
                onClick={() => setActiveTab('scenarios')}
                className={`py-3 px-6 text-xs sm:text-sm font-bold uppercase tracking-wider border-b-2 transition-premium flex items-center gap-2 ${
                  activeTab === 'scenarios'
                    ? 'border-brass text-brass'
                    : 'border-transparent text-ink/50 hover:text-ink'
                }`}
              >
                <AlertTriangle className="w-4 h-4" />
                <span>Classroom Scenarios ({filteredScenarios.length})</span>
              </button>
            </div>
          </div>

          {/* Core Library Grid */}
          {activeTab === 'articles' ? (
            /* ARTICLES LIST */
            filteredArticles.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredArticles.map((art) => (
                  <div
                    key={art.slug}
                    onClick={() => navigate(`article/${art.slug}`)}
                    className="bg-white rounded-xl shadow-sm border border-fog/80 overflow-hidden cursor-pointer hover:border-brass hover:shadow-md hover:-translate-y-0.5 transition-premium text-left flex flex-col justify-between"
                  >
                    <div className="p-6 space-y-4">
                      {/* Meta Tags */}
                      <div className="flex items-center justify-between flex-wrap gap-2 text-[10px] font-extrabold uppercase tracking-wider text-ink/40">
                        <span className="bg-paper border border-fog/80 px-2 py-0.5 rounded text-slate-brand">{art.category}</span>
                        <span>{art.readingTime} Min Read</span>
                      </div>
                      
                      <div className="space-y-1.5">
                        <h3 className="font-serif font-bold text-lg text-ink line-clamp-2 leading-snug group-hover:text-brass transition-premium">
                          {art.title}
                        </h3>
                        <p className="font-sans text-xs text-ink/75 leading-relaxed line-clamp-3">
                          {art.description}
                        </p>
                      </div>
                    </div>

                    {/* Lower Card Bar */}
                    <div className="px-6 py-4 bg-paper/10 border-t border-fog/60 flex items-center justify-between">
                      <span className="text-[10px] font-bold text-brass uppercase bg-brass/10 border border-brass/20 px-2 py-0.5 rounded tracking-wider">
                        {art.difficulty} Standard
                      </span>
                      <div className="inline-flex items-center gap-1 text-[11px] font-bold uppercase tracking-wider text-slate-brand hover:text-brass transition-premium">
                        <span>Study Guide</span>
                        <ChevronRight className="w-3.5 h-3.5" />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="bg-white rounded-xl border border-fog p-12 text-center text-ink/50 space-y-3">
                <BookOpen className="w-12 h-12 mx-auto text-ink/20" />
                <p className="font-serif text-lg font-bold">No masterclasses found matching your filter</p>
                <p className="text-sm font-sans">Try expanding your search query or adjusting category filters.</p>
              </div>
            )
          ) : (
            /* SCENARIOS LIST */
            filteredScenarios.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-left">
                {filteredScenarios.map((sc) => (
                  <div
                    key={sc.slug}
                    onClick={() => navigate(`scenario/${sc.slug}`)}
                    className="bg-white rounded-xl shadow-sm border border-fog overflow-hidden cursor-pointer hover:border-brass hover:shadow-md hover:-translate-y-0.5 transition-premium p-6 flex flex-col justify-between"
                  >
                    <div className="space-y-4">
                      {/* Meta Tags */}
                      <div className="flex items-center justify-between flex-wrap gap-2">
                        <span className="text-[10px] font-extrabold text-brass uppercase bg-brass/10 border border-brass/20 px-2 py-0.5 rounded tracking-wider">
                          {sc.issueType}
                        </span>
                        <span className="text-[10px] font-bold text-ink/40 uppercase tracking-widest bg-paper px-2 py-0.5 rounded border border-fog/40">{sc.boardStage} stage</span>
                      </div>
                      
                      <div className="space-y-2">
                        <h3 className="font-serif font-bold text-lg sm:text-xl text-ink leading-snug">
                          {sc.title}
                        </h3>
                        <p className="font-sans text-xs sm:text-sm text-ink/75 leading-relaxed line-clamp-4">
                          <strong className="text-ink font-bold block mb-1">FACTS:</strong>
                          {sc.facts}
                        </p>
                      </div>
                    </div>

                    <div className="pt-4 mt-4 border-t border-fog/50 flex items-center justify-between text-xs font-bold text-slate-brand uppercase tracking-wider">
                      <span className="text-brass font-medium text-[10px] uppercase">Rebuttable Presumption</span>
                      <div className="inline-flex items-center gap-1 hover:text-brass transition-premium">
                        <span>Inspect Case Study</span>
                        <ChevronRight className="w-4 h-4" />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="bg-white rounded-xl border border-fog p-12 text-center text-ink/50 space-y-3">
                <AlertTriangle className="w-12 h-12 mx-auto text-ink/20" />
                <p className="font-serif text-lg font-bold">No classroom scenarios found matching your filter</p>
                <p className="text-sm font-sans">Try expanding your search query or adjusting category filters.</p>
              </div>
            )
          )}

          {/* General reference Callout */}
          <div className="bg-brass/5 border border-brass/20 rounded-xl p-6 text-left flex flex-col md:flex-row justify-between items-center gap-6">
            <div className="space-y-1">
              <h4 className="font-serif font-bold text-base text-ink">Need a customized bylaws or governance audit?</h4>
              <p className="text-xs text-ink/70 leading-relaxed font-sans max-w-2xl">
                The Attorney General's Registry of Charitable Trusts monitors charities strictly. If you have been delinquent, or your bylaws are outdated, consult the team at California Center for Nonprofit Law.
              </p>
            </div>
            <a
              href="https://NPOlawyers.com"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-1.5 px-5 py-3 bg-brass hover:bg-ink hover:text-white text-ink text-xs font-bold uppercase tracking-wider rounded shadow transition-premium whitespace-nowrap"
            >
              <span>Consult NPO Lawyers</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </a>
          </div>

        </div>
      </div>
    </Layout>
  );
};
export default Library;
