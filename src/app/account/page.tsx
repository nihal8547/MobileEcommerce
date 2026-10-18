"use client";

import { useState } from "react";
import Link from "next/link";
import { Package, Heart, MapPin, Settings, LogOut, ChevronRight, Clock, CheckCircle, Truck, ShoppingBag, Smartphone, Headphones, Watch } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { formatQar } from "@/lib/utils";

const MOCK_ORDERS: { id: string; date: string; status: string; total: number; items: { name: string; qty: number; Icon: LucideIcon }[] }[] = [
  {
    id: "MSQ-847392-001",
    date: "Oct 12, 2026",
    status: "delivered",
    total: 4799,
    items: [{ name: "iPhone 16 Pro Max 256GB", qty: 1, Icon: Smartphone }],
  },
  {
    id: "MSQ-847392-002",
    date: "Oct 8, 2026",
    status: "shipped",
    total: 1299,
    items: [{ name: "Samsung Galaxy Buds3 Pro", qty: 2, Icon: Headphones }],
  },
  {
    id: "MSQ-847392-003",
    date: "Sep 28, 2026",
    status: "processing",
    total: 899,
    items: [{ name: "Apple Watch Series 10", qty: 1, Icon: Watch }],
  },
];

const STATUS_CONFIG = {
  delivered: { label: "Delivered", icon: CheckCircle, color: "text-green-600 bg-green-50 border-green-200" },
  shipped: { label: "Shipped", icon: Truck, color: "text-blue-600 bg-blue-50 border-blue-200" },
  processing: { label: "Processing", icon: Clock, color: "text-amber-600 bg-amber-50 border-amber-200" },
};

type Tab = "orders" | "wishlist" | "addresses" | "settings";

