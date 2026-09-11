# 🏫 EduLedger — Modern School Operating System

> **Run your school on one unified ledger, not ten separate spreadsheets.**

**EduLedger** is a high-contrast, role-based school management platform designed for grammar, independent, and academy schools. It unifies daily attendance marking, fee payment tracking, gradebook entry, timetabling, and announcements into a single, cohesive academic ledger.

---

## 🌟 Key Features

*   **👥 Role-Based Portals:** Instant toggle between **Faculty/Teacher**, **Parent**, **Student**, and **Admin/Registrar** dashboards.
*   **📋 Attendance Register:** Mark daily class attendance in seconds with streak tracking and present/absent counters.
*   **💳 Fee Ledger & Bursar Payments:** Auto-calculated term balances, overdue account alerts, and interactive fee payment modals with receipt generation.
*   **📊 Smart Gradebook:** Mid-term and final grade recording with automated class averages and printable PDF report card workflows.
*   **🗓️ Timetable & Conflict Checker:** Weekly class schedule tracking with teacher/room conflict detection.
*   **📢 Targeted Noticeboard:** Role-filtered announcement board for staff updates, fee reminders, cover requests, and school events.
*   **🎨 Ledger & Chalkboard Design Architecture:** Engineered for maximum legibility on desktop, tablet, and mobile screens.

---

## 🛠️ Tech Stack

*   **Framework:** [Next.js 16](https://nextjs.org/) (App Router & Client Components)
*   **Language:** [TypeScript](https://www.typescriptlang.org/)
*   **Styling:** [Tailwind CSS](https://tailwindcss.com/)
*   **Icons:** [Lucide React](https://lucide.dev/)
*   **Database ORM:** [Prisma 7](https://www.prisma.io/)
*   **Database:** PostgreSQL (Neon Serverless ready)

---

## 📂 Project Structure

```text
eduledger/
├── prisma/
│   ├── schema.prisma        # Prisma database schema definition
│   └── seed.ts              # Seed script for initial users & demo data
├── src/
│   ├── app/                 # Next.js App Router
│   │   ├── api/users/       # REST API endpoints for user management
│   │   ├── dashboard/       # Main dashboard shell page
│   │   ├── login/           # Authentication & quick demo profile switch page
│   │   └── page.tsx         # Landing page & preview studio
│   ├── components/
│   │   ├── dashboard/       # Role-specific dashboard views (Teacher, Parent, Student, Admin)
│   │   ├── layout/          # Sidebar & TopNav navigation components
│   │   └── modals/          # Interactive modals (TakeRegisterModal, PayFeesModal)
│   └── lib/
│       └── prisma.ts        # Prisma Client singleton
├── .env                     # Environment variables (ignored by Git)
├── prisma.config.ts         # Prisma 7 configuration file
├── tsconfig.json            # TypeScript compiler configuration
└── package.json             # NPM dependencies and project scripts
```

---

## ⚙️ Getting Started

### 1. Clone & Install Dependencies
```bash
npm install
```

### 2. Configure Environment Variables
Create or verify your `.env` file in the project root:
```env
DATABASE_URL="postgresql://neondb_owner:YOUR_PASSWORD@your-neon-hostname.neon.tech/neondb?sslmode=require"
```

### 3. Database Setup (Prisma 7)
Push schema changes to your database or run migrations:
```bash
# Push schema directly
npm run db:push

# Or run migrations
npm run db:migrate
```

### 4. Run Development Server
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser to view the live application.

---

## 🔑 Demo Access Profiles

When signing in at `/login` or switching views in the header dropdown, you can test four role perspectives:

| Role | Default Name | Capabilities |
| :--- | :--- | :--- |
| **Teacher** | Ama Mensah | Attendance marking, lab report grading, lesson timeline |
| **Parent** | Efua Asante | Child attendance streak, fee payment modal, school notices |
| **Student** | Kwame Asante | Daily attendance status, gradebook overview, homework tasks |
| **Admin** | Janet Osei | Total school stats, exportable CSV/PDF registers, overdue fee review |

---

## 📜 Available NPM Scripts

| Command | Action |
| :--- | :--- |
| `npm run dev` | Starts Next.js development server |
| `npm run build` | Builds production bundle |
| `npm run start` | Starts production server |
| `npm run db:generate` | Generates Prisma Client |
| `npm run db:push` | Syncs schema with database directly |
| `npm run db:migrate` | Runs database migrations |
| `npm run db:seed` | Seeds database with starter data |

---

## 📄 License

This project is licensed under the MIT License.