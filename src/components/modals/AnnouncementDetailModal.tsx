"use client";

import { X, Pin, CheckCircle2, FileText, Download, Trash2, Calendar, User, Eye } from "lucide-react";
import { Announcement } from "@/lib/announcements";

interface AnnouncementDetailModalProps {
  announcement: Announcement | null;
  isOpen: boolean;
  onClose: () => void;
  onAcknowledge: (id: string) => void;
  onTogglePin: (id: string) => void;
  onDelete: (id: string) => void;
  currentRole: "ADMIN" | "TEACHER" | "PARENT" | "STUDENT";
}

export default function AnnouncementDetailModal({
  announcement,
  isOpen,
  onClose,
  onAcknowledge,
  onTogglePin,
  onDelete,
  currentRole,
}: AnnouncementDetailModalProps) {
  if (!isOpen || !announcement) return null;

  const isAcknowledgedByRole = announcement.acknowledgedBy.includes(currentRole);
  const isRead = announcement.isRead || isAcknowledgedByRole;

  const getCategoryBadgeClass = (category: string) => {
    switch (category) {
      case "URGENT":
        return "bg-redpen-bg text-redpen border-redpen/40 font-bold";
      case "EVENT":
        return "bg-brass-100 text-brass-700 border-brass-300 font-bold";
      case "ACADEMIC":
        return "bg-ink-100 text-ink-800 border-ink-300 font-bold";
      case "STAFF":
        return "bg-ink-800 text-paper border-ink-900 font-bold";
      default:
        return "bg-chalk-bg text-chalk border-chalk/40 font-bold";
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-ink-900/70 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="bg-paper border-2 border-ink-800 rounded-2xl shadow-2xl max-w-2xl w-full overflow-hidden flex flex-col max-h-[90vh]">
        {/* Top Header */}
        <div className="bg-ink-900 text-white p-6 border-b border-ink-700 space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 flex-wrap">
              <span
                className={`text-[10px] font-mono uppercase tracking-wider px-2.5 py-0.5 rounded-full border ${getCategoryBadgeClass(
                  announcement.category
                )}`}
              >
                {announcement.category}
              </span>
              <span className="text-[10px] font-mono uppercase tracking-wider px-2 py-0.5 rounded-full bg-ink-800 text-ink-200 border border-ink-700">
                TARGET: {announcement.targetAudience}
              </span>
              {announcement.isPinned && (
                <span className="text-[10px] font-mono tracking-wider px-2 py-0.5 rounded-full bg-brass-500 text-ink-900 font-bold flex items-center gap-1">
                  <Pin className="w-3 h-3 fill-ink-900" /> PINNED
                </span>
              )}
            </div>

            <button
              onClick={onClose}
              className="p-1.5 rounded-lg text-ink-300 hover:text-white hover:bg-ink-700 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <h2 className="text-xl font-extrabold font-serif text-white tracking-tight leading-snug">
            {announcement.title}
          </h2>

          <div className="flex items-center justify-between text-xs text-ink-300 font-mono pt-1">
            <div className="flex items-center gap-3">
              <span className="flex items-center gap-1">
                <User className="w-3.5 h-3.5 text-brass-300" />
                {announcement.author} ({announcement.authorRole})
              </span>
              <span>•</span>
              <span className="flex items-center gap-1">
                <Calendar className="w-3.5 h-3.5 text-ink-400" />
                {announcement.dateFormatted}
              </span>
            </div>
          </div>
        </div>

        {/* Content Body */}
        <div className="p-6 overflow-y-auto space-y-6 flex-1 bg-paper">
          {/* Main Text */}
          <div className="prose prose-slate max-w-none text-xs sm:text-sm text-ink-800 leading-relaxed whitespace-pre-line font-sans border-l-2 border-brass-500/40 pl-4 py-1">
            {announcement.content}
          </div>

          {/* Attachments Section */}
          {announcement.attachments && announcement.attachments.length > 0 && (
            <div className="p-4 bg-paper-dark rounded-xl border border-ink-200 space-y-2">
              <h3 className="text-xs font-mono font-bold uppercase tracking-wider text-ink-700 flex items-center gap-1.5">
                <FileText className="w-4 h-4 text-brass-600" />
                Official Attachments ({announcement.attachments.length})
              </h3>
              <div className="space-y-2">
                {announcement.attachments.map((att, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between p-2.5 bg-white border border-ink-200 rounded-lg text-xs hover:border-brass-400 transition-all"
                  >
                    <div className="flex items-center gap-2 overflow-hidden">
                      <span className="px-2 py-0.5 bg-brass-100 text-brass-700 font-mono text-[10px] font-bold rounded">
                        {att.type}
                      </span>
                      <span className="font-bold text-ink-900 truncate">{att.name}</span>
                      <span className="text-[10px] font-mono text-ink-400">({att.size})</span>
                    </div>
                    <button
                      onClick={() =>
                        alert(`Downloading ${att.name}... Demonstration file retrieved.`)
                      }
                      className="px-3 py-1 bg-ink-800 text-white hover:bg-brass-500 hover:text-ink-900 font-bold text-[11px] rounded-md transition-all flex items-center gap-1 shrink-0"
                    >
                      <Download className="w-3 h-3" />
                      Download
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Read Receipt & Acknowledgment Status Bar */}
          {announcement.requireAcknowledgment && (
            <div className="p-4 bg-chalk-bg border border-chalk/30 rounded-xl flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div>
                <div className="flex items-center gap-2 text-xs font-bold text-chalk">
                  <CheckCircle2 className="w-4 h-4 text-chalk" />
                  <span>Acknowledgment Required</span>
                </div>
                {announcement.stats && (
                  <p className="text-[11px] font-mono text-ink-600 mt-0.5">
                    Stats: {announcement.stats.acknowledgedCount} / {announcement.stats.totalTargetCount} registered recipients acknowledged ({Math.round((announcement.stats.acknowledgedCount / announcement.stats.totalTargetCount) * 100)}%)
                  </p>
                )}
              </div>

              {!isAcknowledgedByRole ? (
                <button
                  onClick={() => onAcknowledge(announcement.id)}
                  className="px-4 py-2 bg-chalk text-white hover:bg-chalk-light font-extrabold text-xs rounded-xl shadow-xs transition-all flex items-center gap-2 shrink-0"
                >
                  <CheckCircle2 className="w-4 h-4" />
                  Acknowledge & Confirm Read
                </button>
              ) : (
                <span className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-chalk text-white rounded-lg text-xs font-mono font-bold">
                  <CheckCircle2 className="w-3.5 h-3.5" /> ACKNOWLEDGED BY YOU
                </span>
              )}
            </div>
          )}
        </div>

        {/* Modal Footer Controls */}
        <div className="p-4 bg-ink-900 text-white border-t border-ink-700 flex items-center justify-between">
          <div className="flex items-center gap-2">
            {(currentRole === "ADMIN" || currentRole === "TEACHER") && (
              <>
                <button
                  onClick={() => onTogglePin(announcement.id)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold font-mono transition-colors flex items-center gap-1.5 ${
                    announcement.isPinned
                      ? "bg-brass-500 text-ink-900"
                      : "bg-ink-800 text-ink-200 hover:text-white"
                  }`}
                >
                  <Pin className="w-3.5 h-3.5" />
                  {announcement.isPinned ? "Pinned" : "Pin Notice"}
                </button>

                <button
                  onClick={() => {
                    if (confirm("Are you sure you want to delete this announcement?")) {
                      onDelete(announcement.id);
                      onClose();
                    }
                  }}
                  className="px-3 py-1.5 rounded-lg bg-redpen/20 text-redpen-light hover:bg-redpen hover:text-white text-xs font-bold font-mono transition-colors flex items-center gap-1.5"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                  Delete
                </button>
              </>
            )}
          </div>

          <button
            onClick={onClose}
            className="px-4 py-1.5 rounded-xl bg-ink-800 hover:bg-ink-700 text-white text-xs font-bold font-mono transition-colors"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}
