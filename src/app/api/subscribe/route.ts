import { NextResponse } from "next/server";
import { getSupabaseAdminClient } from "@/lib/supabaseClient";

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

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
