/* ======================================
   PARTICLE FIELD
   Starfield background that responds to scroll
   ====================================== */

import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

export default function ParticleField({ count = 2000, scrollProgress = 0 }) {
  const meshRef = useRef();

  // Generate random particle positions
  const [positions, colors, sizes] = useMemo(() => {
    const pos = new Float32Array(count * 3);
    const col = new Float32Array(count * 3);
    const siz = new Float32Array(count);

    const colorA = new THREE.Color('#e8a0b4');
    const colorB = new THREE.Color('#b8a9d4');
    const colorC = new THREE.Color('#d4b896');

    for (let i = 0; i < count; i++) {
      // Spread particles in a large sphere
      const radius = 15 + Math.random() * 35;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);

      pos[i * 3] = radius * Math.sin(phi) * Math.cos(theta);
      pos[i * 3 + 1] = radius * Math.sin(phi) * Math.sin(theta);
      pos[i * 3 + 2] = radius * Math.cos(phi);

      // Random color between blue, purple, and white
      const r = Math.random();
      let color;
      if (r < 0.4) color = colorA;
      else if (r < 0.7) color = colorB;
      else color = colorC;

      col[i * 3] = color.r;
      col[i * 3 + 1] = color.g;
      col[i * 3 + 2] = color.b;

      siz[i] = Math.random() * 2 + 0.5;
    }

    return [pos, col, siz];
  }, [count]);

  useFrame((state) => {
    if (!meshRef.current) return;

    const time = state.clock.getElapsedTime();

    // Slow rotation based on scroll + time
    meshRef.current.rotation.y = time * 0.02 + scrollProgress * Math.PI * 2;
    meshRef.current.rotation.x = Math.sin(time * 0.01) * 0.1;

    // Subtle position drift based on scroll
    meshRef.current.position.z = -scrollProgress * 5;
  });

  return (
    <points ref={meshRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={count}
          array={positions}
          itemSize={3}
        />
        <bufferAttribute
          attach="attributes-color"
          count={count}
          array={colors}
          itemSize={3}
        />
        <bufferAttribute
          attach="attributes-size"
          count={count}
          array={sizes}
          itemSize={1}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.08}
        vertexColors
        transparent
        opacity={0.7}
        sizeAttenuation
        blending={THREE.AdditiveBlending}
        depthWrite={false}
      />
    </points>
  );
}
