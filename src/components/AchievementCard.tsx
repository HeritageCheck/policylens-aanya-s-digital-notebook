import { Award } from "lucide-react";

export function AchievementCard({
  title,
  year,
  detail,
}: {
  title: string;
  year: string;
  detail: string;
}) {
  return (
    <div className="group flex h-full gap-4 rounded-3xl border border-border/70 bg-card p-6 shadow-soft transition-all duration-500 hover:-translate-y-1 hover:border-sage/40 hover:shadow-lift">
      <span className="flex size-11 shrink-0 items-center justify-center rounded-2xl bg-sage-soft/70 text-sage transition-transform duration-500 group-hover:-rotate-6">
        <Award className="size-5" strokeWidth={1.75} />
      </span>
      <div>
        <div className="flex flex-wrap items-baseline gap-2">
          <h3 className="text-base leading-snug">{title}</h3>
          <span className="text-xs text-muted-foreground">{year}</span>
        </div>
        <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">{detail}</p>
      </div>
    </div>
  );
}
