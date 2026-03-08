"use client";

import type { FormEvent } from "react";

export function SubscribeBanner() {
  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
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
        <form
          onSubmit={handleSubmit}
          className="mx-auto mt-8 flex max-w-2xl flex-col gap-3 sm:flex-row"
        >
          <input
            type="email"
            placeholder="Enter your email"
            className="min-h-14 flex-1 rounded-xl border border-slate-200 bg-white px-4 py-3 text-slate-800 outline-none transition focus:border-slate-400 focus:ring-2 focus:ring-slate-200"
          />
          <button
            type="submit"
            className="min-h-14 rounded-xl bg-slate-800 px-8 py-3.5 font-medium text-white transition-colors hover:bg-slate-900"
          >
            Subscribe
          </button>
        </form>
      </div>
    </section>
  );
}
