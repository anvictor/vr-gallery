import React, { useRef, useEffect } from "react";
import { useLoader } from "@react-three/fiber";
import { TextureLoader, Vector3, Quaternion } from "three";

const Pointer3d = ({ position, normal }) => {
  // if(normal)console.log(`x,y,z, ${Math.round(normal.x)}${Math.round(normal.y)}${Math.round(normal.z)}`)

  // Load the texture using useLoader
  const texture = useLoader(TextureLoader, "logoPointer.png"); // Adjust the path if needed
  const meshRef = useRef();

  useEffect(() => {
    if (normal && meshRef.current) {
      const up = new Vector3(0, 1, 0); // Y-axis
      const quaternion = new Quaternion().setFromUnitVectors(up, normal);
      meshRef.current.quaternion.copy(quaternion);
    }
  }, [normal]);

  return (
    <mesh ref={meshRef} position={position} castShadow={true}>
      <boxGeometry args={[20, 2, 20]} />
      <meshStandardMaterial map={texture} />
    </mesh>
  );
};

export default Pointer3d;
