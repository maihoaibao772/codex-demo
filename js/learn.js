/*
  learn.js - controls the "Ôn bài" tab.
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
    buildSpeakText,
    getCurrentUser,
    emit,
    speakText,
    startRecording,
    stopRecording,
    playbackRecording,
    isAudioSupported,
  } = HB;

const hanText = document.getElementById('hanText');
const pinyinText = document.getElementById('pinyinText');
const meaningText = document.getElementById('meaningText');
const quizInput = document.querySelector('[data-learn="quizInput"]');
const feedback = document.querySelector('[data-learn="feedback"]');

const items = shuffle([...vocabList, ...allSentences.map((s) => ({ hanzi: s.hanzi, pinyin: s.pinyin, meaning: s.meaning }))]);
let currentIndex = 0;
let showMeaning = true;
let showPinyin = true;

function renderCurrent() {
  const item = items[currentIndex];
  hanText.textContent = item.hanzi;
  pinyinText.textContent = item.pinyin;
  meaningText.textContent = item.meaning;
  pinyinText.style.display = showPinyin ? '' : 'none';
  meaningText.style.display = showMeaning ? '' : 'none';
  feedback.textContent = '';
  feedback.dataset.state = '';
}

function move(delta) {
  currentIndex = (currentIndex + delta + items.length) % items.length;
  renderCurrent();
}

function handleCheck() {
  const input = quizInput.value.trim();
  if (!input) return;
  const item = items[currentIndex];
  const normalizedInput = normalizeVN(input);
  const normalizedMeaning = normalizeVN(item.meaning);
  const normalizedHanzi = normalizeCN(item.hanzi);
  const normalizedPinyin = normalizeCN(item.pinyin);
  if (normalizedInput === normalizedMeaning || normalizeCN(input) === normalizedHanzi || normalizeCN(input) === normalizedPinyin) {
    feedback.dataset.state = 'success';
    feedback.textContent = 'Chính xác!';
  } else {
    feedback.dataset.state = 'error';
    feedback.textContent = `Chưa đúng. Đáp án: ${item.meaning}`;
    const user = getCurrentUser();
    if (user) pushWrongItem(user, item.hanzi);
  }
  quizInput.value = '';
}

function shuffleItems() {
  for (let i = items.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [items[i], items[j]] = [items[j], items[i]];
  }
  currentIndex = 0;
  renderCurrent();
}

function initControls() {
  document.querySelector('[data-learn="prev"]').addEventListener('click', () => move(-1));
  document.querySelector('[data-learn="next"]').addEventListener('click', () => move(1));
  document.querySelector('[data-learn="shuffle"]').addEventListener('click', () => shuffleItems());
  document.querySelector('[data-learn="toggleMeaning"]').addEventListener('click', () => {
    showMeaning = !showMeaning;
    meaningText.style.display = showMeaning ? '' : 'none';
  });
  document.querySelector('[data-learn="togglePinyin"]').addEventListener('click', () => {
    showPinyin = !showPinyin;
    pinyinText.style.display = showPinyin ? '' : 'none';
  });
  document.querySelector('[data-learn="check"]').addEventListener('click', handleCheck);
  quizInput.addEventListener('keydown', (event) => {
    if (event.key === 'Enter') {
      event.preventDefault();
      handleCheck();
    }
  });

  window.addEventListener('keydown', (event) => {
    if (document.body.contains(quizInput)) {
      if (event.key.toLowerCase() === 'j') {
        move(-1);
      }
      if (event.key.toLowerCase() === 'k') {
        move(1);
      }
    }
  });
}

function initAudio() {
  const speakBtn = document.querySelector('[data-audio="speak"]');
  const recordBtn = document.querySelector('[data-audio="record"]');
  const playbackBtn = document.querySelector('[data-audio="playback"]');

  if (!isAudioSupported()) {
    speakBtn.style.display = 'none';
    recordBtn.style.display = 'none';
    playbackBtn.style.display = 'none';
    return;
  }

  speakBtn.addEventListener('click', () => {
    const item = items[currentIndex];
    speakText(buildSpeakText(item));
  });

  let recording = false;

  recordBtn.addEventListener('click', async () => {
    if (!recording) {
      recording = true;
      recordBtn.textContent = '⏹ Dừng';
      await startRecording();
    } else {
      recording = false;
      recordBtn.textContent = '🎙️ Ghi';
      await stopRecording();
    }
  });

  playbackBtn.addEventListener('click', () => {
    playbackRecording();
  });
}

function initLearn() {
  initControls();
  initAudio();
  renderCurrent();
  emit('learn:ready');
}

document.addEventListener('DOMContentLoaded', initLearn);
  HB.initLearn = initLearn;
})(window);
