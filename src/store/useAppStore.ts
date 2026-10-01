import { create } from 'zustand';
import { 
  Role, 
  Language, 
  CropListing, 
  CropCycle, 
  MarketplaceItem, 
  Requirement, 
  PriceTrend, 
  NotificationItem, 
  MessageThread,
  MatchResult
} from '../types';
import { INITIAL_CROP_LISTINGS } from '../data/cropListings';
import { INITIAL_CROP_CYCLES } from '../data/cropCycles';
import { INITIAL_MARKETPLACE_ITEMS } from '../data/marketplace';
import { INITIAL_REQUIREMENTS } from '../data/requirements';
import { INITIAL_PRICE_TRENDS } from '../data/marketPrices';

interface AppState {
  currentRole: Role;
  language: Language;
  cropListings: CropListing[];
  cropCycles: CropCycle[];
  marketplaceItems: MarketplaceItem[];
  requirements: Requirement[];
  priceTrends: Record<string, PriceTrend>;
  notifications: NotificationItem[];
  messages: MessageThread[];

  setRole: (role: Role) => void;
  setLanguage: (lang: Language) => void;
  addCropListing: (listing: Omit<CropListing, 'id' | 'status' | 'fundedAmount' | 'investorsCount'>) => string;
  investInListing: (listingId: string, amount: number, investorName?: string) => boolean;
  releaseTranche: (cycleId: string, trancheId: string) => void;
  addRequirement: (req: { needType: string; cropOrItem: string; quantity: string; qualityGrade: string; location: string; requiredBy: string; budget: string; deliveryNeeded: boolean }) => Requirement;
  makeOffer: (itemId: string, offerAmount: number, message: string) => void;
  sendMessage: (threadId: string, text: string) => void;
  markNotificationRead: (id: string) => void;
  resetDemoData: () => void;
}

const INITIAL_NOTIFICATIONS: NotificationItem[] = [
  {
    id: 'n-1',
    title: 'Tranche Disbursed: ₹26,250 Released',
    description: 'Mid-Season Weeding & Fertigation tranche approved via ICICI Escrow for Nashik Onion.',
    time: '2 hours ago',
    read: false,
    type: 'escrow'
  },
  {
    id: 'n-2',
    title: 'Weather Warning: Unseasonal Drizzle',
    description: 'Rain showers predicted in Niphad belt within 48 hours. Preventive bio-fungicide recommended.',
    time: '5 hours ago',
    read: false,
    type: 'weather'
  },
  {
    id: 'n-3',
    title: 'B2B Sourcing Match (98%)',
    description: 'Fresh Basket Retail placed an inquiry matching your 10T Durum Wheat.',
    time: '1 day ago',
    read: true,
    type: 'offer'
  }
];

const INITIAL_MESSAGES: MessageThread[] = [
  {
    id: 'thread-1',
    contactName: 'Neha Sharma (Investor)',
    contactRole: 'Investor (Mumbai)',
    contactAvatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=200',
    cropOrListing: 'Nashik Garva Red Onion',
    lastMessage: 'Agreement e-signed! Capital of ₹25,000 transferred to ICICI escrow account.',
    time: '10:30 AM',
    unread: 1,
    messages: [
      { id: 'm1', sender: 'Neha Sharma', text: 'Hello Ramesh ji, I saw your Garva onion listing with drip fertigation. Very impressed by the 91 health score.', time: 'Yesterday 4:15 PM', isMe: false },
      { id: 'm2', sender: 'Ramesh Patil', text: 'Namaste Neha ji! Yes, we have tested soil pH 7.2 and Trichoderma treated seedlings are ready.', time: 'Yesterday 4:30 PM', isMe: true },
      { id: 'm3', sender: 'Neha Sharma', text: 'I am funding ₹25,000 for this cycle. Reviewing the tripartite draft now.', time: 'Today 10:20 AM', isMe: false, type: 'agreement' },
      { id: 'm4', sender: 'Neha Sharma', text: 'Agreement e-signed! Capital of ₹25,000 transferred to ICICI escrow account.', time: 'Today 10:30 AM', isMe: false }
    ]
  },
  {
    id: 'thread-2',
    contactName: 'Fresh Basket Retail (Amit Rao)',
    contactRole: 'Buyer (Thane)',
    contactAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=200',
    cropOrListing: '10 Tonnes Wheat Requirement',
    lastMessage: 'We accept your rate of ₹2,820/quintal. Logistics dispatch scheduled.',
    time: 'Yesterday',
    unread: 0,
    messages: [
      { id: 'm1', sender: 'Fresh Basket', text: 'We received your quote for 10 Tonnes Sharbati Wheat. Grade A certificate verified.', time: 'Yesterday 11:00 AM', isMe: false },
      { id: 'm2', sender: 'Ramesh Patil', text: 'Can load from Pandharpur by Oct 12th. Clean bags with moisture < 11%.', time: 'Yesterday 11:45 AM', isMe: true },
      { id: 'm3', sender: 'Fresh Basket', text: 'We accept your rate of ₹2,820/quintal. Logistics dispatch scheduled.', time: 'Yesterday 2:10 PM', isMe: false, type: 'offer', offerAmount: 2820 }
    ]
  }
];

