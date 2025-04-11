import React, { useRef, useMemo, useCallback } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';

interface OrbitingCubeProps {
  position: [number, number, number];
  color?: number;
  size?: number;
}

const OrbitingCube: React.FC<OrbitingCubeProps> = ({ 
  position, 
  color = 0x8A2BE2,
  size = 3
}) => {
  const meshRef = useRef<THREE.Mesh>(null);
  const { viewport } = useThree();
  const isMobile = viewport.width < 768;
  const adjustedSize = isMobile ? size * 0.67 : size;

  const geometry = useMemo(() => 
    new THREE.BoxGeometry(adjustedSize, adjustedSize, adjustedSize), 
    [adjustedSize]
  );

  const material = useMemo(() => 
    new THREE.MeshBasicMaterial({ color, wireframe: true }), 
    [color]
  );

  const animate = useCallback((clock: THREE.Clock) => {
    if (meshRef.current) {
      meshRef.current.rotation.y += isMobile ? 0.015 : 0.02;
      meshRef.current.position.y = Math.sin(clock.getElapsedTime() + position[0]) * (isMobile ? 1.5 : 2);
    }
  }, [isMobile, position]);

  useFrame(({ clock }) => animate(clock));

  return (
    <mesh ref={meshRef} position={position} geometry={geometry} material={material} />
  );
};

interface TimelineConfig {
  positions: [number, number, number][];
  colors: number[];
  sizes: number[];
}

const OrbitingTimeline: React.FC = () => {
  const { viewport } = useThree();
  const isMobile = viewport.width < 768;

  const timelineConfig = useMemo<TimelineConfig>(() => ({
    positions: [
      [isMobile ? -3 : -5, 0, 0],
      [0, 0, 0],
      [isMobile ? 3 : 5, 0, 0]
    ],
    colors: [0x8A2BE2, 0x4B0082, 0x9400D3],
    sizes: [3, 2.5, 3]
  }), [isMobile]);

  return (
    <group>
      {timelineConfig.positions.map((position, index) => (
        <OrbitingCube
          key={`cube-${index}`}
          position={position}
          color={timelineConfig.colors[index]}
          size={timelineConfig.sizes[index]}
        />
      ))}
    </group>
  );
};

export default OrbitingTimeline;