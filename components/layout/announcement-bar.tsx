"use client";

import React, { useState, useEffect } from "react";

const ANNOUNCEMENTS = [
  "GRATIS ONGKIR SELURUH INDONESIA MIN. BELANJA RP 1.000.000",
  "NEW ARRIVALS: WARNA SLATE BLUE & CREAM TELAH HADIR", 
  "DISKON 10% PESANAN PERTAMA KODE: TASEAFIRST",
];

export function AnnouncementBar() {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % ANNOUNCEMENTS.length);
    }, 4500);
    return () => clearInterval(timer);
  }, []);

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev - 1 + ANNOUNCEMENTS.length) % ANNOUNCEMENTS.length);
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % ANNOUNCEMENTS.length);
  };

  return (
    <div className="bg-[#17335B] text-[#F9EFE6] text-[9.5px] sm:text-xs font-medium tracking-wider sm:tracking-widest uppercase py-2 sm:py-2.5 px-2 sm:px-4 transition-colors w-full max-w-full overflow-hidden">
      <div className="max-w-7xl mx-auto flex items-center justify-between w-full min-w-0">
        <button
          onClick={handlePrev}
          aria-label="Previous announcement"
          className="text-[#8DA8BB] hover:text-[#F9EFE6] transition-colors p-1 active:scale-90 shrink-0"
        >          
        </button>

        <div className="text-center truncate px-2 sm:px-3 flex-1 min-w-0 overflow-hidden transition-opacity duration-300">
          <span className="block truncate">{ANNOUNCEMENTS[currentIndex]}</span>
        </div>

        <button
          onClick={handleNext}
          aria-label="Next announcement"
          className="text-[#8DA8BB] hover:text-[#F9EFE6] transition-colors p-1 active:scale-90 shrink-0"
        >          
        </button>
      </div>
    </div>
  );
}
