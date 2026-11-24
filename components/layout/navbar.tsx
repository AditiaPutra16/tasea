"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { Search, ShoppingBag, Menu, X, ChevronDown } from "lucide-react";
import { useCart } from "@/context/cart-context";

interface SubItem {
  label: string;
  href: string;
}

interface NavItem {
  label: string;
  href: string;
  subItems?: SubItem[];
}

export function Navbar() {
  const { totalItems, openCart, openSearch } = useCart();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [expandedMenu, setExpandedMenu] = useState<string | null>("BAGS");

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 15);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Lock body scroll and listen for Escape key when sidebar is open
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setIsSidebarOpen(false);
    };

    if (isSidebarOpen) {
      window.addEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "";
    };
  }, [isSidebarOpen]);

  const navLinks: NavItem[] = [
    { label: "HOME", href: "/" },
    { label: "SHOP", href: "/collections/semua-produk" },
    { label: "WISHLIST", href: "/wishlist" },
  ];

  const toggleSubmenu = (label: string) => {
    setExpandedMenu((prev) => (prev === label ? null : label));
  };

  return (
    <>
      <header
        className={`sticky top-0 z-40 w-full transition-all duration-300 ${isScrolled
            ? "bg-[#F9EFE6]/95 backdrop-blur-md shadow-sm border-b border-[#17335B]/10"
            : "bg-[#F9EFE6] border-b border-[#17335B]/5"
          }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 sm:h-20">
            {/* Left: Universal Hamburger Menu Button (Desktop & Mobile) */}
            <div className="flex items-center">
              <button
                onClick={() => setIsSidebarOpen(true)}
                className="flex items-center gap-2 text-[#17335B] hover:text-[#8DA8BB] p-2 -ml-2 rounded-xs transition-colors active:scale-95 group cursor-pointer"
                aria-label="Buka menu sidebar"
              >
                <Menu className="w-5 h-5 sm:w-6 sm:h-6 group-hover:scale-105 transition-transform" />
              </button>
            </div>

            {/* Center: Brand Logo */}
            <div className="flex justify-center items-center">
              <Link href="/" className="flex items-center gap-2.5 group">
                <div className="flex flex-col items-center">
                  <span className="font-serif text-2xl sm:text-3xl tracking-[0.2em] sm:tracking-[0.22em] text-[#17335B] font-bold leading-none">
                    Taséa
                  </span>
                </div>
              </Link>
            </div>

            {/* Right: Action Icons (Search & Cart) */}
            <div className="flex items-center gap-1.5 sm:gap-3 text-[#17335B]">
              {/* Search Button */}
              <button
                onClick={openSearch}
                aria-label="Cari produk"
                className="p-1.5 sm:p-2 hover:text-[#8DA8BB] transition-colors active:scale-95 cursor-pointer"
              >
                <Search className="w-5 h-5" />
              </button>

              {/* Shopping Bag Button */}
              <button
                onClick={openCart}
                aria-label="Buka Keranjang"
                className="p-1.5 sm:p-2 hover:text-[#8DA8BB] transition-colors relative flex items-center active:scale-95 cursor-pointer"
              >
                <ShoppingBag className="w-5 h-5" />
                {totalItems > 0 && (
                  <span className="absolute -top-0.5 -right-0.5 bg-[#17335B] text-[#F9EFE6] text-[9px] sm:text-[10px] font-bold w-4 h-4 sm:w-5 sm:h-5 rounded-full flex items-center justify-center border-2 border-[#F9EFE6]">
                    {totalItems}
                  </span>
                )}
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Universal Slide-Out Navigation Sidebar (Drawer) */}
      {isSidebarOpen && (
        <div className="fixed inset-0 z-50 overflow-hidden">
          {/* Backdrop with Blur */}
          <div
            className="fixed inset-0 bg-[#0F223D]/65 backdrop-blur-xs transition-opacity duration-300"
            onClick={() => setIsSidebarOpen(false)}
          />

          {/* Sidebar Panel */}
          <div className="fixed inset-y-0 left-0 w-[80vw] max-w-[80vw] sm:w-full sm:max-w-md bg-[#F9EFE6] shadow-2xl flex flex-col z-50 border-r border-[#17335B]/15 animate-in slide-in-from-left duration-300">
            {/* Sidebar Header */}
            <div className="p-5 sm:p-6 border-b border-[#17335B]/10 flex items-center justify-between">
              <div className="flex items-center gap-2.5">
              </div>
              <button
                onClick={() => setIsSidebarOpen(false)}
                className="text-[#17335B] hover:text-[#8DA8BB] p-2 rounded-xs transition-colors active:scale-90 cursor-pointer"
                aria-label="Tutup menu sidebar"
              >
                <X className="w-5 h-5 sm:w-6 sm:h-6" />
              </button>
            </div>

            {/* Navigation Menu List */}
            <nav className="flex-1 overflow-y-auto px-5 sm:px-6 py-6 space-y-4">
              {navLinks.map((link) => {
                const hasSub = Boolean(link.subItems && link.subItems.length > 0);
                const isExpanded = expandedMenu === link.label;

                return (
                  <div key={link.label} className="border-b border-[#17335B]/10 pb-3">
                    {hasSub ? (
                      <div>
                        <button
                          onClick={() => toggleSubmenu(link.label)}
                          className="w-full flex items-center justify-between text-sm sm:text-base font-serif font-bold text-[#17335B] hover:text-[#8DA8BB] transition-colors uppercase tracking-wider py-1 cursor-pointer"
                        >
                          <span>{link.label}</span>
                          <ChevronDown
                            className={`w-4 h-4 text-[#8DA8BB] transition-transform duration-200 ${isExpanded ? "rotate-180" : ""
                              }`}
                          />
                        </button>

                        {/* Submenu Links */}
                        {isExpanded && link.subItems && (
                          <div className="pl-4 mt-2.5 space-y-2 border-l-2 border-[#17335B]/20">
                            {link.subItems.map((sub) => (
                              <Link
                                key={sub.label}
                                href={sub.href}
                                onClick={() => setIsSidebarOpen(false)}
                                className="block py-1 text-xs sm:text-sm text-[#17335B]/80 hover:text-[#17335B] hover:translate-x-1 transition-all"
                              >
                                {sub.label}
                              </Link>
                            ))}
                          </div>
                        )}
                      </div>
                    ) : (
                      <Link
                        href={link.href}
                        onClick={() => setIsSidebarOpen(false)}
                        className="block text-sm sm:text-base font-serif font-bold text-[#17335B] hover:text-[#8DA8BB] hover:translate-x-1 transition-all uppercase tracking-wider py-1"
                      >
                        {link.label}
                      </Link>
                    )}
                  </div>
                );
              })}
            </nav>
          </div>
        </div>
      )}
    </>
  );
}
