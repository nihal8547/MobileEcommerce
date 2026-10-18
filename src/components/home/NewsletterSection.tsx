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
    <section className="py-12 bg-white">
      <div className="container-main">
        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-gray-950 via-gray-900 to-brand-950 p-8 sm:p-12 text-white shadow-xl">
          {/* Background Decorative Circles */}
          <div className="absolute top-0 right-0 -mt-12 -mr-12 w-80 h-80 rounded-full bg-brand-500/15 blur-3xl pointer-events-none" />
          <div className="absolute bottom-0 left-0 -mb-12 -ml-12 w-64 h-64 rounded-full bg-blue-500/10 blur-2xl pointer-events-none" />

          <div className="relative z-10 max-w-2xl mx-auto text-center flex flex-col items-center">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 text-brand-300 text-xs font-bold uppercase tracking-wider mb-3 backdrop-blur-sm border border-white/10">
              <Sparkles size={13} />
              Qatar VIP Gadget Club
            </span>
            <h2
              className="text-2xl sm:text-4xl font-extrabold leading-tight mb-3"
              style={{ fontFamily: "var(--font-syne)" }}
            >
              Get <span className="text-brand-400">QAR 50 OFF</span> Your First Order
            </h2>
            <p className="text-gray-300 text-sm sm:text-base leading-relaxed mb-6 max-w-lg">
              Subscribe to get exclusive member-only flash sale alerts, Qatar launch invitations, and instant discounts.
            </p>

            {subscribed ? (
              <div className="flex items-center gap-2 bg-emerald-500/20 text-emerald-300 px-6 py-3.5 rounded-2xl border border-emerald-500/30 font-semibold text-sm">
                <CheckCircle2 size={18} />
                <span>Coupon code <strong>QATAR50</strong> applied! Check your email.</span>
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
                  className="flex-1 px-4 py-3.5 rounded-xl bg-white/10 border border-white/20 text-white placeholder:text-gray-400 text-sm focus:outline-none focus:ring-2 focus:ring-brand-400 transition-all backdrop-blur-sm"
                  required
                />
                <button
                  type="submit"
                  className="btn-primary py-3.5 px-6 rounded-xl text-sm font-bold shadow-lg shadow-brand-500/30 flex items-center justify-center gap-2"
                >
                  <Send size={15} />
                  Claim QAR 50
                </button>
              </form>
            )}

            <p className="text-[11px] text-gray-400 mt-4">
              🔒 No spam, ever. Unsubscribe anytime with a single click.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
