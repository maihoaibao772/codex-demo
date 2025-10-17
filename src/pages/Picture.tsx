import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Button } from '../components/ui/button';

const images = [
  'https://images.unsplash.com/photo-1526481280695-3c46973ed2b1?auto=format&fit=crop&w=1200&q=80',
  'https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=1200&q=80',
  'https://images.unsplash.com/photo-1526401485004-46910ecc8e51?auto=format&fit=crop&w=1200&q=80',
  'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?auto=format&fit=crop&w=1200&q=80',
  'https://images.unsplash.com/photo-1469474968028-56623f02e42e?auto=format&fit=crop&w=1200&q=80',
  'https://images.unsplash.com/photo-1526483360412-f4dbaf036963?auto=format&fit=crop&w=1200&q=80',
];

const cardVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.12, duration: 0.7, ease: 'easeOut' },
  }),
};

export function PicturePage() {
  return (
    <section className="relative mx-auto flex w-full max-w-6xl flex-col gap-10 pt-28 pb-24">
      <div className="flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-center">
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: 'easeOut' }}
          className="text-3xl font-semibold tracking-[0.3em] text-neon-cyan sm:text-4xl"
        >
          Ảnh để đời 📸
        </motion.h1>
        <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>
          <Button asChild variant="outline">
            <Link to="/">← Back to home</Link>
          </Button>
        </motion.div>
      </div>
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        className="grid gap-6 sm:grid-cols-2 md:gap-8 lg:grid-cols-3"
      >
        {images.map((src, index) => (
          <motion.article
            key={src + index}
            variants={cardVariants}
            custom={index}
            className="glass-panel group relative overflow-hidden rounded-3xl border border-white/10 shadow-lg"
          >
            <div className="relative h-56 overflow-hidden sm:h-64">
              <motion.img
                src={src}
                alt="demo image"
                className="h-full w-full object-cover"
                whileHover={{ scale: 1.08 }}
                transition={{ duration: 0.6, ease: 'easeOut' }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
            </div>
            <div className="flex items-center justify-between px-5 py-4 text-xs uppercase tracking-[0.3em] text-white/60 sm:text-sm">
              <span className="break-words text-center">demo image</span>
              <motion.span
                initial={{ opacity: 0, x: -10 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 }}
                className="text-neon-magenta"
              >
                ✧
              </motion.span>
            </div>
          </motion.article>
        ))}
      </motion.div>
    </section>
  );
}
