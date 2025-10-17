import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Button } from '../components/ui/button';

const container = {
  hidden: { opacity: 0, y: 20 },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.8,
      when: 'beforeChildren',
      staggerChildren: 0.18,
    },
  },
};

const item = {
  hidden: { opacity: 0, y: 18 },
  show: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.33, 1, 0.68, 1] } },
};

export function HomePage() {
  return (
    <div className="relative flex min-h-[calc(100vh-6rem)] flex-col items-center justify-center pt-24 text-center">
      <motion.div variants={container} initial="hidden" animate="show" className="space-y-6">
        <motion.p
          variants={item}
          className="gradient-text text-4xl font-semibold tracking-[0.4em] uppercase sm:text-5xl lg:text-6xl"
        >
          mahiiruu_
        </motion.p>
        <motion.div
          variants={item}
          className="space-y-2 break-words px-2 text-sm leading-relaxed text-white/70 sm:px-4 sm:text-base lg:text-lg"
        >
          <p>“An artistic space by Hoài Bảo”</p>
          <p>“Born 2006, from Thanh Hóa, now in Hồ Chí Minh.”</p>
          <p>“Do rảnh nên ngồi nghịch 😆”</p>
        </motion.div>
        <motion.p
          variants={item}
          className="break-words px-2 text-xs uppercase tracking-[0.5em] text-neon-cyan/70 sm:px-4 sm:text-sm"
        >
          contact: mahiiruu@demo.com
        </motion.p>
        <motion.div
          variants={item}
          className="flex flex-col items-center justify-center gap-4 pt-4 sm:flex-row"
        >
          <Button asChild className="w-48">
            <Link to="/picture">Ảnh để đời 📸</Link>
          </Button>
          <Button asChild variant="outline" className="w-48 text-white">
            <Link to="/story">Story Mode ⏳</Link>
          </Button>
        </motion.div>
      </motion.div>
    </div>
  );
}
