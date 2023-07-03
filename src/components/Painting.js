import React from "react";
import { useTexture, Text } from "@react-three/drei";
import * as THREE from "three";

const Painting = ({ data }) => {
  const { position, imageUrl, width, height, rotation, name, author } = data;
  const texture = useTexture(imageUrl);
  const backTexture = useTexture("/paintings/CanvasBackSide.jpg");
  const shadowTexture = useTexture("/paintings/SquareShadowBlack.png");
  const brightness = 80;

  return (
    <group position={position} rotation={rotation}>
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
      <group position={[width / 20 + 15, 2.5, 2]}>
        <mesh>
          <planeGeometry args={[15, 5, 1]} />
          <meshBasicMaterial color="black" />
        </mesh>
        <Text
          position={[0, 0, 0.1]}
          scale={[1, 1, 1]}
          color="white" // default
          anchorX="center" // default
          anchorY="middle" // default
        >
          {`${author}
${name}
${width} x ${height}`}
        </Text>
      </group>
    </group>
  );
};
export default Painting;
