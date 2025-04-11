import React, { useRef, useEffect } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';

const OrbitingCube: React.FC<{ position: [number, number, number] }> = ({ position }) => {
  const meshRef = useRef<THREE.Mesh>(null);
  const { viewport } = useThree();
  const isMobile = viewport.width < 768;

  useFrame(({ clock }) => {
    if (meshRef.current) {
      meshRef.current.rotation.y += isMobile ? 0.015 : 0.02;
      meshRef.current.position.y = Math.sin(clock.getElapsedTime() + position[0]) * (isMobile ? 1.5 : 2);
    }
  });

  return (
    <mesh ref={meshRef} position={position}>
      <boxGeometry args={[isMobile ? 2 : 3, isMobile ? 2 : 3, isMobile ? 2 : 3]} />
      <meshBasicMaterial color={0x8A2BE2} wireframe />
    </mesh>
  );
};

const OrbitingTimeline: React.FC = () => {
  const { viewport } = useThree();
  const isMobile = viewport.width < 768;

  return (
    <>
      <OrbitingCube position={[isMobile ? -3 : -5, 0, 0]} />
      <OrbitingCube position={[0, 0, 0]} />
      <OrbitingCube position={[isMobile ? 3 : 5, 0, 0]} />
    </>
  );
};

export default OrbitingTimeline;