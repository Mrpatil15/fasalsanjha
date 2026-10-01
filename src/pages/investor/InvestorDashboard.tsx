import React from 'react';
import { Link } from 'react-router-dom';
import { 
  TrendingUp, 
  ShieldCheck, 
  Award, 
  Layers, 
  Calendar, 
  FileText, 
  DollarSign, 
  ArrowUpRight,
  PieChart as PieIcon,
  CheckCircle2,
  Lock
} from 'lucide-react';
import { ResponsiveContainer, PieChart, Pie, Cell, Tooltip } from 'recharts';
import { useAppStore } from '../../store/useAppStore';
import { DEMO_PERSONAS } from '../../data/personas';
import { LandShieldBadge } from '../../components/common/LandShieldBadge';
import { RiskBadge } from '../../components/common/RiskBadge';

export const InvestorDashboard: React.FC = () => {
  const { cropCycles, cropListings } = useAppStore();
  const investorPersona = DEMO_PERSONAS.find(p => p.id === 'investor') || DEMO_PERSONAS[1];

  const allocationData = [
    { name: 'Grade A (Staple Grains)', value: 40, color: '#10b981' },
    { name: 'Grade B (Cash Crops)', value: 40, color: '#f59e0b' },
    { name: 'Grade C (Horticulture)', value: 20, color: '#f43f5e' },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Investor Profile Header */}
      <div className="bg-white rounded-2card p-6 md:p-8 shadow-soft border border-slate-200 flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
        <div className="flex items-center gap-4">
          <img
            src={investorPersona.avatar}
            alt={investorPersona.name}
            className="w-16 h-16 rounded-2xl object-cover ring-4 ring-forest-100 shadow-md"
          />
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <h1 className="text-xl md:text-2xl font-extrabold text-slate-900">
                {investorPersona.name}
              </h1>
              <span className="px-2.5 py-0.5 rounded-full bg-forest-100 text-forest-800 text-xs font-bold border border-forest-200">
                Verified Investor ✓ | Tier 1 Escrow
              </span>
            </div>
            <p className="text-xs text-slate-500">
              {investorPersona.location} • Portfolio: 4 Active Cycles • Dual Insurance Active
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <Link
            to="/invest"
            className="px-4 py-2.5 rounded-xl bg-forest-900 hover:bg-forest-800 text-white font-bold text-xs shadow-md flex items-center gap-1.5 transition-colors"
          >
            <span>Explore More Crops</span>
            <ArrowUpRight className="w-4 h-4 text-harvest-400" />
          </Link>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="p-5 rounded-2card bg-white border border-slate-200 shadow-soft space-y-1">
          <span className="text-xs text-slate-500 font-semibold">Total Invested Capital</span>
          <p className="text-2xl font-extrabold text-forest-950">₹50,000</p>
          <span className="text-[11px] text-emerald-600 font-semibold">Across 4 Crop Cycles</span>
        </div>

        <div className="p-5 rounded-2card bg-white border border-slate-200 shadow-soft space-y-1">
          <span className="text-xs text-slate-500 font-semibold">Projected Net IRR</span>
          <p className="text-2xl font-extrabold text-emerald-700">17.4%</p>
          <span className="text-[11px] text-slate-500">Yield & Mandi Linked</span>
        </div>

        <div className="p-5 rounded-2card bg-white border border-slate-200 shadow-soft space-y-1">
          <span className="text-xs text-slate-500 font-semibold">Capital Protected by Insurance</span>
          <p className="text-2xl font-extrabold text-forest-900">₹35,000</p>
          <span className="text-[11px] text-emerald-600 font-semibold">70% Calamity Pool</span>
        </div>

        <div className="p-5 rounded-2card bg-white border border-slate-200 shadow-soft space-y-1">
          <span className="text-xs text-slate-500 font-semibold">Next Expected Harvest Payout</span>
          <p className="text-2xl font-extrabold text-harvest-600">18 Nov 2026</p>
          <span className="text-[11px] text-slate-500">Garva Onion Cycle</span>
        </div>
      </div>

      {/* Portfolio Breakdown: Donut Chart + Active Cycles */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Risk Allocation Donut (5 cols) */}
        <div className="lg:col-span-5 bg-white rounded-2card p-6 shadow-soft border border-slate-200 space-y-4">
          <h3 className="font-extrabold text-base text-slate-900 flex items-center gap-2">
            <PieIcon className="w-5 h-5 text-forest-700" />
            Risk Grade Portfolio Allocation
          </h3>
          <p className="text-xs text-slate-500">
            Balanced diversification across low-risk staple grains and high-yield horticulture.
          </p>

          <div className="h-48 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={allocationData}
                  cx="50%"
                  cy="50%"
                  innerRadius={45}
                  outerRadius={75}
                  paddingAngle={4}
                  dataKey="value"
                >
                  {allocationData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip formatter={(value) => [`${value}%`, 'Allocation']} />
              </PieChart>
            </ResponsiveContainer>
          </div>

          <div className="space-y-2 pt-2 border-t border-slate-100 text-xs">
            {allocationData.map((item, idx) => (
              <div key={idx} className="flex justify-between items-center">
                <span className="flex items-center gap-2">
                  <span className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }} />
                  <span className="text-slate-700 font-medium">{item.name}</span>
                </span>
                <span className="font-bold text-slate-900">{item.value}%</span>
              </div>
            ))}
          </div>
        </div>

        {/* Active Cycles List (7 cols) */}
        <div className="lg:col-span-7 bg-white rounded-2card p-6 shadow-soft border border-slate-200 space-y-4">
          <div className="flex justify-between items-center">
            <h3 className="font-extrabold text-base text-slate-900 flex items-center gap-2">
              <Layers className="w-5 h-5 text-forest-700" />
              Active Funded Crop Cycles
            </h3>
            <Link to="/track" className="text-xs font-bold text-forest-800 hover:underline">
              Live Satellite Feed →
            </Link>
          </div>

          <div className="space-y-3">
            {cropCycles.map((cycle) => (
              <div
                key={cycle.id}
                className="p-4 rounded-2xl bg-slate-50/80 border border-slate-200 flex flex-col sm:flex-row justify-between sm:items-center gap-3 text-xs"
              >
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-extrabold text-sm text-slate-900">{cycle.cropName}</span>
                    <span className="px-2 py-0.5 rounded-full bg-forest-100 text-forest-900 font-bold text-[10px]">
                      {cycle.stage.toUpperCase()}
                    </span>
                  </div>
                  <p className="text-slate-500 mt-0.5">
                    Farmer: {cycle.farmerName} • {cycle.location}
                  </p>
                  <div className="mt-1 flex items-center gap-2 text-[11px] text-emerald-700 font-semibold">
                    <span>Crop Health: {cycle.healthScore}/100</span>
                    <span>•</span>
                    <span>NDVI: {cycle.ndviScore}</span>
                  </div>
                </div>

                <div className="text-right shrink-0">
                  <span className="text-[10px] text-slate-400">Committed Capital</span>
                  <p className="font-extrabold text-forest-950 text-sm">₹25,000</p>
                  <Link
                    to="/track"
                    className="text-[11px] font-bold text-forest-800 hover:underline block mt-0.5"
                  >
                    Track Milestones →
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
