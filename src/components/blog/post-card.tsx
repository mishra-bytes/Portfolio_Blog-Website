import Link from "next/link";
import type { PostSummary } from "@/lib/blog";

type PostCardProps = {
  post: PostSummary;
};

export function PostCard({ post }: PostCardProps) {
  return (
    <article className="rounded-[1.5rem] border border-white/10 bg-panel-strong/80 p-6">
      <div className="flex flex-wrap items-center gap-3 text-xs uppercase tracking-[0.25em] text-accent-soft">
        <span>{post.date}</span>
        <span className="h-1 w-1 rounded-full bg-accent-soft" />
        <span>{post.readTime}</span>
      </div>
      <h3 className="mt-4 text-2xl font-semibold tracking-[-0.04em] text-white">
        <Link href={`/blog/${post.slug}`} className="hover:text-accent-soft">
          {post.title}
        </Link>
      </h3>
      <p className="mt-4 text-sm leading-7 text-zinc-400">{post.excerpt}</p>
      <div className="mt-6 flex flex-wrap gap-2">
        {post.tags.map((tag) => (
          <span
            key={tag}
            className="rounded-full border border-white/10 bg-white/[0.04] px-3 py-1 text-xs text-zinc-200"
          >
            {tag}
          </span>
        ))}
      </div>
    </article>
  );
}
