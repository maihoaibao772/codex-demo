import { create } from 'zustand';
import { devtools } from 'zustand/middleware';
import { artifacts } from '../data/artifacts';
import { events } from '../data/events';
import { resolveOathTrait } from '../data/oath';
import type {
  Choice,
  GameEvent,
  OathTrait,
  RunLogEntry,
  Stats,
  TribulationOption
} from '../lib/types';
import { createRng } from '../lib/rng';
import { loadState, saveState } from '../lib/storage';

type GameStatus = 'setup' | 'running' | 'tribulation' | 'ended';

interface RunSummary {
  result: 'ascend' | 'fall';
  timestamp: number;
  events: number;
}

interface PersistedMeta {
  metaArtifacts: string[];
  metaTalents: string[];
}

interface GameState {
  status: GameStatus;
  playerName: string;
  oathText: string;
  oathTraitTitle: string;
  oathTraitDescription: string;
  oathTrait: OathTrait | null;
  stats: Stats;
  inventory: string[];
  runArtifacts: string[];
  runTalents: string[];
  metaArtifacts: string[];
  metaTalents: string[];
  cracks: number;
  runLog: RunLogEntry[];
  runHistory: RunSummary[];
  currentEventId: string | null;
  queuedEvents: string[];
  eventCount: number;
  tribulationOptions: TribulationOption[];
  seed: string;
  rngState: number;
  runCounter: number;
  pendingReward: { artifact?: string; talent?: string } | null;
  initialize: () => void;
  startRun: (name: string, oath: string) => void;
  nextEvent: () => void;
  applyChoice: (choice: Choice, event: GameEvent) => void;
  triggerTribulation: () => void;
  resolveTribulation: (id: string) => void;
  saveMeta: () => void;
  resetRun: (result?: 'ascend' | 'fall') => void;
  clearMeta: () => void;
}

const TRIBULATION_INTERVAL = 5;
const MAX_STAT = 10;

const clamp = (value: number, cap: number) => Math.max(0, Math.min(cap, Math.round(value)));

const getSeed = () => {
  if (typeof window === 'undefined') return 'sotu';
  const params = new URLSearchParams(window.location.search);
  return params.get('seed') || 'sotu';
};

const defaultStats: Stats = { qi: 4, will: 4, fate: 4, rep: 4 };

const pickRandomEvent = (seed: string, rngState: number): { event: GameEvent; nextState: number } => {
  const rng = createRng(seed, rngState);
  const event = rng.pick(events);
  return { event, nextState: rng.getState() };
};

const buildTribulationOptions = (seed: string, rngState: number) => {
  const rng = createRng(seed, rngState);
  const base = ['Kim', 'Mộc', 'Thủy', 'Hỏa', 'Thổ'];
  const options: TribulationOption[] = Array.from({ length: 3 }).map((_, index) => {
    const sequence = base
      .slice()
      .sort(() => rng.next() - 0.5)
      .slice(0, 3);
    return { id: `option-${index}`, sequence, correct: false };
  });
  const correctIndex = rng.nextInt(options.length);
  options[correctIndex].correct = true;
  return { options, nextState: rng.getState() };
};

const restoreMeta = () => {
  const persisted = loadState<PersistedMeta>();
  return {
    metaArtifacts: persisted?.metaArtifacts ?? [],
    metaTalents: persisted?.metaTalents ?? []
  };
};

