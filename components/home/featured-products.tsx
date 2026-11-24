import React from "react";
import { PRODUCTS } from "@/data/products";
import { ProductCard } from "./product-card";

export function FeaturedProducts() {
  const bestsellerProducts = PRODUCTS.filter((product) => product.isBestseller);

  return (
    <section id="featured-products" className="pt-12 sm:pt-24 pb-8 sm:pb-12 bg-[#F9EFE6]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-6 sm:mb-12">
          <span className="text-[10px] sm:text-[11px] font-semibold tracking-[0.3em] uppercase text-[#8DA8BB] block">
            SIGNATURE BAGS
          </span>
        </div>

        {/* Product Grid (2 columns on mobile, 4 columns on desktop) */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-6 min-w-0 max-w-full">
          {bestsellerProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>

      {/* Garis Horizontal setelah FeaturedProducts dengan jarak/gap */}
      <div className="mt-10 sm:mt-16 w-full border-b border-[#17335B]/20" />
    </section>
  );
}
