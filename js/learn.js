/*
  learn.js - controls the "Ôn bài" tab with centralized handlers so that
  global event delegation can call into this module regardless of when the
  buttons are rendered.
*/

(function (global) {
  const HB = (global.HB = global.HB || {});
  const {
    vocabList,
    allSentences,
    shuffle,
    normalizeVN,
    normalizeCN,
    pushWrongItem,
    getCurrentUser,
    emit,
    speakHan,
    startRecording,
    stopRecording,
    playbackRecording,
    isRecorderSupported,
  } = HB;

  const state = {
    items: [],
    index: 0,
    showMeaning: true,
    showPinyin: true,
    recording: false,
  };

  const els = {};

  function cacheElements() {
    els.han = document.getElementById('hanText');
    els.pinyin = document.getElementById('pinyinText');
    els.meaning = document.getElementById('meaningText');
    els.quizInput = document.querySelector('[data-learn="quizInput"]');
    els.feedback = document.querySelector('[data-learn="feedback"]');
    els.recordBtn = document.getElementById('recordStudy');
    els.playbackBtn = document.getElementById('playbackStudy');
    els.speakBtn = document.getElementById('speak');
  }

  function buildItems() {
    const sentenceItems = allSentences.map((sentence) => ({
      hanzi: sentence.hanzi,
      pinyin: sentence.pinyin,
      meaning: sentence.meaning,
    }));
    state.items = shuffle([...vocabList, ...sentenceItems]);
  }

  function renderCurrent() {
    if (!els.han) return;
    if (!state.items.length) buildItems();
    const item = state.items[state.index];
    if (!item) return;
    els.han.textContent = item.hanzi;
    if (els.pinyin) {
      els.pinyin.textContent = item.pinyin;
      els.pinyin.style.display = state.showPinyin ? '' : 'none';
    }
    if (els.meaning) {
      els.meaning.textContent = item.meaning;
      els.meaning.style.display = state.showMeaning ? '' : 'none';
    }
    if (els.feedback) {
      els.feedback.textContent = '';
      els.feedback.dataset.state = '';
    }
    if (els.quizInput) {
      els.quizInput.value = '';
    }
  }

  function move(delta) {
    const total = state.items.length;
    state.index = (state.index + delta + total) % total;
    renderCurrent();
  }

  function toggleMeaning() {
    if (!els.meaning) return;
    state.showMeaning = !state.showMeaning;
    els.meaning.style.display = state.showMeaning ? '' : 'none';
  }

  function togglePinyin() {
    if (!els.pinyin) return;
    state.showPinyin = !state.showPinyin;
    els.pinyin.style.display = state.showPinyin ? '' : 'none';
  }

  function shuffleItems() {
    state.items = shuffle(state.items);
    state.index = 0;
    renderCurrent();
  }

  function checkAnswer() {
    if (!els.quizInput) return;
    const input = els.quizInput.value.trim();
    if (!input) return;
    const item = state.items[state.index];
    const normalizedInputVN = normalizeVN(input);
    const normalizedMeaning = normalizeVN(item.meaning);
    const normalizedHanzi = normalizeCN(item.hanzi);
    const normalizedPinyin = normalizeCN(item.pinyin);
    const normalizedInputCN = normalizeCN(input);

    const correct =
      normalizedInputVN === normalizedMeaning ||
      normalizedInputCN === normalizedHanzi ||
      normalizedInputCN === normalizedPinyin;

    if (correct) {
      if (els.feedback) {
        els.feedback.dataset.state = 'success';
        els.feedback.textContent = 'Chính xác!';
      }
    } else {
      if (els.feedback) {
        els.feedback.dataset.state = 'error';
        els.feedback.textContent = `Chưa đúng. Đáp án: ${item.meaning}`;
      }
      const user = getCurrentUser();
      if (user) pushWrongItem(user, item.hanzi);
    }
    els.quizInput.value = '';
  }

  function speakCurrent() {
    if (!els.han) return;
    if (typeof speakHan === 'function') {
      speakHan(els.han.textContent || '');
    }
  }

  async function toggleRecording() {
    if (!els.recordBtn) return;
    if (!isRecorderSupported || !isRecorderSupported()) {
      return;
    }
    if (!state.recording) {
      state.recording = true;
      els.recordBtn.textContent = '⏹ Dừng';
      try {
        await startRecording();
      } catch (error) {
        state.recording = false;
        els.recordBtn.textContent = '🎙️ Ghi';
      }
    } else {
      state.recording = false;
      els.recordBtn.textContent = '🎙️ Ghi';
      await stopRecording();
    }
  }

  function playbackLatest() {
    if (!els.playbackBtn) return;
    playbackRecording?.();
  }

  function handleKeydown(event) {
    if (!els.quizInput) return;
    const learnPanel = document.querySelector('[data-tab-content="learn"]');
    if (learnPanel && learnPanel.classList.contains('is-hidden')) return;
    if (event.key.toLowerCase() === 'j') {
      move(-1);
    } else if (event.key.toLowerCase() === 'k') {
      move(1);
    }
  }

  function handleEnter(event) {
    if (!els.quizInput) return;
    if (event.key === 'Enter') {
      event.preventDefault();
      checkAnswer();
    }
  }

  function applyAudioVisibility() {
    if (!els.recordBtn || !els.playbackBtn) return;
    if (!isRecorderSupported || !isRecorderSupported()) {
      els.recordBtn.style.display = 'none';
      els.playbackBtn.style.display = 'none';
    }
    if (!('speechSynthesis' in window) && els.speakBtn) {
      els.speakBtn.style.display = 'none';
    }
  }

  function init() {
    cacheElements();
    if (!els.han) return;
    buildItems();
    renderCurrent();
    els.quizInput?.addEventListener('keydown', handleEnter);
    window.addEventListener('keydown', handleKeydown, { passive: true });
    applyAudioVisibility();
    emit('learn:ready');
  }

  const api = {
    init,
    prev: () => move(-1),
    next: () => move(1),
    shuffle: shuffleItems,
    toggleMeaning,
    togglePinyin,
    check: checkAnswer,
    speak: speakCurrent,
    record: toggleRecording,
    playback: playbackLatest,
  };

  HB.learn = api;
  document.addEventListener('DOMContentLoaded', init);
})(window);
