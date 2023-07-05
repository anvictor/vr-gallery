import React, { useEffect, useState } from "react";

import { createRoot } from "react-dom/client";
import { Canvas, useThree } from "@react-three/fiber";
import Room from "./components/Room";
import FirstPersonCamera from "./components/FirstPersonCamera";
import Pointer3d from "./components/Pointer3d";
import Painting from "./components/Painting";
import Paintings from "./components/Paintings.json";
import MonitorTV from "./components/MonitorTV";
/**
 Inspect=true to inspect scene
 */
const Inspect = false;
const SceneInspector = () => {
  const { scene } = useThree();
  console.log(scene);
  return null;
};

const App = () => {
  const [isKeyDown, setisKeyDown] = useState(false);
  const [clickPoint, setClickPoint] = useState(null);
  const [position, setPosition] = useState(null);
  const [normal, setNormal] = useState(null);
  useEffect(() => {
    if (isKeyDown) setClickPoint(null);
  }, [isKeyDown]);

  return (
    <Canvas className="canvasScene">
      <ambientLight intensity={0.5} />
      <directionalLight
        color="white"
        position={[350, 400, -400]}
        intensity={0.5}
      />
      <Room
        getClickPointXYZ={setClickPoint}
        getPointerPos={setPosition}
        getPointerNormal={setNormal}
      />
      <FirstPersonCamera goTo={clickPoint} getIsKeyDown={setisKeyDown} />
      <Pointer3d position={position} normal={normal} />
      {Paintings.map((painting) => (
        <Painting key={painting.id} data={painting} />
      ))}
      <MonitorTV />
      {Inspect && <SceneInspector />}
    </Canvas>
  );
};
const root = document.getElementById("root");
if (!root) {
  createRoot(root).render(<App />);
}

export default App;
