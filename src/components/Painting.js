import React from "react";
import { useTexture } from "@react-three/drei";
import * as THREE from "three";
import Label from "./Label";

const Painting = ({ data, getFlyData }) => {
  const { position, imageUrl, width, height, rotation, name, author } = data;
  const texture = useTexture(imageUrl);
  const backTexture = useTexture("/vr_gallery/paintings/CanvasBackSide.jpg");
  const shadowTexture = useTexture(
    "/vr_gallery/paintings/SquareShadowBlack.png"
  );
  const brightness = 80;

  return (
    <group position={position} rotation={rotation} userData={{ data }}>
      <mesh position={[0, 0, 2]} userData={{ data }} name={`painting-${name}`}>
        <boxGeometry args={[width / 10, height / 10, 2]} />
        <meshBasicMaterial
          attach="material"
          map={texture}
          side={THREE.FrontSide}
          color={
            new THREE.Color(
              `rgb(${brightness}%, ${brightness}%, ${brightness}%)`
            )
          }
        />
      </mesh>
      <mesh position={[0, -3, 0.9]} userData={{ data }}>
        <planeGeometry args={[(width / 10) * 1.15, (height / 10) * 1.15, 2]} />
        <meshBasicMaterial
          attach="material"
          map={shadowTexture}
          transparent={true}
        />
      </mesh>
      <mesh position={[0, 0, 0.9]} userData={{ data }}>
        <planeGeometry args={[width / 10, height / 10, 2]} />
        <meshBasicMaterial
          attach="material"
          map={backTexture}
          side={THREE.BackSide}
          transparent={true}
        />
      </mesh>
      <Label author={author} name={name} width={width} height={height} />
    </group>
  );
};
export default Painting;
