import React, { useEffect, useState } from "react";

import { createRoot } from "react-dom/client";
import { Canvas } from "@react-three/fiber";
import Room from "./components/Room";
import FirstPersonCamera from "./components/FirstPersonCamera";

const App = () => {
  const [isKeyDown, setisKeyDown] = useState(false);
  const [clickPoint, setClickPoint] = useState(null);
  useEffect(() => {
    if (isKeyDown) setClickPoint(null);
  }, [isKeyDown]);
  return (
    <div
      id="canvas-container"
      style={{ backgroundColor: "grey", height: "500px" }}
    >
      <Canvas>
        <ambientLight intensity={0.1} />
        <directionalLight color="white" position={[0, 0, 5]} />
        <Room getClickPointXYZ={setClickPoint} />
        <FirstPersonCamera goTo={clickPoint} getIsKeyDown={setisKeyDown} />
      </Canvas>
    </div>
  );
};
const root = document.getElementById("root");
if (!root) {
  createRoot(root).render(<App />);
}

export default App;
