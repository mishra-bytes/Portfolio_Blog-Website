import Link from "next/link";
import type { PostSummary } from "@/lib/blog";

type PostCardProps = {
  post: PostSummary;
};

export function PostCard({ post }: PostCardProps) {
  return (
    <article className="blog-panel flex h-full flex-col rounded-[1.5rem] p-6 sm:p-7">
      <div className="flex flex-wrap items-center gap-3 text-xs uppercase tracking-[0.25em] text-[#4b5563]">
        <span>{post.date}</span>
        <span className="h-1 w-1 rounded-full bg-[#0f62fe]" />
        <span>{post.readTime}</span>
      </div>
      <h3 className="mt-4 text-2xl font-semibold tracking-[-0.04em] text-[#0f172a]">
        <Link href={`/blog/${post.slug}`} className="blog-card-link">
          {post.title}
        </Link>
      </h3>
      <p className="mt-4 text-sm leading-7 text-[#374151]">{post.excerpt}</p>
      <div className="mt-6 flex flex-wrap gap-2">
        {post.tags.map((tag) => (
          <span
            key={tag}
            className="rounded-full border border-[#d6dbe3] bg-[#eff6ff] px-3 py-1 text-xs text-[#1d4ed8]"
          >
            {tag}
          </span>
        ))}
      </div>
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
