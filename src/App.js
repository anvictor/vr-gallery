import React, { useEffect, useState } from "react";

import { createRoot } from "react-dom/client";
import { Canvas,useThree   } from "@react-three/fiber";
import Room from "./components/Room";
import FirstPersonCamera from "./components/FirstPersonCamera";
import Pointer3d from "./components/Pointer3d";

const SceneInspector = () => {
  const { scene } = useThree(); 
  console.log(scene);
  return null; 
};

const App = () => {
  const [isKeyDown, setisKeyDown] = useState(false);
  const [clickPoint, setClickPoint] = useState(null);
  const [pointer, setPointer] = useState(null);
  console.log("clickPoint", clickPoint);
  useEffect(() => {
    if (isKeyDown) setClickPoint(null);
  }, [isKeyDown]);
  return (
    <div
      id="canvas-container"
      style={{ backgroundColor: "grey", height: "500px" }}
    >
      <Canvas>
        <ambientLight intensity={0.5} />
        <directionalLight color="white" position={[350, 400, -400]} intensity={0.5} />
        <Room 
          getClickPointXYZ={setClickPoint} 
          getPointer={setPointer}
        />
        <FirstPersonCamera goTo={clickPoint} getIsKeyDown={setisKeyDown} />
        <Pointer3d pointer={pointer}/>
        <SceneInspector />
      </Canvas>
    </div>
  );
};
const root = document.getElementById("root");
if (!root) {
  createRoot(root).render(<App />);
}

export default App;
