import { Requirement } from '../types';

export const INITIAL_REQUIREMENTS: Requirement[] = [
  {
    id: 'req-001',
    needType: 'Commodity Purchase (B2B)',
    cropOrItem: 'Wheat',
    quantity: '10 Tonnes',
    qualityGrade: 'Grade A (Sharbati Durum)',
    location: 'Wagle Estate, Thane',
    requiredBy: '2026-10-15',
    budget: '₹2,80,000 - ₹2,95,000',
    deliveryNeeded: true,
    status: 'matched',
    createdAt: '2026-10-01',
    matches: [
      {
        id: 'm-1',
        name: 'Balasaheb Khot (Sharbati Gold Farm)',
        type: 'Farmer',
        location: 'Pandharpur, Solapur (280 km)',
        distanceKm: 280,
        matchPercent: 98,
        rate: '₹2,820 / Quintal',
        verified: true,
        phone: '+91 98601 22910',
        rating: 4.9
      },
      {
        id: 'm-2',
        name: 'Kisan Express Heavy Logistics (10T Eicher Pro)',
        type: 'Logistics',
        location: 'Nashik-Thane Express Corridor',
        distanceKm: 140,
        matchPercent: 96,
        rate: '₹26 / km (Farm to Doorstep)',
        verified: true,
        phone: '+91 98220 54109',
        rating: 4.8
      },
      {
        id: 'm-3',
        name: 'Sahyadri Agro Roller Flour Mills',
        type: 'Processor',
        location: 'MIDC Rabale, Navi Mumbai (18 km)',
        distanceKm: 18,
        matchPercent: 93,
        rate: '₹2,890 / Quintal ex-mill',
        verified: true,
        phone: '+91 94220 89211',
        rating: 4.7
      },
      {
        id: 'm-4',
        name: 'Lasalgaon WDRA Dry Granary Hub',
        type: 'Storage',
        location: 'Lasalgaon Mandi By-pass',
        distanceKm: 195,
        matchPercent: 91,
        rate: '₹240 / Tonne / Month',
        verified: true,
        phone: '+91 98221 44102',
        rating: 4.9
      },
      {
        id: 'm-5',
        name: 'Maha-Agro Mandi Trading Consortium',
        type: 'Trader',
        location: 'Vashi APMC Market Yard #2',
        distanceKm: 22,
        matchPercent: 88,
        rate: '₹2,920 / Quintal spot',
        verified: true,
        phone: '+91 97654 32189',
        rating: 4.6
      }
    ]
  }
];
