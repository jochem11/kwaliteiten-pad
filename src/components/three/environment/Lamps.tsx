import { useLayoutEffect, useMemo, useRef } from "react";
import { Matrix4, Vector3, type InstancedMesh } from "three";
import { CURVE } from "~/constants/path";
import { nearestStation } from "~/constants/world";

const UP = new Vector3(0, 1, 0);

/** Lantaarnpaaltjes langs het pad, afwisselend links en rechts. */
export function Lamps() {
  const spots = useMemo(() => {
    const out: Vector3[] = [];
    const count = 70;
    for (let i = 1; i < count; i++) {
      const t = i / count;
      const p = CURVE.getPointAt(t);
      const side = new Vector3().crossVectors(CURVE.getTangentAt(t), UP).normalize();
      const pos = p.clone().addScaledVector(side, i % 2 === 0 ? 2.6 : -2.6);
      if (nearestStation(pos.x, pos.z).dist < 2.5) continue;
      pos.y -= 0.7;
      out.push(pos);
    }
    return out;
  }, []);

  const poles = useRef<InstancedMesh>(null);
  const bulbs = useRef<InstancedMesh>(null);

  useLayoutEffect(() => {
    const m = new Matrix4();
    spots.forEach((p, i) => {
      poles.current?.setMatrixAt(i, m.makeTranslation(p.x, p.y + 0.6, p.z));
      bulbs.current?.setMatrixAt(i, m.makeTranslation(p.x, p.y + 1.25, p.z));
    });
    poles.current!.instanceMatrix.needsUpdate = true;
    bulbs.current!.instanceMatrix.needsUpdate = true;
  }, [spots]);

  return (
    <group>
      <instancedMesh ref={poles} args={[undefined, undefined, spots.length]} frustumCulled={false}>
        <cylinderGeometry args={[0.03, 0.05, 1.2, 6]} />
        <meshStandardMaterial color="#3b4660" />
      </instancedMesh>
      <instancedMesh ref={bulbs} args={[undefined, undefined, spots.length]} frustumCulled={false}>
        <sphereGeometry args={[0.09, 12, 8]} />
        <meshBasicMaterial color="#ffe3a3" toneMapped={false} />
      </instancedMesh>
    </group>
  );
}
