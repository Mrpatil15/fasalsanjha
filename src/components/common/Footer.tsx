import React from 'react';
import { Link } from 'react-router-dom';
import { ShieldCheck, RotateCcw, Lock, Award, Heart, ExternalLink, Presentation } from 'lucide-react';
import { Logo } from './Logo';
import { useAppStore } from '../../store/useAppStore';

export const Footer: React.FC = () => {
  const { resetDemoData } = useAppStore();

  const handleReset = () => {
    if (window.confirm('Reset all demo data back to initial state?')) {
      resetDemoData();
      alert('Demo data has been reset successfully!');
    }
  };

  return (
    <footer className="bg-forest-950 text-slate-300 pt-16 pb-24 md:pb-12 border-t border-forest-900 mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Trust Badges Banner in Footer */}
        <div className="bg-forest-900/80 rounded-2xl p-6 border border-forest-800 shadow-inner grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <div className="flex items-start gap-3.5">
            <div className="p-2.5 rounded-xl bg-forest-800 text-limeaccent shrink-0">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div>
              <h4 className="text-white font-bold text-sm">Land Ownership Never Transferred</h4>
              <p className="text-xs text-slate-400 mt-0.5 leading-relaxed">
                Land is never mortgaged, leased, or pledged. Investor claim is strictly limited to agreed crop sales ratio.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3.5">
            <div className="p-2.5 rounded-xl bg-forest-800 text-harvest-400 shrink-0">
              <Lock className="w-6 h-6" />
            </div>
            <div>
              <h4 className="text-white font-bold text-sm">Regulated Escrow Milestones</h4>
              <p className="text-xs text-slate-400 mt-0.5 leading-relaxed">
                All capital sits in a scheduled commercial partner bank nodal escrow. Disbursed only after verified field milestones.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3.5">
            <div className="p-2.5 rounded-xl bg-forest-800 text-emerald-400 shrink-0">
              <Award className="w-6 h-6" />
            </div>
            <div>
              <h4 className="text-white font-bold text-sm">Dual Protection Insurance</h4>
              <p className="text-xs text-slate-400 mt-0.5 leading-relaxed">
                PMFBY aligned farmer yield coverage + 50–70% investor capital protection against catastrophic climate failure.
              </p>
            </div>
          </div>
        </div>

        {/* Footer Main Columns */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-8 pb-12 border-b border-forest-900/80">
          <div className="md:col-span-2 space-y-4">
            <Logo size="md" showTagline={false} />
            <p className="text-xs text-slate-400 leading-relaxed max-w-sm">
              <strong className="text-white">FasalSanjha</strong> (फसल साझा) is an agri-fintech and full-stack agri-marketplace bridging smallholder farmers with urban investors and institutional buyers through transparent risk-shared crop partnerships.
            </p>
            <p className="text-[11px] text-slate-500">
              Bharat Agri-Financial Services Pvt. Ltd. (proposed, pre-launch).<br />
              Registered Offices: Thane • Regional Hub: Pimpalgaon Baswant, Nashik, Maharashtra.
            </p>
          </div>

          <div>
            <h5 className="text-xs font-bold uppercase tracking-wider text-harvest-400 mb-3">Platform</h5>
            <ul className="space-y-2 text-xs">
              <li><Link to="/invest" className="hover:text-white transition-colors">Crop Investment Marketplace</Link></li>
              <li><Link to="/bazaar" className="hover:text-white transition-colors">FasalSanjha Bazaar Hub</Link></li>
              <li><Link to="/track" className="hover:text-white transition-colors">Satellite NDVI & Escrow Tracking</Link></li>
              <li><Link to="/requirement/new" className="hover:text-white transition-colors">Post Your Requirement</Link></li>
              <li><Link to="/prices" className="hover:text-white transition-colors">Mandi Prices & Trends</Link></li>
              <li><Link to="/calculator" className="hover:text-white transition-colors">Profit-Share Calculator</Link></li>
            </ul>
          </div>

          <div>
            <h5 className="text-xs font-bold uppercase tracking-wider text-harvest-400 mb-3">Roles & Portals</h5>
            <ul className="space-y-2 text-xs">
              <li><Link to="/farmer/dashboard" className="hover:text-white transition-colors">Farmer Portal</Link></li>
              <li><Link to="/investor/dashboard" className="hover:text-white transition-colors">Investor Portfolio</Link></li>
              <li><Link to="/onboarding" className="hover:text-white transition-colors">KYC & 7/12 Verification</Link></li>
              <li><Link to="/admin" className="hover:text-white transition-colors">Field Agent / Admin Desk</Link></li>
              <li><Link to="/trust" className="hover:text-white transition-colors">Trust, Legal & DPDP Act</Link></li>
              <li><Link to="/messages" className="hover:text-white transition-colors">Negotiation & Chats</Link></li>
            </ul>
          </div>

          <div>
            <h5 className="text-xs font-bold uppercase tracking-wider text-harvest-400 mb-3">Pitch & Presenter</h5>
            <div className="space-y-3">
              <Link 
                to="/pitch" 
                className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl bg-harvest-500 hover:bg-harvest-600 text-forest-950 font-bold text-xs transition-colors shadow"
              >
                <Presentation className="w-4 h-4" />
                <span>Launch Pitch Deck</span>
              </Link>
              <br />
              <button
                onClick={handleReset}
                className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl bg-forest-900 hover:bg-forest-800 text-slate-300 hover:text-white text-xs border border-forest-700 transition-colors"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Reset Demo Data</span>
              </button>
            </div>
          </div>
        </div>

        {/* Bottom Disclaimers & Copyright */}
        <div className="pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-center md:text-left text-xs text-slate-500">
          <div>
            <p>© 2026 FasalSanjha (Bharat Agri-Financial Services Pvt. Ltd.). All rights reserved.</p>
            <p className="text-[11px] text-slate-400 mt-1">
              <strong>Mandatory Investor Disclaimer:</strong> Illustrative demo — no real money or real data. Returns are yield-linked and not guaranteed. Model Contract Farming and DPDP compliant.
            </p>
          </div>

          <div className="flex items-center gap-4 text-[11px]">
            <Link to="/trust" className="hover:underline">Terms of Use</Link>
            <span>•</span>
            <Link to="/trust" className="hover:underline">Privacy Policy</Link>
            <span>•</span>
            <Link to="/trust" className="hover:underline">Escrow Governance</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};
