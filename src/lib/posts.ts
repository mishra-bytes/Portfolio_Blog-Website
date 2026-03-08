import fs from "node:fs";
import path from "node:path";

export type ContentBlockType =
  | "paragraph"
  | "heading"
  | "image"
  | "code"
  | "list"
  | "blockquote"
  | "table"
  | "github-file";

export interface ContentBlock {
  type: ContentBlockType;
  value: string | string[];
  language?: string;
  src?: string;
  level?: 2 | 3;
  width?: number;
  height?: number;
  repo?: string;
  filePath?: string;
  url?: string;
}

export interface BlogPost {
  title: string;
  slug: string;
  date: string;
  excerpt: string;
  coverImage?: string;
  tags?: string[];
  content: ContentBlock[];
}

export type BlogPostSummary = Omit<BlogPost, "content">;

const postsDirectory = path.join(process.cwd(), "posts");

function parsePostFile(
  fileContents: string,
  fileName: string,
  fallbackSlug?: string,
): BlogPost {
  const parsed = JSON.parse(fileContents) as BlogPost;

  if (
    !parsed ||
    typeof parsed.title !== "string" ||
    typeof parsed.date !== "string" ||
    typeof parsed.excerpt !== "string" ||
    !Array.isArray(parsed.content)
  ) {
    throw new Error(`Invalid post JSON structure in ${fileName}`);
  }

  const resolvedSlug =
    typeof parsed.slug === "string" && parsed.slug.trim().length > 0
      ? parsed.slug
      : fallbackSlug;

  if (!resolvedSlug) {
    throw new Error(`Missing slug in ${fileName}`);
  }

  return {
    ...parsed,
    slug: resolvedSlug,
  };
}

function readPostFile(
  fullPath: string,
  fileName: string,
  fallbackSlug?: string,
): BlogPost | null {
  try {
    const fileContents = fs.readFileSync(fullPath, "utf8");
    return parsePostFile(fileContents, fileName, fallbackSlug);
  } catch (error) {
    console.error(`Failed to parse blog post file: ${fileName}`, error);
    return null;
  }
}

export function getAllPosts(): BlogPostSummary[] {
  if (!fs.existsSync(postsDirectory)) {
    return [];
  }

  return fs
    .readdirSync(postsDirectory)
    .filter((fileName) => fileName.endsWith(".json"))
    .flatMap((fileName) => {
      const fullPath = path.join(postsDirectory, fileName);
      const fileSlug = path.basename(fileName, ".json");
      const post = readPostFile(fullPath, fileName, fileSlug);

      if (!post) {
        return [];
      }

      return {
        title: post.title,
        slug: post.slug,
        date: post.date,
        excerpt: post.excerpt,
        coverImage: post.coverImage,
        tags: post.tags ?? [],
      };
    })
    .sort((a, b) => Number(new Date(b.date)) - Number(new Date(a.date)));
}

export function getPostBySlug(slug: string): BlogPost | null {
  const directPath = path.join(postsDirectory, `${slug}.json`);

  if (fs.existsSync(directPath)) {
    return readPostFile(directPath, `${slug}.json`, slug);
  }

  if (!fs.existsSync(postsDirectory)) {
    return null;
  }

  const matchedFile = fs
    .readdirSync(postsDirectory)
    .filter((fileName) => fileName.endsWith(".json"))
    .find((fileName) => {
      const fullPath = path.join(postsDirectory, fileName);
      const fileSlug = path.basename(fileName, ".json");
      const post = readPostFile(fullPath, fileName, fileSlug);

      if (!post) {
        return false;
      }

      return post.slug === slug;
    });

  if (!matchedFile) {
    return null;
  }

  const fullPath = path.join(postsDirectory, matchedFile);
  const fileSlug = path.basename(matchedFile, ".json");

  return readPostFile(fullPath, matchedFile, fileSlug);
}
