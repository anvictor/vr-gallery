import React from "react";
import { useTexture } from "@react-three/drei";
import * as THREE from "three";

const Painting = ({ width, height, imageUrl, position }) => {
  const texture = useTexture(imageUrl);
  const backTexture = useTexture("/paintings/Marker.png");


  return (
    <mesh position={position}>
      <boxGeometry args={[width/10, height/10, 2]} />
   
      <meshBasicMaterial attachArray="material" map={texture} side={THREE.FrontSide} />
  
    </mesh>
  );
};
export default Painting;

