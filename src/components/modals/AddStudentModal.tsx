"use client";

import { useState } from "react";
import { X, UserPlus, Save, GraduationCap } from "lucide-react";
import { Student } from "@/lib/students";

interface AddStudentModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (newStudent: Omit<Student, "id">) => void;
}

export default function AddStudentModal({
  isOpen,
  onClose,
  onSubmit,
}: AddStudentModalProps) {
  const [formData, setFormData] = useState({
    name: "",
    class: "Form 3A",
    section: "Section A",
    rollNo: "",
    attendance: 95,
    gender: "Female" as "Male" | "Female",
    dob: "2010-01-01",
    parentName: "",
    parentPhone: "",
    parentEmail: "",
    status: "ACTIVE" as "ACTIVE" | "INACTIVE" | "SUSPENDED",
    enrolledTerm: "Term 1, 2026",
  });

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name.trim() || !formData.rollNo.trim()) return;

    onSubmit({
      ...formData,
    });

    // Reset
    setFormData({
      name: "",
      class: "Form 3A",
      section: "Section A",
      rollNo: "",
      attendance: 95,
      gender: "Female",
      dob: "2010-01-01",
      parentName: "",
      parentPhone: "",
      parentEmail: "",
      status: "ACTIVE",
      enrolledTerm: "Term 1, 2026",
    });

    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 bg-ink-900/60 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-white max-w-xl w-full rounded-2xl border border-ink-200 shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-150">
        {/* Header */}
        <div className="bg-ink-800 text-paper p-4.5 flex items-center justify-between border-b border-ink-700">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-xl bg-ink-900 text-brass-300 border border-brass-500/30">
              <UserPlus className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-extrabold text-white font-serif">
                Enroll New Student
              </h3>
              <p className="text-[10px] font-mono text-ink-300">
                Ashford Grammar Registry • Term 1, 2026
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg hover:bg-ink-700 text-ink-300 hover:text-white transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4 max-h-[80vh] overflow-y-auto">
          {/* Section: Academic Info */}
          <div className="space-y-3">
            <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-ink-400 border-b border-ink-100 pb-1 flex items-center gap-1.5">
              <GraduationCap className="w-3.5 h-3.5 text-brass-600" />
              Academic Identification
            </h4>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-semibold text-ink-700 mb-1">
                  Full Student Name *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Kwame Mensah"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-3 py-2 bg-paper border border-ink-200 rounded-xl text-xs text-ink-900 focus:outline-none focus:border-brass-500 font-semibold"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-ink-700 mb-1">
                  Roll Number *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. 3A-045"
                  value={formData.rollNo}
                  onChange={(e) => setFormData({ ...formData, rollNo: e.target.value })}
                  className="w-full px-3 py-2 bg-paper border border-ink-200 rounded-xl text-xs font-mono text-ink-900 focus:outline-none focus:border-brass-500 font-bold"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-ink-700 mb-1">
                  Class Assignment
                </label>
                <select
                  value={formData.class}
                  onChange={(e) => {
                    const selectedClass = e.target.value;
                    const defaultSec = selectedClass.includes("A") ? "Section A" : "Section B";
                    setFormData({ ...formData, class: selectedClass, section: defaultSec });
                  }}
                  className="w-full px-3 py-2 bg-paper border border-ink-200 rounded-xl text-xs font-semibold text-ink-900 focus:outline-none focus:border-brass-500"
                >
                  <option value="Form 1A">Form 1A</option>
                  <option value="Form 1B">Form 1B</option>
                  <option value="Form 2A">Form 2A</option>
                  <option value="Form 2B">Form 2B</option>
                  <option value="Form 3A">Form 3A</option>
                  <option value="Form 3B">Form 3B</option>
                  <option value="Form 4A">Form 4A</option>
                  <option value="Form 4B">Form 4B</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-ink-700 mb-1">
                  Section
                </label>
                <select
                  value={formData.section}
                  onChange={(e) => setFormData({ ...formData, section: e.target.value })}
                  className="w-full px-3 py-2 bg-paper border border-ink-200 rounded-xl text-xs font-semibold text-ink-900 focus:outline-none focus:border-brass-500"
                >
                  <option value="Section A">Section A</option>
                  <option value="Section B">Section B</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-ink-700 mb-1">
                  Gender
                </label>
                <select
                  value={formData.gender}
                  onChange={(e) =>
                    setFormData({ ...formData, gender: e.target.value as "Male" | "Female" })
                  }
                  className="w-full px-3 py-2 bg-paper border border-ink-200 rounded-xl text-xs font-semibold text-ink-900 focus:outline-none focus:border-brass-500"
                >
                  <option value="Female">Female</option>
                  <option value="Male">Male</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-ink-700 mb-1">
                  Initial Attendance %
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
            </div>
          </div>

          {/* Section: Guardian Contact */}
          <div className="space-y-3 pt-2">
            <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-ink-400 border-b border-ink-100 pb-1">
              Parent / Guardian Contact
            </h4>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-semibold text-ink-700 mb-1">
                  Parent/Guardian Name
                </label>
                <input
                  type="text"
                  placeholder="e.g. Kofi Mensah"
                  value={formData.parentName}
                  onChange={(e) => setFormData({ ...formData, parentName: e.target.value })}
                  className="w-full px-3 py-2 bg-paper border border-ink-200 rounded-xl text-xs text-ink-900 focus:outline-none focus:border-brass-500"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-ink-700 mb-1">
                  Contact Phone
                </label>
                <input
                  type="text"
                  placeholder="+233 24 123 4567"
                  value={formData.parentPhone}
                  onChange={(e) => setFormData({ ...formData, parentPhone: e.target.value })}
                  className="w-full px-3 py-2 bg-paper border border-ink-200 rounded-xl text-xs font-mono text-ink-900 focus:outline-none focus:border-brass-500"
                />
              </div>

              <div className="sm:col-span-2">
                <label className="block text-xs font-semibold text-ink-700 mb-1">
                  Contact Email Address
                </label>
                <input
                  type="email"
                  placeholder="parent.email@example.com"
                  value={formData.parentEmail}
                  onChange={(e) => setFormData({ ...formData, parentEmail: e.target.value })}
                  className="w-full px-3 py-2 bg-paper border border-ink-200 rounded-xl text-xs text-ink-900 focus:outline-none focus:border-brass-500"
                />
              </div>
            </div>
          </div>

          {/* Buttons */}
          <div className="pt-4 flex items-center justify-end gap-2 border-t border-ink-100">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2.5 rounded-xl border border-ink-200 text-ink-700 hover:bg-ink-50 font-bold text-xs transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-5 py-2.5 rounded-xl bg-brass-500 hover:bg-brass-600 text-white font-extrabold text-xs shadow-md transition-all flex items-center gap-2"
            >
              <Save className="w-4 h-4" />
              <span>Enroll Student</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
