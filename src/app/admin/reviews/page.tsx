"use client";

import { useState, useEffect } from "react";
import { AdminLayout } from "@/components/admin/AdminLayout";
import {
  Star,
  Search,
  CheckCircle,
  EyeOff,
  Trash2,
  Plus,
  X,
  MapPin,
  ShieldCheck,
  MessageSquare,
  ThumbsUp,
} from "lucide-react";
import toast from "react-hot-toast";

interface ReviewItem {
  id: string;
  name: string;
  area: string;
  product: string;
  rating: number;
  comment: string;
  date: string;
  isVerified: boolean;
  status: "approved" | "pending" | "hidden";
}

const DEFAULT_REVIEWS: ReviewItem[] = [
  {
    id: "rev-1",
    name: "Ahmed Al-Kuwari",
    area: "West Bay, Doha",
    product: "Apple iPhone 16 Pro Max 256GB — Desert Titanium",
    rating: 5,
    comment:
      "Ordered at 11 AM and received it in West Bay before 2 PM the same day! Official Apple Qatar warranty intact. Excellent service and packaging.",
    date: "2 days ago",
    isVerified: true,
    status: "approved",
  },
  {
    id: "rev-2",
    name: "Fatima Al-Thani",
    area: "The Pearl-Qatar",
    product: "Samsung Galaxy S25 Ultra 512GB",
    rating: 5,
    comment:
      "Best price in Qatar compared to major retailers. Genuine Samsung Gulf device. The WhatsApp support helped me with my order immediately.",
    date: "3 days ago",
    isVerified: true,
    status: "approved",
  },
  {
    id: "rev-3",
    name: "Dr. Rashid M.",
    area: "Lusail Marina",
    product: "Sony WH-1000XM6 Wireless ANC",
    rating: 5,
    comment:
      "Cash on Delivery worked smoothly. The driver arrived on time and allowed me to verify the sealed box before payment.",
    date: "5 days ago",
    isVerified: true,
    status: "approved",
  },
  {
    id: "rev-4",
    name: "Sara Al-Marri",
    area: "Al Sadd, Doha",
    product: "Apple Watch Series 10 GPS",
    rating: 5,
    comment:
      "Very happy with my purchase. Free delivery in Doha and the product is 100% genuine with Fifty One East service guarantee.",
    date: "1 week ago",
    isVerified: true,
    status: "approved",
  },
  {
    id: "rev-5",
    name: "Mohammed Jassim",
    area: "Al Rayyan",
    product: "Anker Prime 27,650mAh Power Bank",
    rating: 4,
    comment:
      "Good build quality and fast charging. Standard delivery took 2 days. Overall satisfied with the service.",
    date: "1 week ago",
    isVerified: true,
    status: "approved",
  },
  {
    id: "rev-6",
    name: "Khalid Al-Hajri",
    area: "Al Wakrah",
    product: "iPad Pro M4 11-inch",
    rating: 5,
    comment:
      "Fantastic customer support on WhatsApp. Answered all technical specifications before I ordered.",
    date: "2 weeks ago",
    isVerified: true,
    status: "approved",
  },
];

