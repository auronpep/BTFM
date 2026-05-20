import React from 'react';
import { Layout } from '../components/Layout';
import { Award, Landmark, ExternalLink, Users, Scale } from 'lucide-react';

export const AboutUs: React.FC = () => {
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
              Meet our founder, Myron Steeves, J.D., and the legal support teams providing educational resources and custom workshops for California nonprofit directors.
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
                  Myron Steeves, J.D., has extensive experience serving nonprofit organizations. A graduate of <strong className="text-ink font-semibold">Georgetown University Law Center</strong> and <strong className="text-ink font-semibold">Biola University</strong>, Myron brings a rare combination of rigorous legal training, hands-on nonprofit experience, and faith-informed counsel to his work with mission-driven organizations. He is Dean Emeritus of Trinity Law School, a Christian law school devoted to championing a biblical view of human law and government.
                </p>
                
                <p className="text-sm sm:text-base text-ink/80 leading-relaxed font-sans">
                  Throughout his distinguished career, Myron has advised thousands of nonprofit leaders on formation, governance, compliance, bylaws audits, tax exemption, board responsibilities, and the heavy legal duties that come with organizational leadership. He frequently speaks on issues involving nonprofit law and public policy, and remains highly active in bar association initiatives and regional governance coalitions.
                </p>
              </div>
            </div>

            <hr className="border-fog" />

            {/* National Capability & Legal Team Section */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-left">
              <div className="space-y-3">
                <h3 className="font-serif font-bold text-lg text-slate-brand flex items-center gap-2">
                  <Users className="w-5 h-5 text-brass" />
                  Nonprofit Support Team
                </h3>
                <p className="text-xs sm:text-sm text-ink/75 leading-relaxed font-sans">
                  Myron is joined by a seasoned legal support team with substantial experience in nonprofit administration, corporate formations, tax-exempt applications (IRS Form 1023), bylaws reviews, corporate dissolution proceedings, and contract negotiations. Together, they deliver both legal judgment and practical operational experience to the daily hurdles nonprofit boards face.
                </p>
              </div>

              <div className="space-y-3">
                <h3 className="font-serif font-bold text-lg text-teal-brand flex items-center gap-2">
                  <Scale className="w-5 h-5 text-brass" />
                  California & Nationwide Reach
                </h3>
                <p className="text-xs sm:text-sm text-ink/75 leading-relaxed font-sans">
                  While Myron is based in Southern California and serves as a key authority on California statutory board rules (such as the California Registry of Charitable Trusts filings and the $2M independent audit threshold), he conducts customized **Board Training and governance workshops nationwide** to help boards build defensive, compliant cultures.
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
