import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";

const postsDirectory = path.join(process.cwd(), "content", "posts");

function normalizeMarkdownSource(source: string) {
  const trimmed = source.trim();

  if (!trimmed.startsWith("```")) {
    return source;
  }

  const lines = trimmed.split(/\r?\n/);
  const firstLine = lines[0] ?? "";
  const lastLine = lines.at(-1) ?? "";

  if (!lastLine.startsWith("```")) {
    return source;
  }

  const fencedLanguage = firstLine.slice(3).trim();

  if (fencedLanguage && fencedLanguage !== "md" && fencedLanguage !== "markdown") {
    return source;
  }

  return lines.slice(1, -1).join("\n");
}

export type PostFrontmatter = {
  title: string;
  excerpt: string;
  date: string;
  readTime: string;
  tags: string[];
};

export type PostSummary = PostFrontmatter & {
  slug: string;
};

export type Post = PostSummary & {
  content: string;
};

function getPostSlugs() {
  if (!fs.existsSync(postsDirectory)) {
    return [];
  }

  return fs.readdirSync(postsDirectory).filter((file) => file.endsWith(".md"));
}

export function getAllPosts(): PostSummary[] {
  return getPostSlugs()
    .map((fileName) => {
      const slug = fileName.replace(/\.md$/, "");
      const fullPath = path.join(postsDirectory, fileName);
      const fileContents = normalizeMarkdownSource(
        fs.readFileSync(fullPath, "utf8"),
      );
      const { data } = matter(fileContents);

      return {
        slug,
        title: String(data.title ?? slug),
        excerpt: String(data.excerpt ?? ""),
        date: String(data.date ?? ""),
        readTime: String(data.readTime ?? "5 min read"),
        tags: Array.isArray(data.tags) ? data.tags.map(String) : [],
      };
    })
    .sort((left, right) => right.date.localeCompare(left.date));
}

export function getPostBySlug(slug: string): Post | null {
  const fullPath = path.join(postsDirectory, `${slug}.md`);

  if (!fs.existsSync(fullPath)) {
    return null;
  }

  const fileContents = normalizeMarkdownSource(fs.readFileSync(fullPath, "utf8"));
  const { data, content } = matter(fileContents);

  return {
    slug,
    title: String(data.title ?? slug),
    excerpt: String(data.excerpt ?? ""),
    date: String(data.date ?? ""),
    readTime: String(data.readTime ?? "5 min read"),
    tags: Array.isArray(data.tags) ? data.tags.map(String) : [],
    content,
  };
}
