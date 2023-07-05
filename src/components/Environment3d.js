import React from "react";
import { TextureLoader, BackSide } from "three";
import { useLoader } from "@react-three/fiber";

const Environment3d = () => {
  const texture = useLoader(TextureLoader, "/room/Barcelona3d.jpg");

  return (
    <mesh rotation={[0, -0.2, 0]}>
      <sphereBufferGeometry
        args={[2500, 60, 40]}
        attach="geometry"
        
      />
      <meshBasicMaterial map={texture} attach="material" side={BackSide} />
    </mesh>
  );
};

export default Environment3d;
