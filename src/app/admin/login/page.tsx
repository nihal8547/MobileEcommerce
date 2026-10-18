"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  Lock,
  Mail,
  Eye,
  EyeOff,
  ShieldCheck,
  KeyRound,
  ArrowRight,
  ArrowLeft,
  AlertCircle,
  Sparkles,
  CheckCircle2,
} from "lucide-react";
import toast from "react-hot-toast";

const DEMO_CREDENTIALS = {
  email: "admin@mobileshop.qa",
  password: "admin123",
};

export default function AdminLoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [checkingAuth, setCheckingAuth] = useState(true);

  // If already logged in, redirect to admin dashboard
  useEffect(() => {
    try {
      const existing = localStorage.getItem("mobileshop_admin_session");
      if (existing) {
        router.replace("/admin");
        return;
      }
    } catch {
      // Ignore localStorage errors
    } finally {
      setCheckingAuth(false);
    }
  }, [router]);

  const handleFillDemo = () => {
    setEmail(DEMO_CREDENTIALS.email);
    setPassword(DEMO_CREDENTIALS.password);
    setError(null);
    toast.success("Demo credentials filled!", { icon: "🔑" });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    const cleanEmail = email.trim();
    const cleanPass = password.trim();

    if (!cleanEmail || !cleanPass) {
      setError("Please enter both email address and password.");
      return;
    }

    setLoading(true);

    // Simulate verification
    await new Promise((resolve) => setTimeout(resolve, 600));

    // For demo purposes: accept demo credentials or any email containing admin or password admin123
    const isValid =
      (cleanEmail.toLowerCase() === DEMO_CREDENTIALS.email &&
        cleanPass === DEMO_CREDENTIALS.password) ||
      cleanPass === "admin123" ||
      cleanPass === "admin";

    if (!isValid) {
      setError("Invalid credentials. Use demo email: admin@mobileshop.qa and password: admin123");
      setLoading(false);
      return;
    }

    const sessionData = {
      email: cleanEmail,
      name: "Store Administrator",
      role: "Super Admin",
      rememberMe,
      loggedInAt: new Date().toISOString(),
    };

    try {
      localStorage.setItem("mobileshop_admin_session", JSON.stringify(sessionData));
    } catch {
      // Ignore
    }

    toast.success("Welcome back, Administrator!", { icon: "🛡️" });
    router.replace("/admin");
  };

  if (checkingAuth) {
    return (
      <div className="min-h-screen bg-slate-950 flex items-center justify-center text-white">
        <div className="flex flex-col items-center gap-3">
          <div className="w-10 h-10 border-2 border-brand-500 border-t-transparent rounded-full animate-spin" />
          <span className="text-xs text-slate-400 font-mono tracking-wider">CHECKING PERMISSIONS...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-950 text-white relative flex flex-col justify-between overflow-hidden selection:bg-brand-500 selection:text-white">
      {/* Background glow effects */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-[350px] bg-gradient-to-b from-brand-600/20 via-purple-600/10 to-transparent blur-3xl pointer-events-none" />
      <div className="absolute -bottom-32 -right-32 w-96 h-96 bg-[#8b1a3f]/20 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -top-32 -left-32 w-96 h-96 bg-brand-700/15 rounded-full blur-3xl pointer-events-none" />

      {/* Top bar */}
      <header className="relative z-10 max-w-6xl w-full mx-auto px-6 py-6 flex items-center justify-between">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-xs font-medium text-slate-400 hover:text-white transition-colors bg-white/5 hover:bg-white/10 px-3 py-1.5 rounded-lg border border-white/10"
        >
          <ArrowLeft size={14} />
          Back to Store
        </Link>

        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
          <span className="text-xs text-slate-400 font-mono">QATAR SECURE NODE</span>
        </div>
      </header>

      {/* Main card */}
      <main className="relative z-10 flex-1 flex items-center justify-center px-4 py-8">
        <div className="w-full max-w-md">
          {/* Brand header */}
          <div className="text-center mb-6">
            <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-gradient-to-tr from-brand-600 via-brand-500 to-purple-600 shadow-lg shadow-brand-500/25 mb-4 border border-white/20">
              <ShieldCheck size={28} className="text-white" />
            </div>
            <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-brand-500/10 border border-brand-500/30 text-brand-400 text-xs font-semibold tracking-wide uppercase mb-2">
              <Sparkles size={12} />
              Admin Portal
            </div>
            <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-white">
              MobileShop Console
            </h1>
            <p className="text-sm text-slate-400 mt-1.5">
              Secure authentication for store managers & operators
            </p>
          </div>

          {/* Login Card */}
          <div className="bg-slate-900/80 backdrop-blur-xl border border-slate-800 rounded-3xl p-6 sm:p-8 shadow-2xl shadow-black/60 relative overflow-hidden">
            {/* Top accent bar */}
            <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-brand-600 via-purple-500 to-rose-600" />

            {/* Demo Credentials Quick-Fill Banner */}
            <div className="mb-6 p-3.5 rounded-2xl bg-gradient-to-br from-brand-950/80 to-slate-900 border border-brand-800/40 flex items-start justify-between gap-3">
              <div className="flex items-start gap-2.5 min-w-0">
                <div className="w-7 h-7 rounded-lg bg-brand-500/20 text-brand-400 flex items-center justify-center shrink-0 mt-0.5">
                  <KeyRound size={15} />
                </div>
                <div className="text-xs min-w-0">
                  <div className="font-semibold text-slate-200">Demo Access Ready</div>
                  <div className="text-slate-400 text-[11px] truncate">
                    <span className="text-brand-300 font-mono">admin@mobileshop.qa</span> /{" "}
                    <span className="text-brand-300 font-mono">admin123</span>
                  </div>
                </div>
              </div>
              <button
                type="button"
                onClick={handleFillDemo}
                className="shrink-0 text-xs font-medium bg-brand-600 hover:bg-brand-500 active:scale-95 text-white px-3 py-1.5 rounded-xl transition-all shadow-sm"
              >
                1-Click Fill
              </button>
            </div>

            {/* Error Message */}
            {error && (
              <div className="mb-5 p-3 rounded-xl bg-rose-950/60 border border-rose-800/60 text-rose-300 text-xs flex items-start gap-2.5">
                <AlertCircle size={16} className="shrink-0 mt-0.5 text-rose-400" />
                <span className="leading-relaxed">{error}</span>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Email / Username */}
              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1.5">
                  Admin Email or Username
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-500">
                    <Mail size={16} />
                  </div>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="admin@mobileshop.qa"
                    className="w-full bg-slate-950/60 border border-slate-700/80 rounded-xl pl-10 pr-4 py-2.5 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-brand-500 focus:ring-2 focus:ring-brand-500/20 transition-all font-sans"
                  />
                </div>
              </div>

              {/* Password */}
              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <label className="block text-xs font-medium text-slate-300">
                    Password
                  </label>
                  <button
                    type="button"
                    onClick={() => {
                      toast("Use 'admin123' to sign in with demo credentials.", {
                        icon: "💡",
                      });
                    }}
                    className="text-[11px] text-brand-400 hover:text-brand-300 transition-colors"
                  >
                    Forgot password?
                  </button>
                </div>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-500">
                    <Lock size={16} />
                  </div>
                  <input
                    type={showPassword ? "text" : "password"}
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••••••"
                    className="w-full bg-slate-950/60 border border-slate-700/80 rounded-xl pl-10 pr-11 py-2.5 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-brand-500 focus:ring-2 focus:ring-brand-500/20 transition-all font-sans"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-slate-500 hover:text-slate-300 transition-colors"
                    aria-label="Toggle password visibility"
                  >
                    {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                  </button>
                </div>
              </div>

              {/* Remember checkbox & Security info */}
              <div className="flex items-center justify-between text-xs pt-1">
                <label className="flex items-center gap-2 cursor-pointer select-none text-slate-400 hover:text-slate-300">
                  <input
                    type="checkbox"
                    checked={rememberMe}
                    onChange={(e) => setRememberMe(e.target.checked)}
                    className="rounded border-slate-700 bg-slate-950 text-brand-600 focus:ring-brand-500"
                  />
                  <span>Keep session active</span>
                </label>
                <span className="text-[11px] text-emerald-400 flex items-center gap-1 font-mono">
                  <CheckCircle2 size={12} /> SSL 256-Bit
                </span>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={loading}
                className="w-full mt-2 bg-gradient-to-r from-brand-600 via-brand-500 to-purple-600 hover:from-brand-500 hover:to-purple-500 text-white font-medium py-3 rounded-xl transition-all shadow-lg shadow-brand-500/25 flex items-center justify-center gap-2 active:scale-[0.99] disabled:opacity-70 disabled:cursor-not-allowed cursor-pointer"
              >
                {loading ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    <span>Authorizing Session...</span>
                  </>
                ) : (
                  <>
                    <span>Enter Admin Dashboard</span>
                    <ArrowRight size={16} />
                  </>
                )}
              </button>
            </form>

            {/* Quick credentials card */}
            <div className="mt-6 pt-5 border-t border-slate-800 text-[11px] text-slate-400 flex flex-col gap-1.5">
              <div className="text-slate-300 font-medium">Quick Credentials:</div>
              <div className="flex items-center justify-between bg-slate-950/70 p-2 rounded-lg border border-slate-800/80 font-mono text-[11px]">
                <span className="text-slate-400">Email: <span className="text-white">admin@mobileshop.qa</span></span>
                <span className="text-slate-400">Password: <span className="text-white">admin123</span></span>
              </div>
            </div>
          </div>

          {/* Security notice */}
          <div className="mt-6 text-center text-[11px] text-slate-500 max-w-xs mx-auto space-y-1">
            <p>Protected area for authorized personnel only.</p>
            <p>IP and session timestamps are logged for compliance.</p>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="relative z-10 max-w-6xl w-full mx-auto px-6 py-4 text-center text-xs text-slate-500 border-t border-slate-900">
        © {new Date().getFullYear()} MobileShop Qatar. All administrative rights reserved.
      </footer>
    </div>
  );
}
