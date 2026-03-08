"use client";

type GithubFileCardProps = {
  repo?: string;
  filePath?: string;
  url: string;
};

export function GithubFileCard({
  repo,
  filePath,
  url,
}: GithubFileCardProps) {
  return (
    <div className="my-6 flex items-center justify-between gap-4 rounded-xl border border-slate-200 bg-[#f8fafc] p-4 transition-colors hover:border-blue-400">
      <div className="flex min-w-0 items-center gap-3">
        <svg
          aria-hidden="true"
          viewBox="0 0 24 24"
          className="h-6 w-6 shrink-0 fill-slate-700"
        >
          <path d="M12 2C6.477 2 2 6.589 2 12.248c0 4.526 2.865 8.367 6.839 9.722.5.096.682-.221.682-.492 0-.243-.009-.888-.014-1.742-2.782.617-3.369-1.377-3.369-1.377-.455-1.178-1.11-1.492-1.11-1.492-.908-.636.069-.623.069-.623 1.004.072 1.532 1.055 1.532 1.055.893 1.563 2.341 1.112 2.91.85.091-.666.35-1.112.636-1.368-2.221-.259-4.555-1.14-4.555-5.073 0-1.121.39-2.038 1.029-2.756-.103-.26-.446-1.304.098-2.718 0 0 .84-.275 2.75 1.052A9.32 9.32 0 0 1 12 6.836a9.28 9.28 0 0 1 2.504.348c1.909-1.327 2.747-1.052 2.747-1.052.546 1.414.202 2.458.1 2.718.64.718 1.027 1.635 1.027 2.756 0 3.943-2.338 4.811-4.566 5.065.359.316.679.94.679 1.895 0 1.369-.012 2.473-.012 2.81 0 .273.18.592.688.491C19.138 20.61 22 16.772 22 12.248 22 6.589 17.523 2 12 2Z" />
        </svg>
        <div className="min-w-0">
          <p className="text-xs text-slate-500">{repo ?? "GitHub Repository"}</p>
          <p className="truncate font-mono text-sm font-semibold text-slate-800">
            {filePath ?? "Source file"}
          </p>
        </div>
      </div>
      <a
        href={url}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex min-h-11 shrink-0 items-center gap-2 rounded-lg border border-slate-200 bg-white px-3 py-1.5 text-sm font-medium text-slate-700 shadow-sm transition-colors hover:bg-slate-50"
      >
        <span>View Source</span>
        <span aria-hidden="true">-&gt;</span>
      </a>
    </div>
  );
}