export const useAppStore = create<AppState>((set, get) => ({
  currentRole: 'farmer',
  language: 'en',
  cropListings: INITIAL_CROP_LISTINGS,
  cropCycles: INITIAL_CROP_CYCLES,
  marketplaceItems: INITIAL_MARKETPLACE_ITEMS,
  requirements: INITIAL_REQUIREMENTS,
  priceTrends: INITIAL_PRICE_TRENDS,
  notifications: INITIAL_NOTIFICATIONS,
  messages: INITIAL_MESSAGES,

  setRole: (role: Role) => set({ currentRole: role }),
  
  setLanguage: (lang: Language) => set({ language: lang }),

  addCropListing: (newListingData) => {
    const newId = `crop-${Date.now().toString().slice(-4)}`;
    const fullListing: CropListing = {
      ...newListingData,
      id: newId,
      fundedAmount: 0,
      investorsCount: 0,
      status: 'live',
      photos: newListingData.photos && newListingData.photos.length > 0 ? newListingData.photos : [
        'https://images.unsplash.com/photo-1500937386664-56d1dfef3854?auto=format&fit=crop&q=80&w=800'
      ],
      farmerPhone: '+91 98221 44102',
      farmerAvatar: 'https://images.unsplash.com/photo-1595273670150-bd0c3c392e46?auto=format&fit=crop&q=80&w=200',
    };
    set((state) => ({
      cropListings: [fullListing, ...state.cropListings],
      notifications: [
        {
          id: `n-${Date.now()}`,
          title: `New Crop Listing Live: ${fullListing.cropName}`,
          description: `Listing ${fullListing.title} has passed automated risk audit (Grade ${fullListing.riskGrade}).`,
          time: 'Just now',
          read: false,
          type: 'milestone'
        },
        ...state.notifications
      ]
    }));
    return newId;
  },

  investInListing: (listingId: string, amount: number, investorName = 'Neha Sharma') => {
    let success = false;
    set((state) => {
      const updatedListings = state.cropListings.map((l) => {
        if (l.id === listingId) {
          const newFunded = Math.min(l.fundingRequired, l.fundedAmount + amount);
          const newStatus = newFunded >= l.fundingRequired ? 'fully_funded' : 'partially_funded';
          success = true;
          return {
            ...l,
            fundedAmount: newFunded,
            investorsCount: l.investorsCount + 1,
            status: newStatus as any
          };
        }
        return l;
      });

      const updatedNotifications: NotificationItem[] = [
        {
          id: `n-${Date.now()}`,
          title: `₹${amount.toLocaleString('en-IN')} Escrow Investment Received`,
          description: `${investorName} has funded ₹${amount.toLocaleString('en-IN')} via ICICI Nodal Escrow. Tripartite agreement signed.`,
          time: 'Just now',
          read: false,
          type: 'escrow'
        },
        ...state.notifications
      ];

      return {
        cropListings: updatedListings,
        notifications: updatedNotifications
      };
    });
    return success;
  },

  releaseTranche: (cycleId: string, trancheId: string) => {
    set((state) => {
      const updatedCycles = state.cropCycles.map((c) => {
        if (c.id === cycleId) {
          const updatedTranches = c.tranches.map((t) => {
            if (t.id === trancheId) {
              return { ...t, status: 'released' as const, releaseDate: new Date().toISOString().split('T')[0] };
            }
            return t;
          });
          return { ...c, tranches: updatedTranches };
        }
        return c;
      });

      return {
        cropCycles: updatedCycles,
        notifications: [
          {
            id: `n-${Date.now()}`,
            title: `Escrow Tranche Disbursed`,
            description: `Verification confirmed by field agent. Funds released to farmer's account.`,
            time: 'Just now',
            read: false,
            type: 'escrow'
          },
          ...state.notifications
        ]
      };
    });
  },

  addRequirement: (reqData) => {
    const newId = `req-${Date.now().toString().slice(-4)}`;
    const matches: MatchResult[] = [
      {
        id: `m-${Date.now()}-1`,
        name: 'Ramesh Patil (Verified Farmer)',
        type: 'Farmer',
        location: 'Nashik Cluster (14 km)',
        distanceKm: 14,
        matchPercent: 97,
        rate: 'Market Spot / Negotiable',
        verified: true,
        phone: '+91 98221 44102',
        rating: 4.9
      },
      {
        id: `m-${Date.now()}-2`,
        name: 'Sahyadri Fresh Logistics (Reefer/Truck)',
        type: 'Logistics',
        location: 'Nashik-Pune Expressway',
        distanceKm: 28,
        matchPercent: 94,
        rate: '₹28 / km',
        verified: true,
        phone: '+91 94220 89211',
        rating: 4.8
      },
      {
        id: `m-${Date.now()}-3`,
        name: 'Lasalgaon CA Cold Store (WDRA ✓)',
        type: 'Storage',
        location: 'Lasalgaon Mandi Hub',
        distanceKm: 42,
        matchPercent: 91,
        rate: '₹680 / Tonne / Month',
        verified: true,
        phone: '+91 98901 33288',
        rating: 4.9
      }
    ];

    const newReq: Requirement = {
      ...reqData,
      id: newId,
      status: 'matched',
      createdAt: new Date().toISOString().split('T')[0],
      matches
    };

    set((state) => ({
      requirements: [newReq, ...state.requirements],
      notifications: [
        {
          id: `n-${Date.now()}`,
          title: `Requirement Matched: ${newReq.quantity} ${newReq.cropOrItem}`,
          description: `Our AI matching engine surfaced 3 verified partners with up to 97% compatibility.`,
          time: 'Just now',
          read: false,
          type: 'offer'
        },
        ...state.notifications
      ]
    }));

    return newReq;
  },

  makeOffer: (itemId: string, offerAmount: number, message: string) => {
    set((state) => {
      const updatedItems = state.marketplaceItems.map((item) => {
        if (item.id === itemId) {
          const newOffer = {
            id: `off-${Date.now()}`,
            fromUser: 'Current User',
            amount: offerAmount,
            status: 'pending' as const,
            message,
            date: new Date().toISOString().split('T')[0]
          };
          return {
            ...item,
            offers: [...(item.offers || []), newOffer]
          };
        }
        return item;
      });

      return {
        marketplaceItems: updatedItems,
        notifications: [
          {
            id: `n-${Date.now()}`,
            title: `Offer Submitted: ₹${offerAmount}`,
            description: `Your negotiated counter-offer was sent to the seller for approval.`,
            time: 'Just now',
            read: false,
            type: 'offer'
          },
          ...state.notifications
        ]
      };
    });
  },

  sendMessage: (threadId: string, text: string) => {
    set((state) => {
      const updatedMessages = state.messages.map((thread) => {
        if (thread.id === threadId) {
          const newMsg = {
            id: `msg-${Date.now()}`,
            sender: 'You',
            text,
            time: 'Just now',
            isMe: true
          };
          return {
            ...thread,
            lastMessage: text,
            time: 'Just now',
            messages: [...thread.messages, newMsg]
          };
        }
        return thread;
      });
      return { messages: updatedMessages };
    });
  },

  markNotificationRead: (id: string) => {
    set((state) => ({
      notifications: state.notifications.map((n) => n.id === id ? { ...n, read: true } : n)
    }));
  },

  resetDemoData: () => {
    set({
      currentRole: 'farmer',
      language: 'en',
      cropListings: INITIAL_CROP_LISTINGS,
      cropCycles: INITIAL_CROP_CYCLES,
      marketplaceItems: INITIAL_MARKETPLACE_ITEMS,
      requirements: INITIAL_REQUIREMENTS,
      priceTrends: INITIAL_PRICE_TRENDS,
      notifications: INITIAL_NOTIFICATIONS,
      messages: INITIAL_MESSAGES
    });
  }
}));
