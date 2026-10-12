import { Billboard, Float, Text } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { Suspense, useRef } from "react";
import { MathUtils, type Group, type Mesh } from "three";
import { PART_COLORS, type Section } from "~/constants/sections";
import { STATION_POS } from "~/constants/path";
import { journey, useActiveStation } from "~/providers/journey";

const FONT = "/fonts/SpaceGrotesk-Medium.woff";

type Props = { section: Section; index: number };

/**
 * Eén checkpoint op het pad. Nu een zwevende vorm + label;
 * later kun je per station een eigen model/scene maken (bijv. een
 * aardbol bij SDG's, een slot bij security).
 */
export function Station({ section, index }: Props) {
  const active = useActiveStation();
  const isActive = active === index;
  const color = PART_COLORS[section.part];
  const pos = STATION_POS[index];
  const side = index % 2 === 0 ? 4 : -4; // afwisselend links/rechts van het pad

  const group = useRef<Group>(null);
  const shape = useRef<Mesh>(null);

  useFrame((_, delta) => {
    if (!group.current || !shape.current) return;
    const target = isActive ? 1.25 : 0.85;
    const s = MathUtils.damp(group.current.scale.x, target, 6, delta);
    group.current.scale.setScalar(s);
    shape.current.rotation.y += delta * (isActive ? 0.8 : 0.25);
  });

  return (
    <group ref={group} position={[pos.x + side, pos.y + 1.4, pos.z]}>
      <Float speed={2} floatIntensity={0.6} rotationIntensity={0.2}>
        <mesh ref={shape} onClick={() => journey.goTo(index)}>
          <icosahedronGeometry args={[0.9, 0]} />
          <meshStandardMaterial
            color={color}
            emissive={color}
            emissiveIntensity={isActive ? 1.2 : 0.25}
            flatShading
          />
        </mesh>
      </Float>

      {/* sokkel */}
      <mesh position={[0, -1.9, 0]}>
        <cylinderGeometry args={[0.6, 0.8, 0.3, 24]} />
        <meshStandardMaterial color="#222a3d" />
      </mesh>

      <Suspense fallback={null}>
        <Billboard position={[0, 2.9, 0]}>
          <Text font={FONT} fontSize={0.32} color="#93a0b8" anchorY="bottom" position={[0, 0.08, 0]} fillOpacity={isActive ? 1 : 0.6}>
            {String(index + 1).padStart(2, "0")}
          </Text>
          <Text
            font={FONT}
            fontSize={0.5}
            maxWidth={4.5}
            textAlign="center"
            color="#e8edf7"
            outlineWidth={0.008}
            outlineColor={color}
            fillOpacity={isActive ? 1 : 0.6}
            anchorY="top"
          >
            {section.title}
          </Text>
        </Billboard>
      </Suspense>
    </group>
  );
}
