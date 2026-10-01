import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Sparkles, MapPin, Calendar, PackageCheck, Truck, ShieldCheck, CheckCircle2, Phone, Star, Send } from 'lucide-react';
import { useAppStore } from '../../store/useAppStore';
import { MatchResult } from '../../types';

export const RequirementForm: React.FC = () => {
  const navigate = useNavigate();
  const { addRequirement } = useAppStore();

  const [formData, setFormData] = useState({
    needType: 'Commodity Purchase (B2B)',
    cropOrItem: 'Wheat',
    quantity: '10 Tonnes',
    qualityGrade: 'Grade A (Sharbati Durum)',
    location: 'Wagle Estate, Thane',
    requiredBy: '2026-10-15',
    budget: '₹2,80,000 - ₹2,95,000',
    deliveryNeeded: true,
  });

  const [isMatching, setIsMatching] = useState(false);
  const [matchingStep, setMatchingStep] = useState(0);
  const [matchedResults, setMatchedResults] = useState<MatchResult[] | null>(null);
  const [selectedMatch, setSelectedMatch] = useState<MatchResult | null>(null);
  const [quoteMessage, setQuoteMessage] = useState('');
  const [quoteSent, setQuoteSent] = useState(false);

  const stepsText = [
    'Parsing requirement specifications & ISO quality grade...',
    'Scanning geo-radius across Nashik, Ahmednagar & Solapur clusters...',
    'Verifying 7/12 land titles & WDRA warehouse stock reserves...',
    'Optimizing transit freight via Sahyadri Cold & Cargo network...',
    'Match completed! 5 verified agricultural partners surfaced.'
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsMatching(true);
    setMatchingStep(0);

    const interval = setInterval(() => {
      setMatchingStep((prev) => {
        if (prev < stepsText.length - 1) {
          return prev + 1;
        } else {
          clearInterval(interval);
          const req = addRequirement(formData);
          setMatchedResults(req.matches);
          setIsMatching(false);
          return prev;
        }
      });
    }, 600);
  };

  const handleSendQuote = (e: React.FormEvent) => {
    e.preventDefault();
    setQuoteSent(true);
    setTimeout(() => {
      setQuoteSent(false);
      setSelectedMatch(null);
      setQuoteMessage('');
      alert('Inquiry and formal quotation dispatched via Escrow Nodal channel!');
    }, 1000);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-forest-900 via-forest-800 to-forest-700 text-white rounded-2card p-6 md:p-8 shadow-elevated relative overflow-hidden">
        <div className="relative z-10 max-w-2xl">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-harvest-500/20 text-harvest-300 text-xs font-bold border border-harvest-400/30 mb-3">
            <Sparkles className="w-3.5 h-3.5" />
            AI-Powered Multi-Role Matchmaking Engine
          </div>
          <h1 className="text-2xl md:text-3xl font-extrabold tracking-tight">
            Post Your Requirement
          </h1>
          <p className="text-xs md:text-sm text-slate-200 mt-2 leading-relaxed">
            Whether you need 10 tonnes of wheat, cold storage space, harvest labour, or tractor rental — submit once. FasalSanjha instantly matches verified farmers, processors, logistics, and warehouses.
          </p>
        </div>
        <div className="absolute right-0 top-0 bottom-0 w-1/3 opacity-15 hidden md:block">
          <svg viewBox="0 0 200 200" fill="none" className="w-full h-full">
            <circle cx="100" cy="100" r="80" stroke="#F5A623" strokeWidth="6" strokeDasharray="10 15" />
            <circle cx="100" cy="100" r="50" stroke="#8CC63F" strokeWidth="4" />
          </svg>
        </div>
      </div>

      {!matchedResults && !isMatching && (
        <form onSubmit={handleSubmit} className="bg-white rounded-2card p-6 md:p-8 shadow-soft border border-slate-200 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {/* Need Type */}
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1.5">
                Category of Need
              </label>
              <select
                value={formData.needType}
                onChange={(e) => setFormData({ ...formData, needType: e.target.value })}
                className="w-full p-3 rounded-xl border border-slate-200 bg-slate-50 text-xs font-semibold focus:ring-2 focus:ring-forest-800 outline-none"
              >
                <option>Commodity Purchase (B2B)</option>
                <option>Agri-Inputs (Seeds / Bio-Fertilizers)</option>
                <option>Farm Machinery / Drone Rental</option>
                <option>WDRA Cold Storage / Silo Space</option>
                <option>Farm-to-Mandi Refrigerated Logistics</option>
                <option>Land-Labour Sharing Partnership</option>
              </select>
            </div>

            {/* Crop or Item */}
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1.5">
                Crop or Item Name
              </label>
              <input
                type="text"
                value={formData.cropOrItem}
                onChange={(e) => setFormData({ ...formData, cropOrItem: e.target.value })}
                className="w-full p-3 rounded-xl border border-slate-200 bg-slate-50 text-xs font-semibold focus:ring-2 focus:ring-forest-800 outline-none"
                placeholder="e.g. Wheat, Red Onion, Soybean"
                required
              />
            </div>

            {/* Quantity */}
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1.5">
                Quantity Required
              </label>
              <input
                type="text"
                value={formData.quantity}
                onChange={(e) => setFormData({ ...formData, quantity: e.target.value })}
                className="w-full p-3 rounded-xl border border-slate-200 bg-slate-50 text-xs font-semibold focus:ring-2 focus:ring-forest-800 outline-none"
                placeholder="e.g. 10 Tonnes, 50 Quintals"
                required
              />
            </div>

            {/* Quality Grade */}
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1.5">
                Quality / Variety Specification
              </label>
              <input
                type="text"
                value={formData.qualityGrade}
                onChange={(e) => setFormData({ ...formData, qualityGrade: e.target.value })}
                className="w-full p-3 rounded-xl border border-slate-200 bg-slate-50 text-xs font-semibold focus:ring-2 focus:ring-forest-800 outline-none"
                placeholder="e.g. Grade A (Sharbati Durum), 50-60mm Onion"
                required
              />
            </div>

            {/* Location */}
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1.5">
                Destination / Delivery Location
              </label>
              <div className="relative">
                <MapPin className="w-4 h-4 text-forest-700 absolute left-3 top-3.5" />
                <input
                  type="text"
                  value={formData.location}
                  onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                  className="w-full pl-9 p-3 rounded-xl border border-slate-200 bg-slate-50 text-xs font-semibold focus:ring-2 focus:ring-forest-800 outline-none"
                  placeholder="e.g. Wagle Estate, Thane"
                  required
                />
              </div>
            </div>

            {/* Required By Date */}
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1.5">
                Required By (Date)
              </label>
              <div className="relative">
                <Calendar className="w-4 h-4 text-forest-700 absolute left-3 top-3.5" />
                <input
                  type="date"
                  value={formData.requiredBy}
                  onChange={(e) => setFormData({ ...formData, requiredBy: e.target.value })}
                  className="w-full pl-9 p-3 rounded-xl border border-slate-200 bg-slate-50 text-xs font-semibold focus:ring-2 focus:ring-forest-800 outline-none"
                  required
                />
              </div>
            </div>

            {/* Budget */}
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1.5">
                Indicative Budget / Target Rate
              </label>
              <input
                type="text"
                value={formData.budget}
                onChange={(e) => setFormData({ ...formData, budget: e.target.value })}
                className="w-full p-3 rounded-xl border border-slate-200 bg-slate-50 text-xs font-semibold focus:ring-2 focus:ring-forest-800 outline-none"
                placeholder="e.g. ₹2,80,000 - ₹2,95,000"
              />
            </div>

            {/* Delivery Needed Toggle */}
            <div className="flex items-center gap-3 pt-6">
              <label className="flex items-center gap-2.5 cursor-pointer text-xs font-bold text-slate-800">
                <input
                  type="checkbox"
                  checked={formData.deliveryNeeded}
                  onChange={(e) => setFormData({ ...formData, deliveryNeeded: e.target.checked })}
                  className="w-4 h-4 rounded text-forest-800 focus:ring-forest-700"
                />
                <span className="flex items-center gap-1.5">
                  <Truck className="w-4 h-4 text-forest-700" />
                  Farm-to-Doorstep Delivery Required
                </span>
              </label>
            </div>
          </div>

          <div className="pt-4 border-t border-slate-100 flex flex-col sm:flex-row justify-between items-center gap-4">
            <span className="text-[11px] text-slate-400">
              *Instant matchmaking connects directly with verified suppliers in 5 districts.
            </span>
            <button
              type="submit"
              className="w-full sm:w-auto px-8 py-3.5 rounded-xl bg-forest-900 hover:bg-forest-800 text-white font-bold text-sm shadow-md flex items-center justify-center gap-2 active:scale-95 transition-all"
            >
              <Sparkles className="w-4 h-4 text-harvest-400" />
              <span>Run Matching Engine</span>
            </button>
          </div>
        </form>
      )}

      {/* Matching Radar Animation */}
      {isMatching && (
        <div className="bg-white rounded-2card p-12 text-center shadow-soft border border-slate-200 space-y-6 animate-in fade-in">
          <div className="relative w-24 h-24 mx-auto flex items-center justify-center">
            <div className="absolute inset-0 rounded-full border-4 border-forest-200 animate-ping opacity-75" />
            <div className="absolute inset-2 rounded-full border-2 border-harvest-400 animate-spin" />
            <div className="w-16 h-16 rounded-full bg-forest-900 text-harvest-400 flex items-center justify-center shadow-md">
              <Sparkles className="w-8 h-8" />
            </div>
          </div>

          <div className="space-y-2 max-w-md mx-auto">
            <h3 className="text-base font-bold text-slate-900">
              Scanning Verified Agricultural Network...
            </h3>
            <p className="text-xs font-semibold text-forest-800 animate-pulse">
              {stepsText[matchingStep]}
            </p>
          </div>

          <div className="w-64 h-2 bg-slate-100 rounded-full mx-auto overflow-hidden">
            <div 
              className="h-full bg-forest-800 transition-all duration-300"
              style={{ width: `${((matchingStep + 1) / stepsText.length) * 100}%` }}
            />
          </div>
        </div>
      )}

      {/* Matched Results View */}
      {matchedResults && !isMatching && (
        <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-300">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2">
            <div>
              <h2 className="text-xl font-extrabold text-slate-900 flex items-center gap-2">
                <span>Top Matches for:</span>
                <span className="text-forest-900 underline decoration-harvest-500">
                  {formData.quantity} {formData.cropOrItem}
                </span>
              </h2>
              <p className="text-xs text-slate-500">
                Ranked by proximity, quality certification & pricing compatibility.
              </p>
            </div>
            <button
              onClick={() => setMatchedResults(null)}
              className="text-xs font-bold text-forest-800 hover:underline"
            >
              ← Edit Requirement
            </button>
          </div>

          {/* Cards of Matched Roles */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {matchedResults.map((match) => (
              <div 
                key={match.id}
                className="bg-white rounded-2card p-5 border border-slate-200 shadow-soft hover:shadow-elevated transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="flex justify-between items-start gap-2 mb-2">
                    <span className="px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-forest-100 text-forest-900 border border-forest-200">
                      {match.type}
                    </span>
                    <span className="px-2.5 py-0.5 rounded-full text-xs font-extrabold bg-emerald-100 text-emerald-800">
                      {match.matchPercent}% Match
                    </span>
                  </div>

                  <h3 className="font-extrabold text-sm text-slate-900">{match.name}</h3>
                  <p className="text-xs text-slate-500 flex items-center gap-1 mt-0.5">
                    <MapPin className="w-3.5 h-3.5 text-slate-400" />
                    {match.location}
                  </p>

                  <div className="mt-3 p-2.5 rounded-xl bg-slate-50 border border-slate-100 flex justify-between items-center text-xs">
                    <span className="text-slate-600">Offered / Quote Rate:</span>
                    <span className="font-extrabold text-forest-950">{match.rate}</span>
                  </div>

                  <div className="mt-2 flex items-center justify-between text-[11px] text-slate-500">
                    <span className="flex items-center gap-1 text-emerald-700 font-semibold">
                      <ShieldCheck className="w-3.5 h-3.5" /> 7/12 & Escrow Verified
                    </span>
                    <span className="flex items-center gap-1 text-amber-600 font-bold">
                      <Star className="w-3 h-3 fill-amber-500 text-amber-500" /> {match.rating}
                    </span>
                  </div>
                </div>

                <div className="mt-4 pt-3 border-t border-slate-100 flex gap-2">
                  <a
                    href={`tel:${match.phone}`}
                    className="flex-1 py-2 rounded-xl border border-slate-200 text-slate-700 hover:bg-slate-50 font-bold text-xs flex items-center justify-center gap-1"
                  >
                    <Phone className="w-3.5 h-3.5" />
                    <span>Call</span>
                  </a>
                  <button
                    onClick={() => setSelectedMatch(match)}
                    className="flex-1 py-2 rounded-xl bg-forest-900 hover:bg-forest-800 text-white font-bold text-xs flex items-center justify-center gap-1 shadow-sm"
                  >
                    <Send className="w-3.5 h-3.5 text-harvest-400" />
                    <span>Send Quote</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Send Quote Modal */}
      {selectedMatch && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-in fade-in">
          <div className="bg-white rounded-2card p-6 max-w-md w-full shadow-2xl border border-slate-200 space-y-4">
            <h3 className="font-bold text-base text-slate-900">
              Send Official RFQ to {selectedMatch.name}
            </h3>
            <p className="text-xs text-slate-500">
              For requirement: {formData.quantity} {formData.cropOrItem} to {formData.location}.
            </p>

            <form onSubmit={handleSendQuote} className="space-y-3">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Your Message & Specs:</label>
                <textarea
                  rows={3}
                  value={quoteMessage}
                  onChange={(e) => setQuoteMessage(e.target.value)}
                  placeholder="e.g. Please confirm delivery timeline and moisture test report before loading."
                  className="w-full p-2.5 rounded-xl border border-slate-300 text-xs outline-none focus:ring-2 focus:ring-forest-800"
                  required
                />
              </div>

              <div className="p-2.5 rounded-xl bg-forest-50 border border-forest-100 text-[11px] text-forest-900 space-y-1">
                <p><strong>Nodal Escrow Guarantee:</strong> Payment will only be transferred to seller after weighment slip and quality inspection approval.</p>
              </div>

              <div className="flex justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setSelectedMatch(null)}
                  className="px-4 py-2 text-xs font-semibold text-slate-600"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={quoteSent}
                  className="px-5 py-2 rounded-xl bg-forest-900 text-white font-bold text-xs shadow-md"
                >
                  {quoteSent ? 'Dispatched ✓' : 'Dispatch via Escrow'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
