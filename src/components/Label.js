import React from "react";
import {  Text } from "@react-three/drei";

const Label = ({ author, name, width, height }) => {
  return (
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
  );
};
export default Label;
