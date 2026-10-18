"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  LayoutDashboard,
  Package,
  ShoppingCart,
  Image as ImageIcon,
  Settings,
  MessageCircle,
  ChevronRight,
  LogOut,
  ShieldCheck,
  ExternalLink,
  Star,
  Menu,
  X,
  Store,
} from "lucide-react";
import toast from "react-hot-toast";

const navItems = [
  { href: "/admin", label: "Dashboard", icon: LayoutDashboard },
  { href: "/admin/products", label: "Products", icon: Package },
  { href: "/admin/orders", label: "Orders", icon: ShoppingCart },
  { href: "/admin/banners", label: "Banners & Promos", icon: ImageIcon },
  { href: "/admin/reviews", label: "Customer Reviews", icon: Star },
  { href: "/admin/settings", label: "Store Settings", icon: Settings },
];

interface AdminSession {
  email: string;
  name: string;
  role: string;
  loggedInAt?: string;
}

export function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const [session, setSession] = useState<AdminSession | null>(null);
  const [checking, setChecking] = useState(true);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    try {
      const stored = localStorage.getItem("mobileshop_admin_session");
      if (!stored) {
        router.replace("/admin/login");
        return;
      }
      const parsed = JSON.parse(stored);
      setSession(parsed);
    } catch {
      router.replace("/admin/login");
      return;
    } finally {
      setChecking(false);
    }
  }, [router]);

  // Close mobile menu on route change
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [pathname]);

  const handleLogout = () => {
    try {
      localStorage.removeItem("mobileshop_admin_session");
    } catch {
      // Ignore
    }
    toast.success("Logged out successfully");
    router.replace("/admin/login");
  };

  // While checking auth, display a clean loading barrier
  if (checking || !session) {
    return (
      <div className="min-h-screen bg-slate-950 flex flex-col items-center justify-center text-white">
        <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-brand-600 to-purple-600 flex items-center justify-center mb-4 shadow-lg shadow-brand-500/20">
          <ShieldCheck size={24} className="text-white" />
        </div>
        <div className="w-7 h-7 border-2 border-brand-500 border-t-transparent rounded-full animate-spin mb-3" />
        <span className="text-xs text-slate-400 font-mono tracking-widest uppercase">
          Verifying Admin Authorization...
        </span>
      </div>
    );
  }

  const renderNavLinks = () => (
    <>
      <div className="px-3 py-1.5 text-[11px] font-semibold text-gray-400 uppercase tracking-wider">
        Store Management
      </div>
      {navItems.map(({ href, label, icon: Icon }) => {
        const active = href === "/admin" ? pathname === "/admin" : pathname.startsWith(href);
        return (
          <Link
            key={href}
            href={href}
            className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all ${
              active
                ? "bg-brand-50 text-brand-600 border border-brand-100 shadow-xs font-semibold"
                : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
            }`}
          >
            <Icon size={17} className={active ? "text-brand-600" : "text-gray-400"} />
            <span>{label}</span>
            {active && <ChevronRight size={14} className="ml-auto text-brand-500" />}
          </Link>
        );
      })}

      <div className="mt-5 px-3 py-1.5 text-[11px] font-semibold text-gray-400 uppercase tracking-wider">
        Quick Actions
      </div>
      <Link
        href="/admin/settings"
        className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium text-emerald-700 bg-emerald-50/70 hover:bg-emerald-100/70 border border-emerald-100 transition-colors"
      >
        <MessageCircle size={17} className="text-emerald-600" />
        <span>WhatsApp Channel</span>
      </Link>
      <Link
        href="/"
        target="_blank"
        className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium text-blue-700 bg-blue-50/70 hover:bg-blue-100/70 border border-blue-100 transition-colors"
      >
        <Store size={17} className="text-blue-600" />
        <span>Live Storefront</span>
        <ExternalLink size={12} className="ml-auto opacity-70" />
      </Link>
    </>
  );

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Desktop Sidebar */}
      <aside className="w-64 bg-white border-r border-gray-200 flex flex-col shrink-0 hidden lg:flex">
        {/* Brand header */}
        <div className="p-5 border-b border-gray-100 flex items-center justify-between">
          <Link href="/admin" className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-brand-gradient flex items-center justify-center shadow-sm">
              <span className="text-white font-bold text-base leading-none">M</span>
            </div>
            <div>
              <div className="font-bold text-gray-900 text-sm leading-tight">MobileShop Qatar</div>
              <div className="flex items-center gap-1 mt-0.5">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                <span className="text-[10px] text-brand-600 font-semibold uppercase tracking-wider leading-none">
                  Admin Console
                </span>
              </div>
            </div>
          </Link>
        </div>

        {/* Navigation */}
        <nav className="flex-1 p-3.5 flex flex-col gap-1 overflow-y-auto">
          {renderNavLinks()}
        </nav>

        {/* Sidebar Footer with Admin Session & Logout */}
        <div className="p-3.5 border-t border-gray-100 bg-gray-50/60 flex flex-col gap-2">
          {/* User badge */}
          <div className="p-2.5 rounded-xl bg-white border border-gray-200/80 shadow-xs flex items-center justify-between">
            <div className="flex items-center gap-2.5 min-w-0">
              <div className="w-8 h-8 rounded-lg bg-brand-gradient flex items-center justify-center text-white text-xs font-bold shrink-0 shadow-xs">
                {session.name ? session.name.charAt(0).toUpperCase() : "A"}
              </div>
              <div className="min-w-0 flex-1">
                <div className="text-xs font-semibold text-gray-900 truncate">
                  {session.name || "Administrator"}
                </div>
                <div className="text-[10px] text-gray-500 truncate">{session.email}</div>
              </div>
            </div>
            <button
              onClick={handleLogout}
              title="Sign Out"
              className="p-1.5 text-gray-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-colors cursor-pointer"
            >
              <LogOut size={15} />
            </button>
          </div>

          <div className="flex items-center justify-between px-1">
            <Link
              href="/"
              target="_blank"
              className="inline-flex items-center gap-1.5 text-xs font-medium text-gray-500 hover:text-gray-900 transition-colors"
            >
              <span>View Live Store</span>
              <ExternalLink size={12} />
            </Link>
            <button
              onClick={handleLogout}
              className="text-xs font-medium text-rose-600 hover:text-rose-700 hover:underline transition-colors cursor-pointer"
            >
              Sign Out
            </button>
          </div>
        </div>
      </aside>

      {/* Mobile Drawer Backdrop */}
      {mobileMenuOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 lg:hidden backdrop-blur-xs transition-opacity"
          onClick={() => setMobileMenuOpen(false)}
        />
      )}

      {/* Mobile Drawer */}
      <aside
        className={`fixed inset-y-0 left-0 w-72 bg-white z-50 flex flex-col lg:hidden shadow-2xl transform transition-transform duration-300 ease-in-out ${
          mobileMenuOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="p-5 border-b border-gray-100 flex items-center justify-between">
          <Link href="/admin" className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-brand-gradient flex items-center justify-center shadow-xs">
              <span className="text-white font-bold text-sm leading-none">M</span>
            </div>
            <div>
              <div className="font-bold text-gray-900 text-sm">MobileShop QA</div>
              <div className="text-[10px] text-brand-600 font-semibold uppercase">Admin Console</div>
            </div>
          </Link>
          <button
            onClick={() => setMobileMenuOpen(false)}
            className="p-1.5 text-gray-400 hover:text-gray-700 hover:bg-gray-100 rounded-lg"
          >
            <X size={18} />
          </button>
        </div>

        <nav className="flex-1 p-4 flex flex-col gap-1 overflow-y-auto">
          {renderNavLinks()}
        </nav>

        <div className="p-4 border-t border-gray-100 bg-gray-50">
          <button
            onClick={handleLogout}
            className="w-full flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl text-sm font-medium text-rose-600 bg-rose-50 border border-rose-200 hover:bg-rose-100 transition-colors"
          >
            <LogOut size={16} />
            <span>Sign Out ({session.name || "Admin"})</span>
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Header */}
        <header className="bg-white border-b border-gray-200 px-4 sm:px-8 py-3.5 flex items-center justify-between sticky top-0 z-20">
          {/* Left: Mobile hamburger & Breadcrumb */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => setMobileMenuOpen(true)}
              className="lg:hidden p-2 text-gray-600 hover:bg-gray-100 rounded-xl"
              aria-label="Open navigation menu"
            >
              <Menu size={20} />
            </button>

            <nav className="text-sm text-gray-500 flex items-center gap-2">
              <Link href="/admin" className="hover:text-gray-900 font-medium text-xs text-gray-600">
                Admin
              </Link>
              {pathname !== "/admin" && (
                <>
                  <ChevronRight size={13} className="text-gray-400" />
                  <span className="text-gray-900 font-semibold text-xs capitalize">
                    {pathname.split("/").pop()?.replace(/-/g, " ")}
                  </span>
                </>
              )}
            </nav>
          </div>

          {/* Right Header items */}
          <div className="flex items-center gap-2.5 sm:gap-3">
            <div className="hidden sm:flex items-center gap-2 px-2.5 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-700 text-xs font-medium">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
              <span>{session.role || "Super Admin"}</span>
            </div>

            <Link
              href="/"
              target="_blank"
              className="inline-flex items-center gap-1.5 text-xs text-gray-600 hover:text-gray-900 bg-gray-100 hover:bg-gray-200 px-3 py-1.5 rounded-lg transition-colors font-medium"
            >
              <ExternalLink size={13} />
              <span className="hidden sm:inline">Live Store</span>
            </Link>

            <button
              onClick={handleLogout}
              className="inline-flex items-center gap-1.5 text-xs text-rose-600 hover:text-rose-700 hover:bg-rose-50 border border-rose-200 px-2.5 sm:px-3 py-1.5 rounded-lg transition-colors font-medium cursor-pointer"
            >
              <LogOut size={13} />
              <span className="hidden sm:inline">Sign Out</span>
            </button>
          </div>
        </header>

        {/* Content Page */}
        <main className="flex-1 p-4 sm:p-6 lg:p-8 overflow-x-hidden">{children}</main>
      </div>
    </div>
  );
}
