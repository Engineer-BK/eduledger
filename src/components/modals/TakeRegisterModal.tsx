"use client";

import { useState } from "react";
import { X, CheckCircle2, XCircle, CheckSquare, Save } from "lucide-react";

interface TakeRegisterModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function TakeRegisterModal({ isOpen, onClose }: TakeRegisterModalProps) {
  const [students, setStudents] = useState([
    { id: "1", name: "Kwame Asante", roll: "101", status: "PRESENT" },
    { id: "2", name: "Abena Mensah", roll: "102", status: "PRESENT" },
    { id: "3", name: "Kofi Owusu", roll: "103", status: "ABSENT" },
    { id: "4", name: "Akua Osei", roll: "104", status: "PRESENT" },
    { id: "5", name: "Yaw Addo", roll: "105", status: "PRESENT" },
  ]);

  const [saved, setSaved] = useState(false);

  if (!isOpen) return null;

  const toggleStatus = (id: string) => {
    setStudents((prev) =>
      prev.map((s) =>
        s.id === id ? { ...s, status: s.status === "PRESENT" ? "ABSENT" : "PRESENT" } : s
      )
    );
  };

  const presentCount = students.filter((s) => s.status === "PRESENT").length;

  const handleSave = () => {
    setSaved(true);
    setTimeout(() => {
      setSaved(false);
      onClose();
    }, 600);
  };

  return (
    <div className="fixed inset-0 z-50 bg-ink-900/60 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-white max-w-lg w-full rounded-2xl border border-ink-200 shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-150">
        {/* Header */}
        <div className="bg-ink-800 text-paper p-4 flex items-center justify-between border-b border-ink-700">
          <div className="flex items-center gap-2">
            <CheckSquare className="w-5 h-5 text-brass-300" />
            <div>
              <h3 className="text-sm font-bold text-white">Daily Attendance Register</h3>
              <p className="text-[10px] font-mono text-ink-300">
                Year 11 Physics • Room Lab 2 • Teacher: Ama Mensah
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-lg hover:bg-ink-700 text-ink-300 hover:text-white transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Register Body */}
        <div className="p-6 space-y-4">
          <div className="flex items-center justify-between text-xs p-3 bg-paper rounded-xl border border-ink-200">
            <span className="font-bold text-ink-800">Wed 10 Sept 2026</span>
            <span className="font-mono font-bold text-chalk bg-chalk-bg px-2.5 py-1 rounded">
              {presentCount} / {students.length} PRESENT ({Math.round((presentCount / students.length) * 100)}%)
            </span>
          </div>

          <div className="space-y-2 max-h-60 overflow-y-auto">
            {students.map((student) => (
              <div
                key={student.id}
                onClick={() => toggleStatus(student.id)}
                className={`p-3 rounded-xl border flex items-center justify-between cursor-pointer transition-all ${
                  student.status === "PRESENT"
                    ? "bg-chalk-bg/40 border-chalk/30 text-ink-800"
                    : "bg-redpen-bg/40 border-redpen/30 text-ink-800"
                }`}
              >
                <div>
                  <span className="text-xs font-bold block">{student.name}</span>
                  <span className="text-[10px] font-mono text-ink-400">Roll #{student.roll}</span>
                </div>
                <button
                  type="button"
                  className={`px-3 py-1 rounded-lg text-xs font-bold font-mono transition-all ${
                    student.status === "PRESENT"
                      ? "bg-chalk text-white"
                      : "bg-redpen text-white"
                  }`}
                >
                  {student.status}
                </button>
              </div>
            ))}
          </div>

          <div className="pt-2">
            <button
              onClick={handleSave}
              className="w-full py-3 bg-brass-500 hover:bg-brass-600 text-white font-bold text-xs rounded-xl shadow-md hover:shadow transition-all flex items-center justify-center gap-2"
            >
              <Save className="w-4 h-4" />
              <span>{saved ? "Register Saved to Ledger!" : "Save Class Register"}</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
