import React, { useEffect, useRef, useState } from 'react';
import OrbitingTimeline from '../3d/OrbitingTimeLine';
import styles from './About.module.css';
import { Canvas } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import profileImage from '../../assets/hamza.jpg';
import { motion } from 'framer-motion';

const About: React.FC = () => {
  const statsRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting);
      },
      { threshold: 0.2 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const statsSection = statsRef.current;
    if (!statsSection) return;

    const statsElements = statsSection.querySelectorAll(`.${styles.stat} h3`);
    const targetValues = Array.from(statsElements).map((el) =>
      parseInt(el.textContent || '0', 10)
    );

    const animateNumbers = () => {
      statsElements.forEach((el, index) => {
        let start = 0;
        const end = targetValues[index];
        const duration = 1500;
        const stepTime = 20;
        const steps = duration / stepTime;
        const increment = end / steps;

        let current = start;
        const timer = setInterval(() => {
          current += increment;
          if (current >= end) {
            current = end;
            clearInterval(timer);
          }
          el.textContent = Math.floor(current).toString() + '+';
        }, stepTime);
      });
    };

    const resetNumbers = () => {
      statsElements.forEach((el) => {
        el.textContent = '0';
      });
    };

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          animateNumbers();
        } else {
          resetNumbers();
        }
      },
      {
        threshold: 0.5,
        rootMargin: '0px',
      }
    );

    observer.observe(statsSection);

    return () => observer.disconnect();
  }, []);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3,
      },
    },
  };

  const itemVariants = {
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
        <Canvas camera={{ position: [0, 0, 20], fov: 45 }}>
          <ambientLight intensity={0.5} />
          <pointLight position={[10, 10, 10]} />
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
            <motion.div className={styles.stat} whileHover={{ scale: 1.05 }}>
              <h3>2+</h3>
              <p>Years of Experience</p>
            </motion.div>
            <motion.div className={styles.stat} whileHover={{ scale: 1.05 }}>
              <h3>15+</h3>
              <p>Projects Completed</p>
            </motion.div>
            <motion.div className={styles.stat} whileHover={{ scale: 1.05 }}>
              <h3>5+</h3>
              <p>Tech Stacks Mastered</p>
            </motion.div>
          </motion.div>
        </motion.div>
        
        <motion.div 
          className={styles.profileImageContainer}
          variants={itemVariants}
          whileHover={{ scale: 1.02 }}
        >
          <img src={profileImage} alt="Hamza Kamran" className={styles.profileImage} />
        </motion.div>
      </motion.div>
    </section>
  );
};

export default About;