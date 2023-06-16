import React from "react";
import { useLoader } from "@react-three/fiber";
import { TextureLoader } from "three";

const Pointer3d = ({ position, normal }) => {
  console.log("normal", normal);
  // Load the texture using useLoader
  const texture = useLoader(TextureLoader, "logo512.png"); // Adjust the path if needed

  return (
    <mesh position={position} castShadow={true}>
      <boxGeometry args={[20, 2, 20]} />
      <meshStandardMaterial map={texture} />{" "}
      {/* Assign the loaded texture as a map */}
    </mesh>
  );
};

export default Pointer3d;
