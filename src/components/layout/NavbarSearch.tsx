"use client";

import { useState, useEffect, useRef, useMemo } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  Search,
  X,
  TrendingUp,
  ArrowRight,
  Smartphone,
  Tablet,
  Headphones,
  Watch,
  Zap,
  Sparkles,
  ShieldCheck,
  Package,
} from "lucide-react";
import { CATALOG_PRODUCTS } from "@/lib/products-catalog";

interface SearchProduct {
  id: string;
  slug: string;
  name: string;
  category: string;
  brand: string;
  priceQar: number;
  originalPriceQar?: number;
  imageUrl: string;
  stockQty: number;
}

const TRENDING_SEARCHES = [
  "iPhone 16 Pro Max",
  "Samsung Galaxy S25 Ultra",
  "Apple Watch Series 10",
  "Sony WH-1000XM6",
  "iPad Pro M4",
  "AirPods Pro",
  "Anker 140W Charger",
];

const QUICK_CATEGORIES = [
  { label: "Smartphones", slug: "smartphones", icon: Smartphone },
  { label: "Tablets", slug: "tablets", icon: Tablet },
  { label: "Audio & ANC", slug: "audio", icon: Headphones },
  { label: "Wearables", slug: "wearables", icon: Watch },
  { label: "Accessories", slug: "accessories", icon: Zap },
];

