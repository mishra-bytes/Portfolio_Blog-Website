import { ProjectCard } from "@/components/projects/project-card";
import { SectionHeading } from "@/components/ui/section-heading";
import { projects, publication } from "@/data/portfolio";

export function ProjectsSection() {
  return (
    <section
      id="projects"
      className="section-shell rounded-[2rem] px-6 py-12 sm:px-10 lg:px-14"
    >
      <div className="relative z-10 space-y-10">
        <SectionHeading
          eyebrow="Projects"
          title="Applied machine learning across vision, ranking, automation, and IoT."
          description="A selected set of projects focused on measurable outcomes, careful optimization, and real-world system constraints."
        />
        <div className="grid gap-5 lg:grid-cols-2 xl:grid-cols-3">
          {projects.map((project) => (
            <ProjectCard
              key={project.title}
              title={project.title}
              summary={project.summary}
              tags={project.tags}
            />
          ))}
        </div>
        <div className="rounded-[1.75rem] border border-accent/30 bg-[linear-gradient(135deg,rgba(255,77,90,0.14),rgba(255,255,255,0.03))] p-6 shadow-[0_0_40px_rgba(255,77,90,0.12)]">
          <p className="text-xs uppercase tracking-[0.35em] text-accent-soft">
            Publication Highlight
          </p>
          <div className="mt-3 flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
            <div className="max-w-2xl space-y-3">
              <h3 className="text-2xl font-semibold tracking-[-0.04em] text-white">
                {publication.title}
              </h3>
              <p className="text-sm uppercase tracking-[0.25em] text-zinc-300">
                {publication.venue}
              </p>
              <p className="text-sm leading-7 text-zinc-200">
                {publication.summary}
              </p>
            </div>
            <span className="rounded-full border border-white/15 bg-black/20 px-4 py-2 text-sm text-white">
              Research + Optimization
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
