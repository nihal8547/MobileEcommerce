import Link from "next/link";
import { Sparkles, ArrowRight } from "lucide-react";

const banners = [
  {
    id: 1,
    tag: "Flash Sale — Qatar",
    title: "Samsung Galaxy S25 Ultra",
    subtitle: "Snapdragon 8 Elite · 200MP Quad Camera · Free Galaxy Buds",
    offer: "Up to 30% OFF",
    color: "from-[#081832] via-[#0e244d] to-[#173873]",
    accent: "#3B82F6",
    href: "/product/samsung-s25-ultra",
    imageUrl:
      "https://images.unsplash.com/photo-1610945415295-d9bbf067e59c?auto=format&fit=crop&w=800&q=80",
    size: "lg",
  },
  {
    id: 2,
    tag: "New Arrival",
    title: "Apple Watch Series 10",
    subtitle: "From QAR 1,799 · Thinnest Ever",
    offer: "Free Express Shipping",
    color: "from-[#0a1e16] via-[#123326] to-[#1c4d3a]",
    accent: "#10B981",
    href: "/product/apple-watch-series-10",
    imageUrl:
      "https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=500&q=80",
    size: "sm",
  },
  {
    id: 3,
    tag: "Best Value",
    title: "140W Anker & MagSafe Gear",
    subtitle: "High-speed charging & armor cases",
    offer: "Buy 2 Get QAR 60 Off",
    color: "from-[#291309] via-[#3d1c0d] to-[#592b14]",
    accent: "#F59E0B",
    href: "/category/accessories",
    imageUrl:
      "https://images.unsplash.com/photo-1583863788434-e58a36330cf0?auto=format&fit=crop&w=500&q=80",
    size: "sm",
  },
];

export function PromoBanners() {
  return (
    <section className="py-8 bg-surface-secondary">
      <div className="container-main">
        <div className="grid md:grid-cols-3 gap-5 items-stretch">
          {/* Large Hero Banner */}
          {(() => {
            const b = banners[0];
            return (
              <Link
                href={b.href}
                className="md:col-span-2 group relative overflow-hidden rounded-3xl shadow-lg transition-all duration-300 flex flex-col h-full bg-slate-900 border border-white/10"
              >
                <div
                  className={`bg-gradient-to-br ${b.color} p-7 sm:p-9 h-full min-h-[300px] flex flex-col justify-between relative overflow-hidden`}
                >
                  <div className="absolute inset-0 qatar-pattern opacity-20 pointer-events-none" />
                  <div
                    className="absolute -right-8 -bottom-8 w-72 h-72 rounded-full blur-3xl opacity-35 pointer-events-none"
                    style={{ background: b.accent }}
                  />

                  {/* Sample Product Image in Styled Frame */}
                  <div className="absolute right-4 sm:right-8 top-1/2 -translate-y-1/2 w-44 sm:w-60 md:w-72 h-44 sm:h-56 flex items-center justify-center p-2 rounded-2xl bg-black/30 border border-white/10 backdrop-blur-xs shadow-2xl overflow-hidden group-hover:scale-105 transition-transform duration-500">
                    <img
                      src={b.imageUrl}
                      alt={b.title}
                      className="w-full h-full object-cover rounded-xl"
                    />
                  </div>

                  {/* Text Details */}
                  <div className="relative z-10 max-w-[62%] sm:max-w-[58%]">
                    <span
                      className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-extrabold text-white mb-3 shadow-xs"
                      style={{ background: b.accent }}
                    >
                      <Sparkles size={12} />
                      {b.tag}
                    </span>
                    <h3 className="text-2xl sm:text-3xl font-extrabold text-white mb-2 tracking-tight leading-tight">
                      {b.title}
                    </h3>
                    <p className="text-white/80 text-xs sm:text-sm leading-relaxed">
                      {b.subtitle}
                    </p>
                  </div>

                  <div className="relative z-10 flex items-center gap-3 mt-6">
                    <span className="inline-flex items-center gap-2 px-4 py-2.5 bg-white/20 hover:bg-white/30 border border-white/25 rounded-xl text-white text-xs sm:text-sm font-bold backdrop-blur-md transition-colors shadow-sm">
                      <span>{b.offer}</span>
                      <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                    </span>
                  </div>
                </div>
              </Link>
            );
          })()}

          {/* Two Stacked Small Banners */}
          <div className="flex flex-col gap-5 justify-between">
            {banners.slice(1).map((banner) => (
              <Link
                key={banner.id}
                href={banner.href}
                className="group relative overflow-hidden rounded-3xl shadow-lg transition-all duration-300 flex-1 flex flex-col bg-slate-900 border border-white/10"
              >
                <div
                  className={`bg-gradient-to-br ${banner.color} p-5 sm:p-6 h-full flex items-center justify-between relative overflow-hidden`}
                >
                  <div className="absolute inset-0 qatar-pattern opacity-15 pointer-events-none" />
                  <div
                    className="absolute -right-4 -bottom-4 w-32 h-32 rounded-full blur-2xl opacity-25 pointer-events-none"
                    style={{ background: banner.accent }}
                  />

                  {/* Text Details */}
                  <div className="relative z-10 max-w-[62%]">
                    <span
                      className="inline-flex px-2.5 py-0.5 rounded-full text-[10px] font-extrabold text-white mb-1.5 shadow-xs"
                      style={{ background: banner.accent }}
                    >
                      {banner.tag}
                    </span>
                    <h3 className="text-sm sm:text-base font-extrabold text-white tracking-tight leading-snug">
                      {banner.title}
                    </h3>
                    <p className="text-white/70 text-[11px] mt-0.5 leading-tight">
                      {banner.subtitle}
                    </p>
                    <div className="mt-2.5">
                      <span className="text-[11px] font-bold text-white/90 underline flex items-center gap-1">
                        <span>{banner.offer}</span>
                        <ArrowRight size={12} className="group-hover:translate-x-0.5 transition-transform" />
                      </span>
                    </div>
                  </div>

                  {/* Product Image in Frosted Frame */}
                  <div className="relative z-10 w-22 h-22 sm:w-26 sm:h-26 rounded-2xl overflow-hidden bg-black/30 border border-white/10 p-1 backdrop-blur-xs flex items-center justify-center flex-shrink-0 shadow-lg group-hover:scale-105 transition-transform duration-300">
                    <img
                      src={banner.imageUrl}
                      alt={banner.title}
                      className="w-full h-full object-cover rounded-xl"
                    />
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
