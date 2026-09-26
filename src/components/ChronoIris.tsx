import { useEffect, useMemo, useRef, useState } from "react";
import type { PointerEvent as ReactPointerEvent, WheelEvent as ReactWheelEvent } from "react";
import { useNavigate } from "@tanstack/react-router";
import { AnimatePresence, motion } from "motion/react";
import type { Post } from "@/lib/posts";
import { guillocheParamsForPost } from "@/lib/guilloche";
import { GuillocheEye } from "@/components/GuillocheEye";

// Chrono-Iris dial — a self-contained, art-directed palette distinct from the
// rest of the site's light theme, per the Guilloche Chrono-Iris spec.
const OBSIDIAN = "#0A0512";
const LAVENDER = "#C4A1D8";
const GOLD = "#D4AF37";
const BURGUNDY = "#800020";

const WHEEL_SENSITIVITY = 0.32;
const SNAP_IDLE_MS = 160;
const EXPLODE_MS = 700;
const MAX_ITEMS = 12;

/** Shortest signed delta (in degrees) to rotate `from` onto `to`, in (-180, 180]. */
function angleDiff(from: number, to: number) {
  let d = (to - from) % 360;
  if (d > 180) d -= 360;
  if (d < -180) d += 360;
  return d;
}

function currentAngle(index: number, rotation: number, step: number) {
  return -90 + index * step + rotation;
}

