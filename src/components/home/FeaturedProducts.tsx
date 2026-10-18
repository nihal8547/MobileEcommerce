import Link from "next/link";
import { ProductCard } from "@/components/product/ProductCard";
import type { Product } from "@/types";

// Sample Qatar-market products for demo rendering
const sampleProducts: Product[] = [
  {
    id: "1", name: "iPhone 16 Pro Max 256GB", slug: "iphone-16-pro-max",
    sku: "APP-IP16PM-256", priceQar: 4799, originalPriceQar: 5399,
    discountPercent: 11, stockQty: 12, isActive: true, isFeatured: true,
    isBestSeller: true, isNewArrival: false, whatsappEnabled: true,
    rating: 4.9, reviewCount: 142, categoryId: "1",
    brand: { id: "1", name: "Apple", slug: "apple" },
    images: [{ id: "1", url: "", altText: "iPhone 16 Pro Max", sortOrder: 0, isPrimary: true }],
    createdAt: new Date(), updatedAt: new Date(),
  },
  {
    id: "2", name: "Samsung Galaxy S25 Ultra 512GB", slug: "samsung-s25-ultra",
    sku: "SAM-S25U-512", priceQar: 4299, originalPriceQar: 4999,
    discountPercent: 14, stockQty: 8, isActive: true, isFeatured: true,
    isBestSeller: true, isNewArrival: false, whatsappEnabled: true,
    rating: 4.8, reviewCount: 98, categoryId: "1",
    brand: { id: "2", name: "Samsung", slug: "samsung" },
    images: [{ id: "2", url: "", altText: "Samsung S25 Ultra", sortOrder: 0, isPrimary: true }],
    createdAt: new Date(), updatedAt: new Date(),
  },
  {
    id: "3", name: "Google Pixel 9 Pro XL", slug: "pixel-9-pro-xl",
    sku: "GOO-PIX9P-256", priceQar: 3499, originalPriceQar: 3799,
    discountPercent: 8, stockQty: 15, isActive: true, isFeatured: true,
    isBestSeller: false, isNewArrival: true, whatsappEnabled: true,
    rating: 4.7, reviewCount: 67, categoryId: "1",
    brand: { id: "3", name: "Google", slug: "google" },
    images: [{ id: "3", url: "", altText: "Pixel 9 Pro XL", sortOrder: 0, isPrimary: true }],
    createdAt: new Date(), updatedAt: new Date(),
  },
  {
    id: "4", name: "Sony WH-1000XM6 ANC Headphones", slug: "sony-wh1000xm6",
    sku: "SON-WH1000XM6", priceQar: 1599, originalPriceQar: 1899,
    discountPercent: 16, stockQty: 25, isActive: true, isFeatured: true,
    isBestSeller: false, isNewArrival: true, whatsappEnabled: true,
    rating: 4.9, reviewCount: 203, categoryId: "3",
    brand: { id: "4", name: "Sony", slug: "sony" },
    images: [{ id: "4", url: "", altText: "Sony WH-1000XM6", sortOrder: 0, isPrimary: true }],
    createdAt: new Date(), updatedAt: new Date(),
  },
  {
    id: "5", name: "Apple Watch Series 10 45mm GPS", slug: "apple-watch-series-10",
    sku: "APP-AW10-45-GPS", priceQar: 1799, originalPriceQar: 1999,
    discountPercent: 10, stockQty: 20, isActive: true, isFeatured: true,
    isBestSeller: false, isNewArrival: true, whatsappEnabled: true,
    rating: 4.8, reviewCount: 89, categoryId: "4",
    brand: { id: "1", name: "Apple", slug: "apple" },
    images: [{ id: "5", url: "", altText: "Apple Watch Series 10", sortOrder: 0, isPrimary: true }],
    createdAt: new Date(), updatedAt: new Date(),
  },
  {
    id: "6", name: "iPad Pro M4 11-inch WiFi 256GB", slug: "ipad-pro-m4",
    sku: "APP-IPADPRO-M4-256", priceQar: 3999, originalPriceQar: 4399,
    discountPercent: 9, stockQty: 7, isActive: true, isFeatured: true,
    isBestSeller: false, isNewArrival: false, whatsappEnabled: true,
    rating: 4.9, reviewCount: 54, categoryId: "2",
    brand: { id: "1", name: "Apple", slug: "apple" },
    images: [{ id: "6", url: "", altText: "iPad Pro M4", sortOrder: 0, isPrimary: true }],
    createdAt: new Date(), updatedAt: new Date(),
  },
];

interface FeaturedProductsProps {
  products?: Product[];
  title?: string;
  subtitle?: string;
}

export function FeaturedProducts({
  products = sampleProducts,
  title = "Featured Products",
  subtitle = "Handpicked top sellers available in Qatar",
}: FeaturedProductsProps) {
  return (
    <section className="py-10 bg-white">
      <div className="container-main">
        <div className="flex items-end justify-between mb-6">
          <div>
            <p className="text-brand-500 text-sm font-bold uppercase tracking-wider mb-1">Featured</p>
            <h2 className="section-title">{title}</h2>
            <p className="text-gray-500 text-sm mt-1">{subtitle}</p>
          </div>
          <Link href="/products" className="text-sm font-semibold text-brand-500 hover:text-brand-600 transition-colors hidden sm:block">
            View All →
          </Link>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-3 sm:gap-4">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>

        <div className="mt-6 text-center sm:hidden">
          <Link href="/products" className="btn-secondary text-sm">
            View All Products →
          </Link>
        </div>
      </div>
    </section>
  );
}
