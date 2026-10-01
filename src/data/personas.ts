import { Persona } from '../types';

export const DEMO_PERSONAS: Persona[] = [
  {
    id: 'farmer',
    name: 'Ramesh Patil',
    nameHi: 'रमेश पाटिल',
    roleTitle: 'Farmer (3 Acres, Nashik)',
    location: 'Pimpalgaon Baswant, Nashik, MH',
    avatar: 'https://images.unsplash.com/photo-1605000797499-95a51c5269ae?auto=format&fit=crop&q=80&w=200',
    bio: 'Experienced onion & soybean farmer with 18 years in horticulture. Uses drip irrigation & IPM practices.',
    badge: 'Verified Farmer ✓ | 7/12 & Soil Health Verified',
    details: {
      'Landholding': '3.2 Acres (Own)',
      'Primary Crops': 'Nashik Red Onion, Soybean (JS-335)',
      'Credit Score': '742 (Agri CIBIL)',
      'Cycles Completed': 6,
      'Active Funding': '₹75,000 (Cycle #4)',
      'Default Rate': '0.0%',
    }
  },
  {
    id: 'investor',
    name: 'Neha Sharma',
    nameHi: 'नेहा शर्मा',
    roleTitle: 'Retail Agri-Investor (Mumbai)',
    location: 'Bandra West, Mumbai, MH',
    avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=200',
    bio: 'Product Lead at a Mumbai FinTech. Passionate about rural economy and direct real-asset impact investing.',
    badge: 'Verified Investor ✓ | Escrow Tier 1',
    details: {
      'Total Invested': '₹50,000',
      'Active Cycles': 4,
      'Realized IRR': '17.4%',
      'Risk Preference': 'Balanced (A: 40%, B: 40%, C: 20%)',
      'Capital Protected': '₹35,000 (Dual Insurance Cover)',
      'Next Payout': '18 Nov 2026',
    }
  },
  {
    id: 'buyer',
    name: 'Fresh Basket Retail (Amit Rao)',
    nameHi: 'फ्रेश बास्केट रिटेल (अमित राव)',
    roleTitle: 'Procurement Head (Chain of 24 Outlets)',
    location: 'Wagle Estate, Thane, MH',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=200',
    bio: 'Purchasing 150+ tonnes of grade-A farm produce monthly directly from Nashik, Pune & Sangli clusters.',
    badge: 'Verified B2B Buyer ✓ | GST & Mandi Licensed',
    details: {
      'Monthly Volume': '180 Tonnes',
      'Preferred Crops': 'Onion, Tomato, Exotic Veg, Grapes',
      'Active Inquiries': 3,
      'Fulfill Rate': '98.5%',
      'Credit Terms': 'Escrow T+1 settlement',
      'Warehouse Node': 'Bhiwandi Hub #3',
    }
  },
  {
    id: 'labour',
    name: 'Sunita Jadhav & Mr. Kulkarni',
    nameHi: 'सुनीता जाधव एवं श्री कुलकर्णी',
    roleTitle: 'Labour Group Leader & NRI Landowner',
    location: 'Niphad, Nashik & New Jersey (Dual)',
    avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=200',
    bio: 'Mr. Kulkarni (NRI) provides 5-acre polyhouse; Sunita leads a skilled 12-member women harvesting brigade.',
    badge: 'Verified Partnership ✓ | Model Agreement Active',
    details: {
      'Arrangement': 'Polyhouse Cucumber & Bell Pepper (50:50 share)',
      'Labour Team Size': '12 Specialists',
      'Land Title': 'Mr. Kulkarni (Protected under Platform Shield)',
      'Agreement Duration': '6 Months (Rabi season)',
      'Facilitation Fee': '2.5% shared produce value',
      'Land Transferred': 'NO (Ownership 100% Protected)',
    }
  },
  {
    id: 'admin',
    name: 'Vikram Deshmukh',
    nameHi: 'विक्रम देशमुख',
    roleTitle: 'Chief Field Officer & Risk Desk',
    location: 'Central Risk Desk, Thane HQ',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=200',
    bio: 'Senior agronomist & legal ombudsman overseeing district field agents, satellite NDVI audits & dispute desk.',
    badge: 'Super Admin ✓ | Dual Auth Enabled',
    details: {
      'Pending KYC Approvals': 8,
      'Active Field Agents': 42,
      'Dispute Arbitration Rate': '99.1% resolved',
      'Current Platform GMV': '₹4.28 Crore',
      'Escrow Pool Balance': '₹1.15 Crore (ICICI Nodal)',
      'Default/Dispute Rate': '0.8% (Target <3%)',
    }
  }
];
