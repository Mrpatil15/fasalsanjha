import React, { useState } from 'react';
import { 
  TrendingUp, 
  TrendingDown, 
  MapPin, 
  Truck, 
  Layers, 
  Calendar, 
  ShieldCheck, 
  BarChart3, 
  Activity,
  ArrowUpRight,
  ExternalLink
} from 'lucide-react';
import { 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  Tooltip, 
  ResponsiveContainer 
} from 'recharts';
import { useAppStore } from '../store/useAppStore';

export const MarketPrices: React.FC = () => {
  const { priceTrends } = useAppStore();
  const [selectedCropKey, setSelectedCropKey] = useState<string>('onion');

  const currentTrend = priceTrends[selectedCropKey] || priceTrends['onion'];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-forest-900 to-forest-800 text-white rounded-2card p-6 md:p-8 shadow-elevated flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
        <div className="space-y-2 max-w-2xl">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-harvest-500/20 text-harvest-300 text-xs font-bold border border-harvest-400/30">
            <TrendingUp className="w-3.5 h-3.5" />
            Smart Agri-Intelligence & Mandi Analytics
          </div>
          <h1 className="text-2xl md:text-3xl font-extrabold tracking-tight">
            Live Market Prices & 30-Day Trends
          </h1>
          <p className="text-xs md:text-sm text-slate-200 leading-relaxed">
            Real-time e-NAM synchronized price feeds, daily mandi arrival volumes, logistics freight calculators, and demand-supply balance across Maharashtra.
          </p>
        </div>

        {/* e-NAM Sync Badge */}
        <div className="bg-forest-950/80 p-4 rounded-2xl border border-white/10 text-xs space-y-1 shrink-0">
          <span className="flex items-center gap-1.5 text-limeaccent font-bold">
            <ShieldCheck className="w-4 h-4" /> e-NAM Integrated Mandis
          </span>
          <p className="text-[11px] text-slate-300">Lasalgaon, Rahuri, Pandharpur, Barshi</p>
        </div>
      </div>

      {/* Crop Selector Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
        {Object.entries(priceTrends).map(([key, item]) => (
          <button
            key={key}
            onClick={() => setSelectedCropKey(key)}
            className={`px-4 py-2.5 rounded-xl text-xs font-bold shrink-0 transition-all flex items-center gap-2 ${
              selectedCropKey === key
                ? 'bg-forest-900 text-white shadow-md'
                : 'bg-white text-slate-700 border border-slate-200 hover:bg-slate-50'
            }`}
          >
            <span>{item.crop}</span>
            <span className={`text-[10px] font-bold px-1.5 py-0.2 rounded ${
              item.trend === 'up' ? 'bg-emerald-100 text-emerald-800' : item.trend === 'down' ? 'bg-rose-100 text-rose-800' : 'bg-slate-100 text-slate-700'
            }`}>
              {item.changePercent > 0 ? `+${item.changePercent}%` : `${item.changePercent}%`}
            </span>
          </button>
        ))}
      </div>

      {/* Main Focus Card: Price & 30-Day Area Chart */}
      <div className="bg-white rounded-2card p-6 md:p-8 shadow-soft border border-slate-200 space-y-6">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 pb-4 border-b border-slate-100">
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-xl md:text-2xl font-extrabold text-slate-900">
                {currentTrend.crop} ({currentTrend.cropHi})
              </h2>
              {currentTrend.eNamLinked && (
                <span className="px-2.5 py-0.5 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-200 text-[11px] font-bold">
                  e-NAM Linked ✓
                </span>
              )}
            </div>
            <p className="text-xs text-slate-500 mt-1 flex items-center gap-1.5">
              <MapPin className="w-3.5 h-3.5 text-forest-700" />
              {currentTrend.marketName} • Variety: <strong>{currentTrend.variety}</strong>
            </p>
          </div>

          <div className="flex items-center gap-4 bg-slate-50 p-3 rounded-2xl border border-slate-200">
            <div>
              <span className="text-[10px] font-bold text-slate-400 uppercase">Modal APMC Price</span>
              <div className="text-2xl font-extrabold text-forest-950">
                ₹{currentTrend.currentMandiPrice.toLocaleString('en-IN')}
                <span className="text-xs font-normal text-slate-500"> / Quintal</span>
              </div>
            </div>
            <div className={`p-2 rounded-xl flex items-center gap-1 text-xs font-bold ${
              currentTrend.trend === 'up' ? 'bg-emerald-100 text-emerald-800' : 'bg-rose-100 text-rose-800'
            }`}>
              {currentTrend.trend === 'up' ? <TrendingUp className="w-4 h-4" /> : <TrendingDown className="w-4 h-4" />}
              <span>{currentTrend.changePercent}%</span>
            </div>
          </div>
        </div>

        {/* 30-Day Trend Chart */}
        <div className="space-y-2">
          <div className="flex justify-between items-center text-xs">
            <span className="font-bold text-slate-700 flex items-center gap-1.5">
              <BarChart3 className="w-4 h-4 text-forest-800" />
              30-Day Mandi Price Movement (₹ / Quintal)
            </span>
            <span className="text-slate-400 text-[11px]">Daily automated modal pricing</span>
          </div>

          <div className="h-64 w-full pt-2">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={currentTrend.history30Days} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
                <defs>
                  <linearGradient id="priceGrad" x1="0%" y1="0%" x2="0%" y2="100%">
                    <stop offset="0%" stopColor="#0B4F2E" stopOpacity={0.35} />
                    <stop offset="100%" stopColor="#0B4F2E" stopOpacity={0.0} />
                  </linearGradient>
                </defs>
                <XAxis dataKey="day" tick={{ fontSize: 11 }} />
                <YAxis domain={['auto', 'auto']} tick={{ fontSize: 11 }} tickFormatter={(val) => `₹${val}`} />
                <Tooltip 
                  formatter={(val: any) => [`₹${val} / Quintal`, 'Mandi Price']}
                  contentStyle={{ borderRadius: '12px', fontSize: '11px' }}
                />
                <Area type="monotone" dataKey="price" stroke="#0B4F2E" strokeWidth={3} fill="url(#priceGrad)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Micro Analytics Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4 border-t border-slate-100">
          <div className="p-4 rounded-xl bg-slate-50 border border-slate-100 space-y-1">
            <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Daily Market Arrivals</span>
            <p className="text-lg font-extrabold text-slate-900">{currentTrend.arrivalsTons} Tonnes</p>
            <span className="text-[11px] text-slate-500">Normal seasonal inflow</span>
          </div>

          <div className="p-4 rounded-xl bg-slate-50 border border-slate-100 space-y-1">
            <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Demand / Supply Balance</span>
            <p className="text-lg font-extrabold text-forest-900">{currentTrend.demandLevel} Demand</p>
            <span className="text-[11px] text-emerald-600 font-semibold">Strong buyer pull</span>
          </div>

          <div className="p-4 rounded-xl bg-slate-50 border border-slate-100 space-y-1">
            <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Indicative Transport Freight</span>
            <p className="text-lg font-extrabold text-slate-900">₹{currentTrend.transportRatePerKm} / km</p>
            <span className="text-[11px] text-slate-500">Mini-truck / tractor trolley</span>
          </div>
        </div>
      </div>
    </div>
  );
};
