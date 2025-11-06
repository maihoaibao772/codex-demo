/*
  practice.js - interactive practice module with timer, wrong-answer review,
  and centralized handlers for event delegation.
*/

(function (global) {
  const HB = (global.HB = global.HB || {});
  const {
    easySentences,
    hardSentences,
    allSentences,
    shuffle,
    normalizeVN,
    normalizeCN,
    updateStats,
    pushWrongItem,
    getCurrentUser,
    formatAccuracy,
    emit,
  } = HB;

  const els = {};
  const state = {
    mode: 'shuffle',
    level: 'mixed',
    reviewWrong: false,
    dataset: [],
    currentItem: null,
    promptSide: 'han',
    timerId: null,
    timeLeft: 60,
    stats: { correct: 0, incorrect: 0, streak: 0, bestStreak: 0 },
  };

  function cacheElements() {
    els.prompt = document.querySelector('[data-practice="prompt"]');
    els.answerInput = document.querySelector('[data-practice="answer"]');
    els.feedback = document.querySelector('[data-practice="feedback"]');
    els.answerReveal = document.querySelector('[data-practice="answerReveal"]');
    els.timer = document.querySelector('[data-practice="timer"]');
    els.correct = document.querySelector('[data-practice="correct"]');
    els.incorrect = document.querySelector('[data-practice="incorrect"]');
    els.accuracy = document.querySelector('[data-practice="accuracy"]');
    els.streak = document.querySelector('[data-practice="streak"]');
    els.hint = document.querySelector('[data-practice="hint"]');
    els.modeButtons = Array.from(document.querySelectorAll('[data-mode]'));
    els.levelButtons = Array.from(document.querySelectorAll('[data-level]'));
    els.reviewButton = document.getElementById('toggleWrongPool');
  }

  function selectDataset() {
    if (state.level === 'easy') state.dataset = [...easySentences];
    else if (state.level === 'hard') state.dataset = [...hardSentences];
    else state.dataset = [...allSentences];
    state.dataset = shuffle(state.dataset);
  }

  function pickFromWrongPool() {
    const user = getCurrentUser();
    if (!user) return null;
    const pool = JSON.parse(localStorage.getItem('hb:wrongPool') || '{}');
    const items = pool[user] || [];
    if (!items.length) return null;
    const hanzi = items[Math.floor(Math.random() * items.length)];
    return allSentences.find((item) => item.hanzi === hanzi) || null;
  }

  function pickItem() {
    if (!state.dataset.length) {
      selectDataset();
    }
    if (state.reviewWrong) {
      const wrong = pickFromWrongPool();
      if (wrong) {
        state.currentItem = wrong;
        return;
      }
    }
    const index = Math.floor(Math.random() * state.dataset.length);
    state.currentItem = state.dataset[index];
  }

  function updateHint() {
    if (!els.hint) return;
    const side = state.promptSide || 'han';
    const isShuffle = state.mode === 'shuffle';
    if (side === 'han') {
      els.hint.textContent = isShuffle ? 'Xáo trộn: gõ nghĩa Việt' : 'Gõ nghĩa Việt';
    } else {
      els.hint.textContent = isShuffle ? 'Xáo trộn: gõ chữ Hán hoặc pinyin' : 'Gõ chữ Hán hoặc pinyin';
    }
  }

  function choosePromptSide() {
    if (state.mode === 'viet') return 'viet';
    if (state.mode === 'han') return 'han';
    return Math.random() > 0.5 ? 'han' : 'viet';
  }

  function renderItem() {
    if (!els.answerInput || !els.prompt) return;
    if (!state.currentItem) pickItem();
    if (!state.currentItem) return;
    state.promptSide = choosePromptSide();
    const promptSide = state.promptSide;
    if (promptSide === 'viet') {
      els.prompt.textContent = state.currentItem.meaning;
      els.prompt.lang = 'vi';
    } else {
      els.prompt.textContent = state.currentItem.hanzi;
      els.prompt.lang = 'zh-Hans';
    }
    els.prompt.dataset.promptSide = promptSide;
    if (els.feedback) {
      els.feedback.textContent = '';
      els.feedback.dataset.state = '';
    }
    if (els.answerReveal) {
      els.answerReveal.textContent = '';
    }
    els.answerInput.value = '';
    const practicePanel = document.querySelector('[data-tab-content="practice"]');
    if (!practicePanel || !practicePanel.classList.contains('is-hidden')) {
      els.answerInput.focus();
    }
    updateHint();
  }

  function updateModeButtons() {
    if (!els.modeButtons) return;
    els.modeButtons.forEach((btn) => {
      const active = btn.dataset.mode === state.mode;
      btn.classList.toggle('is-active', active);
      btn.setAttribute('aria-pressed', active ? 'true' : 'false');
    });
  }

  function updateLevelButtons() {
    if (!els.levelButtons) return;
    els.levelButtons.forEach((btn) => {
      const active = btn.dataset.level === state.level;
      btn.classList.toggle('is-active', active);
      btn.setAttribute('aria-pressed', active ? 'true' : 'false');
    });
  }

  function updateReviewButton() {
    if (!els.reviewButton) return;
    els.reviewButton.setAttribute('aria-pressed', state.reviewWrong ? 'true' : 'false');
    els.reviewButton.textContent = state.reviewWrong ? 'Ôn sai (bật)' : 'Ôn sai';
  }

  function evaluate() {
    if (!els.answerInput) return;
    const input = els.answerInput.value.trim();
    if (!input || !state.currentItem) return;
    const { hanzi, pinyin, meaning } = state.currentItem;
    const normalizedInputVN = normalizeVN(input);
    const normalizedMeaning = normalizeVN(meaning);
    const normalizedHanzi = normalizeCN(hanzi);
    const normalizedPinyin = normalizeCN(pinyin);
    const normalizedInputCN = normalizeCN(input);
    let correct = false;

    const side = state.promptSide || 'han';
    if (side === 'han') {
      correct = normalizedInputVN === normalizedMeaning;
    } else {
      correct = normalizedInputCN === normalizedHanzi || normalizedInputCN === normalizedPinyin;
    }

    if (correct) {
      if (els.feedback) {
        els.feedback.dataset.state = 'success';
        els.feedback.textContent = 'Tuyệt vời!';
      }
      state.stats.correct += 1;
      state.stats.streak += 1;
      state.stats.bestStreak = Math.max(state.stats.bestStreak, state.stats.streak);
    } else {
      if (els.feedback) {
        els.feedback.dataset.state = 'error';
        els.feedback.textContent = 'Sai rồi, hãy xem đáp án.';
      }
      if (els.answerReveal) {
        els.answerReveal.textContent = `${state.currentItem.hanzi} → ${state.currentItem.meaning} (${state.currentItem.pinyin})`;
      }
      state.stats.incorrect += 1;
      state.stats.streak = 0;
      const user = getCurrentUser();
      if (user) pushWrongItem(user, state.currentItem.hanzi);
    }

    updateStatsUI();
    saveStats();
    pickItem();
    renderItem();
  }

  function revealAnswer() {
    if (!els.answerReveal) return;
    if (!state.currentItem) return;
    els.answerReveal.textContent = `${state.currentItem.hanzi} → ${state.currentItem.meaning} (${state.currentItem.pinyin})`;
  }

  function skipQuestion() {
    if (!els.answerInput) return;
    pickItem();
    renderItem();
  }

  function resetStats() {
    if (!els.correct) return;
    state.stats = { correct: 0, incorrect: 0, streak: 0, bestStreak: 0 };
    updateStatsUI();
    saveStats();
  }

  function updateStatsUI() {
    if (!els.correct) return;
    els.correct.textContent = state.stats.correct;
    els.incorrect.textContent = state.stats.incorrect;
    els.accuracy.textContent = formatAccuracy(state.stats.correct, state.stats.incorrect);
    els.streak.textContent = `${state.stats.streak} (best ${state.stats.bestStreak})`;
  }

  function saveStats() {
    const user = getCurrentUser();
    if (!user) return;
    updateStats(user, () => ({ ...state.stats }));
  }

  function loadStats() {
    const user = getCurrentUser();
    if (!user) return;
    const all = JSON.parse(localStorage.getItem('hb:stats') || '{}');
    if (all[user]) {
      state.stats = all[user];
      updateStatsUI();
    }
  }

  function startTimer() {
    if (!els.timer) return;
    stopTimer();
    state.timeLeft = 60;
    els.timer.textContent = state.timeLeft;
    if (els.feedback) {
      els.feedback.textContent = '';
      els.feedback.dataset.state = '';
    }
    state.timerId = setInterval(() => {
      state.timeLeft -= 1;
      els.timer.textContent = state.timeLeft;
      if (state.timeLeft <= 0) {
        stopTimer();
        els.feedback.dataset.state = 'error';
        els.feedback.textContent = 'Hết giờ!';
        revealAnswer();
      }
    }, 1000);
  }

  function stopTimer() {
    if (!els.timer) return;
    if (state.timerId) {
      clearInterval(state.timerId);
      state.timerId = null;
    }
  }

  function setMode(mode) {
    if (!mode || state.mode === mode) return;
    state.mode = mode;
    updateModeButtons();
    renderItem();
  }

  function setLevel(level) {
    if (!level || state.level === level) return;
    state.level = level;
    updateLevelButtons();
    selectDataset();
    pickItem();
    renderItem();
  }

  function toggleWrongReview() {
    state.reviewWrong = !state.reviewWrong;
    updateReviewButton();
    pickItem();
    renderItem();
  }

  function handleEnter(event) {
    if (event.key === 'Enter') {
      event.preventDefault();
      evaluate();
    }
  }

  function init() {
    cacheElements();
    if (!els.prompt) return;
    selectDataset();
    pickItem();
    renderItem();
    updateModeButtons();
    updateLevelButtons();
    updateReviewButton();
    updateStatsUI();
    loadStats();
    els.answerInput.addEventListener('keydown', handleEnter);
    emit('practice:ready');
  }

  const api = {
    init,
    setMode,
    setLevel,
    toggleWrongReview,
    evaluate,
    revealAnswer,
    skipQuestion,
    resetStats,
    startTimer,
    stopTimer,
  };

  HB.practice = api;
  document.addEventListener('DOMContentLoaded', init);
})(window);
