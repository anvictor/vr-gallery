// App.js
import React, { useEffect, useState } from "react";
import { Canvas, useThree } from "@react-three/fiber";
import Room from "./components/Room";
import FirstPersonCamera from "./components/FirstPersonCamera";
import Painting from "./components/Painting";
import Paintings from "./components/Paintings.json";
import MonitorTV from "./components/MonitorTV";
import Environment3d from "./components/Environment3d";
import RoomBoundary from "./RoomBoundary";

const Inspect = true;
const SceneInspector = () => {
  const { scene } = useThree();
  return null;
};

const App = () => {
  const [isKeyDown, setIsKeyDown] = useState(false);
  const [cameraTargetPoint, setCameraTargetPoint] = useState(null);

  const handleCameraReachedPoint = () => {
    setCameraTargetPoint(null);
  };

  useEffect(() => {
    const raf = requestAnimationFrame(() => {
      window.dispatchEvent(new Event("resize"));
    });
    return () => cancelAnimationFrame(raf);
  }, []);

  useEffect(() => {
    if (isKeyDown) setCameraTargetPoint(null);
  }, [isKeyDown]);

  // ✅ Unified function for both floor and paintings
  const flyToPoint = (pos3d) => {
    setCameraTargetPoint(pos3d);
  };

  return (
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
          <Room flyToPoint={flyToPoint} />
        </RoomBoundary>
      </React.Suspense>
      <FirstPersonCamera
        cameraReachedPoint={handleCameraReachedPoint}
        cameraTargetPoint={cameraTargetPoint}
        getIsKeyDown={setIsKeyDown}
      />
      {Paintings.map((painting) => (
        <Painting key={painting.id} data={painting} flyToPoint={flyToPoint} />
      ))}
      <MonitorTV />
      {Inspect && <SceneInspector />}
    </Canvas>
  );
};

export default App;
