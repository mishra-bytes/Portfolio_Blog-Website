import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";
import { getSupabaseAdminClient } from "@/lib/supabaseClient";

export const dynamic = "force-dynamic";

const MAX_NAME_LENGTH = 120;
const MAX_EMAIL_LENGTH = 254;
const MAX_COMMENT_LENGTH = 2000;
const resend = new Resend(process.env.RESEND_API_KEY);

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
    if (!name) {
      return NextResponse.json(
        { error: "Name is required." },
        { status: 400 },
      );
    }

    if (name.length > MAX_NAME_LENGTH) {
      return NextResponse.json(
        { error: `Name must be ${MAX_NAME_LENGTH} characters or fewer.` },
        { status: 400 },
      );
    }

    if (email && (email.length > MAX_EMAIL_LENGTH || !isValidEmail(email))) {
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

    if (isOwner && parentId) {
      try {
        const { data: parentComment } = await supabase
          .from("comments")
          .select("author_name, author_email")
          .eq("id", parentId)
          .single();

        if (parentComment && parentComment.author_email) {
          const blogUrl =
            process.env.SITE_URL?.replace(/\/+$/, "") ??
            "https://aditya-mishra-blog-portfolio.vercel.app";

          await resend.emails.send({
            from:
              process.env.RESEND_FROM_EMAIL ||
              "Aditya Mishra <notifications@adimishra.tech>",
            to: parentComment.author_email,
            subject: "Aditya Mishra replied to your comment",
            html: `
              <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #222; max-width: 600px; margin: auto;">
                <h2 style="margin-bottom: 10px;">New Reply.</h2>
                <p>Hi ${parentComment.author_name},</p>
                <p>Aditya Mishra just replied to your comment on the engineering blog.</p>
                <p style="margin-top: 20px;">
                  <a href="${blogUrl}/blog/${slug}" 
                     style="display: inline-block; padding: 10px 16px; background-color: #111; color: #ffffff; text-decoration: none; border-radius: 6px;">
                    View Reply
                  </a>
                </p>
                <p style="margin-top: 30px; font-size: 14px; color: #666;">
                  — Aditya Mishra
                </p>
              </div>
            `,
          });
        }
      } catch (error) {
        console.error("Failed to send reply notification email:", error);
      }
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
