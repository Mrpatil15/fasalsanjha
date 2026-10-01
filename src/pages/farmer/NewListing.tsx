import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { PlusCircle, Sparkles, ShieldCheck, Camera, Info, ArrowRight } from 'lucide-react';
import { useAppStore } from '../../store/useAppStore';
import { RiskGrade } from '../../types';
import { RiskBadge } from '../../components/common/RiskBadge';
import { LandShieldBadge } from '../../components/common/LandShieldBadge';

export const NewListing: React.FC = () => {
  const navigate = useNavigate();
  const { addCropListing } = useAppStore();

  const [formData, setFormData] = useState({
    cropName: 'Onion',
    variety: 'Bhima Shakti (Late Kharif)',
    varietyType: 'hybrid' as 'hybrid' | 'traditional',
    landAreaAcres: 2.5,
    fundingRequired: 70000,
    tenureMonths: 4,
    proposedProfitSharePercent: 35,
    sowingDate: '2026-10-15',
    harvestDate: '2027-02-20',
    soilType: 'Medium Black Loam (pH 7.1)',
    expectedYieldQuintal: 160,
    expectedReturnPercent: 18.0,
    location: 'Niphad Taluka',
    district: 'Nashik',
    state: 'Maharashtra',
    description: 'High-keeping quality onion crop with micro-sprinkler setup and organic basal manuring.',
  });

  // Calculate dynamic Risk Grade based on crop
  const calculateRiskGrade = (crop: string): RiskGrade => {
    const c = crop.toLowerCase();
    if (c.includes('wheat') || c.includes('rice') || c.includes('jowar') || c.includes('bajra') || c.includes('gram') || c.includes('chana') || c.includes('maize')) {
      return 'A'; // Staple grains - Low Risk
    }
    if (c.includes('strawberry') || c.includes('flower') || c.includes('rose') || c.includes('bell pepper') || c.includes('capsicum') || c.includes('exotic') || c.includes('cucumber')) {
      return 'C'; // High-value horticulture - High Risk/Return
    }
    return 'B'; // Cash crops - Moderate Risk (default)
  };

  const currentGrade = calculateRiskGrade(formData.cropName);

  const getSuggestedShareRange = (grade: RiskGrade) => {
    switch (grade) {
      case 'A': return '20% – 30%';
      case 'B': return '30% – 45%';
      case 'C': return '45% – 60%';
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const tranches = [
      { name: 'Sowing & Field Prep', percent: 40, amount: Math.round(formData.fundingRequired * 0.4), status: 'pending' as const, condition: 'Germination audit' },
      { name: 'Mid-Season Fertigation', percent: 35, amount: Math.round(formData.fundingRequired * 0.35), status: 'pending' as const, condition: 'NDVI vegetation check > 0.75' },
      { name: 'Pre-Harvest Maturity', percent: 25, amount: Math.round(formData.fundingRequired * 0.25), status: 'pending' as const, condition: 'Pre-harvest maturity audit' },
    ];

    addCropListing({
      title: `${formData.district} ${formData.cropName} (${formData.variety})`,
      cropName: formData.cropName,
      variety: formData.variety,
      varietyType: formData.varietyType,
      farmerId: 'farmer-patil',
      farmerName: 'Ramesh Patil',
      farmerPhone: '+91 98221 44102',
      farmerAvatar: 'https://images.unsplash.com/photo-1605000797499-95a51c5269ae?auto=format&fit=crop&q=80&w=200',
      location: formData.location,
      district: formData.district,
      state: formData.state,
      landAreaAcres: Number(formData.landAreaAcres),
      fundingRequired: Number(formData.fundingRequired),
      proposedProfitSharePercent: Number(formData.proposedProfitSharePercent),
      tenureMonths: Number(formData.tenureMonths),
      harvestDate: formData.harvestDate,
      sowingDate: formData.sowingDate,
      riskGrade: currentGrade,
      insuranceCovered: true,
      soilType: formData.soilType,
      expectedYieldQuintal: Number(formData.expectedYieldQuintal),
      expectedReturnPercent: Number(formData.expectedReturnPercent),
      description: formData.description,
      photos: [
        'https://images.unsplash.com/photo-1618512496248-a07fe83aa8cb?auto=format&fit=crop&q=80&w=800',
        'https://images.unsplash.com/photo-1500937386664-56d1dfef3854?auto=format&fit=crop&q=80&w=800'
      ],
      tranches,
    });

    alert('Crop listing submitted and verified! Now live in the investment marketplace.');
    navigate('/farmer/dashboard');
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Header Banner */}
      <div className="bg-forest-900 text-white rounded-2card p-6 md:p-8 shadow-elevated space-y-2">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-harvest-500/20 text-harvest-300 text-xs font-bold border border-harvest-400/30">
          <PlusCircle className="w-3.5 h-3.5" />
          Farmer Capital Access Portal
        </div>
        <h1 className="text-2xl md:text-3xl font-extrabold tracking-tight">
          List a New Crop Cycle for Funding
        </h1>
        <p className="text-xs md:text-sm text-slate-200">
          Enter your crop specifications, land area, and working capital requirement. FasalSanjha’s automated Risk Engine assigns a rating and connects you with verified retail investors.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="bg-white rounded-2card p-6 md:p-8 shadow-soft border border-slate-200 space-y-6">
        <LandShieldBadge variant="full" />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {/* Crop Name */}
          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1.5">Crop Name</label>
            <input
              type="text"
              value={formData.cropName}
              onChange={(e) => setFormData({ ...formData, cropName: e.target.value })}
              className="w-full p-3 rounded-xl border border-slate-200 bg-slate-50 text-xs font-semibold focus:ring-2 focus:ring-forest-800 outline-none"
              placeholder="e.g. Onion, Soybean, Strawberry, Wheat"
              required
            />
          </div>

          {/* Variety & Type */}
          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1.5">Variety Name</label>
            <input
              type="text"
              value={formData.variety}
              onChange={(e) => setFormData({ ...formData, variety: e.target.value })}
              className="w-full p-3 rounded-xl border border-slate-200 bg-slate-50 text-xs font-semibold focus:ring-2 focus:ring-forest-800 outline-none"
              placeholder="e.g. Bhima Shakti, JS-335, HD-2189"
              required
            />
          </div>

          {/* Variety Type: Hybrid vs Traditional */}
          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1.5">Seed Classification</label>
            <div className="grid grid-cols-2 gap-2 text-xs">
              <button
                type="button"
                onClick={() => setFormData({ ...formData, varietyType: 'hybrid' })}
                className={`py-2.5 rounded-xl font-bold border transition-colors ${
                  formData.varietyType === 'hybrid'
                    ? 'bg-forest-900 text-white border-forest-900'
                    : 'bg-slate-50 text-slate-700 border-slate-200'
                }`}
              >
                Hybrid (High Yield)
              </button>
              <button
                type="button"
                onClick={() => setFormData({ ...formData, varietyType: 'traditional' })}
                className={`py-2.5 rounded-xl font-bold border transition-colors ${
                  formData.varietyType === 'traditional'
                    ? 'bg-forest-900 text-white border-forest-900'
                    : 'bg-slate-50 text-slate-700 border-slate-200'
                }`}
              >
                Traditional / Desi
              </button>
            </div>
          </div>

          {/* Land Area */}
          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1.5">Cultivated Land Area (Acres)</label>
            <input
              type="number"
              step="0.5"
              min="0.5"
              max="20"
              value={formData.landAreaAcres}
              onChange={(e) => setFormData({ ...formData, landAreaAcres: Number(e.target.value) })}
              className="w-full p-3 rounded-xl border border-slate-200 bg-slate-50 text-xs font-semibold focus:ring-2 focus:ring-forest-800 outline-none"
              required
            />
          </div>

          {/* Funding Required */}
          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1.5">Funding Required (₹)</label>
            <input
              type="number"
              step="5000"
              min="20000"
              max="500000"
              value={formData.fundingRequired}
              onChange={(e) => setFormData({ ...formData, fundingRequired: Number(e.target.value) })}
              className="w-full p-3 rounded-xl border border-slate-200 bg-slate-50 text-xs font-semibold focus:ring-2 focus:ring-forest-800 outline-none"
              required
            />
          </div>

          {/* Proposed Profit Share */}
          <div>
            <div className="flex justify-between items-center mb-1.5">
              <label className="text-xs font-bold text-slate-700">Proposed Investor Profit-Share (%)</label>
              <span className="text-[10px] text-forest-800 font-bold">Suggested: {getSuggestedShareRange(currentGrade)}</span>
            </div>
            <input
              type="number"
              min="15"
              max="65"
              value={formData.proposedProfitSharePercent}
              onChange={(e) => setFormData({ ...formData, proposedProfitSharePercent: Number(e.target.value) })}
              className="w-full p-3 rounded-xl border border-slate-200 bg-slate-50 text-xs font-semibold focus:ring-2 focus:ring-forest-800 outline-none"
              required
            />
          </div>

          {/* Sowing Date & Harvest Date */}
          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1.5">Planned Sowing Date</label>
            <input
              type="date"
              value={formData.sowingDate}
              onChange={(e) => setFormData({ ...formData, sowingDate: e.target.value })}
              className="w-full p-3 rounded-xl border border-slate-200 bg-slate-50 text-xs font-semibold focus:ring-2 focus:ring-forest-800 outline-none"
              required
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1.5">Estimated Harvest Date</label>
            <input
              type="date"
              value={formData.harvestDate}
              onChange={(e) => setFormData({ ...formData, harvestDate: e.target.value })}
              className="w-full p-3 rounded-xl border border-slate-200 bg-slate-50 text-xs font-semibold focus:ring-2 focus:ring-forest-800 outline-none"
              required
            />
          </div>
        </div>

        {/* Dynamic Risk Engine Assessment Preview Card */}
        <div className="p-4 rounded-2xl bg-forest-50 border border-forest-200 space-y-2">
          <div className="flex justify-between items-center">
            <span className="text-xs font-bold text-forest-900 uppercase tracking-wider flex items-center gap-1.5">
              <Sparkles className="w-4 h-4 text-harvest-500" />
              Automated Algorithmic Risk Grading
            </span>
            <RiskBadge grade={currentGrade} />
          </div>
          <p className="text-xs text-slate-600 leading-relaxed">
            Based on your selection of <strong>{formData.cropName} ({formData.varietyType})</strong> in {formData.district}, the platform categorizes this crop as <strong>Grade {currentGrade}</strong>. The recommended investor profit-share band is <strong>{getSuggestedShareRange(currentGrade)}</strong>.
          </p>
        </div>

        {/* Description & Soil */}
        <div>
          <label className="block text-xs font-bold text-slate-700 mb-1.5">Crop Management Details & Agronomy Notes</label>
          <textarea
            rows={3}
            value={formData.description}
            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            className="w-full p-3 rounded-xl border border-slate-200 bg-slate-50 text-xs focus:ring-2 focus:ring-forest-800 outline-none"
            required
          />
        </div>

        {/* Submit */}
        <div className="pt-4 border-t border-slate-100 flex justify-end gap-3">
          <button
            type="button"
            onClick={() => navigate('/farmer/dashboard')}
            className="px-4 py-2.5 text-xs font-semibold text-slate-600"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="px-6 py-2.5 rounded-xl bg-forest-900 hover:bg-forest-800 text-white font-bold text-xs shadow-md transition-all active:scale-95 flex items-center gap-2"
          >
            <span>Publish Crop Listing</span>
            <ArrowRight className="w-4 h-4 text-harvest-400" />
          </button>
        </div>
      </form>
    </div>
  );
};
