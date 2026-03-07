import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { BlogComments } from "@/components/blog/blog-comments";
import { CodeBlock } from "@/components/blog/code-block";
import { getAllPosts, getPostBySlug, type ContentBlock } from "@/lib/posts";

type BlogPostPageProps = {
  params: Promise<{ slug: string }>;
};

type BlockRendererProps = {
  blocks: ContentBlock[];
};

function BlockRenderer({ blocks }: BlockRendererProps) {
  return (
    <div className="mx-auto mt-10 max-w-3xl space-y-6 text-base leading-8 text-slate-700 sm:text-lg sm:leading-9">
      {blocks.map((block, index) => {
        switch (block.type) {
          case "paragraph":
            return (
              <p key={`${block.type}-${index}`} className="text-slate-700">
                {typeof block.value === "string" ? block.value : block.value.join(" ")}
              </p>
            );
          case "heading":
            return (
              <h2
                key={`${block.type}-${index}`}
                className="pt-4 text-3xl font-semibold tracking-[-0.04em] text-slate-900"
              >
                {typeof block.value === "string" ? block.value : block.value.join(" ")}
              </h2>
            );
          case "code":
            const formattedCode =
              typeof block.value === "string"
                ? block.value.replace(/\\n/g, "\n")
                : block.value.join("\n").replace(/\\n/g, "\n");

            return (
              <CodeBlock
                key={`${block.type}-${index}`}
                code={formattedCode}
                language={block.language}
              />
            );
          case "image":
            if (!block.src) {
              return null;
            }

            return (
              <figure key={`${block.type}-${index}`} className="space-y-3">
                <div className="overflow-hidden rounded-[1.5rem] border border-slate-200 bg-slate-100">
                  <Image
                    src={block.src}
                    alt={typeof block.value === "string" ? block.value : "Blog image"}
                    width={1600}
                    height={900}
                    sizes="(max-width: 768px) 100vw, 768px"
                    className="h-auto w-full object-cover"
                  />
                </div>
                {typeof block.value === "string" && block.value.length > 0 ? (
                  <figcaption className="text-sm leading-6 text-slate-500">
                    {block.value}
                  </figcaption>
                ) : null}
              </figure>
            );
          case "list":
            return (
              <ul
                key={`${block.type}-${index}`}
                className="list-disc space-y-2 pl-6 text-slate-700 marker:text-blue-600"
              >
                {(Array.isArray(block.value) ? block.value : [block.value]).map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            );
          default:
            return null;
        }
      })}
    </div>
  );
}

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
    <main className="mx-auto flex w-full max-w-3xl flex-col gap-6 py-0">
      <nav aria-label="Back to blog" className="pt-5 sm:pt-6">
        <Link
          href="/blog"
          className="inline-flex items-center gap-2 rounded-full border border-[#d7dee7] bg-white px-3.5 py-2 text-sm font-medium text-[#334155] shadow-sm transition-all duration-200 hover:border-[#93c5fd] hover:text-blue-700 hover:shadow-md"
        >
          <span aria-hidden="true" className="text-base leading-none">
            &larr;
          </span>
          <span>Back to Blog</span>
        </Link>
      </nav>
      <article className="blog-panel rounded-[2rem] px-6 py-10 sm:px-10 sm:py-12">
        <div className="mx-auto max-w-3xl">
          <header className="space-y-5 border-b blog-divider pb-8 text-left">
            <div className="text-xs uppercase tracking-[0.3em] text-[#4b5563]">
              <span>{post.date}</span>
            </div>
            <h1 className="max-w-3xl text-4xl font-semibold tracking-[-0.05em] text-[#0f172a] sm:text-5xl">
              {post.title}
            </h1>
            <p className="max-w-3xl text-base leading-8 text-[#374151]">
              {post.excerpt}
            </p>
          </header>
          <BlockRenderer blocks={post.content} />
          <div className="mx-auto mt-16 max-w-3xl border-t border-gray-200 pt-8">
            <BlogComments slug={slug} />
          </div>
        </div>
      </article>
    </main>
  );
}
