export interface Product {
  id: string;
  name: string;
  slug: string;
  sku: string;
  description?: string;
  priceQar: number;
  originalPriceQar?: number;
  discountPercent?: number;
  stockQty: number;
  isActive: boolean;
  isFeatured: boolean;
  isBestSeller: boolean;
  isNewArrival: boolean;
  whatsappEnabled: boolean;
  rating?: number;
  reviewCount: number;
  categoryId: string;
  brandId?: string;
  category?: Category;
  brand?: Brand;
  images: ProductImage[];
  specs?: ProductSpec[];
  variants?: ProductVariant[];
  createdAt: Date;
  updatedAt: Date;
}

export interface ProductImage {
  id: string;
  url: string;
  altText?: string;
  sortOrder: number;
  isPrimary: boolean;
}

export interface ProductSpec {
  id: string;
  label: string;
  value: string;
  groupName?: string;
  sortOrder: number;
}

export interface ProductVariant {
  id: string;
  name: string;
  value: string;
  priceQar?: number;
  stockQty: number;
  imageUrl?: string;
}

export interface Category {
  id: string;
  name: string;
  slug: string;
  description?: string;
  imageUrl?: string;
  iconEmoji?: string;
  isActive: boolean;
}

export interface Brand {
  id: string;
  name: string;
  slug: string;
  logoUrl?: string;
}

export interface Banner {
  id: string;
  title: string;
  subtitle?: string;
  imageUrl: string;
  mobileImageUrl?: string;
  linkUrl?: string;
  badgeText?: string;
  position: "HERO" | "PROMO_TOP" | "PROMO_BOTTOM" | "SIDEBAR";
  isActive: boolean;
  sortOrder: number;
}

export interface CartItem {
  id: string;
  productId: string;
  name: string;
  imageUrl?: string;
  priceQar: number;
  quantity: number;
  variant?: string;
  stockQty: number;
}

export interface Address {
  id: string;
  fullName: string;
  phone: string;
  line1: string;
  line2?: string;
  area: string;
  city: string;
  country: string;
  isDefault: boolean;
}

export interface StoreSettings {
  whatsappEnabled: boolean;
  whatsappNumber: string;
  whatsappGreeting: string;
  codEnabled: boolean;
  onlinePayEnabled: boolean;
  standardDeliveryQar: number;
  expressDeliveryQar: number;
  freeDeliveryAboveQar?: number;
}
