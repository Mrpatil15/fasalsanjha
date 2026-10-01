import React from 'react';
import { Link } from 'react-router-dom';
import { 
  Sprout, 
  TrendingUp, 
  PlusCircle, 
  Layers, 
  Calendar, 
  AlertTriangle, 
  CheckCircle2, 
  Clock, 
  ShieldCheck, 
  ArrowRight,
  Droplets,
  DollarSign
} from 'lucide-react';
import { useAppStore } from '../../store/useAppStore';
import { DEMO_PERSONAS } from '../../data/personas';
import { LandShieldBadge } from '../../components/common/LandShieldBadge';

export const FarmerDashboard: React.FC = () => {
  const { cropCycles, cropListings } = useAppStore();
  const farmerPersona = DEMO_PERSONAS.find(p => p.id === 'farmer') || DEMO_PERSONAS[0];

  const myCycle = cropCycles[0]; // Ramesh Patil's Garva Onion cycle

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Farmer Profile Hero */}
      <div className="bg-white rounded-2card p-6 md:p-8 shadow-soft border border-slate-200 flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
        <div className="flex items-center gap-4">
          <img
            src={farmerPersona.avatar}
            alt={farmerPersona.name}
            className="w-16 h-16 rounded-2xl object-cover ring-4 ring-forest-100 shadow-md"
          />
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <h1 className="text-xl md:text-2xl font-extrabold text-slate-900">
                {farmerPersona.name} ({farmerPersona.nameHi})
              </h1>
              <span className="px-2.5 py-0.5 rounded-full bg-forest-100 text-forest-800 text-xs font-bold border border-forest-200">
                Verified Farmer ✓
              </span>
            </div>
            <p className="text-xs text-slate-500">
              {farmerPersona.location} • 3.2 Acres Irrigated Land • 7/12 & Soil Health Verified
            </p>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <LandShieldBadge variant="compact" />
          <Link
            to="/farmer/new-listing"
            className="px-4 py-2.5 rounded-xl bg-forest-900 hover:bg-forest-800 text-white font-bold text-xs shadow-md flex items-center gap-2 transition-all active:scale-95"
          >
            <PlusCircle className="w-4 h-4 text-harvest-400" />
            <span>Create New Crop Listing</span>
          </Link>
        </div>
      </div>

      {/* Metrics Row */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="p-5 rounded-2card bg-white border border-slate-200 shadow-soft space-y-1">
          <span className="text-xs text-slate-500 font-semibold">Active Cycle Capital</span>
          <p className="text-2xl font-extrabold text-forest-950">₹75,000</p>
          <span className="text-[11px] text-emerald-600 font-semibold">4 Investors Funded</span>
        </div>

        <div className="p-5 rounded-2card bg-white border border-slate-200 shadow-soft space-y-1">
          <span className="text-xs text-slate-500 font-semibold">Escrow Released to Bank</span>
          <p className="text-2xl font-extrabold text-forest-900">₹56,250</p>
          <span className="text-[11px] text-slate-500">Tranches 1 & 2 Disbursed</span>
        </div>

        <div className="p-5 rounded-2card bg-white border border-slate-200 shadow-soft space-y-1">
          <span className="text-xs text-slate-500 font-semibold">Next Scheduled Tranche</span>
          <p className="text-2xl font-extrabold text-harvest-600">₹18,750</p>
          <span className="text-[11px] text-amber-700 font-semibold">Bulb Maturity Audit</span>
        </div>

        <div className="p-5 rounded-2card bg-white border border-slate-200 shadow-soft space-y-1">
          <span className="text-xs text-slate-500 font-semibold">Expected Net Sale</span>
          <p className="text-2xl font-extrabold text-slate-900">₹2,40,000+</p>
          <span className="text-[11px] text-emerald-600 font-semibold">Harvest: Nov 2026</span>
        </div>
      </div>

      {/* Active Crop Cycle Tracking Card */}
      {myCycle && (
        <div className="bg-white rounded-2card p-6 md:p-8 shadow-soft border border-slate-200 space-y-6">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 pb-4 border-b border-slate-100">
            <div>
              <div className="flex items-center gap-2">
                <span className="px-2.5 py-0.5 rounded-full bg-forest-100 text-forest-800 text-xs font-bold">
                  Active Cycle
                </span>
                <h2 className="text-xl font-extrabold text-slate-900">
                  {myCycle.cropName} ({myCycle.variety})
                </h2>
              </div>
              <p className="text-xs text-slate-500 mt-1">
                Pimpalgaon Baswant, Plot #2B • 3.0 Acres Drip Irrigated
              </p>
            </div>

            <Link
              to="/track"
              className="text-xs font-bold text-forest-800 hover:underline flex items-center gap-1"
            >
              Open Full Satellite & Tranche Tracking →
            </Link>
          </div>

          {/* Stepper Progress */}
          <div className="grid grid-cols-3 gap-3 text-xs">
            <div className="p-3.5 rounded-2xl bg-emerald-50 border border-emerald-200 space-y-1">
              <span className="text-[10px] font-bold text-emerald-800 uppercase">Tranche 1 (40%)</span>
              <p className="font-extrabold text-slate-900">₹30,000 Disbursed</p>
              <span className="text-[10px] text-emerald-700 font-semibold flex items-center gap-1">
                <CheckCircle2 className="w-3 h-3" /> Germination Verified
              </span>
            </div>

            <div className="p-3.5 rounded-2xl bg-emerald-50 border border-emerald-200 space-y-1">
              <span className="text-[10px] font-bold text-emerald-800 uppercase">Tranche 2 (35%)</span>
              <p className="font-extrabold text-slate-900">₹26,250 Disbursed</p>
              <span className="text-[10px] text-emerald-700 font-semibold flex items-center gap-1">
                <CheckCircle2 className="w-3 h-3" /> NDVI 0.82 Passed
              </span>
            </div>

            <div className="p-3.5 rounded-2xl bg-amber-50 border border-amber-200 space-y-1">
              <span className="text-[10px] font-bold text-amber-800 uppercase">Tranche 3 (25%)</span>
              <p className="font-extrabold text-slate-900">₹18,750 In Escrow</p>
              <span className="text-[10px] text-amber-800 font-semibold flex items-center gap-1">
                <Clock className="w-3 h-3" /> Bulb Check (Oct 15)
              </span>
            </div>
          </div>

          {/* Agronomist Advisory & Weather Alert */}
          {myCycle.weatherAlert && (
            <div className="p-4 rounded-2xl bg-amber-50/80 border border-amber-200 flex items-start gap-3 text-xs">
              <AlertTriangle className="w-5 h-5 text-amber-700 shrink-0 mt-0.5" />
              <div>
                <h4 className="font-bold text-sm text-amber-950">Field Advisory: Weather Warning</h4>
                <p className="text-amber-900 text-xs mt-0.5 leading-relaxed">{myCycle.weatherAlert.message}</p>
                <div className="mt-2 flex gap-2">
                  <Link to="/bazaar" className="px-3 py-1 rounded-lg bg-forest-900 text-white font-bold text-[11px]">
                    Order Bio-Fungicide from Bazaar
                  </Link>
                </div>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
