import Link from "next/link";
import type { BlogPostSummary } from "@/lib/posts";

type PostCardProps = {
  post: BlogPostSummary;
  isLatest?: boolean;
};

export function PostCard({ post, isLatest = false }: PostCardProps) {
  return (
    <article className="blog-panel flex h-full flex-col rounded-[1.5rem] p-6 sm:p-7">
      <div className="mb-3 flex items-center gap-3">
        <span className="text-sm text-slate-500">{post.date}</span>
        {isLatest ? (
          <span className="rounded-full border border-blue-100 bg-blue-50 px-2.5 py-0.5 text-xs font-semibold tracking-wide text-blue-600">
            LATEST
          </span>
        ) : null}
      </div>
      <h3 className="mt-4 text-2xl font-semibold tracking-[-0.04em] text-[#0f172a]">
        <Link href={`/blog/${post.slug}`} className="blog-card-link">
          {post.title}
        </Link>
      </h3>
      <p className="mt-4 text-sm leading-7 text-[#374151]">{post.excerpt}</p>
      <div className="mt-6">
        <Link
          href={`/blog/${post.slug}`}
          className="text-sm font-medium text-blue-700 hover:text-blue-800 hover:underline"
        >
          Read article
        </Link>
      </div>
    </article>
  );
}
