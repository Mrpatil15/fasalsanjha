import React, { useState, useMemo } from 'react';
import { Calculator, TrendingUp, ShieldCheck, HelpCircle, ArrowUpRight, BarChart3, RefreshCw } from 'lucide-react';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  Tooltip, 
  ResponsiveContainer, 
  Legend, 
  Cell 
} from 'recharts';
import { RiskGrade } from '../../types';
import { RiskBadge } from '../common/RiskBadge';
import { LandShieldBadge } from '../common/LandShieldBadge';

interface CropPreset {
  name: string;
  grade: RiskGrade;
  defaultAreaAcres: number;
  defaultCapital: number;
  expectedYieldPerAcreQuintal: number;
  expectedPricePerQuintal: number;
  investorSharePercent: number;
  cycleMonths: number;
}

const CROP_PRESETS: Record<string, CropPreset> = {
  onion: {
    name: 'Nashik Garva Red Onion',
    grade: 'B',
    defaultAreaAcres: 3,
    defaultCapital: 75000,
    expectedYieldPerAcreQuintal: 65,
    expectedPricePerQuintal: 2400,
    investorSharePercent: 35,
    cycleMonths: 4,
  },
  soybean: {
    name: 'Organic Soybean (JS-335)',
    grade: 'B',
    defaultAreaAcres: 4,
    defaultCapital: 68000,
    expectedYieldPerAcreQuintal: 10,
    expectedPricePerQuintal: 4750,
    investorSharePercent: 32,
    cycleMonths: 3.5,
  },
  wheat: {
    name: 'Sharbati Durum Wheat',
    grade: 'A',
    defaultAreaAcres: 5,
    defaultCapital: 65000,
    expectedYieldPerAcreQuintal: 22,
    expectedPricePerQuintal: 2800,
    investorSharePercent: 25,
    cycleMonths: 4,
  },
  strawberry: {
    name: 'Mahabaleshwar Strawberry',
    grade: 'C',
    defaultAreaAcres: 1.5,
    defaultCapital: 80000,
    expectedYieldPerAcreQuintal: 60,
    expectedPricePerQuintal: 4200,
    investorSharePercent: 52,
    cycleMonths: 5,
  },
  cotton: {
    name: 'Vidarbha Long Staple Cotton',
    grade: 'B',
    defaultAreaAcres: 5,
    defaultCapital: 78000,
    expectedYieldPerAcreQuintal: 9,
    expectedPricePerQuintal: 7200,
    investorSharePercent: 38,
    cycleMonths: 6,
  }
};

