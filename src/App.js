import React from "react";

import { createRoot } from "react-dom/client";
import { Canvas } from "@react-three/fiber";
import Room from "./components/Room";
import FirstPersonCamera from "./components/FirstPersonCamera";

const App = () => {

  return (
    <div
      id="canvas-container"
      style={{ backgroundColor: "grey", height: "500px" }}
    >
      <Canvas style={{ touchAction: 'none' }}>
        <ambientLight intensity={0.1} />
        <directionalLight color="white" position={[0, 0, 5]} />
        <Room />
        <FirstPersonCamera  />
      </Canvas>
    </div>
  );
};
const root = document.getElementById("root");
if (!root) {
  createRoot(root).render(<App />);
}

export default App;
