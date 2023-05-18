const MeshBox = () => {
  return (
    <mesh position={[10, 0, 0]}>
      <boxGeometry />
      <meshStandardMaterial />
    </mesh>
  );
};

export default MeshBox;
