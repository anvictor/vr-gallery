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
  const pos3d = new THREE.Vector3(1, 0, 0);
  const handleClick = () => {
    pos3d.x = position[0];
    pos3d.y = position[1];
    pos3d.z = position[2];
    getFlyData(pos3d);
  };

  return (
    <group position={position} rotation={rotation} onClick={handleClick}>
      <mesh position={[0, 0, 2]}>
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
      <mesh position={[0, -3, 0.9]}>
        <planeGeometry args={[(width / 10) * 1.15, (height / 10) * 1.15, 2]} />
        <meshBasicMaterial
          attach="material"
          map={shadowTexture}
          transparent={true}
        />
      </mesh>
      <mesh position={[0, 0, 0.9]}>
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
