/*
  translate.js - handles Google Translate modal interactions.
*/

(function (global) {
  const HB = (global.HB = global.HB || {});

  const modal = document.querySelector('[data-modal="translate"]');
  if (!modal) return;

  const textarea = modal.querySelector('[data-translate="input"]');
  const iframe = modal.querySelector('[data-translate="iframe"]');
  const fallback = modal.querySelector('[data-translate="fallback"]');
  const pasteBtn = modal.querySelector('[data-translate="pasteCurrent"]');
  const swapBtn = modal.querySelector('[data-translate="swap"]');
  const openBtn = modal.querySelector('[data-translate="openTab"]');
  const fallbackOpenBtn = modal.querySelector('[data-translate="fallbackOpen"]');

  let sourceLang = 'zh-CN';
  let targetLang = 'vi';

  function buildUrl(text) {
    const encoded = encodeURIComponent(text || '');
    return `https://translate.google.com/?sl=${sourceLang}&tl=${targetLang}&op=translate&text=${encoded}`;
  }

  function loadIframe(text) {
    iframe.src = buildUrl(text);
    fallback.style.display = 'none';
    setTimeout(() => {
      try {
        const doc = iframe.contentDocument;
        if (!doc || !doc.body || doc.body.innerHTML.length === 0) {
          fallback.style.display = 'flex';
        }
      } catch (error) {
        fallback.style.display = 'flex';
      }
    }, 800);
  }

  pasteBtn.addEventListener('click', () => {
    const han = document.getElementById('hanText');
    if (han) {
      textarea.value = han.textContent;
      loadIframe(textarea.value);
    }
  });

  swapBtn.addEventListener('click', () => {
    [sourceLang, targetLang] = [targetLang, sourceLang];
    loadIframe(textarea.value);
  });

  const openInNewTab = () => {
    window.open(buildUrl(textarea.value), '_blank');
  };

  openBtn.addEventListener('click', openInNewTab);
  fallbackOpenBtn.addEventListener('click', openInNewTab);

  textarea.addEventListener('input', () => {
    loadIframe(textarea.value);
  });

  modal.addEventListener('click', (event) => {
    if (event.target === modal) {
      modal.classList.remove('is-open');
    }
  });

  function openTranslateModal() {
    modal.classList.add('is-open');
    loadIframe(textarea.value);
  }

  HB.openTranslateModal = openTranslateModal;
})(window);
