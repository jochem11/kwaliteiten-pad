import { CatmullRomCurve3, Vector3 } from "three";
import { SECTIONS } from "./sections";

/** Afstand tussen stations langs de z-as. */
const SPACING = 14;

/**
 * Het pad: een slingerende lijn met één controlepunt per station.
 * Pas de formule aan voor een andere vorm (spiraal, heuvels, ...).
 */
const controlPoints = SECTIONS.map(
  (_, i) =>
    new Vector3(
      Math.sin(i * 0.9) * 8, // links/rechts slingeren
      Math.sin(i * 0.5) * 1.5, // licht op en neer
      -i * SPACING,
    ),
);

// extra punt aan begin en eind zodat de camera ervoor/erna kan staan
controlPoints.unshift(new Vector3(0, 0, SPACING));
controlPoints.push(controlPoints[controlPoints.length - 1].clone().add(new Vector3(0, 0, -SPACING)));

export const CURVE = new CatmullRomCurve3(controlPoints, false, "catmullrom", 0.5);

/** Scroll-positie (0–1) waarop elk station "actief" is. */
export const STATION_T = SECTIONS.map((_, i) => (i + 1) / (controlPoints.length - 1));

/** Wereldpositie van elk station. */
export const STATION_POS = STATION_T.map((t) => CURVE.getPoint(t));

/** Hoeveel scroll-pagina's het hele pad duurt. */
export const SCROLL_PAGES = SECTIONS.length * 1.4;
