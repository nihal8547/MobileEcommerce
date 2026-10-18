"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, LayoutGrid, ShoppingCart, Heart, User } from "lucide-react";
import { useCart } from "@/hooks/useCart";

const navItems = [
  { label: "Home", href: "/", icon: Home },
  { label: "Categories", href: "/category/smartphones", icon: LayoutGrid },
  { label: "Cart", href: "/cart", icon: ShoppingCart, hasBadge: true },
  { label: "Wishlist", href: "/wishlist", icon: Heart },
  { label: "Account", href: "/account", icon: User },
];

export function MobileBottomNav() {
  const pathname = usePathname();
  const { totalItems } = useCart();

  // Hide on admin routes and login
  if (pathname === "/login" || pathname?.startsWith("/admin")) return null;

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-lg border-t border-gray-200/80 shadow-[0_-4px_20px_rgba(0,0,0,0.06)] md:hidden safe-area-bottom">
      <div className="grid grid-cols-5 items-center h-16 px-1 max-w-md mx-auto">
        {navItems.map(({ label, href, icon: Icon, hasBadge }) => {
          const isActive =
            href === "/"
              ? pathname === "/"
              : href === "/category/smartphones"
              ? pathname.startsWith("/category")
              : pathname.startsWith(href);

          return (
            <Link
              key={label}
              href={href}
              className={`flex flex-col items-center justify-center py-1 transition-all relative select-none ${
                isActive
                  ? "text-brand-500 font-bold scale-105"
                  : "text-gray-500 hover:text-gray-900 font-medium"
              }`}
            >
              <div className="relative">
                <Icon size={20} strokeWidth={isActive ? 2.3 : 1.8} />
                {hasBadge && totalItems > 0 && (
                  <span className="absolute -top-1.5 -right-2.5 min-w-[18px] h-[18px] px-1 bg-brand-500 text-white text-[10px] font-black rounded-full flex items-center justify-center leading-none shadow-xs">
                    {totalItems > 99 ? "99+" : totalItems}
                  </span>
                )}
              </div>
              <span className="text-[10px] mt-1 leading-none tracking-tight">
                {label}
              </span>
              {isActive && (
                <span className="w-1 h-1 rounded-full bg-brand-500 mt-0.5" />
              )}
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
