import { useLayoutEffect, useMemo, useRef, type ReactNode } from "react";
import { Color, Euler, Matrix4, Quaternion, Vector3, type InstancedMesh } from "three";
import { WORLD, nearestPath, nearestStation, rng, terrainHeight, zoneColor } from "~/constants/world";

type Item = { pos: Vector3; scale: number; rotY: number; color: Color };

const FOLIAGE_BASE = new Color("#1d3b3f");
const ROCK = new Color("#3a4560");

/** Verspreidt bomen, rotsen en kristallen over het landschap (instanced = snel). */
export function Scatter() {
  const { trees, rocks, crystals } = useMemo(() => {
    const rand = rng(42);
    const trees: Item[] = [];
    const rocks: Item[] = [];
    const crystals: Item[] = [];

    for (let z = WORLD.minZ; z < WORLD.maxZ; z += 2.6) {
      for (let x = -WORLD.halfWidth + 2; x < WORLD.halfWidth - 2; x += 2.6) {
        const px = x + (rand() - 0.5) * 2.4;
        const pz = z + (rand() - 0.5) * 2.4;
        const { dist } = nearestPath(px, pz);
        if (dist < 3.2) continue; // pad vrijhouden
        if (nearestStation(px, pz).dist < 3.5) continue; // stations vrijhouden

        const roll = rand();
        // dichter bij het pad wat minder bomen, zodat je het pad blijft zien
        const treeChance = dist < 9 ? 0.18 : dist < 30 ? 0.42 : 0.25;
        const pos = new Vector3(px, terrainHeight(px, pz), pz);
        const zone = zoneColor(px, pz);

        if (roll < treeChance) {
          trees.push({
            pos,
            scale: 0.7 + rand() * 0.9,
            rotY: rand() * Math.PI,
            color: FOLIAGE_BASE.clone().lerp(zone, 0.04 + rand() * 0.06),
          });
        } else if (roll < treeChance + 0.035) {
          rocks.push({ pos, scale: 0.3 + rand() * 0.9, rotY: rand() * Math.PI, color: ROCK.clone() });
        } else if (dist < 16 && roll < treeChance + 0.06) {
          crystals.push({ pos, scale: 0.4 + rand() * 0.7, rotY: rand() * Math.PI, color: zone });
        }
      }
    }
    return { trees, rocks, crystals };
  }, []);

  return (
    <group>
      {/* boom = stam + twee kegels */}
      <Instances items={trees} offset={[0, 0.5, 0]}>
        <cylinderGeometry args={[0.12, 0.18, 1, 5]} />
        <meshStandardMaterial color="#2a2320" flatShading />
      </Instances>
      <Instances items={trees} offset={[0, 1.7, 0]} useColor>
        <coneGeometry args={[1, 2.2, 6]} />
        <meshStandardMaterial flatShading roughness={0.8} />
      </Instances>
      <Instances items={trees} offset={[0, 2.6, 0]} sizeFactor={0.7} useColor>
        <coneGeometry args={[1, 1.8, 6]} />
        <meshStandardMaterial flatShading roughness={0.8} />
      </Instances>

      <Instances items={rocks} offset={[0, 0.15, 0]} useColor tilt>
        <dodecahedronGeometry args={[0.8, 0]} />
        <meshStandardMaterial flatShading roughness={1} />
      </Instances>

      <Instances items={crystals} offset={[0, 0.6, 0]} useColor tilt stretch>
        <octahedronGeometry args={[0.5, 0]} />
        <meshStandardMaterial flatShading emissive="#ffffff" emissiveIntensity={0.15} roughness={0.3} />
      </Instances>
    </group>
  );
}

type InstancesProps = {
  items: Item[];
  offset: [number, number, number];
  sizeFactor?: number;
  useColor?: boolean;
  tilt?: boolean;
  stretch?: boolean;
  children: ReactNode;
};

/** Zet per item een matrix (en kleur) op een InstancedMesh. */
function Instances({ items, offset, sizeFactor = 1, useColor, tilt, stretch, children }: InstancesProps) {
  const ref = useRef<InstancedMesh>(null);

  useLayoutEffect(() => {
    const mesh = ref.current;
    if (!mesh) return;
    const m = new Matrix4();
    const q = new Quaternion();
    const s = new Vector3();
    const p = new Vector3();
    items.forEach((it, i) => {
      const k = it.scale * sizeFactor;
      s.set(k, stretch ? k * 2.2 : k, k);
      p.set(it.pos.x, it.pos.y + offset[1] * it.scale, it.pos.z);
      q.setFromEuler(new Euler(tilt ? it.rotY * 0.3 : 0, it.rotY, tilt ? it.rotY * 0.2 : 0));
      m.compose(p, q, s);
      mesh.setMatrixAt(i, m);
      if (useColor) mesh.setColorAt(i, it.color);
    });
    mesh.instanceMatrix.needsUpdate = true;
    if (mesh.instanceColor) mesh.instanceColor.needsUpdate = true;
    mesh.computeBoundingSphere();
  }, [items, offset, sizeFactor, useColor, tilt, stretch]);

  return (
    <instancedMesh ref={ref} args={[undefined, undefined, items.length]} frustumCulled={false}>
      {children}
    </instancedMesh>
  );
}
