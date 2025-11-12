// MonitorTV.js
import React, { useEffect, useRef } from "react";
import { VideoTexture, MeshBasicMaterial, DoubleSide, Vector2 } from "three";
import * as THREE from "three";
import Label from "./Label";

const MonitorTV = ({ flyToPoint }) => {
  const videoRef = useRef(null);

  if (!videoRef.current) {
    const video = document.createElement("video");
    video.src = "/vr_gallery/paintings/SculptureHead.mp4";
    video.muted = true; // без звуку
    video.loop = true; // нескінченний цикл
    video.playsInline = true; // для мобільних
    video.setAttribute("playsinline", "");
    videoRef.current = video;
  }

  const videoTexture = new VideoTexture(videoRef.current);
  videoTexture.offset = new Vector2(0.1, 0.1);
  videoTexture.repeat = new Vector2(0.7, 0.7);
  const material = new MeshBasicMaterial({
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
      material.dispose();
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

  return (
    <group
      position={[-115, 180, 50]}
      rotation={[0, 1.5708, 0]}
      onPointerUp={handleFlyToMonitor}
    >
      <mesh material={material} position={[0, 0, 2]}>
        <planeGeometry args={[45, 70]} />
      </mesh>
      <Label
        author={"Viktor Andreichenko"}
        name={"Sculpture Head"}
        width={450}
        height={700}
      />
    </group>
  );
};

export default MonitorTV;
