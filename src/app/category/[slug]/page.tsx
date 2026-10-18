import { CategoryPageClient } from "@/components/product/CategoryPageClient";

export function generateMetadata({ params }: { params: { slug: string } }) {
  const name = params.slug.replace(/-/g, " ").replace(/\b\w/g, (c) => c.toUpperCase());
  return { title: `${name} — MobileShop Qatar` };
}

export default function CategoryPage({ params }: { params: { slug: string } }) {
  return <CategoryPageClient slug={params.slug} />;
}
