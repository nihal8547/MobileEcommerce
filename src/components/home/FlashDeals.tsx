"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Zap, Clock, Flame } from "lucide-react";
import { ProductCard } from "@/components/product/ProductCard";
import { CATALOG_PRODUCTS } from "@/lib/products-catalog";
import type { Product } from "@/types";

const flashDealSlugs = [
  "iphone-16-pro-max",
  "samsung-s25-ultra",
  "sony-wh1000xm6",
  "apple-watch-series-10",
];

const flashProducts: Product[] = flashDealSlugs
  .map((slug) => CATALOG_PRODUCTS[slug])
  .filter(Boolean);

export function FlashDeals() {
  const [timeLeft, setTimeLeft] = useState({
    hours: 8,
    minutes: 42,
    seconds: 19,
  });

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev.seconds > 0) {
          return { ...prev, seconds: prev.seconds - 1 };
        } else if (prev.minutes > 0) {
          return { ...prev, minutes: 59, seconds: 59 };
        } else if (prev.hours > 0) {
          return { hours: prev.hours - 1, minutes: 59, seconds: 59 };
        }
        return { hours: 12, minutes: 0, seconds: 0 };
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const formatDigit = (num: number) => String(num).padStart(2, "0");

  return (
    <section className="py-12 md:py-16 bg-gradient-to-b from-[#090d16] via-[#0f172a] to-[#090d16] border-y border-white/10 relative overflow-hidden text-white">
      {/* Decorative ambient elements */}
      <div className="absolute inset-0 qatar-pattern opacity-10 pointer-events-none" />
      <div className="absolute -top-24 right-1/4 w-96 h-96 bg-brand-500/15 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-24 left-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />

      <div className="container-main relative z-10">
        {/* Header with Live Countdown */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-brand-500 text-white text-xs font-extrabold uppercase tracking-wider mb-2.5 shadow-md shadow-brand-500/25">
              <Zap size={14} className="fill-white animate-pulse" />
              <span>Flash Deals Qatar</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white flex items-center gap-2.5 tracking-tight">
              Limited-Time Offers
              <Flame size={26} className="text-brand-400 fill-brand-400 animate-pulse hidden sm:inline-block" />
            </h2>
            <p className="text-gray-400 text-sm mt-1 max-w-xl">
              Deep discounts on flagships — special prices valid while stock lasts in Doha
            </p>
          </div>

          {/* Countdown Clock (Dark Glassmorphism) */}
          <div
            suppressHydrationWarning
            className="flex items-center gap-2.5 bg-white/10 border border-white/15 backdrop-blur-md px-4 py-2.5 rounded-2xl shadow-lg self-start md:self-auto"
          >
            <Clock size={16} className="text-brand-400" />
            <span className="text-xs font-bold text-gray-300 uppercase tracking-wider mr-1">
              Ends In:
            </span>
            <div
              suppressHydrationWarning
              className="flex items-center gap-1 font-mono font-extrabold text-sm text-white"
            >
              <span className="bg-black/60 text-white px-2 py-1 rounded-lg border border-white/10 shadow-inner">
                {formatDigit(timeLeft.hours)}
              </span>
              <span className="text-brand-400">:</span>
              <span className="bg-black/60 text-white px-2 py-1 rounded-lg border border-white/10 shadow-inner">
                {formatDigit(timeLeft.minutes)}
              </span>
              <span className="text-brand-400">:</span>
              <span className="bg-brand-500 text-white px-2 py-1 rounded-lg shadow-sm shadow-brand-500/30">
                {formatDigit(timeLeft.seconds)}
              </span>
            </div>
          </div>
        </div>

        {/* Product Cards */}
        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
          {flashProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </section>
  );
}
