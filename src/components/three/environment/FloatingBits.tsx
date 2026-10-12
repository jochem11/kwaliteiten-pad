import { Sparkles } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { useLayoutEffect, useMemo, useRef } from "react";
import { Color, Euler, Matrix4, Quaternion, Vector3, type InstancedMesh } from "three";
import { STATION_POS } from "~/constants/path";
import { PART_COLORS, SECTIONS } from "~/constants/sections";
import { nearestPath, rng, terrainHeight } from "~/constants/world";

const COUNT_PER_STATION = 14;

/**
 * Rond elk station: zwevende "data-blokjes" in de zonekleur
 * en sparkles, zodat elk checkpoint levendiger voelt.
 */
export function FloatingBits() {
  const bits = useMemo(() => {
    const rand = rng(99);
    return STATION_POS.flatMap((p, i) => {
      const side = i % 2 === 0 ? 4 : -4;
      const out = [];
      while (out.length < COUNT_PER_STATION) {
        const angle = rand() * Math.PI * 2;
        const r = 2 + rand() * 5;
        const x = p.x + side + Math.cos(angle) * r;
        const z = p.z + Math.sin(angle) * r;
        if (nearestPath(x, z).dist < 3) continue; // niet boven het pad (blokkeert zicht)
        out.push({
          base: new Vector3(x, terrainHeight(x, z) + 1 + rand() * 3, z),
          size: 0.08 + rand() * 0.14,
          speed: 0.4 + rand() * 0.8,
          phase: rand() * Math.PI * 2,
          station: i,
        });
      }
      return out;
    });
  }, []);

  const mesh = useRef<InstancedMesh>(null);
  const m = useMemo(() => new Matrix4(), []);
  const q = useMemo(() => new Quaternion(), []);
  const e = useMemo(() => new Euler(), []);
  const s = useMemo(() => new Vector3(), []);
  const p = useMemo(() => new Vector3(), []);

  // kleur per blokje = kleur van het station
  useLayoutEffect(() => {
    const inst = mesh.current;
    if (!inst) return;
    bits.forEach((b, i) => inst.setColorAt(i, colorOf(b.station)));
    if (inst.instanceColor) inst.instanceColor.needsUpdate = true;
  }, [bits]);

  useFrame(({ clock }) => {
    const t = clock.elapsedTime;
    const inst = mesh.current;
    if (!inst) return;
    bits.forEach((b, i) => {
      p.copy(b.base);
      p.y += Math.sin(t * b.speed + b.phase) * 0.4;
      e.set(t * b.speed * 0.5, t * b.speed + b.phase, 0);
      q.setFromEuler(e);
      s.setScalar(b.size);
      m.compose(p, q, s);
      inst.setMatrixAt(i, m);
    });
    inst.instanceMatrix.needsUpdate = true;
  });

  return (
    <group>
      <instancedMesh
        ref={mesh}
        args={[undefined, undefined, bits.length]}
        frustumCulled={false}
      >
        <boxGeometry />
        <meshStandardMaterial emissive="#ffffff" emissiveIntensity={0.08} roughness={0.4} />
      </instancedMesh>

      {STATION_POS.map((pos, i) => (
        <Sparkles
          key={i}
          position={[pos.x + (i % 2 === 0 ? 4 : -4), pos.y + 2, pos.z]}
          scale={[8, 5, 8]}
          count={30}
          size={3}
          speed={0.3}
          color={PART_COLORS[SECTIONS[i].part]}
        />
      ))}
    </group>
  );
}

const cache = new Map<number, Color>();
const colorOf = (station: number) => {
  if (!cache.has(station)) cache.set(station, new Color(PART_COLORS[SECTIONS[station].part]));
  return cache.get(station)!;
};
