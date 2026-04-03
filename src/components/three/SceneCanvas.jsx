/* ======================================
   SCENE CANVAS
   Main R3F Canvas wrapper with camera & lights
   Fixed behind all page content
   ====================================== */

import { Canvas } from '@react-three/fiber';
import { Suspense } from 'react';
import ParticleField from './ParticleField';
import FloatingObject from './FloatingObject';

export default function SceneCanvas({ scrollProgress = 0 }) {
  // Reduce particles on mobile
  const isMobile = typeof window !== 'undefined' && window.innerWidth <= 768;
  const particleCount = isMobile ? 800 : 2000;

  return (
    <div className="canvas-container">
      <Canvas
        camera={{ position: [0, 0, 10], fov: 60, near: 0.1, far: 100 }}
        dpr={[1, 1.5]}
        gl={{ antialias: false, alpha: true }}
        style={{ background: 'transparent' }}
      >
        <Suspense fallback={null}>
          {/* Lighting */}
          <ambientLight intensity={0.3} />
          <pointLight position={[10, 10, 10]} intensity={0.4} color="#e8a0b4" />
          <pointLight position={[-10, -5, 5]} intensity={0.3} color="#b8a9d4" />

          {/* Star field */}
          <ParticleField count={particleCount} scrollProgress={scrollProgress} />

          {/* Floating geometric objects */}
          <FloatingObject
            position={[-5, 2, -3]}
            color="#e8a0b4"
            geometry="octahedron"
            scale={0.8}
            speed={0.6}
          />
          <FloatingObject
            position={[5, -1, -5]}
            color="#b8a9d4"
            geometry="torus"
            scale={0.7}
            speed={0.8}
          />
          <FloatingObject
            position={[-3, -3, -4]}
            color="#d4837d"
            geometry="icosahedron"
            scale={0.5}
            speed={1}
          />
          <FloatingObject
            position={[4, 3, -6]}
            color="#a3b899"
            geometry="torusKnot"
            scale={0.6}
            speed={0.5}
            rotationSpeed={0.3}
          />
          <FloatingObject
            position={[0, -4, -8]}
            color="#8b7355"
            geometry="dodecahedron"
            scale={0.9}
            speed={0.4}
            rotationSpeed={0.2}
          />
        </Suspense>
      </Canvas>
    </div>
  );
}
