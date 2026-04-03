/* ======================================
   FLOATING OBJECT
   Reusable 3D object with bob + rotation
   ====================================== */

import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';

export default function FloatingObject({
  position = [0, 0, 0],
  color = '#00d4ff',
  geometry = 'octahedron',
  scale = 1,
  speed = 1,
  rotationSpeed = 0.5,
}) {
  const meshRef = useRef();

  useFrame((state) => {
    if (!meshRef.current) return;
    const time = state.clock.getElapsedTime();

    // Gentle bob
    meshRef.current.position.y = position[1] + Math.sin(time * speed) * 0.3;
    // Slow rotation
    meshRef.current.rotation.x = time * rotationSpeed * 0.3;
    meshRef.current.rotation.y = time * rotationSpeed * 0.5;
    meshRef.current.rotation.z = Math.sin(time * rotationSpeed * 0.2) * 0.2;
  });

  const renderGeometry = () => {
    switch (geometry) {
      case 'box':
        return <boxGeometry args={[1, 1, 1]} />;
      case 'torus':
        return <torusGeometry args={[0.7, 0.2, 16, 32]} />;
      case 'icosahedron':
        return <icosahedronGeometry args={[0.7, 0]} />;
      case 'torusKnot':
        return <torusKnotGeometry args={[0.5, 0.15, 64, 16]} />;
      case 'dodecahedron':
        return <dodecahedronGeometry args={[0.7, 0]} />;
      case 'cone':
        return <coneGeometry args={[0.5, 1, 6]} />;
      case 'octahedron':
      default:
        return <octahedronGeometry args={[0.7, 0]} />;
    }
  };

  return (
    <mesh ref={meshRef} position={position} scale={scale}>
      {renderGeometry()}
      <meshStandardMaterial
        color={color}
        emissive={color}
        emissiveIntensity={0.3}
        wireframe
        transparent
        opacity={0.6}
      />
    </mesh>
  );
}
