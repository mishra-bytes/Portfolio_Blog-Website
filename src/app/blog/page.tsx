import type { Metadata } from "next";
import { PostCard } from "@/components/blog/post-card";
import { getAllPosts } from "@/lib/posts";

export const metadata: Metadata = {
  title: "Blog",
  description: "Long-form technical writing in a minimalist, reading-first layout.",
};

export default function BlogPage() {
  const posts = getAllPosts();

  return (
    <main className="mx-auto flex w-full max-w-3xl flex-col gap-6 py-0">
      <section className="blog-panel rounded-[2rem] px-6 py-10 sm:px-10 sm:py-12">
        <div className="mx-auto max-w-3xl text-left">
          <p className="text-xs font-semibold uppercase tracking-[0.35em] text-[#0f62fe]">
            Writing
          </p>
          <h1 className="mt-4 text-4xl font-semibold tracking-[-0.05em] text-[#0f172a] sm:text-5xl">
            Technical notes designed for fast scanning and deep reading.
          </h1>
          <p className="mt-5 max-w-2xl text-base leading-8 text-[#374151]">
            This index keeps the decision surface small: each post shows only
            the metadata needed to choose what to read next.
          </p>
        </div>
      </section>
      <section className="grid gap-4 md:gap-6">
        {posts.map((post) => (
          <PostCard key={post.slug} post={post} />
        ))}
      </section>
    </main>
  );
}
