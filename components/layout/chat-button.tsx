"use client";

import React from "react";
import { usePathname } from "next/navigation";
import { MessageCircle } from "lucide-react";

export function ChatButton() {
  const pathname = usePathname();
  const isProductDetailPage = pathname?.startsWith("/products");

  const message = encodeURIComponent("Hallo Taséa");
  const waUrl = `https://wa.me/6281288997700?text=${message}`;

  return (
    <a
      href={waUrl}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Obrolan WhatsApp Taséa"
      className={`fixed bottom-5 right-5 sm:bottom-6 sm:right-6 z-40 items-center gap-2 px-3.5 py-2.5 sm:px-4 sm:py-3 bg-white text-[#17335B] rounded-full shadow-lg hover:shadow-xl border border-[#17335B]/15 hover:border-[#17335B]/30 hover:scale-105 active:scale-95 transition-all duration-200 cursor-pointer group ${
        isProductDetailPage ? "hidden sm:flex" : "flex"
      }`}
    >
      <MessageCircle className="w-5 h-5 text-[#17335B] group-hover:scale-110 transition-transform" />
      <span className="text-xs sm:text-sm font-semibold tracking-wide">
        Obrolan
      </span>
    </a>
  );
}
