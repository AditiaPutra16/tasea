import React from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Sparkles, Feather, ShieldCheck } from "lucide-react";

export function EditorialBanner() {
  return (
    <section id="story" className="py-12 sm:py-24 bg-[#17335B] text-[#F9EFE6] overflow-hidden border-b border-[#F9EFE6]/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          {/* Visual Showcase */}
          <div className="relative">
            <div className="relative aspect-4/3 w-full rounded-xs overflow-hidden shadow-2xl border border-[#F9EFE6]/20">
              <Image
                src="/images/banner2.jpg"
                alt="Taséa Craftsmanship and Material"
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0F223D]/60 via-transparent to-transparent" />
            </div>

            {/* Mobile & Desktop Accent Badge */}
            <div className="mt-3 sm:mt-0 sm:absolute sm:-bottom-8 sm:right-6 bg-[#F9EFE6] text-[#17335B] p-3.5 sm:p-5 rounded-xs shadow-xl border border-[#17335B]/10 max-w-sm">
              <p className="text-[9px] sm:text-[10px] tracking-widest uppercase font-bold text-[#8DA8BB] mb-0.5 sm:mb-1">
                WATER-REPELLENT COATING
              </p>
              <p className="text-[11px] sm:text-xs font-serif font-semibold">
                Perlindungan optimal terhadap hujan ringan dan tumpahan kopi harian.
              </p>
            </div>
          </div>

          {/* Text Content */}
          <div className="space-y-4 sm:space-y-6 pt-2 lg:pt-0">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#8DA8BB]/20 text-[#8DA8BB] text-[11px] sm:text-xs font-semibold tracking-widest uppercase">
              <Sparkles className="w-3.5 h-3.5" />
              <span>THE TASÉA SIGNATURE</span>
            </div>

            <h2 className="font-serif text-2xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-[#F9EFE6] leading-tight">
              DIBUAT UNTUK BERGERAK BERSAMA ANDA
            </h2>

            <p className="text-xs sm:text-sm text-[#8DA8BB] leading-relaxed">
              Setiap detail siluet Taséa diciptakan dari gabungan material berbobot ringan, struktur kokoh namun fleksibel, serta pilihan palet warna eksklusif. Menghasilkan tas yang tidak membebani pundak, mudah dibersihkan, dan selalu tampil memikat di segala suasana.
            </p>

            <div className="grid grid-cols-2 gap-3 sm:gap-4 pt-1">
              <div className="p-3.5 sm:p-4 rounded-xs bg-white/5 border border-white/10 space-y-1">
                <Feather className="w-4 h-4 sm:w-5 sm:h-5 text-[#8DA8BB]" />
                <h4 className="text-[11px] sm:text-xs font-bold tracking-wider uppercase text-white">
                  Ultra Lightweight
                </h4>
                <p className="text-[10px] sm:text-[11px] text-[#8DA8BB] leading-normal">
                  Rata-rata berat tas di bawah 450 gram untuk kenyamanan sepanjang hari.
                </p>
              </div>

              <div className="p-3.5 sm:p-4 rounded-xs bg-white/5 border border-white/10 space-y-1">
                <ShieldCheck className="w-4 h-4 sm:w-5 sm:h-5 text-[#8DA8BB]" />
                <h4 className="text-[11px] sm:text-xs font-bold tracking-wider uppercase text-white">
                  Durable Hardware
                </h4>
                <p className="text-[10px] sm:text-[11px] text-[#8DA8BB] leading-normal">
                  Aksesori logam anti-karat dengan ritsleting halus tahan ribuan kali buka-tutup.
                </p>
              </div>
            </div>

            <div className="pt-2 sm:pt-4">
              <Link
                href="/collections/semua-produk"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 bg-[#F9EFE6] active:bg-[#8DA8BB] hover:bg-[#8DA8BB] text-[#17335B] hover:text-white text-xs font-bold tracking-widest uppercase rounded-xs transition-colors shadow-md active:scale-95"
              >
                <span>Temukan Koleksi Lengkap</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
