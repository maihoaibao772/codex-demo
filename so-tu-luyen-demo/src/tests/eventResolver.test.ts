import { describe, expect, it, beforeEach } from 'vitest';
import { useGameStore } from '../store/game';
import { events } from '../data/events';

const event = events.find((item) => item.id === 'lang-tran');

if (!event) {
  throw new Error('Missing lang-tran event');
}

describe('applyChoice', () => {
  beforeEach(() => {
    useGameStore.setState((state) => ({
      ...state,
      status: 'running',
      stats: { qi: 4, will: 4, fate: 4, rep: 4 },
      inventory: [],
      runArtifacts: [],
      runTalents: [],
      runLog: [],
      eventCount: 0,
      queuedEvents: [],
      currentEventId: event.id,
      tribulationOptions: [],
      cracks: 0,
      seed: 'test-seed',
      rngState: 123456
    }));
  });

  it('mutates stats and inventory based on choice effects', () => {
    const choice = event.choices[1];
    useGameStore.getState().applyChoice(choice, event);
    const state = useGameStore.getState();
    expect(state.stats.will).toBeGreaterThanOrEqual(5);
    expect(state.stats.rep).toBeGreaterThanOrEqual(6);
    expect(state.inventory).toContain('đan trị thương');
  });
});
