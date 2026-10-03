/**
 * Parametric guilloche / spirograph math — the kind of fine engine-turned line
 * art used on banknote security printing. A hypotrochoid is traced by a point
 * fixed to a small circle (radius r) rolling inside a larger fixed circle
 * (radius R), at distance d from the small circle's centre:
 *
 *   x(t) = (R - r)·cos(t) + d·cos(((R - r) / r)·t)
 *   y(t) = (R - r)·sin(t) - d·sin(((R - r) / r)·t)
 *
 * Varying (R, r, d) reshapes the whole rosette, which is what lets the eye
 * "morph" in real time as the active essay changes.
 */

export type GuillocheParams = { R: number; r: number; d: number };

export function hypotrochoidPath(
  { R, r, d }: GuillocheParams,
  opts: { revolutions?: number; samples?: number; squashX?: number; phase?: number } = {},
): string {
  const revolutions = opts.revolutions ?? 10;
  const samples = opts.samples ?? Math.max(360, Math.round(revolutions * 90));
  const squashX = opts.squashX ?? 1;
  const phase = opts.phase ?? 0;

  // Guard against a degenerate rolling circle collapsing the curve to a point.
  const rr = Math.max(1, r);
  const k = (R - rr) / rr;
  const tMax = revolutions * Math.PI * 2;

  let out = "";
  for (let i = 0; i <= samples; i++) {
    const t = (i / samples) * tMax + phase;
    const x = (R - rr) * Math.cos(t) + d * Math.cos(k * t);
    const y = (R - rr) * Math.sin(t) - d * Math.sin(k * t);
    out += (i === 0 ? "M" : "L") + (x * squashX).toFixed(2) + "," + y.toFixed(2) + " ";
  }
  return out;
}

/** Small deterministic string hash (FNV-1a) — stable across renders/sessions. */
export function hashString(s: string): number {
  let h = 0x811c9dc5;
  for (let i = 0; i < s.length; i++) {
    h ^= s.charCodeAt(i);
    h = Math.imul(h, 0x01000193);
  }
  return h >>> 0;
}

/**
 * Maps a post's id to a distinct-but-tasteful (R, r, d) triple, so the same
 * essay always renders the same rosette, and scrolling through the archive
 * visibly reshapes the eye post to post.
 */
export function guillocheParamsForPost(id: string): GuillocheParams {
  const h1 = hashString(id);
  const h2 = hashString(`${id}:d`);
  const R = 100;
  const r = 13 + (h1 % 26); // 13..38
  const d = r * (0.42 + ((h2 % 100) / 120)); // ~0.42r .. 1.25r
  return { R, r, d };
}

export function lerpParams(a: GuillocheParams, b: GuillocheParams, t: number): GuillocheParams {
  return {
    R: a.R + (b.R - a.R) * t,
    r: a.r + (b.r - a.r) * t,
    d: a.d + (b.d - a.d) * t,
  };
}
