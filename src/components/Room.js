import React, { useState } from "react";
import { useLoader, useThree } from "@react-three/fiber";
import { OBJLoader } from "three/examples/jsm/loaders/OBJLoader";
import { TextureLoader } from "three/src/loaders/TextureLoader";
import { Textures as getTextures, getDiagonal } from "../utils";
import * as THREE from "three";

const Room = ({
  getClickPointXYZ,
  // getPointerPos,
  getPointerNormal,
}) => {
  const {
    raycaster,
    camera,
    // mouse,
    gl: { domElement },
  } = useThree();
  const Textures = getTextures(useLoader, TextureLoader);
  const [startDelta, setstartDelta] = useState(null);
  const room = useLoader(OBJLoader, process.env.PUBLIC_URL + "/room/room.obj");

  room.position.set(85, 0, -59);

  room.traverse((child) => {
    if (!child.isMesh || !child.name) return;

    const tex = Textures[child.name];
    if (!tex || !child.material) return;

    child.material.map = tex.colorMap || null;
    child.material.displacementMap = tex.displacementMap || null;
    child.material.normalMap = tex.normalMap || null;
    child.material.roughnessMap = tex.roughnessMap || null;
    child.material.aoMap = tex.aoMap || null;
    child.material.needsUpdate = true;
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
      const isFloor = intersects[0].object.name === "Floor_5_FlMtl";
      const endDelta = intersects[0].point;
      const diagonal = getDiagonal(startDelta, endDelta);
      if (diagonal < 15 && isFloor) {
        getClickPointXYZ(endDelta);
      } else {
        getClickPointXYZ(null);
      }
    }
  };
  const handlePointerMove = (event) => {
    const normalizedPoint = getNormalizedPoint(event, domElement);
    raycaster.setFromCamera(normalizedPoint, camera);
    const intersects = raycaster.intersectObjects(
      roomRef.current.children,
      true
    );
    if (intersects.length > 0) {
      //   if(intersects[0].object.name!=='Wall_Outside_11_Noneb'){
      //     getPointerNormal(intersects[0].face.normal);
      //     getPointerPos(intersects[0].point);
      //   }
    }
  };

  return (
    <primitive
      object={room}
      ref={roomRef}
      onPointerDown={handlePointerDown}
      onPointerUp={handlePointerUp}
      onPointerMove={handlePointerMove}
    />
  );
};
export default Room;
