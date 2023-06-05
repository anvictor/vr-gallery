import { useRef, useEffect, useState } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";
import useControls from "../controls/controls";
import { getPointCloserToEnd } from "../utils";

export default function FirstPersonCamera({ goTo, getIsKeyDown }) {
  const raycaster = new THREE.Raycaster();
  const mouse = new THREE.Vector2();
  let [go, setGo] = useState(goTo);
  const {
    camera,
    scene,
    gl: { domElement },
  } = useThree();
  const cameraRef = useRef();
  const [moveState, mouseDown, mousePos, keyDown] = useControls(domElement);
  camera.position.y = 179;
  camera.far = 2000;
  getIsKeyDown(keyDown);
  useEffect(() => {
    cameraRef.current = camera;
    camera.rotation.order = "YXZ";
    return () => {
      camera.rotation.order = "XYZ";
    };
  }, [camera, domElement]);


  useFrame(() => {
    raycaster.setFromCamera(mouse, camera);
    const intersects = raycaster.intersectObjects(scene.children, true);

    if (intersects.length > 0) {
      // console.log("name", intersects[0].object.name);
    }
    const moveSpeed = 1.5;
    if (mouseDown) {
      camera.rotation.y -= mousePos.x;
      camera.rotation.x -= mousePos.y;
      camera.rotation.x = Math.max(
        -Math.PI / 2,
        Math.min(Math.PI / 2, camera.rotation.x)
      );
    }

    if (goTo) {
      camera.position.x = getPointCloserToEnd(goTo, cameraRef.current.position).x;
      camera.position.z = getPointCloserToEnd(goTo, cameraRef.current.position).z;
    }

    const direction = new THREE.Vector3();
    camera.getWorldDirection(direction);
    if (moveState.forward) {
      camera.position.add(direction.multiplyScalar(moveSpeed));
      camera.position.y = 179;
    }
    if (moveState.backward){
      camera.position.sub(direction.multiplyScalar(moveSpeed));
      camera.position.y = 179;
    }
    const right = new THREE.Vector3();
    right.crossVectors(camera.up, direction).normalize();
    if (moveState.right) camera.position.sub(right.multiplyScalar(moveSpeed));
    if (moveState.left) camera.position.add(right.multiplyScalar(moveSpeed));
  });

  return null;
}
