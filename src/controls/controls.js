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

  useEffect(() => {
    const handleKeyDown = (event) => {
        setkeyDown(true);
        return setMoveState((s) => ({ ...s, [keys[event.code]]: true }));
    };
    const handleKeyUp = (event) => {
      setkeyDown(false);
      return setMoveState((s) => ({ ...s, [keys[event.code]]: false }));
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
    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("keyup", handleKeyUp);
    domElement.addEventListener("mousedown", handleMouseDown);
    document.addEventListener("mouseup", handleMouseUp);
    document.addEventListener("mousemove", handleMouseMove);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("keyup", handleKeyUp);
      domElement.removeEventListener("mousedown", handleMouseDown);
      document.removeEventListener("mouseup", handleMouseUp);
      document.removeEventListener("mousemove", handleMouseMove);
    };
  }, [mouseDown]);

  return [moveState, mouseDown, mousePos, keyDown];
}
