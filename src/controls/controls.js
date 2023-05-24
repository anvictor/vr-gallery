import { useState, useEffect } from 'react'
import { useThree } from '@react-three/fiber'
import { Euler } from 'three'

export function useControls() {
  const { gl, camera } = useThree()
  const [moveForward, setMoveForward] = useState(false)
  const [moveBackward, setMoveBackward] = useState(false)
  const [moveLeft, setMoveLeft] = useState(false)
  const [moveRight, setMoveRight] = useState(false)
  const [rotation, setRotation] = useState(new Euler(0, 0, 0, 'YXZ'))

  const onMouseMove = (event) => {
    const movementX = event.movementX || event.mozMovementX || event.webkitMovementX || 0
    const movementY = event.movementY || event.mozMovementY || event.webkitMovementY || 0

    rotation.y -= movementX * 0.002
    rotation.x -= movementY * 0.002
    rotation.x = Math.max(- Math.PI / 2, Math.min(Math.PI / 2, rotation.x))

    setRotation(rotation.clone())
  }

  const onKeyDown = (event) => {
    switch (event.keyCode) {
      case 87: // w
      case 38: // up
        setMoveForward(true)
        break
      case 65: // a
      case 37: // left
        setMoveLeft(true)
        break
      case 83: // s
      case 40: // down
        setMoveBackward(true)
        break
      case 68: // d
      case 39: // right
        setMoveRight(true)
        break
    }
  }

  const onKeyUp = (event) => {
    switch (event.keyCode) {
      case 87: // w
      case 38: // up
        setMoveForward(false)
        break
      case 65: // a
      case 37: // left
        setMoveLeft(false)
        break
      case 83: // s
      case 40: // down
        setMoveBackward(false)
        break
      case 68: // d
      case 39: // right
        setMoveRight(false)
        break
    }
  }

  useEffect(() => {
    gl.domElement.ownerDocument.addEventListener('mousemove', onMouseMove, false)
    gl.domElement.ownerDocument.addEventListener('keydown', onKeyDown, false)
    gl.domElement.ownerDocument.addEventListener('keyup', onKeyUp, false)

    return () => {
      gl.domElement.ownerDocument.removeEventListener('mousemove', onMouseMove, false)
      gl.domElement.ownerDocument.removeEventListener('keydown', onKeyDown, false)
      gl.domElement.ownerDocument.removeEventListener('keyup', onKeyUp, false)
    }
  }, [gl.domElement.ownerDocument, camera])

  return [moveForward, moveBackward, moveLeft, moveRight, rotation]
}
