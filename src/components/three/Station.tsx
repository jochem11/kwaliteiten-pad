import { Billboard, Float, Text } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { Suspense, useRef } from "react";
import {
  AdditiveBlending,
  CanvasTexture,
  MathUtils,
  type Group,
  type Mesh,
  type MeshBasicMaterial,
  type PointLight,
} from "three";
import { PART_COLORS, type Section } from "~/constants/sections";
import { STATION_POS } from "~/constants/path";
import { journey, useActiveStation } from "~/providers/journey";

const FONT = "/fonts/SpaceGrotesk-Medium.woff";

/** Zachte radiale gloed, gedeeld door alle stations. */
const GLOW = (() => {
  const size = 128;
  const canvas = document.createElement("canvas");
  canvas.width = canvas.height = size;
  const ctx = canvas.getContext("2d")!;
  const g = ctx.createRadialGradient(size / 2, size / 2, 0, size / 2, size / 2, size / 2);
  g.addColorStop(0, "rgba(255,255,255,1)");
  g.addColorStop(0.35, "rgba(255,255,255,0.35)");
  g.addColorStop(1, "rgba(255,255,255,0)");
  ctx.fillStyle = g;
  ctx.fillRect(0, 0, size, size);
  return new CanvasTexture(canvas);
})();

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
  const glow = useRef<MeshBasicMaterial>(null);
  const light = useRef<PointLight>(null);

  useFrame((_, delta) => {
    if (!group.current || !shape.current) return;
    const target = isActive ? 1.25 : 0.85;
    const s = MathUtils.damp(group.current.scale.x, target, 6, delta);
    group.current.scale.setScalar(s);
    shape.current.rotation.y += delta * (isActive ? 0.8 : 0.25);
    if (light.current) {
      light.current.intensity = MathUtils.damp(light.current.intensity, isActive ? 10 : 0, 6, delta);
    }
    if (glow.current) {
      glow.current.opacity = MathUtils.damp(glow.current.opacity, isActive ? 0.55 : 0, 6, delta);
    }
  });

  return (
    <group ref={group} position={[pos.x + side, pos.y + 1.4, pos.z]}>
      <Float speed={2} floatIntensity={0.6} rotationIntensity={0.2}>
        {/* zachte gloed achter het actieve station */}
        <Billboard>
          <mesh renderOrder={-1}>
            <planeGeometry args={[4.2, 4.2]} />
            <meshBasicMaterial
              ref={glow}
              map={GLOW}
              color={color}
              transparent
              opacity={0}
              depthWrite={false}
              blending={AdditiveBlending}
              toneMapped={false}
            />
          </mesh>
        </Billboard>
        <mesh ref={shape} onClick={() => journey.goTo(index)}>
          <icosahedronGeometry args={[0.9, 0]} />
          <meshStandardMaterial
            color={color}
            emissive={color}
            emissiveIntensity={isActive ? 0.3 : 0.25}
            flatShading
          />
        </mesh>
      </Float>

      {/* lamp schuin boven/voor het station (van het pad af), kort bereik zodat hij de weg niet raakt */}
      <pointLight ref={light} position={[Math.sign(side) * 1.5, 1.8, 1.8]} intensity={0} distance={5} decay={1} color="#ffffff" />

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
