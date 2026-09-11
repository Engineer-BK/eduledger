"use client";

import { Search, Bell, ChevronDown, Sparkles } from "lucide-react";

interface TopNavProps {
  currentRole: "ADMIN" | "TEACHER" | "PARENT" | "STUDENT";
  onRoleChange: (role: "ADMIN" | "TEACHER" | "PARENT" | "STUDENT") => void;
  userName?: string;
}

export default function TopNav({ currentRole, onRoleChange, userName }: TopNavProps) {
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

  return (
    <header className="h-16 bg-paper border-b border-ink-200/80 px-6 flex items-center justify-between sticky top-0 z-30 select-none">
      {/* Global Search Field */}
      <div className="relative w-72 sm:w-96">
        <Search className="w-4 h-4 text-ink-400 absolute left-3 top-2.5" />
        <input
          type="text"
          placeholder="Search classes, students, notices..."
          className="w-full pl-9 pr-9 py-1.5 text-xs border border-ink-200 rounded-xl bg-white focus:outline-none focus:ring-2 focus:ring-brass-500/40 focus:border-brass-500 placeholder:text-ink-300 font-medium"
        />
        <kbd className="absolute right-2.5 top-2 text-[10px] font-mono text-ink-400 bg-ink-50 px-1.5 py-0.5 rounded border border-ink-200">
          ⌘K
        </kbd>
      </div>

      {/* Right User & Context Strip */}
      <div className="flex items-center gap-4">
        {/* Date & Term Tag */}
        <div className="hidden md:flex items-center gap-2 text-[11px] font-mono text-ink-500">
          <span>WED 10 SEPT 2026</span>
          <span className="text-ink-300">•</span>
          <span className="bg-brass-100 text-brass-700 font-bold px-2 py-0.5 rounded">
            TERM 1
          </span>
        </div>

        {/* Role Switcher Pill Dropdown */}
        <div className="relative group">
          <button className="flex items-center gap-1.5 px-3 py-1.5 bg-white border border-ink-200 rounded-xl text-xs font-bold text-ink-800 hover:border-brass-500 transition-colors shadow-2xs">
            <Sparkles className="w-3.5 h-3.5 text-brass-600" />
            <span className="capitalize">{currentRole.toLowerCase()} View</span>
            <ChevronDown className="w-3.5 h-3.5 text-ink-400" />
          </button>

          <div className="absolute right-0 mt-1 w-44 bg-white border border-ink-200 rounded-xl shadow-lg p-1.5 hidden group-hover:block z-50">
            <span className="text-[10px] font-mono uppercase tracking-wider text-ink-400 px-2 py-1 block">
              Switch Role View:
            </span>
            <button
              onClick={() => onRoleChange("TEACHER")}
              className={`w-full text-left px-2.5 py-1.5 rounded-lg text-xs font-medium flex items-center justify-between ${
                currentRole === "TEACHER" ? "bg-brass-100 text-brass-800 font-bold" : "hover:bg-ink-50 text-ink-700"
              }`}
            >
              👩‍🏫 Teacher View
            </button>
            <button
              onClick={() => onRoleChange("PARENT")}
              className={`w-full text-left px-2.5 py-1.5 rounded-lg text-xs font-medium flex items-center justify-between ${
                currentRole === "PARENT" ? "bg-brass-100 text-brass-800 font-bold" : "hover:bg-ink-50 text-ink-700"
              }`}
            >
              👨‍👩‍👧 Parent View
            </button>
            <button
              onClick={() => onRoleChange("STUDENT")}
              className={`w-full text-left px-2.5 py-1.5 rounded-lg text-xs font-medium flex items-center justify-between ${
                currentRole === "STUDENT" ? "bg-brass-100 text-brass-800 font-bold" : "hover:bg-ink-50 text-ink-700"
              }`}
            >
              🎓 Student View
            </button>
            <button
              onClick={() => onRoleChange("ADMIN")}
              className={`w-full text-left px-2.5 py-1.5 rounded-lg text-xs font-medium flex items-center justify-between ${
                currentRole === "ADMIN" ? "bg-brass-100 text-brass-800 font-bold" : "hover:bg-ink-50 text-ink-700"
              }`}
            >
              🔑 Admin View
            </button>
          </div>
        </div>

        {/* Notifications Icon */}
        <button className="relative p-2 rounded-xl hover:bg-ink-100 text-ink-600 transition-colors">
          <Bell className="w-4 h-4" />
          <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-redpen"></span>
        </button>

        {/* User Badge */}
        <div className="flex items-center gap-2.5 pl-2 border-l border-ink-200">
          <div className="w-8 h-8 rounded-full bg-ink-800 text-paper font-mono font-bold text-xs flex items-center justify-center border border-brass-500/50">
            {details.avatar}
          </div>
          <div className="hidden sm:block text-left">
            <span className="text-xs font-bold text-ink-800 block leading-tight">
              {details.name}
            </span>
            <span className="text-[10px] font-mono text-ink-400 block leading-none">
              {details.subtitle}
            </span>
          </div>
        </div>
      </div>
    </header>
  );
}
