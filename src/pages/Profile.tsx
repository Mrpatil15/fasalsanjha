import React from 'react';
import { 
  UserCheck, 
  ShieldCheck, 
  MapPin, 
  FileText, 
  Award, 
  CheckCircle2, 
  Phone, 
  DollarSign, 
  Layers 
} from 'lucide-react';
import { useAppStore } from '../store/useAppStore';
import { DEMO_PERSONAS } from '../data/personas';
import { LandShieldBadge } from '../components/common/LandShieldBadge';

export const Profile: React.FC = () => {
  const { currentRole } = useAppStore();
  const persona = DEMO_PERSONAS.find(p => p.id === currentRole) || DEMO_PERSONAS[0];

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Profile Card */}
      <div className="bg-white rounded-2card p-6 md:p-8 shadow-soft border border-slate-200 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div className="flex items-center gap-5">
          <img
            src={persona.avatar}
            alt={persona.name}
            className="w-20 h-20 rounded-2xl object-cover ring-4 ring-forest-100 shadow-md"
          />
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <h1 className="text-xl md:text-2xl font-extrabold text-slate-900">{persona.name}</h1>
              <span className="px-2.5 py-0.5 rounded-full bg-forest-100 text-forest-800 text-xs font-bold border border-forest-200">
                {persona.badge}
              </span>
            </div>
            <p className="text-xs text-slate-500">{persona.roleTitle}</p>
            <p className="text-xs text-slate-500 flex items-center gap-1">
              <MapPin className="w-3.5 h-3.5 text-slate-400" />
              {persona.location}
            </p>
          </div>
        </div>

        <LandShieldBadge variant="compact" />
      </div>

      {/* Details Grid */}
      <div className="bg-white rounded-2card p-6 shadow-soft border border-slate-200 space-y-4">
        <h3 className="font-extrabold text-base text-slate-900">Persona Profile Attributes</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
          {Object.entries(persona.details).map(([key, value]) => (
            <div key={key} className="p-3.5 rounded-xl bg-slate-50 border border-slate-100 flex justify-between items-center">
              <span className="text-slate-500 font-semibold">{key}:</span>
              <span className="font-bold text-slate-900">{value}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Verified Document Vault */}
      <div className="bg-white rounded-2card p-6 shadow-soft border border-slate-200 space-y-4">
        <h3 className="font-extrabold text-base text-slate-900 flex items-center gap-2">
          <FileText className="w-5 h-5 text-forest-700" />
          Verified Documents & Compliance Vault
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
          <div className="p-3.5 rounded-xl bg-forest-50/60 border border-forest-200 flex items-center gap-2.5">
            <CheckCircle2 className="w-4 h-4 text-emerald-700 shrink-0" />
            <div>
              <p className="font-bold text-slate-900">7/12 Land Extract</p>
              <span className="text-[10px] text-slate-500 font-mono">Verified • Mahabhulekh</span>
            </div>
          </div>

          <div className="p-3.5 rounded-xl bg-forest-50/60 border border-forest-200 flex items-center gap-2.5">
            <CheckCircle2 className="w-4 h-4 text-emerald-700 shrink-0" />
            <div>
              <p className="font-bold text-slate-900">Soil Health Card</p>
              <span className="text-[10px] text-slate-500 font-mono">pH 7.2 • Medium Black</span>
            </div>
          </div>

          <div className="p-3.5 rounded-xl bg-forest-50/60 border border-forest-200 flex items-center gap-2.5">
            <CheckCircle2 className="w-4 h-4 text-emerald-700 shrink-0" />
            <div>
              <p className="font-bold text-slate-900">ICICI Escrow Mandate</p>
              <span className="text-[10px] text-slate-500 font-mono">Tier 1 Nodal Linked</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
