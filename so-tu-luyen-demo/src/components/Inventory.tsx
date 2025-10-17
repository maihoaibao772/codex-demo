import { useMemo } from 'react';
import { motion } from 'framer-motion';
import { artifacts, talents } from '../data/artifacts';
import { useGameStore } from '../store/game';

const Inventory = () => {
  const { inventory, runArtifacts, runTalents, pendingReward } = useGameStore((state) => ({
    inventory: state.inventory,
    runArtifacts: state.runArtifacts,
    runTalents: state.runTalents,
    pendingReward: state.pendingReward
  }));

  const artifactDetails = useMemo(
    () =>
      runArtifacts
        .map((id) => artifacts.find((item) => item.id === id))
        .filter(Boolean),
    [runArtifacts]
  );

  const talentDetails = useMemo(
    () =>
      runTalents
        .map((id) => talents.find((item) => item.id === id))
        .filter(Boolean),
    [runTalents]
  );

  return (
    <section id="meta" className="space-y-6">
      <div>
        <h2 className="text-sm font-semibold uppercase tracking-wide text-slate-500 dark:text-slate-300">
          Túi đồ
        </h2>
        <div className="mt-3 flex flex-wrap gap-2">
          {inventory.length === 0 && (
            <span className="text-sm text-slate-400">Trống rỗng</span>
          )}
          {inventory.map((item) => (
            <motion.span
              key={item}
              whileHover={{ y: -2 }}
              className="rounded-full border border-indigo-200/60 bg-white/60 px-3 py-1 text-xs font-medium text-indigo-600 shadow-sm dark:border-indigo-500/30 dark:bg-indigo-500/10 dark:text-indigo-200"
            >
              {item}
            </motion.span>
          ))}
        </div>
      </div>
      <div>
        <h2 className="text-sm font-semibold uppercase tracking-wide text-slate-500 dark:text-slate-300">
          Pháp khí
        </h2>
        <div className="mt-3 grid gap-3">
          {artifactDetails.length === 0 && <span className="text-sm text-slate-400">Chưa có</span>}
          {artifactDetails.map((artifact) => (
            <motion.div
              key={artifact!.id}
              layout
              className="rounded-2xl border border-white/10 bg-white/70 p-3 shadow-sm transition hover:-translate-y-1 hover:shadow-lg dark:bg-slate-900/60"
            >
              <p className="text-sm font-semibold text-slate-700 dark:text-slate-100">{artifact!.name}</p>
              <p className="text-xs text-slate-500 dark:text-slate-300">{artifact!.description}</p>
              <div className="mt-2 flex flex-wrap gap-1">
                {artifact!.tags.map((tag) => (
                  <span
                    key={tag}
                    className="rounded-full bg-indigo-100 px-2 py-0.5 text-[10px] font-medium text-indigo-600 dark:bg-indigo-500/20 dark:text-indigo-200"
                  >
                    #{tag}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
      <div>
        <h2 className="text-sm font-semibold uppercase tracking-wide text-slate-500 dark:text-slate-300">
          Thiên phú
        </h2>
        <div className="mt-3 grid gap-2">
          {talentDetails.length === 0 && <span className="text-sm text-slate-400">Chưa lĩnh ngộ</span>}
          {talentDetails.map((talent) => (
            <div key={talent!.id} className="rounded-xl bg-white/70 p-3 text-sm shadow-sm dark:bg-slate-900/60">
              <p className="font-semibold text-slate-700 dark:text-slate-100">{talent!.name}</p>
              <p className="text-xs text-slate-500 dark:text-slate-300">{talent!.description}</p>
            </div>
          ))}
        </div>
      </div>
      {pendingReward?.artifact && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="rounded-2xl border border-indigo-200/50 bg-indigo-50/80 p-4 text-sm text-indigo-700 shadow-sm dark:border-indigo-500/40 dark:bg-indigo-500/20 dark:text-indigo-200"
        >
          Pháp khí mới toanh đang sáng rực: {pendingReward.artifact}
        </motion.div>
      )}
    </section>
  );
};

export default Inventory;
