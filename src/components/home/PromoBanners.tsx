import Link from "next/link";
import { Smartphone, Watch, Cable } from "lucide-react";
import type { LucideIcon } from "lucide-react";

const banners: {
  id: number; tag: string; title: string; subtitle: string; offer: string;
  color: string; accent: string; href: string; Icon: LucideIcon; size: string;
}[] = [
  {
    id: 1,
    tag: "Flash Sale",
    title: "Samsung Galaxy S25",
    subtitle: "Starting from QAR 3,299",
    offer: "Up to 30% OFF",
    color: "from-[#1a2a5e] to-[#0d1a40]",
    accent: "#3B82F6",
    href: "/category/smartphones",
    Icon: Smartphone,
    size: "lg",
  },
  {
    id: 2,
    tag: "New Arrivals",
    title: "Apple Watch Series 10",
    subtitle: "QAR 1,599 onwards",
    offer: "Free Shipping",
    color: "from-[#1a3a1a] to-[#0d2a0d]",
    accent: "#22C55E",
    href: "/category/wearables",
    Icon: Watch,
    size: "sm",
  },
  {
    id: 3,
    tag: "Best Value",
    title: "Accessories Bundle",
    subtitle: "Cases, chargers & more",
    offer: "Buy 2 Get 1 Free",
    color: "from-[#3a1a0a] to-[#2a1206]",
    accent: "#F59E0B",
    href: "/category/accessories",
    Icon: Cable,
    size: "sm",
  },
];

export function PromoBanners() {
  return (
    <section className="py-8 bg-surface-secondary">
      <div className="container-main">
        <div className="grid md:grid-cols-3 gap-4">
          {/* Large banner */}
          {(() => {
            const b = banners[0];
            const BannerIcon = b.Icon;
            return (
              <Link href={b.href} className="md:col-span-2 group relative overflow-hidden rounded-2xl">
                <div className={`bg-gradient-to-br ${b.color} p-8 h-full min-h-[220px] flex flex-col justify-between relative`}>
                  <div className="absolute inset-0 qatar-pattern opacity-20" />
                  <div className="absolute -right-6 -bottom-6 w-40 h-40 rounded-full blur-2xl opacity-30" style={{ background: b.accent }} />
                  <div className="relative z-10">
                    <span className="inline-flex px-2.5 py-1 rounded-full text-xs font-bold text-white mb-3" style={{ background: b.accent }}>
                      {b.tag}
                    </span>
                    <h3 className="text-2xl sm:text-3xl font-extrabold text-white mb-1" style={{ fontFamily: "var(--font-syne)" }}>
                      {b.title}
                    </h3>
                    <p className="text-white/70 text-sm">{b.subtitle}</p>
                  </div>
                  <div className="relative z-10 flex items-end justify-between mt-4">
                    <span className="inline-flex px-4 py-2 bg-white/15 border border-white/20 rounded-xl text-white text-sm font-bold backdrop-blur-sm group-hover:bg-white/25 transition-colors">
                      {b.offer} →
                    </span>
                    <BannerIcon size={80} strokeWidth={1} className="opacity-80 group-hover:scale-110 transition-transform duration-300 drop-shadow-lg" style={{ color: b.accent }} />
                  </div>
                </div>
              </Link>
            );
          })()}

          {/* Two small banners */}
          <div className="flex flex-col gap-4">
            {banners.slice(1).map((banner) => {
              const SmallIcon = banner.Icon;
              return (
                <Link key={banner.id} href={banner.href} className="group relative overflow-hidden rounded-2xl">
                  <div className={`bg-gradient-to-br ${banner.color} p-6 flex flex-col justify-between relative`} style={{ minHeight: "102px" }}>
                    <div className="absolute inset-0 qatar-pattern opacity-20" />
                    <div className="absolute -right-4 -bottom-4 w-24 h-24 rounded-full blur-xl opacity-30" style={{ background: banner.accent }} />
                    <div className="relative z-10 flex items-start justify-between">
                      <div>
                        <span className="inline-flex px-2 py-0.5 rounded-full text-xs font-bold text-white mb-2" style={{ background: banner.accent }}>
                          {banner.tag}
                        </span>
                        <h3 className="text-base font-extrabold text-white" style={{ fontFamily: "var(--font-syne)" }}>{banner.title}</h3>
                        <p className="text-white/60 text-xs mt-0.5">{banner.subtitle}</p>
                      </div>
                      <SmallIcon size={40} strokeWidth={1} className="opacity-80 group-hover:scale-110 transition-transform duration-300 shrink-0" style={{ color: banner.accent }} />
                    </div>
                    <div className="relative z-10 mt-3">
                      <span className="text-xs font-bold text-white/80 group-hover:text-white transition-colors">
                        {banner.offer} →
                      </span>
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
