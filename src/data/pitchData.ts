export interface PitchSlide {
  id: number;
  slug: string;
  title: string;
  subtitle: string;
  category: string;
}

export const PITCH_SLIDES: PitchSlide[] = [
  { id: 1, slug: 'problem', title: 'The Agrarian Debt Trap & The Investor Void', subtitle: '140M+ Indian farm families crippled by fixed debt, while urban wealth has zero direct agri-asset access.', category: 'Problem' },
  { id: 2, slug: 'solution', title: 'FasalSanjha: Shared Harvest, Shared Growth', subtitle: 'Farmer kheti karega, investor paisa lagayega — FasalSanjha dono ko digitally jodega.', category: 'Solution' },
  { id: 3, slug: 'how-it-works', title: 'The Complete 8-Stage Cycle', subtitle: 'From Land Verification to Escrow Settlement with zero debt liabilities.', category: 'Process' },
  { id: 4, slug: 'product-demo', title: 'The Digital Platform Experience', subtitle: 'Intuitive farmer mobile UX, institutional investor analytics, and comprehensive marketplace.', category: 'Demo' },
  { id: 5, slug: 'bmc', title: 'Interactive Business Model Canvas', subtitle: 'The 9 interconnected building blocks driving sustainable platform growth.', category: 'Business Model' },
  { id: 6, slug: 'revenue', title: 'Multi-Sided Revenue Streams & Live Simulator', subtitle: 'Diversified monetization across credit-free funding, marketplace commissions, and value chain.', category: 'Economics' },
  { id: 7, slug: 'market-size', title: 'TAM, SAM & SOM Opportunity', subtitle: 'Tapping a ₹20 Lakh Crore agri-credit addressable market starting in Maharashtra’s cash belts.', category: 'Market' },
  { id: 8, slug: 'competition', title: 'Competitive Matrix & SWOT Analysis', subtitle: 'Why equity-based profit sharing is defensible and disruption-proof against conventional debt.', category: 'Landscape' },
  { id: 9, slug: 'roadmap', title: 'Phased Regional Rollout & Milestones', subtitle: 'From Nashik pilot cluster to 5,000+ verified farmers and ₹40 Cr funded capital by Year 3.', category: 'Strategy' },
  { id: 10, slug: 'marketing', title: 'Go-to-Market & Kharif/Rabi Calendar', subtitle: 'Blended digital acquisition, on-ground village field agent network, and FPO syndication.', category: 'Growth' },
  { id: 11, slug: 'financials', title: '3-Year Financial Model & Unit Economics', subtitle: 'Clear line of sight to operating break-even by Year 3 with ₹2–3 Cr seed capital.', category: 'Financials' },
  { id: 12, slug: 'team', title: 'Leadership & Execution Architecture', subtitle: 'Combining deep agricultural roots, tier-1 FinTech engineering, and institutional risk governance.', category: 'Team' },
  { id: 13, slug: 'risk', title: 'Risk Governance & Dual Mitigation Shield', subtitle: 'Addressing biological risk, legal compliance, and moral hazard through escrow & insurance.', category: 'Governance' },
  { id: 14, slug: 'ask', title: 'The Seed Ask & Long-Term Vision', subtitle: 'Seeking ₹2.5 Crore to digitize India’s agricultural capital backbone.', category: 'The Ask' }
];

