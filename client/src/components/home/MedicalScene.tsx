import { Canvas, useFrame } from "@react-three/fiber";
import { Float, Environment, ContactShadows, OrbitControls } from "@react-three/drei";
import { useRef } from "react";
import * as THREE from "three";

// 3D Pill / Capsule
function Pill({
  position = [0, 0, 0] as [number, number, number],
  color = "#3b82f6",
  scale = 1,
}: {
  position?: [number, number, number];
  color?: string;
  scale?: number;
}) {
  const mesh = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (mesh.current) {
      mesh.current.rotation.y = state.clock.elapsedTime * 0.35;
    }
  });

  return (
    <Float speed={2} rotationIntensity={0.4} floatIntensity={0.6}>
      <group ref={mesh} position={position} scale={scale}>
        {/* Capsule body */}
        <mesh>
          <capsuleGeometry args={[0.35, 0.9, 8, 16]} />
          <meshStandardMaterial
            color={color}
            metalness={0.15}
            roughness={0.25}
            envMapIntensity={1.2}
          />
        </mesh>

        {/* Middle band */}
        <mesh position={[0, 0, 0]}>
          <torusGeometry args={[0.36, 0.04, 8, 32]} />
          <meshStandardMaterial color="#ffffff" metalness={0.3} roughness={0.2} />
        </mesh>
      </group>
    </Float>
  );
}

// Small floating tablet
function Tablet({
  position = [0, 0, 0] as [number, number, number],
  color = "#22c55e",
}: {
  position?: [number, number, number];
  color?: string;
}) {
  return (
    <Float speed={3} rotationIntensity={1.2} floatIntensity={1.4}>
      <mesh position={position} rotation={[0.4, 0.6, 0.2]}>
        <cylinderGeometry args={[0.28, 0.28, 0.12, 32]} />
        <meshStandardMaterial
          color={color}
          metalness={0.1}
          roughness={0.3}
        />
      </mesh>
    </Float>
  );
}

// Medical Cross
function MedicalCross({ position = [0, 0, 0] as [number, number, number] }) {
  return (
    <Float speed={1.8} rotationIntensity={0.3} floatIntensity={0.5}>
      <group position={position} rotation={[0.2, 0.5, 0]}>
        <mesh>
          <boxGeometry args={[0.25, 1.1, 0.25]} />
          <meshStandardMaterial color="#ef4444" metalness={0.2} roughness={0.3} />
        </mesh>
        <mesh>
          <boxGeometry args={[1.1, 0.25, 0.25]} />
          <meshStandardMaterial color="#ef4444" metalness={0.2} roughness={0.3} />
        </mesh>
      </group>
    </Float>
  );
}

export default function MedicalScene() {
  return (
    <div className="w-full h-[480px] lg:h-[540px] rounded-3xl overflow-hidden">
      <Canvas
        camera={{ position: [0, 0, 6.5], fov: 40 }}
        gl={{ antialias: true, alpha: true }}
        dpr={[1, 1.8]}
      >
        <ambientLight intensity={0.6} />
        <directionalLight position={[5, 8, 5]} intensity={1.2} castShadow />
        <directionalLight position={[-4, 3, -2]} intensity={0.4} />

        {/* Main models */}
        <Pill position={[0, 0.2, 0]} color="#3b82f6" scale={1.35} />
        <Pill position={[-1.9, 0.8, -0.8]} color="#8b5cf6" scale={0.7} />
        <Pill position={[1.8, -0.6, -0.5]} color="#06b6d4" scale={0.65} />

        <Tablet position={[-1.4, -1.1, 0.6]} color="#22c55e" />
        <Tablet position={[1.5, 1.2, 0.3]} color="#f59e0b" />
        <Tablet position={[0.3, -1.4, -0.9]} color="#ec4899" />

        <MedicalCross position={[-0.2, 1.6, -1.2]} />

        {/* Soft ground shadow */}
        <ContactShadows
          position={[0, -1.8, 0]}
          opacity={0.35}
          scale={12}
          blur={2.5}
          far={4}
        />

        <Environment preset="city" />
        <OrbitControls
          enableZoom={false}
          enablePan={false}
          autoRotate
          autoRotateSpeed={0.8}
          maxPolarAngle={Math.PI / 1.7}
          minPolarAngle={Math.PI / 3}
        />
      </Canvas>
    </div>
  );
}