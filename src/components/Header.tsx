import { useCallback, useEffect, useState } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

interface HeaderProps {
  sections: { id: string; label: string }[];
}

const Header = ({ sections }: HeaderProps) => {
  const { scrollY } = useScroll();
  const backdropOpacity = useTransform(scrollY, [0, 160], [0, 0.8]);
  const borderOpacity = useTransform(scrollY, [0, 160], [0, 0.5]);
  const [active, setActive] = useState(sections[0]?.id ?? '');

  useEffect(() => {
    const observers: IntersectionObserver[] = [];
    sections.forEach(({ id }) => {
      const element = document.getElementById(id);
      if (!element) return;
      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setActive(id);
          }
        },
        {
          rootMargin: '-40% 0px -40% 0px',
          threshold: [0.2, 0.5, 0.8],
        },
      );
      observer.observe(element);
      observers.push(observer);
    });

    return () => {
      observers.forEach((observer) => observer.disconnect());
    };
  }, [sections]);

  const handleScroll = useCallback((id: string) => {
    const el = document.getElementById(id);
    if (!el) return;
    el.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }, []);

  return (
    <motion.header className="fixed inset-x-0 top-0 z-[998] flex justify-center py-6">
      <motion.div
        className="relative flex w-[min(1100px,94vw)] items-center justify-between rounded-full border border-white/10 bg-white/5 px-6 py-3 backdrop-blur-xl"
        style={{
          backgroundColor: backdropOpacity.to((o) => `rgba(12, 12, 22, ${Math.max(o, 0.25)})`),
          borderColor: borderOpacity.to((o) => `rgba(99, 102, 241, ${o})`),
        }}
      >
        <div className="text-lg font-semibold tracking-[0.3em] uppercase text-white/90">
          mahiiruu_<span className="text-purple-400">*</span>
        </div>
        <nav className="hidden gap-6 md:flex">
          {sections.map(({ id, label }) => (
            <button
              key={id}
              className={`relative text-sm uppercase tracking-widest transition-colors duration-300 ${
                active === id ? 'text-white' : 'text-white/60 hover:text-white'
              }`}
              onClick={() => handleScroll(id)}
            >
              <span className="relative z-10">{label}</span>
              {active === id && (
                <motion.span
                  layoutId="header-pill"
                  className="absolute inset-0 -z-10 rounded-full bg-gradient-to-r from-indigo-500/80 via-purple-500/80 to-pink-500/80 blur"
                  transition={{ type: 'spring', stiffness: 260, damping: 24 }}
                />
              )}
            </button>
          ))}
        </nav>
        <div className="flex md:hidden">
          <motion.a
            href="#contact"
            onClick={(e) => {
              e.preventDefault();
              handleScroll('contact');
            }}
            whileTap={{ scale: 0.94 }}
            className="rounded-full bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 px-4 py-2 text-xs font-semibold uppercase tracking-widest text-white shadow-glow"
          >
            Reach out
          </motion.a>
        </div>
      </motion.div>
    </motion.header>
  );
};

export default Header;
