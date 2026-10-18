"use client";

import { AdminLayout } from "@/components/admin/AdminLayout";
import { useState } from "react";
import { Search, ChevronDown } from "lucide-react";

const MOCK_ORDERS = [
  { id: "MSQ-847301", customer: "Ahmed Al-Rashid", phone: "+974 6600 1234", area: "West Bay", items: 1, total: 4799, method: "COD", delivery: "EXPRESS", status: "delivered", date: "Oct 12, 2026" },
  { id: "MSQ-847302", customer: "Fatima Al-Kuwari", phone: "+974 5544 5678", area: "Al Sadd", items: 2, total: 3999, method: "ONLINE", delivery: "STANDARD", status: "shipped", date: "Oct 12, 2026" },
  { id: "MSQ-847303", customer: "Mohammed Al-Thani", phone: "+974 7733 9012", area: "Lusail", items: 1, total: 1399, method: "COD", delivery: "STANDARD", status: "processing", date: "Oct 11, 2026" },
  { id: "MSQ-847304", customer: "Sara Al-Marri", phone: "+974 5511 3456", area: "Al Nasr", items: 3, total: 899, method: "COD", delivery: "EXPRESS", status: "processing", date: "Oct 11, 2026" },
  { id: "MSQ-847305", customer: "Khalid Al-Attiyah", phone: "+974 6622 7890", area: "Madinat Khalifa", items: 1, total: 3299, method: "ONLINE", delivery: "STANDARD", status: "delivered", date: "Oct 10, 2026" },
  { id: "MSQ-847306", customer: "Noura Al-Jaber", phone: "+974 5588 2345", area: "Al Hilal", items: 2, total: 1998, method: "COD", delivery: "STANDARD", status: "cancelled", date: "Oct 9, 2026" },
];

const STATUS_OPTIONS = ["all", "processing", "shipped", "delivered", "cancelled"];
const STATUS_COLORS: Record<string, string> = {
  delivered: "bg-green-50 text-green-700 border-green-200",
  shipped: "bg-blue-50 text-blue-700 border-blue-200",
  processing: "bg-amber-50 text-amber-700 border-amber-200",
  cancelled: "bg-red-50 text-red-700 border-red-200",
};

export default function AdminOrdersPage() {
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [orders, setOrders] = useState(MOCK_ORDERS);

  const filtered = orders.filter((o) => {
    const matchSearch =
      o.id.toLowerCase().includes(search.toLowerCase()) ||
      o.customer.toLowerCase().includes(search.toLowerCase());
    const matchStatus = statusFilter === "all" || o.status === statusFilter;
    return matchSearch && matchStatus;
  });

  const updateStatus = (id: string, status: string) =>
    setOrders((prev) => prev.map((o) => (o.id === id ? { ...o, status } : o)));

  return (
    <AdminLayout>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Orders</h1>
          <p className="text-gray-500 text-sm mt-1">{orders.length} total orders</p>
        </div>
        <button className="px-4 py-2.5 border border-gray-200 rounded-xl text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors">
          Export CSV
        </button>
      </div>

      {/* Filters */}
      <div className="bg-white border border-gray-200 rounded-2xl p-4 mb-4 shadow-card flex flex-wrap gap-3">
        <div className="relative flex-1 min-w-48">
          <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Search orders..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-brand-400 focus:ring-2 focus:ring-brand-100 transition-all"
          />
        </div>
        <div className="flex gap-1.5 flex-wrap">
          {STATUS_OPTIONS.map((s) => (
            <button
              key={s}
              onClick={() => setStatusFilter(s)}
              className={`px-3.5 py-2 rounded-xl text-sm font-medium transition-colors capitalize ${
                statusFilter === s
                  ? "bg-brand-500 text-white"
                  : "border border-gray-200 text-gray-600 hover:bg-gray-50"
              }`}
            >
              {s}
            </button>
          ))}
        </div>
      </div>

      {/* Table */}
      <div className="bg-white border border-gray-200 rounded-2xl shadow-card overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="text-xs text-gray-400 uppercase border-b border-gray-100 bg-gray-50">
                <th className="text-left px-5 py-3 font-medium">Order ID</th>
                <th className="text-left px-5 py-3 font-medium">Customer</th>
                <th className="text-left px-5 py-3 font-medium hidden lg:table-cell">Area</th>
                <th className="text-left px-5 py-3 font-medium hidden md:table-cell">Delivery</th>
                <th className="text-left px-5 py-3 font-medium">Total</th>
                <th className="text-left px-5 py-3 font-medium hidden md:table-cell">Payment</th>
                <th className="text-left px-5 py-3 font-medium">Status</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((order) => (
                <tr key={order.id} className="border-b border-gray-50 hover:bg-gray-50/50 transition-colors">
                  <td className="px-5 py-4">
                    <p className="font-mono text-xs text-gray-600">{order.id}</p>
                    <p className="text-xs text-gray-400 mt-0.5">{order.date}</p>
                  </td>
                  <td className="px-5 py-4">
                    <p className="font-medium text-gray-900">{order.customer}</p>
                    <p className="text-xs text-gray-400">{order.phone}</p>
                  </td>
                  <td className="px-5 py-4 text-gray-600 hidden lg:table-cell">{order.area}</td>
                  <td className="px-5 py-4 hidden md:table-cell">
                    <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${
                      order.delivery === "EXPRESS"
                        ? "bg-purple-50 text-purple-700 border border-purple-200"
                        : "bg-gray-50 text-gray-600 border border-gray-200"
                    }`}>
                      {order.delivery}
                    </span>
                  </td>
                  <td className="px-5 py-4 font-semibold text-gray-900">QAR {order.total.toLocaleString()}</td>
                  <td className="px-5 py-4 hidden md:table-cell">
                    <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${
                      order.method === "ONLINE"
                        ? "bg-blue-50 text-blue-700 border border-blue-200"
                        : "bg-gray-50 text-gray-600 border border-gray-200"
                    }`}>
                      {order.method}
                    </span>
                  </td>
                  <td className="px-5 py-4">
                    <div className="relative">
                      <select
                        value={order.status}
                        onChange={(e) => updateStatus(order.id, e.target.value)}
                        className={`pl-2.5 pr-7 py-1.5 rounded-full text-xs font-medium border appearance-none cursor-pointer focus:outline-none capitalize ${STATUS_COLORS[order.status]}`}
                      >
                        {STATUS_OPTIONS.filter((s) => s !== "all").map((s) => (
                          <option key={s} value={s} className="text-gray-900 bg-white">{s}</option>
                        ))}
                      </select>
                      <ChevronDown size={11} className="absolute right-2 top-1/2 -translate-y-1/2 pointer-events-none opacity-60" />
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </AdminLayout>
  );
}
