import React from "react";

import { createRoot } from "react-dom/client";
import { Canvas, useThree, useFrame } from "@react-three/fiber";
import Room from "./components/Room/Room";
import { PointerLockControls } from "@react-three/drei";
import usePlayerControls from "./controls/UsePlayerControls";
import { speed } from "./components/utils";

const Controls = () => {
  const { camera, clock } = useThree();
  const { forward, backward, left, right } = usePlayerControls();
  
  useFrame(() => {
    console.log(
      `${forward ? "forward" : ""}${backward ? "backward" : ""}${
        left ? "left" : ""
      }${right ? "right" : ""}`
    );
    const delta = clock.getDelta()*10000;
    console.log('delta', delta);
    camera.position.x +=
      (right ? 1 : 0) * delta * speed - (left ? 1 : 0) * delta * speed;
    camera.position.z +=
      (backward ? 1 : 0) * delta * speed - (forward ? 1 : 0) * delta * speed;
  });

  return <PointerLockControls />;
};

function App() {
  return (
    <div
      id="canvas-container"
      style={{ backgroundColor: "grey", height: "500px" }}
    >
      <Canvas>
        <ambientLight intensity={0.1} />
        <directionalLight color="white" position={[0, 0, 5]} />
        <Room />
        <Controls />
      </Canvas>
    </div>
  );
}
const root = document.getElementById("root");
if (!root) {
  createRoot(root).render(<App />);
}

export default App;
