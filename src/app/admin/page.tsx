"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { AdminLayout } from "@/components/admin/AdminLayout";
import {
  Package,
  ShoppingCart,
  Users,
  TrendingUp,
  ArrowUp,
  ArrowDown,
  Plus,
  MessageCircle,
  ExternalLink,
  ChevronRight,
  ShieldCheck,
  Star,
  Sparkles,
  Truck,
  CreditCard,
  AlertTriangle,
  Clock,
  Layers,
} from "lucide-react";

interface RecentOrder {
  id: string;
  customer: string;
  phone: string;
  item: string;
  area: string;
  total: number;
  status: "delivered" | "shipped" | "processing";
  date: string;
}

const DEFAULT_RECENT_ORDERS: RecentOrder[] = [
  {
    id: "MSQ-847301",
    customer: "Ahmed Al-Rashid",
    phone: "+974 6600 1234",
    item: "iPhone 16 Pro Max 256GB",
    area: "West Bay",
    total: 4799,
    status: "delivered",
    date: "11:30 AM",
  },
  {
    id: "MSQ-847302",
    customer: "Fatima Al-Kuwari",
    phone: "+974 5544 5678",
    item: "Samsung Galaxy S25 Ultra",
    area: "The Pearl",
    total: 3999,
    status: "shipped",
    date: "09:15 AM",
  },
  {
    id: "MSQ-847303",
    customer: "Mohammed Al-Thani",
    phone: "+974 7733 9012",
    item: "Sony WH-1000XM6 Wireless ANC",
    area: "Lusail",
    total: 1399,
    status: "processing",
    date: "Yesterday",
  },
  {
    id: "MSQ-847304",
    customer: "Sara Al-Marri",
    phone: "+974 5511 3456",
    item: "Apple Watch Series 10 GPS",
    area: "Al Sadd",
    total: 899,
    status: "processing",
    date: "Yesterday",
  },
  {
    id: "MSQ-847305",
    customer: "Khalid Al-Attiyah",
    phone: "+974 6622 7890",
    item: "iPad Pro M4 11-inch",
    area: "Al Rayyan",
    total: 3299,
    status: "delivered",
    date: "Oct 15",
  },
];

const statusColor: Record<string, string> = {
  delivered: "bg-emerald-50 text-emerald-700 border-emerald-200",
  shipped: "bg-blue-50 text-blue-700 border-blue-200",
  processing: "bg-amber-50 text-amber-700 border-amber-200",
};

const topFlagships = [
  {
    name: "Apple iPhone 16 Pro Max",
    brand: "Apple",
    units: 142,
    revenue: "QAR 681,458",
    stock: 14,
    image: "https://images.unsplash.com/photo-1592750475338-74b7b21085ab?auto=format&fit=crop&w=200&q=80",
  },
  {
    name: "Samsung Galaxy S25 Ultra",
    brand: "Samsung",
    units: 98,
    revenue: "QAR 421,302",
    stock: 8,
    image: "https://images.unsplash.com/photo-1610945415295-d9bbf067e59c?auto=format&fit=crop&w=200&q=80",
  },
  {
    name: "Sony WH-1000XM6 Wireless",
    brand: "Sony",
    units: 64,
    revenue: "QAR 102,336",
    stock: 25,
    image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=200&q=80",
  },
  {
    name: "Apple Watch Series 10",
    brand: "Apple",
    units: 51,
    revenue: "QAR 91,749",
    stock: 15,
    image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=200&q=80",
  },
];

const categorySales = [
  { name: "Smartphones", percent: 62, revenue: "QAR 742,000", color: "bg-brand-500" },
  { name: "Tablets", percent: 16, revenue: "QAR 191,400", color: "bg-blue-500" },
  { name: "Audio & ANC", percent: 12, revenue: "QAR 143,500", color: "bg-purple-500" },
  { name: "Wearables", percent: 7, revenue: "QAR 83,700", color: "bg-emerald-500" },
  { name: "Accessories", percent: 3, revenue: "QAR 35,900", color: "bg-amber-500" },
];

