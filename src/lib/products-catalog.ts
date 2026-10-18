import type { Product } from "@/types";

export const CATALOG_PRODUCTS: Record<string, Product> = {
  "iphone-16-pro-max": {
    id: "prod-iphone-16-pro-max",
    name: "Apple iPhone 16 Pro Max 256GB — Desert Titanium",
    slug: "iphone-16-pro-max",
    sku: "APP-IP16PM-256-DT",
    description:
      "The ultimate iPhone with a lightweight titanium design, Camera Control button, 48MP Fusion camera, and the blazing-fast Apple A18 Pro chip. Features up to 33 hours of video playback and enhanced 5G connectivity for Qatar networks (Ooredoo & Vodafone).",
    priceQar: 4799,
    originalPriceQar: 5399,
    discountPercent: 11,
    stockQty: 14,
    isActive: true,
    isFeatured: true,
    isBestSeller: true,
    isNewArrival: true,
    whatsappEnabled: true,
    rating: 4.9,
    reviewCount: 168,
    categoryId: "smartphones",
    brand: { id: "apple", name: "Apple", slug: "apple" },
    category: { id: "smartphones", name: "Smartphones", slug: "smartphones", isActive: true },
    images: [
      {
        id: "img-1",
        url: "https://images.unsplash.com/photo-1592750475338-74b7b21085ab?auto=format&fit=crop&w=1000&q=80",
        altText: "iPhone 16 Pro Max Desert Titanium front view",
        sortOrder: 0,
        isPrimary: true,
      },
      {
        id: "img-2",
        url: "https://images.unsplash.com/photo-1510557880182-3d4d3cba35a5?auto=format&fit=crop&w=1000&q=80",
        altText: "iPhone 16 Pro Max sleek profile",
        sortOrder: 1,
        isPrimary: false,
      },
      {
        id: "img-3",
        url: "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?auto=format&fit=crop&w=1000&q=80",
        altText: "iPhone 16 Pro Max camera module",
        sortOrder: 2,
        isPrimary: false,
      },
    ],
    specs: [
      { id: "s1", label: "Display", value: '6.9" Super Retina XDR OLED, 120Hz ProMotion', groupName: "Display", sortOrder: 0 },
      { id: "s2", label: "Processor", value: "Apple A18 Pro (3nm) 6-core CPU + 6-core GPU", groupName: "Performance", sortOrder: 1 },
      { id: "s3", label: "Memory (RAM)", value: "8GB Unified Memory", groupName: "Performance", sortOrder: 2 },
      { id: "s4", label: "Internal Storage", value: "256GB NVMe High Speed", groupName: "Performance", sortOrder: 3 },
      { id: "s5", label: "Main Camera", value: "48MP Fusion + 48MP Ultra-Wide + 12MP 5x Telephoto", groupName: "Camera", sortOrder: 4 },
      { id: "s6", label: "Front Camera", value: "12MP TrueDepth with Auto Focus", groupName: "Camera", sortOrder: 5 },
      { id: "s7", label: "Battery Life", value: "4685 mAh — Up to 33 hours video playback", groupName: "Battery & Charging", sortOrder: 6 },
      { id: "s8", label: "Charging", value: "MagSafe 25W Fast Wireless · USB-C 3.0", groupName: "Battery & Charging", sortOrder: 7 },
      { id: "s9", label: "Operating System", value: "iOS 18 with Apple Intelligence", groupName: "Software", sortOrder: 8 },
      { id: "s10", label: "Network", value: "5G Sub-6GHz + mmWave (Ooredoo / Vodafone Qatar)", groupName: "Connectivity", sortOrder: 9 },
      { id: "s11", label: "Build Quality", value: "Grade 5 Titanium frame with Ceramic Shield", groupName: "Build & Dimensions", sortOrder: 10 },
      { id: "s12", label: "Water Resistance", value: "IP68 rated (6 meters up to 30 mins)", groupName: "Build & Dimensions", sortOrder: 11 },
      { id: "s13", label: "Warranty", value: "1-Year Official Apple Warranty in Qatar", groupName: "Warranty", sortOrder: 12 },
    ],
    variants: [
      { id: "v1", name: "Color", value: "Desert Titanium", stockQty: 14 },
      { id: "v2", name: "Color", value: "Natural Titanium", stockQty: 8, priceQar: 4799 },
      { id: "v3", name: "Color", value: "Black Titanium", stockQty: 5, priceQar: 4799 },
      { id: "v4", name: "Color", value: "White Titanium", stockQty: 4, priceQar: 4799 },
      { id: "v5", name: "Storage", value: "256GB", stockQty: 14 },
      { id: "v6", name: "Storage", value: "512GB", stockQty: 6, priceQar: 5599 },
      { id: "v7", name: "Storage", value: "1TB", stockQty: 3, priceQar: 6499 },
    ],
    createdAt: new Date(),
    updatedAt: new Date(),
  },

  "samsung-s25-ultra": {
    id: "prod-samsung-s25-ultra",
    name: "Samsung Galaxy S25 Ultra 512GB — Titanium Silver",
    slug: "samsung-s25-ultra",
    sku: "SAM-S25U-512-TS",
    description:
      "The pinnacle of Android engineering. Featuring Galaxy AI, Qualcomm Snapdragon 8 Elite, a revolutionary 200MP camera system, built-in S Pen, and an ultra-durable Titanium frame. Official TRA Qatar compliant.",
    priceQar: 4299,
    originalPriceQar: 4999,
    discountPercent: 14,
    stockQty: 11,
    isActive: true,
    isFeatured: true,
    isBestSeller: true,
    isNewArrival: true,
    whatsappEnabled: true,
    rating: 4.8,
    reviewCount: 112,
    categoryId: "smartphones",
    brand: { id: "samsung", name: "Samsung", slug: "samsung" },
    category: { id: "smartphones", name: "Smartphones", slug: "smartphones", isActive: true },
    images: [
      {
        id: "img-s25-1",
        url: "https://images.unsplash.com/photo-1610945415295-d9bbf067e59c?auto=format&fit=crop&w=1000&q=80",
        altText: "Samsung Galaxy S25 Ultra front and rear view",
        sortOrder: 0,
        isPrimary: true,
      },
      {
        id: "img-s25-2",
        url: "https://images.unsplash.com/photo-1580910051074-3eb694886505?auto=format&fit=crop&w=1000&q=80",
        altText: "Samsung Galaxy S25 Ultra S Pen and display",
        sortOrder: 1,
        isPrimary: false,
      },
    ],
    specs: [
      { id: "ss1", label: "Display", value: '6.8" Dynamic AMOLED 2X, 120Hz, 2600 nits', groupName: "Display", sortOrder: 0 },
      { id: "ss2", label: "Processor", value: "Snapdragon 8 Elite for Galaxy (3nm)", groupName: "Performance", sortOrder: 1 },
      { id: "ss3", label: "RAM", value: "12GB LPDDR5X", groupName: "Performance", sortOrder: 2 },
      { id: "ss4", label: "Storage", value: "512GB UFS 4.0", groupName: "Performance", sortOrder: 3 },
      { id: "ss5", label: "Cameras", value: "200MP Main + 50MP 5x Periscope + 50MP Ultra-Wide + 10MP 3x", groupName: "Camera", sortOrder: 4 },
      { id: "ss6", label: "Battery", value: "5000 mAh with 45W Fast Charging", groupName: "Battery & Charging", sortOrder: 5 },
      { id: "ss7", label: "Stylus", value: "Integrated Bluetooth S Pen with Air Actions", groupName: "Features", sortOrder: 6 },
      { id: "ss8", label: "Warranty", value: "1-Year Official Samsung Gulf Warranty", groupName: "Warranty", sortOrder: 7 },
    ],
    variants: [
      { id: "vs1", name: "Color", value: "Titanium Silver", stockQty: 11 },
      { id: "vs2", name: "Color", value: "Titanium Black", stockQty: 6, priceQar: 4299 },
      { id: "vs3", name: "Color", value: "Titanium Blue", stockQty: 4, priceQar: 4299 },
      { id: "vs4", name: "Storage", value: "512GB", stockQty: 11 },
      { id: "vs5", name: "Storage", value: "1TB", stockQty: 2, priceQar: 5199 },
    ],
    createdAt: new Date(),
    updatedAt: new Date(),
  },

  "pixel-9-pro-xl": {
    id: "prod-pixel-9-pro-xl",
    name: "Google Pixel 9 Pro XL 256GB — Porcelain",
    slug: "pixel-9-pro-xl",
    sku: "GOO-PIX9P-256-POR",
    description:
      "Google's most powerful Pixel yet with Google Tensor G4, Gemini AI integrated into every experience, studio-quality telephoto cameras, and 7 years of Pixel drops and security updates.",
    priceQar: 3499,
    originalPriceQar: 3799,
    discountPercent: 8,
    stockQty: 9,
    isActive: true,
    isFeatured: true,
    isBestSeller: false,
    isNewArrival: true,
    whatsappEnabled: true,
    rating: 4.7,
    reviewCount: 78,
    categoryId: "smartphones",
    brand: { id: "google", name: "Google", slug: "google" },
    category: { id: "smartphones", name: "Smartphones", slug: "smartphones", isActive: true },
    images: [
      {
        id: "img-pix-1",
        url: "https://images.unsplash.com/photo-1598327105666-5b89351aff97?auto=format&fit=crop&w=1000&q=80",
        altText: "Google Pixel 9 Pro XL front and camera bar",
        sortOrder: 0,
        isPrimary: true,
      },
    ],
    specs: [
      { id: "sp1", label: "Display", value: '6.8" Super Actua OLED, 120Hz LTPO, 3000 nits', groupName: "Display", sortOrder: 0 },
      { id: "sp2", label: "Processor", value: "Google Tensor G4 with Titan M2 security", groupName: "Performance", sortOrder: 1 },
      { id: "sp3", label: "RAM", value: "16GB RAM for advanced on-device AI", groupName: "Performance", sortOrder: 2 },
      { id: "sp4", label: "Main Camera", value: "50MP Octa PD + 48MP Quad PD Telephoto 5x", groupName: "Camera", sortOrder: 3 },
      { id: "sp5", label: "Battery", value: "5060 mAh with 37W wired charging", groupName: "Battery", sortOrder: 4 },
      { id: "sp6", label: "Warranty", value: "1-Year International Warranty with Doha Support", groupName: "Warranty", sortOrder: 5 },
    ],
    variants: [
      { id: "vp1", name: "Color", value: "Porcelain", stockQty: 9 },
      { id: "vp2", name: "Color", value: "Obsidian", stockQty: 5, priceQar: 3499 },
      { id: "vp3", name: "Color", value: "Hazel", stockQty: 3, priceQar: 3499 },
      { id: "vp4", name: "Storage", value: "256GB", stockQty: 9 },
      { id: "vp5", name: "Storage", value: "512GB", stockQty: 3, priceQar: 4199 },
    ],
    createdAt: new Date(),
    updatedAt: new Date(),
  },

  "sony-wh1000xm6": {
    id: "prod-sony-wh1000xm6",
    name: "Sony WH-1000XM6 Wireless Noise-Cancelling Headphones",
    slug: "sony-wh1000xm6",
    sku: "SON-WH1000XM6-BLK",
    description:
      "Industry-leading active noise cancellation powered by Sony's dual processor architecture. Features High-Resolution Audio, LDAC support, 30-hour battery life, and ultra-comfortable memory foam ear cushions.",
    priceQar: 1599,
    originalPriceQar: 1899,
    discountPercent: 16,
    stockQty: 22,
    isActive: true,
    isFeatured: true,
    isBestSeller: true,
    isNewArrival: true,
    whatsappEnabled: true,
    rating: 4.9,
    reviewCount: 204,
    categoryId: "audio",
    brand: { id: "sony", name: "Sony", slug: "sony" },
    category: { id: "audio", name: "Audio", slug: "audio", isActive: true },
    images: [
      {
        id: "img-sony-1",
        url: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=1000&q=80",
        altText: "Sony WH-1000XM6 Headphones in Black",
        sortOrder: 0,
        isPrimary: true,
      },
      {
        id: "img-sony-2",
        url: "https://images.unsplash.com/photo-1484704849700-f032a568e944?auto=format&fit=crop&w=1000&q=80",
        altText: "Sony WH-1000XM6 ear cup details",
        sortOrder: 1,
        isPrimary: false,
      },
    ],
    specs: [
      { id: "so1", label: "Noise Cancelling", value: "HD Noise Cancelling Processor QN1 + V2", groupName: "Audio", sortOrder: 0 },
      { id: "so2", label: "Driver Unit", value: "30mm precision-engineered carbon fiber composite", groupName: "Audio", sortOrder: 1 },
      { id: "so3", label: "Battery Life", value: "Up to 30 hours with ANC on (40 hours ANC off)", groupName: "Battery", sortOrder: 2 },
      { id: "so4", label: "Quick Charge", value: "3 minutes charge delivers 3 hours playback", groupName: "Battery", sortOrder: 3 },
      { id: "so5", label: "Connectivity", value: "Bluetooth 5.3 · Multi-point connection · 3.5mm jack", groupName: "Connectivity", sortOrder: 4 },
      { id: "so6", label: "Warranty", value: "1-Year Official Fifty One East Qatar Warranty", groupName: "Warranty", sortOrder: 5 },
    ],
    variants: [
      { id: "vso1", name: "Color", value: "Matte Black", stockQty: 15 },
      { id: "vso2", name: "Color", value: "Platinum Silver", stockQty: 7, priceQar: 1599 },
    ],
    createdAt: new Date(),
    updatedAt: new Date(),
  },

  "apple-watch-series-10": {
    id: "prod-apple-watch-series-10",
    name: "Apple Watch Series 10 46mm GPS — Jet Black Aluminum",
    slug: "apple-watch-series-10",
    sku: "APP-AW10-46-JB",
    description:
      "The thinnest Apple Watch ever with Apple's largest, most advanced display. Features sleep apnea notifications, faster charging, ECG, blood oxygen, water depth and temperature sensors for swimming.",
    priceQar: 1799,
    originalPriceQar: 1999,
    discountPercent: 10,
    stockQty: 16,
    isActive: true,
    isFeatured: true,
    isBestSeller: false,
    isNewArrival: true,
    whatsappEnabled: true,
    rating: 4.8,
    reviewCount: 92,
    categoryId: "wearables",
    brand: { id: "apple", name: "Apple", slug: "apple" },
    category: { id: "wearables", name: "Wearables", slug: "wearables", isActive: true },
    images: [
      {
        id: "img-aw-1",
        url: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=1000&q=80",
        altText: "Apple Watch Series 10 Display and Band",
        sortOrder: 0,
        isPrimary: true,
      },
      {
        id: "img-aw-2",
        url: "https://images.unsplash.com/photo-1508685096489-7aacd43bd3b1?auto=format&fit=crop&w=1000&q=80",
        altText: "Apple Watch Series 10 Crown and side profile",
        sortOrder: 1,
        isPrimary: false,
      },
    ],
    specs: [
      { id: "aw1", label: "Case Size", value: "46mm Wide-angle OLED display", groupName: "Design", sortOrder: 0 },
      { id: "aw2", label: "Processor", value: "S10 SiP with 64-bit dual-core processor", groupName: "Performance", sortOrder: 1 },
      { id: "aw3", label: "Health Sensors", value: "Sleep Apnea · ECG · Heart Rate · Depth gauge to 6m", groupName: "Health & Fitness", sortOrder: 2 },
      { id: "aw4", label: "Charging", value: "Fast charge 0 to 80% in about 30 minutes", groupName: "Battery", sortOrder: 3 },
      { id: "aw5", label: "Water Resistance", value: "50m water resistant · Swimproof", groupName: "Build", sortOrder: 4 },
      { id: "aw6", label: "Warranty", value: "1-Year Official Apple Warranty in Qatar", groupName: "Warranty", sortOrder: 5 },
    ],
    variants: [
      { id: "vaw1", name: "Case Size", value: "46mm", stockQty: 10 },
      { id: "vaw2", name: "Case Size", value: "42mm", stockQty: 6, priceQar: 1649 },
      { id: "vaw3", name: "Color", value: "Jet Black", stockQty: 10 },
      { id: "vaw4", name: "Color", value: "Rose Gold", stockQty: 4, priceQar: 1799 },
      { id: "vaw5", name: "Color", value: "Silver", stockQty: 2, priceQar: 1799 },
    ],
    createdAt: new Date(),
    updatedAt: new Date(),
  },

  "ipad-pro-m4": {
    id: "prod-ipad-pro-m4",
    name: "Apple iPad Pro 11-inch M4 WiFi 256GB — Space Black",
    slug: "ipad-pro-m4",
    sku: "APP-IPADM4-11-256-SB",
    description:
      "Unbelievably thin design with outrageous performance from the revolutionary Apple M4 chip. Breakthrough Ultra Retina XDR tandem OLED display, Apple Pencil Pro support, and all-day battery life.",
    priceQar: 3999,
    originalPriceQar: 4399,
    discountPercent: 9,
    stockQty: 8,
    isActive: true,
    isFeatured: true,
    isBestSeller: false,
    isNewArrival: false,
    whatsappEnabled: true,
    rating: 4.9,
    reviewCount: 65,
    categoryId: "tablets",
    brand: { id: "apple", name: "Apple", slug: "apple" },
    category: { id: "tablets", name: "Tablets", slug: "tablets", isActive: true },
    images: [
      {
        id: "img-ipad-1",
        url: "https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?auto=format&fit=crop&w=1000&q=80",
        altText: "Apple iPad Pro M4 Ultra Retina XDR Display",
        sortOrder: 0,
        isPrimary: true,
      },
      {
        id: "img-ipad-2",
        url: "https://images.unsplash.com/photo-1561154464-82e9adf32764?auto=format&fit=crop&w=1000&q=80",
        altText: "iPad Pro M4 Ultra thin profile",
        sortOrder: 1,
        isPrimary: false,
      },
    ],
    specs: [
      { id: "ip1", label: "Display", value: '11" Tandem Ultra Retina XDR OLED, 120Hz ProMotion', groupName: "Display", sortOrder: 0 },
      { id: "ip2", label: "Chip", value: "Apple M4 chip (9-core CPU / 10-core GPU)", groupName: "Performance", sortOrder: 1 },
      { id: "ip3", label: "Storage", value: "256GB High Speed NVMe", groupName: "Storage", sortOrder: 2 },
      { id: "ip4", label: "Pencil Support", value: "Apple Pencil Pro & Apple Pencil (USB-C)", groupName: "Accessories", sortOrder: 3 },
      { id: "ip5", label: "Thickness", value: "5.3mm — Apple's thinnest product ever", groupName: "Build", sortOrder: 4 },
      { id: "ip6", label: "Warranty", value: "1-Year Official Apple Warranty in Qatar", groupName: "Warranty", sortOrder: 5 },
    ],
    variants: [
      { id: "vip1", name: "Color", value: "Space Black", stockQty: 8 },
      { id: "vip2", name: "Color", value: "Silver", stockQty: 5, priceQar: 3999 },
      { id: "vip3", name: "Storage", value: "256GB", stockQty: 8 },
      { id: "vip4", name: "Storage", value: "512GB", stockQty: 4, priceQar: 4799 },
      { id: "vip5", name: "Storage", value: "1TB", stockQty: 2, priceQar: 6399 },
    ],
    createdAt: new Date(),
    updatedAt: new Date(),
  },
};

