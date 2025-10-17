import { useEffect, useMemo, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import Header from './components/Header';
import Hero from './components/Hero';
import EventCard from './components/EventCard';
import Inventory from './components/Inventory';
import Log from './components/Log';
import StatBar from './components/StatBar';
import { useGameStore } from './store/game';

const App = () => {
  const {
    status,
    initialize,
    startRun,
    tribulationOptions,
    resolveTribulation,
    runHistory,
    metaArtifacts,
    metaTalents
  } = useGameStore();
  const [name, setName] = useState('');
  const [oath, setOath] = useState('Bảo hộ chúng sinh');

  useEffect(() => {
    initialize();
  }, [initialize]);

  const canStart = name.trim().length > 0 && oath.trim().length > 0;

  const metaSummary = useMemo(
    () => ({
      artifacts: metaArtifacts.length,
      talents: metaTalents.length,
      runs: runHistory.length
    }),
    [metaArtifacts.length, metaTalents.length, runHistory.length]
  );

  return (
    <div className="min-h-screen bg-gradient-to-b from-white via-indigo-50/30 to-transparent text-slate-900 dark:from-slate-950 dark:text-slate-100">
      <Header />
      <Hero />
      <main className="container grid gap-10 pb-24 lg:grid-cols-[minmax(0,1fr)_320px]">
        <div className="space-y-8">
          {status === 'setup' && (
            <section className="rounded-3xl border border-white/60 bg-white/80 p-6 shadow-soft backdrop-blur dark:border-white/10 dark:bg-slate-900/70">
              <h2 className="text-xl font-semibold text-slate-900 dark:text-white">Khởi hành hành trình</h2>
              <p className="mt-2 text-sm text-slate-500 dark:text-slate-300">
                Ghi tên và lời thệ để thiên địa chứng giám. Hạt giống có thể thay đổi bằng cách sửa tham số <code>?seed=</code> trên URL.
              </p>
              <form
                className="mt-6 grid gap-4"
                onSubmit={(event) => {
                  event.preventDefault();
                  if (!canStart) return;
                  startRun(name, oath);
                }}
              >
                <label className="grid gap-2 text-sm">
                  <span className="font-medium text-slate-600 dark:text-slate-200">Danh xưng</span>
                  <input
                    value={name}
                    onChange={(event) => setName(event.target.value)}
                    className="h-11 rounded-xl border border-slate-200 bg-white px-3 text-base text-slate-800 shadow-sm transition focus-visible:border-indigo-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-400/40 dark:border-slate-700 dark:bg-slate-900"
                    placeholder="Ví dụ: Lăng Sương"
                    required
                  />
                </label>
                <label className="grid gap-2 text-sm">
                  <span className="font-medium text-slate-600 dark:text-slate-200">Lời thệ</span>
                  <input
                    value={oath}
                    onChange={(event) => setOath(event.target.value)}
                    className="h-11 rounded-xl border border-slate-200 bg-white px-3 text-base text-slate-800 shadow-sm transition focus-visible:border-indigo-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-400/40 dark:border-slate-700 dark:bg-slate-900"
                    placeholder="Ví dụ: Bá đạo nghiền nát thiên kiếp"
                    required
                  />
                </label>
                <button
                  type="submit"
                  disabled={!canStart}
                  className="inline-flex items-center justify-center rounded-xl bg-gradient-to-r from-indigo-500 via-purple-500 to-sky-500 px-6 py-3 text-sm font-semibold text-white shadow-lg transition enabled:hover:scale-[1.02] enabled:hover:shadow-xl disabled:cursor-not-allowed disabled:opacity-60"
                >
                  Bước vào kỳ ngộ
                </button>
              </form>
            </section>
          )}

          {status !== 'setup' && <EventCard />}
        </div>
        <aside className="sticky top-28 flex h-max flex-col gap-8">
          <StatBar />
          <Inventory />
          <Log />
          <section className="rounded-2xl border border-white/10 bg-white/70 p-4 text-sm text-slate-600 shadow-sm dark:bg-slate-900/60 dark:text-slate-200">
            <h3 className="text-xs font-semibold uppercase tracking-wide text-slate-500 dark:text-slate-300">Thống kê dài hạn</h3>
            <ul className="mt-3 space-y-1">
              <li>Lượt chơi: {metaSummary.runs}</li>
              <li>Pháp khí lưu giữ: {metaSummary.artifacts}</li>
              <li>Thiên phú khắc ghi: {metaSummary.talents}</li>
            </ul>
          </section>
        </aside>
      </main>

      <AnimatePresence>
        {tribulationOptions.length > 0 && (
          <motion.div
            className="fixed inset-0 z-[999] flex items-center justify-center bg-slate-900/50 backdrop-blur"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            role="dialog"
            aria-modal="true"
            aria-label="Thiên kiếp đến"
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ type: 'spring', stiffness: 120, damping: 20 }}
              className="w-[min(480px,90vw)] rounded-3xl border border-white/20 bg-gradient-to-br from-indigo-500/70 to-purple-500/70 p-8 text-white shadow-2xl"
            >
              <h2 className="text-2xl font-semibold">Thiên Kiếp Giáng</h2>
              <p className="mt-2 text-sm text-indigo-100">Chọn chuỗi ngũ hành phù hợp để dẫn đạo sấm lôi.</p>
              <div className="mt-6 space-y-3">
                {tribulationOptions.map((option) => (
                  <button
                    key={option.id}
                    type="button"
                    onClick={() => resolveTribulation(option.id)}
                    className="w-full rounded-2xl border border-white/20 bg-white/10 px-4 py-3 text-left text-sm font-semibold text-white transition hover:border-white/60 focus-visible:outline-none focus-visible:ring focus-visible:ring-white/50"
                  >
                    {option.sequence.join(' → ')}
                  </button>
                ))}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default App;
