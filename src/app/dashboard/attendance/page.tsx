"use client";

import { useState, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Sidebar from "@/components/layout/Sidebar";
import TopNav from "@/components/layout/TopNav";
import TakeRegisterModal from "@/components/modals/TakeRegisterModal";
import { CheckSquare, Search, Filter, Calendar, CheckCircle2, XCircle } from "lucide-react";

function AttendanceContent() {
  const searchParams = useSearchParams();
  const roleParam = searchParams.get("role")?.toUpperCase() as
    | "ADMIN"
    | "TEACHER"
    | "PARENT"
    | "STUDENT"
    | undefined;

  const [currentRole, setCurrentRole] = useState<
    "ADMIN" | "TEACHER" | "PARENT" | "STUDENT"
  >(roleParam || "TEACHER");
  const [userName, setUserName] = useState<string>("");
  const [isRegisterOpen, setIsRegisterOpen] = useState(false);

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
              <h1 className="text-2xl font-extrabold text-[#141B2E] tracking-tight">
                Daily Attendance Register & Ledger
              </h1>
              <p className="text-xs text-[#5C6A87] mt-0.5">
                School-wide attendance analytics & daily gate audit
              </p>
            </div>

            <button
              onClick={() => setIsRegisterOpen(true)}
              className="px-4 py-2.5 bg-[#B8862B] hover:bg-[#A27221] text-white font-bold text-xs rounded-xl shadow-xs flex items-center gap-1.5 self-start sm:self-auto"
            >
              <CheckSquare className="w-4 h-4" /> Take Daily Register
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
            <div className="bg-white p-4 rounded-2xl border border-[#E2E6EE] shadow-2xs">
              <span className="text-[10px] font-mono uppercase text-[#5C6A87]">Total Enrolled</span>
              <span className="text-2xl font-black font-ledger-mono text-[#141B2E] block mt-1">1,284</span>
            </div>
            <div className="bg-white p-4 rounded-2xl border border-[#E2E6EE] shadow-2xs">
              <span className="text-[10px] font-mono uppercase text-[#5C6A87]">Present Today</span>
              <span className="text-2xl font-black font-ledger-mono text-[#2F4B3C] block mt-1">1,209</span>
            </div>
            <div className="bg-white p-4 rounded-2xl border border-[#E2E6EE] shadow-2xs">
              <span className="text-[10px] font-mono uppercase text-[#5C6A87]">Absent Today</span>
              <span className="text-2xl font-black font-ledger-mono text-[#A63D40] block mt-1">75</span>
            </div>
            <div className="bg-white p-4 rounded-2xl border border-[#E2E6EE] shadow-2xs">
              <span className="text-[10px] font-mono uppercase text-[#5C6A87]">Attendance Rate</span>
              <span className="text-2xl font-black font-ledger-mono text-[#8C6420] block mt-1">94.2%</span>
            </div>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-[#E2E6EE] shadow-2xs space-y-4">
            <h3 className="text-sm font-bold text-[#141B2E]">Class Attendance Breakdown</h3>
            <div className="space-y-3 text-xs">
              {[
                { name: "Year 11 Physics", present: 30, total: 32, perc: 93.8 },
                { name: "Year 9 Mathematics", present: 29, total: 30, perc: 96.6 },
                { name: "Form 3A Science", present: 32, total: 36, perc: 88.9 },
                { name: "Form 2B Chemistry", present: 30, total: 31, perc: 96.7 },
              ].map((c) => (
                <div key={c.name} className="p-3 bg-[#FAF7F0] rounded-xl border border-[#E2E6EE] flex items-center justify-between">
                  <div>
                    <span className="font-extrabold text-[#141B2E] block">{c.name}</span>
                    <span className="text-[10px] font-mono text-[#5C6A87]">{c.present} of {c.total} students present</span>
                  </div>
                  <span className="px-2.5 py-1 bg-[#EAF2EC] text-[#2F4B3C] font-mono font-bold text-xs rounded-lg">
                    {c.perc}%
                  </span>
                </div>
              ))}
            </div>
          </div>
        </main>

        <footer className="px-8 py-3 border-t border-[#E2E6EE] bg-[#FAF7F0] flex items-center justify-between text-[11px] font-mono text-[#5C6A87]">
          <span>DAILY ATTENDANCE LEDGER REGISTERED</span>
          <span>ASHFORD GRAMMAR — 2026 - 2027</span>
        </footer>
      </div>

      <TakeRegisterModal isOpen={isRegisterOpen} onClose={() => setIsRegisterOpen(false)} />
    </div>
  );
}

export default function AttendancePage() {
  return (
    <Suspense fallback={<div className="p-8 font-mono text-xs">Loading Attendance...</div>}>
      <AttendanceContent />
    </Suspense>
  );
}