// Aliases for alternate slugs used across categories or seeds
CATALOG_PRODUCTS["apple-magsafe-charger"] = {
  id: "prod-magsafe-charger",
  name: "Apple MagSafe 25W Fast Wireless Charger (1m)",
  slug: "apple-magsafe-charger",
  sku: "APP-MAGSAFE-25W",
  description: "Official Apple MagSafe Charger delivers fast, seamless wireless charging up to 25W with braided cable and USB-C connector. Compatible with iPhone 16 and Qi2 devices.",
  priceQar: 189,
  originalPriceQar: 219,
  discountPercent: 14,
  stockQty: 30,
  isActive: true,
  isFeatured: true,
  isBestSeller: true,
  isNewArrival: false,
  whatsappEnabled: true,
  rating: 4.9,
  reviewCount: 310,
  categoryId: "accessories",
  brand: { id: "apple", name: "Apple", slug: "apple" },
  category: { id: "accessories", name: "Accessories", slug: "accessories", isActive: true },
  images: [
    {
      id: "img-mag-1",
      url: "https://images.unsplash.com/photo-1583863788434-e58a36330cf0?auto=format&fit=crop&w=800&q=80",
      altText: "Apple MagSafe Charger",
      sortOrder: 0,
      isPrimary: true,
    },
  ],
  specs: [
    { id: "ms1", label: "Charging Speed", value: "Up to 25W with 30W adapter", groupName: "Power", sortOrder: 0 },
    { id: "ms2", label: "Connector", value: "USB-C with braided 1m cable", groupName: "Design", sortOrder: 1 },
    { id: "ms3", label: "Warranty", value: "1 Year Official Apple Warranty", groupName: "Warranty", sortOrder: 2 },
  ],
  createdAt: new Date(),
  updatedAt: new Date(),
};

