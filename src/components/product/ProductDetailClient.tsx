"use client";

import { useState } from "react";
import Link from "next/link";
import {
  ShoppingCart,
  Heart,
  Share2,
  Shield,
  Truck,
  RotateCcw,
  ChevronRight,
  Star,
  Check,
  Smartphone,
  CheckCircle2,
  Clock,
  Sparkles,
  Plus,
  Zap,
  Flame,
  Headphones,
  Layers,
  MapPin,
  CreditCard,
  ShieldCheck,
  HelpCircle,
  Package,
  ArrowRight,
} from "lucide-react";
import toast from "react-hot-toast";
import { formatQar, calcDiscount } from "@/lib/utils";
import { WhatsAppButton } from "@/components/whatsapp/WhatsAppButton";
import { useCart } from "@/hooks/useCart";
import { ProductCard } from "@/components/product/ProductCard";
import type { Product, ProductVariant } from "@/types";

const QATAR_CITIES_DATA: Record<
  string,
  {
    eta: string;
    speed: string;
    cutoff: string;
    fee: string;
    highlight: string;
  }
> = {
  Doha: {
    eta: "Today, between 4:00 PM – 8:00 PM",
    speed: "Same-Day Express",
    cutoff: "Order before 2:00 PM for today",
    fee: "FREE Delivery",
    highlight: "Direct van courier dispatched from Doha Central Logistics Hub",
  },
  Lusail: {
    eta: "Today, between 4:30 PM – 8:30 PM",
    speed: "Same-Day Express",
    cutoff: "Order before 2:00 PM for today",
    fee: "FREE Delivery",
    highlight: "Priority express delivery to Lusail Marina & Fox Hills",
  },
  "The Pearl": {
    eta: "Today, between 4:00 PM – 8:00 PM",
    speed: "Same-Day Express",
    cutoff: "Order before 2:00 PM for today",
    fee: "FREE Delivery",
    highlight: "Direct delivery to Porto Arabia & Viva Bahriya towers",
  },
  "Al Rayyan": {
    eta: "Tomorrow, between 10:00 AM – 2:00 PM",
    speed: "Next-Day Priority",
    cutoff: "Dispatched in tomorrow's morning batch",
    fee: "FREE Delivery",
    highlight: "Covers Education City, Al Gharafa, and Mueither",
  },
  "Al Wakrah": {
    eta: "Tomorrow, between 11:00 AM – 3:00 PM",
    speed: "Next-Day Priority",
    cutoff: "Dispatched in tomorrow's morning batch",
    fee: "FREE Delivery",
    highlight: "Covers Al Wukair and Ezdan residential zones",
  },
  "Al Khor": {
    eta: "Within 24 – 48 Hours",
    speed: "Standard Qatar Shipping",
    cutoff: "Daily northern route courier",
    fee: "FREE Delivery",
    highlight: "Full SMS & WhatsApp live status updates with driver contact",
  },
};

interface ProductDetailClientProps {
  product: Product;
  relatedProducts?: Product[];
  similarProducts?: Product[];
  accessories?: Product[];
  trendingProducts?: Product[];
  bundle?: {
    accessories: Product[];
    bundleDiscountQar: number;
  };
}

const SAMPLE_REVIEWS = [
  {
    id: "r1",
    author: "Mohammed Al-Kuwari",
    location: "Doha, Qatar",
    rating: 5,
    date: "3 days ago",
    title: "100% Genuine, arrived within 3 hours in Doha!",
    comment:
      "Ordered in the morning and received it by afternoon. Original sealed pack with official manufacturer warranty. Excellent service from MobileShop Qatar.",
    verified: true,
  },
  {
    id: "r2",
    author: "Fatima Al-Thani",
    location: "Al Wakrah, Qatar",
    rating: 5,
    date: "1 week ago",
    title: "Best price compared to retail stores",
    comment:
      "Saved over QAR 600 compared to local mall prices. The WhatsApp order confirmation and tracking were super smooth. Highly recommended!",
    verified: true,
  },
  {
    id: "r3",
    author: "Rahul S.",
    location: "Lusail, Qatar",
    rating: 5,
    date: "2 weeks ago",
    title: "Flawless condition and great customer care",
    comment:
      "Came with Qatar power adapter and official documentation. Very happy with the purchase. Will buy all my gadgets here.",
    verified: true,
  },
];

