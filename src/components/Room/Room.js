import React from 'react';
import { useLoader } from "@react-three/fiber";
import { OBJLoader } from "three/examples/jsm/loaders/OBJLoader";
import { TextureLoader } from "three/src/loaders/TextureLoader";
import {Textures as getTextures} from '../utils';

const Room = () => {
const Textures = getTextures(useLoader, TextureLoader);

  const room = useLoader(OBJLoader, "/room/room.obj");
  room.position.x = 0;
  room.position.y = -175;
  room.position.z = 10;
  room.traverse((child) => {
    

if (child.isMesh && child.name && Textures) {
      child.material.map = Textures[child.name].colorMap;
      child.material.displacementMap = Textures[child.name].displacementMap;
      child.material.normalMap = Textures[child.name].normalMap;
      child.material.roughnessMap = Textures[child.name].roughnessMap;
      child.material.aoMap = Textures[child.name].aoMap;
    }
  });
  const roomRef = React.useRef();
 
  return <primitive object={room} ref={roomRef} />;
};
export default Room;
