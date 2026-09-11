"use client";

import { useState, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Sidebar from "@/components/layout/Sidebar";
import TopNav from "@/components/layout/TopNav";
import TeacherDashboardView from "@/components/dashboard/TeacherDashboardView";
import ParentDashboardView from "@/components/dashboard/ParentDashboardView";
import StudentDashboardView from "@/components/dashboard/StudentDashboardView";
import AdminDashboardView from "@/components/dashboard/AdminDashboardView";

function DashboardContent() {
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
      if (storedRole) {
        setCurrentRole(storedRole);
      }
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

  return (
    <div className="flex min-h-screen bg-paper font-sans">
      {/* Ink Navy Sidebar */}
      <Sidebar
        currentRole={currentRole}
        userName={userName}
        onSwitchRole={handleRoleChange}
      />

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Top Navbar */}
        <TopNav
          currentRole={currentRole}
          onRoleChange={handleRoleChange}
          userName={userName}
        />

        {/* Inner Page View */}
        <main className="flex-1 p-6 md:p-8 max-w-7xl w-full mx-auto">
          {currentRole === "TEACHER" && <TeacherDashboardView />}
          {currentRole === "PARENT" && <ParentDashboardView />}
          {currentRole === "STUDENT" && <StudentDashboardView />}
          {currentRole === "ADMIN" && <AdminDashboardView />}
        </main>

        {/* Ledger Bottom Footer Bar */}
        <footer className="px-8 py-3 border-t border-ink-200/80 bg-paper flex items-center justify-between text-[11px] font-mono text-ink-400">
          <span>LEDGER CLOSED 17:30 • ENTRY № 00482</span>
          <span>ASHFORD GRAMMAR — 2026 - 2027</span>
        </footer>
      </div>
    </div>
  );
}

export default function DashboardPage() {
  return (
    <Suspense fallback={<div className="p-8 font-mono text-ink-600 text-xs">Loading EduLedger Dashboard...</div>}>
      <DashboardContent />
    </Suspense>
  );
}
