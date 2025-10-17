const STORAGE_KEY = 'so-tu-luyen-save-v1';

export interface PersistedState<T> {
  version: number;
  data: T;
}

export const saveState = <T>(data: T, version = 1) => {
  if (typeof window === 'undefined') return;
  const payload: PersistedState<T> = { version, data };
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(payload));
};

export const loadState = <T>(version = 1): T | null => {
  if (typeof window === 'undefined') return null;
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw) as PersistedState<T>;
    if (parsed.version !== version) return null;
    return parsed.data;
  } catch (error) {
    console.warn('Failed to load state', error);
    return null;
  }
};

export const clearState = () => {
  if (typeof window === 'undefined') return;
  window.localStorage.removeItem(STORAGE_KEY);
};
