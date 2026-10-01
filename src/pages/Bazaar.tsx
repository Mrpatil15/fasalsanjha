import React, { useState } from 'react';
import { 
  Store, 
  Sparkles, 
  Tag, 
  Truck, 
  Building2, 
  Layers, 
  MapPin, 
  Star, 
  ShieldCheck, 
  DollarSign, 
  Calendar, 
  FileText,
  MessageSquare,
  Search,
  CheckCircle2,
  X
} from 'lucide-react';
import { useAppStore } from '../store/useAppStore';
import { MarketplaceItem } from '../types';
import { LandShieldBadge } from '../components/common/LandShieldBadge';

export const Bazaar: React.FC = () => {
  const { marketplaceItems, makeOffer } = useAppStore();
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');
  
  // Negotiation Modal
  const [selectedNegotiateItem, setSelectedNegotiateItem] = useState<MarketplaceItem | null>(null);
  const [counterOfferAmount, setCounterOfferAmount] = useState<number>(0);
  const [negotiationMessage, setNegotiationMessage] = useState('');

  // Equipment Booking Modal
  const [selectedRentalItem, setSelectedRentalItem] = useState<MarketplaceItem | null>(null);
  const [rentalDays, setRentalDays] = useState(2);
  const [rentalStartDate, setRentalStartDate] = useState('2026-10-10');

  // Land Labour Agreement Modal
  const [selectedLandLabour, setSelectedLandLabour] = useState<MarketplaceItem | null>(null);

  const categories = [
    { key: 'all', label: 'All Modules' },
    { key: 'inputs', label: 'Agri-Inputs & Seeds' },
    { key: 'equipment', label: 'Equipment & Drone Rental' },
    { key: 'produce', label: 'Sell / Buy Produce' },
    { key: 'fodder', label: 'Fodder & Livestock Feed' },
    { key: 'land-labour', label: 'Land & Labour Partnerships' },
    { key: 'storage', label: 'Storage & Cold Warehouses' },
    { key: 'logistics', label: 'Farm Logistics Fleet' },
    { key: 'processing', label: 'Agro-Processing Units' },
    { key: 'trade', label: 'Global Trade (Export/Import)' },
  ];

  const filteredItems = marketplaceItems.filter(item => {
    const matchesCat = activeCategory === 'all' || item.category === activeCategory;
    const matchesSearch = item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          item.sellerName.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          item.location.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCat && matchesSearch;
  });

  const handleOpenNegotiation = (item: MarketplaceItem) => {
    setSelectedNegotiateItem(item);
    setCounterOfferAmount(Math.round(item.price * 0.9)); // 10% discount starting offer
    setNegotiationMessage('');
  };

  const handleSendOffer = (e: React.FormEvent) => {
    e.preventDefault();
    if (selectedNegotiateItem) {
      makeOffer(selectedNegotiateItem.id, counterOfferAmount, negotiationMessage || 'Counter offer sent via in-app buyer negotiation.');
      setSelectedNegotiateItem(null);
      alert('Your offer has been submitted! Seller will review and respond in Messages.');
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-forest-900 via-forest-800 to-forest-700 text-white rounded-2card p-6 md:p-8 shadow-elevated flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
        <div className="space-y-2 max-w-2xl">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-harvest-500/20 text-harvest-300 text-xs font-bold border border-harvest-400/30">
            <Store className="w-3.5 h-3.5" />
            FasalSanjha Central Bazaar & Logistics Hub
          </div>
          <h1 className="text-2xl md:text-3xl font-extrabold tracking-tight">
            The Agricultural Commerce Ecosystem
          </h1>
          <p className="text-xs md:text-sm text-slate-200 leading-relaxed">
            One transparent platform for seeds, fertilizers with price negotiation, machinery rentals, fodder for dairies, WDRA cold storage, and farm-to-gate logistics.
          </p>
        </div>

        {/* Commission Transparency Box */}
        <div className="bg-forest-950/80 p-4 rounded-2xl border border-white/10 text-xs space-y-1.5 max-w-xs shrink-0">
          <span className="font-bold text-harvest-400 uppercase tracking-wider text-[10px] block">
            Transparent Pricing Policy
          </span>
          <p className="text-[11px] text-slate-300 leading-tight">
            Marketplace commission: <strong>20% sales & advertising + 10% logistics shipping</strong> (shared equitably between buyer and seller).
          </p>
        </div>
      </div>

      {/* Category Pills & Search */}
      <div className="space-y-3">
        <div className="flex flex-col sm:flex-row justify-between gap-3">
          {/* Category Tabs */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-2 scrollbar-none w-full sm:w-auto">
            {categories.map((cat) => (
              <button
                key={cat.key}
                onClick={() => setActiveCategory(cat.key)}
                className={`px-3.5 py-2 rounded-xl text-xs font-bold shrink-0 transition-all ${
                  activeCategory === cat.key
                    ? 'bg-forest-900 text-white shadow-md'
                    : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-50'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>

          {/* Search Box */}
          <div className="relative min-w-[240px]">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
            <input
              type="text"
              placeholder="Search bazaar items..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-3 py-2 rounded-xl border border-slate-200 bg-white text-xs font-semibold focus:ring-2 focus:ring-forest-800 outline-none"
            />
          </div>
        </div>
      </div>

      {/* Marketplace Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredItems.map((item) => (
          <div
            key={item.id}
            className="bg-white rounded-2card overflow-hidden border border-slate-200 shadow-soft hover:shadow-elevated transition-all flex flex-col justify-between"
          >
            <div>
              {/* Product Image */}
              <div className="relative h-44 w-full bg-slate-100">
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-full object-cover"
                  loading="lazy"
                />
                <div className="absolute top-3 left-3 bg-forest-900/90 text-white text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider backdrop-blur-sm">
                  {item.subcategory}
                </div>
                <div className="absolute top-3 right-3 bg-white/95 px-2 py-0.5 rounded-full text-[11px] font-bold text-slate-800 flex items-center gap-1 shadow-sm">
                  <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
                  {item.sellerRating}
                </div>
              </div>

              {/* Body */}
              <div className="p-5 space-y-3">
                <div>
                  <h3 className="font-extrabold text-sm text-slate-900 leading-snug line-clamp-2">
                    {item.title}
                  </h3>
                  <p className="text-xs text-slate-500 mt-1 flex items-center gap-1">
                    <MapPin className="w-3.5 h-3.5 text-slate-400" />
                    {item.location}, {item.district}
                  </p>
                </div>

                {/* Price Display */}
                <div className="p-3 rounded-xl bg-slate-50 border border-slate-100 flex justify-between items-center text-xs">
                  <div>
                    <span className="text-[10px] text-slate-400 uppercase font-bold">Price</span>
                    <p className="font-extrabold text-forest-950 text-base">
                      {item.price === 0 ? 'Produce Profit Share' : `₹${item.price.toLocaleString('en-IN')}`}
                    </p>
                  </div>
                  <span className="text-xs text-slate-500 font-semibold">{item.unit}</span>
                </div>

                <p className="text-xs text-slate-600 leading-relaxed line-clamp-2">
                  {item.description}
                </p>

                {/* Specs Pill List */}
                {item.specs && (
                  <div className="pt-2 border-t border-slate-100 flex flex-wrap gap-1 text-[10px]">
                    {Object.entries(item.specs).map(([k, v]) => (
                      <span key={k} className="px-2 py-0.5 rounded-md bg-slate-100 text-slate-700">
                        <strong>{k}:</strong> {v}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* Action Buttons based on Category */}
            <div className="p-5 pt-0 space-y-2">
              {item.category === 'inputs' && (
                <div className="grid grid-cols-2 gap-2">
                  <button
                    onClick={() => handleOpenNegotiation(item)}
                    className="py-2 rounded-xl border border-forest-800 text-forest-900 font-bold text-xs hover:bg-forest-50 transition-colors flex items-center justify-center gap-1"
                  >
                    <Tag className="w-3.5 h-3.5" />
                    <span>Negotiate</span>
                  </button>
                  <button
                    onClick={() => alert(`Direct order initiated for ${item.title}. Escrow hold created.`)}
                    className="py-2 rounded-xl bg-forest-900 text-white font-bold text-xs hover:bg-forest-800 transition-colors"
                  >
                    Buy Now
                  </button>
                </div>
              )}

              {item.category === 'equipment' && (
                <button
                  onClick={() => setSelectedRentalItem(item)}
                  className="w-full py-2.5 rounded-xl bg-forest-900 hover:bg-forest-800 text-white font-bold text-xs shadow-sm flex items-center justify-center gap-1.5 transition-colors"
                >
                  <Calendar className="w-3.5 h-3.5 text-harvest-400" />
                  <span>Book Rental (₹{item.rentalPerDay || item.price}/day)</span>
                </button>
              )}

              {item.category === 'land-labour' && (
                <button
                  onClick={() => setSelectedLandLabour(item)}
                  className="w-full py-2.5 rounded-xl bg-forest-900 hover:bg-forest-800 text-white font-bold text-xs shadow-sm flex items-center justify-center gap-1.5 transition-colors"
                >
                  <FileText className="w-3.5 h-3.5 text-harvest-400" />
                  <span>View Sharing Agreement</span>
                </button>
              )}

              {item.category !== 'inputs' && item.category !== 'equipment' && item.category !== 'land-labour' && (
                <button
                  onClick={() => alert(`Inquiry sent to ${item.sellerName} for ${item.title}.`)}
                  className="w-full py-2 rounded-xl bg-forest-900 hover:bg-forest-800 text-white font-bold text-xs shadow-sm"
                >
                  Book / Send Inquiry
                </button>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* NEGOTIATION MODAL */}
      {selectedNegotiateItem && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-in fade-in">
          <div className="bg-white rounded-2card p-6 max-w-md w-full shadow-2xl border border-slate-200 space-y-4">
            <div className="flex justify-between items-center border-b border-slate-100 pb-3">
              <div>
                <h3 className="font-extrabold text-sm text-slate-900">In-App Price Negotiation</h3>
                <p className="text-xs text-slate-500">Seller: {selectedNegotiateItem.sellerName}</p>
              </div>
              <button onClick={() => setSelectedNegotiateItem(null)} className="p-1 text-slate-400 hover:text-slate-700">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 text-xs space-y-1">
              <p className="font-semibold text-slate-800">{selectedNegotiateItem.title}</p>
              <div className="flex justify-between">
                <span className="text-slate-500">Listed Price:</span>
                <span className="font-bold text-slate-900">₹{selectedNegotiateItem.price} ({selectedNegotiateItem.unit})</span>
              </div>
            </div>

            <form onSubmit={handleSendOffer} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Your Counter-Offer (₹ per unit):
                </label>
                <input
                  type="number"
                  value={counterOfferAmount}
                  onChange={(e) => setCounterOfferAmount(Number(e.target.value))}
                  className="w-full p-2.5 rounded-xl border border-slate-300 text-base font-bold text-forest-950 focus:ring-2 focus:ring-forest-800 outline-none"
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Message / Quantity Proposal:
                </label>
                <textarea
                  rows={2}
                  value={negotiationMessage}
                  onChange={(e) => setNegotiationMessage(e.target.value)}
                  placeholder="e.g. Willing to purchase 10 packs if priced at ₹3,500 each."
                  className="w-full p-2.5 rounded-xl border border-slate-300 text-xs focus:ring-2 focus:ring-forest-800 outline-none"
                />
              </div>

              <div className="p-2.5 rounded-xl bg-forest-50 border border-forest-100 text-[11px] text-forest-900">
                <span>Commission fee (20% sales + 10% freight) is calculated transparently upon seller acceptance.</span>
              </div>

              <div className="flex justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setSelectedNegotiateItem(null)}
                  className="px-4 py-2 text-xs font-semibold text-slate-600"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-forest-900 text-white font-bold text-xs shadow-md"
                >
                  Submit Counter-Offer
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* RENTAL BOOKING MODAL */}
      {selectedRentalItem && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-in fade-in">
          <div className="bg-white rounded-2card p-6 max-w-md w-full shadow-2xl border border-slate-200 space-y-4">
            <div className="flex justify-between items-center border-b border-slate-100 pb-3">
              <div>
                <h3 className="font-extrabold text-sm text-slate-900">Book Agricultural Equipment</h3>
                <p className="text-xs text-slate-500">{selectedRentalItem.title}</p>
              </div>
              <button onClick={() => setSelectedRentalItem(null)} className="p-1 text-slate-400 hover:text-slate-700">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-3 text-xs">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Rental Start Date:</label>
                <input
                  type="date"
                  value={rentalStartDate}
                  onChange={(e) => setRentalStartDate(e.target.value)}
                  className="w-full p-2.5 rounded-xl border border-slate-300 text-xs"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Duration (Days):</label>
                <input
                  type="number"
                  min={1}
                  max={30}
                  value={rentalDays}
                  onChange={(e) => setRentalDays(Number(e.target.value))}
                  className="w-full p-2.5 rounded-xl border border-slate-300 text-xs font-bold"
                />
              </div>

              <div className="p-3 rounded-xl bg-forest-50 border border-forest-200 space-y-1">
                <div className="flex justify-between text-slate-700">
                  <span>Per Day Rate:</span>
                  <span>₹{selectedRentalItem.rentalPerDay || selectedRentalItem.price}</span>
                </div>
                <div className="flex justify-between font-bold text-forest-950 text-sm pt-1 border-t border-forest-200">
                  <span>Total Rental Advance:</span>
                  <span>₹{((selectedRentalItem.rentalPerDay || selectedRentalItem.price) * rentalDays).toLocaleString('en-IN')}</span>
                </div>
              </div>
            </div>

            <div className="flex justify-end gap-2 pt-2">
              <button
                onClick={() => setSelectedRentalItem(null)}
                className="px-4 py-2 text-xs font-semibold text-slate-600"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  setSelectedRentalItem(null);
                  alert(`Equipment rental confirmed for ${rentalDays} days starting ${rentalStartDate}! Held in Escrow.`);
                }}
                className="px-5 py-2 rounded-xl bg-forest-900 text-white font-bold text-xs shadow-md"
              >
                Confirm Escrow Booking
              </button>
            </div>
          </div>
        </div>
      )}

      {/* LABOUR-LAND SHARING AGREEMENT MODAL */}
      {selectedLandLabour && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-in fade-in">
          <div className="bg-white rounded-2card p-6 max-w-lg w-full shadow-2xl border border-slate-200 space-y-4">
            <div className="flex justify-between items-center border-b border-slate-100 pb-3">
              <div>
                <h3 className="font-extrabold text-sm text-slate-900">Model Labour-Land Sharing Agreement</h3>
                <p className="text-xs text-slate-500">{selectedLandLabour.title}</p>
              </div>
              <button onClick={() => setSelectedLandLabour(null)} className="p-1 text-slate-400 hover:text-slate-700">
                <X className="w-5 h-5" />
              </button>
            </div>

            <LandShieldBadge variant="full" />

            <div className="space-y-2 text-xs text-slate-700 bg-slate-50 p-4 rounded-xl border border-slate-200 leading-relaxed">
              <p><strong>Standard Produce Sharing Guidelines:</strong></p>
              <ul className="list-disc pl-4 space-y-1 text-[11px] text-slate-600">
                <li><strong>Open Field Cultivation:</strong> 30–40% Labour Share</li>
                <li><strong>Kitchen Garden / Orchard:</strong> 35–45% Labour Share</li>
                <li><strong>Dome / Greenhouse:</strong> 45–55% Labour Share</li>
                <li><strong>Hi-Tech Polyhouse:</strong> 50–60% Labour Share</li>
              </ul>
              <p className="pt-1 text-[11px] text-emerald-800 font-semibold">
                *Land ownership remains 100% with the registered landowner. Facilitation fee: 2–3% of produce value.
              </p>
            </div>

            <div className="flex justify-end gap-2 pt-2">
              <button
                onClick={() => setSelectedLandLabour(null)}
                className="px-4 py-2 text-xs font-semibold text-slate-600"
              >
                Close
              </button>
              <button
                onClick={() => {
                  setSelectedLandLabour(null);
                  alert('Partnership request sent to Mr. Kulkarni and Sunita Jadhav brigade!');
                }}
                className="px-5 py-2 rounded-xl bg-forest-900 text-white font-bold text-xs shadow-md"
              >
                Send Partnership Request
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
