"use client";

import Link from "next/link";
import { useState } from "react";
import {
  Eye,
  EyeOff,
  User,
  Mail,
  Phone,
  Lock,
  ArrowRight,
  ShieldCheck,
  CheckCircle2,
  Sparkles,
  MapPin,
} from "lucide-react";
import toast from "react-hot-toast";

const QATAR_AREAS = [
  "Doha (Central)",
  "Lusail",
  "The Pearl",
  "West Bay",
  "Al Rayyan",
  "Al Wakrah",
  "Al Khor",
  "Al Dafna",
  "Al Sadd",
  "Bin Mahmoud",
  "Madinat Khalifa",
  "Msheireb Downtown",
  "Al Hilal",
  "Al Nasr",
  "Old Airport",
  "Umm Salal",
  "Mesaieed",
];

export default function RegisterPage() {
  const [showPass, setShowPass] = useState(false);
  const [showConfirmPass, setShowConfirmPass] = useState(false);
  const [loading, setLoading] = useState(false);
  const [googleLoading, setGoogleLoading] = useState(false);

  const [form, setForm] = useState({
    fullName: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
    area: "Doha (Central)",
    agreeTerms: true,
    whatsappUpdates: true,
  });

  // Calculate password strength
  const getPasswordStrength = (pass: string) => {
    if (!pass) return { score: 0, text: "", color: "bg-gray-200" };
    if (pass.length < 6) return { score: 1, text: "Too short", color: "bg-red-400" };
    const hasNum = /\d/.test(pass);
    const hasLetter = /[a-zA-Z]/.test(pass);
    const hasSpecial = /[!@#$%^&*(),.?":{}|<>]/.test(pass);

    if (pass.length >= 8 && hasNum && hasLetter && hasSpecial) {
      return { score: 3, text: "Strong password", color: "bg-emerald-500" };
    }
    if (pass.length >= 6 && hasNum && hasLetter) {
      return { score: 2, text: "Medium", color: "bg-amber-500" };
    }
    return { score: 1, text: "Weak", color: "bg-red-400" };
  };

  const strength = getPasswordStrength(form.password);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (form.phone.trim().length < 8) {
      toast.error("Please enter a valid 8-digit Qatar mobile number.");
      return;
    }

    if (form.password.length < 6) {
      toast.error("Password must be at least 6 characters.");
      return;
    }

    if (form.password !== form.confirmPassword) {
      toast.error("Passwords do not match. Please check again.");
      return;
    }

    if (!form.agreeTerms) {
      toast.error("Please accept the terms and privacy policy to continue.");
      return;
    }

    setLoading(true);
    try {
      await new Promise((r) => setTimeout(r, 1000));

      const newUser = {
        fullName: form.fullName.trim(),
        email: form.email.trim(),
        phone: `+974 ${form.phone.trim()}`,
        area: form.area,
        whatsappUpdates: form.whatsappUpdates,
        registeredAt: new Date().toISOString(),
      };

      if (typeof window !== "undefined") {
        localStorage.setItem("mobileshop_user", JSON.stringify(newUser));
      }

      toast.success(`Account created successfully! Welcome ${newUser.fullName}`, {
        icon: "🎉",
      });
      window.location.href = "/account";
    } catch {
      toast.error("Registration failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  // Google Sign-up
  const handleGoogleSignUp = async () => {
    setGoogleLoading(true);
    try {
      await new Promise((r) => setTimeout(r, 1000));

      const googleUser = {
        fullName: "Mohammed Al-Kuwari",
        email: "m.alkuwari@gmail.com",
        phone: "+974 6612 8900",
        area: "West Bay, Doha",
        avatar:
          "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=200&q=80",
        isGoogleAuth: true,
        registeredAt: new Date().toISOString(),
      };

      if (typeof window !== "undefined") {
        localStorage.setItem("mobileshop_user", JSON.stringify(googleUser));
      }

      toast.success("Account created via Google successfully!", { icon: "🚀" });
      window.location.href = "/account";
    } catch {
      toast.error("Google sign up failed. Please try again.");
    } finally {
      setGoogleLoading(false);
    }
  };

  return (
    <main className="min-h-[85vh] flex items-center justify-center px-4 py-12 bg-surface-secondary">
      <div className="w-full max-w-lg">
        {/* Brand Header */}
        <div className="text-center mb-8">
          <Link href="/" className="inline-flex items-center gap-2.5 mb-4 group">
            <div className="w-11 h-11 rounded-2xl bg-brand-gradient flex items-center justify-center shadow-lg shadow-brand-500/20 group-hover:scale-105 transition-transform">
              <span className="text-white font-extrabold text-2xl leading-none">
                M
              </span>
            </div>
            <div className="text-left">
              <div className="font-extrabold text-gray-900 text-xl tracking-tight">
                MobileShop
              </div>
              <div className="text-[10px] text-brand-600 font-bold uppercase tracking-widest leading-none flex items-center gap-1">
                <span>Qatar</span>
                <span className="text-xs">🇶🇦</span>
              </div>
            </div>
          </Link>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-gray-900 tracking-tight">
            Create Account
          </h1>
          <p className="text-gray-500 text-xs sm:text-sm mt-1.5">
            Join MobileShop Qatar for express checkout, order tracking & member perks
          </p>
        </div>

        {/* Card Container */}
        <div className="bg-white border border-gray-100 rounded-3xl p-6 sm:p-8 shadow-card">
          {/* Google Sign-up Button */}
          <button
            type="button"
            onClick={handleGoogleSignUp}
            disabled={googleLoading || loading}
            className="w-full flex items-center justify-center gap-3 py-3 px-4 border border-gray-200 hover:border-gray-300 rounded-2xl text-sm font-bold text-gray-700 bg-white hover:bg-gray-50 transition-all shadow-xs cursor-pointer disabled:opacity-60 active:scale-[0.99]"
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
                <span>Sign up with Google</span>
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
                or register with details
              </span>
            </div>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            {/* Full Name */}
            <div>
              <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1.5">
                Full Name
              </label>
              <div className="relative">
                <User
                  size={16}
                  className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400"
                />
                <input
                  type="text"
                  placeholder="e.g. Ahmed Al-Rashid"
                  value={form.fullName}
                  onChange={(e) =>
                    setForm({ ...form, fullName: e.target.value })
                  }
                  required
                  className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-2xl text-sm font-medium focus:outline-none focus:border-brand-500 focus:ring-2 focus:ring-brand-100 transition-all placeholder:text-gray-400"
                />
              </div>
            </div>

            {/* Email Address */}
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

            {/* Qatar Mobile Number */}
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
                Used for SMS delivery dispatch updates & courier coordination
              </p>
            </div>

            {/* Delivery Area in Qatar */}
            <div>
              <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1.5">
                Your Area in Qatar
              </label>
              <div className="relative">
                <MapPin
                  size={16}
                  className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400"
                />
                <select
                  value={form.area}
                  onChange={(e) =>
                    setForm({ ...form, area: e.target.value })
                  }
                  required
                  className="w-full pl-10 pr-8 py-3 border border-gray-200 rounded-2xl text-sm font-medium focus:outline-none focus:border-brand-500 focus:ring-2 focus:ring-brand-100 bg-white transition-all cursor-pointer"
                >
                  {QATAR_AREAS.map((a) => (
                    <option key={a} value={a}>
                      {a}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Password */}
            <div>
              <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1.5">
                Create Password
              </label>
              <div className="relative">
                <Lock
                  size={16}
                  className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400"
                />
                <input
                  type={showPass ? "text" : "password"}
                  placeholder="Min. 6 characters"
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

              {/* Password Strength Meter */}
              {form.password.length > 0 && (
                <div className="mt-2 flex items-center gap-2">
                  <div className="flex-1 flex gap-1 h-1.5">
                    <div
                      className={`flex-1 rounded-full ${
                        strength.score >= 1 ? strength.color : "bg-gray-200"
                      }`}
                    />
                    <div
                      className={`flex-1 rounded-full ${
                        strength.score >= 2 ? strength.color : "bg-gray-200"
                      }`}
                    />
                    <div
                      className={`flex-1 rounded-full ${
                        strength.score >= 3 ? strength.color : "bg-gray-200"
                      }`}
                    />
                  </div>
                  <span className="text-[11px] font-semibold text-gray-500">
                    {strength.text}
                  </span>
                </div>
              )}
            </div>

            {/* Confirm Password */}
            <div>
              <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1.5">
                Confirm Password
              </label>
              <div className="relative">
                <Lock
                  size={16}
                  className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400"
                />
                <input
                  type={showConfirmPass ? "text" : "password"}
                  placeholder="Re-enter your password"
                  value={form.confirmPassword}
                  onChange={(e) =>
                    setForm({ ...form, confirmPassword: e.target.value })
                  }
                  required
                  className="w-full pl-10 pr-11 py-3 border border-gray-200 rounded-2xl text-sm font-medium focus:outline-none focus:border-brand-500 focus:ring-2 focus:ring-brand-100 transition-all placeholder:text-gray-400"
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPass(!showConfirmPass)}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 cursor-pointer"
                  aria-label={
                    showConfirmPass ? "Hide password" : "Show password"
                  }
                >
                  {showConfirmPass ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
            </div>

            {/* Checkboxes */}
            <div className="flex flex-col gap-2.5 pt-1 text-xs text-gray-600">
              <label className="flex items-start gap-2.5 cursor-pointer select-none">
                <input
                  type="checkbox"
                  checked={form.agreeTerms}
                  onChange={(e) =>
                    setForm({ ...form, agreeTerms: e.target.checked })
                  }
                  className="w-4 h-4 rounded text-brand-500 accent-brand-500 mt-0.5"
                />
                <span>
                  I agree to the{" "}
                  <Link
                    href="/terms"
                    className="text-brand-600 font-bold hover:underline"
                  >
                    Terms of Service
                  </Link>{" "}
                  and{" "}
                  <Link
                    href="/privacy"
                    className="text-brand-600 font-bold hover:underline"
                  >
                    Privacy Policy
                  </Link>
                </span>
              </label>

              <label className="flex items-start gap-2.5 cursor-pointer select-none">
                <input
                  type="checkbox"
                  checked={form.whatsappUpdates}
                  onChange={(e) =>
                    setForm({ ...form, whatsappUpdates: e.target.checked })
                  }
                  className="w-4 h-4 rounded text-brand-500 accent-brand-500 mt-0.5"
                />
                <span>
                  Receive order tracking updates & exclusive tech discounts via WhatsApp
                </span>
              </label>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading || googleLoading}
              className="btn-primary py-3.5 text-sm font-bold w-full rounded-2xl shadow-md shadow-brand-500/20 flex items-center justify-center gap-2 mt-3 cursor-pointer active:scale-[0.99] disabled:opacity-60"
            >
              {loading ? (
                <span className="w-5 h-5 border-2 border-white/40 border-t-white rounded-full animate-spin" />
              ) : (
                <>
                  <span>Create Account</span>
                  <ArrowRight size={16} />
                </>
              )}
            </button>
          </form>
        </div>

        {/* Security & Link */}
        <div className="mt-6 flex flex-col items-center gap-3">
          <p className="text-center text-xs sm:text-sm text-gray-500">
            Already have an account?{" "}
            <Link
              href="/login"
              className="text-brand-600 font-bold hover:underline"
            >
              Sign In here
            </Link>
          </p>

          <div className="inline-flex items-center gap-1.5 text-[11px] text-gray-400">
            <ShieldCheck size={14} className="text-emerald-500" />
            <span>Official Qatar Warranty & Authorized Retailer</span>
          </div>
        </div>
      </div>
    </main>
  );
}
