import { HeroCarousel } from "@/components/home/HeroCarousel";
import { CategoryGrid } from "@/components/home/CategoryGrid";
import { PromoBanners } from "@/components/home/PromoBanners";
import { FeaturedProducts } from "@/components/home/FeaturedProducts";
import { TrustBadges } from "@/components/home/TrustBadges";

export default function HomePage() {
  return (
    <>
      <HeroCarousel />
      <TrustBadges />
      <CategoryGrid />
      <PromoBanners />
      <FeaturedProducts title="Featured Products" subtitle="Top picks available now in Qatar — ships from Doha" />
      <PromoBanners />
      <FeaturedProducts title="Best Sellers" subtitle="Qatar's most loved gadgets this month" />
    </>
  );
}
