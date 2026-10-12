import { useSyncExternalStore } from "react";
import { STATION_T } from "~/constants/path";

/**
 * Kleine globale store die de 3D-wereld (binnen <Canvas>) en de
 * HTML-overlay (buiten <Canvas>) met elkaar laat praten.
 */
type State = { active: number; progress: number };

let state: State = { active: 0, progress: 0 };
let scrollEl: HTMLElement | null = null;
const listeners = new Set<() => void>();

export const journey = {
  get: () => state,
  set(next: Partial<State>) {
    const merged = { ...state, ...next };
    if (merged.active === state.active && Math.abs(merged.progress - state.progress) < 0.002) return;
    state = merged;
    listeners.forEach((l) => l());
  },
  subscribe(l: () => void) {
    listeners.add(l);
    return () => listeners.delete(l);
  },
  registerScrollEl(el: HTMLElement) {
    scrollEl = el;
  },
  /** Scroll (animated) naar een station. */
  goTo(index: number) {
    if (!scrollEl) return;
    const i = Math.max(0, Math.min(STATION_T.length - 1, index));
    const max = scrollEl.scrollHeight - scrollEl.clientHeight;
    scrollEl.scrollTo({ top: STATION_T[i] * max, behavior: "smooth" });
  },
};

export const useJourney = () => useSyncExternalStore(journey.subscribe, journey.get);

/** Alleen het actieve station — rendert niet opnieuw bij elke scroll-tick. */
export const useActiveStation = () =>
  useSyncExternalStore(journey.subscribe, () => journey.get().active);
