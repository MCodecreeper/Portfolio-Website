import React, { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import styles from './PublicSpeaking.module.css';

interface SpeakingEvent {
  title: string;
  date: string;
  venue: string;
  description: string;
  highlights: string[];
  image?: string;
}

const speakingEvents: SpeakingEvent[] = [
  {
    title: " Parliamentary Debates Nationals",
    date: "LUMS 2024",
    venue: "Punjab University, Lahore",
    description: "Represent Punjab University in National Level Parliamentary Debating Competitions",
    highlights: [
      "Participated in multiple debate competitions on contemporary issues",
      "Engaged in constructive discussions with teams from across Pakistan",
      "Developed strong argumentation and public speaking skills",
      "Networked with debaters from various universities"
    ],
    image: "/src/assets/lfinal_parliamentary.jpg"
  },
  {
    title: "FCIT Career Fair 2025",
    date: "February 2025",
    venue: "FCIT, University of the Punjab",
    description: "Hosted and organized the annual FCIT Career Fair",
    highlights: [
      "Coordinated with industry professionals and recruiters",
      "Managed event logistics and student participation",
      "Facilitated networking sessions between students and companies",
      "Organized workshops and panel discussions"
    ],
    image: "/src/assets/publicSpeaking.jpg"
  },
  {
    title: "FCIT Annual Dinner 2025",
    date: "January 2025",
    venue: "FCIT, University of the Punjab",
    description: "Hosted the Annual Dinner for FCIT students and faculty",
    highlights: [
      "Planned and executed the entire event program",
      "Coordinated with student societies and performers",
      "Managed guest invitations and seating arrangements",
      "Ensured smooth event flow and entertainment"
    ],
    image: "/src/assets/dinner.jpg"
  }
];

const PublicSpeaking: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add(styles.visible);
          }
        });
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section id="public-speaking" className={styles.publicSpeaking} ref={sectionRef}>
      <div className={styles.header}>
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          Public Speaking & Events
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className={styles.subtitle}
        >
          Leadership Through Communication
        </motion.p>
      </div>

      <div className={styles.eventsContainer}>
        {speakingEvents.map((event, index) => (
          <motion.div
            key={index}
            className={styles.eventCard}
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: index * 0.2 }}
            whileHover={{ scale: 1.02 }}
          >
            {event.image && (
              <div className={styles.eventImage}>
                <img src={event.image} alt={event.title} />
              </div>
            )}
            <div className={styles.eventHeader}>
              <h3>{event.title}</h3>
              <span className={styles.date}>{event.date}</span>
            </div>
            <div className={styles.venue}>{event.venue}</div>
            <p className={styles.description}>{event.description}</p>
            <div className={styles.highlights}>
              {event.highlights.map((highlight, i) => (
                <div key={i} className={styles.highlightItem}>
                  <span className={styles.bullet}>•</span>
                  {highlight}
                </div>
              ))}
            </div>
          </motion.div>
        ))}
      </div>

      <div className={styles.statsContainer}>
        <motion.div
          className={styles.statCard}
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6 }}
        >
          <span className={styles.statNumber}>15+</span>
          <span className={styles.statLabel}>Debating Contests</span>
        </motion.div>
        <motion.div
          className={styles.statCard}
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <span className={styles.statNumber}>5+</span>
          <span className={styles.statLabel}>Major Events</span>
        </motion.div>
        <motion.div
          className={styles.statCard}
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <span className={styles.statNumber}>3+</span>
          <span className={styles.statLabel}>Workshops</span>
        </motion.div>
      </div>
    </section>
  );
};

export default PublicSpeaking; 