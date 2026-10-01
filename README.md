# 🌾 FasalSanjha (फसल साझा)
### *"Sow Together. Share the Harvest."* | *"Jodta Hai Kisan Ko, Bazaar Se"*
**Bharat Agri-Financial Services Pvt. Ltd. (Proposed, Pre-Launch)**

---

## 🚀 Quickstart & Local Setup

To run the production-grade demo locally:

```bash
# 1. Install dependencies
npm install

# 2. Launch Vite development server
npm run dev

# 3. Open browser at
http://localhost:3000
```

*(Note for Windows PowerShell environments: If script execution policy restricts `npm`, use `npm.cmd install` and `npm.cmd run dev`)*.

---

## 🌟 What is FasalSanjha?

FasalSanjha is an **agri-fintech platform + full-stack agricultural marketplace** built for smallholder Indian farmers and retail/institutional investors. It replaces predatory, fixed-interest debt with **risk-shared, equity-style crop cycle partnerships**, backed by:
1. **Regulated Escrow Nodal Banking** (ICICI Bank Partner Escrow)
2. **100% Protected Land Ownership** (Land is never mortgaged, transferred, or charged)
3. **Dual Insurance Protection** (PMFBY yield cover + 50–70% investor capital calamity pool)
4. **Satellite NDVI & Drone Tracking** (Sentinel-2 multispectral vegetation monitoring)
5. **The Complete Agricultural Chain** (Land → Funding → Inputs → Cultivation → Monitoring → Harvest → Storage → Processing → Logistics → Buyer → Sale → Settlement)

---

## 👥 Demo Personas (Persistent Header Switcher)

Switch instantly between 5 pre-configured personas via the persistent **"Demo As..."** dropdown in the header:

| Persona | Name & Location | Key Profile & Role |
|---|---|---|
| 👨🌾 **Farmer** | **Ramesh Patil**, Pimpalgaon Baswant, Nashik | 3.2 acres owned, Garva Red Onion & Soybean; verified 7/12 & soil health cards; 0% default rate. |
| 💰 **Investor** | **Neha Sharma**, Bandra West, Mumbai | Product Lead; ₹50,000 invested across 4 active crop cycles; 17.4% realized IRR; Tier 1 Escrow verified. |
| 🏪 **Business Buyer** | **Fresh Basket Retail (Amit Rao)**, Thane | Regional supermarket chain (24 outlets); procures 180+ tonnes monthly with direct farm-gate escrow settlement. |
| 🤝 **Labour / Landowner** | **Sunita Jadhav & Rajesh Kulkarni**, Nashik / USA | NRI landowner (Mr. Kulkarni) provides 5-acre polyhouse; Sunita leads a skilled 12-woman harvesting brigade under a 50:50 sharing agreement. |
| 🛡️ **Admin / Risk Desk** | **Vikram Deshmukh**, Thane HQ | Oversees 42 district field agents, 7/12 Mahabhulekh verification queue, dispute arbitration, and ₹4.28 Cr GMV escrow pool. |

---

## ⏱️ 3-Minute Investor Pitch & Demo Script

Use this exact walkthrough during your pitch tomorrow:

### **Minute 0:00 – 0:30 | The Problem & The Solution (Landing)**
1. Open [`/`](http://localhost:3000). Show the Hero headline: *"Farmer kheti karega, investor paisa lagayega — FasalSanjha dono ko jodega."*
2. Scroll through the **Animated Value Chain Strip** (*Fund → Farm → Monitor → Store → Process → Transport → Sell → Settle*).
3. Highlight the **"Why Equity, Not Debt" Comparison Table**: explain how fixed debt traps farmers when crops fail, while FasalSanjha shares upside and downside. Point out the **"Land Ownership Never Transferred"** shield.
4. Show the **11 colorful USP cards** and live platform counters (1,240+ farmers, ₹4.28 Cr funded).

### **Minute 0:30 – 1:00 | "Post Your Requirement" Hero Matching Engine**
1. Click the glowing **"Post Your Requirement"** CTA in the header or hero.
2. Form is pre-filled: *"Need 10 tonnes wheat, Grade A, Thane, by 15 October, delivery required."*
3. Click **"Run Matching Engine"**. 
4. Watch the radar animation scan geo-coordinates and verified titles.
5. In 2 seconds, showcase 5 multi-role matched partners:
   - **Farmer:** Balasaheb Khot (Solapur Sharbati Wheat, 98% match)
   - **Logistics:** Kisan Express (10T Eicher Pro, ₹26/km, 96% match)
   - **Processor:** Sahyadri Roller Flour Mills (93% match)
   - **Storage:** Lasalgaon WDRA Dry Granary Hub (91% match)
6. Click **"Send Quote"** to demonstrate instant RFQ generation with escrow protection.

### **Minute 1:00 – 1:45 | Farmer Creates Listing & Investor Funds via Escrow**
1. Switch persona to 👨🌾 **Farmer (Ramesh Patil)**.
2. Navigate to **Farmer Portal** (`/farmer/dashboard`) → Click **"Create New Crop Listing"**.
3. Point out the **Automated Risk Grading Engine**:
   - Staple grains → **Grade A** (20–30% investor share)
   - Cash crops → **Grade B** (30–45% investor share)
   - High-value horticulture → **Grade C** (45–60% investor share)
4. Switch persona to 💰 **Investor (Neha Sharma)** → Go to **Invest Marketplace** (`/invest`).
5. Filter by Grade B or Nashik. Click **"Invest via Escrow"** on Nashik Red Onion.
6. The **Tripartite Agreement Modal** opens:
   - Walk through the auto-generated contract clauses (Land Sovereignty Clause 1, Escrow Tranches Clause 2, Dual Insurance Clause 3).
   - Enter mock 6-digit OTP (e.g. `123456`) to demonstrate Aadhaar e-Sign authentication.
   - Choose UPI / Escrow Deposit → Click **"Pay to Escrow"**.
   - Confetti triggers, funding progress bar updates, and contract is confirmed!

### **Minute 1:45 – 2:15 | Satellite NDVI Crop Tracking & Tranche Governance**
1. Navigate to **Live Tracking** (`/track`).
2. Show **Nashik Garva Red Onion (Plot 2B)**:
   - Health Score: **91/100 (Optimal Vigor)**
   - Sentinel-2 NDVI: **0.82 High Canopy Density**
   - Inspect the visual **multispectral field polygon heatmap**.
3. Scroll through the **Vertical Milestone Journey**:
   - Tranche 1 (40% Sowing) → Released ✓
   - Tranche 2 (35% Mid-Season NDVI audit) → Released ✓
   - Tranche 3 (25% Pre-Harvest) → Click **"Simulate Agent Verification & Disburse"** to disburse funds live!
4. Show the geo-tagged photo feed with timestamps and GPS coordinates.
5. Switch to **Settled Strawberry Cycle** (`/track` → select settled cycle):
   - Showcase the **Settlement Waterfall Split**: Gross ₹3,94,250 → Investor return + profit ₹1,34,532 → Farmer payout ₹2,40,374 → Platform fee ₹9,856 → Insurance disaster reserve ₹3,386.
   - Click **"Download Settlement Statement (PDF)"**.

### **Minute 2:15 – 2:40 | FasalSanjha Bazaar Hub & Market Intelligence**
1. Navigate to **Bazaar** (`/bazaar`):
   - **Agri-Inputs:** Click **"Negotiate"** on Bhima Super Seeds to show buyer-seller counter-offer modal with transparent 20% sales + 10% freight breakdown.
   - **Equipment:** Show 10L agricultural drone sprayer and tractor per-day booking.
   - **Land & Labour:** Open the **Model Labour-Land Sharing Agreement** (30–60% typical labour share; land ownership 100% protected).
2. Navigate to **Market Prices** (`/prices`):
   - Show live 30-day interactive price trend chart for Lasalgaon Red Onion (₹2,450/q, +6.5%, e-NAM linked).

### **Minute 2:40 – 3:00 | Fullscreen Pitch Deck Mode (`/pitch`)**
1. Click **"🎤 Pitch Deck"** in the top navigation bar.
2. Fullscreen slide presentation with keyboard arrow navigation:
   - **Slide 5:** Interactive 9-block **Business Model Canvas** (replicates proposed venture model).
   - **Slide 6:** Live **Revenue Simulator** (adjust sliders for farmers, average ticket, and marketplace GMV to project platform revenues in real-time).
   - **Slide 7:** TAM (₹20 Lakh Cr+) → SAM (₹10,000 Cr) → SOM (₹40–60 Cr).
   - **Slide 11:** 3-Year Financial Model Table (Unit economics to break-even by Year 3).
   - **Slide 14:** **The Ask: ₹2.50 Crore Seed Round** for pilot rollout across Nashik & Ahmednagar.

---

## 🛡️ Trust, Legal & Regulatory Framework

- **Escrow Mechanics:** Capital sits in a partner scheduled commercial bank nodal account (ICICI Bank). FasalSanjha does not hold or commingle client funds.
- **Land Protection:** Under Section 4 of the Tripartite Agreement, land ownership is never transferred, mortgaged, or pledged. Investor recourse is strictly limited to agreed crop sales ratio.
- **Compliance Alignment:** Structured under the Model Contract Farming Act and state APMC framework. Adheres to DPDP Act 2023 for role-based consent and cryptographic data hashing.

---

## 🔄 Resetting Demo State

A persistent **"Reset Demo Data"** button is located in the footer of every screen. Clicking it reinitializes all listings, tranches, negotiations, and alerts to their clean initial state.