CATALOG_PRODUCTS["airpods-pro-2"] = {
  id: "prod-airpods-pro-2",
  name: "Apple AirPods Pro 2 with USB-C MagSafe Case",
  slug: "airpods-pro-2",
  sku: "APP-AIRPODS-PRO2-USBC",
  description: "Up to 2x more Active Noise Cancellation, Transparency mode, Personalized Spatial Audio, and precision finding with Apple H2 chip.",
  priceQar: 849,
  originalPriceQar: 949,
  discountPercent: 11,
  stockQty: 25,
  isActive: true,
  isFeatured: true,
  isBestSeller: true,
  isNewArrival: false,
  whatsappEnabled: true,
  rating: 4.9,
  reviewCount: 420,
  categoryId: "audio",
  brand: { id: "apple", name: "Apple", slug: "apple" },
  category: { id: "audio", name: "Audio", slug: "audio", isActive: true },
  images: [
    {
      id: "img-airpods-1",
      url: "https://images.unsplash.com/photo-1600294037681-c80b4cb5b434?auto=format&fit=crop&w=800&q=80",
      altText: "Apple AirPods Pro 2 in Case",
      sortOrder: 0,
      isPrimary: true,
    },
  ],
  specs: [
    { id: "ap1", label: "Chip", value: "Apple H2 Headphone chip, U1 in case", groupName: "Audio", sortOrder: 0 },
    { id: "ap2", label: "Battery", value: "Up to 30 hours total with case", groupName: "Battery", sortOrder: 1 },
    { id: "ap3", label: "Dust & Water", value: "IP54 rated sweat & water resistant", groupName: "Build", sortOrder: 2 },
  ],
  createdAt: new Date(),
  updatedAt: new Date(),
};

