"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Heart, Trash2, ShoppingBag, ArrowRight } from "lucide-react";
import { useCart } from "@/context/cart-context";
import { PRODUCTS } from "@/data/products";
import { formatPrice } from "@/lib/format";
import { Product } from "@/types";

export function WishlistView() {
  const { wishlist, toggleWishlist, addToCart } = useCart();

  const wishlistedProducts = wishlist
    .map((id) => PRODUCTS.find((p) => p.id === id))
    .filter((p): p is Product => Boolean(p));

  return (
    <div className="w-full bg-[#F9EFE6] min-h-[calc(100vh-80px)] py-4 sm:py-6">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">        

        {/* Page Header */}
        <div className="border-b border-[#17335B]/10 pb-4 mb-6 sm:mb-8 flex flex-col sm:flex-row sm:items-end justify-between gap-2">
          <div>
            <h1 className="text-xl sm:text-2xl font-serif font-bold text-[#17335B] tracking-wide">
              Wishlist Saya
            </h1>            
          </div>          
        </div>

        {/* Wishlist Items List (Full-screen 2-column grid on desktop, 1-column on mobile) */}
        {wishlistedProducts.length === 0 ? (
          <div className="flex flex-col items-center justify-center text-center py-20 sm:py-28 px-4 bg-white/70 border border-[#17335B]/10 rounded-sm shadow-2xs w-full">
            <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-[#8DA8BB]/20 flex items-center justify-center mb-5 text-[#17335B]">
              <Heart className="w-8 h-8 sm:w-10 sm:h-10 text-[#17335B]" />
            </div>
            <h2 className="text-lg sm:text-xl font-serif font-bold text-[#17335B] mb-2">
              Wishlist Anda Kosong
            </h2>            
            <Link
              href="/collections/semua-produk"
              className="px-8 py-3.5 bg-[#17335B] active:bg-[#0E203B] hover:bg-[#0E203B] text-[#F9EFE6] text-xs font-semibold tracking-widest uppercase rounded-xs transition-colors active:scale-95 inline-flex items-center gap-2 shadow-xs"
            >
              <span>Mulai Belanja</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-5">
            {wishlistedProducts.map((product) => (
              <div
                key={product.id}
                className="p-3.5 sm:p-4 bg-white/80 border border-[#17335B]/10 rounded-sm shadow-2xs hover:shadow-xs transition-all flex flex-col justify-between"
              >
                {/* Top Section: Photo + Product Info */}
                <div className="flex gap-3 sm:gap-4">
                  {/* Thumbnail */}
                  <Link
                    href={`/products/${product.slug}`}
                    className="relative w-20 h-24 sm:w-24 sm:h-28 bg-[#F9EFE6] rounded-xs overflow-hidden shrink-0 group block"
                  >
                    <Image
                      src={product.primaryImage}
                      alt={product.name}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </Link>

                  {/* Details */}
                  <div className="flex-1 flex flex-col justify-between min-w-0">
                    <div>
                      <div className="flex justify-between items-start gap-1">
                        <Link
                          href={`/products/${product.slug}`}
                          className="font-serif text-base sm:text-xl font-bold text-[#17335B] hover:text-[#8DA8BB] transition-colors tracking-wide leading-snug line-clamp-2"
                        >
                          {product.name}
                        </Link>
                        <button
                          type="button"
                          onClick={() => toggleWishlist(product.id)}
                          className="text-[#17335B]/40 hover:text-red-600 p-1.5 -mr-1 -mt-1 transition-colors active:scale-90 shrink-0 cursor-pointer"
                          aria-label="Hapus dari wishlist"
                          title="Hapus dari wishlist"
                        >
                          <Trash2 className="w-4.5 h-4.5 sm:w-4.5 sm:h-4.5" />
                        </button>
                      </div>
                    </div>

                    {/* Price */}
                    <div className="mt-2 flex flex-col">
                      {product.originalPrice && (
                        <span className="text-[11px] sm:text-xs text-[#17335B]/45 line-through font-price font-medium leading-none mb-0.5">
                          {formatPrice(product.originalPrice)}
                        </span>
                      )}
                      <span className="text-sm sm:text-base font-bold text-[#17335B] font-price leading-tight">
                        {formatPrice(product.price)}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Action Buttons: Full width 50/50 split on mobile, neat on desktop */}
                <div className="mt-3 pt-2.5 border-t border-[#17335B]/10 grid grid-cols-2 sm:flex sm:justify-end items-center gap-2">
                  <button
                    type="button"
                    onClick={() => addToCart(product, product.colors[0], 1)}
                    className="w-full sm:w-auto px-4 py-2 bg-[#17335B] active:bg-[#0E203B] hover:bg-[#0E203B] text-[#F9EFE6] text-xs font-semibold tracking-wider uppercase rounded-xs transition-colors flex items-center justify-center gap-1.5 active:scale-95 cursor-pointer shadow-2xs whitespace-nowrap"
                  >
                    <ShoppingBag className="w-3.5 h-3.5" />
                    <span>+ Keranjang</span>
                  </button>
                  <Link
                    href={`/products/${product.slug}`}
                    className="w-full sm:w-auto px-4 py-2 border border-[#17335B]/20 hover:border-[#17335B] text-[#17335B] text-xs font-semibold tracking-wider uppercase rounded-xs transition-colors flex items-center justify-center gap-1 active:scale-95 text-center whitespace-nowrap"
                  >
                    <span>Detail</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
