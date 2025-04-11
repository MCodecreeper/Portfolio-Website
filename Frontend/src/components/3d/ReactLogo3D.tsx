import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

const ReactLogo3D: React.FC = () => {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!mountRef.current) return;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ alpha: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    mountRef.current.appendChild(renderer.domElement);

    // Create the logo with responsive size
    const getLogoSize = () => {
      const width = window.innerWidth;
      if (width <= 480) return 0.8;      // Small mobile
      if (width <= 768) return 1.5;      // Mobile
      if (width <= 1024) return 1.8;     // Tablet
      return 2;                          // Desktop
    };

    // Get responsive y position
    const getYPosition = () => {
      const width = window.innerWidth;
      if(width <= 400 ) return 0;    // Small mobile (5rem lower)
      if (width <= 480) return 0.5; 
      if (width <= 768) return -0.3;     // Mobile (3rem lower)
      if (width <= 1024) return -0.2;    // Tablet (2rem lower)
      return 1;                          // Desktop (original position)
    };

    // Get responsive x position
    const getXPosition = () => {
      const width = window.innerWidth;
      if (width <= 480) return 0;      // Small mobile (move right)
      if (width <= 768) return 0.2;      // Mobile (slightly right)
      if (width <= 1024) return -0.2;    // Tablet (slightly left)
      return -0.5;                       // Desktop (original position)
    };

    const geometry = new THREE.CylinderGeometry(getLogoSize(), getLogoSize(), 0.5, 32);
    const material = new THREE.MeshBasicMaterial({ color: 0x00E7FF, wireframe: true });
    const logo = new THREE.Mesh(geometry, material);
    logo.position.y = getYPosition();
    logo.position.x = getXPosition();
    logo.position.z = 0;
    scene.add(logo);

    // Create particles
    const particlesGeometry = new THREE.BufferGeometry();
    const particlesCount = window.innerWidth < 768 ? 150 : 200;
    const positions = new Float32Array(particlesCount * 3);
    for (let i = 0; i < particlesCount * 3; i += 3) {
      const radius = window.innerWidth < 768 ? 10 : 14;
      const theta = Math.random() * Math.PI * 2;
      positions[i] = Math.cos(theta) * radius;
      positions[i + 1] = (Math.random() - 0.5) * 3;
      positions[i + 2] = Math.sin(theta) * radius;
    }
    particlesGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 4));
    const particlesMaterial = new THREE.PointsMaterial({ 
      color: 0x39FF14, 
      size: window.innerWidth < 768 ? 0.09 : 0.12
    });
    const particles = new THREE.Points(particlesGeometry, particlesMaterial);
    particles.position.z = -3;
    particles.position.x = getXPosition() - 3.5; // Adjust particles x position relative to logo
    particles.position.y = getYPosition(); // Match particles y position with logo
    scene.add(particles);

    // Position camera based on screen size
    camera.position.z = window.innerWidth < 768 ? 8 : 10;
    camera.position.y = window.innerWidth < 768 ? 1.5 : 2;

    // Animation
    const animate = () => {
      requestAnimationFrame(animate);
      logo.rotation.y += window.innerWidth < 768? 0.007 : 0.01;
      particles.rotation.y += window.innerWidth < 768? 0.005 : 0.007;
      renderer.render(scene, camera);
    };
    animate();

    // Handle resize
    const handleResize = () => {
      const width = window.innerWidth;
      const height = window.innerHeight;

      // Update camera
      camera.aspect = width / height;
      camera.updateProjectionMatrix();

      // Update renderer
      renderer.setSize(width, height);

      // Update logo size and position
      const newSize = getLogoSize();
      const newYPosition = getYPosition();
      const newXPosition = getXPosition();
      logo.scale.set(newSize, newSize, 1);
      logo.position.y = newYPosition;
      logo.position.x = newXPosition;
      particles.position.y = newYPosition;
      particles.position.x = newXPosition - 3.5; // Adjust particles x position relative to logo

      // Update particles
      const newParticlesCount = width < 768 ? 100 : 200;
      const newPositions = new Float32Array(newParticlesCount * 3);
      const radius = width < 768 ? 10 : 14;
      
      for (let i = 0; i < newParticlesCount * 3; i += 3) {
        const theta = Math.random() * Math.PI * 2;
        newPositions[i] = Math.cos(theta) * radius;
        newPositions[i + 1] = (Math.random() - 0.5) * 3;
        newPositions[i + 2] = Math.sin(theta) * radius;
      }

      particlesGeometry.setAttribute('position', new THREE.BufferAttribute(newPositions, 4));
      particlesMaterial.size = width < 768 ? 0.08 : 0.1;

      // Update camera position
      camera.position.z = width < 768 ? 8 : 10;
      camera.position.y = width < 768 ? 1.5 : 2;
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      mountRef.current?.removeChild(renderer.domElement);
      renderer.dispose();
    };
  }, []);

  return <div ref={mountRef} className="react-logo-3d" />;
};

export default ReactLogo3D;