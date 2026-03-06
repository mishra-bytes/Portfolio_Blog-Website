import Link from "next/link";
import {
  MotionReveal,
  MotionStagger,
  MotionStaggerItem,
} from "@/components/motion/reveal";
import { SectionHeading } from "@/components/ui/section-heading";
import { awards, publication, resumePoints } from "@/data/portfolio";

export function ResumeSection() {
  return (
    <section className="section-shell rounded-[2rem] px-6 py-12 sm:px-10 lg:px-14">
      <div className="relative z-10 grid gap-8 lg:grid-cols-[1fr_0.9fr] lg:items-end">
        <MotionReveal className="space-y-6">
          <SectionHeading
            eyebrow="Resume"
            title="Education, internships, publications, and certifications."
            description="The resume page summarizes current academics at NSUT, ML internship work, IEEE leadership, and accepted publication details."
          />
          <MotionStagger className="grid items-stretch gap-3 sm:grid-cols-2">
            {resumePoints.map((point) => (
              <MotionStaggerItem key={point} className="h-full">
                <div className="flex h-full items-center rounded-2xl border border-white/10 bg-white/[0.03] px-4 py-4 text-sm text-zinc-200">
                  {point}
                </div>
              </MotionStaggerItem>
            ))}
          </MotionStagger>
        </MotionReveal>
        <MotionReveal>
          <div className="rounded-[1.75rem] border border-white/10 bg-panel-strong/80 p-6">
          <p className="text-xs uppercase tracking-[0.35em] text-accent-soft">
            Highlights
          </p>
          <div className="mt-5 space-y-4 text-sm leading-7 text-zinc-300">
            <p>
              {publication.title} | {publication.venue} | {publication.summary}
            </p>
            <p>{awards.join(" | ")}</p>
            <div className="flex flex-wrap gap-4">
              <Link
                href="/resume"
                className="rounded-full border border-accent bg-accent px-6 py-3 text-sm font-semibold text-white shadow-[0_0_30px_var(--color-accent-glow)] transition-all duration-300 ease-in-out hover:-translate-y-0.5 hover:scale-[1.02] hover:bg-[#ff5a66] hover:shadow-[0_0_38px_var(--color-accent-glow)]"
              >
                Open Resume
              </Link>
              <Link
                href="/resume/aditya-mishra-resume.pdf"
                className="rounded-full border border-white/12 bg-white/5 px-6 py-3 text-sm font-semibold text-white transition-all duration-300 ease-in-out hover:-translate-y-0.5 hover:scale-[1.02] hover:border-white/25 hover:bg-white/8 hover:shadow-[0_14px_30px_rgba(0,0,0,0.22)]"
              >
                Download PDF
              </Link>
            </div>
          </div>
          </div>
        </MotionReveal>
      </div>
    </section>
  );
}
