"use client";

import { AdminLayout } from "@/components/admin/AdminLayout";
import { useState } from "react";
import { Plus, Edit2, Trash2, ToggleLeft, ToggleRight, GripVertical } from "lucide-react";

const MOCK_BANNERS = [
  {
    id: "1",
    title: "iPhone 16 Pro Max",
    subtitle: "Starting QAR 4,799",
    badge: "New Arrival",
    bgColor: "#1a1a2e",
    active: true,
    slot: "hero",
    emoji: "📱",
  },
  {
    id: "2",
    title: "Samsung S25 Ultra",
    subtitle: "Starting QAR 3,999",
    badge: "Best Seller",
    bgColor: "#0f3460",
    active: true,
    slot: "hero",
    emoji: "📱",
  },
  {
    id: "3",
    title: "Summer Deals",
    subtitle: "Up to 30% off on Audio",
    badge: "Limited Time",
    bgColor: "#8b1a3f",
    active: true,
    slot: "promo",
    emoji: "🎧",
  },
  {
    id: "4",
    title: "Express Delivery",
    subtitle: "Same day in Doha — QAR 30",
    badge: "Service",
    bgColor: "#1e3a5f",
    active: false,
    slot: "promo",
    emoji: "🚚",
  },
];

export default function AdminBannersPage() {
  const [banners, setBanners] = useState(MOCK_BANNERS);

  const toggleActive = (id: string) =>
    setBanners((prev) => prev.map((b) => (b.id === id ? { ...b, active: !b.active } : b)));

  const deleteBanner = (id: string) =>
    setBanners((prev) => prev.filter((b) => b.id !== id));

  return (
    <AdminLayout>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Banners</h1>
          <p className="text-gray-500 text-sm mt-1">Manage hero carousels and promo banners</p>
        </div>
        <button className="btn-primary flex items-center gap-2 px-4 py-2.5 text-sm">
          <Plus size={16} /> Add Banner
        </button>
      </div>

      {/* Hero banners */}
      <div className="mb-6">
        <h2 className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-3">
          Hero Carousel ({banners.filter((b) => b.slot === "hero").length})
        </h2>
        <div className="flex flex-col gap-3">
          {banners.filter((b) => b.slot === "hero").map((banner) => (
            <div key={banner.id} className="bg-white border border-gray-200 rounded-2xl p-4 shadow-card flex items-center gap-4">
              <GripVertical size={16} className="text-gray-300 cursor-grab shrink-0" />

              {/* Preview */}
              <div
                className="w-24 h-14 rounded-xl flex items-center justify-center text-3xl shrink-0"
                style={{ backgroundColor: banner.bgColor }}
              >
                {banner.emoji}
              </div>

              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <p className="font-semibold text-gray-900 truncate">{banner.title}</p>
                  <span className="px-2 py-0.5 bg-purple-50 text-purple-600 text-xs rounded-full border border-purple-200 shrink-0">
                    HERO
                  </span>
                </div>
                <p className="text-sm text-gray-500 mt-0.5">{banner.subtitle}</p>
                <p className="text-xs text-gray-400 mt-0.5">Badge: {banner.badge}</p>
              </div>

              <div className="flex items-center gap-3 shrink-0">
                <button onClick={() => toggleActive(banner.id)}>
                  {banner.active
                    ? <ToggleRight size={24} className="text-green-500" />
                    : <ToggleLeft size={24} className="text-gray-300" />
                  }
                </button>
                <button className="p-1.5 rounded-lg hover:bg-blue-50 text-gray-400 hover:text-blue-600 transition-colors">
                  <Edit2 size={15} />
                </button>
                <button
                  onClick={() => deleteBanner(banner.id)}
                  className="p-1.5 rounded-lg hover:bg-red-50 text-gray-400 hover:text-red-500 transition-colors"
                >
                  <Trash2 size={15} />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Promo banners */}
      <div>
        <h2 className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-3">
          Promo Banners ({banners.filter((b) => b.slot === "promo").length})
        </h2>
        <div className="flex flex-col gap-3">
          {banners.filter((b) => b.slot === "promo").map((banner) => (
            <div key={banner.id} className="bg-white border border-gray-200 rounded-2xl p-4 shadow-card flex items-center gap-4">
              <GripVertical size={16} className="text-gray-300 cursor-grab shrink-0" />

              <div
                className="w-24 h-14 rounded-xl flex items-center justify-center text-3xl shrink-0"
                style={{ backgroundColor: banner.bgColor }}
              >
                {banner.emoji}
              </div>

              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <p className="font-semibold text-gray-900 truncate">{banner.title}</p>
                  <span className="px-2 py-0.5 bg-amber-50 text-amber-600 text-xs rounded-full border border-amber-200 shrink-0">
                    PROMO
                  </span>
                </div>
                <p className="text-sm text-gray-500 mt-0.5">{banner.subtitle}</p>
              </div>

              <div className="flex items-center gap-3 shrink-0">
                <button onClick={() => toggleActive(banner.id)}>
                  {banner.active
                    ? <ToggleRight size={24} className="text-green-500" />
                    : <ToggleLeft size={24} className="text-gray-300" />
                  }
                </button>
                <button className="p-1.5 rounded-lg hover:bg-blue-50 text-gray-400 hover:text-blue-600 transition-colors">
                  <Edit2 size={15} />
                </button>
                <button
                  onClick={() => deleteBanner(banner.id)}
                  className="p-1.5 rounded-lg hover:bg-red-50 text-gray-400 hover:text-red-500 transition-colors"
                >
                  <Trash2 size={15} />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </AdminLayout>
  );
}
