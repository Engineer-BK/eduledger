"use client";

import { useState, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Sidebar from "@/components/layout/Sidebar";
import TopNav from "@/components/layout/TopNav";
import PayFeesModal from "@/components/modals/PayFeesModal";
import { CreditCard, AlertTriangle, CheckCircle2, Search, DollarSign } from "lucide-react";

function FeesContent() {
  const searchParams = useSearchParams();
  const roleParam = searchParams.get("role")?.toUpperCase() as
    | "ADMIN"
    | "TEACHER"
    | "PARENT"
    | "STUDENT"
    | undefined;

  const [currentRole, setCurrentRole] = useState<
    "ADMIN" | "TEACHER" | "PARENT" | "STUDENT"
  >(roleParam || "ADMIN");
  const [userName, setUserName] = useState<string>("");
  const [isPayModalOpen, setIsPayModalOpen] = useState(false);

  const feeLedger = [
    { name: "Amara Osei", roll: "3A-001", total: "₵ 1,200", paid: "₵ 1,200", status: "PAID", class: "Form 3A" },
    { name: "David Asante", roll: "3B-014", total: "₵ 1,200", paid: "₵ 600", status: "OVERDUE", class: "Form 3B" },
    { name: "Frank Adjei", roll: "2A-019", total: "₵ 1,200", paid: "₵ 0", status: "OVERDUE", class: "Form 2A" },
    { name: "Clara Mensah", roll: "2B-007", total: "₵ 1,200", paid: "₵ 1,200", status: "PAID", class: "Form 2B" },
  ];

  return (
    <div className="flex min-h-screen bg-[#FAF7F0] font-sans">
      <Sidebar
        currentRole={currentRole}
        userName={userName}
        onSwitchRole={(role) => setCurrentRole(role)}
      />

      <div className="flex-1 flex flex-col min-w-0">
        <TopNav
          currentRole={currentRole}
          onRoleChange={(role) => setCurrentRole(role)}
          userName={userName}
        />

        <main className="flex-1 p-6 md:p-8 max-w-7xl w-full mx-auto space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h1 className="text-2xl font-extrabold text-[#141B2E] tracking-tight font-serif">
                Fee Ledger & Bursar Accounts
              </h1>
              <p className="text-xs text-[#5C6A87] mt-0.5">
                Term 1 Fee Balances · Auto-Calculated Surcharges & Receipts
              </p>
            </div>

            <button
              onClick={() => setIsPayModalOpen(true)}
              className="px-4 py-2.5 bg-[#B8862B] hover:bg-[#A27221] text-white font-bold text-xs rounded-xl shadow-xs flex items-center gap-1.5 self-start sm:self-auto"
            >
              <CreditCard className="w-4 h-4" /> Make Fee Payment
            </button>
          </div>

          <div className="p-4 bg-[#1F2A44] text-[#FAF7F0] rounded-2xl border border-[#27344E] flex items-center justify-between shadow-lg">
            <div className="flex items-center gap-3">
              <AlertTriangle className="w-5 h-5 text-[#D9AF5D]" />
              <span className="text-xs font-bold text-white">
                132 Fee Accounts Overdue • Total Outstanding: ₵ 48,200
              </span>
            </div>
            <span className="text-xs font-mono text-[#D9AF5D] font-bold">LATE PENALTY APPLIES MONDAY</span>
          </div>

          <div className="bg-white rounded-2xl border border-[#E2E6EE] shadow-2xs overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b border-[#E2E6EE] bg-[#FAF7F0] text-[11px] font-mono text-[#5C6A87]">
                    <th className="py-3.5 px-6 font-bold">STUDENT NAME</th>
                    <th className="py-3.5 px-6 font-bold">CLASS</th>
                    <th className="py-3.5 px-6 font-bold">TOTAL DUES</th>
                    <th className="py-3.5 px-6 font-bold">PAID AMOUNT</th>
                    <th className="py-3.5 px-6 font-bold">STATUS</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#E2E6EE]">
                  {feeLedger.map((item) => (
                    <tr key={item.roll} className="hover:bg-[#FAF7F0]/60 transition-colors">
                      <td className="py-3.5 px-6 text-xs font-bold text-[#141B2E]">{item.name}</td>
                      <td className="py-3.5 px-6 text-xs text-[#5C6A87]">{item.class}</td>
                      <td className="py-3.5 px-6 text-xs font-mono font-bold text-[#141B2E]">{item.total}</td>
                      <td className="py-3.5 px-6 text-xs font-mono font-bold text-[#2F4B3C]">{item.paid}</td>
                      <td className="py-3.5 px-6">
                        <span
                          className={`text-[10px] font-mono font-bold px-2 py-0.5 rounded ${
                            item.status === "PAID"
                              ? "bg-[#EAF2EC] text-[#2F4B3C]"
                              : "bg-[#FDF0F0] text-[#A63D40]"
                          }`}
                        >
                          {item.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </main>

        <footer className="px-8 py-3 border-t border-[#E2E6EE] bg-[#FAF7F0] flex items-center justify-between text-[11px] font-mono text-[#5C6A87]">
          <span>BURSAR FEE LEDGER REGISTERED</span>
          <span>ASHFORD GRAMMAR — 2026 - 2027</span>
        </footer>
      </div>

      <PayFeesModal isOpen={isPayModalOpen} onClose={() => setIsPayModalOpen(false)} />
    </div>
  );
}

export default function FeesPage() {
  return (
    <Suspense fallback={<div className="p-8 font-mono text-xs">Loading Fees & Dues...</div>}>
      <FeesContent />
    </Suspense>
  );
}
