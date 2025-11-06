/*
  ui.js - theme toggling, global event delegation, routing helpers.
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
    routeTo,
    on,
    emit,
  } = HB;

  const docEl = document.documentElement;
  const badge = document.getElementById('uiVersionBadge');
  const buildTimeEl = document.querySelector('[data-build-time]');
  const avatarTrigger = document.querySelector('[data-avatar-trigger]');
  const headerAvatarFrame = document.querySelector('[data-avatar-vip]');
  const headerAvatarEmoji = document.querySelector('[data-avatar-emoji]');

  const TAB_STORAGE_KEY = storageKeys.lastTab;
  let pendingRoute = null;

  function toggleTheme() {
    const next = docEl.dataset.theme === 'dark' ? 'light' : 'dark';
    docEl.dataset.theme = next;
    localStorage.setItem(storageKeys.theme, next);
  }

  function initTheme() {
    const saved = localStorage.getItem(storageKeys.theme);
    if (saved) docEl.dataset.theme = saved;
  }

  function initBadge() {
    badge?.classList.add('hb-badge--visible');
    setTimeout(() => badge?.classList.remove('hb-badge--visible'), 2000);
  }

  function renderMetrics() {
    const sentenceMetric = document.querySelector('[data-metric="sentences"]');
    const vocabMetric = document.querySelector('[data-metric="vocab"]');
    if (sentenceMetric) sentenceMetric.textContent = dataMeta.sentenceCount;
    if (vocabMetric) vocabMetric.textContent = dataMeta.vocabCount;
  }

  function renderBuildTime() {
    if (buildTimeEl) buildTimeEl.textContent = formatDateTime();
  }

  function updateAvatarDisplay() {
    const prefs = getStorage(storageKeys.prefs, {});
    const avatar = localStorage.getItem('hb:avatar') || '🙂';
    if (headerAvatarEmoji) headerAvatarEmoji.textContent = avatar;
    if (headerAvatarFrame) {
      headerAvatarFrame.parentElement.dataset.vip = prefs.vipFrame ? 'true' : 'false';
      applyFrameClass(headerAvatarFrame, prefs.activeFrame);
    }
  }

  function activateTab(tabName) {
    if (!tabName) return;
    const panels = document.querySelectorAll('[data-tab-content]');
    panels.forEach((panel) => {
      panel.classList.toggle('is-hidden', panel.dataset.tabContent !== tabName);
    });
    document.querySelectorAll('[data-tab]').forEach((btn) => {
      const active = btn.dataset.tab === tabName;
      btn.classList.toggle('is-active', active);
      btn.setAttribute('aria-pressed', active ? 'true' : 'false');
    });
    localStorage.setItem(TAB_STORAGE_KEY, tabName);
    emit?.('tab:change', tabName);
    if (window.location.hash === '#/app') {
      HB.routeTo?.('app');
    }
  }

  function restoreTab() {
    const saved = localStorage.getItem(TAB_STORAGE_KEY) || 'learn';
    activateTab(saved);
  }

  function handleRouteIntent(routeName) {
    if (routeName === 'account') {
      const user = getCurrentUser();
      if (!user) {
        pendingRoute = 'account';
        HB.openAuthModal?.('login');
        return;
      }
      routeTo('app');
      activateTab('account');
      pendingRoute = null;
      return;
    }
    if (routeName === 'app') {
      const user = getCurrentUser();
      if (!user) {
        pendingRoute = 'app';
        HB.openAuthModal?.('login');
        return;
      }
      pendingRoute = null;
    }
    if (routeName === 'home' || routeName === 'faq' || routeName === 'app') {
      routeTo(routeName);
      if (routeName === 'app') {
        restoreTab();
      }
    }
  }

  function handleAvatarTrigger() {
    const user = getCurrentUser();
    if (user) {
      routeTo('app');
      activateTab('account');
    } else {
      HB.openAuthModal?.('login');
    }
  }

  function handleGlobalClick(event) {
    const target = event.target;
    if (!(target instanceof Element)) {
      return;
    }

    const routeBtn = target.closest('button[data-route], a[data-route]');
    if (routeBtn) {
      event.preventDefault();
      handleRouteIntent(routeBtn.dataset.route);
      return;
    }

    if (target.closest('[data-modal-target="translate"]')) {
      event.preventDefault();
      HB.openTranslateModal?.();
      return;
    }

    if (target.closest('#themeToggle')) {
      event.preventDefault();
      toggleTheme();
      return;
    }

    if (target.closest('#navLogin')) {
      event.preventDefault();
      HB.openAuthModal?.('login');
      return;
    }

    if (target.closest('#navRegister')) {
      event.preventDefault();
      HB.openAuthModal?.('signup');
      return;
    }

    if (target.closest('#logoutBtn')) {
      event.preventDefault();
      HB.logout?.();
      HB.renderAccount?.();
      return;
    }

    if (target.closest('[data-avatar-trigger]')) {
      event.preventDefault();
      handleAvatarTrigger();
      return;
    }

    const tabBtn = target.closest('[data-tab]');
    if (tabBtn) {
      event.preventDefault();
      activateTab(tabBtn.dataset.tab);
      return;
    }

    if (target.closest('#prevStudy')) {
      event.preventDefault();
      HB.learn?.prev();
      return;
    }

    if (target.closest('#nextStudy')) {
      event.preventDefault();
      HB.learn?.next();
      return;
    }

    if (target.closest('#shuffleStudy')) {
      event.preventDefault();
      HB.learn?.shuffle();
      return;
    }

    if (target.closest('#toggleViet')) {
      event.preventDefault();
      HB.learn?.toggleMeaning();
      return;
    }

    if (target.closest('#togglePinyinStudy')) {
      event.preventDefault();
      HB.learn?.togglePinyin();
      return;
    }

    if (target.closest('#checkSelf')) {
      event.preventDefault();
      HB.learn?.check();
      return;
    }

    if (target.closest('#speak')) {
      event.preventDefault();
      HB.learn?.speak();
      return;
    }

    if (target.closest('#recordStudy')) {
      event.preventDefault();
      HB.learn?.record();
      return;
    }

    if (target.closest('#playbackStudy')) {
      event.preventDefault();
      HB.learn?.playback();
      return;
    }

    const modeBtn = target.closest('[data-mode]');
    if (modeBtn) {
      event.preventDefault();
      HB.practice?.setMode(modeBtn.dataset.mode);
      return;
    }

    const levelBtn = target.closest('[data-level]');
    if (levelBtn) {
      event.preventDefault();
      HB.practice?.setLevel(levelBtn.dataset.level);
      return;
    }

    if (target.closest('#toggleWrongPool')) {
      event.preventDefault();
      HB.practice?.toggleWrongReview();
      return;
    }

    if (target.closest('#check')) {
      event.preventDefault();
      HB.practice?.evaluate();
      return;
    }

    if (target.closest('#show')) {
      event.preventDefault();
      HB.practice?.revealAnswer();
      return;
    }

    if (target.closest('#next')) {
      event.preventDefault();
      HB.practice?.skipQuestion();
      return;
    }

    if (target.closest('#resetStats')) {
      event.preventDefault();
      HB.practice?.resetStats();
      return;
    }

    if (target.closest('#startTimer')) {
      event.preventDefault();
      HB.practice?.startTimer();
      return;
    }

    if (target.closest('#stopTimer')) {
      event.preventDefault();
      HB.practice?.stopTimer();
      return;
    }

    if (target.closest('#togglePinyin')) {
      event.preventDefault();
      HB.bank?.togglePinyin();
      return;
    }

    if (target.closest('#toggleAll')) {
      event.preventDefault();
      HB.bank?.toggleAll();
      return;
    }

    if (target.closest('[data-modal-close]')) {
      event.preventDefault();
      const modal = target.closest('.hb-modal');
      if (modal?.dataset.modal === 'auth') {
        HB.closeAuthModal?.();
      } else {
        modal?.classList.remove('is-open');
      }
      return;
    }
  }

  function initShortcuts() {
    registerShortcut('ctrl+k', () => HB.openTranslateModal?.());
    registerShortcut('enter', (event) => {
      const active = document.activeElement;
      if (active?.id === 'answer') {
        event.preventDefault();
        HB.practice?.evaluate();
      } else if (active?.dataset?.learn === 'quizInput') {
        event.preventDefault();
        HB.learn?.check();
      }
    });
  }

  function initTitle() {
    if (!document.title.includes('[UI v10]')) {
      document.title = `${document.title} [UI v10]`;
    }
    console.log('HB_UI_V10_READY');
  }

  function init() {
    initTheme();
    initRouter();
    initBadge();
    renderMetrics();
    renderBuildTime();
    initShortcuts();
    restoreTab();
    updateAvatarDisplay();
    initTitle();
    document.addEventListener('click', handleGlobalClick);
    avatarTrigger?.addEventListener('keydown', (event) => {
      if (event.key === 'Enter' || event.key === ' ') {
        event.preventDefault();
        handleAvatarTrigger();
      }
    });
    on?.('auth:change', (username) => {
      updateAvatarDisplay();
      HB.renderAccount?.();
      if (username && pendingRoute === 'account') {
        routeTo('app');
        activateTab('account');
      }
      pendingRoute = null;
    });
  }

  document.addEventListener('DOMContentLoaded', init);

  HB.activateTab = activateTab;
})(window);
