import React, { useRef, useEffect } from 'react';
import { Canvas, useThree } from '@react-three/fiber';
import { Float, Environment } from '@react-three/drei';
import gsap from 'gsap';
import { GlassCylinderRing } from './GlassCylinderRing';
import { BackgroundParticles } from './BackgroundParticles';
import { ParticleBurst } from './ParticleBurst';

// Camera Animation Controller
function CameraController({ activeCategory, burstPos }) {
  const { camera } = useThree();

  useEffect(() => {
    if (activeCategory) {
      // Zoom camera smoothly into selected category portal
      gsap.to(camera.position, {
        x: burstPos ? burstPos[0] * 0.4 : 0,
        y: burstPos ? burstPos[1] * 0.4 : 0,
        z: 2.2,
        duration: 1.2,
        ease: "power3.inOut"
      });
    } else {
      // Return camera to default hero position
      gsap.to(camera.position, {
        x: 0,
        y: 0,
        z: 9.5,
        duration: 1.4,
        ease: "power3.out"
      });
    }
  }, [activeCategory, burstPos, camera]);

  return null;
}

export function CanvasContainer({ onSelectCategory, activeCategory, hoveredCategory, setHoveredCategory, burstState }) {
  return (
    <div className="w-full h-full absolute inset-0 z-0 overflow-hidden pointer-events-auto">
      <Canvas
        camera={{ position: [0, 0, 9.5], fov: 45 }}
        gl={{
          antialias: true,
          powerPreference: "high-performance",
          alpha: true
        }}
      >
        {/* Lights */}
        <ambientLight intensity={0.6} />
        <pointLight position={[10, 10, 10]} intensity={1.5} color="#6366f1" />
        <pointLight position={[-10, -10, -10]} intensity={1.2} color="#38bdf8" />
        <directionalLight position={[0, 8, 5]} intensity={1.8} color="#ffffff" />

        {/* Ambient Floating 3D Starfield Nodes */}
        <BackgroundParticles count={300} />

        {/* Central 3D Glass Cylinder Ring Carousel */}
        <Float speed={1.5} rotationIntensity={0.2} floatIntensity={0.4}>
          <GlassCylinderRing
            onSelectCategory={onSelectCategory}
            hoveredCategory={hoveredCategory}
            setHoveredCategory={setHoveredCategory}
          />
        </Float>

        {/* Shattered Glass Particle Explosion Burst */}
        {burstState && (
          <ParticleBurst
            active={burstState.active}
            position={burstState.position}
            color={burstState.color}
            onComplete={burstState.onComplete}
          />
        )}

        {/* Camera Transition Control */}
        <CameraController activeCategory={activeCategory} burstPos={burstState?.position} />
      </Canvas>
    </div>
  );
}
