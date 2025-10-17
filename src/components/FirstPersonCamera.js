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
}) => {
  const raycaster = new THREE.Raycaster();
  const mouse = new THREE.Vector2();
  const [way, setWay] = useState([]);
  const [outside, setOutside] = useState(true);

  const [currentStep, setCurrentStep] = useState(0);

  const {
    camera,
    scene,
    gl: { domElement },
  } = useThree();
  const cameraRef = useRef();
  const [moveState, mouseDown, mousePos, keyDown, rotateState, resetMousePos] =
    useControls(domElement);
  camera.position.y = 180;
  camera.far = 5000;
  getIsKeyDown(keyDown);

  useEffect(() => {
    cameraRef.current = camera;
    camera.rotation.order = "YXZ"; // ✅ встановлюємо правильний порядок
    return () => {
      camera.rotation.order = "YXZ"; // залишаємо як було
    };
  }, [camera]);

  useFrame(() => {
    raycaster.setFromCamera(mouse, camera);
    const intersects = raycaster.intersectObjects(scene.children, true);
    const rotationSpeed = 2;
    if (intersects.length > 0) {
      // const firstIntersection = intersects[0];
      // console.log("firstIntersection:", firstIntersection);
      // console.log("Intersection point:", firstIntersection.point);
      // console.log("Intersection normal:", firstIntersection.face.normal);
    }
    const moveSpeed = 2;
    if (mouseDown) {
      camera.rotation.y -= rotationSpeed * mousePos.x;
      camera.rotation.x -= rotationSpeed * mousePos.y;
      camera.rotation.x = Math.max(
        -Math.PI / 2,
        Math.min(Math.PI / 2, camera.rotation.x)
      );
      resetMousePos(); // ✅ тепер доступно
    }

    if (goToClickOnFloor) {
      if (
        Math.floor(goToClickOnFloor.x) === Math.floor(camera.position.x) &&
        Math.floor(goToClickOnFloor.z) === Math.floor(camera.position.z)
      ) {
        cameraReachedPoint();
      }
      // Only calculate the way once per goToClickOnFloor request
      if (way.length === 0 && currentStep === 0) {
        // const calculatedWay = getWay(startPosition, finishPosition, 30);
        const calculatedWay = getWay(camera.position, goToClickOnFloor, 30);
        setWay(calculatedWay);
      }

      // Move the camera along the way if there's more to go
      if (way.length > currentStep) {
        const [x, z] = way[currentStep];
        camera.position.x = x;
        camera.position.z = z;
        setCurrentStep(currentStep + 1);
      }
      // If we've finished the journey, reset the state
      else if (way.length > 0 && currentStep >= way.length) {
        setWay([]);
        setCurrentStep(0);
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
