import Link from "next/link";
import { ShieldCheck, ArrowRight } from "lucide-react";

const brands = [
  {
    name: "Apple",
    slug: "apple",
    tagline: "iPhone, iPad, Watch & Mac",
    warranty: "Official Apple Qatar Warranty",
    logoText: " Apple",
    bg: "from-zinc-950 via-zinc-900 to-black text-white",
    accent: "text-zinc-300",
    imageUrl:
      "https://images.unsplash.com/photo-1592750475338-74b7b21085ab?auto=format&fit=crop&w=300&q=80",
  },
  {
    name: "Samsung",
    slug: "samsung",
    tagline: "Galaxy S25, Z Fold & Buds",
    warranty: "Samsung Gulf Official Care",
    logoText: "SAMSUNG",
    bg: "from-blue-950 via-blue-900 to-slate-950 text-white",
    accent: "text-blue-300",
    imageUrl:
      "https://images.unsplash.com/photo-1610945415295-d9bbf067e59c?auto=format&fit=crop&w=300&q=80",
  },
  {
    name: "Google",
    slug: "google",
    tagline: "Pixel 9 Series with Gemini AI",
    warranty: "100% Genuine Sealed Pack",
    logoText: "Google",
    bg: "from-emerald-950 via-teal-950 to-slate-950 text-white",
    accent: "text-emerald-300",
    imageUrl:
      "https://images.unsplash.com/photo-1598327105666-5b89351aff97?auto=format&fit=crop&w=300&q=80",
  },
  {
    name: "Sony",
    slug: "sony",
    tagline: "WH-1000XM6 & Premium Audio",
    warranty: "Fifty One East Authorized",
    logoText: "SONY",
    bg: "from-purple-950 via-indigo-950 to-neutral-950 text-white",
    accent: "text-purple-300",
    imageUrl:
      "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=300&q=80",
  },
];

export function BrandShowcase() {
  return (
    <section className="py-12 bg-white">
      <div className="container-main">
        <div className="flex items-end justify-between mb-6">
          <div>
            <p className="text-brand-500 text-xs font-extrabold uppercase tracking-wider mb-1">
              Authorized Brands
            </p>
            <h2 className="section-title">Official Brand Partners</h2>
            <p className="text-gray-500 text-sm mt-1">
              Buy with confidence — 100% genuine products with official local Qatar service support
            </p>
          </div>
          <Link
            href="/category/smartphones"
            className="text-sm font-semibold text-brand-500 hover:text-brand-600 transition-colors hidden sm:flex items-center gap-1"
          >
            All Brands <ArrowRight size={15} />
          </Link>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {brands.map((b) => (
            <Link
              key={b.slug}
              href={`/category/smartphones`}
              className={`group relative overflow-hidden rounded-3xl bg-gradient-to-br ${b.bg} p-6 flex flex-col justify-between min-h-[190px] shadow-card hover:shadow-card-hover transition-all duration-300 hover:-translate-y-1`}
            >
              {/* Background Product Sample Image */}
              <div className="absolute -right-2 -bottom-2 w-28 h-28 opacity-35 group-hover:opacity-55 group-hover:scale-110 transition-all duration-300 pointer-events-none">
                <img
                  src={b.imageUrl}
                  alt={b.name}
                  className="w-full h-full object-contain drop-shadow-md"
                />
              </div>

              <div className="relative z-10">
                <span className="font-extrabold text-xl sm:text-2xl tracking-tight block mb-1">
                  {b.logoText}
                </span>
                <p className={`text-xs ${b.accent} font-medium leading-snug`}>
                  {b.tagline}
                </p>
              </div>

              <div className="relative z-10 pt-4 border-t border-white/10 flex items-center justify-between">
                <span className="text-[11px] text-white/90 font-medium flex items-center gap-1">
                  <ShieldCheck size={13} className="text-emerald-400" />
                  {b.warranty}
                </span>
                <span className="text-xs text-white font-bold group-hover:translate-x-1 transition-transform">
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
