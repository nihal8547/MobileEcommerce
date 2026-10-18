"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import {
  Heart,
  ShoppingCart,
  Trash2,
  Share2,
  ArrowRight,
  ShieldCheck,
  Truck,
  Sparkles,
  CheckCircle2,
  Star,
  ExternalLink,
} from "lucide-react";
import { useCart } from "@/hooks/useCart";
import { formatQar } from "@/lib/utils";
import toast from "react-hot-toast";

interface WishlistItem {
  id: string;
  productId: string;
  name: string;
  priceQar: number;
  originalPriceQar?: number;
  imageUrl: string;
  rating?: number;
  reviewCount?: number;
  inStock: boolean;
  category?: string;
}

const DEFAULT_WISHLIST: WishlistItem[] = [
  {
    id: "w-1",
    productId: "iphone-16-pro-max",
    name: "iPhone 16 Pro Max 256GB — Desert Titanium",
    priceQar: 4799,
    originalPriceQar: 5199,
    imageUrl:
      "https://images.unsplash.com/photo-1592750475338-74b7b21085ab?auto=format&fit=crop&w=600&q=80",
    rating: 4.9,
    reviewCount: 142,
    inStock: true,
    category: "Smartphones",
  },
  {
    id: "w-2",
    productId: "sony-wh1000xm6",
    name: "Sony WH-1000XM6 Wireless Noise Cancelling Headphones",
    priceQar: 1599,
    originalPriceQar: 1899,
    imageUrl:
      "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=600&q=80",
    rating: 4.9,
    reviewCount: 204,
    inStock: true,
    category: "Audio",
  },
  {
    id: "w-3",
    productId: "apple-watch-series-10",
    name: "Apple Watch Series 10 46mm GPS — Jet Black Aluminum",
    priceQar: 1799,
    originalPriceQar: 1999,
    imageUrl:
      "https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=600&q=80",
    rating: 4.8,
    reviewCount: 92,
    inStock: true,
    category: "Wearables",
  },
  {
    id: "w-4",
    productId: "spigen-ultra-hybrid-case",
    name: "Spigen Ultra Hybrid Armor Case with MagSafe",
    priceQar: 119,
    originalPriceQar: 149,
    imageUrl:
      "https://images.unsplash.com/photo-1601593346740-925612772716?auto=format&fit=crop&w=600&q=80",
    rating: 4.8,
    reviewCount: 65,
    inStock: true,
    category: "Accessories",
  },
];

