
import { useEffect, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Points, PointMaterial } from "@react-three/drei";
import { motion, useScroll, useTransform } from "framer-motion";
import * as THREE from "three";

// Animated Stars Component
const AnimatedStars = () => {
  const ref = useRef<THREE.Points>(null);
  const sphere = new Float32Array(5000);

  // Generate random positions for stars
  for (let i = 0; i < 5000; i++) {
    const radius = Math.random() * 25 + 5;
    const phi = Math.acos(-1 + (2 * Math.random()));
    const theta = Math.random() * 2 * Math.PI;
    
    const x = radius * Math.sin(phi) * Math.cos(theta);
    const y = radius * Math.sin(phi) * Math.sin(theta);
    const z = radius * Math.cos(phi);
    
    sphere[i * 3] = x;
    sphere[i * 3 + 1] = y;
    sphere[i * 3 + 2] = z;
  }

  useFrame((state) => {
    if (ref.current) {
      ref.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.1) * 0.05;
      ref.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.15) * 0.05;
    }
  });

  return (
    <Points ref={ref} positions={sphere} stride={3} frustumCulled={false}>
      <PointMaterial
        color="#8b5cf6"
        size={0.002}
        sizeAttenuation={true}
        depthWrite={false}
        transparent
        opacity={0.8}
        blending={THREE.AdditiveBlending}
      />
    </Points>
  );
};

// Floating Objects Component
const FloatingObjects = () => {
  const group = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (group.current) {
      group.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.1) * 0.1;
      group.current.position.y = Math.sin(state.clock.elapsedTime * 0.2) * 0.5;
    }
  });

  return (
    <group ref={group}>
      {/* Floating geometric shapes */}
      {Array.from({ length: 8 }).map((_, i) => (
        <mesh
          key={i}
          position={[
            Math.sin(i * 2) * 15,
            Math.cos(i * 3) * 10,
            Math.sin(i * 1.5) * -20
          ]}
        >
          <octahedronGeometry args={[0.5, 0]} />
          <meshBasicMaterial
            color={i % 2 === 0 ? "#ec4899" : "#8b5cf6"}
            wireframe
            transparent
            opacity={0.3}
          />
        </mesh>
      ))}
    </group>
  );
};

const ParallaxBackground = () => {
  const { scrollYProgress } = useScroll();
  const y1 = useTransform(scrollYProgress, [0, 1], [0, -50]);
  const y2 = useTransform(scrollYProgress, [0, 1], [0, -100]);

  return (
    <div className="fixed inset-0 z-0">
      {/* Gradient Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900" />
      
      {/* Animated gradient overlay */}
      <motion.div
        style={{ y: y1 }}
        className="absolute inset-0 bg-gradient-to-t from-transparent via-purple-500/10 to-pink-500/10"
      />
      
      {/* Parallax shapes */}
      <motion.div
        style={{ y: y2 }}
        className="absolute inset-0 opacity-20"
      >
        <div className="absolute top-20 left-20 w-32 h-32 bg-gradient-to-r from-purple-400/30 to-pink-400/30 rounded-full blur-xl" />
        <div className="absolute top-60 right-40 w-48 h-48 bg-gradient-to-r from-blue-400/20 to-purple-400/20 rounded-full blur-2xl" />
        <div className="absolute bottom-40 left-1/3 w-64 h-64 bg-gradient-to-r from-pink-400/20 to-purple-400/20 rounded-full blur-3xl" />
      </motion.div>

      {/* 3D Canvas */}
      <div className="absolute inset-0">
        <Canvas camera={{ position: [0, 0, 1], fov: 100 }}>
          <AnimatedStars />
          <FloatingObjects />
        </Canvas>
      </div>
    </div>
  );
};

export default ParallaxBackground;
