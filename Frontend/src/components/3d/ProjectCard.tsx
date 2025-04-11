import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { gsap } from 'gsap';

interface ProjectCardProps {
  title: string;
  desc: string;
  link: string;
}

const ProjectCard: React.FC<ProjectCardProps> = ({ title, desc, link }) => {
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, 1, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ alpha: true });
    renderer.setSize(200, 200);
    cardRef.current?.appendChild(renderer.domElement);

    const geometry = new THREE.BoxGeometry(3, 4, 0.5);
    const material = new THREE.MeshBasicMaterial({ color: 0x00D4FF, wireframe: true });
    const card = new THREE.Mesh(geometry, material);
    scene.add(card);

    camera.position.z = 5;

    const animate = () => {
      requestAnimationFrame(animate);
      card.rotation.y += 0.01;
      renderer.render(scene, camera);
    };
    animate();

    cardRef.current?.addEventListener('mouseenter', () => {
      gsap.to(card.rotation, { y: Math.PI, duration: 0.8, ease: 'power2.inOut' });
    });

    return () => {
      cardRef.current?.removeChild(renderer.domElement);
    };
  }, []);

  return (
    <div ref={cardRef} className="project-card">
      <h3>{title}</h3>
      <p>{desc}</p>
      <a href={link}>View Project</a>
    </div>
  );
};

export default ProjectCard;