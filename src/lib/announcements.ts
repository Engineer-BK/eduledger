export type AnnouncementCategory = "URGENT" | "ACADEMIC" | "EVENT" | "GENERAL" | "STAFF";

export type TargetAudience = "ALL" | "TEACHERS" | "PARENTS" | "STUDENTS";

export interface AnnouncementAttachment {
  name: string;
  size: string;
  type: "PDF" | "DOC" | "IMAGE" | "LINK";
}

export interface Announcement {
  id: string;
  title: string;
  content: string;
  author: string;
  authorRole: "ADMIN" | "TEACHER" | "STAFF";
  category: AnnouncementCategory;
  targetAudience: TargetAudience;
  dateFormatted: string;
  timestamp: string; // ISO date string
  isPinned: boolean;
  requireAcknowledgment: boolean;
  acknowledgedBy: string[]; // List of roles or usernames that acknowledged
  isRead: boolean;
  attachments?: AnnouncementAttachment[];
  stats?: {
    acknowledgedCount: number;
    totalTargetCount: number;
  };
}

export const INITIAL_ANNOUNCEMENTS: Announcement[] = [
  {
    id: "ann-001",
    title: "Half-Term Tuition Fees Due Friday — Late Surcharge Applies Monday",
    content: "Please be reminded that half-term fee balances for Term 1 (2026-2027) must be settled by Friday 5:00 PM. Payments received after midnight on Sunday will incur a standard 5% late administration fee. You can settle balances directly via the Fees & Dues tab using card or bank transfer.",
    author: "Bursar's Office",
    authorRole: "ADMIN",
    category: "URGENT",
    targetAudience: "PARENTS",
    dateFormatted: "10 Sep 2026, 08:30 AM",
    timestamp: "2026-09-10T08:30:00.000Z",
    isPinned: true,
    requireAcknowledgment: true,
    acknowledgedBy: ["STUDENT"],
    isRead: false,
    stats: {
      acknowledgedCount: 142,
      totalTargetCount: 160,
    },
    attachments: [
      { name: "Fee_Schedule_Term1_2026.pdf", size: "1.2 MB", type: "PDF" },
      { name: "Payment_Portal_Instructions.pdf", size: "450 KB", type: "PDF" },
    ],
  },
  {
    id: "ann-002",
    title: "Inter-House Athletics Heats Relocated to Field B",
    content: "Due to ongoing turf maintenance on Main Oval, all Track & Field trial heats scheduled for Thursday afternoon will take place on Field B (East Campus). Students are requested to bring their full sports kit and water bottles.",
    author: "Dept. of Physical Education",
    authorRole: "TEACHER",
    category: "EVENT",
    targetAudience: "ALL",
    dateFormatted: "09 Sep 2026, 02:15 PM",
    timestamp: "2026-09-09T14:15:00.000Z",
    isPinned: true,
    requireAcknowledgment: false,
    acknowledgedBy: ["TEACHER", "STUDENT"],
    isRead: true,
    attachments: [{ name: "Field_B_Event_Schedule.pdf", size: "820 KB", type: "PDF" }],
  },
  {
    id: "ann-003",
    title: "Library Extends Evening Study Hours for Michaelmas Assessments",
    content: "The Senior Library will extend opening hours to 7:00 PM every Monday through Thursday until Michaelmas term exams conclude. Quiet study spaces, computer stations, and reference librarians will be available throughout.",
    author: "Head Librarian",
    authorRole: "STAFF",
    category: "GENERAL",
    targetAudience: "STUDENTS",
    dateFormatted: "08 Sep 2026, 11:00 AM",
    timestamp: "2026-09-08T11:00:00.000Z",
    isPinned: false,
    requireAcknowledgment: false,
    acknowledgedBy: [],
    isRead: false,
  },
  {
    id: "ann-004",
    title: "Mid-Term Academic Progress Reports Published to Parent Portal",
    content: "Subject teachers have finalized Week 2 gradebook entries and formative comments. Parents can now download the PDF progress summaries from the Student Records section. Parent-Teacher conference bookings open this Friday.",
    author: "Academic Registrar",
    authorRole: "ADMIN",
    category: "ACADEMIC",
    targetAudience: "PARENTS",
    dateFormatted: "07 Sep 2026, 09:45 AM",
    timestamp: "2026-09-07T09:45:00.000Z",
    isPinned: false,
    requireAcknowledgment: true,
    acknowledgedBy: [],
    isRead: false,
    stats: {
      acknowledgedCount: 98,
      totalTargetCount: 160,
    },
    attachments: [{ name: "Guide_To_Gradebook_Rubrics.pdf", size: "610 KB", type: "PDF" }],
  },
  {
    id: "ann-005",
    title: "Faculty Briefing Notes — Week 3 Curriculum & Moderation Meeting",
    content: "All department heads and teaching staff are requested to review the updated moderation guidelines prior to Thursday's faculty meeting at 3:45 PM in the Staff Room. Agenda points include syllabus coverage and digital assignment tracking.",
    author: "Headmistress Office",
    authorRole: "ADMIN",
    category: "STAFF",
    targetAudience: "TEACHERS",
    dateFormatted: "06 Sep 2026, 04:00 PM",
    timestamp: "2026-09-06T16:00:00.000Z",
    isPinned: false,
    requireAcknowledgment: true,
    acknowledgedBy: ["TEACHER"],
    isRead: true,
  },
];

const STORAGE_KEY = "eduledger_announcements_v2";

export function getStoredAnnouncements(): Announcement[] {
  if (typeof window === "undefined") return INITIAL_ANNOUNCEMENTS;
  try {
    const data = localStorage.getItem(STORAGE_KEY);
    if (!data) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(INITIAL_ANNOUNCEMENTS));
      return INITIAL_ANNOUNCEMENTS;
    }
    return JSON.parse(data);
  } catch (err) {
    console.error("Failed to read announcements from localStorage", err);
    return INITIAL_ANNOUNCEMENTS;
  }
}

export function saveStoredAnnouncements(announcements: Announcement[]) {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(announcements));
    // Dispatch custom event for real-time sync across components in client window
    window.dispatchEvent(new Event("eduledger_announcements_updated"));
  } catch (err) {
    console.error("Failed to save announcements to localStorage", err);
  }
}
