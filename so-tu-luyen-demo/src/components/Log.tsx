import { useEffect, useRef } from 'react';
import { useGameStore } from '../store/game';

const Log = () => {
  const { runLog } = useGameStore((state) => ({ runLog: state.runLog }));
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = ref.current;
    if (!container) return;
    container.scrollTo({ top: container.scrollHeight, behavior: 'smooth' });
  }, [runLog]);

  return (
    <section id="log" className="flex h-72 flex-col overflow-hidden rounded-2xl border border-white/10 bg-white/60 shadow-inner dark:bg-slate-900/40">
      <header className="px-4 py-3 text-xs font-semibold uppercase tracking-wide text-slate-500 dark:text-slate-300">
        Nhật ký đạo hành
      </header>
      <div ref={ref} className="flex-1 space-y-3 overflow-y-auto px-4 py-3 text-sm text-slate-600 dark:text-slate-300">
        {runLog.length === 0 && <p className="text-xs text-slate-400">Mọi sự kiện sẽ được ghi lại tại đây.</p>}
        {runLog.map((entry) => (
          <p key={entry.id} className="leading-relaxed">
            <span className="mr-2 text-[10px] uppercase tracking-widest text-indigo-400">{entry.type}</span>
            {entry.content}
          </p>
        ))}
      </div>
    </section>
  );
};

export default Log;
