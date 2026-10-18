"use client";

import Link from "next/link";
import { useState } from "react";
import {
  Eye,
  EyeOff,
  Phone,
  Mail,
  Lock,
  ArrowRight,
  ArrowLeft,
  ShieldCheck,
  Sparkles,
  Truck,
  Star,
  CheckCircle2,
} from "lucide-react";
import toast from "react-hot-toast";

export default function LoginPage() {
  const [loginMethod, setLoginMethod] = useState<"phone" | "email">("phone");
  const [showPass, setShowPass] = useState(false);
  const [form, setForm] = useState({
    phone: "",
    email: "",
    password: "",
    rememberMe: true,
  });
  const [loading, setLoading] = useState(false);
  const [googleLoading, setGoogleLoading] = useState(false);

  // Form submission (Email or Phone)
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      await new Promise((r) => setTimeout(r, 800));

      const identifier =
        loginMethod === "phone"
          ? `+974 ${form.phone.trim()}`
          : form.email.trim();

      const userSession = {
        fullName:
          loginMethod === "phone" ? "Qatar Customer" : form.email.split("@")[0],
        email:
          loginMethod === "email" ? form.email : `${form.phone}@mobileshop.qa`,
        phone: loginMethod === "phone" ? `+974 ${form.phone}` : "+974 5500 1234",
        area: "Doha",
        loggedInAt: new Date().toISOString(),
      };

      if (typeof window !== "undefined") {
        localStorage.setItem("mobileshop_user", JSON.stringify(userSession));
      }

      toast.success(`Welcome back, ${userSession.fullName}!`, { icon: "👋" });
      window.location.href = "/account";
    } catch {
      toast.error("Failed to sign in. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  // Google Login Handler
  const handleGoogleLogin = async () => {
    setGoogleLoading(true);
    try {
      await new Promise((r) => setTimeout(r, 900));

      const googleUser = {
        fullName: "Mohammed Al-Kuwari",
        email: "m.alkuwari@gmail.com",
        phone: "+974 6612 8900",
        area: "West Bay, Doha",
        avatar:
          "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=200&q=80",
        isGoogleAuth: true,
        loggedInAt: new Date().toISOString(),
      };

      if (typeof window !== "undefined") {
        localStorage.setItem("mobileshop_user", JSON.stringify(googleUser));
      }

      toast.success("Signed in with Google successfully!", { icon: "🚀" });
      window.location.href = "/account";
    } catch {
      toast.error("Google sign in failed. Please try again.");
    } finally {
      setGoogleLoading(false);
    }
  };

  // Quick Demo fill
  const fillDemoAccount = () => {
    setLoginMethod("phone");
    setForm({
      phone: "55123456",
      email: "demo@mobileshop.qa",
      password: "password123",
      rememberMe: true,
    });
    toast("Demo credentials filled! Click 'Sign In'.", { icon: "⚡" });
  };

  return (
    <div className="min-h-screen grid lg:grid-cols-12 bg-white">
      {/* Left Column: Visual Brand Showcase (Desktop only) */}
      <div className="hidden lg:flex lg:col-span-6 xl:col-span-7 relative flex-col justify-between p-10 xl:p-14 text-white overflow-hidden bg-slate-950">
        {/* Full-bleed background image with modern luxury contrast */}
        <div className="absolute inset-0 z-0">
          <img
            src="https://images.unsplash.com/photo-1592750475338-74b7b21085ab?auto=format&fit=crop&w=1600&q=85"
            alt="Flagship Smartphones Qatar"
            className="w-full h-full object-cover scale-105 filter brightness-75 contrast-125 transition-transform duration-1000"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-black/80" />
          <div className="absolute inset-0 qatar-pattern opacity-20 pointer-events-none" />
        </div>

        {/* Ambient colored lighting */}
        <div className="absolute top-1/4 -left-20 w-80 h-80 bg-brand-500/25 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-1/4 -right-20 w-80 h-80 bg-blue-500/20 rounded-full blur-3xl pointer-events-none" />

        {/* Top Header: Brand Logo & Back Link */}
        <div className="relative z-10 flex items-center justify-between">
          <Link href="/" className="inline-flex items-center gap-3 group">
            <div className="w-11 h-11 rounded-2xl bg-brand-gradient flex items-center justify-center shadow-lg shadow-brand-500/30 group-hover:scale-105 transition-transform">
              <span className="text-white font-extrabold text-2xl leading-none">
                M
              </span>
            </div>
            <div>
              <div className="font-extrabold text-white text-xl tracking-tight leading-tight">
                MobileShop
              </div>
              <div className="text-[10px] text-brand-400 font-bold uppercase tracking-widest leading-none flex items-center gap-1">
                <span>Qatar</span>
                <span className="text-xs">🇶🇦</span>
              </div>
            </div>
          </Link>

          <Link
            href="/"
            className="inline-flex items-center gap-2 text-xs font-bold text-white/80 hover:text-white bg-white/10 hover:bg-white/20 px-4 py-2 rounded-xl backdrop-blur-md transition-all border border-white/10"
          >
            <ArrowLeft size={14} />
            <span>Back to Store</span>
          </Link>
        </div>

        {/* Center Spotlight Card */}
        <div className="relative z-10 my-auto py-8 max-w-xl">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 border border-white/20 text-xs font-bold text-amber-300 mb-6 backdrop-blur-md shadow-xs">
            <Sparkles size={14} />
            <span>Qatar&apos;s #1 Online Smartphone Destination</span>
          </div>

          <h2 className="text-3xl xl:text-5xl font-black text-white tracking-tight leading-[1.12] mb-5">
            Your Gateway to Official Flagships &amp; Accessories.
          </h2>

          <p className="text-white/80 text-sm xl:text-base leading-relaxed mb-8">
            Enjoy factory-sealed genuine devices from Apple, Samsung, Google &amp; Sony with official Qatar agency warranty and same-day express delivery in Doha.
          </p>

          {/* Feature Badges Grid */}
          <div className="grid grid-cols-2 gap-3.5 pt-2">
            <div className="flex items-center gap-3 bg-white/10 backdrop-blur-md border border-white/10 p-3.5 rounded-2xl">
              <div className="w-9 h-9 rounded-xl bg-emerald-500/20 flex items-center justify-center text-emerald-400 flex-shrink-0">
                <ShieldCheck size={20} />
              </div>
              <div>
                <p className="text-xs font-bold text-white leading-tight">Official Warranty</p>
                <p className="text-[11px] text-white/70 leading-tight">Apple &amp; Samsung Gulf</p>
              </div>
            </div>

            <div className="flex items-center gap-3 bg-white/10 backdrop-blur-md border border-white/10 p-3.5 rounded-2xl">
              <div className="w-9 h-9 rounded-xl bg-brand-500/20 flex items-center justify-center text-brand-400 flex-shrink-0">
                <Truck size={20} />
              </div>
              <div>
                <p className="text-xs font-bold text-white leading-tight">Same-Day Doha</p>
                <p className="text-[11px] text-white/70 leading-tight">Free over QAR 200</p>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Social Proof */}
        <div className="relative z-10 pt-6 border-t border-white/15 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="flex gap-0.5 text-amber-400">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star key={i} size={14} fill="currentColor" />
              ))}
            </div>
            <span className="text-xs font-bold text-white">4.9 / 5 Rating</span>
            <span className="text-xs text-white/60">• 1,200+ Verified Buyers</span>
          </div>

          <span className="text-xs text-white/60 hidden xl:inline">
            Doha · Lusail · Al Wakrah
          </span>
        </div>
      </div>

      {/* Right Column: Clean Focused Login Form */}
      <div className="lg:col-span-6 xl:col-span-5 flex flex-col justify-between p-6 sm:p-10 lg:p-12 xl:p-16 min-h-screen">
        {/* Mobile Top Header */}
        <div className="flex lg:hidden items-center justify-between pb-6 border-b border-gray-100 mb-6">
          <Link href="/" className="inline-flex items-center gap-2 group">
            <div className="w-9 h-9 rounded-xl bg-brand-gradient flex items-center justify-center shadow-xs">
              <span className="text-white font-extrabold text-lg leading-none">M</span>
            </div>
            <div>
              <div className="font-extrabold text-gray-900 text-base leading-tight">
                MobileShop
              </div>
              <div className="text-[10px] text-brand-600 font-bold uppercase tracking-wider leading-none">
                Qatar 🇶🇦
              </div>
            </div>
          </Link>

          <Link
            href="/"
            className="text-xs font-bold text-gray-500 hover:text-gray-900 inline-flex items-center gap-1"
          >
            <ArrowLeft size={14} />
            <span>Store</span>
          </Link>
        </div>

        {/* Centered Form Area */}
        <div className="w-full max-w-md mx-auto my-auto py-4">
          <div className="mb-7">
            <h1 className="text-2xl sm:text-3xl font-extrabold text-gray-900 tracking-tight">
              Sign In to Your Account
            </h1>
            <p className="text-gray-500 text-xs sm:text-sm mt-1.5">
              Welcome back! Please enter your details to access your account.
            </p>
          </div>

          {/* Google Sign-in Button */}
          <button
            type="button"
            onClick={handleGoogleLogin}
            disabled={googleLoading || loading}
            className="w-full flex items-center justify-center gap-3 py-3 px-4 border border-gray-200 hover:border-gray-300 rounded-2xl text-sm font-bold text-gray-700 bg-white hover:bg-gray-50 transition-all shadow-2xs cursor-pointer disabled:opacity-60 active:scale-[0.99]"
          >
            {googleLoading ? (
              <span className="w-5 h-5 border-2 border-gray-300 border-t-brand-500 rounded-full animate-spin" />
            ) : (
              <>
                <svg width="19" height="19" viewBox="0 0 24 24" className="flex-shrink-0">
                  <path
                    d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                    fill="#4285F4"
                  />
                  <path
                    d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                    fill="#34A853"
                  />
                  <path
                    d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                    fill="#FBBC05"
                  />
                  <path
                    d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                    fill="#EA4335"
                  />
                </svg>
                <span>Continue with Google</span>
              </>
            )}
          </button>

          {/* Divider */}
          <div className="relative my-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-100" />
            </div>
            <div className="relative flex justify-center">
              <span className="bg-white px-3 text-xs font-semibold text-gray-400 uppercase tracking-wider">
                or sign in with
              </span>
            </div>
          </div>

          {/* Toggle Login Method (Phone vs Email) */}
          <div className="flex p-1 bg-gray-100 rounded-xl mb-5">
            <button
              type="button"
              onClick={() => setLoginMethod("phone")}
              className={`flex-1 flex items-center justify-center gap-1.5 py-2 text-xs font-bold rounded-lg transition-all ${
                loginMethod === "phone"
                  ? "bg-white text-gray-900 shadow-xs"
                  : "text-gray-500 hover:text-gray-800"
              }`}
            >
              <Phone size={14} />
              <span>Mobile Number</span>
            </button>
            <button
              type="button"
              onClick={() => setLoginMethod("email")}
              className={`flex-1 flex items-center justify-center gap-1.5 py-2 text-xs font-bold rounded-lg transition-all ${
                loginMethod === "email"
                  ? "bg-white text-gray-900 shadow-xs"
                  : "text-gray-500 hover:text-gray-800"
              }`}
            >
              <Mail size={14} />
              <span>Email Address</span>
            </button>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            {loginMethod === "phone" ? (
              <div>
                <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1.5">
                  Qatar Mobile Number
                </label>
                <div className="flex gap-2">
                  <div className="flex items-center gap-1.5 px-3.5 border border-gray-200 rounded-2xl bg-gray-50 text-xs font-bold text-gray-700 whitespace-nowrap select-none">
                    <span>🇶🇦</span>
                    <span>+974</span>
                  </div>
                  <div className="relative flex-1">
                    <Phone
                      size={16}
                      className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400"
                    />
                    <input
                      type="tel"
                      placeholder="5500 0000 / 6600 0000"
                      value={form.phone}
                      onChange={(e) =>
                        setForm({
                          ...form,
                          phone: e.target.value.replace(/[^0-9]/g, "").slice(0, 8),
                        })
                      }
                      required
                      className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-2xl text-sm font-medium focus:outline-none focus:border-brand-500 focus:ring-2 focus:ring-brand-100 transition-all placeholder:text-gray-400"
                    />
                  </div>
                </div>
                <p className="text-[11px] text-gray-400 mt-1">
                  Enter your 8-digit Qatar mobile number
                </p>
              </div>
            ) : (
              <div>
                <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1.5">
                  Email Address
                </label>
                <div className="relative">
                  <Mail
                    size={16}
                    className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400"
                  />
                  <input
                    type="email"
                    placeholder="name@example.com"
                    value={form.email}
                    onChange={(e) =>
                      setForm({ ...form, email: e.target.value })
                    }
                    required
                    className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-2xl text-sm font-medium focus:outline-none focus:border-brand-500 focus:ring-2 focus:ring-brand-100 transition-all placeholder:text-gray-400"
                  />
                </div>
              </div>
            )}

            <div>
              <div className="flex justify-between items-center mb-1.5">
                <label className="text-xs font-bold text-gray-700 uppercase tracking-wider">
                  Password
                </label>
                <Link
                  href="/forgot-password"
                  className="text-xs font-semibold text-brand-600 hover:underline"
                >
                  Forgot password?
                </Link>
              </div>
              <div className="relative">
                <Lock
                  size={16}
                  className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400"
                />
                <input
                  type={showPass ? "text" : "password"}
                  placeholder="Enter your password"
                  value={form.password}
                  onChange={(e) =>
                    setForm({ ...form, password: e.target.value })
                  }
                  required
                  className="w-full pl-10 pr-11 py-3 border border-gray-200 rounded-2xl text-sm font-medium focus:outline-none focus:border-brand-500 focus:ring-2 focus:ring-brand-100 transition-all placeholder:text-gray-400"
                />
                <button
                  type="button"
                  onClick={() => setShowPass(!showPass)}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 cursor-pointer"
                  aria-label={showPass ? "Hide password" : "Show password"}
                >
                  {showPass ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
            </div>

            {/* Remember Me */}
            <div className="flex items-center justify-between text-xs text-gray-600">
              <label className="flex items-center gap-2 cursor-pointer select-none">
                <input
                  type="checkbox"
                  checked={form.rememberMe}
                  onChange={(e) =>
                    setForm({ ...form, rememberMe: e.target.checked })
                  }
                  className="w-4 h-4 rounded text-brand-500 accent-brand-500"
                />
                <span className="font-medium">Remember me on this device</span>
              </label>
            </div>

            <button
              type="submit"
              disabled={loading || googleLoading}
              className="btn-primary py-3.5 text-sm font-bold w-full rounded-2xl shadow-md shadow-brand-500/20 flex items-center justify-center gap-2 mt-2 cursor-pointer active:scale-[0.99] disabled:opacity-60"
            >
              {loading ? (
                <span className="w-5 h-5 border-2 border-white/40 border-t-white rounded-full animate-spin" />
              ) : (
                <>
                  <span>Sign In</span>
                  <ArrowRight size={16} />
                </>
              )}
            </button>
          </form>

          {/* Quick Demo Test Sign In */}
          <div className="mt-5 pt-4 border-t border-gray-100 text-center">
            <button
              type="button"
              onClick={fillDemoAccount}
              className="inline-flex items-center gap-1.5 text-xs font-semibold text-gray-500 hover:text-brand-600 bg-gray-50 hover:bg-brand-50 px-3 py-1.5 rounded-xl border border-gray-200/80 transition-colors cursor-pointer"
            >
              <Sparkles size={12} className="text-amber-500" />
              <span>Fill 1-Click Demo Credentials</span>
            </button>
          </div>
        </div>

        {/* Bottom Area: Sign up & SSL */}
        <div className="pt-6 border-t border-gray-100 flex flex-col items-center gap-2.5">
          <p className="text-center text-xs sm:text-sm text-gray-500">
            Don&apos;t have an account?{" "}
            <Link
              href="/register"
              className="text-brand-600 font-bold hover:underline"
            >
              Create Account (Sign Up)
            </Link>
          </p>

          <div className="inline-flex items-center gap-1.5 text-[11px] text-gray-400">
            <ShieldCheck size={14} className="text-emerald-500" />
            <span>256-bit SSL Encrypted &amp; Protected</span>
          </div>
        </div>
      </div>
    </div>
  );
}
