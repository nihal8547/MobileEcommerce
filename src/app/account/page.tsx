"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import {
  Package,
  Heart,
  MapPin,
  Settings,
  LogOut,
  ChevronRight,
  Clock,
  CheckCircle2,
  Truck,
  ShoppingBag,
  Smartphone,
  Headphones,
  Watch,
  Phone,
  Mail,
  ShieldCheck,
  Sparkles,
  Plus,
  Edit3,
  Trash2,
  FileText,
  Check,
  Award,
  Zap,
  ExternalLink,
  ShoppingCart,
} from "lucide-react";
import { formatQar } from "@/lib/utils";
import toast from "react-hot-toast";
import { useCart } from "@/hooks/useCart";

interface OrderItem {
  name: string;
  qty: number;
  priceQar: number;
  imageUrl: string;
  category: string;
}

interface Order {
  id: string;
  date: string;
  status: "delivered" | "shipped" | "processing";
  step: number; // 1: Placed, 2: Dispatched, 3: Out for Delivery, 4: Delivered
  total: number;
  deliveryCity: string;
  paymentMethod: string;
  items: OrderItem[];
}

const MOCK_ORDERS: Order[] = [
  {
    id: "MSQ-9482-DOH",
    date: "Today, 11:30 AM",
    status: "shipped",
    step: 3,
    total: 4799,
    deliveryCity: "West Bay, Doha",
    paymentMethod: "Card on Delivery (POS)",
    items: [
      {
        name: "iPhone 16 Pro Max 256GB — Desert Titanium",
        qty: 1,
        priceQar: 4799,
        imageUrl:
          "https://images.unsplash.com/photo-1592750475338-74b7b21085ab?auto=format&fit=crop&w=400&q=80",
        category: "Smartphones",
      },
    ],
  },
  {
    id: "MSQ-8190-LUS",
    date: "Oct 14, 2026",
    status: "delivered",
    step: 4,
    total: 1299,
    deliveryCity: "Marina District, Lusail",
    paymentMethod: "Cash on Delivery",
    items: [
      {
        name: "Samsung Galaxy Buds3 Pro — Silver",
        qty: 1,
        priceQar: 799,
        imageUrl:
          "https://images.unsplash.com/photo-1590658268037-6bf12165a8df?auto=format&fit=crop&w=400&q=80",
        category: "Audio",
      },
      {
        name: "Anker 737 Power Bank 24,000mAh 140W",
        qty: 1,
        priceQar: 499,
        imageUrl:
          "https://images.unsplash.com/photo-1609592807664-88fae32231b6?auto=format&fit=crop&w=400&q=80",
        category: "Accessories",
      },
    ],
  },
  {
    id: "MSQ-7023-PRL",
    date: "Sep 29, 2026",
    status: "delivered",
    step: 4,
    total: 1799,
    deliveryCity: "Porto Arabia, The Pearl",
    paymentMethod: "Card on Delivery",
    items: [
      {
        name: "Apple Watch Series 10 46mm GPS — Jet Black",
        qty: 1,
        priceQar: 1799,
        imageUrl:
          "https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=400&q=80",
        category: "Wearables",
      },
    ],
  },
];

const INITIAL_ADDRESSES = [
  {
    id: "addr-1",
    label: "Home (Primary)",
    recipient: "Ahmed Al-Rashid",
    phone: "+974 5500 1234",
    building: "Villa 18, Street 902, Zone 66",
    city: "West Bay, Doha, Qatar",
    isDefault: true,
  },
  {
    id: "addr-2",
    label: "Office",
    recipient: "Ahmed Al-Rashid",
    phone: "+974 5500 1234",
    building: "Floor 14, Commercial Tower 3",
    city: "Lusail Marina, Qatar",
    isDefault: false,
  },
];

const INITIAL_WISHLIST = [
  {
    id: "w-1",
    productId: "sony-wh1000xm6",
    name: "Sony WH-1000XM6 Wireless Noise Cancelling Headphones",
    priceQar: 1599,
    originalPriceQar: 1899,
    imageUrl:
      "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=400&q=80",
    inStock: true,
  },
  {
    id: "w-2",
    productId: "apple-magsafe-charger",
    name: "Apple MagSafe Charger (2m) — 25W Fast Wireless",
    priceQar: 189,
    originalPriceQar: 219,
    imageUrl:
      "https://images.unsplash.com/photo-1622445262464-84b1456045b6?auto=format&fit=crop&w=400&q=80",
    inStock: true,
  },
];

