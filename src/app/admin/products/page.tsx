"use client";

import { AdminLayout } from "@/components/admin/AdminLayout";
import { useState } from "react";
import { Plus, Search, Edit2, Trash2, Eye, ToggleLeft, ToggleRight } from "lucide-react";

const MOCK_PRODUCTS = [
  { id: "1", name: "iPhone 16 Pro Max 256GB", category: "Smartphones", brand: "Apple", price: 4799, stock: 12, active: true, featured: true, image: "📱" },
  { id: "2", name: "Samsung Galaxy S25 Ultra", category: "Smartphones", brand: "Samsung", price: 3999, stock: 8, active: true, featured: true, image: "📱" },
  { id: "3", name: "Sony WH-1000XM6", category: "Audio", brand: "Sony", price: 1399, stock: 25, active: true, featured: false, image: "🎧" },
  { id: "4", name: "Apple Watch Series 10", category: "Wearables", brand: "Apple", price: 899, stock: 15, active: true, featured: false, image: "⌚" },
  { id: "5", name: "iPad Pro M4 11\"", category: "Tablets", brand: "Apple", price: 3299, stock: 6, active: false, featured: false, image: "📟" },
  { id: "6", name: "AirPods Pro 3", category: "Audio", brand: "Apple", price: 999, stock: 30, active: true, featured: true, image: "🎧" },
];

export default function AdminProductsPage() {
  const [search, setSearch] = useState("");
  const [products, setProducts] = useState(MOCK_PRODUCTS);

  const filtered = products.filter(
    (p) =>
      p.name.toLowerCase().includes(search.toLowerCase()) ||
      p.category.toLowerCase().includes(search.toLowerCase()) ||
      p.brand.toLowerCase().includes(search.toLowerCase())
  );

  const toggleActive = (id: string) =>
    setProducts((prev) => prev.map((p) => (p.id === id ? { ...p, active: !p.active } : p)));

  const toggleFeatured = (id: string) =>
    setProducts((prev) => prev.map((p) => (p.id === id ? { ...p, featured: !p.featured } : p)));

  return (
    <AdminLayout>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Products</h1>
          <p className="text-gray-500 text-sm mt-1">{products.length} total products</p>
        </div>
        <button className="btn-primary flex items-center gap-2 px-4 py-2.5 text-sm">
          <Plus size={16} /> Add Product
        </button>
      </div>

      {/* Search + filters */}
      <div className="bg-white border border-gray-200 rounded-2xl p-4 mb-4 shadow-card">
        <div className="relative">
          <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Search products..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-brand-400 focus:ring-2 focus:ring-brand-100 transition-all"
          />
        </div>
      </div>

      {/* Table */}
      <div className="bg-white border border-gray-200 rounded-2xl shadow-card overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="text-xs text-gray-400 uppercase border-b border-gray-100 bg-gray-50">
                <th className="text-left px-5 py-3 font-medium">Product</th>
                <th className="text-left px-5 py-3 font-medium hidden lg:table-cell">Category</th>
                <th className="text-left px-5 py-3 font-medium">Price</th>
                <th className="text-left px-5 py-3 font-medium hidden md:table-cell">Stock</th>
                <th className="text-center px-5 py-3 font-medium">Active</th>
                <th className="text-center px-5 py-3 font-medium hidden md:table-cell">Featured</th>
                <th className="text-center px-5 py-3 font-medium">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((product) => (
                <tr key={product.id} className="border-b border-gray-50 hover:bg-gray-50/50 transition-colors">
                  <td className="px-5 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-gray-100 flex items-center justify-center text-xl shrink-0">
                        {product.image}
                      </div>
                      <div>
                        <p className="font-medium text-gray-900 leading-tight">{product.name}</p>
                        <p className="text-xs text-gray-400">{product.brand}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-5 py-4 text-gray-600 hidden lg:table-cell">{product.category}</td>
                  <td className="px-5 py-4 font-semibold text-gray-900">QAR {product.price.toLocaleString()}</td>
                  <td className="px-5 py-4 hidden md:table-cell">
                    <span className={`font-medium ${product.stock < 10 ? "text-red-500" : "text-green-600"}`}>
                      {product.stock}
                    </span>
                  </td>
                  <td className="px-5 py-4 text-center">
                    <button onClick={() => toggleActive(product.id)}>
                      {product.active
                        ? <ToggleRight size={22} className="text-green-500 mx-auto" />
                        : <ToggleLeft size={22} className="text-gray-300 mx-auto" />
                      }
                    </button>
                  </td>
                  <td className="px-5 py-4 text-center hidden md:table-cell">
                    <button onClick={() => toggleFeatured(product.id)}>
                      {product.featured
                        ? <ToggleRight size={22} className="text-brand-500 mx-auto" />
                        : <ToggleLeft size={22} className="text-gray-300 mx-auto" />
                      }
                    </button>
                  </td>
                  <td className="px-5 py-4">
                    <div className="flex items-center justify-center gap-2">
                      <button className="p-1.5 rounded-lg hover:bg-gray-100 text-gray-400 hover:text-gray-700 transition-colors">
                        <Eye size={15} />
                      </button>
                      <button className="p-1.5 rounded-lg hover:bg-blue-50 text-gray-400 hover:text-blue-600 transition-colors">
                        <Edit2 size={15} />
                      </button>
                      <button className="p-1.5 rounded-lg hover:bg-red-50 text-gray-400 hover:text-red-500 transition-colors">
                        <Trash2 size={15} />
                      </button>
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
