// MonitorTV.js
import React, { useEffect, useRef } from "react";
import {
  VideoTexture,
  MeshBasicMaterial,
  DoubleSide,
  TextureLoader,
  Vector2,
} from "three";
import { useLoader } from "@react-three/fiber";
import * as THREE from "three";
import Label from "./Label";

const MonitorTV = ({ flyToPoint }) => {
  const videoRef = useRef(null);

  if (!videoRef.current) {
    const video = document.createElement("video");
    video.src = "/vr_gallery/paintings/SculptureHead.mp4";
    video.muted = true;
    video.loop = true;
    video.playsInline = true;
    video.setAttribute("playsinline", "");
    videoRef.current = video;
  }

  const videoTexture = new VideoTexture(videoRef.current);
  videoTexture.offset = new Vector2(0.1, 0.1);
  videoTexture.repeat = new Vector2(0.7, 0.7);
  const monitorMaterial = new MeshBasicMaterial({
    map: videoTexture,
    side: DoubleSide,
  });

  useEffect(() => {
    videoRef.current.load();
    videoRef.current.play().catch((err) => {
      console.warn("Autoplay prevented:", err);
    });
    return () => {
      videoTexture.dispose();
      monitorMaterial.dispose();
    };
    // eslint-disable-next-line
  }, []);

  const handleFlyToMonitor = (e) => {
    e.stopPropagation();
    const distance = 60;
    const monitorPos = new THREE.Vector3(-115, 180, 50);
    const forward = new THREE.Vector3(0, 0, 1);
    forward.applyEuler(new THREE.Euler(0, 1.5708, 0));
    const pos3d = monitorPos.clone().add(forward.multiplyScalar(distance));
    flyToPoint(pos3d);
  };

  // ✅ Розміри монітора та рамки
  const monitorWidth = 45;
  const monitorHeight = 70;
  const frameThickness = 3.33;
  const halfT = frameThickness / 2;

  // ✅ Матеріали для граней рамки
  const materialFront = new MeshBasicMaterial({ color: "#444" });
  const materialSide = new MeshBasicMaterial({ color: "#333" });
  const materialTopBottom = new MeshBasicMaterial({ color: "#222" });

  // ✅ Тінь під монітором
  const shadowTexture = useLoader(
    TextureLoader,
    "/vr_gallery/paintings/SquareShadowBlack.png"
  );

  return (
    <group
      position={[-115, 180, 50]}
      rotation={[0, 1.5708, 0]}
      onPointerUp={handleFlyToMonitor}
    >
      {/* Полотно монітора */}
      <mesh material={monitorMaterial} position={[0, 0, 2]}>
        <planeGeometry args={[monitorWidth, monitorHeight]} />
      </mesh>

      {/* ✅ Тінь (більша, темніша, розмита) */}
      <mesh position={[0, -3.5, 0.8]}>
        <planeGeometry args={[monitorWidth * 1.3, monitorHeight * 1.3]} />
        <meshBasicMaterial map={shadowTexture} transparent opacity={0.6} />
      </mesh>

      {/* ✅ Рамка-багет з гранями */}
      {/* Верхній брусок */}
      <mesh position={[0, monitorHeight / 2 + halfT, 2 + halfT]}>
        <boxGeometry
          args={[
            monitorWidth + frameThickness * 2,
            frameThickness,
            frameThickness,
          ]}
        />
        <meshBasicMaterial attach="material-0" {...materialTopBottom} />
        <meshBasicMaterial attach="material-1" {...materialTopBottom} />
        <meshBasicMaterial attach="material-2" {...materialFront} />
        <meshBasicMaterial attach="material-3" {...materialFront} />
        <meshBasicMaterial attach="material-4" {...materialSide} />
        <meshBasicMaterial attach="material-5" {...materialSide} />
      </mesh>

      {/* Нижній брусок */}
      <mesh position={[0, -monitorHeight / 2 - halfT, 2 + halfT]}>
        <boxGeometry
          args={[
            monitorWidth + frameThickness * 2,
            frameThickness,
            frameThickness,
          ]}
        />
        <meshBasicMaterial attach="material-0" {...materialTopBottom} />
        <meshBasicMaterial attach="material-1" {...materialTopBottom} />
        <meshBasicMaterial attach="material-2" {...materialFront} />
        <meshBasicMaterial attach="material-3" {...materialFront} />
        <meshBasicMaterial attach="material-4" {...materialSide} />
        <meshBasicMaterial attach="material-5" {...materialSide} />
      </mesh>

      {/* Лівий брусок */}
      <mesh position={[-monitorWidth / 2 - halfT, 0, 2 + halfT]}>
        <boxGeometry
          args={[
            frameThickness,
            monitorHeight + frameThickness * 2,
            frameThickness,
          ]}
        />
        <meshBasicMaterial attach="material-0" {...materialTopBottom} />
        <meshBasicMaterial attach="material-1" {...materialTopBottom} />
        <meshBasicMaterial attach="material-2" {...materialSide} />
        <meshBasicMaterial attach="material-3" {...materialSide} />
        <meshBasicMaterial attach="material-4" {...materialFront} />
        <meshBasicMaterial attach="material-5" {...materialFront} />
      </mesh>

      {/* Правий брусок */}
      <mesh position={[monitorWidth / 2 + halfT, 0, 2 + halfT]}>
        <boxGeometry
          args={[
            frameThickness,
            monitorHeight + frameThickness * 2,
            frameThickness,
          ]}
        />
        <meshBasicMaterial attach="material-0" {...materialTopBottom} />
        <meshBasicMaterial attach="material-1" {...materialTopBottom} />
        <meshBasicMaterial attach="material-2" {...materialSide} />
        <meshBasicMaterial attach="material-3" {...materialSide} />
        <meshBasicMaterial attach="material-4" {...materialFront} />
        <meshBasicMaterial attach="material-5" {...materialFront} />
      </mesh>

      <Label
        author={"Viktor Andreichenko"}
        name={"Sculpture Head"}
        width={monitorWidth * 10}
        height={monitorHeight * 10}
      />
    </group>
  );
};

export default MonitorTV;
