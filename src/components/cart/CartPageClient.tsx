"use client";

import Link from "next/link";
import { Trash2, ShoppingBag, ArrowRight, Tag, Smartphone } from "lucide-react";
import { useCart } from "@/hooks/useCart";
import { formatQar } from "@/lib/utils";

const STANDARD_DELIVERY = 15;
const FREE_DELIVERY_ABOVE = 200;

export function CartPageClient() {
  const { items, totalItems, subtotalQar, removeFromCart, updateQty, clearCart } = useCart();

  const deliveryFee = subtotalQar >= FREE_DELIVERY_ABOVE ? 0 : STANDARD_DELIVERY;
  const total = subtotalQar + deliveryFee;

  if (totalItems === 0) {
    return (
      <div className="container-main py-20 flex flex-col items-center text-center gap-6">
        <div className="flex items-center justify-center w-20 h-20 rounded-full bg-gray-100 mx-auto">
          <ShoppingBag size={40} className="text-gray-300" strokeWidth={1} />
        </div>
        <div>
          <h2 className="text-2xl font-extrabold text-gray-900 mb-2" style={{ fontFamily: "var(--font-syne)" }}>
            Your cart is empty
          </h2>
          <p className="text-gray-500">Looks like you haven't added anything yet.</p>
        </div>
        <Link href="/" className="btn-primary">
          <ShoppingBag size={18} />
          Continue Shopping
        </Link>
      </div>
    );
  }

  return (
    <div className="bg-surface-secondary min-h-screen">
      <div className="container-main py-8">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-extrabold text-gray-900" style={{ fontFamily: "var(--font-syne)" }}>
            Shopping Cart
            <span className="ml-2 text-base font-semibold text-gray-400">({totalItems} items)</span>
          </h1>
          <button onClick={clearCart} className="text-sm text-red-500 hover:text-red-600 font-medium transition-colors">
            Clear Cart
          </button>
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Cart items */}
          <div className="lg:col-span-2 flex flex-col gap-3">
            {items.map((item) => (
              <div key={`${item.productId}-${item.variant}`} className="bg-white rounded-2xl p-4 shadow-card flex gap-4">
                <div className="w-20 h-20 bg-gray-50 rounded-xl flex items-center justify-center flex-shrink-0 overflow-hidden">
                  {item.imageUrl && item.imageUrl.trim() ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img src={item.imageUrl} alt={item.name} className="w-full h-full object-cover" />
                  ) : <Smartphone size={32} className="text-gray-300" strokeWidth={1} />}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-semibold text-gray-900 text-sm leading-snug line-clamp-2">{item.name}</p>
                  {item.variant && (
                    <p className="text-xs text-gray-400 mt-0.5">{item.variant}</p>
                  )}
                  <div className="flex items-center justify-between mt-3">
                    <div className="flex items-center border border-gray-200 rounded-xl overflow-hidden">
                      <button
                        onClick={() => updateQty(item.productId, item.quantity - 1, item.variant)}
                        className="w-8 h-8 flex items-center justify-center text-gray-600 hover:bg-gray-50 font-bold transition-colors"
                      >−</button>
                      <span className="w-8 text-center text-sm font-bold tabular-nums">{item.quantity}</span>
                      <button
                        onClick={() => updateQty(item.productId, item.quantity + 1, item.variant)}
                        className="w-8 h-8 flex items-center justify-center text-gray-600 hover:bg-gray-50 font-bold transition-colors"
                      >+</button>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className="font-extrabold text-gray-900 tabular-nums text-sm">
                        {formatQar(item.priceQar * item.quantity)}
                      </span>
                      <button
                        onClick={() => removeFromCart(item.productId, item.variant)}
                        className="p-1.5 text-gray-400 hover:text-red-500 transition-colors rounded-lg hover:bg-red-50"
                        aria-label="Remove"
                      >
                        <Trash2 size={15} />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Summary */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl shadow-card p-5 sticky top-24">
              <h2 className="font-extrabold text-gray-900 mb-4" style={{ fontFamily: "var(--font-syne)" }}>
                Order Summary
              </h2>

              {/* Promo code */}
              <div className="flex gap-2 mb-4">
                <div className="flex-1 relative">
                  <Tag size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Promo code"
                    className="w-full pl-8 pr-3 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-brand-400"
                  />
                </div>
                <button className="px-4 py-2.5 bg-gray-900 text-white text-sm font-bold rounded-xl hover:bg-gray-800 transition-colors">
                  Apply
                </button>
              </div>

              <div className="flex flex-col gap-3 text-sm pb-4 border-b border-gray-100">
                <div className="flex justify-between">
                  <span className="text-gray-500">Subtotal ({totalItems} items)</span>
                  <span className="font-semibold tabular-nums">{formatQar(subtotalQar)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">Delivery</span>
                  <span className={`font-semibold ${deliveryFee === 0 ? "text-green-600" : ""} tabular-nums`}>
                    {deliveryFee === 0 ? "FREE" : formatQar(deliveryFee)}
                  </span>
                </div>
                {subtotalQar < FREE_DELIVERY_ABOVE && (
                  <p className="text-xs text-brand-500 bg-brand-50 rounded-lg px-3 py-2">
                    Add {formatQar(FREE_DELIVERY_ABOVE - subtotalQar)} more for free delivery!
                  </p>
                )}
              </div>

              <div className="flex justify-between py-4 font-extrabold text-gray-900 text-base">
                <span>Total</span>
                <span className="tabular-nums" style={{ fontFamily: "var(--font-syne)" }}>{formatQar(total)}</span>
              </div>

              <Link href="/checkout" className="btn-primary w-full py-3.5">
                Proceed to Checkout
                <ArrowRight size={18} />
              </Link>

              <div className="mt-3 flex items-center justify-center gap-2 text-xs text-gray-400">
                <span>🔒 Secure checkout · COD & Online payment available</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
