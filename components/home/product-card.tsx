"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Product } from "@/types";
import { formatPrice } from "@/lib/format";

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <Link
      href={`/products/${product.slug}`}
      className="group flex flex-col rounded-lg sm:rounded-xl overflow-hidden border border-[#17335B]/10 shadow-2xs hover:shadow-md transition-all duration-300 min-w-0 max-w-full block bg-white"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Image Container with Hover Crossfade */}
      <div className="relative aspect-4/5 w-full overflow-hidden block">
        {/* Primary and Secondary Image Crossfade */}
        <Image
          src={product.primaryImage}
          alt={product.name}
          fill
          sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
          className={`object-cover object-center transition-opacity duration-500 ease-in-out ${
            isHovered && product.secondaryImage ? "opacity-0" : "opacity-100"
          }`}
        />
        {product.secondaryImage && (
          <Image
            src={product.secondaryImage}
            alt={`${product.name} Alternate View`}
            fill
            sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
            className={`object-cover object-center transition-opacity duration-500 ease-in-out ${
              isHovered ? "opacity-100 scale-105" : "opacity-0"
            }`}
          />
        )}        
      </div>

      {/* Product Information */}
      <div className="bg-white p-2.5 sm:p-3.5 flex-1 flex flex-col justify-between space-y-2 border-t border-[#17335B]/10">
        <div>
          <h3 className="font-serif text-sm sm:text-base font-bold text-[#17335B] group-hover:text-[#8DA8BB] transition-colors tracking-wide leading-snug line-clamp-1">
            {product.name}
          </h3>
        </div>

        {/* Pricing */}
        <div className="pt-2 border-t border-[#17335B]/10 flex items-center justify-between gap-2 min-w-0">
          <div className="flex flex-col min-w-0 flex-1 overflow-hidden">
            {product.originalPrice && (
              <span className="block text-[11px] sm:text-sm text-[#17335B]/45 line-through truncate leading-none mb-0.5 font-price font-medium">
                {formatPrice(product.originalPrice)}
              </span>
            )}
            <span className="block text-sm sm:text-base font-price font-bold text-[#17335B] truncate leading-tight tracking-tight">
              {formatPrice(product.price)}
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
}
