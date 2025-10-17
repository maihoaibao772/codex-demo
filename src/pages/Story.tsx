import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';

const timeline = [
  {
    year: '2023',
    description: 'The quiet beginning.',
    image: 'https://images.unsplash.com/photo-1526312426976-f4d754fa9bd6?auto=format&fit=crop&w=1200&q=80',
  },
  {
    year: '2024',
    description: 'The storm of creation.',
    image: 'https://images.unsplash.com/photo-1474433188271-d3f339f41911?auto=format&fit=crop&w=1200&q=80',
  },
  {
    year: '2025',
    description: 'The light finds form.',
    image: 'https://images.unsplash.com/photo-1470770903676-69b98201ea1c?auto=format&fit=crop&w=1200&q=80',
  },
];

export function StoryPage() {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  });

  const hueFilter = useTransform(scrollYProgress, [0, 1], ['hue-rotate(0deg)', 'hue-rotate(45deg)']);
  const gradientOpacity = useTransform(scrollYProgress, [0, 1], [0.4, 0.8]);

  return (
    <section ref={containerRef} className="relative mx-auto flex w-full max-w-6xl px-6 pt-28 pb-32">
      <motion.div
        style={{ filter: hueFilter, opacity: gradientOpacity }}
        className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(circle_at_top_left,_rgba(0,245,255,0.25),_transparent_60%),radial-gradient(circle_at_bottom_right,_rgba(155,91,255,0.3),_transparent_55%)] blur-3xl"
      />
      <div className="grid w-full gap-12 md:grid-cols-[200px_1fr]">
        <div className="md:sticky md:top-32 md:h-[calc(100vh-8rem)]">
          <motion.h2
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-4xl font-semibold tracking-[0.35em] text-neon-cyan"
          >
            Story Mode ⏳
          </motion.h2>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.8 }}
            transition={{ delay: 0.4, duration: 0.8 }}
            className="mt-6 text-sm uppercase tracking-[0.4em] text-white/50"
          >
            Scroll to travel time
          </motion.p>
          <motion.div
            className="mt-12 hidden h-64 w-[3px] bg-gradient-to-b from-neon-cyan via-neon-magenta to-neon-purple md:block"
            initial={{ scaleY: 0 }}
            animate={{ scaleY: 1 }}
            transition={{ duration: 1.2, ease: 'easeInOut' }}
          />
        </div>
        <div className="space-y-24">
          {timeline.map((entry, index) => (
            <motion.article
              key={entry.year}
              initial={{ opacity: 0, y: 60 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.9, delay: index * 0.15, ease: [0.33, 1, 0.68, 1] }}
              className="glass-panel overflow-hidden rounded-3xl border border-white/10 shadow-2xl"
            >
              <div className="grid gap-0 md:grid-cols-[1.2fr_1fr]">
                <div className="p-8">
                  <motion.span
                    className="text-sm uppercase tracking-[0.5em] text-neon-magenta"
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true, amount: 0.5 }}
                    transition={{ duration: 0.7, delay: 0.2 }}
                  >
                    {entry.year}
                  </motion.span>
                  <motion.h3
                    className="mt-4 text-3xl font-semibold text-white"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.5 }}
                    transition={{ duration: 0.7, delay: 0.3 }}
                  >
                    {entry.description}
                  </motion.h3>
                  <motion.p
                    className="mt-6 text-base leading-relaxed text-white/70"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.5 }}
                    transition={{ duration: 0.7, delay: 0.4 }}
                  >
                    A cinematic recollection of the creative pulse. Colors hummed in the dark, pixels
                    whispered possibilities, and neon dreams took shape beneath midnight skies.
                  </motion.p>
                </div>
                <div className="relative h-72 overflow-hidden">
                  <motion.img
                    src={entry.image}
                    alt={`${entry.year} story frame`}
                    className="h-full w-full object-cover"
                    initial={{ scale: 1.1 }}
                    whileInView={{ scale: 1 }}
                    viewport={{ once: true, amount: 0.5 }}
                    transition={{ duration: 1.2, ease: 'easeOut' }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent" />
                </div>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
