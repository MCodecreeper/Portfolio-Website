import React, { useEffect, useRef, useState } from 'react';
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
    title: '3D Chair Visualizer',
    description:
      'A real time 3D chair visualizer revolutionizing the experience of E-Commerce in real perspective. Bridging the gap of online and physical shopping',
    techStack: ['Next', 'TailwindCSS', 'Three.js', 'Framer Motion'],
    liveLink: 'https://3-d-chair-visualizer.vercel.app/',
    githubLink: 'https://github.com/MCodecreeper/3D-chair-Visualizer',
    image: '/assets/3D_chair_visualizer.png',
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
      'Interactive 3D portfolio website showcasing projects with Three.js animations. Maintaining an amazing user experience along with serenity. ',
    techStack: ['React', 'Three.js', 'GSAP', 'TypeScript'],
    liveLink: '#',
    githubLink: 'https://github.com/MCodecreeper/Portfolio-Website.git',
    image: '/assets/3d_portfolio.png',
  },
  {
    title: 'BUXAAR',
    description:
      'Advanced E-Commerce platform with 15+ interfaces, modern UI and smooth animations. ',
    techStack: ['React', 'TailwindCSS', 'GSAP', 'TypeScript'],
    liveLink: '',
    githubLink: 'https://github.com/MCodecreeper/BUXAAR',
    image: '/assets/ecommerce.png',
  },
];

const Projects: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const sliderTrackRef = useRef<HTMLDivElement>(null);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [touchEnd, setTouchEnd] = useState<number | null>(null);

  // Minimum swipe distance (in px)
  const minSwipeDistance = 50;

  useEffect(() => {
    const checkScreenSize = () => {
      setIsMobile(window.innerWidth <= 480);
    };

    checkScreenSize();
    window.addEventListener('resize', checkScreenSize);

    return () => window.removeEventListener('resize', checkScreenSize);
  }, []);

  // Set projects per view based on screen size
  const projectsPerView = isMobile ? 1 : 3;
  const totalSlides = Math.ceil(projects.length / projectsPerView);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          section.classList.add(styles.inView);
        } else {
          section.classList.remove(styles.inView);
        }
      },
      {
        threshold: 0.1,
        rootMargin: '0px',
      }
    );

    observer.observe(section);

    return () => observer.disconnect();
  }, []);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % totalSlides);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + totalSlides) % totalSlides);
  };

  const goToSlide = (slideIndex: number) => {
    setCurrentSlide(slideIndex);
  };

  // Touch event handlers for swipe functionality
  const onTouchStart = (e: React.TouchEvent) => {
    setTouchEnd(null);
    setTouchStart(e.targetTouches[0].clientX);
  };

  const onTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const onTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    
    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > minSwipeDistance;
    const isRightSwipe = distance < -minSwipeDistance;

    if (isLeftSwipe) {
      nextSlide();
    }
    if (isRightSwipe) {
      prevSlide();
    }
  };

  const getVisibleProjects = () => {
    const startIndex = currentSlide * projectsPerView;
    return projects.slice(startIndex, startIndex + projectsPerView);
  };

  return (
    <section id="projects" className={styles.projects} ref={sectionRef}>
      <div className={styles.projectsHeader}>
        <h2>Featured Projects</h2>
      </div>
      
      <div className={styles.sliderContainer}>
        {!isMobile && (
          <button 
            className={`${styles.navButton} ${styles.prevButton}`} 
            onClick={prevSlide}
            aria-label="Previous projects"
          >
            <div className={styles.arrowIcon}>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M15 18L9 12L15 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
          </button>
        )}

        <div 
          className={styles.sliderTrack}
          ref={sliderTrackRef}
          onTouchStart={onTouchStart}
          onTouchMove={onTouchMove}
          onTouchEnd={onTouchEnd}
        >
          <div className={styles.sliderContent}>
            {getVisibleProjects().map((project) => (
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
        </div>

        {!isMobile && (
          <button 
            className={`${styles.navButton} ${styles.nextButton}`} 
            onClick={nextSlide}
            aria-label="Next projects"
          >
            <div className={styles.arrowIcon}>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M9 18L15 12L9 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
          </button>
        )}
      </div>

      <div className={styles.sliderDots}>
        {Array.from({ length: totalSlides }, (_, index) => (
          <button
            key={index}
            className={`${styles.dot} ${index === currentSlide ? styles.activeDot : ''}`}
            onClick={() => goToSlide(index)}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </section>
  );
};

export default Projects;