import { useEffect, useMemo, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { events } from '../data/events';
import type { Choice } from '../lib/types';
import { cn } from '../lib/utils';
import { useGameStore } from '../store/game';

const EventCard = () => {
  const { currentEventId, applyChoice } = useGameStore((state) => ({
    currentEventId: state.currentEventId,
    applyChoice: state.applyChoice
  }));
  const event = useMemo(() => events.find((item) => item.id === currentEventId), [currentEventId]);
  const containerRef = useRef<HTMLDivElement>(null);
  const [focusedIndex, setFocusedIndex] = useState(0);

  useEffect(() => {
    setFocusedIndex(0);
  }, [event?.id]);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;
    const buttons = container.querySelectorAll<HTMLButtonElement>('button[data-choice="true"]');
    if (buttons.length === 0) return;
    const handleKey = (event: KeyboardEvent) => {
      if (!['ArrowDown', 'ArrowUp', 'Enter'].includes(event.key)) return;
      event.preventDefault();
      if (event.key === 'Enter') {
        buttons[focusedIndex]?.click();
        return;
      }
      const delta = event.key === 'ArrowDown' ? 1 : -1;
      const nextIndex = (focusedIndex + delta + buttons.length) % buttons.length;
      setFocusedIndex(nextIndex);
      buttons[nextIndex]?.focus();
    };
    container.addEventListener('keydown', handleKey);
    return () => container.removeEventListener('keydown', handleKey);
  }, [focusedIndex, event?.id]);

  useEffect(() => {
    const buttons = containerRef.current?.querySelectorAll<HTMLButtonElement>('button[data-choice="true"]');
    if (!buttons || buttons.length === 0) return;
    buttons[0].focus();
  }, [event?.id]);

  if (!event) {
    return (
      <div className="rounded-3xl border border-dashed border-indigo-200/50 bg-white/50 p-8 text-center text-slate-500 shadow-soft dark:border-indigo-500/30 dark:bg-slate-900/30">
        Đang khởi tạo cơ duyên...
      </div>
    );
  }

  const handleChoice = (choice: Choice) => {
    applyChoice(choice, event);
  };

  return (
    <AnimatePresence mode="wait">
      <motion.article
        key={event.id}
        ref={containerRef}
        tabIndex={-1}
        className="group relative flex flex-col gap-6 rounded-3xl border border-white/40 bg-white/80 p-6 shadow-soft outline-none backdrop-blur-md focus-visible:ring-2 focus-visible:ring-indigo-400 dark:border-white/10 dark:bg-slate-900/70"
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -40 }}
        transition={{ duration: 0.4, ease: 'easeOut' }}
        id="events"
      >
        <div className="flex items-center justify-between text-xs uppercase tracking-[0.3em] text-indigo-500 dark:text-indigo-300">
          <span>{event.tags.join(' · ')}</span>
        </div>
        <div>
          <h2 className="text-2xl font-semibold text-slate-900 dark:text-white">{event.title}</h2>
          <p className="mt-2 text-base text-slate-600 dark:text-slate-300">{event.body}</p>
        </div>
        <div className="space-y-3" role="group" aria-label="Lựa chọn">
          {event.choices.map((choice, index) => (
            <motion.button
              key={choice.text}
              type="button"
              data-choice="true"
              onClick={() => handleChoice(choice)}
              className={cn(
                'relative w-full overflow-hidden rounded-2xl border border-indigo-200/60 bg-white/70 px-4 py-3 text-left text-sm font-semibold text-slate-600 shadow-sm transition focus-visible:outline-none focus-visible:ring focus-visible:ring-indigo-400/60 dark:border-indigo-500/40 dark:bg-slate-900/80 dark:text-slate-200',
                focusedIndex === index && 'ring-2 ring-indigo-400/60'
              )}
              whileTap={{ scale: 0.98 }}
              whileHover={{ scale: 1.01 }}
            >
              <span>{choice.text}</span>
              <motion.span
                aria-hidden
                className="pointer-events-none absolute inset-0 bg-gradient-to-r from-indigo-400/0 via-indigo-400/10 to-indigo-400/0"
                initial={{ opacity: 0 }}
                whileHover={{ opacity: 1 }}
                transition={{ duration: 0.3 }}
              />
            </motion.button>
          ))}
        </div>
      </motion.article>
    </AnimatePresence>
  );
};

export default EventCard;
