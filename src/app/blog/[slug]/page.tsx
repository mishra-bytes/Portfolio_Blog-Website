import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { getAllPosts, getPostBySlug } from "@/lib/blog";

type BlogPostPageProps = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  return getAllPosts().map((post) => ({
    slug: post.slug,
  }));
}

export async function generateMetadata({
  params,
}: BlogPostPageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = getPostBySlug(slug);

  if (!post) {
    return {
      title: "Post Not Found",
    };
  }

  return {
    title: post.title,
    description: post.excerpt,
  };
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { slug } = await params;
  const post = getPostBySlug(slug);

  if (!post) {
    notFound();
  }

  return (
    <main className="mx-auto flex w-full max-w-5xl flex-col gap-8 px-4 pb-16 pt-6 sm:px-6 lg:px-8">
      <article className="section-shell rounded-[2rem] px-6 py-12 sm:px-10 lg:px-14">
        <div className="relative z-10">
          <Link
            href="/blog"
            className="inline-flex rounded-full border border-white/12 bg-white/5 px-4 py-2 text-sm text-zinc-200 hover:border-white/25 hover:bg-white/8 hover:text-white"
          >
            Back to Blog
          </Link>
          <header className="mt-8 space-y-6 border-b border-white/10 pb-8">
            <div className="flex flex-wrap items-center gap-3 text-xs uppercase tracking-[0.3em] text-accent-soft">
              <span>{post.date}</span>
              <span className="h-1 w-1 rounded-full bg-accent-soft" />
              <span>{post.readTime}</span>
            </div>
            <h1 className="max-w-4xl text-4xl font-semibold tracking-[-0.06em] text-white sm:text-5xl">
              {post.title}
            </h1>
            <p className="max-w-3xl text-base leading-8 text-zinc-300">
              {post.excerpt}
            </p>
            <div className="flex flex-wrap gap-2">
              {post.tags.map((tag) => (
                <span
                  key={tag}
                  className="rounded-full border border-white/10 bg-white/[0.04] px-3 py-1 text-xs text-zinc-200"
                >
                  {tag}
                </span>
              ))}
            </div>
          </header>
          <div className="markdown mt-10">
            <ReactMarkdown remarkPlugins={[remarkGfm]}>
              {post.content}
            </ReactMarkdown>
          </div>
        </div>
      </article>
    </main>
  );
}