export default function AdminReviewsPage() {
  const [reviews, setReviews] = useState<ReviewItem[]>([]);
  const [search, setSearch] = useState("");
  const [filterStatus, setFilterStatus] = useState<"all" | "approved" | "pending" | "hidden">("all");
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [form, setForm] = useState({
    name: "",
    area: "Doha, Qatar",
    product: "iPhone 16 Pro Max",
    rating: 5,
    comment: "",
    isVerified: true,
  });

  useEffect(() => {
    try {
      const saved = localStorage.getItem("mobileshop_admin_reviews");
      if (saved) {
        setReviews(JSON.parse(saved));
        return;
      }
    } catch {
      // Ignore
    }
    setReviews(DEFAULT_REVIEWS);
  }, []);

  const persistReviews = (updated: ReviewItem[]) => {
    setReviews(updated);
    try {
      localStorage.setItem("mobileshop_admin_reviews", JSON.stringify(updated));
    } catch {
      // Ignore
    }
  };

  const setStatus = (id: string, newStatus: ReviewItem["status"]) => {
    const updated = reviews.map((r) => (r.id === id ? { ...r, status: newStatus } : r));
    persistReviews(updated);
    toast.success(`Review status changed to ${newStatus}`);
  };

  const deleteReview = (id: string) => {
    const updated = reviews.filter((r) => r.id !== id);
    persistReviews(updated);
    toast.success("Review deleted");
  };

  const handleAddReview = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name.trim() || !form.comment.trim()) {
      toast.error("Please fill in reviewer name and feedback");
      return;
    }

    const newRev: ReviewItem = {
      id: "rev-" + Date.now(),
      name: form.name,
      area: form.area,
      product: form.product,
      rating: form.rating,
      comment: form.comment,
      date: "Just now",
      isVerified: form.isVerified,
      status: "approved",
    };

    persistReviews([newRev, ...reviews]);
    setIsModalOpen(false);
    toast.success("New customer review added!");
  };

  const filtered = reviews.filter((r) => {
    const matchesSearch =
      r.name.toLowerCase().includes(search.toLowerCase()) ||
      r.area.toLowerCase().includes(search.toLowerCase()) ||
      r.product.toLowerCase().includes(search.toLowerCase()) ||
      r.comment.toLowerCase().includes(search.toLowerCase());

    const matchesStatus = filterStatus === "all" || r.status === filterStatus;
    return matchesSearch && matchesStatus;
  });

  const averageRating = (
    reviews.reduce((sum, r) => sum + r.rating, 0) / (reviews.length || 1)
  ).toFixed(1);

  return (
    <AdminLayout>
      {/* Title & Add Button */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Customer Reviews & Proof</h1>
          <p className="text-gray-500 text-sm mt-0.5">
            Manage verified Qatar customer testimonials and satisfaction ratings
          </p>
        </div>
        <button
          onClick={() => {
            setForm({
              name: "",
              area: "West Bay, Doha",
              product: "iPhone 16 Pro Max 256GB",
              rating: 5,
              comment: "",
              isVerified: true,
            });
            setIsModalOpen(true);
          }}
          className="btn-primary flex items-center justify-center gap-2 px-5 py-2.5 text-sm shadow-md cursor-pointer"
        >
          <Plus size={16} />
          <span>Add Testimonial</span>
        </button>
      </div>

      {/* Metrics */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <div className="bg-white border border-gray-200/80 rounded-2xl p-4 shadow-xs">
          <span className="text-xs text-gray-500 font-medium">Average Rating</span>
          <div className="text-2xl font-bold text-gray-900 mt-1 flex items-center gap-1.5">
            <span>{averageRating}</span>
            <div className="flex text-amber-400">
              {[...Array(5)].map((_, i) => (
                <Star key={i} size={15} fill="currentColor" />
              ))}
            </div>
          </div>
          <span className="text-[11px] text-emerald-600 font-medium">98% 5-Star Reviews</span>
        </div>

        <div className="bg-white border border-gray-200/80 rounded-2xl p-4 shadow-xs">
          <span className="text-xs text-gray-500 font-medium">Total Reviews</span>
          <div className="text-2xl font-bold text-gray-900 mt-1">{reviews.length}</div>
          <span className="text-[11px] text-gray-500">Verified Qatar buyers</span>
        </div>

        <div className="bg-white border border-gray-200/80 rounded-2xl p-4 shadow-xs">
          <span className="text-xs text-gray-500 font-medium">Active on Storefront</span>
          <div className="text-2xl font-bold text-emerald-600 mt-1">
            {reviews.filter((r) => r.status === "approved").length}
          </div>
          <span className="text-[11px] text-gray-500">Visible on homepage</span>
        </div>

        <div className="bg-white border border-gray-200/80 rounded-2xl p-4 shadow-xs">
          <span className="text-xs text-gray-500 font-medium">Verified Buyers</span>
          <div className="text-2xl font-bold text-blue-600 mt-1">
            {reviews.filter((r) => r.isVerified).length}
          </div>
          <span className="text-[11px] text-blue-600">With official Qatar phone check</span>
        </div>
      </div>

      {/* Search & Filter Bar */}
      <div className="bg-white border border-gray-200 rounded-2xl p-4 mb-6 shadow-xs flex flex-col md:flex-row gap-3 items-stretch md:items-center justify-between">
        <div className="relative flex-1 min-w-[240px]">
          <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Search by customer name, Doha area, or feedback..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-brand-500 focus:ring-2 focus:ring-brand-100 transition-all"
          />
        </div>

        <div className="flex gap-1.5">
          {(["all", "approved", "hidden"] as const).map((st) => (
            <button
              key={st}
              onClick={() => setFilterStatus(st)}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold capitalize transition-all cursor-pointer ${
                filterStatus === st
                  ? "bg-brand-500 text-white shadow-xs"
                  : "bg-white text-gray-600 border border-gray-200 hover:bg-gray-50"
              }`}
            >
              {st}
            </button>
          ))}
        </div>
      </div>

      {/* Reviews Grid */}
      <div className="grid md:grid-cols-2 gap-4">
        {filtered.map((rev) => (
          <div
            key={rev.id}
            className="bg-white border border-gray-200 rounded-3xl p-5 shadow-card flex flex-col justify-between"
          >
            <div>
              {/* Header */}
              <div className="flex items-start justify-between gap-3 mb-3">
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="font-bold text-gray-900 text-sm">{rev.name}</h3>
                    {rev.isVerified && (
                      <span className="inline-flex items-center gap-1 text-[10px] font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
                        <ShieldCheck size={11} /> Verified Buyer
                      </span>
                    )}
                  </div>
                  <div className="flex items-center gap-1.5 text-xs text-gray-400 mt-0.5">
                    <MapPin size={12} />
                    <span>{rev.area}</span>
                    <span>·</span>
                    <span>{rev.date}</span>
                  </div>
                </div>

                {/* Rating Stars */}
                <div className="flex text-amber-400 shrink-0">
                  {[...Array(rev.rating)].map((_, i) => (
                    <Star key={i} size={14} fill="currentColor" />
                  ))}
                </div>
              </div>

              {/* Product Badge */}
              <div className="mb-3">
                <span className="text-[11px] font-medium text-brand-600 bg-brand-50 px-2.5 py-1 rounded-lg">
                  Purchased: {rev.product}
                </span>
              </div>

              {/* Comment */}
              <p className="text-xs text-gray-600 leading-relaxed italic mb-4">
                &ldquo;{rev.comment}&rdquo;
              </p>
            </div>

            {/* Footer Actions */}
            <div className="pt-3 border-t border-gray-100 flex items-center justify-between">
              <span
                className={`text-xs font-semibold capitalize ${
                  rev.status === "approved" ? "text-emerald-600" : "text-gray-400"
                }`}
              >
                ● {rev.status}
              </span>

              <div className="flex items-center gap-2">
                {rev.status === "approved" ? (
                  <button
                    onClick={() => setStatus(rev.id, "hidden")}
                    className="p-1.5 rounded-lg text-gray-400 hover:text-amber-600 hover:bg-amber-50 text-xs font-medium inline-flex items-center gap-1"
                    title="Hide review from store"
                  >
                    <EyeOff size={14} />
                    <span>Hide</span>
                  </button>
                ) : (
                  <button
                    onClick={() => setStatus(rev.id, "approved")}
                    className="p-1.5 rounded-lg text-emerald-600 hover:bg-emerald-50 text-xs font-medium inline-flex items-center gap-1"
                    title="Approve & Show on store"
                  >
                    <CheckCircle size={14} />
                    <span>Approve</span>
                  </button>
                )}

                <button
                  onClick={() => deleteReview(rev.id)}
                  className="p-1.5 rounded-lg text-gray-400 hover:text-rose-600 hover:bg-rose-50"
                  title="Delete review"
                >
                  <Trash2 size={14} />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* ADD TESTIMONIAL MODAL */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4 backdrop-blur-xs">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 sm:p-8 shadow-2xl border border-gray-100 relative">
            <button
              onClick={() => setIsModalOpen(false)}
              className="absolute top-5 right-5 p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-xl"
            >
              <X size={18} />
            </button>

            <h2 className="text-xl font-bold text-gray-900 mb-1">Add Customer Review</h2>
            <p className="text-xs text-gray-500 mb-5">
              Add verified customer feedback for social proof
            </p>

            <form onSubmit={handleAddReview} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1">
                  Customer Name *
                </label>
                <input
                  type="text"
                  required
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  placeholder="e.g. Tariq Al-Mahmoud"
                  className="w-full px-3.5 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-brand-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-1">
                    Doha Area
                  </label>
                  <input
                    type="text"
                    value={form.area}
                    onChange={(e) => setForm({ ...form, area: e.target.value })}
                    placeholder="e.g. West Bay, Doha"
                    className="w-full px-3.5 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-brand-500"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-1">Rating</label>
                  <select
                    value={form.rating}
                    onChange={(e) => setForm({ ...form, rating: Number(e.target.value) })}
                    className="w-full px-3.5 py-2.5 border border-gray-200 rounded-xl text-sm bg-white focus:outline-none focus:border-brand-500"
                  >
                    <option value={5}>⭐⭐⭐⭐⭐ (5 Stars)</option>
                    <option value={4}>⭐⭐⭐⭐ (4 Stars)</option>
                    <option value={3}>⭐⭐⭐ (3 Stars)</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1">
                  Product Purchased
                </label>
                <input
                  type="text"
                  value={form.product}
                  onChange={(e) => setForm({ ...form, product: e.target.value })}
                  placeholder="e.g. Apple iPhone 16 Pro Max 256GB"
                  className="w-full px-3.5 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-brand-500"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1">
                  Customer Review Comment *
                </label>
                <textarea
                  required
                  rows={3}
                  value={form.comment}
                  onChange={(e) => setForm({ ...form, comment: e.target.value })}
                  placeholder="e.g. Received fast delivery and genuine warranty. Highly recommended!"
                  className="w-full px-3.5 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-brand-500"
                />
              </div>

              <div className="flex items-center justify-end gap-3 pt-3 border-t border-gray-100">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 text-xs font-semibold text-gray-600 hover:bg-gray-50 rounded-xl border border-gray-200"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="btn-primary px-5 py-2 text-xs font-semibold rounded-xl"
                >
                  Publish Review
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </AdminLayout>
  );
}
