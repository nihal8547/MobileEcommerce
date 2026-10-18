"use client";

import { useState } from "react";
import Link from "next/link";
import { Check, ChevronRight, CreditCard, Banknote, Truck, Zap, MapPin, Phone, User } from "lucide-react";
import { useCart } from "@/hooks/useCart";
import { formatQar } from "@/lib/utils";
import toast from "react-hot-toast";

type PaymentMethod = "COD" | "ONLINE";
type DeliveryType = "STANDARD" | "EXPRESS";

const DELIVERY_FEES = { STANDARD: 15, EXPRESS: 30 };
const FREE_DELIVERY_ABOVE = 200;

const QATAR_AREAS = [
  "Al Dafna", "Al Hilal", "Al Khor", "Al Mamoura", "Al Muntazah",
  "Al Rayyan", "Al Sadd", "Al Waab", "Al Wakra", "Aspire Zone",
  "Bin Mahmoud", "C-Ring Road", "D-Ring Road", "Fereej Bin Abdelaziz",
  "Industrial Area", "Lusail", "Madinat Khalifa", "Mesaieed", "Msheireb",
  "New Slata", "Old Airport", "Pearl Qatar", "Salwa Road", "West Bay",
];

export function CheckoutPageClient() {
  const { items, subtotalQar, clearCart } = useCart();
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>("COD");
  const [deliveryType, setDeliveryType] = useState<DeliveryType>("STANDARD");
  const [step, setStep] = useState<"address" | "payment" | "review">("address");
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    fullName: "", phone: "+974 ", email: "",
    line1: "", line2: "", area: "", notes: "",
  });

  const deliveryFee = subtotalQar >= FREE_DELIVERY_ABOVE && deliveryType === "STANDARD"
    ? 0
    : DELIVERY_FEES[deliveryType];
  const total = subtotalQar + deliveryFee;

  function handleInput(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) {
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }));
  }

  async function handlePlaceOrder(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    await new Promise((r) => setTimeout(r, 1500));
    toast.success("Order placed successfully! 🎉");
    clearCart();
    setLoading(false);
  }

  const StepIndicator = () => (
    <div className="flex items-center gap-0 mb-8">
      {(["address", "payment", "review"] as const).map((s, i) => {
        const done = (step === "payment" && i === 0) || (step === "review" && i <= 1);
        const active = step === s;
        return (
          <div key={s} className="flex items-center flex-1">
            <div className="flex flex-col items-center">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold transition-all ${
                done ? "bg-green-500 text-white" : active ? "bg-brand-500 text-white" : "bg-gray-200 text-gray-500"
              }`}>
                {done ? <Check size={14} /> : i + 1}
              </div>
              <span className={`text-xs mt-1 font-medium capitalize whitespace-nowrap ${active ? "text-brand-500" : "text-gray-400"}`}>{s}</span>
            </div>
            {i < 2 && (
              <div className={`flex-1 h-0.5 mx-2 mb-4 ${done ? "bg-green-400" : "bg-gray-200"}`} />
            )}
          </div>
        );
      })}
    </div>
  );

  return (
    <div className="bg-surface-secondary min-h-screen">
      <div className="container-main py-8">
        <div className="flex items-center gap-2 text-sm text-gray-500 mb-6">
          <Link href="/cart" className="hover:text-brand-500 transition-colors">Cart</Link>
          <ChevronRight size={14} />
          <span className="text-gray-900 font-medium">Checkout</span>
        </div>

        <h1 className="text-2xl font-extrabold text-gray-900 mb-6" style={{ fontFamily: "var(--font-syne)" }}>Checkout</h1>

        <StepIndicator />

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Main form */}
          <div className="lg:col-span-2">
            <form onSubmit={handlePlaceOrder}>

              {/* Step 1: Address */}
              <div className={`bg-white rounded-2xl shadow-card p-6 mb-5 ${step !== "address" && "opacity-70"}`}>
                <div className="flex items-center justify-between mb-5">
                  <h2 className="font-extrabold text-gray-900 flex items-center gap-2" style={{ fontFamily: "var(--font-syne)" }}>
                    <MapPin size={18} className="text-brand-500" />
                    Delivery Address
                  </h2>
                  {step !== "address" && (
                    <button type="button" onClick={() => setStep("address")} className="text-sm text-brand-500 font-semibold">Edit</button>
                  )}
                </div>
                {step === "address" && (
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div className="sm:col-span-2">
                      <label className="text-xs font-bold text-gray-700 uppercase tracking-wider mb-1.5 block">Full Name *</label>
                      <div className="relative">
                        <User size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                        <input name="fullName" value={form.fullName} onChange={handleInput} required
                          placeholder="Mohammed Al-Rashidi"
                          className="w-full pl-9 pr-4 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-brand-400 focus:ring-2 focus:ring-brand-100"
                        />
                      </div>
                    </div>
                    <div>
                      <label className="text-xs font-bold text-gray-700 uppercase tracking-wider mb-1.5 block">Phone *</label>
                      <div className="relative">
                        <Phone size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                        <input name="phone" value={form.phone} onChange={handleInput} required
                          placeholder="+974 6600 0000"
                          className="w-full pl-9 pr-4 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-brand-400"
                        />
                      </div>
                    </div>
                    <div>
                      <label className="text-xs font-bold text-gray-700 uppercase tracking-wider mb-1.5 block">Email</label>
                      <input name="email" value={form.email} onChange={handleInput}
                        placeholder="you@example.com" type="email"
                        className="w-full px-4 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-brand-400"
                      />
                    </div>
                    <div className="sm:col-span-2">
                      <label className="text-xs font-bold text-gray-700 uppercase tracking-wider mb-1.5 block">Street / Building *</label>
                      <input name="line1" value={form.line1} onChange={handleInput} required
                        placeholder="Building name / Street name"
                        className="w-full px-4 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-brand-400"
                      />
                    </div>
                    <div>
                      <label className="text-xs font-bold text-gray-700 uppercase tracking-wider mb-1.5 block">Flat / Floor</label>
                      <input name="line2" value={form.line2} onChange={handleInput}
                        placeholder="Flat 5B, Floor 3"
                        className="w-full px-4 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-brand-400"
                      />
                    </div>
                    <div>
                      <label className="text-xs font-bold text-gray-700 uppercase tracking-wider mb-1.5 block">Area / Zone *</label>
                      <select name="area" value={form.area} onChange={handleInput} required
                        className="w-full px-4 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-brand-400 bg-white"
                      >
                        <option value="">Select area</option>
                        {QATAR_AREAS.map((area) => (
                          <option key={area} value={area}>{area}, Doha</option>
                        ))}
                      </select>
                    </div>
                    <div className="sm:col-span-2">
                      <label className="text-xs font-bold text-gray-700 uppercase tracking-wider mb-1.5 block">Delivery Notes</label>
                      <textarea name="notes" value={form.notes} onChange={handleInput}
                        placeholder="Gate code, landmark, special instructions..."
                        rows={2}
                        className="w-full px-4 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-brand-400 resize-none"
                      />
                    </div>
                    <div className="sm:col-span-2">
                      <button
                        type="button"
                        onClick={() => { if (!form.fullName || !form.phone || !form.line1 || !form.area) { toast.error("Please fill required fields"); return; } setStep("payment"); }}
                        className="btn-primary w-full py-3"
                      >
                        Continue to Payment →
                      </button>
                    </div>
                  </div>
                )}
                {step !== "address" && (
                  <p className="text-sm text-gray-600">
                    {form.fullName} · {form.phone} · {form.area}, Doha, Qatar
                  </p>
                )}
              </div>

              {/* Step 2: Delivery + Payment */}
              {(step === "payment" || step === "review") && (
                <div className={`bg-white rounded-2xl shadow-card p-6 mb-5 ${step === "review" && "opacity-70"}`}>
                  <div className="flex items-center justify-between mb-5">
                    <h2 className="font-extrabold text-gray-900" style={{ fontFamily: "var(--font-syne)" }}>
                      Delivery & Payment
                    </h2>
                    {step === "review" && (
                      <button type="button" onClick={() => setStep("payment")} className="text-sm text-brand-500 font-semibold">Edit</button>
                    )}
                  </div>

                  {step === "payment" && (
                    <div className="flex flex-col gap-6">
                      {/* Delivery options */}
                      <div>
                        <p className="text-xs font-bold text-gray-700 uppercase tracking-wider mb-3 flex items-center gap-2">
                          <Truck size={14} className="text-brand-500" /> Delivery Option
                        </p>
                        <div className="grid sm:grid-cols-2 gap-3">
                          {(["STANDARD", "EXPRESS"] as DeliveryType[]).map((type) => {
                            const fee = type === "STANDARD" && subtotalQar >= FREE_DELIVERY_ABOVE ? 0 : DELIVERY_FEES[type];
                            return (
                              <button
                                key={type}
                                type="button"
                                onClick={() => setDeliveryType(type)}
                                className={`p-4 rounded-xl border-2 text-left transition-all ${
                                  deliveryType === type ? "border-brand-500 bg-brand-50" : "border-gray-200 hover:border-gray-300"
                                }`}
                              >
                                <div className="flex items-center gap-2 mb-1">
                                  {type === "EXPRESS" ? <Zap size={15} className="text-amber-500" /> : <Truck size={15} className="text-blue-500" />}
                                  <span className="font-bold text-gray-900 text-sm">
                                    {type === "STANDARD" ? "Standard Delivery" : "Express Delivery"}
                                  </span>
                                  {deliveryType === type && <Check size={14} className="text-brand-500 ml-auto" />}
                                </div>
                                <p className="text-xs text-gray-500">
                                  {type === "STANDARD" ? "2–4 business days" : "Same-day / Next-day"}
                                </p>
                                <p className={`text-sm font-bold mt-1 tabular-nums ${fee === 0 ? "text-green-600" : "text-gray-900"}`}>
                                  {fee === 0 ? "FREE" : formatQar(fee)}
                                </p>
                              </button>
                            );
                          })}
                        </div>
                      </div>

                      {/* Payment method */}
                      <div>
                        <p className="text-xs font-bold text-gray-700 uppercase tracking-wider mb-3 flex items-center gap-2">
                          <CreditCard size={14} className="text-brand-500" /> Payment Method
                        </p>
                        <div className="grid sm:grid-cols-2 gap-3">
                          <button
                            type="button"
                            onClick={() => setPaymentMethod("COD")}
                            className={`p-4 rounded-xl border-2 text-left transition-all ${
                              paymentMethod === "COD" ? "border-brand-500 bg-brand-50" : "border-gray-200 hover:border-gray-300"
                            }`}
                          >
                            <div className="flex items-center gap-2 mb-1">
                              <Banknote size={15} className="text-green-600" />
                              <span className="font-bold text-gray-900 text-sm">Cash on Delivery</span>
                              {paymentMethod === "COD" && <Check size={14} className="text-brand-500 ml-auto" />}
                            </div>
                            <p className="text-xs text-gray-500">Pay when your order arrives at your door</p>
                            <div className="flex gap-1 mt-2">
                              <span className="text-xs bg-green-100 text-green-700 px-2 py-0.5 rounded font-medium">COD</span>
                              <span className="text-xs bg-gray-100 text-gray-600 px-2 py-0.5 rounded font-medium">No card needed</span>
                            </div>
                          </button>

                          <button
                            type="button"
                            onClick={() => setPaymentMethod("ONLINE")}
                            className={`p-4 rounded-xl border-2 text-left transition-all ${
                              paymentMethod === "ONLINE" ? "border-brand-500 bg-brand-50" : "border-gray-200 hover:border-gray-300"
                            }`}
                          >
                            <div className="flex items-center gap-2 mb-1">
                              <CreditCard size={15} className="text-blue-600" />
                              <span className="font-bold text-gray-900 text-sm">Online Payment</span>
                              {paymentMethod === "ONLINE" && <Check size={14} className="text-brand-500 ml-auto" />}
                            </div>
                            <p className="text-xs text-gray-500">Cards, QR Codes — Secure checkout</p>
                            <div className="flex gap-1 mt-2 flex-wrap">
                              {["VISA", "MC", "AMEX", "mada"].map((c) => (
                                <span key={c} className="text-xs bg-gray-100 text-gray-700 px-1.5 py-0.5 rounded font-bold">{c}</span>
                              ))}
                            </div>
                          </button>
                        </div>
                      </div>

                      <button type="button" onClick={() => setStep("review")} className="btn-primary py-3">
                        Review Order →
                      </button>
                    </div>
                  )}

                  {step === "review" && (
                    <p className="text-sm text-gray-600">
                      {deliveryType === "STANDARD" ? "Standard Delivery" : "Express Delivery"} · {paymentMethod === "COD" ? "Cash on Delivery" : "Online Payment"}
                    </p>
                  )}
                </div>
              )}

              {/* Step 3: Place order */}
              {step === "review" && (
                <div className="bg-white rounded-2xl shadow-card p-6">
                  <h2 className="font-extrabold text-gray-900 mb-4" style={{ fontFamily: "var(--font-syne)" }}>Review & Place Order</h2>
                  <div className="flex flex-col gap-3 text-sm mb-5">
                    <div className="flex justify-between"><span className="text-gray-500">Subtotal</span><span className="font-semibold tabular-nums">{formatQar(subtotalQar)}</span></div>
                    <div className="flex justify-between"><span className="text-gray-500">Delivery ({deliveryType === "STANDARD" ? "Standard" : "Express"})</span><span className={`font-semibold ${deliveryFee === 0 ? "text-green-600" : ""} tabular-nums`}>{deliveryFee === 0 ? "FREE" : formatQar(deliveryFee)}</span></div>
                    <div className="flex justify-between text-base font-extrabold border-t border-gray-100 pt-3 mt-1">
                      <span>Total</span>
                      <span className="tabular-nums" style={{ fontFamily: "var(--font-syne)" }}>{formatQar(total)}</span>
                    </div>
                  </div>
                  <button type="submit" disabled={loading} className="btn-primary w-full py-3.5 text-base disabled:opacity-70">
                    {loading ? "Placing Order..." : `Place Order — ${formatQar(total)}`}
                  </button>
                  <p className="text-xs text-center text-gray-400 mt-3">
                    By placing this order you agree to our Terms of Service
                  </p>
                </div>
              )}
            </form>
          </div>

          {/* Order summary sidebar */}
          <div>
            <div className="bg-white rounded-2xl shadow-card p-5 sticky top-24">
              <h3 className="font-extrabold text-gray-900 mb-4 text-sm" style={{ fontFamily: "var(--font-syne)" }}>
                Order Items ({items.length})
              </h3>
              <div className="flex flex-col gap-3 max-h-64 overflow-y-auto">
                {items.map((item) => (
                  <div key={`${item.productId}-${item.variant}`} className="flex gap-3 text-sm">
                    <div className="w-12 h-12 bg-gray-50 rounded-lg flex items-center justify-center text-xl flex-shrink-0">
                      {item.imageUrl ? (
                        // eslint-disable-next-line @next/next/no-img-element
                        <img src={item.imageUrl} alt={item.name} className="w-full h-full object-cover rounded-lg" />
                      ) : "📱"}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-medium text-gray-900 line-clamp-2 text-xs leading-snug">{item.name}</p>
                      {item.variant && <p className="text-xs text-gray-400">{item.variant}</p>}
                      <p className="text-xs text-gray-500 mt-0.5">×{item.quantity}</p>
                    </div>
                    <span className="font-bold text-gray-900 tabular-nums text-xs flex-shrink-0">{formatQar(item.priceQar * item.quantity)}</span>
                  </div>
                ))}
              </div>
              <div className="border-t border-gray-100 mt-4 pt-4 flex justify-between font-extrabold text-gray-900 text-sm">
                <span>Total</span>
                <span className="tabular-nums" style={{ fontFamily: "var(--font-syne)" }}>{formatQar(total)}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
