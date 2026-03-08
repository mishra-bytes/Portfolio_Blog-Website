import { NextResponse } from "next/server";
import { Resend } from "resend";
import { getSupabaseAdminClient } from "@/lib/supabaseClient";

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const resend = process.env.RESEND_API_KEY
  ? new Resend(process.env.RESEND_API_KEY)
  : null;

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as {
      email?: string;
    };

    const email = body.email?.trim().toLowerCase();

    if (!email || !EMAIL_REGEX.test(email)) {
      return NextResponse.json(
        { message: "Enter a valid email address." },
        { status: 400 },
      );
    }

    const supabase = getSupabaseAdminClient();
    const { error } = await supabase.from("subscribers").insert({ email });

    if (error) {
      if (error.code === "23505") {
        return NextResponse.json(
          { message: "You are already subscribed!" },
          { status: 400 },
        );
      }

      return NextResponse.json(
        { message: "Unable to subscribe right now." },
        { status: 500 },
      );
    }

    try {
      if (!resend) {
        throw new Error("Missing RESEND_API_KEY.");
      }

      await resend.emails.send({
        from:
          process.env.RESEND_FROM_EMAIL ??
          "Aditya Mishra <notifications@adimishra.tech>",
        to: email,
        subject: "Welcome to the loop. 🚀",
        html: `
          <div style="font-family: Arial, sans-serif; color: #0f172a; line-height: 1.6;">
            <h2 style="margin-bottom: 12px;">Welcome to the Engineering Blog</h2>
            <p style="margin: 0 0 12px;">
              Thanks for subscribing. I'll be sending my latest technical write-ups on ML,
              Computer Vision, and system design straight to this inbox.
            </p>
            <p style="margin: 0 0 12px;">
              You can check out my latest projects on
              <a href="https://github.com/aditya-mishra" style="color: #2563eb;">GitHub</a>
              in the meantime.
            </p>
            <p style="margin: 0;">- Aditya Mishra</p>
          </div>
        `,
      });
    } catch (resendError) {
      console.error("Failed to send welcome email:", resendError);
    }

    return NextResponse.json(
      { message: "Subscription successful." },
      { status: 200 },
    );
  } catch {
    return NextResponse.json(
      { message: "Unable to subscribe right now." },
      { status: 500 },
    );
  }
}
