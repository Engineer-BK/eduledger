"use client";

import { useState, useEffect } from "react";
import {
  X,
  User,
  GraduationCap,
  Phone,
  Mail,
  Calendar,
  CheckCircle2,
  Edit2,
  Trash2,
  Save,
  ShieldAlert,
} from "lucide-react";
import { Student } from "@/lib/students";

interface StudentDetailModalProps {
  student: Student | null;
  isOpen: boolean;
  isEditMode?: boolean;
  onClose: () => void;
  onUpdate: (updatedStudent: Student) => void;
  onDelete: (studentId: string) => void;
}

export default function StudentDetailModal({
  student,
  isOpen,
  isEditMode = false,
  onClose,
  onUpdate,
  onDelete,
}: StudentDetailModalProps) {
  const [editing, setEditing] = useState(isEditMode);
  const [formData, setFormData] = useState<Student | null>(null);

  useEffect(() => {
    setEditing(isEditMode);
    if (student) {
      setFormData({ ...student });
    }
  }, [student, isEditMode]);

  if (!isOpen || !student || !formData) return null;

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    onUpdate(formData);
    setEditing(false);
  };

  const getAttendanceStyle = (perc: number) => {
    if (perc === 100) return "bg-chalk text-white font-extrabold";
    if (perc >= 90) return "bg-chalk-bg text-chalk border border-chalk/30 font-bold";
    if (perc >= 80) return "bg-ink-100 text-ink-700 font-bold";
    if (perc >= 75) return "bg-brass-100 text-brass-700 border border-brass-300 font-bold";
    return "bg-redpen-bg text-redpen border border-redpen/30 font-bold";
  };

  return (
    <div className="fixed inset-0 z-50 bg-ink-900/60 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-white max-w-lg w-full rounded-2xl border border-ink-200 shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-150">
        {/* Modal Header */}
        <div className="bg-ink-800 text-paper p-4.5 flex items-center justify-between border-b border-ink-700">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-ink-900 border border-brass-500/40 flex items-center justify-center text-brass-300 font-bold font-mono text-sm shrink-0 overflow-hidden">
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
            <div>
              <h3 className="text-base font-extrabold text-white font-serif">
                {student.name}
              </h3>
              <p className="text-[10px] font-mono text-brass-300 font-semibold">
                ROLL № {student.rollNo} • {student.class} ({student.section})
              </p>
            </div>
          </div>

          <div className="flex items-center gap-1.5">
            {!editing && (
              <button
                type="button"
                onClick={() => setEditing(true)}
                className="p-1.5 rounded-lg bg-ink-700/80 hover:bg-ink-700 text-brass-300 hover:text-white transition-colors"
                title="Edit Student"
              >
                <Edit2 className="w-4 h-4" />
              </button>
            )}
            <button
              onClick={onClose}
              className="p-1.5 rounded-lg hover:bg-ink-700 text-ink-300 hover:text-white transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* View Mode */}
        {!editing ? (
          <div className="p-6 space-y-5">
            {/* Quick Metrics */}
            <div className="grid grid-cols-2 gap-3 p-3.5 bg-paper rounded-xl border border-ink-200">
              <div>
                <span className="text-[10px] font-mono uppercase tracking-widest text-ink-400 font-semibold block">
                  Attendance Rating
                </span>
                <span
                  className={`mt-1 inline-block px-2.5 py-0.5 rounded-full text-xs font-mono ${getAttendanceStyle(
                    student.attendance
                  )}`}
                >
                  {student.attendance}% RECORD
                </span>
              </div>
              <div>
                <span className="text-[10px] font-mono uppercase tracking-widest text-ink-400 font-semibold block">
                  Academic Term
                </span>
                <span className="text-xs font-bold font-mono text-ink-900 mt-1 block">
                  {student.enrolledTerm}
                </span>
              </div>
            </div>

            {/* Profile Info */}
            <div className="space-y-3">
              <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-ink-400 border-b border-ink-100 pb-1 flex items-center gap-1.5">
                <GraduationCap className="w-3.5 h-3.5 text-brass-600" />
                Student File Details
              </h4>

              <div className="grid grid-cols-2 gap-3 text-xs">
                <div>
                  <span className="text-ink-400 block font-mono text-[10px]">Gender</span>
                  <span className="font-bold text-ink-900">{student.gender}</span>
                </div>
                <div>
                  <span className="text-ink-400 block font-mono text-[10px]">Date of Birth</span>
                  <span className="font-bold font-mono text-ink-900">{student.dob}</span>
                </div>
                <div>
                  <span className="text-ink-400 block font-mono text-[10px]">Status</span>
                  <span className="inline-block px-2 py-0.5 rounded-md bg-chalk-bg text-chalk text-[10px] font-mono font-extrabold mt-0.5">
                    {student.status}
                  </span>
                </div>
                <div>
                  <span className="text-ink-400 block font-mono text-[10px]">Class / Section</span>
                  <span className="font-bold text-ink-900">
                    {student.class} • {student.section}
                  </span>
                </div>
              </div>
            </div>

            {/* Guardian Contact */}
            <div className="space-y-3">
              <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-ink-400 border-b border-ink-100 pb-1 flex items-center gap-1.5">
                <User className="w-3.5 h-3.5 text-brass-600" />
                Parent & Guardian Contact
              </h4>

              <div className="space-y-2 text-xs">
                <div className="flex items-center justify-between">
                  <span className="text-ink-500 font-semibold">Guardian Name:</span>
                  <span className="font-bold text-ink-900">{student.parentName || "N/A"}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-ink-500 font-semibold flex items-center gap-1">
                    <Phone className="w-3 h-3 text-ink-400" /> Phone:
                  </span>
                  <span className="font-bold font-mono text-ink-900">
                    {student.parentPhone || "N/A"}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-ink-500 font-semibold flex items-center gap-1">
                    <Mail className="w-3 h-3 text-ink-400" /> Email:
                  </span>
                  <span className="font-semibold text-ink-800">
                    {student.parentEmail || "N/A"}
                  </span>
                </div>
              </div>
            </div>

            {/* Action Bar */}
            <div className="pt-3 border-t border-ink-100 flex items-center justify-between">
              <button
                type="button"
                onClick={() => onDelete(student.id)}
                className="px-3 py-1.5 rounded-xl border border-redpen/30 bg-redpen-bg text-redpen hover:bg-redpen hover:text-white text-xs font-bold transition-all flex items-center gap-1.5"
              >
                <Trash2 className="w-3.5 h-3.5" />
                Remove Student
              </button>

              <button
                type="button"
                onClick={() => setEditing(true)}
                className="px-4 py-2 rounded-xl bg-ink-800 hover:bg-ink-700 text-white font-bold text-xs transition-all flex items-center gap-1.5"
              >
                <Edit2 className="w-3.5 h-3.5 text-brass-300" />
                Edit File
              </button>
            </div>
          </div>
        ) : (
          /* Edit Mode */
          <form onSubmit={handleSave} className="p-6 space-y-4 max-h-[75vh] overflow-y-auto">
            <div className="space-y-3">
              <div>
                <label className="block text-xs font-semibold text-ink-700 mb-1">
                  Full Name
                </label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-3 py-2 bg-paper border border-ink-200 rounded-xl text-xs font-bold text-ink-900 focus:outline-none focus:border-brass-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-ink-700 mb-1">
                    Class
                  </label>
                  <input
                    type="text"
                    value={formData.class}
                    onChange={(e) => setFormData({ ...formData, class: e.target.value })}
                    className="w-full px-3 py-2 bg-paper border border-ink-200 rounded-xl text-xs font-bold text-ink-900 focus:outline-none focus:border-brass-500"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-ink-700 mb-1">
                    Roll Number
                  </label>
                  <input
                    type="text"
                    value={formData.rollNo}
                    onChange={(e) => setFormData({ ...formData, rollNo: e.target.value })}
                    className="w-full px-3 py-2 bg-paper border border-ink-200 rounded-xl text-xs font-mono font-bold text-ink-900 focus:outline-none focus:border-brass-500"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-ink-700 mb-1">
                    Attendance %
                  </label>
                  <input
                    type="number"
                    min="0"
                    max="100"
                    value={formData.attendance}
                    onChange={(e) =>
                      setFormData({ ...formData, attendance: Number(e.target.value) })
                    }
                    className="w-full px-3 py-2 bg-paper border border-ink-200 rounded-xl text-xs font-mono font-bold text-ink-900 focus:outline-none focus:border-brass-500"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-ink-700 mb-1">
                    Parent Phone
                  </label>
                  <input
                    type="text"
                    value={formData.parentPhone}
                    onChange={(e) =>
                      setFormData({ ...formData, parentPhone: e.target.value })
                    }
                    className="w-full px-3 py-2 bg-paper border border-ink-200 rounded-xl text-xs font-mono text-ink-900 focus:outline-none focus:border-brass-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-ink-700 mb-1">
                  Parent / Guardian Name
                </label>
                <input
                  type="text"
                  value={formData.parentName}
                  onChange={(e) => setFormData({ ...formData, parentName: e.target.value })}
                  className="w-full px-3 py-2 bg-paper border border-ink-200 rounded-xl text-xs text-ink-900 focus:outline-none focus:border-brass-500"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-ink-700 mb-1">
                  Parent Email
                </label>
                <input
                  type="email"
                  value={formData.parentEmail}
                  onChange={(e) => setFormData({ ...formData, parentEmail: e.target.value })}
                  className="w-full px-3 py-2 bg-paper border border-ink-200 rounded-xl text-xs text-ink-900 focus:outline-none focus:border-brass-500"
                />
              </div>
            </div>

            <div className="pt-4 border-t border-ink-100 flex items-center justify-end gap-2">
              <button
                type="button"
                onClick={() => setEditing(false)}
                className="px-4 py-2 rounded-xl border border-ink-200 text-ink-700 font-bold text-xs hover:bg-ink-50 transition-colors"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-5 py-2 rounded-xl bg-brass-500 hover:bg-brass-600 text-white font-extrabold text-xs shadow-md transition-all flex items-center gap-1.5"
              >
                <Save className="w-4 h-4" />
                Save Changes
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
