import React, { useEffect, useState } from "react";

import { Canvas, useThree } from "@react-three/fiber";
import Room from "./components/Room";
import FirstPersonCamera from "./components/FirstPersonCamera";
import Painting from "./components/Painting";
import Paintings from "./components/Paintings.json";
import MonitorTV from "./components/MonitorTV";
import Environment3d from "./components/Environment3d";
import RoomBoundary from "./RoomBoundary";
/**
 Inspect=true to inspect scene
 */
const Inspect = true;
const SceneInspector = () => {
  // eslint-disable-next-line no-unused-vars
  const { scene } = useThree();
  // console.log(scene);
  return null;
};

const App = () => {
  const [isKeyDown, setisKeyDown] = useState(false);
  const [clickPoint, setClickPoint] = useState(null);
  const handleCameraReachedPoint = () => {
    setClickPoint(null);
  };
  useEffect(() => {
    // Force R3F to compute size and render an initial frame
    const raf = requestAnimationFrame(() => {
      window.dispatchEvent(new Event("resize"));
    });
    return () => cancelAnimationFrame(raf);
  }, []);

  useEffect(() => {
    if (isKeyDown) setClickPoint(null);
  }, [isKeyDown]);

  const getFlyData = (pos3d) => {
    setClickPoint(pos3d); // ✅ запускає покроковий рух
  };

  return (
    <>
      <Canvas className="canvasScene" frameloop="always">
        <React.Suspense fallback={null}>
          <Environment3d />
        </React.Suspense>
        <ambientLight intensity={0.5} />
        <directionalLight
          color="white"
          position={[350, 400, -400]}
          intensity={0.5}
        />
        <React.Suspense fallback={null}>
          <RoomBoundary>
            <Room
              getClickPointXYZ={setClickPoint}
              getPointerPos={null}
              getPointerNormal={null}
            />
          </RoomBoundary>
        </React.Suspense>
        <FirstPersonCamera
          cameraReachedPoint={handleCameraReachedPoint}
          goToClickOnFloor={clickPoint}
          getIsKeyDown={setisKeyDown}
          getFlyData={getFlyData}
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

export default App;
