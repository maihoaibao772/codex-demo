/*
  practice.js - interactive practice module with timer and stats.
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

const promptEl = document.querySelector('[data-practice="prompt"]');
const answerInput = document.querySelector('[data-practice="answer"]');
const feedbackEl = document.querySelector('[data-practice="feedback"]');
const answerRevealEl = document.querySelector('[data-practice="answerReveal"]');
const timerEl = document.querySelector('[data-practice="timer"]');
const correctEl = document.querySelector('[data-practice="correct"]');
const incorrectEl = document.querySelector('[data-practice="incorrect"]');
const accuracyEl = document.querySelector('[data-practice="accuracy"]');
const streakEl = document.querySelector('[data-practice="streak"]');

const modeSelect = document.querySelector('[data-practice="mode"]');
const difficultySelect = document.querySelector('[data-practice="difficulty"]');
const reviewWrongToggle = document.querySelector('[data-practice="reviewWrong"]');

const checkBtn = document.querySelector('[data-practice="check"]');
const revealBtn = document.querySelector('[data-practice="reveal"]');
const skipBtn = document.querySelector('[data-practice="skip"]');
const resetBtn = document.querySelector('[data-practice="reset"]');
const timerToggleBtn = document.querySelector('[data-practice="timerToggle"]');

let dataset = [];
let currentItem = null;
let timer = null;
let timeLeft = 60;
let stats = { correct: 0, incorrect: 0, streak: 0, bestStreak: 0 };

function selectDataset() {
  const mode = difficultySelect.value;
  if (mode === 'easy') dataset = [...easySentences];
  else if (mode === 'hard') dataset = [...hardSentences];
  else dataset = [...allSentences];
  dataset = shuffle(dataset);
}

function pickItem() {
  if (reviewWrongToggle.checked) {
    const user = getCurrentUser();
    if (user) {
      const pool = JSON.parse(localStorage.getItem('hb:wrongPool') || '{}');
      const items = pool[user] || [];
      if (items.length) {
        const hanzi = items[Math.floor(Math.random() * items.length)];
        currentItem = allSentences.find((item) => item.hanzi === hanzi) || dataset[0];
        return;
      }
    }
  }
  currentItem = dataset[Math.floor(Math.random() * dataset.length)];
}

function renderItem() {
  if (!currentItem) pickItem();
  promptEl.textContent = currentItem.hanzi;
  feedbackEl.textContent = '';
  answerRevealEl.textContent = '';
  answerInput.value = '';
  answerInput.focus();
}

function evaluate() {
  const input = answerInput.value.trim();
  if (!input) return;
  const mode = modeSelect.value;
  const normalizedInputVN = normalizeVN(input);
  const normalizedMeaning = normalizeVN(currentItem.meaning);
  const normalizedHanzi = normalizeCN(currentItem.hanzi);
  const normalizedPinyin = normalizeCN(currentItem.pinyin);
  let correct = false;

  if (mode === 'han') {
    correct = normalizedInputVN === normalizedMeaning;
  } else if (mode === 'viet') {
    correct = normalizeCN(input) === normalizedHanzi || normalizeCN(input) === normalizedPinyin;
  } else {
    correct =
      normalizedInputVN === normalizedMeaning ||
      normalizeCN(input) === normalizedHanzi ||
      normalizeCN(input) === normalizedPinyin;
  }

  if (correct) {
    feedbackEl.dataset.state = 'success';
    feedbackEl.textContent = 'Tuyệt vời!';
    stats.correct += 1;
    stats.streak += 1;
    stats.bestStreak = Math.max(stats.bestStreak, stats.streak);
  } else {
    feedbackEl.dataset.state = 'error';
    feedbackEl.textContent = 'Sai rồi, hãy xem đáp án.';
    answerRevealEl.textContent = `${currentItem.meaning} (${currentItem.pinyin})`;
    stats.incorrect += 1;
    stats.streak = 0;
    const user = getCurrentUser();
    if (user) pushWrongItem(user, currentItem.hanzi);
  }
  updateStatsUI();
  saveStats();
  pickItem();
  renderItem();
}

function revealAnswer() {
  answerRevealEl.textContent = `${currentItem.meaning} (${currentItem.pinyin})`;
}

function skipQuestion() {
  pickItem();
  renderItem();
}

function resetStats() {
  stats = { correct: 0, incorrect: 0, streak: 0, bestStreak: 0 };
  updateStatsUI();
  saveStats();
}

function updateStatsUI() {
  correctEl.textContent = stats.correct;
  incorrectEl.textContent = stats.incorrect;
  accuracyEl.textContent = formatAccuracy(stats.correct, stats.incorrect);
  streakEl.textContent = `${stats.streak} (best ${stats.bestStreak})`;
}

function saveStats() {
  const user = getCurrentUser();
  if (!user) return;
  updateStats(user, () => ({ ...stats }));
}

function loadStats() {
  const user = getCurrentUser();
  if (!user) return;
  const all = JSON.parse(localStorage.getItem('hb:stats') || '{}');
  if (all[user]) {
    stats = all[user];
    updateStatsUI();
  }
}

function startTimer() {
  if (timer) clearInterval(timer);
  timeLeft = 60;
  timerEl.textContent = timeLeft;
  timer = setInterval(() => {
    timeLeft -= 1;
    timerEl.textContent = timeLeft;
    if (timeLeft <= 0) {
      clearInterval(timer);
      timer = null;
      feedbackEl.dataset.state = 'error';
      feedbackEl.textContent = 'Hết giờ!';
      revealAnswer();
    }
  }, 1000);
}

function toggleTimer() {
  if (timer) {
    clearInterval(timer);
    timer = null;
  } else {
    startTimer();
  }
}

function initEvents() {
  modeSelect.addEventListener('change', () => {
    selectDataset();
    pickItem();
    renderItem();
  });
  difficultySelect.addEventListener('change', () => {
    selectDataset();
    pickItem();
    renderItem();
  });
  reviewWrongToggle.addEventListener('change', () => {
    pickItem();
    renderItem();
  });
  checkBtn.addEventListener('click', evaluate);
  revealBtn.addEventListener('click', revealAnswer);
  skipBtn.addEventListener('click', skipQuestion);
  resetBtn.addEventListener('click', resetStats);
  timerToggleBtn.addEventListener('click', toggleTimer);
  answerInput.addEventListener('keydown', (event) => {
    if (event.key === 'Enter') {
      event.preventDefault();
      evaluate();
    }
  });
}

function initPractice() {
  selectDataset();
  pickItem();
  renderItem();
  updateStatsUI();
  loadStats();
  initEvents();
  emit('practice:ready');
}

document.addEventListener('DOMContentLoaded', initPractice);
  HB.initPractice = initPractice;
})(window);
