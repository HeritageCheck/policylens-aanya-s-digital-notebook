import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { ArrowLeft, Apple, PlayCircle } from "lucide-react";
import { Reveal, Stagger, StaggerItem } from "@/components/Reveal";
import { getProject } from "@/data/projects";

export const Route = createFileRoute("/projects/$slug")({
  loader: ({ params }) => {
    const project = getProject(params.slug);
    if (!project) throw notFound();
    return { project };
  },
  head: ({ loaderData }) => {
    if (!loaderData) {
      return {
        meta: [{ title: "Project not found — The 3rd Eye Economist" }, { name: "robots", content: "noindex" }],
      };
    }
    const { project } = loaderData;
    return {
      meta: [
        { title: `${project.title} — The 3rd Eye Economist` },
        { name: "description", content: project.description },
        { property: "og:title", content: project.title },
        { property: "og:description", content: project.description },
      ],
    };
  },
  component: ProjectDetail,
});

function ProjectDetail() {
  const { project } = Route.useLoaderData();
  const hasStoreLinks = Boolean(project.appStoreUrl || project.playStoreUrl);
  const hasGallery = Boolean(project.gallery && project.gallery.length > 0);

  return (
    <div className="pb-8">
      <section className="relative overflow-hidden">
        <div className="pointer-events-none absolute -top-32 -left-24 size-[26rem] rounded-full bg-sage-soft/45 blur-[110px]" />
        <div className="pointer-events-none absolute top-24 -right-20 size-[22rem] rounded-full bg-beige/70 blur-[100px]" />

        <div className="relative mx-auto max-w-4xl px-5 pt-12 sm:px-8">
          <Link
            to="/projects"
            className="group inline-flex items-center gap-1.5 text-sm text-muted-foreground transition-colors hover:text-foreground"
          >
            <ArrowLeft className="size-4 transition-transform duration-300 group-hover:-translate-x-0.5" />
            All projects
          </Link>

          <Reveal>
            <div className="mt-8">
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
              <h1 className="mt-5 text-3xl leading-[1.12] text-balance-tight sm:text-5xl">
                {project.title}
              </h1>
              <p className="mt-5 max-w-2xl text-lg leading-relaxed text-muted-foreground">
                {project.description}
              </p>

              <div className="mt-7 flex flex-wrap gap-2">
                {project.technologies.map((t) => (
                  <span
                    key={t}
                    className="rounded-lg border border-border/70 bg-card px-2.5 py-1 text-xs text-muted-foreground"
                  >
                    {t}
                  </span>
                ))}
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {project.thumbnail && (
        <Reveal delay={0.06}>
          <div className="mx-auto mt-10 max-w-5xl px-5 sm:px-8">
            <div className="relative aspect-16/9 overflow-hidden rounded-[2rem] border border-border/60 bg-secondary/40 grain-bg shadow-soft">
              <img
                src={project.thumbnail}
                alt={project.title}
                width={1024}
                height={576}
                className="size-full object-cover"
              />
            </div>
          </div>
        </Reveal>
      )}

      <div className="mx-auto mt-14 max-w-4xl px-5 sm:px-8">
        <Reveal>
          <div className="rounded-3xl border border-border/70 bg-card p-6 shadow-soft sm:p-8">
            <h2 className="text-xs font-semibold tracking-[0.14em] text-muted-foreground uppercase">
              Get the app
            </h2>

            {hasStoreLinks ? (
              <div className="mt-5 flex flex-wrap gap-3">
                {project.appStoreUrl && (
                  <a
                    href={project.appStoreUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="group inline-flex items-center gap-2 rounded-2xl bg-primary px-5 py-3 text-sm font-medium text-primary-foreground shadow-soft transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lift"
                  >
                    <Apple className="size-4" strokeWidth={1.9} />
                    Download on the App Store
                  </a>
                )}
                {project.playStoreUrl && (
                  <a
                    href={project.playStoreUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="group inline-flex items-center gap-2 rounded-2xl border border-border bg-card px-5 py-3 text-sm font-medium text-foreground transition-all duration-300 hover:-translate-y-0.5 hover:border-sage/50 hover:shadow-soft"
                  >
                    <PlayCircle className="size-4" strokeWidth={1.9} />
                    Get it on Google Play
                  </a>
                )}
              </div>
            ) : (
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                Not on an app store yet — this is still in development. Check back for a link once
                it ships.
              </p>
            )}
          </div>
        </Reveal>
      </div>

      {hasGallery && (
        <div className="mx-auto mt-14 max-w-5xl px-5 sm:px-8">
          <Reveal>
            <h2 className="text-xs font-semibold tracking-[0.14em] text-muted-foreground uppercase">
              Screenshots
            </h2>
          </Reveal>
          <Stagger className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {project.gallery?.map((src, i) => (
              <StaggerItem key={src}>
                <div className="aspect-9/16 overflow-hidden rounded-2xl border border-border/60 shadow-soft">
                  <img
                    src={src}
                    alt={`${project.title} screenshot ${i + 1}`}
                    loading="lazy"
                    className="size-full object-cover"
                  />
                </div>
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      )}
    </div>
  );
}
