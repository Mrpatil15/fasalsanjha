import React, { useState } from 'react';
import { 
  ShieldCheck, 
  AlertTriangle, 
  CheckCircle2, 
  XCircle, 
  Layers, 
  DollarSign, 
  Users, 
  MapPin, 
  Activity,
  FileText
} from 'lucide-react';
import { useAppStore } from '../../store/useAppStore';

export const AdminDashboard: React.FC = () => {
  const { cropListings } = useAppStore();

  const [pendingKyc, setPendingKyc] = useState([
    { id: 'kyc-1', name: 'Kashinath Dhole', district: 'Ahmednagar', survey: 'Plot 112/B', crop: 'Soybean', date: 'Today 11:20 AM' },
    { id: 'kyc-2', name: 'Sambhaji More', district: 'Nashik', survey: 'Plot 45/1', crop: 'Pomegranate', date: 'Yesterday' },
  ]);

  const [disputes, setDisputes] = useState([
    {
      id: 'disp-01',
      cycle: 'Cycle #CROP-005 (Amravati Cotton)',
      raisedBy: 'Investor Neha Sharma',
      against: 'Farmer Anil Wankhede',
      reason: 'NDVI vegetation drop reported due to unseasonal rain',
      evidence: 'Drone photo audit confirms 12% foliar moisture stress',
      status: 'In Platform Arbitration',
      recommendation: 'Trigger Mutual Insurance Pool payout of ₹12,500'
    }
  ]);

  const handleApproveKyc = (id: string) => {
    setPendingKyc(pendingKyc.filter(k => k.id !== id));
    alert('KYC & 7/12 title authenticated! Farmer listing activated.');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Header */}
      <div className="bg-slate-900 text-white rounded-2card p-6 md:p-8 shadow-elevated flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
        <div className="space-y-2">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-forest-900 text-limeaccent text-xs font-bold border border-forest-700">
            <ShieldCheck className="w-3.5 h-3.5" />
            Central Risk Governance & Field Agent Desk
          </div>
          <h1 className="text-2xl md:text-3xl font-extrabold tracking-tight">
            Admin & Legal Arbitration Desk
          </h1>
          <p className="text-xs md:text-sm text-slate-300">
            District field agent verification logs, automated KYC audits, escrow nodal reconciliations, and evidence-based dispute mediation.
          </p>
        </div>

        <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800 text-xs space-y-1">
          <span className="text-slate-400 font-bold uppercase tracking-wider text-[10px]">Platform GMV</span>
          <p className="text-2xl font-extrabold text-limeaccent">₹4.28 Crore</p>
          <span className="text-emerald-400 font-semibold text-[11px]">Default Rate: 0.8% (&lt;3% target)</span>
        </div>
      </div>

      {/* KPI Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="p-5 rounded-2card bg-white border border-slate-200 shadow-soft space-y-1">
          <span className="text-xs text-slate-500 font-semibold">ICICI Nodal Escrow Balance</span>
          <p className="text-2xl font-extrabold text-forest-950">₹1.15 Cr</p>
          <span className="text-[11px] text-emerald-600 font-semibold">100% Ring-fenced</span>
        </div>

        <div className="p-5 rounded-2card bg-white border border-slate-200 shadow-soft space-y-1">
          <span className="text-xs text-slate-500 font-semibold">Active Field Agents</span>
          <p className="text-2xl font-extrabold text-forest-900">42 Agents</p>
          <span className="text-[11px] text-slate-500">Across 6 Districts</span>
        </div>

        <div className="p-5 rounded-2card bg-white border border-slate-200 shadow-soft space-y-1">
          <span className="text-xs text-slate-500 font-semibold">Pending 7/12 Verifications</span>
          <p className="text-2xl font-extrabold text-amber-600">{pendingKyc.length} Queued</p>
          <span className="text-[11px] text-amber-700 font-semibold">Avg turnaround &lt;24h</span>
        </div>

        <div className="p-5 rounded-2card bg-white border border-slate-200 shadow-soft space-y-1">
          <span className="text-xs text-slate-500 font-semibold">Platform Fee Earnings</span>
          <p className="text-2xl font-extrabold text-forest-900">₹11.85 L</p>
          <span className="text-[11px] text-slate-500">2.5% Sourcing Fee</span>
        </div>
      </div>

      {/* Verification Queue & Dispute Desk */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Verification Queue */}
        <div className="bg-white rounded-2card p-6 shadow-soft border border-slate-200 space-y-4">
          <h3 className="font-extrabold text-base text-slate-900 flex items-center gap-2">
            <CheckCircle2 className="w-5 h-5 text-forest-700" />
            Farmer & Land 7/12 Verification Queue
          </h3>

          <div className="space-y-3">
            {pendingKyc.map((item) => (
              <div
                key={item.id}
                className="p-4 rounded-2xl bg-slate-50 border border-slate-200 flex flex-col sm:flex-row justify-between sm:items-center gap-3 text-xs"
              >
                <div>
                  <h4 className="font-bold text-slate-900 text-sm">{item.name}</h4>
                  <p className="text-slate-500">
                    {item.district} • {item.survey} • Proposed Crop: <strong>{item.crop}</strong>
                  </p>
                  <span className="text-[10px] text-slate-400">{item.date}</span>
                </div>

                <div className="flex gap-2">
                  <button
                    onClick={() => handleApproveKyc(item.id)}
                    className="px-3 py-1.5 rounded-xl bg-forest-900 hover:bg-forest-800 text-white font-bold text-xs"
                  >
                    Verify & Activate ✓
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Dispute Resolution Desk */}
        <div className="bg-white rounded-2card p-6 shadow-soft border border-slate-200 space-y-4">
          <h3 className="font-extrabold text-base text-slate-900 flex items-center gap-2">
            <AlertTriangle className="w-5 h-5 text-amber-700" />
            Evidence-Backed Dispute Desk & Arbitration
          </h3>

          <div className="space-y-3">
            {disputes.map((d) => (
              <div
                key={d.id}
                className="p-4 rounded-2xl bg-amber-50/60 border border-amber-200 space-y-2 text-xs"
              >
                <div className="flex justify-between items-start">
                  <span className="font-bold text-slate-900 text-sm">{d.cycle}</span>
                  <span className="px-2 py-0.5 rounded-full bg-amber-200 text-amber-900 font-bold text-[10px]">
                    {d.status}
                  </span>
                </div>

                <p className="text-slate-600">
                  <strong>Issue:</strong> {d.reason}
                </p>
                <p className="text-slate-600">
                  <strong>Geo-Tagged Trail:</strong> {d.evidence}
                </p>
                <div className="p-2 rounded-xl bg-white border border-amber-200 text-forest-900 font-semibold">
                  <strong>Arbitrator Action:</strong> {d.recommendation}
                </div>

                <div className="pt-2 flex justify-end">
                  <button
                    onClick={() => alert('Mutual insurance disaster settlement executed via ICICI Escrow!')}
                    className="px-4 py-1.5 rounded-xl bg-forest-900 text-white font-bold text-xs shadow-sm"
                  >
                    Execute Arbitration Settlement
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
