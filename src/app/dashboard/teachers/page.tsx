"use client";

import { useState, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Sidebar from "@/components/layout/Sidebar";
import TopNav from "@/components/layout/TopNav";
import { Search, Plus, Users, Mail, Phone, BookOpen, Award, CheckCircle2 } from "lucide-react";

function TeachersContent() {
  const searchParams = useSearchParams();
  const roleParam = searchParams.get("role")?.toUpperCase() as
    | "ADMIN"
    | "TEACHER"
    | "PARENT"
    | "STUDENT"
    | undefined;

  const [currentRole, setCurrentRole] = useState<
    "ADMIN" | "TEACHER" | "PARENT" | "STUDENT"
  >(roleParam || "ADMIN");
  const [userName, setUserName] = useState<string>("");
  const [searchQuery, setSearchQuery] = useState("");

  const teachers = [
    {
      id: "tch-001",
      name: "Ama Mensah",
      department: "Physics & Science",
      email: "ama.mensah@ashford.edu",
      phone: "+233 24 111 9900",
      classes: ["Year 11 Physics", "Year 9 Maths", "Year 10 Physics"],
      status: "ACTIVE",
      room: "Lab 2",
    },
    {
      id: "tch-002",
      name: "Kofi Owusu",
      department: "Integrated Science",
      email: "kofi.owusu@ashford.edu",
      phone: "+233 20 444 3322",
      classes: ["Form 3A Science", "Form 1B Biology"],
      status: "ACTIVE",
      room: "Lab 1",
    },
    {
      id: "tch-003",
      name: "Esi Boateng",
      department: "Chemistry",
      email: "esi.boateng@ashford.edu",
      phone: "+233 26 555 1188",
      classes: ["Form 2B Chemistry", "Year 11 Chemistry"],
      status: "ACTIVE",
      room: "Chem Lab",
    },
    {
      id: "tch-004",
      name: "David Asante",
      department: "Mathematics",
      email: "david.asante@ashford.edu",
      phone: "+233 50 777 2211",
      classes: ["Form 1A Algebra", "Form 4 Further Maths"],
      status: "ON LEAVE",
      room: "Room 4",
    },
    {
      id: "tch-005",
      name: "Grace Nkrumah",
      department: "English & Literature",
      email: "gnkrumah@ashford.edu",
      phone: "+233 27 888 3344",
      classes: ["Form 2 English", "Form 3 Literature"],
      status: "ACTIVE",
      room: "Room 10",
    },
  ];

  const filteredTeachers = teachers.filter(
    (t) =>
      t.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      t.department.toLowerCase().includes(searchQuery.toLowerCase()) ||
      t.room.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="flex min-h-screen bg-[#FAF7F0] font-sans">
      <Sidebar
        currentRole={currentRole}
        userName={userName}
        onSwitchRole={(role) => setCurrentRole(role)}
      />

      <div className="flex-1 flex flex-col min-w-0">
        <TopNav
          currentRole={currentRole}
          onRoleChange={(role) => setCurrentRole(role)}
          userName={userName}
        />

        <main className="flex-1 p-6 md:p-8 max-w-7xl w-full mx-auto space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h1 className="text-2xl font-extrabold text-[#141B2E] tracking-tight">
                Teachers & Faculty
              </h1>
              <p className="text-xs text-[#5C6A87] mt-0.5">
                96 active faculty members · 4 on official leave today
              </p>
            </div>

            <div className="flex items-center gap-3">
              <div className="relative w-full sm:w-64">
                <Search className="w-4 h-4 absolute left-3 top-2.5 text-[#8895B0]" />
                <input
                  type="text"
                  placeholder="Search teachers..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-9 pr-3 py-2 bg-white border border-[#E2E6EE] rounded-xl text-xs text-[#141B2E] focus:outline-none focus:border-[#B8862B]"
                />
              </div>
              <button
                onClick={() => alert("Add Teacher modal launched.")}
                className="px-4 py-2.5 bg-[#B8862B] hover:bg-[#A27221] text-white font-bold text-xs rounded-xl shadow-xs flex items-center gap-1.5"
              >
                <Plus className="w-4 h-4" /> Add teacher
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredTeachers.map((t) => (
              <div
                key={t.id}
                className="bg-white p-5 rounded-2xl border border-[#E2E6EE] shadow-2xs hover:border-[#B7BECC] transition-all space-y-3"
              >
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-[#141B2E] text-[#D9AF5D] font-mono font-bold flex items-center justify-center text-sm">
                      {t.name.slice(0, 2).toUpperCase()}
                    </div>
                    <div>
                      <h3 className="text-sm font-extrabold text-[#141B2E] font-serif">
                        {t.name}
                      </h3>
                      <span className="text-[10px] font-mono text-[#5C6A87] block">
                        {t.department}
                      </span>
                    </div>
                  </div>
                  <span
                    className={`text-[9px] font-mono font-bold px-2 py-0.5 rounded ${
                      t.status === "ACTIVE"
                        ? "bg-[#EAF2EC] text-[#2F4B3C]"
                        : "bg-[#FDF3E3] text-[#A27221]"
                    }`}
                  >
                    {t.status}
                  </span>
                </div>

                <div className="space-y-1.5 text-xs text-[#33415F]">
                  <div className="flex items-center gap-2">
                    <Mail className="w-3.5 h-3.5 text-[#8895B0]" />
                    <span>{t.email}</span>
                  </div>
                  <div className="flex items-center gap-2 font-mono">
                    <Phone className="w-3.5 h-3.5 text-[#8895B0]" />
                    <span>{t.phone}</span>
                  </div>
                </div>

                <div className="pt-2 border-t border-[#E2E6EE] text-[11px] font-mono text-[#5C6A87]">
                  <span className="block text-[9px] uppercase text-[#8895B0]">Assigned Classes</span>
                  <span className="font-semibold text-[#141B2E]">{t.classes.join(" · ")}</span>
                </div>
              </div>
            ))}
          </div>
        </main>

        <footer className="px-8 py-3 border-t border-[#E2E6EE] bg-[#FAF7F0] flex items-center justify-between text-[11px] font-mono text-[#5C6A87]">
          <span>FACULTY DIRECTORY · ASHFORD ACADEMICS</span>
          <span>ASHFORD GRAMMAR — 2026 - 2027</span>
        </footer>
      </div>
    </div>
  );
}

export default function TeachersPage() {
  return (
    <Suspense fallback={<div className="p-8 font-mono text-xs">Loading Faculty Directory...</div>}>
      <TeachersContent />
    </Suspense>
  );
}
