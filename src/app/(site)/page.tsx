import { AboutSection } from "@/components/sections/about-section";
import { BlogSection } from "@/components/sections/blog-section";
import { HeroSection } from "@/components/sections/hero-section";
import { LifeLeadershipSection } from "@/components/sections/life-leadership-section";
import { ProjectsSection } from "@/components/sections/projects-section";
import { ResumeSection } from "@/components/sections/resume-section";
import { getAllPosts } from "@/lib/posts";

export default function Home() {
  const posts = getAllPosts().slice(0, 2);

  return (
    <main className="mx-auto flex w-full max-w-7xl flex-col gap-6 px-4 pb-16 pt-6 md:gap-8 md:px-8 lg:px-8">
      <HeroSection />
      <AboutSection />
      <LifeLeadershipSection />
      <ProjectsSection />
      <BlogSection posts={posts} />
      <ResumeSection />
    </main>
  );
}
