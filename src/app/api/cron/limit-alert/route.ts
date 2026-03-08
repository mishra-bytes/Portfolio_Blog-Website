import { NextResponse } from "next/server";
import { Resend } from "resend";
import { getSupabaseAdminClient } from "@/lib/supabaseClient";

export async function GET(request: Request) {
  const authorization = request.headers.get("authorization");
  const cronSecret = process.env.CRON_SECRET;

  if (!cronSecret || authorization !== `Bearer ${cronSecret}`) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  try {
    const supabase = getSupabaseAdminClient();
    const yesterday = new Date(
      Date.now() - 24 * 60 * 60 * 1000,
    ).toISOString();

    const { count, error } = await supabase
      .from("subscribers")
      .select("*", { count: "exact", head: true })
      .gte("created_at", yesterday);

    if (error) {
      return NextResponse.json(
        { message: "Unable to query subscriber count." },
        { status: 500 },
      );
    }

    const subscriberCount = count ?? 0;

    if (subscriberCount >= 90) {
      const resendApiKey = process.env.RESEND_API_KEY;
      const fromEmail = process.env.RESEND_FROM_EMAIL;

      if (!resendApiKey || !fromEmail) {
        return NextResponse.json(
          { message: "Missing Resend configuration." },
          { status: 500 },
        );
      }

      const resend = new Resend(resendApiKey);

      await resend.emails.send({
        to: "aditya_mishra@outlook.in",
        from: fromEmail,
        subject: "🚨 SYSTEM ALERT: Resend Daily Limit Approaching",
        text: `Warning: Your blog has received ${subscriberCount} subscribers in the last 24 hours. You are approaching the 100/day free tier limit.`,
      });
    }

    return NextResponse.json(
      { count: subscriberCount },
      { status: 200 },
    );
  } catch {
    return NextResponse.json(
      { message: "Unable to run cron alert check." },
      { status: 500 },
    );
  }
}
