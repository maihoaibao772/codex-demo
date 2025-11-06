/*
  ui.js - handles theme toggling, navigation, keyboard shortcuts.
*/

(function (global) {
  const HB = (global.HB = global.HB || {});
  const {
    storageKeys,
    getStorage,
    registerShortcut,
    formatDateTime,
    getCurrentUser,
    applyFrameClass,
    dataMeta,
    initRouter,
    navigate,
  } = HB;

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
        HB.openTranslateModal?.();
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
    HB.openTranslateModal?.();
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
  if (!document.title.includes('[UI v10]')) {
    document.title = `${document.title} [UI v10]`;
  }
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

  window.addEventListener('DOMContentLoaded', () => {
    if (typeof HB.initStore === 'function') {
      HB.initStore();
    }
  });
})(window);
