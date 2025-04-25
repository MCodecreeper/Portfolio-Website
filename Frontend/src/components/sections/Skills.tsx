import React from 'react';
import { motion } from 'framer-motion';
import { FaReact, FaHtml5, FaCss3Alt, FaNodeJs, FaGitAlt, FaAws, FaDocker, FaFigma } from 'react-icons/fa';
import { SiTypescript, SiNextdotjs, SiTailwindcss, SiMongodb, SiExpress, SiPostgresql, SiWebpack, SiVercel } from 'react-icons/si';
import { TbBrandThreejs } from 'react-icons/tb';
import styles from './Skills.module.css';
import { useInView } from 'react-intersection-observer';

// Temporary placeholder for OrbitingTimeLine


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

const Skills = () => {
  const [skillsRef, skillsInView] = useInView({
    triggerOnce: false,
    threshold: 0.2
  });

  const [toolsRef, toolsInView] = useInView({
    triggerOnce: false,
    threshold: 0.2
  });

  const toolsData = [
    { icon: FaReact, name: 'React', color: '#61DAFB' },
    { icon: SiNextdotjs, name: 'Next.js', color: '#000000' },
    { icon: SiTypescript, name: 'TypeScript', color: '#3178C6' },
    { icon: FaNodeJs, name: 'Node.js', color: '#339933' },
    { icon: SiMongodb, name: 'MongoDB', color: '#47A248' },
    { icon: SiPostgresql, name: 'PostgreSQL', color: '#336791' },
    { icon: SiTailwindcss, name: 'Tailwind', color: '#06B6D4' },
    { icon: TbBrandThreejs, name: 'Three.js', color: '#000000' },
    { icon: FaGitAlt, name: 'Git', color: '#F05032' },
    { icon: FaDocker, name: 'Docker', color: '#2496ED' },
    { icon: SiWebpack, name: 'Webpack', color: '#8DD6F9' },
    { icon: SiVercel, name: 'Vercel', color: '#000000' },
    { icon: FaFigma, name: 'Figma', color: '#F24E1E' }
  ];

  return (
    <section id="skills" className={styles.skills}>
      <div className={styles.skillsWrapper}>
        <motion.div
          ref={skillsRef}
          initial={{ opacity: 0, y: 20 }}
          animate={skillsInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
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
                  animate={skillsInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
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
                            animate={skillsInView ? { width: `${skill.level}%` } : { width: 0 }}
                            transition={{ duration: 1, delay: 0.2 + index * 0.1 }}
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

        <motion.div 
          ref={toolsRef}
          className={styles.toolsRibbon}
          initial={{ opacity: 0, y: 50 }}
          animate={toolsInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <div className={styles.toolsTrack}>
            {[...toolsData, ...toolsData].map((tool, index) => (
              <motion.div 
                key={`${tool.name}-${index}`}
                className={styles.toolItem}
                whileHover={{ 
                  scale: 1.1,
                  filter: 'brightness(1.2)',
                  transition: { duration: 0.2 }
                }}
              >
                <tool.icon style={{ color: tool.color }} />
                <span>{tool.name}</span>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Skills;