export default function AdminDashboard() {
  const [recentOrders, setRecentOrders] = useState<RecentOrder[]>(DEFAULT_RECENT_ORDERS);

  useEffect(() => {
    try {
      const savedOrders = localStorage.getItem("mobileshop_admin_orders");
      if (savedOrders) {
        const parsed = JSON.parse(savedOrders);
        if (Array.isArray(parsed) && parsed.length > 0) {
          const mapped: RecentOrder[] = parsed.slice(0, 5).map((o: any) => ({
            id: o.id,
            customer: o.customer,
            phone: o.phone,
            item: o.items?.[0]?.name || "Gadget Order",
            area: o.area,
            total: o.total,
            status: o.status,
            date: o.date,
          }));
          setRecentOrders(mapped);
        }
      }
    } catch {
      // Ignore
    }
  }, []);

  return (
    <AdminLayout>
      {/* Top Banner / Welcome */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span className="text-xs font-semibold text-emerald-600 uppercase tracking-wider font-mono">
              QATAR STORE LIVE · READY FOR DISPATCH
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-gray-900 tracking-tight">
            Admin Overview Console
          </h1>
          <p className="text-gray-500 text-sm mt-0.5">
            Real-time telemetry for MobileShop Qatar — Doha orders, inventory & campaigns
          </p>
        </div>

        {/* Quick actions */}
        <div className="flex items-center gap-2.5">
          <Link
            href="/admin/products"
            className="btn-primary text-xs font-semibold px-4 py-2.5 rounded-xl shadow-md inline-flex items-center gap-1.5"
          >
            <Plus size={15} />
            <span>Add Product</span>
          </Link>
          <Link
            href="/"
            target="_blank"
            className="bg-white hover:bg-gray-50 border border-gray-200 text-gray-700 text-xs font-semibold px-4 py-2.5 rounded-xl shadow-xs inline-flex items-center gap-1.5 transition-colors"
          >
            <ExternalLink size={14} />
            <span>Storefront</span>
          </Link>
        </div>
      </div>

      {/* Main KPI Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <div className="bg-white border border-gray-200/80 rounded-3xl p-5 shadow-card hover:shadow-lg transition-all">
          <div className="flex items-start justify-between mb-3">
            <div className="w-11 h-11 rounded-2xl bg-brand-50 text-brand-600 flex items-center justify-center shadow-xs">
              <TrendingUp size={20} />
            </div>
            <span className="flex items-center gap-1 text-xs font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full">
              <ArrowUp size={12} /> +18.4%
            </span>
          </div>
          <div className="text-2xl sm:text-3xl font-extrabold text-gray-900 font-sans tracking-tight">
            QAR 1,196,500
          </div>
          <div className="text-xs text-gray-500 font-medium mt-1">Total Store Sales (YTD)</div>
        </div>

        <div className="bg-white border border-gray-200/80 rounded-3xl p-5 shadow-card hover:shadow-lg transition-all">
          <div className="flex items-start justify-between mb-3">
            <div className="w-11 h-11 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center shadow-xs">
              <ShoppingCart size={20} />
            </div>
            <span className="flex items-center gap-1 text-xs font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full">
              <ArrowUp size={12} /> +12%
            </span>
          </div>
          <div className="text-2xl sm:text-3xl font-extrabold text-gray-900 font-sans tracking-tight">
            1,284
          </div>
          <div className="text-xs text-gray-500 font-medium mt-1">Fulfillments in Doha</div>
        </div>

        <div className="bg-white border border-gray-200/80 rounded-3xl p-5 shadow-card hover:shadow-lg transition-all">
          <div className="flex items-start justify-between mb-3">
            <div className="w-11 h-11 rounded-2xl bg-purple-50 text-purple-600 flex items-center justify-center shadow-xs">
              <Package size={20} />
            </div>
            <span className="text-xs font-bold text-purple-700 bg-purple-50 px-2 py-0.5 rounded-full">
              100% Agency
            </span>
          </div>
          <div className="text-2xl sm:text-3xl font-extrabold text-gray-900 font-sans tracking-tight">
            342
          </div>
          <div className="text-xs text-gray-500 font-medium mt-1">Active Catalog SKUs</div>
        </div>

        <div className="bg-white border border-gray-200/80 rounded-3xl p-5 shadow-card hover:shadow-lg transition-all">
          <div className="flex items-start justify-between mb-3">
            <div className="w-11 h-11 rounded-2xl bg-amber-50 text-amber-600 flex items-center justify-center shadow-xs">
              <Star size={20} />
            </div>
            <span className="flex items-center gap-1 text-xs font-bold text-amber-700 bg-amber-50 px-2 py-0.5 rounded-full">
              Verified
            </span>
          </div>
          <div className="text-2xl sm:text-3xl font-extrabold text-gray-900 font-sans tracking-tight">
            4.9 / 5.0
          </div>
          <div className="text-xs text-gray-500 font-medium mt-1">Customer Satisfaction Score</div>
        </div>
      </div>

      {/* Shortcuts Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        <Link
          href="/admin/products"
          className="bg-white border border-gray-200/90 rounded-2xl p-4 hover:border-brand-300 hover:shadow-md transition-all flex items-center gap-3 group cursor-pointer"
        >
          <div className="w-10 h-10 rounded-xl bg-brand-50 text-brand-600 flex items-center justify-center group-hover:scale-105 transition-transform">
            <Package size={18} />
          </div>
          <div className="min-w-0">
            <div className="text-xs font-bold text-gray-900 group-hover:text-brand-600 transition-colors">
              Manage Products
            </div>
            <div className="text-[11px] text-gray-400">Stock & Pricing</div>
          </div>
        </Link>

        <Link
          href="/admin/orders"
          className="bg-white border border-gray-200/90 rounded-2xl p-4 hover:border-blue-300 hover:shadow-md transition-all flex items-center gap-3 group cursor-pointer"
        >
          <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center group-hover:scale-105 transition-transform">
            <ShoppingCart size={18} />
          </div>
          <div className="min-w-0">
            <div className="text-xs font-bold text-gray-900 group-hover:text-blue-600 transition-colors">
              Customer Orders
            </div>
            <div className="text-[11px] text-gray-400">Express Dispatch</div>
          </div>
        </Link>

        <Link
          href="/admin/banners"
          className="bg-white border border-gray-200/90 rounded-2xl p-4 hover:border-purple-300 hover:shadow-md transition-all flex items-center gap-3 group cursor-pointer"
        >
          <div className="w-10 h-10 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center group-hover:scale-105 transition-transform">
            <Layers size={18} />
          </div>
          <div className="min-w-0">
            <div className="text-xs font-bold text-gray-900 group-hover:text-purple-600 transition-colors">
              Promos & Banners
            </div>
            <div className="text-[11px] text-gray-400">Hero Slider Deals</div>
          </div>
        </Link>

        <Link
          href="/admin/settings"
          className="bg-white border border-gray-200/90 rounded-2xl p-4 hover:border-emerald-300 hover:shadow-md transition-all flex items-center gap-3 group cursor-pointer"
        >
          <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center group-hover:scale-105 transition-transform">
            <MessageCircle size={18} />
          </div>
          <div className="min-w-0">
            <div className="text-xs font-bold text-gray-900 group-hover:text-emerald-600 transition-colors">
              WhatsApp Channel
            </div>
            <div className="text-[11px] text-gray-400">Storefront Setup</div>
          </div>
        </Link>
      </div>

      {/* Middle Section: Recent Orders & Category Sales Breakdown */}
      <div className="grid lg:grid-cols-12 gap-8 mb-8">
        {/* Recent Orders (7 cols) */}
        <div className="lg:col-span-8 bg-white border border-gray-200 rounded-3xl shadow-card overflow-hidden">
          <div className="flex items-center justify-between p-5 sm:p-6 border-b border-gray-100">
            <div>
              <h2 className="font-bold text-gray-900 text-base">Recent Qatar Orders</h2>
              <p className="text-xs text-gray-500 mt-0.5">Live orders awaiting or undergoing delivery</p>
            </div>
            <Link
              href="/admin/orders"
              className="text-xs text-brand-600 hover:text-brand-700 font-bold inline-flex items-center gap-1"
            >
              <span>View All</span>
              <ChevronRight size={14} />
            </Link>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="text-xs text-gray-400 uppercase border-b border-gray-100 bg-gray-50/70">
                  <th className="text-left px-5 py-3 font-medium">Order</th>
                  <th className="text-left px-5 py-3 font-medium">Customer</th>
                  <th className="text-left px-5 py-3 font-medium hidden sm:table-cell">Product</th>
                  <th className="text-left px-5 py-3 font-medium">Total</th>
                  <th className="text-left px-5 py-3 font-medium">Status</th>
                </tr>
              </thead>
              <tbody>
                {recentOrders.map((o) => (
                  <tr
                    key={o.id}
                    className="border-b border-gray-50 hover:bg-gray-50/60 transition-colors"
                  >
                    <td className="px-5 py-3.5">
                      <span className="font-mono text-xs font-bold text-gray-700">{o.id}</span>
                      <p className="text-[10px] text-gray-400">{o.date}</p>
                    </td>
                    <td className="px-5 py-3.5">
                      <div className="font-semibold text-gray-900 text-xs">{o.customer}</div>
                      <div className="text-[11px] text-gray-400">{o.area}</div>
                    </td>
                    <td className="px-5 py-3.5 text-xs text-gray-600 hidden sm:table-cell max-w-[180px] truncate">
                      {o.item}
                    </td>
                    <td className="px-5 py-3.5 font-bold text-gray-900 text-xs font-sans">
                      QAR {o.total.toLocaleString()}
                    </td>
                    <td className="px-5 py-3.5">
                      <span
                        className={`px-2.5 py-0.5 rounded-full text-[11px] font-semibold border capitalize ${
                          statusColor[o.status] || "bg-gray-100 text-gray-700"
                        }`}
                      >
                        {o.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Category Revenue Breakdown (4 cols) */}
        <div className="lg:col-span-4 bg-white border border-gray-200 rounded-3xl p-5 sm:p-6 shadow-card flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between pb-4 border-b border-gray-100 mb-4">
              <h2 className="font-bold text-gray-900 text-base">Category Sales</h2>
              <span className="text-xs font-bold text-brand-600">QAR 1.19M</span>
            </div>

            <div className="space-y-4">
              {categorySales.map((cat) => (
                <div key={cat.name}>
                  <div className="flex items-center justify-between text-xs mb-1.5">
                    <span className="font-semibold text-gray-800">{cat.name}</span>
                    <span className="text-gray-500 font-mono text-[11px]">{cat.revenue} ({cat.percent}%)</span>
                  </div>
                  <div className="w-full h-2 bg-gray-100 rounded-full overflow-hidden">
                    <div
                      className={`h-full rounded-full ${cat.color}`}
                      style={{ width: `${cat.percent}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-6 pt-4 border-t border-gray-100 bg-gray-50 -mx-5 -mb-5 sm:-mx-6 sm:-mb-6 p-4 rounded-b-3xl flex items-center justify-between text-xs text-gray-500">
            <span>Official Warranty Included</span>
            <span className="font-bold text-gray-900">100% Genuine</span>
          </div>
        </div>
      </div>

      {/* Bottom Section: Top Flagships in Qatar */}
      <div className="bg-white border border-gray-200 rounded-3xl p-6 shadow-card">
        <div className="flex items-center justify-between pb-4 border-b border-gray-100 mb-5">
          <div>
            <h2 className="font-bold text-gray-900 text-base">Top Selling Flagships</h2>
            <p className="text-xs text-gray-500">Highest volume smartphones and gadgets in Doha</p>
          </div>
          <Link
            href="/admin/products"
            className="text-xs font-bold text-brand-600 hover:text-brand-700"
          >
            Inventory List →
          </Link>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {topFlagships.map((f) => (
            <div
              key={f.name}
              className="p-4 rounded-2xl bg-gray-50 border border-gray-100 hover:border-gray-200 transition-all flex items-center gap-3.5"
            >
              <img
                src={f.image}
                alt={f.name}
                className="w-12 h-12 object-contain rounded-xl bg-white p-1 border border-gray-200/60 shrink-0"
              />
              <div className="min-w-0 flex-1">
                <div className="font-bold text-gray-900 text-xs truncate">{f.name}</div>
                <div className="text-[11px] text-emerald-600 font-semibold">{f.revenue}</div>
                <div className="text-[10px] text-gray-400 mt-0.5">
                  {f.units} sold · {f.stock} left in stock
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </AdminLayout>
  );
}
