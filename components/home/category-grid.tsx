import React from "react";
import Image from "next/image";
import Link from "next/link";
import { CATEGORIES } from "@/data/products";

export function CategoryGrid() {
  return (
    <section className="pt-2 pb-12 sm:pb-20 bg-[#F9EFE6] border-b border-[#17335B]/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">        
        <div className="grid grid-cols-2 gap-3 sm:gap-6 min-w-0 max-w-full overflow-hidden">
          {CATEGORIES.map((cat) => (
            <Link
              key={cat.id}
              href={cat.link}
              className="group block relative overflow-hidden"
            >
              {/* Image Container with Zoom effect */}
              <div className="relative aspect-3/4 w-full overflow-hidden bg-[#F9EFE6]">
                <Image
                  src={cat.image}
                  alt={cat.title}
                  fill
                  sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
                  className="object-cover object-center group-hover:scale-105 transition-transform duration-700 ease-out"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#17335B]/85 via-[#17335B]/30 to-transparent opacity-85 group-hover:opacity-95 transition-opacity" />
                
                {/* Category Text Overlay */}
                <div className="absolute inset-x-0 bottom-0 p-3 gap-4 sm:p-4 text-white flex flex-col items-start justify-end">
                  <h3 className="font-serif text-xs sm:text-base font-bold tracking-wider uppercase mb-1.5 sm:mb-2">
                    {cat.title}
                  </h3>                  
                  <div className="inline-flex items-center gap-1.5 px-2.5 sm:px-3 py-1 sm:py-1.5 rounded-xs bg-[#F9EFE6] text-[#17335B] text-[10px] sm:text-xs font-semibold tracking-wider uppercase shadow-xs group-hover:bg-white transition-colors">
                    <span>EXPLORE MORE</span>                    
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
