import React, { useState } from 'react';
import { Layers, MapPin, CheckCircle2, TrendingUp, Sparkles, Filter } from 'lucide-react';
import { useAppStore } from '../store/useAppStore';
import { CycleTracker } from '../components/tracking/CycleTracker';

export const Track: React.FC = () => {
  const { cropCycles } = useAppStore();
  const [selectedCycleId, setSelectedCycleId] = useState<string>(cropCycles[0]?.id || 'cycle-001');

  const activeCycle = cropCycles.find(c => c.id === selectedCycleId) || cropCycles[0];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-forest-900 to-forest-800 text-white rounded-2card p-6 md:p-8 shadow-elevated flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
        <div className="space-y-2 max-w-2xl">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-harvest-500/20 text-harvest-300 text-xs font-bold border border-harvest-400/30">
            <Layers className="w-3.5 h-3.5" />
            Satellite NDVI & Escrow Milestone Tracking
          </div>
          <h1 className="text-2xl md:text-3xl font-extrabold tracking-tight">
            Live Crop Cycle Governance
          </h1>
          <p className="text-xs md:text-sm text-slate-200 leading-relaxed">
            Every crop cycle is continuously monitored from sowing to sale. Escrow tranches are unlocked strictly upon verified satellite NDVI vegetation scores and field-agent physical audits.
          </p>
        </div>

        {/* Cycle State Pills */}
        <div className="flex flex-wrap gap-2">
          {cropCycles.map((c) => (
            <button
              key={c.id}
              onClick={() => setSelectedCycleId(c.id)}
              className={`px-3 py-2 rounded-xl text-xs font-bold transition-all text-left ${
                selectedCycleId === c.id
                  ? 'bg-harvest-500 text-forest-950 shadow-md ring-2 ring-white/50'
                  : 'bg-forest-950/60 text-slate-300 hover:bg-forest-950'
              }`}
            >
              <div className="text-[10px] uppercase font-bold opacity-80">
                {c.stage.toUpperCase()}
              </div>
              <div>{c.cropName.split(' ')[0]} ({c.district})</div>
            </button>
          ))}
        </div>
      </div>

      {/* Render the selected cycle with full details */}
      {activeCycle && (
        <CycleTracker cycle={activeCycle} />
      )}
    </div>
  );
};
