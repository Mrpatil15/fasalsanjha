import React from 'react';
import { RiskGrade } from '../../types';
import { Shield, ShieldAlert, ShieldCheck } from 'lucide-react';

interface RiskBadgeProps {
  grade: RiskGrade;
  showDetails?: boolean;
}

export const RiskBadge: React.FC<RiskBadgeProps> = ({ grade, showDetails = false }) => {
  const configs = {
    A: {
      label: 'Grade A (Low Risk)',
      crops: 'Staple Grains (Wheat, Jowar, Bajra)',
      share: '20–30% Investor Share',
      color: 'bg-emerald-100 text-emerald-800 border-emerald-300',
      icon: ShieldCheck,
      dotColor: 'bg-emerald-500',
    },
    B: {
      label: 'Grade B (Moderate Risk)',
      crops: 'Cash Crops (Onion, Soybean, Cotton)',
      share: '30–45% Investor Share',
      color: 'bg-amber-100 text-amber-900 border-amber-300',
      icon: Shield,
      dotColor: 'bg-amber-500',
    },
    C: {
      label: 'Grade C (High Value / Yield)',
      crops: 'Horticulture (Strawberry, Bell Pepper, Flowers)',
      share: '45–60% Investor Share',
      color: 'bg-rose-100 text-rose-900 border-rose-300',
      icon: ShieldAlert,
      dotColor: 'bg-rose-500',
    },
  };

  const current = configs[grade];
  const Icon = current.icon;

  if (showDetails) {
    return (
      <div className={`p-2.5 rounded-xl border text-xs ${current.color} flex items-start gap-2`}>
        <Icon className="w-4 h-4 shrink-0 mt-0.5" />
        <div>
          <div className="font-bold flex items-center gap-1.5">
            <span>Risk {current.label}</span>
          </div>
          <p className="text-[11px] opacity-90 mt-0.5">{current.crops} • Standard {current.share}</p>
        </div>
      </div>
    );
  }

  return (
    <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-bold border ${current.color}`}>
      <span className={`w-1.5 h-1.5 rounded-full ${current.dotColor}`} />
      Grade {grade}
    </span>
  );
};
