type ProjectCardProps = {
  title: string;
  summary: string;
  tags: readonly string[];
};

export function ProjectCard({ title, summary, tags }: ProjectCardProps) {
  return (
    <article className="neon-card group rounded-[1.75rem] border border-white/10 bg-panel-strong/80 p-6 transition-all duration-300 ease-in-out hover:-translate-y-1 hover:scale-[1.02] hover:shadow-[0_24px_52px_rgba(0,0,0,0.34)]">
      <p className="text-xs uppercase tracking-[0.35em] text-accent-soft">
        Project
      </p>
      <h3 className="mt-4 text-2xl font-semibold tracking-[-0.04em] text-white">
        {title}
      </h3>
      <p className="mt-4 text-sm leading-7 text-zinc-400">{summary}</p>
      <div className="mt-6 flex flex-wrap gap-2">
        {tags.map((tag) => (
          <span
            key={tag}
            className="rounded-full border border-white/10 bg-white/[0.04] px-3 py-1 text-xs text-zinc-200"
          >
            {tag}
          </span>
        ))}
      </div>
    </article>
  );
}
