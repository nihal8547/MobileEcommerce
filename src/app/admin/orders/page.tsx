"use client";

import { useState, useEffect } from "react";
import { AdminLayout } from "@/components/admin/AdminLayout";
import {
  Search,
  ChevronDown,
  Download,
  Eye,
  MessageCircle,
  Phone,
  MapPin,
  Clock,
  CheckCircle,
  Truck,
  Package,
  Plus,
  X,
  CreditCard,
  Banknote,
  Calendar,
  AlertCircle,
  User,
} from "lucide-react";
import toast from "react-hot-toast";

interface OrderItem {
  id: string;
  name: string;
  priceQar: number;
  quantity: number;
  variant?: string;
  imageUrl?: string;
}

interface OrderRecord {
  id: string;
  customer: string;
  phone: string;
  area: string;
  address: string;
  delivery: "STANDARD" | "EXPRESS";
  method: "COD" | "ONLINE";
  status: "processing" | "shipped" | "delivered" | "cancelled";
  date: string;
  notes?: string;
  subtotalQar: number;
  deliveryFeeQar: number;
  total: number;
  items: OrderItem[];
}

const DEFAULT_ORDERS: OrderRecord[] = [
  {
    id: "MSQ-847301",
    customer: "Ahmed Al-Rashid",
    phone: "+974 6600 1234",
    area: "West Bay",
    address: "Tower 4, Floor 18, Diplomatic Area, West Bay",
    delivery: "EXPRESS",
    method: "COD",
    status: "delivered",
    date: "Today, 11:30 AM",
    notes: "Please call on mobile 10 minutes before arrival.",
    subtotalQar: 4799,
    deliveryFeeQar: 0,
    total: 4799,
    items: [
      {
        id: "it-1",
        name: "Apple iPhone 16 Pro Max 256GB — Desert Titanium",
        priceQar: 4799,
        quantity: 1,
        variant: "Desert Titanium · 256GB",
        imageUrl:
          "https://images.unsplash.com/photo-1592750475338-74b7b21085ab?auto=format&fit=crop&w=300&q=80",
      },
    ],
  },
  {
    id: "MSQ-847302",
    customer: "Fatima Al-Kuwari",
    phone: "+974 5544 5678",
    area: "The Pearl",
    address: "Porto Arabia, Tower 12, Apt 502",
    delivery: "STANDARD",
    method: "ONLINE",
    status: "shipped",
    date: "Today, 09:15 AM",
    notes: "Leave with building reception if not answering.",
    subtotalQar: 3999,
    deliveryFeeQar: 0,
    total: 3999,
    items: [
      {
        id: "it-2",
        name: "Samsung Galaxy S25 Ultra 512GB",
        priceQar: 3999,
        quantity: 1,
        variant: "Titanium Silver · 512GB",
        imageUrl:
          "https://images.unsplash.com/photo-1610945415295-d9bbf067e59c?auto=format&fit=crop&w=300&q=80",
      },
    ],
  },
  {
    id: "MSQ-847303",
    customer: "Mohammed Al-Thani",
    phone: "+974 7733 9012",
    area: "Lusail",
    address: "Fox Hills, Building 34, Villa 2",
    delivery: "EXPRESS",
    method: "COD",
    status: "processing",
    date: "Yesterday",
    notes: "Ring bell at main gate.",
    subtotalQar: 1399,
    deliveryFeeQar: 30,
    total: 1429,
    items: [
      {
        id: "it-3",
        name: "Sony WH-1000XM6 Wireless Noise Cancelling",
        priceQar: 1399,
        quantity: 1,
        variant: "Midnight Black",
        imageUrl:
          "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=300&q=80",
      },
    ],
  },
  {
    id: "MSQ-847304",
    customer: "Sara Al-Marri",
    phone: "+974 5511 3456",
    area: "Al Sadd",
    address: "Al Rayyan Road, Zone 39, St 820",
    delivery: "STANDARD",
    method: "COD",
    status: "processing",
    date: "Yesterday",
    subtotalQar: 899,
    deliveryFeeQar: 0,
    total: 899,
    items: [
      {
        id: "it-4",
        name: "Apple Watch Series 10 GPS 46mm",
        priceQar: 899,
        quantity: 1,
        variant: "Jet Black Aluminum",
        imageUrl:
          "https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=300&q=80",
      },
    ],
  },
  {
    id: "MSQ-847305",
    customer: "Khalid Al-Attiyah",
    phone: "+974 6622 7890",
    area: "Al Rayyan",
    address: "Near Education City, Compound 8, Villa 14",
    delivery: "STANDARD",
    method: "ONLINE",
    status: "delivered",
    date: "Oct 15, 2026",
    subtotalQar: 3299,
    deliveryFeeQar: 0,
    total: 3299,
    items: [
      {
        id: "it-5",
        name: "iPad Pro M4 11-inch 256GB Wi-Fi",
        priceQar: 3299,
        quantity: 1,
        variant: "Space Black",
        imageUrl:
          "https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?auto=format&fit=crop&w=300&q=80",
      },
    ],
  },
  {
    id: "MSQ-847306",
    customer: "Noura Al-Jaber",
    phone: "+974 5588 2345",
    area: "Al Wakrah",
    address: "Zone 90, Near Al Wakrah Hospital",
    delivery: "STANDARD",
    method: "COD",
    status: "cancelled",
    date: "Oct 14, 2026",
    notes: "Customer requested cancellation via WhatsApp.",
    subtotalQar: 1998,
    deliveryFeeQar: 0,
    total: 1998,
    items: [
      {
        id: "it-6",
        name: "AirPods Pro 2 USB-C + MagSafe Charger",
        priceQar: 1998,
        quantity: 2,
        variant: "White",
        imageUrl:
          "https://images.unsplash.com/photo-1600294037681-c80b4cb5b434?auto=format&fit=crop&w=300&q=80",
      },
    ],
  },
];

