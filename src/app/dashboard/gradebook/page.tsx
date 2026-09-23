"use client";

import { useState, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Sidebar from "@/components/layout/Sidebar";
import TopNav from "@/components/layout/TopNav";
import { BookOpen, Search, Download, Plus, FileText, CheckCircle2 } from "lucide-react";

function GradebookContent() {
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

  const grades = [
    { student: "Amara Osei", roll: "3A-001", physics: "92 / A", maths: "88 / A-", chemistry: "95 / A+" },
    { student: "Benjamin Kwame", roll: "3A-002", physics: "84 / B+", maths: "90 / A", chemistry: "82 / B+" },
    { student: "Clara Mensah", roll: "2B-007", physics: "100 / A+", maths: "98 / A+", chemistry: "96 / A+" },
    { student: "David Asante", roll: "3B-014", physics: "68 / C", maths: "74 / B-", chemistry: "70 / B-" },
    { student: "Esi Boateng", roll: "1A-003", physics: "94 / A", maths: "91 / A", chemistry: "89 / A-" },
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
                Smart Academic Gradebook
              </h1>
              <p className="text-xs text-[#5C6A87] mt-0.5">
                Formative & Summative Grade Entry · Report Card Generation
              </p>
            </div>

            <div className="flex items-center gap-3">
              <button
                onClick={() => alert("Report cards PDF exported.")}
                className="px-4 py-2.5 bg-white border border-[#E2E6EE] hover:border-[#B7BECC] text-[#141B2E] font-bold text-xs rounded-xl shadow-2xs flex items-center gap-2"
              >
                <Download className="w-4 h-4 text-[#5C6A87]" /> Export Reports (PDF)
              </button>
            </div>
          </div>

          <div className="bg-white rounded-2xl border border-[#E2E6EE] shadow-2xs overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b border-[#E2E6EE] bg-[#FAF7F0] text-[11px] font-mono text-[#5C6A87]">
                    <th className="py-3.5 px-6 font-bold">STUDENT NAME</th>
                    <th className="py-3.5 px-6 font-bold">ROLL NO.</th>
                    <th className="py-3.5 px-6 font-bold">PHYSICS</th>
                    <th className="py-3.5 px-6 font-bold">MATHEMATICS</th>
                    <th className="py-3.5 px-6 font-bold">CHEMISTRY</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#E2E6EE]">
                  {grades.map((g) => (
                    <tr key={g.roll} className="hover:bg-[#FAF7F0]/60 transition-colors">
                      <td className="py-3.5 px-6 text-xs font-bold text-[#141B2E]">{g.student}</td>
                      <td className="py-3.5 px-6 text-xs font-mono text-[#5C6A87]">{g.roll}</td>
                      <td className="py-3.5 px-6 text-xs font-mono font-bold text-[#2F4B3C]">{g.physics}</td>
                      <td className="py-3.5 px-6 text-xs font-mono font-bold text-[#141B2E]">{g.maths}</td>
                      <td className="py-3.5 px-6 text-xs font-mono font-bold text-[#8C6420]">{g.chemistry}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </main>

        <footer className="px-8 py-3 border-t border-[#E2E6EE] bg-[#FAF7F0] flex items-center justify-between text-[11px] font-mono text-[#5C6A87]">
          <span>GRADEBOOK REGISTER · MICHAELMAS TERM</span>
          <span>ASHFORD GRAMMAR — 2026 - 2027</span>
        </footer>
      </div>
    </div>
  );
}

export default function GradebookPage() {
  return (
    <Suspense fallback={<div className="p-8 font-mono text-xs">Loading Gradebook...</div>}>
      <GradebookContent />
    </Suspense>
  );
}
