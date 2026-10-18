import Link from "next/link";
import { ShieldCheck, ArrowRight } from "lucide-react";

const brands = [
  {
    name: "Apple",
    slug: "apple",
    tagline: "iPhone, iPad, Watch & Mac",
    warranty: "1-Yr Apple Qatar Warranty",
    logoText: " Apple",
    bg: "from-zinc-900 to-black text-white",
    accent: "text-zinc-300",
  },
  {
    name: "Samsung",
    slug: "samsung",
    tagline: "Galaxy S25, Z Fold & Buds",
    warranty: "Samsung Gulf Official",
    logoText: "SAMSUNG",
    bg: "from-blue-900 to-slate-900 text-white",
    accent: "text-blue-300",
  },
  {
    name: "Google",
    slug: "google",
    tagline: "Pixel 9 Series with Gemini AI",
    warranty: "100% Genuine Sealed Pack",
    logoText: "Google",
    bg: "from-emerald-900 to-teal-950 text-white",
    accent: "text-emerald-300",
  },
  {
    name: "Sony",
    slug: "sony",
    tagline: "WH-1000XM6 & Audio Gear",
    warranty: "Fifty One East Authorized",
    logoText: "SONY",
    bg: "from-purple-950 to-neutral-900 text-white",
    accent: "text-purple-300",
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
              className={`group relative overflow-hidden rounded-2xl bg-gradient-to-br ${b.bg} p-6 flex flex-col justify-between min-h-[170px] shadow-sm hover:shadow-card-hover transition-all duration-300 hover:-translate-y-1`}
            >
              <div>
                <span
                  className="font-extrabold text-xl sm:text-2xl tracking-wider block mb-2"
                  style={{ fontFamily: "var(--font-syne)" }}
                >
                  {b.logoText}
                </span>
                <p className={`text-xs ${b.accent} font-medium`}>{b.tagline}</p>
              </div>

              <div className="pt-4 border-t border-white/10 flex items-center justify-between">
                <span className="text-[11px] text-white/80 font-medium flex items-center gap-1">
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
