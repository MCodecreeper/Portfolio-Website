import React, { useEffect, useRef, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Text } from '@react-three/drei';
import * as THREE from 'three';
import styles from './testimonial.module.css';

interface Testimonial {
  quote: string;
  author: string;
  role: string;
  company: string;
}

const testimonials: Testimonial[] = [
  {
    quote: "Hamza transformed our online presence with a stunning, animated website that perfectly captured our agency's vision. His creativity is unreal!",
    author: "Ayesha Khan",
    role: "Creative Director",
    company: "Zaaric",
  },
  {
    quote: "Hamza's full-stack expertise and bold design delivered an e-commerce platform that's both powerful and breathtaking.",
    author: "Omar Farooq",
    role: "CEO",
    company: "ShopSphere",
  },
  {
    quote: "His 3D portfolio work is a masterpiece—innovative, immersive, and absolutely next-level.",
    author: "Sara Malik",
    role: "Freelance Designer",
    company: "Self",
  },
];

// Responsive size and position utilities
const useResponsiveSize = () => {
  const [size, setSize] = useState({
    portalScale: 1,
    shardScale: 1,
    portalPositions: [[-13, 3.5, -2], [13, -3.5, -2]] as [number, number, number][],
    cameraPosition: [0, 0, 10] as [number, number, number],
    cameraFov: 60,
    textScale: 0.3,
    textMaxWidth: 5.2
  });

  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      if (width <= 480) {
        setSize({
          portalScale: 0.6,
          shardScale: 0.7,
          portalPositions: [[-7, 3, -2], [7, -3, -2]],
          cameraPosition: [0, 0, 8],
          cameraFov: 65,
          textScale: 0.35,
          textMaxWidth: 4
        });
      } else if (width <= 768) {
        setSize({
          portalScale: 0.8,
          shardScale: 0.85,
          portalPositions: [[-10, 2.5, -2], [10, -2.5, -2]],
          cameraPosition: [0, 0, 9],
          cameraFov: 62,
          textScale: 0.4,
          textMaxWidth: 4.5
        });
      } else if (width <= 1024) {
        setSize({
          portalScale: 0.9,
          shardScale: 0.9,
          portalPositions: [[-11, 3, -2], [11, -3, -2]],
          cameraPosition: [0, 0, 9.5],
          cameraFov: 61,
          textScale: 0.29,
          textMaxWidth: 4.8
        });
      } else {
        setSize({
          portalScale: 1,
          shardScale: 1,
          portalPositions: [[-13, 3.5, -2], [13, -3.5, -2]],
          cameraPosition: [0, 0, 10],
          cameraFov: 60,
          textScale: 0.3,
          textMaxWidth: 5.2
        });
      }
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return size;
};

// Corner Portal with Dynamic Multi-Plane Rotation
const CornerPortal: React.FC<{ position: [number, number, number]; scale: number }> = ({ position, scale }) => {
  const groupRef = useRef<THREE.Group>(null!);
  const outerRingRef = useRef<THREE.Mesh>(null!);
  const innerRingRef = useRef<THREE.Mesh>(null!);
  const innerCoreRef = useRef<THREE.Mesh>(null!);
  const haloRef = useRef<THREE.Mesh>(null!);

  useFrame((state) => {
    const time = state.clock.getElapsedTime();
    if (outerRingRef.current) outerRingRef.current.rotation.x += 0.01
    if (innerRingRef.current) innerRingRef.current.rotation.y += 0.005;
    if (innerCoreRef.current) innerCoreRef.current.rotation.y += 0.02;
    if (haloRef.current) haloRef.current.rotation.z += 0.02;
    groupRef.current.position.y = position[1] + Math.sin(time * 2) * 0.2;
  });

  return (
    <group ref={groupRef} position={position} scale={scale}>
      <mesh ref={outerRingRef}>
        <torusGeometry args={[3, 0.1, 16, 100]} />
        <meshStandardMaterial color="#00E7FF" emissive="#8A9CFF" emissiveIntensity={0.7} roughness={0.2} metalness={0.8} />
      </mesh>
      <mesh ref={innerCoreRef}>
        <icosahedronGeometry args={[1.5, 2]} />
        <meshStandardMaterial color="#0D1B2A" emissive="#00E7FF" emissiveIntensity={1} wireframe />
      </mesh>
      <mesh ref={haloRef} scale={[4, 1.5, 1]}>
        <ringGeometry args={[0.9, 1, 32]} />
        <meshBasicMaterial color="#00E7FF" transparent opacity={0.4} blending={THREE.AdditiveBlending} />
      </mesh>
    </group>
  );
};

