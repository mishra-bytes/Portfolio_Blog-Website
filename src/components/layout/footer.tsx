import Link from "next/link";
import { contactItems } from "@/data/portfolio";

type FooterProps = {
  variant?: "dark" | "light";
};

export function Footer({ variant = "dark" }: FooterProps) {
  const isLight = variant === "light";

  return (
    <footer
      className={`border-t ${
        isLight
          ? "border-slate-200 bg-transparent"
          : "border-white/10 bg-black text-zinc-400"
      }`}
    >
      <div
        className={`mx-auto flex w-full max-w-7xl flex-col gap-4 px-4 py-8 text-sm sm:flex-row sm:items-center sm:justify-between sm:px-6 lg:px-8 ${
          isLight ? "text-slate-500" : "text-zinc-400"
        }`}
      >
        <p>Built with Next.js, React, and Tailwind CSS.</p>
        <div className="flex flex-wrap items-center gap-5">
          {contactItems.map((item) =>
            item.href ? (
              <Link
                key={item.label}
                href={item.href}
                className={isLight ? "hover:text-slate-900" : "hover:text-white"}
              >
                {item.value}
              </Link>
            ) : (
              <span key={item.label}>{item.label}</span>
            ),
          )}
        </div>
      </div>
    </footer>
  );
}
