import { useRef, useEffect, useState } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";
import useControls from "../controls/controls";
import { getPointCloserToEnd, getWay, pointIsOutsideWalls } from "../utils";
import { polygons } from "../controls/roomBorders";

export default function FirstPersonCamera({ goTo, getIsKeyDown }) {
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
  const [moveState, mouseDown, mousePos, keyDown] = useControls(domElement);

  camera.position.y = 180;
  camera.far = 5000;
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
    }

    if (goTo) {
      const startPosition = camera.position;
      const finishPosition = getPointCloserToEnd(goTo, startPosition, 10);

      // Only calculate the way once per goTo request
      if (way.length === 0 && currentStep === 0) {
        const calculatedWay = getWay(startPosition, finishPosition, 30);
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
    setOutside(pointIsOutsideWalls(camera.position, polygons));
    if (!outside) {
      // If we are inside a polygon, reset to the previous position
      camera.position.copy(previousPosition);
    }
  });

  return null;
}