CATALOG_PRODUCTS["anker-737-powerbank"] = {
  id: "prod-anker-737",
  name: "Anker Prime 24,000mAh 140W 3-Port Power Bank",
  slug: "anker-737-powerbank",
  sku: "ANK-737-140W",
  description: "Ultra-powerful two-way fast charging with smart digital display. Charges laptops, tablets, and phones simultaneously at full speed.",
  priceQar: 449,
  originalPriceQar: 529,
  discountPercent: 15,
  stockQty: 18,
  isActive: true,
  isFeatured: true,
  isBestSeller: true,
  isNewArrival: true,
  whatsappEnabled: true,
  rating: 4.8,
  reviewCount: 88,
  categoryId: "accessories",
  brand: { id: "anker", name: "Anker", slug: "anker" },
  category: { id: "accessories", name: "Accessories", slug: "accessories", isActive: true },
  images: [
    {
      id: "img-ank-1",
      url: "https://images.unsplash.com/photo-1609091839311-d5365f9ff1c5?auto=format&fit=crop&w=800&q=80",
      altText: "Anker Power Bank",
      sortOrder: 0,
      isPrimary: true,
    },
  ],
  specs: [
    { id: "an1", label: "Capacity", value: "24,000 mAh (Charges iPhone 5x)", groupName: "Battery", sortOrder: 0 },
    { id: "an2", label: "Max Output", value: "140W Single Port / 140W Total", groupName: "Output", sortOrder: 1 },
    { id: "an3", label: "Warranty", value: "2 Years Anker Qatar Warranty", groupName: "Warranty", sortOrder: 2 },
  ],
  createdAt: new Date(),
  updatedAt: new Date(),
};

