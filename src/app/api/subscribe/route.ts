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
        html: `<div style="font-family: Arial, Helvetica, sans-serif; line-height:1.6; color:#222; max-width:600px; margin:auto;">
  <h2 style="margin-bottom:10px;">Welcome.</h2>
  <p>Thank you for subscribing.</p>
  <p>This blog is where I document things I learn while building machine learning systems and experimenting with real-world data. Most posts focus on practical work in computer vision, deep learning, and ML engineering.</p>
  <p>Some of the insights shared here come from my experience working on machine learning systems at the <strong>Indian Meteorological Department</strong>, as well as my current work as a Machine Learning Engineer at <strong>DUSQ</strong>.</p>
  <p>Expect practical breakdowns, technical deep dives, and lessons learned while building ML systems beyond textbook examples.</p>
  <p style="margin-top:20px;">You can explore the blog here:</p>
  <p><a href="https://aditya-mishra-blog-portfolio.vercel.app/blog" style="display:inline-block; padding:10px 16px; background-color:#111; color:#ffffff; text-decoration:none; border-radius:6px;">Read the Blog</a></p>
  <p style="margin-top:30px;">— Aditya Mishra</p>
</div>`,
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
