import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { 
  Sparkles, 
  TrendingUp, 
  ShieldCheck, 
  ArrowRight, 
  Users, 
  DollarSign, 
  Layers, 
  Store, 
  CheckCircle2, 
  MapPin, 
  Calculator, 
  AlertTriangle,
  Award,
  Lock,
  ChevronRight,
  Plane,
  Truck,
  Building2,
  Cpu
} from 'lucide-react';
import { useAppStore } from '../store/useAppStore';
import { DICTIONARY } from '../data/translations';
import { RiskBadge } from '../components/common/RiskBadge';
import { LandShieldBadge } from '../components/common/LandShieldBadge';
import { AgreementModal } from '../components/invest/AgreementModal';
import { CropListing } from '../types';

export const Home: React.FC = () => {
  const navigate = useNavigate();
  const { language, cropListings, setRole } = useAppStore();
  const t = DICTIONARY[language];

  const [selectedListingForInvest, setSelectedListingForInvest] = useState<CropListing | null>(null);
  const [investAmount, setInvestAmount] = useState<number>(25000);
  const [isInvestModalOpen, setIsInvestModalOpen] = useState(false);

  // 11 USP cards with soft module tints
  const usps = [
    { title: 'Direct Farmer–Investor Connection', desc: 'No middleman NBFC. Real capital straight to real fields with agreed profit-loss sharing.', color: 'bg-cardmint border-emerald-200 text-emerald-950', icon: Users },
    { title: 'End-to-End Agri Ecosystem', desc: 'Land → Funding → Inputs → Cultivation → Monitoring → Harvest → Storage → Sale.', color: 'bg-cardsky border-sky-200 text-sky-950', icon: Layers },
    { title: 'Verified & Trusted Network', desc: '7/12 land records, soil health cards, Aadhaar KYC, and drone geo-tagging on every farm.', color: 'bg-cardlavender border-purple-200 text-purple-950', icon: ShieldCheck },
    { title: 'Wide Marketplace Hub', desc: 'Trade crops, hybrid seeds, bio-fertilizers, tractor hiring, fodder, and livestock feed.', color: 'bg-cardpeach border-orange-200 text-orange-950', icon: Store },
    { title: 'Smart Market Intelligence', desc: 'Live e-NAM linked mandi prices, 30-day price trends, and demand-supply forecasts.', color: 'bg-cardamber border-amber-200 text-amber-950', icon: TrendingUp },
    { title: 'Advanced Crop Monitoring', desc: 'Sentinel-2 satellite multispectral NDVI tracking, drone audits, and weather warnings.', color: 'bg-cardmint border-teal-200 text-teal-950', icon: Cpu },
    { title: 'Flexible Investment Options', desc: 'Start micro-investing from ₹5,000 across staple grains, cash crops, and horticulture.', color: 'bg-cardrose border-pink-200 text-pink-950', icon: DollarSign },
    { title: 'Integrated Dual Insurance', desc: 'PMFBY-aligned yield cover + 50–70% investor capital protection against natural disaster.', color: 'bg-cardsky border-blue-200 text-blue-950', icon: Award },
    { title: 'Logistics & Storage Support', desc: 'Book WDRA cold stores and instant refrigerated transit directly from farm gate.', color: 'bg-cardpeach border-yellow-200 text-yellow-950', icon: Truck },
    { title: 'Farmer–Labour–Land Ties', desc: 'Connect idle NRI landowners with skilled labour brigades without any land title risk.', color: 'bg-cardlavender border-indigo-200 text-indigo-950', icon: Building2 },
    { title: 'Global Trade Opportunities', desc: 'APEDA certified aggregation for grapes, pomegranates, and spices to UAE and Europe.', color: 'bg-cardrose border-rose-200 text-rose-950', icon: Plane },
  ];

  const handleOpenInvest = (listing: CropListing) => {
    setSelectedListingForInvest(listing);
    setInvestAmount(Math.min(25000, listing.fundingRequired - listing.fundedAmount || 10000));
    setIsInvestModalOpen(true);
  };

  return (
    <div className="space-y-16 pb-12">
      {/* HERO SECTION */}
      <section className="relative pt-8 md:pt-14 pb-12 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            {/* Left Hero Content */}
            <div className="lg:col-span-7 space-y-6">
              {/* Pitch Tagline Badge */}
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-forest-100 text-forest-900 border border-forest-200 text-xs font-bold shadow-sm">
                <Sparkles className="w-4 h-4 text-harvest-500" />
                <span>{t.subtagline} • फसल साझा</span>
              </div>

              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-forest-950 tracking-tight leading-[1.15]">
                {language === 'hi' ? (
                  <>किसान खेती करेगा, निवेशक पैसा लगाएगा — <span className="text-harvest-500 underline decoration-forest-500">फसलसाझा</span> दोनों को जोड़ेगा।</>
                ) : (
                  <>Sow Together. <span className="text-harvest-500 underline decoration-forest-700">Share the Harvest.</span> One Complete Agri Chain.</>
                )}
              </h1>

              <p className="text-sm md:text-base text-slate-600 leading-relaxed max-w-2xl">
                India's first equitable agri-fintech and full-stack marketplace. We replace debt with transparent profit-sharing, protected by regulated nodal escrow and dual insurance. <strong>100% land ownership protected.</strong>
              </p>

              {/* 3 Core Action CTAs */}
              <div className="flex flex-wrap items-center gap-3 pt-2">
                <Link
                  to="/farmer/dashboard"
                  onClick={() => setRole('farmer')}
                  className="px-6 py-3.5 rounded-xl bg-forest-900 hover:bg-forest-800 text-white font-bold text-sm shadow-md hover:shadow-lg transition-all active:scale-95 flex items-center gap-2"
                >
                  <span>{t.imFarmer}</span>
                  <ArrowRight className="w-4 h-4 text-harvest-400" />
                </Link>

                <Link
                  to="/invest"
                  onClick={() => setRole('investor')}
                  className="px-6 py-3.5 rounded-xl bg-harvest-500 hover:bg-harvest-600 text-forest-950 font-extrabold text-sm shadow-md hover:shadow-lg transition-all active:scale-95 flex items-center gap-2"
                >
                  <span>{t.imInvestor}</span>
                  <TrendingUp className="w-4 h-4 text-forest-900" />
                </Link>

                <Link
                  to="/requirement/new"
                  className="px-5 py-3.5 rounded-xl bg-white border-2 border-slate-200 hover:border-forest-600 text-slate-800 font-bold text-sm shadow-sm transition-all flex items-center gap-2"
                >
                  <Sparkles className="w-4 h-4 text-harvest-500" />
                  <span>{t.postRequirement}</span>
                </Link>
              </div>

              {/* Trust Micro-Row */}
              <div className="flex flex-wrap items-center gap-3 pt-2">
                <LandShieldBadge variant="compact" />
                <span className="text-xs text-slate-500 flex items-center gap-1 font-semibold">
                  <Lock className="w-3.5 h-3.5 text-forest-700" />
                  ICICI Escrow
                </span>
                <span className="text-xs text-slate-500 flex items-center gap-1 font-semibold">
                  <Award className="w-3.5 h-3.5 text-forest-700" />
                  PMFBY Dual Cover
                </span>
              </div>
            </div>

            {/* Right Hero Visual Card */}
            <div className="lg:col-span-5 relative">
              <div className="relative rounded-2card overflow-hidden shadow-2xl border-4 border-white bg-slate-900 group">
                <img
                  src="https://images.unsplash.com/photo-1595273670150-bd0c3c392e46?auto=format&fit=crop&q=80&w=800"
                  alt="Farmer Ramesh Patil in Nashik Onion field"
                  className="w-full h-80 sm:h-96 object-cover opacity-90 group-hover:scale-105 transition-transform duration-500"
                />

                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent p-6 flex flex-col justify-end text-white">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="px-2.5 py-0.5 rounded-full bg-forest-700 text-limeaccent text-xs font-bold">
                      Live Cycle #CROP-001
                    </span>
                    <span className="text-xs text-slate-300">Pimpalgaon, Nashik</span>
                  </div>

                  <h3 className="text-lg font-bold">Nashik Garva Red Onion (Late Kharif)</h3>
                  <p className="text-xs text-slate-300 mt-0.5">Ramesh Patil • 3.0 Acres • 91 Health Score</p>

                  <div className="mt-3 pt-3 border-t border-white/20 flex justify-between items-center text-xs">
                    <div>
                      <span className="text-[11px] text-slate-400">Funded</span>
                      <p className="font-bold text-harvest-400">₹60,000 / ₹75,000</p>
                    </div>
                    <div>
                      <span className="text-[11px] text-slate-400">Investor Share</span>
                      <p className="font-bold text-white">35% Profit-Share</p>
                    </div>
                    <button
                      onClick={() => handleOpenInvest(cropListings[0])}
                      className="px-3.5 py-1.5 rounded-lg bg-harvest-500 hover:bg-harvest-600 text-forest-950 font-bold text-xs shadow-md transition-colors"
                    >
                      Fund ₹5k+
                    </button>
                  </div>
                </div>
              </div>

              {/* Floating Live Badge */}
              <div className="absolute -bottom-4 -left-4 bg-white p-3 rounded-2xl shadow-xl border border-slate-200 flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-forest-100 text-forest-800 flex items-center justify-center font-bold">
                  91%
                </div>
                <div>
                  <span className="text-[11px] font-bold text-slate-800 block">Satellite NDVI Score</span>
                  <span className="text-[10px] text-emerald-600 font-semibold">Optimal Vegetative Vigor</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ANIMATED VALUE CHAIN STRIP */}
      <section className="bg-forest-900 text-white py-6 shadow-inner">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <span className="text-xs font-bold uppercase tracking-wider text-harvest-400 shrink-0">
              One Complete Agri Chain:
            </span>
            <div className="flex items-center gap-2 overflow-x-auto w-full py-1 text-xs font-semibold text-slate-200">
              <span className="px-2.5 py-1 rounded-lg bg-forest-800 shrink-0">1. Land Verify</span>
              <span className="text-forest-400">→</span>
              <span className="px-2.5 py-1 rounded-lg bg-forest-800 shrink-0">2. Escrow Fund</span>
              <span className="text-forest-400">→</span>
              <span className="px-2.5 py-1 rounded-lg bg-forest-800 shrink-0">3. Agri Inputs</span>
              <span className="text-forest-400">→</span>
              <span className="px-2.5 py-1 rounded-lg bg-forest-800 shrink-0">4. Cultivate</span>
              <span className="text-forest-400">→</span>
              <span className="px-2.5 py-1 rounded-lg bg-forest-800 shrink-0">5. NDVI Monitor</span>
              <span className="text-forest-400">→</span>
              <span className="px-2.5 py-1 rounded-lg bg-forest-800 shrink-0">6. WDRA Store</span>
              <span className="text-forest-400">→</span>
              <span className="px-2.5 py-1 rounded-lg bg-forest-800 shrink-0">7. B2B Sell</span>
              <span className="text-forest-400">→</span>
              <span className="px-2.5 py-1 rounded-lg bg-harvest-500 text-forest-950 font-bold shrink-0">8. Auto Settle</span>
            </div>
          </div>
        </div>
      </section>

      {/* LIVE PLATFORM STAT COUNTERS */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="p-5 rounded-2card bg-white border border-slate-200 shadow-soft text-center space-y-1">
            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Verified Farmers</span>
            <p className="text-2xl md:text-3xl font-extrabold text-forest-900">1,240+</p>
            <span className="text-[11px] text-emerald-600 font-semibold">7/12 & Soil Audited</span>
          </div>

          <div className="p-5 rounded-2card bg-white border border-slate-200 shadow-soft text-center space-y-1">
            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Active Investors</span>
            <p className="text-2xl md:text-3xl font-extrabold text-forest-900">4,180+</p>
            <span className="text-[11px] text-emerald-600 font-semibold">Escrow Mandate Tier 1</span>
          </div>

          <div className="p-5 rounded-2card bg-white border border-slate-200 shadow-soft text-center space-y-1">
            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Funded Capital</span>
            <p className="text-2xl md:text-3xl font-extrabold text-harvest-600">₹4.28 Cr</p>
            <span className="text-[11px] text-slate-500">Regulated Escrow Pool</span>
          </div>

          <div className="p-5 rounded-2card bg-white border border-slate-200 shadow-soft text-center space-y-1">
            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Cycles Completed</span>
            <p className="text-2xl md:text-3xl font-extrabold text-forest-900">182</p>
            <span className="text-[11px] text-emerald-600 font-semibold">0.0% Default Rate</span>
          </div>
        </div>
      </section>

      {/* FEATURED LIVE CROP INVESTMENT LISTINGS */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2">
          <div>
            <h2 className="text-2xl font-extrabold text-forest-950">
              Featured Crop Investment Opportunities
            </h2>
            <p className="text-xs text-slate-500">
              Verified crop cycles open for micro-syndicated funding starting from ₹5,000.
            </p>
          </div>
          <Link to="/invest" className="text-xs font-bold text-forest-800 hover:underline flex items-center gap-1">
            View All 25 Crop Listings →
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {cropListings.slice(0, 3).map((listing) => {
            const fundedPct = Math.round((listing.fundedAmount / listing.fundingRequired) * 100);
            return (
              <div 
                key={listing.id}
                className="bg-white rounded-2card overflow-hidden border border-slate-200 shadow-soft hover:shadow-elevated transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="relative h-48 w-full">
                    <img 
                      src={listing.photos[0]} 
                      alt={listing.title} 
                      className="w-full h-full object-cover" 
                    />
                    <div className="absolute top-3 left-3">
                      <RiskBadge grade={listing.riskGrade} />
                    </div>
                    <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-md px-2.5 py-0.5 rounded-full text-[11px] font-bold text-forest-900">
                      {listing.tenureMonths} Months
                    </div>
                  </div>

                  <div className="p-5 space-y-3">
                    <div>
                      <div className="flex items-center gap-1.5 text-xs text-slate-500">
                        <MapPin className="w-3.5 h-3.5 text-slate-400" />
                        <span>{listing.location}, {listing.district}</span>
                      </div>
                      <h3 className="font-extrabold text-base text-slate-900 mt-1 leading-snug">
                        {listing.title}
                      </h3>
                      <p className="text-xs text-slate-500 mt-0.5">
                        Grower: <strong>{listing.farmerName}</strong> ({listing.landAreaAcres} Acres)
                      </p>
                    </div>

                    <div className="space-y-1">
                      <div className="flex justify-between text-xs font-semibold">
                        <span className="text-slate-500">Funding Progress ({fundedPct}%)</span>
                        <span className="text-forest-950 font-bold">₹{listing.fundedAmount.toLocaleString('en-IN')} / ₹{listing.fundingRequired.toLocaleString('en-IN')}</span>
                      </div>
                      <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
                        <div 
                          className="h-full bg-forest-800 rounded-full"
                          style={{ width: `${Math.min(100, fundedPct)}%` }}
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-2 pt-2 border-t border-slate-100 text-xs">
                      <div>
                        <span className="text-[10px] text-slate-400">Target Profit Share</span>
                        <p className="font-bold text-forest-900">{listing.proposedProfitSharePercent}% to Investor</p>
                      </div>
                      <div>
                        <span className="text-[10px] text-slate-400">Expected IRR</span>
                        <p className="font-bold text-emerald-700">~{listing.expectedReturnPercent}%</p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="p-5 pt-0">
                  <button
                    onClick={() => handleOpenInvest(listing)}
                    className="w-full py-2.5 rounded-xl bg-forest-900 hover:bg-forest-800 text-white font-bold text-xs shadow-md transition-colors"
                  >
                    Invest via Escrow
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* EQUITY VS DEBT COMPARISON TABLE */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-2card p-6 md:p-8 border border-slate-200 shadow-soft space-y-6">
          <div className="max-w-2xl">
            <span className="text-xs font-bold text-forest-800 uppercase tracking-wider">Fundamental Model Shift</span>
            <h2 className="text-2xl font-extrabold text-slate-900 mt-1">
              Why Equity Profit-Sharing Beats Conventional Debt
            </h2>
            <p className="text-xs text-slate-500 mt-1">
              FasalSanjha decouples Indian agriculture from devastating debt traps and rigid collateral mandates.
            </p>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-forest-900 text-white uppercase text-[10px] tracking-wider">
                <tr>
                  <th className="p-3.5 rounded-l-xl">Parameter</th>
                  <th className="p-3.5 bg-forest-800 text-harvest-400 font-extrabold">FasalSanjha (फसलसाझा)</th>
                  <th className="p-3.5">Bank / KCC Loan</th>
                  <th className="p-3.5">Agri NBFCs</th>
                  <th className="p-3.5 rounded-r-xl">Crowdfunding / NGO</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 bg-white">
                <tr className="hover:bg-slate-50/50">
                  <td className="p-3.5 font-bold text-slate-800">Funding Type</td>
                  <td className="p-3.5 font-bold text-forest-900 bg-forest-50/60">Profit/Loss Share</td>
                  <td className="p-3.5 text-slate-600">Fixed-interest debt</td>
                  <td className="p-3.5 text-slate-600">Fixed/floating debt</td>
                  <td className="p-3.5 text-slate-600">Donation / micro-loan</td>
                </tr>
                <tr className="hover:bg-slate-50/50">
                  <td className="p-3.5 font-bold text-slate-800">Farmer Liability</td>
                  <td className="p-3.5 font-bold text-emerald-700 bg-forest-50/60">Limited to yield outcome (Zero debt)</td>
                  <td className="p-3.5 text-slate-600">Fixed regardless of crop</td>
                  <td className="p-3.5 text-slate-600">Fixed regardless of crop</td>
                  <td className="p-3.5 text-slate-600">Varies</td>
                </tr>
                <tr className="hover:bg-slate-50/50">
                  <td className="p-3.5 font-bold text-slate-800">Investor Returns</td>
                  <td className="p-3.5 font-bold text-harvest-600 bg-forest-50/60">12–20% target (yield-linked)</td>
                  <td className="p-3.5 text-slate-400">N/A (Depositors get 6-7%)</td>
                  <td className="p-3.5 text-slate-400">N/A</td>
                  <td className="p-3.5 text-slate-600">Low or none (Charity)</td>
                </tr>
                <tr className="hover:bg-slate-50/50">
                  <td className="p-3.5 font-bold text-slate-800">Risk Protection</td>
                  <td className="p-3.5 font-bold text-forest-900 bg-forest-50/60">Dual Insurance (PMFBY + 60% Capital)</td>
                  <td className="p-3.5 text-slate-600">Land Mortgage Collateral</td>
                  <td className="p-3.5 text-slate-600">Collateral / Guarantor</td>
                  <td className="p-3.5 text-slate-600">Minimal</td>
                </tr>
                <tr className="hover:bg-slate-50/50">
                  <td className="p-3.5 font-bold text-slate-800">Digital Tracking</td>
                  <td className="p-3.5 font-bold text-forest-900 bg-forest-50/60">Full Geo-tagged + Satellite NDVI</td>
                  <td className="p-3.5 text-slate-600">Minimal / Paper inspection</td>
                  <td className="p-3.5 text-slate-600">Limited</td>
                  <td className="p-3.5 text-slate-600">Minimal</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* ALL 11 COLORFUL USP CARDS */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        <div>
          <span className="text-xs font-bold text-forest-800 uppercase tracking-wider">The Complete Proposition</span>
          <h2 className="text-2xl font-extrabold text-slate-900 mt-1">
            All 11 Unique Selling Points (USPs)
          </h2>
          <p className="text-xs text-slate-500 mt-1">
            Built as an interconnected stack to serve farmers, investors, labourers, and buyers alike.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {usps.map((usp, i) => {
            const Icon = usp.icon;
            return (
              <div 
                key={i} 
                className={`p-5 rounded-2card border shadow-sm space-y-2.5 transition-transform hover:-translate-y-1 ${usp.color}`}
              >
                <div className="w-9 h-9 rounded-xl bg-white/70 backdrop-blur-sm flex items-center justify-center shadow-sm">
                  <Icon className="w-5 h-5" />
                </div>
                <h3 className="font-extrabold text-sm leading-snug">{usp.title}</h3>
                <p className="text-xs opacity-85 leading-relaxed">{usp.desc}</p>
              </div>
            );
          })}
        </div>
      </section>

      {/* HOW IT WORKS IN 4 STEPS */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-forest-950 text-white rounded-2card p-6 md:p-10 shadow-elevated grid grid-cols-1 lg:grid-cols-2 gap-10">
          {/* For Farmers */}
          <div className="space-y-4">
            <span className="px-3 py-1 rounded-full bg-forest-800 text-limeaccent text-xs font-bold">
              👨🌾 For Farmers (किसान)
            </span>
            <h3 className="text-xl font-bold">How It Works in 4 Steps</h3>
            <div className="space-y-3 text-xs">
              <div className="p-3 rounded-xl bg-forest-900/60 border border-forest-800 flex items-start gap-3">
                <span className="font-mono font-bold text-harvest-400">1</span>
                <div>
                  <strong>7/12 & Soil Verification:</strong> Upload land records and soil health card. Field agent visits within 48h.
                </div>
              </div>
              <div className="p-3 rounded-xl bg-forest-900/60 border border-forest-800 flex items-start gap-3">
                <span className="font-mono font-bold text-harvest-400">2</span>
                <div>
                  <strong>List Crop Cycle:</strong> Specify crop variety (hybrid vs traditional), acreage, and funding needed. Risk Grade auto-assigned.
                </div>
              </div>
              <div className="p-3 rounded-xl bg-forest-900/60 border border-forest-800 flex items-start gap-3">
                <span className="font-mono font-bold text-harvest-400">3</span>
                <div>
                  <strong>Receive Escrow Tranches:</strong> 40% sowing, 35% mid-season vegetative NDVI check, 25% pre-harvest.
                </div>
              </div>
              <div className="p-3 rounded-xl bg-forest-900/60 border border-forest-800 flex items-start gap-3">
                <span className="font-mono font-bold text-harvest-400">4</span>
                <div>
                  <strong>Harvest & Automated Settlement:</strong> Direct B2B sale or mandi delivery. Profit split credited automatically.
                </div>
              </div>
            </div>
          </div>

          {/* For Investors */}
          <div className="space-y-4">
            <span className="px-3 py-1 rounded-full bg-harvest-500 text-forest-950 text-xs font-bold">
              💰 For Investors (निवेशक)
            </span>
            <h3 className="text-xl font-bold">How It Works in 4 Steps</h3>
            <div className="space-y-3 text-xs">
              <div className="p-3 rounded-xl bg-forest-900/60 border border-forest-800 flex items-start gap-3">
                <span className="font-mono font-bold text-limeaccent">1</span>
                <div>
                  <strong>Explore Graded Marketplace:</strong> Filter by Risk Grade (A/B/C), expected yield, crop duration, and district.
                </div>
              </div>
              <div className="p-3 rounded-xl bg-forest-900/60 border border-forest-800 flex items-start gap-3">
                <span className="font-mono font-bold text-limeaccent">2</span>
                <div>
                  <strong>e-Sign Tripartite Agreement:</strong> Digital contract with legal land protection shield and profit ratio locked.
                </div>
              </div>
              <div className="p-3 rounded-xl bg-forest-900/60 border border-forest-800 flex items-start gap-3">
                <span className="font-mono font-bold text-limeaccent">3</span>
                <div>
                  <strong>Deposit in Regulated Escrow:</strong> Funds deposited in ICICI Nodal account; released only upon verified milestones.
                </div>
              </div>
              <div className="p-3 rounded-xl bg-forest-900/60 border border-forest-800 flex items-start gap-3">
                <span className="font-mono font-bold text-limeaccent">4</span>
                <div>
                  <strong>Track via Satellite & Receive Returns:</strong> Real-time NDVI maps and instant payout upon harvest sale.
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* AGREEMENT MODAL */}
      {selectedListingForInvest && (
        <AgreementModal
          listing={selectedListingForInvest}
          investmentAmount={investAmount}
          isOpen={isInvestModalOpen}
          onClose={() => setIsInvestModalOpen(false)}
          onSuccess={() => {
            setIsInvestModalOpen(false);
            navigate('/track');
          }}
        />
      )}
    </div>
  );
};
