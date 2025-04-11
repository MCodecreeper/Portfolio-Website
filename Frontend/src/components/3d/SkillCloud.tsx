import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';
import styles from './SkillsCloud.module.css';

const SkillCloud: React.FC = () => {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / 2 / 400, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ alpha: true });
    renderer.setSize(window.innerWidth / 2, 400);
    mountRef.current?.appendChild(renderer.domElement);

    const skills = ['React.js', 'Three.js', 'GSAP', 'Node.js', 'JavaScript', 'CSS'];
    const spheres: THREE.Mesh[] = [];

    skills.forEach((skill, i) => {
      const geometry = new THREE.SphereGeometry(1, 16, 16);
      const material = new THREE.MeshBasicMaterial({ color: 0xFF00FF, wireframe: true });
      const sphere = new THREE.Mesh(geometry, material);
      sphere.position.x = Math.cos((i / skills.length) * Math.PI * 2) * 5;
      sphere.position.z = Math.sin((i / skills.length) * Math.PI * 2) * 5;
      (sphere as any).skillName = skill;
      scene.add(sphere);
      spheres.push(sphere);
    });

    camera.position.z = 15;

    const animate = () => {
      requestAnimationFrame(animate);
      spheres.forEach((sphere, i) => {
        sphere.position.x = Math.cos(Date.now() * 0.001 + i) * 5;
        sphere.position.z = Math.sin(Date.now() * 0.001 + i) * 5;
        sphere.rotation.y += 0.02;
      });
      renderer.render(scene, camera);
    };
    animate();

    const handleResize = () => {
      camera.aspect = (window.innerWidth / 2) / 400;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth / 2, 400);
    };
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      mountRef.current?.removeChild(renderer.domElement);
      renderer.dispose();
    };
  }, []);

  return <div ref={mountRef} className={styles.skillCloud} />;
};

export default SkillCloud;