import React, { useState, useMemo } from 'react';
import { 
  Search, 
  Filter, 
  MapPin, 
  ShieldCheck, 
  TrendingUp, 
  Sparkles, 
  Calendar, 
  DollarSign, 
  Award,
  Layers,
  CheckCircle2
} from 'lucide-react';
import { useAppStore } from '../store/useAppStore';
import { RiskBadge } from '../components/common/RiskBadge';
import { LandShieldBadge } from '../components/common/LandShieldBadge';
import { AgreementModal } from '../components/invest/AgreementModal';
import { CropListing, RiskGrade } from '../types';

export const Invest: React.FC = () => {
  const { cropListings } = useAppStore();

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedGrade, setSelectedGrade] = useState<string>('all');
  const [selectedDistrict, setSelectedDistrict] = useState<string>('all');
  const [selectedCrop, setSelectedCrop] = useState<string>('all');
  
  const [selectedListingForInvest, setSelectedListingForInvest] = useState<CropListing | null>(null);
  const [investAmount, setInvestAmount] = useState<number>(25000);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Extract unique districts and crops
  const districts = useMemo(() => Array.from(new Set(cropListings.map(c => c.district))), [cropListings]);
  const crops = useMemo(() => Array.from(new Set(cropListings.map(c => c.cropName))), [cropListings]);

  // Filtering
  const filteredListings = useMemo(() => {
    return cropListings.filter(item => {
      const matchesSearch = item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                            item.farmerName.toLowerCase().includes(searchQuery.toLowerCase()) ||
                            item.cropName.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesGrade = selectedGrade === 'all' || item.riskGrade === selectedGrade;
      const matchesDistrict = selectedDistrict === 'all' || item.district === selectedDistrict;
      const matchesCrop = selectedCrop === 'all' || item.cropName === selectedCrop;
      return matchesSearch && matchesGrade && matchesDistrict && matchesCrop;
    });
  }, [cropListings, searchQuery, selectedGrade, selectedDistrict, selectedCrop]);

  const handleInvestClick = (listing: CropListing) => {
    setSelectedListingForInvest(listing);
    setInvestAmount(Math.min(25000, listing.fundingRequired - listing.fundedAmount || 10000));
    setIsModalOpen(true);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-forest-900 to-forest-800 text-white rounded-2card p-6 md:p-8 shadow-elevated flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
        <div className="space-y-2 max-w-2xl">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-harvest-500/20 text-harvest-300 text-xs font-bold border border-harvest-400/30">
            <TrendingUp className="w-3.5 h-3.5" />
            Direct Agri-Asset Crowdsourced Marketplace
          </div>
          <h1 className="text-2xl md:text-3xl font-extrabold tracking-tight">
            Invest in Verified Crop Cycles
          </h1>
          <p className="text-xs md:text-sm text-slate-200 leading-relaxed">
            Fund verified Maharashtra farmers directly through tripartite equity agreements and milestone escrow releases. Target 12–20% annualized yield with dual insurance.
          </p>
        </div>

        <div className="bg-forest-950/80 p-4 rounded-2xl border border-white/10 shrink-0 text-right space-y-1">
          <span className="text-[11px] text-slate-400 uppercase font-bold tracking-wider">Available Crops</span>
          <p className="text-2xl font-extrabold text-limeaccent">{cropListings.length} Listings</p>
          <span className="text-[10px] text-slate-300 block">All 7/12 & Soil Audited ✓</span>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-white rounded-2card p-4 md:p-5 shadow-soft border border-slate-200 space-y-3">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          {/* Search Box */}
          <div className="relative">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-3.5" />
            <input
              type="text"
              placeholder="Search by crop, farmer, location..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-3 py-2.5 rounded-xl border border-slate-200 bg-slate-50 text-xs font-semibold focus:ring-2 focus:ring-forest-800 outline-none"
            />
          </div>

          {/* Risk Grade Filter */}
          <div>
            <select
              value={selectedGrade}
              onChange={(e) => setSelectedGrade(e.target.value)}
              className="w-full py-2.5 px-3 rounded-xl border border-slate-200 bg-slate-50 text-xs font-semibold focus:ring-2 focus:ring-forest-800 outline-none"
            >
              <option value="all">All Risk Grades (A, B, C)</option>
              <option value="A">Grade A (Staple Grains / Low Risk)</option>
              <option value="B">Grade B (Cash Crops / Moderate)</option>
              <option value="C">Grade C (Horticulture / High Yield)</option>
            </select>
          </div>

          {/* District Filter */}
          <div>
            <select
              value={selectedDistrict}
              onChange={(e) => setSelectedDistrict(e.target.value)}
              className="w-full py-2.5 px-3 rounded-xl border border-slate-200 bg-slate-50 text-xs font-semibold focus:ring-2 focus:ring-forest-800 outline-none"
            >
              <option value="all">All Districts (Maharashtra)</option>
              {districts.map(d => (
                <option key={d} value={d}>{d}</option>
              ))}
            </select>
          </div>

          {/* Crop Filter */}
          <div>
            <select
              value={selectedCrop}
              onChange={(e) => setSelectedCrop(e.target.value)}
              className="w-full py-2.5 px-3 rounded-xl border border-slate-200 bg-slate-50 text-xs font-semibold focus:ring-2 focus:ring-forest-800 outline-none"
            >
              <option value="all">All Crop Types</option>
              {crops.map(c => (
                <option key={c} value={c}>{c}</option>
              ))}
            </select>
          </div>
        </div>

        {/* Quick Filter Reset and Active Count */}
        <div className="flex justify-between items-center text-xs text-slate-500 pt-1">
          <span>Showing <strong>{filteredListings.length}</strong> of {cropListings.length} matching cycles</span>
          {(selectedGrade !== 'all' || selectedDistrict !== 'all' || selectedCrop !== 'all' || searchQuery) && (
            <button
              onClick={() => {
                setSelectedGrade('all');
                setSelectedDistrict('all');
                setSelectedCrop('all');
                setSearchQuery('');
              }}
              className="text-forest-800 font-bold hover:underline"
            >
              Reset Filters
            </button>
          )}
        </div>
      </div>

      {/* Crop Listings Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredListings.map((listing) => {
          const fundedPct = Math.round((listing.fundedAmount / listing.fundingRequired) * 100);
          const isFullyFunded = fundedPct >= 100;

          return (
            <div
              key={listing.id}
              className="bg-white rounded-2card overflow-hidden border border-slate-200 shadow-soft hover:shadow-elevated transition-all flex flex-col justify-between"
            >
              <div>
                {/* Photo & Risk Badge */}
                <div className="relative h-48 w-full bg-slate-100">
                  <img
                    src={listing.photos[0]}
                    alt={listing.title}
                    className="w-full h-full object-cover"
                    loading="lazy"
                  />
                  <div className="absolute top-3 left-3">
                    <RiskBadge grade={listing.riskGrade} />
                  </div>
                  <div className="absolute top-3 right-3 bg-white/95 backdrop-blur-md px-2.5 py-0.5 rounded-full text-[11px] font-bold text-forest-900 shadow-sm">
                    {listing.tenureMonths} Months
                  </div>
                </div>

                {/* Details */}
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
                      Farmer: <strong>{listing.farmerName}</strong> • {listing.landAreaAcres} Acres ({listing.soilType})
                    </p>
                  </div>

                  {/* Funding Bar */}
                  <div className="space-y-1">
                    <div className="flex justify-between text-xs font-semibold">
                      <span className="text-slate-500">Funded ({fundedPct}%)</span>
                      <span className="text-forest-950 font-bold">
                        ₹{listing.fundedAmount.toLocaleString('en-IN')} / ₹{listing.fundingRequired.toLocaleString('en-IN')}
                      </span>
                    </div>
                    <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
                      <div
                        className={`h-full rounded-full ${isFullyFunded ? 'bg-emerald-600' : 'bg-forest-800'}`}
                        style={{ width: `${Math.min(100, fundedPct)}%` }}
                      />
                    </div>
                  </div>

                  {/* Financial Metrics Strip */}
                  <div className="grid grid-cols-2 gap-2 pt-2 border-t border-slate-100 text-xs">
                    <div>
                      <span className="text-[10px] text-slate-400">Proposed Profit-Share</span>
                      <p className="font-bold text-forest-900">{listing.proposedProfitSharePercent}% to Investor</p>
                    </div>
                    <div>
                      <span className="text-[10px] text-slate-400">Expected Annual IRR</span>
                      <p className="font-bold text-emerald-700">~{listing.expectedReturnPercent}%</p>
                    </div>
                  </div>

                  {/* Trust Chips */}
                  <div className="flex items-center justify-between pt-1 text-[11px] text-slate-500">
                    <span className="flex items-center gap-1 text-emerald-700 font-semibold">
                      <ShieldCheck className="w-3.5 h-3.5" /> Dual Insured ✓
                    </span>
                    <span className="text-slate-400">
                      {listing.investorsCount} Co-investors
                    </span>
                  </div>
                </div>
              </div>

              {/* Bottom Actions */}
              <div className="p-5 pt-0">
                <button
                  disabled={isFullyFunded}
                  onClick={() => handleInvestClick(listing)}
                  className={`w-full py-2.5 rounded-xl font-bold text-xs shadow-md transition-colors ${
                    isFullyFunded
                      ? 'bg-slate-100 text-slate-400 cursor-not-allowed'
                      : 'bg-forest-900 hover:bg-forest-800 text-white'
                  }`}
                >
                  {isFullyFunded ? 'Fully Funded ✓' : 'Invest via Escrow (min ₹5,000)'}
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* Tripartite Agreement & Escrow Modal */}
      {selectedListingForInvest && (
        <AgreementModal
          listing={selectedListingForInvest}
          investmentAmount={investAmount}
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          onSuccess={() => setIsModalOpen(false)}
        />
      )}
    </div>
  );
};
