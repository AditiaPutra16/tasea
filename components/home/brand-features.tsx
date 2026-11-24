import React from "react";
import { Truck, ShieldCheck, Sparkles, MapPin } from "lucide-react";
import { BRAND_VALUES } from "@/data/products";

const ICONS = {
  Truck,
  ShieldCheck,
  Sparkles,
  MapPin,
};

export function BrandFeatures() {
  return (
    <section className="py-10 sm:py-16 bg-[#F9EFE6] border-b border-[#17335B]/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* 2 columns on mobile for compact, clean layout */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-6 min-w-0 max-w-full">
          {BRAND_VALUES.map((val) => {
            const IconComponent = ICONS[val.icon as keyof typeof ICONS] || Sparkles;
            return (
              <div
                key={val.title}
                className="flex flex-col items-center text-center p-3.5 sm:p-6 bg-white/60 border border-[#17335B]/10 rounded-xs shadow-2xs hover:shadow-xs transition-shadow min-w-0 max-w-full overflow-hidden"
              >
                <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-[#17335B]/10 text-[#17335B] flex items-center justify-center mb-2.5 sm:mb-4 shrink-0">
                  <IconComponent className="w-5 h-5 sm:w-6 sm:h-6" />
                </div>
                <h3 className="font-serif text-xs sm:text-sm font-bold tracking-wider uppercase text-[#17335B] mb-1 sm:mb-2 truncate max-w-full">
                  {val.title}
                </h3>
                <p className="text-[10px] sm:text-xs text-[#17335B]/75 leading-relaxed line-clamp-3 sm:line-clamp-none overflow-hidden break-words max-w-full">
                  {val.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
