import { describe, expect, it } from 'vitest';
import { createRng } from '../lib/rng';

describe('createRng', () => {
  it('produces deterministic sequences', () => {
    const rng1 = createRng('seed');
    const rng2 = createRng('seed');
    const sequence1 = Array.from({ length: 5 }, () => rng1.next());
    const sequence2 = Array.from({ length: 5 }, () => rng2.next());
    expect(sequence1).toEqual(sequence2);
  });

  it('respects stored state', () => {
    const rng = createRng('seed');
    rng.next();
    const state = rng.getState();
    const follow = createRng('seed', state);
    expect(follow.next()).toBeCloseTo(rng.next());
  });
});
