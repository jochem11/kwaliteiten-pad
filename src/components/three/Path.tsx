import { useMemo } from "react";
import { BufferAttribute, BufferGeometry, DoubleSide, TubeGeometry, Vector3 } from "three";
import { CURVE } from "~/constants/path";

const SEGMENTS = 400;
const ROAD_WIDTH = 1.1;
/** Hoogte van het wegdek t.o.v. de curve (terrein ligt op -0.7). */
const ROAD_Y = -0.6;

/** Platte strook die de curve volgt, inclusief de hoogteverschillen. */
function roadGeometry() {
  const positions = new Float32Array((SEGMENTS + 1) * 2 * 3);
  const indices: number[] = [];
  const up = new Vector3(0, 1, 0);
  const side = new Vector3();

  for (let i = 0; i <= SEGMENTS; i++) {
    const t = i / SEGMENTS;
    const p = CURVE.getPointAt(t);
    const tangent = CURVE.getTangentAt(t);
    side.crossVectors(tangent, up).setY(0).normalize().multiplyScalar(ROAD_WIDTH);

    positions.set([p.x - side.x, p.y + ROAD_Y, p.z - side.z], i * 6);
    positions.set([p.x + side.x, p.y + ROAD_Y, p.z + side.z], i * 6 + 3);

    if (i < SEGMENTS) {
      const a = i * 2;
      indices.push(a, a + 2, a + 1, a + 1, a + 2, a + 3);
    }
  }

  const geo = new BufferGeometry();
  geo.setAttribute("position", new BufferAttribute(positions, 3));
  geo.setIndex(indices);
  geo.computeVertexNormals();
  return geo;
}

/** Het zichtbare pad: een gloeiende lijn + een bredere "weg" eronder. */
export function Path() {
  const line = useMemo(() => new TubeGeometry(CURVE, SEGMENTS, 0.06, 8, false), []);
  const road = useMemo(roadGeometry, []);

  return (
    <group>
      <mesh geometry={road}>
        <meshStandardMaterial color="#26314a" roughness={0.9} side={DoubleSide} />
      </mesh>
      <mesh geometry={line}>
        <meshBasicMaterial color="#cfe3ff" toneMapped={false} />
      </mesh>
    </group>
  );
}
