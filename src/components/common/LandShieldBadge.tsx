import React from 'react';
import { ShieldCheck } from 'lucide-react';

interface LandShieldBadgeProps {
  className?: string;
  variant?: 'compact' | 'full';
}

export const LandShieldBadge: React.FC<LandShieldBadgeProps> = ({ className = '', variant = 'compact' }) => {
  if (variant === 'compact') {
    return (
      <div className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-forest-50 border border-forest-200 text-forest-900 text-xs font-semibold ${className}`}>
        <ShieldCheck className="w-3.5 h-3.5 text-forest-700" />
        <span>Land Ownership Never Transferred</span>
      </div>
    );
  }

  return (
    <div className={`p-3.5 rounded-2xl bg-gradient-to-r from-forest-50 to-emerald-50 border border-forest-200 text-forest-900 text-xs shadow-sm flex items-start gap-3 ${className}`}>
      <div className="p-2 rounded-xl bg-forest-800 text-limeaccent shrink-0">
        <ShieldCheck className="w-5 h-5" />
      </div>
      <div>
        <h4 className="font-bold text-forest-950 text-sm">Legal Guarantee: Land Ownership 100% Protected</h4>
        <p className="text-slate-600 text-xs mt-0.5 leading-relaxed">
          Under FasalSanjha’s Tripartite Model Agreement, agricultural land is <strong>never mortgaged, transferred, leased or pledged</strong>. Investor rights are strictly limited to the agreed contractual share of harvested produce proceeds.
        </p>
      </div>
    </div>
  );
};
