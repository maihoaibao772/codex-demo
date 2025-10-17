import { useEffect } from 'react';
import { motion, useScroll, useSpring } from 'framer-motion';
import ThemeToggle from './ThemeToggle';
import { cn } from '../lib/utils';

const Header = () => {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 24,
    restDelta: 0.001
  });

  useEffect(() => {
    const handleHash = () => {
      const hash = window.location.hash.slice(1);
      if (hash) {
        document.getElementById(hash)?.scrollIntoView({ behavior: 'smooth' });
      }
    };
    window.addEventListener('hashchange', handleHash);
    return () => window.removeEventListener('hashchange', handleHash);
  }, []);

  return (
    <header className="sticky top-0 z-50 backdrop-blur border-b border-white/10 bg-white/70 dark:bg-slate-950/70">
      <div className="container flex items-center justify-between py-4">
        <a href="#" className="flex items-center gap-2 font-semibold text-lg">
          <span className="h-8 w-8 rounded-full bg-gradient-to-br from-indigo-500 to-purple-500 shadow-soft" />
          Sơ Tu Luyện
        </a>
        <nav className="hidden md:flex items-center gap-6 text-sm font-medium text-slate-600 dark:text-slate-300">
          <a className="hover:text-indigo-500 focus-visible:outline-none focus-visible:ring focus-visible:ring-indigo-400/60 rounded" href="#events">
            Sự kiện
          </a>
          <a className="hover:text-indigo-500 focus-visible:outline-none focus-visible:ring focus-visible:ring-indigo-400/60 rounded" href="#meta">
            Di vật
          </a>
          <a className="hover:text-indigo-500 focus-visible:outline-none focus-visible:ring focus-visible:ring-indigo-400/60 rounded" href="#log">
            Hành trình
          </a>
        </nav>
        <div className="flex items-center gap-3">
          <ThemeToggle />
        </div>
      </div>
      <motion.div
        aria-hidden
        className={cn(
          'h-1 origin-left bg-gradient-to-r from-indigo-500 via-purple-500 to-sky-500'
        )}
        style={{ scaleX }}
      />
    </header>
  );
};

export default Header;