export default function AccountPage() {
  const [tab, setTab] = useState<Tab>("orders");

  const tabs = [
    { id: "orders" as Tab, label: "Orders", icon: Package },
    { id: "wishlist" as Tab, label: "Wishlist", icon: Heart },
    { id: "addresses" as Tab, label: "Addresses", icon: MapPin },
    { id: "settings" as Tab, label: "Settings", icon: Settings },
  ];

  return (
    <main className="container-main py-8">
      {/* Header */}
      <div className="flex items-center gap-4 mb-8">
        <div className="w-16 h-16 rounded-2xl bg-brand-gradient flex items-center justify-center text-white text-2xl font-bold shadow-md">
          A
        </div>
        <div>
          <h1 className="text-xl font-bold text-gray-900">Ahmed Al-Rashid</h1>
          <p className="text-sm text-gray-500">ahmed@example.com • West Bay, Doha</p>
        </div>
        <button className="ml-auto flex items-center gap-1.5 text-sm text-red-500 hover:text-red-600 transition-colors">
          <LogOut size={15} />
          Sign out
        </button>
      </div>

      {/* Tab nav */}
      <div className="flex gap-1 p-1 bg-gray-100 rounded-xl mb-6 overflow-x-auto">
        {tabs.map(({ id, label, icon: Icon }) => (
          <button
            key={id}
            onClick={() => setTab(id)}
            className={`flex-1 flex items-center justify-center gap-2 py-2.5 px-4 rounded-lg text-sm font-medium transition-all whitespace-nowrap ${
              tab === id
                ? "bg-white text-gray-900 shadow-sm"
                : "text-gray-500 hover:text-gray-700"
            }`}
          >
            <Icon size={15} />
            {label}
          </button>
        ))}
      </div>

      {/* Orders tab */}
      {tab === "orders" && (
        <div className="flex flex-col gap-4">
          {MOCK_ORDERS.length === 0 ? (
            <div className="text-center py-16 text-gray-400">
              <ShoppingBag size={40} className="mx-auto mb-3 opacity-40" />
              <p className="font-medium">No orders yet</p>
              <Link href="/" className="text-brand-500 text-sm mt-2 inline-block">Start shopping</Link>
            </div>
          ) : (
            MOCK_ORDERS.map((order) => {
              const { label, icon: StatusIcon, color } = STATUS_CONFIG[order.status as keyof typeof STATUS_CONFIG];
              return (
                <div key={order.id} className="bg-white border border-gray-200 rounded-2xl p-5 shadow-card">
                  <div className="flex items-start justify-between gap-3 mb-3">
                    <div>
                      <p className="font-semibold text-gray-900 text-sm">{order.id}</p>
                      <p className="text-xs text-gray-400 mt-0.5">{order.date}</p>
                    </div>
                    <span className={`flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium border ${color}`}>
                      <StatusIcon size={12} />
                      {label}
                    </span>
                  </div>
                  <div className="flex items-center gap-3 mb-3">
                    {order.items.map((item, i) => (
                      <div key={i} className="flex items-center gap-2 text-sm text-gray-700">
                        <item.Icon size={18} className="text-gray-400 shrink-0" strokeWidth={1.5} />
                        <span>{item.name} × {item.qty}</span>
                      </div>
                    ))}
                  </div>
                  <div className="flex items-center justify-between pt-3 border-t border-gray-100">
                    <span className="font-bold text-gray-900">{formatQar(order.total)}</span>
                    <button className="flex items-center gap-1 text-sm text-brand-500 font-medium hover:underline">
                      View details <ChevronRight size={14} />
                    </button>
                  </div>
                </div>
              );
            })
          )}
        </div>
      )}

      {/* Wishlist tab */}
      {tab === "wishlist" && (
        <div className="text-center py-16 text-gray-400">
          <Heart size={40} className="mx-auto mb-3 opacity-40" />
          <p className="font-medium">Your wishlist is empty</p>
          <Link href="/" className="text-brand-500 text-sm mt-2 inline-block">Discover products</Link>
        </div>
      )}

      {/* Addresses tab */}
      {tab === "addresses" && (
        <div className="flex flex-col gap-4">
          <div className="bg-white border border-gray-200 rounded-2xl p-5 shadow-card">
            <div className="flex items-start justify-between">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <p className="font-semibold text-gray-900">Ahmed Al-Rashid</p>
                  <span className="px-2 py-0.5 bg-brand-50 text-brand-600 text-xs rounded-full font-medium border border-brand-100">
                    Default
                  </span>
                </div>
                <p className="text-sm text-gray-600">Villa 24, Street 8, West Bay</p>
                <p className="text-sm text-gray-600">Doha, Qatar</p>
                <p className="text-sm text-gray-500 mt-1">+974 6600 0000</p>
              </div>
              <button className="text-sm text-brand-500 hover:underline font-medium">Edit</button>
            </div>
          </div>

          <button className="flex items-center justify-center gap-2 py-4 border-2 border-dashed border-gray-200 rounded-2xl text-sm text-gray-400 hover:border-brand-200 hover:text-brand-500 transition-colors">
            + Add new address
          </button>
        </div>
      )}

      {/* Settings tab */}
      {tab === "settings" && (
        <div className="flex flex-col gap-4">
          <div className="bg-white border border-gray-200 rounded-2xl p-5 shadow-card">
            <h3 className="font-semibold text-gray-900 mb-4">Personal Information</h3>
            <div className="flex flex-col gap-4">
              {[
                { label: "Full Name", value: "Ahmed Al-Rashid", type: "text" },
                { label: "Email", value: "ahmed@example.com", type: "email" },
                { label: "Phone", value: "+974 6600 0000", type: "tel" },
              ].map((field) => (
                <div key={field.label}>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">{field.label}</label>
                  <input
                    type={field.type}
                    defaultValue={field.value}
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-brand-400 focus:ring-2 focus:ring-brand-100 transition-all"
                  />
                </div>
              ))}
              <button className="btn-primary">Save changes</button>
            </div>
          </div>

          <div className="bg-white border border-gray-200 rounded-2xl p-5 shadow-card">
            <h3 className="font-semibold text-gray-900 mb-4">Notifications</h3>
            {[
              { label: "Order updates via WhatsApp", on: true },
              { label: "Promotional offers & deals", on: false },
              { label: "New arrivals in Qatar", on: true },
            ].map((n) => (
              <label key={n.label} className="flex items-center justify-between py-3 border-b border-gray-100 last:border-0 cursor-pointer">
                <span className="text-sm text-gray-700">{n.label}</span>
                <div
                  className={`w-11 h-6 rounded-full transition-colors ${n.on ? "bg-brand-500" : "bg-gray-200"} relative`}
                >
                  <div className={`absolute top-1 w-4 h-4 bg-white rounded-full shadow transition-all ${n.on ? "left-6" : "left-1"}`} />
                </div>
              </label>
            ))}
          </div>
        </div>
      )}
    </main>
  );
}
