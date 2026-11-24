import { HeroSlider } from "@/components/home/hero-slider";
import { BrandStatement } from "@/components/home/brand-statement";
import { CategoryGrid } from "@/components/home/category-grid";
import { ContentBanner } from "@/components/home/content-banner";
import { FeaturedProducts } from "@/components/home/featured-products";

export default function Home() {
  return (
    <div className="w-full max-w-full overflow-x-hidden">
      {/* 1. Hero Slideshow Carousel (Fibreno behavior) */}
      <HeroSlider />

      {/* 2. Brand Statement: Color for Life & Philosophy */}
      <BrandStatement />

      {/* 3. Category Grid Showcase */}
      <CategoryGrid />

      {/* 4. Full-Width Static Content Banner with Title & Description */}
      <ContentBanner />

      {/* 5. Featured & Bestseller Bags with Color Swatches & Quick Add */}
      <FeaturedProducts />
    </div>
  );
}
