/*
  bank.js - renders vocabulary and sentence banks with simple toggles.
*/

(function (global) {
  const HB = (global.HB = global.HB || {});
  const { vocabList, easySentences, hardSentences, createElement, emit } = HB;

  const state = {
    showPinyin: true,
    collapsed: false,
  };

  const els = {};

  function cacheElements() {
    els.container = document.querySelector('[data-bank="list"]');
    els.pinyinButton = document.getElementById('togglePinyin');
    els.collapseButton = document.getElementById('toggleAll');
  }

  function createAccordion(title, items, type) {
    const section = createElement('section', { className: 'hb-bank__accordion' });
    const header = createElement('header', { className: 'hb-bank__header' });
    header.innerHTML = `<h3 class="hb-bank__group-title">${title}</h3>`;
    section.appendChild(header);

    items.forEach((item) => {
      const entry = createElement('div', { className: 'hb-bank__item' });
      const han = createElement('h4', { text: item.hanzi, className: 'hb-bank__han' });
      han.style.fontFamily = 'Noto Sans SC';
      const pinyin = createElement('p', { className: 'hb-bank__pinyin', text: item.pinyin });
      pinyin.dataset.role = 'pinyin';
      const meaning = createElement('p', { text: item.meaning });

      entry.appendChild(han);
      entry.appendChild(pinyin);
      entry.appendChild(meaning);
      section.appendChild(entry);
    });

    return section;
  }

  function render() {
    if (!els.container) return;
    els.container.innerHTML = '';
    const vocabSection = createAccordion('Từ vựng', vocabList, 'vocab');
    const easySection = createAccordion('Câu dễ', easySentences, 'easy');
    const hardSection = createAccordion('Câu khó', hardSentences, 'hard');
    els.container.appendChild(vocabSection);
    els.container.appendChild(easySection);
    els.container.appendChild(hardSection);
    applyPinyinVisibility();
    applyCollapseState();
  }

  function applyPinyinVisibility() {
    if (!els.container) return;
    els.container.querySelectorAll('[data-role="pinyin"]').forEach((el) => {
      el.style.display = state.showPinyin ? '' : 'none';
    });
    if (els.pinyinButton) {
      els.pinyinButton.textContent = state.showPinyin ? 'Ẩn pinyin' : 'Hiện pinyin';
      els.pinyinButton.setAttribute('aria-pressed', state.showPinyin ? 'true' : 'false');
    }
  }

  function applyCollapseState() {
    if (!els.container) return;
    els.container.querySelectorAll('.hb-bank__item').forEach((item) => {
      item.style.display = state.collapsed ? 'none' : '';
    });
    if (els.collapseButton) {
      els.collapseButton.textContent = state.collapsed ? 'Mở rộng tất cả' : 'Thu gọn tất cả';
      els.collapseButton.setAttribute('aria-pressed', state.collapsed ? 'true' : 'false');
    }
  }

  function togglePinyinVisibility() {
    state.showPinyin = !state.showPinyin;
    applyPinyinVisibility();
  }

  function toggleCollapseAll() {
    state.collapsed = !state.collapsed;
    applyCollapseState();
  }

  function initBank() {
    cacheElements();
    render();
    emit('bank:ready');
  }

  HB.bank = {
    init: initBank,
    togglePinyin: togglePinyinVisibility,
    toggleAll: toggleCollapseAll,
  };

  document.addEventListener('DOMContentLoaded', initBank);
})(window);
