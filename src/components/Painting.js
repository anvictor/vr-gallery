import React from 'react';
import { useTexture } from '@react-three/drei';

const Painting = ({ width, height, imageUrl, position }) => {
  const texture = useTexture(imageUrl);

  return (
    <mesh position={position}>
      <planeBufferGeometry attach="geometry" args={[width, height]} />
      <meshBasicMaterial attach="material" map={texture} />
    </mesh>
  );
};
export default Painting;
