import { SectionHeading } from "@/components/ui/section-heading";
import { experience, skills } from "@/data/portfolio";

export function AboutSection() {
  return (
    <section
      id="about"
      className="section-shell rounded-[2rem] px-6 py-12 sm:px-10 lg:px-14"
    >
      <div className="relative z-10 grid gap-10 lg:grid-cols-[1.05fr_0.95fr]">
        <div className="space-y-8">
          <SectionHeading
            eyebrow="About"
            title="Engineering depth with a systems mindset."
            description="I am pursuing a B.Tech in Instrumentation and Control Engineering at NSUT and currently serve as Chairperson of the IEEE NSUT Student Branch, combining technical execution with leadership across student and applied research communities."
          />
          <div className="rounded-[1.75rem] border border-white/10 bg-white/[0.03] p-6">
            <p className="text-sm uppercase tracking-[0.3em] text-accent-soft">
              Focus Areas
            </p>
            <p className="mt-4 text-base leading-8 text-zinc-300">
              My recent work spans model development for predictive systems,
              computer vision pipelines for measurement and analysis, and
              process-oriented problem solving where sensing, control, and ML
              intersect.
            </p>
          </div>
        </div>
        <div className="grid gap-4">
          {experience.map((item) => (
            <article
              key={item.title}
              className="rounded-[1.5rem] border border-white/10 bg-panel-strong/80 p-5"
            >
              <p className="text-xs uppercase tracking-[0.35em] text-accent-soft">
                {item.organization}
              </p>
              <h3 className="mt-3 text-xl font-semibold text-white">
                {item.title}
              </h3>
              <p className="mt-3 text-sm leading-7 text-zinc-400">
                {item.description}
              </p>
            </article>
          ))}
        </div>
      </div>
      <div className="relative z-10 mt-10">
        <p className="text-xs font-semibold uppercase tracking-[0.35em] text-accent-soft">
          Skills
        </p>
        <div className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {skills.map((skill) => (
            <div
              key={skill}
              className="rounded-2xl border border-white/10 bg-white/[0.025] px-4 py-4 text-sm font-medium text-zinc-200"
            >
              {skill}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
