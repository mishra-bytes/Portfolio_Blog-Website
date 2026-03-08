"use client";

import { useEffect, useState } from "react";
import SyntaxHighlighter from "react-syntax-highlighter/dist/cjs/prism";
import { vscDarkPlus } from "react-syntax-highlighter/dist/cjs/styles/prism";

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
        className="absolute top-3 right-3 inline-flex min-h-11 min-w-11 items-center justify-center rounded-md bg-white/10 px-3 py-2 text-xs font-medium text-slate-100 transition-all hover:bg-white/20 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/40"
        aria-label={isCopied ? "Code copied to clipboard" : "Copy code to clipboard"}
      >
        {isCopied ? "Copied! \u2713" : "Copy"}
      </button>
      <SyntaxHighlighter
        language={language ?? "text"}
        style={vscDarkPlus}
        PreTag="div"
        customStyle={{
          margin: 0,
          padding: "2.75rem 1rem 1rem",
          background: "transparent",
          borderRadius: 0,
          fontSize: "0.875rem",
          lineHeight: 1.75,
          overflowX: "auto",
        }}
        codeTagProps={{
          style: {
            fontFamily:
              '"IBM Plex Mono", "Cascadia Code", ui-monospace, SFMono-Regular, monospace',
          },
        }}
      >
        {code}
      </SyntaxHighlighter>
    </div>
  );
}
