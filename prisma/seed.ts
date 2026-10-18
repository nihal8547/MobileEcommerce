// eslint-disable-next-line @typescript-eslint/no-require-imports
const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

async function main() {
  console.log("Seeding MobileShop Qatar...");

  // Store Settings
  await prisma.storeSettings.upsert({
    where: { id: "1" },
    update: {},
    create: {
      id: "1",
      whatsappEnabled: true,
      whatsappNumber: "+97466000000",
      codEnabled: true,
      onlinePayEnabled: true,
      standardDeliveryQar: 15,
      expressDeliveryQar: 30,
      freeDeliveryAboveQar: 200,
      currency: "QAR",
      countryCode: "+974",
    },
  });

  // Brands
  const apple = await prisma.brand.upsert({
    where: { slug: "apple" },
    update: {},
    create: { name: "Apple", slug: "apple", logoUrl: "https://upload.wikimedia.org/wikipedia/commons/f/fa/Apple_logo_black.svg" },
  });
  const samsung = await prisma.brand.upsert({
    where: { slug: "samsung" },
    update: {},
    create: { name: "Samsung", slug: "samsung" },
  });
  const sony = await prisma.brand.upsert({
    where: { slug: "sony" },
    update: {},
    create: { name: "Sony", slug: "sony" },
  });

  // Categories
  const smartphones = await prisma.category.upsert({
    where: { slug: "smartphones" },
    update: {},
    create: { name: "Smartphones", slug: "smartphones", emoji: "📱", sortOrder: 1 },
  });
  const tablets = await prisma.category.upsert({
    where: { slug: "tablets" },
    update: {},
    create: { name: "Tablets", slug: "tablets", emoji: "📟", sortOrder: 2 },
  });
  const audio = await prisma.category.upsert({
    where: { slug: "audio" },
    update: {},
    create: { name: "Audio", slug: "audio", emoji: "🎧", sortOrder: 3 },
  });
  const wearables = await prisma.category.upsert({
    where: { slug: "wearables" },
    update: {},
    create: { name: "Wearables", slug: "wearables", emoji: "⌚", sortOrder: 4 },
  });
  const accessories = await prisma.category.upsert({
    where: { slug: "accessories" },
    update: {},
    create: { name: "Accessories", slug: "accessories", emoji: "🔌", sortOrder: 5 },
  });

  // Products
  const products = [
    {
      name: "iPhone 16 Pro Max 256GB",
      slug: "iphone-16-pro-max-256gb",
      description: "The most advanced iPhone ever. Featuring the A18 Pro chip, 48MP ProRAW camera system, and titanium design. Now available in Qatar.",
      priceQar: 4799,
      originalPriceQar: 5299,
      categoryId: smartphones.id,
      brandId: apple.id,
      isFeatured: true,
      isBestSeller: true,
      stockQty: 12,
      sku: "IPHONE-16PM-256",
    },
    {
      name: "Samsung Galaxy S25 Ultra",
      slug: "samsung-galaxy-s25-ultra",
      description: "Galaxy AI meets ultimate performance. S Pen included. 200MP camera. 12GB RAM. Snapdragon 8 Elite for Galaxy.",
      priceQar: 3999,
      originalPriceQar: 4499,
      categoryId: smartphones.id,
      brandId: samsung.id,
      isFeatured: true,
      isBestSeller: true,
      stockQty: 8,
      sku: "S25-ULTRA-512",
    },
    {
      name: "Sony WH-1000XM6",
      slug: "sony-wh-1000xm6",
      description: "Industry-leading noise cancellation with 30-hour battery life. LDAC Hi-Res Audio. Multipoint connection for 2 devices.",
      priceQar: 1399,
      originalPriceQar: 1599,
      categoryId: audio.id,
      brandId: sony.id,
      isFeatured: true,
      isBestSeller: false,
      stockQty: 25,
      sku: "SONY-XM6-BLK",
    },
    {
      name: "Apple Watch Series 10",
      slug: "apple-watch-series-10",
      description: "The thinnest Apple Watch ever. Advanced health sensors including sleep apnea detection. Always-on display. 18h battery.",
      priceQar: 899,
      originalPriceQar: 999,
      categoryId: wearables.id,
      brandId: apple.id,
      isFeatured: false,
      isBestSeller: true,
      stockQty: 15,
      sku: "AW-S10-41MM",
    },
    {
      name: "iPad Pro M4 11\"",
      slug: "ipad-pro-m4-11",
      description: "Impossibly thin. Incredibly powerful. The M4 chip, Ultra Retina XDR OLED display, and up to 16GB RAM.",
      priceQar: 3299,
      originalPriceQar: 3599,
      categoryId: tablets.id,
      brandId: apple.id,
      isFeatured: true,
      isBestSeller: false,
      stockQty: 6,
      sku: "IPAD-PRO-M4-11",
    },
    {
      name: "AirPods Pro 3",
      slug: "airpods-pro-3",
      description: "Active Noise Cancellation 2.0. Adaptive Audio. H2 chip. 30-hour total battery with MagSafe case. Now with hearing health features.",
      priceQar: 999,
      originalPriceQar: 1099,
      categoryId: audio.id,
      brandId: apple.id,
      isFeatured: true,
      isBestSeller: true,
      stockQty: 30,
      sku: "AIRPODS-PRO-3",
    },
    {
      name: "Samsung Galaxy Buds3 Pro",
      slug: "samsung-galaxy-buds3-pro",
      description: "Intelligent Active Noise Cancellation with 360° Audio. 24-bit Hi-Fi Audio. IP57 dust and water resistant.",
      priceQar: 649,
      originalPriceQar: 749,
      categoryId: audio.id,
      brandId: samsung.id,
      isFeatured: false,
      isBestSeller: true,
      stockQty: 20,
      sku: "BUDS3-PRO-WHT",
    },
    {
      name: "Apple USB-C to Lightning Cable 2m",
      slug: "apple-usbc-lightning-cable-2m",
      description: "Official Apple USB-C to Lightning Cable. 2 metre length. MFi certified. Fast charge compatible.",
      priceQar: 149,
      originalPriceQar: 199,
      categoryId: accessories.id,
      brandId: apple.id,
      isFeatured: false,
      isBestSeller: false,
      stockQty: 100,
      sku: "APPLE-CABLE-2M",
    },
  ];

  for (const p of products) {
    const existing = await prisma.product.findUnique({ where: { slug: p.slug } });
    if (!existing) {
      await prisma.product.create({ data: p });
      console.log(`  Created: ${p.name}`);
    }
  }

  // Banners
  const banners = [
    {
      title: "iPhone 16 Pro Max",
      subtitle: "Starting QAR 4,799",
      badge: "New Arrival",
      ctaText: "Shop Now",
      ctaHref: "/product/iphone-16-pro-max-256gb",
      bgColor: "#1a1a2e",
      slot: "hero",
      sortOrder: 1,
    },
    {
      title: "Samsung S25 Ultra",
      subtitle: "Starting QAR 3,999",
      badge: "Best Seller",
      ctaText: "Explore",
      ctaHref: "/product/samsung-galaxy-s25-ultra",
      bgColor: "#0f3460",
      slot: "hero",
      sortOrder: 2,
    },
    {
      title: "Sony WH-1000XM6",
      subtitle: "Industry-leading noise cancellation",
      badge: "New",
      ctaText: "Discover",
      ctaHref: "/product/sony-wh-1000xm6",
      bgColor: "#16213e",
      slot: "hero",
      sortOrder: 3,
    },
  ];

  for (const b of banners) {
    await prisma.banner.create({ data: b }).catch(() => {});
  }

  console.log("Seed complete!");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
