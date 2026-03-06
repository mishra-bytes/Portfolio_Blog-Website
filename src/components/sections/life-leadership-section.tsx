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
            title="Snapshots from IEEE leadership, IMD work, and forecasting research."
            description="This gallery highlights IEEE NSUT Student Branch leadership, the IMD internship, StockVision development, and EV battery SoC forecasting research."
          />
          <p className="max-w-xl text-sm leading-7 text-zinc-400">
            The captions align with current resume milestones across leadership,
            internships, and forecasting projects.
          </p>
        </MotionReveal>
        <MotionReveal>
          <ImageCarousel slides={lifeLeadershipSlides} />
        </MotionReveal>
      </div>
    </section>
  );
}
