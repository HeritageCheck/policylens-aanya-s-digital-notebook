import type { TimelineItem } from "@/data/about";
import { Stagger, StaggerItem } from "./Reveal";

export function Timeline({ items }: { items: TimelineItem[] }) {
  return (
    <Stagger className="relative pl-6 sm:pl-8">
      <span className="absolute top-2 bottom-2 left-[7px] w-px bg-border sm:left-[11px]" />
      {items.map((item) => (
        <StaggerItem key={item.title} className="relative pb-6 last:pb-0">
          <span className="absolute top-7 -left-6 flex size-3.5 items-center justify-center rounded-full border-2 border-sage bg-background sm:-left-8" />
          <div className="rounded-3xl border border-border/70 bg-card p-6 shadow-soft transition-all duration-400 hover:-translate-y-0.5 hover:border-sage/40 hover:shadow-lift">
            <span className="text-xs font-semibold tracking-[0.12em] text-sage uppercase">
              {item.period}
            </span>
            <h3 className="mt-2 text-lg leading-snug">{item.title}</h3>
            {item.place && (
              <p className="mt-1 text-sm text-foreground/70">{item.place}</p>
            )}
            <p className="mt-2.5 text-sm leading-relaxed text-muted-foreground">{item.detail}</p>
          </div>
        </StaggerItem>
      ))}
    </Stagger>
  );
}
