import { useRef } from 'react'
import { useFrame, useThree } from '@react-three/fiber'
import { Vector3 } from 'three'
import { useControls } from '../controls/controls'

export default function FirstPersonCamera() {
  const { camera } = useThree()
  const ref = useRef()
  const [moveForward, moveBackward, moveLeft, moveRight, rotation] = useControls()

  const velocity = new Vector3()
  const direction = new Vector3()

  useFrame((_, delta) => {
    direction.z = Number(moveForward) - Number(moveBackward)
    direction.x = Number(moveRight) - Number(moveLeft)
    direction.normalize()

    velocity.x -= velocity.x * 10.0 * delta
    velocity.z -= velocity.z * 10.0 * delta
    velocity.add(direction.multiplyScalar(400.0 * delta))

    ref.current.translateX(velocity.x * delta)
    ref.current.translateZ(velocity.z * delta)
    ref.current.rotation.y = rotation.y

    // Lock the x-axis rotation to prevent roll
    ref.current.rotation.x = Math.max(-Math.PI / 2, Math.min(Math.PI / 2, rotation.x))

    camera.position.copy(ref.current.position)
    camera.rotation.copy(ref.current.rotation)
  })

  return (
    <group ref={ref}>
      <perspectiveCamera
        makeDefault
        fov={75}
        aspect={window.innerWidth / window.innerHeight}
        near={0.1}
        far={1000}
        position={[0, 2, 5]} // Setting y to 2 to avoid ground level view.
      />
    </group>
  )
}
