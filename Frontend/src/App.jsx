import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import Navbar from './components/Navbar';
import Hero from './components/sections/Hero';
import About from './components/sections/About';
import Projects from './components/sections/Projects';
import Skills from './components/sections/Skills';
import Contact from './components/sections/Contact';
import Footer from './components/sections/Footer';
import Testimonials from './components/sections/Testimonials';
import PublicSpeaking from './components/sections/PublicSpeaking';
import './App.css';

function App() {
  return (
    <Router>
      <div className="App">
        <Navbar />
        <main>
          <Hero />
          <About />
          <Skills />
          <Projects />
          <Testimonials />
          <PublicSpeaking />
          <Contact />
          <Footer />
        </main>
      </div>
    </Router>
  );
}

export default App; 