export function ProductDetailClient({
  product,
  relatedProducts = [],
  similarProducts = [],
  accessories = [],
  trendingProducts = [],
  bundle,
}: ProductDetailClientProps) {
  const { addToCart } = useCart();
  const [selectedImage, setSelectedImage] = useState(0);
  const [selectedVariants, setSelectedVariants] = useState<Record<string, string>>({});
  const [qty, setQty] = useState(1);
  const [activeTab, setActiveTab] = useState<"specs" | "reviews" | "delivery">("specs");
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [selectedCity, setSelectedCity] = useState<string>("Doha");

  // Bundle selection state
  const bundleAccessories = bundle?.accessories || [];
  const [selectedBundleItemSlugs, setSelectedBundleItemSlugs] = useState<string[]>(() =>
    bundleAccessories.map((a) => a.slug)
  );

  const toggleBundleItem = (slug: string) => {
    setSelectedBundleItemSlugs((prev) =>
      prev.includes(slug) ? prev.filter((s) => s !== slug) : [...prev, slug]
    );
  };

  const selectedAccessories = bundleAccessories.filter((a) =>
    selectedBundleItemSlugs.includes(a.slug)
  );

  const isAllBundleSelected =
    bundleAccessories.length > 0 &&
    selectedAccessories.length === bundleAccessories.length;

  const bundleDiscount = isAllBundleSelected ? bundle?.bundleDiscountQar || 0 : 0;
  const bundleRawTotal =
    product.priceQar +
    selectedAccessories.reduce((sum, item) => sum + item.priceQar, 0);
  const bundleFinalTotal = Math.max(0, bundleRawTotal - bundleDiscount);

  function handleAddBundleToCart() {
    // 1. Add main product
    handleAddToCart();

    // 2. Add each selected accessory
    selectedAccessories.forEach((accItem) => {
      addToCart({
        id: crypto.randomUUID(),
        productId: accItem.id,
        name: accItem.name,
        imageUrl: accItem.images?.[0]?.url,
        priceQar: accItem.priceQar,
        quantity: 1,
        stockQty: accItem.stockQty,
      });
    });

    toast.success(
      `Added bundle (${1 + selectedAccessories.length} items) to your cart!`,
      { icon: "🎁" }
    );
  }

  const discount = product.originalPriceQar
    ? calcDiscount(product.originalPriceQar, product.priceQar)
    : product.discountPercent;

  // Safe fallback images
  const images =
    product.images && product.images.length > 0
      ? product.images
      : [
          {
            id: "fallback-img",
            url: "https://images.unsplash.com/photo-1592750475338-74b7b21085ab?auto=format&fit=crop&w=1000&q=80",
            altText: product.name,
            sortOrder: 0,
            isPrimary: true,
          },
        ];

  const currentImageIndex = selectedImage < images.length ? selectedImage : 0;
  const currentImage = images[currentImageIndex];

  // Group variants by name
  const variantGroups =
    product.variants?.reduce<Record<string, ProductVariant[]>>((acc, v) => {
      if (!acc[v.name]) acc[v.name] = [];
      acc[v.name].push(v);
      return acc;
    }, {}) || {};

  function handleAddToCart() {
    const selectedVariantString =
      Object.values(selectedVariants).length > 0
        ? Object.values(selectedVariants).join(" / ")
        : Object.entries(variantGroups)
            .map(([_, vs]) => vs[0]?.value)
            .filter(Boolean)
            .join(" / ") || undefined;

    addToCart({
      id: crypto.randomUUID(),
      productId: product.id,
      name: product.name,
      imageUrl: currentImage?.url,
      priceQar: product.priceQar,
      quantity: qty,
      variant: selectedVariantString,
      stockQty: product.stockQty,
    });

    toast.success(`Added ${qty} × ${product.name} to cart!`, {
      icon: "🛍️",
    });
  }

  function handleShare() {
    if (navigator.share) {
      navigator.share({
        title: product.name,
        url: window.location.href,
      }).catch(() => {});
    } else {
      navigator.clipboard.writeText(window.location.href);
      toast.success("Link copied to clipboard!");
    }
  }

  const specGroups =
    product.specs?.reduce<Record<string, typeof product.specs>>((acc, s) => {
      const group = s.groupName || "General";
      if (!acc[group]) acc[group] = [];
      acc[group]!.push(s);
      return acc;
    }, {}) || {};

  return (
    <div className="bg-white min-h-screen pb-20">
      {/* Breadcrumb Header */}
      <div className="bg-gray-50/70 border-b border-gray-100">
        <div className="container-main py-3">
          <nav className="flex items-center gap-1.5 text-xs sm:text-sm text-gray-500 overflow-x-auto whitespace-nowrap">
            <Link href="/" className="hover:text-brand-500 transition-colors">
              Home
            </Link>
            <ChevronRight size={14} className="flex-shrink-0" />
            {product.category && (
              <>
                <Link
                  href={`/category/${product.category.slug}`}
                  className="hover:text-brand-500 transition-colors"
                >
                  {product.category.name}
                </Link>
                <ChevronRight size={14} className="flex-shrink-0" />
              </>
            )}
            <span className="text-gray-900 font-semibold truncate max-w-[240px]">
              {product.name}
            </span>
          </nav>
        </div>
      </div>

      <div className="container-main py-6 sm:py-10">
        {/* Standard Open 2-Column Product Stage */}
        <div className="grid lg:grid-cols-12 gap-8 lg:gap-14 items-start">
          {/* Left Column: Image Gallery */}
          <div className="lg:col-span-6 lg:sticky lg:top-24">
            <div className="flex flex-col-reverse sm:flex-row gap-4">
            {/* Thumbnails */}
            {images.length > 1 && (
              <div className="flex sm:flex-col gap-2.5 overflow-x-auto sm:overflow-visible pb-1 sm:pb-0">
                {images.map((img, i) => {
                  const isSelected = currentImageIndex === i;
                  return (
                    <button
                      key={img.id || i}
                      onClick={() => setSelectedImage(i)}
                      className={`flex-shrink-0 w-16 h-16 sm:w-20 sm:h-20 rounded-2xl overflow-hidden border-2 transition-all p-0 bg-white ${
                        isSelected
                          ? "border-brand-500 shadow-md ring-2 ring-brand-100"
                          : "border-gray-200 hover:border-gray-300"
                      }`}
                    >
                      {img.url && img.url.trim() ? (
                        // eslint-disable-next-line @next/next/no-img-element
                        <img
                          src={img.url}
                          alt={img.altText || ""}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <div className="w-full h-full bg-gray-100 flex items-center justify-center rounded-xl">
                          <Smartphone size={24} className="text-gray-300" strokeWidth={1} />
                        </div>
                      )}
                    </button>
                  );
                })}
              </div>
            )}

            {/* Main Stage Image */}
            <div className="flex-1 relative bg-gray-50 rounded-2xl overflow-hidden aspect-square border border-gray-100 flex items-center justify-center p-0">
              {currentImage?.url && currentImage.url.trim() ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={currentImage.url}
                  alt={currentImage.altText || product.name}
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center">
                  <Smartphone size={120} className="text-gray-300" strokeWidth={1} />
                </div>
              )}

              {/* Discount Badge */}
              {discount && discount > 0 && (
                <div className="absolute top-4 left-4">
                  <span className="badge-discount text-xs font-bold px-3 py-1 shadow-sm">
                    -{discount}% OFF
                  </span>
                </div>
              )}

              {/* Actions (Wishlist & Share) */}
              <div className="absolute top-4 right-4 flex flex-col gap-2">
                <button
                  onClick={() => {
                    setIsWishlisted(!isWishlisted);
                    toast.success(isWishlisted ? "Removed from wishlist" : "Added to wishlist!");
                  }}
                  className={`w-10 h-10 rounded-full shadow-md flex items-center justify-center transition-colors ${
                    isWishlisted ? "bg-red-50 text-red-500" : "bg-white text-gray-500 hover:text-red-500"
                  }`}
                  aria-label="Wishlist"
                >
                  <Heart size={18} fill={isWishlisted ? "currentColor" : "none"} />
                </button>
                <button
                  onClick={handleShare}
                  className="w-10 h-10 rounded-full bg-white shadow-md flex items-center justify-center text-gray-500 hover:text-brand-500 transition-colors"
                  aria-label="Share"
                >
                  <Share2 size={18} />
                </button>
              </div>
            </div>
          </div>
        </div>

          {/* Right Column: Product Info & Buy Box */}
          <div className="lg:col-span-6 flex flex-col gap-5 justify-between">
            <div>
              {/* Brand & Stock Status */}
              <div className="flex items-center justify-between mb-1.5">
                {product.brand && (
                  <Link
                    href={`/category/smartphones`}
                    className="text-xs font-bold text-brand-500 uppercase tracking-wider hover:text-brand-600"
                  >
                    {product.brand.name}
                  </Link>
                )}
                <div className="flex items-center gap-1.5 text-xs font-semibold text-emerald-600 bg-emerald-50 px-2.5 py-1 rounded-full">
                  <CheckCircle2 size={13} />
                  <span>In Stock — Doha Express Dispatch</span>
                </div>
              </div>

              {/* Title */}
              <h1
                className="text-2xl sm:text-3xl font-extrabold text-gray-900 leading-tight"
                style={{ fontFamily: "var(--font-syne)" }}
              >
                {product.name}
              </h1>

              {/* Rating & Reviews */}
              <div className="flex items-center gap-3 mt-2.5">
                <div className="star-rating">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star
                      key={i}
                      size={15}
                      fill={i < Math.round(product.rating || 5) ? "currentColor" : "none"}
                    />
                  ))}
                </div>
                <span className="text-sm font-bold text-gray-800">{product.rating || 4.9}</span>
                <span className="text-sm text-gray-400 font-medium">
                  ({product.reviewCount || 120} verified reviews)
                </span>
                <span className="text-gray-300">•</span>
                <span className="text-xs text-gray-500 font-medium">SKU: {product.sku}</span>
              </div>

              {/* Pricing Section */}
              <div className="flex items-baseline gap-3 my-5 py-4 border-y border-gray-100">
                <span className="text-3xl sm:text-4xl font-extrabold text-gray-900 tracking-tight font-sans tabular-nums">
                  {formatQar(product.priceQar)}
                </span>
                {product.originalPriceQar && product.originalPriceQar > product.priceQar && (
                  <>
                    <span className="text-lg sm:text-xl text-gray-400 line-through font-sans tabular-nums">
                      {formatQar(product.originalPriceQar)}
                    </span>
                    <span className="badge-discount text-xs font-bold px-2.5 py-1">
                      Save {formatQar(product.originalPriceQar - product.priceQar)}
                    </span>
                  </>
                )}
              </div>

              {/* Description */}
              {product.description && (
                <p className="text-gray-600 text-sm leading-relaxed mb-5">
                  {product.description}
                </p>
              )}

              {/* Variants Selector */}
              {Object.entries(variantGroups).map(([groupName, variants]) => (
                <div key={groupName} className="mb-4">
                  <p className="text-xs font-bold text-gray-700 uppercase tracking-wider mb-2">
                    {groupName}:{" "}
                    <span className="font-semibold text-brand-600">
                      {selectedVariants[groupName] || variants[0]?.value}
                    </span>
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {variants.map((v) => {
                      const isSelected =
                        (selectedVariants[groupName] || variants[0]?.value) === v.value;
                      return (
                        <button
                          key={v.id}
                          onClick={() =>
                            setSelectedVariants((prev) => ({
                              ...prev,
                              [groupName]: v.value,
                            }))
                          }
                          disabled={v.stockQty === 0}
                          className={`px-3.5 py-2 rounded-xl text-xs sm:text-sm font-semibold border transition-all ${
                            isSelected
                              ? "border-brand-500 bg-brand-50 text-brand-600 shadow-sm"
                              : v.stockQty === 0
                              ? "border-gray-100 bg-gray-50 text-gray-300 cursor-not-allowed"
                              : "border-gray-200 hover:border-gray-300 text-gray-700 bg-white"
                          }`}
                        >
                          {v.value}
                        </button>
                      );
                    })}
                  </div>
                </div>
              ))}

              {/* Quantity Selector */}
              <div className="mb-6">
                <p className="text-xs font-bold text-gray-700 uppercase tracking-wider mb-2">
                  Quantity
                </p>
                <div className="flex items-center gap-4">
                  <div className="flex items-center border border-gray-200 rounded-xl overflow-hidden bg-white shadow-sm">
                    <button
                      onClick={() => setQty((q) => Math.max(1, q - 1))}
                      className="w-10 h-10 flex items-center justify-center hover:bg-gray-50 text-gray-600 font-bold text-lg transition-colors"
                      aria-label="Decrease quantity"
                    >
                      −
                    </button>
                    <span className="w-12 text-center font-bold text-gray-900 tabular-nums">
                      {qty}
                    </span>
                    <button
                      onClick={() => setQty((q) => Math.min(product.stockQty, q + 1))}
                      className="w-10 h-10 flex items-center justify-center hover:bg-gray-50 text-gray-600 font-bold text-lg transition-colors"
                      aria-label="Increase quantity"
                    >
                      +
                    </button>
                  </div>
                  {product.stockQty <= 5 && product.stockQty > 0 && (
                    <span className="text-xs text-orange-500 font-bold flex items-center gap-1">
                      <Clock size={14} /> Only {product.stockQty} left in stock!
                    </span>
                  )}
                </div>
              </div>
            </div>

            {/* CTAs */}
            <div className="flex flex-col gap-4">
              {/* 3 Action Buttons on the same line */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
              <button
                onClick={handleAddToCart}
                className="btn-primary py-3.5 px-3 text-sm font-bold w-full rounded-xl shadow-md shadow-brand-500/20 flex items-center justify-center gap-2"
              >
                <ShoppingCart size={17} className="flex-shrink-0" />
                <span className="truncate">Add to Cart</span>
              </button>

              <Link
                href="/checkout"
                onClick={handleAddToCart}
                className="btn-secondary py-3.5 px-3 text-sm font-bold w-full rounded-xl text-center hover:bg-gray-50 border-gray-200 flex items-center justify-center gap-2"
              >
                <span className="truncate">Buy Now</span>
              </Link>

              <WhatsAppButton
                productName={product.name}
                productUrl={typeof window !== "undefined" ? window.location.href : ""}
                priceQar={product.priceQar}
                enabled={product.whatsappEnabled}
                label="WhatsApp"
                className="w-full py-3.5 px-3 text-sm font-bold rounded-xl"
              />
            </div>

              {/* Delivery ETA Quick Pill */}
              <div
                onClick={() => {
                  setActiveTab("delivery");
                  document
                    .getElementById("product-tabs")
                    ?.scrollIntoView({ behavior: "smooth" });
                }}
                className="p-3.5 bg-gradient-to-r from-emerald-50/70 via-white to-brand-50/40 border border-emerald-200/80 rounded-2xl flex items-center justify-between cursor-pointer hover:border-emerald-300 transition-all shadow-xs group select-none"
              >
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-xl bg-emerald-500 text-white flex items-center justify-center flex-shrink-0 shadow-sm shadow-emerald-500/20">
                    <Truck size={18} />
                  </div>
                  <div>
                    <div className="flex items-center gap-1.5 flex-wrap">
                      <span className="text-xs font-bold text-gray-900">
                        Delivery to Doha & Lusail:
                      </span>
                      <span className="text-[11px] font-extrabold text-emerald-700 bg-emerald-100/90 px-2 py-0.5 rounded-full">
                        {product.priceQar >= 200 ? "FREE" : "QAR 15"}
                      </span>
                    </div>
                    <p className="text-[11px] text-gray-600 mt-0.5 flex items-center gap-1">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
                      Order before 2 PM for Same-Day · 7-Day Free Returns
                    </p>
                  </div>
                </div>
                <span className="text-xs font-bold text-brand-600 group-hover:translate-x-0.5 transition-transform flex-shrink-0 hidden sm:inline">
                  Details →
                </span>
              </div>

              {/* Trust Badges */}
              <div className="grid grid-cols-3 gap-2.5 pt-1">
                {[
                  {
                    icon: Shield,
                    label: "100% Genuine",
                    sub: "Official Qatar Warranty",
                  },
                  {
                    icon: Truck,
                    label: "Free Delivery",
                    sub: "Across Qatar over QAR 200",
                  },
                  {
                    icon: RotateCcw,
                    label: "7-Day Return",
                    sub: "Easy hassle-free returns",
                  },
                ].map(({ icon: Icon, label, sub }) => (
                  <div
                    key={label}
                    className="flex flex-col items-center gap-1 p-3 bg-gray-50/80 border border-gray-100 rounded-2xl text-center"
                  >
                    <Icon size={18} className="text-brand-500" />
                    <span className="text-xs font-bold text-gray-800 leading-tight">
                      {label}
                    </span>
                    <span className="text-[10px] text-gray-400 font-medium">{sub}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Detailed Tabs: Specifications, Reviews, Delivery */}
        <div
          id="product-tabs"
          className="mt-16 pt-10 border-t border-gray-200"
        >
          <div className="flex border-b border-gray-200 gap-2 overflow-x-auto">
            {(["specs", "reviews", "delivery"] as const).map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-6 py-3.5 text-sm font-bold capitalize transition-all border-b-2 -mb-px whitespace-nowrap cursor-pointer ${
                  activeTab === tab
                    ? "border-brand-500 text-brand-600"
                    : "border-transparent text-gray-500 hover:text-gray-900"
                }`}
              >
                {tab === "specs"
                  ? "Specifications"
                  : tab === "reviews"
                  ? `Customer Reviews (${product.reviewCount || 120})`
                  : "Delivery & Returns"}
              </button>
            ))}
          </div>

          <div className="py-8">
            {/* Specs Tab */}
            {activeTab === "specs" && (
              <div className="grid md:grid-cols-2 gap-8">
                {Object.entries(specGroups).map(([group, specs]) => (
                  <div key={group} className="bg-gray-50/60 p-5 rounded-2xl border border-gray-100">
                    <h3 className="font-bold text-gray-900 text-sm uppercase tracking-wider mb-3 pb-2 border-b border-gray-200/80">
                      {group}
                    </h3>
                    <div className="flex flex-col divide-y divide-gray-100">
                      {specs?.map((spec) => (
                        <div key={spec.id} className="flex justify-between gap-4 py-2 text-sm">
                          <span className="text-gray-500 font-medium w-40 flex-shrink-0">
                            {spec.label}
                          </span>
                          <span className="font-semibold text-gray-900 text-right">
                            {spec.value}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Customer Reviews Tab */}
            {activeTab === "reviews" && (
              <div className="space-y-6">
                <div className="flex flex-col sm:flex-row items-center gap-6 p-6 bg-gray-50/70 rounded-2xl border border-gray-100">
                  <div className="text-center sm:text-left">
                    <p
                      className="text-4xl font-extrabold text-gray-900"
                      style={{ fontFamily: "var(--font-syne)" }}
                    >
                      {product.rating || 4.9}
                    </p>
                    <div className="flex gap-1 justify-center sm:justify-start my-1.5 text-yellow-400">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <Star key={i} size={18} fill="currentColor" />
                      ))}
                    </div>
                    <p className="text-xs text-gray-500 font-medium">
                      Based on {product.reviewCount || 120} Qatar customer ratings
                    </p>
                  </div>
                </div>

                <div className="grid gap-4">
                  {SAMPLE_REVIEWS.map((review) => (
                    <div
                      key={review.id}
                      className="p-5 border border-gray-100 rounded-2xl bg-white shadow-sm flex flex-col gap-2"
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <span className="font-bold text-gray-900 text-sm">
                            {review.author}
                          </span>
                          {review.verified && (
                            <span className="text-[11px] font-semibold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full flex items-center gap-1">
                              <Check size={11} /> Verified Buyer
                            </span>
                          )}
                        </div>
                        <span className="text-xs text-gray-400">{review.date}</span>
                      </div>
                      <div className="flex gap-1 text-yellow-400">
                        {Array.from({ length: review.rating }).map((_, i) => (
                          <Star key={i} size={13} fill="currentColor" />
                        ))}
                      </div>
                      <p className="text-sm font-bold text-gray-800">{review.title}</p>
                      <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">
                        {review.comment}
                      </p>
                      <span className="text-[11px] text-gray-400 font-medium">
                        📍 {review.location}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Delivery & Returns Tab */}
            {activeTab === "delivery" && (
              <div className="space-y-8">
                {/* Qatar Municipality Estimator */}
                <div className="p-6 bg-gradient-to-br from-brand-50/70 via-white to-emerald-50/40 rounded-3xl border border-gray-200/80 shadow-xs">
                  <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 rounded-lg bg-brand-500 text-white flex items-center justify-center">
                        <MapPin size={17} />
                      </div>
                      <div>
                        <h3 className="font-bold text-gray-900 text-base">
                          Qatar Delivery Estimator
                        </h3>
                        <p className="text-xs text-gray-500">
                          Select your area to check live delivery speed & fees
                        </p>
                      </div>
                    </div>
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200">
                      <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                      Doha Central Hub Active
                    </span>
                  </div>

                  {/* City Selector Pills */}
                  <div className="flex flex-wrap gap-2 mb-5">
                    {Object.keys(QATAR_CITIES_DATA).map((city) => (
                      <button
                        key={city}
                        type="button"
                        onClick={() => setSelectedCity(city)}
                        className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer select-none ${
                          selectedCity === city
                            ? "bg-brand-500 text-white shadow-md shadow-brand-500/20"
                            : "bg-white text-gray-700 border border-gray-200 hover:border-brand-300 hover:bg-brand-50/30"
                        }`}
                      >
                        {city}
                      </button>
                    ))}
                  </div>

                  {/* Selected City Result Card */}
                  {QATAR_CITIES_DATA[selectedCity] && (
                    <div className="p-4 sm:p-5 bg-white rounded-2xl border border-gray-100 shadow-xs flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                      <div>
                        <div className="flex items-center gap-2 flex-wrap mb-1">
                          <span className="text-sm sm:text-base font-extrabold text-gray-900">
                            {QATAR_CITIES_DATA[selectedCity].eta}
                          </span>
                          <span className="px-2.5 py-0.5 rounded-md text-[11px] font-bold bg-emerald-100 text-emerald-800 uppercase tracking-wider">
                            {QATAR_CITIES_DATA[selectedCity].speed}
                          </span>
                        </div>
                        <p className="text-xs text-gray-600">
                          {QATAR_CITIES_DATA[selectedCity].highlight}
                        </p>
                        <p className="text-[11px] text-gray-400 mt-1">
                          ⚡ {QATAR_CITIES_DATA[selectedCity].cutoff}
                        </p>
                      </div>

                      <div className="sm:text-right flex sm:flex-col items-center sm:items-end justify-between w-full sm:w-auto pt-3 sm:pt-0 border-t sm:border-t-0 border-gray-100">
                        <span className="text-xs text-gray-400 font-medium">Shipping Cost</span>
                        <span className="text-sm font-extrabold text-emerald-600">
                          {product.priceQar >= 200 ? "FREE" : "QAR 15 Flat Rate"}
                        </span>
                      </div>
                    </div>
                  )}
                </div>

                {/* 3 Core Delivery Highlights */}
                <div>
                  <h4 className="text-sm font-bold text-gray-900 uppercase tracking-wider mb-4">
                    Delivery Options & Services
                  </h4>
                  <div className="grid md:grid-cols-3 gap-4">
                    <div className="p-5 bg-gray-50/70 border border-gray-100 rounded-2xl flex flex-col justify-between">
                      <div>
                        <div className="w-10 h-10 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center mb-3">
                          <Zap size={20} />
                        </div>
                        <h5 className="font-bold text-gray-900 text-sm mb-1">
                          Same-Day Express
                        </h5>
                        <p className="text-xs text-gray-500 leading-relaxed mb-3">
                          Orders confirmed before 2:00 PM are delivered the same afternoon or evening in Doha, Lusail, and The Pearl.
                        </p>
                      </div>
                      <span className="text-[11px] font-semibold text-amber-700 bg-amber-50/80 px-2 py-1 rounded-md inline-block w-fit">
                        Within 3–4 Hours
                      </span>
                    </div>

                    <div className="p-5 bg-gray-50/70 border border-gray-100 rounded-2xl flex flex-col justify-between">
                      <div>
                        <div className="w-10 h-10 rounded-xl bg-brand-50 text-brand-600 flex items-center justify-center mb-3">
                          <Truck size={20} />
                        </div>
                        <h5 className="font-bold text-gray-900 text-sm mb-1">
                          All-Qatar Free Shipping
                        </h5>
                        <p className="text-xs text-gray-500 leading-relaxed mb-3">
                          100% Free delivery across all Qatar municipalities on orders above QAR 200. Packed in shockproof protection.
                        </p>
                      </div>
                      <span className="text-[11px] font-semibold text-brand-700 bg-brand-50/80 px-2 py-1 rounded-md inline-block w-fit">
                        Free over QAR 200
                      </span>
                    </div>

                    <div className="p-5 bg-gray-50/70 border border-gray-100 rounded-2xl flex flex-col justify-between">
                      <div>
                        <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center mb-3">
                          <CreditCard size={20} />
                        </div>
                        <h5 className="font-bold text-gray-900 text-sm mb-1">
                          Pay at Your Doorstep
                        </h5>
                        <p className="text-xs text-gray-500 leading-relaxed mb-3">
                          Inspect your factory-sealed device upon arrival, then pay easily with cash or wireless POS card machine.
                        </p>
                      </div>
                      <span className="text-[11px] font-semibold text-emerald-700 bg-emerald-50/80 px-2 py-1 rounded-md inline-block w-fit">
                        Cash or Card on Delivery
                      </span>
                    </div>
                  </div>
                </div>

                {/* 7-Day Return Policy & Process */}
                <div className="p-6 bg-gray-50/60 rounded-3xl border border-gray-100">
                  <div className="flex flex-wrap items-center justify-between gap-3 mb-6">
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-md text-[11px] font-bold bg-blue-50 text-blue-700 uppercase tracking-wider">
                          <RotateCcw size={12} />
                          Peace of Mind
                        </span>
                      </div>
                      <h4 className="text-lg font-bold text-gray-900 mt-1">
                        7-Day Hassle-Free Returns & Exchange
                      </h4>
                      <p className="text-xs sm:text-sm text-gray-500 mt-0.5">
                        Changed your mind? Return unopened items within 7 days for a full refund or instant replacement
                      </p>
                    </div>
                  </div>

                  {/* 3 Step Return Steps */}
                  <div className="grid md:grid-cols-3 gap-4 mb-6">
                    <div className="p-4 bg-white rounded-2xl border border-gray-100 shadow-xs relative">
                      <span className="w-6 h-6 rounded-full bg-brand-500 text-white text-xs font-bold flex items-center justify-center mb-2.5">
                        1
                      </span>
                      <h5 className="font-bold text-gray-900 text-xs sm:text-sm mb-1">
                        Request via WhatsApp
                      </h5>
                      <p className="text-xs text-gray-500 leading-relaxed">
                        Send a message with your order number. Our Doha customer care team approves it in minutes.
                      </p>
                    </div>

                    <div className="p-4 bg-white rounded-2xl border border-gray-100 shadow-xs relative">
                      <span className="w-6 h-6 rounded-full bg-brand-500 text-white text-xs font-bold flex items-center justify-center mb-2.5">
                        2
                      </span>
                      <h5 className="font-bold text-gray-900 text-xs sm:text-sm mb-1">
                        Free Doorstep Courier Pickup
                      </h5>
                      <p className="text-xs text-gray-500 leading-relaxed">
                        Our driver collects the package directly from your home or office anywhere in Qatar at no charge.
                      </p>
                    </div>

                    <div className="p-4 bg-white rounded-2xl border border-gray-100 shadow-xs relative">
                      <span className="w-6 h-6 rounded-full bg-emerald-500 text-white text-xs font-bold flex items-center justify-center mb-2.5">
                        3
                      </span>
                      <h5 className="font-bold text-gray-900 text-xs sm:text-sm mb-1">
                        Instant Refund / Replacement
                      </h5>
                      <p className="text-xs text-gray-500 leading-relaxed">
                        Get an immediate product swap or 100% money back to your bank account or original payment card.
                      </p>
                    </div>
                  </div>

                  {/* Conditions Checklist */}
                  <div className="pt-4 border-t border-gray-200/80 grid sm:grid-cols-2 gap-3">
                    {[
                      "Unopened items with original intact factory seals eligible for 100% full refund.",
                      "Any defect or transit damage reported within 48h replaced immediately with a brand new unit.",
                      "All included box accessories, warranty booklets, and purchase receipts must be intact.",
                      "Zero return pickup fees or hidden restocking charges across Qatar.",
                    ].map((cond, idx) => (
                      <div key={idx} className="flex items-start gap-2.5 text-xs text-gray-600">
                        <CheckCircle2 size={16} className="text-emerald-500 flex-shrink-0 mt-0.5" />
                        <span>{cond}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Official Agency Warranty */}
                <div className="p-5 bg-gradient-to-r from-blue-50/60 to-white rounded-2xl border border-blue-100 flex items-start gap-4">
                  <div className="w-10 h-10 rounded-xl bg-blue-500 text-white flex items-center justify-center flex-shrink-0 shadow-sm shadow-blue-500/20">
                    <ShieldCheck size={22} />
                  </div>
                  <div>
                    <h5 className="font-bold text-gray-900 text-sm mb-1">
                      100% Genuine Qatar Agency Warranty
                    </h5>
                    <p className="text-xs text-gray-600 leading-relaxed">
                      All products sold by MobileShop Qatar are genuine regional (GCC/Global) models backed by official manufacturer authorized service centers in Qatar (e.g. Apple Qatar, Fifty One East Sony, Samsung Gulf Care, Jarir Authorized). Fully covered for manufacturer warranty repairs and genuine parts.
                    </p>
                  </div>
                </div>

                {/* Need Help Direct Support */}
                <div className="p-4 bg-gray-50 rounded-2xl border border-gray-100 flex flex-wrap items-center justify-between gap-3">
                  <div className="flex items-center gap-2.5">
                    <HelpCircle size={18} className="text-gray-400" />
                    <p className="text-xs text-gray-600">
                      Have special delivery instructions or need urgent same-day delivery?
                    </p>
                  </div>
                  <WhatsAppButton
                    productName={product.name}
                    productUrl={typeof window !== "undefined" ? window.location.href : ""}
                    priceQar={product.priceQar}
                    enabled={product.whatsappEnabled}
                    label="Chat with Logistics Support"
                    className="py-2 px-4 text-xs font-bold rounded-xl"
                  />
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Frequently Bought Together Bundle */}
        {bundleAccessories.length > 0 && (
          <div className="mt-14 bg-gradient-to-br from-white via-white to-amber-50/30 rounded-3xl p-6 sm:p-9 border border-amber-200/70 shadow-xl shadow-amber-500/5 relative overflow-hidden">
            {/* Subtle ambient background glow */}
            <div className="absolute top-0 right-0 w-80 h-80 bg-amber-200/20 rounded-full blur-3xl pointer-events-none -mr-20 -mt-20" />
            <div className="absolute bottom-0 left-0 w-60 h-60 bg-brand-200/10 rounded-full blur-3xl pointer-events-none -ml-20 -mb-20" />

            {/* Header with Badges */}
            <div className="relative z-10 flex flex-wrap items-center justify-between gap-4 mb-8 pb-6 border-b border-gray-100">
              <div>
                <div className="flex flex-wrap items-center gap-2 mb-2">
                  <span className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full text-xs font-black bg-gradient-to-r from-amber-500 to-brand-500 text-white shadow-xs">
                    <Sparkles size={13} className="text-yellow-200" />
                    Special Qatar Bundle Deal
                  </span>
                  {bundle?.bundleDiscountQar && (
                    <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-bold bg-emerald-50 text-emerald-700 border border-emerald-200">
                      Save QAR {bundle.bundleDiscountQar} on full set
                    </span>
                  )}
                </div>
                <h2 className="text-2xl sm:text-3xl font-extrabold text-gray-900 tracking-tight">
                  Frequently Bought Together
                </h2>
                <p className="text-xs sm:text-sm text-gray-500 mt-1 max-w-xl">
                  Pair your <strong className="text-gray-800">{product.name}</strong> with official matching gear &amp; unlock bundle discounts with same-day Doha delivery.
                </p>
              </div>

              <div className="hidden sm:flex items-center gap-2.5 px-4 py-2 bg-white/80 border border-amber-200/60 rounded-2xl shadow-2xs backdrop-blur-xs">
                <ShieldCheck size={18} className="text-emerald-600 flex-shrink-0" />
                <div className="text-left">
                  <p className="text-[11px] font-bold text-gray-900 leading-tight">100% Genuine Qatar Stock</p>
                  <p className="text-[10px] text-gray-500 leading-tight">Official brand warranty on all items</p>
                </div>
              </div>
            </div>

            {/* Visual Bundle Chain & Total Action Box */}
            <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              {/* Product Cards Row */}
              <div className="lg:col-span-8 flex flex-col sm:flex-row items-center gap-3 sm:gap-2">
                {/* Main Product Card */}
                <div className="w-full sm:flex-1 p-5 rounded-2xl border-2 border-brand-400 bg-white shadow-md shadow-brand-500/5 flex flex-col items-center text-center relative group">
                  <span className="absolute top-3 left-3 text-[10px] font-extrabold uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-brand-500 text-white shadow-xs">
                    This Item
                  </span>
                  <div className="w-28 h-28 mx-auto my-3 flex items-center justify-center p-2.5 bg-gray-50/80 rounded-2xl group-hover:scale-105 transition-transform">
                    <img
                      src={
                        currentImage?.url ||
                        "https://images.unsplash.com/photo-1592750475338-74b7b21085ab?auto=format&fit=crop&w=400&q=80"
                      }
                      alt={product.name}
                      className="max-h-full max-w-full object-contain drop-shadow-sm"
                    />
                  </div>
                  <p className="text-xs sm:text-sm font-bold text-gray-900 line-clamp-2 h-9 mb-1.5 leading-tight">
                    {product.name}
                  </p>
                  <p className="text-base font-black text-gray-900 font-price tracking-tight">
                    {formatQar(product.priceQar)}
                  </p>
                  <span className="mt-2 text-[11px] font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-md inline-flex items-center gap-1">
                    <Check size={12} strokeWidth={3} /> Main Device
                  </span>
                </div>

                {/* Accessories with connecting plus icons */}
                {bundleAccessories.map((accItem) => {
                  const isSelected = selectedBundleItemSlugs.includes(accItem.slug);
                  const accImg =
                    accItem.images?.[0]?.url ||
                    "https://images.unsplash.com/photo-1592750475338-74b7b21085ab?auto=format&fit=crop&w=400&q=80";

                  return (
                    <div
                      key={accItem.id}
                      className="w-full sm:flex-1 flex flex-col sm:flex-row items-center gap-3 sm:gap-2"
                    >
                      {/* Plus icon divider */}
                      <div className="flex items-center justify-center w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-white shadow-md border border-gray-200 text-brand-600 font-black flex-shrink-0 z-10 sm:-mx-1">
                        <Plus size={16} strokeWidth={3} />
                      </div>

                      {/* Interactive Accessory Card */}
                      <div
                        onClick={() => toggleBundleItem(accItem.slug)}
                        className={`w-full flex-1 p-5 rounded-2xl border-2 transition-all duration-200 cursor-pointer flex flex-col items-center text-center relative select-none ${
                          isSelected
                            ? "border-brand-500 bg-white shadow-md shadow-brand-500/10 ring-2 ring-brand-100"
                            : "border-2 border-dashed border-gray-300 bg-gray-50/60 opacity-60 hover:opacity-90 hover:border-gray-400"
                        }`}
                      >
                        {/* Checkbox badge */}
                        <span
                          className={`absolute top-3 left-3 w-6 h-6 rounded-lg flex items-center justify-center transition-all ${
                            isSelected
                              ? "bg-brand-500 text-white shadow-xs scale-105"
                              : "border-2 border-gray-300 bg-white text-transparent hover:border-brand-400"
                          }`}
                        >
                          <Check size={14} strokeWidth={3} />
                        </span>

                        <div className="w-28 h-28 mx-auto my-3 flex items-center justify-center p-2.5 bg-gray-50/80 rounded-2xl group-hover:scale-105 transition-transform">
                          <img
                            src={accImg}
                            alt={accItem.name}
                            className="max-h-full max-w-full object-contain drop-shadow-sm"
                          />
                        </div>

                        <p className="text-xs sm:text-sm font-bold text-gray-900 line-clamp-2 h-9 mb-1.5 leading-tight">
                          {accItem.name}
                        </p>
                        <p className="text-base font-black text-gray-900 font-price tracking-tight">
                          {formatQar(accItem.priceQar)}
                        </p>

                        <span
                          className={`mt-2 text-[11px] font-bold px-2 py-0.5 rounded-md inline-flex items-center gap-1 transition-colors ${
                            isSelected
                              ? "text-brand-600 bg-brand-50"
                              : "text-gray-400 bg-gray-100"
                          }`}
                        >
                          {isSelected ? "✓ Included" : "+ Tap to Add"}
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Action / Checkout Box */}
              <div className="lg:col-span-4 p-6 sm:p-7 rounded-3xl bg-white border border-gray-200/90 shadow-lg flex flex-col justify-between relative overflow-hidden">
                <div className="space-y-4">
                  <div className="flex items-center justify-between pb-3 border-b border-gray-100">
                    <div>
                      <p className="text-[11px] font-extrabold uppercase tracking-wider text-gray-400">
                        Bundle Total
                      </p>
                      <p className="text-sm font-bold text-gray-900">
                        {1 + selectedAccessories.length} items configured
                      </p>
                    </div>
                    {isAllBundleSelected && bundleDiscount > 0 ? (
                      <span className="text-[11px] font-bold px-2.5 py-1 rounded-full bg-emerald-500 text-white shadow-2xs animate-pulse">
                        Best Deal
                      </span>
                    ) : (
                      <span className="text-[11px] font-medium text-gray-400">
                        Custom Set
                      </span>
                    )}
                  </div>

                  {/* Price display with standard font-price */}
                  <div>
                    <div className="flex items-baseline gap-2.5 font-price">
                      <span className="text-3xl sm:text-4xl font-black text-gray-900 tracking-tight font-sans">
                        {formatQar(bundleFinalTotal)}
                      </span>
                      {bundleDiscount > 0 && (
                        <span className="text-base text-gray-400 line-through font-sans">
                          {formatQar(bundleRawTotal)}
                        </span>
                      )}
                    </div>

                    {bundleDiscount > 0 && (
                      <div className="mt-2.5 inline-flex items-center gap-1.5 px-3 py-1 rounded-xl bg-emerald-50 text-emerald-800 text-xs font-bold border border-emerald-200 shadow-2xs">
                        <Sparkles size={13} className="text-emerald-600 flex-shrink-0" />
                        <span>Instant Bundle Discount: Save QAR {bundleDiscount}</span>
                      </div>
                    )}
                  </div>

                  {/* Trust Bullets */}
                  <div className="pt-2 flex flex-col gap-1.5 text-xs text-gray-600">
                    <div className="flex items-center gap-2">
                      <Truck size={14} className="text-brand-500 flex-shrink-0" />
                      <span>Free Express Doha Delivery included</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CreditCard size={14} className="text-brand-500 flex-shrink-0" />
                      <span>Pay by Cash on Delivery or Card at door</span>
                    </div>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={handleAddBundleToCart}
                  className="mt-6 w-full flex items-center justify-center gap-2.5 py-3.5 px-5 rounded-2xl bg-gradient-to-r from-brand-500 to-brand-600 hover:from-brand-600 hover:to-brand-700 active:scale-[0.98] text-white font-extrabold text-sm shadow-lg shadow-brand-500/25 transition-all cursor-pointer"
                >
                  <ShoppingCart size={18} />
                  <span>Add {1 + selectedAccessories.length} Items to Cart</span>
                </button>
              </div>
            </div>

            {/* Checklist Selection List */}
            <div className="mt-8 pt-6 border-t border-gray-100 flex flex-col gap-3">
              <p className="text-xs font-bold uppercase tracking-wider text-gray-400 mb-1">
                Customize items in this combo:
              </p>

              {/* Main item row */}
              <div className="flex items-center gap-3 p-3 rounded-2xl bg-white border border-gray-100 shadow-2xs">
                <input
                  type="checkbox"
                  checked={true}
                  disabled
                  className="w-4 h-4 rounded text-brand-500 accent-brand-500 cursor-not-allowed"
                />
                <span className="text-xs font-bold px-2 py-0.5 rounded bg-brand-50 text-brand-700">
                  Primary
                </span>
                <span className="text-xs sm:text-sm font-semibold text-gray-900 truncate">
                  {product.name}
                </span>
                <span className="text-sm font-black text-gray-900 font-price ml-auto">
                  {formatQar(product.priceQar)}
                </span>
              </div>

              {/* Accessory rows */}
              {bundleAccessories.map((accItem) => {
                const isSelected = selectedBundleItemSlugs.includes(accItem.slug);
                return (
                  <div
                    key={accItem.id}
                    onClick={() => toggleBundleItem(accItem.slug)}
                    className={`flex items-center gap-3 p-3 rounded-2xl border transition-all cursor-pointer select-none ${
                      isSelected
                        ? "bg-white border-brand-200 shadow-2xs"
                        : "bg-gray-50/60 border-gray-100 opacity-60 hover:opacity-100"
                    }`}
                  >
                    <input
                      type="checkbox"
                      checked={isSelected}
                      onChange={() => {}}
                      className="w-4 h-4 rounded text-brand-500 accent-brand-500 cursor-pointer"
                    />
                    <span className="text-xs sm:text-sm font-semibold text-gray-800 truncate">
                      {accItem.name}
                    </span>
                    <span className="text-sm font-black text-gray-900 font-price ml-auto">
                      {formatQar(accItem.priceQar)}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* Suggestion Section 1: Similar Flagships & Alternatives */}
        {(similarProducts.length > 0 || relatedProducts.length > 0) && (
          <div className="mt-14">
            <div className="flex items-center justify-between mb-6">
              <div>
                <div className="flex items-center gap-2">
                  <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-md text-[11px] font-bold bg-blue-50 text-blue-700 uppercase tracking-wider">
                    <Smartphone size={12} />
                    Comparison
                  </span>
                </div>
                <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mt-1">
                  Similar Flagships & Alternatives
                </h2>
                <p className="text-xs sm:text-sm text-gray-500 mt-0.5">
                  Top tier flagship smartphones offering comparable features and performance
                </p>
              </div>
              <Link
                href="/category/smartphones"
                className="text-xs sm:text-sm font-semibold text-brand-500 hover:text-brand-600 transition-colors hidden sm:inline-flex items-center gap-1"
              >
                View Category <ChevronRight size={14} />
              </Link>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
              {(similarProducts.length > 0 ? similarProducts : relatedProducts).map(
                (item) => (
                  <ProductCard key={item.id} product={item} />
                )
              )}
            </div>
          </div>
        )}

        {/* Suggestion Section 2: Recommended Accessories & Protection */}
        {accessories.length > 0 && (
          <div className="mt-14">
            <div className="flex items-center justify-between mb-6">
              <div>
                <div className="flex items-center gap-2">
                  <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-md text-[11px] font-bold bg-amber-50 text-amber-700 uppercase tracking-wider">
                    <Headphones size={12} />
                    Essentials & Protection
                  </span>
                </div>
                <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mt-1">
                  Recommended Accessories for {product.brand?.name || "Your Device"}
                </h2>
                <p className="text-xs sm:text-sm text-gray-500 mt-0.5">
                  High-speed fast chargers, protective armor cases & wireless audio
                </p>
              </div>
              <Link
                href="/category/accessories"
                className="text-xs sm:text-sm font-semibold text-brand-500 hover:text-brand-600 transition-colors hidden sm:inline-flex items-center gap-1"
              >
                View Accessories <ChevronRight size={14} />
              </Link>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
              {accessories.map((item) => (
                <ProductCard key={item.id} product={item} />
              ))}
            </div>
          </div>
        )}

        {/* Suggestion Section 3: Trending Tech Across Qatar */}
        {trendingProducts.length > 0 && (
          <div className="mt-14">
            <div className="flex items-center justify-between mb-6">
              <div>
                <div className="flex items-center gap-2">
                  <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-md text-[11px] font-bold bg-red-50 text-red-700 uppercase tracking-wider">
                    <Flame size={12} />
                    Popular in Qatar
                  </span>
                </div>
                <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mt-1">
                  Trending Gadgets Across Qatar
                </h2>
                <p className="text-xs sm:text-sm text-gray-500 mt-0.5">
                  Top-rated customer favorites in Doha, Lusail and Al Wakrah this week
                </p>
              </div>
              <Link
                href="/category/smartphones"
                className="text-xs sm:text-sm font-semibold text-brand-500 hover:text-brand-600 transition-colors hidden sm:inline-flex items-center gap-1"
              >
                Explore All <ChevronRight size={14} />
              </Link>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
              {trendingProducts.map((item) => (
                <ProductCard key={item.id} product={item} />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
