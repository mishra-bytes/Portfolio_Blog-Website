"use client";

import Image from "next/image";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { useState } from "react";

type CarouselSlide = {
  src: string;
  alt: string;
  caption: string;
};

type ImageCarouselProps = {
  slides: readonly CarouselSlide[];
};

const swipeThreshold = 9000;

function wrapIndex(length: number, index: number) {
  return (index + length) % length;
}

export function ImageCarousel({ slides }: ImageCarouselProps) {
  const [page, setPage] = useState(0);
  const [direction, setDirection] = useState(0);
  const shouldReduceMotion = useReducedMotion();

  const activeIndex = wrapIndex(slides.length, page);
  const activeSlide = slides[activeIndex];

  function paginate(nextDirection: number) {
    setDirection(nextDirection);
    setPage((current) => current + nextDirection);
  }

  return (
    <div className="group relative">
      <div className="relative aspect-[16/10] overflow-hidden rounded-[1.75rem] border border-white/10 bg-panel-strong shadow-[0_18px_48px_rgba(0,0,0,0.28)]">
        <AnimatePresence custom={direction} initial={false} mode="wait">
          <motion.div
            key={activeSlide.src}
            custom={direction}
            className="absolute inset-0"
            drag={shouldReduceMotion ? false : "x"}
            dragConstraints={{ left: 0, right: 0 }}
            dragElastic={0.12}
            onDragEnd={(_, info) => {
              const swipePower = Math.abs(info.offset.x) * info.velocity.x;

              if (swipePower < -swipeThreshold) {
                paginate(1);
              } else if (swipePower > swipeThreshold) {
                paginate(-1);
              }
            }}
            initial={
              shouldReduceMotion
                ? { opacity: 0 }
                : { opacity: 0, x: direction > 0 ? 36 : -36 }
            }
            animate={{ opacity: 1, x: 0 }}
            exit={
              shouldReduceMotion
                ? { opacity: 0 }
                : { opacity: 0, x: direction > 0 ? -36 : 36 }
            }
            transition={{ duration: shouldReduceMotion ? 0.22 : 0.42, ease: [0.22, 1, 0.36, 1] }}
          >
            <Image
              src={activeSlide.src}
              alt={activeSlide.alt}
              fill
              sizes="(max-width: 768px) 100vw, 1100px"
              className="object-cover"
              priority={activeIndex === 0}
            />
            <div className="pointer-events-none absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-black/85 via-black/45 to-transparent" />
            <div className="absolute inset-x-0 bottom-0 z-10 p-5 sm:p-6">
              <p className="max-w-2xl text-sm leading-6 text-white sm:text-base">
                {activeSlide.caption}
              </p>
            </div>
          </motion.div>
        </AnimatePresence>

        <button
          type="button"
          onClick={() => paginate(-1)}
          className="absolute left-3 top-1/2 z-20 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full border border-white/12 bg-black/45 text-white opacity-100 backdrop-blur transition-all duration-200 hover:border-accent/60 hover:bg-black/60 sm:opacity-0 sm:group-hover:opacity-100 sm:group-focus-within:opacity-100"
          aria-label="Previous slide"
        >
          <span aria-hidden="true" className="text-lg leading-none">
            {"<"}
          </span>
        </button>
        <button
          type="button"
          onClick={() => paginate(1)}
          className="absolute right-3 top-1/2 z-20 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full border border-white/12 bg-black/45 text-white opacity-100 backdrop-blur transition-all duration-200 hover:border-accent/60 hover:bg-black/60 sm:opacity-0 sm:group-hover:opacity-100 sm:group-focus-within:opacity-100"
          aria-label="Next slide"
        >
          <span aria-hidden="true" className="text-lg leading-none">
            {">"}
          </span>
        </button>
      </div>

      <div className="mt-4 flex items-center justify-center gap-2">
        {slides.map((slide, index) => {
          const isActive = index === activeIndex;

          return (
            <button
              key={slide.src}
              type="button"
              onClick={() => {
                setDirection(index > activeIndex ? 1 : -1);
                setPage(index);
              }}
              className={`h-2.5 rounded-full transition-all duration-200 ${
                isActive
                  ? "w-8 bg-accent shadow-[0_0_18px_var(--color-accent-glow)]"
                  : "w-2.5 bg-white/25 hover:bg-white/45"
              }`}
              aria-label={`Go to slide ${index + 1}`}
              aria-current={isActive ? "true" : "false"}
            />
          );
        })}
      </div>
    </div>
  );
}
