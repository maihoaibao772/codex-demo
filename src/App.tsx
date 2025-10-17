import { useState, type ReactNode } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { BackgroundFX } from './components/BackgroundFX';
import { MusicWave } from './components/MusicWave';
import { HomePage } from './pages/Home';
import { PicturePage } from './pages/Picture';
import { StoryPage } from './pages/Story';

function PageWrapper({ children }: { children: ReactNode }) {
  return (
    <motion.main
      className="flex-1"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.6, ease: [0.33, 1, 0.68, 1] }}
    >
      {children}
    </motion.main>
  );
}

export default function App() {
  const location = useLocation();
  const [showFX, setShowFX] = useState(true);
  const [showWave, setShowWave] = useState(true);

  return (
    <div className="relative min-h-screen overflow-hidden bg-background text-white">
      {showFX && <BackgroundFX />}
      <div className="relative z-10 flex min-h-screen flex-col">
        <Navbar />
        <AnimatePresence mode="wait" initial={false}>
          <PageWrapper key={location.pathname}>
            <Routes location={location}>
              <Route path="/" element={<HomePage />} />
              <Route path="/picture" element={<PicturePage />} />
              <Route path="/story" element={<StoryPage />} />
            </Routes>
          </PageWrapper>
        </AnimatePresence>
        <Footer
          showFX={showFX}
          toggleFX={() => setShowFX((prev) => !prev)}
          showWave={showWave}
          toggleWave={() => setShowWave((prev) => !prev)}
        />
      </div>
      <AnimatePresence>
        {showWave && (
          <motion.div
            key="music-wave"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.6 }}
          >
            <MusicWave />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
