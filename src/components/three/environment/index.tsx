import { Backdrop } from "./Backdrop";
import { FloatingBits } from "./FloatingBits";
import { Lamps } from "./Lamps";
import { Scatter } from "./Scatter";
import { Terrain } from "./Terrain";

/** Alles om het pad heen. Losse onderdelen zijn makkelijk aan/uit te zetten. */
export function Environment() {
  return (
    <group>
      <Terrain />
      <Scatter />
      <Lamps />
      <FloatingBits />
      <Backdrop />
    </group>
  );
}
