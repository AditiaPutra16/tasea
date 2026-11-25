"use client";

import React, { useState } from "react";
import Image from "next/image";
import {
  ChevronDown,
  ShoppingBag,
  Check,
  Minus,
  Plus,
  Maximize2,
  X,
} from "lucide-react";
import { Product, ColorOption } from "@/types";
import { useCart } from "@/context/cart-context";
import { PRODUCTS } from "@/data/products";
import { ProductCard } from "@/components/home/product-card";
import { formatPrice } from "@/lib/format";

interface ProductDetailProps {
  product: Product;
}

export function ProductDetail({ product }: ProductDetailProps) {
  const { addToCart, openCart } = useCart();

  // Color selection
  const selectedColor: ColorOption = product.colors[0] || { name: "Default", hex: "#17335B" };

  // Gallery images list (supports multiple angles)
  const galleryImages = product.images && product.images.length > 0
    ? product.images
    : [
        product.primaryImage,
        product.secondaryImage || product.primaryImage,
        "/images/banner1.jpg",
        "/images/banner2.jpg",
      ];

  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);
  const [quantity, setQuantity] = useState(1);
  const [isAdding, setIsAdding] = useState(false);
  const [isDimensionsOpen, setIsDimensionsOpen] = useState(false);

  const handleAddToCart = () => {
    setIsAdding(true);
    addToCart(product, selectedColor, quantity);
    setTimeout(() => {
      setIsAdding(false);
      openCart();
    }, 400);
  };

  const handleBuyNow = () => {
    addToCart(product, selectedColor, quantity);
    openCart();
  };

  // Related products from the same category or bestsellers
  const relatedProducts = PRODUCTS.filter((p) => p.id !== product.id).slice(0, 4);

  return (
    <div className="w-full bg-[#F9EFE6] text-[#17335B] min-h-screen pb-32 sm:pb-0">
      
      {/* 1. Main Product Showcase Container */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-14 items-start">
          
          {/* LEFT: Multi-Angle Image Gallery (7 cols on lg) */}
          <div className="lg:col-span-7 flex flex-col-reverse sm:flex-row gap-3 sm:gap-4">
            {/* Thumbnail Column (Desktop Vertical, Mobile Horizontal) */}
            <div className="flex sm:flex-col gap-2 sm:gap-3 overflow-x-auto sm:overflow-y-auto sm:max-h-[640px] shrink-0 pb-1 sm:pb-0 scrollbar-none">
              {galleryImages.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveImageIndex(idx)}
                  className={`relative w-16 h-20 sm:w-20 sm:h-26 rounded-xs sm:rounded-sm overflow-hidden border transition-all cursor-pointer shrink-0 ${
                    activeImageIndex === idx
                      ? "border-[#17335B] ring-1 ring-[#17335B] shadow-xs"
                      : "border-[#17335B]/15 opacity-70 hover:opacity-100"
                  }`}
                  aria-label={`Lihat foto ${idx + 1}`}
                >
                  <Image
                    src={img}
                    alt={`${product.name} thumbnail ${idx + 1}`}
                    fill
                    sizes="80px"
                    className="object-cover object-center"
                  />
                </button>
              ))}
            </div>

            {/* Main Primary Image Display */}
            <div className="relative flex-1 aspect-4/5 w-full bg-white/60 rounded-xs sm:rounded-sm overflow-hidden border border-[#17335B]/10 shadow-sm group">
              <Image
                src={galleryImages[activeImageIndex]}
                alt={`${product.name} view ${activeImageIndex + 1}`}
                fill
                priority
                sizes="(max-width: 1024px) 100vw, 55vw"
                className="object-cover object-center transition-transform duration-700 ease-out group-hover:scale-105"
              />              

              {/* Zoom & Maximize Button */}
              <button
                onClick={() => setIsLightboxOpen(true)}
                className="absolute top-4 right-4 p-2 bg-[#F9EFE6]/90 hover:bg-white text-[#17335B] rounded-xs shadow-xs transition-colors cursor-pointer opacity-0 group-hover:opacity-100 duration-200"
                aria-label="Perbesar gambar"
              >
                <Maximize2 className="w-4 h-4" />
              </button>

              {/* Mobile Image Counter Pill */}
              <div className="absolute bottom-3 right-3 sm:hidden px-2.5 py-1 bg-[#0F223D]/70 text-white text-[10px] font-bold tracking-wider rounded-full backdrop-blur-xs">
                {activeImageIndex + 1} / {galleryImages.length}
              </div>
            </div>
          </div>

          {/* RIGHT: Product Information, Purchase Options & Accordions (5 cols on lg) */}
          <div className="lg:col-span-5 flex flex-col space-y-6 lg:sticky lg:top-24">
            
            {/* Header: Brand line, Title, Price */}
            <div>
              <div className="flex items-center justify-between gap-3 mb-2">
                <span className="text-[11px] sm:text-xs font-bold tracking-[0.25em] uppercase text-[#8DA8BB]">
                  TASÉA • {product.category}
                </span>                
              </div>

              <h1 className="font-serif text-2xl sm:text-3xl lg:text-[32px] font-bold text-[#17335B] tracking-tight leading-snug mb-3">
                {product.name}
              </h1>

              {/* Price & Original Price (Harga asli di atas harga diskon) */}
              <div className="flex flex-col">
                {product.originalPrice && (
                  <span className="text-xs sm:text-sm text-[#17335B]/45 line-through font-price font-medium leading-none mb-1">
                    {formatPrice(product.originalPrice)}
                  </span>
                )}
                <span className="font-price text-2xl sm:text-[26px] font-bold text-[#17335B] leading-tight tracking-tight">
                  {formatPrice(product.price)}
                </span>
              </div>
            </div>            

            {/* Collapsible Dimensions */}
            <div className="border-y border-[#17335B]/15 divide-y divide-[#17335B]/10">                          
              {/* Size & Dimensions */}
              <div>
                <button
                  onClick={() => setIsDimensionsOpen((prev) => !prev)}
                  className="w-full py-4 flex items-center justify-between text-left text-xs sm:text-sm font-bold uppercase tracking-wider text-[#17335B] hover:text-[#8DA8BB] transition-colors cursor-pointer"
                  aria-expanded={isDimensionsOpen}
                >
                  <span>Guide Size</span>
                  <ChevronDown
                    className={`w-4 h-4 text-[#17335B] transition-transform duration-200 ${
                      isDimensionsOpen ? "rotate-180" : ""
                    }`}
                  />
                </button>
                {isDimensionsOpen && (
                  <div className="pb-4 text-xs sm:text-sm text-[#17335B]/80 leading-relaxed animate-in fade-in duration-200">
                    <div className="space-y-2 bg-white/50 p-3 rounded-xs border border-[#17335B]/10">
                      <div className="flex justify-between py-1 border-b border-[#17335B]/5">
                        <span className="font-semibold text-[#17335B]">Dimensi Tubuh Tas:</span>
                        <span>{product.dimensions || "28 x 21 x 13 cm"}</span>
                      </div>
                      <div className="flex justify-between py-1 border-b border-[#17335B]/5">
                        <span className="font-semibold text-[#17335B]">Panjang Handle Drop:</span>
                        <span>{product.handleDrop || "11 cm"}</span>
                      </div>
                      <div className="flex justify-between py-1 border-b border-[#17335B]/5">
                        <span className="font-semibold text-[#17335B]">Panjang Tali Selempang:</span>
                        <span>{product.strapLength || "60 ~ 115 cm (Adjustable)"}</span>
                      </div>
                      <div className="flex justify-between py-1">
                        <span className="font-semibold text-[#17335B]">Perkiraan Berat:</span>
                        <span>{product.weight || "340 gram"}</span>
                      </div>
                    </div>
                  </div>
                )}
              </div>              
            </div>

            {/* Desktop Purchase Controls (Quantity & Action Buttons) */}
            <div className="hidden sm:flex sm:flex-col gap-2.5">
              {/* Row 1: Quantity Stepper & Tambah ke Keranjang in One Row */}
              <div className="flex items-center gap-3">
                {/* Quantity Stepper */}
                <div className="flex items-center border border-[#17335B]/25 rounded-xs bg-white/70 overflow-hidden shrink-0 h-[48px]">
                  <button
                    onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                    disabled={quantity <= 1}
                    className="px-3 h-full text-[#17335B] hover:bg-[#17335B]/10 disabled:opacity-30 disabled:hover:bg-transparent transition-colors cursor-pointer flex items-center justify-center"
                    aria-label="Kurangi jumlah"
                  >
                    <Minus className="w-4 h-4" />
                  </button>
                  <span className="w-12 text-center font-bold text-sm sm:text-base text-[#17335B] select-none">
                    {quantity}
                  </span>
                  <button
                    onClick={() => setQuantity((q) => q + 1)}
                    className="px-3 h-full text-[#17335B] hover:bg-[#17335B]/10 transition-colors cursor-pointer flex items-center justify-center"
                    aria-label="Tambah jumlah"
                  >
                    <Plus className="w-4 h-4" />
                  </button>
                </div>

                {/* Tambah ke Keranjang */}
                <button
                  onClick={handleAddToCart}
                  disabled={isAdding}
                  className="flex-1 h-[48px] px-6 rounded-xs bg-[#17335B] hover:bg-[#0E203B] text-[#F9EFE6] text-xs sm:text-sm font-bold tracking-widest uppercase transition-all shadow-md active:scale-98 cursor-pointer flex items-center justify-center gap-2"
                >
                  {isAdding ? (
                    <>
                      <Check className="w-4 h-4 animate-bounce" />
                      <span>Berhasil Ditambahkan</span>
                    </>
                  ) : (
                    <>
                      <ShoppingBag className="w-4 h-4" />
                      <span>Tambah ke Keranjang</span>
                    </>
                  )}
                </button>
              </div>

              {/* Row 2: Beli Sekarang */}
              <button
                onClick={handleBuyNow}
                className="w-full h-[48px] px-6 rounded-xs border border-[#17335B] bg-white/70 hover:bg-white text-[#17335B] text-xs sm:text-sm font-bold tracking-widest uppercase transition-all shadow-xs active:scale-98 cursor-pointer flex items-center justify-center"
              >
                Beli Sekarang
              </button>
            </div>                        

          </div>
        </div>
      </div>      

      {/* 2. Related Products Grid ('Anda Mungkin Juga Menyukai') */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16">
        <div className="text-center mb-8 sm:mb-12">          
          <h3 className="font-serif text-xl sm:text-2xl font-bold text-[#17335B] tracking-wider uppercase">
            YOU MAY ALSO LIKE
          </h3>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-6 min-w-0 max-w-full">
          {relatedProducts.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      </section>

      {/* 3. Mobile Sticky Bottom Action Bar (2 Rows) */}
      <div className="fixed bottom-0 inset-x-0 z-40 bg-[#F9EFE6]/95 backdrop-blur-md border-t border-[#17335B]/15 px-4 py-3 sm:hidden shadow-[0_-4px_20px_rgba(23,51,91,0.12)] flex flex-col gap-2.5">
        {/* Baris 1: Harga di sebelah kiri, Quantity di sebelah kanan */}
        <div className="flex items-center justify-between gap-3">
          <div className="flex flex-col justify-center min-w-0">
            {product.originalPrice && (
              <span className="text-[13px] text-[#17335B]/45 line-through font-price font-medium truncate leading-none mb-0.5">
                {formatPrice(product.originalPrice)}
              </span>
            )}
            <span className="font-price text-base sm:text-lg font-bold text-[#17335B] truncate leading-tight tracking-tight">
              {formatPrice(product.price)}
            </span>
          </div>

          {/* Quantity Stepper */}
          <div className="flex items-center border border-[#17335B]/25 rounded-xs bg-white/90 overflow-hidden shrink-0 h-9">
            <button
              onClick={() => setQuantity((q) => Math.max(1, q - 1))}
              disabled={quantity <= 1}
              className="px-3 h-full text-[#17335B] hover:bg-[#17335B]/10 disabled:opacity-30 disabled:hover:bg-transparent transition-colors cursor-pointer"
              aria-label="Kurangi jumlah"
            >
              <Minus className="w-3.5 h-3.5" />
            </button>
            <span className="w-8 text-center font-bold text-sm sm:text-base text-[#17335B] select-none">
              {quantity}
            </span>
            <button
              onClick={() => setQuantity((q) => q + 1)}
              className="px-3 h-full text-[#17335B] hover:bg-[#17335B]/10 transition-colors cursor-pointer"
              aria-label="Tambah jumlah"
            >
              <Plus className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* Baris 2: Tombol Keranjang kiri, Beli Sekarang kanan */}
        <div className="grid grid-cols-2 gap-2">
          {/* Tombol Keranjang */}
          <button
            onClick={handleAddToCart}
            disabled={isAdding}
            className="w-full h-11 px-3 rounded-xs border border-[#17335B] bg-white hover:bg-white/90 active:scale-98 text-[#17335B] text-xs font-bold uppercase tracking-wider transition-all flex items-center justify-center gap-1.5 shadow-2xs cursor-pointer"
          >
            {isAdding ? (
              <>
                <Check className="w-4 h-4 text-emerald-600 animate-bounce" />
                <span className="truncate">Ditambahkan</span>
              </>
            ) : (
              <>
                <ShoppingBag className="w-4 h-4" />
                <span className="truncate">Keranjang</span>
              </>
            )}
          </button>

          {/* Tombol Beli Sekarang */}
          <button
            onClick={handleBuyNow}
            className="w-full h-11 px-3 rounded-xs bg-[#17335B] hover:bg-[#0E203B] active:scale-98 text-[#F9EFE6] text-xs font-bold uppercase tracking-wider transition-all flex items-center justify-center shadow-xs cursor-pointer"
          >
            <span className="truncate">Beli Sekarang</span>
          </button>
        </div>
      </div>

      {/* 4. Lightbox Fullscreen Modal */}
      {isLightboxOpen && (
        <div className="fixed inset-0 z-50 bg-[#0F223D]/95 flex items-center justify-center p-4">
          <button
            onClick={() => setIsLightboxOpen(false)}
            className="absolute top-4 right-4 p-2 text-white/80 hover:text-white transition-colors cursor-pointer"
            aria-label="Tutup tampilan penuh"
          >
            <X className="w-6 h-6" />
          </button>
          <div className="relative w-full max-w-4xl aspect-4/5 max-h-[85vh]">
            <Image
              src={galleryImages[activeImageIndex]}
              alt={product.name}
              fill
              className="object-contain"
            />
          </div>
        </div>
      )}
    </div>
  );
}
