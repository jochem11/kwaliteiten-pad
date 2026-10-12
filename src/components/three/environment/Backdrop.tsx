import { useMemo } from "react";
import { Color } from "three";
import { WORLD, rng } from "~/constants/world";

/** Bergen aan de horizon + een maan. Geven diepte zonder veel te kosten. */
export function Backdrop() {
  const mountains = useMemo(() => {
    const rand = rng(7);
    const list: { x: number; z: number; h: number; r: number; color: string }[] = [];
    for (let z = WORLD.minZ - 20; z < WORLD.maxZ + 20; z += 9) {
      for (const sign of [-1, 1]) {
        const h = 14 + rand() * 22;
        list.push({
          x: sign * (WORLD.halfWidth + 4 + rand() * 18),
          z: z + rand() * 6,
          h,
          r: h * (0.7 + rand() * 0.4),
          color: new Color("#18223a").lerp(new Color("#2b3a5e"), rand()).getStyle(),
        });
      }
    }
    // achterwand aan het einde van het pad
    for (let x = -WORLD.halfWidth; x <= WORLD.halfWidth; x += 12) {
      const h = 18 + rand() * 20;
      list.push({ x, z: WORLD.minZ - 18 - rand() * 10, h, r: h * 0.8, color: "#1f2b47" });
    }
    return list;
  }, []);

  return (
    <group>
      {mountains.map((m, i) => (
        <mesh key={i} position={[m.x, m.h / 2 - 2, m.z]}>
          <coneGeometry args={[m.r, m.h, 5]} />
          <meshStandardMaterial color={m.color} flatShading roughness={1} />
        </mesh>
      ))}

      {/* maan: geen fog zodat hij altijd zichtbaar is */}
      <mesh position={[-60, 55, WORLD.minZ - 40]}>
        <sphereGeometry args={[9, 32, 16]} />
        <meshBasicMaterial color="#f3ead2" fog={false} toneMapped={false} />
      </mesh>
      <mesh position={[-60, 55, WORLD.minZ - 41]}>
        <sphereGeometry args={[13, 32, 16]} />
        <meshBasicMaterial color="#f3ead2" transparent opacity={0.08} fog={false} depthWrite={false} />
      </mesh>
    </group>
  );
}
