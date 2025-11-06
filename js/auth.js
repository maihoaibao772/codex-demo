/*
  auth.js - registration and login management using localStorage.
*/

import {
  storageKeys,
  safeParse,
  safeStringify,
  getStorage,
  setStorage,
  showToast,
  getCurrentUser,
  emit,
  setAllowlist,
  getAllowlist,
} from './utils.js';

const authModal = document.querySelector('[data-modal="auth"]');
const authForm = authModal.querySelector('[data-auth-form]');
const authFeedback = authModal.querySelector('[data-auth-feedback]');
const authToggleBtn = authModal.querySelector('[data-auth-toggle]');
const authTitle = authModal.querySelector('#authTitle');
const loginBtn = document.querySelector('[data-auth="login"]');
const signupBtn = document.querySelector('[data-auth="signup"]');

let authMode = 'login';

function loadUsers() {
  return getStorage(storageKeys.users, {});
}

function saveUsers(users) {
  setStorage(storageKeys.users, users);
}

function hashPassword(password) {
  const encoder = new TextEncoder();
  const data = encoder.encode(password);
  return crypto.subtle.digest('SHA-256', data).then((hash) => {
    return Array.from(new Uint8Array(hash))
      .map((b) => b.toString(16).padStart(2, '0'))
      .join('');
  });
}

function closeModal() {
  authModal.classList.remove('is-open');
  authFeedback.textContent = '';
}

function openModal(mode = 'login') {
  authMode = mode;
  authModal.classList.add('is-open');
  authTitle.textContent = mode === 'login' ? 'Đăng nhập' : 'Đăng ký';
  authToggleBtn.textContent = mode === 'login' ? 'Chuyển sang đăng ký' : 'Chuyển sang đăng nhập';
  authFeedback.textContent = '';
  authForm.reset();
  const remember = localStorage.getItem(storageKeys.remember);
  if (remember) {
    authForm.username.value = remember;
    authForm.remember.checked = true;
  }
}

function setSession(username) {
  setStorage(storageKeys.session, { username, loggedInAt: Date.now() });
  emit('auth:change', username);
}

function clearSession() {
  localStorage.removeItem(storageKeys.session);
  emit('auth:change', null);
}

async function handleLogin(username, password) {
  const users = loadUsers();
  const user = users[username];
  if (!user) {
    throw new Error('Không tìm thấy người dùng.');
  }
  const hash = await hashPassword(password);
  if (hash !== user.pass) {
    throw new Error('Sai mật khẩu.');
  }
  const allowlist = getAllowlist();
  if (allowlist && !allowlist.includes(username)) {
    throw new Error('Tài khoản chưa nằm trong allowlist.');
  }
  setSession(username);
}

async function handleSignup(username, password) {
  const users = loadUsers();
  if (users[username]) {
    throw new Error('Tên đăng nhập đã tồn tại.');
  }
  const hash = await hashPassword(password);
  users[username] = { pass: hash, created: Date.now() };
  saveUsers(users);
  setSession(username);
}

authForm.addEventListener('submit', async (event) => {
  event.preventDefault();
  const formData = new FormData(authForm);
  const username = formData.get('username').trim();
  const password = formData.get('password').trim();
  const remember = formData.get('remember');
  authFeedback.dataset.state = '';
  authFeedback.textContent = 'Đang xử lý...';
  try {
    if (authMode === 'login') {
      await handleLogin(username, password);
      authFeedback.dataset.state = 'success';
      authFeedback.textContent = 'Đăng nhập thành công!';
    } else {
      await handleSignup(username, password);
      authFeedback.dataset.state = 'success';
      authFeedback.textContent = 'Đăng ký thành công!';
    }
    if (remember) {
      localStorage.setItem(storageKeys.remember, username);
    } else {
      localStorage.removeItem(storageKeys.remember);
    }
    setTimeout(() => {
      closeModal();
    }, 600);
  } catch (error) {
    authFeedback.dataset.state = 'error';
    authFeedback.textContent = error.message;
  }
});

authToggleBtn.addEventListener('click', () => {
  authMode = authMode === 'login' ? 'signup' : 'login';
  authTitle.textContent = authMode === 'login' ? 'Đăng nhập' : 'Đăng ký';
  authToggleBtn.textContent = authMode === 'login' ? 'Chuyển sang đăng ký' : 'Chuyển sang đăng nhập';
});

loginBtn.addEventListener('click', () => openModal('login'));
signupBtn.addEventListener('click', () => openModal('signup'));

document.querySelectorAll('[data-modal-close]').forEach((btn) => {
  btn.addEventListener('click', () => {
    btn.closest('.hb-modal').classList.remove('is-open');
  });
});

// Expose logout for account page
export function logout() {
  clearSession();
  showToast('Đã đăng xuất.');
}

export function ensureLoggedIn() {
  const user = getCurrentUser();
  if (!user) {
    openModal('login');
    return false;
  }
  return true;
}

window.addEventListener('keydown', (event) => {
  if (event.key === 'Escape') {
    document.querySelectorAll('.hb-modal.is-open').forEach((modal) => modal.classList.remove('is-open'));
  }
});

export function updateAllowlist(csv) {
  const items = csv
    .split(',')
    .map((item) => item.trim())
    .filter(Boolean);
  setAllowlist(items);
  showToast('Đã cập nhật allowlist.');
}

export function getUsersRaw() {
  return getStorage(storageKeys.users, {});
}

export function importUsers(data) {
  const users = getUsersRaw();
  Object.assign(users, data);
  saveUsers(users);
}
