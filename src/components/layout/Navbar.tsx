"use client";

import Link from "next/link";
import { useState } from "react";
import { usePathname } from "next/navigation";
import { ShoppingCart, Search, Heart, User, Menu, X, Phone, MapPin } from "lucide-react";
import { useCart } from "@/hooks/useCart";
import { NavbarSearch } from "@/components/layout/NavbarSearch";

const navLinks = [
  { label: "Smartphones", href: "/category/smartphones" },
  { label: "Tablets", href: "/category/tablets" },
  { label: "Audio", href: "/category/audio" },
  { label: "Wearables", href: "/category/wearables" },
  { label: "Accessories", href: "/category/accessories" },
  { label: "Offers", href: "/offers" },
];

export function Navbar() {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const { totalItems } = useCart();

  if (pathname === "/login" || pathname?.startsWith("/admin")) return null;

  return (
    <header className="sticky top-0 z-50 bg-white border-b border-gray-100 shadow-sm">
      {/* Top bar */}
      <div className="bg-gray-900 text-gray-300 text-xs py-1.5 hidden sm:block">
        <div className="container-main flex justify-between items-center">
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1.5">
              <Phone size={11} />
              +974 6600 0000
            </span>
            <span className="flex items-center gap-1.5">
              <MapPin size={11} />
              Doha, Qatar
            </span>
          </div>
          <span>Free delivery on orders above QAR 200</span>
        </div>
      </div>

      {/* Main navbar */}
      <div className="container-main">
        <div className="flex items-center justify-between gap-3 lg:gap-6 h-16">
          {/* Logo (Left) */}
          <div className="flex items-center flex-shrink-0">
            <Link href="/" className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-xl bg-brand-gradient flex items-center justify-center shadow-sm">
                <span className="text-white font-bold text-lg leading-none">M</span>
              </div>
              <div className="hidden sm:block">
                <div className="font-bold text-gray-900 text-lg leading-tight" style={{ fontFamily: "var(--font-syne)" }}>
                  MobileShop
                </div>
                <div className="text-[10px] text-brand-500 font-semibold uppercase tracking-wider leading-none">
                  Qatar
                </div>
              </div>
            </Link>
          </div>

          {/* Search bar with Live Instant Suggestions (Centered) */}
          <div className="flex-1 max-w-xl lg:max-w-2xl mx-auto px-2 lg:px-6 hidden md:flex justify-center">
            <div className="w-full">
              <NavbarSearch />
            </div>
          </div>

          {/* Actions (Right) */}
          <div className="flex items-center gap-1 flex-shrink-0">
            <button
              className="md:hidden p-2 rounded-xl hover:bg-gray-100 transition-colors"
              onClick={() => setSearchOpen(!searchOpen)}
              aria-label="Search"
            >
              <Search size={20} className="text-gray-700" />
            </button>
            <Link
              href="/wishlist"
              className="p-2 rounded-xl hover:bg-gray-100 transition-colors relative hidden sm:flex"
              aria-label="Wishlist"
            >
              <Heart size={20} className="text-gray-700" />
            </Link>
            <Link
              href="/account"
              className="p-2 rounded-xl hover:bg-gray-100 transition-colors hidden sm:flex"
              aria-label="Account"
            >
              <User size={20} className="text-gray-700" />
            </Link>
            <Link
              href="/cart"
              className="flex items-center gap-2 px-3 py-2 bg-brand-500 hover:bg-brand-600 text-white rounded-xl transition-colors relative shadow-xs"
              aria-label="Cart"
            >
              <ShoppingCart size={18} />
              {totalItems > 0 && (
                <span className="text-sm font-bold tabular-nums">{totalItems}</span>
              )}
            </Link>
            <button
              className="md:hidden p-2 rounded-xl hover:bg-gray-100 transition-colors ml-1"
              onClick={() => setMobileOpen(!mobileOpen)}
              aria-label="Menu"
            >
              {mobileOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>

        {/* Mobile search */}
        {searchOpen && (
          <div className="md:hidden pb-3 max-w-lg mx-auto">
            <NavbarSearch isMobile onCloseMobile={() => setSearchOpen(false)} />
          </div>
        )}
      </div>

      {/* Category nav */}
      <nav className="border-t border-gray-100 hidden md:block">
        <div className="container-main">
          <div className="flex items-center justify-center gap-1 sm:gap-2">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`px-4 py-2.5 text-sm font-medium transition-colors hover:text-brand-500 whitespace-nowrap rounded-lg hover:bg-gray-50 ${
                  link.label === "Offers"
                    ? "text-brand-500 font-bold"
                    : "text-gray-700"
                }`}
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>
      </nav>

      {/* Mobile menu */}
      {mobileOpen && (
        <nav className="md:hidden border-t border-gray-100 bg-white animate-fade-in">
          <div className="container-main py-2">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMobileOpen(false)}
                className="flex items-center py-3 text-sm font-medium text-gray-700 hover:text-brand-500 border-b border-gray-50 last:border-0 transition-colors"
              >
                {link.label}
              </Link>
            ))}
            <div className="flex gap-3 py-3">
              <Link href="/account" onClick={() => setMobileOpen(false)} className="flex items-center gap-2 text-sm text-gray-600">
                <User size={16} /> Account
              </Link>
              <Link href="/wishlist" onClick={() => setMobileOpen(false)} className="flex items-center gap-2 text-sm text-gray-600">
                <Heart size={16} /> Wishlist
              </Link>
            </div>
          </div>
        </nav>
      )}
    </header>
  );
}
