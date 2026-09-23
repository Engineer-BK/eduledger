"use client";

import { useState, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import Sidebar from "@/components/layout/Sidebar";
import TopNav from "@/components/layout/TopNav";
import TakeRegisterModal from "@/components/modals/TakeRegisterModal";
import NewAssignmentModal from "@/components/modals/NewAssignmentModal";
import {
  ClassItem,
  INITIAL_LESSONS,
  getStoredClasses,
} from "@/lib/classes";
import {
  CheckSquare,
  Plus,
  Users,
  BookOpen,
  Hourglass,
  ChevronRight,
  School,
  Calendar,
  Search,
  CheckCircle2,
} from "lucide-react";

function ClassesContent() {
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
  const [classesList, setClassesList] = useState<ClassItem[]>([]);
  const [searchQuery, setSearchQuery] = useState<string>("");

  // Modals state
  const [isRegisterOpen, setIsRegisterOpen] = useState(false);
  const [isAssignmentOpen, setIsAssignmentOpen] = useState(false);
  const [selectedRosterClass, setSelectedRosterClass] = useState<ClassItem | null>(null);

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

    setClassesList(getStoredClasses());

    const handleSync = () => {
      setClassesList(getStoredClasses());
    };
    window.addEventListener("eduledger_classes_updated", handleSync);
    return () => {
      window.removeEventListener("eduledger_classes_updated", handleSync);
    };
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
      title: "Lab 2 projector replaced — test before Period 3",
      author: "Facilities",
      time: "1h ago",
      tag: "STAFF",
      tagColor: "border-brass-500",
    },
    {
      id: "2",
      title: "Year 11 mock revision packs ready to collect",
      author: "Head of Science",
      time: "Yesterday",
      tag: "INFO",
      tagColor: "border-ink-800",
    },
    {
      id: "3",
      title: "Cover needed: Year 8 Maths, Period 5 Friday",
      author: "Timetable office",
      time: "Yesterday",
      tag: "COVER",
      tagColor: "border-redpen",
    },
    {
      id: "4",
      title: "Department meeting moved to Thursday 14:00",
      author: "Head office",
      time: "2 days ago",
      tag: "STAFF",
      tagColor: "border-ink-800",
    },
  ];

  const filteredClasses = classesList.filter((cls) => {
    if (!searchQuery.trim()) return true;
    const q = searchQuery.toLowerCase();
    return (
      cls.name.toLowerCase().includes(q) ||
      cls.subject.toLowerCase().includes(q) ||
      cls.room.toLowerCase().includes(q) ||
      cls.teacherName.toLowerCase().includes(q)
    );
  });

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
                Welcome back, {userName ? userName.split(" ")[0] : "Ama"}
              </h1>
              <p className="text-xs text-[#5C6A87] mt-1 font-medium">
                Wednesday, 10 September 2026 · 4 lessons today, first at 09:15 in Lab 2.
              </p>
            </div>

            <div className="flex items-center gap-3">
              <button
                onClick={() => setIsRegisterOpen(true)}
                className="px-4 py-2.5 rounded-xl bg-white border border-[#E2E6EE] hover:border-[#B7BECC] text-[#141B2E] font-bold text-xs shadow-2xs transition-all flex items-center gap-2"
              >
                <CheckSquare className="w-4 h-4 text-[#5C6A87]" />
                Take register
              </button>
              <button
                onClick={() => setIsAssignmentOpen(true)}
                className="px-4 py-2.5 rounded-xl bg-[#B8862B] hover:bg-[#A27221] text-white font-bold text-xs shadow-xs transition-all flex items-center gap-1.5"
              >
                <Plus className="w-4 h-4" />
                New assignment
              </button>
            </div>
          </div>

          {/* Metric Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Classes today */}
            <div className="bg-white p-5 rounded-2xl border border-[#E2E6EE] shadow-2xs space-y-3 relative overflow-hidden">
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold text-[#5C6A87]">Classes today</span>
                <div className="w-8 h-8 rounded-xl bg-[#EEF0F4] flex items-center justify-center text-[#5C6A87]">
                  <Users className="w-4 h-4" />
                </div>
              </div>
              <div>
                <span className="text-3xl font-black font-ledger-mono text-[#141B2E] block">4</span>
                <span className="text-[11px] font-mono text-[#5C6A87] mt-1 block">
                  Next: Yr 11 Physics · 11:00
                </span>
              </div>
            </div>

            {/* Students present */}
            <div className="bg-white p-5 rounded-2xl border border-[#E2E6EE] shadow-2xs space-y-3 relative overflow-hidden">
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold text-[#5C6A87]">Students present</span>
                <div className="w-8 h-8 rounded-xl bg-[#EAF2EC] text-[#2F4B3C] flex items-center justify-center">
                  <CheckSquare className="w-4 h-4" />
                </div>
              </div>
              <div>
                <span className="text-3xl font-black font-ledger-mono text-[#141B2E] block">
                  118 / 126
                </span>
                <span className="text-[11px] font-mono text-[#2F4B3C] font-bold mt-1 block">
                  93.7% across your classes
                </span>
              </div>
            </div>

            {/* To grade */}
            <div className="bg-white p-5 rounded-2xl border border-[#E2E6EE] shadow-2xs space-y-3 relative overflow-hidden">
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold text-[#5C6A87]">To grade</span>
                <div className="w-8 h-8 rounded-xl bg-[#F3E3C4] text-[#8C6420] flex items-center justify-center">
                  <BookOpen className="w-4 h-4" />
                </div>
              </div>
              <div>
                <span className="text-3xl font-black font-ledger-mono text-[#8C6420] block">32</span>
                <span className="text-[11px] font-mono text-[#5C6A87] mt-1 block">
                  Yr 10 lab reports · due Fri
                </span>
              </div>
            </div>
          </div>

          {/* Urgent Grading Callout Banner */}
          <div className="p-4 bg-[#FAF7F0] rounded-2xl border border-[#D9AF5D] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 shadow-2xs">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-[#F3E3C4] text-[#8C6420] flex items-center justify-center shrink-0">
                <Hourglass className="w-5 h-5 text-[#A27221]" />
              </div>
              <div>
                <span className="text-xs font-bold text-[#1F2A44]">
                  32 lab reports awaiting marks.
                </span>
                <span className="text-xs text-[#5C6A87] ml-1">
                  Grades publish to parents on Friday at 15:00.
                </span>
              </div>
            </div>

            <div className="flex items-center gap-4 text-xs font-mono shrink-0">
              <span className="text-[11px] font-bold text-[#8C6420] bg-[#F3E3C4] px-2.5 py-1 rounded">
                DUE FRI 15:00
              </span>
              <Link
                href="/dashboard/gradebook"
                className="px-4 py-2 rounded-xl bg-white border border-[#E2E6EE] hover:border-[#B7BECC] text-[#1F2A44] font-bold transition-all"
              >
                Open gradebook
              </Link>
            </div>
          </div>

          {/* 2-Column Section */}
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

            {/* Right: Today's Lessons Timeline */}
            <div className="lg:col-span-5 bg-white p-6 rounded-2xl border border-[#E2E6EE] shadow-2xs space-y-4">
              <div className="flex items-center justify-between border-b border-[#E2E6EE] pb-3">
                <h3 className="text-sm font-bold text-[#1F2A44]">Today&apos;s lessons</h3>
                <span className="text-[11px] font-mono text-[#5C6A87]">WED 10 SEPT</span>
              </div>

              <div className="space-y-4 relative pl-4 border-l border-[#E2E6EE]">
                {INITIAL_LESSONS.map((lesson, idx) => (
                  <div key={idx} className="relative space-y-1">
                    <span
                      className={`w-2.5 h-2.5 rounded-full absolute -left-[21px] top-1 ${lesson.dot}`}
                    ></span>
                    <div className="flex items-baseline gap-2">
                      <span className="text-xs font-mono font-bold text-[#1F2A44]">{lesson.time}</span>
                      <span className="text-xs font-bold text-[#141B2E]">{lesson.subject}</span>
                    </div>
                    <div className="text-[11px] font-mono text-[#5C6A87] flex items-center justify-between">
                      <span>{lesson.room}</span>
                      <span className="text-[#8C6420] font-semibold">{lesson.status}</span>
                    </div>
                  </div>
                ))}
              </div>

              <div className="pt-2 border-t border-[#E2E6EE]">
                <Link
                  href="/dashboard/timetable"
                  className="w-full py-2.5 bg-[#FAF7F0] hover:bg-[#EEF0F4] text-[#1F2A44] font-bold text-xs rounded-xl border border-[#E2E6EE] flex items-center justify-center gap-2 transition-colors"
                >
                  <Calendar className="w-4 h-4 text-[#5C6A87]" />
                  <span>Full timetable</span>
                </Link>
              </div>
            </div>
          </div>

          {/* All Classes Directory Grid */}
          <div className="bg-white p-6 rounded-2xl border border-[#E2E6EE] shadow-2xs space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-[#E2E6EE] pb-4">
              <div className="flex items-center gap-2">
                <School className="w-5 h-5 text-[#B8862B]" />
                <h2 className="text-base font-extrabold text-[#141B2E] font-serif">
                  Academic Classes Directory
                </h2>
              </div>

              <div className="relative w-full sm:w-64">
                <Search className="w-4 h-4 absolute left-3 top-2.5 text-[#8895B0]" />
                <input
                  type="text"
                  placeholder="Filter classes..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-9 pr-3 py-1.5 bg-[#FAF7F0] border border-[#E2E6EE] rounded-xl text-xs text-[#141B2E] focus:outline-none focus:border-[#B8862B]"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {filteredClasses.map((cls) => (
                <div
                  key={cls.id}
                  className="p-4 rounded-xl border border-[#E2E6EE] bg-[#FAF7F0]/40 hover:bg-white hover:border-[#B7BECC] hover:shadow-xs transition-all space-y-3"
                >
                  <div className="flex items-start justify-between">
                    <div>
                      <span className="text-[10px] font-mono uppercase tracking-wider text-[#B8862B] font-bold">
                        {cls.gradeLevel} · {cls.subject}
                      </span>
                      <h3 className="text-sm font-extrabold text-[#141B2E] font-serif mt-0.5">
                        {cls.name}
                      </h3>
                    </div>
                    <span className="px-2 py-0.5 bg-[#EAF2EC] text-[#2F4B3C] border border-[#2F4B3C]/30 text-[10px] font-mono font-bold rounded">
                      {cls.attendanceRate}% ATTENDANCE
                    </span>
                  </div>

                  <p className="text-xs text-[#5C6A87] line-clamp-2">
                    {cls.description}
                  </p>

                  <div className="grid grid-cols-2 gap-2 text-[11px] font-mono text-[#33415F] pt-2 border-t border-[#E2E6EE]">
                    <div>
                      <span className="text-[#8895B0] block text-[9px] uppercase">Room</span>
                      <span className="font-bold">{cls.room}</span>
                    </div>
                    <div>
                      <span className="text-[#8895B0] block text-[9px] uppercase">Students</span>
                      <span className="font-bold">{cls.presentCount} / {cls.studentCount}</span>
                    </div>
                  </div>

                  <div className="pt-2 flex items-center justify-between">
                    <span className="text-[11px] font-mono text-[#5C6A87]">
                      {cls.scheduleTime}
                    </span>
                    <button
                      onClick={() => alert(`Class Roster for ${cls.name}: ${cls.studentCount} students enrolled.`)}
                      className="px-3 py-1 rounded-lg bg-[#1F2A44] hover:bg-[#141B2E] text-white font-semibold text-xs transition-colors"
                    >
                      View Roster
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </main>

        {/* Bottom Ledger Footer */}
        <footer className="px-8 py-3 border-t border-[#E2E6EE] bg-[#FAF7F0] flex items-center justify-between text-[11px] font-mono text-[#5C6A87]">
          <span>CLASSES REGISTRY · ASHFORD ACADEMICS</span>
          <span>ASHFORD GRAMMAR — 2026 - 2027</span>
        </footer>
      </div>

      {/* Modals */}
      <TakeRegisterModal isOpen={isRegisterOpen} onClose={() => setIsRegisterOpen(false)} />
      <NewAssignmentModal isOpen={isAssignmentOpen} onClose={() => setIsAssignmentOpen(false)} />
    </div>
  );
}

export default function ClassesPage() {
  return (
    <Suspense fallback={<div className="p-8 font-mono text-[#33415F] text-xs">Loading EduLedger Classes...</div>}>
      <ClassesContent />
    </Suspense>
  );
}
