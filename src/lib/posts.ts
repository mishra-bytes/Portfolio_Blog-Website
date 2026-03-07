import fs from "node:fs";
import path from "node:path";

export type ContentBlockType =
  | "paragraph"
  | "heading"
  | "image"
  | "code"
  | "list";

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

function parsePostFile(fileContents: string, fileName: string): BlogPost {
  const parsed = JSON.parse(fileContents) as BlogPost;

  if (
    !parsed ||
    typeof parsed.title !== "string" ||
    typeof parsed.slug !== "string" ||
    typeof parsed.date !== "string" ||
    typeof parsed.excerpt !== "string" ||
    !Array.isArray(parsed.content)
  ) {
    throw new Error(`Invalid post JSON structure in ${fileName}`);
  }

  return parsed;
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
      const post = parsePostFile(fs.readFileSync(fullPath, "utf8"), fileName);

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
  const fullPath = path.join(postsDirectory, `${slug}.json`);

  if (!fs.existsSync(fullPath)) {
    return null;
  }

  return parsePostFile(fs.readFileSync(fullPath, "utf8"), `${slug}.json`);
}
