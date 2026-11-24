"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Phone, ChevronDown } from "lucide-react";
import { InstagramIcon } from "@/components/ui/icons";

export function Footer() {
  // Mobile accordion state
  const [openSection, setOpenSection] = useState<string | null>(null);

  const toggleSection = (section: string) => {
    setOpenSection((prev) => (prev === section ? null : section));
  };

  return (
    <footer className="bg-[#17335B] text-[#F9EFE6] pt-12 sm:pt-16 pb-12 sm:pb-16 border-t border-[#F9EFE6]/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 lg:gap-8 pb-10 border-b border-[#F9EFE6]/15">
          {/* Brand Info */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-3">
              <div className="relative w-9 h-9 sm:w-10 sm:h-10 rounded-full overflow-hidden border border-[#F9EFE6]/30">
                <Image
                  src="/images/logos/logo.jpg"
                  alt="Taséa Logo"
                  fill
                  className="object-cover"
                />
              </div>
              <span className="font-serif text-2xl tracking-[0.25em] font-bold">
                Taséa
              </span>
            </div>
            <p className="text-xs text-[#8DA8BB] leading-relaxed max-w-sm">
              As Free As The Sea
            </p>            

            {/* Social Link */}
            <div className="pt-1 flex items-center gap-3 text-xs">
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#8DA8BB]/20 hover:bg-[#8DA8BB]/40 text-[#F9EFE6] transition-colors active:scale-95"
              >
                <InstagramIcon className="w-3.5 h-3.5" />
                <span>@taseaofficial</span>
              </a>
            </div>
          </div>

          {/* Column 1: Shop Collections (Accordion on Mobile, Open on Desktop) */}
          <div className="border-t border-[#F9EFE6]/10 lg:border-t-0 pt-4 lg:pt-0">
            <button
              onClick={() => toggleSection("shop")}
              className="w-full flex items-center justify-between text-xs font-semibold tracking-widest uppercase text-[#8DA8BB] lg:pointer-events-none mb-3"
            >
              <span>KOLEKSI PRODUK</span>
              <ChevronDown
                className={`w-4 h-4 transition-transform lg:hidden ${
                  openSection === "shop" ? "rotate-180" : ""
                }`}
              />
            </button>
            <ul
              className={`space-y-2.5 text-xs text-[#F9EFE6]/80 ${
                openSection === "shop" ? "block" : "hidden lg:block"
              }`}
            >
              <li>
                <Link href="/collections/semua-produk?category=Baguette" className="hover:text-white transition-colors block py-0.5">
                  Baguette Shoulder Bag
                </Link>
              </li>
              <li>
                <Link href="/collections/semua-produk?category=Tote" className="hover:text-white transition-colors block py-0.5">
                  Tutti & Work Tote
                </Link>
              </li>
              <li>
                <Link href="/collections/semua-produk?category=Hobo" className="hover:text-white transition-colors block py-0.5">
                  Hobo Crossbody
                </Link>
              </li>
              <li>
                <Link href="/collections/semua-produk?category=Accessories" className="hover:text-white transition-colors block py-0.5">
                  Mini Pouches & Charms
                </Link>
              </li>
              <li>
                <Link href="/collections/semua-produk" className="hover:text-white transition-colors block py-0.5">
                  Bestseller Collections
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 2: Customer Care (Accordion on Mobile, Open on Desktop) */}
          <div className="border-t border-[#F9EFE6]/10 lg:border-t-0 pt-4 lg:pt-0">
            <button
              onClick={() => toggleSection("care")}
              className="w-full flex items-center justify-between text-xs font-semibold tracking-widest uppercase text-[#8DA8BB] lg:pointer-events-none mb-3"
            >
              <span>LAYANAN PELANGGAN</span>
              <ChevronDown
                className={`w-4 h-4 transition-transform lg:hidden ${
                  openSection === "care" ? "rotate-180" : ""
                }`}
              />
            </button>
            <ul
              className={`space-y-2.5 text-xs text-[#F9EFE6]/80 ${
                openSection === "care" ? "block" : "hidden lg:block"
              }`}
            >
              <li>
                <a href="#featured-products" className="hover:text-white transition-colors block py-0.5">
                  Panduan Perawatan Bahan
                </a>
              </li>
              <li>
                <a href="#featured-products" className="hover:text-white transition-colors block py-0.5">
                  Kebijakan Pengembalian & Garansi
                </a>
              </li>
              <li>
                <a href="#featured-products" className="hover:text-white transition-colors block py-0.5">
                  Informasi Pengiriman
                </a>
              </li>
              <li>
                <a href="#featured-products" className="hover:text-white transition-colors block py-0.5">
                  FAQ & Bantuan
                </a>
              </li>
              <li>
                <a
                  href="https://wa.me/6281288997700"
                  target="_blank"
                  rel="noreferrer"
                  className="hover:text-white transition-colors flex items-center gap-1.5 py-0.5"
                >
                  <Phone className="w-3 h-3 text-[#8DA8BB]" />
                  <span>CS WhatsApp (+62 812)</span>
                </a>
              </li>
            </ul>
          </div>     
        </div>

        {/* Bottom Bar */}
        <div className="pt-6 sm:pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-[#8DA8BB] text-center sm:text-left">
          <p>© 2026 TASÉA INDONESIA. ALL RIGHTS RESERVED.</p>
          <div className="flex items-center gap-3 sm:gap-4 text-[#F9EFE6]/70 text-[10px] sm:text-[11px]">
            <span>Privasi</span>
            <span>•</span>
            <span>Syarat Layanan</span>
            <span>•</span>
            <span>Kebijakan Pengiriman</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
