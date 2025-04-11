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
      if (width <= 480) return 0.7;      // Small mobile
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
      if (width <= 480) return -0.25;    // Small mobile (move right)
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
    
    // Create particles with validated positions
    const createParticlesGeometry = () => {
      const width = window.innerWidth;
      // Increase particle count for better coverage
      const particlesCount = width < 768 ? 150 : 200;
      const positions = new Float32Array(particlesCount * 3);
      // Adjust radius for better spread
      const radius = width < 768 ? 13 : 35;
      
      for (let i = 0; i < particlesCount * 3; i += 3) {
        // Create a more balanced distribution
        const theta = Math.random() * Math.PI * 2;
        const phi = Math.random() * Math.PI * 2;
        const r = (Math.random() * 0.5 + 0.5) * radius; // Ensure minimum radius for better spread
        
        // Use spherical coordinates with offset for balanced distribution
        positions[i] = r * Math.sin(phi) * Math.cos(theta) + (Math.random() - 0.5) * 10;     // x with random offset
        positions[i + 1] = r * Math.sin(phi) * Math.sin(theta) + (Math.random() - 0.5) * 10; // y with random offset
        positions[i + 2] = r * Math.cos(phi) + (Math.random() - 0.5) * 5;                    // z with smaller random offset
        
        // Validate positions
        if (isNaN(positions[i])) positions[i] = 0;
        if (isNaN(positions[i + 1])) positions[i + 1] = 0;
        if (isNaN(positions[i + 2])) positions[i + 2] = 0;
      }
      
      const particlesGeometry = new THREE.BufferGeometry();
      particlesGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
      return particlesGeometry;
    };

    const particlesGeometry = createParticlesGeometry();
    const particlesMaterial = new THREE.PointsMaterial({ 
      color: 0x39FF14, 
      size: window.innerWidth < 768 ? 0.15 : 0.3,
      transparent: true,
      opacity: 0.6,
      sizeAttenuation: true
    });
    
    const particles = new THREE.Points(particlesGeometry, particlesMaterial);
    particles.position.z = -8;  // Move particles even further back for better spread
    particles.position.x = getXPosition() - 2; // Centered position
    particles.position.y = getYPosition();
    scene.add(particles);

    camera.position.z = window.innerWidth < 768 ? 8 : 10;
    camera.position.y = window.innerWidth < 768 ? 1.5 : 2;

    const animate = () => {
      requestAnimationFrame(animate);
      logo.rotation.y += window.innerWidth < 768 ? 0.007 : 0.01;
      particles.rotation.y += window.innerWidth < 768 ? 0.003 : 0.004;
      renderer.render(scene, camera);
    };
    animate();

    const handleResize = () => {
      const width = window.innerWidth;
      const height = window.innerHeight;
      
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height);

      const newSize = getLogoSize();
      const newYPosition = getYPosition();
      const newXPosition = getXPosition();
      
      logo.scale.set(newSize, newSize, 1);
      logo.position.y = newYPosition;
      logo.position.x = newXPosition;
      
      // Update particles with validated geometry
      const newParticlesGeometry = createParticlesGeometry();
      particles.geometry.dispose(); // Clean up old geometry
      particles.geometry = newParticlesGeometry;
      
      particles.position.y = newYPosition;
      particles.position.x = newXPosition - 5.5;
      
      if (particles.material instanceof THREE.PointsMaterial) {
        particles.material.size = width < 768 ? 0.1 : 0.12;
      }

      camera.position.z = width < 768 ? 8 : 10;
      camera.position.y = width < 768 ? 1.5 : 2;
    };
    
    window.addEventListener('resize', handleResize);
    
    return () => {
      window.removeEventListener('resize', handleResize);
      mountRef.current?.removeChild(renderer.domElement);
      
      // Proper cleanup
      geometry.dispose();
      material.dispose();
      particlesGeometry.dispose();
      particlesMaterial.dispose();
      renderer.dispose();
    };
  }, []);

  return <div ref={mountRef} className="react-logo-3d" />;
};

export default ReactLogo3D;