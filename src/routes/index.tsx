import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import { Hero } from "@/components/Hero";
import { SectionHeading } from "@/components/SectionHeading";
import { BlogCard } from "@/components/BlogCard";
import { ProjectCard } from "@/components/ProjectCard";
import { StatCard } from "@/components/StatCard";
import { Reveal, Stagger, StaggerItem } from "@/components/Reveal";
import { getFeaturedPosts, getPublishedPosts } from "@/lib/posts";
import { projects } from "@/data/projects";
import { getStats, interests } from "@/data/about";

export const Route = createFileRoute("/")({
  loader: async () => {
    const [featured, allPosts] = await Promise.all([getFeaturedPosts(), getPublishedPosts()]);
    return { featured, blogsCount: allPosts.length };
  },
  head: () => ({
    meta: [
      { title: "The 3rd Eye Economist — Aanya Monga · Policy Writing & Research" },
      {
        name: "description",
        content:
          "The 3rd Eye Economist is the portfolio of Aanya Monga: essays, research and projects on public policy, governance, education and climate adaptation.",
      },
      { property: "og:title", content: "The 3rd Eye Economist — Aanya Monga" },
      {
        property: "og:description",
        content:
          "Essays, research and projects on public policy, governance and social impact by Aanya Monga.",
      },
    ],
  }),
  component: Index,
});

function Index() {
  const { featured, blogsCount } = Route.useLoaderData();
  const stats = getStats(blogsCount);

  return (
    <>
      <Hero />

      <section className="mx-auto max-w-6xl px-5 sm:px-8">
        <Stagger className="grid grid-cols-3 gap-4">
          {stats.map((s) => (
            <StaggerItem key={s.label}>
              <StatCard value={s.value} label={s.label} suffix={s.suffix} />
            </StaggerItem>
          ))}
        </Stagger>
      </section>

      <section className="mx-auto mt-28 max-w-6xl px-5 sm:px-8">
        <SectionHeading
          eyebrow="Featured writing"
          title="Essays from the notebook"
          description="Long-form pieces on how policy actually behaves once it leaves the page."
          action={
            <Link
              to="/blogs"
              className="group inline-flex items-center gap-1.5 rounded-2xl border border-border bg-card px-4 py-2.5 text-sm font-medium transition-all duration-300 hover:-translate-y-0.5 hover:border-sage/50 hover:shadow-soft"
            >
              All blogs
              <ArrowRight className="size-4 transition-transform duration-300 group-hover:translate-x-0.5" />
            </Link>
          }
        />

        <Stagger className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {featured.map((b) => (
            <StaggerItem key={b.id} className="h-full">
              <BlogCard blog={b} />
            </StaggerItem>
          ))}
        </Stagger>
      </section>

      <section className="mx-auto mt-28 max-w-6xl px-5 sm:px-8">
        <Reveal>
          <div className="grid gap-10 rounded-[2rem] border border-border/70 bg-secondary/40 p-8 sm:p-12 lg:grid-cols-[1fr_1fr]">
            <div>
              <span className="text-xs font-semibold tracking-[0.16em] text-sage uppercase">
                A little about me
              </span>
              <h2 className="mt-3 text-3xl leading-tight text-balance-tight">
                I read primary documents, then try to explain them plainly.
              </h2>
              <p className="mt-4 text-[15px] leading-relaxed text-muted-foreground">
                The 3rd Eye Economist started as a reading log. It is now where I keep my
                essays, research notes, and the projects that grew out of them — mostly on
                welfare delivery, urban governance, and how the state uses data.
              </p>
              <Link
                to="/about"
                className="group mt-7 inline-flex items-center gap-1.5 text-sm font-medium text-sage"
              >
                More about my journey
                <ArrowRight className="size-4 transition-transform duration-300 group-hover:translate-x-0.5" />
              </Link>
            </div>

            <div className="flex flex-wrap content-start gap-2.5">
              {interests.map((i) => (
                <span
                  key={i}
                  className="rounded-2xl border border-border/70 bg-card px-3.5 py-2 text-sm text-foreground/80 shadow-soft"
                >
                  {i}
                </span>
              ))}
            </div>
          </div>
        </Reveal>
      </section>

      <section className="mx-auto mt-28 max-w-6xl px-5 sm:px-8">
        <SectionHeading
          eyebrow="Selected work"
          title="Projects"
          description="Small tools and research artefacts built alongside the writing."
        />
        <Stagger className="mt-10 grid gap-6 md:grid-cols-2">
          {projects.slice(0, 2).map((p) => (
            <StaggerItem key={p.title} className="h-full">
              <ProjectCard project={p} />
            </StaggerItem>
          ))}
        </Stagger>
      </section>
    </>
  );
}
