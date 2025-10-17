import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";
import { getRandomQuote } from "../data/quotes";

const Quotes = () => {
  const [quote, setQuote] = useState<string>(() => getRandomQuote());

  useEffect(() => {
    const interval = setInterval(() => {
      setQuote((prev) => getRandomQuote(prev));
    }, 12000);
    return () => clearInterval(interval);
  }, []);

  const refresh = () => setQuote((prev) => getRandomQuote(prev));

  return (
    <section id="quotes" className="mx-auto max-w-3xl px-6 py-24 text-center">
      <h2 className="font-display text-3xl uppercase tracking-[0.4em] text-white/80">Quotes</h2>
      <div className="mt-12">
        <AnimatePresence mode="wait">
          <motion.blockquote
            key={quote}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.6 }}
            className="glass-card inline-block rounded-3xl px-10 py-8 text-lg text-white/80 shadow-neon"
          >
            “{quote}”
          </motion.blockquote>
        </AnimatePresence>
        <motion.button
          onClick={refresh}
          whileHover={{ scale: 1.05, boxShadow: "0 0 25px rgba(76,201,240,0.7)" }}
          whileTap={{ scale: 0.98 }}
          className="mt-8 rounded-full border border-white/20 bg-gradient-to-r from-neon-pink via-neon-purple to-neon-cyan px-8 py-3 text-xs font-semibold uppercase tracking-[0.3em] text-slate-950 shadow-neon"
        >
          Refresh Quote
        </motion.button>
      </div>
    </section>
  );
};

export default Quotes;
