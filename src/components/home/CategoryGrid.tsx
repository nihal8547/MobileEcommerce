"use client";

import Link from "next/link";
import { useRef } from "react";
import { ChevronLeft, ChevronRight, Sparkles } from "lucide-react";

export interface CategoryItem {
  id?: string;
  name: string;
  slug: string;
  imageUrl?: string;
  count?: string;
}

const defaultCategories: CategoryItem[] = [
  {
    name: "Smartphones",
    slug: "smartphones",
    imageUrl: "https://images.unsplash.com/photo-1592750475338-74b7b21085ab?auto=format&fit=crop&w=400&q=80",
    count: "150+ Models",
  },
  {
    name: "Tablets & iPads",
    slug: "tablets",
    imageUrl: "https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?auto=format&fit=crop&w=400&q=80",
    count: "45+ Models",
  },
  {
    name: "Audio & ANC",
    slug: "audio",
    imageUrl: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=400&q=80",
    count: "80+ Models",
  },
  {
    name: "Smartwatches",
    slug: "wearables",
    imageUrl: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=400&q=80",
    count: "60+ Models",
  },
  {
    name: "Accessories",
    slug: "accessories",
    imageUrl: "https://images.unsplash.com/photo-1583863788434-e58a36330cf0?auto=format&fit=crop&w=400&q=80",
    count: "200+ Items",
  },
  {
    name: "Gaming Gear",
    slug: "gaming",
    imageUrl: "https://images.unsplash.com/photo-1600080972464-8e5f35f63d08?auto=format&fit=crop&w=400&q=80",
    count: "35+ Items",
  },
  {
    name: "Fast Chargers",
    slug: "accessories",
    imageUrl: "https://images.unsplash.com/photo-1609592807664-88fae32231b6?auto=format&fit=crop&w=400&q=80",
    count: "70+ Items",
  },
  {
    name: "Protection Cases",
    slug: "accessories",
    imageUrl: "https://images.unsplash.com/photo-1586105251261-72a756497a11?auto=format&fit=crop&w=400&q=80",
    count: "120+ Items",
  },
  {
    name: "Car Mounts",
    slug: "accessories",
    imageUrl: "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?auto=format&fit=crop&w=400&q=80",
    count: "40+ Items",
  },
];

interface CategoryGridProps {
  categories?: CategoryItem[];
  title?: string;
  subtitle?: string;
}

export function CategoryGrid({
  categories = defaultCategories,
  title = "Shop by Category",
  subtitle = "Explore Top Tech",
}: CategoryGridProps) {
  const scrollRef = useRef<HTMLDivElement>(null);

  const handleScroll = (direction: "left" | "right") => {
    if (scrollRef.current) {
      const scrollAmount = direction === "left" ? -280 : 280;
      scrollRef.current.scrollBy({ left: scrollAmount, behavior: "smooth" });
    }
  };

  return (
    <section className="py-6 sm:py-8 bg-white border-b border-gray-100">
      <div className="container-main">
        {/* Header with Title and Scroll Controls */}
        <div className="flex items-center justify-between mb-4">
          <div>
            <p className="text-brand-500 text-[11px] font-extrabold uppercase tracking-wider mb-0.5 flex items-center gap-1.5">
              <Sparkles size={12} />
              <span>{subtitle}</span>
            </p>
            <h2 className="text-xl sm:text-2xl font-extrabold text-gray-900 tracking-tight">
              {title}
            </h2>
          </div>

          <div className="flex items-center gap-2">
            {/* Swipe Navigation Buttons */}
            <button
              type="button"
              onClick={() => handleScroll("left")}
              className="w-8 h-8 sm:w-9 sm:h-9 rounded-full border border-gray-200 bg-white hover:bg-gray-50 flex items-center justify-center text-gray-600 hover:text-gray-900 shadow-2xs transition-colors cursor-pointer active:scale-95"
              aria-label="Swipe Left"
            >
              <ChevronLeft size={18} />
            </button>
            <button
              type="button"
              onClick={() => handleScroll("right")}
              className="w-8 h-8 sm:w-9 sm:h-9 rounded-full border border-gray-200 bg-white hover:bg-gray-50 flex items-center justify-center text-gray-600 hover:text-gray-900 shadow-2xs transition-colors cursor-pointer active:scale-95"
              aria-label="Swipe Right"
            >
              <ChevronRight size={18} />
            </button>

            <Link
              href="/category/smartphones"
              className="text-xs font-bold text-brand-500 hover:text-brand-600 transition-colors ml-2 hidden sm:inline-flex items-center gap-1"
            >
              <span>View All</span>
              <span>→</span>
            </Link>
          </div>
        </div>

        {/* Swipeable Carousel Container */}
        <div
          ref={scrollRef}
          className="flex items-center gap-3 sm:gap-4 overflow-x-auto scroll-smooth snap-x snap-mandatory py-2 px-1 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
        >
          {categories.map((cat, idx) => {
            const hasImage = Boolean(cat.imageUrl && cat.imageUrl.trim());

            return (
              <Link
                key={idx}
                href={`/category/${cat.slug}`}
                className="flex-shrink-0 w-24 sm:w-28 flex flex-col items-center text-center snap-start group select-none transition-transform hover:-translate-y-1 duration-200"
              >
                {/* Circular Image Container with Gradient Ring */}
                <div className="relative p-0.5 rounded-full bg-gradient-to-tr from-gray-200 via-gray-300 to-gray-200 group-hover:from-brand-500 group-hover:via-brand-400 group-hover:to-amber-500 transition-all duration-300 shadow-2xs group-hover:shadow-md mb-2">
                  <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full overflow-hidden bg-white p-0.5 flex items-center justify-center">
                    {hasImage ? (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img
                        src={cat.imageUrl!}
                        alt={cat.name}
                        className="w-full h-full object-cover rounded-full group-hover:scale-110 transition-transform duration-300"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center font-bold text-gray-500 text-xs bg-gray-100 rounded-full">
                        {cat.name.slice(0, 2).toUpperCase()}
                      </div>
                    )}
                  </div>
                </div>

                {/* Category Name & Product Count */}
                <p className="font-bold text-gray-900 text-xs leading-tight group-hover:text-brand-600 transition-colors line-clamp-1 w-full px-1">
                  {cat.name}
                </p>
                {cat.count && (
                  <p className="text-[10px] text-gray-400 mt-0.5 font-medium leading-none">
                    {cat.count}
                  </p>
                )}
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
