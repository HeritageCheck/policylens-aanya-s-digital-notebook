import { animate, useInView } from "motion/react";
import { useEffect, useRef, useState } from "react";

export function StatCard({
  value,
  label,
  suffix = "",
}: {
  value: number;
  label: string;
  suffix?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    if (!inView) return;
    const controls = animate(0, value, {
      duration: 1.4,
      ease: [0.22, 1, 0.36, 1],
      onUpdate: (v) => setDisplay(Math.round(v)),
    });
    return () => controls.stop();
  }, [inView, value]);

  return (
    <div
      ref={ref}
      className="rounded-3xl border border-border/70 bg-card p-6 text-center shadow-soft transition-all duration-500 hover:-translate-y-1 hover:border-sage/40 hover:shadow-lift"
    >
      <p className="font-display text-4xl text-sage">
        {display}
        {suffix}
      </p>
      <p className="mt-2 text-xs font-semibold tracking-[0.12em] text-muted-foreground uppercase">
        {label}
      </p>
    </div>
  );
}
