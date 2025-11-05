import React, { useEffect, useState } from "react";
import {
  VideoTexture,
  MeshBasicMaterial,
  DoubleSide,
  TextureLoader,
  Vector2,
} from "three";
import { useLoader } from "@react-three/fiber";
import Label from "./Label";

const MonitorTV = () => {
  const video = document.createElement("video");
  video.src = "/vr_gallery/paintings/SculptureHead.mp4"; // Put your video url here
  const [playVideo, setPlayVideo] = useState(false);

  const handleClick = () => {
    setPlayVideo(!playVideo);
  };

  const handleOut = () => {
    setPlayVideo(false);
  };

  const PlayButton = ({ handleClick }) => {
    const texture = useLoader(
      TextureLoader,
      process.env.PUBLIC_URL + "/util_Imgs/PlayBtn.png"
    );

    return (
      <mesh onClick={handleClick} position={[0, -20, 3]}>
        <planeGeometry attach="geometry" args={[15, 15]} />
        <meshBasicMaterial attach="material" map={texture} transparent={true} />
      </mesh>
    );
  };

  const videoTexture = new VideoTexture(video);
  videoTexture.offset = new Vector2(0.1, 0.1); // Adjust these values as needed
  videoTexture.repeat = new Vector2(0.7, 0.7);
  const material = new MeshBasicMaterial({
    map: videoTexture,
    side: DoubleSide,
  });

  useEffect(() => {
    if (playVideo) {
      video.load();
      video.play();
    }

    // Return a cleanup function from the effect
    return () => {
      video.pause(); // Stop the video from playing
      video.src = ""; // Remove the source of the video
      video.load(); // Call the load method

      // Dispose of the video texture and material in Three.js
      videoTexture.dispose();
      material.dispose();
    };
    // eslint-disable-next-line
  }, [playVideo]);

  return (
    <group
      position={[-115, 180, 50]}
      rotation={[0, 1.5708, 0]}
      onPointerLeave={handleOut}
    >
      <mesh material={material} position={[0, 0, 2]} onClick={handleClick}>
        <planeGeometry attach="geometry" args={[45, 70]} />
      </mesh>
      {!playVideo && (
        <PlayButton setPlayVideo={setPlayVideo} handleClick={handleClick} />
      )}
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
