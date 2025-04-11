import React, { useEffect, useRef, useState } from 'react';
import styles from './Skills.module.css';
import OrbitingTimeline from '../3d/OrbitingTimeLine';
import { Canvas } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';

interface Skill {
  name: string;
  level: number;
  icon: string;
}

interface SkillCategory {
  title: string;
  skills: Skill[];
}

const skillCategories: SkillCategory[] = [
  {
    title: "Frontend Development",
    skills: [
      { name: "React.js", level: 95, icon: "⚛️" },
      { name: "Three.js", level: 90, icon: "🎮" },
      { name: "TypeScript", level: 85, icon: "📘" },
      { name: "GSAP", level: 88, icon: "🎯" },
      { name: "Tailwind CSS", level: 92, icon: "🎨" }
    ]
  },
  {
    title: "Backend Development",
    skills: [
      { name: "Node.js", level: 88, icon: "🟢" },
      { name: "MongoDB", level: 85, icon: "🍃" },
      { name: "Express.js", level: 90, icon: "⚡" },
      { name: "REST APIs", level: 92, icon: "🔌" },
      { name: "GraphQL", level: 80, icon: "📊" }
    ]
  },
  {
    title: "Other Skills",
    skills: [
      { name: "Git & GitHub", level: 90, icon: "🔄" },
      { name: "UI/UX Design", level: 85, icon: "🎯" },
      { name: "Responsive Design", level: 95, icon: "📱" },
      { name: "Performance Opt", level: 88, icon: "⚡" },
      { name: "Testing", level: 82, icon: "🧪" }
    ]
  }
];

const Skills: React.FC = () => {
  const progressRefs = useRef<(HTMLDivElement | null)[]>([]);
  const [modelSize, setModelSize] = useState({
    width: '20%',
    height: '20%',
    left: '5%',
    bottom: '5%'
  });

  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      if (width <= 480) {
        setModelSize({
          width: '15%',
          height: '15%',
          left: '2%',
          bottom: '2%'
        });
      } else if (width <= 768) {
        setModelSize({
          width: '18%',
          height: '18%',
          left: '3%',
          bottom: '3%'
        });
      } else if (width <= 1024) {
        setModelSize({
          width: '20%',
          height: '20%',
          left: '4%',
          bottom: '4%'
        });
      } else {
        setModelSize({
          width: '20%',
          height: '20%',
          left: '5%',
          bottom: '5%'
        });
      }
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const progressBar = entry.target as HTMLDivElement;
          const width = progressBar.getAttribute('data-width');
          if (entry.isIntersecting && width) {
            progressBar.style.transition = 'width 1s ease-in-out';
            progressBar.style.width = `${width}%`;
          } else {
            progressBar.style.transition = 'none';
            progressBar.style.width = '0%';
          }
        });
      },
      { threshold: 0.5 }
    );

    progressRefs.current.forEach((ref) => {
      if (ref) observer.observe(ref);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <section id="skills" className={styles.skills}>
      <div className={styles.skillsHeader}>
        <h2>My Skills</h2>
      </div>
      <div className={styles.skillsContainer}>
        {skillCategories.map((category, categoryIndex) => (
          <div key={categoryIndex} className={styles.skillCategory}>
            <h3 className={styles.categoryTitle}>{category.title}</h3>
            <div className={styles.skillList}>
              {category.skills.map((skill, skillIndex) => (
                <div key={skillIndex} className={styles.skillItem}>
                  <div className={styles.skillName}>
                    <span className={styles.skillIcon}>{skill.icon}</span>
                    {skill.name}
                  </div>
                  <div className={styles.progressBar}>
                    <div
                      ref={(el) => (progressRefs.current[categoryIndex * 5 + skillIndex] = el)}
                      className={styles.progressFill}
                      data-width={skill.level}
                      style={{ width: '0%' }}
                    />
                  </div>
                  <span className={styles.skillLevel}>{skill.level}%</span>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
      <div 
        className={styles.modelContainer}
        style={{
          width: modelSize.width,
          height: modelSize.height,
          left: modelSize.left,
          bottom: modelSize.bottom
        }}
      >
        <Canvas camera={{ position: [0, 0, 20], fov: 45 }}>
          <ambientLight intensity={0.5} />
          <pointLight position={[10, 10, 10]} />
          <OrbitingTimeline />
          <OrbitControls enableZoom={false} />
        </Canvas>
      </div>
    </section>
  );
};

export default Skills;