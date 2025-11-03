import { useEffect } from "react";
import { TextureLoader, BackSide, SRGBColorSpace } from "three";
import { useLoader, useThree, useFrame } from "@react-three/fiber";
import { useRef } from "react";

const Environment3d = () => {
  const texture = useLoader(
    TextureLoader,
    "/vr_gallery/room/gh-garden-pano1@0,75x.jpg"
  );
  // const texture = useLoader(TextureLoader, "/vr_gallery/room/London3d.jpg");

  const { invalidate } = useThree();

  const meshRef = useRef();

  useEffect(() => {
    if (texture) {
      texture.colorSpace = SRGBColorSpace;
      texture.needsUpdate = true;
      // force a few frames to ensure visibility on all browsers
      let stopped = false;
      const start = performance.now();
      const pump = (t) => {
        if (stopped) return;
        invalidate();
        if (t - start < 500) requestAnimationFrame(pump);
      };
      requestAnimationFrame(pump);
      return () => {
        stopped = true;
      };
    }
  }, [texture, invalidate]);
  useFrame(({ camera }) => {
    if (!meshRef.current) return;
    meshRef.current.position.copy(camera.position);
  });
  useEffect(() => {
    if (!meshRef.current) return;
    const raf = requestAnimationFrame(() => {
      meshRef.current.rotation.y += 0.0001;
      invalidate();
    });
    return () => cancelAnimationFrame(raf);
  }, [meshRef, invalidate]);

  return (
    <mesh
      ref={meshRef}
      rotation={[0, -0.2, 0]}
      frustumCulled={false}
      renderOrder={-10000}
      userData={{ noRaycast: true }}
    >
      <sphereGeometry args={[2500, 60, 40]} attach="geometry" />
      <meshBasicMaterial
        map={texture}
        attach="material"
        side={BackSide}
        depthWrite={false}
        fog={false}
        toneMapped={false}
      />
    </mesh>
  );
};

export default Environment3d;
