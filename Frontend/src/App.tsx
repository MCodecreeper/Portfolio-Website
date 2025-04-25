import { useEffect } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useSound } from './hooks/useSound';
import { SoundToggle } from './components/ui/SoundToggle';
import Navigation from './components/navigation';
import Hero from './components/sections/Hero';
import About from './components/sections/About';
import Skills from './components/sections/Skills';
import Projects from './components/sections/Projects';
import Contact from './components/sections/Contact';
import Footer from './components/sections/Footer';
import Cursor from './components/ui/Cursor';
import LoadingScreen from './components/ui/LoadingScreen';
import { useLoadingStore } from './store/loadingStore';
import './App.css';
import PublicSpeaking from './components/sections/PublicSpeaking';
import Testimonials from './components/sections/testimonials';
import Philosophy from './components/sections/Philosophy';

function App() {
  const { isLoading } = useLoadingStore();
  const { playClick, playHover } = useSound();

  useEffect(() => {
    // Add click sound to all buttons and links
    const addClickSound = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (target.tagName === 'BUTTON' || target.tagName === 'A' || target.closest('button') || target.closest('a')) {
        console.log('Click detected on:', target.tagName);
        playClick();
      }
    };

    // Add hover sound to interactive elements
    const addHoverSound = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (target.tagName === 'BUTTON' || target.tagName === 'A' || target.closest('button') || target.closest('a')) {
        playHover();
      }
    };

    document.addEventListener('click', addClickSound);
    document.addEventListener('mouseover', addHoverSound);

    return () => {
      document.removeEventListener('click', addClickSound);
      document.removeEventListener('mouseover', addHoverSound);
    };
  }, [playClick, playHover]);

  return (
    <Router>
      <div className="app">
        <AnimatePresence>
          {isLoading ? (
            <LoadingScreen />
          ) : (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5 }}
            >
              <Cursor />
              <Navigation />
              <main>
                <Hero />
                <About />
                <Skills />
                <Philosophy />
                <Testimonials />
                <Projects />
                <PublicSpeaking />
                <Contact />
              </main>
              <Footer />
              <SoundToggle />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </Router>
  );
}

export default App;