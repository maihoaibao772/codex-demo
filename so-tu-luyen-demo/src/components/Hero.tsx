import { motion, useScroll, useTransform } from 'framer-motion';
import { useMemo } from 'react';
import { useGameStore } from '../store/game';

const Hero = () => {
  const { status, playerName, oathText, oathTraitTitle, oathTraitDescription, runCounter } = useGameStore();
  const { scrollY } = useScroll();
  const yFront = useTransform(scrollY, [0, 400], [0, -60]);
  const yBack = useTransform(scrollY, [0, 400], [0, -30]);

  const seedInfo = useMemo(() => {
    if (typeof window === 'undefined') {
      return { seed: 'sotu', lead: '0:00' };
    }
    const seed = new URLSearchParams(window.location.search).get('seed') || 'sotu';
    const start = new Date();
    return { seed, lead: `${start.getHours()}:${start.getMinutes().toString().padStart(2, '0')}` };
  }, []);

  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-indigo-100/80 via-transparent to-transparent dark:from-slate-900" aria-labelledby="hero-heading">
      <motion.div
        aria-hidden
        className="absolute -top-20 left-1/2 h-96 w-96 -translate-x-1/2 rounded-full bg-indigo-300/40 blur-3xl dark:bg-indigo-700/30"
        style={{ y: yBack }}
      />
      <div className="container grid gap-10 py-16 md:grid-cols-[minmax(0,1fr)_minmax(0,420px)] md:py-24">
        <div>
          <motion.h1
            id="hero-heading"
            className="text-4xl font-bold tracking-tight text-slate-900 dark:text-white md:text-5xl"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
          >
            Sơ Tu Luyện · Nhập môn kỳ ảo
          </motion.h1>
          <motion.p
            className="mt-6 max-w-2xl text-lg text-slate-600 dark:text-slate-300"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1, ease: 'easeOut' }}
          >
            Từng sự kiện bất ngờ, từng thiên kiếp khắc nghiệt sẽ định hình đạo tâm của bạn. Vun đắp khí, ý chí, mệnh và danh để vượt thoát phàm trần.
          </motion.p>
        </div>
        <motion.div
          className="relative rounded-3xl border border-white/60 bg-white/70 p-6 shadow-soft backdrop-blur dark:border-white/10 dark:bg-slate-900/60"
          style={{ y: yFront }}
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2, ease: 'easeOut' }}
        >
          <dl className="space-y-4 text-sm text-slate-600 dark:text-slate-200">
            <div className="flex justify-between">
              <dt>Hạt giống</dt>
              <dd className="font-semibold text-slate-900 dark:text-white">{seedInfo.seed}</dd>
            </div>
            <div className="flex justify-between">
              <dt>Thời điểm</dt>
              <dd>{seedInfo.lead}</dd>
            </div>
            <div className="flex justify-between">
              <dt>Lượt hành</dt>
              <dd>{runCounter}</dd>
            </div>
            {status !== 'setup' && (
              <>
                <div className="flex justify-between">
                  <dt>Hành giả</dt>
                  <dd>{playerName || 'Vô danh'}</dd>
                </div>
                <div className="flex flex-col gap-1">
                  <dt className="text-xs uppercase tracking-widest text-slate-400">Lời thệ</dt>
                  <dd className="font-medium text-slate-900 dark:text-white">{oathText}</dd>
                  <dd className="text-xs text-slate-500 dark:text-slate-300">{oathTraitTitle} · {oathTraitDescription}</dd>
                </div>
              </>
            )}
          </dl>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;
