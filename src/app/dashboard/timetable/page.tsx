"use client";

import { useState, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import Sidebar from "@/components/layout/Sidebar";
import TopNav from "@/components/layout/TopNav";
import StudentTasksModal from "@/components/modals/StudentTasksModal";
import {
  CheckCircle2,
  BookOpen,
  Clock,
  ChevronRight,
  ChevronLeft,
  Calendar,
  Award,
  Bell,
  MapPin,
} from "lucide-react";

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
  >(roleParam || "STUDENT");

  const [userName, setUserName] = useState<string>("");
  const [activeTab, setActiveTab] = useState<"DAILY" | "WEEKLY">("DAILY");
  const [isTasksModalOpen, setIsTasksModalOpen] = useState(false);

  useEffect(() => {
    if (roleParam && ["ADMIN", "TEACHER", "PARENT", "STUDENT"].includes(roleParam)) {
      setCurrentRole(roleParam);
    } else if (typeof window !== "undefined") {
      const storedRole = localStorage.getItem("eduledger_user_role") as
        | "ADMIN"
        | "TEACHER"
        | "PARENT"
        | "STUDENT"
        | null;
      if (storedRole) setCurrentRole(storedRole);
      const storedName = localStorage.getItem("eduledger_user_name");
      if (storedName) setUserName(storedName);
    }
  }, [roleParam]);

  const handleRoleChange = (newRole: "ADMIN" | "TEACHER" | "PARENT" | "STUDENT") => {
    setCurrentRole(newRole);
    if (typeof window !== "undefined") {
      localStorage.setItem("eduledger_user_role", newRole);
    }
  };

  const announcements = [
    {
      id: "1",
      title: "Athletics heats Thursday — bring kit",
      author: "Sports dept",
      time: "3h ago",
      tag: "EVENT",
      tagColor: "border-brass-500",
    },
    {
      id: "2",
      title: "Physics revision pack available in library",
      author: "Mrs Mensah",
      time: "Yesterday",
      tag: "CLASS",
      tagColor: "border-ink-800",
    },
    {
      id: "3",
      title: "Choir auditions Friday lunchtime",
      author: "Music dept",
      time: "2 days ago",
      tag: "CLUB",
      tagColor: "border-chalk",
    },
    {
      id: "4",
      title: "Lost property: navy blazer, size M",
      author: "Front office",
      time: "2 days ago",
      tag: "NOTICE",
      tagColor: "border-redpen",
    },
  ];

  const todaysClasses = [
    {
      time: "08:30",
      subject: "Assembly — Main hall",
      detail: "All years · Attended",
      dot: "bg-chalk",
    },
    {
      time: "09:15",
      subject: "Mathematics",
      detail: "Room 12 · Mr Osei",
      dot: "bg-chalk",
    },
    {
      time: "11:00",
      subject: "Physics",
      detail: "Lab 2 · Mrs Mensah",
      dot: "bg-brass-500 ring-4 ring-brass-100",
    },
    {
      time: "13:30",
      subject: "English Literature",
      detail: "Room 7 · Miss Boadu",
      dot: "bg-ink-300",
    },
  ];

  const timeSlots = ["08:30 - 09:15", "09:15 - 10:00", "10:15 - 11:00", "11:00 - 11:45", "13:00 - 13:45", "14:00 - 14:45"];
  const days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"];

  const scheduleGrid: Record<string, Record<string, { subject: string; room: string; teacher: string }>> = {
    Monday: {
      "08:30 - 09:15": { subject: "Assembly", room: "Main hall", teacher: "Headmistress" },
      "09:15 - 10:00": { subject: "Mathematics", room: "Room 12", teacher: "Mr Osei" },
      "11:00 - 11:45": { subject: "Physics", room: "Lab 2", teacher: "Mrs Mensah" },
    },
    Wednesday: {
      "08:30 - 09:15": { subject: "Assembly", room: "Main hall", teacher: "Headmistress" },
      "09:15 - 10:00": { subject: "Mathematics", room: "Room 12", teacher: "Mr Osei" },
      "11:00 - 11:45": { subject: "Physics", room: "Lab 2", teacher: "Mrs Mensah" },
      "13:30 - 14:15": { subject: "English Literature", room: "Room 7", teacher: "Miss Boadu" },
    },
    Friday: {
      "11:00 - 11:45": { subject: "Physics Lab", room: "Lab 2", teacher: "Mrs Mensah" },
      "14:00 - 14:45": { subject: "Chemistry", room: "Chem Lab", teacher: "Mrs Boateng" },
    },
  };

  return (
    <div className="flex min-h-screen bg-[#FAF7F0] font-sans">
      {/* Ink Navy Sidebar */}
      <Sidebar
        currentRole={currentRole}
        userName={userName}
        onSwitchRole={handleRoleChange}
      />

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0">
        <TopNav
          currentRole={currentRole}
          onRoleChange={handleRoleChange}
          userName={userName}
        />

        <main className="flex-1 p-6 md:p-8 max-w-7xl w-full mx-auto space-y-6">
          {/* Welcome Header */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h1 className="text-2xl font-extrabold text-[#141B2E] tracking-tight">
                Welcome back, {userName ? userName.split(" ")[0] : "Kwame"}
              </h1>
              <p className="text-xs text-[#5C6A87] mt-1 font-medium">
                Wednesday, 10 September 2026 · Marked present at 08:32 this morning.
              </p>
            </div>

            <div className="flex items-center gap-3">
              <button
                onClick={() => setIsTasksModalOpen(true)}
                className="px-5 py-2.5 rounded-xl bg-[#B8862B] hover:bg-[#A27221] text-white font-bold text-xs shadow-xs transition-all flex items-center gap-2"
              >
                <BookOpen className="w-4 h-4" />
                My assignments
              </button>
            </div>
          </div>

          {/* Metric Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Today's status */}
            <div className="bg-white p-5 rounded-2xl border border-[#E2E6EE] shadow-2xs space-y-3 relative overflow-hidden">
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold text-[#5C6A87]">Today&apos;s status</span>
                <div className="w-8 h-8 rounded-xl bg-[#EAF2EC] text-[#2F4B3C] flex items-center justify-center">
                  <CheckCircle2 className="w-4 h-4" />
                </div>
              </div>
              <div>
                <span className="text-2xl font-bold text-[#141B2E] block">Present</span>
                <span className="text-[11px] font-mono text-[#2F4B3C] font-semibold mt-1 block">
                  Marked 08:32 · Gate A
                </span>
              </div>
            </div>

            {/* Latest grade */}
            <div className="bg-white p-5 rounded-2xl border border-[#E2E6EE] shadow-2xs space-y-3 relative overflow-hidden">
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold text-[#5C6A87]">Latest grade</span>
                <div className="w-8 h-8 rounded-xl bg-[#F3E3C4] text-[#8C6420] flex items-center justify-center">
                  <Award className="w-4 h-4" />
                </div>
              </div>
              <div>
                <span className="text-3xl font-black font-ledger-mono text-[#141B2E] block">
                  A - 88%
                </span>
                <span className="text-[11px] font-mono text-[#5C6A87] mt-1 block">
                  Physics · Motion &amp; forces
                </span>
              </div>
            </div>

            {/* Next class */}
            <div className="bg-white p-5 rounded-2xl border border-[#E2E6EE] shadow-2xs space-y-3 relative overflow-hidden">
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold text-[#5C6A87]">Next class</span>
                <div className="w-8 h-8 rounded-xl bg-[#EEF0F4] text-[#5C6A87] flex items-center justify-center">
                  <Clock className="w-4 h-4" />
                </div>
              </div>
              <div>
                <span className="text-3xl font-black font-ledger-mono text-[#8C6420] block">
                  11:00
                </span>
                <span className="text-[11px] font-mono text-[#5C6A87] mt-1 block">
                  Physics · Lab 2 · A. Mensah
                </span>
              </div>
            </div>
          </div>

          {/* Present Streak Callout Banner */}
          <div className="p-4 bg-[#EAF2EC] rounded-2xl border border-[#2F4B3C]/30 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 shadow-2xs">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-[#2F4B3C] text-white flex items-center justify-center shrink-0">
                <CheckCircle2 className="w-5 h-5 text-white" />
              </div>
              <div>
                <span className="text-xs font-bold text-[#1F2A44]">
                  Present — streak of 21 days.
                </span>
                <span className="text-xs text-[#33415F] ml-1">
                  Two homework tasks due tomorrow.
                </span>
              </div>
            </div>

            <div className="flex items-center gap-4 text-xs font-mono shrink-0">
              <span className="text-[11px] font-bold text-[#2F4B3C]">
                2 DUE THU
              </span>
              <button
                onClick={() => setIsTasksModalOpen(true)}
                className="px-4 py-2 rounded-xl bg-white border border-[#E2E6EE] hover:border-[#B7BECC] text-[#1F2A44] font-bold transition-all"
              >
                View tasks
              </button>
            </div>
          </div>

          {/* View Toggle Tabs */}
          <div className="flex items-center justify-between border-b border-[#E2E6EE] pb-2">
            <div className="flex items-center gap-2">
              <button
                onClick={() => setActiveTab("DAILY")}
                className={`px-4 py-1.5 rounded-xl text-xs font-bold transition-all ${
                  activeTab === "DAILY"
                    ? "bg-[#1F2A44] text-white shadow-2xs"
                    : "text-[#5C6A87] hover:text-[#141B2E] hover:bg-[#EEF0F4]"
                }`}
              >
                Today&apos;s Schedule
              </button>
              <button
                onClick={() => setActiveTab("WEEKLY")}
                className={`px-4 py-1.5 rounded-xl text-xs font-bold transition-all ${
                  activeTab === "WEEKLY"
                    ? "bg-[#1F2A44] text-white shadow-2xs"
                    : "text-[#5C6A87] hover:text-[#141B2E] hover:bg-[#EEF0F4]"
                }`}
              >
                Full Weekly Matrix
              </button>
            </div>

            <span className="text-xs font-mono text-[#5C6A87]">YEAR 11 · HOUSE VOLTA</span>
          </div>

          {/* Tab View 1: Today's Dashboard View (Matching Screenshot) */}
          {activeTab === "DAILY" ? (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
              {/* Left: Recent Announcements */}
              <div className="lg:col-span-7 bg-white p-6 rounded-2xl border border-[#E2E6EE] shadow-2xs space-y-4">
                <div className="flex items-center justify-between border-b border-[#E2E6EE] pb-3">
                  <h3 className="text-sm font-bold text-[#1F2A44]">Recent announcements</h3>
                  <Link
                    href="/dashboard/announcements"
                    className="text-xs font-semibold text-[#8C6420] hover:text-[#735118] flex items-center gap-1"
                  >
                    View all <ChevronRight className="w-3.5 h-3.5" />
                  </Link>
                </div>

                <div className="space-y-3">
                  {announcements.map((item) => (
                    <div
                      key={item.id}
                      className="p-3.5 rounded-xl border border-[#E2E6EE] hover:border-[#B7BECC] bg-[#FAF7F0]/60 flex items-center justify-between gap-3 text-xs transition-colors"
                    >
                      <div className="flex items-start gap-3">
                        <span className={`w-1.5 h-8 rounded-full border-l-2 ${item.tagColor} shrink-0`}></span>
                        <div>
                          <h4 className="font-bold text-[#1F2A44] leading-snug">{item.title}</h4>
                          <span className="text-[10px] font-mono text-[#5C6A87]">
                            {item.author} · {item.time}
                          </span>
                        </div>
                      </div>
                      <span className="text-[10px] font-mono font-semibold px-2 py-0.5 border border-[#E2E6EE] rounded text-[#5C6A87] bg-white shrink-0">
                        {item.tag}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Right: Today's Classes Timeline */}
              <div className="lg:col-span-5 bg-white p-6 rounded-2xl border border-[#E2E6EE] shadow-2xs space-y-4">
                <div className="flex items-center justify-between border-b border-[#E2E6EE] pb-3">
                  <h3 className="text-sm font-bold text-[#1F2A44]">Today&apos;s classes</h3>
                  <span className="text-[11px] font-mono text-[#5C6A87]">WED 10 SEPT</span>
                </div>

                <div className="space-y-4 relative pl-4 border-l border-[#E2E6EE]">
                  {todaysClasses.map((item, idx) => (
                    <div key={idx} className="relative space-y-1">
                      <span
                        className={`w-2.5 h-2.5 rounded-full absolute -left-[21px] top-1 ${item.dot}`}
                      ></span>
                      <div className="flex items-baseline gap-2">
                        <span className="text-xs font-mono font-bold text-[#1F2A44]">{item.time}</span>
                        <span className="text-xs font-bold text-[#141B2E]">{item.subject}</span>
                      </div>
                      <span className="text-[11px] font-mono text-[#5C6A87] block">
                        {item.detail}
                      </span>
                    </div>
                  ))}
                </div>

                <div className="pt-2 border-t border-[#E2E6EE]">
                  <button
                    onClick={() => setActiveTab("WEEKLY")}
                    className="w-full py-2.5 bg-[#FAF7F0] hover:bg-[#EEF0F4] text-[#1F2A44] font-bold text-xs rounded-xl border border-[#E2E6EE] flex items-center justify-center gap-2 transition-colors"
                  >
                    <Calendar className="w-4 h-4 text-[#5C6A87]" />
                    <span>Full timetable</span>
                  </button>
                </div>
              </div>
            </div>
          ) : (
            /* Tab View 2: Full Weekly Matrix */
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
          )}
        </main>

        {/* Bottom Ledger Footer */}
        <footer className="px-8 py-3 border-t border-[#E2E6EE] bg-[#FAF7F0] flex items-center justify-between text-[11px] font-mono text-[#5C6A87]">
          <span>STUDENT TIMETABLE REGISTERED · KWAME ASANTE</span>
          <span>ASHFORD GRAMMAR — 2026 - 2027</span>
        </footer>
      </div>

      {/* Student Tasks Modal */}
      <StudentTasksModal isOpen={isTasksModalOpen} onClose={() => setIsTasksModalOpen(false)} />
    </div>
  );
}

export default function TimetablePage() {
  return (
    <Suspense fallback={<div className="p-8 font-mono text-[#33415F] text-xs">Loading Timetable...</div>}>
      <TimetableContent />
    </Suspense>
  );
}