type Tab = "orders" | "wishlist" | "addresses" | "settings";

interface UserProfile {
  fullName: string;
  email: string;
  phone: string;
  area: string;
  whatsappUpdates?: boolean;
}

export default function AccountPage() {
  const { addToCart } = useCart();
  const [tab, setTab] = useState<Tab>("orders");
  const [user, setUser] = useState<UserProfile>({
    fullName: "Ahmed Al-Rashid",
    email: "ahmed@example.com",
    phone: "+974 5500 1234",
    area: "West Bay, Doha",
    whatsappUpdates: true,
  });

  const [addresses, setAddresses] = useState(INITIAL_ADDRESSES);
  const [wishlist, setWishlist] = useState(INITIAL_WISHLIST);
  const [showAddAddress, setShowAddAddress] = useState(false);
  const [newAddress, setNewAddress] = useState({
    label: "Home",
    recipient: "",
    phone: "",
    building: "",
    city: "Doha (Central)",
  });

  // Settings form
  const [settingsForm, setSettingsForm] = useState({
    fullName: "",
    email: "",
    phone: "",
    area: "",
    whatsappUpdates: true,
    smsAlerts: true,
  });

  useEffect(() => {
    if (typeof window !== "undefined") {
      const stored = localStorage.getItem("mobileshop_user");
      if (stored) {
        try {
          const parsed = JSON.parse(stored);
          setUser((prev) => {
            const updated = { ...prev, ...parsed };
            setSettingsForm({
              fullName: updated.fullName,
              email: updated.email,
              phone: updated.phone,
              area: updated.area,
              whatsappUpdates: updated.whatsappUpdates !== false,
              smsAlerts: true,
            });
            return updated;
          });
        } catch {
          // fallback
        }
      } else {
        setSettingsForm({
          fullName: user.fullName,
          email: user.email,
          phone: user.phone,
          area: user.area,
          whatsappUpdates: true,
          smsAlerts: true,
        });
      }
    }
  }, []);

  const handleSignOut = () => {
    if (typeof window !== "undefined") {
      localStorage.removeItem("mobileshop_user");
    }
    toast.success("Signed out successfully!");
    window.location.href = "/login";
  };

  const handleSaveSettings = (e: React.FormEvent) => {
    e.preventDefault();
    const updated = {
      ...user,
      fullName: settingsForm.fullName,
      email: settingsForm.email,
      phone: settingsForm.phone,
      area: settingsForm.area,
      whatsappUpdates: settingsForm.whatsappUpdates,
    };
    setUser(updated);
    if (typeof window !== "undefined") {
      localStorage.setItem("mobileshop_user", JSON.stringify(updated));
    }
    toast.success("Account profile updated successfully!");
  };

  const handleAddAddressSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newAddress.building || !newAddress.recipient) {
      toast.error("Please fill in address details.");
      return;
    }
    const created = {
      id: `addr-${Date.now()}`,
      label: newAddress.label,
      recipient: newAddress.recipient,
      phone: newAddress.phone || user.phone,
      building: newAddress.building,
      city: newAddress.city,
      isDefault: addresses.length === 0,
    };
    setAddresses([...addresses, created]);
    setShowAddAddress(false);
    toast.success("New Qatar delivery address added!");
  };

  const handleDeleteAddress = (id: string) => {
    setAddresses(addresses.filter((a) => a.id !== id));
    toast.success("Address removed.");
  };

  const handleSetDefaultAddress = (id: string) => {
    setAddresses(
      addresses.map((a) => ({
        ...a,
        isDefault: a.id === id,
      }))
    );
    toast.success("Default delivery address updated.");
  };

  const handleMoveWishlistToCart = (item: (typeof INITIAL_WISHLIST)[0]) => {
    addToCart({
      id: crypto.randomUUID(),
      productId: item.productId,
      name: item.name,
      imageUrl: item.imageUrl,
      priceQar: item.priceQar,
      quantity: 1,
      stockQty: 10,
    });
    setWishlist(wishlist.filter((w) => w.id !== item.id));
    toast.success(`Moved ${item.name} to cart!`, { icon: "🛍️" });
  };

  const tabs = [
    { id: "orders" as Tab, label: "My Orders", icon: Package, badge: MOCK_ORDERS.length },
    { id: "wishlist" as Tab, label: "Wishlist", icon: Heart, badge: wishlist.length },
    { id: "addresses" as Tab, label: "Delivery Addresses", icon: MapPin },
    { id: "settings" as Tab, label: "Profile & Settings", icon: Settings },
  ];

  return (
    <main className="bg-surface-secondary min-h-screen py-8 sm:py-12">
      <div className="container-main max-w-6xl">
        {/* Top VIP Profile Hero Card */}
        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-gray-900 via-brand-950 to-gray-900 text-white p-6 sm:p-8 shadow-xl mb-8">
          {/* Subtle background glow */}
          <div className="absolute top-0 right-0 -mt-10 -mr-10 w-64 h-64 bg-brand-500/15 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute bottom-0 left-1/3 -mb-10 w-64 h-64 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />

          <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div className="flex items-center gap-4 sm:gap-5">
              <div className="w-18 h-18 sm:w-20 sm:h-20 rounded-2xl bg-brand-gradient flex items-center justify-center text-white text-3xl font-extrabold shadow-lg shadow-brand-500/30 border-2 border-white/20 flex-shrink-0">
                {user.fullName ? user.fullName[0].toUpperCase() : "A"}
              </div>

              <div>
                <div className="flex items-center gap-2 flex-wrap mb-1">
                  <h1 className="text-xl sm:text-2xl font-extrabold tracking-tight">
                    {user.fullName}
                  </h1>
                  <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-extrabold bg-amber-400 text-gray-950 uppercase tracking-wider shadow-xs">
                    <Award size={12} />
                    Qatar VIP Gold Member
                  </span>
                </div>

                <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-gray-300">
                  <span className="flex items-center gap-1.5">
                    <Mail size={13} className="text-brand-400" />
                    {user.email}
                  </span>
                  <span className="flex items-center gap-1.5">
                    <Phone size={13} className="text-brand-400" />
                    {user.phone}
                  </span>
                  <span className="flex items-center gap-1.5">
                    <MapPin size={13} className="text-brand-400" />
                    {user.area}
                  </span>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <button
                onClick={handleSignOut}
                className="flex items-center gap-2 px-4 py-2.5 bg-white/10 hover:bg-red-500/20 text-white hover:text-red-300 border border-white/15 hover:border-red-400/30 rounded-xl text-xs font-bold transition-all cursor-pointer"
              >
                <LogOut size={15} />
                <span>Sign out</span>
              </button>
            </div>
          </div>

          {/* Quick Stats Strip */}
          <div className="relative z-10 grid grid-cols-2 sm:grid-cols-4 gap-3 mt-6 pt-6 border-t border-white/10">
            <div className="p-3 bg-white/5 rounded-2xl border border-white/10 backdrop-blur-xs">
              <p className="text-[11px] text-gray-400 font-medium">Total Orders</p>
              <p className="text-lg font-extrabold text-white mt-0.5">3 Orders</p>
            </div>
            <div className="p-3 bg-white/5 rounded-2xl border border-white/10 backdrop-blur-xs">
              <p className="text-[11px] text-gray-400 font-medium">Active Delivery</p>
              <p className="text-lg font-extrabold text-emerald-400 mt-0.5 flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
                1 In Transit
              </p>
            </div>
            <div className="p-3 bg-white/5 rounded-2xl border border-white/10 backdrop-blur-xs">
              <p className="text-[11px] text-gray-400 font-medium">VIP Rewards</p>
              <p className="text-lg font-extrabold text-amber-400 mt-0.5">
                480 QAR Points
              </p>
            </div>
            <div className="p-3 bg-white/5 rounded-2xl border border-white/10 backdrop-blur-xs">
              <p className="text-[11px] text-gray-400 font-medium">Express Shipping</p>
              <p className="text-lg font-extrabold text-brand-400 mt-0.5">
                Always FREE
              </p>
            </div>
          </div>
        </div>

        {/* 2-Column Dashboard Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Navigation Sidebar */}
          <div className="lg:col-span-4 flex flex-col gap-4">
            <div className="bg-white rounded-3xl p-3 border border-gray-100 shadow-card">
              <div className="flex flex-col gap-1">
                {tabs.map(({ id, label, icon: Icon, badge }) => {
                  const isActive = tab === id;
                  return (
                    <button
                      key={id}
                      onClick={() => setTab(id)}
                      className={`w-full flex items-center justify-between p-3.5 rounded-2xl text-xs sm:text-sm font-bold transition-all cursor-pointer ${
                        isActive
                          ? "bg-brand-500 text-white shadow-md shadow-brand-500/20"
                          : "text-gray-700 hover:bg-gray-50 hover:text-gray-900"
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <Icon size={18} className={isActive ? "text-white" : "text-gray-500"} />
                        <span>{label}</span>
                      </div>
                      {typeof badge === "number" && (
                        <span
                          className={`px-2 py-0.5 rounded-full text-xs font-extrabold ${
                            isActive
                              ? "bg-white/20 text-white"
                              : "bg-gray-100 text-gray-700"
                          }`}
                        >
                          {badge}
                        </span>
                      )}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* VIP Concierge Box */}
            <div className="p-5 bg-gradient-to-br from-brand-50 via-white to-emerald-50/50 rounded-3xl border border-brand-100 shadow-xs">
              <div className="flex items-center gap-2 mb-2">
                <div className="w-8 h-8 rounded-xl bg-brand-500 text-white flex items-center justify-center shadow-xs">
                  <ShieldCheck size={18} />
                </div>
                <div>
                  <h4 className="text-xs font-extrabold text-gray-900 uppercase tracking-wider">
                    VIP Concierge Support
                  </h4>
                  <p className="text-[11px] text-gray-500">Doha Dedicated Team</p>
                </div>
              </div>
              <p className="text-xs text-gray-600 leading-relaxed mb-4">
                Have questions about your order dispatch or warranty service in Qatar?
              </p>
              <a
                href="https://wa.me/97455001234?text=Hello%20MobileShop%20Qatar%20VIP%20Support"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold shadow-md shadow-emerald-600/20 transition-all"
              >
                <span>WhatsApp VIP Support</span>
                <ExternalLink size={13} />
              </a>
            </div>
          </div>

          {/* Right Column: Tab Content */}
          <div className="lg:col-span-8">
            {/* Tab 1: Orders */}
            {tab === "orders" && (
              <div className="flex flex-col gap-6">
                <div className="flex items-center justify-between">
                  <div>
                    <h2 className="text-xl font-bold text-gray-900">My Orders</h2>
                    <p className="text-xs text-gray-500 mt-0.5">
                      Track active deliveries and review purchase receipts
                    </p>
                  </div>
                  <span className="text-xs font-bold text-brand-600 bg-brand-50 px-3 py-1 rounded-full">
                    {MOCK_ORDERS.length} Orders
                  </span>
                </div>

                <div className="flex flex-col gap-4">
                  {MOCK_ORDERS.map((order) => {
                    const isShipped = order.status === "shipped";
                    return (
                      <div
                        key={order.id}
                        className="bg-white rounded-3xl p-6 border border-gray-100 shadow-card hover:border-gray-200 transition-all"
                      >
                        {/* Order Header */}
                        <div className="flex flex-wrap items-center justify-between gap-3 pb-4 border-b border-gray-100">
                          <div>
                            <div className="flex items-center gap-2 flex-wrap">
                              <span className="font-extrabold text-sm text-gray-900">
                                {order.id}
                              </span>
                              <span
                                className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-bold ${
                                  isShipped
                                    ? "bg-blue-50 text-blue-700 border border-blue-200"
                                    : "bg-emerald-50 text-emerald-700 border border-emerald-200"
                                }`}
                              >
                                {isShipped ? (
                                  <>
                                    <Truck size={12} />
                                    Out for Delivery (Today)
                                  </>
                                ) : (
                                  <>
                                    <CheckCircle2 size={12} />
                                    Delivered
                                  </>
                                )}
                              </span>
                            </div>
                            <p className="text-xs text-gray-400 mt-1">
                              Ordered on {order.date} • {order.paymentMethod}
                            </p>
                          </div>

                          <div className="text-right">
                            <span className="text-base sm:text-lg font-extrabold text-gray-900">
                              {formatQar(order.total)}
                            </span>
                            <p className="text-[11px] text-gray-400">
                              Destination: {order.deliveryCity}
                            </p>
                          </div>
                        </div>

                        {/* Visual Progress Stepper for Active Deliveries */}
                        {isShipped && (
                          <div className="my-5 p-4 bg-brand-50/40 rounded-2xl border border-brand-100">
                            <div className="flex items-center justify-between text-[11px] font-bold text-gray-600 mb-2">
                              <span className="text-brand-600">Order Placed</span>
                              <span className="text-brand-600">Doha Logistics Hub</span>
                              <span className="text-brand-600 animate-pulse font-extrabold">
                                With Driver (Today)
                              </span>
                              <span className="text-gray-400">Delivered</span>
                            </div>
                            <div className="w-full bg-gray-200 h-2 rounded-full overflow-hidden">
                              <div className="bg-brand-500 h-full w-3/4 rounded-full transition-all" />
                            </div>
                            <p className="text-xs text-brand-700 font-semibold mt-2.5 flex items-center gap-1.5">
                              <Truck size={14} />
                              Courier is en route to your address in {order.deliveryCity}.
                            </p>
                          </div>
                        )}

                        {/* Order Items */}
                        <div className="divide-y divide-gray-50 my-4">
                          {order.items.map((item, idx) => (
                            <div
                              key={idx}
                              className="py-3 flex items-center justify-between gap-4"
                            >
                              <div className="flex items-center gap-3">
                                <div className="w-14 h-14 rounded-xl bg-gray-50 p-1.5 flex items-center justify-center flex-shrink-0 border border-gray-100">
                                  <img
                                    src={item.imageUrl}
                                    alt={item.name}
                                    className="max-h-full max-w-full object-contain"
                                  />
                                </div>
                                <div>
                                  <p className="text-xs sm:text-sm font-bold text-gray-900 line-clamp-1">
                                    {item.name}
                                  </p>
                                  <p className="text-xs text-gray-500">
                                    Quantity: {item.qty} • {formatQar(item.priceQar)} each
                                  </p>
                                </div>
                              </div>
                              <span className="text-xs sm:text-sm font-extrabold text-gray-900 flex-shrink-0">
                                {formatQar(item.priceQar * item.qty)}
                              </span>
                            </div>
                          ))}
                        </div>

                        {/* Actions */}
                        <div className="pt-3 border-t border-gray-100 flex flex-wrap items-center justify-between gap-3">
                          <span className="text-xs text-gray-500 flex items-center gap-1">
                            <ShieldCheck size={14} className="text-emerald-500" />
                            Official 1-Year Qatar Warranty Covered
                          </span>

                          <div className="flex items-center gap-2">
                            <a
                              href={`https://wa.me/97455001234?text=Tracking%20Order%20${order.id}`}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-xs font-bold text-brand-600 hover:text-brand-700 px-3 py-1.5 rounded-lg hover:bg-brand-50 transition-colors"
                            >
                              Live WhatsApp Track
                            </a>
                            <button
                              onClick={() => toast.success("Receipt downloaded as PDF!")}
                              className="text-xs font-bold text-gray-600 hover:text-gray-900 px-3 py-1.5 rounded-lg border border-gray-200 hover:bg-gray-50 transition-colors flex items-center gap-1"
                            >
                              <FileText size={13} />
                              Invoice
                            </button>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Tab 2: Wishlist */}
            {tab === "wishlist" && (
              <div className="flex flex-col gap-6">
                <div className="flex items-center justify-between">
                  <div>
                    <h2 className="text-xl font-bold text-gray-900">Saved Wishlist</h2>
                    <p className="text-xs text-gray-500 mt-0.5">
                      Items you saved for future purchases
                    </p>
                  </div>
                  <span className="text-xs font-bold text-brand-600 bg-brand-50 px-3 py-1 rounded-full">
                    {wishlist.length} Items
                  </span>
                </div>

                {wishlist.length === 0 ? (
                  <div className="text-center py-16 bg-white rounded-3xl border border-gray-100 p-8">
                    <Heart size={44} className="mx-auto mb-3 text-gray-300" />
                    <h3 className="font-bold text-gray-900 text-base">
                      Your wishlist is empty
                    </h3>
                    <p className="text-xs text-gray-500 mt-1 max-w-sm mx-auto">
                      Explore our catalog of flagship phones, smartwatches, and accessories
                    </p>
                    <Link
                      href="/category/smartphones"
                      className="mt-4 btn-primary inline-flex items-center gap-2 py-2.5 px-5 text-xs font-bold rounded-xl"
                    >
                      Browse Tech Deals →
                    </Link>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {wishlist.map((item) => (
                      <div
                        key={item.id}
                        className="bg-white rounded-3xl p-5 border border-gray-100 shadow-card flex flex-col justify-between"
                      >
                        <div>
                          <div className="w-full h-40 bg-gray-50 rounded-2xl p-4 flex items-center justify-center mb-4 relative">
                            <img
                              src={item.imageUrl}
                              alt={item.name}
                              className="max-h-full max-w-full object-contain"
                            />
                            <button
                              onClick={() => {
                                setWishlist(wishlist.filter((w) => w.id !== item.id));
                                toast("Removed from wishlist.");
                              }}
                              className="absolute top-3 right-3 w-8 h-8 rounded-full bg-white/90 hover:bg-white text-gray-400 hover:text-red-500 flex items-center justify-center shadow-xs transition-colors"
                            >
                              <Trash2 size={14} />
                            </button>
                          </div>
                          <h4 className="font-bold text-sm text-gray-900 line-clamp-2 mb-1">
                            {item.name}
                          </h4>
                          <div className="flex items-baseline gap-2 mb-4">
                            <span className="font-extrabold text-base text-gray-900">
                              {formatQar(item.priceQar)}
                            </span>
                            {item.originalPriceQar && (
                              <span className="text-xs text-gray-400 line-through">
                                {formatQar(item.originalPriceQar)}
                              </span>
                            )}
                          </div>
                        </div>

                        <button
                          onClick={() => handleMoveWishlistToCart(item)}
                          className="w-full btn-primary py-2.5 text-xs font-bold rounded-xl flex items-center justify-center gap-2"
                        >
                          <ShoppingCart size={14} />
                          <span>Move to Cart</span>
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}

            {/* Tab 3: Addresses */}
            {tab === "addresses" && (
              <div className="flex flex-col gap-6">
                <div className="flex items-center justify-between">
                  <div>
                    <h2 className="text-xl font-bold text-gray-900">
                      Qatar Delivery Addresses
                    </h2>
                    <p className="text-xs text-gray-500 mt-0.5">
                      Manage delivery destinations across Doha and Qatar municipalities
                    </p>
                  </div>
                  <button
                    onClick={() => setShowAddAddress(!showAddAddress)}
                    className="btn-primary py-2 px-3 text-xs font-bold rounded-xl flex items-center gap-1.5 cursor-pointer"
                  >
                    <Plus size={14} />
                    <span>Add Address</span>
                  </button>
                </div>

                {/* Add Address Form Accordion */}
                {showAddAddress && (
                  <form
                    onSubmit={handleAddAddressSubmit}
                    className="p-6 bg-white rounded-3xl border-2 border-brand-200 shadow-sm flex flex-col gap-4 animate-in fade-in"
                  >
                    <h3 className="text-sm font-bold text-gray-900">
                      New Qatar Delivery Address
                    </h3>
                    <div className="grid sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1">
                          Label (e.g. Home, Office)
                        </label>
                        <input
                          type="text"
                          value={newAddress.label}
                          onChange={(e) =>
                            setNewAddress({ ...newAddress, label: e.target.value })
                          }
                          required
                          className="w-full px-3.5 py-2.5 border border-gray-200 rounded-xl text-xs font-medium focus:outline-none focus:border-brand-500"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1">
                          Recipient Name
                        </label>
                        <input
                          type="text"
                          placeholder="Full Name"
                          value={newAddress.recipient}
                          onChange={(e) =>
                            setNewAddress({ ...newAddress, recipient: e.target.value })
                          }
                          required
                          className="w-full px-3.5 py-2.5 border border-gray-200 rounded-xl text-xs font-medium focus:outline-none focus:border-brand-500"
                        />
                      </div>
                    </div>

                    <div className="grid sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1">
                          Building / Street / Villa
                        </label>
                        <input
                          type="text"
                          placeholder="e.g. Villa 24, Street 810"
                          value={newAddress.building}
                          onChange={(e) =>
                            setNewAddress({ ...newAddress, building: e.target.value })
                          }
                          required
                          className="w-full px-3.5 py-2.5 border border-gray-200 rounded-xl text-xs font-medium focus:outline-none focus:border-brand-500"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1">
                          Municipality / City
                        </label>
                        <select
                          value={newAddress.city}
                          onChange={(e) =>
                            setNewAddress({ ...newAddress, city: e.target.value })
                          }
                          className="w-full px-3.5 py-2.5 border border-gray-200 rounded-xl text-xs font-medium focus:outline-none focus:border-brand-500 bg-white"
                        >
                          <option value="Doha (Central)">Doha (Central)</option>
                          <option value="West Bay">West Bay</option>
                          <option value="Lusail Marina">Lusail Marina</option>
                          <option value="The Pearl">The Pearl</option>
                          <option value="Al Rayyan">Al Rayyan</option>
                          <option value="Al Wakrah">Al Wakrah</option>
                          <option value="Al Khor">Al Khor</option>
                        </select>
                      </div>
                    </div>

                    <div className="flex gap-2 justify-end pt-2">
                      <button
                        type="button"
                        onClick={() => setShowAddAddress(false)}
                        className="py-2 px-4 rounded-xl border border-gray-200 text-xs font-bold text-gray-600 hover:bg-gray-50"
                      >
                        Cancel
                      </button>
                      <button
                        type="submit"
                        className="btn-primary py-2 px-4 rounded-xl text-xs font-bold"
                      >
                        Save Address
                      </button>
                    </div>
                  </form>
                )}

                {/* Addresses Grid */}
                <div className="grid sm:grid-cols-2 gap-4">
                  {addresses.map((addr) => (
                    <div
                      key={addr.id}
                      className={`p-5 rounded-3xl border transition-all ${
                        addr.isDefault
                          ? "bg-white border-brand-500 shadow-md shadow-brand-500/10"
                          : "bg-white border-gray-100 shadow-card"
                      }`}
                    >
                      <div className="flex items-center justify-between mb-3">
                        <span className="text-xs font-extrabold uppercase tracking-wider text-gray-900 bg-gray-100 px-2.5 py-1 rounded-lg">
                          {addr.label}
                        </span>
                        {addr.isDefault ? (
                          <span className="text-[11px] font-bold text-brand-600 bg-brand-50 px-2 py-0.5 rounded-full border border-brand-200">
                            Default Address
                          </span>
                        ) : (
                          <button
                            onClick={() => handleSetDefaultAddress(addr.id)}
                            className="text-[11px] font-semibold text-gray-500 hover:text-brand-600 underline"
                          >
                            Set as default
                          </button>
                        )}
                      </div>

                      <p className="font-bold text-sm text-gray-900 mb-1">
                        {addr.recipient}
                      </p>
                      <p className="text-xs text-gray-600 leading-relaxed">
                        {addr.building}
                      </p>
                      <p className="text-xs font-semibold text-gray-800 mt-1">
                        {addr.city}
                      </p>
                      <p className="text-xs text-gray-400 mt-2 flex items-center gap-1.5">
                        <Phone size={12} />
                        {addr.phone}
                      </p>

                      <div className="pt-4 mt-4 border-t border-gray-100 flex items-center justify-between">
                        <span className="text-[11px] text-emerald-600 font-semibold flex items-center gap-1">
                          <CheckCircle2 size={12} /> Same-day eligible
                        </span>
                        {!addr.isDefault && (
                          <button
                            onClick={() => handleDeleteAddress(addr.id)}
                            className="text-xs text-red-500 hover:text-red-700 font-medium cursor-pointer"
                          >
                            Delete
                          </button>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Tab 4: Settings */}
            {tab === "settings" && (
              <div className="flex flex-col gap-6">
                <div>
                  <h2 className="text-xl font-bold text-gray-900">
                    Profile & Preferences
                  </h2>
                  <p className="text-xs text-gray-500 mt-0.5">
                    Update your contact information, delivery area and notification settings
                  </p>
                </div>

                <form
                  onSubmit={handleSaveSettings}
                  className="bg-white rounded-3xl p-6 sm:p-8 border border-gray-100 shadow-card flex flex-col gap-5"
                >
                  <h3 className="font-bold text-sm text-gray-900 uppercase tracking-wider pb-2 border-b border-gray-100">
                    Personal Information
                  </h3>

                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1.5">
                        Full Name
                      </label>
                      <input
                        type="text"
                        value={settingsForm.fullName}
                        onChange={(e) =>
                          setSettingsForm({
                            ...settingsForm,
                            fullName: e.target.value,
                          })
                        }
                        required
                        className="w-full px-4 py-3 border border-gray-200 rounded-2xl text-sm font-medium focus:outline-none focus:border-brand-500 focus:ring-2 focus:ring-brand-100"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1.5">
                        Email Address
                      </label>
                      <input
                        type="email"
                        value={settingsForm.email}
                        onChange={(e) =>
                          setSettingsForm({
                            ...settingsForm,
                            email: e.target.value,
                          })
                        }
                        required
                        className="w-full px-4 py-3 border border-gray-200 rounded-2xl text-sm font-medium focus:outline-none focus:border-brand-500 focus:ring-2 focus:ring-brand-100"
                      />
                    </div>
                  </div>

                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1.5">
                        Qatar Mobile Number
                      </label>
                      <input
                        type="tel"
                        value={settingsForm.phone}
                        onChange={(e) =>
                          setSettingsForm({
                            ...settingsForm,
                            phone: e.target.value,
                          })
                        }
                        required
                        className="w-full px-4 py-3 border border-gray-200 rounded-2xl text-sm font-medium focus:outline-none focus:border-brand-500 focus:ring-2 focus:ring-brand-100"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1.5">
                        Primary Delivery Area
                      </label>
                      <input
                        type="text"
                        value={settingsForm.area}
                        onChange={(e) =>
                          setSettingsForm({
                            ...settingsForm,
                            area: e.target.value,
                          })
                        }
                        required
                        className="w-full px-4 py-3 border border-gray-200 rounded-2xl text-sm font-medium focus:outline-none focus:border-brand-500 focus:ring-2 focus:ring-brand-100"
                      />
                    </div>
                  </div>

                  <h3 className="font-bold text-sm text-gray-900 uppercase tracking-wider pt-4 pb-2 border-b border-gray-100">
                    Notifications & Updates
                  </h3>

                  <div className="flex flex-col gap-3">
                    <label className="flex items-center justify-between p-3.5 bg-gray-50/70 rounded-2xl border border-gray-100 cursor-pointer select-none">
                      <div>
                        <p className="text-xs sm:text-sm font-bold text-gray-900">
                          Order Dispatch Updates via WhatsApp
                        </p>
                        <p className="text-[11px] text-gray-500">
                          Receive courier live location and estimated arrival time
                        </p>
                      </div>
                      <input
                        type="checkbox"
                        checked={settingsForm.whatsappUpdates}
                        onChange={(e) =>
                          setSettingsForm({
                            ...settingsForm,
                            whatsappUpdates: e.target.checked,
                          })
                        }
                        className="w-5 h-5 rounded text-brand-500 accent-brand-500 cursor-pointer"
                      />
                    </label>

                    <label className="flex items-center justify-between p-3.5 bg-gray-50/70 rounded-2xl border border-gray-100 cursor-pointer select-none">
                      <div>
                        <p className="text-xs sm:text-sm font-bold text-gray-900">
                          SMS Delivery Alerts
                        </p>
                        <p className="text-[11px] text-gray-500">
                          Standard Qatar telecom SMS for delivery OTP & driver contact
                        </p>
                      </div>
                      <input
                        type="checkbox"
                        checked={settingsForm.smsAlerts}
                        onChange={(e) =>
                          setSettingsForm({
                            ...settingsForm,
                            smsAlerts: e.target.checked,
                          })
                        }
                        className="w-5 h-5 rounded text-brand-500 accent-brand-500 cursor-pointer"
                      />
                    </label>
                  </div>

                  <button
                    type="submit"
                    className="btn-primary py-3.5 px-6 rounded-2xl text-sm font-bold mt-3 self-start cursor-pointer shadow-md shadow-brand-500/20"
                  >
                    Save Changes
                  </button>
                </form>
              </div>
            )}
          </div>
        </div>
      </div>
    </main>
  );
}
