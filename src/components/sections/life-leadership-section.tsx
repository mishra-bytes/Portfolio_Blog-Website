import { ImageCarousel } from "@/components/carousel/image-carousel";
import { MotionReveal } from "@/components/motion/reveal";
import { SectionHeading } from "@/components/ui/section-heading";
import { lifeLeadershipSlides } from "@/data/portfolio";

export function LifeLeadershipSection() {
  return (
    <section className="section-shell rounded-[2rem] px-6 py-12 sm:px-10 lg:px-14">
      <div className="relative z-10 space-y-8 md:space-y-10">
        <MotionReveal className="flex flex-col gap-5 md:gap-6 lg:flex-row lg:items-end lg:justify-between">
          <SectionHeading
            eyebrow="Life & Leadership"
            title="Moments that shaped how I build, lead, and communicate."
            description="A visual snapshot of research, leadership, and engineering work across IEEE NSUT, IMD, and project-driven experimentation."
          />
          <p className="max-w-xl text-sm leading-7 text-zinc-400">
            The carousel stays light and touch-friendly while matching the
            existing dark, technical presentation of the portfolio.
          </p>
        </MotionReveal>
        <MotionReveal>
          <ImageCarousel slides={lifeLeadershipSlides} />
        </MotionReveal>
      </div>
    </section>
  );
}
