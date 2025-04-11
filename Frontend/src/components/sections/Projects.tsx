import React, { useEffect, useRef } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import styles from './Projects.module.css';

interface Project {
  title: string;
  description: string;
  techStack: string[];
  liveLink: string;
  githubLink: string;
  image: string;
  modelPath?: string;
}

const projects: Project[] = [
  {
    title: 'E-Commerce Platform',
    description:
      'A full-stack e-commerce solution with real-time inventory, payment processing, and admin dashboard.',
    techStack: ['React', 'Node.js', 'MongoDB', 'Stripe'],
    liveLink: '',
    githubLink: 'https://github.com/MCodecreeper/BUXAAR.git',
    image: '/assets/ecommerce.png',
  },
  {
    title: 'ZAARIC',
    description:
      'Modern tech agency website with stunning animations, interactive UI, and seamless user experience.',
    techStack: ['React', 'GSAP', 'Tailwind CSS', 'Framer Motion'],
    liveLink: 'https://zaaric.com',
    githubLink: 'https://github.com/MCodecreeper/Zaaric-Website.git',
    image: '/assets/zaaric.png',
  },
  {
    title: '3D Portfolio',
    description:
      'Interactive 3D portfolio website showcasing projects with Three.js animations.',
    techStack: ['React', 'Three.js', 'GSAP', 'TypeScript'],
    liveLink: '#',
    githubLink: 'https://github.com/MCodecreeper/Portfolio-Website.git',
    image: '/assets/3d_portfolio.png',
  },
];

const Projects: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          section.classList.add(styles.inView); // Use camelCase for CSS module
        } else {
          section.classList.remove(styles.inView);
        }
      },
      {
        threshold: 0.1, // Lowered threshold for earlier detection
        rootMargin: '0px', // Ensures visibility check is precise
      }
    );

    observer.observe(section);

    return () => observer.disconnect(); // Cleanup on unmount
  }, []);

  return (
    <section id="projects" className={styles.projects} ref={sectionRef}>
      <div className={styles.projectsHeader}>
        <h2>Featured Projects</h2>
      </div>
      <div className={styles.projectGrid}>
        {projects.map((project) => (
          <div key={project.title} className={styles.projectCard}>
            <div className={styles.projectCardCanvas}>
              <img
                src={project.image}
                alt={`${project.title} preview`}
                className={styles.projectImage}
                loading="lazy"
              />
              {project.modelPath && (
                <Canvas camera={{ position: [0, 0, 5] }}>
                  <ambientLight intensity={0.5} />
                  <pointLight position={[10, 10, 10]} />
                  <OrbitControls enableZoom={false} />
                </Canvas>
              )}
            </div>
            <div className={styles.projectCardContent}>
              <h3>{project.title}</h3>
              <p>{project.description}</p>
              <div className={styles.techStack}>
                {project.techStack.map((tech) => (
                  <span key={tech} className={styles.techBadge}>
                    {tech}
                  </span>
                ))}
              </div>
              <div className={styles.projectLinks}>
                {project.liveLink && (
                  <a
                    href={project.liveLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`${styles.projectLink} ${styles.primary}`}
                  >
                    Live Demo
                  </a>
                )}
                <a
                  href={project.githubLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`${styles.projectLink} ${styles.secondary}`}
                >
                  View Code
                </a>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Projects;