/*
  ui.js - handles theme toggling, navigation, keyboard shortcuts.
*/

import { initRouter, navigate } from './router.js';
import {
  storageKeys,
  getStorage,
  registerShortcut,
  formatDateTime,
  getCurrentUser,
  applyFrameClass,
} from './utils.js';
import { dataMeta } from './data.js';
import { openTranslateModal } from './translate.js';
import { initStore } from './store.js';

const themeToggle = document.querySelector('[data-theme-toggle]');
const body = document.documentElement;
const navButtons = document.querySelectorAll('[data-nav]');
const badge = document.getElementById('uiVersionBadge');
const buildTimeEl = document.querySelector('[data-build-time]');
const avatarTrigger = document.querySelector('[data-avatar-trigger]');
const headerAvatarFrame = document.querySelector('[data-avatar-vip]');
const headerAvatarEmoji = document.querySelector('[data-avatar-emoji]');

function initTheme() {
  const saved = localStorage.getItem(storageKeys.theme);
  if (saved) {
    body.dataset.theme = saved;
  }
  themeToggle.addEventListener('click', () => {
    const next = body.dataset.theme === 'dark' ? 'light' : 'dark';
    body.dataset.theme = next;
    localStorage.setItem(storageKeys.theme, next);
  });
}

function initNav() {
  navButtons.forEach((btn) => {
    btn.addEventListener('click', () => {
      const target = btn.dataset.nav;
      if (target === 'start') navigate('#/app');
      if (target === 'faq') navigate('#/faq');
      if (target === 'account') navigate('#/app');
      if (target === 'translate') {
        openTranslateModal();
      }
    });
  });
}

function initBadge() {
  badge.classList.add('hb-badge--visible');
  setTimeout(() => {
    badge.classList.remove('hb-badge--visible');
  }, 2000);
}

function initMetrics() {
  document.querySelector('[data-metric="sentences"]').textContent = dataMeta.sentenceCount;
  document.querySelector('[data-metric="vocab"]').textContent = dataMeta.vocabCount;
}

function initBuildTime() {
  buildTimeEl.textContent = formatDateTime();
}

function initShortcuts() {
  registerShortcut('ctrl+k', () => {
    openTranslateModal();
  });
  registerShortcut('enter', (event) => {
    const active = document.activeElement;
    if (active?.dataset?.learn === 'quizInput') {
      event.preventDefault();
      document.querySelector('[data-learn="check"]').click();
    }
  });
}

function initAvatar() {
  const prefs = getStorage(storageKeys.prefs, {});
  headerAvatarEmoji.textContent = localStorage.getItem('hb:avatar') || '🙂';
  headerAvatarFrame.parentElement.dataset.vip = prefs.vipFrame ? 'true' : 'false';
  if (prefs.activeFrame) {
    applyFrameClass(headerAvatarFrame, prefs.activeFrame);
  }
  avatarTrigger.addEventListener('click', () => {
    const user = getCurrentUser();
    if (user) {
      navigate('#/app');
      document.querySelector('[data-tab="account"]').click();
    } else {
      document.querySelector('[data-auth="login"]').click();
    }
  });
}

function initTitle() {
  document.title = `${document.title} [UI v10]`;
  console.log('HB_UI_V10_READY');
}

initTheme();
initRouter();
initNav();
initBadge();
initMetrics();
initBuildTime();
initShortcuts();
initAvatar();
initTitle();
initStore();
