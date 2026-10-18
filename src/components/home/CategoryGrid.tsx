import Link from "next/link";

export interface CategoryItem {
  id?: string;
  name: string;
  slug: string;
  imageUrl?: string;
  count?: string;
}

const defaultCategories: CategoryItem[] = [
  {
    name: "Smartphones",
    slug: "smartphones",
    imageUrl: "https://images.unsplash.com/photo-1592750475338-74b7b21085ab?auto=format&fit=crop&w=400&q=80",
    count: "150+ Products",
  },
  {
    name: "Tablets",
    slug: "tablets",
    imageUrl: "https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?auto=format&fit=crop&w=400&q=80",
    count: "45+ Products",
  },
  {
    name: "Audio",
    slug: "audio",
    imageUrl: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=400&q=80",
    count: "80+ Products",
  },
  {
    name: "Wearables",
    slug: "wearables",
    imageUrl: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=400&q=80",
    count: "60+ Products",
  },
  {
    name: "Accessories",
    slug: "accessories",
    imageUrl: "https://images.unsplash.com/photo-1583863788434-e58a36330cf0?auto=format&fit=crop&w=400&q=80",
    count: "200+ Products",
  },
  {
    name: "Gaming",
    slug: "gaming",
    imageUrl: "https://images.unsplash.com/photo-1600080972464-8e5f35f63d08?auto=format&fit=crop&w=400&q=80",
    count: "30+ Products",
  },
];

interface CategoryGridProps {
  categories?: CategoryItem[];
  title?: string;
  subtitle?: string;
}

export function CategoryGrid({
  categories = defaultCategories,
  title = "Shop by Category",
  subtitle = "Browse by",
}: CategoryGridProps) {
  return (
    <section className="py-10 bg-white">
      <div className="container-main">
        <div className="flex items-end justify-between mb-6">
          <div>
            <p className="text-brand-500 text-sm font-bold uppercase tracking-wider mb-1">
              {subtitle}
            </p>
            <h2 className="section-title">{title}</h2>
          </div>
          <Link
            href="/category/smartphones"
            className="text-sm font-semibold text-brand-500 hover:text-brand-600 transition-colors hidden sm:block"
          >
            View All →
          </Link>
        </div>

        <div className="grid grid-cols-3 sm:grid-cols-6 gap-3 sm:gap-6">
          {categories.map((cat) => {
            const hasImage = Boolean(cat.imageUrl && cat.imageUrl.trim());

            return (
              <Link
                key={cat.slug}
                href={`/category/${cat.slug}`}
                className="group flex flex-col items-center text-center p-2 rounded-2xl hover:-translate-y-1 transition-all duration-300"
              >
                {/* Circular Category Image with decorative border */}
                <div className="relative p-1 rounded-full bg-gradient-to-b from-gray-100 to-gray-200 group-hover:from-brand-400 group-hover:to-brand-600 transition-all duration-300 shadow-sm group-hover:shadow-md mb-2.5">
                  <div className="w-20 h-20 sm:w-24 sm:h-24 md:w-28 md:h-28 rounded-full overflow-hidden bg-white p-1 flex items-center justify-center">
                    {hasImage ? (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img
                        src={cat.imageUrl!}
                        alt={cat.name}
                        className="w-full h-full object-cover rounded-full group-hover:scale-110 transition-transform duration-500"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center font-bold text-gray-500 text-sm bg-gray-100 rounded-full">
                        {cat.name.slice(0, 2).toUpperCase()}
                      </div>
                    )}
                  </div>
                </div>

                {/* Category Details */}
                <p className="font-bold text-gray-900 text-xs sm:text-sm leading-tight group-hover:text-brand-500 transition-colors duration-200 line-clamp-1">
                  {cat.name}
                </p>
                {cat.count && (
                  <p className="text-[11px] text-gray-400 mt-0.5 font-medium">
                    {cat.count}
                  </p>
                )}
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
