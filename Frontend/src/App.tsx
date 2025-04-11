import React, { useEffect } from 'react';
import Navigation from './components/navigation';
import Hero from './components/sections/Hero';
import About from './components/sections/About';
import Projects from './components/sections/Projects';
import Skills from './components/sections/Skills';
import PublicSpeaking from './components/sections/PublicSpeaking';
import Contact from './components/sections/Contact';
import Footer from './components/sections/Footer';
import './App.css';
import { setupNavbarScroll } from './utils/navbarScroll';
import Testimonials from './components/sections/testimonials';

const App: React.FC = () => {
  useEffect(() => {
    setupNavbarScroll();
  }, []);

  return (
    <div className="app">
      <Navigation />
      <main className="main-content">
        <Hero key="hero" />
        <About key="about" />
        <Skills key="skills" />
        <Testimonials key="testimonials" />
        <Projects key="projects" />
        <PublicSpeaking key="publicSpeaking" />
        <Contact key="contact" />
      </main>
      <Footer key="footer" />
    </div>
  );
};

export default App;