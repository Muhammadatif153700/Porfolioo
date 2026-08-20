import React, { useRef, useMemo, useEffect } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import gsap from 'gsap';

export function ParticleBurst({ active, position = [0, 0, 0], color = "#6366f1", onComplete }) {
  const meshRef = useRef();
  const count = 180;

  const [positions, velocities, scales, rotVelocities] = useMemo(() => {
    const pos = new Float32Array(count * 3);
    const vel = new Float32Array(count * 3);
    const scl = new Float32Array(count);
    const rot = new Float32Array(count * 3);

    for (let i = 0; i < count; i++) {
      pos[i * 3] = position[0];
      pos[i * 3 + 1] = position[1];
      pos[i * 3 + 2] = position[2];

      // Explosive direction vector
      const speed = 4 + Math.random() * 12;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.random() * Math.PI;

      vel[i * 3] = Math.sin(phi) * Math.cos(theta) * speed;
      vel[i * 3 + 1] = Math.cos(phi) * speed;
      vel[i * 3 + 2] = Math.sin(phi) * Math.sin(theta) * speed;

      scl[i] = 0.05 + Math.random() * 0.25;

      rot[i * 3] = (Math.random() - 0.5) * 10;
      rot[i * 3 + 1] = (Math.random() - 0.5) * 10;
      rot[i * 3 + 2] = (Math.random() - 0.5) * 10;
    }

    return [pos, vel, scl, rot];
  }, [position, active]);

  const dummy = useMemo(() => new THREE.Object3D(), []);

  const progress = useRef(0);

  useEffect(() => {
    if (active) {
      progress.current = 0;
      gsap.to(progress, {
        current: 1,
        duration: 1.2,
        ease: "power3.out",
        onComplete: () => {
          if (onComplete) onComplete();
        }
      });
    }
  }, [active, onComplete]);

  useFrame((state, delta) => {
    if (!active || !meshRef.current) return;

    const p = progress.current;
    for (let i = 0; i < count; i++) {
      const x = position[0] + velocities[i * 3] * p;
      const y = position[1] + velocities[i * 3 + 1] * p - 0.5 * 9.8 * p * p * 0.1; // gravity effect
      const z = position[2] + velocities[i * 3 + 2] * p;

      dummy.position.set(x, y, z);

      const currentScale = scales[i] * (1 - p);
      dummy.scale.set(currentScale, currentScale, currentScale);

      dummy.rotation.x += rotVelocities[i * 3] * delta;
      dummy.rotation.y += rotVelocities[i * 3 + 1] * delta;
      dummy.rotation.z += rotVelocities[i * 3 + 2] * delta;

      dummy.updateMatrix();
      meshRef.current.setMatrixAt(i, dummy.matrix);
    }
    meshRef.current.instanceMatrix.needsUpdate = true;
  });

  if (!active) return null;

  return (
    <instancedMesh
      ref={meshRef}
      args={[null, null, count]}
    >
      <tetrahedronGeometry args={[0.2, 0]} />
      <meshPhysicalMaterial
        color={color}
        emissive={color}
        emissiveIntensity={2.5}
        roughness={0.1}
        metalness={0.9}
        transmission={0.6}
        transparent
        opacity={0.9}
      />
    </instancedMesh>
  );
}
