import React, { useEffect, useRef, useState } from 'react';
import styles from './QimamFellowship.module.css';

const QimamFellowship: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkScreenSize = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    checkScreenSize();
    window.addEventListener('resize', checkScreenSize);

    return () => window.removeEventListener('resize', checkScreenSize);
  }, []);

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

  const qimamPhotos = [
    {
      src: '/assets/qimam/award group.jpg',
      alt: 'Award Group Photo',
      title: 'Award Ceremony',
      description: 'Celebrating our achievements together'
    },
    {
      src: '/assets/qimam/mentorship.jpg',
      alt: 'Mentorship Session',
      title: 'Mentorship',
      description: 'Learning from industry leaders'
    },
    {
      src: '/assets/qimam/travel.jpg',
      alt: 'Travel Experience',
      title: 'Journey',
      description: 'The transformative journey begins'
    },
    {
      src: '/assets/qimam/bazaar technologies tour.jpg',
      alt: 'Bazaar Technologies Tour',
      title: 'Company Visit',
      description: 'Exploring innovative tech solutions'
    },
    
    {
      src: '/assets/qimam/sessions.jpg',
      alt: 'Fellowship Sessions',
      title: 'Learning Sessions',
      description: 'Interactive workshops and discussions'
    },
    {
      src: '/assets/qimam/off_pfp.jpg',
      alt: 'Official Profile',
      title: 'Official Recognition',
      description: 'Professional profile and credentials'
    },
    {
      src: '/assets/qimam/batch pic.jpg',
      alt: 'Batch Photo',
      title: 'Fellowship Batch',
      description: 'The 38 selected leaders together'
    },
    {
      src: '/assets/qimam/IMG-20250803-WA0124.jpg',
      alt: 'Qimam Fellowship Moment',
      title: 'Self Awareness Sessions',
      description: 'Capturing memories of excellence'
    }
  ];

  const openImageModal = (imageSrc: string) => {
    setSelectedImage(imageSrc);
  };

  const closeImageModal = () => {
    setSelectedImage(null);
  };

  return (
    <section id="qimam-fellowship" className={styles.qimamFellowship} ref={sectionRef}>
      <div className={styles.fellowshipHeader}>
        <h2>Qimam Fellowship</h2>
        <p className={styles.subtitle}>International Leadership Program</p>
      </div>

      <div className={styles.fellowshipContent}>
        <div className={styles.fellowshipImage}>
          <img
            src="/assets/awardpic.jpg"
            alt="Qimam Fellowship Award"
            className={styles.awardImage}
            loading="lazy"
          />
          <div className={styles.imageOverlay}>
            <div className={styles.successRate}>
              <span className={styles.rateNumber}>0.3%</span>
              <span className={styles.rateText}>Success Rate</span>
            </div>
          </div>
        </div>

        <div className={styles.fellowshipDetails}>
          <div className={styles.selectionHighlight}>
            <h3>Prestigious Selection</h3>
            <p>
              Selected as one of  <strong> only 38 </strong> students across Pakistan from 
              <strong> 11,000+ applicants</strong> in the Qimam Fellowship - an international 
              program designed to empower high-potential leaders.
            </p>
          </div>

          <div className={styles.experienceHighlights}>
            <h3>Transformative Experience</h3>
            
            <div className={styles.highlightItem}>
              <div className={styles.highlightIcon}>🏢</div>
              <div className={styles.highlightContent}>
                <h4>Corporate Leadership</h4>
                <p>Visited one of the top 6 companies contributing to Pakistan's economy</p>
              </div>
            </div>

            <div className={styles.highlightItem}>
              <div className={styles.highlightIcon}>🤝</div>
              <div className={styles.highlightContent}>
                <h4>Network Building</h4>
                <p>Connected with <strong>50+ </strong> corporate leaders and had one-on-one interactions with <strong>20+ </strong>top leaders and CEOs </p>
              </div>
            </div>

            <div className={styles.highlightItem}>
              <div className={styles.highlightIcon}>💡</div>
              <div className={styles.highlightContent}>
                <h4>Leadership Development</h4>
                <p>Attended transformative workshops on self-awareness and startup funding</p>
              </div>
            </div>
          </div>

          {/* Only show Leaders Who Inspired on desktop */}
          {!isMobile && (
            <div className={styles.leadersMet}>
              <h3>Leaders Who Inspired</h3>
              <div className={styles.leadersGrid}>
                <div className={styles.leaderCard}>
                  <h4>Amir Paracha</h4>
                  <p>CEO, Unilever Pakistan</p>
                </div>
                <div className={styles.leaderCard}>
                  <h4>Nadeem Elhahi</h4>
                  <p>CEO, ibex Pakistan</p>
                </div>
                <div className={styles.leaderCard}>
                  <h4>Hamza Jawaid</h4>
                  <p>CEO, Bazaar Technologies</p>
                </div>
                <div className={styles.leaderCard}>
                  <h4>Atif Azim</h4>
                  <p>CEO, VentureDive</p>
                </div>
                <div className={styles.leaderCard}>
                  <h4>Maha Shahzad</h4>
                  <p>Founder, Bus Karo</p>
                </div>
                <div className={styles.leaderCard}>
                  <h4>Aamir ahsan khan</h4>
                  <p>Strategic Growth Director, Wrackle & Indus Venture</p>
                </div>
                
              </div>
            </div>
          )}

          <div className={styles.impact}>
            <h3>Lifelong Impact</h3>
            <p>
              This fellowship redefined my understanding of leadership, realigned my goals, 
              and fueled my drive for social impact. It's where leaders meet dreamers, 
              and where vision transforms into action.
            </p>
          </div>
        </div>
      </div>

      {/* Photo Gallery Section */}
      <div className={styles.photoGallery}>
        <div className={styles.galleryHeader}>
          <h3>Memories of Excellence</h3>
          <p>Capturing the transformative journey of leadership and growth</p>
        </div>
        
        <div className={styles.galleryGrid}>
          {qimamPhotos.map((photo, index) => (
            <div 
              key={index} 
              className={`${styles.galleryItem} ${styles[`item${index + 1}`]}`}
              onClick={() => openImageModal(photo.src)}
            >
              <div className={styles.imageWrapper}>
                <img
                  src={photo.src}
                  alt={photo.alt}
                  className={styles.galleryImage}
                  loading="lazy"
                />
                <div className={styles.imageOverlay}>
                  <div className={styles.photoInfo}>
                    <h4>{photo.title}</h4>
                    <p>{photo.description}</p>
                  </div>
                  <div className={styles.viewIcon}>
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      <circle cx="12" cy="12" r="3" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Image Modal */}
      {selectedImage && (
        <div className={styles.imageModal} onClick={closeImageModal}>
          <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
            <button className={styles.closeButton} onClick={closeImageModal}>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M18 6L6 18M6 6l12 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>
            <img
              src={selectedImage}
              alt="Qimam Fellowship"
              className={styles.modalImage}
            />
          </div>
        </div>
      )}
    </section>
  );
};

export default QimamFellowship; 