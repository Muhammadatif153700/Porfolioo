import React, { useRef } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import { Html } from '@react-three/drei';
import * as THREE from 'three';
import { CATEGORIES } from '../../data/categories';
import { playHoverSound, playSelectSound, playShatterSound } from '../../utils/soundEffects';

export function GlassCylinderRing({ onSelectCategory, hoveredCategory, setHoveredCategory }) {
  const ringGroupRef = useRef();
  const radius = 4.2;
  const cardWidth = 3.2;
  const cardHeight = 4.2;

  // Rotation inertia state
  const isDragging = useRef(false);
  const previousMouseX = useRef(0);
  const targetRotationY = useRef(0);
  const velocityY = useRef(0.005);

  const { pointer } = useThree();

  const handlePointerDown = (e) => {
    e.stopPropagation();
    isDragging.current = true;
    previousMouseX.current = e.clientX;
  };

  const handlePointerUp = () => {
    isDragging.current = false;
  };

  const handlePointerMove = (e) => {
    if (isDragging.current) {
      const deltaX = e.clientX - previousMouseX.current;
      previousMouseX.current = e.clientX;
      targetRotationY.current += deltaX * 0.006;
      velocityY.current = deltaX * 0.004;
    }
  };

  useFrame((state, delta) => {
    if (!ringGroupRef.current) return;

    if (!isDragging.current) {
      targetRotationY.current += velocityY.current;
      velocityY.current *= 0.95;
      if (Math.abs(velocityY.current) < 0.002) {
        velocityY.current = 0.003;
      }
    }

    const parallaxX = pointer.x * 0.2;
    const parallaxY = pointer.y * 0.15;

    ringGroupRef.current.rotation.y = THREE.MathUtils.lerp(
      ringGroupRef.current.rotation.y,
      targetRotationY.current + parallaxX,
      0.08
    );
    ringGroupRef.current.rotation.x = THREE.MathUtils.lerp(
      ringGroupRef.current.rotation.x,
      parallaxY,
      0.08
    );
  });

  return (
    <group
      onPointerDown={handlePointerDown}
      onPointerUp={handlePointerUp}
      onPointerLeave={handlePointerUp}
      onPointerMove={handlePointerMove}
    >
      {/* Central Glass Scaffold Tube */}
      <mesh rotation={[0, 0, 0]}>
        <cylinderGeometry args={[radius + 0.1, radius + 0.1, cardHeight + 0.6, 64, 1, true]} />
        <meshPhysicalMaterial
          color="#f3efe9"
          transmission={0.92}
          opacity={0.5}
          transparent
          roughness={0.12}
          ior={1.4}
          thickness={0.8}
          metalness={0.15}
          side={THREE.DoubleSide}
        />
      </mesh>

      {/* Top & Bottom Gold/Amber Accent Rings */}
      <mesh position={[0, (cardHeight + 0.6) / 2, 0]} rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[radius + 0.15, 0.04, 16, 100]} />
        <meshBasicMaterial color="#b45309" transparent opacity={0.7} />
      </mesh>
      <mesh position={[0, -(cardHeight + 0.6) / 2, 0]} rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[radius + 0.15, 0.04, 16, 100]} />
        <meshBasicMaterial color="#c2410c" transparent opacity={0.7} />
      </mesh>

      {/* Rotating 4 Category Segments */}
      <group ref={ringGroupRef}>
        {CATEGORIES.map((category, index) => {
          const angle = (index / CATEGORIES.length) * Math.PI * 2;
          const x = Math.sin(angle) * radius;
          const z = Math.cos(angle) * radius;
          const rotationY = angle;

          const isHovered = hoveredCategory === category.id;

          return (
            <group
              key={category.id}
              position={[x, 0, z]}
              rotation={[0, rotationY, 0]}
              onPointerOver={(e) => {
                e.stopPropagation();
                if (hoveredCategory !== category.id) {
                  setHoveredCategory(category.id);
                  playHoverSound();
                }
              }}
              onPointerOut={(e) => {
                e.stopPropagation();
                setHoveredCategory(null);
              }}
              onClick={(e) => {
                e.stopPropagation();
                playSelectSound();
                playShatterSound();
                onSelectCategory(category, [x, 0, z]);
              }}
            >
              {/* Glass Segment Frame Mesh */}
              <mesh scale={isHovered ? 1.08 : 1}>
                <boxGeometry args={[cardWidth, cardHeight, 0.15]} />
                <meshPhysicalMaterial
                  color="#ffffff"
                  transmission={0.88}
                  opacity={0.95}
                  transparent
                  roughness={0.15}
                  metalness={0.1}
                  ior={1.5}
                  thickness={0.6}
                  clearcoat={1.0}
                  clearcoatRoughness={0.1}
                  reflectivity={0.9}
                />
              </mesh>

              {/* Border Glow Accent */}
              <mesh scale={isHovered ? 1.09 : 1.01}>
                <boxGeometry args={[cardWidth + 0.06, cardHeight + 0.06, 0.12]} />
                <meshBasicMaterial
                  color={category.color}
                  wireframe
                  transparent
                  opacity={isHovered ? 0.9 : 0.4}
                />
              </mesh>

              {/* 3D Segment Content Overlay - Warm White & Espresso Theme */}
              <Html
                transform
                occlude="blended"
                position={[0, 0, 0.09]}
                distanceFactor={5.5}
                style={{
                  width: '340px',
                  height: '460px',
                  userSelect: 'none',
                  pointerEvents: 'auto'
                }}
              >
                <div 
                  className={`w-full h-full p-6 rounded-2xl flex flex-col justify-between transition-all duration-300 border ${
                    isHovered 
                      ? 'bg-white/95 border-[#b45309]/50 shadow-[0_15px_40px_rgba(180,83,9,0.2)] scale-105' 
                      : 'bg-white/85 border-[#362319]/15'
                  }`}
                  style={{ backdropFilter: 'blur(16px)' }}
                >
                  {/* Top Badge & Number */}
                  <div className="flex items-center justify-between">
                    <span 
                      className="px-3 py-1 text-[10px] font-mono tracking-widest uppercase rounded-full border font-bold"
                      style={{ color: category.color, borderColor: `${category.color}55`, backgroundColor: `${category.color}10` }}
                    >
                      {category.badge}
                    </span>
                    <span className="font-mono text-xs text-[#5c3d2e] font-bold">
                      0{index + 1} / 04
                    </span>
                  </div>

                  {/* Segment Visual Graphic */}
                  <div className="my-auto py-4 text-center">
                    <div 
                      className="w-16 h-16 mx-auto rounded-2xl flex items-center justify-center mb-4 shadow-sm"
                      style={{ 
                        background: `radial-gradient(circle, ${category.color}22 0%, rgba(255,255,255,0.9) 100%)`,
                        border: `1px solid ${category.color}55`
                      }}
                    >
                      {index === 0 && (
                        <svg className="w-8 h-8 text-[#b45309] animate-pulse" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                        </svg>
                      )}
                      {index === 1 && (
                        <svg className="w-8 h-8 text-[#c2410c] animate-pulse" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                        </svg>
                      )}
                      {index === 2 && (
                        <svg className="w-8 h-8 text-[#362319] animate-pulse" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 9l3 3-3 3m5 0h3M5 20h14a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                        </svg>
                      )}
                      {index === 3 && (
                        <svg className="w-8 h-8 text-[#7c2d12] animate-pulse" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 10V3L4 14h7v7l9-11h-7z" />
                        </svg>
                      )}
                    </div>

                    <h3 className="text-xl font-bold font-serif tracking-wide text-[#1c120c] mb-1">
                      {category.title}
                    </h3>
                    <p className="text-xs text-[#5c3d2e] font-sans font-medium leading-relaxed">
                      {category.subtitle}
                    </p>
                  </div>

                  {/* Highlights list */}
                  <div className="space-y-1.5 mb-4">
                    {category.highlights.slice(0, 2).map((item, idx) => (
                      <div key={idx} className="flex items-center text-[11px] text-[#2e1c14] font-medium">
                        <span className="w-1.5 h-1.5 rounded-full mr-2" style={{ backgroundColor: category.color }} />
                        {item}
                      </div>
                    ))}
                  </div>

                  {/* Floating Action Button */}
                  <button 
                    className={`w-full py-2.5 rounded-xl font-mono text-xs font-bold uppercase tracking-wider flex items-center justify-center space-x-2 transition-all duration-300 ${
                      isHovered
                        ? 'text-white shadow-md scale-102'
                        : 'text-[#1c120c] bg-[#faf8f5] hover:bg-white border border-[#362319]/15'
                    }`}
                    style={{
                      backgroundColor: isHovered ? category.color : undefined
                    }}
                  >
                    <span>EXPLORE DEMO</span>
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                    </svg>
                  </button>
                </div>
              </Html>
            </group>
          );
        })}
      </group>
    </group>
  );
}
