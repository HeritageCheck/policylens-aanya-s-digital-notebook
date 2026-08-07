import { Link } from "@tanstack/react-router";
import { ArrowUpRight } from "lucide-react";
import type { Project } from "@/data/projects";

export function ProjectCard({ project }: { project: Project }) {
  const planned = project.status === "Planned";
  return (
    <article
      className={`group flex h-full flex-col overflow-hidden rounded-3xl border bg-card transition-all duration-500 hover:-translate-y-1.5 hover:shadow-lift ${
        planned
          ? "border-dashed border-border"
          : "border-border/70 shadow-soft hover:border-sage/40"
      }`}
    >
      {project.thumbnail ? (
        <div className="aspect-16/9 overflow-hidden">
          <img
            src={project.thumbnail}
            alt=""
            loading="lazy"
            width={1024}
            height={576}
            className="size-full object-cover transition-transform duration-700 group-hover:scale-105"
          />
        </div>
      ) : (
        <div className="aspect-16/9 grain-bg bg-secondary/60" />
      )}

      <div className="flex flex-1 flex-col p-6">
        <div className="flex items-center gap-2">
          <span className="inline-flex items-center rounded-full bg-secondary px-2.5 py-1 text-[11px] font-semibold tracking-[0.08em] text-secondary-foreground uppercase">
            {project.status}
          </span>
          {project.highlight && (
            <span className="inline-flex items-center rounded-full bg-sage-soft/70 px-2.5 py-1 text-[11px] font-semibold tracking-[0.08em] text-sage uppercase">
              Featured
            </span>
          )}
        </div>

        <h3 className="mt-4 text-xl leading-snug">{project.title}</h3>
        <p className="mt-2.5 text-sm leading-relaxed text-muted-foreground">
          {project.description}
        </p>

        <div className="mt-5 flex flex-wrap gap-2">
          {project.technologies.map((t) => (
            <span
              key={t}
              className="rounded-lg border border-border/70 bg-background px-2.5 py-1 text-xs text-muted-foreground"
            >
              {t}
            </span>
          ))}
        </div>

        {planned ? (
          <span className="mt-6 inline-flex w-fit items-center gap-1.5 text-sm font-medium text-sage opacity-45">
            Coming soon
          </span>
        ) : (
          <Link
            to="/projects/$slug"
            params={{ slug: project.slug }}
            className="group mt-6 inline-flex w-fit items-center gap-1.5 text-sm font-medium text-sage"
          >
            Learn more
            <ArrowUpRight className="size-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </Link>
        )}
      </div>
    </article>
  );
}
