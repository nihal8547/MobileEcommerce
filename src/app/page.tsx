import { HeroCarousel } from "@/components/home/HeroCarousel";
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

      {/* 2. Shop by Category (Round Style) */}
      <CategoryGrid />

      {/* 3. Flash Deals with Live Countdown */}
      <FlashDeals />

      {/* 4. Promotional Banners */}
      <PromoBanners />

      {/* 5. Trending Flagships (Wider Cards Layout) */}
      <FeaturedProducts
        title="Trending Flagships"
        subtitle="Qatar's most loved smartphones and gadgets — same-day delivery in Doha"
      />

      {/* 6. Official Brand Partners & Agency Warranty */}
      <BrandShowcase />

      {/* 7. Qatar Customer Reviews & Social Proof */}
      <QatarCustomerReviews />

      {/* 8. VIP Club & QAR 50 Discount Offer */}
      <NewsletterSection />
    </>
  );
}
