type ProjectCardProps = {
  title: string;
  period?: string;
  bullets: readonly string[];
  tags: readonly string[];
};

export function ProjectCard({ title, period, bullets, tags }: ProjectCardProps) {
  return (
    <article className="group flex h-full flex-col rounded-[1.75rem] border border-white/10 bg-panel-strong/80 p-6 transition-all duration-300 ease-in-out hover:-translate-y-1 hover:scale-[1.02] hover:shadow-[0_20px_45px_rgba(0,0,0,0.28)]">
      <p className="text-xs uppercase tracking-[0.35em] text-accent-soft">
        Project
      </p>
      <h3 className="mt-4 text-2xl font-semibold tracking-[-0.04em] text-white">
        {title}
      </h3>
      {period ? (
        <p className="mt-2 text-xs uppercase tracking-[0.3em] text-zinc-400">
          {period}
        </p>
      ) : null}
      <ul className="mt-4 space-y-3 text-sm leading-7 text-zinc-400">
        {bullets.map((bullet) => (
          <li key={bullet} className="flex gap-3">
            <span className="mt-2 h-1.5 w-1.5 rounded-full bg-accent-soft" />
            <span>{bullet}</span>
          </li>
        ))}
      </ul>
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
