"use client";

import { useState } from "react";
import { SlidersHorizontal, ChevronDown, Grid2X2, List } from "lucide-react";
import { ProductCard } from "@/components/product/ProductCard";
import type { Product } from "@/types";

const MOCK_PRODUCTS: Product[] = Array.from({ length: 12 }, (_, i) => ({
  id: String(i + 1),
  name: ["iPhone 16 Pro Max", "Samsung Galaxy S25 Ultra", "Google Pixel 9 Pro", "OnePlus 13", "Xiaomi 15 Ultra", "Nothing Phone 3"][i % 6] + ` ${i % 3 === 0 ? "256GB" : i % 3 === 1 ? "512GB" : "128GB"}`,
  slug: `product-${i + 1}`,
  sku: `SKU-${i + 1}`,
  priceQar: [4799, 4299, 3499, 2999, 3199, 2499][i % 6],
  originalPriceQar: [5399, 4999, 3799, 3299, 3599, 2799][i % 6],
  discountPercent: [11, 14, 8, 9, 11, 11][i % 6],
  stockQty: Math.max(1, 15 - i * 2),
  isActive: true,
  isFeatured: i < 4,
  isBestSeller: i % 3 === 0,
  isNewArrival: i % 4 === 0,
  whatsappEnabled: true,
  rating: 4.5 + (i % 5) * 0.1,
  reviewCount: 20 + i * 12,
  categoryId: "1",
  brand: { id: String(i % 4 + 1), name: ["Apple", "Samsung", "Google", "OnePlus"][i % 4], slug: ["apple", "samsung", "google", "oneplus"][i % 4] },
  images: [],
  createdAt: new Date(),
  updatedAt: new Date(),
}));

interface CategoryPageClientProps {
  slug: string;
}

export function CategoryPageClient({ slug }: CategoryPageClientProps) {
  const [sortBy, setSortBy] = useState("featured");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [filterOpen, setFilterOpen] = useState(false);

  const categoryName = slug.replace(/-/g, " ").replace(/\b\w/g, (c) => c.toUpperCase());

  const sorted = [...MOCK_PRODUCTS].sort((a, b) => {
    if (sortBy === "price-asc") return a.priceQar - b.priceQar;
    if (sortBy === "price-desc") return b.priceQar - a.priceQar;
    if (sortBy === "rating") return (b.rating || 0) - (a.rating || 0);
    return 0;
  });

  return (
    <div className="bg-surface-secondary min-h-screen">
      {/* Category hero */}
      <div className="bg-gradient-to-br from-[#1a0a06] via-[#2e1008] to-[#4a1a2e] py-10">
        <div className="container-main">
          <p className="text-brand-300 text-xs font-bold uppercase tracking-widest mb-2">Shop</p>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-white mb-2" style={{ fontFamily: "var(--font-syne)" }}>
            {categoryName}
          </h1>
          <p className="text-white/60 text-sm">{MOCK_PRODUCTS.length} products available in Qatar</p>
        </div>
      </div>

      <div className="container-main py-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-5">
          {/* Filter toggle (mobile) */}
          <button
            onClick={() => setFilterOpen(!filterOpen)}
            className="sm:hidden flex items-center gap-2 px-4 py-2.5 bg-white border border-gray-200 rounded-xl text-sm font-semibold text-gray-700"
          >
            <SlidersHorizontal size={16} />
            Filters
          </button>

          <p className="text-sm text-gray-500 hidden sm:block">
            Showing <strong>{sorted.length}</strong> products
          </p>

          <div className="flex items-center gap-3">
            {/* Sort */}
            <div className="relative">
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="appearance-none pl-3 pr-8 py-2.5 bg-white border border-gray-200 rounded-xl text-sm font-medium text-gray-700 focus:outline-none focus:border-brand-400 cursor-pointer"
              >
                <option value="featured">Featured</option>
                <option value="price-asc">Price: Low to High</option>
                <option value="price-desc">Price: High to Low</option>
                <option value="rating">Top Rated</option>
              </select>
              <ChevronDown size={14} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
            </div>

            {/* View toggle */}
            <div className="hidden sm:flex border border-gray-200 rounded-xl overflow-hidden">
              <button
                onClick={() => setViewMode("grid")}
                className={`p-2.5 transition-colors ${viewMode === "grid" ? "bg-brand-500 text-white" : "bg-white text-gray-500 hover:bg-gray-50"}`}
              >
                <Grid2X2 size={15} />
              </button>
              <button
                onClick={() => setViewMode("list")}
                className={`p-2.5 transition-colors ${viewMode === "list" ? "bg-brand-500 text-white" : "bg-white text-gray-500 hover:bg-gray-50"}`}
              >
                <List size={15} />
              </button>
            </div>
          </div>
        </div>

        <div className="grid sm:grid-cols-4 gap-5">
          {/* Sidebar filters (desktop) */}
          <aside className="hidden sm:block">
            <div className="bg-white rounded-2xl shadow-card p-5 sticky top-24">
              <h3 className="font-bold text-gray-900 mb-4 text-sm">Filter By</h3>

              {/* Brand filter */}
              <div className="mb-5">
                <p className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-3">Brand</p>
                {["Apple", "Samsung", "Google", "OnePlus", "Xiaomi"].map((brand) => (
                  <label key={brand} className="flex items-center gap-2.5 py-1.5 cursor-pointer group">
                    <input type="checkbox" className="w-4 h-4 rounded border-gray-300 text-brand-500 focus:ring-brand-400" />
                    <span className="text-sm text-gray-700 group-hover:text-brand-500 transition-colors">{brand}</span>
                  </label>
                ))}
              </div>

              {/* Price range */}
              <div className="mb-5">
                <p className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-3">Price Range (QAR)</p>
                {[
                  { label: "Under QAR 1,000", value: "0-1000" },
                  { label: "QAR 1,000 – 2,500", value: "1000-2500" },
                  { label: "QAR 2,500 – 4,000", value: "2500-4000" },
                  { label: "Above QAR 4,000", value: "4000+" },
                ].map((range) => (
                  <label key={range.value} className="flex items-center gap-2.5 py-1.5 cursor-pointer group">
                    <input type="radio" name="price" className="w-4 h-4 border-gray-300 text-brand-500 focus:ring-brand-400" />
                    <span className="text-sm text-gray-700 group-hover:text-brand-500 transition-colors">{range.label}</span>
                  </label>
                ))}
              </div>

              {/* Availability */}
              <div>
                <p className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-3">Availability</p>
                <label className="flex items-center gap-2.5 py-1.5 cursor-pointer">
                  <input type="checkbox" className="w-4 h-4 rounded border-gray-300 text-brand-500" />
                  <span className="text-sm text-gray-700">In Stock Only</span>
                </label>
                <label className="flex items-center gap-2.5 py-1.5 cursor-pointer">
                  <input type="checkbox" className="w-4 h-4 rounded border-gray-300 text-brand-500" />
                  <span className="text-sm text-gray-700">On Sale</span>
                </label>
              </div>
            </div>
          </aside>

          {/* Products grid */}
          <div className="sm:col-span-3">
            <div className={`grid gap-3 ${viewMode === "grid" ? "grid-cols-2 sm:grid-cols-3" : "grid-cols-1"}`}>
              {sorted.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
