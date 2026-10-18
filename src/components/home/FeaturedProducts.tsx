import Link from "next/link";
import { ProductCard } from "@/components/product/ProductCard";
import { CATALOG_PRODUCTS } from "@/lib/products-catalog";
import type { Product } from "@/types";

const sampleProducts: Product[] = Object.values(CATALOG_PRODUCTS);

interface FeaturedProductsProps {
  products?: Product[];
  title?: string;
  subtitle?: string;
  viewAllLink?: string;
}

export function FeaturedProducts({
  products = sampleProducts,
  title = "Trending Flagships",
  subtitle = "Handpicked top sellers available in Qatar — ships from Doha",
  viewAllLink = "/category/smartphones",
}: FeaturedProductsProps) {
  // Ensure products list contains unique items by id to prevent duplicate keys
  const uniqueProducts = Array.from(
    new Map(products.map((p) => [p.id, p])).values()
  );

  return (
    <section className="py-10 bg-white">
      <div className="container-main">
        <div className="flex items-end justify-between mb-6">
          <div>
            <p className="text-brand-500 text-xs font-extrabold uppercase tracking-wider mb-1">
              Top Picks
            </p>
            <h2 className="section-title">{title}</h2>
            <p className="text-gray-500 text-sm mt-1">{subtitle}</p>
          </div>
          <Link
            href={viewAllLink}
            className="text-sm font-semibold text-brand-500 hover:text-brand-600 transition-colors hidden sm:block"
          >
            View All →
          </Link>
        </div>

        {/* Increased card width with 4 columns on large screens instead of 6 */}
        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
          {uniqueProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>

        <div className="mt-8 text-center sm:hidden">
          <Link href={viewAllLink} className="btn-secondary text-sm w-full py-3">
            View All Products →
          </Link>
        </div>
      </div>
    </section>
  );
}
