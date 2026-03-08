"use client";

import Link from "next/link";
import { useRef } from "react";
import { formatBlogDate } from "@/lib/format-date";
import type { BlogPostSummary } from "@/lib/posts";

type HomeBlogCarouselProps = {
  posts: BlogPostSummary[];
};

export function HomeBlogCarousel({ posts }: HomeBlogCarouselProps) {
  const scrollRef = useRef<HTMLDivElement>(null);

  function scrollLeft() {
    scrollRef.current?.scrollBy({ left: -420, behavior: "smooth" });
  }

  function scrollRight() {
    scrollRef.current?.scrollBy({ left: 420, behavior: "smooth" });
  }

  if (posts.length === 0) {
    return null;
  }

  return (
    <div className="relative">
      {posts.length > 1 ? (
        <>
          <button
            type="button"
            onClick={scrollLeft}
            aria-label="Scroll blog posts left"
            className="absolute top-1/2 -left-4 z-20 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-white/10 bg-[#1a1a1a] text-white shadow-lg transition-all hover:bg-[#2a2a2a]"
          >
            &larr;
          </button>
          <button
            type="button"
            onClick={scrollRight}
            aria-label="Scroll blog posts right"
            className="absolute top-1/2 -right-4 z-20 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-white/10 bg-[#1a1a1a] text-white shadow-lg transition-all hover:bg-[#2a2a2a]"
          >
            &rarr;
          </button>
        </>
      ) : null}

      <div
        ref={scrollRef}
        className="hide-scrollbar relative z-10 flex gap-6 overflow-x-auto snap-x snap-mandatory"
      >
        {posts.map((post) => (
          <div
            key={post.slug}
            className="min-w-[300px] snap-start md:min-w-[400px]"
          >
            <Link href={`/blog/${post.slug}`} className="group block h-full">
              <article className="flex h-full cursor-pointer flex-col justify-between rounded-2xl border border-white/10 bg-white/5 p-6 transition-all duration-300 hover:border-white/20 hover:bg-white/10">
                <div>
                  <p className="text-sm text-slate-500">
                    {formatBlogDate(post.date)}
                  </p>
                  <h3 className="mt-4 text-2xl font-semibold text-white transition-colors group-hover:text-blue-400">
                    {post.title}
                  </h3>
                  <p className="mt-4 line-clamp-3 text-sm leading-7 text-slate-400">
                    {post.excerpt}
                  </p>
                </div>
                <div className="mt-6 inline-flex items-center gap-2 text-sm font-medium text-slate-300 transition-colors group-hover:text-white">
                  <span>Read article</span>
                  <span aria-hidden="true">&rarr;</span>
                </div>
              </article>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}
