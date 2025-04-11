import { useRef, useEffect } from 'react';
import { useFrame } from '@react-three/fiber';
import { Sphere, useTexture } from '@react-three/drei';
import * as THREE from 'three';
import gsap from 'gsap';

interface HolographicGlobeProps {
  position: [number, number, number];
  size: number;
  color: string;
  delay: number;
}

const HolographicGlobe: React.FC<HolographicGlobeProps> = ({ position, size, color, delay }) => {
  const meshRef = useRef<THREE.Mesh>(null);
  const materialRef = useRef<THREE.ShaderMaterial>(null);

  useEffect(() => {
    if (meshRef.current) {
      gsap.from(meshRef.current.position, {
        y: position[1] - 2,
        duration: 2,
        delay,
        ease: 'power2.out',
      });
    }
  }, [position, delay]);

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.y += 0.002;
      meshRef.current.rotation.x += 0.001;
    }
  });

  return (
    <Sphere ref={meshRef} position={position} args={[size, 32, 32]}>
      <shaderMaterial
        ref={materialRef}
        attach="material"
        args={[{
          uniforms: {
            time: { value: 0 },
            color: { value: new THREE.Color(color) },
          },
          vertexShader: `
            varying vec2 vUv;
            void main() {
              vUv = uv;
              gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
            }
          `,
          fragmentShader: `
            uniform float time;
            uniform vec3 color;
            varying vec2 vUv;
            
            void main() {
              float alpha = 0.2;
              float pulse = sin(time * 2.0) * 0.1 + 0.9;
              vec3 finalColor = color * pulse;
              gl_FragColor = vec4(finalColor, alpha);
            }
          `,
          transparent: true,
          side: THREE.DoubleSide,
        }]}
      />
    </Sphere>
  );
};

const HolographicGlobes: React.FC = () => {
  return (
    <group>
      <HolographicGlobe
        position={[-3, 1, -2]}
        size={0.8}
        color="#6366F1"
        delay={0}
      />
      <HolographicGlobe
        position={[3, -1, -3]}
        size={0.6}
        color="#00E7FF"
        delay={0.2}
      />
      <HolographicGlobe
        position={[-2, -2, -1]}
        size={0.5}
        color="#E0E7FF"
        delay={0.4}
      />
    </group>
  );
};

export default HolographicGlobes; 