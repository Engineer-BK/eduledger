"use client";

import Link from "next/link";
import {
  CheckCircle2,
  BookOpen,
  Clock,
  ChevronRight,
  FileText,
} from "lucide-react";

export default function StudentDashboardView() {
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
      detail: "All years • Attended",
      dot: "bg-chalk",
    },
    {
      time: "09:15",
      subject: "Mathematics",
      detail: "Room 12 • Mr Osei",
      dot: "bg-chalk",
    },
    {
      time: "11:00",
      subject: "Physics",
      detail: "Lab 2 • Mrs Mensah",
      dot: "bg-brass-500 ring-4 ring-brass-100",
    },
    {
      time: "13:30",
      subject: "English Literature",
      detail: "Room 7 • Miss Boadu",
      dot: "bg-ink-300",
    },
  ];

  return (
    <div className="space-y-6">
      {/* 👑 Welcome Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-extrabold text-ink-900 tracking-tight">
            Welcome back, Kwame
          </h1>
          <p className="text-xs text-ink-500 mt-1">
            Wednesday, 10 September 2026 • Marked present at 08:32 this morning.
          </p>
        </div>

        <div>
          <button
            onClick={() => alert("Assignments view opened.")}
            className="px-5 py-2.5 rounded-xl bg-brass-500 hover:bg-brass-600 text-white font-bold text-xs shadow-md hover:shadow transition-all flex items-center gap-2"
          >
            <BookOpen className="w-4 h-4" />
            My assignments
          </button>
        </div>
      </div>

      {/* 📊 Top Metric Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Today's status */}
        <div className="bg-white p-5 rounded-2xl border border-ink-200 shadow-2xs space-y-3 relative overflow-hidden">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-ink-500">Today&apos;s status</span>
            <div className="w-8 h-8 rounded-xl bg-chalk-bg text-chalk flex items-center justify-center">
              <CheckCircle2 className="w-4 h-4" />
            </div>
          </div>
          <div>
            <span className="text-2xl font-bold text-ink-900 block">Present</span>
            <span className="text-[11px] font-mono text-chalk font-semibold mt-1 block">
              Marked 08:32 • Gate A
            </span>
          </div>
        </div>

        {/* Latest grade */}
        <div className="bg-white p-5 rounded-2xl border border-ink-200 shadow-2xs space-y-3 relative overflow-hidden">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-ink-500">Latest grade</span>
            <div className="w-8 h-8 rounded-xl bg-brass-100 text-brass-700 flex items-center justify-center">
              <BookOpen className="w-4 h-4" />
            </div>
          </div>
          <div>
            <span className="text-3xl font-black font-ledger-mono text-ink-900 block">
              A - 88%
            </span>
            <span className="text-[11px] font-mono text-ink-400 mt-1 block">
              Physics • Motion &amp; forces
            </span>
          </div>
        </div>

        {/* Next class */}
        <div className="bg-white p-5 rounded-2xl border border-ink-200 shadow-2xs space-y-3 relative overflow-hidden">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-ink-500">Next class</span>
            <div className="w-8 h-8 rounded-xl bg-ink-50 text-ink-600 flex items-center justify-center">
              <Clock className="w-4 h-4" />
            </div>
          </div>
          <div>
            <span className="text-3xl font-black font-ledger-mono text-brass-700 block">
              11:00
            </span>
            <span className="text-[11px] font-mono text-ink-400 mt-1 block">
              Physics • Lab 2 • A. Mensah
            </span>
          </div>
        </div>
      </div>

      {/* 🧹 Chalkboard Green Present Streak Banner */}
      <div className="p-4 bg-chalk-bg rounded-2xl border border-chalk/30 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 shadow-xs">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-chalk text-white flex items-center justify-center shrink-0">
            <CheckCircle2 className="w-5 h-5 text-white" />
          </div>
          <div>
            <span className="text-xs font-bold text-ink-800">
              Present — streak of 21 days.
            </span>
            <span className="text-xs text-ink-600 ml-1">
              Two homework tasks due tomorrow.
            </span>
          </div>
        </div>

        <div className="flex items-center gap-4 text-xs font-mono shrink-0">
          <span className="text-[11px] font-bold text-chalk">
            2 DUE THU
          </span>
          <button
            onClick={() => alert("Homework tasks opened.")}
            className="px-4 py-2 rounded-xl bg-white border border-ink-200 hover:border-ink-400 text-ink-800 font-bold transition-all"
          >
            View tasks
          </button>
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

        {/* Right: Today's Classes Timeline */}
        <div className="lg:col-span-5 bg-white p-6 rounded-2xl border border-ink-200 shadow-2xs space-y-4">
          <div className="flex items-center justify-between border-b border-ink-100 pb-3">
            <h3 className="text-sm font-bold text-ink-800">Today&apos;s classes</h3>
            <span className="text-[11px] font-mono text-ink-400">WED 10 SEPT</span>
          </div>

          <div className="space-y-4 relative pl-4 border-l border-ink-200">
            {todaysClasses.map((item, idx) => (
              <div key={idx} className="relative space-y-1">
                <span
                  className={`w-2.5 h-2.5 rounded-full absolute -left-[21px] top-1 ${item.dot}`}
                ></span>
                <div className="flex items-baseline gap-2">
                  <span className="text-xs font-mono font-bold text-ink-800">{item.time}</span>
                  <span className="text-xs font-bold text-ink-900">{item.subject}</span>
                </div>
                <span className="text-[11px] font-mono text-ink-400 block">
                  {item.detail}
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
