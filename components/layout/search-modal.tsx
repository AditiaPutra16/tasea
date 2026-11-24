"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { Search, X, ArrowUpRight } from "lucide-react";
import { useCart } from "@/context/cart-context";
import { PRODUCTS } from "@/data/products";
import { formatPrice } from "@/lib/format";

export function SearchModal() {
  const { isSearchOpen, closeSearch } = useCart();
  const [query, setQuery] = useState("");

  const handleClose = () => {
    setQuery("");
    closeSearch();
  };

  useEffect(() => {
    if (!isSearchOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setQuery("");
        closeSearch();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isSearchOpen, closeSearch]);

  if (!isSearchOpen) return null;

  const filteredProducts = query.trim()
    ? PRODUCTS.filter(
        (p) =>
          p.name.toLowerCase().includes(query.toLowerCase()) ||
          p.category.toLowerCase().includes(query.toLowerCase()) ||
          p.description.toLowerCase().includes(query.toLowerCase()) ||
          p.colors.some((c) => c.name.toLowerCase().includes(query.toLowerCase()))
      )
    : [];

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-[#0F223D]/65 backdrop-blur-xs transition-opacity"
        onClick={handleClose}
      />

      <div className="relative min-h-screen flex items-start justify-center pt-10 sm:pt-24 px-3 sm:px-4 pb-12">
        <div className="relative w-full max-w-2xl bg-[#F9EFE6] rounded-xl sm:rounded-2xl shadow-2xl p-4 sm:p-8 z-10 border border-[#17335B]/15">
          {/* Header & Close */}
          <div className="flex items-center justify-end mb-2 sm:mb-4">            
            <button
              onClick={handleClose}
              className="text-[#17335B] hover:text-[#8DA8BB] p-2 -mr-2 transition-colors active:scale-90 cursor-pointer"
              aria-label="Tutup pencarian"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Search Input */}
          <div className="relative mb-4 sm:mb-6">
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search..."
              autoFocus
              className="w-full bg-white/90 border border-[#17335B]/20 rounded-lg sm:rounded-xl py-2 sm:py-2 pl-12 pr-11 text-base sm:text-lg text-[#17335B] font-medium placeholder:text-[#17335B]/40 focus:outline-none focus:border-[#17335B] focus:ring-1 focus:ring-[#17335B] shadow-2xs transition-all"
            />
            <Search className="w-5 h-5 text-[#17335B]/60 absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none" />
            {query && (
              <button
                onClick={() => setQuery("")}
                className="absolute right-3.5 top-1/2 -translate-y-1/2 text-[#17335B]/50 hover:text-[#17335B] p-1.5 cursor-pointer active:scale-95"
                aria-label="Hapus kata kunci"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>          

          {/* Search Results */}
          <div>            
            {filteredProducts.length > 0 && (
              <div className="space-y-2.5 max-h-64 sm:max-h-72 overflow-y-auto pr-1">
                {filteredProducts.map((product) => (
                  <Link
                    key={product.id}
                    href={`/products/${product.slug}`}
                    onClick={handleClose}
                    className="flex items-center justify-between p-2.5 sm:p-3 bg-white/70 hover:bg-white rounded-md sm:rounded-lg border border-[#17335B]/10 hover:border-[#17335B]/30 transition-colors group cursor-pointer"
                  >
                    <div className="flex items-center gap-2.5 sm:gap-3">
                      <div className="relative w-11 h-13 sm:w-12 sm:h-14 rounded-sm sm:rounded-md overflow-hidden bg-[#F9EFE6] shrink-0">
                        <Image
                          src={product.primaryImage}
                          alt={product.name}
                          fill
                          className="object-cover"
                        />
                      </div>
                      <div>
                        <h4 className="text-sm font-semibold text-[#17335B] group-hover:text-[#8DA8BB] transition-colors line-clamp-1">
                          {product.name}
                        </h4>
                        <p className="text-xs font-price text-[#17335B] font-bold">
                          {formatPrice(product.price)}
                        </p>
                      </div>
                    </div>
                    <ArrowUpRight className="w-4 h-4 text-[#17335B]/40 group-hover:text-[#17335B] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all shrink-0" />
                  </Link>
                ))}
              </div>
            )}

            {query.trim() && filteredProducts.length === 0 && (
              <div className="text-center py-6 text-[#17335B]/70 text-xs">
                Tidak ada produk yang cocok dengan &quot;{query}&quot;. Coba kata kunci lain.
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
