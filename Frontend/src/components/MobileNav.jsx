import React, { useState } from 'react';
import { Link } from 'react-scroll';
import styles from './MobileNav.module.css';

const MobileNav = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
    document.body.style.overflow = !isOpen ? 'hidden' : 'auto';
  };

  const navLinks = [
    { to: 'home', label: 'Home' },
    { to: 'about', label: 'About' },
    { to: 'projects', label: 'Projects' },
    { to: 'skills', label: 'Skills' },
    { to: 'contact', label: 'Contact' },
  ];

  return (
    <div className={styles.mobileNav}>
      <button 
        className={`${styles.menuButton} ${isOpen ? styles.active : ''}`}
        onClick={toggleMenu}
        aria-label="Toggle menu"
      >
        <span></span>
        <span></span>
        <span></span>
      </button>

      <div className={`${styles.sidebar} ${isOpen ? styles.open : ''}`}>
        <div className={styles.sidebarHeader}>
          <button className={styles.closeButton} onClick={toggleMenu}>
            <span></span>
            <span></span>
            <span></span>
          </button>
        </div>

        <nav className={styles.sidebarNav}>
          <ul>
            {navLinks.map((link) => (
              <li key={link.to}>
                <Link
                  to={link.to}
                  spy={true}
                  smooth={true}
                  offset={-70}
                  duration={500}
                  onClick={toggleMenu}
                  className={styles.sidebarLink}
                >
                  <span className={styles.linkText}>{link.label}</span>
                  <span className={styles.linkIcon}>→</span>
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className={styles.sidebarFooter}>
          <div className={styles.socialLinks}>
            <a href="https://github.com/yourusername" target="_blank" rel="noopener noreferrer" className={styles.socialLink}>
              <i className="fab fa-github"></i>
            </a>
            <a href="https://linkedin.com/in/yourusername" target="_blank" rel="noopener noreferrer" className={styles.socialLink}>
              <i className="fab fa-linkedin"></i>
            </a>
            <a href="https://twitter.com/yourusername" target="_blank" rel="noopener noreferrer" className={styles.socialLink}>
              <i className="fab fa-twitter"></i>
            </a>
          </div>
        </div>
      </div>

      {isOpen && <div className={styles.overlay} onClick={toggleMenu} />}
    </div>
  );
};

export default MobileNav; 