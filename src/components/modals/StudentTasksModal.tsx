"use client";

import { useState } from "react";
import { X, BookOpen, CheckCircle2, Clock, Calendar, AlertCircle } from "lucide-react";

interface StudentTasksModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function StudentTasksModal({ isOpen, onClose }: StudentTasksModalProps) {
  const [tasks, setTasks] = useState([
    {
      id: "tsk-001",
      title: "Year 11 Physics Lab Report #2 — Motion & Forces",
      subject: "Physics",
      teacher: "Mrs Mensah",
      dueDate: "Thu 11 Sept, 15:00",
      isSubmitted: false,
      priority: "HIGH",
    },
    {
      id: "tsk-002",
      title: "Mathematics Quadratic Functions Homework Set 4",
      subject: "Mathematics",
      teacher: "Mr Osei",
      dueDate: "Thu 11 Sept, 23:59",
      isSubmitted: false,
      priority: "MEDIUM",
    },
    {
      id: "tsk-003",
      title: "English Literature Essay — Macbeth Act 2 Analysis",
      subject: "English",
      teacher: "Miss Boadu",
      dueDate: "Mon 15 Sept, 09:00",
      isSubmitted: true,
      priority: "NORMAL",
    },
  ]);

  if (!isOpen) return null;

  const toggleTask = (id: string) => {
    setTasks((prev) =>
      prev.map((t) => (t.id === id ? { ...t, isSubmitted: !t.isSubmitted } : t))
    );
  };

  return (
    <div className="fixed inset-0 z-50 bg-[#141B2E]/60 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-white max-w-lg w-full rounded-2xl border border-[#E2E6EE] shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-150">
        {/* Header */}
        <div className="bg-[#1F2A44] text-[#FAF7F0] p-4.5 flex items-center justify-between border-b border-[#27344E]">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-xl bg-[#141B2E] text-[#D9AF5D] border border-[#D9AF5D]/30">
              <BookOpen className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-extrabold text-white font-serif">
                My Assignments & Homework Tasks
              </h3>
              <p className="text-[10px] font-mono text-[#8895B0]">
                Kwame Asante • Year 11 (House Volta)
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg hover:bg-[#27344E] text-[#8895B0] hover:text-white transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Task List Body */}
        <div className="p-6 space-y-4 max-h-[75vh] overflow-y-auto">
          <div className="flex items-center justify-between text-xs p-3 bg-[#FAF7F0] rounded-xl border border-[#E2E6EE]">
            <span className="font-bold text-[#141B2E]">Michaelmas Term Homework</span>
            <span className="font-mono font-bold text-[#2F4B3C] bg-[#EAF2EC] px-2.5 py-1 rounded">
              {tasks.filter((t) => t.isSubmitted).length} / {tasks.length} Completed
            </span>
          </div>

          <div className="space-y-2.5">
            {tasks.map((task) => (
              <div
                key={task.id}
                onClick={() => toggleTask(task.id)}
                className={`p-3.5 rounded-xl border flex items-start justify-between gap-3 cursor-pointer transition-all ${
                  task.isSubmitted
                    ? "bg-[#EAF2EC]/40 border-[#2F4B3C]/30 text-[#5C6A87]"
                    : "bg-white border-[#E2E6EE] hover:border-[#B8862B] text-[#141B2E] shadow-2xs"
                }`}
              >
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span
                      className={`text-[9px] font-mono font-bold px-2 py-0.5 rounded ${
                        task.isSubmitted
                          ? "bg-[#EAF2EC] text-[#2F4B3C]"
                          : task.priority === "HIGH"
                          ? "bg-[#FDF0F0] text-[#A63D40]"
                          : "bg-[#FDF3E3] text-[#A27221]"
                      }`}
                    >
                      {task.subject}
                    </span>
                    <span className="text-[10px] font-mono text-[#5C6A87]">
                      {task.teacher}
                    </span>
                  </div>

                  <h4
                    className={`text-xs font-bold leading-snug ${
                      task.isSubmitted ? "line-through text-[#8895B0]" : "text-[#141B2E]"
                    }`}
                  >
                    {task.title}
                  </h4>

                  <span className="text-[10px] font-mono text-[#5C6A87] flex items-center gap-1">
                    <Clock className="w-3 h-3 text-[#B8862B]" /> Due: {task.dueDate}
                  </span>
                </div>

                <button
                  type="button"
                  className={`px-3 py-1 rounded-lg text-[11px] font-bold font-mono transition-all shrink-0 ${
                    task.isSubmitted
                      ? "bg-[#2F4B3C] text-white"
                      : "bg-[#B8862B] text-white hover:bg-[#A27221]"
                  }`}
                >
                  {task.isSubmitted ? "Submitted ✓" : "Submit Task"}
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
