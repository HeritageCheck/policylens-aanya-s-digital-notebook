import { createFileRoute } from "@tanstack/react-router";
import { Github, Linkedin, Mail, MapPin, ArrowUpRight } from "lucide-react";
import { Reveal, Stagger, StaggerItem } from "@/components/Reveal";
import { contactLinks } from "@/data/about";

const icons = { mail: Mail, linkedin: Linkedin, github: Github, map: MapPin };

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact Aanya Monga — PolicyLens" },
      {
        name: "description",
        content:
          "Get in touch with Aanya Monga by email, LinkedIn or GitHub for research collaborations, writing and policy conversations.",
      },
      { property: "og:title", content: "Contact — PolicyLens" },
      {
        property: "og:description",
        content: "Reach Aanya Monga by email, LinkedIn or GitHub.",
      },
    ],
  }),
  component: ContactPage,
});

function ContactPage() {
  return (
    <div className="mx-auto max-w-4xl px-5 py-16 sm:px-8 sm:py-24">
      <Reveal>
        <span className="text-xs font-semibold tracking-[0.16em] text-sage uppercase">Contact</span>
        <h1 className="mt-4 text-4xl leading-[1.1] text-balance-tight sm:text-5xl">
          Always glad to talk about policy
        </h1>
        <p className="mt-5 max-w-2xl text-lg leading-relaxed text-muted-foreground">
          Whether it’s a research collaboration, a document you think I should read, or a
          disagreement with something I’ve written — write to me.
        </p>
      </Reveal>

      <Stagger className="mt-14 grid grid-cols-1 gap-5 sm:grid-cols-2">
        {contactLinks.map((c) => {
          const Icon = icons[c.icon];
          const inner = (
            <div className="group flex h-full items-start gap-4 rounded-3xl border border-border/70 bg-card p-6 shadow-soft transition-all duration-500 hover:-translate-y-1 hover:border-sage/40 hover:shadow-lift">
              <span className="flex size-11 shrink-0 items-center justify-center rounded-2xl bg-sage-soft/70 text-sage transition-transform duration-500 group-hover:-rotate-6">
                <Icon className="size-5" strokeWidth={1.75} />
              </span>
              <div className="min-w-0">
                <p className="text-xs font-semibold tracking-[0.12em] text-muted-foreground uppercase">
                  {c.label}
                </p>
                <p className="mt-1.5 truncate text-base text-foreground">{c.value}</p>
              </div>
              {c.href && (
                <ArrowUpRight className="ml-auto size-4 shrink-0 text-muted-foreground transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-sage" />
              )}
            </div>
          );

          return (
            <StaggerItem key={c.label} className="h-full">
              {c.href ? (
                <a
                  href={c.href}
                  target={c.href.startsWith("http") ? "_blank" : undefined}
                  rel="noreferrer"
                  className="block h-full"
                >
                  {inner}
                </a>
              ) : (
                inner
              )}
            </StaggerItem>
          );
        })}
      </Stagger>

      <Reveal delay={0.1}>
        <p className="mt-16 text-center font-display text-lg text-foreground/70 italic">
          “Research begins with curiosity.”
        </p>
      </Reveal>
    </div>
  );
}
