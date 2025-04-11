import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Sphere } from '@react-three/drei';
import * as THREE from 'three';

const FloatingSphere = () => {
  const sphereRef = useRef<THREE.Mesh>(null);
  const timeRef = useRef(0);

  useFrame((state, delta) => {
    if (sphereRef.current) {
      timeRef.current += delta;
      sphereRef.current.position.y = Math.sin(timeRef.current) * 0.2;
      sphereRef.current.rotation.x += delta * 0.1;
      sphereRef.current.rotation.y += delta * 0.1;
    }
  });

  return (
    <Sphere ref={sphereRef} args={[1, 32, 32]}>
      <meshStandardMaterial
        color="#00f5ff"
        metalness={0.8}
        roughness={0.2}
        emissive="#00f5ff"
        emissiveIntensity={0.5}
      />
    </Sphere>
  );
};

export default FloatingSphere; 