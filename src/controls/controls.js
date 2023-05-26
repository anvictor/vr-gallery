import { useState, useEffect } from "react";

const keys = {
  w: "forward",
  a: "left",
  s: "backward",
  d: "right",
  ArrowUp: "forward",
  ArrowDown: "backward",
  ArrowLeft: "left",
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

  useEffect(() => {
    const handleKeyDown = (event) =>
      setMoveState((s) => ({ ...s, [keys[event.key]]: true }));
    const handleKeyUp = (event) =>
      setMoveState((s) => ({ ...s, [keys[event.key]]: false }));
    const handleMouseDown = () =>{
      console.log('Down');
      setMouseDown(true);
    } 
    const handleMouseUp = () => {
      console.log('Up');
      setMouseDown(false);
      setMousePos({ x: 0, y: 0 });
    };
    const handleMouseMove = (event) => {
      console.log('Move');

      if (mouseDown) {
        const dx = event.movementX * 0.002;
        const dy = event.movementY * 0.002;
        setMousePos({ x: dx, y: dy });
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("keyup", handleKeyUp);
    domElement.addEventListener("mousedown", handleMouseDown);
    domElement.addEventListener("mouseup", handleMouseUp);
    domElement.addEventListener("mousemove", handleMouseMove);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("keyup", handleKeyUp);
      domElement.removeEventListener("mousedown", handleMouseDown);
      domElement.removeEventListener("mouseup", handleMouseUp);
      domElement.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  return [moveState, mouseDown, mousePos];
}
