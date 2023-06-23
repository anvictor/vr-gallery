import React, { useEffect, useState } from "react";

import { createRoot } from "react-dom/client";
import { Canvas,useThree   } from "@react-three/fiber";
import Room from "./components/Room";
import FirstPersonCamera from "./components/FirstPersonCamera";
import Pointer3d from "./components/Pointer3d";
import Painting from './components/Painting';
// import Afro from './paintings/Afro.jpg';
// import Album from './painting/Album.jpg';

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
  const paintings = [
    { width: 50, height: 70, imageUrl: '/paintings/Afro.jpg', position: [0, 100, 0] },
    { width: 70, height: 50, imageUrl: '/paintings/Album.jpg', position: [90, 100, 0] },
    // add more paintings here...
  ];
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
          getPointerPos={setPosition}
          getPointerNormal={setNormal}
        />
        <FirstPersonCamera goTo={clickPoint} getIsKeyDown={setisKeyDown} />
        <Pointer3d position={position} normal={normal}/>
        {paintings.map((painting, index) => (
          <Painting
            key={index}
            width={painting.width}
            height={painting.height}
            imageUrl={painting.imageUrl}
            position={painting.position}
          />
        ))}
        {/* <SceneInspector /> */}
      </Canvas>
    </div>
  );
};
const root = document.getElementById("root");
if (!root) {
  createRoot(root).render(<App />);
}

export default App;
