import { useMemo, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { RefreshCcw } from 'lucide-react';
import { quotes } from '../data/quotes';
import { Button } from './ui/button';

const Quotes = () => {
  const randomized = useMemo(() => [...quotes].sort(() => Math.random() - 0.5), []);
  const [index, setIndex] = useState(0);

  const cycleQuote = () => {
    setIndex((prev) => (prev + 1) % randomized.length);
  };

  return (
    <section id="quotes" className="relative mx-auto flex max-w-4xl flex-col gap-10 px-6 py-28 md:py-36">
      <div className="flex flex-col items-start gap-3">
        <h2 className="text-3xl font-semibold uppercase tracking-[0.3em] text-white sm:text-4xl">Quotes</h2>
        <p className="text-sm text-white/60">Fragments collected from future interviews that have not happened yet.</p>
      </div>
      <motion.div
        className="group relative overflow-hidden rounded-3xl border border-white/10 bg-white/5 p-10 text-left shadow-glow backdrop-blur"
      >
        <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/10 via-purple-500/10 to-pink-500/10 opacity-0 transition-opacity duration-700 group-hover:opacity-100" />
        <AnimatePresence mode="wait">
          <motion.blockquote
            key={randomized[index]}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5, ease: 'easeOut' }}
            className="relative text-xl leading-relaxed text-white/80 md:text-2xl"
          >
            “{randomized[index]}”
          </motion.blockquote>
        </AnimatePresence>
        <div className="mt-8 flex items-center justify-between gap-4 text-xs uppercase tracking-[0.3em] text-white/40">
          <span>mahiiruu_ transmissions</span>
          <Button
            tone="ghost"
            size="sm"
            className="group/btn flex items-center gap-2 overflow-hidden"
            onClick={() => {
              cycleQuote();
              console.log('quote-refresh', randomized[(index + 1) % randomized.length]);
            }}
          >
            <RefreshCcw size={14} className="text-purple-300 transition-transform duration-500 group-hover:rotate-180" />
            Refresh
          </Button>
        </div>
      </motion.div>
    </section>
  );
};

export default Quotes;
