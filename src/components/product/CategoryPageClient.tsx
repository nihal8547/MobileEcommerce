"use client";

import { useState } from "react";
import {
  SlidersHorizontal,
  ChevronDown,
  Grid2X2,
  List,
  ShieldCheck,
  Truck,
  Sparkles,
} from "lucide-react";
import { ProductCard } from "@/components/product/ProductCard";
import type { Product } from "@/types";

const CATEGORY_HEROES: Record<
  string,
  {
    image: string;
    tagline: string;
    gradient: string;
    badge: string;
  }
> = {
  smartphones: {
    image:
      "https://images.unsplash.com/photo-1592750475338-74b7b21085ab?auto=format&fit=crop&w=800&q=80",
    tagline: "Apple, Samsung & Google Flagships with Official Qatar Agency Warranty",
    gradient: "from-[#140804] via-[#240e06] to-[#3d1424]",
    badge: "100% Genuine Sealed Packs",
  },
  tablets: {
    image:
      "https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?auto=format&fit=crop&w=800&q=80",
    tagline: "iPad Pro M4, iPad Air & Galaxy Tab with Apple Pencil support",
    gradient: "from-[#081628] via-[#0c2242] to-[#183a6a]",
    badge: "Pro Productivity & Creativity",
  },
  audio: {
    image:
      "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=800&q=80",
    tagline: "Active Noise Cancelling Wireless Headphones, Earbuds & Speakers",
    gradient: "from-[#0a0a14] via-[#16162a] to-[#261838]",
    badge: "Hi-Res LDAC & Dolby Atmos",
  },
  wearables: {
    image:
      "https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=800&q=80",
    tagline: "Apple Watch Series 10, Ultra 2 & Galaxy Watch with ECG & GPS",
    gradient: "from-[#0e1726] via-[#12243d] to-[#1b3d68]",
    badge: "Advanced Health & Fitness",
  },
  accessories: {
    image:
      "https://images.unsplash.com/photo-1609592807664-88fae32231b6?auto=format&fit=crop&w=800&q=80",
    tagline: "140W GaN Fast Chargers, Spigen Cases, MagSafe Wireless & Cables",
    gradient: "from-[#221006] via-[#351809] to-[#4d2410]",
    badge: "Fast 140W Power & Armor",
  },
  gaming: {
    image:
      "https://images.unsplash.com/photo-1600080972464-8e5f35f63d08?auto=format&fit=crop&w=800&q=80",
    tagline: "PS5 Pro, Nintendo Switch OLED, Rog Ally & Wireless Controllers",
    gradient: "from-[#10081e] via-[#1c0f33] to-[#2e1850]",
    badge: "Next-Gen 4K 120fps",
  },
};

const PRODUCT_IMAGES = [
  "https://images.unsplash.com/photo-1592750475338-74b7b21085ab?auto=format&fit=crop&w=600&q=80",
  "https://images.unsplash.com/photo-1610945415295-d9bbf067e59c?auto=format&fit=crop&w=600&q=80",
  "https://images.unsplash.com/photo-1598327105666-5b89351aff97?auto=format&fit=crop&w=600&q=80",
  "https://images.unsplash.com/photo-1580910051074-3eb694886505?auto=format&fit=crop&w=600&q=80",
  "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?auto=format&fit=crop&w=600&q=80",
  "https://images.unsplash.com/photo-1510557880182-3d4d3cba35a5?auto=format&fit=crop&w=600&q=80",
];

const KNOWN_SLUGS = [
  "iphone-16-pro-max",
  "samsung-s25-ultra",
  "pixel-9-pro-xl",
  "sony-wh1000xm6",
  "apple-watch-series-10",
  "ipad-pro-m4",
];

const MOCK_PRODUCTS: Product[] = Array.from({ length: 12 }, (_, i) => {
  const name =
    ["iPhone 16 Pro Max", "Samsung Galaxy S25 Ultra", "Google Pixel 9 Pro", "OnePlus 13", "Xiaomi 15 Ultra", "Nothing Phone 3"][i % 6] +
    ` ${i % 3 === 0 ? "256GB" : i % 3 === 1 ? "512GB" : "128GB"}`;
  const slug = i < 6 ? KNOWN_SLUGS[i] : `product-${i + 1}`;

  return {
    id: String(i + 1),
    name,
    slug,
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
    brand: {
      id: String((i % 4) + 1),
      name: ["Apple", "Samsung", "Google", "OnePlus"][i % 4],
      slug: ["apple", "samsung", "google", "oneplus"][i % 4],
    },
    images: [
      {
        id: `img-${i}`,
        url: PRODUCT_IMAGES[i % PRODUCT_IMAGES.length],
        altText: name,
        isPrimary: true,
        sortOrder: 0,
      },
    ],
    createdAt: new Date(),
    updatedAt: new Date(),
  };
});

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
      {(() => {
        const heroData = CATEGORY_HEROES[slug] || {
          image:
            "https://images.unsplash.com/photo-1592750475338-74b7b21085ab?auto=format&fit=crop&w=800&q=80",
          tagline: "Explore Qatar's best collection of genuine consumer electronics",
          gradient: "from-[#140804] via-[#240e06] to-[#3d1424]",
          badge: "Official Qatar Agency Warranty",
        };

        return (
          <div
            className={`bg-gradient-to-br ${heroData.gradient} py-10 sm:py-14 relative overflow-hidden text-white`}
          >
            <div className="absolute inset-0 qatar-pattern opacity-25 pointer-events-none" />
            <div className="container-main relative z-10">
              <div className="grid md:grid-cols-12 gap-6 items-center">
                <div className="md:col-span-8">
                  <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-white/10 border border-white/20 mb-3 backdrop-blur-md">
                    <Sparkles size={13} className="text-amber-400" />
                    <span>{heroData.badge}</span>
                  </div>
                  <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight mb-2">
                    {categoryName}
                  </h1>
                  <p className="text-white/80 text-sm sm:text-base max-w-xl leading-relaxed mb-4">
                    {heroData.tagline}
                  </p>

                  <div className="flex flex-wrap items-center gap-3 text-xs text-white/90">
                    <span className="flex items-center gap-1.5 bg-black/25 px-2.5 py-1 rounded-lg">
                      <Truck size={14} className="text-brand-400" />
                      Same-Day Doha Delivery
                    </span>
                    <span className="flex items-center gap-1.5 bg-black/25 px-2.5 py-1 rounded-lg">
                      <ShieldCheck size={14} className="text-emerald-400" />
                      100% Genuine Sealed
                    </span>
                    <span className="text-white/60">
                      • {MOCK_PRODUCTS.length} Models Available
                    </span>
                  </div>
                </div>

                {/* Sample Category Hero Image */}
                <div className="md:col-span-4 flex justify-center md:justify-end">
                  <div className="w-40 h-40 sm:w-52 sm:h-52 md:w-60 md:h-60 rounded-3xl bg-white/5 border border-white/15 p-4 flex items-center justify-center backdrop-blur-md shadow-2xl relative group">
                    <img
                      src={heroData.image}
                      alt={categoryName}
                      className="max-h-full max-w-full object-contain drop-shadow-[0_15px_30px_rgba(0,0,0,0.6)] group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        );
      })()}

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
