"use client";

import { useState, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Sidebar from "@/components/layout/Sidebar";
import TopNav from "@/components/layout/TopNav";
import AddStudentModal from "@/components/modals/AddStudentModal";
import StudentDetailModal from "@/components/modals/StudentDetailModal";
import {
  Student,
  getStoredStudents,
  saveStoredStudents,
} from "@/lib/students";
import {
  Search,
  Plus,
  X,
  ChevronDown,
  Eye,
  Pencil,
  ChevronLeft,
  ChevronRight,
  GraduationCap,
} from "lucide-react";

function StudentsContent() {
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
  const [students, setStudents] = useState<Student[]>([]);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [selectedClass, setSelectedClass] = useState<string>("Form 3A");
  const [selectedSection, setSelectedSection] = useState<string>("");
  const [currentPage, setCurrentPage] = useState<number>(1);

  // Modals state
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [selectedStudent, setSelectedStudent] = useState<Student | null>(null);
  const [isEditMode, setIsEditMode] = useState(false);

  // Load students & handle live updates
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
      if (storedRole) setCurrentRole(storedRole);
      const storedName = localStorage.getItem("eduledger_user_name");
      if (storedName) setUserName(storedName);
    }

    const loaded = getStoredStudents();
    setStudents(loaded);

    const handleSync = () => {
      setStudents(getStoredStudents());
    };

    window.addEventListener("eduledger_students_updated", handleSync);
    return () => {
      window.removeEventListener("eduledger_students_updated", handleSync);
    };
  }, [roleParam]);

  const handleRoleChange = (newRole: "ADMIN" | "TEACHER" | "PARENT" | "STUDENT") => {
    setCurrentRole(newRole);
    if (typeof window !== "undefined") {
      localStorage.setItem("eduledger_user_role", newRole);
    }
  };

  // Add new student
  const handleAddStudent = (newStudentData: Omit<Student, "id">) => {
    const newStudent: Student = {
      ...newStudentData,
      id: `std-${Date.now()}`,
    };
    const updated = [newStudent, ...students];
    setStudents(updated);
    saveStoredStudents(updated);
  };

  // Update student
  const handleUpdateStudent = (updatedStudent: Student) => {
    const updated = students.map((s) => (s.id === updatedStudent.id ? updatedStudent : s));
    setStudents(updated);
    saveStoredStudents(updated);
    if (selectedStudent?.id === updatedStudent.id) {
      setSelectedStudent(updatedStudent);
    }
  };

  // Delete student
  const handleDeleteStudent = (id: string) => {
    const updated = students.filter((s) => s.id !== id);
    setStudents(updated);
    saveStoredStudents(updated);
    if (selectedStudent?.id === id) {
      setSelectedStudent(null);
    }
  };

  // Filtering Logic
  const filteredStudents = students.filter((s) => {
    if (selectedClass && selectedClass !== "ALL" && s.class !== selectedClass) {
      return false;
    }
    if (selectedSection && selectedSection !== "ALL" && s.section !== selectedSection) {
      return false;
    }
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      const matchName = s.name.toLowerCase().includes(q);
      const matchRoll = s.rollNo.toLowerCase().includes(q);
      const matchClass = s.class.toLowerCase().includes(q);
      if (!matchName && !matchRoll && !matchClass) return false;
    }
    return true;
  });

  const totalSimulatedEnrolled = 1284;
  const itemsPerPage = 15;
  const totalPages = Math.ceil(filteredStudents.length / itemsPerPage) || 1;
  const paginatedStudents = filteredStudents.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  // Helper for attendance badge styling exact to mockup
  const getAttendanceBadgeClass = (perc: number) => {
    if (perc === 100) {
      return "bg-[#2F4B3C] text-white font-extrabold px-2.5 py-0.5 rounded text-[11px] font-mono tracking-tight";
    }
    if (perc >= 90) {
      return "bg-[#EAF2EC] text-[#2F4B3C] font-extrabold px-2.5 py-0.5 rounded text-[11px] font-mono tracking-tight";
    }
    if (perc >= 80) {
      return "bg-[#F0F0EE] text-[#5C6A87] font-extrabold px-2.5 py-0.5 rounded text-[11px] font-mono tracking-tight";
    }
    if (perc >= 75) {
      return "bg-[#FDF3E3] text-[#A27221] font-extrabold px-2.5 py-0.5 rounded text-[11px] font-mono tracking-tight";
    }
    return "bg-[#FDF0F0] text-[#A63D40] font-extrabold px-2.5 py-0.5 rounded text-[11px] font-mono tracking-tight";
  };

  return (
    <div className="flex min-h-screen bg-[#FAF7F0] font-sans">
      {/* Ink Navy Sidebar */}
      <Sidebar
        currentRole={currentRole}
        userName={userName}
        onSwitchRole={handleRoleChange}
      />

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0">
        <TopNav
          currentRole={currentRole}
          onRoleChange={handleRoleChange}
          userName={userName}
        />

        <main className="flex-1 p-6 md:p-8 max-w-[1400px] w-full mx-auto space-y-6">
          {/* Header Bar */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h1 className="text-2xl font-extrabold text-[#141B2E] tracking-tight font-sans">
                Students
              </h1>
              <p className="text-xs text-[#5C6A87] mt-0.5 font-medium">
                {totalSimulatedEnrolled.toLocaleString()} students enrolled · Term 1, 2026
              </p>
            </div>

            <div className="flex items-center gap-3">
              {/* Search Bar */}
              <div className="relative w-full sm:w-64">
                <Search className="w-4 h-4 absolute left-3 top-2.5 text-[#8895B0]" />
                <input
                  type="text"
                  placeholder="Search students..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-9 pr-3 py-2 bg-white border border-[#E2E6EE] rounded-xl text-xs text-[#141B2E] placeholder:text-[#8895B0] focus:outline-none focus:border-[#B8862B] transition-colors"
                />
              </div>

              {/* Add Student Button */}
              <button
                onClick={() => setIsAddModalOpen(true)}
                className="px-4 py-2.5 rounded-xl bg-[#B8862B] hover:bg-[#A27221] text-white font-bold text-xs shadow-xs transition-all flex items-center gap-1.5 shrink-0"
              >
                <Plus className="w-4 h-4" />
                <span>Add student</span>
              </button>
            </div>
          </div>

          {/* Filter Bar */}
          <div className="flex flex-wrap items-center justify-between gap-4 pt-1">
            <div className="flex flex-wrap items-center gap-2">
              {/* Class Dropdown */}
              <div className="relative">
                <select
                  value={selectedClass}
                  onChange={(e) => setSelectedClass(e.target.value)}
                  className="appearance-none bg-white border border-[#E2E6EE] rounded-xl px-3.5 py-1.5 pr-8 text-xs font-semibold text-[#33415F] focus:outline-none focus:border-[#B8862B] cursor-pointer"
                >
                  <option value="ALL">Class</option>
                  <option value="Form 1A">Form 1A</option>
                  <option value="Form 1B">Form 1B</option>
                  <option value="Form 2A">Form 2A</option>
                  <option value="Form 2B">Form 2B</option>
                  <option value="Form 3A">Form 3A</option>
                  <option value="Form 3B">Form 3B</option>
                </select>
                <ChevronDown className="w-3.5 h-3.5 absolute right-2.5 top-2.5 text-[#8895B0] pointer-events-none" />
              </div>

              {/* Section Dropdown */}
              <div className="relative">
                <select
                  value={selectedSection}
                  onChange={(e) => setSelectedSection(e.target.value)}
                  className="appearance-none bg-white border border-[#E2E6EE] rounded-xl px-3.5 py-1.5 pr-8 text-xs font-semibold text-[#33415F] focus:outline-none focus:border-[#B8862B] cursor-pointer"
                >
                  <option value="ALL">Section</option>
                  <option value="Section A">Section A</option>
                  <option value="Section B">Section B</option>
                </select>
                <ChevronDown className="w-3.5 h-3.5 absolute right-2.5 top-2.5 text-[#8895B0] pointer-events-none" />
              </div>

              {/* Active Filter Tag (Form 3A x) */}
              {selectedClass && selectedClass !== "ALL" && (
                <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-white border border-[#B7BECC] rounded-xl text-xs font-bold text-[#1F2A44] shadow-2xs">
                  <span>{selectedClass}</span>
                  <button
                    onClick={() => setSelectedClass("ALL")}
                    className="p-0.5 hover:bg-[#EEF0F4] rounded-full transition-colors text-[#5C6A87]"
                  >
                    <X className="w-3 h-3" />
                  </button>
                </div>
              )}
            </div>

            {/* Showing Count */}
            <div className="text-xs text-[#5C6A87] font-medium">
              Showing {paginatedStudents.length} of {totalSimulatedEnrolled.toLocaleString()}
            </div>
          </div>

          {/* Students Ledger Table Card */}
          <div className="bg-white rounded-2xl border border-[#E2E6EE] shadow-2xs overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b border-[#E2E6EE] bg-white text-[11px] font-mono uppercase tracking-wider text-[#5C6A87]">
                    <th className="py-3.5 px-6 font-semibold">NAME</th>
                    <th className="py-3.5 px-6 font-semibold">CLASS / SECTION</th>
                    <th className="py-3.5 px-6 font-semibold">ROLL NO.</th>
                    <th className="py-3.5 px-6 font-semibold">ATTENDANCE</th>
                    <th className="py-3.5 px-6 font-semibold text-right">ACTIONS</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#E2E6EE]">
                  {paginatedStudents.length === 0 ? (
                    <tr>
                      <td colSpan={5} className="py-12 text-center text-[#5C6A87] text-xs">
                        No students found matching current filters or search query.
                      </td>
                    </tr>
                  ) : (
                    paginatedStudents.map((student) => (
                      <tr
                        key={student.id}
                        className="hover:bg-[#FAF7F0]/60 transition-colors group"
                      >
                        {/* NAME Column */}
                        <td className="py-3.5 px-6">
                          <div className="flex items-center gap-3">
                            <div className="w-8 h-8 rounded-full bg-[#E2E6EE] overflow-hidden flex items-center justify-center text-xs font-bold text-[#33415F] shrink-0 border border-[#B7BECC]/40">
                              {student.avatar ? (
                                // eslint-disable-next-line @next/next/no-img-element
                                <img
                                  src={student.avatar}
                                  alt={student.name}
                                  className="w-full h-full object-cover"
                                />
                              ) : (
                                student.name.slice(0, 2).toUpperCase()
                              )}
                            </div>
                            <span className="text-xs font-semibold text-[#141B2E]">
                              {student.name}
                            </span>
                          </div>
                        </td>

                        {/* CLASS / SECTION Column */}
                        <td className="py-3.5 px-6 text-xs text-[#33415F] font-medium">
                          {student.class}
                        </td>

                        {/* ROLL NO. Column */}
                        <td className="py-3.5 px-6 text-xs font-mono font-medium text-[#5C6A87]">
                          {student.rollNo}
                        </td>

                        {/* ATTENDANCE Column */}
                        <td className="py-3.5 px-6">
                          <span className={getAttendanceBadgeClass(student.attendance)}>
                            {student.attendance}%
                          </span>
                        </td>

                        {/* ACTIONS Column */}
                        <td className="py-3.5 px-6 text-right">
                          <div className="flex items-center justify-end gap-2 text-[#5C6A87]">
                            <button
                              onClick={() => {
                                setSelectedStudent(student);
                                setIsEditMode(false);
                              }}
                              className="p-1.5 hover:text-[#141B2E] hover:bg-[#EEF0F4] rounded-lg transition-colors"
                              title="View details"
                            >
                              <Eye className="w-4 h-4" />
                            </button>
                            <button
                              onClick={() => {
                                setSelectedStudent(student);
                                setIsEditMode(true);
                              }}
                              className="p-1.5 hover:text-[#141B2E] hover:bg-[#EEF0F4] rounded-lg transition-colors"
                              title="Edit student"
                            >
                              <Pencil className="w-4 h-4" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>

            {/* Table Footer Pagination */}
            <div className="p-4 border-t border-[#E2E6EE] flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-[#5C6A87]">
              <span>
                Showing 1–{paginatedStudents.length} of {totalSimulatedEnrolled.toLocaleString()} students
              </span>

              <div className="flex items-center gap-1 font-mono text-xs">
                <button
                  disabled={currentPage === 1}
                  onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                  className="p-1.5 rounded-lg hover:bg-[#EEF0F4] disabled:opacity-40 text-[#33415F] transition-colors"
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>

                <button
                  onClick={() => setCurrentPage(1)}
                  className={`w-7 h-7 rounded-lg text-xs font-bold transition-all ${
                    currentPage === 1
                      ? "bg-[#B8862B] text-white shadow-xs"
                      : "hover:bg-[#EEF0F4] text-[#33415F]"
                  }`}
                >
                  1
                </button>

                <button
                  onClick={() => setCurrentPage(2)}
                  className={`w-7 h-7 rounded-lg text-xs font-bold transition-all ${
                    currentPage === 2
                      ? "bg-[#B8862B] text-white shadow-xs"
                      : "hover:bg-[#EEF0F4] text-[#33415F]"
                  }`}
                >
                  2
                </button>

                <button
                  onClick={() => setCurrentPage(3)}
                  className={`w-7 h-7 rounded-lg text-xs font-bold transition-all ${
                    currentPage === 3
                      ? "bg-[#B8862B] text-white shadow-xs"
                      : "hover:bg-[#EEF0F4] text-[#33415F]"
                  }`}
                >
                  3
                </button>

                <span className="px-1 text-[#8895B0]">...</span>

                <button
                  onClick={() => setCurrentPage(86)}
                  className={`w-7 h-7 rounded-lg text-xs font-bold transition-all ${
                    currentPage === 86
                      ? "bg-[#B8862B] text-white shadow-xs"
                      : "hover:bg-[#EEF0F4] text-[#33415F]"
                  }`}
                >
                  86
                </button>

                <button
                  onClick={() => setCurrentPage((p) => Math.min(86, p + 1))}
                  className="p-1.5 rounded-lg hover:bg-[#EEF0F4] text-[#33415F] transition-colors"
                >
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </main>

        {/* Bottom Ledger Footer */}
        <footer className="px-8 py-3 border-t border-[#E2E6EE] bg-[#FAF7F0] flex items-center justify-between text-[11px] font-mono text-[#5C6A87]">
          <span>STUDENT REGISTRY • TOTAL ENROLLED 1,284</span>
          <span>ASHFORD GRAMMAR — 2026 - 2027</span>
        </footer>
      </div>

      {/* Add Student Modal */}
      <AddStudentModal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        onSubmit={handleAddStudent}
      />

      {/* Student Detail / Edit Modal */}
      <StudentDetailModal
        student={selectedStudent}
        isOpen={Boolean(selectedStudent)}
        isEditMode={isEditMode}
        onClose={() => setSelectedStudent(null)}
        onUpdate={handleUpdateStudent}
        onDelete={handleDeleteStudent}
      />
    </div>
  );
}

export default function StudentsPage() {
  return (
    <Suspense
      fallback={
        <div className="p-8 font-mono text-[#33415F] text-xs">
          Loading EduLedger Students Registry...
        </div>
      }
    >
      <StudentsContent />
    </Suspense>
  );
}
