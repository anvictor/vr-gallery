import { useState, useEffect, useRef } from "react";
const SENSITIVITY = 0.002;

// Movement keys (WASD + arrows)
const keys = {
  KeyW: "forward",
  ArrowUp: "forward",
  KeyS: "backward",
  ArrowDown: "backward",
  KeyA: "left",
  ArrowLeft: "left",
  KeyD: "right",
  ArrowRight: "right",
};

// Rotation keys
const rotationKeys = {
  KeyQ: "rotateLeft",
  KeyE: "rotateRight",
};

const useControls = (domElement) => {
  const [moveState, setMoveState] = useState({
    forward: false,
    backward: false,
    left: false,
    right: false,
  });

  const [rotateState, setRotateState] = useState({
    rotateLeft: false,
    rotateRight: false,
  });

  const resetMousePos = () => setMousePos({ x: 0, y: 0 });

  const [mouseDown, setMouseDown] = useState(false);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [keyDown, setKeyDown] = useState(false);
  const lastTouch = useRef({ x: 0, y: 0 });

  const handleKeyDown = (event) => {
    if (event.code === "ArrowDown") {
      event.preventDefault(); // зупиняє прокрутку
      event.stopPropagation(); // зупиняє передачу іншим скриптам
    }

    const shiftKey = event.shiftKey;
    const key =
      shiftKey && event.code === "ArrowLeft"
        ? "KeyQ"
        : shiftKey && event.code === "ArrowRight"
        ? "KeyE"
        : event.code;

    setKeyDown(true);

    const direction = keys[key];
    const rotation = rotationKeys[key];

    if (direction) {
      setMoveState((s) => ({ ...s, [direction]: true }));
    }

    if (rotation) {
      setRotateState((r) => ({ ...r, [rotation]: true }));
    }
  };

  const handleKeyUp = (event) => {
    setKeyDown(false);

    setMoveState({
      forward: false,
      backward: false,
      left: false,
      right: false,
    });

    setRotateState({ rotateLeft: false, rotateRight: false });
  };

  const handleWheel = (event) => {
    setKeyDown(false);
    const direction = event.deltaY < 0 ? "forward" : "backward";
    setMoveState((s) => ({ ...s, [direction]: true }));
    setTimeout(() => {
      setMoveState((s) => ({ ...s, [direction]: false }));
    }, 200);
  };

  const handleMouseDown = (event) => {
    let startPosition = { x: 0, y: 0 };
    if (event.touches && event.touches.length > 0) {
      startPosition = {
        x: event.touches[0].clientX,
        y: event.touches[0].clientY,
      };
    } else {
      startPosition = {
        x: event.clientX,
        y: event.clientY,
      };
    }
    lastTouch.current = startPosition;
    setMouseDown(true);
  };

  const handleMouseUp = () => {
    setMouseDown(false);
    setMousePos({ x: 0, y: 0 });
  };
  const handleMouseMove = (event) => {
    if (mouseDown) {
      const dx = -event.movementX * 0.002;
      const dy = -event.movementY * 0.002;
      // console.log(event.movementX, event.movementY);
      setMousePos({ x: dx, y: dy });
    }
  };
  const handleTouchMove = (event) => {
    if (event.touches.length !== 1) return;
    const touch = event.touches[0];
    const movementX = touch.clientX - lastTouch.current.x;
    const movementY = touch.clientY - lastTouch.current.y;
    const dx = -movementX * SENSITIVITY;
    const dy = -movementY * SENSITIVITY;

    setMousePos({ x: dx, y: dy });
    lastTouch.current = { x: touch.clientX, y: touch.clientY };
  };
  const handleTouchEnd = () => {
    setMouseDown(false);
    // setMousePos({ x: 0, y: 0 });
  };
  useEffect(() => {
    document.addEventListener("keydown", handleKeyDown);
    document.addEventListener("keyup", handleKeyUp);
    domElement.addEventListener("mousedown", handleMouseDown);
    document.addEventListener("mouseup", handleMouseUp);
    document.addEventListener("mousemove", handleMouseMove);

    domElement.addEventListener("touchstart", handleMouseDown);
    document.addEventListener("touchend", handleTouchEnd);
    document.addEventListener("touchmove", handleTouchMove);

    document.addEventListener("wheel", handleWheel);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.removeEventListener("keyup", handleKeyUp);
      domElement.removeEventListener("mousedown", handleMouseDown);
      document.removeEventListener("mouseup", handleMouseUp);
      document.removeEventListener("mousemove", handleMouseMove);

      domElement.removeEventListener("touchstart", handleMouseDown);
      document.removeEventListener("touchend", handleTouchEnd);
      document.removeEventListener("touchmove", handleTouchMove);

      document.removeEventListener("wheel", handleWheel);
    };
    // eslint-disable-next-line
  }, [mouseDown, lastTouch]);
  // console.log(mouseDown, mousePos.x);
  return [moveState, mouseDown, mousePos, keyDown, rotateState, resetMousePos];
};
export default useControls;
