import Link from "next/link";
import { socialLinks } from "@/data/portfolio";

export function Footer() {
  return (
    <footer className="border-t border-white/10">
      <div className="mx-auto flex w-full max-w-7xl flex-col gap-4 px-4 py-8 text-sm text-zinc-400 sm:flex-row sm:items-center sm:justify-between sm:px-6 lg:px-8">
        <p>Built with Next.js, React, and Tailwind CSS.</p>
        <div className="flex items-center gap-5">
          {socialLinks.map((link) => (
            <Link
              key={link.label}
              href={link.href}
              className="hover:text-white"
              target={link.href.startsWith("http") ? "_blank" : undefined}
              rel={
                link.href.startsWith("http") ? "noopener noreferrer" : undefined
              }
            >
              {link.label}
            </Link>
          ))}
        </div>
      </div>
    </footer>
  );
}
