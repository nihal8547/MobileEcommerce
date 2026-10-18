import Link from "next/link";
import { ShieldCheck, Truck, Sparkles, ArrowRight, CheckCircle2 } from "lucide-react";

export function BrandPartnerBanner() {
  return (
    <section className="py-6 sm:py-8 bg-surface-secondary">
      <div className="container-main">
        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-[#180914] via-[#2d0e20] to-[#130612] text-white p-7 sm:p-10 lg:p-12 shadow-xl border border-white/10">
          {/* Subtle Ambient Glows and Pattern */}
          <div className="absolute inset-0 qatar-pattern opacity-20 pointer-events-none" />
          <div className="absolute -top-20 -right-20 w-80 h-80 rounded-full bg-brand-500/20 blur-3xl pointer-events-none" />
          <div className="absolute -bottom-20 -left-20 w-80 h-80 rounded-full bg-purple-500/15 blur-3xl pointer-events-none" />

          <div className="relative z-10 grid lg:grid-cols-12 gap-8 items-center">
            {/* Left Column: Offer & Trust Messaging */}
            <div className="lg:col-span-7 flex flex-col items-start">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-brand-500/20 border border-brand-400/30 text-brand-300 text-xs font-black tracking-wider uppercase mb-4 backdrop-blur-md">
                <Sparkles size={14} className="text-yellow-400" />
                <span>100% Genuine Qatar Agency Stock</span>
              </div>

              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white tracking-tight leading-tight mb-3">
                Authorized Brand Guarantee
              </h2>

              <p className="text-white/80 text-sm sm:text-base leading-relaxed mb-6 max-w-xl">
                Direct partnerships with Apple, Samsung, Google &amp; Sony distributors in Qatar. 
                Every item is factory-sealed with full local warranty coverage, serial number verification, and fast Doha delivery.
              </p>

              {/* Trust Pills */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 w-full mb-6">
                <div className="flex items-center gap-2 bg-white/5 border border-white/10 rounded-xl px-3.5 py-2.5 backdrop-blur-xs">
                  <ShieldCheck size={18} className="text-emerald-400 flex-shrink-0" />
                  <span className="text-xs font-bold text-white/95">Official Warranty</span>
                </div>
                <div className="flex items-center gap-2 bg-white/5 border border-white/10 rounded-xl px-3.5 py-2.5 backdrop-blur-xs">
                  <Truck size={18} className="text-brand-400 flex-shrink-0" />
                  <span className="text-xs font-bold text-white/95">Same-Day in Doha</span>
                </div>
                <div className="flex items-center gap-2 bg-white/5 border border-white/10 rounded-xl px-3.5 py-2.5 backdrop-blur-xs">
                  <CheckCircle2 size={18} className="text-yellow-400 flex-shrink-0" />
                  <span className="text-xs font-bold text-white/95">Factory Sealed</span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-wrap items-center gap-3">
                <Link
                  href="/category/smartphones"
                  className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-brand-500 hover:bg-brand-600 active:scale-[0.98] text-white font-extrabold text-sm shadow-lg shadow-brand-500/25 transition-all"
                >
                  <span>Shop Authorized Brands</span>
                  <ArrowRight size={16} />
                </Link>
                <Link
                  href="/category/wearables"
                  className="inline-flex items-center gap-2 px-5 py-3.5 rounded-xl bg-white/10 hover:bg-white/15 border border-white/15 text-white font-bold text-sm backdrop-blur-md transition-all"
                >
                  <span>Explore Accessories</span>
                </Link>
              </div>
            </div>

            {/* Right Column: Visual Product Showcase */}
            <div className="lg:col-span-5 flex justify-center lg:justify-end">
              <div className="relative w-full max-w-sm sm:max-w-md aspect-[4/3] flex items-center justify-center">
                {/* Floating Device 1: iPhone */}
                <div className="absolute left-4 top-2 w-44 sm:w-52 h-44 sm:h-52 rounded-3xl bg-white/5 border border-white/15 p-3 backdrop-blur-md shadow-2xl transform -rotate-6 hover:rotate-0 transition-transform duration-500 flex items-center justify-center">
                  <img
                    src="https://images.unsplash.com/photo-1592750475338-74b7b21085ab?auto=format&fit=crop&w=500&q=80"
                    alt="Official Apple iPhone"
                    className="max-h-full max-w-full object-contain drop-shadow-[0_15px_30px_rgba(0,0,0,0.6)]"
                  />
                  <span className="absolute bottom-2 left-2 right-2 text-center text-[10px] font-extrabold bg-black/60 backdrop-blur-xs text-white py-0.5 rounded-lg border border-white/10">
                    Apple Qatar
                  </span>
                </div>

                {/* Floating Device 2: Samsung Galaxy */}
                <div className="absolute right-2 bottom-2 w-44 sm:w-52 h-44 sm:h-52 rounded-3xl bg-white/5 border border-white/15 p-3 backdrop-blur-md shadow-2xl transform rotate-6 hover:rotate-0 transition-transform duration-500 flex items-center justify-center z-10">
                  <img
                    src="https://images.unsplash.com/photo-1610945415295-d9bbf067e59c?auto=format&fit=crop&w=500&q=80"
                    alt="Official Samsung Galaxy"
                    className="max-h-full max-w-full object-contain drop-shadow-[0_15px_30px_rgba(0,0,0,0.6)]"
                  />
                  <span className="absolute bottom-2 left-2 right-2 text-center text-[10px] font-extrabold bg-blue-600/80 backdrop-blur-xs text-white py-0.5 rounded-lg border border-white/10">
                    Samsung Gulf
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
