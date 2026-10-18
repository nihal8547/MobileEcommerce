import { HeroCarousel } from "@/components/home/HeroCarousel";
import { TrustBadges } from "@/components/home/TrustBadges";
import { CategoryGrid } from "@/components/home/CategoryGrid";
import { FlashDeals } from "@/components/home/FlashDeals";
import { PromoBanners } from "@/components/home/PromoBanners";
import { FeaturedProducts } from "@/components/home/FeaturedProducts";
import { BrandShowcase } from "@/components/home/BrandShowcase";
import { QatarCustomerReviews } from "@/components/home/QatarCustomerReviews";
import { NewsletterSection } from "@/components/home/NewsletterSection";

export default function HomePage() {
  return (
    <>
      {/* 1. Hero Carousel */}
      <HeroCarousel />

      {/* 2. Trust & Service Highlights */}
      <TrustBadges />

      {/* 3. Shop by Category (Round Style) */}
      <CategoryGrid />

      {/* 4. Flash Deals with Live Countdown */}
      <FlashDeals />

      {/* 5. Promotional Banners */}
      <PromoBanners />

      {/* 6. Trending Flagships (Wider Cards Layout) */}
      <FeaturedProducts
        title="Trending Flagships"
        subtitle="Qatar's most loved smartphones and gadgets — same-day delivery in Doha"
      />

      {/* 7. Official Brand Partners */}
      <BrandShowcase />

      {/* 8. Qatar Customer Reviews & Social Proof */}
      <QatarCustomerReviews />

      {/* 9. VIP Club & QAR 50 Discount Offer */}
      <NewsletterSection />
    </>
  );
}
