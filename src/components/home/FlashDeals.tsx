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
    <section className="py-10 bg-gradient-to-b from-brand-50/60 via-surface-secondary to-white border-y border-brand-100/50">
      <div className="container-main">
        {/* Header with Live Countdown */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-6">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-brand-500 text-white text-xs font-extrabold uppercase tracking-wider mb-2 shadow-sm">
              <Zap size={14} className="fill-white animate-pulse" />
              <span>Flash Deals Qatar</span>
            </div>
            <h2 className="section-title flex items-center gap-2">
              Limited-Time Offers
              <Flame size={26} className="text-brand-500 fill-brand-500 hidden sm:inline-block" />
            </h2>
            <p className="text-gray-500 text-sm mt-1">
              Deep discounts on flagships — special prices valid while stock lasts in Doha
            </p>
          </div>

          {/* Countdown Clock */}
          <div className="flex items-center gap-2 bg-white px-4 py-2.5 rounded-2xl border border-brand-100 shadow-sm self-start md:self-auto">
            <Clock size={16} className="text-brand-500" />
            <span className="text-xs font-bold text-gray-500 uppercase tracking-wider mr-1">
              Ends In:
            </span>
            <div className="flex items-center gap-1 font-mono font-extrabold text-sm text-gray-900">
              <span className="bg-gray-900 text-white px-2 py-1 rounded-lg">
                {formatDigit(timeLeft.hours)}
              </span>
              <span>:</span>
              <span className="bg-gray-900 text-white px-2 py-1 rounded-lg">
                {formatDigit(timeLeft.minutes)}
              </span>
              <span>:</span>
              <span className="bg-brand-500 text-white px-2 py-1 rounded-lg">
                {formatDigit(timeLeft.seconds)}
              </span>
            </div>
          </div>
        </div>

        {/* Product Cards with Increased Width */}
        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
          {flashProducts.map((product, i) => {
            const soldPercents = [85, 92, 78, 64];
            const soldPercent = soldPercents[i % soldPercents.length];

            return (
              <div key={product.id} className="flex flex-col">
                <ProductCard product={product} />

                {/* Deal Stock Claimed Bar */}
                <div className="mt-2.5 px-2">
                  <div className="flex justify-between items-center text-[11px] font-bold text-gray-500 mb-1">
                    <span className="text-brand-600 flex items-center gap-1">
                      <Flame size={12} className="fill-brand-500 text-brand-500" />
                      {soldPercent}% Claimed
                    </span>
                    <span>{product.stockQty} Units Left</span>
                  </div>
                  <div className="w-full h-1.5 bg-gray-200 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-brand-400 to-brand-600 rounded-full transition-all duration-500"
                      style={{ width: `${soldPercent}%` }}
                    />
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
