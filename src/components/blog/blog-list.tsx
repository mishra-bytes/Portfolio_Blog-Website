"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { formatBlogDate } from "@/lib/format-date";
import type { BlogPostSummary } from "@/lib/posts";

type BlogListProps = {
  posts: BlogPostSummary[];
};

export function BlogList({ posts }: BlogListProps) {
  const [visibleCount, setVisibleCount] = useState(5);
  const visiblePosts = posts.slice(0, visibleCount);

  return (
    <div>
      <div className="space-y-5 md:space-y-6">
        {visiblePosts.map((post, index) => (
          <Link key={post.slug} href={`/blog/${post.slug}`} className="group block">
            <article className="group flex flex-col gap-0 overflow-hidden rounded-2xl border border-slate-200/60 bg-white shadow-sm transition-all hover:shadow-md md:flex-row md:gap-6 md:rounded-3xl">
              <div className="relative aspect-[16/9] w-full shrink-0 overflow-hidden bg-slate-100 md:min-h-full md:w-1/3 md:aspect-auto">
                {post.coverImage ? (
                  <Image
                    src={post.coverImage}
                    alt={post.title}
                    fill
                    sizes="(max-width: 768px) 100vw, 33vw"
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                ) : (
                  <div className="h-full w-full bg-[radial-gradient(circle_at_top,_rgba(59,130,246,0.14),_transparent_32%),linear-gradient(135deg,_#f8fafc,_#e2e8f0)]" />
                )}
              </div>
              <div className="flex flex-grow flex-col justify-center p-6 md:p-8">
                <div className="mb-3 flex items-center gap-3">
                  <span className="text-sm text-slate-500">
                    {formatBlogDate(post.date)}
                  </span>
                  {index === 0 ? (
                    <span className="rounded-full border border-blue-100 bg-blue-50 px-2.5 py-0.5 text-xs font-semibold tracking-wide text-blue-600">
                      LATEST
                    </span>
                  ) : null}
                </div>
                <h2 className="mt-3 mb-2 text-xl font-bold text-slate-900 transition-colors group-hover:text-blue-600 md:text-2xl">
                  {post.title}
                </h2>
                <p className="mb-6 line-clamp-2 text-slate-600 md:line-clamp-3">
                  {post.excerpt}
                </p>
                <div className="mt-auto inline-flex items-center gap-2 text-sm font-medium text-slate-700 transition-colors group-hover:text-slate-900">
                  <span>Read article</span>
                  <span aria-hidden="true">&rarr;</span>
                </div>
              </div>
            </article>
          </Link>
        ))}
      </div>

      {visibleCount < posts.length ? (
        <button
          type="button"
          onClick={() => setVisibleCount((prev) => prev + 5)}
          className="mx-auto mt-12 flex items-center justify-center rounded-full border border-slate-200 bg-white px-8 py-3 font-medium text-slate-700 shadow-sm transition-colors hover:bg-slate-50 hover:text-slate-900"
        >
          Load more articles ↓
        </button>
      ) : null}
    </div>
  );
}
