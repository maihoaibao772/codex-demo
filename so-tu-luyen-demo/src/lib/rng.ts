const MOD = 2 ** 32;
const MULTIPLIER = 1664525;
const INCREMENT = 1013904223;

const seedFromString = (seedString: string) => {
  let seed = 0;
  for (let i = 0; i < seedString.length; i += 1) {
    seed = (seed * 31 + seedString.charCodeAt(i)) >>> 0;
  }
  return seed === 0 ? 123456789 : seed >>> 0;
};

export interface RNG {
  next: () => number;
  nextInt: (max: number) => number;
  pick: <T>(items: T[]) => T;
  getState: () => number;
  setState: (value: number) => void;
}

export const createRng = (seedString = 'sotu', state?: number): RNG => {
  let internal = state ?? seedFromString(seedString);
  const advance = () => {
    internal = (MULTIPLIER * internal + INCREMENT) >>> 0;
    return internal;
  };
  return {
    next: () => advance() / MOD,
    nextInt: (max: number) => Math.floor((advance() / MOD) * (max > 0 ? max : 1)),
    pick: <T>(items: T[]) => {
      if (!items.length) {
        throw new Error('Cannot pick from empty array');
      }
      const index = Math.floor((advance() / MOD) * items.length);
      return items[index];
    },
    getState: () => internal,
    setState: (value: number) => {
      internal = value >>> 0;
    }
  };
};

export const getSeedState = (seedString: string, steps: number) => {
  const rng = createRng(seedString);
  for (let i = 0; i < steps; i += 1) {
    rng.next();
  }
  return rng.getState();
};

export const projectRandom = (seedString: string, steps: number) => {
  const rng = createRng(seedString, getSeedState(seedString, steps));
  return rng.next();
};
