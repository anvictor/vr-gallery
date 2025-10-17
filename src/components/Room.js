import React, { useState } from "react";
import { useLoader, useThree } from "@react-three/fiber";
import { OBJLoader } from "three/examples/jsm/loaders/OBJLoader";
import { TextureLoader } from "three/src/loaders/TextureLoader";
import { Textures as getTextures, getDiagonal } from "../utils";
import * as THREE from "three";

const Room = ({ getClickPointXYZ, 
  // getPointerPos, 
  getPointerNormal 
}) => {

  const {
    raycaster,
    camera,
    // mouse,
    gl: { domElement },
  } = useThree();
  const Textures = getTextures(useLoader, TextureLoader);
  const [startDelta, setstartDelta] = useState(null);
  const room = useLoader(OBJLoader, "/vr_gallery/room/room.obj");
  room.position.x = 85;
  room.position.y = 0;
  room.position.z = -59;
  room.traverse((child) => {
    if (child.name === "Wall_Outside_11_None") {
      child.side = THREE.FrontSide;
      child.isMesh = true;
    }
    if ( child.name && Textures) {
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
      // const x= Math.round(intersects[0].point.x)
      // const y= Math.round(intersects[0].point.y)
      // const z= Math.round(intersects[0].point.z)
      // console.log('x, y, z',x,y,z); // xyz
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
