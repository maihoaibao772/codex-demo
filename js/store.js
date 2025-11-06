/*
  store.js - avatar frame shop using CSS-only frames.
*/

import {
  getCurrentUser,
  getCoins,
  modifyCoins,
  getFrameInventory,
  setFrameInventory,
  setStorage,
  getStorage,
  storageKeys,
  showToast,
  applyFrameClass,
} from './utils.js';

let framesData = [];

const storeContainer = document.querySelector('[data-store="container"]');
const headerAvatarFrame = document.querySelector('[data-avatar-vip]');

function renderFrameCard(frame, state) {
  const { id, name, price, css } = frame;
  const owned = state.inventory[id];
  const applied = state.activeFrame === css;
  const card = document.createElement('article');
  card.className = 'hb-store__item';
  card.dataset.owned = owned ? 'true' : 'false';
  card.innerHTML = `
    <div class="hb-store__preview">
      <span>${state.avatarEmoji}</span>
      <span class="${css}"></span>
    </div>
    <h4>${name}</h4>
    <p>Giá: ${price} coin</p>
    <div class="hb-store__actions">
      <button class="hb-btn hb-btn--secondary" data-frame-action="preview" data-frame-id="${id}">Xem trước</button>
      <button class="hb-btn hb-btn--ghost" data-frame-action="${owned ? 'apply' : 'buy'}" data-frame-id="${id}">${owned ? (applied ? 'Đang dùng' : 'Áp dụng') : 'Mua'}</button>
    </div>
  `;
  if (owned && applied) {
    const actionBtn = card.querySelector('[data-frame-action="buy"],[data-frame-action="apply"]');
    if (actionBtn) actionBtn.disabled = true;
  }
  return card;
}

function renderStore() {
  const username = getCurrentUser();
  if (!username) {
    storeContainer.innerHTML = '<p>Đăng nhập để xem cửa hàng khung.</p>';
    return;
  }
  const prefs = getStorage(storageKeys.prefs, {});
  const inventory = getFrameInventory();
  const state = {
    avatarEmoji: localStorage.getItem('hb:avatar') || '🙂',
    coins: getCoins(),
    inventory: inventory[username] || {},
    activeFrame: prefs.activeFrame,
  };
  storeContainer.innerHTML = '';
  const grid = document.createElement('div');
  grid.className = 'hb-store__grid';
  framesData.forEach((frame) => {
    grid.appendChild(renderFrameCard(frame, state));
  });
  if (prefs.vipFrame) {
    grid.appendChild(renderFrameCard({ id: 'vip-elite', name: 'VIP khét', price: 0, css: 'frame-vip-elite' }, state));
  }
  storeContainer.appendChild(grid);
  attachHandlers();
}

function attachHandlers() {
  storeContainer.querySelectorAll('[data-frame-action]').forEach((btn) => {
    btn.addEventListener('click', () => handleAction(btn.dataset.frameAction, btn.dataset.frameId));
  });
}

function handleAction(action, frameId) {
  const username = getCurrentUser();
  if (!username) {
    showToast('Cần đăng nhập.');
    return;
  }
  const inventory = getFrameInventory();
  inventory[username] = inventory[username] || {};
  const prefs = getStorage(storageKeys.prefs, {});
  const frame = framesData.find((f) => f.id === frameId) || (frameId === 'vip-elite' ? { id: 'vip-elite', name: 'VIP khét', price: 0, css: 'frame-vip-elite' } : null);
  if (!frame) return;

  if (action === 'preview') {
    applyFrameClass(headerAvatarFrame, frame.css);
    showToast(`Đang xem thử ${frame.name}`);
    return;
  }

  if (action === 'buy') {
    const coins = getCoins();
    if (coins < frame.price) {
      showToast('Không đủ coin.');
      return;
    }
    modifyCoins(-frame.price);
    inventory[username][frame.id] = true;
    setFrameInventory(inventory);
    showToast(`Đã mua ${frame.name}`);
  }

  if (action === 'apply') {
    if (!inventory[username][frame.id] && frame.id !== 'vip-elite') {
      showToast('Bạn chưa sở hữu khung này.');
      return;
    }
    prefs.activeFrame = frame.css;
    setStorage(storageKeys.prefs, prefs);
    applyFrameClass(headerAvatarFrame, frame.css);
    showToast('Đã áp dụng khung.');
  }

  renderStore();
}

export function initStore() {
  if (framesData.length === 0) {
    storeContainer.textContent = 'Đang tải khung...';
    fetch('./data/frames.json')
      .then((res) => res.json())
      .then((data) => {
        framesData = data;
        renderStore();
      })
      .catch(() => {
        showToast('Không thể tải danh sách khung.');
      });
  } else {
    renderStore();
  }
}

document.addEventListener('DOMContentLoaded', initStore);