export function WishlistPageClient() {
  const { addToCart } = useCart();
  const [wishlist, setWishlist] = useState<WishlistItem[]>(DEFAULT_WISHLIST);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const stored = localStorage.getItem("mobileshop_wishlist");
      if (stored) {
        try {
          const parsed = JSON.parse(stored);
          if (Array.isArray(parsed) && parsed.length > 0) {
            setWishlist(parsed);
          }
        } catch {
          // fallback
        }
      }
    }
  }, []);

  const saveWishlist = (newList: WishlistItem[]) => {
    setWishlist(newList);
    if (typeof window !== "undefined") {
      localStorage.setItem("mobileshop_wishlist", JSON.stringify(newList));
    }
  };

  const handleRemove = (id: string) => {
    const updated = wishlist.filter((item) => item.id !== id);
    saveWishlist(updated);
    toast("Item removed from wishlist.");
  };

  const handleAddToCartSingle = (item: WishlistItem) => {
    addToCart({
      id: crypto.randomUUID(),
      productId: item.productId,
      name: item.name,
      imageUrl: item.imageUrl,
      priceQar: item.priceQar,
      quantity: 1,
      stockQty: 10,
    });
    toast.success(`Added ${item.name} to cart!`, { icon: "🛍️" });
  };

  const handleAddAllToCart = () => {
    if (wishlist.length === 0) return;
    wishlist.forEach((item) => {
      addToCart({
        id: crypto.randomUUID(),
        productId: item.productId,
        name: item.name,
        imageUrl: item.imageUrl,
        priceQar: item.priceQar,
        quantity: 1,
        stockQty: 10,
      });
    });
    toast.success(`Added all ${wishlist.length} items to your cart!`, {
      icon: "🎉",
    });
  };

  const handleShareWishlist = () => {
    const itemNames = wishlist.map((i) => `• ${i.name} (${formatQar(i.priceQar)})`).join("\n");
    const message = `Check out my tech wishlist from MobileShop Qatar:\n\n${itemNames}\n\nShop genuine gadgets with Qatar warranty: https://mobileshop.qa`;
    window.open(`https://wa.me/?text=${encodeURIComponent(message)}`, "_blank");
  };

  const handleClearAll = () => {
    saveWishlist([]);
    toast.success("Wishlist cleared.");
  };

  if (wishlist.length === 0) {
    return (
      <div className="bg-surface-secondary min-h-[85vh] py-16 flex items-center justify-center">
        <div className="container-main max-w-xl text-center">
          <div className="w-24 h-24 rounded-3xl bg-white border border-gray-100 shadow-card flex items-center justify-center mx-auto mb-6">
            <Heart size={44} className="text-gray-300" strokeWidth={1.5} />
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-gray-900 tracking-tight mb-2">
            Your Wishlist is Empty
          </h1>
          <p className="text-sm text-gray-500 max-w-md mx-auto mb-8">
            You haven&apos;t saved any products yet. Click the heart icon on any device to save it here for later.
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            <Link
              href="/"
              className="btn-primary py-3.5 px-6 text-sm font-bold rounded-2xl flex items-center gap-2"
            >
              <ShoppingCart size={17} />
              <span>Explore Tech Catalog</span>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-surface-secondary min-h-screen py-8 sm:py-12">
      <div className="container-main max-w-6xl">
        {/* Wishlist Header */}
        <div className="flex flex-wrap items-center justify-between gap-4 mb-8">
          <div>
            <div className="flex items-center gap-2">
              <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-extrabold bg-red-50 text-red-600 border border-red-200 uppercase tracking-wider">
                <Heart size={12} fill="currentColor" />
                Saved Favorites
              </span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-gray-900 tracking-tight mt-1.5">
              My Wishlist
            </h1>
            <p className="text-xs sm:text-sm text-gray-500 mt-0.5">
              {wishlist.length} saved devices with instant Qatar stock status
            </p>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-wrap items-center gap-2.5">
            <button
              type="button"
              onClick={handleShareWishlist}
              className="py-2.5 px-3.5 bg-white hover:bg-gray-50 border border-gray-200 rounded-xl text-xs font-bold text-gray-700 flex items-center gap-1.5 transition-colors cursor-pointer shadow-xs"
            >
              <Share2 size={14} className="text-emerald-600" />
              <span>Share Wishlist</span>
            </button>

            <button
              type="button"
              onClick={handleAddAllToCart}
              className="btn-primary py-2.5 px-4 rounded-xl text-xs font-bold flex items-center gap-1.5 cursor-pointer shadow-md shadow-brand-500/20"
            >
              <ShoppingCart size={14} />
              <span>Add All to Cart</span>
            </button>

            <button
              type="button"
              onClick={handleClearAll}
              className="py-2.5 px-3 rounded-xl border border-red-100 hover:bg-red-50 text-xs font-bold text-red-500 transition-colors cursor-pointer"
            >
              Clear
            </button>
          </div>
        </div>

        {/* Wishlist Products Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
          {wishlist.map((item) => {
            const hasDiscount =
              item.originalPriceQar && item.originalPriceQar > item.priceQar;
            const discountPercent = hasDiscount
              ? Math.round(
                  ((item.originalPriceQar! - item.priceQar) /
                    item.originalPriceQar!) *
                    100
                )
              : null;

            return (
              <div
                key={item.id}
                className="bg-white rounded-3xl p-5 border border-gray-100 shadow-card hover:border-gray-200 transition-all flex flex-col justify-between group relative"
              >
                <div>
                  {/* Image Container */}
                  <div className="w-full h-48 bg-gray-50 rounded-2xl p-4 flex items-center justify-center relative mb-4 overflow-hidden">
                    {discountPercent && (
                      <span className="absolute top-2.5 left-2.5 px-2 py-0.5 rounded-lg text-[10px] font-extrabold bg-red-500 text-white shadow-xs">
                        {discountPercent}% OFF
                      </span>
                    )}

                    <button
                      type="button"
                      onClick={() => handleRemove(item.id)}
                      className="absolute top-2.5 right-2.5 w-8 h-8 rounded-xl bg-white/90 hover:bg-white text-gray-400 hover:text-red-500 flex items-center justify-center shadow-xs transition-colors cursor-pointer"
                      title="Remove from Wishlist"
                    >
                      <Trash2 size={14} />
                    </button>

                    <img
                      src={item.imageUrl}
                      alt={item.name}
                      className="max-h-full max-w-full object-contain group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>

                  {/* Stock status */}
                  <div className="flex items-center gap-1.5 mb-2">
                    <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                    <span className="text-[11px] font-bold text-emerald-700">
                      In Stock (Doha Hub)
                    </span>
                  </div>

                  {/* Title & Rating */}
                  <Link
                    href={`/product/${item.productId}`}
                    className="font-bold text-sm text-gray-900 group-hover:text-brand-600 transition-colors line-clamp-2 leading-snug mb-2"
                  >
                    {item.name}
                  </Link>

                  <div className="flex items-center gap-1 mb-3 text-amber-400">
                    <Star size={13} fill="currentColor" />
                    <span className="text-xs font-bold text-gray-800">
                      {item.rating || 4.9}
                    </span>
                    <span className="text-[11px] text-gray-400">
                      ({item.reviewCount || 110})
                    </span>
                  </div>

                  {/* Price */}
                  <div className="flex items-baseline gap-2 mb-4">
                    <span className="text-lg font-extrabold text-gray-900 tabular-nums tracking-tight">
                      {formatQar(item.priceQar)}
                    </span>
                    {hasDiscount && (
                      <span className="text-xs text-gray-400 line-through tabular-nums">
                        {formatQar(item.originalPriceQar!)}
                      </span>
                    )}
                  </div>
                </div>

                {/* Bottom Actions */}
                <div className="flex flex-col gap-2 pt-2 border-t border-gray-100">
                  <button
                    type="button"
                    onClick={() => handleAddToCartSingle(item)}
                    className="btn-primary w-full py-3 text-xs font-bold rounded-xl flex items-center justify-center gap-2 cursor-pointer shadow-sm active:scale-[0.98]"
                  >
                    <ShoppingCart size={15} />
                    <span>Add to Cart</span>
                  </button>

                  <Link
                    href={`/product/${item.productId}`}
                    className="w-full py-2 text-center text-xs font-bold text-gray-600 hover:text-brand-600 hover:bg-gray-50 rounded-xl transition-colors"
                  >
                    View Details
                  </Link>
                </div>
              </div>
            );
          })}
        </div>

        {/* Benefits Strip */}
        <div className="mt-12 p-6 bg-white rounded-3xl border border-gray-100 shadow-xs grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-brand-50 text-brand-600 flex items-center justify-center flex-shrink-0">
              <Truck size={20} />
            </div>
            <div>
              <p className="text-xs font-bold text-gray-900">Same-Day Express</p>
              <p className="text-[11px] text-gray-500">Free delivery across Doha on orders over QAR 200</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center flex-shrink-0">
              <ShieldCheck size={20} />
            </div>
            <div>
              <p className="text-xs font-bold text-gray-900">Official Agency Warranty</p>
              <p className="text-[11px] text-gray-500">100% genuine Qatar service center coverage</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center flex-shrink-0">
              <Sparkles size={20} />
            </div>
            <div>
              <p className="text-xs font-bold text-gray-900">Price Match Promise</p>
              <p className="text-[11px] text-gray-500">Best guaranteed retail tech prices in Qatar</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
