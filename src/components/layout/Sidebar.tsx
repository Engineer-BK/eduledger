"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { getStoredAnnouncements } from "@/lib/announcements";
import {
  LayoutDashboard,
  Bell,
  Calendar,
  Users,
  GraduationCap,
  BookOpen,
  CheckSquare,
  CreditCard,
  School,
  LogOut,
  ChevronRight,
} from "lucide-react";

interface SidebarProps {
  currentRole: "ADMIN" | "TEACHER" | "PARENT" | "STUDENT";
  userEmail?: string;
  userName?: string;
  onSwitchRole: (role: "ADMIN" | "TEACHER" | "PARENT" | "STUDENT") => void;
}

export default function Sidebar({ currentRole, userEmail, userName, onSwitchRole }: SidebarProps) {
  const pathname = usePathname();
  const [unreadCount, setUnreadCount] = useState<number>(3);

  useEffect(() => {
    const updateCount = () => {
      const stored = getStoredAnnouncements();
      const count = stored.filter((a) => !a.isRead).length;
      setUnreadCount(count);
    };

    updateCount();
    window.addEventListener("eduledger_announcements_updated", updateCount);
    return () => {
      window.removeEventListener("eduledger_announcements_updated", updateCount);
    };
  }, []);

  const getRoleLabel = () => {
    switch (currentRole) {
      case "PARENT":
        return "PARENT PORTAL";
      case "TEACHER":
        return "FACULTY PORTAL";
      case "STUDENT":
        return "STUDENT PORTAL";
      default:
        return "ADMINISTRATIVE PORTAL";
    }
  };

  const navGroups = [
    {
      title: "REGISTRY",
      items: [
        { name: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
        {
          name: "Announcements",
          href: "/dashboard/announcements",
          icon: Bell,
          badge: unreadCount > 0 ? String(unreadCount) : undefined,
        },
        { name: "Timetable", href: "/dashboard/timetable", icon: Calendar },
      ],
    },
    {
      title: "PEOPLE",
      items: [
        { name: "Students", href: "/dashboard/students", icon: GraduationCap },
        { name: "Teachers", href: "/dashboard/teachers", icon: Users },
        { name: "Classes", href: "/dashboard/classes", icon: School },
      ],
    },
    {
      title: "RECORDS",
      items: [
        { name: "Attendance", href: "/dashboard/attendance", icon: CheckSquare },
        { name: "Gradebook", href: "/dashboard/gradebook", icon: BookOpen },
        { name: "Fees & Dues", href: "/dashboard/fees", icon: CreditCard },
      ],
    },
  ];

  return (
    <aside className="w-64 bg-ink-800 text-paper min-h-screen flex flex-col justify-between border-r border-ink-700 select-none shrink-0">
      <div>
        {/* Branding Logo Header */}
        <div className="p-4 border-b border-ink-700/80 flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-ink-900 border border-brass-500/40 flex items-center justify-center text-brass-300 font-bold font-serif text-lg shadow-sm shrink-0">
            A
          </div>
          <div className="overflow-hidden">
            <h2 className="text-sm font-extrabold text-white tracking-tight truncate">
              Ashford Grammar
            </h2>
            <span className="text-[10px] font-mono uppercase tracking-widest text-brass-300 block truncate font-semibold">
              {getRoleLabel()}
            </span>
          </div>
        </div>

        {/* Navigation Sections */}
        <nav className="p-3 space-y-5">
          {navGroups.map((group) => (
            <div key={group.title} className="space-y-1">
              <span className="px-3 text-[10px] font-mono font-semibold uppercase tracking-widest text-ink-300 block">
                {group.title}
              </span>
              <div className="space-y-0.5">
                {group.items.map((item) => {
                  const isActive = pathname === item.href;
                  const Icon = item.icon;

                  return (
                    <Link
                      key={item.name}
                      href={item.href}
                      className={`flex items-center justify-between px-3 py-2.5 rounded-lg text-xs font-semibold transition-all ${
                        isActive
                          ? "bg-ink-700/80 text-white border-l-4 border-brass-500 pl-2.5 font-bold shadow-xs"
                          : "text-ink-200 hover:text-white hover:bg-ink-700/40"
                      }`}
                    >
                      <div className="flex items-center gap-2.5">
                        <Icon
                          className={`w-4 h-4 ${
                            isActive ? "text-brass-300" : "text-ink-300"
                          }`}
                        />
                        <span>{item.name}</span>
                      </div>
                      {item.badge && (
                        <span className="bg-brass-500 text-ink-900 font-mono text-[10px] font-bold px-1.5 py-0.2 rounded-full">
                          {item.badge}
                        </span>
                      )}
                    </Link>
                  );
                })}
              </div>
            </div>
          ))}
        </nav>
      </div>

      {/* User Info Footer Badge */}
      <div className="p-3 border-t border-ink-700/80 bg-ink-900/60 space-y-2">
        <div className="p-2.5 rounded-xl bg-ink-900 border border-ink-700 flex items-center justify-between">
          <div className="flex items-center gap-2.5 overflow-hidden">
            <div className="w-8 h-8 rounded-lg bg-brass-500 text-ink-900 font-bold font-mono text-xs flex items-center justify-center shrink-0">
              {userName ? userName.slice(0, 2).toUpperCase() : "JO"}
            </div>
            <div className="overflow-hidden">
              <span className="text-xs font-bold text-white block truncate">
                {userName || "J. Osei"}
              </span>
              <span className="text-[10px] font-mono text-ink-300 block truncate">
                {currentRole}
              </span>
            </div>
          </div>
          <Link
            href="/login"
            title="Sign Out"
            className="p-1.5 rounded-lg text-ink-300 hover:text-white hover:bg-ink-700 transition-colors"
          >
            <LogOut className="w-4 h-4" />
          </Link>
        </div>

        <button
          onClick={() => {
            const roles: Array<"ADMIN" | "TEACHER" | "PARENT" | "STUDENT"> = [
              "PARENT",
              "TEACHER",
              "STUDENT",
              "ADMIN",
            ];
            const nextIdx = (roles.indexOf(currentRole) + 1) % roles.length;
            onSwitchRole(roles[nextIdx]);
          }}
          className="w-full py-2 px-3 bg-ink-800 hover:bg-ink-700 border border-ink-700 text-brass-300 hover:text-white rounded-xl text-xs font-semibold transition-all flex items-center justify-between"
        >
          <span className="text-[11px] font-mono">Switch View Demo</span>
          <ChevronRight className="w-3.5 h-3.5" />
        </button>
      </div>
    </aside>
  );
}
