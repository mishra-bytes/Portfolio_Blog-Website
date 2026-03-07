"use client";

import { useEffect, useState } from "react";

type CodeBlockProps = {
  code: string;
  language?: string;
};

export function CodeBlock({ code, language }: CodeBlockProps) {
  const [isCopied, setIsCopied] = useState(false);

  useEffect(() => {
    if (!isCopied) {
      return undefined;
    }

    const timeoutId = window.setTimeout(() => {
      setIsCopied(false);
    }, 2000);

    return () => {
      window.clearTimeout(timeoutId);
    };
  }, [isCopied]);

  async function copyToClipboard() {
    try {
      await navigator.clipboard.writeText(code);
      setIsCopied(true);
    } catch {
      setIsCopied(false);
    }
  }

  return (
    <div className="relative overflow-hidden rounded-[1.25rem] border border-slate-800 bg-[#0f172a] text-slate-50 shadow-sm">
      <button
        type="button"
        onClick={copyToClipboard}
        className="absolute top-3 right-3 rounded-md bg-white/10 px-2 py-1 text-xs font-medium text-slate-100 transition-all hover:bg-white/20"
        aria-label={isCopied ? "Code copied to clipboard" : "Copy code to clipboard"}
      >
        {isCopied ? "Copied! \u2713" : "Copy"}
      </button>
      <pre className="overflow-x-auto p-4 pt-10 text-sm font-mono leading-7 whitespace-pre">
        <code data-language={language}>{code}</code>
      </pre>
    </div>
  );
}
