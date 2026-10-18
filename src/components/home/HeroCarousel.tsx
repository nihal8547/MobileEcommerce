"use client";

import { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import {
  ChevronLeft,
  ChevronRight,
  Zap,
  Flame,
  Headphones,
  Smartphone,
  Watch,
  ShieldCheck,
  Truck,
  Sparkles,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";

const slides = [
  {
    id: 1,
    badgeIcon: Zap,
    badgeText: "Flash Sale — 48 Hours Only",
    title: "iPhone 16 Pro\nMax",
    subtitle: "Grade 5 Titanium · A18 Pro Chip · 4K 120fps Dolby Vision",
    cta: "Shop Now",
    ctaLink: "/category/smartphones",
    secondaryCta: "View Specs",
    secondaryLink: "/product/iphone-16-pro-max",
    currency: "QAR",
    price: "4,799",
    originalPrice: "5,399",
    priceFrom: "QAR 4,799",
    discount: "Save QAR 600",
    gradient: "from-[#1a0a06] via-[#2e1008] to-[#4a1a2e]",
    accent: "#ff4a28",
    imageUrl:
      "https://images.unsplash.com/photo-1592750475338-74b7b21085ab?auto=format&fit=crop&w=800&q=80",
    featureTag: "Apple Official Qatar Warranty",
  },
  {
    id: 2,
    badgeIcon: Flame,
    badgeText: "Best Seller in Qatar",
    title: "Samsung Galaxy\nS25 Ultra",
    subtitle: "200MP Quad Camera · Snapdragon 8 Elite · Galaxy AI & S-Pen",
    cta: "Order Now",
    ctaLink: "/product/samsung-s25-ultra",
    secondaryCta: "Compare",
    secondaryLink: "/category/smartphones",
    currency: "QAR",
    price: "4,299",
    originalPrice: "4,899",
    priceFrom: "QAR 4,299",
    discount: "Free Galaxy Buds",
    gradient: "from-[#061628] via-[#0a2040] to-[#1a3060]",
    accent: "#3B82F6",
    imageUrl:
      "https://images.unsplash.com/photo-1610945415295-d9bbf067e59c?auto=format&fit=crop&w=800&q=80",
    featureTag: "Samsung Gulf Authorized Care",
  },
  {
    id: 3,
    badgeIcon: Headphones,
    badgeText: "Audio Collection",
    title: "Sony WH-1000XM6\nWireless ANC",
    subtitle: "HD Noise Cancelling QN1 · 30-Hour Battery · LDAC Hi-Res Audio",
    cta: "Discover Audio",
    ctaLink: "/category/audio",
    secondaryCta: "View Headphones",
    secondaryLink: "/product/sony-wh1000xm6",
    currency: "QAR",
    price: "1,599",
    originalPrice: "1,899",
    priceFrom: "QAR 1,599",
    discount: "Free Travel Case",
    gradient: "from-[#0a0a14] via-[#16162a] to-[#2a1a40]",
    accent: "#8B5CF6",
    imageUrl:
      "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=800&q=80",
    featureTag: "Fifty One East Authorized",
  },
  {
    id: 4,
    badgeIcon: Watch,
    badgeText: "Thinnest Design Ever",
    title: "Apple Watch\nSeries 10",
    subtitle: "Wide-Angle OLED Display · Sleep Apnea Alerts · Faster Charging",
    cta: "Buy Now",
    ctaLink: "/product/apple-watch-series-10",
    secondaryCta: "Explore Wearables",
    secondaryLink: "/category/wearables",
    currency: "QAR",
    price: "1,799",
    originalPrice: "1,999",
    priceFrom: "QAR 1,799",
    discount: "Special Qatar Edition",
    gradient: "from-[#0e1726] via-[#112338] to-[#1e3a5f]",
    accent: "#06B6D4",
    imageUrl:
      "https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=800&q=80",
    featureTag: "Same-Day Delivery in Doha",
  },
];

export function HeroCarousel() {
  const [current, setCurrent] = useState(0);
  const [paused, setPaused] = useState(false);

  const next = useCallback(
    () => setCurrent((c) => (c + 1) % slides.length),
    []
  );
  const prev = useCallback(
    () => setCurrent((c) => (c - 1 + slides.length) % slides.length),
    []
  );

  useEffect(() => {
    if (paused) return;
    const timer = setInterval(next, 5000);
    return () => clearInterval(timer);
  }, [next, paused]);

  const slide = slides[current];
  const BadgeIcon = slide.badgeIcon;

  return (
    <section className="pt-3 sm:pt-5 pb-2 sm:pb-4">
      <div className="max-w-[1480px] mx-auto px-2.5 sm:px-6 lg:px-8">
        <div
          className={`relative overflow-hidden rounded-2xl sm:rounded-3xl lg:rounded-[2.5rem] bg-gradient-to-br ${slide.gradient} transition-all duration-700 select-none shadow-2xl shadow-black/15 border border-white/10 ring-1 ring-black/5`}
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
        >
          <div className="absolute inset-0 qatar-pattern opacity-25 pointer-events-none" />
          <div
            className="absolute top-10 right-1/4 w-72 h-72 rounded-full blur-3xl opacity-25 pointer-events-none transition-colors duration-700"
            style={{ background: slide.accent }}
          />
          <div className="absolute bottom-0 left-1/4 w-60 h-60 rounded-full blur-3xl opacity-15 bg-white pointer-events-none" />

          <div className="relative z-10 px-4 sm:px-10 lg:px-14 py-8 sm:py-14 md:py-16">
            <div className="grid md:grid-cols-12 gap-6 sm:gap-8 items-center min-h-[420px] md:min-h-[520px]">
              {/* Content Column */}
              <div
                className="md:col-span-7 order-2 md:order-1 animate-fade-in"
                key={slide.id + "content"}
              >
                <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/10 border border-white/20 text-xs sm:text-sm text-white/95 mb-4 sm:mb-6 backdrop-blur-md shadow-xs">
                  <BadgeIcon size={14} className="text-yellow-400" />
                  <span>{slide.badgeText}</span>
                </div>

                <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold text-white leading-[1.12] mb-3 sm:mb-4 tracking-tight drop-shadow-md">
                  {slide.title}
                </h1>

                <p className="text-white/80 text-xs sm:text-base lg:text-lg mb-6 sm:mb-8 max-w-lg leading-relaxed">
                  {slide.subtitle}
                </p>

                <div className="flex flex-wrap items-center gap-3 sm:gap-4 mb-6 sm:mb-8">
                  <div className="flex flex-col">
                    <span className="text-white/70 text-[10px] sm:text-xs uppercase tracking-wider font-semibold mb-0.5 sm:mb-1 font-sans">
                      Starting from
                    </span>
                    <div className="flex items-baseline gap-1 font-price">
                      <span className="text-xs sm:text-base font-bold text-white/80 tracking-wide uppercase font-sans">
                        {slide.currency}
                      </span>
                      <span className="text-2xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight tabular-nums font-sans leading-none drop-shadow-sm">
                        {slide.price}
                      </span>
                      {slide.originalPrice && (
                        <span className="text-[11px] sm:text-sm text-white/50 line-through font-sans tabular-nums ml-2 font-medium">
                          {slide.currency} {slide.originalPrice}
                        </span>
                      )}
                    </div>
                  </div>
                  <div
                    className="px-2.5 sm:px-3.5 py-1 sm:py-1.5 rounded-xl text-xs sm:text-sm font-bold text-white shadow-sm flex items-center gap-1.5 self-center font-sans"
                    style={{ background: slide.accent }}
                  >
                    <Sparkles size={13} />
                    <span>{slide.discount}</span>
                  </div>
                </div>

                <div className="flex flex-wrap items-center gap-2.5 sm:gap-3">
                  <Link
                    href={slide.ctaLink}
                    className="inline-flex items-center gap-2 px-5 sm:px-6 py-3 sm:py-3.5 rounded-xl font-bold text-white text-xs sm:text-base transition-all duration-200 hover:scale-[1.02] active:scale-[0.98] shadow-lg shadow-black/20"
                    style={{ background: slide.accent }}
                  >
                    <span>{slide.cta}</span>
                  </Link>
                  <Link
                    href={slide.secondaryLink}
                    className="inline-flex items-center gap-2 px-4 sm:px-6 py-3 sm:py-3.5 rounded-xl font-bold text-white/90 text-xs sm:text-base border border-white/30 hover:bg-white/15 transition-all duration-200 backdrop-blur-xs"
                  >
                    <span>{slide.secondaryCta}</span>
                  </Link>
                </div>
              </div>

              {/* Visual Column: Sample Image Presentation */}
              <div
                className="md:col-span-5 order-1 md:order-2 flex justify-center items-center py-2 sm:py-0"
                key={slide.id + "image"}
              >
                <div className="relative group">
                  {/* Outer decorative glow disc */}
                  <div
                    className="w-56 h-56 sm:w-80 sm:h-80 md:w-96 md:h-96 rounded-full flex items-center justify-center p-4 sm:p-6 relative transition-all duration-500"
                    style={{
                      background: `radial-gradient(circle at 40% 40%, ${slide.accent}30, transparent 75%)`,
                      border: `1.5px solid ${slide.accent}40`,
                    }}
                  >
                    {/* Real High-Resolution Sample Product Image */}
                    <img
                      src={slide.imageUrl}
                      alt={slide.title.replace("\n", " ")}
                      className="max-w-full max-h-full object-contain drop-shadow-[0_20px_40px_rgba(0,0,0,0.5)] transform hover:scale-105 transition-transform duration-500"
                    />
                  </div>

                  {/* Floating Trust Badge */}
                  <div className="absolute top-1 -left-2 sm:top-2 sm:-left-6 bg-gray-900/85 backdrop-blur-md border border-white/20 rounded-xl sm:rounded-2xl px-2.5 sm:px-3.5 py-1.5 sm:py-2 shadow-xl flex items-center gap-1.5 sm:gap-2 text-white">
                    <ShieldCheck size={14} className="text-emerald-400 flex-shrink-0" />
                    <span className="text-[10px] sm:text-[11px] font-bold">
                      {slide.featureTag}
                    </span>
                  </div>

                  {/* Floating Price Pill */}
                  <div className="absolute -bottom-2 -right-2 sm:-bottom-3 sm:-right-4 bg-white/95 backdrop-blur-md rounded-xl sm:rounded-2xl px-3 sm:px-4 py-2 sm:py-2.5 shadow-xl border border-gray-100 flex items-center gap-2 sm:gap-3">
                    <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-lg sm:rounded-xl bg-brand-50 text-brand-600 flex items-center justify-center font-bold">
                      <Truck size={15} />
                    </div>
                    <div>
                      <div className="text-[9px] sm:text-[10px] text-gray-500 font-bold uppercase tracking-wider">
                        Doha Express
                      </div>
                      <div className="font-extrabold text-gray-900 text-xs sm:text-sm tabular-nums">
                        FREE Delivery
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Prev / Next controls */}
          <button
            onClick={prev}
            className="absolute left-3 sm:left-5 top-1/2 -translate-y-1/2 w-9 h-9 sm:w-11 sm:h-11 rounded-full bg-black/25 hover:bg-black/45 border border-white/20 flex items-center justify-center text-white transition-all cursor-pointer backdrop-blur-md shadow-lg hover:scale-105 active:scale-95"
            aria-label="Previous"
          >
            <ChevronLeft size={20} />
          </button>
          <button
            onClick={next}
            className="absolute right-3 sm:right-5 top-1/2 -translate-y-1/2 w-9 h-9 sm:w-11 sm:h-11 rounded-full bg-black/25 hover:bg-black/45 border border-white/20 flex items-center justify-center text-white transition-all cursor-pointer backdrop-blur-md shadow-lg hover:scale-105 active:scale-95"
            aria-label="Next"
          >
            <ChevronRight size={20} />
          </button>

          {/* Slide Indicators */}
          <div className="absolute bottom-4 sm:bottom-6 left-1/2 -translate-x-1/2 flex items-center gap-2 bg-black/25 backdrop-blur-md px-3 py-1.5 rounded-full border border-white/10">
            {slides.map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrent(i)}
                className={`rounded-full transition-all duration-300 cursor-pointer ${
                  i === current ? "w-6 h-2 bg-white" : "w-2 h-2 bg-white/40 hover:bg-white/70"
                }`}
                aria-label={`Slide ${i + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