CATALOG_PRODUCTS["spigen-ultra-hybrid-case"] = {
  id: "prod-spigen-case",
  name: "Spigen Ultra Hybrid MagFit Crystal Clear Case",
  slug: "spigen-ultra-hybrid-case",
  sku: "SPG-UH-MAG-CLR",
  description: "Military-grade drop-tested crystal clear case with anti-yellowing resin and integrated strong neodymium magnets for MagSafe accessories.",
  priceQar: 119,
  originalPriceQar: 149,
  discountPercent: 20,
  stockQty: 45,
  isActive: true,
  isFeatured: false,
  isBestSeller: true,
  isNewArrival: false,
  whatsappEnabled: true,
  rating: 4.7,
  reviewCount: 154,
  categoryId: "accessories",
  brand: { id: "spigen", name: "Spigen", slug: "spigen" },
  category: { id: "accessories", name: "Accessories", slug: "accessories", isActive: true },
  images: [
    {
      id: "img-spg-1",
      url: "https://images.unsplash.com/photo-1601784551446-20c9e07cdbdb?auto=format&fit=crop&w=800&q=80",
      altText: "Spigen Crystal Case",
      sortOrder: 0,
      isPrimary: true,
    },
  ],
  specs: [
    { id: "spc1", label: "Protection", value: "Air Cushion Technology (MIL-STD 810G)", groupName: "Protection", sortOrder: 0 },
    { id: "spc2", label: "Compatibility", value: "Full MagSafe Magnetic Alignment", groupName: "Design", sortOrder: 1 },
  ],
  createdAt: new Date(),
  updatedAt: new Date(),
};

