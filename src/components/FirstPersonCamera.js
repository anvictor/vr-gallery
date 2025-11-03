import { useRef, useEffect, useState } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";
import useControls from "../controls/controls";
import { getWay, isPointOutsideWalls } from "../utils";
import { polygons } from "../controls/roomBorders";

const ROTATION_SPEED_FACTOR = 100;
const FirstPersonCamera = ({
  cameraReachedPoint,
  goToClickOnFloor,
  getIsKeyDown,
  getFlyData,
}) => {
  // const raycaster = new THREE.Raycaster(); // no longer used for paintings
  const wayRef = useRef([]);
  const [outside, setOutside] = useState(true);
  const currentStepRef = useRef(0);

  const {
    camera,
    // scene,
    gl: { domElement },
    invalidate,
  } = useThree();
  const cameraRef = useRef();
  const prevMouseDownRef = useRef(false);
  // const clickRaycastFramesRef = useRef(0);
  const [
    moveState,
    mouseDown,
    mousePos,
    keyDown,
    rotateState,
    // resetMousePos,
    // mouse, // ✅ додаємо
  ] = useControls(domElement);

  camera.position.y = 180;
  camera.far = 5000;
  getIsKeyDown(keyDown);

  useEffect(() => {
    cameraRef.current = camera;
    camera.rotation.order = "YXZ";
    // Ensure far plane applies immediately and render a frame
    camera.far = 5000;
    camera.updateProjectionMatrix();
    invalidate();
    return () => {
      camera.rotation.order = "YXZ";
    };
  }, [camera, invalidate]);

  useFrame(() => {
    // Painting clicks are handled by Painting.onClick now; keep only rotation here
    prevMouseDownRef.current = mouseDown;

    const rotationSpeed = 2;
    const moveSpeed = 2;
    if (mouseDown && (mousePos.x !== 0 || mousePos.y !== 0)) {
      camera.rotation.y -= rotationSpeed * mousePos.x;
      camera.rotation.x -= rotationSpeed * mousePos.y;
      camera.rotation.x = Math.max(
        -Math.PI / 2,
        Math.min(Math.PI / 2, camera.rotation.x)
      );
    }

    if (goToClickOnFloor) {
      if (
        Math.floor(goToClickOnFloor.x) === Math.floor(camera.position.x) &&
        Math.floor(goToClickOnFloor.z) === Math.floor(camera.position.z)
      ) {
        cameraReachedPoint();
      }
      // Only calculate the way once per goToClickOnFloor request
      if (wayRef.current.length === 0 && currentStepRef.current === 0) {
        const calculatedWay = getWay(camera.position, goToClickOnFloor, 30);
        wayRef.current = calculatedWay;
      }

      // Move the camera along the way if there's more to go
      if (wayRef.current.length > currentStepRef.current) {
        const [x, z] = wayRef.current[currentStepRef.current];
        camera.position.x = x;
        camera.position.z = z;
        currentStepRef.current += 1;
      }
      // If we've finished the journey, reset the state
      else if (
        wayRef.current.length > 0 &&
        currentStepRef.current >= wayRef.current.length
      ) {
        wayRef.current = [];
        currentStepRef.current = 0;
      }
    }

    const direction = new THREE.Vector3();
    camera.getWorldDirection(direction);

    const previousPosition = camera.position.clone();

    const right = new THREE.Vector3();
    right.crossVectors(camera.up, direction).normalize();

    if (moveState.forward) {
      camera.position.add(direction.multiplyScalar(moveSpeed));
      camera.position.y = 180;
    }
    if (moveState.backward) {
      camera.position.sub(direction.multiplyScalar(moveSpeed));
      camera.position.y = 180;
    }
    if (moveState.right) camera.position.sub(right.multiplyScalar(moveSpeed));
    if (moveState.left) camera.position.add(right.multiplyScalar(moveSpeed));
    if (rotateState.rotateLeft) {
      camera.rotation.y += rotationSpeed / ROTATION_SPEED_FACTOR;
    }
    if (rotateState.rotateRight) {
      camera.rotation.y -= rotationSpeed / ROTATION_SPEED_FACTOR;
    }

    setOutside(isPointOutsideWalls(camera.position, polygons));
    if (!outside) {
      // If we are inside a polygon, reset to the previous position
      camera.position.copy(previousPosition);
    }
  });

  return null;
};
export default FirstPersonCamera;
