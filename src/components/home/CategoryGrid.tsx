import Link from "next/link";

const categories = [
  { name: "Smartphones", slug: "smartphones", icon: "📱", count: "150+ Products", color: "from-brand-500 to-brand-700", bg: "bg-brand-50", text: "text-brand-600" },
  { name: "Tablets", slug: "tablets", icon: "📲", count: "45+ Products", color: "from-blue-500 to-blue-700", bg: "bg-blue-50", text: "text-blue-600" },
  { name: "Audio", slug: "audio", icon: "🎧", count: "80+ Products", color: "from-purple-500 to-purple-700", bg: "bg-purple-50", text: "text-purple-600" },
  { name: "Wearables", slug: "wearables", icon: "⌚", count: "60+ Products", color: "from-green-500 to-green-700", bg: "bg-green-50", text: "text-green-600" },
  { name: "Accessories", slug: "accessories", icon: "🔌", count: "200+ Products", color: "from-amber-500 to-amber-700", bg: "bg-amber-50", text: "text-amber-600" },
  { name: "Gaming", slug: "gaming", icon: "🎮", count: "30+ Products", color: "from-rose-500 to-rose-700", bg: "bg-rose-50", text: "text-rose-600" },
];

export function CategoryGrid() {
  return (
    <section className="py-10 bg-white">
      <div className="container-main">
        <div className="flex items-end justify-between mb-6">
          <div>
            <p className="text-brand-500 text-sm font-bold uppercase tracking-wider mb-1">Browse by</p>
            <h2 className="section-title">Shop by Category</h2>
          </div>
          <Link href="/categories" className="text-sm font-semibold text-brand-500 hover:text-brand-600 transition-colors hidden sm:block">
            View All →
          </Link>
        </div>

        <div className="grid grid-cols-3 sm:grid-cols-6 gap-3">
          {categories.map((cat) => (
            <Link
              key={cat.slug}
              href={`/category/${cat.slug}`}
              className="group flex flex-col items-center gap-2.5 p-4 rounded-2xl border border-gray-100 hover:border-gray-200 hover:shadow-md transition-all duration-200 hover:-translate-y-0.5"
            >
              <div className={`w-14 h-14 rounded-2xl ${cat.bg} flex items-center justify-center text-2xl group-hover:scale-110 transition-transform duration-200`}>
                {cat.icon}
              </div>
              <div className="text-center">
                <p className="font-bold text-gray-900 text-sm leading-tight">{cat.name}</p>
                <p className={`text-xs ${cat.text} mt-0.5`}>{cat.count}</p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
