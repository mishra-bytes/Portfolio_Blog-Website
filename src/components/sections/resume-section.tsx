import Link from "next/link";
import { SectionHeading } from "@/components/ui/section-heading";
import { resumePoints } from "@/data/portfolio";

export function ResumeSection() {
  return (
    <section className="section-shell rounded-[2rem] px-6 py-12 sm:px-10 lg:px-14">
      <div className="relative z-10 grid gap-8 lg:grid-cols-[1fr_0.9fr] lg:items-end">
        <div className="space-y-6">
          <SectionHeading
            eyebrow="Resume"
            title="A dedicated CV view with a direct download path."
            description="The resume page presents your academic background, leadership, and selected experience in a structured layout, with a prominent PDF download action for recruiters and collaborators."
          />
          <div className="grid gap-3 sm:grid-cols-2">
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
        <div className="rounded-[1.75rem] border border-white/10 bg-panel-strong/80 p-6">
          <p className="text-xs uppercase tracking-[0.35em] text-accent-soft">
            Resume Actions
          </p>
          <div className="mt-5 flex flex-wrap gap-4">
            <Link
              href="/resume"
              className="rounded-full border border-accent bg-accent px-6 py-3 text-sm font-semibold text-white shadow-[0_0_30px_var(--color-accent-glow)] hover:-translate-y-0.5 hover:bg-[#ff5a66]"
            >
              Open Resume
            </Link>
            <Link
              href="/resume/aditya-mishra-resume.pdf"
              className="rounded-full border border-white/12 bg-white/5 px-6 py-3 text-sm font-semibold text-white hover:-translate-y-0.5 hover:border-white/25 hover:bg-white/8"
            >
              Download PDF
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
