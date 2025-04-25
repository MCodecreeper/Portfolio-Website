import { motion } from 'framer-motion';
import styles from './Philosophy.module.css';
import { useInView } from 'react-intersection-observer';

const Philosophy = () => {
  const [ref, inView] = useInView({
    triggerOnce: false,
    threshold: 0.2
  });

  return (
    <section ref={ref} className={styles.philosophy}>
      <div className={styles.gridBackground}></div>
      
      <div className={styles.content}>
        <div className={styles.imageSection}>
          <motion.div 
            className={styles.mainImage}
            initial={{ opacity: 0, x: -50 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <img src="/assets/devProcess.png" alt="Development Process" />
            <div className={styles.imageOverlay}>
              <span className={styles.stat}>96.5%</span>
              <span className={styles.statText}>Client Satisfaction</span>
            </div>
          </motion.div>
          
        </div>

        <motion.div 
          className={styles.textContent}
          initial={{ opacity: 0, x: 50 }}
          animate={inView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.3 }}
        >
          <h2>
            <span className={styles.highlight}>DEVELOPMENT PHILOSOPHY</span>
            <span className={styles.emphasis}>FOCUSED ON PERFORMANCE,</span>
            <span className={styles.accent}>NOT JUST APPEARANCE.</span>
          </h2>

          <p className={styles.description}>
            Our development approach combines cutting-edge technology with 
            battle-tested methodologies. We believe in creating solutions 
            that not only look exceptional but perform flawlessly under 
            real-world conditions.
          </p>

          <div className={styles.features}>
            <div className={styles.feature}>
              <span className={styles.featureTitle}>Clean Architecture</span>
              <p>Building scalable and maintainable code structures</p>
            </div>
            <div className={styles.feature}>
              <span className={styles.featureTitle}>Performance First</span>
              <p>Optimizing every millisecond of execution time</p>
            </div>
            <div className={styles.feature}>
              <span className={styles.featureTitle}>Modern Stack</span>
              <p>Leveraging cutting-edge technologies and frameworks</p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Philosophy; 