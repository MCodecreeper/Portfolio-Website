import React from 'react';
import "../../styles/footer.css";

const Footer: React.FC = () => {
  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-brand">
          <h3>Hamza Kamran</h3>
          <p>Building the Future of the Web</p>
        </div>
        <div className="footer-links">
          <a href="#hero">Home</a>
          <a href="#about">About</a>
          <a href="#projects">Projects</a>
          <a href="#skills">Skills</a>
          <a href="#contact">Contact</a>
        </div>
        <div className="footer-socials">
          <a href="https://github.com/MCodecreeper" target="_blank" rel="noopener noreferrer">GitHub</a>
          <a href="https://www.linkedin.com/in/hamza-kamran-7b1a85294/" target="_blank" rel="noopener noreferrer">LinkedIn</a>
        </div>
      </div>
      <div className="footer-bottom">
        <p>&copy; 2025 Hamza Kamran. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;