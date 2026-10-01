export type Role = 'farmer' | 'investor' | 'buyer' | 'labour' | 'admin';
export type Language = 'en' | 'hi' | 'mr';
export type RiskGrade = 'A' | 'B' | 'C';

export interface CropListing {
  id: string;
  title: string;
  cropName: string;
  variety: string;
  varietyType: 'hybrid' | 'traditional';
  farmerId: string;
  farmerName: string;
  farmerPhone: string;
  farmerAvatar: string;
  location: string;
  district: string;
  state: string;
  landAreaAcres: number;
  fundingRequired: number;
  fundedAmount: number;
  investorsCount: number;
  proposedProfitSharePercent: number; // to investor
  tenureMonths: number;
  harvestDate: string;
  sowingDate: string;
  riskGrade: RiskGrade;
  insuranceCovered: boolean;
  status: 'draft' | 'under_verification' | 'live' | 'partially_funded' | 'fully_funded' | 'growing' | 'harvested' | 'settled';
  photos: string[];
  soilType: string;
  expectedYieldQuintal: number;
  expectedReturnPercent: number;
  description: string;
  tranches: {
    name: string;
    percent: number;
    amount: number;
    status: 'released' | 'pending' | 'locked';
    condition: string;
  }[];
}

export interface CropCycle {
  id: string;
  listingId: string;
  cropName: string;
  variety: string;
  farmerName: string;
  farmerPhone: string;
  location: string;
  district: string;
  landAreaAcres: number;
  stage: 'sowing' | 'mid-season' | 'pre-harvest' | 'harvest' | 'sale' | 'settlement';
  healthScore: number; // 0-100
  ndviScore: number; // 0.0 - 1.0 (e.g. 0.78 healthy vegetation)
  weatherAlert?: {
    type: 'rain' | 'heat' | 'pest' | 'optimal';
    message: string;
    severity: 'low' | 'medium' | 'high';
  };
  fieldAgentVisits: {
    date: string;
    agent: string;
    notes: string;
    status: 'Verified ✓' | 'Action Needed';
  }[];
  photos: {
    url: string;
    timestamp: string;
    coordinates: string;
    label: string;
  }[];
  tranches: {
    id: string;
    name: string;
    percent: number;
    amount: number;
    status: 'released' | 'pending' | 'locked';
    releaseDate?: string;
    condition: string;
  }[];
  harvestDetails?: {
    quantityQuintals: number;
    grade: string;
    mandiPricePerQuintal: number;
    totalSaleAmount: number;
    soldTo: string;
  };
  settlement?: {
    totalGross: number;
    investorShare: number;
    farmerShare: number;
    platformFee: number;
    investorMgmtFee: number;
    insuranceFee: number;
    netFarmer: number;
    netInvestor: number;
    settledDate: string;
  };
}

export interface MarketplaceItem {
  id: string;
  title: string;
  category: 'inputs' | 'equipment' | 'produce' | 'fodder' | 'land-labour' | 'processing' | 'storage' | 'logistics' | 'trade';
  subcategory: string;
  price: number;
  unit: string;
  rentalPerDay?: number;
  location: string;
  district: string;
  sellerName: string;
  sellerPhone?: string;
  sellerRating: number;
  verified: boolean;
  image: string;
  stockOrAvailable: string;
  description: string;
  specs?: Record<string, string>;
  offers?: {
    id: string;
    fromUser: string;
    amount: number;
    status: 'pending' | 'accepted' | 'countered' | 'declined';
    message: string;
    date: string;
  }[];
}

export interface MatchResult {
  id: string;
  name: string;
  type: 'Farmer' | 'Trader' | 'Processor' | 'Logistics' | 'Storage';
  location: string;
  distanceKm: number;
  matchPercent: number;
  rate: string;
  verified: boolean;
  phone: string;
  rating: number;
}

export interface Requirement {
  id: string;
  needType: string;
  cropOrItem: string;
  quantity: string;
  qualityGrade: string;
  location: string;
  requiredBy: string;
  budget: string;
  deliveryNeeded: boolean;
  status: 'active' | 'matched' | 'fulfilled';
  createdAt: string;
  matches: MatchResult[];
}

export interface PriceTrend {
  crop: string;
  cropHi: string;
  variety: string;
  district: string;
  currentMandiPrice: number; // Rs per quintal
  changePercent: number;
  trend: 'up' | 'down' | 'stable';
  arrivalsTons: number;
  eNamLinked: boolean;
  demandLevel: 'High' | 'Medium' | 'Low';
  history30Days: { day: string; price: number; arrivals: number }[];
  marketName: string;
  transportRatePerKm: number;
}

export interface NotificationItem {
  id: string;
  title: string;
  description: string;
  time: string;
  read: boolean;
  type: 'escrow' | 'weather' | 'milestone' | 'offer' | 'price';
}

export interface MessageThread {
  id: string;
  contactName: string;
  contactRole: string;
  contactAvatar: string;
  cropOrListing: string;
  lastMessage: string;
  time: string;
  unread: number;
  messages: {
    id: string;
    sender: string;
    text: string;
    time: string;
    isMe: boolean;
    type?: 'offer' | 'agreement' | 'text';
    offerAmount?: number;
  }[];
}

export interface Persona {
  id: Role;
  name: string;
  nameHi: string;
  roleTitle: string;
  location: string;
  avatar: string;
  bio: string;
  badge: string;
  details: Record<string, string | number>;
}
