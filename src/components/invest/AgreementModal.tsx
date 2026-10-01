import React, { useState } from 'react';
import { ShieldCheck, FileText, CheckCircle2, Lock, ArrowRight, X, AlertCircle } from 'lucide-react';
import confetti from 'canvas-confetti';
import { CropListing } from '../../types';
import { useAppStore } from '../../store/useAppStore';

interface AgreementModalProps {
  listing: CropListing;
  investmentAmount: number;
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

export const AgreementModal: React.FC<AgreementModalProps> = ({
  listing,
  investmentAmount,
  isOpen,
  onClose,
  onSuccess,
}) => {
  const { investInListing } = useAppStore();
  const [step, setStep] = useState<'review' | 'esign' | 'payment' | 'confirmed'>('review');
  const [agreeChecked, setAgreeChecked] = useState(false);
  const [otp, setOtp] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);

  if (!isOpen) return null;

  const triggerConfetti = () => {
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 }
    });
  };

  const handleSignAgreement = () => {
    setIsProcessing(true);
    setTimeout(() => {
      setIsProcessing(false);
      setStep('payment');
    }, 800);
  };

  const handleEscrowPayment = () => {
    setIsProcessing(true);
    setTimeout(() => {
      setIsProcessing(false);
      investInListing(listing.id, investmentAmount, 'Neha Sharma');
      setStep('confirmed');
      triggerConfetti();
    }, 1200);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-white rounded-2card shadow-2xl max-w-2xl w-full max-h-[90vh] flex flex-col border border-slate-200 overflow-hidden">
        {/* Header */}
        <div className="bg-forest-900 text-white p-5 flex justify-between items-center shrink-0">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-xl bg-forest-800 text-harvest-400">
              <FileText className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-bold text-base">Tripartite Crop Investment Agreement</h3>
              <p className="text-xs text-slate-300">
                FasalSanjha Escrow Smart-Contract • Draft Ref #FS-{listing.id.toUpperCase()}-2026
              </p>
            </div>
          </div>
          <button onClick={onClose} className="p-1.5 rounded-lg text-slate-300 hover:text-white hover:bg-forest-800">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Step Progress Bar */}
        <div className="bg-slate-50 px-6 py-2 border-b border-slate-200 flex items-center justify-between text-xs font-semibold text-slate-500">
          <span className={step === 'review' ? 'text-forest-900 font-bold' : ''}>1. Legal Review</span>
          <span>→</span>
          <span className={step === 'esign' ? 'text-forest-900 font-bold' : ''}>2. Digital e-Sign</span>
          <span>→</span>
          <span className={step === 'payment' ? 'text-forest-900 font-bold' : ''}>3. Escrow Deposit</span>
          <span>→</span>
          <span className={step === 'confirmed' ? 'text-emerald-700 font-bold' : ''}>4. Contract Active</span>
        </div>

        {/* Body Content */}
        <div className="p-6 overflow-y-auto space-y-4 flex-1">
          {step === 'review' && (
            <div className="space-y-4 text-xs leading-relaxed text-slate-700">
              <div className="bg-amber-50 border border-amber-200 rounded-xl p-3 flex items-start gap-2.5">
                <AlertCircle className="w-4 h-4 text-amber-800 shrink-0 mt-0.5" />
                <p className="text-[11px] text-amber-900">
                  <strong>Important Notice:</strong> Returns are yield-linked and calculated based on actual harvest weighment and certified APMC/B2B sale value. Capital is escrow-protected and insured.
                </p>
              </div>

              <div className="border border-slate-200 rounded-xl p-4 bg-slate-50/50 space-y-3 font-mono text-[11px]">
                <p className="font-bold text-slate-900 uppercase">
                  PARTIES TO THIS CONTRACT FARMING SHARING AGREEMENT:
                </p>
                <p>
                  <strong>1. FARMER (Party of the First Part):</strong> {listing.farmerName}, residing at {listing.location}, {listing.district}, Maharashtra (Verified 7/12 Land Title).
                </p>
                <p>
                  <strong>2. INVESTOR (Party of the Second Part):</strong> Neha Sharma, Mumbai, Maharashtra (PAN verified, Escrow Tier 1).
                </p>
                <p>
                  <strong>3. PLATFORM & ESCROW FACILITATOR (Party of the Third Part):</strong> Bharat Agri-Financial Services Pvt. Ltd. (FasalSanjha), through ICICI Bank Nodal Escrow Account.
                </p>
                <div className="border-t border-slate-200 pt-2 space-y-1">
                  <p><strong>CROP CYCLE:</strong> {listing.title} ({listing.variety})</p>
                  <p><strong>COMMITTED CAPITAL:</strong> ₹{investmentAmount.toLocaleString('en-IN')}</p>
                  <p><strong>INVESTOR PROFIT-SHARE:</strong> {listing.proposedProfitSharePercent}% of net harvest profit</p>
                  <p><strong>ESTIMATED TENURE:</strong> {listing.tenureMonths} Months (Harvest: {listing.harvestDate})</p>
                </div>
              </div>

              <div className="space-y-2 text-[11px]">
                <h5 className="font-bold text-slate-900 uppercase">Key Enforceable Clauses:</h5>
                <p>
                  <strong>Clause 1 (Land Sovereignty):</strong> The Farmer’s land title and ownership shall remain absolutely intact. Neither the Investor nor the Platform shall acquire any lien, mortgage, leasehold, or charge over the land.
                </p>
                <p>
                  <strong>Clause 2 (Escrow Tranche Release):</strong> Funds deposited by the Investor shall be held in a regulated nodal escrow account and released in verified tranches: 40% Sowing, 35% Mid-Season NDVI audit, 25% Pre-harvest maturity.
                </p>
                <p>
                  <strong>Clause 3 (Dual Insurance Cover):</strong> The crop cycle is co-covered under PMFBY yield protection and the FasalSanjha 60% Investor Capital Protection Pool for natural calamities.
                </p>
                <p>
                  <strong>Clause 4 (Dispute Arbitration):</strong> In event of discrepancy, digital geo-tagged photo trails and satellite NDVI archives shall serve as conclusive evidence under Platform Arbitration.
                </p>
              </div>

              <label className="flex items-center gap-2.5 p-3 rounded-xl border border-forest-200 bg-forest-50/50 cursor-pointer">
                <input
                  type="checkbox"
                  checked={agreeChecked}
                  onChange={(e) => setAgreeChecked(e.target.checked)}
                  className="rounded text-forest-800 focus:ring-forest-700 w-4 h-4"
                />
                <span className="text-xs font-semibold text-forest-950">
                  I have read and consent to the terms of the Tripartite Crop Sharing Agreement.
                </span>
              </label>
            </div>
          )}

          {step === 'esign' && (
            <div className="space-y-4 py-4 text-center">
              <div className="w-12 h-12 rounded-full bg-forest-100 text-forest-800 flex items-center justify-center mx-auto">
                <FileText className="w-6 h-6" />
              </div>
              <h4 className="font-bold text-slate-900 text-sm">Aadhaar / Digital e-Sign Authentication</h4>
              <p className="text-xs text-slate-500 max-w-sm mx-auto">
                Enter the mock 6-digit OTP sent to your registered mobile number (+91 98XXX X4502).
              </p>

              <div className="max-w-xs mx-auto">
                <input
                  type="text"
                  placeholder="Enter 6-digit OTP (e.g. 123456)"
                  value={otp}
                  onChange={(e) => setOtp(e.target.value)}
                  className="w-full text-center tracking-widest text-lg font-mono py-2.5 rounded-xl border border-slate-300 focus:ring-2 focus:ring-forest-800 focus:border-forest-800 outline-none"
                  maxLength={6}
                />
                <p className="text-[11px] text-slate-400 mt-1">Hint: Type any 6 digits for this live demo</p>
              </div>

              <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 max-w-sm mx-auto text-left text-xs space-y-1">
                <p className="text-slate-500">Signer: <strong>Neha Sharma</strong></p>
                <p className="text-slate-500">Document Hash: <code className="text-[10px]">sha256:8f4c...91b2</code></p>
                <p className="text-emerald-700 font-semibold flex items-center gap-1">
                  <CheckCircle2 className="w-3.5 h-3.5" /> Certificate Authority: e-Mudhra Mock Gateway
                </p>
              </div>
            </div>
          )}

          {step === 'payment' && (
            <div className="space-y-4 py-2">
              <div className="bg-forest-50 p-4 rounded-xl border border-forest-200 flex justify-between items-center">
                <div>
                  <span className="text-xs text-slate-500">Total Escrow Deposit</span>
                  <p className="text-xl font-extrabold text-forest-950">₹{investmentAmount.toLocaleString('en-IN')}</p>
                </div>
                <div className="text-right">
                  <span className="text-[11px] font-bold text-forest-800 bg-white px-2.5 py-1 rounded-full border border-forest-200">
                    ICICI Nodal Escrow
                  </span>
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-xs font-bold text-slate-700">Select Instant Escrow Transfer Method:</label>
                <div className="grid grid-cols-2 gap-2 text-xs">
                  <div className="p-3 rounded-xl border-2 border-forest-800 bg-forest-50/40 flex items-center gap-2 cursor-pointer font-semibold text-forest-900">
                    <span className="w-3 h-3 rounded-full bg-forest-800 ring-2 ring-forest-200" />
                    UPI (GPay / PhonePe / BHIM)
                  </div>
                  <div className="p-3 rounded-xl border border-slate-200 hover:border-slate-300 flex items-center gap-2 cursor-pointer text-slate-700">
                    <span className="w-3 h-3 rounded-full border border-slate-300" />
                    NetBanking (HDFC / ICICI / SBI)
                  </div>
                </div>
              </div>

              <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 text-xs space-y-1.5 text-slate-600">
                <p className="flex items-center gap-1.5 font-bold text-slate-900">
                  <Lock className="w-3.5 h-3.5 text-forest-700" /> Safe Escrow Protocol
                </p>
                <p className="text-[11px]">
                  Funds will be credited to Escrow Pool #FS-ESC-9082. The platform cannot utilize this capital for any purpose other than the verified milestones of {listing.farmerName}'s crop.
                </p>
              </div>
            </div>
          )}

          {step === 'confirmed' && (
            <div className="space-y-4 py-4 text-center">
              <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto shadow-inner">
                <CheckCircle2 className="w-10 h-10" />
              </div>
              <h3 className="text-lg font-extrabold text-slate-900">Investment & Contract Confirmed!</h3>
              <p className="text-xs text-slate-600 max-w-sm mx-auto leading-relaxed">
                You have successfully committed <strong>₹{investmentAmount.toLocaleString('en-IN')}</strong> to <strong>{listing.title}</strong>.
              </p>

              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 max-w-sm mx-auto text-left text-xs space-y-1.5">
                <div className="flex justify-between">
                  <span className="text-slate-500">Transaction Ref:</span>
                  <span className="font-mono font-bold text-slate-800">TXN-{Date.now().toString().slice(-6)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Contract Hash:</span>
                  <span className="font-mono text-slate-700">fs-agr-2026-9021</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Tranche 1 Status:</span>
                  <span className="font-bold text-forest-800">Held in Escrow (Release on Germination)</span>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Footer Actions */}
        <div className="bg-slate-50 p-4 border-t border-slate-200 flex justify-between items-center shrink-0">
          {step === 'review' && (
            <>
              <button
                onClick={onClose}
                className="px-4 py-2 text-xs font-semibold text-slate-600 hover:text-slate-900"
              >
                Cancel
              </button>
              <button
                disabled={!agreeChecked}
                onClick={() => setStep('esign')}
                className="px-5 py-2.5 rounded-xl bg-forest-900 hover:bg-forest-800 disabled:opacity-50 text-white font-bold text-xs flex items-center gap-1.5 shadow-md"
              >
                <span>Proceed to e-Sign</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </>
          )}

          {step === 'esign' && (
            <>
              <button
                onClick={() => setStep('review')}
                className="px-4 py-2 text-xs font-semibold text-slate-600"
              >
                Back
              </button>
              <button
                disabled={otp.length < 4 || isProcessing}
                onClick={handleSignAgreement}
                className="px-5 py-2.5 rounded-xl bg-forest-900 hover:bg-forest-800 disabled:opacity-50 text-white font-bold text-xs flex items-center gap-1.5 shadow-md"
              >
                {isProcessing ? 'Verifying Signature...' : 'Sign Agreement Digitally'}
              </button>
            </>
          )}

          {step === 'payment' && (
            <>
              <button
                onClick={() => setStep('esign')}
                className="px-4 py-2 text-xs font-semibold text-slate-600"
              >
                Back
              </button>
              <button
                disabled={isProcessing}
                onClick={handleEscrowPayment}
                className="px-5 py-2.5 rounded-xl bg-harvest-500 hover:bg-harvest-600 disabled:opacity-50 text-forest-950 font-bold text-xs flex items-center gap-1.5 shadow-md"
              >
                {isProcessing ? 'Processing Escrow Deposit...' : `Pay ₹${investmentAmount.toLocaleString('en-IN')} to Escrow`}
              </button>
            </>
          )}

          {step === 'confirmed' && (
            <button
              onClick={() => {
                onSuccess();
                onClose();
              }}
              className="w-full py-2.5 rounded-xl bg-forest-900 text-white font-bold text-xs hover:bg-forest-800 shadow-md"
            >
              Go to Crop Tracking & Portfolio
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
