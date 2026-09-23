"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { Search, Bell, ChevronDown, Sparkles, X, GraduationCap, School, BellRing } from "lucide-react";

interface TopNavProps {
  currentRole: "ADMIN" | "TEACHER" | "PARENT" | "STUDENT";
  onRoleChange: (role: "ADMIN" | "TEACHER" | "PARENT" | "STUDENT") => void;
  userName?: string;
}

export default function TopNav({ currentRole, onRoleChange, userName }: TopNavProps) {
  const [query, setQuery] = useState("");
  const [isFocused, setIsFocused] = useState(false);
  const searchInputRef = useRef<HTMLInputElement>(null);

  // Global Ctrl+K / Cmd+K listener to focus search box
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        searchInputRef.current?.focus();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  const getRoleDetails = () => {
    switch (currentRole) {
      case "TEACHER":
        return { name: userName || "Ama Mensah", subtitle: "TEACHER • PHYSICS", avatar: "AM" };
      case "PARENT":
        return { name: userName || "Efua Asante", subtitle: "PARENT • KWAME, YR 11", avatar: "EA" };
      case "STUDENT":
        return { name: userName || "Kwame Asante", subtitle: "YEAR 11 • HOUSE VOLTA", avatar: "KA" };
      default:
        return { name: userName || "Janet Osei", subtitle: "ADMIN • REGISTRAR", avatar: "JO" };
    }
  };

  const details = getRoleDetails();

  // Search Results
  const quickLinks = [
    { label: "Amara Osei (Form 3A)", category: "STUDENT", href: "/dashboard/students", icon: GraduationCap },
    { label: "Year 11 Physics (Lab 2)", category: "CLASS", href: "/dashboard/classes", icon: School },
    { label: "Tuition Fees Notice", category: "ANNOUNCEMENT", href: "/dashboard/announcements", icon: BellRing },
    { label: "Clara Mensah (Form 2B)", category: "STUDENT", href: "/dashboard/students", icon: GraduationCap },
  ];

  const filteredQuickLinks = query.trim()
    ? quickLinks.filter((item) => item.label.toLowerCase().includes(query.toLowerCase()))
    : quickLinks;

  return (
    <header className="h-16 bg-[#FAF7F0] border-b border-[#E2E6EE] px-6 flex items-center justify-between sticky top-0 z-30 select-none">
      {/* Global Search Field */}
      <div className="relative w-72 sm:w-96">
        <div className="relative flex items-center w-full">
          <Search className="w-4 h-4 text-[#8895B0] absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
          <input
            ref={searchInputRef}
            type="text"
            placeholder="Search classes, students, notices..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setTimeout(() => setIsFocused(false), 200)}
            className="w-full pl-10 pr-12 py-2 bg-white border border-[#E2E6EE] rounded-xl text-xs font-semibold text-[#141B2E] placeholder:text-[#8895B0] placeholder:font-normal focus:outline-none focus:border-[#B8862B] focus:ring-2 focus:ring-[#B8862B]/20 shadow-2xs transition-all"
          />

          {query ? (
            <button
              onClick={() => setQuery("")}
              className="absolute right-3 top-1/2 -translate-y-1/2 p-0.5 hover:bg-[#EEF0F4] text-[#8895B0] hover:text-[#141B2E] rounded-md transition-colors"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          ) : (
            <kbd className="absolute right-2.5 top-1/2 -translate-y-1/2 text-[10px] font-mono font-semibold text-[#5C6A87] bg-[#FAF7F0] px-1.5 py-0.5 rounded-md border border-[#E2E6EE] shadow-2xs pointer-events-none select-none">
              ⌘K
            </kbd>
          )}
        </div>

        {/* Live Search Overlay Results */}
        {isFocused && (
          <div className="absolute left-0 right-0 mt-2 bg-white border border-[#E2E6EE] rounded-2xl shadow-xl p-2 z-50 animate-in fade-in duration-100">
            <span className="text-[10px] font-mono uppercase tracking-wider text-[#8895B0] px-3 py-1.5 block font-semibold">
              {query ? `Search Results (${filteredQuickLinks.length})` : "Quick Navigation Suggestions"}
            </span>

            <div className="space-y-1">
              {filteredQuickLinks.length === 0 ? (
                <div className="p-3 text-xs text-[#5C6A87] text-center font-mono">
                  No matching ledger results found
                </div>
              ) : (
                filteredQuickLinks.map((item, idx) => {
                  const Icon = item.icon;
                  return (
                    <Link
                      key={idx}
                      href={item.href}
                      className="flex items-center justify-between px-3 py-2 rounded-xl text-xs hover:bg-[#FAF7F0] transition-colors group"
                    >
                      <div className="flex items-center gap-2.5">
                        <Icon className="w-4 h-4 text-[#8895B0] group-hover:text-[#B8862B]" />
                        <span className="font-bold text-[#141B2E]">{item.label}</span>
                      </div>
                      <span className="text-[9px] font-mono text-[#5C6A87] bg-[#EEF0F4] px-1.5 py-0.5 rounded">
                        {item.category}
                      </span>
                    </Link>
                  );
                })
              )}
            </div>
          </div>
        )}
      </div>

      {/* Right User & Context Strip */}
      <div className="flex items-center gap-4">
        {/* Date & Term Tag */}
        <div className="hidden md:flex items-center gap-2 text-[11px] font-mono text-[#5C6A87]">
          <span>WED 10 SEPT 2026</span>
          <span className="text-[#B7BECC]">•</span>
          <span className="bg-[#F3E3C4] text-[#8C6420] font-bold px-2 py-0.5 rounded">
            TERM 1
          </span>
        </div>

        {/* Role Switcher Pill Dropdown */}
        <div className="relative group">
          <button className="flex items-center gap-1.5 px-3 py-1.5 bg-white border border-[#E2E6EE] rounded-xl text-xs font-bold text-[#141B2E] hover:border-[#B8862B] transition-colors shadow-2xs">
            <Sparkles className="w-3.5 h-3.5 text-[#B8862B]" />
            <span className="capitalize">{currentRole.toLowerCase()} View</span>
            <ChevronDown className="w-3.5 h-3.5 text-[#8895B0]" />
          </button>

          <div className="absolute right-0 mt-1 w-44 bg-white border border-[#E2E6EE] rounded-xl shadow-lg p-1.5 hidden group-hover:block z-50">
            <span className="text-[10px] font-mono uppercase tracking-wider text-[#8895B0] px-2 py-1 block font-semibold">
              Switch Role View:
            </span>
            <button
              onClick={() => onRoleChange("TEACHER")}
              className={`w-full text-left px-2.5 py-1.5 rounded-lg text-xs font-medium flex items-center justify-between ${
                currentRole === "TEACHER" ? "bg-[#F3E3C4] text-[#8C6420] font-bold" : "hover:bg-[#FAF7F0] text-[#141B2E]"
              }`}
            >
              👩‍🏫 Teacher View
            </button>
            <button
              onClick={() => onRoleChange("PARENT")}
              className={`w-full text-left px-2.5 py-1.5 rounded-lg text-xs font-medium flex items-center justify-between ${
                currentRole === "PARENT" ? "bg-[#F3E3C4] text-[#8C6420] font-bold" : "hover:bg-[#FAF7F0] text-[#141B2E]"
              }`}
            >
              👨‍👩‍👧 Parent View
            </button>
            <button
              onClick={() => onRoleChange("STUDENT")}
              className={`w-full text-left px-2.5 py-1.5 rounded-lg text-xs font-medium flex items-center justify-between ${
                currentRole === "STUDENT" ? "bg-[#F3E3C4] text-[#8C6420] font-bold" : "hover:bg-[#FAF7F0] text-[#141B2E]"
              }`}
            >
              🎓 Student View
            </button>
            <button
              onClick={() => onRoleChange("ADMIN")}
              className={`w-full text-left px-2.5 py-1.5 rounded-lg text-xs font-medium flex items-center justify-between ${
                currentRole === "ADMIN" ? "bg-[#F3E3C4] text-[#8C6420] font-bold" : "hover:bg-[#FAF7F0] text-[#141B2E]"
              }`}
            >
              🔑 Admin View
            </button>
          </div>
        </div>

        {/* Notifications Icon */}
        <button className="relative p-2 rounded-xl hover:bg-[#EEF0F4] text-[#5C6A87] transition-colors">
          <Bell className="w-4 h-4" />
          <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-[#A63D40]"></span>
        </button>

        {/* User Badge */}
        <div className="flex items-center gap-2.5 pl-2 border-l border-[#E2E6EE]">
          <div className="w-8 h-8 rounded-full bg-[#1F2A44] text-[#FAF7F0] font-mono font-bold text-xs flex items-center justify-center border border-[#B8862B]/50">
            {details.avatar}
          </div>
          <div className="hidden sm:block text-left">
            <span className="text-xs font-bold text-[#141B2E] block leading-tight">
              {details.name}
            </span>
            <span className="text-[10px] font-mono text-[#5C6A87] block leading-none">
              {details.subtitle}
            </span>
          </div>
        </div>
      </div>
    </header>
  );
}
