import Link from "next/link";
import { contactItems, heroContent, navLinks } from "@/data/portfolio";

type NavbarProps = {
  variant?: "dark" | "light";
};

export function Navbar({ variant = "dark" }: NavbarProps) {
  const isLight = variant === "light";

  return (
    <header
      className={`sticky top-0 z-50 border-b backdrop-blur-xl ${
        isLight
          ? "border-slate-200 bg-white/85"
          : "border-white/10 bg-black/55"
      }`}
    >
      <div className="mx-auto flex w-full max-w-7xl items-center justify-between gap-4 px-4 py-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-6">
          <Link
            href="/"
            className={`flex flex-col text-sm font-semibold uppercase tracking-[0.3em] ${
              isLight ? "text-slate-900" : "text-white"
            }`}
          >
            <span>{heroContent.name}</span>
            <span
              className={`mt-1 text-[10px] tracking-[0.22em] ${
                isLight ? "text-slate-500" : "text-zinc-400"
              }`}
            >
              {heroContent.location}
            </span>
          </Link>
          <div
            className={`hidden xl:flex xl:flex-wrap xl:items-center xl:gap-4 xl:text-xs ${
              isLight ? "xl:text-slate-500" : "xl:text-zinc-400"
            }`}
          >
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
        <nav
          className={`flex flex-wrap items-center justify-end gap-3 text-sm sm:gap-6 ${
            isLight ? "text-slate-600" : "text-zinc-300"
          }`}
        >
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={
                isLight
                  ? "hover:text-slate-900 focus-visible:text-slate-900"
                  : "hover:text-white focus-visible:text-white"
              }
            >
              {link.label}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}
