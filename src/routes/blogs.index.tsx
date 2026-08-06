import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { BlogCard } from "@/components/BlogCard";
import { SearchBar } from "@/components/SearchBar";
import { Reveal } from "@/components/Reveal";
import { blogs, categories } from "@/data/blogs";

export const Route = createFileRoute("/blogs/")({
  head: () => ({
    meta: [
      { title: "Blogs — Essays on Policy & Governance | PolicyLens" },
      {
        name: "description",
        content:
          "Long-form essays by Aanya Monga on public policy, governance, education, society, international relations, environment and technology policy.",
      },
      { property: "og:title", content: "Blogs — PolicyLens" },
      {
        property: "og:description",
        content:
          "Essays on public policy, governance, education, climate adaptation and technology policy.",
      },
    ],
  }),
  component: BlogsPage,
});

function BlogsPage() {
  const [query, setQuery] = useState("");
  const [active, setActive] = useState<string>("All");

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return blogs.filter((b) => {
      const matchesCategory = active === "All" || b.category === active;
      const matchesQuery =
        !q ||
        b.title.toLowerCase().includes(q) ||
        b.description.toLowerCase().includes(q) ||
        b.category.toLowerCase().includes(q);
      return matchesCategory && matchesQuery;
    });
  }, [query, active]);

  return (
    <div className="mx-auto max-w-6xl px-5 py-16 sm:px-8 sm:py-24">
      <Reveal>
        <span className="text-xs font-semibold tracking-[0.16em] text-sage uppercase">
          The writing
        </span>
        <h1 className="mt-4 text-4xl leading-[1.1] text-balance-tight sm:text-5xl">
          Notes, essays and research in progress
        </h1>
        <p className="mt-5 max-w-2xl text-lg leading-relaxed text-muted-foreground">
          Everything I publish lives here — mostly slow pieces that start with a primary document
          and end with a question I can’t answer yet.
        </p>
      </Reveal>

      <Reveal delay={0.08}>
        <div className="mt-12 flex flex-col gap-5">
          <SearchBar value={query} onChange={setQuery} />

          <div className="flex flex-wrap gap-2">
            {["All", ...categories].map((c) => {
              const isActive = active === c;
              return (
                <button
                  key={c}
                  type="button"
                  onClick={() => setActive(c)}
                  className={`rounded-full border px-3.5 py-1.5 text-xs font-medium transition-all duration-300 ${
                    isActive
                      ? "border-sage/50 bg-sage-soft/70 text-sage"
                      : "border-border bg-card text-muted-foreground hover:-translate-y-0.5 hover:border-sage/40 hover:text-foreground"
                  }`}
                >
                  {c}
                </button>
              );
            })}
          </div>
        </div>
      </Reveal>

      <div className="mt-12 columns-1 gap-6 sm:columns-2 lg:columns-3 [&>*]:mb-6">
        <AnimatePresence mode="popLayout">
          {filtered.map((b, i) => (
            <motion.div
              key={b.slug}
              layout
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.97 }}
              transition={{ duration: 0.45, delay: i * 0.05, ease: [0.22, 1, 0.36, 1] }}
              className="break-inside-avoid"
            >
              <BlogCard blog={b} />
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {filtered.length === 0 && (
        <p className="mt-16 text-center text-sm text-muted-foreground">
          No essays match that yet — try a different category.
        </p>
      )}
    </div>
  );
}
