"use client";

import Link from "next/link";
import { Heart, ShoppingCart, Star, Smartphone } from "lucide-react";
import { formatQar, calcDiscount } from "@/lib/utils";
import { useCart } from "@/hooks/useCart";
import type { Product } from "@/types";

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  const { addToCart } = useCart();
  const primaryImage = product.images?.find((i) => i.isPrimary) || product.images?.[0];
  const discount = product.originalPriceQar
    ? calcDiscount(product.originalPriceQar, product.priceQar)
    : product.discountPercent;

  function handleAddToCart(e: React.MouseEvent) {
    e.preventDefault();
    addToCart({
      id: crypto.randomUUID(),
      productId: product.id,
      name: product.name,
      imageUrl: primaryImage?.url,
      priceQar: product.priceQar,
      quantity: 1,
      stockQty: product.stockQty,
    });
  }

  return (
    <Link
      href={`/product/${product.slug}`}
      className="product-card group block rounded-2xl sm:rounded-3xl border border-gray-200/70 hover:border-brand-300/80 bg-white shadow-2xs hover:shadow-xl transition-all duration-300 hover:-translate-y-1 overflow-hidden"
    >
      {/* Image Container */}
      <div className="relative bg-[#f7f7f9] aspect-square overflow-hidden">
        {primaryImage?.url && primaryImage.url.trim() ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={primaryImage.url}
            alt={primaryImage.altText || product.name}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-gray-100">
            <Smartphone size={56} className="text-gray-300" strokeWidth={1} />
          </div>
        )}

        {/* Badges */}
        <div className="absolute top-2.5 left-2.5 flex flex-col gap-1.5 z-10">
          {discount && discount > 0 && (
            <span className="inline-flex items-center px-2 py-0.5 rounded-md bg-brand-500 text-white text-[10px] font-black tracking-wider shadow-xs">
              -{discount}%
            </span>
          )}
          {product.isNewArrival && (
            <span className="inline-flex items-center px-2 py-0.5 rounded-md bg-emerald-600 text-white text-[10px] font-black tracking-wider shadow-xs">
              NEW
            </span>
          )}
          {product.isBestSeller && (
            <span className="inline-flex items-center px-2 py-0.5 rounded-md bg-amber-500 text-white text-[10px] font-black tracking-wider shadow-xs">
              HOT
            </span>
          )}
        </div>

        {/* Wishlist Button */}
        <button
          className="absolute top-2.5 right-2.5 w-8 h-8 rounded-full bg-white/90 backdrop-blur-xs shadow-sm flex items-center justify-center opacity-100 sm:opacity-0 sm:group-hover:opacity-100 transition-all hover:bg-white hover:scale-110 z-10 cursor-pointer"
          onClick={(e) => { e.preventDefault(); }}
          aria-label="Add to wishlist"
        >
          <Heart size={14} className="text-gray-600 hover:text-brand-500 transition-colors" />
        </button>

        {/* Quick add for Desktop hover */}
        <div className="absolute bottom-0 left-0 right-0 translate-y-full group-hover:translate-y-0 transition-transform duration-300 hidden sm:block z-10">
          <button
            onClick={handleAddToCart}
            className="w-full py-2.5 bg-brand-500 hover:bg-brand-600 text-white text-xs font-bold flex items-center justify-center gap-2 transition-colors cursor-pointer shadow-md"
          >
            <ShoppingCart size={14} />
            <span>Add to Cart</span>
          </button>
        </div>
      </div>

      {/* Info Container */}
      <div className="p-3 sm:p-4">
        {product.brand && (
          <p className="text-[10px] sm:text-[11px] text-gray-400 font-bold uppercase tracking-wider mb-1">
            {product.brand.name}
          </p>
        )}
        <h3 className="text-xs sm:text-sm font-bold text-gray-900 line-clamp-2 leading-snug mb-2 min-h-[32px] sm:min-h-[38px] group-hover:text-brand-600 transition-colors">
          {product.name}
        </h3>

        {/* Rating */}
        {product.rating && product.rating > 0 && (
          <div className="flex items-center gap-1.5 mb-2">
            <div className="flex items-center text-amber-400">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star
                  key={i}
                  size={11}
                  fill={i < Math.round(product.rating!) ? "currentColor" : "none"}
                />
              ))}
            </div>
            <span className="text-[11px] text-gray-400 font-medium">({product.reviewCount})</span>
          </div>
        )}

        {/* Price & Mobile Add to Cart */}
        <div className="flex items-center justify-between gap-1 pt-1 border-t border-gray-100/80">
          <div className="flex flex-col sm:flex-row sm:items-baseline sm:gap-2">
            <span className="text-sm sm:text-base font-extrabold text-gray-900 font-price">
              {formatQar(product.priceQar)}
            </span>
            {product.originalPriceQar && product.originalPriceQar > product.priceQar && (
              <span className="text-[11px] sm:text-xs text-gray-400 line-through font-price">
                {formatQar(product.originalPriceQar)}
              </span>
            )}
          </div>

          {/* Quick Add Button for Mobile Touch Devices */}
          <button
            onClick={handleAddToCart}
            className="sm:hidden w-8 h-8 rounded-xl bg-brand-500 hover:bg-brand-600 active:scale-95 text-white flex items-center justify-center shadow-xs shrink-0 cursor-pointer"
            aria-label="Add to cart"
          >
            <ShoppingCart size={14} />
          </button>
        </div>

        {/* Stock warning */}
        {product.stockQty <= 5 && product.stockQty > 0 && (
          <p className="text-[10px] text-amber-600 font-bold mt-1.5 flex items-center gap-1">
            <span>●</span> Only {product.stockQty} left in stock!
          </p>
        )}
        {product.stockQty === 0 && (
          <p className="text-[10px] text-red-500 font-bold mt-1.5">Out of stock</p>
        )}
      </div>
    </Link>
  );
}
