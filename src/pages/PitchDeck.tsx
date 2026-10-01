import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { 
  ChevronLeft, 
  ChevronRight, 
  Presentation, 
  ExternalLink, 
  Layers, 
  TrendingUp, 
  ShieldCheck, 
  Users, 
  Sliders, 
  PieChart as PieIcon, 
  DollarSign, 
  Target, 
  CheckCircle2, 
  AlertCircle,
  Sparkles,
  ArrowUpRight,
  Maximize2
} from 'lucide-react';
import { PITCH_SLIDES, BMC_DATA, FINANCIAL_METRICS } from '../data/pitchData';
import { ResponsiveContainer, PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, Tooltip, Legend } from 'recharts';

export const PitchDeck: React.FC = () => {
  const navigate = useNavigate();
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);

  // Revenue Simulator state on Slide 6
  const [simFarmers, setSimFarmers] = useState(2500);
  const [simAvgTicket, setSimAvgTicket] = useState(70000);
  const [simMarketplaceGmv, setSimMarketplaceGmv] = useState(15000000);

  const slide = PITCH_SLIDES[currentSlideIndex];
  const totalSlides = PITCH_SLIDES.length;

  const nextSlide = () => {
    if (currentSlideIndex < totalSlides - 1) {
      setCurrentSlideIndex(currentSlideIndex + 1);
    }
  };

  const prevSlide = () => {
    if (currentSlideIndex > 0) {
      setCurrentSlideIndex(currentSlideIndex - 1);
    }
  };

  // Keyboard navigation: Left/Right arrows
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight' || e.key === ' ') {
        nextSlide();
      } else if (e.key === 'ArrowLeft') {
        prevSlide();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [currentSlideIndex]);

  // Calculations for Slide 6 Revenue Simulator
  const totalCapitalFunded = simFarmers * simAvgTicket; // in Rupees
  const farmerPlatformFee = totalCapitalFunded * 0.025; // 2.5%
  const investorMgmtFee = (totalCapitalFunded * 0.18) * 0.01; // 1% of 18% return
  const marketplaceCommission = simMarketplaceGmv * 0.20; // 20%
  const totalSimRevenue = farmerPlatformFee + investorMgmtFee + marketplaceCommission;

  // Marketing Budget Donut data for Slide 10
  const marketingDonut = [
    { name: 'Digital & Performance', value: 35, color: '#0B4F2E' },
    { name: 'On-Ground Gram Activation', value: 25, color: '#2E8B3E' },
    { name: 'Influencer & Agronomist Content', value: 15, color: '#8CC63F' },
    { name: 'FPO & Co-Op Bank Tie-ups', value: 15, color: '#F5A623' },
    { name: 'Farmer & Investor Referrals', value: 10, color: '#FBBF24' },
  ];

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col justify-between selection:bg-harvest-500 selection:text-forest-950 font-sans">
      {/* Top Slide Control Bar */}
      <div className="bg-slate-900/90 backdrop-blur-md border-b border-slate-800 px-6 py-3 flex items-center justify-between z-20">
        <div className="flex items-center gap-3">
          <Link to="/" className="text-xs font-bold text-slate-400 hover:text-white flex items-center gap-1 transition-colors">
            <ChevronLeft className="w-4 h-4" />
            <span>Exit Pitch Mode</span>
          </Link>
          <span className="text-slate-600">|</span>
          <div className="flex items-center gap-2">
            <span className="px-2 py-0.5 rounded-full bg-forest-900 text-limeaccent text-[11px] font-bold">
              SLIDE {slide.id} / {totalSlides}
            </span>
            <span className="text-xs font-bold text-slate-300 hidden sm:inline">
              {slide.category}
            </span>
          </div>
        </div>

        {/* Slide navigation bullets & arrows */}
        <div className="flex items-center gap-2">
          <button 
            disabled={currentSlideIndex === 0} 
            onClick={prevSlide}
            className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 disabled:opacity-30 text-white transition-colors"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          
          <div className="hidden md:flex items-center gap-1 px-2">
            {PITCH_SLIDES.map((s, idx) => (
              <button
                key={s.id}
                onClick={() => setCurrentSlideIndex(idx)}
                className={`w-2.5 h-2.5 rounded-full transition-all ${
                  idx === currentSlideIndex 
                    ? 'w-6 bg-harvest-500 rounded-full' 
                    : 'bg-slate-700 hover:bg-slate-500'
                }`}
                title={`Go to ${s.title}`}
              />
            ))}
          </div>

          <button 
            disabled={currentSlideIndex === totalSlides - 1} 
            onClick={nextSlide}
            className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 disabled:opacity-30 text-white transition-colors"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Main Slide Canvas */}
      <div className="flex-1 max-w-7xl w-full mx-auto p-6 md:p-10 flex flex-col justify-center animate-in fade-in duration-200">
        {/* Slide Title Header */}
        <div className="mb-6 flex flex-col md:flex-row justify-between items-start md:items-end gap-3 pb-4 border-b border-slate-800">
          <div>
            <span className="text-xs font-bold uppercase tracking-widest text-harvest-400">
              {slide.category}
            </span>
            <h1 className="text-2xl md:text-3xl font-extrabold text-white mt-1">
              {slide.title}
            </h1>
            <p className="text-xs md:text-sm text-slate-400 mt-1 max-w-3xl">
              {slide.subtitle}
            </p>
          </div>

          <Link 
            to="/" 
            target="_blank" 
            className="px-4 py-2 rounded-xl bg-forest-800 hover:bg-forest-700 text-white font-bold text-xs flex items-center gap-1.5 transition-colors border border-forest-600 shadow-md shrink-0"
          >
            <ExternalLink className="w-3.5 h-3.5 text-harvest-400" />
            <span>Launch Live App Demo</span>
          </Link>
        </div>

        {/* Slide Body: Dynamic per Slide ID */}
        <div className="flex-1 min-h-[440px] flex flex-col justify-center">
          {/* SLIDE 1: Problem */}
          {slide.id === 1 && (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="p-6 rounded-2card bg-slate-900/80 border border-slate-800 space-y-3">
                <div className="w-10 h-10 rounded-xl bg-rose-500/10 text-rose-400 flex items-center justify-center font-bold">01</div>
                <h3 className="font-bold text-base text-white">Smallholder Debt Trap</h3>
                <p className="text-xs text-slate-400 leading-relaxed">
                  140M+ landholdings in India, with 86% holding &lt;2 hectares. Fixed-interest bank loans and informal moneylenders demand repayments regardless of unseasonal monsoon, pest epidemics, or price crashes.
                </p>
              </div>

              <div className="p-6 rounded-2card bg-slate-900/80 border border-slate-800 space-y-3">
                <div className="w-10 h-10 rounded-xl bg-amber-500/10 text-amber-400 flex items-center justify-center font-bold">02</div>
                <h3 className="font-bold text-base text-white">Zero Direct Retail Agri-Asset Access</h3>
                <p className="text-xs text-slate-400 leading-relaxed">
                  Urban retail investors and HNIs want inflation-beating, real-asset diversification. Yet there exists zero transparent, legally safe digital mechanism to invest directly into productive farm cycles.
                </p>
              </div>

              <div className="p-6 rounded-2card bg-slate-900/80 border border-slate-800 space-y-3">
                <div className="w-10 h-10 rounded-xl bg-blue-500/10 text-blue-400 flex items-center justify-center font-bold">03</div>
                <h3 className="font-bold text-base text-white">Fragmented Value Chain</h3>
                <p className="text-xs text-slate-400 leading-relaxed">
                  Quality inputs, machinery rental, WDRA storage, cold transport, and direct B2B corporate buyers exist in isolated silos with high middleman leakage.
                </p>
              </div>
            </div>
          )}

          {/* SLIDE 2: Solution */}
          {slide.id === 2 && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
              <div className="space-y-4">
                <div className="p-4 rounded-2xl bg-forest-900/60 border border-forest-700/80">
                  <h4 className="text-harvest-400 font-bold text-xs uppercase tracking-wider">The Core Value Thesis</h4>
                  <p className="text-lg md:text-xl font-bold text-white mt-1 leading-snug">
                    "Farmer kheti karega, investor paisa lagayega — FasalSanjha dono ko digitally connect karke profit/loss agreed ratio mein share karwayega."
                  </p>
                </div>

                <ul className="space-y-3 text-xs text-slate-300">
                  <li className="flex items-start gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-limeaccent shrink-0 mt-0.5" />
                    <span><strong>No Fixed Debt Burden:</strong> Farmers pay only when the crop sells; risks and upside are shared equitably.</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-limeaccent shrink-0 mt-0.5" />
                    <span><strong>100% Protected Land Ownership:</strong> Land title is legally untouchable — never mortgaged, leased, or charged.</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-limeaccent shrink-0 mt-0.5" />
                    <span><strong>₹5,000 Accessible Ticket Size:</strong> Micro-syndicated retail funding via regulated ICICI Nodal Escrow.</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-limeaccent shrink-0 mt-0.5" />
                    <span><strong>Dual Insurance Shield:</strong> PMFBY yield cover + 50–70% investor capital disaster protection.</span>
                  </li>
                </ul>
              </div>

              {/* Graphical Comparison Visual */}
              <div className="p-6 rounded-2card bg-slate-900 border border-slate-800 space-y-4">
                <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider">Equity Sharing vs Debt</h4>
                <div className="space-y-3 text-xs">
                  <div className="p-3 rounded-xl bg-forest-950 border border-forest-700 flex justify-between items-center">
                    <div>
                      <span className="font-bold text-white">FasalSanjha Profit-Share</span>
                      <p className="text-[11px] text-limeaccent">Outcome-linked • 0% foreclosure risk</p>
                    </div>
                    <span className="px-2.5 py-1 rounded-full bg-forest-800 text-limeaccent text-xs font-bold">12–20% Target Yield</span>
                  </div>

                  <div className="p-3 rounded-xl bg-slate-800/60 border border-slate-700 flex justify-between items-center opacity-70">
                    <div>
                      <span className="font-semibold text-slate-300">Commercial Bank / KCC Loan</span>
                      <p className="text-[11px] text-slate-400">Fixed interest • Demands collateral</p>
                    </div>
                    <span className="text-xs text-rose-400 font-bold">Fixed Liability</span>
                  </div>

                  <div className="p-3 rounded-xl bg-slate-800/60 border border-slate-700 flex justify-between items-center opacity-70">
                    <div>
                      <span className="font-semibold text-slate-300">Informal Moneylender</span>
                      <p className="text-[11px] text-slate-400">24–36% APR • Extreme default distress</p>
                    </div>
                    <span className="text-xs text-rose-500 font-bold">Debt Trap</span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* SLIDE 3: How it Works (Animated Strip) */}
          {slide.id === 3 && (
            <div className="space-y-6">
              <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-3 text-center">
                {[
                  { step: '1', title: 'Land Verification', desc: '7/12 & Soil Test' },
                  { step: '2', title: 'Crop Funding', desc: 'Escrow Tranches' },
                  { step: '3', title: 'Agri Inputs', desc: 'Seeds & Bio-nutrients' },
                  { step: '4', title: 'Cultivation', desc: 'Drone / Field Agent' },
                  { step: '5', title: 'NDVI Audit', desc: 'Satellite Health Map' },
                  { step: '6', title: 'Harvest & Store', desc: 'WDRA Warehousing' },
                  { step: '7', title: 'Logistics & Sale', desc: 'B2B Supermarkets' },
                  { step: '8', title: 'Auto Split', desc: 'Instant Payout Waterfall' },
                ].map((item, i) => (
                  <div key={i} className="p-3.5 rounded-2xl bg-slate-900 border border-slate-800 flex flex-col justify-between">
                    <div className="w-7 h-7 rounded-full bg-forest-900 text-limeaccent font-bold text-xs flex items-center justify-center mx-auto mb-2">
                      {item.step}
                    </div>
                    <h5 className="font-bold text-xs text-white leading-tight">{item.title}</h5>
                    <p className="text-[10px] text-slate-400 mt-1">{item.desc}</p>
                  </div>
                ))}
              </div>

              <div className="p-5 rounded-2xl bg-forest-950/80 border border-forest-800 text-xs text-slate-300 leading-relaxed flex items-center justify-between">
                <span>
                  <strong>Escrow Security Model:</strong> Capital is never released lump sum. Tranche 1 (40% sowing) → Tranche 2 (35% mid-season vegetative audit) → Tranche 3 (25% pre-harvest maturity audit).
                </span>
                <Link to="/track" className="px-3 py-1.5 rounded-xl bg-forest-800 text-white font-bold text-xs shrink-0 hover:bg-forest-700 ml-4">
                  View Live Tracker →
                </Link>
              </div>
            </div>
          )}

          {/* SLIDE 4: Product Demo Links */}
          {slide.id === 4 && (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Link 
                to="/invest" 
                className="p-6 rounded-2card bg-slate-900 hover:bg-slate-850 border border-slate-800 hover:border-forest-600 transition-all space-y-3 group"
              >
                <div className="w-10 h-10 rounded-xl bg-forest-900 text-limeaccent flex items-center justify-center">
                  <TrendingUp className="w-5 h-5" />
                </div>
                <h3 className="font-bold text-base text-white group-hover:text-harvest-400 transition-colors">
                  1. Crop Investment Flow
                </h3>
                <p className="text-xs text-slate-400 leading-relaxed">
                  Browse 25 risk-graded Maharashtra crops (Grades A/B/C). Interactive tripartite smart-contract, simulated e-sign, and instant nodal escrow deposit.
                </p>
                <span className="text-xs font-bold text-harvest-400 flex items-center gap-1">
                  Open Marketplace →
                </span>
              </Link>

              <Link 
                to="/requirement/new" 
                className="p-6 rounded-2card bg-slate-900 hover:bg-slate-850 border border-slate-800 hover:border-harvest-500 transition-all space-y-3 group"
              >
                <div className="w-10 h-10 rounded-xl bg-harvest-500/10 text-harvest-400 flex items-center justify-center">
                  <Sparkles className="w-5 h-5" />
                </div>
                <h3 className="font-bold text-base text-white group-hover:text-harvest-400 transition-colors">
                  2. "Post Your Requirement"
                </h3>
                <p className="text-xs text-slate-400 leading-relaxed">
                  Single RFQ form with automated matching engine animation that surfaces matched Farmers + Traders + Logistics + WDRA storage.
                </p>
                <span className="text-xs font-bold text-harvest-400 flex items-center gap-1">
                  Try Matching Engine →
                </span>
              </Link>

              <Link 
                to="/bazaar" 
                className="p-6 rounded-2card bg-slate-900 hover:bg-slate-850 border border-slate-800 hover:border-blue-500 transition-all space-y-3 group"
              >
                <div className="w-10 h-10 rounded-xl bg-blue-500/10 text-blue-400 flex items-center justify-center">
                  <Layers className="w-5 h-5" />
                </div>
                <h3 className="font-bold text-base text-white group-hover:text-harvest-400 transition-colors">
                  3. FasalSanjha Bazaar Hub
                </h3>
                <p className="text-xs text-slate-400 leading-relaxed">
                  11 sub-modules: inputs with in-app counter-offers, machinery hire, fodder, land-labour sharing agreements, and live logistics pricing.
                </p>
                <span className="text-xs font-bold text-harvest-400 flex items-center gap-1">
                  Explore Bazaar →
                </span>
              </Link>
            </div>
          )}

          {/* SLIDE 5: Interactive Business Model Canvas (9 blocks) */}
          {slide.id === 5 && (
            <div className="grid grid-cols-1 md:grid-cols-5 gap-3 text-[11px] overflow-y-auto max-h-[500px] pr-1">
              {/* Key Partners */}
              <div className="p-3.5 rounded-2xl bg-slate-900 border border-slate-800 space-y-2">
                <span className="font-bold text-xs uppercase tracking-wider text-harvest-400">Key Partners</span>
                <ul className="space-y-1 text-slate-300">
                  {BMC_DATA.keyPartners.slice(0, 5).map((p, i) => (
                    <li key={i}>• {p}</li>
                  ))}
                </ul>
              </div>

              {/* Key Activities & Resources (Col 2) */}
              <div className="space-y-3">
                <div className="p-3.5 rounded-2xl bg-slate-900 border border-slate-800 space-y-1.5">
                  <span className="font-bold text-xs uppercase tracking-wider text-harvest-400">Key Activities</span>
                  <ul className="space-y-1 text-slate-300">
                    {BMC_DATA.keyActivities.slice(0, 3).map((a, i) => (
                      <li key={i}>• {a}</li>
                    ))}
                  </ul>
                </div>
                <div className="p-3.5 rounded-2xl bg-slate-900 border border-slate-800 space-y-1.5">
                  <span className="font-bold text-xs uppercase tracking-wider text-harvest-400">Key Resources</span>
                  <ul className="space-y-1 text-slate-300">
                    {BMC_DATA.keyResources.slice(0, 3).map((r, i) => (
                      <li key={i}>• {r}</li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Value Propositions (Center) */}
              <div className="p-3.5 rounded-2xl bg-forest-950/80 border border-forest-700 space-y-2">
                <span className="font-bold text-xs uppercase tracking-wider text-limeaccent">Value Propositions</span>
                <ul className="space-y-2 text-slate-200">
                  {BMC_DATA.valueProps.map((v, i) => (
                    <li key={i} className="leading-snug">• {v}</li>
                  ))}
                </ul>
              </div>

              {/* Customer Relationships & Channels (Col 4) */}
              <div className="space-y-3">
                <div className="p-3.5 rounded-2xl bg-slate-900 border border-slate-800 space-y-1.5">
                  <span className="font-bold text-xs uppercase tracking-wider text-harvest-400">Customer Rel.</span>
                  <ul className="space-y-1 text-slate-300">
                    {BMC_DATA.customerRelationships.slice(0, 3).map((c, i) => (
                      <li key={i}>• {c}</li>
                    ))}
                  </ul>
                </div>
                <div className="p-3.5 rounded-2xl bg-slate-900 border border-slate-800 space-y-1.5">
                  <span className="font-bold text-xs uppercase tracking-wider text-harvest-400">Channels</span>
                  <ul className="space-y-1 text-slate-300">
                    {BMC_DATA.channels.slice(0, 3).map((ch, i) => (
                      <li key={i}>• {ch}</li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Customer Segments */}
              <div className="p-3.5 rounded-2xl bg-slate-900 border border-slate-800 space-y-2">
                <span className="font-bold text-xs uppercase tracking-wider text-harvest-400">Customer Segments</span>
                <ul className="space-y-1 text-slate-300">
                  {BMC_DATA.customerSegments.map((s, i) => (
                    <li key={i}>• {s}</li>
                  ))}
                </ul>
              </div>

              {/* Cost Structure (Span 2.5) */}
              <div className="md:col-span-2 p-3.5 rounded-2xl bg-slate-900 border border-slate-800 space-y-1.5">
                <span className="font-bold text-xs uppercase tracking-wider text-rose-400">Cost Structure</span>
                <p className="text-slate-300 leading-relaxed">
                  Tech platform & cloud • Agronomists & district field agents • Satellite NDVI data licenses • Escrow & payment fees • Legal & compliance audits • Marketing & farmer digital literacy.
                </p>
              </div>

              {/* Revenue Streams (Span 3) */}
              <div className="md:col-span-3 p-3.5 rounded-2xl bg-slate-900 border border-slate-800 space-y-1.5">
                <span className="font-bold text-xs uppercase tracking-wider text-emerald-400">Revenue Streams</span>
                <p className="text-slate-300 leading-relaxed">
                  2–3% Farmer Platform Fee • 1% Investor Management Fee on returns • 20% sales & 10% shipping on input/machinery marketplace • 2–3% Labour-land facilitation • Storage & B2B procurement commissions.
                </p>
              </div>
            </div>
          )}

          {/* SLIDE 6: Revenue Model & Live Simulator */}
          {slide.id === 6 && (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              {/* Simulator Controls (6 cols) */}
              <div className="lg:col-span-6 bg-slate-900 p-6 rounded-2card border border-slate-800 space-y-5">
                <div className="flex justify-between items-center">
                  <h4 className="text-sm font-bold text-white flex items-center gap-2">
                    <Sliders className="w-4 h-4 text-harvest-400" />
                    Live Revenue Projection Simulator
                  </h4>
                  <span className="text-[11px] text-harvest-400 font-mono">Dynamic Model</span>
                </div>

                {/* Slider 1: Active Farmers */}
                <div>
                  <div className="flex justify-between text-xs text-slate-300 mb-1">
                    <span>Active Funded Farmers</span>
                    <span className="font-bold text-white">{simFarmers.toLocaleString('en-IN')}</span>
                  </div>
                  <input
                    type="range"
                    min={500}
                    max={10000}
                    step={100}
                    value={simFarmers}
                    onChange={(e) => setSimFarmers(Number(e.target.value))}
                    className="w-full accent-harvest-500 cursor-pointer"
                  />
                </div>

                {/* Slider 2: Average Crop Ticket */}
                <div>
                  <div className="flex justify-between text-xs text-slate-300 mb-1">
                    <span>Average Crop Cycle Ticket</span>
                    <span className="font-bold text-white">₹{simAvgTicket.toLocaleString('en-IN')}</span>
                  </div>
                  <input
                    type="range"
                    min={40000}
                    max={120000}
                    step={5000}
                    value={simAvgTicket}
                    onChange={(e) => setSimAvgTicket(Number(e.target.value))}
                    className="w-full accent-harvest-500 cursor-pointer"
                  />
                </div>

                {/* Slider 3: Marketplace GMV */}
                <div>
                  <div className="flex justify-between text-xs text-slate-300 mb-1">
                    <span>Marketplace & Input GMV</span>
                    <span className="font-bold text-white">₹{(simMarketplaceGmv / 10000000).toFixed(2)} Crore</span>
                  </div>
                  <input
                    type="range"
                    min={5000000}
                    max={100000000}
                    step={5000000}
                    value={simMarketplaceGmv}
                    onChange={(e) => setSimMarketplaceGmv(Number(e.target.value))}
                    className="w-full accent-harvest-500 cursor-pointer"
                  />
                </div>
              </div>

              {/* Dynamic Revenue Output (6 cols) */}
              <div className="lg:col-span-6 space-y-4">
                <div className="p-6 rounded-2card bg-forest-950 border border-forest-800 space-y-4">
                  <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                    Total Estimated Annual Platform Revenue
                  </span>
                  <div className="text-3xl md:text-4xl font-extrabold text-limeaccent">
                    ₹{(totalSimRevenue / 100000).toFixed(1)} Lakh
                  </div>
                  <p className="text-xs text-slate-400">
                    Supported by ₹{(totalCapitalFunded / 10000000).toFixed(2)} Crore cumulative capital funded.
                  </p>

                  <div className="pt-3 border-t border-forest-900 space-y-2 text-xs">
                    <div className="flex justify-between">
                      <span className="text-slate-400">Farmer Platform Fee (2.5%):</span>
                      <span className="font-bold text-white">₹{(farmerPlatformFee / 100000).toFixed(1)} L</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-400">Investor Management Fee (1% on returns):</span>
                      <span className="font-bold text-white">₹{(investorMgmtFee / 100000).toFixed(1)} L</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-400">Marketplace & Facilitation Commissions:</span>
                      <span className="font-bold text-harvest-400">₹{(marketplaceCommission / 100000).toFixed(1)} L</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* SLIDE 7: Market Size (TAM, SAM, SOM) */}
          {slide.id === 7 && (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-center">
              <div className="p-6 rounded-2card bg-slate-900 border border-slate-800 space-y-2 text-center">
                <span className="text-xs font-bold uppercase tracking-wider text-slate-400">TAM (Total Addressable)</span>
                <p className="text-3xl font-extrabold text-white">₹20 Lakh Cr+</p>
                <p className="text-xs text-slate-400 leading-relaxed">
                  Annual formal & informal Indian agricultural credit disbursement across 140M+ farm holdings.
                </p>
              </div>

              <div className="p-6 rounded-2card bg-forest-950 border border-forest-700 space-y-2 text-center">
                <span className="text-xs font-bold uppercase tracking-wider text-harvest-400">SAM (Serviceable Addressable)</span>
                <p className="text-3xl font-extrabold text-limeaccent">₹8,000–10,000 Cr</p>
                <p className="text-xs text-slate-300 leading-relaxed">
                  Maharashtra cash crop, horticulture, and commercial clusters (Nashik, Pune, Ahmednagar, Solapur, Vidarbha).
                </p>
              </div>

              <div className="p-6 rounded-2card bg-slate-900 border border-slate-800 space-y-2 text-center">
                <span className="text-xs font-bold uppercase tracking-wider text-harvest-400">SOM (Year 3 Serviceable Target)</span>
                <p className="text-3xl font-extrabold text-harvest-500">₹40–60 Cr</p>
                <p className="text-xs text-slate-400 leading-relaxed">
                  Funded agricultural capital managed across 5,000+ verified progressive farmer cycles by Year 3.
                </p>
              </div>
            </div>
          )}

          {/* SLIDE 8: Competition & SWOT */}
          {slide.id === 8 && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Competition Matrix */}
              <div className="bg-slate-900 p-5 rounded-2card border border-slate-800 space-y-3">
                <h4 className="font-bold text-sm text-white">Competitive Differentiation</h4>
                <div className="text-[11px] divide-y divide-slate-800 space-y-2">
                  <div className="pt-2 flex justify-between">
                    <span className="font-bold text-limeaccent">FasalSanjha</span>
                    <span className="text-slate-300">Equity Profit-share • Dual Insurance • Full Ecosystem</span>
                  </div>
                  <div className="pt-2 flex justify-between">
                    <span className="font-semibold text-slate-400">KCC & Public Banks</span>
                    <span className="text-slate-400">Rigid collateral debt • High default NPA stress</span>
                  </div>
                  <div className="pt-2 flex justify-between">
                    <span className="font-semibold text-slate-400">Agri NBFCs (Samunnati / Jai Kisan)</span>
                    <span className="text-slate-400">Fixed interest debt • Higher interest spread (16-24%)</span>
                  </div>
                  <div className="pt-2 flex justify-between">
                    <span className="font-semibold text-slate-400">Supply-chain (Ninjacart / AgroStar)</span>
                    <span className="text-slate-400">Produce procurement only • No working capital equity</span>
                  </div>
                  <div className="pt-2 flex justify-between">
                    <span className="font-semibold text-slate-400">Global (AcreTrader / FarmTogether)</span>
                    <span className="text-slate-400">US Farmland REITs • No Indian crop cycle model</span>
                  </div>
                </div>
              </div>

              {/* SWOT Grid */}
              <div className="grid grid-cols-2 gap-3 text-xs">
                <div className="p-3.5 rounded-xl bg-forest-950/60 border border-forest-800">
                  <span className="font-bold text-limeaccent block mb-1">Strengths</span>
                  <p className="text-[11px] text-slate-300 leading-relaxed">
                    Zero farmer debt liability, protected land titles, verified geo-tagged NDVI monitoring.
                  </p>
                </div>
                <div className="p-3.5 rounded-xl bg-amber-950/40 border border-amber-800/60">
                  <span className="font-bold text-amber-400 block mb-1">Weaknesses</span>
                  <p className="text-[11px] text-slate-300 leading-relaxed">
                    Requires on-ground field agent density in initial pilot clusters.
                  </p>
                </div>
                <div className="p-3.5 rounded-xl bg-blue-950/40 border border-blue-800/60">
                  <span className="font-bold text-blue-400 block mb-1">Opportunities</span>
                  <p className="text-[11px] text-slate-300 leading-relaxed">
                    FPO partnerships, export grade standardization, carbon credit syndication.
                  </p>
                </div>
                <div className="p-3.5 rounded-xl bg-rose-950/40 border border-rose-800/60">
                  <span className="font-bold text-rose-400 block mb-1">Threats</span>
                  <p className="text-[11px] text-slate-300 leading-relaxed">
                    Catastrophic weather (mitigated by dual insurance) & regulatory misclassification.
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* SLIDE 9: Roadmap & Expansion */}
          {slide.id === 9 && (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="p-5 rounded-2card bg-slate-900 border border-slate-800 space-y-3">
                <div className="text-xs font-bold text-harvest-400 uppercase tracking-wider">Phase 1: Pilot (Year 1)</div>
                <h4 className="font-extrabold text-base text-white">Nashik & Ahmednagar</h4>
                <ul className="space-y-1.5 text-xs text-slate-300">
                  <li>• Incorporate legal entity with ICICI Nodal Escrow</li>
                  <li>• 500 Verified Farmers • 1,000 Retail Investors</li>
                  <li>• Focus: Garva Onion, Organic Soybean, Wheat</li>
                  <li>• Onboard 40 Village Field Agents</li>
                </ul>
              </div>

              <div className="p-5 rounded-2card bg-forest-950 border border-forest-700 space-y-3">
                <div className="text-xs font-bold text-limeaccent uppercase tracking-wider">Phase 2: Scale (Year 2)</div>
                <h4 className="font-extrabold text-base text-white">5 High-Yield Districts</h4>
                <ul className="space-y-1.5 text-xs text-slate-200">
                  <li>• Expand to Pune, Solapur, Jalgaon clusters</li>
                  <li>• 2,000 Farmers • 6,000 Investors • ₹15 Cr Capital</li>
                  <li>• Integrated IoT Soil Probes & Drone Sprayer Hiring</li>
                  <li>• Institutional PMFBY Insurance Co-underwriting</li>
                </ul>
              </div>

              <div className="p-5 rounded-2card bg-slate-900 border border-slate-800 space-y-3">
                <div className="text-xs font-bold text-harvest-400 uppercase tracking-wider">Phase 3: National (Year 3)</div>
                <h4 className="font-extrabold text-base text-white">Pan-Maharashtra & Inter-state</h4>
                <ul className="space-y-1.5 text-xs text-slate-300">
                  <li>• 5,000+ Farmers • 15,000 Investors • ₹40 Cr+ Capital</li>
                  <li>• Operating break-even achieved</li>
                  <li>• Strategic expansion: Gujarat, Karnataka, Madhya Pradesh</li>
                  <li>• B2B direct export fulfillment desks</li>
                </ul>
              </div>
            </div>
          )}

          {/* SLIDE 10: Marketing Plan & Donut */}
          {slide.id === 10 && (
            <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
              <div className="md:col-span-5 h-64 w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={marketingDonut}
                      cx="50%"
                      cy="50%"
                      innerRadius={50}
                      outerRadius={85}
                      paddingAngle={4}
                      dataKey="value"
                    >
                      {marketingDonut.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip formatter={(value) => [`${value}%`, 'Share']} />
                  </PieChart>
                </ResponsiveContainer>
              </div>

              <div className="md:col-span-7 space-y-3">
                <h4 className="text-sm font-bold text-white">Marketing Channel Allocation & Strategy</h4>
                <div className="space-y-2 text-xs">
                  {marketingDonut.map((item, idx) => (
                    <div key={idx} className="flex justify-between items-center p-2 rounded-xl bg-slate-900 border border-slate-800">
                      <span className="flex items-center gap-2">
                        <span className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }} />
                        <span className="text-slate-300 font-medium">{item.name}</span>
                      </span>
                      <span className="font-bold text-white">{item.value}%</span>
                    </div>
                  ))}
                </div>
                <p className="text-[11px] text-slate-400 mt-2">
                  *Synchronized with Kharif (May-Jun) and Rabi (Oct-Nov) sowing calendar campaigns.
                </p>
              </div>
            </div>
          )}

          {/* SLIDE 11: Financials Table */}
          {slide.id === 11 && (
            <div className="space-y-6">
              <div className="overflow-x-auto rounded-2xl border border-slate-800">
                <table className="w-full text-left text-xs">
                  <thead className="bg-slate-900 text-slate-400 font-bold uppercase tracking-wider text-[10px]">
                    <tr>
                      <th className="p-3">Metric (₹ Lakhs)</th>
                      <th className="p-3">Year 1 (Pilot)</th>
                      <th className="p-3">Year 2 (Expansion)</th>
                      <th className="p-3 text-harvest-400">Year 3 (Scale)</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-800 bg-slate-950 text-slate-300">
                    <tr>
                      <td className="p-3 font-semibold text-white">Cumulative Farmers</td>
                      <td className="p-3">500</td>
                      <td className="p-3">2,000</td>
                      <td className="p-3 font-bold text-limeaccent">5,000+</td>
                    </tr>
                    <tr>
                      <td className="p-3 font-semibold text-white">Cumulative Investors</td>
                      <td className="p-3">1,000</td>
                      <td className="p-3">6,000</td>
                      <td className="p-3 font-bold text-limeaccent">15,000</td>
                    </tr>
                    <tr>
                      <td className="p-3 font-semibold text-white">Capital Funded</td>
                      <td className="p-3">₹3.0 Cr</td>
                      <td className="p-3">₹15.0 Cr</td>
                      <td className="p-3 font-bold text-harvest-400">₹40.0 Cr</td>
                    </tr>
                    <tr>
                      <td className="p-3 font-semibold text-white">Total Revenue</td>
                      <td className="p-3">₹14.0 L</td>
                      <td className="p-3">₹73.0 L</td>
                      <td className="p-3 font-bold text-white">₹206.0 L</td>
                    </tr>
                    <tr>
                      <td className="p-3 font-semibold text-white">Operating Result (EBITDA)</td>
                      <td className="p-3 text-rose-400">≈ -₹54 L</td>
                      <td className="p-3 text-rose-400">≈ -₹62 L</td>
                      <td className="p-3 text-emerald-400 font-bold">≈ Break-Even</td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
                <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 space-y-1">
                  <span className="font-bold text-harvest-400 uppercase tracking-wider text-[10px]">Use of Seed Funds (₹2.5 Cr)</span>
                  <p className="text-slate-300">Tech & Cloud: 30% • Field Agent Ops: 25% • Marketing: 20% • Insurance & Legal: 10% • Working Capital: 15%</p>
                </div>
                <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 space-y-1">
                  <span className="font-bold text-limeaccent uppercase tracking-wider text-[10px]">Indicative Equity Structure</span>
                  <p className="text-slate-300">Founders & Core Team: 70% • Seed Investors: 20% • ESOP Pool: 10%</p>
                </div>
              </div>
            </div>
          )}

          {/* SLIDE 12: Team Structure */}
          {slide.id === 12 && (
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {[
                { role: 'Founder & CEO', desc: '10+ yrs Agri-fintech & rural supply chain leadership.' },
                { role: 'Co-Founder & CTO', desc: 'Former Lead Architect at tier-1 FinTech; escrow & geo-spatial.' },
                { role: 'Chief Operating Officer', desc: 'Ex-VP Mandi operations & farmer producer aggregation.' },
                { role: 'Chief Financial Officer', desc: 'Chartered Accountant; expert in structured agricultural debt.' },
                { role: 'Chief Risk & Insurance Officer', desc: 'Ex-Agricultural Insurance Company of India (AIC).' },
                { role: 'Head of Field Operations', desc: '15+ yrs network with 40+ Maharashtra FPOs.' },
              ].map((member, idx) => (
                <div key={idx} className="p-4 rounded-2card bg-slate-900 border border-slate-800 space-y-1.5">
                  <h4 className="font-bold text-sm text-harvest-400">{member.role}</h4>
                  <p className="text-xs text-slate-300 leading-relaxed">{member.desc}</p>
                </div>
              ))}
            </div>
          )}

          {/* SLIDE 13: Risk & Mitigation */}
          {slide.id === 13 && (
            <div className="space-y-3">
              {[
                { risk: 'Severe Climate & Biological Crop Failure', mitigation: 'PMFBY yield cover + mandatory 60% investor capital disaster pool funded by platform mutual fee.' },
                { risk: 'Farmer Side-Selling of Harvest', mitigation: 'NDVI harvest detection + platform arranged cold transport + direct B2B corporate buyer collection.' },
                { risk: 'Regulatory Clarifications on Profit Sharing', mitigation: 'Structured strictly under Model Contract Farming Act and regulated partner bank nodal escrow (no collective investment scheme).' },
                { risk: 'Farmer Digital Literacy Gap', mitigation: 'Hyperlocal vernacular UI + district village field agent network providing door-step validation.' },
              ].map((item, idx) => (
                <div key={idx} className="p-3.5 rounded-xl bg-slate-900 border border-slate-800 flex flex-col sm:flex-row justify-between sm:items-center gap-2 text-xs">
                  <div className="font-bold text-rose-400 sm:w-1/3 flex items-center gap-2">
                    <AlertCircle className="w-4 h-4 shrink-0" />
                    <span>{item.risk}</span>
                  </div>
                  <div className="text-slate-300 sm:w-2/3">
                    <strong>Mitigation:</strong> {item.mitigation}
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* SLIDE 14: The Ask & Vision */}
          {slide.id === 14 && (
            <div className="text-center space-y-6 max-w-2xl mx-auto">
              <div className="w-16 h-16 rounded-full bg-harvest-500/20 text-harvest-400 flex items-center justify-center mx-auto">
                <Target className="w-8 h-8" />
              </div>
              <h2 className="text-3xl font-extrabold text-white">
                The Seed Ask: ₹2.50 Crore
              </h2>
              <p className="text-sm text-slate-300 leading-relaxed">
                To launch the Nashik/Ahmednagar 500-farmer pilot, operationalize ICICI Nodal Escrow, and build the verified digital bridge powering India's agriculture.
              </p>

              <div className="p-6 rounded-2card bg-forest-950 border border-forest-800 text-left space-y-3">
                <h4 className="font-bold text-sm text-white">Contact Founders & Investment Desk:</h4>
                <div className="text-xs text-slate-300 space-y-1">
                  <p>Bharat Agri-Financial Services Pvt. Ltd. (FasalSanjha)</p>
                  <p>Email: <strong className="text-white">founders@fasalsanjha.com</strong></p>
                  <p>Phone: <strong className="text-white">+91 98220 00000</strong> • Office: Wagle Estate, Thane & Nashik</p>
                </div>
              </div>

              <div className="pt-2">
                <Link
                  to="/"
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-forest-800 hover:bg-forest-700 text-white font-bold text-xs shadow-md transition-all"
                >
                  <span>Explore Live Product Demo</span>
                  <ArrowUpRight className="w-4 h-4 text-harvest-400" />
                </Link>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Mandatory Presentation Disclaimer Footer */}
      <div className="bg-slate-900 border-t border-slate-800 px-6 py-2.5 text-center text-[11px] text-slate-500 z-20">
        Proposed venture — pre-launch. Figures are indicative planning projections, not audited. Returns are yield-linked.
      </div>
    </div>
  );
};
