"use client";

import { useState, type FormEvent } from "react";

type SubscribeStatus = "idle" | "loading" | "success" | "error";

export function SubscribeForm() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<SubscribeStatus>("idle");
  const [message, setMessage] = useState("");

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (!email.trim()) {
      setStatus("error");
      setMessage("Enter a valid email address.");
      return;
    }

    setStatus("loading");
    setMessage("");

    try {
      const response = await fetch("/api/subscribe", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: email.trim().toLowerCase(),
        }),
      });

      const result = (await response.json()) as {
        message?: string;
      };

      if (!response.ok) {
        throw new Error(result.message ?? "Unable to subscribe right now.");
      }

      setStatus("success");
      setMessage("You're in. Keep an eye on your inbox.");
      setEmail("");
    } catch (error) {
      setStatus("error");
      setMessage(
        error instanceof Error
          ? error.message
          : "Unable to subscribe right now.",
      );
    }
  }

  return (
    <section className="mt-20 pb-24">
      <div className="rounded-[2rem] border border-slate-200 bg-[#f8fafc] p-8 text-center md:p-12">
        <h2 className="text-2xl font-semibold text-slate-800">
          Join the loop.
        </h2>
        <p className="mx-auto mt-3 max-w-xl text-slate-600">
          No spam. Just highly technical write-ups on Machine Learning,
          Computer Vision, and system design, delivered straight to your inbox.
        </p>

        {status === "success" ? (
          <div className="mx-auto mt-8 max-w-2xl rounded-2xl border border-emerald-200 bg-emerald-50 px-5 py-4 text-sm font-medium text-emerald-700">
            ✓ {message}
          </div>
        ) : (
          <form
            onSubmit={handleSubmit}
            className="mx-auto mt-8 flex max-w-2xl flex-col gap-3 sm:flex-row"
          >
            <input
              type="email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              placeholder="Enter your email"
              disabled={status === "loading"}
              className="min-h-14 flex-1 rounded-xl border border-slate-200 bg-white px-4 py-3 text-slate-800 outline-none transition focus:border-slate-400 focus:ring-2 focus:ring-slate-200 disabled:cursor-not-allowed disabled:bg-slate-100"
            />
            <button
              type="submit"
              disabled={status === "loading"}
              className="min-h-14 rounded-xl bg-slate-800 px-8 py-3.5 font-medium text-white transition-colors hover:bg-slate-900 disabled:cursor-not-allowed disabled:bg-slate-500"
            >
              {status === "loading" ? "Subscribing..." : "Subscribe"}
            </button>
          </form>
        )}

        {status === "error" && message ? (
          <p className="mt-2 text-sm text-red-500">{message}</p>
        ) : null}
      </div>
    </section>
  );
}
