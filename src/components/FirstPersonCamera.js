// FirstPersonCamera.js
import { useRef, useEffect, useState } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";
import useControls from "../controls/controls";
import { getWay, isPointOutsideWalls } from "../utils";
import { polygons } from "../controls/roomBorders";

const ROTATION_SPEED_FACTOR = 100;

const FirstPersonCamera = ({
  cameraReachedPoint,
  goToClickOnFloor, // target point set when clicking floor OR painting
  getIsKeyDown,
}) => {
  const wayRef = useRef([]); // stores the path (array of steps)
  const currentStepRef = useRef(0); // current step index
  const [outside, setOutside] = useState(true);

  const {
    camera,
    gl: { domElement },
    invalidate,
  } = useThree();

  const cameraRef = useRef();
  const prevMouseDownRef = useRef(false);

  // Controls hook gives us movement/rotation states
  const [moveState, mouseDown, mousePos, keyDown, rotateState] =
    useControls(domElement);

  // Initial camera setup
  camera.position.y = 180;
  camera.far = 5000;
  getIsKeyDown(keyDown);

  useEffect(() => {
    cameraRef.current = camera;
    camera.rotation.order = "YXZ";
    camera.updateProjectionMatrix();
    invalidate();
    return () => {
      camera.rotation.order = "YXZ";
    };
  }, [camera, invalidate]);

  useFrame(() => {
    prevMouseDownRef.current = mouseDown;

    const rotationSpeed = 2;
    const moveSpeed = 2;

    // -------------------------------
    // 1. ROTATION LOGIC (requires mouseDown)
    // -------------------------------
    if (mouseDown && (mousePos.x !== 0 || mousePos.y !== 0)) {
      camera.rotation.y -= rotationSpeed * mousePos.x;
      camera.rotation.x -= rotationSpeed * mousePos.y;
      camera.rotation.x = Math.max(
        -Math.PI / 2,
        Math.min(Math.PI / 2, camera.rotation.x)
      );
    }

    // -------------------------------
    // 2. FLIGHT LOGIC (independent of mouseDown)
    // -------------------------------
    if (goToClickOnFloor) {
      // Check if camera reached the target point
      if (
        Math.floor(goToClickOnFloor.x) === Math.floor(camera.position.x) &&
        Math.floor(goToClickOnFloor.z) === Math.floor(camera.position.z)
      ) {
        cameraReachedPoint();
      }

      // Build path only once per request
      if (wayRef.current.length === 0 && currentStepRef.current === 0) {
        const calculatedWay = getWay(camera.position, goToClickOnFloor, 30);
        wayRef.current = calculatedWay;
      }

      // Move camera step by step along the path
      if (wayRef.current.length > currentStepRef.current) {
        const [x, z] = wayRef.current[currentStepRef.current];
        camera.position.x = x;
        camera.position.z = z;
        currentStepRef.current += 1;
      }
      // Reset when finished
      else if (
        wayRef.current.length > 0 &&
        currentStepRef.current >= wayRef.current.length
      ) {
        wayRef.current = [];
        currentStepRef.current = 0;
      }
    }

    // -------------------------------
    // 3. KEYBOARD MOVEMENT LOGIC
    // -------------------------------
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

    // -------------------------------
    // 4. WALL COLLISION CHECK
    // -------------------------------
    setOutside(isPointOutsideWalls(camera.position, polygons));
    if (!outside) {
      camera.position.copy(previousPosition);
    }
  });

  return null;
};

export default FirstPersonCamera;
