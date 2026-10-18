"use client";

import { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import { ChevronLeft, ChevronRight, Zap, Flame, Headphones, Smartphone } from "lucide-react";
import type { LucideIcon } from "lucide-react";

const slides: {
  id: number; badgeIcon: LucideIcon; badgeText: string;
  title: string; subtitle: string;
  cta: string; ctaLink: string; secondaryCta: string; secondaryLink: string;
  priceFrom: string; discount: string;
  gradient: string; accent: string; ProductIcon: LucideIcon;
}[] = [
  {
    id: 1,
    badgeIcon: Zap,
    badgeText: "Flash Sale — 48 Hours Only",
    title: "iPhone 16 Pro\nMax",
    subtitle: "Titanium Design · A18 Pro Chip · 4K ProRes Video",
    cta: "Shop Now",
    ctaLink: "/category/smartphones",
    secondaryCta: "View Specs",
    secondaryLink: "/product/iphone-16-pro-max",
    priceFrom: "QAR 4,799",
    discount: "Save QAR 600",
    gradient: "from-[#1a0a06] via-[#2e1008] to-[#4a1a2e]",
    accent: "#ff4a28",
    ProductIcon: Smartphone,
  },
  {
    id: 2,
    badgeIcon: Flame,
    badgeText: "Best Seller in Qatar",
    title: "Samsung Galaxy\nS25 Ultra",
    subtitle: "200MP Camera · Snapdragon 8 Elite · Built-in S Pen",
    cta: "Order Now",
    ctaLink: "/product/samsung-s25-ultra",
    secondaryCta: "Compare",
    secondaryLink: "/category/smartphones",
    priceFrom: "QAR 4,299",
    discount: "Free Galaxy Buds",
    gradient: "from-[#061628] via-[#0a2040] to-[#1a3060]",
    accent: "#3B82F6",
    ProductIcon: Smartphone,
  },
  {
    id: 3,
    badgeIcon: Headphones,
    badgeText: "Audio Collection",
    title: "Sony WH-1000XM6\nANC",
    subtitle: "30hr Battery · Industry-Best Noise Cancellation",
    cta: "Discover Audio",
    ctaLink: "/category/audio",
    secondaryCta: "See All Headphones",
    secondaryLink: "/category/audio",
    priceFrom: "QAR 1,599",
    discount: "Free Carry Case",
    gradient: "from-[#0a0a14] via-[#16162a] to-[#2a1a40]",
    accent: "#8B5CF6",
    ProductIcon: Headphones,
  },
];

export function HeroCarousel() {
  const [current, setCurrent] = useState(0);
  const [paused, setPaused] = useState(false);

  const next = useCallback(() => setCurrent((c) => (c + 1) % slides.length), []);
  const prev = useCallback(() => setCurrent((c) => (c - 1 + slides.length) % slides.length), []);

  useEffect(() => {
    if (paused) return;
    const timer = setInterval(next, 5000);
    return () => clearInterval(timer);
  }, [next, paused]);

  const slide = slides[current];
  const BadgeIcon = slide.badgeIcon;
  const ProductIcon = slide.ProductIcon;

  return (
    <section
      className={`relative overflow-hidden bg-gradient-to-br ${slide.gradient} transition-all duration-700`}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <div className="absolute inset-0 qatar-pattern opacity-30" />
      <div className="absolute top-10 right-1/4 w-64 h-64 rounded-full blur-3xl opacity-20" style={{ background: slide.accent }} />
      <div className="absolute bottom-0 left-1/4 w-48 h-48 rounded-full blur-3xl opacity-10 bg-white" />

      <div className="container-main relative z-10">
        <div className="grid md:grid-cols-2 gap-8 items-center min-h-[500px] md:min-h-[560px] py-12 md:py-16">
          {/* Content */}
          <div className="order-2 md:order-1 animate-fade-in" key={slide.id + "content"}>
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/10 border border-white/20 text-sm text-white/90 mb-6 backdrop-blur-sm">
              <BadgeIcon size={13} className="text-yellow-400" />
              {slide.badgeText}
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white leading-[1.05] mb-4 whitespace-pre-line" style={{ fontFamily: "var(--font-syne)", textShadow: "0 2px 20px rgba(0,0,0,0.3)" }}>
              {slide.title}
            </h1>

            <p className="text-white/70 text-base sm:text-lg mb-8 max-w-md leading-relaxed">
              {slide.subtitle}
            </p>

            <div className="flex flex-wrap items-center gap-4 mb-8">
              <div>
                <div className="text-white/60 text-xs uppercase tracking-wider font-semibold mb-0.5">Starting from</div>
                <div className="text-3xl font-extrabold text-white tabular-nums" style={{ fontFamily: "var(--font-syne)" }}>
                  {slide.priceFrom}
                </div>
              </div>
              <div className="px-3 py-1.5 rounded-lg text-sm font-bold text-white" style={{ background: slide.accent }}>
                {slide.discount}
              </div>
            </div>

            <div className="flex flex-wrap gap-3">
              <Link
                href={slide.ctaLink}
                className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl font-bold text-white text-sm sm:text-base transition-all duration-200 hover:scale-[1.02] active:scale-[0.98] shadow-lg"
                style={{ background: slide.accent }}
              >
                {slide.cta}
              </Link>
              <Link
                href={slide.secondaryLink}
                className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl font-bold text-white/80 text-sm sm:text-base border border-white/30 hover:bg-white/10 transition-all duration-200"
              >
                {slide.secondaryCta}
              </Link>
            </div>
          </div>

          {/* Visual — lucide icon inside glowing box */}
          <div className="order-1 md:order-2 flex justify-center items-center" key={slide.id + "image"}>
            <div className="relative">
              <div
                className="w-48 h-48 sm:w-64 sm:h-64 md:w-72 md:h-72 rounded-3xl flex items-center justify-center"
                style={{
                  background: `radial-gradient(circle at 40% 40%, ${slide.accent}33, transparent 70%)`,
                  border: `1px solid ${slide.accent}44`,
                }}
              >
                <ProductIcon
                  size={120}
                  className="opacity-90 drop-shadow-2xl"
                  style={{ color: slide.accent }}
                  strokeWidth={1}
                />
              </div>
              <div className="absolute -bottom-3 -right-3 bg-white rounded-2xl px-4 py-2 shadow-xl">
                <div className="text-xs text-gray-500 font-medium">Price from</div>
                <div className="font-extrabold text-gray-900 text-sm tabular-nums">{slide.priceFrom}</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <button onClick={prev} className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 border border-white/20 flex items-center justify-center text-white transition-all" aria-label="Previous">
        <ChevronLeft size={20} />
      </button>
      <button onClick={next} className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 border border-white/20 flex items-center justify-center text-white transition-all" aria-label="Next">
        <ChevronRight size={20} />
      </button>

      <div className="absolute bottom-5 left-1/2 -translate-x-1/2 flex gap-2">
        {slides.map((_, i) => (
          <button key={i} onClick={() => setCurrent(i)} className={`rounded-full transition-all duration-300 ${i === current ? "w-6 h-2 bg-white" : "w-2 h-2 bg-white/40"}`} aria-label={`Slide ${i + 1}`} />
        ))}
      </div>
    </section>
  );
}
