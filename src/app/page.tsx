"use client";

import { useState } from "react";
import Link from "next/link";
import {
  CheckCircle2,
  XCircle,
  BookOpen,
  Calendar,
  Users,
  CreditCard,
  Bell,
  ArrowRight,
  ShieldCheck,
  Zap,
  Sparkles,
  ChevronRight,
  School,
  FileSpreadsheet,
  FileText,
  Clock,
  Smartphone,
  Layers,
} from "lucide-react";

export default function Home() {
  const [activeTab, setActiveTab] = useState<"attendance" | "fees" | "grades">("attendance");

  return (
    <div className="min-h-screen bg-paper flex flex-col font-sans selection:bg-brass-100 selection:text-brass-700">
      {/* 🧭 Top Navigation Header */}
      <header className="sticky top-0 z-50 bg-paper/90 backdrop-blur-md border-b border-ink-200/50 transition-all">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-ink-800 flex items-center justify-center text-brass-300 font-bold text-xl shadow-md border border-brass-500/30">
              <School className="w-5 h-5 text-brass-300" />
            </div>
            <div>
              <span className="text-xl font-extrabold text-ink-800 tracking-tight flex items-center gap-2">
                EduLedger
                <span className="text-[10px] font-semibold tracking-wider uppercase bg-brass-100 text-brass-700 px-2 py-0.5 rounded-full border border-brass-300">
                  School OS
                </span>
              </span>
            </div>
          </div>

          <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-ink-600">
            <a href="#features" className="hover:text-brass-600 transition-colors">
              Features
            </a>
            <a href="#screens" className="hover:text-brass-600 transition-colors">
              Preview Studio
            </a>
            <a href="#steps" className="hover:text-brass-600 transition-colors">
              How it Works
            </a>
            <a href="#pricing" className="hover:text-brass-600 transition-colors">
              Pricing
            </a>
          </nav>

          <div className="flex items-center gap-3">
            <Link
              href="/login"
              className="text-sm font-semibold text-ink-700 hover:text-ink-900 px-3 py-2 rounded-lg hover:bg-ink-50 transition-colors"
            >
              Sign In
            </Link>
            <Link
              href="/login"
              className="text-sm font-bold text-white bg-brass-500 hover:bg-brass-600 px-4 py-2.5 rounded-lg shadow-sm hover:shadow transition-all flex items-center gap-1.5"
            >
              Get Started
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </header>

      {/* 🚀 Hero Section */}
      <section className="relative pt-12 pb-20 md:pt-20 md:pb-28 overflow-hidden bg-gradient-to-b from-paper via-paper to-ink-50/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Left Copy Column */}
            <div className="lg:col-span-7 space-y-6">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-brass-100/80 border border-brass-300/60 text-brass-700 text-xs font-bold tracking-wide uppercase shadow-sm">
                <Sparkles className="w-3.5 h-3.5 text-brass-600" />
                Ledger &amp; Chalkboard Design System
              </div>

              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-ink-800 tracking-tight leading-[1.12]">
                Run your school on <br />
                <span className="underline decoration-brass-500 decoration-wavy decoration-2 underline-offset-4 text-ink-900">
                  one ledger
                </span>
                , not ten spreadsheets
              </h1>

              <p className="text-lg text-ink-600 leading-relaxed max-w-2xl font-normal">
                Academic record-keeping, attendance, grades, timetables, and fee management unified into a high-contrast ledger built for legibility.
              </p>

              <div className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
                <Link
                  href="/login"
                  className="px-6 py-3.5 rounded-xl bg-brass-500 hover:bg-brass-600 text-white font-bold text-center shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2 text-base"
                >
                  Enter Live Demo App
                  <ArrowRight className="w-5 h-5" />
                </Link>
                <a
                  href="#screens"
                  className="px-6 py-3.5 rounded-xl bg-paper hover:bg-ink-50 text-ink-800 font-semibold text-center border border-ink-200 shadow-sm transition-all flex items-center justify-center gap-2 text-base"
                >
                  View Screen Mockups
                </a>
              </div>

              <div className="flex items-center gap-6 pt-4 text-xs font-medium text-ink-400">
                <span className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-chalk" /> Free tier deployable
                </span>
                <span className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-chalk" /> No credit card required
                </span>
                <span className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-chalk" /> Role-based dashboards
                </span>
              </div>
            </div>

            {/* Right Interactive Hero Preview Mockup */}
            <div className="lg:col-span-5">
              <div className="relative mx-auto max-w-md lg:max-w-none">
                {/* Glow Backdrop */}
                <div className="absolute -inset-1.5 bg-gradient-to-r from-brass-500 to-chalk rounded-2xl blur-lg opacity-25"></div>

                {/* Dashboard Card */}
                <div className="relative bg-ink-800 text-paper rounded-2xl shadow-2xl border border-ink-600 overflow-hidden">
                  {/* Card Header Bar */}
                  <div className="px-5 py-3.5 bg-ink-900 border-b border-ink-700 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 rounded-full bg-redpen"></div>
                      <div className="w-3 h-3 rounded-full bg-brass-500"></div>
                      <div className="w-3 h-3 rounded-full bg-chalk"></div>
                      <span className="ml-2 text-xs font-mono text-ink-200">
                        ashford-grammar.eduledger.app
                      </span>
                    </div>
                    <span className="text-[11px] font-mono bg-ink-800 text-brass-300 px-2 py-0.5 rounded border border-ink-700">
                      LIVE
                    </span>
                  </div>

                  {/* Inner Mock Dashboard Content */}
                  <div className="p-5 space-y-4">
                    <div className="flex items-center justify-between pb-2 border-b border-ink-700">
                      <div>
                        <h3 className="text-sm font-bold text-white">Ashford Grammar</h3>
                        <p className="text-xs text-ink-200">Registrar &amp; Parent Overview</p>
                      </div>
                      <span className="text-xs font-mono text-brass-300 bg-ink-900 px-2.5 py-1 rounded-md border border-brass-500/30">
                        TERM 1 • 2026
                      </span>
                    </div>

                    {/* Stats Grid */}
                    <div className="grid grid-cols-2 gap-3">
                      <div className="bg-ink-900/90 p-3 rounded-xl border border-ink-700">
                        <span className="text-[11px] text-ink-200 block">Term Attendance</span>
                        <span className="text-xl font-bold font-ledger-mono text-chalk bg-chalk-bg/20 px-1.5 py-0.5 rounded text-chalk-light">
                          96.4%
                        </span>
                        <span className="text-[10px] text-chalk-light block mt-1">21-day streak</span>
                      </div>
                      <div className="bg-ink-900/90 p-3 rounded-xl border border-ink-700">
                        <span className="text-[11px] text-ink-200 block">Fee Due Date</span>
                        <span className="text-xl font-bold font-ledger-mono text-brass-300">
                          12 SEPT
                        </span>
                        <span className="text-[10px] text-redpen-light block mt-1">
                          ₵ 1,850 balance
                        </span>
                      </div>
                    </div>

                    {/* Alert Banner inside preview */}
                    <div className="p-3 bg-ink-900 rounded-xl border border-brass-500/40 flex items-center justify-between gap-2">
                      <div className="flex items-center gap-2">
                        <Bell className="w-4 h-4 text-brass-400 shrink-0" />
                        <span className="text-xs text-ink-100 font-medium">
                          Half-term balance due Friday
                        </span>
                      </div>
                      <Link
                        href="/login"
                        className="text-[11px] font-bold text-ink-900 bg-brass-500 hover:bg-brass-400 px-2.5 py-1 rounded transition-colors whitespace-nowrap"
                      >
                        Pay now
                      </Link>
                    </div>

                    {/* Notice sample */}
                    <div className="space-y-2 pt-1">
                      <span className="text-[11px] font-semibold text-ink-200 uppercase tracking-wider block">
                        Recent Notices
                      </span>
                      <div className="p-2.5 bg-paper text-ink-800 rounded-lg text-xs flex items-center justify-between border border-ink-200">
                        <div className="flex items-center gap-2">
                          <span className="w-1.5 h-6 rounded-full bg-redpen shrink-0"></span>
                          <div>
                            <span className="font-semibold block">Half-term fees due Friday</span>
                            <span className="text-[10px] text-ink-400">Bursar • 2h ago</span>
                          </div>
                        </div>
                        <span className="text-[10px] font-mono text-redpen font-semibold px-2 py-0.5 bg-redpen-bg rounded">
                          FEES
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 🏢 Brand Trust Bar */}
      <section className="py-8 bg-paper border-y border-ink-200/60">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-xs font-bold uppercase tracking-wider text-ink-400 mb-6">
            Designed for Grammar, Independent, &amp; Academy Schools
          </p>
          <div className="flex flex-wrap items-center justify-center gap-8 md:gap-16 opacity-75 font-mono text-sm font-semibold text-ink-600">
            <span>Ashford Grammar</span>
            <span>St. Mark Academy</span>
            <span>Volta International</span>
            <span>Ridge School</span>
            <span>Apex Hall</span>
          </div>
        </div>
      </section>

      {/* ⚡ Features Grid ("Everything your school already does, just organised") */}
      <section id="features" className="py-20 bg-paper">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
            <h2 className="text-3xl sm:text-4xl font-extrabold text-ink-800 tracking-tight">
              Everything your school already does, <br />
              <span className="text-brass-600">just organised</span>
            </h2>
            <p className="text-ink-600 text-base leading-relaxed">
              No bloated enterprise software or messy formulas. EduLedger keeps every record clear, searchable, and instantly accessible.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Feature 1 */}
            <div className="p-6 bg-white rounded-2xl border border-ink-200/80 shadow-sm hover:shadow-md transition-all space-y-3">
              <div className="w-12 h-12 rounded-xl bg-chalk-bg text-chalk flex items-center justify-center font-bold">
                <CheckCircle2 className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-ink-800">Attendance in one tap</h3>
              <p className="text-sm text-ink-600 leading-relaxed">
                Teachers mark daily attendance per class in under 30 seconds. Parents view present streaks and daily check-in timestamps instantly.
              </p>
            </div>

            {/* Feature 2 */}
            <div className="p-6 bg-white rounded-2xl border border-ink-200/80 shadow-sm hover:shadow-md transition-all space-y-3">
              <div className="w-12 h-12 rounded-xl bg-brass-100 text-brass-700 flex items-center justify-center font-bold">
                <FileSpreadsheet className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-ink-800">Smart ledger without spreadsheets</h3>
              <p className="text-sm text-ink-600 leading-relaxed">
                Define fee structures per term, auto-generate invoices, and mark payments with live balance recalculation for bursars and parents.
              </p>
            </div>

            {/* Feature 3 */}
            <div className="p-6 bg-white rounded-2xl border border-ink-200/80 shadow-sm hover:shadow-md transition-all space-y-3">
              <div className="w-12 h-12 rounded-xl bg-ink-50 text-ink-800 flex items-center justify-center font-bold">
                <FileText className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-ink-800">Fast mark entry &amp; auto report cards</h3>
              <p className="text-sm text-ink-600 leading-relaxed">
                Teachers enter raw scores per subject. EduLedger auto-calculates total percentages, grade letters, and produces printable PDF report cards.
              </p>
            </div>

            {/* Feature 4 */}
            <div className="p-6 bg-white rounded-2xl border border-ink-200/80 shadow-sm hover:shadow-md transition-all space-y-3">
              <div className="w-12 h-12 rounded-xl bg-redpen-bg text-redpen flex items-center justify-center font-bold">
                <Bell className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-ink-800">Always-up-to-date notice board</h3>
              <p className="text-sm text-ink-600 leading-relaxed">
                Post notices categorized by Fees, Events, Grades, or Cover. Role-targeted so staff and parents see only relevant updates.
              </p>
            </div>

            {/* Feature 5 */}
            <div className="p-6 bg-white rounded-2xl border border-ink-200/80 shadow-sm hover:shadow-md transition-all space-y-3">
              <div className="w-12 h-12 rounded-xl bg-brass-100 text-brass-700 flex items-center justify-center font-bold">
                <Clock className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-ink-800">Timetables without class overlaps</h3>
              <p className="text-sm text-ink-600 leading-relaxed">
                Build weekly class schedules with built-in teacher conflict detection. Teachers and students view their exact room schedules daily.
              </p>
            </div>

            {/* Feature 6 */}
            <div className="p-6 bg-white rounded-2xl border border-ink-200/80 shadow-sm hover:shadow-md transition-all space-y-3">
              <div className="w-12 h-12 rounded-xl bg-chalk-bg text-chalk flex items-center justify-center font-bold">
                <Smartphone className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-ink-800">Mobile &amp; parent friendly</h3>
              <p className="text-sm text-ink-600 leading-relaxed">
                High-contrast light mode design (`#FAF7F0` paper field) engineered specifically for legibility on phone screens and tablets.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 🖥️ Dark Studio Showcase Section ("Built for the screens that matter most") */}
      <section id="screens" className="py-20 bg-ink-900 text-paper border-y border-ink-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-12 space-y-4">
            <span className="text-xs font-mono uppercase tracking-widest text-brass-300 bg-ink-800 px-3 py-1 rounded-full border border-brass-500/20">
              LEDGER &amp; CHALKBOARD DESIGN SYSTEM
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
              Built for the screens that matter most
            </h2>
            <p className="text-ink-200 text-base leading-relaxed">
              High-contrast, light-mode-friendly data screens where legibility matters most — report cards, grade tables, and attendance registers.
            </p>
          </div>

          {/* Interactive Live Screen Mockup Component */}
          <div className="max-w-4xl mx-auto bg-ink-800 rounded-2xl border border-ink-700 shadow-2xl overflow-hidden">
            {/* Mock Header Tabs */}
            <div className="bg-ink-900 px-6 py-4 border-b border-ink-700 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="text-xs font-mono text-brass-300 font-bold">
                  Screen Preview:
                </span>
                <button
                  onClick={() => setActiveTab("attendance")}
                  className={`text-xs font-semibold px-2.5 py-1 rounded-md transition-colors ${
                    activeTab === "attendance"
                      ? "bg-brass-500 text-white font-bold"
                      : "text-ink-300 hover:text-white"
                  }`}
                >
                  Attendance Register
                </button>
                <button
                  onClick={() => setActiveTab("fees")}
                  className={`text-xs font-semibold px-2.5 py-1 rounded-md transition-colors ${
                    activeTab === "fees"
                      ? "bg-brass-500 text-white font-bold"
                      : "text-ink-300 hover:text-white"
                  }`}
                >
                  Fee Ledger
                </button>
                <button
                  onClick={() => setActiveTab("grades")}
                  className={`text-xs font-semibold px-2.5 py-1 rounded-md transition-colors ${
                    activeTab === "grades"
                      ? "bg-brass-500 text-white font-bold"
                      : "text-ink-300 hover:text-white"
                  }`}
                >
                  Gradebook Table
                </button>
              </div>

              <span className="text-[11px] font-mono text-ink-300">
                Light-mode high-contrast field
              </span>
            </div>

            {/* Screen Content Render */}
            <div className="p-6 bg-paper text-ink-800 overflow-x-auto">
              {activeTab === "attendance" && (
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="text-base font-bold text-ink-800">
                        Year 11 Physics — Daily Register
                      </h4>
                      <p className="text-xs text-ink-400">Wed 10 Sept 2026 • Teacher: Ama Mensah</p>
                    </div>
                    <span className="text-xs font-mono bg-chalk-bg text-chalk px-2.5 py-1 rounded-md font-bold">
                      118 / 126 PRESENT (93.7%)
                    </span>
                  </div>

                  <table className="w-full text-left border-collapse text-xs">
                    <thead>
                      <tr className="border-b border-ink-200 text-ink-500 uppercase font-mono">
                        <th className="py-2 px-3">Student Name</th>
                        <th className="py-2 px-3">Mon</th>
                        <th className="py-2 px-3">Tue</th>
                        <th className="py-2 px-3">Wed</th>
                        <th className="py-2 px-3">Thu</th>
                        <th className="py-2 px-3">Fri</th>
                        <th className="py-2 px-3 text-right">Streak</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-ink-100 font-medium">
                      <tr>
                        <td className="py-2.5 px-3 font-bold text-ink-800">Kwame Asante</td>
                        <td className="py-2.5 px-3 text-chalk font-bold">P</td>
                        <td className="py-2.5 px-3 text-chalk font-bold">P</td>
                        <td className="py-2.5 px-3 text-chalk font-bold">P</td>
                        <td className="py-2.5 px-3 text-chalk font-bold">P</td>
                        <td className="py-2.5 px-3 text-chalk font-bold">P</td>
                        <td className="py-2.5 px-3 text-right font-mono text-chalk font-bold">21 Days</td>
                      </tr>
                      <tr>
                        <td className="py-2.5 px-3 font-bold text-ink-800">Abena Mensah</td>
                        <td className="py-2.5 px-3 text-chalk font-bold">P</td>
                        <td className="py-2.5 px-3 text-chalk font-bold">P</td>
                        <td className="py-2.5 px-3 text-redpen font-bold">A</td>
                        <td className="py-2.5 px-3 text-chalk font-bold">P</td>
                        <td className="py-2.5 px-3 text-chalk font-bold">P</td>
                        <td className="py-2.5 px-3 text-right font-mono text-ink-600">4 Days</td>
                      </tr>
                      <tr>
                        <td className="py-2.5 px-3 font-bold text-ink-800">Kofi Owusu</td>
                        <td className="py-2.5 px-3 text-chalk font-bold">P</td>
                        <td className="py-2.5 px-3 text-chalk font-bold">P</td>
                        <td className="py-2.5 px-3 text-chalk font-bold">P</td>
                        <td className="py-2.5 px-3 text-chalk font-bold">P</td>
                        <td className="py-2.5 px-3 text-chalk font-bold">P</td>
                        <td className="py-2.5 px-3 text-right font-mono text-chalk font-bold">15 Days</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              )}

              {activeTab === "fees" && (
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="text-base font-bold text-ink-800">
                        Term 1 Fee Ledger Overview
                      </h4>
                      <p className="text-xs text-ink-400">Total Issued: ₵ 185,000</p>
                    </div>
                    <span className="text-xs font-mono bg-brass-100 text-brass-700 px-2.5 py-1 rounded-md font-bold">
                      ₵ 142,500 COLLECTED (77%)
                    </span>
                  </div>

                  <div className="space-y-2">
                    <div className="p-3 bg-white rounded-lg border border-ink-200 flex items-center justify-between text-xs">
                      <div>
                        <span className="font-bold block text-ink-800">Kwame Asante (Year 11)</span>
                        <span className="text-ink-400">Invoice #INV-2026-089</span>
                      </div>
                      <div className="text-right">
                        <span className="font-mono font-bold text-redpen block">₵ 1,850 Due</span>
                        <span className="text-[10px] text-redpen font-semibold px-2 py-0.5 bg-redpen-bg rounded">
                          OVERDUE FRI
                        </span>
                      </div>
                    </div>
                    <div className="p-3 bg-white rounded-lg border border-ink-200 flex items-center justify-between text-xs">
                      <div>
                        <span className="font-bold block text-ink-800">Ama Serwaa (Year 10)</span>
                        <span className="text-ink-400">Invoice #INV-2026-090</span>
                      </div>
                      <div className="text-right">
                        <span className="font-mono font-bold text-chalk block">₵ 0.00 Balance</span>
                        <span className="text-[10px] text-chalk font-semibold px-2 py-0.5 bg-chalk-bg rounded">
                          PAID IN FULL
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {activeTab === "grades" && (
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="text-base font-bold text-ink-800">
                        Physics Term 1 Gradebook
                      </h4>
                      <p className="text-xs text-ink-400">Max Score: 100 marks</p>
                    </div>
                    <span className="text-xs font-mono bg-ink-100 text-ink-800 px-2.5 py-1 rounded-md font-bold">
                      CLASS AVG: 82.4%
                    </span>
                  </div>

                  <table className="w-full text-left border-collapse text-xs">
                    <thead>
                      <tr className="border-b border-ink-200 text-ink-500 uppercase font-mono">
                        <th className="py-2 px-3">Student Name</th>
                        <th className="py-2 px-3">Mid-Term (40%)</th>
                        <th className="py-2 px-3">Final (60%)</th>
                        <th className="py-2 px-3 text-right">Total %</th>
                        <th className="py-2 px-3 text-right">Grade</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-ink-100 font-medium">
                      <tr>
                        <td className="py-2.5 px-3 font-bold text-ink-800">Kwame Asante</td>
                        <td className="py-2.5 px-3 font-mono">36 / 40</td>
                        <td className="py-2.5 px-3 font-mono">52 / 60</td>
                        <td className="py-2.5 px-3 text-right font-mono font-bold text-ink-800">88.0%</td>
                        <td className="py-2.5 px-3 text-right font-mono font-bold text-brass-600">A</td>
                      </tr>
                      <tr>
                        <td className="py-2.5 px-3 font-bold text-ink-800">Abena Mensah</td>
                        <td className="py-2.5 px-3 font-mono">30 / 40</td>
                        <td className="py-2.5 px-3 font-mono">48 / 60</td>
                        <td className="py-2.5 px-3 text-right font-mono font-bold text-ink-800">78.0%</td>
                        <td className="py-2.5 px-3 text-right font-mono font-bold text-chalk">B</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* 🪜 3-Step Setup Section ("Set up in an afternoon, not a semester") */}
      <section id="steps" className="py-20 bg-paper">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
            <h2 className="text-3xl sm:text-4xl font-extrabold text-ink-800 tracking-tight">
              Set up in an afternoon, not a semester
            </h2>
            <p className="text-ink-600 text-base">
              Get your entire school running on EduLedger in three clear steps.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Step 01 */}
            <div className="bg-white p-8 rounded-2xl border border-ink-200/80 shadow-sm relative space-y-4">
              <span className="text-4xl font-black font-ledger-mono text-brass-500 block">01</span>
              <h3 className="text-xl font-bold text-ink-800">Import your accounts</h3>
              <p className="text-sm text-ink-600 leading-relaxed">
                Upload existing student lists and teacher directories via CSV or setup classes manually in minutes.
              </p>
            </div>

            {/* Step 02 */}
            <div className="bg-white p-8 rounded-2xl border border-ink-200/80 shadow-sm relative space-y-4">
              <span className="text-4xl font-black font-ledger-mono text-brass-500 block">02</span>
              <h3 className="text-xl font-bold text-ink-800">Invite staff and teachers</h3>
              <p className="text-sm text-ink-600 leading-relaxed">
                Assign teachers to their classes and subjects. Teachers get instant access to attendance registers and gradebooks.
              </p>
            </div>

            {/* Step 03 */}
            <div className="bg-white p-8 rounded-2xl border border-ink-200/80 shadow-sm relative space-y-4">
              <span className="text-4xl font-black font-ledger-mono text-brass-500 block">03</span>
              <h3 className="text-xl font-bold text-ink-800">Go live</h3>
              <p className="text-sm text-ink-600 leading-relaxed">
                Start taking attendance, posting notices, auto-generating fee invoices, and delivering report cards seamlessly.
              </p>
            </div>
          </div>

          {/* Testimonial Quote */}
          <div className="mt-16 max-w-3xl mx-auto bg-white p-8 rounded-2xl border border-ink-200 text-center space-y-4 shadow-sm">
            <p className="text-lg italic text-ink-700 leading-relaxed font-medium">
              &ldquo;EduLedger eliminated 10 different spreadsheets across our departments. Parents know their fee status instantly, and teachers spend half the time compiling report cards.&rdquo;
            </p>
            <div>
              <span className="font-bold text-ink-800 block text-base">Ama Mensah</span>
              <span className="text-xs text-ink-400 font-medium">Head of Science &amp; Senior Registrar, Ashford Grammar</span>
            </div>
          </div>
        </div>
      </section>

      {/* 🏷️ Pricing Section ("Simple pricing for schools of any size") */}
      <section id="pricing" className="py-20 bg-ink-50/50 border-t border-ink-200/60">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
            <h2 className="text-3xl sm:text-4xl font-extrabold text-ink-800 tracking-tight">
              Simple pricing for schools of any size
            </h2>
            <p className="text-ink-600 text-base">
              No hidden user fees. Choose the tier that matches your institution&apos;s scale.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto items-stretch">
            {/* Free Tier */}
            <div className="bg-white p-8 rounded-2xl border border-ink-200 shadow-sm flex flex-col justify-between space-y-6">
              <div className="space-y-4">
                <span className="text-xs font-bold uppercase tracking-wider text-ink-400">Free Tier</span>
                <div className="flex items-baseline gap-1">
                  <span className="text-4xl font-black font-ledger-mono text-ink-800">$0</span>
                  <span className="text-sm text-ink-400">/ month forever</span>
                </div>
                <p className="text-sm text-ink-600">
                  Ideal for small single schools looking for essential record-keeping.
                </p>
                <ul className="space-y-3 pt-4 border-t border-ink-100 text-sm text-ink-700">
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-chalk shrink-0" /> Up to 200 students
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-chalk shrink-0" /> Core daily attendance
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-chalk shrink-0" /> Basic notice board &amp; announcements
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-chalk shrink-0" /> Manual fee tracking ledger
                  </li>
                </ul>
              </div>

              <Link
                href="/login"
                className="w-full py-3 px-4 rounded-xl bg-ink-100 hover:bg-ink-200 text-ink-800 font-bold text-center transition-colors"
              >
                Get Started Free
              </Link>
            </div>

            {/* School Tier (Recommended) */}
            <div className="bg-white p-8 rounded-2xl border-2 border-brass-500 shadow-xl flex flex-col justify-between space-y-6 relative">
              <div className="absolute -top-3.5 right-6 bg-brass-500 text-white text-[11px] font-bold tracking-wider uppercase px-3 py-1 rounded-full shadow-sm">
                RECOMMENDED
              </div>

              <div className="space-y-4">
                <span className="text-xs font-bold uppercase tracking-wider text-brass-700">School Tier</span>
                <div className="flex items-baseline gap-1">
                  <span className="text-4xl font-black font-ledger-mono text-brass-600">$149</span>
                  <span className="text-sm text-ink-400">/ month per school</span>
                </div>
                <p className="text-sm text-ink-600">
                  Full operational depth with grading, timetables, and messaging.
                </p>
                <ul className="space-y-3 pt-4 border-t border-ink-100 text-sm text-ink-700">
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-brass-600 shrink-0" /> Unlimited students &amp; teachers
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-brass-600 shrink-0" /> Complete gradebook &amp; PDF report cards
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-brass-600 shrink-0" /> Smart timetable conflict checker
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-brass-600 shrink-0" /> Parent &amp; student portal access
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-brass-600 shrink-0" /> Exportable CSV/PDF attendance sheets
                  </li>
                </ul>
              </div>

              <Link
                href="/login"
                className="w-full py-3.5 px-4 rounded-xl bg-brass-500 hover:bg-brass-600 text-white font-bold text-center shadow-md hover:shadow-lg transition-all"
              >
                Start 14-Day Free Trial
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* 📣 Final Call to Action Footer Banner */}
      <section className="py-16 bg-ink-900 text-paper">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6">
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Ready to put your school on one ledger?
          </h2>
          <p className="text-ink-200 max-w-xl mx-auto text-base">
            Join forward-thinking schools replacing spreadsheets with clear, unified academic record-keeping.
          </p>
          <div>
            <Link
              href="/login"
              className="inline-flex items-center gap-2 px-8 py-4 rounded-xl bg-brass-500 hover:bg-brass-600 text-white font-bold text-lg shadow-lg hover:shadow-xl transition-all"
            >
              Enter EduLedger App
              <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </section>

      {/* 🦶 Footer */}
      <footer className="bg-paper border-t border-ink-200 py-12 text-xs text-ink-500">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-2 md:grid-cols-4 gap-8">
          <div className="col-span-2 md:col-span-1 space-y-3">
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 rounded-lg bg-ink-800 flex items-center justify-center text-brass-300 font-bold">
                <School className="w-4 h-4 text-brass-300" />
              </div>
              <span className="text-base font-extrabold text-ink-800">EduLedger</span>
            </div>
            <p className="text-ink-400 leading-relaxed">
              Unified school management platform built with Next.js 16 and Ledger &amp; Chalkboard design architecture.
            </p>
          </div>

          <div>
            <span className="font-bold text-ink-800 uppercase tracking-wider block mb-3">Product</span>
            <ul className="space-y-2">
              <li><a href="#features" className="hover:text-ink-800 transition-colors">Features</a></li>
              <li><a href="#screens" className="hover:text-ink-800 transition-colors">Screen Studio</a></li>
              <li><a href="#pricing" className="hover:text-ink-800 transition-colors">Pricing</a></li>
              <li><Link href="/login" className="hover:text-ink-800 transition-colors">Demo App</Link></li>
            </ul>
          </div>

          <div>
            <span className="font-bold text-ink-800 uppercase tracking-wider block mb-3">Company</span>
            <ul className="space-y-2">
              <li><span className="text-ink-400">About Us</span></li>
              <li><span className="text-ink-400">Careers</span></li>
              <li><span className="text-ink-400">Contact</span></li>
            </ul>
          </div>

          <div>
            <span className="font-bold text-ink-800 uppercase tracking-wider block mb-3">Legal</span>
            <ul className="space-y-2">
              <li><span className="text-ink-400">Privacy Policy</span></li>
              <li><span className="text-ink-400">Terms of Service</span></li>
              <li><span className="text-ink-400">Security</span></li>
            </ul>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-12 pt-6 border-t border-ink-100 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p>© {new Date().getFullYear()} EduLedger. All rights reserved.</p>
          <p className="font-mono text-[11px] text-ink-400">Built with Next.js 16 &amp; Tailwind CSS</p>
        </div>
      </footer>
    </div>
  );
}
