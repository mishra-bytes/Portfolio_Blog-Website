import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import type {
  ComponentPropsWithoutRef,
  ComponentType,
  CSSProperties,
  ReactNode,
} from "react";
import ReactMarkdown, { type Components } from "react-markdown";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { vscDarkPlus } from "react-syntax-highlighter/dist/cjs/styles/prism";
import remarkGfm from "remark-gfm";
import { BlogComments } from "@/components/blog/blog-comments";
import { getAllPosts, getPostBySlug } from "@/lib/blog";

type BlogPostPageProps = {
  params: Promise<{ slug: string }>;
};

const syntaxTheme = JSON.parse(
  JSON.stringify(vscDarkPlus),
) as Record<string, CSSProperties>;
const Highlighter =
  SyntaxHighlighter as unknown as ComponentType<Record<string, unknown>>;

type MarkdownCodeProps = ComponentPropsWithoutRef<"code"> & {
  inline?: boolean;
  node?: unknown;
  children?: ReactNode;
};

type MarkdownTableProps = ComponentPropsWithoutRef<"table"> & {
  node?: unknown;
};

type MarkdownHeadProps = ComponentPropsWithoutRef<"thead"> & {
  node?: unknown;
};

type MarkdownThProps = ComponentPropsWithoutRef<"th"> & {
  node?: unknown;
};

type MarkdownTdProps = ComponentPropsWithoutRef<"td"> & {
  node?: unknown;
};

type MarkdownTrProps = ComponentPropsWithoutRef<"tr"> & {
  node?: unknown;
};

type MarkdownBlockquoteProps = ComponentPropsWithoutRef<"blockquote"> & {
  node?: unknown;
};

type MarkdownHeadingProps = ComponentPropsWithoutRef<"h2"> & {
  node?: unknown;
};

type MarkdownImageProps = ComponentPropsWithoutRef<"img"> & {
  node?: unknown;
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

const markdownComponents: Components = {
  table: ({ ...props }: MarkdownTableProps) => (
    <div className="my-8 overflow-x-auto rounded-xl border border-gray-300 bg-white shadow-sm">
      <table
        className="w-full border-collapse text-left text-sm md:text-[0.95rem]"
        {...props}
      />
    </div>
  ),
  thead: ({ ...props }: MarkdownHeadProps) => (
    <thead className="bg-slate-50" {...props} />
  ),
  th: ({ ...props }: MarkdownThProps) => (
    <th
      className="border border-gray-300 px-3 py-2 text-sm font-semibold tracking-tight text-gray-900"
      {...props}
    />
  ),
  td: ({ ...props }: MarkdownTdProps) => (
    <td
      className="border border-gray-300 px-3 py-2 align-middle text-sm leading-6 text-gray-700"
      {...props}
    />
  ),
  tr: ({ ...props }: MarkdownTrProps) => (
    <tr className="transition-colors hover:bg-slate-50" {...props} />
  ),
  blockquote: ({ ...props }: MarkdownBlockquoteProps) => (
    <blockquote
      className="my-8 rounded-r-lg border-l-4 border-gray-800 bg-gray-50 py-2 pl-6 text-gray-600 italic"
      {...props}
    />
  ),
  h2: ({ ...props }: MarkdownHeadingProps) => (
    <h2
      className="mt-12 mb-6 text-3xl font-bold tracking-tight text-gray-900"
      {...props}
    />
  ),
  img: ({ alt, ...props }: MarkdownImageProps) => (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      alt={alt ?? ""}
      className="my-8 w-full rounded-xl object-cover shadow-lg"
      {...props}
    />
  ),
  code({ inline, className, children, ...props }: MarkdownCodeProps) {
    const match = /language-(\w+)/.exec(className ?? "");
    const code = String(children).replace(/\n$/, "");

    if (inline) {
      return (
        <code
          className="inline rounded border border-gray-200 bg-gray-100 px-1 py-0.5 text-sm font-mono text-pink-600"
          {...props}
        >
          {children}
        </code>
      );
    }

    return (
      <div className="my-8 overflow-hidden rounded-lg shadow-md">
        <Highlighter
          language={match?.[1] ?? "text"}
          style={syntaxTheme}
          PreTag="div"
          customStyle={{
            margin: 0,
            padding: "1rem 1.1rem",
            borderRadius: "0.5rem",
            fontSize: "0.95rem",
            lineHeight: 1.7,
          }}
          codeTagProps={{
            style: {
              fontFamily:
                '"IBM Plex Mono", "Cascadia Code", ui-monospace, SFMono-Regular, monospace',
            },
          }}
          {...props}
        >
          {code}
        </Highlighter>
      </div>
    );
  },
};

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
          <header className="space-y-5 border-b blog-divider pb-8">
            <div className="flex flex-wrap items-center gap-3 text-xs uppercase tracking-[0.3em] text-[#4b5563]">
              <span>{post.date}</span>
              <span className="h-1 w-1 rounded-full bg-[#0f62fe]" />
              <span>{post.readTime}</span>
            </div>
            <h1 className="max-w-3xl text-4xl font-semibold tracking-[-0.05em] text-[#0f172a] sm:text-5xl">
              {post.title}
            </h1>
            <p className="max-w-3xl text-base leading-8 text-[#374151]">
              {post.excerpt}
            </p>
          </header>
          <div className="prose prose-lg md:prose-xl mx-auto mt-10 max-w-3xl text-gray-800 leading-relaxed prose-headings:text-gray-900 prose-headings:tracking-tight prose-p:text-gray-800 prose-p:leading-relaxed prose-p:mb-6 prose-ul:pl-6 prose-ol:list-decimal prose-ul:list-disc prose-li:my-2 prose-a:text-blue-600 prose-a:no-underline hover:prose-a:underline prose-code:before:content-none prose-code:after:content-none prose-pre:bg-transparent prose-pre:p-0">
            <ReactMarkdown
              remarkPlugins={[remarkGfm]}
              components={markdownComponents}
            >
              {post.content}
            </ReactMarkdown>
          </div>
          <div className="mx-auto mt-16 max-w-3xl border-t border-gray-200 pt-8">
            <BlogComments slug={slug} />
          </div>
          <details className="mt-12 max-w-3xl rounded-[1.25rem] border blog-divider bg-[#f8fafc] p-5 text-sm text-[#374151]">
            <summary className="cursor-pointer list-none font-medium text-[#0f172a] marker:hidden">
              About this post
            </summary>
            <div className="mt-4 space-y-4">
              <p>
                Published on {post.date} with an estimated reading time of{" "}
                {post.readTime}.
              </p>
              <div className="flex flex-wrap gap-2">
                {post.tags.map((tag) => (
                  <span
                    key={tag}
                    className="rounded-full border border-[#d6dbe3] bg-white px-3 py-1 text-xs text-[#1d4ed8]"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </details>
        </div>
      </article>
    </main>
  );
}
