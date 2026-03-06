import type { Metadata } from "next";
import { PostCard } from "@/components/blog/post-card";
import { SectionHeading } from "@/components/ui/section-heading";
import { getAllPosts } from "@/lib/blog";

export const metadata: Metadata = {
  title: "Blog",
  description: "Technical writing, project breakdowns, and machine learning notes.",
};

export default function BlogPage() {
  const posts = getAllPosts();

  return (
    <main className="mx-auto flex w-full max-w-7xl flex-col gap-8 px-4 pb-16 pt-6 sm:px-6 lg:px-8">
      <section className="section-shell rounded-[2rem] px-6 py-12 sm:px-10 lg:px-14">
        <div className="relative z-10 space-y-10">
          <SectionHeading
            eyebrow="Writing"
            title="Technical notes and engineering breakdowns."
            description="This route reads markdown files from the local content directory and turns them into styled posts with support for headings, code blocks, tables, and lists."
          />
          <div className="grid gap-5 lg:grid-cols-2">
            {posts.map((post) => (
              <PostCard key={post.slug} post={post} />
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
