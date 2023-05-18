const MeshSphere = () => {
  return (
    <mesh position={[0, 0, 0]} onClick={(e)=>{
      console.log(e);
      e.object.position.x = -10    }}>
      <sphereGeometry/>
      <meshStandardMaterial color="hotpink" />
    </mesh>
  );
};

export default MeshSphere;
