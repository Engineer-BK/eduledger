"use client";

import { useState, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Sidebar from "@/components/layout/Sidebar";
import TopNav from "@/components/layout/TopNav";
import CreateAnnouncementModal from "@/components/modals/CreateAnnouncementModal";
import AnnouncementDetailModal from "@/components/modals/AnnouncementDetailModal";
import {
  Announcement,
  AnnouncementCategory,
  TargetAudience,
  getStoredAnnouncements,
  saveStoredAnnouncements,
} from "@/lib/announcements";
import {
  Bell,
  Search,
  Plus,
  Pin,
  CheckCircle2,
  AlertTriangle,
  Calendar,
  User,
  Paperclip,
  ChevronRight,
  Filter,
  BookOpen,
  Sparkles,
  Layers,
} from "lucide-react";

function AnnouncementsContent() {
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
  const [announcements, setAnnouncements] = useState<Announcement[]>([]);
  const [activeTab, setActiveTab] = useState<
    "ALL" | "UNREAD" | "PINNED" | "URGENT" | "ACADEMIC" | "EVENT"
  >("ALL");
  const [audienceFilter, setAudienceFilter] = useState<string>("ALL");
  const [searchQuery, setSearchQuery] = useState<string>("");

  // Modals state
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [selectedAnnouncement, setSelectedAnnouncement] = useState<Announcement | null>(null);

  // Initial load & storage sync
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

    const loaded = getStoredAnnouncements();
    setAnnouncements(loaded);

    const handleSync = () => {
      setAnnouncements(getStoredAnnouncements());
    };

    window.addEventListener("eduledger_announcements_updated", handleSync);
    return () => {
      window.removeEventListener("eduledger_announcements_updated", handleSync);
    };
  }, [roleParam]);

  const handleRoleChange = (newRole: "ADMIN" | "TEACHER" | "PARENT" | "STUDENT") => {
    setCurrentRole(newRole);
    if (typeof window !== "undefined") {
      localStorage.setItem("eduledger_user_role", newRole);
    }
  };

  // Helper actions
  const handleAcknowledge = (id: string) => {
    const updated = announcements.map((ann) => {
      if (ann.id === id) {
        const acknowledgedBy = ann.acknowledgedBy.includes(currentRole)
          ? ann.acknowledgedBy
          : [...ann.acknowledgedBy, currentRole];
        const newStats = ann.stats
          ? {
              ...ann.stats,
              acknowledgedCount: ann.acknowledgedBy.includes(currentRole)
                ? ann.stats.acknowledgedCount
                : ann.stats.acknowledgedCount + 1,
            }
          : undefined;
        return {
          ...ann,
          isRead: true,
          acknowledgedBy,
          stats: newStats,
        };
      }
      return ann;
    });

    setAnnouncements(updated);
    saveStoredAnnouncements(updated);
    if (selectedAnnouncement && selectedAnnouncement.id === id) {
      setSelectedAnnouncement(updated.find((a) => a.id === id) || null);
    }
  };

  const handleTogglePin = (id: string) => {
    const updated = announcements.map((ann) => {
      if (ann.id === id) {
        return { ...ann, isPinned: !ann.isPinned };
      }
      return ann;
    });
    setAnnouncements(updated);
    saveStoredAnnouncements(updated);
    if (selectedAnnouncement && selectedAnnouncement.id === id) {
      setSelectedAnnouncement(updated.find((a) => a.id === id) || null);
    }
  };

  const handleDelete = (id: string) => {
    const updated = announcements.filter((ann) => ann.id !== id);
    setAnnouncements(updated);
    saveStoredAnnouncements(updated);
    if (selectedAnnouncement && selectedAnnouncement.id === id) {
      setSelectedAnnouncement(null);
    }
  };

  const handleCreateSubmit = (data: {
    title: string;
    content: string;
    category: AnnouncementCategory;
    targetAudience: TargetAudience;
    isPinned: boolean;
    requireAcknowledgment: boolean;
    attachments: any[];
  }) => {
    const now = new Date();
    const newAnn: Announcement = {
      id: `ann-${Date.now()}`,
      title: data.title,
      content: data.content,
      author: userName || (currentRole === "ADMIN" ? "Headmaster's Office" : "Faculty Dept."),
      authorRole: currentRole === "ADMIN" ? "ADMIN" : currentRole === "TEACHER" ? "TEACHER" : "STAFF",
      category: data.category,
      targetAudience: data.targetAudience,
      dateFormatted: `${now.toLocaleDateString("en-GB", {
        day: "2-digit",
        month: "short",
        year: "numeric",
      })}, ${now.toLocaleTimeString("en-GB", {
        hour: "2-digit",
        minute: "2-digit",
        hour12: true,
      })}`,
      timestamp: now.toISOString(),
      isPinned: data.isPinned,
      requireAcknowledgment: data.requireAcknowledgment,
      acknowledgedBy: [],
      isRead: false,
      attachments: data.attachments,
      stats: data.requireAcknowledgment
        ? { acknowledgedCount: 0, totalTargetCount: 160 }
        : undefined,
    };

    const updated = [newAnn, ...announcements];
    setAnnouncements(updated);
    saveStoredAnnouncements(updated);
  };

  // Filtering Logic
  const filteredAnnouncements = announcements.filter((ann) => {
    // Role relevance filter: Parents see ALL & PARENTS; Students see ALL & STUDENTS, etc.
    if (currentRole === "PARENT" && ann.targetAudience !== "ALL" && ann.targetAudience !== "PARENTS") {
      return false;
    }
    if (currentRole === "STUDENT" && ann.targetAudience !== "ALL" && ann.targetAudience !== "STUDENTS") {
      return false;
    }
    if (currentRole === "TEACHER" && ann.targetAudience !== "ALL" && ann.targetAudience !== "TEACHERS") {
      return false;
    }

    // Audience dropdown filter
    if (audienceFilter !== "ALL" && ann.targetAudience !== audienceFilter) {
      return false;
    }

    // Search query filter
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      const matchTitle = ann.title.toLowerCase().includes(q);
      const matchContent = ann.content.toLowerCase().includes(q);
      const matchAuthor = ann.author.toLowerCase().includes(q);
      if (!matchTitle && !matchContent && !matchAuthor) return false;
    }

    // Tab filter
    if (activeTab === "UNREAD") return !ann.isRead;
    if (activeTab === "PINNED") return ann.isPinned;
    if (activeTab === "URGENT") return ann.category === "URGENT";
    if (activeTab === "ACADEMIC") return ann.category === "ACADEMIC";
    if (activeTab === "EVENT") return ann.category === "EVENT";

    return true;
  });

  // Calculate metrics
  const unreadCount = announcements.filter((a) => !a.isRead).length;
  const pinnedCount = announcements.filter((a) => a.isPinned).length;
  const urgentCount = announcements.filter((a) => a.category === "URGENT").length;

  const getCategoryTagStyle = (category: AnnouncementCategory) => {
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
    <div className="flex min-h-screen bg-paper font-sans">
      {/* Ink Navy Sidebar */}
      <Sidebar
        currentRole={currentRole}
        userName={userName}
        onSwitchRole={handleRoleChange}
      />

      {/* Main Content Container */}
      <div className="flex-1 flex flex-col min-w-0">
        <TopNav
          currentRole={currentRole}
          onRoleChange={handleRoleChange}
          userName={userName}
        />

        <main className="flex-1 p-6 md:p-8 max-w-7xl w-full mx-auto space-y-6">
          {/* Header Banner */}
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-ink-200 pb-5">
            <div>
              <div className="flex items-center gap-2">
                <div className="p-2 rounded-xl bg-ink-900 text-brass-300">
                  <Bell className="w-5 h-5" />
                </div>
                <div>
                  <h1 className="text-2xl font-extrabold text-ink-900 tracking-tight font-serif">
                    Official Announcements & Bulletins
                  </h1>
                  <p className="text-xs text-ink-500 font-mono">
                    Ashford Grammar Registry • Official Notices & Circulars
                  </p>
                </div>
              </div>
            </div>

            {(currentRole === "ADMIN" || currentRole === "TEACHER") && (
              <button
                onClick={() => setIsCreateModalOpen(true)}
                className="px-4 py-2.5 rounded-xl bg-brass-500 hover:bg-brass-600 text-ink-900 font-extrabold text-xs shadow-md transition-all flex items-center gap-2 self-start md:self-auto"
              >
                <Plus className="w-4 h-4 stroke-[3]" />
                Publish Announcement
              </button>
            )}
          </div>

          {/* Quick Metrics Bar */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            <div className="p-4 rounded-xl bg-white border border-ink-200 shadow-2xs">
              <span className="text-[10px] font-mono uppercase tracking-widest text-ink-400 font-semibold block">
                Total Bulletins
              </span>
              <span className="text-2xl font-extrabold text-ink-900 font-ledger-mono mt-1 block">
                {announcements.length}
              </span>
            </div>

            <div className="p-4 rounded-xl bg-white border border-ink-200 shadow-2xs">
              <span className="text-[10px] font-mono uppercase tracking-widest text-ink-400 font-semibold block">
                Unread Notices
              </span>
              <div className="flex items-center gap-2 mt-1">
                <span className="text-2xl font-extrabold text-brass-600 font-ledger-mono">
                  {unreadCount}
                </span>
                {unreadCount > 0 && (
                  <span className="px-1.5 py-0.5 rounded-full bg-brass-100 text-brass-700 text-[10px] font-mono font-bold">
                    NEW
                  </span>
                )}
              </div>
            </div>

            <div className="p-4 rounded-xl bg-white border border-ink-200 shadow-2xs">
              <span className="text-[10px] font-mono uppercase tracking-widest text-ink-400 font-semibold block">
                Pinned Bulletins
              </span>
              <span className="text-2xl font-extrabold text-ink-800 font-ledger-mono mt-1 block">
                {pinnedCount}
              </span>
            </div>

            <div className="p-4 rounded-xl bg-white border border-ink-200 shadow-2xs">
              <span className="text-[10px] font-mono uppercase tracking-widest text-ink-400 font-semibold block">
                Urgent Priority
              </span>
              <span className="text-2xl font-extrabold text-redpen font-ledger-mono mt-1 block">
                {urgentCount}
              </span>
            </div>
          </div>

          {/* Search and Filters Bar */}
          <div className="bg-white p-4 rounded-2xl border border-ink-200 shadow-2xs space-y-4">
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
              {/* Filter Tabs */}
              <div className="flex items-center gap-1.5 overflow-x-auto pb-1 lg:pb-0 scrollbar-none">
                {(
                  [
                    { key: "ALL", label: "All Notices" },
                    { key: "UNREAD", label: `Unread (${unreadCount})` },
                    { key: "PINNED", label: "Pinned" },
                    { key: "URGENT", label: "Urgent" },
                    { key: "ACADEMIC", label: "Academic" },
                    { key: "EVENT", label: "Events" },
                  ] as const
                ).map((tab) => (
                  <button
                    key={tab.key}
                    onClick={() => setActiveTab(tab.key)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-all ${
                      activeTab === tab.key
                        ? "bg-ink-800 text-white font-bold shadow-2xs"
                        : "text-ink-600 hover:text-ink-900 hover:bg-ink-50"
                    }`}
                  >
                    {tab.label}
                  </button>
                ))}
              </div>

              {/* Search & Audience Select */}
              <div className="flex items-center gap-3">
                <div className="relative flex-1 sm:w-64">
                  <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-ink-400 pointer-events-none" />
                  <input
                    type="text"
                    placeholder="Search announcements..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 bg-paper border border-ink-200 rounded-xl text-xs font-semibold text-ink-900 placeholder:text-ink-400 focus:outline-none focus:border-brass-500 focus:bg-white focus:ring-2 focus:ring-brass-500/20 shadow-2xs transition-all"
                  />
                </div>

                <select
                  value={audienceFilter}
                  onChange={(e) => setAudienceFilter(e.target.value)}
                  className="px-3 py-1.5 bg-paper border border-ink-200 rounded-xl text-xs font-semibold text-ink-800 focus:outline-none focus:border-brass-500"
                >
                  <option value="ALL">All Audiences</option>
                  <option value="PARENTS">Parents Only</option>
                  <option value="STUDENTS">Students Only</option>
                  <option value="TEACHERS">Teachers Only</option>
                </select>
              </div>
            </div>
          </div>

          {/* Announcements Feed Grid */}
          {filteredAnnouncements.length === 0 ? (
            <div className="p-12 text-center bg-white border border-ink-200 rounded-2xl space-y-3">
              <div className="w-12 h-12 rounded-full bg-ink-50 text-ink-400 flex items-center justify-center mx-auto">
                <Bell className="w-6 h-6" />
              </div>
              <h3 className="text-sm font-bold text-ink-800">No Announcements Found</h3>
              <p className="text-xs text-ink-500 max-w-sm mx-auto font-mono">
                No matching bulletins were found under the current filter selection or search query.
              </p>
            </div>
          ) : (
            <div className="space-y-3.5">
              {filteredAnnouncements.map((ann) => {
                const isAcknowledged = ann.acknowledgedBy.includes(currentRole);

                return (
                  <div
                    key={ann.id}
                    onClick={() => setSelectedAnnouncement(ann)}
                    className={`group bg-white rounded-2xl border transition-all duration-200 cursor-pointer overflow-hidden p-5 shadow-2xs hover:shadow-md hover:border-brass-500/60 ${
                      ann.isPinned
                        ? "border-l-4 border-l-brass-500 border-ink-200 bg-linear-to-r from-brass-100/20 via-white to-white"
                        : ann.isRead
                        ? "border-ink-200/90 opacity-90"
                        : "border-ink-300 ring-1 ring-brass-500/30"
                    }`}
                  >
                    <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3">
                      <div className="space-y-2 flex-1">
                        {/* Meta Tags */}
                        <div className="flex items-center gap-2 flex-wrap">
                          <span
                            className={`text-[10px] font-mono uppercase tracking-wider px-2.5 py-0.5 rounded-full border ${getCategoryTagStyle(
                              ann.category
                            )}`}
                          >
                            {ann.category}
                          </span>

                          <span className="text-[10px] font-mono text-ink-500 uppercase tracking-wider px-2 py-0.5 rounded-full bg-paper border border-ink-200">
                            TARGET: {ann.targetAudience}
                          </span>

                          {ann.isPinned && (
                            <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-brass-500 text-ink-900 font-bold flex items-center gap-1">
                              <Pin className="w-3 h-3 fill-ink-900" /> PINNED
                            </span>
                          )}

                          {!ann.isRead && (
                            <span className="px-2 py-0.5 rounded-full bg-redpen text-white text-[10px] font-mono font-bold">
                              UNREAD
                            </span>
                          )}
                        </div>

                        {/* Title */}
                        <h3 className="text-base font-bold text-ink-900 font-serif tracking-tight group-hover:text-brass-700 transition-colors">
                          {ann.title}
                        </h3>

                        {/* Text Preview */}
                        <p className="text-xs text-ink-600 line-clamp-2 leading-relaxed">
                          {ann.content}
                        </p>

                        {/* Footer details */}
                        <div className="flex items-center gap-4 text-[11px] font-mono text-ink-400 pt-1">
                          <span className="flex items-center gap-1">
                            <User className="w-3.5 h-3.5 text-brass-500" />
                            {ann.author}
                          </span>
                          <span>•</span>
                          <span className="flex items-center gap-1">
                            <Calendar className="w-3.5 h-3.5" />
                            {ann.dateFormatted}
                          </span>
                          {ann.attachments && ann.attachments.length > 0 && (
                            <>
                              <span>•</span>
                              <span className="flex items-center gap-1 text-ink-700 font-bold">
                                <Paperclip className="w-3.5 h-3.5 text-brass-600" />
                                {ann.attachments.length} attachment(s)
                              </span>
                            </>
                          )}
                        </div>
                      </div>

                      {/* Right Action side */}
                      <div className="flex sm:flex-col items-center sm:items-end justify-between sm:justify-center gap-2 shrink-0 pt-2 sm:pt-0 border-t sm:border-t-0 border-ink-100">
                        {ann.requireAcknowledgment && (
                          <div className="text-right">
                            {isAcknowledged ? (
                              <span className="inline-flex items-center gap-1 text-[11px] font-mono text-chalk font-bold">
                                <CheckCircle2 className="w-3.5 h-3.5" /> Acknowledged
                              </span>
                            ) : (
                              <span className="inline-flex items-center gap-1 text-[11px] font-mono text-brass-600 font-bold">
                                Acknowledgment Pending
                              </span>
                            )}
                          </div>
                        )}

                        <span className="text-xs font-extrabold text-brass-600 group-hover:translate-x-0.5 transition-transform flex items-center gap-1">
                          Read Notice
                          <ChevronRight className="w-4 h-4" />
                        </span>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </main>

        {/* Ledger Bottom Footer */}
        <footer className="px-8 py-3 border-t border-ink-200/80 bg-paper flex items-center justify-between text-[11px] font-mono text-ink-400">
          <span>ANNOUNCEMENTS ARCHIVE • ENTRY № 00891</span>
          <span>ASHFORD GRAMMAR — 2026 - 2027</span>
        </footer>
      </div>

      {/* Modals */}
      <CreateAnnouncementModal
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
        onSubmit={handleCreateSubmit}
        currentRole={currentRole}
      />

      <AnnouncementDetailModal
        announcement={selectedAnnouncement}
        isOpen={Boolean(selectedAnnouncement)}
        onClose={() => setSelectedAnnouncement(null)}
        onAcknowledge={handleAcknowledge}
        onTogglePin={handleTogglePin}
        onDelete={handleDelete}
        currentRole={currentRole}
      />
    </div>
  );
}

export default function AnnouncementsPage() {
  return (
    <Suspense
      fallback={
        <div className="p-8 font-mono text-ink-600 text-xs">
          Loading Ashford Grammar Announcements...
        </div>
      }
    >
      <AnnouncementsContent />
    </Suspense>
  );
}
