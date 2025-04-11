import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { gsap } from 'gsap';

const PortalButton: React.FC = () => {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, 1, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ alpha: true });
    renderer.setSize(100, 100);
    mountRef.current?.appendChild(renderer.domElement);

    const geometry = new THREE.TorusGeometry(2, 0.5, 16, 100);
    const material = new THREE.MeshBasicMaterial({ color: 0x00FFFF, wireframe: true });
    const portal = new THREE.Mesh(geometry, material);
    scene.add(portal);

    camera.position.z = 5;

    const animate = () => {
      requestAnimationFrame(animate);
      portal.rotation.x += 0.02;
      portal.rotation.y += 0.02;
      renderer.render(scene, camera);
    };
    animate();

    mountRef.current?.addEventListener('click', () => {
      gsap.to(portal.scale, { x: 2, y: 2, z: 2, duration: 0.5, ease: 'power2.out' });
    });

    return () => {
      mountRef.current?.removeChild(renderer.domElement);
    };
  }, []);

  return <div ref={mountRef} className="portal-button" />;
};

export default PortalButton;