CATALOG_PRODUCTS["samsung-galaxy-buds3-pro"] = {
  id: "prod-buds3-pro",
  name: "Samsung Galaxy Buds3 Pro ANC — Titanium Silver",
  slug: "samsung-galaxy-buds3-pro",
  sku: "SAM-BUDS3P-SIL",
  description: "Ultimate Hi-Fi sound with dual amp and 2-way speakers. Blade lights, adaptive ANC with Galaxy AI real-time interpreter integration.",
  priceQar: 699,
  originalPriceQar: 799,
  discountPercent: 12,
  stockQty: 20,
  isActive: true,
  isFeatured: true,
  isBestSeller: true,
  isNewArrival: true,
  whatsappEnabled: true,
  rating: 4.8,
  reviewCount: 95,
  categoryId: "audio",
  brand: { id: "samsung", name: "Samsung", slug: "samsung" },
  category: { id: "audio", name: "Audio", slug: "audio", isActive: true },
  images: [
    {
      id: "img-buds-1",
      url: "https://images.unsplash.com/photo-1590658268037-6bf12165a8df?auto=format&fit=crop&w=800&q=80",
      altText: "Samsung Galaxy Buds3 Pro Earbuds",
      sortOrder: 0,
      isPrimary: true,
    },
  ],
  specs: [
    { id: "b1", label: "Audio", value: "24-bit / 96kHz Hi-Fi with Dual Amp", groupName: "Audio", sortOrder: 0 },
    { id: "b2", label: "ANC", value: "Adaptive Noise Control with Voice Detect", groupName: "Audio", sortOrder: 1 },
  ],
  createdAt: new Date(),
  updatedAt: new Date(),
};

