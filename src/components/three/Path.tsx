import { useMemo } from "react";
import { TubeGeometry } from "three";
import { CURVE } from "~/constants/path";

/** Het zichtbare pad: een gloeiende buis + een bredere "weg" eronder. */
export function Path() {
  const line = useMemo(() => new TubeGeometry(CURVE, 400, 0.06, 8, false), []);
  const road = useMemo(() => new TubeGeometry(CURVE, 400, 1.1, 12, false), []);

  return (
    <group>
      <mesh geometry={road} position={[0, -0.6, 0]} scale={[1, 0.04, 1]}>
        <meshStandardMaterial color="#26314a" roughness={0.9} />
      </mesh>
      <mesh geometry={line}>
        <meshBasicMaterial color="#cfe3ff" toneMapped={false} />
      </mesh>
    </group>
  );
}
