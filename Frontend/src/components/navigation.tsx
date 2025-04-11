import { FC, useState, useEffect } from 'react';
import styles from './Navbar.module.css';

const Navigation: FC = () => {
  const [scrolled, setScrolled] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    const handleResize = () => setIsMobile(window.innerWidth <= 1024);

    handleScroll();
    handleResize();

    window.addEventListener('scroll', handleScroll);
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const navLinks = [
    { to: 'hero', label: 'Home' },
    { to: 'about', label: 'About' },
    { to: 'projects', label: 'Projects' },
    { to: 'skills', label: 'Skills' },
    { to: 'contact', label: 'Contact' },
  ];

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setSidebarOpen(false); // Close sidebar on mobile
  };

  return (
    <nav className={`${styles.navbar} ${scrolled ? styles.scrolled : ''}`}>
      <div className={styles.container}>
        <a href="#home" className={styles.logo} onClick={(e) => { e.preventDefault(); scrollToSection('home'); }}>
          Portfolio
        </a>
        {isMobile ? (
          <>
            <button
              className={styles.menuToggle}
              onClick={() => setSidebarOpen(!sidebarOpen)}
              aria-label={sidebarOpen ? 'Close menu' : 'Open menu'}
            >
              {sidebarOpen ? '✕' : '☰'}
            </button>
            <div className={`${styles.sidebar} ${sidebarOpen ? styles.sidebarOpen : ''}`}>
              <ul className={styles.sidebarLinks}>
                {navLinks.map((link) => (
                  <li key={link.to}>
                    <a
                      href={`#${link.to}`}
                      className={styles.sidebarLink}
                      onClick={(e) => {
                        e.preventDefault();
                        scrollToSection(link.to);
                      }}
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </>
        ) : (
          <ul className={styles.navLinks}>
            {navLinks.map((link) => (
              <li key={link.to}>
                <a
                  href={`#${link.to}`}
                  className={styles.navLink}
                  onClick={(e) => {
                    e.preventDefault();
                    scrollToSection(link.to);
                  }}
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        )}
      </div>
    </nav>
  );
};

export default Navigation;