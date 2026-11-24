"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { X, Trash2, Plus, Minus, ShoppingBag, ArrowRight } from "lucide-react";
import { useCart } from "@/context/cart-context";
import { formatPrice } from "@/lib/format";

export function CartDrawer() {
  const {
    isCartOpen,
    closeCart,
    cart,
    removeFromCart,
    updateQuantity,
    subtotal,
  } = useCart();

  const handleWhatsAppCheckout = () => {
    if (cart.length === 0) return;

    let message = "Halo Taséa, saya ingin memesan produk berikut:\n\n";
    cart.forEach((item, index) => {
      message += `${index + 1}. ${item.product.name}\n 
      Jumlah: ${item.quantity}\n   Harga: ${formatPrice(
        item.product.price * item.quantity
      )}\n\n`;
    });
    message += `Total Pesanan: ${formatPrice(subtotal)}\n`;    
    message += "\nMohon info ketersediaan stok & metode pembayarannya. Terima kasih!";

    const encoded = encodeURIComponent(message);
    window.open(`https://wa.me/6281288997700?text=${encoded}`, "_blank");
  };

  if (!isCartOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-[#0F223D]/60 backdrop-blur-xs transition-opacity"
        onClick={closeCart}
      />

      <div className="fixed inset-y-0 right-0 max-w-md w-full flex">
        <div className="w-full bg-[#F9EFE6] shadow-2xl flex flex-col h-full">
          {/* Header */}
          <div className="p-4 sm:p-5 border-b border-[#17335B]/10 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <ShoppingBag className="w-6 h-6 text-[#17335B]" />
              <h2 className="text-base sm:text-base font-serif font-bold tracking-wider text-[#17335B] uppercase">
                KERANJANG BELANJA
              </h2>
            </div>
            <button
              onClick={closeCart}
              className="text-[#17335B] hover:text-[#8DA8BB] p-2 transition-colors active:scale-90"
              aria-label="Tutup keranjang"
            >
              <X className="w-5 h-5" />
            </button>
          </div>          

          {/* Cart Item List */}
          <div className="flex-1 overflow-y-auto p-4 sm:p-5 space-y-3 sm:space-y-4">
            {cart.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-center py-12 text-[#17335B]">
                <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-[#8DA8BB]/20 flex items-center justify-center mb-4">
                  <ShoppingBag className="w-7 h-7 sm:w-8 sm:h-8 text-[#17335B]" />
                </div>
                <h3 className="text-sm sm:text-base font-medium font-serif mb-6">
                  Keranjang Anda Kosong
                </h3>                
                <Link
                  href="/collections/semua-produk"
                  onClick={closeCart}
                  className="px-6 py-3 bg-[#17335B] active:bg-[#0E203B] text-[#F9EFE6] text-xs font-semibold tracking-widest uppercase rounded-sm hover:bg-[#0E203B] transition-colors active:scale-95 inline-block"
                >
                  Mulai Belanja
                </Link>
              </div>
            ) : (
              cart.map((item) => (
                <div
                  key={`${item.product.id}-${item.selectedColor.hex}`}
                  className="flex gap-3 sm:gap-4 p-3 bg-white/80 border border-[#17335B]/10 rounded-sm shadow-2xs"
                >
                  {/* Thumbnail */}
                  <div className="relative w-18 h-22 sm:w-20 sm:h-24 bg-[#F9EFE6] rounded-xs overflow-hidden shrink-0">
                    <Image
                      src={item.product.primaryImage}
                      alt={item.product.name}
                      fill
                      className="object-cover"
                    />
                  </div>

                  {/* Details */}
                  <div className="flex-1 flex flex-col justify-between">
                    <div>
                      <div className="flex justify-between items-start gap-1">
                        <h4 className="font-serif text-sm sm:text-base font-bold text-[#17335B] tracking-wide leading-snug line-clamp-2">
                          {item.product.name}
                        </h4>
                        <button
                          onClick={() =>
                            removeFromCart(item.product.id, item.selectedColor.hex)
                          }
                          className="text-[#17335B]/50 hover:text-red-600 p-1.5 transition-colors active:scale-90"
                          aria-label="Hapus item"
                        >
                          <Trash2 className="w-4.5 h-4.5" />
                        </button>
                      </div>                      
                    </div>

                    <div className="flex items-center justify-between mt-2.5 pt-2 border-t border-[#17335B]/10">
                      {/* Quantity Stepper (Comfortable tap targets for touch) */}
                      <div className="flex items-center border border-[#17335B]/20 rounded-xs bg-[#F9EFE6]/60">
                        <button
                          onClick={() =>
                            updateQuantity(
                              item.product.id,
                              item.selectedColor.hex,
                              item.quantity - 1
                            )
                          }
                          className="w-7 h-7 flex items-center justify-center hover:text-[#8DA8BB] transition-colors active:scale-90"
                          aria-label="Kurangi jumlah"
                        >
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="px-2 text-sm font-semibold text-[#17335B] min-w-[20px] text-center">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() =>
                            updateQuantity(
                              item.product.id,
                              item.selectedColor.hex,
                              item.quantity + 1
                            )
                          }
                          className="w-7 h-7 flex items-center justify-center hover:text-[#8DA8BB] transition-colors active:scale-90"
                          aria-label="Tambah jumlah"
                        >
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>

                      {/* Item Total */}
                      <div className="text-base font-semibold text-[#17335B] font-price">
                        {formatPrice(item.product.price * item.quantity)}
                      </div>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Footer Checkout with Safe-Area-Inset for mobile screens */}
          {cart.length > 0 && (
            <div className="p-4 sm:p-5 border-t border-[#17335B]/10 bg-white/70 space-y-3 pb-[max(1rem,env(safe-area-inset-bottom))]">
              <div className="flex justify-between items-center text-sm">
                <span className="text-[#17335B] text-sm sm:text-sm">Subtotal</span>
                <span className="font-price font-bold text-base sm:text-base text-[#17335B]">
                  {formatPrice(subtotal)}
                </span>
              </div>              

              <div className="space-y-2 pt-1">
                <button
                  onClick={handleWhatsAppCheckout}
                  className="w-full py-3 sm:py-3.5 px-4 bg-[#17335B] active:bg-[#0E203B] hover:bg-[#0E203B] text-[#F9EFE6] text-xs font-semibold tracking-widest uppercase rounded-sm flex items-center justify-center gap-2 transition-all shadow-xs active:scale-95"
                >
                  <span>Pesan via WhatsApp</span>
                  <ArrowRight className="w-4 h-4" />
                </button>

                <Link
                  href="/collections/semua-produk"
                  onClick={closeCart}
                  className="w-full py-2.5 px-4 border border-[#17335B]/30 hover:border-[#17335B] text-[#17335B] text-xs font-medium tracking-wider uppercase rounded-sm transition-colors active:scale-95 text-center block"
                >
                  Lanjut Belanja
                </Link>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
