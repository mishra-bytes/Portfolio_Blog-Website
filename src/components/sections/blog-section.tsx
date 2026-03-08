import Link from "next/link";
import { HomeBlogCarousel } from "@/components/home/home-blog-carousel";
import { MotionReveal, MotionStagger, MotionStaggerItem } from "@/components/motion/reveal";
import { SectionHeading } from "@/components/ui/section-heading";
import type { BlogPostSummary } from "@/lib/posts";

type BlogSectionProps = {
  posts: BlogPostSummary[];
};

export function BlogSection({ posts }: BlogSectionProps) {
  return (
    <section className="section-shell rounded-[2rem] px-6 py-12 sm:px-10 lg:px-14">
      <div className="relative z-10 space-y-10">
        <MotionReveal className="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
          <SectionHeading
            eyebrow="Blog"
            title="Structured writing for technical notes and project breakdowns."
            description="Posts are sourced from local JSON files, so the reading experience stays predictable while the content model remains explicit and type-safe."
          />
          <Link
            href="/blog"
            className="w-fit rounded-full border border-white/12 bg-white/5 px-5 py-3 text-sm font-semibold text-white transition-all duration-300 ease-in-out hover:scale-[1.02] hover:border-white/25 hover:bg-white/8 hover:shadow-[0_14px_30px_rgba(0,0,0,0.22)]"
          >
            Browse all posts
          </Link>
        </MotionReveal>
        <MotionStagger>
          <MotionStaggerItem>
            <HomeBlogCarousel posts={posts} />
          </MotionStaggerItem>
        </MotionStagger>
      </div>
    </section>
  );
}