// Testimonial Shard with Vertical Flip and Static Glow
const TestimonialShard: React.FC<{ 
  quote: string; 
  active: boolean; 
  rotate: boolean;
  scale: number;
  textScale: number;
  textMaxWidth: number;
}> = ({ 
  quote, 
  active, 
  rotate,
  scale,
  textScale,
  textMaxWidth
}) => {
  const groupRef = useRef<THREE.Group>(null!);
  const rotationProgress = useRef(0);

  useFrame(() => {
    if (groupRef.current) {
      if (rotate && rotationProgress.current < Math.PI) {
        rotationProgress.current += 0.05;
        groupRef.current.rotation.x += 0.05;
      } else {
        groupRef.current.rotation.x = 0;
        rotationProgress.current = 0;
      }
      groupRef.current.position.z = active ? 2 : 0;
    }
  });

  return (
    <group ref={groupRef} visible={active} scale={scale}>
      <mesh position={[0, 0, 0]}>
        <boxGeometry args={[9, 4.5, 0.1]} />
        <meshPhongMaterial
          color="#39FF14"
          emissive="#8A9CFF"
          emissiveIntensity={active ? 1 : 0.3}
          transparent
          opacity={0.9}
          side={THREE.DoubleSide}
          shininess={120}
        />
      </mesh>
      <Text
        position={[0, 0, 0.06]}
        fontSize={textScale}
        color="#0D1B2A"
        anchorX="center"
        anchorY="middle"
        maxWidth={textMaxWidth}
        textAlign="center"
      >
        {quote}
      </Text>
    </group>
  );
};

// Main Testimonials Component
const Testimonials: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const [activeIndex, setActiveIndex] = React.useState(0);
  const [shouldRotate, setShouldRotate] = React.useState(false);
  const responsiveSize = useResponsiveSize();

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        section.classList.add(entry.isIntersecting ? styles.inView : '');
        section.classList.remove(entry.isIntersecting ? '' : styles.inView);
      },
      { threshold: 0.2 }
    );
    observer.observe(section);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const cycle = () => {
      setShouldRotate(true);
      setTimeout(() => {
        setActiveIndex((prev) => (prev + 1) % testimonials.length);
        setShouldRotate(false);
      }, 1000);
    };
    const interval = setInterval(cycle, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section id="testimonials" className={styles.testimonials} ref={sectionRef}>
      <div className={styles.header}>
        <h2>Testimonials</h2>
      </div>
      <div className={styles.testimonialContainer}>
        <div className={styles.canvasWrapper}>
          <Canvas camera={{ position: responsiveSize.cameraPosition, fov: responsiveSize.cameraFov }}>
            <ambientLight intensity={0.4} />
            <pointLight position={[10, 10, 10]} intensity={1.8} color="#00E7FF" />
            <pointLight position={[-10, -10, -10]} intensity={1} color="#8A9CFF" />
            <CornerPortal position={responsiveSize.portalPositions[0]} scale={responsiveSize.portalScale} />
            <CornerPortal position={responsiveSize.portalPositions[1]} scale={responsiveSize.portalScale} />
            {testimonials.map((t, i) => (
              <TestimonialShard
                key={i}
                quote={`"${t.quote}"`}
                active={i === activeIndex}
                rotate={shouldRotate && i === activeIndex}
                scale={responsiveSize.shardScale}
                textScale={responsiveSize.textScale}
                textMaxWidth={responsiveSize.textMaxWidth}
              />
            ))}
            <OrbitControls enableZoom={false} enablePan={false} autoRotate={false} />
          </Canvas>
        </div>
        <div className={styles.testimonialDetails}>
          {testimonials.map((t, i) => (
            <div
              key={i}
              className={`${styles.testimonialCard} ${i === activeIndex ? styles.active : ''}`}
              onClick={() => {
                setActiveIndex(i);
                setShouldRotate(true);
                setTimeout(() => setShouldRotate(false), 1000);
              }}
            >
              <p className={styles.quote}>"{t.quote}"</p>
              <div className={styles.authorInfo}>
                <h3>{t.author}</h3>
                <p>{t.role}, {t.company}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;