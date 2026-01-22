import { Canvas, useFrame } from '@react-three/fiber';
import { useMemo, useRef } from 'react';
import * as THREE from 'three';

const LiquidBlob = ({ position, color, scale }: { position: [number, number, number]; color: string; scale: number }) => {
  const meshRef = useRef<THREE.Mesh>(null);
  const materialRef = useRef<THREE.MeshStandardMaterial>(null);
  
  const geometry = useMemo(() => new THREE.IcosahedronGeometry(1, 4), []);
  
  useFrame((state) => {
    if (meshRef.current) {
      const time = state.clock.getElapsedTime();
      meshRef.current.rotation.x = Math.sin(time * 0.3) * 0.2;
      meshRef.current.rotation.y = Math.cos(time * 0.2) * 0.3;
      meshRef.current.position.y = position[1] + Math.sin(time * 0.5) * 0.3;
      meshRef.current.position.x = position[0] + Math.cos(time * 0.3) * 0.2;
      
      // Morph the geometry
      const positions = meshRef.current.geometry.attributes.position;
      const originalPositions = geometry.attributes.position;
      
      for (let i = 0; i < positions.count; i++) {
        const x = originalPositions.getX(i);
        const y = originalPositions.getY(i);
        const z = originalPositions.getZ(i);
        
        const noise = Math.sin(x * 2 + time) * Math.cos(y * 2 + time) * Math.sin(z * 2 + time) * 0.15;
        
        positions.setXYZ(
          i,
          x + x * noise,
          y + y * noise,
          z + z * noise
        );
      }
      positions.needsUpdate = true;
    }
  });

  return (
    <mesh ref={meshRef} position={position} scale={scale}>
      <icosahedronGeometry args={[1, 4]} />
      <meshStandardMaterial
        ref={materialRef}
        color={color}
        transparent
        opacity={0.6}
        roughness={0.1}
        metalness={0.8}
      />
    </mesh>
  );
};

const FloatingParticles = () => {
  const particlesRef = useRef<THREE.Points>(null);
  
  const particles = useMemo(() => {
    const count = 200;
    const positions = new Float32Array(count * 3);
    const colors = new Float32Array(count * 3);
    
    for (let i = 0; i < count; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 20;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 20;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 10;
      
      // Pink to red gradient
      colors[i * 3] = 0.9 + Math.random() * 0.1;
      colors[i * 3 + 1] = 0.3 + Math.random() * 0.3;
      colors[i * 3 + 2] = 0.5 + Math.random() * 0.2;
    }
    
    return { positions, colors };
  }, []);

  useFrame((state) => {
    if (particlesRef.current) {
      particlesRef.current.rotation.y = state.clock.getElapsedTime() * 0.02;
      particlesRef.current.rotation.x = Math.sin(state.clock.getElapsedTime() * 0.1) * 0.1;
    }
  });

  return (
    <points ref={particlesRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[particles.positions, 3]}
        />
        <bufferAttribute
          attach="attributes-color"
          args={[particles.colors, 3]}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.05}
        vertexColors
        transparent
        opacity={0.8}
        sizeAttenuation
      />
    </points>
  );
};

const Scene = () => {
  return (
    <>
      <ambientLight intensity={0.4} />
      <pointLight position={[10, 10, 10]} intensity={1} color="#ff6b8a" />
      <pointLight position={[-10, -10, -10]} intensity={0.5} color="#ff9ecd" />
      <spotLight
        position={[0, 10, 0]}
        angle={0.3}
        penumbra={1}
        intensity={1}
        color="#ff4d6d"
      />
      
      <LiquidBlob position={[-3, 0, -2]} color="#ff4d6d" scale={1.5} />
      <LiquidBlob position={[3, 1, -3]} color="#ff6b8a" scale={1.2} />
      <LiquidBlob position={[0, -2, -4]} color="#ff9ecd" scale={1.8} />
      <LiquidBlob position={[-2, 2, -5]} color="#c94b7c" scale={1} />
      <LiquidBlob position={[2, -1, -3]} color="#e85d7f" scale={0.8} />
      
      <FloatingParticles />
    </>
  );
};

const LiquidBackground = () => {
  return (
    <div className="fixed inset-0 -z-10">
      <Canvas
        camera={{ position: [0, 0, 8], fov: 60 }}
        gl={{ antialias: true, alpha: true }}
        style={{ background: 'linear-gradient(180deg, hsl(340, 30%, 8%) 0%, hsl(350, 35%, 12%) 50%, hsl(340, 30%, 8%) 100%)' }}
      >
        <Scene />
      </Canvas>
    </div>
  );
};

export default LiquidBackground;
