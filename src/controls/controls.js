import { useState, useEffect } from "react";

export function useControls() {
  const [moveForward, setMoveForward] = useState(false);
  const [moveBackward, setMoveBackward] = useState(false);
  const [moveLeft, setMoveLeft] = useState(false);
  const [moveRight, setMoveRight] = useState(false);
  const [rotation, setRotation] = useState({ x: 0, y: 0 });
  const [mouseDown, setMouseDown] = useState(false) // Track the state of the mouse button

  useEffect(() => {
    const handleKeyDown = (e) => {

      switch (e.keyCode) {
        case 87: // w
        case 38: // up
          setMoveForward(true);
          break;
        case 65: // a
        case 37: // left
          setMoveLeft(true);
          break;
        case 83: // s
        case 40: // down
          setMoveBackward(true);
          break;
        case 68: // d
        case 39: // right
          setMoveRight(true);
          break;
      }
    };

    const handleKeyUp = (e) => {
      switch (e.keyCode) {
        case 87: // w
        case 38: // up
          setMoveForward(false);
          break;
        case 65: // a
        case 37: // left
          setMoveLeft(false);
          break;
        case 83: // s
        case 40: // down
          setMoveBackward(false);
          break;
        case 68: // d
        case 39: // right
          setMoveRight(false);
          break;
      }
    };

    const handleMouseDown = () => {
        setMouseDown(true)
      }
  
      const handleMouseUp = () => {
        setMouseDown(false)
      }
  
      const handleMouseMove = (e) => {
        if (mouseDown) { // Only update the rotation if the mouse button is pressed
          const movementX = e.movementX || e.mozMovementX || e.webkitMovementX || 0
          const movementY = e.movementY || e.mozMovementY || e.webkitMovementY || 0
  
          setRotation((rotation) => ({
            ...rotation,
            y: rotation.y + movementX * 0.002,
            x: Math.max(Math.min(rotation.x + movementY * 0.002, Math.PI / 2), -Math.PI / 2),
          }))
        }
      }
  
      window.addEventListener('keydown', handleKeyDown)
      window.addEventListener('keyup', handleKeyUp)
      window.addEventListener('mousedown', handleMouseDown)
      window.addEventListener('mouseup', handleMouseUp)
      window.addEventListener('mousemove', handleMouseMove)
  
      return () => {
        window.removeEventListener('keydown', handleKeyDown)
        window.removeEventListener('keyup', handleKeyUp)
        window.removeEventListener('mousedown', handleMouseDown)
        window.removeEventListener('mouseup', handleMouseUp)
        window.removeEventListener('mousemove', handleMouseMove)
      }
    }, [mouseDown]) // Add mouseDown as a dependency so that the event handlers are updated when its value changes
  
    return [moveForward, moveBackward, moveLeft, moveRight, rotation]
  }