import {
  MotionReveal,
  MotionStagger,
  MotionStaggerItem,
} from "@/components/motion/reveal";
import { SectionHeading } from "@/components/ui/section-heading";
import {
  awards,
  education,
  experience,
  leadership,
  publication,
  skillGroups,
} from "@/data/portfolio";

export function AboutSection() {
  return (
    <section
      id="about"
      className="section-shell rounded-[2rem] px-6 py-12 sm:px-10 lg:px-14"
    >
      <div className="relative z-10 grid gap-8 md:gap-10 lg:grid-cols-[1.05fr_0.95fr]">
        <MotionReveal className="space-y-8">
          <SectionHeading
            eyebrow="About"
            title="Education, experience, leadership, and technical foundations."
            description="B. Tech, Instrumentation & Control Engineering (CGPA: 7.4) at Netaji Subhas University of Technology (2023-2027), after Senior Secondary (CBSE) at The Mother's International School (Graduated 2022)."
          />
          <div className="rounded-[1.75rem] border border-white/10 bg-white/[0.03] p-6">
            <p className="text-sm uppercase tracking-[0.3em] text-accent-soft">
              Education
            </p>
            <div className="mt-4 space-y-4">
              {education.map((item) => (
                <div key={item.title} className="space-y-1">
                  <p className="text-base font-semibold text-white">
                    {item.title}
                  </p>
                  <p className="text-sm leading-7 text-zinc-300">
                    {item.organization} | {item.period}
                    {item.detail ? ` | ${item.detail}` : ""}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </MotionReveal>
        <MotionStagger className="grid items-stretch gap-4 md:gap-5">
          {experience.map((item) => (
            <MotionStaggerItem
              key={`${item.organization}-${item.title}`}
              className="h-full"
            >
              <article className="flex h-full flex-col rounded-[1.5rem] border border-white/10 bg-panel-strong/80 p-5">
                <div className="flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between">
                  <div>
                    <p className="text-xs uppercase tracking-[0.35em] text-accent-soft">
                      {item.organization}
                    </p>
                    <h3 className="mt-3 text-xl font-semibold text-white">
                      {item.title}
                    </h3>
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
            </MotionStaggerItem>
          ))}
        </MotionStagger>
      </div>
      <MotionReveal className="relative z-10 mt-10" delay={0.04}>
        <p className="text-xs font-semibold uppercase tracking-[0.35em] text-accent-soft">
          Skills
        </p>
        <MotionStagger className="mt-5 grid items-stretch gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {skillGroups.map((group) => (
            <MotionStaggerItem key={group.category} className="h-full">
              <div className="flex h-full flex-col rounded-2xl border border-white/10 bg-white/[0.025] px-4 py-4 text-sm text-zinc-200">
                <p className="font-semibold text-white">{group.category}</p>
                <p className="mt-3 leading-7 text-zinc-300">
                  {group.items.join(", ")}
                </p>
              </div>
            </MotionStaggerItem>
          ))}
        </MotionStagger>
      </MotionReveal>
      <MotionReveal className="relative z-10 mt-10" delay={0.06}>
        <p className="text-xs font-semibold uppercase tracking-[0.35em] text-accent-soft">
          Leadership & Awards
        </p>
        <div className="mt-5 grid items-stretch gap-4 md:gap-5 lg:grid-cols-3">
          <div className="rounded-[1.5rem] border border-white/10 bg-panel-strong/80 p-5">
            <div className="flex flex-col gap-2">
              <p className="text-xs uppercase tracking-[0.35em] text-accent-soft">
                {leadership.organization}
              </p>
              <h3 className="text-xl font-semibold text-white">
                {leadership.title}
              </h3>
              <p className="text-xs uppercase tracking-[0.3em] text-zinc-400">
                {leadership.period}
              </p>
            </div>
            <ul className="mt-4 space-y-3 text-sm leading-7 text-zinc-400">
              {leadership.bullets.map((bullet) => (
                <li key={bullet} className="flex gap-3">
                  <span className="mt-2 h-1.5 w-1.5 rounded-full bg-accent-soft" />
                  <span>{bullet}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="rounded-[1.5rem] border border-white/10 bg-panel-strong/80 p-5">
            <p className="text-xs uppercase tracking-[0.35em] text-accent-soft">
              Publications
            </p>
            <h3 className="mt-3 text-xl font-semibold text-white">
              {publication.title}
            </h3>
            <p className="mt-3 text-sm leading-7 text-zinc-300">
              {publication.venue} | {publication.summary}
            </p>
          </div>
          <div className="rounded-[1.5rem] border border-white/10 bg-panel-strong/80 p-5">
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
          </div>
        </div>
      </MotionReveal>
    </section>
  );
}
