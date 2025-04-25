import React, { useEffect, useRef } from 'react';
import ReactLogo3D from '../3d/ReactLogo3D';
import { gsap } from 'gsap';
import './Hero.Module.css';

const LinkedInIcon = '/assets/linkedin.svg';

const Hero: React.FC = () => {
  const textRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.fromTo(textRef.current, { opacity: 0, y: 50 }, { opacity: 1, y: 0, duration: 1.5, ease: 'power3.out' });
  }, []);

  return (
    <section id="hero" className="hero">
      <ReactLogo3D />
      <div ref={textRef} className="hero-content">
        <h1><span>Hi, I'm</span> Hamza Kamran</h1>
        <h2>Crafting Next-Gen Web Experiences</h2>
        <p>
          I'm a passionate web developer with over 2 years of experience, specializing in React.js and 3D web development using Three.js and GSAP. Let's build something extraordinary together!
        </p>
        <div className="hero-cta">
          <a href="#projects" className="cta-button">Explore My Work</a>
          <a href="#contact" className="cta-button secondary">Get in Touch</a>
        </div>
        <div className="hero-socials">
          <a href="https://www.linkedin.com/in/hamza-kamran-7b1a85294/" target="_blank" rel="noopener noreferrer" className="social-link">
            <img src={LinkedInIcon} alt="LinkedIn" className="social-icon" />
            <span>LinkedIn</span>
          </a>
          <a href="mailto:hamzakamran843@gmail.com" className="social-link">
            <span className="social-icon email-icon">✉️</span>
            <span>Email</span>
          </a>  
        </div>
      </div>
    </section>
  );
};

export default Hero;