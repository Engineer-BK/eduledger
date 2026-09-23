export interface LessonSchedule {
  time: string;
  subject: string;
  room: string;
  status: "Register taken" | "Up next" | "Lab reports" | "Voluntary" | "Scheduled";
  dot: string;
}

export interface ClassAssignment {
  id: string;
  title: string;
  className: string;
  subject: string;
  dueDate: string;
  totalSubmissions: number;
  gradedCount: number;
}

export interface ClassItem {
  id: string;
  name: string; // e.g. "Form 3A", "Year 11 Physics"
  subject: string;
  gradeLevel: string; // e.g. "Form 3", "Year 11"
  teacherName: string;
  room: string;
  studentCount: number;
  presentCount: number;
  attendanceRate: number; // Percentage
  avgGrade: string; // e.g. "A-", "B+"
  scheduleTime: string; // e.g. "Mon, Wed, Fri • 11:00"
  description: string;
}

export const INITIAL_LESSONS: LessonSchedule[] = [
  {
    time: "09:15",
    subject: "Year 9 • Mathematics",
    room: "Room 12",
    status: "Register taken",
    dot: "bg-chalk",
  },
  {
    time: "11:00",
    subject: "Year 11 • Physics",
    room: "Lab 2",
    status: "Up next",
    dot: "bg-brass-500 ring-4 ring-brass-100",
  },
  {
    time: "13:00",
    subject: "Year 10 • Double Physics",
    room: "Lab 2",
    status: "Lab reports",
    dot: "bg-brass-500",
  },
  {
    time: "14:45",
    subject: "Science club",
    room: "Lab 1",
    status: "Voluntary",
    dot: "bg-ink-300",
  },
];

export const INITIAL_CLASSES: ClassItem[] = [
  {
    id: "cls-001",
    name: "Year 11 Physics",
    subject: "Physics",
    gradeLevel: "Year 11",
    teacherName: "Ama Mensah",
    room: "Lab 2",
    studentCount: 32,
    presentCount: 30,
    attendanceRate: 93.8,
    avgGrade: "A-",
    scheduleTime: "Mon, Wed, Fri • 11:00 AM",
    description: "Michaelmas Term Senior Secondary Physics - Electricity & Magnetism Modules.",
  },
  {
    id: "cls-002",
    name: "Year 9 Mathematics",
    subject: "Mathematics",
    gradeLevel: "Year 9",
    teacherName: "Ama Mensah",
    room: "Room 12",
    studentCount: 30,
    presentCount: 29,
    attendanceRate: 96.6,
    avgGrade: "B+",
    scheduleTime: "Daily • 09:15 AM",
    description: "Algebraic Expressions, Quadratic Equations & Geometric Proofs.",
  },
  {
    id: "cls-003",
    name: "Year 10 Double Physics",
    subject: "Physics",
    gradeLevel: "Year 10",
    teacherName: "Ama Mensah",
    room: "Lab 2",
    studentCount: 28,
    presentCount: 27,
    attendanceRate: 96.4,
    avgGrade: "A",
    scheduleTime: "Tue, Thu • 13:00 PM",
    description: "Advanced Dynamics, Thermodynamics & Experimental Lab Practicals.",
  },
  {
    id: "cls-004",
    name: "Form 3A Science",
    subject: "Integrated Science",
    gradeLevel: "Form 3",
    teacherName: "Kofi Owusu",
    room: "Lab 1",
    studentCount: 36,
    presentCount: 32,
    attendanceRate: 88.9,
    avgGrade: "B",
    scheduleTime: "Mon, Wed • 10:00 AM",
    description: "Core Curriculum Science - Environmental Systems & Cell Biology.",
  },
  {
    id: "cls-005",
    name: "Form 2B Chemistry",
    subject: "Chemistry",
    gradeLevel: "Form 2",
    teacherName: "Esi Boateng",
    room: "Chemistry Lab",
    studentCount: 31,
    presentCount: 30,
    attendanceRate: 96.7,
    avgGrade: "A-",
    scheduleTime: "Tue, Fri • 14:00 PM",
    description: "Chemical Bonding, Stoichiometry & Organic Reactions.",
  },
  {
    id: "cls-006",
    name: "Form 1A Algebra",
    subject: "Mathematics",
    gradeLevel: "Form 1",
    teacherName: "David Asante",
    room: "Room 4",
    studentCount: 35,
    presentCount: 34,
    attendanceRate: 97.1,
    avgGrade: "B-",
    scheduleTime: "Mon, Thu • 08:30 AM",
    description: "Introductory Algebra, Linear Graphs & Number Theory.",
  },
];

const STORAGE_KEY = "eduledger_classes_v1";

export function getStoredClasses(): ClassItem[] {
  if (typeof window === "undefined") return INITIAL_CLASSES;
  try {
    const data = localStorage.getItem(STORAGE_KEY);
    if (!data) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(INITIAL_CLASSES));
      return INITIAL_CLASSES;
    }
    return JSON.parse(data);
  } catch (err) {
    console.error("Failed to read classes from localStorage", err);
    return INITIAL_CLASSES;
  }
}

export function saveStoredClasses(classes: ClassItem[]) {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(classes));
    window.dispatchEvent(new Event("eduledger_classes_updated"));
  } catch (err) {
    console.error("Failed to save classes to localStorage", err);
  }
}
