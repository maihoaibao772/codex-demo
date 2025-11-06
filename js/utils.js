/*
  utils.js
  ---------------------------------------------------------------------------
  Shared utilities for the Hanzi Bridge UI. We keep them in a dedicated module
  to simplify unit testing and reuse. The file also includes extensive comments
  to document edge cases and design rationale.
*/

(function (global) {
  const HB = (global.HB = global.HB || {});

const storageKeys = {
  theme: 'hb:theme',
  users: 'hb:users',
  session: 'hb:session',
  remember: 'hb:remember',
  stats: 'hb:stats',
  wrongPool: 'hb:wrongPool',
  prefs: 'hb:prefs',
  coins: 'hb:coins',
  allow: 'hb:allow',
  frames: 'hb:frames',
  lastTab: 'hb:lastTab',
};

/**
 * Utility to safely parse JSON.
 * @param {string} value
 * @param {any} fallback
 * @returns {any}
 */
function safeParse(value, fallback = null) {
  try {
    if (typeof value !== 'string') return fallback;
    return JSON.parse(value);
  } catch (error) {
    console.warn('safeParse error', error);
    return fallback;
  }
}

/**
 * Serialize object to JSON with indentation.
 */
function safeStringify(value, pretty = true) {
  try {
    return pretty ? JSON.stringify(value, null, 2) : JSON.stringify(value);
  } catch (error) {
    console.warn('safeStringify error', error);
    return '';
  }
}

/**
 * Get an item from localStorage. Returns fallback if not found.
 */
function getStorage(key, fallback = null) {
  const raw = localStorage.getItem(key);
  if (raw == null) return fallback;
  return safeParse(raw, fallback);
}

/**
 * Set an item in localStorage. Automatically stringifies objects.
 */
function setStorage(key, value) {
  if (value === undefined) {
    localStorage.removeItem(key);
    return;
  }
  if (typeof value === 'string') {
    localStorage.setItem(key, value);
  } else {
    localStorage.setItem(key, safeStringify(value, false));
  }
}

/**
 * Create a DOM element with optional classes and attributes.
 */
function createElement(tag, options = {}) {
  const el = document.createElement(tag);
  if (options.className) el.className = options.className;
  if (options.dataset) {
    Object.entries(options.dataset).forEach(([key, value]) => {
      el.dataset[key] = value;
    });
  }
  if (options.text) el.textContent = options.text;
  if (options.html) el.innerHTML = options.html;
  return el;
}

/**
 * Shuffle array (Fisher–Yates).
 */
function shuffle(array) {
  const arr = array.slice();
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

/**
 * Normalize Vietnamese text for comparison.
 */
function normalizeVN(input) {
  if (!input) return '';
  let text = input
    .toLowerCase()
    .normalize('NFD')
    .replace(/\p{Diacritic}/gu, '')
    .replace(/[!?。！？、,.;:]/g, '')
    .trim();

  text = text.replace(/\s+/g, ' ');
  text = text.replace(/cau\b/g, 'ban');
  if (/ khong$/.test(text)) {
    text = text.replace(/ khong$/, ' phai khong');
  }
  return text;
}

/**
 * Normalize Chinese answer to accept Hanzi or Pinyin.
 */
function normalizeCN(input) {
  if (!input) return '';
  return input.trim().toLowerCase();
}

/**
 * Assert condition; throw error with message if false.
 */
function assert(condition, message) {
  if (!condition) {
    throw new Error(message || 'Assertion failed');
  }
}

/**
 * Format timestamp to human readable string.
 */
function formatDateTime(date = new Date()) {
  const pad = (num) => String(num).padStart(2, '0');
  return `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())} ${pad(date.getHours())}:${pad(date.getMinutes())}`;
}

/**
 * Event helper: delegate click handler.
 */
function delegate(root, selector, handler) {
  root.addEventListener('click', (event) => {
    const target = event.target.closest(selector);
    if (target && root.contains(target)) {
      handler(event, target);
    }
  });
}

/**
 * Build a toast element and append to body.
 */
function showToast(message, timeout = 2600) {
  let toast = document.querySelector('.hb-toast');
  if (!toast) {
    toast = createElement('div', { className: 'hb-toast', dataset: { visible: 'false' } });
    document.body.appendChild(toast);
  }
  toast.textContent = message;
  toast.dataset.visible = 'true';
  if (timeout) {
    setTimeout(() => {
      toast.dataset.visible = 'false';
    }, timeout);
  }
}

/**
 * Keyboard shortcut helper.
 */
function registerShortcut(combo, callback) {
  const normalized = combo.toLowerCase();
  window.addEventListener('keydown', (event) => {
    const parts = [];
    if (event.ctrlKey || event.metaKey) parts.push('ctrl');
    if (event.shiftKey) parts.push('shift');
    if (event.altKey) parts.push('alt');
    parts.push(event.key.toLowerCase());
    if (parts.join('+') === normalized) {
      event.preventDefault();
      callback(event);
    }
  });
}

/**
 * Access session user from storage.
 */
function getCurrentUser() {
  const session = getStorage(storageKeys.session);
  return session?.username || null;
}

/**
 * Return stored stats object.
 */
function getStats() {
  return getStorage(storageKeys.stats, {});
}

/**
 * Update stats for a given username.
 */
function updateStats(username, updater) {
  const stats = getStats();
  const current = stats[username] || { correct: 0, incorrect: 0, streak: 0, bestStreak: 0 };
  const updated = updater(current) || current;
  stats[username] = updated;
  setStorage(storageKeys.stats, stats);
  return updated;
}

/**
 * Manage wrong answer pool.
 */
function getWrongPool() {
  return getStorage(storageKeys.wrongPool, {});
}

function pushWrongItem(username, itemId) {
  const pool = getWrongPool();
  const userPool = new Set(pool[username] || []);
  userPool.add(itemId);
  pool[username] = Array.from(userPool);
  setStorage(storageKeys.wrongPool, pool);
}

function clearWrongPool(username) {
  const pool = getWrongPool();
  delete pool[username];
  setStorage(storageKeys.wrongPool, pool);
}

function popWrongItem(username) {
  const pool = getWrongPool();
  const items = pool[username] || [];
  if (!items.length) return null;
  const [first, ...rest] = items;
  pool[username] = rest;
  setStorage(storageKeys.wrongPool, pool);
  return first;
}

/**
 * Frame inventory helpers.
 */
function getFrameInventory() {
  return getStorage(storageKeys.frames, {});
}

function setFrameInventory(data) {
  setStorage(storageKeys.frames, data);
}

function getCoins() {
  return Number(localStorage.getItem(storageKeys.coins) || '0');
}

function setCoins(value) {
  localStorage.setItem(storageKeys.coins, String(Math.max(0, Number(value) || 0)));
}

function modifyCoins(delta) {
  const current = getCoins();
  setCoins(current + delta);
  return getCoins();
}

/**
 * Debounce helper for input events.
 */
function debounce(fn, delay = 300) {
  let timer = null;
  return (...args) => {
    clearTimeout(timer);
    timer = setTimeout(() => fn(...args), delay);
  };
}

/**
 * Basic pub/sub.
 */
const subscribers = new Map();

function on(eventName, callback) {
  if (!subscribers.has(eventName)) {
    subscribers.set(eventName, new Set());
  }
  subscribers.get(eventName).add(callback);
  return () => off(eventName, callback);
}

function off(eventName, callback) {
  const set = subscribers.get(eventName);
  if (!set) return;
  set.delete(callback);
}

function emit(eventName, payload) {
  const set = subscribers.get(eventName);
  if (!set) return;
  set.forEach((callback) => {
    try {
      callback(payload);
    } catch (error) {
      console.error('Event handler error', error);
    }
  });
}

/**
 * Build unique identifier based on dataset.
 */
function makeItemId(item) {
  return `${item.hanzi || item.zh}-${item.meaning || item.vi}`;
}

/**
 * Format accuracy percentage.
 */
function formatAccuracy(correct, incorrect) {
  const total = correct + incorrect;
  if (!total) return '0%';
  return `${Math.round((correct / total) * 100)}%`;
}

function readConfigAllowlist() {
  if (!Array.isArray(global.HB_ALLOW)) return [];
  return global.HB_ALLOW.map((item) => String(item).trim()).filter(Boolean);
}

/**
 * Determine allowlist, preferring runtime overrides stored in localStorage.
 */
function getAllowlist() {
  const raw = localStorage.getItem(storageKeys.allow);
  if (typeof raw === 'string' && raw.trim().length) {
    const list = raw
      .split(',')
      .map((item) => item.trim())
      .filter(Boolean);
    if (list.length) {
      return list;
    }
  }
  return readConfigAllowlist();
}

function setAllowlist(list) {
  if (!list || !list.length) {
    localStorage.removeItem(storageKeys.allow);
    return;
  }
  localStorage.setItem(storageKeys.allow, list.join(','));
}

function getAccessCode() {
  return typeof global.HB_ACCESS_CODE === 'string' ? global.HB_ACCESS_CODE.trim() : '';
}

function isUserAllowed(username) {
  if (!username) return false;
  const list = getAllowlist();
  return Array.isArray(list) && list.includes(username);
}

/**
 * Frame CSS class to highlight active frame.
 */
function applyFrameClass(element, className) {
  Array.from(element.classList).forEach((cls) => {
    if (cls.startsWith('frame-')) {
      element.classList.remove(cls);
    }
  });
  if (className) {
    element.classList.add(className);
  }
}

/**
 * Utility to map Chinese content to speakable string.
 */
function buildSpeakText(item) {
  if (!item) return '';
  const parts = [item.hanzi];
  if (item.pinyin) parts.push(item.pinyin);
  if (item.meaning) parts.push(item.meaning);
  return parts.join(' ');
}

/**
 * Accessibility helper: focus main container.
 */
function focusMain() {
  const main = document.getElementById('app');
  if (main) main.focus();
}

/**
 * Save JSON file by creating a blob and triggering download.
 */
function downloadJSON(filename, data) {
  const blob = new Blob([safeStringify(data)], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  setTimeout(() => URL.revokeObjectURL(url), 500);
}

/**
 * Read JSON file from input element.
 */
function readJSONFile(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => {
      try {
        const data = JSON.parse(reader.result);
        resolve(data);
      } catch (error) {
        reject(error);
      }
    };
    reader.onerror = reject;
    reader.readAsText(file);
  });
}

/**
 * Determine if user is owner (present trong allowlist).
 */
function isOwner(username) {
  return isUserAllowed(username);
}

/**
 * Build markdown-like summary of stats for exporting.
 */
function buildStatsSummary(stats) {
  const entries = Object.entries(stats || {});
  if (!entries.length) return 'No stats recorded.';
  return entries
    .map(([user, value]) => `${user}: đúng ${value.correct}, sai ${value.incorrect}, streak ${value.streak}, best ${value.bestStreak}`)
    .join('\n');
}

  Object.assign(HB, {
    storageKeys,
    safeParse,
    safeStringify,
    getStorage,
    setStorage,
    createElement,
    shuffle,
    normalizeVN,
    normalizeCN,
    assert,
    formatDateTime,
    delegate,
    showToast,
    registerShortcut,
    getCurrentUser,
    getStats,
    updateStats,
    getWrongPool,
    pushWrongItem,
    clearWrongPool,
    popWrongItem,
    getFrameInventory,
    setFrameInventory,
    getCoins,
    setCoins,
    modifyCoins,
    debounce,
    on,
    off,
    emit,
    makeItemId,
    formatAccuracy,
    getAllowlist,
    setAllowlist,
    getAccessCode,
    isUserAllowed,
    applyFrameClass,
    buildSpeakText,
    focusMain,
    downloadJSON,
    readJSONFile,
    isOwner,
    buildStatsSummary,
  });
})(window);
