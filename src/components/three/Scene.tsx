import { ScrollControls, Stars } from "@react-three/drei";
import { SECTIONS } from "~/constants/sections";
import { SCROLL_PAGES } from "~/constants/path";
import { CameraRig } from "./CameraRig";
import { Path } from "./Path";
import { Station } from "./Station";
import { Environment } from "./environment";

export function Scene() {
  return (
    <>
      <color attach="background" args={["#0b0f1a"]} />
      <fog attach="fog" args={["#0b0f1a", 18, 95]} />

      <ambientLight intensity={0.25} />
      <hemisphereLight args={["#8fb4ff", "#0f1726", 0.6]} />
      {/* "maanlicht" vanuit de richting van de maan */}
      <directionalLight position={[-30, 40, -60]} intensity={0.9} color="#dfe6ff" />

      <Stars radius={120} depth={60} count={3000} factor={4} fade speed={0.5} />

      <ScrollControls pages={SCROLL_PAGES} damping={0.25}>
        <CameraRig />
        <Environment />
        <Path />
        {SECTIONS.map((s, i) => (
          <Station key={s.id} section={s} index={i} />
        ))}
      </ScrollControls>
    </>
  );
}