export const useGameStore = create<GameState>()(
  devtools((set, get) => ({
    status: 'setup',
    playerName: '',
    oathText: '',
    oathTraitTitle: '',
    oathTraitDescription: '',
    oathTrait: null,
    stats: defaultStats,
    inventory: [],
    runArtifacts: [],
    runTalents: [],
    ...restoreMeta(),
    cracks: 0,
    runLog: [],
    runHistory: [],
    currentEventId: null,
    queuedEvents: [],
    eventCount: 0,
    tribulationOptions: [],
    seed: getSeed(),
    rngState: 0,
    runCounter: 0,
    pendingReward: null,
    initialize: () => {
      const meta = restoreMeta();
      set((state) => ({ ...state, ...meta }));
    },
    startRun: (name, oath) => {
      const trait = resolveOathTrait(oath);
      const { metaArtifacts, metaTalents, seed, runCounter } = get();
      const nextRng = createRng(seed);
      set({
        status: 'running',
        playerName: name,
        oathText: oath,
        oathTraitTitle: trait.title,
        oathTraitDescription: trait.description,
        oathTrait: trait,
        stats: { ...defaultStats },
        inventory: [],
        runArtifacts: [...metaArtifacts],
        runTalents: [...metaTalents],
        runLog: [
          {
            id: 'start',
            type: 'system',
            content: `Lời thệ: "${oath}" → ${trait.title}`,
            timestamp: Date.now()
          }
        ],
        currentEventId: null,
        queuedEvents: [],
        eventCount: 0,
        tribulationOptions: [],
        rngState: nextRng.getState(),
        runCounter: runCounter + 1,
        cracks: 0,
        pendingReward: null
      });
      get().nextEvent();
    },
    nextEvent: () => {
      const { queuedEvents, seed, rngState } = get();
      if (queuedEvents.length > 0) {
        const [nextId, ...rest] = queuedEvents;
        set({ currentEventId: nextId, queuedEvents: rest });
        return;
      }
      const { event, nextState } = pickRandomEvent(seed, rngState);
      set({ currentEventId: event.id, rngState: nextState });
    },
    applyChoice: (choice, event) => {
      const state = get();
      if (state.status !== 'running') return;
      const logEntries: RunLogEntry[] = [];
      let { stats, inventory, runArtifacts, runTalents, cracks } = state;
      const { oathTrait } = state;

      const applyEffects = (effects?: Choice['effects'], withTrait = false) => {
        if (!effects) return;
        const updatedStats: Stats = { ...stats };
        if (effects.stats) {
          (Object.entries(effects.stats) as [keyof Stats, number][]).forEach(([key, delta]) => {
            const cap = runArtifacts.includes('kien-cot-linh-thach') && key === 'qi' ? 12 : MAX_STAT;
            updatedStats[key] = clamp(updatedStats[key] + delta, cap);
          });
        }
        if (withTrait && oathTrait?.effects && oathTrait.triggerTags?.some((tag) => event.tags.includes(tag))) {
          (Object.entries(oathTrait.effects) as [keyof Stats, number][]).forEach(([key, delta]) => {
            const cap = runArtifacts.includes('kien-cot-linh-thach') && key === 'qi' ? 12 : MAX_STAT;
            updatedStats[key] = clamp(updatedStats[key] + delta, cap);
          });
        }
        stats = updatedStats;
        if (effects.addItem) {
          inventory = [...inventory, effects.addItem];
        }
        if (effects.removeItem) {
          inventory = inventory.filter((item) => item !== effects.removeItem);
        }
        if (effects.addArtifact && !runArtifacts.includes(effects.addArtifact)) {
          runArtifacts = [...runArtifacts, effects.addArtifact];
          logEntries.push({
            id: `${effects.addArtifact}-${Date.now()}`,
            type: 'system',
            content: `Nhận pháp khí: ${effects.addArtifact}`,
            timestamp: Date.now()
          });
        }
        if (effects.addTalent && !runTalents.includes(effects.addTalent)) {
          runTalents = [...runTalents, effects.addTalent];
          logEntries.push({
            id: `${effects.addTalent}-${Date.now()}`,
            type: 'system',
            content: `Lĩnh hội thiên phú: ${effects.addTalent}`,
            timestamp: Date.now()
          });
        }
        if (effects.log) {
          logEntries.push({
            id: `log-${Date.now()}-${Math.random()}`,
            type: 'choice',
            content: effects.log,
            timestamp: Date.now()
          });
        }
        if (effects.triggerTribulation) {
          set({ status: 'tribulation' });
        }
      };

      applyEffects(choice.effects, true);

      if (choice.skillCheck) {
        const currentValue = stats[choice.skillCheck.stat];
        if (currentValue >= choice.skillCheck.threshold) {
          applyEffects(choice.skillCheck.success);
        } else if (choice.skillCheck.fail) {
          applyEffects(choice.skillCheck.fail);
        }
      }

      if (choice.followups && choice.followups.length > 0) {
        const { seed, rngState } = get();
        const rng = createRng(seed, rngState);
        const total = choice.followups.reduce((sum, f) => sum + (f.weight ?? 1), 0);
        let roll = rng.next() * total;
        let selected = choice.followups[0];
        for (const follow of choice.followups) {
          const weight = follow.weight ?? 1;
          if (roll < weight) {
            selected = follow;
            break;
          }
          roll -= weight;
        }
        set({
          queuedEvents: [...state.queuedEvents, selected.id],
          rngState: rng.getState()
        });
      }

      const newLog: RunLogEntry[] = [
        ...state.runLog,
        {
          id: `${event.id}-${Date.now()}`,
          type: 'event',
          content: `${event.title}: ${choice.text}`,
          timestamp: Date.now()
        },
        ...logEntries
      ];

      const eventCount = state.eventCount + 1;
      const shouldTribulate = eventCount % TRIBULATION_INTERVAL === 0;

      const nextState: Partial<GameState> = {
        stats,
        inventory,
        runArtifacts,
        runTalents,
        runLog: newLog,
        eventCount
      };

      if (shouldTribulate) {
        const { seed, rngState } = get();
        const { options, nextState: nextRngState } = buildTribulationOptions(seed, rngState);
        nextState.tribulationOptions = options;
        nextState.status = 'tribulation';
        nextState.rngState = nextRngState;
      }

      const fell = stats.qi <= 0 || stats.will <= 0 || stats.fate <= 0 || stats.rep <= 0;
      const ascended =
        stats.qi >= MAX_STAT && stats.will >= MAX_STAT && stats.fate >= MAX_STAT && stats.rep >= MAX_STAT;

      if (fell || ascended) {
        if (fell) {
          cracks += 1;
          nextState.cracks = cracks;
        }
        set(nextState);
        get().resetRun(fell ? 'fall' : 'ascend');
        return;
      }

      set(nextState);

      if (!shouldTribulate && get().status === 'running') {
        get().nextEvent();
      }
    },
    triggerTribulation: () => {
      const { seed, rngState } = get();
      const { options, nextState } = buildTribulationOptions(seed, rngState);
      set({ tribulationOptions: options, status: 'tribulation', rngState: nextState });
    },
    resolveTribulation: (id) => {
      const { tribulationOptions, runArtifacts, seed, rngState, runLog } = get();
      const selected = tribulationOptions.find((option) => option.id === id);
      if (!selected) return;
      const correct = selected.correct;
      const logEntry: RunLogEntry = {
        id: `tribulation-${Date.now()}`,
        type: 'system',
        content: correct ? 'Bạn vượt qua thiên kiếp!' : 'Thiên kiếp giáng xuống, xuất hiện vết nứt.',
        timestamp: Date.now()
      };
      let cracks = get().cracks;
      let newArtifacts = runArtifacts;
      if (correct) {
        const rng = createRng(seed, rngState);
        const rewardable = artifacts.filter((artifact) => !runArtifacts.includes(artifact.id));
        if (rewardable.length > 0) {
          const reward = rng.pick(rewardable);
          newArtifacts = [...runArtifacts, reward.id];
          set({ rngState: rng.getState(), pendingReward: { artifact: reward.id } });
        }
      } else {
        cracks += 1;
      }
      set({
        tribulationOptions: [],
        status: 'running',
        runArtifacts: newArtifacts,
        cracks,
        runLog: [...runLog, logEntry]
      });
      get().nextEvent();
    },
    saveMeta: () => {
      const { metaArtifacts, metaTalents } = get();
      saveState<PersistedMeta>({ metaArtifacts, metaTalents });
    },
    resetRun: (result) => {
      const {
        runArtifacts,
        runTalents,
        metaArtifacts,
        metaTalents,
        runHistory,
        eventCount
      } = get();
      const keptArtifact = runArtifacts.find((id) => !metaArtifacts.includes(id));
      const keptTalent = runTalents.find((id) => !metaTalents.includes(id));
      const newMetaArtifacts = keptArtifact ? [...metaArtifacts, keptArtifact] : metaArtifacts;
      const newMetaTalents = keptTalent ? [...metaTalents, keptTalent] : metaTalents;
      const summary: RunSummary = {
        result: result ?? (keptArtifact || keptTalent ? 'ascend' : 'fall'),
        timestamp: Date.now(),
        events: eventCount
      };
      set({
        status: 'setup',
        playerName: '',
        oathText: '',
        oathTraitTitle: '',
        oathTraitDescription: '',
        oathTrait: null,
        stats: defaultStats,
        inventory: [],
        runArtifacts: [],
        runTalents: [],
        metaArtifacts: newMetaArtifacts,
        metaTalents: newMetaTalents,
        runHistory: [...runHistory, summary],
        currentEventId: null,
        queuedEvents: [],
        eventCount: 0,
        tribulationOptions: [],
        runLog: [],
        pendingReward: null
      });
      saveState<PersistedMeta>({ metaArtifacts: newMetaArtifacts, metaTalents: newMetaTalents });
    },
    clearMeta: () => {
      set({ metaArtifacts: [], metaTalents: [] });
      saveState<PersistedMeta>({ metaArtifacts: [], metaTalents: [] });
    }
  }))
);
