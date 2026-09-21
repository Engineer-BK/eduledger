"use client";

import { useState } from "react";
import { X, Send, Pin, AlertCircle, Paperclip, CheckSquare } from "lucide-react";
import { AnnouncementCategory, TargetAudience, AnnouncementAttachment } from "@/lib/announcements";

interface CreateAnnouncementModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: {
    title: string;
    content: string;
    category: AnnouncementCategory;
    targetAudience: TargetAudience;
    isPinned: boolean;
    requireAcknowledgment: boolean;
    attachments: AnnouncementAttachment[];
  }) => void;
  currentRole: "ADMIN" | "TEACHER" | "PARENT" | "STUDENT";
}

export default function CreateAnnouncementModal({
  isOpen,
  onClose,
  onSubmit,
  currentRole,
}: CreateAnnouncementModalProps) {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [category, setCategory] = useState<AnnouncementCategory>("GENERAL");
  const [targetAudience, setTargetAudience] = useState<TargetAudience>("ALL");
  const [isPinned, setIsPinned] = useState(false);
  const [requireAcknowledgment, setRequireAcknowledgment] = useState(false);
  const [attachmentName, setAttachmentName] = useState("");
  const [attachments, setAttachments] = useState<AnnouncementAttachment[]>([]);

  if (!isOpen) return null;

  const handleAddAttachment = () => {
    if (!attachmentName.trim()) return;
    setAttachments((prev) => [
      ...prev,
      {
        name: attachmentName.trim(),
        size: "350 KB",
        type: attachmentName.endsWith(".pdf") ? "PDF" : "DOC",
      },
    ]);
    setAttachmentName("");
  };

  const handleRemoveAttachment = (idx: number) => {
    setAttachments((prev) => prev.filter((_, i) => i !== idx));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !content.trim()) return;

    onSubmit({
      title: title.trim(),
      content: content.trim(),
      category,
      targetAudience,
      isPinned,
      requireAcknowledgment,
      attachments,
    });

    // Reset form
    setTitle("");
    setContent("");
    setCategory("GENERAL");
    setTargetAudience("ALL");
    setIsPinned(false);
    setRequireAcknowledgment(false);
    setAttachments([]);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-ink-900/70 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="bg-paper border-2 border-ink-800 rounded-2xl shadow-2xl max-w-2xl w-full overflow-hidden flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="bg-ink-900 text-white px-6 py-4 flex items-center justify-between border-b border-ink-700">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-brass-500 text-ink-900 font-bold flex items-center justify-center font-mono text-sm">
              +
            </div>
            <div>
              <h2 className="text-base font-bold font-serif tracking-tight">
                Publish School Announcement
              </h2>
              <p className="text-[11px] text-ink-300 font-mono">
                ISSUING AS: {currentRole} • ASHFORD GRAMMAR BULLETIN
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-ink-300 hover:text-white hover:bg-ink-700 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="p-6 overflow-y-auto space-y-5 flex-1">
          {/* Title */}
          <div>
            <label className="block text-xs font-mono font-bold uppercase tracking-wider text-ink-700 mb-1.5">
              Notice Headline / Subject <span className="text-redpen">*</span>
            </label>
            <input
              type="text"
              required
              placeholder="e.g. Michaelmas Term Parent-Teacher Conference Schedule"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full px-3.5 py-2.5 bg-white border border-ink-300 rounded-xl text-xs font-semibold text-ink-900 focus:outline-none focus:ring-2 focus:ring-brass-500/50 focus:border-brass-500"
            />
          </div>

          {/* Grid: Category & Target Audience */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-mono font-bold uppercase tracking-wider text-ink-700 mb-1.5">
                Category Bulletin Type
              </label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value as AnnouncementCategory)}
                className="w-full px-3.5 py-2.5 bg-white border border-ink-300 rounded-xl text-xs font-semibold text-ink-900 focus:outline-none focus:ring-2 focus:ring-brass-500/50 focus:border-brass-500"
              >
                <option value="GENERAL">General Notice</option>
                <option value="URGENT">Urgent Bulletin</option>
                <option value="ACADEMIC">Academic Update</option>
                <option value="EVENT">Sports & Event</option>
                <option value="STAFF">Faculty Internal</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-mono font-bold uppercase tracking-wider text-ink-700 mb-1.5">
                Target Audience
              </label>
              <select
                value={targetAudience}
                onChange={(e) => setTargetAudience(e.target.value as TargetAudience)}
                className="w-full px-3.5 py-2.5 bg-white border border-ink-300 rounded-xl text-xs font-semibold text-ink-900 focus:outline-none focus:ring-2 focus:ring-brass-500/50 focus:border-brass-500"
              >
                <option value="ALL">All School (Everyone)</option>
                <option value="PARENTS">Parents & Guardians</option>
                <option value="STUDENTS">Students Only</option>
                <option value="TEACHERS">Teachers & Faculty</option>
              </select>
            </div>
          </div>

          {/* Announcement Body */}
          <div>
            <label className="block text-xs font-mono font-bold uppercase tracking-wider text-ink-700 mb-1.5">
              Detailed Content <span className="text-redpen">*</span>
            </label>
            <textarea
              required
              rows={4}
              placeholder="Write the full announcement announcement text here..."
              value={content}
              onChange={(e) => setContent(e.target.value)}
              className="w-full px-3.5 py-2.5 bg-white border border-ink-300 rounded-xl text-xs font-medium text-ink-900 focus:outline-none focus:ring-2 focus:ring-brass-500/50 focus:border-brass-500 resize-y"
            ></textarea>
          </div>

          {/* Options Checkboxes */}
          <div className="p-3.5 bg-paper-dark border border-ink-200 rounded-xl space-y-2.5">
            <label className="flex items-center gap-2.5 cursor-pointer select-none">
              <input
                type="checkbox"
                checked={isPinned}
                onChange={(e) => setIsPinned(e.target.checked)}
                className="w-4 h-4 rounded border-ink-400 text-brass-600 focus:ring-brass-500 accent-brass-500"
              />
              <div className="flex items-center gap-1.5 text-xs font-bold text-ink-800">
                <Pin className="w-3.5 h-3.5 text-brass-600" />
                <span>Pin this notice to top of announcements feed</span>
              </div>
            </label>

            <label className="flex items-center gap-2.5 cursor-pointer select-none">
              <input
                type="checkbox"
                checked={requireAcknowledgment}
                onChange={(e) => setRequireAcknowledgment(e.target.checked)}
                className="w-4 h-4 rounded border-ink-400 text-brass-600 focus:ring-brass-500 accent-brass-500"
              />
              <div className="flex items-center gap-1.5 text-xs font-bold text-ink-800">
                <CheckSquare className="w-3.5 h-3.5 text-chalk" />
                <span>Require recipient acknowledgment (Read receipt tracking)</span>
              </div>
            </label>
          </div>

          {/* Attachments Section */}
          <div>
            <label className="block text-xs font-mono font-bold uppercase tracking-wider text-ink-700 mb-1.5">
              Attach PDF / Document (Optional)
            </label>
            <div className="flex gap-2">
              <input
                type="text"
                placeholder="e.g. Exam_Timetable_2026.pdf"
                value={attachmentName}
                onChange={(e) => setAttachmentName(e.target.value)}
                className="flex-1 px-3 py-2 bg-white border border-ink-300 rounded-xl text-xs text-ink-900 focus:outline-none"
              />
              <button
                type="button"
                onClick={handleAddAttachment}
                className="px-3 py-2 bg-ink-800 text-white rounded-xl text-xs font-bold hover:bg-ink-700 transition-colors flex items-center gap-1"
              >
                <Paperclip className="w-3.5 h-3.5" />
                Add
              </button>
            </div>

            {attachments.length > 0 && (
              <div className="mt-2.5 space-y-1.5">
                {attachments.map((att, idx) => (
                  <div
                    key={idx}
                    className="flex items-center justify-between px-3 py-1.5 bg-white border border-ink-200 rounded-lg text-xs"
                  >
                    <span className="font-mono text-ink-800 truncate">{att.name}</span>
                    <button
                      type="button"
                      onClick={() => handleRemoveAttachment(idx)}
                      className="text-redpen text-[10px] font-bold hover:underline"
                    >
                      Remove
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Action buttons */}
          <div className="pt-2 flex items-center justify-end gap-3 border-t border-ink-200">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2.5 rounded-xl border border-ink-300 text-ink-700 hover:bg-ink-100 font-bold text-xs transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-5 py-2.5 rounded-xl bg-brass-500 hover:bg-brass-600 text-ink-900 font-extrabold text-xs shadow-md transition-all flex items-center gap-2"
            >
              <Send className="w-3.5 h-3.5" />
              Publish Bulletin
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
