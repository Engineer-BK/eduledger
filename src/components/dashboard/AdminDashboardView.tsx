"use client";

import Link from "next/link";
import {
  GraduationCap,
  Users,
  CheckSquare,
  CreditCard,
  Download,
  Plus,
  AlertTriangle,
  ChevronRight,
} from "lucide-react";

export default function AdminDashboardView() {
  const announcements = [
    {
      id: "1",
      title: "Half-term fees due Friday — late penalty from Monday",
      author: "Bursar",
      time: "2h ago",
      tag: "URGENT",
      tagColor: "border-redpen",
    },
    {
      id: "2",
      title: "Inter-house athletics heats moved to Field B",
      author: "Sports dept",
      time: "Yesterday",
      tag: "EVENT",
      tagColor: "border-brass-500",
    },
    {
      id: "3",
      title: "Library extends evening hours to 7 pm",
      author: "Library",
      time: "2 days ago",
      tag: "INFO",
      tagColor: "border-chalk",
    },
    {
      id: "4",
      title: "Staff briefing notes for Week 2 published",
      author: "Head office",
      time: "3 days ago",
      tag: "STAFF",
      tagColor: "border-ink-800",
    },
  ];

  const todaySchedule = [
    {
      time: "08:30",
      activity: "Assembly — Main hall",
      detail: "All years • Headmistress",
      dot: "bg-chalk",
    },
    {
      time: "09:15",
      activity: "Gate & register audit",
      detail: "Admin block • Registrar",
      dot: "bg-chalk",
    },
    {
      time: "11:00",
      activity: "Fee defaulters review",
      detail: "Bursar office",
      dot: "bg-brass-500 ring-4 ring-brass-100",
    },
    {
      time: "13:30",
      activity: "Staff briefing — Week 3 prep",
      detail: "Staff room",
      dot: "bg-ink-300",
    },
  ];

  return (
    <div className="space-y-6">
      {/* 👑 Welcome Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-extrabold text-ink-900 tracking-tight">
            Welcome back, Janet
          </h1>
          <p className="text-xs text-ink-500 mt-1">
            Wednesday, 10 September 2026 • Term 1, Week 2 — here is the school at a glance.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => alert("Attendance register exported as CSV/PDF.")}
            className="px-4 py-2.5 rounded-xl bg-white border border-ink-200 hover:border-ink-400 text-ink-800 font-bold text-xs shadow-2xs transition-all flex items-center gap-2"
          >
            <Download className="w-4 h-4 text-ink-600" />
            Export register
          </button>
          <button
            onClick={() => alert("New registry entry modal launched.")}
            className="px-4 py-2.5 rounded-xl bg-brass-500 hover:bg-brass-600 text-white font-bold text-xs shadow-sm hover:shadow transition-all flex items-center gap-1.5"
          >
            <Plus className="w-4 h-4" />
            New entry
          </button>
        </div>
      </div>

      {/* 📊 Top Metric Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Total students */}
        <div className="bg-white p-5 rounded-2xl border border-ink-200 shadow-2xs space-y-3 relative overflow-hidden">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-ink-500">Total students</span>
            <div className="w-8 h-8 rounded-xl bg-ink-50 text-ink-600 flex items-center justify-center">
              <GraduationCap className="w-4 h-4" />
            </div>
          </div>
          <div>
            <span className="text-3xl font-black font-ledger-mono text-ink-900 block">
              1,284
            </span>
            <span className="text-[11px] font-mono text-ink-400 mt-1 block">
              +18 this term • 42 classes
            </span>
          </div>
        </div>

        {/* Total teachers */}
        <div className="bg-white p-5 rounded-2xl border border-ink-200 shadow-2xs space-y-3 relative overflow-hidden">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-ink-500">Total teachers</span>
            <div className="w-8 h-8 rounded-xl bg-ink-50 text-ink-600 flex items-center justify-center">
              <Users className="w-4 h-4" />
            </div>
          </div>
          <div>
            <span className="text-3xl font-black font-ledger-mono text-ink-900 block">96</span>
            <span className="text-[11px] font-mono text-ink-400 mt-1 block">
              4 on leave today
            </span>
          </div>
        </div>

        {/* Today's attendance */}
        <div className="bg-white p-5 rounded-2xl border border-ink-200 shadow-2xs space-y-3 relative overflow-hidden">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-ink-500">Today&apos;s attendance</span>
            <div className="w-8 h-8 rounded-xl bg-chalk-bg text-chalk flex items-center justify-center">
              <CheckSquare className="w-4 h-4" />
            </div>
          </div>
          <div>
            <span className="text-3xl font-black font-ledger-mono text-ink-900 block">
              94.2%
            </span>
            <span className="text-[11px] font-mono text-chalk font-semibold mt-1 block">
              1,209 present • 75 absent
            </span>
          </div>
        </div>

        {/* Pending fee dues */}
        <div className="bg-white p-5 rounded-2xl border border-ink-200 shadow-2xs space-y-3 relative overflow-hidden">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-ink-500">Pending fee dues</span>
            <div className="w-8 h-8 rounded-xl bg-brass-100 text-brass-700 flex items-center justify-center">
              <CreditCard className="w-4 h-4" />
            </div>
          </div>
          <div>
            <span className="text-3xl font-black font-ledger-mono text-brass-700 block">
              ₵ 48,200
            </span>
            <span className="text-[11px] font-mono text-redpen font-semibold mt-1 block">
              132 overdue accounts
            </span>
          </div>
        </div>
      </div>

      {/* 💳 Overdue Fee Accounts Alert (Dark Navy Field) */}
      <div className="p-4 bg-ink-800 text-paper rounded-2xl border border-ink-700 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 shadow-lg">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-brass-500 text-ink-900 flex items-center justify-center shrink-0">
            <AlertTriangle className="w-5 h-5 text-ink-900" />
          </div>
          <div>
            <span className="text-xs font-bold text-white">
              132 fee accounts overdue past Friday deadline.
            </span>
            <span className="text-xs text-ink-200 ml-1">
              Send reminders before the late penalty applies.
            </span>
          </div>
        </div>

        <div className="flex items-center gap-4 text-xs font-mono shrink-0">
          <span className="text-[11px] font-bold text-brass-300">
            ₵ 48,200 OPEN
          </span>
          <Link
            href="/dashboard/fees"
            className="px-4 py-2 rounded-xl bg-brass-500 hover:bg-brass-400 text-ink-900 font-bold transition-all"
          >
            Review dues
          </Link>
        </div>
      </div>

      {/* 📰 Bottom 2-Column Section */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left: Recent Announcements */}
        <div className="lg:col-span-7 bg-white p-6 rounded-2xl border border-ink-200 shadow-2xs space-y-4">
          <div className="flex items-center justify-between border-b border-ink-100 pb-3">
            <h3 className="text-sm font-bold text-ink-800">Recent announcements</h3>
            <Link
              href="/dashboard/announcements"
              className="text-xs font-semibold text-brass-700 hover:text-brass-800 flex items-center gap-1"
            >
              View all <ChevronRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="space-y-3">
            {announcements.map((item) => (
              <div
                key={item.id}
                className="p-3.5 rounded-xl border border-ink-100 hover:border-ink-200 bg-paper/60 flex items-center justify-between gap-3 text-xs transition-colors"
              >
                <div className="flex items-start gap-3">
                  <span className={`w-1.5 h-8 rounded-full border-l-2 ${item.tagColor} shrink-0`}></span>
                  <div>
                    <h4 className="font-bold text-ink-800 leading-snug">{item.title}</h4>
                    <span className="text-[10px] font-mono text-ink-400">
                      {item.author} • {item.time}
                    </span>
                  </div>
                </div>
                <span className="text-[10px] font-mono font-semibold px-2 py-0.5 border border-ink-200 rounded text-ink-500 bg-white shrink-0">
                  {item.tag}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Right: Today's Schedule Timeline */}
        <div className="lg:col-span-5 bg-white p-6 rounded-2xl border border-ink-200 shadow-2xs space-y-4">
          <div className="flex items-center justify-between border-b border-ink-100 pb-3">
            <h3 className="text-sm font-bold text-ink-800">Today&apos;s schedule</h3>
            <span className="text-[11px] font-mono text-ink-400">WED 10 SEPT</span>
          </div>

          <div className="space-y-4 relative pl-4 border-l border-ink-200">
            {todaySchedule.map((slot, idx) => (
              <div key={idx} className="relative space-y-1">
                <span
                  className={`w-2.5 h-2.5 rounded-full absolute -left-[21px] top-1 ${slot.dot}`}
                ></span>
                <div className="flex items-baseline gap-2">
                  <span className="text-xs font-mono font-bold text-ink-800">{slot.time}</span>
                  <span className="text-xs font-bold text-ink-900">{slot.activity}</span>
                </div>
                <span className="text-[11px] font-mono text-ink-400 block">
                  {slot.detail}
                </span>
              </div>
            ))}
          </div>

          <div className="pt-2 border-t border-ink-100">
            <Link
              href="/dashboard/timetable"
              className="w-full py-2.5 bg-paper hover:bg-ink-50 text-ink-800 font-bold text-xs rounded-xl border border-ink-200 flex items-center justify-center gap-2 transition-colors"
            >
              <span>Full timetable</span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
