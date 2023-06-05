import React, { useState } from "react";
import { useLoader, useThree } from "@react-three/fiber";
import { OBJLoader } from "three/examples/jsm/loaders/OBJLoader";
import { TextureLoader } from "three/src/loaders/TextureLoader";
import { Textures as getTextures, getDiagonal } from "../utils";
import * as THREE from "three";

const Room = ({ getClickPointXYZ }) => {
  const {
    raycaster,
    camera,
    mouse,
    gl: { domElement },
  } = useThree();
  const Textures = getTextures(useLoader, TextureLoader);
  const [startDelta, setstartDelta] = useState(null);
  const room = useLoader(OBJLoader, "/room/room.obj");
  room.position.x = 85;
  room.position.y = 0;
  room.position.z = -59;
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
  const handlePointerDown = (event) => {
    const normalizedPoint = getNormalizedPoint(event, domElement);
    raycaster.setFromCamera(normalizedPoint, camera);
    const intersects = raycaster.intersectObjects(
      roomRef.current.children,
      true
    );
    if (intersects.length > 0) {
      setstartDelta(intersects[0].point);
    }
  };
  function getNormalizedPoint(event, domElement) {
    const rect = domElement.getBoundingClientRect();
    return new THREE.Vector2(
      ((event.clientX - rect.left) / rect.width) * 2 - 1,
      -((event.clientY - rect.top) / rect.height) * 2 + 1
    );
  }
  const handlePointerUp = (event) => {
    const normalizedPoint = getNormalizedPoint(event, domElement);
    raycaster.setFromCamera(normalizedPoint, camera);
    const intersects = raycaster.intersectObjects(
      roomRef.current.children,
      true
    );
    if (intersects.length > 0) {
      const endDelta = intersects[0].point;
      const diagonal = getDiagonal(startDelta, endDelta);
      if (diagonal < 15) {
        getClickPointXYZ(endDelta);
      } else {
        getClickPointXYZ(null);
      }
    }
  };

  return (
    <primitive
      object={room}
      ref={roomRef}
      onPointerDown={(e) => handlePointerDown(e)}
      onPointerUp={(e) => handlePointerUp(e)}
    />
  );
};
export default Room;
