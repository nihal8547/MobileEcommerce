"use client";

import { useState } from "react";
import Link from "next/link";
import { ShoppingCart, Heart, Share2, Shield, Truck, RotateCcw, ChevronRight, Star, Check, Smartphone } from "lucide-react";
import { formatQar, calcDiscount } from "@/lib/utils";
import { WhatsAppButton } from "@/components/whatsapp/WhatsAppButton";
import { useCart } from "@/hooks/useCart";
import type { Product, ProductVariant } from "@/types";

interface ProductDetailClientProps {
  product: Product;
}

export function ProductDetailClient({ product }: ProductDetailClientProps) {
  const { addToCart } = useCart();
  const [selectedImage, setSelectedImage] = useState(0);
  const [selectedVariants, setSelectedVariants] = useState<Record<string, string>>({});
  const [qty, setQty] = useState(1);
  const [activeTab, setActiveTab] = useState<"specs" | "reviews" | "delivery">("specs");

  const discount = product.originalPriceQar
    ? calcDiscount(product.originalPriceQar, product.priceQar)
    : product.discountPercent;

  // Group variants by name
  const variantGroups = product.variants?.reduce<Record<string, ProductVariant[]>>((acc, v) => {
    if (!acc[v.name]) acc[v.name] = [];
    acc[v.name].push(v);
    return acc;
  }, {}) || {};

  function handleAddToCart() {
    const primaryImage = product.images?.[0];
    addToCart({
      id: crypto.randomUUID(),
      productId: product.id,
      name: product.name,
      imageUrl: primaryImage?.url,
      priceQar: product.priceQar,
      quantity: qty,
      variant: Object.values(selectedVariants).join(" / ") || undefined,
      stockQty: product.stockQty,
    });
  }

  const specGroups = product.specs?.reduce<Record<string, typeof product.specs>>((acc, s) => {
    const group = s.groupName || "General";
    if (!acc[group]) acc[group] = [];
    acc[group]!.push(s);
    return acc;
  }, {}) || {};

  return (
    <div className="bg-surface-secondary min-h-screen">
      {/* Breadcrumb */}
      <div className="bg-white border-b border-gray-100">
        <div className="container-main py-3">
          <nav className="flex items-center gap-1.5 text-sm text-gray-500">
            <Link href="/" className="hover:text-brand-500 transition-colors">Home</Link>
            <ChevronRight size={14} />
            {product.category && (
              <>
                <Link href={`/category/${product.category.slug}`} className="hover:text-brand-500 transition-colors">
                  {product.category.name}
                </Link>
                <ChevronRight size={14} />
              </>
            )}
            <span className="text-gray-900 font-medium truncate max-w-[200px]">{product.name}</span>
          </nav>
        </div>
      </div>

      <div className="container-main py-6">
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12">
          {/* Images */}
          <div className="flex flex-col-reverse sm:flex-row gap-3">
            {/* Thumbnails */}
            <div className="flex sm:flex-col gap-2 overflow-x-auto sm:overflow-visible pb-1 sm:pb-0">
              {product.images.map((img, i) => (
                <button
                  key={img.id}
                  onClick={() => setSelectedImage(i)}
                  className={`flex-shrink-0 w-16 h-16 rounded-xl overflow-hidden border-2 transition-all ${
                    selectedImage === i ? "border-brand-500 shadow-md" : "border-gray-200 hover:border-gray-300"
                  }`}
                >
                  {img.url && img.url.trim() ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img src={img.url} alt={img.altText || ""} className="w-full h-full object-cover" />
                  ) : (
                    <div className="w-full h-full bg-gray-100 flex items-center justify-center">
                      <Smartphone size={24} className="text-gray-300" strokeWidth={1} />
                    </div>
                  )}
                </button>
              ))}
            </div>

            {/* Main image */}
            <div className="flex-1 relative bg-white rounded-2xl overflow-hidden aspect-square">
              {product.images[selectedImage]?.url && product.images[selectedImage].url.trim() ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={product.images[selectedImage].url}
                  alt={product.images[selectedImage].altText || product.name}
                  className="w-full h-full object-contain p-6"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center bg-gray-50">
                  <Smartphone size={120} className="text-gray-200" strokeWidth={1} />
                </div>
              )}
              {discount && discount > 0 && (
                <div className="absolute top-4 left-4">
                  <span className="badge-discount text-sm px-3 py-1">-{discount}% OFF</span>
                </div>
              )}
              <button className="absolute top-4 right-4 w-10 h-10 rounded-full bg-white shadow-md flex items-center justify-center hover:bg-brand-50 transition-colors">
                <Heart size={18} className="text-gray-500" />
              </button>
            </div>
          </div>

          {/* Product info */}
          <div className="flex flex-col gap-5">
            {/* Brand & title */}
            <div>
              {product.brand && (
                <Link href={`/brand/${product.brand.slug}`} className="text-xs font-bold text-brand-500 uppercase tracking-widest hover:text-brand-600">
                  {product.brand.name}
                </Link>
              )}
              <h1 className="text-2xl sm:text-3xl font-extrabold text-gray-900 mt-1 leading-tight" style={{ fontFamily: "var(--font-syne)" }}>
                {product.name}
              </h1>

              {/* Rating */}
              <div className="flex items-center gap-3 mt-2">
                <div className="star-rating">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star key={i} size={15} fill={i < Math.round(product.rating || 0) ? "currentColor" : "none"} />
                  ))}
                </div>
                <span className="text-sm font-semibold text-gray-700">{product.rating}</span>
                <span className="text-sm text-gray-400">({product.reviewCount} reviews)</span>
              </div>
            </div>

            {/* Price */}
            <div className="flex items-baseline gap-3 pb-5 border-b border-gray-100">
              <span className="text-3xl font-extrabold text-gray-900 tabular-nums" style={{ fontFamily: "var(--font-syne)" }}>
                {formatQar(product.priceQar)}
              </span>
              {product.originalPriceQar && product.originalPriceQar > product.priceQar && (
                <>
                  <span className="text-lg text-gray-400 line-through tabular-nums">
                    {formatQar(product.originalPriceQar)}
                  </span>
                  <span className="badge-discount text-sm px-3 py-1">Save {formatQar(product.originalPriceQar - product.priceQar)}</span>
                </>
              )}
            </div>

            {/* Variants */}
            {Object.entries(variantGroups).map(([groupName, variants]) => (
              <div key={groupName}>
                <p className="text-sm font-bold text-gray-700 mb-2">
                  {groupName}: <span className="font-normal text-gray-500">{selectedVariants[groupName] || variants[0]?.value}</span>
                </p>
                <div className="flex flex-wrap gap-2">
                  {variants.map((v) => (
                    <button
                      key={v.id}
                      onClick={() => setSelectedVariants((prev) => ({ ...prev, [groupName]: v.value }))}
                      disabled={v.stockQty === 0}
                      className={`px-3 py-1.5 rounded-lg text-sm font-medium border transition-all ${
                        (selectedVariants[groupName] || variants[0]?.value) === v.value
                          ? "border-brand-500 bg-brand-50 text-brand-600"
                          : v.stockQty === 0
                          ? "border-gray-100 bg-gray-50 text-gray-300 cursor-not-allowed"
                          : "border-gray-200 hover:border-gray-300 text-gray-700"
                      }`}
                    >
                      {v.value}
                    </button>
                  ))}
                </div>
              </div>
            ))}

            {/* Quantity */}
            <div>
              <p className="text-sm font-bold text-gray-700 mb-2">Quantity</p>
              <div className="flex items-center gap-3">
                <div className="flex items-center border border-gray-200 rounded-xl overflow-hidden">
                  <button
                    onClick={() => setQty((q) => Math.max(1, q - 1))}
                    className="w-10 h-10 flex items-center justify-center hover:bg-gray-50 text-gray-600 font-bold text-lg transition-colors"
                  >
                    −
                  </button>
                  <span className="w-10 text-center font-bold text-gray-900 tabular-nums">{qty}</span>
                  <button
                    onClick={() => setQty((q) => Math.min(product.stockQty, q + 1))}
                    className="w-10 h-10 flex items-center justify-center hover:bg-gray-50 text-gray-600 font-bold text-lg transition-colors"
                  >
                    +
                  </button>
                </div>
                {product.stockQty <= 5 && product.stockQty > 0 && (
                  <span className="text-sm text-orange-500 font-medium">Only {product.stockQty} left!</span>
                )}
              </div>
            </div>

            {/* CTAs */}
            <div className="flex flex-col gap-2.5">
              <button onClick={handleAddToCart} className="btn-primary text-base py-3.5 w-full">
                <ShoppingCart size={18} />
                Add to Cart — {formatQar(product.priceQar * qty)}
              </button>
              <Link href="/checkout" onClick={handleAddToCart} className="btn-secondary text-base py-3.5 w-full text-center">
                Buy Now
              </Link>
              <WhatsAppButton
                productName={product.name}
                productUrl={`https://mobileshopqatar.com/product/${product.slug}`}
                priceQar={product.priceQar}
                enabled={product.whatsappEnabled}
              />
            </div>

            {/* Trust pills */}
            <div className="grid grid-cols-3 gap-2 pt-1">
              {[
                { icon: Shield, label: "Genuine Product", sub: "Official warranty" },
                { icon: Truck, label: "Fast Delivery", sub: "Across Qatar" },
                { icon: RotateCcw, label: "7-Day Return", sub: "Easy returns" },
              ].map(({ icon: Icon, label, sub }) => (
                <div key={label} className="flex flex-col items-center gap-1 p-2.5 bg-gray-50 rounded-xl text-center">
                  <Icon size={16} className="text-brand-500" />
                  <span className="text-xs font-bold text-gray-800 leading-tight">{label}</span>
                  <span className="text-[10px] text-gray-400">{sub}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Tabs: Specs / Reviews / Delivery */}
        <div className="mt-10 bg-white rounded-2xl overflow-hidden shadow-card">
          <div className="flex border-b border-gray-100">
            {(["specs", "reviews", "delivery"] as const).map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-6 py-4 text-sm font-bold capitalize transition-colors border-b-2 -mb-px ${
                  activeTab === tab
                    ? "border-brand-500 text-brand-600"
                    : "border-transparent text-gray-500 hover:text-gray-700"
                }`}
              >
                {tab === "specs" ? "Specifications" : tab === "reviews" ? `Reviews (${product.reviewCount})` : "Delivery & Returns"}
              </button>
            ))}
          </div>

          <div className="p-6">
            {/* Specs */}
            {activeTab === "specs" && (
              <div className="grid md:grid-cols-2 gap-6">
                {Object.entries(specGroups).map(([group, specs]) => (
                  <div key={group}>
                    <h3 className="font-bold text-gray-900 text-sm uppercase tracking-wider mb-3 pb-2 border-b border-gray-100">
                      {group}
                    </h3>
                    <div className="flex flex-col gap-0">
                      {specs?.map((spec) => (
                        <div key={spec.id} className="flex gap-3 py-2 border-b border-gray-50 last:border-0">
                          <span className="text-sm text-gray-500 w-36 flex-shrink-0">{spec.label}</span>
                          <span className="text-sm font-medium text-gray-900">{spec.value}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Reviews placeholder */}
            {activeTab === "reviews" && (
              <div className="flex flex-col items-center py-8 text-center">
                <div className="flex gap-1 mb-3">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star key={i} size={24} className="text-yellow-400" fill="currentColor" />
                  ))}
                </div>
                <p className="text-3xl font-extrabold text-gray-900 mb-1" style={{ fontFamily: "var(--font-syne)" }}>
                  {product.rating} / 5
                </p>
                <p className="text-gray-500 text-sm">{product.reviewCount} verified reviews</p>
              </div>
            )}

            {/* Delivery */}
            {activeTab === "delivery" && (
              <div className="flex flex-col gap-4 max-w-xl">
                {[
                  { icon: Truck, title: "Standard Delivery — FREE on orders QAR 200+", desc: "Delivery within 2–4 business days across Qatar. Free for orders above QAR 200, otherwise QAR 15." },
                  { icon: Truck, title: "Express Delivery — QAR 30", desc: "Same-day delivery available in Doha. Order before 2pm for same-day dispatch." },
                  { icon: RotateCcw, title: "7-Day Returns", desc: "Unused items in original packaging can be returned within 7 days. Contact us via WhatsApp." },
                  { icon: Shield, title: "Official Warranty", desc: "All products come with manufacturer warranty. Apple: 1 year. Samsung: 1 year." },
                ].map(({ icon: Icon, title, desc }) => (
                  <div key={title} className="flex gap-4 p-4 bg-gray-50 rounded-xl">
                    <div className="w-10 h-10 rounded-xl bg-brand-100 flex items-center justify-center flex-shrink-0">
                      <Icon size={18} className="text-brand-600" />
                    </div>
                    <div>
                      <p className="font-bold text-gray-900 text-sm">{title}</p>
                      <p className="text-gray-500 text-sm mt-0.5 leading-relaxed">{desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
