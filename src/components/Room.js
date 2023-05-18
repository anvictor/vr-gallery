import React from 'react';
import { useLoader, useFrame } from "@react-three/fiber";
import { OBJLoader } from "three/examples/jsm/loaders/OBJLoader";
import { TextureLoader } from "three/src/loaders/TextureLoader";

const Room = () => {
  const Textures = {
    Floor_5_FlMtl: {
      colorMap: useLoader(TextureLoader, "/room/skin1/floor_lightMap.jpg"),
      displacementMap: useLoader(TextureLoader, "/room/skin1/floor_map.jpg"),
      normalMap: useLoader(TextureLoader, "/room/skin1/floor_normalMap.jpg"),
      roughnessMap: useLoader(
        TextureLoader,
        "/room/skin1/floor_roughnessMap.jpg"
      ),
      aoMap: useLoader(TextureLoader, "/room/skin1/floor_aoMap.jpg"),
    },
    roof_out_2_Material: {
      colorMap: useLoader(TextureLoader, "/room/skin1/roof_lightMap.jpg"),
      displacementMap: useLoader(TextureLoader, "/room/skin1/roof_map.jpg"),
      normalMap: useLoader(TextureLoader, "/room/skin1/roof_normalMap.jpg"),
      roughnessMap: useLoader(
        TextureLoader,
        "/room/skin1/roof_roughnessMap.jpg"
      ),
      aoMap: useLoader(TextureLoader, "/room/skin1/roof_aoMap.jpg"),
    },
    roof_1_roofMtl: {
      colorMap: useLoader(TextureLoader, "/room/skin1/roof_lightMap.jpg"),
      displacementMap: useLoader(TextureLoader, "/room/skin1/roof_map.jpg"),
      normalMap: useLoader(TextureLoader, "/room/skin1/roof_normalMap.jpg"),
      roughnessMap: useLoader(
        TextureLoader,
        "/room/skin1/roof_roughnessMap.jpg"
      ),
      aoMap: useLoader(TextureLoader, "/room/skin1/roof_aoMap.jpg"),
    },
    Window1_W1_winMtl: {
      colorMap: useLoader(TextureLoader, "/room/skin1/windows_lightMap.jpg"),
      displacementMap: useLoader(TextureLoader, "/room/skin1/windows_map.jpg"),
      normalMap: useLoader(TextureLoader, "/room/skin1/windows_normalMap.jpg"),
      roughnessMap: useLoader(TextureLoader, "/room/skin1/windows_map.jpg"),
      aoMap: useLoader(TextureLoader, "/room/skin1/windows_aoMap.jpg"),
    },
    Window2_W2_winMtl: {
      colorMap: useLoader(TextureLoader, "/room/skin1/windows_lightMap.jpg"),
      displacementMap: useLoader(TextureLoader, "/room/skin1/windows_map.jpg"),
      normalMap: useLoader(TextureLoader, "/room/skin1/windows_normalMap.jpg"),
      roughnessMap: useLoader(TextureLoader, "/room/skin1/windows_map.jpg"),
      aoMap: useLoader(TextureLoader, "/room/skin1/windows_aoMap.jpg"),
    },
    Window3_W3_winMtl: {
      colorMap: useLoader(TextureLoader, "/room/skin1/windows_lightMap.jpg"),
      displacementMap: useLoader(TextureLoader, "/room/skin1/windows_map.jpg"),
      normalMap: useLoader(TextureLoader, "/room/skin1/windows_normalMap.jpg"),
      roughnessMap: useLoader(TextureLoader, "/room/skin1/windows_map.jpg"),
      aoMap: useLoader(TextureLoader, "/room/skin1/windows_aoMap.jpg"),
    },
    Door_I_n_doorTxtr: {
      colorMap: useLoader(TextureLoader, "/room/skin1/doors_lightMap.jpg"),
      displacementMap: useLoader(TextureLoader, "/room/skin1/doors_map.jpg"),
      normalMap: useLoader(TextureLoader, "/room/skin1/doors_normalMap.jpg"),
      roughnessMap: useLoader(
        TextureLoader,
        "/room/skin1/doors_roughnessMap.jpg"
      ),
      aoMap: useLoader(TextureLoader, "/room/skin1/doors_aoMap.jpg"),
    },
    Door_o_ut_doorTxtr: {
      colorMap: useLoader(TextureLoader, "/room/skin1/doors_lightMap.jpg"),
      displacementMap: useLoader(TextureLoader, "/room/skin1/doors_map.jpg"),
      normalMap: useLoader(TextureLoader, "/room/skin1/doors_normalMap.jpg"),
      roughnessMap: useLoader(
        TextureLoader,
        "/room/skin1/doors_roughnessMap.jpg"
      ),
      aoMap: useLoader(TextureLoader, "/room/skin1/doors_aoMap.jpg"),
    },
    partition_1_6_walls: {
      colorMap: useLoader(TextureLoader, "/room/skin1/walls_lightMap.jpg"),
      displacementMap: useLoader(TextureLoader, "/room/skin1/walls_map.jpg"),
      normalMap: useLoader(TextureLoader, "/room/skin1/walls_normalMap.jpg"),
      roughnessMap: useLoader(
        TextureLoader,
        "/room/skin1/walls_roughnessMap.jpg"
      ),
      aoMap: useLoader(TextureLoader, "/room/skin1/walls_aoMap.jpg"),
    },
    partition_2_7_walls: {
      colorMap: useLoader(TextureLoader, "/room/skin1/walls_lightMap.jpg"),
      displacementMap: useLoader(TextureLoader, "/room/skin1/walls_map.jpg"),
      normalMap: useLoader(TextureLoader, "/room/skin1/walls_normalMap.jpg"),
      roughnessMap: useLoader(
        TextureLoader,
        "/room/skin1/walls_roughnessMap.jpg"
      ),
      aoMap: useLoader(TextureLoader, "/room/skin1/walls_aoMap.jpg"),
    },
    partition_3_8_walls: {
      colorMap: useLoader(TextureLoader, "/room/skin1/walls_lightMap.jpg"),
      displacementMap: useLoader(TextureLoader, "/room/skin1/walls_map.jpg"),
      normalMap: useLoader(TextureLoader, "/room/skin1/walls_normalMap.jpg"),
      roughnessMap: useLoader(
        TextureLoader,
        "/room/skin1/walls_roughnessMap.jpg"
      ),
      aoMap: useLoader(TextureLoader, "/room/skin1/walls_aoMap.jpg"),
    },
    partition_4_9_walls: {
      colorMap: useLoader(TextureLoader, "/room/skin1/walls_lightMap.jpg"),
      displacementMap: useLoader(TextureLoader, "/room/skin1/walls_map.jpg"),
      normalMap: useLoader(TextureLoader, "/room/skin1/walls_normalMap.jpg"),
      roughnessMap: useLoader(
        TextureLoader,
        "/room/skin1/walls_roughnessMap.jpg"
      ),
      aoMap: useLoader(TextureLoader, "/room/skin1/walls_aoMap.jpg"),
    },
    Wall_Inside_10_walls: {
      colorMap: useLoader(TextureLoader, "/room/skin1/walls_lightMap.jpg"),
      displacementMap: useLoader(TextureLoader, "/room/skin1/walls_map.jpg"),
      normalMap: useLoader(TextureLoader, "/room/skin1/walls_normalMap.jpg"),
      roughnessMap: useLoader(
        TextureLoader,
        "/room/skin1/walls_roughnessMap.jpg"
      ),
      aoMap: useLoader(TextureLoader, "/room/skin1/walls_aoMap.jpg"),
    },
    Wall_Inside_10_WallBlue: {
      colorMap: useLoader(TextureLoader, "/room/skin1/walls_lightMap.jpg"),
      displacementMap: useLoader(TextureLoader, "/room/skin1/walls_map.jpg"),
      normalMap: useLoader(TextureLoader, "/room/skin1/walls_normalMap.jpg"),
      roughnessMap: useLoader(
        TextureLoader,
        "/room/skin1/walls_roughnessMap.jpg"
      ),
      aoMap: useLoader(TextureLoader, "/room/skin1/walls_aoMap.jpg"),
    },
    Wall_Inside_10_WallPlinth: {
      colorMap: useLoader(TextureLoader, "/room/skin1/walls_lightMap.jpg"),
      displacementMap: useLoader(TextureLoader, "/room/skin1/walls_map.jpg"),
      normalMap: useLoader(TextureLoader, "/room/skin1/walls_normalMap.jpg"),
      roughnessMap: useLoader(
        TextureLoader,
        "/room/skin1/walls_roughnessMap.jpg"
      ),
      aoMap: useLoader(TextureLoader, "/room/skin1/walls_aoMap.jpg"),
    },
    Wall_Outside_11_None: {
      colorMap: useLoader(TextureLoader, "/room/skin1/walls_lightMap.jpg"),
      displacementMap: useLoader(TextureLoader, "/room/skin1/walls_map.jpg"),
      normalMap: useLoader(TextureLoader, "/room/skin1/walls_normalMap.jpg"),
      roughnessMap: useLoader(
        TextureLoader,
        "/room/skin1/walls_roughnessMap.jpg"
      ),
      aoMap: useLoader(TextureLoader, "/room/skin1/walls_aoMap.jpg"),
    },
  };

  const room = useLoader(OBJLoader, "/room/room.obj");
  room.position.x = 0;
  room.position.y = -175;
  room.position.z = 10;
  room.traverse((child) => {
    console.log(child.name);
    if (child.name) {
      child.material.map = Textures[child.name].colorMap;
      child.material.displacementMap = Textures[child.name].displacementMap;
      child.material.normalMap = Textures[child.name].normalMap;
      child.material.roughnessMap = Textures[child.name].roughnessMap;
      child.material.aoMap = Textures[child.name].aoMap;
    }
  });
  const roomRef = React.useRef();
  useFrame(({ clock }) => {
    roomRef.current.rotation.y = clock.getElapsedTime()
  });
  return <primitive object={room} ref={roomRef} />;
};
export default Room;
