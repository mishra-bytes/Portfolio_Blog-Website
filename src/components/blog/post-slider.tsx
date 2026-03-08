"use client";

import Link from "next/link";
import { useRef } from "react";
import { formatBlogDate } from "@/lib/format-date";
import type { BlogPostSummary } from "@/lib/posts";

type PostSliderProps = {
  posts: BlogPostSummary[];
};

export function PostSlider({ posts }: PostSliderProps) {
  const scrollRef = useRef<HTMLDivElement>(null);

  function scrollLeft() {
    scrollRef.current?.scrollBy({ left: -350, behavior: "smooth" });
  }

  function scrollRight() {
    scrollRef.current?.scrollBy({ left: 350, behavior: "smooth" });
  }

  if (posts.length === 0) {
    return null;
  }

  return (
    <section className="mt-16 border-t border-slate-200 pt-12">
      <div className="flex items-center justify-between gap-4">
        <h2 className="text-2xl font-bold text-slate-800">
          Explore more writing
        </h2>
        {posts.length > 2 ? (
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={scrollLeft}
              aria-label="Scroll related posts left"
              className="flex h-10 w-10 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-600 shadow-sm transition-all hover:bg-slate-50"
            >
              &larr;
            </button>
            <button
              type="button"
              onClick={scrollRight}
              aria-label="Scroll related posts right"
              className="flex h-10 w-10 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-600 shadow-sm transition-all hover:bg-slate-50"
            >
              &rarr;
            </button>
          </div>
        ) : null}
      </div>
      <div
        ref={scrollRef}
        className="hide-scrollbar flex gap-6 overflow-x-auto snap-x snap-mandatory pb-8 pt-4"
      >
        {posts.map((post) => (
          <div
            key={post.slug}
            className="min-w-[300px] max-w-[400px] flex-shrink-0 snap-start md:min-w-[350px]"
          >
            <article className="flex h-full flex-col justify-between rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">
              <div>
                <p className="text-sm text-slate-500">
                  {formatBlogDate(post.date)}
                </p>
                <h3 className="mt-3 text-xl font-semibold text-slate-900">
                  <Link
                    href={`/blog/${post.slug}`}
                    className="transition hover:text-blue-700"
                  >
                    {post.title}
                  </Link>
                </h3>
                <p className="mt-3 line-clamp-3 text-sm leading-7 text-slate-600">
                  {post.excerpt}
                </p>
              </div>
              <div className="mt-6">
                <Link
                  href={`/blog/${post.slug}`}
                  className="inline-flex min-h-11 items-center text-sm font-medium text-blue-700 transition hover:text-blue-800"
                >
                  Read article -&gt;
                </Link>
              </div>
            </article>
          </div>
        ))}
      </div>
    </section>
  );
}
