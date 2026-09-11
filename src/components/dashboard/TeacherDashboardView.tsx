"use client";

import { useState } from "react";
import Link from "next/link";
import {
  CheckSquare,
  Plus,
  Users,
  FileSpreadsheet,
  BookOpen,
  ArrowRight,
  Clock,
  ChevronRight,
  Hourglass,
} from "lucide-react";
import TakeRegisterModal from "../modals/TakeRegisterModal";

export default function TeacherDashboardView() {
  const [isRegisterOpen, setIsRegisterOpen] = useState(false);

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

  const lessons = [
    {
      time: "09:15",
      subject: "Year 9 • Mathematics",
      room: "Room 12",
      status: "Register taken",
      dot: "bg-chalk",
    },
    {
      time: "11:00",
      subject: "Year 11 • Physics",
      room: "Lab 2",
      status: "Up next",
      dot: "bg-brass-500 ring-4 ring-brass-100",
    },
    {
      time: "13:00",
      subject: "Year 10 • Double Physics",
      room: "Lab 2",
      status: "Lab reports",
      dot: "bg-brass-500",
    },
    {
      time: "14:45",
      subject: "Science club",
      room: "Lab 1",
      status: "Voluntary",
      dot: "bg-ink-300",
    },
  ];

  return (
    <div className="space-y-6">
      {/* 👑 Welcome Header Strip */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-extrabold text-ink-900 tracking-tight">
            Welcome back, Ama
          </h1>
          <p className="text-xs text-ink-500 mt-1">
            Wednesday, 10 September 2026 • 4 lessons today, first at 09:15 in Lab 2.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => setIsRegisterOpen(true)}
            className="px-4 py-2.5 rounded-xl bg-white border border-ink-200 hover:border-ink-400 text-ink-800 font-bold text-xs shadow-2xs transition-all flex items-center gap-2"
          >
            <CheckSquare className="w-4 h-4 text-ink-600" />
            Take register
          </button>
          <button
            onClick={() => alert("New assignment creation modal launched.")}
            className="px-4 py-2.5 rounded-xl bg-brass-500 hover:bg-brass-600 text-white font-bold text-xs shadow-sm hover:shadow transition-all flex items-center gap-1.5"
          >
            <Plus className="w-4 h-4" />
            New assignment
          </button>
        </div>
      </div>

      {/* 📊 Top Metric Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Classes today */}
        <div className="bg-white p-5 rounded-2xl border border-ink-200 shadow-2xs space-y-3 relative overflow-hidden">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-ink-500">Classes today</span>
            <div className="w-8 h-8 rounded-xl bg-ink-50 flex items-center justify-center text-ink-600">
              <Users className="w-4 h-4" />
            </div>
          </div>
          <div>
            <span className="text-3xl font-black font-ledger-mono text-ink-900 block">4</span>
            <span className="text-[11px] font-mono text-ink-400 mt-1 block">
              Next: Yr 11 Physics • 11:00
            </span>
          </div>
        </div>

        {/* Students present */}
        <div className="bg-white p-5 rounded-2xl border border-ink-200 shadow-2xs space-y-3 relative overflow-hidden">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-ink-500">Students present</span>
            <div className="w-8 h-8 rounded-xl bg-chalk-bg text-chalk flex items-center justify-center">
              <CheckSquare className="w-4 h-4" />
            </div>
          </div>
          <div>
            <span className="text-3xl font-black font-ledger-mono text-ink-900 block">
              118 / 126
            </span>
            <span className="text-[11px] font-mono text-chalk font-semibold mt-1 block">
              93.7% across your classes
            </span>
          </div>
        </div>

        {/* To grade */}
        <div className="bg-white p-5 rounded-2xl border border-ink-200 shadow-2xs space-y-3 relative overflow-hidden">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-ink-500">To grade</span>
            <div className="w-8 h-8 rounded-xl bg-brass-100 text-brass-700 flex items-center justify-center">
              <BookOpen className="w-4 h-4" />
            </div>
          </div>
          <div>
            <span className="text-3xl font-black font-ledger-mono text-brass-700 block">32</span>
            <span className="text-[11px] font-mono text-ink-400 mt-1 block">
              Yr 10 lab reports • due Fri
            </span>
          </div>
        </div>
      </div>

      {/* ⏳ Urgent Grading Callout Banner */}
      <div className="p-4 bg-paper rounded-2xl border border-brass-300 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 shadow-xs">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-brass-100 text-brass-700 flex items-center justify-center shrink-0">
            <Hourglass className="w-5 h-5 text-brass-600" />
          </div>
          <div>
            <span className="text-xs font-bold text-ink-800">
              32 lab reports awaiting marks.
            </span>
            <span className="text-xs text-ink-500 ml-1">
              Grades publish to parents on Friday at 15:00.
            </span>
          </div>
        </div>

        <div className="flex items-center gap-4 text-xs font-mono shrink-0">
          <span className="text-[11px] font-bold text-brass-700 bg-brass-100 px-2.5 py-1 rounded">
            DUE FRI 15:00
          </span>
          <Link
            href="/dashboard/gradebook"
            className="px-4 py-2 rounded-xl bg-white border border-ink-200 hover:border-ink-400 text-ink-800 font-bold transition-all"
          >
            Open gradebook
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

        {/* Right: Today's Lessons Timeline */}
        <div className="lg:col-span-5 bg-white p-6 rounded-2xl border border-ink-200 shadow-2xs space-y-4">
          <div className="flex items-center justify-between border-b border-ink-100 pb-3">
            <h3 className="text-sm font-bold text-ink-800">Today&apos;s lessons</h3>
            <span className="text-[11px] font-mono text-ink-400">WED 10 SEPT</span>
          </div>

          <div className="space-y-4 relative pl-4 border-l border-ink-200">
            {lessons.map((lesson, idx) => (
              <div key={idx} className="relative space-y-1">
                <span
                  className={`w-2.5 h-2.5 rounded-full absolute -left-[21px] top-1 ${lesson.dot}`}
                ></span>
                <div className="flex items-baseline gap-2">
                  <span className="text-xs font-mono font-bold text-ink-800">{lesson.time}</span>
                  <span className="text-xs font-bold text-ink-900">{lesson.subject}</span>
                </div>
                <div className="text-[11px] font-mono text-ink-400 flex items-center justify-between pl-0">
                  <span>{lesson.room}</span>
                  <span className="text-brass-700 font-semibold">{lesson.status}</span>
                </div>
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

      {/* Attendance Register Modal */}
      <TakeRegisterModal isOpen={isRegisterOpen} onClose={() => setIsRegisterOpen(false)} />
    </div>
  );
}
