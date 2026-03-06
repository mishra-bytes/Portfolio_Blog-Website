import { HeroSpores } from "@/components/decor/hero-spores";
import Link from "next/link";
import { MotionReveal, MotionStagger, MotionStaggerItem } from "@/components/motion/reveal";
import { highlights } from "@/data/portfolio";

export function HeroSection() {
  return (
    <section className="section-shell grid-overlay rounded-[2rem] px-6 py-14 sm:px-10 sm:py-16 lg:grid lg:grid-cols-[1.35fr_0.65fr] lg:gap-10 lg:px-14">
      <HeroSpores />
      <MotionReveal className="relative z-10 max-w-3xl space-y-8">
        <div className="inline-flex items-center rounded-full border border-white/10 bg-white/5 px-4 py-2 text-xs uppercase tracking-[0.3em] text-zinc-200">
          Machine Learning Portfolio
        </div>
        <div className="space-y-6">
          <h1 className="upside-title hero-title max-w-4xl text-4xl font-semibold tracking-[-0.06em] text-white sm:text-5xl lg:text-7xl">
            Aditya Mishra | Machine Learning &amp; Computer Vision Engineer
          </h1>
          <p className="max-w-2xl text-base leading-8 text-zinc-300 sm:text-lg">
            Building reliable systems across predictive modeling, computer
            vision, and process dynamics with an engineering-first approach to
            experimentation and deployment.
          </p>
        </div>
        <div className="flex flex-wrap gap-4">
          <Link
            href="/#projects"
            className="rounded-full border border-accent bg-accent px-6 py-3 text-sm font-semibold text-white shadow-[0_0_30px_var(--color-accent-glow)] transition-all duration-300 ease-in-out hover:-translate-y-0.5 hover:scale-[1.02] hover:bg-[#ff5a66] hover:shadow-[0_0_38px_var(--color-accent-glow)]"
          >
            View Projects
          </Link>
          <Link
            href="/blog"
            className="rounded-full border border-white/12 bg-white/5 px-6 py-3 text-sm font-semibold text-white transition-all duration-300 ease-in-out hover:-translate-y-0.5 hover:scale-[1.02] hover:border-white/25 hover:bg-white/8 hover:shadow-[0_14px_30px_rgba(0,0,0,0.22)]"
          >
            Read My Blog
          </Link>
        </div>
      </MotionReveal>
      <MotionStagger className="relative z-10 mt-10 grid gap-4 lg:mt-0">
        {highlights.map((item, index) => (
          <MotionStaggerItem key={item}>
            <div className="rounded-[1.5rem] border border-white/10 bg-panel-strong/80 p-5 shadow-[inset_0_1px_0_rgba(255,255,255,0.04)]">
              <p className="text-xs uppercase tracking-[0.35em] text-accent-soft">
                0{index + 1}
              </p>
              <h2 className="mt-4 text-2xl font-semibold text-white">{item}</h2>
              <p className="mt-2 text-sm leading-7 text-zinc-400">
                Production-focused work that balances technical rigor with clear
                business or research outcomes.
              </p>
            </div>
          </MotionStaggerItem>
        ))}
      </MotionStagger>
    </section>
  );
}
