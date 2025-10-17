import { Canvas, useFrame } from "@react-three/fiber";
import { Float, OrbitControls } from "@react-three/drei";
import { motion } from "framer-motion";
import { Suspense, useRef } from "react";
import * as THREE from "three";

const NeonShape = ({ color, position }: { color: string; position: [number, number, number] }) => {
  const mesh = useRef<THREE.Mesh>(null);

  useFrame(({ clock }) => {
    if (!mesh.current) return;
    const t = clock.getElapsedTime();
    mesh.current.rotation.x = t / 2;
    mesh.current.rotation.y = t / 3;
  });

  return (
    <Float speed={3} rotationIntensity={1.2} floatIntensity={2}>
      <mesh ref={mesh} position={position}>
        <icosahedronGeometry args={[1, 1]} />
        <meshStandardMaterial
          color={color}
          emissive={color}
          emissiveIntensity={1.8}
          metalness={0.2}
          roughness={0.1}
        />
      </mesh>
    </Float>
  );
};

const Hero3D = () => {
  return (
    <section
      id="hero"
      className="relative flex min-h-screen items-center justify-center overflow-hidden pt-24"
    >
      <div className="pointer-events-none absolute inset-0">
        <Canvas camera={{ position: [0, 0, 8], fov: 60 }}>
          <color attach="background" args={["#050510"]} />
          <ambientLight intensity={0.6} />
          <pointLight position={[10, 10, 10]} intensity={1.5} color="#f72585" />
          <pointLight position={[-10, -10, -10]} intensity={1.1} color="#4cc9f0" />
          <Suspense fallback={null}>
            <NeonShape color="#f72585" position={[0, 0, 0]} />
            <NeonShape color="#4361ee" position={[3, 1.2, -2]} />
            <NeonShape color="#4cc9f0" position={[-3, -1.5, 1]} />
          </Suspense>
          <OrbitControls enableZoom={false} enablePan={false} autoRotate autoRotateSpeed={0.6} />
        </Canvas>
      </div>
      <div className="relative z-10 mx-auto flex max-w-3xl flex-col items-center px-6 text-center">
        <motion.h1
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="font-display text-5xl uppercase tracking-[0.5em] text-white drop-shadow-[0_0_35px_rgba(76,201,240,0.7)] sm:text-6xl lg:text-7xl"
        >
          mahiiruu_
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 1 }}
          className="mt-6 max-w-xl text-base text-white/80 sm:text-lg"
        >
          Ultra Edition — bending light, code, and imagination into an interactive story. Scroll to explore
          the chaos-crafted universe.
        </motion.p>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2, duration: 1 }}
          className="mt-10 flex flex-wrap items-center justify-center gap-4"
        >
          {[
            "Neon Parallax",
            "Framer Motion",
            "Three.js",
            "Particles"
          ].map((tag) => (
            <span
              key={tag}
              className="rounded-full border border-white/20 bg-white/5 px-4 py-2 text-xs uppercase tracking-[0.2em] text-white/70 backdrop-blur"
            >
              {tag}
            </span>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default Hero3D;
