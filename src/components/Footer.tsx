import { Link } from "@tanstack/react-router";
import { Github, Linkedin, Mail, Glasses } from "lucide-react";

export function Footer() {
  return (
    <footer className="mt-28 border-t border-border/70 bg-secondary/40">
      <div className="mx-auto grid max-w-6xl gap-12 px-5 py-16 sm:px-8 md:grid-cols-[1.4fr_1fr_1fr]">
        <div>
          <div className="flex items-center gap-2.5">
            <span className="flex size-9 items-center justify-center rounded-xl bg-sage-soft text-sage">
              <Glasses className="size-4.5" strokeWidth={1.75} />
            </span>
            <span className="font-display text-lg">PolicyLens</span>
          </div>
          <p className="mt-4 max-w-sm text-sm leading-relaxed text-muted-foreground">
            Writing, research, and projects on public policy, governance, and social impact by
            Aanya Monga.
          </p>
          <p className="mt-6 font-display text-base text-foreground/80 italic">
            “Research begins with curiosity.”
          </p>
        </div>

        <div>
          <h3 className="text-xs font-semibold tracking-[0.14em] text-muted-foreground uppercase">
            Quick links
          </h3>
          <ul className="mt-4 space-y-2.5 text-sm">
            {[
              { to: "/", label: "Home" },
              { to: "/about", label: "About" },
              { to: "/blogs", label: "Blogs" },
              { to: "/projects", label: "Projects" },
              { to: "/contact", label: "Contact" },
            ].map((l) => (
              <li key={l.to}>
                <Link
                  to={l.to}
                  className="text-muted-foreground transition-colors hover:text-foreground"
                >
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="text-xs font-semibold tracking-[0.14em] text-muted-foreground uppercase">
            Elsewhere
          </h3>
          <div className="mt-4 flex gap-2.5">
            {[
              { href: "mailto:aanya.monga@policylens.in", Icon: Mail, label: "Email" },
              { href: "https://linkedin.com", Icon: Linkedin, label: "LinkedIn" },
              { href: "https://github.com", Icon: Github, label: "GitHub" },
            ].map(({ href, Icon, label }) => (
              <a
                key={label}
                href={href}
                aria-label={label}
                target="_blank"
                rel="noreferrer"
                className="flex size-10 items-center justify-center rounded-xl border border-border bg-card text-muted-foreground transition-all duration-300 hover:-translate-y-0.5 hover:text-sage hover:shadow-soft"
              >
                <Icon className="size-4.5" strokeWidth={1.75} />
              </a>
            ))}
          </div>
        </div>
      </div>

      <div className="border-t border-border/70 px-5 py-6 text-center text-xs text-muted-foreground sm:px-8">
        © 2026 Aanya Monga · PolicyLens
      </div>
    </footer>
  );
}
