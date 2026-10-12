import { useMemo } from "react";
import { BufferAttribute, Color, PlaneGeometry } from "three";
import { WORLD, terrainHeight, zoneColor } from "~/constants/world";

const LOW = new Color("#121a2a");
const HIGH = new Color("#2a3a58");

/** Low-poly landschap: vlak rond het pad, heuvels verder weg, licht getint per zone. */
export function Terrain() {
  const geometry = useMemo(() => {
    const length = WORLD.maxZ - WORLD.minZ;
    const geo = new PlaneGeometry(WORLD.halfWidth * 2, length, 90, 160);
    geo.rotateX(-Math.PI / 2);
    geo.translate(0, 0, (WORLD.maxZ + WORLD.minZ) / 2);

    const pos = geo.attributes.position;
    const colors = new Float32Array(pos.count * 3);
    const c = new Color();

    for (let i = 0; i < pos.count; i++) {
      const x = pos.getX(i);
      const z = pos.getZ(i);
      const h = terrainHeight(x, z);
      pos.setY(i, h);

      // kleur: donker in dalen, lichter op toppen, beetje zonetint
      c.copy(LOW).lerp(HIGH, Math.min(1, Math.max(0, (h + 0.5) / 6)));
      c.lerp(zoneColor(x, z), 0.035);
      colors.set([c.r, c.g, c.b], i * 3);
    }

    geo.setAttribute("color", new BufferAttribute(colors, 3));
    geo.computeVertexNormals();
    return geo;
  }, []);

  return (
    <mesh geometry={geometry} receiveShadow>
      <meshStandardMaterial vertexColors flatShading roughness={0.95} />
    </mesh>
  );
}
