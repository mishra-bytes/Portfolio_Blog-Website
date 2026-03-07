import { createHash, timingSafeEqual } from "node:crypto";
import { NextRequest, NextResponse } from "next/server";
import { getResendClient } from "@/lib/resendClient";
import { getSupabaseAdminClient } from "@/lib/supabaseClient";

export const dynamic = "force-dynamic";

const MAX_NAME_LENGTH = 80;
const MAX_EMAIL_LENGTH = 254;
const MAX_COMMENT_LENGTH = 2000;
const OWNER_EMAIL = "aditya_mishra@outlook.in";

type CommentRecord = {
  id: string;
  name: string;
  content: string;
  created_at: string;
  parent_id: string | null;
  is_owner: boolean;
};

function normalizeText(value: unknown) {
  return typeof value === "string" ? value.trim() : "";
}

function isValidEmail(email: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function safeSecretEquals(input: string, expected: string) {
  const inputHash = createHash("sha256").update(input).digest();
  const expectedHash = createHash("sha256").update(expected).digest();
  return timingSafeEqual(inputHash, expectedHash);
}

function formatSchemaError(error: {
  code?: string | null;
  message?: string | null;
}) {
  if (error.code === "42703" || error.message?.includes("column comments.")) {
    return "Comments table migration incomplete. Add id, email, created_at, parent_id, and is_owner columns before using threaded comments.";
  }

  return error.message || "Comments request failed.";
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
      .select("id, name, content, created_at, parent_id, is_owner")
      .eq("slug", slug)
      .order("created_at", { ascending: false });

    if (error) {
      return NextResponse.json(
        {
          error: formatSchemaError(error),
          details: error.details ?? null,
          hint: error.hint ?? null,
        },
        { status: 500 },
      );
    }

    return NextResponse.json({
      comments: (data ?? []) as CommentRecord[],
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
  const parentId = normalizeText(body.parent_id) || null;
  const secretKey = normalizeText(body.secretKey);

  if (!slug || !name || !email || !content) {
    return NextResponse.json(
      { error: "Name, email, comment, and slug are all required." },
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

  if (content.length > MAX_COMMENT_LENGTH) {
    return NextResponse.json(
      {
        error: `Comment must be ${MAX_COMMENT_LENGTH} characters or fewer.`,
      },
      { status: 400 },
    );
  }

  let isOwner = false;

  if (email === OWNER_EMAIL) {
    const ownerSecret = process.env.OWNER_SECRET_KEY;

    if (!ownerSecret || !secretKey || !safeSecretEquals(secretKey, ownerSecret)) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    isOwner = true;
  }

  try {
    const supabase = getSupabaseAdminClient();

    const { data: insertedComment, error: insertError } = await supabase
      .from("comments")
      .insert({
        name,
        email,
        content,
        slug,
        parent_id: parentId,
        is_owner: isOwner,
      })
      .select("id, name, content, created_at, parent_id, is_owner")
      .single();

    if (insertError) {
      return NextResponse.json(
        {
          error: formatSchemaError(insertError),
          details: insertError.details ?? null,
          hint: insertError.hint ?? null,
        },
        { status: 500 },
      );
    }

    if (parentId && isOwner) {
      try {
        const { data: parentComment, error: parentError } = await supabase
          .from("comments")
          .select("email, name")
          .eq("id", parentId)
          .single();

        if (!parentError && parentComment?.email) {
          const resend = getResendClient();
          const siteUrl = process.env.SITE_URL;
          const fromEmail =
            process.env.RESEND_FROM_EMAIL ?? "onboarding@resend.dev";

          if (siteUrl) {
            const replyUrl = `${siteUrl.replace(/\/+$/, "")}/blog/${slug}`;

            await resend.emails.send({
              from: fromEmail,
              replyTo: OWNER_EMAIL,
              to: parentComment.email,
              subject: "Aditya Mishra replied to your comment",
              html: `
                <p>Hi ${parentComment.name ?? "there"}, Aditya Mishra has replied to your comment on the blog!</p>
                <p><a href="${replyUrl}">Click here to view the reply: ${replyUrl}</a></p>
              `,
            });
          }
        }
      } catch (notificationError) {
        console.error("Reply notification failed:", notificationError);
      }
    }

    return NextResponse.json(
      { comment: insertedComment as CommentRecord },
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
