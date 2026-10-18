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
    <Link href={`/product/${product.slug}`} className="product-card group block">
      {/* Image */}
      <div className="relative bg-gray-50 aspect-square overflow-hidden">
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
        <div className="absolute top-2.5 left-2.5 flex flex-col gap-1.5">
          {discount && discount > 0 && (
            <span className="badge-discount">-{discount}%</span>
          )}
          {product.isNewArrival && (
            <span className="badge-new">New</span>
          )}
          {product.isBestSeller && (
            <span className="badge-hot">Hot</span>
          )}
        </div>

        {/* Wishlist */}
        <button
          className="absolute top-2.5 right-2.5 w-8 h-8 rounded-full bg-white shadow-md flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all hover:bg-brand-50"
          onClick={(e) => { e.preventDefault(); }}
          aria-label="Add to wishlist"
        >
          <Heart size={15} className="text-gray-500 hover:text-brand-500" />
        </button>

        {/* Quick add */}
        <div className="absolute bottom-0 left-0 right-0 translate-y-full group-hover:translate-y-0 transition-transform duration-300">
          <button
            onClick={handleAddToCart}
            className="w-full py-2.5 bg-brand-500 hover:bg-brand-600 text-white text-sm font-bold flex items-center justify-center gap-2 transition-colors"
          >
            <ShoppingCart size={15} />
            Add to Cart
          </button>
        </div>
      </div>

      {/* Info */}
      <div className="p-3.5">
        {product.brand && (
          <p className="text-xs text-gray-400 font-semibold uppercase tracking-wider mb-0.5">
            {product.brand.name}
          </p>
        )}
        <h3 className="text-sm font-semibold text-gray-900 line-clamp-2 leading-snug mb-2">
          {product.name}
        </h3>

        {/* Rating */}
        {product.rating && product.rating > 0 && (
          <div className="flex items-center gap-1 mb-2">
            <div className="star-rating text-xs">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star
                  key={i}
                  size={11}
                  fill={i < Math.round(product.rating!) ? "currentColor" : "none"}
                />
              ))}
            </div>
            <span className="text-xs text-gray-400">({product.reviewCount})</span>
          </div>
        )}

        {/* Price */}
        <div className="flex items-baseline gap-2">
          <span className="text-base font-extrabold text-gray-900 text-qar">
            {formatQar(product.priceQar)}
          </span>
          {product.originalPriceQar && product.originalPriceQar > product.priceQar && (
            <span className="text-xs text-gray-400 line-through text-qar">
              {formatQar(product.originalPriceQar)}
            </span>
          )}
        </div>

        {/* Stock warning */}
        {product.stockQty <= 5 && product.stockQty > 0 && (
          <p className="text-xs text-orange-500 font-medium mt-1">
            Only {product.stockQty} left!
          </p>
        )}
        {product.stockQty === 0 && (
          <p className="text-xs text-red-500 font-medium mt-1">Out of stock</p>
        )}
      </div>
    </Link>
  );
}
