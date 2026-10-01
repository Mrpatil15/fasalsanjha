import React from 'react';
import { 
  ShieldCheck, 
  Lock, 
  FileCheck, 
  Award, 
  Building2, 
  Scale, 
  CheckCircle2,
  ExternalLink 
} from 'lucide-react';
import { LandShieldBadge } from '../components/common/LandShieldBadge';

export const TrustCompliance: React.FC = () => {
  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-10">
      {/* Header Banner */}
      <div className="bg-forest-900 text-white rounded-2card p-6 md:p-10 shadow-elevated space-y-3 text-center md:text-left">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-harvest-500/20 text-harvest-300 text-xs font-bold border border-harvest-400/30">
          <ShieldCheck className="w-3.5 h-3.5" />
          Institutional Governance & Legal Architecture
        </div>
        <h1 className="text-2xl md:text-4xl font-extrabold tracking-tight">
          Trust, Escrow & Regulatory Compliance
        </h1>
        <p className="text-xs md:text-sm text-slate-200 max-w-3xl leading-relaxed">
          How FasalSanjha legally protects farmer land sovereignty, ring-fences investor capital through scheduled commercial nodal banking, and operates in full harmony with Indian agricultural and data privacy laws.
        </p>
      </div>

      {/* The 4 Pillars of Protection */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Pillar 1: Land Sovereignty Shield */}
        <div className="bg-white rounded-2card p-6 shadow-soft border border-slate-200 space-y-3">
          <div className="w-12 h-12 rounded-2xl bg-forest-100 text-forest-800 flex items-center justify-center font-bold">
            <Scale className="w-6 h-6" />
          </div>
          <h3 className="font-extrabold text-base text-slate-900">
            1. Absolute Land Ownership Sovereignty
          </h3>
          <p className="text-xs text-slate-600 leading-relaxed">
            Under Section 4 of the FasalSanjha Tripartite Model Agreement, agricultural land is <strong>never mortgaged, transferred, leased or pledged</strong>. Neither the Platform nor any Investor can register any lien, charge, or encumbrance against the farmer’s 7/12 extract.
          </p>
          <div className="p-3 rounded-xl bg-forest-50 border border-forest-100 text-[11px] text-forest-900 font-semibold">
            ✓ Investor recourse is strictly limited to the contractual percentage of sale proceeds from the harvested crop.
          </div>
        </div>

        {/* Pillar 2: Regulated Escrow Banking */}
        <div className="bg-white rounded-2card p-6 shadow-soft border border-slate-200 space-y-3">
          <div className="w-12 h-12 rounded-2xl bg-harvest-500/10 text-harvest-500 flex items-center justify-center font-bold">
            <Lock className="w-6 h-6" />
          </div>
          <h3 className="font-extrabold text-base text-slate-900">
            2. Scheduled Bank Nodal Escrow
          </h3>
          <p className="text-xs text-slate-600 leading-relaxed">
            FasalSanjha does not hold client capital on its balance sheet. All investment funds are routed directly into a dedicated <strong>Nodal Escrow Account</strong> at a Scheduled Commercial Partner Bank (ICICI Bank).
          </p>
          <div className="p-3 rounded-xl bg-harvest-50 border border-harvest-200 text-[11px] text-amber-900 font-semibold">
            ✓ Capital is disbursed only upon digital verification of milestones (40% sowing / 35% mid-season / 25% harvest).
          </div>
        </div>

        {/* Pillar 3: Model Contract Farming Act Alignment */}
        <div className="bg-white rounded-2card p-6 shadow-soft border border-slate-200 space-y-3">
          <div className="w-12 h-12 rounded-2xl bg-blue-50 text-blue-700 flex items-center justify-center font-bold">
            <Building2 className="w-6 h-6" />
          </div>
          <h3 className="font-extrabold text-base text-slate-900">
            3. Regulatory Posture: SEBI & RBI Review
          </h3>
          <p className="text-xs text-slate-600 leading-relaxed">
            Structured strictly as decentralized bilateral/tripartite agricultural service and production partnerships under the Model Contract Farming Act and State APMC bylaws.
          </p>
          <div className="p-3 rounded-xl bg-blue-50 border border-blue-100 text-[11px] text-blue-900 font-semibold">
            ✓ Avoids Collective Investment Scheme (CIS) classification via individual crop lot segregation and title separation.
          </div>
        </div>

        {/* Pillar 4: DPDP Act Privacy & Evidence Trails */}
        <div className="bg-white rounded-2card p-6 shadow-soft border border-slate-200 space-y-3">
          <div className="w-12 h-12 rounded-2xl bg-purple-50 text-purple-700 flex items-center justify-center font-bold">
            <FileCheck className="w-6 h-6" />
          </div>
          <h3 className="font-extrabold text-base text-slate-900">
            4. DPDP Act 2023 Consent & Geo-Trails
          </h3>
          <p className="text-xs text-slate-600 leading-relaxed">
            Strict role-based access control, cryptographic document hashing (SHA-256), and Aadhaar masking ensure complete privacy compliance under the Digital Personal Data Protection Act.
          </p>
          <div className="p-3 rounded-xl bg-purple-50 border border-purple-100 text-[11px] text-purple-900 font-semibold">
            ✓ Immutable visual audit trails (geo-coordinates + timestamps) prevent disputes and fraudulent claims.
          </div>
        </div>
      </div>

      {/* Dual Insurance Coverage Detail Card */}
      <div className="bg-white rounded-2card p-6 md:p-8 shadow-soft border border-slate-200 space-y-4">
        <h3 className="font-extrabold text-base text-slate-900 flex items-center gap-2">
          <Award className="w-5 h-5 text-forest-700" />
          Dual Protection Insurance Framework
        </h3>
        <p className="text-xs text-slate-600 leading-relaxed">
          Conventional agriculture exposes either the farmer to debt or the investor to wipe-out. FasalSanjha introduces a dual-layer risk mitigation buffer:
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
          <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-1.5">
            <span className="font-bold text-forest-900">Layer 1: Farmer Yield Cover (PMFBY-Aligned)</span>
            <p className="text-slate-600 text-[11px] leading-relaxed">
              Provides area-yield insurance against localized floods, drought, pest epidemics, and unseasonal rainfall. Ensures the farmer's base livelihood is protected.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-1.5">
            <span className="font-bold text-harvest-600">Layer 2: Investor Capital Disaster Pool (50–70%)</span>
            <p className="text-slate-600 text-[11px] leading-relaxed">
              Funded by a mutual 1% platform fee contribution, this pool reimburses 50–70% of investor principal in certified catastrophic force-majeure losses (biological or weather failure, not market price swings).
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