CATALOG_PRODUCTS["iphone-16-pro-max-256gb"] = CATALOG_PRODUCTS["iphone-16-pro-max"];
CATALOG_PRODUCTS["samsung-galaxy-s25-ultra"] = CATALOG_PRODUCTS["samsung-s25-ultra"];

/**
 * Robust product resolver
 */
export async function getProductBySlug(slug: string): Promise<Product> {
  // 1. Direct catalog hit
  if (CATALOG_PRODUCTS[slug]) {
    return CATALOG_PRODUCTS[slug];
  }

  // 2. Fallback synthesis for category slugs like 'product-1', 'product-2', etc.
  const formattedTitle = slug
    .replace(/^product-/, "Flagship Smartphone ")
    .replace(/-/g, " ")
    .replace(/\b\w/g, (c) => c.toUpperCase());

  return {
    id: `dynamic-${slug}`,
    name: formattedTitle.includes("Smartphone") || formattedTitle.includes("Phone") ? formattedTitle : `${formattedTitle} Qatar Edition`,
    slug,
    sku: `QTR-${slug.toUpperCase()}`,
    description: `Experience cutting-edge technology with ${formattedTitle}. Designed for premium performance, long-lasting battery life, and crystal-clear display. Guaranteed official 1-year warranty with free delivery in Doha, Qatar.`,
    priceQar: 2999,
    originalPriceQar: 3499,
    discountPercent: 14,
    stockQty: 10,
    isActive: true,
    isFeatured: true,
    isBestSeller: true,
    isNewArrival: false,
    whatsappEnabled: true,
    rating: 4.8,
    reviewCount: 45,
    categoryId: "smartphones",
    brand: { id: "brand-1", name: "Premium Tech", slug: "tech" },
    category: { id: "smartphones", name: "Smartphones", slug: "smartphones", isActive: true },
    images: [
      {
        id: "img-dyn-1",
        url: "https://images.unsplash.com/photo-1592750475338-74b7b21085ab?auto=format&fit=crop&w=1000&q=80",
        altText: `${formattedTitle} Front View`,
        sortOrder: 0,
        isPrimary: true,
      },
      {
        id: "img-dyn-2",
        url: "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?auto=format&fit=crop&w=1000&q=80",
        altText: `${formattedTitle} Angle View`,
        sortOrder: 1,
        isPrimary: false,
      },
    ],
    specs: [
      { id: "d1", label: "Display", value: '6.7" AMOLED 120Hz HDR10+', groupName: "Display", sortOrder: 0 },
      { id: "d2", label: "Processor", value: "Octa-Core High Performance 4nm SoC", groupName: "Performance", sortOrder: 1 },
      { id: "d3", label: "RAM & Storage", value: "12GB RAM · 256GB Storage", groupName: "Performance", sortOrder: 2 },
      { id: "d4", label: "Camera System", value: "50MP OIS Triple Camera + 32MP Selfie", groupName: "Camera", sortOrder: 3 },
      { id: "d5", label: "Battery Life", value: "5000 mAh — Fast Charge 67W included", groupName: "Battery", sortOrder: 4 },
      { id: "d6", label: "Warranty", value: "1 Year Official Qatar Warranty", groupName: "Warranty", sortOrder: 5 },
    ],
    variants: [
      { id: "dv1", name: "Color", value: "Space Gray", stockQty: 10 },
      { id: "dv2", name: "Color", value: "Silver", stockQty: 5, priceQar: 2999 },
      { id: "dv3", name: "Storage", value: "256GB", stockQty: 10 },
      { id: "dv4", name: "Storage", value: "512GB", stockQty: 4, priceQar: 3499 },
    ],
    createdAt: new Date(),
    updatedAt: new Date(),
  };
}

