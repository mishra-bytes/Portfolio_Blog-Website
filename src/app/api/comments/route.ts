import { NextRequest, NextResponse } from "next/server";
import { getSupabaseAdminClient } from "@/lib/supabaseClient";

export const dynamic = "force-dynamic";

const MAX_NAME_LENGTH = 120;
const MAX_EMAIL_LENGTH = 254;
const MAX_COMMENT_LENGTH = 2000;

type PublicCommentRecord = {
  id: string;
  slug: string;
  author_name: string;
  content: string;
  created_at: string;
  parent_id: string | null;
  is_author: boolean;
  upvotes: number | null;
};

function normalizeText(value: unknown) {
  return typeof value === "string" ? value.trim() : "";
}

function isValidEmail(email: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

export async function GET(request: NextRequest) {
  const slug = normalizeText(request.nextUrl.searchParams.get("slug"));

  if (!slug) {
    return NextResponse.json(
      { error: "A post slug is required to load comments." },
      { status: 400 },
    );
  }

  try {
    const supabase = getSupabaseAdminClient();
    const { data, error } = await supabase
      .from("comments")
      .select(
        "id, slug, author_name, content, created_at, parent_id, is_author, upvotes",
      )
      .eq("slug", slug)
      .order("created_at", { ascending: true });

    if (error) {
      return NextResponse.json(
        { error: error.message || "Unable to load comments." },
        { status: 500 },
      );
    }

    return NextResponse.json({
      comments: (data ?? []) as PublicCommentRecord[],
    });
  } catch (error) {
    return NextResponse.json(
      {
        error:
          error instanceof Error ? error.message : "Unable to load comments.",
      },
      { status: 500 },
    );
  }
}

export async function POST(request: NextRequest) {
  let body: Record<string, unknown>;

  try {
    body = (await request.json()) as Record<string, unknown>;
  } catch {
    return NextResponse.json(
      { error: "Invalid JSON payload." },
      { status: 400 },
    );
  }

  const slug = normalizeText(body.slug);
  const name = normalizeText(body.name);
  const email = normalizeText(body.email).toLowerCase();
  const content = normalizeText(body.content);
  const parentId = normalizeText(body.parentId) || null;
  const authorSecretKey = process.env.AUTHOR_SECRET_KEY ?? "";
  const isOwner = Boolean(authorSecretKey) && name === authorSecretKey;

  if (!slug || !content) {
    return NextResponse.json(
      { error: "Slug and comment content are required." },
      { status: 400 },
    );
  }

  if (content.length > MAX_COMMENT_LENGTH) {
    return NextResponse.json(
      {
        error: `Comment must be ${MAX_COMMENT_LENGTH} characters or fewer.`,
      },
      { status: 400 },
    );
  }

  if (!isOwner) {
    if (!name || !email) {
      return NextResponse.json(
        { error: "Name and email are required." },
        { status: 400 },
      );
    }

    if (name.length > MAX_NAME_LENGTH) {
      return NextResponse.json(
        { error: `Name must be ${MAX_NAME_LENGTH} characters or fewer.` },
        { status: 400 },
      );
    }

    if (email.length > MAX_EMAIL_LENGTH || !isValidEmail(email)) {
      return NextResponse.json(
        { error: "Please provide a valid email address." },
        { status: 400 },
      );
    }
  }

  try {
    const supabase = getSupabaseAdminClient();

    const { data, error } = await supabase
      .from("comments")
      .insert({
        slug,
        content,
        parent_id: parentId,
        author_name: isOwner ? "Aditya Mishra" : name,
        author_email: isOwner ? null : email,
        is_author: isOwner,
      })
      .select(
        "id, slug, author_name, content, created_at, parent_id, is_author, upvotes",
      )
      .single();

    if (error) {
      return NextResponse.json(
        { error: error.message || "Unable to save comment." },
        { status: 500 },
      );
    }

    return NextResponse.json(
      { comment: data as PublicCommentRecord },
      { status: 201 },
    );
  } catch (error) {
    return NextResponse.json(
      {
        error:
          error instanceof Error ? error.message : "Unable to save comment.",
      },
      { status: 500 },
    );
  }
}
