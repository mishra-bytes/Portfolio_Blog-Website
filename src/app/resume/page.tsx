import type { Metadata } from "next";
import Link from "next/link";
import { experience, resumePoints, skills } from "@/data/portfolio";

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
                Aditya Mishra
              </h1>
              <p className="max-w-3xl text-base leading-8 text-zinc-300">
                Machine Learning and Computer Vision engineer focused on
                predictive modeling, sensing-driven systems, and practical
                applied research.
              </p>
            </div>
            <Link
              href="/resume/aditya-mishra-resume.pdf"
              className="w-fit rounded-full border border-accent bg-accent px-6 py-3 text-sm font-semibold text-white shadow-[0_0_30px_var(--color-accent-glow)] hover:-translate-y-0.5 hover:bg-[#ff5a66]"
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
              <div className="flex flex-wrap gap-2">
                {skills.map((skill) => (
                  <span
                    key={skill}
                    className="rounded-full border border-white/10 bg-white/[0.04] px-3 py-2 text-sm text-zinc-200"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          </div>
          <div className="grid gap-5">
            {experience.map((item) => (
              <article
                key={item.title}
                className="rounded-[1.5rem] border border-white/10 bg-white/[0.03] p-6"
              >
                <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                  <h2 className="text-xl font-semibold text-white">
                    {item.title}
                  </h2>
                  <span className="text-xs uppercase tracking-[0.3em] text-accent-soft">
                    {item.organization}
                  </span>
                </div>
                <p className="mt-4 text-sm leading-7 text-zinc-400">
                  {item.description}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
