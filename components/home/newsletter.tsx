"use client";

import React, { useState } from "react";
import { Mail, Check, ArrowRight } from "lucide-react";

export function Newsletter() {
  const [email, setEmail] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setIsSubmitted(true);
  };

  return (
    <section className="py-12 sm:py-20 bg-[#F9EFE6]">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center">
        <div className="w-10 h-10 rounded-full bg-[#17335B]/10 text-[#17335B] flex items-center justify-center mx-auto mb-3 sm:mb-4">
          <Mail className="w-5 h-5" />
        </div>

        <span className="text-[10px] sm:text-[11px] font-semibold tracking-[0.3em] uppercase text-[#8DA8BB] block mb-1.5 sm:mb-2">
          TASÉA SOCIETY
        </span>

        <h2 className="font-serif text-xl sm:text-3xl font-bold tracking-tight text-[#17335B] mb-2 sm:mb-3">
          DAPATKAN DISKON 10% UNTUK PESANAN PERTAMA
        </h2>

        <p className="text-xs sm:text-sm text-[#17335B]/80 max-w-md mx-auto mb-6 sm:mb-8">
          Jadilah yang pertama mengetahui peluncuran warna baru, koleksi edisi terbatas, dan undangan acara privat di boutique kami.
        </p>

        {isSubmitted ? (
          <div className="max-w-md mx-auto p-3.5 sm:p-4 bg-emerald-50 border border-emerald-300 rounded-xs text-emerald-800 text-xs flex items-center justify-center gap-2">
            <Check className="w-4 h-4 text-emerald-600 shrink-0" />
            <span>Terima kasih! Kode voucher <strong>TASEAFIRST</strong> telah dikirim ke email Anda.</span>
          </div>
        ) : (
          <form
            onSubmit={handleSubmit}
            className="flex flex-col sm:flex-row gap-2 max-w-md mx-auto"
          >
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Masukkan alamat email Anda..."
              required
              className="flex-1 bg-white/95 border border-[#17335B]/20 rounded-xs px-4 py-3 sm:py-3.5 text-xs text-[#17335B] placeholder:text-[#17335B]/40 focus:outline-none focus:border-[#17335B] focus:ring-1 focus:ring-[#17335B]"
            />
            <button
              type="submit"
              className="w-full sm:w-auto px-6 py-3 sm:py-3.5 bg-[#17335B] active:bg-[#0E203B] hover:bg-[#0E203B] text-[#F9EFE6] text-xs font-semibold tracking-widest uppercase rounded-xs transition-colors flex items-center justify-center gap-2 shadow-xs shrink-0 active:scale-95"
            >
              <span>Berlangganan</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </form>
        )}

        <p className="text-[10px] text-[#17335B]/50 mt-3 sm:mt-4">
          Kami menghargai privasi Anda. Anda dapat berhenti berlangganan kapan saja.
        </p>
      </div>
    </section>
  );
}
