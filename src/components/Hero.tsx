import { motion } from 'framer-motion';
import { Sparkles, Waves } from 'lucide-react';

type ParticleSeed = {
  top: string;
  left: string;
  duration: number;
  y: number;
  scale: number;
};

const particleSeeds: ParticleSeed[] = Array.from({ length: 18 }).map(() => ({
  top: `${Math.random() * 100}%`,
  left: `${Math.random() * 100}%`,
  duration: 6 + Math.random() * 4,
  y: Math.random() * 35 - 18,
  scale: 0.6 + Math.random() * 0.8,
}));

const Hero = () => {
  return (
    <section
      className="relative flex min-h-screen items-center justify-center overflow-hidden"
      id="top"
    >
      <motion.div
        className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(99,102,241,0.25),_transparent_60%),radial-gradient(circle_at_bottom,_rgba(236,72,153,0.2),_transparent_65%)]"
        animate={{ backgroundPosition: ['0% 0%', '100% 100%'] }}
        transition={{ repeat: Infinity, repeatType: 'mirror', duration: 18, ease: 'linear' }}
      />
      <motion.div
        className="absolute inset-0 opacity-70"
        style={{ background: 'linear-gradient(130deg, rgba(99,102,241,0.25), rgba(168,85,247,0.2), rgba(236,72,153,0.25))' }}
        animate={{ filter: ['hue-rotate(0deg)', 'hue-rotate(45deg)', 'hue-rotate(0deg)'] }}
        transition={{ duration: 12, repeat: Infinity, ease: 'easeInOut' }}
      />
      <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.08] mix-blend-screen" />
      {particleSeeds.map((particle, idx) => (
        <motion.span
          key={idx}
          className="absolute h-1.5 w-1.5 rounded-full bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400"
          style={{ top: particle.top, left: particle.left }}
          animate={{
            y: [0, particle.y, 0],
            opacity: [0.15, 0.8, 0.15],
            scale: [particle.scale * 0.6, particle.scale, particle.scale * 0.6],
          }}
          transition={{ duration: particle.duration, repeat: Infinity, ease: 'easeInOut' }}
        />
      ))}
      <div className="relative z-10 mx-auto flex max-w-4xl flex-col items-center gap-12 px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease: 'easeOut' }}
          className="flex flex-col items-center gap-4"
        >
          <span className="flex items-center gap-3 rounded-full border border-white/10 bg-white/5 px-5 py-2 text-xs font-semibold uppercase tracking-[0.35em] text-white/70 backdrop-blur">
            <Sparkles size={16} className="text-purple-300" />
            Synthwave atelier
          </span>
          <motion.h1
            className="text-5xl font-black uppercase leading-tight text-white sm:text-6xl md:text-7xl"
            animate={{
              textShadow: [
                '0 0 12px rgba(99,102,241,0.45)',
                '0 0 24px rgba(168,85,247,0.75)',
                '0 0 12px rgba(99,102,241,0.45)',
              ],
            }}
            transition={{ duration: 5, repeat: Infinity }}
          >
            mahiiruu_
          </motion.h1>
          <p className="max-w-xl text-lg text-white/70 md:text-xl">
            Crafting impossibilities with neon gradients, shifting pixels, and memories from alternate timelines.
          </p>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: 'easeOut', delay: 0.4 }}
          className="flex flex-wrap items-center justify-center gap-4 text-xs uppercase tracking-[0.3em] text-white/50"
        >
          <div className="flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 backdrop-blur">
            <Waves size={14} className="text-indigo-300" />
            Parallax dreams
          </div>
          <div className="flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 backdrop-blur">
            <span className="h-2 w-2 rounded-full bg-gradient-to-br from-pink-500 to-indigo-500" />
            Framer Motion rituals
          </div>
          <div className="flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 backdrop-blur">
            <span className="h-2 w-2 animate-pulseGlow rounded-full bg-gradient-to-br from-purple-400 to-pink-500" />
            Lucide whispers
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;
