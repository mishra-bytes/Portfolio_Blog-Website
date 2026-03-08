import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { BlogComments } from "@/components/blog/blog-comments";
import { CodeBlock } from "@/components/blog/code-block";
import { GithubFileCard } from "@/components/blog/github-file-card";
import { PostSlider } from "@/components/blog/post-slider";
import { ProgressBar } from "@/components/blog/progress-bar";
import { SubscribeForm } from "@/components/blog/subscribe-form";
import { formatBlogDate } from "@/lib/format-date";
import { getAllPosts, getPostBySlug, type ContentBlock } from "@/lib/posts";

type BlogPostPageProps = {
  params: Promise<{ slug: string }>;
};

export const dynamicParams = false;

type BlockRendererProps = {
  blocks: ContentBlock[];
};

function slugifyHeading(value: string) {
  return value
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)+/g, "");
}

function BlockRenderer({ blocks }: BlockRendererProps) {
  const firstImageIndex = blocks.findIndex((block) => block.type === "image");

  return (
    <div className="mx-auto mt-10 max-w-[70ch] space-y-6 text-base leading-relaxed text-slate-800 sm:text-lg">
      {blocks.map((block, index) => {
        const key = `${index}-${block.type}`;

        switch (block.type) {
          case "paragraph":
            return (
              <p key={key} className="mb-6 text-slate-800">
                {typeof block.value === "string"
                  ? block.value
                  : block.value.join(" ")}
              </p>
            );
          case "heading": {
            const headingText =
              typeof block.value === "string"
                ? block.value
                : block.value.join(" ");
            const headingId = slugifyHeading(headingText);
            const level = block.level === 3 ? 3 : 2;

            if (level === 3) {
              return (
                <h3
                  key={key}
                  id={headingId}
                  className="scroll-mt-24 pt-4 text-2xl font-semibold tracking-[-0.03em] text-slate-900"
                >
                  {headingText}
                </h3>
              );
            }

            return (
              <h2
                key={key}
                id={headingId}
                className="scroll-mt-24 pt-6 text-3xl font-semibold tracking-[-0.04em] text-slate-900"
              >
                {headingText}
              </h2>
            );
          }
          case "code": {
            const formattedCode =
              typeof block.value === "string"
                ? block.value.replace(/\\n/g, "\n")
                : block.value.join("\n").replace(/\\n/g, "\n");

            return (
              <CodeBlock
                key={key}
                code={formattedCode}
                language={block.language}
              />
            );
          }
          case "image": {
            if (!block.src) {
              return (
                <div
                  key={key}
                  className="rounded-md bg-red-50 p-4 text-sm text-red-500"
                >
                  Error: Image source missing
                </div>
              );
            }

            const width = block.width ?? 1600;
            const height = block.height ?? 900;
            const altText =
              typeof block.value === "string" ? block.value : "Blog image";

            return (
              <figure key={key} className="space-y-3">
                <div className="overflow-hidden rounded-[1.5rem] border border-slate-200 bg-slate-100">
                  <Image
                    src={block.src}
                    alt={altText}
                    width={width}
                    height={height}
                    priority={index === firstImageIndex && firstImageIndex !== -1}
                    loading={index === firstImageIndex ? undefined : "lazy"}
                    decoding="async"
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
          }
          case "list":
            return (
              <ul
                key={key}
                className="mb-6 list-disc space-y-2 pl-6 text-slate-800 marker:text-blue-600"
              >
                {(Array.isArray(block.value) ? block.value : [block.value]).map(
                  (item) => (
                    <li key={`${key}-${item}`}>{item}</li>
                  ),
                )}
              </ul>
            );
          case "blockquote":
            return (
              <blockquote
                key={key}
                className="rounded-r-lg border-l-4 border-blue-600 bg-slate-50 py-1 pl-4 italic text-slate-800"
              >
                {typeof block.value === "string"
                  ? block.value
                  : block.value.join(" ")}
              </blockquote>
            );
          case "table": {
            const rawTable =
              typeof block.value === "string"
                ? block.value.replace(/\\n/g, "\n")
                : block.value.join("\n").replace(/\\n/g, "\n");

            const rows = rawTable
              .split("\n")
              .map((row) => row.trim())
              .filter((row) => row.length > 0 && !row.includes("---"))
              .map((row) =>
                row
                  .split("|")
                  .map((cell) => cell.trim())
                  .filter((cell) => cell.length > 0),
              )
              .filter((row) => row.length > 0);

            if (rows.length === 0) {
              return null;
            }

            const [headers, ...bodyRows] = rows;

            return (
              <div key={key} className="my-8 overflow-x-auto">
                <table className="w-full border-collapse text-left">
                  <thead>
                    <tr>
                      {headers.map((header) => (
                        <th
                          key={`${key}-${header}`}
                          className="border-b-2 border-slate-300 pb-2 pr-4 font-semibold text-slate-800"
                        >
                          {header}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {bodyRows.map((row, rowIndex) => (
                      <tr key={`${key}-row-${rowIndex}`}>
                        {row.map((cell, cellIndex) => (
                          <td
                            key={`${key}-row-${rowIndex}-cell-${cellIndex}`}
                            className="border-b border-slate-200 py-3 pr-4 text-slate-800"
                          >
                            {cell}
                          </td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            );
          }
          case "github-file":
            if (!block.url) {
              return (
                <div
                  key={key}
                  className="rounded-md bg-red-50 p-4 text-sm text-red-500"
                >
                  Error: GitHub file URL missing
                </div>
              );
            }

            return (
              <GithubFileCard
                key={key}
                repo={block.repo}
                filePath={block.filePath}
                url={block.url}
              />
            );
          default:
            console.warn("Unsupported content block", block);
            return null;
        }
      })}
    </div>
  );
}

export async function generateStaticParams() {
  const posts = getAllPosts();

  return posts.map((post) => ({
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
    title: `${post.title} | Aditya Mishra`,
    description: post.excerpt,
    openGraph: {
      title: `${post.title} | Aditya Mishra`,
      description: post.excerpt,
      type: "article",
      url: `${process.env.SITE_URL ?? "http://localhost:3000"}/blog/${post.slug}`,
    },
  };
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { slug } = await params;
  const post = getPostBySlug(slug);

  if (!post) {
    notFound();
  }

  const headings = post.content
    .filter((block) => block.type === "heading")
    .map((block) => ({
      level: block.level === 3 ? 3 : 2,
      text:
        typeof block.value === "string" ? block.value : block.value.join(" "),
    }));

  const articleUrl = `${process.env.SITE_URL ?? "http://localhost:3000"}/blog/${post.slug}`;
  const formattedDate = formatBlogDate(post.date);
  const currentTags = new Set((post.tags ?? []).map((tag) => tag.toLowerCase()));
  const allPosts = getAllPosts();
  const otherPosts = allPosts.filter((candidate) => candidate.slug !== post.slug);
  const recommendedPosts = [...otherPosts]
    .sort((left, right) => {
      const leftScore = (left.tags ?? []).reduce((score, tag) => {
        return score + (currentTags.has(tag.toLowerCase()) ? 1 : 0);
      }, 0);
      const rightScore = (right.tags ?? []).reduce((score, tag) => {
        return score + (currentTags.has(tag.toLowerCase()) ? 1 : 0);
      }, 0);

      if (leftScore !== rightScore) {
        return rightScore - leftScore;
      }

      return new Date(right.date).getTime() - new Date(left.date).getTime();
    })
    .slice(0, 5);
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    author: {
      "@type": "Person",
      name: "Aditya Mishra",
    },
    datePublished: post.date,
    mainEntityOfPage: articleUrl,
    description: post.excerpt,
  };

  return (
    <main className="mx-auto flex w-full max-w-3xl flex-col gap-6 py-0">
      <ProgressBar />
      <a
        href="#article-content"
        className="sr-only rounded-md bg-white px-4 py-3 text-sm font-medium text-slate-900 shadow-sm focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50"
      >
        Skip to content
      </a>
      <nav aria-label="Back to blog" className="pt-5 sm:pt-6">
        <Link
          href="/blog"
          className="inline-flex min-h-11 items-center gap-2 rounded-full border border-[#d7dee7] bg-white px-4 py-2.5 text-sm font-medium text-[#334155] shadow-sm transition-all duration-200 hover:border-[#93c5fd] hover:text-blue-700 hover:shadow-md"
        >
          <span aria-hidden="true" className="text-base leading-none">
            &larr;
          </span>
          <span>Back to Blog</span>
        </Link>
      </nav>
      <article
        className="blog-panel rounded-[2rem] px-6 py-10 sm:px-10 sm:py-12"
      >
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
        <div className="mx-auto max-w-[70ch]">
          <header className="space-y-5 border-b blog-divider pb-8 text-left">
            <Link
              href="/blog"
              className="mb-8 inline-flex items-center gap-2 text-sm font-medium text-slate-500 transition-colors hover:text-slate-800"
            >
              ← Back to all posts
            </Link>
            <h1 className="max-w-[18ch] text-4xl font-semibold tracking-[-0.05em] text-[#0f172a] sm:text-5xl">
              {post.title}
            </h1>
            <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-sm text-slate-800">
              <span className="font-medium text-slate-900">By Aditya Mishra</span>
              <span aria-hidden="true" className="text-slate-400">
                &bull;
              </span>
              <time dateTime={post.date}>Published {formattedDate}</time>
            </div>
            <p className="max-w-[70ch] text-base leading-relaxed text-slate-800">
              {post.excerpt}
            </p>
          </header>
          {headings.length > 0 ? (
            <details className="group mb-10 mt-8 rounded-xl border border-slate-200 bg-slate-50 p-5">
              <summary className="list-none flex cursor-pointer items-center justify-between font-semibold text-slate-800">
                <span>Table of Contents</span>
                <span
                  aria-hidden="true"
                  className="transition-transform group-open:rotate-180"
                >
                  &#9662;
                </span>
              </summary>
              <ul className="mt-4 space-y-2 text-sm text-slate-600">
                {headings.map((heading) => (
                  <li
                    key={`${heading.level}-${heading.text}`}
                    className={heading.level === 3 ? "pl-4" : undefined}
                  >
                    <a
                      href={`#${slugifyHeading(heading.text)}`}
                      className="inline-flex min-h-11 items-center text-left font-medium text-slate-700 transition hover:text-blue-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-200"
                    >
                      {heading.text}
                    </a>
                  </li>
                ))}
              </ul>
            </details>
          ) : null}
          <div id="article-content">
            <BlockRenderer blocks={post.content} />
          </div>
          {otherPosts.length > 0 ? <PostSlider posts={recommendedPosts} /> : null}
          <div className="mx-auto mt-20 max-w-3xl border-t border-gray-200 pt-8">
            <BlogComments slug={slug} />
          </div>
          <SubscribeForm />
        </div>
      </article>
    </main>
  );
}
