import Link from "next/link";
import { PostCard } from "@/components/blog/post-card";
import { MotionReveal, MotionStagger, MotionStaggerItem } from "@/components/motion/reveal";
import { SectionHeading } from "@/components/ui/section-heading";
import type { PostSummary } from "@/lib/blog";

type BlogSectionProps = {
  posts: PostSummary[];
};

export function BlogSection({ posts }: BlogSectionProps) {
  return (
    <section className="section-shell rounded-[2rem] px-6 py-12 sm:px-10 lg:px-14">
      <div className="relative z-10 space-y-10">
        <MotionReveal className="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
          <SectionHeading
            eyebrow="Blog"
            title="Markdown-native writing for technical notes and project breakdowns."
            description="Posts are sourced directly from local markdown files, so adding new writing is as simple as dropping a `.md` file into the content directory."
          />
          <Link
            href="/blog"
            className="w-fit rounded-full border border-white/12 bg-white/5 px-5 py-3 text-sm font-semibold text-white transition-all duration-300 ease-in-out hover:scale-[1.02] hover:border-white/25 hover:bg-white/8 hover:shadow-[0_14px_30px_rgba(0,0,0,0.22)]"
          >
            Browse all posts
          </Link>
        </MotionReveal>
        <MotionStagger className="grid gap-5 lg:grid-cols-2">
          {posts.map((post) => (
            <MotionStaggerItem key={post.slug}>
              <PostCard post={post} />
            </MotionStaggerItem>
          ))}
        </MotionStagger>
        <MotionReveal>
          <div className="rounded-[1.5rem] border border-dashed border-white/12 bg-black/20 p-5 text-sm text-zinc-400">
          Content folder: <code>content/posts</code>
          </div>
        </MotionReveal>
      </div>
    </section>
  );
}
