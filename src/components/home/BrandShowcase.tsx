import Link from "next/link";
import { ShieldCheck, ArrowRight, CheckCircle2 } from "lucide-react";

const brands = [
  {
    name: "Apple",
    slug: "apple",
    tagline: "iPhone 16 Pro, iPad & Mac",
    warranty: "Official Apple Qatar Warranty",
    logoText: " Apple",
    bg: "from-neutral-900 via-neutral-950 to-black text-white",
    border: "border-neutral-800",
    accent: "text-neutral-300",
    badge: "Authorized Reseller",
    imageUrl:
      "https://images.unsplash.com/photo-1592750475338-74b7b21085ab?auto=format&fit=crop&w=400&q=80",
  },
  {
    name: "Samsung",
    slug: "samsung",
    tagline: "Galaxy S25 Ultra & Fold6",
    warranty: "Samsung Gulf Official Care",
    logoText: "SAMSUNG",
    bg: "from-slate-900 via-blue-950 to-slate-950 text-white",
    border: "border-blue-900/40",
    accent: "text-blue-300",
    badge: "Official Distributor",
    imageUrl:
      "https://images.unsplash.com/photo-1610945415295-d9bbf067e59c?auto=format&fit=crop&w=400&q=80",
  },
  {
    name: "Google",
    slug: "google",
    tagline: "Pixel 9 Pro with Gemini AI",
    warranty: "Factory Sealed Pack",
    logoText: "Google Pixel",
    bg: "from-zinc-900 via-emerald-950 to-neutral-950 text-white",
    border: "border-emerald-900/30",
    accent: "text-emerald-300",
    badge: "Official Partner",
    imageUrl:
      "https://images.unsplash.com/photo-1598327105666-5b89351aff97?auto=format&fit=crop&w=400&q=80",
  },
  {
    name: "Sony",
    slug: "sony",
    tagline: "WH-1000XM6 & Hi-Res Audio",
    warranty: "Fifty One East Authorized",
    logoText: "SONY",
    bg: "from-stone-900 via-purple-950 to-neutral-950 text-white",
    border: "border-purple-900/30",
    accent: "text-purple-300",
    badge: "Authorized Dealer",
    imageUrl:
      "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=400&q=80",
  },
];

export function BrandShowcase() {
  return (
    <section className="py-12 sm:py-16 bg-white border-t border-gray-100">
      <div className="container-main">
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-gray-100 text-gray-700 text-xs font-bold uppercase tracking-wider mb-2">
              <CheckCircle2 size={13} className="text-emerald-600" />
              <span>100% Genuine Qatar Agency Stock</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-gray-900 tracking-tight">
              Official Brand Partners
            </h2>
            <p className="text-gray-500 text-sm mt-1 max-w-xl">
              Factory sealed devices with full local manufacturer warranty and rapid Doha delivery.
            </p>
          </div>
          <Link
            href="/category/smartphones"
            className="text-sm font-bold text-brand-500 hover:text-brand-600 transition-colors inline-flex items-center gap-1.5 self-start sm:self-auto group"
          >
            <span>Explore All Brands</span>
            <ArrowRight size={15} className="group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        {/* 4 Brand Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
          {brands.map((b) => (
            <Link
              key={b.slug}
              href="/category/smartphones"
              className={`group relative overflow-hidden rounded-3xl bg-gradient-to-br ${b.bg} p-6 sm:p-7 flex flex-col justify-between min-h-[220px] shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border ${b.border}`}
            >
              {/* Background ambient image glow */}
              <div className="absolute -right-3 -bottom-3 w-32 h-32 opacity-25 group-hover:opacity-45 group-hover:scale-110 transition-all duration-500 pointer-events-none">
                <img
                  src={b.imageUrl}
                  alt={b.name}
                  className="w-full h-full object-contain drop-shadow-2xl"
                />
              </div>

              {/* Top: Logo & Agency Badge */}
              <div className="relative z-10">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-[11px] font-bold text-white/70 bg-white/10 px-2.5 py-0.5 rounded-full backdrop-blur-xs">
                    {b.badge}
                  </span>
                </div>
                <h3 className="font-extrabold text-2xl tracking-tight text-white mb-1.5">
                  {b.logoText}
                </h3>
                <p className={`text-xs ${b.accent} font-medium leading-relaxed`}>
                  {b.tagline}
                </p>
              </div>

              {/* Bottom: Warranty Guarantee */}
              <div className="relative z-10 pt-4 mt-6 border-t border-white/10 flex items-center justify-between">
                <span className="text-[11px] text-white/85 font-medium flex items-center gap-1.5">
                  <ShieldCheck size={14} className="text-emerald-400 shrink-0" />
                  <span>{b.warranty}</span>
                </span>
                <span className="w-6 h-6 rounded-full bg-white/10 flex items-center justify-center text-white text-xs group-hover:bg-white group-hover:text-black transition-colors">
                  →
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
