import React, { useEffect, useState } from "react";

import { createRoot } from "react-dom/client";
import { Canvas, useThree } from "@react-three/fiber";
import Room from "./components/Room";
import FirstPersonCamera from "./components/FirstPersonCamera";
import Painting from "./components/Painting";
import Paintings from "./components/Paintings.json";
import MonitorTV from "./components/MonitorTV";
import Environment3d from "./components/Environment3d";
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
  const [mouseDown, setMouseDown] = useState(null);
  const [mousePosX, setMousePosX] = useState(null);
  const [mousePosY, setMousePosY] = useState(null);

  useEffect(() => {
    if (isKeyDown) setClickPoint(null);
  }, [isKeyDown]);

  useEffect(() => {
    // console.log(clickPoint);
  }, [clickPoint]);

  return (
    <>
      <p className="debugging">
        {`mousedown:${mouseDown}, mousePos x:${Math.round(
          mousePosX * 1000
        )}, y:${Math.round(mousePosY * 1000)}
`}
      </p>
      <Canvas className="canvasScene">
        <Environment3d />
        <ambientLight intensity={0.5} />
        <directionalLight
          color="white"
          position={[350, 400, -400]}
          intensity={0.5}
        />
        <Room
          getClickPointXYZ={setClickPoint}
          getPointerPos={null}
          getPointerNormal={null}
        />
        <FirstPersonCamera
          goTo={clickPoint}
          getIsKeyDown={setisKeyDown}
          debugMouseDown={setMouseDown}
          debugMousePosX={setMousePosX}
          debugMousePosY={setMousePosY}
        />
        {Paintings.map((painting) => (
          <Painting
            key={painting.id}
            data={painting}
            getFlyData={setClickPoint}
          />
        ))}
        <MonitorTV />
        {Inspect && <SceneInspector />}
      </Canvas>
    </>
  );
};
const root = document.getElementById("root");
if (!root) {
  createRoot(root).render(<App />);
}

export default App;
