import React, { useState } from 'react';
import { useRouter } from '../components/Router';
import { Layout } from '../components/Layout';
import { articles } from '../data/articles';
import { scenarios } from '../data/scenarios';
import { Search, ChevronRight, BookOpen, AlertTriangle, Award, Star, CheckSquare, Square, Trash2 } from 'lucide-react';

export const Library: React.FC = () => {
  const { navigate, path } = useRouter();
  const getInitialTab = () => {
    if (path === 'scenarios') return 'scenarios';
    return 'articles';
  };
  const [activeTab, setActiveTab] = useState<'articles' | 'scenarios'>(getInitialTab());
  const [searchQuery, setSearchQuery] = useState('');
  
  // Mastery filter states
  const [masteryFilter, setMasteryFilter] = useState<'all' | 'studied' | 'unstudied'>('all');
  
  // Local storage state
  const [studiedList, setStudiedList] = useState<string[]>(() => {
    try {
      const stored = localStorage.getItem('board_mastery_progress');
      if (stored) {
        const parsed = JSON.parse(stored);
        return Array.isArray(parsed) ? parsed : [];
      }
    } catch (e) {
      console.error(e);
    }
    return [];
  });

  const [bookmarkedList, setBookmarkedList] = useState<string[]>(() => {
    try {
      const stored = localStorage.getItem('cdx_bookmarked_slugs');
      if (stored) {
        const parsed = JSON.parse(stored);
        return Array.isArray(parsed) ? parsed : [];
      }
    } catch (e) {
      console.error(e);
    }
    return [];
  });

  const handleToggleBookmark = (slug: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setBookmarkedList(prev => {
      const next = prev.includes(slug) ? prev.filter(s => s !== slug) : [...prev, slug];
      localStorage.setItem('cdx_bookmarked_slugs', JSON.stringify(next));
      return next;
    });
  };

  const handleToggleStudy = (slug: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setStudiedList(prev => {
      const next = prev.includes(slug) ? prev.filter(s => s !== slug) : [...prev, slug];
      localStorage.setItem('board_mastery_progress', JSON.stringify(next));
      return next;
    });
  };

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
    const timer = setTimeout(() => {
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
      } else if (path === 'scenarios') {
        setActiveTab('scenarios');
      } else if (path === 'library' || path === 'articles') {
        setActiveTab('articles');
      }
    }, 0);
    return () => clearTimeout(timer);
  }, [path]);

  const categories = ['All', 'Strategy', 'Finance', 'Safety', 'Legal', 'Startup'];

  const matchesMultiTokenSearch = (itemTextSources: string[], query: string) => {
    if (!query.trim()) return true;
    const tokens = query.toLowerCase().split(/\s+/).filter(Boolean);
    const combinedText = itemTextSources.map(s => (s || '').toLowerCase()).join(' ');
    return tokens.every(token => combinedText.includes(token));
  };

  const filteredArticles = articles.filter(art => {
    const matchesSearch = matchesMultiTokenSearch(
      [art.title, art.description, art.content, art.category, art.difficulty],
      searchQuery
    );
    const matchesCategory = selectedCategory === 'All' || art.category === selectedCategory;
    
    const isStudied = studiedList.includes(art.slug);
    const matchesMastery = masteryFilter === 'all' || 
                           (masteryFilter === 'studied' && isStudied) || 
                           (masteryFilter === 'unstudied' && !isStudied);
                           
    return matchesSearch && matchesCategory && matchesMastery;
  });

  const filteredScenarios = scenarios.filter(sc => {
    const matchesSearch = matchesMultiTokenSearch(
      [sc.title, sc.facts, sc.recommendedAction, sc.issueType, sc.boardStage],
      searchQuery
    );
    const matchesCategory = selectedCategory === 'All' || 
                            (selectedCategory === 'Finance' && sc.issueType === 'Financial Oversight') ||
                            (selectedCategory === 'Safety' && sc.issueType === 'Risk Management') ||
                            (selectedCategory === 'Legal' && sc.issueType === 'Regulatory Compliance') ||
                            (selectedCategory === 'Legal' && sc.issueType === 'Conflict of Interest') ||
                            (selectedCategory === 'Strategy' && sc.issueType === 'Chain of Command') ||
                            (selectedCategory === 'Strategy' && sc.issueType === 'Board Operations') ||
                            (selectedCategory === 'Startup' && sc.boardStage === 'Startup');
                            
    const isStudied = studiedList.includes(sc.slug);
    const matchesMastery = masteryFilter === 'all' || 
                           (masteryFilter === 'studied' && isStudied) || 
                           (masteryFilter === 'unstudied' && !isStudied);
                           
    return matchesSearch && matchesCategory && matchesMastery;
  });

  return (
    <Layout>
      <div className="py-12 bg-paper/30 min-h-screen px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto space-y-8">
          
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
              A comprehensive archive of fiduciaries training articles, regulatory guidelines, and classroom-style scenarios. Grounded directly in statutory codes and IRS safe harbors.
            </p>
          </div>

          {/* TWO-COLUMN EXECUTIVE LAYOUT */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            
            {/* LEFT MAIN RAIL: ARTICLES OR SCENARIOS LIST GRID (col-span-8) */}
            <main className="lg:col-span-8 space-y-6">
              
              {/* Toggle tabs for Articles vs Scenarios */}
              <div className="bg-white rounded-xl shadow-sm border border-fog flex p-1.5">
                <button
                  onClick={() => setActiveTab('articles')}
                  className={`flex-1 py-3 text-xs sm:text-sm font-bold uppercase tracking-wider rounded-lg transition-premium flex items-center justify-center gap-2 select-none cursor-pointer ${
                    activeTab === 'articles'
                      ? 'bg-brass text-ink shadow font-bold'
                      : 'text-ink/60 hover:text-ink hover:bg-fog/20'
                  }`}
                >
                  <BookOpen className="w-4.5 h-4.5" />
                  <span>Training Articles ({filteredArticles.length})</span>
                </button>
                
                <button
                  onClick={() => setActiveTab('scenarios')}
                  className={`flex-1 py-3 text-xs sm:text-sm font-bold uppercase tracking-wider rounded-lg transition-premium flex items-center justify-center gap-2 select-none cursor-pointer ${
                    activeTab === 'scenarios'
                      ? 'bg-brass text-ink shadow font-bold'
                      : 'text-ink/60 hover:text-ink hover:bg-fog/20'
                  }`}
                >
                  <AlertTriangle className="w-4.5 h-4.5" />
                  <span>Classroom Scenarios ({filteredScenarios.length})</span>
                </button>
              </div>

              {/* Grid content based on tab selection */}
              {activeTab === 'articles' ? (
                filteredArticles.length > 0 ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {filteredArticles.map((art) => {
                      const hasStudied = studiedList.includes(art.slug);
                      return (
                        <div
                          key={art.slug}
                          onClick={() => navigate(`article/${art.slug}`)}
                          className={`bg-white rounded-xl shadow-sm border overflow-hidden cursor-pointer hover:shadow-md hover:-translate-y-0.5 transition-premium text-left flex flex-col justify-between group ${
                            hasStudied ? 'border-brass/50 bg-paper/5' : 'border-fog/80'
                          }`}
                        >
                          <div className="p-6 space-y-4">
                            <div className="flex items-center justify-between flex-wrap gap-2 text-[10px] font-extrabold uppercase tracking-wider">
                              <span className="bg-paper border border-fog/80 px-2 py-0.5 rounded text-slate-brand">{art.category}</span>
                              <div className="flex items-center gap-2">
                                <span className="text-ink/40">{art.readingTime} Min Read</span>
                                <div className="flex items-center gap-1 bg-paper/50 p-0.5 rounded border border-fog/40 select-none">
                                  <button
                                    onClick={(e) => handleToggleBookmark(art.slug, e)}
                                    className="p-1 rounded-full hover:bg-fog/40 text-ink/40 hover:text-brass transition-premium cursor-pointer focus:outline-none"
                                    title={bookmarkedList.includes(art.slug) ? "Remove Bookmark" : "Save Bookmark"}
                                  >
                                    <Star className={`w-3.5 h-3.5 ${bookmarkedList.includes(art.slug) ? "fill-brass text-brass" : ""}`} />
                                  </button>
                                  <button
                                    onClick={(e) => handleToggleStudy(art.slug, e)}
                                    className="p-1 rounded-full hover:bg-fog/40 text-ink/40 hover:text-emerald-700 transition-premium cursor-pointer focus:outline-none"
                                    title={hasStudied ? "Mark as Unstudied" : "Mark as Studied"}
                                  >
                                    {hasStudied ? (
                                      <CheckSquare className="w-3.5 h-3.5 text-emerald-750" />
                                    ) : (
                                      <Square className="w-3.5 h-3.5" />
                                    )}
                                  </button>
                                </div>
                              </div>
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
                      );
                    })}
                  </div>
                ) : (
                  <div className="bg-white rounded-xl border border-fog p-12 text-center text-ink/50 space-y-3">
                    <BookOpen className="w-12 h-12 mx-auto text-ink/20" />
                    <p className="font-serif text-lg font-bold">No articles found matching your filter</p>
                    <p className="text-sm font-sans">Try expanding your search query or adjusting your filters in the sidebar.</p>
                  </div>
                )
              ) : (
                filteredScenarios.length > 0 ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-left">
                    {filteredScenarios.map((sc) => {
                      const hasStudied = studiedList.includes(sc.slug);
                      return (
                        <div
                          key={sc.slug}
                          onClick={() => navigate(`scenario/${sc.slug}`)}
                          className={`bg-white rounded-xl shadow-sm border overflow-hidden cursor-pointer hover:shadow-md hover:-translate-y-0.5 transition-premium p-6 flex flex-col justify-between group ${
                            hasStudied ? 'border-brass/50 bg-paper/5' : 'border-fog'
                          }`}
                        >
                          <div className="space-y-4">
                            <div className="flex items-center justify-between flex-wrap gap-2">
                              <span className="text-[10px] font-extrabold text-brass uppercase bg-brass/10 border border-brass/20 px-2 py-0.5 rounded tracking-wider">
                                {sc.issueType}
                              </span>
                              <div className="flex items-center gap-2">
                                <span className="text-[10px] font-bold text-ink/40 uppercase tracking-widest bg-paper px-2 py-0.5 rounded border border-fog/40">{sc.boardStage} stage</span>
                                <div className="flex items-center gap-1 bg-paper/50 p-0.5 rounded border border-fog/40 select-none">
                                  <button
                                    onClick={(e) => handleToggleBookmark(sc.slug, e)}
                                    className="p-1 rounded-full hover:bg-fog/40 text-ink/40 hover:text-brass transition-premium cursor-pointer focus:outline-none"
                                    title={bookmarkedList.includes(sc.slug) ? "Remove Bookmark" : "Save Bookmark"}
                                  >
                                    <Star className={`w-3.5 h-3.5 ${bookmarkedList.includes(sc.slug) ? "fill-brass text-brass" : ""}`} />
                                  </button>
                                  <button
                                    onClick={(e) => handleToggleStudy(sc.slug, e)}
                                    className="p-1 rounded-full hover:bg-fog/40 text-ink/40 hover:text-emerald-700 transition-premium cursor-pointer focus:outline-none"
                                    title={hasStudied ? "Mark as Unstudied" : "Mark as Studied"}
                                  >
                                    {hasStudied ? (
                                      <CheckSquare className="w-3.5 h-3.5 text-emerald-750" />
                                    ) : (
                                      <Square className="w-3.5 h-3.5" />
                                    )}
                                  </button>
                                </div>
                              </div>
                            </div>
                            
                            <div className="space-y-2">
                              <h3 className="font-serif font-bold text-lg sm:text-xl text-ink leading-snug group-hover:text-brass transition-premium">
                                {sc.title}
                              </h3>
                              <p className="font-sans text-xs text-ink/75 leading-relaxed line-clamp-4">
                                <strong className="text-ink font-bold block mb-1 font-sans text-xs">FACTS SUMMARY:</strong>
                                {sc.facts}
                              </p>
                            </div>
                          </div>

                          <div className="pt-4 mt-4 border-t border-fog/50 flex items-center justify-between text-xs font-bold text-slate-brand uppercase tracking-wider">
                            <span className="text-brass font-medium text-[10px] uppercase">REBUTTABLE PRESUMPTION</span>
                            <div className="inline-flex items-center gap-1 hover:text-brass transition-premium">
                              <span>Inspect Case Study</span>
                              <ChevronRight className="w-4 h-4" />
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                ) : (
                  <div className="bg-white rounded-xl border border-fog p-12 text-center text-ink/50 space-y-3">
                    <AlertTriangle className="w-12 h-12 mx-auto text-ink/20" />
                    <p className="font-serif text-lg font-bold">No classroom scenarios found matching your filter</p>
                    <p className="text-sm font-sans">Try expanding your search query or adjusting your filters in the sidebar.</p>
                  </div>
                )
              )}
            </main>

            {/* RIGHT SIDEBAR: CONTROLS & MONITOR DESK (col-span-4) */}
            <aside className="lg:col-span-4 space-y-6 lg:sticky lg:top-24">
              
              {/* Search Widget */}
              <div className="bg-white p-5 rounded-xl border border-fog shadow-sm text-left space-y-4">
                <div className="space-y-1">
                  <h4 className="font-serif font-bold text-base text-ink tracking-wide">Search Desk</h4>
                  <p className="text-[10px] font-bold text-ink/40 uppercase tracking-widest">Instant Text Scan</p>
                </div>
                
                <div className="relative">
                  <Search className="absolute left-3 top-3 w-4 h-4 text-ink/40" />
                  <input
                    type="text"
                    aria-label="Search the library"
                    placeholder="Scan keywords..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full bg-paper/20 border border-fog hover:border-brass/50 focus:border-brass rounded-lg p-2.5 pl-9 text-xs font-sans focus:outline-none focus:ring-1 focus:ring-brass transition-premium"
                  />
                </div>
              </div>

              {/* Category Filter List */}
              <div className="bg-white p-5 rounded-xl border border-fog shadow-sm text-left space-y-3">
                <div className="space-y-1 pb-2 border-b border-fog/60">
                  <h4 className="font-serif font-bold text-base text-ink tracking-wide">Governance Sectors</h4>
                  <p className="text-[10px] font-bold text-ink/40 uppercase tracking-widest">Category-specific standards</p>
                </div>

                <div className="flex flex-col gap-1.5">
                  {categories.map((cat) => (
                    <button
                      key={cat}
                      onClick={() => setSelectedCategory(cat)}
                      className={`w-full flex items-center justify-between p-2 rounded-lg text-xs font-bold uppercase tracking-wider transition-premium cursor-pointer select-none border ${
                        selectedCategory === cat
                          ? 'bg-brass text-ink border-brass shadow-sm'
                          : 'bg-paper/10 border-transparent hover:bg-paper/30 text-ink/75 hover:text-ink'
                      }`}
                    >
                      <span>{cat} Standard</span>
                      <ChevronRight className="w-3.5 h-3.5" />
                    </button>
                  ))}
                </div>
              </div>

              {/* Fiduciary Mastery Progress Dashboard */}
              <div className="bg-paper border border-brass/35 rounded-xl p-5 text-left space-y-4 shadow-sm">
                <div className="flex items-center justify-between">
                  <div className="space-y-1">
                    <h4 className="font-serif font-bold text-base text-ink tracking-wide">Fiduciary Mastery</h4>
                    <p className="text-[10px] text-ink/50 uppercase tracking-widest font-extrabold">Continuous Duty of Care</p>
                  </div>
                  <Award className="w-8 h-8 text-brass shrink-0 bg-brass/10 p-1.5 rounded-full border border-brass/20" />
                </div>

                <div className="space-y-2">
                  <div className="flex justify-between items-center text-xs font-bold text-ink">
                    <span>{studiedList.length} of 18 Complete</span>
                    <span className="text-brass text-[10px] bg-brass/15 px-2 py-0.5 rounded border border-brass/25">
                      {studiedList.length >= 15 ? 'Governing Director' : studiedList.length >= 8 ? 'Prudent Trustee' : 'Fiduciary Apprentice'}
                    </span>
                  </div>
                  <div className="w-full bg-fog h-2 rounded-full overflow-hidden border border-brass/5">
                    <div
                      className="bg-brass h-full rounded-full transition-all duration-500"
                      style={{ width: `${(studiedList.length / 18) * 100}%` }}
                    />
                  </div>
                  <p className="text-[10px] text-ink/65 leading-relaxed font-sans">
                    {studiedList.length > 0 
                      ? "Great progress. Reviewing cases protects your personal assets and builds board compliance shields."
                      : "Complete case studies and article checklist tasks to earn 'Governing Director' status!"
                    }
                  </p>
                </div>

                <div className="pt-3 border-t border-brass/15 space-y-2.5">
                  <span className="text-[10px] font-bold text-ink/40 uppercase tracking-wider block">Filter by Study Status:</span>
                  <div className="grid grid-cols-3 gap-1 bg-white p-1 rounded-lg border border-fog/80">
                    <button
                      onClick={() => setMasteryFilter('all')}
                      className={`py-1.5 text-[10px] font-extrabold uppercase tracking-wider text-center rounded transition-premium select-none cursor-pointer ${
                        masteryFilter === 'all'
                          ? 'bg-brass text-ink font-bold'
                          : 'text-ink/60 hover:text-ink hover:bg-fog/20'
                      }`}
                    >
                      All
                    </button>
                    <button
                      onClick={() => setMasteryFilter('studied')}
                      className={`py-1.5 text-[10px] font-extrabold uppercase tracking-wider text-center rounded transition-premium select-none cursor-pointer ${
                        masteryFilter === 'studied'
                          ? 'bg-brass text-ink font-bold'
                          : 'text-ink/60 hover:text-ink hover:bg-fog/20'
                      }`}
                    >
                      Studied
                    </button>
                    <button
                      onClick={() => setMasteryFilter('unstudied')}
                      className={`py-1.5 text-[10px] font-extrabold uppercase tracking-wider text-center rounded transition-premium select-none cursor-pointer ${
                        masteryFilter === 'unstudied'
                          ? 'bg-brass text-ink font-bold'
                          : 'text-ink/60 hover:text-ink hover:bg-fog/20'
                      }`}
                    >
                      To Study
                    </button>
                  </div>
                </div>
              </div>

              {/* My Bookmarked Library Widget */}
              <div className="bg-white p-5 rounded-xl border border-fog shadow-sm text-left space-y-4">
                <div className="flex items-center justify-between pb-2 border-b border-fog/60">
                  <div className="space-y-1">
                    <h4 className="font-serif font-bold text-base text-ink tracking-wide">Saved Guides</h4>
                    <p className="text-[10px] text-ink/40 uppercase tracking-widest font-extrabold">Your Study List</p>
                  </div>
                  <Star className="w-5 h-5 text-brass fill-brass/20" />
                </div>

                {bookmarkedList.length === 0 ? (
                  <div className="text-xs text-ink/50 py-4 text-center leading-relaxed font-sans">
                    No saved guides yet. Click the <Star className="w-3 h-3 inline fill-brass text-brass mb-0.5" /> star on any card to bookmark it here for fast reference.
                  </div>
                ) : (
                  <div className="space-y-2.5 max-h-60 overflow-y-auto pr-1">
                    {bookmarkedList.map((slug) => {
                      const art = articles.find(a => a.slug === slug);
                      const sc = scenarios.find(s => s.slug === slug);
                      const title = art ? art.title : (sc ? sc.title : slug);
                      const type = art ? "Article" : "Scenario";
                      const path = art ? `article/${slug}` : `scenario/${slug}`;
                      
                      return (
                        <div key={slug} className="flex items-start justify-between gap-2 p-2 hover:bg-paper/35 rounded-lg border border-transparent hover:border-fog/40 transition-premium">
                          <button
                            onClick={() => navigate(path)}
                            className="flex-1 text-left text-xs font-semibold text-ink hover:text-brass transition-premium leading-tight focus:outline-none cursor-pointer"
                          >
                            <span className="text-[9px] font-extrabold uppercase tracking-wider text-brass/80 block mb-0.5">{type}</span>
                            <span className="line-clamp-2">{title}</span>
                          </button>
                          <button
                            onClick={(e) => handleToggleBookmark(slug, e)}
                            className="text-ink/30 hover:text-burgundy p-1 rounded-full hover:bg-fog/50 transition-premium shrink-0 cursor-pointer"
                            title="Remove Bookmark"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>

            </aside>
          </div>

          {/* General reference Callout */}
          <div className="bg-brass/5 border border-brass/20 rounded-xl p-6 text-left flex flex-col md:flex-row justify-between items-center gap-6">
            <div className="space-y-1">
              <h4 className="font-serif font-bold text-base text-ink">Need a customized bylaws or governance audit?</h4>
              <p className="text-xs text-ink/70 leading-relaxed font-sans max-w-2xl font-semibold">
                State Attorney Generals monitor charities strictly. If you have been delinquent, or your bylaws are outdated, consult the team at NPO Lawyers.
              </p>
            </div>
            <button
              onClick={() => navigate('contact-us?topic=bylaws&message=We%20are%20using%20the%20Boardroom%20Research%20Desk%20Library%20and%20would%20like%20to%20request%20information%20on%20scheduling%20a%20professional%20bylaws%20and%20governance%20audit%20for%20our%20board.')}
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
export default Library;
