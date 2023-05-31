import React, { useState } from "react";

import { createRoot } from "react-dom/client";
import { Canvas } from "@react-three/fiber";
import Room from "./components/Room";
import FirstPersonCamera from "./components/FirstPersonCamera";

const App = () => {
const [clickPoint, setClickPoint] = useState(null);

  return (
    <div
      id="canvas-container"
      style={{ backgroundColor: "grey", height: "500px" }}
    >
      <Canvas>
        <ambientLight intensity={0.1} />
        <directionalLight color="white" position={[0, 0, 5]} />
        <Room getClickPointXYZ={setClickPoint} />
        <FirstPersonCamera goTo={clickPoint}/>
      </Canvas>
    </div>
  );
};
const root = document.getElementById("root");
if (!root) {
  createRoot(root).render(<App />);
}

export default App;
