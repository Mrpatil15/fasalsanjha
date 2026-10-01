import { CropCycle } from '../types';

export const INITIAL_CROP_CYCLES: CropCycle[] = [
  {
    id: 'cycle-001',
    listingId: 'crop-001',
    cropName: 'Nashik Garva Red Onion',
    variety: 'Bhima Super (Garva)',
    farmerName: 'Ramesh Patil',
    farmerPhone: '+91 98221 44102',
    location: 'Pimpalgaon Baswant',
    district: 'Nashik',
    landAreaAcres: 3.0,
    stage: 'mid-season',
    healthScore: 91,
    ndviScore: 0.82,
    weatherAlert: {
      type: 'rain',
      message: 'Unseasonal drizzle forecast in Niphad/Pimpalgaon belt over next 48h. Field agent suggests foliar Trichoderma spray to protect bulb neck.',
      severity: 'medium'
    },
    fieldAgentVisits: [
      {
        date: '2026-07-28',
        agent: 'Suresh Gaikwad (Nashik Cluster)',
        notes: 'Sowing verified. Drip lines operational, 96% germination across all 3 plots. Soil moisture adequate.',
        status: 'Verified ✓'
      },
      {
        date: '2026-09-04',
        agent: 'Suresh Gaikwad (Nashik Cluster)',
        notes: 'Mid-season vegetative inspection. Bulbing has initiated smoothly. Thrips count below economic threshold. NDVI score confirmed 0.82.',
        status: 'Verified ✓'
      }
    ],
    photos: [
      {
        url: 'https://images.unsplash.com/photo-1618512496248-a07fe83aa8cb?auto=format&fit=crop&q=80&w=800',
        timestamp: '2026-09-25 09:42 AM IST',
        coordinates: '20.1741° N, 73.9856° E (Pimpalgaon, Plot 2B)',
        label: 'Geo-tagged Mid-Season Bulb Neck Development'
      },
      {
        url: 'https://images.unsplash.com/photo-1500937386664-56d1dfef3854?auto=format&fit=crop&q=80&w=800',
        timestamp: '2026-09-10 16:15 PM IST',
        coordinates: '20.1739° N, 73.9860° E (Pimpalgaon, Plot 1A)',
        label: 'Drone Orthomosaic Canopy Coverage'
      },
      {
        url: 'https://images.unsplash.com/photo-1592982537447-7440770cbfc9?auto=format&fit=crop&q=80&w=800',
        timestamp: '2026-08-14 11:20 AM IST',
        coordinates: '20.1745° N, 73.9852° E (Pimpalgaon, Plot 3)',
        label: 'Germination & Basal Dose Geo-verification'
      }
    ],
    tranches: [
      {
        id: 'tranche-1',
        name: 'Tranche 1: Sowing & Field Prep (40%)',
        percent: 40,
        amount: 30000,
        status: 'released',
        releaseDate: '2026-07-29',
        condition: 'Seedling germination verified by agent (Disbursed via ICICI Escrow)'
      },
      {
        id: 'tranche-2',
        name: 'Tranche 2: Mid-Season Weeding & Fertigation (35%)',
        percent: 35,
        amount: 26250,
        status: 'released',
        releaseDate: '2026-09-05',
        condition: 'NDVI vegetative index > 0.75 + agent physical visit (Disbursed via ICICI Escrow)'
      },
      {
        id: 'tranche-3',
        name: 'Tranche 3: Bulb Development & Pre-Harvest (25%)',
        percent: 25,
        amount: 18750,
        status: 'pending',
        condition: 'Bulb diameter maturity audit (Scheduled for mid-October 2026)'
      }
    ]
  },
  {
    id: 'cycle-002',
    listingId: 'crop-002',
    cropName: 'Certified Organic Soybean',
    variety: 'JS-335 (Bio-certified)',
    farmerName: 'Ganesh Shinde',
    farmerPhone: '+91 94220 89211',
    location: 'Rahuri Taluka',
    district: 'Ahmednagar',
    landAreaAcres: 4.5,
    stage: 'harvest',
    healthScore: 88,
    ndviScore: 0.79,
    weatherAlert: {
      type: 'optimal',
      message: 'Dry sunny conditions in Ahmednagar. Optimal window for mechanical threshing and bagging.',
      severity: 'low'
    },
    fieldAgentVisits: [
      {
        date: '2026-07-12',
        agent: 'Mahesh Thorat (Ahmednagar East)',
        notes: 'Rhizobium treated seed drilling verified. Field bunding clean.',
        status: 'Verified ✓'
      },
      {
        date: '2026-08-20',
        agent: 'Mahesh Thorat (Ahmednagar East)',
        notes: 'Pod density audit completed. Average 62 pods per plant. Zero pest damage.',
        status: 'Verified ✓'
      },
      {
        date: '2026-09-30',
        agent: 'Mahesh Thorat (Ahmednagar East)',
        notes: 'Harvest weighment audit. 42.5 Quintals bagged with 10.8% moisture content.',
        status: 'Verified ✓'
      }
    ],
    photos: [
      {
        url: 'https://images.unsplash.com/photo-1599818816933-7e47761001e4?auto=format&fit=crop&q=80&w=800',
        timestamp: '2026-09-30 14:10 PM IST',
        coordinates: '19.3871° N, 74.6512° E (Rahuri, Plot 4)',
        label: 'Harvest Weighment and Moisture Meter Test'
      },
      {
        url: 'https://images.unsplash.com/photo-1586771107445-d3ca888129ff?auto=format&fit=crop&q=80&w=800',
        timestamp: '2026-08-22 10:30 AM IST',
        coordinates: '19.3865° N, 74.6508° E (Rahuri, Plot 2)',
        label: 'Pod Setting Geo-tagged Stage'
      }
    ],
    tranches: [
      {
        id: 't-201',
        name: 'Tranche 1: Land Prep & Bio-Seed (40%)',
        percent: 40,
        amount: 27200,
        status: 'released',
        releaseDate: '2026-07-14',
        condition: 'Rhizobium inoculation checked'
      },
      {
        id: 't-202',
        name: 'Tranche 2: Pod Formation Stage (35%)',
        percent: 35,
        amount: 23800,
        status: 'released',
        releaseDate: '2026-08-22',
        condition: 'Pod count geotag audit'
      },
      {
        id: 't-203',
        name: 'Tranche 3: Pre-Harvest Desiccation (25%)',
        percent: 25,
        amount: 17000,
        status: 'released',
        releaseDate: '2026-09-28',
        condition: 'Moisture content < 12%'
      }
    ],
    harvestDetails: {
      quantityQuintals: 42.5,
      grade: 'FAQ Grade-1 (Oil Content > 19%)',
      mandiPricePerQuintal: 4750,
      totalSaleAmount: 201875,
      soldTo: 'Sahyadri Agro-Processing Cluster (Thane)'
    }
  },
  {
    id: 'cycle-003',
    listingId: 'crop-003',
    cropName: 'Mahabaleshwar Winter Sweet Strawberries',
    variety: 'Winter Dawn / Sweet Sensation',
    farmerName: 'Sunil More',
    farmerPhone: '+91 97654 32189',
    location: 'Wai - Mahabaleshwar Belt',
    district: 'Pune',
    landAreaAcres: 1.5,
    stage: 'settlement',
    healthScore: 95,
    ndviScore: 0.89,
    fieldAgentVisits: [
      {
        date: '2026-06-02',
        agent: 'Pravin Joshi (Pune/Satara Cluster)',
        notes: 'Mulched raised beds and drip manifold verified. 100% tissue culture saplings healthy.',
        status: 'Verified ✓'
      },
      {
        date: '2026-08-15',
        agent: 'Pravin Joshi (Pune/Satara Cluster)',
        notes: 'Brix reading 11.2 - 12.0. Clean fruit set with zero botrytis mold.',
        status: 'Verified ✓'
      },
      {
        date: '2026-09-25',
        agent: 'Pravin Joshi (Pune/Satara Cluster)',
        notes: 'Harvest concluded. Total 95 quintals packed into 250g punnets, transported via cold truck.',
        status: 'Verified ✓'
      }
    ],
    photos: [
      {
        url: 'https://images.unsplash.com/photo-1464965911861-746a04b4bca6?auto=format&fit=crop&q=80&w=800',
        timestamp: '2026-09-25 08:30 AM IST',
        coordinates: '17.9234° N, 73.7421° E (Wai Plateau)',
        label: 'Pre-cooling dispatch in corrugated export punnets'
      },
      {
        url: 'https://images.unsplash.com/photo-1543528176-61b239494933?auto=format&fit=crop&q=80&w=800',
        timestamp: '2026-08-10 11:45 AM IST',
        coordinates: '17.9230° N, 73.7418° E (Wai Plateau)',
        label: 'Ripening check on silver UV mulch beds'
      }
    ],
    tranches: [
      {
        id: 't-301',
        name: 'Tranche 1: Saplings & Mulch (45%)',
        percent: 45,
        amount: 36000,
        status: 'released',
        releaseDate: '2026-05-18',
        condition: 'Mother plant survival > 95%'
      },
      {
        id: 't-302',
        name: 'Tranche 2: Flowering & Bio-defense (30%)',
        percent: 30,
        amount: 24000,
        status: 'released',
        releaseDate: '2026-07-20',
        condition: 'Brix and fruit set audit'
      },
      {
        id: 't-303',
        name: 'Tranche 3: Harvest Packaging & Cold Chain (25%)',
        percent: 25,
        amount: 20000,
        status: 'released',
        releaseDate: '2026-09-15',
        condition: 'Cold chain dispatch slips'
      }
    ],
    harvestDetails: {
      quantityQuintals: 95.0,
      grade: 'Premium Table Grade (A+)',
      mandiPricePerQuintal: 4150,
      totalSaleAmount: 394250,
      soldTo: 'Nature Basket & Reliance Fresh Mumbai'
    },
    settlement: {
      totalGross: 394250,
      farmerShare: 243760, // 48% of profit + labor and base
      investorShare: 135890, // Return of ₹80,000 capital + ₹55,890 net profit share (19.8% IRR for 5 months)
      platformFee: 9856, // 2.5% of gross
      investorMgmtFee: 1358, // 1% of investor earnings
      insuranceFee: 3386, // Mutual protection pool contribution
      netFarmer: 240374,
      netInvestor: 134532,
      settledDate: '2026-09-29'
    }
  }
];
