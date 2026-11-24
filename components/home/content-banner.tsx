import React from "react";
import Image from "next/image";

export function ContentBanner() {
  return (
    <section className="w-full max-w-full overflow-hidden bg-[#F9EFE6]">
      {/* Title & Deskripsi Singkat berada di atas gambar secara vertikal */}
      <div className="pt-10 sm:pt-16 pb-6 sm:pb-10 px-4 sm:px-6 text-center max-w-3xl mx-auto flex flex-col items-center">        
        <h2 className="font-serif text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight text-[#17335B] mb-2 sm:mb-3">
          As Free As The Sea
        </h2>
        <div className="w-10 sm:w-12 h-0.5" />
        <p className="text-xs sm:text-sm md:text-base text-[#17335B]/85 max-w-xl mx-auto font-normal leading-relaxed">
          A bag brand inspired by the freedom of the sea.
        </p>
      </div>

      {/* Full-width static content banner foto hanya diam (tidak tertimpa teks) */}
      <div className="relative w-full h-[300px] sm:h-[440px] md:h-[560px] lg:h-[680px]">
        <Image
          src="/images/banner-content.jpg"
          alt="Taséa Signature Luxury Collection"
          fill
          priority
          sizes="100vw"
          className="object-cover object-center"
        />
      </div>
    </section>
  );
}
