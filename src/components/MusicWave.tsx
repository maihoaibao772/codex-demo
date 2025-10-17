import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

const BAR_COUNT = 32;

export function MusicWave() {
  const [levels, setLevels] = useState<number[]>(() =>
    Array.from({ length: BAR_COUNT }, () => Math.random())
  );

  useEffect(() => {
    const interval = window.setInterval(() => {
      setLevels((prev) =>
        prev.map((_, index) =>
          Math.max(0.2, Math.random() * (index % 2 === 0 ? 1 : 0.6) + Math.random() * 0.4)
        )
      );
    }, 300);

    return () => window.clearInterval(interval);
  }, []);

  return (
    <div className="pointer-events-none fixed inset-x-0 bottom-0 z-20 flex h-32 items-end justify-center bg-gradient-to-t from-black/60 via-black/20 to-transparent">
      <div className="flex w-full max-w-4xl items-end justify-center gap-[3px] px-8">
        {levels.map((level, index) => (
          <motion.span
            key={index}
            initial={{ height: `${level * 100}%`, opacity: 0.3 }}
            animate={{
              height: `${level * 100}%`,
              opacity: [0.2, 0.6, 0.4],
            }}
            transition={{ duration: 0.6, ease: 'easeInOut', repeat: Infinity, repeatType: 'reverse' }}
            className="w-[6px] rounded-full bg-gradient-to-t from-neon-magenta/40 via-neon-purple/70 to-neon-cyan"
            style={{ filter: 'blur(0.5px)', mixBlendMode: 'screen' }}
          />
        ))}
      </div>
    </div>
  );
}