export const BMC_DATA = {
  keyPartners: [
    'Progressive Farmers & FPOs',
    'NRI & Absentee Landowners',
    'Retail & HNI Agri-Investors',
    'Certified Farm Labour Brigades',
    'Agri-Input & Seed Manufacturers',
    'Machinery Dealers & Custom Hiring Centers',
    'General & Crop Insurers (PMFBY / ICICI Lombard)',
    'WDRA Registered Cold Stores & Warehouses',
    'B2B Food Processors & Retail Chains',
    'ICICI Nodal/Escrow Partner Bank'
  ],
  keyActivities: [
    'Farmer & Land Title Verification (7/12 & Soil)',
    'Algorithmic Risk Grading (A / B / C)',
    'Escrow Tranche Disbursement Management',
    'Satellite NDVI & Field-Agent Monitoring',
    'Marketplace Price Discovery & B2B Matchmaking',
    'Harvest Sale Settlement & Waterfall Execution',
    'Dispute Desk & Mediation Governance'
  ],
  keyResources: [
    'Proprietary Agri-Fintech Platform & Mobile App',
    'Geo-Spatial Crop Health & Weather Engine',
    'Network of Certified On-Ground Field Agents',
    'Automated Tripartite Legal Agreement Generator',
    'Regulated Nodal Escrow Banking Infrastructure',
    'Data Lake of Mandi & Micro-Climate Yield History'
  ],
  valueProps: [
    'Farmers: Zero debt burden, 100% protected land ownership, timely working capital, guaranteed market linkages',
    'Investors: 12–20% target annualized yield, direct real-asset impact, starting at ₹5,000, dual insurance cover',
    'Labour & Landowners: Transparent harvest profit share (30–60%), idle land monetization without tenancy risk',
    'Buyers: Farm-gate traceability, consistent grade assurance, direct producer pricing'
  ],
  customerRelationships: [
    'Field-Agent Assisted Vernacular Onboarding',
    'Transparent Real-Time Geo-Tagged Milestone Feeds',
    'Automated Push Alerts for Weather & Tranches',
    'Two-Way Verified Rating & Trust Badges',
    'Prompt Arbitration & Evidence-Backed Dispute Resolution'
  ],
  channels: [
    'Bilingual Mobile App (Farmer & Retail Investor)',
    'Web Dashboard (B2B Buyers, Admin & Desktop Investors)',
    'Village-Level Gram Sevak & FPO Partner Desks',
    'Agri-Input Retail Store Kiosks in Mandis',
    'Digital Investor Acquisition & Performance Marketing'
  ],
  customerSegments: [
    'Smallholder Farmers (1–10 Acres) with Irrigated Land',
    'Retail Urban Investors Seeking Inflation-Beating Real Yields',
    'NRI & Urban Landowners with Idle Agricultural Land',
    'Organized Retail Chains (Supermarkets, HoReCa, Processors)',
    'Agri-Input Sellers, Drone Operators & Logistics Fleets'
  ],
  costStructure: [
    'Platform Engineering, Cloud & Security Infrastructure',
    'District Field Agent & Agronomist Network Compensation',
    'Satellite High-Resolution NDVI Imagery & Weather Feeds',
    'Escrow Nodal Banking & Payment Gateway Transaction Fees',
    'Legal Drafting, Compliance & Advisory (SEBI/RBI Review)',
    'Farmer Digital Literacy & Village Campaign Activation'
  ],
  revenueStreams: [
    'Farmer Platform Fee: 2–3% of funds successfully raised',
    'Investor Management Fee: 1% of net harvest returns',
    'Labour-Land Facilitation: 2–3% of produce value',
    'Input Marketplace: 20% sales/marketing + 10% logistics fee',
    'Storage & Logistics Booking Facilitation Commissions',
    'Premium Market Intelligence & Institutional Data Feeds'
  ]
};

export const FINANCIAL_METRICS = [
  { year: 'Year 1 (Pilot)', farmers: 500, investors: 1000, capital: '₹3.0 Cr', feeRevenue: '11.5', marketplaceRev: '2.5', totalRev: '14.0', totalExpense: '68.0', ebitda: '-54.0' },
  { year: 'Year 2 (Expansion)', farmers: 2000, investors: 6000, capital: '₹15.0 Cr', feeRevenue: '55.0', marketplaceRev: '18.0', totalRev: '73.0', totalExpense: '135.0', ebitda: '-62.0' },
  { year: 'Year 3 (Scale)', farmers: 5500, investors: 15000, capital: '₹42.0 Cr', feeRevenue: '148.0', marketplaceRev: '58.0', totalRev: '206.0', totalExpense: '215.0', ebitda: '-9.0 (Break-even)' },
];
