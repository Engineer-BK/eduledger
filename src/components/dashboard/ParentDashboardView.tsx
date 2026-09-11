"use client";

import { useState } from "react";
import Link from "next/link";
import {
  CreditCard,
  CheckSquare,
  Bell,
  Calendar,
  ChevronRight,
  AlertTriangle,
} from "lucide-react";
import PayFeesModal from "../modals/PayFeesModal";

export default function ParentDashboardView() {
  const [isPayModalOpen, setIsPayModalOpen] = useState(false);
  const [feeStatusPaid, setFeeStatusPaid] = useState(false);

  const announcements = [
    {
      id: "1",
      title: "Half-term fees due Friday 12 Sept",
      author: "Bursar",
      time: "2h ago",
      tag: "FEES",
      tagColor: "border-redpen",
    },
    {
      id: "2",
      title: "Parents evening sign-up opens Monday",
      author: "Head office",
      time: "Yesterday",
      tag: "EVENT",
      tagColor: "border-brass-500",
    },
    {
      id: "3",
      title: "Kwame: A- in Physics — well done",
      author: "Mrs Mensah",
      time: "Yesterday",
      tag: "GRADE",
      tagColor: "border-chalk",
    },
    {
      id: "4",
      title: "Bus route 4 delayed 10 min Thursday",
      author: "Transport",
      time: "2 days ago",
      tag: "INFO",
      tagColor: "border-ink-800",
    },
  ];

  const kwamesDay = [
    {
      time: "08:30",
      activity: "Assembly — Main hall",
      status: "Present • 08:32",
      dot: "bg-chalk",
    },
    {
      time: "09:15",
      activity: "Mathematics",
      status: "Room 12 • Mr Osei",
      dot: "bg-chalk",
    },
    {
      time: "11:00",
      activity: "Physics",
      status: "Lab 2 • Mrs Mensah",
      dot: "bg-brass-500 ring-4 ring-brass-100",
    },
    {
      time: "15:30",
      activity: "Pick-up — Gate B",
      status: "Bus route 4 • 15:45",
      dot: "bg-ink-300",
    },
  ];

  return (
    <div className="space-y-6">
      {/* 👑 Welcome Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-extrabold text-ink-900 tracking-tight">
            Welcome back, Efua
          </h1>
          <p className="text-xs text-ink-500 mt-1">
            Wednesday, 10 September 2026 • Following Kwame (Year 11, House Volta).
          </p>
        </div>

        <div>
          <button
            onClick={() => setIsPayModalOpen(true)}
            className="px-5 py-2.5 rounded-xl bg-brass-500 hover:bg-brass-600 text-white font-bold text-xs shadow-md hover:shadow transition-all flex items-center gap-2"
          >
            <CreditCard className="w-4 h-4" />
            {feeStatusPaid ? "Fee receipt" : "Pay fees"}
          </button>
        </div>
      </div>

      {/* 📊 Top Metric Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Kwame's attendance */}
        <div className="bg-white p-5 rounded-2xl border border-ink-200 shadow-2xs space-y-3 relative overflow-hidden">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-ink-500">Kwame&apos;s attendance</span>
            <div className="w-8 h-8 rounded-xl bg-chalk-bg text-chalk flex items-center justify-center">
              <CheckSquare className="w-4 h-4" />
            </div>
          </div>
          <div>
            <span className="text-3xl font-black font-ledger-mono text-ink-900 block">
              96.4%
            </span>
            <span className="text-[11px] font-mono text-chalk font-semibold mt-1 block">
              21-day present streak
            </span>
          </div>
        </div>

        {/* Latest notice */}
        <div className="bg-white p-5 rounded-2xl border border-ink-200 shadow-2xs space-y-3 relative overflow-hidden">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-ink-500">Latest notice</span>
            <div className="w-8 h-8 rounded-xl bg-ink-50 text-ink-600 flex items-center justify-center">
              <Bell className="w-4 h-4" />
            </div>
          </div>
          <div>
            <span className="text-xl font-bold text-ink-900 block">Athletics</span>
            <span className="text-[11px] font-mono text-ink-400 mt-1 block">
              Heats Thursday • kit needed
            </span>
          </div>
        </div>

        {/* Fee due date */}
        <div className="bg-white p-5 rounded-2xl border border-ink-200 shadow-2xs space-y-3 relative overflow-hidden">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-ink-500">Fee due date</span>
            <div className="w-8 h-8 rounded-xl bg-brass-100 text-brass-700 flex items-center justify-center">
              <CreditCard className="w-4 h-4" />
            </div>
          </div>
          <div>
            <span className="text-3xl font-black font-ledger-mono text-brass-700 block">
              12 SEPT
            </span>
            <span className="text-[11px] font-mono text-redpen font-semibold mt-1 block">
              {feeStatusPaid ? "₵ 0.00 • Paid in full" : "₵ 1,850 • half-term balance"}
            </span>
          </div>
        </div>
      </div>

      {/* 💳 Urgent Fee Banner (Ink Navy Dark Field) */}
      <div className="p-4 bg-ink-800 text-paper rounded-2xl border border-ink-700 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 shadow-lg">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-brass-500 text-ink-900 flex items-center justify-center shrink-0">
            <CreditCard className="w-5 h-5 text-ink-900" />
          </div>
          <div>
            <span className="text-xs font-bold text-white">
              {feeStatusPaid
                ? "Half-term balance of ₵ 1,850.00 is settled."
                : "Half-term balance of ₵ 1,850 due Friday."}
            </span>
            <span className="text-xs text-ink-200 ml-1">
              Late penalty applies from Monday.
            </span>
          </div>
        </div>

        <div className="flex items-center gap-4 text-xs font-mono shrink-0">
          <span className="text-[11px] font-bold text-brass-300">
            DUE 12 SEPT
          </span>
          <button
            onClick={() => setIsPayModalOpen(true)}
            className="px-4 py-2 rounded-xl bg-brass-500 hover:bg-brass-400 text-ink-900 font-bold transition-all"
          >
            {feeStatusPaid ? "View Receipt" : "Pay now"}
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

        {/* Right: Kwame's Day Timeline */}
        <div className="lg:col-span-5 bg-white p-6 rounded-2xl border border-ink-200 shadow-2xs space-y-4">
          <div className="flex items-center justify-between border-b border-ink-100 pb-3">
            <h3 className="text-sm font-bold text-ink-800">Kwame&apos;s day</h3>
            <span className="text-[11px] font-mono text-ink-400">WED 10 SEPT</span>
          </div>

          <div className="space-y-4 relative pl-4 border-l border-ink-200">
            {kwamesDay.map((slot, idx) => (
              <div key={idx} className="relative space-y-1">
                <span
                  className={`w-2.5 h-2.5 rounded-full absolute -left-[21px] top-1 ${slot.dot}`}
                ></span>
                <div className="flex items-baseline gap-2">
                  <span className="text-xs font-mono font-bold text-ink-800">{slot.time}</span>
                  <span className="text-xs font-bold text-ink-900">{slot.activity}</span>
                </div>
                <span className="text-[11px] font-mono text-ink-400 block">
                  {slot.status}
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

      {/* Pay Fees Modal */}
      <PayFeesModal
        isOpen={isPayModalOpen}
        onClose={() => setIsPayModalOpen(false)}
        onPaymentSuccess={() => setFeeStatusPaid(true)}
      />
    </div>
  );
}
