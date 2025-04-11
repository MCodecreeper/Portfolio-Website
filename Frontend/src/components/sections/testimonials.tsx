import React, { useEffect, useRef, useState, useCallback, useMemo } from 'react';
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

interface ResponsiveConfig {
  portalScale: number;
  shardScale: number;
  portalPositions: [number, number, number][];
  cameraPosition: [number, number, number];
  cameraFov: number;
  textScale: number;
  textMaxWidth: number;
}

const TESTIMONIALS: Testimonial[] = [
  {
    quote: "Hamza's expertise in full-stack development and innovative 3D implementations transformed our digital presence. A true professional.",
    author: "Tech Lead",
    role: "",
    company: "Zaaric",
  },
  {
    quote: "His work on our online store was exceptional. The modern features and user-friendly design helped grow our small business significantly.",
    author: "Sarah",
    role: "Business Owner",
    company: "Online Fashion Boutique",
  },
  {
    quote: "His 3D portfolio work is a masterpiece—innovative, immersive, and absolutely next-level.",
    author: "Sara Malik",
    role: "Freelance Designer",
    company: "Self",
  },
];

const BREAKPOINTS = {
  mobile: 480,
  tablet: 768,
  laptop: 1024,
};

const useResponsiveSize = () => {
  const [size, setSize] = useState<ResponsiveConfig>({
    portalScale: 1,
    shardScale: 1,
    portalPositions: [[-13, 3.5, -2], [13, -3.5, -2]],
    cameraPosition: [0, 0, 10] as [number, number, number],
    cameraFov: 60,
    textScale: 0.3,
    textMaxWidth: 5.2
  });

  const handleResize = useCallback(() => {
    const width = window.innerWidth;
    if (width <= BREAKPOINTS.mobile) {
      setSize({
        portalScale: 0.6,
        shardScale: 0.7,
        portalPositions: [[-7, 3, -2], [7, -3, -2]],
        cameraPosition: [0, 0, 8] as [number, number, number],
        cameraFov: 65,
        textScale: 0.35,
        textMaxWidth: 4
      });
    } else if (width <= BREAKPOINTS.tablet) {
      setSize({
        portalScale: 0.8,
        shardScale: 0.85,
        portalPositions: [[-10, 2.5, -2], [10, -2.5, -2]],
        cameraPosition: [0, 0, 9] as [number, number, number],
        cameraFov: 62,
        textScale: 0.4,
        textMaxWidth: 4.5
      });
    } else if (width <= BREAKPOINTS.laptop) {
      setSize({
        portalScale: 0.9,
        shardScale: 0.9,
        portalPositions: [[-11, 3, -2], [11, -3, -2]],
        cameraPosition: [0, 0, 9.5] as [number, number, number],
        cameraFov: 61,
        textScale: 0.29,
        textMaxWidth: 4.8
      });
    } else {
      setSize({
        portalScale: 1,
        shardScale: 1,
        portalPositions: [[-13, 3.5, -2], [13, -3.5, -2]],
        cameraPosition: [0, 0, 10] as [number, number, number],
        cameraFov: 60,
        textScale: 0.3,
        textMaxWidth: 5.2
      });
    }
  }, []);

  useEffect(() => {
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [handleResize]);

  return size;
};

interface CornerPortalProps {
  position: [number, number, number];
  scale: number;
}

const CornerPortal: React.FC<CornerPortalProps> = ({ position, scale }) => {
  const groupRef = useRef<THREE.Group>(null!);
  const outerRingRef = useRef<THREE.Mesh>(null!);
  const innerRingRef = useRef<THREE.Mesh>(null!);
  const innerCoreRef = useRef<THREE.Mesh>(null!);
  const haloRef = useRef<THREE.Mesh>(null!);

  const materials = useMemo(() => ({
    outerRing: new THREE.MeshStandardMaterial({ 
      color: "#00E7FF", 
      emissive: "#8A9CFF", 
      emissiveIntensity: 0.7, 
      roughness: 0.2, 
      metalness: 0.8 
    }),
    innerCore: new THREE.MeshStandardMaterial({ 
      color: "#0D1B2A", 
      emissive: "#00E7FF", 
      emissiveIntensity: 1, 
      wireframe: true 
    }),
    halo: new THREE.MeshBasicMaterial({ 
      color: "#00E7FF", 
      transparent: true, 
      opacity: 0.4, 
      blending: THREE.AdditiveBlending 
    })
  }), []);

  useFrame((state) => {
    const time = state.clock.getElapsedTime();
    if (outerRingRef.current) outerRingRef.current.rotation.x += 0.01;
    if (innerRingRef.current) innerRingRef.current.rotation.y += 0.005;
    if (innerCoreRef.current) innerCoreRef.current.rotation.y += 0.02;
    if (haloRef.current) haloRef.current.rotation.z += 0.02;
    groupRef.current.position.y = position[1] + Math.sin(time * 2) * 0.2;
  });

  return (
    <group ref={groupRef} position={position} scale={scale}>
      <mesh ref={outerRingRef}>
        <torusGeometry args={[3, 0.1, 16, 100]} />
        <primitive object={materials.outerRing} />
      </mesh>
      <mesh ref={innerCoreRef}>
        <icosahedronGeometry args={[1.5, 2]} />
        <primitive object={materials.innerCore} />
      </mesh>
      <mesh ref={haloRef} scale={[4, 1.5, 1]}>
        <ringGeometry args={[0.9, 1, 32]} />
        <primitive object={materials.halo} />
      </mesh>
    </group>
  );
};

interface TestimonialShardProps {
  quote: string;
  active: boolean;
  rotate: boolean;
  scale: number;
  textScale: number;
  textMaxWidth: number;
}

const TestimonialShard: React.FC<TestimonialShardProps> = ({ 
  quote, 
  active, 
  rotate,
  scale,
  textScale,
  textMaxWidth
}) => {
  const groupRef = useRef<THREE.Group>(null!);
  const rotationProgress = useRef(0);

  const material = useMemo(() => new THREE.MeshPhongMaterial({
    color: "#39FF14",
    emissive: "#8A9CFF",
    emissiveIntensity: active ? 1 : 0.3,
    transparent: true,
    opacity: 0.9,
    side: THREE.DoubleSide,
    shininess: 120
  }), [active]);

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
        <primitive object={material} />
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

const Testimonials: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [shouldRotate, setShouldRotate] = useState(false);
  const responsiveSize = useResponsiveSize();

  const handleIntersection = useCallback((entries: IntersectionObserverEntry[]) => {
    const [entry] = entries;
    sectionRef.current?.classList.toggle(styles.inView, entry.isIntersecting);
  }, []);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;
    
    const observer = new IntersectionObserver(handleIntersection, { threshold: 0.2 });
    observer.observe(section);
    return () => observer.disconnect();
  }, [handleIntersection]);

  useEffect(() => {
    const cycle = () => {
      setShouldRotate(true);
      setTimeout(() => {
        setActiveIndex((prev) => (prev + 1) % TESTIMONIALS.length);
        setShouldRotate(false);
      }, 1000);
    };
    const interval = setInterval(cycle, 5000);
    return () => clearInterval(interval);
  }, []);

  const canvasConfig = useMemo(() => ({
    camera: { 
      position: responsiveSize.cameraPosition, 
      fov: responsiveSize.cameraFov 
    },
    lights: {
      ambient: { intensity: 0.4 },
      point1: { 
        position: [10, 10, 10] as [number, number, number], 
        intensity: 1.8, 
        color: "#00E7FF" 
      },
      point2: { 
        position: [-10, -10, -10] as [number, number, number], 
        intensity: 1, 
        color: "#8A9CFF" 
      }
    }
  }), [responsiveSize]);

  return (
    <section id="testimonials" className={styles.testimonials} ref={sectionRef}>
      <div className={styles.header}>
        <h2>Testimonials</h2>
      </div>
      <div className={styles.testimonialContainer}>
        <div className={styles.canvasWrapper}>
          <Canvas camera={canvasConfig.camera}>
            <ambientLight {...canvasConfig.lights.ambient} />
            <pointLight {...canvasConfig.lights.point1} />
            <pointLight {...canvasConfig.lights.point2} />
            <CornerPortal position={responsiveSize.portalPositions[0]} scale={responsiveSize.portalScale} />
            <CornerPortal position={responsiveSize.portalPositions[1]} scale={responsiveSize.portalScale} />
            {TESTIMONIALS.map((testimonial, index) => (
              <TestimonialShard
                key={index}
                quote={`"${testimonial.quote}"`}
                active={index === activeIndex}
                rotate={shouldRotate && index === activeIndex}
                scale={responsiveSize.shardScale}
                textScale={responsiveSize.textScale}
                textMaxWidth={responsiveSize.textMaxWidth}
              />
            ))}
            <OrbitControls enableZoom={false} />
          </Canvas>
        </div>
        <div className={styles.testimonialDetails}>
          {TESTIMONIALS.map((t, i) => (
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