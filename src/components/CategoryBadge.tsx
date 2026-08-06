export function CategoryBadge({
  category,
  tone = "solid",
}: {
  category: string;
  tone?: "solid" | "glass";
}) {
  return (
    <span
      className={
        tone === "glass"
          ? "inline-flex items-center rounded-full border border-border/60 glass-panel px-3 py-1 text-[11px] font-semibold tracking-[0.1em] text-foreground uppercase"
          : "inline-flex items-center rounded-full bg-sage-soft/70 px-3 py-1 text-[11px] font-semibold tracking-[0.1em] text-sage uppercase"
      }
    >
      {category}
    </span>
  );
}
