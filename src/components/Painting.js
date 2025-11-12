// Painting.js
import React from "react";
import { useTexture } from "@react-three/drei";
import * as THREE from "three";
import Label from "./Label";

const Painting = ({ data, flyToPoint }) => {
  const { position, imageUrl, width, height, rotation, name, author } = data;
  const texture = useTexture(imageUrl);
  const backTexture = useTexture("/vr_gallery/paintings/CanvasBackSide.jpg");
  const shadowTexture = useTexture(
    "/vr_gallery/paintings/SquareShadowBlack.png"
  );
  const brightness = 80;

  const handleClick = (e) => {
    e.stopPropagation();
    const distanceAbsolut = height * 0.0632 + 5.5;
    const sign = rotation[1] === 0 ? 1 : rotation[1] === 1.5708 ? 1 : -1;
    const pos3d = new THREE.Vector3(
      rotation[1] === 1.5708 || rotation[1] === -1.5708
        ? position[0] + sign * distanceAbsolut
        : position[0],
      position[1],
      rotation[1] === 0 || rotation[1] === 3.14159
        ? position[2] + sign * distanceAbsolut
        : position[2]
    );

    flyToPoint(pos3d); // ✅ unified call
  };

  return (
    <group
      position={position}
      rotation={rotation}
      userData={{ data }}
      // onClick={handleClick}
      onPointerUp={handleClick} // works on desktop + mobile
    >
      <mesh position={[0, 0, 2]} name={`painting-${name}`}>
        <boxGeometry args={[width / 10, height / 10, 2]} />
        <meshBasicMaterial
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
        <meshBasicMaterial map={shadowTexture} transparent />
      </mesh>
      <mesh position={[0, 0, 0.9]}>
        <planeGeometry args={[width / 10, height / 10, 2]} />
        <meshBasicMaterial
          map={backTexture}
          side={THREE.BackSide}
          transparent
        />
      </mesh>
      <Label author={author} name={name} width={width} height={height} />
    </group>
  );
};

export default Painting;
