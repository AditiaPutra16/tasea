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
    <div className="w-full bg-[#F9EFE6] min-h-[calc(100vh-80px)] py-8 sm:py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        {/* Breadcrumbs */}
        <div className="flex items-center gap-2 text-xs text-[#8DA8BB] mb-6">
          <Link href="/" className="hover:text-[#17335B] transition-colors">
            Beranda
          </Link>
          <span>/</span>
          <span className="text-[#17335B] font-medium">Wishlist</span>
        </div>

        {/* Page Header */}
        <div className="border-b border-[#17335B]/10 pb-5 mb-6 sm:mb-8 flex flex-col sm:flex-row sm:items-end justify-between gap-2">
          <div>
            <h1 className="text-2xl sm:text-3xl font-serif font-bold text-[#17335B] tracking-wide">
              Wishlist Saya
            </h1>
            <p className="text-xs sm:text-sm text-[#17335B]/70 mt-1">
              Daftar koleksi produk impian yang Anda simpan.
            </p>
          </div>
          {wishlistedProducts.length > 0 && (
            <span className="text-xs font-semibold text-[#8DA8BB] tracking-wider uppercase">
              {wishlistedProducts.length} Produk
            </span>
          )}
        </div>

        {/* Wishlist Items List (Styled like Cart Drawer items) */}
        {wishlistedProducts.length === 0 ? (
          <div className="flex flex-col items-center justify-center text-center py-16 sm:py-20 px-4 bg-white/70 border border-[#17335B]/10 rounded-sm shadow-2xs">
            <div className="w-16 h-16 rounded-full bg-[#8DA8BB]/20 flex items-center justify-center mb-4 text-[#17335B]">
              <Heart className="w-8 h-8 text-[#17335B]" />
            </div>
            <h2 className="text-base sm:text-lg font-serif font-bold text-[#17335B] mb-2">
              Wishlist Anda Kosong
            </h2>
            <p className="text-xs sm:text-sm text-[#17335B]/70 max-w-sm mb-6 leading-relaxed">
              Belum ada produk favorit yang disimpan. Sentuh ikon hati pada produk yang Anda sukai untuk menyimpannya di sini.
            </p>
            <Link
              href="/collections/semua-produk"
              className="px-6 py-3 bg-[#17335B] active:bg-[#0E203B] hover:bg-[#0E203B] text-[#F9EFE6] text-xs font-semibold tracking-widest uppercase rounded-xs transition-colors active:scale-95 inline-flex items-center gap-2"
            >
              <span>Mulai Belanja</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        ) : (
          <div className="space-y-3 sm:space-y-4">
            {wishlistedProducts.map((product) => (
              <div
                key={product.id}
                className="flex gap-3 sm:gap-4 p-3 sm:p-4 bg-white/80 border border-[#17335B]/10 rounded-sm shadow-2xs hover:shadow-xs transition-all"
              >
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
                    <div className="flex justify-between items-start gap-2">
                      <Link
                        href={`/products/${product.slug}`}
                        className="font-serif text-sm sm:text-base font-bold text-[#17335B] hover:text-[#8DA8BB] transition-colors tracking-wide leading-snug line-clamp-2"
                      >
                        {product.name}
                      </Link>
                      <button
                        type="button"
                        onClick={() => toggleWishlist(product.id)}
                        className="text-[#17335B]/50 hover:text-red-600 p-1.5 transition-colors active:scale-90 shrink-0 cursor-pointer"
                        aria-label="Hapus dari wishlist"
                        title="Hapus dari wishlist"
                      >
                        <Trash2 className="w-4.5 h-4.5" />
                      </button>
                    </div>

                    <p className="text-[11px] sm:text-xs text-[#8DA8BB] mt-1">
                      {product.category} • {product.colors.length} Pilihan Warna
                    </p>
                  </div>

                  {/* Bottom Row: Price & Actions */}
                  <div className="flex flex-wrap items-center justify-between gap-3 mt-3 pt-2.5 border-t border-[#17335B]/10">
                    {/* Price */}
                    <div className="flex flex-col">
                      {product.originalPrice && (
                        <span className="text-[11px] sm:text-xs text-[#17335B]/45 line-through font-price font-medium leading-none mb-0.5">
                          {formatPrice(product.originalPrice)}
                        </span>
                      )}
                      <span className="text-sm sm:text-base font-bold text-[#17335B] font-price leading-tight">
                        {formatPrice(product.price)}
                      </span>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex items-center gap-2">
                      <button
                        type="button"
                        onClick={() => addToCart(product, product.colors[0], 1)}
                        className="px-3.5 py-2 bg-[#17335B] active:bg-[#0E203B] hover:bg-[#0E203B] text-[#F9EFE6] text-xs font-semibold tracking-wider uppercase rounded-xs transition-colors flex items-center gap-1.5 active:scale-95 cursor-pointer shadow-2xs"
                      >
                        <ShoppingBag className="w-3.5 h-3.5" />
                        <span>+ Keranjang</span>
                      </button>
                      <Link
                        href={`/products/${product.slug}`}
                        className="px-3 py-2 border border-[#17335B]/20 hover:border-[#17335B] text-[#17335B] text-xs font-semibold tracking-wider uppercase rounded-xs transition-colors flex items-center gap-1 active:scale-95"
                      >
                        <span className="hidden sm:inline">Detail</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
