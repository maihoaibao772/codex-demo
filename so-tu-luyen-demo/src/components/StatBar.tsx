import { motion, AnimatePresence } from 'framer-motion';
import { useMemo } from 'react';
import { useGameStore } from '../store/game';

const STAT_LABELS = {
  qi: 'Khí',
  will: 'Ý Chí',
  fate: 'Mệnh',
  rep: 'Danh'
} as const;

const StatBar = () => {
  const { stats } = useGameStore((state) => ({ stats: state.stats }));

  const entries = useMemo(() => Object.entries(stats) as [keyof typeof STAT_LABELS, number][], [stats]);

  return (
    <section aria-label="Thuộc tính" className="space-y-3">
      {entries.map(([key, value]) => (
        <div key={key} className="flex items-center gap-3">
          <span className="w-20 text-sm font-medium text-slate-500 dark:text-slate-300">
            {STAT_LABELS[key]}
          </span>
          <div className="relative h-3 flex-1 overflow-hidden rounded-full bg-slate-200 dark:bg-slate-800">
            <motion.div
              className="absolute inset-y-0 left-0 rounded-full bg-gradient-to-r from-indigo-500 via-purple-500 to-sky-500"
              animate={{ width: `${(value / 12) * 100}%` }}
              transition={{ type: 'spring', stiffness: 120, damping: 20 }}
            />
          </div>
          <AnimatePresence mode="wait" initial={false}>
            <motion.span
              key={value}
              className="w-6 text-right text-sm font-semibold text-slate-700 dark:text-slate-100"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
            >
              {value}
            </motion.span>
          </AnimatePresence>
        </div>
      ))}
    </section>
  );
};

export default StatBar;
