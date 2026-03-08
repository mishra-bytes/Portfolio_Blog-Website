import fs from "node:fs";
import path from "node:path";

export type ContentBlockType =
  | "paragraph"
  | "heading"
  | "image"
  | "code"
  | "list"
  | "blockquote"
  | "table";

export interface ContentBlock {
  type: ContentBlockType;
  value: string | string[];
  language?: string;
  src?: string;
}

export interface BlogPost {
  title: string;
  slug: string;
  date: string;
  excerpt: string;
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

export function getAllPosts(): BlogPostSummary[] {
  if (!fs.existsSync(postsDirectory)) {
    return [];
  }

  return fs
    .readdirSync(postsDirectory)
    .filter((fileName) => fileName.endsWith(".json"))
    .map((fileName) => {
      const fullPath = path.join(postsDirectory, fileName);
      const fileSlug = path.basename(fileName, ".json");
      const post = parsePostFile(
        fs.readFileSync(fullPath, "utf8"),
        fileName,
        fileSlug,
      );

      return {
        title: post.title,
        slug: post.slug,
        date: post.date,
        excerpt: post.excerpt,
      };
    })
    .sort((a, b) => Number(new Date(b.date)) - Number(new Date(a.date)));
}

export function getPostBySlug(slug: string): BlogPost | null {
  const directPath = path.join(postsDirectory, `${slug}.json`);

  if (fs.existsSync(directPath)) {
    return parsePostFile(
      fs.readFileSync(directPath, "utf8"),
      `${slug}.json`,
      slug,
    );
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
      const post = parsePostFile(
        fs.readFileSync(fullPath, "utf8"),
        fileName,
        fileSlug,
      );

      return post.slug === slug;
    });

  if (!matchedFile) {
    return null;
  }

  const fullPath = path.join(postsDirectory, matchedFile);
  const fileSlug = path.basename(matchedFile, ".json");

  return parsePostFile(
    fs.readFileSync(fullPath, "utf8"),
    matchedFile,
    fileSlug,
  );
}
