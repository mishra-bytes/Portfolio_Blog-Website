import type { Metadata } from "next";
import Link from "next/link";
import {
  awards,
  experience,
  heroContent,
  publication,
  resumePoints,
  skillGroups,
} from "@/data/portfolio";

export const metadata: Metadata = {
  title: "Resume",
  description: "Resume view for Aditya Mishra with PDF download.",
};

export default function ResumePage() {
  return (
    <main className="mx-auto flex w-full max-w-6xl flex-col gap-8 px-4 pb-16 pt-6 sm:px-6 lg:px-8">
      <section className="section-shell rounded-[2rem] px-6 py-12 sm:px-10 lg:px-14">
        <div className="relative z-10 space-y-10">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
            <div className="space-y-4">
              <p className="text-xs font-semibold uppercase tracking-[0.35em] text-accent-soft">
                Resume
              </p>
              <h1 className="text-4xl font-semibold tracking-[-0.05em] text-white sm:text-5xl">
                {heroContent.name}
              </h1>
              <p className="max-w-3xl text-base leading-8 text-zinc-300">
                {heroContent.summary}
              </p>
            </div>
            <Link
              href="/resume/aditya-mishra-resume.pdf"
              className="w-fit rounded-full border border-accent bg-accent px-6 py-3 text-sm font-semibold text-white shadow-[0_0_30px_var(--color-accent-glow)] transition-all duration-300 ease-in-out hover:-translate-y-0.5 hover:scale-[1.02] hover:bg-[#ff5a66] hover:shadow-[0_0_38px_var(--color-accent-glow)]"
            >
              Download PDF
            </Link>
          </div>
          <div className="grid gap-6 lg:grid-cols-[1fr_0.9fr]">
            <div className="space-y-6 rounded-[1.75rem] border border-white/10 bg-panel-strong/80 p-6">
              <h2 className="text-2xl font-semibold text-white">Snapshot</h2>
              <div className="grid gap-3">
                {resumePoints.map((point) => (
                  <div
                    key={point}
                    className="rounded-2xl border border-white/10 bg-white/[0.03] px-4 py-4 text-sm text-zinc-200"
                  >
                    {point}
                  </div>
                ))}
              </div>
            </div>
            <div className="space-y-6 rounded-[1.75rem] border border-white/10 bg-panel-strong/80 p-6">
              <h2 className="text-2xl font-semibold text-white">
                Core Skills
              </h2>
              <div className="grid gap-4">
                {skillGroups.map((group) => (
                  <div key={group.category} className="space-y-2">
                    <p className="text-sm font-semibold text-white">
                      {group.category}
                    </p>
                    <p className="text-sm leading-7 text-zinc-300">
                      {group.items.join(", ")}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
          <div className="grid gap-5 lg:grid-cols-2">
            <article className="rounded-[1.5rem] border border-white/10 bg-white/[0.03] p-6">
              <p className="text-xs uppercase tracking-[0.35em] text-accent-soft">
                Publication
              </p>
              <h2 className="mt-3 text-xl font-semibold text-white">
                {publication.title}
              </h2>
              <p className="mt-4 text-sm leading-7 text-zinc-300">
                {publication.venue} | {publication.summary}
              </p>
            </article>
            <article className="rounded-[1.5rem] border border-white/10 bg-white/[0.03] p-6">
              <p className="text-xs uppercase tracking-[0.35em] text-accent-soft">
                Awards & Certifications
              </p>
              <ul className="mt-4 space-y-3 text-sm leading-7 text-zinc-300">
                {awards.map((award) => (
                  <li key={award} className="flex gap-3">
                    <span className="mt-2 h-1.5 w-1.5 rounded-full bg-accent-soft" />
                    <span>{award}</span>
                  </li>
                ))}
              </ul>
            </article>
          </div>
          <div className="grid gap-5">
            {experience.map((item) => (
              <article
                key={`${item.organization}-${item.title}`}
                className="rounded-[1.5rem] border border-white/10 bg-white/[0.03] p-6"
              >
                <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                  <div>
                    <h2 className="text-xl font-semibold text-white">
                      {item.title}
                    </h2>
                    <span className="text-xs uppercase tracking-[0.3em] text-accent-soft">
                      {item.organization}
                    </span>
                  </div>
                  <span className="text-xs uppercase tracking-[0.3em] text-zinc-400">
                    {item.period}
                  </span>
                </div>
                <ul className="mt-4 space-y-3 text-sm leading-7 text-zinc-400">
                  {item.bullets.map((bullet) => (
                    <li key={bullet} className="flex gap-3">
                      <span className="mt-2 h-1.5 w-1.5 rounded-full bg-accent-soft" />
                      <span>{bullet}</span>
                    </li>
                  ))}
                </ul>
              </article>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
