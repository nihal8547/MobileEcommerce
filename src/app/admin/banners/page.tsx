"use client";

import { useState, useEffect } from "react";
import { AdminLayout } from "@/components/admin/AdminLayout";
import {
  Plus,
  Edit2,
  Trash2,
  ToggleLeft,
  ToggleRight,
  GripVertical,
  Image as ImageIcon,
  ExternalLink,
  Sparkles,
  X,
  Layers,
  CheckCircle2,
  AlertCircle,
} from "lucide-react";
import toast from "react-hot-toast";

interface BannerItem {
  id: string;
  slot: "hero" | "promo" | "announcement";
  title: string;
  subtitle: string;
  badge: string;
  ctaText: string;
  ctaLink: string;
  imageUrl: string;
  bgColor: string;
  accent: string;
  active: boolean;
}

const DEFAULT_BANNERS: BannerItem[] = [
  {
    id: "b-1",
    slot: "hero",
    title: "iPhone 16 Pro Max",
    subtitle: "Grade 5 Titanium · A18 Pro Chip · 4K 120fps Dolby Vision",
    badge: "Flash Sale — 48 Hours Only",
    ctaText: "Shop Now",
    ctaLink: "/category/smartphones",
    imageUrl:
      "https://images.unsplash.com/photo-1592750475338-74b7b21085ab?auto=format&fit=crop&w=600&q=80",
    bgColor: "from-[#1a0a06] via-[#2e1008] to-[#4a1a2e]",
    accent: "#ff4a28",
    active: true,
  },
  {
    id: "b-2",
    slot: "hero",
    title: "Samsung Galaxy S25 Ultra",
    subtitle: "200MP Quad Camera · Snapdragon 8 Elite · Galaxy AI & S-Pen",
    badge: "Best Seller in Qatar",
    ctaText: "Order Now",
    ctaLink: "/product/samsung-s25-ultra",
    imageUrl:
      "https://images.unsplash.com/photo-1610945415295-d9bbf067e59c?auto=format&fit=crop&w=600&q=80",
    bgColor: "from-[#061628] via-[#0a2040] to-[#1a3060]",
    accent: "#3B82F6",
    active: true,
  },
  {
    id: "b-3",
    slot: "hero",
    title: "Sony WH-1000XM6 Wireless ANC",
    subtitle: "HD Noise Cancelling QN1 · 30-Hour Battery · LDAC Hi-Res Audio",
    badge: "Audio Collection",
    ctaText: "Discover Audio",
    ctaLink: "/category/audio",
    imageUrl:
      "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=600&q=80",
    bgColor: "from-[#0a0a14] via-[#16162a] to-[#2a1a40]",
    accent: "#8B5CF6",
    active: true,
  },
  {
    id: "b-4",
    slot: "hero",
    title: "Apple Watch Series 10",
    subtitle: "Wide-Angle OLED Display · Sleep Apnea Alerts · Faster Charging",
    badge: "Thinnest Design Ever",
    ctaText: "Buy Now",
    ctaLink: "/product/apple-watch-series-10",
    imageUrl:
      "https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=600&q=80",
    bgColor: "from-[#0e1726] via-[#112338] to-[#1e3a5f]",
    accent: "#06B6D4",
    active: true,
  },
  {
    id: "b-5",
    slot: "promo",
    title: "Samsung Galaxy S25 Ultra",
    subtitle: "Snapdragon 8 Elite · 200MP Quad Camera · Free Galaxy Buds",
    badge: "Flash Sale — Qatar",
    ctaText: "Order Flagship",
    ctaLink: "/product/samsung-s25-ultra",
    imageUrl:
      "https://images.unsplash.com/photo-1610945415295-d9bbf067e59c?auto=format&fit=crop&w=600&q=80",
    bgColor: "from-[#081832] via-[#0e244d] to-[#173873]",
    accent: "#3B82F6",
    active: true,
  },
  {
    id: "b-6",
    slot: "promo",
    title: "Apple Watch Series 10",
    subtitle: "From QAR 1,799 · Thinnest Ever",
    badge: "New Arrival",
    ctaText: "Explore",
    ctaLink: "/product/apple-watch-series-10",
    imageUrl:
      "https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=500&q=80",
    bgColor: "from-[#0a1e16] via-[#123326] to-[#1c4d3a]",
    accent: "#10B981",
    active: true,
  },
  {
    id: "b-7",
    slot: "promo",
    title: "140W Anker & MagSafe Gear",
    subtitle: "High-speed charging & armor cases",
    badge: "Buy 2 Get QAR 60 Off",
    ctaText: "Shop Accessories",
    ctaLink: "/category/accessories",
    imageUrl:
      "https://images.unsplash.com/photo-1600294037681-c80b4cb5b434?auto=format&fit=crop&w=500&q=80",
    bgColor: "from-[#291309] via-[#3d1c0d] to-[#592b14]",
    accent: "#F59E0B",
    active: true,
  },
];

