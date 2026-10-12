import { useFrame, useThree } from "@react-three/fiber";
import { useScroll } from "@react-three/drei";
import { useEffect, useRef } from "react";
import { MathUtils, PerspectiveCamera, Vector3 } from "three";
import { CURVE, STATION_T } from "~/constants/path";
import { journey } from "~/providers/journey";

const UP = new Vector3(0, 3, 0);

/** Laat de camera over het pad "lopen" op basis van scroll. */
export function CameraRig() {
  const scroll = useScroll();
  const { camera, size } = useThree();
  const lookTarget = useRef(new Vector3());
  const tmp = useRef(new Vector3());
  const t = useRef(0);

  useEffect(() => journey.registerScrollEl(scroll.el), [scroll.el]);

  // Op desktop staat het infopaneel rechts; schuif het beeldmidden naar links
  // zodat het pad en de stations in het vrije deel van het scherm vallen.
  useEffect(() => {
    const cam = camera as PerspectiveCamera;
    const shift = size.width > 760 ? 320 : 0;
    if (shift) cam.setViewOffset(size.width + shift, size.height, shift, 0, size.width, size.height);
    else cam.clearViewOffset();
    cam.updateProjectionMatrix();
  }, [camera, size]);

  useFrame((_, delta) => {
    // eigen (gedempte) scroll-voortgang: robuuster dan scroll.offset
    const el = scroll.el;
    const max = el.scrollHeight - el.clientHeight;
    const target = max > 0 ? el.scrollTop / max : 0;
    t.current = MathUtils.damp(t.current, target, 4, Math.min(delta, 0.1));
    const progress = Math.min(0.999, t.current);

    // camera een stukje achter het actuele punt, op ooghoogte
    const behind = CURVE.getPoint(Math.max(0, progress - 0.06));
    tmp.current.copy(behind).add(UP);
    camera.position.lerp(tmp.current, 1 - Math.pow(0.001, delta));

    // kijk iets vooruit langs het pad
    const ahead = CURVE.getPoint(Math.min(1, progress + 0.03));
    lookTarget.current.lerp(ahead.add(new Vector3(0, 1.8, 0)), 1 - Math.pow(0.001, delta));
    camera.lookAt(lookTarget.current);

    // dichtstbijzijnde station = actief
    let active = 0;
    let best = Infinity;
    STATION_T.forEach((st, i) => {
      const d = Math.abs(st - progress);
      if (d < best) {
        best = d;
        active = i;
      }
    });
    journey.set({ active, progress });
  });

  return null;
}