const STATUS_OPTIONS = ["all", "processing", "shipped", "delivered", "cancelled"] as const;
const STATUS_COLORS: Record<string, string> = {
  delivered: "bg-emerald-50 text-emerald-700 border-emerald-200",
  shipped: "bg-blue-50 text-blue-700 border-blue-200",
  processing: "bg-amber-50 text-amber-700 border-amber-200",
  cancelled: "bg-rose-50 text-rose-700 border-rose-200",
};

export default function AdminOrdersPage() {
  const [orders, setOrders] = useState<OrderRecord[]>([]);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [selectedOrder, setSelectedOrder] = useState<OrderRecord | null>(null);

  // Initialize from localStorage or default
  useEffect(() => {
    try {
      const saved = localStorage.getItem("mobileshop_admin_orders");
      if (saved) {
        setOrders(JSON.parse(saved));
        return;
      }
    } catch {
      // Ignore
    }
    setOrders(DEFAULT_ORDERS);
  }, []);

  const persistOrders = (updated: OrderRecord[]) => {
    setOrders(updated);
    try {
      localStorage.setItem("mobileshop_admin_orders", JSON.stringify(updated));
    } catch {
      // Ignore
    }
  };

  const updateStatus = (id: string, newStatus: OrderRecord["status"]) => {
    const updated = orders.map((o) => (o.id === id ? { ...o, status: newStatus } : o));
    persistOrders(updated);
    if (selectedOrder && selectedOrder.id === id) {
      setSelectedOrder({ ...selectedOrder, status: newStatus });
    }
    toast.success(`Order ${id} status updated to ${newStatus}`);
  };

  // Export orders to CSV
  const handleExportCSV = () => {
    const headers = ["Order ID", "Customer", "Phone", "Area", "Address", "Delivery", "Payment", "Status", "Total QAR", "Date"];
    const rows = orders.map((o) => [
      o.id,
      `"${o.customer}"`,
      `"${o.phone}"`,
      `"${o.area}"`,
      `"${o.address}"`,
      o.delivery,
      o.method,
      o.status,
      o.total,
      `"${o.date}"`,
    ]);

    const csvContent = "data:text/csv;charset=utf-8," + [headers.join(","), ...rows.map((e) => e.join(","))].join("\n");
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `mobileshop-qatar-orders-${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    toast.success("Orders CSV exported successfully!");
  };

  // Filter orders
  const filtered = orders.filter((o) => {
    const matchesSearch =
      o.id.toLowerCase().includes(search.toLowerCase()) ||
      o.customer.toLowerCase().includes(search.toLowerCase()) ||
      o.phone.includes(search) ||
      o.area.toLowerCase().includes(search.toLowerCase());

    const matchesStatus = statusFilter === "all" || o.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  // Calculate metrics
  const totalRevenue = orders
    .filter((o) => o.status !== "cancelled")
    .reduce((sum, o) => sum + o.total, 0);
  const processingCount = orders.filter((o) => o.status === "processing").length;
  const deliveredCount = orders.filter((o) => o.status === "delivered").length;

  return (
    <AdminLayout>
      {/* Title & Top Action */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Orders Management</h1>
          <p className="text-gray-500 text-sm mt-0.5">
            Track, fulfill, and contact Qatar customers via WhatsApp and Express dispatch
          </p>
        </div>
        <div className="flex items-center gap-3">
          <button
            onClick={handleExportCSV}
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl border border-gray-200 bg-white hover:bg-gray-50 text-gray-700 text-sm font-semibold transition-all shadow-xs cursor-pointer"
          >
            <Download size={16} />
            <span>Export CSV</span>
          </button>
        </div>
      </div>

      {/* Metrics Banner */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <div className="bg-white border border-gray-200/80 rounded-2xl p-4 shadow-xs">
          <span className="text-xs text-gray-500 font-medium">Delivered Revenue</span>
          <div className="text-2xl font-bold text-gray-900 mt-1">QAR {totalRevenue.toLocaleString()}</div>
          <span className="text-[11px] text-emerald-600 font-medium">Valid orders processed</span>
        </div>
        <div className="bg-white border border-gray-200/80 rounded-2xl p-4 shadow-xs">
          <span className="text-xs text-gray-500 font-medium">Pending Dispatch</span>
          <div className="text-2xl font-bold text-amber-600 mt-1">{processingCount}</div>
          <span className="text-[11px] text-gray-500">Requires packaging & courier</span>
        </div>
        <div className="bg-white border border-gray-200/80 rounded-2xl p-4 shadow-xs">
          <span className="text-xs text-gray-500 font-medium">Completed Deliveries</span>
          <div className="text-2xl font-bold text-blue-600 mt-1">{deliveredCount}</div>
          <span className="text-[11px] text-gray-500">Satisfied Doha buyers</span>
        </div>
        <div className="bg-white border border-gray-200/80 rounded-2xl p-4 shadow-xs">
          <span className="text-xs text-gray-500 font-medium">Total Orders</span>
          <div className="text-2xl font-bold text-gray-900 mt-1">{orders.length}</div>
          <span className="text-[11px] text-gray-500">COD & Online combined</span>
        </div>
      </div>

      {/* Search & Filter Bar */}
      <div className="bg-white border border-gray-200 rounded-2xl p-4 mb-6 shadow-xs flex flex-col md:flex-row gap-3 items-stretch md:items-center justify-between">
        <div className="relative flex-1 min-w-[240px]">
          <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Search by Order ID, customer, phone, or Doha area..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-brand-500 focus:ring-2 focus:ring-brand-100 transition-all"
          />
        </div>

        {/* Status Filter Tabs */}
        <div className="flex gap-1.5 flex-wrap">
          {STATUS_OPTIONS.map((s) => (
            <button
              key={s}
              onClick={() => setStatusFilter(s)}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all capitalize cursor-pointer ${
                statusFilter === s
                  ? "bg-brand-500 text-white shadow-xs"
                  : "border border-gray-200 text-gray-600 hover:bg-gray-50 bg-white"
              }`}
            >
              {s}
            </button>
          ))}
        </div>
      </div>

      {/* Orders Table */}
      <div className="bg-white border border-gray-200 rounded-2xl shadow-card overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="text-xs text-gray-400 uppercase border-b border-gray-100 bg-gray-50/70">
                <th className="text-left px-5 py-3.5 font-medium">Order ID</th>
                <th className="text-left px-5 py-3.5 font-medium">Customer</th>
                <th className="text-left px-5 py-3.5 font-medium hidden lg:table-cell">Area</th>
                <th className="text-left px-5 py-3.5 font-medium hidden md:table-cell">Delivery</th>
                <th className="text-left px-5 py-3.5 font-medium">Total</th>
                <th className="text-left px-5 py-3.5 font-medium hidden sm:table-cell">Payment</th>
                <th className="text-left px-5 py-3.5 font-medium">Status</th>
                <th className="text-center px-5 py-3.5 font-medium">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filtered.length === 0 ? (
                <tr>
                  <td colSpan={8} className="px-5 py-12 text-center text-gray-400">
                    <Package size={32} className="mx-auto mb-2 opacity-50" />
                    <p className="font-medium text-gray-600">No orders match the filter</p>
                    <p className="text-xs text-gray-400 mt-1">Try selecting 'all' or clearing search</p>
                  </td>
                </tr>
              ) : (
                filtered.map((order) => {
                  const whatsappUrl = `https://wa.me/${order.phone.replace(/[^0-9]/g, "")}?text=${encodeURIComponent(
                    `Salam ${order.customer}, this is MobileShop Qatar regarding your order #${order.id}.`
                  )}`;

                  return (
                    <tr
                      key={order.id}
                      className="border-b border-gray-50 hover:bg-gray-50/60 transition-colors"
                    >
                      {/* ID & Date */}
                      <td className="px-5 py-4">
                        <button
                          onClick={() => setSelectedOrder(order)}
                          className="font-mono text-xs font-bold text-brand-600 hover:underline cursor-pointer"
                        >
                          {order.id}
                        </button>
                        <p className="text-xs text-gray-400 mt-0.5">{order.date}</p>
                      </td>

                      {/* Customer */}
                      <td className="px-5 py-4">
                        <p className="font-semibold text-gray-900 leading-tight">{order.customer}</p>
                        <div className="flex items-center gap-2 mt-1">
                          <span className="text-xs text-gray-500 font-mono">{order.phone}</span>
                          <a
                            href={whatsappUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            title="Chat on WhatsApp"
                            className="text-emerald-600 hover:text-emerald-700 inline-flex items-center"
                          >
                            <MessageCircle size={14} />
                          </a>
                        </div>
                      </td>

                      {/* Area */}
                      <td className="px-5 py-4 text-gray-600 hidden lg:table-cell">
                        <div className="flex items-center gap-1.5 font-medium">
                          <MapPin size={13} className="text-gray-400 shrink-0" />
                          <span>{order.area}</span>
                        </div>
                      </td>

                      {/* Delivery Type */}
                      <td className="px-5 py-4 hidden md:table-cell">
                        <span
                          className={`px-2.5 py-1 rounded-full text-[11px] font-semibold ${
                            order.delivery === "EXPRESS"
                              ? "bg-purple-50 text-purple-700 border border-purple-200"
                              : "bg-gray-100 text-gray-700"
                          }`}
                        >
                          {order.delivery === "EXPRESS" ? "⚡ Express" : "Standard"}
                        </span>
                      </td>

                      {/* Total */}
                      <td className="px-5 py-4 font-semibold text-gray-900 font-sans">
                        QAR {order.total.toLocaleString()}
                      </td>

                      {/* Payment */}
                      <td className="px-5 py-4 hidden sm:table-cell">
                        <span
                          className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-medium ${
                            order.method === "ONLINE"
                              ? "bg-blue-50 text-blue-700 border border-blue-200"
                              : "bg-amber-50 text-amber-700 border border-amber-200"
                          }`}
                        >
                          {order.method === "ONLINE" ? (
                            <>
                              <CreditCard size={11} /> Card
                            </>
                          ) : (
                            <>
                              <Banknote size={11} /> COD
                            </>
                          )}
                        </span>
                      </td>

                      {/* Status Dropdown */}
                      <td className="px-5 py-4">
                        <div className="relative inline-block">
                          <select
                            value={order.status}
                            onChange={(e) => updateStatus(order.id, e.target.value as OrderRecord["status"])}
                            className={`pl-2.5 pr-6 py-1.5 rounded-full text-xs font-semibold border appearance-none cursor-pointer focus:outline-none capitalize transition-colors ${
                              STATUS_COLORS[order.status]
                            }`}
                          >
                            {STATUS_OPTIONS.filter((s) => s !== "all").map((s) => (
                              <option key={s} value={s} className="text-gray-900 bg-white">
                                {s}
                              </option>
                            ))}
                          </select>
                          <ChevronDown
                            size={11}
                            className="absolute right-2 top-1/2 -translate-y-1/2 pointer-events-none opacity-60"
                          />
                        </div>
                      </td>

                      {/* View Action */}
                      <td className="px-5 py-4 text-center">
                        <button
                          onClick={() => setSelectedOrder(order)}
                          className="p-1.5 rounded-lg hover:bg-gray-100 text-gray-500 hover:text-gray-900 transition-colors cursor-pointer"
                          title="View Order Details"
                        >
                          <Eye size={16} />
                        </button>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* ORDER DETAILS MODAL */}
      {selectedOrder && (
        <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4 backdrop-blur-xs overflow-y-auto">
          <div className="bg-white rounded-3xl max-w-xl w-full p-6 sm:p-8 shadow-2xl border border-gray-100 my-8 relative">
            <button
              onClick={() => setSelectedOrder(null)}
              className="absolute top-5 right-5 p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-xl"
            >
              <X size={18} />
            </button>

            {/* Header */}
            <div className="pb-4 border-b border-gray-100 mb-6">
              <div className="flex items-center gap-2">
                <span className="font-mono text-lg font-bold text-gray-900">{selectedOrder.id}</span>
                <span
                  className={`px-2.5 py-0.5 rounded-full text-xs font-semibold capitalize ${
                    STATUS_COLORS[selectedOrder.status]
                  }`}
                >
                  {selectedOrder.status}
                </span>
              </div>
              <p className="text-xs text-gray-400 mt-1">Placed on {selectedOrder.date}</p>
            </div>

            {/* Customer & Delivery Information */}
            <div className="grid grid-cols-2 gap-4 mb-6">
              <div className="bg-gray-50 rounded-2xl p-4">
                <span className="text-[11px] font-semibold text-gray-400 uppercase tracking-wider block mb-2">
                  Customer
                </span>
                <p className="font-bold text-gray-900 text-sm">{selectedOrder.customer}</p>
                <p className="text-xs text-gray-600 mt-1 font-mono">{selectedOrder.phone}</p>
                <div className="mt-3">
                  <a
                    href={`https://wa.me/${selectedOrder.phone.replace(/[^0-9]/g, "")}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-emerald-500 hover:bg-emerald-600 text-white text-xs font-semibold transition-colors"
                  >
                    <MessageCircle size={13} />
                    WhatsApp Customer
                  </a>
                </div>
              </div>

              <div className="bg-gray-50 rounded-2xl p-4">
                <span className="text-[11px] font-semibold text-gray-400 uppercase tracking-wider block mb-2">
                  Delivery Destination
                </span>
                <p className="font-bold text-gray-900 text-sm">{selectedOrder.area}, Qatar</p>
                <p className="text-xs text-gray-600 mt-1 leading-relaxed">{selectedOrder.address}</p>
                <span className="inline-block mt-2 px-2 py-0.5 rounded-md text-[10px] font-bold bg-purple-100 text-purple-700 uppercase">
                  {selectedOrder.delivery} Delivery
                </span>
              </div>
            </div>

            {/* Ordered Items */}
            <div className="mb-6">
              <span className="text-xs font-semibold text-gray-400 uppercase tracking-wider block mb-3">
                Items ({selectedOrder.items.length})
              </span>
              <div className="divide-y divide-gray-100 border border-gray-100 rounded-2xl overflow-hidden">
                {selectedOrder.items.map((item) => (
                  <div key={item.id} className="p-3.5 flex items-center justify-between gap-3 bg-white">
                    <div className="flex items-center gap-3">
                      {item.imageUrl && (
                        <img
                          src={item.imageUrl}
                          alt={item.name}
                          className="w-10 h-10 rounded-lg object-contain bg-gray-50 border border-gray-100 p-1 shrink-0"
                        />
                      )}
                      <div>
                        <p className="text-xs font-semibold text-gray-900 leading-tight">{item.name}</p>
                        {item.variant && <p className="text-[11px] text-gray-400">{item.variant}</p>}
                      </div>
                    </div>
                    <div className="text-right shrink-0">
                      <p className="text-xs font-bold text-gray-900">
                        QAR {(item.priceQar * item.quantity).toLocaleString()}
                      </p>
                      <p className="text-[10px] text-gray-400">Qty: {item.quantity}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Price Breakdown */}
            <div className="bg-gray-50 rounded-2xl p-4 mb-6 text-xs space-y-2">
              <div className="flex justify-between text-gray-600">
                <span>Subtotal</span>
                <span className="font-semibold text-gray-900">
                  QAR {selectedOrder.subtotalQar.toLocaleString()}
                </span>
              </div>
              <div className="flex justify-between text-gray-600">
                <span>Delivery Fee</span>
                <span className="font-semibold text-gray-900">
                  {selectedOrder.deliveryFeeQar === 0 ? "FREE" : `QAR ${selectedOrder.deliveryFeeQar}`}
                </span>
              </div>
              <div className="flex justify-between text-gray-900 font-bold text-sm pt-2 border-t border-gray-200">
                <span>Total Amount</span>
                <span className="text-brand-600">QAR {selectedOrder.total.toLocaleString()}</span>
              </div>
              <div className="flex justify-between text-gray-500 pt-1 text-[11px]">
                <span>Payment Method</span>
                <span className="font-medium text-gray-700">
                  {selectedOrder.method === "COD" ? "Cash on Delivery" : "Online Card Payment"}
                </span>
              </div>
            </div>

            {/* Order Notes */}
            {selectedOrder.notes && (
              <div className="mb-6 p-3 rounded-xl bg-amber-50/70 border border-amber-200/60 text-xs text-amber-800 flex items-start gap-2">
                <AlertCircle size={15} className="shrink-0 mt-0.5 text-amber-600" />
                <span>
                  <strong>Customer Note:</strong> {selectedOrder.notes}
                </span>
              </div>
            )}

            {/* Status change in modal */}
            <div className="flex items-center justify-between pt-4 border-t border-gray-100">
              <div className="flex items-center gap-2">
                <span className="text-xs text-gray-500 font-medium">Update Status:</span>
                <select
                  value={selectedOrder.status}
                  onChange={(e) => updateStatus(selectedOrder.id, e.target.value as OrderRecord["status"])}
                  className="px-3 py-1.5 border border-gray-200 rounded-xl text-xs font-semibold bg-white text-gray-800 capitalize focus:outline-none focus:border-brand-500"
                >
                  {STATUS_OPTIONS.filter((s) => s !== "all").map((s) => (
                    <option key={s} value={s}>
                      {s}
                    </option>
                  ))}
                </select>
              </div>

              <button
                onClick={() => setSelectedOrder(null)}
                className="px-4 py-2 text-xs font-semibold text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-xl transition-colors cursor-pointer"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </AdminLayout>
  );
}
