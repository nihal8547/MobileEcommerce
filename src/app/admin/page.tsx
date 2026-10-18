import { AdminLayout } from "@/components/admin/AdminLayout";
import { Package, ShoppingCart, Users, TrendingUp, ArrowUp, ArrowDown } from "lucide-react";

const stats = [
  { label: "Total Orders", value: "1,284", change: "+12%", up: true, icon: ShoppingCart, color: "bg-blue-50 text-blue-600" },
  { label: "Products Active", value: "342", change: "+5", up: true, icon: Package, color: "bg-green-50 text-green-600" },
  { label: "Customers", value: "8,491", change: "+8%", up: true, icon: Users, color: "bg-purple-50 text-purple-600" },
  { label: "Revenue (QAR)", value: "184,392", change: "-3%", up: false, icon: TrendingUp, color: "bg-brand-50 text-brand-600" },
];

const recentOrders = [
  { id: "MSQ-847301", customer: "Ahmed Al-Rashid", item: "iPhone 16 Pro Max", total: 4799, status: "delivered" },
  { id: "MSQ-847302", customer: "Fatima Al-Kuwari", item: "Samsung S25 Ultra", total: 3999, status: "shipped" },
  { id: "MSQ-847303", customer: "Mohammed Al-Thani", item: "Sony WH-1000XM6", total: 1399, status: "processing" },
  { id: "MSQ-847304", customer: "Sara Al-Marri", item: "Apple Watch S10", total: 899, status: "processing" },
  { id: "MSQ-847305", customer: "Khalid Al-Attiyah", item: "iPad Pro M4", total: 3299, status: "delivered" },
];

const statusColor: Record<string, string> = {
  delivered: "bg-green-50 text-green-700 border-green-200",
  shipped: "bg-blue-50 text-blue-700 border-blue-200",
  processing: "bg-amber-50 text-amber-700 border-amber-200",
};

export default function AdminDashboard() {
  return (
    <AdminLayout>
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
        <p className="text-gray-500 text-sm mt-1">MobileShop Qatar — Overview</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {stats.map(({ label, value, change, up, icon: Icon, color }) => (
          <div key={label} className="bg-white border border-gray-200 rounded-2xl p-5 shadow-card">
            <div className="flex items-start justify-between mb-3">
              <div className={`w-10 h-10 rounded-xl ${color} flex items-center justify-center`}>
                <Icon size={18} />
              </div>
              <span className={`flex items-center gap-1 text-xs font-medium ${up ? "text-green-600" : "text-red-500"}`}>
                {up ? <ArrowUp size={11} /> : <ArrowDown size={11} />}
                {change}
              </span>
            </div>
            <div className="text-2xl font-bold text-gray-900">{value}</div>
            <div className="text-xs text-gray-500 mt-0.5">{label}</div>
          </div>
        ))}
      </div>

      {/* Recent orders */}
      <div className="bg-white border border-gray-200 rounded-2xl shadow-card overflow-hidden">
        <div className="flex items-center justify-between p-5 border-b border-gray-100">
          <h2 className="font-semibold text-gray-900">Recent Orders</h2>
          <a href="/admin/orders" className="text-sm text-brand-500 hover:underline font-medium">View all</a>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="text-xs text-gray-400 uppercase border-b border-gray-100">
                <th className="text-left px-5 py-3 font-medium">Order</th>
                <th className="text-left px-5 py-3 font-medium">Customer</th>
                <th className="text-left px-5 py-3 font-medium hidden md:table-cell">Product</th>
                <th className="text-left px-5 py-3 font-medium">Total</th>
                <th className="text-left px-5 py-3 font-medium">Status</th>
              </tr>
            </thead>
            <tbody>
              {recentOrders.map((o) => (
                <tr key={o.id} className="border-b border-gray-50 hover:bg-gray-50/50 transition-colors">
                  <td className="px-5 py-3.5 font-mono text-xs text-gray-600">{o.id}</td>
                  <td className="px-5 py-3.5 font-medium text-gray-900">{o.customer}</td>
                  <td className="px-5 py-3.5 text-gray-600 hidden md:table-cell">{o.item}</td>
                  <td className="px-5 py-3.5 font-semibold text-gray-900">QAR {o.total.toLocaleString()}</td>
                  <td className="px-5 py-3.5">
                    <span className={`px-2.5 py-1 rounded-full text-xs font-medium border capitalize ${statusColor[o.status]}`}>
                      {o.status}
                    </span>
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
