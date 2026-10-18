"use client";

import { useState } from "react";
import Link from "next/link";
import {
  Trash2,
  ShoppingBag,
  ArrowRight,
  Tag,
  Smartphone,
  ShieldCheck,
  Truck,
  RotateCcw,
  Sparkles,
  CheckCircle2,
  Heart,
  Plus,
  Check,
  ExternalLink,
} from "lucide-react";
import { useCart } from "@/hooks/useCart";
import { formatQar } from "@/lib/utils";
import toast from "react-hot-toast";

const STANDARD_DELIVERY = 15;
const FREE_DELIVERY_ABOVE = 200;

// Recommended add-ons
const CART_ADDONS = [
  {
    productId: "apple-magsafe-charger",
    name: "Apple MagSafe 25W Charger",
    priceQar: 189,
    imageUrl:
      "https://images.unsplash.com/photo-1622445262464-84b1456045b6?auto=format&fit=crop&w=400&q=80",
    category: "Accessories",
  },
  {
    productId: "spigen-ultra-hybrid-case",
    name: "Spigen Ultra Hybrid Armor Case",
    priceQar: 119,
    imageUrl:
      "https://images.unsplash.com/photo-1601593346740-925612772716?auto=format&fit=crop&w=400&q=80",
    category: "Protection",
  },
  {
    productId: "anker-737-powerbank",
    name: "Anker 737 140W Fast Power Bank",
    priceQar: 499,
    imageUrl:
      "https://images.unsplash.com/photo-1609592807664-88fae32231b6?auto=format&fit=crop&w=400&q=80",
    category: "Power",
  },
];

