import { useEffect, useRef, useState } from 'react';
import styles from './LoadingScreen.module.css';
import * as THREE from 'three';
import { useLoadingStore } from '../../store/loadingStore';
import { motion } from 'framer-motion';

const LoadingScreen = () => {
  const [progress, setProgress] = useState(0);
  const setLoading = useLoadingStore(state => state.setLoading);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const sceneRef = useRef<THREE.Scene | null>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const particlesRef = useRef<THREE.Points | null>(null);
  const animationFrameRef = useRef<number | null>(null);
  const [loadingText, setLoadingText] = useState('Initializing');

  useEffect(() => {
    // Initialize Three.js scene
    const initScene = () => {
      if (!canvasRef.current) return;

      // Create scene
      const scene = new THREE.Scene();
      sceneRef.current = scene;

      // Create camera
      const camera = new THREE.PerspectiveCamera(
        75,
        window.innerWidth / window.innerHeight,
        0.1,
        1000
      );
      camera.position.z = 5;
      cameraRef.current = camera;

      // Create renderer
      const renderer = new THREE.WebGLRenderer({
        canvas: canvasRef.current,
        alpha: true,
        antialias: true
      });
      renderer.setSize(window.innerWidth, window.innerHeight);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
      rendererRef.current = renderer;

      // Create particles
      const particleCount = 2500;
      const positions = new Float32Array(particleCount * 3);
      const colors = new Float32Array(particleCount * 3);
      const sizes = new Float32Array(particleCount);

      for (let i = 0; i < particleCount; i++) {
        // Position - create a more structured pattern
        const radius = 5 + Math.random() * 3;
        const theta = Math.random() * Math.PI * 2;
        const phi = Math.random() * Math.PI;
        
        positions[i * 3] = radius * Math.sin(phi) * Math.cos(theta);
        positions[i * 3 + 1] = radius * Math.sin(phi) * Math.sin(theta);
        positions[i * 3 + 2] = radius * Math.cos(phi);

        // Color - professional blue gradient with subtle variations
        const color = new THREE.Color();
        const hue = 0.6 + Math.random() * 0.05; // Narrower blue range
        const saturation = 0.7 + Math.random() * 0.2;
        const lightness = 0.4 + Math.random() * 0.3;
        color.setHSL(hue, saturation, lightness);
        
        colors[i * 3] = color.r;
        colors[i * 3 + 1] = color.g;
        colors[i * 3 + 2] = color.b;

        // Size - varied for depth
        sizes[i] = 0.03 + Math.random() * 0.08;
      }

      const geometry = new THREE.BufferGeometry();
      geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
      geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));
      geometry.setAttribute('size', new THREE.BufferAttribute(sizes, 1));

      const material = new THREE.PointsMaterial({
        size: 0.05,
        vertexColors: true,
        transparent: true,
        opacity: 0.8,
        blending: THREE.AdditiveBlending,
        sizeAttenuation: true
      });

      const particles = new THREE.Points(geometry, material);
      scene.add(particles);
      particlesRef.current = particles;
    };

    // Animation loop
    const animate = () => {
      if (!sceneRef.current || !cameraRef.current || !rendererRef.current || !particlesRef.current) return;

      const time = Date.now() * 0.001;

      // Rotate particles with a more professional, controlled motion
      particlesRef.current.rotation.x = time * 0.05;
      particlesRef.current.rotation.y = time * 0.08;

      // Subtle wave motion
      const positions = particlesRef.current.geometry.attributes.position.array as Float32Array;
      for (let i = 0; i < positions.length; i += 3) {
        positions[i + 1] += Math.sin(time + positions[i] * 0.3) * 0.005;
      }
      particlesRef.current.geometry.attributes.position.needsUpdate = true;

      rendererRef.current.render(sceneRef.current, cameraRef.current);
      animationFrameRef.current = requestAnimationFrame(animate);
    };

    // Handle resize
    const handleResize = () => {
      if (!cameraRef.current || !rendererRef.current) return;

      cameraRef.current.aspect = window.innerWidth / window.innerHeight;
      cameraRef.current.updateProjectionMatrix();
      rendererRef.current.setSize(window.innerWidth, window.innerHeight);
    };

    // Initialize and start animation
    initScene();
    animate();
    window.addEventListener('resize', handleResize);

    // Loading text messages
    const loadingMessages = [
      'Initializing',
      'Loading assets',
      'Preparing environment',
      'Optimizing performance',
      'Finalizing setup'
    ];

    // Simulate loading progress with professional messages
    let messageIndex = 0;
    const progressInterval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(progressInterval);
          // Hide loading screen after a short delay
          setTimeout(() => {
            setLoading(false);
          }, 1000);
          return 100;
        }
        
        // Update loading message based on progress
        const newProgress = prev + Math.random() * 8;
        if (newProgress > 20 && messageIndex === 0) {
          setLoadingText(loadingMessages[1]);
          messageIndex = 1;
        } else if (newProgress > 40 && messageIndex === 1) {
          setLoadingText(loadingMessages[2]);
          messageIndex = 2;
        } else if (newProgress > 60 && messageIndex === 2) {
          setLoadingText(loadingMessages[3]);
          messageIndex = 3;
        } else if (newProgress > 80 && messageIndex === 3) {
          setLoadingText(loadingMessages[4]);
          messageIndex = 4;
        }
        
        return newProgress;
      });
    }, 500);

    // Cleanup
    return () => {
      clearInterval(progressInterval);
      window.removeEventListener('resize', handleResize);
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
      if (rendererRef.current) {
        rendererRef.current.dispose();
      }
      if (particlesRef.current) {
        particlesRef.current.geometry.dispose();
        (particlesRef.current.material as THREE.Material).dispose();
      }
    };
  }, [setLoading]);

  return (
    <motion.div 
      className={styles.loadingScreen}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.8 }}
    >
      <canvas ref={canvasRef} className={styles.backgroundCanvas} />
      <div className={styles.loadingContent}>
        <motion.h1 
          className={styles.logo}
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.5 }}
        >
          PORTFOLIO
        </motion.h1>
        <motion.div 
          className={styles.loadingText}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.5 }}
        >
          {loadingText}
        </motion.div>
        <div className={styles.progressContainer}>
          <motion.div 
            className={styles.progressBar} 
            style={{ width: `${progress}%` }}
            initial={{ width: 0 }}
            animate={{ width: `${progress}%` }}
            transition={{ duration: 0.3 }}
          />
          <span className={styles.progressText}>{Math.round(progress)}%</span>
        </div>
      </div>
    </motion.div>
  );
};

export default LoadingScreen;