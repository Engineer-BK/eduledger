"use client";

import { useState } from "react";
import { X, CreditCard, ShieldCheck, CheckCircle2 } from "lucide-react";

interface PayFeesModalProps {
  isOpen: boolean;
  onClose: () => void;
  onPaymentSuccess?: () => void;
}

export default function PayFeesModal({ isOpen, onClose, onPaymentSuccess }: PayFeesModalProps) {
  const [isPaid, setIsPaid] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);

  if (!isOpen) return null;

  const handlePay = () => {
    setIsProcessing(true);
    setTimeout(() => {
      setIsProcessing(false);
      setIsPaid(true);
      if (onPaymentSuccess) onPaymentSuccess();
    }, 800);
  };

  return (
    <div className="fixed inset-0 z-50 bg-ink-900/60 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-white max-w-md w-full rounded-2xl border border-ink-200 shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-150">
        {/* Header */}
        <div className="bg-ink-800 text-paper p-4 flex items-center justify-between border-b border-ink-700">
          <div className="flex items-center gap-2">
            <CreditCard className="w-5 h-5 text-brass-300" />
            <div>
              <h3 className="text-sm font-bold text-white">School Fee Ledger Payment</h3>
              <p className="text-[10px] font-mono text-ink-300">Ashford Grammar Bursar Office</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-lg hover:bg-ink-700 text-ink-300 hover:text-white transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 space-y-4">
          {!isPaid ? (
            <>
              <div className="p-4 bg-paper rounded-xl border border-ink-200 space-y-2">
                <div className="flex items-center justify-between text-xs">
                  <span className="text-ink-600 font-medium">Student:</span>
                  <span className="font-bold text-ink-800">Kwame Asante (Year 11)</span>
                </div>
                <div className="flex items-center justify-between text-xs">
                  <span className="text-ink-600 font-medium">Invoice Reference:</span>
                  <span className="font-mono text-ink-700">INV-2026-089</span>
                </div>
                <div className="flex items-center justify-between text-xs">
                  <span className="text-ink-600 font-medium">Due Date:</span>
                  <span className="font-mono font-bold text-redpen">12 SEPT 2026</span>
                </div>
                <div className="pt-2 border-t border-ink-200 flex items-center justify-between">
                  <span className="text-xs font-bold text-ink-800">Half-term Balance:</span>
                  <span className="text-xl font-bold font-ledger-mono text-brass-700">
                    ₵ 1,850.00
                  </span>
                </div>
              </div>

              <div className="space-y-2 text-xs">
                <label className="block font-semibold text-ink-700">Select Payment Method</label>
                <div className="grid grid-cols-2 gap-2">
                  <button className="p-3 rounded-xl border-2 border-brass-500 bg-brass-100/30 text-left font-bold text-brass-800 text-xs flex items-center gap-2">
                    <span className="w-3 h-3 rounded-full bg-brass-600"></span>
                    Mobile Money / Card
                  </button>
                  <button className="p-3 rounded-xl border border-ink-200 bg-paper text-left text-ink-600 text-xs hover:bg-ink-50">
                    Bank Transfer
                  </button>
                </div>
              </div>

              <div className="pt-2">
                <button
                  onClick={handlePay}
                  disabled={isProcessing}
                  className="w-full py-3 bg-brass-500 hover:bg-brass-600 text-white font-bold text-xs rounded-xl shadow-md hover:shadow transition-all flex items-center justify-center gap-2 disabled:opacity-75"
                >
                  {isProcessing ? "Processing Ledger..." : "Confirm & Pay ₵ 1,850.00"}
                </button>
              </div>
            </>
          ) : (
            <div className="text-center py-6 space-y-3">
              <div className="w-12 h-12 rounded-full bg-chalk-bg text-chalk flex items-center justify-center mx-auto">
                <CheckCircle2 className="w-8 h-8 text-chalk" />
              </div>
              <h4 className="text-base font-bold text-ink-800">Payment Completed!</h4>
              <p className="text-xs text-ink-600">
                Receipt #REC-2026-941 generated. Ledger updated to Paid in Full.
              </p>
              <button
                onClick={onClose}
                className="py-2.5 px-6 bg-ink-800 hover:bg-ink-700 text-white font-bold text-xs rounded-xl transition-colors"
              >
                Close &amp; Return to Dashboard
              </button>
            </div>
          )}
        </div>

        <div className="bg-paper border-t border-ink-200/80 p-3 text-center text-[10px] font-mono text-ink-400 flex items-center justify-center gap-1">
          <ShieldCheck className="w-3.5 h-3.5 text-chalk" />
          <span>Encrypted Ledger Transaction • Bursar Verified</span>
        </div>
      </div>
    </div>
  );
}
