"use client";

import { useState } from "react";
import { Send, Sparkles, CheckCircle2 } from "lucide-react";
import toast from "react-hot-toast";

export function NewsletterSection() {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!email || !email.includes("@")) {
      toast.error("Please enter a valid email address");
      return;
    }
    setSubscribed(true);
    toast.success("Welcome to VIP Club! Use code QATAR50 for QAR 50 off your first order 🎉");
  }

  return (
    <section className="py-12 sm:py-16 bg-white">
      <div className="container-main">
        <div className="relative overflow-hidden rounded-3xl lg:rounded-[2.5rem] bg-gradient-to-br from-neutral-950 via-[#181412] to-neutral-950 p-8 sm:p-12 lg:p-14 text-white shadow-2xl border border-white/10">
          {/* Subtle Ambient Glows */}
          <div className="absolute top-0 right-0 -mt-10 -mr-10 w-96 h-96 rounded-full bg-brand-500/10 blur-3xl pointer-events-none" />
          <div className="absolute bottom-0 left-0 -mb-10 -ml-10 w-80 h-80 rounded-full bg-amber-500/10 blur-3xl pointer-events-none" />
          <div className="absolute inset-0 qatar-pattern opacity-10 pointer-events-none" />

          <div className="relative z-10 max-w-2xl mx-auto text-center flex flex-col items-center">
            <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-white/10 text-brand-300 text-xs font-bold uppercase tracking-wider mb-4 backdrop-blur-md border border-white/10 shadow-sm">
              <Sparkles size={13} className="text-amber-400" />
              Qatar VIP Privilege Club
            </span>
            <h2
              className="text-2xl sm:text-4xl font-extrabold leading-tight mb-3 tracking-tight"
            >
              Get <span className="text-brand-400">QAR 50 OFF</span> Your First Order
            </h2>
            <p className="text-gray-300 text-sm sm:text-base leading-relaxed mb-6 max-w-lg">
              Join 25,000+ members in Qatar for exclusive early-access flash deals, flagship release alerts, and private member discounts.
            </p>

            {subscribed ? (
              <div className="flex items-center gap-2.5 bg-emerald-500/20 text-emerald-300 px-6 py-4 rounded-2xl border border-emerald-500/30 font-semibold text-sm backdrop-blur-md">
                <CheckCircle2 size={18} className="shrink-0" />
                <span>Coupon code <strong className="text-white underline">QATAR50</strong> activated! Use it during checkout.</span>
              </div>
            ) : (
              <form
                onSubmit={handleSubmit}
                className="w-full max-w-md flex flex-col sm:flex-row gap-2.5"
              >
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email address..."
                  className="flex-1 px-4 py-3.5 rounded-xl bg-white/10 border border-white/20 text-white placeholder:text-gray-400 text-sm focus:outline-none focus:ring-2 focus:ring-brand-400 focus:border-transparent transition-all backdrop-blur-md"
                  required
                />
                <button
                  type="submit"
                  className="py-3.5 px-6 rounded-xl bg-brand-500 hover:bg-brand-600 active:scale-[0.98] text-white text-sm font-bold shadow-lg shadow-brand-500/30 flex items-center justify-center gap-2 transition-all cursor-pointer"
                >
                  <Send size={15} />
                  <span>Claim QAR 50</span>
                </button>
              </form>
            )}

            <p className="text-xs text-gray-400 mt-4 flex items-center gap-1.5 font-medium">
              <span>🔒 100% Privacy guaranteed. Zero spam. Unsubscribe anytime.</span>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
