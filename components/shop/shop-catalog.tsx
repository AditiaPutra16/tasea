"use client";

import React, { useState, useMemo } from "react";
import { useSearchParams, useRouter, usePathname } from "next/navigation";
import {
  SlidersHorizontal,
  ChevronDown,
  X,
  RotateCcw,
  ShoppingBag,
  Check,
} from "lucide-react";
import { PRODUCTS } from "@/data/products";
import { ProductCard } from "@/components/home/product-card";

type SortOption = "newest" | "price-asc" | "price-desc" | "bestseller";

const SORT_OPTIONS: { value: SortOption; label: string }[] = [
  { value: "newest", label: "Terbaru" },
  { value: "bestseller", label: "Bestseller" },
  { value: "price-asc", label: "Harga: Terendah" },
  { value: "price-desc", label: "Harga: Tertinggi" },
];

const SORT_LABELS: Record<SortOption, string> = {
  newest: "Terbaru",
  bestseller: "Bestseller",
  "price-asc": "Harga: Terendah",
  "price-desc": "Harga: Tertinggi",
};

const CATEGORIES = [
  { id: "ALL", label: "Semua Produk" },
  { id: "HandBag", label: "Hand Bag" },
  { id: "ShoulderBag", label: "Shoulder Bag" },
];

export function ShopCatalog() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const activeCategory = searchParams.get("category") || "ALL";
  const selectedSort = (searchParams.get("sort") as SortOption) || "newest";

  const [isFilterDrawerOpen, setIsFilterDrawerOpen] = useState(false);
  const [isMobileSortOpen, setIsMobileSortOpen] = useState(false);
  const [isDesktopSortOpen, setIsDesktopSortOpen] = useState(false);

  const closeFilterDrawer = () => {
    setIsFilterDrawerOpen(false);
    setIsMobileSortOpen(false);
  };

  // Fungsi untuk memperbarui kategori sekaligus mengubah URL query string
  const updateCategory = (newCat: string) => {
    const params = new URLSearchParams(searchParams.toString());
    if (newCat && newCat !== "ALL") {
      params.set("category", newCat);
    } else {
      params.delete("category");
    }
    const queryString = params.toString();
    const newUrl = queryString ? `${pathname}?${queryString}` : pathname;
    router.replace(newUrl, { scroll: false });
  };

  // Fungsi untuk memperbarui sort sekaligus mengubah URL query string
  const updateSort = (newSort: SortOption) => {
    const params = new URLSearchParams(searchParams.toString());
    if (newSort && newSort !== "newest") {
      params.set("sort", newSort);
    } else {
      params.delete("sort");
    }
    const queryString = params.toString();
    const newUrl = queryString ? `${pathname}?${queryString}` : pathname;
    router.replace(newUrl, { scroll: false });
  };

  // Filter & Sort Logic
  const filteredProducts = useMemo(() => {
    let result = [...PRODUCTS];

    // Filter by Category
    if (activeCategory !== "ALL") {
      const normalizedActive = activeCategory.toLowerCase().replace(/[\s-_]/g, "");
      result = result.filter(
        (p) => p.category.toLowerCase().replace(/[\s-_]/g, "") === normalizedActive
      );
    }

    // Sort Logic
    if (selectedSort === "price-asc") {
      result.sort((a, b) => a.price - b.price);
    } else if (selectedSort === "price-desc") {
      result.sort((a, b) => b.price - a.price);
    } else if (selectedSort === "bestseller") {
      result.sort((a, b) => (b.isBestseller ? 1 : 0) - (a.isBestseller ? 1 : 0));
    } else if (selectedSort === "newest") {
      result.sort((a, b) => (b.isNewArrival ? 1 : 0) - (a.isNewArrival ? 1 : 0));
    }

    return result;
  }, [activeCategory, selectedSort]);

  const handleResetFilters = () => {
    const params = new URLSearchParams(searchParams.toString());
    params.delete("category");
    params.delete("sort");
    const queryString = params.toString();
    const newUrl = queryString ? `${pathname}?${queryString}` : pathname;
    router.replace(newUrl, { scroll: false });
  };

  return (
    <div className="w-full bg-[#F9EFE6] text-[#17335B] min-h-screen">
      {/* Sticky / Dedicated Controls & Filter Bar */}
      <div className="relative z-20 border-t border-[#17335B]/10 bg-[#F9EFE6]/95 backdrop-blur-xs py-3 w-full">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between gap-3">
          {/* Left: Filter Trigger Button (sejajar persis dengan hamburger button navbar) */}
          <div className="flex items-center">
            <button
              onClick={() => setIsFilterDrawerOpen(true)}
              className="flex items-center gap-2 p-2 -ml-2 rounded-xs border border-transparent hover:border-[#17335B]/30 bg-transparent text-[#17335B] text-[13px] sm:text-xs font-semibold tracking-wider uppercase transition-all duration-200 active:scale-95 cursor-pointer"
            >
              <SlidersHorizontal className="w-4 h-4 sm:w-4 sm:h-4" />
              <span>Filter</span>
            </button>
          </div>

          {/* Right: Sorting Select (Desktop Only) & Counter Text */}
          <div className="flex items-center gap-2.5 sm:gap-4 -mr-2 sm:mr-0">
            {/* Desktop Sorting: disembunyikan di mobile mode, tampil di desktop */}
            <div className="hidden sm:inline-flex relative z-30">
              <button
                type="button"
                onClick={() => setIsDesktopSortOpen((prev) => !prev)}
                className="inline-flex items-center gap-1.5 border border-transparent hover:border-[#17335B]/30 focus:border-[#17335B]/40 rounded-xs px-2.5 py-1.5 transition-all duration-200 cursor-pointer active:scale-95"
                aria-expanded={isDesktopSortOpen}
                aria-label="Pilih opsi urutan produk"
              >
                <span className="text-xs text-[#0F223D] font-bold tracking-wider uppercase select-none whitespace-nowrap">
                  {SORT_LABELS[selectedSort]}
                </span>
                <ChevronDown
                  className={`w-3.5 h-3.5 text-[#0F223D] transition-transform duration-200 shrink-0 ${
                    isDesktopSortOpen ? "rotate-180" : ""
                  }`}
                />
              </button>

              {/* Desktop Dropdown Options Menu: rata kanan (right-0), melebar ke kiri */}
              {isDesktopSortOpen && (
                <>
                  <div
                    className="fixed inset-0 z-40"
                    onClick={() => setIsDesktopSortOpen(false)}
                  />
                  <div className="absolute right-0 top-full mt-1.5 w-max min-w-full bg-[#F9EFE6] border border-[#17335B]/30 rounded-xs shadow-xl z-50 py-1 divide-y divide-[#17335B]/10 animate-in fade-in zoom-in-95 duration-150">
                    {SORT_OPTIONS.map((opt) => {
                      const isCurrent = selectedSort === opt.value;
                      return (
                        <button
                          key={opt.value}
                          type="button"
                          onClick={() => {
                            updateSort(opt.value);
                            setIsDesktopSortOpen(false);
                          }}
                          className={`w-full text-left px-3.5 py-2 text-xs flex items-center justify-between gap-4 transition-colors cursor-pointer ${
                            isCurrent
                              ? "bg-[#17335B]/15 text-[#0F223D] font-bold"
                              : "text-[#0F223D] hover:bg-[#17335B]/10 font-semibold"
                          }`}
                        >
                          <span className="uppercase tracking-wider text-xs whitespace-nowrap">
                            {opt.label}
                          </span>
                          {isCurrent && (
                            <Check className="w-3.5 h-3.5 text-[#0F223D] shrink-0" />
                          )}
                        </button>
                      );
                    })}
                  </div>
                </>
              )}
            </div>

            {/* Counter Text (di sebelah kanan sorting) */}
            <div className="text-[11px] sm:text-xs text-[#17335B]/70 font-medium whitespace-nowrap">
              {filteredProducts.length} Produk
            </div>
          </div>
        </div>
      </div>

      {/* Main Product Grid Container */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-16">
        {filteredProducts.length > 0 ? (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-6 min-w-0 max-w-full">
            {filteredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          /* Empty State when filters yield 0 results */
          <div className="py-20 text-center max-w-md mx-auto">
            <div className="w-12 h-12 rounded-full bg-[#17335B]/10 text-[#17335B] flex items-center justify-center mx-auto mb-4">
              <ShoppingBag className="w-6 h-6" />
            </div>
            <h3 className="font-serif text-lg sm:text-xl font-bold text-[#17335B] mb-2">
              Tidak Ada Produk Ditemukan
            </h3>
            <p className="text-xs sm:text-sm text-[#17335B]/70 mb-6 leading-relaxed">
              Kombinasi filter yang Anda pilih saat ini belum memiliki produk yang cocok. Silakan atur ulang filter Anda.
            </p>
            <button
              onClick={handleResetFilters}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xs bg-[#17335B] hover:bg-[#0E203B] text-[#F9EFE6] text-xs font-semibold tracking-wider uppercase transition-colors shadow-xs active:scale-95 cursor-pointer"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Reset Filter</span>
            </button>
          </div>
        )}
      </main>

      {/* Mobile Slide-Out Filter Drawer */}
      {isFilterDrawerOpen && (
        <div className="fixed inset-0 z-50 overflow-hidden">
          {/* Backdrop */}
          <div
            className="fixed inset-0 bg-[#0F223D]/65 backdrop-blur-xs transition-opacity"
            onClick={closeFilterDrawer}
          />

          {/* Drawer Panel (Width 80vw on mobile, consistent with navbar drawer) */}
          <div className="fixed inset-y-0 left-0 w-[80vw] max-w-[80vw] sm:w-full sm:max-w-md bg-[#F9EFE6] shadow-2xl flex flex-col z-50 border-r border-[#17335B]/15 animate-in slide-in-from-left duration-300">
            {/* Drawer Header */}
            <div className="p-5 border-b border-[#17335B]/10 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <SlidersHorizontal className="w-4 h-4 text-[#17335B]" />
                <h3 className="font-serif text-base font-bold text-[#17335B] tracking-wider uppercase">
                  FILTER PRODUK
                </h3>
              </div>
              <button
                onClick={closeFilterDrawer}
                className="text-[#17335B] hover:text-[#8DA8BB] p-2 transition-colors cursor-pointer"
                aria-label="Tutup filter"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Filter Content */}
            <div className="flex-1 overflow-y-auto p-5 space-y-6">
              {/* Category Filter */}
              <div>
                <h4 className="text-sm font-bold uppercase tracking-wider text-[#17335B] mb-3.5">
                  Kategori Tas
                </h4>
                <div className="space-y-2.5 pl-3.5 sm:pl-4">
                  {CATEGORIES.map((cat) => {
                    const normalizedActive = activeCategory.toLowerCase().replace(/[\s-_]/g, "");
                    const isSelected =
                      cat.id === "ALL"
                        ? activeCategory === "ALL" || !activeCategory
                        : normalizedActive === cat.id.toLowerCase().replace(/[\s-_]/g, "");
                    return (
                      <label
                        key={cat.id}
                        className="flex items-center justify-between text-sm sm:text-[15px] text-[#17335B] cursor-pointer hover:text-[#8DA8BB] py-2 transition-colors active:opacity-75"
                      >
                        <span className={isSelected ? "font-semibold" : "font-medium"}>
                          {cat.label}
                        </span>
                        <input
                          type="radio"
                          name="mobile-cat"
                          checked={isSelected}
                          onChange={() => updateCategory(cat.id)}
                          className="accent-[#17335B] w-5 h-5 cursor-pointer shrink-0"
                        />
                      </label>
                    );
                  })}
                </div>
              </div>

              {/* Sorting Section (Hanya tampil di mobile mode, disembunyikan di browser/desktop mode) */}
              <div className="border-t border-[#17335B]/10 pt-5 sm:hidden">
                <div className="flex items-center gap-2.5 sm:gap-3">
                  <span className="text-sm font-bold uppercase tracking-wider text-[#17335B] shrink-0">
                    Urutkan
                  </span>

                  {/* Custom Mobile Dropdown Container */}
                  <div className="relative">
                    <button
                      type="button"
                      onClick={() => setIsMobileSortOpen((prev) => !prev)}
                      className="w-[160px] sm:w-[175px] h-9 flex items-center justify-between border border-transparent hover:border-[#17335B]/30 focus:border-[#17335B]/40 rounded-xs px-2 py-1.5 transition-all duration-200 cursor-pointer active:scale-95 bg-transparent"
                      aria-expanded={isMobileSortOpen}
                      aria-label="Pilih opsi urutan produk"
                    >
                      <span className="text-sm sm:text-[15px] text-[#0F223D] font-bold select-none truncate pr-1">
                        {SORT_LABELS[selectedSort]}
                      </span>
                      <ChevronDown
                        className={`w-4 h-4 text-[#0F223D] transition-transform duration-200 shrink-0 ${
                          isMobileSortOpen ? "rotate-180" : ""
                        }`}
                      />
                    </button>

                    {/* Dropdown Options Menu: Terkunci dan sejajar dengan tombol (left-0, w-[150px]) */}
                    {isMobileSortOpen && (
                      <>
                        {/* Backdrop transparan untuk menutup saat klik di luar */}
                        <div
                          className="fixed inset-0 z-40"
                          onClick={() => setIsMobileSortOpen(false)}
                        />
                        <div className="absolute right-0 top-full mt-1.5 w-[160px] sm:w-[175px] max-w-[calc(80vw-2.5rem)] bg-[#F9EFE6] border border-[#17335B]/30 rounded-xs shadow-xl z-50 py-1 divide-y divide-[#17335B]/10 animate-in fade-in zoom-in-95 duration-150">
                          {SORT_OPTIONS.map((opt) => {
                            const isCurrent = selectedSort === opt.value;
                            return (
                              <button
                                key={opt.value}
                                type="button"
                                onClick={() => {
                                  updateSort(opt.value);
                                  setIsMobileSortOpen(false);
                                }}
                                className={`w-full text-left px-3.5 py-3 text-sm sm:text-[15px] flex items-center justify-between transition-colors cursor-pointer ${
                                  isCurrent
                                    ? "bg-[#17335B]/15 text-[#0F223D] font-bold"
                                    : "text-[#0F223D] hover:bg-[#17335B]/10 font-semibold"
                                }`}
                              >
                                <span className="truncate pr-1">{opt.label}</span>
                                {isCurrent && (
                                  <Check className="w-4 h-4 text-[#0F223D] shrink-0" />
                                )}
                              </button>
                            );
                          })}
                        </div>
                      </>
                    )}
                  </div>
                </div>
              </div>
            </div>

            {/* Drawer Footer Actions */}
            <div className="p-4 border-t border-[#17335B]/10 bg-white/70 flex gap-2">
              <button
                onClick={handleResetFilters}
                className="w-1/2 py-3 px-3 rounded-xs border border-[#17335B]/30 hover:border-[#17335B] text-[#17335B] text-xs sm:text-sm font-semibold tracking-wider uppercase transition-colors text-center cursor-pointer active:scale-95"
              >
                Reset
              </button>
              <button
                onClick={closeFilterDrawer}
                className="w-1/2 py-3 px-3 rounded-xs bg-[#17335B] hover:bg-[#0E203B] text-[#F9EFE6] text-xs sm:text-sm font-semibold tracking-wider uppercase transition-colors text-center cursor-pointer shadow-xs active:scale-95"
              >
                Terapkan
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
