"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { HERO_SLIDES } from "@/data/products";

const SLIDE_DURATION = 10000; // 10 detik per slide
const RING_RADIUS = 8;
const CIRCUMFERENCE = 2 * Math.PI * RING_RADIUS; // ~50.265

export function HeroSlider() {
  const [current, setCurrent] = useState(0);
  const [progress, setProgress] = useState(0); // 0% to 100%
  const [timerKey, setTimerKey] = useState(0);

  const goToSlide = (index: number) => {
    setCurrent(index);
    setProgress(0);
    setTimerKey((k) => k + 1);
  };

  // Continuous frame-accurate progress ring & slide switcher
  useEffect(() => {
    let animationFrameId: number;
    const startTime = performance.now();

    const update = (now: number) => {
      const elapsed = now - startTime;
      const currentProgress = Math.min((elapsed / SLIDE_DURATION) * 100, 100);
      setProgress(currentProgress);

      if (elapsed >= SLIDE_DURATION) {
        // Slide berpindah otomatis ke gambar berikutnya dan progres kembali ke 0%
        setCurrent((prev) => (prev + 1) % HERO_SLIDES.length);
        setProgress(0);
        setTimerKey((k) => k + 1);
        return;
      }

      animationFrameId = requestAnimationFrame(update);
    };

    animationFrameId = requestAnimationFrame(update);
    return () => cancelAnimationFrame(animationFrameId);
  }, [current, timerKey]);

  return (
    <section
      className="relative w-full overflow-hidden bg-[#F9EFE6] border-b border-[#17335B]/10 select-none touch-pan-y"
    >
      <div className="relative w-full h-[320px] sm:h-[440px] md:h-[540px] lg:h-[620px]">
        {HERO_SLIDES.map((slide, idx) => {
          const isActive = idx === current;
          return (
            <div
              key={slide.id}
              className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
                isActive ? "opacity-100 z-10" : "opacity-0 z-0 pointer-events-none"
              }`}
            >
              {/* Pure Clean Banner Image (Clickable to Products) */}
              <Link
                href={slide.ctaLink || "#featured-products"}
                className="block relative w-full h-full cursor-pointer"
                aria-label={slide.imageAlt}
              >
                <Image
                  src={slide.image}
                  alt={slide.imageAlt}
                  fill
                  priority={idx === 0}
                  className="object-cover object-center"
                />
              </Link>
            </div>
          );
        })}

        {/* Circular Dots Indicators with Real-time Clockwise Progress Ring */}
        <div className="absolute bottom-4 sm:bottom-6 left-0 right-0 z-20 flex justify-center items-center gap-2 sm:gap-2.5">
          {HERO_SLIDES.map((_, i) => {
            const isActive = i === current;
            return (
              <button
                key={i}
                onClick={() => goToSlide(i)}
                aria-label={`Pindah ke slide ${i + 1}`}
                className="relative w-6 h-6 flex items-center justify-center focus:outline-none transition-transform active:scale-90 cursor-pointer"
              >
                {isActive ? (
                  <>
                    {/* SVG Animated Circular Ring */}
                    <svg
                      className="w-6 h-6 pointer-events-none absolute inset-0"
                      viewBox="0 0 24 24"
                    >
                      {/* Background Faint Track */}
                      <circle
                        cx="12"
                        cy="12"
                        r={RING_RADIUS}
                        fill="none"
                        stroke="#17335B"
                        strokeOpacity="0.25"
                        strokeWidth="1.2"
                      />
                      {/* Clockwise Animated Progress Line */}
                      <circle
                        cx="12"
                        cy="12"
                        r={RING_RADIUS}
                        fill="none"
                        stroke="#17335B"
                        strokeWidth="1.8"
                        strokeLinecap="round"
                        strokeDasharray={CIRCUMFERENCE}
                        strokeDashoffset={CIRCUMFERENCE * (1 - progress / 100)}
                        transform="rotate(-90 12 12)"
                      />
                    </svg>
                    {/* Active Center Solid Circular Dot */}
                    <div className="w-1.5 h-1.5 rounded-full bg-[#17335B]" />
                  </>
                ) : (
                  <>
                    {/* Inactive Circular Dot */}
                    <div className="w-1.5 h-1.5 rounded-full bg-[#17335B]/30 hover:bg-[#17335B]/70 transition-all hover:scale-125" />
                  </>
                )}
              </button>
            );
          })}
        </div>
      </div>
    </section>
  );
}