/**
 * Returns similar competitor flagships / devices in same category
 */
export function getSimilarProducts(currentSlug: string, count = 4): Product[] {
  const current = CATALOG_PRODUCTS[currentSlug];
  const all = Object.values(CATALOG_PRODUCTS).filter((p) => p.slug !== currentSlug);

  if (current?.categoryId) {
    const sameCategory = all.filter((p) => p.categoryId === current.categoryId);
    if (sameCategory.length >= count) return sameCategory.slice(0, count);
  }

  // Fallback to top flagships
  return all.filter((p) => ["iphone-16-pro-max", "samsung-s25-ultra", "pixel-9-pro-xl", "ipad-pro-m4", "sony-wh1000xm6"].includes(p.slug)).slice(0, count);
}

/**
 * Returns recommended accessories (chargers, cases, audio) for a product
 */
export function getRecommendedAccessories(currentProduct: Product, count = 4): Product[] {
  const isApple = currentProduct.brand?.slug === "apple" || currentProduct.name.toLowerCase().includes("apple") || currentProduct.name.toLowerCase().includes("iphone");

  const accessorySlugs = isApple
    ? ["apple-magsafe-charger", "spigen-ultra-hybrid-case", "airpods-pro-2", "anker-737-powerbank"]
    : ["anker-737-powerbank", "spigen-ultra-hybrid-case", "samsung-galaxy-buds3-pro", "apple-magsafe-charger"];

  return accessorySlugs
    .map((slug) => CATALOG_PRODUCTS[slug])
    .filter(Boolean)
    .filter((p) => p.slug !== currentProduct.slug)
    .slice(0, count);
}

/**
 * Returns trending popular gadgets across Qatar
 */
export function getTrendingProducts(currentSlug: string, count = 4): Product[] {
  const trendingSlugs = [
    "apple-watch-series-10",
    "sony-wh1000xm6",
    "samsung-s25-ultra",
    "airpods-pro-2",
    "ipad-pro-m4",
    "anker-737-powerbank",
  ];

  return trendingSlugs
    .filter((s) => s !== currentSlug)
    .map((slug) => CATALOG_PRODUCTS[slug])
    .filter(Boolean)
    .slice(0, count);
}

/**
 * Returns bundle items for Frequently Bought Together box
 */
export function getFrequentlyBoughtBundle(product: Product): {
  accessories: Product[];
  bundleDiscountQar: number;
} {
  const accessories = getRecommendedAccessories(product, 2);
  const bundleDiscountQar = 60; // QAR 60 discount when bought as bundle

  return {
    accessories,
    bundleDiscountQar,
  };
}

/**
 * Legacy compatibility helper
 */
export function getRelatedProducts(currentSlug: string, count = 4): Product[] {
  return getSimilarProducts(currentSlug, count);
}
