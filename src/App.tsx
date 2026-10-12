import { Canvas } from "@react-three/fiber";
import { Suspense } from "react";
import { Scene } from "~/components/three/Scene";
import { Overlay } from "~/components/ui/Overlay";

export default function App() {
  return (
    <>
      <Canvas camera={{ position: [0, 2.2, 16], fov: 55 }} dpr={[1, 2]}>
        <Suspense fallback={null}>
          <Scene />
        </Suspense>
      </Canvas>
      <Overlay />
    </>
  );
}
