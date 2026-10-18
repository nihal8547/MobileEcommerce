import type { Metadata } from "next";
import { ProductDetailClient } from "@/components/product/ProductDetailClient";
import {
  getProductBySlug,
  getSimilarProducts,
  getRecommendedAccessories,
  getTrendingProducts,
  getFrequentlyBoughtBundle,
} from "@/lib/products-catalog";

interface ProductPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({
  params,
}: ProductPageProps): Promise<Metadata> {
  const { slug } = await params;
  const product = await getProductBySlug(slug);

  return {
    title: `${product.name} — Buy in Qatar`,
    description:
      product.description ||
      `Buy ${product.name} at MobileShop Qatar. Best price guaranteed with free express delivery in Doha.`,
    openGraph: {
      title: `${product.name} | MobileShop Qatar`,
      description: product.description,
      images: product.images?.[0]?.url ? [product.images[0].url] : [],
    },
  };
}

export default async function ProductPage({ params }: ProductPageProps) {
  const { slug } = await params;
  const product = await getProductBySlug(slug);
  const similarProducts = getSimilarProducts(slug, 4);
  const accessories = getRecommendedAccessories(product, 4);
  const trendingProducts = getTrendingProducts(slug, 4);
  const bundle = getFrequentlyBoughtBundle(product);

  return (
    <ProductDetailClient
      product={product}
      similarProducts={similarProducts}
      accessories={accessories}
      trendingProducts={trendingProducts}
      bundle={bundle}
    />
  );
}
