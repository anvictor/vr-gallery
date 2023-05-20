import { createRoot } from "react-dom/client";
import { Canvas, useThree } from "@react-three/fiber";
import MeshSphere from "./components/Sphere";
import Room from "./components/Room/Room";
function Foo() {
  const state = useThree();
  console.log('state',state);
}

function App() {
  return (
    <div id="canvas-container" style={{backgroundColor: 'grey', height: '500px'}}>
      <Canvas>
        <ambientLight intensity={0.1} />
        <directionalLight color="white" position={[0, 0, 5]} />
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
