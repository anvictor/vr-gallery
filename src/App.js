import { createRoot } from "react-dom/client";
import { Canvas, useThree } from "@react-three/fiber";
import MeshBox from "./components/Box";
import MeshSphere from "./components/Sphere";
import Room from "./components/Room";
function Foo() {
  const state = useThree();
  console.log(state);
}

function App() {
  return (
    <div id="canvas-container" style={{backgroundColor: 'grey', height: '500px'}}>
      <Canvas>
        <ambientLight intensity={0.1} />
        <directionalLight color="red" position={[0, 0, 5]} />
        <MeshBox />
        <MeshSphere />
        {/* <Foo /> */}
        <Room onClick={(scene)=>{console.log(scene)}} />
      </Canvas>
    </div>
  );
}
const root = document.getElementById("root");
if (!root) {
  createRoot(root).render(<App />);
}

export default App;
