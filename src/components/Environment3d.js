import React from "react";
import { TextureLoader, BackSide } from "three";
import { useLoader } from "@react-three/fiber";

const Environment3d = () => {
  const texture = useLoader(
    TextureLoader,
    "/vr_gallery/room/gh-garden-pano1@0,75x.jpg"
  );
  // const texture = useLoader(TextureLoader, "/vr_gallery/room/London3d.jpg");

  return (
    <mesh rotation={[0, -0.2, 0]}>
      <sphereGeometry args={[2500, 60, 40]} attach="geometry" />
      <meshBasicMaterial map={texture} attach="material" side={BackSide} />
    </mesh>
  );
};

export default Environment3d;
