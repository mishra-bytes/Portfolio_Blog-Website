import Link from "next/link";
import { contactItems } from "@/data/portfolio";

export function Footer() {
  return (
    <footer className="border-t border-white/10">
      <div className="mx-auto flex w-full max-w-7xl flex-col gap-4 px-4 py-8 text-sm text-zinc-400 sm:flex-row sm:items-center sm:justify-between sm:px-6 lg:px-8">
        <p>Built with Next.js, React, and Tailwind CSS.</p>
        <div className="flex flex-wrap items-center gap-5">
          {contactItems.map((item) =>
            item.href ? (
              <Link key={item.label} href={item.href} className="hover:text-white">
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
