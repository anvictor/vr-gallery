import { useState, useEffect } from "react";

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

export default function useControls(domElement) {
  const [moveState, setMoveState] = useState({
    forward: false,
    backward: false,
    left: false,
    right: false,
  });
  const [mouseDown, setMouseDown] = useState(false);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [keyDown, setkeyDown] = useState(false);
  const [lastTouch, setLastTouch] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleKeyDown = (event) => {
      setkeyDown(true);
      return setMoveState((s) => ({ ...s, [keys[event.code]]: true }));
    };
    const handleKeyUp = (event) => {
      setkeyDown(false);
      return setMoveState((s) => ({ ...s, [keys[event.code]]: false }));
    };
    const handleWheel = (event) => {
      setkeyDown(false);
      setTimeout(() => {
        handleKeyUp ({code:`${event.deltaY < 0 ? "KeyW" : "KeyS"}`});
      }, 200);
      return setMoveState((s) => ({
        ...s,
        [keys[`${event.deltaY < 0 ? "KeyW" : "KeyS"}`]]: true,
      }));
    };
    const handleMouseDown = () => {
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
        setMousePos({ x: dx, y: dy });
      }
    };

    const handleTouchMove = (event) => {
      const touch = event.touches[0];
      const movementX = touch.clientX - lastTouch.x;
      const movementY = touch.clientY - lastTouch.y;
      const dx = -movementX * 0.002;
      const dy = -movementY * 0.002;
      setMousePos({ x: dx, y: dy });
      setLastTouch({ x: touch.clientX, y: touch.clientY });
    };

    document.addEventListener("keydown", handleKeyDown);
    document.addEventListener("keyup", handleKeyUp);
    domElement.addEventListener("mousedown", handleMouseDown);
    document.addEventListener("mouseup", handleMouseUp);
    document.addEventListener("mousemove", handleMouseMove);

    domElement.addEventListener("touchstart", handleMouseDown);
    document.addEventListener("touchend", handleMouseUp);
    document.addEventListener("touchmove", handleTouchMove);

    document.addEventListener("wheel", handleWheel);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.removeEventListener("keyup", handleKeyUp);
      domElement.removeEventListener("mousedown", handleMouseDown);
      document.removeEventListener("mouseup", handleMouseUp);
      document.removeEventListener("mousemove", handleMouseMove);

      domElement.removeEventListener("touchstart", handleMouseDown);
      document.removeEventListener("touchend", handleMouseUp);
      document.removeEventListener("touchmove", handleTouchMove);

      document.removeEventListener("wheel", handleWheel);
    };
  }, [mouseDown, lastTouch]);

  return [moveState, mouseDown, mousePos, keyDown];
}
