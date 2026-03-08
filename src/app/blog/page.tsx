import type { Metadata } from "next";
import { PostCard } from "@/components/blog/post-card";
import { formatBlogDate } from "@/lib/format-date";
import { getAllPosts } from "@/lib/posts";

export const metadata: Metadata = {
  title: "Blog",
  description: "Long-form technical writing in a minimalist, reading-first layout.",
};

export default function BlogPage() {
  const posts = getAllPosts();
  const sortedPosts = [...posts].sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime(),
  );

  return (
    <main className="mx-auto flex w-full max-w-3xl flex-col gap-6 pb-24 pt-0">
      <section className="blog-panel rounded-[2rem] px-6 py-10 sm:px-10 sm:py-12">
        <div className="mx-auto max-w-3xl text-left">
          <p className="text-xs font-semibold uppercase tracking-[0.35em] text-[#0f62fe]">
            Engineering Blog
          </p>
          <h1 className="mt-4 text-4xl font-semibold tracking-[-0.05em] text-[#0f172a] sm:text-5xl">
            Deep dives into Machine Learning, Computer Vision, and Software Engineering.
          </h1>
          <p className="mt-5 max-w-2xl text-base leading-8 text-slate-600">
            Detailed write-ups on my journey building intelligent systems,
            debugging complex models, and exploring the math behind the code. I
            share what I learn as I build.
          </p>
        </div>
      </section>
      <section className="grid gap-4 md:gap-6">
        {sortedPosts.map((post, index) => (
          <PostCard
            key={post.slug}
            post={post}
            formattedDate={formatBlogDate(post.date)}
            isLatest={index === 0}
          />
        ))}
      </section>
    </main>
  );
}
