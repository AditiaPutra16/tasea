import React from "react";
import Image from "next/image";
import { InstagramIcon } from "@/components/ui/icons";
import { INSTAGRAM_POSTS } from "@/data/products";

export function InstagramFeed() {
  return (
    <section className="py-16 sm:py-24 bg-[#F9EFE6] border-b border-[#17335B]/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-xl mx-auto mb-12">
          <span className="text-[11px] font-semibold tracking-[0.3em] uppercase text-[#8DA8BB] block mb-2">
            COMMUNITY & LOOKBOOK
          </span>
          <h2 className="font-serif text-2xl sm:text-3xl font-bold tracking-tight text-[#17335B] mb-2">
            TASÉA IN REAL LIFE
          </h2>
          <p className="text-xs sm:text-sm text-[#17335B]/75">
            Ikuti kami di Instagram <span className="font-semibold text-[#17335B]">@taseaofficial</span> dan bagikan gaya Anda dengan tagar <span className="italic">#ColorForLife</span>
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-5 min-w-0 max-w-full">
          {INSTAGRAM_POSTS.map((post) => (
            <div
              key={post.id}
              className="group relative aspect-square rounded-xs overflow-hidden bg-[#17335B]/5 shadow-2xs border border-[#17335B]/10"
            >
              <Image
                src={post.image}
                alt={post.caption}
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-500"
              />
              {/* Overlay on hover */}
              <div className="absolute inset-0 bg-[#17335B]/75 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-between p-4 text-white">
                <div className="flex justify-end">
                  <InstagramIcon className="w-4 h-4 text-[#8DA8BB]" />
                </div>
                <div>
                  <p className="text-[11px] font-semibold text-[#F9EFE6] mb-1">
                    {post.tag}
                  </p>
                  <p className="text-[10px] text-[#8DA8BB] line-clamp-2">
                    {post.caption}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
