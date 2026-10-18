import { ProductDetailClient } from "@/components/product/ProductDetailClient";
import type { Product } from "@/types";

// Sample product for demo — replace with DB fetch
function getSampleProduct(slug: string): Product {
  return {
    id: "1",
    name: "iPhone 16 Pro Max 256GB — Natural Titanium",
    slug,
    sku: "APP-IP16PM-256-NT",
    description: "The most powerful iPhone ever. With the A18 Pro chip, ProRes 4K video, and an all-day battery.",
    priceQar: 4799,
    originalPriceQar: 5399,
    discountPercent: 11,
    stockQty: 12,
    isActive: true,
    isFeatured: true,
    isBestSeller: true,
    isNewArrival: false,
    whatsappEnabled: true,
    rating: 4.9,
    reviewCount: 142,
    categoryId: "1",
    brand: { id: "1", name: "Apple", slug: "apple" },
    category: { id: "1", name: "Smartphones", slug: "smartphones", isActive: true },
    images: [
      { id: "1", url: "", altText: "iPhone 16 Pro Max front", sortOrder: 0, isPrimary: true },
      { id: "2", url: "", altText: "iPhone 16 Pro Max back", sortOrder: 1, isPrimary: false },
      { id: "3", url: "", altText: "iPhone 16 Pro Max side", sortOrder: 2, isPrimary: false },
    ],
    specs: [
      { id: "1", label: "Display", value: '6.9" Super Retina XDR OLED', groupName: "Display", sortOrder: 0 },
      { id: "2", label: "Chip", value: "Apple A18 Pro (3nm)", groupName: "Performance", sortOrder: 1 },
      { id: "3", label: "RAM", value: "8GB LPDDR5", groupName: "Performance", sortOrder: 2 },
      { id: "4", label: "Storage", value: "256GB NVMe", groupName: "Performance", sortOrder: 3 },
      { id: "5", label: "Main Camera", value: "48MP Fusion + 12MP Ultra Wide + 12MP 5x Zoom", groupName: "Camera", sortOrder: 4 },
      { id: "6", label: "Front Camera", value: "12MP TrueDepth with autofocus", groupName: "Camera", sortOrder: 5 },
      { id: "7", label: "Battery", value: "4685 mAh — 33hr video playback", groupName: "Battery", sortOrder: 6 },
      { id: "8", label: "Charging", value: "MagSafe 25W · USB-C 27W", groupName: "Battery", sortOrder: 7 },
      { id: "9", label: "OS", value: "iOS 18", groupName: "Software", sortOrder: 8 },
      { id: "10", label: "5G", value: "Yes — Sub-6GHz + mmWave", groupName: "Connectivity", sortOrder: 9 },
      { id: "11", label: "Dimensions", value: "163 × 77.6 × 8.25 mm", groupName: "Build", sortOrder: 10 },
      { id: "12", label: "Weight", value: "227 g", groupName: "Build", sortOrder: 11 },
      { id: "13", label: "Water Resistance", value: "IP68 — 6m for 30 min", groupName: "Build", sortOrder: 12 },
      { id: "14", label: "Colors", value: "Natural Titanium, Black, White, Desert", groupName: "Build", sortOrder: 13 },
      { id: "15", label: "Warranty", value: "1 Year Apple Warranty in Qatar", groupName: "Warranty", sortOrder: 14 },
    ],
    variants: [
      { id: "v1", name: "Color", value: "Natural Titanium", stockQty: 12 },
      { id: "v2", name: "Color", value: "Black Titanium", stockQty: 5, priceQar: 4799 },
      { id: "v3", name: "Color", value: "White Titanium", stockQty: 3, priceQar: 4799 },
      { id: "v4", name: "Storage", value: "256GB", stockQty: 12 },
      { id: "v5", name: "Storage", value: "512GB", stockQty: 8, priceQar: 5599 },
      { id: "v6", name: "Storage", value: "1TB", stockQty: 4, priceQar: 6999 },
    ],
    createdAt: new Date(),
    updatedAt: new Date(),
  };
}

export default function ProductPage({ params }: { params: { slug: string } }) {
  const product = getSampleProduct(params.slug);

  return <ProductDetailClient product={product} />;
}
