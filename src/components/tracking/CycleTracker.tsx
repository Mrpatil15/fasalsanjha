import React, { useState } from 'react';
import { 
  CheckCircle2, 
  Clock, 
  Lock, 
  MapPin, 
  Calendar, 
  AlertTriangle, 
  Camera, 
  Activity, 
  ShieldCheck, 
  UserCheck, 
  Layers, 
  ArrowRight,
  TrendingUp,
  Download,
  DollarSign
} from 'lucide-react';
import { CropCycle } from '../../types';
import { useAppStore } from '../../store/useAppStore';
import { LandShieldBadge } from '../common/LandShieldBadge';

interface CycleTrackerProps {
  cycle: CropCycle;
}

export const CycleTracker: React.FC<CycleTrackerProps> = ({ cycle }) => {
  const { releaseTranche } = useAppStore();
  const [selectedPhoto, setSelectedPhoto] = useState<string | null>(null);

  const stages = [
    { key: 'sowing', label: '1. Sowing & Germination', desc: '40% Escrow Tranche Disbursed' },
    { key: 'mid-season', label: '2. Mid-Season Fertigation', desc: '35% Escrow Tranche Disbursed' },
    { key: 'pre-harvest', label: '3. Pre-Harvest Bulb Check', desc: '25% Final Tranche Release' },
    { key: 'harvest', label: '4. Harvest & Weighment', desc: 'Lab & Moisture Grading' },
    { key: 'sale', label: '5. Mandi / B2B Sale', desc: 'Invoice & Electronic Gate Pass' },
    { key: 'settlement', label: '6. Escrow Split & Payout', desc: 'Waterfall Split Executed' },
  ];

  const getStageIndex = (stage: string) => {
    switch (stage) {
      case 'sowing': return 0;
      case 'mid-season': return 1;
      case 'pre-harvest': return 2;
      case 'harvest': return 3;
      case 'sale': return 4;
      case 'settlement': return 5;
      default: return 1;
    }
  };

  const currentIndex = getStageIndex(cycle.stage);

  return (
    <div className="space-y-8">
      {/* Top Banner with Health Score & NDVI */}
      <div className="bg-white rounded-2card p-6 md:p-8 shadow-soft border border-slate-200 grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
        <div className="md:col-span-7 space-y-2">
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-0.5 rounded-full bg-forest-100 text-forest-800 text-xs font-bold border border-forest-200">
              Active Cycle #{cycle.id.toUpperCase()}
            </span>
            <span className="text-xs text-slate-500">• {cycle.variety}</span>
          </div>

          <h2 className="text-xl md:text-2xl font-extrabold text-slate-900">
            {cycle.cropName} ({cycle.landAreaAcres} Acres)
          </h2>
          <p className="text-xs text-slate-500 flex items-center gap-1.5">
            <MapPin className="w-3.5 h-3.5 text-forest-700" />
            {cycle.location}, {cycle.district}, Maharashtra • Grower: <strong>{cycle.farmerName}</strong>
          </p>

          <div className="pt-2 flex flex-wrap gap-2">
            <LandShieldBadge variant="compact" />
            <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-blue-50 border border-blue-200 text-blue-800 text-xs font-semibold">
              <ShieldCheck className="w-3.5 h-3.5 text-blue-600" />
              ICICI Escrow Protected
            </span>
          </div>
        </div>

        {/* Health Score & NDVI Gauges */}
        <div className="md:col-span-5 grid grid-cols-2 gap-3 bg-slate-50 p-4 rounded-2xl border border-slate-100">
          {/* Health Score Gauge */}
          <div className="text-center space-y-1">
            <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500">Crop Health Index</span>
            <div className="relative w-16 h-16 mx-auto flex items-center justify-center">
              <svg className="w-full h-full transform -rotate-90" viewBox="0 0 36 36">
                <path
                  className="text-slate-200"
                  strokeWidth="3.5"
                  stroke="currentColor"
                  fill="none"
                  d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                />
                <path
                  className="text-emerald-500"
                  strokeDasharray={`${cycle.healthScore}, 100`}
                  strokeWidth="3.5"
                  strokeLinecap="round"
                  stroke="currentColor"
                  fill="none"
                  d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                />
              </svg>
              <div className="absolute text-sm font-extrabold text-forest-900">{cycle.healthScore}</div>
            </div>
            <span className="text-[11px] font-bold text-emerald-700 block">Optimal Vigor</span>
          </div>

          {/* Satellite NDVI Index */}
          <div className="text-center space-y-1">
            <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500">Sentinel-2 NDVI</span>
            <div className="w-16 h-16 mx-auto rounded-full bg-forest-900 text-limeaccent flex flex-col items-center justify-center shadow-inner">
              <span className="text-xs font-mono font-bold leading-none">{cycle.ndviScore}</span>
              <span className="text-[8px] uppercase tracking-tighter text-slate-300 mt-0.5">High Density</span>
            </div>
            <span className="text-[11px] font-bold text-forest-800 block">Healthy Canopy</span>
          </div>
        </div>
      </div>

      {/* Simulated Satellite NDVI Map & Field Boundary */}
      <div className="bg-white rounded-2card p-6 shadow-soft border border-slate-200 space-y-4">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2">
          <div>
            <h3 className="font-extrabold text-sm text-slate-900 flex items-center gap-2">
              <Layers className="w-4 h-4 text-forest-700" />
              Simulated Satellite Multispectral Polygon (Field Plot #2B)
            </h3>
            <p className="text-xs text-slate-500">
              Sentinel-2 10m resolution spectral band analysis (NIR + Red). Updated 24 hours ago.
            </p>
          </div>
          <div className="flex items-center gap-1.5 text-xs text-slate-600 bg-slate-50 px-3 py-1 rounded-xl border border-slate-200">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500" /> NDVI &gt; 0.75 (Healthy Crop)
            <span className="w-2.5 h-2.5 rounded-full bg-amber-400 ml-2" /> Moderate
          </div>
        </div>

        {/* Visual Simulated Satellite Field Polygon */}
        <div className="relative h-64 md:h-72 w-full rounded-2xl overflow-hidden bg-slate-900 border border-slate-800 shadow-inner flex items-center justify-center">
          {/* Simulated Satellite imagery background */}
          <div 
            className="absolute inset-0 opacity-40 bg-cover bg-center filter contrast-125"
            style={{ backgroundImage: `url('https://images.unsplash.com/photo-1500937386664-56d1dfef3854?auto=format&fit=crop&q=80&w=1200')` }}
          />

          {/* SVG Vector Polygon Overlay representing farm parcels with NDVI heatmap gradient */}
          <svg className="absolute inset-0 w-full h-full" preserveAspectRatio="none" viewBox="0 0 600 300">
            <defs>
              <linearGradient id="ndviGrad1" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#22c55e" stopOpacity="0.75" />
                <stop offset="50%" stopColor="#15803d" stopOpacity="0.85" />
                <stop offset="100%" stopColor="#84cc16" stopOpacity="0.75" />
              </linearGradient>
            </defs>

            {/* Farm Plot Boundary Polygon */}
            <polygon
              points="140,40 480,60 520,240 180,260 120,180"
              fill="url(#ndviGrad1)"
              stroke="#8CC63F"
              strokeWidth="3"
              strokeDasharray="6 4"
            />

            {/* Geo Markers */}
            <circle cx="310" cy="150" r="8" fill="#F5A623" stroke="#FFFFFF" strokeWidth="2" />
            <text x="325" y="155" fill="#FFFFFF" fontSize="12" fontWeight="bold" fontFamily="monospace">
              Plot 2B: 20.1741° N, 73.9856° E
            </text>
          </svg>

          {/* Float Metadata Pill */}
          <div className="absolute bottom-4 left-4 bg-slate-950/80 backdrop-blur-md p-3 rounded-xl border border-slate-700 text-white text-xs space-y-1">
            <p className="font-bold flex items-center gap-1.5 text-limeaccent">
              <Activity className="w-3.5 h-3.5" /> High Biomass Density (Garva Onion)
            </p>
            <p className="text-[11px] text-slate-300">Chlorophyll Index: 88.4 • Soil Moisture: 28% • Zero Stress</p>
          </div>
        </div>
      </div>

      {/* Weather Alert if present */}
      {cycle.weatherAlert && (
        <div className={`p-4 rounded-2xl border flex items-start gap-3 text-xs ${
          cycle.weatherAlert.severity === 'high' 
            ? 'bg-rose-50 border-rose-200 text-rose-900' 
            : 'bg-amber-50 border-amber-200 text-amber-900'
        }`}>
          <AlertTriangle className="w-5 h-5 shrink-0 mt-0.5 text-amber-700" />
          <div className="flex-1">
            <h4 className="font-bold text-sm">Weather Advisory & Agronomist Alert</h4>
            <p className="text-xs mt-0.5 leading-relaxed">{cycle.weatherAlert.message}</p>
          </div>
        </div>
      )}

      {/* Vertical Milestone & Escrow Timeline */}
      <div className="bg-white rounded-2card p-6 md:p-8 shadow-soft border border-slate-200 space-y-6">
        <h3 className="font-extrabold text-base text-slate-900">
          Escrow Milestone Journey & Tranche Disbursements
        </h3>

        <div className="relative pl-6 md:pl-8 space-y-8 before:absolute before:left-3.5 md:before:left-4 before:top-3 before:bottom-3 before:w-0.5 before:bg-slate-200">
          {stages.map((stage, idx) => {
            const isCompleted = idx < currentIndex;
            const isCurrent = idx === currentIndex;
            const isFuture = idx > currentIndex;

            return (
              <div key={stage.key} className="relative flex items-start gap-4">
                {/* Milestone Node */}
                <div className={`absolute -left-6 md:-left-8 mt-1 w-6 h-6 rounded-full flex items-center justify-center ring-4 ring-white ${
                  isCompleted 
                    ? 'bg-emerald-600 text-white' 
                    : isCurrent 
                    ? 'bg-forest-900 text-harvest-400 ring-forest-100' 
                    : 'bg-slate-200 text-slate-400'
                }`}>
                  {isCompleted ? (
                    <CheckCircle2 className="w-4 h-4" />
                  ) : isCurrent ? (
                    <Clock className="w-3.5 h-3.5 animate-spin" />
                  ) : (
                    <Lock className="w-3 h-3" />
                  )}
                </div>

                <div className={`p-4 rounded-2xl border flex-1 transition-all ${
                  isCurrent 
                    ? 'bg-forest-50/70 border-forest-300 shadow-sm' 
                    : isCompleted 
                    ? 'bg-slate-50/60 border-slate-200' 
                    : 'bg-white border-slate-100 opacity-60'
                }`}>
                  <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-1 mb-1">
                    <h4 className="font-bold text-sm text-slate-900">{stage.label}</h4>
                    <span className={`text-[11px] font-bold px-2.5 py-0.5 rounded-full ${
                      isCompleted 
                        ? 'bg-emerald-100 text-emerald-800' 
                        : isCurrent 
                        ? 'bg-harvest-100 text-harvest-800 border border-harvest-300' 
                        : 'bg-slate-100 text-slate-500'
                    }`}>
                      {isCompleted ? 'Completed ✓' : isCurrent ? 'Active Stage' : 'Pending Milestone'}
                    </span>
                  </div>
                  <p className="text-xs text-slate-500">{stage.desc}</p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Tranche Release Chips */}
        <div className="pt-6 border-t border-slate-100 space-y-3">
          <h4 className="font-bold text-xs uppercase tracking-wider text-slate-600">
            Escrow Tranches Breakdown
          </h4>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            {cycle.tranches.map((t) => (
              <div 
                key={t.id}
                className={`p-3.5 rounded-2xl border text-xs space-y-2 ${
                  t.status === 'released' 
                    ? 'bg-emerald-50/50 border-emerald-200' 
                    : 'bg-slate-50 border-slate-200'
                }`}
              >
                <div className="flex justify-between items-center">
                  <span className="font-bold text-slate-900">{t.name}</span>
                  <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                    t.status === 'released' ? 'bg-emerald-200 text-emerald-900' : 'bg-amber-100 text-amber-900'
                  }`}>
                    {t.status === 'released' ? 'Disbursed ✓' : 'Held in Escrow'}
                  </span>
                </div>
                <div className="text-base font-extrabold text-forest-950">
                  ₹{t.amount.toLocaleString('en-IN')}
                </div>
                <p className="text-[11px] text-slate-500">{t.condition}</p>

                {t.status === 'pending' && (
                  <button
                    onClick={() => releaseTranche(cycle.id, t.id)}
                    className="w-full py-1.5 rounded-xl bg-forest-900 hover:bg-forest-800 text-white font-bold text-[11px] shadow-sm transition-colors"
                  >
                    Simulate Agent Verification & Disburse
                  </button>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Geo-Tagged Photo Feed */}
      <div className="bg-white rounded-2card p-6 md:p-8 shadow-soft border border-slate-200 space-y-4">
        <h3 className="font-extrabold text-base text-slate-900 flex items-center gap-2">
          <Camera className="w-5 h-5 text-forest-700" />
          Verified Geo-Tagged Visual Audit Trail
        </h3>
        <p className="text-xs text-slate-500">
          Timestamped and coordinate-locked photographs uploaded by verified field agents and drones.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {cycle.photos.map((photo, i) => (
            <div 
              key={i}
              onClick={() => setSelectedPhoto(photo.url)}
              className="group relative rounded-2xl overflow-hidden border border-slate-200 shadow-sm cursor-pointer hover:shadow-md transition-all"
            >
              <img 
                src={photo.url} 
                alt={photo.label} 
                className="w-full h-44 object-cover group-hover:scale-105 transition-transform duration-300" 
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent p-3 flex flex-col justify-end text-white text-xs">
                <span className="font-bold text-xs leading-tight">{photo.label}</span>
                <span className="text-[10px] text-harvest-300 mt-0.5">{photo.timestamp}</span>
                <span className="text-[9px] font-mono text-slate-300">{photo.coordinates}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Field Agent Visit Logs */}
      <div className="bg-white rounded-2card p-6 shadow-soft border border-slate-200 space-y-3">
        <h3 className="font-extrabold text-sm text-slate-900 flex items-center gap-2">
          <UserCheck className="w-4 h-4 text-forest-700" />
          Certified Field Agent Visit Logs
        </h3>
        <div className="space-y-2">
          {cycle.fieldAgentVisits.map((visit, i) => (
            <div key={i} className="p-3 rounded-xl bg-slate-50 border border-slate-100 flex flex-col sm:flex-row justify-between sm:items-center gap-2 text-xs">
              <div className="space-y-0.5">
                <div className="font-bold text-slate-900 flex items-center gap-2">
                  <span>{visit.agent}</span>
                  <span className="text-emerald-700 font-semibold bg-emerald-50 px-2 py-0.5 rounded text-[10px]">
                    {visit.status}
                  </span>
                </div>
                <p className="text-slate-600">{visit.notes}</p>
              </div>
              <span className="text-[11px] font-mono text-slate-400 shrink-0">{visit.date}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Settlement Section if settled */}
      {cycle.settlement && (
        <div className="bg-gradient-to-br from-forest-900 to-forest-800 text-white rounded-2card p-6 md:p-8 shadow-elevated space-y-6">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2">
            <div>
              <span className="px-2.5 py-0.5 rounded-full bg-harvest-500 text-forest-950 font-extrabold text-xs">
                Cycle Successfully Settled ✓
              </span>
              <h3 className="text-xl font-extrabold mt-1">Final Harvest Sale & Payout Split</h3>
            </div>
            <button 
              onClick={() => alert('Download initiated for certified settlement statement PDF (Ref #FS-SETTL-2026).')}
              className="px-4 py-2 rounded-xl bg-white/10 hover:bg-white/20 border border-white/20 text-xs font-bold flex items-center gap-1.5 transition-colors"
            >
              <Download className="w-4 h-4 text-harvest-400" />
              Download Settlement Statement (PDF)
            </button>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 bg-forest-950/50 p-4 rounded-2xl border border-white/10">
            <div>
              <span className="text-xs text-slate-400">Total Produce Sale</span>
              <p className="text-lg font-extrabold text-white">₹{cycle.settlement.totalGross.toLocaleString('en-IN')}</p>
            </div>
            <div>
              <span className="text-xs text-slate-400">Investor Payout</span>
              <p className="text-lg font-extrabold text-harvest-400">₹{cycle.settlement.netInvestor.toLocaleString('en-IN')}</p>
            </div>
            <div>
              <span className="text-xs text-slate-400">Farmer Net Proceeds</span>
              <p className="text-lg font-extrabold text-emerald-400">₹{cycle.settlement.netFarmer.toLocaleString('en-IN')}</p>
            </div>
            <div>
              <span className="text-xs text-slate-400">Platform Sourcing Fee</span>
              <p className="text-lg font-extrabold text-slate-300">₹{cycle.settlement.platformFee.toLocaleString('en-IN')}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
