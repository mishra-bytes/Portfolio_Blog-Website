"use client";

import Link from "next/link";
import {
  AnimatePresence,
  motion,
  useReducedMotion,
} from "framer-motion";
import { useState } from "react";
import { formatBlogDate } from "@/lib/format-date";
import type { BlogPostSummary } from "@/lib/posts";

type HomeBlogCarouselProps = {
  posts: BlogPostSummary[];
};

export function HomeBlogCarousel({ posts }: HomeBlogCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(0);
  const shouldReduceMotion = useReducedMotion();

  if (posts.length === 0) {
    return null;
  }

  const activePost = posts[currentIndex];
  const canGoLeft = currentIndex > 0;
  const canGoRight = currentIndex < posts.length - 1;

  function handlePrev() {
    if (!canGoLeft) {
      return;
    }

    setDirection(-1);
    setCurrentIndex((current) => current - 1);
  }

  function handleNext() {
    if (!canGoRight) {
      return;
    }

    setDirection(1);
    setCurrentIndex((current) => current + 1);
  }

  return (
    <div className="relative">
      {canGoLeft ? (
        <button
          type="button"
          onClick={handlePrev}
          aria-label="Show previous blog post"
          className="absolute top-1/2 -left-4 z-20 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-white/10 bg-[#1a1a1a] text-white shadow-lg transition-all hover:bg-[#2a2a2a]"
        >
          &larr;
        </button>
      ) : null}

      {canGoRight ? (
        <button
          type="button"
          onClick={handleNext}
          aria-label="Show next blog post"
          className="absolute top-1/2 -right-4 z-20 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-white/10 bg-[#1a1a1a] text-white shadow-lg transition-all hover:bg-[#2a2a2a]"
        >
          &rarr;
        </button>
      ) : null}

      <div className="relative z-10 overflow-hidden">
        <AnimatePresence custom={direction} initial={false} mode="wait">
          <motion.div
            key={activePost.slug}
            custom={direction}
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
            transition={{
              duration: shouldReduceMotion ? 0.22 : 0.42,
              ease: [0.22, 1, 0.36, 1],
            }}
          >
            <Link href={`/blog/${activePost.slug}`} className="group block">
              <article className="flex min-h-[300px] cursor-pointer flex-col justify-between rounded-2xl border border-white/10 bg-white/5 p-6 transition-all duration-300 hover:border-white/20 hover:bg-white/10 md:min-h-[340px] md:p-8">
                <div>
                  <p className="text-sm text-slate-500">
                    {formatBlogDate(activePost.date)}
                  </p>
                  <h3 className="mt-4 text-2xl font-semibold text-white transition-colors group-hover:text-blue-400 md:text-3xl">
                    {activePost.title}
                  </h3>
                  <p className="mt-4 max-w-3xl text-sm leading-7 text-slate-400 md:text-base">
                    {activePost.excerpt}
                  </p>
                </div>
                <div className="mt-6 inline-flex items-center gap-2 text-sm font-medium text-slate-300 transition-colors group-hover:text-white">
                  <span>Read article</span>
                  <span aria-hidden="true">&rarr;</span>
                </div>
              </article>
            </Link>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