export function ChronoIris({ posts }: { posts: Post[] }) {
  const navigate = useNavigate();
  // Newest first (12 o'clock), older posts trail clockwise. Capped so titles stay legible.
  const items = useMemo(() => posts.slice(0, MAX_ITEMS), [posts]);
  const count = items.length;
  const step = count > 0 ? 360 / count : 0;

  const [rotation, setRotation] = useState(0);
  const [interacting, setInteracting] = useState(false);
  const [exploding, setExploding] = useState(false);
  const [size, setSize] = useState(480);

  const dialRef = useRef<HTMLDivElement>(null);
  const snapTimeout = useRef<ReturnType<typeof setTimeout>>();
  const dragOrigin = useRef<{ startAngle: number; startRotation: number } | null>(null);

  useEffect(() => {
    const el = dialRef.current;
    if (!el) return;
    const measure = () => setSize(Math.min(el.clientWidth, 520));
    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  useEffect(() => () => clearTimeout(snapTimeout.current), []);

  const radius = size / 2 - 48;
  const center = size / 2;

  const activeIndex = useMemo(() => {
    if (count === 0) return -1;
    let best = 0;
    let bestAbs = Infinity;
    for (let i = 0; i < count; i++) {
      const abs = Math.abs(angleDiff(currentAngle(i, rotation, step), -90));
      if (abs < bestAbs) {
        bestAbs = abs;
        best = i;
      }
    }
    return best;
  }, [rotation, count, step]);

  const snapToNearest = () => {
    setRotation((r) => {
      let bestAbs = Infinity;
      let bestDelta = 0;
      for (let i = 0; i < count; i++) {
        const d = angleDiff(currentAngle(i, r, step), -90);
        if (Math.abs(d) < bestAbs) {
          bestAbs = Math.abs(d);
          bestDelta = d;
        }
      }
      return r + bestDelta;
    });
    setInteracting(false);
  };

  const handleWheel = (e: ReactWheelEvent<HTMLDivElement>) => {
    if (count === 0 || exploding) return;
    e.preventDefault();
    setInteracting(true);
    setRotation((r) => r - e.deltaY * WHEEL_SENSITIVITY);
    clearTimeout(snapTimeout.current);
    snapTimeout.current = setTimeout(snapToNearest, SNAP_IDLE_MS);
  };

  const pointerAngle = (e: { clientX: number; clientY: number }) => {
    const rect = dialRef.current!.getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    return (Math.atan2(e.clientY - cy, e.clientX - cx) * 180) / Math.PI;
  };

  const handlePointerDown = (e: ReactPointerEvent<HTMLDivElement>) => {
    if (count === 0 || exploding) return;
    (e.target as Element).setPointerCapture?.(e.pointerId);
    clearTimeout(snapTimeout.current);
    setInteracting(true);
    dragOrigin.current = { startAngle: pointerAngle(e), startRotation: rotation };
  };

  const handlePointerMove = (e: ReactPointerEvent<HTMLDivElement>) => {
    if (!dragOrigin.current) return;
    const delta = pointerAngle(e) - dragOrigin.current.startAngle;
    setRotation(dragOrigin.current.startRotation + delta);
  };

  const endDrag = () => {
    if (!dragOrigin.current) return;
    dragOrigin.current = null;
    snapToNearest();
  };

  const selectIndex = (i: number) => {
    if (exploding) return;
    if (i === activeIndex) {
      explode(items[i]);
      return;
    }
    clearTimeout(snapTimeout.current);
    setInteracting(false);
    setRotation((r) => r + angleDiff(currentAngle(i, r, step), -90));
  };

  const explode = (post: Post | undefined) => {
    if (!post || exploding) return;
    setExploding(true);
    window.setTimeout(() => {
      navigate({ to: "/blogs/$postId", params: { postId: post.id } });
    }, EXPLODE_MS);
  };

  const active = activeIndex >= 0 ? items[activeIndex] : undefined;
  const eyeParams = useMemo(
    () => guillocheParamsForPost(active?.id ?? "third-eye-economist"),
    [active?.id],
  );

  if (count === 0) return null;

  return (
    <section
      className="relative overflow-hidden rounded-[2.5rem] px-5 py-16 sm:px-8 sm:py-20"
      style={{ backgroundColor: OBSIDIAN, overflow: exploding ? "visible" : "hidden" }}
    >
      <div className="relative mx-auto max-w-2xl text-center">
        <span
          className="text-xs font-semibold tracking-[0.2em] uppercase"
          style={{ color: LAVENDER }}
        >
          The Chrono-Iris
        </span>
        <h2
          className="mt-3 font-display text-3xl leading-tight sm:text-4xl"
          style={{ color: "#F4E9EF" }}
        >
          A guilloche eye that redraws itself with every essay.
        </h2>
        <p className="mt-3 text-sm leading-relaxed" style={{ color: "#B7A6C2" }}>
          Every essay sits on the dial in the order it was written. Turn it to read, click the
          centre to open.
        </p>
      </div>

      <motion.div
        animate={{ scale: exploding ? 7 : 1, opacity: exploding ? 0 : 1 }}
        transition={{ duration: EXPLODE_MS / 1000, ease: [0.4, 0, 1, 1] }}
        className="relative mx-auto mt-12 aspect-square w-full max-w-[520px] touch-none select-none"
        ref={dialRef}
        onWheel={handleWheel}
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={endDrag}
        onPointerCancel={endDrag}
        onPointerLeave={endDrag}
      >
        {/* 12 o'clock hairline reticle */}
        <motion.div
          className="pointer-events-none absolute top-1 left-1/2 z-20"
          style={{ transform: "translateX(-50%)" }}
          animate={{ opacity: [0.7, 1, 0.7] }}
          transition={{ duration: 2.2, repeat: Infinity, ease: "easeInOut" }}
        >
          <div
            style={{
              width: 1,
              height: 22,
              background: BURGUNDY,
              boxShadow: `0 0 6px ${BURGUNDY}`,
            }}
          />
          <div
            style={{
              width: 0,
              height: 0,
              margin: "0 auto",
              borderLeft: "4px solid transparent",
              borderRight: "4px solid transparent",
              borderTop: `7px solid ${BURGUNDY}`,
            }}
          />
        </motion.div>

        {/* The parametric guilloche eye, morphing (R, r, d) with the active post */}
        <GuillocheEye target={eyeParams} exploding={exploding} size={size * 0.86} />

        {/* Central void — keeps the thesis quote legible over the fine line art */}
        <button
          type="button"
          onClick={() => explode(active)}
          aria-label={active ? `Open "${active.title}"` : "Open essay"}
          className="absolute top-1/2 left-1/2 z-10 flex -translate-x-1/2 -translate-y-1/2 cursor-pointer items-center justify-center rounded-full text-center transition-transform duration-300 hover:scale-[1.03]"
          style={{
            width: size * 0.34,
            height: size * 0.34,
            background: `radial-gradient(circle at 50% 45%, ${OBSIDIAN} 55%, ${OBSIDIAN}00 100%)`,
            boxShadow: `inset 0 0 30px #000000aa, 0 0 22px ${BURGUNDY}55`,
          }}
        >
          <AnimatePresence mode="wait">
            {active && (
              <motion.div
                key={active.id}
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -6 }}
                transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                className="px-6"
              >
                <p
                  className="font-display text-[13px] leading-snug italic sm:text-sm"
                  style={{ color: "#F1E4EE" }}
                >
                  “{active.description}”
                </p>
                <p
                  className="mt-3 text-[10px] font-semibold tracking-[0.14em] uppercase"
                  style={{ color: GOLD }}
                >
                  {active.title}
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </button>

        {/* Ring items */}
        {items.map((post, i) => {
          const ang = currentAngle(i, rotation, step);
          const rad = (ang * Math.PI) / 180;
          const x = center + radius * Math.cos(rad);
          const y = center + radius * Math.sin(rad);
          const isActive = i === activeIndex;
          return (
            <motion.button
              key={post.id}
              type="button"
              aria-label={post.title}
              title={post.title}
              onClick={() => selectIndex(i)}
              className="absolute z-10 flex -translate-x-1/2 -translate-y-1/2 cursor-pointer flex-col items-center gap-1.5"
              animate={{ left: x, top: y }}
              transition={{ duration: interacting ? 0 : 0.6, ease: [0.22, 1, 0.36, 1] }}
            >
              <span
                className="block size-2 rounded-full transition-all duration-300"
                style={{
                  backgroundColor: isActive ? GOLD : LAVENDER,
                  boxShadow: isActive ? `0 0 10px ${GOLD}` : "none",
                }}
              />
              <span
                className="max-w-[110px] truncate rounded-full px-2.5 py-1 text-[11px] font-medium transition-all duration-300 sm:max-w-[130px]"
                style={
                  isActive
                    ? { backgroundColor: BURGUNDY, color: GOLD, boxShadow: `0 0 16px ${BURGUNDY}99` }
                    : { color: "#9C8AA0" }
                }
              >
                {post.title}
              </span>
            </motion.button>
          );
        })}
      </motion.div>
    </section>
  );
}