export function CartPageClient() {
  const { items, totalItems, subtotalQar, removeFromCart, updateQty, clearCart, addToCart } =
    useCart();

  const [promoInput, setPromoInput] = useState("");
  const [appliedPromo, setAppliedPromo] = useState<{
    code: string;
    discountQar: number;
    description: string;
  } | null>(null);

  // Delivery calculation
  const deliveryFee = subtotalQar >= FREE_DELIVERY_ABOVE ? 0 : STANDARD_DELIVERY;
  const promoDiscount = appliedPromo ? appliedPromo.discountQar : 0;
  const finalTotal = Math.max(0, subtotalQar + deliveryFee - promoDiscount);

  // Free delivery progress
  const freeDeliveryProgress = Math.min(
    100,
    Math.round((subtotalQar / FREE_DELIVERY_ABOVE) * 100)
  );

  const handleApplyPromo = (codeToApply?: string) => {
    const code = (codeToApply || promoInput).trim().toUpperCase();
    if (!code) return;

    if (code === "QATAR10") {
      const discount = Math.round(subtotalQar * 0.1);
      setAppliedPromo({
        code: "QATAR10",
        discountQar: discount,
        description: "10% Qatar VIP discount applied!",
      });
      setPromoInput("");
      toast.success("Coupon QATAR10 applied: 10% off!");
    } else if (code === "DOHA50") {
      if (subtotalQar < 300) {
        toast.error("Code DOHA50 requires a minimum order of QAR 300.");
        return;
      }
      setAppliedPromo({
        code: "DOHA50",
        discountQar: 50,
        description: "QAR 50 flat discount applied!",
      });
      setPromoInput("");
      toast.success("Coupon DOHA50 applied: QAR 50 off!");
    } else if (code === "WELCOME") {
      setAppliedPromo({
        code: "WELCOME",
        discountQar: 40,
        description: "Welcome voucher applied!",
      });
      setPromoInput("");
      toast.success("Welcome discount applied: QAR 40 off!");
    } else {
      toast.error("Invalid coupon code. Try 'QATAR10' or 'DOHA50'.");
    }
  };

  const handleMoveToWishlist = (item: (typeof items)[0]) => {
    try {
      const stored = localStorage.getItem("mobileshop_wishlist");
      const list = stored ? JSON.parse(stored) : [];
      if (!list.some((w: { productId: string }) => w.productId === item.productId)) {
        list.push({
          id: `w-${Date.now()}`,
          productId: item.productId,
          name: item.name,
          priceQar: item.priceQar,
          imageUrl: item.imageUrl,
          inStock: true,
        });
        localStorage.setItem("mobileshop_wishlist", JSON.stringify(list));
      }
    } catch {
      // fallback
    }
    removeFromCart(item.productId, item.variant);
    toast.success(`Moved ${item.name} to wishlist!`, { icon: "❤️" });
  };

  // WhatsApp Order Link generator
  const getWhatsAppCartUrl = () => {
    const orderLines = items
      .map((i) => `• ${i.name} (Qty: ${i.quantity}) - ${formatQar(i.priceQar * i.quantity)}`)
      .join("\n");
    const message = `Hello MobileShop Qatar, I would like to order the following items from my cart:\n\n${orderLines}\n\n*Total: ${formatQar(
      finalTotal
    )}*\n\nPlease confirm availability and delivery to Doha.`;
    return `https://wa.me/97455001234?text=${encodeURIComponent(message)}`;
  };

  if (totalItems === 0) {
    return (
      <div className="bg-surface-secondary min-h-[85vh] py-16 flex items-center justify-center">
        <div className="container-main max-w-2xl text-center">
          <div className="w-24 h-24 rounded-3xl bg-white border border-gray-100 shadow-card flex items-center justify-center mx-auto mb-6">
            <ShoppingBag size={44} className="text-gray-300" strokeWidth={1.5} />
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-gray-900 tracking-tight mb-2">
            Your shopping cart is empty
          </h1>
          <p className="text-sm text-gray-500 max-w-md mx-auto mb-8">
            Explore our curated catalog of genuine flagship smartphones, noise-cancelling audio, and fast chargers in Qatar.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-3">
            <Link
              href="/"
              className="btn-primary py-3.5 px-6 text-sm font-bold rounded-2xl flex items-center gap-2"
            >
              <ShoppingBag size={17} />
              <span>Explore Deals</span>
            </Link>
            <Link
              href="/wishlist"
              className="btn-secondary py-3.5 px-6 text-sm font-bold rounded-2xl flex items-center gap-2 bg-white"
            >
              <Heart size={17} />
              <span>View Wishlist</span>
            </Link>
          </div>

          {/* Quick Categories */}
          <div className="mt-12 pt-8 border-t border-gray-200/80">
            <p className="text-xs font-bold uppercase tracking-wider text-gray-400 mb-4">
              Popular Categories
            </p>
            <div className="flex flex-wrap justify-center gap-2">
              {[
                { name: "Flagship Smartphones", href: "/category/smartphones" },
                { name: "Tablets & iPads", href: "/category/tablets" },
                { name: "Smartwatches", href: "/category/wearables" },
                { name: "Wireless Audio", href: "/category/audio" },
                { name: "Fast Chargers & Cases", href: "/category/accessories" },
              ].map((cat) => (
                <Link
                  key={cat.name}
                  href={cat.href}
                  className="px-4 py-2 bg-white hover:bg-brand-50 border border-gray-200 hover:border-brand-300 rounded-xl text-xs font-bold text-gray-700 hover:text-brand-600 transition-colors"
                >
                  {cat.name} →
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-surface-secondary min-h-screen py-8 sm:py-12">
      <div className="container-main max-w-6xl">
        {/* Header Title */}
        <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
          <div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-gray-900 tracking-tight">
              Shopping Cart
            </h1>
            <p className="text-xs sm:text-sm text-gray-500 mt-1">
              {totalItems} {totalItems === 1 ? "item" : "items"} selected for delivery in Qatar
            </p>
          </div>

          <div className="flex items-center gap-3">
            <Link
              href="/"
              className="text-xs font-bold text-brand-600 hover:underline hidden sm:inline"
            >
              ← Continue Shopping
            </Link>
            <button
              onClick={() => {
                clearCart();
                toast.success("Cart cleared.");
              }}
              className="text-xs font-bold text-red-500 hover:text-red-700 px-3 py-1.5 rounded-lg border border-red-100 hover:bg-red-50 transition-colors cursor-pointer"
            >
              Clear Cart
            </button>
          </div>
        </div>

        {/* Free Delivery Banner Progress */}
        <div className="p-4 bg-white rounded-2xl border border-gray-100 shadow-xs mb-6">
          <div className="flex items-center justify-between text-xs font-bold mb-2">
            <span className="flex items-center gap-1.5 text-gray-800">
              <Truck size={15} className="text-brand-500" />
              {subtotalQar >= FREE_DELIVERY_ABOVE ? (
                <span className="text-emerald-600 flex items-center gap-1">
                  <CheckCircle2 size={14} /> You unlocked FREE Express Delivery anywhere in Qatar!
                </span>
              ) : (
                <span>
                  Add{" "}
                  <strong className="text-brand-600">
                    {formatQar(FREE_DELIVERY_ABOVE - subtotalQar)}
                  </strong>{" "}
                  more for FREE Express Delivery
                </span>
              )}
            </span>
            <span className="text-gray-400 font-semibold">{freeDeliveryProgress}%</span>
          </div>
          <div className="w-full bg-gray-100 h-2 rounded-full overflow-hidden">
            <div
              className={`h-full rounded-full transition-all duration-500 ${
                subtotalQar >= FREE_DELIVERY_ABOVE ? "bg-emerald-500" : "bg-brand-500"
              }`}
              style={{ width: `${freeDeliveryProgress}%` }}
            />
          </div>
        </div>

        {/* Main 2-Column Cart Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Cart Items */}
          <div className="lg:col-span-8 flex flex-col gap-4">
            {items.map((item) => {
              const itemTotal = item.priceQar * item.quantity;
              const imgUrl =
                item.imageUrl && item.imageUrl.trim()
                  ? item.imageUrl
                  : "https://images.unsplash.com/photo-1592750475338-74b7b21085ab?auto=format&fit=crop&w=400&q=80";

              return (
                <div
                  key={`${item.productId}-${item.variant || ""}`}
                  className="bg-white rounded-3xl p-5 sm:p-6 border border-gray-100 shadow-card flex flex-col sm:flex-row gap-5 items-start sm:items-center justify-between"
                >
                  <div className="flex items-center gap-4 w-full sm:w-auto">
                    <div className="w-20 h-20 sm:w-24 sm:h-24 bg-gray-50 rounded-2xl p-2 flex items-center justify-center flex-shrink-0 border border-gray-100">
                      <img
                        src={imgUrl}
                        alt={item.name}
                        className="max-h-full max-w-full object-contain"
                      />
                    </div>

                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-[10px] font-extrabold uppercase tracking-wider text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-md">
                          In Stock (Doha)
                        </span>
                      </div>
                      <h3 className="font-bold text-sm sm:text-base text-gray-900 leading-snug line-clamp-2">
                        {item.name}
                      </h3>
                      {item.variant && (
                        <p className="text-xs text-gray-500 mt-0.5">
                          Variant: <span className="font-semibold">{item.variant}</span>
                        </p>
                      )}
                      <p className="text-xs font-semibold text-gray-400 mt-1">
                        {formatQar(item.priceQar)} each
                      </p>
                    </div>
                  </div>

                  {/* Quantity Stepper & Price */}
                  <div className="flex items-center justify-between sm:justify-end gap-6 w-full sm:w-auto pt-3 sm:pt-0 border-t sm:border-t-0 border-gray-100">
                    {/* Stepper */}
                    <div className="flex items-center border border-gray-200 rounded-xl overflow-hidden bg-gray-50/50">
                      <button
                        type="button"
                        onClick={() =>
                          updateQty(item.productId, item.quantity - 1, item.variant)
                        }
                        className="w-8 h-8 flex items-center justify-center text-gray-600 hover:bg-gray-200 transition-colors font-bold cursor-pointer"
                        aria-label="Decrease quantity"
                      >
                        -
                      </button>
                      <span className="w-9 text-center text-xs sm:text-sm font-extrabold text-gray-900 tabular-nums">
                        {item.quantity}
                      </span>
                      <button
                        type="button"
                        onClick={() =>
                          updateQty(item.productId, item.quantity + 1, item.variant)
                        }
                        className="w-8 h-8 flex items-center justify-center text-gray-600 hover:bg-gray-200 transition-colors font-bold cursor-pointer"
                        aria-label="Increase quantity"
                      >
                        +
                      </button>
                    </div>

                    {/* Total & Action icons */}
                    <div className="text-right">
                      <span className="text-base sm:text-lg font-extrabold text-gray-900 tabular-nums tracking-tight">
                        {formatQar(itemTotal)}
                      </span>
                      <div className="flex items-center justify-end gap-2 mt-1">
                        <button
                          type="button"
                          onClick={() => handleMoveToWishlist(item)}
                          className="p-1.5 text-gray-400 hover:text-brand-600 hover:bg-brand-50 rounded-lg transition-colors cursor-pointer"
                          title="Save to Wishlist"
                        >
                          <Heart size={15} />
                        </button>
                        <button
                          type="button"
                          onClick={() => removeFromCart(item.productId, item.variant)}
                          className="p-1.5 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors cursor-pointer"
                          title="Remove item"
                        >
                          <Trash2 size={15} />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}

            {/* Cross-Sell Add-ons Box */}
            <div className="mt-4 p-6 bg-white rounded-3xl border border-gray-100 shadow-card">
              <div className="flex items-center gap-2 mb-4">
                <Sparkles size={16} className="text-amber-500" />
                <h3 className="font-bold text-sm text-gray-900 uppercase tracking-wider">
                  Popular Add-Ons for Your Tech
                </h3>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {CART_ADDONS.map((addon) => (
                  <div
                    key={addon.productId}
                    className="p-3.5 bg-gray-50/70 rounded-2xl border border-gray-100 flex items-center justify-between gap-3 hover:border-brand-200 transition-colors"
                  >
                    <div className="w-12 h-12 bg-white rounded-xl p-1 flex items-center justify-center flex-shrink-0 border border-gray-100">
                      <img
                        src={addon.imageUrl}
                        alt={addon.name}
                        className="max-h-full max-w-full object-contain"
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-xs font-bold text-gray-900 line-clamp-1">
                        {addon.name}
                      </p>
                      <p className="text-xs font-extrabold text-gray-900 mt-0.5">
                        {formatQar(addon.priceQar)}
                      </p>
                    </div>
                    <button
                      type="button"
                      onClick={() =>
                        addToCart({
                          id: crypto.randomUUID(),
                          productId: addon.productId,
                          name: addon.name,
                          imageUrl: addon.imageUrl,
                          priceQar: addon.priceQar,
                          quantity: 1,
                          stockQty: 20,
                        })
                      }
                      className="w-8 h-8 rounded-xl bg-brand-500 hover:bg-brand-600 text-white flex items-center justify-center flex-shrink-0 shadow-xs cursor-pointer active:scale-95 transition-all"
                      title="Add to Cart"
                    >
                      <Plus size={16} />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column: Order Summary & Checkout */}
          <div className="lg:col-span-4 flex flex-col gap-4">
            <div className="bg-white rounded-3xl shadow-card p-6 border border-gray-100 sticky top-24">
              <h2 className="font-extrabold text-lg text-gray-900 mb-4 tracking-tight">
                Order Summary
              </h2>

              {/* Promo code box */}
              <div className="mb-4">
                <div className="flex gap-2">
                  <div className="flex-1 relative">
                    <Tag
                      size={14}
                      className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400"
                    />
                    <input
                      type="text"
                      placeholder="Promo code (e.g. QATAR10)"
                      value={promoInput}
                      onChange={(e) => setPromoInput(e.target.value)}
                      className="w-full pl-9 pr-3 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-xs font-medium focus:outline-none focus:border-brand-500 uppercase placeholder:normal-case"
                    />
                  </div>
                  <button
                    type="button"
                    onClick={() => handleApplyPromo()}
                    className="px-4 py-2.5 bg-gray-900 hover:bg-black text-white text-xs font-bold rounded-xl transition-colors cursor-pointer"
                  >
                    Apply
                  </button>
                </div>

                {/* Available Quick Coupons */}
                <div className="flex flex-wrap gap-1.5 mt-2">
                  <button
                    type="button"
                    onClick={() => handleApplyPromo("QATAR10")}
                    className="text-[10px] font-bold text-brand-600 bg-brand-50 hover:bg-brand-100 px-2 py-0.5 rounded-md border border-brand-200 transition-colors"
                  >
                    🏷️ QATAR10 (10% Off)
                  </button>
                  <button
                    type="button"
                    onClick={() => handleApplyPromo("DOHA50")}
                    className="text-[10px] font-bold text-emerald-700 bg-emerald-50 hover:bg-emerald-100 px-2 py-0.5 rounded-md border border-emerald-200 transition-colors"
                  >
                    🏷️ DOHA50 (QAR 50 Off)
                  </button>
                </div>
              </div>

              {/* Price Breakdown */}
              <div className="flex flex-col gap-3 text-xs sm:text-sm pb-4 border-b border-gray-100">
                <div className="flex justify-between text-gray-600">
                  <span>Subtotal ({totalItems} items)</span>
                  <span className="font-bold text-gray-900 tabular-nums">
                    {formatQar(subtotalQar)}
                  </span>
                </div>

                {appliedPromo && (
                  <div className="flex justify-between text-emerald-600 font-bold">
                    <span>Discount ({appliedPromo.code})</span>
                    <span className="tabular-nums">-{formatQar(promoDiscount)}</span>
                  </div>
                )}

                <div className="flex justify-between text-gray-600">
                  <span>Delivery to Qatar</span>
                  <span
                    className={`font-bold tabular-nums ${
                      deliveryFee === 0 ? "text-emerald-600" : "text-gray-900"
                    }`}
                  >
                    {deliveryFee === 0 ? "FREE" : formatQar(deliveryFee)}
                  </span>
                </div>

                <div className="flex justify-between text-gray-400 text-xs">
                  <span>VAT / Customs</span>
                  <span className="font-semibold text-gray-500">Inclusive (0%)</span>
                </div>
              </div>

              {/* Final Total */}
              <div className="flex items-baseline justify-between py-4">
                <span className="text-base font-bold text-gray-900">Total</span>
                <span className="text-2xl font-extrabold text-gray-900 tabular-nums tracking-tight">
                  {formatQar(finalTotal)}
                </span>
              </div>

              {/* Primary Checkout Button */}
              <Link
                href="/checkout"
                className="btn-primary w-full py-3.5 rounded-2xl text-sm font-bold shadow-md shadow-brand-500/20 flex items-center justify-center gap-2 cursor-pointer active:scale-[0.99]"
              >
                <span>Proceed to Checkout</span>
                <ArrowRight size={17} />
              </Link>

              {/* WhatsApp Fast Order */}
              <a
                href={getWhatsAppCartUrl()}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-2.5 w-full flex items-center justify-center gap-2 py-3 px-4 rounded-2xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold shadow-sm shadow-emerald-600/20 transition-all cursor-pointer"
              >
                <span>Order via WhatsApp Direct</span>
                <ExternalLink size={13} />
              </a>

              {/* Trust Badges */}
              <div className="mt-5 pt-4 border-t border-gray-100 flex flex-col gap-2.5 text-xs text-gray-500">
                <div className="flex items-center gap-2">
                  <ShieldCheck size={15} className="text-emerald-500 flex-shrink-0" />
                  <span>100% Genuine Qatar Official Warranty</span>
                </div>
                <div className="flex items-center gap-2">
                  <Truck size={15} className="text-brand-500 flex-shrink-0" />
                  <span>Same-Day / Next-Day Delivery across Qatar</span>
                </div>
                <div className="flex items-center gap-2">
                  <RotateCcw size={15} className="text-blue-500 flex-shrink-0" />
                  <span>7-Day Hassle-Free Returns & Replacements</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
