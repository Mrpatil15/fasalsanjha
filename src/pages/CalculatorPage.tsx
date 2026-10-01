import React from 'react';
import { ProfitCalculator } from '../components/calculator/ProfitCalculator';
import { ShieldCheck, Info } from 'lucide-react';

export const CalculatorPage: React.FC = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Banner */}
      <div className="bg-gradient-to-r from-forest-900 to-forest-800 text-white rounded-2card p-6 md:p-8 shadow-elevated space-y-2">
        <h1 className="text-2xl md:text-3xl font-extrabold tracking-tight">
          Agri-Yield & Profit-Share Simulator
        </h1>
        <p className="text-xs md:text-sm text-slate-200 max-w-3xl leading-relaxed">
          Evaluate expected harvest payouts, net investor IRR, farmer surplus, and fee splits across Best, Base, and Worst case agricultural scenarios.
        </p>
      </div>

      <ProfitCalculator />
    </div>
  );
};
