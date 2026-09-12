import { createFileRoute } from "@tanstack/react-router";
import { ProjectCard } from "@/components/ProjectCard";
import { Reveal, Stagger, StaggerItem } from "@/components/Reveal";
import { projects } from "@/data/projects";

export const Route = createFileRoute("/projects/")({
  head: () => ({
    meta: [
      { title: "Projects — HeritageCheck & More | The Third Eye Economist" },
      {
        name: "description",
        content:
          "Research tools and policy projects by Aanya Monga, including HeritageCheck, a citizen-facing condition index for protected heritage sites.",
      },
      { property: "og:title", content: "Projects — The Third Eye Economist" },
      {
        property: "og:description",
        content: "Research tools and policy projects by Aanya Monga, including HeritageCheck.",
      },
    ],
  }),
  component: ProjectsPage,
});

function ProjectsPage() {
  return (
    <div className="mx-auto max-w-6xl px-5 py-16 sm:px-8 sm:py-24">
      <Reveal>
        <span className="text-xs font-semibold tracking-[0.16em] text-sage uppercase">
          Projects
        </span>
        <h1 className="mt-4 text-4xl leading-[1.1] text-balance-tight sm:text-5xl">
          Things I built to answer my own questions
        </h1>
        <p className="mt-5 max-w-2xl text-lg leading-relaxed text-muted-foreground">
          Each of these began as a research problem that a document alone couldn’t settle. Some are
          live, some are half-finished, and a few are still just placeholders.
        </p>
      </Reveal>

      <Stagger className="mt-14 grid gap-6 md:grid-cols-2">
        {projects.map((p) => (
          <StaggerItem key={p.title} className="h-full">
            <ProjectCard project={p} />
          </StaggerItem>
        ))}
      </Stagger>
    </div>
  );
}
