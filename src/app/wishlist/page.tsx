import type { Metadata } from "next";
import { WishlistPageClient } from "@/components/wishlist/WishlistPageClient";

export const metadata: Metadata = {
  title: "My Wishlist — Saved Tech & Flagships",
  description:
    "View your saved smartphones, smartwatches, and accessories at MobileShop Qatar. Enjoy official warranty and free express delivery across Doha.",
};

export default function WishlistPage() {
  return <WishlistPageClient />;
}