export function NavbarSearch({
  isMobile = false,
  onCloseMobile,
}: {
  isMobile?: boolean;
  onCloseMobile?: () => void;
}) {
  const router = useRouter();
  const [query, setQuery] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState<number>(-1);
  const [productsList, setProductsList] = useState<SearchProduct[]>([]);

  const containerRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Initialize products from catalog + localStorage
  useEffect(() => {
    let list: SearchProduct[] = Object.values(CATALOG_PRODUCTS).map((p) => ({
      id: p.id,
      slug: p.slug,
      name: p.name,
      category: p.category?.name || "Smartphones",
      brand: p.brand?.name || "Apple",
      priceQar: p.priceQar,
      originalPriceQar: p.originalPriceQar,
      imageUrl:
        p.images[0]?.url ||
        "https://images.unsplash.com/photo-1592750475338-74b7b21085ab?auto=format&fit=crop&w=300&q=80",
      stockQty: p.stockQty,
    }));

    try {
      const stored = localStorage.getItem("mobileshop_admin_products");
      if (stored) {
        const parsed = JSON.parse(stored);
        if (Array.isArray(parsed) && parsed.length > 0) {
          list = parsed.map((p: any) => ({
            id: p.id,
            slug: p.slug || p.name.toLowerCase().replace(/[^a-z0-9]+/g, "-"),
            name: p.name,
            category: p.category,
            brand: p.brand,
            priceQar: p.priceQar,
            originalPriceQar: p.originalPriceQar,
            imageUrl: p.imageUrl,
            stockQty: p.stockQty,
          }));
        }
      }
    } catch {
      // Ignore
    }

    setProductsList(list);
  }, []);

  // Close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Global keyboard shortcut '/' or 'Ctrl+K'
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (
        (e.key === "/" && document.activeElement?.tagName !== "INPUT" && document.activeElement?.tagName !== "TEXTAREA") ||
        (e.key === "k" && (e.metaKey || e.ctrlKey))
      ) {
        e.preventDefault();
        inputRef.current?.focus();
        setIsOpen(true);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  // Filter matching suggestions
  const filteredProducts = useMemo(() => {
    const clean = query.trim().toLowerCase();
    if (!clean) return [];

    return productsList
      .filter((p) => {
        return (
          p.name.toLowerCase().includes(clean) ||
          p.brand.toLowerCase().includes(clean) ||
          p.category.toLowerCase().includes(clean)
        );
      })
      .slice(0, 6);
  }, [query, productsList]);

  // Matching categories
  const matchingCategories = useMemo(() => {
    const clean = query.trim().toLowerCase();
    if (!clean) return [];
    return QUICK_CATEGORIES.filter((c) =>
      c.label.toLowerCase().includes(clean) || c.slug.toLowerCase().includes(clean)
    );
  }, [query]);

  // Navigation handlers
  const handleSelectProduct = (slug: string) => {
    setIsOpen(false);
    if (onCloseMobile) onCloseMobile();
    router.push(`/product/${slug}`);
  };

  const handleSelectCategory = (slug: string) => {
    setIsOpen(false);
    if (onCloseMobile) onCloseMobile();
    router.push(`/category/${slug}`);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (!isOpen) return;

    if (e.key === "ArrowDown") {
      e.preventDefault();
      setSelectedIndex((prev) =>
        prev < filteredProducts.length - 1 ? prev + 1 : 0
      );
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setSelectedIndex((prev) =>
        prev > 0 ? prev - 1 : filteredProducts.length - 1
      );
    } else if (e.key === "Enter") {
      e.preventDefault();
      if (selectedIndex >= 0 && filteredProducts[selectedIndex]) {
        handleSelectProduct(filteredProducts[selectedIndex].slug);
      } else if (filteredProducts.length > 0) {
        handleSelectProduct(filteredProducts[0].slug);
      } else if (matchingCategories.length > 0) {
        handleSelectCategory(matchingCategories[0].slug);
      }
    } else if (e.key === "Escape") {
      setIsOpen(false);
      inputRef.current?.blur();
    }
  };

  const highlightMatch = (text: string, q: string) => {
    if (!q.trim()) return text;
    const parts = text.split(new RegExp(`(${q})`, "gi"));
    return (
      <span>
        {parts.map((part, i) =>
          part.toLowerCase() === q.toLowerCase() ? (
            <span key={i} className="font-bold text-brand-600 bg-brand-50/80 rounded px-0.5">
              {part}
            </span>
          ) : (
            part
          )
        )}
      </span>
    );
  };

  return (
    <div ref={containerRef} className="relative w-full">
      {/* Input Field */}
      <div className="relative flex items-center">
        <Search
          size={17}
          className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none"
        />
        <input
          ref={inputRef}
          type="text"
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
            setIsOpen(true);
            setSelectedIndex(-1);
          }}
          onFocus={() => setIsOpen(true)}
          onKeyDown={handleKeyDown}
          placeholder="Search smartphones, tablets, accessories in Qatar..."
          className="w-full pl-10 pr-16 py-2.5 bg-gray-50/90 hover:bg-gray-100/60 focus:bg-white border border-gray-200/90 focus:border-brand-500 rounded-2xl text-sm text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-4 focus:ring-brand-500/10 transition-all font-sans"
        />

        {/* Clear Button or Shortcut Hint */}
        <div className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center gap-1.5">
          {query ? (
            <button
              type="button"
              onClick={() => {
                setQuery("");
                inputRef.current?.focus();
              }}
              className="p-1 text-gray-400 hover:text-gray-700 hover:bg-gray-200 rounded-full transition-colors cursor-pointer"
              title="Clear search"
            >
              <X size={14} />
            </button>
          ) : (
            !isMobile && (
              <span className="hidden lg:inline-block text-[10px] font-semibold text-gray-400 bg-gray-200/80 px-1.5 py-0.5 rounded-md font-mono border border-gray-300/40 select-none">
                /
              </span>
            )
          )}
        </div>
      </div>

      {/* Instant Suggestions Dropdown */}
      {isOpen && (
        <div className="absolute top-full left-0 right-0 mt-2 bg-white rounded-3xl shadow-2xl border border-gray-100 z-50 overflow-hidden divide-y divide-gray-100/80 animate-fade-in">
          {/* STATE 1: Empty Query - Show Trending & Categories */}
          {!query.trim() && (
            <div className="p-4 sm:p-5">
              {/* Trending Searches */}
              <div className="mb-4">
                <div className="flex items-center gap-1.5 text-xs font-bold text-gray-500 uppercase tracking-wider mb-2.5">
                  <TrendingUp size={13} className="text-brand-500" />
                  <span>Trending in Qatar</span>
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {TRENDING_SEARCHES.map((item) => (
                    <button
                      key={item}
                      type="button"
                      onClick={() => {
                        setQuery(item);
                        setIsOpen(true);
                      }}
                      className="px-3 py-1.5 rounded-xl text-xs font-medium bg-gray-100 hover:bg-brand-50 hover:text-brand-600 text-gray-700 transition-colors cursor-pointer"
                    >
                      {item}
                    </button>
                  ))}
                </div>
              </div>

              {/* Browse by Category */}
              <div>
                <div className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-2.5">
                  Explore Departments
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                  {QUICK_CATEGORIES.map(({ label, slug, icon: Icon }) => (
                    <button
                      key={slug}
                      type="button"
                      onClick={() => handleSelectCategory(slug)}
                      className="flex items-center gap-2 p-2.5 rounded-xl border border-gray-100 hover:border-brand-200 hover:bg-brand-50/50 text-xs font-semibold text-gray-700 transition-all text-left cursor-pointer"
                    >
                      <div className="w-7 h-7 rounded-lg bg-gray-100 flex items-center justify-center text-gray-600">
                        <Icon size={14} />
                      </div>
                      <span className="truncate">{label}</span>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* STATE 2: Active Query with Matches */}
          {query.trim() && filteredProducts.length > 0 && (
            <div>
              {/* Matching Categories if any */}
              {matchingCategories.length > 0 && (
                <div className="px-4 py-2.5 bg-gray-50/70 flex items-center gap-2 flex-wrap text-xs">
                  <span className="text-gray-400 font-medium">Categories:</span>
                  {matchingCategories.map((cat) => (
                    <button
                      key={cat.slug}
                      type="button"
                      onClick={() => handleSelectCategory(cat.slug)}
                      className="px-2.5 py-1 rounded-lg bg-white border border-gray-200 hover:border-brand-300 hover:text-brand-600 font-semibold text-gray-700 transition-colors cursor-pointer"
                    >
                      {cat.label} →
                    </button>
                  ))}
                </div>
              )}

              {/* Products list */}
              <div className="p-2 sm:p-3 divide-y divide-gray-50 max-h-[380px] overflow-y-auto">
                {filteredProducts.map((product, idx) => {
                  const isSelected = selectedIndex === idx;

                  return (
                    <div
                      key={product.id}
                      onClick={() => handleSelectProduct(product.slug)}
                      onMouseEnter={() => setSelectedIndex(idx)}
                      className={`flex items-center justify-between p-2.5 sm:p-3 rounded-2xl cursor-pointer transition-colors ${
                        isSelected
                          ? "bg-brand-50/80 text-brand-950"
                          : "hover:bg-gray-50/90"
                      }`}
                    >
                      <div className="flex items-center gap-3 min-w-0 pr-3">
                        <img
                          src={product.imageUrl}
                          alt={product.name}
                          className="w-12 h-12 rounded-xl object-contain bg-white border border-gray-200/80 p-1 shrink-0 shadow-xs"
                        />
                        <div className="min-w-0">
                          <p className="text-xs sm:text-sm font-semibold text-gray-900 leading-tight truncate">
                            {highlightMatch(product.name, query)}
                          </p>
                          <div className="flex items-center gap-2 mt-1">
                            <span className="text-[10px] font-bold uppercase tracking-wider text-brand-600 bg-brand-50 px-1.5 py-0.5 rounded">
                              {product.brand}
                            </span>
                            <span className="text-[11px] text-gray-400 hidden sm:inline">
                              {product.category}
                            </span>
                            {product.stockQty > 0 && (
                              <span className="text-[10px] text-emerald-600 font-semibold">
                                · In Stock (Doha)
                              </span>
                            )}
                          </div>
                        </div>
                      </div>

                      <div className="text-right shrink-0">
                        <div className="font-extrabold text-xs sm:text-sm text-gray-900 font-sans">
                          QAR {product.priceQar.toLocaleString()}
                        </div>
                        {product.originalPriceQar && product.originalPriceQar > product.priceQar && (
                          <div className="text-[10px] text-gray-400 line-through">
                            QAR {product.originalPriceQar.toLocaleString()}
                          </div>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Bottom results footer */}
              <div className="p-3 bg-gray-50/90 px-4 flex items-center justify-between text-xs">
                <span className="text-gray-500">
                  Showing <strong>{filteredProducts.length}</strong> matching products
                </span>
                <button
                  type="button"
                  onClick={() => handleSelectProduct(filteredProducts[0].slug)}
                  className="font-bold text-brand-600 hover:text-brand-700 inline-flex items-center gap-1 cursor-pointer"
                >
                  <span>Select Top Match</span>
                  <ArrowRight size={13} />
                </button>
              </div>
            </div>
          )}

          {/* STATE 3: Query with NO Matches */}
          {query.trim() && filteredProducts.length === 0 && (
            <div className="p-6 text-center">
              <Package size={28} className="mx-auto text-gray-300 mb-2" />
              <p className="text-sm font-bold text-gray-800">
                No gadgets found for &ldquo;{query}&rdquo;
              </p>
              <p className="text-xs text-gray-400 mt-1 max-w-xs mx-auto leading-relaxed">
                Check spelling or try popular keywords like iPhone, Samsung, Sony, or Apple Watch.
              </p>
              <div className="flex flex-wrap items-center justify-center gap-1.5 mt-4">
                {TRENDING_SEARCHES.slice(0, 4).map((item) => (
                  <button
                    key={item}
                    type="button"
                    onClick={() => setQuery(item)}
                    className="px-2.5 py-1 rounded-lg text-xs bg-gray-100 hover:bg-brand-50 hover:text-brand-600 text-gray-700 font-medium"
                  >
                    {item}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
