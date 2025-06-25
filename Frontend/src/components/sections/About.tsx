import React, { useEffect, useRef, useState, useCallback, useMemo } from 'react';
import { motion, Variants } from 'framer-motion';
import { Canvas } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import OrbitingTimeline from '../3d/OrbitingTimeLine';
import styles from './About.module.css';

const profileImage = '/assets/hamza.png';

interface Stat {
  value: number;
  label: string;
}

const STATS: Stat[] = [
  { value: 2, label: 'Years of Experience' },
  { value: 15, label: 'Projects Completed' },
  { value: 5, label: 'Tech Stacks Mastered' }
];

const ANIMATION_CONFIG = {
  duration: 1500,
  stepTime: 20,
};

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
      delayChildren: 0.3,
    },
  },
};

const itemVariants: Variants = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      type: 'spring',
      stiffness: 100,
      damping: 10,
    },
  },
};

const About: React.FC = () => {
  const statsRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  const handleIntersection = useCallback((entries: IntersectionObserverEntry[]) => {
    const [entry] = entries;
    setIsVisible(entry.isIntersecting);
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(handleIntersection, { threshold: 0.2 });
    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }
    return () => observer.disconnect();
  }, [handleIntersection]);

  const animateNumber = useCallback((element: Element, targetValue: number) => {
    let current = 0;
    const increment = targetValue / (ANIMATION_CONFIG.duration / ANIMATION_CONFIG.stepTime);
    
    const timer = setInterval(() => {
      current += increment;
      if (current >= targetValue) {
        current = targetValue;
        clearInterval(timer);
      }
      element.textContent = Math.floor(current).toString() + '+';
    }, ANIMATION_CONFIG.stepTime);

    return timer;
  }, []);

  useEffect(() => {
    const statsSection = statsRef.current;
    if (!statsSection) return;

    const statsElements = statsSection.querySelectorAll(`.${styles.stat} h3`);
    const timers: NodeJS.Timeout[] = [];

    const observer = new IntersectionObserver(
      (entries) => {
        const [entry] = entries;
        if (entry.isIntersecting) {
          statsElements.forEach((el, index) => {
            const timer = animateNumber(el, STATS[index].value);
            timers.push(timer);
          });
        } else {
          statsElements.forEach((el) => {
            el.textContent = '0';
          });
          timers.forEach(timer => clearInterval(timer));
          timers.length = 0;
        }
      },
      { threshold: 0.5 }
    );

    observer.observe(statsSection);
    return () => {
      observer.disconnect();
      timers.forEach(timer => clearInterval(timer));
    };
  }, [animateNumber]);

  const canvasConfig = useMemo(() => ({
    camera: { 
      position: [0, 0, 20] as [number, number, number], 
      fov: 45 
    },
    lights: {
      ambient: { intensity: 0.5 },
      point: { 
        position: [10, 10, 10] as [number, number, number],
        intensity: 1
      }
    }
  }), []);

  return (
    <section id="about" className={styles.about} ref={sectionRef}>
      <motion.h2
        initial={{ opacity: 0, y: -20 }}
        animate={isVisible ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6 }}
      >
        About Me
      </motion.h2>
      
      <div className={styles.modelContainer}>
        <Canvas camera={canvasConfig.camera}>
          <ambientLight {...canvasConfig.lights.ambient} />
          <pointLight {...canvasConfig.lights.point} />
          <OrbitingTimeline />
          <OrbitControls enableZoom={false} />
        </Canvas>
      </div>
      
      <motion.div
        className={styles.aboutContent}
        variants={containerVariants}
        initial="hidden"
        animate={isVisible ? "visible" : "hidden"}
      >
        <motion.div className={styles.aboutText} variants={itemVariants}>
          <motion.p variants={itemVariants}>
            I'm Hamza Kamran, a dedicated web developer with over 2 years of experience in building
            full-stack applications using MERN stack. Having expertise in React.js my passion lies
            in creating immersive 3D web experiences with technologies like Three.js and GSAP.
          </motion.p>
          <motion.p variants={itemVariants}>
            I've worked on numerous projects, from e-commerce platforms to interactive portfolios,
            always pushing the boundaries of what's possible on the web. When I'm not coding, you
            can find me exploring literature and politics.
          </motion.p>
          <motion.div className={styles.aboutStats} ref={statsRef} variants={itemVariants}>
            {STATS.map((stat) => (
              <motion.div 
                key={stat.label}
                className={styles.stat} 
                whileHover={{ scale: 1.05 }}
              >
                <h3>0</h3>
                <p>{stat.label}</p>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
        
        <motion.div 
          className={styles.profileImageContainer}
          variants={itemVariants}
          whileHover={{ scale: 1.02 }}
        >
          <img 
            src={profileImage} 
            alt="Hamza Kamran" 
            className={styles.profileImage}
            loading="lazy"
          />
        </motion.div>
      </motion.div>
    </section>
  );
};

export default About;