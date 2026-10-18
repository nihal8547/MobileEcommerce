"use client";

import { useState, useEffect } from "react";
import { AdminLayout } from "@/components/admin/AdminLayout";
import { CATALOG_PRODUCTS } from "@/lib/products-catalog";
import {
  Plus,
  Search,
  Edit2,
  Trash2,
  Eye,
  ToggleLeft,
  ToggleRight,
  Filter,
  CheckCircle2,
  AlertTriangle,
  X,
  Package,
  Sparkles,
  ExternalLink,
  ShieldCheck,
  TrendingUp,
} from "lucide-react";
import toast from "react-hot-toast";

interface AdminProductItem {
  id: string;
  slug: string;
  name: string;
  category: string;
  brand: string;
  priceQar: number;
  originalPriceQar?: number;
  stockQty: number;
  isActive: boolean;
  isFeatured: boolean;
  imageUrl: string;
  warranty?: string;
  description?: string;
}

const CATEGORIES = ["All", "Smartphones", "Tablets", "Audio", "Wearables", "Accessories"];
const BRANDS = ["All", "Apple", "Samsung", "Sony", "Google", "OnePlus", "Anker"];

export default function AdminProductsPage() {
  const [products, setProducts] = useState<AdminProductItem[]>([]);
  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedBrand, setSelectedBrand] = useState("All");
  const [stockFilter, setStockFilter] = useState<"all" | "low" | "out">("all");

  // Modal States
  const [isAddOpen, setIsAddOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<AdminProductItem | null>(null);
  const [viewingProduct, setViewingProduct] = useState<AdminProductItem | null>(null);
  const [deleteConfirmId, setDeleteConfirmId] = useState<string | null>(null);

  // Form State for Add / Edit
  const [formData, setFormData] = useState({
    name: "",
    category: "Smartphones",
    brand: "Apple",
    priceQar: 999,
    originalPriceQar: 1199,
    stockQty: 10,
    imageUrl: "",
    warranty: "Official Qatar 1-Year Warranty",
    description: "",
    isActive: true,
    isFeatured: false,
  });

  // Initialize products from localStorage or catalog
  useEffect(() => {
    try {
      const saved = localStorage.getItem("mobileshop_admin_products");
      if (saved) {
        setProducts(JSON.parse(saved));
        return;
      }
    } catch {
      // Ignore
    }

    // Default seed from CATALOG_PRODUCTS
    const initialList: AdminProductItem[] = Object.values(CATALOG_PRODUCTS).map((p) => ({
      id: p.id,
      slug: p.slug,
      name: p.name,
      category: p.category?.name || "Smartphones",
      brand: p.brand?.name || "Apple",
      priceQar: p.priceQar,
      originalPriceQar: p.originalPriceQar,
      stockQty: p.stockQty,
      isActive: p.isActive,
      isFeatured: p.isFeatured,
      imageUrl: p.images[0]?.url || "https://images.unsplash.com/photo-1592750475338-74b7b21085ab?auto=format&fit=crop&w=600&q=80",
      warranty: "1 Year Official Qatar Warranty",
      description: p.description,
    }));

    setProducts(initialList);
  }, []);

  // Save to localStorage whenever products change
  const persistProducts = (updated: AdminProductItem[]) => {
    setProducts(updated);
    try {
      localStorage.setItem("mobileshop_admin_products", JSON.stringify(updated));
    } catch {
      // Ignore
    }
  };

  // Toggle handlers
  const toggleActive = (id: string) => {
    const updated = products.map((p) => (p.id === id ? { ...p, isActive: !p.isActive } : p));
    persistProducts(updated);
    toast.success("Product visibility updated");
  };

  const toggleFeatured = (id: string) => {
    const updated = products.map((p) => (p.id === id ? { ...p, isFeatured: !p.isFeatured } : p));
    persistProducts(updated);
    toast.success("Featured status updated");
  };

  // Delete product
  const handleDelete = (id: string) => {
    const updated = products.filter((p) => p.id !== id);
    persistProducts(updated);
    setDeleteConfirmId(null);
    toast.success("Product deleted successfully");
  };

  // Open Edit Modal
  const openEditModal = (p: AdminProductItem) => {
    setEditingProduct(p);
    setFormData({
      name: p.name,
      category: p.category,
      brand: p.brand,
      priceQar: p.priceQar,
      originalPriceQar: p.originalPriceQar || p.priceQar,
      stockQty: p.stockQty,
      imageUrl: p.imageUrl,
      warranty: p.warranty || "1 Year Qatar Agency Warranty",
      description: p.description || "",
      isActive: p.isActive,
      isFeatured: p.isFeatured,
    });
  };

  // Save Add or Edit
  const handleSaveProduct = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name.trim()) {
      toast.error("Please enter product name");
      return;
    }

    const defaultImg =
      formData.imageUrl.trim() ||
      "https://images.unsplash.com/photo-1592750475338-74b7b21085ab?auto=format&fit=crop&w=600&q=80";

    if (editingProduct) {
      // Update existing
      const updated = products.map((p) =>
        p.id === editingProduct.id
          ? {
              ...p,
              name: formData.name,
              category: formData.category,
              brand: formData.brand,
              priceQar: Number(formData.priceQar),
              originalPriceQar: Number(formData.originalPriceQar),
              stockQty: Number(formData.stockQty),
              imageUrl: defaultImg,
              warranty: formData.warranty,
              description: formData.description,
              isActive: formData.isActive,
              isFeatured: formData.isFeatured,
            }
          : p
      );
      persistProducts(updated);
      setEditingProduct(null);
      toast.success("Product updated successfully!");
    } else {
      // Add new
      const newSlug = formData.name.toLowerCase().replace(/[^a-z0-9]+/g, "-");
      const newProduct: AdminProductItem = {
        id: "prod-" + Date.now(),
        slug: newSlug,
        name: formData.name,
        category: formData.category,
        brand: formData.brand,
        priceQar: Number(formData.priceQar),
        originalPriceQar: Number(formData.originalPriceQar),
        stockQty: Number(formData.stockQty),
        imageUrl: defaultImg,
        warranty: formData.warranty,
        description: formData.description,
        isActive: formData.isActive,
        isFeatured: formData.isFeatured,
      };
      persistProducts([newProduct, ...products]);
      setIsAddOpen(false);
      toast.success("New product added to catalog!");
    }
  };

  // Filter products
  const filtered = products.filter((p) => {
    const matchesSearch =
      p.name.toLowerCase().includes(search.toLowerCase()) ||
      p.brand.toLowerCase().includes(search.toLowerCase()) ||
      p.category.toLowerCase().includes(search.toLowerCase());

    const matchesCategory = selectedCategory === "All" || p.category.toLowerCase() === selectedCategory.toLowerCase();
    const matchesBrand = selectedBrand === "All" || p.brand.toLowerCase() === selectedBrand.toLowerCase();

    const matchesStock =
      stockFilter === "all"
        ? true
        : stockFilter === "low"
        ? p.stockQty > 0 && p.stockQty < 10
        : p.stockQty <= 0;

    return matchesSearch && matchesCategory && matchesBrand && matchesStock;
  });

  // Key stats
  const totalValue = products.reduce((acc, p) => acc + p.priceQar * p.stockQty, 0);
  const lowStockCount = products.filter((p) => p.stockQty < 10 && p.stockQty > 0).length;
  const outOfStockCount = products.filter((p) => p.stockQty <= 0).length;

  return (
    <AdminLayout>
      {/* Title & Actions */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Products Catalog</h1>
          <p className="text-gray-500 text-sm mt-0.5">
            Manage your Qatar smartphone inventory, stock levels, and store pricing
          </p>
        </div>
        <button
          onClick={() => {
            setFormData({
              name: "",
              category: "Smartphones",
              brand: "Apple",
              priceQar: 2999,
              originalPriceQar: 3299,
              stockQty: 15,
              imageUrl: "",
              warranty: "Official Qatar 1-Year Agency Warranty",
              description: "",
              isActive: true,
              isFeatured: false,
            });
            setIsAddOpen(true);
          }}
          className="btn-primary flex items-center justify-center gap-2 px-5 py-2.5 text-sm shadow-md cursor-pointer"
        >
          <Plus size={16} />
          <span>Add New Product</span>
        </button>
      </div>

      {/* Metrics Banner */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <div className="bg-white border border-gray-200/80 rounded-2xl p-4 shadow-xs">
          <div className="flex items-center justify-between text-xs text-gray-500 font-medium mb-1">
            <span>Total Products</span>
            <Package size={16} className="text-blue-500" />
          </div>
          <div className="text-2xl font-bold text-gray-900">{products.length}</div>
          <div className="text-[11px] text-emerald-600 font-medium mt-1">
            {products.filter((p) => p.isActive).length} currently active in store
          </div>
        </div>

        <div className="bg-white border border-gray-200/80 rounded-2xl p-4 shadow-xs">
          <div className="flex items-center justify-between text-xs text-gray-500 font-medium mb-1">
            <span>Inventory Value</span>
            <TrendingUp size={16} className="text-brand-500" />
          </div>
          <div className="text-2xl font-bold text-gray-900">QAR {totalValue.toLocaleString()}</div>
          <div className="text-[11px] text-gray-500 mt-1">Total physical stock value</div>
        </div>

        <div className="bg-white border border-gray-200/80 rounded-2xl p-4 shadow-xs">
          <div className="flex items-center justify-between text-xs text-gray-500 font-medium mb-1">
            <span>Featured in Home</span>
            <Sparkles size={16} className="text-purple-500" />
          </div>
          <div className="text-2xl font-bold text-gray-900">
            {products.filter((p) => p.isFeatured).length}
          </div>
          <div className="text-[11px] text-purple-600 mt-1">Showcased in flagship carousels</div>
        </div>

        <div className="bg-white border border-gray-200/80 rounded-2xl p-4 shadow-xs">
          <div className="flex items-center justify-between text-xs text-gray-500 font-medium mb-1">
            <span>Low Stock Alert</span>
            <AlertTriangle size={16} className="text-amber-500" />
          </div>
          <div className="text-2xl font-bold text-amber-600">{lowStockCount}</div>
          <div className="text-[11px] text-gray-500 mt-1">
            {outOfStockCount > 0 ? `${outOfStockCount} out of stock` : "0 items out of stock"}
          </div>
        </div>
      </div>

      {/* Filter & Search Bar */}
      <div className="bg-white border border-gray-200 rounded-2xl p-4 mb-6 shadow-xs flex flex-col md:flex-row gap-3 items-stretch md:items-center justify-between">
        <div className="relative flex-1 min-w-[240px]">
          <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Search by name, brand, or category..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-brand-500 focus:ring-2 focus:ring-brand-100 transition-all"
          />
        </div>

        <div className="flex flex-wrap items-center gap-2">
          {/* Category Dropdown */}
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="px-3 py-2 text-xs font-medium border border-gray-200 rounded-xl bg-white text-gray-700 focus:outline-none focus:border-brand-500 cursor-pointer"
          >
            {CATEGORIES.map((cat) => (
              <option key={cat} value={cat}>
                {cat === "All" ? "All Categories" : cat}
              </option>
            ))}
          </select>

          {/* Brand Dropdown */}
          <select
            value={selectedBrand}
            onChange={(e) => setSelectedBrand(e.target.value)}
            className="px-3 py-2 text-xs font-medium border border-gray-200 rounded-xl bg-white text-gray-700 focus:outline-none focus:border-brand-500 cursor-pointer"
          >
            {BRANDS.map((br) => (
              <option key={br} value={br}>
                {br === "All" ? "All Brands" : br}
              </option>
            ))}
          </select>

          {/* Stock Filter Pills */}
          <div className="flex items-center gap-1 bg-gray-100 p-1 rounded-xl">
            <button
              onClick={() => setStockFilter("all")}
              className={`px-2.5 py-1 text-xs rounded-lg font-medium transition-colors cursor-pointer ${
                stockFilter === "all" ? "bg-white text-gray-900 shadow-xs" : "text-gray-500 hover:text-gray-900"
              }`}
            >
              All
            </button>
            <button
              onClick={() => setStockFilter("low")}
              className={`px-2.5 py-1 text-xs rounded-lg font-medium transition-colors cursor-pointer ${
                stockFilter === "low" ? "bg-white text-amber-600 shadow-xs" : "text-gray-500 hover:text-gray-900"
              }`}
            >
              Low Stock
            </button>
            <button
              onClick={() => setStockFilter("out")}
              className={`px-2.5 py-1 text-xs rounded-lg font-medium transition-colors cursor-pointer ${
                stockFilter === "out" ? "bg-white text-rose-600 shadow-xs" : "text-gray-500 hover:text-gray-900"
              }`}
            >
              Out
            </button>
          </div>
        </div>
      </div>

      {/* Products Table */}
      <div className="bg-white border border-gray-200 rounded-2xl shadow-card overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="text-xs text-gray-400 uppercase border-b border-gray-100 bg-gray-50/70">
                <th className="text-left px-5 py-3.5 font-medium">Product</th>
                <th className="text-left px-5 py-3.5 font-medium hidden md:table-cell">Category</th>
                <th className="text-left px-5 py-3.5 font-medium">Price (QAR)</th>
                <th className="text-left px-5 py-3.5 font-medium">Stock</th>
                <th className="text-center px-5 py-3.5 font-medium">Visible</th>
                <th className="text-center px-5 py-3.5 font-medium hidden lg:table-cell">Featured</th>
                <th className="text-center px-5 py-3.5 font-medium">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filtered.length === 0 ? (
                <tr>
                  <td colSpan={7} className="px-5 py-12 text-center text-gray-400">
                    <Package size={32} className="mx-auto mb-2 opacity-50" />
                    <p className="font-medium text-gray-600">No products found</p>
                    <p className="text-xs text-gray-400 mt-1">Try resetting search or filter options</p>
                  </td>
                </tr>
              ) : (
                filtered.map((product) => (
                  <tr
                    key={product.id}
                    className="border-b border-gray-50 hover:bg-gray-50/60 transition-colors"
                  >
                    {/* Product item */}
                    <td className="px-5 py-4">
                      <div className="flex items-center gap-3">
                        <img
                          src={product.imageUrl}
                          alt={product.name}
                          className="w-12 h-12 rounded-xl object-contain bg-gray-100 p-1 border border-gray-200/80 shrink-0"
                        />
                        <div className="min-w-0">
                          <p className="font-semibold text-gray-900 leading-tight truncate max-w-xs">
                            {product.name}
                          </p>
                          <div className="flex items-center gap-2 mt-1">
                            <span className="text-[11px] font-medium text-brand-600 bg-brand-50 px-2 py-0.5 rounded-md">
                              {product.brand}
                            </span>
                            {product.warranty && (
                              <span className="text-[10px] text-gray-400 truncate hidden sm:inline">
                                {product.warranty}
                              </span>
                            )}
                          </div>
                        </div>
                      </div>
                    </td>

                    {/* Category */}
                    <td className="px-5 py-4 text-gray-600 hidden md:table-cell font-medium">
                      {product.category}
                    </td>

                    {/* Price */}
                    <td className="px-5 py-4 font-semibold text-gray-900 font-sans">
                      <div className="flex flex-col">
                        <span>QAR {product.priceQar.toLocaleString()}</span>
                        {product.originalPriceQar && product.originalPriceQar > product.priceQar && (
                          <span className="text-xs text-gray-400 line-through">
                            QAR {product.originalPriceQar.toLocaleString()}
                          </span>
                        )}
                      </div>
                    </td>

                    {/* Stock */}
                    <td className="px-5 py-4">
                      <span
                        className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold ${
                          product.stockQty <= 0
                            ? "bg-rose-50 text-rose-700 border border-rose-200"
                            : product.stockQty < 10
                            ? "bg-amber-50 text-amber-700 border border-amber-200"
                            : "bg-emerald-50 text-emerald-700 border border-emerald-200"
                        }`}
                      >
                        {product.stockQty <= 0 ? "Out of Stock" : `${product.stockQty} in stock`}
                      </span>
                    </td>

                    {/* Active Toggle */}
                    <td className="px-5 py-4 text-center">
                      <button
                        onClick={() => toggleActive(product.id)}
                        className="cursor-pointer transition-transform active:scale-90"
                        title={product.isActive ? "Hide from store" : "Publish to store"}
                      >
                        {product.isActive ? (
                          <ToggleRight size={24} className="text-emerald-500 mx-auto" />
                        ) : (
                          <ToggleLeft size={24} className="text-gray-300 mx-auto" />
                        )}
                      </button>
                    </td>

                    {/* Featured Toggle */}
                    <td className="px-5 py-4 text-center hidden lg:table-cell">
                      <button
                        onClick={() => toggleFeatured(product.id)}
                        className="cursor-pointer transition-transform active:scale-90"
                        title={product.isFeatured ? "Remove from Featured" : "Promote to Featured"}
                      >
                        {product.isFeatured ? (
                          <ToggleRight size={24} className="text-brand-500 mx-auto" />
                        ) : (
                          <ToggleLeft size={24} className="text-gray-300 mx-auto" />
                        )}
                      </button>
                    </td>

                    {/* Actions */}
                    <td className="px-5 py-4">
                      <div className="flex items-center justify-center gap-1.5">
                        <button
                          onClick={() => setViewingProduct(product)}
                          title="Quick View Details"
                          className="p-1.5 rounded-lg hover:bg-gray-100 text-gray-400 hover:text-gray-700 transition-colors cursor-pointer"
                        >
                          <Eye size={16} />
                        </button>
                        <button
                          onClick={() => openEditModal(product)}
                          title="Edit Product"
                          className="p-1.5 rounded-lg hover:bg-blue-50 text-gray-400 hover:text-blue-600 transition-colors cursor-pointer"
                        >
                          <Edit2 size={16} />
                        </button>
                        <button
                          onClick={() => setDeleteConfirmId(product.id)}
                          title="Delete Product"
                          className="p-1.5 rounded-lg hover:bg-rose-50 text-gray-400 hover:text-rose-600 transition-colors cursor-pointer"
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* ADD / EDIT PRODUCT MODAL */}
      {(isAddOpen || editingProduct) && (
        <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4 backdrop-blur-xs overflow-y-auto">
          <div className="bg-white rounded-3xl max-w-xl w-full p-6 sm:p-8 shadow-2xl border border-gray-100 my-8">
            <div className="flex items-center justify-between pb-4 border-b border-gray-100 mb-6">
              <div>
                <h2 className="text-xl font-bold text-gray-900">
                  {editingProduct ? "Edit Product" : "Add New Product"}
                </h2>
                <p className="text-xs text-gray-500 mt-0.5">
                  Update inventory catalog and pricing details for Qatar customers
                </p>
              </div>
              <button
                onClick={() => {
                  setIsAddOpen(false);
                  setEditingProduct(null);
                }}
                className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-xl"
              >
                <X size={18} />
              </button>
            </div>

            <form onSubmit={handleSaveProduct} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1">
                  Product Name *
                </label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="e.g. Apple iPhone 16 Pro Max 256GB — Desert Titanium"
                  className="w-full px-3.5 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-brand-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-1">Brand</label>
                  <select
                    value={formData.brand}
                    onChange={(e) => setFormData({ ...formData, brand: e.target.value })}
                    className="w-full px-3.5 py-2.5 border border-gray-200 rounded-xl text-sm bg-white focus:outline-none focus:border-brand-500"
                  >
                    {BRANDS.filter((b) => b !== "All").map((b) => (
                      <option key={b} value={b}>{b}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-1">Category</label>
                  <select
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                    className="w-full px-3.5 py-2.5 border border-gray-200 rounded-xl text-sm bg-white focus:outline-none focus:border-brand-500"
                  >
                    {CATEGORIES.filter((c) => c !== "All").map((c) => (
                      <option key={c} value={c}>{c}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-1">
                    Price (QAR) *
                  </label>
                  <input
                    type="number"
                    required
                    min={1}
                    value={formData.priceQar}
                    onChange={(e) => setFormData({ ...formData, priceQar: Number(e.target.value) })}
                    className="w-full px-3.5 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-brand-500 font-sans"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-1">
                    Original Price (QAR)
                  </label>
                  <input
                    type="number"
                    min={1}
                    value={formData.originalPriceQar}
                    onChange={(e) => setFormData({ ...formData, originalPriceQar: Number(e.target.value) })}
                    className="w-full px-3.5 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-brand-500 font-sans"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-1">
                    Stock Quantity *
                  </label>
                  <input
                    type="number"
                    required
                    min={0}
                    value={formData.stockQty}
                    onChange={(e) => setFormData({ ...formData, stockQty: Number(e.target.value) })}
                    className="w-full px-3.5 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-brand-500 font-sans"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1">
                  Product Image URL
                </label>
                <input
                  type="url"
                  value={formData.imageUrl}
                  onChange={(e) => setFormData({ ...formData, imageUrl: e.target.value })}
                  placeholder="https://images.unsplash.com/..."
                  className="w-full px-3.5 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-brand-500 font-mono text-xs"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1">
                  Warranty & Agency Coverage
                </label>
                <input
                  type="text"
                  value={formData.warranty}
                  onChange={(e) => setFormData({ ...formData, warranty: e.target.value })}
                  placeholder="e.g. Official Apple Qatar Warranty · 1 Year"
                  className="w-full px-3.5 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-brand-500"
                />
              </div>

              <div className="flex items-center gap-6 pt-2">
                <label className="flex items-center gap-2 cursor-pointer text-xs font-medium text-gray-700">
                  <input
                    type="checkbox"
                    checked={formData.isActive}
                    onChange={(e) => setFormData({ ...formData, isActive: e.target.checked })}
                    className="rounded text-brand-600 focus:ring-brand-500"
                  />
                  <span>Active & Visible in Store</span>
                </label>

                <label className="flex items-center gap-2 cursor-pointer text-xs font-medium text-gray-700">
                  <input
                    type="checkbox"
                    checked={formData.isFeatured}
                    onChange={(e) => setFormData({ ...formData, isFeatured: e.target.checked })}
                    className="rounded text-brand-600 focus:ring-brand-500"
                  />
                  <span>Promote as Featured Flagship</span>
                </label>
              </div>

              <div className="flex items-center justify-end gap-3 pt-4 border-t border-gray-100">
                <button
                  type="button"
                  onClick={() => {
                    setIsAddOpen(false);
                    setEditingProduct(null);
                  }}
                  className="px-4 py-2.5 rounded-xl border border-gray-200 text-sm font-medium text-gray-600 hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="btn-primary px-6 py-2.5 rounded-xl text-sm font-semibold shadow-md"
                >
                  {editingProduct ? "Save Changes" : "Create Product"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* QUICK VIEW DETAILS MODAL */}
      {viewingProduct && (
        <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4 backdrop-blur-xs">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 sm:p-8 shadow-2xl border border-gray-100 relative">
            <button
              onClick={() => setViewingProduct(null)}
              className="absolute top-5 right-5 p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-xl"
            >
              <X size={18} />
            </button>

            <div className="flex gap-4 items-start mb-5">
              <img
                src={viewingProduct.imageUrl}
                alt={viewingProduct.name}
                className="w-24 h-24 object-contain bg-gray-50 border border-gray-100 rounded-2xl p-2 shrink-0"
              />
              <div>
                <span className="text-xs font-semibold text-brand-600 uppercase tracking-wider">
                  {viewingProduct.brand} · {viewingProduct.category}
                </span>
                <h3 className="text-lg font-bold text-gray-900 mt-1 leading-snug">
                  {viewingProduct.name}
                </h3>
                <div className="flex items-baseline gap-2 mt-2">
                  <span className="text-xl font-bold text-gray-900">
                    QAR {viewingProduct.priceQar.toLocaleString()}
                  </span>
                  {viewingProduct.originalPriceQar && (
                    <span className="text-xs text-gray-400 line-through">
                      QAR {viewingProduct.originalPriceQar.toLocaleString()}
                    </span>
                  )}
                </div>
              </div>
            </div>

            <div className="bg-gray-50 rounded-2xl p-4 text-xs space-y-2 mb-6">
              <div className="flex justify-between py-1 border-b border-gray-200/60">
                <span className="text-gray-500">Stock Availability:</span>
                <span className="font-semibold text-gray-900">{viewingProduct.stockQty} Units in Doha Warehouse</span>
              </div>
              <div className="flex justify-between py-1 border-b border-gray-200/60">
                <span className="text-gray-500">Warranty Coverage:</span>
                <span className="font-semibold text-emerald-700">{viewingProduct.warranty || "Official Qatar Warranty"}</span>
              </div>
              <div className="flex justify-between py-1">
                <span className="text-gray-500">Store Status:</span>
                <span className="font-semibold text-gray-900">
                  {viewingProduct.isActive ? "Published" : "Hidden"} · {viewingProduct.isFeatured ? "Featured" : "Standard"}
                </span>
              </div>
            </div>

            <div className="flex justify-end gap-2">
              <button
                onClick={() => {
                  const p = viewingProduct;
                  setViewingProduct(null);
                  openEditModal(p);
                }}
                className="px-4 py-2 text-xs font-semibold text-blue-600 bg-blue-50 hover:bg-blue-100 rounded-xl transition-colors cursor-pointer"
              >
                Edit Product
              </button>
              <button
                onClick={() => setViewingProduct(null)}
                className="px-4 py-2 text-xs font-semibold text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-xl transition-colors cursor-pointer"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* DELETE CONFIRMATION MODAL */}
      {deleteConfirmId && (
        <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4 backdrop-blur-xs">
          <div className="bg-white rounded-3xl max-w-sm w-full p-6 text-center shadow-2xl border border-gray-100">
            <div className="w-12 h-12 rounded-full bg-rose-50 text-rose-600 flex items-center justify-center mx-auto mb-4">
              <Trash2 size={22} />
            </div>
            <h3 className="text-lg font-bold text-gray-900">Delete Product?</h3>
            <p className="text-xs text-gray-500 mt-1 mb-6">
              Are you sure you want to remove this product from the catalog? This action will immediately remove it from the storefront.
            </p>
            <div className="flex items-center justify-center gap-3">
              <button
                onClick={() => setDeleteConfirmId(null)}
                className="px-4 py-2.5 rounded-xl border border-gray-200 text-xs font-semibold text-gray-600 hover:bg-gray-50 cursor-pointer"
              >
                Cancel
              </button>
              <button
                onClick={() => handleDelete(deleteConfirmId)}
                className="px-4 py-2.5 rounded-xl bg-rose-600 hover:bg-rose-700 text-white text-xs font-semibold shadow-md cursor-pointer"
              >
                Yes, Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </AdminLayout>
  );
}
