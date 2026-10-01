import React from 'react';
import { BrowserRouter, Routes, Route, Outlet } from 'react-router-dom';
import { Header } from './components/common/Header';
import { Footer } from './components/common/Footer';
import { BottomNav } from './components/common/BottomNav';

// Pages
import { Home } from './pages/Home';
import { PitchDeck } from './pages/PitchDeck';
import { Invest } from './pages/Invest';
import { Bazaar } from './pages/Bazaar';
import { Track } from './pages/Track';
import { MarketPrices } from './pages/MarketPrices';
import { CalculatorPage } from './pages/CalculatorPage';
import { RequirementForm } from './components/requirement/RequirementForm';
import { FarmerDashboard } from './pages/farmer/FarmerDashboard';
import { NewListing } from './pages/farmer/NewListing';
import { InvestorDashboard } from './pages/investor/InvestorDashboard';
import { AdminDashboard } from './pages/admin/AdminDashboard';
import { Onboarding } from './pages/Onboarding';
import { TrustCompliance } from './pages/TrustCompliance';
import { Messages } from './pages/Messages';
import { Profile } from './pages/Profile';

const AppLayout: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col bg-cream text-slate-800">
      <Header />
      <main className="flex-1 pb-16 md:pb-0">
        <Outlet />
      </main>
      <Footer />
      <BottomNav />
    </div>
  );
};

export const App: React.FC = () => {
  return (
    <BrowserRouter>
      <Routes>
        {/* Fullscreen standalone Pitch Deck Mode */}
        <Route path="/pitch" element={<PitchDeck />} />

        {/* Standard Web App Layout */}
        <Route element={<AppLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/invest" element={<Invest />} />
          <Route path="/invest/:id" element={<Invest />} />
          
          {/* Bazaar & All Subcategory Aliases */}
          <Route path="/bazaar" element={<Bazaar />} />
          <Route path="/bazaar/:sub" element={<Bazaar />} />
          <Route path="/equipment" element={<Bazaar />} />
          <Route path="/produce" element={<Bazaar />} />
          <Route path="/fodder" element={<Bazaar />} />
          <Route path="/land-labour" element={<Bazaar />} />
          <Route path="/business" element={<Bazaar />} />
          <Route path="/processing" element={<Bazaar />} />
          <Route path="/storage" element={<Bazaar />} />
          <Route path="/logistics" element={<Bazaar />} />
          <Route path="/trade" element={<Bazaar />} />

          {/* Tracking & Milestone Escrow */}
          <Route path="/track" element={<Track />} />
          <Route path="/track/:id" element={<Track />} />

          {/* Market Intelligence */}
          <Route path="/prices" element={<MarketPrices />} />
          <Route path="/prices/:crop" element={<MarketPrices />} />

          {/* Profit-Share Calculator */}
          <Route path="/calculator" element={<CalculatorPage />} />

          {/* Post Your Requirement Hero Matcher */}
          <Route path="/requirement/new" element={<div className="max-w-7xl mx-auto px-4 py-8"><RequirementForm /></div>} />
          <Route path="/requirement/matches" element={<div className="max-w-7xl mx-auto px-4 py-8"><RequirementForm /></div>} />

          {/* Farmer Portal */}
          <Route path="/farmer/dashboard" element={<FarmerDashboard />} />
          <Route path="/farmer/new-listing" element={<NewListing />} />
          <Route path="/farmer/cycle/:id" element={<Track />} />

          {/* Investor Portal */}
          <Route path="/investor/dashboard" element={<InvestorDashboard />} />
          <Route path="/investor/portfolio" element={<InvestorDashboard />} />

          {/* Admin & Field Agent Desk */}
          <Route path="/admin" element={<AdminDashboard />} />

          {/* Onboarding & KYC */}
          <Route path="/login" element={<Onboarding />} />
          <Route path="/onboarding" element={<Onboarding />} />

          {/* Trust, Legal & Insurance */}
          <Route path="/trust" element={<TrustCompliance />} />
          <Route path="/insurance" element={<TrustCompliance />} />

          {/* Direct Messaging */}
          <Route path="/messages" element={<Messages />} />

          {/* Profile */}
          <Route path="/profile" element={<Profile />} />

          {/* Catch-all fallback */}
          <Route path="*" element={<Home />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};
export default App;
