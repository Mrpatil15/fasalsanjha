import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  ShieldCheck, 
  FileText, 
  CheckCircle2, 
  MapPin, 
  Phone, 
  Camera, 
  ArrowRight,
  UserCheck,
  AlertCircle
} from 'lucide-react';
import { useAppStore } from '../store/useAppStore';
import { Role } from '../types';

export const Onboarding: React.FC = () => {
  const navigate = useNavigate();
  const { setRole } = useAppStore();

  const [step, setStep] = useState<number>(1);
  const [phone, setPhone] = useState('9822144102');
  const [otp, setOtp] = useState('');
  const [selectedRole, setSelectedRole] = useState<Role>('farmer');
  
  // Farmer KYC fields
  const [aadhaar, setAadhaar] = useState('XXXX-XXXX-1942');
  const [surveyNo, setSurveyNo] = useState('Plot 84/2A (Pimpalgaon)');
  const [soilPh, setSoilPh] = useState('7.2 (Medium Black Loam)');
  const [isVerifying, setIsVerifying] = useState(false);
  const [isCompleted, setIsCompleted] = useState(false);

  const handlePhoneSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setStep(2);
  };

  const handleOtpSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setStep(3);
  };

  const handleKycSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsVerifying(true);
    setTimeout(() => {
      setIsVerifying(false);
      setIsCompleted(true);
      setRole(selectedRole);
    }, 1200);
  };

  return (
    <div className="max-w-2xl mx-auto px-4 py-12 space-y-8">
      {/* Header */}
      <div className="text-center space-y-2">
        <span className="px-3 py-1 rounded-full bg-forest-100 text-forest-800 text-xs font-bold border border-forest-200">
          Digital Onboarding & KYC Desk
        </span>
        <h1 className="text-2xl md:text-3xl font-extrabold text-slate-900">
          Verify Your Profile on FasalSanjha
        </h1>
        <p className="text-xs text-slate-500">
          7/12 Land Title Verification • PMFBY Insurance Eligibility • Escrow Banking Linkage
        </p>
      </div>

      {/* Stepper Indicator */}
      <div className="flex items-center justify-between text-xs font-bold text-slate-500 px-4">
        <span className={step >= 1 ? 'text-forest-900 font-extrabold' : ''}>1. Mobile OTP</span>
        <span>→</span>
        <span className={step >= 2 ? 'text-forest-900 font-extrabold' : ''}>2. Role Select</span>
        <span>→</span>
        <span className={step >= 3 ? 'text-forest-900 font-extrabold' : ''}>3. KYC & 7/12</span>
        <span>→</span>
        <span className={isCompleted ? 'text-emerald-700 font-extrabold' : ''}>4. Verified ✓</span>
      </div>

      <div className="bg-white rounded-2card p-6 md:p-8 shadow-soft border border-slate-200">
        {/* Step 1: Phone OTP */}
        {step === 1 && (
          <form onSubmit={handlePhoneSubmit} className="space-y-4">
            <h3 className="font-bold text-base text-slate-900">Enter Mobile Number</h3>
            <p className="text-xs text-slate-500">We will send a 4-digit mock verification OTP.</p>

            <div className="relative">
              <span className="absolute left-3 top-3 text-xs font-bold text-slate-500">+91</span>
              <input
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="w-full pl-12 p-2.5 rounded-xl border border-slate-300 text-sm font-semibold focus:ring-2 focus:ring-forest-800 outline-none"
                placeholder="Mobile Number"
                required
              />
            </div>

            <button
              type="submit"
              className="w-full py-2.5 rounded-xl bg-forest-900 hover:bg-forest-800 text-white font-bold text-xs shadow-md transition-colors"
            >
              Get OTP
            </button>
          </form>
        )}

        {/* Step 2: Role Pick */}
        {step === 2 && (
          <div className="space-y-4">
            <h3 className="font-bold text-base text-slate-900">Select Your Role</h3>
            <p className="text-xs text-slate-500">Pick how you want to participate in the shared harvest.</p>

            <div className="grid grid-cols-2 gap-3 text-xs">
              {[
                { id: 'farmer', title: '👨🌾 Farmer (कौशल किसान)', desc: 'Cultivate land & raise credit-free capital' },
                { id: 'investor', title: '💰 Investor (निवेशक)', desc: 'Fund crop cycles from ₹5,000 via escrow' },
                { id: 'buyer', title: '🏪 Business Buyer', desc: 'Procure bulk produce from farm-gate' },
                { id: 'labour', title: '🤝 Labour / Landowner', desc: 'Enter 50:50 crop sharing agreements' },
              ].map((r) => (
                <div
                  key={r.id}
                  onClick={() => setSelectedRole(r.id as Role)}
                  className={`p-3.5 rounded-xl border cursor-pointer transition-all ${
                    selectedRole === r.id
                      ? 'border-2 border-forest-800 bg-forest-50/60 shadow-sm'
                      : 'border-slate-200 hover:border-slate-300'
                  }`}
                >
                  <p className="font-bold text-slate-900">{r.title}</p>
                  <p className="text-[11px] text-slate-500 mt-1">{r.desc}</p>
                </div>
              ))}
            </div>

            <button
              onClick={() => setStep(3)}
              className="w-full py-2.5 rounded-xl bg-forest-900 hover:bg-forest-800 text-white font-bold text-xs shadow-md transition-colors"
            >
              Continue to Document Verification
            </button>
          </div>
        )}

        {/* Step 3: Farmer KYC Wizard */}
        {step === 3 && !isCompleted && (
          <form onSubmit={handleKycSubmit} className="space-y-4 text-xs">
            <h3 className="font-bold text-base text-slate-900">Farmer Land & Soil Verification</h3>
            <p className="text-xs text-slate-500">Pre-filled with Ramesh Patil's certified Nashik landholding records.</p>

            <div>
              <label className="block font-bold text-slate-700 mb-1">Aadhaar (Masked):</label>
              <input
                type="text"
                value={aadhaar}
                disabled
                className="w-full p-2.5 rounded-xl border border-slate-200 bg-slate-50 text-slate-600 font-mono font-bold"
              />
            </div>

            <div>
              <label className="block font-bold text-slate-700 mb-1">7/12 Extract Survey Number:</label>
              <input
                type="text"
                value={surveyNo}
                onChange={(e) => setSurveyNo(e.target.value)}
                className="w-full p-2.5 rounded-xl border border-slate-300 font-semibold focus:ring-2 focus:ring-forest-800 outline-none"
              />
            </div>

            <div>
              <label className="block font-bold text-slate-700 mb-1">Soil Health Card Lab Report:</label>
              <input
                type="text"
                value={soilPh}
                onChange={(e) => setSoilPh(e.target.value)}
                className="w-full p-2.5 rounded-xl border border-slate-300 font-semibold focus:ring-2 focus:ring-forest-800 outline-none"
              />
            </div>

            {/* Mock Map Geo-tagging Visual */}
            <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 space-y-1">
              <span className="font-bold text-slate-800 flex items-center gap-1.5">
                <MapPin className="w-3.5 h-3.5 text-forest-700" /> Farm Geo-Coordinates Locked
              </span>
              <p className="text-[11px] text-slate-500">
                Plot 2B: 20.1741° N, 73.9856° E (Pimpalgaon Baswant, Nashik) • Verified via GPS
              </p>
            </div>

            <button
              type="submit"
              disabled={isVerifying}
              className="w-full py-2.5 rounded-xl bg-forest-900 hover:bg-forest-800 disabled:opacity-50 text-white font-bold text-xs shadow-md transition-colors"
            >
              {isVerifying ? 'Verifying with Mahabhulekh & Agri Lab...' : 'Submit for Instant Field Verification'}
            </button>
          </form>
        )}

        {/* Step 4: Verification Approved */}
        {isCompleted && (
          <div className="text-center space-y-4 py-4">
            <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto shadow-inner">
              <CheckCircle2 className="w-10 h-10" />
            </div>
            <h3 className="font-extrabold text-lg text-slate-900">
              Profile & 7/12 Land Title Verified ✓
            </h3>
            <p className="text-xs text-slate-600 max-w-sm mx-auto leading-relaxed">
              Your credentials have been authenticated. You now hold the <strong>Verified Farmer ✓</strong> badge with 100% legal land protection under the FasalSanjha Charter.
            </p>

            <button
              onClick={() => navigate('/farmer/dashboard')}
              className="px-6 py-2.5 rounded-xl bg-forest-900 text-white font-bold text-xs shadow-md"
            >
              Enter Farmer Dashboard
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