export default function AdminBannersPage() {
  const [banners, setBanners] = useState<BannerItem[]>([]);
  const [slotFilter, setSlotFilter] = useState<"all" | "hero" | "promo">("all");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingBanner, setEditingBanner] = useState<BannerItem | null>(null);

  const [form, setForm] = useState({
    title: "",
    subtitle: "",
    badge: "",
    slot: "hero" as "hero" | "promo",
    ctaText: "Shop Now",
    ctaLink: "/category/smartphones",
    imageUrl: "",
    bgColor: "from-[#061628] via-[#0a2040] to-[#1a3060]",
    accent: "#3B82F6",
    active: true,
  });

  useEffect(() => {
    try {
      const saved = localStorage.getItem("mobileshop_admin_banners");
      if (saved) {
        setBanners(JSON.parse(saved));
        return;
      }
    } catch {
      // Ignore
    }
    setBanners(DEFAULT_BANNERS);
  }, []);

  const persistBanners = (updated: BannerItem[]) => {
    setBanners(updated);
    try {
      localStorage.setItem("mobileshop_admin_banners", JSON.stringify(updated));
    } catch {
      // Ignore
    }
  };

  const toggleActive = (id: string) => {
    const updated = banners.map((b) => (b.id === id ? { ...b, active: !b.active } : b));
    persistBanners(updated);
    toast.success("Banner visibility updated");
  };

  const deleteBanner = (id: string) => {
    const updated = banners.filter((b) => b.id !== id);
    persistBanners(updated);
    toast.success("Banner deleted");
  };

  const openAddModal = () => {
    setEditingBanner(null);
    setForm({
      title: "",
      subtitle: "",
      badge: "Special Qatar Offer",
      slot: "hero",
      ctaText: "Shop Now",
      ctaLink: "/category/smartphones",
      imageUrl: "",
      bgColor: "from-[#1a0a06] via-[#2e1008] to-[#4a1a2e]",
      accent: "#ff4a28",
      active: true,
    });
    setIsModalOpen(true);
  };

  const openEditModal = (b: BannerItem) => {
    setEditingBanner(b);
    setForm({
      title: b.title,
      subtitle: b.subtitle,
      badge: b.badge,
      slot: b.slot === "announcement" ? "hero" : b.slot,
      ctaText: b.ctaText,
      ctaLink: b.ctaLink,
      imageUrl: b.imageUrl,
      bgColor: b.bgColor,
      accent: b.accent,
      active: b.active,
    });
    setIsModalOpen(true);
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.title.trim()) {
      toast.error("Please enter banner title");
      return;
    }

    const defaultImg =
      form.imageUrl.trim() ||
      "https://images.unsplash.com/photo-1592750475338-74b7b21085ab?auto=format&fit=crop&w=600&q=80";

    if (editingBanner) {
      const updated = banners.map((b) =>
        b.id === editingBanner.id
          ? {
              ...b,
              title: form.title,
              subtitle: form.subtitle,
              badge: form.badge,
              slot: form.slot,
              ctaText: form.ctaText,
              ctaLink: form.ctaLink,
              imageUrl: defaultImg,
              bgColor: form.bgColor,
              accent: form.accent,
              active: form.active,
            }
          : b
      );
      persistBanners(updated);
      toast.success("Banner updated successfully!");
    } else {
      const newBanner: BannerItem = {
        id: "b-" + Date.now(),
        slot: form.slot,
        title: form.title,
        subtitle: form.subtitle,
        badge: form.badge,
        ctaText: form.ctaText,
        ctaLink: form.ctaLink,
        imageUrl: defaultImg,
        bgColor: form.bgColor,
        accent: form.accent,
        active: form.active,
      };
      persistBanners([newBanner, ...banners]);
      toast.success("New banner created!");
    }

    setIsModalOpen(false);
  };

  const filtered = banners.filter((b) => {
    if (slotFilter === "all") return true;
    return b.slot === slotFilter;
  });

  return (
    <AdminLayout>
      {/* Title & Add Button */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Banners & Promotions</h1>
          <p className="text-gray-500 text-sm mt-0.5">
            Configure homepage hero carousels, promotional cards, and discount campaigns
          </p>
        </div>
        <button
          onClick={openAddModal}
          className="btn-primary flex items-center justify-center gap-2 px-5 py-2.5 text-sm shadow-md cursor-pointer"
        >
          <Plus size={16} />
          <span>Add New Banner</span>
        </button>
      </div>

      {/* Filter Tabs */}
      <div className="flex items-center gap-2 mb-6">
        <button
          onClick={() => setSlotFilter("all")}
          className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
            slotFilter === "all"
              ? "bg-brand-500 text-white shadow-xs"
              : "bg-white text-gray-600 border border-gray-200 hover:bg-gray-50"
          }`}
        >
          All Banners ({banners.length})
        </button>
        <button
          onClick={() => setSlotFilter("hero")}
          className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
            slotFilter === "hero"
              ? "bg-brand-500 text-white shadow-xs"
              : "bg-white text-gray-600 border border-gray-200 hover:bg-gray-50"
          }`}
        >
          Hero Slides ({banners.filter((b) => b.slot === "hero").length})
        </button>
        <button
          onClick={() => setSlotFilter("promo")}
          className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
            slotFilter === "promo"
              ? "bg-brand-500 text-white shadow-xs"
              : "bg-white text-gray-600 border border-gray-200 hover:bg-gray-50"
          }`}
        >
          Promo Cards ({banners.filter((b) => b.slot === "promo").length})
        </button>
      </div>

      {/* Banners Grid / List */}
      <div className="grid md:grid-cols-2 gap-4">
        {filtered.map((banner) => (
          <div
            key={banner.id}
            className="bg-white border border-gray-200 rounded-3xl p-5 shadow-card hover:shadow-lg transition-all flex flex-col justify-between"
          >
            <div>
              {/* Top Slot Pill and Actions */}
              <div className="flex items-center justify-between mb-3">
                <span
                  className={`px-2.5 py-0.5 rounded-full text-xs font-semibold uppercase tracking-wider ${
                    banner.slot === "hero"
                      ? "bg-purple-50 text-purple-700 border border-purple-200"
                      : "bg-amber-50 text-amber-700 border border-amber-200"
                  }`}
                >
                  {banner.slot === "hero" ? "Hero Carousel" : "Promo Card"}
                </span>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => toggleActive(banner.id)}
                    className="cursor-pointer"
                    title={banner.active ? "Banner is Live" : "Banner is Hidden"}
                  >
                    {banner.active ? (
                      <ToggleRight size={26} className="text-emerald-500" />
                    ) : (
                      <ToggleLeft size={26} className="text-gray-300" />
                    )}
                  </button>
                  <button
                    onClick={() => openEditModal(banner)}
                    className="p-1.5 rounded-lg hover:bg-blue-50 text-gray-400 hover:text-blue-600 transition-colors cursor-pointer"
                  >
                    <Edit2 size={15} />
                  </button>
                  <button
                    onClick={() => deleteBanner(banner.id)}
                    className="p-1.5 rounded-lg hover:bg-rose-50 text-gray-400 hover:text-rose-600 transition-colors cursor-pointer"
                  >
                    <Trash2 size={15} />
                  </button>
                </div>
              </div>

              {/* Visual Card Mockup */}
              <div
                className={`relative overflow-hidden rounded-2xl bg-gradient-to-br ${banner.bgColor} p-4 text-white shadow-inner mb-4 flex items-center justify-between min-h-[140px]`}
              >
                <div className="relative z-10 max-w-[65%]">
                  <span
                    className="inline-block px-2 py-0.5 rounded-full text-[10px] font-bold text-white mb-2 shadow-xs"
                    style={{ background: banner.accent }}
                  >
                    {banner.badge}
                  </span>
                  <h3 className="text-base font-extrabold leading-tight text-white mb-1">
                    {banner.title}
                  </h3>
                  <p className="text-xs text-white/80 line-clamp-2 leading-relaxed">
                    {banner.subtitle}
                  </p>
                  <span className="inline-block mt-3 text-[11px] font-bold text-white/90 underline">
                    {banner.ctaText} →
                  </span>
                </div>

                <div className="relative z-10 w-24 h-24 flex items-center justify-center shrink-0">
                  <img
                    src={banner.imageUrl}
                    alt={banner.title}
                    className="max-w-full max-h-full object-contain drop-shadow-lg"
                  />
                </div>
              </div>
            </div>

            {/* Bottom link info */}
            <div className="flex items-center justify-between text-xs text-gray-400 pt-2 border-t border-gray-100">
              <span className="truncate max-w-[200px]">Link: {banner.ctaLink}</span>
              <span className={banner.active ? "text-emerald-600 font-semibold" : "text-gray-400"}>
                {banner.active ? "● Live on Site" : "○ Inactive"}
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* ADD / EDIT MODAL */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4 backdrop-blur-xs overflow-y-auto">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 sm:p-8 shadow-2xl border border-gray-100 my-8">
            <div className="flex items-center justify-between pb-4 border-b border-gray-100 mb-6">
              <div>
                <h2 className="text-xl font-bold text-gray-900">
                  {editingBanner ? "Edit Banner" : "Create New Banner"}
                </h2>
                <p className="text-xs text-gray-500 mt-0.5">
                  Set up visuals and links for homepage promotions
                </p>
              </div>
              <button
                onClick={() => setIsModalOpen(false)}
                className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-xl"
              >
                <X size={18} />
              </button>
            </div>

            <form onSubmit={handleSave} className="space-y-4">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-1">Slot Position</label>
                  <select
                    value={form.slot}
                    onChange={(e) => setForm({ ...form, slot: e.target.value as "hero" | "promo" })}
                    className="w-full px-3.5 py-2.5 border border-gray-200 rounded-xl text-sm bg-white focus:outline-none focus:border-brand-500"
                  >
                    <option value="hero">Hero Carousel (Top Slider)</option>
                    <option value="promo">Promo Banners (3-Grid)</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-1">Badge Text</label>
                  <input
                    type="text"
                    value={form.badge}
                    onChange={(e) => setForm({ ...form, badge: e.target.value })}
                    placeholder="e.g. Flash Sale — 48H"
                    className="w-full px-3.5 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-brand-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1">Banner Title *</label>
                <input
                  type="text"
                  required
                  value={form.title}
                  onChange={(e) => setForm({ ...form, title: e.target.value })}
                  placeholder="e.g. Samsung Galaxy S25 Ultra"
                  className="w-full px-3.5 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-brand-500"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1">Subtitle / Features</label>
                <input
                  type="text"
                  value={form.subtitle}
                  onChange={(e) => setForm({ ...form, subtitle: e.target.value })}
                  placeholder="e.g. Snapdragon 8 Elite · 200MP Quad Camera"
                  className="w-full px-3.5 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-brand-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-1">Button Text</label>
                  <input
                    type="text"
                    value={form.ctaText}
                    onChange={(e) => setForm({ ...form, ctaText: e.target.value })}
                    placeholder="e.g. Shop Now"
                    className="w-full px-3.5 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-brand-500"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-1">Button Link URL</label>
                  <input
                    type="text"
                    value={form.ctaLink}
                    onChange={(e) => setForm({ ...form, ctaLink: e.target.value })}
                    placeholder="/category/smartphones"
                    className="w-full px-3.5 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-brand-500 font-mono text-xs"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1">Image URL</label>
                <input
                  type="url"
                  value={form.imageUrl}
                  onChange={(e) => setForm({ ...form, imageUrl: e.target.value })}
                  placeholder="https://images.unsplash.com/..."
                  className="w-full px-3.5 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-brand-500 font-mono text-xs"
                />
              </div>

              <div className="flex items-center gap-2 pt-2">
                <label className="flex items-center gap-2 cursor-pointer text-xs font-medium text-gray-700">
                  <input
                    type="checkbox"
                    checked={form.active}
                    onChange={(e) => setForm({ ...form, active: e.target.checked })}
                    className="rounded text-brand-600 focus:ring-brand-500"
                  />
                  <span>Active & Visible in Storefront</span>
                </label>
              </div>

              <div className="flex items-center justify-end gap-3 pt-4 border-t border-gray-100">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2.5 rounded-xl border border-gray-200 text-sm font-medium text-gray-600 hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="btn-primary px-6 py-2.5 rounded-xl text-sm font-semibold shadow-md"
                >
                  {editingBanner ? "Save Changes" : "Create Banner"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </AdminLayout>
  );
}
