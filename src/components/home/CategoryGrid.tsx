import Link from "next/link";
import { Smartphone, Tablet, Headphones, Watch, Cable, Gamepad2 } from "lucide-react";
import type { LucideIcon } from "lucide-react";

const categories: {
  name: string; slug: string; icon: LucideIcon;
  count: string; bg: string; iconColor: string; text: string;
}[] = [
  { name: "Smartphones", slug: "smartphones", icon: Smartphone, count: "150+ Products", bg: "bg-brand-50", iconColor: "text-brand-500", text: "text-brand-600" },
  { name: "Tablets", slug: "tablets", icon: Tablet, count: "45+ Products", bg: "bg-blue-50", iconColor: "text-blue-500", text: "text-blue-600" },
  { name: "Audio", slug: "audio", icon: Headphones, count: "80+ Products", bg: "bg-purple-50", iconColor: "text-purple-500", text: "text-purple-600" },
  { name: "Wearables", slug: "wearables", icon: Watch, count: "60+ Products", bg: "bg-green-50", iconColor: "text-green-500", text: "text-green-600" },
  { name: "Accessories", slug: "accessories", icon: Cable, count: "200+ Products", bg: "bg-amber-50", iconColor: "text-amber-500", text: "text-amber-600" },
  { name: "Gaming", slug: "gaming", icon: Gamepad2, count: "30+ Products", bg: "bg-rose-50", iconColor: "text-rose-500", text: "text-rose-600" },
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
          {categories.map(({ name, slug, icon: Icon, count, bg, iconColor, text }) => (
            <Link
              key={slug}
              href={`/category/${slug}`}
              className="group flex flex-col items-center gap-2.5 p-4 rounded-2xl border border-gray-100 hover:border-gray-200 hover:shadow-md transition-all duration-200 hover:-translate-y-0.5"
            >
              <div className={`w-14 h-14 rounded-2xl ${bg} flex items-center justify-center group-hover:scale-110 transition-transform duration-200`}>
                <Icon size={26} className={iconColor} />
              </div>
              <div className="text-center">
                <p className="font-bold text-gray-900 text-sm leading-tight">{name}</p>
                <p className={`text-xs ${text} mt-0.5`}>{count}</p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
