import { Color, Vector3 } from "three";
import { CURVE, STATION_POS } from "./path";
import { PART_COLORS, SECTIONS } from "./sections";

/**
 * Helpers voor de omgeving: hoogte van het terrein, afstand tot het pad,
 * zonekleur en een seeded random zodat de wereld er elke keer hetzelfde uitziet.
 */

// ── seeded random ─────────────────────────────────────────────────────
export function rng(seed = 1) {
  let s = seed >>> 0;
  return () => {
    s = (s + 0x6d2b79f5) >>> 0;
    let t = s;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

// ── pad-samples voor snelle afstandsberekening ────────────────────────
const SAMPLES: Vector3[] = CURVE.getSpacedPoints(400);

/** Horizontale afstand tot het pad + de hoogte van het dichtstbijzijnde padpunt. */
export function nearestPath(x: number, z: number) {
  let best = Infinity;
  let y = 0;
  for (const p of SAMPLES) {
    const d = (p.x - x) ** 2 + (p.z - z) ** 2;
    if (d < best) {
      best = d;
      y = p.y;
    }
  }
  return { dist: Math.sqrt(best), y };
}

/** Afstand tot het dichtstbijzijnde station (incl. de zij-offset waar ze staan). */
export function nearestStation(x: number, z: number) {
  let best = Infinity;
  let index = 0;
  STATION_POS.forEach((p, i) => {
    const side = i % 2 === 0 ? 4 : -4;
    const d = Math.hypot(p.x + side - x, p.z - z);
    if (d < best) {
      best = d;
      index = i;
    }
  });
  return { dist: best, index };
}

const smooth = (a: number, b: number, x: number) => {
  const t = Math.min(1, Math.max(0, (x - a) / (b - a)));
  return t * t * (3 - 2 * t);
};

/** Glooiende heuvels (simpele som van sinussen — geen extra dependency nodig). */
const hills = (x: number, z: number) =>
  Math.sin(x * 0.08) * Math.cos(z * 0.06) * 3 +
  Math.sin(x * 0.21 + z * 0.13) * 1.2 +
  Math.cos(z * 0.17 - x * 0.05) * 0.8 +
  Math.max(0, Math.abs(x) - 18) * 0.12; // loopt op naar de randen

/** Hoogte van het terrein; vlak rond het pad, heuvelachtig verder weg. */
export function terrainHeight(x: number, z: number) {
  const { dist, y } = nearestPath(x, z);
  const base = y - 0.7;
  const k = smooth(5.5, 16, dist);
  return base + k * (hills(x, z) + 1.5);
}

/** Kleur van de zone (= het deel van het dichtstbijzijnde station). */
export function zoneColor(x: number, z: number) {
  const { index } = nearestStation(x, z);
  return new Color(PART_COLORS[SECTIONS[index].part]);
}

/** Grootte van de wereld. */
const zs = STATION_POS.map((p) => p.z);
export const WORLD = {
  minZ: Math.min(...zs) - 30,
  maxZ: Math.max(...zs) + 30,
  halfWidth: 70,
};
