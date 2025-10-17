import { useMemo } from 'react';
import { motion, useScroll, useSpring } from 'framer-motion';
import Header from './components/Header';
import Hero from './components/Hero';
import About from './components/About';
import Gallery from './components/Gallery';
import Quotes from './components/Quotes';
import Contact from './components/Contact';
import Footer from './components/Footer';
import CursorGlow from './components/CursorGlow';

const App = () => {
  const { scrollYProgress } = useScroll();
  const progressX = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 30,
    mass: 0.2,
  });

  const sections = useMemo(
    () => [
      { id: 'about', label: 'About' },
      { id: 'gallery', label: 'Gallery' },
      { id: 'quotes', label: 'Quotes' },
      { id: 'contact', label: 'Contact' },
    ],
    [],
  );

  return (
    <div className="relative min-h-screen overflow-x-hidden bg-background">
      <motion.div
        className="pointer-events-none fixed inset-x-0 top-0 z-[999] h-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500"
        style={{ scaleX: progressX, transformOrigin: '0% 50%' }}
      />
      <CursorGlow />
      <Header sections={sections} />
      <main className="relative z-10">
        <Hero />
        <About />
        <Gallery />
        <Quotes />
        <Contact />
      </main>
      <Footer />
    </div>
  );
};

export default App;
