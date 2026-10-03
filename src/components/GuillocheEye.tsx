import { useEffect, useRef } from "react";
import type { GuillocheParams } from "@/lib/guilloche";
import { hypotrochoidPath } from "@/lib/guilloche";

const LAVENDER = "#C4A1D8";
const GOLD = "#D4AF37";
const BURGUNDY = "#800020";

// The three engraved layers are each derived from one shared base (R, r, d),
// offset slightly in ratio and phase, so all three morph in lockstep but
// interleave the way overlapping guilloche passes do on a banknote.
const LAYERS = [
  { color: LAVENDER, rMul: 1, dMul: 1, phase: 0, width: 0.6, opacity: 0.85 },
  { color: GOLD, rMul: 0.94, dMul: 1.1, phase: Math.PI / 6, width: 0.55, opacity: 0.75 },
  { color: BURGUNDY, rMul: 1.07, dMul: 0.88, phase: -Math.PI / 5, width: 0.7, opacity: 0.8 },
] as const;

const MORPH_MS = 700;
const EASE = (t: number) => 1 - Math.pow(1 - t, 3); // ease-out cubic

function ease(a: number, b: number, t: number) {
  return a + (b - a) * EASE(t);
}

export function GuillocheEye({
  target,
  exploding,
  size,
  squashX = 1.55,
}: {
  target: GuillocheParams;
  exploding: boolean;
  size: number;
  squashX?: number;
}) {
  const pathRefs = useRef<(SVGPathElement | null)[]>([]);
  const liveRef = useRef<GuillocheParams>(target);
  const rafRef = useRef<number>();

  const render = (params: GuillocheParams) => {
    LAYERS.forEach((layer, i) => {
      const el = pathRefs.current[i];
      if (!el) return;
      const layerParams: GuillocheParams = {
        R: params.R,
        r: Math.max(1, params.r * layer.rMul),
        d: params.d * layer.dMul,
      };
      el.setAttribute(
        "d",
        hypotrochoidPath(layerParams, { revolutions: 10, squashX, phase: layer.phase }),
      );
    });
  };

  // Morph smoothly from wherever the eye currently is toward a new target
  // whenever the active post (or explode state) changes.
  useEffect(() => {
    const from = liveRef.current;
    const explodedTarget: GuillocheParams = exploding
      ? { R: target.R, r: Math.max(2, target.r * 0.35), d: target.d * 2.8 }
      : target;

    const start = performance.now();
    if (rafRef.current) cancelAnimationFrame(rafRef.current);

    const tick = (now: number) => {
      const t = Math.min(1, (now - start) / MORPH_MS);
      const next: GuillocheParams = {
        R: ease(from.R, explodedTarget.R, t),
        r: ease(from.r, explodedTarget.r, t),
        d: ease(from.d, explodedTarget.d, t),
      };
      liveRef.current = next;
      render(next);
      if (t < 1) rafRef.current = requestAnimationFrame(tick);
    };
    rafRef.current = requestAnimationFrame(tick);

    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [target.R, target.r, target.d, exploding]);

  return (
    <svg
      viewBox="-220 -150 440 300"
      width={size}
      height={size}
      className="pointer-events-none absolute top-1/2 left-1/2"
      style={{ transform: "translate(-50%, -50%)", overflow: "visible" }}
      aria-hidden="true"
    >
      <g>
        {LAYERS.map((layer, i) => (
          <path
            key={layer.color}
            ref={(el) => {
              pathRefs.current[i] = el;
            }}
            fill="none"
            stroke={layer.color}
            strokeWidth={layer.width}
            strokeOpacity={layer.opacity}
            strokeLinejoin="round"
          />
        ))}
      </g>
    </svg>
  );
}
