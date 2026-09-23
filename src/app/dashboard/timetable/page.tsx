"use client";

import { useState, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Sidebar from "@/components/layout/Sidebar";
import TopNav from "@/components/layout/TopNav";
import { Calendar, Clock, MapPin, User, ChevronLeft, ChevronRight } from "lucide-react";

function TimetableContent() {
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

  const timeSlots = ["08:30 - 09:15", "09:15 - 10:00", "10:15 - 11:00", "11:00 - 11:45", "13:00 - 13:45", "14:00 - 14:45"];
  const days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"];

  const scheduleGrid: Record<string, Record<string, { subject: string; room: string; teacher: string }>> = {
    Monday: {
      "08:30 - 09:15": { subject: "Form 1A Algebra", room: "Room 4", teacher: "David Asante" },
      "09:15 - 10:00": { subject: "Form 3A Science", room: "Lab 1", teacher: "Kofi Owusu" },
      "11:00 - 11:45": { subject: "Year 11 Physics", room: "Lab 2", teacher: "Ama Mensah" },
    },
    Wednesday: {
      "09:15 - 10:00": { subject: "Year 9 Maths", room: "Room 12", teacher: "Ama Mensah" },
      "11:00 - 11:45": { subject: "Year 11 Physics", room: "Lab 2", teacher: "Ama Mensah" },
      "13:00 - 13:45": { subject: "Year 10 Physics", room: "Lab 2", teacher: "Ama Mensah" },
      "14:00 - 14:45": { subject: "Science Club", room: "Lab 1", teacher: "Ama Mensah" },
    },
    Friday: {
      "11:00 - 11:45": { subject: "Year 11 Physics", room: "Lab 2", teacher: "Ama Mensah" },
      "14:00 - 14:45": { subject: "Form 2B Chemistry", room: "Chem Lab", teacher: "Esi Boateng" },
    },
  };

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
                Academic Timetable & Schedule Matrix
              </h1>
              <p className="text-xs text-[#5C6A87] mt-0.5 font-medium">
                Michaelmas Term 2026-2027 · Room Allocation & Teacher Conflict Checker
              </p>
            </div>

            <div className="flex items-center gap-2 font-mono text-xs">
              <button className="p-2 bg-white border border-[#E2E6EE] rounded-xl hover:bg-[#EEF0F4] transition-colors">
                <ChevronLeft className="w-4 h-4 text-[#33415F]" />
              </button>
              <span className="px-3 py-1.5 bg-white border border-[#E2E6EE] rounded-xl font-bold text-[#141B2E]">
                WEEK 2 (10-14 SEPT 2026)
              </span>
              <button className="p-2 bg-white border border-[#E2E6EE] rounded-xl hover:bg-[#EEF0F4] transition-colors">
                <ChevronRight className="w-4 h-4 text-[#33415F]" />
              </button>
            </div>
          </div>

          <div className="bg-white rounded-2xl border border-[#E2E6EE] shadow-2xs overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full border-collapse">
                <thead>
                  <tr className="bg-[#FAF7F0] border-b border-[#E2E6EE] text-[11px] font-mono text-[#5C6A87]">
                    <th className="p-4 text-left font-bold w-36">TIME SLOT</th>
                    {days.map((day) => (
                      <th key={day} className="p-4 text-center font-bold uppercase tracking-wider">
                        {day}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#E2E6EE]">
                  {timeSlots.map((slot) => (
                    <tr key={slot} className="hover:bg-[#FAF7F0]/40 transition-colors">
                      <td className="p-3 text-xs font-mono font-bold text-[#141B2E] bg-white border-r border-[#E2E6EE]">
                        <Clock className="w-3.5 h-3.5 text-[#B8862B] inline mr-1" />
                        {slot}
                      </td>
                      {days.map((day) => {
                        const cell = scheduleGrid[day]?.[slot];
                        return (
                          <td key={day} className="p-2 border-r border-[#E2E6EE] last:border-r-0 align-top">
                            {cell ? (
                              <div className="p-2.5 rounded-xl bg-[#FAF7F0] border border-[#D9AF5D]/40 space-y-1">
                                <span className="text-xs font-extrabold text-[#141B2E] block">
                                  {cell.subject}
                                </span>
                                <div className="flex items-center justify-between text-[10px] font-mono text-[#5C6A87]">
                                  <span>{cell.room}</span>
                                  <span>{cell.teacher}</span>
                                </div>
                              </div>
                            ) : (
                              <div className="h-14 rounded-xl border border-dashed border-[#E2E6EE] flex items-center justify-center text-[10px] font-mono text-[#8895B0]">
                                Free
                              </div>
                            )}
                          </td>
                        );
                      })}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </main>

        <footer className="px-8 py-3 border-t border-[#E2E6EE] bg-[#FAF7F0] flex items-center justify-between text-[11px] font-mono text-[#5C6A87]">
          <span>TIMETABLE MASTER MATRIX · NO CONFLICTS DETECTED</span>
          <span>ASHFORD GRAMMAR — 2026 - 2027</span>
        </footer>
      </div>
    </div>
  );
}

export default function TimetablePage() {
  return (
    <Suspense fallback={<div className="p-8 font-mono text-xs">Loading Timetable...</div>}>
      <TimetableContent />
    </Suspense>
  );
}
