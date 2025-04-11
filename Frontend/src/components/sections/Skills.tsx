import React, { useRef, useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FaReact, FaHtml5, FaCss3Alt, FaNodeJs, FaGitAlt, FaAws } from 'react-icons/fa';
import { SiTypescript, SiNextdotjs, SiTailwindcss, SiMongodb, SiExpress } from 'react-icons/si';
import styles from './Skills.module.css';

// Temporary placeholder for OrbitingTimeLine
const OrbitingTimeLine = () => {
  return (
    <div style={{ 
      width: '100%', 
      height: '100%', 
      display: 'flex', 
      justifyContent: 'center', 
      alignItems: 'center',
      color: '#6366F1',
      fontSize: '1.5rem',
      fontWeight: 'bold'
    }}>
      Timeline
    </div>
  );
};

interface Skill {
  name: string;
  level: number;
  icon: React.ComponentType<{ size?: number; color?: string }>;
  color?: string;
}

interface SkillCategory {
  title: string;
  skills: Skill[];
}

const skillCategories: SkillCategory[] = [
  {
    title: "Frontend Development",
    skills: [
      { name: "React.js", level: 95, icon: FaReact, color: "#61DAFB" },
      { name: "Three.js", level: 90, icon: FaHtml5, color: "#000000" },
      { name: "TypeScript", level: 85, icon: SiTypescript, color: "#3178C6" },
      { name: "GSAP", level: 88, icon: SiNextdotjs, color: "#88CE02" },
      { name: "Tailwind CSS", level: 92, icon: SiTailwindcss, color: "#06B6D4" }
    ]
  },
  {
    title: "Backend Development",
    skills: [
      { name: "Node.js", level: 88, icon: FaNodeJs, color: "#339933" },
      { name: "MongoDB", level: 85, icon: SiMongodb, color: "#47A248" },
      { name: "Express.js", level: 90, icon: SiExpress, color: "#000000" },
      { name: "REST APIs", level: 92, icon: FaAws, color: "#009688" },
      { name: "GraphQL", level: 80, icon: FaGitAlt, color: "#E535AB" }
    ]
  },
  {
    title: "Other Skills",
    skills: [
      { name: "Git & GitHub", level: 90, icon: FaGitAlt, color: "#F05032" },
      { name: "UI/UX Design", level: 85, icon: FaCss3Alt, color: "#F24E1E" },
      { name: "Responsive Design", level: 95, icon: FaAws, color: "#6366F1" },
      { name: "Performance Opt", level: 88, icon: FaAws, color: "#00E7FF" },
      { name: "Testing", level: 82, icon: FaGitAlt, color: "#6366F1" }
    ]
  }
];

const Skills: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
          } else {
            setIsVisible(false);
          }
        });
      },
      { threshold: 0.2 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);

  return (
    <section id="skills" className={styles.skills} ref={sectionRef}>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className={styles.content}
      >
        <h2>Skills</h2>
        <div className={styles.skillsContainer}>
          <div className={styles.skillCategories}>
            {skillCategories.map((category, index) => (
              <motion.div
                key={category.title}
                className={styles.skillCategory}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: false }}
              >
                <h3 className={styles.categoryTitle}>{category.title}</h3>
                <div className={styles.skillList}>
                  {category.skills.map((skill) => (
                    <div key={skill.name} className={styles.skillItem}>
                      <div className={styles.skillName}>
                        <span className={styles.skillIcon}>
                          <skill.icon size={20} color={skill.color} />
                        </span>
                        <span>{skill.name}</span>
                      </div>
                      <div className={styles.progressBar}>
                        <motion.div
                          className={styles.progressFill}
                          initial={{ width: 0 }}
                          animate={isVisible ? { width: `${skill.level}%` } : { width: 0 }}
                          transition={{ duration: 1, delay: 0.2 }}
                        />
                      </div>
                      <div className={styles.skillLevel}>{skill.level}%</div>
                    </div>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.div>
      <div className={styles.timelineContainer}>
        <OrbitingTimeLine />
      </div>
    </section>
  );
};

export default Skills;