export const ProfitCalculator: React.FC = () => {
  const [selectedCropKey, setSelectedCropKey] = useState<string>('onion');
  const preset = CROP_PRESETS[selectedCropKey];

  const [investedCapital, setInvestedCapital] = useState<number>(preset.defaultCapital);
  const [areaAcres, setAreaAcres] = useState<number>(preset.defaultAreaAcres);
  const [yieldPerAcre, setYieldPerAcre] = useState<number>(preset.expectedYieldPerAcreQuintal);
  const [pricePerQuintal, setPricePerQuintal] = useState<number>(preset.expectedPricePerQuintal);
  const [investorSharePct, setInvestorSharePct] = useState<number>(preset.investorSharePercent);

  // When crop preset changes, update default parameters
  const handlePresetChange = (key: string) => {
    setSelectedCropKey(key);
    const newPreset = CROP_PRESETS[key];
    setInvestedCapital(newPreset.defaultCapital);
    setAreaAcres(newPreset.defaultAreaAcres);
    setYieldPerAcre(newPreset.expectedYieldPerAcreQuintal);
    setPricePerQuintal(newPreset.expectedPricePerQuintal);
    setInvestorSharePct(newPreset.investorSharePercent);
  };

  // Calculations for Scenarios: Base, Best (+20% yield, +15% price), Worst (-30% yield, -20% price)
  const calculateScenario = (yieldMultiplier: number, priceMultiplier: number) => {
    const totalYieldQuintals = areaAcres * yieldPerAcre * yieldMultiplier;
    const finalPrice = pricePerQuintal * priceMultiplier;
    const grossProduceRevenue = totalYieldQuintals * finalPrice;

    // Platform fee: 2.5% of gross
    const platformFee = grossProduceRevenue * 0.025;

    // Dual insurance contribution: 1%
    const insuranceContribution = grossProduceRevenue * 0.01;

    // Net distributable profit pool = Gross Produce - Invested Capital - Platform Fee - Insurance
    const netProfitPool = Math.max(0, grossProduceRevenue - investedCapital - platformFee - insuranceContribution);

    // Investor gets return of invested capital + their % share of net profit pool
    const rawInvestorProfit = (netProfitPool * (investorSharePct / 100));
    // Investor management fee (1% of investor profit)
    const investorMgmtFee = rawInvestorProfit * 0.01;
    const investorTotalPayout = investedCapital + rawInvestorProfit - investorMgmtFee;
    const investorNetReturnPercent = ((investorTotalPayout - investedCapital) / investedCapital) * 100;
    
    // Annualized IRR (based on cycle months)
    const annualizedIRR = (investorNetReturnPercent / preset.cycleMonths) * 12;

    // Farmer Net Payout = Remainder of Gross revenue (net profit pool * farmer % + any residual)
    const farmerTotalPayout = grossProduceRevenue - investorTotalPayout - platformFee - insuranceContribution;

    return {
      grossRevenue: Math.round(grossProduceRevenue),
      netProfitPool: Math.round(netProfitPool),
      platformFee: Math.round(platformFee),
      investorMgmtFee: Math.round(investorMgmtFee),
      insuranceContribution: Math.round(insuranceContribution),
      investorTotalPayout: Math.round(investorTotalPayout),
      investorNetProfit: Math.round(investorTotalPayout - investedCapital),
      investorReturnPercent: Math.round(investorNetReturnPercent * 10) / 10,
      annualizedIRR: Math.round(annualizedIRR * 10) / 10,
      farmerTotalPayout: Math.round(farmerTotalPayout),
    };
  };

  const baseScenario = useMemo(() => calculateScenario(1.0, 1.0), [areaAcres, yieldPerAcre, pricePerQuintal, investedCapital, investorSharePct, preset.cycleMonths]);
  const bestScenario = useMemo(() => calculateScenario(1.2, 1.15), [areaAcres, yieldPerAcre, pricePerQuintal, investedCapital, investorSharePct, preset.cycleMonths]);
  const worstScenario = useMemo(() => calculateScenario(0.7, 0.8), [areaAcres, yieldPerAcre, pricePerQuintal, investedCapital, investorSharePct, preset.cycleMonths]);

  // Chart data for scenario comparison
  const chartData = [
    {
      name: 'Worst Case (-30% Yield)',
      InvestorPayout: worstScenario.investorTotalPayout,
      FarmerPayout: worstScenario.farmerTotalPayout,
      Gross: worstScenario.grossRevenue,
    },
    {
      name: 'Base Case (Expected)',
      InvestorPayout: baseScenario.investorTotalPayout,
      FarmerPayout: baseScenario.farmerTotalPayout,
      Gross: baseScenario.grossRevenue,
    },
    {
      name: 'Best Case (+20% Yield)',
      InvestorPayout: bestScenario.investorTotalPayout,
      FarmerPayout: bestScenario.farmerTotalPayout,
      Gross: bestScenario.grossRevenue,
    },
  ];

  return (
    <div className="bg-white rounded-2card shadow-elevated border border-slate-200 p-6 md:p-8 space-y-8">
      {/* Title & Presets Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 pb-6 border-b border-slate-200">
        <div>
          <div className="flex items-center gap-2">
            <div className="p-2 rounded-xl bg-forest-100 text-forest-800">
              <Calculator className="w-6 h-6" />
            </div>
            <h2 className="text-xl md:text-2xl font-extrabold text-forest-950">
              Interactive Profit-Share Calculator
            </h2>
          </div>
          <p className="text-xs text-slate-500 mt-1">
            Simulate realistic yield scenarios, investor returns, farmer surplus, and fee splits.
          </p>
        </div>

        {/* Preset Selector */}
        <div className="flex items-center gap-2 overflow-x-auto w-full md:w-auto pb-1">
          {Object.entries(CROP_PRESETS).map(([key, item]) => (
            <button
              key={key}
              onClick={() => handlePresetChange(key)}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold shrink-0 transition-all ${
                selectedCropKey === key
                  ? 'bg-forest-900 text-white shadow-md'
                  : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
              }`}
            >
              {item.name.split(' ')[0]}
            </button>
          ))}
        </div>
      </div>

      {/* Main Grid: Controls on Left, Results & Charts on Right */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Controls Column (5 cols) */}
        <div className="lg:col-span-5 space-y-5 bg-slate-50/70 p-5 rounded-2xl border border-slate-200">
          <div className="flex justify-between items-center">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-600">Model Parameters</span>
            <RiskBadge grade={preset.grade} />
          </div>

          {/* Investment Amount Slider */}
          <div>
            <div className="flex justify-between text-xs font-semibold text-slate-700 mb-1">
              <span>Committed Investment Capital</span>
              <span className="text-forest-900 font-bold">₹{investedCapital.toLocaleString('en-IN')}</span>
            </div>
            <input
              type="range"
              min={10000}
              max={250000}
              step={5000}
              value={investedCapital}
              onChange={(e) => setInvestedCapital(Number(e.target.value))}
              className="w-full accent-forest-800 cursor-pointer"
            />
            <div className="flex justify-between text-[10px] text-slate-400 mt-0.5">
              <span>Min ₹10,000</span>
              <span>₹2.5 Lakh</span>
            </div>
          </div>

          {/* Land Area */}
          <div>
            <div className="flex justify-between text-xs font-semibold text-slate-700 mb-1">
              <span>Cultivated Land Area</span>
              <span className="text-forest-900 font-bold">{areaAcres} Acres</span>
            </div>
            <input
              type="range"
              min={0.5}
              max={15}
              step={0.5}
              value={areaAcres}
              onChange={(e) => setAreaAcres(Number(e.target.value))}
              className="w-full accent-forest-800 cursor-pointer"
            />
          </div>

          {/* Expected Yield Per Acre */}
          <div>
            <div className="flex justify-between text-xs font-semibold text-slate-700 mb-1">
              <span>Expected Yield per Acre</span>
              <span className="text-forest-900 font-bold">{yieldPerAcre} Quintals</span>
            </div>
            <input
              type="range"
              min={5}
              max={150}
              step={5}
              value={yieldPerAcre}
              onChange={(e) => setYieldPerAcre(Number(e.target.value))}
              className="w-full accent-forest-800 cursor-pointer"
            />
            <span className="text-[10px] text-slate-400">Total estimated crop: {areaAcres * yieldPerAcre} Quintals</span>
          </div>

          {/* Expected Mandi Sale Price */}
          <div>
            <div className="flex justify-between text-xs font-semibold text-slate-700 mb-1">
              <span>Expected Sale Price</span>
              <span className="text-forest-900 font-bold">₹{pricePerQuintal} / Quintal</span>
            </div>
            <input
              type="range"
              min={1000}
              max={15000}
              step={100}
              value={pricePerQuintal}
              onChange={(e) => setPricePerQuintal(Number(e.target.value))}
              className="w-full accent-forest-800 cursor-pointer"
            />
          </div>

          {/* Investor Share % */}
          <div>
            <div className="flex justify-between text-xs font-semibold text-slate-700 mb-1">
              <span>Investor Profit Share Ratio</span>
              <span className="text-forest-900 font-bold">{investorSharePct}%</span>
            </div>
            <input
              type="range"
              min={15}
              max={65}
              step={1}
              value={investorSharePct}
              onChange={(e) => setInvestorSharePct(Number(e.target.value))}
              className="w-full accent-forest-800 cursor-pointer"
            />
            <span className="text-[10px] text-slate-400">Farmer retains {100 - investorSharePct}% of net surplus</span>
          </div>

          <div className="pt-2">
            <LandShieldBadge variant="compact" className="w-full justify-center" />
          </div>
        </div>

        {/* Results & Live Visuals Column (7 cols) */}
        <div className="lg:col-span-7 space-y-6">
          {/* 3 Scenario Cards */}
          <div className="grid grid-cols-3 gap-3">
            {/* Worst Case */}
            <div className="p-3.5 rounded-2xl border border-rose-200 bg-rose-50/40 text-left">
              <span className="text-[10px] font-bold text-rose-700 uppercase tracking-wider block">Worst Case</span>
              <p className="text-sm font-extrabold text-slate-900 mt-1">₹{worstScenario.investorTotalPayout.toLocaleString('en-IN')}</p>
              <div className="text-[11px] font-semibold text-rose-800 mt-1">
                {worstScenario.investorReturnPercent > 0 ? `+${worstScenario.investorReturnPercent}%` : `${worstScenario.investorReturnPercent}%`}
              </div>
              <span className="text-[10px] text-slate-500 block mt-0.5">Insurance Triggered</span>
            </div>

            {/* Base Case (Highlighted) */}
            <div className="p-3.5 rounded-2xl border-2 border-forest-800 bg-forest-50/70 text-left shadow-sm relative">
              <div className="absolute -top-2.5 right-2 px-1.5 py-0.5 rounded-full bg-forest-900 text-harvest-400 text-[9px] font-bold">
                EXPECTED
              </div>
              <span className="text-[10px] font-bold text-forest-800 uppercase tracking-wider block">Base Case</span>
              <p className="text-base font-extrabold text-forest-950 mt-1">₹{baseScenario.investorTotalPayout.toLocaleString('en-IN')}</p>
              <div className="text-xs font-bold text-forest-800 mt-1">
                +{baseScenario.investorReturnPercent}% ({baseScenario.annualizedIRR}% IRR)
              </div>
              <span className="text-[10px] text-slate-500 block mt-0.5">Net Profit: ₹{baseScenario.investorNetProfit.toLocaleString('en-IN')}</span>
            </div>

            {/* Best Case */}
            <div className="p-3.5 rounded-2xl border border-emerald-200 bg-emerald-50/40 text-left">
              <span className="text-[10px] font-bold text-emerald-800 uppercase tracking-wider block">Best Case</span>
              <p className="text-sm font-extrabold text-slate-900 mt-1">₹{bestScenario.investorTotalPayout.toLocaleString('en-IN')}</p>
              <div className="text-[11px] font-semibold text-emerald-800 mt-1">
                +{bestScenario.investorReturnPercent}% ({bestScenario.annualizedIRR}% IRR)
              </div>
              <span className="text-[10px] text-slate-500 block mt-0.5">Peak Mandi Rates</span>
            </div>
          </div>

          {/* Recharts Scenario Comparison Bar Chart */}
          <div className="bg-slate-50/60 p-4 rounded-2xl border border-slate-200">
            <h4 className="text-xs font-bold text-slate-700 mb-3 flex items-center gap-1.5">
              <BarChart3 className="w-4 h-4 text-forest-800" />
              Scenario Payout Split (Investor vs Farmer)
            </h4>
            <div className="h-48 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={chartData} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
                  <XAxis dataKey="name" tick={{ fontSize: 10 }} />
                  <YAxis tick={{ fontSize: 10 }} tickFormatter={(val) => `₹${val/1000}k`} />
                  <Tooltip 
                    formatter={(value: any) => [`₹${Number(value).toLocaleString('en-IN')}`, 'Amount']}
                    contentStyle={{ borderRadius: '12px', fontSize: '11px' }}
                  />
                  <Legend wrapperStyle={{ fontSize: '11px', paddingTop: '6px' }} />
                  <Bar dataKey="InvestorPayout" fill="#0B4F2E" name="Investor Payout" radius={[4, 4, 0, 0]} />
                  <Bar dataKey="FarmerPayout" fill="#F5A623" name="Farmer Payout" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Waterfall Split Breakdown (Table) */}
          <div className="border border-slate-200 rounded-2xl overflow-hidden text-xs">
            <div className="bg-forest-900 text-white px-4 py-2 font-bold flex justify-between">
              <span>Base Case Settlement Waterfall</span>
              <span>Values in ₹</span>
            </div>
            <div className="divide-y divide-slate-100 bg-white">
              <div className="px-4 py-2 flex justify-between">
                <span className="text-slate-600">Gross Produce Sale (Yield × Price)</span>
                <span className="font-bold text-slate-900">₹{baseScenario.grossRevenue.toLocaleString('en-IN')}</span>
              </div>
              <div className="px-4 py-2 flex justify-between bg-slate-50/60">
                <span className="text-slate-600">Platform Sourcing & Verification Fee (2.5%)</span>
                <span className="text-rose-700 font-semibold">- ₹{baseScenario.platformFee.toLocaleString('en-IN')}</span>
              </div>
              <div className="px-4 py-2 flex justify-between">
                <span className="text-slate-600">Mutual Disaster Insurance Pool (1.0%)</span>
                <span className="text-rose-700 font-semibold">- ₹{baseScenario.insuranceContribution.toLocaleString('en-IN')}</span>
              </div>
              <div className="px-4 py-2 flex justify-between bg-forest-50/50">
                <span className="font-semibold text-forest-950">Investor Capital Return + Net Profit Share</span>
                <span className="font-bold text-forest-900">₹{baseScenario.investorTotalPayout.toLocaleString('en-IN')}</span>
              </div>
              <div className="px-4 py-2 flex justify-between bg-harvest-50/50">
                <span className="font-semibold text-harvest-950">Farmer Net Farm Payout</span>
                <span className="font-bold text-harvest-700">₹{baseScenario.farmerTotalPayout.toLocaleString('en-IN')}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
