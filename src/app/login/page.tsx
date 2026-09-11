"use client";

import { useState, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import {
  Mail,
  Eye,
  EyeOff,
  ArrowRight,
  ShieldCheck,
  Check,
  User,
  School,
  KeyRound,
} from "lucide-react";

function LoginContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const initialMode = searchParams.get("mode") === "register" ? "register" : "login";

  const [mode, setMode] = useState<"login" | "register">(initialMode);
  const [showPassword, setShowPassword] = useState(false);
  const [remember, setRemember] = useState(true);

  // Form states
  const [role, setRole] = useState<"ADMIN" | "TEACHER" | "PARENT" | "STUDENT">("ADMIN");
  const [email, setEmail] = useState("j.osei@ashfordgrammar.edu");
  const [password, setPassword] = useState("••••••••••••");
  const [fullName, setFullName] = useState("");
  const [schoolCode, setSchoolCode] = useState("ASHFORD-2026");
  const [isLoading, setIsLoading] = useState(false);

  // Quick Preset Selector
  const handleSelectPreset = (
    presetRole: "ADMIN" | "TEACHER" | "PARENT" | "STUDENT",
    presetEmail: string,
    presetName: string
  ) => {
    setRole(presetRole);
    setEmail(presetEmail);
    setFullName(presetName);
    setPassword("password123");
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    if (typeof window !== "undefined") {
      localStorage.setItem("eduledger_user_role", role);
      localStorage.setItem("eduledger_user_email", email);
      localStorage.setItem("eduledger_user_name", fullName || (email.split("@")[0].toUpperCase()));
    }

    setTimeout(() => {
      setIsLoading(false);
      router.push(`/dashboard?role=${role.toLowerCase()}`);
    }, 600);
  };

  return (
    <div
      className="min-h-screen bg-paper text-ink-800 font-sans flex flex-col justify-between selection:bg-brass-100 selection:text-brass-700 relative"
      style={{
        backgroundImage:
          "linear-gradient(to bottom, transparent 95%, rgba(31, 42, 68, 0.035) 95%)",
        backgroundSize: "100% 28px",
      }}
    >
      {/* 🧭 Top Bar */}
      <header className="border-b border-ink-200/60 bg-paper/80 backdrop-blur-xs px-4 sm:px-8 py-2.5 flex items-center justify-between text-[11px] font-mono text-ink-500 uppercase tracking-wider">
        <div className="flex items-center gap-2">
          <Link href="/" className="font-bold text-ink-800 hover:text-brass-600 transition-colors flex items-center gap-1.5">
            <School className="w-3.5 h-3.5 text-brass-500" />
            ASHFORD GRAMMAR
          </Link>
          <span className="text-ink-300">•</span>
          <span>ADMINISTRATIVE PORTAL</span>
        </div>
        <div className="hidden sm:flex items-center gap-3">
          <span>🗓 10 SEPT 2026</span>
          <span className="text-ink-300">•</span>
          <span className="text-brass-700 font-bold">TERM 1 - WEEK 2</span>
        </div>
      </header>

      {/* 🏛️ Center Container */}
      <main className="flex-1 flex flex-col items-center justify-center p-4 sm:p-6 my-6">
        {/* School Crest Logo */}
        <div className="text-center space-y-2 mb-6">
          <div className="relative inline-block">
            <div className="w-16 h-16 rounded-2xl bg-ink-800 border-2 border-brass-500/80 flex flex-col items-center justify-center text-paper shadow-lg mx-auto">
              <span className="font-serif font-black text-2xl text-brass-300 leading-none">A</span>
              <span className="text-[9px] font-mono text-brass-400 font-semibold tracking-tighter">1894</span>
            </div>
          </div>
          <div>
            <h1 className="text-2xl font-extrabold text-ink-900 tracking-tight">Ashford Grammar</h1>
            <p className="text-[11px] font-mono text-ink-400 uppercase tracking-widest mt-0.5">
              EST. 1894 — VERITAS — DISCIPLINA
            </p>
          </div>
        </div>

        {/* 📋 Auth Form Card */}
        <div className="w-full max-w-md bg-white rounded-2xl border border-ink-200 shadow-xl overflow-hidden">
          {/* Form Header Tabs */}
          <div className="bg-ink-50/70 border-b border-ink-200 p-2 flex items-center gap-1">
            <button
              onClick={() => setMode("login")}
              className={`flex-1 py-2 rounded-lg text-xs font-bold transition-all ${
                mode === "login"
                  ? "bg-white text-ink-900 shadow-xs border border-ink-200"
                  : "text-ink-500 hover:text-ink-800 hover:bg-white/50"
              }`}
            >
              Sign In to Ledger
            </button>
            <button
              onClick={() => setMode("register")}
              className={`flex-1 py-2 rounded-lg text-xs font-bold transition-all ${
                mode === "register"
                  ? "bg-white text-ink-900 shadow-xs border border-ink-200"
                  : "text-ink-500 hover:text-ink-800 hover:bg-white/50"
              }`}
            >
              Create Account
            </button>
          </div>

          <div className="p-6 sm:p-7 space-y-5">
            {/* Title Bar */}
            <div className="flex items-start justify-between border-b border-ink-100 pb-4">
              <div>
                <h2 className="text-lg font-bold text-ink-800">
                  {mode === "login" ? "Staff & Portal sign in" : "New ledger account"}
                </h2>
                <p className="text-xs text-ink-400 mt-0.5">
                  {mode === "login"
                    ? "Grades, attendance & fees ledger access"
                    : "Register student, staff or parent profile"}
                </p>
              </div>
              <div className="text-right font-mono">
                <span className="text-[10px] font-bold text-brass-700 block">
                  {mode === "login" ? "FORM L-01" : "FORM R-02"}
                </span>
                <span className="text-[9px] text-ink-300 block">Rev. 2026</span>
              </div>
            </div>

            {/* Quick Demo Presets Pills */}
            <div className="space-y-1.5">
              <span className="text-[10px] font-mono uppercase tracking-wider text-ink-400 block font-semibold">
                Quick Demo Accounts (Select to test):
              </span>
              <div className="grid grid-cols-2 gap-1.5">
                <button
                  type="button"
                  onClick={() =>
                    handleSelectPreset("ADMIN", "j.osei@ashfordgrammar.edu", "J. Osei (Registrar)")
                  }
                  className={`px-2.5 py-1.5 rounded-lg text-xs font-medium border text-left flex items-center justify-between transition-all ${
                    role === "ADMIN"
                      ? "border-brass-500 bg-brass-100/50 text-brass-800 font-bold"
                      : "border-ink-200 bg-paper text-ink-700 hover:bg-ink-50"
                  }`}
                >
                  <span className="truncate">🔑 Registrar (Admin)</span>
                  {role === "ADMIN" && <Check className="w-3.5 h-3.5 text-brass-700 shrink-0" />}
                </button>
                <button
                  type="button"
                  onClick={() =>
                    handleSelectPreset("TEACHER", "ama.mensah@ashfordgrammar.edu", "Ama Mensah")
                  }
                  className={`px-2.5 py-1.5 rounded-lg text-xs font-medium border text-left flex items-center justify-between transition-all ${
                    role === "TEACHER"
                      ? "border-brass-500 bg-brass-100/50 text-brass-800 font-bold"
                      : "border-ink-200 bg-paper text-ink-700 hover:bg-ink-50"
                  }`}
                >
                  <span className="truncate">👩‍🏫 Teacher (Ama)</span>
                  {role === "TEACHER" && <Check className="w-3.5 h-3.5 text-brass-700 shrink-0" />}
                </button>
                <button
                  type="button"
                  onClick={() =>
                    handleSelectPreset("PARENT", "efua.asante@example.com", "Efua Asante")
                  }
                  className={`px-2.5 py-1.5 rounded-lg text-xs font-medium border text-left flex items-center justify-between transition-all ${
                    role === "PARENT"
                      ? "border-brass-500 bg-brass-100/50 text-brass-800 font-bold"
                      : "border-ink-200 bg-paper text-ink-700 hover:bg-ink-50"
                  }`}
                >
                  <span className="truncate">👨‍👩‍👧 Parent (Efua)</span>
                  {role === "PARENT" && <Check className="w-3.5 h-3.5 text-brass-700 shrink-0" />}
                </button>
                <button
                  type="button"
                  onClick={() =>
                    handleSelectPreset("STUDENT", "kwame.asante@student.ashfordgrammar.edu", "Kwame Asante")
                  }
                  className={`px-2.5 py-1.5 rounded-lg text-xs font-medium border text-left flex items-center justify-between transition-all ${
                    role === "STUDENT"
                      ? "border-brass-500 bg-brass-100/50 text-brass-800 font-bold"
                      : "border-ink-200 bg-paper text-ink-700 hover:bg-ink-50"
                  }`}
                >
                  <span className="truncate">🎓 Student (Kwame)</span>
                  {role === "STUDENT" && <Check className="w-3.5 h-3.5 text-brass-700 shrink-0" />}
                </button>
              </div>
            </div>

            {/* Auth Form */}
            <form onSubmit={handleSubmit} className="space-y-4 pt-1">
              {mode === "register" && (
                <div>
                  <label className="block text-xs font-semibold text-ink-700 mb-1">Full Name</label>
                  <div className="relative">
                    <User className="w-4 h-4 text-ink-400 absolute left-3 top-2.5" />
                    <input
                      type="text"
                      required
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      placeholder="e.g. Ama Mensah"
                      className="w-full pl-9 pr-3 py-2 text-xs border border-ink-200 rounded-lg bg-paper focus:outline-none focus:ring-2 focus:ring-brass-500/50 focus:border-brass-500"
                    />
                  </div>
                </div>
              )}

              <div>
                <label className="block text-xs font-semibold text-ink-700 mb-1">Email address</label>
                <div className="relative">
                  <Mail className="w-4 h-4 text-ink-400 absolute left-3 top-2.5" />
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="j.osei@ashfordgrammar.edu"
                    className="w-full pl-9 pr-3 py-2 text-xs font-mono border border-ink-200 rounded-lg bg-paper focus:outline-none focus:ring-2 focus:ring-brass-500/50 focus:border-brass-500"
                  />
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between mb-1">
                  <label className="text-xs font-semibold text-ink-700">Password</label>
                  {mode === "login" && (
                    <span className="text-[10px] font-mono text-ink-400 flex items-center gap-1">
                      <ShieldCheck className="w-3 h-3 text-chalk" /> Secured
                    </span>
                  )}
                </div>
                <div className="relative">
                  <KeyRound className="w-4 h-4 text-ink-400 absolute left-3 top-2.5" />
                  <input
                    type={showPassword ? "text" : "password"}
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full pl-9 pr-9 py-2 text-xs font-mono border border-ink-200 rounded-lg bg-paper focus:outline-none focus:ring-2 focus:ring-brass-500/50 focus:border-brass-500"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-2.5 text-ink-400 hover:text-ink-700"
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              {mode === "register" && (
                <div>
                  <label className="block text-xs font-semibold text-ink-700 mb-1">School Access Code</label>
                  <input
                    type="text"
                    value={schoolCode}
                    onChange={(e) => setSchoolCode(e.target.value)}
                    className="w-full px-3 py-2 text-xs font-mono border border-ink-200 rounded-lg bg-paper"
                  />
                </div>
              )}

              {mode === "login" && (
                <div className="flex items-center justify-between text-xs pt-1">
                  <label className="flex items-center gap-2 cursor-pointer text-ink-600 font-medium">
                    <input
                      type="checkbox"
                      checked={remember}
                      onChange={(e) => setRemember(e.target.checked)}
                      className="rounded border-ink-300 text-brass-600 focus:ring-brass-500"
                    />
                    Remember this terminal
                  </label>
                  <button
                    type="button"
                    onClick={() => alert("Password reset link has been dispatched to your email.")}
                    className="text-ink-500 hover:text-brass-700 font-medium underline underline-offset-2 text-[11px]"
                  >
                    Forgot password?
                  </button>
                </div>
              )}

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isLoading}
                className="w-full py-3 px-4 bg-brass-500 hover:bg-brass-600 text-white font-bold text-xs rounded-xl shadow-md hover:shadow transition-all flex items-center justify-center gap-2 mt-2 disabled:opacity-75"
              >
                {isLoading ? (
                  <span>Authenticating...</span>
                ) : (
                  <>
                    <span>{mode === "login" ? "Log in to ledger" : "Register and Access Ledger"}</span>
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>
            </form>

            {/* Entry Status Footer inside card */}
            <div className="pt-3 border-t border-ink-100 flex items-center justify-between text-[10px] font-mono text-ink-400">
              <span>ENTRY № 00482</span>
              <span className="flex items-center gap-1 text-chalk font-semibold">
                <span className="w-1.5 h-1.5 rounded-full bg-chalk animate-pulse"></span>
                Registrar online
              </span>
            </div>
          </div>
        </div>

        {/* Security Disclaimers */}
        <div className="text-center mt-6 space-y-1.5 text-xs text-ink-500 max-w-sm">
          <p className="flex items-center justify-center gap-1.5 text-[11px] font-medium text-ink-600">
            <ShieldCheck className="w-3.5 h-3.5 text-brass-600" />
            Protected by school registrar • Contact IT office ext. 204 for access
          </p>
          <p className="text-[10px] text-ink-400 font-mono">
            Ashford Grammar School • Academic year 2026 – 2027
          </p>
          <div className="text-[10px] font-mono text-ink-400 flex items-center justify-center gap-2">
            <span>REF: ADM/26/091</span>
            <span>•</span>
            <a href="#" className="hover:underline">Privacy</a>
            <span>•</span>
            <a href="#" className="hover:underline">Help desk</a>
          </div>
        </div>
      </main>

      {/* 🔒 Bottom Fixed Ledger Bar */}
      <footer className="border-t border-ink-200/80 bg-paper/90 px-4 sm:px-8 py-2 flex items-center justify-between text-[10px] font-mono text-ink-400 uppercase tracking-wider">
        <div>LEDGER v4.2 • All entries timestamped</div>
        <div className="flex items-center gap-1 text-ink-600">
          <ShieldCheck className="w-3 h-3 text-brass-600" />
          <span>256-BIT REGISTER ENCRYPTION</span>
        </div>
      </footer>
    </div>
  );
}

export default function LoginPage() {
  return (
    <Suspense fallback={<div className="p-8 font-mono text-ink-600 text-xs">Loading Auth Ledger...</div>}>
      <LoginContent />
    </Suspense>
  );
}
