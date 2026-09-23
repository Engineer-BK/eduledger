"use client";

import { useState } from "react";
import { X, BookOpen, Plus, Save } from "lucide-react";

interface NewAssignmentModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit?: (data: any) => void;
}

export default function NewAssignmentModal({
  isOpen,
  onClose,
  onSubmit,
}: NewAssignmentModalProps) {
  const [formData, setFormData] = useState({
    title: "",
    targetClass: "Year 11 Physics",
    subject: "Physics",
    dueDate: "2026-09-12",
    dueTime: "15:00",
    maxPoints: 100,
    instructions: "",
  });

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.title.trim()) return;
    if (onSubmit) onSubmit(formData);
    alert(`Assignment "${formData.title}" published to ${formData.targetClass}!`);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 bg-ink-900/60 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-white max-w-lg w-full rounded-2xl border border-ink-200 shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-150">
        {/* Header */}
        <div className="bg-ink-800 text-paper p-4.5 flex items-center justify-between border-b border-ink-700">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-xl bg-ink-900 text-brass-300 border border-brass-500/30">
              <BookOpen className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-extrabold text-white font-serif">
                Publish New Assignment
              </h3>
              <p className="text-[10px] font-mono text-ink-300">
                Ashford Grammar Academic Ledger • Michaelmas Term
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
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <div>
            <label className="block text-xs font-semibold text-ink-700 mb-1">
              Assignment Title *
            </label>
            <input
              type="text"
              required
              placeholder="e.g. Year 10 Physics Lab Report #3"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              className="w-full px-3 py-2 bg-paper border border-ink-200 rounded-xl text-xs text-ink-900 font-bold focus:outline-none focus:border-brass-500"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold text-ink-700 mb-1">
                Target Class
              </label>
              <select
                value={formData.targetClass}
                onChange={(e) => setFormData({ ...formData, targetClass: e.target.value })}
                className="w-full px-3 py-2 bg-paper border border-ink-200 rounded-xl text-xs font-semibold text-ink-900 focus:outline-none focus:border-brass-500"
              >
                <option value="Year 11 Physics">Year 11 Physics</option>
                <option value="Year 9 Mathematics">Year 9 Mathematics</option>
                <option value="Year 10 Double Physics">Year 10 Double Physics</option>
                <option value="Form 3A Science">Form 3A Science</option>
                <option value="Form 2B Chemistry">Form 2B Chemistry</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-ink-700 mb-1">
                Max Marks / Points
              </label>
              <input
                type="number"
                value={formData.maxPoints}
                onChange={(e) =>
                  setFormData({ ...formData, maxPoints: Number(e.target.value) })
                }
                className="w-full px-3 py-2 bg-paper border border-ink-200 rounded-xl text-xs font-mono font-bold text-ink-900 focus:outline-none focus:border-brass-500"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold text-ink-700 mb-1">
                Due Date
              </label>
              <input
                type="date"
                value={formData.dueDate}
                onChange={(e) => setFormData({ ...formData, dueDate: e.target.value })}
                className="w-full px-3 py-2 bg-paper border border-ink-200 rounded-xl text-xs font-mono font-semibold text-ink-900 focus:outline-none focus:border-brass-500"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-ink-700 mb-1">
                Due Time
              </label>
              <input
                type="time"
                value={formData.dueTime}
                onChange={(e) => setFormData({ ...formData, dueTime: e.target.value })}
                className="w-full px-3 py-2 bg-paper border border-ink-200 rounded-xl text-xs font-mono font-semibold text-ink-900 focus:outline-none focus:border-brass-500"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-ink-700 mb-1">
              Instructions & Submission Notes
            </label>
            <textarea
              rows={3}
              placeholder="Provide guidelines for student submission or lab equipment required..."
              value={formData.instructions}
              onChange={(e) => setFormData({ ...formData, instructions: e.target.value })}
              className="w-full px-3 py-2 bg-paper border border-ink-200 rounded-xl text-xs text-ink-900 focus:outline-none focus:border-brass-500 resize-none"
            ></textarea>
          </div>

          <div className="pt-3 border-t border-ink-100 flex items-center justify-end gap-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2.5 rounded-xl border border-ink-200 text-ink-700 hover:bg-ink-50 font-bold text-xs transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-5 py-2.5 rounded-xl bg-brass-500 hover:bg-brass-600 text-white font-extrabold text-xs shadow-md transition-all flex items-center gap-1.5"
            >
              <Save className="w-4 h-4" />
              Publish Assignment
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
