import React, { useRef, useEffect } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import * as THREE from 'three';
import useControls from '../controls/controls';

export default function FirstPersonCamera() {
  const {
    camera,
    gl: { domElement },
  } = useThree();
  const cameraRef = useRef();
  const [moveState, mouseDown, mousePos] = useControls(domElement);
  
  useEffect(() => {
    const canvas = domElement;
    cameraRef.current = camera;
    camera.rotation.order = 'YXZ';
    return () => {
      camera.rotation.order = 'XYZ';
    };
  }, [camera, domElement]);

  useFrame(() => {
    const moveSpeed = 1.5;
    if (mouseDown) {
      camera.rotation.y -= mousePos.x;
      camera.rotation.x -= mousePos.y;
      camera.rotation.x = Math.max(-Math.PI / 2, Math.min(Math.PI / 2, camera.rotation.x));
    }
    const direction = new THREE.Vector3();
    camera.getWorldDirection(direction);
    if (moveState.forward) camera.position.add(direction.multiplyScalar(moveSpeed));
    if (moveState.backward) camera.position.sub(direction.multiplyScalar(moveSpeed));
    const right = new THREE.Vector3();
    right.crossVectors(camera.up, direction).normalize();
    if (moveState.right) camera.position.add(right.multiplyScalar(moveSpeed));
    if (moveState.left) camera.position.sub(right.multiplyScalar(moveSpeed));
  });

  return null;
}
