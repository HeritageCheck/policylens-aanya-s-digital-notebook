import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import {
  ArrowLeft,
  ArrowRight,
  Clock,
  Link2,
  Linkedin,
  Twitter,
  Calendar,
} from "lucide-react";
import { CategoryBadge } from "@/components/CategoryBadge";
import { ReadingProgress } from "@/components/ReadingProgress";
import { Reveal } from "@/components/Reveal";
import { formatDate, getAdjacent, getBlog } from "@/data/blogs";

export const Route = createFileRoute("/blogs/$slug")({
  loader: ({ params }) => {
    const blog = getBlog(params.slug);
    if (!blog) throw notFound();
    return { blog };
  },
  head: ({ loaderData }) => {
    if (!loaderData) {
      return {
        meta: [{ title: "Essay not found — PolicyLens" }, { name: "robots", content: "noindex" }],
      };
    }
    const { blog } = loaderData;
    return {
      meta: [
        { title: `${blog.title} — PolicyLens` },
        { name: "description", content: blog.description },
        { property: "og:title", content: blog.title },
        { property: "og:description", content: blog.description },
        { property: "og:type", content: "article" },
      ],
    };
  },
  component: BlogArticle,
});

function BlogArticle() {
  const { blog } = Route.useLoaderData();
  const { prev, next } = getAdjacent(blog.slug);

  return (
    <article className="pb-8">
      <ReadingProgress />

      <div className="mx-auto max-w-4xl px-5 pt-12 sm:px-8">
        <Link
          to="/blogs"
          className="group inline-flex items-center gap-1.5 text-sm text-muted-foreground transition-colors hover:text-foreground"
        >
          <ArrowLeft className="size-4 transition-transform duration-300 group-hover:-translate-x-0.5" />
          All writing
        </Link>

        <Reveal>
          <div className="mt-8">
            <CategoryBadge category={blog.category} />
            <h1 className="mt-5 text-3xl leading-[1.12] text-balance-tight sm:text-5xl">
              {blog.title}
            </h1>

            <div className="mt-7 flex flex-wrap items-center gap-x-5 gap-y-3 text-sm text-muted-foreground">
              <span className="flex items-center gap-2">
                <span className="flex size-8 items-center justify-center rounded-full bg-sage-soft/70 font-display text-xs text-sage">
                  AM
                </span>
                Aanya Monga
              </span>
              <span className="inline-flex items-center gap-1.5">
                <Calendar className="size-4" strokeWidth={1.75} />
                {formatDate(blog.date)}
              </span>
              <span className="inline-flex items-center gap-1.5">
                <Clock className="size-4" strokeWidth={1.75} />
                {blog.readingTime}
              </span>
            </div>
          </div>
        </Reveal>
      </div>

      <Reveal delay={0.06}>
        <div className="mx-auto mt-10 max-w-5xl px-5 sm:px-8">
          <div className="aspect-16/9 overflow-hidden rounded-[2rem] border border-border/60 shadow-soft">
            <img
              src={blog.cover}
              alt=""
              width={1024}
              height={576}
              className="size-full object-cover"
            />
          </div>
        </div>
      </Reveal>

      <div className="mx-auto mt-14 grid max-w-6xl gap-12 px-5 sm:px-8 lg:grid-cols-[minmax(0,1fr)_16rem]">
        <div className="prose-article max-w-2xl lg:mx-auto">
          <p className="font-display text-xl leading-relaxed text-foreground">{blog.lede}</p>

          {blog.sections.map((section) => (
            <section key={section.id} id={section.id} className="scroll-mt-28">
              <h2>{section.heading}</h2>
              {section.blocks.map((block, i) => {
                if (block.type === "p") return <p key={i}>{block.text}</p>;
                if (block.type === "quote") return <blockquote key={i}>{block.text}</blockquote>;
                return (
                  <ul key={i}>
                    {block.items.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                );
              })}
            </section>
          ))}

          <div className="mt-14 flex flex-wrap items-center gap-3 border-t border-border/70 pt-8">
            <span className="text-sm text-muted-foreground">Share this essay</span>
            {[Twitter, Linkedin, Link2].map((Icon, i) => (
              <button
                key={i}
                type="button"
                aria-label="Share"
                className="flex size-10 items-center justify-center rounded-xl border border-border bg-card text-muted-foreground transition-all duration-300 hover:-translate-y-0.5 hover:text-sage hover:shadow-soft"
              >
                <Icon className="size-4" strokeWidth={1.75} />
              </button>
            ))}
          </div>
        </div>

        <aside className="hidden lg:block">
          <div className="sticky top-28 rounded-3xl border border-border/70 bg-card p-6 shadow-soft">
            <h2 className="text-xs font-semibold tracking-[0.14em] text-muted-foreground uppercase">
              On this page
            </h2>
            <nav className="mt-4 flex flex-col gap-3 text-sm">
              {blog.sections.map((s) => (
                <a
                  key={s.id}
                  href={`#${s.id}`}
                  className="border-l-2 border-border pl-3 leading-snug text-muted-foreground transition-colors hover:border-sage hover:text-foreground"
                >
                  {s.heading}
                </a>
              ))}
            </nav>
          </div>
        </aside>
      </div>

      <div className="mx-auto mt-20 grid max-w-4xl gap-4 px-5 sm:px-8 sm:grid-cols-2">
        {prev ? (
          <Link
            to="/blogs/$slug"
            params={{ slug: prev.slug }}
            className="group rounded-3xl border border-border/70 bg-card p-6 shadow-soft transition-all duration-400 hover:-translate-y-1 hover:border-sage/40 hover:shadow-lift"
          >
            <span className="inline-flex items-center gap-1.5 text-xs tracking-[0.12em] text-muted-foreground uppercase">
              <ArrowLeft className="size-3.5" /> Previous
            </span>
            <p className="mt-2.5 font-display text-lg leading-snug">{prev.title}</p>
          </Link>
        ) : (
          <span />
        )}

        {next && (
          <Link
            to="/blogs/$slug"
            params={{ slug: next.slug }}
            className="group rounded-3xl border border-border/70 bg-card p-6 text-right shadow-soft transition-all duration-400 hover:-translate-y-1 hover:border-sage/40 hover:shadow-lift"
          >
            <span className="inline-flex items-center gap-1.5 text-xs tracking-[0.12em] text-muted-foreground uppercase">
              Next <ArrowRight className="size-3.5" />
            </span>
            <p className="mt-2.5 font-display text-lg leading-snug">{next.title}</p>
          </Link>
        )}
      </div>
    </article>
  );
}
