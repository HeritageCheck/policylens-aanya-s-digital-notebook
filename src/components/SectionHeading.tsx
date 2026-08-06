import type { ReactNode } from "react";
import { Reveal } from "./Reveal";

export function SectionHeading({
  eyebrow,
  title,
  description,
  align = "left",
  action,
}: {
  eyebrow?: string;
  title: string;
  description?: string;
  align?: "left" | "center";
  action?: ReactNode;
}) {
  const centered = align === "center";
  return (
    <Reveal>
      <div
        className={`flex flex-col gap-5 ${
          centered ? "items-center text-center" : "sm:flex-row sm:items-end sm:justify-between"
        }`}
      >
        <div className={centered ? "max-w-2xl" : "max-w-2xl"}>
          {eyebrow && (
            <span className="inline-flex items-center gap-2 text-xs font-semibold tracking-[0.16em] text-sage uppercase">
              <span className="h-px w-6 bg-sage/50" />
              {eyebrow}
            </span>
          )}
          <h2 className="mt-3 text-3xl leading-[1.15] text-balance-tight sm:text-4xl">{title}</h2>
          {description && (
            <p className="mt-3 text-[15px] leading-relaxed text-muted-foreground">{description}</p>
          )}
        </div>
        {action && <div className="shrink-0">{action}</div>}
      </div>
    </Reveal>
  );
}
